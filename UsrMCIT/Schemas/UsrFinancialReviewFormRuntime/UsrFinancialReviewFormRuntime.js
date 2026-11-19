 /*
 * MCIT / Financial Review Form — Designer-friendly Figma Runtime v3 — native typography + de-duplication.
 * Exact behavior extracted from the user-provided Financial Review Form page.
 * Non-visual Client Module. Schema Code: UsrFinancialReviewFormRuntime
 * Pair with UsrFinancialReview_FormPage (the actual native Freedom UI form).
 * Keep original approval delegation: no direct approval/BPMN status updates.
 * Does NOT replace or depend on UsrFinancialReviewRuntime (the LIST runtime).
 */
define("UsrFinancialReviewFormRuntime", [], function() {
    "use strict";

                    let sdk;
    const TASK_OBJECT="UsrRequestApproval";
    const REQUEST_OBJECT="UsrVMRequest";
    const ITEM_OBJECT="UsrVMRequestItem";
    const CONTRACT_OBJECT="UsrMCITContract";
    const FILE_OBJECT="SysFile";
    const PAGE_SCHEMA="UsrFinancialReview_FormPage";
    const EMPTY="00000000-0000-0000-0000-000000000000";
    const GUID=/^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i;
    const TABS=["Overview","VM Items","Contract & Points","Documents",
        "Validation Findings","Workflow History","Activity & Audit"];
    const KEYS=["overview","items","points","documents","validation","history","audit"];
    // A future verified process integration may be bound to these custom actions.
    // Never invent GUIDs, process schema names or approval outcomes.
    const ENABLE_CUSTOM_DECISIONS=false;
    const ACTION_PROCESS_NAME=""; // Only set to an ALREADY INSTALLED idempotent BP.
    const ACTION_PARAMETER="ReviewTaskId";
    const RUNTIME_KEY="__usrMCITFinancialWorkspaceCleanV8";
    const id=v=>String(v?.value??v?.Id??v?.id??v??"").trim();
    const valid=v=>GUID.test(id(v))&&id(v).toLowerCase()!==EMPTY;
    const pretty=v=>v===null||v===undefined||v===""?"—":
        String(v?.displayValue??v?.Name??v?.UsrName??v);
    const showDate=(v,withTime=false)=>{
        if(!v)return "—";const d=new Date(v);if(!Number.isFinite(d.getTime()))return "—";
        const parts=Object.fromEntries(new Intl.DateTimeFormat("en-GB",{
            year:"numeric",month:"2-digit",day:"2-digit",timeZone:"Africa/Cairo",
            ...(withTime?{hour:"2-digit",minute:"2-digit",hourCycle:"h23"}:{})
        }).formatToParts(d).filter(p=>p.type!=="literal").map(p=>[p.type,p.value]));
        return `${parts.year}-${parts.month}-${parts.day}`+
            (withTime?` ${parts.hour}:${parts.minute}`:"");
    };
    const number=v=>v===null||v===undefined||v===""||!Number.isFinite(Number(v))?
        null:Number(v);
    const points=v=>number(v)===null?"Not verified":number(v).toLocaleString("en-US")+" pts";
    const isDesigner=()=>{
        // Do not use document.referrer: a standalone Preview tab can be opened
        // directly from PageDesigner and still needs to run its handlers.
        if(typeof window==="undefined")return true;
        const rx=/(?:\/|#)PageDesigner(?:\/|\?|$)/i;
        let w=window;
        for(let i=0;i<7;i++)try{
            if(rx.test(String(w.location.href)))return true;
            if(w.parent===w)break;
            w=w.parent;
        }catch(_){break;}
        return false;
    };
    const filterValue=f=>({...f,items:f.items});
    async function load(schema,attrs,where=[],max=200) {
        const model=await sdk.Model.create(schema);
        const f=new sdk.FilterGroup();
        for(const [col,value] of where)
            await f.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,col,value);
        return await model.load({attributes:attrs,parameters:where.length?
            [{type:sdk.ModelParameterType.Filter,value:filterValue(f)}]:[],
            options:{pagingConfig:{rowsOffset:0,rowCount:max}}})||[];
    }
    async function read(schema,recordId,attrs) {
        if(!valid(recordId))return null;
        const model=await sdk.Model.create(schema);
        const rows=await model.load({attributes:attrs,
            parameters:[{type:sdk.ModelParameterType.PrimaryColumnValue,value:recordId}],
            options:{pagingConfig:{rowsOffset:0,rowCount:1}}});
        return rows?.[0]||null;
    }
    async function optionalColumns(schema,recordId,cols) {
        const out={};
        for(const c of cols)try{
            const row=await read(schema,recordId,["Id",c]);
            if(row&&Object.prototype.hasOwnProperty.call(row,c))out[c]=row[c];
        }catch(_){/* schema may not include optional field */}
        return out;
    }
    async function optionalRows(schema,requiredFields,optionalFields,where,max=200) {
        let rows=await load(schema,requiredFields,where,max);
        const byId=new Map(rows.map(r=>[id(r.Id).toLowerCase(),r]));
        for(const field of optionalFields)try{
            const ext=await load(schema,["Id",field],where,max);
            for(const row of ext){const target=byId.get(id(row.Id).toLowerCase());
                if(target)target[field]=row[field];}
        }catch(_){/* optional projection unsupported */}
        return rows;
    }

    // v4: same display-code formatting and scoped provisional sequence as
    // UsrFinancialReviewRuntime / My Requests; display-only, never used as a record ID.
    const NUMBERING_LIMIT=10000;
    function requestDisplayCode(record, index){
        const d=record?.CreatedOn ? new Date(record.CreatedOn) : null;
        const year=String(d&&Number.isFinite(d.getTime())?d.getFullYear():new Date().getFullYear());
        const raw=String(record?.UsrNumber??'').trim();
        if(/^REQ-\d{4}-\d+$/i.test(raw))return raw.toUpperCase();
        if(/^\d+$/.test(raw))return 'REQ-'+year+'-'+raw.padStart(4,'0');
        if(/^REQ-\d+$/i.test(raw))return 'REQ-'+year+'-'+raw.substring(4).padStart(4,'0');
        if(raw)return raw;
        if(Number.isInteger(index)&&index>=0)return 'REQ-'+year+'-'+String(index+1).padStart(4,'0');
        return '—';
    }
    async function resolveRequestDisplayCode(record){
        if(String(record?.UsrNumber??'').trim())return requestDisplayCode(record);
        if(!valid(record?.Id))return '—';
        try{
            const sys=await new sdk.SysValuesService().loadSysValues();
            const contactId=id(sys?.userContact);
            if(!valid(contactId))throw Error('Current user contact is unavailable');
            let authorityId='';
            const contacts=await load('Contact',['Id','Account'],[['Id',contactId]],1);
            if(contacts.length&&valid(contacts[0].Account))authorityId=id(contacts[0].Account);
            const scope=new sdk.FilterGroup();
            scope.logicalOperation=sdk.LogicalOperatorType.Or;
            await scope.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,'CreatedBy',contactId);
            if(valid(authorityId))await scope.addSchemaColumnFilterWithParameter(
                sdk.ComparisonType.Equal,'UsrAccount',authorityId);
            const model=await sdk.Model.create(REQUEST_OBJECT);
            let rows=[];
            for(let offset=0;offset<NUMBERING_LIMIT;offset+=250){
                const batch=await model.load({attributes:['Id','UsrNumber','CreatedOn'],
                    parameters:[{type:sdk.ModelParameterType.Filter,value:filterValue(scope)}],
                    options:{pagingConfig:{rowsOffset:offset,rowCount:250}}})||[];
                rows.push(...batch);
                if(batch.length<250)break;
            }
            if(rows.length>=NUMBERING_LIMIT){
                console.warn('Financial Form: request numbering scope exceeds',NUMBERING_LIMIT);
                return '—';
            }
            const yr=record.CreatedOn?new Date(record.CreatedOn).getFullYear():new Date().getFullYear();
            const yearRows=rows.filter(r=>{
                const d=r.CreatedOn?new Date(r.CreatedOn):null;
                const y=d&&Number.isFinite(d.getTime())?d.getFullYear():new Date().getFullYear();
                return y===yr;
            }).sort((a,b)=>
                ((new Date(a.CreatedOn).getTime()||0)-(new Date(b.CreatedOn).getTime()||0))||
                id(a.Id).localeCompare(id(b.Id)));
            const index=yearRows.findIndex(r=>id(r.Id).toLowerCase()===id(record.Id).toLowerCase());
            return index>=0?requestDisplayCode(record,index):'—';
        }catch(e){
            console.warn('Financial Form: cannot verify My Requests display number; do not substitute a GUID suffix.',e);
            return '—';
        }
    }

    function taskIdFromUrl() {
        if(typeof window==="undefined")return "";
        const h=String(window.location.hash||"");
        const m=h.match(/\/(?:edit|view)\/([0-9a-f-]{36})(?:\b|\/|\?|$)/i) ||
            h.match(/([0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12})/i);
        return m&&valid(m[1])?m[1]:"";
    }
    async function taskIdFromContext(ctx) {
        for(const v of [await ctx.PDS_Id,await ctx.Id,await ctx.FW_TaskId])
            if(valid(v))return id(v);
        return taskIdFromUrl();
    }
    const runtime=()=>typeof document!=="undefined"?document[RUNTIME_KEY]:null;
    const notify=(m)=>{if(typeof window!=="undefined")window.alert(m);};
    function set(ctx,key,val){ctx["FW_"+key]=val;}
    function paintEmpty(ctx){
        const defaults={RequestNumber:"—",RequestTitle:"—",ReviewId:"—",Requester:"—",
            Authority:"—",Project:"—",Contract:"—",RequestType:"—",Submitted:"—",
            Justification:"—",ItemsCount:"0",ReviewStage:"Financial Review",Reviewer:"—",
            QueueArrival:"—",DueOn:"—",SlaRemaining:"Not available",PreviousStage:"—",
            EstPoints:"Not verified",AvailablePoints:"Not verified",BalanceAfter:"Not verified",
            ConsumedPoints:"Not verified",RestoredPoints:"Not verified",
            ContractNumber:"—",ContractReference:"—",ContractPeriod:"—",
            InitialContractPoints:"Not verified",
            ContractValidFrom:"—",ContractValidTo:"—",
            ItemsText:"Loading saved VM Items…",FilesText:"Loading documents…",
            ValidationText:"Loading findings…",HistoryText:"Loading workflow…",
            AuditText:"Loading persisted audit events…",ReviewStatus:"Loading…",
            Comments:"",Notice:""};
        for(const [k,v] of Object.entries(defaults))set(ctx,k,v);
        resetFigmaSlots(ctx);
    }

    // v3: visually exclusive native grid vs fallback. Never show the legacy
    // plain-text VM list beneath a populated native table.
    // All original record loading and approval behavior remain unchanged.
    function resetFigmaSlots(ctx) {
        for(const group of ["History","Audit"]) {
            ctx[`FW_${group}ListVisible`]=false;
            ctx[`FW_${group}FallbackVisible`]=true;
            for(let i=1;i<=12;i++) {
                ctx[`FW_${group}Show${i}`]=false;
                for(const suffix of ["Title","Meta","Outcome"])
                    ctx[`FW_${group}${suffix}${i}`]="";
                ctx[`FW_${group}Done${i}`]=false;
                ctx[`FW_${group}Pending${i}`]=false;
            }
        }
        ctx.FW_VMTableVisible=false;ctx.FW_ItemsFallbackVisible=true;
        for(let i=1;i<=10;i++) {
            ctx[`FW_VMShow${i}`]=false;
            for(const key of ["Num","Purpose","Environment","OS","CPU","RAM","Storage","Network","Qty","Pts"])
                ctx[`FW_VM${i}_${key}`]="";
        }
        ctx.FW_DocTableVisible=false;ctx.FW_DocFallbackVisible=true;
        ctx.FW_DocOpenVisible=false;ctx.FW_DocEmptyMessage="Checking saved documents…";
        for(let i=1;i<=8;i++) {
            ctx[`FW_DocShow${i}`]=false;
            for(const key of ["Type","File","Date","State"])
                ctx[`FW_Doc${i}_${key}`]="";
        }
        for(const key of ["Passed","Unverified","Issues"]) {
            ctx[`FW_Val${key}Visible`]=key==="Unverified";
            ctx[`FW_Val${key}Text`]="";
        }
        ctx.FW_ValUnverifiedText="Validation status is not yet confirmed from persisted records.";
        ctx.FW_ValidationDetailVisible=false;
        for(const key of ["Okay","Late","Missing"])
            ctx[`FW_SLA${key}Visible`]=false;
        ctx.FW_QueueCaption="";
    }

    function fillNativeCards(ctx,group,events) {
        const cap=12;
        const canUse=events.length>0 && events.length<=cap;
        ctx[`FW_${group}ListVisible`]=canUse;
        ctx[`FW_${group}FallbackVisible`]=!canUse;
        if(!canUse)return;
        events.forEach((e,i)=>{
            const j=i+1;
            ctx[`FW_${group}Show${j}`]=true;
            ctx[`FW_${group}Done${j}`]=!!e.done;
            ctx[`FW_${group}Pending${j}`]=!e.done;
            ctx[`FW_${group}Title${j}`]=e.title;
            ctx[`FW_${group}Meta${j}`]=e.meta;
            ctx[`FW_${group}Outcome${j}`]=e.outcome;
        });
    }

    function populateFigmaViews(ctx,data) {
        resetFigmaSlots(ctx);
        const {task,req,items,files,findings,history,approvalHistory,issues}=data;
        const haveVM=items.length>0 && items.length<=10;
        ctx.FW_VMTableVisible=haveVM;
        ctx.FW_ItemsFallbackVisible=!haveVM;
        if(haveVM)items.forEach((r,i)=>{
            const j=i+1;
            ctx[`FW_VMShow${j}`]=true;
            const fields={
                Num:String(j),
                Purpose:pretty(r.UsrPurpose)!=="—"?pretty(r.UsrPurpose):pretty(r.UsrName),
                Environment:pretty(r.UsrEnvironment),
                OS:pretty(r.UsrOperatingSystem),
                CPU:pretty(r.UsrCPU),RAM:number(r.UsrRAMGB)===null?"—":`${r.UsrRAMGB} GB`,
                Storage:number(r.UsrStorageGB)===null?"—":`${r.UsrStorageGB} GB`,
                Network:pretty(r.UsrNetworkConfiguration||r.UsrNetwork),
                Qty:number(r.UsrQuantity)===null?"—":String(r.UsrQuantity),
                Pts:points(r.UsrTotalPointsSnapshot??r.UsrEstimatedPoints)
            };
            for(const [k,v] of Object.entries(fields))ctx[`FW_VM${j}_${k}`]=v;
        });
        const haveFiles=files.length>0 && files.length<=8;
        ctx.FW_DocTableVisible=haveFiles;ctx.FW_DocFallbackVisible=!haveFiles;
        ctx.FW_DocOpenVisible=haveFiles;
        ctx.FW_DocEmptyMessage=issues.some(s=>/^Documents:/i.test(s))
            ? "Documents could not be verified. Check permissions and try refreshing."
            : !files.length ? "No accessible documents are linked to this request."
            : "More than eight saved attachments. Open the original request to view all documents.";
        if(haveFiles)files.forEach((f,i)=>{
            const j=i+1;ctx[`FW_DocShow${j}`]=true;
            ctx[`FW_Doc${j}_Type`]="Request attachment";
            ctx[`FW_Doc${j}_File`]=pretty(f.Name);
            ctx[`FW_Doc${j}_Date`]=showDate(f.CreatedOn);
            ctx[`FW_Doc${j}_State`]="Saved in Creatio";
        });
        const open=findings.filter(f=>f.UsrIsResolved!==true&&f.UsrIsResolved!==1);
        const confirmedPass=history.some(h=>/automatic validation.*pass|validation passed|validation.*successful/i.test(
            pretty(h.UsrNewStatus)+" "+pretty(h.UsrReason)));
        if(issues.some(s=>/^Validation Findings:/i.test(s))) {
            ctx.FW_ValUnverifiedVisible=true;
            ctx.FW_ValUnverifiedText="Validation findings could not be read. Check the review data access permissions.";
        } else if(open.length) {
            ctx.FW_ValIssuesVisible=true;
            ctx.FW_ValIssuesText=`⚠ ${open.length} unresolved validation finding(s). Review the persisted details below.`;
            ctx.FW_ValidationDetailVisible=true;
        } else if(confirmedPass) {
            ctx.FW_ValPassedVisible=true;
            ctx.FW_ValPassedText=`✓ Automatic validation passed (confirmed by saved status history). ${findings.length} stored finding(s).`;
            ctx.FW_ValidationDetailVisible=findings.length>0;
        } else {
            ctx.FW_ValUnverifiedVisible=true;
            ctx.FW_ValUnverifiedText=findings.length ?
                `${findings.length} persisted finding(s), none currently open. No confirmed automatic-validation pass event.` :
                "No persisted validation findings. Automatic validation result is not verified.";
            ctx.FW_ValidationDetailVisible=findings.length>0;
        }
        const formatMeta=(date,user)=>[pretty(user)!=="—"?pretty(user):null,
            date?showDate(date,true):null].filter(Boolean).join(" · ");
        const flow=[{
            when:req.CreatedOn,title:"Request Created",meta:formatMeta(req.CreatedOn,req.CreatedBy),
            outcome:"Outcome: Created",done:true
        }];
        history.forEach(h=>flow.push({
            when:h.UsrChangedOn||h.CreatedOn,title:"Request Status Changed",
            meta:formatMeta(h.UsrChangedOn||h.CreatedOn,h.UsrChangedBy),
            outcome:`${pretty(h.UsrOldStatus)} → ${pretty(h.UsrNewStatus)}`,done:true
        }));
        approvalHistory.forEach(a=>{
            const decision=outcome(a);
            const done=!!a.UsrIsCompleted||/approved|rejected|returned/i.test(decision);
            flow.push({when:a.UsrDecidedOn||a.CreatedOn,
                title:pretty(a.UsrStage),
                meta:formatMeta(a.UsrDecidedOn||a.CreatedOn,a.UsrAssignedTo),
                outcome:done?`Outcome: ${decision}`:`Status: ${decision}`,done
            });
        });
        const sortEvents=arr=>arr.sort((a,b)=>(new Date(a.when||0).getTime()||0)-
            (new Date(b.when||0).getTime()||0));
        fillNativeCards(ctx,"History",sortEvents(flow));
        const audit=flow.slice();
        if(req.ModifiedOn&&req.ModifiedBy)audit.push({
            when:req.ModifiedOn,title:"Request Updated",
            meta:formatMeta(req.ModifiedOn,req.ModifiedBy),outcome:"Modified request record",done:true
        });
        fillNativeCards(ctx,"Audit",sortEvents(audit));
        ctx.FW_QueueCaption="Queue arrival: "+showDate(task.CreatedOn);
        const due=task.UsrDueOn?new Date(task.UsrDueOn).getTime():NaN;
        const status=task.UsrIsCompleted?"Okay":
            !Number.isFinite(due)?"Missing":due<Date.now()?"Late":"Okay";
        ctx[`FW_SLA${status}Visible`]=true;
    }

    function line(label,value){return label+": "+(pretty(value)||"—");}
    function slaLabel(due,completed) {
        if(completed)return "Completed";
        if(!due)return "No SLA deadline";
        const time=new Date(due).getTime()-Date.now();
        if(!Number.isFinite(time))return "Invalid SLA deadline";
        const hrs=Math.ceil(Math.abs(time)/3600000);
        return time<0?hrs+"h overdue":hrs+"h remaining";
    }
    function outcome(row){return pretty(row?.UsrDecision)==="—" ?
        (row?.UsrIsCompleted?"Completed":"Pending") : pretty(row.UsrDecision);}
    async function hydrate(ctx,recordId) {
        const task=await read(TASK_OBJECT,recordId,["Id","UsrName","UsrRequest","UsrStage",
            "UsrAssignedTo","UsrAssignedOn","UsrDueOn","UsrDecision","UsrDecidedBy",
            "UsrDecidedOn","UsrIsCompleted","UsrReviewRound","UsrSequence","UsrComments","CreatedOn"]);
        if(!task)throw Error("Approval task does not exist or you do not have permission.");
        if(!/financial|finance/i.test(pretty(task.UsrStage)))
            throw Error("This is not a Financial Review task. Check UsrStage.");
        const requestId=id(task.UsrRequest);
        if(!valid(requestId))throw Error("UsrRequestApproval.UsrRequest is not linked to a VM request.");
        const req=await read(REQUEST_OBJECT,requestId,["Id","UsrName","UsrNumber",
            "UsrAccount","UsrProject","UsrContract","UsrRequestType","UsrStatus",
            "UsrBusinessJustification","CreatedBy","CreatedOn","ModifiedOn","ModifiedBy"]);
        if(!req)throw Error("Linked UsrVMRequest not accessible.");
        const requestExtras=await optionalColumns(REQUEST_OBJECT,requestId,
            ["UsrSubmittedOn","UsrSubmittedAt","UsrSubmittedDate","UsrRequestedDeliveryDate"]);
        let items=[],files=[],findings=[],history=[],approvalHistory=[],contract=null;
        const issues=[];
        try {items=await optionalRows(ITEM_OBJECT,["Id","UsrRequest","UsrName"],
            ["UsrPurpose","UsrEnvironment","UsrOperatingSystem","UsrCPU","UsrRAMGB",
             "UsrStorageGB","UsrTotalPointsSnapshot","UsrEstimatedPoints","UsrQuantity",
              "UsrNetwork","UsrNetworkConfiguration"],
            [["UsrRequest",requestId]],250);}catch(e){issues.push("VM Items: "+e.message);}
        try {files=await optionalRows(FILE_OBJECT,["Id","Name","CreatedOn"],
            ["Size","CreatedBy","RecordId","RecordSchemaName"],
            [["RecordId",requestId],["RecordSchemaName",REQUEST_OBJECT]],200);
            if(!files.length){
                const linked=await optionalRows(FILE_OBJECT,["Id","Name","CreatedOn"],
                    ["Size","CreatedBy","RecordId","RecordSchemaName"],[["RecordId",requestId]],200);
                files=linked.filter(x=>!x.RecordSchemaName ||
                    pretty(x.RecordSchemaName)===REQUEST_OBJECT);
            }
        }catch(e){issues.push("Documents: "+e.message);}
        try {findings=await optionalRows("UsrRequestValidationFinding",["Id","CreatedOn"],
            ["UsrRequest","UsrName","UsrSeverity","UsrMessage","UsrIsResolved"],
            [["UsrRequest",requestId]],100);
        }catch(e){issues.push("Validation Findings: "+e.message);}
        try {history=await optionalRows("UsrRequestStatusHistory",["Id","CreatedOn"],
            ["UsrRequest","UsrOldStatus","UsrNewStatus","UsrChangedOn","UsrChangedBy",
             "UsrComments","UsrReason"],[["UsrRequest",requestId]],250);
        }catch(e){issues.push("Status History: "+e.message);}
        try {approvalHistory=await optionalRows(TASK_OBJECT,["Id","UsrRequest","CreatedOn"],
            ["UsrName","UsrStage","UsrDecision","UsrAssignedTo","UsrDecidedOn",
             "UsrIsCompleted","UsrReviewRound"],[["UsrRequest",requestId]],150);
        }catch(e){issues.push("Review History: "+e.message);}
        if(valid(req.UsrContract))try{
            contract=await read(CONTRACT_OBJECT,id(req.UsrContract),[
                "Id","UsrName","UsrNumber","UsrReference","UsrStartDate","UsrEndDate","UsrInitialPoints"]);
        }catch(e){issues.push("Contract: "+e.message);}
        // Every value below reflects saved records. A reconciliation service
        // is still needed for a true Available/Consumed/Restored Point balance.
        // Wizard/detail store one VM per item; snapshot already represents this item's
        // points. Multiplying by an optional Qty here can double-count consumption.
        const estimate=items.reduce((total,row)=>{
            const n=number(row.UsrTotalPointsSnapshot??row.UsrEstimatedPoints);
            return total+(n===null?0:n);
        },0);
        const itemPointsKnown=items.length>0 && items.every(row=>
            number(row.UsrTotalPointsSnapshot??row.UsrEstimatedPoints)!==null);
        set(ctx,"ReviewId", "Financial Review");
        set(ctx,"RequestNumber",await resolveRequestDisplayCode(req));
        set(ctx,"RequestTitle",pretty(req.UsrName));
        set(ctx,"Authority",pretty(req.UsrAccount));
        set(ctx,"Project",pretty(req.UsrProject));
        set(ctx,"Contract",pretty(req.UsrContract));
        set(ctx,"RequestType",pretty(req.UsrRequestType));
        set(ctx,"Requester",pretty(req.CreatedBy));
        const submittedEvent=history.filter(r=>
            /submit/i.test(pretty(r.UsrNewStatus)) &&
            !/resubmit/i.test(pretty(r.UsrNewStatus))
        ).sort((a,b)=>new Date(a.UsrChangedOn||a.CreatedOn||0)-
            new Date(b.UsrChangedOn||b.CreatedOn||0))[0];
        const submittedValue=requestExtras.UsrSubmittedOn||requestExtras.UsrSubmittedAt||
            requestExtras.UsrSubmittedDate||submittedEvent?.UsrChangedOn||submittedEvent?.CreatedOn;
        set(ctx,"Submitted",submittedValue?showDate(submittedValue):"Not recorded");
        set(ctx,"Justification",pretty(req.UsrBusinessJustification));
        set(ctx,"ItemsCount",String(items.length));
        set(ctx,"ReviewStage",pretty(task.UsrStage));
        set(ctx,"Reviewer",valid(task.UsrAssignedTo)?pretty(task.UsrAssignedTo):"Unassigned");
        set(ctx,"Comments",String(task.UsrComments||""));
        set(ctx,"QueueArrival",showDate(task.CreatedOn));
        set(ctx,"DueOn",showDate(task.UsrDueOn));
        set(ctx,"SlaRemaining",slaLabel(task.UsrDueOn,task.UsrIsCompleted));
        // SRS FR-08/FR-09: stage order is configurable (OQ-01). The request's
        // generic UsrStatus (e.g. "Under TE Review") is NOT the current approval stage.
        // The actual open review record is the source of truth for this label.
        set(ctx,"PreviousStage", "Stage: "+pretty(task.UsrStage)+" · "+outcome(task));
        set(ctx,"ReviewStatus",outcome(task));
        set(ctx,"EstPoints",itemPointsKnown?points(estimate):"Not verified");
        set(ctx,"AvailablePoints","Not verified");
        set(ctx,"BalanceAfter","Not verified");
        set(ctx,"ConsumedPoints","Not verified");
        set(ctx,"RestoredPoints","Not verified");
        set(ctx,"ContractNumber",pretty(contract?.UsrNumber||contract?.UsrName));
        set(ctx,"ContractReference",pretty(contract?.UsrReference));
        set(ctx,"ContractPeriod",showDate(contract?.UsrStartDate)+" to "+showDate(contract?.UsrEndDate));
        set(ctx,"ContractValidFrom",showDate(contract?.UsrStartDate));
        set(ctx,"ContractValidTo",showDate(contract?.UsrEndDate));
        set(ctx,"InitialContractPoints",points(contract?.UsrInitialPoints));
        set(ctx,"ItemsText",items.length?items.map((r,i)=>[
            `VM ${i+1}  |  ${pretty(r.UsrPurpose)!=="—"?pretty(r.UsrPurpose):pretty(r.UsrName)}`,
            `Environment: ${pretty(r.UsrEnvironment)}  •  OS: ${pretty(r.UsrOperatingSystem)}`,
            `vCPU: ${pretty(r.UsrCPU)}  •  RAM: ${pretty(r.UsrRAMGB)} GB  •  Storage: ${pretty(r.UsrStorageGB)} GB`,
            `Estimated points (item snapshot): ${points(r.UsrTotalPointsSnapshot??r.UsrEstimatedPoints)}`
        ].join("\n")).join("\n\n"):"No saved VM Items are linked to this request.");
        set(ctx,"FilesText",files.length?files.map((f,i)=>
            `${i+1}. ${pretty(f.Name)} · ${showDate(f.CreatedOn)} · File ID ${id(f.Id)}`
        ).join("\n"):"No documents are linked to this request.");
        set(ctx,"ValidationText",findings.length?findings.map((f,i)=>
            `${i+1}. ${pretty(f.UsrSeverity)} · ${pretty(f.UsrName)||pretty(f.UsrMessage)} · `+
            `${f.UsrIsResolved?"Resolved":"Open"}`
        ).join("\n"):"No persisted validation findings found. This is not proof that validation passed.");
        const events=[
            ...history.map(r=>({ts:r.UsrChangedOn||r.CreatedOn,
                text:`Status: ${pretty(r.UsrOldStatus)} → ${pretty(r.UsrNewStatus)} · ${pretty(r.UsrChangedBy)}`})),
            ...approvalHistory.map(r=>({ts:r.UsrDecidedOn||r.CreatedOn,
                text:`${pretty(r.UsrStage)} · ${pretty(r.UsrAssignedTo)} · ${outcome(r)}`}))
        ].sort((a,b)=>new Date(a.ts||0)-new Date(b.ts||0));
        set(ctx,"HistoryText",events.length?events.map(e=>
            `• ${showDate(e.ts,true)}  ${e.text}`).join("\n"):
            "No persisted workflow events found for this request.");
        const auditEvents=[...history.map(r=>
            `• ${showDate(r.UsrChangedOn||r.CreatedOn,true)} · ${pretty(r.UsrChangedBy)} · `+
            `${pretty(r.UsrOldStatus)} → ${pretty(r.UsrNewStatus)}`)];
        if(req.ModifiedOn && req.ModifiedBy) auditEvents.push(
            `• ${showDate(req.ModifiedOn,true)} · Request last modified by ${pretty(req.ModifiedBy)}`);
        set(ctx,"AuditText",auditEvents.length?auditEvents.join("\n"):
            "No accessible status/audit rows. Check Creatio Change Log and object permissions.");
        populateFigmaViews(ctx,{task,req,items,files,findings,history,approvalHistory,issues});
        ctx.FW_Notice=issues.length?"Some review data was unavailable. Please refresh or contact the administrator.":"";
        ctx.FW_ShowError=issues.length>0;
        return {task,req,items,files,findings,history,contract,estimate,itemPointsKnown,issues};
    }
    const CSS=`
/* FINANCIAL REVIEW FIGMA v2 - all selectors scoped to this page only */
.usr-fw-root{max-width:1600px!important;margin:0 auto!important;padding:16px 20px 30px!important;gap:18px!important;min-width:0!important;font-family:inherit!important;background:#f8f9fb!important;box-sizing:border-box!important}
.usr-fw-header{position:relative!important;margin-top:27px!important;background:#fff!important;border:1px solid #e2e6ef!important;border-radius:15px!important;padding:18px 20px!important;gap:8px!important;min-height:165px!important;box-shadow:none!important;box-sizing:border-box!important}
.usr-fw-header .usr-fw-muted{position:absolute!important;left:0!important;top:-27px!important;display:block!important;white-space:normal!important;max-width:100%!important}
.usr-fw-muted,.usr-fw-muted *{font-size:12px!important;font-weight:500!important;color:#7f8ca1!important;line-height:1.3!important}
.usr-fw-pill,.usr-fw-pill *{display:inline-flex!important;align-items:center!important;align-self:flex-start!important;background:#f0eafd!important;border-radius:999px!important;color:#6421ae!important;font-size:11px!important;font-weight:700!important;padding:3px 9px!important;max-width:max-content!important;line-height:1.5!important}
.usr-fw-code,.usr-fw-code *{font-size:17px!important;font-weight:750!important;color:#6416b4!important;line-height:1.2!important;letter-spacing:.1px!important}
.usr-fw-title,.usr-fw-title *{font-size:16px!important;font-weight:750!important;color:#14203a!important;line-height:1.42!important;overflow-wrap:anywhere!important}
.usr-fw-header .usr-fw-data{display:flex!important;flex-wrap:wrap!important;gap:8px 15px!important;align-items:center!important;max-width:calc(100% - 190px)!important}
.usr-fw-header .usr-fw-field{display:inline-flex!important;flex:0 0 auto!important;flex-direction:row!important;align-items:center!important;gap:3px!important;border:0!important;margin:0!important;padding:0!important}
.usr-fw-header .usr-fw-fieldname,.usr-fw-header .usr-fw-fieldname *{font-size:11px!important;font-weight:500!important;color:#7b8799!important;white-space:nowrap!important}
.usr-fw-header .usr-fw-fieldvalue,.usr-fw-header .usr-fw-fieldvalue *{font-size:11px!important;font-weight:700!important;color:#1c2a44!important;white-space:normal!important}
.usr-fw-stage,.usr-fw-stage *{display:inline-block!important;align-self:flex-start!important;background:#f8f9fb!important;border:1px solid #e2e6ed!important;border-radius:10px!important;padding:6px 11px!important;font-size:11px!important;color:#66758b!important;max-width:690px!important;box-sizing:border-box!important}
.usr-fw-sla-top{position:absolute!important;top:18px!important;right:20px!important;display:block!important;text-align:right!important;font-size:11px!important;font-weight:750!important;padding:0 0 0 78px!important;line-height:1.3!important}
.usr-fw-sla-top::before{content:"";position:absolute;left:0;top:4px;width:69px;height:5px;border-radius:10px;background:currentColor}
.usr-fw-sla-positive,.usr-fw-sla-positive *{color:#16a34a!important}.usr-fw-sla-negative,.usr-fw-sla-negative *{color:#e11d48!important}.usr-fw-sla-neutral,.usr-fw-sla-neutral *{color:#7b8798!important}
.usr-fw-queue-arrival{position:absolute!important;top:38px!important;right:20px!important;text-align:right!important;display:block!important;color:#94a0b1!important;font-size:10px!important}
.usr-fw-main{min-width:0!important;gap:16px!important;align-items:start!important}
.usr-fw-left{min-width:0!important;gap:0!important}
.usr-fw-right{display:flex!important;flex-direction:column!important;min-width:0!important;background:#fff!important;border:1px solid #e2e6ed!important;border-radius:14px!important;padding:16px!important;gap:11px!important;box-shadow:none!important;box-sizing:border-box!important}
.usr-fw-right-header,.usr-fw-right-header *{font-size:13px!important;font-weight:750!important;color:#17223b!important}
.usr-fw-review-status,.usr-fw-review-status *{font-size:11px!important;color:#718096!important}
.usr-fw-tabs{min-width:0!important;background:transparent!important}
.usr-fw-tabs [role="tab"],.usr-fw-tabs .tab-header-label,.usr-fw-tabs .mat-mdc-tab{color:#62718b!important;font-size:11px!important;font-weight:600!important;white-space:nowrap!important}
.usr-fw-tabs [role="tab"][aria-selected="true"],.usr-fw-tabs [role="tab"].active,.usr-fw-tabs .mat-mdc-tab.mdc-tab--active{color:#661ec0!important;font-weight:700!important}
.usr-fw-tabs [role="tab"][aria-selected="true"]::after{background:#6926c4!important}
.usr-fw-tabs [role="tablist"]{border-bottom:1px solid #e5e9f0!important}
.usr-fw-panel{min-width:0!important;padding:8px 0 0!important;box-sizing:border-box!important}
.usr-fw-overview-grid{gap:16px!important;align-items:stretch!important}
.usr-fw-innercard{background:#fff!important;border:1px solid #e3e7ee!important;border-radius:13px!important;min-width:0!important;height:100%!important;box-sizing:border-box!important;padding:0 16px 12px!important;gap:0!important;overflow:hidden!important}
.usr-fw-panel-title,.usr-fw-panel-title *{font-size:13px!important;color:#14213c!important;font-weight:750!important}
.usr-fw-innercard>.usr-fw-panel-title{padding:15px 0!important;margin-bottom:6px!important;border-bottom:1px solid #e9edf4!important}
.usr-fw-overview-grid .usr-fw-data{display:flex!important;flex-direction:column!important;gap:0!important;flex-wrap:nowrap!important}
.usr-fw-overview-grid .usr-fw-field{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:space-between!important;gap:14px!important;margin:0!important;padding:12px 0!important;border-bottom:1px solid #edf0f4!important}
.usr-fw-overview-grid .usr-fw-field:last-child{border-bottom:0!important}
.usr-fw-fieldname,.usr-fw-fieldname *{color:#6b7890!important;font-size:12px!important;font-weight:500!important;line-height:1.4!important}
.usr-fw-fieldvalue,.usr-fw-fieldvalue *{color:#14213b!important;font-size:12px!important;font-weight:700!important;line-height:1.4!important;overflow-wrap:anywhere!important}
.usr-fw-overview-grid .usr-fw-fieldvalue{text-align:right!important}
.usr-fw-multiline,.usr-fw-multiline *{font-size:12px!important;white-space:pre-wrap!important;color:#25324a!important;line-height:1.75!important;overflow-wrap:anywhere!important}
.usr-fw-overview-grid .usr-fw-multiline{padding:12px 0!important}
.usr-fw-points{background:#f2edfb!important;border-radius:11px!important;padding:11px 12px!important;gap:2px!important}
.usr-fw-points .usr-fw-field{display:flex!important;flex-direction:row!important;justify-content:space-between!important;align-items:center!important;padding:5px 0!important;gap:9px!important;border:0!important}
.usr-fw-points .usr-fw-fieldname,.usr-fw-points .usr-fw-fieldname *{font-size:11px!important;color:#718095!important}
.usr-fw-points .usr-fw-fieldvalue,.usr-fw-points .usr-fw-fieldvalue *{font-size:11px!important;color:#651cb9!important;font-weight:800!important;text-align:right!important}
.usr-fw-notes{min-width:0!important}
.usr-fw-notes textarea,.usr-fw-notes input{border:1px solid #e0e5ed!important;border-radius:10px!important;min-height:75px!important;background:#fff!important;color:#29344b!important;font-size:12px!important;box-sizing:border-box!important}
.usr-fw-approve,.usr-fw-return,.usr-fw-reject{width:100%!important;min-height:37px!important;border-radius:10px!important}
.usr-fw-approve button,.usr-fw-approve [role=button]{width:100%!important;min-height:37px!important;border:0!important;border-radius:10px!important;color:white!important;background:#6e25d5!important;font-weight:750!important}
.usr-fw-return button,.usr-fw-return [role=button]{width:100%!important;min-height:36px!important;border-radius:10px!important;background:#fff!important;color:#2c3952!important;border:1px solid #dfe4ed!important;font-size:12px!important}
.usr-fw-reject button,.usr-fw-reject [role=button]{width:100%!important;min-height:36px!important;border-radius:10px!important;background:#fff!important;color:#dc2626!important;border:1px solid #ffc8cd!important;font-size:12px!important}
.usr-fw-save button,.usr-fw-save [role=button]{background:#fff!important;color:#5e20ac!important;border:1px solid #ded3f5!important;border-radius:8px!important;font-size:11px!important;min-height:29px!important}
.usr-fw-feedback{font-size:11px!important;color:#047857!important}.usr-fw-error{border:1px solid #ffdfdb!important;color:#b42318!important;background:#fff7f5!important;border-radius:9px!important;padding:8px 12px!important}
/* VM items native designer components */
.usr-fw-vm-table,.usr-fw-doc-table{display:flex!important;flex-direction:column!important;gap:0!important;background:#fff!important;border:1px solid #e2e6ee!important;border-radius:13px!important;overflow-x:auto!important;overflow-y:hidden!important;box-sizing:border-box!important}
.usr-fw-vm-head,.usr-fw-vm-row{display:grid!important;grid-template-columns:35px minmax(160px,1.7fr) minmax(95px,.9fr) minmax(115px,1.15fr) 64px 66px 76px minmax(100px,1.05fr) 48px 72px!important;align-items:center!important;gap:8px!important;min-width:1030px!important;padding:0 12px!important;box-sizing:border-box!important}
.usr-fw-vm-head,.usr-fw-doc-head{background:#f8f9fb!important;min-height:39px!important;border-bottom:1px solid #e7eaf0!important}
.usr-fw-vm-row,.usr-fw-doc-row{min-height:47px!important;border-bottom:1px solid #eff1f4!important}
.usr-fw-vm-row:last-child,.usr-fw-doc-row:last-child{border-bottom:0!important}
.usr-fw-vm-head-cell,.usr-fw-vm-head-cell *,.usr-fw-doc-hcell,.usr-fw-doc-hcell *{font-size:10px!important;font-weight:750!important;color:#63718a!important;line-height:1.3!important}
.usr-fw-vm-cell,.usr-fw-vm-cell *,.usr-fw-doc-cell,.usr-fw-doc-cell *{font-size:11px!important;line-height:1.4!important;color:#23314b!important;overflow-wrap:anywhere!important}
.usr-fw-vm-number,.usr-fw-vm-number *{font-size:11px!important;color:#8390a5!important;font-weight:700!important}
.usr-fw-vm-purple,.usr-fw-vm-purple *,.usr-fw-doc-filename,.usr-fw-doc-filename *{font-size:11px!important;color:#681db9!important;font-weight:750!important}
.usr-fw-doc-head,.usr-fw-doc-row{display:grid!important;grid-template-columns:minmax(95px,.75fr) minmax(200px,2fr) 110px minmax(100px,.8fr)!important;align-items:center!important;gap:10px!important;min-width:600px!important;padding:0 14px!important;box-sizing:border-box!important}
.usr-fw-empty-tab{display:block!important;border:1px solid #e2e6ed!important;border-radius:12px!important;background:#fff!important;padding:19px!important;text-align:center!important;color:#8491a5!important;font-size:12px!important}
/* Contract point cards and assessment */
.usr-fw-panel-title{padding:14px 16px!important;background:#fff!important;border:1px solid #e3e7ee!important;border-bottom:0!important;border-radius:12px 12px 0 0!important}
.usr-fw-panel-title+.usr-fw-data{background:#fff!important;border:1px solid #e3e7ee!important;border-radius:0 0 12px 12px!important;padding:8px 16px 12px!important;margin-bottom:16px!important}
.usr-fw-overview-grid .usr-fw-panel-title{border:0!important;border-bottom:1px solid #e8ebf2!important;border-radius:0!important;padding:15px 0!important}
.usr-fw-overview-grid .usr-fw-innercard>.usr-fw-data{background:transparent!important;border:0!important;padding:0!important;margin:0!important}
.usr-fw-panel-title+.usr-fw-multiline{background:#fff!important;border:1px solid #e3e7ee!important;border-radius:0 0 12px 12px!important;padding:12px 16px!important}
.usr-fw-panel .usr-fw-data{box-sizing:border-box!important}
.usr-fw-contract-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:0 20px!important;align-items:start!important}
.usr-fw-contract-grid .usr-fw-field{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:space-between!important;gap:12px!important;padding:12px 0!important;margin:0!important;border-bottom:1px solid #eef0f4!important}
.usr-fw-contract-grid .usr-fw-fieldvalue{text-align:right!important}
.usr-fw-point-cards{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:11px!important;align-items:stretch!important}
.usr-fw-point-card{display:flex!important;flex-direction:column!important;justify-content:center!important;align-items:center!important;gap:3px!important;padding:13px 9px!important;background:#f8f7fc!important;border:0!important;border-radius:11px!important;text-align:center!important;min-width:0!important}
.usr-fw-point-card .usr-fw-fieldname,.usr-fw-point-card .usr-fw-fieldname *{font-size:11px!important;color:#7a8599!important}
.usr-fw-point-card .usr-fw-fieldvalue,.usr-fw-point-card .usr-fw-fieldvalue *{font-size:19px!important;font-weight:800!important;color:#6719b9!important}
.usr-fw-point-green .usr-fw-fieldvalue,.usr-fw-point-green .usr-fw-fieldvalue *{color:#069447!important}
.usr-fw-point-blue .usr-fw-fieldvalue,.usr-fw-point-blue .usr-fw-fieldvalue *{color:#2463eb!important}
.usr-fw-point-orange .usr-fw-fieldvalue,.usr-fw-point-orange .usr-fw-fieldvalue *{color:#e07800!important}
.usr-fw-point-assessment{margin-top:10px!important;padding:15px!important;gap:5px!important;background:#f4effb!important;border:1px solid #d4bcff!important;border-radius:12px!important}
.usr-fw-assessment-heading,.usr-fw-assessment-heading *{font-size:12px!important;font-weight:750!important;color:#5b21a8!important}
.usr-fw-assessment-row{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:space-between!important;gap:12px!important;padding:5px 0!important}
.usr-fw-assessment-label,.usr-fw-assessment-label *{font-size:11px!important;color:#718096!important}
.usr-fw-assessment-value,.usr-fw-assessment-value *{font-size:12px!important;font-weight:750!important;color:#07934a!important}
.usr-fw-assessment-estimate,.usr-fw-assessment-estimate *{font-size:12px!important;font-weight:750!important;color:#e07900!important}
/* Validation banner with actual persisted findings status */
.usr-fw-validation-banner{display:block!important;margin:12px 12px 16px!important;padding:12px 15px!important;border-radius:10px!important;border:1px solid!important;font-size:12px!important;font-weight:650!important;line-height:1.6!important}
.usr-fw-validation-success,.usr-fw-validation-success *{background:#e9fbf2!important;color:#067647!important;border-color:#7dd3a4!important}
.usr-fw-validation-danger,.usr-fw-validation-danger *{background:#fff1f0!important;color:#bc2828!important;border-color:#ffc4c0!important}
.usr-fw-validation-unknown,.usr-fw-validation-unknown *{background:#f4f6fb!important;color:#61748d!important;border-color:#e0e6ef!important}
.usr-fw-validation-details{margin:8px 13px 16px!important;padding:10px 14px!important;border-left:3px solid #dcc8ff!important;background:#faf8ff!important;border-radius:8px!important}
/* workflow history & audit native record-driven cards */
.usr-fw-timeline-list{border:1px solid #e2e6ee!important;border-radius:13px!important;background:#fff!important;padding:13px 14px!important;gap:9px!important;box-sizing:border-box!important}
.usr-fw-timeline-card{display:flex!important;flex-direction:row!important;align-items:flex-start!important;gap:11px!important;padding:12px 13px!important;border-radius:10px!important;background:#f8f9fb!important;min-height:57px!important;box-sizing:border-box!important}
.usr-fw-timeline-card:nth-child(even){background:#f8f6fc!important}
.usr-fw-timeline-icon,.usr-fw-timeline-icon *{display:flex!important;flex:0 0 19px!important;align-items:center!important;justify-content:center!important;width:19px!important;height:19px!important;border-radius:50%!important;background:#0f9e62!important;color:#fff!important;font-size:11px!important;font-weight:750!important}
.usr-fw-timeline-icon-pending,.usr-fw-timeline-icon-pending *{background:#6730ad!important}
.usr-fw-timeline-details{flex:1 1 auto!important;min-width:0!important;display:flex!important;flex-direction:column!important;gap:2px!important}
.usr-fw-timeline-title,.usr-fw-timeline-title *{font-size:12px!important;font-weight:750!important;color:#16243d!important}
.usr-fw-timeline-meta,.usr-fw-timeline-meta *{font-size:10.5px!important;color:#738096!important}
.usr-fw-timeline-outcome,.usr-fw-timeline-outcome *{font-size:10.5px!important;color:#53657d!important}
.usr-fw-audit-card .usr-fw-timeline-icon-pending{background:#6e36b8!important}
@media(max-width:1100px){.usr-fw-main{grid-template-columns:minmax(0,1fr)!important}.usr-fw-right{grid-column:1!important;grid-row:auto!important}.usr-fw-header .usr-fw-data{max-width:100%!important}}
@media(max-width:760px){.usr-fw-root{padding:10px!important}.usr-fw-header{padding:16px 13px 72px!important}.usr-fw-sla-top{top:auto!important;bottom:36px!important;left:13px!important;right:auto!important}.usr-fw-queue-arrival{top:auto!important;bottom:15px!important;left:13px!important;right:auto!important}.usr-fw-overview-grid{grid-template-columns:minmax(0,1fr)!important}.usr-fw-contract-grid{grid-template-columns:minmax(0,1fr)!important}.usr-fw-point-cards{grid-template-columns:repeat(2,minmax(0,1fr))!important}}

/* v3: native layout & typography finish, deliberately scoped to Financial Form. */
.usr-fw-root{font-family:Inter,"Segoe UI",Arial,sans-serif!important}
.usr-fw-root crt-label,.usr-fw-root .crt-label,.usr-fw-root .usr-fw-title,.usr-fw-root .usr-fw-fieldvalue,.usr-fw-root .usr-fw-panel-title{font-family:Inter,"Segoe UI",Arial,sans-serif!important}
.usr-fw-root{gap:15px!important}
.usr-fw-root>.usr-fw-muted{font-size:12px!important;color:#7f8aa0!important;margin:0 2px 0!important}
.usr-fw-header{margin-top:0!important;min-height:152px!important;padding:16px 19px!important;gap:8px!important}
.usr-fw-header-top{width:100%!important;display:flex!important;flex-direction:row!important;justify-content:space-between!important;align-items:flex-start!important;gap:10px!important}
.usr-fw-header-right{margin-left:auto!important;display:flex!important;flex-direction:column!important;align-items:flex-end!important;gap:3px!important;min-width:150px!important}
.usr-fw-header-right .usr-fw-sla-top{position:relative!important;top:auto!important;right:auto!important;margin:0!important;display:block!important;align-self:flex-end!important;text-align:right!important}
.usr-fw-header-right .usr-fw-queue-arrival{position:static!important;top:auto!important;right:auto!important;display:block!important;align-self:flex-end!important;text-align:right!important}
.usr-fw-root .usr-fw-code,.usr-fw-root .usr-fw-code *{color:#6320b9!important;font-weight:800!important}
.usr-fw-root .usr-fw-title,.usr-fw-root .usr-fw-title *{font-weight:800!important;color:#13213c!important}
.usr-fw-root .usr-fw-fieldvalue,.usr-fw-root .usr-fw-fieldvalue *{font-weight:700!important;color:#13213c!important}
.usr-fw-root .usr-fw-panel-title,.usr-fw-root .usr-fw-panel-title *{font-weight:800!important;color:#12213b!important}
.usr-fw-root .usr-fw-right-header,.usr-fw-root .usr-fw-right-header *{font-weight:800!important;color:#12213b!important}
.usr-fw-root .usr-fw-approve,.usr-fw-root .usr-fw-approve button,.usr-fw-root .usr-fw-approve::part(button){border-radius:9px!important;background:#6922cb!important;color:#fff!important;font-weight:750!important}
.usr-fw-root .usr-fw-return,.usr-fw-root .usr-fw-return button,.usr-fw-root .usr-fw-return::part(button){border:1px solid #dee3ea!important;border-radius:9px!important;background:#fff!important;color:#273449!important;font-weight:650!important}
.usr-fw-root .usr-fw-reject,.usr-fw-root .usr-fw-reject button,.usr-fw-root .usr-fw-reject::part(button){border:1px solid #fecacc!important;border-radius:9px!important;background:#fff!important;color:#cf2f38!important;font-weight:650!important}
.usr-fw-vm-table,.usr-fw-doc-table{overflow-x:auto!important;overflow-y:hidden!important;width:100%!important;max-width:100%!important}
.usr-fw-vm-head,.usr-fw-vm-row{min-width:1040px!important;grid-template-columns:32px minmax(170px,1.8fr) minmax(90px,.7fr) minmax(120px,1.1fr) minmax(55px,.4fr) minmax(64px,.55fr) minmax(75px,.6fr) minmax(115px,1fr) minmax(45px,.4fr) minmax(67px,.55fr)!important}
.usr-fw-doc-head,.usr-fw-doc-row{min-width:610px!important;grid-template-columns:minmax(110px,.8fr) minmax(210px,2fr) minmax(105px,.85fr) minmax(105px,.9fr)!important}
.usr-fw-vm-row>.usr-fw-vm-cell,.usr-fw-vm-head>.usr-fw-vm-head-cell{min-width:0!important}
.usr-fw-fallback-box{width:100%!important;background:#fff!important;border:1px solid #e3e7ef!important;border-radius:12px!important;padding:16px!important}
.usr-fw-fallback-box .usr-fw-multiline{color:#76849b!important}
@media(max-width:760px){.usr-fw-header-right{align-items:flex-start!important;margin-left:0!important}.usr-fw-header-top{flex-wrap:wrap!important}}


/* v4: Contract & Points only — native bordered cards as in Figma. */
.usr-fw-contract-tab{display:flex!important;flex-direction:column!important;gap:16px!important;padding-top:6px!important;min-width:0!important}
.usr-fw-contract-panel{display:flex!important;flex-direction:column!important;gap:0!important;min-width:0!important;overflow:hidden!important;background:#fff!important;border:1px solid #e3e7ee!important;border-radius:14px!important;box-sizing:border-box!important}
.usr-fw-contract-panel .usr-fw-panel-title,.usr-fw-contract-panel .usr-fw-panel-title *{border-radius:0!important;margin:0!important;border:0!important;font-size:13px!important;font-weight:800!important;color:#14213c!important}
.usr-fw-contract-panel .usr-fw-panel-title{padding:15px 19px!important;border-bottom:1px solid #e8ebf1!important;background:#fff!important;min-height:48px!important;box-sizing:border-box!important}
.usr-fw-contract-panel .usr-fw-panel-title+.usr-fw-data{border:0!important;border-radius:0!important;margin:0!important;box-shadow:none!important;background:#fff!important}
.usr-fw-contract-details .usr-fw-contract-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;grid-auto-rows:minmax(43px,auto)!important;column-gap:18px!important;row-gap:0!important;padding:8px 19px 16px!important;min-width:0!important}
.usr-fw-contract-details .usr-fw-contract-grid .usr-fw-field{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;align-items:center!important;justify-content:space-between!important;gap:8px!important;min-width:0!important;min-height:44px!important;border-bottom:1px solid #eef0f4!important;padding:8px 0!important;margin:0!important}
.usr-fw-contract-details .usr-fw-contract-grid .usr-fw-fieldname{flex:0 0 auto!important;max-width:40%!important;text-align:left!important;color:#718096!important}
.usr-fw-contract-details .usr-fw-contract-grid .usr-fw-fieldvalue{flex:1 1 auto!important;min-width:0!important;text-align:right!important;font-weight:750!important;color:#17243e!important;overflow-wrap:anywhere!important}
.usr-fw-balance-panel .usr-fw-point-cards{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:11px!important;margin:0!important;padding:16px 18px 10px!important;min-width:0!important;border:0!important;border-radius:0!important;background:#fff!important}
.usr-fw-balance-panel .usr-fw-point-card{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;min-height:86px!important;padding:12px 8px!important;background:#f8f7fc!important;border-radius:11px!important;border:0!important;gap:4px!important;box-sizing:border-box!important}
.usr-fw-balance-panel .usr-fw-point-card .usr-fw-fieldvalue,.usr-fw-balance-panel .usr-fw-point-card .usr-fw-fieldvalue *{font-size:20px!important;font-weight:800!important}
.usr-fw-balance-panel .usr-fw-point-assessment{margin:0 18px 17px!important;padding:14px 16px!important;background:#f3eefb!important;border:1px solid #d6baff!important;border-radius:11px!important;gap:4px!important}
.usr-fw-balance-panel .usr-fw-assessment-row{min-height:28px!important;border-bottom:1px solid transparent!important}
.usr-fw-balance-panel .usr-fw-assessment-row:last-child{border-top:1px solid #e1d4f7!important;margin-top:4px!important;padding-top:10px!important}
@media(max-width:760px){.usr-fw-contract-details .usr-fw-contract-grid{grid-template-columns:minmax(0,1fr)!important}.usr-fw-balance-panel .usr-fw-point-cards{grid-template-columns:repeat(2,minmax(0,1fr))!important}}


/* v5 — Contract Details ONLY: activate native two-column grid after Page Designer save.
 * Scoped to existing FW_ContractDetailsCard; Points and other tabs unchanged. */
.usr-fw-contract-details .usr-fw-contract-grid {
    display:grid!important;
    grid-template-columns:repeat(2,minmax(0,1fr))!important;
    grid-auto-rows:minmax(42px,auto)!important;
    column-gap:22px!important;
    row-gap:0!important;
    padding:6px 18px 10px!important;
    margin:0!important;
    min-width:0!important;
    box-sizing:border-box!important;
}
.usr-fw-contract-details .usr-fw-contract-grid .usr-fw-field {
    display:flex!important;
    flex-direction:row!important;
    flex-wrap:nowrap!important;
    align-items:center!important;
    justify-content:space-between!important;
    gap:12px!important;
    min-height:42px!important;
    padding:8px 0!important;
    margin:0!important;
    border-bottom:1px solid #edf0f5!important;
    min-width:0!important;
    box-sizing:border-box!important;
}
.usr-fw-contract-details .usr-fw-contract-grid .usr-fw-fieldname,
.usr-fw-contract-details .usr-fw-contract-grid .usr-fw-fieldname * {
    color:#718096!important;
    font-weight:500!important;
    font-size:12px!important;
    flex:0 0 auto!important;
    text-align:left!important;
    line-height:1.4!important;
}
.usr-fw-contract-details .usr-fw-contract-grid .usr-fw-fieldvalue,
.usr-fw-contract-details .usr-fw-contract-grid .usr-fw-fieldvalue * {
    color:#13213c!important;
    font-weight:750!important;
    font-size:12px!important;
    line-height:1.4!important;
    min-width:0!important;
    text-align:right!important;
    overflow-wrap:anywhere!important;
}
.usr-fw-contract-details .usr-fw-contract-grid .usr-fw-field:nth-child(5){
    border-bottom:0!important;
}
@media(max-width:810px){
    .usr-fw-contract-details .usr-fw-contract-grid{
        grid-template-columns:minmax(0,1fr)!important;
        row-gap:0!important;
    }
}


/* v6: Financial Review decision buttons follow Technical Review Form v2.
   Scoped to the native Review Decision card only; no change to BPMN. */
.usr-fw-root .usr-fw-right .usr-fw-approve,
.usr-fw-root .usr-fw-right .usr-fw-approve button,
.usr-fw-root .usr-fw-right .usr-fw-approve [role="button"],
.usr-fw-root .usr-fw-right .usr-fw-approve::part(button){
  width:100%!important;min-height:38px!important;box-sizing:border-box!important;
  background:#6824d3!important;color:#fff!important;border-radius:10px!important;
  border:1px solid #6824d3!important;font-weight:750!important;font-size:13px!important;
}
.usr-fw-root .usr-fw-right .usr-fw-return,
.usr-fw-root .usr-fw-right .usr-fw-return button,
.usr-fw-root .usr-fw-right .usr-fw-return [role="button"],
.usr-fw-root .usr-fw-right .usr-fw-return::part(button){
  width:100%!important;min-height:36px!important;box-sizing:border-box!important;
  border:1px solid #e0e4ed!important;border-radius:10px!important;
  background:#fff!important;color:#2b3b56!important;font-weight:750!important;font-size:12px!important;
}
.usr-fw-root .usr-fw-right .usr-fw-reject,
.usr-fw-root .usr-fw-right .usr-fw-reject button,
.usr-fw-root .usr-fw-right .usr-fw-reject [role="button"],
.usr-fw-root .usr-fw-right .usr-fw-reject::part(button){
  width:100%!important;min-height:36px!important;box-sizing:border-box!important;
  border:1px solid #ffd0d4!important;border-radius:10px!important;
  background:#fff!important;color:#dc292f!important;font-weight:750!important;font-size:12px!important;
}
/* Do not accidentally recolor the native disabled state if Creatio disables a button. */
.usr-fw-root .usr-fw-right .usr-fw-approve:disabled,
.usr-fw-root .usr-fw-right .usr-fw-return:disabled,
.usr-fw-root .usr-fw-right .usr-fw-reject:disabled {opacity:.55!important;cursor:not-allowed!important}

`;



    // Form events remain registered in the native page; dispatch is external.
    const runtimeHandlers = [
            {
                request: "crt.HandleViewModelInitRequest",
                handler: async (request, next) => {
                    const result = await next?.handle(request);
                    if (isDesigner()) return result;
                    const context = request.$context;
                    if (!context || typeof document === "undefined") return result;
                    runtime()?.dispose?.();
                    const state = {
                        ctx: context, taskId: "", data: null, disposed: false,
                        style: null, sdk: null,
                        dispose() {
                            this.disposed = true;
                            this.style?.remove?.();
                            if (runtime() === this) delete document[RUNTIME_KEY];
                        },
                        async saveNotes(inputContext) {
                            if (!valid(this.taskId) || !this.data?.task) throw Error("Open a saved review record first.");
                            if (!sdk) throw Error("Creatio SDK is not loaded.");
                            // Prefer the click's active view-model, not a potentially stale
                            // init context. Read the native crt.Input's bound attribute.
                            const editContext=inputContext || this.ctx;
                            const draft=(await editContext.FW_Comments) ?? (await this.ctx.FW_Comments) ?? "";
                            const submitted=String(draft).trim();
                            if(!submitted)throw Error("Type an internal note before saving. Empty notes are not written.");
                            if(submitted.length>4000)throw Error("Notes exceed the 4000-character safety limit.");
                            const latest=await read(TASK_OBJECT,this.taskId,
                                ["Id","UsrIsCompleted","UsrComments"]);
                            if(!latest)throw Error("Review record is not accessible. Check Read access.");
                            if(latest.UsrIsCompleted)throw Error("Completed review notes are read-only.");
                            if(String(latest.UsrComments||"")===submitted)
                                return "The note is already saved; there are no changes.";
                            const model=await sdk.Model.create(TASK_OBJECT);
                            const update=await model.update({UsrComments:submitted},[
                                {type:sdk.ModelParameterType.PrimaryColumnValue,value:this.taskId}
                            ]);
                            if(update===false||update?.success===false||update?.rowsAffected===0)
                                throw Error("Creatio did not save the note. Check Edit object/record/column rights.");
                            const saved=await read(TASK_OBJECT,this.taskId,["Id","UsrComments"]);
                            if(String(saved?.UsrComments||"")!==submitted)
                                throw Error("The note could not be verified after saving. Check rights and try refreshing.");
                            this.data.task.UsrComments=submitted;
                            this.ctx.FW_Comments=submitted;
                            this.ctx.FW_ShowError=false;
                            return "Internal note saved successfully and verified in Request Approval.";
                        },
                        async refresh() {
                            const taskId = await taskIdFromContext(context);
                            if (!valid(taskId)) {
                                context.FW_ShowError = false;
                                return;
                            }
                            this.taskId = taskId;
                            context.FW_TaskId = taskId;
                            // Lazy: an empty Preview does not require SDK or touch the database.
                            if (!sdk) {
                                const amdRequire = typeof require === "function" ?
                                    require : (typeof window !== "undefined" ? window.require : undefined);
                                if (typeof amdRequire !== "function") {
                                    throw new Error("Creatio AMD loader is unavailable.");
                                }
                                sdk = await new Promise((resolve, reject) => {
                                    try {
                                        amdRequire(["@creatio-devkit/common"], resolve,
                                            error => reject(error || new Error("Cannot load Creatio SDK")));
                                    } catch (error) { reject(error); }
                                });
                            }
                            this.sdk = sdk;
                            this.data = await hydrate(context, taskId);
                        }
                    };
                    document[RUNTIME_KEY] = state;
                    paintEmpty(context);
                    try {
                        // Styles affect runtime only; the layout/tabs/buttons are native Designer nodes.
                        const style = document.createElement("style");
                        style.id = "usr-fw-figma-v3-style";
                        style.textContent = CSS;
                        document.head.appendChild(style);
                        state.style = style;
                    } catch (error) { console.warn("Workspace styles unavailable:", error); }
                    try { await state.refresh(); }
                    catch (error) {
                        console.error("Financial Review workspace load:", error);
                        context.FW_Notice = "Unable to load this review.";
                        context.FW_ShowError = true;
                    }
                    return result;
                }
            },
            {
                request: "crt.HandleViewModelResumeRequest",
                handler: async (request, next) => {
                    const result = await next?.handle(request);
                    const state = typeof document !== "undefined" ?
                        document.__usrMCITFinancialWorkspaceCleanV8 : null;
                    if (state && !state.disposed && state.taskId) {
                        try { await state.refresh(); }
                        catch (error) {
                            state.ctx.FW_Notice = "Unable to refresh review data.";
                            state.ctx.FW_ShowError = true;
                        }
                    }
                    return result;
                }
            },
            {
                request: "usr.FWSaveNotes",
                handler: async (request) => {
                    const state=typeof document!=="undefined"?
                        document.__usrMCITFinancialWorkspaceCleanV8:null;
                    const activeContext=request.$context || state?.ctx;
                    const feedback=(message)=>{
                        if(activeContext){ activeContext.FW_NotesFeedback=message; activeContext.FW_ShowNotesFeedback=!!message; }
                        if(state?.ctx && state.ctx!==activeContext)
                            {state.ctx.FW_NotesFeedback=message;state.ctx.FW_ShowNotesFeedback=!!message;}
                    };
                    if(!state||state.disposed){
                        feedback("Save unavailable: open the saved review from Financial Review Queue.");
                        if(typeof window!=="undefined")window.alert("Cannot save: the review page is not initialized.");
                        return;
                    }
                    if(state.ctx.FW_SavingNotes)return;
                    state.ctx.FW_SavingNotes=true;
                    feedback("");
                    try {
                        await state.saveNotes(activeContext);
                        feedback("Saved");
                    } catch(error) {
                        const message="Note was NOT saved: "+(error?.message||String(error));
                        console.error("Financial Review notes",error);
                        feedback(message);
                        state.ctx.FW_Notice="Unable to save the note.";
                        state.ctx.FW_ShowError=true;
                        } finally {
                        state.ctx.FW_SavingNotes=false;
                    }
                }
            },
            {
                request: "usr.FWRefresh",
                handler: async (request) => {
                    const state=typeof document!=="undefined"?
                        document.__usrMCITFinancialWorkspaceCleanV8:null;
                    if(!state||state.disposed)return;
                    try{await state.refresh();}
                    catch(error){console.error("Financial Review refresh",error);
                        state.ctx.FW_Notice="Unable to refresh review data.";
                        state.ctx.FW_ShowError=true;}
                }
            },
            {
                // Only open Creatio's native approvals UI. The user completes the
                // decision using Creatio's built-in permission-checked actions.
                // No SysApproval / request status is directly modified here.
                request: "usr.FWOpenApprovalsPanel",
                handler: async (request) => {
                    const state=typeof document!=="undefined" ?
                        document.__usrMCITFinancialWorkspaceCleanV8:null;
                    if(!state?.data?.task) {
                        if(typeof window!=="undefined") window.alert("No Financial Review task is loaded. Open a saved task from the Financial Review Queue.");
                        return;
                    }
                    // A completed review may be viewed but must never be approved or
                    // rejected again. The BPMN approval outcome is authoritative.
                    if(state.data.task.UsrIsCompleted) {
                        const actual=pretty(state.data.task.UsrDecision);
                        if(typeof window!=="undefined") window.alert(
                            "Financial Review is already completed" +
                            (actual!=="—" ? " ("+actual+")" : "") +
                            ". No second decision was sent.");
                        return;
                    }
                    if(request.intendedDecision==="reject") {
                        state.ctx.FW_Notice="Use Reject inside Creatio Approvals to complete the rejection. No decision has been submitted by this button.";
                        state.ctx.FW_ShowError=true;
                    } else {
                        state.ctx.FW_Notice="";
                        state.ctx.FW_ShowError=false;
                    }
                    if(typeof document==="undefined")return;
                    const all=Array.from(document.querySelectorAll(
                        'button,[role="button"],[aria-label],[title]'));
                    const visible=el=>{
                        const r=el.getBoundingClientRect?.();
                        return r && r.width>0 && r.height>0;
                    };
                    const label=el=>String([
                        el.getAttribute?.('aria-label'), el.getAttribute?.('title'),
                        el.getAttribute?.('data-testid')].filter(Boolean).join(' ')).toLowerCase();
                    // Explicit accessible notification controls only; never guess icon CSS
                    // selectors or accidentally click a destructive action.
                    const target=all.find(el=>visible(el)&&
                        /approval(s)?( notification)?/.test(label(el))&&
                        !el.closest?.('.usr-fw-root'))||
                        all.find(el=>visible(el)&&
                        /notification(s)?( center| panel)?/.test(label(el))&&
                        !el.closest?.('.usr-fw-root'));
                    if(target){
                        target.click();
                    }else{
                        state.ctx.FW_Notice=
                            "Open Creatio's notification center (bell icon), then select Approvals.";
                        state.ctx.FW_ShowError=true;
                    }
                }
            },
            {
                request: "usr.FWOpenRequest",
                handler: async (request) => {
                    const state = typeof document !== "undefined" ?
                        document.__usrMCITFinancialWorkspaceCleanV8 : null;
                    const linked = state?.data?.req?.Id;
                    const requestId = String(linked?.value ?? linked?.Id ?? linked ?? "");
                    if (!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(requestId)) {
                        window.alert("No linked VM request was found. Open a saved review task first.");
                        return;
                    }
                    try {
                        if (!state.sdk) throw new Error("Creatio SDK not available yet.");
                        await state.sdk.HandlerChainService.instance.process({
                            type: "crt.OpenPageRequest",
                            schemaName: "UsrMCITRequestDetail_Page",
                            modelInitConfigs: [{action: "edit", recordId: requestId}],
                            $context: request.$context,
                            scopes: [...(request.scopes || [])]
                        });
                    } catch (error) {
                        window.alert("Cannot open Request Detail: " + (error.message || error));
                    }
                }
            },
            {
                request: "usr.FWOpenChangeLog",
                handler: async (request) => {
                    const state = typeof document !== "undefined" ?
                        document.__usrMCITFinancialWorkspaceCleanV8 : null;
                    const linked = state?.data?.req?.Id;
                    const requestId = String(linked?.value ?? linked?.Id ?? linked ?? "");
                    if (!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(requestId)) return;
                    try {
                        await request.$context.executeRequest({
                            type: "crt.OpenChangeLogRequest",
                            $context: request.$context,
                            entitySchemaName: "UsrVMRequest",
                            recordId: requestId
                        });
                    } catch (error) {
                        window.alert("Change log unavailable: " + (error.message || error));
                    }
                }
            },
            {
                request: "usr.FWDecision",
                handler: async (request) => {
                    const state = typeof document !== "undefined" ?
                        document.__usrMCITFinancialWorkspaceCleanV8 : null;
                    if (!state?.data?.task) {
                        window.alert("No persisted review task loaded. This preview cannot approve requests.");
                        return;
                    }
                    if (state.data.task.UsrIsCompleted) {
                        window.alert("This review is already completed.");
                        return;
                    }
                    // Return is NOT a configured branch of the supplied Finance BPMN.
                    // Provide actionable feedback without corrupting request status.
                    if(request.decision==="return") {
                        const message="Return for Correction has no configured Financial Review BPMN transition. No request status was changed. Configure the branch before using this action.";
                        state.ctx.FW_Notice=message;
                        state.ctx.FW_ShowError=true;
                        if(typeof window!=="undefined")window.alert(message);
                        return;
                    }
                    state.ctx.FW_Notice="Complete this decision through Creatio Approvals. No decision was sent from the Form.";
                    state.ctx.FW_ShowError=true;
                }
            },
            {
                request: "crt.HandleViewModelDestroyRequest",
                handler: async (request, next) => {
                    const state = typeof document !== "undefined" ?
                        document.__usrMCITFinancialWorkspaceCleanV8 : null;
                    state?.dispose?.();
                    return next?.handle(request);
                }
            }
        ];
    const handlerMap = new Map(runtimeHandlers.map(entry => [entry.request, entry.handler]));
    return {
        handle(requestName, request, next) {
            const handler = handlerMap.get(requestName);
            if (!handler) throw new Error("Unknown Financial Review FORM handler: " + requestName);
            return handler(request, next);
        },
        hasHandler(requestName) { return handlerMap.has(requestName); }
    };
});
