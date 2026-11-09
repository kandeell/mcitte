/*
 * NATIVE VIRTUAL MACHINES — paste ONLY into UsrVMPortal_ListPage.
 * Parent: ListPageV3Template. Data: existing UsrVirtualMachine records.
 * Built-in crt.* controls and requests; no custom service, HTML host, or DLL call.
 * Demo scope matches Reports: records CreatedBy the current contact.
 * This is a convenience filter, not authorization. Configure customer record rights
 * and the agreed authority/contract scope before delivery.
 * Editing details uses the existing entity record-page registration.
 * This list does not provision infrastructure or implement lifecycle submissions.
 */
define("UsrVMPortal_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function() {
  return {
    // 1. Reuse the standard Creatio list and toolbar.
    viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
      // The existing native page title; the Creatio shell stays in place.
      {"operation":"merge","name":"PageTitle","values":{"caption":"Virtual Machines"}},
      // Provisioning records must come from the agreed request process, so hide direct creation here.
      {"operation":"merge","name":"AddButton","values":{"visible":false}},
      // Hide bulk import from this requester-facing list.
      {"operation":"merge","name":"DataImportButton","values":{"visible":false}},
      // Native folders filter the real inventory object.
      {"operation":"merge","name":"FolderTree","values":{"sourceSchemaName":"FolderTree","rootSchemaName":"UsrVirtualMachine"}},
      // Keep the built-in searchable-column selector and filter behavior.
      {"operation":"merge","name":"SearchFilter","values":{"placeholder":"Search virtual machines…"}},
      // Native inventory columns. No direct resource editing that could bypass lifecycle accounting.
      {"operation":"merge","name":"DataTable","values":{
        "primaryColumnName":"PDS_Id",
        "columns":[
          {"id":"a05dcc10-8f49-5ab2-88de-35eb32eb2ec4","code":"PDS_UsrVMCode","path":"UsrVMCode","caption":"VM ID","dataValueType":1},
          {"id":"a52773d1-7eb0-59df-b078-a38eb240534b","code":"PDS_UsrName","path":"UsrName","caption":"VM name","dataValueType":1},
          {"id":"4c21126f-a82e-520d-9c39-1d68242db01d","code":"PDS_UsrSourceRequestItem_UsrRequest","path":"UsrSourceRequestItem.UsrRequest","caption":"Source request","dataValueType":10},
          {"id":"ef76188a-044f-5e8b-91e4-948e1a766830","code":"PDS_UsrAccount","path":"UsrAccount","caption":"Authority","dataValueType":10},
          {"id":"9d841ea5-4369-58b4-a8b4-dd6f77af063d","code":"PDS_UsrContract","path":"UsrContract","caption":"Contract","dataValueType":10},
          {"id":"6febbb08-9b06-5e73-9b9b-0a4729f30897","code":"PDS_UsrProject","path":"UsrProject","caption":"Project","dataValueType":10},
          {"id":"adf4e748-aa4d-5424-92e8-46dfb9d48bd9","code":"PDS_UsrEnvironment","path":"UsrEnvironment","caption":"Environment","dataValueType":1},
          {"id":"43081d96-e222-5ade-8567-59093815df71","code":"PDS_UsrIPAddress","path":"UsrIPAddress","caption":"Private IP","dataValueType":1},
          {"id":"3a1b2c9e-c237-5cf1-b1a2-d72ed594d026","code":"PDS_UsrVIP","path":"UsrVIP","caption":"Virtual IP","dataValueType":1},
          {"id":"6ba13507-a9c6-5add-ba23-d59fbad5d6de","code":"PDS_UsrCPU","path":"UsrCPU","caption":"vCPU","dataValueType":4},
          {"id":"52ff3ba1-761d-5af4-b263-66958d147b0a","code":"PDS_UsrRAMGB","path":"UsrRAMGB","caption":"RAM (GB)","dataValueType":4},
          {"id":"39b2abb4-2c77-527d-86c0-88321a0d775b","code":"PDS_UsrStorageGB","path":"UsrStorageGB","caption":"Storage (GB)","dataValueType":4},
          {"id":"54087557-4efb-54db-bc9b-03d13a0d1a9c","code":"PDS_UsrStatus","path":"UsrStatus","caption":"Status","dataValueType":10},
          {"id":"7a371985-22c5-577a-b402-be8e03c3f3c5","code":"PDS_UsrZone","path":"UsrZone","caption":"Zone","dataValueType":1},
          {"id":"6e0f9cf5-7558-5e2f-966a-1ce388b2b659","code":"PDS_UsrProvisionedOn","path":"UsrProvisionedOn","caption":"Provisioned on","dataValueType":7}
        ],
        "features":{"editable":{"enable":false,"itemsCreation":false},"rows":{"selection":{"enable":true,"multiple":true}}}
      }},
      // The standard export request receives the current collection filters.
      {"operation":"merge","name":"MenuItem_ExportToExcel","values":{"clicked":{"request":"crt.ExportDataGridToExcelRequest","params":{"viewName":"DataTable","filters":"$Items | crt.ToCollectionFilters : 'Items'"}}}},
      // The inherited analytics area also uses inventory rather than the deleted legacy object.
      {"operation":"merge","name":"Dashboards","values":{"_designOptions":{"entitySchemaName":"UsrVirtualMachine","dependencies":[{"attributePath":"Id","relationPath":"PDS.Id"}],"filters":[]}}},
      // Native quick filters above the existing grid; maintain these connections in the Designer.
      {"operation":"insert","name":"VMQuickFilters","values":{"type":"crt.FlexContainer","direction":"row","wrap":"wrap","gap":"small","fitContent":true,"items":[],"padding":{"top":"small","bottom":"small","left":"large","right":"large"}},"parentName":"ListContainer","propertyName":"items","index":0},
      // Contract filter: native lookup selection reloads the Items collection.
      {"operation":"insert","name":"VMContractFilter","values":{"type":"crt.QuickFilter","filterType":"lookup","config":{"caption":"Contract","icon":"filter-column-icon","iconPosition":"left-icon","entitySchemaName":"UsrMCITContract"},"_filterOptions":{"expose":[{"attribute":"VMContractFilter_Items","converters":[{"converter":"crt.QuickFilterAttributeConverter","args":[{"target":{"viewAttributeName":"Items","filterColumn":"UsrContract"},"quickFilterType":"lookup"}]}]}],"from":"VMContractFilter_Value"}},"parentName":"VMQuickFilters","propertyName":"items","index":0},
      // Status filter: native lookup selection reloads the Items collection.
      {"operation":"insert","name":"VMStatusFilter","values":{"type":"crt.QuickFilter","filterType":"lookup","config":{"caption":"Status","icon":"filter-column-icon","iconPosition":"left-icon","entitySchemaName":"UsrMCITVMStatus"},"_filterOptions":{"expose":[{"attribute":"VMStatusFilter_Items","converters":[{"converter":"crt.QuickFilterAttributeConverter","args":[{"target":{"viewAttributeName":"Items","filterColumn":"UsrStatus"},"quickFilterType":"lookup"}]}]}],"from":"VMStatusFilter_Value"}},"parentName":"VMQuickFilters","propertyName":"items","index":1},
      // Project filter: native lookup selection reloads the Items collection.
      {"operation":"insert","name":"VMProjectFilter","values":{"type":"crt.QuickFilter","filterType":"lookup","config":{"caption":"Project","icon":"filter-column-icon","iconPosition":"left-icon","entitySchemaName":"UsrProject"},"_filterOptions":{"expose":[{"attribute":"VMProjectFilter_Items","converters":[{"converter":"crt.QuickFilterAttributeConverter","args":[{"target":{"viewAttributeName":"Items","filterColumn":"UsrProject"},"quickFilterType":"lookup"}]}]}],"from":"VMProjectFilter_Value"}},"parentName":"VMQuickFilters","propertyName":"items","index":2}
    ]/**SCHEMA_VIEW_CONFIG_DIFF*/,
    // 2. Bind native collection/filter attributes to the real entity fields.
    viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
      {"operation":"merge","path":["attributes"],"values":{"HeaderCaption":{"value":"Virtual Machines"},"Items_PredefinedFilter":{"value":{"items":{"CreatedByCurrentContact":{"filterType":1,"comparisonType":3,"isEnabled":true,"leftExpression":{"expressionType":0,"columnPath":"CreatedBy"},"rightExpression":{"expressionType":1,"functionType":1,"macrosType":2},"dataValueType":10}},"logicalOperation":0,"isEnabled":true,"filterType":6,"rootSchemaName":"UsrVirtualMachine"}},"VMContractFilter_Value":{"value":null},"VMContractFilter_Items":{"value":{"items":{},"logicalOperation":0,"isEnabled":true,"filterType":6,"rootSchemaName":"UsrVirtualMachine"}},"VMStatusFilter_Value":{"value":null},"VMStatusFilter_Items":{"value":{"items":{},"logicalOperation":0,"isEnabled":true,"filterType":6,"rootSchemaName":"UsrVirtualMachine"}},"VMProjectFilter_Value":{"value":null},"VMProjectFilter_Items":{"value":{"items":{},"logicalOperation":0,"isEnabled":true,"filterType":6,"rootSchemaName":"UsrVirtualMachine"}}}},
      {"operation":"merge","path":["attributes","Items"],"values":{"modelConfig":{"path":"PDS","pagingConfig":{"rowCount":30},"sortingConfig":{"attributeName":"ItemsSorting","default":[{"columnName":"UsrName","direction":"asc"}]},"filterAttributes":[{"name":"FolderTree_active_folder_filter","loadOnChange":true},{"name":"Items_PredefinedFilter","loadOnChange":true},{"name":"LookupQuickFilterByTag_Items","loadOnChange":true},{"name":"SearchFilter_Items","loadOnChange":true},{"name":"Filters_Filter","loadOnChange":true},{"name":"VMContractFilter_Items","loadOnChange":true},{"name":"VMStatusFilter_Items","loadOnChange":true},{"name":"VMProjectFilter_Items","loadOnChange":true}]}}},
      {"operation":"merge","path":["attributes","Items","viewModelConfig","attributes"],"values":{"PDS_Id":{"modelConfig":{"path":"PDS.Id"}},"PDS_UsrVMCode":{"modelConfig":{"path":"PDS.UsrVMCode"}},"PDS_UsrName":{"modelConfig":{"path":"PDS.UsrName"}},"PDS_UsrSourceRequestItem_UsrRequest":{"modelConfig":{"path":"PDS.UsrSourceRequestItem.UsrRequest"}},"PDS_UsrAccount":{"modelConfig":{"path":"PDS.UsrAccount"}},"PDS_UsrContract":{"modelConfig":{"path":"PDS.UsrContract"}},"PDS_UsrProject":{"modelConfig":{"path":"PDS.UsrProject"}},"PDS_UsrEnvironment":{"modelConfig":{"path":"PDS.UsrEnvironment"}},"PDS_UsrIPAddress":{"modelConfig":{"path":"PDS.UsrIPAddress"}},"PDS_UsrVIP":{"modelConfig":{"path":"PDS.UsrVIP"}},"PDS_UsrCPU":{"modelConfig":{"path":"PDS.UsrCPU"}},"PDS_UsrRAMGB":{"modelConfig":{"path":"PDS.UsrRAMGB"}},"PDS_UsrStorageGB":{"modelConfig":{"path":"PDS.UsrStorageGB"}},"PDS_UsrStatus":{"modelConfig":{"path":"PDS.UsrStatus"}},"PDS_UsrZone":{"modelConfig":{"path":"PDS.UsrZone"}},"PDS_UsrProvisionedOn":{"modelConfig":{"path":"PDS.UsrProvisionedOn"}}}}
    ]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
    // 3. PDS must name a published object; both pages now use canonical inventory.
    modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
      {"operation":"merge","path":["dataSources","PDS","config"],"values":{"entitySchemaName":"UsrVirtualMachine"}}
    ]/**SCHEMA_MODEL_CONFIG_DIFF*/,
    // 4. Standard Creatio handlers perform native list operations.
    handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
    converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
    validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
  };
});
