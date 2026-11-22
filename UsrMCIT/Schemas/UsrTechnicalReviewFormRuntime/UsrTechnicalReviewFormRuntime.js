 /*
 * TE-MCIT / Technical Review Form — Designer-friendly Runtime v2 — Figma polish.
 * All runtime helpers and CSS extracted from the provided Technical Form.
 * Schema Code: UsrTechnicalReviewFormRuntime (NON-VISUAL Client Module)
 * Paired native form: UsrTechnicalReview_FormPage
 * TECHNICAL actions do not directly mutate SysApproval or complete BPMN.
 * This module is separate from UsrTechnicalReviewRuntime (the LIST runtime).
 */
define("UsrTechnicalReviewFormRuntime", [], function() {
    "use strict";

                    let sdk;
    const TASK_OBJECT="UsrRequestApproval";
    const REQUEST_OBJECT="UsrVMRequest";
    const ITEM_OBJECT="UsrVMRequestItem";
    const CONTRACT_OBJECT="UsrMCITContract";
    const FILE_OBJECT="SysFile";
    const PAGE_SCHEMA="UsrTechnicalReview_FormPage";
    const EMPTY="00000000-0000-0000-0000-000000000000";
    const GUID=/^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i;
    const TABS=["Overview","VM Items","Technical Assessment","Documents",
        "Validation Findings","Workflow History","Activity & Audit"];
    const KEYS=["overview","items","points","documents","validation","history","audit"];
    // A future verified process integration may be bound to these custom actions.
    // Never invent GUIDs, process schema names or approval outcomes.
    const ENABLE_CUSTOM_DECISIONS=false;
    const ACTION_PROCESS_NAME=""; // Only set to an ALREADY INSTALLED idempotent BP.
    const ACTION_PARAMETER="ReviewTaskId";
    const RUNTIME_KEY="__usrMCITTechnicalWorkspaceCleanV1";
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
    function taskIdFromUrl() {
        if(typeof window==="undefined")return "";
        const h=String(window.location.hash||"");
        const m=h.match(/\/(?:edit|view)\/([0-9a-f-]{36})(?:\b|\/|\?|$)/i) ||
            h.match(/([0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12})/i);
        return m&&valid(m[1])?m[1]:"";
    }
    async function taskIdFromContext(ctx) {
        for(const v of [await ctx.PDS_Id,await ctx.Id,await ctx.TW_TaskId])
            if(valid(v))return id(v);
        return taskIdFromUrl();
    }
    const runtime=()=>typeof document!=="undefined"?document[RUNTIME_KEY]:null;
    const notify=(m)=>{if(typeof window!=="undefined")window.alert(m);};
    function set(ctx,key,val){ctx["TW_"+key]=val;}
    function paintEmpty(ctx){
        const defaults={RequestNumber:"—",RequestTitle:"—",ReviewId:"—",Requester:"—",
            Authority:"—",Project:"—",Contract:"—",RequestType:"—",Submitted:"—",
            Justification:"—",ItemsCount:"0",ReviewStage:"Technical Review",Reviewer:"—",
            QueueArrival:"—",DueOn:"—",SlaRemaining:"Not available",PreviousStage:"—",
            EstPoints:"Not verified",AvailablePoints:"Not verified",BalanceAfter:"Not verified",
            ConsumedPoints:"Not verified",RestoredPoints:"Not verified",
            ContractNumber:"—",ContractReference:"—",ContractPeriod:"—",
            InitialContractPoints:"Not verified",
            ItemsText:"Loading saved VM Items…",FilesText:"Loading documents…",
            ValidationText:"Loading findings…",HistoryText:"Loading workflow…",
            AuditText:"Loading persisted audit events…",ReviewStatus:"Loading…",
            Comments:"",Notice:""};
        for(const [k,v] of Object.entries(defaults))set(ctx,k,v);
    }

    async function requestDisplayCode(req) {
        const raw=String(req?.UsrNumber??'').trim();
        const y=String(req.CreatedOn && Number.isFinite(new Date(req.CreatedOn).getTime())?
            new Date(req.CreatedOn).getFullYear():new Date().getFullYear());
        if(/^REQ-\d{4}-\d+$/i.test(raw))return raw.toUpperCase();
        if(/^\d+$/.test(raw))return 'REQ-'+y+'-'+raw.padStart(4,'0');
        if(/^REQ-\d+$/i.test(raw))return 'REQ-'+y+'-'+raw.substring(4).padStart(4,'0');
        if(raw)return raw;
        // A provisional display sequence must match the existing My Requests scoped data.
        // Never derive it from a technical approval task index or an arbitrary GUID.
        try {
            const sys=await new sdk.SysValuesService().loadSysValues();
            const contactId=id(sys?.userContact);
            if(!valid(contactId))return 'Request number not assigned';
            const people=await load('Contact',['Id','Account'],[['Id',contactId]],1);
            const authorityId=id(people[0]?.Account);
            const scope=new sdk.FilterGroup();
            scope.logicalOperation=sdk.LogicalOperatorType.Or;
            await scope.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,'CreatedBy',contactId);
            if(valid(authorityId))await scope.addSchemaColumnFilterWithParameter(
                sdk.ComparisonType.Equal,'UsrAccount',authorityId);
            const model=await sdk.Model.create(REQUEST_OBJECT);
            const rows=[];const cap=10000;
            for(let offset=0;offset<cap;offset+=250){
                const chunk=await model.load({attributes:['Id','UsrNumber','CreatedOn'],
                    parameters:[{type:sdk.ModelParameterType.Filter,value:filterValue(scope)}],
                    options:{pagingConfig:{rowsOffset:offset,rowCount:250}}})||[];
                rows.push(...chunk);
                if(chunk.length<250)break;
            }
            if(rows.length>=cap)return 'Request number not assigned';
            const relevant=rows.filter(r=>{
                const d=r.CreatedOn?new Date(r.CreatedOn):null;
                return String(d&&Number.isFinite(d.getTime())?d.getFullYear():new Date().getFullYear())===y;
            }).sort((a,b)=>
                (new Date(a.CreatedOn).getTime()||0)-(new Date(b.CreatedOn).getTime()||0) ||
                id(a.Id).localeCompare(id(b.Id)));
            const index=relevant.findIndex(r=>id(r.Id).toLowerCase()===id(req.Id).toLowerCase());
            return index<0?'Request number not assigned':
                'REQ-'+y+'-'+String(index+1).padStart(4,'0');
        }catch(error){console.warn('Technical Review provisional ID unavailable:',error);
            return 'Request number not assigned';}
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

    // Native visual slot reset. This is presentation-only; never changes persisted approval decisions.
    function resetTechnicalFigmaSlots(ctx) {
        for (const g of ['History','Audit']) {
            ctx[`TW_${g}ListVisible`]=false;
            ctx[`TW_${g}FallbackVisible`]=true;
            for(let i=1;i<=12;i++){
                ctx[`TW_${g}Show${i}`]=false;
                ctx[`TW_${g}Done${i}`]=false;
                ctx[`TW_${g}Pending${i}`]=false;
                for(const k of ['Title','Meta','Outcome'])ctx[`TW_${g}${k}${i}`]='';
            }
        }
        ctx.TW_DocTableVisible=false;ctx.TW_DocFallbackVisible=true;
        ctx.TW_DocOpenVisible=false;ctx.TW_DocEmptyMessage='Checking saved documents…';
        for(let i=1;i<=8;i++){
            ctx[`TW_DocShow${i}`]=false;
            for(const k of ['Type','File','Date','State'])ctx[`TW_Doc${i}_${k}`]='';
        }
        for(const k of ['Passed','Unverified','Issues']){
            ctx[`TW_Val${k}Visible`]=false;
            ctx[`TW_Val${k}Text`]='';
        }
        ctx.TW_ValUnverifiedVisible=true;
        ctx.TW_ValUnverifiedText='Validation result has not been verified from persisted records.';
        ctx.TW_ValidationDetailVisible=false;
        for(const k of ['Okay','Late','Missing'])ctx[`TW_SLA${k}Visible`]=false;
        ctx.TW_QueueCaption='';ctx.TW_TaskName='';
    }
    function setTimelineCards(ctx,group,events){
        // Large histories must never look truncated silently; use existing persisted-text fallback.
        const canUse=events.length>0&&events.length<=12;
        ctx[`TW_${group}ListVisible`]=canUse;
        ctx[`TW_${group}FallbackVisible`]=!canUse;
        if(!canUse)return;
        events.forEach((e,i)=>{
            const j=i+1;
            ctx[`TW_${group}Show${j}`]=true;
            ctx[`TW_${group}Done${j}`]=!!e.done;
            ctx[`TW_${group}Pending${j}`]=!e.done;
            ctx[`TW_${group}Title${j}`]=e.title;
            ctx[`TW_${group}Meta${j}`]=e.meta;
            ctx[`TW_${group}Outcome${j}`]=e.outcome;
        });
    }
    function populateTechnicalFigmaViews(ctx,data) {
        resetTechnicalFigmaSlots(ctx);
        const {task,req,items,files,findings,history,approvalHistory,issues}=data;
        ctx.TW_TaskName=pretty(task.UsrName)==='—'?'':pretty(task.UsrName);
        ctx.TW_QueueCaption='Queue arrival: '+showDate(task.CreatedOn);
        const due=task.UsrDueOn?new Date(task.UsrDueOn).getTime():NaN;
        const sla=task.UsrIsCompleted?'Okay':!Number.isFinite(due)?'Missing':due<Date.now()?'Late':'Okay';
        ctx[`TW_SLA${sla}Visible`]=true;
        const documentError=issues.some(s=>/^Documents:/i.test(s));
        const haveFiles=files.length>0 && files.length<=8;
        ctx.TW_DocTableVisible=haveFiles;
        ctx.TW_DocFallbackVisible=!haveFiles;
        ctx.TW_DocOpenVisible=haveFiles;
        ctx.TW_DocEmptyMessage=documentError?'Unable to verify documents. Check permission to read request attachments.':
            files.length===0?'No accessible documents are linked to this request.':
            'More than eight saved attachments. Open the request to see all documents.';
        if(haveFiles)files.forEach((f,i)=>{
            const j=i+1;ctx[`TW_DocShow${j}`]=true;
            ctx[`TW_Doc${j}_Type`]='Request attachment';
            ctx[`TW_Doc${j}_File`]=pretty(f.Name);
            ctx[`TW_Doc${j}_Date`]=showDate(f.CreatedOn);
            ctx[`TW_Doc${j}_State`]='Saved in Creatio';
        });
        const open=findings.filter(f=>f.UsrIsResolved!==true&&f.UsrIsResolved!==1);
        const confirmedPass=history.some(h=>/automatic validation.*pass|validation passed|validation.*successful/i.test(
            pretty(h.UsrNewStatus)+' '+pretty(h.UsrReason)));
        if(issues.some(s=>/^Validation Findings:/i.test(s))){
            ctx.TW_ValUnverifiedText='Validation findings could not be read. Check permissions.';
        }else if(open.length){
            ctx.TW_ValUnverifiedVisible=false;ctx.TW_ValIssuesVisible=true;
            ctx.TW_ValIssuesText='⚠ '+open.length+' unresolved validation finding(s).';
            ctx.TW_ValidationDetailVisible=true;
        }else if(confirmedPass){
            ctx.TW_ValUnverifiedVisible=false;ctx.TW_ValPassedVisible=true;
            ctx.TW_ValPassedText='✓ Automatic validation passed (verified against saved history).';
            ctx.TW_ValidationDetailVisible=findings.length>0;
        }else {
            ctx.TW_ValUnverifiedText=findings.length?
                findings.length+' stored finding(s) resolved; no verified automatic-validation pass.':
                'Automatic validation result not verified. No persisted validation result was found.';
            ctx.TW_ValidationDetailVisible=findings.length>0;
        }
        const whenText=(date,user)=>[pretty(user)==='—'?null:pretty(user),date?showDate(date,true):null]
            .filter(Boolean).join(' · ');
        const flow=[{
            when:req.CreatedOn,title:'Request Created',meta:whenText(req.CreatedOn,req.CreatedBy),
            outcome:'Outcome: Created',done:true
        }];
        history.forEach(h=>{
            const from=pretty(h.UsrOldStatus),to=pretty(h.UsrNewStatus);
            const title=/submit/i.test(to)?'Submitted':/validation/i.test(to)?'Automatic Validation':'Request Status Changed';
            flow.push({when:h.UsrChangedOn||h.CreatedOn,title,
                meta:whenText(h.UsrChangedOn||h.CreatedOn,h.UsrChangedBy),
                outcome:from+' → '+to,done:true});
        });
        approvalHistory.forEach(a=>{
            const decision=outcome(a);
            const done=!!a.UsrIsCompleted||/approved|rejected|returned/i.test(decision);
            flow.push({when:a.UsrDecidedOn||a.CreatedOn,title:pretty(a.UsrStage),
                meta:whenText(a.UsrDecidedOn||a.CreatedOn,a.UsrAssignedTo),
                outcome:done?'Outcome: '+decision:'Status: '+decision,done});
        });
        const sortEvents=events=>events.sort((a,b)=>(new Date(a.when||0).getTime()||0)-
            (new Date(b.when||0).getTime()||0));
        setTimelineCards(ctx,'History',sortEvents(flow));
        const audit=flow.slice();
        if(req.ModifiedOn&&req.ModifiedBy)audit.push({when:req.ModifiedOn,title:'Request Updated',
            meta:whenText(req.ModifiedOn,req.ModifiedBy),outcome:'Request record modified',done:true});
        setTimelineCards(ctx,'Audit',sortEvents(audit));
    }

    async function hydrate(ctx,recordId) {
        const task=await read(TASK_OBJECT,recordId,["Id","UsrName","UsrRequest","UsrStage",
            "UsrAssignedTo","UsrAssignedOn","UsrDueOn","UsrDecision","UsrDecidedBy",
            "UsrDecidedOn","UsrIsCompleted","UsrReviewRound","UsrSequence","UsrComments","CreatedOn"]);
        if(!task)throw Error("Approval task does not exist or you do not have permission.");
        if(!/technical/i.test(pretty(task.UsrStage)))
            throw Error("This is not a Technical Review task. Check UsrStage.");
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
              "UsrNetwork","UsrNetworkConfiguration","UsrNetworkSegment","UsrVPNConnection","UsrOSType"],
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
        set(ctx,"ReviewId", "Technical Review");
        set(ctx,"RequestNumber",await requestDisplayCode(req));
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
        const prior=approvalHistory.filter(r=>/financial|finance/i.test(pretty(r.UsrStage)) &&
            (r.UsrIsCompleted || /approv|reject/i.test(outcome(r))))
            .sort((a,b)=>new Date(b.UsrDecidedOn||b.CreatedOn||0)-
                new Date(a.UsrDecidedOn||a.CreatedOn||0))[0];
        set(ctx,"PreviousStage",prior?"Previous stage: Financial Review: "+outcome(prior)+
            " — "+showDate(prior.UsrDecidedOn||prior.CreatedOn)+" by "+pretty(prior.UsrAssignedTo):
            "Previous stage: Financial Review result not recorded");
        set(ctx,"ReviewStatus",task.UsrIsCompleted?outcome(task):
            "Assigned to "+(valid(task.UsrAssignedTo)?pretty(task.UsrAssignedTo):"Unassigned"));
        set(ctx,"EstPoints",itemPointsKnown?points(estimate):"Not verified");
        set(ctx,"AvailablePoints","Not verified");
        set(ctx,"BalanceAfter","Not verified");
        set(ctx,"ConsumedPoints","Not verified");
        set(ctx,"RestoredPoints","Not verified");
        set(ctx,"ContractNumber",pretty(contract?.UsrNumber||contract?.UsrName));
        set(ctx,"ContractReference",pretty(contract?.UsrReference));
        set(ctx,"ContractPeriod",showDate(contract?.UsrStartDate)+" to "+showDate(contract?.UsrEndDate));
        set(ctx,"InitialContractPoints",points(contract?.UsrInitialPoints));
        set(ctx,"ItemsText",items.length?items.map((r,i)=>[
            `VM ${i+1}  |  ${pretty(r.UsrPurpose)!=="—"?pretty(r.UsrPurpose):pretty(r.UsrName)}`,
            `Environment: ${pretty(r.UsrEnvironment)}  •  OS: ${pretty(r.UsrOperatingSystem)}`,
            `vCPU: ${pretty(r.UsrCPU)}  •  RAM: ${pretty(r.UsrRAMGB)} GB  •  Storage: ${pretty(r.UsrStorageGB)} GB`,
            `Estimated points (item snapshot): ${points(r.UsrTotalPointsSnapshot??r.UsrEstimatedPoints)}`
        ].join("\n")).join("\n\n"):"No saved VM Items are linked to this request.");

        const columns={
            Num:(r,i)=>String(i+1),
            Purpose:r=>pretty(r.UsrPurpose)!=='—'?pretty(r.UsrPurpose):pretty(r.UsrName),
            Env:r=>pretty(r.UsrEnvironment), OS:r=>pretty(r.UsrOperatingSystem??r.UsrOSType??r.UsrVMOSType??r.UsrOS),
            CPU:r=>pretty(r.UsrCPU??r.UsrVCPU), RAM:r=>pretty(r.UsrRAMGB??r.UsrRAM)==='—'?'—':pretty(r.UsrRAMGB??r.UsrRAM)+' GB',
            Storage:r=>pretty(r.UsrStorageGB??r.UsrStorage)==='—'?'—':pretty(r.UsrStorageGB??r.UsrStorage)+' GB',
            Network:r=>pretty(r.UsrNetwork||r.UsrNetworkSegment||r.UsrVPNConnection),
            Qty:r=>pretty(r.UsrQuantity??r.UsrQty),
            Points:r=>points(r.UsrTotalPointsSnapshot??r.UsrEstimatedPoints)
        };
        for(let i=0;i<15;i++){
            const row=items[i],exists=!!row;
            ctx['TW_VMVisible_'+i]=exists;
            ctx['TW_TAVisible_'+i]=exists;
            ctx['TW_TAExpanded_'+i]=false;
            if(!exists)continue;
            for(const [field,fn] of Object.entries(columns))
                ctx['TW_VM_'+i+'_'+field]=fn(row,i);
            ctx['TW_TASub_'+i]=columns.OS(row,i)+' · '+columns.CPU(row,i)+' vCPU / '+columns.RAM(row,i)+' · '+columns.Env(row,i);
            ctx['TW_TAHead_'+i]=columns.Purpose(row,i);
            ctx['TW_TADetail_'+i]=[
                'Purpose: '+columns.Purpose(row,i),
                'Environment: '+columns.Env(row,i),
                'OS: '+columns.OS(row,i),
                'vCPU: '+columns.CPU(row,i),
                'RAM: '+columns.RAM(row,i),
                'Storage: '+columns.Storage(row,i),
                'Network: '+columns.Network(row,i),
                'Quantity: '+columns.Qty(row,i),
                'Estimated points: '+columns.Points(row,i)
            ].join('\n');
        }
        ctx.TW_VMOverflow=items.length>15?
            (items.length-15)+' more items exist; open the original request for the full list.':
            items.length===0?'No saved VM items found.':'';
        ctx.TW_TAOverflow=ctx.TW_VMOverflow;

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
        populateTechnicalFigmaViews(ctx,{task,req,items,files,findings,history,approvalHistory,issues});
        ctx.TW_Notice=issues.length?"Some review data was unavailable. Please refresh or contact the administrator.":"";
        ctx.TW_ShowError=issues.length>0;
        return {task,req,items,files,findings,history,approvalHistory,contract,estimate,itemPointsKnown,issues};
    }
    const CSS=`
      .usr-tw-root{max-width:1530px!important;margin:0 auto!important;padding:14px 20px!important;gap:16px!important;font-family:inherit!important}
      .usr-tw-header{background:#fff!important;border:1px solid #e8e5f1!important;border-radius:14px!important;padding:22px 24px!important;gap:9px!important;min-height:155px!important;box-shadow:0 1px 2px rgba(50,25,100,.025)!important}
      .usr-tw-pill{display:inline-flex!important;align-self:flex-start!important;background:#f4edff!important;border-radius:999px!important;padding:5px 11px!important;color:#6d28d9!important;font-weight:700!important;font-size:12px!important;letter-spacing:.03em!important}
      .usr-tw-code{font-size:15px!important;font-weight:750!important;color:#6620ca!important}
      .usr-tw-title{font-size:19px!important;font-weight:750!important;color:#121c35!important;line-height:1.45!important;overflow-wrap:anywhere!important}
      .usr-tw-muted{color:#718096!important;font-size:12px!important}
      .usr-tw-stage{align-self:flex-start!important;color:#56627b!important;font-size:12px!important;background:#f8f9fc!important;border:1px solid #e4e8f0!important;border-radius:9px!important;padding:7px 10px!important}
      .usr-tw-main{align-items:start!important;gap:16px!important}
      .usr-tw-left{min-width:0!important;gap:0!important}
      .usr-tw-right{background:#fff!important;border:1px solid #e8e4f1!important;border-radius:13px!important;padding:17px!important;gap:12px!important;min-width:0!important;box-shadow:0 2px 5px rgba(30,20,70,.03)!important}
      .usr-tw-tabs{background:transparent!important;min-width:0!important}
      .usr-tw-panel{min-width:0!important;padding:3px!important}
      .usr-tw-overview-grid{gap:16px!important;align-items:stretch!important}
      .usr-tw-innercard{background:#fff!important;border:1px solid #e6e4ed!important;border-radius:12px!important;padding:18px!important;gap:12px!important;min-width:0!important;height:100%!important;box-sizing:border-box!important}
      .usr-tw-panel-title{color:#19233c!important;font-weight:750!important;font-size:13px!important}
      .usr-tw-data{gap:8px!important;flex-wrap:wrap!important}
      .usr-tw-field{min-width:0!important;gap:5px!important;padding:9px 2px!important;border-bottom:1px solid #eef0f5!important}
      .usr-tw-fieldname{color:#6d7894!important;font-size:12px!important;font-weight:500!important}
      .usr-tw-fieldvalue{color:#10203f!important;font-weight:650!important;font-size:12px!important;overflow-wrap:anywhere!important}
      .usr-tw-multiline{white-space:pre-wrap!important;line-height:1.8!important;overflow-wrap:anywhere!important;font-size:12px!important;color:#17233b!important}
      .usr-tw-right-header{font-weight:750!important;font-size:15px!important;color:#152342!important}
      .usr-tw-review-status{color:#5d647d!important;font-size:12px!important}
      .usr-tw-points{background:#f4effc!important;border-radius:11px!important;padding:13px!important;gap:4px!important}
      .usr-tw-points .usr-tw-field{padding:6px 2px!important;border:0!important}
      .usr-tw-points .usr-tw-fieldvalue{font-weight:700!important;color:#552095!important}
      .usr-tw-notes{min-width:0!important}
      .usr-tw-notes textarea,.usr-tw-notes input{min-height:72px!important;resize:vertical!important;border-radius:10px!important;border:1px solid #dedbe7!important;background:#fff!important}
      .usr-tw-approve{width:100%!important;min-height:38px!important;border-radius:9px!important;background:#7626df!important;color:#fff!important;font-weight:700!important}
      .usr-tw-approve button,.usr-tw-approve [role=button]{background:#7626df!important;color:#fff!important;border-radius:9px!important;width:100%!important;min-height:38px!important}
      .usr-tw-return,.usr-tw-reject{width:100%!important;min-height:36px!important;border-radius:9px!important}
      .usr-tw-return button,.usr-tw-return [role=button]{background:#fff!important;border:1px solid #dadde7!important;color:#4b5563!important;width:100%!important;border-radius:9px!important}
      .usr-tw-reject button,.usr-tw-reject [role=button]{background:#fff!important;border:1px solid #f5bfc6!important;color:#c63448!important;width:100%!important;border-radius:9px!important}
      .usr-tw-save{width:100%!important;border-radius:9px!important}
      .usr-tw-save button,.usr-tw-save [role=button]{width:100%!important;border-radius:9px!important}
      .usr-tw-feedback{font-size:11px!important;color:#207348!important}
      .usr-tw-error{font-size:12px!important;color:#b42318!important;background:#fff6f4!important;border-radius:8px!important;padding:8px 12px!important}
      .usr-tw-vm-row{display:grid!important;grid-template-columns:35px minmax(160px,2.1fr) minmax(75px,.7fr) minmax(115px,1fr) 55px 65px 85px minmax(90px,1fr) 42px 75px!important;min-width:870px!important;gap:9px!important;padding:11px 12px!important;background:white!important;border-bottom:1px solid #edf0f5!important}
      .usr-tw-vm-heading{background:#f8f9fc!important;font-weight:750!important;min-height:38px!important}
      .usr-tw-vm-cell,.usr-tw-vm-cell *{font-size:11px!important;color:#1b2c48!important;min-width:0!important;overflow-wrap:anywhere!important}
      .usr-tw-vm-heading .usr-tw-vm-cell,.usr-tw-vm-heading .usr-tw-vm-cell *{font-weight:750!important;color:#667389!important}
      .usr-tw-vm-col-purpose,.usr-tw-vm-col-points{font-weight:750!important}
      .usr-tw-vm-col-points,.usr-tw-vm-col-points *{color:#6d28d9!important}
      .usr-tw-ta-row{background:#fff!important;border:1px solid #e1e5ee!important;border-radius:11px!important;margin-bottom:10px!important;overflow:hidden!important;gap:0!important}
      .usr-tw-ta-toggle{width:100%!important;min-height:58px!important;border:0!important;text-align:left!important;font-weight:750!important;color:#17223c!important}
      .usr-tw-ta-toggle button{width:100%!important;white-space:normal!important;text-align:left!important;justify-content:flex-start!important;border:0!important;background:#fff!important}
      .usr-tw-ta-details{background:#fbfaff!important;border-top:1px solid #ebe5f3!important;padding:13px 17px!important;white-space:pre-wrap!important}
      .usr-tw-muted{color:#718198!important;font-size:12px!important}
      @media(max-width:1050px){.usr-tw-main{grid-template-columns:minmax(0,1fr)!important}.usr-tw-right{grid-column:1!important;grid-row:auto!important}}
      @media(max-width:760px){.usr-tw-overview-grid{grid-template-columns:minmax(0,1fr)!important}.usr-tw-root{padding:10px!important}.usr-tw-header{padding:14px!important}}
    

/* TECHNICAL REVIEW FIGMA v2 - all selectors scoped to this page only */
.usr-tw-root{max-width:1600px!important;margin:0 auto!important;padding:16px 20px 30px!important;gap:18px!important;min-width:0!important;font-family:inherit!important;background:#f8f9fb!important;box-sizing:border-box!important}
.usr-tw-header{position:relative!important;margin-top:27px!important;background:#fff!important;border:1px solid #e2e6ef!important;border-radius:15px!important;padding:18px 20px!important;gap:8px!important;min-height:165px!important;box-shadow:none!important;box-sizing:border-box!important}
.usr-tw-header .usr-tw-muted{position:absolute!important;left:0!important;top:-27px!important;display:block!important;white-space:normal!important;max-width:100%!important}
.usr-tw-muted,.usr-tw-muted *{font-size:12px!important;font-weight:500!important;color:#7f8ca1!important;line-height:1.3!important}
.usr-tw-pill,.usr-tw-pill *{display:inline-flex!important;align-items:center!important;align-self:flex-start!important;background:#f0eafd!important;border-radius:999px!important;color:#6421ae!important;font-size:11px!important;font-weight:700!important;padding:3px 9px!important;max-width:max-content!important;line-height:1.5!important}
.usr-tw-code,.usr-tw-code *{font-size:17px!important;font-weight:750!important;color:#6416b4!important;line-height:1.2!important;letter-spacing:.1px!important}
.usr-tw-title,.usr-tw-title *{font-size:16px!important;font-weight:750!important;color:#14203a!important;line-height:1.42!important;overflow-wrap:anywhere!important}
.usr-tw-header .usr-tw-data{display:flex!important;flex-wrap:wrap!important;gap:8px 15px!important;align-items:center!important;max-width:calc(100% - 190px)!important}
.usr-tw-header .usr-tw-field{display:inline-flex!important;flex:0 0 auto!important;flex-direction:row!important;align-items:center!important;gap:3px!important;border:0!important;margin:0!important;padding:0!important}
.usr-tw-header .usr-tw-fieldname,.usr-tw-header .usr-tw-fieldname *{font-size:11px!important;font-weight:500!important;color:#7b8799!important;white-space:nowrap!important}
.usr-tw-header .usr-tw-fieldvalue,.usr-tw-header .usr-tw-fieldvalue *{font-size:11px!important;font-weight:700!important;color:#1c2a44!important;white-space:normal!important}
.usr-tw-stage,.usr-tw-stage *{display:inline-block!important;align-self:flex-start!important;background:#f8f9fb!important;border:1px solid #e2e6ed!important;border-radius:10px!important;padding:6px 11px!important;font-size:11px!important;color:#66758b!important;max-width:690px!important;box-sizing:border-box!important}
.usr-tw-sla-top{position:absolute!important;top:18px!important;right:20px!important;display:block!important;text-align:right!important;font-size:11px!important;font-weight:750!important;padding:0 0 0 78px!important;line-height:1.3!important}
.usr-tw-sla-top::before{content:"";position:absolute;left:0;top:4px;width:69px;height:5px;border-radius:10px;background:currentColor}
.usr-tw-sla-positive,.usr-tw-sla-positive *{color:#16a34a!important}.usr-tw-sla-negative,.usr-tw-sla-negative *{color:#e11d48!important}.usr-tw-sla-neutral,.usr-tw-sla-neutral *{color:#7b8798!important}
.usr-tw-queue-arrival{position:absolute!important;top:38px!important;right:20px!important;text-align:right!important;display:block!important;color:#94a0b1!important;font-size:10px!important}
.usr-tw-main{min-width:0!important;gap:16px!important;align-items:start!important}
.usr-tw-left{min-width:0!important;gap:0!important}
.usr-tw-right{display:flex!important;flex-direction:column!important;min-width:0!important;background:#fff!important;border:1px solid #e2e6ed!important;border-radius:14px!important;padding:16px!important;gap:11px!important;box-shadow:none!important;box-sizing:border-box!important}
.usr-tw-right-header,.usr-tw-right-header *{font-size:13px!important;font-weight:750!important;color:#17223b!important}
.usr-tw-review-status,.usr-tw-review-status *{font-size:11px!important;color:#718096!important}
.usr-tw-tabs{min-width:0!important;background:transparent!important}
.usr-tw-tabs [role="tab"],.usr-tw-tabs .tab-header-label,.usr-tw-tabs .mat-mdc-tab{color:#62718b!important;font-size:11px!important;font-weight:600!important;white-space:nowrap!important}
.usr-tw-tabs [role="tab"][aria-selected="true"],.usr-tw-tabs [role="tab"].active,.usr-tw-tabs .mat-mdc-tab.mdc-tab--active{color:#661ec0!important;font-weight:700!important}
.usr-tw-tabs [role="tab"][aria-selected="true"]::after{background:#6926c4!important}
.usr-tw-tabs [role="tablist"]{border-bottom:1px solid #e5e9f0!important}
.usr-tw-panel{min-width:0!important;padding:8px 0 0!important;box-sizing:border-box!important}
.usr-tw-overview-grid{gap:16px!important;align-items:stretch!important}
.usr-tw-innercard{background:#fff!important;border:1px solid #e3e7ee!important;border-radius:13px!important;min-width:0!important;height:100%!important;box-sizing:border-box!important;padding:0 16px 12px!important;gap:0!important;overflow:hidden!important}
.usr-tw-panel-title,.usr-tw-panel-title *{font-size:13px!important;color:#14213c!important;font-weight:750!important}
.usr-tw-innercard>.usr-tw-panel-title{padding:15px 0!important;margin-bottom:6px!important;border-bottom:1px solid #e9edf4!important}
.usr-tw-overview-grid .usr-tw-data{display:flex!important;flex-direction:column!important;gap:0!important;flex-wrap:nowrap!important}
.usr-tw-overview-grid .usr-tw-field{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:space-between!important;gap:14px!important;margin:0!important;padding:12px 0!important;border-bottom:1px solid #edf0f4!important}
.usr-tw-overview-grid .usr-tw-field:last-child{border-bottom:0!important}
.usr-tw-fieldname,.usr-tw-fieldname *{color:#6b7890!important;font-size:12px!important;font-weight:500!important;line-height:1.4!important}
.usr-tw-fieldvalue,.usr-tw-fieldvalue *{color:#14213b!important;font-size:12px!important;font-weight:700!important;line-height:1.4!important;overflow-wrap:anywhere!important}
.usr-tw-overview-grid .usr-tw-fieldvalue{text-align:right!important}
.usr-tw-multiline,.usr-tw-multiline *{font-size:12px!important;white-space:pre-wrap!important;color:#25324a!important;line-height:1.75!important;overflow-wrap:anywhere!important}
.usr-tw-overview-grid .usr-tw-multiline{padding:12px 0!important}
.usr-tw-points{background:#f2edfb!important;border-radius:11px!important;padding:11px 12px!important;gap:2px!important}
.usr-tw-points .usr-tw-field{display:flex!important;flex-direction:row!important;justify-content:space-between!important;align-items:center!important;padding:5px 0!important;gap:9px!important;border:0!important}
.usr-tw-points .usr-tw-fieldname,.usr-tw-points .usr-tw-fieldname *{font-size:11px!important;color:#718095!important}
.usr-tw-points .usr-tw-fieldvalue,.usr-tw-points .usr-tw-fieldvalue *{font-size:11px!important;color:#651cb9!important;font-weight:800!important;text-align:right!important}
.usr-tw-notes{min-width:0!important}
.usr-tw-notes textarea,.usr-tw-notes input{border:1px solid #e0e5ed!important;border-radius:10px!important;min-height:75px!important;background:#fff!important;color:#29344b!important;font-size:12px!important;box-sizing:border-box!important}
.usr-tw-approve,.usr-tw-return,.usr-tw-reject{width:100%!important;min-height:37px!important;border-radius:10px!important}
.usr-tw-approve button,.usr-tw-approve [role=button]{width:100%!important;min-height:37px!important;border:0!important;border-radius:10px!important;color:white!important;background:#6e25d5!important;font-weight:750!important}
.usr-tw-return button,.usr-tw-return [role=button]{width:100%!important;min-height:36px!important;border-radius:10px!important;background:#fff!important;color:#2c3952!important;border:1px solid #dfe4ed!important;font-size:12px!important}
.usr-tw-reject button,.usr-tw-reject [role=button]{width:100%!important;min-height:36px!important;border-radius:10px!important;background:#fff!important;color:#dc2626!important;border:1px solid #ffc8cd!important;font-size:12px!important}
.usr-tw-save button,.usr-tw-save [role=button]{background:#fff!important;color:#5e20ac!important;border:1px solid #ded3f5!important;border-radius:8px!important;font-size:11px!important;min-height:29px!important}
.usr-tw-feedback{font-size:11px!important;color:#047857!important}.usr-tw-error{border:1px solid #ffdfdb!important;color:#b42318!important;background:#fff7f5!important;border-radius:9px!important;padding:8px 12px!important}
/* VM items native designer components */
.usr-tw-vm-table,.usr-tw-doc-table{display:flex!important;flex-direction:column!important;gap:0!important;background:#fff!important;border:1px solid #e2e6ee!important;border-radius:13px!important;overflow-x:auto!important;overflow-y:hidden!important;box-sizing:border-box!important}
.usr-tw-vm-head,.usr-tw-vm-row{display:grid!important;grid-template-columns:35px minmax(160px,1.7fr) minmax(95px,.9fr) minmax(115px,1.15fr) 64px 66px 76px minmax(100px,1.05fr) 48px 72px!important;align-items:center!important;gap:8px!important;min-width:1030px!important;padding:0 12px!important;box-sizing:border-box!important}
.usr-tw-vm-head,.usr-tw-doc-head{background:#f8f9fb!important;min-height:39px!important;border-bottom:1px solid #e7eaf0!important}
.usr-tw-vm-row,.usr-tw-doc-row{min-height:47px!important;border-bottom:1px solid #eff1f4!important}
.usr-tw-vm-row:last-child,.usr-tw-doc-row:last-child{border-bottom:0!important}
.usr-tw-vm-head-cell,.usr-tw-vm-head-cell *,.usr-tw-doc-hcell,.usr-tw-doc-hcell *{font-size:10px!important;font-weight:750!important;color:#63718a!important;line-height:1.3!important}
.usr-tw-vm-cell,.usr-tw-vm-cell *,.usr-tw-doc-cell,.usr-tw-doc-cell *{font-size:11px!important;line-height:1.4!important;color:#23314b!important;overflow-wrap:anywhere!important}
.usr-tw-vm-number,.usr-tw-vm-number *{font-size:11px!important;color:#8390a5!important;font-weight:700!important}
.usr-tw-vm-purple,.usr-tw-vm-purple *,.usr-tw-doc-filename,.usr-tw-doc-filename *{font-size:11px!important;color:#681db9!important;font-weight:750!important}
.usr-tw-doc-head,.usr-tw-doc-row{display:grid!important;grid-template-columns:minmax(95px,.75fr) minmax(200px,2fr) 110px minmax(100px,.8fr)!important;align-items:center!important;gap:10px!important;min-width:600px!important;padding:0 14px!important;box-sizing:border-box!important}
.usr-tw-empty-tab{display:block!important;border:1px solid #e2e6ed!important;border-radius:12px!important;background:#fff!important;padding:19px!important;text-align:center!important;color:#8491a5!important;font-size:12px!important}
/* Contract point cards and assessment */
.usr-tw-panel-title{padding:14px 16px!important;background:#fff!important;border:1px solid #e3e7ee!important;border-bottom:0!important;border-radius:12px 12px 0 0!important}
.usr-tw-panel-title+.usr-tw-data{background:#fff!important;border:1px solid #e3e7ee!important;border-radius:0 0 12px 12px!important;padding:8px 16px 12px!important;margin-bottom:16px!important}
.usr-tw-overview-grid .usr-tw-panel-title{border:0!important;border-bottom:1px solid #e8ebf2!important;border-radius:0!important;padding:15px 0!important}
.usr-tw-overview-grid .usr-tw-innercard>.usr-tw-data{background:transparent!important;border:0!important;padding:0!important;margin:0!important}
.usr-tw-panel-title+.usr-tw-multiline{background:#fff!important;border:1px solid #e3e7ee!important;border-radius:0 0 12px 12px!important;padding:12px 16px!important}
.usr-tw-panel .usr-tw-data{box-sizing:border-box!important}
.usr-tw-contract-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:0 20px!important;align-items:start!important}
.usr-tw-contract-grid .usr-tw-field{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:space-between!important;gap:12px!important;padding:12px 0!important;margin:0!important;border-bottom:1px solid #eef0f4!important}
.usr-tw-contract-grid .usr-tw-fieldvalue{text-align:right!important}
.usr-tw-point-cards{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:11px!important;align-items:stretch!important}
.usr-tw-point-card{display:flex!important;flex-direction:column!important;justify-content:center!important;align-items:center!important;gap:3px!important;padding:13px 9px!important;background:#f8f7fc!important;border:0!important;border-radius:11px!important;text-align:center!important;min-width:0!important}
.usr-tw-point-card .usr-tw-fieldname,.usr-tw-point-card .usr-tw-fieldname *{font-size:11px!important;color:#7a8599!important}
.usr-tw-point-card .usr-tw-fieldvalue,.usr-tw-point-card .usr-tw-fieldvalue *{font-size:19px!important;font-weight:800!important;color:#6719b9!important}
.usr-tw-point-green .usr-tw-fieldvalue,.usr-tw-point-green .usr-tw-fieldvalue *{color:#069447!important}
.usr-tw-point-blue .usr-tw-fieldvalue,.usr-tw-point-blue .usr-tw-fieldvalue *{color:#2463eb!important}
.usr-tw-point-orange .usr-tw-fieldvalue,.usr-tw-point-orange .usr-tw-fieldvalue *{color:#e07800!important}
.usr-tw-point-assessment{margin-top:10px!important;padding:15px!important;gap:5px!important;background:#f4effb!important;border:1px solid #d4bcff!important;border-radius:12px!important}
.usr-tw-assessment-heading,.usr-tw-assessment-heading *{font-size:12px!important;font-weight:750!important;color:#5b21a8!important}
.usr-tw-assessment-row{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:space-between!important;gap:12px!important;padding:5px 0!important}
.usr-tw-assessment-label,.usr-tw-assessment-label *{font-size:11px!important;color:#718096!important}
.usr-tw-assessment-value,.usr-tw-assessment-value *{font-size:12px!important;font-weight:750!important;color:#07934a!important}
.usr-tw-assessment-estimate,.usr-tw-assessment-estimate *{font-size:12px!important;font-weight:750!important;color:#e07900!important}
/* Validation banner with actual persisted findings status */
.usr-tw-validation-banner{display:block!important;margin:12px 12px 16px!important;padding:12px 15px!important;border-radius:10px!important;border:1px solid!important;font-size:12px!important;font-weight:650!important;line-height:1.6!important}
.usr-tw-validation-success,.usr-tw-validation-success *{background:#e9fbf2!important;color:#067647!important;border-color:#7dd3a4!important}
.usr-tw-validation-danger,.usr-tw-validation-danger *{background:#fff1f0!important;color:#bc2828!important;border-color:#ffc4c0!important}
.usr-tw-validation-unknown,.usr-tw-validation-unknown *{background:#f4f6fb!important;color:#61748d!important;border-color:#e0e6ef!important}
.usr-tw-validation-details{margin:8px 13px 16px!important;padding:10px 14px!important;border-left:3px solid #dcc8ff!important;background:#faf8ff!important;border-radius:8px!important}
/* workflow history & audit native record-driven cards */
.usr-tw-timeline-list{border:1px solid #e2e6ee!important;border-radius:13px!important;background:#fff!important;padding:13px 14px!important;gap:9px!important;box-sizing:border-box!important}
.usr-tw-timeline-card{display:flex!important;flex-direction:row!important;align-items:flex-start!important;gap:11px!important;padding:12px 13px!important;border-radius:10px!important;background:#f8f9fb!important;min-height:57px!important;box-sizing:border-box!important}
.usr-tw-timeline-card:nth-child(even){background:#f8f6fc!important}
.usr-tw-timeline-icon,.usr-tw-timeline-icon *{display:flex!important;flex:0 0 19px!important;align-items:center!important;justify-content:center!important;width:19px!important;height:19px!important;border-radius:50%!important;background:#0f9e62!important;color:#fff!important;font-size:11px!important;font-weight:750!important}
.usr-tw-timeline-icon-pending,.usr-tw-timeline-icon-pending *{background:#6730ad!important}
.usr-tw-timeline-details{flex:1 1 auto!important;min-width:0!important;display:flex!important;flex-direction:column!important;gap:2px!important}
.usr-tw-timeline-title,.usr-tw-timeline-title *{font-size:12px!important;font-weight:750!important;color:#16243d!important}
.usr-tw-timeline-meta,.usr-tw-timeline-meta *{font-size:10.5px!important;color:#738096!important}
.usr-tw-timeline-outcome,.usr-tw-timeline-outcome *{font-size:10.5px!important;color:#53657d!important}
.usr-tw-audit-card .usr-tw-timeline-icon-pending{background:#6e36b8!important}
@media(max-width:1100px){.usr-tw-main{grid-template-columns:minmax(0,1fr)!important}.usr-tw-right{grid-column:1!important;grid-row:auto!important}.usr-tw-header .usr-tw-data{max-width:100%!important}}
@media(max-width:760px){.usr-tw-root{padding:10px!important}.usr-tw-header{padding:16px 13px 72px!important}.usr-tw-sla-top{top:auto!important;bottom:36px!important;left:13px!important;right:auto!important}.usr-tw-queue-arrival{top:auto!important;bottom:15px!important;left:13px!important;right:auto!important}.usr-tw-overview-grid{grid-template-columns:minmax(0,1fr)!important}.usr-tw-contract-grid{grid-template-columns:minmax(0,1fr)!important}.usr-tw-point-cards{grid-template-columns:repeat(2,minmax(0,1fr))!important}}

/* v3: native layout & typography finish, deliberately scoped to Financial Form. */
.usr-tw-root{font-family:Inter,"Segoe UI",Arial,sans-serif!important}
.usr-tw-root crt-label,.usr-tw-root .crt-label,.usr-tw-root .usr-tw-title,.usr-tw-root .usr-tw-fieldvalue,.usr-tw-root .usr-tw-panel-title{font-family:Inter,"Segoe UI",Arial,sans-serif!important}
.usr-tw-root{gap:15px!important}
.usr-tw-root>.usr-tw-muted{font-size:12px!important;color:#7f8aa0!important;margin:0 2px 0!important}
.usr-tw-header{margin-top:0!important;min-height:152px!important;padding:16px 19px!important;gap:8px!important}
.usr-tw-header-top{width:100%!important;display:flex!important;flex-direction:row!important;justify-content:space-between!important;align-items:flex-start!important;gap:10px!important}
.usr-tw-header-right{margin-left:auto!important;display:flex!important;flex-direction:column!important;align-items:flex-end!important;gap:3px!important;min-width:150px!important}
.usr-tw-header-right .usr-tw-sla-top{position:relative!important;top:auto!important;right:auto!important;margin:0!important;display:block!important;align-self:flex-end!important;text-align:right!important}
.usr-tw-header-right .usr-tw-queue-arrival{position:static!important;top:auto!important;right:auto!important;display:block!important;align-self:flex-end!important;text-align:right!important}
.usr-tw-root .usr-tw-code,.usr-tw-root .usr-tw-code *{color:#6320b9!important;font-weight:800!important}
.usr-tw-root .usr-tw-title,.usr-tw-root .usr-tw-title *{font-weight:800!important;color:#13213c!important}
.usr-tw-root .usr-tw-fieldvalue,.usr-tw-root .usr-tw-fieldvalue *{font-weight:700!important;color:#13213c!important}
.usr-tw-root .usr-tw-panel-title,.usr-tw-root .usr-tw-panel-title *{font-weight:800!important;color:#12213b!important}
.usr-tw-root .usr-tw-right-header,.usr-tw-root .usr-tw-right-header *{font-weight:800!important;color:#12213b!important}
.usr-tw-root .usr-tw-approve,.usr-tw-root .usr-tw-approve button,.usr-tw-root .usr-tw-approve::part(button){border-radius:9px!important;background:#6922cb!important;color:#fff!important;font-weight:750!important}
.usr-tw-root .usr-tw-return,.usr-tw-root .usr-tw-return button,.usr-tw-root .usr-tw-return::part(button){border:1px solid #dee3ea!important;border-radius:9px!important;background:#fff!important;color:#273449!important;font-weight:650!important}
.usr-tw-root .usr-tw-reject,.usr-tw-root .usr-tw-reject button,.usr-tw-root .usr-tw-reject::part(button){border:1px solid #fecacc!important;border-radius:9px!important;background:#fff!important;color:#cf2f38!important;font-weight:650!important}
.usr-tw-vm-table,.usr-tw-doc-table{overflow-x:auto!important;overflow-y:hidden!important;width:100%!important;max-width:100%!important}
.usr-tw-vm-head,.usr-tw-vm-row{min-width:1040px!important;grid-template-columns:32px minmax(170px,1.8fr) minmax(90px,.7fr) minmax(120px,1.1fr) minmax(55px,.4fr) minmax(64px,.55fr) minmax(75px,.6fr) minmax(115px,1fr) minmax(45px,.4fr) minmax(67px,.55fr)!important}
.usr-tw-doc-head,.usr-tw-doc-row{min-width:610px!important;grid-template-columns:minmax(110px,.8fr) minmax(210px,2fr) minmax(105px,.85fr) minmax(105px,.9fr)!important}
.usr-tw-vm-row>.usr-tw-vm-cell,.usr-tw-vm-head>.usr-tw-vm-head-cell{min-width:0!important}
.usr-tw-fallback-box{width:100%!important;background:#fff!important;border:1px solid #e3e7ef!important;border-radius:12px!important;padding:16px!important}
.usr-tw-fallback-box .usr-tw-multiline{color:#76849b!important}
@media(max-width:760px){.usr-tw-header-right{align-items:flex-start!important;margin-left:0!important}.usr-tw-header-top{flex-wrap:wrap!important}}


/* v4: Contract & Points only — native bordered cards as in Figma. */
.usr-tw-contract-tab{display:flex!important;flex-direction:column!important;gap:16px!important;padding-top:6px!important;min-width:0!important}
.usr-tw-contract-panel{display:flex!important;flex-direction:column!important;gap:0!important;min-width:0!important;overflow:hidden!important;background:#fff!important;border:1px solid #e3e7ee!important;border-radius:14px!important;box-sizing:border-box!important}
.usr-tw-contract-panel .usr-tw-panel-title,.usr-tw-contract-panel .usr-tw-panel-title *{border-radius:0!important;margin:0!important;border:0!important;font-size:13px!important;font-weight:800!important;color:#14213c!important}
.usr-tw-contract-panel .usr-tw-panel-title{padding:15px 19px!important;border-bottom:1px solid #e8ebf1!important;background:#fff!important;min-height:48px!important;box-sizing:border-box!important}
.usr-tw-contract-panel .usr-tw-panel-title+.usr-tw-data{border:0!important;border-radius:0!important;margin:0!important;box-shadow:none!important;background:#fff!important}
.usr-tw-contract-details .usr-tw-contract-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;grid-auto-rows:minmax(43px,auto)!important;column-gap:18px!important;row-gap:0!important;padding:8px 19px 16px!important;min-width:0!important}
.usr-tw-contract-details .usr-tw-contract-grid .usr-tw-field{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;align-items:center!important;justify-content:space-between!important;gap:8px!important;min-width:0!important;min-height:44px!important;border-bottom:1px solid #eef0f4!important;padding:8px 0!important;margin:0!important}
.usr-tw-contract-details .usr-tw-contract-grid .usr-tw-fieldname{flex:0 0 auto!important;max-width:40%!important;text-align:left!important;color:#718096!important}
.usr-tw-contract-details .usr-tw-contract-grid .usr-tw-fieldvalue{flex:1 1 auto!important;min-width:0!important;text-align:right!important;font-weight:750!important;color:#17243e!important;overflow-wrap:anywhere!important}
.usr-tw-balance-panel .usr-tw-point-cards{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:11px!important;margin:0!important;padding:16px 18px 10px!important;min-width:0!important;border:0!important;border-radius:0!important;background:#fff!important}
.usr-tw-balance-panel .usr-tw-point-card{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;min-height:86px!important;padding:12px 8px!important;background:#f8f7fc!important;border-radius:11px!important;border:0!important;gap:4px!important;box-sizing:border-box!important}
.usr-tw-balance-panel .usr-tw-point-card .usr-tw-fieldvalue,.usr-tw-balance-panel .usr-tw-point-card .usr-tw-fieldvalue *{font-size:20px!important;font-weight:800!important}
.usr-tw-balance-panel .usr-tw-point-assessment{margin:0 18px 17px!important;padding:14px 16px!important;background:#f3eefb!important;border:1px solid #d6baff!important;border-radius:11px!important;gap:4px!important}
.usr-tw-balance-panel .usr-tw-assessment-row{min-height:28px!important;border-bottom:1px solid transparent!important}
.usr-tw-balance-panel .usr-tw-assessment-row:last-child{border-top:1px solid #e1d4f7!important;margin-top:4px!important;padding-top:10px!important}
@media(max-width:760px){.usr-tw-contract-details .usr-tw-contract-grid{grid-template-columns:minmax(0,1fr)!important}.usr-tw-balance-panel .usr-tw-point-cards{grid-template-columns:repeat(2,minmax(0,1fr))!important}}


/* v5 — Contract Details ONLY: activate native two-column grid after Page Designer save.
 * Scoped to existing FW_ContractDetailsCard; Points and other tabs unchanged. */
.usr-tw-contract-details .usr-tw-contract-grid {
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
.usr-tw-contract-details .usr-tw-contract-grid .usr-tw-field {
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
.usr-tw-contract-details .usr-tw-contract-grid .usr-tw-fieldname,
.usr-tw-contract-details .usr-tw-contract-grid .usr-tw-fieldname * {
    color:#718096!important;
    font-weight:500!important;
    font-size:12px!important;
    flex:0 0 auto!important;
    text-align:left!important;
    line-height:1.4!important;
}
.usr-tw-contract-details .usr-tw-contract-grid .usr-tw-fieldvalue,
.usr-tw-contract-details .usr-tw-contract-grid .usr-tw-fieldvalue * {
    color:#13213c!important;
    font-weight:750!important;
    font-size:12px!important;
    line-height:1.4!important;
    min-width:0!important;
    text-align:right!important;
    overflow-wrap:anywhere!important;
}
.usr-tw-contract-details .usr-tw-contract-grid .usr-tw-field:nth-child(5){
    border-bottom:0!important;
}
@media(max-width:810px){
    .usr-tw-contract-details .usr-tw-contract-grid{
        grid-template-columns:minmax(0,1fr)!important;
        row-gap:0!important;
    }
}



/* TECHNICAL REVIEW v2 overrides: native Figma layout with blue stage and accessible live data */
.usr-tw-root{background:#f8f9fb!important;max-width:1600px!important;padding:16px 20px 28px!important;font-family:Inter,'Segoe UI',Arial,sans-serif!important}
.usr-tw-header{margin-top:0!important;padding:18px 20px 19px!important;min-height:168px!important;gap:8px!important}
.usr-tw-header-top{display:flex!important;align-items:flex-start!important;justify-content:space-between!important;gap:14px!important;min-height:26px!important}
.usr-tw-header-badge-info{display:flex!important;align-items:center!important;gap:10px!important}
.usr-tw-header-right{margin-left:auto!important;display:flex!important;flex-direction:column!important;align-items:flex-end!important;gap:6px!important;min-width:150px!important}
.usr-tw-header-right .usr-tw-sla-top{position:relative!important;top:auto!important;right:auto!important;display:block!important;text-align:right!important;padding-left:79px!important;max-width:170px!important;margin:0!important}
.usr-tw-header-right .usr-tw-queue-arrival{position:static!important;display:block!important;color:#92a0b5!important;text-align:right!important;white-space:nowrap!important}
.usr-tw-pill,.usr-tw-pill *{background:#edf4ff!important;color:#1560df!important;border-radius:999px!important;padding:3px 8px!important;font-size:11px!important;font-weight:750!important}
.usr-tw-task-reference,.usr-tw-task-reference *{font-size:11px!important;color:#65748f!important}
.usr-tw-code,.usr-tw-code *{font-size:17px!important;color:#6821bd!important;font-weight:800!important}
.usr-tw-title,.usr-tw-title *{font-size:16px!important;color:#13213c!important;font-weight:800!important}
.usr-tw-header .usr-tw-data{max-width:calc(100% - 105px)!important}
.usr-tw-header .usr-tw-field{display:inline-flex!important;flex-direction:row!important;align-items:center!important;gap:3px!important;padding:0!important;margin:0!important;border:0!important}
.usr-tw-header .usr-tw-fieldname,.usr-tw-header .usr-tw-fieldname *{font-weight:500!important;color:#77849a!important;font-size:11px!important}
.usr-tw-header .usr-tw-fieldvalue,.usr-tw-header .usr-tw-fieldvalue *{font-weight:750!important;color:#182743!important;font-size:11px!important}
.usr-tw-overview-grid>.usr-tw-innercard{height:100%!important}
.usr-tw-data .usr-tw-field{min-width:0!important}
.usr-tw-overview-grid .usr-tw-field{display:flex!important;flex-direction:row!important;justify-content:space-between!important;align-items:center!important;min-height:41px!important;gap:14px!important;padding:9px 0!important;border-bottom:1px solid #ecf0f4!important}
.usr-tw-overview-grid .usr-tw-fieldname,.usr-tw-overview-grid .usr-tw-fieldname *{font-size:12px!important;color:#76849b!important;font-weight:500!important}
.usr-tw-overview-grid .usr-tw-fieldvalue,.usr-tw-overview-grid .usr-tw-fieldvalue *{font-size:12px!important;color:#16243e!important;font-weight:750!important;text-align:right!important}
.usr-tw-vm-table{overflow-x:auto!important;max-width:100%!important;width:100%!important;background:#fff!important;border:1px solid #e3e8f0!important;border-radius:13px!important;gap:0!important}
.usr-tw-vm-grid{min-width:1050px!important;grid-template-columns:32px minmax(158px,1.85fr) minmax(85px,.7fr) minmax(130px,1.05fr) 55px 70px 80px minmax(115px,1fr) 45px 75px!important;gap:8px!important;padding:10px 12px!important;box-sizing:border-box!important;border-bottom:1px solid #edf0f5!important}
.usr-tw-vm-heading{background:#f7f8fb!important}
.usr-tw-vm-grid .usr-tw-vm-cell,.usr-tw-vm-grid .usr-tw-vm-cell *{font-size:11px!important;color:#24344c!important}
.usr-tw-vm-heading .usr-tw-vm-cell,.usr-tw-vm-heading .usr-tw-vm-cell *{color:#65748b!important;font-weight:750!important}
.usr-tw-vm-grid .usr-tw-vm-col-purpose,.usr-tw-vm-grid .usr-tw-vm-col-purpose *{font-weight:800!important}
.usr-tw-vm-grid .usr-tw-vm-col-points,.usr-tw-vm-grid .usr-tw-vm-col-points *{font-weight:800!important;color:#6222b9!important}
.usr-tw-ta-row{position:relative!important;border:1px solid #e1e6ef!important;border-radius:14px!important;background:#fff!important;padding:10px 15px!important;gap:0!important;margin-bottom:12px!important;overflow:hidden!important}
.usr-tw-ta-summary{display:flex!important;align-items:center!important;gap:14px!important;min-height:42px!important}
.usr-tw-ta-badge,.usr-tw-ta-badge *{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:26px!important;width:26px!important;height:26px!important;border-radius:50%!important;color:white!important;background:#6321b9!important;font-size:12px!important;font-weight:800!important;text-align:center!important}
.usr-tw-ta-text{display:flex!important;flex-direction:column!important;min-width:0!important;flex:1!important;gap:0!important}
.usr-tw-ta-toggle,.usr-tw-ta-toggle button,.usr-tw-ta-toggle [role=button]{border:none!important;background:transparent!important;box-shadow:none!important;color:#16243e!important;font-size:12px!important;font-weight:800!important;text-align:left!important;justify-content:flex-start!important;padding:0!important;min-height:21px!important;width:100%!important}
.usr-tw-ta-toggle button:after{content:'⌄';font-size:19px;color:#8490a3;position:absolute;right:12px;top:17px}
.usr-tw-ta-subtitle,.usr-tw-ta-subtitle *{color:#76849b!important;font-size:11px!important;line-height:1.5!important}
.usr-tw-validation-details{display:block!important;padding:12px 15px!important;color:#52617b!important;font-size:12px!important;white-space:pre-wrap!important;line-height:1.7!important}
.usr-tw-ta-details{padding:13px 16px!important;margin-top:9px!important;border-top:1px solid #e6eaf1!important;border-radius:7px!important;background:#fafaff!important;white-space:pre-wrap!important}
.usr-tw-right{padding:16px!important;gap:11px!important;border-radius:14px!important}
.usr-tw-right .usr-tw-notes textarea,.usr-tw-right .usr-tw-notes input{min-height:68px!important}
.usr-tw-right .usr-tw-approve,.usr-tw-right .usr-tw-approve button,.usr-tw-right .usr-tw-approve [role=button]{width:100%!important;background:#6824d3!important;border-radius:10px!important;color:white!important;font-weight:750!important}
.usr-tw-right .usr-tw-return,.usr-tw-right .usr-tw-return button,.usr-tw-right .usr-tw-return [role=button]{width:100%!important;border:1px solid #e0e4ed!important;border-radius:10px!important;background:white!important;color:#2b3b56!important;font-weight:750!important}
.usr-tw-right .usr-tw-reject,.usr-tw-right .usr-tw-reject button,.usr-tw-right .usr-tw-reject [role=button]{width:100%!important;border:1px solid #ffd0d4!important;border-radius:10px!important;background:white!important;color:#dc292f!important;font-weight:750!important}
.usr-tw-root .usr-tw-sla-positive,.usr-tw-root .usr-tw-sla-positive *{color:#10a14b!important}
.usr-tw-root .usr-tw-sla-negative,.usr-tw-root .usr-tw-sla-negative *{color:#e02a31!important}
.usr-tw-root .usr-tw-sla-neutral,.usr-tw-root .usr-tw-sla-neutral *{color:#7e8a9d!important}
@media(max-width:1050px){.usr-tw-main{grid-template-columns:minmax(0,1fr)!important}.usr-tw-right{grid-column:1!important;grid-row:auto!important}.usr-tw-header .usr-tw-data{max-width:100%!important}}
@media(max-width:760px){.usr-tw-header-right{align-items:flex-start!important;margin-left:0!important}.usr-tw-header-top{flex-wrap:wrap!important}.usr-tw-root{padding:10px!important}}

`;


    // The visual schema retains small proxy handlers; actual behavior lives here.
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
                            const draft=(await editContext.TW_Comments) ?? (await this.ctx.TW_Comments) ?? "";
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
                            this.ctx.TW_Comments=submitted;
                            this.ctx.TW_ShowError=false;
                            return "Internal note saved successfully and verified in Request Approval.";
                        },
                        async refresh() {
                            const taskId = await taskIdFromContext(context);
                            if (!valid(taskId)) {
                                context.TW_ShowError = false;
                                return;
                            }
                            this.taskId = taskId;
                            context.TW_TaskId = taskId;
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
                        style.id = "usr-tw-figma-v2-style";
                        style.textContent = CSS;
                        document.head.appendChild(style);
                        state.style = style;
                    } catch (error) { console.warn("Workspace styles unavailable:", error); }
                    try { await state.refresh(); }
                    catch (error) {
                        console.error("Technical Review workspace load:", error);
                        context.TW_Notice = "Unable to load this review.";
                        context.TW_ShowError = true;
                    }
                    return result;
                }
            },
            {
                request: "crt.HandleViewModelResumeRequest",
                handler: async (request, next) => {
                    const result = await next?.handle(request);
                    const state = typeof document !== "undefined" ?
                        document.__usrMCITTechnicalWorkspaceCleanV1 : null;
                    if (state && !state.disposed && state.taskId) {
                        try { await state.refresh(); }
                        catch (error) {
                            state.ctx.TW_Notice = "Unable to refresh review data.";
                            state.ctx.TW_ShowError = true;
                        }
                    }
                    return result;
                }
            },
            {
                request: "usr.TWToggleAssessment",
                handler: async (request) => {
                    const state=typeof document!=="undefined"?
                        document.__usrMCITTechnicalWorkspaceCleanV1:null;
                    if(!state?.data?.items)return;
                    const i=Number(request.index);
                    if(!Number.isInteger(i)||i<0||i>=15||i>=state.data.items.length)return;
                    const key='TW_TAExpanded_'+i;
                    state.ctx[key]=!(await state.ctx[key]);
                }
            },
            {
                request: "usr.TWSaveNotes",
                handler: async (request) => {
                    const state=typeof document!=="undefined"?
                        document.__usrMCITTechnicalWorkspaceCleanV1:null;
                    const activeContext=request.$context || state?.ctx;
                    const feedback=(message)=>{
                        if(activeContext){ activeContext.TW_NotesFeedback=message; activeContext.TW_ShowNotesFeedback=!!message; }
                        if(state?.ctx && state.ctx!==activeContext)
                            {state.ctx.TW_NotesFeedback=message;state.ctx.TW_ShowNotesFeedback=!!message;}
                    };
                    if(!state||state.disposed){
                        feedback("Save unavailable: open the saved review from Technical Review Queue.");
                        if(typeof window!=="undefined")window.alert("Cannot save: the review page is not initialized.");
                        return;
                    }
                    if(state.ctx.TW_SavingNotes)return;
                    state.ctx.TW_SavingNotes=true;
                    feedback("");
                    try {
                        await state.saveNotes(activeContext);
                        feedback("Saved");
                    } catch(error) {
                        const message="Note was NOT saved: "+(error?.message||String(error));
                        console.error("Technical Review notes",error);
                        feedback(message);
                        state.ctx.TW_Notice="Unable to save the note.";
                        state.ctx.TW_ShowError=true;
                        } finally {
                        state.ctx.TW_SavingNotes=false;
                    }
                }
            },
            {
                request: "usr.TWRefresh",
                handler: async (request) => {
                    const state=typeof document!=="undefined"?
                        document.__usrMCITTechnicalWorkspaceCleanV1:null;
                    if(!state||state.disposed)return;
                    try{await state.refresh();}
                    catch(error){console.error("Technical Review refresh",error);
                        state.ctx.TW_Notice="Unable to refresh review data.";
                        state.ctx.TW_ShowError=true;}
                }
            },
            {
                // Only open Creatio's native approvals UI. The user completes the
                // decision using Creatio's built-in permission-checked actions.
                // No SysApproval / request status is directly modified here.
                request: "usr.TWOpenApprovalsPanel",
                handler: async (request) => {
                    const state=typeof document!=="undefined" ?
                        document.__usrMCITTechnicalWorkspaceCleanV1:null;
                    if(!state?.data?.task) return;
                    if(state.data.task.UsrIsCompleted)return;
                    if(request.intendedDecision === "reject") {
                        state.ctx.TW_Notice="Complete Reject in Creatio Approvals. No rejection has been submitted yet.";
                        state.ctx.TW_ShowError=false;
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
                        !el.closest?.('.usr-tw-root'))||
                        all.find(el=>visible(el)&&
                        /notification(s)?( center| panel)?/.test(label(el))&&
                        !el.closest?.('.usr-tw-root'));
                    if(target){
                        target.click();
                    }else{
                        state.ctx.TW_Notice=
                            "Open Creatio's notification center (bell icon), then select Approvals.";
                        state.ctx.TW_ShowError=true;
                    }
                }
            },
            {
                request: "usr.TWOpenRequest",
                handler: async (request) => {
                    const state = typeof document !== "undefined" ?
                        document.__usrMCITTechnicalWorkspaceCleanV1 : null;
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
                request: "usr.TWOpenChangeLog",
                handler: async (request) => {
                    const state = typeof document !== "undefined" ?
                        document.__usrMCITTechnicalWorkspaceCleanV1 : null;
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
                request: "usr.TWDecision",
                handler: async (request) => {
                    const state = typeof document !== "undefined" ?
                        document.__usrMCITTechnicalWorkspaceCleanV1 : null;
                    if (!state?.data?.task) {
                        window.alert("No persisted review task loaded. This preview cannot approve requests.");
                        return;
                    }
                    if (state.data.task.UsrIsCompleted) {
                        window.alert("This review is already completed.");
                        return;
                    }
                    // The two unavailable actions are disabled in Native Designer. A direct
                    // write to SysApproval or UsrRequestApproval is intentionally NOT attempted.
                    state.ctx.TW_Notice = request.decision === "return" ?
                        "Return for Correction is not configured as a Technical Approval transition in the supplied BPMN. No decision was sent. Configure that branch before enabling it." :
                        "Complete Approve or Reject through Creatio Approvals. No decision was sent.";
                    state.ctx.TW_ShowError = true;
                }
            },
            {
                request: "crt.HandleViewModelDestroyRequest",
                handler: async (request, next) => {
                    const state = typeof document !== "undefined" ?
                        document.__usrMCITTechnicalWorkspaceCleanV1 : null;
                    state?.dispose?.();
                    return next?.handle(request);
                }
            }
        ];
    const handlerMap = new Map(runtimeHandlers.map(entry => [entry.request, entry.handler]));
    return {
        handle(requestName, request, next) {
            const handler = handlerMap.get(requestName);
            if (!handler) throw new Error("Unknown Technical Review FORM handler: " + requestName);
            return handler(request, next);
        },
        hasHandler(requestName) { return handlerMap.has(requestName); }
    };
});
