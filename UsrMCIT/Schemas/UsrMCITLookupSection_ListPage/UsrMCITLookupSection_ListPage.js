define("UsrMCITLookupSection_ListPage", /**SCHEMA_DEPS*/["@creatio-devkit/common", "css!UsrMCITLookupDataStyles"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
  return {
    viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
    {
        "operation": "merge",
        "name": "Main",
        "values": {
            "classes": [
                "mcit-lookup-page"
            ]
        }
    },
    {
        "operation": "merge",
        "name": "MainHeader",
        "values": {
            "visible": false
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
        "name": "FolderTree"
    },
    {
        "operation": "remove",
        "name": "Filters"
    },
    {
        "operation": "remove",
        "name": "Dashboards"
    },
    {
        "operation": "remove",
        "name": "DashboardsContainer"
    },
    {
        "operation": "remove",
        "name": "DashboardsTabContainer"
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Breadcrumb",
        "values": {
            "type": "crt.Label",
            "caption": "Admin Portal  /  Lookup Data",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-breadcrumb"
            ]
        },
        "parentName": "Main",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Shell",
        "values": {
            "type": "crt.GridContainer",
            "columns": [
                "minmax(280px, 27%)",
                "minmax(0, 1fr)"
            ],
            "rows": "minmax(max-content, 32px)",
            "items": [],
            "fitContent": true,
            "gap": {
                "columnGap": "none",
                "rowGap": "none"
            },
            "classes": [
                "mcit-lookup-shell"
            ]
        },
        "parentName": "Main",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Left",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-left"
            ],
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "UsrLookup_Shell",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_GroupsHeading",
        "values": {
            "type": "crt.Label",
            "caption": "LOOKUP GROUPS",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-groups-heading"
            ]
        },
        "parentName": "UsrLookup_Left",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "merge",
        "name": "DataTable",
        "values": {
            "items": "$Items",
            "classes": [
                "mcit-lookup-registry-grid"
            ],
            "primaryColumnName": "PDS_Id",
            "features": {
                "rows": {
                    "selection": {
                        "enable": true,
                        "multiple": false
                    }
                }
            },
            "columns": [
                {
                    "id": "5dd974ed-06b8-467a-8f2a-5dd1893ab771",
                    "code": "PDS_UsrName",
                    "caption": "Lookup group",
                    "dataValueType": 28,
                    "width": 245
                },
                {
                    "id": "ca6caacc-22be-4fef-9a98-274b478ed33a",
                    "code": "PDS_UsrRequired",
                    "caption": "Required",
                    "dataValueType": 12,
                    "width": 80
                }
            ],
            "rowToolbarItems": [
                {
                    "type": "crt.MenuItem",
                    "caption": "View values",
                    "icon": "open-button-icon",
                    "clicked": {
                        "request": "usr.Lookup_SelectGroup",
                        "params": {
                            "itemsAttributeName": "Items",
                            "recordId": "$Items.PDS_Id"
                        },
                        "useRelativeContext": true
                    }
                }
            ],
            "visible": "$UsrLookup_ShowRegistry"
        }
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Menu",
        "values": {
            "type": "crt.FlexContainer",
            "visible": "$UsrLookup_ShowStaticMenu",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-menu"
            ]
        },
        "parentName": "UsrLookup_Left",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Row_AUTHORITIES",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "alignItems": "center",
            "justifyContent": "space-between",
            "gap": "small",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-row"
            ]
        },
        "parentName": "UsrLookup_Menu",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Cell_AUTHORITIES",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-content"
            ]
        },
        "parentName": "UsrLookup_Row_AUTHORITIES",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Button_AUTHORITIES",
        "values": {
            "type": "crt.Button",
            "caption": "Government Authorities",
            "color": "$UsrLookup_Color_AUTHORITIES",
            "pressed": "$UsrLookup_Pressed_AUTHORITIES",
            "size": "medium",
            "iconPosition": "only-text",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-button"
            ],
            "clicked": {
                "request": "usr.Lookup_SelectMenu",
                "params": {
                    "groupCode": "AUTHORITIES"
                }
            }
        },
        "parentName": "UsrLookup_Cell_AUTHORITIES",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Meta_AUTHORITIES",
        "values": {
            "type": "crt.Label",
            "caption": "View values",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-meta"
            ]
        },
        "parentName": "UsrLookup_Cell_AUTHORITIES",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Req_AUTHORITIES",
        "values": {
            "type": "crt.Label",
            "caption": "Req",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-req"
            ]
        },
        "parentName": "UsrLookup_Row_AUTHORITIES",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Row_PROJECTS",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "alignItems": "center",
            "justifyContent": "space-between",
            "gap": "small",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-row"
            ]
        },
        "parentName": "UsrLookup_Menu",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Cell_PROJECTS",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-content"
            ]
        },
        "parentName": "UsrLookup_Row_PROJECTS",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Button_PROJECTS",
        "values": {
            "type": "crt.Button",
            "caption": "Projects",
            "color": "$UsrLookup_Color_PROJECTS",
            "pressed": "$UsrLookup_Pressed_PROJECTS",
            "size": "medium",
            "iconPosition": "only-text",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-button"
            ],
            "clicked": {
                "request": "usr.Lookup_SelectMenu",
                "params": {
                    "groupCode": "PROJECTS"
                }
            }
        },
        "parentName": "UsrLookup_Cell_PROJECTS",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Meta_PROJECTS",
        "values": {
            "type": "crt.Label",
            "caption": "View values",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-meta"
            ]
        },
        "parentName": "UsrLookup_Cell_PROJECTS",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Req_PROJECTS",
        "values": {
            "type": "crt.Label",
            "caption": "Req",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-req"
            ]
        },
        "parentName": "UsrLookup_Row_PROJECTS",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Row_REQUEST_TYPES",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "alignItems": "center",
            "justifyContent": "space-between",
            "gap": "small",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-row"
            ]
        },
        "parentName": "UsrLookup_Menu",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Cell_REQUEST_TYPES",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-content"
            ]
        },
        "parentName": "UsrLookup_Row_REQUEST_TYPES",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Button_REQUEST_TYPES",
        "values": {
            "type": "crt.Button",
            "caption": "Request Types",
            "color": "$UsrLookup_Color_REQUEST_TYPES",
            "pressed": "$UsrLookup_Pressed_REQUEST_TYPES",
            "size": "medium",
            "iconPosition": "only-text",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-button"
            ],
            "clicked": {
                "request": "usr.Lookup_SelectMenu",
                "params": {
                    "groupCode": "REQUEST_TYPES"
                }
            }
        },
        "parentName": "UsrLookup_Cell_REQUEST_TYPES",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Meta_REQUEST_TYPES",
        "values": {
            "type": "crt.Label",
            "caption": "View values",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-meta"
            ]
        },
        "parentName": "UsrLookup_Cell_REQUEST_TYPES",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Req_REQUEST_TYPES",
        "values": {
            "type": "crt.Label",
            "caption": "Req",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-req"
            ]
        },
        "parentName": "UsrLookup_Row_REQUEST_TYPES",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Row_REJECTION",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "alignItems": "center",
            "justifyContent": "space-between",
            "gap": "small",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-row"
            ]
        },
        "parentName": "UsrLookup_Menu",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Cell_REJECTION",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-content"
            ]
        },
        "parentName": "UsrLookup_Row_REJECTION",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Button_REJECTION",
        "values": {
            "type": "crt.Button",
            "caption": "Rejection Categories",
            "color": "$UsrLookup_Color_REJECTION",
            "pressed": "$UsrLookup_Pressed_REJECTION",
            "size": "medium",
            "iconPosition": "only-text",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-button"
            ],
            "clicked": {
                "request": "usr.Lookup_SelectMenu",
                "params": {
                    "groupCode": "REJECTION"
                }
            }
        },
        "parentName": "UsrLookup_Cell_REJECTION",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Meta_REJECTION",
        "values": {
            "type": "crt.Label",
            "caption": "Pending mapping",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-meta"
            ]
        },
        "parentName": "UsrLookup_Cell_REJECTION",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Row_CORRECTION",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "alignItems": "center",
            "justifyContent": "space-between",
            "gap": "small",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-row"
            ]
        },
        "parentName": "UsrLookup_Menu",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Cell_CORRECTION",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-content"
            ]
        },
        "parentName": "UsrLookup_Row_CORRECTION",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Button_CORRECTION",
        "values": {
            "type": "crt.Button",
            "caption": "Correction Categories",
            "color": "$UsrLookup_Color_CORRECTION",
            "pressed": "$UsrLookup_Pressed_CORRECTION",
            "size": "medium",
            "iconPosition": "only-text",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-button"
            ],
            "clicked": {
                "request": "usr.Lookup_SelectMenu",
                "params": {
                    "groupCode": "CORRECTION"
                }
            }
        },
        "parentName": "UsrLookup_Cell_CORRECTION",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Meta_CORRECTION",
        "values": {
            "type": "crt.Label",
            "caption": "Pending mapping",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-meta"
            ]
        },
        "parentName": "UsrLookup_Cell_CORRECTION",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Row_ENVIRONMENTS",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "alignItems": "center",
            "justifyContent": "space-between",
            "gap": "small",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-row"
            ]
        },
        "parentName": "UsrLookup_Menu",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Cell_ENVIRONMENTS",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-content"
            ]
        },
        "parentName": "UsrLookup_Row_ENVIRONMENTS",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Button_ENVIRONMENTS",
        "values": {
            "type": "crt.Button",
            "caption": "Environments",
            "color": "$UsrLookup_Color_ENVIRONMENTS",
            "pressed": "$UsrLookup_Pressed_ENVIRONMENTS",
            "size": "medium",
            "iconPosition": "only-text",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-button"
            ],
            "clicked": {
                "request": "usr.Lookup_SelectMenu",
                "params": {
                    "groupCode": "ENVIRONMENTS"
                }
            }
        },
        "parentName": "UsrLookup_Cell_ENVIRONMENTS",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Meta_ENVIRONMENTS",
        "values": {
            "type": "crt.Label",
            "caption": "Pending mapping",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-meta"
            ]
        },
        "parentName": "UsrLookup_Cell_ENVIRONMENTS",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Req_ENVIRONMENTS",
        "values": {
            "type": "crt.Label",
            "caption": "Req",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-req"
            ]
        },
        "parentName": "UsrLookup_Row_ENVIRONMENTS",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Row_OPERATING_SYSTEMS",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "alignItems": "center",
            "justifyContent": "space-between",
            "gap": "small",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-row"
            ]
        },
        "parentName": "UsrLookup_Menu",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Cell_OPERATING_SYSTEMS",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-content"
            ]
        },
        "parentName": "UsrLookup_Row_OPERATING_SYSTEMS",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Button_OPERATING_SYSTEMS",
        "values": {
            "type": "crt.Button",
            "caption": "Operating Systems",
            "color": "$UsrLookup_Color_OPERATING_SYSTEMS",
            "pressed": "$UsrLookup_Pressed_OPERATING_SYSTEMS",
            "size": "medium",
            "iconPosition": "only-text",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-button"
            ],
            "clicked": {
                "request": "usr.Lookup_SelectMenu",
                "params": {
                    "groupCode": "OPERATING_SYSTEMS"
                }
            }
        },
        "parentName": "UsrLookup_Cell_OPERATING_SYSTEMS",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Meta_OPERATING_SYSTEMS",
        "values": {
            "type": "crt.Label",
            "caption": "View values",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-meta"
            ]
        },
        "parentName": "UsrLookup_Cell_OPERATING_SYSTEMS",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Req_OPERATING_SYSTEMS",
        "values": {
            "type": "crt.Label",
            "caption": "Req",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-req"
            ]
        },
        "parentName": "UsrLookup_Row_OPERATING_SYSTEMS",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Row_NETWORK",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "alignItems": "center",
            "justifyContent": "space-between",
            "gap": "small",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-row"
            ]
        },
        "parentName": "UsrLookup_Menu",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Cell_NETWORK",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-content"
            ]
        },
        "parentName": "UsrLookup_Row_NETWORK",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Button_NETWORK",
        "values": {
            "type": "crt.Button",
            "caption": "Network / Zones",
            "color": "$UsrLookup_Color_NETWORK",
            "pressed": "$UsrLookup_Pressed_NETWORK",
            "size": "medium",
            "iconPosition": "only-text",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-button"
            ],
            "clicked": {
                "request": "usr.Lookup_SelectMenu",
                "params": {
                    "groupCode": "NETWORK"
                }
            }
        },
        "parentName": "UsrLookup_Cell_NETWORK",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Meta_NETWORK",
        "values": {
            "type": "crt.Label",
            "caption": "Pending mapping",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-meta"
            ]
        },
        "parentName": "UsrLookup_Cell_NETWORK",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Req_NETWORK",
        "values": {
            "type": "crt.Label",
            "caption": "Req",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-req"
            ]
        },
        "parentName": "UsrLookup_Row_NETWORK",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Row_DOCUMENTS",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "alignItems": "center",
            "justifyContent": "space-between",
            "gap": "small",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-row"
            ]
        },
        "parentName": "UsrLookup_Menu",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Cell_DOCUMENTS",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-content"
            ]
        },
        "parentName": "UsrLookup_Row_DOCUMENTS",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Button_DOCUMENTS",
        "values": {
            "type": "crt.Button",
            "caption": "Document Types",
            "color": "$UsrLookup_Color_DOCUMENTS",
            "pressed": "$UsrLookup_Pressed_DOCUMENTS",
            "size": "medium",
            "iconPosition": "only-text",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-button"
            ],
            "clicked": {
                "request": "usr.Lookup_SelectMenu",
                "params": {
                    "groupCode": "DOCUMENTS"
                }
            }
        },
        "parentName": "UsrLookup_Cell_DOCUMENTS",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Meta_DOCUMENTS",
        "values": {
            "type": "crt.Label",
            "caption": "Pending mapping",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-meta"
            ]
        },
        "parentName": "UsrLookup_Cell_DOCUMENTS",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Row_FAILURE",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "alignItems": "center",
            "justifyContent": "space-between",
            "gap": "small",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-row"
            ]
        },
        "parentName": "UsrLookup_Menu",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Cell_FAILURE",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-content"
            ]
        },
        "parentName": "UsrLookup_Row_FAILURE",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Button_FAILURE",
        "values": {
            "type": "crt.Button",
            "caption": "Provisioning Failure Categories",
            "color": "$UsrLookup_Color_FAILURE",
            "pressed": "$UsrLookup_Pressed_FAILURE",
            "size": "medium",
            "iconPosition": "only-text",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-button"
            ],
            "clicked": {
                "request": "usr.Lookup_SelectMenu",
                "params": {
                    "groupCode": "FAILURE"
                }
            }
        },
        "parentName": "UsrLookup_Cell_FAILURE",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Meta_FAILURE",
        "values": {
            "type": "crt.Label",
            "caption": "Pending mapping",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-meta"
            ]
        },
        "parentName": "UsrLookup_Cell_FAILURE",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Row_LIFECYCLE",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "alignItems": "center",
            "justifyContent": "space-between",
            "gap": "small",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-row"
            ]
        },
        "parentName": "UsrLookup_Menu",
        "propertyName": "items",
        "index": 10
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Cell_LIFECYCLE",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-group-content"
            ]
        },
        "parentName": "UsrLookup_Row_LIFECYCLE",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Button_LIFECYCLE",
        "values": {
            "type": "crt.Button",
            "caption": "Lifecycle Action Types",
            "color": "$UsrLookup_Color_LIFECYCLE",
            "pressed": "$UsrLookup_Pressed_LIFECYCLE",
            "size": "medium",
            "iconPosition": "only-text",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-button"
            ],
            "clicked": {
                "request": "usr.Lookup_SelectMenu",
                "params": {
                    "groupCode": "LIFECYCLE"
                }
            }
        },
        "parentName": "UsrLookup_Cell_LIFECYCLE",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Meta_LIFECYCLE",
        "values": {
            "type": "crt.Label",
            "caption": "Pending mapping",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-menu-meta"
            ]
        },
        "parentName": "UsrLookup_Cell_LIFECYCLE",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "move",
        "name": "DataTable",
        "parentName": "UsrLookup_Left",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Right",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-right"
            ],
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "UsrLookup_Shell",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_RightTop",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-right-top"
            ]
        },
        "parentName": "UsrLookup_Right",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_RightTitles",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-title-stack"
            ]
        },
        "parentName": "UsrLookup_RightTop",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_GroupTitle",
        "values": {
            "type": "crt.Label",
            "caption": "$UsrLookup_SelectedTitle",
            "labelType": "headline-2",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-title"
            ]
        },
        "parentName": "UsrLookup_RightTitles",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_GroupDesc",
        "values": {
            "type": "crt.Label",
            "caption": "$UsrLookup_SelectedDescription",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-description"
            ]
        },
        "parentName": "UsrLookup_RightTitles",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_GroupInfo",
        "values": {
            "type": "crt.Label",
            "caption": "$UsrLookup_SelectedInfo",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-info"
            ]
        },
        "parentName": "UsrLookup_RightTitles",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "UsrLookup_ActionBar",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-actions"
            ]
        },
        "parentName": "UsrLookup_RightTop",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Import",
        "values": {
            "type": "crt.Button",
            "caption": "Import",
            "size": "medium",
            "color": "default",
            "iconPosition": "only-text",
            "visible": true,
            "disabled": true,
            "classes": [
                "mcit-lookup-outline"
            ],
            "clicked": {
                "request": "usr.Lookup_Import"
            }
        },
        "parentName": "UsrLookup_ActionBar",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Export",
        "values": {
            "type": "crt.Button",
            "caption": "Export",
            "size": "medium",
            "color": "default",
            "iconPosition": "only-text",
            "visible": true,
            "disabled": true,
            "classes": [
                "mcit-lookup-outline"
            ],
            "clicked": {
                "request": "usr.Lookup_Export"
            }
        },
        "parentName": "UsrLookup_ActionBar",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_AddValue",
        "values": {
            "type": "crt.Button",
            "caption": "+ Add Value",
            "size": "medium",
            "color": "default",
            "iconPosition": "only-text",
            "visible": true,
            "disabled": "$UsrLookup_AddDisabled",
            "classes": [
                "mcit-lookup-add-value"
            ],
            "clicked": {
                "request": "usr.Lookup_AddValue"
            }
        },
        "parentName": "UsrLookup_ActionBar",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Notice",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "fitContent": true,
            "classes": [
                "mcit-lookup-notice"
            ]
        },
        "parentName": "UsrLookup_Right",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_NoticeIcon",
        "values": {
            "type": "crt.Label",
            "caption": "ⓘ",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-notice-icon"
            ]
        },
        "parentName": "UsrLookup_Notice",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrLookup_NoticeText",
        "values": {
            "type": "crt.Label",
            "caption": "Values used by business records cannot be physically deleted. Use Deactivate.",
            "labelType": "body",
            "labelColor": "auto",
            "visible": true,
            "classes": [
                "mcit-lookup-notice-text"
            ]
        },
        "parentName": "UsrLookup_Notice",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrLookup_Placeholder",
        "values": {
            "type": "crt.Label",
            "caption": "$UsrLookup_EmptyMessage",
            "labelType": "body",
            "labelColor": "auto",
            "visible": "$UsrLookup_ShowUnmapped",
            "classes": [
                "mcit-lookup-empty"
            ]
        },
        "parentName": "UsrLookup_Right",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "UsrLookup_AuthorityGrid",
        "values": {
            "type": "crt.DataGrid",
            "items": "$UsrLookup_AuthorityGrid",
            "primaryColumnName": "UsrLookup_AuthorityGridDS_Id",
            "columns": [
                {
                    "id": "00000001-31e5-4560-9c30-000000000043",
                    "code": "UsrLookup_AuthorityGridDS_UsrCode",
                    "caption": "Code",
                    "dataValueType": 28,
                    "width": 135
                },
                {
                    "id": "00000002-31e5-4560-9c30-000000000043",
                    "code": "UsrLookup_AuthorityGridDS_UsrName",
                    "caption": "English Name",
                    "dataValueType": 28,
                    "width": 250
                },
                {
                    "id": "00000003-31e5-4560-9c30-000000000043",
                    "code": "UsrLookup_AuthorityGridDS_UsrDescription",
                    "caption": "Description",
                    "dataValueType": 28,
                    "width": 250
                },
                {
                    "id": "00000004-31e5-4560-9c30-000000000043",
                    "code": "UsrLookup_AuthorityGridDS_UsrDisplayOrder",
                    "caption": "Order",
                    "dataValueType": 4,
                    "width": 95
                },
                {
                    "id": "00000005-31e5-4560-9c30-000000000043",
                    "code": "UsrLookup_AuthorityGridDS_CreatedOn",
                    "caption": "Creation Date",
                    "dataValueType": 7,
                    "width": 160
                },
                {
                    "id": "00000006-31e5-4560-9c30-000000000043",
                    "code": "UsrLookup_AuthorityGridDS_UsrActive",
                    "caption": "Active",
                    "dataValueType": 12,
                    "width": 90
                }
            ],
            "placeholder": false,
            "fitContent": true,
            "visible": "$UsrLookup_ShowAuthority",
            "classes": [
                "mcit-lookup-values-grid",
                "mcit-lookup-authority-grid"
            ],
            "features": {
                "rows": {
                    "selection": {
                        "enable": true,
                        "multiple": false
                    }
                }
            },
            "rowToolbarItems": [
                {
                    "type": "crt.MenuItem",
                    "caption": "Edit value",
                    "icon": "edit-row-action",
                    "clicked": {
                        "request": "crt.UpdateRecordRequest",
                        "params": {
                            "itemsAttributeName": "UsrLookup_AuthorityGrid",
                            "recordId": "$UsrLookup_AuthorityGrid.UsrLookup_AuthorityGridDS_Id"
                        },
                        "useRelativeContext": true
                    }
                }
           ,
                {
                    "type": "crt.MenuItem",
                    "caption": "Deactivate",
                    "icon": "edit-row-action",
                    "clicked": {
                        "request": "usr.Lookup_SetActive",
                        "params": {
                            "recordId": "$UsrLookup_AuthorityGrid.UsrLookup_AuthorityGridDS_Id",
                            "groupCode": "AUTHORITIES",
                            "active": false
                        },
                        "useRelativeContext": true
                    }
                },
                {
                    "type": "crt.MenuItem",
                    "caption": "Reactivate",
                    "icon": "edit-row-action",
                    "clicked": {
                        "request": "usr.Lookup_SetActive",
                        "params": {
                            "recordId": "$UsrLookup_AuthorityGrid.UsrLookup_AuthorityGridDS_Id",
                            "groupCode": "AUTHORITIES",
                            "active": true
                        },
                        "useRelativeContext": true
                    }
                }
            ]
        },
        "parentName": "UsrLookup_Right",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "UsrLookup_ProjectGrid",
        "values": {
            "type": "crt.DataGrid",
            "items": "$UsrLookup_ProjectGrid",
            "primaryColumnName": "UsrLookup_ProjectGridDS_Id",
            "columns": [
                {
                    "id": "00000001-31e5-4560-9c30-000000000044",
                    "code": "UsrLookup_ProjectGridDS_UsrCode",
                    "caption": "Code",
                    "dataValueType": 28,
                    "width": 120
                },
                {
                    "id": "00000002-31e5-4560-9c30-000000000044",
                    "code": "UsrLookup_ProjectGridDS_UsrName",
                    "caption": "English Name",
                    "dataValueType": 28,
                    "width": 230
                },
                {
                    "id": "00000003-31e5-4560-9c30-000000000044",
                    "code": "UsrLookup_ProjectGridDS_UsrDescription",
                    "caption": "Description",
                    "dataValueType": 28,
                    "width": 200
                },
                {
                    "id": "00000004-31e5-4560-9c30-000000000044",
                    "code": "UsrLookup_ProjectGridDS_UsrAuthority",
                    "caption": "Authority",
                    "dataValueType": 10,
                    "width": 160
                },
                {
                    "id": "00000005-31e5-4560-9c30-000000000044",
                    "code": "UsrLookup_ProjectGridDS_UsrDisplayOrder",
                    "caption": "Order",
                    "dataValueType": 4,
                    "width": 90
                },
                {
                    "id": "00000006-31e5-4560-9c30-000000000044",
                    "code": "UsrLookup_ProjectGridDS_UsrActive",
                    "caption": "Active",
                    "dataValueType": 12,
                    "width": 80
                }
            ],
            "placeholder": false,
            "fitContent": true,
            "visible": "$UsrLookup_ShowProject",
            "classes": [
                "mcit-lookup-values-grid",
                "mcit-lookup-project-grid"
            ],
            "features": {
                "rows": {
                    "selection": {
                        "enable": true,
                        "multiple": false
                    }
                }
            },
            "rowToolbarItems": [
                {
                    "type": "crt.MenuItem",
                    "caption": "Edit value",
                    "icon": "edit-row-action",
                    "clicked": {
                        "request": "crt.UpdateRecordRequest",
                        "params": {
                            "itemsAttributeName": "UsrLookup_ProjectGrid",
                            "recordId": "$UsrLookup_ProjectGrid.UsrLookup_ProjectGridDS_Id"
                        },
                        "useRelativeContext": true
                    }
                }
           ,
                {
                    "type": "crt.MenuItem",
                    "caption": "Deactivate",
                    "icon": "edit-row-action",
                    "clicked": {
                        "request": "usr.Lookup_SetActive",
                        "params": {
                            "recordId": "$UsrLookup_ProjectGrid.UsrLookup_ProjectGridDS_Id",
                            "groupCode": "PROJECTS",
                            "active": false
                        },
                        "useRelativeContext": true
                    }
                },
                {
                    "type": "crt.MenuItem",
                    "caption": "Reactivate",
                    "icon": "edit-row-action",
                    "clicked": {
                        "request": "usr.Lookup_SetActive",
                        "params": {
                            "recordId": "$UsrLookup_ProjectGrid.UsrLookup_ProjectGridDS_Id",
                            "groupCode": "PROJECTS",
                            "active": true
                        },
                        "useRelativeContext": true
                    }
                }
            ]
        },
        "parentName": "UsrLookup_Right",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "UsrLookup_RequestTypeGrid",
        "values": {
            "type": "crt.DataGrid",
            "items": "$UsrLookup_RequestTypeGrid",
            "primaryColumnName": "UsrLookup_RequestTypeGridDS_Id",
            "columns": [
                {
                    "id": "00000001-31e5-4560-9c30-000000000045",
                    "code": "UsrLookup_RequestTypeGridDS_UsrCode",
                    "caption": "Code",
                    "dataValueType": 28,
                    "width": 140
                },
                {
                    "id": "00000002-31e5-4560-9c30-000000000045",
                    "code": "UsrLookup_RequestTypeGridDS_UsrName",
                    "caption": "English Name",
                    "dataValueType": 28,
                    "width": 230
                },
                {
                    "id": "00000003-31e5-4560-9c30-000000000045",
                    "code": "UsrLookup_RequestTypeGridDS_UsrArabicName",
                    "caption": "Arabic Name",
                    "dataValueType": 28,
                    "width": 170
                },
                {
                    "id": "00000004-31e5-4560-9c30-000000000045",
                    "code": "UsrLookup_RequestTypeGridDS_UsrParent",
                    "caption": "Parent",
                    "dataValueType": 28,
                    "width": 125
                },
                {
                    "id": "00000005-31e5-4560-9c30-000000000045",
                    "code": "UsrLookup_RequestTypeGridDS_UsrSortOrder",
                    "caption": "Order",
                    "dataValueType": 4,
                    "width": 90
                },
                {
                    "id": "00000006-31e5-4560-9c30-000000000045",
                    "code": "UsrLookup_RequestTypeGridDS_CreatedOn",
                    "caption": "Creation Date",
                    "dataValueType": 7,
                    "width": 150
                },
                {
                    "id": "00000007-31e5-4560-9c30-000000000045",
                    "code": "UsrLookup_RequestTypeGridDS_UsrActive",
                    "caption": "Active",
                    "dataValueType": 12,
                    "width": 80
                }
            ],
            "placeholder": false,
            "fitContent": true,
            "visible": "$UsrLookup_ShowRequestType",
            "classes": [
                "mcit-lookup-values-grid",
                "mcit-lookup-requesttype-grid"
            ],
            "features": {
                "rows": {
                    "selection": {
                        "enable": true,
                        "multiple": false
                    }
                }
            },
            "rowToolbarItems": [
                {
                    "type": "crt.MenuItem",
                    "caption": "Edit value",
                    "icon": "edit-row-action",
                    "clicked": {
                        "request": "crt.UpdateRecordRequest",
                        "params": {
                            "itemsAttributeName": "UsrLookup_RequestTypeGrid",
                            "recordId": "$UsrLookup_RequestTypeGrid.UsrLookup_RequestTypeGridDS_Id"
                        },
                        "useRelativeContext": true
                    }
                }
           ,
                {
                    "type": "crt.MenuItem",
                    "caption": "Deactivate",
                    "icon": "edit-row-action",
                    "clicked": {
                        "request": "usr.Lookup_SetActive",
                        "params": {
                            "recordId": "$UsrLookup_RequestTypeGrid.UsrLookup_RequestTypeGridDS_Id",
                            "groupCode": "REQUEST_TYPES",
                            "active": false
                        },
                        "useRelativeContext": true
                    }
                },
                {
                    "type": "crt.MenuItem",
                    "caption": "Reactivate",
                    "icon": "edit-row-action",
                    "clicked": {
                        "request": "usr.Lookup_SetActive",
                        "params": {
                            "recordId": "$UsrLookup_RequestTypeGrid.UsrLookup_RequestTypeGridDS_Id",
                            "groupCode": "REQUEST_TYPES",
                            "active": true
                        },
                        "useRelativeContext": true
                    }
                }
            ]
        },
        "parentName": "UsrLookup_Right",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "UsrLookup_OperatingSystemGrid",
        "values": {
            "type": "crt.DataGrid",
            "items": "$UsrLookup_OperatingSystemGrid",
            "primaryColumnName": "UsrLookup_OperatingSystemGridDS_Id",
            "columns": [
                {
                    "id": "00000001-31e5-4560-9c30-000000000046",
                    "code": "UsrLookup_OperatingSystemGridDS_Name",
                    "caption": "Operating System",
                    "dataValueType": 28,
                    "width": 290
                },
                {
                    "id": "00000002-31e5-4560-9c30-000000000046",
                    "code": "UsrLookup_OperatingSystemGridDS_CreatedOn",
                    "caption": "Creation Date",
                    "dataValueType": 7,
                    "width": 190
                },
                {
                    "id": "00000003-31e5-4560-9c30-000000000046",
                    "code": "UsrLookup_OperatingSystemGridDS_UsrActive",
                    "caption": "Active",
                    "dataValueType": 12,
                    "width": 95
                }
            ],
            "placeholder": false,
            "fitContent": true,
            "visible": "$UsrLookup_ShowOperatingSystem",
            "classes": [
                "mcit-lookup-values-grid",
                "mcit-lookup-operatingsystem-grid"
            ],
            "features": {
                "rows": {
                    "selection": {
                        "enable": true,
                        "multiple": false
                    }
                }
            },
            "rowToolbarItems": [
                {
                    "type": "crt.MenuItem",
                    "caption": "Edit value",
                    "icon": "edit-row-action",
                    "clicked": {
                        "request": "crt.UpdateRecordRequest",
                        "params": {
                            "itemsAttributeName": "UsrLookup_OperatingSystemGrid",
                            "recordId": "$UsrLookup_OperatingSystemGrid.UsrLookup_OperatingSystemGridDS_Id"
                        },
                        "useRelativeContext": true
                    }
                }
           ,
                {
                    "type": "crt.MenuItem",
                    "caption": "Deactivate",
                    "icon": "edit-row-action",
                    "clicked": {
                        "request": "usr.Lookup_SetActive",
                        "params": {
                            "recordId": "$UsrLookup_OperatingSystemGrid.UsrLookup_OperatingSystemGridDS_Id",
                            "groupCode": "OPERATING_SYSTEMS",
                            "active": false
                        },
                        "useRelativeContext": true
                    }
                },
                {
                    "type": "crt.MenuItem",
                    "caption": "Reactivate",
                    "icon": "edit-row-action",
                    "clicked": {
                        "request": "usr.Lookup_SetActive",
                        "params": {
                            "recordId": "$UsrLookup_OperatingSystemGrid.UsrLookup_OperatingSystemGridDS_Id",
                            "groupCode": "OPERATING_SYSTEMS",
                            "active": true
                        },
                        "useRelativeContext": true
                    }
                }
            ]
        },
        "parentName": "UsrLookup_Right",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "remove",
        "name": "MainContainer"
    },
    {
        "operation": "remove",
        "name": "ContentContainer"
    },
    {
        "operation": "remove",
        "name": "SectionContentWrapper"
    },
    {
      "operation": "insert",
      "name": "UsrLookup_RegistryActions",
      "values": {
        "type": "crt.FlexContainer",
        "direction": "row", "wrap": "wrap", "items": [], "fitContent": true,
        "classes": ["mcit-lookup-registry-actions"]
      },
      "parentName": "UsrLookup_Left", "propertyName": "items", "index": 3
    },
    {
      "operation": "insert", "name": "UsrLookup_ManageGroupsButton",
      "values": {
        "type": "crt.Button", "caption": "$UsrLookup_ManageCaption", "color": "default", "size": "medium",
        "classes": ["mcit-lookup-registry-action"],
        "clicked": {"request": "usr.Lookup_ToggleGroupRegistry"}
      },
      "parentName": "UsrLookup_RegistryActions", "propertyName": "items", "index": 0
    },
    {
      "operation": "insert", "name": "UsrLookup_RegisterGroupButton",
      "values": {
        "type": "crt.Button", "caption": "+ Register group", "color": "default", "size": "medium",
        "visible": "$UsrLookup_ShowRegistry", "classes": ["mcit-lookup-registry-action"],
        "clicked": {"request": "usr.Lookup_CreateGroup"}
      },
      "parentName": "UsrLookup_RegistryActions", "propertyName": "items", "index": 1
    },
    {
      "operation": "insert", "name": "UsrLookup_OperationMessage",
      "values": {
        "type": "crt.Label", "caption": "$UsrLookup_OperationText", "labelType": "body",
        "visible": "$UsrLookup_OperationVisible", "classes": ["mcit-lookup-operation-message"]
      },
      "parentName": "UsrLookup_Right", "propertyName": "items", "index": 2
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
    }
]/**SCHEMA_VIEW_CONFIG_DIFF*/,
    viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
    {
        "operation": "merge",
        "path": [
            "attributes"
        ],
        "values": {
            "UsrLookup_ShowRegistry": {"value": false},
            "UsrLookup_ShowStaticMenu": {"value": true},
            "UsrLookup_ManageCaption": {"value": "Manage groups"},
            "UsrLookup_OperationText": {"value": ""},
            "UsrLookup_OperationVisible": {"value": false},
            "UsrLookup_SelectedGroupCode": {"value": "REQUEST_TYPES"},
            "UsrLookup_SelectedTitle": {
                "value": "Request Types"
            },
            "UsrLookup_SelectedDescription": {
                "value": "Types of VM requests available in the system"
            },
            "UsrLookup_SelectedInfo": {
                "value": ""
            },
            "UsrLookup_EmptyMessage": {
                "value": "This group has not yet been mapped to a Creatio object. Configure its object mapping before managing values."
            },
            "UsrLookup_ActiveSchema": {
                "value": "UsrMCITRequestType"
            },
            "UsrLookup_HasSelection": {
                "value": true
            },
            "UsrLookup_ShowAuthority": {
                "value": false
            },
            "UsrLookup_AuthorityGrid": {
                "isCollection": true,
                "modelConfig": {
                    "path": "UsrLookup_AuthorityGridDS"
                },
                "viewModelConfig": {
                    "attributes": {
                        "UsrLookup_AuthorityGridDS_UsrCode": {
                            "modelConfig": {
                                "path": "UsrLookup_AuthorityGridDS.UsrCode"
                            }
                        },
                        "UsrLookup_AuthorityGridDS_UsrName": {
                            "modelConfig": {
                                "path": "UsrLookup_AuthorityGridDS.UsrName"
                            }
                        },
                        "UsrLookup_AuthorityGridDS_UsrDescription": {
                            "modelConfig": {
                                "path": "UsrLookup_AuthorityGridDS.UsrDescription"
                            }
                        },
                        "UsrLookup_AuthorityGridDS_UsrDisplayOrder": {
                            "modelConfig": {
                                "path": "UsrLookup_AuthorityGridDS.UsrDisplayOrder"
                            }
                        },
                        "UsrLookup_AuthorityGridDS_CreatedOn": {
                            "modelConfig": {
                                "path": "UsrLookup_AuthorityGridDS.CreatedOn"
                            }
                        },
                        "UsrLookup_AuthorityGridDS_UsrActive": {
                            "modelConfig": {
                                "path": "UsrLookup_AuthorityGridDS.UsrActive"
                            }
                        },
                        "UsrLookup_AuthorityGridDS_Id": {
                            "modelConfig": {
                                "path": "UsrLookup_AuthorityGridDS.Id"
                            }
                        }
                    }
                }
            },
            "UsrLookup_ShowProject": {
                "value": false
            },
            "UsrLookup_ProjectGrid": {
                "isCollection": true,
                "modelConfig": {
                    "path": "UsrLookup_ProjectGridDS"
                },
                "viewModelConfig": {
                    "attributes": {
                        "UsrLookup_ProjectGridDS_UsrCode": {
                            "modelConfig": {
                                "path": "UsrLookup_ProjectGridDS.UsrCode"
                            }
                        },
                        "UsrLookup_ProjectGridDS_UsrName": {
                            "modelConfig": {
                                "path": "UsrLookup_ProjectGridDS.UsrName"
                            }
                        },
                        "UsrLookup_ProjectGridDS_UsrDescription": {
                            "modelConfig": {
                                "path": "UsrLookup_ProjectGridDS.UsrDescription"
                            }
                        },
                        "UsrLookup_ProjectGridDS_UsrAuthority": {
                            "modelConfig": {
                                "path": "UsrLookup_ProjectGridDS.UsrAuthority"
                            }
                        },
                        "UsrLookup_ProjectGridDS_UsrDisplayOrder": {
                            "modelConfig": {
                                "path": "UsrLookup_ProjectGridDS.UsrDisplayOrder"
                            }
                        },
                        "UsrLookup_ProjectGridDS_UsrActive": {
                            "modelConfig": {
                                "path": "UsrLookup_ProjectGridDS.UsrActive"
                            }
                        },
                        "UsrLookup_ProjectGridDS_Id": {
                            "modelConfig": {
                                "path": "UsrLookup_ProjectGridDS.Id"
                            }
                        }
                    }
                }
            },
            "UsrLookup_ShowRequestType": {
                "value": true
            },
            "UsrLookup_RequestTypeGrid": {
                "isCollection": true,
                "modelConfig": {
                    "path": "UsrLookup_RequestTypeGridDS"
                },
                "viewModelConfig": {
                    "attributes": {
                        "UsrLookup_RequestTypeGridDS_UsrCode": {
                            "modelConfig": {
                                "path": "UsrLookup_RequestTypeGridDS.UsrCode"
                            }
                        },
                        "UsrLookup_RequestTypeGridDS_UsrName": {
                            "modelConfig": {
                                "path": "UsrLookup_RequestTypeGridDS.UsrName"
                            }
                        },
                        "UsrLookup_RequestTypeGridDS_UsrArabicName": {
                            "modelConfig": {
                                "path": "UsrLookup_RequestTypeGridDS.UsrArabicName"
                            }
                        },
                        "UsrLookup_RequestTypeGridDS_UsrParent": {
                            "modelConfig": {
                                "path": "UsrLookup_RequestTypeGridDS.UsrParent"
                            }
                        },
                        "UsrLookup_RequestTypeGridDS_UsrSortOrder": {
                            "modelConfig": {
                                "path": "UsrLookup_RequestTypeGridDS.UsrSortOrder"
                            }
                        },
                        "UsrLookup_RequestTypeGridDS_CreatedOn": {
                            "modelConfig": {
                                "path": "UsrLookup_RequestTypeGridDS.CreatedOn"
                            }
                        },
                        "UsrLookup_RequestTypeGridDS_UsrActive": {
                            "modelConfig": {
                                "path": "UsrLookup_RequestTypeGridDS.UsrActive"
                            }
                        },
                        "UsrLookup_RequestTypeGridDS_Id": {
                            "modelConfig": {
                                "path": "UsrLookup_RequestTypeGridDS.Id"
                            }
                        }
                    }
                }
            },
            "UsrLookup_ShowOperatingSystem": {
                "value": false
            },
            "UsrLookup_OperatingSystemGrid": {
                "isCollection": true,
                "modelConfig": {
                    "path": "UsrLookup_OperatingSystemGridDS"
                },
                "viewModelConfig": {
                    "attributes": {
                        "UsrLookup_OperatingSystemGridDS_Name": {
                            "modelConfig": {
                                "path": "UsrLookup_OperatingSystemGridDS.Name"
                            }
                        },
                        "UsrLookup_OperatingSystemGridDS_CreatedOn": {
                            "modelConfig": {
                                "path": "UsrLookup_OperatingSystemGridDS.CreatedOn"
                            }
                        },
                        "UsrLookup_OperatingSystemGridDS_UsrActive": {
                            "modelConfig": {
                                "path": "UsrLookup_OperatingSystemGridDS.UsrActive"
                            }
                        },
                        "UsrLookup_OperatingSystemGridDS_Id": {
                            "modelConfig": {
                                "path": "UsrLookup_OperatingSystemGridDS.Id"
                            }
                        }
                    }
                }
            },
            "UsrLookup_ShowUnmapped": {
                "value": false
            },
            "UsrLookup_AddDisabled": {
                "value": false
            },
            "UsrLookup_Color_AUTHORITIES": {
                "value": "default"
            },
            "UsrLookup_Pressed_AUTHORITIES": {
                "value": false
            },
            "UsrLookup_Color_PROJECTS": {
                "value": "default"
            },
            "UsrLookup_Pressed_PROJECTS": {
                "value": false
            },
            "UsrLookup_Color_REQUEST_TYPES": {
                "value": "primary"
            },
            "UsrLookup_Pressed_REQUEST_TYPES": {
                "value": true
            },
            "UsrLookup_Color_REJECTION": {
                "value": "default"
            },
            "UsrLookup_Pressed_REJECTION": {
                "value": false
            },
            "UsrLookup_Color_CORRECTION": {
                "value": "default"
            },
            "UsrLookup_Pressed_CORRECTION": {
                "value": false
            },
            "UsrLookup_Color_ENVIRONMENTS": {
                "value": "default"
            },
            "UsrLookup_Pressed_ENVIRONMENTS": {
                "value": false
            },
            "UsrLookup_Color_OPERATING_SYSTEMS": {
                "value": "default"
            },
            "UsrLookup_Pressed_OPERATING_SYSTEMS": {
                "value": false
            },
            "UsrLookup_Color_NETWORK": {
                "value": "default"
            },
            "UsrLookup_Pressed_NETWORK": {
                "value": false
            },
            "UsrLookup_Color_DOCUMENTS": {
                "value": "default"
            },
            "UsrLookup_Pressed_DOCUMENTS": {
                "value": false
            },
            "UsrLookup_Color_FAILURE": {
                "value": "default"
            },
            "UsrLookup_Pressed_FAILURE": {
                "value": false
            },
            "UsrLookup_Color_LIFECYCLE": {
                "value": "default"
            },
            "UsrLookup_Pressed_LIFECYCLE": {
                "value": false
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
            "PDS_UsrName": {
                "modelConfig": {
                    "path": "PDS.UsrName"
                }
            },
            "PDS_UsrRequired": {
                "modelConfig": {
                    "path": "PDS.UsrRequired"
                }
            },
            "PDS_Id": {
                "modelConfig": {
                    "path": "PDS.Id"
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
    }
]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
    modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
    {
        "operation": "merge",
        "path": [
            "dataSources",
            "PDS",
            "config"
        ],
        "values": {
            "entitySchemaName": "UsrMCITLookupGroup",
            "attributes": {
                "UsrName": {
                    "path": "UsrName"
                },
                "UsrRequired": {
                    "path": "UsrRequired"
                }
            }
        }
    },
    {
        "operation": "merge",
        "path": [
            "dataSources"
        ],
        "values": {
            "UsrLookup_AuthorityGridDS": {
                "type": "crt.EntityDataSource",
                "scope": "viewElement",
                "config": {
                    "entitySchemaName": "UsrAuthority",
                    "attributes": {
                        "UsrCode": {
                            "path": "UsrCode"
                        },
                        "UsrName": {
                            "path": "UsrName"
                        },
                        "UsrDescription": {
                            "path": "UsrDescription"
                        },
                        "UsrDisplayOrder": {
                            "path": "UsrDisplayOrder"
                        },
                        "CreatedOn": {
                            "path": "CreatedOn"
                        },
                        "UsrActive": {
                            "path": "UsrActive"
                        }
                    }
                }
            },
            "UsrLookup_ProjectGridDS": {
                "type": "crt.EntityDataSource",
                "scope": "viewElement",
                "config": {
                    "entitySchemaName": "UsrProject",
                    "attributes": {
                        "UsrCode": {
                            "path": "UsrCode"
                        },
                        "UsrName": {
                            "path": "UsrName"
                        },
                        "UsrDescription": {
                            "path": "UsrDescription"
                        },
                        "UsrAuthority": {
                            "path": "UsrAuthority"
                        },
                        "UsrDisplayOrder": {
                            "path": "UsrDisplayOrder"
                        },
                        "UsrActive": {
                            "path": "UsrActive"
                        }
                    }
                }
            },
            "UsrLookup_RequestTypeGridDS": {
                "type": "crt.EntityDataSource",
                "scope": "viewElement",
                "config": {
                    "entitySchemaName": "UsrMCITRequestType",
                    "attributes": {
                        "UsrCode": {
                            "path": "UsrCode"
                        },
                        "UsrName": {
                            "path": "UsrName"
                        },
                        "UsrArabicName": {
                            "path": "UsrArabicName"
                        },
                        "UsrParent": {
                            "path": "UsrParent"
                        },
                        "UsrSortOrder": {
                            "path": "UsrSortOrder"
                        },
                        "CreatedOn": {
                            "path": "CreatedOn"
                        },
                        "UsrActive": {
                            "path": "UsrActive"
                        }
                    }
                }
            },
            "UsrLookup_OperatingSystemGridDS": {
                "type": "crt.EntityDataSource",
                "scope": "viewElement",
                "config": {
                    "entitySchemaName": "UsrMCITOperatingSystem",
                    "attributes": {
                        "Name": {
                            "path": "Name"
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
        }
    }
]/**SCHEMA_MODEL_CONFIG_DIFF*/,
    handlers: /**SCHEMA_HANDLERS*/[
      {
        request: "usr.Lookup_SelectMenu",
        handler: async (request) => {
          const ctx = request.$context;
          const key = request.groupCode ?? request.params?.groupCode;
          // Explicit allowlist. Do not treat registry UsrSchemaName as an arbitrary writable entity.
          const map = {
            AUTHORITIES: ["Government Authorities","Authorised government entities that can place VM requests","UsrAuthority","UsrLookup_AuthorityGridDS","UsrLookup_ShowAuthority"],
            PROJECTS: ["Projects","Projects associated with VM requests","UsrProject","UsrLookup_ProjectGridDS","UsrLookup_ShowProject"],
            REQUEST_TYPES: ["Request Types","Types of VM requests available in the system","UsrMCITRequestType","UsrLookup_RequestTypeGridDS","UsrLookup_ShowRequestType"],
            REJECTION: ["Rejection Categories","Mandatory categories when rejecting a request",null,null,null],
            CORRECTION: ["Correction Categories","Correction reasons and request feedback",null,null,null],
            ENVIRONMENTS: ["Environments","VM environment types",null,null,null],
            OPERATING_SYSTEMS: ["Operating Systems","Operating systems available for virtual machines","UsrMCITOperatingSystem","UsrLookup_OperatingSystemGridDS","UsrLookup_ShowOperatingSystem"],
            NETWORK: ["Network / Zones","Network and security-zone reference values",null,null,null],
            DOCUMENTS: ["Document Types","Document classifications for requests",null,null,null],
            FAILURE: ["Provisioning Failure Categories","Provisioning failure classifications",null,null,null],
            LIFECYCLE: ["Lifecycle Action Types","Virtual machine lifecycle actions",null,null,null]
          };
          if (!Object.prototype.hasOwnProperty.call(map, key)) return;
          const [title, description, schema, datasource, visibleAttr] = map[key];
          ctx.UsrLookup_SelectedGroupCode = key;
          ctx.UsrLookup_SelectedTitle = title;
          ctx.UsrLookup_SelectedDescription = description;
          ctx.UsrLookup_SelectedInfo = "";
          ctx.UsrLookup_OperationVisible = false;
          ctx.UsrLookup_ActiveSchema = schema || "";
          ctx.UsrLookup_HasSelection = true;
          ctx.UsrLookup_AddDisabled = !schema;
          ctx.UsrLookup_ShowUnmapped = !schema;
          ctx.UsrLookup_EmptyMessage = "No verified Creatio object mapping is available for this group. Register its real lookup object before editing values.";
          for (const flag of ["UsrLookup_ShowAuthority","UsrLookup_ShowProject","UsrLookup_ShowRequestType","UsrLookup_ShowOperatingSystem"]) {
            ctx[flag] = flag === visibleAttr;
          }
          for (const code of Object.keys(map)) {
            ctx["UsrLookup_Pressed_" + code] = code === key;
            ctx["UsrLookup_Color_" + code] = code === key ? "primary" : "default";
          }
          if (datasource) {
            try {
              await sdk.HandlerChainService.instance.process({
                type: "crt.LoadDataRequest", dataSourceName: datasource,
                config: {loadType: "reload"}, $context: ctx,
                scopes: request.scopes || []
              });
            } catch (error) {
              console.error("[MCIT Lookup] Data reload failed", error);
              ctx.UsrLookup_OperationText = "Could not refresh the selected list. Check Console and object permissions.";
              ctx.UsrLookup_OperationVisible = true;
            }
          }
        }
      },
      {
        request: "usr.Lookup_ToggleGroupRegistry",
        handler: async (request) => {
          const ctx = request.$context;
          const nextVisible = !(await ctx.UsrLookup_ShowRegistry);
          ctx.UsrLookup_ShowRegistry = nextVisible;
          ctx.UsrLookup_ShowStaticMenu = !nextVisible;
          ctx.UsrLookup_ManageCaption = nextVisible ? "Back to groups" : "Manage groups";
          ctx.UsrLookup_OperationVisible = false;
          if (nextVisible) {
            try {
              await sdk.HandlerChainService.instance.process({
                type: "crt.LoadDataRequest", dataSourceName: "PDS",
                config: {loadType: "reload"}, $context: ctx, scopes: request.scopes || []
              });
            } catch (error) { console.error("[MCIT Lookup] Registry reload", error); }
          }
        }
      },
      {
        request: "usr.Lookup_CreateGroup",
        handler: async (request) => {
          // Creates a registry RECORD only; a brand-new lookup schema requires Configuration tools.
          await sdk.HandlerChainService.instance.process({
            type: "crt.CreateRecordRequest", entityName: "UsrMCITLookupGroup",
            $context: request.$context, scopes: request.scopes || []
          });
        }
      },
      {
        request: "usr.Lookup_SelectGroup",
        handler: async (request) => {
          const ctx = request.$context;
          try {
            const raw = await (request.recordId ?? request.params?.recordId);
            const id = typeof raw === "string" ? raw : raw?.value || raw?.Id || raw?.id;
            if (!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id || "")) {
              throw new Error("Select a valid lookup-group record.");
            }
            const model = await sdk.Model.create("UsrMCITLookupGroup");
            const rows = await model.load({
              attributes: ["UsrSchemaName"],
              parameters: [{type: sdk.ModelParameterType.PrimaryColumnValue, value: id}]
            });
            const bySchema = {
              UsrAuthority: "AUTHORITIES", UsrProject: "PROJECTS",
              UsrMCITRequestType: "REQUEST_TYPES", UsrMCITOperatingSystem: "OPERATING_SYSTEMS"
            };
            const key = bySchema[rows?.[0]?.UsrSchemaName];
            if (!key) throw new Error("This registry entry has no verified lookup-object mapping yet.");
            ctx.UsrLookup_ShowRegistry = false;
            ctx.UsrLookup_ShowStaticMenu = true;
            ctx.UsrLookup_ManageCaption = "Manage groups";
            await sdk.HandlerChainService.instance.process({
              type: "usr.Lookup_SelectMenu", groupCode: key,
              $context: ctx, scopes: request.scopes || []
            });
          } catch (error) {
            console.error("[MCIT Lookup] Registry group selection", error);
            ctx.UsrLookup_OperationText = error?.message || "Cannot select lookup group.";
            ctx.UsrLookup_OperationVisible = true;
          }
        }
      },
      {
        request: "usr.Lookup_AddValue",
        handler: async (request) => {
          const ctx = request.$context;
          const schema = await ctx.UsrLookup_ActiveSchema;
          const allowed = ["UsrAuthority","UsrProject","UsrMCITRequestType","UsrMCITOperatingSystem"];
          if (!allowed.includes(schema)) {
            ctx.UsrLookup_OperationText = "This lookup is not mapped to a supported object.";
            ctx.UsrLookup_OperationVisible = true;
            return;
          }
          // Built-in record page retains native fields and Designer-configured rules.
          await sdk.HandlerChainService.instance.process({
            type: "crt.CreateRecordRequest", entityName: schema,
            $context: ctx, scopes: request.scopes || []
          });
        }
      },
      {
        request: "usr.Lookup_SetActive",
        handler: async (request) => {
          const ctx = request.$context;
          const raw = await (request.recordId ?? request.params?.recordId);
          const id = typeof raw === "string" ? raw : raw?.value || raw?.Id || raw?.id;
          const groupCode = request.groupCode ?? request.params?.groupCode;
          const active = request.active ?? request.params?.active;
          const allowed = {
            AUTHORITIES: ["UsrAuthority","UsrLookup_AuthorityGridDS"],
            PROJECTS: ["UsrProject","UsrLookup_ProjectGridDS"],
            REQUEST_TYPES: ["UsrMCITRequestType","UsrLookup_RequestTypeGridDS"],
            OPERATING_SYSTEMS: ["UsrMCITOperatingSystem","UsrLookup_OperatingSystemGridDS"]
          };
          if (!Object.prototype.hasOwnProperty.call(allowed, groupCode) ||
              !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id || "") ||
              typeof active !== "boolean") {
            ctx.UsrLookup_OperationText = "Unable to identify the selected lookup value or action.";
            ctx.UsrLookup_OperationVisible = true;
            return;
          }
          const [entity, datasource] = allowed[groupCode];
          try {
            // START OPTION: change to true ONLY after deploying UsrLookupSetActiveValue
            // with GroupCode, ValueId, IsActive process parameters and object-permission checks.
            const USE_CONFIGURED_BPMN = false;
            if (USE_CONFIGURED_BPMN) {
              const service = new sdk.ProcessEngineService();
              const result = await service.executeProcessByName(
                "UsrLookupSetActiveValue", {GroupCode: groupCode, ValueId: id, IsActive: active},
                ["Success", "Message"]
              );
              if (result?.resultParameterValues?.Success !== true) {
                throw new Error(result?.resultParameterValues?.Message || "Business process did not confirm the change.");
              }
            } else {
              // Direct reversible status update. Creatio object/record permissions are enforced by the backend.
              // No physical deletion; historical references stay intact.
              const model = await sdk.Model.create(entity);
              const result = await model.update({UsrActive: active}, [
                {type: sdk.ModelParameterType.PrimaryColumnValue, value: id}
              ]);
              if (!result?.success || result.rowsAffected === 0) {
                throw new Error("The change was not saved. Check your permissions and record status.");
              }
            }
            ctx.UsrLookup_OperationText = active ? "Lookup value activated." : "Lookup value deactivated (existing references are preserved).";
            ctx.UsrLookup_OperationVisible = true;
            await sdk.HandlerChainService.instance.process({
              type: "crt.LoadDataRequest", dataSourceName: datasource,
              config: {loadType: "reload"}, $context: ctx,
              scopes: request.scopes || []
            });
          } catch (error) {
            console.error("[MCIT Lookup] Change status", error);
            ctx.UsrLookup_OperationText = error?.message || "Failed to change the lookup status.";
            ctx.UsrLookup_OperationVisible = true;
          }
        }
      }
    ]/**SCHEMA_HANDLERS*/,
    converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
    validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
  };
});
