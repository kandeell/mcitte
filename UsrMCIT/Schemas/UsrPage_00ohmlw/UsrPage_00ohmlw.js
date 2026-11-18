define("UsrPage_00ohmlw", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "Tabs",
				"values": {
					"styleType": "default",
					"mode": "tab",
					"bodyBackgroundColor": "primary-contrast-500",
					"selectedTabTitleColor": "auto",
					"tabTitleColor": "auto",
					"underlineSelectedTabColor": "auto",
					"headerBackgroundColor": "auto",
					"allowToggleClose": true
				}
			},
			{
				"operation": "merge",
				"name": "GeneralInfoTab",
				"values": {
					"iconPosition": "only-text",
					"visible": true
				}
			},
			{
				"operation": "insert",
				"name": "GridContainer_g8q7yoq",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
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
				"parentName": "TopAreaProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Input_ll5udc7",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrVMRequestDS_UsrName_bi80wil",
					"control": "$UsrVMRequestDS_UsrName_bi80wil",
					"placeholder": "",
					"tooltip": "",
					"readonly": true,
					"multiline": false,
					"labelPosition": "auto",
					"visible": true
				},
				"parentName": "GridContainer_g8q7yoq",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ComboBox_gjsvfxe",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrVMRequestDS_UsrStatus_erlndsk",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "auto",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$UsrVMRequestDS_UsrStatus_erlndsk",
					"visible": true,
					"readonly": true,
					"placeholder": ""
				},
				"parentName": "GridContainer_g8q7yoq",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "addRecord_qsf4pn1",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_qsf4pn1_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_gjsvfxe",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ComboBox_3cv52ib",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrVMRequestDS_UsrRequestType_mn41wa7",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "auto",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$UsrVMRequestDS_UsrRequestType_mn41wa7",
					"visible": true,
					"readonly": true,
					"placeholder": ""
				},
				"parentName": "GridContainer_g8q7yoq",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "addRecord_mapa8pl",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_mapa8pl_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_3cv52ib",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ComboBox_mtrs225",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrVMRequestDS_UsrAccount_dpi5bc9",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "auto",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$UsrVMRequestDS_UsrAccount_dpi5bc9",
					"visible": true,
					"readonly": true,
					"placeholder": ""
				},
				"parentName": "GridContainer_g8q7yoq",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "addRecord_0cnaeh0",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_0cnaeh0_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_mtrs225",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ComboBox_cmd0svt",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 3,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrVMRequestDS_UsrProject_tecttu5",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "auto",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$UsrVMRequestDS_UsrProject_tecttu5"
				},
				"parentName": "GridContainer_g8q7yoq",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "addRecord_fb9biqv",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_fb9biqv_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_cmd0svt",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_1dmvvc8",
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
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Label_a0bmjqy",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_a0bmjqy_caption)#)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "GridContainer_1dmvvc8",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_cmkncnp",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_cmkncnp_caption)#)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "GridContainer_1dmvvc8",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "ComboBox_bu36pnk",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrVMRequestDS_UsrRequestType_a8mixnq",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "auto",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$UsrVMRequestDS_UsrRequestType_a8mixnq",
					"visible": true,
					"readonly": true,
					"placeholder": ""
				},
				"parentName": "GridContainer_1dmvvc8",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "addRecord_90ttnr3",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_90ttnr3_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_bu36pnk",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Input_2kp3160",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrVMRequestDS_UsrBusinessJustification_wj39gqr",
					"control": "$UsrVMRequestDS_UsrBusinessJustification_wj39gqr",
					"placeholder": "",
					"tooltip": "",
					"readonly": true,
					"multiline": false,
					"labelPosition": "auto",
					"visible": true
				},
				"parentName": "GridContainer_1dmvvc8",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "ComboBox_miorbe9",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 3,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrVMRequestDS_UsrAccount_mr6tdw8",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "auto",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$UsrVMRequestDS_UsrAccount_mr6tdw8",
					"visible": true,
					"readonly": true,
					"placeholder": ""
				},
				"parentName": "GridContainer_1dmvvc8",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "addRecord_hjr1zvq",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_hjr1zvq_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_miorbe9",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ComboBox_oyltuom",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 4,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrVMRequestDS_UsrProject_c4uakj1",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "auto",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$UsrVMRequestDS_UsrProject_c4uakj1",
					"visible": true,
					"readonly": true,
					"placeholder": ""
				},
				"parentName": "GridContainer_1dmvvc8",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "addRecord_kdaw1fh",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_kdaw1fh_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_oyltuom",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ComboBox_gvsfm6c",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 5,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrVMRequestDS_UsrContract_45erx1e",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "auto",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$UsrVMRequestDS_UsrContract_45erx1e",
					"visible": true,
					"readonly": true,
					"placeholder": ""
				},
				"parentName": "GridContainer_1dmvvc8",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "addRecord_v94czwh",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_v94czwh_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_gvsfm6c",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "DateTimePicker_ah703hc",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 6,
						"rowSpan": 1
					},
					"type": "crt.DateTimePicker",
					"label": "$Resources.Strings.UsrVMRequestDS_CreatedOn_gak9y6h",
					"placeholder": "",
					"readonly": false,
					"labelPosition": "auto",
					"tooltip": "",
					"pickerType": "datetime",
					"control": "$UsrVMRequestDS_CreatedOn_gak9y6h"
				},
				"parentName": "GridContainer_1dmvvc8",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "ComboBox_7tgf0jz",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 7,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrVMRequestDS_UsrStatus_5hcrjsl",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "auto",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$UsrVMRequestDS_UsrStatus_5hcrjsl",
					"visible": true,
					"readonly": true,
					"placeholder": ""
				},
				"parentName": "GridContainer_1dmvvc8",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "addRecord_lblsji3",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_lblsji3_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_7tgf0jz",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NumberInput_c9s3tyb",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 8,
						"rowSpan": 1
					},
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.UsrVMRequestDS_UsrEstimatedPoints_hcxx0xn",
					"control": "$UsrVMRequestDS_UsrEstimatedPoints_hcxx0xn",
					"readonly": true,
					"placeholder": "",
					"labelPosition": "auto",
					"tooltip": "",
					"visible": true
				},
				"parentName": "GridContainer_1dmvvc8",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "insert",
				"name": "TabContainer_0imyljb",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "#ResourceString(TabContainer_0imyljb_caption)#",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_ffrr46h",
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
				"parentName": "TabContainer_0imyljb",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "DataGrid_jhhb7ui",
				"values": {
					"type": "crt.DataGrid",
					"features": {
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						},
						"editable": {
							"enable": false,
							"itemsCreation": false,
							"floatingEditPanel": false
						},
						"header": {
							"visible": false
						},
						"columns": {
							"dragAndDrop": false,
							"resizing": false,
							"sorting": false
						}
					},
					"items": "$DataGrid_jhhb7ui",
					"visible": true,
					"fitContent": true,
					"primaryColumnName": "DataGrid_jhhb7uiDS_Id",
					"columns": [
						{
							"id": "a3db77a8-2ae1-b086-f5cd-6bf2810b89ff",
							"code": "DataGrid_jhhb7uiDS_UsrName",
							"caption": "#ResourceString(DataGrid_jhhb7uiDS_UsrName)#",
							"dataValueType": 28
						},
						{
							"id": "6772bf3a-13fd-361c-262a-a1c8f2b0cf50",
							"code": "DataGrid_jhhb7uiDS_UsrEnvironment",
							"caption": "#ResourceString(DataGrid_jhhb7uiDS_UsrEnvironment)#",
							"dataValueType": 10
						},
						{
							"id": "954f26d6-c5c5-1a5f-7ad6-cd29b01e83d8",
							"code": "DataGrid_jhhb7uiDS_UsrOperatingSystem",
							"caption": "#ResourceString(DataGrid_jhhb7uiDS_UsrOperatingSystem)#",
							"dataValueType": 10
						},
						{
							"id": "a0784b88-53a1-376b-aad2-0b58f29b9202",
							"code": "DataGrid_jhhb7uiDS_UsrRAMGB",
							"caption": "#ResourceString(DataGrid_jhhb7uiDS_UsrRAMGB)#",
							"dataValueType": 31
						},
						{
							"id": "dea294c3-4f07-1f1e-40d5-93da082e61cf",
							"code": "DataGrid_jhhb7uiDS_UsrStorageGB",
							"caption": "#ResourceString(DataGrid_jhhb7uiDS_UsrStorageGB)#",
							"dataValueType": 31
						},
						{
							"id": "bdf08f0d-2954-e00f-f525-71e9f710e3a5",
							"code": "DataGrid_jhhb7uiDS_UsrCPU",
							"caption": "#ResourceString(DataGrid_jhhb7uiDS_UsrCPU)#",
							"dataValueType": 4
						},
						{
							"id": "c2b3a681-4143-696f-f2c3-89a0e663a98a",
							"code": "DataGrid_jhhb7uiDS_UsrEstimatedPoints",
							"caption": "#ResourceString(DataGrid_jhhb7uiDS_UsrEstimatedPoints)#",
							"dataValueType": 31
						},
						{
							"id": "10f29408-0b90-8481-4cb6-b412e5b9b65a",
							"code": "DataGrid_jhhb7uiDS_UsrPurpose",
							"caption": "#ResourceString(DataGrid_jhhb7uiDS_UsrPurpose)#",
							"dataValueType": 29
						}
					],
					"placeholder": false
				},
				"parentName": "TabContainer_0imyljb",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TabContainer_8alzhew",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "#ResourceString(TabContainer_8alzhew_caption)#",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridContainer_9x9qlxx",
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
				"parentName": "TabContainer_8alzhew",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "EntityStageProgressBar_pmalvb0",
				"values": {
					"type": "crt.EntityStageProgressBar",
					"saveOnChange": false,
					"askUserToChangeSchema": true,
					"entityName": "UsrVMRequest"
				},
				"parentName": "TabContainer_8alzhew",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TabContainer_t9pzmgz",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "#ResourceString(TabContainer_t9pzmgz_caption)#",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_sffni2x",
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
				"parentName": "TabContainer_t9pzmgz",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ExpansionPanel_xdckgdl",
				"values": {
					"type": "crt.ExpansionPanel",
					"tools": [],
					"items": [],
					"title": "#ResourceString(ExpansionPanel_xdckgdl_title)#",
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
					"fitContent": true,
					"visible": true,
					"alignItems": "stretch"
				},
				"parentName": "TabContainer_t9pzmgz",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_87vqw6m",
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
				"parentName": "ExpansionPanel_xdckgdl",
				"propertyName": "tools",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_dr1zlca",
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
				"parentName": "GridContainer_87vqw6m",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailAddBtn_ryu6fbw",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailAddBtn_ryu6fbw_caption)#",
					"icon": "upload-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.UploadFileRequest",
						"params": {
							"viewElementName": "FileList_ltjlj8g"
						}
					}
				},
				"parentName": "FlexContainer_dr1zlca",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailRefreshBtn_108g0qg",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailRefreshBtn_108g0qg_caption)#",
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
							"dataSourceName": "FileList_ltjlj8gDS"
						}
					}
				},
				"parentName": "FlexContainer_dr1zlca",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSearchFilter_s4jv5u5",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "#ResourceString(GridDetailSearchFilter_s4jv5u5_placeholder)#",
					"_filterOptions": {
						"expose": [
							{
								"attribute": "GridDetailSearchFilter_s4jv5u5_FileList_ltjlj8g",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"FileList_ltjlj8g"
										]
									}
								]
							}
						],
						"from": [
							"GridDetailSearchFilter_s4jv5u5_SearchValue",
							"GridDetailSearchFilter_s4jv5u5_FilteredColumnsGroups"
						]
					}
				},
				"parentName": "FlexContainer_dr1zlca",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridContainer_qkc3i34",
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
				"parentName": "ExpansionPanel_xdckgdl",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FileList_ltjlj8g",
				"values": {
					"type": "crt.FileList",
					"masterRecordColumnValue": "$Id",
					"recordColumnName": "RecordId",
					"layoutConfig": {
						"colSpan": 2,
						"column": 1,
						"row": 1,
						"rowSpan": 10
					},
					"items": "$FileList_ltjlj8g",
					"primaryColumnName": "FileList_ltjlj8gDS_Id",
					"columns": [
						{
							"id": "e7d35990-5733-9d45-e890-20859354f83e",
							"code": "FileList_ltjlj8gDS_Name",
							"caption": "#ResourceString(FileList_ltjlj8gDS_Name)#",
							"dataValueType": 28
						},
						{
							"id": "d6a22a74-12ce-105f-e9f5-e92d125bd887",
							"code": "FileList_ltjlj8gDS_CreatedOn",
							"caption": "#ResourceString(FileList_ltjlj8gDS_CreatedOn)#",
							"dataValueType": 7
						},
						{
							"id": "c9fb8deb-2115-a88f-45f4-4d720853afdd",
							"code": "FileList_ltjlj8gDS_CreatedBy",
							"caption": "#ResourceString(FileList_ltjlj8gDS_CreatedBy)#",
							"dataValueType": 10
						},
						{
							"id": "bf6dba7c-be09-2b22-1f80-532d4a1d3461",
							"code": "FileList_ltjlj8gDS_Size",
							"caption": "#ResourceString(FileList_ltjlj8gDS_Size)#",
							"dataValueType": 4
						}
					]
				},
				"parentName": "GridContainer_qkc3i34",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TabContainer_52snqlp",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "#ResourceString(TabContainer_52snqlp_caption)#",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "GridContainer_iltukub",
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
				"parentName": "TabContainer_52snqlp",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Timeline_wyrhh6j",
				"values": {
					"type": "crt.Timeline",
					"items": [],
					"tools": [],
					"customFilters": [],
					"hideTools": false,
					"masterSchemaId": "$Id_8xo8pas",
					"caption": "#ResourceString(Timeline_wyrhh6j_caption)#",
					"label": "#ResourceString(Timeline_wyrhh6j_label)#",
					"filters": [],
					"masterEntitySchemaName": "UsrVMRequest",
					"filterValues": "$Timeline_wyrhh6j_AllTileFilters"
				},
				"parentName": "TabContainer_52snqlp",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TimelineTile_SysFile_vvz02e8",
				"values": {
					"type": "crt.TimelineTile",
					"classes": [
						"view-element"
					],
					"sortedByColumn": "CreatedOn",
					"ownerColumn": "CreatedBy",
					"data": {
						"schemaType": "SysFile",
						"isDefault": true
					},
					"iconPosition": "only-icon",
					"icon": "star-icon",
					"visible": true
				},
				"parentName": "Timeline_wyrhh6j",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TimelineTile_Feed_qo2jlat",
				"values": {
					"type": "crt.TimelineTile",
					"classes": [
						"view-element"
					],
					"sortedByColumn": "CreatedOn",
					"ownerColumn": "CreatedBy",
					"data": {
						"schemaType": "Feed",
						"isDefault": true
					},
					"iconPosition": "only-icon",
					"icon": "star-icon",
					"visible": true
				},
				"parentName": "Timeline_wyrhh6j",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MessageComposerSelector_osjv1np",
				"values": {
					"type": "crt.MessageComposerSelector",
					"items": [],
					"classes": [
						"view-element"
					]
				},
				"parentName": "Timeline_wyrhh6j",
				"propertyName": "tools",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FeedComposer_607wdiz",
				"values": {
					"type": "crt.FeedComposer",
					"classes": [
						"view-element"
					],
					"sortedByColumn": "CreatedOn",
					"data": {
						"uId": "6d006667-3496-4e2d-adc0-3a42648dd97b",
						"schemaType": "Feed",
						"caption": "Feed",
						"sortedByColumn": "CreatedOn",
						"typeName": "crt.FeedComposer",
						"icon": "feed-composer-icon"
					},
					"feedType": "Record",
					"primaryColumnValue": "$Id_8xo8pas",
					"cardState": "$CardState",
					"entitySchemaName": "UsrVMRequest",
					"dataSourceName": "UsrVMRequestDS"
				},
				"parentName": "MessageComposerSelector_osjv1np",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "EmailComposer_lvjsdop",
				"values": {
					"type": "crt.EmailComposer",
					"classes": [
						"view-element"
					],
					"sortedByColumn": "CreatedOn",
					"data": {
						"uId": "75aadc65-a834-42d0-b880-fac9bdee4c86",
						"schemaType": "Email",
						"caption": "Email",
						"sortedByColumn": "CreatedOn",
						"typeName": "crt.EmailComposer",
						"icon": "email-composer-icon"
					},
					"recordId": "$Id_8xo8pas",
					"defaultSenderRequest": "crt.DefaultSenderComposerRequest",
					"entitySchemaName": "UsrVMRequest"
				},
				"parentName": "MessageComposerSelector_osjv1np",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "ChatComposer_37gpoxa",
				"values": {
					"type": "crt.ChatComposer",
					"classes": [
						"view-element"
					],
					"sortedByColumn": "CreatedOn",
					"data": {
						"uId": "a1c2d3e4-f5a6-47b8-c9d0-e1f2a3b4c5d6",
						"schemaType": "Telegram",
						"caption": "Telegram",
						"sortedByColumn": "CreatedOn",
						"typeName": "crt.ChatComposer",
						"icon": "telegram-composer-icon"
					},
					"items": [],
					"providerId": "$ChatComposer_37gpoxa_ProviderId",
					"selectedChannelSchemaType": "$ChatComposer_37gpoxa_SelectedChannelSchemaType",
					"selectedChannelId": "$ChatComposer_37gpoxa_SelectedChannelId",
					"selectedContactId": "$ChatComposer_37gpoxa_SelectedContactId",
					"channels": "$ChatComposer_37gpoxa_Channels",
					"sendersChannels": "$ChatComposer_37gpoxa_ActiveChannels",
					"recipientContacts": "$ChatComposer_37gpoxa_RecipientContacts",
					"chatInput": "$OutboundChatInput",
					"filesToUpload": "$FilesToUpload",
					"selectedChannelIdChange": {
						"request": "crt.ChangeViewModelAttributeValueRequest",
						"params": {
							"attributeName": "ChatComposer_37gpoxa_SelectedChannelId",
							"attributeValue": "@event"
						}
					},
					"selectedContactIdChange": {
						"request": "crt.ChangeViewModelAttributeValueRequest",
						"params": {
							"attributeName": "ChatComposer_37gpoxa_SelectedContactId",
							"attributeValue": "@event"
						}
					},
					"chatId": "$ChatComposer_37gpoxa_ChatId",
					"chatIdChange": {
						"request": "crt.ChangeViewModelAttributeValueRequest",
						"params": {
							"attributeName": "ChatComposer_37gpoxa_ChatId",
							"attributeValue": "@event"
						}
					},
					"editorReadonlyChange": {
						"request": "crt.ChangeViewModelAttributeValueRequest",
						"params": {
							"attributeName": "OutboundChatInputReadonly",
							"attributeValue": "@event"
						}
					},
					"editorPlaceholderKeyChange": {
						"request": "crt.ChangeViewModelAttributeValueRequest",
						"params": {
							"attributeName": "OutboundChatReadonlyPlaceholderKey",
							"attributeValue": "@event"
						}
					},
					"editorTooltipChange": {
						"request": "crt.ChangeViewModelAttributeValueRequest",
						"params": {
							"attributeName": "OutboundChatEditorTooltip",
							"attributeValue": "@event"
						}
					},
					"sendDisabledChange": {
						"request": "crt.ChangeViewModelAttributeValueRequest",
						"params": {
							"attributeName": "OutboundChatInputDisabled",
							"attributeValue": "@event"
						}
					},
					"messageInputDisabledChange": {
						"request": "crt.ChangeViewModelAttributeValueRequest",
						"params": {
							"attributeName": "OutboundChatMessageInputDisabled",
							"attributeValue": "@event"
						}
					},
					"templateSelectDisabledChange": {
						"request": "crt.ChangeViewModelAttributeValueRequest",
						"params": {
							"attributeName": "OutboundChatTemplateSelectDisabled",
							"attributeValue": "@event"
						}
					},
					"chatInputChange": {
						"request": "crt.ChangeViewModelAttributeValueRequest",
						"params": {
							"attributeName": "OutboundChatInput",
							"attributeValue": "@event"
						}
					},
					"filesToUploadChange": {
						"request": "crt.ChangeViewModelAttributeValueRequest",
						"params": {
							"attributeName": "FilesToUpload",
							"attributeValue": "@event"
						}
					},
					"recordIdDataSourceName": "PDS",
					"sendMessage": {
						"request": "crt.SendOutboundChatRequest",
						"params": {
							"composerName": "ChatComposer_37gpoxa",
							"recordIdDataSourceName": "PDS"
						}
					}
				},
				"parentName": "MessageComposerSelector_osjv1np",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "OutboundChat_EditorBody",
				"values": {
					"type": "crt.MessageEditorBody",
					"toolbarItems": [],
					"inputs": [],
					"chatInput": "$OutboundChatInput",
					"isDisabled": "$OutboundChatInputDisabled",
					"attachments": "$FilesToUpload",
					"isFileUploadEnabled": "$OutboundIsFileUploadEnabled",
					"editorTooltip": "$OutboundChatEditorTooltip",
					"sendMessage": {
						"request": "crt.SendOutboundChatRequest",
						"params": {
							"composerName": "ChatComposer_37gpoxa",
							"recordIdDataSourceName": "PDS"
						}
					}
				},
				"parentName": "ChatComposer_37gpoxa",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "OutboundChat_AttachFileButton",
				"values": {
					"type": "crt.Button",
					"icon": "clip-button-icon",
					"size": "small",
					"iconPosition": "only-icon",
					"clicked": {
						"request": "crt.SelectChatFilesRequest"
					},
					"visible": "$OutboundIsFileUploadEnabled",
					"disabled": "$OutboundChatInputDisabled"
				},
				"parentName": "OutboundChat_EditorBody",
				"propertyName": "toolbarItems",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "OutboundChat_EmojiSelect",
				"values": {
					"type": "crt.EmojiSelect",
					"chatInput": "$OutboundChatInput",
					"chatId": "$ChatComposer_37gpoxa_ChatId",
					"chatInputChange": {
						"request": "crt.ChangeViewModelAttributeValueRequest",
						"params": {
							"attributeName": "OutboundChatInput",
							"attributeValue": "@event"
						}
					},
					"disabled": "$OutboundChatInputDisabled"
				},
				"parentName": "OutboundChat_EditorBody",
				"propertyName": "toolbarItems",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "OutboundChat_TemplateSelect",
				"values": {
					"type": "crt.TemplateSelect",
					"disabled": "$OutboundChatTemplateSelectDisabled",
					"chatInput": "$OutboundChatInput",
					"chatId": "$ChatComposer_37gpoxa_ChatId",
					"editorDisabled": "$OutboundChatInputDisabled",
					"chatInputChange": {
						"request": "crt.ChangeViewModelAttributeValueRequest",
						"params": {
							"attributeName": "OutboundChatInput",
							"attributeValue": "@event"
						}
					}
				},
				"parentName": "OutboundChat_EditorBody",
				"propertyName": "toolbarItems",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "OutboundChat_EditorInput",
				"values": {
					"type": "crt.MessageEditorInput",
					"inputMode": "text",
					"chatInput": "$OutboundChatInput",
					"attachments": "$FilesToUpload",
					"isFileUploadEnabled": "$OutboundIsFileUploadEnabled",
					"isDisabled": "$OutboundChatMessageInputDisabled",
					"readonly": "$OutboundChatInputReadonly",
					"readonlyPlaceholderKey": "$OutboundChatReadonlyPlaceholderKey",
					"chatInputChange": {
						"request": "crt.ChangeViewModelAttributeValueRequest",
						"params": {
							"attributeName": "OutboundChatInput",
							"attributeValue": "@event"
						}
					},
					"sendMessage": {
						"request": "crt.SendOutboundChatRequest",
						"params": {
							"composerName": "ChatComposer_37gpoxa",
							"recordIdDataSourceName": "PDS"
						}
					}
				},
				"parentName": "OutboundChat_EditorBody",
				"propertyName": "inputs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TimelineFilterContainer_p1mw1qw",
				"values": {
					"type": "crt.FlexContainer",
					"items": [],
					"classes": [],
					"fitContent": true,
					"direction": "row"
				},
				"parentName": "Timeline_wyrhh6j",
				"propertyName": "customFilters",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Timeline_wyrhh6j_TimelineFilter_Entity",
				"values": {
					"type": "TimelineFilter_Entity",
					"visible": true
				},
				"parentName": "Timeline_wyrhh6j",
				"propertyName": "filters",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Timeline_wyrhh6j_TimelineFilter_Date",
				"values": {
					"type": "TimelineFilter_Date",
					"visible": true
				},
				"parentName": "Timeline_wyrhh6j",
				"propertyName": "filters",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Timeline_wyrhh6j_TimelineFilter_Owner",
				"values": {
					"type": "TimelineFilter_Owner",
					"visible": true
				},
				"parentName": "Timeline_wyrhh6j",
				"propertyName": "filters",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Timeline_wyrhh6j_TimelineFilter_SystemMessages",
				"values": {
					"type": "TimelineFilter_SystemMessages",
					"visible": true
				},
				"parentName": "Timeline_wyrhh6j",
				"propertyName": "filters",
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
					"UsrVMRequestDS_UsrName_bi80wil": {
						"modelConfig": {
							"path": "UsrVMRequestDS.UsrName"
						}
					},
					"UsrVMRequestDS_UsrStatus_erlndsk": {
						"modelConfig": {
							"path": "UsrVMRequestDS.UsrStatus"
						}
					},
					"UsrVMRequestDS_UsrStatus_erlndsk_List": {
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
					"UsrVMRequestDS_UsrRequestType_mn41wa7": {
						"modelConfig": {
							"path": "UsrVMRequestDS.UsrRequestType"
						}
					},
					"UsrVMRequestDS_UsrRequestType_mn41wa7_List": {
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
					"UsrVMRequestDS_UsrAccount_dpi5bc9": {
						"modelConfig": {
							"path": "UsrVMRequestDS.UsrAccount"
						}
					},
					"UsrVMRequestDS_UsrAccount_dpi5bc9_List": {
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
					"UsrVMRequestDS_UsrProject_tecttu5": {
						"modelConfig": {
							"path": "UsrVMRequestDS.UsrProject"
						}
					},
					"UsrVMRequestDS_UsrProject_tecttu5_List": {
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
					"UsrVMRequestDS_UsrRequestType_a8mixnq": {
						"modelConfig": {
							"path": "UsrVMRequestDS.UsrRequestType"
						}
					},
					"UsrVMRequestDS_UsrRequestType_a8mixnq_List": {
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
					"UsrVMRequestDS_UsrAccount_mr6tdw8": {
						"modelConfig": {
							"path": "UsrVMRequestDS.UsrAccount"
						}
					},
					"UsrVMRequestDS_UsrAccount_mr6tdw8_List": {
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
					"UsrVMRequestDS_UsrProject_c4uakj1": {
						"modelConfig": {
							"path": "UsrVMRequestDS.UsrProject"
						}
					},
					"UsrVMRequestDS_UsrProject_c4uakj1_List": {
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
					"UsrVMRequestDS_UsrContract_45erx1e": {
						"modelConfig": {
							"path": "UsrVMRequestDS.UsrContract"
						}
					},
					"UsrVMRequestDS_UsrContract_45erx1e_List": {
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
					"UsrVMRequestDS_CreatedOn_gak9y6h": {
						"modelConfig": {
							"path": "UsrVMRequestDS.CreatedOn"
						}
					},
					"UsrVMRequestDS_UsrEstimatedPoints_hcxx0xn": {
						"modelConfig": {
							"path": "UsrVMRequestDS.UsrEstimatedPoints"
						}
					},
					"UsrVMRequestDS_UsrStatus_5hcrjsl": {
						"modelConfig": {
							"path": "UsrVMRequestDS.UsrStatus"
						}
					},
					"UsrVMRequestDS_UsrStatus_5hcrjsl_List": {
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
					"UsrVMRequestDS_UsrBusinessJustification_wj39gqr": {
						"modelConfig": {
							"path": "UsrVMRequestDS.UsrBusinessJustification"
						}
					},
					"DataGrid_jhhb7ui": {
						"isCollection": true,
						"modelConfig": {
							"path": "DataGrid_jhhb7uiDS"
						},
						"viewModelConfig": {
							"attributes": {
								"DataGrid_jhhb7uiDS_UsrName": {
									"modelConfig": {
										"path": "DataGrid_jhhb7uiDS.UsrName"
									}
								},
								"DataGrid_jhhb7uiDS_UsrEnvironment": {
									"modelConfig": {
										"path": "DataGrid_jhhb7uiDS.UsrEnvironment"
									}
								},
								"DataGrid_jhhb7uiDS_UsrOperatingSystem": {
									"modelConfig": {
										"path": "DataGrid_jhhb7uiDS.UsrOperatingSystem"
									}
								},
								"DataGrid_jhhb7uiDS_UsrRAMGB": {
									"modelConfig": {
										"path": "DataGrid_jhhb7uiDS.UsrRAMGB"
									}
								},
								"DataGrid_jhhb7uiDS_UsrStorageGB": {
									"modelConfig": {
										"path": "DataGrid_jhhb7uiDS.UsrStorageGB"
									}
								},
								"DataGrid_jhhb7uiDS_UsrCPU": {
									"modelConfig": {
										"path": "DataGrid_jhhb7uiDS.UsrCPU"
									}
								},
								"DataGrid_jhhb7uiDS_UsrEstimatedPoints": {
									"modelConfig": {
										"path": "DataGrid_jhhb7uiDS.UsrEstimatedPoints"
									}
								},
								"DataGrid_jhhb7uiDS_UsrPurpose": {
									"modelConfig": {
										"path": "DataGrid_jhhb7uiDS.UsrPurpose"
									}
								},
								"DataGrid_jhhb7uiDS_Id": {
									"modelConfig": {
										"path": "DataGrid_jhhb7uiDS.Id"
									}
								}
							}
						}
					},
					"Id_8xo8pas": {
						"modelConfig": {
							"path": "UsrVMRequestDS.Id"
						}
					},
					"FileList_ltjlj8g": {
						"isCollection": true,
						"modelConfig": {
							"path": "FileList_ltjlj8gDS",
							"sortingConfig": {
								"default": [
									{
										"columnName": "CreatedOn",
										"direction": "desc"
									}
								]
							},
							"filterAttributes": [
								{
									"name": "GridDetailSearchFilter_s4jv5u5_FileList_ltjlj8g",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"FileList_ltjlj8gDS_Name": {
									"modelConfig": {
										"path": "FileList_ltjlj8gDS.Name"
									}
								},
								"FileList_ltjlj8gDS_CreatedOn": {
									"modelConfig": {
										"path": "FileList_ltjlj8gDS.CreatedOn"
									}
								},
								"FileList_ltjlj8gDS_CreatedBy": {
									"modelConfig": {
										"path": "FileList_ltjlj8gDS.CreatedBy"
									}
								},
								"FileList_ltjlj8gDS_Size": {
									"modelConfig": {
										"path": "FileList_ltjlj8gDS.Size"
									}
								},
								"FileList_ltjlj8gDS_Id": {
									"modelConfig": {
										"path": "FileList_ltjlj8gDS.Id"
									}
								}
							}
						}
					},
					"OutboundChatInput": {
						"value": ""
					},
					"OutboundChatInputDisabled": {
						"value": false
					},
					"OutboundChatMessageInputDisabled": {
						"value": false
					},
					"OutboundChatInputReadonly": {
						"value": false
					},
					"OutboundChatReadonlyPlaceholderKey": {
						"value": ""
					},
					"OutboundChatEditorTooltip": {
						"value": null
					},
					"OutboundChatTemplateSelectDisabled": {
						"value": false
					},
					"FilesToUpload": {
						"value": []
					},
					"OutboundIsFileUploadEnabled": {
						"value": true
					},
					"ChatComposer_37gpoxa_SelectedChannelId": {
						"value": ""
					},
					"ChatComposer_37gpoxa_SelectedContactId": {
						"value": ""
					},
					"ChatComposer_37gpoxa_ChatId": {
						"value": ""
					},
					"ChatComposer_37gpoxa_Channels": {
						"value": [
							{
								"schemaType": "Telegram",
								"caption": "Telegram",
								"icon": "telegram-composer-icon",
								"providerId": "645170ab-c67a-4dcc-9def-c0e5236bdfe0"
							},
							{
								"schemaType": "SMS",
								"caption": "SMS",
								"icon": "sms-composer-icon",
								"providerId": "21af0484-eee0-4f61-8822-f8789838ba66"
							},
							{
								"schemaType": "WhatsApp",
								"caption": "WhatsApp",
								"icon": "whatsapp-composer-icon",
								"providerId": "1398dc73-b428-4e21-b97a-c1bb6b4bc621"
							},
							{
								"schemaType": "FacebookMessenger",
								"caption": "Facebook Messenger",
								"icon": "messenger-composer-icon",
								"providerId": "50491c6c-d82b-4b86-b38c-99262d11a5ac"
							}
						]
					},
					"ChatComposer_37gpoxa_SelectedChannelSchemaType": {
						"value": "Telegram"
					},
					"ChatComposer_37gpoxa_ProviderId": {
						"from": [
							"ChatComposer_37gpoxa_SelectedChannelSchemaType",
							"ChatComposer_37gpoxa_Channels"
						],
						"converter": "crt.ToProviderIdBySchemaType"
					},
					"ChatComposer_37gpoxa_ActiveChannels": {
						"from": "ChatComposer_37gpoxa_ProviderId",
						"converter": "crt.ToActiveChannelsByProvider"
					},
					"ChatComposer_37gpoxa_RecipientContacts": {
						"from": "ChatComposer_37gpoxa_ProviderId",
						"converter": "crt.ToRecipientsByProvider"
					},
					"Timeline_wyrhh6j_AllTileFilters": {
						"from": [],
						"converter": "crt.ToTileFilterGroup"
					}
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"CardState"
				],
				"values": {
					"modelConfig": {}
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
						"DataGrid_jhhb7uiDS": {
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
									"UsrOperatingSystem": {
										"path": "UsrOperatingSystem"
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
									"UsrEstimatedPoints": {
										"path": "UsrEstimatedPoints"
									},
									"UsrPurpose": {
										"path": "UsrPurpose"
									}
								}
							}
						},
						"FileList_ltjlj8gDS": {
							"type": "crt.EntityDataSource",
							"scope": "viewElement",
							"config": {
								"entitySchemaName": "SysFile",
								"attributes": {
									"Name": {
										"path": "Name"
									},
									"CreatedOn": {
										"path": "CreatedOn"
									},
									"CreatedBy": {
										"path": "CreatedBy"
									},
									"Size": {
										"path": "Size"
									}
								}
							}
						}
					},
					"primaryDataSourceName": "UsrVMRequestDS",
					"dependencies": {
						"DataGrid_jhhb7uiDS": [
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