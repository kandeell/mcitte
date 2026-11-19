define("UsrMCITResourceCatalogV2Page", /**SCHEMA_DEPS*/[
  '@creatio-devkit/common',
  'css!UsrMCITResourceCatalogV2Styles',
	'css!UsrRubikFontCSS'
]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "MainContainer",
				"values": {
					"classes": [
						"mcit-rcv2-page"
					]
				}
			},
			{
				"operation": "insert",
				"name": "FlexContainer_e6wnaw5",
				"values": {
					"classes": [
						"mcit-rcv2-header"
					],
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
				"name": "FlexContainer_7pihjtg",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true
				},
				"parentName": "FlexContainer_e6wnaw5",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_pwspa1o",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_pwspa1o_caption)#)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_7pihjtg",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_yf5tsi7",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_yf5tsi7_caption)#)#",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "#757575",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_7pihjtg",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_ikhs9t5",
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
				"parentName": "FlexContainer_7pihjtg",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Label_s64k5jx",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Label",
					"caption": "— used in point rules",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "GridContainer_ikhs9t5",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_32b9p2b",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Label",
					"caption": "— active resource types",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "GridContainer_ikhs9t5",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Button_gvadutu",
				"values": {
					"classes": [
						"mcit-rcv2-action",
						"mcit-rcv2-add",
						"mcit-rcv2-add-cta"
					],
					"type": "crt.Button",
					"caption": "Add Resource",
					"color": "primary",
					"disabled": false,
					"size": "large",
					"textTransform": "none",
					"iconPosition": "left-icon",
					"visible": true,
					"icon": "add-button-icon",
					"clicked": {
						"request": "usr.RCV2_OpenAddPanel"
					},
					"shape": "rounded"
				},
				"parentName": "FlexContainer_e6wnaw5",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_833lvl4",
				"values": {
					"type": "crt.GridContainer",
					"classes": [
						"mcit-rcv2-toolbar"
					],
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(40px, max-content) minmax(40px, max-content)",
					"gap": {
						"columnGap": "medium",
						"rowGap": "medium"
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
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrRCV2Search",
				"values": {
					"type": "crt.SearchFilter",
					"classes": [
						"mcit-rcv2-search"
					],
					"placeholder": "#ResourceString(UsrRCV2Search_placeholder)#",
					"_filterOptions": {
						"expose": [
							{
								"attribute": "UsrRCV2Search_DataGrid_zjad730",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"DataGrid_zjad730"
										]
									}
								]
							}
						],
						"from": [
							"UsrRCV2Search_SearchValue",
							"UsrRCV2Search_FilteredColumnsGroups"
						]
					},
					"layoutConfig": {
						"column": 1,
						"colSpan": 4,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_833lvl4",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_trq7uip",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 3,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.FlexContainer",
					"classes": [
						"mcit-rcv2-categories"
					],
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
					"alignItems": "stretch",
					"justifyContent": "start",
					"gap": "small"
				},
				"parentName": "GridContainer_833lvl4",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Button_73voshh",
				"values": {
					"classes": "$UsrRCV2_CategoryAllClasses",
					"type": "crt.Button",
					"caption": "#ResourceString(Button_73voshh_caption)#",
					"color": "$UsrRCV2_CategoryAllColor",
					"pressed": "$UsrRCV2_CategoryAllPressed",
					"clicked": {
						"request": "usr.RCV2_SelectCategory",
						"params": {
							"category": "All"
						}
					},
					"disabled": false,
					"size": "medium",
					"textTransform": "none",
					"shape": "rounded",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "FlexContainer_trq7uip",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Button_98l4yzq",
				"values": {
					"classes": "$UsrRCV2_CategoryCPUClasses",
					"type": "crt.Button",
					"caption": "#ResourceString(Button_98l4yzq_caption)#",
					"color": "$UsrRCV2_CategoryCPUColor",
					"pressed": "$UsrRCV2_CategoryCPUPressed",
					"clicked": {
						"request": "usr.RCV2_SelectCategory",
						"params": {
							"category": "CPU"
						}
					},
					"disabled": false,
					"size": "medium",
					"textTransform": "none",
					"shape": "rounded",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "FlexContainer_trq7uip",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Button_ph090cq",
				"values": {
					"classes": "$UsrRCV2_CategoryRAMClasses",
					"type": "crt.Button",
					"caption": "#ResourceString(Button_ph090cq_caption)#",
					"color": "$UsrRCV2_CategoryRAMColor",
					"pressed": "$UsrRCV2_CategoryRAMPressed",
					"clicked": {
						"request": "usr.RCV2_SelectCategory",
						"params": {
							"category": "RAM"
						}
					},
					"disabled": false,
					"size": "medium",
					"textTransform": "none",
					"shape": "rounded",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "FlexContainer_trq7uip",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Button_wd33fmh",
				"values": {
					"classes": "$UsrRCV2_CategoryStorageClasses",
					"type": "crt.Button",
					"caption": "#ResourceString(Button_wd33fmh_caption)#",
					"color": "$UsrRCV2_CategoryStorageColor",
					"pressed": "$UsrRCV2_CategoryStoragePressed",
					"clicked": {
						"request": "usr.RCV2_SelectCategory",
						"params": {
							"category": "Storage"
						}
					},
					"disabled": false,
					"size": "medium",
					"textTransform": "none",
					"shape": "rounded",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "FlexContainer_trq7uip",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Button_iyzpvu3",
				"values": {
					"classes": "$UsrRCV2_CategoryOSClasses",
					"type": "crt.Button",
					"caption": "#ResourceString(Button_iyzpvu3_caption)#",
					"color": "$UsrRCV2_CategoryOSColor",
					"pressed": "$UsrRCV2_CategoryOSPressed",
					"clicked": {
						"request": "usr.RCV2_SelectCategory",
						"params": {
							"category": "OS"
						}
					},
					"disabled": false,
					"size": "medium",
					"textTransform": "none",
					"shape": "rounded",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "FlexContainer_trq7uip",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Button_6ey09zl",
				"values": {
					"classes": "$UsrRCV2_CategoryEnvironmentClasses",
					"type": "crt.Button",
					"caption": "#ResourceString(Button_6ey09zl_caption)#",
					"color": "$UsrRCV2_CategoryEnvironmentColor",
					"pressed": "$UsrRCV2_CategoryEnvironmentPressed",
					"clicked": {
						"request": "usr.RCV2_SelectCategory",
						"params": {
							"category": "Environment"
						}
					},
					"disabled": false,
					"size": "medium",
					"textTransform": "none",
					"shape": "rounded",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "FlexContainer_trq7uip",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "Button_7zk7ghe",
				"values": {
					"classes": "$UsrRCV2_CategoryNetworkClasses",
					"type": "crt.Button",
					"caption": "#ResourceString(Button_7zk7ghe_caption)#",
					"color": "$UsrRCV2_CategoryNetworkColor",
					"pressed": "$UsrRCV2_CategoryNetworkPressed",
					"clicked": {
						"request": "usr.RCV2_SelectCategory",
						"params": {
							"category": "Network"
						}
					},
					"disabled": false,
					"size": "medium",
					"textTransform": "none",
					"shape": "rounded",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "FlexContainer_trq7uip",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "Button_1yw476g",
				"values": {
					"classes": "$UsrRCV2_CategoryOtherClasses",
					"type": "crt.Button",
					"caption": "#ResourceString(Button_1yw476g_caption)#",
					"color": "$UsrRCV2_CategoryOtherColor",
					"pressed": "$UsrRCV2_CategoryOtherPressed",
					"clicked": {
						"request": "usr.RCV2_SelectCategory",
						"params": {
							"category": "Other"
						}
					},
					"disabled": false,
					"size": "medium",
					"textTransform": "none",
					"shape": "rounded",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "FlexContainer_trq7uip",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "FlexContainer_n46gs53",
				"values": {
					"layoutConfig": {
						"column": 4,
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
				"parentName": "GridContainer_833lvl4",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "FlexContainer_r6s7xe4",
				"values": {
					"type": "crt.FlexContainer",
					"classes": [
						"mcit-rcv2-status"
					],
					"direction": "row",
					"wrap": "wrap",
					"items": [],
					"fitContent": true
				},
				"parentName": "FlexContainer_n46gs53",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Button_b2ekbiw",
				"values": {
					"classes": "$UsrRCV2_StatusAllClasses",
					"type": "crt.Button",
					"caption": "#ResourceString(Button_b2ekbiw_caption)#",
					"color": "$UsrRCV2_StatusAllColor",
					"pressed": "$UsrRCV2_StatusAllPressed",
					"clicked": {
						"request": "usr.RCV2_SelectStatus",
						"params": {
							"status": "All"
						}
					},
					"disabled": false,
					"size": "medium",
					"textTransform": "none",
					"shape": "rounded",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "FlexContainer_r6s7xe4",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Button_ham21n8",
				"values": {
					"classes": "$UsrRCV2_StatusActiveClasses",
					"type": "crt.Button",
					"caption": "#ResourceString(Button_ham21n8_caption)#",
					"color": "$UsrRCV2_StatusActiveColor",
					"pressed": "$UsrRCV2_StatusActivePressed",
					"clicked": {
						"request": "usr.RCV2_SelectStatus",
						"params": {
							"status": "Active"
						}
					},
					"disabled": false,
					"size": "medium",
					"textTransform": "none",
					"shape": "rounded",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "FlexContainer_r6s7xe4",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Button_cci25r8",
				"values": {
					"classes": "$UsrRCV2_StatusInactiveClasses",
					"type": "crt.Button",
					"caption": "#ResourceString(Button_cci25r8_caption)#",
					"color": "$UsrRCV2_StatusInactiveColor",
					"pressed": "$UsrRCV2_StatusInactivePressed",
					"clicked": {
						"request": "usr.RCV2_SelectStatus",
						"params": {
							"status": "Inactive"
						}
					},
					"disabled": false,
					"size": "medium",
					"textTransform": "none",
					"shape": "rounded",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "FlexContainer_r6s7xe4",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "FlexContainer_60yzw7e",
				"values": {
					"classes": [
						"mcit-rcv2-editor"
					],
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true,
					"visible": "$UsrRCV2_EditorVisible",
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					},
					"color": "transparent",
					"borderRadius": "medium",
					"alignItems": "stretch",
					"justifyContent": "start",
					"gap": "medium"
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "FlexContainer_k2slin6",
				"values": {
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
					"alignItems": "stretch",
					"justifyContent": "space-between",
					"gap": "small"
				},
				"parentName": "FlexContainer_60yzw7e",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_db94jrs",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrRCV2_EditorTitle",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_k2slin6",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Button_hurxkhe",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_hurxkhe_caption)#",
					"color": "default",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-icon",
					"visible": true,
					"classes": [
						"mcit-rcv2-panel-close"
					],
					"icon": "close-button-icon",
					"clicked": {
						"request": "usr.RCV2_CancelEditor"
					},
					"clickMode": "default"
				},
				"parentName": "FlexContainer_k2slin6",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_7aiu96j",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 32px)",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": "none"
					},
					"styles": {
						"overflow-x": "hidden"
					},
					"items": [],
					"visible": true,
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					},
					"color": "transparent",
					"borderRadius": "none",
					"alignItems": "stretch"
				},
				"parentName": "FlexContainer_60yzw7e",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "NumberInput_fsuxugr",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 2,
						"row": 5,
						"rowSpan": 1
					},
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.UsrMCITResourceTypeDS_UsrIncrement_2o1fc4e",
					"control": "$UsrMCITResourceTypeDS_UsrIncrement_2o1fc4e",
					"readonly": false,
					"placeholder": "",
					"labelPosition": "auto",
					"tooltip": ""
				},
				"parentName": "GridContainer_7aiu96j",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Input_se7gydg",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrMCITResourceTypeDS_UsrArabicName_i4ny6rr",
					"control": "$UsrMCITResourceTypeDS_UsrArabicName_i4ny6rr",
					"placeholder": "",
					"tooltip": "",
					"readonly": false,
					"multiline": false,
					"labelPosition": "auto"
				},
				"parentName": "GridContainer_7aiu96j",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Input_mq34meu",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrMCITResourceTypeDS_UsrCode_13txp20",
					"control": "$UsrMCITResourceTypeDS_UsrCode_13txp20",
					"placeholder": "",
					"tooltip": "",
					"readonly": false,
					"multiline": false,
					"labelPosition": "auto"
				},
				"parentName": "GridContainer_7aiu96j",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "ComboBox_bsbq2b5",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrMCITResourceTypeDS_UsrCategory_86ccbac",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "auto",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$UsrMCITResourceTypeDS_UsrCategory_86ccbac"
				},
				"parentName": "GridContainer_7aiu96j",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "addRecord_0b4tzp5",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_0b4tzp5_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_bsbq2b5",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Input_amxwt31",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 2,
						"row": 3,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrMCITResourceTypeDS_UsrUnit_hfpqr88",
					"control": "$UsrMCITResourceTypeDS_UsrUnit_hfpqr88",
					"placeholder": "",
					"tooltip": "",
					"readonly": false,
					"multiline": false,
					"labelPosition": "auto"
				},
				"parentName": "GridContainer_7aiu96j",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "NumberInput_2scuagc",
				"values": {
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.UsrMCITResourceTypeDS_UsrMaxValue_o7r6w3q",
					"control": "$UsrMCITResourceTypeDS_UsrMaxValue_o7r6w3q",
					"readonly": false,
					"placeholder": "",
					"labelPosition": "auto",
					"tooltip": "",
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 4,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_7aiu96j",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "NumberInput_d73doiq",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 4,
						"rowSpan": 1
					},
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.UsrMCITResourceTypeDS_UsrMinValue_08d64yz",
					"control": "$UsrMCITResourceTypeDS_UsrMinValue_08d64yz",
					"readonly": false,
					"placeholder": "",
					"labelPosition": "auto",
					"tooltip": ""
				},
				"parentName": "GridContainer_7aiu96j",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "Input_vclmbof",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrMCITResourceTypeDS_Name_dtbchb4",
					"control": "$UsrMCITResourceTypeDS_Name_dtbchb4",
					"placeholder": "",
					"tooltip": "",
					"readonly": false,
					"multiline": false,
					"labelPosition": "auto"
				},
				"parentName": "GridContainer_7aiu96j",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "DateTimePicker_7chb6ta",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 6,
						"rowSpan": 1
					},
					"type": "crt.DateTimePicker",
					"label": "$Resources.Strings.UsrMCITResourceTypeDS_UsrStartDate_49dh87v",
					"placeholder": "",
					"readonly": false,
					"labelPosition": "auto",
					"tooltip": "",
					"pickerType": "date",
					"control": "$UsrMCITResourceTypeDS_UsrStartDate_49dh87v"
				},
				"parentName": "GridContainer_7aiu96j",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "DateTimePicker_364l0kd",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 6,
						"rowSpan": 1
					},
					"type": "crt.DateTimePicker",
					"label": "$Resources.Strings.UsrMCITResourceTypeDS_UsrEndDate_dfhth81",
					"placeholder": "",
					"readonly": false,
					"labelPosition": "auto",
					"tooltip": "",
					"pickerType": "date",
					"control": "$UsrMCITResourceTypeDS_UsrEndDate_dfhth81"
				},
				"parentName": "GridContainer_7aiu96j",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "insert",
				"name": "FlexContainer_bn3pw71",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 2,
						"row": 7,
						"rowSpan": 1
					},
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true
				},
				"parentName": "GridContainer_7aiu96j",
				"propertyName": "items",
				"index": 10
			},
			{
				"operation": "insert",
				"name": "MultiSelect_cogxzpi",
				"values": {
					"type": "crt.MultiSelect",
					"label": "#ResourceString(MultiSelect_cogxzpi_label)#",
					"recordId": "$Id_gak673r",
					"recordRelationColumnName": "UsrResourceType",
					"selectSchemaName": "UsrMCITResourceContract",
					"selectColumnName": "UsrContract",
					"visible": true,
					"labelPosition": "auto",
					"placeholder": "",
					"tooltip": "",
					"required": false
				},
				"parentName": "FlexContainer_bn3pw71",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_yg95ir5",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_yg95ir5_caption)#)#",
					"labelType": "body-large",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_bn3pw71",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FlexContainer_3ufrqcp",
				"values": {
					"classes": [
						"mcit-rcv2-editor-status"
					],
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "wrap",
					"items": [],
					"fitContent": true
				},
				"parentName": "FlexContainer_bn3pw71",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Button_q7tyiaf",
				"values": {
					"classes": "$UsrRCV2_EditorActiveClasses",
					"type": "crt.Button",
					"caption": "#ResourceString(Button_q7tyiaf_caption)#",
					"color": "$UsrRCV2_EditorActiveColor",
					"disabled": false,
					"size": "medium",
					"textTransform": "none",
					"iconPosition": "only-text",
					"visible": true,
					"pressed": "$UsrRCV2_EditorActivePressed",
					"clicked": {
						"request": "usr.RCV2_SelectEditorStatus",
						"params": {
							"value": true
						}
					},
					"shape": "rounded"
				},
				"parentName": "FlexContainer_3ufrqcp",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Button_hje7h15",
				"values": {
					"classes": "$UsrRCV2_EditorInactiveClasses",
					"type": "crt.Button",
					"caption": "#ResourceString(Button_hje7h15_caption)#",
					"color": "$UsrRCV2_EditorInactiveColor",
					"disabled": false,
					"size": "medium",
					"textTransform": "none",
					"iconPosition": "only-text",
					"visible": true,
					"pressed": "$UsrRCV2_EditorInactivePressed",
					"clicked": {
						"request": "usr.RCV2_SelectEditorStatus",
						"params": {
							"value": false
						}
					},
					"shape": "rounded"
				},
				"parentName": "FlexContainer_3ufrqcp",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FlexContainer_d56b9xu",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 2,
						"row": 9,
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
					"alignItems": "stretch",
					"justifyContent": "end",
					"gap": "small"
				},
				"parentName": "GridContainer_7aiu96j",
				"propertyName": "items",
				"index": 11
			},
			{
				"operation": "insert",
				"name": "Button_wwrm793",
				"values": {
					"classes": [
						"mcit-rcv2-action",
						"mcit-rcv2-cancel"
					],
					"type": "crt.Button",
					"caption": "#ResourceString(Button_wwrm793_caption)#",
					"color": "outline",
					"disabled": false,
					"size": "large",
					"textTransform": "none",
					"iconPosition": "only-text",
					"visible": true,
					"clicked": {
						"request": "usr.RCV2_CancelEditor"
					},
					"clickMode": "default"
				},
				"parentName": "FlexContainer_d56b9xu",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Button_thuz20z",
				"values": {
					"classes": [
						"mcit-rcv2-action",
						"mcit-rcv2-save"
					],
					"type": "crt.Button",
					"caption": "Save Resource",
					"color": "primary",
					"disabled": "$UsrRCV2_SaveDisabled",
					"size": "large",
					"textTransform": "none",
					"iconPosition": "only-text",
					"visible": true,
					"clickMode": "default",
					"clicked": {
						"request": "usr.RCV2_SaveEditor"
					}
				},
				"parentName": "FlexContainer_d56b9xu",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrRCV2_EditorMessageLabel",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrRCV2_EditorMessage",
					"labelType": "body",
					"visible": "$UsrRCV2_MessageVisible",
					"classes": [
						"mcit-rcv2-message"
					],
					"layoutConfig": {
						"column": 1,
						"colSpan": 2,
						"row": 8,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_7aiu96j",
				"propertyName": "items",
				"index": 12
			},
			{
				"operation": "insert",
				"name": "DataGrid_zjad730",
				"values": {
					"type": "crt.DataGrid",
					"classes": [
						"mcit-rcv2-grid"
					],
					"rowToolbarItems": [
						{
							"type": "crt.MenuItem",
							"caption": "Edit Resource",
							"icon": "edit-row-action",
							"clicked": {
								"request": "usr.RCV2_OpenGridRow",
								"params": {
									"itemsAttributeName": "DataGrid_zjad730",
									"recordId": "$DataGrid_zjad730.DataGrid_zjad730DS_Id"
								}
							}
						}
					],
					"features": {
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						}
					},
					"items": "$DataGrid_zjad730",
					"primaryColumnName": "DataGrid_zjad730DS_Id",
					"columns": [
						{
							"id": "24de1afc-372a-6941-a1a6-d84d3fafb0f2",
							"code": "DataGrid_zjad730DS_Name",
							"caption": "#ResourceString(DataGrid_zjad730DS_Name)#",
							"dataValueType": 28
						},
						{
							"id": "074ee4cb-1527-81d1-b9bc-e423f319cb0e",
							"code": "DataGrid_zjad730DS_UsrCode",
							"caption": "#ResourceString(DataGrid_zjad730DS_UsrCode)#",
							"dataValueType": 27
						},
						{
							"id": "e3285b98-d6e9-bdce-1850-aec614817469",
							"code": "DataGrid_zjad730DS_UsrCategory",
							"caption": "#ResourceString(DataGrid_zjad730DS_UsrCategory)#",
							"dataValueType": 10
						},
						{
							"id": "b7bf8a5e-0e84-8484-d59d-bb556acf17a5",
							"code": "DataGrid_zjad730DS_UsrUnit",
							"caption": "#ResourceString(DataGrid_zjad730DS_UsrUnit)#",
							"dataValueType": 28,
							"width": 149.9937286376953
						},
						{
							"id": "224316bd-5738-3474-6a40-31ebfc9d09e7",
							"code": "DataGrid_zjad730DS_UsrAllContracts",
							"caption": "#ResourceString(DataGrid_zjad730DS_UsrAllContracts)#",
							"dataValueType": 12,
							"width": 224.99374389648438
						},
						{
							"id": "cf067dc5-e8b7-d9d2-cb4f-22f1719ae66c",
							"code": "DataGrid_zjad730DS_CreatedOn",
							"caption": "#ResourceString(DataGrid_zjad730DS_CreatedOn)#",
							"dataValueType": 7,
							"width": 236.98748779296875
						},
						{
							"id": "4bf5bfdf-6b23-c38e-22b8-6987757a2060",
							"code": "DataGrid_zjad730DS_UsrActive",
							"caption": "#ResourceString(DataGrid_zjad730DS_UsrActive)#",
							"dataValueType": 12,
							"width": 247.99374389648438
						}
					],
					"placeholder": false
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 3
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [],
				"values": {
					"attributes": {
						"UsrRCV2_SelectedCategory": {
							"value": "All",
							"modelConfig": {}
						},
						"UsrRCV2_SelectedStatus": {
							"value": "All",
							"modelConfig": {}
						},
						"UsrRCV2_ButtonFilter": {
							"value": null,
							"modelConfig": {}
						},
						"UsrRCV2_CategoryAllPressed": {
							"value": true
						},
						"UsrRCV2_CategoryAllColor": {
							"value": "primary"
						},
						"UsrRCV2_CategoryCPUPressed": {
							"value": false
						},
						"UsrRCV2_CategoryCPUColor": {
							"value": "outline"
						},
						"UsrRCV2_CategoryRAMPressed": {
							"value": false
						},
						"UsrRCV2_CategoryRAMColor": {
							"value": "outline"
						},
						"UsrRCV2_CategoryStoragePressed": {
							"value": false
						},
						"UsrRCV2_CategoryStorageColor": {
							"value": "outline"
						},
						"UsrRCV2_CategoryOSPressed": {
							"value": false
						},
						"UsrRCV2_CategoryOSColor": {
							"value": "outline"
						},
						"UsrRCV2_CategoryEnvironmentPressed": {
							"value": false
						},
						"UsrRCV2_CategoryEnvironmentColor": {
							"value": "outline"
						},
						"UsrRCV2_CategoryNetworkPressed": {
							"value": false
						},
						"UsrRCV2_CategoryNetworkColor": {
							"value": "outline"
						},
						"UsrRCV2_CategoryOtherPressed": {
							"value": false
						},
						"UsrRCV2_CategoryOtherColor": {
							"value": "outline"
						},
						"UsrRCV2_StatusAllPressed": {
							"value": true
						},
						"UsrRCV2_StatusAllColor": {
							"value": "primary"
						},
						"UsrRCV2_StatusActivePressed": {
							"value": false
						},
						"UsrRCV2_StatusActiveColor": {
							"value": "outline"
						},
						"UsrRCV2_StatusInactivePressed": {
							"value": false
						},
						"UsrRCV2_StatusInactiveColor": {
							"value": "outline"
						},
						"UsrRCV2_EditorMode": {
							"value": "none",
							"modelConfig": {}
						},
						"UsrRCV2_EditorStatusActive": {
							"value": true,
							"modelConfig": {}
						},
						"UsrRCV2_CategoryAllClasses": {
							"value": [
								"mcit-rcv2-filter-pill",
								"mcit-rcv2-pill-selected"
							]
						},
						"UsrRCV2_CategoryCPUClasses": {
							"value": [
								"mcit-rcv2-filter-pill"
							]
						},
						"UsrRCV2_CategoryRAMClasses": {
							"value": [
								"mcit-rcv2-filter-pill"
							]
						},
						"UsrRCV2_CategoryStorageClasses": {
							"value": [
								"mcit-rcv2-filter-pill"
							]
						},
						"UsrRCV2_CategoryOSClasses": {
							"value": [
								"mcit-rcv2-filter-pill"
							]
						},
						"UsrRCV2_CategoryEnvironmentClasses": {
							"value": [
								"mcit-rcv2-filter-pill"
							]
						},
						"UsrRCV2_CategoryNetworkClasses": {
							"value": [
								"mcit-rcv2-filter-pill"
							]
						},
						"UsrRCV2_CategoryOtherClasses": {
							"value": [
								"mcit-rcv2-filter-pill"
							]
						},
						"UsrRCV2_StatusAllClasses": {
							"value": [
								"mcit-rcv2-filter-pill",
								"mcit-rcv2-pill-selected"
							]
						},
						"UsrRCV2_StatusActiveClasses": {
							"value": [
								"mcit-rcv2-filter-pill"
							]
						},
						"UsrRCV2_StatusInactiveClasses": {
							"value": [
								"mcit-rcv2-filter-pill"
							]
						},
						"UsrRCV2_EditorActivePressed": {
							"value": true
						},
						"UsrRCV2_EditorActiveColor": {
							"value": "primary"
						},
						"UsrRCV2_EditorActiveClasses": {
							"value": [
								"mcit-rcv2-editor-pill",
								"mcit-rcv2-pill-selected"
							]
						},
						"UsrRCV2_EditorInactivePressed": {
							"value": false
						},
						"UsrRCV2_EditorInactiveColor": {
							"value": "outline"
						},
						"UsrRCV2_EditorInactiveClasses": {
							"value": [
								"mcit-rcv2-editor-pill"
							]
						},
						"UsrRCV2_EditorRecordId": {
							"value": null,
							"modelConfig": {}
						},
						"UsrRCV2_SaveDisabled": {
							"value": false,
							"modelConfig": {}
						},
						"UsrRCV2_SaveBusy": {
							"value": false,
							"modelConfig": {}
						},
						"UsrRCV2_EditorMessage": {
							"value": "",
							"modelConfig": {}
						},
						"UsrRCV2_MessageVisible": {
							"value": false,
							"modelConfig": {}
						},
						"UsrRCV2_EditorVisible": {
							"value": false,
							"modelConfig": {}
						},
						"UsrRCV2_EditorTitle": {
							"value": "Add Resource",
							"modelConfig": {}
						},
						"DataGrid_zjad730": {
							"isCollection": true,
							"modelConfig": {
								"path": "DataGrid_zjad730DS",
								"filterAttributes": [
									{
										"name": "UsrRCV2Search_DataGrid_zjad730",
										"loadOnChange": true
									},
									{
										"name": "UsrRCV2_ButtonFilter",
										"loadOnChange": true
									}
								]
							},
							"viewModelConfig": {
								"attributes": {
									"DataGrid_zjad730DS_Name": {
										"modelConfig": {
											"path": "DataGrid_zjad730DS.Name"
										}
									},
									"DataGrid_zjad730DS_UsrCode": {
										"modelConfig": {
											"path": "DataGrid_zjad730DS.UsrCode"
										}
									},
									"DataGrid_zjad730DS_UsrCategory": {
										"modelConfig": {
											"path": "DataGrid_zjad730DS.UsrCategory"
										}
									},
									"DataGrid_zjad730DS_UsrUnit": {
										"modelConfig": {
											"path": "DataGrid_zjad730DS.UsrUnit"
										}
									},
									"DataGrid_zjad730DS_UsrAllContracts": {
										"modelConfig": {
											"path": "DataGrid_zjad730DS.UsrAllContracts"
										}
									},
									"DataGrid_zjad730DS_CreatedOn": {
										"modelConfig": {
											"path": "DataGrid_zjad730DS.CreatedOn"
										}
									},
									"DataGrid_zjad730DS_UsrActive": {
										"modelConfig": {
											"path": "DataGrid_zjad730DS.UsrActive"
										}
									},
									"DataGrid_zjad730DS_Id": {
										"modelConfig": {
											"path": "DataGrid_zjad730DS.Id"
										}
									}
								}
							}
						},
						"UsrMCITResourceTypeDS_Name_dtbchb4": {
							"modelConfig": {
								"path": "UsrMCITResourceTypeDS.Name"
							}
						},
						"UsrMCITResourceTypeDS_UsrArabicName_i4ny6rr": {
							"modelConfig": {
								"path": "UsrMCITResourceTypeDS.UsrArabicName"
							}
						},
						"UsrMCITResourceTypeDS_UsrCode_13txp20": {
							"modelConfig": {
								"path": "UsrMCITResourceTypeDS.UsrCode"
							}
						},
						"UsrMCITResourceTypeDS_UsrCategory_86ccbac": {
							"modelConfig": {
								"path": "UsrMCITResourceTypeDS.UsrCategory"
							}
						},
						"UsrMCITResourceTypeDS_UsrCategory_86ccbac_List": {
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
						"UsrMCITResourceTypeDS_UsrUnit_hfpqr88": {
							"modelConfig": {
								"path": "UsrMCITResourceTypeDS.UsrUnit"
							}
						},
						"UsrMCITResourceTypeDS_UsrMaxValue_o7r6w3q": {
							"modelConfig": {
								"path": "UsrMCITResourceTypeDS.UsrMaxValue"
							}
						},
						"UsrMCITResourceTypeDS_UsrMinValue_08d64yz": {
							"modelConfig": {
								"path": "UsrMCITResourceTypeDS.UsrMinValue"
							}
						},
						"UsrMCITResourceTypeDS_UsrStartDate_49dh87v": {
							"modelConfig": {
								"path": "UsrMCITResourceTypeDS.UsrStartDate"
							}
						},
						"UsrMCITResourceTypeDS_UsrEndDate_dfhth81": {
							"modelConfig": {
								"path": "UsrMCITResourceTypeDS.UsrEndDate"
							}
						},
						"UsrMCITResourceTypeDS_UsrIncrement_2o1fc4e": {
							"modelConfig": {
								"path": "UsrMCITResourceTypeDS.UsrIncrement"
							}
						},
						"Id_gak673r": {
							"modelConfig": {
								"path": "UsrMCITResourceTypeDS.Id"
							}
						},
						"MultiSelect_cogxzpi_List_Items_Predefined_Filter": {
							"value": null
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
						"UsrMCITResourceTypeDS": {
							"type": "crt.EntityDataSource",
							"scope": "page",
							"config": {
								"entitySchemaName": "UsrMCITResourceType",
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
						"DataGrid_zjad730DS": {
							"type": "crt.EntityDataSource",
							"scope": "viewElement",
							"config": {
								"entitySchemaName": "UsrMCITResourceType",
								"attributes": {
									"Name": {
										"path": "Name"
									},
									"UsrCode": {
										"path": "UsrCode"
									},
									"UsrCategory": {
										"path": "UsrCategory"
									},
									"UsrUnit": {
										"path": "UsrUnit"
									},
									"UsrAllContracts": {
										"path": "UsrAllContracts"
									},
									"CreatedOn": {
										"path": "CreatedOn"
									},
									"UsrActive": {
										"path": "UsrActive"
									}
								}
							}
						}
					},
					"primaryDataSourceName": "UsrMCITResourceTypeDS"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[


{
    request: "usr.RCV2_OpenAddPanel",
    handler: async (request) => {
        const ctx = request.$context;

        try {
            console.info(
                "[MCIT RCV2] Initializing new resource"
            );

            // 1. Disconnect from previous edit record
            ctx.UsrRCV2_EditorVisible = false;
            ctx.UsrRCV2_EditorMode = "none";
            ctx.UsrRCV2_EditorRecordId = null;

            // 2. Clear all text fields
            ctx.UsrMCITResourceTypeDS_Name_dtbchb4 = "";
            ctx.UsrMCITResourceTypeDS_UsrArabicName_i4ny6rr = "";
            ctx.UsrMCITResourceTypeDS_UsrCode_13txp20 = "";
            ctx.UsrMCITResourceTypeDS_UsrUnit_hfpqr88 = "";

            // 3. Clear all numeric fields
            ctx.UsrMCITResourceTypeDS_UsrMinValue_08d64yz = null;
            ctx.UsrMCITResourceTypeDS_UsrMaxValue_o7r6w3q = null;
            ctx.UsrMCITResourceTypeDS_UsrIncrement_2o1fc4e = null;

            // 4. Clear dates
            ctx.UsrMCITResourceTypeDS_UsrStartDate_49dh87v = null;
            ctx.UsrMCITResourceTypeDS_UsrEndDate_dfhth81 = null;

            // 5. Clear category lookup
            ctx.UsrMCITResourceTypeDS_UsrCategory_86ccbac = null;

            // 6. Reset status to Active
            ctx.UsrRCV2_EditorStatusActive = true;

            ctx.UsrRCV2_EditorActivePressed = true;
            ctx.UsrRCV2_EditorInactivePressed = false;

            ctx.UsrRCV2_EditorActiveColor = "primary";
            ctx.UsrRCV2_EditorInactiveColor = "outline";

            ctx.UsrRCV2_EditorActiveClasses = [
                "mcit-rcv2-editor-pill",
                "mcit-rcv2-pill-selected"
            ];

            ctx.UsrRCV2_EditorInactiveClasses = [
                "mcit-rcv2-editor-pill"
            ];

            // 7. Clear previous validation messages
            ctx.UsrRCV2_EditorMessage = "";
            ctx.UsrRCV2_MessageVisible = false;

            // 8. Reset Save button
            ctx.UsrRCV2_SaveDisabled = false;
            ctx.UsrRCV2_SaveBusy = false;

            // 9. Activate Add mode and show empty panel
            ctx.UsrRCV2_EditorTitle = "Add Resource";
            ctx.UsrRCV2_EditorMode = "add";
            ctx.UsrRCV2_EditorVisible = true;

            console.info(
                "[MCIT RCV2] New resource draft initialized"
            );

        } catch (error) {
            console.error(
                "[MCIT RCV2] Failed to reset form:",
                error
            );

            ctx.UsrRCV2_EditorMode = "none";
            ctx.UsrRCV2_EditorVisible = false;
        }
    }
}
,
  {
    request: "usr.RCV2_SelectEditorStatus",
    handler: async (request) => {
      const c = request.$context;
      const active = Boolean(request.value ?? request.params?.value);
      c.UsrRCV2_EditorStatusActive = active;
      for (const status of ["Active", "Inactive"]) {
        const selected = (status === "Active") === active;
        c["UsrRCV2_Editor" + status + "Pressed"] = selected;
        c["UsrRCV2_Editor" + status + "Color"] = selected ? "primary" : "outline";
        c["UsrRCV2_Editor" + status + "Classes"] = [
          "mcit-rcv2-editor-pill",
          ...(selected ? ["mcit-rcv2-pill-selected"] : [])
        ];
      }
    }
  },
  
{
    request: "usr.RCV2_SelectCategory",
    handler: async (request) => {
		console.log(
    "[MCIT] Category clicked:",
    request.category,
    request.params
);
        const ctx = request.$context;
        const selected = request.category ?? request.params?.category;
        const categories = [
            "All", "CPU", "RAM", "Storage",
            "OS", "Environment", "Network", "Other"
        ];

        console.info("[MCIT RCV2] Category clicked:", selected);

        if (!categories.includes(selected)) {
            console.warn("Unknown category:", selected);
            return;
        }

        try {
            ctx.UsrRCV2_SelectedCategory = selected;

            // Update button appearance
            for (const name of categories) {
                const active = name === selected;
                const prefix = "UsrRCV2_Category" + name;

                ctx[prefix + "Pressed"] = active;
                ctx[prefix + "Color"] = active
                    ? "primary" : "outline";

                ctx[prefix + "Classes"] = [
                    "mcit-rcv2-filter-pill",
                    ...(active ? ["mcit-rcv2-pill-selected"] : [])
                ];
            }

            // Combine category with currently selected status
            const status = (await ctx.UsrRCV2_SelectedStatus) || "All";

            const filter = new sdk.FilterGroup();
            filter.logicalOperation = sdk.LogicalOperatorType.And;

            if (selected !== "All") {
                await filter.addSchemaColumnFilterWithParameter(
                    sdk.ComparisonType.Equal,
                    "UsrCategory.Name",
                    selected
                );
            }

            if (status !== "All") {
                await filter.addSchemaColumnFilterWithParameter(
                    sdk.ComparisonType.Equal,
                    "UsrActive",
                    status === "Active"
                );
            }

            ctx.UsrRCV2_ButtonFilter =
                selected === "All" && status === "All"
                    ? null
                    : Object.assign({}, filter, {
                        items: filter.items
                    });

            // Explicitly reload the grid
            await sdk.HandlerChainService.instance.process({
                type: "crt.LoadDataRequest",
                dataSourceName: "DataGrid_zjad730DS",
                config: {
                    loadType: "reload"
                },
                $context: ctx,
                scopes: request.scopes || []
            });

            console.info("[MCIT RCV2] Category filter applied");
        } catch (error) {
            console.error("[MCIT RCV2] Category filter failed:", error);
        }
    }
},
{
    request: "usr.RCV2_SelectStatus",
    handler: async (request) => {
        const ctx = request.$context;
        const selected = request.status ?? request.params?.status;
        const statuses = ["All", "Active", "Inactive"];

        console.info("[MCIT RCV2] Status clicked:", selected);

        if (!statuses.includes(selected)) {
            console.warn("Unknown status:", selected);
            return;
        }

        try {
            ctx.UsrRCV2_SelectedStatus = selected;

            // Update status button appearance
            for (const name of statuses) {
                const active = name === selected;
                const prefix = "UsrRCV2_Status" + name;

                ctx[prefix + "Pressed"] = active;
                ctx[prefix + "Color"] = active
                    ? "primary" : "outline";

                ctx[prefix + "Classes"] = [
                    "mcit-rcv2-filter-pill",
                    ...(active ? ["mcit-rcv2-pill-selected"] : [])
                ];
            }

            // Combine status with currently selected category
            const category = (await ctx.UsrRCV2_SelectedCategory) || "All";

            const filter = new sdk.FilterGroup();
            filter.logicalOperation = sdk.LogicalOperatorType.And;

            if (category !== "All") {
                await filter.addSchemaColumnFilterWithParameter(
                    sdk.ComparisonType.Equal,
                    "UsrCategory.Name",
                    category
                );
            }

            if (selected !== "All") {
                await filter.addSchemaColumnFilterWithParameter(
                    sdk.ComparisonType.Equal,
                    "UsrActive",
                    selected === "Active"
                );
            }

            ctx.UsrRCV2_ButtonFilter =
                category === "All" && selected === "All"
                    ? null
                    : Object.assign({}, filter, {
                        items: filter.items
                    });

            // Explicitly reload the grid
            await sdk.HandlerChainService.instance.process({
                type: "crt.LoadDataRequest",
                dataSourceName: "DataGrid_zjad730DS",
                config: {
                    loadType: "reload"
                },
                $context: ctx,
                scopes: request.scopes || []
            });

            console.info("[MCIT RCV2] Status filter applied");
        } catch (error) {
            console.error("[MCIT RCV2] Status filter failed:", error);
        }
    }
}
,
  // Native list-row Edit command (three-dot menu) passes the clicked row's ID.

{
    request: "usr.RCV2_OpenGridRow",
    handler: async (request) => {
        const ctx = request.$context;

        console.info(
            "[MCIT RCV2] Row Edit request received",
            request.recordId
        );

        try {
            const rawId = await request.recordId;

            const id = typeof rawId === "string"
                ? rawId
                : (
                    rawId?.value ||
                    rawId?.Id ||
                    rawId?.id
                );

            if (
                !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id || "")
            ) {
                throw new Error(
                    "The clicked row did not provide a valid resource ID: " +
                    String(rawId)
                );
            }

            const model = await sdk.Model.create(
                "UsrMCITResourceType"
            );

            const rows = await model.load({
                attributes: [
                    "Id",
                    "Name",
                    "UsrArabicName",
                    "UsrCode",
                    "UsrCategory",
                    "UsrUnit",
                    "UsrMinValue",
                    "UsrMaxValue",
                    "UsrIncrement",
                    "UsrStartDate",
                    "UsrEndDate",
                    "UsrActive"
                ],
                parameters: [
                    {
                        type: sdk.ModelParameterType.PrimaryColumnValue,
                        value: id
                    }
                ]
            });

            if (!Array.isArray(rows) || rows.length !== 1) {
                throw new Error(
                    "Could not load the selected resource: " + id
                );
            }

            const r = rows[0];

            // Populate form
            ctx.UsrMCITResourceTypeDS_Name_dtbchb4 = r.Name ?? "";
            ctx.UsrMCITResourceTypeDS_UsrArabicName_i4ny6rr = r.UsrArabicName ?? "";
            ctx.UsrMCITResourceTypeDS_UsrCode_13txp20 = r.UsrCode ?? "";
            ctx.UsrMCITResourceTypeDS_UsrUnit_hfpqr88 = r.UsrUnit ?? "";

            ctx.UsrMCITResourceTypeDS_UsrMinValue_08d64yz = r.UsrMinValue ?? null;
            ctx.UsrMCITResourceTypeDS_UsrMaxValue_o7r6w3q = r.UsrMaxValue ?? null;
            ctx.UsrMCITResourceTypeDS_UsrIncrement_2o1fc4e = r.UsrIncrement ?? null;
            ctx.UsrMCITResourceTypeDS_UsrStartDate_49dh87v = r.UsrStartDate ?? null;
            ctx.UsrMCITResourceTypeDS_UsrEndDate_dfhth81 = r.UsrEndDate ?? null;

            // Category lookup
            ctx.UsrMCITResourceTypeDS_UsrCategory_86ccbac =
                typeof r.UsrCategory === "string"
                    ? {
                        value: r.UsrCategory,
                        displayValue: ""
                    }
                    : (r.UsrCategory ?? null);

            // Active / Inactive styling
            const isActive = Boolean(r.UsrActive);

            ctx.UsrRCV2_EditorStatusActive = isActive;
            ctx.UsrRCV2_EditorActivePressed = isActive;
            ctx.UsrRCV2_EditorInactivePressed = !isActive;

            ctx.UsrRCV2_EditorActiveColor =
                isActive ? "primary" : "outline";

            ctx.UsrRCV2_EditorInactiveColor =
                isActive ? "outline" : "primary";

            ctx.UsrRCV2_EditorActiveClasses = [
                "mcit-rcv2-editor-pill",
                ...(isActive ? ["mcit-rcv2-pill-selected"] : [])
            ];

            ctx.UsrRCV2_EditorInactiveClasses = [
                "mcit-rcv2-editor-pill",
                ...(!isActive ? ["mcit-rcv2-pill-selected"] : [])
            ];

            // Switch to Edit mode
            ctx.UsrRCV2_EditorRecordId = id;
            ctx.UsrRCV2_EditorMode = "edit";
            ctx.UsrRCV2_EditorTitle = "Edit Resource";

            // Clear previous errors
            ctx.UsrRCV2_EditorMessage = "";
            ctx.UsrRCV2_MessageVisible = false;

            // Open normal Flex panel
            ctx.UsrRCV2_EditorVisible = true;

            console.info(
                "[MCIT RCV2] Opened resource for editing",
                id
            );

        } catch (error) {
            console.error(
                "[MCIT RCV2] Edit Resource failed",
                error
            );

            ctx.UsrRCV2_EditorMessage =
                error?.message || "Could not open this resource.";

            ctx.UsrRCV2_MessageVisible = true;
        }
    }
}
,
  // Intercept only the Resource Catalog grid's normal Open request. All other sections retain native navigation.

{
    request: "crt.UpdateRecordRequest",
    handler: async (request, next) => {
      if (request.itemsAttributeName !== "DataGrid_zjad730") {
        return next?.handle(request);
      }
      return sdk.HandlerChainService.instance.process({
        type: "usr.RCV2_OpenGridRow",
        recordId: request.recordId,
        $context: request.$context,
        scopes: request.scopes || []
      });
    }
  },
  
{
    request: "usr.RCV2_CancelEditor",
    handler: async (request) => {
        const ctx = request.$context;

        console.info("[MCIT RCV2] Close panel clicked");

        // Clear the previous record reference
        ctx.UsrRCV2_EditorMode = "none";
        ctx.UsrRCV2_EditorRecordId = null;

        // Clear draft fields
        ctx.UsrMCITResourceTypeDS_Name_dtbchb4 = "";
        ctx.UsrMCITResourceTypeDS_UsrArabicName_i4ny6rr = "";
        ctx.UsrMCITResourceTypeDS_UsrCode_13txp20 = "";
        ctx.UsrMCITResourceTypeDS_UsrUnit_hfpqr88 = "";

        ctx.UsrMCITResourceTypeDS_UsrMinValue_08d64yz = null;
        ctx.UsrMCITResourceTypeDS_UsrMaxValue_o7r6w3q = null;
        ctx.UsrMCITResourceTypeDS_UsrIncrement_2o1fc4e = null;

        ctx.UsrMCITResourceTypeDS_UsrStartDate_49dh87v = null;
        ctx.UsrMCITResourceTypeDS_UsrEndDate_dfhth81 = null;

        ctx.UsrMCITResourceTypeDS_UsrCategory_86ccbac = null;

        // Reset notifications and Save state
        ctx.UsrRCV2_EditorMessage = "";
        ctx.UsrRCV2_MessageVisible = false;
        ctx.UsrRCV2_SaveDisabled = false;

        // Hide the entire Add/Edit panel LAST
        ctx.UsrRCV2_EditorVisible = false;

        console.info("[MCIT RCV2] Panel visibility set to false");
    }
}
,
{
    request: "usr.RCV2_SaveEditor",
    handler: async (request) => {
        const ctx = request.$context;

        console.info("[MCIT RCV2] Save clicked");

        const showMessage = (message) => {
            ctx.UsrRCV2_EditorMessage = message || "";
            ctx.UsrRCV2_MessageVisible = Boolean(message);
        };

        const get = async (name) => await ctx[name];

        const getText = async (name) =>
            String((await get(name)) ?? "").trim();

        const getNumber = async (name, label) => {
            const value = await get(name);

            if (
                value === null ||
                value === undefined ||
                value === ""
            ) {
                return null;
            }

            const numericValue = Number(value);

            if (!Number.isFinite(numericValue)) {
                throw new Error(
                    label + " must be a valid number."
                );
            }

            return numericValue;
        };

        const getLookupId = (lookup) => {
            if (!lookup) return null;

            if (typeof lookup === "string") {
                return lookup;
            }

            return (
                lookup.value ||
                lookup.Id ||
                lookup.id ||
                null
            );
        };

        const isGuid = (id) =>
            typeof id === "string" &&
            /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id);

        // Prevent double saving
        if (await get("UsrRCV2_SaveBusy")) {
            console.warn(
                "[MCIT RCV2] Save already in progress"
            );
            return;
        }

        ctx.UsrRCV2_SaveBusy = true;
        ctx.UsrRCV2_SaveDisabled = true;
        showMessage("");

        try {
            const mode = await get(
                "UsrRCV2_EditorMode"
            );

            console.info(
                "[MCIT RCV2] Editor mode:",
                mode
            );

            if (mode !== "add" && mode !== "edit") {
                throw new Error(
                    "Open Add Resource or edit an existing resource before saving."
                );
            }

            // =====================================
            // 1. VALIDATE REQUIRED FIELDS
            // =====================================

            const name = await getText(
                "UsrMCITResourceTypeDS_Name_dtbchb4"
            );

            const code = await getText(
                "UsrMCITResourceTypeDS_UsrCode_13txp20"
            );

            if (!name) {
                throw new Error(
                    "English Name is required."
                );
            }

            if (!code) {
                throw new Error(
                    "Resource Code is required."
                );
            }

            // =====================================
            // 2. VALIDATE NUMERIC FIELDS
            // =====================================

            const min = await getNumber(
                "UsrMCITResourceTypeDS_UsrMinValue_08d64yz",
                "Min Value"
            );

            const max = await getNumber(
                "UsrMCITResourceTypeDS_UsrMaxValue_o7r6w3q",
                "Max Value"
            );

            const increment = await getNumber(
                "UsrMCITResourceTypeDS_UsrIncrement_2o1fc4e",
                "Increment"
            );

            if (
                min !== null &&
                max !== null &&
                min > max
            ) {
                throw new Error(
                    "Min Value cannot exceed Max Value."
                );
            }

          

            // =====================================
            // 3. VALIDATE DATES
            // =====================================

            const start =
                (await get(
                    "UsrMCITResourceTypeDS_UsrStartDate_49dh87v"
                )) || null;

            const end =
                (await get(
                    "UsrMCITResourceTypeDS_UsrEndDate_dfhth81"
                )) || null;

            if (
                start &&
                end &&
                new Date(start).getTime() >
                new Date(end).getTime()
            ) {
                throw new Error(
                    "End Date must be on or after Start Date."
                );
            }

            // =====================================
            // 4. READ CATEGORY
            // =====================================

            const category = await get(
                "UsrMCITResourceTypeDS_UsrCategory_86ccbac"
            );

            const categoryId = getLookupId(category);

            // =====================================
            // 5. BUILD RESOURCE DATA
            // =====================================

            const dto = {
                Name: name,

                UsrArabicName: await getText(
                    "UsrMCITResourceTypeDS_UsrArabicName_i4ny6rr"
                ),

                UsrCode: code,

                UsrUnit: await getText(
                    "UsrMCITResourceTypeDS_UsrUnit_hfpqr88"
                ),

                UsrMinValue: min,

                UsrMaxValue: max,

                UsrIncrement: increment,

                UsrStartDate: start,

                UsrEndDate: end,

                UsrActive: Boolean(
                    await get(
                        "UsrRCV2_EditorStatusActive"
                    )
                ),

                UsrCategory: categoryId
                    ? { value: categoryId }
                    : null
            };

            console.info(
                "[MCIT RCV2] Saving payload:",
                dto
            );

            const model = await sdk.Model.create(
                "UsrMCITResourceType"
            );

            // =====================================
            // 6. CREATE NEW RESOURCE
            // =====================================

            if (mode === "add") {

                const result = await model.insert(dto);

                console.info(
                    "[MCIT RCV2] Insert result:",
                    result
                );

                if (!result?.success) {
                    throw new Error(
                        "Creatio rejected the insert. Check the Console."
                    );
                }

                const id =
                    result.primaryAttributes?.[0]?.Id ||
                    result.primaryAttributes?.Id ||
                    result.Id;

                if (!isGuid(id)) {

                    // Prevent creating a duplicate
                    ctx.UsrRCV2_EditorMode = "none";

                    showMessage(
                        "The resource may have been created, but no ID was returned. Check the list before retrying."
                    );

                    return;
                }

                ctx.UsrRCV2_EditorRecordId = id;

                ctx.UsrRCV2_EditorMode = "edit";

                ctx.UsrRCV2_EditorTitle =
                    "Edit Resource";


                console.info(
                    "[MCIT RCV2] Resource created:",
                    id
                );
            }

            // =====================================
            // 7. UPDATE EXISTING RESOURCE
            // =====================================

            else {

                const id = await get(
                    "UsrRCV2_EditorRecordId"
                );

                if (!isGuid(id)) {
                    throw new Error(
                        "Select a saved resource before editing."
                    );
                }

                const result = await model.update(
                    dto,
                    [
                        {
                            type:
                                sdk.ModelParameterType
                                    .PrimaryColumnValue,
                            value: id
                        }
                    ]
                );

                console.info(
                    "[MCIT RCV2] Update result:",
                    result
                );

                if (
                    !result?.success ||
                    result.rowsAffected === 0
                ) {
                    throw new Error(
                        "Creatio did not update the resource."
                    );
                }

                console.info(
                    "[MCIT RCV2] Resource updated:",
                    id
                );
            }

            // =====================================
            // 8. REFRESH RESOURCE CATALOG GRID
            // =====================================

            try {
                await sdk.HandlerChainService
                    .instance.process({
                        type: "crt.LoadDataRequest",

                        dataSourceName:
                            "DataGrid_zjad730DS",

                        config: {
                            loadType: "reload"
                        },

                        $context: ctx,

                        scopes: request.scopes || []
                    });

                console.info(
                    "[MCIT RCV2] Grid refreshed"
                );

            } catch (refreshError) {

                console.warn(
                    "[MCIT RCV2] Resource saved, but grid refresh failed:",
                    refreshError
                );
            }

            // =====================================
            // 9. AUTOMATICALLY CLOSE PANEL
            //    AFTER SUCCESSFUL SAVE
            // =====================================

            ctx.UsrRCV2_EditorVisible = false;

            ctx.UsrRCV2_EditorMode = "none";

            ctx.UsrRCV2_EditorMessage = "";

            ctx.UsrRCV2_MessageVisible = false;

            console.info(
                "[MCIT RCV2] Resource saved successfully. Panel closed."
            );

        } catch (error) {

            // Keep panel open when saving fails
            console.error(
                "[MCIT RCV2] Save failed:",
                error
            );

            ctx.UsrRCV2_EditorVisible = true;

            showMessage(
                error?.message ||
                "Save failed. Check the browser Console."
            );

        } finally {

            ctx.UsrRCV2_SaveBusy = false;

            ctx.UsrRCV2_SaveDisabled = false;
        }
    }
}

]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});