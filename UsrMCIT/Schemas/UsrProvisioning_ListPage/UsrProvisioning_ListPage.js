/*
 * Provisioning Queue for a Freedom UI section based on the existing UsrVMRequest object.
 * Parent template: ListPageV3Template. Match define() to the actual list-page schema name.
 * Assign the section to the TE Operations workplace. Creatio object and record permissions
 * determine which requests each user can read. The page adds no permissions.
 */
define("UsrProvisioning_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
  return {
    viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
      // Replace this inherited list-template element with the queue layout.
      {"operation": "remove", "name": "MainHeader"},
      // Replace this inherited list-template element with the queue layout.
      {"operation": "remove", "name": "MainContainer"},
      // Page layout inside the Creatio shell.
      {
        "operation": "insert",
        "name": "ProvisioningContent",
        "values": {
          "type": "crt.FlexContainer",
          "direction": "column",
          "items": [],
          "gap": "medium",
          "fitContent": true,
          "padding": {"top": "large", "right": "large", "bottom": "large", "left": "large"},
          "color": "primary"
        },
        "parentName": "Main",
        "propertyName": "items",
        "index": 0
      },
      // Top row for the heading and Excel export.
      {
        "operation": "insert",
        "name": "ProvisioningHeader",
        "values": {
          "type": "crt.FlexContainer",
          "direction": "row",
          "items": [],
          "gap": "medium",
          "fitContent": true,
          "justifyContent": "space-between"
        },
        "parentName": "ProvisioningContent",
        "propertyName": "items",
        "index": 0
      },
      // Title and description.
      {
        "operation": "insert",
        "name": "ProvisioningHeading",
        "values": {"type": "crt.FlexContainer", "direction": "column", "items": [], "gap": "medium", "fitContent": true},
        "parentName": "ProvisioningHeader",
        "propertyName": "items",
        "index": 0
      },
      // Edit this text in Freedom UI Designer.
      {
        "operation": "insert",
        "name": "ProvisioningTitle",
        "values": {
          "type": "crt.Label",
          "caption": "Provisioning Queue",
          "labelType": "headline-2",
          "labelThickness": "default",
          "labelEllipsis": false,
          "labelColor": "auto",
          "labelTextAlign": "start",
          "headingLevel": "label"
        },
        "parentName": "ProvisioningHeading",
        "propertyName": "items",
        "index": 0
      },
      // Edit this text in Freedom UI Designer.
      {
        "operation": "insert",
        "name": "ProvisioningSubtitle",
        "values": {
          "type": "crt.Label",
          "caption": "Track new VM provisioning requests and open their details.",
          "labelType": "body-large",
          "labelThickness": "light",
          "labelEllipsis": false,
          "labelColor": "auto",
          "labelTextAlign": "start",
          "headingLevel": "label"
        },
        "parentName": "ProvisioningHeading",
        "propertyName": "items",
        "index": 1
      },
      // Uses Creatio Excel export with the queue filters.
      {
        "operation": "insert",
        "name": "ProvisioningExport",
        "values": {
          "type": "crt.Button",
          "caption": "Export",
          "color": "outline",
          "size": "medium",
          "iconPosition": "left-icon",
          "icon": "export-button-icon",
          "clicked": {
            "request": "crt.ExportDataGridToExcelRequest",
            "params": {
              "viewName": "ProvisioningGrid",
              "filters": "$ProvisioningRows | crt.ToCollectionFilters : 'ProvisioningRows'"
            }
          }
        },
        "parentName": "ProvisioningHeader",
        "propertyName": "items",
        "index": 1
      },
      // Holds the three native queue indicators.
      {
        "operation": "insert",
        "name": "ProvisioningMetrics",
        "values": {
          "type": "crt.GridContainer",
          "columns": ["minmax(32px, 1fr)", "minmax(32px, 1fr)", "minmax(32px, 1fr)"],
          "rows": "minmax(max-content, 32px)",
          "items": [],
          "fitContent": true,
          "gap": {"columnGap": "medium", "rowGap": "medium"}
        },
        "parentName": "ProvisioningContent",
        "propertyName": "items",
        "index": 1
      },
      // Counts matching request IDs in Creatio. Metric scope can be edited in Designer.
      {
        "operation": "insert",
        "name": "ProvisioningTotal",
        "values": {
          "type": "crt.IndicatorWidget",
          "layoutConfig": {"column": 1, "colSpan": 1, "row": 1, "rowSpan": 1},
          "config": {
            "title": "Total in queue",
            "theme": "without-fill",
            "layout": {"color": "dark-blue"},
            "text": {"template": "{0}", "metricMacros": "{0}", "labelPosition": "above-under", "fontSizeMode": "medium"},
            "data": {
              "providing": {
                "attribute": "ProvisioningTotal_Data",
                "schemaName": "UsrVMRequest",
                "filters": {
                  "filter": {
                    "items": {
                      "RequestType": {
                        "filterType": 1,
                        "comparisonType": 3,
                        "isEnabled": true,
                        "leftExpression": {"expressionType": 0, "columnPath": "UsrRequestType.Name"},
                        "rightExpression": {"expressionType": 2, "parameter": {"dataValueType": 1, "value": "New VM Provisioning"}},
                        "dataValueType": 1
                      },
                      "QueueStages": {
                        "items": {
                          "State0": {
                            "filterType": 1,
                            "comparisonType": 3,
                            "isEnabled": true,
                            "leftExpression": {"expressionType": 0, "columnPath": "UsrStatus.Name"},
                            "rightExpression": {
                              "expressionType": 2,
                              "parameter": {"dataValueType": 1, "value": "Provisioning in Progress"}
                            },
                            "dataValueType": 1
                          },
                          "State1": {
                            "filterType": 1,
                            "comparisonType": 3,
                            "isEnabled": true,
                            "leftExpression": {"expressionType": 0, "columnPath": "UsrStatus.Name"},
                            "rightExpression": {"expressionType": 2, "parameter": {"dataValueType": 1, "value": "Completed"}},
                            "dataValueType": 1
                          }
                        },
                        "logicalOperation": 1,
                        "isEnabled": true,
                        "filterType": 6,
                        "rootSchemaName": "UsrVMRequest"
                      }
                    },
                    "logicalOperation": 0,
                    "isEnabled": true,
                    "filterType": 6,
                    "rootSchemaName": "UsrVMRequest"
                  },
                  "filterAttributes": []
                },
                "aggregation": {
                  "column": {
                    "orderDirection": 0,
                    "orderPosition": -1,
                    "isVisible": true,
                    "expression": {
                      "expressionType": 1,
                      "functionArgument": {"expressionType": 0, "columnPath": "Id"},
                      "functionType": 2,
                      "aggregationType": 1,
                      "aggregationEvalType": 1
                    }
                  }
                },
                "dependencies": []
              },
              "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 0},
              "comparisonProviding": null
            },
            "comparison": null
          }
        },
        "parentName": "ProvisioningMetrics",
        "propertyName": "items",
        "index": 0
      },
      // Counts matching request IDs in Creatio. Metric scope can be edited in Designer.
      {
        "operation": "insert",
        "name": "ProvisioningInProgress",
        "values": {
          "type": "crt.IndicatorWidget",
          "layoutConfig": {"column": 2, "colSpan": 1, "row": 1, "rowSpan": 1},
          "config": {
            "title": "In Progress",
            "theme": "without-fill",
            "layout": {"color": "dark-blue"},
            "text": {"template": "{0}", "metricMacros": "{0}", "labelPosition": "above-under", "fontSizeMode": "medium"},
            "data": {
              "providing": {
                "attribute": "ProvisioningInProgress_Data",
                "schemaName": "UsrVMRequest",
                "filters": {
                  "filter": {
                    "items": {
                      "RequestType": {
                        "filterType": 1,
                        "comparisonType": 3,
                        "isEnabled": true,
                        "leftExpression": {"expressionType": 0, "columnPath": "UsrRequestType.Name"},
                        "rightExpression": {"expressionType": 2, "parameter": {"dataValueType": 1, "value": "New VM Provisioning"}},
                        "dataValueType": 1
                      },
                      "QueueStages": {
                        "items": {
                          "State0": {
                            "filterType": 1,
                            "comparisonType": 3,
                            "isEnabled": true,
                            "leftExpression": {"expressionType": 0, "columnPath": "UsrStatus.Name"},
                            "rightExpression": {
                              "expressionType": 2,
                              "parameter": {"dataValueType": 1, "value": "Provisioning in Progress"}
                            },
                            "dataValueType": 1
                          }
                        },
                        "logicalOperation": 1,
                        "isEnabled": true,
                        "filterType": 6,
                        "rootSchemaName": "UsrVMRequest"
                      }
                    },
                    "logicalOperation": 0,
                    "isEnabled": true,
                    "filterType": 6,
                    "rootSchemaName": "UsrVMRequest"
                  },
                  "filterAttributes": []
                },
                "aggregation": {
                  "column": {
                    "orderDirection": 0,
                    "orderPosition": -1,
                    "isVisible": true,
                    "expression": {
                      "expressionType": 1,
                      "functionArgument": {"expressionType": 0, "columnPath": "Id"},
                      "functionType": 2,
                      "aggregationType": 1,
                      "aggregationEvalType": 1
                    }
                  }
                },
                "dependencies": []
              },
              "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 0},
              "comparisonProviding": null
            },
            "comparison": null
          }
        },
        "parentName": "ProvisioningMetrics",
        "propertyName": "items",
        "index": 1
      },
      // Counts matching request IDs in Creatio. Metric scope can be edited in Designer.
      {
        "operation": "insert",
        "name": "ProvisioningCompleted",
        "values": {
          "type": "crt.IndicatorWidget",
          "layoutConfig": {"column": 3, "colSpan": 1, "row": 1, "rowSpan": 1},
          "config": {
            "title": "Completed",
            "theme": "without-fill",
            "layout": {"color": "green"},
            "text": {"template": "{0}", "metricMacros": "{0}", "labelPosition": "above-under", "fontSizeMode": "medium"},
            "data": {
              "providing": {
                "attribute": "ProvisioningCompleted_Data",
                "schemaName": "UsrVMRequest",
                "filters": {
                  "filter": {
                    "items": {
                      "RequestType": {
                        "filterType": 1,
                        "comparisonType": 3,
                        "isEnabled": true,
                        "leftExpression": {"expressionType": 0, "columnPath": "UsrRequestType.Name"},
                        "rightExpression": {"expressionType": 2, "parameter": {"dataValueType": 1, "value": "New VM Provisioning"}},
                        "dataValueType": 1
                      },
                      "QueueStages": {
                        "items": {
                          "State0": {
                            "filterType": 1,
                            "comparisonType": 3,
                            "isEnabled": true,
                            "leftExpression": {"expressionType": 0, "columnPath": "UsrStatus.Name"},
                            "rightExpression": {"expressionType": 2, "parameter": {"dataValueType": 1, "value": "Completed"}},
                            "dataValueType": 1
                          }
                        },
                        "logicalOperation": 1,
                        "isEnabled": true,
                        "filterType": 6,
                        "rootSchemaName": "UsrVMRequest"
                      }
                    },
                    "logicalOperation": 0,
                    "isEnabled": true,
                    "filterType": 6,
                    "rootSchemaName": "UsrVMRequest"
                  },
                  "filterAttributes": []
                },
                "aggregation": {
                  "column": {
                    "orderDirection": 0,
                    "orderPosition": -1,
                    "isVisible": true,
                    "expression": {
                      "expressionType": 1,
                      "functionArgument": {"expressionType": 0, "columnPath": "Id"},
                      "functionType": 2,
                      "aggregationType": 1,
                      "aggregationEvalType": 1
                    }
                  }
                },
                "dependencies": []
              },
              "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 0},
              "comparisonProviding": null
            },
            "comparison": null
          }
        },
        "parentName": "ProvisioningMetrics",
        "propertyName": "items",
        "index": 2
      },
      // Edit this text in Freedom UI Designer.
      {
        "operation": "insert",
        "name": "ProvisioningInstructions",
        "values": {
          "type": "crt.Label",
          "caption": "Provisioning is performed manually in the target environment. Open a request to review its VM items.",
          "labelType": "body-large",
          "labelThickness": "light",
          "labelEllipsis": false,
          "labelColor": "auto",
          "labelTextAlign": "start",
          "headingLevel": "label"
        },
        "parentName": "ProvisioningContent",
        "propertyName": "items",
        "index": 2
      },
      // Holds the native search and status controls.
      {
        "operation": "insert",
        "name": "ProvisioningFilters",
        "values": {
          "type": "crt.FlexContainer",
          "direction": "row",
          "items": [],
          "gap": "medium",
          "fitContent": true,
          "wrap": "wrap"
        },
        "parentName": "ProvisioningContent",
        "propertyName": "items",
        "index": 3
      },
      // Uses the grid columns for native search.
      {
        "operation": "insert",
        "name": "ProvisioningSearch",
        "values": {
          "type": "crt.SearchFilter",
          "placeholder": "Search provisioning requests…",
          "iconOnly": false,
          "_filterOptions": {
            "expose": [
              {
                "attribute": "ProvisioningSearchFilter",
                "converters": [{"converter": "crt.SearchFilterAttributeConverter", "args": ["ProvisioningRows"]}]
              }
            ],
            "from": ["ProvisioningSearch_SearchValue", "ProvisioningSearch_FilteredColumnsGroups"]
          }
        },
        "parentName": "ProvisioningFilters",
        "propertyName": "items",
        "index": 0
      },
      // Filters the visible list by request status.
      {
        "operation": "insert",
        "name": "ProvisioningStatus",
        "values": {
          "type": "crt.QuickFilter",
          "filterType": "lookup",
          "config": {
            "caption": "Status",
            "icon": "filter-column-icon",
            "iconPosition": "left-icon",
            "entitySchemaName": "UsrMCITRequestStatus"
          },
          "_filterOptions": {
            "expose": [
              {
                "attribute": "ProvisioningStatusFilter",
                "converters": [
                  {
                    "converter": "crt.QuickFilterAttributeConverter",
                    "args": [
                      {
                        "target": {"viewAttributeName": "ProvisioningRows", "filterColumn": "UsrStatus"},
                        "quickFilterType": "lookup"
                      }
                    ]
                  }
                ]
              }
            ],
            "from": "ProvisioningStatus_Value"
          }
        },
        "parentName": "ProvisioningFilters",
        "propertyName": "items",
        "index": 1
      },
      // Real request records. The Open menu action passes the selected request ID to the existing detail page.
      {
        "operation": "insert",
        "name": "ProvisioningGrid",
        "values": {
          "type": "crt.DataGrid",
          "items": "$ProvisioningRows",
          "primaryColumnName": "ProvisioningDS_Id",
          "columns": [
            {
              "id": "dd020792-eb62-56ea-a759-605d82bb825f",
              "code": "ProvisioningDS_UsrNumber",
              "path": "UsrNumber",
              "caption": "Request ID",
              "dataValueType": 1
            },
            {
              "id": "38045b24-bde9-59c2-b5c0-52c58160cc22",
              "code": "ProvisioningDS_UsrName",
              "path": "UsrName",
              "caption": "Title",
              "dataValueType": 1
            },
            {
              "id": "12d8d1e8-a19e-5442-b9e3-af9b5d902da9",
              "code": "ProvisioningDS_UsrAccount",
              "path": "UsrAccount",
              "caption": "Authority",
              "dataValueType": 10
            },
            {
              "id": "8a75bf79-1427-5114-ab93-ef16d36853ea",
              "code": "ProvisioningDS_UsrProject",
              "path": "UsrProject",
              "caption": "Project",
              "dataValueType": 10
            },
            {
              "id": "95910401-2801-57a0-ad54-cb498eedec57",
              "code": "ProvisioningDS_UsrSubmittedOn",
              "path": "UsrSubmittedOn",
              "caption": "Submitted",
              "dataValueType": 7
            },
            {
              "id": "ea108df6-4704-5831-867b-961169867108",
              "code": "ProvisioningDS_UsrStatus",
              "path": "UsrStatus",
              "caption": "Status",
              "dataValueType": 10
            }
          ],
          "sorting": "$ProvisioningSorting | crt.ToDataTableSortingConfig: 'ProvisioningRows'",
          "features": {"editable": {"enable": false, "itemsCreation": false}, "rows": {"selection": {"enable": false}}},
          "fitContent": true,
          "rowToolbarItems": [
            {
              "type": "crt.MenuItem",
              "caption": "Open",
              "icon": "edit-row-action",
              "clicked": {
                "request": "crt.OpenPageRequest",
                "params": {
                  "schemaName": "UsrMCITRequestDetail_Page",
                  "modelInitConfigs": [{"action": "edit", "recordId": "$ProvisioningRows.ProvisioningDS_Id"}]
                }
              }
            }
          ]
        },
        "parentName": "ProvisioningContent",
        "propertyName": "items",
        "index": 4
      }
    ]/**SCHEMA_VIEW_CONFIG_DIFF*/,
    // Permanent queue criteria are combined with the user's search and status selections.
    viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
      {
        "operation": "merge",
        "path": ["attributes"],
        "values": {
          "ProvisioningRows": {
            "isCollection": true,
            "modelConfig": {
              "path": "ProvisioningDS",
              "pagingConfig": {"rowCount": 30},
              "sortingConfig": {
                "attributeName": "ProvisioningSorting",
                "default": [{"columnName": "UsrSubmittedOn", "direction": "desc"}]
              },
              "filterAttributes": [
                {"name": "ProvisioningQueueFilter", "loadOnChange": true},
                {"name": "ProvisioningSearchFilter", "loadOnChange": true},
                {"name": "ProvisioningStatusFilter", "loadOnChange": true}
              ]
            },
            "viewModelConfig": {
              "attributes": {
                "ProvisioningDS_Id": {"modelConfig": {"path": "ProvisioningDS.Id"}},
                "ProvisioningDS_UsrNumber": {"modelConfig": {"path": "ProvisioningDS.UsrNumber"}},
                "ProvisioningDS_UsrName": {"modelConfig": {"path": "ProvisioningDS.UsrName"}},
                "ProvisioningDS_UsrAccount": {"modelConfig": {"path": "ProvisioningDS.UsrAccount"}},
                "ProvisioningDS_UsrProject": {"modelConfig": {"path": "ProvisioningDS.UsrProject"}},
                "ProvisioningDS_UsrSubmittedOn": {"modelConfig": {"path": "ProvisioningDS.UsrSubmittedOn"}},
                "ProvisioningDS_UsrStatus": {"modelConfig": {"path": "ProvisioningDS.UsrStatus"}}
              }
            }
          },
          "ProvisioningSorting": {},
          "ProvisioningQueueFilter": {
            "value": {
              "items": {
                "RequestType": {
                  "filterType": 1,
                  "comparisonType": 3,
                  "isEnabled": true,
                  "leftExpression": {"expressionType": 0, "columnPath": "UsrRequestType.Name"},
                  "rightExpression": {"expressionType": 2, "parameter": {"dataValueType": 1, "value": "New VM Provisioning"}},
                  "dataValueType": 1
                },
                "QueueStages": {
                  "items": {
                    "State0": {
                      "filterType": 1,
                      "comparisonType": 3,
                      "isEnabled": true,
                      "leftExpression": {"expressionType": 0, "columnPath": "UsrStatus.Name"},
                      "rightExpression": {"expressionType": 2, "parameter": {"dataValueType": 1, "value": "Provisioning in Progress"}},
                      "dataValueType": 1
                    },
                    "State1": {
                      "filterType": 1,
                      "comparisonType": 3,
                      "isEnabled": true,
                      "leftExpression": {"expressionType": 0, "columnPath": "UsrStatus.Name"},
                      "rightExpression": {"expressionType": 2, "parameter": {"dataValueType": 1, "value": "Completed"}},
                      "dataValueType": 1
                    }
                  },
                  "logicalOperation": 1,
                  "isEnabled": true,
                  "filterType": 6,
                  "rootSchemaName": "UsrVMRequest"
                }
              },
              "logicalOperation": 0,
              "isEnabled": true,
              "filterType": 6,
              "rootSchemaName": "UsrVMRequest"
            }
          },
          "ProvisioningSearchFilter": {
            "value": {
              "items": {},
              "logicalOperation": 0,
              "isEnabled": true,
              "filterType": 6,
              "rootSchemaName": "UsrVMRequest"
            }
          },
          "ProvisioningStatusFilter": {
            "value": {
              "items": {},
              "logicalOperation": 0,
              "isEnabled": true,
              "filterType": 6,
              "rootSchemaName": "UsrVMRequest"
            }
          },
          "ProvisioningStatus_Value": {"value": null}
        }
      }
    ]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
    // PDS supplies the inherited list template. ProvisioningDS supplies the visible queue grid.
    modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
      {
        "operation": "merge",
        "path": ["dataSources"],
        "values": {
          "PDS": {"type": "crt.EntityDataSource", "scope": "page", "config": {"entitySchemaName": "UsrVMRequest"}},
          "ProvisioningDS": {
            "type": "crt.EntityDataSource",
            "scope": "viewElement",
            "config": {
              "entitySchemaName": "UsrVMRequest",
              "attributes": {
                "Id": {"path": "Id"},
                "UsrNumber": {"path": "UsrNumber"},
                "UsrName": {"path": "UsrName"},
                "UsrAccount": {"path": "UsrAccount"},
                "UsrProject": {"path": "UsrProject"},
                "UsrSubmittedOn": {"path": "UsrSubmittedOn"},
                "UsrStatus": {"path": "UsrStatus"}
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
