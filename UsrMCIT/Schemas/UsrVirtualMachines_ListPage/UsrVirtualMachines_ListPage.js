define("UsrVirtualMachines_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "MainHeader",
				"values": {
					"wrap": "wrap",
					"visible": true,
					"borderRadius": "none",
					"gap": "small"
				}
			},
			{
				"operation": "remove",
				"name": "PageTitle"
			},
			{
				"operation": "merge",
				"name": "MenuItem_ImportFromExcel",
				"values": {
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "UsrVirtualMachine"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "FolderTree",
				"values": {
					"rootSchemaName": "UsrVirtualMachine"
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
							"caption": "#ResourceString(PDS_UsrName)#",
							"dataValueType": 1
						},
						{
							"id": "33bd028a-473c-0193-dae5-d49b0bee622b",
							"code": "PDS_UsrName",
							"caption": "#ResourceString(PDS_UsrName)#",
							"dataValueType": 28
						},
						{
							"id": "dd429a29-8eea-6a75-3131-f87a00e0dd5a",
							"code": "PDS_UsrProject",
							"caption": "#ResourceString(PDS_UsrProject)#",
							"dataValueType": 10
						},
						{
							"id": "00a21cf5-9427-3862-d46c-f2f2cbb6d222",
							"code": "PDS_UsrAccount",
							"caption": "#ResourceString(PDS_UsrAccount)#",
							"dataValueType": 10
						},
						{
							"id": "afc11a34-9882-d77e-cf25-bb6f0df378a2",
							"code": "PDS_UsrRAMGB",
							"caption": "#ResourceString(PDS_UsrRAMGB)#",
							"dataValueType": 31
						},
						{
							"id": "c1ca7108-9555-737d-7776-255bf478ed7c",
							"code": "PDS_UsrStorageGB",
							"caption": "#ResourceString(PDS_UsrStorageGB)#",
							"dataValueType": 31
						},
						{
							"id": "a211ce73-27c9-081e-98df-8bb6b73e4ec1",
							"code": "PDS_UsrCPU",
							"caption": "#ResourceString(PDS_UsrCPU)#",
							"dataValueType": 4
						},
						{
							"id": "4973ac64-c7d4-a0f1-ab51-f24d4fc9e8ba",
							"code": "PDS_UsrStatus",
							"caption": "#ResourceString(PDS_UsrStatus)#",
							"dataValueType": 10
						},
						{
							"id": "b54a3336-7f5d-ddcc-1fde-392029bfebb4",
							"code": "PDS_UsrInfrastructureId",
							"caption": "#ResourceString(PDS_UsrInfrastructureId)#",
							"dataValueType": 28
						},
						{
							"id": "60b2cef1-24cd-9e57-1d2d-247775cbf0a5",
							"code": "PDS_UsrSourceRequestItem",
							"caption": "#ResourceString(PDS_UsrSourceRequestItem)#",
							"dataValueType": 10
						},
						{
							"id": "bd3e26d4-b2d9-e417-4867-ad5872bbcc42",
							"code": "PDS_UsrAccount",
							"caption": "#ResourceString(PDS_UsrAccount)#",
							"dataValueType": 10
						}
					],
					"style": "plain-white"
				}
			},
			{
				"operation": "merge",
				"name": "Dashboards",
				"values": {
					"_designOptions": {
						"entitySchemaName": "UsrVirtualMachine",
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
				"name": "FlexContainer_yf4b2hy",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true
				},
				"parentName": "MainHeader",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_l7lywgt",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_l7lywgt_caption)#)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_yf4b2hy",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_80khigr",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_80khigr_caption)#)#",
					"labelType": "caption",
					"labelThickness": "light",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_yf4b2hy",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FlexContainer_186gcls",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true
				},
				"parentName": "MainHeader",
				"propertyName": "items",
				"index": 1
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
					"PDS_UsrProject": {
						"modelConfig": {
							"path": "PDS.UsrProject"
						}
					},
					"PDS_UsrAccount": {
						"modelConfig": {
							"path": "PDS.UsrAccount"
						}
					},
					"PDS_UsrRAMGB": {
						"modelConfig": {
							"path": "PDS.UsrRAMGB"
						}
					},
					"PDS_UsrStorageGB": {
						"modelConfig": {
							"path": "PDS.UsrStorageGB"
						}
					},
					"PDS_UsrCPU": {
						"modelConfig": {
							"path": "PDS.UsrCPU"
						}
					},
					"PDS_UsrStatus": {
						"modelConfig": {
							"path": "PDS.UsrStatus"
						}
					},
					"PDS_UsrInfrastructureId": {
						"modelConfig": {
							"path": "PDS.UsrInfrastructureId"
						}
					},
					"PDS_UsrSourceRequestItem": {
						"modelConfig": {
							"path": "PDS.UsrSourceRequestItem"
						}
					}
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"HeaderCaption"
				],
				"values": {
					"modelConfig": {}
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
					"entitySchemaName": "UsrVirtualMachine",
					"attributes": {
						"UsrName": {
							"path": "UsrName"
						},
						"UsrProject": {
							"path": "UsrProject"
						},
						"UsrAccount": {
							"path": "UsrAccount"
						},
						"UsrRAMGB": {
							"path": "UsrRAMGB"
						},
						"UsrStorageGB": {
							"path": "UsrStorageGB"
						},
						"UsrCPU": {
							"path": "UsrCPU"
						},
						"UsrStatus": {
							"path": "UsrStatus"
						},
						"UsrInfrastructureId": {
							"path": "UsrInfrastructureId"
						},
						"UsrSourceRequestItem": {
							"path": "UsrSourceRequestItem"
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