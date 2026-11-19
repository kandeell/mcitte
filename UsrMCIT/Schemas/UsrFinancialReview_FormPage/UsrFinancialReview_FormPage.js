/*
 * MCIT / Financial Review Form — Designer-friendly Figma Form v2.
 * Native Figma tab cards and repeatable record slots are Designer-editable.
 * All runtime helpers and CSS live in separate UsrFinancialReviewFormRuntime.
 * After Page Designer Save: check AMD dependency and 9 proxies are retained.
 */
define("UsrFinancialReview_FormPage", /**SCHEMA_DEPS*/["UsrFinancialReviewFormRuntime"]/**SCHEMA_DEPS*/,
    function/**SCHEMA_ARGS*/(formRuntime)/**SCHEMA_ARGS*/ {
    "use strict";
    return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
    {
        "operation": "merge",
        "name": "MainHeader",
        "values": {
            "visible": false
        }
    },
    {
        "operation": "merge",
        "name": "Tabs",
        "values": {
            "visible": false
        }
    },
    {
        "operation": "insert",
        "name": "FW_Root",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "gap": "medium",
            "items": [],
            "classes": [
                "usr-fw-root"
            ]
        },
        "parentName": "MainContainer",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Header",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-fw-header"
            ]
        },
        "parentName": "FW_Root",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HeaderTop",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "gap": "small",
            "justifyContent": "space-between",
            "alignItems": "start",
            "classes": [
                "usr-fw-header-top"
            ]
        },
        "parentName": "FW_Header",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HeaderRight",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "end",
            "classes": [
                "usr-fw-header-right"
            ]
        },
        "parentName": "FW_HeaderTop",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Breadcrumb",
        "values": {
            "type": "crt.Label",
            "caption": "TE Operations  ›  Financial Review  ›  Workspace",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-muted"
            ],
            "labelColor": "#7D8A9B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Root",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_ReviewCode",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_ReviewId",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-pill"
            ],
            "labelBackgroundColor": "#F1EBFB",
            "labelColor": "#6422BA",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HeaderTop",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_RequestCode",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_RequestNumber",
            "labelType": "headline-1-small",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-code"
            ],
            "labelColor": "#6422BA",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Header",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_RequestTitle",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_RequestTitle",
            "labelType": "headline-1-small",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-title"
            ],
            "labelColor": "#13203A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Header",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_HeaderDetails",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "classes": [
                "usr-fw-data"
            ]
        },
        "parentName": "FW_Header",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_HeadAuthority",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ]
        },
        "parentName": "FW_HeaderDetails",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HeadAuthorityLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Authority",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HeadAuthority",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HeadAuthorityValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_Authority",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HeadAuthority",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HeadProject",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ]
        },
        "parentName": "FW_HeaderDetails",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HeadProjectLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Project",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HeadProject",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HeadProjectValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_Project",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HeadProject",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HeadItems",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ]
        },
        "parentName": "FW_HeaderDetails",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HeadItemsLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Items",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HeadItems",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HeadItemsValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_ItemsCount",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HeadItems",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HeadReviewer",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ]
        },
        "parentName": "FW_HeaderDetails",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_HeadReviewerLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Assigned",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HeadReviewer",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HeadReviewerValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_Reviewer",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HeadReviewer",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_PreviousStage",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_PreviousStage",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-stage"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "FW_Header",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_Main",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "rows": "minmax(32px, max-content)",
            "columns": [
                "minmax(32px, 4fr)",
                "minmax(230px, 1fr)"
            ],
            "gap": {
                "columnGap": "large",
                "rowGap": "medium"
            },
            "classes": [
                "usr-fw-main"
            ]
        },
        "parentName": "FW_Root",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_Left",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-fw-left"
            ],
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_Main",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Tabs",
        "values": {
            "type": "crt.TabPanel",
            "items": [],
            "styleType": "default",
            "bodyBackgroundColor": "primary-contrast-500",
            "tabTitleColor": "#69778D",
            "selectedTabTitleColor": "#6221B8",
            "headerBackgroundColor": "auto",
            "underlineSelectedTabColor": "#6221B8",
            "selectedTabIndex": 0,
            "classes": [
                "usr-fw-tabs"
            ]
        },
        "parentName": "FW_Left",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Panel_overview",
        "values": {
            "type": "crt.TabContainer",
            "items": [],
            "caption": "Request Overview",
            "iconPosition": "only-text",
            "classes": [
                "usr-fw-panel"
            ]
        },
        "parentName": "FW_Tabs",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_OverviewCards",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "columns": [
                "minmax(32px, 1fr)",
                "minmax(32px, 1fr)"
            ],
            "rows": "minmax(32px, max-content)",
            "gap": {
                "columnGap": "medium",
                "rowGap": "medium"
            },
            "classes": [
                "usr-fw-overview-grid"
            ]
        },
        "parentName": "FW_Panel_overview",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_OverviewInfoCard",
        "values": {
            "type": "crt.FlexContainer",
            "items": [],
            "direction": "column",
            "wrap": "nowrap",
            "classes": [
                "usr-fw-innercard"
            ],
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_OverviewCards",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_InfoTitle",
        "values": {
            "type": "crt.Label",
            "caption": "Request Information",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-panel-title"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_OverviewInfoCard",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_OverviewFields",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-fw-data"
            ]
        },
        "parentName": "FW_OverviewInfoCard",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Info_RequestType",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ],
            "justifyContent": "space-between",
            "alignItems": "center"
        },
        "parentName": "FW_OverviewFields",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Info_RequestTypeLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Request Type",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Info_RequestType",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Info_RequestTypeValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_RequestType",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Info_RequestType",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Info_Authority",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ],
            "justifyContent": "space-between",
            "alignItems": "center"
        },
        "parentName": "FW_OverviewFields",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Info_AuthorityLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Authority",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Info_Authority",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Info_AuthorityValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_Authority",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Info_Authority",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Info_Project",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ],
            "justifyContent": "space-between",
            "alignItems": "center"
        },
        "parentName": "FW_OverviewFields",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_Info_ProjectLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Project",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Info_Project",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Info_ProjectValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_Project",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Info_Project",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Info_Requester",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ],
            "justifyContent": "space-between",
            "alignItems": "center"
        },
        "parentName": "FW_OverviewFields",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_Info_RequesterLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Requester",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Info_Requester",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Info_RequesterValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_Requester",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Info_Requester",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Info_Submitted",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ],
            "justifyContent": "space-between",
            "alignItems": "center"
        },
        "parentName": "FW_OverviewFields",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_Info_SubmittedLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Submitted",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Info_Submitted",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Info_SubmittedValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_Submitted",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Info_Submitted",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Info_EstPoints",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ],
            "justifyContent": "space-between",
            "alignItems": "center"
        },
        "parentName": "FW_OverviewFields",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_Info_EstPointsLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Est. Points",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Info_EstPoints",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Info_EstPointsValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_EstPoints",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Info_EstPoints",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_OverviewJustCard",
        "values": {
            "type": "crt.FlexContainer",
            "items": [],
            "direction": "column",
            "wrap": "nowrap",
            "classes": [
                "usr-fw-innercard"
            ],
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_OverviewCards",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_JustTitle",
        "values": {
            "type": "crt.Label",
            "caption": "Business Justification",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-panel-title"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_OverviewJustCard",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Justification",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_Justification",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-multiline"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "FW_OverviewJustCard",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Panel_items",
        "values": {
            "type": "crt.TabContainer",
            "items": [],
            "caption": "VM Items",
            "iconPosition": "only-text",
            "classes": [
                "usr-fw-panel"
            ]
        },
        "parentName": "FW_Tabs",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Panel_points",
        "values": {
            "type": "crt.TabContainer",
            "items": [],
            "caption": "Contract & Points",
            "iconPosition": "only-text",
            "classes": [
                "usr-fw-panel",
                "usr-fw-contract-tab"
            ]
        },
        "parentName": "FW_Tabs",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_ContractDetailsCard",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "none",
            "classes": [
                "usr-fw-contract-panel",
                "usr-fw-contract-details"
            ]
        },
        "parentName": "FW_Panel_points",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_ContractTitle",
        "values": {
            "type": "crt.Label",
            "caption": "Contract Details",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-panel-title"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_ContractDetailsCard",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_ContractFields",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "classes": [
                "usr-fw-data",
                "usr-fw-contract-grid"
            ],
            "columns": [
                "minmax(32px,1fr)",
                "minmax(32px,1fr)"
            ],
            "rows": "minmax(32px,max-content)",
            "gap": {
                "columnGap": "medium",
                "rowGap": "small"
            }
        },
        "parentName": "FW_ContractDetailsCard",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Contract_ContractNumber",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ],
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "justifyContent": "space-between",
            "alignItems": "center"
        },
        "parentName": "FW_ContractFields",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Contract_ContractNumberLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Contract ID",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Contract_ContractNumber",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Contract_ContractNumberValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_ContractNumber",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Contract_ContractNumber",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Contract_ContractReference",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ],
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "justifyContent": "space-between",
            "alignItems": "center"
        },
        "parentName": "FW_ContractFields",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Contract_ContractReferenceLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Reference",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Contract_ContractReference",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Contract_ContractReferenceValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_ContractReference",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Contract_ContractReference",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Contract_ContractPeriod",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ],
            "layoutConfig": {
                "column": 2,
                "row": 2,
                "colSpan": 1,
                "rowSpan": 1
            },
            "justifyContent": "space-between",
            "alignItems": "center"
        },
        "parentName": "FW_ContractFields",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_Contract_ContractPeriodLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Valid From",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Contract_ContractPeriod",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Contract_ContractPeriodValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_ContractValidFrom",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Contract_ContractPeriod",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Contract_Authority",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ],
            "layoutConfig": {
                "column": 1,
                "row": 2,
                "colSpan": 1,
                "rowSpan": 1
            },
            "justifyContent": "space-between",
            "alignItems": "center"
        },
        "parentName": "FW_ContractFields",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_Contract_AuthorityLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Authority",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Contract_Authority",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Contract_AuthorityValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_Authority",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Contract_Authority",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Contract_ValidTo",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ],
            "layoutConfig": {
                "column": 1,
                "row": 3,
                "colSpan": 1,
                "rowSpan": 1
            },
            "justifyContent": "space-between",
            "alignItems": "center"
        },
        "parentName": "FW_ContractFields",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_Contract_ValidToLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Valid To",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Contract_ValidTo",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Contract_ValidToValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_ContractValidTo",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Contract_ValidTo",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_PointBalanceCard",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "none",
            "classes": [
                "usr-fw-contract-panel",
                "usr-fw-balance-panel"
            ]
        },
        "parentName": "FW_Panel_points",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_BalanceTitle",
        "values": {
            "type": "crt.Label",
            "caption": "Point Balances & Availability Assessment",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-panel-title"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_PointBalanceCard",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_PointFields",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "classes": [
                "usr-fw-data"
            ],
            "columns": [
                "minmax(32px,1fr)",
                "minmax(32px,1fr)",
                "minmax(32px,1fr)",
                "minmax(32px,1fr)"
            ],
            "rows": "minmax(32px,max-content)",
            "gap": {
                "columnGap": "medium",
                "rowGap": "small"
            }
        },
        "parentName": "FW_PointBalanceCard",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Point_AvailablePoints",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ],
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "alignItems": "center",
            "justifyContent": "center"
        },
        "parentName": "FW_PointFields",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Point_AvailablePointsLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Available Points",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Point_AvailablePoints",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Point_AvailablePointsValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_AvailablePoints",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Point_AvailablePoints",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Point_ConsumedPoints",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ],
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "alignItems": "center",
            "justifyContent": "center"
        },
        "parentName": "FW_PointFields",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Point_ConsumedPointsLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Consumed Points",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Point_ConsumedPoints",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Point_ConsumedPointsValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_ConsumedPoints",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Point_ConsumedPoints",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Point_RestoredPoints",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ],
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "alignItems": "center",
            "justifyContent": "center"
        },
        "parentName": "FW_PointFields",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_Point_RestoredPointsLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Restored Points",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Point_RestoredPoints",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Point_RestoredPointsValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_RestoredPoints",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Point_RestoredPoints",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Point_EstPoints",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ],
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "alignItems": "center",
            "justifyContent": "center"
        },
        "parentName": "FW_PointFields",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_Point_EstPointsLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Estimated Request",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Point_EstPoints",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Point_EstPointsValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_EstPoints",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Point_EstPoints",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Point_BalanceAfter",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ]
        },
        "parentName": "FW_PointFields",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_Point_BalanceAfterLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Balance after approval",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Point_BalanceAfter",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Point_BalanceAfterValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_BalanceAfter",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Point_BalanceAfter",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_InitialContractPointsCard",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-fw-innercard"
            ],
            "visible": false
        },
        "parentName": "FW_Panel_points",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_InitialContractPointsLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Contract initial points (not available balance)",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_InitialContractPointsCard",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_InitialContractPoints",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_InitialContractPoints",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_InitialContractPointsCard",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Panel_documents",
        "values": {
            "type": "crt.TabContainer",
            "items": [],
            "caption": "Documents",
            "iconPosition": "only-text",
            "classes": [
                "usr-fw-panel"
            ]
        },
        "parentName": "FW_Tabs",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_DocOpen",
        "values": {
            "type": "crt.Button",
            "caption": "Open request documents",
            "color": "default",
            "displayType": "contained",
            "size": "small",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.FWOpenRequest",
                "params": {}
            },
            "visible": "$FW_DocOpenVisible"
        },
        "parentName": "FW_Panel_documents",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_Panel_validation",
        "values": {
            "type": "crt.TabContainer",
            "items": [],
            "caption": "Validation Findings",
            "iconPosition": "only-text",
            "classes": [
                "usr-fw-panel"
            ]
        },
        "parentName": "FW_Tabs",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_ValTitle",
        "values": {
            "type": "crt.Label",
            "caption": "Automatic Validation Findings",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-panel-title"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Panel_validation",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Panel_history",
        "values": {
            "type": "crt.TabContainer",
            "items": [],
            "caption": "Workflow History",
            "iconPosition": "only-text",
            "classes": [
                "usr-fw-panel"
            ]
        },
        "parentName": "FW_Tabs",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_Panel_audit",
        "values": {
            "type": "crt.TabContainer",
            "items": [],
            "caption": "Activity & Audit",
            "iconPosition": "only-text",
            "classes": [
                "usr-fw-panel"
            ]
        },
        "parentName": "FW_Tabs",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "FW_OpenChangelog",
        "values": {
            "type": "crt.Button",
            "caption": "Open Creatio Change Log",
            "color": "default",
            "displayType": "contained",
            "size": "small",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.FWOpenChangeLog",
                "params": {}
            }
        },
        "parentName": "FW_Panel_audit",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_Side",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-fw-right"
            ],
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_Main",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_SideTitle",
        "values": {
            "type": "crt.Label",
            "caption": "Review Decision",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-right-header"
            ],
            "labelColor": "#12203B",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Side",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_CurrentStatus",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_ReviewStatus",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-review-status"
            ],
            "labelColor": "#68768D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Side",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_SidePoints",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-fw-points"
            ]
        },
        "parentName": "FW_Side",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_SideEstimate",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ],
            "justifyContent": "space-between",
            "alignItems": "center"
        },
        "parentName": "FW_SidePoints",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_SideEstimateLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Estimated request",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_SideEstimate",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_SideEstimateValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_EstPoints",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_SideEstimate",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_SideAvailable",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ],
            "justifyContent": "space-between",
            "alignItems": "center"
        },
        "parentName": "FW_SidePoints",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_SideAvailableLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Available balance",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_SideAvailable",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_SideAvailableValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_AvailablePoints",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_SideAvailable",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_SideRemaining",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "classes": [
                "usr-fw-field"
            ],
            "justifyContent": "space-between",
            "alignItems": "center"
        },
        "parentName": "FW_SidePoints",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_SideRemainingLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Balance after approval",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldname"
            ],
            "labelColor": "#6B7890",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_SideRemaining",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_SideRemainingValue",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_BalanceAfter",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_SideRemaining",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_InternalNotes",
        "values": {
            "type": "crt.Input",
            "label": "Internal Notes (TE only)",
            "labelPosition": "auto",
            "control": "$FW_Comments",
            "placeholder": "Internal comments not shared with requester...",
            "multiline": true,
            "classes": [
                "usr-fw-notes"
            ]
        },
        "parentName": "FW_Side",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_SaveNotes",
        "values": {
            "type": "crt.Button",
            "caption": "Save Notes",
            "color": "default",
            "displayType": "contained",
            "size": "medium",
            "clicked": {
                "request": "usr.FWSaveNotes",
                "params": {}
            },
            "classes": [
                "usr-fw-save"
            ]
        },
        "parentName": "FW_Side",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_NotesFeedback",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_NotesFeedback",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-feedback"
            ],
            "visible": "$FW_ShowNotesFeedback",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Side",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_Approve",
        "values": {
            "type": "crt.Button",
            "caption": "Approve",
            "color": "accent",
            "displayType": "contained",
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.FWOpenApprovalsPanel",
                "params": {"intendedDecision": "approve"}
            },
            "classes": [
                "usr-fw-approve"
            ]
        },
        "parentName": "FW_Side",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "FW_Return",
        "values": {
            "type": "crt.Button",
            "caption": "Return for Correction",
            "disabled": false,
            "color": "default",
            "displayType": "outlined",
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.FWDecision",
                "params": {
                    "decision": "return"
                }
            },
            "classes": [
                "usr-fw-return"
            ]
        },
        "parentName": "FW_Side",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "FW_Reject",
        "values": {
            "type": "crt.Button",
            "caption": "Reject Request",
            "disabled": false,
            "color": "default",
            "displayType": "outlined",
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.FWOpenApprovalsPanel",
                "params": {"intendedDecision": "reject"}
            },
            "classes": [
                "usr-fw-reject"
            ]
        },
        "parentName": "FW_Side",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "FW_Notice",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_Notice",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-error"
            ],
            "visible": "$FW_ShowError",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Root",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_VMTable",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-vm-table"
            ],
            "visible": "$FW_VMTableVisible"
        },
        "parentName": "FW_Panel_items",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_VMHead",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-vm-head"
            ],
            "columns": [
                "32px",
                "minmax(170px,1.8fr)",
                "minmax(90px,.7fr)",
                "minmax(120px,1.1fr)",
                "minmax(55px,.4fr)",
                "minmax(64px,.55fr)",
                "minmax(75px,.6fr)",
                "minmax(115px,1fr)",
                "minmax(45px,.4fr)",
                "minmax(67px,.55fr)"
            ],
            "rows": "minmax(32px,max-content)"
        },
        "parentName": "FW_VMTable",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_VMHead_0",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-head-cell"
            ],
            "caption": "Num",
            "labelColor": "#64748B",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMHead",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_VMHead_1",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-head-cell"
            ],
            "caption": "Purpose",
            "labelColor": "#64748B",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMHead",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_VMHead_2",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-head-cell"
            ],
            "caption": "Environment",
            "labelColor": "#64748B",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMHead",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_VMHead_3",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-head-cell"
            ],
            "caption": "Operating system",
            "labelColor": "#64748B",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMHead",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_VMHead_4",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-head-cell"
            ],
            "caption": "vCPU",
            "labelColor": "#64748B",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMHead",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_VMHead_5",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-head-cell"
            ],
            "caption": "RAM",
            "labelColor": "#64748B",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMHead",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_VMHead_6",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-head-cell"
            ],
            "caption": "Storage",
            "labelColor": "#64748B",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMHead",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "FW_VMHead_7",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-head-cell"
            ],
            "caption": "Network",
            "labelColor": "#64748B",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMHead",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "FW_VMHead_8",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-head-cell"
            ],
            "caption": "Quantity",
            "labelColor": "#64748B",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMHead",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "FW_VMHead_9",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-head-cell"
            ],
            "caption": "Est. Pts",
            "labelColor": "#64748B",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMHead",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "FW_VMRow1",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-vm-row"
            ],
            "visible": "$FW_VMShow1",
            "columns": [
                "32px",
                "minmax(170px,1.8fr)",
                "minmax(90px,.7fr)",
                "minmax(120px,1.1fr)",
                "minmax(55px,.4fr)",
                "minmax(64px,.55fr)",
                "minmax(75px,.6fr)",
                "minmax(115px,1fr)",
                "minmax(45px,.4fr)",
                "minmax(67px,.55fr)"
            ],
            "rows": "minmax(32px,max-content)"
        },
        "parentName": "FW_VMTable",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_VMRow1_#",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-number"
            ],
            "caption": "$FW_VM1_#",
            "labelColor": "#8490A2",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow1",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_VMRow1_Purpose",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM1_Purpose",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow1",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_VMRow1_Env",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM1_Env",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow1",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_VMRow1_OS",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM1_OS",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow1",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_VMRow1_CPU",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM1_CPU",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow1",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_VMRow1_RAM",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM1_RAM",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow1",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_VMRow1_Storage",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM1_Storage",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow1",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "FW_VMRow1_Network",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM1_Network",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow1",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "FW_VMRow1_Qty",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM1_Qty",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow1",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "FW_VMRow1_Pts",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-purple"
            ],
            "caption": "$FW_VM1_Pts",
            "labelColor": "#6521B5",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow1",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "FW_VMRow2",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-vm-row"
            ],
            "visible": "$FW_VMShow2",
            "columns": [
                "32px",
                "minmax(170px,1.8fr)",
                "minmax(90px,.7fr)",
                "minmax(120px,1.1fr)",
                "minmax(55px,.4fr)",
                "minmax(64px,.55fr)",
                "minmax(75px,.6fr)",
                "minmax(115px,1fr)",
                "minmax(45px,.4fr)",
                "minmax(67px,.55fr)"
            ],
            "rows": "minmax(32px,max-content)"
        },
        "parentName": "FW_VMTable",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_VMRow2_#",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-number"
            ],
            "caption": "$FW_VM2_#",
            "labelColor": "#8490A2",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow2",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_VMRow2_Purpose",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM2_Purpose",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow2",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_VMRow2_Env",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM2_Env",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow2",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_VMRow2_OS",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM2_OS",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow2",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_VMRow2_CPU",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM2_CPU",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow2",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_VMRow2_RAM",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM2_RAM",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow2",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_VMRow2_Storage",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM2_Storage",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow2",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "FW_VMRow2_Network",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM2_Network",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow2",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "FW_VMRow2_Qty",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM2_Qty",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow2",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "FW_VMRow2_Pts",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-purple"
            ],
            "caption": "$FW_VM2_Pts",
            "labelColor": "#6521B5",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow2",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "FW_VMRow3",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-vm-row"
            ],
            "visible": "$FW_VMShow3",
            "columns": [
                "32px",
                "minmax(170px,1.8fr)",
                "minmax(90px,.7fr)",
                "minmax(120px,1.1fr)",
                "minmax(55px,.4fr)",
                "minmax(64px,.55fr)",
                "minmax(75px,.6fr)",
                "minmax(115px,1fr)",
                "minmax(45px,.4fr)",
                "minmax(67px,.55fr)"
            ],
            "rows": "minmax(32px,max-content)"
        },
        "parentName": "FW_VMTable",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_VMRow3_#",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-number"
            ],
            "caption": "$FW_VM3_#",
            "labelColor": "#8490A2",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow3",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_VMRow3_Purpose",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM3_Purpose",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow3",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_VMRow3_Env",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM3_Env",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow3",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_VMRow3_OS",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM3_OS",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow3",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_VMRow3_CPU",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM3_CPU",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow3",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_VMRow3_RAM",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM3_RAM",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow3",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_VMRow3_Storage",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM3_Storage",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow3",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "FW_VMRow3_Network",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM3_Network",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow3",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "FW_VMRow3_Qty",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM3_Qty",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow3",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "FW_VMRow3_Pts",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-purple"
            ],
            "caption": "$FW_VM3_Pts",
            "labelColor": "#6521B5",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow3",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "FW_VMRow4",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-vm-row"
            ],
            "visible": "$FW_VMShow4",
            "columns": [
                "32px",
                "minmax(170px,1.8fr)",
                "minmax(90px,.7fr)",
                "minmax(120px,1.1fr)",
                "minmax(55px,.4fr)",
                "minmax(64px,.55fr)",
                "minmax(75px,.6fr)",
                "minmax(115px,1fr)",
                "minmax(45px,.4fr)",
                "minmax(67px,.55fr)"
            ],
            "rows": "minmax(32px,max-content)"
        },
        "parentName": "FW_VMTable",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_VMRow4_#",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-number"
            ],
            "caption": "$FW_VM4_#",
            "labelColor": "#8490A2",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow4",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_VMRow4_Purpose",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM4_Purpose",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow4",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_VMRow4_Env",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM4_Env",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow4",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_VMRow4_OS",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM4_OS",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow4",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_VMRow4_CPU",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM4_CPU",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow4",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_VMRow4_RAM",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM4_RAM",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow4",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_VMRow4_Storage",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM4_Storage",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow4",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "FW_VMRow4_Network",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM4_Network",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow4",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "FW_VMRow4_Qty",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM4_Qty",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow4",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "FW_VMRow4_Pts",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-purple"
            ],
            "caption": "$FW_VM4_Pts",
            "labelColor": "#6521B5",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow4",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "FW_VMRow5",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-vm-row"
            ],
            "visible": "$FW_VMShow5",
            "columns": [
                "32px",
                "minmax(170px,1.8fr)",
                "minmax(90px,.7fr)",
                "minmax(120px,1.1fr)",
                "minmax(55px,.4fr)",
                "minmax(64px,.55fr)",
                "minmax(75px,.6fr)",
                "minmax(115px,1fr)",
                "minmax(45px,.4fr)",
                "minmax(67px,.55fr)"
            ],
            "rows": "minmax(32px,max-content)"
        },
        "parentName": "FW_VMTable",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_VMRow5_#",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-number"
            ],
            "caption": "$FW_VM5_#",
            "labelColor": "#8490A2",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow5",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_VMRow5_Purpose",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM5_Purpose",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow5",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_VMRow5_Env",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM5_Env",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow5",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_VMRow5_OS",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM5_OS",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow5",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_VMRow5_CPU",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM5_CPU",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow5",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_VMRow5_RAM",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM5_RAM",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow5",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_VMRow5_Storage",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM5_Storage",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow5",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "FW_VMRow5_Network",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM5_Network",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow5",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "FW_VMRow5_Qty",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM5_Qty",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow5",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "FW_VMRow5_Pts",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-purple"
            ],
            "caption": "$FW_VM5_Pts",
            "labelColor": "#6521B5",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow5",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "FW_VMRow6",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-vm-row"
            ],
            "visible": "$FW_VMShow6",
            "columns": [
                "32px",
                "minmax(170px,1.8fr)",
                "minmax(90px,.7fr)",
                "minmax(120px,1.1fr)",
                "minmax(55px,.4fr)",
                "minmax(64px,.55fr)",
                "minmax(75px,.6fr)",
                "minmax(115px,1fr)",
                "minmax(45px,.4fr)",
                "minmax(67px,.55fr)"
            ],
            "rows": "minmax(32px,max-content)"
        },
        "parentName": "FW_VMTable",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "FW_VMRow6_#",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-number"
            ],
            "caption": "$FW_VM6_#",
            "labelColor": "#8490A2",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow6",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_VMRow6_Purpose",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM6_Purpose",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow6",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_VMRow6_Env",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM6_Env",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow6",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_VMRow6_OS",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM6_OS",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow6",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_VMRow6_CPU",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM6_CPU",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow6",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_VMRow6_RAM",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM6_RAM",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow6",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_VMRow6_Storage",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM6_Storage",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow6",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "FW_VMRow6_Network",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM6_Network",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow6",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "FW_VMRow6_Qty",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM6_Qty",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow6",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "FW_VMRow6_Pts",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-purple"
            ],
            "caption": "$FW_VM6_Pts",
            "labelColor": "#6521B5",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow6",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "FW_VMRow7",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-vm-row"
            ],
            "visible": "$FW_VMShow7",
            "columns": [
                "32px",
                "minmax(170px,1.8fr)",
                "minmax(90px,.7fr)",
                "minmax(120px,1.1fr)",
                "minmax(55px,.4fr)",
                "minmax(64px,.55fr)",
                "minmax(75px,.6fr)",
                "minmax(115px,1fr)",
                "minmax(45px,.4fr)",
                "minmax(67px,.55fr)"
            ],
            "rows": "minmax(32px,max-content)"
        },
        "parentName": "FW_VMTable",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "FW_VMRow7_#",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-number"
            ],
            "caption": "$FW_VM7_#",
            "labelColor": "#8490A2",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow7",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_VMRow7_Purpose",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM7_Purpose",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow7",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_VMRow7_Env",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM7_Env",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow7",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_VMRow7_OS",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM7_OS",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow7",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_VMRow7_CPU",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM7_CPU",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow7",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_VMRow7_RAM",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM7_RAM",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow7",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_VMRow7_Storage",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM7_Storage",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow7",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "FW_VMRow7_Network",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM7_Network",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow7",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "FW_VMRow7_Qty",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM7_Qty",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow7",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "FW_VMRow7_Pts",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-purple"
            ],
            "caption": "$FW_VM7_Pts",
            "labelColor": "#6521B5",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow7",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "FW_VMRow8",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-vm-row"
            ],
            "visible": "$FW_VMShow8",
            "columns": [
                "32px",
                "minmax(170px,1.8fr)",
                "minmax(90px,.7fr)",
                "minmax(120px,1.1fr)",
                "minmax(55px,.4fr)",
                "minmax(64px,.55fr)",
                "minmax(75px,.6fr)",
                "minmax(115px,1fr)",
                "minmax(45px,.4fr)",
                "minmax(67px,.55fr)"
            ],
            "rows": "minmax(32px,max-content)"
        },
        "parentName": "FW_VMTable",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "FW_VMRow8_#",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-number"
            ],
            "caption": "$FW_VM8_#",
            "labelColor": "#8490A2",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow8",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_VMRow8_Purpose",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM8_Purpose",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow8",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_VMRow8_Env",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM8_Env",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow8",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_VMRow8_OS",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM8_OS",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow8",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_VMRow8_CPU",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM8_CPU",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow8",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_VMRow8_RAM",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM8_RAM",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow8",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_VMRow8_Storage",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM8_Storage",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow8",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "FW_VMRow8_Network",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM8_Network",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow8",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "FW_VMRow8_Qty",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM8_Qty",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow8",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "FW_VMRow8_Pts",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-purple"
            ],
            "caption": "$FW_VM8_Pts",
            "labelColor": "#6521B5",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow8",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "FW_VMRow9",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-vm-row"
            ],
            "visible": "$FW_VMShow9",
            "columns": [
                "32px",
                "minmax(170px,1.8fr)",
                "minmax(90px,.7fr)",
                "minmax(120px,1.1fr)",
                "minmax(55px,.4fr)",
                "minmax(64px,.55fr)",
                "minmax(75px,.6fr)",
                "minmax(115px,1fr)",
                "minmax(45px,.4fr)",
                "minmax(67px,.55fr)"
            ],
            "rows": "minmax(32px,max-content)"
        },
        "parentName": "FW_VMTable",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "FW_VMRow9_#",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-number"
            ],
            "caption": "$FW_VM9_#",
            "labelColor": "#8490A2",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow9",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_VMRow9_Purpose",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM9_Purpose",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow9",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_VMRow9_Env",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM9_Env",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow9",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_VMRow9_OS",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM9_OS",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow9",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_VMRow9_CPU",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM9_CPU",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow9",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_VMRow9_RAM",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM9_RAM",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow9",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_VMRow9_Storage",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM9_Storage",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow9",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "FW_VMRow9_Network",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM9_Network",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow9",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "FW_VMRow9_Qty",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM9_Qty",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow9",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "FW_VMRow9_Pts",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-purple"
            ],
            "caption": "$FW_VM9_Pts",
            "labelColor": "#6521B5",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow9",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "FW_VMRow10",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-vm-row"
            ],
            "visible": "$FW_VMShow10",
            "columns": [
                "32px",
                "minmax(170px,1.8fr)",
                "minmax(90px,.7fr)",
                "minmax(120px,1.1fr)",
                "minmax(55px,.4fr)",
                "minmax(64px,.55fr)",
                "minmax(75px,.6fr)",
                "minmax(115px,1fr)",
                "minmax(45px,.4fr)",
                "minmax(67px,.55fr)"
            ],
            "rows": "minmax(32px,max-content)"
        },
        "parentName": "FW_VMTable",
        "propertyName": "items",
        "index": 10
    },
    {
        "operation": "insert",
        "name": "FW_VMRow10_#",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-number"
            ],
            "caption": "$FW_VM10_#",
            "labelColor": "#8490A2",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow10",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_VMRow10_Purpose",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM10_Purpose",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow10",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_VMRow10_Env",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM10_Env",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow10",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_VMRow10_OS",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM10_OS",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow10",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_VMRow10_CPU",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM10_CPU",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow10",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_VMRow10_RAM",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM10_RAM",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow10",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_VMRow10_Storage",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM10_Storage",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow10",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "FW_VMRow10_Network",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM10_Network",
            "labelColor": "#263550",
            "labelThickness": "default",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow10",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "FW_VMRow10_Qty",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-normal"
            ],
            "caption": "$FW_VM10_Qty",
            "labelColor": "#263550",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow10",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "FW_VMRow10_Pts",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-vm-cell",
                "usr-fw-vm-purple"
            ],
            "caption": "$FW_VM10_Pts",
            "labelColor": "#6521B5",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_VMRow10",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "FW_DocTable",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-doc-table"
            ],
            "visible": "$FW_DocTableVisible"
        },
        "parentName": "FW_Panel_documents",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_DocHead",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-doc-head"
            ],
            "columns": [
                "minmax(110px,.8fr)",
                "minmax(210px,2fr)",
                "minmax(105px,.85fr)",
                "minmax(105px,.9fr)"
            ],
            "rows": "minmax(34px,max-content)"
        },
        "parentName": "FW_DocTable",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_DocHead0",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-hcell"
            ],
            "caption": "Type",
            "labelColor": "#64748B",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocHead",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_DocHead1",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-hcell"
            ],
            "caption": "File name",
            "labelColor": "#64748B",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocHead",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_DocHead2",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-hcell"
            ],
            "caption": "Upload date",
            "labelColor": "#64748B",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocHead",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_DocHead3",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-hcell"
            ],
            "caption": "Availability",
            "labelColor": "#64748B",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocHead",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_DocRow1",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-doc-row"
            ],
            "visible": "$FW_DocShow1",
            "columns": [
                "minmax(110px,.8fr)",
                "minmax(210px,2fr)",
                "minmax(105px,.85fr)",
                "minmax(105px,.9fr)"
            ],
            "rows": "minmax(34px,max-content)"
        },
        "parentName": "FW_DocTable",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_DocRow1_Type",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc1_Type",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow1",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_DocRow1_File",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-filename"
            ],
            "caption": "$FW_Doc1_File",
            "labelColor": "#6521B5",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow1",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_DocRow1_Date",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc1_Date",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow1",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_DocRow1_State",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc1_State",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow1",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_DocRow2",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-doc-row"
            ],
            "visible": "$FW_DocShow2",
            "columns": [
                "minmax(110px,.8fr)",
                "minmax(210px,2fr)",
                "minmax(105px,.85fr)",
                "minmax(105px,.9fr)"
            ],
            "rows": "minmax(34px,max-content)"
        },
        "parentName": "FW_DocTable",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_DocRow2_Type",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc2_Type",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow2",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_DocRow2_File",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-filename"
            ],
            "caption": "$FW_Doc2_File",
            "labelColor": "#6521B5",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow2",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_DocRow2_Date",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc2_Date",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow2",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_DocRow2_State",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc2_State",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow2",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_DocRow3",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-doc-row"
            ],
            "visible": "$FW_DocShow3",
            "columns": [
                "minmax(110px,.8fr)",
                "minmax(210px,2fr)",
                "minmax(105px,.85fr)",
                "minmax(105px,.9fr)"
            ],
            "rows": "minmax(34px,max-content)"
        },
        "parentName": "FW_DocTable",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_DocRow3_Type",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc3_Type",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow3",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_DocRow3_File",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-filename"
            ],
            "caption": "$FW_Doc3_File",
            "labelColor": "#6521B5",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow3",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_DocRow3_Date",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc3_Date",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow3",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_DocRow3_State",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc3_State",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow3",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_DocRow4",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-doc-row"
            ],
            "visible": "$FW_DocShow4",
            "columns": [
                "minmax(110px,.8fr)",
                "minmax(210px,2fr)",
                "minmax(105px,.85fr)",
                "minmax(105px,.9fr)"
            ],
            "rows": "minmax(34px,max-content)"
        },
        "parentName": "FW_DocTable",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_DocRow4_Type",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc4_Type",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow4",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_DocRow4_File",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-filename"
            ],
            "caption": "$FW_Doc4_File",
            "labelColor": "#6521B5",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow4",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_DocRow4_Date",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc4_Date",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow4",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_DocRow4_State",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc4_State",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow4",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_DocRow5",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-doc-row"
            ],
            "visible": "$FW_DocShow5",
            "columns": [
                "minmax(110px,.8fr)",
                "minmax(210px,2fr)",
                "minmax(105px,.85fr)",
                "minmax(105px,.9fr)"
            ],
            "rows": "minmax(34px,max-content)"
        },
        "parentName": "FW_DocTable",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_DocRow5_Type",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc5_Type",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow5",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_DocRow5_File",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-filename"
            ],
            "caption": "$FW_Doc5_File",
            "labelColor": "#6521B5",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow5",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_DocRow5_Date",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc5_Date",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow5",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_DocRow5_State",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc5_State",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow5",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_DocRow6",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-doc-row"
            ],
            "visible": "$FW_DocShow6",
            "columns": [
                "minmax(110px,.8fr)",
                "minmax(210px,2fr)",
                "minmax(105px,.85fr)",
                "minmax(105px,.9fr)"
            ],
            "rows": "minmax(34px,max-content)"
        },
        "parentName": "FW_DocTable",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "FW_DocRow6_Type",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc6_Type",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow6",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_DocRow6_File",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-filename"
            ],
            "caption": "$FW_Doc6_File",
            "labelColor": "#6521B5",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow6",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_DocRow6_Date",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc6_Date",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow6",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_DocRow6_State",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc6_State",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow6",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_DocRow7",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-doc-row"
            ],
            "visible": "$FW_DocShow7",
            "columns": [
                "minmax(110px,.8fr)",
                "minmax(210px,2fr)",
                "minmax(105px,.85fr)",
                "minmax(105px,.9fr)"
            ],
            "rows": "minmax(34px,max-content)"
        },
        "parentName": "FW_DocTable",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "FW_DocRow7_Type",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc7_Type",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow7",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_DocRow7_File",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-filename"
            ],
            "caption": "$FW_Doc7_File",
            "labelColor": "#6521B5",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow7",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_DocRow7_Date",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc7_Date",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow7",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_DocRow7_State",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc7_State",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow7",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_DocRow8",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-fw-doc-row"
            ],
            "visible": "$FW_DocShow8",
            "columns": [
                "minmax(110px,.8fr)",
                "minmax(210px,2fr)",
                "minmax(105px,.85fr)",
                "minmax(105px,.9fr)"
            ],
            "rows": "minmax(34px,max-content)"
        },
        "parentName": "FW_DocTable",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "FW_DocRow8_Type",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc8_Type",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow8",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_DocRow8_File",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-filename"
            ],
            "caption": "$FW_Doc8_File",
            "labelColor": "#6521B5",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow8",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_DocRow8_Date",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc8_Date",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow8",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_DocRow8_State",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-doc-cell"
            ],
            "caption": "$FW_Doc8_State",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "FW_DocRow8",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_ValBanner_Passed",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-validation-banner",
                "usr-fw-validation-success"
            ],
            "caption": "$FW_ValPassedText",
            "visible": "$FW_ValPassedVisible",
            "labelBackgroundColor": "#E7F8EF",
            "labelColor": "#067647",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Panel_validation",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_ValBanner_Unverified",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-validation-banner",
                "usr-fw-validation-unknown"
            ],
            "caption": "$FW_ValUnverifiedText",
            "visible": "$FW_ValUnverifiedVisible",
            "labelBackgroundColor": "#F2F4F8",
            "labelColor": "#63748A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Panel_validation",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_ValBanner_Issues",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-validation-banner",
                "usr-fw-validation-danger"
            ],
            "caption": "$FW_ValIssuesText",
            "visible": "$FW_ValIssuesVisible",
            "labelBackgroundColor": "#FFF0EF",
            "labelColor": "#B42318",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Panel_validation",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryList",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-list"
            ],
            "visible": "$FW_HistoryListVisible"
        },
        "parentName": "FW_Panel_history",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryCard1",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-history-card"
            ],
            "visible": "$FW_HistoryShow1"
        },
        "parentName": "FW_HistoryList",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconDone1",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_HistoryDone1",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard1",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconPending1",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_HistoryPending1",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard1",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryDetails1",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_HistoryCard1",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo1_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_HistoryTitle1",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails1",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo1_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_HistoryMeta1",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails1",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo1_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_HistoryOutcome1",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails1",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryCard2",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-history-card"
            ],
            "visible": "$FW_HistoryShow2"
        },
        "parentName": "FW_HistoryList",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconDone2",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_HistoryDone2",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard2",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconPending2",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_HistoryPending2",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard2",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryDetails2",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_HistoryCard2",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo2_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_HistoryTitle2",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails2",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo2_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_HistoryMeta2",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails2",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo2_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_HistoryOutcome2",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails2",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryCard3",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-history-card"
            ],
            "visible": "$FW_HistoryShow3"
        },
        "parentName": "FW_HistoryList",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconDone3",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_HistoryDone3",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard3",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconPending3",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_HistoryPending3",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard3",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryDetails3",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_HistoryCard3",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo3_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_HistoryTitle3",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails3",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo3_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_HistoryMeta3",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails3",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo3_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_HistoryOutcome3",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails3",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryCard4",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-history-card"
            ],
            "visible": "$FW_HistoryShow4"
        },
        "parentName": "FW_HistoryList",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconDone4",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_HistoryDone4",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard4",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconPending4",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_HistoryPending4",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard4",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryDetails4",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_HistoryCard4",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo4_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_HistoryTitle4",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails4",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo4_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_HistoryMeta4",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails4",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo4_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_HistoryOutcome4",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails4",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryCard5",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-history-card"
            ],
            "visible": "$FW_HistoryShow5"
        },
        "parentName": "FW_HistoryList",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconDone5",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_HistoryDone5",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard5",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconPending5",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_HistoryPending5",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard5",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryDetails5",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_HistoryCard5",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo5_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_HistoryTitle5",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails5",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo5_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_HistoryMeta5",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails5",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo5_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_HistoryOutcome5",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails5",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryCard6",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-history-card"
            ],
            "visible": "$FW_HistoryShow6"
        },
        "parentName": "FW_HistoryList",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconDone6",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_HistoryDone6",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard6",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconPending6",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_HistoryPending6",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard6",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryDetails6",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_HistoryCard6",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo6_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_HistoryTitle6",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails6",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo6_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_HistoryMeta6",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails6",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo6_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_HistoryOutcome6",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails6",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryCard7",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-history-card"
            ],
            "visible": "$FW_HistoryShow7"
        },
        "parentName": "FW_HistoryList",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconDone7",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_HistoryDone7",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard7",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconPending7",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_HistoryPending7",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard7",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryDetails7",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_HistoryCard7",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo7_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_HistoryTitle7",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails7",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo7_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_HistoryMeta7",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails7",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo7_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_HistoryOutcome7",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails7",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryCard8",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-history-card"
            ],
            "visible": "$FW_HistoryShow8"
        },
        "parentName": "FW_HistoryList",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconDone8",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_HistoryDone8",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard8",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconPending8",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_HistoryPending8",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard8",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryDetails8",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_HistoryCard8",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo8_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_HistoryTitle8",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails8",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo8_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_HistoryMeta8",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails8",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo8_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_HistoryOutcome8",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails8",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryCard9",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-history-card"
            ],
            "visible": "$FW_HistoryShow9"
        },
        "parentName": "FW_HistoryList",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconDone9",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_HistoryDone9",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard9",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconPending9",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_HistoryPending9",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard9",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryDetails9",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_HistoryCard9",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo9_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_HistoryTitle9",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails9",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo9_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_HistoryMeta9",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails9",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo9_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_HistoryOutcome9",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails9",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryCard10",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-history-card"
            ],
            "visible": "$FW_HistoryShow10"
        },
        "parentName": "FW_HistoryList",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconDone10",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_HistoryDone10",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard10",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconPending10",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_HistoryPending10",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard10",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryDetails10",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_HistoryCard10",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo10_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_HistoryTitle10",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails10",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo10_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_HistoryMeta10",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails10",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo10_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_HistoryOutcome10",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails10",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryCard11",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-history-card"
            ],
            "visible": "$FW_HistoryShow11"
        },
        "parentName": "FW_HistoryList",
        "propertyName": "items",
        "index": 10
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconDone11",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_HistoryDone11",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard11",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconPending11",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_HistoryPending11",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard11",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryDetails11",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_HistoryCard11",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo11_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_HistoryTitle11",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails11",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo11_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_HistoryMeta11",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails11",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo11_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_HistoryOutcome11",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails11",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryCard12",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-history-card"
            ],
            "visible": "$FW_HistoryShow12"
        },
        "parentName": "FW_HistoryList",
        "propertyName": "items",
        "index": 11
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconDone12",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_HistoryDone12",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard12",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryIconPending12",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_HistoryPending12",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryCard12",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryDetails12",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_HistoryCard12",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo12_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_HistoryTitle12",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails12",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo12_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_HistoryMeta12",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails12",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_HistoryInfo12_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_HistoryOutcome12",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HistoryDetails12",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditList",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-list"
            ],
            "visible": "$FW_AuditListVisible"
        },
        "parentName": "FW_Panel_audit",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditCard1",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-audit-card"
            ],
            "visible": "$FW_AuditShow1"
        },
        "parentName": "FW_AuditList",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconDone1",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_AuditDone1",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard1",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconPending1",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_AuditPending1",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard1",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditDetails1",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_AuditCard1",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo1_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_AuditTitle1",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails1",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo1_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_AuditMeta1",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails1",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo1_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_AuditOutcome1",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails1",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditCard2",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-audit-card"
            ],
            "visible": "$FW_AuditShow2"
        },
        "parentName": "FW_AuditList",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconDone2",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_AuditDone2",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard2",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconPending2",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_AuditPending2",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard2",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditDetails2",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_AuditCard2",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo2_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_AuditTitle2",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails2",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo2_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_AuditMeta2",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails2",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo2_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_AuditOutcome2",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails2",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditCard3",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-audit-card"
            ],
            "visible": "$FW_AuditShow3"
        },
        "parentName": "FW_AuditList",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconDone3",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_AuditDone3",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard3",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconPending3",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_AuditPending3",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard3",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditDetails3",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_AuditCard3",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo3_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_AuditTitle3",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails3",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo3_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_AuditMeta3",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails3",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo3_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_AuditOutcome3",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails3",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditCard4",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-audit-card"
            ],
            "visible": "$FW_AuditShow4"
        },
        "parentName": "FW_AuditList",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconDone4",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_AuditDone4",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard4",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconPending4",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_AuditPending4",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard4",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditDetails4",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_AuditCard4",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo4_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_AuditTitle4",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails4",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo4_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_AuditMeta4",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails4",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo4_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_AuditOutcome4",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails4",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditCard5",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-audit-card"
            ],
            "visible": "$FW_AuditShow5"
        },
        "parentName": "FW_AuditList",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconDone5",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_AuditDone5",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard5",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconPending5",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_AuditPending5",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard5",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditDetails5",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_AuditCard5",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo5_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_AuditTitle5",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails5",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo5_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_AuditMeta5",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails5",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo5_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_AuditOutcome5",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails5",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditCard6",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-audit-card"
            ],
            "visible": "$FW_AuditShow6"
        },
        "parentName": "FW_AuditList",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconDone6",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_AuditDone6",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard6",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconPending6",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_AuditPending6",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard6",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditDetails6",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_AuditCard6",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo6_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_AuditTitle6",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails6",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo6_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_AuditMeta6",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails6",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo6_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_AuditOutcome6",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails6",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditCard7",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-audit-card"
            ],
            "visible": "$FW_AuditShow7"
        },
        "parentName": "FW_AuditList",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconDone7",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_AuditDone7",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard7",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconPending7",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_AuditPending7",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard7",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditDetails7",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_AuditCard7",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo7_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_AuditTitle7",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails7",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo7_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_AuditMeta7",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails7",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo7_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_AuditOutcome7",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails7",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditCard8",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-audit-card"
            ],
            "visible": "$FW_AuditShow8"
        },
        "parentName": "FW_AuditList",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconDone8",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_AuditDone8",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard8",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconPending8",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_AuditPending8",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard8",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditDetails8",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_AuditCard8",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo8_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_AuditTitle8",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails8",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo8_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_AuditMeta8",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails8",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo8_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_AuditOutcome8",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails8",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditCard9",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-audit-card"
            ],
            "visible": "$FW_AuditShow9"
        },
        "parentName": "FW_AuditList",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconDone9",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_AuditDone9",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard9",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconPending9",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_AuditPending9",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard9",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditDetails9",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_AuditCard9",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo9_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_AuditTitle9",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails9",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo9_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_AuditMeta9",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails9",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo9_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_AuditOutcome9",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails9",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditCard10",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-audit-card"
            ],
            "visible": "$FW_AuditShow10"
        },
        "parentName": "FW_AuditList",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconDone10",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_AuditDone10",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard10",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconPending10",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_AuditPending10",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard10",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditDetails10",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_AuditCard10",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo10_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_AuditTitle10",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails10",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo10_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_AuditMeta10",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails10",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo10_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_AuditOutcome10",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails10",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditCard11",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-audit-card"
            ],
            "visible": "$FW_AuditShow11"
        },
        "parentName": "FW_AuditList",
        "propertyName": "items",
        "index": 10
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconDone11",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_AuditDone11",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard11",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconPending11",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_AuditPending11",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard11",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditDetails11",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_AuditCard11",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo11_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_AuditTitle11",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails11",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo11_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_AuditMeta11",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails11",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo11_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_AuditOutcome11",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails11",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditCard12",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-card",
                "usr-fw-audit-card"
            ],
            "visible": "$FW_AuditShow12"
        },
        "parentName": "FW_AuditList",
        "propertyName": "items",
        "index": 11
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconDone12",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$FW_AuditDone12",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard12",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditIconPending12",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-icon",
                "usr-fw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$FW_AuditPending12",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditCard12",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditDetails12",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-timeline-details"
            ]
        },
        "parentName": "FW_AuditCard12",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo12_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-title"
            ],
            "caption": "$FW_AuditTitle12",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails12",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo12_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-meta"
            ],
            "caption": "$FW_AuditMeta12",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails12",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AuditInfo12_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-timeline-outcome"
            ],
            "caption": "$FW_AuditOutcome12",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_AuditDetails12",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_PointAssessment",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-point-assessment"
            ]
        },
        "parentName": "FW_PointBalanceCard",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_PointAssessmentTitle",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-assessment-heading"
            ],
            "caption": "Point Availability Assessment",
            "labelColor": "#6022B3",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_PointAssessment",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_Assess_AvailablePoints",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-assessment-row"
            ]
        },
        "parentName": "FW_PointAssessment",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_AssessLabel_AvailablePoints",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-assessment-label"
            ],
            "caption": "Available balance",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Assess_AvailablePoints",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AssessValue_AvailablePoints",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-assessment-value"
            ],
            "caption": "$FW_AvailablePoints",
            "labelColor": "#079452",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Assess_AvailablePoints",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Assess_EstPoints",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-assessment-row"
            ]
        },
        "parentName": "FW_PointAssessment",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "FW_AssessLabel_EstPoints",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-assessment-label"
            ],
            "caption": "Estimated consumption",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Assess_EstPoints",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AssessValue_EstPoints",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-assessment-estimate"
            ],
            "caption": "$FW_EstPoints",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Assess_EstPoints",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_Assess_BalanceAfter",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-fw-assessment-row"
            ]
        },
        "parentName": "FW_PointAssessment",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "FW_AssessLabel_BalanceAfter",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-assessment-label"
            ],
            "caption": "Balance after approval",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Assess_BalanceAfter",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AssessValue_BalanceAfter",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-assessment-value"
            ],
            "caption": "$FW_BalanceAfter",
            "labelColor": "#079452",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_Assess_BalanceAfter",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "merge",
        "name": "FW_ContractFields",
        "values": {
            "classes": [
                "usr-fw-data",
                "usr-fw-contract-grid"
            ]
        }
    },
    {
        "operation": "merge",
        "name": "FW_PointFields",
        "values": {
            "classes": [
                "usr-fw-data",
                "usr-fw-point-cards"
            ]
        }
    },
    {
        "operation": "merge",
        "name": "FW_Point_BalanceAfter",
        "values": {
            "visible": false
        }
    },
    {
        "operation": "merge",
        "name": "FW_Point_AvailablePoints",
        "values": {
            "classes": [
                "usr-fw-field",
                "usr-fw-point-card",
                "usr-fw-point-green"
            ]
        }
    },
    {
        "operation": "merge",
        "name": "FW_Point_ConsumedPoints",
        "values": {
            "classes": [
                "usr-fw-field",
                "usr-fw-point-card",
                "usr-fw-point-purple"
            ]
        }
    },
    {
        "operation": "merge",
        "name": "FW_Point_RestoredPoints",
        "values": {
            "classes": [
                "usr-fw-field",
                "usr-fw-point-card",
                "usr-fw-point-blue"
            ]
        }
    },
    {
        "operation": "merge",
        "name": "FW_Point_EstPoints",
        "values": {
            "classes": [
                "usr-fw-field",
                "usr-fw-point-card",
                "usr-fw-point-orange"
            ]
        }
    },
    {
        "operation": "insert",
        "name": "FW_SLAOkayTop",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-sla-top",
                "usr-fw-sla-positive"
            ],
            "caption": "$FW_SlaRemaining",
            "visible": "$FW_SLAOkayVisible",
            "labelColor": "#09984D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HeaderRight",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_SLALateTop",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-sla-top",
                "usr-fw-sla-negative"
            ],
            "caption": "$FW_SlaRemaining",
            "visible": "$FW_SLALateVisible",
            "labelColor": "#C92F3B",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HeaderRight",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_SLAMissingTop",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-sla-top",
                "usr-fw-sla-neutral"
            ],
            "caption": "$FW_SlaRemaining",
            "visible": "$FW_SLAMissingVisible",
            "labelColor": "#718096",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HeaderRight",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_QueueArrivalTop",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-fw-queue-arrival"
            ],
            "caption": "$FW_QueueCaption",
            "labelColor": "#8A96A7",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "FW_HeaderRight",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "FW_ItemsFallbackBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "visible": "$FW_ItemsFallbackVisible",
            "classes": [
                "usr-fw-fallback-box"
            ]
        },
        "parentName": "FW_Panel_items",
        "propertyName": "items",
        "index": 99
    },
    {
        "operation": "insert",
        "name": "FW_ItemsFallbackMessage",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_ItemsText",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#78859B",
            "labelThickness": "default",
            "classes": [
                "usr-fw-multiline"
            ]
        },
        "parentName": "FW_ItemsFallbackBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_DocFallbackBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "visible": "$FW_DocFallbackVisible",
            "classes": [
                "usr-fw-fallback-box"
            ]
        },
        "parentName": "FW_Panel_documents",
        "propertyName": "items",
        "index": 99
    },
    {
        "operation": "insert",
        "name": "FW_DocFallbackMessage",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_DocEmptyMessage",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#78859B",
            "labelThickness": "default",
            "classes": [
                "usr-fw-empty-tab"
            ]
        },
        "parentName": "FW_DocFallbackBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_HistoryFallbackBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "visible": "$FW_HistoryFallbackVisible",
            "classes": [
                "usr-fw-fallback-box"
            ]
        },
        "parentName": "FW_Panel_history",
        "propertyName": "items",
        "index": 99
    },
    {
        "operation": "insert",
        "name": "FW_HistoryFallbackMessage",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_HistoryText",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#78859B",
            "labelThickness": "default",
            "classes": [
                "usr-fw-multiline"
            ]
        },
        "parentName": "FW_HistoryFallbackBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "FW_AuditFallbackBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "visible": "$FW_AuditFallbackVisible",
            "classes": [
                "usr-fw-fallback-box"
            ]
        },
        "parentName": "FW_Panel_audit",
        "propertyName": "items",
        "index": 99
    },
    {
        "operation": "insert",
        "name": "FW_AuditFallbackMessage",
        "values": {
            "type": "crt.Label",
            "caption": "$FW_AuditText",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#78859B",
            "labelThickness": "default",
            "classes": [
                "usr-fw-multiline"
            ]
        },
        "parentName": "FW_AuditFallbackBox",
        "propertyName": "items",
        "index": 0
    }
]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
    {
        "operation": "merge",
        "path": [
            "attributes"
        ],
        "values": {
            "FW_TaskId": {
                "value": ""
            },
            "FW_Tab_overview": {
                "value": true
            },
            "FW_Tab_items": {
                "value": false
            },
            "FW_Tab_points": {
                "value": false
            },
            "FW_Tab_documents": {
                "value": false
            },
            "FW_Tab_validation": {
                "value": false
            },
            "FW_Tab_history": {
                "value": false
            },
            "FW_Tab_audit": {
                "value": false
            },
            "FW_RequestNumber": {
                "value": ""
            },
            "FW_RequestTitle": {
                "value": ""
            },
            "FW_ReviewId": {
                "value": ""
            },
            "FW_Requester": {
                "value": ""
            },
            "FW_Authority": {
                "value": ""
            },
            "FW_Project": {
                "value": ""
            },
            "FW_Contract": {
                "value": ""
            },
            "FW_RequestType": {
                "value": ""
            },
            "FW_Submitted": {
                "value": ""
            },
            "FW_Justification": {
                "value": ""
            },
            "FW_ItemsCount": {
                "value": ""
            },
            "FW_ReviewStage": {
                "value": ""
            },
            "FW_Reviewer": {
                "value": ""
            },
            "FW_QueueArrival": {
                "value": ""
            },
            "FW_DueOn": {
                "value": ""
            },
            "FW_SlaRemaining": {
                "value": ""
            },
            "FW_PreviousStage": {
                "value": ""
            },
            "FW_EstPoints": {
                "value": ""
            },
            "FW_AvailablePoints": {
                "value": ""
            },
            "FW_BalanceAfter": {
                "value": ""
            },
            "FW_ConsumedPoints": {
                "value": ""
            },
            "FW_RestoredPoints": {
                "value": ""
            },
            "FW_ContractNumber": {
                "value": ""
            },
            "FW_ContractReference": {
                "value": ""
            },
            "FW_ContractPeriod": {
                "value": ""
            },
            "FW_ItemsText": {
                "value": ""
            },
            "FW_FilesText": {
                "value": ""
            },
            "FW_ValidationText": {
                "value": ""
            },
            "FW_HistoryText": {
                "value": ""
            },
            "FW_AuditText": {
                "value": ""
            },
            "FW_ReviewStatus": {
                "value": ""
            },
            "FW_Comments": {
                "value": ""
            },
            "FW_SavingNotes": {
                "value": false
            },
            "FW_NotesFeedback": {
                "value": ""
            },
            "FW_InitialContractPoints": {
                "value": "Not verified"
            },
            "FW_Notice": {
                "value": ""
            },
            "FW_ShowError": {
                "value": false
            },
            "FW_ShowNotesFeedback": {
                "value": false
            },
            "FW_VMShow1": {
                "value": false
            },
            "FW_VM1_#": {
                "value": ""
            },
            "FW_VM1_Purpose": {
                "value": ""
            },
            "FW_VM1_Env": {
                "value": ""
            },
            "FW_VM1_OS": {
                "value": ""
            },
            "FW_VM1_CPU": {
                "value": ""
            },
            "FW_VM1_RAM": {
                "value": ""
            },
            "FW_VM1_Storage": {
                "value": ""
            },
            "FW_VM1_Network": {
                "value": ""
            },
            "FW_VM1_Qty": {
                "value": ""
            },
            "FW_VM1_Pts": {
                "value": ""
            },
            "FW_VMShow2": {
                "value": false
            },
            "FW_VM2_#": {
                "value": ""
            },
            "FW_VM2_Purpose": {
                "value": ""
            },
            "FW_VM2_Env": {
                "value": ""
            },
            "FW_VM2_OS": {
                "value": ""
            },
            "FW_VM2_CPU": {
                "value": ""
            },
            "FW_VM2_RAM": {
                "value": ""
            },
            "FW_VM2_Storage": {
                "value": ""
            },
            "FW_VM2_Network": {
                "value": ""
            },
            "FW_VM2_Qty": {
                "value": ""
            },
            "FW_VM2_Pts": {
                "value": ""
            },
            "FW_VMShow3": {
                "value": false
            },
            "FW_VM3_#": {
                "value": ""
            },
            "FW_VM3_Purpose": {
                "value": ""
            },
            "FW_VM3_Env": {
                "value": ""
            },
            "FW_VM3_OS": {
                "value": ""
            },
            "FW_VM3_CPU": {
                "value": ""
            },
            "FW_VM3_RAM": {
                "value": ""
            },
            "FW_VM3_Storage": {
                "value": ""
            },
            "FW_VM3_Network": {
                "value": ""
            },
            "FW_VM3_Qty": {
                "value": ""
            },
            "FW_VM3_Pts": {
                "value": ""
            },
            "FW_VMShow4": {
                "value": false
            },
            "FW_VM4_#": {
                "value": ""
            },
            "FW_VM4_Purpose": {
                "value": ""
            },
            "FW_VM4_Env": {
                "value": ""
            },
            "FW_VM4_OS": {
                "value": ""
            },
            "FW_VM4_CPU": {
                "value": ""
            },
            "FW_VM4_RAM": {
                "value": ""
            },
            "FW_VM4_Storage": {
                "value": ""
            },
            "FW_VM4_Network": {
                "value": ""
            },
            "FW_VM4_Qty": {
                "value": ""
            },
            "FW_VM4_Pts": {
                "value": ""
            },
            "FW_VMShow5": {
                "value": false
            },
            "FW_VM5_#": {
                "value": ""
            },
            "FW_VM5_Purpose": {
                "value": ""
            },
            "FW_VM5_Env": {
                "value": ""
            },
            "FW_VM5_OS": {
                "value": ""
            },
            "FW_VM5_CPU": {
                "value": ""
            },
            "FW_VM5_RAM": {
                "value": ""
            },
            "FW_VM5_Storage": {
                "value": ""
            },
            "FW_VM5_Network": {
                "value": ""
            },
            "FW_VM5_Qty": {
                "value": ""
            },
            "FW_VM5_Pts": {
                "value": ""
            },
            "FW_VMShow6": {
                "value": false
            },
            "FW_VM6_#": {
                "value": ""
            },
            "FW_VM6_Purpose": {
                "value": ""
            },
            "FW_VM6_Env": {
                "value": ""
            },
            "FW_VM6_OS": {
                "value": ""
            },
            "FW_VM6_CPU": {
                "value": ""
            },
            "FW_VM6_RAM": {
                "value": ""
            },
            "FW_VM6_Storage": {
                "value": ""
            },
            "FW_VM6_Network": {
                "value": ""
            },
            "FW_VM6_Qty": {
                "value": ""
            },
            "FW_VM6_Pts": {
                "value": ""
            },
            "FW_VMShow7": {
                "value": false
            },
            "FW_VM7_#": {
                "value": ""
            },
            "FW_VM7_Purpose": {
                "value": ""
            },
            "FW_VM7_Env": {
                "value": ""
            },
            "FW_VM7_OS": {
                "value": ""
            },
            "FW_VM7_CPU": {
                "value": ""
            },
            "FW_VM7_RAM": {
                "value": ""
            },
            "FW_VM7_Storage": {
                "value": ""
            },
            "FW_VM7_Network": {
                "value": ""
            },
            "FW_VM7_Qty": {
                "value": ""
            },
            "FW_VM7_Pts": {
                "value": ""
            },
            "FW_VMShow8": {
                "value": false
            },
            "FW_VM8_#": {
                "value": ""
            },
            "FW_VM8_Purpose": {
                "value": ""
            },
            "FW_VM8_Env": {
                "value": ""
            },
            "FW_VM8_OS": {
                "value": ""
            },
            "FW_VM8_CPU": {
                "value": ""
            },
            "FW_VM8_RAM": {
                "value": ""
            },
            "FW_VM8_Storage": {
                "value": ""
            },
            "FW_VM8_Network": {
                "value": ""
            },
            "FW_VM8_Qty": {
                "value": ""
            },
            "FW_VM8_Pts": {
                "value": ""
            },
            "FW_VMShow9": {
                "value": false
            },
            "FW_VM9_#": {
                "value": ""
            },
            "FW_VM9_Purpose": {
                "value": ""
            },
            "FW_VM9_Env": {
                "value": ""
            },
            "FW_VM9_OS": {
                "value": ""
            },
            "FW_VM9_CPU": {
                "value": ""
            },
            "FW_VM9_RAM": {
                "value": ""
            },
            "FW_VM9_Storage": {
                "value": ""
            },
            "FW_VM9_Network": {
                "value": ""
            },
            "FW_VM9_Qty": {
                "value": ""
            },
            "FW_VM9_Pts": {
                "value": ""
            },
            "FW_VMShow10": {
                "value": false
            },
            "FW_VM10_#": {
                "value": ""
            },
            "FW_VM10_Purpose": {
                "value": ""
            },
            "FW_VM10_Env": {
                "value": ""
            },
            "FW_VM10_OS": {
                "value": ""
            },
            "FW_VM10_CPU": {
                "value": ""
            },
            "FW_VM10_RAM": {
                "value": ""
            },
            "FW_VM10_Storage": {
                "value": ""
            },
            "FW_VM10_Network": {
                "value": ""
            },
            "FW_VM10_Qty": {
                "value": ""
            },
            "FW_VM10_Pts": {
                "value": ""
            },
            "FW_VMTableVisible": {
                "value": false
            },
            "FW_ItemsFallbackVisible": {
                "value": true
            },
            "FW_DocShow1": {
                "value": false
            },
            "FW_Doc1_Type": {
                "value": ""
            },
            "FW_Doc1_File": {
                "value": ""
            },
            "FW_Doc1_Date": {
                "value": ""
            },
            "FW_Doc1_State": {
                "value": ""
            },
            "FW_DocShow2": {
                "value": false
            },
            "FW_Doc2_Type": {
                "value": ""
            },
            "FW_Doc2_File": {
                "value": ""
            },
            "FW_Doc2_Date": {
                "value": ""
            },
            "FW_Doc2_State": {
                "value": ""
            },
            "FW_DocShow3": {
                "value": false
            },
            "FW_Doc3_Type": {
                "value": ""
            },
            "FW_Doc3_File": {
                "value": ""
            },
            "FW_Doc3_Date": {
                "value": ""
            },
            "FW_Doc3_State": {
                "value": ""
            },
            "FW_DocShow4": {
                "value": false
            },
            "FW_Doc4_Type": {
                "value": ""
            },
            "FW_Doc4_File": {
                "value": ""
            },
            "FW_Doc4_Date": {
                "value": ""
            },
            "FW_Doc4_State": {
                "value": ""
            },
            "FW_DocShow5": {
                "value": false
            },
            "FW_Doc5_Type": {
                "value": ""
            },
            "FW_Doc5_File": {
                "value": ""
            },
            "FW_Doc5_Date": {
                "value": ""
            },
            "FW_Doc5_State": {
                "value": ""
            },
            "FW_DocShow6": {
                "value": false
            },
            "FW_Doc6_Type": {
                "value": ""
            },
            "FW_Doc6_File": {
                "value": ""
            },
            "FW_Doc6_Date": {
                "value": ""
            },
            "FW_Doc6_State": {
                "value": ""
            },
            "FW_DocShow7": {
                "value": false
            },
            "FW_Doc7_Type": {
                "value": ""
            },
            "FW_Doc7_File": {
                "value": ""
            },
            "FW_Doc7_Date": {
                "value": ""
            },
            "FW_Doc7_State": {
                "value": ""
            },
            "FW_DocShow8": {
                "value": false
            },
            "FW_Doc8_Type": {
                "value": ""
            },
            "FW_Doc8_File": {
                "value": ""
            },
            "FW_Doc8_Date": {
                "value": ""
            },
            "FW_Doc8_State": {
                "value": ""
            },
            "FW_DocTableVisible": {
                "value": false
            },
            "FW_DocFallbackVisible": {
                "value": true
            },
            "FW_ValPassedText": {
                "value": ""
            },
            "FW_ValPassedVisible": {
                "value": false
            },
            "FW_ValUnverifiedText": {
                "value": ""
            },
            "FW_ValUnverifiedVisible": {
                "value": true
            },
            "FW_ValIssuesText": {
                "value": ""
            },
            "FW_ValIssuesVisible": {
                "value": false
            },
            "FW_ValidationDetailVisible": {
                "value": false
            },
            "FW_HistoryListVisible": {
                "value": false
            },
            "FW_HistoryFallbackVisible": {
                "value": true
            },
            "FW_HistoryShow1": {
                "value": false
            },
            "FW_HistoryDone1": {
                "value": true
            },
            "FW_HistoryPending1": {
                "value": false
            },
            "FW_HistoryTitle1": {
                "value": ""
            },
            "FW_HistoryMeta1": {
                "value": ""
            },
            "FW_HistoryOutcome1": {
                "value": ""
            },
            "FW_HistoryShow2": {
                "value": false
            },
            "FW_HistoryDone2": {
                "value": true
            },
            "FW_HistoryPending2": {
                "value": false
            },
            "FW_HistoryTitle2": {
                "value": ""
            },
            "FW_HistoryMeta2": {
                "value": ""
            },
            "FW_HistoryOutcome2": {
                "value": ""
            },
            "FW_HistoryShow3": {
                "value": false
            },
            "FW_HistoryDone3": {
                "value": true
            },
            "FW_HistoryPending3": {
                "value": false
            },
            "FW_HistoryTitle3": {
                "value": ""
            },
            "FW_HistoryMeta3": {
                "value": ""
            },
            "FW_HistoryOutcome3": {
                "value": ""
            },
            "FW_HistoryShow4": {
                "value": false
            },
            "FW_HistoryDone4": {
                "value": true
            },
            "FW_HistoryPending4": {
                "value": false
            },
            "FW_HistoryTitle4": {
                "value": ""
            },
            "FW_HistoryMeta4": {
                "value": ""
            },
            "FW_HistoryOutcome4": {
                "value": ""
            },
            "FW_HistoryShow5": {
                "value": false
            },
            "FW_HistoryDone5": {
                "value": true
            },
            "FW_HistoryPending5": {
                "value": false
            },
            "FW_HistoryTitle5": {
                "value": ""
            },
            "FW_HistoryMeta5": {
                "value": ""
            },
            "FW_HistoryOutcome5": {
                "value": ""
            },
            "FW_HistoryShow6": {
                "value": false
            },
            "FW_HistoryDone6": {
                "value": true
            },
            "FW_HistoryPending6": {
                "value": false
            },
            "FW_HistoryTitle6": {
                "value": ""
            },
            "FW_HistoryMeta6": {
                "value": ""
            },
            "FW_HistoryOutcome6": {
                "value": ""
            },
            "FW_HistoryShow7": {
                "value": false
            },
            "FW_HistoryDone7": {
                "value": true
            },
            "FW_HistoryPending7": {
                "value": false
            },
            "FW_HistoryTitle7": {
                "value": ""
            },
            "FW_HistoryMeta7": {
                "value": ""
            },
            "FW_HistoryOutcome7": {
                "value": ""
            },
            "FW_HistoryShow8": {
                "value": false
            },
            "FW_HistoryDone8": {
                "value": true
            },
            "FW_HistoryPending8": {
                "value": false
            },
            "FW_HistoryTitle8": {
                "value": ""
            },
            "FW_HistoryMeta8": {
                "value": ""
            },
            "FW_HistoryOutcome8": {
                "value": ""
            },
            "FW_HistoryShow9": {
                "value": false
            },
            "FW_HistoryDone9": {
                "value": true
            },
            "FW_HistoryPending9": {
                "value": false
            },
            "FW_HistoryTitle9": {
                "value": ""
            },
            "FW_HistoryMeta9": {
                "value": ""
            },
            "FW_HistoryOutcome9": {
                "value": ""
            },
            "FW_HistoryShow10": {
                "value": false
            },
            "FW_HistoryDone10": {
                "value": true
            },
            "FW_HistoryPending10": {
                "value": false
            },
            "FW_HistoryTitle10": {
                "value": ""
            },
            "FW_HistoryMeta10": {
                "value": ""
            },
            "FW_HistoryOutcome10": {
                "value": ""
            },
            "FW_HistoryShow11": {
                "value": false
            },
            "FW_HistoryDone11": {
                "value": true
            },
            "FW_HistoryPending11": {
                "value": false
            },
            "FW_HistoryTitle11": {
                "value": ""
            },
            "FW_HistoryMeta11": {
                "value": ""
            },
            "FW_HistoryOutcome11": {
                "value": ""
            },
            "FW_HistoryShow12": {
                "value": false
            },
            "FW_HistoryDone12": {
                "value": true
            },
            "FW_HistoryPending12": {
                "value": false
            },
            "FW_HistoryTitle12": {
                "value": ""
            },
            "FW_HistoryMeta12": {
                "value": ""
            },
            "FW_HistoryOutcome12": {
                "value": ""
            },
            "FW_AuditListVisible": {
                "value": false
            },
            "FW_AuditFallbackVisible": {
                "value": true
            },
            "FW_AuditShow1": {
                "value": false
            },
            "FW_AuditDone1": {
                "value": true
            },
            "FW_AuditPending1": {
                "value": false
            },
            "FW_AuditTitle1": {
                "value": ""
            },
            "FW_AuditMeta1": {
                "value": ""
            },
            "FW_AuditOutcome1": {
                "value": ""
            },
            "FW_AuditShow2": {
                "value": false
            },
            "FW_AuditDone2": {
                "value": true
            },
            "FW_AuditPending2": {
                "value": false
            },
            "FW_AuditTitle2": {
                "value": ""
            },
            "FW_AuditMeta2": {
                "value": ""
            },
            "FW_AuditOutcome2": {
                "value": ""
            },
            "FW_AuditShow3": {
                "value": false
            },
            "FW_AuditDone3": {
                "value": true
            },
            "FW_AuditPending3": {
                "value": false
            },
            "FW_AuditTitle3": {
                "value": ""
            },
            "FW_AuditMeta3": {
                "value": ""
            },
            "FW_AuditOutcome3": {
                "value": ""
            },
            "FW_AuditShow4": {
                "value": false
            },
            "FW_AuditDone4": {
                "value": true
            },
            "FW_AuditPending4": {
                "value": false
            },
            "FW_AuditTitle4": {
                "value": ""
            },
            "FW_AuditMeta4": {
                "value": ""
            },
            "FW_AuditOutcome4": {
                "value": ""
            },
            "FW_AuditShow5": {
                "value": false
            },
            "FW_AuditDone5": {
                "value": true
            },
            "FW_AuditPending5": {
                "value": false
            },
            "FW_AuditTitle5": {
                "value": ""
            },
            "FW_AuditMeta5": {
                "value": ""
            },
            "FW_AuditOutcome5": {
                "value": ""
            },
            "FW_AuditShow6": {
                "value": false
            },
            "FW_AuditDone6": {
                "value": true
            },
            "FW_AuditPending6": {
                "value": false
            },
            "FW_AuditTitle6": {
                "value": ""
            },
            "FW_AuditMeta6": {
                "value": ""
            },
            "FW_AuditOutcome6": {
                "value": ""
            },
            "FW_AuditShow7": {
                "value": false
            },
            "FW_AuditDone7": {
                "value": true
            },
            "FW_AuditPending7": {
                "value": false
            },
            "FW_AuditTitle7": {
                "value": ""
            },
            "FW_AuditMeta7": {
                "value": ""
            },
            "FW_AuditOutcome7": {
                "value": ""
            },
            "FW_AuditShow8": {
                "value": false
            },
            "FW_AuditDone8": {
                "value": true
            },
            "FW_AuditPending8": {
                "value": false
            },
            "FW_AuditTitle8": {
                "value": ""
            },
            "FW_AuditMeta8": {
                "value": ""
            },
            "FW_AuditOutcome8": {
                "value": ""
            },
            "FW_AuditShow9": {
                "value": false
            },
            "FW_AuditDone9": {
                "value": true
            },
            "FW_AuditPending9": {
                "value": false
            },
            "FW_AuditTitle9": {
                "value": ""
            },
            "FW_AuditMeta9": {
                "value": ""
            },
            "FW_AuditOutcome9": {
                "value": ""
            },
            "FW_AuditShow10": {
                "value": false
            },
            "FW_AuditDone10": {
                "value": true
            },
            "FW_AuditPending10": {
                "value": false
            },
            "FW_AuditTitle10": {
                "value": ""
            },
            "FW_AuditMeta10": {
                "value": ""
            },
            "FW_AuditOutcome10": {
                "value": ""
            },
            "FW_AuditShow11": {
                "value": false
            },
            "FW_AuditDone11": {
                "value": true
            },
            "FW_AuditPending11": {
                "value": false
            },
            "FW_AuditTitle11": {
                "value": ""
            },
            "FW_AuditMeta11": {
                "value": ""
            },
            "FW_AuditOutcome11": {
                "value": ""
            },
            "FW_AuditShow12": {
                "value": false
            },
            "FW_AuditDone12": {
                "value": true
            },
            "FW_AuditPending12": {
                "value": false
            },
            "FW_AuditTitle12": {
                "value": ""
            },
            "FW_AuditMeta12": {
                "value": ""
            },
            "FW_AuditOutcome12": {
                "value": ""
            },
            "FW_SLAOkayVisible": {
                "value": false
            },
            "FW_SLALateVisible": {
                "value": false
            },
            "FW_SLAMissingVisible": {
                "value": false
            },
            "FW_QueueCaption": {
                "value": ""
            },
            "FW_DocOpenVisible": {
                "value": false
            },
            "FW_DocEmptyMessage": {
                "value": "Checking saved documents…"
            },
            "FW_ContractValidFrom": {
                "value": ""
            },
            "FW_ContractValidTo": {
                "value": ""
            }
        }
    }
]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[
            {
                request: "crt.HandleViewModelInitRequest",
                handler: (request, next) => formRuntime.handle("crt.HandleViewModelInitRequest", request, next)
            },
            {
                request: "crt.HandleViewModelResumeRequest",
                handler: (request, next) => formRuntime.handle("crt.HandleViewModelResumeRequest", request, next)
            },
            {
                request: "usr.FWSaveNotes",
                handler: (request, next) => formRuntime.handle("usr.FWSaveNotes", request, next)
            },
            {
                request: "usr.FWRefresh",
                handler: (request, next) => formRuntime.handle("usr.FWRefresh", request, next)
            },
            {
                request: "usr.FWOpenApprovalsPanel",
                handler: (request, next) => formRuntime.handle("usr.FWOpenApprovalsPanel", request, next)
            },
            {
                request: "usr.FWOpenRequest",
                handler: (request, next) => formRuntime.handle("usr.FWOpenRequest", request, next)
            },
            {
                request: "usr.FWOpenChangeLog",
                handler: (request, next) => formRuntime.handle("usr.FWOpenChangeLog", request, next)
            },
            {
                request: "usr.FWDecision",
                handler: (request, next) => formRuntime.handle("usr.FWDecision", request, next)
            },
            {
                request: "crt.HandleViewModelDestroyRequest",
                handler: (request, next) => formRuntime.handle("crt.HandleViewModelDestroyRequest", request, next)
            }
        ]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{} /**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{} /**SCHEMA_VALIDATORS*/
	};
});