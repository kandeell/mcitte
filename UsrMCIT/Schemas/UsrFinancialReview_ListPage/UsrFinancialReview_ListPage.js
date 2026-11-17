define("UsrFinancialReview_ListPage", /**SCHEMA_DEPS*/["UsrFinancialReviewRuntime"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(frRuntime)/**SCHEMA_ARGS*/ {
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
				"name": "AddButton",
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
					"visible": false,
					"rootSchemaName": "UsrRequestApproval"
				}
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
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
							"caption": "Assigned Reviewer",
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
					"classes": [
						"usr-fr-datagrid"
					],
					"features": {
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						},
						"header": {
							"visible": true
						},
						"columns": {
							"dragAndDrop": true,
							"resizing": true,
							"sorting": true
						},
						"editable": {
							"enable": false,
							"itemsCreation": false,
							"floatingEditPanel": false
						}
					},
					"rowToolbarItems": [],
					"rowDoubleClick": {
						"request": "usr.FROpenWorkspace",
						"params": {
							"taskId": "$Items.PDS_Id"
						},
						"useRelativeContext": true
					}
				}
			},
			{
				"operation": "move",
				"name": "DataTable",
				"parentName": "FR_Root",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "merge",
				"name": "Dashboards",
				"values": {
					"visible": false
				}
			},
			{
				"operation": "insert",
				"name": "FR_Root",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"classes": [
						"usr-fr-root"
					]
				},
				"parentName": "SectionContentWrapper",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FR_Header",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"items": [],
					"classes": [
						"usr-fr-header"
					]
				},
				"parentName": "FR_Root",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FR_HeadTitles",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"classes": [
						"usr-fr-headtitles"
					]
				},
				"parentName": "FR_Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FR_Title",
				"values": {
					"type": "crt.Label",
					"caption": "Financial Review Queue",
					"labelType": "headline-1-small",
					"labelEllipsis": false,
					"classes": [
						"usr-fr-title"
					],
					"labelThickness": "semibold",
					"labelColor": "#11213A",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start"
				},
				"parentName": "FR_HeadTitles",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FR_Subtitle",
				"values": {
					"type": "crt.Label",
					"caption": "$FR_Subtitle",
					"labelType": "body",
					"labelEllipsis": false,
					"classes": [
						"usr-fr-subtitle"
					],
					"labelThickness": "default",
					"labelColor": "#64748B",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start"
				},
				"parentName": "FR_HeadTitles",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FR_Export",
				"values": {
					"type": "crt.Button",
					"caption": "Export",
					"color": "outline",
					"size": "medium",
					"displayType": "contained",
					"iconPosition": "left-icon",
					"clicked": {
						"request": "usr.FRExport",
						"params": {}
					},
					"classes": [
						"usr-fr-export"
					],
					"icon": "export-data-button-icon"
				},
				"parentName": "FR_Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FR_Metrics",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"items": [],
					"classes": [
						"usr-fr-metrics"
					]
				},
				"parentName": "FR_Root",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FR_Card_new",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"classes": [
						"usr-fr-card",
						"usr-fr-card-new"
					]
				},
				"parentName": "FR_Metrics",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FR_Card_newCaption",
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
				"parentName": "FR_Card_new",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FR_Card_newValue",
				"values": {
					"type": "crt.Label",
					"caption": "$FR_Count_new",
					"labelType": "headline-1-small",
					"labelEllipsis": false,
					"classes": [
						"usr-fr-card-value"
					],
					"labelThickness": "semibold",
					"labelColor": "#6725B8",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start"
				},
				"parentName": "FR_Card_new",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FR_Card_assigned",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"classes": [
						"usr-fr-card",
						"usr-fr-card-assigned"
					]
				},
				"parentName": "FR_Metrics",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FR_Card_assignedCaption",
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
				"parentName": "FR_Card_assigned",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FR_Card_assignedValue",
				"values": {
					"type": "crt.Label",
					"caption": "$FR_Count_assigned",
					"labelType": "headline-1-small",
					"labelEllipsis": false,
					"classes": [
						"usr-fr-card-value"
					],
					"labelThickness": "semibold",
					"labelColor": "#6725B8",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start"
				},
				"parentName": "FR_Card_assigned",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FR_Card_approaching",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"classes": [
						"usr-fr-card",
						"usr-fr-card-approaching"
					]
				},
				"parentName": "FR_Metrics",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "FR_Card_approachingCaption",
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
				"parentName": "FR_Card_approaching",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FR_Card_approachingValue",
				"values": {
					"type": "crt.Label",
					"caption": "$FR_Count_approaching",
					"labelType": "headline-1-small",
					"labelEllipsis": false,
					"classes": [
						"usr-fr-card-value"
					],
					"labelThickness": "semibold",
					"labelColor": "#DD7B00",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start"
				},
				"parentName": "FR_Card_approaching",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FR_Card_overdue",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"classes": [
						"usr-fr-card",
						"usr-fr-card-overdue"
					]
				},
				"parentName": "FR_Metrics",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "FR_Card_overdueCaption",
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
				"parentName": "FR_Card_overdue",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FR_Card_overdueValue",
				"values": {
					"type": "crt.Label",
					"caption": "$FR_Count_overdue",
					"labelType": "headline-1-small",
					"labelEllipsis": false,
					"classes": [
						"usr-fr-card-value"
					],
					"labelThickness": "semibold",
					"labelColor": "#DE2631",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start"
				},
				"parentName": "FR_Card_overdue",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FR_Card_completed",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"classes": [
						"usr-fr-card",
						"usr-fr-card-completed"
					]
				},
				"parentName": "FR_Metrics",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "FR_Card_completedCaption",
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
				"parentName": "FR_Card_completed",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FR_Card_completedValue",
				"values": {
					"type": "crt.Label",
					"caption": "$FR_Count_completed",
					"labelType": "headline-1-small",
					"labelEllipsis": false,
					"classes": [
						"usr-fr-card-value"
					],
					"labelThickness": "semibold",
					"labelColor": "#0A9F62",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start"
				},
				"parentName": "FR_Card_completed",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FR_Toolbar",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"classes": [
						"usr-fr-toolbar"
					]
				},
				"parentName": "FR_Root",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "FR_SearchInput",
				"values": {
					"type": "crt.Input",
					"labelPosition": "hidden",
					"placeholder": "Search request ID, title, authority or project...",
					"control": "$FR_SearchText",
					"classes": [
						"usr-fr-search"
					]
				},
				"parentName": "FR_Toolbar",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FR_Filters",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"items": [],
					"classes": [
						"usr-fr-chips"
					]
				},
				"parentName": "FR_Toolbar",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FR_Filter_all",
				"values": {
					"type": "crt.Button",
					"caption": "$FR_Chip_all",
					"color": "primary",
					"size": "small",
					"displayType": "$FR_Style_all",
					"iconPosition": "only-text",
					"clicked": {
						"request": "usr.FRSelectFilter",
						"params": {
							"filter": "all"
						}
					},
					"classes": [
						"usr-fr-chip",
						"usr-fr-chip-all"
					]
				},
				"parentName": "FR_Filters",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FR_Filter_new",
				"values": {
					"type": "crt.Button",
					"caption": "$FR_Chip_new",
					"color": "primary",
					"size": "small",
					"displayType": "$FR_Style_new",
					"iconPosition": "only-text",
					"clicked": {
						"request": "usr.FRSelectFilter",
						"params": {
							"filter": "new"
						}
					},
					"classes": [
						"usr-fr-chip",
						"usr-fr-chip-new"
					]
				},
				"parentName": "FR_Filters",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FR_Filter_assigned",
				"values": {
					"type": "crt.Button",
					"caption": "$FR_Chip_assigned",
					"color": "primary",
					"size": "small",
					"displayType": "$FR_Style_assigned",
					"iconPosition": "only-text",
					"clicked": {
						"request": "usr.FRSelectFilter",
						"params": {
							"filter": "assigned"
						}
					},
					"classes": [
						"usr-fr-chip",
						"usr-fr-chip-assigned"
					]
				},
				"parentName": "FR_Filters",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "FR_Filter_approaching",
				"values": {
					"type": "crt.Button",
					"caption": "$FR_Chip_approaching",
					"color": "primary",
					"size": "small",
					"displayType": "$FR_Style_approaching",
					"iconPosition": "only-text",
					"clicked": {
						"request": "usr.FRSelectFilter",
						"params": {
							"filter": "approaching"
						}
					},
					"classes": [
						"usr-fr-chip",
						"usr-fr-chip-approaching"
					]
				},
				"parentName": "FR_Filters",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "FR_Filter_overdue",
				"values": {
					"type": "crt.Button",
					"caption": "$FR_Chip_overdue",
					"color": "primary",
					"size": "small",
					"displayType": "$FR_Style_overdue",
					"iconPosition": "only-text",
					"clicked": {
						"request": "usr.FRSelectFilter",
						"params": {
							"filter": "overdue"
						}
					},
					"classes": [
						"usr-fr-chip",
						"usr-fr-chip-overdue"
					]
				},
				"parentName": "FR_Filters",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "FR_Filter_completed",
				"values": {
					"type": "crt.Button",
					"caption": "$FR_Chip_completed",
					"color": "primary",
					"size": "small",
					"displayType": "$FR_Style_completed",
					"iconPosition": "only-text",
					"clicked": {
						"request": "usr.FRSelectFilter",
						"params": {
							"filter": "completed"
						}
					},
					"classes": [
						"usr-fr-chip",
						"usr-fr-chip-completed"
					]
				},
				"parentName": "FR_Filters",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "FR_Notice",
				"values": {
					"type": "crt.Label",
					"caption": "$FR_Message",
					"labelType": "body",
					"labelEllipsis": false,
					"classes": [
						"usr-fr-notice"
					]
				},
				"parentName": "FR_Root",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "FR_Footer",
				"values": {
					"type": "crt.Label",
					"caption": "$FR_Footer",
					"labelType": "body",
					"labelEllipsis": false,
					"classes": [
						"usr-fr-footer"
					]
				},
				"parentName": "FR_Root",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "FR_AssignDialog",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"wrap": "nowrap",
					"visible": "$FR_AssignVisible",
					"classes": [
						"usr-fr-dialog"
					]
				},
				"parentName": "FR_Root",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "FR_AssignDialogTitle",
				"values": {
					"type": "crt.Label",
					"caption": "Assign Task",
					"labelType": "body",
					"classes": [
						"usr-fr-dialog-title"
					]
				},
				"parentName": "FR_AssignDialog",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FR_AssignDialogTask",
				"values": {
					"type": "crt.Label",
					"caption": "$FR_AssignTitle",
					"labelType": "body"
				},
				"parentName": "FR_AssignDialog",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FR_AssignDialogReviewer",
				"values": {
					"type": "crt.Label",
					"caption": "$FR_SelectedReviewer",
					"labelType": "body",
					"classes": [
						"usr-fr-dialog-selection"
					]
				},
				"parentName": "FR_AssignDialog",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "FR_PickReviewer",
				"values": {
					"type": "crt.Button",
					"caption": "Select Financial Reviewer",
					"size": "medium",
					"displayType": "contained",
					"color": "default",
					"clicked": {
						"request": "usr.FRPickReviewer"
					}
				},
				"parentName": "FR_AssignDialog",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "FR_AssignDialogActions",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"items": [],
					"classes": [
						"usr-fr-dialog-actions"
					]
				},
				"parentName": "FR_AssignDialog",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "FR_AssignCancel",
				"values": {
					"type": "crt.Button",
					"caption": "Cancel",
					"size": "small",
					"displayType": "text",
					"color": "default",
					"clicked": {
						"request": "usr.FRCancelAssign"
					}
				},
				"parentName": "FR_AssignDialogActions",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FR_AssignConfirm",
				"values": {
					"type": "crt.Button",
					"caption": "Assign",
					"size": "small",
					"displayType": "contained",
					"color": "accent",
					"clicked": {
						"request": "usr.FRCommitAssign"
					}
				},
				"parentName": "FR_AssignDialogActions",
				"propertyName": "items",
				"index": 1
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"attributes"
				],
				"values": {
					"FR_Subtitle": {
						"value": "Loading reviews..."
					},
					"FR_SearchText": {
						"value": ""
					},
					"FR_Message": {
						"value": ""
					},
					"FR_Footer": {
						"value": ""
					},
					"FR_Count_all": {
						"value": "0"
					},
					"FR_Chip_all": {
						"value": "all (0)"
					},
					"FR_Count_new": {
						"value": "0"
					},
					"FR_Chip_new": {
						"value": "new (0)"
					},
					"FR_Count_assigned": {
						"value": "0"
					},
					"FR_Chip_assigned": {
						"value": "assigned (0)"
					},
					"FR_Count_approaching": {
						"value": "0"
					},
					"FR_Chip_approaching": {
						"value": "approaching (0)"
					},
					"FR_Count_overdue": {
						"value": "0"
					},
					"FR_Chip_overdue": {
						"value": "overdue (0)"
					},
					"FR_Count_completed": {
						"value": "0"
					},
					"FR_Chip_completed": {
						"value": "completed (0)"
					},
					"FR_AssignVisible": {
						"value": false
					},
					"FR_AssignTitle": {
						"value": ""
					},
					"FR_SelectedReviewer": {
						"value": "No reviewer selected"
					},
					"FR_SelectedReviewerId": {
						"value": ""
					},
					"FR_Style_all": {
						"value": "contained"
					},
					"FR_Style_new": {
						"value": "text"
					},
					"FR_Style_assigned": {
						"value": "text"
					},
					"FR_Style_approaching": {
						"value": "text"
					},
					"FR_Style_overdue": {
						"value": "text"
					},
					"FR_Style_completed": {
						"value": "text"
					}
				}
			},
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
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[
            {
                request: "crt.HandleViewModelInitRequest",
                handler: (req, next) => frRuntime.handle("crt.HandleViewModelInitRequest", req, next)
            },
            {
                request: "crt.LoadDataRequest",
                handler: (req, next) => frRuntime.handle("crt.LoadDataRequest", req, next)
            },
            {
                request: "crt.HandleViewModelAttributeChangeRequest",
                handler: (req, next) => frRuntime.handle("crt.HandleViewModelAttributeChangeRequest", req, next)
            },
            {
                request: "usr.FRSelectFilter",
                handler: (req, next) => frRuntime.handle("usr.FRSelectFilter", req, next)
            },
            {
                request: "usr.FRRefresh",
                handler: (req, next) => frRuntime.handle("usr.FRRefresh", req, next)
            },
            {
                request: "usr.FROpenWorkspace",
                handler: (req, next) => frRuntime.handle("usr.FROpenWorkspace", req, next)
            },
            {
                request: "usr.FRAssign",
                handler: (req, next) => frRuntime.handle("usr.FRAssign", req, next)
            },
            {
                request: "usr.FRPickReviewer",
                handler: (req, next) => frRuntime.handle("usr.FRPickReviewer", req, next)
            },
            {
                request: "usr.FRCommitAssign",
                handler: (req, next) => frRuntime.handle("usr.FRCommitAssign", req, next)
            },
            {
                request: "usr.FRCancelAssign",
                handler: (req, next) => frRuntime.handle("usr.FRCancelAssign", req, next)
            },
            {
                request: "usr.FRExport",
                handler: (req, next) => frRuntime.handle("usr.FRExport", req, next)
            },
            {
                request: "crt.HandleViewModelResumeRequest",
                handler: (req, next) => frRuntime.handle("crt.HandleViewModelResumeRequest", req, next)
            },
            {
                request: "crt.HandleViewModelDestroyRequest",
                handler: (req, next) => frRuntime.handle("crt.HandleViewModelDestroyRequest", req, next)
            }
        ]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{} /**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{} /**SCHEMA_VALIDATORS*/
	};
});