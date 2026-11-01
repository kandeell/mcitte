/* MCIT Administration Home — V4 (native Creatio Page Title Area; no floating header)
 * Replace the full UsrAdministrationHome_ListPage client schema with this file.
 * Keeps the existing section/object. No test/demo numbers are inserted.
 * Schema uses Creatio's real SysOperationAudit and MCIT user-access objects.
 */
define("UsrAdministrationHome_ListPage", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/,
function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
    "use strict";

    const RUNTIME_KEY = "__usrMCITAdministrationHomeRuntime";
    const ROOT_ID = "usr-mcit-administration-home";
    const STYLE_ID = "usr-mcit-administration-home-styles";
    const ANCHOR = "usr-mcit-admin-dashboard-anchor";
    const NATIVE_TITLE_CLASS = "usr-mcit-admin-native-title";

    // Only the User Directory page code is confirmed in this project.
    // Fill in an EXACT section hash after the relevant colleague's merge.
    const MODULES = [
        {id:"users",       title:"Users",               desc:"Directory, activation & scope",   icon:"users",     tint:"purple", route:"Section/UsrUserDirectory_ListPage"},
        {id:"roles",       title:"Roles",               desc:"Role definitions & assignments", icon:"copy",      tint:"blue",   route:null},
        {id:"permissions", title:"Permissions",         desc:"Permission sets by role",        icon:"edit",      tint:"cyan",   route:null},
        {id:"scopes",      title:"Access Scopes",       desc:"Contract & authority scope rules",icon:"eye",       tint:"green",  route:null},
        {id:"workflows",   title:"Workflows",           desc:"Request workflow definitions",   icon:"check",     tint:"purple", route:null},
        {id:"sla",         title:"SLA & Escalations",   desc:"SLA policies and escalation rules",icon:"clock",     tint:"orange", route:null},
        {id:"notifications",title:"Notifications",     desc:"Events, templates & delivery",   icon:"bell",      tint:"red",    route:null},
        {id:"lookups",     title:"Lookup Data",         desc:"Reference lists & enumerations", icon:"filter",    tint:"gray",   route:null},
        {id:"resources",   title:"Resource Catalog",    desc:"VM specs & billing options",     icon:"monitor",   tint:"cyan",   route:null},
        {id:"reports",     title:"Report Catalog",      desc:"Managed reports & exports",      icon:"file",      tint:"purple", route:null},
        {id:"audit",       title:"Audit Log",           desc:"Full administrative audit trail", icon:"history",   tint:"gray",   route:null},
        {id:"signin",      title:"Sign-in Screen",      desc:"Auth screen configuration",      icon:"link",      tint:"purple", route:null},
        {id:"states",      title:"Access States",       desc:"Locked, suspended & denied flows",icon:"x",         tint:"red",    route:null},
        {id:"designer",    title:"Workflow Designer",   desc:"Visual workflow editor",        icon:"edit",      tint:"blue",   route:null}
    ];

    const METRICS = [
        {id:"active", title:"Active Users", icon:"gear", tint:"green"},
        {id:"inactive", title:"Inactive / Deactivated", icon:"x", tint:"red"},
        {id:"roles", title:"Roles", icon:"copy", tint:"purple"},
        {id:"multi", title:"Users with Multiple Roles", icon:"gear", tint:"blue"},
        {id:"workflows", title:"Active Workflows", icon:"check", tint:"green"},
        {id:"sla", title:"Active SLA Policies", icon:"clock", tint:"orange"},
        {id:"failures", title:"Failed Notifications", icon:"bell", tint:"red"},
        {id:"changes", title:"Recent Admin Changes", icon:"file", tint:"gray"}
    ];

    const ICON_PATHS = {
        users:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 11a3 3 0 1 0-1-5M17 16a5 5 0 0 1 4 5"/>',
        gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l-1.9 1.9a1.7 1.7 0 0 0-1.88-.34l-1.1.45-.7 2.11h-2.7l-.7-2.11-1.1-.45a1.7 1.7 0 0 0-1.88.34l-1.9-1.9A1.7 1.7 0 0 0 4.6 15l-.45-1.1L2 13.2v-2.7l2.15-.7L4.6 8.7a1.7 1.7 0 0 0-.34-1.88l1.9-1.9a1.7 1.7 0 0 0 1.88.34l1.1-.45L9.84 2h2.7l.7 2.11 1.1.45a1.7 1.7 0 0 0 1.88-.34l1.9 1.9a1.7 1.7 0 0 0-.34 1.88l.45 1.1L21 9.8v2.7l-2.11.7z"/>',
        x:'<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6m0-6-6 6"/>',
        copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
        edit:'<rect x="3" y="5" width="15" height="16" rx="2"/><path d="m10 15 9-9 2 2-9 9-4 1z"/>',
        eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
        check:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="m9 13 2 2 4-4M9 4V2h6v2"/>',
        clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/>',
        bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 9h18c0-1-3-2-3-9M10 21h4"/>',
        filter:'<path d="M3 4h18l-7 8v7l-4 2v-9z"/>',
        monitor:'<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M12 18v3m-5 0h10"/>',
        file:'<path d="M6 2h8l5 5v14H6zM14 2v5h5M9 12h7m-7 4h7"/>',
        history:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
        link:'<rect x="4" y="5" width="14" height="15" rx="2"/><path d="M10 14 21 3m-6 0h6v6"/>',
        download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>'
    };

    function icon(name) {
        return '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">'+(ICON_PATHS[name]||ICON_PATHS.file)+'</svg>';
    }
    function esc(v) {
        return String(v === null || v === undefined ? "" : v)
            .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
            .replace(/\"/g,"&quot;").replace(/'/g,"&#39;");
    }
    function val(value) {
        if (value === null || value === undefined) return "";
        if (typeof value === "object") return String(value.displayValue || value.Name || value.name || value.value || "");
        return String(value);
    }
    function state(value) {
        const raw=val(value).trim().toLowerCase();
        const id=String(value?.value || "").toLowerCase();
        if(raw==="active" || id==="4ee823ca-22a2-4291-9dda-4c32f52aba0f") return "active";
        if(raw==="deactivated" || id==="e535941b-12df-4d6e-b4a5-39b6da20b6eb") return "deactivated";
        if(raw==="inactive") return "inactive";
        return "unknown";
    }
    // Important: SDK Date fields can be actual Date instances or {value: Date}.
    // val(Date) loses the value; preserve the original raw date like User Profile V18.
    function dateMs(value) {
        let candidate=value;
        for(let i=0;i<3 && candidate && typeof candidate==="object" && !(candidate instanceof Date);i++) {
            candidate=candidate.value ?? candidate.displayValue ?? null;
        }
        if(candidate===null || candidate===undefined || candidate==="") return 0;
        if(typeof candidate==="string") {
            const oldFormat=candidate.match(/^\/Date\((-?\d+)(?:[+-]\d+)?\)\/$/);
            if(oldFormat) candidate=Number(oldFormat[1]);
        }
        const ms=new Date(candidate).getTime();
        return Number.isFinite(ms)?ms:0;
    }
    function dateText(value) {
        const ms=dateMs(value);
        if(!ms) return "—";
        return new Date(ms).toLocaleString("en-GB",{
            day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"
        });
    }
    // Record is derived only when an actual target appears in the audit description;
    // SysOperationAudit does not expose a universal business-record column here.
    function auditRecord(description) {
        const desc=val(description).trim();
        let match=desc.match(/^User\s+.+?\s+(?:added to|removed from|excluded from)\s+role\s+(.+?)\s*\.?$/i);
        if(match) return match[1].trim();
        match=desc.match(/\b(?:record|request|task)\s*(?:id\s*)?(?:#|:)?\s*([A-Za-z]+-[A-Za-z0-9-]+)\b/i);
        return match ? match[1] : "—";
    }
    function auditAction(row) {
        const desc=row.description||"";
        if(/^User\s+.+?\s+added to\s+role\s+/i.test(desc))return "Add role";
        if(/^User\s+.+?\s+(?:removed from|excluded from)\s+role\s+/i.test(desc))return "Remove role";
        return row.type||"Audit event";
    }
    function auditModule(type) {
        const t=String(type||"");
        if(/role|organiz/i.test(t))return "Roles & Access";
        if(/session|authoriz|authentic/i.test(t))return "Authentication";
        if(/permission/i.test(t))return "Access Management";
        if(/setting/i.test(t))return "System Settings";
        return t||"System Audit";
    }
    // KPI: actual number of identifiable admin changes over the last 30 days,
    // excluding normal sign-ins / authorization / session events.
    function isAdministrativeChange(row) {
        const type=val(row.Type).toLowerCase();
        const desc=val(row.Description).toLowerCase();
        if(/session|authoriz|authentic|sign[ -]?in|log[ -]?in|log[ -]?out|logon|logoff/.test(type))return false;
        if(/role|organiz|permission|setting|configur|admin|user status|management|access rule|change/.test(type))return true;
        return /added to role|removed from role|excluded from role|created|updated|modified|deleted|deactivated|activated|assigned|revoked|changed|granted/.test(desc);
    }
    async function countRecentAdminChanges(runtime, metric, message) {
        const model=await sdk.Model.create("SysOperationAudit");
        const pageSize=250;
        const maxPages=80; // bound client-side work; never present a truncated count as exact
        const cutoff=Date.now()-30*24*60*60*1000;
        let count=0;
        const ids=new Set();
        let complete=false;
        for(let page=0;page<maxPages;page++) {
            if(runtime.disposed)return;
            const items=await model.load({
                attributes:["Id","Date","Type","Description"],
                options:{pagingConfig:{rowsOffset:page*pageSize,rowCount:pageSize},
                         sortingConfig:{columns:[{columnName:"Date",direction:"desc"}]}}
            });
            if(runtime.disposed)return;
            if(!Array.isArray(items))throw new Error("Invalid audit count response");
            let reachedOlder=false;
            for(const row of items) {
                const id=val(row.Id);
                if(id&&ids.has(id))continue;
                if(id)ids.add(id);
                const time=dateMs(row.Date);
                // Missing dates are excluded; they cannot be verified as recent.
                if(!time)continue;
                if(time<cutoff){reachedOlder=true;break;}
                if(isAdministrativeChange(row))count++;
            }
            if(items.length<pageSize||reachedOlder){complete=true;break;}
        }
        if(complete){
            metric("changes",count);
            const el=runtime.root?.querySelector('[data-metric="changes"]');
            if(el)el.parentElement?.parentElement?.setAttribute("title","Actual number of readable administrative change events in SysOperationAudit during the last 30 days; authentication/session events excluded.");
        } else {
            message("Recent Admin Changes count exceeds the safe scan limit; no partial count is displayed.");
        }
    }
    function csvEscape(v) { return '"'+String(v??"").replace(/"/g,'""')+'"'; }

    const CSS = `
    .usr-mcit-admin-outer{display:block;width:100%;grid-column:1/-1;min-width:0;box-sizing:border-box}
    .usr-mcit-admin-root{--mcit-border:#e4e0f5;--mcit-text:#16213e;--mcit-muted:#7585a1;max-width:1180px;margin:0 auto;padding:0 12px 46px;position:static;box-sizing:border-box;color:var(--mcit-text);font-family:inherit;font-size:13px}
    .usr-mcit-admin-root *{box-sizing:border-box}
    .usr-mcit-admin-root h1,.usr-mcit-admin-root h2,.usr-mcit-admin-root h3,.usr-mcit-admin-root p{margin:0}
    /* Real Creatio TitleContainer (inside MainHeader), not a fabricated header in the dashboard. */
    .usr-mcit-admin-native-title{display:flex!important;flex:1 1 auto!important;min-width:0!important;width:100%!important;max-width:none!important;overflow:visible!important;align-items:stretch!important}
    .usr-mcit-admin-native-title .usr-mcit-admin-original-title-hidden{display:none!important}
    .usr-mcit-admin-native-toolbar{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;width:100%;max-width:1180px;margin:0 auto;padding:4px 12px 12px;min-width:0;position:static;overflow:visible}
    .usr-mcit-admin-native-toolbar h1{font-size:25px!important;line-height:1.25!important;font-weight:750!important;letter-spacing:-.7px!important;color:#111a38!important;margin:0!important;padding:0!important}
    .usr-mcit-admin-native-toolbar .usr-mcit-admin-sub{font-size:12px;color:#7b8aa7;margin-top:5px;line-height:1.45}
    .usr-mcit-admin-native-toolbar .usr-mcit-admin-title-text{min-width:0}
    .usr-mcit-admin-export,.usr-mcit-admin-open,.usr-mcit-admin-view{background:#fff;border:1px solid #dce1ef;border-radius:10px;color:#162447;font-size:12px;cursor:pointer;transition:background .16s,border-color .16s}
    .usr-mcit-admin-export{height:38px;min-width:103px;padding:9px 16px;display:inline-flex;align-items:center;justify-content:center;gap:8px;flex:0 0 auto;white-space:nowrap;line-height:1.2;font-weight:600;overflow:visible}
    .usr-mcit-admin-export:hover,.usr-mcit-admin-open:hover,.usr-mcit-admin-view:hover{background:#f5f0ff;border-color:#8a4bf2}
    .usr-mcit-admin-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:30px}
    .usr-mcit-admin-stat{height:79px;background:#fff;border:1px solid var(--mcit-border);border-radius:12px;padding:15px;display:flex;gap:13px;align-items:center;box-shadow:0 2px 5px rgba(54,35,95,.025)}
    .usr-mcit-admin-icon{width:37px;height:37px;display:flex;align-items:center;justify-content:center;border-radius:9px;flex:0 0 37px}
    .usr-mcit-admin-icon.purple{background:#f1e9ff;color:#7945ef}.usr-mcit-admin-icon.blue{background:#e9efff;color:#477af4}.usr-mcit-admin-icon.green{background:#e9f8f0;color:#20b16d}.usr-mcit-admin-icon.orange{background:#fff3e8;color:#ec8b0d}.usr-mcit-admin-icon.red{background:#ffebed;color:#f44d53}.usr-mcit-admin-icon.cyan{background:#e5f7fc;color:#11a4c5}.usr-mcit-admin-icon.gray{background:#eef0f5;color:#67788a}
    .usr-mcit-admin-stat-num{font-weight:750;font-size:24px;line-height:1.2;color:#13172f;font-variant-numeric:tabular-nums}
    .usr-mcit-admin-stat-name{font-size:11.5px;color:#7a879f;margin-top:4px}
    .usr-mcit-admin-root .usr-mcit-admin-section-title{font-size:14px;font-weight:750;margin:0 0 13px}
    .usr-mcit-admin-modules{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px;margin-bottom:22px}
    .usr-mcit-admin-module{min-height:93px;background:#fff;border:1px solid var(--mcit-border);border-radius:11px;padding:13px;position:relative;display:flex;gap:12px;box-shadow:0 2px 5px rgba(54,35,95,.025)}
    .usr-mcit-admin-module-title{font-size:12px;font-weight:750;margin-top:2px;line-height:1.35}
    .usr-mcit-admin-module-desc{font-size:11px;color:#8c99ae;line-height:1.5;margin-top:3px;padding-right:12px}
    .usr-mcit-admin-open{position:absolute;right:12px;bottom:11px;padding:6px 12px;font-size:11px;font-weight:600}
    .usr-mcit-admin-bottom{display:grid;grid-template-columns:minmax(0,2.5fr) minmax(270px,1fr);gap:12px;align-items:start}
    .usr-mcit-admin-panel{background:#fff;border:1px solid var(--mcit-border);border-radius:11px;overflow:hidden;min-width:0;box-shadow:0 2px 5px rgba(54,35,95,.025)}
    .usr-mcit-admin-panel-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:15px 17px;border-bottom:1px solid #edf0f7}
    .usr-mcit-admin-panel-head h2{font-size:13px;font-weight:750}
    .usr-mcit-admin-view{font-size:11px;padding:7px 12px}
    .usr-mcit-admin-table-wrap{overflow-x:auto;max-width:100%}
    .usr-mcit-admin-table{border-collapse:collapse;width:100%;font-size:11px;text-align:left}
    .usr-mcit-admin-table th{background:#f7f8fc;border-bottom:1px solid #dfe6f1;padding:10px 9px;font-weight:700;white-space:nowrap;color:#63728b}
    .usr-mcit-admin-table td{padding:10px 9px;border-bottom:1px solid #eff1f6;color:#344362;vertical-align:top;line-height:1.4}
    .usr-mcit-admin-table tr:last-child td{border-bottom:none}
    .usr-mcit-admin-table .usr-mcit-admin-small{font-size:10px;color:#697895}
    .usr-mcit-admin-table .usr-mcit-admin-truncate{max-width:200px;white-space:normal;overflow-wrap:anywhere}
    .usr-mcit-admin-status{display:inline-block;border-radius:7px;padding:3px 6px;background:#f2f0fe;color:#7444c0;font-weight:650;font-size:10px}
    .usr-mcit-admin-status.warn{background:#fff2da;color:#9b650e}.usr-mcit-admin-status.fail{background:#ffebed;color:#b93544}.usr-mcit-admin-status.good{background:#e8f9ee;color:#218b48}
    .usr-mcit-admin-note{font-size:10px;color:#8793a9;padding:10px 14px;border-top:1px solid #edf0f7;line-height:1.5}
    .usr-mcit-admin-alerts{padding:13px;display:flex;flex-direction:column;gap:9px}
    .usr-mcit-admin-alert{display:flex;gap:10px;border:1px solid #e6e0fa;border-radius:9px;padding:11px 12px;background:#f8f5ff;align-items:flex-start}
    .usr-mcit-admin-alert.red{border-color:#ffccd1;background:#fff2f3}.usr-mcit-admin-alert.orange{border-color:#ffe2a8;background:#fffaeb}.usr-mcit-admin-alert.purple{border-color:#dcd1fa;background:#f5f1ff}
    .usr-mcit-admin-alert-mark{font-size:14px;font-weight:800;color:#824bee;line-height:1.2}
    .usr-mcit-admin-alert.red .usr-mcit-admin-alert-mark{color:#ed4b52}.usr-mcit-admin-alert.orange .usr-mcit-admin-alert-mark{color:#eb970c}
    .usr-mcit-admin-alert-title{font-weight:730;font-size:12px;color:#253352}
    .usr-mcit-admin-alert-sub{color:#8794a9;font-size:10.5px;line-height:1.4;margin-top:4px}
    .usr-mcit-admin-empty{padding:32px 16px;text-align:center;color:#8794a9;font-size:12px}
    .usr-mcit-admin-footnote{color:#8e9bb1;font-size:11px;padding-top:10px}
    @media(max-width:1300px){.usr-mcit-admin-modules,.usr-mcit-admin-stats{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:850px){.usr-mcit-admin-bottom{grid-template-columns:minmax(0,1fr)}.usr-mcit-admin-root{padding:0 8px 36px}.usr-mcit-admin-native-toolbar{padding:4px 8px 12px}}
    @media(max-width:520px){.usr-mcit-admin-modules,.usr-mcit-admin-stats{grid-template-columns:1fr}.usr-mcit-admin-native-toolbar h1{font-size:21px!important}.usr-mcit-admin-native-toolbar{align-items:center}.usr-mcit-admin-export{min-width:90px;padding:8px 10px}}
    `;

    function makeMetric(m) {
        return `<article class="usr-mcit-admin-stat" title="The dash displays verified counts only; unavailable sources show a dash."><span class="usr-mcit-admin-icon ${m.tint}">${icon(m.icon)}</span><div><div class="usr-mcit-admin-stat-num" data-metric="${m.id}">—</div><div class="usr-mcit-admin-stat-name">${esc(m.title)}</div></div></article>`;
    }
    function makeModule(m) {
        return `<article class="usr-mcit-admin-module"><span class="usr-mcit-admin-icon ${m.tint}">${icon(m.icon)}</span><div><h3 class="usr-mcit-admin-module-title">${esc(m.title)}</h3><div class="usr-mcit-admin-module-desc">${esc(m.desc)}</div></div><button type="button" class="usr-mcit-admin-open" data-module="${m.id}" aria-label="Open ${esc(m.title)}">Open</button></article>`;
    }
    function makeHtml(){
        return `<div class="usr-mcit-admin-root">
            <section aria-label="Administration statistics"><div class="usr-mcit-admin-stats">${METRICS.map(makeMetric).join("")}</div></section>
            <section aria-label="Administration modules"><h2 class="usr-mcit-admin-section-title">Administration Modules</h2><div class="usr-mcit-admin-modules">${MODULES.map(makeModule).join("")}</div></section>
            <section class="usr-mcit-admin-bottom" aria-label="Administration activity and security alerts">
               <article class="usr-mcit-admin-panel"><div class="usr-mcit-admin-panel-head"><h2>Recent Administrative Activity</h2><button class="usr-mcit-admin-view" data-action="audit" type="button">View All</button></div>
                 <div class="usr-mcit-admin-table-wrap"><table class="usr-mcit-admin-table"><thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>Module</th><th>Record</th><th>Outcome</th></tr></thead>
                    <tbody data-audit-body><tr><td colspan="6" class="usr-mcit-admin-empty">Loading audit events...</td></tr></tbody></table></div>
                    <p class="usr-mcit-admin-note" data-audit-note>Source: Creatio SysOperationAudit (latest 8 readable events). The audit log only contains event categories enabled in Creatio.</p></article>
               <article class="usr-mcit-admin-panel"><div class="usr-mcit-admin-panel-head"><h2>Security Alerts</h2></div><div class="usr-mcit-admin-alerts" data-alerts>
                 <div class="usr-mcit-admin-alert orange"><span class="usr-mcit-admin-alert-mark">!</span><div><div class="usr-mcit-admin-alert-title">Checking available alerts</div><div class="usr-mcit-admin-alert-sub">Unavailable alert sources will not be shown as zero incidents.</div></div></div>
               </div></article>
            </section><div class="usr-mcit-admin-footnote" data-status-message aria-live="polite"></div>
        </div>`;
    }

    async function loadRows(schema, columns, count, orderColumn) {
        const model = await sdk.Model.create(schema);
        const options = {pagingConfig:{rowsOffset:0,rowCount:count}};
        if(orderColumn) options.sortingConfig={columns:[{columnName:orderColumn,direction:"desc"}]};
        return await model.load({attributes:columns, options});
    }

    async function refreshData(runtime){
        const root = runtime.root;
        if (!root || runtime.disposed || !root.isConnected) return;
        const metric=(key,value) => {
            const node=root.querySelector(`[data-metric="${key}"]`);
            if(node) node.textContent=String(value);
        };
        const message=(value) => {const el=root.querySelector("[data-status-message]"); if(el) el.textContent=value;};
        // Source: same MCIT User Access object / status values as User Directory.
        const accountsTask=(async()=>{
            try {
                const rows=await loadRows("UsrMCITPortalUserAccess",["Id","UsrUser","UsrUserStatus"],3000);
                if(runtime.disposed) return;
                const statuses=rows.map(r=>state(r.UsrUserStatus));
                if(rows.length>=3000){message("User counts need pagination: the source returned 3,000 or more records.");return;}
                if(statuses.some(s=>s!=="unknown")) {
                    metric("active",statuses.filter(s=>s==="active").length);
                    metric("inactive",statuses.filter(s=>s==="inactive"||s==="deactivated").length);
                    runtime.inactiveUsers=statuses.filter(s=>s==="inactive"||s==="deactivated").length;
                }
                runtime.accountUsers=rows;
                renderAlerts(runtime);
            } catch(e) {console.warn("MCIT admin home: user metrics unavailable",e);}
        })();
        const roleDefinitionsTask=(async()=>{
            try {
                // SysAdminUnitTypeValue = 6 is the native Functional Role type
                // already used by the working MCIT User Directory implementation.
                const f=new sdk.FilterGroup();
                await f.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,"SysAdminUnitTypeValue",6);
                const model=await sdk.Model.create("SysAdminUnit");
                const roleRows=await model.load({
                    attributes:["Id"],
                    parameters:[{type:sdk.ModelParameterType.Filter,value:Object.assign({},f,{items:f.items})}],
                    options:{pagingConfig:{rowsOffset:0,rowCount:3000}}
                });
                if(!runtime.disposed && roleRows.length<3000) metric("roles",roleRows.length);
            } catch(e) {console.warn("MCIT admin home: functional roles total unavailable",e);}
        })();
        const rolesTask=(async()=>{
            try {
                const rows=await loadRows("SysUserInRole",["Id","SysUser","SysRole"],5000);
                if(runtime.disposed || rows.length>=5000) return; // no misleading partial counts
                const byUser=new Map();
                for(const row of rows){
                    const uid=val(row.SysUser?.value || row.SysUser).toLowerCase();
                    const rid=val(row.SysRole?.value || row.SysRole).toLowerCase();
                    if(!uid || !rid) continue;
                    if(!byUser.has(uid)) byUser.set(uid,new Set());
                    byUser.get(uid).add(rid);
                }
                // Count users only among known MCIT portal users once their query is done.
                await accountsTask;
                if(runtime.disposed || !runtime.accountUsers) return;
                const selected=new Set(runtime.accountUsers.map(r=>val(r.UsrUser?.value||r.UsrUser).toLowerCase()));
                let count=0;
                for(const [user,roles] of byUser) if(selected.has(user)&&roles.size>1) count++;
                metric("multi",count);
            } catch(e) {console.warn("MCIT admin home: multiple role metric unavailable",e);}
        })();
        const auditTask=(async()=>{
            try {
                // Exact columns match working User Profile Activity & Audit implementation.
                const rows=await loadRows("SysOperationAudit",["Id","Date","Type","Result","Description","Owner"],8,"Date");
                if(runtime.disposed) return;
                runtime.auditRows=rows.map(r=>({
                    id:val(r.Id), date:r.Date, type:val(r.Type),
                    result:val(r.Result), description:val(r.Description), owner:val(r.Owner)
                }));
                renderAudit(runtime);
                renderAlerts(runtime);
            } catch(e){
                console.warn("MCIT admin home: cannot read SysOperationAudit",e);
                const body=root.querySelector("[data-audit-body]");
                if(body) body.innerHTML='<tr><td colspan="6" class="usr-mcit-admin-empty">Audit log unavailable. Check permissions (CanViewSysOperationAudit) and enabled audit events.</td></tr>';
                message("The dashboard cannot verify audit events with the current permissions.");
                renderAlerts(runtime);
            }
        })();
        const auditCountTask=countRecentAdminChanges(runtime,metric,message).catch(e=>{
            console.warn("MCIT admin home: exact recent change count unavailable",e);
            message("Recent Admin Changes count unavailable with current audit permissions.");
        });
        await Promise.allSettled([accountsTask,roleDefinitionsTask,rolesTask,auditTask,auditCountTask]);
    }

    function renderAudit(runtime) {
        const tbody=runtime.root?.querySelector("[data-audit-body]");
        if(!tbody) return;
        const rows=runtime.auditRows||[];
        if(!rows.length){tbody.innerHTML='<tr><td colspan="6" class="usr-mcit-admin-empty">No readable audit events found.</td></tr>';return;}
        tbody.innerHTML=rows.slice(0,8).map(e=>{
            const result=e.result||"Not specified";
            const status=/denied|fail|error|reject/i.test(result)?"fail":/success|complete|allow|authoriz/i.test(result)?"good":"warn";
            // Same role-target extraction and native Date handling as the User Profile audit tab.
            return `<tr title="${esc(e.description)}"><td class="usr-mcit-admin-small">${esc(dateText(e.date))}</td>
                <td>${esc(e.owner||"—")}</td><td>${esc(auditAction(e))}</td><td>${esc(auditModule(e.type))}</td>
                <td>${esc(auditRecord(e.description))}</td><td><span class="usr-mcit-admin-status ${status}">${esc(result)}</span></td></tr>`;
        }).join("");
    }

    function renderAlerts(runtime) {
        const el=runtime.root?.querySelector("[data-alerts]");
        if(!el) return;
        const rows=runtime.auditRows||[];
        const denied=rows.filter(x=>/denied|access denied|authorization denied/i.test(x.result+" "+x.description));
        const userN=runtime.inactiveUsers;
        const last=rows[0];
        const cards=[
            {color:"red", title:"Failed Notifications: not connected", sub:"Connect notification delivery history to show verified failures."},
            {color:"orange", title:runtime.auditRows?`${denied.length} denied events in loaded audit sample`:"Denied Access Attempts: unverified",
             sub:runtime.auditRows?"Counted in the latest 8 readable audit events only.":"Audit log must be accessible to verify denied access."},
            {color:"orange", title:userN===undefined?"Inactive / Deactivated Users: unverified":`${userN} inactive / deactivated ${userN===1?'user':'users'}`,
             sub:userN===undefined?"MCIT user access source not available.":"Calculated from live MCIT portal user status."},
            {color:"purple", title:"Last Admin Action", sub:last?`${last.owner||"User unavailable"} · ${last.type||"Audit event"} · ${dateText(last.date)}`:"Not available in audit data."},
            {color:"purple", title:"Notification Events: not connected", sub:"Configure a reliable notification-events source to display a count.", action:"notifications"}
        ];
        el.innerHTML=cards.map(a=>`<div class="usr-mcit-admin-alert ${a.color}"><span class="usr-mcit-admin-alert-mark">${a.color==="purple"?"ⓘ":"!"}</span><div style="flex:1"><div class="usr-mcit-admin-alert-title">${esc(a.title)}</div><div class="usr-mcit-admin-alert-sub">${esc(a.sub)}</div></div>${a.action?'<button type="button" class="usr-mcit-admin-view" data-module="'+esc(a.action)+'">View</button>':''}</div>`).join("");
    }

    function exportCsv(runtime) {
        if(!runtime.auditRows || !runtime.auditRows.length) {
            window.alert("There are no readable audit events to export.");return;
        }
        const matrix=[["Timestamp","User","Action","Module","Record","Outcome","Description"]];
        for(const row of runtime.auditRows) matrix.push([dateText(row.date),row.owner,auditAction(row),auditModule(row.type),auditRecord(row.description),row.result,row.description]);
        const csv='\uFEFF'+matrix.map(a=>a.map(csvEscape).join(",")).join("\r\n");
        const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
        const a=document.createElement("a");a.href=url;a.download="MCIT_Administration_Audit_Recent.csv";
        document.body.appendChild(a);a.click();a.remove();
        setTimeout(()=>URL.revokeObjectURL(url),1000);
    }

    function navigate(module) {
        if(module?.route){ window.location.hash=module.route; return; }
        const title=module?.title || "Audit Log";
        window.alert(title+" — button ready. Destination is pending the corresponding screen / colleague merge. Add its actual section route in MODULES before enabling navigation.");
    }

    // Mount inside Creatio's existing TitleContainer; DO NOT move it or add a new page header.
    // The native TitleContainer may render after the dashboard anchor, so we retry independently.
    function ensureNativeTitle(runtime) {
        if(runtime.disposed || !String(window.location.hash||"").includes("UsrAdministrationHome")) return false;
        const container=document.querySelector("."+NATIVE_TITLE_CLASS);
        if(!container || !container.isConnected) return false;
        if(runtime.nativeTitle && runtime.nativeTitle.isConnected && runtime.nativeTitle.parentElement===container) return true;
        if(runtime.nativeTitle) runtime.nativeTitle.remove();
        // The section's default caption is "Administration Home"; replace its *display only*
        // with the requested Figma caption, without altering the section code or data source.
        runtime.hiddenNativeTitle=[];
        Array.from(container.children).forEach(child=>{
            if(child.classList.contains("usr-mcit-admin-native-toolbar")) return;
            child.classList.add("usr-mcit-admin-original-title-hidden");
            runtime.hiddenNativeTitle.push(child);
        });
        const title=document.createElement("div");
        title.className="usr-mcit-admin-native-toolbar";
        title.innerHTML='<div class="usr-mcit-admin-title-text"><h1>Administration</h1><p class="usr-mcit-admin-sub">System configuration and access management</p></div>'+
            '<button type="button" class="usr-mcit-admin-export" aria-label="Export administration audit activity as CSV">'+icon("download")+'<span>Export</span></button>';
        const button=title.querySelector("button");
        button.addEventListener("click",()=>{
            if(!runtime.disposed) exportCsv(runtime);
        });
        container.appendChild(title);
        runtime.nativeTitle=title;
        // Reattach when Creatio re-renders only its native title area.
        if(!runtime.titleObserver && typeof MutationObserver !== "undefined") {
            const host=container.parentElement;
            if(host){
                runtime.titleObserver=new MutationObserver(()=>{
                    if(!runtime.disposed && runtime.root?.isConnected &&
                       (!runtime.nativeTitle || !runtime.nativeTitle.isConnected)) {
                        ensureNativeTitle(runtime);
                    }
                });
                runtime.titleObserver.observe(host,{childList:true,subtree:true});
            }
        }
        return true;
    }

    function bootstrap(runtime) {
        if(runtime.disposed || typeof document==="undefined") return;
        // Navigation safety: never mount into another section.
        if(!String(window.location.hash||"").includes("UsrAdministrationHome")) return;
        const existing=document.getElementById(ROOT_ID);
        if(existing) {runtime.root=existing;ensureNativeTitle(runtime);return;}
        const anchor=document.querySelector("."+ANCHOR);
        if(!anchor || !anchor.parentNode) return;
        if(!document.getElementById(STYLE_ID)){
            const sheet=document.createElement("style");sheet.id=STYLE_ID;sheet.textContent=CSS;
            document.head.appendChild(sheet);
        }
        const root=document.createElement("div");root.id=ROOT_ID;root.className="usr-mcit-admin-outer";
        root.innerHTML=makeHtml();
        anchor.insertAdjacentElement("afterend",root);
        anchor.style.display="none";
        runtime.root=root;
        ensureNativeTitle(runtime);
        root.addEventListener("click", e=>{
            const target=e.target.closest("button");if(!target)return;
            if(target.dataset.module) {
                const module=MODULES.find(m=>m.id===target.dataset.module);navigate(module);
            } else if(target.dataset.action==="audit") navigate(MODULES.find(m=>m.id==="audit"));
            else if(target.dataset.action==="export") exportCsv(runtime);
        });
        refreshData(runtime).catch(e=>console.warn("MCIT Administration Home data refresh",e));
    }

    return {
        viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
            {"operation":"merge","name":"AddButton","values":{"visible":false}},
            {"operation":"merge","name":"DataImportButton","values":{"visible":false}},
            {"operation":"merge","name":"TitleContainer","values":{
                "visible":true,"classes":["usr-mcit-admin-native-title"],"direction":"column",
                "alignItems":"stretch","gap":"none",
                "padding":{"top":"none","right":"none","bottom":"none","left":"none"}
            }},
            {"operation":"merge","name":"MainFilterContainer","values":{"visible":false}},
            {"operation":"merge","name":"DataTable","values":{"visible":false}},
            {"operation":"merge","name":"Dashboards","values":{"visible":false}},
            {"operation":"merge","name":"FolderTree","values":{"visible":false}},
            {"operation":"insert","name":"UsrMCITAdministrationHomeAnchor","values":{
                "type":"crt.FlexContainer","classes":[ANCHOR],"direction":"column",
                "fitContent":true,"items":[{"type":"crt.Label","caption":"Loading Administration Home...","labelType":"body","visible":true}],"visible":true
            },"parentName":"SectionContentWrapper","propertyName":"items","index":0},
            {"operation":"merge","name":"MenuItem_ImportFromExcel","values":{
                "clicked":{"request":"crt.ImportDataRequest","params":{"entitySchemaName":"UsrAdministrationHome"}}
            }}
        ]/**SCHEMA_VIEW_CONFIG_DIFF*/,
        viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
        modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
            {"operation":"merge","path":["dataSources","PDS","config"],"values":{"entitySchemaName":"UsrAdministrationHome"}}
        ]/**SCHEMA_MODEL_CONFIG_DIFF*/,
        handlers: /**SCHEMA_HANDLERS*/[
            {"request":"crt.HandleViewModelInitRequest","handler":async(request,next)=>{
                const result=await next?.handle(request);
                if(typeof document==="undefined")return result;
                // Replacing an old runtime prevents duplicate observers and event handlers.
                if(document[RUNTIME_KEY]?.dispose)document[RUNTIME_KEY].dispose();
                const runtime={disposed:false,root:null,auditRows:null,inactiveUsers:undefined,accountUsers:null};
                runtime.dispose=()=>{
                    runtime.disposed=true;
                    if(runtime.observer)runtime.observer.disconnect();
                    if(runtime.titleObserver)runtime.titleObserver.disconnect();
                    if(runtime.retryTimer)clearInterval(runtime.retryTimer);
                    if(runtime.nativeTitle)runtime.nativeTitle.remove();
                    (runtime.hiddenNativeTitle||[]).forEach(el=>el.classList.remove("usr-mcit-admin-original-title-hidden"));
                    if(runtime.root)runtime.root.remove();
                    const css=document.getElementById(STYLE_ID);if(css)css.remove();
                    if(document[RUNTIME_KEY]===runtime)delete document[RUNTIME_KEY];
                };
                document[RUNTIME_KEY]=runtime;
                let attempts=0;
                const attempt=()=>{if(runtime.disposed)return;
                    bootstrap(runtime);ensureNativeTitle(runtime);attempts++;
                    if((runtime.root && runtime.nativeTitle && runtime.nativeTitle.isConnected) || attempts>100){if(runtime.retryTimer)clearInterval(runtime.retryTimer);runtime.retryTimer=null;}
                };
                attempt();
                if(!runtime.root)runtime.retryTimer=setInterval(attempt,200);
                return result;
            }},
            {"request":"crt.HandleViewModelDestroyRequest","handler":async(request,next)=>{
                if(typeof document!=="undefined")document[RUNTIME_KEY]?.dispose?.();
                return next?.handle(request);
            }}
        ]/**SCHEMA_HANDLERS*/,
        converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
        validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
    };
});
