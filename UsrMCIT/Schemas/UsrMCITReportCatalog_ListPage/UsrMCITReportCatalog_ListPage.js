/* MCIT Report Catalog — V1.1 SECTION NAVIGATION / Creatio Freedom UI 10.x
 * Visual design: follows the supplied MCIT report catalog screenshots.
 * Based on the user's Administration Home hybrid (native Designer preview + runtime UI).
 * Runtime: searchable category cards, favorites, recent successful runs,
 *           real SDK data access for connected reports, preview, CSV, print-to-PDF.
 * No demo run history or invented report figures.
 * IMPORTANT: report definitions without a verified data source DO NOT execute.
 * Permissions: Creatio object/column rights govern SDK data loads. MCIT-specific
 * reporting permission enforcement requires an authenticated server endpoint.
 * See README before production deployment.
 */
define("UsrMCITReportCatalog_ListPage", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/,
function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
    "use strict";

    const PAGE_CODE = "UsrMCITReportCatalog_ListPage";
    const RUNTIME_KEY = "__usrMCITReportCatalogRuntime";
    const ROOT_ID = "usr-mcit-report-catalog";
    const STYLE_ID = "usr-mcit-report-catalog-style";
    const ANCHOR_CLASS = "usr-mcit-report-anchor";
    const STORAGE_KEY = "usr-mcit-report-catalog-ui-v1";
    const MAX_ROWS = 5000;           // hard safety limit; no silently truncated report
    const PAGE_SIZE = 200;
    const PREVIEW_ROWS = 40;

    /* CONNECTED SOURCES: use only object and column names supported by the
       provided Administration Home code. Add / change mappings after verifying
       each business object and its reporting permissions on the Realese server.
       For other reports, source:null deliberately prevents fake results. */
    const SOURCES = {
        "user-access": {
            schema: "UsrMCITPortalUserAccess",
            attributes: ["Id", "UsrUser", "UsrUserStatus"],
            columns: [
                {key: "UsrUser", label: "User"},
                {key: "UsrUserStatus", label: "Account status"}
            ]
        },
        "audit-activity": {
            schema: "SysOperationAudit",
            attributes: ["Id", "Date", "Type", "Result", "Description", "Owner"],
            orderBy: "Date",
            columns: [
                {key: "Date", label: "Timestamp"},
                {key: "Owner", label: "User"},
                {key: "Type", label: "Action type"},
                {key: "Result", label: "Outcome"},
                {key: "Description", label: "Description"}
            ]
        }
    };

    const REPORT_DEFINITIONS = [
        {id:"request-status", title:"Request Status Report", category:"Requests", description:"Current status of all VM requests with workflow stage and SLA position", access:"View Requests"},
        {id:"request-aging", title:"Request Aging Report", category:"Requests", description:"Requests by age in current workflow stage, ordered by SLA risk", access:"View Requests"},
        {id:"workflow-stage", title:"Workflow Stage Performance", category:"Workflow & SLA", description:"Average processing times per workflow stage and reviewer", access:"View Reports"},
        {id:"sla-compliance", title:"SLA Compliance Report", category:"Workflow & SLA", description:"SLA compliance rates by stage, contract, and time period", access:"View Reports"},
        {id:"financial-review", title:"Financial Review Report", category:"Financial Review", description:"Financial review outcomes, cycle times, and reviewer performance", access:"Financial Review Access"},
        {id:"technical-review", title:"Technical Review Report", category:"Technical Review", description:"Technical review outcomes and resource specification trends", access:"Technical Review Access"},
        {id:"provisioning-outcome", title:"Provisioning Outcome Report", category:"Provisioning", description:"Provisioning success and failure rates, attempt history, cycle times", access:"View Requests"},
        {id:"contract-balance", title:"Contract Point Balance Report", category:"Contracts", description:"Current Available, Consumed, and Restored point balances per contract", access:"Contract Access"},
        {id:"point-ledger", title:"Point Ledger Report", category:"Points", description:"Full append-only ledger export with all transaction types and references", access:"Contract Access"},
        {id:"restored-expiry", title:"Restored-Point Expiry Report", category:"Points", description:"Restored point balances by expiry date with 30 and 90-day projections", access:"Contract Access"},
        {id:"vm-inventory", title:"VM Inventory Report", category:"Virtual Machines", description:"All VMs by lifecycle status, contract, authority, and resource specification", access:"VM Access"},
        {id:"vm-lifecycle", title:"VM Lifecycle Report", category:"Lifecycle", description:"VM lifecycle events, termination, and point restorations by contract", access:"VM Access"},
        {id:"user-access", title:"User Access Report", category:"Users & Access", description:"User access records and account statuses from the MCIT portal user directory", access:"Security Admin Access"},
        {id:"audit-activity", title:"Audit Activity Report", category:"Audit", description:"Recorded administrative activity, including event results and descriptions", access:"Audit Access"}
    ];
    const CATEGORY_ORDER = ["All", "Requests", "Workflow & SLA", "Financial Review", "Technical Review", "Provisioning", "Contracts", "Points", "Virtual Machines", "Lifecycle", "Users & Access", "Audit"];
    const DEFAULT_FAVORITES = ["request-status", "workflow-stage", "sla-compliance", "contract-balance"];
    const STAR_ICON = "★";
    const SEARCH_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m14.5 14.5 5.5 5.5"/></svg>';
    const STYLE_TEXT = "/* MCIT Report Catalog — runtime styles, scoped to its own page.\n   Violet / Rubik inspired visual language. No global Creatio controls are modified. */\n#usr-mcit-report-catalog{font-family:Rubik,Arial,sans-serif;color:#1a1634;box-sizing:border-box;width:100%;}\n.usr-mcit-catalog-background{background:#F8F7FF!important;min-height:calc(100dvh - 64px)!important;}\n#usr-mcit-report-catalog{background:#F8F7FF!important;min-height:calc(100dvh - 64px)!important;}\n#usr-mcit-report-catalog .mrc-page{background:#F8F7FF!important;}\n#usr-mcit-report-catalog *{box-sizing:border-box}\n#usr-mcit-report-catalog button,#usr-mcit-report-catalog input{font:inherit}\n#usr-mcit-report-catalog button{cursor:pointer}\n#usr-mcit-report-catalog button:focus-visible,#usr-mcit-report-catalog input:focus-visible{outline:3px solid #a98bf9;outline-offset:2px}\n.mrc-designer-preview{display:none!important}\n#usr-mcit-report-catalog .mrc-page{max-width:1190px;margin:0 auto;padding:26px 30px 56px;min-height:600px}\n#usr-mcit-report-catalog .mrc-header{margin:0 0 25px}\n#usr-mcit-report-catalog h1{font-size:24px;line-height:1.35;font-weight:760;letter-spacing:-.5px;margin:0;color:#161335}\n#usr-mcit-report-catalog .mrc-subtitle{margin:8px 0 0;color:#747587;font-size:12px;line-height:1.55}\n#usr-mcit-report-catalog .mrc-section{margin:25px 0 0}\n#usr-mcit-report-catalog .mrc-section-header{display:flex;gap:9px;align-items:center;margin:0 0 11px;color:#6730b6;font-weight:740;font-size:12px}\n#usr-mcit-report-catalog .mrc-section-header svg{width:15px;height:15px;stroke-width:2}\n#usr-mcit-report-catalog .mrc-favorites{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px}\n#usr-mcit-report-catalog .mrc-favorite{display:flex;flex-direction:column;align-items:flex-start;min-height:118px;padding:13px 15px;border:1px solid #e2def2;border-radius:11px;background:#fff;box-shadow:0 2px 4px rgba(42,20,86,.025)}\n#usr-mcit-report-catalog .mrc-fav-title{font-size:12px;font-weight:720;line-height:1.38;min-height:32px;margin:0 0 5px}\n#usr-mcit-report-catalog .mrc-tag{display:inline-flex;align-items:center;min-height:19px;border-radius:7px;padding:2px 8px;background:#f5efff;border:1px solid #e3d7ff;color:#6e35c3;font-size:10px;font-weight:650;line-height:1.4;white-space:nowrap}\n#usr-mcit-report-catalog .mrc-tag.excel{background:#ecfaf1;border-color:#bcebd1;color:#178d51}\n#usr-mcit-report-catalog .mrc-tag.pdf{background:#fff1f1;border-color:#f6ced0;color:#bf4040}\n#usr-mcit-report-catalog .mrc-tags{display:flex;gap:5px;flex-wrap:wrap;margin-top:8px}\n#usr-mcit-report-catalog .mrc-date{color:#9290a1;font-size:10.5px;line-height:1.5;margin-top:8px}\n#usr-mcit-report-catalog .mrc-btn{border:0;border-radius:9px;padding:8px 15px;background:#6825c1;color:#fff;font-size:11px;font-weight:700;line-height:1.1;transition:background .18s,transform .18s;white-space:nowrap}\n#usr-mcit-report-catalog .mrc-btn:hover{background:#561ba9}\n#usr-mcit-report-catalog .mrc-btn.small{padding:7px 13px;margin-top:auto;font-size:10.5px}\n#usr-mcit-report-catalog .mrc-btn.secondary{background:#f4effb;color:#6b34b5;border:1px solid #e5dbf5}\n#usr-mcit-report-catalog .mrc-btn.secondary:hover{background:#eae0f9}\n#usr-mcit-report-catalog .mrc-btn:disabled{background:#b7accb;cursor:not-allowed}\n#usr-mcit-report-catalog .mrc-favorite .mrc-btn{margin-top:auto}\n#usr-mcit-report-catalog .mrc-recent{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:11px}\n#usr-mcit-report-catalog .mrc-recent-item{padding:13px 15px;min-height:70px;border-radius:10px;background:#f9f9fc;border:1px solid #e5e3ed}\n#usr-mcit-report-catalog .mrc-recent-item strong{display:block;font-size:12px;line-height:1.4}\n#usr-mcit-report-catalog .mrc-recent-item span{display:block;margin-top:3px;color:#7e7b8d;font-size:10.5px}\n#usr-mcit-report-catalog .mrc-categories{display:flex;gap:8px 9px;flex-wrap:wrap;margin:26px 0 18px}\n#usr-mcit-report-catalog .mrc-filter{border:1px solid transparent;color:#4d495e;border-radius:17px;padding:7px 13px;font-size:11px;font-weight:680;background:#f0f0f3;transition:background .15s}\n#usr-mcit-report-catalog .mrc-filter:hover{background:#e8e1f4}\n#usr-mcit-report-catalog .mrc-filter[aria-pressed=\"true\"]{background:#7028ce;color:white}\n#usr-mcit-report-catalog .mrc-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 16px}\n#usr-mcit-report-catalog .mrc-search{background:#fff;border:1px solid #e2dff0;border-radius:10px;padding:10px 14px;display:flex;align-items:center;gap:9px;min-width:0;flex:1;max-width:390px}\n#usr-mcit-report-catalog .mrc-search svg{color:#9688b1;flex:0 0 auto;width:15px;height:15px}\n#usr-mcit-report-catalog .mrc-search input{border:0;outline:0!important;width:100%;font-size:11px;color:#342747;background:transparent}\n#usr-mcit-report-catalog .mrc-count{font-size:11px;color:#89859a;white-space:nowrap}\n#usr-mcit-report-catalog .mrc-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}\n#usr-mcit-report-catalog .mrc-card{position:relative;min-height:214px;border:1px solid #e6e3ef;border-radius:11px;background:#fff;padding:19px 17px 17px;box-shadow:0 2px 6px rgba(44,35,72,.03);display:flex;flex-direction:column;align-items:flex-start}\n#usr-mcit-report-catalog .mrc-card-title{font-size:12px;font-weight:750;line-height:1.45;margin:0 26px 11px 0}\n#usr-mcit-report-catalog .mrc-desc{font-size:11px;color:#777586;line-height:1.55;min-height:42px;margin:0}\n#usr-mcit-report-catalog .mrc-access{color:#888497;font-size:10.5px;margin:10px 0 0}\n#usr-mcit-report-catalog .mrc-access::before{content:'⚙';font-size:13px;margin-right:6px;color:#918c9f}\n#usr-mcit-report-catalog .mrc-card .mrc-btn{margin-top:auto}\n#usr-mcit-report-catalog .mrc-card-date{font-size:10px;color:#9b99a9;margin:9px 0 12px}\n#usr-mcit-report-catalog .mrc-star{position:absolute;right:13px;top:13px;border:0;background:transparent;color:#c6c5ce;padding:3px;font-size:20px;line-height:1;width:27px;height:27px}\n#usr-mcit-report-catalog .mrc-star[aria-pressed=\"true\"]{color:#f2a300}\n#usr-mcit-report-catalog .mrc-star:hover{transform:scale(1.1)}\n#usr-mcit-report-catalog .mrc-empty{border:1px dashed #ddd4ed;background:#faf8ff;border-radius:12px;padding:25px;color:#7b7094;font-size:12px;text-align:center;grid-column:1/-1}\n#usr-mcit-report-catalog .mrc-note{color:#88819a;font-size:10px;line-height:1.55;margin-top:18px}\n#usr-mcit-report-catalog .mrc-backdrop{position:fixed;inset:0;z-index:9500;background:rgba(19,11,37,.55);display:flex;align-items:center;justify-content:center;padding:20px}\n#usr-mcit-report-catalog .mrc-modal{width:min(860px,100%);max-height:90vh;overflow-y:auto;background:#fff;border-radius:14px;padding:22px 25px 25px;box-shadow:0 18px 58px rgba(18,8,52,.25)}\n#usr-mcit-report-catalog .mrc-modal-header{display:flex;justify-content:space-between;gap:15px;align-items:flex-start;padding-bottom:15px;border-bottom:1px solid #eee9f5}\n#usr-mcit-report-catalog .mrc-modal-header h2{margin:0;font-size:18px}\n#usr-mcit-report-catalog .mrc-modal-header p{font-size:11px;color:#777;line-height:1.55;margin:6px 0 0}\n#usr-mcit-report-catalog .mrc-close{background:#f1edf8;border:0;border-radius:9px;color:#5d36a1;font-size:21px;padding:3px 11px}\n#usr-mcit-report-catalog .mrc-alert{padding:14px 16px;border-radius:9px;background:#f8f4ff;border:1px solid #e7dafb;margin:17px 0;color:#4e3674;font-size:12px;line-height:1.6}\n#usr-mcit-report-catalog .mrc-alert.error{background:#fff3f3;border-color:#f4cccc;color:#a63030}\n#usr-mcit-report-catalog .mrc-modal-actions{display:flex;gap:9px;flex-wrap:wrap;justify-content:flex-end;margin-top:17px}\n#usr-mcit-report-catalog .mrc-table-wrap{max-height:53vh;overflow:auto;border:1px solid #e4e0eb;border-radius:9px;margin:15px 0}\n#usr-mcit-report-catalog .mrc-table{width:100%;border-collapse:collapse;text-align:left;font-size:11px}\n#usr-mcit-report-catalog .mrc-table th{padding:10px;background:#f7f5fb;position:sticky;top:0;white-space:nowrap;z-index:1;color:#5e5574}\n#usr-mcit-report-catalog .mrc-table td{padding:10px;border-top:1px solid #ede9f2;max-width:275px;overflow-wrap:anywhere;vertical-align:top}\n#usr-mcit-report-catalog .mrc-status{font-size:11px;color:#716985;margin-top:12px}\n@media(max-width:1120px){#usr-mcit-report-catalog .mrc-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#usr-mcit-report-catalog .mrc-favorites{grid-template-columns:repeat(2,minmax(0,1fr))}}\n@media(max-width:680px){#usr-mcit-report-catalog .mrc-page{padding:20px 12px 40px}#usr-mcit-report-catalog .mrc-grid,#usr-mcit-report-catalog .mrc-recent,#usr-mcit-report-catalog .mrc-favorites{grid-template-columns:1fr}#usr-mcit-report-catalog .mrc-toolbar{align-items:stretch;flex-direction:column}#usr-mcit-report-catalog .mrc-search{max-width:none}#usr-mcit-report-catalog .mrc-card{min-height:185px}}\n@media print{body *{visibility:hidden!important}#usr-mcit-report-catalog .mrc-modal,#usr-mcit-report-catalog .mrc-modal *{visibility:visible!important}#usr-mcit-report-catalog .mrc-backdrop{position:absolute;inset:0;background:#fff;padding:0;display:block}#usr-mcit-report-catalog .mrc-modal{width:100%;max-height:none;overflow:visible;padding:0;box-shadow:none}#usr-mcit-report-catalog .mrc-modal-actions,#usr-mcit-report-catalog .mrc-close,#usr-mcit-report-catalog .mrc-alert{display:none!important}#usr-mcit-report-catalog .mrc-table-wrap{max-height:none;overflow:visible}#usr-mcit-report-catalog .mrc-table th{position:static}}\n";

    function escapeHtml(value) {
        return String(value == null ? "" : value)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;")
            .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }
    function textValue(value) {
        if (value == null) return "";
        if (value instanceof Date) return value.toLocaleString("en-GB");
        if (typeof value === "object") {
            if (value.displayValue != null) return String(value.displayValue);
            if (value.Name != null) return String(value.Name);
            if (value.value != null && (typeof value.value !== "object")) return String(value.value);
            return "";
        }
        if (typeof value === "string") {
            const match = value.match(/^\/Date\((-?\d+)(?:[+-]\d+)?\)\/$/);
            if (match) return new Date(Number(match[1])).toLocaleString("en-GB");
        }
        return String(value);
    }
    function formatTime(epoch) {
        const time = Number(epoch);
        if (!time || !Number.isFinite(time)) return "Not run here";
        return new Date(time).toLocaleString("en-GB", {
            day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit"
        });
    }
    function readStorage() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return {favorites: DEFAULT_FAVORITES.slice(), recent: []};
            const data = JSON.parse(raw);
            return {
                favorites: Array.isArray(data.favorites) ? data.favorites.filter(x => typeof x === "string") : DEFAULT_FAVORITES.slice(),
                recent: Array.isArray(data.recent) ? data.recent.filter(x => x && typeof x.id === "string" && Number.isFinite(x.at)).slice(0, 20) : []
            };
        } catch (_error) { return {favorites: DEFAULT_FAVORITES.slice(), recent: []}; }
    }
    function saveStorage(runtime) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                favorites: [...runtime.favorites], recent: runtime.recent.slice(0, 20)
            }));
        } catch (_error) { /* Page still works when browser storage is blocked. */ }
    }
    function getDefinition(id) { return REPORT_DEFINITIONS.find(r => r.id === id); }
    function hasSource(report) { return !!(report && SOURCES[report.id]); }
    function lastRun(runtime, id) {
        const record = runtime.recent.find(x => x.id === id);
        return record ? "Last run: " + formatTime(record.at) : "Not run in this browser";
    }
    function renderFavorite(report, runtime) {
        return `<article class="mrc-favorite">
            <div class="mrc-fav-title">${escapeHtml(report.title)}</div>
            <span class="mrc-tag">${escapeHtml(report.category)}</span>
            <p class="mrc-date">${escapeHtml(lastRun(runtime,report.id))}</p>
            <button type="button" class="mrc-btn small" data-action="run" data-id="${escapeHtml(report.id)}">Run</button>
        </article>`;
    }
    function renderRecent(event) {
        const report = getDefinition(event.id);
        if (!report) return "";
        return `<div class="mrc-recent-item"><strong>${escapeHtml(report.title)}</strong>
            <span>${escapeHtml(report.category)}</span>
            <span>${escapeHtml("Last run: " + formatTime(event.at))}</span></div>`;
    }
    function renderCard(report, runtime) {
        const favorite = runtime.favorites.has(report.id);
        return `<article class="mrc-card">
          <button class="mrc-star" type="button" data-action="favorite" data-id="${escapeHtml(report.id)}"
            aria-pressed="${favorite}" aria-label="${favorite ? "Remove from" : "Add to"} favorites: ${escapeHtml(report.title)}" title="Toggle favorite">${STAR_ICON}</button>
          <h3 class="mrc-card-title">${escapeHtml(report.title)}</h3>
          <p class="mrc-desc">${escapeHtml(report.description)}</p>
          <div class="mrc-tags"><span class="mrc-tag">${escapeHtml(report.category)}</span><span class="mrc-tag excel">Excel</span><span class="mrc-tag pdf">PDF</span></div>
          <div class="mrc-access">${escapeHtml(report.access)}</div>
          <p class="mrc-card-date">${escapeHtml(lastRun(runtime, report.id))}</p>
          <button type="button" class="mrc-btn" data-action="run" data-id="${escapeHtml(report.id)}">Run Report</button>
        </article>`;
    }
    function filteredReports(runtime) {
        const term = runtime.search.trim().toLocaleLowerCase();
        return REPORT_DEFINITIONS.filter(report =>
            (runtime.category === "All" || runtime.category === report.category) &&
            (!term || (report.title + " " + report.description + " " + report.category).toLocaleLowerCase().includes(term))
        );
    }
    function renderPreviewTable(preview) {
        const sample = preview.rows.slice(0, PREVIEW_ROWS);
        return `<div class="mrc-table-wrap"><table class="mrc-table"><thead><tr>${preview.source.columns.map(c => `<th>${escapeHtml(c.label)}</th>`).join("")}</tr></thead>
          <tbody>${sample.length ? sample.map(row => `<tr>${preview.source.columns.map(c => `<td>${escapeHtml(textValue(row[c.key]))}</td>`).join("")}</tr>`).join("")
          : `<tr><td colspan="${preview.source.columns.length}">No records returned for this user.</td></tr>`}</tbody></table></div>
          <p class="mrc-status">${preview.rows.length} authorized record(s) loaded.${preview.rows.length > PREVIEW_ROWS ? ` Showing first ${PREVIEW_ROWS}; CSV includes all loaded records.` : ""}</p>`;
    }
    function renderDialog(runtime) {
        const dialog = runtime.dialog;
        if (!dialog) return "";
        const report = getDefinition(dialog.id);
        const reportTitle = report ? report.title : "Report";
        let body = "";
        if (dialog.type === "missing") {
            body = `<div class="mrc-alert">This catalog entry is designed, but its reporting data source has not been connected in <strong>SOURCES</strong> in this page schema. No report was run and no history was recorded.<br><br>Connect the verified business object or report service and enforce the MCIT reporting permission on the server before enabling execution.</div>`;
        } else if (dialog.type === "loading") {
            body = `<div class="mrc-alert" role="status">Loading records permitted by Creatio access rights…</div>`;
        } else if (dialog.type === "error") {
            body = `<div class="mrc-alert error" role="alert">${escapeHtml(dialog.message || "Unable to load report")}</div>`;
        } else if (dialog.type === "preview") {
            body = renderPreviewTable(dialog.preview);
        }
        const actions = dialog.type === "preview"
            ? `<button class="mrc-btn secondary" type="button" data-action="csv">Download CSV (Excel)</button>
               <button class="mrc-btn" type="button" data-action="print">Print / Save PDF</button>`
            : "";
        return `<div class="mrc-backdrop" data-backdrop="true"><div class="mrc-modal" role="dialog" aria-modal="true" aria-labelledby="mrc-dialog-title">
          <div class="mrc-modal-header"><div><h2 id="mrc-dialog-title">${escapeHtml(reportTitle)}</h2>
          <p>${dialog.type === "preview" ? "Preview of live records returned by the Creatio data source." : "MCIT Report Catalog"}</p></div>
          <button type="button" class="mrc-close" data-action="close" aria-label="Close report dialog">×</button></div>
          ${body}<div class="mrc-modal-actions">${actions}</div></div></div>`;
    }
    function render(runtime, focusSearch) {
        if (!runtime.root || runtime.disposed) return;
        const selection = runtime.root.querySelector('input[data-action="search"]');
        const caret = selection && document.activeElement === selection ? selection.selectionStart : null;
        const favorites = REPORT_DEFINITIONS.filter(r => runtime.favorites.has(r.id));
        const recent = runtime.recent.filter(x => !!getDefinition(x.id)).slice(0, 3);
        const reports = filteredReports(runtime);
        runtime.root.innerHTML = `<main class="mrc-page" aria-label="MCIT Report Catalog">
          <header class="mrc-header"><h1>${escapeHtml(runtime.title)}</h1><p class="mrc-subtitle">${escapeHtml(runtime.subtitle)}</p></header>
          <section class="mrc-section"><h2 class="mrc-section-header"><span aria-hidden="true">★</span> Favorites</h2>
            <div class="mrc-favorites">${favorites.length ? favorites.map(r => renderFavorite(r,runtime)).join("") : '<div class="mrc-empty">Star a report below to add it to Favorites.</div>'}</div></section>
          <section class="mrc-section"><h2 class="mrc-section-header"><span aria-hidden="true">◷</span> Recently Run</h2>
            <div class="mrc-recent">${recent.length ? recent.map(renderRecent).join("") : '<div class="mrc-empty">Successfully run reports appear here. No sample run dates are shown.</div>'}</div></section>
          <nav class="mrc-categories" aria-label="Filter reports by category">${CATEGORY_ORDER.map(category => `<button type="button" class="mrc-filter" data-action="category" data-category="${escapeHtml(category)}" aria-pressed="${runtime.category === category}">${escapeHtml(category)}</button>`).join("")}</nav>
          <div class="mrc-toolbar"><label class="mrc-search">${SEARCH_ICON}<input type="search" data-action="search" aria-label="Search reports" placeholder="Search reports..." value="${escapeHtml(runtime.search)}" /></label>
             <span class="mrc-count">${reports.length} report${reports.length === 1 ? "" : "s"}</span></div>
          <section class="mrc-grid" aria-label="Available reports">${reports.length ? reports.map(r => renderCard(r,runtime)).join("") : '<div class="mrc-empty">No reports match the selected category and search.</div>'}</section>
          <p class="mrc-note">Favorites and recent-run timestamps are stored in this browser. Only reports connected to a verified Creatio data source can run. Object permissions remain enforced by Creatio; MCIT-specific report authorization must be validated server-side before production use.</p>
        </main>${renderDialog(runtime)}`;
        if (focusSearch || caret !== null) {
            const input = runtime.root.querySelector('input[data-action="search"]');
            if (input) { input.focus(); if (caret !== null) try { input.setSelectionRange(caret, caret); } catch (_error) {} }
        }
    }
    function csvCell(value) {
        let data = textValue(value);
        // Protect users who open the export in spreadsheet software from formula injection.
        if (/^[\s\t\r]*[=+\-@]/.test(data)) data = "'" + data;
        return '"' + data.replace(/"/g, '""') + '"';
    }
    function exportCsv(runtime) {
        const preview = runtime.dialog && runtime.dialog.preview;
        if (!preview) return;
        const columns = preview.source.columns;
        const data = [columns.map(c => csvCell(c.label))];
        for (const row of preview.rows) data.push(columns.map(c => csvCell(row[c.key])));
        const content = "\uFEFF" + data.map(cells => cells.join(",")).join("\r\n");
        const url = URL.createObjectURL(new Blob([content], {type:"text/csv;charset=utf-8"}));
        const link = document.createElement("a");
        link.href = url;
        link.download = "MCIT_" + preview.report.id.replace(/[^a-z0-9-_]/gi,"-") + "_" + new Date().toISOString().slice(0,10) + ".csv";
        document.body.appendChild(link); link.click(); link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    async function loadSource(source, runtime) {
        const model = await sdk.Model.create(source.schema);
        const rows = [];
        for (let offset = 0; offset <= MAX_ROWS; offset += PAGE_SIZE) {
            if (runtime.disposed) throw new Error("Page closed during report load.");
            const count = Math.min(PAGE_SIZE, MAX_ROWS + 1 - offset);
            const options = {pagingConfig:{rowsOffset:offset,rowCount:count}};
            if (source.orderBy) options.sortingConfig = {columns:[{columnName:source.orderBy,direction:"desc"}]};
            const batch = await model.load({attributes:source.attributes,options});
            if (!Array.isArray(batch)) throw new Error("Creatio returned an unexpected report response.");
            rows.push(...batch);
            if (rows.length > MAX_ROWS) throw new Error("More than 5,000 records found. Configure report-specific server pagination and filters before exporting.");
            if (batch.length < count) return rows;
        }
        return rows;
    }
    async function openReportParameters(runtime) {
        // This is an actual Creatio standalone Freedom UI page, opened from the
        // existing Report Catalog section (no separate menu section required).
        if (!runtime.context) {
            runtime.dialog = {type:"error", id:"request-status",
                message:"Page context is unavailable. Reopen Report Catalog from MCIT navigation and try again."};
            render(runtime);
            return;
        }
        try {
            await sdk.HandlerChainService.instance.process({
                type:"crt.OpenPageRequest",
                schemaName:"UsrReportParameters",
                $context:runtime.context,
                scopes:[...(runtime.scopes || [])]
            });
        } catch(error) {
            console.error("MCIT Catalog: failed to open Report Parameters", error);
            runtime.dialog = {type:"error", id:"request-status",
                message:"Could not open Report Parameters. Confirm UsrReportParameters exists and is published. " +
                    (error && error.message ? error.message : "")};
            render(runtime);
        }
    }
    async function runReport(runtime, reportId) {
        if (runtime.disposed || runtime.loading) return;
        const report = getDefinition(reportId);
        if (!report) return;
        if (reportId === "request-status") {
            await openReportParameters(runtime);
            return;
        }
        const source = SOURCES[reportId];
        if (!source) {
            runtime.dialog = {type:"missing",id:reportId};render(runtime);return;
        }
        runtime.loading = true;
        runtime.dialog = {type:"loading",id:reportId};render(runtime);
        try {
            const rows = await loadSource(source,runtime);
            if (runtime.disposed) return;
            runtime.dialog = {type:"preview",id:reportId,preview:{report,source,rows}};
            runtime.recent = [{id:reportId,at:Date.now()},...runtime.recent.filter(x => x.id !== reportId)].slice(0,20);
            saveStorage(runtime);
        } catch (error) {
            if (runtime.disposed) return;
            console.warn("MCIT Report Catalog: report load failed", reportId, error);
            runtime.dialog = {type:"error",id:reportId,message:error && error.message ? error.message : "Unable to load data. Verify object rights and model columns."};
        } finally {runtime.loading = false;if(!runtime.disposed)render(runtime);}
    }
    function handleClick(runtime, event) {
        if (runtime.disposed) return;
        const button = event.target.closest("button[data-action]");
        if (!button || !runtime.root.contains(button)) {
            if (event.target.classList.contains("mrc-backdrop")) {runtime.dialog=null;render(runtime);}
            return;
        }
        const action = button.dataset.action;
        if (action === "category") {runtime.category=button.dataset.category || "All";render(runtime);}
        else if (action === "favorite") {
            const id=button.dataset.id;if(!getDefinition(id))return;
            if(runtime.favorites.has(id)) runtime.favorites.delete(id); else runtime.favorites.add(id);
            saveStorage(runtime);render(runtime);
        }
        else if (action === "run") {void runReport(runtime,button.dataset.id);}
        else if (action === "close") {if(!runtime.loading){runtime.dialog=null;render(runtime);}}
        else if (action === "csv") {exportCsv(runtime);}
        else if (action === "print") {window.print();}
    }
    function designerText(cls,fallback) {
        const node=document.querySelector(".mrc-designer-preview ." + cls);
        const value=node && node.textContent && node.textContent.trim();
        return value && value.length<200 ? value : fallback;
    }
    function mount(runtime) {
        if (runtime.disposed || !String(window.location.hash || "").includes(PAGE_CODE)) return;
        if (runtime.root && runtime.root.isConnected) return;
        const anchor=document.querySelector("."+ANCHOR_CLASS);
        if (!anchor || !anchor.parentNode) return;
        if (!document.getElementById(STYLE_ID)) {
            const style=document.createElement("style");style.id=STYLE_ID;style.textContent=STYLE_TEXT;document.head.appendChild(style);
        }
        runtime.title=designerText("mrc-designer-title","Report Catalog");
        runtime.subtitle=designerText("mrc-designer-subtitle","Generate, filter, and export operational and audit reports within your authorized data scope.");
        // Editor labels are a preview; report descriptions/data connections remain configured in the code.
        // Scope page background to this section only; do not recolor the Creatio shell.
        runtime.host=anchor.parentElement;
        runtime.host.classList.add("usr-mcit-catalog-background");
        const node=document.createElement("div");node.id=ROOT_ID;
        runtime.root=node;runtime.anchor=anchor;runtime.anchorDisplay=anchor.style.display;
        anchor.insertAdjacentElement("afterend",node);anchor.style.display="none";
        runtime.onClick=(event)=>handleClick(runtime,event);
        runtime.onInput=(event)=>{if(event.target.matches('input[data-action="search"]')){runtime.search=event.target.value;render(runtime,true);}};
        runtime.onKey=(event)=>{if(event.key === "Escape" && runtime.dialog && !runtime.loading){runtime.dialog=null;render(runtime);}};
        node.addEventListener("click",runtime.onClick);
        node.addEventListener("input",runtime.onInput);
        document.addEventListener("keydown",runtime.onKey);
        render(runtime);
    }
    function startRuntime(pageRequest) {
        if (typeof document === "undefined") return;
        if (!String(window.location.hash||"").includes(PAGE_CODE)) return;
        const prior=document[RUNTIME_KEY];
        if (prior && !prior.disposed) {
            if (pageRequest && pageRequest.$context) prior.context = pageRequest.$context;
            if (pageRequest && pageRequest.scopes) prior.scopes = pageRequest.scopes;
            mount(prior);return;
        }
        const state=readStorage();
        const runtime={disposed:false,root:null,anchor:null,search:"",category:"All",favorites:new Set(state.favorites),recent:state.recent,dialog:null,loading:false,
            context:pageRequest?.$context || null,scopes:pageRequest?.scopes || []};
        runtime.dispose=()=>{
            if(runtime.disposed)return;
            runtime.disposed=true;
            if(runtime.retryTimer)clearInterval(runtime.retryTimer);
            if(runtime.root){runtime.root.removeEventListener("click",runtime.onClick);runtime.root.removeEventListener("input",runtime.onInput);runtime.root.remove();}
            if(runtime.onKey)document.removeEventListener("keydown",runtime.onKey);
            if(runtime.anchor)runtime.anchor.style.display=runtime.anchorDisplay || "";
            if(runtime.host)runtime.host.classList.remove("usr-mcit-catalog-background");
            const style=document.getElementById(STYLE_ID);if(style)style.remove();
            if(document[RUNTIME_KEY]===runtime)delete document[RUNTIME_KEY];
        };
        document[RUNTIME_KEY]=runtime;
        let tries=0;
        const attempt=()=>{
            if(runtime.disposed)return;
            mount(runtime);
            tries++;
            if((runtime.root && runtime.root.isConnected) || tries>=100){if(runtime.retryTimer)clearInterval(runtime.retryTimer);runtime.retryTimer=null;}
        };
        attempt();
        if (!runtime.root)runtime.retryTimer=setInterval(attempt,200);
    }

    // The code below keeps a native, editable Freedom UI Designer preview.
    // The live report tiles use the JavaScript catalog above, like the user's
    // Administration Home V4 hybrid implementation.
    return {
        viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
            {"operation":"merge","name":"AddButton","values":{"visible":false}},
            {"operation":"merge","name":"DataImportButton","values":{"visible":false}},
            {"operation":"merge","name":"TitleContainer","values":{"visible":false}},
            {"operation":"merge","name":"MainFilterContainer","values":{"visible":false}},
            {"operation":"merge","name":"DataTable","values":{"visible":false}},
            {"operation":"merge","name":"Dashboards","values":{"visible":false}},
            {"operation":"merge","name":"FolderTree","values":{"visible":false}},
            {"operation":"insert","name":"UsrMCITReportDesignerPreview","values":{"type":"crt.FlexContainer","direction":"column","wrap":"nowrap","items":[],"visible":true,"fitContent":true,"gap":"medium","alignItems":"stretch","classes":["mrc-designer-preview"],"layoutConfig":{"column":1,"row":1,"colSpan":2,"rowSpan":1}},"parentName":"SectionContentWrapper","propertyName":"items","index":0},
            {"operation":"insert","name":"UsrMCITReportDesignerTitle","values":{"type":"crt.Label","caption":"Report Catalog","labelType":"headline-1","visible":true,"classes":["mrc-designer-title"]},"parentName":"UsrMCITReportDesignerPreview","propertyName":"items","index":0},
            {"operation":"insert","name":"UsrMCITReportDesignerSubtitle","values":{"type":"crt.Label","caption":"Generate, filter, and export operational and audit reports within your authorized data scope.","labelType":"body","visible":true,"classes":["mrc-designer-subtitle"]},"parentName":"UsrMCITReportDesignerPreview","propertyName":"items","index":1},
            {"operation":"insert","name":"UsrMCITReportDesignerFavorites","values":{"type":"crt.Label","caption":"★ Favorites — customizable report tiles","labelType":"headline-3","visible":true},"parentName":"UsrMCITReportDesignerPreview","propertyName":"items","index":2},
            {"operation":"insert","name":"UsrMCITReportDesignerRecent","values":{"type":"crt.Label","caption":"Recently Run — real runs only","labelType":"headline-3","visible":true},"parentName":"UsrMCITReportDesignerPreview","propertyName":"items","index":3},
            {"operation":"insert","name":"UsrMCITReportDesignerCategories","values":{"type":"crt.Label","caption":"Categories: All · Requests · Workflow & SLA · Financial Review · Technical Review · Provisioning · Contracts · Points · Virtual Machines · Lifecycle · Users & Access · Audit","labelType":"body","visible":true},"parentName":"UsrMCITReportDesignerPreview","propertyName":"items","index":4},
            {"operation":"insert","name":"UsrMCITReportDesignerGrid","values":{"type":"crt.GridContainer","visible":true,"columns":["minmax(0,1fr)","minmax(0,1fr)","minmax(0,1fr)"],"rows":"repeat(2,minmax(100px,max-content))","items":[],"gap":{"columnGap":"small","rowGap":"small"},"fitContent":true,"classes":["mrc-designer-grid"]},"parentName":"UsrMCITReportDesignerPreview","propertyName":"items","index":5},
            {"operation":"insert","name":"UsrMCITReportDesignerCardA","values":{"type":"crt.Label","caption":"Request Status Report — Requests — Run Report","labelType":"body","visible":true},"parentName":"UsrMCITReportDesignerGrid","propertyName":"items","index":0},
            {"operation":"insert","name":"UsrMCITReportDesignerCardB","values":{"type":"crt.Label","caption":"Workflow Stage Performance — Workflow & SLA — Run Report","labelType":"body","visible":true},"parentName":"UsrMCITReportDesignerGrid","propertyName":"items","index":1},
            {"operation":"insert","name":"UsrMCITReportDesignerCardC","values":{"type":"crt.Label","caption":"SLA Compliance Report — Workflow & SLA — Run Report","labelType":"body","visible":true},"parentName":"UsrMCITReportDesignerGrid","propertyName":"items","index":2},
            {"operation":"insert","name":"UsrMCITReportDesignerCardD","values":{"type":"crt.Label","caption":"Contract Point Balance Report — Contracts — Run Report","labelType":"body","visible":true},"parentName":"UsrMCITReportDesignerGrid","propertyName":"items","index":3},
            {"operation":"insert","name":"UsrMCITReportDesignerCardE","values":{"type":"crt.Label","caption":"User Access Report — Users & Access — Run Report","labelType":"body","visible":true},"parentName":"UsrMCITReportDesignerGrid","propertyName":"items","index":4},
            {"operation":"insert","name":"UsrMCITReportDesignerCardF","values":{"type":"crt.Label","caption":"Audit Activity Report — Audit — Run Report","labelType":"body","visible":true},"parentName":"UsrMCITReportDesignerGrid","propertyName":"items","index":5},
            {"operation":"insert","name":"UsrMCITReportAnchor","values":{"type":"crt.FlexContainer","direction":"column","items":[],"visible":true,"fitContent":true,"classes":["usr-mcit-report-anchor"],"layoutConfig":{"column":1,"row":2,"colSpan":2,"rowSpan":1}},"parentName":"SectionContentWrapper","propertyName":"items","index":1},
            {"operation":"insert","name":"UsrMCITReportLoadingLabel","values":{"type":"crt.Label","caption":"Loading Report Catalog…","visible":true,"labelType":"body"},"parentName":"UsrMCITReportAnchor","propertyName":"items","index":0}
        ]/**SCHEMA_VIEW_CONFIG_DIFF*/,
        viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
        modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
            {"operation":"merge","path":["dataSources","PDS","config"],"values":{"entitySchemaName":"UsrMCITReportCatalog"}}
        ]/**SCHEMA_MODEL_CONFIG_DIFF*/,
        handlers: /**SCHEMA_HANDLERS*/[
            {"request":"crt.HandleViewModelInitRequest","handler":async(request,next)=>{
                const result=await next?.handle(request);
                if(typeof document!=="undefined"){
                    if(document[RUNTIME_KEY]?.dispose)document[RUNTIME_KEY].dispose();
                    startRuntime(request);
                }
                return result;
            }},
            {"request":"crt.HandleViewModelResumeRequest","handler":async(request,next)=>{
                const result=await next?.handle(request);
                if(typeof document!=="undefined")startRuntime(request);
                return result;
            }},
            {"request":"crt.HandleViewModelDestroyRequest","handler":async(request,next)=>{
                if(typeof document!=="undefined")document[RUNTIME_KEY]?.dispose?.();
                return next?.handle(request);
            }}
        ]/**SCHEMA_HANDLERS*/,
        converters: /**SCHEMA_CONVERTERS*/{} /**SCHEMA_CONVERTERS*/,
        validators: /**SCHEMA_VALIDATORS*/{} /**SCHEMA_VALIDATORS*/
    };
});
