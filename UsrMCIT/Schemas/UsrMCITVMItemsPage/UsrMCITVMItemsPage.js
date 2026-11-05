define("UsrMCITVMItemsPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "insert",
				"name": "FlexContainer_7u7nvvz",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true,
					"visible": true,
					"padding": {
						"top": "large",
						"right": "none",
						"bottom": "large",
						"left": "none"
					},
					"color": "transparent",
					"borderRadius": "large",
					"alignItems": "stretch",
					"justifyContent": "space-between",
					"gap": "small"
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_q1jej94",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_q1jej94_caption)#)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_7u7nvvz",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_icy2l4i",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_icy2l4i_caption)#)#",
					"labelType": "caption",
					"labelThickness": "light",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_7u7nvvz",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "EntityStageProgressBar_pcix3xw",
				"values": {
					"type": "crt.EntityStageProgressBar",
					"saveOnChange": false,
					"askUserToChangeSchema": true,
					"entityName": "UsrVMRequest"
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_1vxjgru",
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
					"color": "primary",
					"borderRadius": "medium",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"right": "medium",
						"left": "medium"
					}
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "FlexContainer_rlkzzhp",
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
					"alignItems": "center",
					"justifyContent": "space-between",
					"gap": "small"
				},
				"parentName": "GridContainer_1vxjgru",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_nlohplm",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true
				},
				"parentName": "FlexContainer_rlkzzhp",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_xjq19hk",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_xjq19hk_caption)#)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_nlohplm",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_ig5fpt9",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_ig5fpt9_caption)#)#",
					"labelType": "caption",
					"labelThickness": "light",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_nlohplm",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Button_574msw6",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_574msw6_caption)#",
					"color": "primary",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-text",
					"visible": true,
					"clicked": {
						"request": "crt.OpenPageRequest",
						"params": {
							"schemaName": "UsrPage_yqmw231"
						}
					},
					"clickMode": "default"
				},
				"parentName": "FlexContainer_rlkzzhp",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "DataGrid_clgb2ic",
				"values": {
					"type": "crt.DataGrid",
					"features": {
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						}
					},
					"items": "$DataGrid_clgb2ic",
					"primaryColumnName": "DataGrid_clgb2icDS_Id",
					"columns": [
						{
							"id": "27dc4055-deb9-b1d4-b095-3188af955e8c",
							"code": "DataGrid_clgb2icDS_UsrName",
							"caption": "#ResourceString(DataGrid_clgb2icDS_UsrName)#",
							"dataValueType": 28
						},
						{
							"id": "a633983f-0566-d366-167a-cf751e4fc00b",
							"code": "DataGrid_clgb2icDS_UsrEnvironment",
							"caption": "#ResourceString(DataGrid_clgb2icDS_UsrEnvironment)#",
							"dataValueType": 10
						},
						{
							"id": "4fa0f7ba-0f9e-9e65-b1e1-88424de86889",
							"code": "DataGrid_clgb2icDS_UsrEstimatedPoints",
							"caption": "#ResourceString(DataGrid_clgb2icDS_UsrEstimatedPoints)#",
							"dataValueType": 31
						},
						{
							"id": "2ebb78b1-13c8-b49c-fdab-b95db84748d3",
							"code": "DataGrid_clgb2icDS_UsrCPU",
							"caption": "#ResourceString(DataGrid_clgb2icDS_UsrCPU)#",
							"dataValueType": 4
						},
						{
							"id": "2614de4a-6f5b-d0be-07dd-ad86a57f2919",
							"code": "DataGrid_clgb2icDS_UsrRAMGB",
							"caption": "#ResourceString(DataGrid_clgb2icDS_UsrRAMGB)#",
							"dataValueType": 31
						},
						{
							"id": "9d415af0-6b20-26f6-7b4b-43fd0cc7d4cc",
							"code": "DataGrid_clgb2icDS_UsrStorageGB",
							"caption": "#ResourceString(DataGrid_clgb2icDS_UsrStorageGB)#",
							"dataValueType": 31
						},
						{
							"id": "96b2d0a3-2959-124e-86b1-3430d580ad08",
							"code": "DataGrid_clgb2icDS_UsrTotalAmountSnapshot",
							"caption": "#ResourceString(DataGrid_clgb2icDS_UsrTotalAmountSnapshot)#",
							"dataValueType": 31
						}
					],
					"placeholder": false
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_ks4xu5f",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)",
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
				"index": 4
			},
			{
				"operation": "insert",
				"name": "GridContainer_fdh3iuz",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
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
					"color": "primary",
					"borderRadius": "medium",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"right": "medium",
						"left": "medium"
					}
				},
				"parentName": "GridContainer_ks4xu5f",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_o1447wx",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_o1447wx_caption)#)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "GridContainer_fdh3iuz",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_rxab62g",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_rxab62g_caption)#)#",
					"labelType": "body-large",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "GridContainer_fdh3iuz",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Label_tfvc8c6",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 3,
						"rowSpan": 1
					},
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_tfvc8c6_caption)#)#",
					"labelType": "body-large",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "GridContainer_fdh3iuz",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Label_kpfxxe6",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 4,
						"rowSpan": 1
					},
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_kpfxxe6_caption)#)#",
					"labelType": "body-large",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "GridContainer_fdh3iuz",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_27xpz5w",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
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
					"color": "primary",
					"borderRadius": "medium",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"right": "medium",
						"left": "medium"
					}
				},
				"parentName": "GridContainer_ks4xu5f",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Label_kkkc0yw",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_kkkc0yw_caption)#)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "GridContainer_27xpz5w",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_rec62ka",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_rec62ka_caption)#)#",
					"labelType": "body-large",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "GridContainer_27xpz5w",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Label_i8swzd4",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 3,
						"rowSpan": 1
					},
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_i8swzd4_caption)#)#",
					"labelType": "caption",
					"labelThickness": "light",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "GridContainer_27xpz5w",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridContainer_ky9kj87",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)",
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
				"index": 5
			},
			{
				"operation": "insert",
				"name": "Button_p8bqeeb",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Button",
					"caption": "#ResourceString(Button_p8bqeeb_caption)#",
					"color": "default",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "GridContainer_ky9kj87",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_u1etuov",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
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
					"gap": "small"
				},
				"parentName": "GridContainer_ky9kj87",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Button_lmc29jl",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_lmc29jl_caption)#",
					"color": "outline",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "FlexContainer_u1etuov",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Button_v07wijg",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_v07wijg_caption)#",
					"color": "primary",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-text",
					"visible": true,
					"clicked": {
						"request": "crt.OpenPageRequest",
						"params": {
							"schemaName": "UsrMCITDocumentsPage"
						}
					},
					"clickMode": "default"
				},
				"parentName": "FlexContainer_u1etuov",
				"propertyName": "items",
				"index": 1
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [],
				"values": {
					"attributes": {
						"DataGrid_clgb2ic": {
							"isCollection": true,
							"modelConfig": {
								"path": "DataGrid_clgb2icDS",
								"sortingConfig": {
									"default": [
										{
											"direction": "desc",
											"columnName": "UsrName"
										}
									]
								}
							},
							"viewModelConfig": {
								"attributes": {
									"DataGrid_clgb2icDS_UsrName": {
										"modelConfig": {
											"path": "DataGrid_clgb2icDS.UsrName"
										}
									},
									"DataGrid_clgb2icDS_UsrEnvironment": {
										"modelConfig": {
											"path": "DataGrid_clgb2icDS.UsrEnvironment"
										}
									},
									"DataGrid_clgb2icDS_UsrEstimatedPoints": {
										"modelConfig": {
											"path": "DataGrid_clgb2icDS.UsrEstimatedPoints"
										}
									},
									"DataGrid_clgb2icDS_UsrCPU": {
										"modelConfig": {
											"path": "DataGrid_clgb2icDS.UsrCPU"
										}
									},
									"DataGrid_clgb2icDS_UsrRAMGB": {
										"modelConfig": {
											"path": "DataGrid_clgb2icDS.UsrRAMGB"
										}
									},
									"DataGrid_clgb2icDS_UsrStorageGB": {
										"modelConfig": {
											"path": "DataGrid_clgb2icDS.UsrStorageGB"
										}
									},
									"DataGrid_clgb2icDS_UsrTotalAmountSnapshot": {
										"modelConfig": {
											"path": "DataGrid_clgb2icDS.UsrTotalAmountSnapshot"
										}
									},
									"DataGrid_clgb2icDS_Id": {
										"modelConfig": {
											"path": "DataGrid_clgb2icDS.Id"
										}
									}
								}
							}
						}
					}
				}
			}
		]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [],
				"values": {
					"dataSources": {
						"UsrVMRequestDS": {
							"type": "crt.EntityDataSource",
							"scope": "page",
							"config": {
								"entitySchemaName": "UsrVMRequest",
								"loadParameters": {
									"options": {
										"pagingConfig": {
											"rowCount": 1,
											"rowsOffset": -1
										},
										"sortingConfig": {
											"columns": []
										}
									}
								},
								"allowCopyingRecords": false
							}
						},
						"UsrVMRequestItemDS": {
							"type": "crt.EntityDataSource",
							"scope": "page",
							"config": {
								"entitySchemaName": "UsrVMRequestItem",
								"loadParameters": {
									"options": {
										"pagingConfig": {
											"rowCount": 1,
											"rowsOffset": -1
										},
										"sortingConfig": {
											"columns": [
												{
													"columnName": "CreatedOn",
													"direction": "desc"
												}
											]
										}
									},
									"parameters": [
										{
											"type": "filter",
											"value": null
										}
									]
								},
								"allowCopyingRecords": true
							}
						},
						"DataGrid_clgb2icDS": {
							"type": "crt.EntityDataSource",
							"scope": "viewElement",
							"config": {
								"entitySchemaName": "UsrVMRequestItem",
								"attributes": {
									"UsrName": {
										"path": "UsrName"
									},
									"UsrEnvironment": {
										"path": "UsrEnvironment"
									},
									"UsrEstimatedPoints": {
										"path": "UsrEstimatedPoints"
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
									"UsrTotalAmountSnapshot": {
										"path": "UsrTotalAmountSnapshot"
									}
								}
							}
						}
					},
					"primaryDataSourceName": "UsrVMRequestDS",
					"loadingConfig": {},
					"dependencies": {
						"UsrVMRequestItemDS": [
							{
								"attributePath": "UsrRequest",
								"relationPath": "UsrVMRequestDS.Id"
							}
						],
						"DataGrid_clgb2icDS": [
							{
								"attributePath": "UsrRequest",
								"relationPath": "UsrVMRequestDS.Id"
							}
						]
					}
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});