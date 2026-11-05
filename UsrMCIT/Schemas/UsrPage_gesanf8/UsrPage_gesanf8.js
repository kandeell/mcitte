define("UsrPage_gesanf8", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "LookupQuickFilterByTag",
				"values": {
					"config": {
						"caption": "#ResourceString(LookupQuickFilterByTag_config_caption)#",
						"hint": "#ResourceString(LookupQuickFilterByTag_config_hint)#",
						"icon": "tag-icon",
						"iconPosition": "left-icon",
						"entitySchemaName": null,
						"defaultValue": []
					},
					"_filterOptions": {
						"expose": [
							{
								"attribute": "LookupQuickFilterByTag_Items",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "Items"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							}
						],
						"from": "LookupQuickFilterByTag_Value"
					}
				}
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "f5702969-7596-416a-970c-2dad346583c4",
							"code": "PDS_UsrReference",
							"caption": "Reference",
							"dataValueType": 28
						},
						{
							"id": "bc7d1247-6c32-9fb2-789d-6e0261daff25",
							"code": "PDS_UsrName",
							"caption": "Contract Name",
							"dataValueType": 28
						},
						{
							"id": "097bc9a3-6860-41b5-9d03-cb0876733c54",
							"code": "PDS_UsrAccount",
							"caption": "Government Authority",
							"dataValueType": 10
						},
						{
							"id": "dfb2234b-e751-4ce7-9098-fc284158a89f",
							"code": "PDS_UsrStartDate",
							"caption": "Start Date",
							"dataValueType": 7
						},
						{
							"id": "c971b3ea-4ec9-40a3-bf30-69bc5c9a14a8",
							"code": "PDS_UsrEndDate",
							"caption": "End Date",
							"dataValueType": 7
						}
					],
					"placeholder": false
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
					"PDS_UsrReference": {
						"modelConfig": {
							"path": "PDS.UsrReference"
						}
					},
					"PDS_UsrAccount": {
						"modelConfig": {
							"path": "PDS.UsrAccount"
						}
					},
					"PDS_UsrStartDate": {
						"modelConfig": {
							"path": "PDS.UsrStartDate"
						}
					},
					"PDS_UsrEndDate": {
						"modelConfig": {
							"path": "PDS.UsrEndDate"
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
					"entitySchemaName": "UsrMCITContract",
					"attributes": {
						"UsrName": {
							"path": "UsrName"
						},
						"UsrReference": {
							"path": "UsrReference"
						},
						"UsrAccount": {
							"path": "UsrAccount"
						},
						"UsrStartDate": {
							"path": "UsrStartDate"
						},
						"UsrEndDate": {
							"path": "UsrEndDate"
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