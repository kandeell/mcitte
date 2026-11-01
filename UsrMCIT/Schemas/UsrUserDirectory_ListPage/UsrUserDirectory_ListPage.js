define("UsrUserDirectory_ListPage", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "TitleContainer",
				"values": {
					"direction": "column",
					"alignItems": "flex-start",
					"classes": [
						"usr-directory-title"
					],
					"visible": true,
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					},
					"color": "transparent",
					"borderRadius": "none",
					"gap": "small",
					"wrap": "nowrap"
				}
			},
			{
				"operation": "merge",
				"name": "AddButton",
				"values": {
					"caption": "#ResourceString(AddButton_caption)#",
					"size": "large",
					"visible": false,
					"clickMode": "default"
				}
			},
			{
				"operation": "merge",
				"name": "DataImportButton",
				"values": {
					"caption": "#ResourceString(DataImportButton_caption)#",
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
							"entitySchemaName": "UsrMCITPortalUserAccess"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "MainContainer",
				"values": {
					"classes": [
						"usr-dir-page-frame"
					]
				}
			},
			{
				"operation": "merge",
				"name": "MainFilterContainer",
				"values": {
					"visible": false,
					"alignItems": "stretch"
				}
			},
			{
				"operation": "merge",
				"name": "LeftFilterContainer",
				"values": {
					"layoutConfig": {
						"column": 3,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"padding": {
						"top": "none",
						"right": "large",
						"bottom": "none",
						"left": "none"
					},
					"justifyContent": "end",
					"gap": "large",
					"alignItems": "flex-end"
				}
			},
			{
				"operation": "merge",
				"name": "LookupQuickFilterByTag",
				"values": {
					"config": {
						"caption": "#ResourceString(LookupQuickFilterByTag_config_caption)#",
						"hint": "#ResourceString(LookupQuickFilterByTag_config_hint)#",
						"icon": "tag-icon",
						"iconPosition": "left-icon",
						"entitySchemaName": "Tag_Virtual_Schema",
						"defaultValue": null,
						"recordsFilter": null,
						"defaultValueListSorting": null
					}
				}
			},
			{
				"operation": "move",
				"name": "SearchFilter",
				"parentName": "FlexContainer_f6bbsbw",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "remove",
				"name": "RightFilterContainer",
				"properties": [
					"layoutConfig"
				]
			},
			{
				"operation": "merge",
				"name": "RightFilterContainer",
				"values": {
					"visible": false
				}
			},
			{
				"operation": "move",
				"name": "RightFilterContainer",
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "merge",
				"name": "ContentContainer",
				"values": {
					"classes": [
						"usr-dir-content-zone"
					]
				}
			},
			{
				"operation": "merge",
				"name": "FolderTree",
				"values": {
					"rootSchemaName": "UsrMCITPortalUserAccess"
				}
			},
			{
				"operation": "merge",
				"name": "SectionContentWrapper",
				"values": {
					"classes": [
						"usr-dir-view-layout"
					]
				}
			},
			{
				"operation": "move",
				"name": "SectionContentWrapper",
				"parentName": "ContentContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "4f03b106-97db-83cc-2dea-cf9656d5db1f",
							"code": "PDS_UsrUser",
							"caption": "#ResourceString(PDS_UsrUser)#",
							"dataValueType": 10,
							"width": 152.98748779296875
						},
						{
							"id": "f6618e36-39d2-2a6e-66e3-3db3e4698dc3",
							"code": "PDS_UsrUser_Contact_Email",
							"caption": "#ResourceString(PDS_UsrUser_Contact_Email)#",
							"dataValueType": 45,
							"width": 97.96874237060547
						},
						{
							"id": "738adc62-6388-ba40-2c48-af3285d91e14",
							"code": "PDS_UsrUser_Contact_Account",
							"caption": "#ResourceString(PDS_UsrUser_Contact_Account)#",
							"dataValueType": 10,
							"width": 140.95623779296875
						},
						{
							"id": "01a699fc-d053-7929-60b1-74d585d04393",
							"code": "PDS_UsrAssignedRolesSummary",
							"caption": "#ResourceString(PDS_UsrAssignedRolesSummary)#",
							"dataValueType": 30,
							"width": 151.96873474121094
						},
						{
							"id": "09c71e23-f3a7-37f1-821a-9ffd28c7ab6f",
							"code": "PDS_UsrScopeSummary",
							"caption": "#ResourceString(PDS_UsrScopeSummary)#",
							"dataValueType": 30,
							"width": 161.98748779296875
						},
						{
							"id": "063ddae2-f31d-7b1c-18e6-8e2895eea782",
							"code": "PDS_UsrUserStatus",
							"caption": "#ResourceString(PDS_UsrUserStatus)#",
							"dataValueType": 10,
							"width": 122.95624542236328
						},
						{
							"id": "a479c152-f05f-39a6-8e0e-d684bd0afa13",
							"code": "PDS_UsrLastSignIn",
							"caption": "#ResourceString(PDS_UsrLastSignIn)#",
							"dataValueType": 7
						}
					],
					"visible": false
				}
			},
			{
				"operation": "merge",
				"name": "Dashboards",
				"values": {
					"_designOptions": {
						"entitySchemaName": "UsrMCITPortalUserAccess",
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
				"name": "Label_2o5y9a4",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_2o5y9a4_caption)#)#",
					"labelType": "caption",
					"labelThickness": "light",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "TitleContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_b4lsi4n",
				"values": {
					"type": "crt.GridContainer",
					"classes": [
						"usr-dir-kpi-layout"
					],
					"columns": [
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "large",
						"rowGap": "none"
					},
					"items": [],
					"fitContent": true,
					"visible": true,
					"alignItems": "stretch",
					"color": "transparent",
					"borderRadius": "none",
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					}
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_ilpoism",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true,
					"visible": true,
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					},
					"color": "transparent",
					"borderRadius": "none",
					"alignItems": "flex-start",
					"justifyContent": "start",
					"gap": "large"
				},
				"parentName": "GridContainer_b4lsi4n",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_qwwh5i9",
				"values": {
					"type": "crt.IndicatorWidget",
					"classes": [
						"usr-mcit-native-kpi",
						"usr-mcit-native-kpi-active"
					],
					"config": {
						"title": "#ResourceString(IndicatorWidget_qwwh5i9_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_qwwh5i9_config_text_template)#",
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
								"attribute": "IndicatorWidget_qwwh5i9_Data",
								"schemaName": "UsrMCITPortalUserAccess",
								"filters": {
									"filter": {
										"items": {
											"6095100e-10f7-4594-bc0d-54a1e93abdea": {
												"filterType": 4,
												"comparisonType": 3,
												"isEnabled": true,
												"trimDateTimeParameterToDate": false,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "UsrUserStatus"
												},
												"isAggregative": false,
												"dataValueType": 10,
												"referenceSchemaName": "UsrMCITUserStatus",
												"rightExpressions": [
													{
														"expressionType": 2,
														"parameter": {
															"dataValueType": 10,
															"value": {
																"Name": "Active",
																"Id": "4ee823ca-22a2-4291-9dda-4c32f52aba0f",
																"value": "4ee823ca-22a2-4291-9dda-4c32f52aba0f",
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
										"rootSchemaName": "UsrMCITPortalUserAccess"
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
						"hint": "#ResourceString(IndicatorWidget_qwwh5i9_hint)#",
						"hideTitle": true
					},
					"visible": true
				},
				"parentName": "FlexContainer_ilpoism",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_kx5qlxn",
				"values": {
					"type": "crt.IndicatorWidget",
					"classes": [
						"usr-mcit-native-kpi",
						"usr-mcit-native-kpi-inactive"
					],
					"config": {
						"title": "#ResourceString(IndicatorWidget_kx5qlxn_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "orange-red"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_kx5qlxn_config_text_template)#",
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
								"attribute": "IndicatorWidget_kx5qlxn_Data",
								"schemaName": "UsrMCITPortalUserAccess",
								"filters": {
									"filter": {
										"items": {
											"9f6ccfb9-307a-4152-bafd-c852f8e83b1f": {
												"filterType": 4,
												"comparisonType": 3,
												"isEnabled": true,
												"trimDateTimeParameterToDate": false,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "UsrUserStatus"
												},
												"isAggregative": false,
												"dataValueType": 10,
												"referenceSchemaName": "UsrMCITUserStatus",
												"rightExpressions": [
													{
														"expressionType": 2,
														"parameter": {
															"dataValueType": 10,
															"value": {
																"Name": "Inactive",
																"Id": "6523355a-1aee-48e7-9862-5cc1bea56b96",
																"value": "6523355a-1aee-48e7-9862-5cc1bea56b96",
																"displayValue": "Inactive"
															}
														}
													}
												]
											}
										},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "UsrMCITPortalUserAccess"
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
						"hint": "#ResourceString(IndicatorWidget_kx5qlxn_hint)#",
						"hideTitle": true
					},
					"visible": true
				},
				"parentName": "FlexContainer_ilpoism",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_avk9f4s",
				"values": {
					"type": "crt.IndicatorWidget",
					"classes": [
						"usr-mcit-native-kpi",
						"usr-mcit-native-kpi-deactivated"
					],
					"config": {
						"title": "#ResourceString(IndicatorWidget_avk9f4s_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "cadmium-red"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_avk9f4s_config_text_template)#",
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
								"attribute": "IndicatorWidget_avk9f4s_Data",
								"schemaName": "UsrMCITPortalUserAccess",
								"filters": {
									"filter": {
										"items": {
											"14d853cc-d678-4665-a09d-ee979c04667d": {
												"filterType": 4,
												"comparisonType": 3,
												"isEnabled": true,
												"trimDateTimeParameterToDate": false,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "UsrUserStatus"
												},
												"isAggregative": false,
												"dataValueType": 10,
												"referenceSchemaName": "UsrMCITUserStatus",
												"rightExpressions": [
													{
														"expressionType": 2,
														"parameter": {
															"dataValueType": 10,
															"value": {
																"Name": "Deactivated",
																"Id": "e535941b-12df-4d6e-b4a5-39b6da20b6eb",
																"value": "e535941b-12df-4d6e-b4a5-39b6da20b6eb",
																"displayValue": "Deactivated"
															}
														}
													}
												]
											}
										},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "UsrMCITPortalUserAccess"
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
						"hint": "#ResourceString(IndicatorWidget_avk9f4s_hint)#",
						"hideTitle": true
					},
					"visible": true
				},
				"parentName": "FlexContainer_ilpoism",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "FlexContainer_f6bbsbw",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 2,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "wrap",
					"items": [],
					"fitContent": true,
					"visible": true,
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					},
					"color": "transparent",
					"borderRadius": "none",
					"alignItems": "flex-end",
					"justifyContent": "end",
					"gap": "large"
				},
				"parentName": "MainFilterContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_6554jea",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "wrap",
					"items": [],
					"fitContent": true
				},
				"parentName": "MainFilterContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrDirectoryHeader",
				"values": {
					"classes": [
						"usr-directory-header"
					],
					"type": "crt.GridContainer",
					"columns": [
						"minmax(100px,0.95fr)",
						"minmax(105px,0.90fr)",
						"minmax(110px,0.95fr)",
						"minmax(170px,1.35fr)",
						"minmax(195px,1.65fr)",
						"minmax(108px,0.85fr)",
						"minmax(110px,0.95fr)",
						"236px"
					],
					"rows": "minmax(max-content, 30px)",
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
							"type": "crt.Label",
							"layoutConfig": {
								"column": 1,
								"row": 1,
								"colSpan": 1,
								"rowSpan": 1
							},
							"caption": "Display Name",
							"labelType": "caption",
							"labelThickness": "bold",
							"labelColor": "auto",
							"labelTextAlign": "start"
						},
						{
							"type": "crt.Label",
							"layoutConfig": {
								"column": 2,
								"row": 1,
								"colSpan": 1,
								"rowSpan": 1
							},
							"caption": "Email",
							"labelType": "caption",
							"labelThickness": "bold",
							"labelColor": "auto",
							"labelTextAlign": "start"
						},
						{
							"type": "crt.Label",
							"layoutConfig": {
								"column": 3,
								"row": 1,
								"colSpan": 1,
								"rowSpan": 1
							},
							"caption": "Organization",
							"labelType": "caption",
							"labelThickness": "bold",
							"labelColor": "auto",
							"labelTextAlign": "start"
						},
						{
							"type": "crt.Label",
							"layoutConfig": {
								"column": 4,
								"row": 1,
								"colSpan": 1,
								"rowSpan": 1
							},
							"caption": "Assigned Roles",
							"labelType": "caption",
							"labelThickness": "bold",
							"labelColor": "auto",
							"labelTextAlign": "start"
						},
						{
							"type": "crt.Label",
							"layoutConfig": {
								"column": 5,
								"row": 1,
								"colSpan": 1,
								"rowSpan": 1
							},
							"caption": "Scope Summary",
							"labelType": "caption",
							"labelThickness": "bold",
							"labelColor": "auto",
							"labelTextAlign": "start"
						},
						{
							"type": "crt.Label",
							"layoutConfig": {
								"column": 6,
								"row": 1,
								"colSpan": 1,
								"rowSpan": 1
							},
							"caption": "Status",
							"labelType": "caption",
							"labelThickness": "bold",
							"labelColor": "auto",
							"labelTextAlign": "start"
						},
						{
							"type": "crt.Label",
							"layoutConfig": {
								"column": 7,
								"row": 1,
								"colSpan": 1,
								"rowSpan": 1
							},
							"caption": "Last Sign-in",
							"labelType": "caption",
							"labelThickness": "bold",
							"labelColor": "auto",
							"labelTextAlign": "start"
						},
						{
							"type": "crt.Label",
							"layoutConfig": {
								"column": 8,
								"row": 1,
								"colSpan": 1,
								"rowSpan": 1
							},
							"caption": "Actions",
							"labelType": "caption",
							"labelThickness": "bold",
							"labelColor": "auto"
						}
					]
				},
				"parentName": "SectionContentWrapper",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrDirectoryActions",
				"values": {
					"type": "crt.TemplateList",
					"classes": [
						"usr-dir-row-list"
					],
					"items": "$Items",
					"direction": "column",
					"gap": 0,
					"template": [
						{
							"type": "crt.GridContainer",
							"classes": [
								"usr-directory-row"
							],
							"columns": [
								"minmax(100px,0.95fr)",
								"minmax(105px,0.90fr)",
								"minmax(110px,0.95fr)",
								"minmax(170px,1.35fr)",
								"minmax(195px,1.65fr)",
								"minmax(108px,0.85fr)",
								"minmax(110px,0.95fr)",
								"236px"
							],
							"rows": "minmax(max-content, 42px)",
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
									"displayType": "text",
									"color": "primary",
									"size": "small",
									"iconPosition": "only-text",
									"clicked": {
										"request": "crt.UpdateRecordRequest",
										"params": {
											"itemsAttributeName": "Items",
											"recordId": "$Items.PDS_Id"
										}
									},
									"layoutConfig": {
										"column": 1,
										"row": 1,
										"colSpan": 1,
										"rowSpan": 1
									},
									"classes": "$Items.PDS_UsrUser | usr.MCITUserClasses",
									"caption": "$Items.PDS_UsrUser | usr.LookupText",
									"labelType": "body",
									"labelThickness": "default",
									"labelEllipsis": false,
									"visible": true
								},
								{
									"type": "crt.Label",
									"layoutConfig": {
										"column": 2,
										"row": 1,
										"colSpan": 1,
										"rowSpan": 1
									},
									"classes": [
										"usr-dir-col-email"
									],
									"caption": "$Items.PDS_UsrUser_Contact_Email",
									"labelType": "body",
									"labelThickness": "default",
									"labelEllipsis": false,
									"visible": true
								},
								{
									"type": "crt.FlexContainer",
									"layoutConfig": {
										"column": 3,
										"row": 1,
										"colSpan": 1,
										"rowSpan": 1
									},
									"classes": [
										"usr-dir-col-org"
									],
									"direction": "row",
									"alignItems": "center",
									"fitContent": true,
									"items": [
										{
											"type": "crt.Label",
											"caption": "$Items.PDS_UsrUser_Contact_Account | usr.LookupText",
											"labelType": "body",
											"labelThickness": "default",
											"labelEllipsis": false,
											"visible": true
										}
									]
								},
								{
									"type": "crt.FlexContainer",
									"layoutConfig": {
										"column": 4,
										"row": 1,
										"colSpan": 1,
										"rowSpan": 1
									},
									"classes": [
										"usr-dir-col-roles"
									],
									"direction": "column",
									"alignItems": "flex-start",
									"fitContent": true,
									"items": [
										{
											"type": "crt.Label",
											"classes": [
												"usr-dir-role-raw"
											],
											"caption": "$Items.PDS_UsrAssignedRolesSummary",
											"labelType": "body",
											"labelThickness": "default",
											"labelEllipsis": false,
											"visible": true
										}
									]
								},
								{
									"type": "crt.FlexContainer",
									"layoutConfig": {
										"column": 5,
										"row": 1,
										"colSpan": 1,
										"rowSpan": 1
									},
									"classes": [
										"usr-dir-col-scope"
									],
									"direction": "column",
									"alignItems": "stretch",
									"fitContent": true,
									"items": [
										{
											"type": "crt.Label",
											"caption": "$Items.PDS_UsrScopeSummary",
											"labelType": "body",
											"labelThickness": "default",
											"labelEllipsis": false,
											"visible": true
										}
									]
								},
								{
									"type": "crt.FlexContainer",
									"layoutConfig": {
										"column": 6,
										"row": 1,
										"colSpan": 1,
										"rowSpan": 1
									},
									"classes": "$Items.PDS_UsrUserStatus | usr.MCITBadgeClasses",
									"direction": "row",
									"fitContent": true,
									"items": [
										{
											"type": "crt.Label",
											"caption": "$Items.PDS_UsrUserStatus | usr.LookupText",
											"labelType": "body"
										}
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
									"classes": [
										"usr-dir-col-signin"
									],
									"caption": "$Items.PDS_UsrLastSignIn | crt.AdaptiveDateTimeFormat",
									"labelType": "body",
									"labelThickness": "default",
									"labelEllipsis": false,
									"visible": true
								},
								{
									"type": "crt.FlexContainer",
									"classes": [
										"usr-dir-col-actions"
									],
									"layoutConfig": {
										"column": 8,
										"row": 1,
										"colSpan": 1,
										"rowSpan": 1
									},
									"direction": "row",
									"alignItems": "center",
									"justifyContent": "start",
									"wrap": "nowrap",
									"gap": "small",
									"fitContent": true,
									"items": [
										{
											"type": "crt.Button",
											"caption": "View Profile",
											"color": "outline",
											"displayType": "contained",
											"size": "small",
											"iconPosition": "only-text",
											"clicked": {
												"request": "crt.UpdateRecordRequest",
												"params": {
													"itemsAttributeName": "Items",
													"recordId": "$Items.PDS_Id"
												}
											}
										},
										{
											"type": "crt.Button",
											"caption": "$Items.PDS_UsrUserStatus | usr.StatusActionCaption",
											"color": "$Items.PDS_UsrUserStatus | usr.MCITActionColor",
											"displayType": "contained",
											"size": "small",
											"iconPosition": "only-text",
											"disabled": "$Items.PDS_UsrUserStatus | usr.MCITActionDisabled",
											"clicked": {
												"request": "usr.ChangeMCITUserStatus",
												"params": {
													"recordId": "$Items.PDS_Id",
													"currentStatus": "$Items.PDS_UsrUserStatus",
													"targetUser": "$Items.PDS_UsrUser"
												}
											}
										}
									]
								}
							]
						}
					]
				},
				"parentName": "SectionContentWrapper",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "move",
				"name": "FolderTreeActions",
				"parentName": "LeftFilterContainerInner",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "move",
				"name": "Filters",
				"parentName": "ContentContainer",
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
					"UsrDirectoryMetricsVisible": {}
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
					"PDS_UsrUser": {
						"modelConfig": {
							"path": "PDS.UsrUser"
						}
					},
					"PDS_UsrUser_Contact_Email": {
						"modelConfig": {
							"path": "PDS.UsrUser_Contact_Email"
						}
					},
					"PDS_UsrUser_Contact_Account": {
						"modelConfig": {
							"path": "PDS.UsrUser_Contact_Account"
						}
					},
					"PDS_UsrAssignedRolesSummary": {
						"modelConfig": {
							"path": "PDS.UsrAssignedRolesSummary"
						}
					},
					"PDS_UsrScopeSummary": {
						"modelConfig": {
							"path": "PDS.UsrScopeSummary"
						}
					},
					"PDS_UsrUserStatus": {
						"modelConfig": {
							"path": "PDS.UsrUserStatus"
						}
					},
					"PDS_UsrLastSignIn": {
						"modelConfig": {
							"path": "PDS.UsrLastSignIn"
						}
					}
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"Items",
					"modelConfig",
					"sortingConfig"
				],
				"values": {
					"default": [
						{
							"direction": "asc",
							"columnName": "UsrScopeSummary"
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
					"entitySchemaName": "UsrMCITPortalUserAccess",
					"attributes": {
						"UsrUser": {
							"path": "UsrUser"
						},
						"UsrUser_Contact_Email": {
							"type": "ForwardReference",
							"path": "UsrUser.Contact.Email"
						},
						"UsrUser_Contact_Account": {
							"type": "ForwardReference",
							"path": "UsrUser.Contact.Account"
						},
						"UsrAssignedRolesSummary": {
							"path": "UsrAssignedRolesSummary"
						},
						"UsrScopeSummary": {
							"path": "UsrScopeSummary"
						},
						"UsrUserStatus": {
							"path": "UsrUserStatus"
						},
						"UsrLastSignIn": {
							"path": "UsrLastSignIn"
						}
					}
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[
            // V4: row click delegation. This does not rely on module-scoped variables.
            // A normal click on the row triggers the EXISTING View Profile button.
            // Clicks on either action button keep their own behavior.
            {
                request: "crt.HandleViewModelInitRequest",
                handler: async (request, next) => {
                    const result = await next?.handle(request);
                    if (typeof document === "undefined") return result;

                    const listenerKey = "__usrMCITUserDirectoryV4RowListener";
                    const styleId = "usr-mcit-user-directory-v4-css";
                    // Reinitialization-safe: unregister the previous copy first.
                    if (typeof document[listenerKey] === "function") {
                        document.removeEventListener("click", document[listenerKey]);
                    }
                    if (!document.getElementById(styleId)) {
                        const sheet = document.createElement("style");
                        sheet.id = styleId;
                        sheet.textContent = `
                            .usr-directory-row {
                                cursor: pointer;
                                border-bottom: 1px solid #edf0f5;
                                border-radius: 4px;
                                transition: background-color .13s ease;
                            }
                            .usr-directory-row:hover,
                            .usr-directory-row:focus-within {
                                background-color: #f5f3ff !important;
                            }
                            .usr-directory-row:active {
                                background-color: #eeeafc !important;
                            }
                            .usr-directory-row button,
                            .usr-directory-row a {
                                cursor: pointer;
                            }
                            /* Native metric cards are left completely intact. */
                            .usr-dir-col-roles {
                                line-height: 1.6 !important;
                            }
                            .usr-dir-role-chips {
                                display: flex !important;
                                flex-wrap: wrap;
                                gap: 5px;
                                align-items: center;
                            }
                            .usr-dir-role-chip {
                                display: inline-flex;
                                align-items: center;
                                width: max-content;
                                max-width: 100%;
                                padding: 2px 8px;
                                background: #f3e8ff !important;
                                border: 1px solid #d5b3fc !important;
                                border-radius: 14px !important;
                                color: #6920cf !important;
                                font-size: 11px;
                                font-weight: 600;
                                line-height: 1.45;
                                white-space: normal;
                            }
                        `;
                        document.head.appendChild(sheet);
                    }

                    const onDirectoryRowClick = (event) => {
                        const target = event.target;
                        if (!target || typeof target.closest !== "function") return;
                        // The row's existing links/buttons already know what to do.
                        // In particular never convert Deactivate to a profile click.
                        if (target.closest('button, crt-button, a, [role="button"], input, select, textarea, [contenteditable="true"]')) {
                            return;
                        }
                        const row = target.closest(".usr-directory-row");
                        if (!row) return;
                        // Reuse the existing per-record View Profile control instead
                        // of inventing a navigation URL or parsing a GUID from the DOM.
                        const controls = Array.from(row.querySelectorAll('button, [role="button"]'));
                        const viewProfileButton = controls.find(button =>
                            (button.textContent || "").replace(/\s+/g, " ").trim().toLowerCase() === "view profile"
                        );
                        if (viewProfileButton) {
                            viewProfileButton.click();
                        }
                    };

                    document[listenerKey] = onDirectoryRowClick;
                    document.addEventListener("click", onDirectoryRowClick);

                    // V10 page-scoped DOM toolbar. All helpers deliberately live INSIDE this
                    // handler: Page Designer can strip module-level declarations on Save.
                    // A toolbar error must NEVER prevent the known-good V6 list loading.
                    try {
                        const key = "__usrMCITDirectoryV10";
                        if (document[key]?.dispose) document[key].dispose();
                        const runtime = {
                            status: "All", query: "", roleId: "", members: new Set(),
                            loginById: new Map(), currentUserId: "", hasLogins: false,
                            panel: null, exportButton: null, observer: null,
                            style: null, disposed: false, sequence: 0, activeRole: null,
                            // Organizational roles are resolved for DISPLAY ONLY.
                            orgNameByUser: new Map(), orgPendingUsers: new Set(),
                            orgRoleListPromise: null
                        };
                        document[key] = runtime;
                        const guid = (x) => String(x?.value ?? x?.Id ?? x?.id ?? x ?? "").toLowerCase();
                        const asText = (x) => (x == null ? "" : String(x)).trim();
                        const validGuid = (x) => /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(x);
                        const rowsNow = () => [...document.querySelectorAll(".usr-directory-row")];
                        const elementText = (row, name) => asText(row.querySelector("." + name)?.textContent);
                        const recordId = (row) => {
                            const el = row.querySelector('[class*="usr-dir-userid-"]');
                            const mark = el && [...el.classList].find(c => c.startsWith("usr-dir-userid-"));
                            return mark ? mark.substring("usr-dir-userid-".length) : "";
                        };
                        const statusText = (row) => {
                            const badge = row.querySelector(".usr-mcit-status");
                            for (const code of ["active", "inactive", "deactivated"]) {
                                if (badge?.classList.contains("usr-mcit-status-" + code))
                                    return code;
                            }
                            const text = asText(badge?.textContent).toLowerCase();
                            return ["active", "inactive", "deactivated"].includes(text) ? text : "";
                        };
                        // V14: stable native-widget live value update. Do NOT replace the
                        // Creatio indicator providers or initialize new metrics to zero.
                        const metricKeys = ['active', 'inactive', 'deactivated'];
                        const nativeKpi = (keyName) => {
                            const tagged = document.querySelector('.usr-mcit-native-kpi-' + keyName);
                            if (tagged) return tagged;
                            const widgets = [...document.querySelectorAll('crt-indicator-widget')];
                            return widgets[metricKeys.indexOf(keyName)] || null;
                        };
                        const numberTextNode = (host) => {
                            if (!host) return null;
                            // Native metric component uses a rendered numeric text node.
                            // Do not touch the title, labels, or any other part of page.
                            const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
                            let node;
                            while ((node = walker.nextNode())) {
                                if (/^\s*\d[\d,]*\s*$/.test(node.nodeValue || '') &&
                                    !node.parentElement?.closest('.usr-mcit-live-overlay')) {
                                    return node;
                                }
                            }
                            return null;
                        };
                        const readNativeMetrics = () => {
                            const result = {};
                            for (const status of metricKeys) {
                                const node = numberTextNode(nativeKpi(status));
                                if (!node) return null;
                                const n = Number(String(node.nodeValue).replace(/,/g,''));
                                if (!Number.isFinite(n)) return null;
                                result[status] = n;
                            }
                            return result;
                        };
                        runtime.metricsOverride = null;
                        runtime.metricObserver = null;
                        let metricApplying = false;
                        const repaintMetrics = () => {
                            if (runtime.disposed || !runtime.metricsOverride || metricApplying) return;
                            metricApplying = true;
                            try {
                                for (const status of metricKeys) {
                                    const host = nativeKpi(status);
                                    if (!host) continue;
                                    const node = numberTextNode(host);
                                    const desired = String(runtime.metricsOverride[status]);
                                    if (node && node.nodeValue.trim() !== desired) {
                                        node.nodeValue = desired;
                                    }
                                }
                            } finally { metricApplying = false; }
                        };
                        runtime.commitMetricChange = (fromStatus, toStatus) => {
                            // Use the original Native KPI values as baseline, not the
                            // paged list row count (list pagination may hide users).
                            const before = runtime.metricsOverride || readNativeMetrics();
                            if (!before) {
                                console.warn('MCIT KPI: native card numbers not ready yet');
                                return false;
                            }
                            if ((before[fromStatus] || 0) < 1) return false;
                            runtime.metricsOverride = {...before};
                            runtime.metricsOverride[fromStatus]--;
                            runtime.metricsOverride[toStatus]++;
                            repaintMetrics();
                            // Creatio may redraw a widget asynchronously after the grid
                            // refresh; keep the confirmed updated count visible.
                            return true;
                        };
                        // Organization is a SysAdminUnit ORGANIZATION/DIVISION, not Contact.Account.
                        // Do not change the existing PDS Account binding: it is a fallback.
                        const decorateOrganizations = () => {
                            for (const row of rowsNow()) {
                                const id = recordId(row);
                                const orgName = runtime.orgNameByUser.get(id);
                                if (!orgName) continue;
                                const label = row.querySelector('.usr-dir-col-org');
                                if (label && asText(label.textContent) !== orgName) {
                                    // Preserve Creatio's component DOM instead of replacing
                                    // the FlexContainer and nested crt.Label elements.
                                    const target = label.querySelector('crt-label') || label;
                                    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
                                    let node = walker.nextNode();
                                    while (node && !asText(node.nodeValue)) node = walker.nextNode();
                                    if (node) node.nodeValue = orgName;
                                }
                            }
                        };

                        // Format the real PDS role summary into individual Figma tags.
                        // Keep the native Creatio Label unchanged for data binding;
                        // add badges in its FlexContainer only after the value renders.
                        const decorateRoles = () => {
                            for (const row of rowsNow()) {
                                const cell = row.querySelector('.usr-dir-col-roles');
                                if (!cell) continue;
                                const native = cell.querySelector('crt-label') ||
                                    cell.querySelector('.usr-dir-role-raw');
                                const nativeValue = asText(native?.innerText) ||
                                    asText(native?.textContent);
                                const priorValue = asText(cell.dataset.mcitOriginalRoles);
                                const raw = nativeValue || priorValue;
                                if (!raw) continue;
                                const roles = raw.split(/\s*,\s*/).map(x => x.trim()).filter(Boolean);
                                if (!roles.length) continue;
                                const normalized = roles.join(', ');
                                let chips = cell.querySelector('.usr-dir-role-chips');
                                if (chips && priorValue === normalized &&
                                    chips.children.length === roles.length) continue;
                                if (!chips) {
                                    chips = document.createElement('div');
                                    chips.className = 'usr-dir-role-chips';
                                    cell.appendChild(chips);
                                }
                                // textContent ONLY: no HTML injection or PDS mutation.
                                const nodes = roles.map(role => {
                                    const item = document.createElement('span');
                                    item.className = 'usr-dir-role-chip';
                                    item.textContent = role;
                                    return item;
                                });
                                chips.replaceChildren(...nodes);
                                chips.setAttribute('aria-label', normalized);
                                cell.dataset.mcitOriginalRoles = normalized;
                                cell.dataset.mcitRolesReady = 'true';
                            }
                        };
                        const setNotice = (message, error=false) => {
                            if (!runtime.panel) return;
                            const el = runtime.panel.querySelector(".usr-dir-feedback");
                            if (el) { el.textContent = message; el.classList.toggle("has-error", error); }
                        };
                        const activeRows = () => rowsNow().filter(row => row.style.display !== "none");
                        const apply = () => {
                            if (runtime.disposed) return;
                            let visible = 0;
                            const items = rowsNow();
                            const q = runtime.query.toLocaleLowerCase();
                            for (const row of items) {
                                const id = recordId(row);
                                const statusOk = runtime.status === "All" ||
                                    statusText(row) === runtime.status.toLowerCase();
                                const searchContent = [
                                    elementText(row,"usr-dir-name"), elementText(row,"usr-dir-col-email"),
                                    runtime.loginById.get(id) || ""
                                ].join(" ").toLocaleLowerCase();
                                const searchOk = !q || searchContent.includes(q);
                                const roleOk = !runtime.roleId || (id && runtime.members.has(id));
                                const show = statusOk && searchOk && roleOk;
                                if (row.style.display !== (show ? "" : "none"))
                                    row.style.display = show ? "" : "none";
                                if (show) visible++;
                                // UI guard only; the BP must perform its own authorization.
                                if (runtime.currentUserId && id === runtime.currentUserId) {
                                    for (const b of row.querySelectorAll('button')) {
                                        if (/^(deactivate|activate)$/i.test(asText(b.textContent))) {
                                            b.disabled = true;
                                            b.title = "You cannot change your own status";
                                            b.setAttribute("aria-disabled","true");
                                        }
                                    }
                                }
                            }
                            runtime.panel?.querySelectorAll("[data-mcit-status]").forEach(btn => {
                                const selected = btn.dataset.mcitStatus === runtime.status;
                                btn.classList.toggle("is-current", selected);
                                btn.setAttribute("aria-pressed", String(selected));
                            });
                            decorateRoles();
                            decorateOrganizations();
                            if (!runtime.roleId && !runtime.query && runtime.status === "All")
                                setNotice(`${items.length} loaded user(s)`);
                            else setNotice(`${visible} matching of ${items.length} loaded user(s)`);
                        };
                        const csvCell = (input) => {
                            let text = asText(input).replace(/\r?\n/g," ");
                            if (/^[=+@\-\t\r]/.test(text)) text = "'" + text;
                            return '"' + text.replace(/"/g,'""') + '"';
                        };
                        const exportVisible = () => {
                            const list = activeRows();
                            if (!list.length) { setNotice("No matching records to export",true); return; }
                            // Browser CSV exports only records currently loaded and displayed.
                            const columns = ["Display Name","Email","Organization","Assigned Roles",
                                "Scope Summary","Status","Last Sign-in"];
                            const lines = [columns.map(csvCell).join(",")];
                            for (const row of list) lines.push([
                                elementText(row,"usr-dir-name"), elementText(row,"usr-dir-col-email"),
                                elementText(row,"usr-dir-col-org"),
                                row.querySelector('.usr-dir-col-roles')?.dataset.mcitOriginalRoles ||
                                    elementText(row,"usr-dir-col-roles"),
                                elementText(row,"usr-dir-col-scope"), statusText(row),
                                elementText(row,"usr-dir-col-signin")
                            ].map(csvCell).join(","));
                            const url = URL.createObjectURL(new Blob(["\ufeff" + lines.join("\r\n")],
                                {type:"text/csv;charset=utf-8"}));
                            const a = document.createElement("a");
                            a.href = url; a.download = "MCIT_User_Directory_Visible.csv";
                            document.body.appendChild(a); a.click(); a.remove();
                            window.setTimeout(() => URL.revokeObjectURL(url),1000);
                            setNotice(`Exported ${list.length} currently loaded record(s)`);
                        };
                        const filterValue = async (column, value, extra=null) => {
                            const f = new sdk.FilterGroup();
                            if (sdk.LogicalOperatorType) f.logicalOperation = sdk.LogicalOperatorType.And;
                            await f.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal, column, value);
                            if (extra) await f.addSchemaColumnFilterWithParameter(
                                sdk.ComparisonType.Equal, extra[0], extra[1]);
                            return Object.assign({},f,{items:f.items});
                        };
                        const fetchModel = async (schema, attributes, filter, count=250) => {
                            const model = await sdk.Model.create(schema);
                            return model.load({attributes,
                                parameters:filter?[{type:sdk.ModelParameterType.Filter,value:filter}]:[],
                                options:{pagingConfig:{rowCount:count,rowsOffset:0}}});
                        };
                        // Org-only patch to the ORIGINAL V14.
                        // SysAdminUnitTypeValue: 1=division, 0=organization; 6=function role.
                        // Use the SAME exact SysUserInRole filter that works in V14's role
                        // dropdown (SysRole AND SysUser), rather than reading an entire
                        // SysUserInRole lookup column, which can be missing in SDK responses.
                        const getOrganizationalRoles = () => {
                            if (runtime.orgRoleListPromise) return runtime.orgRoleListPromise;
                            runtime.orgRoleListPromise = (async () => {
                                const byId = new Map();
                                for (const type of [1, 0]) {
                                    const filter = await filterValue('SysAdminUnitTypeValue', type);
                                    const records = await fetchModel('SysAdminUnit',
                                        ['Id', 'Name'], filter, 500);
                                    if ((records || []).length >= 500) {
                                        throw new Error('Too many organizational roles for one page');
                                    }
                                    for (const r of records || []) {
                                        const id = guid(r.Id);
                                        const name = asText(r.Name);
                                        if (!validGuid(id) || !name) continue;
                                        if (['all employees', 'all external users',
                                             'system administrators'].includes(name.toLowerCase())) continue;
                                        byId.set(id, { id, name, type });
                                    }
                                }
                                // Division first: e.g. TE Operations, rather than Telecom Egypt.
                                const roles = [...byId.values()].sort((a,b) =>
                                    (b.type - a.type) || a.name.localeCompare(b.name));
                                console.info('MCIT Organization: loaded', roles.length,
                                    'organizational role(s)');
                                return roles;
                            })().catch(e => {
                                console.warn('MCIT Organization: could not load roles; Account remains visible',e);
                                // Do not permanently cache an error: a refresh may fix permissions.
                                runtime.orgRoleListPromise = null;
                                return [];
                            });
                            return runtime.orgRoleListPromise;
                        };

                        const updateOrganizations = async () => {
                            if (runtime.disposed) return;
                            const ids = [...new Set(rowsNow().map(recordId).filter(validGuid))]
                                .filter(id => !runtime.orgNameByUser.has(id) &&
                                              !runtime.orgPendingUsers.has(id));
                            if (!ids.length) {decorateOrganizations();return;}
                            ids.forEach(id => runtime.orgPendingUsers.add(id));
                            try {
                                const roles = await getOrganizationalRoles();
                                if (runtime.disposed || !roles.length) return;
                                // Same access check as V14's proven Functional Role filter.
                                const orgForUser = async (userId) => {
                                    const found = [];
                                    for (const role of roles) {
                                        const filter = await filterValue('SysRole',role.id,
                                            ['SysUser',userId]);
                                        const roleMemberModel = await sdk.Model.create('SysUserInRole');
                                        const matches = await roleMemberModel.load({
                                            attributes: ['Id'],
                                            parameters: [{type:sdk.ModelParameterType.Filter,value:filter}]
                                        });
                                        if (matches?.length) found.push(role);
                                    }
                                    // TE Operations (Division) takes precedence over its parent
                                    // Telecom Egypt (Organization). If genuinely multiple divisions
                                    // are assigned, show all rather than invent a primary role.
                                    const divisions = found.filter(r => r.type === 1);
                                    const chosen = divisions.length ? divisions : found;
                                    return [...new Set(chosen.map(r=>r.name))].join(', ');
                                };
                                // Keep requests bounded; no bulk failure affects other rows.
                                for (let offset=0; offset<ids.length && !runtime.disposed;offset+=3) {
                                    const batch=ids.slice(offset,offset+3);
                                    await Promise.all(batch.map(async userId => {
                                        try {
                                            const orgName=await orgForUser(userId);
                                            if (runtime.disposed) return;
                                            if (orgName) {
                                                runtime.orgNameByUser.set(userId,orgName);
                                            } else {
                                                console.info('MCIT Organization: no assigned org role for user',userId,
                                                    '(showing Account fallback)');
                                            }
                                        } catch(e) {
                                            console.warn('MCIT Organization: membership failed for user',userId,e);
                                        } finally {
                                            runtime.orgPendingUsers.delete(userId);
                                        }
                                    }));
                                    if (!runtime.disposed) decorateOrganizations();
                                }
                            } catch(e) {
                                console.warn('MCIT Organization: lookup failed; Account fallback',e);
                            } finally {
                                ids.forEach(id=>runtime.orgPendingUsers.delete(id));
                            }
                        };

                        const loadRoles = async (select) => {
                            select.disabled = true;
                            try {
                                const filter = await filterValue("SysAdminUnitTypeValue",6);
                                const roles = await fetchModel("SysAdminUnit",["Id","Name"],filter,500);
                                if (runtime.disposed) return;
                                for (const role of [...(roles||[])].sort((a,b) =>
                                    asText(a.Name).localeCompare(asText(b.Name)))) {
                                    const id=guid(role.Id);
                                    if (!validGuid(id)) continue;
                                    const option=document.createElement("option");
                                    option.value=id; option.textContent=asText(role.Name);
                                    select.appendChild(option);
                                }
                                if ((roles||[]).length>=500)
                                    setNotice("Role list may be incomplete: over 500 roles",true);
                            } catch(e) {
                                console.error("MCIT Directory: SysAdminUnit roles",e);
                                setNotice("Cannot read system roles. Verify access permissions.",true);
                                select.title="Failed to load SysAdminUnit functional roles";
                                return;
                            }
                            select.disabled=false;
                        };
                        const loadRoleMembers = async (roleId) => {
                            const seq=++runtime.sequence;
                            runtime.members.clear();
                            if (!roleId) {apply();return;}
                            setNotice("Checking role membership...");
                            try {
                                // Query each displayed SysAdminUnit (not the summary text), so
                                // pagination of SysUserInRole cannot silently omit users.
                                const ids=[...new Set(rowsNow().map(recordId).filter(validGuid))];
                                if (!ids.length) throw new Error("User IDs are missing in the list schema");
                                const membership=[];
                                for (const id of ids) {
                                    const f=await filterValue("SysRole",roleId,["SysUser",id]);
                                    const model=await sdk.Model.create("SysUserInRole");
                                    const matches=await model.load({attributes:["Id"],parameters:[{
                                        type:sdk.ModelParameterType.Filter,value:f}]});
                                    if (matches?.length) membership.push(id);
                                }
                                if (runtime.disposed || seq!==runtime.sequence) return;
                                membership.filter(Boolean).forEach(id=>runtime.members.add(id));
                                apply();
                            } catch(e) {
                                console.error("MCIT Directory: SysUserInRole membership",e);
                                if (runtime.disposed || seq!==runtime.sequence) return;
                                runtime.roleId="";
                                const select=runtime.panel?.querySelector(".usr-dir-role-select");
                                if (select) select.value="";
                                apply();
                                setNotice("Role filter unavailable: check system-role permissions",true);
                            }
                        };
                        const getCurrentUser = async () => {
                            let id = typeof Terrasoft !== "undefined"
                                ? guid(Terrasoft?.SysValue?.CURRENT_USER) : "";
                            if (validGuid(id)) return id;
                            // Resolve user through Contact when session API exposes Contact only.
                            try {
                                const service=new sdk.SysValuesService();
                                const values=await service.loadSysValues();
                                const contactId=guid(values?.userContact);
                                if (!validGuid(contactId)) return "";
                                const f=await filterValue("Contact",contactId);
                                const found=await fetchModel("SysAdminUnit",["Id"],f,1);
                                id=guid(found?.[0]?.Id);
                                return validGuid(id) ? id : "";
                            } catch(e) {console.warn("MCIT Directory: current user not resolved",e);return "";}
                        };
                        const updateLogins = async () => {
                            // Directory ID = SysAdminUnit.Name; not a copied role summary.
                            const ids=[...new Set(rowsNow().map(recordId).filter(validGuid))]
                                .filter(id=>!runtime.loginById.has(id));
                            if (!ids.length) return;
                            try {
                                const model=await sdk.Model.create("SysAdminUnit");
                                await Promise.all(ids.map(async id=> {
                                    const filter=await filterValue("Id",id);
                                    const recs=await model.load({attributes:["Id","Name"],parameters:[{
                                        type:sdk.ModelParameterType.Filter,value:filter}]});
                                    if (recs?.[0]?.Name) runtime.loginById.set(id,asText(recs[0].Name));
                                }));
                                if (!runtime.disposed) {runtime.hasLogins=true;apply();}
                            } catch(e) {console.info("Directory ID search fallback to name/email",e);}
                        };
                        const createPanel=() => {
                            const host=document.createElement("section");
                            host.className="usr-dir-toolbar";
                            host.setAttribute("aria-label","User directory filters");
                            const line=document.createElement("div"); line.className="usr-dir-filter-line";
                            const search=document.createElement("input");
                            search.type="search";search.className="usr-dir-search";
                            search.placeholder="Search by name, email, or directory ID...";
                            search.setAttribute("aria-label","Search by name, email, or directory ID");
                            search.autocomplete="off";
                            search.addEventListener("input",()=>{runtime.query=search.value.trim();apply();});
                            const select=document.createElement("select");
                            select.className="usr-dir-role-select";
                            select.setAttribute("aria-label","Select functional role");
                            const all=document.createElement("option");all.value="";all.textContent="All Roles";
                            select.appendChild(all);
                            select.addEventListener("change",()=>{
                                runtime.roleId=select.value;loadRoleMembers(runtime.roleId);
                            });
                            line.append(search,select);
                            const chips=document.createElement("div");chips.className="usr-dir-chips";
                            for (const status of ["All","Active","Inactive","Deactivated"]) {
                                const b=document.createElement("button");b.type="button";
                                b.dataset.mcitStatus=status;b.textContent=status;
                                b.addEventListener("click",()=>{runtime.status=status;apply();});
                                chips.appendChild(b);
                            }
                            const feedback=document.createElement("div");
                            feedback.className="usr-dir-feedback";
                            host.append(line,chips,feedback);
                            loadRoles(select);
                            return host;
                        };
                        // Keep the native KPI cards; fix the *real* measured gap
                        // between those cards and the search panel, on any viewport.
                        // The layout is measured after the widgets paint, not guessed
                        // from Figma pixel positions or based on the number of users.
                        let compactFrame = 0;
                        const compactDirectory = () => {
                            if (runtime.disposed || !runtime.panel?.isConnected) return;
                            const cards = metricKeys.map(nativeKpi).filter(Boolean)
                                .map(el=>el.getBoundingClientRect()).filter(r=>r.height>0);
                            const grid = document.querySelector('.usr-dir-kpi-layout');
                            const cardBottom = cards.length ? Math.max(...cards.map(r=>r.bottom))
                                : grid?.getBoundingClientRect().bottom;
                            if (!Number.isFinite(cardBottom)) return;
                            const toolbar=runtime.panel;
                            const gap=toolbar.getBoundingClientRect().top-cardBottom;
                            const desired=15;
                            if (!Number.isFinite(gap) || gap<0 || Math.abs(gap-desired)<3) return;
                            const current=parseFloat(getComputedStyle(toolbar).marginTop) || 0;
                            const nextMargin=Math.max(-500,Math.min(18,current+desired-gap));
                            if (Math.abs(nextMargin-current)>2) {
                                toolbar.style.setProperty('margin-top',nextMargin+'px','important');
                            }
                        };
                        const scheduleCompact = () => {
                            if (runtime.disposed || compactFrame) return;
                            compactFrame=requestAnimationFrame(()=>{
                                compactFrame=0;
                                compactDirectory();
                            });
                        };
                        const onDirectoryResize=()=>scheduleCompact();
                        window.addEventListener('resize',onDirectoryResize);
                        const compactTimers=[140,550,1250].map(delay=>
                            window.setTimeout(()=>{
                                if (!runtime.disposed) {
                                    compactDirectory();
                                    decorateRoles();
                                }
                            },delay));
                        const mount=()=>{
                            if (runtime.disposed) return;
                            const header=document.querySelector(".usr-directory-header");
                            if (!header?.parentElement) return;
                            if (!runtime.panel || !runtime.panel.isConnected) {
                                if (!runtime.panel) runtime.panel=createPanel();
                                header.parentElement.insertBefore(runtime.panel,header);
                            }
                            const title=document.querySelector(".usr-directory-title");
                            if (title && (!runtime.exportButton || !runtime.exportButton.isConnected)) {
                                const exp=document.createElement("button");
                                exp.type="button";exp.className="usr-dir-export";
                                exp.textContent="⇩ Export";
                                exp.title="Export currently loaded, filtered users as CSV";
                                exp.addEventListener("click",exportVisible);
                                title.appendChild(exp);runtime.exportButton=exp;
                            }
                            apply();
                            scheduleCompact();
                        };
                        const sheet=document.createElement("style");
                        sheet.id="usr-directory-v10-styles";
                        sheet.textContent=`
                          .usr-dir-toolbar{background:#fff;border:1px solid #e1e5ee;border-radius:10px;
                            padding:16px 17px 12px;margin:18px 0 16px;box-sizing:border-box;width:100%;}
                          .usr-dir-filter-line{display:flex;align-items:stretch;gap:12px;width:100%;}
                          .usr-dir-search{box-sizing:border-box!important;min-width:0;flex:1;
                            border:1px solid #dce2eb!important;background:#fff!important;color:#11223e!important;
                            border-radius:9px!important;min-height:38px;padding:9px 13px!important;
                            font-size:13px!important;outline:none;cursor:text!important;}
                          .usr-dir-search:focus,.usr-dir-role-select:focus{outline:2px solid #7d32ff!important;
                            outline-offset:1px;}
                          .usr-dir-role-select{width:210px;min-height:38px;box-sizing:border-box;
                            border:1px solid #dce2eb;border-radius:9px;background:#fff;color:#1b2942;
                            padding:8px 12px;font-size:13px;cursor:pointer;}
                          .usr-dir-chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px;}
                          .usr-dir-chips button{border:1px solid #dce4ef;background:#f8fafc;color:#283b53;
                            padding:5px 14px;border-radius:22px;font-size:12px;min-height:29px;cursor:pointer;}
                          .usr-dir-chips button:hover{background:#f0ecff;}
                          .usr-dir-chips button.is-current{color:#641de7;border-color:#762cff;background:#f6efff;}
                          .usr-dir-feedback{font-size:11px;color:#7b8798;margin-top:6px;min-height:13px;}
                          .usr-dir-feedback.has-error{color:#bd3131;}
                          .usr-directory-title{position:relative!important;min-height:37px;width:100%!important;max-width:100%!important;box-sizing:border-box!important;align-self:stretch!important;flex-grow:1!important;}
                          .usr-dir-export{position:absolute;right:10px;top:4px;display:flex;align-items:center;
                            border:1px solid #dce2eb;border-radius:9px;color:#17233d;background:#fff;
                            padding:9px 16px;cursor:pointer;font-size:12px;font-weight:600;}
                          .usr-dir-export:hover{border-color:#a58bef;background:#fbf9ff;}
                          .usr-directory-header{background:#f7f9fc!important;border:1px solid #e3e8f1;
                            border-radius:7px 7px 0 0;}
                          .usr-directory-row{border-left:1px solid #e3e8f1;border-right:1px solid #e3e8f1;
                            min-height:57px!important;}
                          .usr-directory-row:hover{background:#f9f6ff!important;}
                          .usr-directory-row button{border-radius:8px!important;}
                          .usr-mcit-status{display:inline-flex!important;align-items:center!important;
                            padding:3px 9px!important;border-radius:20px!important;width:max-content!important;}
                          .usr-mcit-status-active{color:#108b4c!important;background:#e9f9f0!important;}
                          .usr-mcit-status-inactive{color:#ae6b05!important;background:#fff5df!important;}
                          .usr-mcit-status-deactivated{color:#d52b39!important;background:#fff0f1!important;}
                          @media(max-width:800px){.usr-dir-filter-line{flex-direction:column;}
                            .usr-dir-role-select{width:100%;}.usr-dir-export{position:static;margin-top:8px;}}

                          /* V14 Figma alignment: layout/presentation ONLY. */
                          body .usr-dir-page-frame,
                          body .usr-dir-content-zone {
                            background:#f8f7fd!important;
                            box-shadow:none!important;
                          }
                          body .usr-dir-page-frame {
                            min-height:0!important;
                            height:auto!important;
                            box-sizing:border-box!important;
                            padding-top:16px!important;
                            padding-bottom:0!important;
                            justify-content:flex-start!important;
                            align-content:flex-start!important;
                            row-gap:0!important;
                          }
                          /* Do not let intermediary Creatio wrappers reserve blank space. */
                          body .usr-dir-page-frame:has(.usr-dir-kpi-layout),
                          body .usr-dir-content-zone {
                            min-height:0!important;
                            height:auto!important;
                            justify-content:flex-start!important;
                            align-content:flex-start!important;
                          }
                          body .usr-dir-content-zone {
                            margin-top:0!important;
                            padding-top:0!important;
                            row-gap:0!important;
                          }
                          /* Match the same centered canvas used by User Profile. */
                          body .usr-directory-title,
                          body .usr-dir-kpi-layout,
                          body .usr-dir-view-layout {
                            width:min(1240px,calc(100% - 32px))!important;
                            max-width:1240px!important;
                            min-width:0!important;
                            margin-left:auto!important;
                            margin-right:auto!important;
                            box-sizing:border-box!important;
                          }
                          /* Remove the full-width white title strip; keep contents centered. */
                          body *:has(> .usr-directory-title),
                          body *:has(> * > .usr-directory-title) {
                            background:#f8f7fd!important;
                            box-shadow:none!important;
                          }
                          body .usr-directory-title {
                            margin-top:0!important;
                            margin-bottom:10px!important;
                            padding-left:17px!important;
                            padding-right:0!important;
                            background:transparent!important;
                            align-self:center!important;
                            flex-grow:0!important;
                          }
                          body .usr-dir-kpi-layout {
                            margin-top:0!important;
                            margin-bottom:0!important;
                            min-height:0!important;
                            height:auto!important;
                            background:transparent!important;
                            justify-self:center!important;
                          }
                          /* KPI and toolbar now share the same content wrapper;
                             no intermediate MainContainer grid track can add a void. */
                          body .usr-dir-view-layout .usr-dir-kpi-layout {
                            width:100%!important;
                            max-width:none!important;
                            min-height:0!important;
                            height:max-content!important;
                            margin:0!important;
                            padding:0!important;
                            align-self:stretch!important;
                            flex:0 0 auto!important;
                          }
                          body .usr-dir-view-layout {
                            display:flex!important;
                            flex-direction:column!important;
                            margin-top:0!important;
                            margin-bottom:18px!important;
                            padding:0!important;
                            background:transparent!important;
                            min-height:0!important;
                            height:auto!important;
                            flex-grow:0!important;
                            align-self:center!important;
                            justify-content:flex-start!important;
                            align-content:flex-start!important;
                            gap:0!important;
                            row-gap:0!important;
                            overflow:visible!important;
                            border-radius:11px;
                          }
                          body .usr-dir-view-layout .usr-dir-kpi-layout + * {
                            min-height:0!important;
                            height:auto!important;
                            margin-bottom:0!important;
                          }
                          /* Let the table end at the final row instead of filling the viewport. */
                          body .usr-dir-content-zone,
                          body .usr-dir-row-list {
                            background:#f8f7fd!important;
                            min-height:0!important;
                            box-shadow:none!important;
                          }
                          body .usr-dir-row-list {
                            height:auto!important;
                            flex:0 0 auto!important;
                          }
                          /* Close the table around the last real row; do not
                             leave a loose white band below the list. */
                          body .usr-dir-view-layout .usr-dir-row-list:has(.usr-directory-row) {
                            border:1px solid #e0e7f1!important;
                            border-top:0!important;
                            border-radius:0 0 10px 10px!important;
                            background:#fff!important;
                            overflow:hidden!important;
                            margin:0!important;
                            padding:0!important;
                            box-sizing:border-box!important;
                            box-shadow:none!important;
                          }
                          /* V19: role tags exactly as in the Figma reference. */
                          body .usr-directory-row .usr-dir-col-roles {
                            display:flex!important;
                            flex-direction:column!important;
                            align-items:flex-start!important;
                            justify-content:center!important;
                            min-width:0!important;
                            width:100%!important;
                            gap:0!important;
                            background:transparent!important;
                            border:0!important;
                            padding:0!important;
                            overflow:visible!important;
                          }
                          /* The bound native label stays alive for Creatio updates,
                             but is visually replaced only when badges are ready. */
                          body .usr-directory-row .usr-dir-col-roles[data-mcit-roles-ready="true"] crt-label,
                          body .usr-directory-row .usr-dir-col-roles[data-mcit-roles-ready="true"] .usr-dir-role-raw {
                            display:none!important;
                          }
                          body .usr-directory-row .usr-dir-role-chips {
                            display:flex!important;
                            flex-flow:column wrap!important;
                            align-items:flex-start!important;
                            gap:4px!important;
                            max-width:100%!important;
                            width:100%!important;
                            line-height:1.35!important;
                          }
                          body .usr-directory-row .usr-dir-role-chip {
                            display:inline-flex!important;
                            width:max-content!important;
                            max-width:100%!important;
                            box-sizing:border-box!important;
                            align-items:center!important;
                            white-space:normal!important;
                            background:#f5edff!important;
                            color:#671bc9!important;
                            border:1px solid #d9b3ff!important;
                            border-radius:999px!important;
                            padding:2px 8px!important;
                            font-size:11px!important;
                            font-weight:600!important;
                            line-height:1.35!important;
                          }
                          /* More room for scope and a visible gap before Status. */
                          body .usr-directory-row .usr-dir-col-scope {
                            box-sizing:border-box!important;
                            width:100%!important;
                            min-width:0!important;
                            padding-right:15px!important;
                            line-height:1.5!important;
                            overflow-wrap:break-word!important;
                          }
                          body .usr-dir-view-layout .usr-mcit-status {
                            padding-left:6px!important;
                            box-sizing:border-box!important;
                            white-space:nowrap!important;
                            margin-right:8px!important;
                            max-width:100%!important;
                          }
                          /* V20: give both native action buttons full space in every row.
                             Keep the original handlers and visually hide no action. */
                          body .usr-dir-view-layout .usr-directory-row .usr-dir-col-actions {
                            box-sizing:border-box!important;
                            display:flex!important;
                            flex-direction:row!important;
                            flex-wrap:nowrap!important;
                            align-items:center!important;
                            justify-content:flex-start!important;
                            width:100%!important;
                            max-width:100%!important;
                            min-width:0!important;
                            gap:8px!important;
                            padding:0!important;
                            margin:0!important;
                            overflow:visible!important;
                            white-space:nowrap!important;
                          }
                          body .usr-dir-view-layout .usr-directory-row .usr-dir-col-actions crt-button,
                          body .usr-dir-view-layout .usr-directory-row .usr-dir-col-actions button {
                            flex:0 0 auto!important;
                            min-width:max-content!important;
                            white-space:nowrap!important;
                          }
                          body .usr-dir-view-layout .usr-dir-col-signin {
                            padding-left:5px!important;
                            white-space:nowrap!important;
                          }
                          body .usr-dir-view-layout .usr-dir-toolbar {
                            width:100%!important;
                            margin:12px 0 16px!important;
                            padding:15px 17px 12px!important;
                            border:1px solid #dee5ef!important;
                            border-radius:11px!important;
                            box-shadow:none!important;
                            background:#fff!important;
                          }
                          /* Single contiguous table, not separate white cards per row. */
                          body .usr-dir-view-layout .usr-directory-header {
                            background:#f7f9fc!important;
                            border:1px solid #e0e7f1!important;
                            border-radius:10px 10px 0 0!important;
                            margin:0!important;
                          }
                          body .usr-dir-view-layout .usr-dir-row-list,
                          body .usr-dir-view-layout .usr-dir-row-list > *,
                          body .usr-dir-view-layout .usr-dir-row-list > * > * {
                            row-gap:0!important;
                            gap:0!important;
                            margin-top:0!important;
                            margin-bottom:0!important;
                          }
                          body .usr-dir-view-layout .usr-dir-row-list :has(> .usr-directory-row) {
                            padding-top:0!important;
                            padding-bottom:0!important;
                            margin:0!important;
                          }
                          body .usr-dir-view-layout .usr-directory-row {
                            background:#fff!important;
                            border-left:0!important;
                            border-right:0!important;
                            border-top:0!important;
                            border-bottom:1px solid #e9edf4!important;
                            border-radius:0!important;
                            box-shadow:none!important;
                            margin:0!important;
                          }
                          /* TemplateList may wrap rows: remove the final row
                             separator, while the outer border remains visible. */
                          body .usr-dir-view-layout .usr-dir-row-list > :last-child .usr-directory-row,
                          body .usr-dir-view-layout .usr-dir-row-list > .usr-directory-row:last-child {
                            border-bottom:0!important;
                          }
                          body .usr-dir-view-layout .usr-directory-row:hover,
                          body .usr-dir-view-layout .usr-directory-row:focus-within {
                            background:#f7f4ff!important;
                          }
                          body .usr-dir-view-layout .usr-directory-row:last-child {
                            border-radius:0!important;
                          }
                          /* V21: Creatio TemplateList can leave a faint 5px white
                             renderer strip BELOW the list's actual bottom border.
                             Mask only that strip with the page colour and redraw
                             its 1px edge. No list data, row or button is changed. */
                          body .usr-dir-view-layout:has(.usr-dir-row-list .usr-directory-row) {
                            position:relative!important;
                            isolation:isolate!important;
                          }
                          body .usr-dir-view-layout:has(.usr-dir-row-list .usr-directory-row)::after {
                            content:"";
                            position:absolute!important;
                            bottom:0!important;
                            left:0!important;
                            right:0!important;
                            height:6px!important;
                            box-sizing:border-box!important;
                            border-top:1px solid #e0e7f1!important;
                            background:#f8f7fd!important;
                            pointer-events:none!important;
                            z-index:2!important;
                          }
                          body .usr-directory-title .usr-dir-export {
                            right:0!important;
                            top:2px!important;
                            border-radius:9px!important;
                          }
                          @media(max-width:800px) {
                            body .usr-directory-title,body .usr-dir-kpi-layout,
                            body .usr-dir-view-layout {width:calc(100% - 20px)!important;}
                            body .usr-dir-page-frame {padding-top:10px!important;}
                            body .usr-dir-view-layout {overflow-x:auto!important;}
                            body .usr-directory-title {padding-left:0!important;}
                            body .usr-directory-title .usr-dir-export {
                              position:static!important;margin:9px 0 0!important;
                            }
                          }
                        `;
                        document.head.appendChild(sheet);runtime.style=sheet;
                        runtime.dispose=()=>{
                            runtime.disposed=true;
                            runtime.sequence++;
                            runtime.observer?.disconnect();
                            runtime.metricObserver?.disconnect();
                            if (compactFrame) cancelAnimationFrame(compactFrame);
                            window.removeEventListener('resize',onDirectoryResize);
                            compactTimers.forEach(id=>window.clearTimeout(id));
                            runtime.panel?.remove();runtime.exportButton?.remove();runtime.style?.remove();
                        };
                        mount();
                        // Observe ONLY inserted/removed directory rows/header. Changing filter
                        // styles never triggers this watcher, avoiding V9's infinite loop.
                        runtime.observer=new MutationObserver(mutations=>{
                            if (runtime.disposed) return;
                            const relevant=mutations.some(m=>[...m.addedNodes,...m.removedNodes].some(n=>
                                n.nodeType===1 && (n.matches?.(".usr-directory-row,.usr-directory-header") ||
                                n.querySelector?.(".usr-directory-row,.usr-directory-header"))));
                            const rolesRepainted=mutations.some(m=>{
                                const element=m.target?.nodeType===1 ? m.target : m.target?.parentElement;
                                if (!element?.closest?.('.usr-dir-col-roles')) return false;
                                if (element.closest('.usr-dir-role-chips')) return false;
                                return [...m.addedNodes,...m.removedNodes].some(n=>
                                    n.nodeType===3 || (n.nodeType===1 && !n.classList?.contains('usr-dir-role-chips')));
                            });
                            if (relevant || !runtime.panel?.isConnected) {
                                mount();
                                if (relevant) {
                                    updateLogins();
                                    updateOrganizations();
                                }
                                if (relevant && runtime.roleId) loadRoleMembers(runtime.roleId);
                            } else if (rolesRepainted) {
                                // Wait until native crt.Label finishes committing text.
                                requestAnimationFrame(()=>{if(!runtime.disposed)decorateRoles();});
                            }
                        });
                        runtime.observer.observe(document.body,{childList:true,subtree:true});
                        // Re-apply confirmed count if a native widget redraws.
                        runtime.metricObserver = new MutationObserver(mutations => {
                            if (!runtime.metricsOverride || runtime.disposed || metricApplying) return;
                            const relevant = mutations.some(m => {
                                if (m.type === 'characterData') {
                                    return Boolean(m.target.parentElement?.closest('.usr-mcit-native-kpi'));
                                }
                                return [...m.addedNodes, ...m.removedNodes].some(n =>
                                    n.nodeType === 1 && (n.matches?.('.usr-mcit-native-kpi, crt-indicator-widget') ||
                                        n.querySelector?.('.usr-mcit-native-kpi, crt-indicator-widget')));
                            });
                            if (relevant) repaintMetrics();
                        });
                        runtime.metricObserver.observe(document.body, {childList:true, characterData:true, subtree:true});
                        getCurrentUser().then(id=>{if (!runtime.disposed){runtime.currentUserId=id;apply();}});
                        updateLogins();
                        updateOrganizations();
                    } catch(e) {
                        // Never interrupt page initialization on toolbar failure.
                        console.error("MCIT V10 toolbar init failed; original V6 remains available",e);
                    }
                    return result;
                }
            },
            {
                request: "crt.HandleViewModelDestroyRequest",
                handler: async (request, next) => {
                    if (typeof document !== "undefined") {
                        const listenerKey = "__usrMCITUserDirectoryV4RowListener";
                        if (typeof document[listenerKey] === "function") {
                            document.removeEventListener("click", document[listenerKey]);
                            delete document[listenerKey];
                        }
                        document.getElementById("usr-mcit-user-directory-v4-css")?.remove();
                        document.__usrMCITDirectoryV10?.dispose?.();
                        delete document.__usrMCITDirectoryV10;
                    }
                    return next?.handle(request);
                }
            },
            {
                request: "usr.ChangeMCITUserStatus",
                handler: async (request, next) => {
                    const ACTIVE_ID = "4ee823ca-22a2-4291-9dda-4c32f52aba0f";
                    const DEACTIVATED_ID = "e535941b-12df-4d6e-b4a5-39b6da20b6eb";
                    // IMPORTANT: Compare to the CODE on the published Process Designer page.
                    const PROCESS_CODE = "UsrProcess_35b6004";
                    const id = String(request.recordId?.value ?? request.recordId ?? "");
                    const val = request.currentStatus;
                    const rawId = String(val?.value ?? val?.Id ?? val?.id ?? val ?? "").toLowerCase();
                    const rawName = String(val?.displayValue ?? val?.Name ?? val ?? "").toLowerCase();
                    const isActive = rawId === ACTIVE_ID || rawName === "active";
                    const isDeactivated = rawId === DEACTIVATED_ID || rawName === "deactivated";
                    if (!/^[0-9a-f-]{36}$/i.test(id) || (!isActive && !isDeactivated)) {
                        alert("This record does not have a valid Active / Deactivated status or record Id.");
                        return;
                    }
                    const targetUser = request.targetUser;
                    const userId = String(targetUser?.value ?? targetUser?.Id ?? targetUser?.id ?? "").toLowerCase();
                    const loggedInUser = (typeof Terrasoft !== "undefined")
                        ? String(Terrasoft?.SysValue?.CURRENT_USER?.value ?? "").toLowerCase() : "";
                    if (loggedInUser && loggedInUser === userId) {
                        alert("You cannot change the status of your own account.");
                        return;
                    }
                    const action = isActive ? "Deactivate" : "Activate";
                    if (!window.confirm(`${action} this portal user?`)) return;
                    try {
                        // Resolve the ID from the real lookup instead of assuming a GUID.
                        const targetStatusName = isActive ? "Deactivated" : "Active";
                        const model = await sdk.Model.create("UsrMCITUserStatus");
                        const filters = new sdk.FilterGroup();
                        await filters.addSchemaColumnFilterWithParameter(
                            sdk.ComparisonType.Equal, "Name", targetStatusName);
                        const found = await model.load({
                            attributes: ["Id", "Name"],
                            parameters: [{ type: sdk.ModelParameterType.Filter, value: filters }]
                        });
                        if (!found?.length || !found[0]?.Id) {
                            throw new Error(`Cannot find the ${targetStatusName} status in MCIT User Status lookup.`);
                        }
                        const targetStatusId = found[0].Id;
                        const svc = new sdk.ProcessEngineService();
                        const result = await svc.executeProcessByName(
                            PROCESS_CODE,
                            { UserAccessId: id, TargetStatusId: targetStatusId },
                            []
                        );
                        if (result?.isSuccess === false || result?.success === false) {
                            throw new Error("The Change MCIT Portal User Status process did not start successfully.");
                        }
                        // executeProcessByName can report that a process was started before
                        // its Modify Data element has committed. Never reload on start alone.
                        // Read the actual saved status of this exact MCIT Portal User Access record.
                        const accessModel = await sdk.Model.create("UsrMCITPortalUserAccess");
                        const recordFilter = new sdk.FilterGroup();
                        await recordFilter.addSchemaColumnFilterWithParameter(
                            sdk.ComparisonType.Equal, "Id", id);
                        const expectedId = String(targetStatusId).toLowerCase();
                        let persisted = false;
                        let lastSeen = "(not found)";
                        for (let attempt = 0; attempt < 12; attempt++) {
                            if (attempt > 0) {
                                await new Promise(resolve => setTimeout(resolve, 750));
                            }
                            const rows = await accessModel.load({
                                attributes: ["Id", "UsrUserStatus"],
                                parameters: [{
                                    type: sdk.ModelParameterType.Filter,
                                    value: recordFilter
                                }]
                            });
                            const actual = rows?.[0]?.UsrUserStatus;
                            const actualId = String(actual?.value ?? actual?.Id ?? actual?.id ?? actual ?? "").toLowerCase();
                            const actualName = String(actual?.displayValue ?? actual?.Name ?? "").toLowerCase();
                            lastSeen = actualName || actualId || "(empty status)";
                            if (actualId === expectedId || actualName === targetStatusName.toLowerCase()) {
                                persisted = true;
                                break;
                            }
                        }
                        if (!persisted) {
                            console.error("MCIT status process started but saved status did not change", {
                                processCode: PROCESS_CODE,
                                processId: result?.processId,
                                userAccessId: id,
                                expectedStatus: targetStatusName,
                                observedStatus: lastSeen
                            });
                            alert("The process started, but the new status was not saved. " +
                                "Current saved status: " + lastSeen + ". " +
                                "Check Process Log -> Change MCIT Portal User Status -> Modify Data. " +
                                "Verify filter Id = UserAccessId, Status = TargetStatusId, " +
                                "and process code " + PROCESS_CODE + ".");
                            return;
                        }
                        // Refresh ONLY the User Directory datasource. Do not navigate or
                        // reload the browser: the TemplateList is bound to PDS/Items.
                        await request.$context.executeRequest({
                            type: "crt.LoadDataRequest",
                            $context: request.$context,
                            config: {
                                loadType: "reload",
                                useLastLoadParameters: true
                            },
                            dataSourceName: "PDS"
                        });
                        // V14: Keep the ORIGINAL three native Creatio widgets and
                        // update their on-screen numbers immediately after the change
                        // is confirmed. No full reload or KPI unmount/remount.
                        const fromMetric = isActive ? "active" : "deactivated";
                        const toMetric = isActive ? "deactivated" : "active";
                        if (typeof document !== "undefined") {
                            const changed = document.__usrMCITDirectoryV10?.commitMetricChange?.(
                                fromMetric, toMetric);
                            if (!changed) {
                                console.warn("MCIT: live KPI update was not applied; native widget values remain intact.");
                            }
                        }
                    } catch (e) {
                        console.error("MCIT status change failed", e);
                        alert("Status update failed. Check the process CODE, process log, and permissions. " + (e?.message || ""));
                    }
                    return next?.handle(request);
                }
            }
        ]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{
			
"usr.MCITUserClasses": (value) => {
    const id = String(value?.value ?? value?.Id ?? value?.id ?? "").toLowerCase();
    const result = ["usr-dir-name"];
    if (/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(id))
        result.push("usr-dir-userid-" + id);
    return result;
},
"usr.MCITRowClasses": (value) => {
    const id = String(value?.value ?? value ?? "").toLowerCase();
    const classes = ["usr-directory-row"];
    if (/^[0-9a-f-]{36}$/.test(id)) classes.push(`usr-access-record-${id}`);
    return classes;
},
"usr.MCITBadgeClasses": (value) => {
    const text = String(value?.displayValue ?? value?.Name ?? value ?? "").toLowerCase();
    const id = String(value?.value ?? value?.Id ?? value?.id ?? value ?? "").toLowerCase();
    let status = text === "active" || id === "4ee823ca-22a2-4291-9dda-4c32f52aba0f" ? "active" :
                 text === "deactivated" || id === "e535941b-12df-4d6e-b4a5-39b6da20b6eb" ? "deactivated" : "inactive";
    return ["usr-mcit-status", `usr-mcit-status-${status}`];
},
"usr.MCITActionColor": (value) => {
    const id = String(value?.value ?? value?.Id ?? value?.id ?? value ?? "").toLowerCase();
    const name = String(value?.displayValue ?? value?.Name ?? value ?? "").toLowerCase();
    return (id === "e535941b-12df-4d6e-b4a5-39b6da20b6eb" || name === "deactivated") ? "primary" : "outline";
},
"usr.MCITActionDisabled": (value) => {
    const id = String(value?.value ?? value?.Id ?? value?.id ?? value ?? "").toLowerCase();
    const name = String(value?.displayValue ?? value?.Name ?? value ?? "").toLowerCase();
    return !["4ee823ca-22a2-4291-9dda-4c32f52aba0f", "e535941b-12df-4d6e-b4a5-39b6da20b6eb"].includes(id)
        && !["active", "deactivated"].includes(name);
},
"usr.StatusActionCaption": (value) => {
    const status = typeof value === "string"
        ? value
        : (value?.displayValue || value?.Name || "");

    return status === "Active"
        ? "Deactivate"
        : "Activate";
},
			
"usr.LookupText": (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value.displayValue || value.Name || "";
}


		}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});