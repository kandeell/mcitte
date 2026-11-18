define("UsrMCITValidationPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "insert",
				"name": "GridContainer_y40zasf",
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
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_ja6p38p",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
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
					"borderRadius": "none",
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					}
				},
				"parentName": "GridContainer_y40zasf",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_t3r8s0r",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_t3r8s0r_caption)#)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "GridContainer_ja6p38p",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_5fzwc9b",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_5fzwc9b_caption)#)#",
					"labelType": "caption-large",
					"labelThickness": "light",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "GridContainer_ja6p38p",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "EntityStageProgressBar_7m5fmcf",
				"values": {
					"type": "crt.EntityStageProgressBar",
					"saveOnChange": false,
					"askUserToChangeSchema": true,
					"visible": false
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_zdl1xi0",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "large",
						"rowGap": "large"
					},
					"items": [],
					"fitContent": true,
					"visible": true,
					"alignItems": "stretch",
					"color": "primary",
					"borderRadius": "large",
					"padding": {
						"top": "large",
						"bottom": "large",
						"right": "large",
						"left": "large"
					}
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Label_9fsv5uo",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_9fsv5uo_caption)#)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "GridContainer_zdl1xi0",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_v8auq5r",
				"values": {
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
						"rowGap": "medium"
					},
					"items": [],
					"fitContent": true,
					"visible": true,
					"alignItems": "stretch",
					"color": "transparent",
					"borderRadius": "medium",
					"padding": {
						"top": "large",
						"right": "none",
						"bottom": "large",
						"left": "none"
					}
				},
				"parentName": "GridContainer_zdl1xi0",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FlexContainer_7jjgtdl",
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
					"alignItems": "center",
					"justifyContent": "center",
					"gap": "small"
				},
				"parentName": "GridContainer_v8auq5r",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Icon_3b6b4fa",
				"values": {
					"type": "crt.Icon",
					"iconName": "checkmark-icon",
					"size": "32",
					"color": "#0058EF",
					"backgroundType": "square",
					"backgroundColor": "#FFFFFF",
					"padding": "l",
					"visible": true,
					"ariaLabel": "",
					"tooltip": ""
				},
				"parentName": "FlexContainer_7jjgtdl",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_minxvi6",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_minxvi6_caption)#)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_7jjgtdl",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Label_j4n92l5",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_j4n92l5_caption)#)#",
					"labelType": "caption",
					"labelThickness": "light",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_7jjgtdl",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Button_086gu0s",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_086gu0s_caption)#",
					"color": "primary",
					"disabled": false,
					"size": "large",
					"iconPosition": "right-icon",
					"visible": true,
					"icon": "image-update"
				},
				"parentName": "FlexContainer_7jjgtdl",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_umqzjyz",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 3,
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
					"visible": false,
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
				"parentName": "GridContainer_zdl1xi0",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "FlexContainer_21osgfu",
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
				"parentName": "GridContainer_umqzjyz",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_5bq1hs4",
				"values": {
					"type": "crt.Label",
					"caption": "#ResourceString(Label_5bq1hs4_caption)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "FlexContainer_21osgfu",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_8nzz5ct",
				"values": {
					"type": "crt.Label",
					"caption": "#ResourceString(Label_8nzz5ct_caption)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "FlexContainer_21osgfu",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Label_utryyvx",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.Label",
					"caption": "#ResourceString(Label_utryyvx_caption)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "GridContainer_umqzjyz",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Checkbox_cwhf4iy",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 3,
						"rowSpan": 1
					},
					"type": "crt.Checkbox",
					"value": true,
					"disabled": false,
					"inversed": false,
					"label": "$Resources.Strings.UsrVMRequestDS_UsrColumn21_k0z0ckd",
					"ariaLabel": "",
					"labelPosition": "right",
					"tooltip": "",
					"control": "$UsrVMRequestDS_UsrColumn21_k0z0ckd",
					"visible": true,
					"readonly": false,
					"placeholder": ""
				},
				"parentName": "GridContainer_umqzjyz",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Button_azpt0zg",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 4,
						"rowSpan": 1
					},
					"type": "crt.Button",
					"caption": "#ResourceString(Button_azpt0zg_caption)#",
					"color": "default",
					"disabled": false,
					"size": "large",
					"iconPosition": "left-icon",
					"visible": true,
					"icon": "reload-icon"
				},
				"parentName": "GridContainer_umqzjyz",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_yw0cqvz",
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
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Button_c5wpk9e",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Button",
					"caption": "#ResourceString(Button_c5wpk9e_caption)#",
					"color": "default",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "GridContainer_yw0cqvz",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_1vf7o4i",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
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
					"alignItems": "flex-end",
					"justifyContent": "end",
					"gap": "small"
				},
				"parentName": "GridContainer_yw0cqvz",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Button_cm1pfc2",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_cm1pfc2_caption)#",
					"color": "outline",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "FlexContainer_1vf7o4i",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Button_nu37gyn",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_nu37gyn_caption)#",
					"color": "primary",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-text",
					"visible": true,
					"clicked": {
						"request": "crt.OpenPageRequest",
						"params": {
							"schemaName": "UsrMCITReviewSubmitPage"
						}
					},
					"clickMode": "default"
				},
				"parentName": "FlexContainer_1vf7o4i",
				"propertyName": "items",
				"index": 1
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [],
				"values": {
					"attributes": {
						"UsrVMRequestDS_UsrColumn21_k0z0ckd": {
							"modelConfig": {
								"path": "UsrVMRequestDS.UsrColumn21"
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
						}
					},
					"primaryDataSourceName": "UsrVMRequestDS"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});