/*
 * TE–MCIT | Request Detail — Figma / real-data edition (2026-11-08)
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
 * No demo records, fabricated audit events or schema/database writes.
 * Designer has its own native, editable elements; runtime renders original v1 Figma.
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
    const TABS = ["Overview", "VM Items", "Documents", "Activity & Audit"];
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
        const fmt = {year:"numeric", month:"2-digit", day:"2-digit"};
        if (includeTime) { fmt.hour="2-digit"; fmt.minute="2-digit"; }
        // Format in the user's browser local zone; do not claim an unsupported server TZ.
        return new Intl.DateTimeFormat("en-GB", fmt).format(d);
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
    function fileRoot() {
        const path = location.pathname || "/0/";
        const i = path.indexOf("/0/");
        return i >= 0 ? path.slice(0,i) + "/0/" : "/0/";
    }
    function fileUrl(id) {
        return fileRoot() + "rest/FileService/Download/SysFile/" + encodeURIComponent(id);
    }
    function statusStage(status) {
        const s = lower(status);
        if (s === "draft") return "Request Created";
        if (s === "submitted") return "Submitted";
        if (s === "under te review") return "Under TE Review";
        if (s === "provisioning in progress") return "Manual Provisioning";
        if (s === "completed") return "Completion";
        return "—"; // Do not invent a workflow stage from an unknown status.
    }
    function canEdit(status) {
        return ["draft", "requires correction"].includes(lower(status));
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
        .usr-dt-head-title{font-size:14px;line-height:1.35;font-weight:800;color:#111d35;margin:8px 0 7px;overflow-wrap:anywhere}
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
            .usr-dt-actions{width:100%;justify-content:flex-end}
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
            {"operation":"insert","name":"DT_DesignerTabDocuments","values":{
                "type":"crt.Label","caption":"Documents","labelType":"body"
            },"parentName":"DT_DesignerTabs","propertyName":"items","index":2},
            {"operation":"insert","name":"DT_DesignerTabAudit","values":{
                "type":"crt.Label","caption":"Activity & Audit","labelType":"body"
            },"parentName":"DT_DesignerTabs","propertyName":"items","index":3},
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
                const rt={ctx,id:"",record:null,items:[],files:[],processes:[],
                    tab:"Overview",loading:true,parts:{items:"loading",files:"loading",processes:"loading"},
                    errors:{},disposed:false,live:null,host:null,observer:null,
                    generation:0,timers:[],hiddenNative:new Map(),processMessage:""};
                document.__usrMCITRequestDetailV2=rt;
                if (!document.getElementById("usr-dt-figma-style-v2")) {
                    const style=element("style");style.id="usr-dt-figma-style-v2";
                    style.textContent=CSS;document.head.appendChild(style);
                }

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
                    const edit=button("✎  Edit Request","usr-dt-action usr-dt-primary",async()=>{
                        if(!isGuid(rt.id)||!canEdit(rt.record?.UsrStatus))return;
                        try{
                            await sdk.HandlerChainService.instance.process({
                                type:"crt.OpenPageRequest",schemaName:"UsrMCITNewRequest_WizardPage",
                                modelInitConfigs:[{action:"edit",recordId:rt.id}],$context:ctx,
                                scopes:[...(request.scopes||[])]
                            });
                        }catch(err){console.error("Detail edit navigation failed",err);
                            rt.notify("Unable to open the request wizard. Check its page registration.");}
                    },"Edit this draft or request returned for correction");
                    edit.dataset.field="edit";
                    const pdf=button("⇩  Export PDF","usr-dt-action",()=>rt.print(),
                        "Open browser Print / Save as PDF for the complete request report");
                    append(actions,edit,pdf);append(row,meta,actions);
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
                    const body=element("main","usr-dt-body");body.dataset.region="body";
                    const alert=element("div","usr-dt-feedback");alert.dataset.region="feedback";
                    append(rt.live,crumb,head,tabs,alert,body);
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
                        ["Submitted","—"],
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
                        const cells=[String(i+1),display(v.UsrPurpose)||str(v.UsrName)||"—",
                            display(v.UsrEnvironment)||"—",display(v.UsrOperatingSystem)||"—",
                            num(v.UsrCPU),number(v.UsrRAMGB)===null?"—":num(v.UsrRAMGB)+" GB",
                            number(v.UsrStorageGB)===null?"—":num(v.UsrStorageGB)+" GB",
                            "—",pts===null?"—":num(pts),display(rt.record?.UsrStatus)||"—","—","—"];
                        cells.forEach((val,j)=>{
                            const cls=j===1?"usr-dt-cell-strong":j===8?"usr-dt-cell-points":"";
                            const td=element("td",cls);
                            if(j===9){
                                const p=element("span","usr-dt-pill",val);
                                p.dataset.status=lower(rt.record?.UsrStatus);td.appendChild(p);
                            }else if(j===2 && lower(v.UsrEnvironment)==="production"){
                                td.appendChild(element("span","usr-dt-production",val));
                            }else td.textContent=val;
                            tr.appendChild(td);
                        });
                        tbody.appendChild(tr);
                    });
                    append(table,thead,tbody);scroll.appendChild(table);card.appendChild(scroll);
                    const note=element("div","usr-dt-table-note",
                        "Quantity, VM status and VM ID are not stored in the supplied VM Item mapping; these values are not guessed.");
                    card.appendChild(note);return card;
                };
                rt.renderProcessLogs=()=>{
                    if(rt.parts.processes!=="ready" || !rt.processes.length)return null;
                    const block=element("section","usr-dt-card usr-dt-process-card");
                    block.appendChild(element("div","usr-dt-card-head","Linked Creatio Processes"));
                    for(const proc of rt.processes){
                        const row=element("div","usr-dt-process-row");
                        const left=element("div");
                        append(left,element("strong","",show(proc.name)),
                            element("div","usr-dt-event-meta","Started: "+date(proc.started,true)));
                        const right=element("span","",show(proc.status)+
                            (proc.completed?" · "+date(proc.completed,true):""));
                        append(row,left,right);block.appendChild(row);
                    }
                    return block;
                };
                rt.renderWorkflow=()=>{
                    const wrap=element("div");
                    const card=element("section","usr-dt-card usr-dt-workflow");
                    const title=element("h3","usr-dt-section-title","Workflow History");
                    title.appendChild(element("span","usr-dt-work-status",
                        "Current request status: "+show(display(rt.record?.UsrStatus))));
                    card.appendChild(title);
                    const timeline=element("div","usr-dt-timeline");
                    STAGES.forEach((stage,i)=>{
                        const done=i===0 && !!rt.record?.CreatedOn;
                        const step=element("div","usr-dt-step"+(done?" is-done":""));
                        const dot=element("div","usr-dt-step-dot",done?"✓":"");
                        const main=element("div","usr-dt-step-main");
                        const header=element("div","usr-dt-step-header");
                        const section=element("div");
                        section.appendChild(element("div","usr-dt-step-name",stage));
                        if(done) section.appendChild(element("div","usr-dt-step-actor",
                            show(display(rt.record.CreatedBy))));
                        const dates=element("div","usr-dt-step-dates");
                        if(done){dates.textContent="Started: "+date(rt.record.CreatedOn)+
                            " · Completed: "+date(rt.record.CreatedOn);}
                        append(header,section,dates);main.appendChild(header);
                        if(done)main.appendChild(element("div","usr-dt-outcome","Outcome: Created"));
                        append(step,dot,main);timeline.appendChild(step);
                    });
                    card.appendChild(timeline);
                    card.appendChild(element("p","usr-dt-work-note",
                        "Only the creation milestone has a verified timestamp in the request fields. " +
                        "Later decisions are not marked complete without their own recorded events."));
                    wrap.appendChild(card);
                    const logs=rt.renderProcessLogs();if(logs)wrap.appendChild(logs);
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
                    const data=rt.record||{};
                    if(data.CreatedOn)events.push({date:data.CreatedOn,
                        title:"Request created",by:display(data.CreatedBy)||"Creatio"});
                    if(data.ModifiedOn && Math.abs(new Date(data.ModifiedOn)-new Date(data.CreatedOn))>1000){
                        events.push({date:data.ModifiedOn,title:"Request last modified",
                            by:display(data.ModifiedBy)||"Creatio"});
                    }
                    if(rt.parts.files==="ready"){
                        rt.files.forEach(file=>{if(file.CreatedOn)events.push({date:file.CreatedOn,
                            title:"Document uploaded: "+show(file.Name),
                            by:display(file.CreatedBy)||"Creatio"});});
                    }
                    events.sort((a,b)=>new Date(b.date)-new Date(a.date));
                    if(!events.length)wrap.appendChild(empty("No activity available",
                        "There are no verified activity timestamps for this request.","◷"));
                    for(const evt of events){
                        const card=element("div","usr-dt-event");
                        const right=element("div");append(right,
                            element("div","usr-dt-event-text",evt.title),
                            element("div","usr-dt-event-meta",evt.by+" · "+date(evt.date,true)));
                        append(card,element("div","usr-dt-event-dot"),right);
                        wrap.appendChild(card);
                    }
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
                    update("stage",statusStage(data.UsrStatus));
                    const edit=rt.live.querySelector('[data-field="edit"]');
                    if(edit)edit.hidden=!rt.record || !canEdit(data.UsrStatus);
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
                        "Documents":rt.renderDocs,
                        "Activity & Audit":rt.renderAudit};
                    body.appendChild(renderers[rt.tab]());
                };
                rt.loadRelated=async(token)=>{
                    const stillCurrent=()=>!rt.disposed && token===rt.generation;
                    // Independent data sources: a SysFile permission error must not blank Overview/VM Items.
                    await Promise.all([
                        (async()=>{
                            try{
                                const rows=await loadRows(ITEM_SCHEMA,ITEM_FIELDS,[["UsrRequest",rt.id]],300);
                                if(!stillCurrent())return;
                                rt.items=rows;rt.parts.items="ready";
                            }catch(e){if(!stillCurrent())return;
                                console.error("Request Detail VM Items read failed",e);
                                rt.parts.items="error";rt.errors.items=e?.message||String(e);}
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
                                // Only linked process instances: no unrelated processes or guessed milestones.
                                const links=await loadRows("SysProcessEntity",["Id","EntityId","SysProcessId"],
                                    [["EntityId",rt.id]],60);
                                if(!stillCurrent())return;
                                const ids=[...new Set(links.map(l=>idOf(l.SysProcessId)).filter(isGuid))];
                                const logs=[];
                                for(const pid of ids.slice(0,25)){
                                    try{
                                        const log=await loadRecord("SysProcessLog",pid,
                                            ["Id","Name","StartDate","CompleteDate","Status"]);
                                        if(log && stillCurrent())logs.push({name:display(log.Name),
                                            started:log.StartDate,completed:log.CompleteDate,
                                            status:display(log.Status)});
                                    }catch(error){console.warn("A linked process log is unavailable",pid,error);}
                                }
                                if(!stillCurrent())return;
                                rt.processes=logs;rt.parts.processes="ready";
                            }catch(e){
                                if(!stillCurrent())return;
                                // Some requester roles have no process-log permissions.
                                // Treat as unknown, never as a definitive no-process result.
                                rt.parts.processes="unavailable";
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
                    rt.id=id;rt.loading=true;rt.record=null;rt.items=[];rt.files=[];rt.processes=[];
                    rt.errors={};rt.parts={items:"loading",files:"loading",processes:"loading"};
                    rt.paint();
                    try{
                        const record=await loadRecord(HEADER_SCHEMA,id,HEADER_FIELDS);
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
