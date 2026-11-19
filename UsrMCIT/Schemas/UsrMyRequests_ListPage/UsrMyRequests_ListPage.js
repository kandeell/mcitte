/*
 * TE-MCIT / My Requests — v9 Designer-Friendly Page (paired with UsrMyRequestsRuntime).
 * Keep viewConfigDiff, viewModelConfigDiff and modelConfigDiff native/editable.
 * The runtime performs the exact v8 data/DOM/filter/navigation operations.
 * IMPORTANT: Install/sync the Client Module FIRST, then update this existing page.
 * Native UI components stay in the page; no new visual tree or DataSource changes.
 */
define("UsrMyRequests_ListPage", /**SCHEMA_DEPS*/["UsrMyRequestsRuntime"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(mrRuntime)/**SCHEMA_ARGS*/ {
    "use strict";
    return {
        viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
        {
                "operation": "merge",
                "name": "TitleContainer",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "ActionButtonsContainer",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "MainFilterContainer",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "LeftFilterContainer",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "RightFilterContainer",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "FolderTree",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "DataTable",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "DataImportButton",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "AddButton",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "Dashboards",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "Filters",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "MenuItem_ImportFromExcel",
                "values": {
                        "clicked": {
                                "request": "crt.ImportDataRequest",
                                "params": {
                                        "entitySchemaName": "UsrVMRequest"
                                }
                        }
                }
        },
        {
                "operation": "merge",
                "name": "FolderTree",
                "values": {
                        "rootSchemaName": "UsrVMRequest"
                }
        },
        {
                "operation": "merge",
                "name": "DataTable",
                "values": {
                        "primaryColumnName": "PDS_Id",
                        "columns": [
                                {
                                        "id": "84c29a71-3fa5-4a91-8e20-5a7fc939b106",
                                        "code": "PDS_UsrNumber",
                                        "caption": "Request ID",
                                        "dataValueType": 1
                                },
                                {
                                        "id": "84c29a71-3fa5-4a91-8e20-5a7fc939b107",
                                        "code": "PDS_UsrName",
                                        "caption": "Title",
                                        "dataValueType": 1
                                },
                                {
                                        "id": "84c29a71-3fa5-4a91-8e20-5a7fc939b108",
                                        "code": "PDS_UsrContract",
                                        "caption": "Contract",
                                        "dataValueType": 10
                                },
                                {
                                        "id": "84c29a71-3fa5-4a91-8e20-5a7fc939b109",
                                        "code": "PDS_UsrAccount",
                                        "caption": "Authority",
                                        "dataValueType": 10
                                },
                                {
                                        "id": "84c29a71-3fa5-4a91-8e20-5a7fc939b110",
                                        "code": "PDS_UsrProject",
                                        "caption": "Project",
                                        "dataValueType": 10
                                },
                                {
                                        "id": "84c29a71-3fa5-4a91-8e20-5a7fc939b111",
                                        "code": "PDS_CreatedOn",
                                        "caption": "Created",
                                        "dataValueType": 7
                                },
                                {
                                        "id": "84c29a71-3fa5-4a91-8e20-5a7fc939b112",
                                        "code": "PDS_UsrStatus",
                                        "caption": "Status",
                                        "dataValueType": 10
                                }
                        ]
                }
        },
        {
                "operation": "merge",
                "name": "MainContainer",
                "values": {
                        "classes": [
                                "usr-mr-main-container"
                        ]
                }
        },
        {
                "operation": "merge",
                "name": "SectionContentWrapper",
                "values": {
                        "classes": [
                                "usr-mr-content-wrapper"
                        ]
                }
        },
        {
                "operation": "insert",
                "name": "UsrMRRoot",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "column",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "stretch",
                        "gap": "none",
                        "visible": true,
                        "classes": [
                                "usr-mr-root"
                        ]
                },
                "parentName": "SectionContentWrapper",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRHeader",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "row",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "center",
                        "gap": "small",
                        "visible": true,
                        "classes": [
                                "usr-mr-header"
                        ],
                        "justifyContent": "space-between"
                },
                "parentName": "UsrMRRoot",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRHeading",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "column",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": true,
                        "alignItems": "flex-start",
                        "gap": "none",
                        "visible": true,
                        "classes": [
                                "usr-mr-heading"
                        ]
                },
                "parentName": "UsrMRHeader",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRTitle",
                "values": {
                        "type": "crt.Label",
                        "caption": "My Requests",
                        "labelType": "body",
                        "labelThickness": "bold",
                        "classes": [
                                "usr-mr-page-title"
                        ]
                },
                "parentName": "UsrMRHeading",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRSubtitle",
                "values": {
                        "type": "crt.Label",
                        "caption": "$UsrMRSubtitleText",
                        "labelType": "body",
                        "labelThickness": "default",
                        "classes": [
                                "usr-mr-subtitle"
                        ]
                },
                "parentName": "UsrMRHeading",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMRTopActions",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "row",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": true,
                        "alignItems": "center",
                        "gap": "small",
                        "visible": true,
                        "classes": [
                                "usr-mr-top-actions"
                        ]
                },
                "parentName": "UsrMRHeader",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMRExport",
                "values": {
                        "type": "crt.Button",
                        "caption": "Export to Excel",
                        "color": "default",
                        "size": "medium",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "crt.ExportDataGridToExcelRequest",
                                "params": {
                                        "viewName": "DataTable"
                                }
                        },
                        "classes": [
                                "usr-mr-export-button"
                        ]
                },
                "parentName": "UsrMRTopActions",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRNew",
                "values": {
                        "type": "crt.Button",
                        "caption": "+  New Request",
                        "color": "accent",
                        "size": "medium",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRNewRequest"
                        },
                        "classes": [
                                "usr-mr-new-button"
                        ]
                },
                "parentName": "UsrMRTopActions",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMRAlert",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "row",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "center",
                        "gap": "small",
                        "visible": "$UsrMRHasCorrection",
                        "classes": [
                                "usr-mr-alert"
                        ],
                        "justifyContent": "space-between"
                },
                "parentName": "UsrMRRoot",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMRAlertCaption",
                "values": {
                        "type": "crt.Label",
                        "caption": "$UsrMRAlertText",
                        "labelType": "body",
                        "labelThickness": "default",
                        "classes": [
                                "usr-mr-alert-text"
                        ]
                },
                "parentName": "UsrMRAlert",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRShowCorrections",
                "values": {
                        "type": "crt.Button",
                        "caption": "Show",
                        "color": "default",
                        "size": "medium",
                        "iconPosition": "only-text",
                        "displayType": "text",
                        "clicked": {
                                "request": "usr.MRSelectStatus",
                                "params": {
                                        "status": "Requires Correction"
                                }
                        },
                        "classes": [
                                "usr-mr-alert-link"
                        ]
                },
                "parentName": "UsrMRAlert",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMRFiltersCard",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "column",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "stretch",
                        "gap": "small",
                        "visible": true,
                        "classes": [
                                "usr-mr-filters-card"
                        ]
                },
                "parentName": "UsrMRRoot",
                "propertyName": "items",
                "index": 2
        },
        {
                "operation": "insert",
                "name": "UsrMRFilterMount",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "row",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "center",
                        "gap": "small",
                        "visible": true,
                        "classes": [
                                "usr-mr-filter-mount"
                        ]
                },
                "parentName": "UsrMRFiltersCard",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRStatusBar",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "row",
                        "wrap": "wrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "center",
                        "gap": "small",
                        "visible": true,
                        "classes": [
                                "usr-mr-status-bar"
                        ]
                },
                "parentName": "UsrMRFiltersCard",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMRStatusAll",
                "values": {
                        "type": "crt.Button",
                        "caption": "$UsrMRCountAll",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRSelectStatus",
                                "params": {
                                        "status": ""
                                }
                        },
                        "classes": [
                                "usr-mr-status-button",
                                "usr-mr-status-all"
                        ]
                },
                "parentName": "UsrMRStatusBar",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRStatusDraft",
                "values": {
                        "type": "crt.Button",
                        "caption": "$UsrMRCountDraft",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRSelectStatus",
                                "params": {
                                        "status": "Draft"
                                }
                        },
                        "classes": [
                                "usr-mr-status-button",
                                "usr-mr-status-draft"
                        ]
                },
                "parentName": "UsrMRStatusBar",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMRStatusCorrection",
                "values": {
                        "type": "crt.Button",
                        "caption": "$UsrMRCountCorrection",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRSelectStatus",
                                "params": {
                                        "status": "Requires Correction"
                                }
                        },
                        "classes": [
                                "usr-mr-status-button",
                                "usr-mr-status-correction"
                        ]
                },
                "parentName": "UsrMRStatusBar",
                "propertyName": "items",
                "index": 2
        },
        {
                "operation": "insert",
                "name": "UsrMRStatusSubmitted",
                "values": {
                        "type": "crt.Button",
                        "caption": "$UsrMRCountSubmitted",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRSelectStatus",
                                "params": {
                                        "status": "Submitted"
                                }
                        },
                        "classes": [
                                "usr-mr-status-button",
                                "usr-mr-status-submitted"
                        ]
                },
                "parentName": "UsrMRStatusBar",
                "propertyName": "items",
                "index": 3
        },
        {
                "operation": "insert",
                "name": "UsrMRStatusReview",
                "values": {
                        "type": "crt.Button",
                        "caption": "$UsrMRCountReview",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRSelectStatus",
                                "params": {
                                        "status": "Under TE Review"
                                }
                        },
                        "classes": [
                                "usr-mr-status-button",
                                "usr-mr-status-review"
                        ]
                },
                "parentName": "UsrMRStatusBar",
                "propertyName": "items",
                "index": 4
        },
        {
                "operation": "insert",
                "name": "UsrMRStatusProvisioning",
                "values": {
                        "type": "crt.Button",
                        "caption": "$UsrMRCountProvisioning",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRSelectStatus",
                                "params": {
                                        "status": "Provisioning in Progress"
                                }
                        },
                        "classes": [
                                "usr-mr-status-button",
                                "usr-mr-status-provisioning"
                        ]
                },
                "parentName": "UsrMRStatusBar",
                "propertyName": "items",
                "index": 5
        },
        {
                "operation": "insert",
                "name": "UsrMRStatusCompleted",
                "values": {
                        "type": "crt.Button",
                        "caption": "$UsrMRCountCompleted",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRSelectStatus",
                                "params": {
                                        "status": "Completed"
                                }
                        },
                        "classes": [
                                "usr-mr-status-button",
                                "usr-mr-status-completed"
                        ]
                },
                "parentName": "UsrMRStatusBar",
                "propertyName": "items",
                "index": 6
        },
        {
                "operation": "insert",
                "name": "UsrMRStatusRejected",
                "values": {
                        "type": "crt.Button",
                        "caption": "$UsrMRCountRejected",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRSelectStatus",
                                "params": {
                                        "status": "Rejected"
                                }
                        },
                        "classes": [
                                "usr-mr-status-button",
                                "usr-mr-status-rejected"
                        ]
                },
                "parentName": "UsrMRStatusBar",
                "propertyName": "items",
                "index": 7
        },
        {
                "operation": "insert",
                "name": "UsrMRTableCard",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "column",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "stretch",
                        "gap": "none",
                        "visible": true,
                        "classes": [
                                "usr-mr-table-card"
                        ]
                },
                "parentName": "UsrMRRoot",
                "propertyName": "items",
                "index": 3
        },
        {
                "operation": "insert",
                "name": "UsrMRTableViewport",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "column",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "stretch",
                        "gap": "none",
                        "visible": true,
                        "classes": [
                                "usr-mr-table-viewport"
                        ]
                },
                "parentName": "UsrMRTableCard",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRTableHead",
                "values": {
                        "type": "crt.GridContainer",
                        "classes": [
                                "usr-mr-grid",
                                "usr-mr-table-head"
                        ],
                        "columns": [
                                "minmax(94px, 7fr)",
                                "minmax(70px, 5fr)",
                                "minmax(194px, 18fr)",
                                "minmax(104px, 9fr)",
                                "minmax(125px, 10fr)",
                                "minmax(118px, 10fr)",
                                "minmax(60px, 5fr)",
                                "minmax(104px, 8fr)",
                                "minmax(104px, 8fr)",
                                "minmax(104px, 9fr)",
                                "minmax(132px, 10fr)",
                                "minmax(86px, 7fr)",
                                "minmax(106px, 10fr)"
                        ],
                        "rows": "minmax(max-content, 42px)",
                        "gap": {
                                "columnGap": "small",
                                "rowGap": "none"
                        },
                        "fitContent": false,
                        "alignItems": "center",
                        "items": [
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 1,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Request ID",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-req"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 2,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Source",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-source"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 3,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Title",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-title"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 4,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Contract",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-contract"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 5,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Authority",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-authority"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 6,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Project",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-project"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 7,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Items",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-items"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 8,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Created",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-created"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 9,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Submitted",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-submitted"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 10,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Stage",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-stage"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 11,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Status",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-status"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 12,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "SLA",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-sla"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 13,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Actions",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-actions"
                                        ]
                                }
                        ],
                        "padding": {
                                "top": "small",
                                "right": "small",
                                "bottom": "small",
                                "left": "small"
                        }
                },
                "parentName": "UsrMRTableViewport",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRRecords",
                "values": {
                        "type": "crt.TemplateList",
                        "classes": [
                                "usr-mr-records"
                        ],
                        "items": "$Items",
                        "template": [
                                {
                                        "type": "crt.GridContainer",
                                        "classes": "$Items.PDS_Id | usr.MRRowClass",
                                        "columns": [
                                                "minmax(94px, 7fr)",
                                                "minmax(70px, 5fr)",
                                                "minmax(194px, 18fr)",
                                                "minmax(104px, 9fr)",
                                                "minmax(125px, 10fr)",
                                                "minmax(118px, 10fr)",
                                                "minmax(60px, 5fr)",
                                                "minmax(104px, 8fr)",
                                                "minmax(104px, 8fr)",
                                                "minmax(104px, 9fr)",
                                                "minmax(132px, 10fr)",
                                                "minmax(86px, 7fr)",
                                                "minmax(106px, 10fr)"
                                        ],
                                        "rows": "minmax(max-content, 56px)",
                                        "gap": {
                                                "columnGap": "small",
                                                "rowGap": "none"
                                        },
                                        "fitContent": false,
                                        "alignItems": "center",
                                        "padding": {
                                                "top": "small",
                                                "right": "small",
                                                "bottom": "small",
                                                "left": "small"
                                        },
                                        "items": [
                                                {
                                                        "type": "crt.Button",
                                                        "layoutConfig": {
                                                                "column": 1,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "$Items.PDS_UsrNumber",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-request"
                                                        ],
                                                        "displayType": "text",
                                                        "color": "accent",
                                                        "size": "small",
                                                        "iconPosition": "only-text",
                                                        "clicked": {
                                                                "request": "usr.MROpenRecord",
                                                                "params": {
                                                                        "recordId": "$Items.PDS_Id",
                                                                        "mode": "view"
                                                                }
                                                        }
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 2,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "—",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-source"
                                                        ],
                                                        "labelType": "body"
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 3,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "$Items.PDS_UsrName",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-title"
                                                        ],
                                                        "labelType": "body",
                                                        "labelThickness": "bold"
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 4,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "$Items.PDS_UsrContract | usr.MRLookup",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-contract"
                                                        ],
                                                        "labelType": "body"
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 5,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "$Items.PDS_UsrAccount | usr.MRLookup",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-authority"
                                                        ],
                                                        "labelType": "body"
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 6,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "$Items.PDS_UsrProject | usr.MRLookup",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-project"
                                                        ],
                                                        "labelType": "body"
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 7,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "$Items.PDS_Id | usr.MRItemsCount",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-items"
                                                        ],
                                                        "labelType": "body"
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 8,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "$Items.PDS_CreatedOn | usr.MRDate",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-created"
                                                        ],
                                                        "labelType": "body"
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 9,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "$Items.PDS_Id | usr.MRSubmittedDate",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-submitted"
                                                        ],
                                                        "labelType": "body"
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 10,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "—",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-stage"
                                                        ],
                                                        "labelType": "body"
                                                },
                                                {
                                                        "type": "crt.FlexContainer",
                                                        "layoutConfig": {
                                                                "column": 11,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "classes": "$Items.PDS_UsrStatus | usr.MRStatusClass",
                                                        "direction": "row",
                                                        "fitContent": true,
                                                        "alignItems": "center",
                                                        "items": [
                                                                {
                                                                        "type": "crt.Label",
                                                                        "caption": "$Items.PDS_UsrStatus | usr.MRStatusText",
                                                                        "labelType": "body"
                                                                }
                                                        ]
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 12,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "—",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-sla"
                                                        ],
                                                        "labelType": "body"
                                                },
                                                {
                                                        "type": "crt.FlexContainer",
                                                        "layoutConfig": {
                                                                "column": 13,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-actions"
                                                        ],
                                                        "direction": "row",
                                                        "alignItems": "center",
                                                        "fitContent": true,
                                                        "gap": "small",
                                                        "items": [
                                                                {
                                                                        "type": "crt.Button",
                                                                        "caption": "View",
                                                                        "color": "accent",
                                                                        "displayType": "text",
                                                                        "size": "small",
                                                                        "iconPosition": "only-text",
                                                                        "classes": [
                                                                                "usr-mr-view-action"
                                                                        ],
                                                                        "clicked": {
                                                                                "request": "usr.MROpenRecord",
                                                                                "params": {
                                                                                        "recordId": "$Items.PDS_Id",
                                                                                        "mode": "view"
                                                                                }
                                                                        }
                                                                },
                                                                {
                                                                        "type": "crt.Button",
                                                                        "caption": "Edit",
                                                                        "color": "default",
                                                                        "displayType": "text",
                                                                        "size": "small",
                                                                        "iconPosition": "only-text",
                                                                        "visible": "$Items.PDS_UsrStatus | usr.MRCanEdit",
                                                                        "classes": [
                                                                                "usr-mr-edit-action"
                                                                        ],
                                                                        "clicked": {
                                                                                "request": "usr.MROpenRecord",
                                                                                "params": {
                                                                                        "recordId": "$Items.PDS_Id",
                                                                                        "mode": "edit"
                                                                                }
                                                                        }
                                                                }
                                                        ]
                                                }
                                        ]
                                }
                        ],
                        "direction": "column",
                        "gap": 0
                },
                "parentName": "UsrMRTableViewport",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMREmpty",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "column",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "center",
                        "gap": "small",
                        "visible": true,
                        "classes": [
                                "usr-mr-empty"
                        ]
                },
                "parentName": "UsrMRTableCard",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMREmptyIcon",
                "values": {
                        "type": "crt.Label",
                        "caption": "▤",
                        "labelType": "body",
                        "labelThickness": "default",
                        "classes": [
                                "usr-mr-empty-icon"
                        ]
                },
                "parentName": "UsrMREmpty",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMREmptyTitle",
                "values": {
                        "type": "crt.Label",
                        "caption": "No requests found",
                        "labelType": "body",
                        "labelThickness": "bold",
                        "classes": [
                                "usr-mr-empty-title"
                        ]
                },
                "parentName": "UsrMREmpty",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMREmptySub",
                "values": {
                        "type": "crt.Label",
                        "caption": "Requests for your authority will appear here when created.",
                        "labelType": "body",
                        "labelThickness": "default",
                        "classes": [
                                "usr-mr-empty-sub"
                        ]
                },
                "parentName": "UsrMREmpty",
                "propertyName": "items",
                "index": 2
        },
        {
                "operation": "insert",
                "name": "UsrMRFooter",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "row",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "center",
                        "gap": "small",
                        "visible": true,
                        "classes": [
                                "usr-mr-footer"
                        ],
                        "justifyContent": "space-between"
                },
                "parentName": "UsrMRTableCard",
                "propertyName": "items",
                "index": 2
        },
        {
                "operation": "insert",
                "name": "UsrMRShowing",
                "values": {
                        "type": "crt.Label",
                        "caption": "$UsrMRFooterText",
                        "labelType": "body",
                        "labelThickness": "default",
                        "classes": [
                                "usr-mr-showing"
                        ]
                },
                "parentName": "UsrMRFooter",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRPages",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "row",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": true,
                        "alignItems": "center",
                        "gap": "small",
                        "visible": true,
                        "classes": [
                                "usr-mr-pages"
                        ]
                },
                "parentName": "UsrMRFooter",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMRPrev",
                "values": {
                        "type": "crt.Button",
                        "caption": "← Prev",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRChangePage",
                                "params": {
                                        "step": -1
                                }
                        },
                        "classes": [
                                "usr-mr-page-control"
                        ]
                },
                "parentName": "UsrMRPages",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRPageNumber",
                "values": {
                        "type": "crt.Label",
                        "caption": "$UsrMRPageLabel",
                        "labelType": "body",
                        "labelThickness": "default",
                        "classes": [
                                "usr-mr-page-current"
                        ]
                },
                "parentName": "UsrMRPages",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMRNext",
                "values": {
                        "type": "crt.Button",
                        "caption": "Next →",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRChangePage",
                                "params": {
                                        "step": 1
                                }
                        },
                        "classes": [
                                "usr-mr-page-control"
                        ]
                },
                "parentName": "UsrMRPages",
                "propertyName": "items",
                "index": 2
        }
]/**SCHEMA_VIEW_CONFIG_DIFF*/,
        viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
        {
                "operation": "merge",
                "path": [
                        "attributes",
                        "Items",
                        "viewModelConfig",
                        "attributes"
                ],
                "values": {
                        "PDS_UsrNumber": {
                                "modelConfig": {
                                        "path": "PDS.UsrNumber"
                                }
                        },
                        "PDS_UsrName": {
                                "modelConfig": {
                                        "path": "PDS.UsrName"
                                }
                        },
                        "PDS_UsrContract": {
                                "modelConfig": {
                                        "path": "PDS.UsrContract"
                                }
                        },
                        "PDS_UsrAccount": {
                                "modelConfig": {
                                        "path": "PDS.UsrAccount"
                                }
                        },
                        "PDS_UsrProject": {
                                "modelConfig": {
                                        "path": "PDS.UsrProject"
                                }
                        },
                        "PDS_CreatedOn": {
                                "modelConfig": {
                                        "path": "PDS.CreatedOn"
                                }
                        },
                        "PDS_UsrStatus": {
                                "modelConfig": {
                                        "path": "PDS.UsrStatus"
                                }
                        }
                }
        },
        {
                "operation": "merge",
                "path": [
                        "attributes"
                ],
                "values": {
                        "UsrMRAuthorityId": {
                                "value": "00000000-0000-0000-0000-000000000000"
                        },
                        "UsrMRAuthorityName": {
                                "value": ""
                        },
                        "UsrMRContactId": {
                                "value": "00000000-0000-0000-0000-000000000000"
                        },
                        "UsrMRSelectedStatus": {
                                "value": ""
                        },
                        "UsrMRSelectedContractId": {
                                "value": ""
                        },
                        "UsrMRSelectedTypeId": {
                                "value": ""
                        },
                        "UsrMRSearchText": {
                                "value": ""
                        },
                        "UsrMRPageOffset": {
                                "value": 0
                        },
                        "UsrMRPageSize": {
                                "value": 6
                        },
                        "UsrMRPageLabel": {
                                "value": "1"
                        },
                        "UsrMRFooterText": {
                                "value": "Showing 0 of 0 requests"
                        },
                        "UsrMRSubtitleText": {
                                "value": "Loading authority requests…"
                        },
                        "UsrMRHasCorrection": {
                                "value": false
                        },
                        "UsrMRAlertText": {
                                "value": ""
                        },
                        "UsrMRCountAll": {
                                "value": "All 0"
                        },
                        "UsrMRCountDraft": {
                                "value": "Draft 0"
                        },
                        "UsrMRCountCorrection": {
                                "value": "Requires Correction 0"
                        },
                        "UsrMRCountSubmitted": {
                                "value": "Submitted 0"
                        },
                        "UsrMRCountReview": {
                                "value": "Under Financial Review 0"
                        },
                        "UsrMRCountProvisioning": {
                                "value": "Provisioning 0"
                        },
                        "UsrMRCountCompleted": {
                                "value": "Completed 0"
                        },
                        "UsrMRCountRejected": {
                                "value": "Rejected 0"
                        }
                }
        },
        {
                "operation": "merge",
                "path": [
                        "attributes",
                        "Items",
                        "modelConfig",
                        "pagingConfig"
                ],
                "values": {
                        "rowsOffset": "UsrMRPageOffset",
                        "rowCount": 6
                }
        }
]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
        modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
        {
                "operation": "merge",
                "path": [
                        "dataSources",
                        "PDS",
                        "config"
                ],
                "values": {
                        "entitySchemaName": "UsrVMRequest",
                        "attributes": {
                                "UsrNumber": {
                                        "path": "UsrNumber"
                                },
                                "UsrName": {
                                        "path": "UsrName"
                                },
                                "UsrContract": {
                                        "path": "UsrContract"
                                },
                                "UsrAccount": {
                                        "path": "UsrAccount"
                                },
                                "UsrProject": {
                                        "path": "UsrProject"
                                },
                                "CreatedOn": {
                                        "path": "CreatedOn"
                                },
                                "UsrStatus": {
                                        "path": "UsrStatus"
                                }
                        }
                }
        }
]/**SCHEMA_MODEL_CONFIG_DIFF*/,

        // Keep bindings in the native schema and delegate the implementation to the separate runtime.
        handlers: /**SCHEMA_HANDLERS*/[
            {
                request: "crt.HandleViewModelInitRequest",
                handler: (request, next) => mrRuntime.handle("crt.HandleViewModelInitRequest", request, next)
            },
            {
                request: "crt.HandleViewModelResumeRequest",
                handler: (request, next) => mrRuntime.handle("crt.HandleViewModelResumeRequest", request, next)
            },
            {
                request: "crt.LoadDataRequest",
                handler: (request, next) => mrRuntime.handle("crt.LoadDataRequest", request, next)
            },
            {
                request: "usr.MRSelectStatus",
                handler: (request, next) => mrRuntime.handle("usr.MRSelectStatus", request, next)
            },
            {
                request: "usr.MRChangePage",
                handler: (request, next) => mrRuntime.handle("usr.MRChangePage", request, next)
            },
            {
                request: "usr.MRNewRequest",
                handler: (request, next) => mrRuntime.handle("usr.MRNewRequest", request, next)
            },
            {
                request: "usr.MROpenRecord",
                handler: (request, next) => mrRuntime.handle("usr.MROpenRecord", request, next)
            },
            {
                request: "crt.HandleViewModelDestroyRequest",
                handler: (request, next) => mrRuntime.handle("crt.HandleViewModelDestroyRequest", request, next)
            }
        ]/**SCHEMA_HANDLERS*/,
        converters: /**SCHEMA_CONVERTERS*/{
            "usr.MRLookup": value => mrRuntime.convert("usr.MRLookup", value),
            "usr.MRSubmittedDate": value => mrRuntime.convert("usr.MRSubmittedDate", value),
            "usr.MRItemsCount": value => mrRuntime.convert("usr.MRItemsCount", value),
            "usr.MRDate": value => mrRuntime.convert("usr.MRDate", value),
            "usr.MRStatusText": value => mrRuntime.convert("usr.MRStatusText", value),
            "usr.MRStatusClass": value => mrRuntime.convert("usr.MRStatusClass", value),
            "usr.MRRowClass": value => mrRuntime.convert("usr.MRRowClass", value),
            "usr.MRCanEdit": value => mrRuntime.convert("usr.MRCanEdit", value)
        }/**SCHEMA_CONVERTERS*/,
        validators: /**SCHEMA_VALIDATORS*/{} /**SCHEMA_VALIDATORS*/
    };
});
