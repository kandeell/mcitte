define("UsrVirtualMachineInven_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
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
				"name": "InventoryRoot",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"gap": "medium",
					"color": "primary",
					"padding": {
						"top": "large",
						"right": "large",
						"bottom": "large",
						"left": "large"
					}
				},
				"parentName": "Main",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "InventoryHeading",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"items": [],
					"gap": "medium",
					"justifyContent": "space-between",
					"alignItems": "center"
				},
				"parentName": "InventoryRoot",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "InventoryHeadingText",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": []
				},
				"parentName": "InventoryHeading",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "InventoryTitle",
				"values": {
					"type": "crt.Label",
					"caption": "VM Inventory",
					"labelType": "headline-2",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "InventoryHeadingText",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "InventorySubtitle",
				"values": {
					"type": "crt.Label",
					"caption": "Virtual machines across contracts",
					"labelType": "body-large",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "InventoryHeadingText",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "InventoryNewRequest",
				"values": {
					"type": "crt.Button",
					"caption": "New Provisioning Request",
					"color": "primary",
					"size": "medium",
					"iconPosition": "only-text",
					"clicked": {
						"request": "crt.OpenPageRequest",
						"params": {
							"schemaName": "UsrMCITNewRequest_WizardPage",
							"modelInitConfigs": [
								{
									"action": "add"
								}
							]
						}
					}
				},
				"parentName": "InventoryHeading",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "InventoryInfo",
				"values": {
					"type": "crt.Label",
					"caption": "VM lifecycle status is tracked independently from request status.",
					"labelType": "body-large",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "InventoryRoot",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "InventoryMetrics",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(0, 1fr)",
						"minmax(0, 1fr)",
						"minmax(0, 1fr)",
						"minmax(0, 1fr)",
						"minmax(0, 1fr)",
						"minmax(0, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "medium",
						"rowGap": "medium"
					},
					"items": []
				},
				"parentName": "InventoryRoot",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "InventoryMetricActive",
				"values": {
					"type": "crt.IndicatorWidget",
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"config": {
						"title": "Active",
						"theme": "without-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "{0}",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"providing": {
								"attribute": "InventoryMetricActive_Data",
								"schemaName": "UsrVirtualMachine",
								"filters": {
									"filter": {
										"items": {
											"status0": {
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
														"value": "Active"
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
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "Id"
											},
											"functionType": 2,
											"aggregationType": 1,
											"aggregationEvalType": 1
										}
									}
								},
								"dependencies": []
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"thousandSeparator": ",",
								"decimalPrecision": 0
							},
							"comparisonProviding": null
						},
						"comparison": null
					}
				},
				"parentName": "InventoryMetrics",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "InventoryMetricProvisioning",
				"values": {
					"type": "crt.IndicatorWidget",
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"config": {
						"title": "Provisioning",
						"theme": "without-fill",
						"layout": {
							"color": "blue"
						},
						"text": {
							"template": "{0}",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"providing": {
								"attribute": "InventoryMetricProvisioning_Data",
								"schemaName": "UsrVirtualMachine",
								"filters": {
									"filter": {
										"items": {
											"status0": {
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
														"value": "Provisioning"
													}
												},
												"dataValueType": 1
											},
											"status1": {
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
														"value": "Pending Provisioning"
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
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "Id"
											},
											"functionType": 2,
											"aggregationType": 1,
											"aggregationEvalType": 1
										}
									}
								},
								"dependencies": []
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"thousandSeparator": ",",
								"decimalPrecision": 0
							},
							"comparisonProviding": null
						},
						"comparison": null
					}
				},
				"parentName": "InventoryMetrics",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "InventoryMetricSuspended",
				"values": {
					"type": "crt.IndicatorWidget",
					"layoutConfig": {
						"column": 3,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"config": {
						"title": "Suspended",
						"theme": "without-fill",
						"layout": {
							"color": "orange"
						},
						"text": {
							"template": "{0}",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"providing": {
								"attribute": "InventoryMetricSuspended_Data",
								"schemaName": "UsrVirtualMachine",
								"filters": {
									"filter": {
										"items": {
											"status0": {
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
														"value": "Suspended"
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
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "Id"
											},
											"functionType": 2,
											"aggregationType": 1,
											"aggregationEvalType": 1
										}
									}
								},
								"dependencies": []
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"thousandSeparator": ",",
								"decimalPrecision": 0
							},
							"comparisonProviding": null
						},
						"comparison": null
					}
				},
				"parentName": "InventoryMetrics",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "InventoryMetricTerminating",
				"values": {
					"type": "crt.IndicatorWidget",
					"layoutConfig": {
						"column": 4,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"config": {
						"title": "Term in Progress",
						"theme": "without-fill",
						"layout": {
							"color": "orange"
						},
						"text": {
							"template": "{0}",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"providing": {
								"attribute": "InventoryMetricTerminating_Data",
								"schemaName": "UsrVirtualMachine",
								"filters": {
									"filter": {
										"items": {
											"status0": {
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
														"value": "Termination in Progress"
													}
												},
												"dataValueType": 1
											},
											"status1": {
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
														"value": "Term in Progress"
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
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "Id"
											},
											"functionType": 2,
											"aggregationType": 1,
											"aggregationEvalType": 1
										}
									}
								},
								"dependencies": []
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"thousandSeparator": ",",
								"decimalPrecision": 0
							},
							"comparisonProviding": null
						},
						"comparison": null
					}
				},
				"parentName": "InventoryMetrics",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "InventoryMetricTerminated",
				"values": {
					"type": "crt.IndicatorWidget",
					"layoutConfig": {
						"column": 5,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"config": {
						"title": "Terminated",
						"theme": "without-fill",
						"layout": {
							"color": "gray"
						},
						"text": {
							"template": "{0}",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"providing": {
								"attribute": "InventoryMetricTerminated_Data",
								"schemaName": "UsrVirtualMachine",
								"filters": {
									"filter": {
										"items": {
											"status0": {
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
														"value": "Terminated"
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
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "Id"
											},
											"functionType": 2,
											"aggregationType": 1,
											"aggregationEvalType": 1
										}
									}
								},
								"dependencies": []
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"thousandSeparator": ",",
								"decimalPrecision": 0
							},
							"comparisonProviding": null
						},
						"comparison": null
					}
				},
				"parentName": "InventoryMetrics",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "InventoryMetricContracts",
				"values": {
					"type": "crt.IndicatorWidget",
					"layoutConfig": {
						"column": 6,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"config": {
						"title": "Contracts with VMs",
						"theme": "without-fill",
						"layout": {
							"color": "purple"
						},
						"text": {
							"template": "{0}",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"providing": {
								"attribute": "InventoryMetricContracts_Data",
								"schemaName": "UsrVirtualMachine",
								"filters": {
									"filter": {
										"items": {
											"hasContract": {
												"filterType": 2,
												"comparisonType": 2,
												"isNull": false,
												"isEnabled": true,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "UsrContract"
												},
												"dataValueType": 10
											}
										},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "UsrVirtualMachine"
									},
									"filterAttributes": []
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "UsrContract"
											},
											"functionType": 2,
											"aggregationType": 1,
											"aggregationEvalType": 2
										}
									}
								},
								"dependencies": []
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"thousandSeparator": ",",
								"decimalPrecision": 0
							},
							"comparisonProviding": null
						},
						"comparison": null
					}
				},
				"parentName": "InventoryMetrics",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "InventoryFilterCard",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"gap": "medium",
					"padding": {
						"top": "medium",
						"right": "medium",
						"bottom": "medium",
						"left": "medium"
					}
				},
				"parentName": "InventoryRoot",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "InventoryFilterGrid",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(0, 1fr)",
						"minmax(0, 1fr)",
						"minmax(0, 1fr)",
						"minmax(0, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "medium",
						"rowGap": "medium"
					},
					"items": []
				},
				"parentName": "InventoryFilterCard",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "InventorySearchControl",
				"values": {
					"type": "crt.Input",
					"label": "Search VM",
					"labelPosition": "above",
					"appearance": "outline",
					"control": "$InventorySearch",
					"placeholder": "VM ID or name…",
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "InventoryFilterGrid",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "InventoryDateFromControl",
				"values": {
					"type": "crt.DateTimePicker",
					"label": "Provisioned From",
					"labelPosition": "above",
					"appearance": "outline",
					"control": "$InventoryDateFrom",
					"pickerType": "date",
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "InventoryFilterGrid",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "InventoryDateToControl",
				"values": {
					"type": "crt.DateTimePicker",
					"label": "Provisioned To",
					"labelPosition": "above",
					"appearance": "outline",
					"control": "$InventoryDateTo",
					"pickerType": "date",
					"layoutConfig": {
						"column": 3,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "InventoryFilterGrid",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "InventoryEnvironmentControl",
				"values": {
					"type": "crt.Input",
					"label": "Environment",
					"labelPosition": "above",
					"appearance": "outline",
					"control": "$InventoryEnvironment",
					"placeholder": "All environments",
					"layoutConfig": {
						"column": 4,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "InventoryFilterGrid",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "InventoryOSFilterControl",
				"values": {
					"type": "crt.QuickFilter",
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"config": {
						"caption": "All OS",
						"icon": "filter-column-icon",
						"iconPosition": "left-icon",
						"entitySchemaName": "UsrMCITOperatingSystem",
						"defaultValue": []
					},
					"filterType": "lookup",
					"_filterOptions": {
						"expose": [
							{
								"attribute": "InventoryOSFilter",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "InventoryRows",
													"filterColumn": "UsrOperatingSystem"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							},
							{
								"attribute": "InventoryOSFilterCount",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "InventoryMatchCount_Data",
													"filterColumn": "UsrOperatingSystem"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							}
						],
						"from": "InventoryOSFilterValue"
					}
				},
				"parentName": "InventoryFilterGrid",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "InventoryContractFilterControl",
				"values": {
					"type": "crt.QuickFilter",
					"layoutConfig": {
						"column": 2,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"config": {
						"caption": "#ResourceString(InventoryContractFilterControl_config_caption)#",
						"icon": "filter-column-icon",
						"iconPosition": "left-icon",
						"entitySchemaName": "UsrMCITContract",
						"defaultValue": [],
						"recordsFilter": null,
						"recordsSorting": null,
						"hint": ""
					},
					"filterType": "lookup",
					"_filterOptions": {
						"expose": [
							{
								"attribute": "InventoryContractFilterControl_InventoryRows",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "InventoryRows",
													"filterColumn": "UsrContract"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							},
							{
								"attribute": "InventoryContractFilterControl_InventoryMatchCount_Data",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "InventoryMatchCount_Data",
													"filterColumn": "UsrContract"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							}
						],
						"from": "InventoryContractFilterControl_Value"
					}
				},
				"parentName": "InventoryFilterGrid",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "InventoryAuthorityFilterControl",
				"values": {
					"type": "crt.QuickFilter",
					"layoutConfig": {
						"column": 3,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					},
					"config": {
						"caption": "#ResourceString(InventoryAuthorityFilterControl_config_caption)#",
						"icon": "filter-column-icon",
						"iconPosition": "left-icon",
						"entitySchemaName": "Account",
						"defaultValue": [],
						"recordsFilter": null,
						"recordsSorting": null,
						"hint": ""
					},
					"filterType": "lookup",
					"_filterOptions": {
						"expose": [
							{
								"attribute": "InventoryAuthorityFilterControl_InventoryRows",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "InventoryRows",
													"filterColumn": "UsrAccount"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							},
							{
								"attribute": "InventoryAuthorityFilterControl_InventoryMatchCount_Data",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "InventoryMatchCount_Data",
													"filterColumn": "UsrAccount"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							}
						],
						"from": "InventoryAuthorityFilterControl_Value"
					}
				},
				"parentName": "InventoryFilterGrid",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "InventoryStatusBar",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"items": [],
					"gap": "medium",
					"alignItems": "center"
				},
				"parentName": "InventoryFilterCard",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "InventoryStatusLabel",
				"values": {
					"type": "crt.Label",
					"caption": "Status",
					"labelType": "body-large",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "InventoryStatusBar",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "InventorySelectAll",
				"values": {
					"type": "crt.Button",
					"caption": "All",
					"color": "$InventoryColorAll",
					"size": "medium",
					"iconPosition": "only-text",
					"clicked": {
						"request": "usr.FilterInventoryStatus",
						"params": {
							"status": "All"
						}
					}
				},
				"parentName": "InventoryStatusBar",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "InventorySelectActive",
				"values": {
					"type": "crt.Button",
					"caption": "Active",
					"color": "$InventoryColorActive",
					"size": "medium",
					"iconPosition": "only-text",
					"clicked": {
						"request": "usr.FilterInventoryStatus",
						"params": {
							"status": "Active"
						}
					}
				},
				"parentName": "InventoryStatusBar",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "InventorySelectProvisioning",
				"values": {
					"type": "crt.Button",
					"caption": "Provisioning",
					"color": "$InventoryColorProvisioning",
					"size": "medium",
					"iconPosition": "only-text",
					"clicked": {
						"request": "usr.FilterInventoryStatus",
						"params": {
							"status": "Provisioning"
						}
					}
				},
				"parentName": "InventoryStatusBar",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "InventorySelectSuspended",
				"values": {
					"type": "crt.Button",
					"caption": "Suspended",
					"color": "$InventoryColorSuspended",
					"size": "medium",
					"iconPosition": "only-text",
					"clicked": {
						"request": "usr.FilterInventoryStatus",
						"params": {
							"status": "Suspended"
						}
					}
				},
				"parentName": "InventoryStatusBar",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "InventorySelectTerminating",
				"values": {
					"type": "crt.Button",
					"caption": "Term in Progress",
					"color": "$InventoryColorTerminating",
					"size": "medium",
					"iconPosition": "only-text",
					"clicked": {
						"request": "usr.FilterInventoryStatus",
						"params": {
							"status": "Terminating"
						}
					}
				},
				"parentName": "InventoryStatusBar",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "InventorySelectTerminated",
				"values": {
					"type": "crt.Button",
					"caption": "Terminated",
					"color": "$InventoryColorTerminated",
					"size": "medium",
					"iconPosition": "only-text",
					"clicked": {
						"request": "usr.FilterInventoryStatus",
						"params": {
							"status": "Terminated"
						}
					}
				},
				"parentName": "InventoryStatusBar",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "InventoryResults",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": []
				},
				"parentName": "InventoryRoot",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "InventoryMatchCount",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "Matching VMs",
						"theme": "without-fill",
						"layout": {
							"color": "dark-blue"
						},
						"text": {
							"template": "{0}",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"providing": {
								"attribute": "InventoryMatchCount_Data",
								"schemaName": "UsrVirtualMachine",
								"filters": {
									"filter": {
										"items": {},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "UsrVirtualMachine"
									},
									"filterAttributes": [
										{
											"attribute": "InventoryCriteria",
											"loadOnChange": true
										},
										{
											"attribute": "InventoryContractFilterCount",
											"loadOnChange": true
										},
										{
											"attribute": "InventoryAuthorityFilterCount",
											"loadOnChange": true
										},
										{
											"attribute": "InventoryOSFilterCount",
											"loadOnChange": true
										}
									]
								},
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "Id"
											},
											"functionType": 2,
											"aggregationType": 1,
											"aggregationEvalType": 1
										}
									}
								},
								"dependencies": []
							},
							"formatting": {
								"type": "number",
								"decimalSeparator": ".",
								"thousandSeparator": ",",
								"decimalPrecision": 0
							},
							"comparisonProviding": null
						},
						"comparison": null
					}
				},
				"parentName": "InventoryResults",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "InventoryGrid",
				"values": {
					"type": "crt.DataGrid",
					"items": "$InventoryRows",
					"primaryColumnName": "InventoryDS_Id",
					"sorting": "$InventorySorting | crt.ToDataTableSortingConfig: 'InventoryRows'",
					"fitContent": true,
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
					"columns": [
						{
							"id": "f892c146-fb15-4f6f-a0fc-5afcc2d3dd1f",
							"code": "InventoryDS_UsrVMCode",
							"path": "UsrVMCode",
							"caption": "VM ID",
							"dataValueType": 1
						},
						{
							"id": "eec838af-2c54-4070-b4b2-f3e9225edf9e",
							"code": "InventoryDS_UsrName",
							"path": "UsrName",
							"caption": "VM Name",
							"dataValueType": 1
						},
						{
							"id": "d1963e19-0478-43ab-bc19-00e4a008806c",
							"code": "InventoryDS_UsrSourceRequestItem_UsrRequest_UsrNumber",
							"path": "UsrSourceRequestItem.UsrRequest.UsrNumber",
							"caption": "Request ID",
							"dataValueType": 1
						},
						{
							"id": "d7e2d6ca-fa28-446f-bfeb-ad3107f370d3",
							"code": "InventoryDS_UsrContract",
							"path": "UsrContract",
							"caption": "Contract",
							"dataValueType": 10
						},
						{
							"id": "2e80216c-17a1-4d71-a096-51b6a8880f0a",
							"code": "InventoryDS_UsrAccount",
							"path": "UsrAccount",
							"caption": "Authority",
							"dataValueType": 10
						},
						{
							"id": "ceaf089f-b614-4de9-9496-464892f43e5e",
							"code": "InventoryDS_UsrProject",
							"path": "UsrProject",
							"caption": "Project",
							"dataValueType": 10
						},
						{
							"id": "4f718a9b-cd81-4bfd-b94e-4cb95cc21e0f",
							"code": "InventoryDS_UsrEnvironment",
							"path": "UsrEnvironment",
							"caption": "Environment",
							"dataValueType": 1
						},
						{
							"id": "c255e0ea-82cd-4b31-9ee9-40d47947b93d",
							"code": "InventoryDS_UsrOperatingSystem",
							"path": "UsrOperatingSystem",
							"caption": "OS",
							"dataValueType": 10
						},
						{
							"id": "f3e80d3f-3330-4774-8991-d710a488c1cc",
							"code": "InventoryDS_UsrCPU",
							"path": "UsrCPU",
							"caption": "vCPU",
							"dataValueType": 4
						},
						{
							"id": "bc423868-8dd3-4769-8a16-b9e1727e0d5c",
							"code": "InventoryDS_UsrRAMGB",
							"path": "UsrRAMGB",
							"caption": "RAM (GB)",
							"dataValueType": 5
						},
						{
							"id": "b7c24453-1145-44fb-8846-02dcec5c19ef",
							"code": "InventoryDS_UsrStorageGB",
							"path": "UsrStorageGB",
							"caption": "Storage (GB)",
							"dataValueType": 5
						},
						{
							"id": "e576d694-0609-4be9-a83d-9e8b69308848",
							"code": "InventoryDS_UsrStatus",
							"path": "UsrStatus",
							"caption": "Status",
							"dataValueType": 10
						},
						{
							"id": "87568177-47ac-4ff2-a5e2-f9fa4f0d2936",
							"code": "InventoryDS_UsrAllocatedPoints",
							"path": "UsrAllocatedPoints",
							"caption": "Points",
							"dataValueType": 5
						},
						{
							"id": "19ac951b-bf7e-4a62-bf45-eb5b89ee89af",
							"code": "InventoryDS_UsrProvisionedOn",
							"path": "UsrProvisionedOn",
							"caption": "Provisioned",
							"dataValueType": 7
						}
					],
					"rowToolbarItems": [
						{
							"type": "crt.MenuItem",
							"caption": "Open VM",
							"icon": "edit-row-action",
							"clicked": {
								"request": "crt.OpenPageRequest",
								"params": {
									"schemaName": "UsrVMInventory_FormPage",
									"modelInitConfigs": [
										{
											"action": "edit",
											"recordId": "$InventoryRows.InventoryDS_Id"
										}
									]
								}
							}
						}
					]
				},
				"parentName": "InventoryResults",
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
					"InventoryRows": {
						"isCollection": true,
						"modelConfig": {
							"path": "InventoryDS",
							"pagingConfig": {
								"rowCount": 30
							},
							"sortingConfig": {
								"attributeName": "InventorySorting",
								"default": [
									{
										"columnName": "UsrProvisionedOn",
										"direction": "desc"
									}
								]
							},
							"filterAttributes": [
								{
									"name": "InventoryCriteria",
									"loadOnChange": true
								},
								{
									"name": "InventoryContractFilter",
									"loadOnChange": true
								},
								{
									"name": "InventoryAuthorityFilter",
									"loadOnChange": true
								},
								{
									"name": "InventoryOSFilter",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"InventoryDS_Id": {
									"modelConfig": {
										"path": "InventoryDS.Id"
									}
								},
								"InventoryDS_UsrVMCode": {
									"modelConfig": {
										"path": "InventoryDS.UsrVMCode"
									}
								},
								"InventoryDS_UsrName": {
									"modelConfig": {
										"path": "InventoryDS.UsrName"
									}
								},
								"InventoryDS_UsrSourceRequestItem_UsrRequest_UsrNumber": {
									"modelConfig": {
										"path": "InventoryDS.UsrSourceRequestItem.UsrRequest.UsrNumber"
									}
								},
								"InventoryDS_UsrContract": {
									"modelConfig": {
										"path": "InventoryDS.UsrContract"
									}
								},
								"InventoryDS_UsrAccount": {
									"modelConfig": {
										"path": "InventoryDS.UsrAccount"
									}
								},
								"InventoryDS_UsrProject": {
									"modelConfig": {
										"path": "InventoryDS.UsrProject"
									}
								},
								"InventoryDS_UsrEnvironment": {
									"modelConfig": {
										"path": "InventoryDS.UsrEnvironment"
									}
								},
								"InventoryDS_UsrOperatingSystem": {
									"modelConfig": {
										"path": "InventoryDS.UsrOperatingSystem"
									}
								},
								"InventoryDS_UsrCPU": {
									"modelConfig": {
										"path": "InventoryDS.UsrCPU"
									}
								},
								"InventoryDS_UsrRAMGB": {
									"modelConfig": {
										"path": "InventoryDS.UsrRAMGB"
									}
								},
								"InventoryDS_UsrStorageGB": {
									"modelConfig": {
										"path": "InventoryDS.UsrStorageGB"
									}
								},
								"InventoryDS_UsrStatus": {
									"modelConfig": {
										"path": "InventoryDS.UsrStatus"
									}
								},
								"InventoryDS_UsrAllocatedPoints": {
									"modelConfig": {
										"path": "InventoryDS.UsrAllocatedPoints"
									}
								},
								"InventoryDS_UsrProvisionedOn": {
									"modelConfig": {
										"path": "InventoryDS.UsrProvisionedOn"
									}
								}
							}
						}
					},
					"InventorySorting": {},
					"InventorySearch": {
						"value": ""
					},
					"InventoryEnvironment": {
						"value": ""
					},
					"InventoryDateFrom": {
						"value": null,
						"modelConfig": {}
					},
					"InventoryDateTo": {
						"value": null
					},
					"InventoryStatus": {
						"value": "All"
					},
					"InventoryContractFilter": {},
					"InventoryAuthorityFilter": {},
					"InventoryOSFilter": {},
					"InventoryContractFilterValue": {},
					"InventoryAuthorityFilterValue": {},
					"InventoryOSFilterValue": {},
					"InventoryColorAll": {
						"value": "primary"
					},
					"InventoryColorActive": {
						"value": "outline"
					},
					"InventoryColorProvisioning": {
						"value": "outline"
					},
					"InventoryColorSuspended": {
						"value": "outline"
					},
					"InventoryColorTerminating": {
						"value": "outline"
					},
					"InventoryColorTerminated": {
						"value": "outline"
					}
				}
			}
		]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
			{
				"operation": "remove",
				"path": [],
				"properties": [
					"dependencies"
				]
			},
			{
				"operation": "merge",
				"path": [
					"dataSources"
				],
				"values": {
					"InventoryDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "UsrVirtualMachine",
							"attributes": {
								"Id": {
									"path": "Id"
								},
								"UsrVMCode": {
									"path": "UsrVMCode"
								},
								"UsrName": {
									"path": "UsrName"
								},
								"UsrSourceRequestItem.UsrRequest.UsrNumber": {
									"path": "UsrSourceRequestItem.UsrRequest.UsrNumber"
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
								"UsrEnvironment": {
									"path": "UsrEnvironment"
								},
								"UsrOperatingSystem": {
									"path": "UsrOperatingSystem"
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
								"UsrStatus": {
									"path": "UsrStatus"
								},
								"UsrAllocatedPoints": {
									"path": "UsrAllocatedPoints"
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
					"entitySchemaName": "UsrVirtualMachine"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[
      {
        request: "usr.FilterInventoryStatus",
        handler: async (request) => {
          const status = request.status;
          if (!statusKeys.includes(status)) return;
          const context = request.$context;
          const previous = await context.InventoryStatus;
          if (previous === status) return;
          context["InventoryColor" + previous] = "outline";
          context["InventoryColor" + status] = "primary";
          context.InventoryStatus = status;
        }
      }
    ]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{
      "usr.BuildInventoryCriteria": buildInventoryCriteria
    }/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});