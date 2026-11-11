/*
 * MCIT DASHBOARD SECTION - paste the ENTIRE file into UsrDashboard_ListPage > Source code.
 * Design: supplied MCIT VM Portal/src/mcit/dashboard.js and Figma screenshot.
 * Actual sidebar section: UsrDashboard_ListPage, parent ListPageV3Template.
 * Corrects the section schema name, removes its inherited list, and binds PDS.
 *
 * WHAT THIS FILE DOES:
 *   1. Reads the current user's requests with the same scope as My Requests.
 *   2. Reuses the INSTALLED UsrVMPortalService (load only) for scoped VMs,
 *      contracts and available points, including existing pending reservations.
 *   3. Reads real point transactions, request item counts and status history.
 *   4. Draws the cards, chart, recent requests, notifications and quick actions.
 *   5. Navigates to the existing colleague pages and downloads a real CSV report.
 *
 * It creates NO records, changes NO workflow and adds NO approval stage.
 * It does not create a second sidebar/header inside the existing Creatio shell.
 * Figma's sample values are NOT used as a fallback when a query fails.
 */
define("UsrDashboard_ListPage", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/, function(sdk) {
  "use strict";

  // EDIT ONLY THESE ROUTES if your colleague renames a destination page.
  const CONFIG = {
    requestsPage: "UsrMyRequests_ListPage",          // Existing My Requests section.
    newRequestPage: "UsrMCITNewRequest_WizardPage",  // Existing full-page request wizard.
    requestDetailPage: "UsrMCITRequestDetail_Page",  // Existing full-page request details.
    virtualMachinesPage: "UsrVMPortal_ListPage",     // NEW Virtual Machines section, not native Inventory.
    lifecyclePage: "UsrVMLifecycle_ListPage",        // Existing lifecycle section.
    servicePath: "/0/ServiceModel/UsrVMPortalService.svc/Execute",
    pageSize: 250,                                  // Read in batches instead of silently truncating.
    maxRows: 10000,                                 // Stop with an error rather than show partial totals.
    timeoutMs: 45000                                // A stalled request gets an actionable message.
  };

  // Transaction IDs match the EXISTING VM service/database; preserve/remap on migration.
  const TYPES = {
    consumption: "9714b14c-2a5f-4d72-a114-78833ef52f42",
    restoration: "65a9c955-4b2a-4e70-9bac-4af75f1e0aed",
    adjustment: "e7b46d02-0f02-4316-92b5-b8110d2e0887"
  };

  // Display groups only: these do NOT change the stored request status or workflow.
  const STATUSES = [
    {key:"draft", label:"Draft Requests", short:"Draft", color:"#9ca3af", names:["draft"]},
    {key:"submitted", label:"Submitted", short:"Submitted", color:"#2563eb", names:["submitted"]},
    {key:"under_review", label:"Under TE Review", short:"Under TE Review", color:"#5b21b6",
      names:["under te review","under review","under technical review","technical review","pending te review","financial review","under financial review","pending technical review","pending financial review"]},
    {key:"requires_correction", label:"Requires Correction", short:"Requires Correction", color:"#d97706",
      names:["requires correction","correction required","returned for correction"]},
    {key:"provisioning", label:"Provisioning in Progress", short:"Provisioning", color:"#16a34a",
      names:["provisioning","provisioning in progress","in provisioning","te approved"]},
    {key:"completed", label:"Completed", short:"Completed", color:"#047857", names:["completed","fulfilled"]},
    {key:"rejected", label:"Rejected", short:"Rejected", color:"#dc2626", names:["rejected"]},
    {key:"archived", label:"Archived", short:"Archived", color:"#64748b", names:["archived","cancelled","canceled"]},
    {key:"other", label:"Other Statuses", short:"Other", color:"#475569", names:[]}
  ];

  // Helpers convert SDK lookup objects to their GUID or display label.
  const id = value => String(value?.value ?? value?.Id ?? value ?? "").toLowerCase();
  const label = value => typeof value === "string" ? value : String(value?.displayValue ?? value?.Name ?? value?.name ?? "");
  const guid = value => /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(String(value || "")) && !/^0{8}-0{4}-0{4}-0{4}-0{12}$/.test(String(value));
  const text = value => String(value ?? "");
  // All database/user values are escaped before insertion into HTML.
  const esc = value => text(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
  const normal = value => label(value).trim().toLowerCase().replace(/[_-]+/g," ").replace(/\s+/g," ");
  // Ignore spaces as well, so a lookup labelled UnderTechnicalReview is still classified.
  const group = value => STATUSES.find(s => s.names.some(name=>normal(name).replace(/\s/g,"")===normal(value).replace(/\s/g,"")))?.key || "other";
  const number = value => {
    if (value === null || value === undefined || value === "" || !Number.isFinite(Number(value))) throw Error("A required point value is missing or invalid.");
    return Number(value);
  };
  const fmt = value => value === null || value === undefined ? "—" : new Intl.NumberFormat("en",{maximumFractionDigits:2}).format(value);
  const date = value => {
    if (!value) return "—";
    const d = new Date(value);
    // Ignore database minimum-date placeholders rather than displaying year 0001.
    return Number.isNaN(d.getTime()) || d.getFullYear()<1900 ? "—" : d.toLocaleDateString("en-CA",{year:"numeric",month:"2-digit",day:"2-digit"});
  };
  // Resolve /MCIT from the current location instead of hardcoding localhost.
  const appRoot = () => location.pathname.split(/\/0(?:\/|$)/)[0].replace(/\/$/,"");
  const sectionUrl = schema => appRoot()+"/0/Shell/#Section/"+encodeURIComponent(schema);
  const statusInfo = key => STATUSES.find(s => s.key === key) || STATUSES[STATUSES.length-1];

  // SVG is internal trusted markup; database labels are never accepted as an SVG path.
  const ICONS = {
    plus:'<path d="M12 5v14M5 12h14"/>',
    download:'<path d="M12 3v12m-4-4 4 4 4-4M5 16v5h14v-5"/>',
    requests:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 11l2 2 4-4"/>',
    contract:'<path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h6"/>',
    alert:'<path d="m12 3 10 18H2L12 3zM12 9v5M12 17h.01"/>',
    vm:'<rect x="3" y="3" width="18" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    refresh:'<path d="M20 11a8 8 0 0 0-14-5L3 9m0-6v6h6M4 13a8 8 0 0 0 14 5l3-3m0 6v-6h-6"/>',
    arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>',
    close:'<path d="m6 6 12 12M18 6 6 18"/>',
    lifecycle:'<path d="M20 7h-9m9 0-4-4m4 4-4 4M4 17h9m-9 0 4 4m-4-4 4-4"/>'
  };
  const icon = name => `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]||ICONS.requests}</svg>`;

  // Match the exported design while keeping CSS isolated inside Shadow DOM.
  const CSS = `
    /* Page frame and typography; Bpmonline Rubik reuses Creatio's installed font. */
    :host{display:block;width:100%;min-width:0;color:#102238;font-family:Rubik,"Bpmonline Rubik",Arial,sans-serif;background:#f5f4f8}
    *{box-sizing:border-box}button,select,a{font:inherit}button,a,select{-webkit-tap-highlight-color:transparent}
    button{cursor:pointer}button:disabled{opacity:.55;cursor:wait}button:focus-visible,a:focus-visible,select:focus-visible{outline:3px solid #bba1f2;outline-offset:3px}
    .page{padding:30px;max-width:1800px;margin:0 auto;display:flex;flex-direction:column;gap:30px;min-height:75vh}
    h1,h2,h3,p{margin:0}h1{font-size:25px;font-weight:700;line-height:1.3}h2{font-size:17px;font-weight:700}p{line-height:1.6}
    .muted{color:#73839a}.heading{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;flex-wrap:wrap}
    .welcome{margin-top:5px;color:#6b7d93;font-size:16px}.actions{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
    .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:46px;padding:11px 20px;border:1px solid #e1e3e9;background:#fff;color:#334155;border-radius:15px;font-weight:600;font-size:15px;text-decoration:none;white-space:nowrap}
    .btn:hover{background:#faf8ff}.btn.primary{background:linear-gradient(100deg,#5b21b6,#7024ee);border-color:transparent;color:#fff}
    .btn.small{min-height:34px;padding:6px 12px;font-size:12px;border-radius:10px}.btn.icon-only{padding:8px;min-height:34px}.link{border:0;background:none;color:#6120be;font-size:13px;cursor:pointer;padding:4px;text-decoration:none}
    /* Shared white cards keep the same thin border and rounded corners as Figma. */
    .card{background:#fff;border:1px solid #e1e3e9;border-radius:20px;min-width:0}.card-pad{padding:25px}.card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:22px 25px;border-bottom:1px solid #eef0f4}
    .contract{display:flex;align-items:center;gap:16px;padding:15px 18px;flex-wrap:wrap}.contract>svg{color:#9ba5b6}.contract label{font-weight:600;font-size:16px;color:#536276}
    select{border:1px solid #e1e3e9;border-radius:15px;background:#fff;color:#20364e;min-height:40px;padding:6px 15px;width:min(600px,100%);font-size:16px}
    .contract .refresh{margin-left:auto;display:flex;align-items:center;gap:10px}.asof{font-size:11px;color:#8994a5}.notice{display:flex;gap:14px;padding:16px 20px;border:1px solid #fcd34d;border-radius:15px;background:#fffbeb;color:#a5470a;font-size:15px;align-items:center}
    .notice svg{flex-shrink:0}.notice.error{background:#fff1f2;border-color:#fecdd3;color:#b91c1c}.notice.info{background:#eff6ff;border-color:#bfdbfe;color:#2451a3}.notice ul{margin:0;padding-left:16px;line-height:1.6}.notice .link{color:inherit;text-decoration:underline;font-weight:600}
    /* Seven KPI cards on wide screens; media queries below reduce the column count. */
    .kpis{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:15px}.kpi{padding:20px;text-align:left;display:flex;flex-direction:column;gap:14px;min-height:134px;color:#172b43;transition:box-shadow .15s,transform .15s}
    .kpi:hover{box-shadow:0 5px 18px #38206912;transform:translateY(-1px)}.kpi .caption{font-size:14px;font-weight:600;color:#6b7b90;line-height:1.4}.kpi .value{font-size:37px;line-height:1.1;font-weight:700}
    /* Points/chart use a 2:1 split; notifications/quick actions reverse that split. */
    .middle,.bottom{display:grid;grid-template-columns:minmax(0,2.04fr) minmax(0,1fr);gap:20px}.bottom{grid-template-columns:minmax(0,1fr) minmax(0,2.04fr)}
    .point-title{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:22px}.point-title span{font-size:14px;color:#94a0b2}.point-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:15px}
    .point{background:#f9f7fc;padding:16px 15px;border-radius:16px;display:flex;flex-direction:column;gap:10px;min-width:0}.point .name{font-size:14px;color:#74839a}.point strong{font-size:25px;font-weight:700;overflow-wrap:anywhere}.point small{font-size:13px;color:#9aa4b6}
    .rate-label{display:flex;justify-content:space-between;font-size:14px;color:#74839a;margin:20px 0 8px}.track{height:10px;border-radius:8px;background:#f2f3f6;overflow:hidden}.bar{height:100%;border-radius:8px;background:linear-gradient(90deg,#5b21b6,#7628fa)}
    .chart-area{display:flex;align-items:center;gap:18px;margin-top:20px}.donut{width:180px;height:180px;flex:0 0 180px}.donut text{font-family:Rubik,Arial,sans-serif}.legend{display:flex;flex-direction:column;gap:10px;flex:1;min-width:0}.legend button{display:flex;align-items:center;gap:10px;border:0;background:none;padding:4px 0;text-align:left;font-size:13px;color:#536276}.legend button:hover{color:#5b21b6}.dot{width:12px;height:12px;border-radius:50%;flex:0 0 12px}.legend strong{margin-left:auto;color:#172b43}
    /* Tables scroll horizontally instead of squeezing every column on smaller screens. */
    .table-scroll{overflow:auto;border-radius:0 0 20px 20px}table{border-collapse:collapse;width:100%;font-size:13px}th{background:#fafafa;color:#758195;font-weight:600;font-size:12px;text-align:left;padding:16px;white-space:nowrap}td{padding:17px 16px;border-top:1px solid #f1f2f5;color:#526279;vertical-align:middle}.row:hover{background:#fbf9ff}.code{color:#6120be;font-family:Consolas,monospace;font-size:12px;overflow-wrap:anywhere}.title{color:#20334d;font-weight:600}.pill{display:inline-block;padding:5px 10px;border-radius:30px;font-size:11px;font-weight:600;white-space:nowrap;background:#f4f1fa}.empty{padding:35px;text-align:center;font-size:14px;color:#7c8a9b}.request-open{border:0;background:none;text-align:left;cursor:pointer;padding:0;max-width:220px}.request-open.title{display:block;max-width:min(100%,220px);white-space:normal;overflow-wrap:anywhere}.request-open:hover{text-decoration:underline}.minor{font-size:11px;color:#8b97a8;margin-top:5px}
    .updates{display:flex;flex-direction:column}.update{display:flex;gap:14px;padding:17px 25px;border-bottom:1px solid #f0f1f5}.update:last-child{border-bottom:0}.update .dot{width:6px;height:6px;flex:0 0 6px;background:#6624bd;margin-top:7px}.update button{background:none;border:0;padding:0;text-align:left;color:#23374f;font-weight:600;font-size:13px;cursor:pointer}.update button:hover{color:#6120be}.update p{font-size:12px;color:#8290a4;margin-top:4px}
    .quick-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px;margin-top:22px}.quick{display:flex;gap:15px;align-items:flex-start;text-align:left;border:1px solid #e2e4ea;background:#fafafa;border-radius:15px;padding:20px;text-decoration:none;color:#1d3048}.quick:hover{box-shadow:0 3px 12px #43236f12}.quick.primary{background:#f5f0ff;border-color:#6922bf}.quick-icon{width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:12px;background:#f0f1f5;color:#778396;flex-shrink:0}.quick.primary .quick-icon{background:#6321b9;color:#fff}.quick strong{font-size:14px}.quick.primary strong{color:#6020b9}.quick p{font-size:12px;color:#8190a4;margin-top:4px}
    .footnote{font-size:11px;color:#8b97a8;line-height:1.6}.count{border-radius:30px;padding:3px 7px;background:#dc2626;color:#fff;font-size:11px;font-weight:700}.loading{padding:50px 25px;text-align:center;color:#708099}.sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
    /* Native dialog supplies keyboard Escape support and modal focus behavior. */
    dialog{border:1px solid #e1e3e9;border-radius:20px;padding:0;width:min(1100px,94vw);max-height:85vh;color:#20364e;background:#fff;box-shadow:0 25px 100px #17213c38}dialog::backdrop{background:#14203966}.dialog-body{overflow:auto;max-height:65vh}.dialog-head{padding:20px;display:flex;justify-content:space-between;align-items:center;gap:20px;border-bottom:1px solid #e9ecf1}.dialog-foot{padding:15px 20px;border-top:1px solid #e9ecf1;display:flex;gap:10px;justify-content:flex-end}
    @media(min-width:1800px){.page{padding:30px}}@media(max-width:1250px){.kpis{grid-template-columns:repeat(4,minmax(0,1fr))}.middle{grid-template-columns:minmax(0,1.7fr) minmax(300px,1fr)}.chart-area{gap:8px}.donut{width:145px;height:145px;flex-basis:145px}.point-grid{gap:9px}.point{padding:14px 11px}.point strong{font-size:22px}}
    @media(max-width:980px){.page{padding:20px;gap:20px}.middle,.bottom{grid-template-columns:1fr}.chart-area{gap:30px}.donut{width:180px;height:180px;flex-basis:180px}.contract .refresh{margin-left:0}.heading .actions{width:100%}.welcome{font-size:14px}}
    @media(max-width:620px){.page{padding:14px;gap:16px}h1{font-size:22px}.kpis{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.kpi{padding:16px;min-height:112px}.point-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.quick-grid{grid-template-columns:1fr}.btn{font-size:12px;padding:10px 12px;min-height:40px}.card-pad{padding:18px}.card-head{padding:18px}.chart-area{gap:10px}.donut{width:145px;height:145px;flex-basis:145px}.asof{display:none}}
  `;

  // A timeout stops waiting; this dashboard issues READS only, never save/submit calls.
  async function deadline(promise, message) {
    let timer;
    try { return await Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error(message)),CONFIG.timeoutMs);})]); }
    finally { clearTimeout(timer); }
  }

  // SDK versions need the actual FilterGroup.items object preserved on serialization.
  const compatible = filter => ({...filter,items:filter.items});
  async function equalGroup(conditions, isOr=false) {
    const f=new sdk.FilterGroup();
    if(isOr) f.logicalOperation=sdk.LogicalOperatorType.Or;
    for(const [column,value] of conditions) await f.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,column,value);
    return f;
  }

  // Stable sorting + paging avoids counting only the first returned page.
  async function readAll(schema, attributes, filter) {
    const model=await sdk.Model.create(schema), result=[], seen=new Set();
    for(let offset=0;offset<=CONFIG.maxRows;offset+=CONFIG.pageSize) {
      const rows=await model.load({
        attributes,
        parameters:filter?[{type:sdk.ModelParameterType.Filter,value:compatible(filter)}]:[],
        options:{pagingConfig:{rowsOffset:offset,rowCount:CONFIG.pageSize},sortingConfig:{columns:[{columnName:"Id",direction:"asc"}]}}
      });
      if(!Array.isArray(rows)) throw Error(schema+" returned an invalid result.");
      if(offset===CONFIG.maxRows && rows.length) throw Error(schema+" exceeds the dashboard's 10,000-row limit. Narrow the scope before reporting.");
      for(const row of rows) {
        const key=id(row.Id);
        if(!guid(key) || seen.has(key)) throw Error(schema+" returned unstable paging. Refresh before reporting totals.");
        seen.add(key); result.push(row);
      }
      if(rows.length<CONFIG.pageSize) return result;
    }
    return result;
  }

  // Query only the already scoped parent GUIDs, in bounded OR-filter batches.
  async function readRelated(schema, attributes, parentColumn, parentIds) {
    const unique=[...new Set(parentIds)].filter(guid), rows=[];
    for(let i=0;i<unique.length;i+=40) {
      const f=await equalGroup(unique.slice(i,i+40).map(value=>[parentColumn,value]),true);
      rows.push(...await readAll(schema,attributes,f));
      if(rows.length>CONFIG.maxRows) throw Error(schema+" exceeds the dashboard's 10,000-row limit.");
    }
    return rows;
  }

  // Read the same backend as VM Lifecycle; do not recalculate spendable points incorrectly.
  async function readPortal() {
    const csrf=document.cookie.match(/(?:^|;\s*)BPMCSRF=([^;]*)/);
    if(!csrf) throw Error("Refresh your signed-in Creatio session; the security token is missing.");
    const controller=new AbortController(), timer=setTimeout(()=>controller.abort(),CONFIG.timeoutMs);
    try {
      const response=await fetch(appRoot()+CONFIG.servicePath,{
        method:"POST",credentials:"same-origin",signal:controller.signal,
        headers:{"Content-Type":"application/json",Accept:"application/json",ForceUseSession:"true",BPMCSRF:decodeURIComponent(csrf[1])},
        body:JSON.stringify({payload:JSON.stringify({action:"load"})}) // READ operation only.
      });
      if(!response.ok) throw Error("VM portal connection failed (HTTP "+response.status+"). Check the existing service deployment.");
      let responseData=await response.json(); responseData=responseData.ExecuteResult??responseData;
      if(typeof responseData==="string") responseData=JSON.parse(responseData);
      if(responseData.success!==true) throw Error(responseData.message||"The VM portal could not load dashboard data.");
      const data=responseData.data;
      if(!Array.isArray(data?.contracts)||!Array.isArray(data?.vms)) throw Error("The VM service returned invalid dashboard data.");
      // A duplicate/missing contract GUID would make point sums unreliable.
      const ids=data.contracts.map(c=>id(c.id));
      if(ids.some(v=>!guid(v))||new Set(ids).size!==ids.length) throw Error("The VM service returned invalid contract identities.");
      return data;
    } catch(error) {
      if(error.name==="AbortError") throw Error("VM portal loading timed out. Use Refresh to retry.");
      throw error;
    } finally {clearTimeout(timer);}
  }

  // Read the current Contact and EXACT existing My Requests visibility rule.
  async function readIdentityAndRequests() {
    const sys=await new sdk.SysValuesService().loadSysValues(), contactId=id(sys?.userContact);
    if(!guid(contactId)) throw Error("Your Creatio Contact could not be resolved. Requests have not been loaded.");
    const contacts=await readAll("Contact",["Id","Name","Account"],await equalGroup([["Id",contactId]]));
    if(contacts.length!==1) throw Error("Your Contact is missing or inaccessible.");
    const contact=contacts[0], accountId=id(contact.Account);
    const conditions=[["CreatedBy",contactId]];
    if(guid(accountId)) conditions.push(["UsrAccount",accountId]);
    // This is the colleague's owner OR legacy-account scope, not a new admin override.
    const scope=await equalGroup(conditions,true);
    const requests=await readAll("UsrVMRequest",["Id","UsrNumber","UsrName","UsrAccount","UsrProject","UsrContract","UsrStatus","UsrRequestType","UsrSubmittedOn","CreatedOn"],scope);
    return {user:{name:label(contact.Name)||label(sys.userContact)||"Creatio user",authority:label(contact.Account)},requests};
  }

  // CSV quoting also prevents spreadsheet formulas being executed from record text.
  function downloadCsv(rows) {
    const cell=value=>{
      let s=text(value);
      if(/^[\s\uFEFF]*[=+@-]/.test(s)) s="'"+s;
      return '"'+s.replace(/"/g,'""')+'"';
    };
    const body="\uFEFF"+rows.map(row=>row.map(cell).join(",")).join("\r\n");
    const url=URL.createObjectURL(new Blob([body],{type:"text/csv;charset=utf-8"}));
    const a=document.createElement("a"); a.href=url;a.download="MCIT-Dashboard-"+new Date().toISOString().slice(0,10)+".csv";
    document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  const TAG="usr-mcit-dashboard-section-v2", TYPE="usr.MCITDashboardSectionV2";
  if(!customElements.get(TAG)) {
    class Dashboard extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({mode:"open"}); // Isolate the dashboard styles from Creatio.
        this.selected="all";this.data=null;this.loading=false;this.errors=[];this.generation=0;
        this.shadowRoot.addEventListener("click",event=>this.onClick(event));
        this.shadowRoot.addEventListener("change",event=>{
          if(event.target.id==="active-contract") {this.selected=event.target.value;this.render();}
        });
      }
      connectedCallback() {if(!this.data&&!this.loading) this.reload();}
      disconnectedCallback() {this.generation++;this.loading=false;this.shadowRoot.querySelector("dialog[open]")?.close();}

      // Refresh always reads real data; failures are displayed, never replaced by demo values.
      async reload() {
        if(this.loading) return;
        const run=++this.generation;this.loading=true;this.errors=[];this.render();
        const next={requests:null,portal:null,items:null,history:null,ledger:null,user:null};
        try {
          const results=await Promise.allSettled([
            deadline(readIdentityAndRequests(),"Request loading timed out. Use Refresh to retry."),
            readPortal()
          ]);
          if(results[0].status==="fulfilled") Object.assign(next,results[0].value);
          else this.errors.push("Requests: "+(results[0].reason.message||results[0].reason));
          if(results[1].status==="fulfilled") next.portal=results[1].value;
          else this.errors.push("VMs / points: "+(results[1].reason.message||results[1].reason));
          // These independent reads enrich the UI without hiding unrelated successful data.
          const requestIds=(next.requests||[]).map(r=>id(r.Id)),contractIds=(next.portal?.contracts||[]).map(c=>id(c.id));
          const jobs=[
            ["items",next.requests===null?null:readRelated("UsrVMRequestItem",["Id","UsrRequest"],"UsrRequest",requestIds)],
            ["history",next.requests===null?null:readRelated("UsrRequestStatusHistory",["Id","UsrRequest","UsrNewStatus","UsrChangedOn","UsrReason"],"UsrRequest",requestIds)],
            ["ledger",next.portal===null?null:readRelated("UsrPointTransaction",["Id","UsrContract","UsrTransactionType","UsrQuantity"],"UsrContract",contractIds)]
          ];
          const enriched=await Promise.allSettled(jobs.map(([key,job])=>job===null?Promise.resolve(null):deadline(job,key+" loading timed out. Use Refresh to retry.")));
          enriched.forEach((result,i)=>{
            if(result.status==="fulfilled") next[jobs[i][0]]=result.value;
            else this.errors.push(jobs[i][0]+": "+(result.reason.message||result.reason));
          });
          // Do not silently turn corrupt/missing transaction quantities into zero points.
          if(next.ledger!==null) {
            try {for(const row of next.ledger)number(row.UsrQuantity);}
            catch(error){next.ledger=null;this.errors.push("Point ledger: "+error.message);}
          }
          if(run!==this.generation) return; // Ignore an old response after navigating away.
          next.loadedAt=new Date();this.data=next;
          if(this.selected!=="all"&&!this.contracts().some(c=>id(c.id)===this.selected)) this.selected="all";
        } catch(error) {if(run===this.generation)this.errors.push(error.message||String(error));}
        finally {if(run===this.generation){this.loading=false;this.render();}}
      }

      contracts() {return this.data?.portal?.contracts||[];}
      filteredRequests() {return (this.data?.requests||[]).filter(r=>this.selected==="all"||id(r.UsrContract)===this.selected);}
      filteredVms() {return (this.data?.portal?.vms||[]).filter(v=>this.selected==="all"||id(v.contractId)===this.selected);}
      counts() {
        const result=Object.fromEntries(STATUSES.map(s=>[s.key,0]));
        for(const row of this.filteredRequests()) result[group(row.UsrStatus)]++;
        return result;
      }
      selectedContracts() {return this.contracts().filter(c=>this.selected==="all"||id(c.id)===this.selected);}

      // Available points come from the service, which already subtracts pending reservations.
      // Consumed/restored come from real ledger rows; the Figma formula defines Total Balance.
      points() {
        if(!this.data?.portal) return {available:null,consumed:null,restored:null,total:null,rate:null};
        const contracts=this.selectedContracts();
        if(contracts.some(c=>c.configurationError)) return {available:null,consumed:null,restored:null,total:null,rate:null};
        try {
          const available=contracts.reduce((sum,c)=>sum+number(c.availablePoints),0);
          if(this.data.ledger===null)return {available,consumed:null,restored:null,total:null,rate:null};
          const ids=new Set(contracts.map(c=>id(c.id)));let consumed=0,restored=0;
          for(const row of this.data.ledger) {
            if(!ids.has(id(row.UsrContract)))continue;
            const qty=number(row.UsrQuantity),type=id(row.UsrTransactionType);
            if(type===TYPES.consumption)consumed+=Math.abs(qty);
            if(type===TYPES.restoration)restored+=Math.abs(qty);
            if(type===TYPES.adjustment&&qty>0)restored+=qty; // Current downgrade returns points as positive adjustment.
          }
          const total=available+consumed-restored; // Exact definition used in the supplied Figma export.
          const denominator=available+consumed;
          const rate=denominator>0?Math.max(0,Math.min(100,Math.round(consumed/denominator*100))):0;
          return {available,consumed,restored,total,rate};
        } catch {return {available:null,consumed:null,restored:null,total:null,rate:null};}
      }

      requestItems(requestId) {
        return this.data.items===null?"—":this.data.items.filter(item=>id(item.UsrRequest)===requestId).length;
      }
      submittedOn(row) {
        if(row.UsrSubmittedOn&&date(row.UsrSubmittedOn)!=="—")return row.UsrSubmittedOn;
        // Use a REAL Submitted transition when the explicit column is empty.
        return (this.data.history||[]).filter(h=>id(h.UsrRequest)===id(row.Id)&&group(h.UsrNewStatus)==="submitted")
          .map(h=>h.UsrChangedOn).filter(Boolean).sort((a,b)=>new Date(a)-new Date(b))[0]||null;
      }
      updates() {
        const allowed=new Set(this.filteredRequests().map(r=>id(r.Id)));
        return (this.data?.history||[]).filter(h=>allowed.has(id(h.UsrRequest)))
          .sort((a,b)=>(new Date(b.UsrChangedOn).getTime()||0)-(new Date(a.UsrChangedOn).getTime()||0));
      }
      badge(value) {
        const info=statusInfo(group(value));
        return `<span class="pill" style="color:${info.color}">${esc(label(value)||"No status")}</span>`;
      }

      // Native page requests use the current view-model context when Creatio supplies it.
      async openRequest(recordId) {
        if(!guid(recordId))throw Error("This request does not have a valid record GUID.");
        await sdk.HandlerChainService.instance.process({type:"crt.OpenPageRequest",schemaName:CONFIG.requestDetailPage,
          modelInitConfigs:[{action:"edit",recordId}],$context:Dashboard.pageContext});
      }
      async newRequest() {
        await sdk.HandlerChainService.instance.process({type:"crt.OpenPageRequest",schemaName:CONFIG.newRequestPage,
          modelInitConfigs:[{action:"add"}],$context:Dashboard.pageContext});
      }

      async onClick(event) {
        const button=event.target.closest("[data-action]");if(!button)return;
        try {
          switch(button.dataset.action) {
            case "refresh":await this.reload();break;
            case "new":await this.newRequest();break;
            case "open":await this.openRequest(button.dataset.id);break;
            case "status":this.showDialog("requests",button.dataset.status);break;
            case "vms":this.showDialog("vms");break;
            case "updates":this.showDialog("updates");break;
            case "close":this.shadowRoot.querySelector("dialog")?.close();break;
            case "download":this.report();break;
          }
        } catch(error) {this.errors=[...this.errors,"Action: "+(error.message||error)];this.render();}
      }

      // Every exported number uses the SAME selected-contract data shown on the screen.
      report() {
        if(this.loading)throw Error("Wait for the dashboard refresh before downloading.");
        if(!this.data||this.errors.length||this.selectedContracts().some(c=>c.configurationError))throw Error("Resolve the displayed loading/configuration errors before downloading a report.");
        const metrics=this.counts(),points=this.points();
        if(Object.values(points).some(v=>v===null))throw Error("Point values are unavailable; refresh before reporting.");
        const scope=this.selected==="all"?"All Contracts":this.selectedContracts()[0]?.number||this.selected;
        const rows=[["Section","Record ID","Title","Status","Contract","Date","Metric","Value"]];
        rows.push(["Scope","",this.data.user.name,"",scope,new Date().toISOString(),"",""]);
        for(const status of STATUSES)rows.push(["KPI","","","",scope,"",status.label,metrics[status.key]]);
        rows.push(["KPI","","","",scope,"","Active VMs",this.filteredVms().filter(v=>normal(v.status)==="active").length]);
        for(const [key,value] of Object.entries(points))rows.push(["Points","","","",scope,"",key,value]);
        for(const request of this.filteredRequests())rows.push(["Request",label(request.UsrNumber)||id(request.Id),label(request.UsrName),label(request.UsrStatus),label(request.UsrContract),date(this.submittedOn(request)),"Items",this.requestItems(id(request.Id))]);
        downloadCsv(rows);
      }

      // Keep the Figma donut correct even when one status accounts for 100% of requests.
      chart() {
        if(this.data?.requests===null)return '<div class="empty">Request counts unavailable. Use Refresh.</div>';
        const counts=this.counts(),order=["completed","under_review","provisioning","requires_correction","draft","rejected","submitted","archived","other"];
        const segments=order.map(key=>({...statusInfo(key),count:counts[key]})).filter(s=>s.count>0);
        const total=segments.reduce((sum,s)=>sum+s.count,0),circumference=2*Math.PI*70;
        let offset=0;
        const arcs=segments.map(s=>{
          const size=total?s.count/total*circumference:0;
          const arc=`<circle cx="90" cy="90" r="70" fill="none" stroke="${s.color}" stroke-width="30" stroke-dasharray="${size} ${circumference-size}" stroke-dashoffset="${-offset}" transform="rotate(-90 90 90)"/>`;
          offset+=size;return arc;
        }).join("");
        return `<div class="chart-area"><svg class="donut" viewBox="0 0 180 180" role="img" aria-label="Status distribution: ${total} requests">
          <circle cx="90" cy="90" r="70" fill="none" stroke="#f0f1f5" stroke-width="30"/>${arcs}
          <text x="90" y="87" text-anchor="middle" font-size="26" font-weight="700" fill="#172b43">${total}</text>
          <text x="90" y="109" text-anchor="middle" font-size="12" fill="#9aa4b6">Total</text></svg>
          <div class="legend">${segments.length?segments.map(s=>`<button type="button" data-action="status" data-status="${s.key}"><span class="dot" style="background:${s.color}"></span><span>${esc(s.short)}</span><strong>${s.count}</strong></button>`).join(""):'<span class="muted">No requests in this scope</span>'}</div></div>`;
      }

      requestTable(rows) {
        return `<div class="table-scroll"><table><thead><tr>${["Request ID","Title","Authority","Project","Items","Submitted","Status","SLA",""]
          .map(h=>`<th scope="col">${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.length?rows.map(r=>`<tr class="row">
          <td><button class="request-open code" data-action="open" data-id="${id(r.Id)}">${esc(label(r.UsrNumber)||id(r.Id))}</button></td>
          <td><button class="request-open title" data-action="open" data-id="${id(r.Id)}">${esc(label(r.UsrName)||"Untitled request")}</button><div class="minor">${esc(label(r.UsrRequestType))}</div></td>
          <td>${esc(label(r.UsrAccount)||"—")}</td><td>${esc(label(r.UsrProject)||"—")}</td><td>${this.requestItems(id(r.Id))}</td>
          <td>${esc(date(this.submittedOn(r)))}</td><td>${this.badge(r.UsrStatus)}</td><td title="SLA timers are not configured in the existing request model.">—</td>
          <td><button type="button" class="link" data-action="open" data-id="${id(r.Id)}" aria-label="Open ${esc(label(r.UsrNumber)||label(r.UsrName))}">${icon("arrow")}</button></td></tr>`).join(""):
          '<tr><td colspan="9" class="empty">No requests match this scope.</td></tr>'}</tbody></table></div>`;
      }

      updatesHtml(all=false) {
        if(this.data?.history===null)return '<p class="empty">Request updates unavailable. Use Refresh.</p>';
        const events=all?this.updates():this.updates().slice(0,4),requests=new Map(this.filteredRequests().map(r=>[id(r.Id),r]));
        return `<div class="updates">${events.length?events.map(event=>{
          const request=requests.get(id(event.UsrRequest));
          return `<div class="update"><span class="dot"></span><div><button type="button" data-action="open" data-id="${id(event.UsrRequest)}">${esc(label(request?.UsrNumber)||label(request?.UsrName)||"Request")} · ${esc(label(event.UsrNewStatus)||"Status update")}</button><p>${esc(event.UsrReason||"Request status changed.")}</p><div class="minor">${esc(date(event.UsrChangedOn))}</div></div></div>`;
        }).join(""):'<p class="empty">No request status updates in this scope.</p>'}</div>`;
      }

      // Drill-down dialogs preserve the selected contract and status instead of opening an unfiltered list.
      showDialog(kind,status) {
        const dialog=this.shadowRoot.querySelector("dialog"),title=dialog.querySelector("h2"),body=dialog.querySelector(".dialog-body");
        if(kind==="requests") {
          title.textContent=statusInfo(status).label;
          body.innerHTML=this.requestTable(this.filteredRequests().filter(r=>group(r.UsrStatus)===status));
        } else if(kind==="vms") {
          title.textContent="Active Virtual Machines";
          const rows=this.filteredVms().filter(v=>normal(v.status)==="active");
          body.innerHTML=`<div class="table-scroll"><table><thead><tr><th>VM ID</th><th>Name</th><th>Contract</th><th>CPU</th><th>RAM</th><th>Storage</th><th>Status</th></tr></thead><tbody>${rows.length?rows.map(v=>`<tr><td class="code">${esc(v.id||v.recordId)}</td><td class="title">${esc(v.name)}</td><td>${esc(v.contractNumber)}</td><td>${esc(v.cpu)}</td><td>${esc(v.ram)} GB</td><td>${esc(v.storage)} GB</td><td>${esc(v.status)}</td></tr>`).join(""):'<tr><td colspan="7" class="empty">No active VMs in this scope.</td></tr>'}</tbody></table></div>`;
        } else {title.textContent="Notifications - Request Status Updates";body.innerHTML=this.updatesHtml(true);}
        this._dialogOpener=this.shadowRoot.activeElement;
        if(!dialog.open)dialog.showModal();
        dialog.addEventListener("close",()=>this._dialogOpener?.focus(),{once:true});
      }

      render() {
        const d=this.data,c=this.counts(),points=this.points(),contracts=this.contracts();
        const configErrors=this.selectedContracts().filter(contract=>contract.configurationError).map(contract=>(contract.number||contract.id)+": "+contract.configurationError);
        const warnings=[...this.errors,...configErrors];
        const enabled=!!d&&!this.loading;
        const nav=(page,title,iconName,primary=false)=>`<a class="btn ${primary?"primary":""}" href="${sectionUrl(page)}">${icon(iconName)}${esc(title)}</a>`;
        const kpi=(key,value,known=true)=>{const info=statusInfo(key);return `<button type="button" class="card kpi" data-action="status" data-status="${key}" ${!known?'disabled':''}><span class="caption">${esc(info.label)}</span><strong class="value" style="color:${info.color}">${known?fmt(value):"—"}</strong></button>`;};
        const latest=this.filteredRequests().slice().sort((a,b)=>(new Date(b.CreatedOn).getTime()||0)-(new Date(a.CreatedOn).getTime()||0)).slice(0,5);
        this.shadowRoot.innerHTML=`<style>${CSS}</style><main class="page" aria-busy="${this.loading}">
          <header class="heading"><div><h1>MCIT Service Portal</h1><p class="welcome">Welcome, <strong>${esc(d?.user?.name||"Creatio user")}</strong>${d?.user?.authority?" · "+esc(d.user.authority):""}</p></div>
            <div class="actions"><button type="button" class="btn" data-action="download" ${!enabled?'disabled':''} title="Download this dashboard and its filtered requests as CSV">${icon("download")}Download Report</button>${nav(CONFIG.requestsPage,"View All Requests","requests")}<button type="button" class="btn primary" data-action="new">${icon("plus")}Create New Request</button></div></header>
          <section class="card contract" aria-label="Contract filter">${icon("contract")}<label for="active-contract">Active Contract:</label>
            <select id="active-contract" ${!d?.portal||this.loading?'disabled':''}><option value="all">All Contracts</option>${contracts.map(contract=>`<option value="${id(contract.id)}" ${this.selected===id(contract.id)?"selected":""}>${esc(contract.number||contract.name||contract.id)}${contract.authority?" — "+esc(contract.authority):""}</option>`).join("")}</select>
            <div class="refresh"><span class="asof">${d?.loadedAt?"Updated "+esc(d.loadedAt.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})):""}</span><button type="button" class="btn small icon-only" data-action="refresh" ${this.loading?'disabled':''} aria-label="Refresh dashboard" title="Reload live Creatio data">${icon("refresh")}</button></div></section>
          ${warnings.length?`<div class="notice error" role="alert">${icon("alert")}<div><strong>Some data could not be loaded.</strong><ul>${warnings.map(w=>`<li>${esc(w)}</li>`).join("")}</ul></div></div>`:""}
          ${!d?`<div class="card loading" role="status">${this.loading?"Loading your live Creatio dashboard…":"Dashboard data is unavailable. Use Refresh above to retry."}</div>`:`
            ${c.requires_correction?`<div class="notice">${icon("alert")}<span><strong>Action Required:</strong> ${c.requires_correction} request${c.requires_correction===1?" requires":"s require"} correction. Please review and resubmit before the deadline. <button type="button" class="link" data-action="status" data-status="requires_correction">Review requests</button></span></div>`:""}
            <section class="kpis" aria-label="Dashboard metrics">${["draft","submitted","under_review","requires_correction","provisioning","completed"].map(key=>kpi(key,c[key],d.requests!==null)).join("")}
              <button type="button" class="card kpi" data-action="vms" ${!d.portal?'disabled':''}><span class="caption">Active VMs</span><strong class="value" style="color:#5b21b6">${d.portal?fmt(this.filteredVms().filter(v=>normal(v.status)==="active").length):"—"}</strong></button></section>
            <section class="middle"><div class="card card-pad"><div class="point-title"><h2>Contract Point Balance</h2><span>${d.portal?this.selectedContracts().length+" contract"+(this.selectedContracts().length===1?"":"s"):"Unavailable"}</span></div>
              <div class="point-grid">${[["Available",points.available,"#0dac4b"],["Consumed",points.consumed,"#6220bd"],["Restored",points.restored,"#2563eb"],["Total Balance",points.total,"#172b43"]].map(([name,value,color])=>`<div class="point"><span class="name">${name}</span><strong style="color:${color}">${fmt(value)}</strong><small>pts</small></div>`).join("")}</div>
              <div class="rate-label"><span>Consumption rate</span><span>${points.rate===null?"—":points.rate+"%"}</span></div><div class="track" role="img" aria-label="Consumption rate ${points.rate===null?"unavailable":points.rate+" percent"}"><div class="bar" style="width:${points.rate||0}%"></div></div>
            </div><div class="card card-pad"><h2>Status Distribution</h2>${this.chart()}</div></section>
            <section class="card"><div class="card-head"><h2>Recent Requests</h2><a class="link" href="${sectionUrl(CONFIG.requestsPage)}">View all →</a></div>${d.requests===null?'<p class="empty">Requests unavailable. Use Refresh.</p>':this.requestTable(latest)}</section>
            <section class="bottom"><div class="card"><div class="card-head"><div><h2>Notifications</h2><div class="minor">Live request status updates</div></div><button type="button" class="link" data-action="updates">View all</button></div>${this.updatesHtml()}</div>
              <div class="card card-pad"><h2>Quick Actions</h2><div class="quick-grid">
                <button type="button" class="quick primary" data-action="new"><span class="quick-icon">${icon("plus")}</span><span><strong>Create New VM Request</strong><p>Start a multi-item VM provisioning request</p></span></button>
                <a class="quick" href="${sectionUrl(CONFIG.requestsPage)}"><span class="quick-icon">${icon("requests")}</span><span><strong>View My Requests</strong><p>Search, filter and track all your requests</p></span></a>
                <a class="quick" href="${sectionUrl(CONFIG.virtualMachinesPage)}"><span class="quick-icon">${icon("vm")}</span><span><strong>VM Inventory</strong><p>View provisioned VMs within your scope</p></span></a>
                <button type="button" class="quick" data-action="updates"><span class="quick-icon">${icon("bell")}</span><span><strong>Notifications</strong><p>View recent request status changes</p></span></button>
              </div><p class="footnote" style="margin-top:16px"><a class="link" href="${sectionUrl(CONFIG.lifecyclePage)}">Open VM Lifecycle →</a></p></div></section>
            <p class="footnote">Counts follow the selected contract. Requests use the existing My Requests visibility rule; VM and contract access follows the installed VM service. Restored includes positive contract adjustments. Total Balance = Available + Consumed − Restored. SLA timers and notification read/unread tracking are not configured.</p>
          `}</main>
          <dialog aria-labelledby="dashboard-dialog-title"><div class="dialog-head"><h2 id="dashboard-dialog-title"></h2><button type="button" class="btn small icon-only" data-action="close" aria-label="Close details">${icon("close")}</button></div><div class="dialog-body"></div><div class="dialog-foot">${nav(CONFIG.requestsPage,"My Requests","requests")}${nav(CONFIG.virtualMachinesPage,"Virtual Machines","vm")}<button type="button" class="btn small" data-action="close">Close</button></div></dialog>`;
      }
    }
    customElements.define(TAG,Dashboard); // Register this browser component only once.
    sdk.registerViewElement({type:TYPE,selector:TAG}); // Make it usable in Freedom UI.
  }

  // This page inherits ListPageV3Template, unlike the older BaseHomePage dashboard.
  // Remove the native title/New/Import and folder/filter/grid areas, retaining Creatio's shell.
  return {
    viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
      {operation:"remove",name:"MainHeader"},    // Remove the native section toolbar/title.
      {operation:"remove",name:"MainContainer"}, // Remove the native folders, filters and empty list.
      {operation:"insert",name:"UsrDashboardLiveSection",values:{type:TYPE},
        parentName:"Main",propertyName:"items",index:0} // Render the custom dashboard full width.
    ]/**SCHEMA_VIEW_CONFIG_DIFF*/,
    viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
    // The inherited list template still requires a valid primary data-source schema.
    // This binding fixes: "Entity schema name for data source PDS is not provided".
    // The visual dashboard continues using the explicit scoped reads defined above.
    modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
      {operation:"merge",path:["dataSources","PDS","config"],
        values:{entitySchemaName:"UsrVMRequest"}} // Existing request object; no new object/column.
    ]/**SCHEMA_MODEL_CONFIG_DIFF*/,
    handlers: /**SCHEMA_HANDLERS*/[
      {request:"crt.HandleViewModelInitRequest",handler:async(request,next)=>{
        const element=customElements.get(TAG);if(element)element.pageContext=request.$context;
        return next?.handle(request);
      }},
      {request:"crt.HandleViewModelDestroyRequest",handler:async(request,next)=>{
        const element=customElements.get(TAG);if(element?.pageContext===request.$context)element.pageContext=null;
        return next?.handle(request);
      }}
    ]/**SCHEMA_HANDLERS*/,
    converters: /**SCHEMA_CONVERTERS*/{} /**SCHEMA_CONVERTERS*/,
    validators: /**SCHEMA_VALIDATORS*/{} /**SCHEMA_VALIDATORS*/
  };
});
