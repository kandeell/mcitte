
/* MCIT Report Viewer — polished Figma layout, stable V15.2 data and navigation
 * Standalone page schema: UsrReportViewer
 * Opens from the existing UsrReportParameters V14 `crt.OpenPageRequest`.
 * Filters arrive via same-tab sessionStorage: MCIT.ReportParameters.PendingRun.v1.
 * Sources verified against Realese: UsrVMRequest, UsrProject, UsrMCITRequestStatus.
 * Optional fields: UsrVMRequest.UsrRequestType (lookup), UsrVMRequest.UsrSLAStatus (text).
 * SLA column is a snapshot/label, NOT an SLA engine: status calculation must run server-side.
 * Authority selection is filtered locally only for dev testing; enforce server-side in production.
 * Uses real request records and real chart totals. Never inserts Figma demo data.
 *
 * IMPORTANT SECURITY LIMITATION:
 * sdk.Model.load observes the logged-in user's Creatio object/record rights.
 * It does NOT establish the separate MCIT authority/contract/reporting scope policy.
 * Configure server-enforced MCIT scope checks before deploying to normal users.
 * Excel export is CSV (Excel-compatible), not native XLSX. PDF uses browser Print.
 * Both actions use only the rows read from the same filtered query.
 *
 * Layout: runtime hybrid DOM inside one scoped native FlexContainer.
 * No placeholder label is rendered outside the designed report.
 */
define("UsrReportViewer", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/,
function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
  "use strict";

  const STAGE_CLASS = "usr-mcit-rv-stage";
  const ROOT_ID = "usr-mcit-rv-root";
  const STYLE_ID = "usr-mcit-rv-style-final-v1";
  const STORAGE_KEY = "MCIT.ReportParameters.PendingRun.v1";
  const PAGE_SCHEMA = "UsrReportViewer";
  const PAGE_LIMIT = 200;
  const MAX_ROWS = 3000;
  const STATUS_ORDER = [
    "Draft", "Submitted", "Under TE Review", "Requires Correction",
    "Provisioning in Progress", "Completed", "Rejected"
  ];

  const STYLE = `
  /* All styles are scoped to the Report Viewer stage; never modify Creatio's shell. */
  .${STAGE_CLASS}{
    --rv-bg:#F8F7FF;--rv-primary:#5B21A5;--rv-accent:#7633D6;
    --rv-text:#201631;--rv-muted:#71788A;--rv-line:#E8E5F0;
    width:100%!important;max-width:none!important;min-width:0!important;
    height:calc(100vh - 52px)!important;height:calc(100dvh - 52px)!important;
    max-height:calc(100dvh - 52px)!important;min-height:0!important;
    overflow-y:auto!important;overflow-x:hidden!important;
    padding:30px 28px 88px!important;display:block!important;
    box-sizing:border-box;background:var(--rv-bg)!important;
    overscroll-behavior-y:contain;-webkit-overflow-scrolling:touch;
    scrollbar-gutter:stable;
  }
  .${STAGE_CLASS},.${STAGE_CLASS} *{box-sizing:border-box}
  .${STAGE_CLASS} .usr-rv-native-preview{display:none!important}
  .${STAGE_CLASS} .usr-rv-root{
    width:100%;max-width:1120px;min-width:0;margin:0 auto;
    color:var(--rv-text);font-family:Rubik,Inter,Arial,sans-serif;
    font-size:14px;line-height:1.5;
  }
  .${STAGE_CLASS} .usr-rv-root button{font:inherit;cursor:pointer}
  .${STAGE_CLASS} .usr-rv-top{display:flex;align-items:center;justify-content:space-between;
    gap:12px;flex-wrap:wrap;margin-bottom:20px}
  .${STAGE_CLASS} .usr-rv-back{
    color:#697187;font-size:13px;font-weight:600;border:0;background:transparent;
    padding:6px 0;display:inline-flex;align-items:center;gap:8px;
  }
  .${STAGE_CLASS} .usr-rv-back:hover{color:var(--rv-primary)}
  .${STAGE_CLASS} .usr-rv-heading{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:3px}
  .${STAGE_CLASS} h1{margin:0;color:var(--rv-text);font-size:28px;line-height:1.28;
    font-weight:800;letter-spacing:-.6px}
  .${STAGE_CLASS} .usr-rv-meta-pill{display:inline-flex;align-items:center;justify-content:center;
    background:#F5F0FF;border:1px solid #E4D6FA;color:#6320AD;border-radius:999px;
    padding:4px 12px;font-size:12px;line-height:1.3;font-weight:650}
  .${STAGE_CLASS} .usr-rv-subtitle{font-size:14px;color:#707589;margin:5px 0 10px}
  .${STAGE_CLASS} .usr-rv-meta-lines{display:flex;flex-direction:column;gap:2px;margin-top:4px}
  .${STAGE_CLASS} .usr-rv-when{margin:0;color:#85899A;font-size:12px}
  .${STAGE_CLASS} .usr-rv-notice{
    border:1px solid #C4DDF8;background:#F0F7FF;border-radius:11px;color:#356EBA;
    margin:18px 0 20px;padding:14px 17px;line-height:1.55;font-size:13px;
    display:flex;gap:11px;align-items:flex-start;
  }
  .${STAGE_CLASS} .usr-rv-notice .usr-rv-info-icon{
    display:inline-flex;align-items:center;justify-content:center;flex:none;
    border:1.5px solid currentColor;border-radius:50%;height:17px;width:17px;
    font-size:11px;font-weight:800;margin-top:1px;
  }
  .${STAGE_CLASS} .usr-rv-notice.warning{border-color:#EDD7AB;background:#FFF9ED;color:#825F22}
  .${STAGE_CLASS} .usr-rv-actions{display:flex;justify-content:flex-end;align-items:center;
    gap:9px;flex-wrap:wrap;margin:0 0 20px}
  .${STAGE_CLASS} .usr-rv-btn{display:inline-flex;align-items:center;justify-content:center;
    gap:8px;padding:10px 16px;min-height:40px;border-radius:10px;
    border:1px solid #E2DFEA;background:#FFFFFF;color:#434051;
    font-size:12px;font-weight:700;white-space:nowrap;
    transition:background .15s,border-color .15s,transform .15s;
  }
  .${STAGE_CLASS} .usr-rv-btn:hover:not(:disabled){background:#F8F4FF;border-color:#CBB6E9}
  .${STAGE_CLASS} .usr-rv-btn:active:not(:disabled){transform:translateY(1px)}
  .${STAGE_CLASS} .usr-rv-btn.primary{color:#FFFFFF;background:var(--rv-primary);border-color:var(--rv-primary)}
  .${STAGE_CLASS} .usr-rv-btn.primary:hover:not(:disabled){background:#6F2BD1}
  .${STAGE_CLASS} .usr-rv-btn:focus-visible,.${STAGE_CLASS} .usr-rv-back:focus-visible{
    outline:2px solid #9D71DE;outline-offset:2px}
  .${STAGE_CLASS} .usr-rv-btn:disabled{opacity:.48;cursor:not-allowed}
  .${STAGE_CLASS} .usr-rv-metrics{
    display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:10px;margin:0 0 21px;
  }
  .${STAGE_CLASS} .usr-rv-metric{
    min-height:100px;padding:16px 9px;background:#F4EFFF;border:1px solid #ECE7F4;
    border-radius:13px;display:flex;flex-direction:column;align-items:center;
    justify-content:center;text-align:center;
  }
  .${STAGE_CLASS} .usr-rv-metric strong{font-size:28px;line-height:1.1;
    font-weight:800;color:var(--rv-primary);font-variant-numeric:tabular-nums}
  .${STAGE_CLASS} .usr-rv-metric span{font-size:11px;color:#676D7C;margin-top:8px;
    line-height:1.3;overflow-wrap:anywhere}
  .${STAGE_CLASS} .usr-rv-metric.tone-draft{background:#F3F4F6}
  .${STAGE_CLASS} .usr-rv-metric.tone-review{background:#EEF5FF}
  .${STAGE_CLASS} .usr-rv-metric.tone-return{background:#FFF8E8}
  .${STAGE_CLASS} .usr-rv-metric.tone-provision{background:#F4EEFF}
  .${STAGE_CLASS} .usr-rv-metric.tone-complete{background:#EAFBF2}
  .${STAGE_CLASS} .usr-rv-metric.tone-reject{background:#FFF0F0}
  .${STAGE_CLASS} .usr-rv-metric.tone-complete strong{color:#18874E}
  .${STAGE_CLASS} .usr-rv-metric.tone-reject strong{color:#C83B48}
  .${STAGE_CLASS} .usr-rv-panel{
    overflow:hidden;background:#FFF;border:1px solid #E8E5F0;border-radius:15px;
    margin-bottom:18px;box-shadow:0 2px 6px rgba(35,19,64,.035);
  }
  .${STAGE_CLASS} .usr-rv-panel-header{
    padding:17px 20px;color:#241936;font-size:15px;font-weight:750;
    border-bottom:1px solid #F0EDF5;
  }
  .${STAGE_CLASS} .usr-rv-panel-body{padding:22px 21px 26px}
  .${STAGE_CLASS} .usr-rv-bars{
    display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:15px;
    min-height:252px;align-items:end;
    background:repeating-linear-gradient(to top,transparent 0,transparent 38px,#F5F2F8 39px,#F5F2F8 40px);
    background-size:100% 200px;background-repeat:no-repeat;background-position:top left;
  }
  .${STAGE_CLASS} .usr-rv-bar-cell{
    display:flex;flex-direction:column;align-items:center;justify-content:flex-end;
    height:237px;min-width:0;text-align:center;
  }
  .${STAGE_CLASS} .usr-rv-bar-value{font-size:13px;line-height:18px;font-weight:800;
    color:#5621A6;margin-bottom:5px}
  .${STAGE_CLASS} .usr-rv-bar{
    width:min(67px,78%);min-height:2px;background:linear-gradient(180deg,#A55BFF,#7832DD);
    border-radius:6px 6px 0 0;
  }
  .${STAGE_CLASS} .usr-rv-bar-label{
    min-height:49px;width:100%;padding-top:10px;
    color:#707588;font-size:11px;line-height:1.28;overflow-wrap:anywhere;
  }
  .${STAGE_CLASS} .usr-rv-authority-list{display:flex;flex-direction:column;gap:15px}
  .${STAGE_CLASS} .usr-rv-authority-row{
    display:grid;grid-template-columns:minmax(110px,200px) minmax(0,1fr) 42px;
    gap:16px;align-items:center;
  }
  .${STAGE_CLASS} .usr-rv-authority-name{
    color:#5F6577;font-size:12px;text-align:right;overflow-wrap:anywhere;line-height:1.4;
  }
  .${STAGE_CLASS} .usr-rv-authority-track{
    min-width:0;min-height:18px;border-radius:5px;background:#F5F1FC;overflow:hidden;
  }
  .${STAGE_CLASS} .usr-rv-authority-fill{
    height:18px;border-radius:5px;background:linear-gradient(90deg,#8B42EE,#7028CE)
  }
  .${STAGE_CLASS} .usr-rv-authority-count{font-size:13px;font-weight:800;color:#5B21A5}
  .${STAGE_CLASS} .usr-rv-table-wrap{width:100%;max-width:100%;overflow-x:auto;scrollbar-width:thin}
  .${STAGE_CLASS} .usr-rv-table{width:100%;min-width:900px;border-collapse:collapse;
    text-align:left;font-size:12px;color:#3E3C4C}
  .${STAGE_CLASS} .usr-rv-table thead{background:#FAF9FD}
  .${STAGE_CLASS} .usr-rv-table th{font-size:11px;color:#6D7384;font-weight:750;
    white-space:nowrap;text-transform:none}
  .${STAGE_CLASS} .usr-rv-table th,.${STAGE_CLASS} .usr-rv-table td{
    padding:13px 12px;border-bottom:1px solid #F0EDF5;vertical-align:middle;
  }
  .${STAGE_CLASS} .usr-rv-table tbody tr:hover{background:#FCFAFF}
  .${STAGE_CLASS} .usr-rv-table tbody tr:last-child td{border-bottom:0}
  .${STAGE_CLASS} .usr-rv-table td{overflow-wrap:anywhere}
  .${STAGE_CLASS} .usr-rv-table .number{font-weight:750;color:#5B21A5;white-space:nowrap}
  .${STAGE_CLASS} .usr-rv-status{
    display:inline-flex;align-items:center;padding:5px 10px;white-space:nowrap;
    border-radius:999px;font-size:10.5px;line-height:1.3;font-weight:750;
    background:#F1E9FF;color:#6828BB;
  }
  .${STAGE_CLASS} .usr-rv-status.st-draft{background:#F0F0F3;color:#515867}
  .${STAGE_CLASS} .usr-rv-status.st-review,.${STAGE_CLASS} .usr-rv-status.st-submitted{
    background:#EAF2FF;color:#3165B5}
  .${STAGE_CLASS} .usr-rv-status.st-correction{background:#FFF3E4;color:#AA6E15}
  .${STAGE_CLASS} .usr-rv-status.st-completed{background:#E9F9EF;color:#13874B}
  .${STAGE_CLASS} .usr-rv-status.st-rejected{background:#FFF0F0;color:#C23D47}
  .${STAGE_CLASS} .usr-rv-empty{padding:42px 22px;text-align:center;color:#74798B;line-height:1.6}
  .${STAGE_CLASS} .usr-rv-empty-illustration{font-size:25px;opacity:.55;margin-bottom:8px}
  .${STAGE_CLASS} .usr-rv-note{font-size:11px;color:#86899A;line-height:1.5;margin:8px 0 0}
  .${STAGE_CLASS} .usr-rv-error{padding:18px 20px;border-radius:11px;
    background:#FFF0F1;border:1px solid #F4C8CF;color:#9D3140;white-space:pre-wrap}
  @media(max-width:1080px){
    .${STAGE_CLASS} .usr-rv-metrics{grid-template-columns:repeat(4,minmax(0,1fr))}
    .${STAGE_CLASS} .usr-rv-root{max-width:960px}
  }
  @media(max-width:700px){
    .${STAGE_CLASS}{padding:20px 14px 60px!important}
    .${STAGE_CLASS} h1{font-size:23px}
    .${STAGE_CLASS} .usr-rv-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}
    .${STAGE_CLASS} .usr-rv-authority-row{grid-template-columns:100px minmax(0,1fr) 25px;gap:8px}
    .${STAGE_CLASS} .usr-rv-bars{gap:5px}
    .${STAGE_CLASS} .usr-rv-bar-label{font-size:9px}
    .${STAGE_CLASS} .usr-rv-panel-body{padding:16px 13px 20px}
    .${STAGE_CLASS} .usr-rv-btn{min-height:38px;padding:8px 11px}
  }
  @media print{
    body .usr-mcit-rv-stage{height:auto!important;min-height:0!important;max-height:none!important;
      overflow:visible!important;background:#FFF!important;padding:0!important}
    body *{visibility:hidden!important}
    body .usr-rv-root,body .usr-rv-root *{visibility:visible!important}
    body .usr-rv-root{position:absolute!important;left:0!important;top:0!important;width:100%!important;
      max-width:none!important;font-size:10px!important}
    body .usr-rv-actions,body .usr-rv-back{display:none!important}
    body .usr-rv-panel{break-inside:avoid;page-break-inside:avoid}
    body .usr-rv-table th,body .usr-rv-table td{padding:6px!important}
    @page{size:A4 landscape;margin:12mm}
  }`;

  function escapeHtml(value) {
    return String(value === undefined || value === null ? "" : value)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }
  function read(value) {
    if (value === undefined || value === null) return null;
    if (typeof value === "object" && !(value instanceof Date)) {
      if (value.displayValue !== undefined && value.displayValue !== null) return value.displayValue;
      return value.value !== undefined ? value.value : value;
    }
    return value;
  }
  function idOf(value) {
    const raw = value && typeof value === "object" ? (value.value ?? value.Id) : value;
    return typeof raw === "string" ? raw.toLowerCase() : (raw || null);
  }
  function shortText(value, fallback) {
    const candidate=read(value);
    const text=String(candidate ?? "").trim();
    return text || (fallback || "—");
  }
  function dayString(raw) {
    const value=read(raw);
    if (!value) return "—";
    const date=new Date(value);
    return Number.isFinite(date.getTime()) ? date.toLocaleDateString("en-GB") : "—";
  }
  function fmtTime(value) {
    return new Date(value).toLocaleString("en-GB",{
      day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"
    });
  }
  function csvValue(value) {
    let text=String(value === null || value === undefined ? "" : value);
    // Prevent spreadsheet formula execution when values originate from user data.
    if (/^[\s\r\n]*[=+@\-]/.test(text)) text="'"+text;
    return '"'+text.replace(/"/g,'""')+'"';
  }
  function downloadCsv(rows) {
    const head=["Request Number","Created On","Contract","Project","Authority","Requester","Status","Estimated Points"];
    const data=rows.map(r=>[
      r.number,dayString(r.created),r.contract,r.project,r.authority,
      r.requester,r.status,r.points === null ? "" : r.points
    ]);
    const text="\uFEFF"+[head,...data].map(line=>line.map(csvValue).join(",")).join("\r\n");
    const blob=new Blob([text],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const link=document.createElement("a");
    link.href=url;link.download="MCIT_Request_Status_"+new Date().toISOString().slice(0,10)+".csv";
    document.body.appendChild(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  function dateBoundary(value,addDay) {
    if (!value) return null;
    const date=new Date(value);
    if (!Number.isFinite(date.getTime())) throw new Error("Invalid report date filter.");
    const midnight=new Date(date.getFullYear(),date.getMonth(),date.getDate());
    if(addDay) midnight.setDate(midnight.getDate()+1);
    return midnight;
  }
  function isGuid(value) {
    return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
  }
  function normalizeParams(raw) {
    const p=raw && typeof raw==="object" ? raw : {};
    for(const key of ["ContractId","ProjectId","RequestStatusId","AuthorityId","RequestTypeId"]){
      if(p[key] && !isGuid(p[key])) throw new Error("Invalid "+key+" parameter.");
    }
    const slaName=p.SLAStatusName || null;
    if(slaName && !["Healthy","Approaching","Overdue"].includes(slaName)) {
      throw new Error("Invalid SLA Status value.");
    }
    const start=dateBoundary(p.DateFrom,false);
    const end=dateBoundary(p.DateTo,true);
    if(start && end && start >= end) throw new Error("Date From must be on or before Date To.");
    return {
      ContractId:p.ContractId || null,ProjectId:p.ProjectId || null,
      RequestStatusId:p.RequestStatusId || null,
      AuthorityId:p.AuthorityId || null,RequestTypeId:p.RequestTypeId || null,
      SLAStatusName:slaName,
      DateFrom:start,DateToExclusive:end
    };
  }
  function formatFilters(p) {
    const s=[];
    if(p.DateFrom)s.push("From "+dayString(p.DateFrom));
    if(p.DateToExclusive){const end=new Date(p.DateToExclusive);end.setDate(end.getDate()-1);s.push("To "+dayString(end));}
    if(p.ContractId)s.push("Contract selected");
    if(p.ProjectId)s.push("Project selected");
    if(p.RequestStatusId)s.push("Status selected");
    if(p.AuthorityId)s.push("Authority selected");
    if(p.RequestTypeId)s.push("Request Type selected");
    if(p.SLAStatusName)s.push("SLA: "+p.SLAStatusName);
    return s.length?s.join(" · "):"All readable requests (no filters)";
  }
  function filterParameter(filter) {
    return [{type:sdk.ModelParameterType.Filter,
      value:Object.assign({},filter,{items:filter.items})}];
  }
  async function makeFilter(params) {
    const fg=new sdk.FilterGroup();let count=0;
    for(const [attr, id] of [
      ["UsrContract",params.ContractId],
      ["UsrProject",params.ProjectId],
      ["UsrStatus",params.RequestStatusId],
      // Authority is filtered using the accessible UsrProject lookup below,
      // avoiding a problematic nested lookup column filter in some SDK versions.
      // Add these two fields through Creatio's Data Models editor, not SQL DDL.
      ["UsrRequestType",params.RequestTypeId],
      ["UsrSLAStatus",params.SLAStatusName]
    ]) {
      if(id){await fg.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,attr,id);count++;}
    }
    if(params.DateFrom){
      const op=sdk.ComparisonType.Greater_or_equal ?? sdk.ComparisonType.GreaterOrEqual ?? sdk.ComparisonType.GreaterThanOrEqual;
      if(op===undefined)throw new Error("Creatio SDK does not expose a supported start-date comparison operator.");
      await fg.addSchemaColumnFilterWithParameter(op,"CreatedOn",params.DateFrom);count++;
    }
    if(params.DateToExclusive){
      if(sdk.ComparisonType.Less===undefined)throw new Error("Creatio SDK does not expose the end-date comparison operator.");
      await fg.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Less,"CreatedOn",params.DateToExclusive);count++;
    }
    return count ? filterParameter(fg) : [];
  }
  async function withTimeout(promise,label,milliseconds=20000) {
    let timeout;
    try {
      return await Promise.race([
        promise,
        new Promise((_,reject)=>{
          timeout=setTimeout(()=>reject(new Error(label+" timed out after "+
            Math.round(milliseconds/1000)+" seconds. Check the browser Network tab.")),
            milliseconds);
        })
      ]);
    } finally {if(timeout) clearTimeout(timeout);}
  }
  async function filterAuthorityProjects(requests,authorityId) {
    // Development-only report filter. For production, run this condition in
    // the secured report service with MCIT contract/authority scope enforcement.
    if(!authorityId || !requests.length) return requests;
    const model=await withTimeout(sdk.Model.create("UsrProject"),"Opening Project data source");
    const ids=new Set();
    for(let offset=0; offset<3000; offset+=200) {
      const chunk=await withTimeout(model.load({
        attributes:["Id","UsrAuthority"],
        options:{pagingConfig:{rowsOffset:offset,rowCount:200}}
      }),"Reading Project authority mappings");
      if(!Array.isArray(chunk))throw new Error("Cannot read Project authority mappings.");
      for(const row of chunk) {
        if(idOf(row.UsrAuthority)===String(authorityId).toLowerCase())
          ids.add(idOf(row.Id));
      }
      if(chunk.length<200)return requests.filter(row=>ids.has(idOf(row.UsrProject)));
    }
    throw new Error("Project lookup exceeded 3000 rows; use a server-side authority filter.");
  }
  async function loadRequests(params) {
    const model=await withTimeout(sdk.Model.create("UsrVMRequest"),"Opening VM Request data source");
    const parameters=await makeFilter(params);
    const data=[];
    for(let offset=0;offset<MAX_ROWS;offset+=PAGE_LIMIT){
      let chunk;
      try {
        chunk=await withTimeout(model.load({
          attributes:["Id","UsrNumber","UsrName","CreatedOn","UsrContract","UsrProject",
            "UsrRequester","UsrStatus","UsrEstimatedPoints"],
          parameters,
          options:{pagingConfig:{rowsOffset:offset,rowCount:PAGE_LIMIT},
            sortingConfig:{columns:[{columnName:"CreatedOn",direction:"desc"}]}}
        }),"Loading filtered VM Requests");
      } catch(error) {
        if(params.RequestTypeId || params.SLAStatusName) {
          throw new Error("Cannot apply selected Request Type/SLA filter. Check that UsrVMRequest has the UsrRequestType lookup and UsrSLAStatus text columns, that they contain data, and that you have access. Detail: " + (error?.message || String(error)));
        }
        throw error;
      }
      if(!Array.isArray(chunk))throw new Error("Unexpected VM request query response.");
      data.push(...chunk);
      if(chunk.length<PAGE_LIMIT) return await filterAuthorityProjects(data,params.AuthorityId);
      if(data.length>=MAX_ROWS) {
        throw new Error("Report matches at least "+MAX_ROWS+" records. Narrow the date range; partial totals are not displayed.");
      }
    }
    throw new Error("Unable to confirm that all matching requests were loaded.");
  }
  async function loadLookupMap(schema, display, max) {
    const model=await sdk.Model.create(schema);
    const result=[];
    const size=200;
    for(let offset=0;offset<max;offset+=size) {
      const chunk=await model.load({attributes:["Id",display],
        options:{pagingConfig:{rowsOffset:offset,rowCount:size}}});
      if(!Array.isArray(chunk)) throw new Error("Invalid "+schema+" response.");
      result.push(...chunk);
      if(chunk.length<size) {
        const map=new Map();
        for(const row of result)map.set(idOf(row.Id),shortText(row[display]));
        return map;
      }
      if(result.length>=max)throw new Error(schema+" lookup exceeds safe query limit.");
    }
    throw new Error("Cannot fully read "+schema+" records.");
  }
  async function projectAuthorityMap(requests) {
    const needs=requests.some(r=>idOf(r.UsrProject));
    if(!needs) return {map:new Map(), available:true};
    try {
      const projectModel=await sdk.Model.create("UsrProject");
      const rows=await projectModel.load({attributes:["Id","UsrAuthority"],
        options:{pagingConfig:{rowsOffset:0,rowCount:1000}}});
      if(!Array.isArray(rows)||rows.length>=1000)throw new Error("Project list incomplete.");
      const map=new Map();
      for(const row of rows)map.set(idOf(row.Id),shortText(row.UsrAuthority,"—"));
      return {map,available:true};
    } catch(error) {
      console.warn("MCIT Report Viewer: authority grouping unavailable",error);
      return {map:new Map(),available:false};
    }
  }
  async function enrichRows(rows) {
    let statusMap=new Map();
    try { statusMap=await loadLookupMap("UsrMCITRequestStatus","Name",1000); }
    catch(error){console.warn("MCIT Report Viewer: request status name fallback unavailable",error);}
    const authorities=await projectAuthorityMap(rows);
    const projected=rows.map(row=>{
      const statusId=idOf(row.UsrStatus);
      const projectId=idOf(row.UsrProject);
      const points=Number(read(row.UsrEstimatedPoints));
      const rawPoint=read(row.UsrEstimatedPoints);
      return {
        number:shortText(row.UsrNumber,shortText(row.UsrName,"—")),
        created:read(row.CreatedOn),
        contract:shortText(row.UsrContract,"—"),
        project:shortText(row.UsrProject,"—"),
        authority:authorities.available ? (authorities.map.get(projectId) || "—") : "—",
        requester:shortText(row.UsrRequester,"—"),
        status:(row.UsrStatus && row.UsrStatus.displayValue) || statusMap.get(statusId) || "Status unavailable",
        points:rawPoint===null || rawPoint==="" || !Number.isFinite(points) ? null : points
      };
    });
    return {rows:projected,authorityAvailable:authorities.available};
  }
  function countsBy(rows,key) {
    const map=new Map();
    for(const row of rows) {
      const label=String(row[key]||"—");
      map.set(label,(map.get(label)||0)+1);
    }
    return map;
  }
  function metricCard(name,value,i) {
    const tones=["","tone-draft","tone-review","tone-review","tone-return",
      "tone-provision","tone-complete","tone-reject"];
    return '<div class="usr-rv-metric '+(tones[i]||"")+'"><strong>'+escapeHtml(value)+
      '</strong><span>'+escapeHtml(name)+'</span></div>';
  }
  function statusChart(counts) {
    const statuses=[...STATUS_ORDER,...[...counts.keys()].filter(k=>!STATUS_ORDER.includes(k))];
    const largest=Math.max(1,...[...counts.values()]);
    return '<div class="usr-rv-bars" style="grid-template-columns:repeat('+statuses.length+',minmax(0,1fr))">'+statuses.map(name=>{
      const value=counts.get(name)||0;
      const height=value===0?2:Math.max(4,Math.round(value/largest*157));
      return '<div class="usr-rv-bar-cell"><div class="usr-rv-bar-value">'+value+
        '</div><div class="usr-rv-bar" style="height:'+height+'px"></div><div class="usr-rv-bar-label">'+
        escapeHtml(name)+'</div></div>';
    }).join("")+'</div>';
  }
  function authorityChart(rows,available) {
    if(!available)return '<div class="usr-rv-empty">Authority grouping is unavailable with the current permissions.</div>';
    const availableRows=rows.filter(r=>r.authority!=="—");
    if(!availableRows.length)return '<div class="usr-rv-empty"><div class="usr-rv-empty-illustration">◫</div>No authority data found for the selected requests.</div>';
    const groups=[...countsBy(availableRows,"authority")].sort((a,b)=>b[1]-a[1]);
    const largest=groups[0][1]||1;
    return '<div class="usr-rv-authority-list">'+groups.map(([name,n])=>{
      return '<div class="usr-rv-authority-row"><span class="usr-rv-authority-name" title="'+escapeHtml(name)+'">'+
        escapeHtml(name)+'</span><span class="usr-rv-authority-track"><span class="usr-rv-authority-fill" style="width:'+Math.round(n/largest*100)+'%;display:block"></span></span><span class="usr-rv-authority-count">'+n+'</span></div>';
    }).join("")+'</div>';
  }
  function statusTone(value){
    const name=String(value||"").toLowerCase();
    if(name==="draft")return "st-draft";
    if(name==="submitted")return "st-submitted";
    if(name.includes("review"))return "st-review";
    if(name.includes("correction"))return "st-correction";
    if(name==="completed")return "st-completed";
    if(name==="rejected")return "st-rejected";
    return "";
  }
  function detailsTable(rows) {
    if(!rows.length)return '<div class="usr-rv-empty"><div class="usr-rv-empty-illustration">▤</div>No matching VM Request records.</div>';
    const headers=["Request Number","Created","Contract","Project","Authority","Requester","Status","Points"];
    return '<div class="usr-rv-table-wrap"><table class="usr-rv-table"><thead><tr>'+
      headers.map(h=>'<th scope="col">'+escapeHtml(h)+'</th>').join("")+
      '</tr></thead><tbody>'+rows.map(r=>{
        const cells=[r.number,dayString(r.created),r.contract,r.project,r.authority,r.requester,r.status,
          r.points===null?"—":r.points];
        return '<tr>'+cells.map((v,i)=>{
          const text=escapeHtml(v);
          const inner=i===6?'<span class="usr-rv-status '+statusTone(v)+'">'+text+'</span>':text;
          return '<td'+(i===0?' class="number"':'')+'>'+inner+'</td>';
        }).join("")+'</tr>';
      }).join("")+'</tbody></table></div>';
  }
  function panel(title,body,bodyClass) {
    return '<section class="usr-rv-panel"><div class="usr-rv-panel-header">'+escapeHtml(title)+
      '</div><div class="usr-rv-panel-body '+(bodyClass||"")+'">'+body+'</div></section>';
  }
  function header(filterText) {
    return '<div class="usr-rv-top"><button type="button" class="usr-rv-back" data-action="parameters">'+
      '‹ &nbsp;Back to Report Parameters</button></div>'+
      '<div class="usr-rv-heading"><h1>Request Status Report</h1><span class="usr-rv-meta-pill">Requests</span></div>'+
      '<p class="usr-rv-subtitle">Current status of all VM requests with workflow stage and SLA position</p>'+
      '<div class="usr-rv-meta-lines">'+
      '<p class="usr-rv-when">Generated: '+escapeHtml(fmtTime(new Date()))+'</p>'+
      '<p class="usr-rv-when">Applied filters: '+escapeHtml(filterText)+'</p></div>'+
      '<div class="usr-rv-notice" role="note"><span class="usr-rv-info-icon" aria-hidden="true">i</span>'+
      '<span><strong>Development preview.</strong> Creatio record permissions apply, but MCIT contract, authority and reporting-role scopes must also be enforced on the server before production.</span></div>';
  }
  function actions(hasRows) {
    return '<div class="usr-rv-actions">'+
      '<button type="button" class="usr-rv-btn" data-action="catalog">‹ &nbsp;Back to Catalog</button>'+
      '<button type="button" class="usr-rv-btn" data-action="refresh">↻ &nbsp;Refresh</button>'+
      '<button type="button" class="usr-rv-btn" data-action="csv" '+(hasRows?'':'disabled')+'>↓ &nbsp;Export Excel (CSV)</button>'+
      '<button type="button" class="usr-rv-btn primary" data-action="pdf" '+(hasRows?'':'disabled')+'>▣ &nbsp;Print / Save PDF</button></div>';
  }
  function renderResult(runtime) {
    const rows=runtime.rows||[];
    const counts=countsBy(rows,"status");
    const other=[...counts.keys()].filter(x=>!STATUS_ORDER.includes(x));
    const metrics=["Total",...STATUS_ORDER,...other].map((name,i)=>metricCard(name,i===0?rows.length:(counts.get(name)||0),i)).join("");
    runtime.root.innerHTML=header(runtime.filterText)+actions(rows.length>0)+
      '<section class="usr-rv-metrics" aria-label="Request status totals">'+metrics+'</section>'+
      panel("Requests by Status",statusChart(counts))+
      panel("Requests by Authority",authorityChart(rows,runtime.authorityAvailable))+
      panel("Request Detail",detailsTable(rows),"usr-rv-table-body")+
      '<p class="usr-rv-note">'+rows.length+' matching readable VM requests · Results use your Creatio record permissions. MCIT scope enforcement is pending.</p>';
  }
  function renderEmpty(runtime) {
    runtime.rows=[];
    runtime.authorityAvailable=true;
    renderResult(runtime);
    const metrics=runtime.root.querySelector(".usr-rv-metrics");
    if(metrics) metrics.insertAdjacentHTML("beforebegin",
      '<div class="usr-rv-notice"><span class="usr-rv-info-icon" aria-hidden="true">i</span>'+
      '<span>No matching VM Requests in Realese. The totals are zero; adjust your filters or create a test request.</span></div>');
  }
  function renderError(runtime,error) {
    runtime.rows=[];
    runtime.root.innerHTML=header(runtime.filterText||"Not evaluated")+actions(false)+
      '<div class="usr-rv-error" role="alert">Report could not be generated. '+escapeHtml(error?.message || String(error))+
      '</div><p class="usr-rv-note">No partial or example results were displayed.</p>';
  }
  async function navigate(runtime,schema) {
    try {
      await sdk.HandlerChainService.instance.process({type:"crt.OpenPageRequest",schemaName:schema,
        $context:runtime.context,scopes:[...(runtime.scopes||[])]});
    } catch(error) {console.error("MCIT viewer navigation failed",error);
      window.alert("Cannot open "+schema+". Return using Creatio navigation.");}
  }
  function subscribe(runtime) {
    if (runtime.root.__mcitViewerClick) {
      runtime.root.removeEventListener("click",runtime.root.__mcitViewerClick);
    }
    const listener=async(event)=>{
      const button=event.target.closest("button[data-action]");
      if(!button || button.disabled || runtime.disposed)return;
      if(runtime.loading && !["parameters","catalog"].includes(button.dataset.action))return;
      const action=button.dataset.action;
      if(action==="parameters")return navigate(runtime,"UsrReportParameters");
      if(action==="catalog"){
        // The known Report Catalog section code (not a standalone page schema).
        window.location.hash="Section/UsrMCITReportCatalog_ListPage";return;
      }
      if(action==="refresh")return refresh(runtime);
      if(action==="csv" && runtime.rows?.length)return downloadCsv(runtime.rows);
      if(action==="pdf" && runtime.rows?.length)return window.print();
    };
    runtime.root.__mcitViewerClick=listener;
    runtime.root.addEventListener("click",listener);
  }
  async function refresh(runtime) {
    if(runtime.loading || runtime.disposed)return;
    runtime.loading=true;
    runtime.root.innerHTML=header(runtime.filterText||"Loading")+
      '<div class="usr-rv-panel"><div class="usr-rv-empty">Loading real VM Request records…</div></div>';
    try {
      const raw=window.sessionStorage.getItem(STORAGE_KEY);
      if(!raw)throw new Error("No report parameters were received. Return to Report Parameters and click Run Report.");
      const params=normalizeParams(JSON.parse(raw));
      runtime.filterText=formatFilters(params);
      const base=await loadRequests(params);
      if(runtime.disposed)return;
      if(!base.length)renderEmpty(runtime);
      else {
        const info=await enrichRows(base);
        if(runtime.disposed)return;
        runtime.rows=info.rows;
        runtime.authorityAvailable=info.authorityAvailable;
        renderResult(runtime);
      }
    } catch(error){console.error("MCIT Request Status Report failed",error);
      if(!runtime.disposed)renderError(runtime,error);
    } finally {runtime.loading=false;}
  }
  function isDesignerContext() {
    // Freedom UI Designer can initialize client handlers in its editor canvas.
    // Data reads / custom DOM must run only on the actual page, not in Designer.
    const route=String(window.location.href || "");
    return /(?:page|ui|schema|freedom)[-_]?designer|designer(?:\/|%2f|\?|#)/i.test(route);
  }
  function mount(runtime) {
    if(runtime.disposed)return true;
    if(isDesignerContext())return true;
    // HandleViewModelInitRequest comes from this page's schema. Waiting for the
    // native stage is more reliable than requiring a particular URL hash format.
    const stage=document.querySelector("."+STAGE_CLASS);
    if(!stage)return false;
    if(!document.getElementById(STYLE_ID)) {
      const style=document.createElement("style");style.id=STYLE_ID;style.textContent=STYLE;
      document.head.appendChild(style);
    }
    let root=stage.querySelector("#"+ROOT_ID);
    if(!root){root=document.createElement("div");root.id=ROOT_ID;
      root.className="usr-rv-root";stage.appendChild(root);}
    runtime.root=root;
    subscribe(runtime);
    refresh(runtime);
    return true;
  }
  function startMount(runtime) {
    if(isDesignerContext())return;
    let attempts=0;
    function attempt(){
      if(runtime.disposed || attempts++>=80)return;
      if(!mount(runtime))runtime.mountTimer=setTimeout(attempt,120);
    }
    attempt();
  }

  return {
    viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
      {"operation":"insert","name":"UsrReportViewerStage","values":{
        "type":"crt.FlexContainer","direction":"column","alignItems":"stretch",
        "wrap":"nowrap","gap":"none","fitContent":true,"items":[],
        "classes":[STAGE_CLASS]
      },"parentName":"Main","propertyName":"items","index":0}
    ]/**SCHEMA_VIEW_CONFIG_DIFF*/,
    viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
      {"operation":"merge","path":[],"values":{"attributes":{}}}
    ]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
    modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
      {"operation":"merge","path":[],"values":{"dataSources":{}}}
    ]/**SCHEMA_MODEL_CONFIG_DIFF*/,
    handlers: /**SCHEMA_HANDLERS*/[
      {request:"crt.HandleViewModelInitRequest",handler:async(request,next)=>{
        const result=await next?.handle(request);
        if(typeof document === "undefined" || isDesignerContext())return result;
        const runtime={disposed:false,loading:false,root:null,rows:[],filterText:"",
          authorityAvailable:false,context:request.$context,scopes:request.scopes||[],mountTimer:null};
        const previous=document.__usrMCITReportViewerRuntime;
        if(previous){previous.disposed=true;if(previous.mountTimer)clearTimeout(previous.mountTimer);}
        document.__usrMCITReportViewerRuntime=runtime;
        startMount(runtime);
        return result;
      }},
      {request:"crt.HandleViewModelDestroyRequest",handler:async(request,next)=>{
        const runtime=typeof document !== "undefined" ? document.__usrMCITReportViewerRuntime : null;
        if(runtime){
          runtime.disposed=true;
          if(runtime.mountTimer)clearTimeout(runtime.mountTimer);
          if(document.__usrMCITReportViewerRuntime===runtime)delete document.__usrMCITReportViewerRuntime;
        }
        return next?.handle(request);
      }}
    ]/**SCHEMA_HANDLERS*/,
    converters: /**SCHEMA_CONVERTERS*/{} /**SCHEMA_CONVERTERS*/,
    validators: /**SCHEMA_VALIDATORS*/{} /**SCHEMA_VALIDATORS*/
  };
});
