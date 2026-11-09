/*
 * NATIVE VM LIFECYCLE — paste ONLY into UsrVMLifecycle_ListPage.
 * Parent: ListPageV3Template. Existing object: UsrVirtualMachine.
 * Uses native controls for inventory, filters, request history and Excel export.
 * Does not call UsrVMPortalService or depend on UsrMCITAddOn/UsrVMLifecycle objects.
 * IMPORTANT: this is the native list/history phase. Upgrade/downgrade/termination
 * submission requires a separate native form and configured business process.
 * No unconfigured action buttons are presented as working.
 * Current-contact creator filters match the Reports draft; customer authorization
 * and authority/contract scope still need administrator configuration.
 */
define("UsrVMLifecycle_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function() {
  return {
    // 1. Native layout; keep the inherited list, search, refresh and filter toolbar.
    viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
      // PageTitle: configure the native component.
      {"operation":"merge","name":"PageTitle","values":{"caption":"VM Lifecycle"}},
      // AddButton: configure the native component.
      {"operation":"merge","name":"AddButton","values":{"visible":false}},
      // DataImportButton: configure the native component.
      {"operation":"merge","name":"DataImportButton","values":{"visible":false}},
      // FolderTree: configure the native component.
      {"operation":"merge","name":"FolderTree","values":{"sourceSchemaName":"FolderTree","rootSchemaName":"UsrVirtualMachine"}},
      // SearchFilter: configure the native component.
      {"operation":"merge","name":"SearchFilter","values":{"placeholder":"Search virtual machines…"}},
      // Read inventory specifications and allocated points. No direct resource/accounting edits.
      {"operation":"merge","name":"DataTable","values":{
        "primaryColumnName":"PDS_Id",
        "features":{"editable":{"enable":false,"itemsCreation":false},"rows":{"selection":{"enable":true,"multiple":true}}},
        "columns":[
          {"id":"a05dcc10-8f49-5ab2-88de-35eb32eb2ec4","code":"PDS_UsrVMCode","path":"UsrVMCode","caption":"VM ID","dataValueType":1},
          {"id":"a52773d1-7eb0-59df-b078-a38eb240534b","code":"PDS_UsrName","path":"UsrName","caption":"VM name","dataValueType":1},
          {"id":"9d841ea5-4369-58b4-a8b4-dd6f77af063d","code":"PDS_UsrContract","path":"UsrContract","caption":"Contract","dataValueType":10},
          {"id":"3a1b2c9e-c237-5cf1-b1a2-d72ed594d026","code":"PDS_UsrVIP","path":"UsrVIP","caption":"Virtual IP","dataValueType":1},
          {"id":"6ba13507-a9c6-5add-ba23-d59fbad5d6de","code":"PDS_UsrCPU","path":"UsrCPU","caption":"vCPU","dataValueType":4},
          {"id":"52ff3ba1-761d-5af4-b263-66958d147b0a","code":"PDS_UsrRAMGB","path":"UsrRAMGB","caption":"RAM (GB)","dataValueType":4},
          {"id":"39b2abb4-2c77-527d-86c0-88321a0d775b","code":"PDS_UsrStorageGB","path":"UsrStorageGB","caption":"Storage (GB)","dataValueType":4},
          {"id":"54087557-4efb-54db-bc9b-03d13a0d1a9c","code":"PDS_UsrStatus","path":"UsrStatus","caption":"Status","dataValueType":10},
          {"id":"7c2f1496-c0b2-502a-8943-ea04a7a1ddee","code":"PDS_UsrAllocatedPoints","path":"UsrAllocatedPoints","caption":"Allocated points","dataValueType":5},
          {"id":"6e0f9cf5-7558-5e2f-966a-1ce388b2b659","code":"PDS_UsrProvisionedOn","path":"UsrProvisionedOn","caption":"Provisioned on","dataValueType":7}
        ]}
      },
      // MenuItem_ExportToExcel: configure the native component.
      {"operation":"merge","name":"MenuItem_ExportToExcel","values":{"clicked":{"request":"crt.ExportDataGridToExcelRequest","params":{"viewName":"DataTable","filters":"$Items | crt.ToCollectionFilters : 'Items'"}}}},
      // Dashboards: configure the native component.
      {"operation":"merge","name":"Dashboards","values":{"_designOptions":{"entitySchemaName":"UsrVirtualMachine","dependencies":[{"attributePath":"Id","relationPath":"PDS.Id"}],"filters":[]}}},
      // VMQuickFilters: configure the native component.
      {"operation":"insert","name":"VMQuickFilters","values":{"type":"crt.FlexContainer","direction":"row","wrap":"wrap","gap":"small","fitContent":true,"items":[],"padding":{"top":"small","bottom":"small","left":"large","right":"large"}},"parentName":"ListContainer","propertyName":"items","index":0},
      // VMContractFilter: configure the native component.
      {"operation":"insert","name":"VMContractFilter","values":{"type":"crt.QuickFilter","filterType":"lookup","config":{"caption":"Contract","icon":"filter-column-icon","iconPosition":"left-icon","entitySchemaName":"UsrMCITContract"},"_filterOptions":{"expose":[{"attribute":"VMContractFilter_Items","converters":[{"converter":"crt.QuickFilterAttributeConverter","args":[{"target":{"viewAttributeName":"Items","filterColumn":"UsrContract"},"quickFilterType":"lookup"}]}]}],"from":"VMContractFilter_Value"}},"parentName":"VMQuickFilters","propertyName":"items","index":0},
      // VMStatusFilter: configure the native component.
      {"operation":"insert","name":"VMStatusFilter","values":{"type":"crt.QuickFilter","filterType":"lookup","config":{"caption":"Status","icon":"filter-column-icon","iconPosition":"left-icon","entitySchemaName":"UsrMCITVMStatus"},"_filterOptions":{"expose":[{"attribute":"VMStatusFilter_Items","converters":[{"converter":"crt.QuickFilterAttributeConverter","args":[{"target":{"viewAttributeName":"Items","filterColumn":"UsrStatus"},"quickFilterType":"lookup"}]}]}],"from":"VMStatusFilter_Value"}},"parentName":"VMQuickFilters","propertyName":"items","index":1},
      // VMProjectFilter: configure the native component.
      {"operation":"insert","name":"VMProjectFilter","values":{"type":"crt.QuickFilter","filterType":"lookup","config":{"caption":"Project","icon":"filter-column-icon","iconPosition":"left-icon","entitySchemaName":"UsrProject"},"_filterOptions":{"expose":[{"attribute":"VMProjectFilter_Items","converters":[{"converter":"crt.QuickFilterAttributeConverter","args":[{"target":{"viewAttributeName":"Items","filterColumn":"UsrProject"},"quickFilterType":"lookup"}]}]}],"from":"VMProjectFilter_Value"}},"parentName":"VMQuickFilters","propertyName":"items","index":2},
      // ListTabContainer: configure the native component.
      {"operation":"merge","name":"ListTabContainer","values":{"caption":"Virtual Machines"}},
      // Navigate to the existing My Requests page using a standard Creatio request.
      {"operation":"insert","name":"LifecycleMyRequestsButton","values":{"type":"crt.Button","caption":"My Requests","color":"outline","size":"medium","clicked":{"request":"crt.OpenPageRequest","params":{"schemaName":"UsrMyRequests_ListPage"}}},"parentName":"ActionButtonsContainer","propertyName":"items","index":0},
      // Native tab for saved lifecycle requests, independent of the custom DLL.
      {"operation":"insert","name":"LifecycleHistoryTab","values":{"type":"crt.TabContainer","caption":"Lifecycle Request History","items":[],"iconPosition":"only-text","visible":true},"parentName":"MainTabPanel","propertyName":"items","index":1},
      // LifecycleHistoryBody: configure the native component.
      {"operation":"insert","name":"LifecycleHistoryBody","values":{"type":"crt.FlexContainer","direction":"column","items":[],"gap":"medium","fitContent":true,"padding":{"top":"large","right":"large","bottom":"large","left":"large"}},"parentName":"LifecycleHistoryTab","propertyName":"items","index":0},
      // LifecycleHistoryTools: configure the native component.
      {"operation":"insert","name":"LifecycleHistoryTools","values":{"type":"crt.FlexContainer","direction":"row","justifyContent":"space-between","items":[],"gap":"small","fitContent":true},"parentName":"LifecycleHistoryBody","propertyName":"items","index":0},
      // LifecycleHistoryTitle: configure the native component.
      {"operation":"insert","name":"LifecycleHistoryTitle","values":{"type":"crt.Label","caption":"Lifecycle requests","labelType":"headline-2","labelThickness":"default","labelColor":"auto","labelTextAlign":"start","labelEllipsis":false},"parentName":"LifecycleHistoryTools","propertyName":"items","index":0},
      // Native Excel export for the filtered lifecycle history.
      {"operation":"insert","name":"LifecycleHistoryExport","values":{"type":"crt.Button","caption":"Export history","color":"outline","clicked":{"request":"crt.ExportDataGridToExcelRequest","params":{"viewName":"LifecycleHistoryGrid","filters":"$LifecycleHistoryRows | crt.ToCollectionFilters : 'LifecycleHistoryRows'"}}},"parentName":"LifecycleHistoryTools","propertyName":"items","index":1},
      // Native request-history grid; values come from UsrVMRequest, not a browser-side cache.
      {"operation":"insert","name":"LifecycleHistoryGrid","values":{
        "type":"crt.DataGrid",
        "items":"$LifecycleHistoryRows",
        "primaryColumnName":"LifecycleHistoryDS_Id",
        "sorting":"$LifecycleHistorySorting | crt.ToDataTableSortingConfig: 'LifecycleHistoryRows'",
        "fitContent":true,
        "rowToolbarItems":[],
        "features":{"editable":{"enable":false,"itemsCreation":false},"rows":{"selection":{"enable":true,"multiple":true}}},
        "columns":[
          {"id":"3897f33f-ad16-5d6d-9e99-20a1f4ad7cd4","code":"LifecycleHistoryDS_UsrNumber","path":"UsrNumber","caption":"Request number","dataValueType":1},
          {"id":"3daea6b9-a4de-53cb-ace9-ff825eafe260","code":"LifecycleHistoryDS_UsrName","path":"UsrName","caption":"Request name","dataValueType":1},
          {"id":"168f4c1c-a4ab-5145-998b-0c38d9bfafde","code":"LifecycleHistoryDS_UsrLifecycleAction","path":"UsrLifecycleAction","caption":"Lifecycle action","dataValueType":1},
          {"id":"6076c77a-8cf7-5e74-9d0a-2c7a03915685","code":"LifecycleHistoryDS_UsrContract","path":"UsrContract","caption":"Contract","dataValueType":10},
          {"id":"62e92609-770d-5fb2-b6c6-cabd18b39b9a","code":"LifecycleHistoryDS_UsrEstimatedPoints","path":"UsrEstimatedPoints","caption":"Estimated points","dataValueType":5},
          {"id":"6bb7fff8-1add-5c5e-a4c8-15a4fe9897f9","code":"LifecycleHistoryDS_UsrStatus","path":"UsrStatus","caption":"Request status","dataValueType":10},
          {"id":"0fa8b323-6f77-5320-9a27-28fea97d75f7","code":"LifecycleHistoryDS_CreatedOn","path":"CreatedOn","caption":"Created on","dataValueType":7}
        ]}
        ,"parentName":"LifecycleHistoryBody"
        ,"propertyName":"items"
        ,"index":1
      }
    ]/**SCHEMA_VIEW_CONFIG_DIFF*/,
    // 2. Bind collections and filters to published fields; native data loading handles paging.
    viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
      {"operation":"merge","path":["attributes"],"values":{"HeaderCaption":{"value":"VM Lifecycle"},"Items_PredefinedFilter":{"value":{"items":{"CreatedByCurrentContact":{"filterType":1,"comparisonType":3,"isEnabled":true,"leftExpression":{"expressionType":0,"columnPath":"CreatedBy"},"rightExpression":{"expressionType":1,"functionType":1,"macrosType":2},"dataValueType":10}},"logicalOperation":0,"isEnabled":true,"filterType":6,"rootSchemaName":"UsrVirtualMachine"}},"VMContractFilter_Value":{"value":null},"VMContractFilter_Items":{"value":{"items":{},"logicalOperation":0,"isEnabled":true,"filterType":6,"rootSchemaName":"UsrVirtualMachine"}},"VMStatusFilter_Value":{"value":null},"VMStatusFilter_Items":{"value":{"items":{},"logicalOperation":0,"isEnabled":true,"filterType":6,"rootSchemaName":"UsrVirtualMachine"}},"VMProjectFilter_Value":{"value":null},"VMProjectFilter_Items":{"value":{"items":{},"logicalOperation":0,"isEnabled":true,"filterType":6,"rootSchemaName":"UsrVirtualMachine"}},"LifecycleHistoryRows":{"isCollection":true,"modelConfig":{"path":"LifecycleHistoryDS","pagingConfig":{"rowCount":30},"sortingConfig":{"attributeName":"LifecycleHistorySorting","default":[{"columnName":"CreatedOn","direction":"desc"}]},"filterAttributes":[{"name":"LifecycleHistoryFilter","loadOnChange":true}]},"viewModelConfig":{"attributes":{"LifecycleHistoryDS_Id":{"modelConfig":{"path":"LifecycleHistoryDS.Id"}},"LifecycleHistoryDS_UsrNumber":{"modelConfig":{"path":"LifecycleHistoryDS.UsrNumber"}},"LifecycleHistoryDS_UsrName":{"modelConfig":{"path":"LifecycleHistoryDS.UsrName"}},"LifecycleHistoryDS_UsrLifecycleAction":{"modelConfig":{"path":"LifecycleHistoryDS.UsrLifecycleAction"}},"LifecycleHistoryDS_UsrContract":{"modelConfig":{"path":"LifecycleHistoryDS.UsrContract"}},"LifecycleHistoryDS_UsrEstimatedPoints":{"modelConfig":{"path":"LifecycleHistoryDS.UsrEstimatedPoints"}},"LifecycleHistoryDS_UsrStatus":{"modelConfig":{"path":"LifecycleHistoryDS.UsrStatus"}},"LifecycleHistoryDS_CreatedOn":{"modelConfig":{"path":"LifecycleHistoryDS.CreatedOn"}}}}},"LifecycleHistorySorting":{},"LifecycleHistoryFilter":{"value":{"items":{"CreatedByCurrentContact":{"filterType":1,"comparisonType":3,"isEnabled":true,"leftExpression":{"expressionType":0,"columnPath":"CreatedBy"},"rightExpression":{"expressionType":1,"functionType":1,"macrosType":2},"dataValueType":10},"LifecycleActions":{"filterType":6,"logicalOperation":1,"isEnabled":true,"items":{"upgrade":{"filterType":1,"comparisonType":3,"isEnabled":true,"leftExpression":{"expressionType":0,"columnPath":"UsrLifecycleAction"},"rightExpression":{"expressionType":2,"parameter":{"dataValueType":1,"value":"upgrade"}},"dataValueType":1},"downgrade":{"filterType":1,"comparisonType":3,"isEnabled":true,"leftExpression":{"expressionType":0,"columnPath":"UsrLifecycleAction"},"rightExpression":{"expressionType":2,"parameter":{"dataValueType":1,"value":"downgrade"}},"dataValueType":1},"terminate":{"filterType":1,"comparisonType":3,"isEnabled":true,"leftExpression":{"expressionType":0,"columnPath":"UsrLifecycleAction"},"rightExpression":{"expressionType":2,"parameter":{"dataValueType":1,"value":"terminate"}},"dataValueType":1}}}},"logicalOperation":0,"isEnabled":true,"filterType":6,"rootSchemaName":"UsrVMRequest"}}}},
      {"operation":"merge","path":["attributes","Items"],"values":{"modelConfig":{"path":"PDS","pagingConfig":{"rowCount":30},"sortingConfig":{"attributeName":"ItemsSorting","default":[{"columnName":"UsrName","direction":"asc"}]},"filterAttributes":[{"name":"FolderTree_active_folder_filter","loadOnChange":true},{"name":"Items_PredefinedFilter","loadOnChange":true},{"name":"LookupQuickFilterByTag_Items","loadOnChange":true},{"name":"SearchFilter_Items","loadOnChange":true},{"name":"Filters_Filter","loadOnChange":true},{"name":"VMContractFilter_Items","loadOnChange":true},{"name":"VMStatusFilter_Items","loadOnChange":true},{"name":"VMProjectFilter_Items","loadOnChange":true}]}}},
      {"operation":"merge","path":["attributes","Items","viewModelConfig","attributes"],"values":{"PDS_Id":{"modelConfig":{"path":"PDS.Id"}},"PDS_UsrVMCode":{"modelConfig":{"path":"PDS.UsrVMCode"}},"PDS_UsrName":{"modelConfig":{"path":"PDS.UsrName"}},"PDS_UsrSourceRequestItem_UsrRequest":{"modelConfig":{"path":"PDS.UsrSourceRequestItem.UsrRequest"}},"PDS_UsrAccount":{"modelConfig":{"path":"PDS.UsrAccount"}},"PDS_UsrContract":{"modelConfig":{"path":"PDS.UsrContract"}},"PDS_UsrProject":{"modelConfig":{"path":"PDS.UsrProject"}},"PDS_UsrEnvironment":{"modelConfig":{"path":"PDS.UsrEnvironment"}},"PDS_UsrIPAddress":{"modelConfig":{"path":"PDS.UsrIPAddress"}},"PDS_UsrVIP":{"modelConfig":{"path":"PDS.UsrVIP"}},"PDS_UsrCPU":{"modelConfig":{"path":"PDS.UsrCPU"}},"PDS_UsrRAMGB":{"modelConfig":{"path":"PDS.UsrRAMGB"}},"PDS_UsrStorageGB":{"modelConfig":{"path":"PDS.UsrStorageGB"}},"PDS_UsrStatus":{"modelConfig":{"path":"PDS.UsrStatus"}},"PDS_UsrZone":{"modelConfig":{"path":"PDS.UsrZone"}},"PDS_UsrProvisionedOn":{"modelConfig":{"path":"PDS.UsrProvisionedOn"}},"PDS_UsrAllocatedPoints":{"modelConfig":{"path":"PDS.UsrAllocatedPoints"}}}}
    ]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
    // 3. Inventory PDS plus an independent request-history data source.
    modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
      {"operation":"merge","path":["dataSources","PDS","config"],"values":{"entitySchemaName":"UsrVirtualMachine"}},
      {"operation":"merge","path":["dataSources"],"values":{"LifecycleHistoryDS":{"type":"crt.EntityDataSource","scope":"viewElement","config":{"entitySchemaName":"UsrVMRequest","attributes":{"Id":{"path":"Id"},"UsrNumber":{"path":"UsrNumber"},"UsrName":{"path":"UsrName"},"UsrLifecycleAction":{"path":"UsrLifecycleAction"},"UsrContract":{"path":"UsrContract"},"UsrEstimatedPoints":{"path":"UsrEstimatedPoints"},"UsrStatus":{"path":"UsrStatus"},"CreatedOn":{"path":"CreatedOn"}}}}}}
    ]/**SCHEMA_MODEL_CONFIG_DIFF*/,
    // 4. Built-in Creatio requests; no custom JavaScript event handlers.
    handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
    converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
    validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
  };
});
