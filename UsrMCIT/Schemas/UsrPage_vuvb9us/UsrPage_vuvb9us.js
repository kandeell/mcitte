define("UsrPage_vuvb9us", /**SCHEMA_DEPS*/["css!UsrRubikFontCSS"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "PageTitle",
				"values": {
					"caption": "Point Configuration Version",
					"visible": true
				}
			},
			{
				"operation": "merge",
				"name": "SaveButton",
				"values": {
					"size": "large",
					"iconPosition": "only-text"
				}
			},
			{
				"operation": "merge",
				"name": "CardContentWrapper",
				"values": {
					"padding": {
						"left": "none",
						"right": "none",
						"top": "none",
						"bottom": "none"
					},
					"visible": true,
					"color": "transparent",
					"borderRadius": "none",
					"alignItems": "stretch"
				}
			},
			{
				"operation": "remove",
				"name": "SideContainer"
			},
			{
				"operation": "remove",
				"name": "SideAreaProfileContainer"
			},
			{
				"operation": "merge",
				"name": "CenterContainer",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 2,
						"rowSpan": 1
					},
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
					"justifyContent": "center",
					"gap": "small"
				}
			},
			{
				"operation": "merge",
				"name": "Tabs",
				"values": {
					"styleType": "default",
					"mode": "tab",
					"bodyBackgroundColor": "#F8FAFC",
					"selectedTabTitleColor": "#5B21A5",
					"tabTitleColor": "#7848ED",
					"underlineSelectedTabColor": "crt-color-violet",
					"headerBackgroundColor": "primary",
					"allowToggleClose": false,
					"visible": true,
					"stretch": true
				}
			},
			{
				"operation": "merge",
				"name": "GeneralInfoTab",
				"values": {
					"caption": "Version Info",
					"iconPosition": "only-text"
				}
			},
			{
				"operation": "remove",
				"name": "GeneralInfoTabContainer"
			},
			{
				"operation": "insert",
				"name": "EntityStageProgressBar_rdgenhg",
				"values": {
					"type": "crt.EntityStageProgressBar",
					"saveOnChange": false,
					"askUserToChangeSchema": true,
					"entityName": "UsrContractConfigVersion"
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITSourceVersionTab",
				"values": {
					"type": "crt.TabContainer",
					"caption": "Source Version",
					"iconPosition": "only-text",
					"visible": true,
					"items": []
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITSourceVersionCard",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "medium",
						"rowGap": "medium"
					},
					"items": [],
					"fitContent": true,
					"visible": true,
					"alignItems": "stretch",
					"color": "primary",
					"borderRadius": "small",
					"padding": {
						"top": "none",
						"bottom": "none",
						"left": "none",
						"right": "none"
					}
				},
				"parentName": "MCITSourceVersionTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITSourceVersionHeading",
				"values": {
					"type": "crt.Label",
					"caption": "Select Source Version",
					"labelType": "headline-3",
					"labelColor": "#5B21A5",
					"labelEllipsis": false,
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 3,
						"rowSpan": 1
					}
				},
				"parentName": "MCITSourceVersionCard",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITSourceVersionDescription",
				"values": {
					"type": "crt.Label",
					"caption": "Choose the contract and starting point for your configuration version.",
					"labelEllipsis": false,
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 3,
						"rowSpan": 1
					}
				},
				"parentName": "MCITSourceVersionCard",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MCITSourceContractLookup",
				"values": {
					"type": "crt.ComboBox",
					"label": "Contract",
					"control": "$MCITContract",
					"labelPosition": "auto",
					"isAddAllowed": false,
					"showValueAsLink": true,
					"controlActions": [],
					"listActions": [],
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 3,
						"rowSpan": 1
					}
				},
				"parentName": "MCITSourceVersionCard",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "MCITSourceSelectionLabel",
				"values": {
					"type": "crt.Label",
					"caption": "$MCITSourceSelectionText",
					"labelColor": "#5B21A5",
					"labelEllipsis": false,
					"layoutConfig": {
						"column": 1,
						"row": 4,
						"colSpan": 3,
						"rowSpan": 1
					}
				},
				"parentName": "MCITSourceVersionCard",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "ComboBox_8cym68i",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 2,
						"row": 5,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrContractConfigVersionDS_UsrPreviousVersion_vc9noy1",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "auto",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$UsrContractConfigVersionDS_UsrPreviousVersion_vc9noy1",
					"visible": true,
					"readonly": false,
					"placeholder": ""
				},
				"parentName": "MCITSourceVersionCard",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "FlexContainer_cqfu2pd",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true
				},
				"parentName": "MCITSourceVersionTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_t0ijr5q",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "none",
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
						"bottom": "none",
						"right": "none",
						"left": "none"
					}
				},
				"parentName": "FlexContainer_cqfu2pd",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITVersionHistoryCard",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "medium",
						"rowGap": "medium"
					},
					"items": [],
					"fitContent": true,
					"visible": "$MCITHasContract",
					"color": "primary",
					"borderRadius": "medium",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"left": "medium",
						"right": "medium"
					},
					"alignItems": "stretch"
				},
				"parentName": "MCITSourceVersionTab",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "MCITVersionHistoryHeading",
				"values": {
					"type": "crt.Label",
					"caption": "Configuration Version History",
					"labelType": "headline-3",
					"labelColor": "#5B21A5",
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITVersionHistoryCard",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITVersionHistoryGrid",
				"values": {
					"type": "crt.DataGrid",
					"items": "$MCITVersionHistory",
					"primaryColumnName": "MCITHistory_Id",
					"fitContent": true,
					"visible": true,
					"placeholder": false,
					"features": {
						"rows": {
							"selection": {
								"enable": false,
								"multiple": false
							}
						}
					},
					"columns": [
						{
							"id": "f0778221-6aa5-40dc-8bdd-c5402db10001",
							"code": "MCITHistory_Version",
							"caption": "Version",
							"dataValueType": 1
						},
						{
							"id": "f0778221-6aa5-40dc-8bdd-c5402db10002",
							"code": "MCITHistory_Status",
							"caption": "Status",
							"dataValueType": 10
						},
						{
							"id": "f0778221-6aa5-40dc-8bdd-c5402db10003",
							"code": "MCITHistory_CPU",
							"caption": "CPU / point",
							"dataValueType": 4
						},
						{
							"id": "f0778221-6aa5-40dc-8bdd-c5402db10004",
							"code": "MCITHistory_RAM",
							"caption": "RAM / point (GB)",
							"dataValueType": 5
						},
						{
							"id": "f0778221-6aa5-40dc-8bdd-c5402db10005",
							"code": "MCITHistory_Storage",
							"caption": "Storage / point (GB)",
							"dataValueType": 5
						},
						{
							"id": "f0778221-6aa5-40dc-8bdd-c5402db10006",
							"code": "MCITHistory_Min",
							"caption": "Min points",
							"dataValueType": 5
						},
						{
							"id": "f0778221-6aa5-40dc-8bdd-c5402db10007",
							"code": "MCITHistory_Max",
							"caption": "Max points",
							"dataValueType": 5
						},
						{
							"id": "f0778221-6aa5-40dc-8bdd-c5402db10008",
							"code": "MCITHistory_From",
							"caption": "Effective from",
							"dataValueType": 7
						},
						{
							"id": "f0778221-6aa5-40dc-8bdd-c5402db10009",
							"code": "MCITHistory_To",
							"caption": "Effective to",
							"dataValueType": 8
						}
					],
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITVersionHistoryCard",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_w4j10r4",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "large",
						"rowGap": "small"
					},
					"items": [],
					"fitContent": true,
					"color": "primary",
					"borderRadius": "medium",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"left": "medium",
						"right": "medium"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_j5yech7",
				"values": {
					"type": "crt.Label",
					"caption": "Version Information",
					"labelType": "headline-3",
					"labelColor": "#5B21A5",
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 2,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_w4j10r4",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITContractLookup",
				"values": {
					"type": "crt.ComboBox",
					"label": "Contract",
					"control": "$MCITContract",
					"labelPosition": "auto",
					"isAddAllowed": false,
					"showValueAsLink": true,
					"controlActions": [],
					"listActions": [],
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_w4j10r4",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Input_cxnqg1m",
				"values": {
					"type": "crt.Input",
					"label": "Version number",
					"control": "$UsrContractConfigVersionDS_UsrVersionNumber_ndeqbyk",
					"labelPosition": "auto",
					"multiline": false,
					"layoutConfig": {
						"column": 2,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_w4j10r4",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "MCITConfigurationNameInput",
				"values": {
					"type": "crt.Input",
					"label": "Configuration name",
					"control": "$MCITConfigurationName",
					"labelPosition": "auto",
					"multiline": false,
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_w4j10r4",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "ComboBox_nqqobk0",
				"values": {
					"type": "crt.ComboBox",
					"label": "Status",
					"control": "$UsrContractConfigVersionDS_UsrConfigVersionStatus_fhrzbc7",
					"labelPosition": "auto",
					"isAddAllowed": false,
					"showValueAsLink": false,
					"controlActions": [],
					"listActions": [],
					"readonly": true,
					"layoutConfig": {
						"column": 2,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_w4j10r4",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "ComboBox_l33i8y3",
				"values": {
					"type": "crt.ComboBox",
					"label": "Created by",
					"control": "$UsrContractConfigVersionDS_CreatedBy_pqf4m7v",
					"labelPosition": "auto",
					"isAddAllowed": false,
					"showValueAsLink": false,
					"controlActions": [],
					"listActions": [],
					"readonly": true,
					"layoutConfig": {
						"column": 1,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_w4j10r4",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "DateTimePicker_tpty8yg",
				"values": {
					"type": "crt.DateTimePicker",
					"label": "Created on",
					"control": "$UsrContractConfigVersionDS_CreatedOn_rh8nsl6",
					"readonly": true,
					"labelPosition": "auto",
					"pickerType": "datetime",
					"layoutConfig": {
						"column": 2,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_w4j10r4",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "ComboBox_l99r9wu",
				"values": {
					"type": "crt.ComboBox",
					"label": "Activated by",
					"control": "$UsrContractConfigVersionDS_UsrActivatedBy_38pd350",
					"labelPosition": "auto",
					"isAddAllowed": false,
					"showValueAsLink": false,
					"controlActions": [],
					"listActions": [],
					"readonly": true,
					"layoutConfig": {
						"column": 1,
						"row": 5,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_w4j10r4",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "DateTimePicker_rohbm82",
				"values": {
					"type": "crt.DateTimePicker",
					"label": "Activated on",
					"control": "$UsrContractConfigVersionDS_UsrActivatedOn_u7b6x7t",
					"readonly": true,
					"labelPosition": "auto",
					"pickerType": "datetime",
					"layoutConfig": {
						"column": 2,
						"row": 5,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_w4j10r4",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "GridContainer_w2cta6y",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "large",
						"rowGap": "small"
					},
					"items": [],
					"fitContent": true,
					"color": "primary",
					"borderRadius": "medium",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"left": "medium",
						"right": "medium"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Label_gx64vla",
				"values": {
					"type": "crt.Label",
					"caption": "Effective Period",
					"labelType": "headline-3",
					"labelColor": "#5B21A5",
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 2,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_w2cta6y",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "DateTimePicker_8gl0ljd",
				"values": {
					"type": "crt.DateTimePicker",
					"label": "Effective from",
					"control": "$UsrContractConfigVersionDS_UsrEffectiveFrom_7t2k5y9",
					"labelPosition": "auto",
					"pickerType": "datetime",
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_w2cta6y",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "DateTimePicker_4bh5kzn",
				"values": {
					"type": "crt.DateTimePicker",
					"label": "Effective to",
					"control": "$UsrContractConfigVersionDS_UsrEffectiveTo_md9iqx2",
					"labelPosition": "auto",
					"pickerType": "date",
					"tooltip": "Leave empty for an open-ended version.",
					"layoutConfig": {
						"column": 2,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_w2cta6y",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridContainer_c1p5w4z",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "medium",
						"rowGap": "small"
					},
					"items": [],
					"fitContent": true,
					"color": "primary",
					"borderRadius": "medium",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"left": "medium",
						"right": "medium"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Label_st4qdfg",
				"values": {
					"type": "crt.Label",
					"caption": "Change Summary and Notes",
					"labelType": "headline-3",
					"labelColor": "#5B21A5",
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_c1p5w4z",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Input_uqm2orw",
				"values": {
					"type": "crt.Input",
					"label": "Change summary",
					"control": "$UsrContractConfigVersionDS_UsrChangeReason_2jb1l75",
					"placeholder": "Describe the changes in this version.",
					"multiline": true,
					"labelPosition": "auto",
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_c1p5w4z",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Input_yctlx5r",
				"values": {
					"type": "crt.Input",
					"label": "Notes",
					"control": "$UsrContractConfigVersionDS_UsrNotes_kss2rvd",
					"placeholder": "Additional notes.",
					"multiline": true,
					"labelPosition": "auto",
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_c1p5w4z",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "TabContainer_kntw6lq",
				"values": {
					"type": "crt.TabContainer",
					"caption": "Resources",
					"iconPosition": "only-text",
					"items": []
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridContainer_avlzoie",
				"values": {
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
					"color": "primary",
					"borderRadius": "medium",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"left": "medium",
						"right": "medium"
					}
				},
				"parentName": "TabContainer_kntw6lq",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_jqf5taj",
				"values": {
					"type": "crt.Label",
					"caption": "Resource Entitlements and Point Limits",
					"labelType": "headline-3",
					"labelColor": "#5B21A5",
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 2,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_avlzoie",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NumberInput_6w9ommr",
				"values": {
					"type": "crt.NumberInput",
					"label": "CPU per point",
					"control": "$UsrContractConfigVersionDS_UsrCPUPerPoint_fnquwsg",
					"labelPosition": "auto",
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_avlzoie",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "NumberInput_q5t104y",
				"values": {
					"type": "crt.NumberInput",
					"label": "Minimum points per VM",
					"control": "$UsrContractConfigVersionDS_UsrMinPointsPerVM_yb1zcgq",
					"labelPosition": "auto",
					"layoutConfig": {
						"column": 2,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_avlzoie",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "NumberInput_78kbnyg",
				"values": {
					"type": "crt.NumberInput",
					"label": "RAM per point (GB)",
					"control": "$UsrContractConfigVersionDS_UsrRAMGBPerPoint_65xsxxo",
					"labelPosition": "auto",
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_avlzoie",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "NumberInput_j42d6ox",
				"values": {
					"type": "crt.NumberInput",
					"label": "Maximum points per VM",
					"control": "$UsrContractConfigVersionDS_UsrMaxPointsPerVM_2sfp1nd",
					"labelPosition": "auto",
					"layoutConfig": {
						"column": 2,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_avlzoie",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "NumberInput_k68cbjb",
				"values": {
					"type": "crt.NumberInput",
					"label": "Storage per point (GB)",
					"control": "$UsrContractConfigVersionDS_UsrStorageGBPerPoint_kwc3q6q",
					"labelPosition": "auto",
					"layoutConfig": {
						"column": 1,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_avlzoie",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "NumberInput_znkgcfd",
				"values": {
					"type": "crt.NumberInput",
					"label": "Point increment",
					"control": "$UsrContractConfigVersionDS_UsrPointIncrement_cbuf8ka",
					"labelPosition": "auto",
					"layoutConfig": {
						"column": 2,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_avlzoie",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "TabContainer_onmyly9",
				"values": {
					"type": "crt.TabContainer",
					"caption": "Add-on Rates",
					"iconPosition": "only-text",
					"items": []
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_ewqysfs",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "medium",
						"rowGap": "medium"
					},
					"items": [],
					"fitContent": true,
					"color": "primary",
					"borderRadius": "medium",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"left": "medium",
						"right": "medium"
					},
					"visible": true,
					"alignItems": "stretch"
				},
				"parentName": "TabContainer_onmyly9",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_qgyhb32",
				"values": {
					"type": "crt.Label",
					"caption": "Optional Add-on Financial Rates",
					"labelType": "headline-3",
					"labelColor": "#5B21A5",
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_ewqysfs",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "DataGrid_wskxcup",
				"values": {
					"type": "crt.DataGrid",
					"items": "$DataGrid_wskxcup",
					"primaryColumnName": "DataGrid_wskxcupDS_Id",
					"visible": true,
					"fitContent": true,
					"placeholder": false,
					"features": {
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						}
					},
					"columns": [
						{
							"id": "90721679-373b-9963-c743-1210cef1d012",
							"code": "DataGrid_wskxcupDS_UsrName",
							"caption": "Rate name",
							"dataValueType": 28
						},
						{
							"id": "30361e42-a5dd-195d-21e4-5aed249bd0b0",
							"code": "DataGrid_wskxcupDS_UsrResourceType",
							"caption": "Resource type",
							"dataValueType": 10
						},
						{
							"id": "311d3bb5-1c71-7d2b-2eb8-4cb4edabed1f",
							"code": "DataGrid_wskxcupDS_UsrAmountPerUnit",
							"caption": "Amount per unit",
							"dataValueType": 31
						},
						{
							"id": "9b6f94ad-e485-2651-68d5-3f2d48c48428",
							"code": "DataGrid_wskxcupDS_UsrCurrency",
							"caption": "Currency",
							"dataValueType": 10
						},
						{
							"id": "ac47ef82-8045-4707-a6bc-eeb89a6a911f",
							"code": "DataGrid_wskxcupDS_UsrPricingUnitLookup",
							"caption": "Pricing unit",
							"dataValueType": 10
						}
					],
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_ewqysfs",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "ExpansionPanel_5dphlae",
				"values": {
					"type": "crt.ExpansionPanel",
					"tools": [],
					"items": [],
					"title": "#ResourceString(ExpansionPanel_5dphlae_title)#",
					"toggleType": "material",
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
				"parentName": "TabContainer_onmyly9",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_q72ydfb",
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
				"parentName": "ExpansionPanel_5dphlae",
				"propertyName": "tools",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_y683jvq",
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
				"parentName": "GridContainer_q72ydfb",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailAddBtn_sq24o0x",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailAddBtn_sq24o0x_caption)#",
					"icon": "add-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.CreateRecordRequest",
						"params": {
							"entityName": "UsrConfigResourceRate"
						}
					}
				},
				"parentName": "FlexContainer_y683jvq",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailRefreshBtn_pg4ckll",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailRefreshBtn_pg4ckll_caption)#",
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
							"dataSourceName": "GridDetail_33vgql3DS"
						}
					}
				},
				"parentName": "FlexContainer_y683jvq",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSettingsBtn_dcby4k8",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailSettingsBtn_dcby4k8_caption)#",
					"icon": "actions-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clickMode": "menu",
					"menuItems": []
				},
				"parentName": "FlexContainer_y683jvq",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridDetailExportDataBtn_isppakh",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailExportDataBtn_isppakh_caption)#",
					"icon": "export-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "GridDetail_33vgql3"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_dcby4k8",
				"propertyName": "menuItems",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailImportDataBtn_chflxcd",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailImportDataBtn_chflxcd_caption)#",
					"icon": "import-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "UsrConfigResourceRate"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_dcby4k8",
				"propertyName": "menuItems",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSearchFilter_jqfctem",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "#ResourceString(GridDetailSearchFilter_jqfctem_placeholder)#",
					"iconOnly": true,
					"_filterOptions": {
						"expose": [
							{
								"attribute": "GridDetailSearchFilter_jqfctem_GridDetail_33vgql3",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"GridDetail_33vgql3"
										]
									}
								]
							}
						],
						"from": [
							"GridDetailSearchFilter_jqfctem_SearchValue",
							"GridDetailSearchFilter_jqfctem_FilteredColumnsGroups"
						]
					}
				},
				"parentName": "FlexContainer_y683jvq",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_y74ehnm",
				"values": {
					"type": "crt.GridContainer",
					"rows": "minmax(max-content, 32px)",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": null
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
				"parentName": "ExpansionPanel_5dphlae",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetail_33vgql3",
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
					"items": "$GridDetail_33vgql3",
					"primaryColumnName": "GridDetail_33vgql3DS_Id",
					"columns": [
						{
							"id": "f4a3eff8-d6fb-8cf9-bfd6-d504b00d84c2",
							"code": "GridDetail_33vgql3DS_UsrName",
							"caption": "#ResourceString(GridDetail_33vgql3DS_UsrName)#",
							"dataValueType": 28
						},
						{
							"id": "997856db-12dd-2ad8-7759-1226c8fe6c78",
							"code": "GridDetail_33vgql3DS_UsrCurrency",
							"caption": "#ResourceString(GridDetail_33vgql3DS_UsrCurrency)#",
							"dataValueType": 10
						},
						{
							"id": "1c4075ea-ca2a-8a65-42ee-cf423e56de2f",
							"code": "GridDetail_33vgql3DS_UsrConfigVersion",
							"caption": "#ResourceString(GridDetail_33vgql3DS_UsrConfigVersion)#",
							"dataValueType": 10
						},
						{
							"id": "f5eff769-06f0-a819-a8dd-59eaf27b706e",
							"code": "GridDetail_33vgql3DS_UsrPricingUnitLookup",
							"caption": "#ResourceString(GridDetail_33vgql3DS_UsrPricingUnitLookup)#",
							"dataValueType": 10
						},
						{
							"id": "4a62fb59-5bb3-0100-4754-a4aa34a7735a",
							"code": "GridDetail_33vgql3DS_UsrResourceType",
							"caption": "#ResourceString(GridDetail_33vgql3DS_UsrResourceType)#",
							"dataValueType": 10
						},
						{
							"id": "4e476382-2dd2-5491-9506-6d1ac8b8d8b9",
							"code": "GridDetail_33vgql3DS_UsrAmountPerUnit",
							"caption": "#ResourceString(GridDetail_33vgql3DS_UsrAmountPerUnit)#",
							"dataValueType": 31
						},
						{
							"id": "32c327a0-9c18-7f3b-187a-9de5ee2f28ab",
							"code": "GridDetail_33vgql3DS_UsrPointsPerUnit",
							"caption": "#ResourceString(GridDetail_33vgql3DS_UsrPointsPerUnit)#",
							"dataValueType": 31
						}
					],
					"placeholder": false
				},
				"parentName": "GridContainer_y74ehnm",
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
					"MCITSourceMode": {
						"value": ""
					},
					"MCITSourceSelectionText": {
						"value": "Select a starting option."
					},
					"MCITActiveChoiceColor": {
						"value": "default"
					},
					"MCITHistoryChoiceColor": {
						"value": "default"
					},
					"MCITEmptyChoiceColor": {
						"value": "default"
					},
					"MCITHasContract": {
						"value": false
					},
					"MCITContract": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.UsrContract"
						}
					},
					"MCITContract_List": {
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
					"MCITConfigurationName": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.UsrName"
						}
					},
					"UsrContractConfigVersionDS_UsrVersionNumber_ndeqbyk": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.UsrVersionNumber"
						}
					},
					"UsrContractConfigVersionDS_UsrConfigVersionStatus_fhrzbc7": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.UsrConfigVersionStatus"
						}
					},
					"UsrContractConfigVersionDS_CreatedBy_pqf4m7v": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.CreatedBy"
						}
					},
					"UsrContractConfigVersionDS_CreatedOn_rh8nsl6": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.CreatedOn"
						}
					},
					"UsrContractConfigVersionDS_UsrActivatedBy_38pd350": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.UsrActivatedBy"
						}
					},
					"UsrContractConfigVersionDS_UsrActivatedOn_u7b6x7t": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.UsrActivatedOn"
						}
					},
					"UsrContractConfigVersionDS_UsrEffectiveFrom_7t2k5y9": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.UsrEffectiveFrom"
						}
					},
					"UsrContractConfigVersionDS_UsrEffectiveTo_md9iqx2": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.UsrEffectiveTo"
						}
					},
					"UsrContractConfigVersionDS_UsrCPUPerPoint_fnquwsg": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.UsrCPUPerPoint"
						}
					},
					"UsrContractConfigVersionDS_UsrRAMGBPerPoint_65xsxxo": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.UsrRAMGBPerPoint"
						}
					},
					"UsrContractConfigVersionDS_UsrStorageGBPerPoint_kwc3q6q": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.UsrStorageGBPerPoint"
						}
					},
					"UsrContractConfigVersionDS_UsrMinPointsPerVM_yb1zcgq": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.UsrMinPointsPerVM"
						}
					},
					"UsrContractConfigVersionDS_UsrMaxPointsPerVM_2sfp1nd": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.UsrMaxPointsPerVM"
						}
					},
					"UsrContractConfigVersionDS_UsrPointIncrement_cbuf8ka": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.UsrPointIncrement"
						}
					},
					"UsrContractConfigVersionDS_UsrChangeReason_2jb1l75": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.UsrChangeReason"
						}
					},
					"UsrContractConfigVersionDS_UsrNotes_kss2rvd": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.UsrNotes"
						}
					},
					"MCITVersionHistory": {
						"isCollection": true,
						"modelConfig": {
							"path": "MCITVersionHistoryDS",
							"sortingConfig": {
								"default": [
									{
										"direction": "asc",
										"columnName": "UsrVersionNumber"
									}
								]
							}
						},
						"viewModelConfig": {
							"attributes": {
								"MCITHistory_Id": {
									"modelConfig": {
										"path": "MCITVersionHistoryDS.Id"
									}
								},
								"MCITHistory_Version": {
									"modelConfig": {
										"path": "MCITVersionHistoryDS.UsrVersionNumber"
									}
								},
								"MCITHistory_Status": {
									"modelConfig": {
										"path": "MCITVersionHistoryDS.UsrConfigVersionStatus"
									}
								},
								"MCITHistory_CPU": {
									"modelConfig": {
										"path": "MCITVersionHistoryDS.UsrCPUPerPoint"
									}
								},
								"MCITHistory_RAM": {
									"modelConfig": {
										"path": "MCITVersionHistoryDS.UsrRAMGBPerPoint"
									}
								},
								"MCITHistory_Storage": {
									"modelConfig": {
										"path": "MCITVersionHistoryDS.UsrStorageGBPerPoint"
									}
								},
								"MCITHistory_Min": {
									"modelConfig": {
										"path": "MCITVersionHistoryDS.UsrMinPointsPerVM"
									}
								},
								"MCITHistory_Max": {
									"modelConfig": {
										"path": "MCITVersionHistoryDS.UsrMaxPointsPerVM"
									}
								},
								"MCITHistory_From": {
									"modelConfig": {
										"path": "MCITVersionHistoryDS.UsrEffectiveFrom"
									}
								},
								"MCITHistory_To": {
									"modelConfig": {
										"path": "MCITVersionHistoryDS.UsrEffectiveTo"
									}
								}
							}
						}
					},
					"DataGrid_wskxcup": {
						"isCollection": true,
						"modelConfig": {
							"path": "DataGrid_wskxcupDS"
						},
						"viewModelConfig": {
							"attributes": {
								"DataGrid_wskxcupDS_Id": {
									"modelConfig": {
										"path": "DataGrid_wskxcupDS.Id"
									}
								},
								"DataGrid_wskxcupDS_UsrName": {
									"modelConfig": {
										"path": "DataGrid_wskxcupDS.UsrName"
									}
								},
								"DataGrid_wskxcupDS_UsrResourceType": {
									"modelConfig": {
										"path": "DataGrid_wskxcupDS.UsrResourceType"
									}
								},
								"DataGrid_wskxcupDS_UsrAmountPerUnit": {
									"modelConfig": {
										"path": "DataGrid_wskxcupDS.UsrAmountPerUnit"
									}
								},
								"DataGrid_wskxcupDS_UsrCurrency": {
									"modelConfig": {
										"path": "DataGrid_wskxcupDS.UsrCurrency"
									}
								},
								"DataGrid_wskxcupDS_UsrPricingUnitLookup": {
									"modelConfig": {
										"path": "DataGrid_wskxcupDS.UsrPricingUnitLookup"
									}
								},
								"DataGrid_wskxcupDS_UsrConfigVersion": {
									"modelConfig": {
										"path": "DataGrid_wskxcupDS.UsrConfigVersion"
									}
								}
							}
						}
					},
					"UsrContractConfigVersionDS_UsrPreviousVersion_vc9noy1": {
						"modelConfig": {
							"path": "UsrContractConfigVersionDS.UsrPreviousVersion"
						}
					},
					"UsrContractConfigVersionDS_UsrPreviousVersion_vc9noy1_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "Id",
										"direction": "asc"
									}
								]
							}
						}
					},
					"GridDetail_33vgql3": {
						"isCollection": true,
						"modelConfig": {
							"path": "GridDetail_33vgql3DS",
							"filterAttributes": [
								{
									"name": "GridDetailSearchFilter_jqfctem_GridDetail_33vgql3",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"GridDetail_33vgql3DS_UsrName": {
									"modelConfig": {
										"path": "GridDetail_33vgql3DS.UsrName"
									}
								},
								"GridDetail_33vgql3DS_UsrCurrency": {
									"modelConfig": {
										"path": "GridDetail_33vgql3DS.UsrCurrency"
									}
								},
								"GridDetail_33vgql3DS_UsrConfigVersion": {
									"modelConfig": {
										"path": "GridDetail_33vgql3DS.UsrConfigVersion"
									}
								},
								"GridDetail_33vgql3DS_UsrPricingUnitLookup": {
									"modelConfig": {
										"path": "GridDetail_33vgql3DS.UsrPricingUnitLookup"
									}
								},
								"GridDetail_33vgql3DS_UsrResourceType": {
									"modelConfig": {
										"path": "GridDetail_33vgql3DS.UsrResourceType"
									}
								},
								"GridDetail_33vgql3DS_UsrAmountPerUnit": {
									"modelConfig": {
										"path": "GridDetail_33vgql3DS.UsrAmountPerUnit"
									}
								},
								"GridDetail_33vgql3DS_UsrPointsPerUnit": {
									"modelConfig": {
										"path": "GridDetail_33vgql3DS.UsrPointsPerUnit"
									}
								},
								"GridDetail_33vgql3DS_Id": {
									"modelConfig": {
										"path": "GridDetail_33vgql3DS.Id"
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
					"primaryDataSourceName": "UsrContractConfigVersionDS",
					"dependencies": {
						"DataGrid_wskxcupDS": [
							{
								"attributePath": "UsrConfigVersion",
								"relationPath": "UsrContractConfigVersionDS.Id"
							}
						],
						"MCITVersionHistoryDS": [
							{
								"attributePath": "UsrContract",
								"relationPath": "UsrContractConfigVersionDS.UsrContract"
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
					"UsrContractConfigVersionDS": {
						"type": "crt.EntityDataSource",
						"scope": "page",
						"config": {
							"entitySchemaName": "UsrContractConfigVersion",
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
					"MCITVersionHistoryDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "UsrContractConfigVersion",
							"attributes": {
								"Id": {
									"path": "Id"
								},
								"UsrContract": {
									"path": "UsrContract"
								},
								"UsrVersionNumber": {
									"path": "UsrVersionNumber"
								},
								"UsrConfigVersionStatus": {
									"path": "UsrConfigVersionStatus"
								},
								"UsrCPUPerPoint": {
									"path": "UsrCPUPerPoint"
								},
								"UsrRAMGBPerPoint": {
									"path": "UsrRAMGBPerPoint"
								},
								"UsrStorageGBPerPoint": {
									"path": "UsrStorageGBPerPoint"
								},
								"UsrMinPointsPerVM": {
									"path": "UsrMinPointsPerVM"
								},
								"UsrMaxPointsPerVM": {
									"path": "UsrMaxPointsPerVM"
								},
								"UsrEffectiveFrom": {
									"path": "UsrEffectiveFrom"
								},
								"UsrEffectiveTo": {
									"path": "UsrEffectiveTo"
								},
								"CreatedOn": {
									"path": "CreatedOn"
								}
							}
						}
					},
					"DataGrid_wskxcupDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "UsrConfigResourceRate",
							"attributes": {
								"Id": {
									"path": "Id"
								},
								"UsrName": {
									"path": "UsrName"
								},
								"UsrResourceType": {
									"path": "UsrResourceType"
								},
								"UsrAmountPerUnit": {
									"path": "UsrAmountPerUnit"
								},
								"UsrCurrency": {
									"path": "UsrCurrency"
								},
								"UsrPricingUnitLookup": {
									"path": "UsrPricingUnitLookup"
								},
								"UsrConfigVersion": {
									"path": "UsrConfigVersion"
								}
							}
						}
					},
					"GridDetail_33vgql3DS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "UsrConfigResourceRate",
							"attributes": {
								"UsrName": {
									"path": "UsrName"
								},
								"UsrCurrency": {
									"path": "UsrCurrency"
								},
								"UsrConfigVersion": {
									"path": "UsrConfigVersion"
								},
								"UsrPricingUnitLookup": {
									"path": "UsrPricingUnitLookup"
								},
								"UsrResourceType": {
									"path": "UsrResourceType"
								},
								"UsrAmountPerUnit": {
									"path": "UsrAmountPerUnit"
								},
								"UsrPointsPerUnit": {
									"path": "UsrPointsPerUnit"
								}
							}
						}
					}
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[
				{
					request: "crt.HandleViewModelInitRequest",
					handler: async (request, next) => {
						const result = await next?.handle(request);
						const contract = await request.$context.MCITContract;

						request.$context.MCITHasContract = Boolean(
							contract && contract.value
						);

						return result;
					}
				},
				{
					request: "crt.HandleViewModelAttributeChangeRequest",
					handler: async (request, next) => {
						const result = await next?.handle(request);

						if (request.attributeName === "MCITContract") {
							const contract = await request.$context.MCITContract;

							request.$context.MCITHasContract = Boolean(
								contract && contract.value
							);

							request.$context.MCITSourceMode = "";
							request.$context.MCITActiveChoiceColor = "default";
							request.$context.MCITHistoryChoiceColor = "default";
							request.$context.MCITEmptyChoiceColor = "default";
							request.$context.MCITSourceSelectionText =
								"Select a starting option.";
						}

						return result;
					}
				},
				{
					request: "usr.SelectConfigurationSource",
					handler: async (request) => {
						const mode = request.sourceMode;
						const context = request.$context;

						context.MCITSourceMode = mode;
						context.MCITActiveChoiceColor =
							mode === "active" ? "accent" : "default";
						context.MCITHistoryChoiceColor =
							mode === "history" ? "accent" : "default";
						context.MCITEmptyChoiceColor =
							mode === "empty" ? "accent" : "default";

						const captions = {
							active: "Selected: Copy Current Active Version",
							history: "Selected: Copy Another Version",
							empty: "Selected: Start with Empty Configuration"
						};

						context.MCITSourceSelectionText =
							captions[mode] || "Select a starting option.";

						// UI selection only.
						// No records or field values are copied or cleared.
						// This choice is not persisted to the database.
					}
				}
			]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});