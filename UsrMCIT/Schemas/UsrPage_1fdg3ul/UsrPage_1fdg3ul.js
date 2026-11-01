define("UsrPage_1fdg3ul", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "GeneralInfoTab",
				"values": {
					"caption": "Contract information"
				}
			},
			{
				"operation": "insert",
				"name": "MCITContractName",
				"values": {
					"type": "crt.Input",
					"label": "Contract name",
					"control": "$MCITContractName",
					"labelPosition": "above",
					"multiline": false,
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITContractNumber",
				"values": {
					"type": "crt.Input",
					"label": "Contract number",
					"control": "$MCITContractNumber",
					"labelPosition": "above",
					"multiline": false,
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					}
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MCITContractStatus",
				"values": {
					"type": "crt.ComboBox",
					"label": "Status",
					"control": "$MCITContractStatus",
					"labelPosition": "above",
					"isAddAllowed": false,
					"showValueAsLink": false,
					"controlActions": [],
					"listActions": [],
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 3,
						"rowSpan": 1
					}
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "MCITContractFields",
				"values": {
					"type": "crt.GridContainer",
					"items": [],
					"rows": "minmax(32px, max-content)",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": "small"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITContractAuthority",
				"values": {
					"type": "crt.ComboBox",
					"label": "Government authority",
					"control": "$MCITContractAuthority",
					"labelPosition": "above",
					"isAddAllowed": false,
					"showValueAsLink": true,
					"controlActions": [],
					"listActions": [],
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContractFields",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITContractReference",
				"values": {
					"type": "crt.Input",
					"label": "Contract reference",
					"control": "$MCITContractReference",
					"labelPosition": "above",
					"multiline": false,
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContractFields",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MCITContractStartDate",
				"values": {
					"type": "crt.DateTimePicker",
					"label": "Start date",
					"control": "$MCITContractStartDate",
					"labelPosition": "above",
					"pickerType": "date",
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContractFields",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "MCITContractEndDate",
				"values": {
					"type": "crt.DateTimePicker",
					"label": "End date",
					"control": "$MCITContractEndDate",
					"labelPosition": "above",
					"pickerType": "date",
					"layoutConfig": {
						"column": 2,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContractFields",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "MCITContractBudget",
				"values": {
					"type": "crt.NumberInput",
					"label": "Initial financial budget",
					"control": "$MCITContractBudget",
					"labelPosition": "above",
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContractFields",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "MCITContractCurrency",
				"values": {
					"type": "crt.ComboBox",
					"label": "Contract currency",
					"control": "$MCITContractCurrency",
					"labelPosition": "above",
					"isAddAllowed": false,
					"showValueAsLink": false,
					"controlActions": [],
					"listActions": [],
					"layoutConfig": {
						"column": 2,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContractFields",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "MCITContractInitialPoints",
				"values": {
					"type": "crt.NumberInput",
					"label": "Initial contract points",
					"control": "$MCITContractInitialPoints",
					"labelPosition": "above",
					"layoutConfig": {
						"column": 1,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContractFields",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "MCITContractDescription",
				"values": {
					"type": "crt.Input",
					"label": "Description",
					"control": "$MCITContractDescription",
					"labelPosition": "above",
					"multiline": true,
					"layoutConfig": {
						"column": 1,
						"row": 5,
						"colSpan": 2,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContractFields",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "TabContainer_h354xra",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "#ResourceString(TabContainer_h354xra_caption)#",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_85bt69p",
				"values": {
					"type": "crt.GridContainer",
					"items": [],
					"rows": "minmax(32px, max-content)",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					}
				},
				"parentName": "TabContainer_h354xra",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ExpansionPanel_pburjeo",
				"values": {
					"type": "crt.ExpansionPanel",
					"tools": [],
					"items": [],
					"title": "#ResourceString(ExpansionPanel_pburjeo_title)#",
					"toggleType": "default",
					"togglePosition": "before",
					"expanded": true,
					"labelColor": "auto",
					"fullWidthHeader": false,
					"titleWidth": 20,
					"padding": {
						"top": "small",
						"bottom": "small",
						"left": "none",
						"right": "none"
					},
					"fitContent": true
				},
				"parentName": "TabContainer_h354xra",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_k6pqi6g",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 24px)",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": []
				},
				"parentName": "ExpansionPanel_pburjeo",
				"propertyName": "tools",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_pdacv8i",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"gap": "none",
					"alignItems": "center",
					"items": [],
					"layoutConfig": {
						"colSpan": 1,
						"column": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_k6pqi6g",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailAddBtn_opvbbzb",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailAddBtn_opvbbzb_caption)#",
					"icon": "add-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.CreateRecordRequest",
						"params": {
							"entityName": "UsrContractConfigVersion"
						}
					}
				},
				"parentName": "FlexContainer_pdacv8i",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailRefreshBtn_kx4zxdd",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailRefreshBtn_kx4zxdd_caption)#",
					"icon": "reload-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.LoadDataRequest",
						"params": {
							"config": {
								"loadType": "reload"
							},
							"dataSourceName": "GridDetail_va48qvxDS"
						}
					}
				},
				"parentName": "FlexContainer_pdacv8i",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSettingsBtn_tz72vkq",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailSettingsBtn_tz72vkq_caption)#",
					"icon": "actions-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clickMode": "menu",
					"menuItems": []
				},
				"parentName": "FlexContainer_pdacv8i",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridDetailExportDataBtn_bcrnmg5",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailExportDataBtn_bcrnmg5_caption)#",
					"icon": "export-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "GridDetail_va48qvx"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_tz72vkq",
				"propertyName": "menuItems",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailImportDataBtn_cswicsn",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailImportDataBtn_cswicsn_caption)#",
					"icon": "import-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "UsrContractConfigVersion"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_tz72vkq",
				"propertyName": "menuItems",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSearchFilter_6m356c3",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "#ResourceString(GridDetailSearchFilter_6m356c3_placeholder)#",
					"iconOnly": true,
					"_filterOptions": {
						"expose": [
							{
								"attribute": "GridDetailSearchFilter_6m356c3_GridDetail_va48qvx",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"GridDetail_va48qvx"
										]
									}
								]
							}
						],
						"from": [
							"GridDetailSearchFilter_6m356c3_SearchValue",
							"GridDetailSearchFilter_6m356c3_FilteredColumnsGroups"
						]
					}
				},
				"parentName": "FlexContainer_pdacv8i",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_yd45tjn",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 32px)",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": 0
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": []
				},
				"parentName": "ExpansionPanel_pburjeo",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetail_va48qvx",
				"values": {
					"type": "crt.DataGrid",
					"layoutConfig": {
						"colSpan": 2,
						"column": 1,
						"row": 1,
						"rowSpan": 6
					},
					"features": {
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						}
					},
					"items": "$GridDetail_va48qvx",
					"primaryColumnName": "GridDetail_va48qvxDS_Id",
					"columns": [
						{
							"id": "5ab607e3-4bbc-c2ae-f317-8c3d288241b1",
							"code": "GridDetail_va48qvxDS_UsrName",
							"caption": "#ResourceString(GridDetail_va48qvxDS_UsrName)#",
							"dataValueType": 28
						},
						{
							"id": "1ece9bcc-fd80-49d5-b224-20d110e156ae",
							"code": "GridDetail_va48qvxDS_UsrRAMGBPerPoint",
							"caption": "#ResourceString(GridDetail_va48qvxDS_UsrRAMGBPerPoint)#",
							"dataValueType": 31
						},
						{
							"id": "fd904365-5dbf-8ac1-75f5-2fb10ea17fcd",
							"code": "GridDetail_va48qvxDS_UsrStorageGBPerPoint",
							"caption": "#ResourceString(GridDetail_va48qvxDS_UsrStorageGBPerPoint)#",
							"dataValueType": 31
						},
						{
							"id": "556c09b9-7abd-3657-a0ff-679213b61f5e",
							"code": "GridDetail_va48qvxDS_UsrCPUPerPoint",
							"caption": "#ResourceString(GridDetail_va48qvxDS_UsrCPUPerPoint)#",
							"dataValueType": 4,
							"width": 197
						},
						{
							"id": "8943047a-063f-73a0-06a0-9a609a3a8e11",
							"code": "GridDetail_va48qvxDS_UsrEffectiveFrom",
							"caption": "#ResourceString(GridDetail_va48qvxDS_UsrEffectiveFrom)#",
							"dataValueType": 7
						},
						{
							"id": "33be0022-44e4-f502-846e-aa536df83181",
							"code": "GridDetail_va48qvxDS_UsrVersionNumber",
							"caption": "#ResourceString(GridDetail_va48qvxDS_UsrVersionNumber)#",
							"dataValueType": 27
						},
						{
							"id": "bea67b20-b8ce-bbc9-1faa-43c2bb923a8f",
							"code": "GridDetail_va48qvxDS_UsrName",
							"caption": "#ResourceString(GridDetail_va48qvxDS_UsrName)#",
							"dataValueType": 28
						}
					],
					"placeholder": false
				},
				"parentName": "GridContainer_yd45tjn",
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
					"MCITContractName": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrName"
						}
					},
					"MCITContractNumber": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrNumber"
						}
					},
					"MCITContractStatus": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrStatus"
						}
					},
					"MCITContractStatus_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "Name",
										"direction": "asc"
									}
								]
							}
						}
					},
					"MCITContractAuthority": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrAccount"
						}
					},
					"MCITContractAuthority_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "Name",
										"direction": "asc"
									}
								]
							}
						}
					},
					"MCITContractReference": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrReference"
						}
					},
					"MCITContractStartDate": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrStartDate"
						}
					},
					"MCITContractEndDate": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrEndDate"
						}
					},
					"MCITContractBudget": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrInitialBudget"
						}
					},
					"MCITContractCurrency": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrCurrency"
						}
					},
					"MCITContractCurrency_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "Name",
										"direction": "asc"
									}
								]
							}
						}
					},
					"MCITContractInitialPoints": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrInitialPoints"
						}
					},
					"MCITContractDescription": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrDescription"
						}
					},
					"GridDetail_va48qvx": {
						"isCollection": true,
						"modelConfig": {
							"path": "GridDetail_va48qvxDS",
							"filterAttributes": [
								{
									"name": "GridDetailSearchFilter_6m356c3_GridDetail_va48qvx",
									"loadOnChange": true
								}
							],
							"sortingConfig": {
								"default": [
									{
										"direction": "asc",
										"columnName": "UsrCPUPerPoint"
									}
								]
							}
						},
						"viewModelConfig": {
							"attributes": {
								"GridDetail_va48qvxDS_UsrName": {
									"modelConfig": {
										"path": "GridDetail_va48qvxDS.UsrName"
									}
								},
								"GridDetail_va48qvxDS_UsrRAMGBPerPoint": {
									"modelConfig": {
										"path": "GridDetail_va48qvxDS.UsrRAMGBPerPoint"
									}
								},
								"GridDetail_va48qvxDS_UsrStorageGBPerPoint": {
									"modelConfig": {
										"path": "GridDetail_va48qvxDS.UsrStorageGBPerPoint"
									}
								},
								"GridDetail_va48qvxDS_UsrCPUPerPoint": {
									"modelConfig": {
										"path": "GridDetail_va48qvxDS.UsrCPUPerPoint"
									}
								},
								"GridDetail_va48qvxDS_UsrEffectiveFrom": {
									"modelConfig": {
										"path": "GridDetail_va48qvxDS.UsrEffectiveFrom"
									}
								},
								"GridDetail_va48qvxDS_UsrVersionNumber": {
									"modelConfig": {
										"path": "GridDetail_va48qvxDS.UsrVersionNumber"
									}
								},
								"GridDetail_va48qvxDS_Id": {
									"modelConfig": {
										"path": "GridDetail_va48qvxDS.Id"
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
					"primaryDataSourceName": "UsrMCITContractDS",
					"dependencies": {
						"GridDetail_va48qvxDS": [
							{
								"attributePath": "UsrContract",
								"relationPath": "UsrMCITContractDS.Id"
							}
						]
					}
				}
			},
			{
				"operation": "merge",
				"path": [
					"dataSources"
				],
				"values": {
					"UsrMCITContractDS": {
						"type": "crt.EntityDataSource",
						"scope": "page",
						"config": {
							"entitySchemaName": "UsrMCITContract",
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
					"GridDetail_va48qvxDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "UsrContractConfigVersion",
							"attributes": {
								"UsrName": {
									"path": "UsrName"
								},
								"UsrRAMGBPerPoint": {
									"path": "UsrRAMGBPerPoint"
								},
								"UsrStorageGBPerPoint": {
									"path": "UsrStorageGBPerPoint"
								},
								"UsrCPUPerPoint": {
									"path": "UsrCPUPerPoint"
								},
								"UsrEffectiveFrom": {
									"path": "UsrEffectiveFrom"
								},
								"UsrVersionNumber": {
									"path": "UsrVersionNumber"
								}
							}
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