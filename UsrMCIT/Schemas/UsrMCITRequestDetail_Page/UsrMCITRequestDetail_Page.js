/*
 * TE–MCIT | Request Detail — status-aware workflow actions v15 (2026-11-10)
 * Schema: UsrMCITRequestDetail_Page  |  Primary object: UsrVMRequest
 *
 * This is a replacement for the existing Freedom UI page SOURCE CODE,
 * not a deployable package. Keep the existing page and its Page Designer shell.
 *
 * Verified from the supplied wizard:
 *  Header -> UsrVMRequest
 *  VM Items -> UsrVMRequestItem.UsrRequest
 *  Documents -> SysFile.RecordId + RecordSchemaName = UsrVMRequest
 *  Optional process instances -> SysProcessEntity.EntityId / SysProcessLog
 *
 * No demo records or fabricated audit events. Verified writes are (1) Archive
 * UsrIsArchived=true on a rejected request, and (2) Resubmit transition
 * Requires Correction -> Submitted, which invokes the EXISTING object signal.
 * The page never calls the process directly, avoiding a duplicate run.
 * Designer keeps its native editable elements; runtime renders status-aware Figma.
 */
define("UsrMCITRequestDetail_Page", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/,
    function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
    "use strict";

    const SCHEMA = "UsrMCITRequestDetail_Page";
    const HEADER_SCHEMA = "UsrVMRequest";
    const ITEM_SCHEMA = "UsrVMRequestItem";
    const FILE_SCHEMA = "SysFile";
    const ZERO = "00000000-0000-0000-0000-000000000000";
    const GUID = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;
    const TABS = ["Overview", "VM Items", "Workflow", "Documents", "Activity & Audit"];
    const STAGES = [
        "Request Created", "Submitted", "Automatic Validation", "TE Financial Review",
        "TE Technical Review", "Manual Provisioning", "Completion"
    ];
    const HEADER_FIELDS = [
        "Id", "UsrNumber", "UsrName", "UsrRequestType", "UsrStatus",
        "UsrAccount", "UsrProject", "UsrContract", "UsrBusinessJustification",
        "UsrRequestedDeliveryDate", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy"
    ];
    const ITEM_FIELDS = [
        "Id", "UsrRequest", "UsrName", "UsrPurpose", "UsrOperatingSystem",
        "UsrEnvironment", "UsrCPU", "UsrRAMGB", "UsrStorageGB",
        "UsrEstimatedPoints", "UsrTotalPointsSnapshot", "UsrDisplayOrder"
    ];
    const FILE_FIELDS = ["Id", "Name", "Size", "CreatedOn", "CreatedBy"];
    // These are optional installation-specific fields. The page probes them
    // individually so a missing column cannot break the existing native page.
    const SUBMITTED_FIELDS = ["UsrSubmittedOn", "UsrSubmittedAt", "UsrSubmittedDate"];
    const ITEM_PROVISION_STATUS = "UsrProvisioningStatus";
    // These fields are optional. The current wizard writes ONE VM per item,
    // and does not currently save a requested VM quantity.
    const ITEM_QUANTITY_FIELDS = ["UsrQuantity", "UsrVMQuantity", "UsrVMCount"];
    const ITEM_VM_ID_FIELDS = ["UsrInfrastructureVMId", "UsrVMIdentifier"];
    const INVENTORY_VM_ID_FIELDS = ["UsrInfrastructureVMId", "UsrVMIdentifier"];
    const INVENTORY_SCHEMA = "UsrVirtualMachine";
    // All timestamps are optional: no date is shown unless a readable Creatio
    // record carries it. These are read-only context fields; the only writes
    // are explicit Archive and confirmed Resubmit status transition.
    const HEADER_MILESTONE_DATES = [
        "UsrValidationCompletedOn", "UsrFinancialReviewStartedOn", "UsrFinancialApprovedOn",
        "UsrTechnicalReviewStartedOn", "UsrTechnicalApprovedOn",
        "UsrProvisioningStartedOn", "UsrProvisioningCompletedOn", "UsrCompletedOn"
    ];
    const ITEM_MILESTONE_DATES = ["UsrProvisionedOn", "UsrProvisioningFailedOn"];
    // Verified in MCITLU Process Designer screenshots (2026-11-10):
    //  process Code = UsrMCITSubmitVMRequest; input parameter Code = RequestId;
    //  START = UsrVMRequest record modified, changed field UsrStatus, Status=Submitted.
    // IMPORTANT: object signal starts this BPMN on a genuine status transition.
    // Do NOT call executeProcessByName() as well: it could start two approvals.
    const SUBMISSION_SIGNAL_PROCESS_CODE = "UsrMCITSubmitVMRequest"; // documentation only
    const SUBMISSION_SIGNAL_REQUEST_PARAMETER = "RequestId"; // documentation only
    const STATUS_LOOKUP_SCHEMAS = [
        "UsrVMRequestStatus", "UsrVMRequestStatusLookup", "UsrRequestStatus", "UsrRequestStatusLookup"
    ];
    const WORKFLOW_ACTION_CONFIG = Object.freeze({
        archiveProcessCode: "",
        archiveRequestIdParameter: "RequestId"
    });
    // Optional installation-specific fields are only displayed if actually stored.
    const STATUS_CONTEXT_FIELDS = [
        "UsrRejectionReason", "UsrRejectReason", "UsrRejectionComment",
        "UsrRejectionComments", "UsrCorrectionReason", "UsrCorrectionComments",
        "UsrReturnReason", "UsrReturnComments", "UsrReviewerComments",
        "UsrCorrectionDeadline", "UsrSLADeadline", "UsrStageDeadline",
        "UsrCurrentStageDeadline", "UsrRequestDeadline", "UsrIsArchived",
        "UsrArchived", "UsrArchivedOn"
    ];
    const ARCHIVE_BOOLEAN_FIELDS = ["UsrIsArchived", "UsrArchived"];

    const idOf = v => String(v?.value ?? v?.Id ?? v ?? "");
    const isGuid = v => GUID.test(idOf(v)) && idOf(v).toLowerCase() !== ZERO;
    const str = v => String(v ?? "").trim();
    const display = v => v == null ? "" :
        (typeof v === "object" ? str(v.displayValue ?? v.Name ?? v.name ?? "") : str(v));
    const show = v => str(v) || "—";
    const lower = v => display(v).toLowerCase().trim();
    const number = v => {
        if (v === null || v === undefined || v === "") return null;
        const n = Number(v);
        return Number.isFinite(n) ? n : null;
    };
    const num = v => number(v) === null ? "—" :
        number(v).toLocaleString("en-US", { maximumFractionDigits: 2 });
    const date = (v, includeTime = false) => {
        if (!v) return "—";
        const d = new Date(v);
        if (!Number.isFinite(d.getTime())) return "—";
        const fmt = {year:"numeric",month:"2-digit",day:"2-digit",timeZone:"Africa/Cairo",hourCycle:"h23"};
        if(includeTime){fmt.hour="2-digit";fmt.minute="2-digit";}
        const parts=Object.fromEntries(new Intl.DateTimeFormat("en-GB",fmt)
            .formatToParts(d).filter(p=>p.type!=="literal").map(p=>[p.type,p.value]));
        // Figma ISO date (YYYY-MM-DD), explicitly displayed in Egypt local time.
        return `${parts.year}-${parts.month}-${parts.day}`+
            (includeTime?` ${parts.hour}:${parts.minute}`:"");
    };
    const fileSize = v => {
        const n = number(v);
        if (n === null || n < 0) return "—";
        return n < 1048576 ? Math.max(1, Math.ceil(n / 1024)) + " KB" :
            (n / 1048576).toFixed(2) + " MB";
    };

    // Isolate Designer from runtime DOM rendering.  The Design-time editor
    // must own its crt.* component tree; only the real record page is rendered
    // using the Figma DOM below.
    function isPageDesigner() {
        if (typeof window === "undefined") return true;
        const route = /(?:PageDesigner|FreedomUIPageDesigner)/i;
        try { if (route.test(String(document?.referrer || ""))) return true; } catch (_) {}
        let current = window;
        for (let i = 0; i < 8 && current; i++) {
            try {
                if (route.test(String(current.location?.href || ""))) return true;
                if (!current.parent || current.parent === current) break;
                current = current.parent;
            } catch (_) { break; }
        }
        return false;
    }

    function element(tag, cls, text) {
        const el = document.createElement(tag);
        if (cls) el.className = cls;
        if (text !== undefined) el.textContent = String(text);
        return el;
    }
    function append(parent, ...children) {children.forEach(c=>parent.appendChild(c));return parent;}
    function button(text, cls, click, title) {
        const b = element("button", cls, text);
        b.type = "button";
        if (title) b.title = title;
        if (click) b.addEventListener("click", click);
        return b;
    }
    function filterValue(group) {return {...group, items:group.items};}
    // Never invent lookup GUIDs. First use the request's actual persisted status
    // history, then query the published status lookup by its exact Name.
    async function resolveSubmittedStatusId(statusHistory) {
        const historical=new Set((statusHistory||[])
            .filter(row=>lower(row?.UsrNewStatus)==="submitted")
            .map(row=>idOf(row.UsrNewStatus)).filter(isGuid).map(v=>v.toLowerCase()));
        if(historical.size===1)return [...historical][0];
        if(historical.size>1)throw Error("More than one Submitted status ID was found in history.");
        for(const schema of STATUS_LOOKUP_SCHEMAS){
            for(const nameField of ["Name","UsrName"]){
                try{
                    const model=await sdk.Model.create(schema);
                    const filter=new sdk.FilterGroup();
                    await filter.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,
                        nameField,"Submitted");
                    const rows=await model.load({attributes:["Id",nameField],
                        parameters:[{type:sdk.ModelParameterType.Filter,value:filterValue(filter)}],
                        options:{pagingConfig:{rowsOffset:0,rowCount:10}}});
                    const exact=(rows||[]).filter(r=>lower(r[nameField])==="submitted" && isGuid(r.Id));
                    if(exact.length===1)return idOf(exact[0].Id);
                    if(exact.length>1)throw Error("Multiple Submitted values exist in "+schema);
                }catch(e){
                    if(/Multiple Submitted/.test(String(e?.message||"")))throw e;
                    // This installation may use a different lookup schema or display column.
                }
            }
        }
        throw Error("Could not resolve the real Submitted lookup value. Confirm that UsrStatus lookup contains Submitted and the lookup schema code matches STATUS_LOOKUP_SCHEMAS.");
    }
    async function loadRecord(schema, recId, fields) {
        const model = await sdk.Model.create(schema);
        const result = await model.load({
            attributes:fields,
            parameters:[{type:sdk.ModelParameterType.PrimaryColumnValue,value:recId}],
            options:{pagingConfig:{rowsOffset:0,rowCount:1}}
        });
        return result?.[0] || null;
    }
    async function loadRows(schema, fields, equalities, take=200) {
        const model = await sdk.Model.create(schema);
        const group = new sdk.FilterGroup();
        for (const [column,value] of equalities || []) {
            await group.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,column,value);
        }
        return (await model.load({
            attributes:fields,
            parameters:equalities?.length ? [
                {type:sdk.ModelParameterType.Filter,value:filterValue(group)}] : [],
            options:{pagingConfig:{rowsOffset:0,rowCount:take}}
        })) || [];
    }
    async function loadOptionalColumns(schema, recId, fields) {
        const output={};
        for (const field of fields) {
            try {
                const value=await loadRecord(schema,recId,["Id",field]);
                if(value && Object.prototype.hasOwnProperty.call(value,field))output[field]=value[field];
            } catch (_ignored) { /* Column not installed or not readable. */ }
        }
        return output;
    }
    // Do not make an entire inventory query fail just because an optional
    // column (particularly UsrStatus) is absent in the customer's schema.
    async function loadInventoryForItem(itemId) {
        const filter=[["UsrOriginalRequestItem",itemId]];
        const base=await loadRows(INVENTORY_SCHEMA,["Id","UsrOriginalRequestItem"],filter,50);
        if(!base.length)return [];
        const mapped=new Map(base.map(vm=>[idOf(vm.Id).toLowerCase(),{...vm}]));
        for(const field of [...INVENTORY_VM_ID_FIELDS,"UsrStatus","CreatedOn","CreatedBy"]){
            try {
                const extra=await loadRows(INVENTORY_SCHEMA,["Id",field],filter,50);
                for(const vm of extra){const entry=mapped.get(idOf(vm.Id).toLowerCase());
                    if(entry)entry[field]=vm[field];}
            }catch(_optionalMissing){/* Column missing; preserve base inventory relation. */}
        }
        return [...mapped.values()];
    }
    // Read the process-to-record relation using BOTH SDK lookup projections.
    // A deployment can expose SysProcess (lookup) but not its raw SysProcessId,
    // or vice versa. Never resolve an execution by name/time alone.
    async function readLinkedProcessIds(recordId) {
        let succeeded = false;
        const ids = new Set();
        let lastError = null;
        for (const column of ["SysProcessId", "SysProcess"]) {
            try {
                const rows = await loadRows("SysProcessEntity", ["Id", column],
                    [["EntityId", recordId]], 150);
                succeeded = true;
                for (const row of rows) {
                    const id = idOf(row[column]);
                    if (isGuid(id)) ids.add(id.toLowerCase());
                }
            } catch (e) { lastError = e; }
            if (ids.size) break;
        }
        if (!succeeded) throw lastError || Error("Cannot read process-to-record links");
        return [...ids];
    }
    async function readProcessInstance(processId) {
        let record;
        try {
            record = await loadRecord("SysProcessLog", processId,
                ["Id", "Name", "StartDate", "CompleteDate", "Status"]);
        } catch (_unsupportedOptionalColumn) {
            record = await loadRecord("SysProcessLog", processId, ["Id"]);
            if (record) Object.assign(record, await loadOptionalColumns("SysProcessLog", processId,
                ["Name", "SysProcessName", "StartDate", "CompleteDate", "Status", "StatusName"]));
        }
        return record;
    }
    async function readProcessSteps(processId) {
        // Some Creatio builds allow filtering by the lookup but others by its
        // raw FK. Try both; ensure one optional projection cannot hide all steps.
        let successfullyQueried = false;
        let lastError;
        for (const processColumn of ["SysProcess", "SysProcessId"]) {
            let rows;
            try {
                rows = await loadRows("SysProcessElementLog",
                    ["Id", "Caption", "StartDate", "CompleteDate"],
                    [[processColumn, processId]], 350);
                successfullyQueried = true;
            } catch (e) {
                lastError = e;
                try {
                    rows = await loadRows("SysProcessElementLog", ["Id"],
                        [[processColumn, processId]], 350);
                    successfullyQueried = true;
                    // Keep the query scoped to the same process when probing fields.
                    const byId = new Map(rows.map(row => [idOf(row.Id).toLowerCase(), row]));
                    for (const field of ["Caption", "StartDate", "CompleteDate"]) {
                        try {
                            const optional = await loadRows("SysProcessElementLog", ["Id", field],
                                [[processColumn, processId]], 350);
                            for (const item of optional) {
                                const target = byId.get(idOf(item.Id).toLowerCase());
                                if (target) target[field] = item[field];
                            }
                        } catch (_missing) {}
                    }
                } catch (e2) { lastError = e2; continue; }
            }
            if (rows.length) {
                try {
                    const owners = await loadRows("SysProcessElementLog", ["Id", "OwnerName"],
                        [[processColumn, processId]], 350);
                    const byId = new Map(rows.map(row => [idOf(row.Id).toLowerCase(), row]));
                    for (const owner of owners) {
                        const entry = byId.get(idOf(owner.Id).toLowerCase());
                        if (entry) entry.OwnerName = owner.OwnerName;
                    }
                } catch (_missingOwner) {}
                return rows;
            }
        }
        if (!successfullyQueried && lastError) throw lastError;
        return [];
    }
    // Query optional Audit/Approval rows without declaring guessed columns.
    // Each projection is tested independently, keeping valid columns readable.
    async function loadOptionalRows(schema, filterColumn, recordId, extraFields, take=160) {
        const base=await loadRows(schema,["Id","CreatedOn"],[[filterColumn,recordId]],take);
        if(!base.length)return [];
        const byId=new Map(base.map(row=>[idOf(row.Id).toLowerCase(),{...row}]));
        for(const field of extraFields){
            try {
                const result=await loadRows(schema,["Id",field],[[filterColumn,recordId]],take);
                for(const row of result){const stored=byId.get(idOf(row.Id).toLowerCase());
                    if(stored)stored[field]=row[field];}
            }catch(_ignored){/* Optional column absent. */}
        }
        return [...byId.values()];
    }
    function earliestDate(values) {
        return values.filter(v=>v&&Number.isFinite(new Date(v).getTime()))
            .sort((a,b)=>new Date(a)-new Date(b))[0]||null;
    }
    function latestDate(values) {
        return values.filter(v=>v&&Number.isFinite(new Date(v).getTime()))
            .sort((a,b)=>new Date(b)-new Date(a))[0]||null;
    }
    function fileRoot() {
        const path = location.pathname || "/0/";
        const i = path.indexOf("/0/");
        return i >= 0 ? path.slice(0,i) + "/0/" : "/0/";
    }
    function fileUrl(id) {
        return fileRoot() + "rest/FileService/Download/SysFile/" + encodeURIComponent(id);
    }
    function statusKind(value) {
        const s=lower(value).replace(/[_-]+/g," ").replace(/\s+/g," ");
        if(/reject|declined|denied/.test(s))return "rejected";
        if(/correction|return(ed)? for|rework|changes requested/.test(s))return "correction";
        if(/provisioning|pending provisioning/.test(s))return "provisioning";
        if(/complet(ed|ion)|fulfilled|delivered/.test(s))return "completed";
        if(/draft/.test(s))return "draft";
        if(/submit/.test(s))return "submitted";
        if(/review|approval|approv/.test(s))return "review";
        return "other";
    }
    function statusStage(status, rt) {
        const kind=statusKind(status);
        if(kind==="rejected") {
            // Rejected is a terminal STATUS, not evidence that the Completion
            // STAGE ran. Use the saved rejection decision from this request.
            // The existing workflow timeline already maps SysApproval decisions
            // to their verified Financial / Technical stage where available.
            const history=rt?.workflowMilestones ? rt.workflowMilestones() : null;
            if(history) {
                const rejects=[...history.entries()]
                    .filter(([stage,info])=>stage!=="Completion" &&
                        /reject|denied|declined/i.test(str(info?.outcome)))
                    .sort((a,b)=>new Date(b[1].completed||b[1].started||0)-
                        new Date(a[1].completed||a[1].started||0));
                if(rejects.length)return rejects[0][0];
            }
            // Some deployments hide Approval Stage metadata. An actual saved
            // rejecting reviewer role can still identify the stage; never
            // infer a technical rejection merely from a Rejected status.
            const actor=lower(rt?.getCurrentDecision?.("rejected")?.actor);
            if(/financial|finance/.test(actor))return "TE Financial Review";
            if(/technical|engineering/.test(actor))return "TE Technical Review";
            if(/contract manager|managerial/.test(actor))return "TE Managerial Review";
            return "—"; // Stage not persisted / readable. Don't show Completion.
        }
        return ({draft:"Request Created",submitted:"Submitted",review:"Under TE Review",
            correction:"Submitted",provisioning:"Manual Provisioning",
            completed:"Completion"})[kind] || "—";
    }
    function canEdit(status) {
        return ["draft", "correction"].includes(statusKind(status));
    }
    function firstText(...values) {
        for(const v of values){const txt=display(v);if(txt && txt!=="—")return txt;}
        return "";
    }
    function firstRealDate(...values) {
        return values.find(v=>v && Number.isFinite(new Date(v).getTime())) || null;
    }
    function truthyBoolean(v) {
        return v === true || v === 1 || v === "true" || v === "True";
    }
    function savedDecisionType(approval) {
        const result=lower(approval?.VisaStatus || approval?.Result ||
            approval?.ApprovalStatus || approval?.Status || approval?.StatusName);
        if(/reject|negative|denied|declined/.test(result))return "rejected";
        if(/return|correction|rework|change/.test(result))return "correction";
        return "";
    }
    function decisionTimestamp(approval) {
        return firstRealDate(approval?.SetOn,approval?.SetDate,approval?.ApprovalDate);
    }
    // No fabricated SLA countdown: only use an explicitly stored SLA/stage due date.
    function stageDeadline(record, kind) {
        if(!record)return null;
        return kind==="correction" ? firstRealDate(record.UsrCorrectionDeadline,
            record.UsrCurrentStageDeadline, record.UsrStageDeadline,record.UsrSLADeadline) :
            firstRealDate(record.UsrCurrentStageDeadline,record.UsrStageDeadline,
                record.UsrSLADeadline,record.UsrRequestDeadline);
    }
    const CSS = `
        /* Page content matches the supplied Figma at 1720px viewport; Creatio chrome is preserved. */
        .usr-dt-root, .usr-dt-root *{box-sizing:border-box}
        .usr-dt-root{width:100%;min-width:0;max-width:1088px;margin:0 auto!important;
            padding:8px 14px 44px!important;color:#14213b;
            font:12px/1.48 Inter,Arial,sans-serif!important}
        .usr-dt-root button,.usr-dt-root a{font-family:inherit}
        .usr-dt-root button:focus-visible,.usr-dt-root a:focus-visible{outline:2px solid #6b22d6;outline-offset:2px}
        .usr-dt-live{width:100%;display:block;min-width:0}
        .usr-dt-breadcrumb{padding:2px 0 25px;color:#7e8ba5;font-weight:600;font-size:12px}
        .usr-dt-breadcrumb .usr-dt-current{color:#591abf;font-weight:750}
        .usr-dt-breadcrumb .usr-dt-sep{margin:0 7px;color:#b2b9c8}
        .usr-dt-header,.usr-dt-card,.usr-dt-table-card,.usr-dt-event,.usr-dt-banner{
            background:#fff;border:1px solid #e2e3ec;border-radius:14px}
        .usr-dt-header{padding:17px 18px 19px;margin:0 0 17px;min-height:106px}
        .usr-dt-head-row{display:flex;align-items:flex-start;justify-content:space-between;gap:14px}
        .usr-dt-top-meta{display:flex;gap:9px;align-items:center;flex-wrap:wrap;min-height:26px}
        .usr-dt-number{font-size:14px;color:#5912bf;font-weight:800;letter-spacing:.1px}
        .usr-dt-pill{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:14px;
            font-size:11px;font-weight:650;line-height:1.35;background:#f1f2f5;color:#6b7388;white-space:nowrap}
        .usr-dt-pill::before{content:"";width:5px;height:5px;border-radius:50%;background:#969cac}
        .usr-dt-pill[data-status="completed"]{background:#e8f9ef;color:#167a46}
        .usr-dt-pill[data-status="completed"]::before{background:#18a765}
        .usr-dt-pill[data-status="rejected"]{background:#fff0ef;color:#b42b34}
        .usr-dt-pill[data-status="rejected"]::before{background:#e14652}
        .usr-dt-pill[data-status="under te review"]{background:#f0e9fc;color:#6731a2}
        .usr-dt-pill[data-status="under te review"]::before{background:#7332b9}
        .usr-dt-pill[data-status="requires correction"],
        .usr-dt-pill[data-status="returned for correction"]{background:#fff4dc;color:#b76809}
        .usr-dt-pill[data-status="requires correction"]::before,
        .usr-dt-pill[data-status="returned for correction"]::before{background:#d68617}
        .usr-dt-pill[data-status="provisioning in progress"]{background:#e8f5ff;color:#1672b9}
        .usr-dt-pill[data-status="provisioning in progress"]::before{background:#2582d9}
        .usr-dt-sla{display:flex;align-items:center;gap:8px;margin-right:4px;white-space:nowrap}
        .usr-dt-sla[hidden]{display:none!important}
        .usr-dt-sla-bar{width:86px;height:6px;background:#edf0f4;border-radius:10px;overflow:hidden}
        .usr-dt-sla-progress{display:block;height:100%;width:100%;background:#21a35e;border-radius:10px}
        .usr-dt-sla[data-tone="late"] .usr-dt-sla-progress{background:#e52230}
        .usr-dt-sla[data-tone="soon"] .usr-dt-sla-progress{background:#ec8700}
        .usr-dt-sla-text{color:#277b50;font-size:10.5px;font-weight:800}
        .usr-dt-sla[data-tone="late"] .usr-dt-sla-text{color:#c8222d}
        .usr-dt-sla[data-tone="soon"] .usr-dt-sla-text{color:#cc7700}
        .usr-dt-banner{margin:0 0 17px;padding:15px 18px;display:flex;gap:12px;align-items:flex-start;
            border-radius:14px;line-height:1.5}
        .usr-dt-banner-icon{font-size:17px;font-weight:800;line-height:1.1;flex-shrink:0}
        .usr-dt-banner-main{min-width:0;flex:1}
        .usr-dt-banner-title{font-size:12px;font-weight:800;margin:0 0 2px}
        .usr-dt-banner-meta{font-size:10.5px;margin-bottom:10px}
        .usr-dt-banner-label{font-size:11px;font-weight:800;margin:6px 0 3px}
        .usr-dt-banner-comment{font-size:11.5px;white-space:pre-wrap;overflow-wrap:anywhere}
        .usr-dt-banner-buttons{display:flex;gap:7px;flex-wrap:wrap;margin-top:11px}
        .usr-dt-banner-rejected{color:#cf171e;border-color:#ffc4c4;background:#fff0f0}
        .usr-dt-banner-correction{color:#a94b00;border-color:#f8d76d;background:#fff9e8}
        .usr-dt-banner-provisioning{color:#235cce;border-color:#b5d5ff;background:#eaf3ff}
        .usr-dt-banner-submitted,.usr-dt-banner-review{color:#31509b;border-color:#c6d7fd;background:#f1f6ff}
        .usr-dt-banner-draft{color:#6b42a5;border-color:#d9c9ff;background:#f6f0ff}
        .usr-dt-deadline{color:#fff;background:#e1272e;font-size:10px;padding:5px 9px;
            border-radius:20px;white-space:nowrap;font-weight:800;margin-left:12px}
        .usr-dt-banner .usr-dt-action{height:32px;background:#fff}
        .usr-dt-banner .usr-dt-primary{background:linear-gradient(115deg,#5f16b8,#7224e1)}
        .usr-dt-validation{margin-top:9px;font-size:11px;font-weight:650}
        .usr-dt-validation.ok{color:#207a45}
        .usr-dt-validation.bad{color:#bd2929}
        .usr-dt-head-title{font-size:14px;line-height:1.35;font-weight:800;color:#111d35;margin:8px 0 7px}
        .usr-dt-head-caption{display:flex;align-items:center;gap:5px 14px;flex-wrap:wrap;
            color:#6c7690;font-size:10.5px;font-weight:500}
        .usr-dt-head-caption b{color:#192644;font-weight:800}
        .usr-dt-actions{display:flex;gap:8px;align-items:center;flex-shrink:0}
        .usr-dt-action{display:inline-flex;gap:8px;justify-content:center;align-items:center;
            height:34px;border:1px solid #e2e5ed;border-radius:10px;padding:0 14px;
            background:#fff;color:#263655;font-size:11.5px;font-weight:750;cursor:pointer}
        .usr-dt-primary{color:#fff!important;background:linear-gradient(115deg,#5f16b8,#7224e1);
            border-color:#6620ca!important;box-shadow:0 1px 0 rgba(0,0,0,.03)}
        .usr-dt-action[hidden]{display:none!important}
        .usr-dt-action:disabled{opacity:.5;cursor:not-allowed}
        .usr-dt-tabs{display:flex;gap:3px 7px;align-items:stretch;flex-wrap:wrap;
            border-bottom:1px solid #e2e4ec;padding:0 1px;margin-bottom:17px}
        .usr-dt-tab{appearance:none;background:transparent;border:0;border-bottom:2px solid transparent;
            color:#667289;font-size:12px;font-weight:700;cursor:pointer;padding:9px 13px 12px}
        .usr-dt-tab:first-child{padding-left:9px}
        .usr-dt-tab[aria-selected="true"]{border-bottom-color:#7126d0;color:#5917c3}
        .usr-dt-tab-count{display:inline-block;margin-left:5px;background:#f3eafc;color:#6324b8;
            border-radius:12px;padding:0 6px;min-width:17px;line-height:18px;font-size:10px}
        .usr-dt-body{min-height:210px;min-width:0}
        .usr-dt-overview{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px}
        .usr-dt-card{overflow:hidden;min-width:0}
        .usr-dt-card-head{padding:13px 16px;min-height:45px;font-size:12px;font-weight:800;
            color:#15213a;border-bottom:1px solid #edf0f5}
        .usr-dt-info-body{padding:8px 16px 12px;min-height:288px}
        .usr-dt-info-line{display:flex;justify-content:space-between;align-items:center;gap:15px;
            min-height:41px;padding:9px 0;border-bottom:1px solid #eff0f4}
        .usr-dt-info-line:last-child{border:0}
        .usr-dt-info-key{color:#72809a;font-weight:500;flex:1}
        .usr-dt-info-value{color:#152444;font-weight:800;text-align:right;overflow-wrap:anywhere;max-width:65%}
        .usr-dt-justification{padding:18px 16px;min-height:288px;line-height:1.62;
            color:#273755;font-size:12px;white-space:pre-wrap;overflow-wrap:anywhere}
        .usr-dt-table-card{overflow:hidden;min-width:0}
        .usr-dt-table-scroll{overflow:auto;max-width:100%}
        .usr-dt-table{border-collapse:collapse;width:100%;min-width:1030px;text-align:left;background:#fff}
        .usr-dt-table th{background:#f9fafb;color:#68768f;font-size:10.5px;
            padding:13px 11px;font-weight:800;white-space:nowrap;border-bottom:1px solid #edf0f4}
        .usr-dt-table td{padding:12px 11px;color:#23324e;font-size:11px;vertical-align:middle;
            border-bottom:1px solid #eef0f5;white-space:nowrap}
        .usr-dt-table tbody tr:last-child td{border-bottom:0}
        .usr-dt-table .usr-dt-cell-strong{color:#1a2a4b;font-weight:800}
        .usr-dt-table .usr-dt-cell-points{color:#6017bb;font-weight:800}
        .usr-dt-production{display:inline-block;padding:2px 6px;border-radius:4px;
            color:#c32c2c;background:#fff0ef;font-size:10px;font-weight:750}
        .usr-dt-table-note{font-size:10.5px;padding:10px 14px;background:#fff;border-top:1px solid #eef0f5;
            color:#8b96ac}
        .usr-dt-empty{background:#fff;border:1px solid #e2e3ec;border-radius:14px;
            min-height:215px;padding:45px 15px;display:flex;flex-direction:column;
            justify-content:center;align-items:center;text-align:center}
        .usr-dt-empty-icon{width:47px;height:47px;border-radius:14px;display:grid;place-items:center;
            font-size:22px;font-weight:500;margin-bottom:13px;color:#966aff;background:#f2eafb}
        .usr-dt-empty-title{color:#1c2c48;font-size:12px;font-weight:800;margin-bottom:3px}
        .usr-dt-empty-sub{color:#8c97af;max-width:290px;line-height:1.4;font-size:11px}
        .usr-dt-workflow{padding:17px 19px 22px}
        .usr-dt-section-title{font-size:12.5px;font-weight:800;color:#182845;margin:0 0 19px}
        .usr-dt-work-status{display:inline-block;margin-left:12px;color:#6d7391;font-size:11px;font-weight:600}
        .usr-dt-timeline{margin:2px 0 4px 6px}
        .usr-dt-step{display:grid;grid-template-columns:17px minmax(0,1fr);
            gap:12px;position:relative;min-height:39px;color:#99a4b9}
        .usr-dt-step:not(:last-child)::after{content:"";position:absolute;top:17px;bottom:0;
            left:7px;width:2px;background:#e5e9f0}
        .usr-dt-step.is-done:not(:last-child)::after{background:#94eac5}
        .usr-dt-step-dot{width:14px;height:14px;border:1px solid #dee3eb;background:#f4f5f7;
            border-radius:50%;margin-top:1px}
        .usr-dt-step.is-done .usr-dt-step-dot{background:#1bab69;color:#fff;border-color:#1bab69;
            display:grid;place-items:center;font-size:9px}
        .usr-dt-step-main{padding:0 0 12px;min-width:0}
        .usr-dt-step-header{display:flex;justify-content:space-between;gap:12px;align-items:start}
        .usr-dt-step-name{font-size:11.5px;font-weight:800}
        .usr-dt-step.is-done .usr-dt-step-name{color:#172741}
        .usr-dt-step-actor{color:#6a7995;font-size:10.5px;margin-top:1px}
        .usr-dt-step-dates{color:#8998af;font-size:10px;text-align:right;flex-shrink:0;line-height:1.5}
        .usr-dt-outcome{background:#eafcf3;border:1px solid #89eaba;border-radius:10px;
            padding:9px 12px;color:#007c50;font-weight:800;font-size:10.5px;margin:8px 0 12px}
        .usr-dt-work-note{margin:17px 0 0;color:#8a94a9;font-size:10.5px;line-height:1.5}
        .usr-dt-event{display:flex;align-items:flex-start;gap:12px;padding:13px 14px;
            margin-bottom:11px;min-height:59px}
        .usr-dt-event-dot{width:7px;height:7px;flex-shrink:0;border-radius:50%;
            background:#6321bb;margin:8px 0 0}
        .usr-dt-event-text{color:#172741;font-size:12px;font-weight:800}
        .usr-dt-event-meta{color:#8795ac;font-size:10.5px;margin-top:3px}
        .usr-dt-process-card{margin-top:16px}
        .usr-dt-process-row{display:flex;gap:12px;justify-content:space-between;
            border-top:1px solid #eef0f5;padding:11px 15px;align-items:center}
        .usr-dt-process-row strong{font-size:11px;color:#1d2a47}
        .usr-dt-process-row span{font-size:10.5px;color:#8291a7}
        .usr-dt-changelog-wrap{display:flex;align-items:center;gap:13px;margin-top:14px;flex-wrap:wrap}
        .usr-dt-hint{font-size:11px;color:#8793a8}
        .usr-dt-error{padding:14px 16px;background:#fff8f8;color:#a12a31;
            border:1px solid #f2c5c5;border-radius:10px;font-size:12px}
        .usr-dt-loading{color:#8190a8;padding:24px;background:#fff;border:1px solid #e1e4ea;
            border-radius:13px;font-size:12px}
        .usr-dt-doc-link{font-weight:750;color:#6325c6;text-decoration:none}
        .usr-dt-doc-link:hover{text-decoration:underline}
        .usr-dt-print-report{display:none}
        @media(max-width:850px){
            .usr-dt-overview{grid-template-columns:1fr}
            .usr-dt-header{padding:16px}.usr-dt-head-row{flex-wrap:wrap}
            .usr-dt-actions{width:100%;justify-content:flex-end;flex-wrap:wrap}
            .usr-dt-sla-bar{width:55px}
            .usr-dt-tabs{gap:0}.usr-dt-tab{padding:10px 9px;font-size:11px}
            .usr-dt-info-body,.usr-dt-justification{min-height:0}
        }
        @media(max-width:520px){
            .usr-dt-root{padding:6px 8px 30px!important}
            .usr-dt-header{border-radius:11px}.usr-dt-breadcrumb{padding-bottom:13px}
            .usr-dt-tab{font-size:10px;padding:9px 6px}.usr-dt-head-caption{gap:4px 9px}
            .usr-dt-step-dates{white-space:normal}.usr-dt-workflow{padding:13px}
        }
        @media print{
            @page{size:A4;margin:13mm}
            body > :not(.usr-dt-print-report){display:none!important}
            body .usr-dt-print-report{display:block!important;position:static!important;width:100%!important;
                max-width:none!important;padding:0!important;margin:0!important;background:#fff!important;
                color:#13223c!important;font:11px Arial,sans-serif!important}
            .usr-dt-print-report .usr-dt-overview{display:grid;grid-template-columns:1fr 1fr}
            .usr-dt-print-report .usr-dt-card,.usr-dt-print-report .usr-dt-table-card,
            .usr-dt-print-report .usr-dt-event{break-inside:avoid}
            .usr-dt-print-report .usr-dt-table{min-width:0;font-size:8px}
            .usr-dt-print-report .usr-dt-table td,.usr-dt-print-report .usr-dt-table th{font-size:8px;padding:6px}
            .usr-dt-print-report .usr-dt-table-scroll{overflow:visible}
            .usr-dt-print-report .usr-dt-print-section{margin:20px 0 14px;break-before:auto}
            .usr-dt-print-report .usr-dt-print-section h2{font-size:14px;border-bottom:1px solid #ddd;padding-bottom:7px}
            .usr-dt-print-report button{display:none!important}
        }
    `;

    function makeCard(title, bodyClass) {
        const card=element("section","usr-dt-card");
        append(card,element("div","usr-dt-card-head",title),element("div",bodyClass));
        return card;
    }
    function empty(title, subtitle, icon="♧") {
        const node=element("div","usr-dt-empty");
        append(node,element("div","usr-dt-empty-icon",icon),
            element("div","usr-dt-empty-title",title),
            element("div","usr-dt-empty-sub",subtitle));
        return node;
    }
    function infoLine(title, value) {
        const line=element("div","usr-dt-info-line");
        append(line, element("span","usr-dt-info-key",title),
            element("strong","usr-dt-info-value",show(value)));
        return line;
    }
    function errorBox(message) {return element("div","usr-dt-error",message);}

    return {
        viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
            {"operation":"merge","name":"MainHeader","values":{"visible":false}},
            {"operation":"insert","name":"UsrDetailRoot","values":{
                "type":"crt.FlexContainer","direction":"column","wrap":"nowrap",
                "items":[],"fitContent":false,"visible":true,
                "classes":["usr-dt-root"]
            },"parentName":"MainContainer","propertyName":"items","index":0},
            // Designer preview: native, editable, non-data-bound components.
            // The runtime uses v1 DOM/CSS and removes these placeholder children
            // only within its own UsrDetailRoot container.
            {"operation":"insert","name":"DT_DesignerHeading","values":{
                "type":"crt.Label","caption":"MCIT Service Portal  ›  My Requests  ›  Request Detail",
                "labelType":"body","labelThickness":"bold"
            },"parentName":"UsrDetailRoot","propertyName":"items","index":0},
            {"operation":"insert","name":"DT_DesignerHeader","values":{
                "type":"crt.FlexContainer","direction":"column","items":[],
                "fitContent":true,"gap":"small"
            },"parentName":"UsrDetailRoot","propertyName":"items","index":1},
            {"operation":"insert","name":"DT_DesignerRequestNumber","values":{
                "type":"crt.Label","caption":"Request ID  •  Current status",
                "labelType":"body","labelThickness":"bold"
            },"parentName":"DT_DesignerHeader","propertyName":"items","index":0},
            {"operation":"insert","name":"DT_DesignerRequestTitle","values":{
                "type":"crt.Label","caption":"Request title",
                "labelType":"body","labelThickness":"bold"
            },"parentName":"DT_DesignerHeader","propertyName":"items","index":1},
            {"operation":"insert","name":"DT_DesignerRequestMeta","values":{
                "type":"crt.Label","caption":"Type  •  Authority  •  Project  •  Stage",
                "labelType":"body"
            },"parentName":"DT_DesignerHeader","propertyName":"items","index":2},
            {"operation":"insert","name":"DT_DesignerTabs","values":{
                "type":"crt.FlexContainer","direction":"row","wrap":"wrap","items":[],
                "fitContent":true,"gap":"medium"
            },"parentName":"UsrDetailRoot","propertyName":"items","index":2},
            {"operation":"insert","name":"DT_DesignerTabOverview","values":{
                "type":"crt.Label","caption":"Overview","labelType":"body","labelThickness":"bold"
            },"parentName":"DT_DesignerTabs","propertyName":"items","index":0},
            {"operation":"insert","name":"DT_DesignerTabItems","values":{
                "type":"crt.Label","caption":"VM Items","labelType":"body"
            },"parentName":"DT_DesignerTabs","propertyName":"items","index":1},
            {"operation":"insert","name":"DT_DesignerTabWorkflow","values":{
                "type":"crt.Label","caption":"Workflow","labelType":"body"
            },"parentName":"DT_DesignerTabs","propertyName":"items","index":2},
            {"operation":"insert","name":"DT_DesignerTabDocuments","values":{
                "type":"crt.Label","caption":"Documents","labelType":"body"
            },"parentName":"DT_DesignerTabs","propertyName":"items","index":3},
            {"operation":"insert","name":"DT_DesignerTabAudit","values":{
                "type":"crt.Label","caption":"Activity & Audit","labelType":"body"
            },"parentName":"DT_DesignerTabs","propertyName":"items","index":4},
            {"operation":"insert","name":"DT_DesignerOverviewPanels","values":{
                "type":"crt.FlexContainer","direction":"row","wrap":"wrap","items":[],
                "fitContent":false,"gap":"medium"
            },"parentName":"UsrDetailRoot","propertyName":"items","index":3},
            {"operation":"insert","name":"DT_DesignerRequestInfo","values":{
                "type":"crt.FlexContainer","direction":"column","items":[],"fitContent":true
            },"parentName":"DT_DesignerOverviewPanels","propertyName":"items","index":0},
            {"operation":"insert","name":"DT_DesignerRequestInfoHeading","values":{
                "type":"crt.Label","caption":"Request Information","labelType":"body","labelThickness":"bold"
            },"parentName":"DT_DesignerRequestInfo","propertyName":"items","index":0},
            {"operation":"insert","name":"DT_DesignerRequestInfoSub","values":{
                "type":"crt.Label","caption":"Request Type  •  Authority  •  Project  •  Contract  •  Created  •  Submitted  •  Estimated Points","labelType":"body"
            },"parentName":"DT_DesignerRequestInfo","propertyName":"items","index":1},
            {"operation":"insert","name":"DT_DesignerJustification","values":{
                "type":"crt.FlexContainer","direction":"column","items":[],"fitContent":true
            },"parentName":"DT_DesignerOverviewPanels","propertyName":"items","index":1},
            {"operation":"insert","name":"DT_DesignerJustificationHeading","values":{
                "type":"crt.Label","caption":"Business Justification","labelType":"body","labelThickness":"bold"
            },"parentName":"DT_DesignerJustification","propertyName":"items","index":0},
            {"operation":"insert","name":"DT_DesignerJustificationSub","values":{
                "type":"crt.Label","caption":"Real request text is loaded at runtime from UsrVMRequest","labelType":"body"
            },"parentName":"DT_DesignerJustification","propertyName":"items","index":1}
        ]/**SCHEMA_VIEW_CONFIG_DIFF*/,
        // No binding to a data source that is missing from the Designer's
        // model metadata.  The route GUID is used to fetch records directly.
        viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
            {"operation":"merge","path":["attributes"],"values":{
                "DT_RecordId":{"value":null}
            }}
        ]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
        modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[]/**SCHEMA_MODEL_CONFIG_DIFF*/,
        handlers: /**SCHEMA_HANDLERS*/[
            {request:"crt.HandleViewModelInitRequest",handler:async(request,next)=>{
                if(isPageDesigner()) return next?.handle(request);
                const result=await next?.handle(request);
                const ctx=request.$context;
                if (typeof document === "undefined") return result;
                document.__usrMCITRequestDetailV2?.dispose?.();
                const rt={ctx,id:"",record:null,items:[],files:[],processes:[],processElements:[],
                    inventoryByItem:new Map(),statusHistory:[],approvals:[],submittedAt:null,
                    submissionSource:"",tab:"Overview",loading:true,
                    processLink:{status:"loading",linked:0,loaded:0},
                    parts:{items:"loading",files:"loading",processes:"loading",inventory:"loading",workflow:"loading"},
                    errors:{},disposed:false,live:null,host:null,observer:null,
                    generation:0,timers:[],hiddenNative:new Map(),processMessage:"",
                    validation:null,busyAction:false,actions:{}};
                document.__usrMCITRequestDetailV2=rt;
                let detailStyle=document.getElementById("usr-dt-figma-style-v2");
                if(!detailStyle){
                    detailStyle=element("style");detailStyle.id="usr-dt-figma-style-v2";
                    document.head.appendChild(detailStyle);
                }
                // Hot re-publish must refresh CSS even if v12 style already exists.
                detailStyle.textContent=CSS;

                rt.dispose=()=>{
                    if(rt.disposed)return;
                    rt.disposed=true;rt.generation++;
                    rt.observer?.disconnect();
                    if(rt.hashListener)window.removeEventListener("hashchange",rt.hashListener);
                    for(const t of rt.timers)clearTimeout(t);
                    for(const [node,oldStyle] of rt.hiddenNative){
                        if(node.isConnected){
                            if(oldStyle===null)node.style.removeProperty("display");
                            else node.style.display=oldStyle;
                        }
                    }
                    rt.hiddenNative.clear();rt.live?.remove();
                    const print=document.getElementById("usr-dt-print-report");
                    if(print)print.remove();
                };
                // Existing native layouts are only hidden in runtime. Their schema
                // remains untouched and is still openable in Page Designer.
                rt.hideNative=()=>{
                    if(!rt.host?.isConnected)return;
                    // The native General Information / template controls in the screenshot
                    // are siblings of the inserted UsrDetailRoot in MainContainer.
                    const parent=rt.host.parentElement;
                    if(!parent)return;
                    for(const node of Array.from(parent.children)){
                        if(node===rt.host || node.contains(rt.host) || rt.host.contains(node))continue;
                        if(node.classList?.contains("usr-dt-print-report"))continue;
                        if(!rt.hiddenNative.has(node))rt.hiddenNative.set(node,node.style.display||null);
                        if(node.style.display!=="none")node.style.display="none";
                    }
                    // Some Creatio builds render the native section as the next
                    // sibling of the entire MainContainer rather than inside it.
                    // Do NOT hide higher-level siblings: they may be the app shell.
                };
                rt.resolveHost=()=>{
                    if(rt.host?.isConnected)return rt.host;
                    const hosts=Array.from(document.querySelectorAll(".usr-dt-root"));
                    rt.host=hosts.find(x=>x.isConnected && x.getClientRects().length) ||
                        hosts.find(x=>x.isConnected) || null;
                    return rt.host;
                };
                rt.mount=()=>{
                    if(rt.disposed)return;
                    const host=rt.resolveHost();if(!host)return;
                    rt.hideNative();
                    if(rt.live?.isConnected)return;
                    host.replaceChildren();
                    rt.live=element("div","usr-dt-live");
                    const crumb=element("div","usr-dt-breadcrumb");
                    append(crumb,element("span","","MCIT Service Portal"),
                        element("span","usr-dt-sep","›"),
                        element("span","","My Requests"),
                        element("span","usr-dt-sep","›"),
                        element("span","usr-dt-current","Request Detail"));
                    const head=element("header","usr-dt-header");
                    const row=element("div","usr-dt-head-row");
                    const meta=element("div","usr-dt-top-meta");
                    const reqNo=element("span","usr-dt-number","Loading…");reqNo.dataset.field="number";
                    const pill=element("span","usr-dt-pill","—");pill.dataset.field="status";
                    append(meta,reqNo,pill);
                    const actions=element("div","usr-dt-actions");
                    const sla=element("div","usr-dt-sla");sla.dataset.field="sla";
                    const slaBar=element("span","usr-dt-sla-bar");
                    slaBar.appendChild(element("span","usr-dt-sla-progress"));
                    append(sla,slaBar,element("span","usr-dt-sla-text"));
                    const create=button("▣  Create New from This","usr-dt-action usr-dt-primary",
                        ()=>rt.createFromThis(),"Open a new request using this request as a source");
                    create.dataset.field="create";
                    const edit=button("✎  Edit Request","usr-dt-action usr-dt-primary",
                        ()=>rt.openWizard(true),"Edit this draft or request returned for correction");
                    edit.dataset.field="edit";
                    const archive=button("Archive","usr-dt-action",()=>rt.archive(),
                        "Archive the rejected request if an archive field is installed");
                    archive.dataset.field="archive";
                    const pdf=button("⇩  Export PDF","usr-dt-action",()=>rt.print(),
                        "Open browser Print / Save as PDF for the complete request report");
                    append(actions,sla,create,edit,archive,pdf);append(row,meta,actions);
                    rt.actions={sla,create,edit,archive,pdf};
                    const title=element("div","usr-dt-head-title","Loading request…");title.dataset.field="title";
                    const caption=element("div","usr-dt-head-caption");
                    for(const [key,text] of [["type","Type"],["authority","Authority"],
                            ["project","Project"],["stage","Stage"]]){
                        const item=element("span");append(item,document.createTextNode(text+": "));
                        const val=element("b","","—");val.dataset.field=key;
                        item.appendChild(val);caption.appendChild(item);
                    }
                    append(head,row,title,caption);
                    const tabs=element("nav","usr-dt-tabs");tabs.setAttribute("role","tablist");
                    for(const tabName of TABS){
                        const tab=button(tabName,"usr-dt-tab",()=>{
                            if(rt.tab===tabName)return;rt.tab=tabName;rt.paint();
                        });
                        tab.dataset.tab=tabName;tab.setAttribute("role","tab");
                        if(["VM Items","Documents"].includes(tabName)){
                            const count=element("span","usr-dt-tab-count","…");
                            count.dataset.count=tabName;tab.appendChild(count);
                        }
                        tabs.appendChild(tab);
                    }
                    const banner=element("div");banner.dataset.region="status-banner";
                    const body=element("main","usr-dt-body");body.dataset.region="body";
                    const alert=element("div","usr-dt-feedback");alert.dataset.region="feedback";
                    append(rt.live,crumb,head,banner,tabs,alert,body);
                    host.appendChild(rt.live);rt.paint();
                };
                rt.notify=message=>{
                    if(!rt.live)return;
                    const region=rt.live.querySelector('[data-region="feedback"]');
                    if(!region)return;
                    region.replaceChildren();
                    if(message){region.appendChild(errorBox(message));
                        rt.timers.push(setTimeout(()=>{if(region.isConnected)region.replaceChildren();},8000));}
                };
                // All action entry points validate record/status again. Never fake
                // process completion or bypass the customer's approval/ledger logic.
                rt.openWizard=async(editMode=true,sourceId="")=>{
                    if(!isGuid(rt.id))return rt.notify("Request ID is not available.");
                    if(editMode && !canEdit(rt.record?.UsrStatus))
                        return rt.notify("This request status does not allow editing.");
                    try{
                        const configs=editMode ? [{action:"edit",recordId:rt.id}] : [{
                            action:"create",copyFromRequestId:sourceId||rt.id,
                            defaultValues:[
                                ["UsrRequestType",rt.record?.UsrRequestType],
                                ["UsrAccount",rt.record?.UsrAccount],
                                ["UsrProject",rt.record?.UsrProject],
                                ["UsrContract",rt.record?.UsrContract],
                                ["UsrBusinessJustification",rt.record?.UsrBusinessJustification]
                            ].filter(([,v])=>v!==null&&v!==undefined&&str(display(v))!=="")
                                .map(([attributeName,v])=>({attributeName,
                                    value:typeof v==="object"?idOf(v):v}))
                        }];
                        await sdk.HandlerChainService.instance.process({
                            type:"crt.OpenPageRequest",schemaName:"UsrMCITNewRequest_WizardPage",
                            modelInitConfigs:configs,$context:ctx,scopes:[...(request.scopes||[])]
                        });
                    }catch(err){console.error("Request Detail wizard navigation failed",err);
                        rt.notify("Unable to open the request wizard: "+(err?.message||err));}
                };
                rt.createFromThis=async()=>{
                    if(statusKind(rt.record?.UsrStatus)!=="rejected")return;
                    // The defaultValues/sourceId are offered to the wizard; the
                    // wizard must explicitly support copying VM items/docs if desired.
                    await rt.openWizard(false,rt.id);
                };
                rt.getCurrentDecision=kind=>{
                    const decisions=rt.approvals.filter(a=>savedDecisionType(a)===kind)
                        .sort((a,b)=>new Date(decisionTimestamp(b)||0)-new Date(decisionTimestamp(a)||0));
                    const item=decisions[0]||null;
                    const matchedEvents=rt.statusHistory.filter(h=>statusKind(h.UsrNewStatus)===kind)
                        .sort((a,b)=>new Date(b.UsrChangedOn||0)-new Date(a.UsrChangedOn||0));
                    const event=matchedEvents[0]||null;
                    const reason=kind==="rejected" ?
                        firstText(rt.record?.UsrRejectionReason,rt.record?.UsrRejectReason,
                            rt.record?.UsrRejectionComment,rt.record?.UsrRejectionComments,
                            item?.Comment,item?.Description,event?.UsrComments,event?.UsrReason) :
                        firstText(rt.record?.UsrCorrectionComments,rt.record?.UsrCorrectionReason,
                            rt.record?.UsrReturnComments,rt.record?.UsrReturnReason,
                            rt.record?.UsrReviewerComments,item?.Comment,item?.Description,
                            event?.UsrComments,event?.UsrReason);
                    return {reason,actor:firstText(item?.Approver,item?.Owner,
                        item?.VisaOwner,event?.UsrChangedBy),
                        when:decisionTimestamp(item)||event?.UsrChangedOn||null};
                };
                rt.validateForResubmit=()=>{
                    const data=rt.record||{};
                    const errors=[];
                    if(!isGuid(rt.id))errors.push("Invalid request ID");
                    for(const [field,label] of [["UsrRequestType","Request Type"],
                        ["UsrAccount","Authority"],["UsrProject","Project"],
                        ["UsrContract","Contract"],["UsrBusinessJustification","Business Justification"]]){
                        if(!firstText(data[field]))errors.push(label+" is required");
                    }
                    if(rt.parts.items==="ready"&&!rt.items.length)errors.push("Add at least one VM Item");
                    if(rt.parts.items!=="ready")errors.push("VM Items are not available for validation");
                    // Intentionally do NOT claim contract rate, quota, SLA, approval
                    // permissions or document rules were validated in the browser.
                    rt.validation={errors,at:new Date().toISOString()};
                    rt.paint();
                    if(errors.length)rt.notify("Basic validation: "+errors.join("; "));
                    else rt.notify("Basic checks passed. Server-side validation is still required before resubmission.");
                    return errors.length===0;
                };
                rt.resubmit=async()=>{
                    if(statusKind(rt.record?.UsrStatus)!=="correction"||rt.busyAction)return;
                    // Basic client checks only. The existing submission process must
                    // still validate eligibility/quotas/permissions on the server.
                    if(!rt.validateForResubmit())return;
                    if(!window.confirm("Resubmit the corrected request? This will change Status to Submitted and trigger the existing MCIT VM Request Submission approval process."))return;
                    rt.busyAction=true;rt.paint();
                    try{
                        // Re-read fresh state; never resubmit Rejected or already Submitted.
                        const current=await loadRecord(HEADER_SCHEMA,rt.id,
                            ["Id","UsrStatus","UsrRequestType","UsrAccount",
                             "UsrProject","UsrContract","UsrBusinessJustification"]);
                        if(!current || statusKind(current.UsrStatus)!=="correction")
                            throw Error("Request is no longer Requires Correction. Refresh before resubmitting.");
                        // Optional archive field must not break Resubmit if this
                        // schema change has not yet been published.
                        const archiveState=await loadOptionalColumns(HEADER_SCHEMA,rt.id,["UsrIsArchived"]);
                        if(truthyBoolean(archiveState.UsrIsArchived))
                            throw Error("Archived requests cannot be resubmitted.");
                        for(const [field,label] of [["UsrRequestType","Request Type"],
                            ["UsrAccount","Authority"],["UsrProject","Project"],
                            ["UsrContract","Contract"],["UsrBusinessJustification","Business Justification"]]){
                            if(!firstText(current[field]))throw Error(label+" is required. Edit the request first.");
                        }
                        const items=await loadRows(ITEM_SCHEMA,["Id"],[["UsrRequest",rt.id]],1);
                        if(!items.length)throw Error("At least one saved VM Item is required.");
                        const oldStatusId=idOf(current.UsrStatus);
                        if(!isGuid(oldStatusId))
                            throw Error("Cannot verify the current Requires Correction lookup ID.");
                        const submittedId=await resolveSubmittedStatusId(rt.statusHistory);
                        if(oldStatusId.toLowerCase()===submittedId.toLowerCase())
                            throw Error("Request is already Submitted.");
                        // An atomic guard prevents a second click/tab from writing
                        // Submitted again after another user already changed status.
                        const guarded=new sdk.FilterGroup();
                        await guarded.addSchemaColumnFilterWithParameter(
                            sdk.ComparisonType.Equal,"Id",rt.id);
                        await guarded.addSchemaColumnFilterWithParameter(
                            sdk.ComparisonType.Equal,"UsrStatus",oldStatusId);
                        const model=await sdk.Model.create(HEADER_SCHEMA);
                        // Match the lookup DTO shape used by the existing MCIT wizard.
                        const updateResult=await model.update({UsrStatus:{value:submittedId,displayValue:"Submitted"}},[
                            {type:sdk.ModelParameterType.Filter,value:filterValue(guarded)}
                        ]);
                        if(updateResult===false || updateResult?.success===false ||
                            updateResult?.isSuccess===false || updateResult?.rowsAffected===0)
                            throw Error("Request was not updated (possibly already resubmitted). Refresh and check Process Log.");
                        const latest=await loadRecord(HEADER_SCHEMA,rt.id,["Id","UsrStatus"]);
                        if(!latest || statusKind(latest.UsrStatus)==="correction")
                            throw Error("Status did not change. Check permissions and published object signal.");
                        // The saved status transition is the ONLY trigger. Running the
                        // process via executeProcessByName would cause duplicate approvals.
                        rt.notify("Resubmitted: status changed from Requires Correction. Existing submission signal should start "+
                            SUBMISSION_SIGNAL_PROCESS_CODE+". Verify one instance in Process Log.");
                        await rt.refresh();
                    }catch(err){console.error("MCIT resubmission failed",err);
                        rt.notify("Resubmit failed: "+(err?.message||err));
                    }finally{rt.busyAction=false;rt.paint();}
                };
                rt.archive=async()=>{
                    if(statusKind(rt.record?.UsrStatus)!=="rejected"||rt.busyAction)return;
                    const flag=ARCHIVE_BOOLEAN_FIELDS.find(f=>Object.prototype.hasOwnProperty.call(rt.record||{},f));
                    const field=flag || (Object.prototype.hasOwnProperty.call(rt.record||{},"UsrArchivedOn")?
                        "UsrArchivedOn":null);
                    const processCode=str(WORKFLOW_ACTION_CONFIG.archiveProcessCode);
                    if(!field && !processCode){
                        rt.notify("Archive requires an installed UsrIsArchived / UsrArchived / UsrArchivedOn field or a configured archive BPMN process. No record was changed.");
                        return;
                    }
                    if(field && (flag?truthyBoolean(rt.record[field]):!!rt.record.UsrArchivedOn)){
                        rt.notify("This request is already archived.");return;
                    }
                    if(!window.confirm("Archive this rejected request?"))return;
                    rt.busyAction=true;rt.paint();
                    try{
                        const existing=await loadRecord(HEADER_SCHEMA,rt.id,["Id","UsrStatus",...(field?[field]:[])]);
                        if(!existing || statusKind(existing.UsrStatus)!=="rejected")
                            throw Error("The request is no longer Rejected. Refresh before archiving.");
                        if(field){
                            const value=flag?true:new Date().toISOString();
                            const model=await sdk.Model.create(HEADER_SCHEMA);
                            await model.update({[field]:value},[{type:sdk.ModelParameterType.PrimaryColumnValue,value:rt.id}]);
                            const verified=await loadRecord(HEADER_SCHEMA,rt.id,["Id",field]);
                            if(!verified || !(flag?truthyBoolean(verified[field]):
                                    !!firstRealDate(verified[field])))
                                throw Error("Archive value was not saved; check record permissions.");
                            rt.record[field]=value;rt.notify("Request archived successfully.");
                        }else{
                            const service=new sdk.ProcessEngineService();
                            const params={[WORKFLOW_ACTION_CONFIG.archiveRequestIdParameter]:rt.id};
                            const response=await service.executeProcessByName(processCode,params,[]);
                            if(response===false||response?.isSuccess===false||response?.success===false)
                                throw Error("Creatio rejected starting the archive process.");
                            rt.notify("Archive process started; verify the result in Creatio before treating the request as archived.");
                        }
                    }catch(err){console.error("MCIT archive failed",err);
                        rt.notify("Archive failed: "+(err?.message||err));
                    }finally{rt.busyAction=false;rt.paint();}
                };
                rt.refresh=async()=>{
                    if(!isGuid(rt.id))return;
                    const current=rt.id;
                    rt.record=null;
                    await rt.load(current);
                };
                rt.renderStatusBanner=()=>{
                    const kind=statusKind(rt.record?.UsrStatus);
                    if(!rt.record || !["rejected","correction","provisioning","submitted","review","draft"].includes(kind))return null;
                    const banner=element("section","usr-dt-banner usr-dt-banner-"+kind);
                    const icon=element("span","usr-dt-banner-icon",
                        ({rejected:"⊗",correction:"⚠",provisioning:"ⓘ",submitted:"ⓘ",review:"ⓘ",draft:"ⓘ"})[kind]);
                    const main=element("div","usr-dt-banner-main");
                    let title="",meta="",reason="";
                    if(kind==="rejected"||kind==="correction"){
                        const decision=rt.getCurrentDecision(kind);
                        title=kind==="rejected"?"This request has been rejected":"This request has been returned for correction";
                        meta=(kind==="rejected"?"Rejected":"Returned")+
                            (decision.actor?" by "+decision.actor:"")+
                            (decision.when?" on "+date(decision.when):"");
                        reason=decision.reason;
                    }else if(kind==="provisioning"){
                        title="Provisioning in Progress";
                        meta="TE Operations is currently provisioning your virtual machines. You will be notified upon completion.";
                    }else if(kind==="submitted"){
                        title="Request Submitted";
                        meta="Your request has entered the approval workflow.";
                    }else if(kind==="review"){
                        title="Request Under TE Review";
                        meta="The request is being reviewed by the assigned team.";
                    }else{
                        title="Draft Request";meta="Complete your request before submitting it for approval.";
                    }
                    main.appendChild(element("div","usr-dt-banner-title",title));
                    if(meta)main.appendChild(element("div","usr-dt-banner-meta",meta));
                    if(kind==="rejected"||kind==="correction"){
                        main.appendChild(element("div","usr-dt-banner-label",
                            kind==="rejected"?"Rejection Reason:":"TE Comments:"));
                        main.appendChild(element("div","usr-dt-banner-comment",
                            reason||"No reviewer comments are recorded or accessible for this request."));
                        if(kind==="rejected"){
                            const buttons=element("div","usr-dt-banner-buttons");
                            const copy=button("▣  Create New Request from This Request",
                                "usr-dt-action usr-dt-primary",()=>rt.createFromThis());
                            const archive=button("Archive","usr-dt-action",()=>rt.archive());
                            if(ARCHIVE_BOOLEAN_FIELDS.some(f=>truthyBoolean(rt.record?.[f])) ||
                                !!rt.record?.UsrArchivedOn){
                                archive.disabled=true;archive.textContent="Archived";
                            }else archive.disabled=rt.busyAction;
                            append(buttons,copy,archive);main.appendChild(buttons);
                        }else{
                            const buttons=element("div","usr-dt-banner-buttons");
                            const edit=button("✎  Edit Request","usr-dt-action usr-dt-primary",
                                ()=>rt.openWizard(true));
                            const validate=button("Run Validation","usr-dt-action",()=>rt.validateForResubmit());
                            const resubmit=button("Resubmit","usr-dt-action",()=>rt.resubmit());
                            for(const b of [edit,validate,resubmit])b.disabled=rt.busyAction;
                            append(buttons,edit,validate,resubmit);main.appendChild(buttons);
                            if(rt.validation){const passed=!rt.validation.errors.length;
                                const result=element("div","usr-dt-validation "+(passed?"ok":"bad"),
                                    passed?"Basic validation passed — server-side checks still apply":
                                        "Basic validation: "+rt.validation.errors.join("; "));
                                main.appendChild(result);
                            }
                        }
                    }
                    append(banner,icon,main);
                    if(kind==="correction"){
                        const due=stageDeadline(rt.record,kind);
                        if(due)banner.appendChild(element("span","usr-dt-deadline",
                            "Deadline: "+date(due)));
                    }
                    return banner;
                };
                rt.updateSLA=()=>{
                    const el=rt.actions.sla;if(!el)return;
                    const kind=statusKind(rt.record?.UsrStatus);
                    const due=stageDeadline(rt.record,kind);
                    // Completed and Rejected requests have ended their live SLA.
                    el.hidden=!due || !["provisioning","correction","review","submitted"].includes(kind);
                    if(el.hidden)return;
                    const hrs=Math.ceil((new Date(due).getTime()-Date.now())/3600000);
                    const tone=hrs<=0?"late":hrs<=24?"soon":"ok";
                    el.dataset.tone=tone;
                    const label=hrs<0?Math.abs(hrs)+"h overdue":hrs===0?"Due now":hrs+"h left";
                    const text=el.querySelector(".usr-dt-sla-text");if(text)text.textContent=label;
                    el.title="Saved stage/SLA deadline: "+date(due,true);
                };
                rt.pointTotal=()=>rt.parts.items==="ready" ?
                    rt.items.reduce((sum,item)=>sum+(number(item.UsrTotalPointsSnapshot) ??
                        number(item.UsrEstimatedPoints) ?? 0),0) : null;
                rt.renderOverview=()=>{
                    const data=rt.record||{};
                    const grid=element("div","usr-dt-overview");
                    const info=makeCard("Request Information","usr-dt-info-body");
                    const infoBody=info.lastChild;
                    const pointValue=rt.pointTotal();
                    const fields=[
                        ["Request Type",display(data.UsrRequestType)],
                        ["Authority",display(data.UsrAccount)],
                        ["Project",display(data.UsrProject)],
                        ["Contract",display(data.UsrContract)],
                        ["Created",date(data.CreatedOn)],
                        ["Submitted",rt.submittedAt ?
                            ((rt.submissionSource==="process" || rt.submissionSource==="approval")?"≈ ":"")+
                            date(rt.submittedAt,true) : "—"],
                        ["Estimated Points",pointValue===null ?
                            (rt.parts.items==="error"?"Unavailable":"Loading…") :
                            num(pointValue)+" pts"]
                    ];
                    fields.forEach(([key,val])=>infoBody.appendChild(infoLine(key,val)));
                    const justification=makeCard("Business Justification","usr-dt-justification");
                    justification.lastChild.textContent=show(data.UsrBusinessJustification);
                    append(grid,info,justification);return grid;
                };
                rt.renderVM=()=>{
                    if(rt.parts.items==="loading")return element("div","usr-dt-loading","Loading VM Items from Creatio…");
                    if(rt.parts.items==="error")return errorBox("Cannot read saved VM Items: "+rt.errors.items);
                    if(!rt.items.length)return empty("No VM items","No VM items have been added to this request.","▤");
                    const card=element("div","usr-dt-table-card");
                    const scroll=element("div","usr-dt-table-scroll");
                    const table=element("table","usr-dt-table");
                    const thead=element("thead"),hr=element("tr");
                    const columns=["#","Purpose","Env","OS","vCPU","RAM","Storage",
                        "Qty","Est. Pts","Request Status","VM Status","VM ID"];
                    columns.forEach(c=>hr.appendChild(element("th","",c)));
                    thead.appendChild(hr);
                    const tbody=element("tbody");
                    const sorted=[...rt.items].sort((a,b)=>
                        (number(a.UsrDisplayOrder)??999999)-(number(b.UsrDisplayOrder)??999999));
                    sorted.forEach((v,i)=>{
                        const tr=element("tr");
                        const pts=number(v.UsrTotalPointsSnapshot) ?? number(v.UsrEstimatedPoints);
                        const matching=rt.inventoryByItem.get(idOf(v.Id).toLowerCase())||[];
                        const inventoryStatus=matching.map(vm=>display(vm.UsrStatus)).filter(Boolean);
                        // Provisioning is the request-item workflow state.  The
                        // actual VM lifecycle state belongs to Virtual Machine.
                        // Prefer a readable linked inventory status (e.g. Active),
                        // otherwise retain the item's Provisioned/Failed status.
                        // Do not infer Active from a successful workflow alone.
                        const itemProvisioningStatus=display(v[ITEM_PROVISION_STATUS]);
                        const vmStatus=inventoryStatus.length ?
                            [...new Set(inventoryStatus)].join(", ") : (itemProvisioningStatus || "—");
                        const inventoryIds=[...new Set(matching.flatMap(vm=>INVENTORY_VM_ID_FIELDS
                            .map(field=>str(vm[field]))).filter(Boolean))];
                        const itemIds=ITEM_VM_ID_FIELDS.map(field=>str(v[field])).filter(Boolean);
                        const vmId=[...new Set([...inventoryIds,...itemIds])].join(", ") || "Not yet provisioned";
                        const configuredQty=ITEM_QUANTITY_FIELDS.map(k=>number(v[k]))
                            .find(n=>n!==null && Number.isInteger(n) && n>0);
                        // Existing wizard creates one record for one VM and one child
                        // process provisions that item. This is a semantic default,
                        // not the number of Service Points in UsrEstimatedPoints.
                        const qty=configuredQty??(matching.length>1?matching.length:1);
                        const cells=[String(i+1),display(v.UsrPurpose)||str(v.UsrName)||"—",
                            display(v.UsrEnvironment)||"—",display(v.UsrOperatingSystem)||"—",
                            num(v.UsrCPU),number(v.UsrRAMGB)===null?"—":num(v.UsrRAMGB)+" GB",
                            number(v.UsrStorageGB)===null?"—":num(v.UsrStorageGB)+" GB",
                            String(qty),pts===null?"—":num(pts),display(rt.record?.UsrStatus)||"—",vmStatus,vmId];
                        cells.forEach((val,j)=>{
                            const cls=j===1?"usr-dt-cell-strong":j===8?"usr-dt-cell-points":"";
                            const td=element("td",cls);
                            if(j===9){
                                const p=element("span","usr-dt-pill",val);
                                p.dataset.status=lower(rt.record?.UsrStatus);td.appendChild(p);
                            }else if(j===2 && lower(v.UsrEnvironment)==="production"){
                                td.appendChild(element("span","usr-dt-production",val));
                            }else if(j===10 && val!=="—"){
                                const p=element("span","usr-dt-pill",val);
                                p.dataset.status=/^(active|provisioned)$/i.test(val) ? "completed" :
                                    /^(failed|rejected)$/i.test(val) ? "rejected" : "";
                                td.appendChild(p);
                            }else if(j===11){
                                const idText=element("span","",val);
                                idText.style.color=val==="Not yet provisioned" ? "#94a0b3" : "#6924b9";
                                if(val!=="Not yet provisioned")idText.style.fontWeight="600";
                                td.appendChild(idText);
                            }else td.textContent=val;
                            tr.appendChild(td);
                        });
                        tbody.appendChild(tr);
                    });
                    append(table,thead,tbody);scroll.appendChild(table);card.appendChild(scroll);
                    const note=element("div","usr-dt-table-note",
                        rt.parts.inventory==="loading" ? "Loading linked VM Inventory records…" :
                        rt.parts.inventory==="unavailable" ?
                        "VM Inventory is inaccessible for this user. VM ID is not guessed; check object permissions." :
                        "VM Status prefers the real linked Virtual Machine lifecycle status (e.g. Active), " +
                        "and falls back to the VM Request Item provisioning status (e.g. Provisioned). " +
                        "VM ID is read from the linked Virtual Machine Infrastructure VM ID. " +
                        "Qty defaults to 1 VM per saved item unless a dedicated quantity field or multiple linked inventory VMs exists.");
                    card.appendChild(note);return card;
                };
                rt.workflowMilestones=()=>{
                    const map=new Map();
                    const use=(stage,entry,preferOutcome=false)=>{
                        if(!entry)return;
                        const existing=map.get(stage);
                        if(!existing){map.set(stage,{...entry});return;}
                        map.set(stage,{
                            ...existing,
                            started:earliestDate([existing.started,entry.started]),
                            completed:latestDate([existing.completed,entry.completed]),
                            actor:(preferOutcome && entry.actor) || existing.actor || entry.actor,
                            outcome:(preferOutcome && entry.outcome) || existing.outcome || entry.outcome,
                            verified:existing.verified || entry.verified,
                            approximate:existing.approximate && entry.approximate,
                            inferred:existing.inferred && entry.inferred
                        });
                    };
                    const rec=rt.record||{};
                    if(rec.CreatedOn)use("Request Created",{started:rec.CreatedOn,
                        completed:rec.CreatedOn,actor:display(rec.CreatedBy),outcome:"Created",verified:true});
                    if(rt.submittedAt){
                        const approx=["process","approval"].includes(rt.submissionSource);
                        use("Submitted",{started:rt.submittedAt,
                            completed:approx?null:rt.submittedAt,
                            approximate:approx,verified:!approx,
                            outcome:rt.submissionSource==="process" ?
                                "Submission process started (not exact Submit click)" :
                                rt.submissionSource==="approval" ?
                                "Review approval created (Submit time unavailable)" :
                                "Submitted for review"});
                    }
                    for(const event of rt.statusHistory){
                        const name=lower(event.UsrNewStatus);
                        const at=event.UsrChangedOn;
                        if(!at)continue;
                        if(name==="submitted"){
                            // The saved status transition is more precise than a
                            // nearby process/approval creation timestamp.
                            if(map.get("Submitted")?.approximate)map.delete("Submitted");
                            use("Submitted",{started:at,completed:at,
                                actor:display(event.UsrChangedBy),outcome:"Submitted for review",verified:true},true);
                        }
                        // A request becoming 'Under TE Review' does NOT itself
                        // prove a validation element completed at that time.
                        if(name==="provisioning in progress" || name==="pending provisioning")use("Manual Provisioning",{
                            started:at,outcome:"Provisioning started",verified:true});
                        if(name==="completed")use("Completion",{started:at,completed:at,
                            outcome:"Request fulfilled",verified:true},true);
                    }
                    // Optional exact fields written by a customer process, if installed.
                    for(const [field,stage,edge] of [
                        ["UsrValidationCompletedOn","Automatic Validation","completed"],
                        ["UsrFinancialReviewStartedOn","TE Financial Review","started"],
                        ["UsrFinancialApprovedOn","TE Financial Review","completed"],
                        ["UsrTechnicalReviewStartedOn","TE Technical Review","started"],
                        ["UsrTechnicalApprovedOn","TE Technical Review","completed"],
                        ["UsrProvisioningStartedOn","Manual Provisioning","started"],
                        ["UsrProvisioningCompletedOn","Manual Provisioning","completed"],
                        ["UsrCompletedOn","Completion","completed"]
                    ]){if(rec[field])use(stage,{[edge]:rec[field],verified:true});}
                    // Only elements belonging to process instances actually linked
                    // to THIS request via SysProcessEntity are considered.
                    const stageFor=caption=>{
                        const c=str(caption).toLowerCase();
                        if(/financial approval|financial review|finance review/.test(c))return "TE Financial Review";
                        if(/technical approval|technical review/.test(c))return "TE Technical Review";
                        if(/validate request status|validate request|automatic validation|request validation/.test(c))return "Automatic Validation";
                        if(/manual vm provisioning|record provisioning outcome|record provisioning success|mark vm item provisioned|set provisioning success|provision one vm item|count provisioned items/.test(c))return "Manual Provisioning";
                        if(/mark request completed|complete vm request|request completion/.test(c))return "Completion";
                        return null;
                    };
                    // Process-level timestamps cover nested provisioning processes
                    // even where their individual elements are not accessible.
                    for(const proc of rt.processes){
                        if(/manual provisioning|provision one vm item/i.test(proc.name)){
                            use("Manual Provisioning",{started:proc.started,completed:proc.completed,
                                outcome:proc.completed?"Provisioning process completed":"Provisioning process started",
                                verified:true});
                        }
                    }
                    for(const log of rt.processElements){
                        const stage=stageFor(display(log.Caption));
                        if(!stage || (!log.StartDate && !log.CompleteDate))continue;
                        use(stage,{started:log.StartDate,completed:log.CompleteDate,
                            actor:display(log.Owner)||str(log.OwnerName),verified:true,
                            outcome:log.CompleteDate ? "Process step completed" : "Process step started"});
                    }
                    // If a BPMN element does not persist its own completion date,
                    // use the start of the NEXT step as a dated *handoff boundary*.
                    // This is NOT the exact Submit-click / validation completion time.
                    // Scope each boundary to its explicitly linked Submission instance;
                    // do not mix steps from different process runs or VM Item children.
                    const submissions=rt.processes.filter(proc=>
                        /\bvm request submission\b|\bsubmit vm request\b/i.test(proc.name));
                    const validAt=value=>value&&Number.isFinite(new Date(value).getTime());
                    const atOrAfter=(candidate,start)=>validAt(candidate) &&
                        (!validAt(start) || new Date(candidate)>=new Date(start));
                    for(const proc of submissions){
                        const steps=rt.processElements.filter(step=>
                            idOf(step.processId).toLowerCase()===idOf(proc.id).toLowerCase());
                        const validation=steps.filter(step=>
                            /validate request status|automatic validation|request validation/i
                                .test(display(step.Caption)));
                        const nextStep=steps.filter(step=>
                            /^(modify request|set request under review)$/i
                                .test(display(step.Caption).trim()));
                        const validationStart=earliestDate(validation.map(step=>step.StartDate));
                        const validationEnd=earliestDate(validation.map(step=>step.CompleteDate));
                        const nextStart=earliestDate(nextStep.map(step=>step.StartDate)
                            .filter(when=>atOrAfter(when,validationStart)));
                        // The review/validation process started AFTER the request
                        // had been submitted. Its validation element beginning is
                        // the closest recorded proof of the submit-to-review handoff.
                        const submitted=map.get("Submitted");
                        if(submitted && !submitted.completed && validationStart &&
                                atOrAfter(validationStart,proc.started) &&
                                atOrAfter(validationStart,submitted.started)){
                            map.set("Submitted",{...submitted,
                                completed:validationStart,completedApproximate:true,
                                verified:true,
                                outcome:"Handed to validation (time inferred from process step)"});
                        }
                        // When Creatio has no CompleteDate on Validate Request Status,
                        // Modify Request starting proves that validation moved on.
                        // Exact validation completion, if present, always wins.
                        const current=map.get("Automatic Validation");
                        if(current && !current.completed && validationStart &&
                                !validationEnd && nextStart &&
                                atOrAfter(nextStart,validationStart)){
                            map.set("Automatic Validation",{...current,
                                completed:nextStart,completedApproximate:true,
                                verified:true,
                                outcome:"Validation advanced to next step (time approximate)"});
                        }
                    }
                    // SysApproval's Purpose is frequently the generic "Record"
                    // (as seen in the MCIT Audit tab). Infer the *approval type*
                    // from the exact approval's assigned reviewer/role, not from
                    // its generic caption or from a request's Completed status.
                    // Approval timestamps are the same persisted records as Audit.
                    for(const a of rt.approvals){
                        const desc=[a.Purpose,a.Subject,a.Name,a.Caption,a.Description,
                            a.ApprovalPurpose,a.ApprovalStage].map(display).join(" ");
                        const reviewer=[a.Role,a.Approver,a.Owner,a.VisaOwner].map(display).join(" ");
                        const hints=(desc+" "+reviewer).toLowerCase();
                        const stage=/financ|finance/.test(hints) ? "TE Financial Review" :
                            /techn|engineering/.test(hints) ? "TE Technical Review" : null;
                        if(!stage)continue; // Never guess which approval was which.
                        const state=display(a.VisaStatus||a.Result||a.ApprovalStatus||a.Status||a.StatusName);
                        const accepted=/approv|positive/i.test(state);
                        const rejected=/reject|negative|denied/i.test(state);
                        // ModifiedOn may represent an unrelated edit, so only use
                        // the actual approval decision date already shown by Audit.
                        const decisionAt=(accepted||rejected) ?
                            (a.SetOn||a.SetDate||a.ApprovalDate) : null;
                        const actor=display(a.Approver||a.Owner||a.VisaOwner||a.Role||a.CreatedBy);
                        use(stage,{started:a.CreatedOn,completed:decisionAt,actor,
                            outcome:accepted?"Approved":rejected?"Rejected":state||"Awaiting decision",
                            verified:!!(accepted||rejected)},true);
                    }
                    // Item-level creation and provisioning timestamps are real
                    // when present, but are not substituted for process-start time.
                    const provisioned=rt.items.map(i=>i.UsrProvisionedOn).filter(Boolean);
                    const failed=rt.items.map(i=>i.UsrProvisioningFailedOn).filter(Boolean);
                    if(provisioned.length)use("Manual Provisioning",{completed:latestDate(provisioned),
                        verified:true,outcome:"VM item provisioning recorded"});
                    if(failed.length && !provisioned.length)use("Manual Provisioning",{
                        completed:latestDate(failed),outcome:"VM item provisioning failed",verified:true},true);
                    const allItemsProvisioned=rt.parts.items==="ready" && rt.items.length>0 &&
                        rt.items.every(item=>lower(item[ITEM_PROVISION_STATUS])==="provisioned");
                    if(allItemsProvisioned)use("Manual Provisioning",{
                        outcome:"All saved VM items are Provisioned",verified:true},true);
                    if(lower(rec.UsrStatus)==="completed" && !map.has("Completion")){
                        use("Completion",{outcome:"Completed (timestamp not recorded)",verified:true});
                    }
                    // Preserve the completed-path visual treatment requested in
                    // Figma, but annotate each unlogged milestone as INFERRED.
                    // Never synthesize a date or individual approval decision.
                    if(lower(rec.UsrStatus)==="completed"){
                        for(const stage of STAGES){
                            const prior=map.get(stage);
                            if(!prior || (!prior.completed && !prior.verified && stage!=="Completion" &&
                                   !/reject|fail/i.test(prior.outcome||""))){
                                map.set(stage,{...prior,inferred:true,verified:true,
                                    // Preserve actual approximate submission
                                    // evidence instead of erasing its source.
                                    outcome:prior?.outcome ||
                                        "Stage inferred from Completed status — event timestamp unavailable"});
                            }
                        }
                    }
                    return map;
                };
                rt.renderWorkflow=()=>{
                    const wrap=element("div");
                    const card=element("section","usr-dt-card usr-dt-workflow");
                    const title=element("h3","usr-dt-section-title","Workflow History");
                    title.appendChild(element("span","usr-dt-work-status",
                        "Current request status: "+show(display(rt.record?.UsrStatus))));
                    card.appendChild(title);
                    const milestones=rt.workflowMilestones();
                    const timeline=element("div","usr-dt-timeline");
                    STAGES.forEach(stage=>{
                        const info=milestones.get(stage);
                        const done=!!(info?.completed || info?.verified || (stage==="Completion" &&
                            lower(rt.record?.UsrStatus)==="completed"));
                        const active=!done && !!info;
                        const step=element("div","usr-dt-step"+(done?" is-done":""));
                        const dot=element("div","usr-dt-step-dot",done?"✓":"");
                        const main=element("div","usr-dt-step-main");
                        const header=element("div","usr-dt-step-header");
                        const section=element("div");
                        section.appendChild(element("div","usr-dt-step-name",stage));
                        if(info?.actor)section.appendChild(element("div","usr-dt-step-actor",info.actor));
                        const dates=element("div","usr-dt-step-dates");
                        dates.appendChild(element("div","", "Started: "+
                            (info?.started?(info.approximate?"≈ ":"")+date(info.started,true):"—")));
                        dates.appendChild(element("div","", "Completed: "+
                            (info?.completed?(info.completedApproximate?"≈ ":"")+date(info.completed,true):"—")));
                        append(header,section,dates);main.appendChild(header);
                        if(info?.outcome){
                            const box=element("div","usr-dt-outcome","Outcome: "+info.outcome);
                            if(/reject|failed/i.test(info.outcome)){
                                box.style.background="#fff0ef";box.style.borderColor="#efb7b7";
                                box.style.color="#aa2732";
                            }else if(!done){
                                box.style.background="#f8f7fc";box.style.borderColor="#ebe4f4";
                                box.style.color="#6a5d80";
                            }
                            main.appendChild(box);
                        }else if(active)main.appendChild(element("div","usr-dt-step-actor","In progress"));
                        append(step,dot,main);timeline.appendChild(step);
                    });
                    card.appendChild(timeline);
                    // No diagnostic/technical description beneath the timeline.
                    // Missing process-log timestamps remain blank, not fabricated.
                    wrap.appendChild(card);
                    return wrap;
                };
                rt.renderDocs=()=>{
                    if(rt.parts.files==="loading")return element("div","usr-dt-loading","Loading documents from Creatio…");
                    if(rt.parts.files==="error")return errorBox("Cannot load documents from SysFile: "+rt.errors.files);
                    if(!rt.files.length)return empty("No documents",
                        "No supporting documents have been uploaded for this request.","♧");
                    const card=element("div","usr-dt-table-card");
                    const scroll=element("div","usr-dt-table-scroll");
                    const table=element("table","usr-dt-table");table.style.minWidth="600px";
                    const header=element("tr");
                    ["Document","Size","Uploaded","Uploaded by","Action"].forEach(t=>header.appendChild(element("th","",t)));
                    const thead=element("thead");thead.appendChild(header);
                    const tbody=element("tbody");
                    rt.files.forEach(file=>{
                        const row=element("tr");
                        [show(file.Name),fileSize(file.Size),date(file.CreatedOn,true),
                            show(display(file.CreatedBy))].forEach(t=>row.appendChild(element("td","",t)));
                        const cell=element("td");
                        if(isGuid(file.Id)){
                            const link=element("a","usr-dt-doc-link","↓  Download");
                            link.href=fileUrl(idOf(file.Id));link.target="_blank";
                            link.rel="noopener noreferrer";
                            link.setAttribute("download",str(file.Name)||"document");
                            cell.appendChild(link);
                        }else cell.textContent="—";
                        row.appendChild(cell);tbody.appendChild(row);
                    });
                    append(table,thead,tbody);scroll.appendChild(table);card.appendChild(scroll);
                    return card;
                };
                rt.renderAudit=()=>{
                    const wrap=element("div");
                    const events=[];
                    const seen=new Set();
                    const push=(when,title,actor,source)=>{
                        if(!when || !Number.isFinite(new Date(when).getTime()))return;
                        const key=[new Date(when).toISOString(),title,source].join("|");
                        if(seen.has(key))return;
                        seen.add(key);
                        events.push({date:when,title,by:actor||"Creatio",source});
                    };
                    const rec=rt.record||{};
                    push(rec.CreatedOn,"Request created",display(rec.CreatedBy),"VM Request");
                    if(rec.ModifiedOn && (!rec.CreatedOn ||
                        Math.abs(new Date(rec.ModifiedOn)-new Date(rec.CreatedOn))>1000))
                        push(rec.ModifiedOn,"Request last modified",display(rec.ModifiedBy),"VM Request");
                    if(rt.submittedAt){
                        const label=rt.submissionSource==="process" ?
                            "Submission process started (not the Submit-click time)" :
                            rt.submissionSource==="approval" ?
                            "Review approval record created (Submit time unavailable)" :
                            "Request submitted for TE review";
                        push(rt.submittedAt,label,display(rec.CreatedBy),
                            ["process","approval"].includes(rt.submissionSource)?"Approximate submission evidence":"Saved submission timestamp");
                    }
                    for(const evt of rt.statusHistory){
                        const state=display(evt.UsrNewStatus);
                        push(evt.UsrChangedOn,"Request status updated to "+show(state),
                            display(evt.UsrChangedBy),"Status history");
                    }
                    for(const approval of rt.approvals){
                        const purpose=[approval.Purpose,approval.Subject,approval.Name,approval.Caption,
                            approval.ApprovalPurpose,approval.ApprovalStage].map(display).filter(Boolean)[0]||"Record";
                        const who=display(approval.Approver||approval.Owner||approval.VisaOwner||approval.CreatedBy);
                        push(approval.CreatedOn,"Approval requested: "+purpose,who,"Approval");
                        const status=display(approval.VisaStatus||approval.Result||approval.ApprovalStatus||
                            approval.Status||approval.StatusName);
                        const decided=/approv|positive|reject|negative|denied/i.test(status);
                        const at=approval.SetOn||approval.SetDate||approval.ApprovalDate;
                        if(decided)push(at,"Approval decision: "+purpose+" — "+status,who,"Approval decision");
                    }
                    for(const log of rt.processElements){
                        const name=display(log.Caption)||"Business process step";
                        const actor=display(log.Owner)||str(log.OwnerName)||"Creatio process";
                        push(log.StartDate,"Process step started: "+name,actor,"Process step");
                        push(log.CompleteDate,"Process step completed: "+name,actor,"Process step");
                    }
                    for(const proc of rt.processes){
                        push(proc.started,"Process started: "+show(proc.name),"Creatio process","Process log");
                        push(proc.completed,"Process completed: "+show(proc.name),"Creatio process","Process log");
                    }
                    for(const item of rt.items){
                        const name=display(item.UsrPurpose)||display(item.UsrName)||"VM item";
                        push(item.UsrProvisionedOn,"VM item provisioned: "+name,"Actor not recorded","VM Request Item");
                        push(item.UsrProvisioningFailedOn,"VM item provisioning failed: "+name,
                            "Actor not recorded","VM Request Item");
                    }
                    for(const [itemId,vms] of rt.inventoryByItem){
                        for(const vm of vms){
                            const identifier=INVENTORY_VM_ID_FIELDS.map(k=>str(vm[k])).find(Boolean);
                            push(vm.CreatedOn,"Virtual Machine inventory record created"+
                                (identifier?": "+identifier:""),display(vm.CreatedBy),"VM Inventory");
                        }
                    }
                    if(rt.parts.files==="ready")rt.files.forEach(file=>{
                        push(file.CreatedOn,"Document uploaded: "+show(file.Name),
                            display(file.CreatedBy),"Document");
                    });
                    events.sort((a,b)=>new Date(b.date)-new Date(a.date));
                    if(!events.length)wrap.appendChild(empty("No activity available",
                        "No stored activity timestamps were accessible for this request.","◷"));
                    for(const evt of events){
                        const card=element("div","usr-dt-event");
                        const right=element("div");append(right,
                            element("div","usr-dt-event-text",evt.title),
                            element("div","usr-dt-event-meta",evt.by+" · "+date(evt.date,true)+" · "+evt.source));
                        append(card,element("div","usr-dt-event-dot"),right);
                        wrap.appendChild(card);
                    }
                    const controls=element("div","usr-dt-changelog-wrap");
                    const action=button("View Creatio Change Log","usr-dt-action",async()=>{
                        if(!isGuid(rt.id))return;
                        try{
                            await ctx.executeRequest({type:"crt.OpenChangeLogRequest",
                                $context:ctx,entitySchemaName:HEADER_SCHEMA,
                                recordId:rt.id});
                        }catch(e){console.warn("Cannot open Change Log",e);
                            rt.notify("Change Log is unavailable. Enable logging for UsrVMRequest and grant CanViewChangeLog permissions.");}
                    });
                    append(controls,action,element("span","usr-dt-hint",
                        "Only persisted Creatio events are listed. Process and approval details need read permissions; field-by-field history needs Change Log."));
                    wrap.appendChild(controls);
                    return wrap;
                };
                rt.paint=()=>{
                    if(rt.disposed||!rt.live?.isConnected)return;
                    const data=rt.record||{};
                    const update=(field,text)=>{
                        const el=rt.live.querySelector('[data-field="'+field+'"]');
                        if(el)el.textContent=show(text);
                    };
                    update("number",data.UsrNumber||"New Request");
                    update("title",data.UsrName||"Loading request…");
                    update("status",display(data.UsrStatus));
                    const statusEl=rt.live.querySelector('[data-field="status"]');
                    if(statusEl)statusEl.dataset.status=lower(data.UsrStatus);
                    update("type",display(data.UsrRequestType));
                    update("authority",display(data.UsrAccount));
                    update("project",display(data.UsrProject));
                    update("stage",statusStage(data.UsrStatus,rt));
                    const kind=statusKind(data.UsrStatus);
                    const edit=rt.actions.edit;
                    if(edit)edit.hidden=!rt.record || !canEdit(data.UsrStatus);
                    const create=rt.actions.create;
                    if(create)create.hidden=!rt.record || kind!=="rejected";
                    const archive=rt.actions.archive;
                    if(archive){archive.hidden=!rt.record || kind!=="rejected";
                        archive.disabled=rt.busyAction || ARCHIVE_BOOLEAN_FIELDS.some(
                            f=>truthyBoolean(data[f])) || !!data.UsrArchivedOn;
                        archive.textContent=(ARCHIVE_BOOLEAN_FIELDS.some(f=>truthyBoolean(data[f])) || !!data.UsrArchivedOn)?
                            "Archived":"Archive";
                    }
                    rt.updateSLA();
                    const bannerArea=rt.live.querySelector('[data-region="status-banner"]');
                    if(bannerArea){bannerArea.replaceChildren();
                        const banner=rt.renderStatusBanner();if(banner)bannerArea.appendChild(banner);
                    }
                    for(const tab of rt.live.querySelectorAll(".usr-dt-tab")){
                        const active=tab.dataset.tab===rt.tab;
                        tab.setAttribute("aria-selected",String(active));tab.tabIndex=active?0:-1;
                    }
                    const c1=rt.live.querySelector('[data-count="VM Items"]');
                    if(c1)c1.textContent=rt.parts.items==="ready"?String(rt.items.length):
                        rt.parts.items==="error"?"!":"…";
                    const c2=rt.live.querySelector('[data-count="Documents"]');
                    if(c2)c2.textContent=rt.parts.files==="ready"?String(rt.files.length):
                        rt.parts.files==="error"?"!":"…";
                    const body=rt.live.querySelector('[data-region="body"]');
                    if(!body)return;
                    body.replaceChildren();
                    if(rt.loading){body.appendChild(element("div","usr-dt-loading","Loading request details from Creatio…"));return;}
                    if(rt.errors.header){body.appendChild(errorBox(rt.errors.header));return;}
                    if(!rt.record){body.appendChild(errorBox("Request not found or access denied. Check the selected record ID and object permissions."));return;}
                    const renderers={"Overview":rt.renderOverview,"VM Items":rt.renderVM,
                        "Workflow":rt.renderWorkflow,"Documents":rt.renderDocs,
                        "Activity & Audit":rt.renderAudit};
                    body.appendChild(renderers[rt.tab]());
                };
                rt.loadRelated=async(token)=>{
                    const stillCurrent=()=>!rt.disposed && token===rt.generation;
                    // Independent data sources: a SysFile permission error must not blank Overview/VM Items.
                    await Promise.all([
                        (async()=>{
                            try{
                                let rows;
                                try{rows=await loadRows(ITEM_SCHEMA,[...ITEM_FIELDS,ITEM_PROVISION_STATUS],[["UsrRequest",rt.id]],300);}
                                catch(_optionalMissing){rows=await loadRows(ITEM_SCHEMA,ITEM_FIELDS,[["UsrRequest",rt.id]],300);}
                                if(!stillCurrent())return;
                                // Probe optional columns once per request, not N times
                                // per item. A missing column must not break the table.
                                const byItem=new Map(rows.map(item=>[idOf(item.Id).toLowerCase(),item]));
                                for(const field of [...ITEM_QUANTITY_FIELDS,...ITEM_VM_ID_FIELDS,...ITEM_MILESTONE_DATES]){
                                    try{
                                        const optional=await loadRows(ITEM_SCHEMA,["Id",field],[["UsrRequest",rt.id]],300);
                                        for(const opt of optional){const item=byItem.get(idOf(opt.Id).toLowerCase());
                                            if(item)item[field]=opt[field];}
                                    }catch(_fieldMissing){/* This deployment does not contain this column. */}
                                }
                                if(!stillCurrent())return;
                                rt.items=rows;rt.parts.items="ready";
                                // A VM Inventory record is related through Original Request Item.
                                // Query only the saved items belonging to this request, no global scans.
                                let inventoryErrors=0;
                                for(const item of rows.slice(0,100)){
                                    try {
                                        const vm=await loadInventoryForItem(idOf(item.Id));
                                        if(!stillCurrent())return;
                                        rt.inventoryByItem.set(idOf(item.Id).toLowerCase(),vm);
                                    }catch(err){inventoryErrors++;
                                        console.info("Linked Virtual Machine details unavailable",err?.message||err);}
                                }
                                rt.parts.inventory=inventoryErrors ? "unavailable" : "ready";
                            }catch(e){if(!stillCurrent())return;
                                console.error("Request Detail VM Items read failed",e);
                                rt.parts.items="error";rt.parts.inventory="unavailable";rt.errors.items=e?.message||String(e);}
                            rt.paint();
                        })(),
                        (async()=>{
                            try{
                                const rows=await loadRows(FILE_SCHEMA,FILE_FIELDS,
                                    [["RecordId",rt.id],["RecordSchemaName",HEADER_SCHEMA]],300);
                                if(!stillCurrent())return;
                                rt.files=rows.filter(f=>isGuid(f.Id));rt.parts.files="ready";
                            }catch(e){if(!stillCurrent())return;
                                console.error("Request Detail SysFile read failed",e);
                                rt.parts.files="error";rt.errors.files=e?.message||String(e);}
                            rt.paint();
                        })(),
                        (async()=>{
                            try{
                                let rows=[];
                                try{rows=await loadRows("UsrRequestStatusHistory",
                                    ["Id","UsrRequest","UsrNewStatus","UsrChangedOn","UsrChangedBy"],
                                    [["UsrRequest",rt.id]],200);}
                                catch(_optionalActor){rows=await loadRows("UsrRequestStatusHistory",
                                    ["Id","UsrRequest","UsrNewStatus","UsrChangedOn"],
                                    [["UsrRequest",rt.id]],200);}
                                if(!stillCurrent())return;
                                const indexed=new Map(rows.map(r=>[idOf(r.Id).toLowerCase(),r]));
                                for(const optional of ["UsrComments","UsrReason"]){
                                    try{const extras=await loadRows("UsrRequestStatusHistory",
                                        ["Id",optional],[["UsrRequest",rt.id]],200);
                                        for(const extra of extras){const row=indexed.get(idOf(extra.Id).toLowerCase());
                                            if(row)row[optional]=extra[optional];}
                                    }catch(_noColumn){}
                                }
                                if(!stillCurrent())return;
                                rt.statusHistory=rows;
                                if(!rt.submittedAt || ["process","approval"].includes(rt.submissionSource)){
                                    const submitted=rows.filter(e=>lower(e.UsrNewStatus)==="submitted")
                                        .map(e=>e.UsrChangedOn);
                                    const at=earliestDate(submitted);
                                    if(at){rt.submittedAt=at;rt.submissionSource="history";}
                                }
                                rt.parts.workflow="ready";
                            }catch(err){
                                if(!stillCurrent())return;
                                rt.parts.workflow="unavailable";
                                console.info("Request status event history unavailable",err?.message||err);
                            }
                            rt.paint();
                        })(),
                        (async()=>{
                            try{
                                const rows=await loadOptionalRows("SysApproval","EntityId",rt.id,
                                    ["Purpose","Subject","Name","Caption","Description","Status",
                                     "ApprovalStatus","VisaStatus","Result","Approver","Owner","VisaOwner",
                                     "CreatedBy","SetOn","SetDate","ModifiedOn","ReferenceSchemaName",
                                     "StatusName","ApprovalPurpose","ApprovalStage","ApprovalDate","Comment","Role"],180);
                                if(!stillCurrent())return;
                                rt.approvals=rows;
                                if(!rt.submittedAt && rows.length){
                                    const created=earliestDate(rows.map(r=>r.CreatedOn)
                                        .filter(at=>!rt.record?.CreatedOn || new Date(at)>=new Date(rt.record.CreatedOn)));
                                    if(created){rt.submittedAt=created;rt.submissionSource="approval";}
                                }
                            }catch(err){
                                if(!stillCurrent())return;
                                console.info("Native SysApproval data unavailable",err?.message||err);
                            }
                            rt.paint();
                        })(),
                        (async()=>{
                            try{
                                // Resolve only explicit links, first for this request,
                                // then for its own VM items (child processes can link to
                                // VM Request Item instead of the VM Request header).
                                const ids = new Set(await readLinkedProcessIds(rt.id));
                                let itemsToCheck = rt.items.filter(item => isGuid(item.Id));
                                // Item loading is parallel: read the exact IDs directly
                                // when the item task has not completed yet.
                                if (!itemsToCheck.length) {
                                    try {
                                        itemsToCheck = await loadRows(ITEM_SCHEMA, ["Id"],
                                            [["UsrRequest",rt.id]], 60);
                                    } catch (_itemPermission) {}
                                }
                                for (const item of itemsToCheck.slice(0,50)) {
                                    if (!stillCurrent()) return;
                                    try {
                                        for (const pid of await readLinkedProcessIds(idOf(item.Id))) ids.add(pid);
                                    } catch (_itemLinkPermission) {
                                        // A request-level link remains usable.
                                    }
                                }
                                if (!stillCurrent()) return;
                                const linkedIds = [...ids];
                                rt.processLink={status:linkedIds.length?"loading":"unlinked",
                                    linked:linkedIds.length,loaded:0};
                                const logs=[];
                                const seenProcesses=new Set();
                                // Descendant processes inherit their parent process's
                                // exact request linkage. Limit exploration to prevent
                                // a large process tree from blocking the page.
                                const queue=linkedIds.slice(0,45).map(id=>({id,depth:0}));
                                while(queue.length && seenProcesses.size<45){
                                    const next=queue.shift();
                                    const pid=idOf(next.id);
                                    if(!isGuid(pid)||seenProcesses.has(pid.toLowerCase()))continue;
                                    seenProcesses.add(pid.toLowerCase());
                                    try{
                                        const log=await readProcessInstance(pid);
                                        if(log && stillCurrent())logs.push({
                                            id:pid,
                                            name:display(log.Name)||display(log.SysProcessName),
                                            started:log.StartDate,completed:log.CompleteDate,
                                            status:display(log.Status)||display(log.StatusName)});
                                        try {
                                            const elements = await readProcessSteps(pid);
                                            if(stillCurrent())rt.processElements.push(...elements.map(e=>({...e,processId:pid})));
                                        } catch(err) {
                                            console.info("Linked process steps unavailable",pid,err?.message||err);
                                        }
                                        if(next.depth<2){
                                            try{
                                                const children=await loadRows("SysProcessLog",
                                                    ["Id"],[["ParentId",pid]],30);
                                                for(const child of children){
                                                    const childId=idOf(child.Id);
                                                    if(isGuid(childId)&&!seenProcesses.has(childId.toLowerCase()))
                                                        queue.push({id:childId,depth:next.depth+1});
                                                }
                                            }catch(_noParentRead){/* Parent-child log browsing not available. */}
                                        }
                                    }catch(error){console.warn("A linked process log is unavailable",pid,error);}
                                    if(!stillCurrent())return;
                                }
                                if(!stillCurrent())return;
                                rt.processes=logs;rt.parts.processes="ready";
                                rt.processLink={status:!linkedIds.length?"unlinked":logs.length?"ready":"no-readable-logs",
                                    linked:linkedIds.length,loaded:logs.length};
                                if (!linkedIds.length) console.info(
                                    "MCIT workflow: no process linkage readable for request",rt.id);
                                // A process instance with an explicit VM Request link is
                                // stronger submission evidence than the first approval.
                                // Never override a recorded SubmittedOn / status transition.
                                if(!rt.submittedAt || rt.submissionSource==="approval"){

                                    const begins=logs.filter(p=>/vm request submission|submit.*vm request/i.test(p.name))
                                        .map(p=>p.started);
                                    const when=earliestDate(begins);
                                    if(when && (!rt.record?.CreatedOn || new Date(when)>=new Date(rt.record.CreatedOn))){
                                        rt.submittedAt=when;rt.submissionSource="process";
                                    }
                                }
                            }catch(e){
                                if(!stillCurrent())return;
                                // Some requester roles have no process-log permissions.
                                // Treat as unknown, never as a definitive no-process result.
                                rt.parts.processes="unavailable";
                                rt.processLink={status:"unavailable",linked:0,loaded:0};
                                console.info("Linked process history not accessible",e?.message||e);
                            }
                            rt.paint();
                        })()
                    ]);
                };
                rt.load=async(recId)=>{
                    if(rt.disposed || !isGuid(recId))return;
                    const id=idOf(recId).toLowerCase();
                    if(id===rt.id && rt.record)return;
                    rt.generation++;const token=rt.generation;
                    rt.id=id;rt.loading=true;rt.record=null;rt.items=[];rt.files=[];
                    rt.processes=[];rt.processElements=[];rt.inventoryByItem.clear();
                    rt.statusHistory=[];rt.approvals=[];rt.submittedAt=null;rt.submissionSource="";
                    rt.validation=null;
                    rt.processLink={status:"loading",linked:0,loaded:0};
                    rt.errors={};rt.parts={items:"loading",files:"loading",processes:"loading",inventory:"loading",workflow:"loading"};
                    rt.paint();
                    try{
                        const record=await loadRecord(HEADER_SCHEMA,id,HEADER_FIELDS);
                        if(rt.disposed||token!==rt.generation)return;
                        if(record){
                            const optional=await loadOptionalColumns(HEADER_SCHEMA,id,[...SUBMITTED_FIELDS,
                                ...HEADER_MILESTONE_DATES,...STATUS_CONTEXT_FIELDS]);
                            if(!rt.disposed && token===rt.generation){
                                Object.assign(record,optional);
                                const persisted=SUBMITTED_FIELDS.map(k=>record[k]).find(k=>k&&Number.isFinite(new Date(k).getTime()));
                                if(persisted){rt.submittedAt=persisted;rt.submissionSource="field";}
                            }
                        }
                        if(rt.disposed||token!==rt.generation)return;
                        rt.record=record;rt.loading=false;rt.paint();
                        if(record)await rt.loadRelated(token);
                    }catch(e){if(rt.disposed||token!==rt.generation)return;
                        rt.loading=false;rt.errors.header="Unable to load request: "+(e?.message||e);
                        console.error("Request Detail header read failed",e);rt.paint();}
                };
                rt.print=async()=>{
                    if(!rt.record){rt.notify("Load a request before exporting.");return;}
                    // Browser-native Print / Save as PDF, no external CDN or silent files.
                    const existing=document.getElementById("usr-dt-print-report");if(existing)existing.remove();
                    const report=element("article","usr-dt-print-report");report.id="usr-dt-print-report";
                    append(report,element("h1","",show(rt.record.UsrNumber)+" — "+show(rt.record.UsrName)),
                        element("p","","Status: "+show(display(rt.record.UsrStatus))+
                            " · Authority: "+show(display(rt.record.UsrAccount))+
                            " · Project: "+show(display(rt.record.UsrProject))));
                    for(const [title,render] of [["Overview",rt.renderOverview],
                        ["VM Items",rt.renderVM],["Workflow",rt.renderWorkflow],
                        ["Documents",rt.renderDocs],["Activity & Audit",rt.renderAudit]]){
                        const section=element("section","usr-dt-print-section");
                        section.appendChild(element("h2","",title));
                        section.appendChild(render());report.appendChild(section);
                    }
                    document.body.appendChild(report);
                    const remove=()=>{report.remove();window.removeEventListener("afterprint",remove);};
                    window.addEventListener("afterprint",remove,{once:true});
                    try{window.print();rt.timers.push(setTimeout(remove,120000));}
                    catch(e){remove();rt.notify("Browser print is unavailable: "+(e?.message||e));}
                };
                rt.findId=async()=>{
                    try{
                        const value=await ctx.DT_RecordId;
                        if(isGuid(value))return idOf(value);
                    }catch(_ignored){}
                    if(typeof location!=="undefined"){
                        const match=String(location.hash||"").match(
                            /UsrMCITRequestDetail_Page\/(?:edit\/)?([0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12})/i);
                        if(match && isGuid(match[1]))return match[1];
                        const search=String(location.search||"");
                        const qm=search.match(/[?&](?:recordId|id)=([0-9a-f-]{36})/i);
                        if(qm && isGuid(qm[1]))return qm[1];
                    }
                    return "";
                };
                rt.ensureRecord=async()=>{
                    if(rt.disposed)return;
                    const id=await rt.findId();
                    if(isGuid(id) && idOf(id).toLowerCase()!==rt.id)await rt.load(id);
                    else if(!rt.id && rt.live){
                        rt.loading=false;
                        rt.errors.header="No request ID was received. Open the record using View in My Requests.";
                        rt.paint();
                    }
                };
                rt.hashListener=()=>rt.ensureRecord();
                window.addEventListener("hashchange",rt.hashListener);
                rt.mount();
                rt.observer=new MutationObserver(()=>{if(!rt.disposed)rt.mount();});
                rt.observer.observe(document.body,{childList:true,subtree:true});
                await rt.ensureRecord();
                // PDS can initialize after the view model; retry without reload loops.
                for(const ms of [350,1300])rt.timers.push(setTimeout(()=>rt.ensureRecord(),ms));
                return result;
            }},
            {request:"crt.HandleViewModelAttributeChangeRequest",handler:async(request,next)=>{
                if(isPageDesigner()) return next?.handle(request);
                const result=await next?.handle(request);
                if(typeof document!=="undefined" && request.attributeName==="DT_RecordId"){
                    const rt=document.__usrMCITRequestDetailV2;
                    if(rt && !rt.disposed && isGuid(request.value))await rt.load(request.value);
                }
                return result;
            }},
            {request:"crt.HandleViewModelDestroyRequest",handler:async(request,next)=>{
                if(isPageDesigner()) return next?.handle(request);
                if(typeof document!=="undefined")document.__usrMCITRequestDetailV2?.dispose?.();
                return next?.handle(request);
            }}
        ]/**SCHEMA_HANDLERS*/,
        converters: /**SCHEMA_CONVERTERS*/{} /**SCHEMA_CONVERTERS*/,
        validators: /**SCHEMA_VALIDATORS*/{} /**SCHEMA_VALIDATORS*/
    };
});
