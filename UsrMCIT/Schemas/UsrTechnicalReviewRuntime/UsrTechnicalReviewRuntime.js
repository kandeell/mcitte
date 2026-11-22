 /*
 * TE-MCIT Technical Review Queue v4 — Designer-friendly safe Figma styling.
 * Native page hierarchy and core runtime behavior are unchanged.
 * Source behavior and scoped CSS extracted from the user-provided v2 list,
 * which targets real UsrRequestApproval and UsrTechnicalReview_FormPage.
 * The Freedom UI page owns its editable native layout, data source and proxies.
 * Custom DOM-added Request ID / Actions cells remain runtime-only, NOT
 * individually editable visual components in the Page Designer.
 * Assignment here is for the QUEUE only, not native SysApproval delegation.
 */
define("UsrTechnicalReviewRuntime", ["@creatio-devkit/common"], function(sdk) {
    "use strict";

    const OBJECT = "UsrRequestApproval";
    const STAGE_LOOKUP = "UsrMCITApprovalStage";
    const WORKSPACE = "UsrTechnicalReview_FormPage";
    const TARGET_ROLE = "TE Technical Reviewer";
    const EMPTY = "00000000-0000-0000-0000-000000000000";
    const GUID = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i;
    const MAX_ROWS = 2000; // Do not silently claim complete totals beyond this.
    const NUMBERING_LIMIT = 10000; // Same My Requests query cap. Never use partial fallback sequences.
    // Queue-only assignment: writes UsrAssignedTo (Contact) and UsrAssignedOn.
    // Does NOT reassign the native role-based Creatio Approval (SysApproval).
    // Verify UsrAssignedTo lookup targets Contact and enable Creatio column rights.
    const ENABLE_ASSIGNMENT_WRITES = true;
    const RUNTIME_KEY = "__usrTETechnicalReviewNativeV1";
    const id = v => String(v?.value ?? v?.Id ?? v?.id ?? v ?? "").trim();
    const valid = v => GUID.test(id(v)) && id(v).toLowerCase() !== EMPTY;
    const name = v => String(v?.displayValue ?? v?.Name ?? v?.UsrName ?? v ?? "").trim();
    const lowercase = v => name(v).toLowerCase();
    const date = v => {
        if (!v) return "—";
        const d = new Date(v);
        return Number.isFinite(d.getTime()) ? new Intl.DateTimeFormat("en-CA", {
            timeZone:"Africa/Cairo", year:"numeric", month:"2-digit", day:"2-digit"
        }).format(d) : "—";
    };
    const inDesigner = () => {
        if (typeof window === "undefined") return true;
        const rx = /PageDesigner|FreedomUIPageDesigner/i;
        try {if (rx.test(document.referrer || "")) return true;} catch (_) {}
        let w=window;
        for(let n=0;n<7;n++) {
            try {if(rx.test(w.location.href))return true;
                if(w.parent===w)break;w=w.parent;}catch(_){break;}
        }
        return false;
    };
    const filterValue = f => ({...f,items:f.items});
    const stored = () => typeof document !== "undefined" ? document[RUNTIME_KEY] : null;
    const message = (m) => { if(typeof window !== "undefined") window.alert(m); };
    async function sdkRows(schema, attrs, match=[], limit=MAX_ROWS) {
        const model = await sdk.Model.create(schema);
        let parameters=[];
        if(match.length) {
            const f=new sdk.FilterGroup();
            for(const [key,value] of match) await f.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,key,value);
            parameters=[{type:sdk.ModelParameterType.Filter,value:filterValue(f)}];
        }
        let out=[];
        while(out.length<limit) {
            const take=Math.min(200,limit-out.length);
            const rows=await model.load({attributes:attrs,parameters,
                options:{pagingConfig:{rowsOffset:out.length,rowCount:take}}}) || [];
            out.push(...rows);
            if(rows.length<take)break;
        }
        return out;
    }
    async function findStageIds(rows) {
        const found=new Set();
        // First use stage IDs actually stored on approval records.
        for(const row of rows) if(/technical/i.test(name(row.UsrStage)) && valid(row.UsrStage))
            found.add(id(row.UsrStage).toLowerCase());
        // Empty queue must still know which stage to query in future.
        for(const column of ["UsrName","Name"]) {
            try {
                const stages=await sdkRows(STAGE_LOOKUP,["Id",column],[],250);
                for(const item of stages) if(/technical/i.test(name(item[column])) && valid(item.Id))
                    found.add(id(item.Id).toLowerCase());
                if(found.size)break;
            }catch(e){console.warn("Technical Review: lookup projection unavailable",column,e);}
        }
        return [...found];
    }
    async function hydrateRequests(rows) {
        const requestIds=[...new Set(rows.map(r=>id(r.UsrRequest).toLowerCase()).filter(valid))];
        const map=new Map();
        // Read only persisted customer request data. No fake Request IDs.
        const model=await sdk.Model.create("UsrVMRequest");
        for(let offset=0;offset<requestIds.length;offset+=35) {
            const f=new sdk.FilterGroup(); f.logicalOperation=sdk.LogicalOperatorType.Or;
            for(const rid of requestIds.slice(offset,offset+35))
                await f.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,"Id",rid);
            const got=await model.load({attributes:["Id","UsrNumber","UsrName","UsrAccount",
                "UsrProject","UsrContract","CreatedBy","CreatedOn"],
                parameters:[{type:sdk.ModelParameterType.Filter,value:filterValue(f)}],
                options:{pagingConfig:{rowsOffset:0,rowCount:40}}}) || [];
            for(const r of got)map.set(id(r.Id).toLowerCase(),r);
        }
        return map;
    }
    // Same display-code rules as the existing UsrMyRequests_ListPage source.
    // Provisional codes are display-only and must never be sent as record IDs.
    function formatRequestCode(record, provisionalIndex){
        const d=record?.CreatedOn ? new Date(record.CreatedOn) : null;
        const year=String(d && Number.isFinite(d.getTime()) ? d.getFullYear() : new Date().getFullYear());
        const raw=String(record?.UsrNumber ?? '').trim();
        let code;
        if(/^REQ-\d{4}-\d+$/i.test(raw))code=raw.toUpperCase();
        else if(/^\d+$/.test(raw))code='REQ-'+year+'-'+raw.padStart(4,'0');
        else if(/^REQ-\d+$/i.test(raw))code='REQ-'+year+'-'+raw.substring(4).padStart(4,'0');
        else if(raw)code=raw;
        else if(Number.isInteger(provisionalIndex) && provisionalIndex>=0)
            code='REQ-'+year+'-'+String(provisionalIndex+1).padStart(4,'0');
        else code='—';
        return {code,provisional:!raw && Number.isInteger(provisionalIndex),stored:!!raw};
    }
    function displayedRequestCode(rt,requestId){
        const rid=id(requestId).toLowerCase();
        const request=rt.requests.get(rid);
        if(!request)return {code:'—',provisional:false,stored:false};
        return rt.requestCodes?.get(rid) || formatRequestCode(request);
    }
    async function hydrateRequestCodes(requests){
        const codes=new Map();
        // Persisted number wins even if the request is not in the current user's
        // My Requests scope. Do not guess a fallback for an out-of-scope record.
        for(const [rid,r] of requests){
            if(String(r.UsrNumber??'').trim())codes.set(rid,formatRequestCode(r));
        }
        const missing=[...requests].filter(([rid])=>!codes.has(rid));
        if(!missing.length)return codes;
        try{
            const sys=await new sdk.SysValuesService().loadSysValues();
            const contactId=id(sys?.userContact);
            if(!valid(contactId))throw Error('Current Contact is unavailable');
            let authorityId='';
            const contacts=await sdkRows('Contact',['Id','Account'],[['Id',contactId]],1);
            if(contacts?.length && valid(contacts[0].Account))authorityId=id(contacts[0].Account);
            const scope=new sdk.FilterGroup();scope.logicalOperation=sdk.LogicalOperatorType.Or;
            await scope.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,'CreatedBy',contactId);
            if(valid(authorityId))await scope.addSchemaColumnFilterWithParameter(
                sdk.ComparisonType.Equal,'UsrAccount',authorityId);
            const model=await sdk.Model.create('UsrVMRequest');
            let rows=[];
            for(let offset=0;offset<NUMBERING_LIMIT;offset+=250){
                const batch=await model.load({attributes:['Id','UsrNumber','CreatedOn'],
                    parameters:[{type:sdk.ModelParameterType.Filter,value:filterValue(scope)}],
                    options:{pagingConfig:{rowsOffset:offset,rowCount:250}}}) || [];
                rows.push(...batch);
                if(batch.length<250)break;
            }
            if(rows.length>=NUMBERING_LIMIT){
                console.warn('Technical Review: My Requests provisional IDs unavailable: scoped record cap exceeded.');
                return codes;
            }
            // My Requests groups by local CreatedOn year and sorts by CreatedOn,
            // breaking ties with the actual record GUID. Reproduce that exactly.
            const grouped=new Map();
            for(const record of rows){
                const d=record?.CreatedOn ? new Date(record.CreatedOn) : null;
                const year=String(d&&Number.isFinite(d.getTime()) ? d.getFullYear():new Date().getFullYear());
                if(!grouped.has(year))grouped.set(year,[]);
                grouped.get(year).push(record);
            }
            for(const group of grouped.values()){
                group.sort((a,b)=>
                    ((new Date(a.CreatedOn).getTime()||0)-(new Date(b.CreatedOn).getTime()||0)) ||
                    id(a.Id).localeCompare(id(b.Id)));
                group.forEach((record,index)=>{
                    const rid=id(record.Id).toLowerCase();
                    if(!codes.has(rid))codes.set(rid,formatRequestCode(record,index));
                });
            }
        }catch(error){
            console.warn('Technical Review: Cannot reconstruct provisional My Requests display numbers; persisted UsrNumber remains authoritative.',error);
        }
        return codes;
    }
    function classify(row,now=Date.now()) {
        if(row.UsrIsCompleted===true || row.UsrIsCompleted===1) return "completed";
        const due=row.UsrDueOn ? new Date(row.UsrDueOn).getTime() : NaN;
        if(Number.isFinite(due) && due<now) return "overdue";
        if(Number.isFinite(due) && due<=now+24*3600*1000) return "approaching";
        if(valid(row.UsrAssignedTo)) return "assigned";
        return "new";
    }
    function filtered(rt) {
        let rows=rt.rows.filter(r=>rt.stageIds.includes(id(r.UsrStage).toLowerCase()));
        const f=rt.filter;
        if(f && f!=="all") rows=rows.filter(r=>f==="assigned" ?
            (valid(r.UsrAssignedTo) && classify(r)!=="completed") :
            f==="new" ? (!valid(r.UsrAssignedTo) && classify(r)!=="completed") :
            classify(r)===f);
        const term=rt.search.toLowerCase().trim();
        if(term)rows=rows.filter(r=>{
            const request=rt.requests.get(id(r.UsrRequest).toLowerCase())||{};
            return [r.UsrName,r.UsrStage,r.UsrAssignedTo,
                displayedRequestCode(rt,r.UsrRequest).code,request.UsrNumber,request.UsrName,
                request.UsrContract,request.UsrAccount,request.UsrProject,request.CreatedBy]
                .some(v=>lowercase(v).includes(term));
        });
        return rows;
    }
    async function reloadPDS(ctx) {
        await ctx.executeRequest({type:"crt.LoadDataRequest",dataSourceName:"PDS",$context:ctx,
            config:{loadType:"reload",useLastLoadParameters:false}});
    }
    function paint(rt) {
        const {ctx}=rt;
        const current=rt.rows.filter(r=>rt.stageIds.includes(id(r.UsrStage).toLowerCase()));
        const active=current.filter(r=>classify(r)!=="completed");
        const newCount=active.filter(r=>!valid(r.UsrAssignedTo)).length;
        const assigned=active.filter(r=>valid(r.UsrAssignedTo)).length;
        const approaches=active.filter(r=>classify(r)==="approaching").length;
        const overdue=active.filter(r=>classify(r)==="overdue").length;
        const complete=current.length-active.length;
        const all=current.length;
        const counts={all,new:newCount,assigned,approaching:approaches,overdue,completed:complete};
        // v4: visual state for native filter chip styling only (no data/filter change).
        if (typeof document !== "undefined" && document.body) {
            document.body.setAttribute("data-usr-tr-filter", rt.filter);
        }
        for (const key of ["all","new","assigned","approaching","overdue","completed"])
            ctx["TR_Style_"+key]=(rt.filter===key ? "contained" : "text");
        for(const [k,v] of Object.entries(counts)) {
            ctx["TR_Count_"+k]=String(v);
            ctx["TR_Chip_"+k]=({all:"All",new:"New",assigned:"Assigned",
                approaching:"Approaching SLA",overdue:"Overdue",completed:"Completed"}[k])+" ("+v+")";
        }
        ctx.TR_Subtitle=all+" "+(all===1?"request":"requests")+" · reviewer assignment available where permitted";
        ctx.TR_Footer="Showing "+filtered(rt).length+" of "+all+" technical review tasks";
        const suffix=rt.rows.length===MAX_ROWS?" First "+MAX_ROWS+" records only; totals may be incomplete.":"";
        ctx.TR_Message=rt.stageIds.length ?
            (all===0 ? "No persisted Technical Review tasks found. Verify that the BPMN creates UsrRequestApproval records."+suffix : suffix) :
            "Technical stage is not configured/readable. Check UsrMCITApprovalStage and UsrRequestApproval.UsrStage.";
    }
    function makeCSV(rt) {
        const fields=["Request ID","Title","Contract","Authority","Project","Reviewer","Assigned On",
            "SLA Due","Status","Decision","Review Round"];
        const escape=v=>{
            let s=String(v??"");
            // Prevent Excel interpreting customer-supplied text as formulas.
            if(/^[\s]*[=+@\-]/.test(s))s="'"+s;
            return '"'+s.replace(/"/g,'""')+'"';
        };
        const lines=[fields.map(escape).join(",")];
        for(const row of filtered(rt)) {
            const req=rt.requests.get(id(row.UsrRequest).toLowerCase())||{};
            lines.push([displayedRequestCode(rt,row.UsrRequest).code,req.UsrName,
                name(req.UsrContract),name(req.UsrAccount),
                name(req.UsrProject),name(row.UsrAssignedTo),date(row.UsrAssignedOn),
                date(row.UsrDueOn),classify(row),name(row.UsrDecision),row.UsrReviewRound]
                .map(escape).join(","));
        }
        return "\ufeff"+lines.join("\r\n");
    }
    async function selectedTask(ctx, proposed) {
        let value=id(proposed);
        if(!valid(value))value=id(await ctx.DataTable_ActiveRow);
        if(!valid(value)) {
            const selection=await ctx.DataTable_SelectionState;
            if(selection?.type==="specific" && selection.selected?.length===1)value=id(selection.selected[0]);
        }
        if(!valid(value))throw Error("Select exactly one review row first.");
        const rt=stored();
        const row=rt?.rows.find(r=>id(r.Id).toLowerCase()===value.toLowerCase());
        if(!row || !rt.stageIds.includes(id(row.UsrStage).toLowerCase()))
            throw Error("The selected row is not a visible Technical Review task. Refresh the list.");
        return row;
    }
    // Insert an Actions cell in rendered native rows; never guess record ID
    // from row POSITION. Creatio may override grid columns with saved user layout.
    const norm = v => name(v).replace(/\s+/g," ").trim().toLowerCase();
    const getRowGuid = element => {
        const row=element?.closest('tr,[role="row"]');
        if(!row)return "";
        const candidates=[row,...row.querySelectorAll('[row-id],[data-row-id],[data-id]')];
        for(const node of candidates)for(const attr of ['row-id','data-row-id','data-id']) {
            const value=node.getAttribute?.(attr);
            if(valid(value))return id(value);
        }
        return "";
    };
    function recordForDOM(rt, element) {
        const row=element?.closest('tr,[role="row"]');
        if(!row)return null;
        const rid=getRowGuid(row);
        if(valid(rid)) {
            const hit=rt.rows.find(r=>id(r.Id).toLowerCase()===rid.toLowerCase());
            if(hit && rt.stageIds.includes(id(hit.UsrStage).toLowerCase()))return hit;
        }
        // Angular DataGrid versions do not all render row-id on the tr. Resolve
        // the displayed *saved* review name, then verify uniqueness. In ambiguous
        // cases disable the action instead of navigating to a different record.
        const sourceCell=row.querySelector('[data-tr-source-name]');
        const source=norm(sourceCell?.dataset.trSourceName || "");
        const rows=rt.rows.filter(r=>rt.stageIds.includes(id(r.UsrStage).toLowerCase()));
        let candidates=source ? rows.filter(r=>norm(r.UsrName)===source) : [];
        if(candidates.length===1)return candidates[0];
        // Second resolution mechanism: visible Request Title and Request ID.
        // Always require ONE exact candidate; substring matching alone is unsafe.
        const cells=[...row.querySelectorAll('td,[role="gridcell"]')];
        const titleCell=row.querySelector('.cdk-column-PDS_UsrRequest_UsrName,'+
            '[data-column-code="PDS_UsrRequest_UsrName"]');
        const numberCell=row.querySelector('.cdk-column-PDS_UsrRequest_UsrNumber,'+
            '[data-column-code="PDS_UsrRequest_UsrNumber"]');
        const title=norm(titleCell?.textContent || "");
        const number=norm(numberCell?.textContent || "");
        if(title || number) {
            candidates=rows.filter(r=>{
                const req=rt.requests.get(id(r.UsrRequest).toLowerCase())||{};
                return (!title || norm(req.UsrName)===title) &&
                    (!number || norm(req.UsrNumber)===number);
            });
            if(candidates.length===1)return candidates[0];
        }
        // Last resort: exact name from visible grid (not a row index).
        if(candidates.length!==1 && cells.length) {
            const visible=cells.map(x=>norm(x.textContent));
            candidates=rows.filter(r=>visible.includes(norm(r.UsrName)) && norm(r.UsrName));
            if(candidates.length===1)return candidates[0];
        }
        return null;
    }
    function openReview(rt,taskId) {
        if(!valid(taskId))throw Error('Review task ID is missing.');
        const row=rt.rows.find(r=>id(r.Id).toLowerCase()===taskId.toLowerCase());
        if(!row || !rt.stageIds.includes(id(row.UsrStage).toLowerCase()))
            throw Error('This record is not a Technical Review task. Refresh the list.');
        // Navigate using the same confirmed Shell/#Page/.../edit/<GUID> route as
        // the already-working Technical Review form. Does not rely on a transient
        // row-level scope or call UpdateRecordRequest on the wrong entity.
        if(rt.navigating)return;
        rt.navigating=true;
        try {
            const dest='Page/'+WORKSPACE+'/edit/'+encodeURIComponent(id(row.Id));
            if(window.location.hash.replace(/^#/, '')===dest) {rt.navigating=false;return;}
            window.location.hash=dest;
            rt.navigating=false; // Hash router owns the transition from this point.
        } catch(e) {rt.navigating=false;throw e;}
    }
    function showAssignment(rt,taskId) {
        const row=rt.rows.find(r=>id(r.Id).toLowerCase()===id(taskId).toLowerCase());
        if(!row)throw Error('Review task not found.');
        if(row.UsrIsCompleted===true || row.UsrIsCompleted===1)
            throw Error('Completed reviews cannot be reassigned.');
        rt.assignTaskId=id(row.Id);
        rt.pickerOpen=false;
        rt.ctx.TR_AssignVisible=true;
        rt.ctx.TR_AssignTitle=name(row.UsrName)+' · '+id(row.Id);
        rt.ctx.TR_SelectedReviewerId='';
        rt.ctx.TR_SelectedReviewer='No reviewer selected';
    }
    function enableRowOpen(rt) {
        rt.rowClick = event => {
            if(rt.disposed || !rt.loaded || event.defaultPrevented || event.detail>1)return;
            const target=event.target;
            if(!(target instanceof Element) || !target.closest('.usr-tr-datagrid'))return;
            if(target.closest('button,input,textarea,select,[role="checkbox"],'+
                '[role="button"],[contenteditable="true"],.crt-row-toolbar,'+
                '[data-tr-action],.usr-tr-inline-buttons'))return;
            const row=target.closest('tr,[role="row"]');
            if(!row || row.closest('thead') || row.querySelector('th') || row.getAttribute('role')==='columnheader')return;
            const anchor=target.closest('a');
            // Avoid global UsrRequestApproval default form routing to Financial Review.
            // Handle the review's own name link or links explicitly targeting Financial.
            // Preserve unrelated lookup links (Contract / Authority / Project).
            if(anchor){
                const href=anchor.getAttribute('href')||'';
                const nativeReviewName=!!anchor.closest('.cdk-column-PDS_UsrName,'+
                    '[data-column-code="PDS_UsrName"],[data-column-id="PDS_UsrName"]');
                if(!nativeReviewName && !/UsrFinancialReview_FormPage/i.test(href))return;
            }
            const record=recordForDOM(rt,row);
            if(!record){
                // Fail closed: a Financial default link must not open the wrong workspace.
                if(anchor){event.preventDefault();event.stopImmediatePropagation();
                    message('Cannot resolve this Technical Review task. Refresh the queue and use Open.');}
                return;
            }
            event.preventDefault();event.stopImmediatePropagation();
            try{openReview(rt,id(record.Id));}
            catch(e){console.error('Technical Review row navigation',e);message(e.message||String(e));}
        };
        // Capture phase is needed for Creatio grids that stop row-click bubbling.
        document.addEventListener('click',rt.rowClick,true);
    }
    function formatRemaining(ms) {
        const abs=Math.abs(ms), hours=Math.ceil(abs/3600000);
        return (ms<0?'Overdue by ':'')+(hours<1?'less than 1h':
            hours>=168?Math.ceil(hours/24)+'d':hours+'h')+(ms<0?'':' left');
    }
    function decorateSLA(rt,rowElement,record){
        const cell=rowElement.querySelector('.cdk-column-PDS_UsrDueOn,'+
            '[data-column-code="PDS_UsrDueOn"],[data-column-id="PDS_UsrDueOn"]');
        if(!cell)return;
        let detail=cell.querySelector('[data-tr-sla]');
        if(!detail){detail=document.createElement('div');detail.dataset.trSla='';cell.appendChild(detail);}
        const due=record?.UsrDueOn?new Date(record.UsrDueOn).getTime():NaN;
        if(!Number.isFinite(due)) {
            detail.className='usr-tr-sla-missing';
            if(detail.textContent!=='Not configured')detail.textContent='Not configured';
            return;
        }
        const now=Date.now(), remaining=due-now;
        const start=record?.CreatedOn?new Date(record.CreatedOn).getTime():NaN;
        const duration=Number.isFinite(start)&&due>start?due-start:NaN;
        const percentage=Number.isFinite(duration)?Math.min(100,Math.max(0,(remaining/duration)*100)):null;
        const type=remaining<=0?'overdue':remaining<=24*3600000?'approaching':'ontrack';
        detail.className='usr-tr-sla '+type;
        const updateKey=[Math.floor(now/60000),due,percentage,type].join('|');
        if(detail.dataset.trLastKey===updateKey)return;
        detail.dataset.trLastKey=updateKey;
        detail.replaceChildren();
        if(percentage!==null) {
            const bar=document.createElement('span');bar.className='usr-tr-sla-track';
            const progress=document.createElement('span');progress.className='usr-tr-sla-fill';
            progress.style.width=percentage+'%';bar.appendChild(progress);detail.appendChild(bar);
        }
        const caption=document.createElement('span');caption.className='usr-tr-sla-caption';
        caption.textContent=formatRemaining(remaining);detail.appendChild(caption);
    }
    function enableInlineRowActions(rt){
        if(typeof document==='undefined'||!document.body)return;
        const boxSelector='.usr-tr-datagrid';
        const H='[data-tr-actions-header]', C='[data-tr-actions-cell]';
        function rowsForTable(table){
            // Native rows only (the add-new/template row never receives actions).
            const all=[...table.querySelectorAll('tbody tr,[role="row"]')];
            return all.filter(row=>row.querySelector('td,[role="gridcell"]') &&
                !row.closest('thead') && !row.querySelector('[role="columnheader"]'));
        }
        function nativeTables(holder){
            // Creatio 8 typically uses a table, but support role-based grids too.
            const tables=[...holder.querySelectorAll('table')].filter(t=>t.querySelector('tbody'));
            if(tables.length)return tables.map(table=>({table,body:table,head:
                table.querySelector('thead tr') || table.querySelector('tr:has(th)')}));
            const grid=holder.querySelector('[role="grid"]');
            if(!grid)return [];
            const head=[...grid.querySelectorAll('[role="row"]')].find(r=>r.querySelector('[role="columnheader"]'));
            return [{table:grid,body:grid,head}];
        }
        function addCell(row){
            let cell=row.querySelector(C);
            if(cell)return cell;
            const tableRow=row.tagName.toLowerCase()==='tr';
            cell=document.createElement(tableRow?'td':'div');
            if(!tableRow)cell.setAttribute('role','gridcell');
            cell.className='usr-tr-actions-cell';cell.dataset.trActionsCell='';
            row.appendChild(cell);
            return cell;
        }
        function addHeading(row){
            if(!row || row.querySelector(H))return;
            const tableRow=row.tagName.toLowerCase()==='tr';
            const cell=document.createElement(tableRow?'th':'div');
            if(!tableRow)cell.setAttribute('role','columnheader');
            cell.className='usr-tr-actions-head';cell.dataset.trActionsHeader='';
            cell.textContent='Actions';cell.scope=tableRow?'col':undefined;
            row.appendChild(cell);
        }
        const I='[data-tr-requestid-cell]', IH='[data-tr-requestid-header]';
        const NATIVE_REQUEST_ID='.cdk-column-PDS_UsrRequest_UsrNumber,'+
            '[data-column-code="PDS_UsrRequest_UsrNumber"],'+
            '[data-column-id="PDS_UsrRequest_UsrNumber"]';
        // V12 root-cause correction: the V11 existence test falsely trusted a
        // native column even when user personalization made that column invisible.
        // Reserve ONE dependable, pinned Request ID column for this page.
        // Do not touch the native data source or its Page Designer metadata.
        function shadowNativeRequestId(container){
            if(!container)return;
            container.querySelectorAll(NATIVE_REQUEST_ID).forEach(el=>{
                if(!el.hasAttribute('data-tr-requestid-cell') &&
                   !el.hasAttribute('data-tr-requestid-header')){
                    if(!el.classList.contains('usr-tr-requestid-native-shadow'))
                        el.classList.add('usr-tr-requestid-native-shadow');
                }
            });
        }
        // Existing native table often reserves its first 40px track for the
        // checkbox selector. Inserting Request ID at firstElementChild without
        // also inserting a <col> caused the v12 40px collision with Title.
        // Keep the selector at the left, then put Request ID on its OWN track.
        function hasSelector(cell){
            if(!cell)return false;
            const classes=String(cell.className||'').toLowerCase();
            if(/(^|[\s_-])(selection|selectrow|checkbox)([\s_-]|$)/.test(classes))return true;
            return !!cell.querySelector?.('input[type="checkbox"],[role="checkbox"],crt-checkbox');
        }
        function positionRequestCell(row,cell){
            if(!row || !cell)return;
            const others=[...row.children].filter(node=>node!==cell &&
                node.matches('td,th,[role="gridcell"],[role="columnheader"]'));
            const index=hasSelector(others[0])?1:0;
            const before=others[index]||null;
            if(cell.nextElementSibling!==before)row.insertBefore(cell,before);
        }
        function addRequestIdHeading(head){
            if(!head)return;
            let cell=head.querySelector(IH);
            if(!cell){
                const tableRow=head.tagName.toLowerCase()==='tr';
                cell=document.createElement(tableRow?'th':'div');
                if(!tableRow)cell.setAttribute('role','columnheader');
                cell.className='usr-tr-requestid-head';cell.dataset.trRequestidHeader='';
                cell.dataset.trVersion='13';
                cell.textContent='Request ID';
                cell.title='Request ID linked to the original VM Request';
                if(tableRow)cell.scope='col';
            }
            positionRequestCell(head,cell);
        }
        function syncRequestIdColumn(table,head){
            if(!table || !head || table.tagName?.toLowerCase()!=='table')return;
            const heading=head.querySelector(IH);
            if(!heading)return;
            // Creatio's native grid may use a colgroup with fixed widths.
            // Ensure the extra ID cell gets a real col, not the selector track.
            const group=table.querySelector(':scope > colgroup');
            if(group){
                let col=group.querySelector('col[data-tr-requestid-col]');
                if(!col){col=document.createElement('col');col.dataset.trRequestidCol='';}
                const cells=[...head.children].filter(e=>e.matches('th,[role="columnheader"]'));
                const index=cells.indexOf(heading);
                const nativeCols=[...group.children].filter(e=>e!==col);
                const before=nativeCols[index] || null;
                if(col.nextElementSibling!==before || col.parentElement!==group)
                    group.insertBefore(col,before);
                col.style.setProperty('width','134px','important');
                col.style.setProperty('min-width','134px','important');
                // The right-hand custom Actions cell also needs its own track.
                // Do not borrow the width of native Completed/Decision columns.
                let actionsCol=group.querySelector('col[data-tr-actions-col]');
                if(!actionsCol){
                    actionsCol=document.createElement('col');
                    actionsCol.dataset.trActionsCol='';
                    group.appendChild(actionsCol);
                }
                actionsCol.style.setProperty('width','118px','important');
                actionsCol.style.setProperty('min-width','118px','important');
            }
            table.classList.add('usr-tr-compact-table');
        }
        function addRequestIdCell(row,record){
            const existing=row.querySelector(I);
            const request=rt.requests.get(id(record.UsrRequest).toLowerCase());
            const displayed=displayedRequestCode(rt,record.UsrRequest);
            let cell=existing;
            if(!cell){
                const tableRow=row.tagName.toLowerCase()==='tr';
                cell=document.createElement(tableRow?'td':'div');
                if(!tableRow)cell.setAttribute('role','gridcell');
                cell.className='usr-tr-requestid-cell';cell.dataset.trRequestidCell='';
            }
            positionRequestCell(row,cell);
            const key=id(record.Id);
            const oldButton=cell.querySelector('[data-tr-requestid-button]');
            if(oldButton?.dataset.trTaskId!==key)cell.replaceChildren();
            let button=cell.querySelector('[data-tr-requestid-button]');
            if(!button){
                button=document.createElement('button');button.type='button';
                button.className='usr-tr-requestid-link';
                button.dataset.trRequestidButton='';button.dataset.trTaskId=key;
                cell.appendChild(button);
            }
            const display=displayed.code||'—';
            if(button.textContent!==display)button.textContent=display;
            button.title=displayed.provisional ?
                'Provisional display ID (matching My Requests). UsrVMRequest.UsrNumber is blank: configure permanent server-side numbering.' :
                displayed.stored?'Saved Request ID from UsrVMRequest.UsrNumber' :
                'Request ID not saved or not available in My Requests scope.';
            button.disabled=display==='—'||!request;
            button.classList.toggle('usr-tr-requestid-provisional',displayed.provisional);
            button.setAttribute('aria-label','Open Technical Review for request '+display);
        }
        function applyButtons(cell,record){
            const key=id(record.Id);
            let buttons=cell.querySelector('[data-tr-action-buttons]');
            if(buttons && buttons.dataset.trRecordId!==key){buttons.remove();buttons=null;}
            if(!buttons){
                buttons=document.createElement('span');
                buttons.className='usr-tr-inline-buttons';
                buttons.dataset.trActionButtons='';buttons.dataset.trRecordId=key;
                const open=document.createElement('button');
                open.type='button';open.className='usr-tr-inline-open';
                open.textContent='Open';open.dataset.trAction='open';open.dataset.taskId=key;
                open.setAttribute('aria-label','Open Technical Review '+name(record.UsrName));
                buttons.appendChild(open);cell.appendChild(buttons);
            }
            let assign=buttons.querySelector('[data-tr-action="assign"]');
            const canAssign=!record.UsrIsCompleted && !valid(record.UsrAssignedTo);
            if(canAssign&&!assign){
                assign=document.createElement('button');
                assign.type='button';assign.className='usr-tr-inline-assign';
                assign.textContent='Assign';assign.dataset.trAction='assign';
                assign.dataset.taskId=key;
                assign.setAttribute('aria-label','Assign Technical Reviewer '+name(record.UsrName));
                buttons.appendChild(assign);
            }else if(!canAssign)assign?.remove();
        }
        const addActions=()=>{
            if(rt.disposed||!rt.loaded)return;
            const holder=document.querySelector(boxSelector);
            if(!holder)return;
            holder.classList.add('usr-tr-actions-enabled');
            for(const {table,head} of nativeTables(holder)){
                const rows=rowsForTable(table);
                // Do not append blank Actions on loading/new-record template rows.
                const matched=[];
                for(const row of rows){
                    const record=recordForDOM(rt,row);
                    const stale=row.querySelector(C);
                    if(!record){stale?.remove();continue;}
                    matched.push({row,record});
                }
                if(!matched.length){
                    head?.querySelector(H)?.remove();
                    head?.querySelector(IH)?.remove();
                    continue;
                }
                // The first col is guaranteed even if Creatio retains a hidden
                // native Request ID header from saved user column preferences.
                shadowNativeRequestId(head);
                addRequestIdHeading(head);
                addHeading(head);
                syncRequestIdColumn(table,head);
                for(const {row,record} of matched){
                    shadowNativeRequestId(row);
                    addRequestIdCell(row,record);
                    const cell=addCell(row);
                    applyButtons(cell,record);
                    decorateSLA(rt,row,record);
                }
            }
        };
        let scheduled=false;
        const schedule=()=>{
            if(scheduled||rt.disposed)return;
            scheduled=true;
            setTimeout(()=>{scheduled=false;addActions();},40);
        };
        rt.inlineActionsObserver=new MutationObserver(schedule);
        // Observe only the native grid when it exists. Creatio may build it
        // asynchronously, so the initial document observer is needed.
        rt.inlineActionsObserver.observe(document.body,{childList:true,subtree:true});
        rt.inlineActionsClick=event=>{
            if(rt.disposed)return;
            const target=event.target;
            if(!(target instanceof Element))return;
            const button=target.closest('button[data-tr-action][data-task-id]');
            if(!button||!button.closest(boxSelector))return;
            event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
            if(button.disabled)return;
            const record=recordForDOM(rt,button);
            if(!record || id(record.Id)!==button.dataset.taskId){
                message('Cannot verify this review task. Reload and try again.');return;
            }
            try{
                if(button.dataset.trAction==='assign')showAssignment(rt,id(record.Id));
                else openReview(rt,id(record.Id));
            }catch(e){console.error('Technical Review Actions',e);
                message('Action failed: '+(e.message||e));}
        };
        document.addEventListener('click',rt.inlineActionsClick,true);
        rt.requestIdClick=event=>{
            if(rt.disposed)return;
            const button=event.target instanceof Element ?
                event.target.closest('button[data-tr-requestid-button]') : null;
            if(!button || !button.closest(boxSelector))return;
            event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
            if(button.disabled)return;
            const record=recordForDOM(rt,button);
            if(!record || id(record.Id)!==button.dataset.trTaskId){
                message('Cannot verify this request. Reload the list and try again.');return;
            }
            openReview(rt,id(record.Id));
        };
        document.addEventListener('click',rt.requestIdClick,true);
        // SLA depends ONLY on the persisted UsrDueOn from the actual BPMN.
        rt.slaTimer=setInterval(()=>{if(!rt.disposed){paint(rt);schedule();}},60000);
        rt.refreshInlineActions=schedule;
        schedule();
    }

    // Role-scoped Contact selection. Only direct members of the actual Creatio
    // functional role (Users tab) may appear in the native lookup.
    // SysUserInRole.SysUser -> SysAdminUnit (user) -> Contact.
    // Do not use Contact names, hard-coded IDs, or a client-only dropdown list.
    async function reviewerLookupFilters() {
        const roles=(await sdkRows("SysAdminUnit",["Id","Name","SysAdminUnitTypeValue"],
            [["Name",TARGET_ROLE]],50))
            .filter(r=>name(r.Name).toLowerCase()===TARGET_ROLE.toLowerCase() &&
                Number(r.SysAdminUnitTypeValue)===6 && valid(r.Id));
        if(roles.length!==1)
            throw Error("Cannot resolve a unique functional role: "+TARGET_ROLE+". No unfiltered lookup will open.");

        const members=await sdkRows("SysUserInRole",["Id","SysUser","SysRole"],
            [["SysRole",id(roles[0].Id)]],10000);
        if(members.length===10000)
            throw Error("Reviewer role membership exceeds the safe query limit. No unfiltered lookup will open.");
        const userIds=[...new Set(members.map(m=>id(m.SysUser).toLowerCase()).filter(valid))];
        const contactIds=new Set();
        // Load referenced user units in bounded batches; do not retrieve every Contact.
        const unitModel=await sdk.Model.create("SysAdminUnit");
        for(let offset=0;offset<userIds.length;offset+=40) {
            const batch=userIds.slice(offset,offset+40);
            const f=new sdk.FilterGroup();
            f.logicalOperation=sdk.LogicalOperatorType.Or;
            for(const userId of batch)
                await f.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,"Id",userId);
            const users=await unitModel.load({
                attributes:["Id","Contact","SysAdminUnitTypeValue"],
                parameters:[{type:sdk.ModelParameterType.Filter,value:filterValue(f)}],
                options:{pagingConfig:{rowsOffset:0,rowCount:batch.length+1}}
            }) || [];
            if(users.length>batch.length)
                throw Error("Unexpected user-unit result count. No unfiltered lookup will open.");
            for(const user of users)
                if(batch.includes(id(user.Id).toLowerCase()) &&
                   Number(user.SysAdminUnitTypeValue)===4 && valid(user.Contact))
                    contactIds.add(id(user.Contact).toLowerCase());
        }
        if(!contactIds.size)
            throw Error("No Contacts are linked to users in "+TARGET_ROLE+". Assign users to the role first.");

        const filter=new sdk.FilterGroup();
        filter.logicalOperation=sdk.LogicalOperatorType.Or;
        for(const contactId of contactIds)
            await filter.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,"Id",contactId);
        return {
            filterAttributes:[{name:"UsrReviewerRoleContactFilter",loadOnChange:false}],
            attributesConfig:{UsrReviewerRoleContactFilter:{
                value:{...filterValue(filter),rootSchemaName:"Contact"}
            }}
        };
    }

    async function eligibleReviewer(contactId) {
        // Read Creatio functional role membership (SysUserInRole); do not trust UI options.
        const roles=(await sdkRows("SysAdminUnit",["Id","Name","SysAdminUnitTypeValue"],[],2500))
            .filter(r=>name(r.Name).toLowerCase()===TARGET_ROLE.toLowerCase() &&
                Number(r.SysAdminUnitTypeValue)===6);
        if(roles.length!==1)throw Error("Unable to resolve the unique "+TARGET_ROLE+" functional role.");
        const units=await sdkRows("SysAdminUnit",["Id","Contact","SysAdminUnitTypeValue"],
            [["Contact",contactId]],100);
        const users=units.filter(u=>Number(u.SysAdminUnitTypeValue)===4);
        for(const user of users) {
            const membership=await sdkRows("SysUserInRole",["Id","SysUser","SysRole"],
                [["SysUser",id(user.Id)],["SysRole",id(roles[0].Id)]],5);
            if(membership.length)return true;
        }
        return false;
    }
    // Creatio can return either the legacy lookupValues array/dictionary or a
    // SelectionWindowResult with getLookupValues(). Handle both without guessing.
    async function selectedContactFromLookup(result) {
        if (!result || result.canceled === true) return null;
        let values = [];
        if (typeof result.getLookupValues === "function") {
            values = await result.getLookupValues({pagingConfig:{rowsOffset:0,rowCount:2}});
        } else if (Array.isArray(result)) {
            values = result;
        } else if (Array.isArray(result.value)) {
            values = result.value;
        } else if (Array.isArray(result.selectedRows)) {
            values = result.selectedRows;
        } else if (result.selectedRows && typeof result.selectedRows === "object") {
            values = Object.values(result.selectedRows);
        } else if (result.value && typeof result.value === "object") {
            values = Object.values(result.value);
        } else if (valid(result)) {
            values = [result];
        } else if (typeof result === "object") {
            values = Object.values(result).filter(valid);
        }
        if (!Array.isArray(values)) values = Object.values(values || {});
        const selected = values.filter(valid);
        if (selected.length > 1) throw Error("Select exactly one reviewer.");
        return selected[0] || null;
    }
    async function contactDisplayName(contactId) {
        const contacts=await sdkRows("Contact",["Id","Name"],[["Id",contactId]],1);
        const contact=contacts.find(c=>id(c.Id).toLowerCase()===contactId.toLowerCase());
        if (!contact) throw Error("The selected Contact could not be found or read.");
        return name(contact.Name);
    }
    async function assign(ctx, taskId, reviewerId) {
        const row=await selectedTask(ctx,taskId);
        if(row.UsrIsCompleted)throw Error("Completed reviews cannot be reassigned.");
        // This is a QUEUE assignment only. Existing SysApproval is role-based.
        // A different native approver requires the supported Approvals UI delegation.
        if(!valid(reviewerId))throw Error("Select one reviewer first.");
        if(!ENABLE_ASSIGNMENT_WRITES)throw Error(
            "Assignment is in safe mode. Confirm the UsrAssignedTo lookup target, " +
            "the Technical Approval BPMN linkage and server permissions before enabling writes.");
        if(!(await eligibleReviewer(reviewerId)))throw Error(
            "Selected contact is not in the "+TARGET_ROLE+" role.");
        const fresh=(await sdkRows(OBJECT,["Id","UsrStage","UsrAssignedTo","UsrIsCompleted"],
            [["Id",id(row.Id)]],1))[0];
        if(!fresh || fresh.UsrIsCompleted || valid(fresh.UsrAssignedTo) ||
           !stored()?.stageIds.includes(id(fresh.UsrStage).toLowerCase()))
            throw Error("The task changed since selection; refresh the queue.");
        const model=await sdk.Model.create(OBJECT);
        const result=await model.update({UsrAssignedTo:reviewerId,UsrAssignedOn:new Date()},
            [{type:sdk.ModelParameterType.PrimaryColumnValue,value:id(row.Id)}]);
        if(result===false || result?.success===false || result?.rowsAffected===0)
            throw Error("Creatio rejected the assignment.");
        const check=(await sdkRows(OBJECT,["Id","UsrAssignedTo"],
            [["Id",id(row.Id)]],1))[0];
        if(id(check?.UsrAssignedTo).toLowerCase()!==reviewerId.toLowerCase())
            throw Error("Assignment not confirmed in Creatio. Check permissions and BPMN.");
        return true;
    }
    const CSS=`
    /* TE Operations Technical Queue – scoped styles only, no replacement HTML */
    .usr-tr-root{padding:11px 11px 16px!important;gap:13px!important;max-width:100%!important}
    .usr-tr-header{display:flex!important;flex-direction:row!important;flex-wrap:wrap!important;
        justify-content:space-between!important;align-items:center!important;gap:14px!important;
        padding:1px 0 0!important}
    .usr-tr-headtitles{flex:1 1 320px!important;gap:2px!important;min-width:0!important}
    .usr-tr-title,.usr-tr-title *{font-size:20px!important;font-weight:750!important;
        letter-spacing:-.35px!important;line-height:1.25!important;color:#13223c!important}
    .usr-tr-subtitle,.usr-tr-subtitle *{font-size:12px!important;color:#69778e!important;
        line-height:1.5!important}
    .usr-tr-export{margin-left:auto!important;align-self:flex-start!important}
    .usr-tr-export button,.usr-tr-export .crt-button,.usr-tr-export .crt-button-container{
        border:1px solid #e1e5ed!important;border-radius:10px!important;background:#fff!important;
        color:#26344d!important;box-shadow:none!important;font-weight:600!important;
        min-height:36px!important;padding:0 16px!important}
    .usr-tr-export button:hover{background:#f7f4ff!important;border-color:#d8c8ff!important}
    .usr-tr-metrics{display:flex!important;flex-wrap:wrap!important;gap:10px!important;
        align-items:stretch!important;width:100%!important}
    .usr-tr-card{background:#fff!important;border:1px solid #e4e7ee!important;
        border-radius:13px!important;flex:1 1 176px!important;min-width:154px!important;
        min-height:72px!important;padding:10px 13px!important;gap:4px!important;box-sizing:border-box!important}
    .usr-tr-card .crt-label,.usr-tr-card>*,.usr-tr-card span{line-height:1.35!important}
    .usr-tr-card-value,.usr-tr-card-value *{font-size:23px!important;line-height:1!important;
        font-weight:800!important;color:#6320b4!important;font-variant-numeric:tabular-nums!important}
    .usr-tr-card-approaching .usr-tr-card-value,.usr-tr-card-approaching .usr-tr-card-value *{color:#da7600!important}
    .usr-tr-card-overdue .usr-tr-card-value,.usr-tr-card-overdue .usr-tr-card-value *{color:#df2531!important}
    .usr-tr-card-completed .usr-tr-card-value,.usr-tr-card-completed .usr-tr-card-value *{color:#0c9e55!important}
    .usr-tr-toolbar{background:#fff!important;border:1px solid #e5e8f0!important;
        border-radius:13px!important;padding:10px 12px!important;gap:7px!important;
        align-items:stretch!important}
    .usr-tr-search{width:100%!important;min-width:0!important;box-sizing:border-box!important}
    .usr-tr-search input,.usr-tr-search .crt-input,.usr-tr-search input[type=text]{
        width:100%!important;min-height:35px!important;border-radius:8px!important;
        background:#f9fafc!important;border:1px solid #e2e7ef!important;box-shadow:none!important;
        color:#17263d!important;font-size:12px!important;padding:8px 13px!important}
    .usr-tr-search input:focus{border-color:#7c3aed!important;outline-color:#7c3aed!important}
    .usr-tr-chips{gap:6px!important;align-items:center!important;flex-wrap:wrap!important}
    .usr-tr-chip{border-radius:100px!important;min-height:27px!important}
    .usr-tr-chip button,.usr-tr-chip .crt-button{border-radius:100px!important;
        min-height:26px!important;padding:4px 11px!important;border:0!important;
        font-size:11px!important;font-weight:600!important;box-shadow:none!important}
    .usr-tr-chip button:not([disabled]){cursor:pointer!important}
    /* Active is the native Button's bound contained state, not a hard-coded count. */
    .usr-tr-chip button[class*=contained],
    .usr-tr-chip .crt-button[class*=contained],
    .usr-tr-chip button[data-display-type=contained]{background:#6221b6!important;color:white!important}
    .usr-tr-notice:empty{display:none!important}
    .usr-tr-notice{font-size:12px!important;color:#b45309!important}
    .usr-tr-datagrid{background:#fff!important;border:1px solid #e5e8ef!important;
        border-radius:13px!important;overflow-x:auto!important;overflow-y:auto!important;width:100%!important}
    .usr-tr-datagrid table{width:max-content!important;min-width:100%!important;
        table-layout:auto!important;border-collapse:collapse!important}
    /* Every added cell must have a real column track. Text remains inside cells. */
    .usr-tr-datagrid col[data-tr-requestid-col]{width:134px!important;min-width:134px!important}
    .usr-tr-datagrid col[data-tr-actions-col]{width:118px!important;min-width:118px!important}
    .usr-tr-datagrid .usr-tr-compact-table th,
    .usr-tr-datagrid .usr-tr-compact-table td{box-sizing:border-box!important}
    .usr-tr-datagrid th,.usr-tr-datagrid [role=columnheader]{background:#fbfcff!important;
        color:#66748c!important;font-weight:700!important;font-size:11px!important;
        border-bottom:1px solid #eceff5!important;padding:9px 8px!important;
        line-height:1.15!important;white-space:nowrap!important}
    .usr-tr-datagrid td,.usr-tr-datagrid [role=gridcell]{color:#23324b!important;
        font-size:12px!important;border-bottom:1px solid #eff1f6!important;
        padding:8px 8px!important;line-height:1.22!important;
        vertical-align:middle!important;white-space:nowrap!important}
    .usr-tr-datagrid tr[row-id],.usr-tr-datagrid tr[data-row-id],
    .usr-tr-datagrid tr.crt-data-table-row{cursor:pointer!important}
    .usr-tr-datagrid tbody tr:hover td{background:#faf7ff!important}
    .usr-tr-datagrid tbody tr:last-child td{border-bottom:0!important}
    /* v13: grid column widths remain aligned, including the native checkbox column.
       Existing fields are kept functional; shrink only selected long native cells. */
    .usr-tr-datagrid .cdk-column-PDS_UsrRequest_UsrName,
    .usr-tr-datagrid .cdk-column-PDS_UsrRequest_UsrAccount,
    .usr-tr-datagrid .cdk-column-PDS_UsrRequest_UsrProject{
        max-width:158px!important;overflow:hidden!important;text-overflow:ellipsis!important}
    .usr-tr-datagrid .cdk-column-PDS_UsrRequest_UsrContract,
    .usr-tr-datagrid .cdk-column-PDS_UsrAssignedTo{
        max-width:143px!important;overflow:hidden!important;text-overflow:ellipsis!important}
    /* v13: trust the actual table, NOT invisible native-header existence.
       Some users have per-user persisted DataGrid columns: suppress only the
       stale native column while retaining its schema for Page Designer. */
    .usr-tr-actions-enabled .usr-tr-requestid-native-shadow{
        display:none!important;visibility:hidden!important;width:0!important;
        min-width:0!important;max-width:0!important;padding:0!important;
        border:0!important;
    }
    /* v12: always-visible real My Requests code, even with saved Creatio grid columns. */
    .usr-tr-actions-enabled .usr-tr-requestid-head,
    .usr-tr-actions-enabled .usr-tr-requestid-cell{
        display:table-cell!important;
        width:134px!important;min-width:134px!important;max-width:134px!important;
        box-sizing:border-box!important;position:relative!important;left:auto!important;
        z-index:1!important;vertical-align:middle!important;overflow:hidden!important;
        background:#fff!important;border-right:1px solid #edf0f5!important;
        box-shadow:none!important;
        padding:7px 10px!important;white-space:nowrap!important;
    }
    .usr-tr-actions-enabled .usr-tr-requestid-head{
        z-index:2!important;background:#f9fafd!important;color:#475569!important;
        font-weight:700!important;font-size:12px!important;
    }
    .usr-tr-actions-enabled tr:hover .usr-tr-requestid-cell,
    .usr-tr-actions-enabled [role=row]:hover .usr-tr-requestid-cell{
        background:#fbf8ff!important;
    }
    .usr-tr-actions-enabled .usr-tr-requestid-link{
        appearance:none!important;border:0!important;background:none!important;
        padding:3px 0!important;white-space:nowrap!important;display:inline-block!important;
        max-width:112px!important;overflow:hidden!important;text-overflow:ellipsis!important;
        color:#6526b8!important;text-decoration:underline!important;
        text-underline-offset:3px!important;font-size:12px!important;
        font-weight:700!important;font-family:inherit!important;cursor:pointer!important;
    }
    .usr-tr-actions-enabled .usr-tr-requestid-link:hover{
        color:#47118e!important;text-decoration-thickness:2px!important;
    }
    .usr-tr-actions-enabled .usr-tr-requestid-link:disabled{
        color:#7a8797!important;cursor:default!important;text-decoration:none!important;
    }
    .usr-tr-actions-enabled .usr-tr-requestid-provisional{
        text-decoration-style:dotted!important;
    }
    /* v10: real Creatio DataGrid stays in place; only the rendered Actions cell is enhanced. */
    .usr-tr-actions-enabled .usr-tr-actions-head,
    .usr-tr-actions-enabled .usr-tr-actions-cell{
        width:118px!important;min-width:118px!important;max-width:118px!important;
        box-sizing:border-box!important;text-align:left!important;
        border-left:1px solid #edf0f5!important;
        background:#fff!important;position:sticky!important;right:0!important;
        z-index:3!important;padding:8px 7px!important;white-space:nowrap!important;
        box-shadow:-3px 0 7px rgba(30,38,61,.035)!important;
        vertical-align:middle!important;
    }
    .usr-tr-actions-enabled .usr-tr-actions-head{background:#f9fafd!important;
        z-index:5!important;color:#475569!important;font-weight:700!important;
        font-size:12px!important;text-transform:none!important}
    .usr-tr-actions-enabled .usr-tr-actions-cell{font-size:12px!important}
    .usr-tr-actions-enabled tr:hover .usr-tr-actions-cell,
    .usr-tr-actions-enabled [role=row]:hover .usr-tr-actions-cell{background:#fbf8ff!important}
    .usr-tr-actions-enabled .usr-tr-inline-buttons{
        display:flex!important;flex-direction:row!important;align-items:center!important;
        justify-content:flex-start!important;gap:0!important;max-width:100%!important;
        white-space:nowrap!important;background:transparent!important;
    }
    .usr-tr-actions-enabled .usr-tr-inline-buttons button{
        display:inline-flex!important;align-items:center!important;justify-content:center!important;
        font-family:inherit!important;font-size:12px!important;font-weight:700!important;
        color:#6121b6!important;background:transparent!important;border:0!important;
        border-radius:6px!important;cursor:pointer!important;padding:5px 6px!important;
        outline-offset:2px!important;line-height:1.3!important;
    }
    .usr-tr-actions-enabled .usr-tr-inline-buttons button:hover,
    .usr-tr-actions-enabled .usr-tr-inline-buttons button:focus-visible{
        background:#eee6fc!important;outline:1px solid #d7c6f3!important;
    }
    .usr-tr-actions-enabled .usr-tr-inline-buttons button.usr-tr-inline-assign{color:#078447!important}
    .usr-tr-actions-enabled .usr-tr-inline-buttons button.usr-tr-inline-assign:hover{
        background:#e8fff1!important}
    /* no per-record three-dot menu; only Open / Assign remain */
    .usr-tr-actions-enabled .crt-row-toolbar,
    .usr-tr-actions-enabled [class*="row-toolbar"],
    .usr-tr-actions-enabled [class*="rowToolbar"],
    .usr-tr-actions-enabled tbody tr button[aria-haspopup="menu"],
    .usr-tr-actions-enabled tbody tr [role="button"][aria-haspopup="menu"],
    .usr-tr-actions-enabled [role="row"] [class*="row-action-menu"]{
        display:none!important
    }
    .usr-tr-datagrid .usr-tr-sla{display:flex!important;flex-direction:column!important;
        align-items:flex-start!important;gap:3px!important;font-size:11px!important;font-weight:650!important}
    .usr-tr-datagrid .usr-tr-sla-track{display:block!important;width:74px!important;
        height:5px!important;border-radius:9px!important;background:#eef0f5!important;
        overflow:hidden!important}
    .usr-tr-datagrid .usr-tr-sla-fill{display:block!important;height:100%!important;
        background:#169a4a!important;border-radius:9px!important}
    .usr-tr-datagrid .usr-tr-sla.approaching .usr-tr-sla-fill{background:#de7700!important}
    .usr-tr-datagrid .usr-tr-sla.overdue .usr-tr-sla-fill{background:#df2531!important}
    .usr-tr-datagrid .usr-tr-sla.ontrack .usr-tr-sla-caption{color:#159447!important}
    .usr-tr-datagrid .usr-tr-sla.approaching .usr-tr-sla-caption{color:#cf7200!important}
    .usr-tr-datagrid .usr-tr-sla.overdue .usr-tr-sla-caption{color:#cf2932!important}
    .usr-tr-datagrid .usr-tr-sla-missing{font-size:11px!important;color:#7d8795!important;
        white-space:nowrap!important}
    .usr-tr-datagrid tbody tr,.usr-tr-datagrid [role=row][data-row-id]{cursor:pointer!important}
    .usr-tr-footer,.usr-tr-footer *{font-size:12px!important;color:#69778e!important}
    .usr-tr-footer{padding:0 12px!important;margin-top:-10px!important}
    .usr-tr-dialog{position:fixed!important;left:50%!important;top:50%!important;
        transform:translate(-50%,-50%)!important;z-index:10990!important;
        background:#fff!important;padding:22px!important;width:350px!important;
        box-shadow:0 0 0 100vmax rgba(15,23,42,.48),0 16px 35px rgba(15,23,42,.18)!important;
        border-radius:14px!important;border:1px solid #e5e7eb!important;gap:15px!important}
    .usr-tr-dialog-title,.usr-tr-dialog-title *{font-size:15px!important;
        font-weight:700!important;color:#111827!important}
    .usr-tr-dialog-selection,.usr-tr-dialog-selection *{font-size:13px!important;color:#6121b5!important}
    .usr-tr-dialog-actions{gap:12px!important;justify-content:space-between!important}
    /* v7: Figma color + typography fallback on stable native component IDs */
    body #TR_Title,body #TR_Title .crt-label,body #TR_Title span,
    body .usr-tr-headtitles crt-label:first-child,body .usr-tr-title,
    body .usr-tr-title * {font-size:24px!important;font-weight:700!important;line-height:1.3!important;color:#11213a!important;letter-spacing:-.45px!important}
    body #TR_Subtitle,body #TR_Subtitle .crt-label,body .usr-tr-subtitle,
    body .usr-tr-subtitle *{font-size:13px!important;color:#64748b!important;line-height:1.5!important}
    body #TR_Card_newValue,body #TR_Card_newValue .crt-label,
    body .usr-tr-card-new crt-label:last-child,body .usr-tr-card-new .usr-tr-card-value,
    body .usr-tr-card-new .usr-tr-card-value *{font-size:24px!important;font-weight:750!important;color:#6725b8!important}
    body #TR_Card_assignedValue,body #TR_Card_assignedValue .crt-label,
    body .usr-tr-card-assigned .usr-tr-card-value,body .usr-tr-card-assigned .usr-tr-card-value *{font-size:24px!important;font-weight:750!important;color:#6725b8!important}
    body #TR_Card_approachingValue,body #TR_Card_approachingValue .crt-label,
    body .usr-tr-card-approaching .usr-tr-card-value,body .usr-tr-card-approaching .usr-tr-card-value *{font-size:24px!important;font-weight:750!important;color:#dd7b00!important}
    body #TR_Card_overdueValue,body #TR_Card_overdueValue .crt-label,
    body .usr-tr-card-overdue .usr-tr-card-value,body .usr-tr-card-overdue .usr-tr-card-value *{font-size:24px!important;font-weight:750!important;color:#de2631!important}
    body #TR_Card_completedValue,body #TR_Card_completedValue .crt-label,
    body .usr-tr-card-completed .usr-tr-card-value,body .usr-tr-card-completed .usr-tr-card-value *{font-size:24px!important;font-weight:750!important;color:#0a9f62!important}
    body #TR_Export,body .usr-tr-export{border:1px solid #dbe0e8!important;
        border-radius:10px!important;background:#fff!important;padding:0 12px!important;min-height:36px!important}
    body #TR_Export button,body .usr-tr-export button{color:#192a46!important;
        background:#fff!important;font-weight:600!important;border-radius:9px!important}
    @media(max-width:1040px){.usr-tr-card{flex-basis:145px!important;min-width:140px!important}}
    @media(max-width:780px){.usr-tr-root{padding:10px 8px!important}.usr-tr-header{align-items:flex-start!important}
        .usr-tr-card{flex:1 1 140px!important}.usr-tr-title,.usr-tr-title *{font-size:18px!important}}

    /* =====================================================================
       v5 — SAFE FIGMA POLISH + HEADER HEIGHT FIX (TECHNICAL REVIEW ONLY)
       NO new native viewDiff components, NO DOM relocation, NO table height.
       Breadcrumb is visually positioned without occupying a flex-item slot.
       ===================================================================== */
    .usr-tr-root {
        position:relative!important;
        background:#f8f9fb!important;
        padding:13px 12px 16px!important;
        gap:14px!important;
        max-width:100%!important;
        box-sizing:border-box!important;
    }
    .usr-tr-root::before {
        content:"TE Operations  ›  Technical Review  ›  Queue";
        position:absolute;
        left:12px;
        top:-22px;
        white-space:nowrap;
        pointer-events:none;
        color:#8895aa;
        font-family:inherit;
        font-size:11px;
        font-weight:500;
        line-height:18px;
        z-index:1;
    }
    /* Header has its own real layout height: metrics must never cover subtitle. */
    .usr-tr-header {
        display:flex!important;
        flex-direction:row!important;
        flex-wrap:wrap!important;
        justify-content:space-between!important;
        align-items:flex-start!important;
        column-gap:14px!important;
        row-gap:8px!important;
        padding:0 0 4px!important;
        margin:0!important;
        min-height:62px!important;
        height:auto!important;
        flex:0 0 auto!important;
        overflow:visible!important;
        box-sizing:border-box!important;
    }
    .usr-tr-headtitles {
        display:flex!important;
        flex-direction:column!important;
        flex-wrap:nowrap!important;
        align-items:flex-start!important;
        justify-content:flex-start!important;
        flex:1 1 300px!important;
        min-width:0!important;
        min-height:56px!important;
        height:auto!important;
        gap:5px!important;
        margin:0!important;
        overflow:visible!important;
        box-sizing:border-box!important;
    }
    body #TR_Title,body .usr-tr-title {
        display:block!important;
        flex:0 0 auto!important;
        height:auto!important;
        min-height:25px!important;
        margin:0!important;
        overflow:visible!important;
        white-space:normal!important;
    }
    body #TR_Subtitle,body .usr-tr-subtitle {
        display:block!important;
        flex:0 0 auto!important;
        height:auto!important;
        min-height:19px!important;
        margin:0!important;
        overflow:visible!important;
        white-space:normal!important;
        text-overflow:clip!important;
    }
    body #TR_Subtitle *,body .usr-tr-subtitle * {
        white-space:normal!important;
        overflow:visible!important;
        text-overflow:clip!important;
        max-height:none!important;
    }
    body #TR_Title,body #TR_Title .crt-label,body #TR_Title span,
    body .usr-tr-title,body .usr-tr-title * {
        color:#11213a!important;
        font-family:inherit!important;
        font-size:19px!important;
        font-weight:750!important;
        letter-spacing:-.25px!important;
        line-height:1.25!important;
    }
    body #TR_Subtitle,body .usr-tr-subtitle,body .usr-tr-subtitle * {
        color:#64748b!important;
        font-size:12px!important;
        font-weight:400!important;
        line-height:1.5!important;
    }
    /* One outline on Export, never a second outline around its container. */
    body #TR_Export,body .usr-tr-export {
        margin:0 0 0 auto!important;
        align-self:flex-start!important;
        background:transparent!important;
        border:0!important;
        min-height:0!important;
        box-shadow:none!important;
        padding:0!important;
    }
    body .usr-tr-export button,body .usr-tr-export .crt-button,
    body .usr-tr-export .crt-button-container {
        background:#fff!important;
        border:1px solid #e1e6ef!important;
        border-radius:10px!important;
        box-shadow:none!important;
        color:#263750!important;
        font-size:12px!important;
        font-weight:650!important;
        min-height:35px!important;
        padding:0 14px!important;
    }
    body .usr-tr-export .crt-button-container,
    body .usr-tr-export .crt-button:has(button) {
        border:0!important;
        background:transparent!important;
        padding:0!important;
        box-shadow:none!important;
    }
    body .usr-tr-export button:hover {background:#f7f4ff!important;border-color:#d7c7f7!important}
    /* Five equal-height cards; break to new row only on small screens. */
    .usr-tr-metrics {
        display:flex!important;
        width:100%!important;
        flex-wrap:nowrap!important;
        align-items:stretch!important;
        gap:11px!important;
        margin:0!important;
    }
    .usr-tr-metrics > .usr-tr-card {
        flex:1 1 0!important;
        min-width:0!important;
        max-width:none!important;
        background:#fff!important;
        border:1px solid #e2e6ee!important;
        border-radius:13px!important;
        min-height:70px!important;
        padding:11px 14px!important;
        box-sizing:border-box!important;
        box-shadow:none!important;
        gap:4px!important;
    }
    .usr-tr-card .usr-tr-card-value,.usr-tr-card .usr-tr-card-value *,
    body #TR_Card_newValue,body #TR_Card_assignedValue,
    body #TR_Card_approachingValue,body #TR_Card_overdueValue,
    body #TR_Card_completedValue {
        font-size:22px!important;
        font-weight:800!important;
        line-height:1.1!important;
    }
    .usr-tr-card-new .usr-tr-card-value,
    .usr-tr-card-assigned .usr-tr-card-value {color:#6624c7!important}
    .usr-tr-card-approaching .usr-tr-card-value {color:#df7900!important}
    .usr-tr-card-overdue .usr-tr-card-value {color:#df2735!important}
    .usr-tr-card-completed .usr-tr-card-value {color:#0a9f62!important}
    .usr-tr-toolbar {
        background:#fff!important;
        border:1px solid #e1e6ee!important;
        border-radius:13px!important;
        padding:12px 14px!important;
        gap:10px!important;
        align-items:stretch!important;
        box-shadow:none!important;
    }
    .usr-tr-search {width:100%!important;min-width:0!important}
    .usr-tr-search input,.usr-tr-search input[type=text],
    .usr-tr-search .crt-input input {
        width:100%!important;
        min-height:35px!important;
        padding:7px 12px!important;
        box-sizing:border-box!important;
        background:#f8f9fc!important;
        border:1px solid #e1e5ee!important;
        border-radius:9px!important;
        box-shadow:none!important;
        color:#223551!important;
        font-size:12px!important;
    }
    .usr-tr-search input::placeholder {color:#98a4b6!important;opacity:1!important}
    .usr-tr-search input:focus {border-color:#8451cf!important;outline-color:#8451cf!important}
    .usr-tr-chips {display:flex!important;flex-wrap:wrap!important;gap:7px!important;align-items:center!important}
    .usr-tr-chips .usr-tr-chip {
        display:inline-flex!important;
        align-items:center!important;
        justify-content:center!important;
        border-radius:999px!important;
        min-height:26px!important;
        padding:0 9px!important;
        background:#f1f2f5!important;
        border:1px solid transparent!important;
        box-shadow:none!important;
        color:#65748d!important;
    }
    .usr-tr-chips .usr-tr-chip button,
    .usr-tr-chips .usr-tr-chip .crt-button,
    .usr-tr-chips .usr-tr-chip .crt-button-container {
        border:0!important;
        border-radius:999px!important;
        padding:0!important;
        min-height:24px!important;
        background:transparent!important;
        box-shadow:none!important;
        color:#65748d!important;
        font-size:11px!important;
        font-weight:650!important;
        text-decoration:none!important;
    }
    body[data-usr-tr-filter="all"] .usr-tr-chip-all,
    body[data-usr-tr-filter="new"] .usr-tr-chip-new,
    body[data-usr-tr-filter="assigned"] .usr-tr-chip-assigned,
    body[data-usr-tr-filter="approaching"] .usr-tr-chip-approaching,
    body[data-usr-tr-filter="overdue"] .usr-tr-chip-overdue,
    body[data-usr-tr-filter="completed"] .usr-tr-chip-completed {
        background:#6423c1!important;
        border-color:#6423c1!important;
        color:#fff!important;
    }
    body[data-usr-tr-filter="all"] .usr-tr-chip-all *,
    body[data-usr-tr-filter="new"] .usr-tr-chip-new *,
    body[data-usr-tr-filter="assigned"] .usr-tr-chip-assigned *,
    body[data-usr-tr-filter="approaching"] .usr-tr-chip-approaching *,
    body[data-usr-tr-filter="overdue"] .usr-tr-chip-overdue *,
    body[data-usr-tr-filter="completed"] .usr-tr-chip-completed * {
        color:#fff!important;
        background:transparent!important;
        border-color:transparent!important;
        text-decoration:none!important;
    }
    /* Native grid: colors, typography, and borders ONLY. Preserve its actual
       table/colgroup sizing, header, row actions, scrolling, and user columns. */
    .usr-tr-datagrid {border-color:#e1e6ee!important;border-radius:13px!important;box-shadow:none!important}
    .usr-tr-datagrid th,.usr-tr-datagrid [role=columnheader],
    .usr-tr-actions-enabled .usr-tr-actions-head,
    .usr-tr-actions-enabled .usr-tr-requestid-head {
        background:#f8f9fb!important;
        color:#65748c!important;
        border-bottom:1px solid #e8ebf1!important;
        font-size:11px!important;
        font-weight:700!important;
    }
    .usr-tr-datagrid td,.usr-tr-datagrid [role=gridcell] {
        color:#263751!important;
        border-bottom:1px solid #edf0f5!important;
        font-size:12px!important;
    }
    .usr-tr-datagrid tbody tr:nth-child(even) td,
    .usr-tr-actions-enabled tbody tr:nth-child(even) .usr-tr-actions-cell,
    .usr-tr-actions-enabled tbody tr:nth-child(even) .usr-tr-requestid-cell {background:#fafbfe!important}
    .usr-tr-datagrid tbody tr:hover td,
    .usr-tr-actions-enabled tbody tr:hover .usr-tr-actions-cell,
    .usr-tr-actions-enabled tbody tr:hover .usr-tr-requestid-cell {background:#f6f1ff!important}
    .usr-tr-actions-enabled .usr-tr-requestid-link {
        color:#6322ba!important;
        font-weight:700!important;
        text-decoration:underline!important;
    }
    .usr-tr-footer {
        padding:2px 10px!important;
        margin-top:-8px!important;
        background:transparent!important;
        border:0!important;
        min-height:0!important;
    }
    .usr-tr-footer,.usr-tr-footer * {
        font-size:11px!important;
        font-weight:450!important;
        color:#65748b!important;
    }
    @media(max-width:1100px){
        .usr-tr-metrics {flex-wrap:wrap!important}
        .usr-tr-metrics > .usr-tr-card {flex:1 1 165px!important}
    }
    @media(max-width:780px){
        .usr-tr-root {padding:10px 8px 16px!important;gap:12px!important}
        .usr-tr-root::before {left:8px;font-size:10px}
        .usr-tr-headtitles {min-width:0!important;flex:1 1 200px!important}
        body .usr-tr-title,body .usr-tr-title * {font-size:18px!important}
    }
    `;

    const runtimeHandlers = [
            {request:"crt.HandleViewModelInitRequest",handler:async(req,next)=>{
                const ret=await next?.handle(req);
                if(inDesigner())return ret;
                const ctx=req.$context;
                stored()?.dispose?.();
                const rt={ctx,rows:[],requests:new Map(),requestCodes:new Map(),stageIds:[],filter:"all",search:"",
                    disposed:false,loaded:false,clock:null,style:null,
                    dispose(){this.disposed=true;clearTimeout(this.clock);if(this.rowClick)document.removeEventListener('click',this.rowClick,true);clearInterval(this.slaTimer);
                        this.inlineActionsObserver?.disconnect();
                        if(this.inlineActionsClick)document.removeEventListener('click',this.inlineActionsClick,true);
                        if(this.requestIdClick)document.removeEventListener('click',this.requestIdClick,true);
                        document.querySelectorAll('.usr-tr-datagrid [data-tr-actions-cell],.usr-tr-datagrid [data-tr-actions-header],.usr-tr-datagrid [data-tr-requestid-cell],.usr-tr-datagrid [data-tr-requestid-header],.usr-tr-datagrid [data-tr-sla]')
                            .forEach(el=>el.remove());
                        this.style?.remove();
                        if(stored()===this){
                            document.body?.removeAttribute("data-usr-tr-filter");
                            delete document[RUNTIME_KEY];
                        }},
                    async refresh(){
                        this.rows=await sdkRows(OBJECT,["Id","UsrName","UsrRequest","UsrStage",
                            "UsrAssignedTo","UsrAssignedOn","UsrDueOn","UsrDecision",
                            "UsrIsCompleted","UsrReviewRound","CreatedOn"],[],MAX_ROWS);
                        this.requests=await hydrateRequests(this.rows);
                        this.requestCodes=await hydrateRequestCodes(this.requests);
                        this.stageIds=await findStageIds(this.rows);
                        if(this.disposed)return;
                        this.loaded=true;paint(this);await reloadPDS(ctx);
                        this.refreshInlineActions?.();
                    }};
                document[RUNTIME_KEY]=rt;
                const style=document.createElement("style");
                style.textContent=CSS;style.id="usr-tr-native-style";
                style.dataset.trVersion='13';
                document.head.appendChild(style);rt.style=style;
                enableRowOpen(rt);
                enableInlineRowActions(rt);
                try {await rt.refresh();}catch(e){console.error("Technical Review data load",e);
                    ctx.TR_Message="Cannot load reviews: "+(e.message||e);}
                return ret;
            }},
            {request:"crt.LoadDataRequest",handler:async(req,next)=>{
                if(inDesigner()||req.dataSourceName!=="PDS")return next?.handle(req);
                const rt=stored();
                const ids=rt?.loaded?filtered(rt).map(r=>id(r.Id)).filter(valid):[];
                const f=new sdk.FilterGroup();
                if(!ids.length)await f.addSchemaColumnFilterWithParameter(
                    sdk.ComparisonType.Equal,"Id",EMPTY);
                else {f.logicalOperation=sdk.LogicalOperatorType.Or;
                    for(const idValue of ids)await f.addSchemaColumnFilterWithParameter(
                        sdk.ComparisonType.Equal,"Id",idValue);}
                req.parameters=req.parameters||[];
                req.parameters.push({type:"filter",value:filterValue(f)});
                return next?.handle(req);
            }},
            {request:"crt.HandleViewModelAttributeChangeRequest",handler:async(req,next)=>{
                const ret=await next?.handle(req);
                if(inDesigner()||req.attributeName!=="TR_SearchText")return ret;
                const rt=stored(); if(!rt?.loaded)return ret;
                clearTimeout(rt.clock);
                rt.clock=setTimeout(async()=>{
                    if(rt.disposed)return;
                    rt.search=String(await rt.ctx.TR_SearchText||"");
                    paint(rt);
                    try{await reloadPDS(rt.ctx);}catch(e){console.warn("FR search reload",e);}
                },220);
                return ret;
            }},
            {request:"usr.TRSelectFilter",handler:async(req)=>{
                const rt=stored();if(!rt?.loaded)return;
                rt.filter=["all","new","assigned","approaching","overdue","completed"]
                    .includes(req.filter)?req.filter:"all";
                paint(rt);await reloadPDS(rt.ctx);
            }},
            {request:"usr.TRRefresh",handler:async()=>{
                const rt=stored();if(rt&&!rt.disposed)try{await rt.refresh();}
                    catch(e){message("Review refresh failed: "+(e.message||e));}
            }},
            {request:"usr.TROpenWorkspace",handler:async(req)=>{
                try {
                    const rt=stored();
                    if(!rt?.loaded)throw Error("Technical Review list is not loaded.");
                    const row=await selectedTask(rt.ctx,req.taskId);
                    openReview(rt,id(row.Id));
                }catch(e){console.error("Technical workspace navigation",e);
                    message("Unable to open Technical Review details: "+(e.message||e));}
            }},
            {request:"usr.TRAssign",handler:async(req)=>{
                try {
                    const rt=stored();
                    if(!rt?.loaded)throw Error("Technical Review list is not loaded.");
                    const row=await selectedTask(rt.ctx,req.taskId);
                    showAssignment(rt,id(row.Id));
                }catch(e){message(e.message||String(e));}
            }},
            {request:"usr.TRPickReviewer",handler:async(req)=>{
                const rt=stored();
                if(!rt?.assignTaskId || rt.disposed || rt.pickerOpen)return;
                rt.pickerOpen=true;
                // Keep ONLY the native Contact selection window visible. The
                // custom Assign Task dialog has a high z-index and otherwise
                // overlaps its Select button (observed in MCITLU).
                rt.ctx.TR_AssignVisible=false;
                try {
                    // Resolve real role members before opening; fail closed if unavailable.
                    const roleFilters=await reviewerLookupFilters();
                    // Let the view re-render before opening the Creatio lookup.
                    await new Promise(resolve=>setTimeout(resolve,0));
                    await rt.ctx.executeRequest({
                        type:"crt.OpenLookupPageRequest",
                        $context:rt.ctx,
                        scopes:[...(req.scopes||[])],
                        entitySchemaName:"Contact",
                        caption:"Choose a Technical Reviewer",
                        filtersConfig:roleFilters,
                        features:{
                            select:{multiple:false,selectAll:false,resultType:"lookupValues"},
                            create:{enabled:false}
                        },
                        afterClosed:async(result)=>{
                            try {
                                if(rt.disposed || stored()!==rt)return;
                                const item=await selectedContactFromLookup(result);
                                if(!item)return; // Cancel: keep previous selection.
                                const reviewerId=id(item);
                                // Do not store a person until Contact and role
                                // membership have both been verified.
                                const display=await contactDisplayName(reviewerId);
                                if(!(await eligibleReviewer(reviewerId)))throw Error(
                                    display+" is not a member of "+TARGET_ROLE+".");
                                rt.ctx.TR_SelectedReviewerId=reviewerId;
                                rt.ctx.TR_SelectedReviewer=display;
                            } catch(e) {
                                console.error("Technical reviewer selection",e);
                                message("Reviewer selection failed: "+(e.message||e));
                            } finally {
                                rt.pickerOpen=false;
                                if(!rt.disposed && stored()===rt && rt.assignTaskId)
                                    rt.ctx.TR_AssignVisible=true;
                            }
                        }
                    });
                } catch(e) {
                    rt.pickerOpen=false;
                    if(!rt.disposed && stored()===rt)rt.ctx.TR_AssignVisible=true;
                    message("Contact selection unavailable: "+(e.message||e));
                }
            }},
            {request:"usr.TRCommitAssign",handler:async()=>{
                const rt=stored();if(!rt?.assignTaskId || rt.pickerOpen)return;
                try {
                    const reviewerId=await rt.ctx.TR_SelectedReviewerId;
                    if(!valid(reviewerId))throw Error("Select one reviewer and click the blue Select button first.");
                    await assign(rt.ctx,rt.assignTaskId,reviewerId);
                    rt.ctx.TR_AssignVisible=false;
                    await rt.refresh();
                    message("Queue assignment saved and verified. Native Creatio approval still belongs to the TE Technical Reviewer role; this does not delegate or restrict the actual approval.");
                }catch(e){message("Assignment not saved: "+(e.message||e));}
            }},
            {request:"usr.TRCancelAssign",handler:async()=>{
                const rt=stored();if(!rt)return;
                rt.ctx.TR_AssignVisible=false;
                rt.pickerOpen=false;
                rt.assignTaskId="";
                rt.ctx.TR_SelectedReviewerId="";
                rt.ctx.TR_SelectedReviewer="No reviewer selected";
            }},
            {request:"usr.TRExport",handler:async()=>{
                const rt=stored();if(!rt?.loaded)return;
                if(rt.rows.length>=MAX_ROWS){message("Export stopped: more than "+MAX_ROWS+
                    " rows may exist. Use a server-side unbounded export.");return;}
                const blob=new Blob([makeCSV(rt)],{type:"text/csv;charset=utf-8;"});
                const url=URL.createObjectURL(blob);const a=document.createElement("a");
                a.href=url;a.download="Technical_Review_"+new Date().toISOString().slice(0,10)+".csv";
                document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
            }},
            {request:"crt.HandleViewModelResumeRequest",handler:async(req,next)=>{
                const ret=await next?.handle(req);
                if(!inDesigner() && stored()?.loaded)try{await stored().refresh();}catch(e){console.warn(e);}
                return ret;
            }},
            {request:"crt.HandleViewModelDestroyRequest",handler:async(req,next)=>{
                if(!inDesigner())stored()?.dispose?.();return next?.handle(req);
            }}
        ];
    const handlerMap = new Map(runtimeHandlers.map(entry => [entry.request, entry.handler]));
    return {
        handle(requestName, request, next) {
            const handler = handlerMap.get(requestName);
            if (!handler) throw new Error("Unknown Technical Review handler: " + requestName);
            return handler(request, next);
        },
        hasHandler(requestName) { return handlerMap.has(requestName); }
    };
});
