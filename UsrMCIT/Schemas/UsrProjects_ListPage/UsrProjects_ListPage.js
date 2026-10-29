define("UsrProjects_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "MenuItem_ImportFromExcel",
				"values": {
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "UsrProject"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "FolderTree",
				"values": {
					"rootSchemaName": "UsrProject"
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
							"id": "c8689d78-80ba-4e71-8cf2-fa478e3be5bc",
							"code": "PDS_CreatedOn",
							"caption": "#ResourceString(PDS_CreatedOn)#",
							"dataValueType": 7
						},
						{
							"id": "fd4b3485-a46e-4219-b775-adef1210fe51",
							"code": "PDS_CreatedBy",
							"caption": "#ResourceString(PDS_CreatedBy)#",
							"dataValueType": 10
						},
						{
							"id": "a7793061-419e-7e63-fa04-f2e1b86e73db",
							"code": "PDS_UsrCode",
							"caption": "#ResourceString(PDS_UsrCode)#",
							"dataValueType": 27
						},
						{
							"id": "d5ccc660-220c-b5d5-8348-6c438708c4bb",
							"code": "PDS_UsrAuthority",
							"caption": "#ResourceString(PDS_UsrAuthority)#",
							"dataValueType": 10
						},
						{
							"id": "c18ec671-7708-239b-6f3e-8cfd33406cf7",
							"code": "PDS_UsrActive",
							"caption": "#ResourceString(PDS_UsrActive)#",
							"dataValueType": 12
						},
						{
							"id": "98ec81fc-ac2b-eaf2-0492-b094fdf6a4d4",
							"code": "PDS_UsrDisplayOrder",
							"caption": "#ResourceString(PDS_UsrDisplayOrder)#",
							"dataValueType": 4
						}
					],
					"visible": true
				}
			},
			{
				"operation": "merge",
				"name": "Dashboards",
				"values": {
					"_designOptions": {
						"entitySchemaName": "UsrProject",
						"dependencies": [
							{
								"attributePath": "Id",
								"relationPath": "PDS.Id"
							}
						],
						"filters": []
					}
				}
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
					"PDS_CreatedOn": {
						"modelConfig": {
							"path": "PDS.CreatedOn"
						}
					},
					"PDS_CreatedBy": {
						"modelConfig": {
							"path": "PDS.CreatedBy"
						}
					},
					"PDS_UsrCode": {
						"modelConfig": {
							"path": "PDS.UsrCode"
						}
					},
					"PDS_UsrAuthority": {
						"modelConfig": {
							"path": "PDS.UsrAuthority"
						}
					},
					"PDS_UsrActive": {
						"modelConfig": {
							"path": "PDS.UsrActive"
						}
					},
					"PDS_UsrDisplayOrder": {
						"modelConfig": {
							"path": "PDS.UsrDisplayOrder"
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
							"direction": "desc",
							"columnName": "UsrName"
						}
					]
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
					"entitySchemaName": "UsrProject",
					"attributes": {
						"UsrName": {
							"path": "UsrName"
						},
						"CreatedOn": {
							"path": "CreatedOn"
						},
						"CreatedBy": {
							"path": "CreatedBy"
						},
						"UsrCode": {
							"path": "UsrCode"
						},
						"UsrAuthority": {
							"path": "UsrAuthority"
						},
						"UsrActive": {
							"path": "UsrActive"
						},
						"UsrDisplayOrder": {
							"path": "UsrDisplayOrder"
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