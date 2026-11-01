define("UsrMCITRoles_ListPage",
    /**SCHEMA_DEPS*/[
        "@creatio-devkit/common",
        "css!UsrMCITRolesPageCSS"
    ]/**SCHEMA_DEPS*/,
    function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
        return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "remove",
				"name": "MainHeader"
			},
			{
				"operation": "remove",
				"name": "TitleContainer"
			},
			{
				"operation": "remove",
				"name": "PageTitle"
			},
			{
				"operation": "remove",
				"name": "ActionButtonsContainer"
			},
			{
				"operation": "remove",
				"name": "AddButton"
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
				"operation": "remove",
				"name": "DataTable"
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
				"name": "FlexContainer_5xu0pyy",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"fitContent": false,
					"alignItems": "stretch",
					"classes": [
						"mcit-roles-page"
					]
				},
				"parentName": "Main",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_7jn50m4",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "wrap",
					"items": [],
					"fitContent": false,
					"justifyContent": "space-between",
					"alignItems": "center",
					"gap": "small",
					"classes": [
						"mcit-roles-header"
					]
				},
				"parentName": "FlexContainer_5xu0pyy",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FlexContainer_alakd18",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"wrap": "nowrap",
					"items": [],
					"fitContent": true
				},
				"parentName": "FlexContainer_7jn50m4",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_xa4l2d7",
				"values": {
					"type": "crt.Label",
					"caption": "Role Management",
					"labelType": "headline-1",
					"labelColor": "#0F172A",
					"headingLevel": "label",
					"visible": true
				},
				"parentName": "FlexContainer_alakd18",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_n5j0lca",
				"values": {
					"type": "crt.Label",
					"caption": "Dynamic, configuration-driven roles and permissions",
					"labelType": "body",
					"labelColor": "#64748B",
					"visible": true
				},
				"parentName": "FlexContainer_alakd18",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Button_zce85wm",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_zce85wm_caption)#",
					"color": "primary",
					"size": "large",
					"disabled": false,
					"icon": "add-button-icon",
					"iconPosition": "left-icon",
					"visible": true,
					"clicked": {
						"request": "crt.CreateRecordRequest",
						"params": {
							"entityName": "UsrMCITRole"
						}
					},
					"classes": [
						"mcit-create-role"
					],
					"clickMode": "default"
				},
				"parentName": "FlexContainer_7jn50m4",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_99tsw8a",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"rows": "auto auto",
					"items": [],
					"fitContent": false,
					"visible": true,
					"borderRadius": "medium",
					"color": "primary",
					"classes": [
						"mcit-role-filter-card"
					],
					"gap": {
						"columnGap": "small",
						"rowGap": "small"
					},
					"padding": {
						"top": "medium",
						"right": "medium",
						"bottom": "medium",
						"left": "medium"
					}
				},
				"parentName": "FlexContainer_5xu0pyy",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FlexContainer_ar0u90b",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"fitContent": false,
					"visible": true,
					"justifyContent": "space-between",
					"alignItems": "center",
					"gap": "small",
					"classes": [
						"mcit-roles-filter-row"
					],
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_99tsw8a",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SearchFilter_7irptcm",
				"values": {
					"type": "crt.SearchFilter",
					"placeholder": "Search roles...",
					"iconOnly": false,
					"classes": [
						"mcit-role-search"
					],
					"_filterOptions": {
						"expose": [
							{
								"attribute": "SearchFilter_7irptcm_DataGrid_l3ofv19",
								"converters": [
									{
										"converter": "crt.SearchFilterAttributeConverter",
										"args": [
											"DataGrid_l3ofv19"
										]
									}
								]
							}
						],
						"from": [
							"SearchFilter_7irptcm_SearchValue",
							"SearchFilter_7irptcm_FilteredColumnsGroups"
						]
					}
				},
				"parentName": "FlexContainer_ar0u90b",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "QuickFilter_4d1u24e",
				"values": {
					"type": "crt.QuickFilter",
					"filterType": "lookup",
					"classes": [
						"mcit-role-type-filter"
					],
					"config": {
						"caption": "All Types",
						"hint": "",
						"icon": "filter-column-icon",
						"iconPosition": "left-icon",
						"defaultValue": [],
						"entitySchemaName": "UsrMCITRoleCategory",
						"recordsFilter": null,
						"defaultValueListSorting": null
					},
					"_filterOptions": {
						"expose": [
							{
								"attribute": "QuickFilter_4d1u24e_DataGrid_l3ofv19",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "DataGrid_l3ofv19",
													"filterColumn": "UsrRoleCategory"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							}
						],
						"from": "QuickFilter_4d1u24e_Value"
					}
				},
				"parentName": "FlexContainer_ar0u90b",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FlexContainer_aau8th3",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "wrap",
					"items": [],
					"fitContent": true,
					"visible": true,
					"justifyContent": "flex-start",
					"gap": "small",
					"classes": "$UsrRoleStatusCssClasses",
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_99tsw8a",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Button_51m9doe",
				"values": {
					"type": "crt.Button",
					"caption": "All",
					"color": "default",
					"size": "large",
					"disabled": false,
					"iconPosition": "only-text",
					"visible": true,
					"classes": [
						"mcit-status-chip",
						"mcit-chip-all"
					],
					"clicked": {
						"request": "usr.SetRoleStatusFilter",
						"params": {
							"status": "All"
						}
					}
				},
				"parentName": "FlexContainer_aau8th3",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Button_3utviwt",
				"values": {
					"type": "crt.Button",
					"caption": "Active",
					"color": "default",
					"size": "large",
					"disabled": false,
					"iconPosition": "only-text",
					"visible": true,
					"classes": [
						"mcit-status-chip",
						"mcit-chip-active"
					],
					"clicked": {
						"request": "usr.SetRoleStatusFilter",
						"params": {
							"status": "Active"
						}
					}
				},
				"parentName": "FlexContainer_aau8th3",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Button_2urezgq",
				"values": {
					"type": "crt.Button",
					"caption": "Inactive",
					"color": "default",
					"size": "large",
					"disabled": false,
					"iconPosition": "only-text",
					"visible": true,
					"classes": [
						"mcit-status-chip",
						"mcit-chip-inactive"
					],
					"clicked": {
						"request": "usr.SetRoleStatusFilter",
						"params": {
							"status": "Inactive"
						}
					}
				},
				"parentName": "FlexContainer_aau8th3",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Button_1od23cq",
				"values": {
					"type": "crt.Button",
					"caption": "Draft",
					"color": "default",
					"size": "large",
					"disabled": false,
					"iconPosition": "only-text",
					"visible": true,
					"classes": [
						"mcit-status-chip",
						"mcit-chip-draft"
					],
					"clicked": {
						"request": "usr.SetRoleStatusFilter",
						"params": {
							"status": "Draft"
						}
					}
				},
				"parentName": "FlexContainer_aau8th3",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "DataGrid_l3ofv19",
				"values": {
					"type": "crt.DataGrid",
					"items": "$DataGrid_l3ofv19",
					"visible": true,
					"fitContent": false,
					"primaryColumnName": "DataGrid_l3ofv19DS_Id",
					"classes": [
						"mcit-roles-list"
					],
					"features": {
						"rows": {
							"selection": {
								"enable": true,
								"multiple": true
							}
						},
						"header": {
							"visible": true
						},
						"editable": {
							"enable": true,
							"itemsCreation": true,
							"floatingEditPanel": true
						},
						"columns": {
							"dragAndDrop": false,
							"resizing": true,
							"sorting": true
						}
					},
					"columns": [
						{
							"id": "6e653b44-66ea-106d-1ad0-05bf95a93879",
							"code": "DataGrid_l3ofv19DS_UsrName",
							"caption": "Role Name",
							"dataValueType": 28
						},
						{
							"id": "0c7114cd-258f-fdb9-1416-2f63fd369d9f",
							"code": "DataGrid_l3ofv19DS_UsrRoleCategory",
							"caption": "Type",
							"dataValueType": 10
						},
						{
							"id": "4b48dd53-34b3-ad1f-baac-71acadf0a9e5",
							"code": "DataGrid_l3ofv19DS_UsrDescription",
							"caption": "Description",
							"dataValueType": 29
						},
						{
							"id": "6b65bc58-3f98-489f-9d90-fcbca95dc001",
							"code": "DataGrid_l3ofv19DS_ModifiedOn",
							"caption": "Last updated",
							"dataValueType": 7,
							"width": 190
						},
						{
							"id": "84853964-5199-5069-e83d-b19441037b9a",
							"code": "DataGrid_l3ofv19DS_UsrMCITRoleStatuses",
							"caption": "Status",
							"dataValueType": 10
						},
						{
							"id": "517991b1-3a82-a222-cf73-cc77f50c25ce",
							"code": "DataGrid_l3ofv19DS_UsrScopeBehavior",
							"caption": "#ResourceString(DataGrid_l3ofv19DS_UsrScopeBehavior)#",
							"dataValueType": 10
						},
						{
							"id": "560420f6-76da-96cf-55ac-49889af5c247",
							"code": "DataGrid_l3ofv19DS_UsrUsersCount",
							"caption": "#ResourceString(DataGrid_l3ofv19DS_UsrUsersCount)#",
							"dataValueType": 4
						},
						{
							"id": "f1da5183-6a82-7180-1db9-bcb9275b8fa5",
							"code": "DataGrid_l3ofv19DS_UsrPermissionsCount",
							"caption": "#ResourceString(DataGrid_l3ofv19DS_UsrPermissionsCount)#",
							"dataValueType": 4
						},
						{
							"id": "de7abc1f-4beb-43ff-50f4-dff3078d72dc",
							"code": "DataGrid_l3ofv19DS_CreatedBy",
							"caption": "#ResourceString(DataGrid_l3ofv19DS_CreatedBy)#",
							"dataValueType": 10
						}
					],
					"placeholder": false
				},
				"parentName": "FlexContainer_5xu0pyy",
				"propertyName": "items",
				"index": 2
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"attributes"
				],
				"values": {
					"DataGrid_l3ofv19": {
						"isCollection": true,
						"modelConfig": {
							"path": "DataGrid_l3ofv19DS",
							"filterAttributes": [
								{
									"name": "SearchFilter_7irptcm_DataGrid_l3ofv19",
									"loadOnChange": true
								},
								{
									"name": "QuickFilter_4d1u24e_DataGrid_l3ofv19",
									"loadOnChange": true
								},
								{
									"name": "UsrRoleStatusFilter",
									"loadOnChange": true
								}
							],
							"sortingConfig": {
								"default": [
									{
										"direction": "asc",
										"columnName": "UsrPermissionsCount"
									}
								]
							}
						},
						"viewModelConfig": {
							"attributes": {
								"DataGrid_l3ofv19DS_UsrName": {
									"modelConfig": {
										"path": "DataGrid_l3ofv19DS.UsrName"
									}
								},
								"DataGrid_l3ofv19DS_UsrRoleCategory": {
									"modelConfig": {
										"path": "DataGrid_l3ofv19DS.UsrRoleCategory"
									}
								},
								"DataGrid_l3ofv19DS_UsrDescription": {
									"modelConfig": {
										"path": "DataGrid_l3ofv19DS.UsrDescription"
									}
								},
								"DataGrid_l3ofv19DS_ModifiedOn": {
									"modelConfig": {
										"path": "DataGrid_l3ofv19DS.ModifiedOn"
									}
								},
								"DataGrid_l3ofv19DS_UsrMCITRoleStatuses": {
									"modelConfig": {
										"path": "DataGrid_l3ofv19DS.UsrMCITRoleStatuses"
									}
								},
								"DataGrid_l3ofv19DS_UsrScopeBehavior": {
									"modelConfig": {
										"path": "DataGrid_l3ofv19DS.UsrScopeBehavior"
									}
								},
								"DataGrid_l3ofv19DS_UsrUsersCount": {
									"modelConfig": {
										"path": "DataGrid_l3ofv19DS.UsrUsersCount"
									}
								},
								"DataGrid_l3ofv19DS_UsrPermissionsCount": {
									"modelConfig": {
										"path": "DataGrid_l3ofv19DS.UsrPermissionsCount"
									}
								},
								"DataGrid_l3ofv19DS_CreatedBy": {
									"modelConfig": {
										"path": "DataGrid_l3ofv19DS.CreatedBy"
									}
								},
								"DataGrid_l3ofv19DS_Id": {
									"modelConfig": {
										"path": "DataGrid_l3ofv19DS.Id"
									}
								}
							}
						}
					},
					"UsrRoleStatusFilter": {
						"value": null
					},
					"UsrRoleStatusCssClasses": {
						"value": [
							"mcit-role-status-all"
						]
					}
				}
			}
		]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"dataSources"
				],
				"values": {
					"DataGrid_l3ofv19DS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "UsrMCITRole",
							"attributes": {
								"UsrName": {
									"path": "UsrName"
								},
								"UsrRoleCategory": {
									"path": "UsrRoleCategory"
								},
								"UsrDescription": {
									"path": "UsrDescription"
								},
								"ModifiedOn": {
									"path": "ModifiedOn"
								},
								"UsrMCITRoleStatuses": {
									"path": "UsrMCITRoleStatuses"
								},
								"UsrScopeBehavior": {
									"path": "UsrScopeBehavior"
								},
								"UsrUsersCount": {
									"path": "UsrUsersCount"
								},
								"UsrPermissionsCount": {
									"path": "UsrPermissionsCount"
								},
								"CreatedBy": {
									"path": "CreatedBy"
								}
							}
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
					"entitySchemaName": "UsrMCITRole"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[
            {
                request: "usr.SetRoleStatusFilter",
                handler: async (request, next) => {
                    const status = request.status;

                    if (!["All", "Active", "Inactive", "Draft"].includes(status)) {
                        return next?.handle(request);
                    }

                    request.$context.UsrRoleStatusCssClasses = [
                        "mcit-role-status-" + status.toLowerCase()
                    ];

                    if (status === "All") {
                        request.$context.UsrRoleStatusFilter = null;
                    } else {
                        const filter = new sdk.FilterGroup();

                        await filter.addSchemaColumnFilterWithParameter(
                            sdk.ComparisonType.Equal,
                            "UsrMCITRoleStatuses.Name",
                            status
                        );

                        const preparedFilter = Object.assign({}, filter);
                        preparedFilter.items = filter.items;
                        request.$context.UsrRoleStatusFilter = preparedFilter;
                    }

                    return next?.handle(request);
                }
            }
        ]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{} /**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{} /**SCHEMA_VALIDATORS*/
	};
});