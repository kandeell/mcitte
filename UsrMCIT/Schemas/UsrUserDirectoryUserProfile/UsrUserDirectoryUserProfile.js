define("UsrUserDirectoryUserProfile", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "TitleContainer",
				"values": {
					"alignItems": "center",
					"visible": false,
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					},
					"color": "transparent",
					"borderRadius": "none",
					"gap": "small"
				}
			},
			{
				"operation": "remove",
				"name": "BackButton"
			},
			{
				"operation": "remove",
				"name": "PageTitle"
			},
			{
				"operation": "merge",
				"name": "ActionButtonsContainer",
				"values": {
					"visible": false,
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					},
					"color": "transparent",
					"borderRadius": "none",
					"alignItems": "stretch",
					"gap": "small"
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
				"name": "CancelButton",
				"values": {
					"color": "default",
					"size": "large",
					"iconPosition": "only-text"
				}
			},
			{
				"operation": "remove",
				"name": "MainHeaderBottom"
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
				"name": "CardToggleContainer"
			},
			{
				"operation": "remove",
				"name": "CardButtonToggleGroup"
			},
			{
				"operation": "merge",
				"name": "CardContentWrapper",
				"values": {
					"classes": [
						"usr-pv2-content"
					]
				}
			},
			{
				"operation": "merge",
				"name": "SideContainer",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				}
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
					"classes": [
						"usr-pv3-center"
					]
				}
			},
			{
				"operation": "move",
				"name": "CenterContainer",
				"parentName": "CardContentWrapper",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "Tabs",
				"values": {
					"styleType": "default",
					"mode": "tab",
					"bodyBackgroundColor": "transparent",
					"selectedTabTitleColor": "primary",
					"tabTitleColor": "auto",
					"underlineSelectedTabColor": "primary",
					"headerBackgroundColor": "transparent",
					"allowToggleClose": true,
					"classes": [
						"usr-pv2-tabs"
					]
				}
			},
			{
				"operation": "merge",
				"name": "GeneralInfoTab",
				"values": {
					"caption": "Profile",
					"classes": [
						"usr-pv5-profile-tab"
					],
					"iconPosition": "only-text",
					"visible": true
				}
			},
			{
				"operation": "merge",
				"name": "GeneralInfoTabContainer",
				"values": {
					"visible": false
				}
			},
			{
				"operation": "remove",
				"name": "CardToggleTabPanel"
			},
			{
				"operation": "remove",
				"name": "FeedTabContainer"
			},
			{
				"operation": "remove",
				"name": "Feed"
			},
			{
				"operation": "remove",
				"name": "FeedTabContainerHeaderContainer"
			},
			{
				"operation": "remove",
				"name": "FeedTabContainerHeaderLabel"
			},
			{
				"operation": "remove",
				"name": "AttachmentsTabContainer"
			},
			{
				"operation": "remove",
				"name": "AttachmentList"
			},
			{
				"operation": "remove",
				"name": "AttachmentsTabContainerHeaderContainer"
			},
			{
				"operation": "remove",
				"name": "AttachmentsTabContainerHeaderLabel"
			},
			{
				"operation": "remove",
				"name": "AttachmentAddButton"
			},
			{
				"operation": "remove",
				"name": "AttachmentRefreshButton"
			},
			{
				"operation": "insert",
				"name": "GridContainer_ooebxdg",
				"values": {
					"classes": [
						"usr-pv3-top-shell"
					],
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
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					}
				},
				"parentName": "CenterContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Back",
				"values": {
					"type": "crt.Button",
					"caption": "‹  Back to User Directory",
					"displayType": "text",
					"color": "primary",
					"size": "small",
					"iconPosition": "only-text",
					"classes": [
						"usr-pv2-back"
					],
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"clicked": {
						"request": "crt.ClosePageRequest"
					}
				},
				"parentName": "GridContainer_ooebxdg",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_s1qobvq",
				"values": {
					"classes": [
						"usr-pv3-header-card"
					],
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
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
					"color": "transparent",
					"borderRadius": "medium",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"right": "medium",
						"left": "medium"
					}
				},
				"parentName": "GridContainer_ooebxdg",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrPV2HeaderGrid",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"56px",
						"minmax(0,1fr)",
						"minmax(160px,230px)"
					],
					"rows": "minmax(72px,max-content)",
					"gap": {
						"columnGap": "medium",
						"rowGap": "none"
					},
					"items": [],
					"fitContent": false,
					"alignItems": "center",
					"classes": [
						"usr-pv2-header-grid"
					],
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					}
				},
				"parentName": "GridContainer_s1qobvq",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Avatar",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "small",
					"alignItems": "center",
					"justifyContent": "center",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-avatar"
					],
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrPV2HeaderGrid",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2AvatarLabel",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrPV4DisplayName | usr.PV2Initial",
					"labelType": "headline-2",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2Avatar",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Identity",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"gap": "small",
					"alignItems": "flex-start",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-identity"
					],
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrPV2HeaderGrid",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrPV2NameBox",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-name"
					]
				},
				"parentName": "UsrPV2Identity",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2NameText",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrPV4DisplayName | usr.PV2Text",
					"labelType": "headline-2",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2NameBox",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2DirectoryBox",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-directory"
					]
				},
				"parentName": "UsrPV2Identity",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrPV2DirectoryText",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrPV4DirectoryId | usr.PV2Text",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2DirectoryBox",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2OrgBox",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-org"
					]
				},
				"parentName": "UsrPV2Identity",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrPV2OrgText",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrPV3HeaderOrganization | usr.PV2Text",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2OrgBox",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Right",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"gap": "small",
					"alignItems": "flex-end",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-right"
					],
					"layoutConfig": {
						"column": 3,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrPV2HeaderGrid",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrPV2StatusPill",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": "$PDS_UsrUserStatus_6ttxs91 | usr.PV2StatusClasses"
				},
				"parentName": "UsrPV2Right",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2StatusValue",
				"values": {
					"type": "crt.Label",
					"caption": "$PDS_UsrUserStatus_6ttxs91 | usr.PV2Text",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2StatusPill",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2SignInRow",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "small",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-date-row"
					]
				},
				"parentName": "UsrPV2Right",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrPV2SignInRowKey",
				"values": {
					"type": "crt.Label",
					"caption": "Last sign-in:",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2SignInRow",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2SignInRowDate",
				"values": {
					"type": "crt.Label",
					"caption": "$PDS_UsrLastSignIn | usr.PV2Date",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2SignInRow",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrPV2ChangedRow",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "small",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-date-row"
					]
				},
				"parentName": "UsrPV2Right",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrPV2ChangedRowKey",
				"values": {
					"type": "crt.Label",
					"caption": "Last change:",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2ChangedRow",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2ChangedRowDate",
				"values": {
					"type": "crt.Label",
					"caption": "$PDS_ModifiedOn | usr.PV2Date",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2ChangedRow",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrPV2InformationPanel",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "stretch",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-panel"
					]
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2InfoHeading",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-heading"
					]
				},
				"parentName": "UsrPV2InformationPanel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2InfoHeadingText",
				"values": {
					"type": "crt.Label",
					"caption": "Profile Information",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2InfoHeading",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2InfoGrid",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(0,1fr)",
						"minmax(0,1fr)"
					],
					"rows": "repeat(4,minmax(max-content,36px))",
					"gap": {
						"columnGap": "large",
						"rowGap": "small"
					},
					"items": [],
					"fitContent": true,
					"alignItems": "center",
					"classes": [
						"usr-pv2-info-grid"
					],
					"padding": {
						"top": "large",
						"right": "large",
						"bottom": "large",
						"left": "large"
					}
				},
				"parentName": "UsrPV2InformationPanel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info1",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "medium",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-row"
					],
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrPV2InfoGrid",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info1Key",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-key"
					]
				},
				"parentName": "UsrPV2Info1",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info1KeyText",
				"values": {
					"type": "crt.Label",
					"caption": "Display Name",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2Info1Key",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info1Value",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-value"
					]
				},
				"parentName": "UsrPV2Info1",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info1ValueText",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrPV4DisplayName | usr.PV2Text",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2Info1Value",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info2",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "medium",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-row"
					],
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrPV2InfoGrid",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info2Key",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-key"
					]
				},
				"parentName": "UsrPV2Info2",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info2KeyText",
				"values": {
					"type": "crt.Label",
					"caption": "Email",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2Info2Key",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info2Value",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-value"
					]
				},
				"parentName": "UsrPV2Info2",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info2ValueText",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrPV4Email | usr.PV2Text",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2Info2Value",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info3",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "medium",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-row"
					],
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrPV2InfoGrid",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info3Key",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-key"
					]
				},
				"parentName": "UsrPV2Info3",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info3KeyText",
				"values": {
					"type": "crt.Label",
					"caption": "Organization",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2Info3Key",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info3Value",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-value"
					]
				},
				"parentName": "UsrPV2Info3",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info3ValueText",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrPV3Organization | usr.PV2Text",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2Info3Value",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info4",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "medium",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-row"
					],
					"layoutConfig": {
						"column": 2,
						"row": 2,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrPV2InfoGrid",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info4Key",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-key"
					]
				},
				"parentName": "UsrPV2Info4",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info4KeyText",
				"values": {
					"type": "crt.Label",
					"caption": "Department",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2Info4Key",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info4Value",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-value"
					]
				},
				"parentName": "UsrPV2Info4",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info4ValueText",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrPV3Department | usr.PV2Text",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2Info4Value",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info5",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "medium",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-row"
					],
					"layoutConfig": {
						"column": 1,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrPV2InfoGrid",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info5Key",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-key"
					]
				},
				"parentName": "UsrPV2Info5",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info5KeyText",
				"values": {
					"type": "crt.Label",
					"caption": "Directory ID",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2Info5Key",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info5Value",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-value",
						"usr-pv2-purple"
					]
				},
				"parentName": "UsrPV2Info5",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info5ValueText",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrPV4DirectoryId | usr.PV2Text",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2Info5Value",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info6",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "medium",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-row"
					],
					"layoutConfig": {
						"column": 2,
						"row": 3,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrPV2InfoGrid",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info6Key",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-key"
					]
				},
				"parentName": "UsrPV2Info6",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info6KeyText",
				"values": {
					"type": "crt.Label",
					"caption": "Status",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2Info6Key",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info6Value",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": "$PDS_UsrUserStatus_6ttxs91 | usr.PV4InfoStatusClasses"
				},
				"parentName": "UsrPV2Info6",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info6ValueText",
				"values": {
					"type": "crt.Label",
					"caption": "$PDS_UsrUserStatus_6ttxs91 | usr.PV2Text",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2Info6Value",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info7",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "medium",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-row"
					],
					"layoutConfig": {
						"column": 1,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrPV2InfoGrid",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info7Key",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-key"
					]
				},
				"parentName": "UsrPV2Info7",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info7KeyText",
				"values": {
					"type": "crt.Label",
					"caption": "Activated By",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2Info7Key",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info7Value",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-value"
					]
				},
				"parentName": "UsrPV2Info7",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info7ValueText",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrPV3ActivatedBy | usr.PV2Text",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2Info7Value",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info8",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "medium",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-row"
					],
					"layoutConfig": {
						"column": 2,
						"row": 4,
						"colSpan": 1,
						"rowSpan": 1
					}
				},
				"parentName": "UsrPV2InfoGrid",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info8Key",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-key"
					]
				},
				"parentName": "UsrPV2Info8",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info8KeyText",
				"values": {
					"type": "crt.Label",
					"caption": "Activated At",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2Info8Key",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info8Value",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"gap": "none",
					"alignItems": "center",
					"justifyContent": "start",
					"visible": true,
					"fitContent": true,
					"classes": [
						"usr-pv2-info-value"
					]
				},
				"parentName": "UsrPV2Info8",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrPV2Info8ValueText",
				"values": {
					"type": "crt.Label",
					"caption": "$UsrPV3ActivatedAt | usr.PV2Date",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"visible": true
				},
				"parentName": "UsrPV2Info8Value",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ComboBox_yd6nxig",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.PDS_UsrUser_9i5hmwm",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "auto",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$PDS_UsrUser_9i5hmwm",
					"visible": true,
					"readonly": true,
					"placeholder": ""
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "addRecord_xs3kfpk",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_xs3kfpk_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_yd6nxig",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ComboBox_9ycf4p8",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.PDS_UsrUserStatus_6ttxs91",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "auto",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$PDS_UsrUserStatus_6ttxs91",
					"visible": true,
					"readonly": true,
					"placeholder": ""
				},
				"parentName": "GeneralInfoTabContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "addRecord_8ugsy8q",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_8ugsy8q_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_9ycf4p8",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TabContainer_np9tzi9",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "Roles",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_pwspun1",
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
				"parentName": "TabContainer_np9tzi9",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV8RolesMount",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true,
					"visible": true,
					"alignItems": "stretch",
					"justifyContent": "start",
					"gap": "none",
					"classes": [
						"usr-pv8-roles-mount"
					],
					"color": "transparent",
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					}
				},
				"parentName": "TabContainer_np9tzi9",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TabContainer_gwvqxri",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "Access Scopes",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridContainer_qnlz1ii",
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
				"parentName": "TabContainer_gwvqxri",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV10ScopesMount",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true,
					"visible": true,
					"alignItems": "stretch",
					"justifyContent": "start",
					"gap": "none",
					"classes": [
						"usr-pv10-scopes-mount"
					],
					"color": "transparent",
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					}
				},
				"parentName": "TabContainer_gwvqxri",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TabContainer_a97xogw",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "Queue Assignments",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_vir7h3d",
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
				"parentName": "TabContainer_a97xogw",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV12QueuesMount",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true,
					"visible": true,
					"alignItems": "stretch",
					"justifyContent": "start",
					"gap": "none",
					"classes": [
						"usr-pv12-queues-mount"
					],
					"color": "transparent",
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					}
				},
				"parentName": "TabContainer_a97xogw",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TabContainer_zeklni2",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "Effective Permissions",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "GridContainer_ey85pk3",
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
				"parentName": "TabContainer_zeklni2",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV14PermissionsMount",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true,
					"visible": true,
					"alignItems": "stretch",
					"gap": "none",
					"classes": [
						"usr-pv14-permissions-mount"
					],
					"color": "transparent",
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					}
				},
				"parentName": "TabContainer_zeklni2",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TabContainer_4qlnazl",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "Activity & Audit",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "Tabs",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "GridContainer_9ehsx4c",
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
				"parentName": "TabContainer_4qlnazl",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPV18ActivityAuditMount",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true,
					"visible": true,
					"alignItems": "stretch",
					"justifyContent": "start",
					"gap": "none",
					"classes": [
						"usr-pv18-audit-mount"
					],
					"color": "transparent",
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					}
				},
				"parentName": "TabContainer_4qlnazl",
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
					"UsrPV4DisplayName": {},
					"UsrPV4Email": {},
					"UsrPV4DirectoryId": {},
					"UsrPV3Organization": {},
					"UsrPV3HeaderOrganization": {},
					"UsrPV3Department": {},
					"UsrPV3ActivatedBy": {},
					"UsrPV3ActivatedAt": {},
					"PDS_UsrUser_Contact": {
						"modelConfig": {
							"path": "PDS.UsrUser.Contact"
						}
					},
					"PDS_UsrUser_Contact_Email": {
						"modelConfig": {
							"path": "PDS.UsrUser.Contact.Email"
						}
					},
					"PDS_UsrUser_Contact_Account": {
						"modelConfig": {
							"path": "PDS.UsrUser.Contact.Account"
						}
					},
					"PDS_UsrUser_Name": {
						"modelConfig": {
							"path": "PDS.UsrUser.Name"
						}
					},
					"PDS_UsrLastSignIn": {
						"modelConfig": {
							"path": "PDS.UsrLastSignIn"
						}
					},
					"PDS_ModifiedOn": {
						"modelConfig": {
							"path": "PDS.ModifiedOn"
						}
					},
					"PDS_UsrUser_9i5hmwm": {
						"modelConfig": {
							"path": "PDS.UsrUser"
						}
					},
					"PDS_UsrUser_9i5hmwm_List": {
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
					"PDS_UsrUserStatus_6ttxs91": {
						"modelConfig": {
							"path": "PDS.UsrUserStatus"
						}
					},
					"PDS_UsrUserStatus_6ttxs91_List": {
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
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"Id",
					"modelConfig"
				],
				"values": {
					"path": "PDS.Id"
				}
			}
		]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [],
				"values": {
					"primaryDataSourceName": "PDS"
				}
			},
			{
				"operation": "merge",
				"path": [
					"dataSources"
				],
				"values": {
					"PDS": {
						"type": "crt.EntityDataSource",
						"config": {
							"entitySchemaName": "UsrMCITPortalUserAccess"
						},
						"scope": "page"
					}
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[
    {
        request: "crt.HandleViewModelInitRequest",
        handler: async (request, next) => {
            const result = await next?.handle(request);
            if (typeof document === "undefined") return result;
            // Remove V5 stylesheet: it accidentally colored the entire indicator purple.
            document.getElementById("usr-mcit-userprofile-v5-style")?.remove();
            document.getElementById("usr-mcit-userprofile-v6-style")?.remove();
            document.getElementById("usr-mcit-userprofile-v4-style")?.remove();
            const styleId = "usr-mcit-userprofile-v7-style";
            if (!document.getElementById(styleId)) {
                const style = document.createElement("style");
                style.id = styleId;
                style.textContent = "/* User Profile V4: scoped. The header and tabs are both inside CenterContainer. */\nbody .usr-pv2-content { width:min(1240px,calc(100% - 32px)) !important; max-width:1240px !important; margin:0 auto !important; display:block !important; background:transparent !important; box-sizing:border-box !important; }\nbody .usr-pv3-center { width:100% !important; max-width:1240px !important; min-width:0 !important; margin:0 auto !important; display:flex !important; flex-direction:column !important; align-items:stretch !important; gap:0 !important; box-sizing:border-box !important; }\nbody .usr-pv3-top-shell { display:grid !important; width:100% !important; max-width:1240px !important; min-width:0 !important; margin:0 auto 10px !important; padding:0 !important; row-gap:8px !important; box-sizing:border-box !important; background:transparent !important; }\nbody .usr-pv2-back { justify-self:start !important; text-align:left !important; margin:0 0 5px !important; color:#6e25dc !important; font-weight:600 !important; font-size:12px !important; }\nbody .usr-pv3-header-card { box-sizing:border-box !important; background:#fff !important; border:1px solid #dde4ef !important; border-radius:11px !important; padding:14px 18px !important; min-height:108px !important; box-shadow:none !important; width:100% !important; max-width:100% !important; }\nbody .usr-pv2-header-grid { display:grid !important; width:100% !important; grid-template-columns:52px minmax(0,1fr) 215px !important; column-gap:12px !important; min-height:77px !important; align-items:center !important; }\nbody .usr-pv2-avatar { width:44px !important; height:44px !important; min-width:44px !important; min-height:44px !important; border-radius:50% !important; background:#6924d8 !important; display:flex !important; justify-content:center !important; align-items:center !important; box-sizing:border-box !important; }\nbody .usr-pv2-avatar * { color:#fff !important; font-size:19px !important; font-weight:700 !important; }\nbody .usr-pv2-identity { min-width:0 !important; gap:3px !important; align-items:flex-start !important; }\nbody .usr-pv2-name * { font-weight:750 !important; font-size:18px !important; line-height:1.15 !important; color:#0d1a37 !important; }\nbody .usr-pv2-directory { width:fit-content !important; padding:3px 6px !important; border-radius:4px !important; background:#f2eaff !important; }\nbody .usr-pv2-directory * { font-size:11px !important; color:#6f26dd !important; }\nbody .usr-pv2-org * { font-size:12px !important; color:#596e90 !important; line-height:1.3 !important; }\nbody .usr-pv2-right { align-items:flex-end !important; justify-self:end !important; margin-left:auto !important; gap:5px !important; }\nbody .usr-pv2-status { width:fit-content !important; display:inline-flex !important; align-items:center !important; padding:4px 10px !important; border-radius:24px !important; font-weight:600 !important; }\nbody .usr-pv2-status * { font-size:11px !important; font-weight:600 !important; }\nbody .usr-pv2-status-active { background:#e6f9ed !important; }\nbody .usr-pv2-status-active * { color:#008f47 !important; }\nbody .usr-pv2-status-inactive { background:#fff3df !important; }\nbody .usr-pv2-status-inactive * { color:#a66a00 !important; }\nbody .usr-pv2-status-deactivated { background:#ffebef !important; }\nbody .usr-pv2-status-deactivated * { color:#c82642 !important; }\nbody .usr-pv2-date-row * { font-size:11px !important; color:#8295b4 !important; }\nbody .usr-pv2-tabs { width:100% !important; max-width:100% !important; min-width:0 !important; margin:0 !important; background:transparent !important; box-shadow:none !important; }\nbody .usr-pv2-info-panel { box-sizing:border-box !important; width:100% !important; min-width:0 !important; background:#fff !important; border:1px solid #dde4ed !important; border-radius:11px !important; overflow:hidden !important; padding:0 !important; box-shadow:none !important; }\nbody .usr-pv2-info-heading { width:100% !important; box-sizing:border-box !important; padding:14px 17px !important; background:#fff !important; border-bottom:1px solid #e7ebf1 !important; }\nbody .usr-pv2-info-heading * { color:#10264c !important; font-weight:700 !important; font-size:12px !important; }\nbody .usr-pv2-info-grid { box-sizing:border-box !important; width:100% !important; grid-template-columns:minmax(0,1fr) minmax(0,1fr) !important; gap:6px 28px !important; min-height:0 !important; padding:17px 18px !important; }\nbody .usr-pv2-info-row { box-sizing:border-box !important; min-width:0 !important; display:flex !important; flex-wrap:nowrap !important; align-items:center !important; min-height:29px !important; }\nbody .usr-pv2-info-key { flex:0 0 130px !important; width:130px !important; }\nbody .usr-pv2-info-key * { color:#8194b5 !important; font-size:11px !important; }\nbody .usr-pv2-info-value { min-width:0 !important; }\nbody .usr-pv2-info-value * { color:#182f52 !important; font-size:12px !important; font-weight:550 !important; }\nbody .usr-pv2-purple * { color:#7326e6 !important; }\nbody .usr-pv2-info-status { display:inline-flex !important; width:fit-content !important; background:#e6f9ed !important; border-radius:30px !important; padding:3px 9px !important; }\nbody .usr-pv2-info-status-active { background:#e6f9ed !important; }\nbody .usr-pv2-info-status-active * { color:#008f47 !important; }\nbody .usr-pv2-info-status-inactive { background:#fff3df !important; }\nbody .usr-pv2-info-status-inactive * { color:#a66a00 !important; }\nbody .usr-pv2-info-status-deactivated { background:#ffebef !important; }\nbody .usr-pv2-info-status-deactivated * { color:#c82642 !important; }\nbody .usr-pv2-info-status-neutral { background:#eef2f7 !important; }\n@media (max-width:850px) {\n body .usr-pv2-content { width:calc(100% - 20px) !important; }\n body .usr-pv2-header-grid { grid-template-columns:50px minmax(0,1fr) !important; }\n body .usr-pv2-right { grid-column:2 !important; justify-self:start !important; margin-left:0 !important; align-items:flex-start !important; }\n body .usr-pv2-info-grid { grid-template-columns:minmax(0,1fr) !important; }\n body .usr-pv2-info-key { flex-basis:105px !important; width:105px !important; }\n}\n\n\n\n/* V6: visual polish only. Does not modify bindings, tabs or business logic. */\nbody .usr-pv2-content {\n  width:min(1240px,calc(100% - 32px)) !important;\n  max-width:1240px !important;\n  margin:0 auto !important;\n  padding:0 !important;\n}\nbody .usr-pv3-center, body .usr-pv3-top-shell {\n  max-width:1240px !important;\n  width:100% !important;\n  min-width:0 !important;\n}\nbody .usr-pv3-top-shell {\n  margin-bottom:18px !important;\n  row-gap:12px !important;\n}\nbody .usr-pv3-header-card {\n  min-height:112px !important;\n  padding:15px 20px !important;\n  border-radius:12px !important;\n  border:1px solid #dce3ef !important;\n  background:#fff !important;\n}\nbody .usr-pv2-back { margin-bottom:0 !important; }\nbody .usr-pv2-tabs {\n  background:transparent !important;\n  border:0 !important;\n  box-shadow:none !important;\n  width:100% !important;\n  min-width:0 !important;\n  max-width:100% !important;\n  padding:0 !important;\n  margin:0 !important;\n}\n/* Target HEADER only, not the tab body. No blanket wildcard on the entire tabs component. */\nbody .usr-pv2-tabs :is([role=\"tablist\"],.mat-mdc-tab-header,.mat-tab-header,.crt-tabs-header,.crt-tabs__header,.tab-list,.tabs-header) {\n  background:transparent !important;\n  box-shadow:none !important;\n  border:0 !important;\n  border-bottom:1px solid #dce3ef !important;\n  padding:0 !important;\n  min-height:44px !important;\n}\nbody .usr-pv2-tabs :is([role=\"tab\"],.mat-mdc-tab,.mat-tab-label,.crt-tabs__tab,.tab-item) {\n  background:transparent !important;\n  background-color:transparent !important;\n  background-image:none !important;\n  box-shadow:none !important;\n  border:0 !important;\n  border-radius:0 !important;\n  min-height:42px !important;\n  padding:0 17px !important;\n  color:#617491 !important;\n  font-size:13px !important;\n  font-weight:500 !important;\n  letter-spacing:0 !important;\n  text-transform:none !important;\n  white-space:nowrap !important;\n}\nbody .usr-pv2-tabs :is([role=\"tab\"],.mat-mdc-tab,.mat-tab-label,.crt-tabs__tab,.tab-item) :is(.mdc-tab__text-label,.mat-tab-label-content,span) {\n  background:transparent !important;\n  color:inherit !important;\n  font-size:inherit !important;\n  text-transform:none !important;\n}\nbody .usr-pv2-tabs :is([role=\"tab\"][aria-selected=\"true\"],.mat-mdc-tab[aria-selected=\"true\"],.mat-tab-label-active,.crt-tabs__tab--active,.tab-item.active) {\n  background:transparent !important;\n  color:#6d28d9 !important;\n  font-weight:700 !important;\n  border-bottom:2px solid #6d28d9 !important;\n}\n/* Crucial V5 regression fix: mdc-tab-indicator covers THE WHOLE TAB.\n   Never give that element a purple background; only its underline border. */\nbody .usr-pv2-tabs .mdc-tab-indicator,\nbody .usr-pv2-tabs .mdc-tab-indicator__content,\nbody .usr-pv2-tabs .mdc-tab-indicator__content--underline,\nbody .usr-pv2-tabs .mat-ink-bar {\n  background:transparent !important;\n  background-color:transparent !important;\n  background-image:none !important;\n}\nbody .usr-pv2-tabs .mdc-tab-indicator__content--underline { border-color:#6d28d9 !important; }\nbody .usr-pv2-tabs :is(.mat-mdc-tab-body-wrapper,.mat-tab-body-wrapper,.crt-tabs__body,.crt-tabs-body,.crt-tabs__content,.tab-content,[role=\"tabpanel\"]) {\n  background:transparent !important;\n  border:0 !important;\n  box-shadow:none !important;\n  padding-left:0 !important;\n  padding-right:0 !important;\n}\nbody .usr-pv2-tabs .usr-pv2-info-panel {\n  display:block !important;\n  width:100% !important;\n  max-width:none !important;\n  margin:18px 0 0 0 !important;\n  padding:0 !important;\n  box-sizing:border-box !important;\n  border:1px solid #dce3ef !important;\n  border-radius:12px !important;\n  background:#fff !important;\n  overflow:hidden !important;\n}\nbody .usr-pv2-info-heading {\n  padding:17px 20px !important;\n  border-bottom:1px solid #e9edf4 !important;\n}\nbody .usr-pv2-info-grid {\n  padding:18px 20px 22px !important;\n  grid-template-columns:minmax(0,1fr) minmax(0,1fr) !important;\n  row-gap:6px !important;\n  column-gap:30px !important;\n}\nbody .usr-pv2-info-row { min-height:32px !important; }\nbody .usr-pv2-info-key { flex-basis:170px !important; width:170px !important; }\n@media(max-width:920px) {\n  body .usr-pv2-content { width:calc(100% - 20px) !important; }\n  body .usr-pv2-tabs :is([role=\"tab\"],.mat-mdc-tab,.mat-tab-label,.crt-tabs__tab,.tab-item) { padding:0 9px !important; font-size:12px !important; }\n  body .usr-pv2-info-key { flex-basis:115px !important; width:115px !important; }\n  body .usr-pv2-info-grid { column-gap:16px !important; }\n}\n@media(max-width:650px) {\n  body .usr-pv2-info-grid { grid-template-columns:minmax(0,1fr) !important; }\n  body .usr-pv2-header-grid { grid-template-columns:50px minmax(0,1fr) !important; }\n  body .usr-pv2-right { grid-column:2 !important; margin-left:0 !important; align-items:flex-start !important; }\n}\n\n/* V7: matching profile layout; only the SELECTED tab is purple. */\nbody .usr-pv2-tabs {\n  background:transparent !important;\n  box-shadow:none !important;\n  border:0 !important;\n  overflow:visible !important;\n}\n/* The native tab bar has no button backgrounds. Text state is synchronized on click. */\nbody .usr-pv2-tabs [data-mcit-profile-tab-caption] {\n  color:#74829b !important;\n  font-weight:500 !important;\n  background:transparent !important;\n  box-shadow:none !important;\n  text-transform:none !important;\n}\nbody .usr-pv2-tabs [data-mcit-profile-tab-caption=\"active\"] {\n  color:#6d28d9 !important;\n  font-weight:700 !important;\n}\n/* The selected underline stays purple, but there is no purple filled background. */\nbody .usr-pv2-tabs :is(.mdc-tab-indicator,.mdc-tab-indicator__content,.mat-ink-bar) {\n  background:transparent !important;\n}\nbody .usr-pv2-tabs :is(.mdc-tab-indicator__content--underline) {\n  border-color:#6d28d9 !important;\n}\n/* Never translate/expand the profile card past its tab content viewport. */\nbody .usr-pv2-tabs .usr-pv2-info-panel {\n  width:100% !important;\n  max-width:100% !important;\n  min-width:0 !important;\n  margin:18px 0 0 !important;\n  box-sizing:border-box !important;\n  overflow:hidden !important;\n  border-radius:12px !important;\n  border:1px solid #dce3ef !important;\n}\nbody .usr-pv2-tabs .usr-pv2-info-grid {\n  width:100% !important;\n  min-width:0 !important;\n  max-width:100% !important;\n  box-sizing:border-box !important;\n}\nbody .usr-pv2-tabs .usr-pv2-info-row { min-width:0 !important; }\n";
                document.head.appendChild(style);
            }
            // Access Scopes stylesheet is self-contained and does not alter Profile / Roles.
            document.getElementById("usr-mcit-userprofile-v10-scopes-style")?.remove();
            const scopeStyle = document.createElement("style");
            scopeStyle.id = "usr-mcit-userprofile-v10-scopes-style";
            scopeStyle.textContent = '/* Access Scopes: isolated to the new tab, no mutations to V9 styles. */\nbody .usr-pv10-scopes-mount { display:block!important; width:100%!important; max-width:100%!important; min-width:0!important; align-self:stretch!important; box-sizing:border-box!important; padding:0!important; margin:18px 0 0!important; }\nbody .usr-pv10-card { font-family:inherit; box-sizing:border-box; width:100%; max-width:100%; overflow:hidden; border:1px solid #dce3ef; border-radius:12px; background:white; color:#12284a; font-size:12px; }\nbody .usr-pv10-head { display:flex; align-items:center; justify-content:space-between; padding:15px 18px; min-height:53px; gap:12px; box-sizing:border-box; border-bottom:1px solid #e8edf4; }\nbody .usr-pv10-title {font-size:13px;font-weight:750;color:#102648}\nbody .usr-pv10-edit {border:1px solid #dce3ed;background:white;border-radius:9px;padding:7px 12px;color:#243b5c;font-size:12px;font-weight:600;cursor:pointer}\nbody .usr-pv10-edit:hover {border-color:#8137dd;color:#6921d1}\nbody .usr-pv10-body {padding:18px 17px 17px;box-sizing:border-box}\nbody .usr-pv10-warning {display:flex;align-items:center;gap:10px;box-sizing:border-box;border:1px solid #fbd46c;background:#fffae9;border-radius:9px;min-height:44px;padding:10px 14px;color:#965117;font-size:12px;margin-bottom:15px}\nbody .usr-pv10-warning b {color:#974b11}\nbody .usr-pv10-table-scroll {width:100%;overflow-x:auto}\nbody .usr-pv10-table {width:100%;min-width:640px;border-collapse:collapse;table-layout:fixed;text-align:left;font-size:12px}\nbody .usr-pv10-table th {font-size:11px;color:#344e73;font-weight:700;border-bottom:1px solid #dce4ef;padding:10px 10px}\nbody .usr-pv10-table td {color:#536884;padding:10px;border-bottom:1px solid #e9edf4;vertical-align:middle;line-height:1.5;overflow-wrap:anywhere}\nbody .usr-pv10-table tr:last-child td {border-bottom:0}\nbody .usr-pv10-table th:nth-child(1),body .usr-pv10-table td:nth-child(1) {width:17%}\nbody .usr-pv10-table th:nth-child(2),body .usr-pv10-table td:nth-child(2) {width:16%}\nbody .usr-pv10-table th:nth-child(3),body .usr-pv10-table td:nth-child(3) {width:37%}\nbody .usr-pv10-table th:nth-child(4),body .usr-pv10-table td:nth-child(4) {width:30%}\nbody .usr-pv10-scope-name {color:#16294a!important;font-weight:700}\nbody .usr-pv10-badge {display:inline-block;vertical-align:middle;border-radius:50px;padding:4px 9px;white-space:nowrap;font-size:11px;font-weight:650;background:#efe8ff;color:#6724c9}\nbody .usr-pv10-badge--green {background:#e8f9ef;color:#07874b}\nbody .usr-pv10-badge--muted {background:#f1f3f7;color:#697d99}\nbody .usr-pv10-token {display:inline-block;border-radius:4px;background:#f0f3f8;color:#345071;padding:3px 7px;margin:2px 5px 2px 0;font-size:11px;white-space:normal;overflow-wrap:anywhere}\nbody .usr-pv10-empty {color:#8a9bb3}\nbody .usr-pv10-foot {font-size:11px;color:#7b8da6;margin-top:12px}\nbody .usr-pv10-dialog-shade {position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:999990;display:flex;justify-content:center;align-items:center;padding:15px;box-sizing:border-box}\nbody .usr-pv10-dialog {box-sizing:border-box;background:white;border:1px solid #dce3ef;border-radius:12px;box-shadow:0 15px 48px rgba(0,0,0,.2);padding:22px;max-width:560px;width:100%;font-size:13px;font-family:inherit;color:#142747}\nbody .usr-pv10-dialog h3 {margin:0 0 6px;font-size:18px;color:#142747}\nbody .usr-pv10-dialog p {line-height:1.55;color:#576b86}\nbody .usr-pv10-dialog label {display:block;color:#243b5c;font-weight:700;margin-top:13px;margin-bottom:5px}\nbody .usr-pv10-dialog select,body .usr-pv10-dialog textarea {width:100%;box-sizing:border-box;padding:9px;border:1px solid #d7dfec;border-radius:7px;background:white;color:#213958;font-size:13px;font-family:inherit}\nbody .usr-pv10-dialog textarea {min-height:66px;resize:vertical}\nbody .usr-pv10-dialog-actions {display:flex;justify-content:flex-end;gap:8px;margin-top:16px;flex-wrap:wrap}\nbody .usr-pv10-dialog-actions button {padding:9px 13px;border-radius:8px;background:white;border:1px solid #d9e2ef;color:#284261;cursor:pointer}\nbody .usr-pv10-dialog-actions button.usr-pv10-copy {background:#6827d6;color:white;border-color:#6827d6}\nbody .usr-pv10-dialog-actions button:disabled {cursor:not-allowed;opacity:.5}\n';
            // V11: approval warning lives ONLY in the Edit Scopes dialog.
            // The read-only Access Scopes tab itself never shows a warning.
            scopeStyle.textContent += "\nbody .usr-pv11-flow-banner {display:flex;gap:10px;align-items:flex-start;box-sizing:border-box;border:1px solid #fbd46c;background:#fffae9;border-radius:9px;padding:13px;color:#92531a;margin:12px 0}\nbody .usr-pv11-flow-banner strong {color:#8d460e}\nbody .usr-pv11-flow-state {margin-top:12px;border:1px solid #dee6f2;border-radius:8px;padding:10px;color:#4b6587;background:#f7f9fd}\nbody .usr-pv11-fieldhelp {font-size:11px;color:#788da9;margin-top:7px}\nbody .usr-pv11-dialog-status {font-weight:700;color:#5e2bc0}\nbody .usr-pv11-dialog-actions .usr-pv11-primary {background:#6d28d9;border-color:#6d28d9;color:#fff}\nbody .usr-pv11-dialog-actions button:disabled {opacity:.5;cursor:wait}\n";
            document.head.appendChild(scopeStyle);
            // Scoped Role card stylesheet; only one copy per page.
            document.getElementById("usr-mcit-userprofile-v8-roles-style")?.remove();
            const roleStyle = document.createElement("style");
            roleStyle.id = "usr-mcit-userprofile-v8-roles-style";
            roleStyle.textContent = "\n/* V8 / Assigned Roles: only styles inside the Roles panel. V7 Header and Profile unchanged. */\nbody .usr-pv8-roles-mount { display:block!important; width:100%!important; min-width:0!important; max-width:100%!important; margin:18px 0 0!important; padding:0!important; box-sizing:border-box!important; align-self:stretch!important; }\nbody .usr-pv8-role-card { width:100%!important; max-width:100%!important; min-width:0!important; box-sizing:border-box!important; background:#fff; border:1px solid #dce3ef; border-radius:12px; box-shadow:none; overflow:hidden; font-size:12px; font-family:inherit; color:#142747; }\nbody .usr-pv8-role-head { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:15px 18px; min-height:54px; box-sizing:border-box; border-bottom:1px solid #e8edf4; }\nbody .usr-pv8-role-title { font-size:13px; font-weight:750; color:#102648; }\nbody .usr-pv8-role-add { background:#fff; border:1px solid #d6deec; color:#243b5c; font-size:12px; font-weight:600; border-radius:10px; padding:7px 13px; }\nbody .usr-pv8-role-add:disabled { opacity:0.55; cursor:not-allowed; }\nbody .usr-pv8-role-scroll { width:100%; overflow-x:auto; padding:14px 17px 17px; box-sizing:border-box; }\nbody .usr-pv8-role-table { width:100%; border-collapse:collapse; text-align:left; font-size:12px; min-width:660px; table-layout:fixed; }\nbody .usr-pv8-role-table th { font-size:11px; font-weight:700; color:#365075; border-bottom:1px solid #dce4ef; padding:11px 10px; }\nbody .usr-pv8-role-table td { color:#496080; padding:10px 10px; border-bottom:1px solid #e9edf4; vertical-align:middle; word-break:break-word; }\nbody .usr-pv8-role-table tr:last-child td { border-bottom:0; }\nbody .usr-pv8-role-table th:first-child,body .usr-pv8-role-table td:first-child { width:27%; }\nbody .usr-pv8-role-table th:nth-child(2),body .usr-pv8-role-table td:nth-child(2) { width:15%; }\nbody .usr-pv8-role-table th:nth-child(3),body .usr-pv8-role-table td:nth-child(3) { width:12%; }\nbody .usr-pv8-role-table th:nth-child(4),body .usr-pv8-role-table td:nth-child(4) { width:26%; }\nbody .usr-pv8-role-table th:nth-child(5),body .usr-pv8-role-table td:nth-child(5) { width:20%; }\nbody .usr-pv8-role-name { color:#112a4b; font-weight:700; }\nbody .usr-pv8-chip { display:inline-flex; align-items:center; white-space:nowrap; border-radius:999px; padding:4px 9px; line-height:1.15; background:#edf3fc; color:#3466bf; font-size:11px; font-weight:650; }\nbody .usr-pv8-chip-active { background:#e8f9ef; color:#03934f; }\nbody .usr-pv8-chip-inactive { background:#fff0f0; color:#c52b45; }\nbody .usr-pv8-chip-muted { background:#f3f5f9; color:#70819d; }\nbody .usr-pv8-role-notice { padding:18px; text-align:center; color:#70819d; font-size:12px; }\nbody .usr-pv8-role-footer { padding:0 18px 14px; color:#8190aa; font-size:11px; }\n";
            document.head.appendChild(roleStyle);
            // V12 Queue Assignments: separate stylesheet; no Profile/Roles/Scopes overrides.
            document.getElementById("usr-mcit-userprofile-v12-queues-style")?.remove();
            const queueStyle=document.createElement("style");
            queueStyle.id="usr-mcit-userprofile-v12-queues-style";
            queueStyle.textContent=`
body .usr-pv12-queues-mount{display:block!important;width:100%!important;max-width:100%!important;min-width:0!important;padding:0!important;margin:18px 0 0!important;box-sizing:border-box!important;align-self:stretch!important}
body .usr-pv12-card{box-sizing:border-box;width:100%;min-width:0;overflow:hidden;background:#fff;border:1px solid #dce3ef;border-radius:12px;font:inherit;font-size:12px;color:#142747}
body .usr-pv12-card-head{padding:16px 18px;min-height:51px;display:flex;align-items:center;border-bottom:1px solid #e8edf4;box-sizing:border-box}
body .usr-pv12-card-head strong{font-size:13px;font-weight:750;color:#102648}
body .usr-pv12-body{padding:14px 17px 15px;box-sizing:border-box}
body .usr-pv12-table-scroll{width:100%;overflow-x:auto}
body .usr-pv12-table{width:100%;min-width:650px;border-collapse:collapse;text-align:left;table-layout:fixed;font-size:12px}
body .usr-pv12-table th{font-size:11px;color:#344e73;font-weight:700;border-bottom:1px solid #dce4ef;padding:10px 10px}
body .usr-pv12-table td{color:#496080;line-height:1.5;padding:10px;border-bottom:1px solid #e9edf4;vertical-align:middle;overflow-wrap:anywhere}
body .usr-pv12-table tr:last-child td{border-bottom:0}
body .usr-pv12-table th:nth-child(1),body .usr-pv12-table td:nth-child(1){width:26%}
body .usr-pv12-table th:nth-child(2),body .usr-pv12-table td:nth-child(2){width:29%}
body .usr-pv12-table th:nth-child(3),body .usr-pv12-table td:nth-child(3){width:29%}
body .usr-pv12-table th:nth-child(4),body .usr-pv12-table td:nth-child(4){width:16%}
body .usr-pv12-qname{font-weight:700;color:#13294b!important}
body .usr-pv12-chip{display:inline-block;vertical-align:middle;margin:2px 4px 2px 0;border-radius:5px;padding:4px 7px;background:#eff3f8;color:#425a78;font-size:11px;white-space:normal;overflow-wrap:anywhere}
body .usr-pv12-status{display:inline-block;border-radius:30px;padding:4px 9px;white-space:nowrap;font-size:11px;font-weight:700}
body .usr-pv12-status--active{background:#e8f9ef;color:#04894d}
body .usr-pv12-status--inactive{background:#f3f5f9;color:#70819d}
body .usr-pv12-status--unverified{background:#fff5e3;color:#9b671b}
body .usr-pv12-empty{padding:13px 10px;color:#70819d;font-size:12px;line-height:1.6}
body .usr-pv12-foot{font-size:11px;color:#7b8da6;margin-top:13px;line-height:1.5}
`;
            document.head.appendChild(queueStyle);
            // V14: Isolated Effective Permissions UI; no impact on earlier tabs.
            document.getElementById('usr-mcit-userprofile-v14-permissions-style')?.remove();
            const permsStyle=document.createElement('style');
            permsStyle.id='usr-mcit-userprofile-v14-permissions-style';
            permsStyle.textContent=`
body .usr-pv14-permissions-mount{display:block!important;width:100%!important;max-width:100%!important;min-width:0!important;padding:0!important;margin:18px 0 0!important;box-sizing:border-box!important}
body .usr-pv14-card{width:100%;box-sizing:border-box;background:#fff;border:1px solid #dce4ef;border-radius:12px;overflow:hidden;color:#132344;font-size:12px;margin-bottom:18px}
body .usr-pv14-head{padding:16px 18px;border-bottom:1px solid #e9edf4;min-height:52px;box-sizing:border-box;font-size:13px;font-weight:750;color:#101f3d}
body .usr-pv14-content{padding:18px;box-sizing:border-box}
body .usr-pv14-filterrow{display:flex;align-items:flex-end;gap:12px;flex-wrap:wrap;margin-bottom:14px}
body .usr-pv14-filter{display:flex;flex-direction:column;gap:7px;color:#203555;font-size:12px;font-weight:700;min-width:175px}
body .usr-pv14-filter select{border:1px solid #dce3ec;border-radius:9px;padding:10px 12px;background:white;color:#142547;min-width:175px;font-size:12px;max-width:100%;cursor:pointer}
body .usr-pv14-filter select:focus{outline:1px solid #7836e5;border-color:#7836e5}
body .usr-pv14-alert{border:1px solid #d4dfed;background:#f5f8fc;border-radius:8px;padding:12px 14px;line-height:1.65;color:#566986}
body .usr-pv14-alert--allowed{background:#ebfcf3;border-color:#b5edce;color:#047743}
body .usr-pv14-alert--restricted{background:#fff0f2;border-color:#ffc7d0;color:#ac314b}
body .usr-pv14-alert--warn{background:#fff8ea;border-color:#ffdc9a;color:#9b6514}
body .usr-pv14-alert strong{font-size:13px;font-weight:750}
body .usr-pv14-smallnote{color:#8392ab;font-size:11px;margin-top:10px;line-height:1.55}
body .usr-pv14-module{padding:12px 0 3px;color:#6925df;font-size:12px;font-weight:750}
body .usr-pv14-scroll{width:100%;overflow-x:auto}
body .usr-pv14-matrix{width:100%;min-width:770px;border-collapse:collapse;table-layout:fixed;text-align:left}
body .usr-pv14-matrix th{background:#f5f7fa;border-bottom:1px solid #dce5f0;color:#3c5072;font-size:11px;padding:10px 9px}
body .usr-pv14-matrix td{border-bottom:1px solid #e6ecf4;padding:11px 9px;color:#425979;font-size:11px;line-height:1.4;overflow-wrap:anywhere}
body .usr-pv14-matrix th:first-child,body .usr-pv14-matrix td:first-child{width:37%}
body .usr-pv14-matrix td:first-child{font-weight:650;color:#15294a}
body .usr-pv14-matrix th:not(:first-child),body .usr-pv14-matrix td:not(:first-child){text-align:center}
body .usr-pv14-mark{font-weight:750;font-size:15px;cursor:help}
body .usr-pv14-mark--allowed{color:#11a45b}
body .usr-pv14-mark--restricted{color:#c34b68}
body .usr-pv14-mark--unknown{color:#aab4c7}
body .usr-pv14-empty{padding:12px 8px;color:#7b89a2}
body .usr-pv14-legend{padding-top:12px;color:#7a8ba4;line-height:1.6;font-size:11px}
@media(max-width:700px){body .usr-pv14-filter,body .usr-pv14-filter select{min-width:135px}body .usr-pv14-content{padding:12px}}
`;
            document.head.appendChild(permsStyle);
            // V18: Activity & Audit mounts inside its native TabContainer.
            // Keep the V14 selectors, app logic, and original fields unchanged.
            document.getElementById('usr-mcit-userprofile-v17-audit-style')?.remove();
            const auditStyle=document.createElement('style');
            auditStyle.id='usr-mcit-userprofile-v17-audit-style';
            auditStyle.textContent=`
body .usr-pv18-audit-mount{box-sizing:border-box!important;width:100%!important;max-width:100%!important;min-width:0!important;margin:18px 0 0!important;padding:0!important}
body .usr-pv17-audit-card{background:white;border:1px solid #dce3ef;border-radius:12px;overflow:hidden;box-sizing:border-box;width:100%;font:12px Arial,sans-serif;color:#162642}
body .usr-pv17-audit-head{padding:15px 18px;border-bottom:1px solid #e9edf5;display:flex;justify-content:space-between;align-items:center;gap:12px}
body .usr-pv17-audit-head strong{font-size:13px}
body .usr-pv17-audit-head button,body .usr-pv17-audit-more{background:white;border:1px solid #dce3ef;padding:7px 12px;border-radius:8px;color:#435a7c;cursor:pointer;font-size:11px}
body .usr-pv17-audit-head button:disabled{opacity:.55;cursor:wait}
body .usr-pv17-audit-inside{padding:12px 16px 17px}
body .usr-pv17-audit-scroll{width:100%;overflow-x:auto}
body .usr-pv17-audit-table{width:100%;min-width:760px;border-collapse:collapse;table-layout:fixed;text-align:left}
body .usr-pv17-audit-table th{background:#f7f9fc;color:#314867;font-weight:700;font-size:11px;padding:11px 9px;border-bottom:1px solid #dee5ee}
body .usr-pv17-audit-table td{padding:11px 9px;color:#475d7c;font-size:11px;border-bottom:1px solid #e8edf4;line-height:1.5;overflow-wrap:anywhere;vertical-align:top}
body .usr-pv17-audit-table th:nth-child(1){width:18%}body .usr-pv17-audit-table th:nth-child(2){width:15%}body .usr-pv17-audit-table th:nth-child(3){width:16%}body .usr-pv17-audit-table th:nth-child(4){width:15%}body .usr-pv17-audit-table th:nth-child(5){width:13%}body .usr-pv17-audit-table th:nth-child(6){width:23%}
body .usr-pv17-audit-pill{display:inline-block;background:#edf1f6;color:#5a6a82;border-radius:18px;padding:3px 8px;font-size:10px;font-weight:700}
body .usr-pv17-audit-pill.ok{background:#e6f9ed;color:#07854b}body .usr-pv17-audit-pill.no{background:#ffeaf0;color:#b9334a}
body .usr-pv17-audit-message{padding:22px 8px;color:#7586a2;line-height:1.6}
body .usr-pv17-audit-note{font-size:10px;color:#8291a6;line-height:1.6;padding:12px 0 0}
`;
            document.head.appendChild(auditStyle);
            if (document.__usrMCITProfileV7) document.__usrMCITProfileV7.dispose();
            const runtime = { disposed:false, sequence:0, roleCache:null, rolePromise:null, key:"", pending:null,
                rolesUserId:"", rolesLoading:false, rolesLoaded:false, rolesError:"", rolesRows:[],
                rolesSequence:0, rolesUiSignature:"", rolesVisible:false,
                scopesUserId:"", scopesLoading:false, scopesLoaded:false,
                scopesErrors:{}, scopeContracts:[], scopeAuthorities:[], scopesSeq:0,
                queuesUserId:'',queuesSeq:0,queuesLoading:false,queuesLoaded:false,
                queuesError:'',queuesMap:[],queuesContracts:[],queuesContractsError:'',
                scopeApproval:{requestId:'',userId:'',verifiedId:'',started:false},
                scopeApprovalTimer:null,
                permsUserId:'',permsSeq:0,permsLoading:false,permsLoaded:false,
                permsRows:[],permsMembers:new Set(),permsRoleLabels:new Map(),
                permsErrors:[],permsSelection:{module:'Requests',action:'View'},
                permsRenderKey:'',permsRevision:0,permsDeactivated:false,
                permsExportStatus:null,
                auditIdentity:null,auditUserId:'',auditSerial:0,auditLoading:false,
                auditLoaded:false,auditRows:[],auditError:'',auditWarnings:[],
                auditShown:40,auditRenderRev:0 };
            document.__usrMCITProfileV7 = runtime;
            const guid = v => String(v?.value ?? v?.Id ?? v?.id ?? v ?? "").toLowerCase();
            const visible = v => typeof v === "string" ? v.trim()
                : String(v?.displayValue ?? v?.Name ?? v?.name ?? "").trim();
            const valid = v => /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(String(v));
            const set = (ctx, attribute, value, active) => { if (active()) ctx[attribute] = value; };
            const asFilter = async (column, value, extra) => {
                const filter = new sdk.FilterGroup();
                if (sdk.LogicalOperatorType) filter.logicalOperation = sdk.LogicalOperatorType.And;
                await filter.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal, column, value);
                if (extra) await filter.addSchemaColumnFilterWithParameter(
                    sdk.ComparisonType.Equal, extra[0], extra[1]);
                return Object.assign({}, filter, { items:filter.items });
            };
            const load = async (schema, columns, filter, count = 150) => {
                const model = await sdk.Model.create(schema);
                return model.load({
                    attributes:columns,
                    parameters:filter ? [{ type:sdk.ModelParameterType.Filter, value:filter }] : [],
                    options:{ pagingConfig:{ rowCount:count, rowsOffset:0 } }
                });
            };
            // Precisely V14's proven definition of organization: SysAdminUnit
            // types 1 Division / 0 Organization and SysUserInRole(SysRole,SysUser).
            const organizationRoles = () => {
                if (runtime.rolePromise) return runtime.rolePromise;
                runtime.rolePromise = (async () => {
                    const seen = new Map();
                    for (const type of [1,0]) {
                        const rows = await load("SysAdminUnit", ["Id","Name"],
                            await asFilter("SysAdminUnitTypeValue",type), 500);
                        if ((rows || []).length >= 500) throw Error("Organizational role list exceeds the query limit");
                        for (const r of (rows || [])) {
                            const id = guid(r.Id), name = visible(r.Name);
                            if (!valid(id) || !name) continue;
                            if (["all employees","all external users","system administrators"]
                                .includes(name.toLowerCase())) continue;
                            seen.set(id, { id, name, type });
                        }
                    }
                    return [...seen.values()].sort((a,b) => (b.type-a.type) || a.name.localeCompare(b.name));
                })().catch(e => {
                    runtime.rolePromise = null;
                    console.warn("MCIT Profile: unable to load organizational roles",e);
                    return [];
                });
                return runtime.rolePromise;
            };
            const lookupOrganization = async (userId) => {
                const roles = await organizationRoles();
                const matched = [];
                // Concurrency bound: avoids flooding backend, preserves the tested V14 filter.
                for (let offset=0; offset<roles.length; offset+=6) {
                    const batch = await Promise.all(roles.slice(offset,offset+6).map(async role => {
                        try {
                            const f = await asFilter("SysRole",role.id,["SysUser",userId]);
                            const rows = await load("SysUserInRole",["Id"],f,1);
                            return rows?.length ? role : null;
                        } catch(e) { return null; }
                    }));
                    matched.push(...batch.filter(Boolean));
                }
                // Division always wins over its organization parent. No Account fallback.
                const divisions = matched.filter(r => r.type === 1);
                return [...new Set((divisions.length ? divisions : matched).map(r=>r.name))].join(", ");
            };
            // V8: Membership is sourced from Creatio's native SysUserInRole table.
            // Custom role classification and assignment provenance are read separately.
            // Audit Log event descriptions do not provide a guaranteed relational key;
            // NEVER guess "Assigned By" from an unrelated log entry or CreatedBy.
            const roleAsBool = value => value === true || value === 1 ||
                String(value).toLowerCase() === 'true';
            const getRoleInfo = async (roleId, roleLabel) => {
                let rows;
                const f = await asFilter("Id",roleId);
                try {
                    rows = await load("SysAdminUnit",["Id","Name","SysAdminUnitTypeValue","Active"],f,1);
                } catch(e) {
                    rows = await load("SysAdminUnit",["Id","Name","SysAdminUnitTypeValue"],f,1);
                }
                const row=rows?.[0];
                if (!row) return null;
                // Functional Role is type 6; Org/Division roles stay out of this tab.
                if (Number(row.SysAdminUnitTypeValue)!==6) return null;
                return {id:roleId,name:visible(row.Name)||roleLabel||roleId,
                    nativeType:'Functional', // verified by SysAdminUnitTypeValue === 6
                    active:typeof row.Active === 'boolean' ? row.Active : null};
            };
            const getMemberships = async userId => {
                let members=[];
                try {
                    const rows=await load("SysUserInRole",["Id","SysRole"],
                        await asFilter("SysUser",userId),501);
                    if (rows?.length>=501) throw Error("Role membership exceeds 500 rows");
                    members=(rows||[]).map(r=>({id:guid(r.SysRole),name:visible(r.SysRole)}))
                        .filter(r=>valid(r.id));
                } catch(err) {
                    // Some builds don't project SysRole using sdk.Model.load. Fallback
                    // to V14's proven SysUserInRole(SyRole,SysUser) exact check.
                    console.warn("MCIT Roles: bulk memberships unavailable, using V14 exact role checks",err);
                    const f=await asFilter("SysAdminUnitTypeValue",6);
                    const candidates=await load("SysAdminUnit",["Id","Name"],f,501);
                    if ((candidates||[]).length>=501) throw Error("More than 500 functional roles; query would be incomplete");
                    const found=[];
                    for(let i=0;i<(candidates||[]).length;i+=6) {
                        const block=candidates.slice(i,i+6);
                        const result=await Promise.all(block.map(async role=>{
                            const rid=guid(role.Id);
                            if(!valid(rid)) return null;
                            try {
                                const f=await asFilter("SysRole",rid,["SysUser",userId]);
                                const matches=await load("SysUserInRole",["Id"],f,1);
                                return matches?.length ? {id:rid,name:visible(role.Name)} : null;
                            } catch(e) { return null; }
                        }));
                        found.push(...result.filter(Boolean));
                    }
                    members=found;
                }
                return [...new Map(members.map(r=>[r.id,r])).values()];
            };
            const readMetadata = async roleId => {
                try {
                    const rows=await load('UsrMCITRoleMetadata',
                        ['Id','UsrRole','UsrRoleType'],await asFilter('UsrRole',roleId),20);
                    // The lookup may exist but contain no classification yet.
                    return visible(rows?.[0]?.UsrRoleType) || '';
                } catch(e) { console.warn('MCIT Roles: classification lookup unavailable',e); return ''; }
            };
            const readAssignments = async userId => {
                const f=await asFilter('UsrUser',userId);
                try {
                    const rows=await load('UsrMCITRoleAssignment',
                        ['Id','UsrRole','UsrAssignmentSource','UsrAssignedBy','UsrAssignedAt','UsrIsCurrent'],f,501);
                    if (rows?.length>=501) throw Error('Assignment metadata exceeds 500 rows');
                    return rows||[];
                } catch(e) {
                    // For schemas where an optional column wasn't created in precisely
                    // that name, query the core fields without inventing values.
                    try {
                        return await load('UsrMCITRoleAssignment',
                            ['Id','UsrRole','UsrAssignmentSource','UsrAssignedBy'],f,501);
                    } catch(error) {
                        console.warn('MCIT Roles: assignment provenance not available',error);
                        return [];
                    }
                }
            };
            const resolveAdminUnitName = async record => {
                const value=visible(record);
                if(value) return value;
                const id=guid(record);
                if(!valid(id)) return '';
                try {
                    const rows=await load('SysAdminUnit',['Id','Name'],await asFilter('Id',id),1);
                    return visible(rows?.[0]?.Name);
                } catch(e) { return ''; }
            };
            runtime.loadAssignedRoles = async userId => {
                if(!valid(userId) || runtime.disposed) return;
                if(runtime.rolesUserId===userId && (runtime.rolesLoaded || runtime.rolesLoading)) return;
                runtime.rolesUserId=userId;
                runtime.rolesLoaded=false;
                runtime.rolesLoading=true;
                runtime.rolesError='';
                runtime.rolesRows=[];
                const seq=++runtime.rolesSequence;
                const still=()=>!runtime.disposed && runtime.rolesUserId===userId &&
                    runtime.rolesSequence===seq;
                runtime.renderRoles?.();
                try {
                    const memberships=await getMemberships(userId);
                    if(!still()) return;
                    const actual=[];
                    for(let offset=0;offset<memberships.length;offset+=6) {
                        const group=await Promise.all(memberships.slice(offset,offset+6).map(async r=>{
                            try { return await getRoleInfo(r.id,r.name); }
                            catch(e) { console.warn('MCIT Roles: failed checking role type',r.id,e); return null; }
                        }));
                        actual.push(...group.filter(Boolean));
                    }
                    if(!still()) return;
                    const assignmentRows=await readAssignments(userId);
                    const byRole=new Map();
                    for(const a of assignmentRows) {
                        const id=guid(a.UsrRole);
                        if(!valid(id) || a.UsrIsCurrent===false) continue;
                        const prev=byRole.get(id);
                        const dt=x=>new Date(x?.UsrAssignedAt?.value || x?.UsrAssignedAt || 0).getTime() || 0;
                        if(!prev || dt(a)>dt(prev)) byRole.set(id,a);
                    }
                    const enriched=[];
                    for(let offset=0;offset<actual.length;offset+=6) {
                        const block=await Promise.all(actual.slice(offset,offset+6).map(async role=>{
                            const assignment=byRole.get(role.id);
                            const [type,actor]=await Promise.all([
                                readMetadata(role.id),
                                assignment ? resolveAdminUnitName(assignment.UsrAssignedBy) : Promise.resolve('')
                            ]);
                            return {id:role.id,name:role.name,type:type||role.nativeType||'Not classified',
                                active:role.active,
                                source:visible(assignment?.UsrAssignmentSource)||'Not recorded',
                                by:actor||'Not recorded'};
                        }));
                        enriched.push(...block);
                    }
                    if(!still()) return;
                    runtime.rolesRows=enriched.sort((a,b)=>a.name.localeCompare(b.name));
                    runtime.rolesLoaded=true;
                } catch(error) {
                    if(still()) {
                        runtime.rolesError='Could not load assigned roles. Check access to SysUserInRole.';
                        console.error('MCIT User Profile: role membership query failed',error);
                    }
                } finally {
                    if(still()) { runtime.rolesLoading=false; runtime.renderRoles?.(); runtime.renderScopes?.(); runtime.renderQueues?.(); }
                }
            };
            const makeRolesEl = (tag, cls, text) => {
                const node=document.createElement(tag);
                if(cls) node.className=cls;
                if(text!==undefined) node.textContent=String(text);
                return node;
            };
            runtime.renderRoles = () => {
                const mount=document.querySelector('.usr-pv3-center .usr-pv8-roles-mount');
                if(!mount || runtime.disposed) return;
                const signature=JSON.stringify({id:runtime.rolesUserId,loading:runtime.rolesLoading,
                    error:runtime.rolesError,rows:runtime.rolesRows});
                if(mount.dataset.usrRolesSignature===signature && mount.querySelector('.usr-pv8-role-card')) return;
                mount.dataset.usrRolesSignature=signature;
                // Dynamic values are added by textContent (not HTML) for XSS safety.
                const card=makeRolesEl('div','usr-pv8-role-card');
                const head=makeRolesEl('div','usr-pv8-role-head');
                head.appendChild(makeRolesEl('strong','usr-pv8-role-title','Assigned Roles'));
                // Write actions are disabled until the secured role-assignment workflow exists.
                const add=makeRolesEl('button','usr-pv8-role-add','＋  Add Role');
                add.type='button'; add.disabled=true;
                add.title='Add Role will be enabled after the secured assignment workflow is configured';
                head.appendChild(add); card.appendChild(head);
                if(runtime.rolesLoading || runtime.rolesError || !runtime.rolesRows.length) {
                    const msg=runtime.rolesError || (runtime.rolesLoading ? 'Loading assigned roles…'
                        : (runtime.rolesLoaded ? 'No directly assigned functional roles' : 'Loading user…'));
                    card.appendChild(makeRolesEl('div','usr-pv8-role-notice',msg));
                } else {
                    const scroller=makeRolesEl('div','usr-pv8-role-scroll');
                    const table=makeRolesEl('table','usr-pv8-role-table');
                    table.setAttribute('aria-label','Assigned roles for selected user');
                    const thead=document.createElement('thead');
                    const tr=document.createElement('tr');
                    for(const title of ['Role Name','Type','Status','Assignment Source','Assigned By'])
                        tr.appendChild(makeRolesEl('th','',title));
                    thead.appendChild(tr); table.appendChild(thead);
                    const tbody=document.createElement('tbody');
                    for(const role of runtime.rolesRows){
                        const tr=document.createElement('tr');
                        tr.appendChild(makeRolesEl('td','usr-pv8-role-name',role.name));
                        const type=document.createElement('td');
                        const typeChip=makeRolesEl('span','usr-pv8-chip'+(role.type==='Not classified'?' usr-pv8-chip-muted':''),role.type);
                        type.appendChild(typeChip); tr.appendChild(type);
                        const state=document.createElement('td');
                        const text=role.active===true?'Active':role.active===false?'Inactive':'Not available';
                        const cls=role.active===true?'usr-pv8-chip-active':role.active===false?'usr-pv8-chip-inactive':'usr-pv8-chip-muted';
                        state.appendChild(makeRolesEl('span','usr-pv8-chip '+cls,text));
                        tr.appendChild(state);
                        tr.appendChild(makeRolesEl('td','',role.source));
                        tr.appendChild(makeRolesEl('td','',role.by));
                        tbody.appendChild(tr);
                    }
                    table.appendChild(tbody); scroller.appendChild(table); card.appendChild(scroller);
                }
                const footer=makeRolesEl('div','usr-pv8-role-footer',
                    'Roles: Creatio memberships. Type: MCIT classification if saved, otherwise native Functional. Assignment details: recorded sources only.');
                card.appendChild(footer);
                mount.replaceChildren(card);
            };
            // V12: Configured Queue Assignment mapping, without inventing queue names or
            // treating functional roles as automatic membership in a task queue.
            // Create UsrMCITQueueRoleMapping (BaseEntity):
            //   UsrName (Text), UsrRole (lookup to SysAdminUnit),
            //   UsrContract (optional lookup to UsrMCITContract),
            //   UsrIsActive (Boolean), UsrNotes (Text optional).
            // One role can map to multiple queue names; an empty contract means
            // all currently active contracts explicitly assigned to this user.
            runtime.loadQueueAssignments = async userId => {
                if(!valid(userId) || runtime.disposed) return;
                if(runtime.queuesUserId===userId && (runtime.queuesLoading||runtime.queuesLoaded)) return;
                runtime.queuesUserId=userId;
                runtime.queuesLoading=true;
                runtime.queuesLoaded=false;
                runtime.queuesMap=[];
                runtime.queuesContracts=[];
                runtime.queuesError='';
                runtime.queuesContractsError='';
                const seq=++runtime.queuesSeq;
                const still=()=>!runtime.disposed && seq===runtime.queuesSeq && runtime.queuesUserId===userId;
                runtime.renderQueues?.();
                try {
                    const mappings=await load('UsrMCITQueueRoleMapping',
                        ['Id','UsrName','UsrRole','UsrContract','UsrIsActive','UsrNotes'],undefined,501);
                    if((mappings||[]).length>=501) throw Error('More than 500 configured queue mappings; use server pagination');
                    if(!still()) return;
                    runtime.queuesMap=(mappings||[]).map(r=>({
                        id:guid(r.Id), name:visible(r.UsrName),
                        roleId:guid(r.UsrRole), contractId:guid(r.UsrContract),
                        contractLabel:visible(r.UsrContract), enabled:roleAsBool(r.UsrIsActive),
                        note:visible(r.UsrNotes)
                    })).filter(r=>r.name && valid(r.roleId));
                } catch(e) {
                    if(still()) {
                        runtime.queuesError='Queue mapping object is not configured or not readable';
                        console.warn('MCIT Queue Assignments: UsrMCITQueueRoleMapping unavailable',e);
                    }
                }
                if(still() && !runtime.queuesError){
                    try {
                        const access=await load('UsrMCITUserContractAccess',
                            ['Id','UsrContract','UsrIsActive'],await asFilter('UsrUser',userId),501);
                        if((access||[]).length>=501) throw Error('User contract access exceeds 500 records');
                        if(still()) runtime.queuesContracts=(access||[])
                            .filter(r=>roleAsBool(r.UsrIsActive))
                            .map(r=>({id:guid(r.UsrContract),label:visible(r.UsrContract)}))
                            .filter(r=>valid(r.id));
                    } catch(e) {
                        if(still()) {
                            runtime.queuesContractsError='Contract access could not be verified';
                            console.warn('MCIT Queue Assignments: cannot verify per-user contract scope',e);
                        }
                    }
                }
                if(still()){
                    runtime.queuesLoading=false;
                    runtime.queuesLoaded=true;
                    runtime.renderQueues?.();
                }
            };
            runtime.renderQueues = () => {
                const mount=document.querySelector('.usr-pv3-center .usr-pv12-queues-mount');
                if(!mount || runtime.disposed) return;
                const signature=JSON.stringify({user:runtime.queuesUserId,
                    loading:runtime.queuesLoading,loaded:runtime.queuesLoaded,
                    error:runtime.queuesError,contractsError:runtime.queuesContractsError,
                    mapping:runtime.queuesMap,contracts:runtime.queuesContracts,
                    rolesLoaded:runtime.rolesLoaded,rolesLoading:runtime.rolesLoading,
                    roleError:runtime.rolesError,roles:runtime.rolesRows});
                if(mount.dataset.usrQueuesSignature===signature && mount.querySelector('.usr-pv12-card'))return;
                mount.dataset.usrQueuesSignature=signature;
                const make=makeRolesEl; // Always textContent; never HTML from record values.
                const card=make('div','usr-pv12-card');
                const head=make('div','usr-pv12-card-head');
                head.appendChild(make('strong','','Queue Assignments'));
                card.appendChild(head);
                const body=make('div','usr-pv12-body');
                const roles=new Map(runtime.rolesUserId===runtime.queuesUserId && runtime.rolesLoaded && !runtime.rolesError
                    ?runtime.rolesRows.map(r=>[r.id,r]):[]);
                const contracts=new Map(runtime.queuesContracts.map(c=>[c.id,c.label]));
                const groups=new Map();
                if(runtime.queuesLoaded && runtime.rolesLoaded && !runtime.queuesError && !runtime.rolesError){
                    for(const mapping of runtime.queuesMap){
                        const role=roles.get(mapping.roleId);
                        if(!role) continue; // Not a currently verified user Functional Role.
                        const specific=valid(mapping.contractId);
                        if(specific && !contracts.has(mapping.contractId) && !runtime.queuesContractsError) continue;
                        const key=mapping.name.toLocaleLowerCase();
                        if(!groups.has(key)) groups.set(key,{name:mapping.name,roles:new Set(),contractNames:new Set(),
                            active:false});
                        const row=groups.get(key);
                        row.roles.add(role.name);
                        if(specific){
                            const label=contracts.get(mapping.contractId)||mapping.contractLabel;
                            if(label)row.contractNames.add(label);
                        } else {
                            for(const label of contracts.values()) if(label)row.contractNames.add(label);
                        }
                        // Queue Status reflects the configured Queue-to-Role mapping ONLY.
                        // Contract verification and the user's account/role status are separate concerns.
                        // If multiple mappings have the same queue name, at least one enabled mapping
                        // to one of this user's roles makes that displayed queue Active.
                        if(mapping.enabled) row.active=true;
                    }
                }
                if(runtime.queuesLoading || runtime.rolesLoading){
                    body.appendChild(make('div','usr-pv12-empty','Loading verified queue assignments…'));
                } else if(runtime.queuesError){
                    body.appendChild(make('div','usr-pv12-empty',
                        'Queue mappings are not configured yet. Create UsrMCITQueueRoleMapping and assign actual functional roles to queues.'));
                } else if(runtime.rolesError){
                    body.appendChild(make('div','usr-pv12-empty',
                        'Cannot verify this user’s functional roles; no queue access can be confirmed.'));
                } else if(!runtime.queuesLoaded || !runtime.rolesLoaded){
                    body.appendChild(make('div','usr-pv12-empty','Queue assignment data is not available yet.'));
                } else if(!groups.size){
                    body.appendChild(make('div','usr-pv12-empty',
                        'No verified queue assignments for this user. A functional role alone does not grant queue access.'));
                } else {
                    const scroller=make('div','usr-pv12-table-scroll');
                    const table=make('table','usr-pv12-table');
                    const thead=make('thead','');
                    const hdr=make('tr','');
                    for(const label of ['Queue Name','Contract Scope','Role Source','Status'])
                        hdr.appendChild(make('th','',label));
                    thead.appendChild(hdr);table.appendChild(thead);
                    const tbody=make('tbody','');
                    for(const q of [...groups.values()].sort((a,b)=>a.name.localeCompare(b.name))){
                        const tr=make('tr','');
                        tr.appendChild(make('td','usr-pv12-qname',q.name));
                        const contractsTd=make('td','');
                        if(q.contractNames.size){
                            for(const name of [...q.contractNames].sort()) contractsTd.appendChild(make('span','usr-pv12-chip',name));
                        }else contractsTd.appendChild(make('span','','No verified contract scope'));
                        tr.appendChild(contractsTd);
                        const rolesTd=make('td','');
                        for(const name of [...q.roles].sort())rolesTd.appendChild(make('span','usr-pv12-chip',name));
                        tr.appendChild(rolesTd);
                        const statusTd=make('td','');
                        const status=q.active?'Active':'Inactive';
                        statusTd.appendChild(make('span','usr-pv12-status '+
                            (q.active?'usr-pv12-status--active':'usr-pv12-status--inactive'),status));
                        tr.appendChild(statusTd);
                        tbody.appendChild(tr);
                    }
                    table.appendChild(tbody);scroller.appendChild(table);body.appendChild(scroller);
                }
                body.appendChild(make('div','usr-pv12-foot',
                    'Queue status reflects the configured Queue Role Mapping (IsActive) only. Contract Scope is verified separately; Active does not grant task access or override a deactivated user account. This display does not create native task queues.'));
                card.appendChild(body);
                mount.replaceChildren(card);
            };

            // V14 Effective Permissions: a read-only snapshot of configured grants.
            // Never turn absence of an explicit grant into "Denied". Exact effective
            // rights additionally depend on AdministratedByOperations, role priority,
            // inherited roles, global admin operations, and record/column restrictions.
            // SDK reads are performed under the current session's security context.
            const permModules = [
                { name:'Requests', objects:[
                    {label:'VM Request',schema:'UsrVMRequest'},
                    {label:'VM Request Item',schema:'UsrVMRequestItem'},
                    {label:'Request Approval',schema:'UsrRequestApproval'} ] },
                { name:'Contracts & Points',objects:[
                    {label:'MCIT Contract',schema:'UsrMCITContract'},
                    {label:'Point Allocation',schema:'UsrPointAllocation'},
                    {label:'Point Transaction',schema:'UsrPointTransaction'} ] },
                { name:'VM Lifecycle',objects:[
                    {label:'Virtual Machine',schema:'UsrVirtualMachine'},
                    {label:'Provisioning Attempt',schema:'UsrProvisioningAttempt'} ] },
                { name:'Reports',objects:[
                    {label:'VM Request report data',schema:'UsrVMRequest'},
                    {label:'Virtual Machine report data',schema:'UsrVirtualMachine'} ] }
            ];
            const permActions=['View','Create','Edit','Approve','Assign','Export'];
            const boolValue = v => v===true || v===1 || String(v).toLowerCase()==='true';
            const permKey = { View:'CanRead', Create:'CanAppend', Edit:'CanEdit' };
            const permLabel = (status) => status==='grant'?'Configured grant':
                status==='restriction'?'Configured restriction':'Not verified';
            const getPermissionStatus = (entry,action) => {
                if(action==='Approve'||action==='Assign')
                    return {status:'unknown',why:action+' requires a separate MCIT process/permission mapping.'};
                if(action==='Export') {
                    const item=runtime.permsExportStatus;
                    return item || {status:'unknown',why:'Cannot verify CanExportGrid system operation.'};
                }
                if(!entry || entry.status==='unknown')
                    return {status:'unknown',why:entry?.why||'Object rights not accessible or not configured.'};
                const key=permKey[action];
                const winner=entry.winning;
                if(!winner) return {status:'unknown',why:'No applicable explicit role rule. Object administration mode and global overrides not verified.'};
                return {status:boolValue(winner[key])?'grant':'restriction',
                    why:'Matching '+visible(winner.SysAdminUnit)+' rule at priority '+String(winner.Position??'?')+
                    '. This is the configured rule, not a server-validated effective user decision.'};
            };
            runtime.loadEffectivePermissions = async userId => {
                if(!valid(userId)||runtime.disposed) return;
                if(runtime.permsUserId===userId && (runtime.permsLoading||runtime.permsLoaded)) return;
                runtime.permsUserId=userId;
                runtime.permsLoading=true;
                runtime.permsLoaded=false;
                runtime.permsRows=[];
                runtime.permsErrors=[];
                runtime.permsExportStatus=null;
                runtime.permsRevision++;
                const seq=++runtime.permsSeq;
                const alive=()=>!runtime.disposed&&runtime.permsSeq===seq&&runtime.permsUserId===userId;
                runtime.renderEffective?.();
                try {
                    const memberships=await getMemberships(userId);
                    const members=new Set([userId,...memberships.map(x=>x.id)]);
                    // Some deployments expose the flattened hierarchy via this table.
                    // If inaccessible, mark unmatched/denied rights as unverified.
                    let inheritedComplete=false;
                    try {
                        const roles=await load('SysAdminUnitInRole',['Id','SysAdminUnitRole'],
                            await asFilter('SysAdminUnit',userId),501);
                        if(roles?.length<501){
                            roles.forEach(r=>{const id=guid(r.SysAdminUnitRole);if(valid(id))members.add(id);});
                            inheritedComplete=true;
                        }
                    } catch(e) {
                        runtime.permsErrors.push('Complete role hierarchy could not be read.');
                    }
                    if(!alive())return;
                    runtime.permsMembers=members;
                    const schemas=[...new Set(permModules.flatMap(m=>m.objects.map(o=>o.schema)))];
                    const resultRows=[];
                    for(let i=0;i<schemas.length;i+=3){
                        const batch=await Promise.all(schemas.slice(i,i+3).map(async name=>{
                            try {
                                const definitions=await load('SysSchema',['Id','Name','UId'],
                                    await asFilter('Name',name),20);
                                const uid=guid((definitions||[]).find(d=>visible(d.Name)===name)?.UId);
                                if(!valid(uid))return {schema:name,status:'unknown',why:'Published SysSchema UId is not available.'};
                                const rules=await load('SysEntitySchemaOperationRight',
                                    ['Id','SubjectSchemaUId','SysAdminUnit','Position','CanRead','CanAppend','CanEdit','CanDelete'],
                                    await asFilter('SubjectSchemaUId',uid),501);
                                if(rules?.length>=501) return {schema:name,status:'unknown',why:'Rule count exceeds safe query limit.'};
                                const matching=(rules||[]).filter(r=>members.has(guid(r.SysAdminUnit)));
                                matching.sort((a,b)=>(Number(a.Position)||0)-(Number(b.Position)||0));
                                const winning=matching[0]||null;
                                if(winning&&!inheritedComplete && !memberships.length)
                                    return {schema:name,status:'unknown',why:'Role membership could not be completely verified.'};
                                if(winning&&matching.length>1 &&
                                    Number(matching[0].Position)===Number(matching[1].Position) &&
                                    ['CanRead','CanAppend','CanEdit'].some(col=>
                                      boolValue(matching[0][col])!==boolValue(matching[1][col])))
                                    return {schema:name,status:'unknown',why:'Conflicting rules have the same priority.'};
                                return {schema:name,status:'read',winning,
                                    why:winning?'Configured object rule was found.':'No applicable explicit object rule was found.'};
                            } catch(e) {
                                console.warn('MCIT Effective Permissions: '+name+' read failed',e);
                                return {schema:name,status:'unknown',why:'Rights or schema metadata not readable by this session.'};
                            }
                        }));
                        resultRows.push(...batch);
                        if(!alive())return;
                    }
                    // Export is a system operation, not a CanExport column on the object.
                    try {
                        const op=await load('SysAdminOperation',['Id','Code'],
                            await asFilter('Code','CanExportGrid'),1);
                        const opId=guid(op?.[0]?.Id);
                        if(valid(opId)){
                            const grants=await load('SysAdminOperationGrantee',
                                ['Id','SysAdminUnit','Position','CanExecute'],
                                await asFilter('SysAdminOperation',opId),501);
                            const matching=(grants||[]).filter(g=>members.has(guid(g.SysAdminUnit)))
                                .sort((a,b)=>(Number(a.Position)||0)-(Number(b.Position)||0));
                            if(matching.length){
                                runtime.permsExportStatus={status:boolValue(matching[0].CanExecute)?'grant':'restriction',
                                    why:'CanExportGrid rule at priority '+matching[0].Position+
                                        '. Module-specific export and record visibility still require separate checks.'};
                            }
                        }
                    } catch(e) { console.warn('MCIT Effective Permissions: CanExportGrid unavailable',e); }
                    if(!alive())return;
                    runtime.permsRows=resultRows;
                    runtime.permsLoaded=true;
                } catch(e) {
                    if(alive()){
                        runtime.permsErrors.push('Unable to inspect user roles: '+(e?.message||'Access unavailable'));
                        console.warn('MCIT Effective Permissions: role loading error',e);
                    }
                } finally {
                    if(alive()){
                        runtime.permsLoading=false;
                        runtime.permsRevision++;
                        runtime.renderEffective?.();
                    }
                }
            };
            const permCreate=(tag,cls,content)=>{
                const el=document.createElement(tag);
                if(cls)el.className=cls;
                if(content!==undefined)el.textContent=content;
                return el;
            };
            runtime.renderEffective = () => {
                const mount=document.querySelector('.usr-pv3-center .usr-pv14-permissions-mount');
                if(!mount||runtime.disposed)return;
                const renderKey=[runtime.permsUserId,runtime.permsLoading,runtime.permsRevision,
                    runtime.permsSelection.module,runtime.permsSelection.action].join('|');
                if(mount.dataset.renderKey===renderKey&&mount.childElementCount)return;
                mount.dataset.renderKey=renderKey;
                const rowsByName=new Map(runtime.permsRows.map(r=>[r.schema,r]));
                const mod=runtime.permsSelection.module;
                const action=runtime.permsSelection.action;
                const matchedMod=permModules.find(m=>m.name===mod)||permModules[0];
                const first=permCreate('section','usr-pv14-card');
                first.appendChild(permCreate('div','usr-pv14-head','Explain Access'));
                const content=permCreate('div','usr-pv14-content');
                const filters=permCreate('div','usr-pv14-filterrow');
                const picker=(label,choices,value,change)=>{
                    const field=permCreate('label','usr-pv14-filter');
                    field.appendChild(permCreate('span','',label));
                    const select=permCreate('select','');
                    for(const c of choices){const opt=permCreate('option','',c);opt.value=c;select.appendChild(opt);}
                    select.value=value;
                    select.addEventListener('change',e=>{change(e.target.value);runtime.renderEffective();});
                    field.appendChild(select);return field;
                };
                filters.appendChild(picker('Module',permModules.map(m=>m.name),mod,
                    v=>{runtime.permsSelection.module=v;}));
                filters.appendChild(picker('Action',permActions,action,
                    v=>{runtime.permsSelection.action=v;}));
                content.appendChild(filters);
                const tested=matchedMod.objects.map(o=>({
                    label:o.label,schema:o.schema,check:getPermissionStatus(rowsByName.get(o.schema),action)
                }));
                const grants=tested.filter(x=>x.check.status==='grant');
                const restricted=tested.filter(x=>x.check.status==='restriction');
                const unknown=tested.filter(x=>x.check.status==='unknown');
                let bannerState='';let bannerText='';
                if(runtime.permsLoading){bannerText='Loading configured Creatio permissions…';}
                else if(!runtime.permsLoaded){bannerText='No verified permissions have been loaded. Check session access to Creatio security objects.';}
                else if(action==='Approve'||action==='Assign'){
                    bannerState='--warn';bannerText=action+' requires MCIT workflow-specific permission mapping. It cannot be inferred from object CRUD.';
                } else if(unknown.length===0&&grants.length===tested.length){
                    bannerState='--allowed';bannerText='Configured grants found on all mapped objects. Effective access still requires server-side validation.';
                } else if(unknown.length===0&&restricted.length===tested.length){
                    bannerState='--restricted';bannerText='Configured restrictions found on the mapped objects. Global overrides and inactive administration settings can alter effective access.';
                } else if(grants.length){
                    bannerState='--warn';bannerText=grants.length+' mapped object(s) have configured grants; '+
                        (restricted.length+' have configured restrictions; '+unknown.length+' are not verified.');
                } else {
                    bannerText='Not verified: no applicable permission decision can be safely confirmed for this module and action.';
                }
                const message=permCreate('div','usr-pv14-alert'+bannerState);
                message.appendChild(permCreate('strong','',
                    bannerState==='--allowed'?'Configured grant':bannerState==='--restricted'?'Configured restriction':'Permission verification'));
                message.appendChild(permCreate('div','',bannerText));
                if(runtime.permsErrors.length)message.appendChild(permCreate('div','',runtime.permsErrors.join(' ')));
                content.appendChild(message);
                content.appendChild(permCreate('div','usr-pv14-smallnote',
                    'Mapped data objects (not Figma example screens). The displayed rights are configured rules, NOT a security-engine impersonation of this user.'));
                first.appendChild(content);
                const second=permCreate('section','usr-pv14-card');
                second.appendChild(permCreate('div','usr-pv14-head','Permission Matrix — Creatio configured rights'));
                const body=permCreate('div','usr-pv14-content');
                if(runtime.permsLoading||!runtime.permsLoaded){
                    body.appendChild(permCreate('div','usr-pv14-empty',
                        runtime.permsLoading?'Loading role and object permission data…':'Permission details are not available yet.'));
                } else {
                    for(const module of permModules){
                        body.appendChild(permCreate('div','usr-pv14-module',module.name));
                        const scroll=permCreate('div','usr-pv14-scroll');
                        const table=permCreate('table','usr-pv14-matrix');
                        const thead=permCreate('thead','');const header=permCreate('tr','');
                        for(const txt of ['Creatio object',...permActions])header.appendChild(permCreate('th','',txt));
                        thead.appendChild(header);table.appendChild(thead);
                        const tbody=permCreate('tbody','');
                        for(const item of module.objects){
                            const row=permCreate('tr','');
                            const label=permCreate('td','',item.label);
                            label.title=item.schema;row.appendChild(label);
                            for(const act of permActions){
                                const result=getPermissionStatus(rowsByName.get(item.schema),act);
                                const cell=permCreate('td','');
                                const symbol=permCreate('span','usr-pv14-mark usr-pv14-mark--'+
                                    (result.status==='grant'?'allowed':result.status==='restriction'?'restricted':'unknown'),
                                    result.status==='grant'?'✓':result.status==='restriction'?'×':'—');
                                symbol.title=permLabel(result.status)+': '+(result.why||'');
                                cell.appendChild(symbol);row.appendChild(cell);
                            }
                            tbody.appendChild(row);
                        }
                        table.appendChild(tbody);scroll.appendChild(table);body.appendChild(scroll);
                    }
                    body.appendChild(permCreate('div','usr-pv14-legend',
                      '✓ Explicit configured grant   × Explicit configured restriction (priority-sensitive)   — Not verified / requires MCIT mapping. '+
                      'Object administration switches, record/column rights, user status, inherited privileges and global operations can change actual access. '+
                      'Export comes from CanExportGrid and remains subject to record visibility.'));
                }
                second.appendChild(body);
                mount.replaceChildren(first,second);
            };

            // V10 Access Scopes: actual per-user joins (UsrUser = SysAdminUnit.Id),
            // not sample values from Figma. Never infer project-wide permissions.
            runtime.loadAccessScopes = async userId => {
                if(!valid(userId) || runtime.disposed) return;
                if(runtime.scopesUserId===userId && (runtime.scopesLoading || runtime.scopesLoaded)) return;
                if(runtime.scopesUserId && runtime.scopesUserId!==userId){
                    runtime.scopeDialogClose?.();
                    runtime.scopeApproval={requestId:'',userId:'',verifiedId:'',started:false};
                }
                runtime.scopesUserId=userId;
                runtime.scopesLoading=true;
                runtime.scopesLoaded=false;
                runtime.scopeContracts=[];
                runtime.scopeAuthorities=[];
                runtime.scopesErrors={};
                const seq=++runtime.scopesSeq;
                const still=()=>!runtime.disposed && seq===runtime.scopesSeq &&
                    runtime.scopesUserId===userId;
                runtime.renderScopes?.();
                // Filter by the PDS-selected user, not the currently logged-in user.
                const readAccess=async (schema, key) => {
                    const filter=await asFilter('UsrUser',userId);
                    const columns=['Id',key,'UsrIsActive'];
                    const rows=await load(schema,columns,filter,501);
                    if(rows?.length>=501) throw Error(schema+' exceeds the 500-record safety limit');
                    return [...new Set((rows||[])
                        .filter(r=>roleAsBool(r.UsrIsActive))
                        .map(r=>visible(r[key]))
                        .filter(Boolean))].sort((a,b)=>a.localeCompare(b));
                };
                const [contracts,authorities]=await Promise.allSettled([
                    readAccess('UsrMCITUserContractAccess','UsrContract'),
                    readAccess('UsrMCITUserAuthorityAccess','UsrAuthority')
                ]);
                if(!still()) return;
                if(contracts.status==='fulfilled') runtime.scopeContracts=contracts.value;
                else {
                    runtime.scopesErrors.contracts='Unable to read contract access';
                    console.warn('MCIT Access Scopes: contract data unavailable',contracts.reason);
                }
                if(authorities.status==='fulfilled') runtime.scopeAuthorities=authorities.value;
                else {
                    runtime.scopesErrors.authorities='Unable to read authority access';
                    console.warn('MCIT Access Scopes: authority data unavailable',authorities.reason);
                }
                runtime.scopesLoading=false;
                runtime.scopesLoaded=true;
                runtime.renderScopes?.();
            };
            runtime.renderScopes = () => {
                const mount=document.querySelector('.usr-pv3-center .usr-pv10-scopes-mount');
                if(!mount || runtime.disposed) return;
                const signature=JSON.stringify({user:runtime.scopesUserId,loading:runtime.scopesLoading,
                    loaded:runtime.scopesLoaded,errors:runtime.scopesErrors,
                    contracts:runtime.scopeContracts,authorities:runtime.scopeAuthorities,
                    rolesUser:runtime.rolesUserId,rolesLoaded:runtime.rolesLoaded,rolesLoading:runtime.rolesLoading,
                    roles:runtime.rolesRows,rolesError:runtime.rolesError});
                if(mount.dataset.usrScopesSignature===signature && mount.querySelector('.usr-pv10-card')) return;
                mount.dataset.usrScopesSignature=signature;
                const make=makeRolesEl; // Creates safe text nodes, never HTML from Creatio records.
                const card=make('section','usr-pv10-card');
                const head=make('div','usr-pv10-head');
                head.appendChild(make('strong','usr-pv10-title','Access Scopes'));
                const edit=make('button','usr-pv10-edit','✎  Edit Scopes');
                edit.type='button';
                edit.addEventListener('click',()=>runtime.openScopeEditor?.());
                head.appendChild(edit);
                card.appendChild(head);
                const body=make('div','usr-pv10-body');
                // Do not render approval warning on this read-only tab.
                // It is presented when the user actually presses Edit Scopes.
                const rows=[
                    {name:'Contract Scope',mode:runtime.scopesLoading?'Loading':runtime.scopesErrors.contracts?'Unavailable':runtime.scopeContracts.length?'Assigned Scope':'No assignments',
                        values:runtime.scopesLoading?[]:runtime.scopeContracts,note:'Contract-level access boundary',
                        extra:runtime.scopesLoading?'Loading…':runtime.scopesErrors.contracts||'No active contract assignments'},
                    {name:'Authority Scope',mode:runtime.scopesLoading?'Loading':runtime.scopesErrors.authorities?'Unavailable':runtime.scopeAuthorities.length?'Assigned Scope':'No assignments',
                        values:runtime.scopesLoading?[]:runtime.scopeAuthorities,note:'Authority-level access boundary',
                        extra:runtime.scopesLoading?'Loading…':runtime.scopesErrors.authorities||'No active authority assignments'},
                    {name:'Project Scope',mode:'Not configured',values:[],
                        note:'No user–project scope relationship supplied',extra:'No verified project scope mapping'},
                    {name:'Team / Queue',mode:runtime.rolesLoaded&&!runtime.rolesError?'Role-driven':'Not verified',
                        values:runtime.rolesUserId===runtime.scopesUserId && runtime.rolesLoaded ? runtime.rolesRows.map(r=>r.name):[],
                        note:'Functional roles only; queue assignments not verified',
                        extra:runtime.rolesLoading?'Loading roles…':runtime.rolesError || 'No functional roles found'}
                ];
                const scroll=make('div','usr-pv10-table-scroll');
                const table=make('table','usr-pv10-table');
                table.setAttribute('aria-label','Access scopes for selected user');
                const thead=make('thead',''); const trHead=make('tr','');
                for(const title of ['Scope Type','Mode','Assigned Values','Notes']) trHead.appendChild(make('th','',title));
                thead.appendChild(trHead);table.appendChild(thead);
                const tbody=make('tbody','');
                for(const row of rows){
                    const tr=make('tr','');
                    tr.appendChild(make('td','usr-pv10-scope-name',row.name));
                    const modeCell=make('td','');
                    const modeClass=row.mode==='Not configured'||row.mode==='No assignments'||row.mode==='Unavailable'||row.mode==='Loading'||row.mode==='Not verified'
                        ? 'usr-pv10-badge--muted' : (row.mode==='All'?'usr-pv10-badge--green':'');
                    modeCell.appendChild(make('span','usr-pv10-badge '+modeClass,row.mode));
                    tr.appendChild(modeCell);
                    const valuesCell=make('td','');
                    if(!row.values.length) valuesCell.appendChild(make('span','usr-pv10-empty',row.extra));
                    else for(const value of row.values) valuesCell.appendChild(make('span','usr-pv10-token',value));
                    tr.appendChild(valuesCell);
                    tr.appendChild(make('td','',row.note));
                    tbody.appendChild(tr);
                }
                table.appendChild(tbody);scroll.appendChild(table);body.appendChild(scroll);
                body.appendChild(make('p','usr-pv10-foot',
                    'Live sources: MCIT User Contract Access, MCIT User Authority Access, Creatio functional-role memberships. Project / Queue authorization requires separate mapping.'));
                card.appendChild(body);
                mount.replaceChildren(card);
            };
            // V11 approval integration CONTRACT (object/process must be published on the server):
            // - UsrMCITScopeEditRequest (BaseEntity) with:
            //   UsrUser Lookup(SysAdminUnit), UsrReason Text, UsrStatus Text
            //   allowed status names: Pending, Approved, Rejected, Applied.
            // - UsrMCITScopeApprovalProcess with GUID input ScopeRequestId,
            //   responsible for Security Administrator approval and updating UsrStatus.
            // - UsrMCITApplyApprovedScopes with GUID input ScopeRequestId,
            //   Text inputs ScopeType, AssignedValues, ChangeReason.
            //   This SERVER process MUST revalidate Approved status, requester/expiry,
            //   lock/consume approval and apply scoped changes transactionally.
            // The UI cannot grant permission or claim a local click is approval.
            const scopeWorkflow = Object.freeze({
                object:'UsrMCITScopeEditRequest',
                approvalProcess:'UsrMCITScopeApprovalProcess',
                applyProcess:'UsrMCITApplyApprovedScopes'
            });
            const scopeDialog = (title, label) => {
                const make=makeRolesEl;
                const shade=make('div','usr-pv10-dialog-shade');
                const modal=make('section','usr-pv10-dialog');
                modal.setAttribute('role','dialog');
                modal.setAttribute('aria-modal','true');
                modal.setAttribute('aria-label',label);
                const close=()=>{
                    if(runtime.scopeApprovalTimer){
                        window.clearInterval(runtime.scopeApprovalTimer);
                        runtime.scopeApprovalTimer=null;
                    }
                    shade.remove(); document.removeEventListener('keydown',esc);
                    if(runtime.scopeDialogClose===close) runtime.scopeDialogClose=null;
                };
                const esc=e=>{if(e.key==='Escape') close();};
                shade.addEventListener('click',e=>{if(e.target===shade)close();});
                document.addEventListener('keydown',esc);
                runtime.scopeDialogClose=close;
                modal.appendChild(make('h3','',title));
                const actions=make('div','usr-pv10-dialog-actions usr-pv11-dialog-actions');
                shade.appendChild(modal);
                document.body.appendChild(shade);
                return {make, modal, actions, close};
            };
            const readScopeApproval = async (requestId,userId) => {
                if(!valid(requestId)||!valid(userId)) return null;
                // Filtering on BOTH request ID and selected user prevents another
                // user's approval being accidentally used by this UI.
                const rows=await load(scopeWorkflow.object,
                    ['Id','UsrUser','UsrStatus'],
                    await asFilter('Id',requestId,['UsrUser',userId]),1);
                return rows?.[0]||null;
            };
            const runScopeProcess = async (processCode,parameters) => {
                if(typeof sdk.ProcessEngineService!=='function')
                    throw Error('Creatio ProcessEngineService is unavailable');
                const service=new sdk.ProcessEngineService();
                const response=await service.executeProcessByName(processCode,parameters,[]);
                if(response?.success===false || response?.isSuccess===false)
                    throw Error('Business process did not start successfully');
                return response;
            };
            runtime.openApprovedScopeEditor = async (requestId) => {
                if(runtime.disposed || !valid(runtime.scopesUserId)) return;
                // Always verify with Creatio, including when opening the editor again.
                const currentUser=runtime.scopesUserId;
                let approval;
                try {approval=await readScopeApproval(requestId,currentUser);}
                catch(e){console.warn('Scope approval read failed',e);return;}
                if(runtime.disposed || runtime.scopesUserId!==currentUser ||
                   visible(approval?.UsrStatus).toLowerCase()!=='approved') return;
                runtime.scopeApproval.verifiedId=requestId;
                runtime.scopeDialogClose?.();
                const {make,modal,actions,close}=scopeDialog('Edit Access Scopes','Approved Access Scope Editor');
                modal.appendChild(make('p','',
                    'Security Administrator approval verified in Creatio. Select the scope and enter the requested values.'));
                const scopeLabel=make('label','','Scope Type');
                const scopeType=make('select','');
                for(const name of ['Contract Scope','Authority Scope']){
                    const option=make('option','',name);option.value=name;scopeType.appendChild(option);
                }
                modal.appendChild(scopeLabel);modal.appendChild(scopeType);
                const help=make('p','usr-pv11-fieldhelp',
                    'Project Scope and Team / Queue are not editable here until their backend mappings are configured.');
                modal.appendChild(help);
                const valuesLabel=make('label','','Assigned Values');
                const assigned=make('textarea','');
                const fill=()=>{assigned.value=(scopeType.value==='Contract Scope'
                    ?runtime.scopeContracts:runtime.scopeAuthorities).join(', ');};
                scopeType.addEventListener('change',fill);fill();
                assigned.placeholder='Comma-separated contract or authority values';
                modal.appendChild(valuesLabel);modal.appendChild(assigned);
                modal.appendChild(make('label','','Change reason'));
                const reason=make('textarea','');reason.placeholder='Explain the approved change';
                modal.appendChild(reason);
                const state=make('div','usr-pv11-flow-state',
                    'Saving calls a server-side process. It must check approval again and enforce object permissions.');
                modal.appendChild(state);
                const cancel=make('button','','Cancel');cancel.type='button';cancel.addEventListener('click',close);
                const save=make('button','usr-pv11-primary','Save Scope Changes');save.type='button';
                save.addEventListener('click',async()=>{
                    if(!reason.value.trim()){
                        state.textContent='Please enter a reason before saving.';return;
                    }
                    save.disabled=true;
                    state.textContent='Verifying approval and submitting changes...';
                    try {
                        const check=await readScopeApproval(requestId,currentUser);
                        if(runtime.disposed || runtime.scopesUserId!==currentUser ||
                           visible(check?.UsrStatus).toLowerCase()!=='approved')
                            throw Error('Approval is missing, expired, revoked, or already used');
                        await runScopeProcess(scopeWorkflow.applyProcess,{
                            ScopeRequestId:requestId, ScopeType:scopeType.value,
                            AssignedValues:assigned.value.trim(), ChangeReason:reason.value.trim()
                        });
                        // Starting a process does not prove that its asynchronous
                        // write has completed. Do not claim permission changed.
                        state.textContent='Apply workflow started. Refresh this tab after the process completes to verify saved data.';
                        runtime.scopeApproval.verifiedId='';
                        runtime.scopeApproval.requestId='';
                        save.disabled=true;
                    } catch(e) {
                        console.warn('MCIT scope apply was not completed',e);
                        state.textContent='Unable to apply: '+(e?.message||'Approval process or server validation unavailable');
                        save.disabled=false;
                    }
                });
                actions.appendChild(cancel);actions.appendChild(save);modal.appendChild(actions);
                scopeType.focus();
            };
            runtime.openScopeEditor = async () => {
                if(runtime.disposed || document.querySelector('.usr-pv10-dialog-shade')) return;
                const userId=runtime.scopesUserId;
                if(!valid(userId)) return;
                // Never show the warning until the Edit Scopes button is clicked.
                const {make,modal,actions,close}=scopeDialog('Scope change approval','Scope Approval Required');
                const warning=make('div','usr-pv11-flow-banner');
                warning.appendChild(make('span','','⚠'));
                const warningText=make('span','');
                warningText.appendChild(make('strong','','Approval Required: '));
                warningText.appendChild(document.createTextNode(
                    'Scope changes require Security Administrator approval before editing.'));
                warning.appendChild(warningText); modal.appendChild(warning);
                const state=make('div','usr-pv11-flow-state','No approval has been requested for this session.');
                const reasonLabel=make('label','','Reason for access change');
                const reason=make('textarea','');
                reason.placeholder='Why does this user need their scope updated?';
                modal.appendChild(reasonLabel);modal.appendChild(reason);modal.appendChild(state);
                const cancel=make('button','','Close');cancel.type='button';cancel.addEventListener('click',close);
                const requestBtn=make('button','usr-pv11-primary','Request Approval');requestBtn.type='button';
                const checkBtn=make('button','','Check Approval');checkBtn.type='button';
                actions.appendChild(cancel);actions.appendChild(checkBtn);actions.appendChild(requestBtn);
                modal.appendChild(actions);
                const approval=runtime.scopeApproval;
                const check=async (silent=false) => {
                    if(!approval.requestId || approval.userId!==userId) {
                        if(!silent)state.textContent='No request has been submitted for this user.';
                        return;
                    }
                    if(approval.checking)return;
                    approval.checking=true;checkBtn.disabled=true;
                    try {
                        const row=await readScopeApproval(approval.requestId,userId);
                        if(runtime.disposed||runtime.scopesUserId!==userId) return;
                        const status=visible(row?.UsrStatus).trim().toLowerCase();
                        if(status==='approved'){
                            close();
                            await runtime.openApprovedScopeEditor(approval.requestId);
                        }else if(status==='rejected'){
                            state.textContent='Request rejected by Security Administrator. Editing remains locked.';
                            if(runtime.scopeApprovalTimer){window.clearInterval(runtime.scopeApprovalTimer);runtime.scopeApprovalTimer=null;}
                        }else if(status==='applied'){
                            state.textContent='This approval has already been used. Request a new approval to edit again.';
                            if(runtime.scopeApprovalTimer){window.clearInterval(runtime.scopeApprovalTimer);runtime.scopeApprovalTimer=null;}
                        }else{
                            state.textContent='Request status: '+(status||'Pending')+'. Waiting for Security Administrator decision.';
                        }
                    }catch(e){
                        if(!silent)state.textContent='Cannot check approval status. Check that the scope approval object is published.';
                        console.warn('MCIT scope approval check failed',e);
                    }finally{approval.checking=false;checkBtn.disabled=false;}
                };
                checkBtn.addEventListener('click',()=>{void check(false);});
                requestBtn.addEventListener('click',async()=>{
                    if(!reason.value.trim()){
                        state.textContent='Enter the reason for the Security Administrator.';return;
                    }
                    if(approval.requestId && approval.userId===userId && approval.started){
                        state.textContent='Request already submitted. Use Check Approval.';return;
                    }
                    requestBtn.disabled=true;
                    state.textContent='Creating approval request in Creatio...';
                    try {
                        const model=await sdk.Model.create(scopeWorkflow.object);
                        const proposedId=(typeof crypto!=='undefined' && typeof crypto.randomUUID==='function')
                            ? crypto.randomUUID() : '';
                        const dto={UsrUser:userId,UsrReason:reason.value.trim(),UsrStatus:'Pending'};
                        if(valid(proposedId)) dto.Id=proposedId;
                        const result=await model.insert(dto);
                        if(result?.success===false || result?.isSuccess===false)
                            throw Error('Could not save the approval request');
                        const requestId=guid(result?.Id??result?.id??result?.identifier??proposedId);
                        if(!valid(requestId)) throw Error('Creatio did not return a valid request ID');
                        approval.requestId=requestId;approval.userId=userId;approval.started=false;
                        await runScopeProcess(scopeWorkflow.approvalProcess,{ScopeRequestId:requestId});
                        approval.started=true;
                        state.textContent='Approval submitted. Editor stays locked until Security Administrator approves.';
                        reason.readOnly=true;
                        if(!runtime.scopeApprovalTimer)runtime.scopeApprovalTimer=window.setInterval(()=>{
                            if(!runtime.disposed && document.body.contains(modal)) void check(true);
                        },15000);
                        void check(true);
                    }catch(e){
                        console.warn('MCIT scope approval request failed',e);
                        state.textContent='Approval is not available yet: '+(e?.message||'configure approval object and BPMN process');
                        requestBtn.disabled=false;
                    }
                });
                if(approval.requestId && approval.userId===userId){
                    state.textContent='Existing request in this session. Check whether it has been approved.';
                    if(approval.started && !runtime.scopeApprovalTimer)runtime.scopeApprovalTimer=window.setInterval(()=>{
                        if(!runtime.disposed && document.body.contains(modal))void check(true);
                    },15000);
                    void check(false);
                }
                reason.focus();
            };
            // V18 audit reader. Own DOM mount is an isolated child of the ACTIVITY tab.
            // This is the same native view-config pattern already used by V14's
            // Roles, Access Scopes, Queue Assignments, and Effective Permissions.
            const auditElement=(tag,cls,txt)=>{
                const el=document.createElement(tag);
                if(cls)el.className=cls;
                if(txt!==undefined)el.textContent=String(txt);
                return el;
            };
            const auditValue=v=>typeof v==='string'?v.trim():
                String(v?.displayValue??v?.Name??v?.name??v?.value??'').trim();
            const auditMillis=v=>{
                const d=new Date(v?.value??v);
                return Number.isFinite(d.getTime())?d.getTime():0;
            };
            const auditWhen=v=>{
                const n=auditMillis(v);
                return n?new Date(n).toLocaleString('en-GB',{
                    day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'
                }):'—';
            };
            const auditRoleChange=(description,login)=>{
                if(!login)return null;
                const start='User '+login+' ';
                const text=String(description||'').trim();
                if(!text.toLowerCase().startsWith(start.toLowerCase()))return null;
                const rest=text.slice(start.length);
                const m=rest.match(/^(added to|removed from|excluded from)\s+role\s+(.+?)\.?$/i);
                return m?{verb:m[1],role:m[2]}:null;
            };
            const auditModule=t=>/role|organiz/i.test(t)?'Roles & Access':
                /session|authoriz/i.test(t)?'Authentication':
                /setting/i.test(t)?'System Settings':(t||'System Audit');
            const auditStatus=t=>/fail|denied|error|reject/i.test(t)?'no':
                /success|approved|complete/i.test(t)?'ok':'';
            const auditMount=()=>
                document.querySelector('.usr-pv3-center .usr-pv18-audit-mount');
            runtime.renderAudit=()=>{
                try{
                    if(runtime.disposed)return;
                    const mount=auditMount();
                    if(!mount)return;
                    const key=[runtime.auditUserId,runtime.auditRenderRev,
                        runtime.auditShown,runtime.auditLoading].join('|');
                    if(mount.dataset.auditKey===key&&mount.firstElementChild)return;
                    mount.dataset.auditKey=key;
                    const card=auditElement('section','usr-pv17-audit-card');
                    const header=auditElement('div','usr-pv17-audit-head');
                    header.appendChild(auditElement('strong','','Activity & Audit Log'));
                    const refresh=auditElement('button','','Refresh');refresh.type='button';
                    refresh.disabled=runtime.auditLoading;
                    refresh.addEventListener('click',()=>{
                        Promise.resolve(runtime.loadAudit(true)).catch(e=>
                            console.warn('MCIT Activity refresh failed safely',e));
                    });
                    header.appendChild(refresh);card.appendChild(header);
                    const body=auditElement('div','usr-pv17-audit-inside');
                    if(runtime.auditLoading){
                        body.appendChild(auditElement('div','usr-pv17-audit-message',
                            'Loading available Creatio audit events…'));
                    }else if(runtime.auditError){
                        body.appendChild(auditElement('div','usr-pv17-audit-message',runtime.auditError));
                    }else if(!runtime.auditRows.length){
                        body.appendChild(auditElement('div','usr-pv17-audit-message',
                            runtime.auditLoaded?'No matching audit events found for this user.':
                            'Audit data has not been loaded.'));
                    }else{
                        const wrap=auditElement('div','usr-pv17-audit-scroll');
                        const table=auditElement('table','usr-pv17-audit-table');
                        const thead=auditElement('thead');const htr=auditElement('tr');
                        for(const h of ['Timestamp','Action','Module','Record','Outcome','Details'])
                            htr.appendChild(auditElement('th','',h));
                        thead.appendChild(htr);table.appendChild(thead);
                        const tbody=auditElement('tbody');
                        for(const ev of runtime.auditRows.slice(0,runtime.auditShown)){
                            const tr=auditElement('tr');
                            const role=ev.role;
                            const action=role?(role.verb.toLowerCase()==='added to'?'Add role':'Remove role'):
                                (ev.result||ev.type||'Audit event');
                            const cells=[auditWhen(ev.date),action,auditModule(ev.type),
                                role?.role||'—'];
                            for(const v of cells)tr.appendChild(auditElement('td','',v));
                            const outcome=auditElement('td');
                            outcome.appendChild(auditElement('span','usr-pv17-audit-pill '+auditStatus(ev.result),
                                ev.result||'Not specified'));
                            tr.appendChild(outcome);
                            const d=auditElement('td','',ev.description||'No details recorded');
                            if(ev.relatedByName)d.appendChild(auditElement('div','',
                                'Target identified by description text, not by user ID.'));
                            tr.appendChild(d);tbody.appendChild(tr);
                        }
                        table.appendChild(tbody);wrap.appendChild(table);body.appendChild(wrap);
                        if(runtime.auditRows.length>runtime.auditShown){
                            const more=auditElement('button','usr-pv17-audit-more','Show more');
                            more.type='button';more.addEventListener('click',()=>{
                                runtime.auditShown+=40;runtime.auditRenderRev++;runtime.renderAudit();
                            });body.appendChild(more);
                        }
                    }
                    if(runtime.auditWarnings.length)body.appendChild(auditElement('div',
                        'usr-pv17-audit-note',runtime.auditWarnings.join(' ')));
                    body.appendChild(auditElement('div','usr-pv17-audit-note',
                        'Source: SysOperationAudit. Owner identifies who performed an event, not always the affected user. Approve/Reject activities require separate business-process logging when absent from Creatio Audit Log.'));
                    card.appendChild(body);mount.replaceChildren(card);
                }catch(e){console.warn('MCIT audit view error (page remains functional)',e);}
            };
            runtime.loadAudit=async(force=false)=>{
                if(runtime.disposed)return;
                const identity=runtime.auditIdentity;
                if(!identity||!valid(identity.userId))return;
                const userId=identity.userId;
                if(!force && runtime.auditUserId===userId &&
                    (runtime.auditLoading||runtime.auditLoaded))return;
                runtime.auditUserId=userId;runtime.auditRows=[];runtime.auditWarnings=[];
                runtime.auditError='';runtime.auditLoading=true;runtime.auditLoaded=false;
                const serial=++runtime.auditSerial;
                const isCurrent=()=>!runtime.disposed&&runtime.auditSerial===serial&&
                    runtime.auditUserId===userId;
                runtime.auditRenderRev++;runtime.renderAudit();
                try{
                    const collected=[];
                    const cols=['Id','Date','Type','Result','Description','Owner'];
                    let readCount=0;
                    if(valid(identity.contactId)){
                        try{
                            const rows=await load('SysOperationAudit',cols,
                                await asFilter('Owner',identity.contactId),120);
                            if(!isCurrent())return;
                            readCount++;for(const r of rows||[])collected.push({r,relation:'actor'});
                        }catch(e){runtime.auditWarnings.push('Actor events are not accessible.');
                            console.warn('MCIT actor audit read',e);}
                    }
                    const login=String(identity.login||'').trim();
                    if(login.length>=2&&login.length<=120 &&
                        sdk.ComparisonType?.Contain!==undefined){
                        try{
                            const f=new sdk.FilterGroup();
                            await f.addSchemaColumnFilterWithParameter(
                                sdk.ComparisonType.Contain,'Description','User '+login+' ');
                            const rows=await load('SysOperationAudit',cols,
                                Object.assign({},f,{items:f.items}),120);
                            if(!isCurrent())return;
                            readCount++;
                            for(const r of rows||[]){
                                if(auditRoleChange(auditValue(r.Description),login))
                                    collected.push({r,relation:'target-name'});
                            }
                        }catch(e){runtime.auditWarnings.push('Role-change history is not accessible.');
                            console.warn('MCIT role audit read',e);}
                    }
                    if(!isCurrent())return;
                    if(!readCount)runtime.auditError='Cannot read SysOperationAudit. Check permissions and that Audit logging is enabled.';
                    const unique=new Map();
                    for(const item of collected){
                        const r=item.r;
                        const id=guid(r.Id);
                        if(!valid(id))continue;
                        const description=auditValue(r.Description);
                        const role=auditRoleChange(description,login);
                        const actor=valid(identity.contactId)&&guid(r.Owner)===identity.contactId;
                        if(item.relation==='actor'&&!actor)continue;
                        if(item.relation==='target-name'&&!role)continue;
                        if(unique.has(id)&&unique.get(id).relatedByName===false)continue;
                        unique.set(id,{id,date:r.Date,type:auditValue(r.Type),
                            result:auditValue(r.Result),description,role,relatedByName:!actor});
                    }
                    runtime.auditRows=Array.from(unique.values()).sort((a,b)=>
                        auditMillis(b.date)-auditMillis(a.date)).slice(0,120);
                    runtime.auditLoaded=true;
                }catch(e){
                    if(isCurrent())runtime.auditError='Audit data cannot be loaded; other tabs are unaffected.';
                    console.warn('MCIT Activity reader isolated',e);
                }finally{
                    if(isCurrent()){runtime.auditLoading=false;runtime.auditRenderRev++;
                        runtime.renderAudit();}
                }
            };
            runtime.load = async ctx => {
                if (!ctx || runtime.disposed) return;
                const n = ++runtime.sequence;
                const active = () => !runtime.disposed && n === runtime.sequence;
                let userId = guid(await ctx.PDS_UsrUser_9i5hmwm);
                let contactId = guid(await ctx.PDS_UsrUser_Contact);
                let recordId = guid(await ctx.Id);
                if (!valid(userId)) {
                    if (!valid(recordId)) return;
                    try {
                        const records = await load("UsrMCITPortalUserAccess",["Id","UsrUser"],
                            await asFilter("Id",recordId),1);
                        userId = guid(records?.[0]?.UsrUser);
                    } catch(e) { console.warn("MCIT Profile: PDS record not available yet",e); }
                }
                if (!valid(userId) || !active()) return;
                // Role reads run independently of Profile fields and never edit memberships.
                void runtime.loadAssignedRoles(userId);
                void runtime.loadAccessScopes(userId);
                void runtime.loadQueueAssignments(userId);
                void runtime.loadEffectivePermissions(userId);
                let directoryId = visible(await ctx.PDS_UsrUser_Name);
                let displayName = visible(await ctx.PDS_UsrUser_9i5hmwm);
                let email = visible(await ctx.PDS_UsrUser_Contact_Email);
                if (!directoryId) directoryId = displayName;
                // Ensure user -> Contact association is real, not the logged in user.
                try {
                    const u = await load("SysAdminUnit",["Id","Name","Contact"],
                        await asFilter("Id",userId),1);
                    if (active() && u?.length) {
                        contactId = guid(u[0].Contact) || contactId;
                        directoryId = visible(u[0].Name) || directoryId;
                        displayName = displayName || directoryId;
                    }
                } catch(e) { console.warn("MCIT Profile: linked sys user unavailable", e); }
                if (!active()) return;
                // V17 identity only. No audit query is made during page load.
                if(runtime.auditUserId && runtime.auditUserId!==userId){
                    runtime.auditSerial++;runtime.auditUserId='';
                    runtime.auditRows=[];runtime.auditLoaded=false;
                    runtime.auditLoading=false;runtime.auditShown=40;
                    runtime.auditRenderRev++;
                }
                runtime.auditIdentity={userId,contactId,login:directoryId};
                // Do not depend on the native tab-click event: load safely after
                // the related SysAdminUnit identity is resolved.
                Promise.resolve(runtime.loadAudit()).catch(e=>
                    console.warn('MCIT Activity loading skipped safely',e));
                set(ctx,"UsrPV4DirectoryId",directoryId||"—",active);
                set(ctx,"UsrPV4DisplayName",displayName||"—",active);
                set(ctx,"UsrPV4Email",email||"—",active);
                // Clear old-user values during record transitions (no fabricated fallbacks).
                for (const [k,v] of Object.entries({
                    UsrPV3Organization:"—", UsrPV3HeaderOrganization:"—",
                    UsrPV3Department:"—", UsrPV3ActivatedBy:"—", UsrPV3ActivatedAt:null
                })) set(ctx,k,v,active);
                const work = async () => {
                    let department = "", organization = "";
                    if (valid(contactId)) {
                        try {
                            const contacts = await load("Contact",["Id","Name","Email"],
                                await asFilter("Id",contactId),1);
                            if (active() && contacts?.length) {
                                displayName = visible(contacts[0].Name) || displayName;
                                email = visible(contacts[0].Email) || email;
                                set(ctx,"UsrPV4DisplayName",displayName||"—",active);
                                set(ctx,"UsrPV4Email",email||"—",active);
                            }
                        } catch(e) { console.warn("MCIT Profile: Contact fields not accessible",e); }
                        try {
                            let jobs;
                            const byContact = await asFilter("Contact",contactId);
                            try {
                                jobs = await load("ContactCareer",["Id","Department","Account","Current","Primary"],byContact,150);
                            } catch(e) {
                                try { jobs = await load("ContactCareer",["Id","Department","Account","Current"],byContact,150); }
                                catch(e2) { jobs = await load("ContactCareer",["Id","Department","Account"],byContact,150); }
                            }
                            const rows = (jobs || []).filter(j => visible(j.Department));
                            const checked = v => v === true || v === 1 || String(v).toLowerCase() === "true";
                            const accountId = guid(await ctx.PDS_UsrUser_Contact_Account);
                            rows.sort((a,b) => {
                                const weight = r => (checked(r.Current)?4:0) + (checked(r.Primary)?2:0) +
                                    (valid(accountId) && guid(r.Account) === accountId ? 1 : 0);
                                return weight(b) - weight(a);
                            });
                            department = visible(rows[0]?.Department);
                        } catch(e) { console.warn("MCIT Profile: ContactCareer department unavailable",e); }
                    }
                    if (!active()) return;
                    set(ctx,"UsrPV3Department",department||"—",active);
                    // Do not replace a Division by Contact.Account (Telecom Egypt is not TE Operations).
                    try { organization = await lookupOrganization(userId); }
                    catch(e) { console.warn("MCIT Profile: organization membership error",e); }
                    if (!active()) return;
                    set(ctx,"UsrPV3Organization",organization||"—",active);
                    set(ctx,"UsrPV3HeaderOrganization",[organization,department].filter(v=>v && v!=="—").join("  •  ")||"—",active);
                };
                const activation = async () => {
                    if (!valid(recordId)) return;
                    // ActivatedBy/ActivatedAt are custom fields, not standard automatic
                    // Creatio activation metadata. Try both, then each individually
                    // for installations where only one custom field is configured.
                    // NEVER call CreatedBy/CreatedOn or ModifiedBy/ModifiedOn "activation".
                    const f = await asFilter("Id",recordId);
                    let by, at;
                    try {
                        const rows = await load("UsrMCITPortalUserAccess",
                            ["Id","UsrActivatedBy","UsrActivatedAt"], f, 1);
                        by = rows?.[0]?.UsrActivatedBy;
                        at = rows?.[0]?.UsrActivatedAt;
                    } catch (error) {
                        // Dynamic fallback is isolated from main profile loading.
                        try {
                            const rows = await load("UsrMCITPortalUserAccess",["Id","UsrActivatedBy"],f,1);
                            by = rows?.[0]?.UsrActivatedBy;
                        } catch (e) { /* no activation actor saved */ }
                        try {
                            const rows = await load("UsrMCITPortalUserAccess",["Id","UsrActivatedAt"],f,1);
                            at = rows?.[0]?.UsrActivatedAt;
                        } catch (e) { /* no activation timestamp saved */ }
                    }
                    if (!active()) return;
                    set(ctx,"UsrPV3ActivatedBy",visible(by)||"—",active);
                    set(ctx,"UsrPV3ActivatedAt",at||null,active);
                };
                await Promise.allSettled([work(),activation()]);
            };
            // V7: appearance only. Don't alter Creatio's native tab switching.
            // Read the caption at the exact click target, not the content panels.
            const tabNames = ["PROFILE", "ROLES", "ACCESS SCOPES", "QUEUE ASSIGNMENTS",
                "EFFECTIVE PERMISSIONS", "ACTIVITY & AUDIT"];
            runtime.activeTab = "PROFILE";
            const normalizedTab = value => String(value || "")
                .replace(/\s+/g, " ").trim().toUpperCase();
            const onProfileTabClick = event => {
                if (runtime.disposed || typeof Element === "undefined") return;
                const path = (typeof event.composedPath === "function")
                    ? event.composedPath() : [event.target];
                const tabs = document.querySelector(".usr-pv2-tabs");
                if (!tabs || !path.some(el => el === tabs || (el instanceof Element && tabs.contains(el)))) return;
                const tabTop = tabs.getBoundingClientRect().top;
                if (event.clientY > tabTop + 90) return; // A content click isn't a tab click.
                for (const item of path) {
                    if (!(item instanceof Element)) continue;
                    const caption = normalizedTab(item.textContent);
                    if (tabNames.includes(caption)) {
                        runtime.activeTab = caption;
                        if(caption==='ACTIVITY & AUDIT'){
                            Promise.resolve(runtime.loadAudit()).catch(e=>
                                console.warn('MCIT audit tab read skipped',e));
                        }
                        scheduleLayout();
                        break;
                    }
                }
            };
            const colorNativeTabCaptions = tabs => {
                if (!tabs || typeof NodeFilter === "undefined") return;
                // Native Creatio tab titles are text nodes inside several wrappers.
                // Styling the leaf prevents a blue child element overriding CSS on the host.
                const top = tabs.getBoundingClientRect().top;
                const tree = document.createTreeWalker(tabs, NodeFilter.SHOW_TEXT);
                let node;
                while ((node = tree.nextNode())) {
                    const caption = normalizedTab(node.nodeValue);
                    if (!tabNames.includes(caption)) continue;
                    const el = node.parentElement;
                    if (!el) continue;
                    const rect = el.getBoundingClientRect();
                    if (!rect.width || rect.top < top - 5 || rect.top > top + 90) continue;
                    const selected = caption === runtime.activeTab;
                    el.setAttribute("data-mcit-profile-tab-caption", selected ? "active" : "inactive");
                    el.style.setProperty("color", selected ? "#6d28d9" : "#74829b", "important");
                    el.style.setProperty("font-weight", selected ? "700" : "500", "important");
                    el.style.setProperty("background", "transparent", "important");
                    // Some controls color the clickable wrapper separately.
                    const parent = el.parentElement;
                    if (parent && normalizedTab(parent.textContent) === caption) {
                        parent.style.setProperty("background", "transparent", "important");
                        parent.style.setProperty("color", selected ? "#6d28d9" : "#74829b", "important");
                    }
                }
            };
            const updateLayout = () => {
                if (runtime.disposed) return;
                try {
                    const root = document.querySelector(".usr-pv3-center");
                    const header = root?.querySelector(".usr-pv3-header-card");
                    const tabs = root?.querySelector(".usr-pv2-tabs");
                    if (!root || !tabs) return;
                    colorNativeTabCaptions(tabs);
                    runtime.renderRoles?.();
                    runtime.renderScopes?.();
                    runtime.renderQueues?.();
                    runtime.renderEffective?.();
                    runtime.renderAudit?.();
                    // Use the same inset-neutralizing layout as the other four
                    // working tabs; only affect ancestors inside the Audit tab.
                    const auditPane=tabs.querySelector('.usr-pv18-audit-mount');
                    if(auditPane){
                        for(let el=auditPane.parentElement;el && el!==tabs;el=el.parentElement){
                            if(!(el instanceof HTMLElement))continue;
                            for(const prop of ['padding-left','padding-right','margin-left','margin-right'])
                                el.style.setProperty(prop,'0px','important');
                            el.style.setProperty('box-sizing','border-box','important');
                            el.style.setProperty('min-width','0px','important');
                            el.style.setProperty('max-width','100%','important');
                        }
                        auditPane.style.setProperty('width','100%','important');
                        auditPane.style.setProperty('max-width','100%','important');
                    }
                    // V9: match Roles card to Header by removing native tab-body
                    // insets, not by negative margins or enlarging the card.
                    // Only ancestors of RolesMount (up to Tabs) are affected.
                    const rolesMount = tabs.querySelector('.usr-pv8-roles-mount');
                    if (rolesMount && header) {
                        for (let el = rolesMount.parentElement;
                             el && el !== tabs; el = el.parentElement) {
                            if (!(el instanceof HTMLElement)) continue;
                            el.style.setProperty('padding-left','0px','important');
                            el.style.setProperty('padding-right','0px','important');
                            el.style.setProperty('margin-left','0px','important');
                            el.style.setProperty('margin-right','0px','important');
                            el.style.setProperty('min-width','0px','important');
                            el.style.setProperty('max-width','100%','important');
                            el.style.setProperty('box-sizing','border-box','important');
                        }
                        rolesMount.style.setProperty('padding-left','0px','important');
                        rolesMount.style.setProperty('padding-right','0px','important');
                        rolesMount.style.setProperty('margin-left','0px','important');
                        rolesMount.style.setProperty('margin-right','0px','important');
                        rolesMount.style.setProperty('width','100%','important');
                        rolesMount.style.setProperty('min-width','0px','important');
                        rolesMount.style.setProperty('max-width','100%','important');
                    }
                    const scopesMount=tabs.querySelector('.usr-pv10-scopes-mount');
                    if(scopesMount){
                        for(let el=scopesMount.parentElement;el && el!==tabs;el=el.parentElement){
                            if(!(el instanceof HTMLElement)) continue;
                            for(const prop of ['padding-left','padding-right','margin-left','margin-right'])
                                el.style.setProperty(prop,'0px','important');
                            el.style.setProperty('min-width','0px','important');
                            el.style.setProperty('max-width','100%','important');
                            el.style.setProperty('box-sizing','border-box','important');
                        }
                        scopesMount.style.setProperty('width','100%','important');
                        scopesMount.style.setProperty('max-width','100%','important');
                    }
                    const queueMount=tabs.querySelector('.usr-pv12-queues-mount');
                    if(queueMount){
                        for(let el=queueMount.parentElement;el && el!==tabs;el=el.parentElement){
                            if(!(el instanceof HTMLElement))continue;
                            for(const prop of ['padding-left','padding-right','margin-left','margin-right'])
                                el.style.setProperty(prop,'0px','important');
                            el.style.setProperty('min-width','0px','important');
                            el.style.setProperty('max-width','100%','important');
                            el.style.setProperty('box-sizing','border-box','important');
                        }
                        queueMount.style.setProperty('width','100%','important');
                        queueMount.style.setProperty('max-width','100%','important');
                    }
                    const permissionsMount=tabs.querySelector('.usr-pv14-permissions-mount');
                    if(permissionsMount){
                        for(let el=permissionsMount.parentElement;el && el!==tabs;el=el.parentElement){
                            if(!(el instanceof HTMLElement))continue;
                            for(const prop of ['padding-left','padding-right','margin-left','margin-right'])
                                el.style.setProperty(prop,'0px','important');
                            el.style.setProperty('box-sizing','border-box','important');
                            el.style.setProperty('max-width','100%','important');
                            el.style.setProperty('min-width','0px','important');
                        }
                        permissionsMount.style.setProperty('width','100%','important');
                        permissionsMount.style.setProperty('max-width','100%','important');
                    }
                    const panel = tabs.querySelector(".usr-pv2-info-panel");
                    if (!header || !panel) return;
                    // V6's negative margin and forced HEADER width caused the
                    // horizontal scrollbar and clipped the first Profile column.
                    // Clear tab-BODY wrapper padding, and keep the card in normal flow.
                    for (let el = panel.parentElement; el && el !== tabs; el = el.parentElement) {
                        if (!(el instanceof HTMLElement)) continue;
                        el.style.setProperty("padding-left", "0px", "important");
                        el.style.setProperty("padding-right", "0px", "important");
                        el.style.setProperty("margin-left", "0px", "important");
                        el.style.setProperty("margin-right", "0px", "important");
                        el.style.setProperty("min-width", "0px", "important");
                        el.style.setProperty("box-sizing", "border-box", "important");
                    }
                    panel.style.setProperty("margin-left", "0px", "important");
                    panel.style.setProperty("margin-right", "0px", "important");
                    panel.style.setProperty("width", "100%", "important");
                    panel.style.setProperty("max-width", "100%", "important");
                    panel.style.setProperty("min-width", "0px", "important");
                    // Match the HEADER card to the actual safe Profile-card width.
                    // Unlike V6, the info card is NEVER enlarged outside its parent.
                    header.style.setProperty("width", "100%", "important");
                    header.style.setProperty("margin-left", "0px", "important");
                    const p = panel.getBoundingClientRect();
                    const h = header.getBoundingClientRect();
                    if (p.width > 0 && h.width > 0) {
                        const inset = Math.max(0, Math.round(p.left - h.left));
                        const naturalWidth = h.width;
                        const safeWidth = Math.min(Math.round(p.width), Math.round(naturalWidth - inset));
                        if (safeWidth > 200) {
                            header.style.setProperty("width", safeWidth + "px", "important");
                            header.style.setProperty("margin-left", inset + "px", "important");
                        }
                    }
                } catch(e) { console.warn("MCIT Profile V7 appearance sync skipped", e); }
            };
            const scheduleLayout = () => {
                if (runtime.disposed || runtime.layoutScheduled) return;
                runtime.layoutScheduled = true;
                runtime.layoutFrame = window.requestAnimationFrame(() => {
                    runtime.layoutScheduled = false;
                    updateLayout();
                });
            };
            // The visible profile tab is created asynchronously, and recreated on navigation.
            // Only observe node additions/removals, NOT style attributes (avoids loops).
            try {
                runtime.layoutObserver = new MutationObserver(scheduleLayout);
                runtime.layoutObserver.observe(document.body,{childList:true,subtree:true});
                document.addEventListener("click",onProfileTabClick,true);
                window.addEventListener("resize",scheduleLayout);
                scheduleLayout();
            } catch(e) { console.warn("MCIT Profile V6 layout observer unavailable",e); }
            runtime.dispose = () => {
                runtime.disposed = true;
                runtime.sequence++;
                runtime.scopeDialogClose?.();
                runtime.layoutObserver?.disconnect();
                document.removeEventListener("click",onProfileTabClick,true);
                window.removeEventListener("resize",scheduleLayout);
                if (runtime.layoutFrame) window.cancelAnimationFrame(runtime.layoutFrame);
            };
            // First async PDS loading may be incomplete; the next binding change reloads it.
            void runtime.load(request.$context);
            return result;
        }
    },
    {
        request: "crt.HandleViewModelAttributeChangeRequest",
        handler: async (request,next) => {
            const result = await next?.handle(request);
            if (!["PDS_UsrUser_9i5hmwm","PDS_UsrUser_Contact",
                "PDS_UsrUser_Contact_Email","PDS_UsrUser_Name", "Id"].includes(request.attributeName)) return result;
            if (typeof document !== "undefined") {
                const runtime = document.__usrMCITProfileV7;
                if (runtime && !runtime.disposed) void runtime.load(request.$context);
            }
            return result;
        }
    },
    {
        request: "crt.HandleViewModelDestroyRequest",
        handler: async (request,next) => {
            if (typeof document !== "undefined") {
                document.__usrMCITProfileV7?.dispose?.();
                delete document.__usrMCITProfileV7;
                document.getElementById("usr-mcit-userprofile-v7-style")?.remove();
                document.getElementById("usr-mcit-userprofile-v8-roles-style")?.remove();
                document.getElementById("usr-mcit-userprofile-v10-scopes-style")?.remove();
                document.getElementById("usr-mcit-userprofile-v12-queues-style")?.remove();
                document.getElementById("usr-mcit-userprofile-v14-permissions-style")?.remove();
                document.getElementById('usr-mcit-userprofile-v17-audit-style')?.remove();
            }
            return next?.handle(request);
        }
    }
]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{
  "usr.PV2Text": value => {
    if (value==null || value==="") return "—";
    if (typeof value==="string" || typeof value==="number") return String(value);
    if (typeof value==="object") return value.displayValue || value.Name || value.name || "—";
    return "—";
  },
  "usr.PV2Initial": value => {
    const name=(typeof value==="string"?value:value?.displayValue||value?.Name||"").trim();
    return name.charAt(0).toUpperCase() || "U";
  },
  "usr.PV2StatusClasses": value => {
    const name=String(value?.displayValue||value?.Name||value||"").toLowerCase();
    const status=["active","inactive","deactivated"].includes(name)?name:"neutral";
    return ["usr-pv2-status","usr-pv2-status-"+status];
  },
  "usr.PV4InfoStatusClasses": value => {
    const name=String(value?.displayValue||value?.Name||value||"").toLowerCase();
    const status=["active","inactive","deactivated"].includes(name)?name:"neutral";
    return ["usr-pv2-info-value","usr-pv2-info-status","usr-pv2-info-status-"+status];
  },
  "usr.PV2Date": value => {
    if (!value) return "—";
    const v=(typeof value==="object" && !(value instanceof Date))
      ? (value.value || value.displayValue || value.date || null) : value;
    if (!v) return "—";
    const d = v instanceof Date ? v : new Date(v);
    if (!Number.isNaN(d.getTime())) return d.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"});
    return (typeof v==="string" && v!=="[object Object]")?v:"—";
  }
}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});