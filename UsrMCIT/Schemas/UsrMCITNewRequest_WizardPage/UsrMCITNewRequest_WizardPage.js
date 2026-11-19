/*
 * TE-MCIT — New Request Wizard v16 (Designer-Friendly page).
 * Paired Client Module: UsrMCITWizardRuntime.
 * All native viewConfigDiff/viewModelConfigDiff/modelConfigDiff are preserved from v15.
 * No business logic or DOM injection in this page schema.
 * Install the Client Module before updating the existing Page Schema.
 */
define("UsrMCITNewRequest_WizardPage", /**SCHEMA_DEPS*/["UsrMCITWizardRuntime"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(wzRuntime)/**SCHEMA_ARGS*/ {
    "use strict";
    return {
        // This page currently inherits PageWithTabsAndProgressBarTemplate.
        // We add a new content group to the known base MainContainer rather than
        // attempting to delete unknown template items (which can break page loading).
        viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
        // Hide ONLY the native Creatio form chrome inherited from
        // PageWithTabsAndProgressBarTemplate. Do not remove schema nodes:
        // custom WZ_Root lives separately under MainContainer.
        // Same visible:false technique used in UsrMyRequests_ListPage.
        {
            "operation": "merge",
            "name": "MainHeader",
            "values": { "visible": false }
        },
        {
            "operation": "merge",
            "name": "CardContentWrapper",
            "values": { "visible": false }
        },
    {
        "operation": "insert",
        "name": "WZ_Root",
        "values": {
            "classes": ["usr-wz-root"],
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "large",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap",
            "padding": {
                "top": "large",
                "left": "large",
                "right": "large",
                "bottom": "large"
            }
        },
        "parentName": "MainContainer",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_Header",
        "values": {
            "classes": ["usr-wz-title"],
            "type": "crt.Label",
            "caption": "Create New Request · طلب جديد",
            "labelType": "headline-1-small",
            "labelEllipsis": false,
            "visible":"$WZ_ShowWizardHeader"
        },
        "parentName": "WZ_Root",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_Subtitle",
        "values": {
            "classes": ["usr-wz-subtitle"],
            "type": "crt.Label",
            "caption": "$WZ_PageSubtitle",
            "labelType": "caption",
            "labelEllipsis": false,
            "labelColor": "#64748b",
            "visible":"$WZ_ShowWizardHeader"
        },
        "parentName": "WZ_Root",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_StepsOne",
        "values": {
            "classes": ["usr-wz-steps-card"],
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "large",
            "alignItems": "stretch",
            "justifyContent": "space-between",
            "wrap": "wrap",
            "visible": "$WZ_StepOne"
        },
        "parentName": "WZ_Root",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_Step1_1",
        "values": {
            "type": "crt.Label",
            "caption": "① Request Information",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#6523C3"
        },
        "parentName": "WZ_StepsOne",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_Step1_2",
        "values": {
            "type": "crt.Label",
            "caption": "② VM Items",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#94a3b8"
        },
        "parentName": "WZ_StepsOne",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_Step1_3",
        "values": {
            "type": "crt.Label",
            "caption": "③ Documents",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#94a3b8"
        },
        "parentName": "WZ_StepsOne",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_Step1_4",
        "values": {
            "type": "crt.Label",
            "caption": "④ Validation",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#94a3b8"
        },
        "parentName": "WZ_StepsOne",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "WZ_Step1_5",
        "values": {
            "type": "crt.Label",
            "caption": "⑤ Review & Submit",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#94a3b8"
        },
        "parentName": "WZ_StepsOne",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "WZ_StepsTwo",
        "values": {
            "classes": ["usr-wz-steps-card", "usr-wz-second"],
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "large",
            "alignItems": "stretch",
            "justifyContent": "space-between",
            "wrap": "wrap",
            "visible": "$WZ_StepTwo"
        },
        "parentName": "WZ_Root",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "WZ_Step2_1",
        "values": {
            "type": "crt.Label",
            "caption": "✓ Request Information",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#6523C3"
        },
        "parentName": "WZ_StepsTwo",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_Step2_2",
        "values": {
            "type": "crt.Label",
            "caption": "② VM Items",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#6523C3"
        },
        "parentName": "WZ_StepsTwo",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_Step2_3",
        "values": {
            "type": "crt.Label",
            "caption": "③ Documents",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#94a3b8"
        },
        "parentName": "WZ_StepsTwo",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_Step2_4",
        "values": {
            "type": "crt.Label",
            "caption": "④ Validation",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#94a3b8"
        },
        "parentName": "WZ_StepsTwo",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "WZ_Step2_5",
        "values": {
            "type": "crt.Label",
            "caption": "⑤ Review & Submit",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#94a3b8"
        },
        "parentName": "WZ_StepsTwo",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "WZ_FormOne",
        "values": {
            "classes": ["usr-wz-step1-form"],
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "large",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap",
            "visible": "$WZ_StepOne"
        },
        "parentName": "WZ_Root",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "WZ_RequestScope",
        "values": {
            "classes": ["usr-wz-panel", "usr-wz-step1-scope"],
            "type": "crt.ExpansionPanel",
            "title": "Request Type & Scope",
            "expanded": true,
            "items": []
        },
        "parentName": "WZ_FormOne",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ScopeGrid",
        "values": {
            "type": "crt.GridContainer",
            "columns": [
                "minmax(250px, 1fr)",
                "minmax(250px, 1fr)"
            ],
            "rows": "repeat(2, minmax(64px, max-content))",
            "gap": {
                "columnGap": "large",
                "rowGap": "medium"
            },
            "items": []
        },
        "parentName": "WZ_RequestScope",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTypeGroup",
        "values": {
            "classes": [
                "usr-wz-validation-wrap",
                "usr-wz-field-type"
            ],
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_ScopeGrid",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTypeCaptionRow",
        "values": {
            "classes": [
                "usr-wz-caption-row"
            ],
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_ReqTypeGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTypeCaption",
        "values": {
            "classes": [
                "usr-wz-caption-text"
            ],
            "type": "crt.Label",
            "caption": "Request Type",
            "labelType": "body",
            "labelEllipsis": false
        },
        "parentName": "WZ_ReqTypeCaptionRow",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTypeStar",
        "values": {
            "classes": [
                "usr-wz-required-star"
            ],
            "type": "crt.Label",
            "caption": "*",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#ef4444"
        },
        "parentName": "WZ_ReqTypeCaptionRow",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_TypeControl",
        "values": {
            "type": "crt.ComboBox",
            "label": "Request Type",
            "labelPosition": "hidden",
            "ariaLabel": "Request Type required",
            "appearance": "outline",
            "placeholder": "Select request type",
            "classes": ["usr-wz-field-control", "usr-wz-figma-select"],
            "control": "$WZ_RequestType",
            "listActions": [],
            "controlActions": [],
            "showValueAsLink": false
        },
        "parentName": "WZ_ReqTypeGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTypeErrorLabel",
        "values": {
            "classes": [
                "usr-wz-validation-error"
            ],
            "type": "crt.Label",
            "caption": "Request type is required",
            "labelType": "caption",
            "labelEllipsis": false,
            "labelColor": "#ef4444",
            "visible": "$WZ_ErrRequestType"
        },
        "parentName": "WZ_ReqTypeGroup",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_ReqContractGroup",
        "values": {
            "classes": [
                "usr-wz-validation-wrap",
                "usr-wz-field-contract"
            ],
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_ScopeGrid",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ReqContractCaptionRow",
        "values": {
            "classes": [
                "usr-wz-caption-row"
            ],
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_ReqContractGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqContractCaption",
        "values": {
            "classes": [
                "usr-wz-caption-text"
            ],
            "type": "crt.Label",
            "caption": "Contract",
            "labelType": "body",
            "labelEllipsis": false
        },
        "parentName": "WZ_ReqContractCaptionRow",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqContractStar",
        "values": {
            "classes": [
                "usr-wz-required-star"
            ],
            "type": "crt.Label",
            "caption": "*",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#ef4444"
        },
        "parentName": "WZ_ReqContractCaptionRow",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ContractControl",
        "values": {
            "type": "crt.ComboBox",
            "label": "Contract",
            "labelPosition": "hidden",
            "ariaLabel": "Contract required",
            "appearance": "outline",
            "placeholder": "Select contract",
            "classes": ["usr-wz-field-control", "usr-wz-figma-select"],
            "control": "$WZ_Contract",
            "listActions": [],
            "controlActions": [],
            "showValueAsLink": false
        },
        "parentName": "WZ_ReqContractGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ReqContractErrorLabel",
        "values": {
            "classes": [
                "usr-wz-validation-error"
            ],
            "type": "crt.Label",
            "caption": "Contract is required",
            "labelType": "caption",
            "labelEllipsis": false,
            "labelColor": "#ef4444",
            "visible": "$WZ_ErrContract"
        },
        "parentName": "WZ_ReqContractGroup",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "WZ_ContractActiveMeta",
        "values": {
            "type": "crt.Label",
            "caption": "$WZ_ContractMeta",
            "labelType": "caption",
            "visible": "$WZ_ContractIsActive",
            "classes": ["usr-wz-contract-meta", "usr-wz-contract-meta-active"]
        },
        "parentName": "WZ_ReqContractGroup",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_ContractOtherMeta",
        "values": {
            "type": "crt.Label",
            "caption": "$WZ_ContractMeta",
            "labelType": "caption",
            "visible": "$WZ_ContractIsNotActive",
            "classes": ["usr-wz-contract-meta", "usr-wz-contract-meta-other"]
        },
        "parentName": "WZ_ReqContractGroup",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "WZ_ReqAuthorityGroup",
        "values": {
            "classes": [
                "usr-wz-validation-wrap",
                "usr-wz-field-authority"
            ],
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap",
            "layoutConfig": {
                "column": 1,
                "row": 2,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_ScopeGrid",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_ReqAuthorityCaptionRow",
        "values": {
            "classes": [
                "usr-wz-caption-row"
            ],
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_ReqAuthorityGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqAuthorityCaption",
        "values": {
            "classes": [
                "usr-wz-caption-text"
            ],
            "type": "crt.Label",
            "caption": "Government Authority Name",
            "labelType": "body",
            "labelEllipsis": false
        },
        "parentName": "WZ_ReqAuthorityCaptionRow",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqAuthorityStar",
        "values": {
            "classes": [
                "usr-wz-required-star"
            ],
            "type": "crt.Label",
            "caption": "*",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#ef4444"
        },
        "parentName": "WZ_ReqAuthorityCaptionRow",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_AuthorityControl",
        "values": {
            "type": "crt.ComboBox",
            "label": "Government Authority Name",
            "labelPosition": "hidden",
            "ariaLabel": "Government Authority Name required",
            "appearance": "outline",
            "placeholder": "Select authority",
            "classes": ["usr-wz-field-control", "usr-wz-figma-select"],
            "control": "$WZ_AuthorityAccount",
            "listActions": [],
            "controlActions": [],
            "showValueAsLink": false
        },
        "parentName": "WZ_ReqAuthorityGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ReqAuthorityErrorLabel",
        "values": {
            "classes": [
                "usr-wz-validation-error"
            ],
            "type": "crt.Label",
            "caption": "Authority is required",
            "labelType": "caption",
            "labelEllipsis": false,
            "labelColor": "#ef4444",
            "visible": "$WZ_ErrAuthority"
        },
        "parentName": "WZ_ReqAuthorityGroup",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_ReqProjectGroup",
        "values": {
            "classes": [
                "usr-wz-validation-wrap",
                "usr-wz-field-project"
            ],
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap",
            "layoutConfig": {
                "column": 2,
                "row": 2,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_ScopeGrid",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "WZ_ReqProjectCaptionRow",
        "values": {
            "classes": [
                "usr-wz-caption-row"
            ],
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_ReqProjectGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqProjectCaption",
        "values": {
            "classes": [
                "usr-wz-caption-text"
            ],
            "type": "crt.Label",
            "caption": "Project",
            "labelType": "body",
            "labelEllipsis": false
        },
        "parentName": "WZ_ReqProjectCaptionRow",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqProjectStar",
        "values": {
            "classes": [
                "usr-wz-required-star"
            ],
            "type": "crt.Label",
            "caption": "*",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#ef4444"
        },
        "parentName": "WZ_ReqProjectCaptionRow",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ProjectControl",
        "values": {
            "type": "crt.ComboBox",
            "label": "Project",
            "labelPosition": "hidden",
            "ariaLabel": "Project required",
            "appearance": "outline",
            "placeholder": "Select project",
            "classes": ["usr-wz-field-control", "usr-wz-figma-select"],
            "control": "$WZ_Project",
            "listActions": [],
            "controlActions": [],
            "showValueAsLink": false
        },
        "parentName": "WZ_ReqProjectGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ReqProjectErrorLabel",
        "values": {
            "classes": [
                "usr-wz-validation-error"
            ],
            "type": "crt.Label",
            "caption": "Project is required",
            "labelType": "caption",
            "labelEllipsis": false,
            "labelColor": "#ef4444",
            "visible": "$WZ_ErrProject"
        },
        "parentName": "WZ_ReqProjectGroup",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_ContractSummary",
        "values": {
            "type": "crt.ExpansionPanel",
            "title": "Contract Summary",
            "classes": ["usr-wz-contract-summary"],
            "expanded": true,
            "items": [],
            "visible": "$WZ_ShowContractSummary"
        },
        "parentName": "WZ_FormOne",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_SummaryContents",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column", "items": [], "gap": "medium",
            "alignItems": "stretch", "wrap": "nowrap",
            "classes": ["usr-wz-summary-contents"]
        },
        "parentName": "WZ_ContractSummary", "propertyName": "items", "index": 0
    },
    {
        "operation": "insert", "name": "WZ_ContractSummaryTop",
        "values": {
            "type": "crt.GridContainer",
            "columns": ["minmax(0, 1fr)", "minmax(0, 1fr)", "minmax(0, 1fr)"],
            "rows": "minmax(72px, max-content)",
            "gap": {"columnGap": "medium", "rowGap": "small"},
            "items": [], "classes": ["usr-wz-summary-topgrid"]
        },
        "parentName": "WZ_SummaryContents", "propertyName": "items", "index": 0
    },
    {
        "operation": "insert", "name": "WZ_SummaryNameBlock",
        "values": {"type": "crt.FlexContainer", "direction": "column", "items": [],
            "gap": "small", "classes": ["usr-wz-summary-field"],
            "layoutConfig": {"column": 1, "row": 1, "colSpan": 1, "rowSpan": 1}},
        "parentName": "WZ_ContractSummaryTop", "propertyName": "items", "index": 0
    },
    {
        "operation": "insert", "name": "WZ_ContractNameLabel",
        "values": {"type": "crt.Label", "caption": "Name", "labelType": "caption",
            "classes": ["usr-wz-summary-field-label"]},
        "parentName": "WZ_SummaryNameBlock", "propertyName": "items", "index": 0
    },
    {
        "operation": "insert", "name": "WZ_ContractNameValue",
        "values": {"type": "crt.Label", "caption": "$WZ_ContractName", "labelType": "body",
            "classes": ["usr-wz-summary-field-value"]},
        "parentName": "WZ_SummaryNameBlock", "propertyName": "items", "index": 1
    },
    {
        "operation": "insert", "name": "WZ_ContractRefBlock",
        "values": {"type": "crt.FlexContainer", "direction": "column", "items": [],
            "gap": "small", "classes": ["usr-wz-summary-field"],
            "layoutConfig": {"column": 2, "row": 1, "colSpan": 1, "rowSpan": 1}},
        "parentName": "WZ_ContractSummaryTop", "propertyName": "items", "index": 1
    },
    {
        "operation": "insert", "name": "WZ_ContractRefCaption",
        "values": {"type": "crt.Label", "caption": "Reference / Contract No.", "labelType": "caption",
            "classes": ["usr-wz-summary-field-label"]},
        "parentName": "WZ_ContractRefBlock", "propertyName": "items", "index": 0
    },
    {
        "operation": "insert", "name": "WZ_ContractRefValue",
        "values": {"type": "crt.Label", "caption": "$WZ_ContractReference", "labelType": "body",
            "classes": ["usr-wz-summary-field-value"]},
        "parentName": "WZ_ContractRefBlock", "propertyName": "items", "index": 1
    },
    {
        "operation": "insert", "name": "WZ_ContractNumberValue",
        "values": {"type": "crt.Label", "caption": "$WZ_ContractNumber", "labelType": "caption",
            "classes": ["usr-wz-summary-field-sub"]},
        "parentName": "WZ_ContractRefBlock", "propertyName": "items", "index": 2
    },
    {
        "operation": "insert", "name": "WZ_ContractValidityBlock",
        "values": {"type": "crt.FlexContainer", "direction": "column", "items": [],
            "gap": "small", "classes": ["usr-wz-summary-field"],
            "layoutConfig": {"column": 3, "row": 1, "colSpan": 1, "rowSpan": 1}},
        "parentName": "WZ_ContractSummaryTop", "propertyName": "items", "index": 2
    },
    {
        "operation": "insert", "name": "WZ_ContractValidityCaption",
        "values": {"type": "crt.Label", "caption": "Validity", "labelType": "caption",
            "classes": ["usr-wz-summary-field-label"]},
        "parentName": "WZ_ContractValidityBlock", "propertyName": "items", "index": 0
    },
    {
        "operation": "insert", "name": "WZ_ContractPeriodValue",
        "values": {"type": "crt.Label", "caption": "$WZ_ContractPeriod", "labelType": "body",
            "classes": ["usr-wz-summary-field-value"]},
        "parentName": "WZ_ContractValidityBlock", "propertyName": "items", "index": 1
    },
    {
        "operation": "insert", "name": "WZ_ContractVersionValue",
        "values": {"type": "crt.Label", "caption": "$WZ_ContractVersionLabel", "labelType": "caption",
            "classes": ["usr-wz-summary-version"]},
        "parentName": "WZ_SummaryContents", "propertyName": "items", "index": 1
    },
    {
        "operation": "insert", "name": "WZ_ContractGrid",
        "values": {"type": "crt.GridContainer",
            "columns": ["minmax(0, 1fr)", "minmax(0, 1fr)", "minmax(0, 1fr)"],
            "rows": "minmax(52px, max-content)",
            "gap": {"columnGap": "medium", "rowGap": "small"},
            "items": [], "classes": ["usr-wz-summary-points-grid"]},
        "parentName": "WZ_SummaryContents", "propertyName": "items", "index": 2
    },
    {
        "operation": "insert", "name": "WZ_SummaryInitialBlock",
        "values": {"type": "crt.FlexContainer", "direction": "column", "items": [],
            "gap": "small", "classes": ["usr-wz-summary-point"],
            "layoutConfig": {"column": 1, "row": 1, "colSpan": 1, "rowSpan": 1}},
        "parentName": "WZ_ContractGrid", "propertyName": "items", "index": 0
    },
    {
        "operation": "insert", "name": "WZ_InitialPointsCaption",
        "values": {"type": "crt.Label", "caption": "Available", "labelType": "caption",
            "classes": ["usr-wz-summary-point-label"]},
        "parentName": "WZ_SummaryInitialBlock", "propertyName": "items", "index": 0
    },
    {
        "operation": "insert", "name": "WZ_InitialPointsValue",
        "values": {"type": "crt.Label", "caption": "$WZ_AvailablePoints", "labelType": "body",
            "classes": ["usr-wz-summary-point-unverified"]},
        "parentName": "WZ_SummaryInitialBlock", "propertyName": "items", "index": 1
    },
    {
        "operation": "insert", "name": "WZ_SummaryAvailableBlock",
        "values": {"type": "crt.FlexContainer", "direction": "column", "items": [],
            "gap": "small", "classes": ["usr-wz-summary-point"],
            "layoutConfig": {"column": 2, "row": 1, "colSpan": 1, "rowSpan": 1}},
        "parentName": "WZ_ContractGrid", "propertyName": "items", "index": 1
    },
    {
        "operation": "insert", "name": "WZ_AvailablePointsCaption",
        "values": {"type": "crt.Label", "caption": "Consumed", "labelType": "caption",
            "classes": ["usr-wz-summary-point-label"]},
        "parentName": "WZ_SummaryAvailableBlock", "propertyName": "items", "index": 0
    },
    {
        "operation": "insert", "name": "WZ_AvailablePointsValue",
        "values": {"type": "crt.Label", "caption": "$WZ_ConsumedPoints", "labelType": "body",
            "classes": ["usr-wz-summary-point-unverified"]},
        "parentName": "WZ_SummaryAvailableBlock", "propertyName": "items", "index": 1
    },
    {
        "operation": "insert", "name": "WZ_SummaryConsumedBlock",
        "values": {"type": "crt.FlexContainer", "direction": "column", "items": [],
            "gap": "small", "classes": ["usr-wz-summary-point"],
            "layoutConfig": {"column": 3, "row": 1, "colSpan": 1, "rowSpan": 1}},
        "parentName": "WZ_ContractGrid", "propertyName": "items", "index": 2
    },
    {
        "operation": "insert", "name": "WZ_ConsumedPointsCaption",
        "values": {"type": "crt.Label", "caption": "Restored", "labelType": "caption",
            "classes": ["usr-wz-summary-point-label"]},
        "parentName": "WZ_SummaryConsumedBlock", "propertyName": "items", "index": 0
    },
    {
        "operation": "insert", "name": "WZ_ConsumptionValue",
        "values": {"type": "crt.Label", "caption": "$WZ_RestoredPoints", "labelType": "caption",
            "classes": ["usr-wz-summary-point-unverified"]},
        "parentName": "WZ_SummaryConsumedBlock", "propertyName": "items", "index": 1
    },
    {
        "operation": "insert", "name": "WZ_ContractVersionNoteValue",
        "values": {"type": "crt.Label", "caption": "$WZ_ContractVersionNote", "labelType": "caption",
            "classes": ["usr-wz-summary-footer"]},
        "parentName": "WZ_SummaryContents", "propertyName": "items", "index": 3
    },
    {
        "operation": "insert", "name": "WZ_InitialContractPointsNote",
        "values": {"type": "crt.Label", "caption": "$WZ_InitialPointsNote", "labelType": "caption",
            "classes": ["usr-wz-summary-footer"]},
        "parentName": "WZ_SummaryContents", "propertyName": "items", "index": 4
    },
    {
        "operation": "insert", "name": "WZ_LedgerVerificationNote",
        "values": {"type": "crt.Label", "caption": "$WZ_ContractLedgerNote", "labelType": "caption",
            "classes": ["usr-wz-summary-footer"]},
        "parentName": "WZ_SummaryContents", "propertyName": "items", "index": 5
    },
    {
        "operation": "insert",
        "name": "WZ_RequestDetails",
        "values": {
            "classes": ["usr-wz-panel", "usr-wz-step1-details"],
            "type": "crt.ExpansionPanel",
            "title": "Request Details",
            "expanded": true,
            "items": []
        },
        "parentName": "WZ_FormOne",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_RequestDetailsContents",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "medium",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_RequestDetails",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTitleGroup",
        "values": {
            "classes": [
                "usr-wz-validation-wrap",
                "usr-wz-field-title"
            ],
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_RequestDetailsContents",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTitleCaptionRow",
        "values": {
            "classes": [
                "usr-wz-caption-row"
            ],
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_ReqTitleGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTitleCaption",
        "values": {
            "classes": [
                "usr-wz-caption-text"
            ],
            "type": "crt.Label",
            "caption": "Request Title",
            "labelType": "body",
            "labelEllipsis": false
        },
        "parentName": "WZ_ReqTitleCaptionRow",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTitleStar",
        "values": {
            "classes": [
                "usr-wz-required-star"
            ],
            "type": "crt.Label",
            "caption": "*",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#ef4444"
        },
        "parentName": "WZ_ReqTitleCaptionRow",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_TitleControl",
        "values": {
            "type": "crt.Input",
            "label": "Request Title",
            "labelPosition": "hidden",
            "ariaLabel": "Request Title required",
            "appearance": "outline",
            "placeholder": "Brief, descriptive title for this request",
            "classes": ["usr-wz-field-control", "usr-wz-figma-text", "usr-wz-figma-title"],
            "control": "$WZ_Title"
        },
        "parentName": "WZ_ReqTitleGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTitleErrorLabel",
        "values": {
            "classes": [
                "usr-wz-validation-error"
            ],
            "type": "crt.Label",
            "caption": "Request title is required",
            "labelType": "caption",
            "labelEllipsis": false,
            "labelColor": "#ef4444",
            "visible": "$WZ_ErrTitle"
        },
        "parentName": "WZ_ReqTitleGroup",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_ReqJustificationGroup",
        "values": {
            "classes": [
                "usr-wz-validation-wrap",
                "usr-wz-field-justification"
            ],
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_RequestDetailsContents",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ReqJustificationCaptionRow",
        "values": {
            "classes": [
                "usr-wz-caption-row"
            ],
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_ReqJustificationGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqJustificationCaption",
        "values": {
            "classes": [
                "usr-wz-caption-text"
            ],
            "type": "crt.Label",
            "caption": "Business Justification",
            "labelType": "body",
            "labelEllipsis": false
        },
        "parentName": "WZ_ReqJustificationCaptionRow",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqJustificationStar",
        "values": {
            "classes": [
                "usr-wz-required-star"
            ],
            "type": "crt.Label",
            "caption": "*",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#ef4444"
        },
        "parentName": "WZ_ReqJustificationCaptionRow",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_JustificationControl",
        "values": {
            "type": "crt.Input",
            "label": "Business Justification",
            "labelPosition": "hidden",
            "ariaLabel": "Business Justification required",
            "appearance": "outline",
            "placeholder": "Explain the business need, intended use, and impact on government services",
            "classes": ["usr-wz-field-control", "usr-wz-figma-text", "usr-wz-figma-justification"],
            "control": "$WZ_Justification",
            "multiline": true
        },
        "parentName": "WZ_ReqJustificationGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ReqJustificationErrorLabel",
        "values": {
            "classes": [
                "usr-wz-validation-error"
            ],
            "type": "crt.Label",
            "caption": "Business justification is required",
            "labelType": "caption",
            "labelEllipsis": false,
            "labelColor": "#ef4444",
            "visible": "$WZ_ErrJustification"
        },
        "parentName": "WZ_ReqJustificationGroup",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_DeliveryDateControl",
        "values": {
            "type": "crt.DateTimePicker",
            "label": "Requested Delivery Date (optional)",
            "labelPosition": "above",
            "appearance": "outline",
            "classes": ["usr-wz-figma-date"],
            "control": "$WZ_DeliveryDate"
        },
        "parentName": "WZ_RequestDetailsContents",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_DeliveryHint",
        "values": {
            "type": "crt.Label",
            "caption": "Optional. If the service has a deadline, provide it here.",
            "labelType": "caption",
            "labelEllipsis": false,
            "classes": ["usr-wz-date-hint"]
        },
        "parentName": "WZ_RequestDetailsContents",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterInformation",
        "values": {
            "classes": ["usr-wz-panel", "usr-wz-step1-requester"],
            "type": "crt.ExpansionPanel",
            "title": "Requester Information",
            "expanded": true,
            "items": []
        },
        "parentName": "WZ_FormOne",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterSubtitle",
        "values": {
            "type": "crt.Label",
            "caption": "From your authenticated profile — read-only",
            "labelType": "caption",
            "labelEllipsis": false,
            "classes": ["usr-wz-requester-subtitle"]
        },
        "parentName": "WZ_RequesterInformation",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterGrid",
        "values": {
            "classes": ["usr-wz-requester-grid"],
            "type": "crt.GridContainer",
            "columns": [
                "minmax(180px, 1fr)",
                "minmax(180px, 1fr)",
                "minmax(180px, 1fr)"
            ],
            "rows": "repeat(4, minmax(34px, max-content))",
            "gap": {
                "columnGap": "large",
                "rowGap": "medium"
            },
            "items": []
        },
        "parentName": "WZ_RequesterInformation",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterNameCaption",
        "values": {
            "type": "crt.Label",
            "classes": ["usr-wz-readonly-caption"],
            "caption": "Full Name",
            "labelType": "caption",
            "labelEllipsis": false,
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_RequesterGrid",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterNameValue",
        "values": {
            "type": "crt.Label",
            "caption": "$WZ_CurrentContactName",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": ["usr-wz-readonly-pill"],

            "layoutConfig": {
                "column": 1,
                "row": 2,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_RequesterGrid",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterEmailCaption",
        "values": {
            "type": "crt.Label",
            "classes": ["usr-wz-readonly-caption"],
            "caption": "Email",
            "labelType": "caption",
            "labelEllipsis": false,
            "layoutConfig": {
                "column": 1,
                "row": 3,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_RequesterGrid",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterEmailValue",
        "values": {
            "type": "crt.Label",
            "caption": "$WZ_CurrentEmail",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": ["usr-wz-readonly-pill"],

            "layoutConfig": {
                "column": 1,
                "row": 4,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_RequesterGrid",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterRoleCaption",
        "values": {
            "type": "crt.Label",
            "classes": ["usr-wz-readonly-caption"],
            "caption": "Role",
            "labelType": "caption",
            "labelEllipsis": false,
            "layoutConfig": {"column": 2, "row": 1, "colSpan": 1, "rowSpan": 1}
        },
        "parentName": "WZ_RequesterGrid", "propertyName": "items", "index": 4
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterRoleValue",
        "values": {
            "type": "crt.Label",
            "caption": "$WZ_CurrentRoleName",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": ["usr-wz-readonly-pill"],

            "layoutConfig": {"column": 2, "row": 2, "colSpan": 1, "rowSpan": 1}
        },
        "parentName": "WZ_RequesterGrid", "propertyName": "items", "index": 5
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterAuthorityCaption",
        "values": {
            "type": "crt.Label",
            "classes": ["usr-wz-readonly-caption"],
            "caption": "Authority",
            "labelType": "caption",
            "labelEllipsis": false,
            "layoutConfig": {"column": 3, "row": 1, "colSpan": 1, "rowSpan": 1}
        },
        "parentName": "WZ_RequesterGrid", "propertyName": "items", "index": 6
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterAuthorityValue",
        "values": {
            "type": "crt.Label",
            "caption": "$WZ_CurrentAuthorityName",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": ["usr-wz-readonly-pill"],

            "layoutConfig": {"column": 3, "row": 2, "colSpan": 1, "rowSpan": 1}
        },
        "parentName": "WZ_RequesterGrid", "propertyName": "items", "index": 7
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterFootnote",
        "values": {
            "type": "crt.Label",
            "caption": "$WZ_RequesterError",
            "labelType": "caption",
            "labelEllipsis": false,
            "labelColor": "#64748b"
        },
        "parentName": "WZ_RequesterInformation",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_StepOneActions",
        "values": {
            "classes": ["usr-wz-actions"],
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "medium",
            "alignItems": "stretch",
            "justifyContent": "end",
            "wrap": "wrap"
        },
        "parentName": "WZ_FormOne",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "WZ_CancelButton",
        "values": {
            "classes": ["usr-wz-btn-cancel"],
            "type": "crt.Button",
            "caption": "Cancel",
            "color": "default",
            "displayType": "text",
            "disabled": false,
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.WZ_Cancel"
            }
        },
        "parentName": "WZ_StepOneActions",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_DraftButton",
        "values": {
            "classes": ["usr-wz-btn-draft"],
            "type": "crt.Button",
            "caption": "Save as Draft",
            "color": "default",
            "displayType": "contained",
            "disabled": false,
            "size": "medium",
            "icon": "save-button-icon",
            "iconPosition": "left-icon",
            "clicked": {
                "request": "usr.WZ_SaveDraft"
            }
        },
        "parentName": "WZ_StepOneActions",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ContinueButton",
        "values": {
            "classes": ["usr-wz-btn-next"],
            "type": "crt.Button",
            "caption": "Continue to VM Items",
            "color": "accent",
            "displayType": "contained",
            "disabled": false,
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.WZ_Continue"
            }
        },
        "parentName": "WZ_StepOneActions",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_ItemsPanel",
        "values": {
            "type": "crt.FlexContainer",
            "classes": [
                "usr-wz-vm-stage"
            ],
            "direction": "column",
            "items": [],
            "gap": "small",
            "wrap": "nowrap",
            "visible": "$WZ_StepTwo"
        },
        "parentName": "WZ_Root",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "WZ_ItemsHeader",
        "values": {
            "type": "crt.FlexContainer",
            "classes": [
                "usr-wz-vm-stage-header"
            ],
            "direction": "row",
            "items": [],
            "gap": "medium",
            "wrap": "wrap"
        },
        "parentName": "WZ_ItemsPanel",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ItemsHeaderCopy",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "small"
        },
        "parentName": "WZ_ItemsHeader",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ItemsHeaderTitle",
        "values": {
            "type": "crt.Label",
            "classes": [
                "usr-wz-vm-stage-heading"
            ],
            "caption": "VM Items",
            "labelType": "body",
            "labelEllipsis": false
        },
        "parentName": "WZ_ItemsHeaderCopy",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ItemsHeaderHint",
        "values": {
            "type": "crt.Label",
            "classes": [
                "usr-wz-vm-stage-caption"
            ],
            "caption": "Add all virtual machines required in this request",
            "labelType": "caption",
            "labelEllipsis": false
        },
        "parentName": "WZ_ItemsHeaderCopy",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_AddVMTop",
        "values": {
            "type": "crt.Button",
            "classes": [
                "usr-wz-vm-btn-add"
            ],
            "caption": "＋ Add VM Item · إضافة الخادم للطلب",
            "color": "accent",
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.WZ_OpenVMModal"
            },
            "disabled": false
        },
        "parentName": "WZ_ItemsHeader",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ItemsBody",
        "values": {
            "type": "crt.FlexContainer",
            "classes": [
                "usr-wz-vm-stage-body"
            ],
            "direction": "column",
            "items": [],
            "gap": "medium"
        },
        "parentName": "WZ_ItemsPanel",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_EmptyVMGroup",
        "values": {
            "type": "crt.FlexContainer",
            "classes": [
                "usr-wz-vm-blank"
            ],
            "direction": "column",
            "items": [],
            "gap": "small",
            "visible": "$WZ_VMEmptyState"
        },
        "parentName": "WZ_ItemsBody",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_EmptyVMIcon",
        "values": {
            "type": "crt.Label",
            "classes": [
                "usr-wz-vm-blank-symbol"
            ],
            "caption": "▣",
            "labelType": "headline-1-small",
            "labelEllipsis": false
        },
        "parentName": "WZ_EmptyVMGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_EmptyVMTitle",
        "values": {
            "type": "crt.Label",
            "classes": [
                "usr-wz-vm-blank-title"
            ],
            "caption": "No VM items added yet",
            "labelType": "body",
            "labelEllipsis": false
        },
        "parentName": "WZ_EmptyVMGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_EmptyVMText",
        "values": {
            "type": "crt.Label",
            "classes": [
                "usr-wz-vm-blank-copy"
            ],
            "caption": "Service points and resources come from your Contract Configuration Version.",
            "labelType": "caption",
            "labelEllipsis": false
        },
        "parentName": "WZ_EmptyVMGroup",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_AddFirstVM",
        "values": {
            "type": "crt.Button",
            "classes": [
                "usr-wz-vm-btn-first"
            ],
            "caption": "＋ Add First Item",
            "color": "accent",
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.WZ_OpenVMModal"
            },
            "disabled": false
        },
        "parentName": "WZ_EmptyVMGroup",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "WZ_VMItemsList",
        "values": {
            "type": "crt.FlexContainer",
            "classes": [
                "usr-wz-vm-items-render"
            ],
            "direction": "column",
            "items": [],
            "gap": "small",
            "visible": "$WZ_VMHasItems"
        },
        "parentName": "WZ_ItemsBody",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_VMItemsDisclaimer",
        "values": {
            "type": "crt.Label",
            "classes": [
                "usr-wz-vm-stage-caption"
            ],
            "caption": "VM Items are saved to Creatio as draft records; point ledger consumption happens only in the approved workflow.",
            "labelType": "caption",
            "labelEllipsis": false,
            "visible": "$WZ_VMHasItems"
        },
        "parentName": "WZ_ItemsBody",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_StepTwoActions",
        "values": {
            "type": "crt.FlexContainer",
            "classes": [
                "usr-wz-vm-actions"
            ],
            "direction": "row",
            "items": [],
            "gap": "medium",
            "wrap": "wrap",
            "justifyContent": "end",
            "visible": "$WZ_StepTwo"
        },
        "parentName": "WZ_Root",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "WZ_BackButton",
        "values": {
            "type": "crt.Button",
            "classes": [
                "usr-wz-vm-action-back"
            ],
            "caption": "‹ Back",
            "color": "default",
            "displayType": "text",
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.WZ_Back"
            },
            "disabled": false
        },
        "parentName": "WZ_StepTwoActions",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_DraftButton2",
        "values": {
            "type": "crt.Button",
            "classes": [
                "usr-wz-btn-draft"
            ],
            "caption": "Save as Draft",
            "color": "default",
            "displayType": "contained",
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.WZ_SaveDraft"
            },
            "disabled": false
        },
        "parentName": "WZ_StepTwoActions",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ContinueDocuments",
        "values": {
            "type": "crt.Button",
            "classes": [
                "usr-wz-vm-action-docs"
            ],
            "caption": "Continue to Documents",
            "color": "accent",
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.WZ_ContinueDocuments"
            },
            "disabled": "$WZ_VMEmptyState"
        },
        "parentName": "WZ_StepTwoActions",
        "propertyName": "items",
        "index": 2
    },

    // Step 3: real supporting-document attachments; Step 4: read-only validation.
    // A Draft may be REVIEWED but cannot be finally submitted without ledger approval.
    {
        "operation":"insert","name":"WZ_StepsThree",
        "values":{
            "type":"crt.FlexContainer",
            "classes":["usr-wz-steps-card","usr-wz-third"],
            "direction":"row","items":[],"gap":"large",
            "visible":"$WZ_StepThree"
        },
        "parentName":"WZ_Root","propertyName":"items","index":7
    },
    {
        "operation":"insert","name":"WZ_DocumentsShell",
        "values":{
            "type":"crt.FlexContainer",
            "classes":["usr-wz-vm-stage","usr-wz-doc-shell"],
            "direction":"column","items":[],"gap":"none",
            "visible":"$WZ_StepThree",
            "padding":{"top":"none","right":"none","bottom":"none","left":"none"}
        },
        "parentName":"WZ_Root","propertyName":"items","index":8
    },
    {
        "operation":"insert","name":"WZ_DocumentsHeading",
        "values":{
            "type":"crt.Label",
            "caption":"Supporting Documents",
            "labelType":"body",
            "classes":["usr-wz-doc-head"]
        },
        "parentName":"WZ_DocumentsShell","propertyName":"items","index":0
    },
    {
        "operation":"insert","name":"WZ_DocumentsMount",
        "values":{
            "type":"crt.FlexContainer",
            "classes":["usr-wz-documents-mount"],
            "direction":"column","items":[],"gap":"none"
        },
        "parentName":"WZ_DocumentsShell","propertyName":"items","index":1
    },
    {
        "operation":"insert","name":"WZ_DocumentsActions",
        "values":{
            "type":"crt.FlexContainer",
            "classes":["usr-wz-doc-actions","usr-wz-actions"],
            "direction":"row","items":[],"gap":"medium",
            "visible":"$WZ_StepThree"
        },
        "parentName":"WZ_Root","propertyName":"items","index":9
    },
    {
        "operation":"insert","name":"WZ_StepsFour",
        "values":{
            "type":"crt.FlexContainer","classes":["usr-wz-steps-card","usr-wz-fourth"],
            "direction":"row","items":[],"gap":"large","visible":"$WZ_StepFour"
        },
        "parentName":"WZ_Root","propertyName":"items","index":10
    },
    {
        "operation":"insert","name":"WZ_ValidationPanel",
        "values":{
            "type":"crt.FlexContainer","classes":["usr-wz-vm-stage","usr-wz-doc-shell"],
            "direction":"column","items":[],"visible":"$WZ_StepFour"
        },
        "parentName":"WZ_Root","propertyName":"items","index":11
    },
    {
        "operation":"insert","name":"WZ_ValidationHeading",
        "values":{"type":"crt.Label","caption":"Validation","labelType":"body",
            "classes":["usr-wz-doc-head"]},
        "parentName":"WZ_ValidationPanel","propertyName":"items","index":0
    },
    {
        "operation":"insert","name":"WZ_ValidationMount",
        "values":{"type":"crt.FlexContainer","classes":["usr-wz-documents-mount","usr-wz-validation-mount"],
            "direction":"column","items":[]},
        "parentName":"WZ_ValidationPanel","propertyName":"items","index":1
    },
    {
        "operation":"insert","name":"WZ_ValidationActions",
        "values":{"type":"crt.FlexContainer","classes":["usr-wz-actions","usr-wz-validation-actions"],
            "direction":"row","items":[],"visible":"$WZ_StepFour"},
        "parentName":"WZ_Root","propertyName":"items","index":12
    },
    // Step 5: native designer-visible containers; dynamic review from persisted rows.
    {
        "operation":"insert","name":"WZ_StepsFive",
        "values":{"type":"crt.FlexContainer","classes":["usr-wz-steps-card","usr-wz-fifth"],
            "direction":"row","items":[],"gap":"large","visible":"$WZ_StepFive"},
        "parentName":"WZ_Root","propertyName":"items","index":13
    },
    {
        "operation":"insert","name":"WZ_ReviewPanel",
        "values":{"type":"crt.FlexContainer","classes":["usr-wz-vm-stage","usr-wz-doc-shell","usr-wz-review-shell"],
            "direction":"column","items":[],"visible":"$WZ_StepFive"},
        "parentName":"WZ_Root","propertyName":"items","index":14
    },
    {
        "operation":"insert","name":"WZ_ReviewHeading",
        "values":{"type":"crt.Label","caption":"Review & Submit","labelType":"body",
            "classes":["usr-wz-doc-head"],"visible":false},
        "parentName":"WZ_ReviewPanel","propertyName":"items","index":0
    },
    {
        "operation":"insert","name":"WZ_ReviewMount",
        "values":{"type":"crt.FlexContainer","classes":["usr-wz-documents-mount","usr-wz-review-mount"],
            "direction":"column","items":[]},
        "parentName":"WZ_ReviewPanel","propertyName":"items","index":1
    },
    {
        "operation":"insert","name":"WZ_ReviewActions",
        "values":{"type":"crt.FlexContainer","classes":["usr-wz-actions","usr-wz-review-actions"],
            "direction":"row","items":[],"visible":"$WZ_StepFive"},
        "parentName":"WZ_Root","propertyName":"items","index":15
    },
    {"operation":"insert","name":"WZ_SuccessPanel",
     "values":{"type":"crt.FlexContainer","classes":["usr-wz-success-panel"],
         "direction":"column","items":[],"visible":"$WZ_Success"},
     "parentName":"WZ_Root","propertyName":"items","index":16},
    {"operation":"insert","name":"WZ_SuccessMount",
     "values":{"type":"crt.FlexContainer","classes":["usr-wz-success-mount"],
         "direction":"column","items":[]},
     "parentName":"WZ_SuccessPanel","propertyName":"items","index":0},
]/**SCHEMA_VIEW_CONFIG_DIFF*/,
        viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
            {
                "operation": "merge", "path": ["attributes"], "values": {
    "WZ_RequestType": {
        "modelConfig": {
            "path": "UsrVMRequestDS.UsrRequestType"
        }
    },
    "WZ_Contract": {
        "modelConfig": {
            "path": "UsrVMRequestDS.UsrContract"
        }
    },
    "WZ_Authority": {
        // Preserve legacy lookup for historical records; not the Customer 360 selector.
        "modelConfig": {"path": "UsrVMRequestDS.UsrAuthority"}
    },
    "WZ_AuthorityAccount": {
        // Existing lookup from user's screenshot: UsrVMRequest.UsrAccount -> Account.
        // NOTE: this is the chosen government Authority, not Contact.Account.
        "modelConfig": {"path": "UsrVMRequestDS.UsrAccount"}
    },
    "WZ_ValidationAttempted": {"value": false},
    "WZ_ErrRequestType": {"value": false},
    "WZ_ErrContract": {"value": false},
    "WZ_ErrAuthority": {"value": false},
    "WZ_ErrProject": {"value": false},
    "WZ_ErrTitle": {"value": false},
    "WZ_ErrJustification": {"value": false},
    "WZ_ProjectFilter": {"value": {}},
    "WZ_ProjectActiveFilter": {"value": {}},
    "WZ_Hydrating": {"value": true},
    "WZ_Project": {
        "modelConfig": {
            "path": "UsrVMRequestDS.UsrProject"
        }
    },
    "WZ_Title": {
        "modelConfig": {
            "path": "UsrVMRequestDS.UsrName"
        }
    },
    "WZ_Justification": {
        "modelConfig": {
            "path": "UsrVMRequestDS.UsrBusinessJustification"
        }
    },
    "WZ_DeliveryDate": {
        "modelConfig": {
            "path": "UsrVMRequestDS.UsrRequestedDeliveryDate"
        }
    },
    "WZ_Status": {
        "modelConfig": {
            "path": "UsrVMRequestDS.UsrStatus"
        }
    },
    "WZ_IsArchived": {
        "modelConfig": {
            "path": "UsrVMRequestDS.UsrIsArchived"
        }
    },
    "WZ_RecordId": {
        "modelConfig": {
            "path": "UsrVMRequestDS.Id"
        }
    },
    "WZ_Requester": {
        "modelConfig": {
            "path": "UsrVMRequestDS.UsrRequester"
        }
    },
    "WZ_RequesterAccount": {"value": null},
    "WZ_ContactId": {"value": null},
    "WZ_CurrentRoleName": {"value": "—"},
    "WZ_CurrentAuthorityName": {"value": "—"},
    "WZ_RequesterError": {"value": ""},
    "WZ_StepOne": {
        "value": true
    },
    "WZ_StepTwo": {
        "value": false
    },
    "WZ_StepThree": {"value": false},
    "WZ_StepFour": {"value": false},
    "WZ_StepFive": {"value": false},
    "WZ_Success": {"value": false},
    "WZ_ShowWizardHeader": {"value": true},
    "WZ_PageSubtitle": {"value": "New VM Provisioning Request — Request Information"},
    "WZ_VMEmptyState": {"value": true},
    "WZ_VMHasItems": {"value": false},
    "WZ_ContractInitialPointsValue": {"value": null},
    "WZ_ShowContractSummary": {
        "value": false
    },
    "WZ_ContractName": {
        "value": "—"
    },
    "WZ_ContractReference": {"value": "—"},
    "WZ_ContractPeriod": {"value": "—"},
    "WZ_InitialPoints": {"value": "—"},
    "WZ_ContractLedgerNote": {"value": "Not verified — ledger pending"},
    "WZ_ContractNumber": {"value": "—"},
    "WZ_ContractStatus": {"value": "—"},
    "WZ_ContractMeta": {"value": ""},
    "WZ_ContractIsActive": {"value": false},
    "WZ_ContractIsNotActive": {"value": false},
    "WZ_ContractVersionLabel": {"value": "No verified configuration version"},
    "WZ_ContractVersionNote": {"value": "Select a contract to load its configuration."},
    "WZ_InitialPointsNote": {"value": "Initial contract points: —"},
    "WZ_AvailablePoints": {"value": "Not verified"},
    "WZ_ConsumedPoints": {"value": "Not verified"},
    "WZ_RestoredPoints": {"value": "Not verified"},
    "WZ_CurrentContactName": {
        "value": "—"
    },
    "WZ_CurrentEmail": {
        "value": "—"
    },
    "WZ_RequestType_List": {},
    "WZ_Contract_List": {},
    "WZ_Authority_List": {},
    "WZ_AuthorityAccount_List": {},
    "WZ_Project_List": {
        "modelConfig": {
            "filterAttributes": [
                {"name": "WZ_ProjectFilter", "loadOnChange": true},
                {"name": "WZ_ProjectActiveFilter", "loadOnChange": true}
            ]
        }
    }
}
            }
        ]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
        // Keep the user's original tested primary data source name unchanged.
        modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
            {
                "operation": "merge", "path": [],
                "values": { "primaryDataSourceName": "UsrVMRequestDS" }
            },
            {
                "operation": "merge", "path": ["dataSources"],
                "values": {
                    "UsrVMRequestDS": {
                        "type": "crt.EntityDataSource", "scope": "page",
                        "config": {
                            "entitySchemaName": "UsrVMRequest",
                            "loadParameters": {
                                "options": {
                                    "pagingConfig": { "rowCount": 1, "rowsOffset": -1 },
                                    "sortingConfig": { "columns": [] }
                                }
                            },
                            "allowCopyingRecords": false
                        }
                    }
                }
            }
        ]/**SCHEMA_MODEL_CONFIG_DIFF*/,
        handlers: /**SCHEMA_HANDLERS*/[
            {
                request: "crt.HandleViewModelInitRequest",
                handler: (request, next) => wzRuntime.handle("crt.HandleViewModelInitRequest", request, next)
            },
            {
                request: "crt.HandleViewModelAttributeChangeRequest",
                handler: (request, next) => wzRuntime.handle("crt.HandleViewModelAttributeChangeRequest", request, next)
            },
            {
                request: "usr.WZ_SaveDraft",
                handler: (request, next) => wzRuntime.handle("usr.WZ_SaveDraft", request, next)
            },
            {
                request: "usr.WZ_Continue",
                handler: (request, next) => wzRuntime.handle("usr.WZ_Continue", request, next)
            },
            {
                request: "usr.WZ_OpenVMModal",
                handler: (request, next) => wzRuntime.handle("usr.WZ_OpenVMModal", request, next)
            },
            {
                request: "usr.WZ_ContinueDocuments",
                handler: (request, next) => wzRuntime.handle("usr.WZ_ContinueDocuments", request, next)
            },
            {
                request: "usr.WZ_BackToItems",
                handler: (request, next) => wzRuntime.handle("usr.WZ_BackToItems", request, next)
            },
            {
                request: "usr.WZ_RunValidation",
                handler: (request, next) => wzRuntime.handle("usr.WZ_RunValidation", request, next)
            },
            {
                request: "usr.WZ_ExecuteValidation",
                handler: (request, next) => wzRuntime.handle("usr.WZ_ExecuteValidation", request, next)
            },
            {
                request: "usr.WZ_ContinueToReview",
                handler: (request, next) => wzRuntime.handle("usr.WZ_ContinueToReview", request, next)
            },
            {
                request: "usr.WZ_BackToValidation",
                handler: (request, next) => wzRuntime.handle("usr.WZ_BackToValidation", request, next)
            },
            {
                request: "usr.WZ_BackToDocuments",
                handler: (request, next) => wzRuntime.handle("usr.WZ_BackToDocuments", request, next)
            },
            {
                request: "usr.WZ_SubmitRequest",
                handler: (request, next) => wzRuntime.handle("usr.WZ_SubmitRequest", request, next)
            },
            {
                request: "usr.WZ_ValidationNotReady",
                handler: (request, next) => wzRuntime.handle("usr.WZ_ValidationNotReady", request, next)
            },
            {
                request: "usr.WZ_Cancel",
                handler: (request, next) => wzRuntime.handle("usr.WZ_Cancel", request, next)
            },
            {
                request: "usr.WZ_Back",
                handler: (request, next) => wzRuntime.handle("usr.WZ_Back", request, next)
            }
        ]/**SCHEMA_HANDLERS*/,
        converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
        validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
    };
});
