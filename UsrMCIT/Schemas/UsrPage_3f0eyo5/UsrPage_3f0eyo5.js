define("UsrPage_3f0eyo5", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "TitleContainer",
				"values": {
					"direction": "column",
					"alignItems": "flex-start",
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
				"name": "PageTitle",
				"values": {
					"caption": "#MacrosTemplateString(#ResourceString(PageTitle_caption)#)#",
					"visible": true
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
				"name": "FolderTree"
			},
			{
				"operation": "remove",
				"name": "Filters"
			},
			{
				"operation": "merge",
				"name": "MainTabPanel",
				"values": {
					"mode": "tab"
				}
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "12c3d74b-4b9d-096d-002c-569c14a2dab5",
							"code": "PDS_UsrUser",
							"caption": "#ResourceString(PDS_UsrUser)#",
							"dataValueType": 10,
							"width": 159.98748779296875
						},
						{
							"id": "d8de7242-c5c2-4a55-c02a-eeeb9f60e507",
							"code": "PDS_UsrUser_Contact_Email",
							"caption": "#ResourceString(PDS_UsrUser_Contact_Email)#",
							"dataValueType": 45,
							"width": 135.9937286376953
						},
						{
							"id": "e3c499da-da38-8751-db3b-24e531bc6fc0",
							"code": "PDS_UsrUserStatus",
							"caption": "#ResourceString(PDS_UsrUserStatus)#",
							"dataValueType": 10,
							"width": 138.98748779296875
						},
						{
							"id": "7fc5f39d-3817-ecb4-78fc-1c8ed822b4ab",
							"code": "PDS_UsrUser_Contact_Account",
							"caption": "#ResourceString(PDS_UsrUser_Contact_Account)#",
							"dataValueType": 10,
							"width": 171.98748779296875
						},
						{
							"id": "9cd00cd2-e1d6-33b3-e151-90a85db7877c",
							"code": "PDS_UsrAssignedRolesSummary",
							"caption": "#ResourceString(PDS_UsrAssignedRolesSummary)#",
							"dataValueType": 30,
							"width": 182.9937286376953
						},
						{
							"id": "0f3d3d8e-c56f-581b-4532-a2c8f25fb3f8",
							"code": "PDS_UsrScopeSummary",
							"caption": "#ResourceString(PDS_UsrScopeSummary)#",
							"dataValueType": 30,
							"width": 172.9937286376953
						},
						{
							"id": "cb06e5de-20af-5a71-7364-1f4a2b0122c1",
							"code": "PDS_UsrLastSignIn",
							"caption": "#ResourceString(PDS_UsrLastSignIn)#",
							"dataValueType": 7
						},
						{
							"id": "8f10cdee-ac70-4093-acad-16e0c7e4c901",
							"code": "PDS_UsrActions",
                                 "caption": "Actions",
                                 "dataValueType": 10,
                                 "width": 240,
							"cellView": {
								"type": "crt.FlexContainer",
								"direction": "row",
								"wrap": "nowrap",
								"gap": "small",
								"items": [
									{
										"type": "crt.Button",
										"caption": "View Profile",
										"color": "outline",
										"size": "small",
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
										"caption": "$Items.PDS_UsrUserStatus | usr.ToggleUserStatusCaption",
										"color": "outline",
										"size": "small",
										"clicked": {
											"request": "usr.ToggleMCITUserStatus",
											"params": {
												"recordId": "$Items.PDS_Id",
												"currentStatus": "$Items.PDS_UsrUserStatus"
											}
										}
									}
								]
							}
						}
					],
					"placeholder": false,
					"features": {
						"rows": {
							"selection": false,
							"numeration": false
						},
						"editable": {
							"enable": true,
							"itemsCreation": true,
							"floatingEditPanel": true
						},
						"columns": {
							"dragAndDrop": true
						}
					},
					"visible": true
				}
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
				"name": "Label_lg8st5b",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_lg8st5b_caption)#)#",
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
				"name": "GridContainer_r0c31lr",
				"values": {
					"type": "crt.GridContainer",
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
				"name": "FlexContainer_mkq33n1",
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
						"left": "small"
					},
					"color": "transparent",
					"borderRadius": "none",
					"alignItems": "flex-start",
					"justifyContent": "start",
					"gap": "large"
				},
				"parentName": "GridContainer_r0c31lr",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_ta4h473",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_ta4h473_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_ta4h473_config_text_template)#",
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
								"attribute": "IndicatorWidget_ta4h473_Data",
								"schemaName": "UsrMCITPortalUserAccess",
								"filters": {
									"filter": {
										"items": {
											"897ac33b-fc40-4b1a-b472-15f997595412": {
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
						"hint": "#ResourceString(IndicatorWidget_ta4h473_hint)#",
						"hideTitle": true
					},
					"visible": true,
					"layoutConfig": {
						"width": 97.50624084472656
					}
				},
				"parentName": "FlexContainer_mkq33n1",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_e8yjyso",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_e8yjyso_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "orange-red"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_e8yjyso_config_text_template)#",
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
								"attribute": "IndicatorWidget_e8yjyso_Data",
								"schemaName": "UsrMCITPortalUserAccess",
								"filters": {
									"filter": {
										"items": {
											"7e9948c0-9991-48ab-b490-9469aa6ea6a6": {
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
						"hint": "#ResourceString(IndicatorWidget_e8yjyso_hint)#",
						"hideTitle": true
					},
					"visible": true,
					"layoutConfig": {
						"width": 88.95624542236328
					}
				},
				"parentName": "FlexContainer_mkq33n1",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_mz0vlo4",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_mz0vlo4_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "cadmium-red"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_mz0vlo4_config_text_template)#",
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
								"attribute": "IndicatorWidget_mz0vlo4_Data",
								"schemaName": "UsrMCITPortalUserAccess",
								"filters": {
									"filter": {
										"items": {
											"5ec01371-983f-4658-9319-81f6b2f64698": {
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
						"hint": "#ResourceString(IndicatorWidget_mz0vlo4_hint)#",
						"hideTitle": true
					},
					"visible": true,
					"layoutConfig": {
						"width": 114.23124694824219
					}
				},
				"parentName": "FlexContainer_mkq33n1",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridContainer_jljn40a",
				"values": {
					"type": "crt.GridContainer",
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
				"parentName": "SectionContentWrapper",
				"propertyName": "items",
				"index": 0
			},
			
{
    "operation": "merge",
    "name": "DataTable",
    "values": {
        "rowToolbarItems": [
            {
                "type": "crt.MenuItem",
                "caption": "View Profile",
                "icon": "edit-row-action",
                "clicked": {
                    "request": "crt.UpdateRecordRequest",
                    "params": {
                        "itemsAttributeName": "Items",
                        "recordId": "$Items.PDS_Id"
                    }
                }
            },
            {
                "type": "crt.MenuItem",
                "caption": "Change Status",
                "icon": "process-button-icon",
                "clicked": {
                    "request": "usr.ToggleMCITUserStatus",
                    "params": {
                        "recordId": "$Items.PDS_Id",
                        "currentStatus": "$Items.PDS_UsrUserStatus"
                    }
                }
            }
        ]
    }
}

		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"attributes"
				],
				"values": {
					"Items_PredefinedFilter": {
						"value": null
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
					"PDS_UsrUserStatus": {
						"modelConfig": {
							"path": "PDS.UsrUserStatus"
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
					"PDS_UsrLastSignIn": {
						"modelConfig": {
							"path": "PDS.UsrLastSignIn"
						}
					},
					"PDS_UsrActions": {
						"modelConfig": {
							"path": "PDS.UsrActions"
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
							"name": "Items_PredefinedFilter",
							"loadOnChange": true
						}
					]
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
							"columnName": "UsrUser"
						}
					]
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"FolderTree_visible"
				],
				"values": {
					"modelConfig": {}
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
						"UsrUserStatus": {
							"path": "UsrUserStatus"
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
						"UsrLastSignIn": {
							"path": "UsrLastSignIn"
						},
						"UsrActions": {
							"path": "UsrUser"
						}
					}
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[
			{
				request: "usr.ToggleMCITUserStatus",
				handler: async (request, next) => {
					// For production: verify the actor's permission on the server.
					const recordId = request.recordId;
					if (!recordId) {
						throw new Error("Missing User Access record ID");
					}
					const status = request.currentStatus;
					const statusValue = String(
						status?.value ?? status?.Id ?? status?.id ?? status?.displayValue ?? status?.Name ?? status ?? ""
					).toLowerCase();
					const isActive = statusValue === "4ee823ca-22a2-4291-9dda-4c32f52aba0f" || statusValue === "active";
					const targetStatusId = isActive
						? "e535941b-12df-4d6e-b4a5-39b6da20b6eb" // Deactivated
						: "4ee823ca-22a2-4291-9dda-4c32f52aba0f"; // Active
					// Replace this placeholder with the PROCESS SCHEMA CODE (not the caption).
					const processCode = "UsrProcess_35b6004";
					
					const processService = new sdk.ProcessEngineService();
					await processService.executeProcessByName(
						processCode,
						{ UserAccessId: recordId, TargetStatusId: targetStatusId },
						[]
					);
					await request.$context.executeRequest({
						type: "crt.LoadDataRequest",
						dataSourceName: "PDS",
						config: { loadType: "reload", useLastLoadParameters: true }
					});
					return next?.handle(request);
				}
			}
		]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{
			"usr.ToggleUserStatusCaption": (status) => {
				const value = String(
					status?.value ?? status?.Id ?? status?.id ?? status?.displayValue ?? status?.Name ?? status ?? ""
				).toLowerCase();
				const isActive = value === "4ee823ca-22a2-4291-9dda-4c32f52aba0f" || value === "active";
				return isActive ? "Deactivate" : "Activate";
			}
		}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});