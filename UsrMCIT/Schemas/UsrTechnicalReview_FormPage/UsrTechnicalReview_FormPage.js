/*
 * TE-MCIT / Technical Review Form — Designer-friendly Native Freedom UI v2 — Figma polish.
 * Editable Tabs, Labels, Buttons, VM Items, Assessment & Data Model are native.
 * Custom runtime and CSS are in UsrTechnicalReviewFormRuntime, not in this page.
 * After Page Designer Save, verify the AMD dependency and 10 proxy handlers.
 */
define("UsrTechnicalReview_FormPage", /**SCHEMA_DEPS*/["UsrTechnicalReviewFormRuntime"]/**SCHEMA_DEPS*/,
    function/**SCHEMA_ARGS*/(formRuntime)/**SCHEMA_ARGS*/ {
    "use strict";
    return {
        viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/
[
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
        "name": "TW_Root",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "gap": "medium",
            "items": [],
            "classes": [
                "usr-tw-root"
            ],
            "alignItems": "stretch",
            "fitContent": true
        },
        "parentName": "MainContainer",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_Header",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "gap": "small",
            "items": [],
            "classes": [
                "usr-tw-header"
            ],
            "alignItems": "stretch",
            "fitContent": true
        },
        "parentName": "TW_Root",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_Breadcrumb",
        "values": {
            "type": "crt.Label",
            "caption": "TE Operations  ›  Technical Review  ›  Workspace",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-muted"
            ],
            "labelColor": "#7D8A9B",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Root",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_Main",
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
                "usr-tw-main"
            ]
        },
        "parentName": "TW_Root",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_Notice",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_Notice",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-error"
            ],
            "visible": "$TW_ShowError",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Root",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_RequestCode",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_RequestNumber",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-code"
            ],
            "labelColor": "#6A22C5",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Header",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_RequestTitle",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_RequestTitle",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-title"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Header",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HeaderDetails",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "gap": "small",
            "items": [],
            "classes": [
                "usr-tw-data"
            ],
            "alignItems": "stretch",
            "fitContent": true
        },
        "parentName": "TW_Header",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_PreviousStage",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_PreviousStage",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-stage"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "TW_Header",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_Left",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "gap": "small",
            "items": [],
            "classes": [
                "usr-tw-left"
            ],
            "alignItems": "stretch",
            "fitContent": true,
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_Main",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_Side",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "gap": "small",
            "items": [],
            "classes": [
                "usr-tw-right"
            ],
            "alignItems": "stretch",
            "fitContent": true,
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_Main",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HeaderTop",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "gap": "small",
            "justifyContent": "space-between",
            "alignItems": "start",
            "classes": [
                "usr-tw-header-top"
            ]
        },
        "parentName": "TW_Header",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HeadAuthority",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "wrap",
            "gap": "small",
            "items": [],
            "classes": [
                "usr-tw-field"
            ],
            "alignItems": "stretch",
            "fitContent": true
        },
        "parentName": "TW_HeaderDetails",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HeadProject",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "wrap",
            "gap": "small",
            "items": [],
            "classes": [
                "usr-tw-field"
            ],
            "alignItems": "stretch",
            "fitContent": true
        },
        "parentName": "TW_HeaderDetails",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HeadItems",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "wrap",
            "gap": "small",
            "items": [],
            "classes": [
                "usr-tw-field"
            ],
            "alignItems": "stretch",
            "fitContent": true
        },
        "parentName": "TW_HeaderDetails",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HeadReviewer",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "wrap",
            "gap": "small",
            "items": [],
            "classes": [
                "usr-tw-field"
            ],
            "alignItems": "stretch",
            "fitContent": true
        },
        "parentName": "TW_HeaderDetails",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_Tabs",
        "values": {
            "type": "crt.TabPanel",
            "items": [],
            "styleType": "default",
            "bodyBackgroundColor": "primary-contrast-500",
            "tabTitleColor": "#66758D",
            "selectedTabTitleColor": "#6722BD",
            "headerBackgroundColor": "auto",
            "underlineSelectedTabColor": "#6722BD",
            "selectedTabIndex": 0,
            "classes": [
                "usr-tw-tabs"
            ]
        },
        "parentName": "TW_Left",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_SideTitle",
        "values": {
            "type": "crt.Label",
            "caption": "Review Decision",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-right-header"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Side",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_CurrentStatus",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_ReviewStatus",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-review-status"
            ],
            "labelColor": "#66758A",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Side",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_InternalNotes",
        "values": {
            "type": "crt.Input",
            "label": "Internal Notes (TE only)",
            "labelPosition": "auto",
            "control": "$TW_Comments",
            "placeholder": "Internal comments not shared with requester...",
            "multiline": true,
            "classes": [
                "usr-tw-notes"
            ]
        },
        "parentName": "TW_Side",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_Approve",
        "values": {
            "type": "crt.Button",
            "caption": "Approve",
            "color": "accent",
            "displayType": "contained",
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.TWOpenApprovalsPanel",
                "params": {
                    "intendedDecision": "approve"
                }
            },
            "classes": [
                "usr-tw-approve"
            ]
        },
        "parentName": "TW_Side",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_Return",
        "values": {
            "type": "crt.Button",
            "caption": "Return for Correction",
            "disabled": false,
            "color": "default",
            "displayType": "outlined",
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.TWDecision",
                "params": {
                    "decision": "return"
                }
            },
            "classes": [
                "usr-tw-return"
            ]
        },
        "parentName": "TW_Side",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_Reject",
        "values": {
            "type": "crt.Button",
            "caption": "Reject Request",
            "disabled": false,
            "color": "default",
            "displayType": "outlined",
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.TWOpenApprovalsPanel",
                "params": {
                    "intendedDecision": "reject"
                }
            },
            "classes": [
                "usr-tw-reject"
            ]
        },
        "parentName": "TW_Side",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_SaveNotes",
        "values": {
            "type": "crt.Button",
            "caption": "Save Notes",
            "color": "default",
            "displayType": "contained",
            "size": "medium",
            "clicked": {
                "request": "usr.TWSaveNotes",
                "params": {}
            },
            "classes": [
                "usr-tw-save"
            ]
        },
        "parentName": "TW_Side",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_NotesFeedback",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_NotesFeedback",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-feedback"
            ],
            "visible": "$TW_ShowNotesFeedback",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Side",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_HeaderBadgeInfo",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "classes": [
                "usr-tw-header-badge-info"
            ]
        },
        "parentName": "TW_HeaderTop",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HeaderRight",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "end",
            "classes": [
                "usr-tw-header-right"
            ]
        },
        "parentName": "TW_HeaderTop",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_ReviewCode",
        "values": {
            "type": "crt.Label",
            "caption": "Technical Review",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-pill"
            ],
            "labelBackgroundColor": "#EEF5FF",
            "labelColor": "#135BD7",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HeaderBadgeInfo",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HeadAuthorityLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Authority",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldname"
            ],
            "labelColor": "#6D7B93",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HeadAuthority",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HeadAuthorityValue",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_Authority",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HeadAuthority",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HeadProjectLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Project",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldname"
            ],
            "labelColor": "#6D7B93",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HeadProject",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HeadProjectValue",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_Project",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HeadProject",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HeadItemsLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Items",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldname"
            ],
            "labelColor": "#6D7B93",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HeadItems",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HeadItemsValue",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_ItemsCount",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HeadItems",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HeadReviewerLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Assigned",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldname"
            ],
            "labelColor": "#6D7B93",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HeadReviewer",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HeadReviewerValue",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_Reviewer",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HeadReviewer",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_Panel_overview",
        "values": {
            "type": "crt.TabContainer",
            "items": [],
            "caption": "Request Overview",
            "iconPosition": "only-text",
            "visible": true,
            "classes": [
                "usr-tw-panel"
            ]
        },
        "parentName": "TW_Tabs",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_Panel_items",
        "values": {
            "type": "crt.TabContainer",
            "items": [],
            "caption": "VM Items",
            "iconPosition": "only-text",
            "visible": true,
            "classes": [
                "usr-tw-panel"
            ]
        },
        "parentName": "TW_Tabs",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_Panel_points",
        "values": {
            "type": "crt.TabContainer",
            "items": [],
            "caption": "Technical Assessment",
            "iconPosition": "only-text",
            "visible": true,
            "classes": [
                "usr-tw-panel"
            ]
        },
        "parentName": "TW_Tabs",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_Panel_documents",
        "values": {
            "type": "crt.TabContainer",
            "items": [],
            "caption": "Documents",
            "iconPosition": "only-text",
            "visible": true,
            "classes": [
                "usr-tw-panel"
            ]
        },
        "parentName": "TW_Tabs",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_Panel_validation",
        "values": {
            "type": "crt.TabContainer",
            "items": [],
            "caption": "Validation Findings",
            "iconPosition": "only-text",
            "visible": true,
            "classes": [
                "usr-tw-panel"
            ]
        },
        "parentName": "TW_Tabs",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_Panel_history",
        "values": {
            "type": "crt.TabContainer",
            "items": [],
            "caption": "Workflow History",
            "iconPosition": "only-text",
            "visible": true,
            "classes": [
                "usr-tw-panel"
            ]
        },
        "parentName": "TW_Tabs",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_Panel_audit",
        "values": {
            "type": "crt.TabContainer",
            "items": [],
            "caption": "Activity & Audit",
            "iconPosition": "only-text",
            "visible": true,
            "classes": [
                "usr-tw-panel"
            ]
        },
        "parentName": "TW_Tabs",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_TaskName",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TaskName",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-task-reference"
            ],
            "labelColor": "#7A879C",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HeaderBadgeInfo",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_SLAOkayTop",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_SlaRemaining",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_SLAOkayVisible",
            "classes": [
                "usr-tw-sla-top",
                "usr-tw-sla-positive"
            ],
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HeaderRight",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_SLALateTop",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_SlaRemaining",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_SLALateVisible",
            "classes": [
                "usr-tw-sla-top",
                "usr-tw-sla-negative"
            ],
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HeaderRight",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_SLAMissingTop",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_SlaRemaining",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_SLAMissingVisible",
            "classes": [
                "usr-tw-sla-top",
                "usr-tw-sla-neutral"
            ],
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HeaderRight",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_QueueArrivalTop",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_QueueCaption",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-queue-arrival"
            ],
            "labelColor": "#8A96A7",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HeaderRight",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_OverviewCards",
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
                "usr-tw-overview-grid"
            ]
        },
        "parentName": "TW_Panel_overview",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_DocOpen",
        "values": {
            "type": "crt.Button",
            "caption": "Open request documents",
            "color": "default",
            "displayType": "contained",
            "size": "small",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.TWOpenRequest",
                "params": {}
            },
            "visible": "$TW_DocOpenVisible"
        },
        "parentName": "TW_Panel_documents",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_OpenChangelog",
        "values": {
            "type": "crt.Button",
            "caption": "Open Creatio Change Log",
            "color": "default",
            "displayType": "contained",
            "size": "small",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.TWOpenChangeLog",
                "params": {}
            }
        },
        "parentName": "TW_Panel_audit",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_Overflow",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VMOverflow",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-muted"
            ],
            "labelColor": "#7D8A9B",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Panel_items",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Row_0",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-ta-row",
                "usr-tw-assessment-card"
            ],
            "alignItems": "stretch",
            "fitContent": true,
            "visible": "$TW_TAVisible_0"
        },
        "parentName": "TW_Panel_points",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Row_1",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-ta-row",
                "usr-tw-assessment-card"
            ],
            "alignItems": "stretch",
            "fitContent": true,
            "visible": "$TW_TAVisible_1"
        },
        "parentName": "TW_Panel_points",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Row_2",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-ta-row",
                "usr-tw-assessment-card"
            ],
            "alignItems": "stretch",
            "fitContent": true,
            "visible": "$TW_TAVisible_2"
        },
        "parentName": "TW_Panel_points",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_TA_Row_3",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-ta-row",
                "usr-tw-assessment-card"
            ],
            "alignItems": "stretch",
            "fitContent": true,
            "visible": "$TW_TAVisible_3"
        },
        "parentName": "TW_Panel_points",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_TA_Row_4",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-ta-row",
                "usr-tw-assessment-card"
            ],
            "alignItems": "stretch",
            "fitContent": true,
            "visible": "$TW_TAVisible_4"
        },
        "parentName": "TW_Panel_points",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_TA_Row_5",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-ta-row",
                "usr-tw-assessment-card"
            ],
            "alignItems": "stretch",
            "fitContent": true,
            "visible": "$TW_TAVisible_5"
        },
        "parentName": "TW_Panel_points",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_TA_Row_6",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-ta-row",
                "usr-tw-assessment-card"
            ],
            "alignItems": "stretch",
            "fitContent": true,
            "visible": "$TW_TAVisible_6"
        },
        "parentName": "TW_Panel_points",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_TA_Row_7",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-ta-row",
                "usr-tw-assessment-card"
            ],
            "alignItems": "stretch",
            "fitContent": true,
            "visible": "$TW_TAVisible_7"
        },
        "parentName": "TW_Panel_points",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_TA_Row_8",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-ta-row",
                "usr-tw-assessment-card"
            ],
            "alignItems": "stretch",
            "fitContent": true,
            "visible": "$TW_TAVisible_8"
        },
        "parentName": "TW_Panel_points",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_TA_Row_9",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-ta-row",
                "usr-tw-assessment-card"
            ],
            "alignItems": "stretch",
            "fitContent": true,
            "visible": "$TW_TAVisible_9"
        },
        "parentName": "TW_Panel_points",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_TA_Row_10",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-ta-row",
                "usr-tw-assessment-card"
            ],
            "alignItems": "stretch",
            "fitContent": true,
            "visible": "$TW_TAVisible_10"
        },
        "parentName": "TW_Panel_points",
        "propertyName": "items",
        "index": 10
    },
    {
        "operation": "insert",
        "name": "TW_TA_Row_11",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-ta-row",
                "usr-tw-assessment-card"
            ],
            "alignItems": "stretch",
            "fitContent": true,
            "visible": "$TW_TAVisible_11"
        },
        "parentName": "TW_Panel_points",
        "propertyName": "items",
        "index": 11
    },
    {
        "operation": "insert",
        "name": "TW_TA_Row_12",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-ta-row",
                "usr-tw-assessment-card"
            ],
            "alignItems": "stretch",
            "fitContent": true,
            "visible": "$TW_TAVisible_12"
        },
        "parentName": "TW_Panel_points",
        "propertyName": "items",
        "index": 12
    },
    {
        "operation": "insert",
        "name": "TW_TA_Row_13",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-ta-row",
                "usr-tw-assessment-card"
            ],
            "alignItems": "stretch",
            "fitContent": true,
            "visible": "$TW_TAVisible_13"
        },
        "parentName": "TW_Panel_points",
        "propertyName": "items",
        "index": 13
    },
    {
        "operation": "insert",
        "name": "TW_TA_Row_14",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-ta-row",
                "usr-tw-assessment-card"
            ],
            "alignItems": "stretch",
            "fitContent": true,
            "visible": "$TW_TAVisible_14"
        },
        "parentName": "TW_Panel_points",
        "propertyName": "items",
        "index": 14
    },
    {
        "operation": "insert",
        "name": "TW_TA_Overflow",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TAOverflow",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-muted"
            ],
            "labelColor": "#7D8A9B",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Panel_points",
        "propertyName": "items",
        "index": 15
    },
    {
        "operation": "insert",
        "name": "TW_VMTable",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "none",
            "classes": [
                "usr-tw-vm-table"
            ]
        },
        "parentName": "TW_Panel_items",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_ValTitle",
        "values": {
            "type": "crt.Label",
            "caption": "Automatic Validation Findings",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-panel-title"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Panel_validation",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_DocTable",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-doc-table"
            ],
            "visible": "$TW_DocTableVisible"
        },
        "parentName": "TW_Panel_documents",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_ValBanner_Passed",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-validation-banner",
                "usr-tw-validation-success"
            ],
            "caption": "$TW_ValPassedText",
            "visible": "$TW_ValPassedVisible",
            "labelBackgroundColor": "#E7F8EF",
            "labelColor": "#067647",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Panel_validation",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_ValBanner_Unverified",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-validation-banner",
                "usr-tw-validation-unknown"
            ],
            "caption": "$TW_ValUnverifiedText",
            "visible": "$TW_ValUnverifiedVisible",
            "labelBackgroundColor": "#F2F4F8",
            "labelColor": "#63748A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Panel_validation",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_ValBanner_Issues",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-validation-banner",
                "usr-tw-validation-danger"
            ],
            "caption": "$TW_ValIssuesText",
            "visible": "$TW_ValIssuesVisible",
            "labelBackgroundColor": "#FFF0EF",
            "labelColor": "#B42318",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Panel_validation",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryList",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-list"
            ],
            "visible": "$TW_HistoryListVisible"
        },
        "parentName": "TW_Panel_history",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditList",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-list"
            ],
            "visible": "$TW_AuditListVisible"
        },
        "parentName": "TW_Panel_audit",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_DocFallbackBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "visible": "$TW_DocFallbackVisible",
            "classes": [
                "usr-tw-fallback-box"
            ]
        },
        "parentName": "TW_Panel_documents",
        "propertyName": "items",
        "index": 99
    },
    {
        "operation": "insert",
        "name": "TW_HistoryFallbackBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "visible": "$TW_HistoryFallbackVisible",
            "classes": [
                "usr-tw-fallback-box"
            ]
        },
        "parentName": "TW_Panel_history",
        "propertyName": "items",
        "index": 99
    },
    {
        "operation": "insert",
        "name": "TW_AuditFallbackBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "visible": "$TW_AuditFallbackVisible",
            "classes": [
                "usr-tw-fallback-box"
            ]
        },
        "parentName": "TW_Panel_audit",
        "propertyName": "items",
        "index": 99
    },
    {
        "operation": "insert",
        "name": "TW_ValDetails",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_ValidationText",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_ValidationDetailVisible",
            "classes": [
                "usr-tw-validation-details"
            ],
            "labelColor": "#465770"
        },
        "parentName": "TW_Panel_validation",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_OverviewInfoCard",
        "values": {
            "type": "crt.FlexContainer",
            "items": [],
            "direction": "column",
            "wrap": "nowrap",
            "gap": "small",
            "classes": [
                "usr-tw-innercard"
            ],
            "fitContent": true,
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_OverviewCards",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_OverviewJustCard",
        "values": {
            "type": "crt.FlexContainer",
            "items": [],
            "direction": "column",
            "wrap": "nowrap",
            "gap": "small",
            "classes": [
                "usr-tw-innercard"
            ],
            "fitContent": true,
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_OverviewCards",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_Header",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-vm-row",
                "usr-tw-vm-heading",
                "usr-tw-vm-grid"
            ],
            "columns": [
                "32px",
                "minmax(158px,1.85fr)",
                "minmax(85px,.7fr)",
                "minmax(130px,1.05fr)",
                "55px",
                "70px",
                "80px",
                "minmax(115px,1fr)",
                "45px",
                "75px"
            ],
            "rows": "minmax(38px,max-content)"
        },
        "parentName": "TW_VMTable",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_VM_Row_0",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-vm-row",
                "usr-tw-vm-grid"
            ],
            "visible": "$TW_VMVisible_0",
            "columns": [
                "32px",
                "minmax(158px,1.85fr)",
                "minmax(85px,.7fr)",
                "minmax(130px,1.05fr)",
                "55px",
                "70px",
                "80px",
                "minmax(115px,1fr)",
                "45px",
                "75px"
            ],
            "rows": "minmax(38px,max-content)"
        },
        "parentName": "TW_VMTable",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_Row_1",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-vm-row",
                "usr-tw-vm-grid"
            ],
            "visible": "$TW_VMVisible_1",
            "columns": [
                "32px",
                "minmax(158px,1.85fr)",
                "minmax(85px,.7fr)",
                "minmax(130px,1.05fr)",
                "55px",
                "70px",
                "80px",
                "minmax(115px,1fr)",
                "45px",
                "75px"
            ],
            "rows": "minmax(38px,max-content)"
        },
        "parentName": "TW_VMTable",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_VM_Row_2",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-vm-row",
                "usr-tw-vm-grid"
            ],
            "visible": "$TW_VMVisible_2",
            "columns": [
                "32px",
                "minmax(158px,1.85fr)",
                "minmax(85px,.7fr)",
                "minmax(130px,1.05fr)",
                "55px",
                "70px",
                "80px",
                "minmax(115px,1fr)",
                "45px",
                "75px"
            ],
            "rows": "minmax(38px,max-content)"
        },
        "parentName": "TW_VMTable",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_VM_Row_3",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-vm-row",
                "usr-tw-vm-grid"
            ],
            "visible": "$TW_VMVisible_3",
            "columns": [
                "32px",
                "minmax(158px,1.85fr)",
                "minmax(85px,.7fr)",
                "minmax(130px,1.05fr)",
                "55px",
                "70px",
                "80px",
                "minmax(115px,1fr)",
                "45px",
                "75px"
            ],
            "rows": "minmax(38px,max-content)"
        },
        "parentName": "TW_VMTable",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_VM_Row_4",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-vm-row",
                "usr-tw-vm-grid"
            ],
            "visible": "$TW_VMVisible_4",
            "columns": [
                "32px",
                "minmax(158px,1.85fr)",
                "minmax(85px,.7fr)",
                "minmax(130px,1.05fr)",
                "55px",
                "70px",
                "80px",
                "minmax(115px,1fr)",
                "45px",
                "75px"
            ],
            "rows": "minmax(38px,max-content)"
        },
        "parentName": "TW_VMTable",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_VM_Row_5",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-vm-row",
                "usr-tw-vm-grid"
            ],
            "visible": "$TW_VMVisible_5",
            "columns": [
                "32px",
                "minmax(158px,1.85fr)",
                "minmax(85px,.7fr)",
                "minmax(130px,1.05fr)",
                "55px",
                "70px",
                "80px",
                "minmax(115px,1fr)",
                "45px",
                "75px"
            ],
            "rows": "minmax(38px,max-content)"
        },
        "parentName": "TW_VMTable",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_VM_Row_6",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-vm-row",
                "usr-tw-vm-grid"
            ],
            "visible": "$TW_VMVisible_6",
            "columns": [
                "32px",
                "minmax(158px,1.85fr)",
                "minmax(85px,.7fr)",
                "minmax(130px,1.05fr)",
                "55px",
                "70px",
                "80px",
                "minmax(115px,1fr)",
                "45px",
                "75px"
            ],
            "rows": "minmax(38px,max-content)"
        },
        "parentName": "TW_VMTable",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_VM_Row_7",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-vm-row",
                "usr-tw-vm-grid"
            ],
            "visible": "$TW_VMVisible_7",
            "columns": [
                "32px",
                "minmax(158px,1.85fr)",
                "minmax(85px,.7fr)",
                "minmax(130px,1.05fr)",
                "55px",
                "70px",
                "80px",
                "minmax(115px,1fr)",
                "45px",
                "75px"
            ],
            "rows": "minmax(38px,max-content)"
        },
        "parentName": "TW_VMTable",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_VM_Row_8",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-vm-row",
                "usr-tw-vm-grid"
            ],
            "visible": "$TW_VMVisible_8",
            "columns": [
                "32px",
                "minmax(158px,1.85fr)",
                "minmax(85px,.7fr)",
                "minmax(130px,1.05fr)",
                "55px",
                "70px",
                "80px",
                "minmax(115px,1fr)",
                "45px",
                "75px"
            ],
            "rows": "minmax(38px,max-content)"
        },
        "parentName": "TW_VMTable",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_VM_Row_9",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-vm-row",
                "usr-tw-vm-grid"
            ],
            "visible": "$TW_VMVisible_9",
            "columns": [
                "32px",
                "minmax(158px,1.85fr)",
                "minmax(85px,.7fr)",
                "minmax(130px,1.05fr)",
                "55px",
                "70px",
                "80px",
                "minmax(115px,1fr)",
                "45px",
                "75px"
            ],
            "rows": "minmax(38px,max-content)"
        },
        "parentName": "TW_VMTable",
        "propertyName": "items",
        "index": 10
    },
    {
        "operation": "insert",
        "name": "TW_VM_Row_10",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-vm-row",
                "usr-tw-vm-grid"
            ],
            "visible": "$TW_VMVisible_10",
            "columns": [
                "32px",
                "minmax(158px,1.85fr)",
                "minmax(85px,.7fr)",
                "minmax(130px,1.05fr)",
                "55px",
                "70px",
                "80px",
                "minmax(115px,1fr)",
                "45px",
                "75px"
            ],
            "rows": "minmax(38px,max-content)"
        },
        "parentName": "TW_VMTable",
        "propertyName": "items",
        "index": 11
    },
    {
        "operation": "insert",
        "name": "TW_VM_Row_11",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-vm-row",
                "usr-tw-vm-grid"
            ],
            "visible": "$TW_VMVisible_11",
            "columns": [
                "32px",
                "minmax(158px,1.85fr)",
                "minmax(85px,.7fr)",
                "minmax(130px,1.05fr)",
                "55px",
                "70px",
                "80px",
                "minmax(115px,1fr)",
                "45px",
                "75px"
            ],
            "rows": "minmax(38px,max-content)"
        },
        "parentName": "TW_VMTable",
        "propertyName": "items",
        "index": 12
    },
    {
        "operation": "insert",
        "name": "TW_VM_Row_12",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-vm-row",
                "usr-tw-vm-grid"
            ],
            "visible": "$TW_VMVisible_12",
            "columns": [
                "32px",
                "minmax(158px,1.85fr)",
                "minmax(85px,.7fr)",
                "minmax(130px,1.05fr)",
                "55px",
                "70px",
                "80px",
                "minmax(115px,1fr)",
                "45px",
                "75px"
            ],
            "rows": "minmax(38px,max-content)"
        },
        "parentName": "TW_VMTable",
        "propertyName": "items",
        "index": 13
    },
    {
        "operation": "insert",
        "name": "TW_VM_Row_13",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-vm-row",
                "usr-tw-vm-grid"
            ],
            "visible": "$TW_VMVisible_13",
            "columns": [
                "32px",
                "minmax(158px,1.85fr)",
                "minmax(85px,.7fr)",
                "minmax(130px,1.05fr)",
                "55px",
                "70px",
                "80px",
                "minmax(115px,1fr)",
                "45px",
                "75px"
            ],
            "rows": "minmax(38px,max-content)"
        },
        "parentName": "TW_VMTable",
        "propertyName": "items",
        "index": 14
    },
    {
        "operation": "insert",
        "name": "TW_VM_Row_14",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-vm-row",
                "usr-tw-vm-grid"
            ],
            "visible": "$TW_VMVisible_14",
            "columns": [
                "32px",
                "minmax(158px,1.85fr)",
                "minmax(85px,.7fr)",
                "minmax(130px,1.05fr)",
                "55px",
                "70px",
                "80px",
                "minmax(115px,1fr)",
                "45px",
                "75px"
            ],
            "rows": "minmax(38px,max-content)"
        },
        "parentName": "TW_VMTable",
        "propertyName": "items",
        "index": 15
    },
    {
        "operation": "insert",
        "name": "TW_TA_Details_0",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TADetail_0",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_TAExpanded_0",
            "classes": [
                "usr-tw-multiline",
                "usr-tw-ta-details"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "TW_TA_Row_0",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Details_1",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TADetail_1",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_TAExpanded_1",
            "classes": [
                "usr-tw-multiline",
                "usr-tw-ta-details"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "TW_TA_Row_1",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Details_2",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TADetail_2",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_TAExpanded_2",
            "classes": [
                "usr-tw-multiline",
                "usr-tw-ta-details"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "TW_TA_Row_2",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Details_3",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TADetail_3",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_TAExpanded_3",
            "classes": [
                "usr-tw-multiline",
                "usr-tw-ta-details"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "TW_TA_Row_3",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Details_4",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TADetail_4",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_TAExpanded_4",
            "classes": [
                "usr-tw-multiline",
                "usr-tw-ta-details"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "TW_TA_Row_4",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Details_5",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TADetail_5",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_TAExpanded_5",
            "classes": [
                "usr-tw-multiline",
                "usr-tw-ta-details"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "TW_TA_Row_5",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Details_6",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TADetail_6",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_TAExpanded_6",
            "classes": [
                "usr-tw-multiline",
                "usr-tw-ta-details"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "TW_TA_Row_6",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Details_7",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TADetail_7",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_TAExpanded_7",
            "classes": [
                "usr-tw-multiline",
                "usr-tw-ta-details"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "TW_TA_Row_7",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Details_8",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TADetail_8",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_TAExpanded_8",
            "classes": [
                "usr-tw-multiline",
                "usr-tw-ta-details"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "TW_TA_Row_8",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Details_9",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TADetail_9",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_TAExpanded_9",
            "classes": [
                "usr-tw-multiline",
                "usr-tw-ta-details"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "TW_TA_Row_9",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Details_10",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TADetail_10",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_TAExpanded_10",
            "classes": [
                "usr-tw-multiline",
                "usr-tw-ta-details"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "TW_TA_Row_10",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Details_11",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TADetail_11",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_TAExpanded_11",
            "classes": [
                "usr-tw-multiline",
                "usr-tw-ta-details"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "TW_TA_Row_11",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Details_12",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TADetail_12",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_TAExpanded_12",
            "classes": [
                "usr-tw-multiline",
                "usr-tw-ta-details"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "TW_TA_Row_12",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Details_13",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TADetail_13",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_TAExpanded_13",
            "classes": [
                "usr-tw-multiline",
                "usr-tw-ta-details"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "TW_TA_Row_13",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Details_14",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TADetail_14",
            "labelType": "body",
            "labelEllipsis": false,
            "visible": "$TW_TAExpanded_14",
            "classes": [
                "usr-tw-multiline",
                "usr-tw-ta-details"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "TW_TA_Row_14",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Summary_0",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "classes": [
                "usr-tw-ta-summary"
            ]
        },
        "parentName": "TW_TA_Row_0",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Summary_1",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "classes": [
                "usr-tw-ta-summary"
            ]
        },
        "parentName": "TW_TA_Row_1",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Summary_2",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "classes": [
                "usr-tw-ta-summary"
            ]
        },
        "parentName": "TW_TA_Row_2",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Summary_3",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "classes": [
                "usr-tw-ta-summary"
            ]
        },
        "parentName": "TW_TA_Row_3",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Summary_4",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "classes": [
                "usr-tw-ta-summary"
            ]
        },
        "parentName": "TW_TA_Row_4",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Summary_5",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "classes": [
                "usr-tw-ta-summary"
            ]
        },
        "parentName": "TW_TA_Row_5",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Summary_6",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "classes": [
                "usr-tw-ta-summary"
            ]
        },
        "parentName": "TW_TA_Row_6",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Summary_7",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "classes": [
                "usr-tw-ta-summary"
            ]
        },
        "parentName": "TW_TA_Row_7",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Summary_8",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "classes": [
                "usr-tw-ta-summary"
            ]
        },
        "parentName": "TW_TA_Row_8",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Summary_9",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "classes": [
                "usr-tw-ta-summary"
            ]
        },
        "parentName": "TW_TA_Row_9",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Summary_10",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "classes": [
                "usr-tw-ta-summary"
            ]
        },
        "parentName": "TW_TA_Row_10",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Summary_11",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "classes": [
                "usr-tw-ta-summary"
            ]
        },
        "parentName": "TW_TA_Row_11",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Summary_12",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "classes": [
                "usr-tw-ta-summary"
            ]
        },
        "parentName": "TW_TA_Row_12",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Summary_13",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "classes": [
                "usr-tw-ta-summary"
            ]
        },
        "parentName": "TW_TA_Row_13",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Summary_14",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "classes": [
                "usr-tw-ta-summary"
            ]
        },
        "parentName": "TW_TA_Row_14",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_DocHead",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-doc-head"
            ],
            "columns": [
                "minmax(110px,.8fr)",
                "minmax(210px,2fr)",
                "minmax(105px,.85fr)",
                "minmax(105px,.9fr)"
            ],
            "rows": "minmax(34px,max-content)"
        },
        "parentName": "TW_DocTable",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_DocRow1",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-doc-row"
            ],
            "visible": "$TW_DocShow1",
            "columns": [
                "minmax(110px,.8fr)",
                "minmax(210px,2fr)",
                "minmax(105px,.85fr)",
                "minmax(105px,.9fr)"
            ],
            "rows": "minmax(34px,max-content)"
        },
        "parentName": "TW_DocTable",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_DocRow2",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-doc-row"
            ],
            "visible": "$TW_DocShow2",
            "columns": [
                "minmax(110px,.8fr)",
                "minmax(210px,2fr)",
                "minmax(105px,.85fr)",
                "minmax(105px,.9fr)"
            ],
            "rows": "minmax(34px,max-content)"
        },
        "parentName": "TW_DocTable",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_DocRow3",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-doc-row"
            ],
            "visible": "$TW_DocShow3",
            "columns": [
                "minmax(110px,.8fr)",
                "minmax(210px,2fr)",
                "minmax(105px,.85fr)",
                "minmax(105px,.9fr)"
            ],
            "rows": "minmax(34px,max-content)"
        },
        "parentName": "TW_DocTable",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_DocRow4",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-doc-row"
            ],
            "visible": "$TW_DocShow4",
            "columns": [
                "minmax(110px,.8fr)",
                "minmax(210px,2fr)",
                "minmax(105px,.85fr)",
                "minmax(105px,.9fr)"
            ],
            "rows": "minmax(34px,max-content)"
        },
        "parentName": "TW_DocTable",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_DocRow5",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-doc-row"
            ],
            "visible": "$TW_DocShow5",
            "columns": [
                "minmax(110px,.8fr)",
                "minmax(210px,2fr)",
                "minmax(105px,.85fr)",
                "minmax(105px,.9fr)"
            ],
            "rows": "minmax(34px,max-content)"
        },
        "parentName": "TW_DocTable",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_DocRow6",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-doc-row"
            ],
            "visible": "$TW_DocShow6",
            "columns": [
                "minmax(110px,.8fr)",
                "minmax(210px,2fr)",
                "minmax(105px,.85fr)",
                "minmax(105px,.9fr)"
            ],
            "rows": "minmax(34px,max-content)"
        },
        "parentName": "TW_DocTable",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_DocRow7",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-doc-row"
            ],
            "visible": "$TW_DocShow7",
            "columns": [
                "minmax(110px,.8fr)",
                "minmax(210px,2fr)",
                "minmax(105px,.85fr)",
                "minmax(105px,.9fr)"
            ],
            "rows": "minmax(34px,max-content)"
        },
        "parentName": "TW_DocTable",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_DocRow8",
        "values": {
            "type": "crt.GridContainer",
            "items": [],
            "gap": {
                "columnGap": "small",
                "rowGap": "small"
            },
            "classes": [
                "usr-tw-doc-row"
            ],
            "visible": "$TW_DocShow8",
            "columns": [
                "minmax(110px,.8fr)",
                "minmax(210px,2fr)",
                "minmax(105px,.85fr)",
                "minmax(105px,.9fr)"
            ],
            "rows": "minmax(34px,max-content)"
        },
        "parentName": "TW_DocTable",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_HistoryCard1",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-history-card"
            ],
            "visible": "$TW_HistoryShow1"
        },
        "parentName": "TW_HistoryList",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryCard2",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-history-card"
            ],
            "visible": "$TW_HistoryShow2"
        },
        "parentName": "TW_HistoryList",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryCard3",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-history-card"
            ],
            "visible": "$TW_HistoryShow3"
        },
        "parentName": "TW_HistoryList",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryCard4",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-history-card"
            ],
            "visible": "$TW_HistoryShow4"
        },
        "parentName": "TW_HistoryList",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_HistoryCard5",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-history-card"
            ],
            "visible": "$TW_HistoryShow5"
        },
        "parentName": "TW_HistoryList",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_HistoryCard6",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-history-card"
            ],
            "visible": "$TW_HistoryShow6"
        },
        "parentName": "TW_HistoryList",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_HistoryCard7",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-history-card"
            ],
            "visible": "$TW_HistoryShow7"
        },
        "parentName": "TW_HistoryList",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_HistoryCard8",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-history-card"
            ],
            "visible": "$TW_HistoryShow8"
        },
        "parentName": "TW_HistoryList",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_HistoryCard9",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-history-card"
            ],
            "visible": "$TW_HistoryShow9"
        },
        "parentName": "TW_HistoryList",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_HistoryCard10",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-history-card"
            ],
            "visible": "$TW_HistoryShow10"
        },
        "parentName": "TW_HistoryList",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_HistoryCard11",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-history-card"
            ],
            "visible": "$TW_HistoryShow11"
        },
        "parentName": "TW_HistoryList",
        "propertyName": "items",
        "index": 10
    },
    {
        "operation": "insert",
        "name": "TW_HistoryCard12",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-history-card"
            ],
            "visible": "$TW_HistoryShow12"
        },
        "parentName": "TW_HistoryList",
        "propertyName": "items",
        "index": 11
    },
    {
        "operation": "insert",
        "name": "TW_AuditCard1",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-audit-card"
            ],
            "visible": "$TW_AuditShow1"
        },
        "parentName": "TW_AuditList",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditCard2",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-audit-card"
            ],
            "visible": "$TW_AuditShow2"
        },
        "parentName": "TW_AuditList",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditCard3",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-audit-card"
            ],
            "visible": "$TW_AuditShow3"
        },
        "parentName": "TW_AuditList",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditCard4",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-audit-card"
            ],
            "visible": "$TW_AuditShow4"
        },
        "parentName": "TW_AuditList",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_AuditCard5",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-audit-card"
            ],
            "visible": "$TW_AuditShow5"
        },
        "parentName": "TW_AuditList",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_AuditCard6",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-audit-card"
            ],
            "visible": "$TW_AuditShow6"
        },
        "parentName": "TW_AuditList",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_AuditCard7",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-audit-card"
            ],
            "visible": "$TW_AuditShow7"
        },
        "parentName": "TW_AuditList",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_AuditCard8",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-audit-card"
            ],
            "visible": "$TW_AuditShow8"
        },
        "parentName": "TW_AuditList",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_AuditCard9",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-audit-card"
            ],
            "visible": "$TW_AuditShow9"
        },
        "parentName": "TW_AuditList",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_AuditCard10",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-audit-card"
            ],
            "visible": "$TW_AuditShow10"
        },
        "parentName": "TW_AuditList",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_AuditCard11",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-audit-card"
            ],
            "visible": "$TW_AuditShow11"
        },
        "parentName": "TW_AuditList",
        "propertyName": "items",
        "index": 10
    },
    {
        "operation": "insert",
        "name": "TW_AuditCard12",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-card",
                "usr-tw-audit-card"
            ],
            "visible": "$TW_AuditShow12"
        },
        "parentName": "TW_AuditList",
        "propertyName": "items",
        "index": 11
    },
    {
        "operation": "insert",
        "name": "TW_DocFallbackMessage",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_DocEmptyMessage",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#78859B",
            "labelThickness": "default",
            "classes": [
                "usr-tw-empty-tab"
            ]
        },
        "parentName": "TW_DocFallbackBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryFallbackMessage",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_HistoryText",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#78859B",
            "labelThickness": "default",
            "classes": [
                "usr-tw-multiline"
            ]
        },
        "parentName": "TW_HistoryFallbackBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditFallbackMessage",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_AuditText",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#78859B",
            "labelThickness": "default",
            "classes": [
                "usr-tw-multiline"
            ]
        },
        "parentName": "TW_AuditFallbackBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_InfoTitle",
        "values": {
            "type": "crt.Label",
            "caption": "Request Information",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-panel-title"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_OverviewInfoCard",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_OverviewFields",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "gap": "small",
            "items": [],
            "classes": [
                "usr-tw-data"
            ],
            "alignItems": "stretch",
            "fitContent": true
        },
        "parentName": "TW_OverviewInfoCard",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_JustTitle",
        "values": {
            "type": "crt.Label",
            "caption": "Business Justification",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-panel-title"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_OverviewJustCard",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_Justification",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_Justification",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-multiline"
            ],
            "labelTextAlign": "start"
        },
        "parentName": "TW_OverviewJustCard",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_VM_H_Num",
        "values": {
            "type": "crt.Label",
            "caption": "#",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-num"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Header",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_VM_H_Purpose",
        "values": {
            "type": "crt.Label",
            "caption": "Purpose",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-purpose"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "labelThickness": "semibold"
        },
        "parentName": "TW_VM_Header",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_H_Env",
        "values": {
            "type": "crt.Label",
            "caption": "Env",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-env"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Header",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_VM_H_OS",
        "values": {
            "type": "crt.Label",
            "caption": "OS",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-os"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Header",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_VM_H_CPU",
        "values": {
            "type": "crt.Label",
            "caption": "vCPU",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-cpu"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Header",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_VM_H_RAM",
        "values": {
            "type": "crt.Label",
            "caption": "RAM",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-ram"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Header",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_VM_H_Storage",
        "values": {
            "type": "crt.Label",
            "caption": "Storage",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-storage"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Header",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_VM_H_Network",
        "values": {
            "type": "crt.Label",
            "caption": "Network",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-network"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Header",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_VM_H_Qty",
        "values": {
            "type": "crt.Label",
            "caption": "Qty",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-qty"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Header",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_VM_H_Points",
        "values": {
            "type": "crt.Label",
            "caption": "Est. Pts",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-points"
            ],
            "labelColor": "#6921C4",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Header",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_VM_0_Num_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_0_Num",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-num"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_0",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_VM_0_Purpose_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_0_Purpose",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-purpose"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "labelThickness": "semibold"
        },
        "parentName": "TW_VM_Row_0",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_0_Env_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_0_Env",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-env"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_0",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_VM_0_OS_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_0_OS",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-os"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_0",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_VM_0_CPU_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_0_CPU",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-cpu"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_0",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_VM_0_RAM_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_0_RAM",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-ram"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_0",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_VM_0_Storage_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_0_Storage",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-storage"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_0",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_VM_0_Network_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_0_Network",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-network"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_0",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_VM_0_Qty_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_0_Qty",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-qty"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_0",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_VM_0_Points_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_0_Points",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-points"
            ],
            "labelColor": "#6921C4",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_0",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_VM_1_Num_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_1_Num",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-num"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_1",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_VM_1_Purpose_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_1_Purpose",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-purpose"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "labelThickness": "semibold"
        },
        "parentName": "TW_VM_Row_1",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_1_Env_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_1_Env",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-env"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_1",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_VM_1_OS_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_1_OS",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-os"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_1",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_VM_1_CPU_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_1_CPU",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-cpu"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_1",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_VM_1_RAM_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_1_RAM",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-ram"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_1",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_VM_1_Storage_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_1_Storage",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-storage"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_1",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_VM_1_Network_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_1_Network",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-network"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_1",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_VM_1_Qty_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_1_Qty",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-qty"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_1",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_VM_1_Points_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_1_Points",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-points"
            ],
            "labelColor": "#6921C4",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_1",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_VM_2_Num_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_2_Num",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-num"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_2",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_VM_2_Purpose_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_2_Purpose",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-purpose"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "labelThickness": "semibold"
        },
        "parentName": "TW_VM_Row_2",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_2_Env_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_2_Env",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-env"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_2",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_VM_2_OS_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_2_OS",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-os"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_2",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_VM_2_CPU_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_2_CPU",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-cpu"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_2",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_VM_2_RAM_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_2_RAM",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-ram"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_2",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_VM_2_Storage_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_2_Storage",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-storage"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_2",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_VM_2_Network_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_2_Network",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-network"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_2",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_VM_2_Qty_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_2_Qty",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-qty"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_2",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_VM_2_Points_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_2_Points",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-points"
            ],
            "labelColor": "#6921C4",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_2",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_VM_3_Num_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_3_Num",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-num"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_3",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_VM_3_Purpose_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_3_Purpose",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-purpose"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "labelThickness": "semibold"
        },
        "parentName": "TW_VM_Row_3",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_3_Env_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_3_Env",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-env"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_3",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_VM_3_OS_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_3_OS",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-os"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_3",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_VM_3_CPU_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_3_CPU",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-cpu"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_3",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_VM_3_RAM_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_3_RAM",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-ram"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_3",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_VM_3_Storage_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_3_Storage",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-storage"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_3",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_VM_3_Network_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_3_Network",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-network"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_3",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_VM_3_Qty_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_3_Qty",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-qty"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_3",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_VM_3_Points_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_3_Points",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-points"
            ],
            "labelColor": "#6921C4",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_3",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_VM_4_Num_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_4_Num",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-num"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_4",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_VM_4_Purpose_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_4_Purpose",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-purpose"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "labelThickness": "semibold"
        },
        "parentName": "TW_VM_Row_4",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_4_Env_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_4_Env",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-env"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_4",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_VM_4_OS_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_4_OS",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-os"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_4",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_VM_4_CPU_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_4_CPU",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-cpu"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_4",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_VM_4_RAM_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_4_RAM",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-ram"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_4",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_VM_4_Storage_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_4_Storage",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-storage"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_4",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_VM_4_Network_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_4_Network",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-network"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_4",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_VM_4_Qty_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_4_Qty",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-qty"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_4",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_VM_4_Points_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_4_Points",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-points"
            ],
            "labelColor": "#6921C4",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_4",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_VM_5_Num_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_5_Num",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-num"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_5",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_VM_5_Purpose_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_5_Purpose",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-purpose"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "labelThickness": "semibold"
        },
        "parentName": "TW_VM_Row_5",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_5_Env_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_5_Env",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-env"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_5",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_VM_5_OS_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_5_OS",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-os"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_5",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_VM_5_CPU_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_5_CPU",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-cpu"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_5",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_VM_5_RAM_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_5_RAM",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-ram"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_5",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_VM_5_Storage_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_5_Storage",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-storage"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_5",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_VM_5_Network_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_5_Network",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-network"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_5",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_VM_5_Qty_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_5_Qty",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-qty"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_5",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_VM_5_Points_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_5_Points",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-points"
            ],
            "labelColor": "#6921C4",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_5",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_VM_6_Num_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_6_Num",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-num"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_6",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_VM_6_Purpose_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_6_Purpose",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-purpose"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "labelThickness": "semibold"
        },
        "parentName": "TW_VM_Row_6",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_6_Env_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_6_Env",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-env"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_6",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_VM_6_OS_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_6_OS",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-os"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_6",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_VM_6_CPU_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_6_CPU",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-cpu"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_6",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_VM_6_RAM_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_6_RAM",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-ram"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_6",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_VM_6_Storage_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_6_Storage",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-storage"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_6",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_VM_6_Network_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_6_Network",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-network"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_6",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_VM_6_Qty_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_6_Qty",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-qty"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_6",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_VM_6_Points_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_6_Points",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-points"
            ],
            "labelColor": "#6921C4",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_6",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_VM_7_Num_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_7_Num",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-num"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_7",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_VM_7_Purpose_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_7_Purpose",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-purpose"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "labelThickness": "semibold"
        },
        "parentName": "TW_VM_Row_7",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_7_Env_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_7_Env",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-env"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_7",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_VM_7_OS_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_7_OS",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-os"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_7",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_VM_7_CPU_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_7_CPU",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-cpu"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_7",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_VM_7_RAM_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_7_RAM",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-ram"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_7",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_VM_7_Storage_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_7_Storage",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-storage"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_7",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_VM_7_Network_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_7_Network",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-network"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_7",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_VM_7_Qty_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_7_Qty",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-qty"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_7",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_VM_7_Points_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_7_Points",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-points"
            ],
            "labelColor": "#6921C4",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_7",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_VM_8_Num_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_8_Num",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-num"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_8",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_VM_8_Purpose_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_8_Purpose",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-purpose"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "labelThickness": "semibold"
        },
        "parentName": "TW_VM_Row_8",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_8_Env_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_8_Env",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-env"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_8",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_VM_8_OS_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_8_OS",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-os"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_8",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_VM_8_CPU_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_8_CPU",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-cpu"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_8",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_VM_8_RAM_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_8_RAM",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-ram"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_8",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_VM_8_Storage_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_8_Storage",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-storage"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_8",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_VM_8_Network_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_8_Network",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-network"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_8",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_VM_8_Qty_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_8_Qty",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-qty"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_8",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_VM_8_Points_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_8_Points",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-points"
            ],
            "labelColor": "#6921C4",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_8",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_VM_9_Num_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_9_Num",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-num"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_9",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_VM_9_Purpose_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_9_Purpose",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-purpose"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "labelThickness": "semibold"
        },
        "parentName": "TW_VM_Row_9",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_9_Env_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_9_Env",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-env"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_9",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_VM_9_OS_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_9_OS",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-os"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_9",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_VM_9_CPU_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_9_CPU",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-cpu"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_9",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_VM_9_RAM_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_9_RAM",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-ram"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_9",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_VM_9_Storage_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_9_Storage",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-storage"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_9",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_VM_9_Network_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_9_Network",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-network"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_9",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_VM_9_Qty_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_9_Qty",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-qty"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_9",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_VM_9_Points_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_9_Points",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-points"
            ],
            "labelColor": "#6921C4",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_9",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_VM_10_Num_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_10_Num",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-num"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_10",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_VM_10_Purpose_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_10_Purpose",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-purpose"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "labelThickness": "semibold"
        },
        "parentName": "TW_VM_Row_10",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_10_Env_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_10_Env",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-env"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_10",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_VM_10_OS_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_10_OS",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-os"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_10",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_VM_10_CPU_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_10_CPU",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-cpu"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_10",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_VM_10_RAM_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_10_RAM",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-ram"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_10",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_VM_10_Storage_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_10_Storage",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-storage"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_10",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_VM_10_Network_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_10_Network",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-network"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_10",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_VM_10_Qty_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_10_Qty",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-qty"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_10",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_VM_10_Points_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_10_Points",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-points"
            ],
            "labelColor": "#6921C4",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_10",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_VM_11_Num_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_11_Num",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-num"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_11",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_VM_11_Purpose_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_11_Purpose",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-purpose"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "labelThickness": "semibold"
        },
        "parentName": "TW_VM_Row_11",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_11_Env_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_11_Env",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-env"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_11",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_VM_11_OS_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_11_OS",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-os"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_11",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_VM_11_CPU_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_11_CPU",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-cpu"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_11",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_VM_11_RAM_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_11_RAM",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-ram"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_11",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_VM_11_Storage_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_11_Storage",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-storage"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_11",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_VM_11_Network_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_11_Network",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-network"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_11",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_VM_11_Qty_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_11_Qty",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-qty"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_11",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_VM_11_Points_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_11_Points",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-points"
            ],
            "labelColor": "#6921C4",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_11",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_VM_12_Num_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_12_Num",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-num"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_12",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_VM_12_Purpose_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_12_Purpose",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-purpose"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "labelThickness": "semibold"
        },
        "parentName": "TW_VM_Row_12",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_12_Env_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_12_Env",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-env"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_12",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_VM_12_OS_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_12_OS",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-os"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_12",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_VM_12_CPU_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_12_CPU",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-cpu"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_12",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_VM_12_RAM_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_12_RAM",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-ram"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_12",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_VM_12_Storage_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_12_Storage",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-storage"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_12",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_VM_12_Network_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_12_Network",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-network"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_12",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_VM_12_Qty_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_12_Qty",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-qty"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_12",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_VM_12_Points_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_12_Points",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-points"
            ],
            "labelColor": "#6921C4",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_12",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_VM_13_Num_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_13_Num",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-num"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_13",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_VM_13_Purpose_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_13_Purpose",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-purpose"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "labelThickness": "semibold"
        },
        "parentName": "TW_VM_Row_13",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_13_Env_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_13_Env",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-env"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_13",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_VM_13_OS_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_13_OS",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-os"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_13",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_VM_13_CPU_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_13_CPU",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-cpu"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_13",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_VM_13_RAM_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_13_RAM",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-ram"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_13",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_VM_13_Storage_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_13_Storage",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-storage"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_13",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_VM_13_Network_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_13_Network",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-network"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_13",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_VM_13_Qty_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_13_Qty",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-qty"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_13",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_VM_13_Points_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_13_Points",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-points"
            ],
            "labelColor": "#6921C4",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_13",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_VM_14_Num_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_14_Num",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-num"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_14",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_VM_14_Purpose_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_14_Purpose",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-purpose"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            },
            "labelThickness": "semibold"
        },
        "parentName": "TW_VM_Row_14",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_VM_14_Env_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_14_Env",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-env"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_14",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_VM_14_OS_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_14_OS",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-os"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_14",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_VM_14_CPU_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_14_CPU",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-cpu"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 5,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_14",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_VM_14_RAM_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_14_RAM",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-ram"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 6,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_14",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_VM_14_Storage_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_14_Storage",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-storage"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 7,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_14",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TW_VM_14_Network_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_14_Network",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-network"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 8,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_14",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "TW_VM_14_Qty_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_14_Qty",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-qty"
            ],
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 9,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_14",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "TW_VM_14_Points_label",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_VM_14_Points",
            "labelType": "body",
            "labelEllipsis": true,
            "classes": [
                "usr-tw-vm-cell",
                "usr-tw-vm-col-points"
            ],
            "labelColor": "#6921C4",
            "labelThickness": "semibold",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 10,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_VM_Row_14",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "TW_TA_Badge_0",
        "values": {
            "type": "crt.Label",
            "caption": "1",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-badge"
            ],
            "labelColor": "#FFFFFF",
            "labelThickness": "semibold",
            "labelTextAlign": "center"
        },
        "parentName": "TW_TA_Summary_0",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Text_0",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "none",
            "classes": [
                "usr-tw-ta-text"
            ]
        },
        "parentName": "TW_TA_Summary_0",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Badge_1",
        "values": {
            "type": "crt.Label",
            "caption": "2",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-badge"
            ],
            "labelColor": "#FFFFFF",
            "labelThickness": "semibold",
            "labelTextAlign": "center"
        },
        "parentName": "TW_TA_Summary_1",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Text_1",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "none",
            "classes": [
                "usr-tw-ta-text"
            ]
        },
        "parentName": "TW_TA_Summary_1",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Badge_2",
        "values": {
            "type": "crt.Label",
            "caption": "3",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-badge"
            ],
            "labelColor": "#FFFFFF",
            "labelThickness": "semibold",
            "labelTextAlign": "center"
        },
        "parentName": "TW_TA_Summary_2",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Text_2",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "none",
            "classes": [
                "usr-tw-ta-text"
            ]
        },
        "parentName": "TW_TA_Summary_2",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Badge_3",
        "values": {
            "type": "crt.Label",
            "caption": "4",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-badge"
            ],
            "labelColor": "#FFFFFF",
            "labelThickness": "semibold",
            "labelTextAlign": "center"
        },
        "parentName": "TW_TA_Summary_3",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Text_3",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "none",
            "classes": [
                "usr-tw-ta-text"
            ]
        },
        "parentName": "TW_TA_Summary_3",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Badge_4",
        "values": {
            "type": "crt.Label",
            "caption": "5",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-badge"
            ],
            "labelColor": "#FFFFFF",
            "labelThickness": "semibold",
            "labelTextAlign": "center"
        },
        "parentName": "TW_TA_Summary_4",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Text_4",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "none",
            "classes": [
                "usr-tw-ta-text"
            ]
        },
        "parentName": "TW_TA_Summary_4",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Badge_5",
        "values": {
            "type": "crt.Label",
            "caption": "6",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-badge"
            ],
            "labelColor": "#FFFFFF",
            "labelThickness": "semibold",
            "labelTextAlign": "center"
        },
        "parentName": "TW_TA_Summary_5",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Text_5",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "none",
            "classes": [
                "usr-tw-ta-text"
            ]
        },
        "parentName": "TW_TA_Summary_5",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Badge_6",
        "values": {
            "type": "crt.Label",
            "caption": "7",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-badge"
            ],
            "labelColor": "#FFFFFF",
            "labelThickness": "semibold",
            "labelTextAlign": "center"
        },
        "parentName": "TW_TA_Summary_6",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Text_6",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "none",
            "classes": [
                "usr-tw-ta-text"
            ]
        },
        "parentName": "TW_TA_Summary_6",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Badge_7",
        "values": {
            "type": "crt.Label",
            "caption": "8",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-badge"
            ],
            "labelColor": "#FFFFFF",
            "labelThickness": "semibold",
            "labelTextAlign": "center"
        },
        "parentName": "TW_TA_Summary_7",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Text_7",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "none",
            "classes": [
                "usr-tw-ta-text"
            ]
        },
        "parentName": "TW_TA_Summary_7",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Badge_8",
        "values": {
            "type": "crt.Label",
            "caption": "9",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-badge"
            ],
            "labelColor": "#FFFFFF",
            "labelThickness": "semibold",
            "labelTextAlign": "center"
        },
        "parentName": "TW_TA_Summary_8",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Text_8",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "none",
            "classes": [
                "usr-tw-ta-text"
            ]
        },
        "parentName": "TW_TA_Summary_8",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Badge_9",
        "values": {
            "type": "crt.Label",
            "caption": "10",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-badge"
            ],
            "labelColor": "#FFFFFF",
            "labelThickness": "semibold",
            "labelTextAlign": "center"
        },
        "parentName": "TW_TA_Summary_9",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Text_9",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "none",
            "classes": [
                "usr-tw-ta-text"
            ]
        },
        "parentName": "TW_TA_Summary_9",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Badge_10",
        "values": {
            "type": "crt.Label",
            "caption": "11",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-badge"
            ],
            "labelColor": "#FFFFFF",
            "labelThickness": "semibold",
            "labelTextAlign": "center"
        },
        "parentName": "TW_TA_Summary_10",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Text_10",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "none",
            "classes": [
                "usr-tw-ta-text"
            ]
        },
        "parentName": "TW_TA_Summary_10",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Badge_11",
        "values": {
            "type": "crt.Label",
            "caption": "12",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-badge"
            ],
            "labelColor": "#FFFFFF",
            "labelThickness": "semibold",
            "labelTextAlign": "center"
        },
        "parentName": "TW_TA_Summary_11",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Text_11",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "none",
            "classes": [
                "usr-tw-ta-text"
            ]
        },
        "parentName": "TW_TA_Summary_11",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Badge_12",
        "values": {
            "type": "crt.Label",
            "caption": "13",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-badge"
            ],
            "labelColor": "#FFFFFF",
            "labelThickness": "semibold",
            "labelTextAlign": "center"
        },
        "parentName": "TW_TA_Summary_12",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Text_12",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "none",
            "classes": [
                "usr-tw-ta-text"
            ]
        },
        "parentName": "TW_TA_Summary_12",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Badge_13",
        "values": {
            "type": "crt.Label",
            "caption": "14",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-badge"
            ],
            "labelColor": "#FFFFFF",
            "labelThickness": "semibold",
            "labelTextAlign": "center"
        },
        "parentName": "TW_TA_Summary_13",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Text_13",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "none",
            "classes": [
                "usr-tw-ta-text"
            ]
        },
        "parentName": "TW_TA_Summary_13",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Badge_14",
        "values": {
            "type": "crt.Label",
            "caption": "15",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-badge"
            ],
            "labelColor": "#FFFFFF",
            "labelThickness": "semibold",
            "labelTextAlign": "center"
        },
        "parentName": "TW_TA_Summary_14",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Text_14",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "none",
            "classes": [
                "usr-tw-ta-text"
            ]
        },
        "parentName": "TW_TA_Summary_14",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_DocHead0",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-hcell"
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
        "parentName": "TW_DocHead",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_DocHead1",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-hcell"
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
        "parentName": "TW_DocHead",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_DocHead2",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-hcell"
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
        "parentName": "TW_DocHead",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_DocHead3",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-hcell"
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
        "parentName": "TW_DocHead",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_DocRow1_Type",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc1_Type",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow1",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_DocRow1_File",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-filename"
            ],
            "caption": "$TW_Doc1_File",
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
        "parentName": "TW_DocRow1",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_DocRow1_Date",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc1_Date",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow1",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_DocRow1_State",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc1_State",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow1",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_DocRow2_Type",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc2_Type",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow2",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_DocRow2_File",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-filename"
            ],
            "caption": "$TW_Doc2_File",
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
        "parentName": "TW_DocRow2",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_DocRow2_Date",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc2_Date",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow2",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_DocRow2_State",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc2_State",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow2",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_DocRow3_Type",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc3_Type",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow3",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_DocRow3_File",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-filename"
            ],
            "caption": "$TW_Doc3_File",
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
        "parentName": "TW_DocRow3",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_DocRow3_Date",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc3_Date",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow3",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_DocRow3_State",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc3_State",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow3",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_DocRow4_Type",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc4_Type",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow4",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_DocRow4_File",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-filename"
            ],
            "caption": "$TW_Doc4_File",
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
        "parentName": "TW_DocRow4",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_DocRow4_Date",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc4_Date",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow4",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_DocRow4_State",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc4_State",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow4",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_DocRow5_Type",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc5_Type",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow5",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_DocRow5_File",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-filename"
            ],
            "caption": "$TW_Doc5_File",
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
        "parentName": "TW_DocRow5",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_DocRow5_Date",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc5_Date",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow5",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_DocRow5_State",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc5_State",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow5",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_DocRow6_Type",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc6_Type",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow6",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_DocRow6_File",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-filename"
            ],
            "caption": "$TW_Doc6_File",
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
        "parentName": "TW_DocRow6",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_DocRow6_Date",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc6_Date",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow6",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_DocRow6_State",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc6_State",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow6",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_DocRow7_Type",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc7_Type",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow7",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_DocRow7_File",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-filename"
            ],
            "caption": "$TW_Doc7_File",
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
        "parentName": "TW_DocRow7",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_DocRow7_Date",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc7_Date",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow7",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_DocRow7_State",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc7_State",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow7",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_DocRow8_Type",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc8_Type",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow8",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_DocRow8_File",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-filename"
            ],
            "caption": "$TW_Doc8_File",
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
        "parentName": "TW_DocRow8",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_DocRow8_Date",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc8_Date",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 3,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow8",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_DocRow8_State",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-doc-cell"
            ],
            "caption": "$TW_Doc8_State",
            "labelTextAlign": "start",
            "layoutConfig": {
                "column": 4,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "TW_DocRow8",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconDone1",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_HistoryDone1",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard1",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconPending1",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_HistoryPending1",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard1",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryDetails1",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_HistoryCard1",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconDone2",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_HistoryDone2",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard2",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconPending2",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_HistoryPending2",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard2",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryDetails2",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_HistoryCard2",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconDone3",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_HistoryDone3",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard3",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconPending3",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_HistoryPending3",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard3",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryDetails3",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_HistoryCard3",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconDone4",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_HistoryDone4",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard4",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconPending4",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_HistoryPending4",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard4",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryDetails4",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_HistoryCard4",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconDone5",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_HistoryDone5",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard5",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconPending5",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_HistoryPending5",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard5",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryDetails5",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_HistoryCard5",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconDone6",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_HistoryDone6",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard6",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconPending6",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_HistoryPending6",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard6",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryDetails6",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_HistoryCard6",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconDone7",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_HistoryDone7",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard7",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconPending7",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_HistoryPending7",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard7",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryDetails7",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_HistoryCard7",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconDone8",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_HistoryDone8",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard8",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconPending8",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_HistoryPending8",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard8",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryDetails8",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_HistoryCard8",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconDone9",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_HistoryDone9",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard9",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconPending9",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_HistoryPending9",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard9",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryDetails9",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_HistoryCard9",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconDone10",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_HistoryDone10",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard10",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconPending10",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_HistoryPending10",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard10",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryDetails10",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_HistoryCard10",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconDone11",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_HistoryDone11",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard11",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconPending11",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_HistoryPending11",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard11",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryDetails11",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_HistoryCard11",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconDone12",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_HistoryDone12",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard12",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryIconPending12",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_HistoryPending12",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryCard12",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryDetails12",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_HistoryCard12",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconDone1",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_AuditDone1",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard1",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconPending1",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_AuditPending1",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard1",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditDetails1",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_AuditCard1",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconDone2",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_AuditDone2",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard2",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconPending2",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_AuditPending2",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard2",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditDetails2",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_AuditCard2",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconDone3",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_AuditDone3",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard3",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconPending3",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_AuditPending3",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard3",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditDetails3",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_AuditCard3",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconDone4",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_AuditDone4",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard4",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconPending4",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_AuditPending4",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard4",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditDetails4",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_AuditCard4",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconDone5",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_AuditDone5",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard5",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconPending5",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_AuditPending5",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard5",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditDetails5",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_AuditCard5",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconDone6",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_AuditDone6",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard6",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconPending6",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_AuditPending6",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard6",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditDetails6",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_AuditCard6",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconDone7",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_AuditDone7",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard7",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconPending7",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_AuditPending7",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard7",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditDetails7",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_AuditCard7",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconDone8",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_AuditDone8",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard8",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconPending8",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_AuditPending8",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard8",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditDetails8",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_AuditCard8",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconDone9",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_AuditDone9",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard9",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconPending9",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_AuditPending9",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard9",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditDetails9",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_AuditCard9",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconDone10",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_AuditDone10",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard10",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconPending10",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_AuditPending10",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard10",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditDetails10",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_AuditCard10",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconDone11",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_AuditDone11",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard11",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconPending11",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_AuditPending11",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard11",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditDetails11",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_AuditCard11",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconDone12",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-done"
            ],
            "caption": "✓",
            "visible": "$TW_AuditDone12",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard12",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditIconPending12",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-icon",
                "usr-tw-timeline-icon-pending"
            ],
            "caption": "●",
            "visible": "$TW_AuditPending12",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditCard12",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditDetails12",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "classes": [
                "usr-tw-timeline-details"
            ]
        },
        "parentName": "TW_AuditCard12",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_Info_RequestType",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "gap": "small",
            "items": [],
            "classes": [
                "usr-tw-field"
            ],
            "alignItems": "center",
            "fitContent": true,
            "justifyContent": "space-between"
        },
        "parentName": "TW_OverviewFields",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_Info_Authority",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "gap": "small",
            "items": [],
            "classes": [
                "usr-tw-field"
            ],
            "alignItems": "center",
            "fitContent": true,
            "justifyContent": "space-between"
        },
        "parentName": "TW_OverviewFields",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_Info_Project",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "gap": "small",
            "items": [],
            "classes": [
                "usr-tw-field"
            ],
            "alignItems": "center",
            "fitContent": true,
            "justifyContent": "space-between"
        },
        "parentName": "TW_OverviewFields",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_Info_Requester",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "wrap",
            "gap": "small",
            "items": [],
            "classes": [
                "usr-tw-field"
            ],
            "alignItems": "stretch",
            "fitContent": true
        },
        "parentName": "TW_OverviewFields",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TW_Info_Submitted",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "gap": "small",
            "items": [],
            "classes": [
                "usr-tw-field"
            ],
            "alignItems": "center",
            "fitContent": true,
            "justifyContent": "space-between"
        },
        "parentName": "TW_OverviewFields",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TW_Info_EstPoints",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "gap": "small",
            "items": [],
            "classes": [
                "usr-tw-field"
            ],
            "alignItems": "center",
            "fitContent": true,
            "justifyContent": "space-between"
        },
        "parentName": "TW_OverviewFields",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TW_TA_Toggle_0",
        "values": {
            "type": "crt.Button",
            "caption": "$TW_TAHead_0",
            "displayType": "outlined",
            "color": "default",
            "size": "medium",
            "clicked": {
                "request": "usr.TWToggleAssessment",
                "params": {
                    "index": 0
                }
            },
            "classes": [
                "usr-tw-ta-toggle"
            ]
        },
        "parentName": "TW_TA_Text_0",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Toggle_1",
        "values": {
            "type": "crt.Button",
            "caption": "$TW_TAHead_1",
            "displayType": "outlined",
            "color": "default",
            "size": "medium",
            "clicked": {
                "request": "usr.TWToggleAssessment",
                "params": {
                    "index": 1
                }
            },
            "classes": [
                "usr-tw-ta-toggle"
            ]
        },
        "parentName": "TW_TA_Text_1",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Toggle_2",
        "values": {
            "type": "crt.Button",
            "caption": "$TW_TAHead_2",
            "displayType": "outlined",
            "color": "default",
            "size": "medium",
            "clicked": {
                "request": "usr.TWToggleAssessment",
                "params": {
                    "index": 2
                }
            },
            "classes": [
                "usr-tw-ta-toggle"
            ]
        },
        "parentName": "TW_TA_Text_2",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Toggle_3",
        "values": {
            "type": "crt.Button",
            "caption": "$TW_TAHead_3",
            "displayType": "outlined",
            "color": "default",
            "size": "medium",
            "clicked": {
                "request": "usr.TWToggleAssessment",
                "params": {
                    "index": 3
                }
            },
            "classes": [
                "usr-tw-ta-toggle"
            ]
        },
        "parentName": "TW_TA_Text_3",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Toggle_4",
        "values": {
            "type": "crt.Button",
            "caption": "$TW_TAHead_4",
            "displayType": "outlined",
            "color": "default",
            "size": "medium",
            "clicked": {
                "request": "usr.TWToggleAssessment",
                "params": {
                    "index": 4
                }
            },
            "classes": [
                "usr-tw-ta-toggle"
            ]
        },
        "parentName": "TW_TA_Text_4",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Toggle_5",
        "values": {
            "type": "crt.Button",
            "caption": "$TW_TAHead_5",
            "displayType": "outlined",
            "color": "default",
            "size": "medium",
            "clicked": {
                "request": "usr.TWToggleAssessment",
                "params": {
                    "index": 5
                }
            },
            "classes": [
                "usr-tw-ta-toggle"
            ]
        },
        "parentName": "TW_TA_Text_5",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Toggle_6",
        "values": {
            "type": "crt.Button",
            "caption": "$TW_TAHead_6",
            "displayType": "outlined",
            "color": "default",
            "size": "medium",
            "clicked": {
                "request": "usr.TWToggleAssessment",
                "params": {
                    "index": 6
                }
            },
            "classes": [
                "usr-tw-ta-toggle"
            ]
        },
        "parentName": "TW_TA_Text_6",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Toggle_7",
        "values": {
            "type": "crt.Button",
            "caption": "$TW_TAHead_7",
            "displayType": "outlined",
            "color": "default",
            "size": "medium",
            "clicked": {
                "request": "usr.TWToggleAssessment",
                "params": {
                    "index": 7
                }
            },
            "classes": [
                "usr-tw-ta-toggle"
            ]
        },
        "parentName": "TW_TA_Text_7",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Toggle_8",
        "values": {
            "type": "crt.Button",
            "caption": "$TW_TAHead_8",
            "displayType": "outlined",
            "color": "default",
            "size": "medium",
            "clicked": {
                "request": "usr.TWToggleAssessment",
                "params": {
                    "index": 8
                }
            },
            "classes": [
                "usr-tw-ta-toggle"
            ]
        },
        "parentName": "TW_TA_Text_8",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Toggle_9",
        "values": {
            "type": "crt.Button",
            "caption": "$TW_TAHead_9",
            "displayType": "outlined",
            "color": "default",
            "size": "medium",
            "clicked": {
                "request": "usr.TWToggleAssessment",
                "params": {
                    "index": 9
                }
            },
            "classes": [
                "usr-tw-ta-toggle"
            ]
        },
        "parentName": "TW_TA_Text_9",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Toggle_10",
        "values": {
            "type": "crt.Button",
            "caption": "$TW_TAHead_10",
            "displayType": "outlined",
            "color": "default",
            "size": "medium",
            "clicked": {
                "request": "usr.TWToggleAssessment",
                "params": {
                    "index": 10
                }
            },
            "classes": [
                "usr-tw-ta-toggle"
            ]
        },
        "parentName": "TW_TA_Text_10",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Toggle_11",
        "values": {
            "type": "crt.Button",
            "caption": "$TW_TAHead_11",
            "displayType": "outlined",
            "color": "default",
            "size": "medium",
            "clicked": {
                "request": "usr.TWToggleAssessment",
                "params": {
                    "index": 11
                }
            },
            "classes": [
                "usr-tw-ta-toggle"
            ]
        },
        "parentName": "TW_TA_Text_11",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Toggle_12",
        "values": {
            "type": "crt.Button",
            "caption": "$TW_TAHead_12",
            "displayType": "outlined",
            "color": "default",
            "size": "medium",
            "clicked": {
                "request": "usr.TWToggleAssessment",
                "params": {
                    "index": 12
                }
            },
            "classes": [
                "usr-tw-ta-toggle"
            ]
        },
        "parentName": "TW_TA_Text_12",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Toggle_13",
        "values": {
            "type": "crt.Button",
            "caption": "$TW_TAHead_13",
            "displayType": "outlined",
            "color": "default",
            "size": "medium",
            "clicked": {
                "request": "usr.TWToggleAssessment",
                "params": {
                    "index": 13
                }
            },
            "classes": [
                "usr-tw-ta-toggle"
            ]
        },
        "parentName": "TW_TA_Text_13",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Toggle_14",
        "values": {
            "type": "crt.Button",
            "caption": "$TW_TAHead_14",
            "displayType": "outlined",
            "color": "default",
            "size": "medium",
            "clicked": {
                "request": "usr.TWToggleAssessment",
                "params": {
                    "index": 14
                }
            },
            "classes": [
                "usr-tw-ta-toggle"
            ]
        },
        "parentName": "TW_TA_Text_14",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_TA_Subtitle_0",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TASub_0",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-subtitle"
            ],
            "labelColor": "#748099"
        },
        "parentName": "TW_TA_Text_0",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Subtitle_1",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TASub_1",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-subtitle"
            ],
            "labelColor": "#748099"
        },
        "parentName": "TW_TA_Text_1",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Subtitle_2",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TASub_2",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-subtitle"
            ],
            "labelColor": "#748099"
        },
        "parentName": "TW_TA_Text_2",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Subtitle_3",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TASub_3",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-subtitle"
            ],
            "labelColor": "#748099"
        },
        "parentName": "TW_TA_Text_3",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Subtitle_4",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TASub_4",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-subtitle"
            ],
            "labelColor": "#748099"
        },
        "parentName": "TW_TA_Text_4",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Subtitle_5",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TASub_5",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-subtitle"
            ],
            "labelColor": "#748099"
        },
        "parentName": "TW_TA_Text_5",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Subtitle_6",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TASub_6",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-subtitle"
            ],
            "labelColor": "#748099"
        },
        "parentName": "TW_TA_Text_6",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Subtitle_7",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TASub_7",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-subtitle"
            ],
            "labelColor": "#748099"
        },
        "parentName": "TW_TA_Text_7",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Subtitle_8",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TASub_8",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-subtitle"
            ],
            "labelColor": "#748099"
        },
        "parentName": "TW_TA_Text_8",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Subtitle_9",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TASub_9",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-subtitle"
            ],
            "labelColor": "#748099"
        },
        "parentName": "TW_TA_Text_9",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Subtitle_10",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TASub_10",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-subtitle"
            ],
            "labelColor": "#748099"
        },
        "parentName": "TW_TA_Text_10",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Subtitle_11",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TASub_11",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-subtitle"
            ],
            "labelColor": "#748099"
        },
        "parentName": "TW_TA_Text_11",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Subtitle_12",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TASub_12",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-subtitle"
            ],
            "labelColor": "#748099"
        },
        "parentName": "TW_TA_Text_12",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Subtitle_13",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TASub_13",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-subtitle"
            ],
            "labelColor": "#748099"
        },
        "parentName": "TW_TA_Text_13",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_TA_Subtitle_14",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_TASub_14",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-ta-subtitle"
            ],
            "labelColor": "#748099"
        },
        "parentName": "TW_TA_Text_14",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo1_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_HistoryTitle1",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails1",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo1_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_HistoryMeta1",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails1",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo1_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_HistoryOutcome1",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails1",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo2_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_HistoryTitle2",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails2",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo2_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_HistoryMeta2",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails2",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo2_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_HistoryOutcome2",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails2",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo3_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_HistoryTitle3",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails3",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo3_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_HistoryMeta3",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails3",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo3_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_HistoryOutcome3",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails3",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo4_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_HistoryTitle4",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails4",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo4_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_HistoryMeta4",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails4",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo4_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_HistoryOutcome4",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails4",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo5_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_HistoryTitle5",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails5",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo5_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_HistoryMeta5",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails5",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo5_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_HistoryOutcome5",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails5",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo6_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_HistoryTitle6",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails6",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo6_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_HistoryMeta6",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails6",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo6_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_HistoryOutcome6",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails6",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo7_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_HistoryTitle7",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails7",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo7_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_HistoryMeta7",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails7",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo7_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_HistoryOutcome7",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails7",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo8_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_HistoryTitle8",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails8",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo8_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_HistoryMeta8",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails8",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo8_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_HistoryOutcome8",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails8",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo9_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_HistoryTitle9",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails9",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo9_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_HistoryMeta9",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails9",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo9_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_HistoryOutcome9",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails9",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo10_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_HistoryTitle10",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails10",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo10_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_HistoryMeta10",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails10",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo10_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_HistoryOutcome10",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails10",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo11_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_HistoryTitle11",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails11",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo11_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_HistoryMeta11",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails11",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo11_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_HistoryOutcome11",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails11",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo12_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_HistoryTitle12",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails12",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo12_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_HistoryMeta12",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails12",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_HistoryInfo12_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_HistoryOutcome12",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_HistoryDetails12",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo1_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_AuditTitle1",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails1",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo1_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_AuditMeta1",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails1",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo1_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_AuditOutcome1",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails1",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo2_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_AuditTitle2",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails2",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo2_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_AuditMeta2",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails2",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo2_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_AuditOutcome2",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails2",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo3_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_AuditTitle3",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails3",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo3_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_AuditMeta3",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails3",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo3_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_AuditOutcome3",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails3",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo4_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_AuditTitle4",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails4",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo4_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_AuditMeta4",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails4",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo4_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_AuditOutcome4",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails4",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo5_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_AuditTitle5",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails5",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo5_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_AuditMeta5",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails5",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo5_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_AuditOutcome5",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails5",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo6_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_AuditTitle6",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails6",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo6_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_AuditMeta6",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails6",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo6_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_AuditOutcome6",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails6",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo7_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_AuditTitle7",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails7",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo7_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_AuditMeta7",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails7",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo7_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_AuditOutcome7",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails7",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo8_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_AuditTitle8",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails8",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo8_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_AuditMeta8",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails8",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo8_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_AuditOutcome8",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails8",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo9_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_AuditTitle9",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails9",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo9_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_AuditMeta9",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails9",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo9_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_AuditOutcome9",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails9",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo10_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_AuditTitle10",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails10",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo10_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_AuditMeta10",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails10",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo10_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_AuditOutcome10",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails10",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo11_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_AuditTitle11",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails11",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo11_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_AuditMeta11",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails11",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo11_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_AuditOutcome11",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails11",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo12_Title",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-title"
            ],
            "caption": "$TW_AuditTitle12",
            "labelColor": "#16243D",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails12",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo12_Meta",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-meta"
            ],
            "caption": "$TW_AuditMeta12",
            "labelColor": "#6D7990",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails12",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_AuditInfo12_Outcome",
        "values": {
            "type": "crt.Label",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-timeline-outcome"
            ],
            "caption": "$TW_AuditOutcome12",
            "labelColor": "#52647B",
            "labelThickness": "default",
            "labelTextAlign": "start"
        },
        "parentName": "TW_AuditDetails12",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TW_Info_RequestTypeLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Request Type",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldname"
            ],
            "labelColor": "#6D7B93",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Info_RequestType",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_Info_RequestTypeValue",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_RequestType",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Info_RequestType",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_Info_AuthorityLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Authority",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldname"
            ],
            "labelColor": "#6D7B93",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Info_Authority",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_Info_AuthorityValue",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_Authority",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Info_Authority",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_Info_ProjectLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Project",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldname"
            ],
            "labelColor": "#6D7B93",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Info_Project",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_Info_ProjectValue",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_Project",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Info_Project",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_Info_RequesterLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Requester",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldname"
            ],
            "labelColor": "#6D7B93",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Info_Requester",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_Info_RequesterValue",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_Requester",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Info_Requester",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_Info_SubmittedLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Submitted",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldname"
            ],
            "labelColor": "#6D7B93",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Info_Submitted",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_Info_SubmittedValue",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_Submitted",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Info_Submitted",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TW_Info_EstPointsLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Est. Points",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldname"
            ],
            "labelColor": "#6D7B93",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Info_EstPoints",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TW_Info_EstPointsValue",
        "values": {
            "type": "crt.Label",
            "caption": "$TW_EstPoints",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tw-fieldvalue"
            ],
            "labelColor": "#13213A",
            "labelThickness": "semibold",
            "labelTextAlign": "start"
        },
        "parentName": "TW_Info_EstPoints",
        "propertyName": "items",
        "index": 1
    }
]
/**SCHEMA_VIEW_CONFIG_DIFF*/,
        viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/
[
    {
        "operation": "merge",
        "path": [
            "attributes"
        ],
        "values": {
            "TW_TaskId": {
                "value": ""
            },
            "TW_Tab_overview": {
                "value": true
            },
            "TW_Tab_items": {
                "value": false
            },
            "TW_Tab_points": {
                "value": false
            },
            "TW_Tab_documents": {
                "value": false
            },
            "TW_Tab_validation": {
                "value": false
            },
            "TW_Tab_history": {
                "value": false
            },
            "TW_Tab_audit": {
                "value": false
            },
            "TW_RequestNumber": {
                "value": ""
            },
            "TW_RequestTitle": {
                "value": ""
            },
            "TW_ReviewId": {
                "value": ""
            },
            "TW_Requester": {
                "value": ""
            },
            "TW_Authority": {
                "value": ""
            },
            "TW_Project": {
                "value": ""
            },
            "TW_Contract": {
                "value": ""
            },
            "TW_RequestType": {
                "value": ""
            },
            "TW_Submitted": {
                "value": ""
            },
            "TW_Justification": {
                "value": ""
            },
            "TW_ItemsCount": {
                "value": ""
            },
            "TW_ReviewStage": {
                "value": ""
            },
            "TW_Reviewer": {
                "value": ""
            },
            "TW_QueueArrival": {
                "value": ""
            },
            "TW_DueOn": {
                "value": ""
            },
            "TW_SlaRemaining": {
                "value": ""
            },
            "TW_PreviousStage": {
                "value": ""
            },
            "TW_EstPoints": {
                "value": ""
            },
            "TW_AvailablePoints": {
                "value": ""
            },
            "TW_BalanceAfter": {
                "value": ""
            },
            "TW_ConsumedPoints": {
                "value": ""
            },
            "TW_RestoredPoints": {
                "value": ""
            },
            "TW_ContractNumber": {
                "value": ""
            },
            "TW_ContractReference": {
                "value": ""
            },
            "TW_ContractPeriod": {
                "value": ""
            },
            "TW_ItemsText": {
                "value": ""
            },
            "TW_FilesText": {
                "value": ""
            },
            "TW_ValidationText": {
                "value": ""
            },
            "TW_HistoryText": {
                "value": ""
            },
            "TW_AuditText": {
                "value": ""
            },
            "TW_ReviewStatus": {
                "value": ""
            },
            "TW_Comments": {
                "value": ""
            },
            "TW_SavingNotes": {
                "value": false
            },
            "TW_NotesFeedback": {
                "value": ""
            },
            "TW_InitialContractPoints": {
                "value": "Not verified"
            },
            "TW_Notice": {
                "value": ""
            },
            "TW_ShowError": {
                "value": false
            },
            "TW_ShowNotesFeedback": {
                "value": false
            },
            "TW_VM_0_Num": {
                "value": ""
            },
            "TW_VM_0_Purpose": {
                "value": ""
            },
            "TW_VM_0_Env": {
                "value": ""
            },
            "TW_VM_0_OS": {
                "value": ""
            },
            "TW_VM_0_CPU": {
                "value": ""
            },
            "TW_VM_0_RAM": {
                "value": ""
            },
            "TW_VM_0_Storage": {
                "value": ""
            },
            "TW_VM_0_Network": {
                "value": ""
            },
            "TW_VM_0_Qty": {
                "value": ""
            },
            "TW_VM_0_Points": {
                "value": ""
            },
            "TW_VMVisible_0": {
                "value": false
            },
            "TW_VM_1_Num": {
                "value": ""
            },
            "TW_VM_1_Purpose": {
                "value": ""
            },
            "TW_VM_1_Env": {
                "value": ""
            },
            "TW_VM_1_OS": {
                "value": ""
            },
            "TW_VM_1_CPU": {
                "value": ""
            },
            "TW_VM_1_RAM": {
                "value": ""
            },
            "TW_VM_1_Storage": {
                "value": ""
            },
            "TW_VM_1_Network": {
                "value": ""
            },
            "TW_VM_1_Qty": {
                "value": ""
            },
            "TW_VM_1_Points": {
                "value": ""
            },
            "TW_VMVisible_1": {
                "value": false
            },
            "TW_VM_2_Num": {
                "value": ""
            },
            "TW_VM_2_Purpose": {
                "value": ""
            },
            "TW_VM_2_Env": {
                "value": ""
            },
            "TW_VM_2_OS": {
                "value": ""
            },
            "TW_VM_2_CPU": {
                "value": ""
            },
            "TW_VM_2_RAM": {
                "value": ""
            },
            "TW_VM_2_Storage": {
                "value": ""
            },
            "TW_VM_2_Network": {
                "value": ""
            },
            "TW_VM_2_Qty": {
                "value": ""
            },
            "TW_VM_2_Points": {
                "value": ""
            },
            "TW_VMVisible_2": {
                "value": false
            },
            "TW_VM_3_Num": {
                "value": ""
            },
            "TW_VM_3_Purpose": {
                "value": ""
            },
            "TW_VM_3_Env": {
                "value": ""
            },
            "TW_VM_3_OS": {
                "value": ""
            },
            "TW_VM_3_CPU": {
                "value": ""
            },
            "TW_VM_3_RAM": {
                "value": ""
            },
            "TW_VM_3_Storage": {
                "value": ""
            },
            "TW_VM_3_Network": {
                "value": ""
            },
            "TW_VM_3_Qty": {
                "value": ""
            },
            "TW_VM_3_Points": {
                "value": ""
            },
            "TW_VMVisible_3": {
                "value": false
            },
            "TW_VM_4_Num": {
                "value": ""
            },
            "TW_VM_4_Purpose": {
                "value": ""
            },
            "TW_VM_4_Env": {
                "value": ""
            },
            "TW_VM_4_OS": {
                "value": ""
            },
            "TW_VM_4_CPU": {
                "value": ""
            },
            "TW_VM_4_RAM": {
                "value": ""
            },
            "TW_VM_4_Storage": {
                "value": ""
            },
            "TW_VM_4_Network": {
                "value": ""
            },
            "TW_VM_4_Qty": {
                "value": ""
            },
            "TW_VM_4_Points": {
                "value": ""
            },
            "TW_VMVisible_4": {
                "value": false
            },
            "TW_VM_5_Num": {
                "value": ""
            },
            "TW_VM_5_Purpose": {
                "value": ""
            },
            "TW_VM_5_Env": {
                "value": ""
            },
            "TW_VM_5_OS": {
                "value": ""
            },
            "TW_VM_5_CPU": {
                "value": ""
            },
            "TW_VM_5_RAM": {
                "value": ""
            },
            "TW_VM_5_Storage": {
                "value": ""
            },
            "TW_VM_5_Network": {
                "value": ""
            },
            "TW_VM_5_Qty": {
                "value": ""
            },
            "TW_VM_5_Points": {
                "value": ""
            },
            "TW_VMVisible_5": {
                "value": false
            },
            "TW_VM_6_Num": {
                "value": ""
            },
            "TW_VM_6_Purpose": {
                "value": ""
            },
            "TW_VM_6_Env": {
                "value": ""
            },
            "TW_VM_6_OS": {
                "value": ""
            },
            "TW_VM_6_CPU": {
                "value": ""
            },
            "TW_VM_6_RAM": {
                "value": ""
            },
            "TW_VM_6_Storage": {
                "value": ""
            },
            "TW_VM_6_Network": {
                "value": ""
            },
            "TW_VM_6_Qty": {
                "value": ""
            },
            "TW_VM_6_Points": {
                "value": ""
            },
            "TW_VMVisible_6": {
                "value": false
            },
            "TW_VM_7_Num": {
                "value": ""
            },
            "TW_VM_7_Purpose": {
                "value": ""
            },
            "TW_VM_7_Env": {
                "value": ""
            },
            "TW_VM_7_OS": {
                "value": ""
            },
            "TW_VM_7_CPU": {
                "value": ""
            },
            "TW_VM_7_RAM": {
                "value": ""
            },
            "TW_VM_7_Storage": {
                "value": ""
            },
            "TW_VM_7_Network": {
                "value": ""
            },
            "TW_VM_7_Qty": {
                "value": ""
            },
            "TW_VM_7_Points": {
                "value": ""
            },
            "TW_VMVisible_7": {
                "value": false
            },
            "TW_VM_8_Num": {
                "value": ""
            },
            "TW_VM_8_Purpose": {
                "value": ""
            },
            "TW_VM_8_Env": {
                "value": ""
            },
            "TW_VM_8_OS": {
                "value": ""
            },
            "TW_VM_8_CPU": {
                "value": ""
            },
            "TW_VM_8_RAM": {
                "value": ""
            },
            "TW_VM_8_Storage": {
                "value": ""
            },
            "TW_VM_8_Network": {
                "value": ""
            },
            "TW_VM_8_Qty": {
                "value": ""
            },
            "TW_VM_8_Points": {
                "value": ""
            },
            "TW_VMVisible_8": {
                "value": false
            },
            "TW_VM_9_Num": {
                "value": ""
            },
            "TW_VM_9_Purpose": {
                "value": ""
            },
            "TW_VM_9_Env": {
                "value": ""
            },
            "TW_VM_9_OS": {
                "value": ""
            },
            "TW_VM_9_CPU": {
                "value": ""
            },
            "TW_VM_9_RAM": {
                "value": ""
            },
            "TW_VM_9_Storage": {
                "value": ""
            },
            "TW_VM_9_Network": {
                "value": ""
            },
            "TW_VM_9_Qty": {
                "value": ""
            },
            "TW_VM_9_Points": {
                "value": ""
            },
            "TW_VMVisible_9": {
                "value": false
            },
            "TW_VM_10_Num": {
                "value": ""
            },
            "TW_VM_10_Purpose": {
                "value": ""
            },
            "TW_VM_10_Env": {
                "value": ""
            },
            "TW_VM_10_OS": {
                "value": ""
            },
            "TW_VM_10_CPU": {
                "value": ""
            },
            "TW_VM_10_RAM": {
                "value": ""
            },
            "TW_VM_10_Storage": {
                "value": ""
            },
            "TW_VM_10_Network": {
                "value": ""
            },
            "TW_VM_10_Qty": {
                "value": ""
            },
            "TW_VM_10_Points": {
                "value": ""
            },
            "TW_VMVisible_10": {
                "value": false
            },
            "TW_VM_11_Num": {
                "value": ""
            },
            "TW_VM_11_Purpose": {
                "value": ""
            },
            "TW_VM_11_Env": {
                "value": ""
            },
            "TW_VM_11_OS": {
                "value": ""
            },
            "TW_VM_11_CPU": {
                "value": ""
            },
            "TW_VM_11_RAM": {
                "value": ""
            },
            "TW_VM_11_Storage": {
                "value": ""
            },
            "TW_VM_11_Network": {
                "value": ""
            },
            "TW_VM_11_Qty": {
                "value": ""
            },
            "TW_VM_11_Points": {
                "value": ""
            },
            "TW_VMVisible_11": {
                "value": false
            },
            "TW_VM_12_Num": {
                "value": ""
            },
            "TW_VM_12_Purpose": {
                "value": ""
            },
            "TW_VM_12_Env": {
                "value": ""
            },
            "TW_VM_12_OS": {
                "value": ""
            },
            "TW_VM_12_CPU": {
                "value": ""
            },
            "TW_VM_12_RAM": {
                "value": ""
            },
            "TW_VM_12_Storage": {
                "value": ""
            },
            "TW_VM_12_Network": {
                "value": ""
            },
            "TW_VM_12_Qty": {
                "value": ""
            },
            "TW_VM_12_Points": {
                "value": ""
            },
            "TW_VMVisible_12": {
                "value": false
            },
            "TW_VM_13_Num": {
                "value": ""
            },
            "TW_VM_13_Purpose": {
                "value": ""
            },
            "TW_VM_13_Env": {
                "value": ""
            },
            "TW_VM_13_OS": {
                "value": ""
            },
            "TW_VM_13_CPU": {
                "value": ""
            },
            "TW_VM_13_RAM": {
                "value": ""
            },
            "TW_VM_13_Storage": {
                "value": ""
            },
            "TW_VM_13_Network": {
                "value": ""
            },
            "TW_VM_13_Qty": {
                "value": ""
            },
            "TW_VM_13_Points": {
                "value": ""
            },
            "TW_VMVisible_13": {
                "value": false
            },
            "TW_VM_14_Num": {
                "value": ""
            },
            "TW_VM_14_Purpose": {
                "value": ""
            },
            "TW_VM_14_Env": {
                "value": ""
            },
            "TW_VM_14_OS": {
                "value": ""
            },
            "TW_VM_14_CPU": {
                "value": ""
            },
            "TW_VM_14_RAM": {
                "value": ""
            },
            "TW_VM_14_Storage": {
                "value": ""
            },
            "TW_VM_14_Network": {
                "value": ""
            },
            "TW_VM_14_Qty": {
                "value": ""
            },
            "TW_VM_14_Points": {
                "value": ""
            },
            "TW_VMVisible_14": {
                "value": false
            },
            "TW_VMOverflow": {
                "value": ""
            },
            "TW_TAVisible_0": {
                "value": false
            },
            "TW_TAExpanded_0": {
                "value": false
            },
            "TW_TAHead_0": {
                "value": ""
            },
            "TW_TADetail_0": {
                "value": ""
            },
            "TW_TAVisible_1": {
                "value": false
            },
            "TW_TAExpanded_1": {
                "value": false
            },
            "TW_TAHead_1": {
                "value": ""
            },
            "TW_TADetail_1": {
                "value": ""
            },
            "TW_TAVisible_2": {
                "value": false
            },
            "TW_TAExpanded_2": {
                "value": false
            },
            "TW_TAHead_2": {
                "value": ""
            },
            "TW_TADetail_2": {
                "value": ""
            },
            "TW_TAVisible_3": {
                "value": false
            },
            "TW_TAExpanded_3": {
                "value": false
            },
            "TW_TAHead_3": {
                "value": ""
            },
            "TW_TADetail_3": {
                "value": ""
            },
            "TW_TAVisible_4": {
                "value": false
            },
            "TW_TAExpanded_4": {
                "value": false
            },
            "TW_TAHead_4": {
                "value": ""
            },
            "TW_TADetail_4": {
                "value": ""
            },
            "TW_TAVisible_5": {
                "value": false
            },
            "TW_TAExpanded_5": {
                "value": false
            },
            "TW_TAHead_5": {
                "value": ""
            },
            "TW_TADetail_5": {
                "value": ""
            },
            "TW_TAVisible_6": {
                "value": false
            },
            "TW_TAExpanded_6": {
                "value": false
            },
            "TW_TAHead_6": {
                "value": ""
            },
            "TW_TADetail_6": {
                "value": ""
            },
            "TW_TAVisible_7": {
                "value": false
            },
            "TW_TAExpanded_7": {
                "value": false
            },
            "TW_TAHead_7": {
                "value": ""
            },
            "TW_TADetail_7": {
                "value": ""
            },
            "TW_TAVisible_8": {
                "value": false
            },
            "TW_TAExpanded_8": {
                "value": false
            },
            "TW_TAHead_8": {
                "value": ""
            },
            "TW_TADetail_8": {
                "value": ""
            },
            "TW_TAVisible_9": {
                "value": false
            },
            "TW_TAExpanded_9": {
                "value": false
            },
            "TW_TAHead_9": {
                "value": ""
            },
            "TW_TADetail_9": {
                "value": ""
            },
            "TW_TAVisible_10": {
                "value": false
            },
            "TW_TAExpanded_10": {
                "value": false
            },
            "TW_TAHead_10": {
                "value": ""
            },
            "TW_TADetail_10": {
                "value": ""
            },
            "TW_TAVisible_11": {
                "value": false
            },
            "TW_TAExpanded_11": {
                "value": false
            },
            "TW_TAHead_11": {
                "value": ""
            },
            "TW_TADetail_11": {
                "value": ""
            },
            "TW_TAVisible_12": {
                "value": false
            },
            "TW_TAExpanded_12": {
                "value": false
            },
            "TW_TAHead_12": {
                "value": ""
            },
            "TW_TADetail_12": {
                "value": ""
            },
            "TW_TAVisible_13": {
                "value": false
            },
            "TW_TAExpanded_13": {
                "value": false
            },
            "TW_TAHead_13": {
                "value": ""
            },
            "TW_TADetail_13": {
                "value": ""
            },
            "TW_TAVisible_14": {
                "value": false
            },
            "TW_TAExpanded_14": {
                "value": false
            },
            "TW_TAHead_14": {
                "value": ""
            },
            "TW_TADetail_14": {
                "value": ""
            },
            "TW_TAOverflow": {
                "value": ""
            },
            "TW_TaskName": {
                "value": ""
            },
            "TW_QueueCaption": {
                "value": ""
            },
            "TW_SLAOkayVisible": {
                "value": false
            },
            "TW_SLALateVisible": {
                "value": false
            },
            "TW_SLAMissingVisible": {
                "value": false
            },
            "TW_TASub_0": {
                "value": ""
            },
            "TW_TASub_1": {
                "value": ""
            },
            "TW_TASub_2": {
                "value": ""
            },
            "TW_TASub_3": {
                "value": ""
            },
            "TW_TASub_4": {
                "value": ""
            },
            "TW_TASub_5": {
                "value": ""
            },
            "TW_TASub_6": {
                "value": ""
            },
            "TW_TASub_7": {
                "value": ""
            },
            "TW_TASub_8": {
                "value": ""
            },
            "TW_TASub_9": {
                "value": ""
            },
            "TW_TASub_10": {
                "value": ""
            },
            "TW_TASub_11": {
                "value": ""
            },
            "TW_TASub_12": {
                "value": ""
            },
            "TW_TASub_13": {
                "value": ""
            },
            "TW_TASub_14": {
                "value": ""
            },
            "TW_DocShow1": {
                "value": false
            },
            "TW_Doc1_Type": {
                "value": ""
            },
            "TW_Doc1_File": {
                "value": ""
            },
            "TW_Doc1_Date": {
                "value": ""
            },
            "TW_Doc1_State": {
                "value": ""
            },
            "TW_DocShow2": {
                "value": false
            },
            "TW_Doc2_Type": {
                "value": ""
            },
            "TW_Doc2_File": {
                "value": ""
            },
            "TW_Doc2_Date": {
                "value": ""
            },
            "TW_Doc2_State": {
                "value": ""
            },
            "TW_DocShow3": {
                "value": false
            },
            "TW_Doc3_Type": {
                "value": ""
            },
            "TW_Doc3_File": {
                "value": ""
            },
            "TW_Doc3_Date": {
                "value": ""
            },
            "TW_Doc3_State": {
                "value": ""
            },
            "TW_DocShow4": {
                "value": false
            },
            "TW_Doc4_Type": {
                "value": ""
            },
            "TW_Doc4_File": {
                "value": ""
            },
            "TW_Doc4_Date": {
                "value": ""
            },
            "TW_Doc4_State": {
                "value": ""
            },
            "TW_DocShow5": {
                "value": false
            },
            "TW_Doc5_Type": {
                "value": ""
            },
            "TW_Doc5_File": {
                "value": ""
            },
            "TW_Doc5_Date": {
                "value": ""
            },
            "TW_Doc5_State": {
                "value": ""
            },
            "TW_DocShow6": {
                "value": false
            },
            "TW_Doc6_Type": {
                "value": ""
            },
            "TW_Doc6_File": {
                "value": ""
            },
            "TW_Doc6_Date": {
                "value": ""
            },
            "TW_Doc6_State": {
                "value": ""
            },
            "TW_DocShow7": {
                "value": false
            },
            "TW_Doc7_Type": {
                "value": ""
            },
            "TW_Doc7_File": {
                "value": ""
            },
            "TW_Doc7_Date": {
                "value": ""
            },
            "TW_Doc7_State": {
                "value": ""
            },
            "TW_DocShow8": {
                "value": false
            },
            "TW_Doc8_Type": {
                "value": ""
            },
            "TW_Doc8_File": {
                "value": ""
            },
            "TW_Doc8_Date": {
                "value": ""
            },
            "TW_Doc8_State": {
                "value": ""
            },
            "TW_DocTableVisible": {
                "value": false
            },
            "TW_DocFallbackVisible": {
                "value": true
            },
            "TW_DocOpenVisible": {
                "value": false
            },
            "TW_DocEmptyMessage": {
                "value": ""
            },
            "TW_ValPassedVisible": {
                "value": false
            },
            "TW_ValPassedText": {
                "value": ""
            },
            "TW_ValUnverifiedVisible": {
                "value": false
            },
            "TW_ValUnverifiedText": {
                "value": ""
            },
            "TW_ValIssuesVisible": {
                "value": false
            },
            "TW_ValIssuesText": {
                "value": ""
            },
            "TW_ValidationDetailVisible": {
                "value": false
            },
            "TW_HistoryListVisible": {
                "value": false
            },
            "TW_HistoryFallbackVisible": {
                "value": true
            },
            "TW_HistoryShow1": {
                "value": false
            },
            "TW_HistoryTitle1": {
                "value": ""
            },
            "TW_HistoryMeta1": {
                "value": ""
            },
            "TW_HistoryOutcome1": {
                "value": ""
            },
            "TW_HistoryDone1": {
                "value": false
            },
            "TW_HistoryPending1": {
                "value": false
            },
            "TW_HistoryShow2": {
                "value": false
            },
            "TW_HistoryTitle2": {
                "value": ""
            },
            "TW_HistoryMeta2": {
                "value": ""
            },
            "TW_HistoryOutcome2": {
                "value": ""
            },
            "TW_HistoryDone2": {
                "value": false
            },
            "TW_HistoryPending2": {
                "value": false
            },
            "TW_HistoryShow3": {
                "value": false
            },
            "TW_HistoryTitle3": {
                "value": ""
            },
            "TW_HistoryMeta3": {
                "value": ""
            },
            "TW_HistoryOutcome3": {
                "value": ""
            },
            "TW_HistoryDone3": {
                "value": false
            },
            "TW_HistoryPending3": {
                "value": false
            },
            "TW_HistoryShow4": {
                "value": false
            },
            "TW_HistoryTitle4": {
                "value": ""
            },
            "TW_HistoryMeta4": {
                "value": ""
            },
            "TW_HistoryOutcome4": {
                "value": ""
            },
            "TW_HistoryDone4": {
                "value": false
            },
            "TW_HistoryPending4": {
                "value": false
            },
            "TW_HistoryShow5": {
                "value": false
            },
            "TW_HistoryTitle5": {
                "value": ""
            },
            "TW_HistoryMeta5": {
                "value": ""
            },
            "TW_HistoryOutcome5": {
                "value": ""
            },
            "TW_HistoryDone5": {
                "value": false
            },
            "TW_HistoryPending5": {
                "value": false
            },
            "TW_HistoryShow6": {
                "value": false
            },
            "TW_HistoryTitle6": {
                "value": ""
            },
            "TW_HistoryMeta6": {
                "value": ""
            },
            "TW_HistoryOutcome6": {
                "value": ""
            },
            "TW_HistoryDone6": {
                "value": false
            },
            "TW_HistoryPending6": {
                "value": false
            },
            "TW_HistoryShow7": {
                "value": false
            },
            "TW_HistoryTitle7": {
                "value": ""
            },
            "TW_HistoryMeta7": {
                "value": ""
            },
            "TW_HistoryOutcome7": {
                "value": ""
            },
            "TW_HistoryDone7": {
                "value": false
            },
            "TW_HistoryPending7": {
                "value": false
            },
            "TW_HistoryShow8": {
                "value": false
            },
            "TW_HistoryTitle8": {
                "value": ""
            },
            "TW_HistoryMeta8": {
                "value": ""
            },
            "TW_HistoryOutcome8": {
                "value": ""
            },
            "TW_HistoryDone8": {
                "value": false
            },
            "TW_HistoryPending8": {
                "value": false
            },
            "TW_HistoryShow9": {
                "value": false
            },
            "TW_HistoryTitle9": {
                "value": ""
            },
            "TW_HistoryMeta9": {
                "value": ""
            },
            "TW_HistoryOutcome9": {
                "value": ""
            },
            "TW_HistoryDone9": {
                "value": false
            },
            "TW_HistoryPending9": {
                "value": false
            },
            "TW_HistoryShow10": {
                "value": false
            },
            "TW_HistoryTitle10": {
                "value": ""
            },
            "TW_HistoryMeta10": {
                "value": ""
            },
            "TW_HistoryOutcome10": {
                "value": ""
            },
            "TW_HistoryDone10": {
                "value": false
            },
            "TW_HistoryPending10": {
                "value": false
            },
            "TW_HistoryShow11": {
                "value": false
            },
            "TW_HistoryTitle11": {
                "value": ""
            },
            "TW_HistoryMeta11": {
                "value": ""
            },
            "TW_HistoryOutcome11": {
                "value": ""
            },
            "TW_HistoryDone11": {
                "value": false
            },
            "TW_HistoryPending11": {
                "value": false
            },
            "TW_HistoryShow12": {
                "value": false
            },
            "TW_HistoryTitle12": {
                "value": ""
            },
            "TW_HistoryMeta12": {
                "value": ""
            },
            "TW_HistoryOutcome12": {
                "value": ""
            },
            "TW_HistoryDone12": {
                "value": false
            },
            "TW_HistoryPending12": {
                "value": false
            },
            "TW_AuditListVisible": {
                "value": false
            },
            "TW_AuditFallbackVisible": {
                "value": true
            },
            "TW_AuditShow1": {
                "value": false
            },
            "TW_AuditTitle1": {
                "value": ""
            },
            "TW_AuditMeta1": {
                "value": ""
            },
            "TW_AuditOutcome1": {
                "value": ""
            },
            "TW_AuditDone1": {
                "value": false
            },
            "TW_AuditPending1": {
                "value": false
            },
            "TW_AuditShow2": {
                "value": false
            },
            "TW_AuditTitle2": {
                "value": ""
            },
            "TW_AuditMeta2": {
                "value": ""
            },
            "TW_AuditOutcome2": {
                "value": ""
            },
            "TW_AuditDone2": {
                "value": false
            },
            "TW_AuditPending2": {
                "value": false
            },
            "TW_AuditShow3": {
                "value": false
            },
            "TW_AuditTitle3": {
                "value": ""
            },
            "TW_AuditMeta3": {
                "value": ""
            },
            "TW_AuditOutcome3": {
                "value": ""
            },
            "TW_AuditDone3": {
                "value": false
            },
            "TW_AuditPending3": {
                "value": false
            },
            "TW_AuditShow4": {
                "value": false
            },
            "TW_AuditTitle4": {
                "value": ""
            },
            "TW_AuditMeta4": {
                "value": ""
            },
            "TW_AuditOutcome4": {
                "value": ""
            },
            "TW_AuditDone4": {
                "value": false
            },
            "TW_AuditPending4": {
                "value": false
            },
            "TW_AuditShow5": {
                "value": false
            },
            "TW_AuditTitle5": {
                "value": ""
            },
            "TW_AuditMeta5": {
                "value": ""
            },
            "TW_AuditOutcome5": {
                "value": ""
            },
            "TW_AuditDone5": {
                "value": false
            },
            "TW_AuditPending5": {
                "value": false
            },
            "TW_AuditShow6": {
                "value": false
            },
            "TW_AuditTitle6": {
                "value": ""
            },
            "TW_AuditMeta6": {
                "value": ""
            },
            "TW_AuditOutcome6": {
                "value": ""
            },
            "TW_AuditDone6": {
                "value": false
            },
            "TW_AuditPending6": {
                "value": false
            },
            "TW_AuditShow7": {
                "value": false
            },
            "TW_AuditTitle7": {
                "value": ""
            },
            "TW_AuditMeta7": {
                "value": ""
            },
            "TW_AuditOutcome7": {
                "value": ""
            },
            "TW_AuditDone7": {
                "value": false
            },
            "TW_AuditPending7": {
                "value": false
            },
            "TW_AuditShow8": {
                "value": false
            },
            "TW_AuditTitle8": {
                "value": ""
            },
            "TW_AuditMeta8": {
                "value": ""
            },
            "TW_AuditOutcome8": {
                "value": ""
            },
            "TW_AuditDone8": {
                "value": false
            },
            "TW_AuditPending8": {
                "value": false
            },
            "TW_AuditShow9": {
                "value": false
            },
            "TW_AuditTitle9": {
                "value": ""
            },
            "TW_AuditMeta9": {
                "value": ""
            },
            "TW_AuditOutcome9": {
                "value": ""
            },
            "TW_AuditDone9": {
                "value": false
            },
            "TW_AuditPending9": {
                "value": false
            },
            "TW_AuditShow10": {
                "value": false
            },
            "TW_AuditTitle10": {
                "value": ""
            },
            "TW_AuditMeta10": {
                "value": ""
            },
            "TW_AuditOutcome10": {
                "value": ""
            },
            "TW_AuditDone10": {
                "value": false
            },
            "TW_AuditPending10": {
                "value": false
            },
            "TW_AuditShow11": {
                "value": false
            },
            "TW_AuditTitle11": {
                "value": ""
            },
            "TW_AuditMeta11": {
                "value": ""
            },
            "TW_AuditOutcome11": {
                "value": ""
            },
            "TW_AuditDone11": {
                "value": false
            },
            "TW_AuditPending11": {
                "value": false
            },
            "TW_AuditShow12": {
                "value": false
            },
            "TW_AuditTitle12": {
                "value": ""
            },
            "TW_AuditMeta12": {
                "value": ""
            },
            "TW_AuditOutcome12": {
                "value": ""
            },
            "TW_AuditDone12": {
                "value": false
            },
            "TW_AuditPending12": {
                "value": false
            }
        }
    }
]
/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
        modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/
[
    {
        "operation": "merge",
        "path": [
            "dataSources",
            "PDS",
            "config"
        ],
        "values": {
            "entitySchemaName": "UsrRequestApproval"
        }
    }
]
/**SCHEMA_MODEL_CONFIG_DIFF*/,
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
                request: "usr.TWToggleAssessment",
                handler: (request, next) => formRuntime.handle("usr.TWToggleAssessment", request, next)
            },
            {
                request: "usr.TWSaveNotes",
                handler: (request, next) => formRuntime.handle("usr.TWSaveNotes", request, next)
            },
            {
                request: "usr.TWRefresh",
                handler: (request, next) => formRuntime.handle("usr.TWRefresh", request, next)
            },
            {
                request: "usr.TWOpenApprovalsPanel",
                handler: (request, next) => formRuntime.handle("usr.TWOpenApprovalsPanel", request, next)
            },
            {
                request: "usr.TWOpenRequest",
                handler: (request, next) => formRuntime.handle("usr.TWOpenRequest", request, next)
            },
            {
                request: "usr.TWOpenChangeLog",
                handler: (request, next) => formRuntime.handle("usr.TWOpenChangeLog", request, next)
            },
            {
                request: "usr.TWDecision",
                handler: (request, next) => formRuntime.handle("usr.TWDecision", request, next)
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
