/*
 * TE-MCIT Technical Review List v4 — Designer-friendly (identical native layout to v3).
 * Layout, list settings, columns, cards, labels and filters are in this schema.
 * All custom runtime helpers, business logic and CSS are in UsrTechnicalReviewRuntime.
 * This page must use the same existing UsrRequestApproval object.
 * A Designer save must preserve the AMD dependency and 13 small handlers.
 */
define("UsrTechnicalReview_ListPage", /**SCHEMA_DEPS*/["UsrTechnicalReviewRuntime"]/**SCHEMA_DEPS*/,
    function/**SCHEMA_ARGS*/(technicalRuntime)/**SCHEMA_ARGS*/ {
    "use strict";
    return {
        viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/
[
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
        "name": "DataTable",
        "values": {
            "visible": true,
            "primaryColumnName": "PDS_Id",
            "selectionState": "$DataTable_SelectionState",
            "columns": [
                {
                    "id": "1141ab1b-1200-42ca-a051-000000000001",
                    "code": "PDS_UsrRequest_UsrNumber",
                    "caption": "Request ID",
                    "dataValueType": 1
                },
                {
                    "id": "1141ab1b-1200-42ca-a051-000000000003",
                    "code": "PDS_UsrRequest_UsrContract",
                    "caption": "Contract",
                    "dataValueType": 10
                },
                {
                    "id": "1141ab1b-1200-42ca-a051-000000000004",
                    "code": "PDS_UsrRequest_UsrAccount",
                    "caption": "Authority",
                    "dataValueType": 10
                },
                {
                    "id": "1141ab1b-1200-42ca-a051-000000000005",
                    "code": "PDS_UsrRequest_UsrProject",
                    "caption": "Project",
                    "dataValueType": 10
                },
                {
                    "id": "1141ab1b-1200-42ca-a051-000000000002",
                    "code": "PDS_UsrRequest_UsrName",
                    "caption": "Request Title",
                    "dataValueType": 1
                },
                {
                    "id": "1141ab1b-1200-42ca-a051-000000000012",
                    "code": "PDS_UsrRequest_CreatedBy",
                    "caption": "Created By",
                    "dataValueType": 10
                },
                {
                    "id": "1141ab1b-1200-42ca-a051-000000000013",
                    "code": "PDS_UsrRequest_CreatedOn",
                    "caption": "Created On",
                    "dataValueType": 7
                },
                {
                    "id": "1141ab1b-1200-42ca-a051-000000000014",
                    "code": "PDS_CreatedOn",
                    "caption": "Queue Arrival",
                    "dataValueType": 7
                },
                {
                    "id": "1141ab1b-1200-42ca-a051-000000000006",
                    "code": "PDS_UsrAssignedTo",
                    "caption": "Assigned Engineer",
                    "dataValueType": 10
                },
                {
                    "id": "1141ab1b-1200-42ca-a051-000000000007",
                    "code": "PDS_UsrAssignedOn",
                    "caption": "Assigned On",
                    "dataValueType": 7
                },
                {
                    "id": "1141ab1b-1200-42ca-a051-000000000008",
                    "code": "PDS_UsrDueOn",
                    "caption": "SLA Due",
                    "dataValueType": 7
                },
                {
                    "id": "1141ab1b-1200-42ca-a051-000000000009",
                    "code": "PDS_UsrStage",
                    "caption": "Stage",
                    "dataValueType": 10
                },
                {
                    "id": "1141ab1b-1200-42ca-a051-000000000010",
                    "code": "PDS_UsrDecision",
                    "caption": "Decision",
                    "dataValueType": 10
                },
                {
                    "id": "1141ab1b-1200-42ca-a051-000000000011",
                    "code": "PDS_UsrIsCompleted",
                    "caption": "Completed",
                    "dataValueType": 12
                }
            ],
            "rowToolbarItems": [],
            "classes": [
                "usr-tr-datagrid"
            ],
            "rowDoubleClick": {
                "request": "usr.TROpenWorkspace",
                "params": {
                    "taskId": "$Items.PDS_Id"
                },
                "useRelativeContext": true
            }
        }
    },
    {
        "operation": "merge",
        "name": "FolderTree",
        "values": {
            "rootSchemaName": "UsrRequestApproval"
        }
    },
    {
        "operation": "merge",
        "name": "MenuItem_ImportFromExcel",
        "values": {
            "clicked": {
                "request": "crt.ImportDataRequest",
                "params": {
                    "entitySchemaName": "UsrRequestApproval"
                }
            }
        }
    },
    {
        "operation": "insert",
        "name": "TR_Root",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "classes": [
                "usr-tr-root"
            ]
        },
        "parentName": "SectionContentWrapper",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TR_Header",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "classes": [
                "usr-tr-header"
            ]
        },
        "parentName": "TR_Root",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TR_HeadTitles",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "wrap",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "classes": [
                "usr-tr-headtitles"
            ]
        },
        "parentName": "TR_Header",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TR_Title",
        "values": {
            "type": "crt.Label",
            "caption": "Technical Review Queue",
            "labelType": "headline-1-small",
            "labelEllipsis": false,
            "classes": [
                "usr-tr-title"
            ],
            "labelThickness": "semibold",
            "labelColor": "#11213A",
            "labelBackgroundColor": "transparent",
            "labelTextAlign": "start"
        },
        "parentName": "TR_HeadTitles",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TR_Subtitle",
        "values": {
            "type": "crt.Label",
            "caption": "$TR_Subtitle",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tr-subtitle"
            ],
            "labelThickness": "default",
            "labelColor": "#64748B",
            "labelBackgroundColor": "transparent",
            "labelTextAlign": "start"
        },
        "parentName": "TR_HeadTitles",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TR_Metrics",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "classes": [
                "usr-tr-metrics"
            ]
        },
        "parentName": "TR_Root",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TR_Card_new",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "wrap",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "classes": [
                "usr-tr-card",
                "usr-tr-card-new"
            ]
        },
        "parentName": "TR_Metrics",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TR_Card_newCaption",
        "values": {
            "type": "crt.Label",
            "caption": "New",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [],
            "labelThickness": "default",
            "labelColor": "#27344B",
            "labelBackgroundColor": "transparent",
            "labelTextAlign": "start"
        },
        "parentName": "TR_Card_new",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TR_Card_newValue",
        "values": {
            "type": "crt.Label",
            "caption": "$TR_Count_new",
            "labelType": "headline-1-small",
            "labelEllipsis": false,
            "classes": [
                "usr-tr-card-value"
            ],
            "labelThickness": "semibold",
            "labelColor": "#6725B8",
            "labelBackgroundColor": "transparent",
            "labelTextAlign": "start"
        },
        "parentName": "TR_Card_new",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TR_Card_assigned",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "wrap",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "classes": [
                "usr-tr-card",
                "usr-tr-card-assigned"
            ]
        },
        "parentName": "TR_Metrics",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TR_Card_assignedCaption",
        "values": {
            "type": "crt.Label",
            "caption": "Assigned",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [],
            "labelThickness": "default",
            "labelColor": "#27344B",
            "labelBackgroundColor": "transparent",
            "labelTextAlign": "start"
        },
        "parentName": "TR_Card_assigned",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TR_Card_assignedValue",
        "values": {
            "type": "crt.Label",
            "caption": "$TR_Count_assigned",
            "labelType": "headline-1-small",
            "labelEllipsis": false,
            "classes": [
                "usr-tr-card-value"
            ],
            "labelThickness": "semibold",
            "labelColor": "#6725B8",
            "labelBackgroundColor": "transparent",
            "labelTextAlign": "start"
        },
        "parentName": "TR_Card_assigned",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TR_Card_approaching",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "wrap",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "classes": [
                "usr-tr-card",
                "usr-tr-card-approaching"
            ]
        },
        "parentName": "TR_Metrics",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TR_Card_approachingCaption",
        "values": {
            "type": "crt.Label",
            "caption": "Approaching SLA",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [],
            "labelThickness": "default",
            "labelColor": "#27344B",
            "labelBackgroundColor": "transparent",
            "labelTextAlign": "start"
        },
        "parentName": "TR_Card_approaching",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TR_Card_approachingValue",
        "values": {
            "type": "crt.Label",
            "caption": "$TR_Count_approaching",
            "labelType": "headline-1-small",
            "labelEllipsis": false,
            "classes": [
                "usr-tr-card-value"
            ],
            "labelThickness": "semibold",
            "labelColor": "#DD7B00",
            "labelBackgroundColor": "transparent",
            "labelTextAlign": "start"
        },
        "parentName": "TR_Card_approaching",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TR_Card_overdue",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "wrap",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "classes": [
                "usr-tr-card",
                "usr-tr-card-overdue"
            ]
        },
        "parentName": "TR_Metrics",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TR_Card_overdueCaption",
        "values": {
            "type": "crt.Label",
            "caption": "Overdue",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [],
            "labelThickness": "default",
            "labelColor": "#27344B",
            "labelBackgroundColor": "transparent",
            "labelTextAlign": "start"
        },
        "parentName": "TR_Card_overdue",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TR_Card_overdueValue",
        "values": {
            "type": "crt.Label",
            "caption": "$TR_Count_overdue",
            "labelType": "headline-1-small",
            "labelEllipsis": false,
            "classes": [
                "usr-tr-card-value"
            ],
            "labelThickness": "semibold",
            "labelColor": "#DE2631",
            "labelBackgroundColor": "transparent",
            "labelTextAlign": "start"
        },
        "parentName": "TR_Card_overdue",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TR_Card_completed",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "wrap",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "classes": [
                "usr-tr-card",
                "usr-tr-card-completed"
            ]
        },
        "parentName": "TR_Metrics",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TR_Card_completedCaption",
        "values": {
            "type": "crt.Label",
            "caption": "Completed",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [],
            "labelThickness": "default",
            "labelColor": "#27344B",
            "labelBackgroundColor": "transparent",
            "labelTextAlign": "start"
        },
        "parentName": "TR_Card_completed",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TR_Card_completedValue",
        "values": {
            "type": "crt.Label",
            "caption": "$TR_Count_completed",
            "labelType": "headline-1-small",
            "labelEllipsis": false,
            "classes": [
                "usr-tr-card-value"
            ],
            "labelThickness": "semibold",
            "labelColor": "#0A9F62",
            "labelBackgroundColor": "transparent",
            "labelTextAlign": "start"
        },
        "parentName": "TR_Card_completed",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TR_Toolbar",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "classes": [
                "usr-tr-toolbar"
            ]
        },
        "parentName": "TR_Root",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TR_SearchInput",
        "values": {
            "type": "crt.Input",
            "labelPosition": "hidden",
            "placeholder": "Search request ID, title, authority or project...",
            "control": "$TR_SearchText",
            "classes": [
                "usr-tr-search"
            ]
        },
        "parentName": "TR_Toolbar",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TR_Filters",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "classes": [
                "usr-tr-chips"
            ]
        },
        "parentName": "TR_Toolbar",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TR_Filter_all",
        "values": {
            "type": "crt.Button",
            "caption": "$TR_Chip_all",
            "color": "primary",
            "size": "small",
            "displayType": "$TR_Style_all",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.TRSelectFilter",
                "params": {
                    "filter": "all"
                }
            },
            "classes": [
                "usr-tr-chip",
                "usr-tr-chip-all"
            ]
        },
        "parentName": "TR_Filters",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TR_Filter_new",
        "values": {
            "type": "crt.Button",
            "caption": "$TR_Chip_new",
            "color": "primary",
            "size": "small",
            "displayType": "$TR_Style_new",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.TRSelectFilter",
                "params": {
                    "filter": "new"
                }
            },
            "classes": [
                "usr-tr-chip",
                "usr-tr-chip-new"
            ]
        },
        "parentName": "TR_Filters",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TR_Filter_assigned",
        "values": {
            "type": "crt.Button",
            "caption": "$TR_Chip_assigned",
            "color": "primary",
            "size": "small",
            "displayType": "$TR_Style_assigned",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.TRSelectFilter",
                "params": {
                    "filter": "assigned"
                }
            },
            "classes": [
                "usr-tr-chip",
                "usr-tr-chip-assigned"
            ]
        },
        "parentName": "TR_Filters",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TR_Filter_approaching",
        "values": {
            "type": "crt.Button",
            "caption": "$TR_Chip_approaching",
            "color": "primary",
            "size": "small",
            "displayType": "$TR_Style_approaching",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.TRSelectFilter",
                "params": {
                    "filter": "approaching"
                }
            },
            "classes": [
                "usr-tr-chip",
                "usr-tr-chip-approaching"
            ]
        },
        "parentName": "TR_Filters",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TR_Filter_overdue",
        "values": {
            "type": "crt.Button",
            "caption": "$TR_Chip_overdue",
            "color": "primary",
            "size": "small",
            "displayType": "$TR_Style_overdue",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.TRSelectFilter",
                "params": {
                    "filter": "overdue"
                }
            },
            "classes": [
                "usr-tr-chip",
                "usr-tr-chip-overdue"
            ]
        },
        "parentName": "TR_Filters",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TR_Filter_completed",
        "values": {
            "type": "crt.Button",
            "caption": "$TR_Chip_completed",
            "color": "primary",
            "size": "small",
            "displayType": "$TR_Style_completed",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.TRSelectFilter",
                "params": {
                    "filter": "completed"
                }
            },
            "classes": [
                "usr-tr-chip",
                "usr-tr-chip-completed"
            ]
        },
        "parentName": "TR_Filters",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TR_Export",
        "values": {
            "type": "crt.Button",
            "caption": "Export",
            "color": "outline",
            "size": "medium",
            "displayType": "contained",
            "iconPosition": "left-icon",
            "clicked": {
                "request": "usr.TRExport",
                "params": {}
            },
            "classes": [
                "usr-tr-export"
            ],
            "icon": "export-data-button-icon",
            "visible": true,
            "disabled": false
        },
        "parentName": "TR_Header",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TR_Notice",
        "values": {
            "type": "crt.Label",
            "caption": "$TR_Message",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tr-notice"
            ]
        },
        "parentName": "TR_Root",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TR_Footer",
        "values": {
            "type": "crt.Label",
            "caption": "$TR_Footer",
            "labelType": "body",
            "labelEllipsis": false,
            "classes": [
                "usr-tr-footer"
            ]
        },
        "parentName": "TR_Root",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "TR_AssignDialog",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "small",
            "wrap": "nowrap",
            "visible": "$TR_AssignVisible",
            "classes": [
                "usr-tr-dialog"
            ]
        },
        "parentName": "TR_Root",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "TR_AssignDialogTitle",
        "values": {
            "type": "crt.Label",
            "caption": "Assign Task",
            "labelType": "body",
            "classes": [
                "usr-tr-dialog-title"
            ]
        },
        "parentName": "TR_AssignDialog",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TR_AssignDialogTask",
        "values": {
            "type": "crt.Label",
            "caption": "$TR_AssignTitle",
            "labelType": "body"
        },
        "parentName": "TR_AssignDialog",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "TR_AssignDialogReviewer",
        "values": {
            "type": "crt.Label",
            "caption": "$TR_SelectedReviewer",
            "labelType": "body",
            "classes": [
                "usr-tr-dialog-selection"
            ]
        },
        "parentName": "TR_AssignDialog",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "TR_PickReviewer",
        "values": {
            "type": "crt.Button",
            "caption": "Select Technical Engineer",
            "size": "medium",
            "displayType": "contained",
            "color": "default",
            "clicked": {
                "request": "usr.TRPickReviewer"
            }
        },
        "parentName": "TR_AssignDialog",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "TR_AssignDialogActions",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "gap": "small",
            "items": [],
            "classes": [
                "usr-tr-dialog-actions"
            ]
        },
        "parentName": "TR_AssignDialog",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "TR_AssignCancel",
        "values": {
            "type": "crt.Button",
            "caption": "Cancel",
            "size": "small",
            "displayType": "text",
            "color": "default",
            "clicked": {
                "request": "usr.TRCancelAssign"
            }
        },
        "parentName": "TR_AssignDialogActions",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "TR_AssignConfirm",
        "values": {
            "type": "crt.Button",
            "caption": "Assign",
            "size": "small",
            "displayType": "contained",
            "color": "accent",
            "clicked": {
                "request": "usr.TRCommitAssign"
            }
        },
        "parentName": "TR_AssignDialogActions",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "move",
        "name": "DataTable",
        "parentName": "TR_Root",
        "propertyName": "items",
        "index": 4
    }
]
/**SCHEMA_VIEW_CONFIG_DIFF*/,
        viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/
[
    {
        "operation": "merge",
        "path": [
            "attributes",
            "Items",
            "viewModelConfig",
            "attributes"
        ],
        "values": {
            "PDS_UsrRequest_UsrNumber": {
                "modelConfig": {
                    "path": "PDS.UsrRequest_UsrNumber"
                }
            },
            "PDS_UsrRequest_UsrName": {
                "modelConfig": {
                    "path": "PDS.UsrRequest_UsrName"
                }
            },
            "PDS_UsrRequest_UsrContract": {
                "modelConfig": {
                    "path": "PDS.UsrRequest_UsrContract"
                }
            },
            "PDS_UsrRequest_UsrAccount": {
                "modelConfig": {
                    "path": "PDS.UsrRequest_UsrAccount"
                }
            },
            "PDS_UsrRequest_UsrProject": {
                "modelConfig": {
                    "path": "PDS.UsrRequest_UsrProject"
                }
            },
            "PDS_UsrRequest_CreatedBy": {
                "modelConfig": {
                    "path": "PDS.UsrRequest_CreatedBy"
                }
            },
            "PDS_UsrRequest_CreatedOn": {
                "modelConfig": {
                    "path": "PDS.UsrRequest_CreatedOn"
                }
            },
            "PDS_CreatedOn": {
                "modelConfig": {
                    "path": "PDS.CreatedOn"
                }
            },
            "PDS_UsrAssignedTo": {
                "modelConfig": {
                    "path": "PDS.UsrAssignedTo"
                }
            },
            "PDS_UsrAssignedOn": {
                "modelConfig": {
                    "path": "PDS.UsrAssignedOn"
                }
            },
            "PDS_UsrDueOn": {
                "modelConfig": {
                    "path": "PDS.UsrDueOn"
                }
            },
            "PDS_UsrStage": {
                "modelConfig": {
                    "path": "PDS.UsrStage"
                }
            },
            "PDS_UsrDecision": {
                "modelConfig": {
                    "path": "PDS.UsrDecision"
                }
            },
            "PDS_UsrIsCompleted": {
                "modelConfig": {
                    "path": "PDS.UsrIsCompleted"
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
            "TR_Subtitle": {
                "value": "Loading reviews..."
            },
            "TR_SearchText": {
                "value": ""
            },
            "TR_Message": {
                "value": ""
            },
            "TR_Footer": {
                "value": ""
            },
            "TR_Count_all": {
                "value": "0"
            },
            "TR_Chip_all": {
                "value": "all (0)"
            },
            "TR_Count_new": {
                "value": "0"
            },
            "TR_Chip_new": {
                "value": "new (0)"
            },
            "TR_Count_assigned": {
                "value": "0"
            },
            "TR_Chip_assigned": {
                "value": "assigned (0)"
            },
            "TR_Count_approaching": {
                "value": "0"
            },
            "TR_Chip_approaching": {
                "value": "approaching (0)"
            },
            "TR_Count_overdue": {
                "value": "0"
            },
            "TR_Chip_overdue": {
                "value": "overdue (0)"
            },
            "TR_Count_completed": {
                "value": "0"
            },
            "TR_Chip_completed": {
                "value": "completed (0)"
            },
            "TR_AssignVisible": {
                "value": false
            },
            "TR_AssignTitle": {
                "value": ""
            },
            "TR_SelectedReviewer": {
                "value": "No reviewer selected"
            },
            "TR_SelectedReviewerId": {
                "value": ""
            },
            "TR_Style_all": {
                "value": "contained"
            },
            "TR_Style_new": {
                "value": "text"
            },
            "TR_Style_assigned": {
                "value": "text"
            },
            "TR_Style_approaching": {
                "value": "text"
            },
            "TR_Style_overdue": {
                "value": "text"
            },
            "TR_Style_completed": {
                "value": "text"
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
            "entitySchemaName": "UsrRequestApproval",
            "attributes": {
                "UsrRequest_UsrNumber": {
                    "path": "UsrRequest.UsrNumber"
                },
                "UsrRequest_UsrName": {
                    "path": "UsrRequest.UsrName"
                },
                "UsrRequest_UsrContract": {
                    "path": "UsrRequest.UsrContract"
                },
                "UsrRequest_UsrAccount": {
                    "path": "UsrRequest.UsrAccount"
                },
                "UsrRequest_UsrProject": {
                    "path": "UsrRequest.UsrProject"
                },
                "UsrRequest_CreatedBy": {
                    "path": "UsrRequest.CreatedBy"
                },
                "UsrRequest_CreatedOn": {
                    "path": "UsrRequest.CreatedOn"
                },
                "CreatedOn": {
                    "path": "CreatedOn"
                },
                "UsrAssignedTo": {
                    "path": "UsrAssignedTo"
                },
                "UsrAssignedOn": {
                    "path": "UsrAssignedOn"
                },
                "UsrDueOn": {
                    "path": "UsrDueOn"
                },
                "UsrStage": {
                    "path": "UsrStage"
                },
                "UsrDecision": {
                    "path": "UsrDecision"
                },
                "UsrIsCompleted": {
                    "path": "UsrIsCompleted"
                }
            }
        }
    }
]
/**SCHEMA_MODEL_CONFIG_DIFF*/,
        handlers: /**SCHEMA_HANDLERS*/[
            {
                request: "crt.HandleViewModelInitRequest",
                handler: (request, next) => technicalRuntime.handle("crt.HandleViewModelInitRequest", request, next)
            },
            {
                request: "crt.LoadDataRequest",
                handler: (request, next) => technicalRuntime.handle("crt.LoadDataRequest", request, next)
            },
            {
                request: "crt.HandleViewModelAttributeChangeRequest",
                handler: (request, next) => technicalRuntime.handle("crt.HandleViewModelAttributeChangeRequest", request, next)
            },
            {
                request: "usr.TRSelectFilter",
                handler: (request, next) => technicalRuntime.handle("usr.TRSelectFilter", request, next)
            },
            {
                request: "usr.TRRefresh",
                handler: (request, next) => technicalRuntime.handle("usr.TRRefresh", request, next)
            },
            {
                request: "usr.TROpenWorkspace",
                handler: (request, next) => technicalRuntime.handle("usr.TROpenWorkspace", request, next)
            },
            {
                request: "usr.TRAssign",
                handler: (request, next) => technicalRuntime.handle("usr.TRAssign", request, next)
            },
            {
                request: "usr.TRPickReviewer",
                handler: (request, next) => technicalRuntime.handle("usr.TRPickReviewer", request, next)
            },
            {
                request: "usr.TRCommitAssign",
                handler: (request, next) => technicalRuntime.handle("usr.TRCommitAssign", request, next)
            },
            {
                request: "usr.TRCancelAssign",
                handler: (request, next) => technicalRuntime.handle("usr.TRCancelAssign", request, next)
            },
            {
                request: "usr.TRExport",
                handler: (request, next) => technicalRuntime.handle("usr.TRExport", request, next)
            },
            {
                request: "crt.HandleViewModelResumeRequest",
                handler: (request, next) => technicalRuntime.handle("crt.HandleViewModelResumeRequest", request, next)
            },
            {
                request: "crt.HandleViewModelDestroyRequest",
                handler: (request, next) => technicalRuntime.handle("crt.HandleViewModelDestroyRequest", request, next)
            }
        ]/**SCHEMA_HANDLERS*/,
        converters: /**SCHEMA_CONVERTERS*/{} /**SCHEMA_CONVERTERS*/,
        validators: /**SCHEMA_VALIDATORS*/{} /**SCHEMA_VALIDATORS*/
    };
});
