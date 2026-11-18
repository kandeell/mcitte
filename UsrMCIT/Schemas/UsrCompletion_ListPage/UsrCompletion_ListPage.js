define("UsrCompletion_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "remove",
				"name": "MainHeader"
			},
			{
				"operation": "remove",
				"name": "TitleContainer"
			},
			{
				"operation": "remove",
				"name": "PageTitle"
			},
			{
				"operation": "remove",
				"name": "ActionButtonsContainer"
			},
			{
				"operation": "remove",
				"name": "AddButton"
			},
			{
				"operation": "remove",
				"name": "DataImportButton"
			},
			{
				"operation": "remove",
				"name": "MenuItem_ImportFromExcel"
			},
			{
				"operation": "remove",
				"name": "OpenLandingDesigner"
			},
			{
				"operation": "remove",
				"name": "ActionButton"
			},
			{
				"operation": "remove",
				"name": "MenuItem_ExportToExcel"
			},
			{
				"operation": "remove",
				"name": "MainContainer"
			},
			{
				"operation": "remove",
				"name": "MainFilterContainer"
			},
			{
				"operation": "remove",
				"name": "LeftFilterContainer"
			},
			{
				"operation": "remove",
				"name": "LeftFilterContainerInner"
			},
			{
				"operation": "remove",
				"name": "FolderTreeActions"
			},
			{
				"operation": "remove",
				"name": "FiltersMenu"
			},
			{
				"operation": "remove",
				"name": "LookupQuickFilterByTag"
			},
			{
				"operation": "remove",
				"name": "SearchFilter"
			},
			{
				"operation": "remove",
				"name": "RightFilterContainer"
			},
			{
				"operation": "remove",
				"name": "DataTable_Summaries"
			},
			{
				"operation": "remove",
				"name": "RefreshButton"
			},
			{
				"operation": "remove",
				"name": "MainButtonToggleGroup"
			},
			{
				"operation": "remove",
				"name": "ContentContainer"
			},
			{
				"operation": "remove",
				"name": "FolderTree"
			},
			{
				"operation": "remove",
				"name": "Filters"
			},
			{
				"operation": "remove",
				"name": "SectionContentWrapper"
			},
			{
				"operation": "remove",
				"name": "MainTabPanel"
			},
			{
				"operation": "remove",
				"name": "ListTabContainer"
			},
			{
				"operation": "remove",
				"name": "ListContainer"
			},
			{
				"operation": "remove",
				"name": "DataTable"
			},
			{
				"operation": "remove",
				"name": "DashboardsTabContainer"
			},
			{
				"operation": "remove",
				"name": "DashboardsContainer"
			},
			{
				"operation": "remove",
				"name": "Dashboards"
			},
			{
				"operation": "insert",
				"name": "CompletionContent",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"gap": "medium",
					"items": [],
					"padding": {
						"top": "large",
						"right": "large",
						"bottom": "large",
						"left": "large"
					},
					"color": "primary"
				},
				"parentName": "Main",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "CompletionTitle",
				"values": {
					"type": "crt.Label",
					"caption": "Request Completion",
					"labelType": "headline-2",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "CompletionContent",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "CompletionSubtitle",
				"values": {
					"type": "crt.Label",
					"caption": "Review VM provisioning records and track completed requests.",
					"labelType": "body-large",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "CompletionContent",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "CompletionTabs",
				"values": {
					"type": "crt.TabPanel",
					"items": [],
					"styleType": "default",
					"mode": "tab",
					"bodyBackgroundColor": "primary-contrast-500",
					"selectedTabTitleColor": "auto",
					"tabTitleColor": "auto",
					"underlineSelectedTabColor": "auto",
					"headerBackgroundColor": "auto",
					"allowToggleClose": true
				},
				"parentName": "CompletionContent",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "ReviewTab",
				"values": {
					"type": "crt.TabContainer",
					"caption": "Provisioning Review",
					"items": [],
					"iconPosition": "only-text"
				},
				"parentName": "CompletionTabs",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ReviewBody",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"gap": "medium",
					"items": []
				},
				"parentName": "ReviewTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ReviewHelp",
				"values": {
					"type": "crt.Label",
					"caption": "Review the VM items, then select one request and click Close Request.",
					"labelType": "body-large",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "ReviewBody",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ReviewSearch",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "Search requests…",
					"iconOnly": false,
					"_filterOptions": {
						"expose": [
							{
								"attribute": "ReviewSearchFilter",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"ReviewRows"
										]
									}
								]
							}
						],
						"from": [
							"ReviewSearchValue",
							"ReviewSearchColumns"
						]
					}
				},
				"parentName": "ReviewBody",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "CloseProvisionedRequest",
				"values": {
					"type": "crt.Button",
					"caption": "Close Request",
					"color": "primary",
					"size": "medium",
					"iconPosition": "only-text",
					"clicked": {
						"request": "crt.RunBusinessProcessRequest",
						"params": {
							"processName": "UsrMCITCloseProvisionedRequest",
							"processRunType": "ForTheSelectedRecords",
							"saveAtProcessStart": false,
							"showNotification": false,
							"dataSourceName": "ReviewDS",
							"parameterMappings": {
								"RequestId": "Id"
							},
							"filters": "$ReviewRows | crt.ToCollectionFilters : 'ReviewRows' : $ReviewSelection | crt.SkipIfSelectionEmpty : $ReviewSelection",
							"selectionStateAttributeName": "ReviewSelection"
						}
					}
				},
				"parentName": "ReviewBody",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "ReviewGrid",
				"values": {
					"type": "crt.DataGrid",
					"items": "$ReviewRows",
					"primaryColumnName": "ReviewDS_Id",
					"fitContent": true,
					"sorting": "$ReviewSorting | crt.ToDataTableSortingConfig: 'ReviewRows'",
					"selectionState": "$ReviewSelection",
					"features": {
						"editable": {
							"enable": false,
							"itemsCreation": false
						},
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						}
					},
					"rowToolbarItems": [
						{
							"type": "crt.MenuItem",
							"caption": "Open request",
							"icon": "edit-row-action",
							"clicked": {
								"request": "crt.OpenPageRequest",
								"params": {
									"schemaName": "UsrMCITRequestDetail_Page",
									"modelInitConfigs": [
										{
											"action": "edit",
											"recordId": "$ReviewRows.ReviewDS_Id"
										}
									]
								}
							}
						}
					],
					"columns": [
						{
							"id": "542634d6-7460-50e0-a800-ca70a4b8f73c",
							"code": "ReviewDS_UsrNumber",
							"path": "UsrNumber",
							"caption": "Request ID",
							"dataValueType": 1
						},
						{
							"id": "79a0080c-4b1c-5f8d-8276-81e8be3daaab",
							"code": "ReviewDS_UsrName",
							"path": "UsrName",
							"caption": "Title",
							"dataValueType": 1
						},
						{
							"id": "5a25c4ad-5ead-5802-9546-20b652aaad3f",
							"code": "ReviewDS_UsrAccount",
							"path": "UsrAccount",
							"caption": "Authority",
							"dataValueType": 10
						},
						{
							"id": "ae7474d9-5411-5e41-a1fd-a0f5aca9e4cd",
							"code": "ReviewDS_UsrProject",
							"path": "UsrProject",
							"caption": "Project",
							"dataValueType": 10
						},
						{
							"id": "2885f142-7f33-5de9-8468-dbc3907f7479",
							"code": "ReviewDS_UsrSubmittedOn",
							"path": "UsrSubmittedOn",
							"caption": "Submitted",
							"dataValueType": 7
						},
						{
							"id": "8ec129ad-c6c1-5121-9cba-00d1871b3dc9",
							"code": "ReviewDS_UsrStatus",
							"path": "UsrStatus",
							"caption": "Status",
							"dataValueType": 10
						}
					],
					"_selectionOptions": {
						"attribute": "ReviewSelection"
					},
					"style": "plain-white"
				},
				"parentName": "ReviewBody",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "ClosedTab",
				"values": {
					"type": "crt.TabContainer",
					"caption": "Completed",
					"items": [],
					"iconPosition": "only-text"
				},
				"parentName": "CompletionTabs",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "ClosedBody",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"gap": "medium",
					"items": []
				},
				"parentName": "ClosedTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ClosedSearch",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "Search requests…",
					"iconOnly": false,
					"_filterOptions": {
						"expose": [
							{
								"attribute": "ClosedSearchFilter",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"ClosedRows"
										]
									}
								]
							}
						],
						"from": [
							"ClosedSearchValue",
							"ClosedSearchColumns"
						]
					}
				},
				"parentName": "ClosedBody",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ClosedGrid",
				"values": {
					"type": "crt.DataGrid",
					"items": "$ClosedRows",
					"primaryColumnName": "ClosedDS_Id",
					"fitContent": true,
					"sorting": "$ClosedSorting | crt.ToDataTableSortingConfig: 'ClosedRows'",
					"features": {
						"editable": {
							"enable": false,
							"itemsCreation": false
						},
						"rows": {
							"selection": {
								"enable": false
							}
						}
					},
					"rowToolbarItems": [
						{
							"type": "crt.MenuItem",
							"caption": "Open request",
							"icon": "edit-row-action",
							"clicked": {
								"request": "crt.OpenPageRequest",
								"params": {
									"schemaName": "UsrMCITRequestDetail_Page",
									"modelInitConfigs": [
										{
											"action": "edit",
											"recordId": "$ClosedRows.ClosedDS_Id"
										}
									]
								}
							}
						}
					],
					"columns": [
						{
							"id": "375725ec-6373-5b1d-ab5c-5dc08a6ee9b2",
							"code": "ClosedDS_UsrNumber",
							"path": "UsrNumber",
							"caption": "Request ID",
							"dataValueType": 1
						},
						{
							"id": "aaa0da7e-00ed-5e5d-b410-2d7dc134f215",
							"code": "ClosedDS_UsrName",
							"path": "UsrName",
							"caption": "Title",
							"dataValueType": 1
						},
						{
							"id": "80434625-9837-5345-948b-7d0b2e6350de",
							"code": "ClosedDS_UsrAccount",
							"path": "UsrAccount",
							"caption": "Authority",
							"dataValueType": 10
						},
						{
							"id": "4f6aaad1-d41b-5568-9326-9c1f3e6fb0f6",
							"code": "ClosedDS_UsrProject",
							"path": "UsrProject",
							"caption": "Project",
							"dataValueType": 10
						},
						{
							"id": "591f4442-ad0a-521d-afa7-9d6bc864cc4f",
							"code": "ClosedDS_UsrSubmittedOn",
							"path": "UsrSubmittedOn",
							"caption": "Submitted",
							"dataValueType": 7
						},
						{
							"id": "2488218b-2e89-5d52-a626-b8b6703b29f8",
							"code": "ClosedDS_UsrStatus",
							"path": "UsrStatus",
							"caption": "Status",
							"dataValueType": 10
						}
					]
				},
				"parentName": "ClosedBody",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SummaryTab",
				"values": {
					"type": "crt.TabContainer",
					"caption": "#ResourceString(SummaryTab_caption)#",
					"items": [],
					"iconPosition": "only-text",
					"visible": false
				},
				"parentName": "CompletionTabs",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SummaryBody",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"gap": "medium",
					"items": []
				},
				"parentName": "SummaryTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SummaryHelp",
				"values": {
					"type": "crt.Label",
					"caption": "Search by request ID or VM name to find records with a provisioning date.",
					"labelType": "body-large",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "SummaryBody",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SummarySearch",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "Search by request ID or VM name…",
					"iconOnly": false,
					"_filterOptions": {
						"expose": [
							{
								"attribute": "SummarySearchFilter",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"SummaryRows"
										]
									}
								]
							}
						],
						"from": [
							"SummarySearchValue",
							"SummarySearchColumns"
						]
					}
				},
				"parentName": "SummaryBody",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SummaryGrid",
				"values": {
					"type": "crt.DataGrid",
					"items": "$SummaryRows",
					"primaryColumnName": "SummaryDS_Id",
					"fitContent": true,
					"sorting": "$SummarySorting | crt.ToDataTableSortingConfig: 'SummaryRows'",
					"features": {
						"editable": {
							"enable": false,
							"itemsCreation": false
						},
						"rows": {
							"selection": {
								"enable": false
							}
						}
					},
					"rowToolbarItems": [],
					"columns": [
						{
							"id": "8eb1e389-2681-5752-8b25-de480661c5df",
							"code": "SummaryDS_UsrSourceRequestItem_UsrRequest_UsrNumber",
							"path": "UsrSourceRequestItem.UsrRequest.UsrNumber",
							"caption": "Request ID",
							"dataValueType": 1
						},
						{
							"id": "dc076bb9-80cc-524b-b116-9cfce9e636c6",
							"code": "SummaryDS_UsrSourceRequestItem_UsrPurpose",
							"path": "UsrSourceRequestItem.UsrPurpose",
							"caption": "Purpose",
							"dataValueType": 1
						},
						{
							"id": "12090cc1-ec6a-53fa-bdb6-986726800389",
							"code": "SummaryDS_UsrName",
							"path": "UsrName",
							"caption": "VM Name",
							"dataValueType": 1
						},
						{
							"id": "ec3612c0-01e0-59e2-a3fd-4c042ffac589",
							"code": "SummaryDS_UsrStatus",
							"path": "UsrStatus",
							"caption": "VM Status",
							"dataValueType": 10
						},
						{
							"id": "ad2737fb-6ced-597f-851d-d9f5d5205957",
							"code": "SummaryDS_UsrIPAddress",
							"path": "UsrIPAddress",
							"caption": "IP Address",
							"dataValueType": 1
						},
						{
							"id": "f152a139-e6bd-5c7b-914b-39d3cb8d8b24",
							"code": "SummaryDS_UsrCPU",
							"path": "UsrCPU",
							"caption": "Recorded vCPU",
							"dataValueType": 4
						},
						{
							"id": "fa9cea57-6d7c-55de-9f7c-fcf0670d7ec8",
							"code": "SummaryDS_UsrRAMGB",
							"path": "UsrRAMGB",
							"caption": "Recorded RAM (GB)",
							"dataValueType": 5
						},
						{
							"id": "f76d64a1-f0a6-5a7b-b3a3-b4345730e254",
							"code": "SummaryDS_UsrStorageGB",
							"path": "UsrStorageGB",
							"caption": "Recorded Storage (GB)",
							"dataValueType": 5
						},
						{
							"id": "b4357f41-49c4-57ec-ab11-273106ec801b",
							"code": "SummaryDS_UsrProvisionedOn",
							"path": "UsrProvisionedOn",
							"caption": "Provisioned on",
							"dataValueType": 7
						}
					]
				},
				"parentName": "SummaryBody",
				"propertyName": "items",
				"index": 2
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"attributes"
				],
				"values": {
					"ReviewRows": {
						"isCollection": true,
						"modelConfig": {
							"path": "ReviewDS",
							"pagingConfig": {
								"rowCount": 30
							},
							"sortingConfig": {
								"attributeName": "ReviewSorting",
								"default": [
									{
										"direction": "asc",
										"columnName": "UsrName"
									}
								]
							},
							"filterAttributes": [
								{
									"name": "ReviewCriteria",
									"loadOnChange": true
								},
								{
									"name": "ReviewSearchFilter",
									"loadOnChange": true
								},
								{
									"name": "ReviewSearch_ReviewRows",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"ReviewDS_Id": {
									"modelConfig": {
										"path": "ReviewDS.Id"
									}
								},
								"ReviewDS_UsrNumber": {
									"modelConfig": {
										"path": "ReviewDS.UsrNumber"
									}
								},
								"ReviewDS_UsrName": {
									"modelConfig": {
										"path": "ReviewDS.UsrName"
									}
								},
								"ReviewDS_UsrAccount": {
									"modelConfig": {
										"path": "ReviewDS.UsrAccount"
									}
								},
								"ReviewDS_UsrProject": {
									"modelConfig": {
										"path": "ReviewDS.UsrProject"
									}
								},
								"ReviewDS_UsrSubmittedOn": {
									"modelConfig": {
										"path": "ReviewDS.UsrSubmittedOn"
									}
								},
								"ReviewDS_UsrStatus": {
									"modelConfig": {
										"path": "ReviewDS.UsrStatus"
									}
								}
							}
						}
					},
					"ReviewSorting": {},
					"ReviewSelection": {},
					"ReviewCriteria": {
						"value": {
							"items": {
								"RequestType": {
									"filterType": 1,
									"comparisonType": 3,
									"isEnabled": true,
									"leftExpression": {
										"expressionType": 0,
										"columnPath": "UsrRequestType.Name"
									},
									"rightExpression": {
										"expressionType": 2,
										"parameter": {
											"dataValueType": 1,
											"value": "New VM Provisioning"
										}
									},
									"dataValueType": 1
								},
								"RequestStatus": {
									"filterType": 1,
									"comparisonType": 3,
									"isEnabled": true,
									"leftExpression": {
										"expressionType": 0,
										"columnPath": "UsrStatus.Name"
									},
									"rightExpression": {
										"expressionType": 2,
										"parameter": {
											"dataValueType": 1,
											"value": "Provisioning in Progress"
										}
									},
									"dataValueType": 1
								}
							},
							"logicalOperation": 0,
							"isEnabled": true,
							"filterType": 6,
							"rootSchemaName": "UsrVMRequest"
						}
					},
					"ReviewSearchFilter": {
						"value": {
							"items": {},
							"logicalOperation": 0,
							"isEnabled": true,
							"filterType": 6,
							"rootSchemaName": "UsrVMRequest"
						}
					},
					"ClosedRows": {
						"isCollection": true,
						"modelConfig": {
							"path": "ClosedDS",
							"pagingConfig": {
								"rowCount": 30
							},
							"sortingConfig": {
								"attributeName": "ClosedSorting",
								"default": [
									{
										"columnName": "UsrSubmittedOn",
										"direction": "desc"
									}
								]
							},
							"filterAttributes": [
								{
									"name": "ClosedCriteria",
									"loadOnChange": true
								},
								{
									"name": "ClosedSearchFilter",
									"loadOnChange": true
								},
								{
									"name": "ClosedSearch_ClosedRows",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"ClosedDS_Id": {
									"modelConfig": {
										"path": "ClosedDS.Id"
									}
								},
								"ClosedDS_UsrNumber": {
									"modelConfig": {
										"path": "ClosedDS.UsrNumber"
									}
								},
								"ClosedDS_UsrName": {
									"modelConfig": {
										"path": "ClosedDS.UsrName"
									}
								},
								"ClosedDS_UsrAccount": {
									"modelConfig": {
										"path": "ClosedDS.UsrAccount"
									}
								},
								"ClosedDS_UsrProject": {
									"modelConfig": {
										"path": "ClosedDS.UsrProject"
									}
								},
								"ClosedDS_UsrSubmittedOn": {
									"modelConfig": {
										"path": "ClosedDS.UsrSubmittedOn"
									}
								},
								"ClosedDS_UsrStatus": {
									"modelConfig": {
										"path": "ClosedDS.UsrStatus"
									}
								}
							}
						}
					},
					"ClosedSorting": {},
					"ClosedCriteria": {
						"value": {
							"items": {
								"RequestType": {
									"filterType": 1,
									"comparisonType": 3,
									"isEnabled": true,
									"leftExpression": {
										"expressionType": 0,
										"columnPath": "UsrRequestType.Name"
									},
									"rightExpression": {
										"expressionType": 2,
										"parameter": {
											"dataValueType": 1,
											"value": "New VM Provisioning"
										}
									},
									"dataValueType": 1
								},
								"RequestStatus": {
									"filterType": 1,
									"comparisonType": 3,
									"isEnabled": true,
									"leftExpression": {
										"expressionType": 0,
										"columnPath": "UsrStatus.Name"
									},
									"rightExpression": {
										"expressionType": 2,
										"parameter": {
											"dataValueType": 1,
											"value": "Completed"
										}
									},
									"dataValueType": 1
								}
							},
							"logicalOperation": 0,
							"isEnabled": true,
							"filterType": 6,
							"rootSchemaName": "UsrVMRequest"
						}
					},
					"ClosedSearchFilter": {
						"value": {
							"items": {},
							"logicalOperation": 0,
							"isEnabled": true,
							"filterType": 6,
							"rootSchemaName": "UsrVMRequest"
						}
					},
					"SummaryRows": {
						"isCollection": true,
						"modelConfig": {
							"path": "SummaryDS",
							"pagingConfig": {
								"rowCount": 30
							},
							"sortingConfig": {
								"attributeName": "SummarySorting",
								"default": [
									{
										"columnName": "UsrProvisionedOn",
										"direction": "desc"
									}
								]
							},
							"filterAttributes": [
								{
									"name": "SummaryCriteria",
									"loadOnChange": true
								},
								{
									"name": "SummarySearchFilter",
									"loadOnChange": true
								},
								{
									"name": "SummarySearch_SummaryRows",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"SummaryDS_Id": {
									"modelConfig": {
										"path": "SummaryDS.Id"
									}
								},
								"SummaryDS_UsrSourceRequestItem_UsrRequest_UsrNumber": {
									"modelConfig": {
										"path": "SummaryDS.UsrSourceRequestItem.UsrRequest.UsrNumber"
									}
								},
								"SummaryDS_UsrSourceRequestItem_UsrPurpose": {
									"modelConfig": {
										"path": "SummaryDS.UsrSourceRequestItem.UsrPurpose"
									}
								},
								"SummaryDS_UsrName": {
									"modelConfig": {
										"path": "SummaryDS.UsrName"
									}
								},
								"SummaryDS_UsrStatus": {
									"modelConfig": {
										"path": "SummaryDS.UsrStatus"
									}
								},
								"SummaryDS_UsrIPAddress": {
									"modelConfig": {
										"path": "SummaryDS.UsrIPAddress"
									}
								},
								"SummaryDS_UsrCPU": {
									"modelConfig": {
										"path": "SummaryDS.UsrCPU"
									}
								},
								"SummaryDS_UsrRAMGB": {
									"modelConfig": {
										"path": "SummaryDS.UsrRAMGB"
									}
								},
								"SummaryDS_UsrStorageGB": {
									"modelConfig": {
										"path": "SummaryDS.UsrStorageGB"
									}
								},
								"SummaryDS_UsrProvisionedOn": {
									"modelConfig": {
										"path": "SummaryDS.UsrProvisionedOn"
									}
								}
							}
						}
					},
					"SummarySorting": {},
					"SummaryCriteria": {
						"value": {
							"items": {
								"RequestType": {
									"filterType": 1,
									"comparisonType": 3,
									"isEnabled": true,
									"leftExpression": {
										"expressionType": 0,
										"columnPath": "UsrSourceRequestItem.UsrRequest.UsrRequestType.Name"
									},
									"rightExpression": {
										"expressionType": 2,
										"parameter": {
											"dataValueType": 1,
											"value": "New VM Provisioning"
										}
									},
									"dataValueType": 1
								},
								"QueueStages": {
									"items": {
										"InProgress": {
											"filterType": 1,
											"comparisonType": 3,
											"isEnabled": true,
											"leftExpression": {
												"expressionType": 0,
												"columnPath": "UsrSourceRequestItem.UsrRequest.UsrStatus.Name"
											},
											"rightExpression": {
												"expressionType": 2,
												"parameter": {
													"dataValueType": 1,
													"value": "Provisioning in Progress"
												}
											},
											"dataValueType": 1
										},
										"Completed": {
											"filterType": 1,
											"comparisonType": 3,
											"isEnabled": true,
											"leftExpression": {
												"expressionType": 0,
												"columnPath": "UsrSourceRequestItem.UsrRequest.UsrStatus.Name"
											},
											"rightExpression": {
												"expressionType": 2,
												"parameter": {
													"dataValueType": 1,
													"value": "Completed"
												}
											},
											"dataValueType": 1
										}
									},
									"logicalOperation": 1,
									"isEnabled": true,
									"filterType": 6,
									"rootSchemaName": "UsrVirtualMachine"
								},
								"HasProvisionedDate": {
									"filterType": 2,
									"comparisonType": 2,
									"isNull": false,
									"isEnabled": true,
									"leftExpression": {
										"expressionType": 0,
										"columnPath": "UsrProvisionedOn"
									},
									"dataValueType": 7
								}
							},
							"logicalOperation": 0,
							"isEnabled": true,
							"filterType": 6,
							"rootSchemaName": "UsrVirtualMachine"
						}
					},
					"SummarySearchFilter": {
						"value": {
							"items": {},
							"logicalOperation": 0,
							"isEnabled": true,
							"filterType": 6,
							"rootSchemaName": "UsrVirtualMachine"
						}
					}
				}
			}
		]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"dataSources"
				],
				"values": {
					"ReviewDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "UsrVMRequest",
							"attributes": {
								"Id": {
									"path": "Id"
								},
								"UsrNumber": {
									"path": "UsrNumber"
								},
								"UsrName": {
									"path": "UsrName"
								},
								"UsrAccount": {
									"path": "UsrAccount"
								},
								"UsrProject": {
									"path": "UsrProject"
								},
								"UsrSubmittedOn": {
									"path": "UsrSubmittedOn"
								},
								"UsrStatus": {
									"path": "UsrStatus"
								}
							}
						}
					},
					"ClosedDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "UsrVMRequest",
							"attributes": {
								"Id": {
									"path": "Id"
								},
								"UsrNumber": {
									"path": "UsrNumber"
								},
								"UsrName": {
									"path": "UsrName"
								},
								"UsrAccount": {
									"path": "UsrAccount"
								},
								"UsrProject": {
									"path": "UsrProject"
								},
								"UsrSubmittedOn": {
									"path": "UsrSubmittedOn"
								},
								"UsrStatus": {
									"path": "UsrStatus"
								}
							}
						}
					},
					"SummaryDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "UsrVirtualMachine",
							"attributes": {
								"Id": {
									"path": "Id"
								},
								"UsrSourceRequestItem.UsrRequest.UsrNumber": {
									"path": "UsrSourceRequestItem.UsrRequest.UsrNumber"
								},
								"UsrSourceRequestItem.UsrPurpose": {
									"path": "UsrSourceRequestItem.UsrPurpose"
								},
								"UsrName": {
									"path": "UsrName"
								},
								"UsrStatus": {
									"path": "UsrStatus"
								},
								"UsrIPAddress": {
									"path": "UsrIPAddress"
								},
								"UsrCPU": {
									"path": "UsrCPU"
								},
								"UsrRAMGB": {
									"path": "UsrRAMGB"
								},
								"UsrStorageGB": {
									"path": "UsrStorageGB"
								},
								"UsrProvisionedOn": {
									"path": "UsrProvisionedOn"
								}
							}
						}
					}
				}
			},
			{
				"operation": "merge",
				"path": [
					"dataSources",
					"PDS"
				],
				"values": {
					"scope": "page"
				}
			},
			{
				"operation": "merge",
				"path": [
					"dataSources",
					"PDS",
					"config"
				],
				"values": {
					"entitySchemaName": "UsrVMRequest"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});