define("UsrMCITDashboardPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "insert",
				"name": "GridContainer_vlwtcsp",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 12,
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
				"parentName": "Main",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_woovnul",
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
				"parentName": "GridContainer_vlwtcsp",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_z6xut4l",
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
				"parentName": "GridContainer_woovnul",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_m7t18sx",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_m7t18sx_caption)#)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_z6xut4l",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_jauafra",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "wrap",
					"items": [],
					"fitContent": true
				},
				"parentName": "FlexContainer_z6xut4l",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Label_eeu90av",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_eeu90av_caption)#)#",
					"labelType": "caption",
					"labelThickness": "light",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_jauafra",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_7f2936k",
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
					"alignItems": "flex-start",
					"justifyContent": "end",
					"gap": "small"
				},
				"parentName": "GridContainer_woovnul",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Button_g52zqtm",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_g52zqtm_caption)#",
					"color": "outline",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "FlexContainer_7f2936k",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Button_mhxx4wf",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_mhxx4wf_caption)#",
					"color": "outline",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-text",
					"visible": true,
					"clicked": {
						"request": "crt.OpenPageRequest",
						"params": {
							"schemaName": "UsrMCIT_ListPage"
						}
					},
					"clickMode": "default"
				},
				"parentName": "FlexContainer_7f2936k",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Button_cwl3a5k",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_cwl3a5k_caption)#",
					"color": "primary",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-text",
					"visible": true,
					"clicked": {
						"request": "crt.OpenPageRequest",
						"params": {
							"schemaName": "UsrMCITNewRequestPage"
						}
					},
					"clickMode": "default"
				},
				"parentName": "FlexContainer_7f2936k",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridContainer_pru0eh6",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 12,
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
					"borderRadius": "none",
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					}
				},
				"parentName": "Main",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_kdhk5p0",
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
					"color": "primary",
					"borderRadius": "medium",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"right": "medium",
						"left": "medium"
					}
				},
				"parentName": "GridContainer_pru0eh6",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_sujfrer",
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
				"parentName": "GridContainer_kdhk5p0",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_9pxpkh6",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 12,
						"row": 3,
						"rowSpan": 1
					},
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_9pxpkh6_caption)#)#",
					"labelType": "body-large",
					"labelThickness": "light",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "#FDEDCC",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "Main",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GridContainer_lzyj33w",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 12,
						"row": 4,
						"rowSpan": 3
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
				"parentName": "Main",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GridContainer_hajn72s",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 4
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
				"parentName": "GridContainer_lzyj33w",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_mm412rr",
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
					"justifyContent": "space-between",
					"gap": "small"
				},
				"parentName": "GridContainer_hajn72s",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_2deae6n",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_2deae6n_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "{0}",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"decimalPrecision": 0,
								"type": "number",
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"comparisonProviding": null
						},
						"comparison": null,
						"hint": "#ResourceString(IndicatorWidget_2deae6n_hint)#"
					}
				},
				"parentName": "FlexContainer_mm412rr",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_6y33pz0",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_6y33pz0_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "{0}",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"decimalPrecision": 0,
								"type": "number",
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"comparisonProviding": null
						},
						"comparison": null,
						"hint": "#ResourceString(IndicatorWidget_6y33pz0_hint)#"
					}
				},
				"parentName": "FlexContainer_mm412rr",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_2qag9s9",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_2qag9s9_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "{0}",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"decimalPrecision": 0,
								"type": "number",
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"comparisonProviding": null
						},
						"comparison": null,
						"hint": "#ResourceString(IndicatorWidget_2qag9s9_hint)#"
					}
				},
				"parentName": "FlexContainer_mm412rr",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_21ie3mb",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_21ie3mb_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "{0}",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"decimalPrecision": 0,
								"type": "number",
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"comparisonProviding": null
						},
						"comparison": null,
						"hint": "#ResourceString(IndicatorWidget_21ie3mb_hint)#"
					}
				},
				"parentName": "FlexContainer_mm412rr",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_mywhd95",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_mywhd95_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "{0}",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"decimalPrecision": 0,
								"type": "number",
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"comparisonProviding": null
						},
						"comparison": null,
						"hint": "#ResourceString(IndicatorWidget_mywhd95_hint)#"
					}
				},
				"parentName": "FlexContainer_mm412rr",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_d2pmpjz",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_d2pmpjz_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "{0}",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"decimalPrecision": 0,
								"type": "number",
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"comparisonProviding": null
						},
						"comparison": null,
						"hint": "#ResourceString(IndicatorWidget_d2pmpjz_hint)#"
					}
				},
				"parentName": "FlexContainer_mm412rr",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_bikimy9",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_bikimy9_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "{0}",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"decimalPrecision": 0,
								"type": "number",
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"comparisonProviding": null
						},
						"comparison": null,
						"hint": "#ResourceString(IndicatorWidget_bikimy9_hint)#"
					}
				},
				"parentName": "FlexContainer_mm412rr",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "GridContainer_723svg7",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 12,
						"row": 7,
						"rowSpan": 3
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
				"parentName": "Main",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "GridContainer_wgvp2c1",
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
				"parentName": "GridContainer_723svg7",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_csgyj0p",
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
				"parentName": "GridContainer_wgvp2c1",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_jmay2us",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_jmay2us_caption)#)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_csgyj0p",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_92ffj97",
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
					"justifyContent": "start",
					"gap": "small"
				},
				"parentName": "FlexContainer_csgyj0p",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_m4ini6n",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_m4ini6n_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "{0}",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"decimalPrecision": 0,
								"type": "number",
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"comparisonProviding": null
						},
						"comparison": null,
						"hint": "#ResourceString(IndicatorWidget_m4ini6n_hint)#"
					}
				},
				"parentName": "FlexContainer_92ffj97",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_w5wtvza",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_w5wtvza_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "{0}",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"decimalPrecision": 0,
								"type": "number",
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"comparisonProviding": null
						},
						"comparison": null,
						"hint": "#ResourceString(IndicatorWidget_w5wtvza_hint)#"
					}
				},
				"parentName": "FlexContainer_92ffj97",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_uv7nsq9",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_uv7nsq9_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "{0}",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"decimalPrecision": 0,
								"type": "number",
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"comparisonProviding": null
						},
						"comparison": null,
						"hint": "#ResourceString(IndicatorWidget_uv7nsq9_hint)#"
					}
				},
				"parentName": "FlexContainer_92ffj97",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_uzmusix",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_uzmusix_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "green"
						},
						"text": {
							"template": "{0}",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"decimalPrecision": 0,
								"type": "number",
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"comparisonProviding": null
						},
						"comparison": null,
						"hint": "#ResourceString(IndicatorWidget_uzmusix_hint)#"
					}
				},
				"parentName": "FlexContainer_92ffj97",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "FlexContainer_wgctq21",
				"values": {
					"layoutConfig": {
						"column": 2,
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
				"parentName": "GridContainer_wgvp2c1",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Label_p8twp1e",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_p8twp1e_caption)#)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_wgctq21",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ChartWidget_uunh7ei",
				"values": {
					"type": "crt.ChartWidget",
					"config": {
						"title": "#ResourceString(ChartWidget_uunh7ei_title)#",
						"theme": "without-fill",
						"color": "dark-blue",
						"series": [
							{
								"type": "doughnut"
							}
						]
					}
				},
				"parentName": "FlexContainer_wgctq21",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_f2svnks",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 12,
						"row": 10,
						"rowSpan": 5
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
				"parentName": "Main",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "GridContainer_y17q12k",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 10
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
				"parentName": "GridContainer_f2svnks",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_xn5pm1j",
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
				"parentName": "GridContainer_y17q12k",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_gjocyzg",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_gjocyzg_caption)#)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_xn5pm1j",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "DataGrid_wxrjas5",
				"values": {
					"type": "crt.DataGrid",
					"features": {
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						}
					},
					"items": "$DataGrid_wxrjas5",
					"primaryColumnName": "DataGrid_wxrjas5DS_Id",
					"columns": [
						{
							"id": "4ae9d106-2f9c-cb7d-ef9f-0e83c032af71",
							"code": "DataGrid_wxrjas5DS_UsrName",
							"caption": "#ResourceString(DataGrid_wxrjas5DS_UsrName)#",
							"dataValueType": 28
						}
					],
					"placeholder": false
				},
				"parentName": "FlexContainer_xn5pm1j",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_3vorfo4",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 12,
						"row": 15,
						"rowSpan": 4
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
				"parentName": "Main",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "GridContainer_5ascavc",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 8
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
				"parentName": "GridContainer_3vorfo4",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_k2340ou",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 7
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
				"parentName": "GridContainer_5ascavc",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_aqnnsss",
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
				"parentName": "GridContainer_k2340ou",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_qvbpyxb",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_qvbpyxb_caption)#)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_aqnnsss",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_2wzjlte",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 7
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
				"parentName": "GridContainer_5ascavc",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FlexContainer_gw9wqvc",
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
				"parentName": "GridContainer_2wzjlte",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_hakc153",
				"values": {
					"type": "crt.Label",
					"caption": "#MacrosTemplateString(#ResourceString(Label_hakc153_caption)#)#",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_gw9wqvc",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_img2xmg",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
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
				"parentName": "GridContainer_2wzjlte",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Button_jnkidpe",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Button",
					"caption": "#ResourceString(Button_jnkidpe_caption)#",
					"color": "outline",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-text",
					"visible": true,
					"clicked": {
						"request": "crt.OpenPageRequest",
						"params": {
							"schemaName": "UsrMCITNewRequestPage"
						}
					},
					"clickMode": "default"
				},
				"parentName": "GridContainer_img2xmg",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Button_xbn9a29",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Button",
					"caption": "#ResourceString(Button_xbn9a29_caption)#",
					"color": "outline",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-text",
					"visible": true,
					"clicked": {
						"request": "crt.OpenPageRequest",
						"params": {
							"schemaName": "UsrMCIT_ListPage"
						}
					},
					"clickMode": "default"
				},
				"parentName": "GridContainer_img2xmg",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Button_58p1fy7",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.Button",
					"caption": "#ResourceString(Button_58p1fy7_caption)#",
					"color": "outline",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "GridContainer_img2xmg",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Button_10jnoef",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.Button",
					"caption": "#ResourceString(Button_10jnoef_caption)#",
					"color": "outline",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-text",
					"visible": true
				},
				"parentName": "GridContainer_img2xmg",
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
					"DataGrid_wxrjas5": {
						"isCollection": true,
						"modelConfig": {
							"path": "DataGrid_wxrjas5DS"
						},
						"viewModelConfig": {
							"attributes": {
								"DataGrid_wxrjas5DS_UsrName": {
									"modelConfig": {
										"path": "DataGrid_wxrjas5DS.UsrName"
									}
								},
								"DataGrid_wxrjas5DS_Id": {
									"modelConfig": {
										"path": "DataGrid_wxrjas5DS.Id"
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
					"dataSources": {
						"DataGrid_wxrjas5DS": {
							"type": "crt.EntityDataSource",
							"scope": "viewElement",
							"config": {
								"entitySchemaName": "UsrVMRequest",
								"attributes": {
									"UsrName": {
										"path": "UsrName"
									}
								}
							}
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