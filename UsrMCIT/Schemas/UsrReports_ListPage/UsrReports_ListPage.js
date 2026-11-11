/*
 * REPORTS - NATIVE FREEDOM UI CONFIGURATION, not an embedded HTML application.
 * Target: NEW UsrReports_ListPage with parent ListPageV3Template.
 * Create the Reports section using EXISTING UsrVMRequest, then paste all of this file.
 * Every visible component is a built-in crt.* component editable in the Designer.
 * No custom JavaScript handlers, browser DOM manipulation, SDK model loops or DLL calls.
 *
 * DEFAULT SCOPE: CreatedBy = Current Contact on BOTH requests and VM records.
 * This conservative draft scope differs from authority sharing and the VM service scope.
 * Authorized administrators must configure the agreed record/authority permissions and
 * matching native filters before delivery. A creator filter never grants permissions.
 *
 * Counts/SUMs are native database aggregations. SUM uses ALL, not DISTINCT.
 * Contracts/projects use COUNT DISTINCT lookup values among matching requests.
 * Native Excel export replaces the prototype's empty CSV handler.
 * No available-balance, SLA, infrastructure action or success-rate calculation is faked.
 */
define("UsrReports_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function() {
  return {
    // 1. Native layout/widgets. These literals can be maintained in Freedom UI Designer.
    viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
      // Remove inherited native list UI; retain the Creatio shell.
      {"operation": "remove", "name": "MainHeader"},
      // Remove inherited native list UI; retain the Creatio shell.
      {"operation": "remove", "name": "MainContainer"},
      // Full-width native report page, replacing inherited list content.
      {"operation": "insert", "name": "ReportsRoot", "values": {"type": "crt.FlexContainer", "direction": "column", "items": [], "gap": "medium", "fitContent": true, "padding": {"top": "large", "right": "large", "bottom": "large", "left": "large"}, "color": "primary"}, "parentName": "Main", "propertyName": "items", "index": 0},
      // Title and standard refresh action.
      {"operation": "insert", "name": "ReportsHeading", "values": {"type": "crt.FlexContainer", "direction": "row", "items": [], "gap": "medium", "fitContent": true, "justifyContent": "space-between"}, "parentName": "ReportsRoot", "propertyName": "items", "index": 0},
      // Native editable text: Reports
      {"operation": "insert", "name": "ReportsTitle", "values": {"type": "crt.Label", "caption": "Reports", "labelType": "headline-2", "labelThickness": "default", "labelEllipsis": false, "labelColor": "auto", "labelTextAlign": "start", "headingLevel": "label"}, "parentName": "ReportsHeading", "propertyName": "items", "index": 0},
      // Native button action crt.LoadDataRequest; no custom event-handler code.
      {"operation": "insert", "name": "ReportsRefresh", "values": {"type": "crt.Button", "caption": "Refresh reports", "color": "outline", "size": "medium", "iconPosition": "left-icon", "clicked": {"request": "crt.LoadDataRequest", "params": {"config": {"loadType": "reload", "useLastLoadParameters": true}, "refreshDataConfig": {"mode": "RefreshAll"}}}, "icon": "reload-button-icon"}, "parentName": "ReportsHeading", "propertyName": "items", "index": 1},
      // Native editable text: Request activity, VM records and contract/project summaries. Default scope: records created by you.
      {"operation": "insert", "name": "ReportsSubtitle", "values": {"type": "crt.Label", "caption": "Request activity, VM records and contract/project summaries. Default scope: records created by you.", "labelType": "body-large", "labelThickness": "light", "labelEllipsis": false, "labelColor": "auto", "labelTextAlign": "start", "headingLevel": "label"}, "parentName": "ReportsRoot", "propertyName": "items", "index": 1},
      // Three native designer-editable tabs corresponding to the Figma report areas.
      {"operation": "insert", "name": "ReportTabs", "values": {"type": "crt.TabPanel", "items": []}, "parentName": "ReportsRoot", "propertyName": "items", "index": 2},
      // Native tab: Request Activity
      {"operation": "insert", "name": "ActivityTab", "values": {"type": "crt.TabContainer", "caption": "Request Activity", "items": [], "iconPosition": "only-text", "visible": true}, "parentName": "ReportTabs", "propertyName": "items", "index": 0},
      // Native tab: VM Inventory
      {"operation": "insert", "name": "InventoryTab", "values": {"type": "crt.TabContainer", "caption": "VM Inventory", "items": [], "iconPosition": "only-text", "visible": true}, "parentName": "ReportTabs", "propertyName": "items", "index": 1},
      // Native tab: Contracts & Projects
      {"operation": "insert", "name": "ContractsProjectsTab", "values": {"type": "crt.TabContainer", "caption": "Contracts & Projects", "items": [], "iconPosition": "only-text", "visible": true}, "parentName": "ReportTabs", "propertyName": "items", "index": 2},
      // ActivityBody
      {"operation": "insert", "name": "ActivityBody", "values": {"type": "crt.FlexContainer", "direction": "column", "items": [], "gap": "medium", "fitContent": true}, "parentName": "ActivityTab", "propertyName": "items", "index": 0},
      // ActivityMetrics
      {"operation": "insert", "name": "ActivityMetrics", "values": {"type": "crt.GridContainer", "columns": ["minmax(32px, 1fr)", "minmax(32px, 1fr)", "minmax(32px, 1fr)", "minmax(32px, 1fr)"], "rows": "minmax(max-content, 32px)", "gap": {"columnGap": "medium", "rowGap": "medium"}, "items": [], "fitContent": true}, "parentName": "ActivityBody", "propertyName": "items", "index": 0},
      // Native metric: Total requests. COUNT record IDs.
      {
        "operation": "insert",
        "name": "RequestsTotal",
        "values": {
          "type": "crt.IndicatorWidget",
          "layoutConfig": {"column": 1, "colSpan": 1, "row": 1, "rowSpan": 1},
          "config": {
            "title": "Total requests",
            "theme": "without-fill",
            "layout": {"color": "dark-blue"},
            "text": {"template": "{0}", "metricMacros": "{0}", "labelPosition": "above-under", "fontSizeMode": "medium"},
            "data": {
              "providing": {
                "attribute": "RequestsTotal_Data",
                "schemaName": "UsrVMRequest",
                "filters": {"filter": {"items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}, "filterAttributes": [{"attribute": "ActivityContractFilter_RequestsTotal_Data", "loadOnChange": true}, {"attribute": "ActivityProjectFilter_RequestsTotal_Data", "loadOnChange": true}]},
                "aggregation": {"column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 1, "functionArgument": {"expressionType": 0, "columnPath": "Id"}, "functionType": 2, "aggregationType": 1, "aggregationEvalType": 1}}},
                "dependencies": []
              },
              "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 0},
              "comparisonProviding": null
            },
            "comparison": null
          }
        },
        "parentName": "ActivityMetrics",
        "propertyName": "items",
        "index": 0
      },
      // Native metric: Completed. COUNT record IDs.
      {
        "operation": "insert",
        "name": "RequestsCompleted",
        "values": {
          "type": "crt.IndicatorWidget",
          "layoutConfig": {"column": 2, "colSpan": 1, "row": 1, "rowSpan": 1},
          "config": {
            "title": "Completed",
            "theme": "without-fill",
            "layout": {"color": "green"},
            "text": {"template": "{0}", "metricMacros": "{0}", "labelPosition": "above-under", "fontSizeMode": "medium"},
            "data": {
              "providing": {
                "attribute": "RequestsCompleted_Data",
                "schemaName": "UsrVMRequest",
                "filters": {
                  "filter": {
                    "items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}, "SelectedStatus": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "UsrStatus.Name"}, "rightExpression": {"expressionType": 2, "parameter": {"dataValueType": 1, "value": "Completed"}}, "dataValueType": 1}},
                    "logicalOperation": 0,
                    "isEnabled": true,
                    "filterType": 6,
                    "rootSchemaName": "UsrVMRequest"
                  },
                  "filterAttributes": [{"attribute": "ActivityContractFilter_RequestsCompleted_Data", "loadOnChange": true}, {"attribute": "ActivityProjectFilter_RequestsCompleted_Data", "loadOnChange": true}]
                },
                "aggregation": {"column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 1, "functionArgument": {"expressionType": 0, "columnPath": "Id"}, "functionType": 2, "aggregationType": 1, "aggregationEvalType": 1}}},
                "dependencies": []
              },
              "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 0},
              "comparisonProviding": null
            },
            "comparison": null
          }
        },
        "parentName": "ActivityMetrics",
        "propertyName": "items",
        "index": 1
      },
      // Native metric: Rejected. COUNT record IDs.
      {
        "operation": "insert",
        "name": "RequestsRejected",
        "values": {
          "type": "crt.IndicatorWidget",
          "layoutConfig": {"column": 3, "colSpan": 1, "row": 1, "rowSpan": 1},
          "config": {
            "title": "Rejected",
            "theme": "without-fill",
            "layout": {"color": "dark-blue"},
            "text": {"template": "{0}", "metricMacros": "{0}", "labelPosition": "above-under", "fontSizeMode": "medium"},
            "data": {
              "providing": {
                "attribute": "RequestsRejected_Data",
                "schemaName": "UsrVMRequest",
                "filters": {
                  "filter": {
                    "items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}, "SelectedStatus": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "UsrStatus.Name"}, "rightExpression": {"expressionType": 2, "parameter": {"dataValueType": 1, "value": "Rejected"}}, "dataValueType": 1}},
                    "logicalOperation": 0,
                    "isEnabled": true,
                    "filterType": 6,
                    "rootSchemaName": "UsrVMRequest"
                  },
                  "filterAttributes": [{"attribute": "ActivityContractFilter_RequestsRejected_Data", "loadOnChange": true}, {"attribute": "ActivityProjectFilter_RequestsRejected_Data", "loadOnChange": true}]
                },
                "aggregation": {"column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 1, "functionArgument": {"expressionType": 0, "columnPath": "Id"}, "functionType": 2, "aggregationType": 1, "aggregationEvalType": 1}}},
                "dependencies": []
              },
              "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 0},
              "comparisonProviding": null
            },
            "comparison": null
          }
        },
        "parentName": "ActivityMetrics",
        "propertyName": "items",
        "index": 2
      },
      // Native metric: Net estimated request points. SUM ALL quantities; equal values must not be deduplicated.
      {
        "operation": "insert",
        "name": "RequestsPoints",
        "values": {
          "type": "crt.IndicatorWidget",
          "layoutConfig": {"column": 4, "colSpan": 1, "row": 1, "rowSpan": 1},
          "config": {
            "title": "Net estimated request points",
            "theme": "without-fill",
            "layout": {"color": "dark-blue"},
            "text": {"template": "{0}", "metricMacros": "{0}", "labelPosition": "above-under", "fontSizeMode": "medium"},
            "data": {
              "providing": {
                "attribute": "RequestsPoints_Data",
                "schemaName": "UsrVMRequest",
                "filters": {"filter": {"items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}, "filterAttributes": [{"attribute": "ActivityContractFilter_RequestsPoints_Data", "loadOnChange": true}, {"attribute": "ActivityProjectFilter_RequestsPoints_Data", "loadOnChange": true}]},
                "aggregation": {"column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 1, "functionArgument": {"expressionType": 0, "columnPath": "UsrEstimatedPoints"}, "functionType": 2, "aggregationType": 2, "aggregationEvalType": 1}}},
                "dependencies": []
              },
              "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 2},
              "comparisonProviding": null
            },
            "comparison": null
          }
        },
        "parentName": "ActivityMetrics",
        "propertyName": "items",
        "index": 3
      },
      // ActivityFilterBar
      {"operation": "insert", "name": "ActivityFilterBar", "values": {"type": "crt.FlexContainer", "direction": "row", "items": [], "gap": "medium", "fitContent": true}, "parentName": "ActivityBody", "propertyName": "items", "index": 1},
      // Native chart grouping by UsrStatus. Up to 100 groups; change its setup in the designer.
      {
        "operation": "insert",
        "name": "RequestsByStatus",
        "values": {
          "type": "crt.ChartWidget",
          "config": {
            "title": "Requests by status",
            "theme": "without-fill",
            "color": "dark-blue",
            "scales": {"stacked": false, "xAxis": {"name": "", "formatting": {"type": "string", "maxLinesCount": 2, "maxLineLength": 22}}, "yAxis": {"name": "", "formatting": {"type": "number"}}},
            "series": [
              {
                "type": "bar",
                "label": "Records",
                "legend": {"enabled": false},
                "data": {
                  "providing": {
                    "attribute": "RequestsByStatus_Data",
                    "schemaName": "UsrVMRequest",
                    "filters": {"filter": {"items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}, "filterAttributes": [{"attribute": "ActivityContractFilter_RequestsByStatus_Data", "loadOnChange": true}, {"attribute": "ActivityProjectFilter_RequestsByStatus_Data", "loadOnChange": true}]},
                    "aggregation": {"column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 1, "functionArgument": {"expressionType": 0, "columnPath": "Id"}, "functionType": 2, "aggregationType": 1, "aggregationEvalType": 1}}},
                    "dependencies": [],
                    "rowCount": 100,
                    "grouping": {"type": "by-value", "column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 0, "columnPath": "UsrStatus"}}}
                  },
                  "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 0}
                },
                "dataLabel": {"display": true}
              }
            ],
            "seriesOrder": {"type": "by-aggregation-value", "direction": 2, "seriesIndex": 0},
            "layout": {}
          },
          "visible": true
        },
        "parentName": "ActivityBody",
        "propertyName": "items",
        "index": 2
      },
      // ActivityGridTools
      {"operation": "insert", "name": "ActivityGridTools", "values": {"type": "crt.FlexContainer", "direction": "row", "items": [], "gap": "medium", "fitContent": true, "justifyContent": "space-between"}, "parentName": "ActivityBody", "propertyName": "items", "index": 3},
      // Native editable text: Request details
      {"operation": "insert", "name": "ActivityGridTitle", "values": {"type": "crt.Label", "caption": "Request details", "labelType": "headline-2", "labelThickness": "default", "labelEllipsis": false, "labelColor": "auto", "labelTextAlign": "start", "headingLevel": "label"}, "parentName": "ActivityGridTools", "propertyName": "items", "index": 0},
      // Native button action crt.ExportDataGridToExcelRequest; no custom event-handler code.
      {"operation": "insert", "name": "ActivityExport", "values": {"type": "crt.Button", "caption": "Export requests to Excel", "color": "outline", "size": "medium", "iconPosition": "left-icon", "clicked": {"request": "crt.ExportDataGridToExcelRequest", "params": {"viewName": "RequestReportGrid", "filters": "$ReportRequestRows | crt.ToCollectionFilters : 'ReportRequestRows'"}}, "icon": "export-button-icon"}, "parentName": "ActivityGridTools", "propertyName": "items", "index": 1},
      // Native read-only grid, real entity-backed collection, paging and editable designer columns.
      {
        "operation": "insert",
        "name": "RequestReportGrid",
        "values": {
          "type": "crt.DataGrid",
          "items": "$ReportRequestRows",
          "primaryColumnName": "ReportRequestsDS_Id",
          "columns": [
            {"id": "bb90b939-02cc-5be3-bddb-cec9b8471fa5", "code": "ReportRequestsDS_UsrNumber", "path": "UsrNumber", "caption": "Request ID", "dataValueType": 1},
            {"id": "345b9c9a-3b64-5914-a5c8-a0cfcff2fed7", "code": "ReportRequestsDS_UsrName", "path": "UsrName", "caption": "Title", "dataValueType": 1},
            {"id": "6f762637-807b-5874-8bfa-2486e5b15f8e", "code": "ReportRequestsDS_UsrAccount", "path": "UsrAccount", "caption": "Authority", "dataValueType": 10},
            {"id": "9f36a895-85cd-5abd-8e5b-fd587cf7938b", "code": "ReportRequestsDS_UsrContract", "path": "UsrContract", "caption": "Contract", "dataValueType": 10},
            {"id": "11202f4c-d6d8-5ce2-9298-9bbb79b6f7ad", "code": "ReportRequestsDS_UsrProject", "path": "UsrProject", "caption": "Project", "dataValueType": 10},
            {"id": "67212d2f-b05a-5703-8ad1-aed266de08bd", "code": "ReportRequestsDS_UsrEstimatedPoints", "path": "UsrEstimatedPoints", "caption": "Net estimated points", "dataValueType": 5},
            {"id": "43f14cac-2f2a-58f1-842d-9a53d18dc803", "code": "ReportRequestsDS_UsrStatus", "path": "UsrStatus", "caption": "Status", "dataValueType": 10},
            {"id": "3549026d-dd9c-516b-a79c-a04c29ea1ffa", "code": "ReportRequestsDS_UsrSubmittedOn", "path": "UsrSubmittedOn", "caption": "Submitted", "dataValueType": 7},
            {"id": "c25afa81-3cd6-51d9-ada0-a0eb1a1bfbca", "code": "ReportRequestsDS_CreatedOn", "path": "CreatedOn", "caption": "Created on", "dataValueType": 7}
          ],
          "sorting": "$ReportRequestRows_Sorting | crt.ToDataTableSortingConfig: 'ReportRequestRows'",
          "features": {"editable": {"enable": false, "itemsCreation": false}, "rows": {"selection": {"enable": true, "multiple": true}}},
          "fitContent": true,
          "rowToolbarItems": []
        },
        "parentName": "ActivityBody",
        "propertyName": "items",
        "index": 4
      },
      // Native lookup filter; its connections are configured per widget/list, without JavaScript handlers.
      {
        "operation": "insert",
        "name": "ActivityContractFilter",
        "values": {
          "type": "crt.QuickFilter",
          "config": {"caption": "Contract", "icon": "filter-column-icon", "iconPosition": "left-icon", "entitySchemaName": "UsrMCITContract"},
          "filterType": "lookup",
          "_filterOptions": {
            "expose": [
              {"attribute": "ActivityContractFilter_RequestsTotal_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "RequestsTotal_Data", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "ActivityContractFilter_RequestsCompleted_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "RequestsCompleted_Data", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "ActivityContractFilter_RequestsRejected_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "RequestsRejected_Data", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "ActivityContractFilter_RequestsPoints_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "RequestsPoints_Data", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "ActivityContractFilter_RequestsByStatus_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "RequestsByStatus_Data", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "ActivityContractFilter_ReportRequestRows", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "ReportRequestRows", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]}
            ],
            "from": "ActivityContractFilter_Value"
          }
        },
        "parentName": "ActivityFilterBar",
        "propertyName": "items",
        "index": 0
      },
      // Native lookup filter; its connections are configured per widget/list, without JavaScript handlers.
      {
        "operation": "insert",
        "name": "ActivityProjectFilter",
        "values": {
          "type": "crt.QuickFilter",
          "config": {"caption": "Project", "icon": "filter-column-icon", "iconPosition": "left-icon", "entitySchemaName": "UsrProject"},
          "filterType": "lookup",
          "_filterOptions": {
            "expose": [
              {"attribute": "ActivityProjectFilter_RequestsTotal_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "RequestsTotal_Data", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "ActivityProjectFilter_RequestsCompleted_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "RequestsCompleted_Data", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "ActivityProjectFilter_RequestsRejected_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "RequestsRejected_Data", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "ActivityProjectFilter_RequestsPoints_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "RequestsPoints_Data", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "ActivityProjectFilter_RequestsByStatus_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "RequestsByStatus_Data", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "ActivityProjectFilter_ReportRequestRows", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "ReportRequestRows", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]}
            ],
            "from": "ActivityProjectFilter_Value"
          }
        },
        "parentName": "ActivityFilterBar",
        "propertyName": "items",
        "index": 1
      },
      // Native editable text: Estimated request points are signed estimates, not actual consumption. Counts and exports use the same scope and selected filters.
      {"operation": "insert", "name": "ActivityMeaning", "values": {"type": "crt.Label", "caption": "Estimated request points are signed estimates, not actual consumption. Counts and exports use the same scope and selected filters.", "labelType": "body-large", "labelThickness": "light", "labelEllipsis": false, "labelColor": "auto", "labelTextAlign": "start", "headingLevel": "label"}, "parentName": "ActivityBody", "propertyName": "items", "index": 5},
      // InventoryBody
      {"operation": "insert", "name": "InventoryBody", "values": {"type": "crt.FlexContainer", "direction": "column", "items": [], "gap": "medium", "fitContent": true}, "parentName": "InventoryTab", "propertyName": "items", "index": 0},
      // InventoryMetrics
      {"operation": "insert", "name": "InventoryMetrics", "values": {"type": "crt.GridContainer", "columns": ["minmax(32px, 1fr)", "minmax(32px, 1fr)", "minmax(32px, 1fr)", "minmax(32px, 1fr)"], "rows": "minmax(max-content, 32px)", "gap": {"columnGap": "medium", "rowGap": "medium"}, "items": [], "fitContent": true}, "parentName": "InventoryBody", "propertyName": "items", "index": 0},
      // Native metric: VM records. COUNT record IDs.
      {
        "operation": "insert",
        "name": "VmTotal",
        "values": {
          "type": "crt.IndicatorWidget",
          "layoutConfig": {"column": 1, "colSpan": 1, "row": 1, "rowSpan": 1},
          "config": {
            "title": "VM records",
            "theme": "without-fill",
            "layout": {"color": "dark-blue"},
            "text": {"template": "{0}", "metricMacros": "{0}", "labelPosition": "above-under", "fontSizeMode": "medium"},
            "data": {
              "providing": {
                "attribute": "VmTotal_Data",
                "schemaName": "UsrVirtualMachine",
                "filters": {"filter": {"items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}, "filterAttributes": [{"attribute": "InventoryContractFilter_VmTotal_Data", "loadOnChange": true}, {"attribute": "InventoryProjectFilter_VmTotal_Data", "loadOnChange": true}]},
                "aggregation": {"column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 1, "functionArgument": {"expressionType": 0, "columnPath": "Id"}, "functionType": 2, "aggregationType": 1, "aggregationEvalType": 1}}},
                "dependencies": []
              },
              "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 0},
              "comparisonProviding": null
            },
            "comparison": null
          }
        },
        "parentName": "InventoryMetrics",
        "propertyName": "items",
        "index": 0
      },
      // Native metric: Recorded vCPU. SUM ALL quantities; equal values must not be deduplicated.
      {
        "operation": "insert",
        "name": "VmCpu",
        "values": {
          "type": "crt.IndicatorWidget",
          "layoutConfig": {"column": 2, "colSpan": 1, "row": 1, "rowSpan": 1},
          "config": {
            "title": "Recorded vCPU",
            "theme": "without-fill",
            "layout": {"color": "dark-blue"},
            "text": {"template": "{0}", "metricMacros": "{0}", "labelPosition": "above-under", "fontSizeMode": "medium"},
            "data": {
              "providing": {
                "attribute": "VmCpu_Data",
                "schemaName": "UsrVirtualMachine",
                "filters": {"filter": {"items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}, "filterAttributes": [{"attribute": "InventoryContractFilter_VmCpu_Data", "loadOnChange": true}, {"attribute": "InventoryProjectFilter_VmCpu_Data", "loadOnChange": true}]},
                "aggregation": {"column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 1, "functionArgument": {"expressionType": 0, "columnPath": "UsrCPU"}, "functionType": 2, "aggregationType": 2, "aggregationEvalType": 1}}},
                "dependencies": []
              },
              "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 0},
              "comparisonProviding": null
            },
            "comparison": null
          }
        },
        "parentName": "InventoryMetrics",
        "propertyName": "items",
        "index": 1
      },
      // Native metric: Recorded RAM (GB). SUM ALL quantities; equal values must not be deduplicated.
      {
        "operation": "insert",
        "name": "VmRam",
        "values": {
          "type": "crt.IndicatorWidget",
          "layoutConfig": {"column": 3, "colSpan": 1, "row": 1, "rowSpan": 1},
          "config": {
            "title": "Recorded RAM (GB)",
            "theme": "without-fill",
            "layout": {"color": "dark-blue"},
            "text": {"template": "{0}", "metricMacros": "{0}", "labelPosition": "above-under", "fontSizeMode": "medium"},
            "data": {
              "providing": {
                "attribute": "VmRam_Data",
                "schemaName": "UsrVirtualMachine",
                "filters": {"filter": {"items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}, "filterAttributes": [{"attribute": "InventoryContractFilter_VmRam_Data", "loadOnChange": true}, {"attribute": "InventoryProjectFilter_VmRam_Data", "loadOnChange": true}]},
                "aggregation": {"column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 1, "functionArgument": {"expressionType": 0, "columnPath": "UsrRAMGB"}, "functionType": 2, "aggregationType": 2, "aggregationEvalType": 1}}},
                "dependencies": []
              },
              "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 0},
              "comparisonProviding": null
            },
            "comparison": null
          }
        },
        "parentName": "InventoryMetrics",
        "propertyName": "items",
        "index": 2
      },
      // Native metric: Recorded storage (GB). SUM ALL quantities; equal values must not be deduplicated.
      {
        "operation": "insert",
        "name": "VmStorage",
        "values": {
          "type": "crt.IndicatorWidget",
          "layoutConfig": {"column": 4, "colSpan": 1, "row": 1, "rowSpan": 1},
          "config": {
            "title": "Recorded storage (GB)",
            "theme": "without-fill",
            "layout": {"color": "dark-blue"},
            "text": {"template": "{0}", "metricMacros": "{0}", "labelPosition": "above-under", "fontSizeMode": "medium"},
            "data": {
              "providing": {
                "attribute": "VmStorage_Data",
                "schemaName": "UsrVirtualMachine",
                "filters": {"filter": {"items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}, "filterAttributes": [{"attribute": "InventoryContractFilter_VmStorage_Data", "loadOnChange": true}, {"attribute": "InventoryProjectFilter_VmStorage_Data", "loadOnChange": true}]},
                "aggregation": {"column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 1, "functionArgument": {"expressionType": 0, "columnPath": "UsrStorageGB"}, "functionType": 2, "aggregationType": 2, "aggregationEvalType": 1}}},
                "dependencies": []
              },
              "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 0},
              "comparisonProviding": null
            },
            "comparison": null
          }
        },
        "parentName": "InventoryMetrics",
        "propertyName": "items",
        "index": 3
      },
      // InventoryFilterBar
      {"operation": "insert", "name": "InventoryFilterBar", "values": {"type": "crt.FlexContainer", "direction": "row", "items": [], "gap": "medium", "fitContent": true}, "parentName": "InventoryBody", "propertyName": "items", "index": 1},
      // Native chart grouping by UsrContract. Up to 100 groups; change its setup in the designer.
      {
        "operation": "insert",
        "name": "VmsByContract",
        "values": {
          "type": "crt.ChartWidget",
          "config": {
            "title": "VM records by contract",
            "theme": "without-fill",
            "color": "dark-blue",
            "scales": {"stacked": false, "xAxis": {"name": "", "formatting": {"type": "string", "maxLinesCount": 2, "maxLineLength": 22}}, "yAxis": {"name": "", "formatting": {"type": "number"}}},
            "series": [
              {
                "type": "bar",
                "label": "Records",
                "legend": {"enabled": false},
                "data": {
                  "providing": {
                    "attribute": "VmsByContract_Data",
                    "schemaName": "UsrVirtualMachine",
                    "filters": {"filter": {"items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}, "filterAttributes": [{"attribute": "InventoryContractFilter_VmsByContract_Data", "loadOnChange": true}, {"attribute": "InventoryProjectFilter_VmsByContract_Data", "loadOnChange": true}]},
                    "aggregation": {"column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 1, "functionArgument": {"expressionType": 0, "columnPath": "Id"}, "functionType": 2, "aggregationType": 1, "aggregationEvalType": 1}}},
                    "dependencies": [],
                    "rowCount": 100,
                    "grouping": {"type": "by-value", "column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 0, "columnPath": "UsrContract"}}}
                  },
                  "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 0}
                },
                "dataLabel": {"display": true}
              }
            ],
            "seriesOrder": {"type": "by-aggregation-value", "direction": 2, "seriesIndex": 0},
            "layout": {}
          },
          "visible": true
        },
        "parentName": "InventoryBody",
        "propertyName": "items",
        "index": 2
      },
      // InventoryGridTools
      {"operation": "insert", "name": "InventoryGridTools", "values": {"type": "crt.FlexContainer", "direction": "row", "items": [], "gap": "medium", "fitContent": true, "justifyContent": "space-between"}, "parentName": "InventoryBody", "propertyName": "items", "index": 3},
      // Native editable text: VM details
      {"operation": "insert", "name": "InventoryGridTitle", "values": {"type": "crt.Label", "caption": "VM details", "labelType": "headline-2", "labelThickness": "default", "labelEllipsis": false, "labelColor": "auto", "labelTextAlign": "start", "headingLevel": "label"}, "parentName": "InventoryGridTools", "propertyName": "items", "index": 0},
      // Native button action crt.ExportDataGridToExcelRequest; no custom event-handler code.
      {"operation": "insert", "name": "InventoryExport", "values": {"type": "crt.Button", "caption": "Export VMs to Excel", "color": "outline", "size": "medium", "iconPosition": "left-icon", "clicked": {"request": "crt.ExportDataGridToExcelRequest", "params": {"viewName": "VmReportGrid", "filters": "$ReportVmRows | crt.ToCollectionFilters : 'ReportVmRows'"}}, "icon": "export-button-icon"}, "parentName": "InventoryGridTools", "propertyName": "items", "index": 1},
      // Native read-only grid, real entity-backed collection, paging and editable designer columns.
      {
        "operation": "insert",
        "name": "VmReportGrid",
        "values": {
          "type": "crt.DataGrid",
          "items": "$ReportVmRows",
          "primaryColumnName": "ReportVmsDS_Id",
          "columns": [
            {"id": "01d4f1d7-08b8-5309-852d-0050e84d858c", "code": "ReportVmsDS_UsrVMCode", "path": "UsrVMCode", "caption": "VM ID", "dataValueType": 1},
            {"id": "a2c561ce-0dbe-5854-81bf-7f54c8c4186d", "code": "ReportVmsDS_UsrName", "path": "UsrName", "caption": "VM name", "dataValueType": 1},
            {"id": "dba90ce8-7b8a-569b-bf3b-d8d0b0ebc09d", "code": "ReportVmsDS_UsrContract", "path": "UsrContract", "caption": "Contract", "dataValueType": 10},
            {"id": "22a4ceff-35c3-51a8-b4fc-f3e6a3aa0e8e", "code": "ReportVmsDS_UsrProject", "path": "UsrProject", "caption": "Project", "dataValueType": 10},
            {"id": "230e6204-c417-5df2-adca-e12b5c00e709", "code": "ReportVmsDS_UsrVIP", "path": "UsrVIP", "caption": "Virtual IP", "dataValueType": 1},
            {"id": "58023e51-9f08-58b2-9f80-a27f3483065e", "code": "ReportVmsDS_UsrEnvironment", "path": "UsrEnvironment", "caption": "Environment", "dataValueType": 1},
            {"id": "4788aa63-971d-54dd-a919-339c567291f6", "code": "ReportVmsDS_UsrZone", "path": "UsrZone", "caption": "Zone", "dataValueType": 1},
            {"id": "28ea2a53-2364-52db-9847-78e9dba611f1", "code": "ReportVmsDS_UsrCPU", "path": "UsrCPU", "caption": "Recorded vCPU", "dataValueType": 4},
            {"id": "7cbb475c-74d7-5dd7-a2fa-dec65c17993c", "code": "ReportVmsDS_UsrRAMGB", "path": "UsrRAMGB", "caption": "Recorded RAM (GB)", "dataValueType": 4},
            {"id": "fa8ac2c5-1245-50e2-ba41-5eeb78d1fc29", "code": "ReportVmsDS_UsrStorageGB", "path": "UsrStorageGB", "caption": "Recorded storage (GB)", "dataValueType": 4},
            {"id": "94c30f03-87af-5e38-b47d-61ccec165edd", "code": "ReportVmsDS_UsrStatus", "path": "UsrStatus", "caption": "Status", "dataValueType": 10},
            {"id": "bfa9f004-8b9c-5563-ad93-87d257151d2f", "code": "ReportVmsDS_UsrProvisionedOn", "path": "UsrProvisionedOn", "caption": "Provisioned on", "dataValueType": 7},
            {"id": "bb72ec66-e426-5c91-9c74-505ab19599fe", "code": "ReportVmsDS_CreatedOn", "path": "CreatedOn", "caption": "Created on", "dataValueType": 7}
          ],
          "sorting": "$ReportVmRows_Sorting | crt.ToDataTableSortingConfig: 'ReportVmRows'",
          "features": {"editable": {"enable": false, "itemsCreation": false}, "rows": {"selection": {"enable": true, "multiple": true}}},
          "fitContent": true,
          "rowToolbarItems": []
        },
        "parentName": "InventoryBody",
        "propertyName": "items",
        "index": 4
      },
      // Native lookup filter; its connections are configured per widget/list, without JavaScript handlers.
      {
        "operation": "insert",
        "name": "InventoryContractFilter",
        "values": {
          "type": "crt.QuickFilter",
          "config": {"caption": "Contract", "icon": "filter-column-icon", "iconPosition": "left-icon", "entitySchemaName": "UsrMCITContract"},
          "filterType": "lookup",
          "_filterOptions": {
            "expose": [
              {"attribute": "InventoryContractFilter_VmTotal_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "VmTotal_Data", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "InventoryContractFilter_VmCpu_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "VmCpu_Data", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "InventoryContractFilter_VmRam_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "VmRam_Data", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "InventoryContractFilter_VmStorage_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "VmStorage_Data", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "InventoryContractFilter_VmsByContract_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "VmsByContract_Data", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "InventoryContractFilter_ReportVmRows", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "ReportVmRows", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]}
            ],
            "from": "InventoryContractFilter_Value"
          }
        },
        "parentName": "InventoryFilterBar",
        "propertyName": "items",
        "index": 0
      },
      // Native lookup filter; its connections are configured per widget/list, without JavaScript handlers.
      {
        "operation": "insert",
        "name": "InventoryProjectFilter",
        "values": {
          "type": "crt.QuickFilter",
          "config": {"caption": "Project", "icon": "filter-column-icon", "iconPosition": "left-icon", "entitySchemaName": "UsrProject"},
          "filterType": "lookup",
          "_filterOptions": {
            "expose": [
              {"attribute": "InventoryProjectFilter_VmTotal_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "VmTotal_Data", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "InventoryProjectFilter_VmCpu_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "VmCpu_Data", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "InventoryProjectFilter_VmRam_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "VmRam_Data", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "InventoryProjectFilter_VmStorage_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "VmStorage_Data", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "InventoryProjectFilter_VmsByContract_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "VmsByContract_Data", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "InventoryProjectFilter_ReportVmRows", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "ReportVmRows", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]}
            ],
            "from": "InventoryProjectFilter_Value"
          }
        },
        "parentName": "InventoryFilterBar",
        "propertyName": "items",
        "index": 1
      },
      // Native editable text: Totals reflect stored specifications, including terminated VM records. They do not represent current infrastructure consumption.
      {"operation": "insert", "name": "InventoryMeaning", "values": {"type": "crt.Label", "caption": "Totals reflect stored specifications, including terminated VM records. They do not represent current infrastructure consumption.", "labelType": "body-large", "labelThickness": "light", "labelEllipsis": false, "labelColor": "auto", "labelTextAlign": "start", "headingLevel": "label"}, "parentName": "InventoryBody", "propertyName": "items", "index": 5},
      // SummaryBody
      {"operation": "insert", "name": "SummaryBody", "values": {"type": "crt.FlexContainer", "direction": "column", "items": [], "gap": "medium", "fitContent": true}, "parentName": "ContractsProjectsTab", "propertyName": "items", "index": 0},
      // SummaryMetrics
      {"operation": "insert", "name": "SummaryMetrics", "values": {"type": "crt.GridContainer", "columns": ["minmax(32px, 1fr)", "minmax(32px, 1fr)", "minmax(32px, 1fr)", "minmax(32px, 1fr)"], "rows": "minmax(max-content, 32px)", "gap": {"columnGap": "medium", "rowGap": "medium"}, "items": [], "fitContent": true}, "parentName": "SummaryBody", "propertyName": "items", "index": 0},
      // Native metric: Contracts in requests. COUNT DISTINCT lookup values.
      {
        "operation": "insert",
        "name": "SummaryContracts",
        "values": {
          "type": "crt.IndicatorWidget",
          "layoutConfig": {"column": 1, "colSpan": 1, "row": 1, "rowSpan": 1},
          "config": {
            "title": "Contracts in requests",
            "theme": "without-fill",
            "layout": {"color": "dark-blue"},
            "text": {"template": "{0}", "metricMacros": "{0}", "labelPosition": "above-under", "fontSizeMode": "medium"},
            "data": {
              "providing": {
                "attribute": "SummaryContracts_Data",
                "schemaName": "UsrVMRequest",
                "filters": {"filter": {"items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}, "filterAttributes": [{"attribute": "SummaryContractFilter_SummaryContracts_Data", "loadOnChange": true}, {"attribute": "SummaryProjectFilter_SummaryContracts_Data", "loadOnChange": true}]},
                "aggregation": {"column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 1, "functionArgument": {"expressionType": 0, "columnPath": "UsrContract"}, "functionType": 2, "aggregationType": 1, "aggregationEvalType": 2}}},
                "dependencies": []
              },
              "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 0},
              "comparisonProviding": null
            },
            "comparison": null
          }
        },
        "parentName": "SummaryMetrics",
        "propertyName": "items",
        "index": 0
      },
      // Native metric: Projects in requests. COUNT DISTINCT lookup values.
      {
        "operation": "insert",
        "name": "SummaryProjects",
        "values": {
          "type": "crt.IndicatorWidget",
          "layoutConfig": {"column": 2, "colSpan": 1, "row": 1, "rowSpan": 1},
          "config": {
            "title": "Projects in requests",
            "theme": "without-fill",
            "layout": {"color": "dark-blue"},
            "text": {"template": "{0}", "metricMacros": "{0}", "labelPosition": "above-under", "fontSizeMode": "medium"},
            "data": {
              "providing": {
                "attribute": "SummaryProjects_Data",
                "schemaName": "UsrVMRequest",
                "filters": {"filter": {"items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}, "filterAttributes": [{"attribute": "SummaryContractFilter_SummaryProjects_Data", "loadOnChange": true}, {"attribute": "SummaryProjectFilter_SummaryProjects_Data", "loadOnChange": true}]},
                "aggregation": {"column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 1, "functionArgument": {"expressionType": 0, "columnPath": "UsrProject"}, "functionType": 2, "aggregationType": 1, "aggregationEvalType": 2}}},
                "dependencies": []
              },
              "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 0},
              "comparisonProviding": null
            },
            "comparison": null
          }
        },
        "parentName": "SummaryMetrics",
        "propertyName": "items",
        "index": 1
      },
      // Native metric: Requests. COUNT record IDs.
      {
        "operation": "insert",
        "name": "SummaryRequests",
        "values": {
          "type": "crt.IndicatorWidget",
          "layoutConfig": {"column": 3, "colSpan": 1, "row": 1, "rowSpan": 1},
          "config": {
            "title": "Requests",
            "theme": "without-fill",
            "layout": {"color": "dark-blue"},
            "text": {"template": "{0}", "metricMacros": "{0}", "labelPosition": "above-under", "fontSizeMode": "medium"},
            "data": {
              "providing": {
                "attribute": "SummaryRequests_Data",
                "schemaName": "UsrVMRequest",
                "filters": {"filter": {"items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}, "filterAttributes": [{"attribute": "SummaryContractFilter_SummaryRequests_Data", "loadOnChange": true}, {"attribute": "SummaryProjectFilter_SummaryRequests_Data", "loadOnChange": true}]},
                "aggregation": {"column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 1, "functionArgument": {"expressionType": 0, "columnPath": "Id"}, "functionType": 2, "aggregationType": 1, "aggregationEvalType": 1}}},
                "dependencies": []
              },
              "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 0},
              "comparisonProviding": null
            },
            "comparison": null
          }
        },
        "parentName": "SummaryMetrics",
        "propertyName": "items",
        "index": 2
      },
      // Native metric: Active VM records. COUNT record IDs.
      {
        "operation": "insert",
        "name": "SummaryActiveVms",
        "values": {
          "type": "crt.IndicatorWidget",
          "layoutConfig": {"column": 4, "colSpan": 1, "row": 1, "rowSpan": 1},
          "config": {
            "title": "Active VM records",
            "theme": "without-fill",
            "layout": {"color": "green"},
            "text": {"template": "{0}", "metricMacros": "{0}", "labelPosition": "above-under", "fontSizeMode": "medium"},
            "data": {
              "providing": {
                "attribute": "SummaryActiveVms_Data",
                "schemaName": "UsrVirtualMachine",
                "filters": {
                  "filter": {
                    "items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}, "SelectedStatus": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "UsrStatus.Name"}, "rightExpression": {"expressionType": 2, "parameter": {"dataValueType": 1, "value": "Active"}}, "dataValueType": 1}},
                    "logicalOperation": 0,
                    "isEnabled": true,
                    "filterType": 6,
                    "rootSchemaName": "UsrVirtualMachine"
                  },
                  "filterAttributes": [{"attribute": "SummaryContractFilter_SummaryActiveVms_Data", "loadOnChange": true}, {"attribute": "SummaryProjectFilter_SummaryActiveVms_Data", "loadOnChange": true}]
                },
                "aggregation": {"column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 1, "functionArgument": {"expressionType": 0, "columnPath": "Id"}, "functionType": 2, "aggregationType": 1, "aggregationEvalType": 1}}},
                "dependencies": []
              },
              "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 0},
              "comparisonProviding": null
            },
            "comparison": null
          }
        },
        "parentName": "SummaryMetrics",
        "propertyName": "items",
        "index": 3
      },
      // SummaryFilterBar
      {"operation": "insert", "name": "SummaryFilterBar", "values": {"type": "crt.FlexContainer", "direction": "row", "items": [], "gap": "medium", "fitContent": true}, "parentName": "SummaryBody", "propertyName": "items", "index": 1},
      // SummaryCharts
      {"operation": "insert", "name": "SummaryCharts", "values": {"type": "crt.GridContainer", "columns": ["minmax(32px, 1fr)", "minmax(32px, 1fr)"], "rows": "minmax(max-content, 32px)", "gap": {"columnGap": "medium", "rowGap": "medium"}, "items": [], "fitContent": true}, "parentName": "SummaryBody", "propertyName": "items", "index": 2},
      // Native chart grouping by UsrContract. Up to 100 groups; change its setup in the designer.
      {
        "operation": "insert",
        "name": "SummaryRequestsByContract",
        "values": {
          "type": "crt.ChartWidget",
          "config": {
            "title": "Requests by contract",
            "theme": "without-fill",
            "color": "dark-blue",
            "scales": {"stacked": false, "xAxis": {"name": "", "formatting": {"type": "string", "maxLinesCount": 2, "maxLineLength": 22}}, "yAxis": {"name": "", "formatting": {"type": "number"}}},
            "series": [
              {
                "type": "bar",
                "label": "Records",
                "legend": {"enabled": false},
                "data": {
                  "providing": {
                    "attribute": "SummaryRequestsByContract_Data",
                    "schemaName": "UsrVMRequest",
                    "filters": {"filter": {"items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}, "filterAttributes": [{"attribute": "SummaryContractFilter_SummaryRequestsByContract_Data", "loadOnChange": true}, {"attribute": "SummaryProjectFilter_SummaryRequestsByContract_Data", "loadOnChange": true}]},
                    "aggregation": {"column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 1, "functionArgument": {"expressionType": 0, "columnPath": "Id"}, "functionType": 2, "aggregationType": 1, "aggregationEvalType": 1}}},
                    "dependencies": [],
                    "rowCount": 100,
                    "grouping": {"type": "by-value", "column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 0, "columnPath": "UsrContract"}}}
                  },
                  "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 0}
                },
                "dataLabel": {"display": true}
              }
            ],
            "seriesOrder": {"type": "by-aggregation-value", "direction": 2, "seriesIndex": 0},
            "layout": {}
          },
          "visible": true,
          "layoutConfig": {"column": 1, "colSpan": 1, "row": 1, "rowSpan": 1}
        },
        "parentName": "SummaryCharts",
        "propertyName": "items",
        "index": 0
      },
      // Native chart grouping by UsrProject. Up to 100 groups; change its setup in the designer.
      {
        "operation": "insert",
        "name": "SummaryRequestsByProject",
        "values": {
          "type": "crt.ChartWidget",
          "config": {
            "title": "Requests by project",
            "theme": "without-fill",
            "color": "dark-blue",
            "scales": {"stacked": false, "xAxis": {"name": "", "formatting": {"type": "string", "maxLinesCount": 2, "maxLineLength": 22}}, "yAxis": {"name": "", "formatting": {"type": "number"}}},
            "series": [
              {
                "type": "bar",
                "label": "Records",
                "legend": {"enabled": false},
                "data": {
                  "providing": {
                    "attribute": "SummaryRequestsByProject_Data",
                    "schemaName": "UsrVMRequest",
                    "filters": {"filter": {"items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}, "filterAttributes": [{"attribute": "SummaryContractFilter_SummaryRequestsByProject_Data", "loadOnChange": true}, {"attribute": "SummaryProjectFilter_SummaryRequestsByProject_Data", "loadOnChange": true}]},
                    "aggregation": {"column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 1, "functionArgument": {"expressionType": 0, "columnPath": "Id"}, "functionType": 2, "aggregationType": 1, "aggregationEvalType": 1}}},
                    "dependencies": [],
                    "rowCount": 100,
                    "grouping": {"type": "by-value", "column": {"orderDirection": 0, "orderPosition": -1, "isVisible": true, "expression": {"expressionType": 0, "columnPath": "UsrProject"}}}
                  },
                  "formatting": {"type": "number", "decimalSeparator": ".", "thousandSeparator": ",", "decimalPrecision": 0}
                },
                "dataLabel": {"display": true}
              }
            ],
            "seriesOrder": {"type": "by-aggregation-value", "direction": 2, "seriesIndex": 0},
            "layout": {}
          },
          "visible": true,
          "layoutConfig": {"column": 2, "colSpan": 1, "row": 1, "rowSpan": 1}
        },
        "parentName": "SummaryCharts",
        "propertyName": "items",
        "index": 1
      },
      // SummaryRequestTools
      {"operation": "insert", "name": "SummaryRequestTools", "values": {"type": "crt.FlexContainer", "direction": "row", "items": [], "gap": "medium", "fitContent": true, "justifyContent": "space-between"}, "parentName": "SummaryBody", "propertyName": "items", "index": 3},
      // Native editable text: Requests by contract and project
      {"operation": "insert", "name": "SummaryRequestTitle", "values": {"type": "crt.Label", "caption": "Requests by contract and project", "labelType": "headline-2", "labelThickness": "default", "labelEllipsis": false, "labelColor": "auto", "labelTextAlign": "start", "headingLevel": "label"}, "parentName": "SummaryRequestTools", "propertyName": "items", "index": 0},
      // Native button action crt.ExportDataGridToExcelRequest; no custom event-handler code.
      {"operation": "insert", "name": "SummaryRequestsExport", "values": {"type": "crt.Button", "caption": "Export request details to Excel", "color": "outline", "size": "medium", "iconPosition": "left-icon", "clicked": {"request": "crt.ExportDataGridToExcelRequest", "params": {"viewName": "SummaryRequestGrid", "filters": "$SummaryRequestRows | crt.ToCollectionFilters : 'SummaryRequestRows'"}}, "icon": "export-button-icon"}, "parentName": "SummaryRequestTools", "propertyName": "items", "index": 1},
      // Native read-only grid, real entity-backed collection, paging and editable designer columns.
      {
        "operation": "insert",
        "name": "SummaryRequestGrid",
        "values": {
          "type": "crt.DataGrid",
          "items": "$SummaryRequestRows",
          "primaryColumnName": "SummaryRequestsDS_Id",
          "columns": [
            {"id": "4eb5d270-c6be-5313-9c8b-029b26a72fea", "code": "SummaryRequestsDS_UsrNumber", "path": "UsrNumber", "caption": "Request ID", "dataValueType": 1},
            {"id": "58e639db-2604-5880-a0c1-538316153744", "code": "SummaryRequestsDS_UsrName", "path": "UsrName", "caption": "Title", "dataValueType": 1},
            {"id": "7f432790-3416-5ead-8d33-1d092c77b52b", "code": "SummaryRequestsDS_UsrAccount", "path": "UsrAccount", "caption": "Authority", "dataValueType": 10},
            {"id": "0fa97e64-c151-5ff5-b979-8c22d292eca7", "code": "SummaryRequestsDS_UsrContract", "path": "UsrContract", "caption": "Contract", "dataValueType": 10},
            {"id": "40746f9f-3f0b-58bc-8491-0394042b0acf", "code": "SummaryRequestsDS_UsrProject", "path": "UsrProject", "caption": "Project", "dataValueType": 10},
            {"id": "f03fc3db-8d65-56d9-a93c-623ac55368aa", "code": "SummaryRequestsDS_UsrEstimatedPoints", "path": "UsrEstimatedPoints", "caption": "Net estimated points", "dataValueType": 5},
            {"id": "d7a9c59d-3169-5ea7-877c-c0aa9a35b39c", "code": "SummaryRequestsDS_UsrStatus", "path": "UsrStatus", "caption": "Status", "dataValueType": 10},
            {"id": "04b7df46-53b3-5b86-959d-72ff9c8ea0c8", "code": "SummaryRequestsDS_UsrSubmittedOn", "path": "UsrSubmittedOn", "caption": "Submitted", "dataValueType": 7},
            {"id": "7bdd8ead-f054-556b-bbfb-02173ea9ee9e", "code": "SummaryRequestsDS_CreatedOn", "path": "CreatedOn", "caption": "Created on", "dataValueType": 7}
          ],
          "sorting": "$SummaryRequestRows_Sorting | crt.ToDataTableSortingConfig: 'SummaryRequestRows'",
          "features": {"editable": {"enable": false, "itemsCreation": false}, "rows": {"selection": {"enable": true, "multiple": true}}},
          "fitContent": true,
          "rowToolbarItems": []
        },
        "parentName": "SummaryBody",
        "propertyName": "items",
        "index": 4
      },
      // SummaryVmTools
      {"operation": "insert", "name": "SummaryVmTools", "values": {"type": "crt.FlexContainer", "direction": "row", "items": [], "gap": "medium", "fitContent": true, "justifyContent": "space-between"}, "parentName": "SummaryBody", "propertyName": "items", "index": 5},
      // Native editable text: VMs by contract and project
      {"operation": "insert", "name": "SummaryVmTitle", "values": {"type": "crt.Label", "caption": "VMs by contract and project", "labelType": "headline-2", "labelThickness": "default", "labelEllipsis": false, "labelColor": "auto", "labelTextAlign": "start", "headingLevel": "label"}, "parentName": "SummaryVmTools", "propertyName": "items", "index": 0},
      // Native button action crt.ExportDataGridToExcelRequest; no custom event-handler code.
      {"operation": "insert", "name": "SummaryVmsExport", "values": {"type": "crt.Button", "caption": "Export VM details to Excel", "color": "outline", "size": "medium", "iconPosition": "left-icon", "clicked": {"request": "crt.ExportDataGridToExcelRequest", "params": {"viewName": "SummaryVmGrid", "filters": "$SummaryVmRows | crt.ToCollectionFilters : 'SummaryVmRows'"}}, "icon": "export-button-icon"}, "parentName": "SummaryVmTools", "propertyName": "items", "index": 1},
      // Native read-only grid, real entity-backed collection, paging and editable designer columns.
      {
        "operation": "insert",
        "name": "SummaryVmGrid",
        "values": {
          "type": "crt.DataGrid",
          "items": "$SummaryVmRows",
          "primaryColumnName": "SummaryVmsDS_Id",
          "columns": [
            {"id": "2260cf78-f5a1-532e-9415-5a212ffd3c61", "code": "SummaryVmsDS_UsrVMCode", "path": "UsrVMCode", "caption": "VM ID", "dataValueType": 1},
            {"id": "d381017f-83bd-5659-b985-3abaa7a4b0c5", "code": "SummaryVmsDS_UsrName", "path": "UsrName", "caption": "VM name", "dataValueType": 1},
            {"id": "8d8bb883-eb1a-5882-8d4d-baddae481a3d", "code": "SummaryVmsDS_UsrContract", "path": "UsrContract", "caption": "Contract", "dataValueType": 10},
            {"id": "0928f610-d0ec-5883-992b-2b6bc96fe245", "code": "SummaryVmsDS_UsrProject", "path": "UsrProject", "caption": "Project", "dataValueType": 10},
            {"id": "bbe08625-b7bf-53be-9ad0-ef3c9477b215", "code": "SummaryVmsDS_UsrVIP", "path": "UsrVIP", "caption": "Virtual IP", "dataValueType": 1},
            {"id": "f095d570-1459-57b0-93b3-40d047095f51", "code": "SummaryVmsDS_UsrEnvironment", "path": "UsrEnvironment", "caption": "Environment", "dataValueType": 1},
            {"id": "2428dcae-7ca0-5ee6-beca-c45dcab2a4f8", "code": "SummaryVmsDS_UsrZone", "path": "UsrZone", "caption": "Zone", "dataValueType": 1},
            {"id": "7d53043c-f442-5bb2-a884-13ce3d4fc989", "code": "SummaryVmsDS_UsrCPU", "path": "UsrCPU", "caption": "Recorded vCPU", "dataValueType": 4},
            {"id": "5c30f829-8a59-5825-a59c-ab3870b62358", "code": "SummaryVmsDS_UsrRAMGB", "path": "UsrRAMGB", "caption": "Recorded RAM (GB)", "dataValueType": 4},
            {"id": "7c33943f-575f-594e-90a7-41783368f693", "code": "SummaryVmsDS_UsrStorageGB", "path": "UsrStorageGB", "caption": "Recorded storage (GB)", "dataValueType": 4},
            {"id": "64182f75-419b-5eb4-9a0c-d47ab56aa220", "code": "SummaryVmsDS_UsrStatus", "path": "UsrStatus", "caption": "Status", "dataValueType": 10},
            {"id": "3c906f02-bb50-5401-8839-d4754bd61e5a", "code": "SummaryVmsDS_UsrProvisionedOn", "path": "UsrProvisionedOn", "caption": "Provisioned on", "dataValueType": 7},
            {"id": "295fe83c-ecd3-5e69-9d19-cbd86e71a63f", "code": "SummaryVmsDS_CreatedOn", "path": "CreatedOn", "caption": "Created on", "dataValueType": 7}
          ],
          "sorting": "$SummaryVmRows_Sorting | crt.ToDataTableSortingConfig: 'SummaryVmRows'",
          "features": {"editable": {"enable": false, "itemsCreation": false}, "rows": {"selection": {"enable": true, "multiple": true}}},
          "fitContent": true,
          "rowToolbarItems": []
        },
        "parentName": "SummaryBody",
        "propertyName": "items",
        "index": 6
      },
      // Native lookup filter; its connections are configured per widget/list, without JavaScript handlers.
      {
        "operation": "insert",
        "name": "SummaryContractFilter",
        "values": {
          "type": "crt.QuickFilter",
          "config": {"caption": "Contract", "icon": "filter-column-icon", "iconPosition": "left-icon", "entitySchemaName": "UsrMCITContract"},
          "filterType": "lookup",
          "_filterOptions": {
            "expose": [
              {"attribute": "SummaryContractFilter_SummaryContracts_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "SummaryContracts_Data", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "SummaryContractFilter_SummaryProjects_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "SummaryProjects_Data", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "SummaryContractFilter_SummaryRequests_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "SummaryRequests_Data", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "SummaryContractFilter_SummaryRequestsByContract_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "SummaryRequestsByContract_Data", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "SummaryContractFilter_SummaryRequestsByProject_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "SummaryRequestsByProject_Data", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "SummaryContractFilter_SummaryActiveVms_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "SummaryActiveVms_Data", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "SummaryContractFilter_SummaryRequestRows", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "SummaryRequestRows", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "SummaryContractFilter_SummaryVmRows", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "SummaryVmRows", "filterColumn": "UsrContract"}, "quickFilterType": "lookup"}]}]}
            ],
            "from": "SummaryContractFilter_Value"
          }
        },
        "parentName": "SummaryFilterBar",
        "propertyName": "items",
        "index": 0
      },
      // Native lookup filter; its connections are configured per widget/list, without JavaScript handlers.
      {
        "operation": "insert",
        "name": "SummaryProjectFilter",
        "values": {
          "type": "crt.QuickFilter",
          "config": {"caption": "Project", "icon": "filter-column-icon", "iconPosition": "left-icon", "entitySchemaName": "UsrProject"},
          "filterType": "lookup",
          "_filterOptions": {
            "expose": [
              {"attribute": "SummaryProjectFilter_SummaryContracts_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "SummaryContracts_Data", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "SummaryProjectFilter_SummaryProjects_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "SummaryProjects_Data", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "SummaryProjectFilter_SummaryRequests_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "SummaryRequests_Data", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "SummaryProjectFilter_SummaryRequestsByContract_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "SummaryRequestsByContract_Data", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "SummaryProjectFilter_SummaryRequestsByProject_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "SummaryRequestsByProject_Data", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "SummaryProjectFilter_SummaryActiveVms_Data", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "SummaryActiveVms_Data", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "SummaryProjectFilter_SummaryRequestRows", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "SummaryRequestRows", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]},
              {"attribute": "SummaryProjectFilter_SummaryVmRows", "converters": [{"converter": "crt.QuickFilterAttributeConverter", "args": [{"target": {"viewAttributeName": "SummaryVmRows", "filterColumn": "UsrProject"}, "quickFilterType": "lookup"}]}]}
            ],
            "from": "SummaryProjectFilter_Value"
          }
        },
        "parentName": "SummaryFilterBar",
        "propertyName": "items",
        "index": 1
      },
      // Native editable text: Contracts and projects are counted once among matching requests. Request and VM details include records you created. Available point balances are not included.
      {"operation": "insert", "name": "SummaryMeaning", "values": {"type": "crt.Label", "caption": "Contracts and projects are counted once among matching requests. Request and VM details include records you created. Available point balances are not included.", "labelType": "body-large", "labelThickness": "light", "labelEllipsis": false, "labelColor": "auto", "labelTextAlign": "start", "headingLevel": "label"}, "parentName": "SummaryBody", "propertyName": "items", "index": 7}
    ]/**SCHEMA_VIEW_CONFIG_DIFF*/,
    // 2. Native collection bindings and filters. Current Contact is a server-evaluated macro.
    viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
      {
        "operation": "merge",
        "path": ["attributes"],
        "values": {
          "ReportRequestRows": {
            "isCollection": true,
            "modelConfig": {"path": "ReportRequestsDS", "pagingConfig": {"rowCount": 30}, "sortingConfig": {"attributeName": "ReportRequestRows_Sorting", "default": [{"columnName": "CreatedOn", "direction": "desc"}]}, "filterAttributes": [{"name": "ReportRequestRows_PredefinedFilter", "loadOnChange": true}, {"name": "ActivityContractFilter_ReportRequestRows", "loadOnChange": true}, {"name": "ActivityProjectFilter_ReportRequestRows", "loadOnChange": true}]},
            "viewModelConfig": {
              "attributes": {
                "ReportRequestsDS_Id": {"modelConfig": {"path": "ReportRequestsDS.Id"}},
                "ReportRequestsDS_UsrNumber": {"modelConfig": {"path": "ReportRequestsDS.UsrNumber"}},
                "ReportRequestsDS_UsrName": {"modelConfig": {"path": "ReportRequestsDS.UsrName"}},
                "ReportRequestsDS_UsrAccount": {"modelConfig": {"path": "ReportRequestsDS.UsrAccount"}},
                "ReportRequestsDS_UsrContract": {"modelConfig": {"path": "ReportRequestsDS.UsrContract"}},
                "ReportRequestsDS_UsrProject": {"modelConfig": {"path": "ReportRequestsDS.UsrProject"}},
                "ReportRequestsDS_UsrEstimatedPoints": {"modelConfig": {"path": "ReportRequestsDS.UsrEstimatedPoints"}},
                "ReportRequestsDS_UsrStatus": {"modelConfig": {"path": "ReportRequestsDS.UsrStatus"}},
                "ReportRequestsDS_UsrSubmittedOn": {"modelConfig": {"path": "ReportRequestsDS.UsrSubmittedOn"}},
                "ReportRequestsDS_CreatedOn": {"modelConfig": {"path": "ReportRequestsDS.CreatedOn"}}
              }
            }
          },
          "ReportRequestRows_Sorting": {},
          "ReportRequestRows_PredefinedFilter": {"value": {"items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "ActivityContractFilter_Value": {"value": null},
          "ActivityContractFilter_RequestsTotal_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "ActivityContractFilter_RequestsCompleted_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "ActivityContractFilter_RequestsRejected_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "ActivityContractFilter_RequestsPoints_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "ActivityContractFilter_RequestsByStatus_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "ActivityContractFilter_ReportRequestRows": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "ActivityProjectFilter_Value": {"value": null},
          "ActivityProjectFilter_RequestsTotal_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "ActivityProjectFilter_RequestsCompleted_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "ActivityProjectFilter_RequestsRejected_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "ActivityProjectFilter_RequestsPoints_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "ActivityProjectFilter_RequestsByStatus_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "ActivityProjectFilter_ReportRequestRows": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "ReportVmRows": {
            "isCollection": true,
            "modelConfig": {"path": "ReportVmsDS", "pagingConfig": {"rowCount": 30}, "sortingConfig": {"attributeName": "ReportVmRows_Sorting", "default": [{"columnName": "CreatedOn", "direction": "desc"}]}, "filterAttributes": [{"name": "ReportVmRows_PredefinedFilter", "loadOnChange": true}, {"name": "InventoryContractFilter_ReportVmRows", "loadOnChange": true}, {"name": "InventoryProjectFilter_ReportVmRows", "loadOnChange": true}]},
            "viewModelConfig": {
              "attributes": {
                "ReportVmsDS_Id": {"modelConfig": {"path": "ReportVmsDS.Id"}},
                "ReportVmsDS_UsrVMCode": {"modelConfig": {"path": "ReportVmsDS.UsrVMCode"}},
                "ReportVmsDS_UsrName": {"modelConfig": {"path": "ReportVmsDS.UsrName"}},
                "ReportVmsDS_UsrContract": {"modelConfig": {"path": "ReportVmsDS.UsrContract"}},
                "ReportVmsDS_UsrProject": {"modelConfig": {"path": "ReportVmsDS.UsrProject"}},
                "ReportVmsDS_UsrVIP": {"modelConfig": {"path": "ReportVmsDS.UsrVIP"}},
                "ReportVmsDS_UsrEnvironment": {"modelConfig": {"path": "ReportVmsDS.UsrEnvironment"}},
                "ReportVmsDS_UsrZone": {"modelConfig": {"path": "ReportVmsDS.UsrZone"}},
                "ReportVmsDS_UsrCPU": {"modelConfig": {"path": "ReportVmsDS.UsrCPU"}},
                "ReportVmsDS_UsrRAMGB": {"modelConfig": {"path": "ReportVmsDS.UsrRAMGB"}},
                "ReportVmsDS_UsrStorageGB": {"modelConfig": {"path": "ReportVmsDS.UsrStorageGB"}},
                "ReportVmsDS_UsrStatus": {"modelConfig": {"path": "ReportVmsDS.UsrStatus"}},
                "ReportVmsDS_UsrProvisionedOn": {"modelConfig": {"path": "ReportVmsDS.UsrProvisionedOn"}},
                "ReportVmsDS_CreatedOn": {"modelConfig": {"path": "ReportVmsDS.CreatedOn"}}
              }
            }
          },
          "ReportVmRows_Sorting": {},
          "ReportVmRows_PredefinedFilter": {"value": {"items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}},
          "InventoryContractFilter_Value": {"value": null},
          "InventoryContractFilter_VmTotal_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}},
          "InventoryContractFilter_VmCpu_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}},
          "InventoryContractFilter_VmRam_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}},
          "InventoryContractFilter_VmStorage_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}},
          "InventoryContractFilter_VmsByContract_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}},
          "InventoryContractFilter_ReportVmRows": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}},
          "InventoryProjectFilter_Value": {"value": null},
          "InventoryProjectFilter_VmTotal_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}},
          "InventoryProjectFilter_VmCpu_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}},
          "InventoryProjectFilter_VmRam_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}},
          "InventoryProjectFilter_VmStorage_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}},
          "InventoryProjectFilter_VmsByContract_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}},
          "InventoryProjectFilter_ReportVmRows": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}},
          "SummaryRequestRows": {
            "isCollection": true,
            "modelConfig": {"path": "SummaryRequestsDS", "pagingConfig": {"rowCount": 30}, "sortingConfig": {"attributeName": "SummaryRequestRows_Sorting", "default": [{"columnName": "CreatedOn", "direction": "desc"}]}, "filterAttributes": [{"name": "SummaryRequestRows_PredefinedFilter", "loadOnChange": true}, {"name": "SummaryContractFilter_SummaryRequestRows", "loadOnChange": true}, {"name": "SummaryProjectFilter_SummaryRequestRows", "loadOnChange": true}]},
            "viewModelConfig": {
              "attributes": {
                "SummaryRequestsDS_Id": {"modelConfig": {"path": "SummaryRequestsDS.Id"}},
                "SummaryRequestsDS_UsrNumber": {"modelConfig": {"path": "SummaryRequestsDS.UsrNumber"}},
                "SummaryRequestsDS_UsrName": {"modelConfig": {"path": "SummaryRequestsDS.UsrName"}},
                "SummaryRequestsDS_UsrAccount": {"modelConfig": {"path": "SummaryRequestsDS.UsrAccount"}},
                "SummaryRequestsDS_UsrContract": {"modelConfig": {"path": "SummaryRequestsDS.UsrContract"}},
                "SummaryRequestsDS_UsrProject": {"modelConfig": {"path": "SummaryRequestsDS.UsrProject"}},
                "SummaryRequestsDS_UsrEstimatedPoints": {"modelConfig": {"path": "SummaryRequestsDS.UsrEstimatedPoints"}},
                "SummaryRequestsDS_UsrStatus": {"modelConfig": {"path": "SummaryRequestsDS.UsrStatus"}},
                "SummaryRequestsDS_UsrSubmittedOn": {"modelConfig": {"path": "SummaryRequestsDS.UsrSubmittedOn"}},
                "SummaryRequestsDS_CreatedOn": {"modelConfig": {"path": "SummaryRequestsDS.CreatedOn"}}
              }
            }
          },
          "SummaryRequestRows_Sorting": {},
          "SummaryRequestRows_PredefinedFilter": {"value": {"items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "SummaryVmRows": {
            "isCollection": true,
            "modelConfig": {"path": "SummaryVmsDS", "pagingConfig": {"rowCount": 30}, "sortingConfig": {"attributeName": "SummaryVmRows_Sorting", "default": [{"columnName": "CreatedOn", "direction": "desc"}]}, "filterAttributes": [{"name": "SummaryVmRows_PredefinedFilter", "loadOnChange": true}, {"name": "SummaryContractFilter_SummaryVmRows", "loadOnChange": true}, {"name": "SummaryProjectFilter_SummaryVmRows", "loadOnChange": true}]},
            "viewModelConfig": {
              "attributes": {
                "SummaryVmsDS_Id": {"modelConfig": {"path": "SummaryVmsDS.Id"}},
                "SummaryVmsDS_UsrVMCode": {"modelConfig": {"path": "SummaryVmsDS.UsrVMCode"}},
                "SummaryVmsDS_UsrName": {"modelConfig": {"path": "SummaryVmsDS.UsrName"}},
                "SummaryVmsDS_UsrContract": {"modelConfig": {"path": "SummaryVmsDS.UsrContract"}},
                "SummaryVmsDS_UsrProject": {"modelConfig": {"path": "SummaryVmsDS.UsrProject"}},
                "SummaryVmsDS_UsrVIP": {"modelConfig": {"path": "SummaryVmsDS.UsrVIP"}},
                "SummaryVmsDS_UsrEnvironment": {"modelConfig": {"path": "SummaryVmsDS.UsrEnvironment"}},
                "SummaryVmsDS_UsrZone": {"modelConfig": {"path": "SummaryVmsDS.UsrZone"}},
                "SummaryVmsDS_UsrCPU": {"modelConfig": {"path": "SummaryVmsDS.UsrCPU"}},
                "SummaryVmsDS_UsrRAMGB": {"modelConfig": {"path": "SummaryVmsDS.UsrRAMGB"}},
                "SummaryVmsDS_UsrStorageGB": {"modelConfig": {"path": "SummaryVmsDS.UsrStorageGB"}},
                "SummaryVmsDS_UsrStatus": {"modelConfig": {"path": "SummaryVmsDS.UsrStatus"}},
                "SummaryVmsDS_UsrProvisionedOn": {"modelConfig": {"path": "SummaryVmsDS.UsrProvisionedOn"}},
                "SummaryVmsDS_CreatedOn": {"modelConfig": {"path": "SummaryVmsDS.CreatedOn"}}
              }
            }
          },
          "SummaryVmRows_Sorting": {},
          "SummaryVmRows_PredefinedFilter": {"value": {"items": {"CreatedByCurrentContact": {"filterType": 1, "comparisonType": 3, "isEnabled": true, "leftExpression": {"expressionType": 0, "columnPath": "CreatedBy"}, "rightExpression": {"expressionType": 1, "functionType": 1, "macrosType": 2}, "dataValueType": 10}}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}},
          "SummaryContractFilter_Value": {"value": null},
          "SummaryContractFilter_SummaryContracts_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "SummaryContractFilter_SummaryProjects_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "SummaryContractFilter_SummaryRequests_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "SummaryContractFilter_SummaryRequestsByContract_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "SummaryContractFilter_SummaryRequestsByProject_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "SummaryContractFilter_SummaryActiveVms_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}},
          "SummaryContractFilter_SummaryRequestRows": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "SummaryContractFilter_SummaryVmRows": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}},
          "SummaryProjectFilter_Value": {"value": null},
          "SummaryProjectFilter_SummaryContracts_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "SummaryProjectFilter_SummaryProjects_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "SummaryProjectFilter_SummaryRequests_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "SummaryProjectFilter_SummaryRequestsByContract_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "SummaryProjectFilter_SummaryRequestsByProject_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "SummaryProjectFilter_SummaryActiveVms_Data": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}},
          "SummaryProjectFilter_SummaryRequestRows": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVMRequest"}},
          "SummaryProjectFilter_SummaryVmRows": {"value": {"items": {}, "logicalOperation": 0, "isEnabled": true, "filterType": 6, "rootSchemaName": "UsrVirtualMachine"}}
        }
      }
    ]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
    // 3. Existing entity sources only. PDS is required by the inherited list template.
    modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
      {
        "operation": "merge",
        "path": ["dataSources"],
        "values": {
          "ReportRequestsDS": {"type": "crt.EntityDataSource", "scope": "viewElement", "config": {"entitySchemaName": "UsrVMRequest", "attributes": {"Id": {"path": "Id"}, "UsrNumber": {"path": "UsrNumber"}, "UsrName": {"path": "UsrName"}, "UsrAccount": {"path": "UsrAccount"}, "UsrContract": {"path": "UsrContract"}, "UsrProject": {"path": "UsrProject"}, "UsrEstimatedPoints": {"path": "UsrEstimatedPoints"}, "UsrStatus": {"path": "UsrStatus"}, "UsrSubmittedOn": {"path": "UsrSubmittedOn"}, "CreatedOn": {"path": "CreatedOn"}}}},
          "ReportVmsDS": {
            "type": "crt.EntityDataSource",
            "scope": "viewElement",
            "config": {"entitySchemaName": "UsrVirtualMachine", "attributes": {"Id": {"path": "Id"}, "UsrVMCode": {"path": "UsrVMCode"}, "UsrName": {"path": "UsrName"}, "UsrContract": {"path": "UsrContract"}, "UsrProject": {"path": "UsrProject"}, "UsrVIP": {"path": "UsrVIP"}, "UsrEnvironment": {"path": "UsrEnvironment"}, "UsrZone": {"path": "UsrZone"}, "UsrCPU": {"path": "UsrCPU"}, "UsrRAMGB": {"path": "UsrRAMGB"}, "UsrStorageGB": {"path": "UsrStorageGB"}, "UsrStatus": {"path": "UsrStatus"}, "UsrProvisionedOn": {"path": "UsrProvisionedOn"}, "CreatedOn": {"path": "CreatedOn"}}}
          },
          "SummaryRequestsDS": {"type": "crt.EntityDataSource", "scope": "viewElement", "config": {"entitySchemaName": "UsrVMRequest", "attributes": {"Id": {"path": "Id"}, "UsrNumber": {"path": "UsrNumber"}, "UsrName": {"path": "UsrName"}, "UsrAccount": {"path": "UsrAccount"}, "UsrContract": {"path": "UsrContract"}, "UsrProject": {"path": "UsrProject"}, "UsrEstimatedPoints": {"path": "UsrEstimatedPoints"}, "UsrStatus": {"path": "UsrStatus"}, "UsrSubmittedOn": {"path": "UsrSubmittedOn"}, "CreatedOn": {"path": "CreatedOn"}}}},
          "SummaryVmsDS": {
            "type": "crt.EntityDataSource",
            "scope": "viewElement",
            "config": {"entitySchemaName": "UsrVirtualMachine", "attributes": {"Id": {"path": "Id"}, "UsrVMCode": {"path": "UsrVMCode"}, "UsrName": {"path": "UsrName"}, "UsrContract": {"path": "UsrContract"}, "UsrProject": {"path": "UsrProject"}, "UsrVIP": {"path": "UsrVIP"}, "UsrEnvironment": {"path": "UsrEnvironment"}, "UsrZone": {"path": "UsrZone"}, "UsrCPU": {"path": "UsrCPU"}, "UsrRAMGB": {"path": "UsrRAMGB"}, "UsrStorageGB": {"path": "UsrStorageGB"}, "UsrStatus": {"path": "UsrStatus"}, "UsrProvisionedOn": {"path": "UsrProvisionedOn"}, "CreatedOn": {"path": "CreatedOn"}}}
          },
          "PDS": {"type": "crt.EntityDataSource", "scope": "page", "config": {"entitySchemaName": "UsrVMRequest"}}
        }
      }
    ]/**SCHEMA_MODEL_CONFIG_DIFF*/,
    // 4. Standard Creatio requests handle filtering, tab switching, refresh and export.
    handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
    converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
    validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
  };
});
