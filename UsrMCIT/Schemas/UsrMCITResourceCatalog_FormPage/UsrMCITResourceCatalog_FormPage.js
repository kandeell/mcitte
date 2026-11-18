define("UsrMCITResourceCatalog_FormPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
  {
    "operation": "insert",
    "name": "Name",
    "values": {
      "layoutConfig": {
        "column": 1,
        "row": 1,
        "colSpan": 1,
        "rowSpan": 1
      },
      "type": "crt.Input",
      "label": "$Resources.Strings.Name",
      "control": "$Name",
      "labelPosition": "auto"
    },
    "parentName": "SideAreaProfileContainer",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "merge",
    "name": "AttachmentList",
    "values": {
      "type": "crt.FileList",
      "masterRecordColumnValue": "$Id",
      "recordColumnName": "RecordId",
      "layoutConfig": {
        "colSpan": 2,
        "column": 1,
        "row": 1,
        "rowSpan": 6
      },
      "items": "$AttachmentList",
      "primaryColumnName": "AttachmentListDS_Id",
      "columns": [
        {
          "id": "a2cabb99-bfa5-46cc-b44f-8ca4d204ec16",
          "code": "AttachmentListDS_Name",
          "caption": "#ResourceString(AttachmentListDS_Name)#",
          "dataValueType": 28,
          "width": 200
        }
      ],
      "viewType": "gallery",
      "tileSize": "small"
    },
    "parentName": "AttachmentsTabContainer",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "merge",
    "name": "Feed",
    "values": {
      "type": "crt.Feed",
      "feedType": "Record",
      "primaryColumnValue": "$Id",
      "cardState": "$CardState",
      "dataSourceName": "PDS",
      "entitySchemaName": "UsrMCITResourceType"
    },
    "parentName": "FeedTabContainer",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrMigrationUsrCode",
    "values": {
      "type": "crt.Input",
      "label": "$Resources.Strings.UsrMigration_UsrMigrationUsrCode_label",
      "control": "$PDS_UsrCode",
      "labelPosition": "auto",
      "layoutConfig": {
        "column": 1,
        "row": 2,
        "colSpan": 1,
        "rowSpan": 1
      }
    },
    "parentName": "SideAreaProfileContainer",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "UsrMigrationUsrUnit",
    "values": {
      "type": "crt.Input",
      "label": "$Resources.Strings.UsrMigration_UsrMigrationUsrUnit_label",
      "control": "$PDS_UsrUnit",
      "labelPosition": "auto",
      "layoutConfig": {
        "column": 1,
        "row": 3,
        "colSpan": 1,
        "rowSpan": 1
      }
    },
    "parentName": "SideAreaProfileContainer",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "UsrMigrationUsrActive",
    "values": {
      "type": "crt.Checkbox",
      "label": "$Resources.Strings.UsrMigration_UsrMigrationUsrActive_label",
      "control": "$PDS_UsrActive",
      "labelPosition": "auto",
      "layoutConfig": {
        "column": 1,
        "row": 4,
        "colSpan": 1,
        "rowSpan": 1
      }
    },
    "parentName": "SideAreaProfileContainer",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "UsrMigrationUsrCategory",
    "values": {
      "type": "crt.ComboBox",
      "label": "$Resources.Strings.UsrMigration_UsrMigrationUsrCategory_label",
      "control": "$PDS_UsrCategory",
      "labelPosition": "auto",
      "layoutConfig": {
        "column": 1,
        "row": 5,
        "colSpan": 1,
        "rowSpan": 1
      },
      "listActions": [],
      "showValueAsLink": false,
      "controlActions": [],
      "enableNewValue": false
    },
    "parentName": "SideAreaProfileContainer",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "UsrMigrationUsrArabicName",
    "values": {
      "type": "crt.Input",
      "label": "$Resources.Strings.UsrMigration_UsrMigrationUsrArabicName_label",
      "control": "$PDS_UsrArabicName",
      "labelPosition": "auto",
      "layoutConfig": {
        "column": 1,
        "row": 1,
        "colSpan": 1,
        "rowSpan": 1
      }
    },
    "parentName": "GeneralInfoTabContainer",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "UsrMigrationDescription",
    "values": {
      "type": "crt.Input",
      "label": "$Resources.Strings.UsrMigration_UsrMigrationDescription_label",
      "control": "$PDS_Description",
      "labelPosition": "auto",
      "layoutConfig": {
        "column": 2,
        "row": 1,
        "colSpan": 1,
        "rowSpan": 1
      }
    },
    "parentName": "GeneralInfoTabContainer",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "UsrMigrationUsrMinValue",
    "values": {
      "type": "crt.NumberInput",
      "label": "$Resources.Strings.UsrMigration_UsrMigrationUsrMinValue_label",
      "control": "$PDS_UsrMinValue",
      "labelPosition": "auto",
      "layoutConfig": {
        "column": 1,
        "row": 2,
        "colSpan": 1,
        "rowSpan": 1
      }
    },
    "parentName": "GeneralInfoTabContainer",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "UsrMigrationUsrMaxValue",
    "values": {
      "type": "crt.NumberInput",
      "label": "$Resources.Strings.UsrMigration_UsrMigrationUsrMaxValue_label",
      "control": "$PDS_UsrMaxValue",
      "labelPosition": "auto",
      "layoutConfig": {
        "column": 2,
        "row": 2,
        "colSpan": 1,
        "rowSpan": 1
      }
    },
    "parentName": "GeneralInfoTabContainer",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "UsrMigrationUsrIncrement",
    "values": {
      "type": "crt.NumberInput",
      "label": "$Resources.Strings.UsrMigration_UsrMigrationUsrIncrement_label",
      "control": "$PDS_UsrIncrement",
      "labelPosition": "auto",
      "layoutConfig": {
        "column": 1,
        "row": 3,
        "colSpan": 1,
        "rowSpan": 1
      }
    },
    "parentName": "GeneralInfoTabContainer",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "UsrMigrationUsrAllContracts",
    "values": {
      "type": "crt.Checkbox",
      "label": "$Resources.Strings.UsrMigration_UsrMigrationUsrAllContracts_label",
      "control": "$PDS_UsrAllContracts",
      "labelPosition": "auto",
      "layoutConfig": {
        "column": 2,
        "row": 3,
        "colSpan": 1,
        "rowSpan": 1
      }
    },
    "parentName": "GeneralInfoTabContainer",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "UsrMigrationUsrStartDate",
    "values": {
      "type": "crt.DateTimePicker",
      "label": "$Resources.Strings.UsrMigration_UsrMigrationUsrStartDate_label",
      "control": "$PDS_UsrStartDate",
      "labelPosition": "auto",
      "layoutConfig": {
        "column": 1,
        "row": 4,
        "colSpan": 1,
        "rowSpan": 1
      },
      "pickerType": "date"
    },
    "parentName": "GeneralInfoTabContainer",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "UsrMigrationUsrEndDate",
    "values": {
      "type": "crt.DateTimePicker",
      "label": "$Resources.Strings.UsrMigration_UsrMigrationUsrEndDate_label",
      "control": "$PDS_UsrEndDate",
      "labelPosition": "auto",
      "layoutConfig": {
        "column": 2,
        "row": 4,
        "colSpan": 1,
        "rowSpan": 1
      },
      "pickerType": "date"
    },
    "parentName": "GeneralInfoTabContainer",
    "propertyName": "items",
    "index": 12
  }
]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfig: /**SCHEMA_VIEW_MODEL_CONFIG*/{
  "attributes": {
    "Name": {
      "modelConfig": {
        "path": "PDS.Name"
      }
    },
    "Id": {
      "modelConfig": {
        "path": "PDS.Id"
      }
    },
    "PDS_UsrCode": {
      "modelConfig": {
        "path": "PDS.UsrCode"
      }
    },
    "PDS_UsrUnit": {
      "modelConfig": {
        "path": "PDS.UsrUnit"
      }
    },
    "PDS_UsrActive": {
      "modelConfig": {
        "path": "PDS.UsrActive"
      }
    },
    "PDS_UsrCategory": {
      "modelConfig": {
        "path": "PDS.UsrCategory"
      }
    },
    "PDS_UsrArabicName": {
      "modelConfig": {
        "path": "PDS.UsrArabicName"
      }
    },
    "PDS_Description": {
      "modelConfig": {
        "path": "PDS.Description"
      }
    },
    "PDS_UsrMinValue": {
      "modelConfig": {
        "path": "PDS.UsrMinValue"
      }
    },
    "PDS_UsrMaxValue": {
      "modelConfig": {
        "path": "PDS.UsrMaxValue"
      }
    },
    "PDS_UsrIncrement": {
      "modelConfig": {
        "path": "PDS.UsrIncrement"
      }
    },
    "PDS_UsrAllContracts": {
      "modelConfig": {
        "path": "PDS.UsrAllContracts"
      }
    },
    "PDS_UsrStartDate": {
      "modelConfig": {
        "path": "PDS.UsrStartDate"
      }
    },
    "PDS_UsrEndDate": {
      "modelConfig": {
        "path": "PDS.UsrEndDate"
      }
    }
  }
}/**SCHEMA_VIEW_MODEL_CONFIG*/,
		modelConfig: /**SCHEMA_MODEL_CONFIG*/{
			"dataSources": {
				"PDS": {
					"type": "crt.EntityDataSource",
					"config": {
						"entitySchemaName": "UsrMCITResourceType"
					},
					"scope": "page"
				},
				"AttachmentListDS": {
					"type": "crt.EntityDataSource",
					"scope": "viewElement",
					"config": {
						"entitySchemaName": "SysFile",
						"attributes": {
							"Name": {
								"path": "Name"
							}
						}
					}
				}
			},
			"primaryDataSourceName": "PDS"
		}/**SCHEMA_MODEL_CONFIG*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
