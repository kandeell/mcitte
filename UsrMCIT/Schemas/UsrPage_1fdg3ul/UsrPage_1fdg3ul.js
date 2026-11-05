define("UsrPage_1fdg3ul", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "SideAreaProfileContainer",
				"values": {
					"gap": {
						"columnGap": "large",
						"rowGap": "none"
					},
					"visible": true,
					"alignItems": "stretch"
				}
			},
			{
				"operation": "merge",
				"name": "Tabs",
				"values": {
					"visible": true,
					"styleType": "default",
					"mode": "tab",
					"bodyBackgroundColor": "#F8FAFC",
					"selectedTabTitleColor": "#000000",
					"tabTitleColor": "#757575",
					"underlineSelectedTabColor": "crt-color-purple",
					"headerBackgroundColor": "crt-color-violet",
					"stretch": true,
					"allowToggleClose": true,
					"selectedTabIndex": "$MCITSelectedTabIndex"
				}
			},
			{
				"operation": "merge",
				"name": "GeneralInfoTab",
				"values": {
					"caption": "Overview",
					"iconPosition": "only-text"
				}
			},
			{
				"operation": "remove",
				"name": "GeneralInfoTabContainer"
			},
			{
				"operation": "merge",
				"name": "CardToggleTabPanel",
				"values": {
					"styleType": "default",
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
				"name": "AttachmentList",
				"values": {
					"columns": [
						{
							"id": "4653d437-7c06-73c8-c0b0-d8c01c54347e",
							"code": "AttachmentListDS_Name",
							"caption": "#ResourceString(AttachmentListDS_Name)#",
							"dataValueType": 28
						},
						{
							"id": "ec315b20-d5ea-8047-5584-9f94443c540f",
							"code": "AttachmentListDS_CreatedOn",
							"caption": "#ResourceString(AttachmentListDS_CreatedOn)#",
							"dataValueType": 7
						},
						{
							"id": "1d312ee5-6d58-99e8-6196-14ab9e8766e3",
							"code": "AttachmentListDS_CreatedBy",
							"caption": "#ResourceString(AttachmentListDS_CreatedBy)#",
							"dataValueType": 10
						},
						{
							"id": "fdedca88-b6b6-4b6b-1aef-e0aab267c257",
							"code": "AttachmentListDS_Size",
							"caption": "#ResourceString(AttachmentListDS_Size)#",
							"dataValueType": 4
						}
					]
				}
			},
			{
				"operation": "insert",
				"name": "MCITContractName",
				"values": {
					"type": "crt.Input",
					"label": "Contract name",
					"control": "$MCITContractName",
					"labelPosition": "above",
					"multiline": false,
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
				"name": "MCITContractNumber",
				"values": {
					"type": "crt.Input",
					"label": "Contract number",
					"control": "$MCITContractNumber",
					"labelPosition": "above",
					"multiline": false,
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
				"name": "MCITContractStatus",
				"values": {
					"type": "crt.ComboBox",
					"label": "Status",
					"control": "$MCITContractStatus",
					"labelPosition": "above",
					"isAddAllowed": false,
					"showValueAsLink": false,
					"controlActions": [],
					"listActions": [],
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "MCITAuditCreatedOn",
				"values": {
					"type": "crt.DateTimePicker",
					"label": "Created on",
					"control": "$MCITAuditCreatedOn",
					"labelPosition": "above",
					"pickerType": "datetime",
					"readonly": true,
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 4,
						"rowSpan": 1
					}
				},
				"parentName": "SideAreaProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "MCITOverviewLayout",
				"values": {
					"type": "crt.GridContainer",
					"items": [],
					"rows": "minmax(32px, max-content)",
					"columns": [
						"repeat(auto-fit, minmax(280px, 1fr))"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": "medium"
					},
					"padding": {
						"top": "small",
						"right": "small",
						"bottom": "small",
						"left": "small"
					},
					"color": "#F8FAFC",
					"borderRadius": "large",
					"alignItems": "start",
					"visible": true
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITDetailsCard",
				"values": {
					"type": "crt.GridContainer",
					"items": [],
					"rows": "minmax(32px, max-content)",
					"columns": [
						"minmax(0, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": "medium"
					},
					"padding": {
						"top": "medium",
						"right": "medium",
						"bottom": "medium",
						"left": "medium"
					},
					"color": "#FFFFFF",
					"borderRadius": "large",
					"alignItems": "start",
					"visible": true,
					"layoutConfig": {
						"column": 1,
						"colSpan": 2,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITOverviewLayout",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITDetailsTitle",
				"values": {
					"type": "crt.Label",
					"caption": "Contract details",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "#5B21A5",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"visible": true,
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITDetailsCard",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITContractFields",
				"values": {
					"type": "crt.GridContainer",
					"items": [],
					"rows": "minmax(32px, max-content)",
					"columns": [
						"repeat(auto-fit, minmax(220px, 1fr))"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": "small"
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
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITDetailsCard",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MCITContractAuthority",
				"values": {
					"type": "crt.ComboBox",
					"label": "Government authority",
					"control": "$MCITContractAuthority",
					"labelPosition": "above",
					"isAddAllowed": false,
					"showValueAsLink": true,
					"controlActions": [],
					"listActions": [],
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContractFields",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITContractReference",
				"values": {
					"type": "crt.Input",
					"label": "Contract reference",
					"control": "$MCITContractReference",
					"labelPosition": "above",
					"multiline": false,
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContractFields",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MCITContractEndDate",
				"values": {
					"type": "crt.DateTimePicker",
					"label": "End date",
					"control": "$MCITContractEndDate",
					"labelPosition": "above",
					"pickerType": "date",
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContractFields",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "MCITContractStartDate",
				"values": {
					"type": "crt.DateTimePicker",
					"label": "Start date",
					"control": "$MCITContractStartDate",
					"labelPosition": "above",
					"pickerType": "date",
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContractFields",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "MCITContractCurrency",
				"values": {
					"type": "crt.ComboBox",
					"label": "Contract currency",
					"control": "$MCITContractCurrency",
					"labelPosition": "above",
					"isAddAllowed": false,
					"showValueAsLink": false,
					"controlActions": [],
					"listActions": [],
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 3,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContractFields",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "MCITContractInitialPoints",
				"values": {
					"type": "crt.NumberInput",
					"label": "Initial contract points",
					"control": "$MCITContractInitialPoints",
					"labelPosition": "above",
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 3,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContractFields",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "MCITContractBudget",
				"values": {
					"type": "crt.NumberInput",
					"label": "Initial financial budget",
					"control": "$MCITContractBudget",
					"labelPosition": "above",
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 4,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContractFields",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "GridContainer_m5nge9n",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 2,
						"row": 5,
						"rowSpan": 1
					},
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
				"parentName": "MCITContractFields",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "Label_9j2qyrf",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_9j2qyrf_caption)#)#",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "#5B21A5",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "GridContainer_m5nge9n",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITContractDescription",
				"values": {
					"type": "crt.Input",
					"label": "Description",
					"control": "$MCITContractDescription",
					"labelPosition": "above",
					"multiline": true,
					"styles": {
						"grid-column": "1 / -1"
					},
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_m5nge9n",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MCITContactsCard",
				"values": {
					"type": "crt.GridContainer",
					"items": [],
					"rows": "minmax(32px, max-content)",
					"columns": [
						"minmax(0, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": "medium"
					},
					"padding": {
						"top": "medium",
						"right": "medium",
						"bottom": "medium",
						"left": "medium"
					},
					"color": "primary",
					"borderRadius": "large",
					"alignItems": null,
					"visible": true,
					"layoutConfig": {
						"column": 3,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITOverviewLayout",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MCITContactsTitle",
				"values": {
					"type": "crt.Label",
					"caption": "Business Contacts",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "#5B21A5",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"visible": true,
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContactsCard",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITBusinessContact",
				"values": {
					"type": "crt.ComboBox",
					"label": "Business contact",
					"control": "$MCITBusinessContact",
					"labelPosition": "above",
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
				"parentName": "MCITContactsCard",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MCITOperationalContact",
				"values": {
					"type": "crt.ComboBox",
					"label": "Operational contact",
					"control": "$MCITOperationalContact",
					"labelPosition": "above",
					"isAddAllowed": false,
					"showValueAsLink": true,
					"controlActions": [],
					"listActions": [],
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContactsCard",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "MCITExpiryTitle",
				"values": {
					"type": "crt.Label",
					"caption": "Restoration Expiry Preview",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "#5B21A5",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"visible": true,
					"layoutConfig": {
						"column": 1,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContactsCard",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "MCITExpiry30Caption",
				"values": {
					"type": "crt.Label",
					"caption": "Restored points expiring in 30 days",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "#64748B",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"visible": true,
					"layoutConfig": {
						"column": 1,
						"row": 5,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContactsCard",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "MCITExpiry90Caption",
				"values": {
					"type": "crt.Label",
					"caption": "Restored points expiring in 90 days",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "#64748B",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"visible": true,
					"layoutConfig": {
						"column": 1,
						"row": 6,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITContactsCard",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "GridContainer_hasnfno",
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
					},
					"layoutConfig": {
						"column": 1,
						"colSpan": 3,
						"row": 2,
						"rowSpan": 2
					}
				},
				"parentName": "MCITOverviewLayout",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Label_vvaeqvy",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_vvaeqvy_caption)#)#",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "#5B21A5",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "GridContainer_hasnfno",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Dashboards_3blmb24",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.Dashboards",
					"_designOptions": {
						"entitySchemaName": "UsrMCITContract",
						"dependencies": [
							{
								"attributePath": "Id",
								"relationPath": "UsrMCITContractDS.Id"
							}
						],
						"filters": []
					}
				},
				"parentName": "GridContainer_hasnfno",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TabContainer_h354xra",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "Configuration Versions",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "ExpansionPanel_pburjeo",
				"values": {
					"type": "crt.ExpansionPanel",
					"tools": [],
					"items": [],
					"title": "#ResourceString(ExpansionPanel_pburjeo_title)#",
					"toggleType": "material",
					"togglePosition": "before",
					"expanded": true,
					"labelColor": "#5B21A5",
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
				"parentName": "TabContainer_h354xra",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_k6pqi6g",
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
				"parentName": "ExpansionPanel_pburjeo",
				"propertyName": "tools",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_pdacv8i",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"gap": "none",
					"alignItems": "center",
					"items": [],
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_k6pqi6g",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailAddBtn_opvbbzb",
				"values": {
					"type": "crt.Button",
					"caption": "Add version",
					"icon": "add-button-icon",
					"iconPosition": "left-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.CreateRecordRequest",
						"params": {
							"entityName": "UsrContractConfigVersion",
							"defaultValues": [
								{
									"attributeName": "UsrContract",
									"value": "$Id"
								}
							]
						}
					},
					"visible": true,
					"clickMode": "default"
				},
				"parentName": "FlexContainer_pdacv8i",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailRefreshBtn_kx4zxdd",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailRefreshBtn_kx4zxdd_caption)#",
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
							"dataSourceName": "GridDetail_va48qvxDS"
						}
					}
				},
				"parentName": "FlexContainer_pdacv8i",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSettingsBtn_tz72vkq",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailSettingsBtn_tz72vkq_caption)#",
					"icon": "actions-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clickMode": "menu",
					"menuItems": []
				},
				"parentName": "FlexContainer_pdacv8i",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridDetailExportDataBtn_bcrnmg5",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailExportDataBtn_bcrnmg5_caption)#",
					"icon": "export-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "GridDetail_va48qvx"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_tz72vkq",
				"propertyName": "menuItems",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailImportDataBtn_cswicsn",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailImportDataBtn_cswicsn_caption)#",
					"icon": "import-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "UsrContractConfigVersion"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_tz72vkq",
				"propertyName": "menuItems",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSearchFilter_6m356c3",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "Search configuration versions",
					"iconOnly": false,
					"_filterOptions": {
						"expose": [
							{
								"attribute": "GridDetailSearchFilter_6m356c3_GridDetail_va48qvx",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"GridDetail_va48qvx"
										]
									}
								]
							}
						],
						"from": [
							"GridDetailSearchFilter_6m356c3_SearchValue",
							"GridDetailSearchFilter_6m356c3_FilteredColumnsGroups"
						]
					}
				},
				"parentName": "FlexContainer_pdacv8i",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_yd45tjn",
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
				"parentName": "ExpansionPanel_pburjeo",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetail_va48qvx",
				"values": {
					"type": "crt.DataGrid",
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 2,
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
					"items": "$GridDetail_va48qvx",
					"primaryColumnName": "GridDetail_va48qvxDS_Id",
					"columns": [
						{
							"id": "33be0022-44e4-f502-846e-aa536df83181",
							"code": "GridDetail_va48qvxDS_UsrVersionNumber",
							"caption": "Version",
							"dataValueType": 27
						},
						{
							"id": "5ab607e3-4bbc-c2ae-f317-8c3d288241b1",
							"code": "GridDetail_va48qvxDS_UsrName",
							"caption": "Configuration name",
							"dataValueType": 28
						},
						{
							"id": "8943047a-063f-73a0-06a0-9a609a3a8e11",
							"code": "GridDetail_va48qvxDS_UsrEffectiveFrom",
							"caption": "Effective from",
							"dataValueType": 7
						},
						{
							"id": "556c09b9-7abd-3657-a0ff-679213b61f5e",
							"code": "GridDetail_va48qvxDS_UsrCPUPerPoint",
							"caption": "vCPU per point",
							"dataValueType": 4,
							"width": 197
						},
						{
							"id": "1ece9bcc-fd80-49d5-b224-20d110e156ae",
							"code": "GridDetail_va48qvxDS_UsrRAMGBPerPoint",
							"caption": "RAM GB per point",
							"dataValueType": 31
						},
						{
							"id": "fd904365-5dbf-8ac1-75f5-2fb10ea17fcd",
							"code": "GridDetail_va48qvxDS_UsrStorageGBPerPoint",
							"caption": "Storage GB per point",
							"dataValueType": 31
						}
					],
					"placeholder": false
				},
				"parentName": "GridContainer_yd45tjn",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TabContainer_91fz9dg",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "#ResourceString(TabContainer_91fz9dg_caption)#",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "MCITBalancesContent",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"gap": "medium",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"left": "medium",
						"right": "medium"
					},
					"color": "#FFFFFF",
					"borderRadius": "large"
				},
				"parentName": "TabContainer_91fz9dg",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITBalanceBanner",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"items": [],
					"gap": "small",
					"alignItems": "center",
					"color": "#EFF6FF",
					"borderRadius": "large",
					"padding": {
						"top": "small",
						"bottom": "small",
						"left": "small",
						"right": "small"
					}
				},
				"parentName": "MCITBalancesContent",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITBalanceInfoButton",
				"values": {
					"type": "crt.Button",
					"caption": "Show or hide balance explanation",
					"ariaLabel": "Show or hide balance explanation",
					"icon": "info-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "small",
					"clicked": {
						"request": "usr.ToggleBalanceHelp"
					}
				},
				"parentName": "MCITBalanceBanner",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITBalanceExplanation",
				"values": {
					"type": "crt.Label",
					"caption": "Balances are derived from ledger transactions. Figures are posted values only.",
					"labelType": "body",
					"labelEllipsis": false,
					"labelColor": "#2563EB",
					"labelBackgroundColor": "transparent",
					"visible": "$MCITShowBalanceHelp"
				},
				"parentName": "MCITBalanceBanner",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MCITBalanceCards",
				"values": {
					"type": "crt.GridContainer",
					"items": [],
					"columns": [
						"minmax(0, 1fr)",
						"minmax(0, 1fr)",
						"minmax(0, 1fr)"
					],
					"rows": "minmax(32px, max-content)",
					"gap": {
						"columnGap": "medium",
						"rowGap": "medium"
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
					"alignItems": "stretch"
				},
				"parentName": "MCITBalancesContent",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MCITAvailableCard",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"gap": "small",
					"color": "#F0FDF4",
					"borderRadius": "large",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"left": "medium",
						"right": "medium"
					},
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITBalanceCards",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITAvailableTitle",
				"values": {
					"type": "crt.Label",
					"caption": "AVAILABLE POINTS",
					"labelColor": "#166534",
					"labelEllipsis": false
				},
				"parentName": "MCITAvailableCard",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_lqmx8vv",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_lqmx8vv_title)#",
						"theme": "full-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_lqmx8vv_config_text_template)#",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"type": "number",
								"decimalPrecision": 0,
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"providing": {
								"attribute": "IndicatorWidget_lqmx8vv_Data",
								"schemaName": "UsrMCITContract",
								"filters": null,
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "Id"
											},
											"functionType": 2,
											"aggregationType": 1,
											"aggregationEvalType": 2
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "UsrMCITContractDS.Id"
									}
								]
							}
						},
						"comparison": {
							"type": null,
							"text": ""
						},
						"hint": "#ResourceString(IndicatorWidget_lqmx8vv_hint)#",
						"hideTitle": true
					},
					"visible": true
				},
				"parentName": "MCITAvailableCard",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MCITConsumedCard",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"gap": "small",
					"color": "#FEF2F2",
					"borderRadius": "large",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"left": "medium",
						"right": "medium"
					},
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITBalanceCards",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MCITConsumedTitle",
				"values": {
					"type": "crt.Label",
					"caption": "CONSUMED POINTS",
					"labelColor": "#991B1B",
					"labelEllipsis": false
				},
				"parentName": "MCITConsumedCard",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_47fbb88",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_47fbb88_title)#",
						"theme": "full-fill",
						"layout": {
							"color": "coral"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_47fbb88_config_text_template)#",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"type": "number",
								"decimalPrecision": 0,
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"providing": {
								"attribute": "IndicatorWidget_47fbb88_Data",
								"schemaName": "UsrMCITContract",
								"filters": null,
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "Id"
											},
											"functionType": 2,
											"aggregationType": 1,
											"aggregationEvalType": 2
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "UsrMCITContractDS.Id"
									}
								]
							}
						},
						"comparison": {
							"type": null,
							"text": ""
						},
						"hint": "#ResourceString(IndicatorWidget_47fbb88_hint)#",
						"hideTitle": true
					},
					"visible": true
				},
				"parentName": "MCITConsumedCard",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MCITRestoredCard",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"gap": "small",
					"color": "#EFF6FF",
					"borderRadius": "large",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"left": "medium",
						"right": "medium"
					},
					"layoutConfig": {
						"column": 3,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "MCITBalanceCards",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "MCITRestoredTitle",
				"values": {
					"type": "crt.Label",
					"caption": "RESTORED POINTS",
					"labelColor": "#1E40AF",
					"labelEllipsis": false
				},
				"parentName": "MCITRestoredCard",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_v1hpa7j",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_v1hpa7j_title)#",
						"theme": "full-fill",
						"layout": {
							"color": "light-blue"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_v1hpa7j_config_text_template)#",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"type": "number",
								"decimalPrecision": 0,
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"providing": {
								"attribute": "IndicatorWidget_v1hpa7j_Data",
								"schemaName": "UsrMCITContract",
								"filters": null,
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "Id"
											},
											"functionType": 2,
											"aggregationType": 1,
											"aggregationEvalType": 2
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "UsrMCITContractDS.Id"
									}
								]
							}
						},
						"comparison": {
							"type": null,
							"text": ""
						},
						"hint": "#ResourceString(IndicatorWidget_v1hpa7j_hint)#",
						"hideTitle": true
					},
					"visible": true
				},
				"parentName": "MCITRestoredCard",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MCITCompositionCard",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"gap": "small",
					"color": "#F8FAFC",
					"borderRadius": "large",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"left": "medium",
						"right": "medium"
					}
				},
				"parentName": "MCITBalancesContent",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "MCITCompositionTitle",
				"values": {
					"type": "crt.Label",
					"caption": "Balance Composition",
					"labelColor": "#334155",
					"labelEllipsis": false
				},
				"parentName": "MCITCompositionCard",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_num6g01",
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
					"justifyContent": "center",
					"gap": "large"
				},
				"parentName": "MCITCompositionCard",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_pls0lz2",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_pls0lz2_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_pls0lz2_config_text_template)#",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"type": "number",
								"decimalPrecision": 0,
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"providing": {
								"attribute": "IndicatorWidget_pls0lz2_Data",
								"schemaName": "UsrMCITContract",
								"filters": null,
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "Id"
											},
											"functionType": 2,
											"aggregationType": 1,
											"aggregationEvalType": 2
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "UsrMCITContractDS.Id"
									}
								]
							}
						},
						"comparison": {
							"type": null,
							"text": ""
						},
						"hint": "#ResourceString(IndicatorWidget_pls0lz2_hint)#",
						"hideTitle": false
					},
					"visible": true
				},
				"parentName": "FlexContainer_num6g01",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_c7lr18k",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_c7lr18k_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_c7lr18k_config_text_template)#",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"type": "number",
								"decimalPrecision": 0,
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"providing": {
								"attribute": "IndicatorWidget_c7lr18k_Data",
								"schemaName": "UsrMCITContract",
								"filters": null,
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "Id"
											},
											"functionType": 2,
											"aggregationType": 1,
											"aggregationEvalType": 2
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "UsrMCITContractDS.Id"
									}
								]
							}
						},
						"comparison": {
							"type": null,
							"text": ""
						},
						"hint": "#ResourceString(IndicatorWidget_c7lr18k_hint)#",
						"hideTitle": false
					},
					"visible": true
				},
				"parentName": "FlexContainer_num6g01",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_wk1kcsw",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_wk1kcsw_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_wk1kcsw_config_text_template)#",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"type": "number",
								"decimalPrecision": 0,
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"providing": {
								"attribute": "IndicatorWidget_wk1kcsw_Data",
								"schemaName": "UsrMCITContract",
								"filters": null,
								"aggregation": {
									"column": {
										"orderDirection": 0,
										"orderPosition": -1,
										"isVisible": true,
										"expression": {
											"expressionType": 1,
											"functionArgument": {
												"expressionType": 0,
												"columnPath": "Id"
											},
											"functionType": 2,
											"aggregationType": 1,
											"aggregationEvalType": 2
										}
									}
								},
								"dependencies": [
									{
										"attributePath": "Id",
										"relationPath": "UsrMCITContractDS.Id"
									}
								]
							}
						},
						"comparison": {
							"type": null,
							"text": ""
						},
						"hint": "#ResourceString(IndicatorWidget_wk1kcsw_hint)#",
						"hideTitle": false
					},
					"visible": true,
					"layoutConfig": {
						"width": 162.96875
					}
				},
				"parentName": "FlexContainer_num6g01",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "MCITLedgerTab",
				"values": {
					"type": "crt.TabContainer",
					"caption": "Point Ledger",
					"items": [],
					"iconPosition": "only-text"
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "ExpansionPanel_zrdtks4",
				"values": {
					"type": "crt.ExpansionPanel",
					"tools": [],
					"items": [],
					"title": "#ResourceString(ExpansionPanel_zrdtks4_title)#",
					"toggleType": "material",
					"togglePosition": "before",
					"expanded": true,
					"labelColor": "#521ABC",
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
				"parentName": "MCITLedgerTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_4u2jfk1",
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
				"parentName": "ExpansionPanel_zrdtks4",
				"propertyName": "tools",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_ifik5tm",
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
				"parentName": "GridContainer_4u2jfk1",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailAddBtn_ce2j3rh",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailAddBtn_ce2j3rh_caption)#",
					"icon": "add-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.CreateRecordRequest",
						"params": {
							"entityName": "UsrPointTransaction"
						}
					}
				},
				"parentName": "FlexContainer_ifik5tm",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailRefreshBtn_6ac4hak",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailRefreshBtn_6ac4hak_caption)#",
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
							"dataSourceName": "GridDetail_jdrcsntDS"
						}
					}
				},
				"parentName": "FlexContainer_ifik5tm",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSettingsBtn_f17ps63",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailSettingsBtn_f17ps63_caption)#",
					"icon": "actions-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clickMode": "menu",
					"menuItems": []
				},
				"parentName": "FlexContainer_ifik5tm",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridDetailExportDataBtn_ews0mon",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailExportDataBtn_ews0mon_caption)#",
					"icon": "export-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "GridDetail_jdrcsnt"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_f17ps63",
				"propertyName": "menuItems",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailImportDataBtn_ftclr36",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailImportDataBtn_ftclr36_caption)#",
					"icon": "import-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "UsrPointTransaction"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_f17ps63",
				"propertyName": "menuItems",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSearchFilter_p820pws",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "#ResourceString(GridDetailSearchFilter_p820pws_placeholder)#",
					"iconOnly": true,
					"_filterOptions": {
						"expose": [
							{
								"attribute": "GridDetailSearchFilter_p820pws_GridDetail_jdrcsnt",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"GridDetail_jdrcsnt"
										]
									}
								]
							}
						],
						"from": [
							"GridDetailSearchFilter_p820pws_SearchValue",
							"GridDetailSearchFilter_p820pws_FilteredColumnsGroups"
						]
					}
				},
				"parentName": "FlexContainer_ifik5tm",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_99qcsyo",
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
				"parentName": "ExpansionPanel_zrdtks4",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetail_jdrcsnt",
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
					"items": "$GridDetail_jdrcsnt",
					"primaryColumnName": "GridDetail_jdrcsntDS_Id",
					"columns": [
						{
							"id": "f0dec3f5-db89-e3ab-227a-c2ed8adbff61",
							"code": "GridDetail_jdrcsntDS_UsrName",
							"caption": "#ResourceString(GridDetail_jdrcsntDS_UsrName)#",
							"dataValueType": 28
						}
					],
					"placeholder": false,
					"visible": true,
					"fitContent": true
				},
				"parentName": "GridContainer_99qcsyo",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITRequestsTab",
				"values": {
					"type": "crt.TabContainer",
					"caption": "Requests",
					"items": [],
					"iconPosition": "only-text"
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "ExpansionPanel_c4o5u6o",
				"values": {
					"type": "crt.ExpansionPanel",
					"tools": [],
					"items": [],
					"title": "#ResourceString(ExpansionPanel_c4o5u6o_title)#",
					"toggleType": "material",
					"togglePosition": "before",
					"expanded": true,
					"labelColor": "#5B21A5",
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
				"parentName": "MCITRequestsTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_xjdvcub",
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
				"parentName": "ExpansionPanel_c4o5u6o",
				"propertyName": "tools",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_um43qn4",
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
				"parentName": "GridContainer_xjdvcub",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailAddBtn_xhib4wg",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailAddBtn_xhib4wg_caption)#",
					"icon": "add-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.CreateRecordRequest",
						"params": {
							"entityName": "UsrVMRequest"
						}
					},
					"visible": true,
					"clickMode": "default"
				},
				"parentName": "FlexContainer_um43qn4",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailRefreshBtn_7v3tzew",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailRefreshBtn_7v3tzew_caption)#",
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
							"dataSourceName": "GridDetail_a4btibxDS"
						}
					}
				},
				"parentName": "FlexContainer_um43qn4",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSettingsBtn_hrsx8qv",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailSettingsBtn_hrsx8qv_caption)#",
					"icon": "actions-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clickMode": "menu",
					"menuItems": []
				},
				"parentName": "FlexContainer_um43qn4",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridDetailExportDataBtn_2mu5j6j",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailExportDataBtn_2mu5j6j_caption)#",
					"icon": "export-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "GridDetail_a4btibx"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_hrsx8qv",
				"propertyName": "menuItems",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailImportDataBtn_35mdjgq",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailImportDataBtn_35mdjgq_caption)#",
					"icon": "import-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "UsrVMRequest"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_hrsx8qv",
				"propertyName": "menuItems",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSearchFilter_7usie6t",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "#ResourceString(GridDetailSearchFilter_7usie6t_placeholder)#",
					"iconOnly": true,
					"_filterOptions": {
						"expose": [
							{
								"attribute": "GridDetailSearchFilter_7usie6t_GridDetail_a4btibx",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"GridDetail_a4btibx"
										]
									}
								]
							}
						],
						"from": [
							"GridDetailSearchFilter_7usie6t_SearchValue",
							"GridDetailSearchFilter_7usie6t_FilteredColumnsGroups"
						]
					}
				},
				"parentName": "FlexContainer_um43qn4",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_g6ztflh",
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
				"parentName": "ExpansionPanel_c4o5u6o",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetail_a4btibx",
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
					"items": "$GridDetail_a4btibx",
					"visible": true,
					"fitContent": true,
					"primaryColumnName": "GridDetail_a4btibxDS_Id",
					"columns": [
						{
							"id": "fd1f5295-b784-ca2a-5e23-fe1df3b643dd",
							"code": "GridDetail_a4btibxDS_UsrName",
							"caption": "#ResourceString(GridDetail_a4btibxDS_UsrName)#",
							"dataValueType": 28
						},
						{
							"id": "37c64007-6c9e-a5c9-3a0d-7b7ead2a7742",
							"code": "GridDetail_a4btibxDS_UsrProject",
							"caption": "#ResourceString(GridDetail_a4btibxDS_UsrProject)#",
							"dataValueType": 10
						},
						{
							"id": "424308d3-f41c-e4d7-52f1-6115b624528f",
							"code": "GridDetail_a4btibxDS_CreatedBy",
							"caption": "#ResourceString(GridDetail_a4btibxDS_CreatedBy)#",
							"dataValueType": 10
						},
						{
							"id": "466b3056-8edb-89f9-82e8-57b78be1aa1f",
							"code": "GridDetail_a4btibxDS_CreatedOn",
							"caption": "#ResourceString(GridDetail_a4btibxDS_CreatedOn)#",
							"dataValueType": 7
						},
						{
							"id": "e4b4511c-db7a-2202-9071-ed29258e3e4f",
							"code": "GridDetail_a4btibxDS_UsrStatus",
							"caption": "#ResourceString(GridDetail_a4btibxDS_UsrStatus)#",
							"dataValueType": 10
						}
					],
					"placeholder": false
				},
				"parentName": "GridContainer_g6ztflh",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITMachinesTab",
				"values": {
					"type": "crt.TabContainer",
					"caption": "Virtual Machines",
					"items": [],
					"iconPosition": "only-text"
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "ExpansionPanel_ylyirfv",
				"values": {
					"type": "crt.ExpansionPanel",
					"tools": [],
					"items": [],
					"title": "#ResourceString(ExpansionPanel_ylyirfv_title)#",
					"toggleType": "material",
					"togglePosition": "before",
					"expanded": true,
					"labelColor": "#5B21A5",
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
				"parentName": "MCITMachinesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_z5r6dl6",
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
				"parentName": "ExpansionPanel_ylyirfv",
				"propertyName": "tools",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_8bkywp0",
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
				"parentName": "GridContainer_z5r6dl6",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailAddBtn_so8ylrh",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailAddBtn_so8ylrh_caption)#",
					"icon": "add-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.CreateRecordRequest",
						"params": {
							"entityName": "UsrVirtualMachine"
						}
					}
				},
				"parentName": "FlexContainer_8bkywp0",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailRefreshBtn_0ozai0w",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailRefreshBtn_0ozai0w_caption)#",
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
							"dataSourceName": "GridDetail_z5z8e00DS"
						}
					}
				},
				"parentName": "FlexContainer_8bkywp0",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSettingsBtn_diakm1l",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(GridDetailSettingsBtn_diakm1l_caption)#",
					"icon": "actions-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clickMode": "menu",
					"menuItems": []
				},
				"parentName": "FlexContainer_8bkywp0",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridDetailExportDataBtn_bt5ta49",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailExportDataBtn_bt5ta49_caption)#",
					"icon": "export-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ExportDataGridToExcelRequest",
						"params": {
							"viewName": "GridDetail_z5z8e00"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_diakm1l",
				"propertyName": "menuItems",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetailImportDataBtn_mi7u109",
				"values": {
					"type": "crt.MenuItem",
					"caption": "#ResourceString(GridDetailImportDataBtn_mi7u109_caption)#",
					"icon": "import-button-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "UsrVirtualMachine"
						}
					}
				},
				"parentName": "GridDetailSettingsBtn_diakm1l",
				"propertyName": "menuItems",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridDetailSearchFilter_68oyfbz",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "#ResourceString(GridDetailSearchFilter_68oyfbz_placeholder)#",
					"iconOnly": true,
					"_filterOptions": {
						"expose": [
							{
								"attribute": "GridDetailSearchFilter_68oyfbz_GridDetail_z5z8e00",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"GridDetail_z5z8e00"
										]
									}
								]
							}
						],
						"from": [
							"GridDetailSearchFilter_68oyfbz_SearchValue",
							"GridDetailSearchFilter_68oyfbz_FilteredColumnsGroups"
						]
					}
				},
				"parentName": "FlexContainer_8bkywp0",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_j7yg5n4",
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
				"parentName": "ExpansionPanel_ylyirfv",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridDetail_z5z8e00",
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
					"items": "$GridDetail_z5z8e00",
					"primaryColumnName": "GridDetail_z5z8e00DS_Id",
					"columns": [
						{
							"id": "08da89e0-9d49-905f-a84e-9f442ae37067",
							"code": "GridDetail_z5z8e00DS_UsrName",
							"caption": "#ResourceString(GridDetail_z5z8e00DS_UsrName)#",
							"dataValueType": 28
						}
					],
					"placeholder": false
				},
				"parentName": "GridContainer_j7yg5n4",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITDocumentsTab",
				"values": {
					"type": "crt.TabContainer",
					"caption": "Documents",
					"items": [],
					"iconPosition": "only-text"
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "FlexContainer_sm8swxb",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"alignItems": "center",
					"items": []
				},
				"parentName": "MCITDocumentsTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_1vjmo5v",
				"values": {
					"type": "crt.Label",
					"caption": "#ResourceString(AttachmentsTabContainerCaption)#",
					"labelType": "headline-3",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "#0D2E4E",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start"
				},
				"parentName": "FlexContainer_sm8swxb",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Button_tbioevj",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_tbioevjCaption)#",
					"icon": "upload-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.UploadFileRequest",
						"params": {
							"viewElementName": "AttachmentList"
						}
					}
				},
				"parentName": "FlexContainer_sm8swxb",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Button_spbhdwf",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_spbhdwfCaption)#",
					"icon": "reload-button-icon",
					"iconPosition": "only-icon",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.LoadDataRequest",
						"params": {
							"config": {
								"loadType": "reload"
							},
							"dataSourceName": "AttachmentListDS"
						}
					}
				},
				"parentName": "FlexContainer_sm8swxb",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "MCITDocumentsGrid",
				"values": {
					"type": "crt.DataGrid",
					"items": "$MCITDocumentsItems",
					"primaryColumnName": "MCITDocumentsDS_Id",
					"columns": [
						{
							"id": "c21cfe19-b43d-4c41-ae21-4ce6eceff007",
							"code": "MCITDocumentsDS_Name",
							"caption": "File name",
							"dataValueType": 28
						},
						{
							"id": "c21cfe19-b43d-4c41-ae21-4ce6eceff008",
							"code": "MCITDocumentsDS_CreatedOn",
							"caption": "Uploaded on",
							"dataValueType": 7
						},
						{
							"id": "c21cfe19-b43d-4c41-ae21-4ce6eceff009",
							"code": "MCITDocumentsDS_CreatedBy",
							"caption": "Uploaded by",
							"dataValueType": 10
						}
					],
					"placeholder": false
				},
				"parentName": "MCITDocumentsTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MCITAuditTab",
				"values": {
					"type": "crt.TabContainer",
					"caption": "Activity & Audit",
					"items": [],
					"iconPosition": "only-text"
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "GridContainer_qr4l4e8",
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
				"parentName": "MCITAuditTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITAuditCreatedBy",
				"values": {
					"type": "crt.ComboBox",
					"label": "Created by",
					"control": "$MCITAuditCreatedBy",
					"labelPosition": "above",
					"readonly": true,
					"isAddAllowed": false,
					"showValueAsLink": true,
					"controlActions": [],
					"listActions": [],
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_qr4l4e8",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "MCITAuditModifiedOn",
				"values": {
					"type": "crt.DateTimePicker",
					"label": "Modified on",
					"control": "$MCITAuditModifiedOn",
					"labelPosition": "above",
					"pickerType": "datetime",
					"readonly": true,
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_qr4l4e8",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "MCITAuditModifiedBy",
				"values": {
					"type": "crt.ComboBox",
					"label": "Modified by",
					"control": "$MCITAuditModifiedBy",
					"labelPosition": "above",
					"readonly": true,
					"isAddAllowed": false,
					"showValueAsLink": true,
					"controlActions": [],
					"listActions": [],
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 3,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_qr4l4e8",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "MCITAuditHint",
				"values": {
					"type": "crt.Label",
					"caption": "These fields show record creation and last modification. Use Feed for discussion. Detailed change history requires change logging to be configured.",
					"labelEllipsis": false,
					"labelColor": "#64748B",
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 4,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_qr4l4e8",
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
					"MCITContractName": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrName"
						}
					},
					"MCITContractNumber": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrNumber"
						}
					},
					"MCITContractStatus": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrStatus"
						}
					},
					"MCITContractStatus_List": {
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
					"MCITContractAuthority": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrAccount"
						}
					},
					"MCITContractAuthority_List": {
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
					"MCITContractReference": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrReference"
						}
					},
					"MCITContractStartDate": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrStartDate"
						}
					},
					"MCITContractEndDate": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrEndDate"
						}
					},
					"MCITContractBudget": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrInitialBudget"
						}
					},
					"MCITContractCurrency": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrCurrency"
						}
					},
					"MCITContractCurrency_List": {
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
					"MCITContractInitialPoints": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrInitialPoints"
						}
					},
					"MCITContractDescription": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrDescription"
						}
					},
					"MCITBusinessContact": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrBusinessContact"
						}
					},
					"MCITBusinessContact_List": {
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
					"MCITOperationalContact": {
						"modelConfig": {
							"path": "UsrMCITContractDS.UsrOperationalContact"
						}
					},
					"MCITOperationalContact_List": {
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
					"GridDetail_va48qvx": {
						"isCollection": true,
						"modelConfig": {
							"path": "GridDetail_va48qvxDS",
							"filterAttributes": [
								{
									"name": "GridDetailSearchFilter_6m356c3_GridDetail_va48qvx",
									"loadOnChange": true
								}
							],
							"sortingConfig": {
								"default": [
									{
										"direction": "desc",
										"columnName": "UsrEffectiveFrom"
									}
								]
							}
						},
						"viewModelConfig": {
							"attributes": {
								"GridDetail_va48qvxDS_UsrName": {
									"modelConfig": {
										"path": "GridDetail_va48qvxDS.UsrName"
									}
								},
								"GridDetail_va48qvxDS_UsrRAMGBPerPoint": {
									"modelConfig": {
										"path": "GridDetail_va48qvxDS.UsrRAMGBPerPoint"
									}
								},
								"GridDetail_va48qvxDS_UsrStorageGBPerPoint": {
									"modelConfig": {
										"path": "GridDetail_va48qvxDS.UsrStorageGBPerPoint"
									}
								},
								"GridDetail_va48qvxDS_UsrCPUPerPoint": {
									"modelConfig": {
										"path": "GridDetail_va48qvxDS.UsrCPUPerPoint"
									}
								},
								"GridDetail_va48qvxDS_UsrEffectiveFrom": {
									"modelConfig": {
										"path": "GridDetail_va48qvxDS.UsrEffectiveFrom"
									}
								},
								"GridDetail_va48qvxDS_UsrVersionNumber": {
									"modelConfig": {
										"path": "GridDetail_va48qvxDS.UsrVersionNumber"
									}
								},
								"GridDetail_va48qvxDS_Id": {
									"modelConfig": {
										"path": "GridDetail_va48qvxDS.Id"
									}
								}
							}
						}
					},
					"MCITSelectedTabIndex": {
						"value": 0
					},
					"MCITShowBalanceHelp": {
						"value": true
					},
					"MCITAuditCreatedOn": {
						"modelConfig": {
							"path": "UsrMCITContractDS.CreatedOn"
						}
					},
					"MCITAuditCreatedBy": {
						"modelConfig": {
							"path": "UsrMCITContractDS.CreatedBy"
						}
					},
					"MCITAuditModifiedOn": {
						"modelConfig": {
							"path": "UsrMCITContractDS.ModifiedOn"
						}
					},
					"MCITAuditModifiedBy": {
						"modelConfig": {
							"path": "UsrMCITContractDS.ModifiedBy"
						}
					},
					"MCITDocumentsItems": {
						"isCollection": true,
						"modelConfig": {
							"path": "MCITDocumentsDS",
							"sortingConfig": {
								"default": [
									{
										"direction": "asc",
										"columnName": "CreatedOn"
									}
								]
							}
						},
						"viewModelConfig": {
							"attributes": {
								"MCITDocumentsDS_Id": {
									"modelConfig": {
										"path": "MCITDocumentsDS.Id"
									}
								},
								"MCITDocumentsDS_Name": {
									"modelConfig": {
										"path": "MCITDocumentsDS.Name"
									}
								},
								"MCITDocumentsDS_CreatedOn": {
									"modelConfig": {
										"path": "MCITDocumentsDS.CreatedOn"
									}
								},
								"MCITDocumentsDS_CreatedBy": {
									"modelConfig": {
										"path": "MCITDocumentsDS.CreatedBy"
									}
								}
							}
						}
					},
					"MCITAuditCreatedBy_List": {
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
					"MCITAuditModifiedBy_List": {
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
					"GridDetail_jdrcsnt": {
						"isCollection": true,
						"modelConfig": {
							"path": "GridDetail_jdrcsntDS",
							"filterAttributes": [
								{
									"name": "GridDetailSearchFilter_p820pws_GridDetail_jdrcsnt",
									"loadOnChange": true
								},
								{
									"loadOnChange": true,
									"name": "GridDetail_jdrcsnt_PredefinedFilter"
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"GridDetail_jdrcsntDS_UsrName": {
									"modelConfig": {
										"path": "GridDetail_jdrcsntDS.UsrName"
									}
								},
								"GridDetail_jdrcsntDS_Id": {
									"modelConfig": {
										"path": "GridDetail_jdrcsntDS.Id"
									}
								}
							}
						}
					},
					"GridDetail_jdrcsnt_PredefinedFilter": {
						"value": null
					},
					"GridDetail_a4btibx": {
						"isCollection": true,
						"modelConfig": {
							"path": "GridDetail_a4btibxDS",
							"filterAttributes": [
								{
									"name": "GridDetailSearchFilter_7usie6t_GridDetail_a4btibx",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"GridDetail_a4btibxDS_UsrName": {
									"modelConfig": {
										"path": "GridDetail_a4btibxDS.UsrName"
									}
								},
								"GridDetail_a4btibxDS_UsrProject": {
									"modelConfig": {
										"path": "GridDetail_a4btibxDS.UsrProject"
									}
								},
								"GridDetail_a4btibxDS_CreatedBy": {
									"modelConfig": {
										"path": "GridDetail_a4btibxDS.CreatedBy"
									}
								},
								"GridDetail_a4btibxDS_CreatedOn": {
									"modelConfig": {
										"path": "GridDetail_a4btibxDS.CreatedOn"
									}
								},
								"GridDetail_a4btibxDS_UsrStatus": {
									"modelConfig": {
										"path": "GridDetail_a4btibxDS.UsrStatus"
									}
								},
								"GridDetail_a4btibxDS_Id": {
									"modelConfig": {
										"path": "GridDetail_a4btibxDS.Id"
									}
								}
							}
						}
					},
					"GridDetail_z5z8e00": {
						"isCollection": true,
						"modelConfig": {
							"path": "GridDetail_z5z8e00DS",
							"filterAttributes": [
								{
									"name": "GridDetailSearchFilter_68oyfbz_GridDetail_z5z8e00",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"GridDetail_z5z8e00DS_UsrName": {
									"modelConfig": {
										"path": "GridDetail_z5z8e00DS.UsrName"
									}
								},
								"GridDetail_z5z8e00DS_Id": {
									"modelConfig": {
										"path": "GridDetail_z5z8e00DS.Id"
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
					"primaryDataSourceName": "UsrMCITContractDS",
					"dependencies": {
						"GridDetail_va48qvxDS": [
							{
								"attributePath": "UsrContract",
								"relationPath": "UsrMCITContractDS.Id"
							}
						],
						"MCITDocumentsDS": [
							{
								"attributePath": "RecordId",
								"relationPath": "UsrMCITContractDS.Id"
							}
						],
						"GridDetail_jdrcsntDS": [
							{
								"attributePath": "UsrContract",
								"relationPath": "UsrMCITContractDS.Id"
							}
						],
						"GridDetail_a4btibxDS": [
							{
								"attributePath": "UsrContract",
								"relationPath": "UsrMCITContractDS.Id"
							}
						],
						"GridDetail_z5z8e00DS": [
							{
								"attributePath": "UsrContract",
								"relationPath": "UsrMCITContractDS.Id"
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
					"UsrMCITContractDS": {
						"type": "crt.EntityDataSource",
						"scope": "page",
						"config": {
							"entitySchemaName": "UsrMCITContract",
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
					"GridDetail_va48qvxDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "UsrContractConfigVersion",
							"attributes": {
								"UsrName": {
									"path": "UsrName"
								},
								"UsrRAMGBPerPoint": {
									"path": "UsrRAMGBPerPoint"
								},
								"UsrStorageGBPerPoint": {
									"path": "UsrStorageGBPerPoint"
								},
								"UsrCPUPerPoint": {
									"path": "UsrCPUPerPoint"
								},
								"UsrEffectiveFrom": {
									"path": "UsrEffectiveFrom"
								},
								"UsrVersionNumber": {
									"path": "UsrVersionNumber"
								}
							}
						}
					},
					"MCITDocumentsDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "SysFile",
							"attributes": {
								"Id": {
									"path": "Id"
								},
								"Name": {
									"path": "Name"
								},
								"CreatedOn": {
									"path": "CreatedOn"
								},
								"CreatedBy": {
									"path": "CreatedBy"
								}
							}
						}
					},
					"GridDetail_jdrcsntDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "UsrPointTransaction",
							"attributes": {
								"UsrName": {
									"path": "UsrName"
								}
							}
						}
					},
					"GridDetail_a4btibxDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "UsrVMRequest",
							"attributes": {
								"UsrName": {
									"path": "UsrName"
								},
								"UsrProject": {
									"path": "UsrProject"
								},
								"CreatedBy": {
									"path": "CreatedBy"
								},
								"CreatedOn": {
									"path": "CreatedOn"
								},
								"UsrStatus": {
									"path": "UsrStatus"
								}
							}
						}
					},
					"GridDetail_z5z8e00DS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "UsrVirtualMachine",
							"attributes": {
								"UsrName": {
									"path": "UsrName"
								}
							}
						}
					}
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[
			
	{
		request: "usr.ToggleBalanceHelp",
		handler: async (request) => {
			const isVisible =
				await request.$context.MCITShowBalanceHelp;

			request.$context.MCITShowBalanceHelp = !isVisible;
		}
	},
	{
		request: "usr.OpenContractLedger",
		handler: async (request) => {
			request.$context.MCITSelectedTabIndex = 3;
		}
	}

		]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});