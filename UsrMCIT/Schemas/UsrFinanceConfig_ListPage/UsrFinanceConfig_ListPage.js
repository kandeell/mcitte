define("UsrFinanceConfig_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "AddButton",
				"values": {
					"caption": "New Version",
					"size": "large"
				}
			},
			{
				"operation": "merge",
				"name": "MenuItem_ImportFromExcel",
				"values": {
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "UsrContractConfigVersion"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "MainContainer",
				"values": {
					"color": "#F8FAFC",
					"visible": true,
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					},
					"borderRadius": "none",
					"alignItems": "stretch",
					"justifyContent": "start",
					"wrap": "nowrap"
				}
			},
			{
				"operation": "merge",
				"name": "MainFilterContainer",
				"values": {
					"alignItems": "stretch"
				}
			},
			{
				"operation": "merge",
				"name": "LeftFilterContainer",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 3,
						"rowSpan": 1
					}
				}
			},
			{
				"operation": "remove",
				"name": "RightFilterContainer",
				"properties": [
					"layoutConfig"
				]
			},
			{
				"operation": "move",
				"name": "RightFilterContainer",
				"parentName": "LeftFilterContainerInner",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "merge",
				"name": "FolderTree",
				"values": {
					"rootSchemaName": "UsrContractConfigVersion"
				}
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "f252f581-0ccf-44ac-b7c9-c00df2ad9919",
							"code": "PDS_UsrName",
							"caption": "Configuration name",
							"dataValueType": 1
						},
						{
							"id": "6d36ec7b-19bc-41a9-8817-372021eb7f31",
							"code": "PDS_UsrContract",
							"caption": "Contract",
							"dataValueType": 10
						},
						{
							"id": "de6957c8-9e66-4884-a186-8a3d50ae0f92",
							"code": "PDS_UsrVersionNumber",
							"caption": "Version number",
							"dataValueType": 1
						},
						{
							"id": "abc418bc-4520-4505-9654-ac3a172efa41",
							"code": "PDS_UsrConfigVersionStatus",
							"caption": "Status",
							"dataValueType": 10
						},
						{
							"id": "fb55fc03-cdf1-4fea-86ce-247099fdb8b7",
							"code": "PDS_UsrEffectiveFrom",
							"caption": "Effective from",
							"dataValueType": 7
						},
						{
							"id": "2a5478b5-c412-490f-a3b3-cab89b6842de",
							"code": "PDS_UsrEffectiveTo",
							"caption": "Effective to",
							"dataValueType": 7
						},
						{
							"id": "c8689d78-80ba-4e71-8cf2-fa478e3be5bc",
							"code": "PDS_CreatedOn",
							"caption": "Created on",
							"dataValueType": 7
						},
						{
							"id": "fd4b3485-a46e-4219-b775-adef1210fe51",
							"code": "PDS_CreatedBy",
							"caption": "Created by",
							"dataValueType": 10
						}
					]
				}
			},
			{
				"operation": "merge",
				"name": "Dashboards",
				"values": {
					"_designOptions": {
						"entitySchemaName": "UsrContractConfigVersion",
						"dependencies": [
							{
								"attributePath": "Id",
								"relationPath": "PDS.Id"
							}
						],
						"filters": []
					}
				}
			},
			{
				"operation": "insert",
				"name": "FlexContainer_f2avkan",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "wrap",
					"items": [],
					"fitContent": true,
					"visible": true,
					"padding": {
						"top": "large",
						"right": "large",
						"bottom": "large",
						"left": "large"
					},
					"color": "#F8FAFC",
					"borderRadius": "small",
					"alignItems": "stretch",
					"justifyContent": "center",
					"gap": "large"
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_2df1nqy",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_2df1nqy_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "violet"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_2df1nqy_config_text_template)#",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"type": "number",
								"decimalPrecision": 0,
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"comparisonProviding": null,
							"providing": {
								"attribute": "IndicatorWidget_2df1nqy_Data",
								"schemaName": "UsrContractConfigVersion",
								"filters": {
									"filter": {
										"items": {
											"ed0a3dca-cde0-4190-9c62-9ef210a2f8be": {
												"filterType": 4,
												"comparisonType": 3,
												"isEnabled": true,
												"trimDateTimeParameterToDate": false,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "UsrConfigVersionStatus"
												},
												"isAggregative": false,
												"dataValueType": 10,
												"referenceSchemaName": "UsrConfigVersionStatus",
												"rightExpressions": [
													{
														"expressionType": 2,
														"parameter": {
															"dataValueType": 10,
															"value": {
																"Name": "Draft",
																"Id": "d153cb20-1a9c-44bf-8ced-1a53f88eed22",
																"value": "d153cb20-1a9c-44bf-8ced-1a53f88eed22",
																"displayValue": "Draft"
															}
														}
													}
												]
											}
										},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "UsrContractConfigVersion"
									},
									"filterAttributes": [
										{
											"attribute": "QuickFilter_ghstixv_IndicatorWidget_2df1nqy_Data",
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
											"aggregationEvalType": 2
										}
									}
								},
								"dependencies": []
							}
						},
						"comparison": {
							"type": null,
							"text": ""
						},
						"hint": "#ResourceString(IndicatorWidget_2df1nqy_hint)#"
					},
					"visible": true,
					"layoutConfig": {
						"width": 202.390625
					}
				},
				"parentName": "FlexContainer_f2avkan",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_hzkxiee",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_hzkxiee_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "violet"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_hzkxiee_config_text_template)#",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"type": "number",
								"decimalPrecision": 0,
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"comparisonProviding": null,
							"providing": {
								"attribute": "IndicatorWidget_hzkxiee_Data",
								"schemaName": "UsrContractConfigVersion",
								"filters": {
									"filter": {
										"items": {
											"0b90afa8-619f-465d-ac85-4f8f631121c2": {
												"filterType": 4,
												"comparisonType": 3,
												"isEnabled": true,
												"trimDateTimeParameterToDate": false,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "UsrConfigVersionStatus"
												},
												"isAggregative": false,
												"dataValueType": 10,
												"referenceSchemaName": "UsrConfigVersionStatus",
												"rightExpressions": [
													{
														"expressionType": 2,
														"parameter": {
															"dataValueType": 10,
															"value": {
																"Name": "Scheduled",
																"Id": "1cd0011f-6971-49b3-a5b8-04d46130daee",
																"value": "1cd0011f-6971-49b3-a5b8-04d46130daee",
																"displayValue": "Scheduled"
															}
														}
													}
												]
											}
										},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "UsrContractConfigVersion"
									},
									"filterAttributes": [
										{
											"attribute": "QuickFilter_ghstixv_IndicatorWidget_hzkxiee_Data",
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
											"aggregationEvalType": 2
										}
									}
								},
								"dependencies": []
							}
						},
						"comparison": {
							"type": null,
							"text": ""
						},
						"hint": "#ResourceString(IndicatorWidget_hzkxiee_hint)#"
					},
					"visible": true,
					"layoutConfig": {
						"width": 173.359375
					}
				},
				"parentName": "FlexContainer_f2avkan",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_so5fw0r",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_so5fw0r_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "violet"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_so5fw0r_config_text_template)#",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"type": "number",
								"decimalPrecision": 0,
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"comparisonProviding": null,
							"providing": {
								"attribute": "IndicatorWidget_so5fw0r_Data",
								"schemaName": "UsrContractConfigVersion",
								"filters": {
									"filter": {
										"items": {
											"0fce6e57-280e-445f-acfb-7107e3bbf905": {
												"filterType": 4,
												"comparisonType": 3,
												"isEnabled": true,
												"trimDateTimeParameterToDate": false,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "UsrConfigVersionStatus"
												},
												"isAggregative": false,
												"dataValueType": 10,
												"referenceSchemaName": "UsrConfigVersionStatus",
												"rightExpressions": [
													{
														"expressionType": 2,
														"parameter": {
															"dataValueType": 10,
															"value": {
																"Name": "Active",
																"Id": "e7d05248-9d33-41c3-b688-c0b172b039cc",
																"value": "e7d05248-9d33-41c3-b688-c0b172b039cc",
																"displayValue": "Active"
															}
														}
													}
												]
											}
										},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "UsrContractConfigVersion"
									},
									"filterAttributes": [
										{
											"attribute": "QuickFilter_ghstixv_IndicatorWidget_so5fw0r_Data",
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
											"aggregationEvalType": 2
										}
									}
								},
								"dependencies": []
							}
						},
						"comparison": {
							"type": null,
							"text": ""
						},
						"hint": "#ResourceString(IndicatorWidget_so5fw0r_hint)#"
					},
					"visible": true,
					"layoutConfig": {
						"width": 219.78125
					}
				},
				"parentName": "FlexContainer_f2avkan",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "QuickFilter_ghstixv",
				"values": {
					"type": "crt.QuickFilter",
					"config": {
						"caption": "#ResourceString(QuickFilter_ghstixv_config_caption)#",
						"hint": "",
						"icon": "filter-column-icon",
						"iconPosition": "left-icon",
						"defaultValue": [],
						"entitySchemaName": "UsrMCITContract",
						"recordsFilter": null,
						"defaultValueListSorting": null
					},
					"_filterOptions": {
						"expose": [
							{
								"attribute": "QuickFilter_ghstixv_Items",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "Items",
													"filterColumn": "UsrContract"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							},
							{
								"attribute": "QuickFilter_ghstixv_IndicatorWidget_2df1nqy_Data",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "IndicatorWidget_2df1nqy_Data",
													"filterColumn": "UsrContract"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							},
							{
								"attribute": "QuickFilter_ghstixv_IndicatorWidget_hzkxiee_Data",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "IndicatorWidget_hzkxiee_Data",
													"filterColumn": "UsrContract"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							},
							{
								"attribute": "QuickFilter_ghstixv_IndicatorWidget_so5fw0r_Data",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "IndicatorWidget_so5fw0r_Data",
													"filterColumn": "UsrContract"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							}
						],
						"from": "QuickFilter_ghstixv_Value"
					},
					"filterType": "lookup"
				},
				"parentName": "LeftFilterContainerInner",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "QuickFilter_g9wucbw",
				"values": {
					"type": "crt.QuickFilter",
					"config": {
						"caption": "#ResourceString(QuickFilter_g9wucbw_config_caption)#",
						"hint": "",
						"icon": "filter-column-icon",
						"iconPosition": "left-icon",
						"defaultValue": [],
						"entitySchemaName": "UsrConfigVersionStatus",
						"recordsFilter": null,
						"defaultValueListSorting": null
					},
					"_filterOptions": {
						"expose": [
							{
								"attribute": "QuickFilter_g9wucbw_Items",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "Items",
													"filterColumn": "UsrConfigVersionStatus"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							}
						],
						"from": "QuickFilter_g9wucbw_Value"
					},
					"filterType": "lookup"
				},
				"parentName": "LeftFilterContainerInner",
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
					"PDS_UsrVersionNumber": {
						"modelConfig": {
							"path": "PDS.UsrVersionNumber"
						}
					},
					"PDS_UsrConfigVersionStatus": {
						"modelConfig": {
							"path": "PDS.UsrConfigVersionStatus"
						}
					},
					"PDS_UsrEffectiveFrom": {
						"modelConfig": {
							"path": "PDS.UsrEffectiveFrom"
						}
					},
					"PDS_UsrEffectiveTo": {
						"modelConfig": {
							"path": "PDS.UsrEffectiveTo"
						}
					},
					"PDS_CreatedOn": {
						"modelConfig": {
							"path": "PDS.CreatedOn"
						}
					},
					"PDS_CreatedBy": {
						"modelConfig": {
							"path": "PDS.CreatedBy"
						}
					}
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"Items",
					"modelConfig"
				],
				"values": {
					"filterAttributes": [
						{
							"loadOnChange": true,
							"name": "FolderTree_active_folder_filter"
						},
						{
							"name": "Items_PredefinedFilter",
							"loadOnChange": true
						},
						{
							"name": "LookupQuickFilterByTag_Items",
							"loadOnChange": true
						},
						{
							"name": "SearchFilter_Items",
							"loadOnChange": true
						},
						{
							"name": "Filters_Filter",
							"loadOnChange": true
						},
						{
							"name": "QuickFilter_ghstixv_Items",
							"loadOnChange": true
						},
						{
							"name": "QuickFilter_g9wucbw_Items",
							"loadOnChange": true
						}
					]
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
					"dataSources",
					"PDS",
					"config"
				],
				"values": {
					"entitySchemaName": "UsrContractConfigVersion",
					"attributes": {
						"UsrName": {
							"path": "UsrName"
						},
						"UsrContract": {
							"path": "UsrContract"
						},
						"UsrVersionNumber": {
							"path": "UsrVersionNumber"
						},
						"UsrConfigVersionStatus": {
							"path": "UsrConfigVersionStatus"
						},
						"UsrEffectiveFrom": {
							"path": "UsrEffectiveFrom"
						},
						"UsrEffectiveTo": {
							"path": "UsrEffectiveTo"
						},
						"CreatedOn": {
							"path": "CreatedOn"
						},
						"CreatedBy": {
							"path": "CreatedBy"
						}
					}
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});