/* RC11: Designer-first Resource Catalog.
   Native Creatio crt.DataGrid with adjustable columns, editable native field
   controls, one state-bound button per filter, header first, editor below list.
   Business actions are carried over from the working RC10 implementation. */
define("UsrMCITResourceCatalog_ListPage", /**SCHEMA_DEPS*/["@creatio-devkit/common", "css!UsrMCITResourceCatalogV2CSS"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
    return {
viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
    {
        "operation": "remove",
        "name": "DataTable"
    },
    {
        "operation": "remove",
        "name": "MainHeader"
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
        "name": "SectionContentWrapper"
    },
    {
        "operation": "merge",
        "name": "Main",
        "values": {
            "classes": [
                "rc3-host"
            ]
        }
    },
    {
        "operation": "insert",
        "name": "RC3_Page",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc11-page"
            ],
            "fitContent": true,
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "Main",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_Header",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc11-header"
            ],
            "justifyContent": "space-between",
            "alignItems": "center"
        },
        "parentName": "RC3_Page",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_Headings",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc11-headings"
            ]
        },
        "parentName": "RC3_Header",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_TitleBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "classes": [
                "rc3-title"
            ]
        },
        "parentName": "RC3_Headings",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_Title",
        "values": {
            "type": "crt.Label",
            "caption": "Resource Catalog",
            "labelType": "body"
        },
        "parentName": "RC3_TitleBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_SubtitleBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "classes": [
                "rc3-subtitle"
            ]
        },
        "parentName": "RC3_Headings",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_Subtitle",
        "values": {
            "type": "crt.Label",
            "caption": "Configurable VM resource specifications for request forms and point rule calculation",
            "labelType": "body"
        },
        "parentName": "RC3_SubtitleBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_Add",
        "values": {
            "type": "crt.Button",
            "caption": "+ Add Resource",
            "color": "default",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc11-primary"
            ],
            "clicked": {
                "request": "usr.RC3_OpenAdd"
            },
            "disabled": "$RC3_Busy"
        },
        "parentName": "RC3_Header",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_Stats",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc11-stats"
            ],
            "alignItems": "center"
        },
        "parentName": "RC3_Page",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_ActiveNumberBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "classes": [
                "rc3-stat-number"
            ]
        },
        "parentName": "RC3_Stats",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_ActiveNumber",
        "values": {
            "type": "crt.Label",
            "caption": "$RC3_ActiveCount",
            "labelType": "body"
        },
        "parentName": "RC3_ActiveNumberBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_ActiveTextBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "classes": [
                "rc3-stat-text"
            ]
        },
        "parentName": "RC3_Stats",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_ActiveText",
        "values": {
            "type": "crt.Label",
            "caption": "active resource types",
            "labelType": "body"
        },
        "parentName": "RC3_ActiveTextBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_DotBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "classes": [
                "rc3-stat-dot"
            ]
        },
        "parentName": "RC3_Stats",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "RC3_Dot",
        "values": {
            "type": "crt.Label",
            "caption": "·",
            "labelType": "body"
        },
        "parentName": "RC3_DotBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_UsedNumberBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "classes": [
                "rc3-stat-number"
            ]
        },
        "parentName": "RC3_Stats",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "RC3_UsedNumber",
        "values": {
            "type": "crt.Label",
            "caption": "$RC3_UsedCount",
            "labelType": "body"
        },
        "parentName": "RC3_UsedNumberBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_UsedTextBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "classes": [
                "rc3-stat-text"
            ]
        },
        "parentName": "RC3_Stats",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "RC3_UsedText",
        "values": {
            "type": "crt.Label",
            "caption": "used in point rules",
            "labelType": "body"
        },
        "parentName": "RC3_UsedTextBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_Filters",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc11-filters"
            ],
            "alignItems": "center"
        },
        "parentName": "RC3_Page",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "RC15_SearchShell",
        "parentName": "RC3_Filters",
        "propertyName": "items",
        "index": 0,
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "alignItems": "center",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "classes": ["rc15-search-shell"]
        }
    },
    {
        "operation": "insert",
        "name": "RC15_SearchIcon",
        "parentName": "RC15_SearchShell",
        "propertyName": "items",
        "index": 0,
        "values": {
            "type": "crt.Label",
            "caption": "⌕",
            "labelType": "body",
            "classes": ["rc15-search-icon"]
        }
    },
    {
        "operation": "insert",
        "name": "RC3_Search",
        "parentName": "RC15_SearchShell",
        "propertyName": "items",
        "index": 1,
        "values": {
            "type": "crt.Input",
            "control": "$RC3_SearchText",
            "label": "Search resources",
            "labelPosition": "hidden",
            "ariaLabel": "Search resource name or code",
            "placeholder": "Search resources...",
            "appearance": "legacy",
            "classes": [
                "rc11-search", "rc15-search-control"
            ]
        }
    },
    {
        "operation": "insert",
        "name": "RC3_Categories",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "none",
            "wrap": "wrap",
            "classes": [
                "rc11-filter-group"
            ],
            "alignItems": "center"
        },
        "parentName": "RC3_Filters",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_FilterAllSelected",
        "values": {
            "type": "crt.Button",
            "caption": "All",
            "color": "$RC3_CategoryFilter | usr.RC11_FilterColor:'All'",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc11-filter-button"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "category",
                    "value": "All"
                }
            },
            "pressed": "$RC3_CategoryFilter | usr.RC3_Equals:'All'"
        },
        "parentName": "RC3_Categories",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_FilterCPUSelected",
        "values": {
            "type": "crt.Button",
            "caption": "CPU",
            "color": "$RC3_CategoryFilter | usr.RC11_FilterColor:'CPU'",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc11-filter-button"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "category",
                    "value": "CPU"
                }
            },
            "pressed": "$RC3_CategoryFilter | usr.RC3_Equals:'CPU'"
        },
        "parentName": "RC3_Categories",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_FilterRAMSelected",
        "values": {
            "type": "crt.Button",
            "caption": "RAM",
            "color": "$RC3_CategoryFilter | usr.RC11_FilterColor:'RAM'",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc11-filter-button"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "category",
                    "value": "RAM"
                }
            },
            "pressed": "$RC3_CategoryFilter | usr.RC3_Equals:'RAM'"
        },
        "parentName": "RC3_Categories",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "RC3_FilterStorageSelected",
        "values": {
            "type": "crt.Button",
            "caption": "Storage",
            "color": "$RC3_CategoryFilter | usr.RC11_FilterColor:'Storage'",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc11-filter-button"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "category",
                    "value": "Storage"
                }
            },
            "pressed": "$RC3_CategoryFilter | usr.RC3_Equals:'Storage'"
        },
        "parentName": "RC3_Categories",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "RC3_FilterOSSelected",
        "values": {
            "type": "crt.Button",
            "caption": "OS",
            "color": "$RC3_CategoryFilter | usr.RC11_FilterColor:'OS'",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc11-filter-button"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "category",
                    "value": "OS"
                }
            },
            "pressed": "$RC3_CategoryFilter | usr.RC3_Equals:'OS'"
        },
        "parentName": "RC3_Categories",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "RC3_FilterEnvironmentSelected",
        "values": {
            "type": "crt.Button",
            "caption": "Environment",
            "color": "$RC3_CategoryFilter | usr.RC11_FilterColor:'Environment'",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc11-filter-button"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "category",
                    "value": "Environment"
                }
            },
            "pressed": "$RC3_CategoryFilter | usr.RC3_Equals:'Environment'"
        },
        "parentName": "RC3_Categories",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "RC3_FilterNetworkSelected",
        "values": {
            "type": "crt.Button",
            "caption": "Network",
            "color": "$RC3_CategoryFilter | usr.RC11_FilterColor:'Network'",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc11-filter-button"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "category",
                    "value": "Network"
                }
            },
            "pressed": "$RC3_CategoryFilter | usr.RC3_Equals:'Network'"
        },
        "parentName": "RC3_Categories",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "RC3_FilterOtherSelected",
        "values": {
            "type": "crt.Button",
            "caption": "Other",
            "color": "$RC3_CategoryFilter | usr.RC11_FilterColor:'Other'",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc11-filter-button"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "category",
                    "value": "Other"
                }
            },
            "pressed": "$RC3_CategoryFilter | usr.RC3_Equals:'Other'"
        },
        "parentName": "RC3_Categories",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "RC3_StatusFilters",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "none",
            "wrap": "wrap",
            "classes": [
                "rc11-filter-group"
            ],
            "alignItems": "center"
        },
        "parentName": "RC3_Filters",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "RC3_FilterStatusAllSelected",
        "values": {
            "type": "crt.Button",
            "caption": "All",
            "color": "$RC3_StatusFilter | usr.RC11_FilterColor:'All'",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc11-filter-button"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "status",
                    "value": "All"
                }
            },
            "pressed": "$RC3_StatusFilter | usr.RC3_Equals:'All'"
        },
        "parentName": "RC3_StatusFilters",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_FilterStatusActiveSelected",
        "values": {
            "type": "crt.Button",
            "caption": "Active",
            "color": "$RC3_StatusFilter | usr.RC11_FilterColor:'Active'",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc11-filter-button"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "status",
                    "value": "Active"
                }
            },
            "pressed": "$RC3_StatusFilter | usr.RC3_Equals:'Active'"
        },
        "parentName": "RC3_StatusFilters",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_FilterStatusInactiveSelected",
        "values": {
            "type": "crt.Button",
            "caption": "Inactive",
            "color": "$RC3_StatusFilter | usr.RC11_FilterColor:'Inactive'",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc11-filter-button"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "status",
                    "value": "Inactive"
                }
            },
            "pressed": "$RC3_StatusFilter | usr.RC3_Equals:'Inactive'"
        },
        "parentName": "RC3_StatusFilters",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "RC3_ErrorMessageBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "classes": [
                "rc3-error"
            ],
            "visible": "$RC3_Error | crt.ToBoolean"
        },
        "parentName": "RC3_Page",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "RC3_ErrorMessage",
        "values": {
            "type": "crt.Label",
            "caption": "$RC3_Error",
            "labelType": "body"
        },
        "parentName": "RC3_ErrorMessageBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_WarningMessageBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "classes": [
                "rc3-warning"
            ],
            "visible": "$RC3_Warning | crt.ToBoolean"
        },
        "parentName": "RC3_Page",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "RC3_WarningMessage",
        "values": {
            "type": "crt.Label",
            "caption": "$RC3_Warning",
            "labelType": "body"
        },
        "parentName": "RC3_WarningMessageBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_Editor",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc11-editor"
            ],
            "visible": "$RC3_EditorVisible",
            "fitContent": true
        },
        "parentName": "RC3_Page",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "RC3_EditorHeader",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc11-editor-header"
            ],
            "justifyContent": "space-between",
            "alignItems": "center"
        },
        "parentName": "RC3_Editor",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_EditorTitleBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "classes": [
                "rc11-editor-title"
            ]
        },
        "parentName": "RC3_EditorHeader",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_EditorTitle",
        "values": {
            "type": "crt.Label",
            "caption": "$RC3_EditorTitle",
            "labelType": "body"
        },
        "parentName": "RC3_EditorTitleBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_Close",
        "values": {
            "type": "crt.Button",
            "caption": "×",
            "color": "default",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc11-close"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "close"
                }
            },
            "ariaLabel": "Close resource editor",
            "disabled": "$RC3_Busy"
        },
        "parentName": "RC3_EditorHeader",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_EditorInfoBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "classes": [
                "rc11-info"
            ]
        },
        "parentName": "RC3_Editor",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_EditorInfo",
        "values": {
            "type": "crt.Label",
            "caption": "ⓘ  Configure resource details here. Save to update the catalog and applicable contracts.",
            "labelType": "body"
        },
        "parentName": "RC3_EditorInfoBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_FormGrid",
        "values": {
            "type": "crt.GridContainer",
            "columns": [
                "minmax(32px, 1fr)",
                "minmax(32px, 1fr)"
            ],
            "rows": "minmax(max-content, 32px)",
            "gap": {
                "columnGap": "medium",
                "rowGap": "medium"
            },
            "items": [],
            "classes": [
                "rc11-fields"
            ]
        },
        "parentName": "RC3_Editor",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "RC16_NameGroup",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc16-field-group"
            ],
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "RC3_FormGrid",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_NameLabel",
        "values": {
            "type": "crt.Label",
            "caption": "English Name *",
            "labelType": "body",
            "classes": [
                "rc16-field-label"
            ]
        },
        "parentName": "RC16_NameGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_NameShell",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "alignItems": "center",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "classes": [
                "rc16-field-shell"
            ]
        },
        "parentName": "RC16_NameGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_FieldName",
        "values": {
            "type": "crt.Input",
            "label": "English Name *",
            "labelPosition": "hidden",
            "control": "$RC3_Name",
            "appearance": "legacy",
            "readonly": "$RC3_Busy",
            "classes": [
                "rc16-field-control",
                "rc16-field-input"
            ],
            "ariaLabel": "English Name"
        },
        "parentName": "RC16_NameShell",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_ArabicNameGroup",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc16-field-group"
            ],
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "RC3_FormGrid",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC16_ArabicNameLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Arabic Name",
            "labelType": "body",
            "classes": [
                "rc16-field-label"
            ]
        },
        "parentName": "RC16_ArabicNameGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_ArabicNameShell",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "alignItems": "center",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "classes": [
                "rc16-field-shell"
            ]
        },
        "parentName": "RC16_ArabicNameGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_FieldArabicName",
        "values": {
            "type": "crt.Input",
            "label": "Arabic Name",
            "labelPosition": "hidden",
            "control": "$RC3_ArabicName",
            "appearance": "legacy",
            "readonly": "$RC3_Busy",
            "classes": [
                "rc16-field-control",
                "rc16-field-input"
            ],
            "ariaLabel": "Arabic Name"
        },
        "parentName": "RC16_ArabicNameShell",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_CodeGroup",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc16-field-group"
            ],
            "layoutConfig": {
                "column": 1,
                "row": 2,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "RC3_FormGrid",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "RC16_CodeLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Resource Code *",
            "labelType": "body",
            "classes": [
                "rc16-field-label"
            ]
        },
        "parentName": "RC16_CodeGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_CodeShell",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "alignItems": "center",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "classes": [
                "rc16-field-shell"
            ]
        },
        "parentName": "RC16_CodeGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_FieldCode",
        "values": {
            "type": "crt.Input",
            "label": "Resource Code *",
            "labelPosition": "hidden",
            "control": "$RC3_Code",
            "appearance": "legacy",
            "readonly": "$RC3_Busy",
            "classes": [
                "rc16-field-control",
                "rc16-field-input"
            ],
            "placeholder": "e.g. CPU-VCPU",
            "ariaLabel": "Resource Code"
        },
        "parentName": "RC16_CodeShell",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_CategoryGroup",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc16-field-group"
            ],
            "layoutConfig": {
                "column": 2,
                "row": 2,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "RC3_FormGrid",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "RC16_CategoryLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Category",
            "labelType": "body",
            "classes": [
                "rc16-field-label"
            ]
        },
        "parentName": "RC16_CategoryGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_CategoryShell",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "alignItems": "center",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "classes": [
                "rc16-field-shell"
            ]
        },
        "parentName": "RC16_CategoryGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_FieldCategory",
        "values": {
            "type": "crt.ComboBox",
            "label": "Category",
            "labelPosition": "hidden",
            "control": "$RC3_Category",
            "appearance": "outline",
            "readonly": "$RC3_Busy",
            "classes": [
                "rc16-field-control",
                "rc16-field-select"
            ],
            "items": "$RC3_CategoryOptions",
            "showValueAsLink": false,
            "listActions": [],
            "controlActions": [],
            "ariaLabel": "Category"
        },
        "parentName": "RC16_CategoryShell",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_UnitGroup",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc16-field-group"
            ],
            "layoutConfig": {
                "column": 1,
                "row": 3,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "RC3_FormGrid",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "RC16_UnitLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Unit",
            "labelType": "body",
            "classes": [
                "rc16-field-label"
            ]
        },
        "parentName": "RC16_UnitGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_UnitShell",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "alignItems": "center",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "classes": [
                "rc16-field-shell"
            ]
        },
        "parentName": "RC16_UnitGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_FieldUnit",
        "values": {
            "type": "crt.Input",
            "label": "Unit",
            "labelPosition": "hidden",
            "control": "$RC3_Unit",
            "appearance": "legacy",
            "readonly": "$RC3_Busy",
            "classes": [
                "rc16-field-control",
                "rc16-field-input"
            ],
            "placeholder": "e.g. vCPU, GB, selection",
            "ariaLabel": "Unit"
        },
        "parentName": "RC16_UnitShell",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_MinGroup",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc16-field-group"
            ],
            "layoutConfig": {
                "column": 1,
                "row": 4,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "RC3_FormGrid",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "RC16_MinLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Min Value",
            "labelType": "body",
            "classes": [
                "rc16-field-label"
            ]
        },
        "parentName": "RC16_MinGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_MinShell",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "alignItems": "center",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "classes": [
                "rc16-field-shell"
            ]
        },
        "parentName": "RC16_MinGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_FieldMin",
        "values": {
            "type": "crt.Input",
            "label": "Min Value",
            "labelPosition": "hidden",
            "control": "$RC3_Min",
            "appearance": "legacy",
            "readonly": "$RC3_Busy",
            "classes": [
                "rc16-field-control",
                "rc16-field-input"
            ],
            "ariaLabel": "Min Value"
        },
        "parentName": "RC16_MinShell",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_MaxGroup",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc16-field-group"
            ],
            "layoutConfig": {
                "column": 2,
                "row": 4,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "RC3_FormGrid",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "RC16_MaxLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Max Value",
            "labelType": "body",
            "classes": [
                "rc16-field-label"
            ]
        },
        "parentName": "RC16_MaxGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_MaxShell",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "alignItems": "center",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "classes": [
                "rc16-field-shell"
            ]
        },
        "parentName": "RC16_MaxGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_FieldMax",
        "values": {
            "type": "crt.Input",
            "label": "Max Value",
            "labelPosition": "hidden",
            "control": "$RC3_Max",
            "appearance": "legacy",
            "readonly": "$RC3_Busy",
            "classes": [
                "rc16-field-control",
                "rc16-field-input"
            ],
            "ariaLabel": "Max Value"
        },
        "parentName": "RC16_MaxShell",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_IncrementGroup",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc16-field-group"
            ],
            "layoutConfig": {
                "column": 1,
                "row": 5,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "RC3_FormGrid",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "RC16_IncrementLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Increment",
            "labelType": "body",
            "classes": [
                "rc16-field-label"
            ]
        },
        "parentName": "RC16_IncrementGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_IncrementShell",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "alignItems": "center",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "classes": [
                "rc16-field-shell"
            ]
        },
        "parentName": "RC16_IncrementGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_FieldIncrement",
        "values": {
            "type": "crt.Input",
            "label": "Increment",
            "labelPosition": "hidden",
            "control": "$RC3_Increment",
            "appearance": "legacy",
            "readonly": "$RC3_Busy",
            "classes": [
                "rc16-field-control",
                "rc16-field-input"
            ],
            "ariaLabel": "Increment"
        },
        "parentName": "RC16_IncrementShell",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_StartGroup",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc16-field-group"
            ],
            "layoutConfig": {
                "column": 1,
                "row": 6,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "RC3_FormGrid",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "RC16_StartLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Creation Date",
            "labelType": "body",
            "classes": [
                "rc16-field-label"
            ]
        },
        "parentName": "RC16_StartGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_StartShell",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "alignItems": "center",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "classes": [
                "rc16-field-shell"
            ]
        },
        "parentName": "RC16_StartGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_FieldStart",
        "values": {
            "type": "crt.DateTimePicker",
            "label": "Creation Date",
            "labelPosition": "hidden",
            "control": "$RC3_Start",
            "appearance": "outline",
            "readonly": "$RC3_Busy",
            "classes": [
                "rc16-field-control",
                "rc16-field-date"
            ],
            "pickerType": "date",
            "ariaLabel": "Creation Date"
        },
        "parentName": "RC16_StartShell",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_EndGroup",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc16-field-group"
            ],
            "layoutConfig": {
                "column": 2,
                "row": 6,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "RC3_FormGrid",
        "propertyName": "items",
        "index": 9
    },
    {
        "operation": "insert",
        "name": "RC16_EndLabel",
        "values": {
            "type": "crt.Label",
            "caption": "End Date",
            "labelType": "body",
            "classes": [
                "rc16-field-label"
            ]
        },
        "parentName": "RC16_EndGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC16_EndShell",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "alignItems": "center",
            "wrap": "nowrap",
            "gap": "none",
            "items": [],
            "classes": [
                "rc16-field-shell"
            ]
        },
        "parentName": "RC16_EndGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_FieldEnd",
        "values": {
            "type": "crt.DateTimePicker",
            "label": "End Date",
            "labelPosition": "hidden",
            "control": "$RC3_End",
            "appearance": "outline",
            "readonly": "$RC3_Busy",
            "classes": [
                "rc16-field-control",
                "rc16-field-date"
            ],
            "pickerType": "date",
            "placeholder": "Leave blank = ongoing",
            "ariaLabel": "End Date"
        },
        "parentName": "RC16_EndShell",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_ContractsLabelBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "classes": [
                "rc3-field-label"
            ]
        },
        "parentName": "RC3_Editor",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "RC3_ContractsLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Applicable Contracts",
            "labelType": "body"
        },
        "parentName": "RC3_ContractsLabelBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_ContractsBar",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc3-contracts"
            ],
            "alignItems": "center"
        },
        "parentName": "RC3_Editor",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "RC3_AllContractsSelected",
        "values": {
            "type": "crt.Button",
            "caption": "All Contracts",
            "color": "default",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc3-chip",
                "rc3-selected"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "allContracts"
                }
            },
            "pressed": "$RC3_AllContracts",
            "disabled": "$RC3_Busy",
            "visible": "$RC3_AllContracts"
        },
        "parentName": "RC3_ContractsBar",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_AllContractsUnselected",
        "values": {
            "type": "crt.Button",
            "caption": "All Contracts",
            "color": "default",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc3-chip",
                "rc3-unselected"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "allContracts"
                }
            },
            "pressed": "$RC3_AllContracts",
            "disabled": "$RC3_Busy",
            "visible": "$RC3_AllContracts | crt.InvertBooleanValue"
        },
        "parentName": "RC3_ContractsBar",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_ContractChips",
        "values": {
            "type": "crt.TemplateList",
            "items": "$RC3_ContractOptions",
            "direction": "row",
            "gap": 8,
            "classes": [
                "rc3-contract-chips"
            ],
            "template": [
                {
                    "type": "crt.Button",
                    "caption": "$RC3_ContractOptions.Display",
                    "size": "small",
                    "color": "default",
                    "textTransform": "none",
                    "classes": [
                        "rc3-chip",
                        "rc3-selected"
                    ],
                    "pressed": "$RC3_ContractOptions.Id | usr.RC3_IsSelected:$RC3_SelectedContracts:$RC3_AllContracts",
                    "disabled": "$RC3_Busy",
                    "clicked": {
                        "request": "usr.RC3_Action",
                        "params": {
                            "action": "contract",
                            "recordId": "$RC3_ContractOptions.Id",
                            "name": "$RC3_ContractOptions.Display"
                        }
                    },
                    "visible": "$RC3_ContractOptions.Id | usr.RC3_IsSelected:$RC3_SelectedContracts:$RC3_AllContracts"
                },
                {
                    "type": "crt.Button",
                    "caption": "$RC3_ContractOptions.Display",
                    "size": "small",
                    "color": "default",
                    "textTransform": "none",
                    "classes": [
                        "rc3-chip",
                        "rc3-unselected"
                    ],
                    "pressed": "$RC3_ContractOptions.Id | usr.RC3_IsSelected:$RC3_SelectedContracts:$RC3_AllContracts",
                    "disabled": "$RC3_Busy",
                    "clicked": {
                        "request": "usr.RC3_Action",
                        "params": {
                            "action": "contract",
                            "recordId": "$RC3_ContractOptions.Id",
                            "name": "$RC3_ContractOptions.Display"
                        }
                    },
                    "visible": "$RC3_ContractOptions.Id | usr.RC3_IsSelected:$RC3_SelectedContracts:$RC3_AllContracts | crt.InvertBooleanValue"
                }
            ]
        },
        "parentName": "RC3_ContractsBar",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "RC3_MoreContracts",
        "values": {
            "type": "crt.Button",
            "caption": "Select contracts…",
            "color": "default",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc3-chip"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "selectContracts"
                }
            },
            "disabled": "$RC3_Busy"
        },
        "parentName": "RC3_ContractsBar",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "RC3_ContractSummaryBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "classes": [
                "rc3-contract-summary"
            ],
            "visible": "$RC3_AllContracts | crt.InvertBooleanValue"
        },
        "parentName": "RC3_Editor",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "RC3_ContractSummary",
        "values": {
            "type": "crt.Label",
            "caption": "$RC3_SelectedContracts | usr.RC3_SelectionText:$RC3_AllContracts",
            "labelType": "body"
        },
        "parentName": "RC3_ContractSummaryBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_StatusLabelBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "classes": [
                "rc3-field-label"
            ]
        },
        "parentName": "RC3_Editor",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "RC3_StatusLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Status",
            "labelType": "body"
        },
        "parentName": "RC3_StatusLabelBox",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_StatusButtons",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc3-status-buttons"
            ],
            "alignItems": "center"
        },
        "parentName": "RC3_Editor",
        "propertyName": "items",
        "index": 7
    },
    {
        "operation": "insert",
        "name": "RC3_SetActiveSelected",
        "values": {
            "type": "crt.Button",
            "caption": "Active",
            "color": "default",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc3-chip",
                "rc3-selected"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "setActive",
                    "value": true
                }
            },
            "pressed": "$RC3_Active",
            "disabled": "$RC3_Busy",
            "visible": "$RC3_Active"
        },
        "parentName": "RC3_StatusButtons",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_SetActiveUnselected",
        "values": {
            "type": "crt.Button",
            "caption": "Active",
            "color": "default",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc3-chip",
                "rc3-unselected"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "setActive",
                    "value": true
                }
            },
            "pressed": "$RC3_Active",
            "disabled": "$RC3_Busy",
            "visible": "$RC3_Active | crt.InvertBooleanValue"
        },
        "parentName": "RC3_StatusButtons",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_SetInactiveSelected",
        "values": {
            "type": "crt.Button",
            "caption": "Inactive",
            "color": "default",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc3-chip",
                "rc3-selected"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "setActive",
                    "value": false
                }
            },
            "pressed": "$RC3_Active | crt.InvertBooleanValue",
            "disabled": "$RC3_Busy",
            "visible": "$RC3_Active | crt.InvertBooleanValue"
        },
        "parentName": "RC3_StatusButtons",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "RC3_SetInactiveUnselected",
        "values": {
            "type": "crt.Button",
            "caption": "Inactive",
            "color": "default",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc3-chip",
                "rc3-unselected"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "setActive",
                    "value": false
                }
            },
            "pressed": "$RC3_Active | crt.InvertBooleanValue",
            "disabled": "$RC3_Busy",
            "visible": "$RC3_Active | crt.InvertBooleanValue | crt.InvertBooleanValue"
        },
        "parentName": "RC3_StatusButtons",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "RC3_FormActions",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc11-form-actions"
            ],
            "justifyContent": "end",
            "alignItems": "center"
        },
        "parentName": "RC3_Editor",
        "propertyName": "items",
        "index": 8
    },
    {
        "operation": "insert",
        "name": "RC3_Cancel",
        "values": {
            "type": "crt.Button",
            "caption": "Cancel",
            "color": "default",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc11-secondary"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "close"
                }
            },
            "disabled": "$RC3_Busy"
        },
        "parentName": "RC3_FormActions",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "RC3_Save",
        "values": {
            "type": "crt.Button",
            "caption": "$RC3_SaveCaption",
            "color": "default",
            "size": "medium",
            "textTransform": "none",
            "classes": [
                "rc11-primary"
            ],
            "clicked": {
                "request": "usr.RC3_Action",
                "params": {
                    "action": "save"
                }
            },
            "disabled": "$RC3_SaveDisabled"
        },
        "parentName": "RC3_FormActions",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "RC3_TableWrap",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "wrap": "nowrap",
            "classes": [
                "rc11-list-panel"
            ],
            "fitContent": true
        },
        "parentName": "RC3_Page",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "RC11_ResourceList",
        "parentName": "RC3_TableWrap",
        "propertyName": "items",
        "index": 0,
        "values": {
            "type": "crt.DataGrid",
            "items": "$RC3_Rows",
            "primaryColumnName": "Id",
            "classes": [
                "rc11-datagrid"
            ],
            "fitContent": true,
            "placeholder": false,
            "features": {
                "rows": {
                    "selection": false
                },
                "editable": {
                    "enable": false,
                    "itemsCreation": false,
                    "floatingEditPanel": false
                }
            },
            "_designOptions": {
                "columns": {
                    "cellViews": {
                        "Code": {
                            "type": "crt.TableTextCell",
                            "value": "$RC3_Rows.Code"
                        },
                        "ApplicableContracts": {
                            "type": "crt.TableTextCell",
                            "value": "$RC3_Rows.Id | usr.RC3_ContractText:$RC3_Rows.AllContracts:$RC3_ContractMap"
                        },
                        "Active": {
                            "type": "crt.TableTextCell",
                            "value": "$RC3_Rows.Active | usr.RC3_StatusText"
                        },
                        "Start": {
                            "type": "crt.TableTextCell",
                            "value": "$RC3_Rows.Start | usr.RC3_Dates:$RC3_Rows.End"
                        },
                        "PointRules": {
                            "type": "crt.TableTextCell",
                            "value": "$RC3_Rows.Id | usr.RC3_Rules:$RC3_RuleMap"
                        }
                    }
                }
            },
            "columns": [
                {
                    "id": "4ca5a159-8423-5ee8-ae00-ce8a7829a2dc",
                    "code": "Code",
                    "caption": "Resource Code",
                    "dataValueType": 1,
                    "width": 145
                },
                {
                    "id": "2865a436-ddc7-5a62-95d7-74eea9335092",
                    "code": "Name",
                    "caption": "Resource Name",
                    "dataValueType": 1,
                    "width": 230
                },
                {
                    "id": "5fa8c3bc-436b-5359-aa89-eeb192353782",
                    "code": "Category",
                    "caption": "Category",
                    "dataValueType": 10,
                    "width": 145
                },
                {
                    "id": "e22d7ddb-037c-5beb-a3f2-fb89e437f211",
                    "code": "Unit",
                    "caption": "Unit",
                    "dataValueType": 1,
                    "width": 95
                },
                {
                    "id": "199282b1-e070-584b-aaf4-0db180fef4e8",
                    "code": "ApplicableContracts",
                    "caption": "Applicable Contracts",
                    "dataValueType": 1,
                    "width": 200
                },
                {
                    "id": "5c4095c7-9f37-56b9-8d76-ee1b1ec2c01e",
                    "code": "Active",
                    "caption": "Status",
                    "dataValueType": 12,
                    "width": 100
                },
                {
                    "id": "a1774044-dcd2-52cf-a677-e0f043cf4900",
                    "code": "Start",
                    "caption": "Creation Date",
                    "dataValueType": 8,
                    "width": 145
                },
                {
                    "id": "1f1642ac-5568-55bf-8f07-1af010f824cd",
                    "code": "PointRules",
                    "caption": "Point Rules",
                    "dataValueType": 1,
                    "width": 90
                }
            ],
            "rowToolbarItems": [
                {
                    "type": "crt.MenuItem",
                    "caption": "Open",
                    "icon": "edit-row-action",
                    "clicked": {
                        "request": "usr.RC3_OpenEdit",
                        "params": {
                            "itemsAttributeName": "RC3_Rows",
                            "recordId": "$RC3_Rows.Id"
                        }
                    }
                },
                {
                    "type": "crt.MenuItem",
                    "caption": "$RC3_Rows.Active | usr.RC3_ToggleCaption",
                    "clicked": {
                        "request": "usr.RC3_ToggleResource",
                        "params": {
                            "itemsAttributeName": "RC3_Rows",
                            "recordId": "$RC3_Rows.Id"
                        }
                    }
                }
            ]
        }
    },
    {
        "operation": "insert",
        "name": "RC3_FooterBox",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "none",
            "classes": [
                "rc11-info",
                "rc11-footer"
            ]
        },
        "parentName": "RC3_Page",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "RC3_Footer",
        "values": {
            "type": "crt.Label",
            "caption": "ⓘ   Request item forms render their selectable values from this catalog. Changes take effect for new requests only.",
            "labelType": "body"
        },
        "parentName": "RC3_FooterBox",
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
            "RC3_ActiveCount": {
                "value": "—"
            },
            "RC3_UsedCount": {
                "value": "—"
            },
            "RC3_SearchText": {
                "value": ""
            },
            "RC3_CategoryFilter": {
                "value": "All"
            },
            "RC3_StatusFilter": {
                "value": "All"
            },
            "RC3_Error": {
                "value": ""
            },
            "RC3_Warning": {
                "value": ""
            },
            "RC3_EditorVisible": {
                "value": false
            },
            "RC3_EditorTitle": {
                "value": "Add Resource"
            },
            "RC3_Busy": {
                "value": false
            },
            "RC3_SaveDisabled": {
                "value": true
            },
            "RC3_SaveCaption": {
                "value": "Save"
            },
            "RC3_RecordId": {
                "value": null
            },
            "RC3_Name": {
                "value": ""
            },
            "RC3_ArabicName": {
                "value": ""
            },
            "RC3_Code": {
                "value": ""
            },
            "RC3_Category": {
                "value": null,
                "dataValueType": 10
            },
            "RC3_CategoryOptions": {
                "value": []
            },
            "RC3_Unit": {
                "value": ""
            },
            "RC3_Min": {
                "value": null
            },
            "RC3_Max": {
                "value": null
            },
            "RC3_Increment": {
                "value": null
            },
            "RC3_Start": {
                "value": null
            },
            "RC3_End": {
                "value": null
            },
            "RC3_AllContracts": {
                "value": true
            },
            "RC3_Active": {
                "value": true
            },
            "RC3_SelectedContracts": {
                "value": []
            },
            "RC3_ContractMap": {
                "value": null
            },
            "RC3_RuleMap": {
                "value": null
            },
            "RC3_Filter": {
                "value": null
            },
            "RC3_OpenToken": {
                "value": 0
            },
            "RC3_SummaryToken": {
                "value": 0
            },
            "RC3_SearchToken": {
                "value": 0
            },
            "RC3_Destroyed": {
                "value": false
            },
            "RC3_Rows": {
                "isCollection": true,
                "modelConfig": {
                    "path": "RC3_ResourceDS",
                    "filterAttributes": [],
                    "sortingConfig": {
                        "default": [
                            {
                                "columnName": "Name",
                                "direction": "asc"
                            }
                        ]
                    },
                    "pagingConfig": {
                        "rowCount": 50
                    }
                },
                "viewModelConfig": {
                    "attributes": {
                        "Id": {
                            "modelConfig": {
                                "path": "RC3_ResourceDS.Id"
                            }
                        },
                        "Name": {
                            "modelConfig": {
                                "path": "RC3_ResourceDS.Name"
                            }
                        },
                        "Code": {
                            "modelConfig": {
                                "path": "RC3_ResourceDS.UsrCode"
                            }
                        },
                        "Category": {
                            "modelConfig": {
                                "path": "RC3_ResourceDS.UsrCategory"
                            }
                        },
                        "Unit": {
                            "modelConfig": {
                                "path": "RC3_ResourceDS.UsrUnit"
                            }
                        },
                        "AllContracts": {
                            "modelConfig": {
                                "path": "RC3_ResourceDS.UsrAllContracts"
                            }
                        },
                        "Active": {
                            "modelConfig": {
                                "path": "RC3_ResourceDS.UsrActive"
                            }
                        },
                        "Start": {
                            "modelConfig": {
                                "path": "RC3_ResourceDS.UsrStartDate"
                            }
                        },
                        "End": {
                            "modelConfig": {
                                "path": "RC3_ResourceDS.UsrEndDate"
                            }
                        },
                        "Actions": {
                            "value": ""
                        },
                        "ApplicableContracts": {
                            "value": ""
                        },
                        "PointRules": {
                            "value": "0"
                        }
                    }
                }
            },
            "RC3_ContractOptions": {
                "isCollection": true,
                "modelConfig": {
                    "path": "RC3_ContractDS",
                    "sortingConfig": {
                        "default": [
                            {
                                "columnName": "Name",
                                "direction": "asc"
                            }
                        ]
                    },
                    "pagingConfig": {
                        "rowCount": 50
                    }
                },
                "viewModelConfig": {
                    "attributes": {
                        "Id": {
                            "modelConfig": {
                                "path": "RC3_ContractDS.Id"
                            }
                        },
                        "Display": {
                            "modelConfig": {
                                "path": "RC3_ContractDS.Name"
                            }
                        }
                    }
                }
            },
            "RC4_HasMore": {
                "value": false
            },
            "RC4_Empty": {
                "value": false
            },
            "RC4_LoadingMore": {
                "value": false
            },
            "RC4_FilterToken": {
                "value": 0
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
            "RC3_ResourceDS": {
                "type": "crt.EntityDataSource",
                "scope": "viewElement",
                "config": {
                    "entitySchemaName": "UsrMCITResourceType",
                    "attributes": {
                        "Id": {
                            "path": "Id"
                        },
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
                        "UsrActive": {
                            "path": "UsrActive"
                        },
                        "UsrStartDate": {
                            "path": "UsrStartDate"
                        },
                        "UsrEndDate": {
                            "path": "UsrEndDate"
                        }
                    }
                }
            },
            "RC3_ContractDS": {
                "type": "crt.EntityDataSource",
                "scope": "viewElement",
                "config": {
                    "entitySchemaName": "UsrMCITContract",
                    "attributes": {
                        "Id": {
                            "path": "Id"
                        },
                        "Name": {
                            "path": "Name"
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
            "entitySchemaName": "UsrMCITResourceType"
        }
    }
]/**SCHEMA_MODEL_CONFIG_DIFF*/,

handlers: /**SCHEMA_HANDLERS*/[
    // Dedicated button actions: do not rely on an implicit "action" key in button params.
    {
        request: "usr.RC3_OpenAdd",
        handler: async (request) => {
            const c = request.$context;
            return c.executeRequest({ type: "usr.RC3_Action", action: "add", $context: c });
        }
    },
    {
        request: "usr.RC3_OpenEdit",
        handler: async (request) => {
            const c = request.$context;
            const id = request.recordId || request.params?.recordId || request.data?.recordId;
            return c.executeRequest({ type: "usr.RC3_Action", action: "edit", recordId: id, $context: c });
        }
    },
    {
        request: "usr.RC3_ToggleResource",
        handler: async (request) => {
            const c = request.$context;
            const id = request.recordId || request.params?.recordId || request.data?.recordId;
            return c.executeRequest({ type: "usr.RC3_Action", action: "toggle", recordId: id, $context: c });
        }
    },

    {
        // The list always reads the CURRENT search/category/status state, including
        // after Activate/Deactivate and after Save. No filter attribute race.
        request: "crt.LoadDataRequest",
        handler: async (request, next) => {
            if (request.dataSourceName !== "RC3_ResourceDS") {
                return next?.handle(request);
            }
            const context = request.$context;
            const before = (await context.RC3_Rows)?.length || 0;
            try {
                const category = String(await context.RC3_CategoryFilter || "All");
                const status = String(await context.RC3_StatusFilter || "All");
                const query = String(await context.RC3_SearchText || "").trim();
                if (category !== "All" || status !== "All" || query) {
                    const group = new sdk.FilterGroup();
                    const operators = sdk.LogicalOperatorType || sdk.LogicalOperation;
                    group.logicalOperation = operators.And;
                    if (category !== "All") {
                        await group.addSchemaColumnFilterWithParameter(
                            sdk.ComparisonType.Equal, "UsrCategory.Name", category);
                    }
                    if (status !== "All") {
                        await group.addSchemaColumnFilterWithParameter(
                            sdk.ComparisonType.Equal, "UsrActive", status === "Active");
                    }
                    if (query) {
                        const words = new sdk.FilterGroup();
                        words.logicalOperation = operators.Or;
                        await words.addSchemaColumnFilterWithParameter(
                            sdk.ComparisonType.Contain, "Name", query);
                        await words.addSchemaColumnFilterWithParameter(
                            sdk.ComparisonType.Contain, "UsrCode", query);
                        await words.addSchemaColumnFilterWithParameter(
                            sdk.ComparisonType.Contain, "UsrArabicName", query);
                        group.add("Search", words);
                    }
                    // SDK FilterGroup properties are not all directly enumerable.
                    // Convert the top-level group to a plain serializable filter.
                    const filter = Object.assign({}, group);
                    filter.items = group.items;
                    request.parameters = request.parameters || [];
                    request.parameters.push({
                        type: sdk.ModelParameterType.Filter,
                        value: filter
                    });
                }
                const result = await next?.handle(request);
                const count = (await context.RC3_Rows)?.length || 0;
                context.RC4_Empty = count === 0;
                context.RC4_HasMore = request.config?.loadType === "loadNext"
                    ? count - before >= 50 : count >= 50;
                return result;
            } catch (error) {
                context.RC3_Error = "Could not load filtered resources: " +
                    (error?.message || String(error));
                console.error("Resource Catalog list load", error);
                throw error;
            }
        }
    },

    {
        request: "crt.HandleViewModelInitRequest",
        handler: async (request, next) => {
            const result = await next?.handle(request);
            request.$context.RC3_Destroyed = false;
            // Supplemental counts never hold the Designer/page initialization open.
            Promise.resolve().then(() => request.$context.executeRequest({
                type: "usr.RC3_Action", $context: request.$context, action: "summary"
            })).catch(error => console.error("Resource Catalog summary", error));
            return result;
        }
    },
    {
        request: "crt.HandleViewModelDestroyRequest",
        handler: async (request, next) => {
            request.$context.RC3_Destroyed = true;
            return next?.handle(request);
        }
    },
    {
        request: "crt.HandleViewModelAttributeChangeRequest",
        handler: async (request, next) => {
            const result = await next?.handle(request);
            const context = request.$context;
            if (request.attributeName === "RC3_SearchText" && !request.silent && request.value !== request.oldValue) {
                // Do NOT await a timer in the attribute change chain: doing so
                // can prevent the input from updating as the user types.
                const token = (await context.RC3_SearchToken || 0) + 1;
                context.RC3_SearchToken = token;
                setTimeout(async () => {
                    if (await context.RC3_Destroyed ||
                        token !== await context.RC3_SearchToken) return;
                    try {
                        await context.executeRequest({
                            type: "usr.RC3_Action", action: "filter", $context: context
                        });
                    } catch (error) {
                        console.error("Resource Catalog search", error);
                        context.RC3_Error = error?.message || "Search failed.";
                    }
                }, 180);
            }
            if (["RC3_Name", "RC3_Code", "RC3_Category", "RC3_Busy"].includes(request.attributeName)) {
                const name = String(await context.RC3_Name || "").trim();
                const code = String(await context.RC3_Code || "").trim();
                const category = await context.RC3_Category;
                context.RC3_SaveDisabled = !!(await context.RC3_Busy) || !name || !code || !category?.value;
            }
            return result;
        }
    },
    {
        request: "usr.RC3_Action",
        handler: async request => {
            const context = request.$context;
            // These object/column names are taken from the supplied working source.
            const RESOURCE = "UsrMCITResourceType";
            const CATEGORY = "UsrMCITResourceCategory";
            const CONTRACT = "UsrMCITContract";
            const LINK = "UsrMCITResourceContract";
            const RATE = "UsrConfigResourceRate";
            const idOf = value => typeof value === "string" ? value : value?.value || value?.Id || value?.id || null;
            const nameOf = value => typeof value === "string" ? value : value?.displayValue || value?.Name || "";
            const primary = id => [{type:sdk.ModelParameterType.PrimaryColumnValue,value:id}];
            const cloneFilter = filter => Object.assign({}, filter, {items:filter.items});
            const filteredBy = async (column, value) => {
                const filter = new sdk.FilterGroup();
                await filter.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,column,value);
                return [{type:sdk.ModelParameterType.Filter,value:cloneFilter(filter)}];
            };
            const message = error => error?.message || "The operation could not be completed.";
            const boundedRead = promise => new Promise((resolve,reject) => {
                const timer = setTimeout(() => reject(new Error("The data request timed out. Please retry.")),20000);
                promise.then(value => {clearTimeout(timer);resolve(value);},error => {clearTimeout(timer);reject(error);});
            });
            const allRows = async (entity, attributes, parameters) => {
                const model = await sdk.Model.create(entity);
                const rows = [], seen = new Set();
                for (let page=0;page<80;page++) {
                    const batch = await boundedRead(model.load({attributes,parameters:parameters || [],options:{
                        pagingConfig:{rowsOffset:page*250,rowCount:250},
                        sortingConfig:{columns:[{columnName:"Id",direction:"asc"}]}
                    }}));
                    if (!Array.isArray(batch)) throw new Error("Unexpected result reading " + entity + ".");
                    for (const row of batch) {
                        if (seen.has(row.Id)) throw new Error("Paging did not advance for " + entity + ". Counts were not published.");
                        seen.add(row.Id); rows.push(row);
                    }
                    if (batch.length<250) return rows;
                }
                throw new Error("Catalog summary exceeds 20,000 records; use a server-side aggregate for this deployment.");
            };
            const setBusy = busy => {
                context.RC3_Busy = busy;
                context.RC3_SaveCaption = busy ? "Saving…" : "Save";
                if (busy) context.RC3_SaveDisabled = true;
            };
            const reset = () => {
                context.RC3_RecordId = null;
                context.RC3_Name = ""; context.RC3_ArabicName = ""; context.RC3_Code = "";
                context.RC3_Category = null; context.RC3_Unit = "";
                context.RC3_Min = null; context.RC3_Max = null; context.RC3_Increment = null;
                context.RC3_Start = new Date(); context.RC3_End = null;
                context.RC3_AllContracts = true; context.RC3_SelectedContracts = [];
                context.RC3_Active = true; context.RC3_Error = ""; context.RC3_SaveDisabled = true;
            };
            const ensureCategories = async () => {
                const records = await allRows(CATEGORY,["Id","Name"]);
                const options = records.map(row=>({value:row.Id,displayValue:row.Name}));
                const order = ["CPU","RAM","Storage","OS","Environment","Network","Other"];
                options.sort((a,b) => {
                    const ai=order.indexOf(a.displayValue),bi=order.indexOf(b.displayValue);
                    return (ai<0?99:ai)-(bi<0?99:bi) || a.displayValue.localeCompare(b.displayValue);
                });
                context.RC3_CategoryOptions = options;
                return options;
            };
            const refresh = () => context.executeRequest({
                type:"crt.LoadDataRequest",$context:context,dataSourceName:"RC3_ResourceDS",config:{loadType:"reload"}
            });
            const summary = async () => {
                const token=(await context.RC3_SummaryToken || 0)+1;
                context.RC3_SummaryToken=token;
                const results=await Promise.allSettled([
                    allRows(RESOURCE,["Id","UsrActive"]),
                    allRows(RATE,["Id","UsrResourceType"]),
                    allRows(LINK,["Id","UsrResourceType","UsrContract"])
                ]);
                if (await context.RC3_Destroyed || token!==await context.RC3_SummaryToken) return;
                const warnings=[];
                const [resources,rates,links]=results;
                if(resources.status==="fulfilled") context.RC3_ActiveCount=String(resources.value.filter(row=>row.UsrActive===true).length);
                else {context.RC3_ActiveCount="—"; warnings.push("Active count unavailable.");console.error(resources.reason);}
                if(rates.status==="fulfilled") {
                    const counts={};
                    for(const row of rates.value){const id=idOf(row.UsrResourceType);if(id) counts[id]=(counts[id]||0)+1;}
                    context.RC3_RuleMap=counts;
                    context.RC3_UsedCount=String(Object.keys(counts).length);
                } else {context.RC3_RuleMap=null;context.RC3_UsedCount="—";warnings.push("Point rule counts unavailable.");console.error(rates.reason);}
                if(links.status==="fulfilled") {
                    const labels={};
                    for(const row of links.value){
                        const id=idOf(row.UsrResourceType),name=nameOf(row.UsrContract)||idOf(row.UsrContract);
                        if(!id||!name)continue;
                        if(!labels[id])labels[id]=[];
                        if(!labels[id].includes(name))labels[id].push(name);
                    }
                    context.RC3_ContractMap=labels;
                } else {context.RC3_ContractMap=null;warnings.push("Contract names unavailable.");console.error(links.reason);}
                context.RC3_Warning=warnings.join(" ");
            };
            const linksFor = async id => allRows(LINK,["Id","UsrContract"],await filteredBy("UsrResourceType",id));
            const syncLinks = async (resourceId, selected, all) => {
                const current=await linksFor(resourceId);
                const wanted=new Set(all?[]:selected.map(idOf).filter(Boolean));
                const existing=new Set(current.map(row=>idOf(row.UsrContract)));
                const model=await sdk.Model.create(LINK);
                // Add before removing old links; failures remain retryable.
                for(const id of wanted) if(!existing.has(id)) {
                    const result=await model.insert({UsrResourceType:resourceId,UsrContract:id});
                    if(!result?.success)throw new Error("Could not link the selected contract.");
                }



				
                for(const row of current) if(!wanted.has(idOf(row.UsrContract))) {
                    const result=await model.delete(primary(row.Id));
                    if(!result?.success)throw new Error("Could not remove a previous contract link.");
                }
            };
            const normalizeSelection = result => {
                const raw=Array.isArray(result)?result:Array.isArray(result?.value)?result.value:Array.isArray(result?.selectedItems)?result.selectedItems:Object.values(result||{});
                return raw.filter(item=>item&&typeof item==="object"&&idOf(item)).map(item=>({value:idOf(item),displayValue:nameOf(item)}));
            };
            const dateOnly = value => {
                if(!value)return null;
                if(typeof value==="string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
                const date=value instanceof Date?value:new Date(value);
                if(Number.isNaN(date.getTime())) throw new Error("Please enter a valid date.");
                return date.getFullYear()+"-"+String(date.getMonth()+1).padStart(2,"0")+"-"+String(date.getDate()).padStart(2,"0");
            };
            const number = value => value===null||value===undefined||value===""?null:Number(value);
            try {
                if(await context.RC3_Destroyed) return;
                switch(request.action || request.params?.action) {
                    case "summary": await summary(); return;
                    case "loadMore":
                        if(await context.RC4_LoadingMore)return;
                        context.RC4_LoadingMore=true;
                        try {await context.executeRequest({type:"crt.LoadDataRequest",$context:context,dataSourceName:"RC3_ResourceDS",config:{loadType:"loadNext"}});}
                        finally {context.RC4_LoadingMore=false;}
                        return;
                    case "category":
                        if(!["All","CPU","RAM","Storage","OS","Environment","Network","Other"].includes(request.value))return;
                        context.RC3_CategoryFilter=request.value;
                        context.RC3_Error="";
                        await refresh(); return;
                    case "status":
                        if(!["All","Active","Inactive"].includes(request.value))return;
                        context.RC3_StatusFilter=request.value;
                        context.RC3_Error="";
                        await refresh(); return;
                    case "filter":
                        context.RC3_Error="";
                        await refresh(); return;
                    case "setActive":
                        if(!await context.RC3_Busy)context.RC3_Active=request.value===true;
                        return;
                    case "allContracts":
                        if(!await context.RC3_Busy){context.RC3_AllContracts=true;context.RC3_SelectedContracts=[];}
                        return;
                    case "contract": {
                        if(await context.RC3_Busy)return;
                        const id=idOf(request.recordId || request.params?.recordId);if(!id)return;
                        const old=await context.RC3_SelectedContracts||[];
                        context.RC3_SelectedContracts=old.some(item=>idOf(item)===id)?old.filter(item=>idOf(item)!==id):old.concat({value:id,displayValue:request.name||id});
                        context.RC3_AllContracts=false;return;
                    }
                    case "selectContracts": {
                        if (await context.RC3_Busy) return;
                        const token = await context.RC3_OpenToken;
                        context.RC3_Error = "";
                        const current = await context.RC3_SelectedContracts || [];
                        // Readable error for an empty contracts table rather than a blank picker.
                        const existingContracts = await boundedRead(
                            (await sdk.Model.create(CONTRACT)).load({attributes: ["Id", "Name"],
                                options: {pagingConfig: {rowsOffset: 0, rowCount: 100}}})
                        );
                        if (!existingContracts.length) {
                            context.RC3_Warning = "No contracts found. Create contracts in the Contracts section before linking a resource.";
                            return;
                        }
                        const selectionIds = (await context.RC3_AllContracts) === true
                            ? [] : current.map(idOf).filter(Boolean);
                        await context.executeRequest({
                            type: "crt.OpenSelectionWindowRequest",
                            $context: context,
                            entitySchemaName: CONTRACT,
                            caption: "Select applicable contracts",
                            selectionState: {type: "specific", selected: selectionIds},
                            features: {
                                select: {multiple: true, selectAll: true},
                                create: {enabled: false}
                            },
                            afterClosed: async selection => {
                                if (!selection || selection.canceled ||
                                    !await context.RC3_EditorVisible ||
                                    token !== await context.RC3_OpenToken ||
                                    await context.RC3_Destroyed) return;
                                try {
                                    let chosen = [];
                                    // New selection window returns selected items through getLookupValues.
                                    if (typeof selection.getLookupValues === "function") {
                                        for (let offset=0; offset<10000; offset+=200) {
                                            const part = await selection.getLookupValues({
                                                pagingConfig: {rowsOffset: offset, rowCount: 200}
                                            });
                                            if (!Array.isArray(part)) break;
                                            chosen.push(...part);
                                            if (part.length < 200) break;
                                        }
                                    } else {
                                        // Compatibility with older selection window results.
                                        chosen = normalizeSelection(selection);
                                    }
                                    const ids = [...new Set(chosen.map(idOf).filter(Boolean))];
                                    const loadedNames = new Map(existingContracts.map(c => [c.Id, c.Name]));
                                    // SelectionWindowRequest can return only IDs, not display values.
                                    for (const c of chosen) {
                                        const id=idOf(c), name=nameOf(c);
                                        if (id && name && name!==id) loadedNames.set(id,name);
                                    }
                                    // Replace (never merge) to honor contracts the user unchecked.
                                    context.RC3_SelectedContracts = ids.map(id => ({
                                        value:id, displayValue:loadedNames.get(id) || id
                                    }));
                                    context.RC3_AllContracts = false;
                                    context.RC3_Warning = ids.length ? "" : "No contracts selected. Select at least one, or choose All Contracts.";
                                } catch (e) {
                                    context.RC3_Error = "Unable to read selected contracts: " + message(e);
                                    console.error("Resource Catalog contracts", e);
                                }
                            }
                        });
                        return;
                    }
                    case "close":
                        if(await context.RC3_Busy)return;
                        context.RC3_OpenToken=(await context.RC3_OpenToken||0)+1;
                        context.RC3_EditorVisible=false;reset();return;
                    case "add": {
                        if(await context.RC3_Busy)return;
                        context.RC3_OpenToken=(await context.RC3_OpenToken||0)+1;
                        const token=await context.RC3_OpenToken;
                        reset();context.RC3_EditorTitle="Add Resource";context.RC3_EditorVisible=true;
                        try {
                            const options=await ensureCategories();
                            if(token===await context.RC3_OpenToken && !await context.RC3_Category && options.length) {
                                context.RC3_Category=options[0];
                            }
                        } catch (error) {
                            console.error("Resource Catalog categories", error);
                            context.RC3_Warning="Resource editor opened, but categories could not be loaded: "+message(error);
                        }
                        return;
                    }
                    case "edit": {
                        if(await context.RC3_Busy)return;
                        const id=idOf(request.recordId || request.params?.recordId);if(!id)throw new Error("No resource was selected.");
                        const token=(await context.RC3_OpenToken||0)+1;context.RC3_OpenToken=token;
                        const model=await sdk.Model.create(RESOURCE);
                        const records=await boundedRead(model.load({attributes:["Id","Name","UsrArabicName","UsrCode","UsrCategory","UsrUnit","UsrMinValue","UsrMaxValue","UsrIncrement","UsrStartDate","UsrEndDate","UsrAllContracts","UsrActive"],parameters:primary(id)}));
                        if(token!==await context.RC3_OpenToken||await context.RC3_Destroyed)return;
                        if(!records.length)throw new Error("This resource was deleted or you do not have access to it.");
                        const row=records[0]; reset();context.RC3_RecordId=row.Id;
                        // Open the editor even if a secondary lookup table is temporarily unavailable.
                        context.RC3_EditorTitle="Edit: "+(row.Name||"Resource");
                        context.RC3_EditorVisible=true;
                        let links=[];
                        try { links=await linksFor(id); }
                        catch (error) { context.RC3_Warning="Contract links unavailable: "+message(error); }
                        try { await ensureCategories(); }
                        catch (error) { context.RC3_Warning="Categories unavailable: "+message(error); }
                        context.RC3_Name=row.Name||"";context.RC3_ArabicName=row.UsrArabicName||"";
                        context.RC3_Code=row.UsrCode||"";context.RC3_Unit=row.UsrUnit||"";
                        context.RC3_Category=idOf(row.UsrCategory)?{value:idOf(row.UsrCategory),displayValue:nameOf(row.UsrCategory)}:null;
                        context.RC3_Min=row.UsrMinValue;context.RC3_Max=row.UsrMaxValue;context.RC3_Increment=row.UsrIncrement;
                        context.RC3_Start=row.UsrStartDate?new Date(row.UsrStartDate):null;
                        context.RC3_End=row.UsrEndDate?new Date(row.UsrEndDate):null;
                        context.RC3_AllContracts=row.UsrAllContracts===true;context.RC3_Active=row.UsrActive===true;
                        context.RC3_SelectedContracts=links.map(link=>({value:idOf(link.UsrContract),displayValue:nameOf(link.UsrContract)}));
                        return;
                    }
                    case "toggle": {
                        if (await context.RC3_Busy) return;
                        const id = idOf(request.recordId || request.params?.recordId);
                        if (!id || typeof id !== "string" || !/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(id)) {
                            throw new Error("The selected resource ID was not passed to Activate/Deactivate.");
                        }
                        setBusy(true); context.RC3_Error = "";
                        let wasUpdated = false;
                        try {
                            const model = await sdk.Model.create(RESOURCE);
                            const rows = await boundedRead(model.load({
                                attributes: ["Id", "UsrActive"], parameters: primary(id)
                            }));
                            if (!rows.length) throw new Error("This resource was not found or is not accessible.");
                            const isActive = rows[0].UsrActive === true ||
                                rows[0].UsrActive === 1 || rows[0].UsrActive === "true";
                            const newState = !isActive;
                            const result = await model.update({UsrActive: newState}, primary(id));
                            if (!result?.success) {
                                throw new Error("The status change was rejected. Check edit permissions for UsrMCITResourceType.");
                            }
                            wasUpdated = true;
                            if (id === await context.RC3_RecordId) context.RC3_Active = newState;
                            // Reload against the active search/status/category filters.
                            // When filtering by Active/Inactive the row can disappear,
                            // because it no longer matches the selected status filter.
                            await refresh();
                            // Counts are supplementary: they must not undo a saved status.
                            try { await summary(); }
                            catch (error) { console.warn("Catalog counts", error); }
                        } catch (error) {
                            if (wasUpdated) {
                                context.RC3_Error = "Status was saved, but the list refresh failed: " + message(error);
                                return;
                            }
                            throw error;
                        } finally { setBusy(false); }
                        return;
                    }
                    case "save": {
                        if(await context.RC3_Busy)return;
                        setBusy(true);context.RC3_Error="";
                        let saved=false;
                        try {
                            const name=String(await context.RC3_Name||"").trim(), code=String(await context.RC3_Code||"").trim();
                            const category=idOf(await context.RC3_Category);
                            const min=number(await context.RC3_Min),max=number(await context.RC3_Max),increment=number(await context.RC3_Increment);
                            const start=dateOnly(await context.RC3_Start),end=dateOnly(await context.RC3_End);
                            const all=await context.RC3_AllContracts===true, selected=await context.RC3_SelectedContracts||[];
                            if(!name||!code)throw new Error("English Name and Resource Code are required.");
                            if(!category)throw new Error("Select a Category.");
                            if([min,max,increment].some(value=>value!==null&&(!Number.isFinite(value)||value<0)))throw new Error("Numeric values must be zero or greater.");
                            if(min!==null&&max!==null&&min>max)throw new Error("Min Value cannot exceed Max Value.");
                            if(increment!==null&&increment<=0)throw new Error("Increment must be greater than zero.");
                            if(start&&end&&end<start)throw new Error("End Date cannot be earlier than Creation Date.");
                            if(!all&&!selected.length)throw new Error("Choose All Contracts or select at least one contract.");
                            let id=await context.RC3_RecordId;
                            const model=await sdk.Model.create(RESOURCE);
                            const duplicate=await boundedRead(model.load({attributes:["Id"],parameters:await filteredBy("UsrCode",code)}));
                            if(duplicate.some(row=>row.Id!==id))throw new Error("This Resource Code already exists.");
                            const payload={Name:name,UsrArabicName:await context.RC3_ArabicName||"",UsrCode:code,UsrCategory:category,UsrUnit:await context.RC3_Unit||"",UsrMinValue:min,UsrMaxValue:max,UsrIncrement:increment,UsrStartDate:start,UsrEndDate:end,UsrAllContracts:all,UsrActive:await context.RC3_Active===true};
                            const result=id?await model.update(payload,primary(id)):await model.insert(payload);
                            if(!result?.success)throw new Error("Resource save failed. Check object permissions and required fields.");
                            saved=true;
                            if(!id) {
                                id=result.primaryAttributes?.[0]?.Id||result.primaryAttributes?.Id;
                                if(!id){
                                    const created=await boundedRead(model.load({attributes:["Id"],parameters:await filteredBy("UsrCode",code)}));
                                    if(created.length===1)id=created[0].Id;
                                }
                                if(!id)throw new Error("The saved record ID could not be resolved. Close the editor and reopen the saved resource before retrying.");
                            }
                            context.RC3_RecordId=id;
                            await syncLinks(id,selected,all);
                            context.RC3_EditorVisible=false;
                            await refresh();await summary();reset();
                        } catch(error) {
                            context.RC3_Error=(saved?"Resource saved; a follow-up operation failed. ":"")+message(error);
                            console.error("Resource Catalog save",error);
                        } finally {
                            setBusy(false);
                            context.RC3_SaveDisabled=!String(await context.RC3_Name||"").trim()||!String(await context.RC3_Code||"").trim()||!idOf(await context.RC3_Category);
                        }
                        return;
                    }
                    default: return;
                }
            } catch(error) {
                if(!await context.RC3_Destroyed)context.RC3_Error=message(error);
                console.error("Resource Catalog",error);
            }
        }
    }
]/**SCHEMA_HANDLERS*/,

converters: /**SCHEMA_CONVERTERS*/{
    "usr.RC11_FilterColor": function(current, target) { return current === target ? "primary" : "default"; },
    "usr.RC3_CategoryIs": function(value, category) { return (value?.displayValue||value?.Name||(typeof value==="string"?value:""))===category; },
    "usr.RC3_UnknownCategory": function(value) { const name=value?.displayValue||value?.Name||(typeof value==="string"?value:"");return !["CPU","RAM","Storage","OS","Environment","Network","Other"].includes(name); },
    "usr.RC3_AddVisible": function(visible, recordId) { return !!visible && !recordId; },
    "usr.RC3_EditVisible": function(rowId, recordId, visible) { return !!visible && !!recordId && rowId===recordId; },
    "usr.RC3_RowClasses": function(rowId, recordId, visible) { return ["rc4-row",visible&&rowId===recordId?"rc4-row-selected":"rc4-row-normal"]; },
    "usr.RC3_Equals": function(value, target) { return value === target; },
    "usr.RC3_LookupName": function(value) { return value?.displayValue || value?.Name || value?.name || (typeof value === "string" ? value : "Unassigned"); },
    "usr.RC3_StatusText": function(value) { return value ? "Active" : "Inactive"; },
    "usr.RC3_ToggleCaption": function(value) { return value ? "Deactivate" : "Activate"; },
    "usr.RC3_StatusClasses": function(value) { return ["rc3-badge",value ? "rc3-badge-active" : "rc3-badge-inactive"]; },
    "usr.RC3_CategoryClasses": function(value) {
        const name=value?.displayValue || value?.Name || (typeof value === "string" ? value : "Other");
        const keys={CPU:"cpu",RAM:"ram",Storage:"storage",OS:"os",Environment:"environment",Network:"network",Other:"other"};
        return ["rc3-badge","rc3-badge-"+(keys[name]||"other")];
    },
    "usr.RC3_SegmentClasses": function(value, target) { return ["rc3-segment",value===target?"rc3-selected":"rc3-unselected"]; },
    "usr.RC3_ChipClasses": function(value) { return ["rc3-chip",value?"rc3-selected":"rc3-unselected"]; },
    "usr.RC3_InactiveClasses": function(value) { return ["rc3-chip",!value?"rc3-selected":"rc3-unselected"]; },
    "usr.RC3_IsSelected": function(id, selected, all) { return !all && Array.isArray(selected) && selected.some(item=>(item.value||item.Id)===id); },
    "usr.RC3_ContractClasses": function(id, selected, all) {
        return ["rc3-chip",!all&&Array.isArray(selected)&&selected.some(item=>(item.value||item.Id)===id)?"rc3-selected":"rc3-unselected"];
    },
    "usr.RC3_SelectionText": function(selected, all) {
        return all ? "" : (Array.isArray(selected)&&selected.length ? selected.map(item=>item.displayValue||item.value).join(", ") : "Select at least one contract.");
    },
    "usr.RC3_ContractText": function(id, all, map) {
        if(all)return "All";
        if(!map)return "—";
        return map[id]?.length ? map[id].join(", ") : "None";
    },
    "usr.RC3_Rules": function(id, map) { return map ? String(map[id] || 0) : "—"; },
    "usr.RC3_Dates": function(start, end) {
        const format=value=>{
            if(!value)return "";
            if(typeof value==="string" && /^\d{4}-\d{2}-\d{2}/.test(value))return value.slice(0,10);
            const date=new Date(value);if(Number.isNaN(date.getTime()))return "";
            return date.getFullYear()+"-"+String(date.getMonth()+1).padStart(2,"0")+"-"+String(date.getDate()).padStart(2,"0");
        };
        const from=format(start),to=format(end);
        return from ? from+" – "+(to||"ongoing") : (to ? "— – "+to : "—");
    }
}/**SCHEMA_CONVERTERS*/,

validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
    };
});
