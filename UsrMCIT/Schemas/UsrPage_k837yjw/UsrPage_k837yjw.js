define("UsrPage_k837yjw", /**SCHEMA_DEPS*/["@creatio-devkit/common", "css!UsrMCITRoleEditorStyles"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "remove",
				"name": "MainHeader"
			},
			{
				"operation": "move",
				"name": "MainHeaderTop",
				"parentName": "FlexContainer_5pph8bx",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "BackButton",
				"values": {
					"caption": "#ResourceString(BackButton_caption)#",
					"size": "extra-large",
					"iconPosition": "left-icon",
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"clickMode": "default"
				}
			},
			{
				"operation": "move",
				"name": "BackButton",
				"parentName": "GridContainer_pf3f8m8",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "move",
				"name": "MainHeaderBottom",
				"parentName": "FlexContainer_5pph8bx",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "remove",
				"name": "CardToolsContainer"
			},
			{
				"operation": "remove",
				"name": "TagSelect"
			},
			{
				"operation": "remove",
				"name": "TopAreaProfileContainer"
			},
			{
				"operation": "merge",
				"name": "Tabs",
				"values": {
					"visible": true,
					"styleType": "partiallyColored",
					"mode": "tab",
					"bodyBackgroundColor": "transparent",
					"selectedTabTitleColor": "#5B21A5",
					"tabTitleColor": "#667085",
					"underlineSelectedTabColor": "#6D28D9",
					"headerBackgroundColor": "crt-color-primary-white",
					"stretch": true,
					"classes": [
						"usr-mcit-role-tabs"
					],
					"allowToggleClose": true
				}
			},
			{
				"operation": "merge",
				"name": "GeneralInfoTab",
				"values": {
					"caption": "ROLE INFORMATION",
					"iconPosition": "only-text",
					"classes": [
						"usr-mcit-role-info-tab"
					]
				}
			},
			{
				"operation": "merge",
				"name": "GridContainer_uxln7d4",
				"values": {
					"gap": {
						"columnGap": "large",
						"rowGap": "none"
					},
					"visible": true,
					"alignItems": "stretch",
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					},
					"color": "transparent",
					"borderRadius": "none",
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
				"name": "GridContainer_uxln7d4",
				"parentName": "GridContainer_yphet7j",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_pf3f8m8",
				"values": {
					"type": "crt.GridContainer",
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
					"borderRadius": "none",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"right": "medium",
						"left": "medium"
					}
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_f3cjmcs",
				"values": {
					"type": "crt.GridContainer",
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
					"color": "primary",
					"borderRadius": "medium",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"right": "medium",
						"left": "medium"
					}
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FlexContainer_5pph8bx",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true
				},
				"parentName": "GridContainer_f3cjmcs",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrMCITRoleHero",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"gap": "small",
					"classes": [
						"usr-mcit-role-overview"
					]
				},
				"parentName": "MainHeaderBottom",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrMCITRoleHeroDescription",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrMCITRoleDS_UsrDescription_ouy3rc1",
					"labelType": "body",
					"labelThickness": "default",
					"visible": true,
					"classes": [
						"usr-mcit-hero-description"
					]
				},
				"parentName": "UsrMCITRoleHero",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrMCITRoleHeroBadges",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"items": [],
					"gap": "small",
					"classes": [
						"usr-mcit-hero-badges"
					]
				},
				"parentName": "UsrMCITRoleHero",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrMCITRoleHeroCategory",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrMCITRoleCategoryLabel",
					"labelType": "body",
					"labelThickness": "default",
					"visible": true,
					"classes": [
						"usr-mcit-hero-category"
					]
				},
				"parentName": "UsrMCITRoleHeroBadges",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrMCITRoleHeroStatus",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrMCITRoleStatusLabel",
					"labelType": "body",
					"labelThickness": "default",
					"visible": true,
					"classes": [
						"usr-mcit-hero-status"
					]
				},
				"parentName": "UsrMCITRoleHeroBadges",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrMCITRoleActiveWarning",
				"values": {
					"type": "crt.Label",
					"caption": "Active role: changes require a new draft version.",
					"labelType": "body",
					"visible": "$UsrMCITIsActiveRole",
					"classes": [
						"usr-mcit-active-warning"
					]
				},
				"parentName": "UsrMCITRoleHero",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridContainer_yphet7j",
				"values": {
					"type": "crt.GridContainer",
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
					"color": "primary",
					"borderRadius": "medium",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"right": "medium",
						"left": "medium"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Input_36c94gc",
				"values": {
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrMCITRoleDS_UsrName_n9pu298",
					"control": "$UsrMCITRoleDS_UsrName_n9pu298",
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_yphet7j",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ComboBox_7704p0c",
				"values": {
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrMCITRoleDS_UsrRoleCategory_pvorvyc",
					"control": "$UsrMCITRoleDS_UsrRoleCategory_pvorvyc",
					"isAddAllowed": false,
					"showValueAsLink": true,
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"listActions": [],
					"controlActions": []
				},
				"parentName": "GridContainer_uxln7d4",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ListAction_1mfa21i",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "ComboBox.AddNewRecord",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_7704p0c",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ComboBox_73trk9x",
				"values": {
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrMCITRoleDS_UsrScopeBehavior_k2vuil1",
					"control": "$UsrMCITRoleDS_UsrScopeBehavior_k2vuil1",
					"isAddAllowed": false,
					"showValueAsLink": true,
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_uxln7d4",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Input_yg422ep",
				"values": {
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrMCITRoleDS_UsrDescription_ouy3rc1",
					"control": "$UsrMCITRoleDS_UsrDescription_ouy3rc1",
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 3,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_yphet7j",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridContainer_gxbrod6",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(64px,1fr)",
						"minmax(64px,1fr)"
					],
					"rows": "minmax(32px,max-content)",
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
					"alignItems": "stretch",
					"gap": {
						"columnGap": "large",
						"rowGap": "none"
					},
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 4,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_yphet7j",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "ComboBox_jdrqqpc",
				"values": {
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrMCITRoleDS_UsrMCITRoleStatuses_6o62qb3",
					"control": "$UsrMCITRoleDS_UsrMCITRoleStatuses_6o62qb3",
					"isAddAllowed": false,
					"showValueAsLink": true,
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"listActions": [],
					"controlActions": []
				},
				"parentName": "GridContainer_gxbrod6",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ListAction_9txzb86",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "ComboBox.AddNewRecord",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_jdrqqpc",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TabContainer_8h8i8hs",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "SCREEN PERMISSIONS",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrMCITScreenPanel",
				"values": {
					"type": "crt.ExpansionPanel",
					"title": "Screen Permissions",
					"expanded": true,
					"toggleType": "default",
					"items": [],
					"tools": [],
					"fitContent": false,
					"padding": {
						"top": "small",
						"bottom": "small",
						"left": "small",
						"right": "small"
					},
					"classes": [
						"usr-mcit-card"
					]
				},
				"parentName": "TabContainer_8h8i8hs",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrMCITScreenNote",
				"values": {
					"type": "crt.Label",
					"caption": "Read-only permission settings. Screen flags do not automatically grant Creatio data access.",
					"labelType": "body",
					"labelThickness": "default",
					"visible": true,
					"classes": [
						"usr-mcit-note"
					]
				},
				"parentName": "UsrMCITScreenPanel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "DataGrid_1yq715a",
				"values": {
					"type": "crt.DataGrid",
					"items": "$DataGrid_1yq715a",
					"primaryColumnName": "DataGrid_1yq715aDS_Id",
					"visible": true,
					"fitContent": true,
					"placeholder": false,
					"classes": [
						"usr-mcit-permissions-table"
					],
					"features": {
						"rows": {
							"selection": false,
							"numeration": false
						},
						"editable": {
							"enable": false,
							"itemsCreation": false,
							"floatingEditPanel": false
						},
						"header": {
							"visible": true
						},
						"columns": {
							"resizing": false,
							"dragAndDrop": false,
							"sorting": true
						}
					},
					"columns": [
						{
							"id": "82216997-f5e3-4567-89ab-000000000000",
							"code": "DataGrid_1yq715aDS_UsrScreen",
							"caption": "Screen",
							"dataValueType": 10,
							"width": 240
						},
						{
							"id": "81216804-f5e3-4567-89ab-000000000001",
							"code": "DataGrid_1yq715aDS_UsrCanView",
							"caption": "View",
							"dataValueType": 12,
							"width": 90
						},
						{
							"id": "84216cbd-f5e3-4567-89ab-000000000002",
							"code": "DataGrid_1yq715aDS_UsrCanCreate",
							"caption": "Create",
							"dataValueType": 12,
							"width": 90
						},
						{
							"id": "83216b2a-f5e3-4567-89ab-000000000003",
							"code": "DataGrid_1yq715aDS_UsrCanEdit",
							"caption": "Edit",
							"dataValueType": 12,
							"width": 90
						},
						{
							"id": "7e21634b-f5e3-4567-89ab-000000000004",
							"code": "DataGrid_1yq715aDS_UsrCanApprove",
							"caption": "Approve",
							"dataValueType": 12,
							"width": 110
						},
						{
							"id": "7d2161b8-f5e3-4567-89ab-000000000005",
							"code": "DataGrid_1yq715aDS_UsrCanAssign",
							"caption": "Assign",
							"dataValueType": 12,
							"width": 90
						},
						{
							"id": "80216671-f5e3-4567-89ab-000000000006",
							"code": "DataGrid_1yq715aDS_UsrCanExport",
							"caption": "Export",
							"dataValueType": 12,
							"width": 90
						},
						{
							"id": "7f2164de-f5e3-4567-89ab-000000000007",
							"code": "DataGrid_1yq715aDS_UsrCanConfigure",
							"caption": "Configure",
							"dataValueType": 12,
							"width": 110
						},
						{
							"id": "7a215cff-f5e3-4567-89ab-000000000008",
							"code": "DataGrid_1yq715aDS_UsrCanActivate",
							"caption": "Activate",
							"dataValueType": 12,
							"width": 110
						}
					]
				},
				"parentName": "UsrMCITScreenPanel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrDataScopeTab",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "DATA SCOPE RULES",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrDataScopePanel",
				"values": {
					"type": "crt.ExpansionPanel",
					"title": "Data Scope Rules",
					"expanded": true,
					"toggleType": "default",
					"items": [],
					"tools": [],
					"fitContent": false,
					"padding": {
						"top": "small",
						"bottom": "small",
						"left": "small",
						"right": "small"
					},
					"classes": [
						"usr-mcit-card"
					]
				},
				"parentName": "UsrDataScopeTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrScopeBanner",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"gap": "small",
					"items": [],
					"classes": [
						"usr-mcit-scope-banner"
					]
				},
				"parentName": "UsrDataScopePanel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrScopeBannerTitleLabel",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrScopeBannerTitle",
					"labelType": "body",
					"labelThickness": "default",
					"visible": true,
					"classes": [
						"usr-mcit-banner-title"
					]
				},
				"parentName": "UsrScopeBanner",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrScopeBannerDescriptionLabel",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrScopeBannerDescription",
					"labelType": "body",
					"labelThickness": "default",
					"visible": true,
					"classes": []
				},
				"parentName": "UsrScopeBanner",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrDataScopeGrid",
				"values": {
					"type": "crt.DataGrid",
					"items": "$UsrDataScopeGrid",
					"primaryColumnName": "UsrDataScopeGridDS_Id",
					"visible": true,
					"fitContent": true,
					"placeholder": false,
					"classes": [
						"usr-mcit-table"
					],
					"features": {
						"rows": {
							"selection": false,
							"numeration": false
						},
						"editable": {
							"enable": false,
							"itemsCreation": false,
							"floatingEditPanel": false
						},
						"header": {
							"visible": true
						},
						"columns": {
							"resizing": false,
							"dragAndDrop": false,
							"sorting": true
						}
					},
					"columns": [
						{
							"id": "2017b8c9-f5e3-4567-89ab-000000000000",
							"code": "UsrDataScopeGridDS_UsrScopeType",
							"caption": "Scope Type",
							"dataValueType": 28,
							"width": 230
						},
						{
							"id": "1f17b736-f5e3-4567-89ab-000000000001",
							"code": "UsrDataScopeGridDS_UsrAllowedValues",
							"caption": "Allowed Values",
							"dataValueType": 28,
							"width": 260
						},
						{
							"id": "1e17b5a3-f5e3-4567-89ab-000000000002",
							"code": "UsrDataScopeGridDS_UsrDescription",
							"caption": "Description",
							"dataValueType": 28,
							"width": 450
						}
					]
				},
				"parentName": "UsrDataScopePanel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TabContainer_w4rpe7i",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "QUEUE PERMISSIONS",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "UsrMCITQueuePanel",
				"values": {
					"type": "crt.ExpansionPanel",
					"title": "Queue Permissions",
					"expanded": true,
					"toggleType": "default",
					"items": [],
					"tools": [],
					"fitContent": false,
					"padding": {
						"top": "small",
						"bottom": "small",
						"left": "small",
						"right": "small"
					},
					"classes": [
						"usr-mcit-card"
					]
				},
				"parentName": "TabContainer_w4rpe7i",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "DataGrid_cjsl4aj",
				"values": {
					"type": "crt.DataGrid",
					"items": "$DataGrid_cjsl4aj",
					"primaryColumnName": "DataGrid_cjsl4ajDS_Id",
					"visible": true,
					"fitContent": true,
					"placeholder": false,
					"classes": [
						"usr-mcit-table"
					],
					"features": {
						"rows": {
							"selection": false,
							"numeration": false
						},
						"editable": {
							"enable": false,
							"itemsCreation": false,
							"floatingEditPanel": false
						},
						"header": {
							"visible": true
						},
						"columns": {
							"resizing": false,
							"dragAndDrop": false,
							"sorting": true
						}
					},
					"columns": [
						{
							"id": "8a097921-f5e3-4567-89ab-000000000000",
							"code": "DataGrid_cjsl4ajDS_UsrQueue",
							"caption": "Queue Name",
							"dataValueType": 10,
							"width": 260
						},
						{
							"id": "8909778e-f5e3-4567-89ab-000000000001",
							"code": "DataGrid_cjsl4ajDS_UsrQueue_UsrDescription",
							"caption": "Description",
							"dataValueType": 28,
							"width": 450
						},
						{
							"id": "880975fb-f5e3-4567-89ab-000000000002",
							"code": "DataGrid_cjsl4ajDS_UsrIsEnabled",
							"caption": "Access",
							"dataValueType": 12,
							"width": 115
						}
					]
				},
				"parentName": "UsrMCITQueuePanel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TabContainer_mdfdx0c",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "REPORTING PERMISSIONS",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "UsrMCITReportingPanel",
				"values": {
					"type": "crt.ExpansionPanel",
					"title": "Reporting Permissions",
					"expanded": true,
					"toggleType": "default",
					"items": [],
					"tools": [],
					"fitContent": false,
					"padding": {
						"top": "small",
						"bottom": "small",
						"left": "small",
						"right": "small"
					},
					"classes": [
						"usr-mcit-card"
					]
				},
				"parentName": "TabContainer_mdfdx0c",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrMCITReportingNote",
				"values": {
					"type": "crt.Label",
					"caption": "Preview only — reporting permissions are not connected to saved records yet.",
					"labelType": "body",
					"labelThickness": "default",
					"visible": true,
					"classes": [
						"usr-mcit-note"
					]
				},
				"parentName": "UsrMCITReportingPanel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrMCITReportingPreview",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(0,1fr)",
						"minmax(0,1fr)"
					],
					"rows": "auto",
					"items": [],
					"classes": [
						"usr-mcit-choices"
					]
				},
				"parentName": "UsrMCITReportingPanel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrMCITReportPreview1",
				"values": {
					"type": "crt.Label",
					"caption": "☐  Financial Reports",
					"labelType": "body",
					"labelThickness": "default",
					"visible": true,
					"classes": [
						"usr-mcit-readonly-permission"
					],
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrMCITReportingPreview",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrMCITReportPreview2",
				"values": {
					"type": "crt.Label",
					"caption": "☐  Technical Reports",
					"labelType": "body",
					"labelThickness": "default",
					"visible": true,
					"classes": [
						"usr-mcit-readonly-permission"
					],
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrMCITReportingPreview",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrMCITReportPreview3",
				"values": {
					"type": "crt.Label",
					"caption": "☐  VM Lifecycle Reports",
					"labelType": "body",
					"labelThickness": "default",
					"visible": true,
					"classes": [
						"usr-mcit-readonly-permission"
					],
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrMCITReportingPreview",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrMCITReportPreview4",
				"values": {
					"type": "crt.Label",
					"caption": "☐  Audit Reports",
					"labelType": "body",
					"labelThickness": "default",
					"visible": true,
					"classes": [
						"usr-mcit-readonly-permission"
					],
					"layoutConfig": {
						"column": 2,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrMCITReportingPreview",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "UsrMCITReportPreview5",
				"values": {
					"type": "crt.Label",
					"caption": "☐  SLA Performance Reports",
					"labelType": "body",
					"labelThickness": "default",
					"visible": true,
					"classes": [
						"usr-mcit-readonly-permission"
					],
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrMCITReportingPreview",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "UsrMCITReportPreview6",
				"values": {
					"type": "crt.Label",
					"caption": "☐  Contract Summary Reports",
					"labelType": "body",
					"labelThickness": "default",
					"visible": true,
					"classes": [
						"usr-mcit-readonly-permission"
					],
					"layoutConfig": {
						"column": 2,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrMCITReportingPreview",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "TabContainer_5194hoo",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "ADMINISTRATIVE PERMISSIONS",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "UsrMCITAdminPanel",
				"values": {
					"type": "crt.ExpansionPanel",
					"title": "Administrative Permissions",
					"expanded": true,
					"toggleType": "default",
					"items": [],
					"tools": [],
					"fitContent": false,
					"padding": {
						"top": "small",
						"bottom": "small",
						"left": "small",
						"right": "small"
					},
					"classes": [
						"usr-mcit-card"
					]
				},
				"parentName": "TabContainer_5194hoo",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrMCITAdminCheckboxGrid",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(0,1fr)",
						"minmax(0,1fr)"
					],
					"rows": "auto",
					"items": [],
					"classes": [
						"usr-mcit-choices"
					]
				},
				"parentName": "UsrMCITAdminPanel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Checkbox_ifeszmp",
				"values": {
					"type": "crt.Checkbox",
					"label": "Manage Users",
					"labelPosition": "right",
					"control": "$UsrMCITRoleAdministrativePermissionDS_UsrCanManageUsers_t8rq2wg",
					"disabled": true,
					"classes": [
						"usr-mcit-check-tile"
					],
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrMCITAdminCheckboxGrid",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Checkbox_jrowwuy",
				"values": {
					"type": "crt.Checkbox",
					"label": "Manage Roles",
					"labelPosition": "right",
					"control": "$UsrMCITRoleAdministrativePermissionDS_UsrCanManageRoles_0e36tmq",
					"disabled": true,
					"classes": [
						"usr-mcit-check-tile"
					],
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrMCITAdminCheckboxGrid",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Checkbox_vi64gwc",
				"values": {
					"type": "crt.Checkbox",
					"label": "Manage Workflows",
					"labelPosition": "right",
					"control": "$UsrMCITRoleAdministrativePermissionDS_UsrCanManageWorkflows_bn3xgrs",
					"disabled": true,
					"classes": [
						"usr-mcit-check-tile"
					],
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrMCITAdminCheckboxGrid",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Checkbox_5vq3dxo",
				"values": {
					"type": "crt.Checkbox",
					"label": "Manage SLA Policies",
					"labelPosition": "right",
					"control": "$UsrMCITRoleAdministrativePermissionDS_UsrCanManageSLAPolicies_44cz11f",
					"disabled": true,
					"classes": [
						"usr-mcit-check-tile"
					],
					"layoutConfig": {
						"column": 2,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrMCITAdminCheckboxGrid",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Checkbox_f4pcuoi",
				"values": {
					"type": "crt.Checkbox",
					"label": "View Audit Log",
					"labelPosition": "right",
					"control": "$UsrMCITRoleAdministrativePermissionDS_UsrCanViewAuditLog_vp1re2s",
					"disabled": true,
					"classes": [
						"usr-mcit-check-tile"
					],
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrMCITAdminCheckboxGrid",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Checkbox_edrjb6y",
				"values": {
					"type": "crt.Checkbox",
					"label": "Export Audit Log",
					"labelPosition": "right",
					"control": "$UsrMCITRoleAdministrativePermissionDS_UsrCanExportAuditLog_58l1lvz",
					"disabled": true,
					"classes": [
						"usr-mcit-check-tile"
					],
					"layoutConfig": {
						"column": 2,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrMCITAdminCheckboxGrid",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "Checkbox_2tqb4tx",
				"values": {
					"type": "crt.Checkbox",
					"label": "System Configuration",
					"labelPosition": "right",
					"control": "$UsrMCITRoleAdministrativePermissionDS_UsrCanSystemConfigure_xcnpyts",
					"disabled": true,
					"classes": [
						"usr-mcit-check-tile"
					],
					"layoutConfig": {
						"column": 1,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrMCITAdminCheckboxGrid",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "TabContainer_0wqwdih",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "ASSIGNED USERS",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "FlexContainer_pi5xshf",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "wrap",
					"items": []
				},
				"parentName": "TabContainer_0wqwdih",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Button_n3lharv",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_n3lharv_caption)#",
					"color": "primary",
					"size": "large",
					"icon": "person-button-icon",
					"iconPosition": "left-icon",
					"classes": [
						"usr-mcit-action"
					],
					"clicked": {
						"request": "crt.RunBusinessProcessRequest",
						"params": {
							"processName": "UsrMCITAssignUserToRole",
							"processRunType": "ForTheSelectedPage",
							"saveAtProcessStart": true,
							"showNotification": true,
							"notificationText": "#ResourceString(Button_n3lharv_clicked_params_notificationText)#",
							"recordIdProcessParameterName": "MCITRoleId"
						}
					}
				},
				"parentName": "FlexContainer_pi5xshf",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Button_tg337p6",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_tg337p6_caption)#",
					"color": "primary",
					"size": "large",
					"icon": "image-update",
					"iconPosition": "left-icon",
					"classes": [
						"usr-mcit-action-secondary"
					],
					"clicked": {
						"request": "crt.LoadDataRequest",
						"params": {
							"config": {
								"loadType": "reload"
							},
							"refreshDataConfig": {
								"mode": "RefreshSpecific",
								"targetDataSourceNames": [
									"DataGrid_6bdu0haDS"
								]
							}
						}
					}
				},
				"parentName": "FlexContainer_pi5xshf",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "DataGrid_6bdu0ha",
				"values": {
					"type": "crt.DataGrid",
					"items": "$DataGrid_6bdu0ha",
					"primaryColumnName": "DataGrid_6bdu0haDS_Id",
					"visible": true,
					"fitContent": true,
					"placeholder": false,
					"classes": [
						"usr-mcit-table"
					],
					"features": {
						"rows": {
							"selection": false,
							"numeration": false
						},
						"editable": {
							"enable": false,
							"itemsCreation": false,
							"floatingEditPanel": false
						},
						"header": {
							"visible": true
						},
						"columns": {
							"resizing": false,
							"dragAndDrop": false,
							"sorting": true
						}
					},
					"columns": [
						{
							"id": "16d07434-f5e3-4567-89ab-000000000000",
							"code": "DataGrid_6bdu0haDS_CreatedBy",
							"caption": "Created By",
							"dataValueType": 10
						},
						{
							"id": "17d075c7-f5e3-4567-89ab-000000000001",
							"code": "DataGrid_6bdu0haDS_SysUser",
							"caption": "User",
							"dataValueType": 10
						},
						{
							"id": "18d0775a-f5e3-4567-89ab-000000000002",
							"code": "DataGrid_6bdu0haDS_SysUser_Email",
							"caption": "Email",
							"dataValueType": 28
						},
						{
							"id": "19d078ed-f5e3-4567-89ab-000000000003",
							"code": "DataGrid_6bdu0haDS_SysRole",
							"caption": "Role",
							"dataValueType": 10
						}
					]
				},
				"parentName": "TabContainer_0wqwdih",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TabContainer_wsi30mm",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "CHANGE SUMMARY",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "UsrMCITChangeSummaryPanel",
				"values": {
					"type": "crt.ExpansionPanel",
					"title": "Change Summary",
					"expanded": true,
					"toggleType": "default",
					"items": [],
					"tools": [],
					"fitContent": false,
					"padding": {
						"top": "small",
						"bottom": "small",
						"left": "small",
						"right": "small"
					},
					"classes": [
						"usr-mcit-card"
					]
				},
				"parentName": "TabContainer_wsi30mm",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrMCITChangeSummaryEmpty",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"gap": "small",
					"classes": [
						"usr-mcit-empty-state"
					]
				},
				"parentName": "UsrMCITChangeSummaryPanel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrMCITChangeEmptyTitle",
				"values": {
					"type": "crt.Label",
					"caption": "No change summary connected",
					"labelType": "body",
					"labelThickness": "default",
					"visible": true,
					"classes": [
						"usr-mcit-empty-title"
					]
				},
				"parentName": "UsrMCITChangeSummaryEmpty",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrMCITChangeEmptyDescription",
				"values": {
					"type": "crt.Label",
					"caption": "Change history will appear after the MCIT role change-log data source is configured.",
					"labelType": "body",
					"labelThickness": "default",
					"visible": true,
					"classes": [
						"usr-mcit-empty-description"
					]
				},
				"parentName": "UsrMCITChangeSummaryEmpty",
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
					"UsrMCITRoleDS_UsrRoleCategory_pvorvyc": {
						"modelConfig": {
							"path": "UsrMCITRoleDS.UsrRoleCategory"
						}
					},
					"UsrMCITRoleDS_UsrName_n9pu298": {
						"modelConfig": {
							"path": "UsrMCITRoleDS.UsrName"
						}
					},
					"UsrMCITRoleDS_UsrScopeBehavior_k2vuil1": {
						"modelConfig": {
							"path": "UsrMCITRoleDS.UsrScopeBehavior"
						}
					},
					"UsrMCITRoleDS_UsrMCITRoleStatuses_6o62qb3": {
						"modelConfig": {
							"path": "UsrMCITRoleDS.UsrMCITRoleStatuses"
						}
					},
					"UsrMCITRoleDS_UsrDescription_ouy3rc1": {
						"modelConfig": {
							"path": "UsrMCITRoleDS.UsrDescription"
						}
					},
					"UsrMCITRoleDS_UsrProvisioningError_4yjz5yl": {
						"modelConfig": {
							"path": "UsrMCITRoleDS.UsrProvisioningError"
						}
					},
					"UsrMCITRoleDS_UsrRoleCategory_pvorvyc_List": {
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
					"UsrMCITRoleDS_UsrScopeBehavior_k2vuil1_List": {
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
					"UsrMCITRoleDS_UsrMCITRoleStatuses_6o62qb3_List": {
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
					"UsrMCITRoleAdministrativePermissionDS_UsrCanManageUsers_t8rq2wg": {
						"modelConfig": {
							"path": "UsrMCITRoleAdministrativePermissionDS.UsrCanManageUsers"
						}
					},
					"UsrMCITRoleAdministrativePermissionDS_UsrCanManageRoles_0e36tmq": {
						"modelConfig": {
							"path": "UsrMCITRoleAdministrativePermissionDS.UsrCanManageRoles"
						}
					},
					"UsrMCITRoleAdministrativePermissionDS_UsrCanManageWorkflows_bn3xgrs": {
						"modelConfig": {
							"path": "UsrMCITRoleAdministrativePermissionDS.UsrCanManageWorkflows"
						}
					},
					"UsrMCITRoleAdministrativePermissionDS_UsrCanManageSLAPolicies_44cz11f": {
						"modelConfig": {
							"path": "UsrMCITRoleAdministrativePermissionDS.UsrCanManageSLAPolicies"
						}
					},
					"UsrMCITRoleAdministrativePermissionDS_UsrCanViewAuditLog_vp1re2s": {
						"modelConfig": {
							"path": "UsrMCITRoleAdministrativePermissionDS.UsrCanViewAuditLog"
						}
					},
					"UsrMCITRoleAdministrativePermissionDS_UsrCanExportAuditLog_58l1lvz": {
						"modelConfig": {
							"path": "UsrMCITRoleAdministrativePermissionDS.UsrCanExportAuditLog"
						}
					},
					"UsrMCITRoleAdministrativePermissionDS_UsrCanSystemConfigure_xcnpyts": {
						"modelConfig": {
							"path": "UsrMCITRoleAdministrativePermissionDS.UsrCanSystemConfigure"
						}
					},
					"UsrScopeBannerTitle": {
						"value": "Scope Behavior: Not configured"
					},
					"UsrScopeBannerDescription": {
						"value": "Data scope rules for this role are listed below."
					},
					"UsrMCITRoleCategoryLabel": {
						"value": "Role category not set"
					},
					"UsrMCITRoleStatusLabel": {
						"value": "Status not set"
					},
					"UsrMCITIsActiveRole": {
						"value": false
					},
					"DataGrid_1yq715a": {
						"isCollection": true,
						"modelConfig": {
							"path": "DataGrid_1yq715aDS"
						},
						"viewModelConfig": {
							"attributes": {
								"DataGrid_1yq715aDS_UsrScreen": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrScreen"
									}
								},
								"DataGrid_1yq715aDS_UsrCanView": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrCanView"
									}
								},
								"DataGrid_1yq715aDS_UsrCanCreate": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrCanCreate"
									}
								},
								"DataGrid_1yq715aDS_UsrCanEdit": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrCanEdit"
									}
								},
								"DataGrid_1yq715aDS_UsrCanApprove": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrCanApprove"
									}
								},
								"DataGrid_1yq715aDS_UsrCanAssign": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrCanAssign"
									}
								},
								"DataGrid_1yq715aDS_UsrCanExport": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrCanExport"
									}
								},
								"DataGrid_1yq715aDS_UsrCanConfigure": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrCanConfigure"
									}
								},
								"DataGrid_1yq715aDS_UsrCanActivate": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrCanActivate"
									}
								},
								"DataGrid_1yq715aDS_Id": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.Id"
									}
								}
							}
						}
					},
					"UsrDataScopeGrid": {
						"isCollection": true,
						"modelConfig": {
							"path": "UsrDataScopeGridDS",
							"sortingConfig": {
								"default": [
									{
										"columnName": "UsrSortOrder",
										"direction": "asc"
									}
								]
							}
						},
						"viewModelConfig": {
							"attributes": {
								"UsrDataScopeGridDS_UsrScopeType": {
									"modelConfig": {
										"path": "UsrDataScopeGridDS.UsrScopeType"
									}
								},
								"UsrDataScopeGridDS_UsrAllowedValues": {
									"modelConfig": {
										"path": "UsrDataScopeGridDS.UsrAllowedValues"
									}
								},
								"UsrDataScopeGridDS_UsrDescription": {
									"modelConfig": {
										"path": "UsrDataScopeGridDS.UsrDescription"
									}
								},
								"UsrDataScopeGridDS_Id": {
									"modelConfig": {
										"path": "UsrDataScopeGridDS.Id"
									}
								}
							}
						}
					},
					"DataGrid_cjsl4aj": {
						"isCollection": true,
						"modelConfig": {
							"path": "DataGrid_cjsl4ajDS"
						},
						"viewModelConfig": {
							"attributes": {
								"DataGrid_cjsl4ajDS_UsrQueue": {
									"modelConfig": {
										"path": "DataGrid_cjsl4ajDS.UsrQueue"
									}
								},
								"DataGrid_cjsl4ajDS_UsrQueue_UsrDescription": {
									"modelConfig": {
										"path": "DataGrid_cjsl4ajDS.UsrQueue_UsrDescription"
									}
								},
								"DataGrid_cjsl4ajDS_UsrIsEnabled": {
									"modelConfig": {
										"path": "DataGrid_cjsl4ajDS.UsrIsEnabled"
									}
								},
								"DataGrid_cjsl4ajDS_Id": {
									"modelConfig": {
										"path": "DataGrid_cjsl4ajDS.Id"
									}
								}
							}
						}
					},
					"DataGrid_6bdu0ha": {
						"isCollection": true,
						"modelConfig": {
							"path": "DataGrid_6bdu0haDS",
							"filterAttributes": [
								{
									"loadOnChange": true,
									"name": "DataGrid_6bdu0ha_PredefinedFilter"
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"DataGrid_6bdu0haDS_CreatedBy": {
									"modelConfig": {
										"path": "DataGrid_6bdu0haDS.CreatedBy"
									}
								},
								"DataGrid_6bdu0haDS_SysUser": {
									"modelConfig": {
										"path": "DataGrid_6bdu0haDS.SysUser"
									}
								},
								"DataGrid_6bdu0haDS_SysUser_Email": {
									"modelConfig": {
										"path": "DataGrid_6bdu0haDS.SysUser_Email"
									}
								},
								"DataGrid_6bdu0haDS_SysRole": {
									"modelConfig": {
										"path": "DataGrid_6bdu0haDS.SysRole"
									}
								},
								"DataGrid_6bdu0haDS_Id": {
									"modelConfig": {
										"path": "DataGrid_6bdu0haDS.Id"
									}
								}
							}
						}
					},
					"DataGrid_6bdu0ha_PredefinedFilter": {
						"value": {
							"items": {},
							"logicalOperation": 0,
							"isEnabled": true,
							"filterType": 6,
							"rootSchemaName": "SysUserInRole"
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
						"UsrMCITRoleDS": {
							"type": "crt.EntityDataSource",
							"scope": "page",
							"config": {
								"entitySchemaName": "UsrMCITRole",
								"allowCopyingRecords": false
							}
						},
						"DataGrid_1yq715aDS": {
							"type": "crt.EntityDataSource",
							"scope": "viewElement",
							"config": {
								"entitySchemaName": "UsrMCITRoleScreenPermission",
								"attributes": {
									"UsrScreen": {
										"path": "UsrScreen"
									},
									"UsrCanView": {
										"path": "UsrCanView"
									},
									"UsrCanCreate": {
										"path": "UsrCanCreate"
									},
									"UsrCanEdit": {
										"path": "UsrCanEdit"
									},
									"UsrCanApprove": {
										"path": "UsrCanApprove"
									},
									"UsrCanAssign": {
										"path": "UsrCanAssign"
									},
									"UsrCanExport": {
										"path": "UsrCanExport"
									},
									"UsrCanConfigure": {
										"path": "UsrCanConfigure"
									},
									"UsrCanActivate": {
										"path": "UsrCanActivate"
									}
								}
							}
						},
						"UsrDataScopeGridDS": {
							"type": "crt.EntityDataSource",
							"scope": "viewElement",
							"config": {
								"entitySchemaName": "UsrMCITRoleDataScopeRule",
								"attributes": {
									"UsrScopeType": {
										"path": "UsrScopeType"
									},
									"UsrAllowedValues": {
										"path": "UsrAllowedValues"
									},
									"UsrDescription": {
										"path": "UsrDescription"
									},
									"UsrSortOrder": {
										"path": "UsrSortOrder"
									}
								}
							}
						},
						"DataGrid_cjsl4ajDS": {
							"type": "crt.EntityDataSource",
							"scope": "viewElement",
							"config": {
								"entitySchemaName": "UsrMCITRoleQueuePermission",
								"attributes": {
									"UsrQueue": {
										"path": "UsrQueue"
									},
									"UsrIsEnabled": {
										"path": "UsrIsEnabled"
									},
									"UsrQueue_UsrDescription": {
										"type": "ForwardReference",
										"path": "UsrQueue.UsrDescription"
									}
								}
							}
						},
						"DataGrid_6bdu0haDS": {
							"type": "crt.EntityDataSource",
							"scope": "viewElement",
							"config": {
								"entitySchemaName": "SysUserInRole",
								"attributes": {
									"CreatedBy": {
										"path": "CreatedBy"
									},
									"SysUser": {
										"path": "SysUser"
									},
									"SysUser_Email": {
										"type": "ForwardReference",
										"path": "SysUser.Email"
									},
									"SysRole": {
										"path": "SysRole"
									}
								}
							}
						},
						"UsrMCITRoleAdministrativePermissionDS": {
							"type": "crt.EntityDataSource",
							"scope": "page",
							"config": {
								"entitySchemaName": "UsrMCITRoleAdministrativePermission",
								"loadParameters": {
									"options": {
										"pagingConfig": {
											"rowCount": 1,
											"rowsOffset": -1
										}
									}
								}
							}
						}
					},
					"primaryDataSourceName": "UsrMCITRoleDS",
					"dependencies": {
						"DataGrid_1yq715aDS": [
							{
								"attributePath": "UsrMCITRole",
								"relationPath": "UsrMCITRoleDS.Id"
							}
						],
						"UsrDataScopeGridDS": [
							{
								"attributePath": "UsrMCITRole",
								"relationPath": "UsrMCITRoleDS.Id"
							}
						],
						"DataGrid_cjsl4ajDS": [
							{
								"attributePath": "UsrMCITRole",
								"relationPath": "UsrMCITRoleDS.Id"
							}
						],
						"DataGrid_6bdu0haDS": [
							{
								"attributePath": "SysRole",
								"relationPath": "UsrMCITRoleDS.UsrRole"
							}
						],
						"UsrMCITRoleAdministrativePermissionDS": [
							{
								"attributePath": "UsrMCITRole",
								"relationPath": "UsrMCITRoleDS.Id"
							}
						]
					}
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[

            {
                request: "crt.HandleViewModelAttributeChangeRequest",

                handler: async (request, next) => {

                    const value =
                        request.value?.displayValue ||
                        request.value?.Name ||
                        "";

                    const ctx = request.$context;

                    if (
                        request.attributeName ===
                        "UsrMCITRoleDS_UsrRoleCategory_pvorvyc"
                    ) {
                        ctx.UsrMCITRoleCategoryLabel =
                            value || "Role category not set";
                    }

                    if (
                        request.attributeName ===
                        "UsrMCITRoleDS_UsrMCITRoleStatuses_6o62qb3"
                    ) {
                        ctx.UsrMCITRoleStatusLabel =
                            value || "Status not set";

                        ctx.UsrMCITIsActiveRole =
                            String(value).toLowerCase() === "active";
                    }

                    if (
                        request.attributeName ===
                        "UsrMCITRoleDS_UsrScopeBehavior_k2vuil1"
                    ) {

                        ctx.UsrScopeBannerTitle =
                            "Scope Behavior: " +
                            (value || "Not configured");

                        const s = String(value).toLowerCase();

                        ctx.UsrScopeBannerDescription =
                            s.includes("contract")
                                ? "Configured for contract-scoped access; see rules below."
                                : s.includes("authority")
                                    ? "Configured for authority-scoped access; see rules below."
                                    : s.includes("project")
                                        ? "Configured for project-scoped access; see rules below."
                                        : "Data scope rules for this role are listed below.";
                    }

                    return next?.handle(request);
                }
            },

            {
                request: "crt.SaveRecordRequest",

                handler: async (request, next) => {

                    const ctx = request.$context;

                    const show = (title, message) =>
                        ctx.executeRequest({
                            type: "crt.ShowDialogRequest",
                            $context: ctx,

                            dialogConfig: {
                                data: {
                                    title,
                                    message,

                                    actions: [{
                                        key: "OK",
                                        config: {
                                            color: "primary",
                                            caption: "OK"
                                        }
                                    }]
                                }
                            }
                        });

                    try {

                        const name = String(
                            (await ctx.UsrMCITRoleDS_UsrName_n9pu298) ?? ""
                        ).trim();

                        if (!name) {
                            await show(
                                "Validation Error",
                                "Role Name is required."
                            );
                            return;
                        }

                        const pds =
                            await ctx.getPrimaryModelName();

                        const schema =
                            await ctx.dataSchemas[pds];

                        const id = String(
                            (
                                schema?.primaryAttributeName
                                    ? await ctx[schema.primaryAttributeName]
                                    : null
                            ) ??
                            (await ctx.Id) ??
                            ""
                        ).toLowerCase();

                        const filter = new sdk.FilterGroup();

                        await filter.addSchemaColumnFilterWithParameter(
                            sdk.ComparisonType.Equal,
                            "UsrName",
                            name
                        );

                        const plainFilter =
                            Object.assign({}, filter);

                        plainFilter.items = filter.items;

                        const model =
                            await sdk.Model.create("UsrMCITRole");

                        const records = await model.load({
                            attributes: ["Id"],

                            parameters: [{
                                type: sdk.ModelParameterType.Filter,
                                value: plainFilter
                            }]
                        });

                        if (!Array.isArray(records)) {
                            throw new Error(
                                "Could not load MCIT Role records."
                            );
                        }

                        if (
                            records.some(
                                r =>
                                    String(r.Id).toLowerCase() !== id
                            )
                        ) {
                            await show(
                                "Duplicate Role Name",
                                "Role name already exists."
                            );
                            return;
                        }

                        return await next?.handle(request);

                    } catch (error) {

                        console.error(
                            "MCIT Role validation error",
                            error
                        );

                        await show(
                            "Save Validation Error",
                            error?.message || String(error)
                        );

                        return;
                    }
                }
            }

        ]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});