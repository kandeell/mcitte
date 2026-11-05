define("UsrMCITAddOnSection_ListPage", /**SCHEMA_DEPS*/[
    "@creatio-devkit/common",
    "css!UsrMCITAddOnStyles"
]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "Main",
				"values": {
					"classes": [
						"mcit-addon-page"
					]
				}
			},
			{
				"operation": "merge",
				"name": "MainHeader",
				"values": {
					"color": "transparent",
					"padding": {
						"top": "large",
						"right": "none",
						"bottom": "small",
						"left": "medium"
					},
					"classes": [
						"mcit-addon-header"
					],
					"visible": true,
					"borderRadius": "none",
					"gap": "small"
				}
			},
			{
				"operation": "merge",
				"name": "TitleContainer",
				"values": {
					"direction": "column",
					"classes": [
						"mcit-addon-title-column"
					],
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
					"labelType": "headline-1-small",
					"classes": [
						"mcit-addon-title"
					],
					"visible": true
				}
			},
			{
				"operation": "merge",
				"name": "AddButton",
				"values": {
					"clicked": {
						"request": "usr.AddOn_OpenAdd"
					},
					"caption": "Add Add-on",
					"classes": [
						"mcit-addon-primary",
						"mcit-addon-top-add"
					],
					"shape": "rounded",
					"size": "large",
					"visible": true,
					"clickMode": "default"
				}
			},
			{
				"operation": "remove",
				"name": "DataImportButton"
			},
			{
				"operation": "remove",
				"name": "MenuItem_ImportFromExcel"
			},
			{
				"operation": "remove",
				"name": "OpenLandingDesigner"
			},
			{
				"operation": "remove",
				"name": "ActionButton"
			},
			{
				"operation": "remove",
				"name": "MenuItem_ExportToExcel"
			},
			{
				"operation": "remove",
				"name": "MainContainer"
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
				"name": "ContentContainer"
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
				"operation": "remove",
				"name": "SectionContentWrapper"
			},
			{
				"operation": "remove",
				"name": "MainTabPanel"
			},
			{
				"operation": "remove",
				"name": "ListTabContainer"
			},
			{
				"operation": "remove",
				"name": "ListContainer"
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "0cd86233-926f-5707-9180-f4354d8435bb",
							"code": "PDS_UsrCode",
							"caption": "#ResourceString(PDS_UsrCode)#",
							"dataValueType": 28,
							"width": 125
						},
						{
							"id": "f252f581-0ccf-44ac-b7c9-c00df2ad9919",
							"code": "PDS_UsrName",
							"caption": "#ResourceString(PDS_UsrName)#",
							"dataValueType": 1,
							"width": 300
						},
						{
							"id": "6a7103cd-f57a-d043-4a67-fe428796e5f3",
							"code": "PDS_UsrUnit",
							"caption": "#ResourceString(PDS_UsrUnit)#",
							"dataValueType": 27,
							"width": 105
						},
						{
							"id": "4c906d61-557e-a6e1-ba11-2d5ba28fecda",
							"code": "PDS_UsrMinQuantity",
							"caption": "#ResourceString(PDS_UsrMinQuantity)#",
							"dataValueType": 4,
							"width": 138
						},
						{
							"id": "c4125daf-5996-4fc1-5d23-e5e267dfec9b",
							"code": "PDS_UsrMaxQuantity",
							"caption": "#ResourceString(PDS_UsrMaxQuantity)#",
							"dataValueType": 4,
							"width": 138
						},
						{
							"id": "91773114-e985-a5cf-07b5-649920d8856c",
							"code": "PDS_UsrIncrement",
							"caption": "#ResourceString(PDS_UsrIncrement)#",
							"dataValueType": 4,
							"width": 115
						},
						{
							"id": "bfa1e78f-1656-3e4c-fc78-57da437ad5e6",
							"code": "PDS_UsrUnitPrice",
							"caption": "#ResourceString(PDS_UsrUnitPrice)#",
							"dataValueType": 31,
							"width": 145
						},
						{
							"id": "233ff849-7e5e-7f5e-326e-657315158200",
							"code": "PDS_UsrResourceEffect",
							"caption": "#ResourceString(PDS_UsrResourceEffect)#",
							"dataValueType": 10,
							"width": 200
						},
						{
							"id": "ff5f1776-1222-b2ab-6cf1-5ec43abdbad7",
							"code": "PDS_UsrActive",
							"caption": "#ResourceString(PDS_UsrActive)#",
							"dataValueType": 12,
							"width": 105
						}
					],
					"classes": [
						"mcit-addon-table"
					],
					"rowToolbarItems": [
						{
							"type": "crt.MenuItem",
							"caption": "Edit Add-on",
							"icon": "edit-row-action",
							"clicked": {
								"request": "usr.AddOn_OpenRow",
								"params": {
									"itemsAttributeName": "Items",
									"recordId": "$Items.PDS_Id"
								}
							}
						}
					],
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					}
				}
			},
			{
				"operation": "move",
				"name": "DataTable",
				"parentName": "GridContainer_1sesluw",
				"propertyName": "items",
				"index": 1
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
				"name": "Label_0an08kq",
				"values": {
					"classes": [
						"mcit-addon-subtitle"
					],
					"type": "crt.Label",
					"caption": "Manage optional VM services, quantity rules, and financial rates.",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "#757575",
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
				"name": "FlexContainer_x2jreha",
				"values": {
					"classes": [
						"mcit-addon-empty-container"
					],
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true,
					"visible": false
				},
				"parentName": "MainHeader",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrMCITAddOnInfoBannerCard",
				"values": {
					"type": "crt.FlexContainer",
					"classes": [
						"mcit-addon-banner-card"
					],
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true,
					"visible": true,
					"alignItems": "center",
					"justifyContent": "start",
					"gap": "small",
					"color": "transparent",
					"borderRadius": "medium"
				},
				"parentName": "Main",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrMCITAddOnInfoIcon",
				"values": {
					"type": "crt.Label",
					"caption": "ⓘ",
					"labelType": "body-large",
					"labelColor": "#3563ac",
					"visible": true,
					"classes": [
						"mcit-addon-banner-icon"
					]
				},
				"parentName": "UsrMCITAddOnInfoBannerCard",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_l4154xh",
				"values": {
					"classes": [
						"mcit-addon-banner"
					],
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_l4154xh_caption)#)#",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "#004FD6",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "UsrMCITAddOnInfoBannerCard",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FlexContainer_4e9tbek",
				"values": {
					"classes": [
						"mcit-addon-form-card"
					],
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true,
					"visible": "$UsrAddOn_EditorVisible",
					"gap": "medium"
				},
				"parentName": "Main",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrAddOn_EditorHeader",
				"values": {
					"type": "crt.FlexContainer",
					"classes": [
						"mcit-addon-form-header"
					],
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true,
					"visible": true,
					"justifyContent": "space-between",
					"alignItems": "center",
					"gap": "small"
				},
				"parentName": "FlexContainer_4e9tbek",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrAddOn_EditorTitleLabel",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrAddOn_EditorTitle",
					"labelType": "headline-3",
					"labelColor": "auto",
					"labelPosition": "auto",
					"visible": true
				},
				"parentName": "UsrAddOn_EditorHeader",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrAddOn_CloseButton",
				"values": {
					"type": "crt.Button",
					"caption": "Close",
					"color": "default",
					"size": "medium",
					"icon": "close-button-icon",
					"iconPosition": "only-icon",
					"visible": true,
					"classes": [
						"mcit-addon-close"
					],
					"clicked": {
						"request": "usr.AddOn_Cancel"
					}
				},
				"parentName": "UsrAddOn_EditorHeader",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_62x8xyv",
				"values": {
					"classes": [
						"mcit-addon-form-grid"
					],
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "large",
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
				"parentName": "FlexContainer_4e9tbek",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Input_q4v9x6y",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrMCITAddOnDS_UsrCode_fs72rg2",
					"control": "$UsrMCITAddOnDS_UsrCode_fs72rg2",
					"placeholder": "",
					"tooltip": "",
					"readonly": false,
					"multiline": false,
					"labelPosition": "above"
				},
				"parentName": "GridContainer_62x8xyv",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Input_c2jjvm5",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrMCITAddOnDS_UsrName_6mh994e",
					"control": "$UsrMCITAddOnDS_UsrName_6mh994e",
					"placeholder": "",
					"tooltip": "",
					"readonly": false,
					"multiline": false,
					"labelPosition": "above"
				},
				"parentName": "GridContainer_62x8xyv",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Input_12pgt7q",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrMCITAddOnDS_UsrArabicName_6k8pwy0",
					"control": "$UsrMCITAddOnDS_UsrArabicName_6k8pwy0",
					"placeholder": "",
					"tooltip": "",
					"readonly": false,
					"multiline": false,
					"labelPosition": "above"
				},
				"parentName": "GridContainer_62x8xyv",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Input_ln3st18",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrMCITAddOnDS_UsrDescription_aekxdcd",
					"control": "$UsrMCITAddOnDS_UsrDescription_aekxdcd",
					"placeholder": "",
					"tooltip": "",
					"readonly": false,
					"multiline": false,
					"labelPosition": "above"
				},
				"parentName": "GridContainer_62x8xyv",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Input_6a8am2o",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 3,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrMCITAddOnDS_UsrUnit_7ahy72e",
					"control": "$UsrMCITAddOnDS_UsrUnit_7ahy72e",
					"placeholder": "",
					"tooltip": "",
					"readonly": false,
					"multiline": false,
					"labelPosition": "above"
				},
				"parentName": "GridContainer_62x8xyv",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "NumberInput_paa1du3",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 3,
						"rowSpan": 1
					},
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.UsrMCITAddOnDS_UsrUnitPrice_49d234b",
					"control": "$UsrMCITAddOnDS_UsrUnitPrice_49d234b",
					"readonly": false,
					"placeholder": "",
					"labelPosition": "above",
					"tooltip": ""
				},
				"parentName": "GridContainer_62x8xyv",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "NumberInput_xbb057j",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 4,
						"rowSpan": 1
					},
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.UsrMCITAddOnDS_UsrMinQuantity_2chyqsx",
					"control": "$UsrMCITAddOnDS_UsrMinQuantity_2chyqsx",
					"readonly": false,
					"placeholder": "",
					"labelPosition": "above",
					"tooltip": ""
				},
				"parentName": "GridContainer_62x8xyv",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "NumberInput_5v3byxu",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 4,
						"rowSpan": 1
					},
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.UsrMCITAddOnDS_UsrMaxQuantity_jf00fsa",
					"control": "$UsrMCITAddOnDS_UsrMaxQuantity_jf00fsa",
					"readonly": false,
					"placeholder": "",
					"labelPosition": "above",
					"tooltip": ""
				},
				"parentName": "GridContainer_62x8xyv",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "NumberInput_w0p2x8s",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 5,
						"rowSpan": 1
					},
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.UsrMCITAddOnDS_UsrIncrement_nc3diox",
					"control": "$UsrMCITAddOnDS_UsrIncrement_nc3diox",
					"readonly": false,
					"placeholder": "",
					"labelPosition": "above",
					"tooltip": ""
				},
				"parentName": "GridContainer_62x8xyv",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "ComboBox_w4rm9lo",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 5,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrMCITAddOnDS_UsrResourceEffect_xkss95r",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "above",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$UsrMCITAddOnDS_UsrResourceEffect_xkss95r"
				},
				"parentName": "GridContainer_62x8xyv",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "insert",
				"name": "addRecord_uzuf2tu",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_uzuf2tu_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_w4rm9lo",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Checkbox_nky1b96",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 6,
						"rowSpan": 1
					},
					"type": "crt.Checkbox",
					"value": true,
					"disabled": false,
					"inversed": false,
					"label": "$Resources.Strings.UsrMCITAddOnDS_UsrActive_rtfq9zq",
					"ariaLabel": "",
					"labelPosition": "right",
					"tooltip": "",
					"control": "$UsrMCITAddOnDS_UsrActive_rtfq9zq",
					"visible": true,
					"readonly": false,
					"placeholder": ""
				},
				"parentName": "GridContainer_62x8xyv",
				"propertyName": "items",
				"index": 10
			},
			{
				"operation": "insert",
				"name": "FlexContainer_sr83dyo",
				"values": {
					"classes": [
						"mcit-addon-form-footer"
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
					"justifyContent": "end",
					"gap": "small"
				},
				"parentName": "FlexContainer_4e9tbek",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Button_ocoz6w5",
				"values": {
					"classes": [
						"mcit-addon-action",
						"mcit-addon-cancel"
					],
					"color": "default",
					"shape": "rounded",
					"clicked": {
						"request": "usr.AddOn_Cancel"
					},
					"type": "crt.Button",
					"caption": "Cancel",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "FlexContainer_sr83dyo",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Button_4qxmnxc",
				"values": {
					"classes": [
						"mcit-addon-action",
						"mcit-addon-save"
					],
					"color": "default",
					"shape": "rounded",
					"disabled": false,
					"clicked": {
						"request": "usr.AddOn_Save"
					},
					"type": "crt.Button",
					"caption": "Save Add-on",
					"size": "large",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "FlexContainer_sr83dyo",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrAddOn_Message",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrAddOn_EditorMessage",
					"labelType": "body",
					"labelColor": "auto",
					"visible": "$UsrAddOn_MessageVisible",
					"classes": [
						"mcit-addon-message"
					]
				},
				"parentName": "FlexContainer_4e9tbek",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_1sesluw",
				"values": {
					"type": "crt.GridContainer",
					"classes": [
						"mcit-addon-list-card"
					],
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
					"borderRadius": "medium",
					"padding": {
						"top": "none",
						"bottom": "none",
						"right": "none",
						"left": "none"
					}
				},
				"parentName": "Main",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "FlexContainer_v34qypp",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "wrap",
					"items": [],
					"fitContent": true
				},
				"parentName": "GridContainer_1sesluw",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_vp5matu",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "wrap",
					"items": [],
					"fitContent": true
				},
				"parentName": "FlexContainer_v34qypp",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrAddOn_ListTitle",
				"values": {
					"type": "crt.Label",
					"caption": "Configured add-ons",
					"labelType": "headline-4",
					"labelColor": "auto",
					"visible": true,
					"styles": {
						"transform": "translateX(20px)"
					},
					"classes": [
						"mcit-addon-list-heading"
					]
				},
				"parentName": "FlexContainer_v34qypp",
				"propertyName": "items",
				"index": 1
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"attributes"
				],
				"values": {
					"UsrAddOn_EditorVisible": {
						"value": false
					},
					"UsrAddOn_EditorTitle": {
						"value": "New Add-on"
					},
					"UsrAddOn_EditorMode": {
						"value": "none"
					},
					"UsrAddOn_EditorRecordId": {
						"value": null
					},
					"UsrAddOn_SaveBusy": {
						"value": false
					},
					"UsrAddOn_EditorMessage": {
						"value": ""
					},
					"UsrAddOn_MessageVisible": {
						"value": false
					},
					"UsrMCITAddOnDS_UsrCode_fs72rg2": {
						"modelConfig": {
							"path": "UsrMCITAddOnDS.UsrCode"
						}
					},
					"UsrMCITAddOnDS_UsrName_6mh994e": {
						"modelConfig": {
							"path": "UsrMCITAddOnDS.UsrName"
						}
					},
					"UsrMCITAddOnDS_UsrArabicName_6k8pwy0": {
						"modelConfig": {
							"path": "UsrMCITAddOnDS.UsrArabicName"
						}
					},
					"UsrMCITAddOnDS_UsrDescription_aekxdcd": {
						"modelConfig": {
							"path": "UsrMCITAddOnDS.UsrDescription"
						}
					},
					"UsrMCITAddOnDS_UsrUnitPrice_49d234b": {
						"modelConfig": {
							"path": "UsrMCITAddOnDS.UsrUnitPrice"
						}
					},
					"UsrMCITAddOnDS_UsrUnit_7ahy72e": {
						"modelConfig": {
							"path": "UsrMCITAddOnDS.UsrUnit"
						}
					},
					"UsrMCITAddOnDS_UsrMaxQuantity_jf00fsa": {
						"modelConfig": {
							"path": "UsrMCITAddOnDS.UsrMaxQuantity"
						}
					},
					"UsrMCITAddOnDS_UsrMinQuantity_2chyqsx": {
						"modelConfig": {
							"path": "UsrMCITAddOnDS.UsrMinQuantity"
						}
					},
					"UsrMCITAddOnDS_UsrIncrement_nc3diox": {
						"modelConfig": {
							"path": "UsrMCITAddOnDS.UsrIncrement"
						}
					},
					"UsrMCITAddOnDS_UsrResourceEffect_xkss95r": {
						"modelConfig": {
							"path": "UsrMCITAddOnDS.UsrResourceEffect"
						}
					},
					"UsrMCITAddOnDS_UsrResourceEffect_xkss95r_List": {
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
					"UsrMCITAddOnDS_UsrActive_rtfq9zq": {
						"modelConfig": {
							"path": "UsrMCITAddOnDS.UsrActive"
						}
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
					"PDS_UsrCode": {
						"modelConfig": {
							"path": "PDS.UsrCode"
						}
					},
					"PDS_UsrName": {
						"modelConfig": {
							"path": "PDS.UsrName"
						}
					},
					"PDS_UsrUnit": {
						"modelConfig": {
							"path": "PDS.UsrUnit"
						}
					},
					"PDS_UsrMaxQuantity": {
						"modelConfig": {
							"path": "PDS.UsrMaxQuantity"
						}
					},
					"PDS_UsrMinQuantity": {
						"modelConfig": {
							"path": "PDS.UsrMinQuantity"
						}
					},
					"PDS_UsrIncrement": {
						"modelConfig": {
							"path": "PDS.UsrIncrement"
						}
					},
					"PDS_UsrUnitPrice": {
						"modelConfig": {
							"path": "PDS.UsrUnitPrice"
						}
					},
					"PDS_UsrResourceEffect": {
						"modelConfig": {
							"path": "PDS.UsrResourceEffect"
						}
					},
					"PDS_UsrActive": {
						"modelConfig": {
							"path": "PDS.UsrActive"
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
							"columnName": "UsrName"
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
				"operation": "merge",
				"path": [],
				"values": {
					"primaryDataSourceName": "UsrMCITAddOnDS"
				}
			},
			{
				"operation": "merge",
				"path": [
					"dataSources"
				],
				"values": {
					"UsrMCITAddOnDS": {
						"type": "crt.EntityDataSource",
						"scope": "page",
						"config": {
							"entitySchemaName": "UsrMCITAddOn",
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
			},
			{
				"operation": "merge",
				"path": [
					"dataSources",
					"PDS",
					"config"
				],
				"values": {
					"entitySchemaName": "UsrMCITAddOn",
					"attributes": {
						"UsrCode": {
							"path": "UsrCode"
						},
						"UsrName": {
							"path": "UsrName"
						},
						"UsrUnit": {
							"path": "UsrUnit"
						},
						"UsrMaxQuantity": {
							"path": "UsrMaxQuantity"
						},
						"UsrMinQuantity": {
							"path": "UsrMinQuantity"
						},
						"UsrIncrement": {
							"path": "UsrIncrement"
						},
						"UsrUnitPrice": {
							"path": "UsrUnitPrice"
						},
						"UsrResourceEffect": {
							"path": "UsrResourceEffect"
						},
						"UsrActive": {
							"path": "UsrActive"
						}
					}
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[
        {
            request: "usr.AddOn_OpenAdd",
            handler: async (request) => {
                const ctx = request.$context;
                // The form retains Designer-generated object bindings.
                ctx.UsrAddOn_EditorVisible = false;
                ctx.UsrAddOn_EditorRecordId = null;
                ctx.UsrAddOn_EditorMode = "none";
                ctx.UsrMCITAddOnDS_UsrCode_fs72rg2 = "";
                ctx.UsrMCITAddOnDS_UsrName_6mh994e = "";
                ctx.UsrMCITAddOnDS_UsrArabicName_6k8pwy0 = "";
                ctx.UsrMCITAddOnDS_UsrDescription_aekxdcd = "";
                ctx.UsrMCITAddOnDS_UsrUnit_7ahy72e = "GB";
                ctx.UsrMCITAddOnDS_UsrUnitPrice_49d234b = 0;
                ctx.UsrMCITAddOnDS_UsrMinQuantity_2chyqsx = 0;
                ctx.UsrMCITAddOnDS_UsrMaxQuantity_jf00fsa = 100;
                ctx.UsrMCITAddOnDS_UsrIncrement_nc3diox = 1;
                ctx.UsrMCITAddOnDS_UsrResourceEffect_xkss95r = null;
                ctx.UsrMCITAddOnDS_UsrActive_rtfq9zq = true;
                ctx.UsrAddOn_EditorMessage = "";
                ctx.UsrAddOn_MessageVisible = false;
                ctx.UsrAddOn_EditorTitle = "New Add-on";
                ctx.UsrAddOn_EditorMode = "add";
                ctx.UsrAddOn_EditorVisible = true;
            }
        },
        {
            request: "usr.AddOn_Cancel",
            handler: async (request) => {
                const ctx = request.$context;
                ctx.UsrAddOn_EditorVisible = false;
                ctx.UsrAddOn_EditorMode = "none";
                ctx.UsrAddOn_EditorRecordId = null;
                ctx.UsrAddOn_EditorMessage = "";
                ctx.UsrAddOn_MessageVisible = false;
            }
        },
        {
            request: "usr.AddOn_OpenRow",
            handler: async (request) => {
                const ctx = request.$context;
                const raw = await request.recordId;
                const id = typeof raw === "string" ? raw : (raw?.value ?? raw?.Id ?? raw?.id);
                const valid = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id || "");
                try {
                    if (!valid) throw new Error("The row did not supply a valid Add-on ID.");
                    const model = await sdk.Model.create("UsrMCITAddOn");
                    const rows = await model.load({
                        attributes: ["Id", "UsrCode", "UsrName", "UsrArabicName", "UsrDescription", "UsrUnit", "UsrUnitPrice", "UsrMinQuantity", "UsrMaxQuantity", "UsrIncrement", "UsrResourceEffect", "UsrActive"],
                        parameters: [{type: sdk.ModelParameterType.PrimaryColumnValue, value: id}]
                    });
                    if (!Array.isArray(rows) || rows.length !== 1) throw new Error("Could not load the selected Add-on.");
                    const r = rows[0];
                    ctx.UsrAddOn_EditorVisible = false;
                    ctx.UsrMCITAddOnDS_UsrCode_fs72rg2 = r.UsrCode ?? "";
                    ctx.UsrMCITAddOnDS_UsrName_6mh994e = r.UsrName ?? "";
                    ctx.UsrMCITAddOnDS_UsrArabicName_6k8pwy0 = r.UsrArabicName ?? "";
                    ctx.UsrMCITAddOnDS_UsrDescription_aekxdcd = r.UsrDescription ?? "";
                    ctx.UsrMCITAddOnDS_UsrUnit_7ahy72e = r.UsrUnit ?? "";
                    ctx.UsrMCITAddOnDS_UsrUnitPrice_49d234b = r.UsrUnitPrice ?? null;
                    ctx.UsrMCITAddOnDS_UsrMinQuantity_2chyqsx = r.UsrMinQuantity ?? null;
                    ctx.UsrMCITAddOnDS_UsrMaxQuantity_jf00fsa = r.UsrMaxQuantity ?? null;
                    ctx.UsrMCITAddOnDS_UsrIncrement_nc3diox = r.UsrIncrement ?? null;
                    ctx.UsrMCITAddOnDS_UsrResourceEffect_xkss95r = r.UsrResourceEffect ?? null;
                    ctx.UsrMCITAddOnDS_UsrActive_rtfq9zq = Boolean(r.UsrActive);
                    ctx.UsrAddOn_EditorMode = "edit";
                    ctx.UsrAddOn_EditorRecordId = id;
                    ctx.UsrAddOn_EditorTitle = "Edit " + (r.UsrName || "Add-on");
                    ctx.UsrAddOn_EditorMessage = "";
                    ctx.UsrAddOn_MessageVisible = false;
                    ctx.UsrAddOn_EditorVisible = true;
                } catch (err) {
                    console.error("[MCIT Add-on] Edit failed", err);
                    ctx.UsrAddOn_EditorMessage = err?.message || "Could not edit the Add-on.";
                    ctx.UsrAddOn_MessageVisible = true;
                    ctx.UsrAddOn_EditorVisible = true;
                }
            }
        },
        {
            request: "usr.AddOn_Save",
            handler: async (request) => {
                const ctx = request.$context;
                if (await ctx.UsrAddOn_SaveBusy) return;
                ctx.UsrAddOn_SaveBusy = true;
                ctx.UsrAddOn_EditorMessage = "";
                ctx.UsrAddOn_MessageVisible = false;
                const get = async (attribute) => await ctx[attribute];
                const asText = async (attribute) => String((await get(attribute)) ?? "").trim();
                const asNumber = async (attribute, label) => {
                    const raw = await get(attribute);
                    if (raw === null || raw === undefined || raw === "") return null;
                    const value = Number(raw);
                    if (!Number.isFinite(value)) throw new Error(label + " must be numeric.");
                    return value;
                };
                try {
                    const mode = await get("UsrAddOn_EditorMode");
                    if (mode !== "add" && mode !== "edit") throw new Error("Use Add Add-on or Edit first.");
                    const code = await asText("UsrMCITAddOnDS_UsrCode_fs72rg2");
                    const name = await asText("UsrMCITAddOnDS_UsrName_6mh994e");
                    const unit = await asText("UsrMCITAddOnDS_UsrUnit_7ahy72e");
                    if (!code || !name || !unit) throw new Error("Code, English Name and Unit are required.");
                    const price = await asNumber("UsrMCITAddOnDS_UsrUnitPrice_49d234b", "Unit Price");
                    const min = await asNumber("UsrMCITAddOnDS_UsrMinQuantity_2chyqsx", "Minimum Quantity");
                    const max = await asNumber("UsrMCITAddOnDS_UsrMaxQuantity_jf00fsa", "Maximum Quantity");
                    const inc = await asNumber("UsrMCITAddOnDS_UsrIncrement_nc3diox", "Increment");
                    if (price !== null && price < 0) throw new Error("Unit Price cannot be negative.");
                    if (min !== null && max !== null && min > max) throw new Error("Minimum Quantity cannot exceed Maximum Quantity.");
                    const effect = await get("UsrMCITAddOnDS_UsrResourceEffect_xkss95r");
                    const effectId = effect && typeof effect === "object" ? (effect.value ?? effect.Id ?? effect.id) : effect;
                    const dto = {
                        UsrCode: code,
                        UsrName: name,
                        UsrArabicName: await asText("UsrMCITAddOnDS_UsrArabicName_6k8pwy0"),
                        UsrDescription: await asText("UsrMCITAddOnDS_UsrDescription_aekxdcd"),
                        UsrUnit: unit,
                        UsrUnitPrice: price,
                        UsrMinQuantity: min,
                        UsrMaxQuantity: max,
                        UsrIncrement: inc,
                        UsrResourceEffect: effectId ? {value: effectId} : null,
                        UsrActive: Boolean(await get("UsrMCITAddOnDS_UsrActive_rtfq9zq"))
                    };
                    const model = await sdk.Model.create("UsrMCITAddOn");
                    if (mode === "add") {
                        const result = await model.insert(dto);
                        if (!result?.success) throw new Error("Creatio rejected the new Add-on. Inspect the Console/Network response.");
                        const id = result.primaryAttributes?.[0]?.Id ?? result.primaryAttributes?.Id ?? result.Id;
                        if (!id) {
                            ctx.UsrAddOn_EditorMode = "none";
                            throw new Error("Save may have succeeded, but no ID was returned. Check the list before retrying.");
                        }
                    } else {
                        const id = await get("UsrAddOn_EditorRecordId");
                        if (!id) throw new Error("No Add-on selected for editing.");
                        const result = await model.update(dto,[{type: sdk.ModelParameterType.PrimaryColumnValue,value: id}]);
                        if (!result?.success || result.rowsAffected === 0) throw new Error("Creatio rejected the Add-on update.");
                    }
                    ctx.UsrAddOn_EditorVisible = false;
                    ctx.UsrAddOn_EditorMode = "none";
                    ctx.UsrAddOn_EditorRecordId = null;
                    try {
                        await sdk.HandlerChainService.instance.process({
                            type: "crt.LoadDataRequest", dataSourceName: "PDS", config: {loadType: "reload"},
                            $context: ctx, scopes: request.scopes || []
                        });
                    } catch (refreshError) {
                        console.warn("[MCIT Add-on] Saved; refresh list manually if needed.", refreshError);
                    }
                } catch (err) {
                    console.error("[MCIT Add-on] Save failed", err);
                    ctx.UsrAddOn_EditorMessage = err?.message || "Could not save Add-on.";
                    ctx.UsrAddOn_MessageVisible = true;
                } finally {
                    ctx.UsrAddOn_SaveBusy = false;
                }
            }
        }
]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});