define("UsrPage_cya0kef", /**SCHEMA_DEPS*/["css!UsrRubikFontCSS"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "GeneralInfoTab",
				"values": {
					"caption": "Overview",
					"iconPosition": "only-text",
					"visible": true
				}
			},
			{
				"operation": "remove",
				"name": "GeneralInfoTabContainer"
			},
			{
				"operation": "insert",
				"name": "Input_ug529de",
				"values": {
					"type": "crt.Input",
					"label": "VM name",
					"control": "$UsrVirtualMachineDS_UsrName_wvgcc1l",
					"placeholder": "Enter the VM name",
					"readonly": false,
					"multiline": false,
					"labelPosition": "above",
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ComboBox_yw5bzuk",
				"values": {
					"type": "crt.ComboBox",
					"label": "Status",
					"ariaLabel": "VM status",
					"control": "$UsrVirtualMachineDS_UsrStatus_949czek",
					"isAddAllowed": false,
					"showValueAsLink": false,
					"labelPosition": "above",
					"controlActions": [],
					"listActions": [],
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MCITVMOverviewGrid",
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
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ComboBox_ce2lczz",
				"values": {
					"type": "crt.ComboBox",
					"label": "Contract",
					"ariaLabel": "Contract",
					"control": "$UsrVirtualMachineDS_UsrContract_i9gxwh1",
					"isAddAllowed": false,
					"showValueAsLink": true,
					"labelPosition": "above",
					"controlActions": [],
					"listActions": [],
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITVMOverviewGrid",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ComboBox_z6zwn82",
				"values": {
					"type": "crt.ComboBox",
					"label": "Project",
					"ariaLabel": "Project",
					"control": "$UsrVirtualMachineDS_UsrProject_47dozje",
					"isAddAllowed": false,
					"showValueAsLink": true,
					"labelPosition": "above",
					"controlActions": [],
					"listActions": [],
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITVMOverviewGrid",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "DateTimePicker_fn3xess",
				"values": {
					"type": "crt.DateTimePicker",
					"label": "Provisioned on",
					"control": "$UsrVirtualMachineDS_UsrProvisionedOn_czqz01q",
					"readonly": false,
					"labelPosition": "above",
					"pickerType": "datetime",
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITVMOverviewGrid",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "MCITVMResourcesTab",
				"values": {
					"type": "crt.TabContainer",
					"caption": "Resources & Network",
					"iconPosition": "only-text",
					"visible": true,
					"items": []
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MCITVMResourcesGrid",
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
				"parentName": "MCITVMResourcesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NumberInput_sxgwxx3",
				"values": {
					"type": "crt.NumberInput",
					"label": "vCPU count",
					"control": "$UsrVirtualMachineDS_UsrCPU_6ng4i9f",
					"readonly": false,
					"labelPosition": "above",
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITVMResourcesGrid",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NumberInput_ekxzqzn",
				"values": {
					"type": "crt.NumberInput",
					"label": "RAM (GB)",
					"control": "$UsrVirtualMachineDS_UsrRAMGB_24zf9d7",
					"readonly": false,
					"labelPosition": "above",
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITVMResourcesGrid",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "NumberInput_44p1xql",
				"values": {
					"type": "crt.NumberInput",
					"label": "Storage (GB)",
					"control": "$UsrVirtualMachineDS_UsrStorageGB_md5p2r7",
					"readonly": false,
					"labelPosition": "above",
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITVMResourcesGrid",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "ComboBox_0vyfaig",
				"values": {
					"type": "crt.ComboBox",
					"label": "Operating system",
					"ariaLabel": "Operating system",
					"control": "$UsrVirtualMachineDS_UsrOperatingSystem_dpq06jt",
					"isAddAllowed": false,
					"showValueAsLink": false,
					"labelPosition": "above",
					"controlActions": [],
					"listActions": [],
					"layoutConfig": {
						"column": 2,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITVMResourcesGrid",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Input_u9z5tdc",
				"values": {
					"type": "crt.Input",
					"label": "Primary IP address",
					"control": "$UsrVirtualMachineDS_UsrIPAddress_mxkq4sc",
					"placeholder": "Enter the primary IP address",
					"readonly": false,
					"multiline": false,
					"labelPosition": "above",
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 2,
						"rowSpan": 1
					}
				},
				"parentName": "MCITVMResourcesGrid",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "TabContainer_23940lq",
				"values": {
					"type": "crt.TabContainer",
					"caption": "Record Information",
					"iconPosition": "only-text",
					"visible": true,
					"items": []
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridContainer_ka2vp75",
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
				"parentName": "TabContainer_23940lq",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "DateTimePicker_7tvoo9o",
				"values": {
					"type": "crt.DateTimePicker",
					"label": "Created on",
					"control": "$UsrVirtualMachineDS_CreatedOn_6swzd1v",
					"readonly": true,
					"labelPosition": "above",
					"pickerType": "datetime",
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_ka2vp75",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ComboBox_52oan36",
				"values": {
					"type": "crt.ComboBox",
					"label": "Created by",
					"ariaLabel": "Created by",
					"control": "$UsrVirtualMachineDS_CreatedBy_pus6u19",
					"readonly": true,
					"isAddAllowed": false,
					"showValueAsLink": true,
					"labelPosition": "above",
					"controlActions": [],
					"listActions": [],
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_ka2vp75",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "DateTimePicker_wzfdo3k",
				"values": {
					"type": "crt.DateTimePicker",
					"label": "Modified on",
					"control": "$UsrVirtualMachineDS_ModifiedOn_bogo7nx",
					"readonly": true,
					"labelPosition": "above",
					"pickerType": "datetime",
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_ka2vp75",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "ComboBox_pqe2vzb",
				"values": {
					"type": "crt.ComboBox",
					"label": "Modified by",
					"ariaLabel": "Modified by",
					"control": "$UsrVirtualMachineDS_ModifiedBy_3w4gy02",
					"readonly": true,
					"isAddAllowed": false,
					"showValueAsLink": true,
					"labelPosition": "above",
					"controlActions": [],
					"listActions": [],
					"layoutConfig": {
						"column": 2,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_ka2vp75",
				"propertyName": "items",
				"index": 3
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"attributes"
				],
				"values": {
					"UsrVirtualMachineDS_UsrName_wvgcc1l": {
						"modelConfig": {
							"path": "UsrVirtualMachineDS.UsrName"
						}
					},
					"UsrVirtualMachineDS_UsrStatus_949czek": {
						"modelConfig": {
							"path": "UsrVirtualMachineDS.UsrStatus"
						}
					},
					"UsrVirtualMachineDS_UsrStatus_949czek_List": {
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
					"UsrVirtualMachineDS_UsrContract_i9gxwh1": {
						"modelConfig": {
							"path": "UsrVirtualMachineDS.UsrContract"
						}
					},
					"UsrVirtualMachineDS_UsrContract_i9gxwh1_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "UsrName",
										"direction": "asc"
									}
								]
							}
						}
					},
					"UsrVirtualMachineDS_UsrProject_47dozje": {
						"modelConfig": {
							"path": "UsrVirtualMachineDS.UsrProject"
						}
					},
					"UsrVirtualMachineDS_UsrProject_47dozje_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "UsrName",
										"direction": "asc"
									}
								]
							}
						}
					},
					"UsrVirtualMachineDS_UsrProvisionedOn_czqz01q": {
						"modelConfig": {
							"path": "UsrVirtualMachineDS.UsrProvisionedOn"
						}
					},
					"UsrVirtualMachineDS_UsrCPU_6ng4i9f": {
						"modelConfig": {
							"path": "UsrVirtualMachineDS.UsrCPU"
						}
					},
					"UsrVirtualMachineDS_UsrRAMGB_24zf9d7": {
						"modelConfig": {
							"path": "UsrVirtualMachineDS.UsrRAMGB"
						}
					},
					"UsrVirtualMachineDS_UsrStorageGB_md5p2r7": {
						"modelConfig": {
							"path": "UsrVirtualMachineDS.UsrStorageGB"
						}
					},
					"UsrVirtualMachineDS_UsrOperatingSystem_dpq06jt": {
						"modelConfig": {
							"path": "UsrVirtualMachineDS.UsrOperatingSystem"
						}
					},
					"UsrVirtualMachineDS_UsrOperatingSystem_dpq06jt_List": {
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
					"UsrVirtualMachineDS_UsrIPAddress_mxkq4sc": {
						"modelConfig": {
							"path": "UsrVirtualMachineDS.UsrIPAddress"
						}
					},
					"UsrVirtualMachineDS_CreatedOn_6swzd1v": {
						"modelConfig": {
							"path": "UsrVirtualMachineDS.CreatedOn"
						}
					},
					"UsrVirtualMachineDS_CreatedBy_pus6u19": {
						"modelConfig": {
							"path": "UsrVirtualMachineDS.CreatedBy"
						}
					},
					"UsrVirtualMachineDS_CreatedBy_pus6u19_List": {
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
					"UsrVirtualMachineDS_ModifiedOn_bogo7nx": {
						"modelConfig": {
							"path": "UsrVirtualMachineDS.ModifiedOn"
						}
					},
					"UsrVirtualMachineDS_ModifiedBy_3w4gy02": {
						"modelConfig": {
							"path": "UsrVirtualMachineDS.ModifiedBy"
						}
					},
					"UsrVirtualMachineDS_ModifiedBy_3w4gy02_List": {
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
					}
				}
			}
		]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [],
				"values": {
					"primaryDataSourceName": "UsrVirtualMachineDS"
				}
			},
			{
				"operation": "merge",
				"path": [
					"dataSources"
				],
				"values": {
					"UsrVirtualMachineDS": {
						"type": "crt.EntityDataSource",
						"scope": "page",
						"config": {
							"entitySchemaName": "UsrVirtualMachine",
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
					}
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});