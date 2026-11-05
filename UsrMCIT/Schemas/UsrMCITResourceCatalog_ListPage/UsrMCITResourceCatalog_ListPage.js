/* TEST D: all non-grid page UI components, NO data source, NO collection, NO handlers. */
/* DIAGNOSTIC ONLY — copy your working source somewhere safe before replacing. */
define("UsrMCITResourceCatalog_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
  return {
    viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
      {
        "operation": "merge",
        "name": "MainHeader",
        "values": {
          "visible": false
        }
      },
      {
        "operation": "merge",
        "name": "MainContainer",
        "values": {
          "visible": false
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
        "values": {
          "type": "crt.FlexContainer",
          "direction": "row",
          "alignItems": "center",
          "wrap": "nowrap",
          "gap": "none",
          "items": [],
          "classes": [
            "rc15-search-shell"
          ]
        },
        "parentName": "RC3_Filters",
        "propertyName": "items",
        "index": 0
      },
      {
        "operation": "insert",
        "name": "RC15_SearchIcon",
        "values": {
          "type": "crt.Label",
          "caption": "⌕",
          "labelType": "body",
          "classes": [
            "rc15-search-icon"
          ]
        },
        "parentName": "RC15_SearchShell",
        "propertyName": "items",
        "index": 0
      },
      {
        "operation": "insert",
        "name": "RC3_Search",
        "values": {
          "type": "crt.Input",
          "control": "$RC3_SearchText",
          "label": "Search resources",
          "labelPosition": "hidden",
          "ariaLabel": "Search resource name or code",
          "placeholder": "Search resources...",
          "appearance": "legacy",
          "classes": [
            "rc11-search",
            "rc15-search-control"
          ]
        },
        "parentName": "RC15_SearchShell",
        "propertyName": "items",
        "index": 1
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
        "parentName": "Main",
        "propertyName": "items",
        "index": 1
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
          "caption": "ⓘ  This resource catalog drives request item forms. Changes may affect point rule configuration.",
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
            "row": 3,
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
            "row": 4,
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
            "value": "",
            "modelConfig": {}
          },
          "RC3_Category": {
            "value": null,
            "dataValueType": 10,
            "modelConfig": {}
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
            "value": null,
            "modelConfig": {}
          },
          "RC3_Increment": {
            "value": null
          },
          "RC3_Start": {
            "value": null,
            "modelConfig": {}
          },
          "RC3_End": {
            "value": null,
            "modelConfig": {}
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
    modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[]/**SCHEMA_MODEL_CONFIG_DIFF*/,
    handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
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

