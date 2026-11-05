/*
 * MCIT Portal - Request Detail (Overview + five navigable tabs)
 * Install only if UsrMCITRequestDetail_Page does not yet exist.
 * Create a FULL Freedom UI page named exactly UsrMCITRequestDetail_Page
 * with primary object UsrVMRequest, then paste this JS into Source code.
 * Overview is connected to real UsrVMRequest data. Other tabs are safe placeholders
 * until their independent object models and permissions are implemented.
 */
define("UsrMCITRequestDetail_Page", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
    "use strict";
    const validId = v => /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(String(v || ""));
    const valueId = v => String(v?.value ?? v?.Id ?? v ?? "");
    const label = v => typeof v === "string" ? v : (v?.displayValue ?? v?.Name ?? v?.name ?? "");
    const date = v => {
        if (!v) return "—";
        const d = new Date(v);
        return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-CA", {year:"numeric",month:"2-digit",day:"2-digit"});
    };
    const safeText = v => String(v ?? "").trim() || "—";
    const css = `
        .usr-dt-root{box-sizing:border-box;width:min(100%,1180px);max-width:1180px;
            margin:0 auto;padding:16px 12px 34px;color:#17213c;font:13px Inter,Arial,sans-serif}
        .usr-dt-breadcrumb{color:#7c85a0;font-size:12px;margin-bottom:22px}
        .usr-dt-breadcrumb strong{color:#5a1ec0}
        .usr-dt-header,.usr-dt-card{border:1px solid #e0e3e9;border-radius:14px;background:#fff}
        .usr-dt-header{padding:18px 20px;margin-bottom:16px}
        .usr-dt-header-top{display:flex;gap:15px;align-items:center;justify-content:space-between;flex-wrap:wrap}
        .usr-dt-id{font-weight:750;color:#5e1dc1}
        .usr-dt-title{color:#10223f;font-size:16px;font-weight:750;margin:12px 0}
        .usr-dt-caption{display:flex;gap:12px 18px;flex-wrap:wrap;font-size:12px;color:#52627b}
        .usr-dt-caption b{color:#21314b}
        .usr-dt-actions{display:flex;gap:8px}
        .usr-dt-button{height:36px;padding:0 15px;background:#fff;border:1px solid #e1e3ea;border-radius:10px;
            color:#21314b;font:650 12px Inter,Arial,sans-serif;cursor:pointer}
        .usr-dt-edit{background:#6318d9;color:#fff;border-color:#6318d9}
        .usr-dt-button:disabled{opacity:.55;cursor:not-allowed}
        .usr-dt-pill{display:inline-block;border-radius:12px;padding:4px 10px;
            background:#f0f1f4;color:#667088;font-size:11px;font-weight:650}
        .usr-dt-tabs{border-bottom:1px solid #dfe3e9;display:flex;gap:5px 24px;flex-wrap:wrap;margin-bottom:17px}
        .usr-dt-tab{background:transparent;border:0;padding:12px 2px;border-bottom:2px solid transparent;
            font:650 12px Inter,Arial,sans-serif;color:#63718c;cursor:pointer}
        .usr-dt-tab[aria-selected=true]{border-bottom-color:#6521c4;color:#5e1dc1}
        .usr-dt-overview{display:grid;grid-template-columns:1fr 1fr;gap:17px}
        .usr-dt-card h3{padding:16px;margin:0;border-bottom:1px solid #edf0f4;font-size:13px}
        .usr-dt-card-body{padding:13px 16px;min-height:270px}
        .usr-dt-item{display:flex;justify-content:space-between;gap:15px;border-bottom:1px solid #eff1f4;padding:11px 0}
        .usr-dt-item span{color:#72809a}.usr-dt-item strong{text-align:right;max-width:64%;overflow-wrap:anywhere}
        .usr-dt-details{white-space:pre-wrap;line-height:1.7;color:#31405b}
        .usr-dt-placeholder{background:#fff;border:1px solid #e1e4ea;border-radius:14px;
            padding:38px 18px;color:#728099;text-align:center}
        .usr-dt-error{border:1px solid #f2b0b0;background:#fff8f7;color:#9b2222;padding:13px;border-radius:10px}
        @media(max-width:760px){.usr-dt-overview{grid-template-columns:1fr}.usr-dt-tabs{gap:10px}}
    `;
    const TABS=["Overview","VM Items","Workflow","Documents","Activity & Audit"];
    return {
        viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
            {"operation":"merge","name":"MainHeader","values":{"visible":false}},
            {"operation":"insert","name":"UsrDetailRoot","values":{
                "type":"crt.FlexContainer","direction":"column","items":[],
                "fitContent":false,"visible":true,"classes":["usr-dt-root"]
            },"parentName":"MainContainer","propertyName":"items","index":0}
        ]/**SCHEMA_VIEW_CONFIG_DIFF*/,
        viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
            {"operation":"merge","path":["attributes"],"values":{
                "DT_RecordId":{"modelConfig":{"path":"UsrVMRequestDS.Id"}}
            }}
        ]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
        modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
            {"operation":"merge","path":[],"values":{"primaryDataSourceName":"UsrVMRequestDS"}},
            {"operation":"merge","path":["dataSources"],"values":{
                "UsrVMRequestDS":{"type":"crt.EntityDataSource","scope":"page","config":{
                    "entitySchemaName":"UsrVMRequest",
                    "loadParameters":{"options":{"pagingConfig":{"rowCount":1,"rowsOffset":-1}}}
                }}
            }}
        ]/**SCHEMA_MODEL_CONFIG_DIFF*/,
        handlers: /**SCHEMA_HANDLERS*/[
            {request:"crt.HandleViewModelInitRequest",handler:async(request,next)=>{
                const result=await next?.handle(request), ctx=request.$context;
                if(typeof document==='undefined') return result;
                document.__usrMCITRequestDetail?.dispose?.();
                const rt={ctx,disposed:false,id:"",record:null,tab:"Overview",observer:null};
                document.__usrMCITRequestDetail=rt;
                rt.dispose=()=>{rt.disposed=true;rt.observer?.disconnect();};
                if(!document.getElementById('usr-dt-style')){
                    const style=document.createElement('style');style.id='usr-dt-style';style.textContent=css;
                    document.head.appendChild(style);
                }
                const create=(tag,cls,text)=>{
                    const el=document.createElement(tag);
                    if(cls)el.className=cls;
                    if(text!==undefined)el.textContent=text;
                    return el;
                };
                const set=(parent,cls,txt)=>{
                    const el=parent.querySelector('[data-dt="'+cls+'"]');
                    if(el)el.textContent=safeText(txt);
                };
                rt.mount=()=>{
                    if(rt.disposed)return;
                    const host=document.querySelector('.usr-dt-root');
                    if(!host||host.querySelector('.usr-dt-live'))return;
                    const root=create('div','usr-dt-live');
                    const crumb=create('div','usr-dt-breadcrumb');
                    crumb.textContent='MCIT Service Portal  ›  My Requests  ›  ';
                    crumb.appendChild(create('strong','', 'Request Detail'));
                    root.appendChild(crumb);
                    const header=create('div','usr-dt-header');
                    const top=create('div','usr-dt-header-top');
                    const name=create('div','');
                    const code=create('strong','usr-dt-id');code.dataset.dt='number';name.appendChild(code);
                    const status=create('span','usr-dt-pill');status.dataset.dt='status';name.append(' ');name.appendChild(status);
                    top.appendChild(name);
                    const actions=create('div','usr-dt-actions');
                    const edit=create('button','usr-dt-button usr-dt-edit','✎  Edit Request');
                    edit.type='button';edit.addEventListener('click',async()=>{
                        if(!validId(rt.id)||!['Draft','Requires Correction'].includes(label(rt.record?.UsrStatus)))return;
                        await ctx.executeRequest({type:'crt.OpenPageRequest',$context:ctx,
                            schemaName:'UsrMCITNewRequest_WizardPage',
                            modelInitConfigs:[{action:'edit',recordId:rt.id}]});
                    });
                    actions.appendChild(edit);
                    const pdf=create('button','usr-dt-button','⇩  Export PDF');
                    pdf.type='button';pdf.disabled=true;pdf.title='PDF export is not configured yet';
                    actions.appendChild(pdf);top.appendChild(actions);header.appendChild(top);
                    const title=create('div','usr-dt-title');title.dataset.dt='title';header.appendChild(title);
                    const caption=create('div','usr-dt-caption');
                    for(const [field,labelText] of [['type','Type'],['authority','Authority'],['project','Project']]){
                        const item=create('div','');item.append(labelText+': ');
                        const val=create('b');val.dataset.dt=field;item.appendChild(val);caption.appendChild(item);
                    }
                    header.appendChild(caption);root.appendChild(header);
                    const tabs=create('div','usr-dt-tabs');
                    TABS.forEach(tab=>{
                        const btn=create('button','usr-dt-tab',tab);btn.type='button';btn.dataset.tab=tab;
                        btn.addEventListener('click',()=>{rt.tab=tab;rt.paint();});tabs.appendChild(btn);
                    });root.appendChild(tabs);
                    const content=create('div','usr-dt-content');root.appendChild(content);
                    host.appendChild(root);rt.paint();
                };
                rt.paint=()=>{
                    const root=document.querySelector('.usr-dt-live');if(!root)return;
                    const data=rt.record||{};
                    set(root,'number',data.UsrNumber||'New Request');
                    set(root,'status',label(data.UsrStatus));
                    set(root,'title',data.UsrName);
                    set(root,'type',label(data.UsrRequestType));
                    set(root,'authority',label(data.UsrAccount));
                    set(root,'project',label(data.UsrProject));
                    const edit=root.querySelector('.usr-dt-edit');
                    if(edit)edit.style.display=['Draft','Requires Correction'].includes(label(data.UsrStatus))?'':'none';
                    root.querySelectorAll('.usr-dt-tab').forEach(btn=>btn.setAttribute('aria-selected',String(btn.dataset.tab===rt.tab)));
                    const container=root.querySelector('.usr-dt-content');
                    if(!container)return;container.replaceChildren();
                    if(!rt.record){container.appendChild(create('div','usr-dt-placeholder','Loading request details…'));return;}
                    if(rt.tab!=='Overview'){
                        container.appendChild(create('div','usr-dt-placeholder',rt.tab+' — This tab will be connected to its data source in a later step.'));
                        return;
                    }
                    const overview=create('div','usr-dt-overview');
                    const info=create('div','usr-dt-card');info.appendChild(create('h3','', 'Request Information'));
                    const infoBody=create('div','usr-dt-card-body');
                    const rows=[['Request Type',label(data.UsrRequestType)],['Authority',label(data.UsrAccount)],
                        ['Project',label(data.UsrProject)],['Contract',label(data.UsrContract)],
                        ['Created',date(data.CreatedOn)],['Submitted','—'],
                        ['Estimated Points',data.UsrEstimatedPoints==null?'—':String(data.UsrEstimatedPoints)+' pts']];
                    rows.forEach(([l,v])=>{const line=create('div','usr-dt-item');line.appendChild(create('span','',l));
                        line.appendChild(create('strong','',safeText(v)));infoBody.appendChild(line);});
                    info.appendChild(infoBody);overview.appendChild(info);
                    const justification=create('div','usr-dt-card');justification.appendChild(create('h3','', 'Business Justification'));
                    justification.appendChild(create('div','usr-dt-card-body usr-dt-details',safeText(data.UsrBusinessJustification)));
                    overview.appendChild(justification);container.appendChild(overview);
                };
                rt.load=async(recordId)=>{
                    if(rt.disposed||!validId(recordId)||recordId===rt.id)return;
                    rt.id=recordId;
                    try{
                        const model=await sdk.Model.create('UsrVMRequest');
                        const rows=await model.load({attributes:['Id','UsrNumber','UsrName','UsrRequestType','UsrStatus',
                            'UsrAccount','UsrProject','UsrContract','UsrBusinessJustification','UsrEstimatedPoints','CreatedOn'],
                            parameters:[{type:sdk.ModelParameterType.PrimaryColumnValue,value:recordId}]});
                        if(rt.disposed)return;
                        rt.record=rows?.[0]||null;rt.paint();
                        if(!rt.record){const c=document.querySelector('.usr-dt-content');
                            if(c)c.textContent='Request not found or access denied.';}
                    }catch(error){console.error('MCIT Request Detail load failed',error);
                        const c=document.querySelector('.usr-dt-content');if(c){c.replaceChildren();
                            c.appendChild(create('div','usr-dt-error','Unable to load the request. Check the record permissions and object columns.'));}}
                };
                rt.mount();rt.observer=new MutationObserver(()=>rt.mount());
                rt.observer.observe(document.body,{childList:true,subtree:true});
                let id=valueId(await ctx.DT_RecordId);
                // Standard Creatio Full Page routes can also carry the record ID in the hash.
                if(!validId(id) && typeof location!=='undefined'){
                    const match=String(location.hash||'').match(/\/UsrMCITRequestDetail_Page\/([0-9a-f-]{36})(?:[/?]|$)/i);
                    if(match)id=match[1];
                }
                if(validId(id))await rt.load(id);
                return result;
            }},
            {request:'crt.HandleViewModelAttributeChangeRequest',handler:async(request,next)=>{
                const result=await next?.handle(request);
                if(request.attributeName==='DT_RecordId'){
                    const id=valueId(request.value);
                    if(validId(id))await document?.__usrMCITRequestDetail?.load?.(id);
                }
                return result;
            }},
            {request:'crt.HandleViewModelDestroyRequest',handler:async(request,next)=>{
                if(typeof document!=='undefined')document.__usrMCITRequestDetail?.dispose?.();
                return next?.handle(request);
            }}
        ]/**SCHEMA_HANDLERS*/,
        converters: /**SCHEMA_CONVERTERS*/{} /**SCHEMA_CONVERTERS*/,
        validators: /**SCHEMA_VALIDATORS*/{} /**SCHEMA_VALIDATORS*/
    };
});
