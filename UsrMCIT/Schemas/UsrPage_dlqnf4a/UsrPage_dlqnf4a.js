define("UsrPage_dlqnf4a",
	/**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/,
	function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
		return {
			viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
				{
					"operation": "insert",
					"name": "Input_uhs792l",
					"values": {
						"type": "crt.Input",
						"label": "Request name",
						"control": "$UsrVMRequestDS_UsrName_svoxcrb",
						"placeholder": "Enter a clear request name",
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
					"parentName": "MainContainer",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "Input_dwx0x96",
					"values": {
						"type": "crt.Input",
						"label": "Request number",
						"control": "$UsrVMRequestDS_UsrNumber_wsqvjwd",
						"placeholder": "Enter the request number",
						"readonly": false,
						"multiline": false,
						"labelPosition": "above",
						"layoutConfig": {
							"column": 1,
							"row": 2,
							"colSpan": 1,
							"rowSpan": 1
						}
					},
					"parentName": "MainContainer",
					"propertyName": "items",
					"index": 1
				},
				{
					"operation": "insert",
					"name": "ComboBox_b3ihkct",
					"values": {
						"type": "crt.ComboBox",
						"label": "Status",
						"ariaLabel": "Request status",
						"control": "$UsrVMRequestDS_UsrStatus_r4cs4qp",
						"isAddAllowed": false,
						"showValueAsLink": false,
						"labelPosition": "above",
						"controlActions": [],
						"listActions": [],
						"layoutConfig": {
							"column": 1,
							"row": 3,
							"colSpan": 1,
							"rowSpan": 1
						}
					},
					"parentName": "MainContainer",
					"propertyName": "items",
					"index": 2
				},
				{
					"operation": "insert",
					"name": "ComboBox_ookbvhp",
					"values": {
						"type": "crt.ComboBox",
						"label": "Contract",
						"ariaLabel": "Contract",
						"control": "$UsrVMRequestDS_UsrContract_rb7enew",
						"isAddAllowed": false,
						"showValueAsLink": true,
						"labelPosition": "above",
						"controlActions": [],
						"listActions": [],
						"layoutConfig": {
							"column": 1,
							"row": 4,
							"colSpan": 1,
							"rowSpan": 1
						}
					},
					"parentName": "MainContainer",
					"propertyName": "items",
					"index": 3
				},
				{
					"operation": "insert",
					"name": "ComboBox_v2hltbp",
					"values": {
						"type": "crt.ComboBox",
						"label": "Government authority",
						"ariaLabel": "Government authority",
						"control": "$UsrVMRequestDS_UsrAccount_qlvp5ap",
						"isAddAllowed": false,
						"showValueAsLink": true,
						"labelPosition": "above",
						"controlActions": [],
						"listActions": [],
						"layoutConfig": {
							"column": 1,
							"row": 5,
							"colSpan": 1,
							"rowSpan": 1
						}
					},
					"parentName": "MainContainer",
					"propertyName": "items",
					"index": 4
				},
				{
					"operation": "insert",
					"name": "ComboBox_qdv606i",
					"values": {
						"type": "crt.ComboBox",
						"label": "Project",
						"ariaLabel": "Project",
						"control": "$UsrVMRequestDS_UsrProject_05cmiyl",
						"isAddAllowed": false,
						"showValueAsLink": true,
						"labelPosition": "above",
						"controlActions": [],
						"listActions": [],
						"layoutConfig": {
							"column": 1,
							"row": 6,
							"colSpan": 1,
							"rowSpan": 1
						}
					},
					"parentName": "MainContainer",
					"propertyName": "items",
					"index": 5
				},
				{
					"operation": "insert",
					"name": "ComboBox_lwba83j",
					"values": {
						"type": "crt.ComboBox",
						"label": "Requester",
						"ariaLabel": "Requester",
						"control": "$UsrVMRequestDS_UsrRequester_1mp8xji",
						"isAddAllowed": false,
						"showValueAsLink": true,
						"labelPosition": "above",
						"controlActions": [],
						"listActions": [],
						"layoutConfig": {
							"column": 1,
							"row": 7,
							"colSpan": 1,
							"rowSpan": 1
						}
					},
					"parentName": "MainContainer",
					"propertyName": "items",
					"index": 6
				},
				{
					"operation": "insert",
					"name": "ComboBox_w18g8bc",
					"values": {
						"type": "crt.ComboBox",
						"label": "Configuration version",
						"ariaLabel": "Configuration version",
						"control": "$UsrVMRequestDS_UsrConfigVersion_6h8s7mh",
						"isAddAllowed": false,
						"showValueAsLink": true,
						"labelPosition": "above",
						"controlActions": [],
						"listActions": [],
						"layoutConfig": {
							"column": 1,
							"row": 8,
							"colSpan": 1,
							"rowSpan": 1
						}
					},
					"parentName": "MainContainer",
					"propertyName": "items",
					"index": 7
				},
				{
					"operation": "insert",
					"name": "NumberInput_gtpiblf",
					"values": {
						"type": "crt.NumberInput",
						"label": "Estimated points",
						"control": "$UsrVMRequestDS_UsrEstimatedPoints_4sw0bz0",
						"readonly": false,
						"labelPosition": "above",
						"tooltip": "Enter the estimate manually until automatic calculation is configured.",
						"layoutConfig": {
							"column": 1,
							"row": 9,
							"colSpan": 1,
							"rowSpan": 1
						}
					},
					"parentName": "MainContainer",
					"propertyName": "items",
					"index": 8
				},
				{
					"operation": "insert",
					"name": "Input_adqwuzo",
					"values": {
						"type": "crt.Input",
						"label": "Business justification",
						"control": "$UsrVMRequestDS_UsrBusinessJustification_r0xk2e9",
						"placeholder": "Describe why the virtual machine is needed and its intended use.",
						"readonly": false,
						"multiline": true,
						"labelPosition": "above",
						"layoutConfig": {
							"column": 1,
							"row": 10,
							"colSpan": 1,
							"rowSpan": 1
						}
					},
					"parentName": "MainContainer",
					"propertyName": "items",
					"index": 9
				}
			]/**SCHEMA_VIEW_CONFIG_DIFF*/,

			viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
				{
					"operation": "merge",
					"path": ["attributes"],
					"values": {
						"UsrVMRequestDS_UsrName_svoxcrb": {
							"modelConfig": {
								"path": "UsrVMRequestDS.UsrName"
							}
						},
						"UsrVMRequestDS_UsrNumber_wsqvjwd": {
							"modelConfig": {
								"path": "UsrVMRequestDS.UsrNumber"
							}
						},
						"UsrVMRequestDS_UsrStatus_r4cs4qp": {
							"modelConfig": {
								"path": "UsrVMRequestDS.UsrStatus"
							}
						},
						"UsrVMRequestDS_UsrStatus_r4cs4qp_List": {
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
						"UsrVMRequestDS_UsrContract_rb7enew": {
							"modelConfig": {
								"path": "UsrVMRequestDS.UsrContract"
							}
						},
						"UsrVMRequestDS_UsrContract_rb7enew_List": {
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
						"UsrVMRequestDS_UsrAccount_qlvp5ap": {
							"modelConfig": {
								"path": "UsrVMRequestDS.UsrAccount"
							}
						},
						"UsrVMRequestDS_UsrAccount_qlvp5ap_List": {
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
						"UsrVMRequestDS_UsrProject_05cmiyl": {
							"modelConfig": {
								"path": "UsrVMRequestDS.UsrProject"
							}
						},
						"UsrVMRequestDS_UsrProject_05cmiyl_List": {
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
						"UsrVMRequestDS_UsrRequester_1mp8xji": {
							"modelConfig": {
								"path": "UsrVMRequestDS.UsrRequester"
							}
						},
						"UsrVMRequestDS_UsrRequester_1mp8xji_List": {
							"isCollection": true,
							"modelConfig": {}
						},
						"UsrVMRequestDS_UsrConfigVersion_6h8s7mh": {
							"modelConfig": {
								"path": "UsrVMRequestDS.UsrConfigVersion"
							}
						},
						"UsrVMRequestDS_UsrConfigVersion_6h8s7mh_List": {
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
						"UsrVMRequestDS_UsrEstimatedPoints_4sw0bz0": {
							"modelConfig": {
								"path": "UsrVMRequestDS.UsrEstimatedPoints"
							}
						},
						"UsrVMRequestDS_UsrBusinessJustification_r0xk2e9": {
							"modelConfig": {
								"path": "UsrVMRequestDS.UsrBusinessJustification"
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
							}
						},
						"primaryDataSourceName": "UsrVMRequestDS"
					}
				}
			]/**SCHEMA_MODEL_CONFIG_DIFF*/,

			handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
			converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
			validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
		};
	}
);