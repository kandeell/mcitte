
/*
 * MCIT Audit Log — Realese — Freedom UI hybrid client schema
 * Schema: UsrMCITAuditLog_ListPage (package UsrMCIT)
 * V5.3: Repair PDS by merging only inherited config.entitySchemaName.
 *       Show recent business events by default, live-filter history by record
 *       number/ID, and add Refresh and View Record History actions.
 * V5: Read MCIT Business Audit Events, record history by ID/number,
 *     retain V4 native-section removal and styling.
 * V4: Hide inherited MainHeader/MainContainer at view configuration level
 *     so no native white list/footer remains beneath custom Audit Log.
 *     This leaves the custom stage, tabs, filters, real audit event reading
 *     and business history untouched. No broad page DOM scanning.
 *
 * REAL sources:
 *   SysOperationAudit: system/security operations (218 records reported)
 *   UsrMCITRoleChangeLog: MCIT role changes
 *   UsrMCITBusinessAuditEvent: VM Request, Contract and Role events written by listeners
 *
 * Records that were not logged cannot be reconstructed here. In particular,
 * past activity not recorded by a listener cannot be reconstructed.
 * This page never creates or edits audit events.
 *
 * SECURITY: A production rollout MUST verify CanViewSysOperationAudit and
 * MCIT-specific row/field access ON THE SERVER before returning audit data.
 * Client-side hiding / normal SDK object permissions alone are not a substitute.
 */
define("UsrMCITAuditLog_ListPage", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/,
function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
  "use strict";

  const STAGE = "mcit-audit-stage-v1";
  const ROOT_ID = "mcit-audit-root-v1";
  const STYLE_ID = "mcit-audit-style-v53";
  const HOST_CLASS = "mcit-audit-host-v5";
  const MAX_RECORDS = 3000;
  const PAGE_SIZE = 200;
  const TABLE_SIZE = 30;
  const RUNTIME_PROP = "__mcitAuditRuntimeV1";
  const SYSTEM_SCHEMA = "SysOperationAudit";
  const ROLE_SCHEMA = "UsrMCITRoleChangeLog";
  const BUSINESS_SCHEMA = "UsrMCITBusinessAuditEvent";
  const CSS = `
  .${STAGE}{--ma-bg:#f8f7ff;--ma-main:#5b21a5;--ma-purple:#7027f5;--ma-border:#e5e6ed;
    --ma-ink:#20283a;--ma-muted:#747a89;--ma-white:#fff;
    width:100%!important;min-width:0!important;height:calc(100dvh - 52px)!important;
    max-height:calc(100dvh - 52px)!important;min-height:0!important;
    padding:0!important;display:block!important;box-sizing:border-box;
    overflow-y:auto!important;overflow-x:hidden!important;
    scrollbar-gutter:stable;background:var(--ma-bg)!important;
    -webkit-overflow-scrolling:touch;overscroll-behavior-y:contain}
  .${HOST_CLASS}{background:#f8f7ff!important;min-width:0!important}
  .${STAGE} *{box-sizing:border-box}
  .${STAGE} #${ROOT_ID}{max-width:1210px;margin:0 auto;padding:32px 28px 85px;
    color:var(--ma-ink);font-family:Rubik,Inter,Arial,sans-serif;line-height:1.48;font-size:13px}
  .${STAGE} button,.${STAGE} input,.${STAGE} select{font:inherit}
  .${STAGE} button{cursor:pointer}
  .${STAGE} button:focus-visible,.${STAGE} input:focus-visible,.${STAGE} select:focus-visible{
    outline:2px solid #8d56d9;outline-offset:2px}
  .${STAGE} .ma-tabs{display:flex;gap:2px;border-bottom:1px solid #e4e0ef;
    margin-bottom:25px;overflow-x:auto}
  .${STAGE} .ma-tab{color:#6f7180;border:0;border-bottom:2px solid transparent;
    padding:12px 21px;background:transparent;font-weight:720;font-size:13px;white-space:nowrap}
  .${STAGE} .ma-tab[aria-selected="true"]{color:#6822c4;border-bottom-color:#7027f5}
  .${STAGE} .ma-head{margin-bottom:19px}
  .${STAGE} .ma-headrow{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
  .${STAGE} .ma-headtext{min-width:0;flex:1}
  .${STAGE} .ma-headactions{display:flex;justify-content:flex-end;align-items:flex-start}
  .${STAGE} h1{margin:0;color:#201631;font-weight:790;font-size:23px;line-height:1.3}
  .${STAGE} .ma-sub{margin:6px 0 0;color:#7b7d8c;font-size:13px}
  .${STAGE} .ma-banner{display:flex;align-items:flex-start;gap:10px;border:1px solid #c8dffa;
    background:#edf6ff;color:#366eac;padding:14px 16px;border-radius:11px;margin-bottom:17px;font-size:12.5px}
  .${STAGE} .ma-banner.warn{border-color:#f1db9f;background:#fffaea;color:#8a6422}
  .${STAGE} .ma-banner.neutral{border-color:#e1d8f6;background:#f7f2ff;color:#632ca6}
  .${STAGE} .ma-panel{border:1px solid var(--ma-border);border-radius:15px;background:#fff;
    box-shadow:0 2px 8px rgba(34,16,62,.035);overflow:hidden;margin-bottom:18px}
  .${STAGE} .ma-panel-title{padding:16px 19px;border-bottom:1px solid #f0edf5;
    font-weight:760;font-size:13px}
  .${STAGE} .ma-panel-body{padding:19px}
  .${STAGE} .ma-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px 14px}
  .${STAGE} .ma-field{display:flex;flex-direction:column;gap:7px;min-width:0}
  .${STAGE} .ma-field label{font-size:12px;color:#41465b;font-weight:740}
  .${STAGE} .ma-input{display:block;width:100%;height:38px;border:1px solid #e1e3ea;
    border-radius:10px;background:#fff;color:#26283c;padding:0 12px;min-width:0;box-shadow:none}
  .${STAGE} .ma-input:focus{border-color:#8e50e3}
  .${STAGE} .ma-controls{display:flex;flex-wrap:wrap;gap:10px;align-items:center;
    justify-content:space-between;margin-top:18px}
  .${STAGE} .ma-pills{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
  .${STAGE} .ma-pill{border:1px solid transparent;border-radius:999px;
    background:#f1f1f4;color:#424253;padding:7px 12px;font-size:11px;font-weight:720}
  .${STAGE} .ma-pill[aria-pressed="true"]{color:#fff;background:#7027f5}
  .${STAGE} .ma-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;
    border:1px solid #e4dfeb;background:#fff;color:#404053;border-radius:10px;
    min-height:36px;padding:8px 14px;font-size:11.5px;font-weight:730}
  .${STAGE} .ma-btn:hover{background:#f8f5fd;border-color:#d8c6ee}
  .${STAGE} .ma-btn.primary{background:#6723bf;border-color:#6723bf;color:#fff}
  .${STAGE} .ma-btn.primary:hover{background:#5b21a5}
  .${STAGE} .ma-btn.soft{background:#f4effd;border-color:#decdf6;color:#6528c2}
  .${STAGE} .ma-btn.soft:hover{background:#eee4ff;border-color:#d3bdf3}
  .${STAGE} .ma-btn.top-refresh{background:#efe7fd;border-color:#d6c2f5;color:#6528c2}
  .${STAGE} .ma-btn.top-refresh:hover{background:#e7dcfc;border-color:#c9acef}
  .${STAGE} .ma-actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
  .${STAGE} .ma-toolbar{display:flex;justify-content:space-between;align-items:center;
    gap:10px;padding:11px 16px;border-bottom:1px solid #ece9f2}
  .${STAGE} .ma-meta{font-size:11px;color:#7a798b}
  .${STAGE} .ma-tablebox{width:100%;overflow-x:auto;scrollbar-width:thin}
  .${STAGE} table{border-collapse:collapse;width:100%;min-width:1000px;text-align:left}
  .${STAGE} th{background:#faf9fc;color:#717485;font-size:11px;font-weight:740;white-space:nowrap}
  .${STAGE} th,.${STAGE} td{padding:12px 13px;border-bottom:1px solid #efedf4;vertical-align:top}
  .${STAGE} td{font-size:11.5px;line-height:1.5;color:#363544;overflow-wrap:anywhere}
  .${STAGE} tbody tr:hover{background:#faf8ff}
  .${STAGE} tr:last-child td{border-bottom:0}
  .${STAGE} .ma-link{color:#6c2bc9;background:none;border:0;padding:0;text-align:left;
    font-size:11.5px;font-weight:740;text-decoration:none}
  .${STAGE} .ma-link:hover{text-decoration:underline}
  .${STAGE} .ma-tag{display:inline-flex;max-width:170px;padding:4px 8px;
    background:#f3effc;color:#6c32bd;border:1px solid #e6dbfa;
    border-radius:999px;font-weight:700;font-size:10px;line-height:1.25;white-space:normal}
  .${STAGE} .ma-tag.success{background:#eafaf1;border-color:#d8efe0;color:#1a8750}
  .${STAGE} .ma-tag.denied{background:#fff3f2;border-color:#f8d4d4;color:#b74149}
  .${STAGE} .ma-tag.error{background:#fff4e9;border-color:#f1ddc7;color:#985b24}
  .${STAGE} .ma-detail{margin:15px;border:1px solid #e5dff0;border-radius:12px;
    padding:18px;background:#fff;box-shadow:0 3px 10px rgba(37,20,60,.03)}
  .${STAGE} .ma-detail h3{font-size:14px;margin:0 0 16px;color:#241936}
  .${STAGE} .ma-detail-actions{margin-top:16px}
  .${STAGE} .ma-pairs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px 20px}
  .${STAGE} .ma-pair b{display:block;color:#9696a6;font-size:10px;letter-spacing:.35px;
    font-weight:770;text-transform:uppercase;margin-bottom:3px}
  .${STAGE} .ma-pair span{display:block;color:#333144;font-size:12px;overflow-wrap:anywhere;white-space:pre-wrap}
  .${STAGE} .ma-footnote{border-radius:9px;background:#faf9fc;border:1px solid #e9e5ef;
    padding:11px;color:#78798a;margin-top:18px;font-size:11px}
  .${STAGE} .ma-pager{display:flex;gap:12px;align-items:center;justify-content:flex-end;
    padding:12px 16px;border-top:1px solid #eee9f3}
  .${STAGE} .ma-empty{padding:33px 22px;text-align:center;color:#797b8b;
    background:#fbfaff;font-size:12px;line-height:1.7}
  .${STAGE} .ma-history-search{display:flex;gap:10px;align-items:end;margin:18px 0 15px}
  .${STAGE} .ma-history-search .ma-field{flex:1}
  .${STAGE} .ma-small-tabs{display:flex;gap:3px;border-bottom:1px solid #e5e2ee;
    margin:18px 0 18px}
  .${STAGE} .ma-small-tabs button{border:0;border-bottom:2px solid transparent;
    padding:12px 17px;background:none;font-size:12px;font-weight:740;color:#6e7281}
  .${STAGE} .ma-small-tabs button[aria-selected="true"]{border-color:#7b31dc;color:#6b2ac4}
  .${STAGE} .ma-timeline{list-style:none;padding:8px 0 5px 0;margin:0}
  .${STAGE} .ma-time-item{position:relative;margin:0 0 0 20px;padding:0 0 32px 26px;
    border-left:2px solid #e7e1f0}
  .${STAGE} .ma-time-item::before{position:absolute;content:"";left:-7px;top:2px;
    width:12px;height:12px;border-radius:50%;background:#7027f5;border:2px solid #fff}
  .${STAGE} .ma-time-item:last-child{border-left-color:transparent}
  .${STAGE} .ma-time-item strong{font-size:12.5px;color:#251b37}
  .${STAGE} .ma-time-item .ma-time-meta{font-size:11px;color:#9a98a9;margin-top:5px}
  .${STAGE} .ma-note{color:#8e91a0;font-size:11px;margin:10px 0 0}
  .${STAGE} .ma-error{color:#a33040;background:#fff1f1;border:1px solid #f1c6c6;
    padding:13px 15px;border-radius:10px;margin-bottom:13px;white-space:pre-wrap}
  @media(max-width:900px){.${STAGE} #${ROOT_ID}{padding:24px 18px 72px}
    .${STAGE} .ma-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media(max-width:600px){.${STAGE} .ma-grid,.${STAGE} .ma-pairs{grid-template-columns:minmax(0,1fr)}
    .${STAGE} .ma-history-search{align-items:stretch;flex-direction:column}
    .${STAGE} .ma-controls{align-items:flex-start;flex-direction:column}
    .${STAGE} .ma-headrow{flex-direction:column;align-items:stretch}
    .${STAGE} .ma-headactions{justify-content:flex-start}}
  @media print{.${STAGE}{height:auto!important;max-height:none!important;overflow:visible!important}
    .${STAGE} .ma-tabs,.${STAGE} .ma-panel.filters,.${STAGE} .ma-pager,
    .${STAGE} .ma-actions,.${STAGE} .ma-history-search{display:none!important}
    .${STAGE} #${ROOT_ID}{max-width:none;padding:0}}
  `;

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }
  function valueOf(value) {
    if(value && typeof value==="object" && !(value instanceof Date)) {
      if(Object.prototype.hasOwnProperty.call(value,"value"))return value.value;
      if(Object.prototype.hasOwnProperty.call(value,"displayValue"))return value.displayValue;
    }
    return value;
  }
  function displayOf(value, fallback="—") {
    if(value && typeof value==="object" && !(value instanceof Date)) {
      if(value.displayValue != null && value.displayValue!=="")return String(value.displayValue);
      if(value.Name != null && value.Name!=="")return String(value.Name);
      if(value.name != null && value.name!=="")return String(value.name);
    }
    const v=valueOf(value);
    return v==null || v==="" ? fallback : String(v);
  }
  function idOf(value) {
    const raw=valueOf(value);
    return raw==null ? "" : String(raw).toLowerCase();
  }
  function parseTime(v) {
    const date=new Date(valueOf(v));
    return Number.isFinite(date.getTime()) ? date.getTime() : 0;
  }
  function dateText(value) {
    const time=parseTime(value);
    return time ? new Date(time).toLocaleString("en-GB",{
      day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"
    }) : "—";
  }
  function dateOk(value,from,to) {
    const time=parseTime(value);
    if(!time)return !from&&!to;
    if(from) {
      const min=new Date(from+"T00:00:00").getTime();
      if(time<min)return false;
    }
    if(to) {
      const end=new Date(to+"T00:00:00");end.setDate(end.getDate()+1);
      if(time>=end.getTime())return false;
    }
    return true;
  }
  function outcomeGroup(label) {
    if(/\b(success|successful|allowed|approved|completed|positive)\b/i.test(label))return "Success";
    if(/\b(denied|rejected|unauthorized|forbidden|blocked)\b/i.test(label))return "Denied";
    if(/\b(error|fail|failed|exception)\b/i.test(label))return "Error";
    return "Other";
  }
  function rowFromSystem(row) {
    const type=displayOf(row.Type,"System event");
    const result=displayOf(row.Result,"Not recorded");
    return {
      source:"system", id:displayOf(row.Id,""), time:row.Date,
      user:displayOf(row.Owner,"Unknown"), role:"—", action:type,
      module:"System & Security", recordType:"System event", targetId:"—",
      outcome:result, channel:"—", description:displayOf(row.Description,""),
      clientIP:displayOf(row.ClientIP,"—"), before:"", after:"", field:"",
      roleId:"", roleName:"", eventKind:outcomeGroup(result)
    };
  }
  function rowFromRole(row) {
    const field=displayOf(row.UsrFieldName,"—");
    const change=displayOf(row.UsrChangeType,"Field change");
    const roleId=idOf(row.UsrMCITRole);
    const roleName=displayOf(row.UsrMCITRole,roleId || "—");
    const result=displayOf(row.UsrChangeStatus,"Not recorded");
    return {
      source:"role", id:displayOf(row.Id,""), time:row.CreatedOn,
      user:displayOf(row.CreatedBy,"Unknown"), role:"—", action:change,
      module:"MCIT Roles", recordType:"MCIT Role", targetId:roleId||"—",
      outcome:result, channel:"—", description:displayOf(row.UsrChangeArea,"")+" · "+field,
      clientIP:"—", before:displayOf(row.UsrOldValue,""),
      after:displayOf(row.UsrNewValue,""), field,
      roleId,roleName,eventKind:outcomeGroup(result)
    };
  }
  function rowFromBusiness(row) {
    const schemaName=displayOf(row.UsrRecordSchema,"");
    const typeNames={
      "UsrVMRequest":"VM Request",
      "UsrMCITContract":"MCIT Contract",
      "UsrMCITRole":"MCIT Role"
    };
    const recordId=idOf(row.UsrRecordId);
    const recordNumber=displayOf(row.UsrRecordNumber,"");
    const outcome=displayOf(row.UsrOutcome,"Not recorded");
    return {
      source:"business", id:displayOf(row.Id,""), time:row.CreatedOn,
      user:displayOf(row.UsrActor,displayOf(row.CreatedBy,"Unknown")),
      role:"—", action:displayOf(row.UsrAction,displayOf(row.UsrEventCode,"Event")),
      module:displayOf(row.UsrModule,"MCIT"),
      recordType:typeNames[schemaName] || schemaName || "MCIT record",
      targetId:recordId || "—", targetNumber:recordNumber,
      outcome, channel:"—", description:displayOf(row.UsrDescription,""),
      clientIP:"—", before:displayOf(row.UsrOldValue,""),
      after:displayOf(row.UsrNewValue,""),
      field:displayOf(row.UsrFieldName,""),
      roleId:schemaName==="UsrMCITRole" ? recordId : "",
      roleName:schemaName==="UsrMCITRole" ? recordNumber : "",
      correlationId:idOf(row.UsrCorrelationId),
      eventCode:displayOf(row.UsrEventCode,""),
      eventKind:outcomeGroup(outcome)
    };
  }
  async function withTimeout(promise,label,ms=20000) {
    let timer;
    try {
      return await Promise.race([
        promise,
        new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error(label+" timed out")),ms);})
      ]);
    } finally {clearTimeout(timer);}
  }
  async function loadAll(schema,attributes,orderBy) {
    const model=await withTimeout(sdk.Model.create(schema),"Opening "+schema);
    const rows=[];
    for(let offset=0;offset<MAX_RECORDS;offset+=PAGE_SIZE) {
      const part=await withTimeout(model.load({
        attributes,
        options:{
          pagingConfig:{rowsOffset:offset,rowCount:PAGE_SIZE},
          sortingConfig:{columns:[{columnName:orderBy,direction:"desc"}]}
        }
      }),"Reading "+schema);
      if(!Array.isArray(part))throw new Error("Unexpected result from "+schema);
      rows.push(...part);
      if(part.length<PAGE_SIZE)return rows;
    }
    throw new Error(schema+" has at least "+MAX_RECORDS+
      " readable records. Add server-side pagination before showing partial results.");
  }
  async function fetchAudit(runtime) {
    if(runtime.loading)return;
    runtime.loading=true;runtime.error="";runtime.warnings=[];
    render(runtime);
    const loaded=[];
    try {
      try {
        const sys=await loadAll(SYSTEM_SCHEMA,
          ["Id","Date","Type","Result","Owner","Description","ClientIP"],"Date");
        loaded.push(...sys.map(rowFromSystem));
      } catch(err) {
        runtime.warnings.push("System audit could not be loaded: "+String(err.message||err));
      }
      try {
        const roles=await loadAll(ROLE_SCHEMA,
          ["Id","CreatedOn","CreatedBy","UsrMCITRole","UsrFieldName",
           "UsrOldValue","UsrNewValue","UsrChangeStatus","UsrChangeType","UsrChangeArea"],"CreatedOn");
        loaded.push(...roles.map(rowFromRole));
      } catch(err) {
        runtime.warnings.push("MCIT role history could not be loaded: "+String(err.message||err));
      }
      try {
        const business=await loadAll(BUSINESS_SCHEMA,
          ["Id","CreatedOn","CreatedBy","UsrName","UsrEventCode","UsrModule",
           "UsrRecordSchema","UsrRecordId","UsrRecordNumber","UsrAction",
           "UsrActor","UsrOutcome","UsrFieldName","UsrOldValue","UsrNewValue",
           "UsrDescription","UsrCorrelationId"],"CreatedOn");
        loaded.push(...business.map(rowFromBusiness));
      } catch(err) {
        runtime.warnings.push("MCIT business audit could not be loaded: "+String(err.message||err));
      }
      loaded.sort((a,b)=>parseTime(b.time)-parseTime(a.time));
      runtime.rows=loaded;
      if(runtime.warnings.length===3)runtime.error="None of the audit sources are accessible. Verify object access and logged-in user permissions.";
    } catch(err) {
      runtime.error=String(err.message||err);
    } finally {
      runtime.loading=false;
      if(!runtime.disposed)render(runtime);
    }
  }
  function filteredRows(runtime) {
    const f=runtime.filters;
    const q=f.user.trim().toLocaleLowerCase();
    return runtime.rows.filter(r=>
      dateOk(r.time,f.from,f.to) &&
      (!f.module || r.module===f.module) &&
      (!f.action || r.action===f.action) &&
      (!f.type || r.recordType===f.type) &&
      (f.outcome==="All" || r.eventKind===f.outcome) &&
      (!q || [r.user,r.id,r.description,r.action,r.targetId,r.targetNumber,r.eventCode].some(s=>String(s||"").toLocaleLowerCase().includes(q)))
    );
  }
  function selectOptions(options,selected) {
    return options.map(({value,label})=>'<option value="'+escapeHtml(value)+'"'+
      (value===selected?' selected':'')+'>'+escapeHtml(label)+'</option>').join("");
  }
  function optionsFor(runtime,field,current) {
    const values=Array.from(new Set(runtime.rows.map(r=>String(r[field]||"")))).filter(Boolean).sort();
    return selectOptions([{value:"",label:"All"},...values.map(x=>({value:x,label:x}))],current);
  }
  function badge(value) {
    const cat=outcomeGroup(value);
    const css=cat==="Success"?"success":cat==="Denied"?"denied":cat==="Error"?"error":"";
    return '<span class="ma-tag '+css+'">'+escapeHtml(value)+'</span>';
  }
  function safeId(value) {
    const v=String(value||"");
    return v.length>13 ? v.slice(0,8)+"…" : v;
  }
  function renderDetail(record) {
    if(!record)return "";
    const pairs=[
      ["Audit ID",record.id],["Timestamp",dateText(record.time)],
      ["User",record.user],["Effective role","Not recorded by this source"],
      ["Action",record.action],["Module / source",record.module],
      ["Record type",record.recordType],["Record ID",record.targetId],
      ["Outcome",record.outcome],["Client IP",record.clientIP],
      ["Description",record.description]
    ];
    if(record.targetNumber)pairs.push(["Record number",record.targetNumber]);
    if(record.eventCode)pairs.push(["Event code",record.eventCode]);
    if(record.correlationId)pairs.push(["Correlation ID",record.correlationId]);
    if(record.source==="role" || record.source==="business") {
      if(record.field && record.field!=="—")pairs.push(["Changed field",record.field]);
      if(record.before || record.after) pairs.push(
        ["Previous value",record.before || "Not recorded"],
        ["New value",record.after || "Not recorded"]);
    }
    return '<div class="ma-detail"><h3>Audit Record Detail</h3><div class="ma-pairs">'+
      pairs.map(([k,v])=>'<div class="ma-pair"><b>'+escapeHtml(k)+'</b><span>'+escapeHtml(v)+'</span></div>').join("")+
      '</div>'+
      ((record.source==="business"||record.source==="role") &&
        (record.targetNumber || (record.targetId && record.targetId!=="—"))
        ? '<div class="ma-detail-actions"><button type="button" class="ma-btn soft" data-act="view-history" data-value="'+
          escapeHtml(record.targetNumber || record.targetId)+'">View Record History</button></div>' : '')+
      '<div class="ma-footnote">This is a read-only view of fields actually recorded by Creatio. Missing values are not inferred.</div></div>';
  }
  function renderTable(runtime,rows,{history=false}={}) {
    const pageCount=Math.max(1,Math.ceil(rows.length/TABLE_SIZE));
    runtime.page=Math.min(Math.max(0,runtime.page),pageCount-1);
    const page=rows.slice(runtime.page*TABLE_SIZE,(runtime.page+1)*TABLE_SIZE);
    const id=history?"history-table":"explorer-table";
    const selected=rows.find(r=>r.id===runtime.selectedId);
    const body=page.map(r=>'<tr><td><button type="button" class="ma-link" data-act="detail" data-id="'+
      escapeHtml(r.id)+'">'+escapeHtml(safeId(r.id))+'</button></td><td>'+escapeHtml(dateText(r.time))+
      '</td><td>'+escapeHtml(r.user)+'</td><td>'+escapeHtml(r.role)+
      '</td><td>'+escapeHtml(r.action)+'</td><td>'+escapeHtml(r.module)+
      '</td><td>'+escapeHtml(r.recordType)+'</td><td>'+escapeHtml(r.targetNumber||r.targetId)+
      '</td><td>'+badge(r.outcome)+'</td><td>'+escapeHtml(r.channel)+'</td></tr>').join("");
    return '<div class="ma-panel"><div class="ma-toolbar"><strong>'+escapeHtml(history?"Detailed Audit Table":"Audit Events")+
      '</strong><span class="ma-meta">'+rows.length+' matching recorded event'+(rows.length===1?"":"s")+'</span></div>'+
      (rows.length?'<div class="ma-tablebox"><table><thead><tr>'+[
        "Audit ID","Timestamp","User","Effective Role","Action","Module","Record Type","Record ID","Outcome","Channel"
      ].map(x=>'<th>'+escapeHtml(x)+'</th>').join("")+'</tr></thead><tbody>'+body+'</tbody></table></div>':
      '<div class="ma-empty">No recorded events match your search. No sample audit entries are displayed.</div>')+
      (selected?renderDetail(selected):"")+
      (pageCount>1?'<div class="ma-pager"><button class="ma-btn" data-act="prev" '+(runtime.page===0?'disabled':'')+
        '>Previous</button><span class="ma-meta">Page '+(runtime.page+1)+' of '+pageCount+'</span><button class="ma-btn" data-act="next" '+
        (runtime.page===pageCount-1?'disabled':'')+'>Next</button></div>':'')+'</div>';
  }
  function renderExplorer(runtime) {
    const f=runtime.filters;
    const table=runtime.loading
      ? '<div class="ma-panel"><div class="ma-empty">Loading recorded audit events…</div></div>'
      : renderTable(runtime,filteredRows(runtime));

    return '<section class="ma-head">' +
      '<div class="ma-headrow">' +
        '<div class="ma-headtext">' +
          '<h1>Audit Log Explorer</h1>' +
          '<p class="ma-sub">Read-only system, MCIT business and role activity recorded in Creatio.</p>' +
        '</div>' +
        '<div class="ma-headactions">' +
          '<button type="button" class="ma-btn top-refresh" data-act="refresh">Refresh</button>' +
        '</div>' +
      '</div>' +
    '</section>' +
    '<div class="ma-banner"><span>ⓘ</span><span>Read-only viewer. Audit retention and deletion are governed by Creatio settings and permissions.</span></div>' +
    '<div class="ma-panel filters"><div class="ma-panel-title">Filters</div><div class="ma-panel-body">' +
    '<div class="ma-grid">' +
      '<div class="ma-field"><label for="ma-date-from">Date From</label><input class="ma-input" id="ma-date-from" data-filter="from" type="date" value="' + escapeHtml(f.from) + '"></div>' +
      '<div class="ma-field"><label for="ma-date-to">Date To</label><input class="ma-input" id="ma-date-to" data-filter="to" type="date" value="' + escapeHtml(f.to) + '"></div>' +
      '<div class="ma-field"><label for="ma-user">User Search</label><input class="ma-input" id="ma-user" data-filter="user" type="search" placeholder="User, audit ID or description" value="' + escapeHtml(f.user) + '"></div>' +
      '<div class="ma-field"><label for="ma-module">Module</label><select class="ma-input" id="ma-module" data-filter="module">' +
        optionsFor(runtime,"module",f.module) + '</select></div>' +
      '<div class="ma-field"><label for="ma-action">Action / Event Type</label><select class="ma-input" id="ma-action" data-filter="action">' +
        optionsFor(runtime,"action",f.action) + '</select></div>' +
      '<div class="ma-field"><label for="ma-type">Record Type</label><select class="ma-input" id="ma-type" data-filter="type">' +
        optionsFor(runtime,"recordType",f.type) + '</select></div>' +
    '</div>' +
    '<div class="ma-controls">' +
      '<div class="ma-pills"><b>Outcome:</b>' +
        ["All","Success","Denied","Error"].map(v =>
          '<button type="button" class="ma-pill" aria-pressed="' + (f.outcome===v) + '" data-act="outcome" data-value="' + v + '">' + v + '</button>'
        ).join("") +
      '</div>' +
      '<div class="ma-actions">' +
        '<button type="button" class="ma-btn soft" data-act="reset">Reset</button>' +
        '<button type="button" class="ma-btn" data-act="csv">Export Excel (CSV)</button>' +
        '<button type="button" class="ma-btn" data-act="print">Print/Save PDF</button>' +
      '</div>' +
    '</div></div></div>' +
    '<div id="explorer-table">' + table + '</div>';
  }
  function historyMatches(runtime) {
    const s=runtime.historyTerm.trim().toLocaleLowerCase();
    return runtime.rows.filter(r=>(r.source==="role" || r.source==="business") &&
      (!s || [r.roleId,r.roleName,r.targetId,r.targetNumber].some(v=>
        String(v || "").toLocaleLowerCase().includes(s))));
  }
  function renderTimeline(records) {
    if(!records.length)return '<div class="ma-panel"><div class="ma-empty">No recorded business audit events match this record. Only events captured by Creatio can appear.</div></div>';
    return '<div class="ma-panel"><div class="ma-toolbar"><strong>Business Timeline</strong><span class="ma-meta">'+
      records.length+' recorded event'+(records.length===1?'':'s')+'</span></div><div class="ma-panel-body"><ol class="ma-timeline">'+
      records.slice(0,100).map(r=>'<li class="ma-time-item"><strong>'+escapeHtml(r.user)+' · '+escapeHtml(r.action)+
        (r.field&&r.field!=="—"?' · '+escapeHtml(r.field):'')+'</strong><div class="ma-time-meta">'+
        escapeHtml(dateText(r.time))+' · '+escapeHtml(r.targetNumber||r.roleName||r.targetId)+
        (r.field && (r.before || r.after) ? ' · '+escapeHtml(r.before||"—")+' → '+escapeHtml(r.after||"—") : '')+
        '</div></li>').join("")+
      '</ol>'+ (records.length>100 ? '<p class="ma-note">Showing the latest 100 recorded events. Search for a record to narrow the timeline.</p>' : '') + '</div></div>';
  }
  function renderHistoryResults(runtime) {
    const matches=historyMatches(runtime);
    return (runtime.historyTerm
      ? '<div class="ma-banner neutral">Showing recorded history for: <b>'+escapeHtml(runtime.historyTerm)+'</b></div>'
      : '<div class="ma-banner neutral">Recent MCIT business events appear below automatically. Enter a record ID or number to filter them.</div>') +
      '<div class="ma-small-tabs"><button type="button" data-act="history-timeline" aria-selected="'+
      (runtime.historyMode==="timeline")+'">Business Timeline</button><button type="button" data-act="history-table" aria-selected="'+
      (runtime.historyMode==="table")+'">Detailed Audit Table</button></div>'+
      '<div class="ma-banner warn">Only actual events from MCIT business audit and role change logs are shown. Before/after values appear only if recorded by the server-side listener. Past SQL-only changes cannot be reconstructed.</div>'+
      (runtime.loading ? '<div class="ma-panel"><div class="ma-empty">Refreshing recorded business events…</div></div>' :
        (runtime.historyMode==="timeline" ? renderTimeline(matches) : renderTable(runtime,matches,{history:true})));
  }
  function renderHistory(runtime) {
    return '<section class="ma-head"><div class="ma-headrow"><div class="ma-headtext">'+
      '<h1>Business Record History</h1><p class="ma-sub">Real activity for VM Requests, Contracts and MCIT Roles.</p></div>'+
      '<div class="ma-headactions"><button type="button" class="ma-btn top-refresh" data-act="refresh">Refresh</button></div></div></section>'+
      '<div class="ma-history-search"><div class="ma-field"><label for="ma-record">Record ID or number</label>'+
      '<input id="ma-record" class="ma-input" type="search" value="'+escapeHtml(runtime.historyInput)+'" placeholder="e.g. DEMO-VM-0014 or a record GUID"></div>'+
      '<button type="button" class="ma-btn primary" data-act="history-search">Search</button>'+
      '<button type="button" class="ma-btn soft" data-act="history-clear">All Events</button></div>'+
      '<div id="mcit-history-results">'+renderHistoryResults(runtime)+'</div>';
  }
  function render(runtime) {
    if(runtime.disposed||!runtime.root)return;
    const tabs='<div class="ma-tabs" role="tablist">'+
      [['explorer','Audit Log Explorer'],['history','Business Record History']].map(([k,v])=>
        '<button class="ma-tab" role="tab" aria-selected="'+(runtime.tab===k)+'" data-act="tab" data-value="'+k+'">'+v+'</button>')
        .join("")+'</div>';
    const messages=runtime.error?'<div class="ma-error">'+escapeHtml(runtime.error)+'</div>':'';
    const warning=runtime.warnings.length?'<div class="ma-banner warn">'+escapeHtml(runtime.warnings.join(" | "))+'</div>':'';
    runtime.root.innerHTML=tabs+messages+warning+
      (runtime.tab==="explorer"?renderExplorer(runtime):renderHistory(runtime))+
      '<p class="ma-note">Development integration: configure CanViewSysOperationAudit plus server-side MCIT permissions before production use. Event fields absent from the source are not fabricated.</p>';
  }
  function downloadCsv(rows,filename) {
    const headers=["Audit ID","Timestamp","User","Action","Source","Record Type","Record ID","Outcome","Description","Client IP"];
    function cell(value) {
      let s=String(value==null?"":value);
      if(/^[\s]*[=+\-@\t\r]/.test(s))s="'"+s; // Excel formula injection protection
      return '"'+s.replace(/"/g,'""')+'"';
    }
    const items=[headers,...rows.map(r=>[
      r.id,dateText(r.time),r.user,r.action,r.module,r.recordType,
      r.targetNumber||r.targetId,r.outcome,r.description,r.clientIP
    ])];
    const blob=new Blob(["\ufeff"+items.map(r=>r.map(cell).join(",")).join("\r\n")],
      {type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");a.href=url;a.download=filename;
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),2000);
  }
  function handleClick(runtime,e) {
    const control=e.target.closest("[data-act]");
    if(!control||!runtime.root.contains(control))return;
    const action=control.dataset.act;
    if(action==="tab"){
      runtime.tab=control.dataset.value;runtime.selectedId="";runtime.page=0;render(runtime);
    } else if(action==="outcome"){
      runtime.filters.outcome=control.dataset.value;runtime.page=0;runtime.selectedId="";render(runtime);
    } else if(action==="reset"){
      runtime.filters={from:"",to:"",user:"",module:"",action:"",type:"",outcome:"All"};
      runtime.page=0;runtime.selectedId="";render(runtime);
    } else if(action==="refresh"){
      fetchAudit(runtime);
    } else if(action==="detail"){
      runtime.selectedId=control.dataset.id===runtime.selectedId?"":control.dataset.id;render(runtime);
    } else if(action==="prev" || action==="next"){
      runtime.page+=action==="prev"?-1:1;runtime.selectedId="";render(runtime);
    } else if(action==="history-search"){
      runtime.historyTerm=runtime.historyInput.trim();runtime.selectedId="";runtime.page=0;render(runtime);
    } else if(action==="history-clear"){
      runtime.historyTerm="";runtime.historyInput="";runtime.selectedId="";runtime.page=0;render(runtime);
    } else if(action==="view-history"){
      runtime.historyTerm=control.dataset.value||"";
      runtime.historyInput=runtime.historyTerm;
      runtime.tab="history";runtime.historyMode="timeline";
      runtime.page=0;runtime.selectedId="";render(runtime);
    } else if(action==="history-timeline" || action==="history-table"){
      runtime.historyMode=action==="history-table"?"table":"timeline";
      runtime.selectedId="";runtime.page=0;render(runtime);
    } else if(action==="csv"){
      downloadCsv(filteredRows(runtime),"MCIT_Audit_Log_"+new Date().toISOString().slice(0,10)+".csv");
    } else if(action==="print"){
      window.print();
    }
  }
  function handleChange(runtime,e) {
    const field=e.target?.dataset?.filter;
    if(!field)return;
    runtime.filters[field]=e.target.value;runtime.page=0;runtime.selectedId="";
    if(e.type==="change" || field==="user"){
      // For search typing, update the table only to preserve input focus.
      if(e.type==="input" && field==="user"){
        const target=runtime.root.querySelector("#explorer-table");
        if(target)target.innerHTML=renderTable(runtime,filteredRows(runtime));
      } else render(runtime);
    }
  }
  function handleInput(runtime,e) {
    if(e.target?.id==="ma-record") {
      runtime.historyInput=e.target.value;
      runtime.historyTerm=runtime.historyInput.trim();
      runtime.page=0;runtime.selectedId="";
      const results=runtime.root?.querySelector("#mcit-history-results");
      if(results)results.innerHTML=renderHistoryResults(runtime); // preserve typing focus
    }
    if(e.target?.dataset?.filter==="user")handleChange(runtime,e);
  }
  function isDesigner() {
    const url=String(location.href||"");
    return /(?:page|ui|schema|freedom)[-_]?designer|designer(?:\/|%2f|\?|#)/i.test(url);
  }
  function mount(runtime) {
    if(runtime.disposed || isDesigner())return true;
    const stage=document.querySelector("."+STAGE);
    if(!stage)return false;
    if(!document.getElementById(STYLE_ID)){
      const sheet=document.createElement("style");sheet.id=STYLE_ID;
      sheet.textContent=CSS;document.head.appendChild(sheet);
    }
    let root=stage.querySelector("#"+ROOT_ID);
    if(!root){root=document.createElement("div");root.id=ROOT_ID;stage.appendChild(root);}
    runtime.root=root;
    // Only tint this page's immediate host; do not affect other Creatio sections.
    runtime.host=stage.parentElement || null;
    if(runtime.host)runtime.host.classList.add(HOST_CLASS);
    root.addEventListener("click",runtime.onClick);
    root.addEventListener("change",runtime.onChange);
    root.addEventListener("input",runtime.onInput);
    fetchAudit(runtime);
    return true;
  }
  function startMount(runtime) {
    if(isDesigner())return;
    let retries=0;
    const attempt=()=>{
      if(runtime.disposed || ++retries>100)return;
      if(!mount(runtime))runtime.timer=setTimeout(attempt,100);
    };
    attempt();
  }
  function dispose(runtime) {
    if(!runtime || runtime.disposed)return;
    runtime.disposed=true;
    if(runtime.timer)clearTimeout(runtime.timer);
    if(runtime.host)runtime.host.classList.remove(HOST_CLASS);
    if(runtime.root){
      runtime.root.removeEventListener("click",runtime.onClick);
      runtime.root.removeEventListener("change",runtime.onChange);
      runtime.root.removeEventListener("input",runtime.onInput);
    }
  }
  return {
    viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
      // Hide the complete inherited list-page layout: not only its child
      // buttons/grid. The custom Audit stage is a direct child of "Main",
      // so these sibling containers may be hidden without hiding the audit UI.
      {"operation":"merge","name":"MainHeader","values":{"visible":false}},
      {"operation":"merge","name":"MainContainer","values":{"visible":false}},
      // Keep the narrower inherited controls hidden as a compatibility fallback.
      {"operation":"merge","name":"AddButton","values":{"visible":false}},
      {"operation":"merge","name":"DataImportButton","values":{"visible":false}},
      {"operation":"merge","name":"TitleContainer","values":{"visible":false}},
      {"operation":"merge","name":"MainFilterContainer","values":{"visible":false}},
      {"operation":"merge","name":"DataTable","values":{"visible":false}},
      {"operation":"merge","name":"Dashboards","values":{"visible":false}},
      {"operation":"merge","name":"FolderTree","values":{"visible":false}},
      {
        "operation":"insert","name":"UsrMCITAuditStage",
        "values":{"type":"crt.FlexContainer","direction":"column",
          "alignItems":"stretch","wrap":"nowrap","gap":"none",
          "fitContent":true,"items":[],"classes":[STAGE]},
        "parentName":"Main","propertyName":"items","index":0
      }
    ]/**SCHEMA_VIEW_CONFIG_DIFF*/,
    viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
      {"operation":"merge","path":[],"values":{"attributes":{}}}
    ]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
    modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
      // Repair only the missing nested property of the inherited section PDS.
      // Do NOT replace PDS, primaryDataSourceName or scope: that caused V5.1
      // to block page initialization in this environment.
      // The actual Explorer still queries the 3 audit objects via sdk.Model.
      {"operation":"merge","path":["dataSources","PDS","config"],
        "values":{"entitySchemaName":"UsrMCITAuditLog"}}
    ]/**SCHEMA_MODEL_CONFIG_DIFF*/,
    handlers: /**SCHEMA_HANDLERS*/[
      {request:"crt.HandleViewModelInitRequest",handler:async(request,next)=>{
        const result=await next?.handle(request);
        if(typeof document==="undefined"||isDesigner())return result;
        const old=document[RUNTIME_PROP];if(old)dispose(old);
        const runtime={disposed:false,loading:false,root:null,rows:[],tab:"explorer",
          filters:{from:"",to:"",user:"",module:"",action:"",type:"",outcome:"All"},
          historyInput:"",historyTerm:"",historyMode:"timeline",selectedId:"",page:0,
          warnings:[],error:"",timer:null,host:null,onClick:null,onChange:null,onInput:null};
        runtime.onClick=e=>handleClick(runtime,e);
        runtime.onChange=e=>handleChange(runtime,e);
        runtime.onInput=e=>handleInput(runtime,e);
        document[RUNTIME_PROP]=runtime;
        startMount(runtime);
        return result;
      }},
      {request:"crt.HandleViewModelDestroyRequest",handler:async(request,next)=>{
        if(typeof document!=="undefined"){
          const runtime=document[RUNTIME_PROP];dispose(runtime);
          if(document[RUNTIME_PROP]===runtime)delete document[RUNTIME_PROP];
        }
        return next?.handle(request);
      }}
    ]/**SCHEMA_HANDLERS*/,
    converters: /**SCHEMA_CONVERTERS*/{} /**SCHEMA_CONVERTERS*/,
    validators: /**SCHEMA_VALIDATORS*/{} /**SCHEMA_VALIDATORS*/
  };
});
