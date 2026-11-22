/*
 * TE-MCIT | Request Detail — Designer-Friendly Page v17.
 * Keep this original Page schema in Creatio, DON'T create a second Page.
 * Its native view/view-model/model configuration is carried over verbatim
 * from Request Detail v16; business behavior and Figma rendering live in
 * the separate UsrMCITRequestDetailRuntime Client Module.
 * Create and save the runtime FIRST, then replace this Page's JS code.
 */
define("UsrMCITRequestDetail_Page", /**SCHEMA_DEPS*/["UsrMCITRequestDetailRuntime"]/**SCHEMA_DEPS*/,
    function/**SCHEMA_ARGS*/(dtRuntime)/**SCHEMA_ARGS*/ {
    "use strict";
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
        // Runtime request proxies; native Page Designer configuration is untouched.
        handlers: /**SCHEMA_HANDLERS*/[
            {
                request: "crt.HandleViewModelInitRequest",
                handler: (request, next) => dtRuntime.handle("crt.HandleViewModelInitRequest", request, next)
            },
            {
                request: "crt.HandleViewModelAttributeChangeRequest",
                handler: (request, next) => dtRuntime.handle("crt.HandleViewModelAttributeChangeRequest", request, next)
            },
            {
                request: "crt.HandleViewModelDestroyRequest",
                handler: (request, next) => dtRuntime.handle("crt.HandleViewModelDestroyRequest", request, next)
            }
        ]/**SCHEMA_HANDLERS*/,
        converters: /**SCHEMA_CONVERTERS*/{} /**SCHEMA_CONVERTERS*/,
        validators: /**SCHEMA_VALIDATORS*/{} /**SCHEMA_VALIDATORS*/
    };
});
