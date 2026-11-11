/*
  MCIT Portal / My Requests — Figma Layout V3 — purple actions, full-page navigation (2026-11-03)
  2026-11-08: Page size = 6, matching Figma. Client table + PDS paging + Prev/Next use same constant.
  2026-11-10 V7: Archive tab; active list hides UsrIsArchived=true and archived list shows
  only archived records. Same UsrVMRequest object, no deletion or status mutation.
  Existing object: UsrVMRequest. Package: UsrMCIT.
  Native template chrome hidden; custom designer-visible crt.* components.
  Table rows use crt.TemplateList backed by $Items (PDS).
  No database writes, no sample records, no new objects, no business process.
  IMPORTANT: Backup current schema; paste into UsrMyRequests_ListPage Source code.
  Security: server-side Creatio record permissions are still mandatory.
  Request Type filters the actual UsrVMRequest.UsrRequestType lookup when it exists; no object is created by this script.
  SLA, Source and Stage are still deferred.
  Navigation: custom FULL Freedom UI pages; no default form fallback.
  TARGET SCHEMAS MUST be created in Page Designer before the buttons can navigate.
  2026-11-04 V5: Runtime HTML table prevents TemplateList lookup/button binding failure.
  2026-11-04 V7 (based on V6): Robust delegated status-filter clicks after refresh/remount; direct
  list filtering; correct government authority lookup; export reloads PDS.
  Missing UsrNumber shows a provisional display ID only; use server-side numbering to persist.
  Security: never creates records/edits numbers from the list view.
  Loaded records: CreatedBy = current Contact OR Account = Contact.Account (legacy).
  Creatio object/record permissions remain authoritative; do not trust client-only filters.
  UsrMCITNewRequest_WizardPage = full page for new/edit; UsrMCITRequestDetail_Page = full detail page.
*/
define("UsrMyRequests_ListPage", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
    // Pagination: six real requests per page, matching MCIT Figma.
    const PAGE_SIZE = 6;
    // Creatio persists the archive flag on the SAME UsrVMRequest record.
    // The native Page Designer configuration remains JSON5-safe and unchanged.
    const ARCHIVE_FIELD = "UsrIsArchived";
    const isArchivedRecord = record => {
        const value = record?.UsrIsArchived;
        return value === true || value === 1 ||
            (typeof value === "string" && /^(true|1|yes)$/i.test(value.trim()));
    };

    // Same Page Designer isolation used by UsrMCITRequestDetail_Page.
    // Keep the existing crt.* layout editable in the native designer, while
    // enabling the Figma DOM enhancements / scoped queries only at runtime.
    function isPageDesigner() {
        if (typeof window === "undefined") return true;
        const route = /(?:PageDesigner|FreedomUIPageDesigner)/i;
        try { if (route.test(String(document?.referrer || ""))) return true; } catch (_) {}
        let current = window;
        for (let i = 0; i < 8 && current; i++) {
            try {
                if (route.test(String(current.location?.href || ""))) return true;
                if (!current.parent || current.parent === current) break;
                current = current.parent;
            } catch (_) { break; }
        }
        return false;
    }

    return {
        viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
        {
                "operation": "merge",
                "name": "TitleContainer",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "ActionButtonsContainer",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "MainFilterContainer",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "LeftFilterContainer",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "RightFilterContainer",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "FolderTree",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "DataTable",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "DataImportButton",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "AddButton",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "Dashboards",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "Filters",
                "values": {
                        "visible": false
                }
        },
        {
                "operation": "merge",
                "name": "MenuItem_ImportFromExcel",
                "values": {
                        "clicked": {
                                "request": "crt.ImportDataRequest",
                                "params": {
                                        "entitySchemaName": "UsrVMRequest"
                                }
                        }
                }
        },
        {
                "operation": "merge",
                "name": "FolderTree",
                "values": {
                        "rootSchemaName": "UsrVMRequest"
                }
        },
        {
                "operation": "merge",
                "name": "DataTable",
                "values": {
                        "primaryColumnName": "PDS_Id",
                        "columns": [
                                {
                                        "id": "84c29a71-3fa5-4a91-8e20-5a7fc939b106",
                                        "code": "PDS_UsrNumber",
                                        "caption": "Request ID",
                                        "dataValueType": 1
                                },
                                {
                                        "id": "84c29a71-3fa5-4a91-8e20-5a7fc939b107",
                                        "code": "PDS_UsrName",
                                        "caption": "Title",
                                        "dataValueType": 1
                                },
                                {
                                        "id": "84c29a71-3fa5-4a91-8e20-5a7fc939b108",
                                        "code": "PDS_UsrContract",
                                        "caption": "Contract",
                                        "dataValueType": 10
                                },
                                {
                                        "id": "84c29a71-3fa5-4a91-8e20-5a7fc939b109",
                                        "code": "PDS_UsrAccount",
                                        "caption": "Authority",
                                        "dataValueType": 10
                                },
                                {
                                        "id": "84c29a71-3fa5-4a91-8e20-5a7fc939b110",
                                        "code": "PDS_UsrProject",
                                        "caption": "Project",
                                        "dataValueType": 10
                                },
                                {
                                        "id": "84c29a71-3fa5-4a91-8e20-5a7fc939b111",
                                        "code": "PDS_CreatedOn",
                                        "caption": "Created",
                                        "dataValueType": 7
                                },
                                {
                                        "id": "84c29a71-3fa5-4a91-8e20-5a7fc939b112",
                                        "code": "PDS_UsrStatus",
                                        "caption": "Status",
                                        "dataValueType": 10
                                }
                        ]
                }
        },
        {
                "operation": "merge",
                "name": "MainContainer",
                "values": {
                        "classes": [
                                "usr-mr-main-container"
                        ]
                }
        },
        {
                "operation": "merge",
                "name": "SectionContentWrapper",
                "values": {
                        "classes": [
                                "usr-mr-content-wrapper"
                        ]
                }
        },
        {
                "operation": "insert",
                "name": "UsrMRRoot",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "column",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "stretch",
                        "gap": "none",
                        "visible": true,
                        "classes": [
                                "usr-mr-root"
                        ]
                },
                "parentName": "SectionContentWrapper",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRHeader",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "row",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "center",
                        "gap": "small",
                        "visible": true,
                        "classes": [
                                "usr-mr-header"
                        ],
                        "justifyContent": "space-between"
                },
                "parentName": "UsrMRRoot",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRHeading",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "column",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": true,
                        "alignItems": "flex-start",
                        "gap": "none",
                        "visible": true,
                        "classes": [
                                "usr-mr-heading"
                        ]
                },
                "parentName": "UsrMRHeader",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRTitle",
                "values": {
                        "type": "crt.Label",
                        "caption": "My Requests",
                        "labelType": "body",
                        "labelThickness": "bold",
                        "classes": [
                                "usr-mr-page-title"
                        ]
                },
                "parentName": "UsrMRHeading",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRSubtitle",
                "values": {
                        "type": "crt.Label",
                        "caption": "$UsrMRSubtitleText",
                        "labelType": "body",
                        "labelThickness": "default",
                        "classes": [
                                "usr-mr-subtitle"
                        ]
                },
                "parentName": "UsrMRHeading",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMRTopActions",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "row",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": true,
                        "alignItems": "center",
                        "gap": "small",
                        "visible": true,
                        "classes": [
                                "usr-mr-top-actions"
                        ]
                },
                "parentName": "UsrMRHeader",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMRExport",
                "values": {
                        "type": "crt.Button",
                        "caption": "Export to Excel",
                        "color": "default",
                        "size": "medium",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "crt.ExportDataGridToExcelRequest",
                                "params": {
                                        "viewName": "DataTable"
                                }
                        },
                        "classes": [
                                "usr-mr-export-button"
                        ]
                },
                "parentName": "UsrMRTopActions",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRNew",
                "values": {
                        "type": "crt.Button",
                        "caption": "+  New Request",
                        "color": "accent",
                        "size": "medium",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRNewRequest"
                        },
                        "classes": [
                                "usr-mr-new-button"
                        ]
                },
                "parentName": "UsrMRTopActions",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMRAlert",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "row",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "center",
                        "gap": "small",
                        "visible": "$UsrMRHasCorrection",
                        "classes": [
                                "usr-mr-alert"
                        ],
                        "justifyContent": "space-between"
                },
                "parentName": "UsrMRRoot",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMRAlertCaption",
                "values": {
                        "type": "crt.Label",
                        "caption": "$UsrMRAlertText",
                        "labelType": "body",
                        "labelThickness": "default",
                        "classes": [
                                "usr-mr-alert-text"
                        ]
                },
                "parentName": "UsrMRAlert",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRShowCorrections",
                "values": {
                        "type": "crt.Button",
                        "caption": "Show",
                        "color": "default",
                        "size": "medium",
                        "iconPosition": "only-text",
                        "displayType": "text",
                        "clicked": {
                                "request": "usr.MRSelectStatus",
                                "params": {
                                        "status": "Requires Correction"
                                }
                        },
                        "classes": [
                                "usr-mr-alert-link"
                        ]
                },
                "parentName": "UsrMRAlert",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMRFiltersCard",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "column",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "stretch",
                        "gap": "small",
                        "visible": true,
                        "classes": [
                                "usr-mr-filters-card"
                        ]
                },
                "parentName": "UsrMRRoot",
                "propertyName": "items",
                "index": 2
        },
        {
                "operation": "insert",
                "name": "UsrMRFilterMount",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "row",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "center",
                        "gap": "small",
                        "visible": true,
                        "classes": [
                                "usr-mr-filter-mount"
                        ]
                },
                "parentName": "UsrMRFiltersCard",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRStatusBar",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "row",
                        "wrap": "wrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "center",
                        "gap": "small",
                        "visible": true,
                        "classes": [
                                "usr-mr-status-bar"
                        ]
                },
                "parentName": "UsrMRFiltersCard",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMRStatusAll",
                "values": {
                        "type": "crt.Button",
                        "caption": "$UsrMRCountAll",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRSelectStatus",
                                "params": {
                                        "status": ""
                                }
                        },
                        "classes": [
                                "usr-mr-status-button",
                                "usr-mr-status-all"
                        ]
                },
                "parentName": "UsrMRStatusBar",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRStatusDraft",
                "values": {
                        "type": "crt.Button",
                        "caption": "$UsrMRCountDraft",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRSelectStatus",
                                "params": {
                                        "status": "Draft"
                                }
                        },
                        "classes": [
                                "usr-mr-status-button",
                                "usr-mr-status-draft"
                        ]
                },
                "parentName": "UsrMRStatusBar",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMRStatusCorrection",
                "values": {
                        "type": "crt.Button",
                        "caption": "$UsrMRCountCorrection",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRSelectStatus",
                                "params": {
                                        "status": "Requires Correction"
                                }
                        },
                        "classes": [
                                "usr-mr-status-button",
                                "usr-mr-status-correction"
                        ]
                },
                "parentName": "UsrMRStatusBar",
                "propertyName": "items",
                "index": 2
        },
        {
                "operation": "insert",
                "name": "UsrMRStatusSubmitted",
                "values": {
                        "type": "crt.Button",
                        "caption": "$UsrMRCountSubmitted",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRSelectStatus",
                                "params": {
                                        "status": "Submitted"
                                }
                        },
                        "classes": [
                                "usr-mr-status-button",
                                "usr-mr-status-submitted"
                        ]
                },
                "parentName": "UsrMRStatusBar",
                "propertyName": "items",
                "index": 3
        },
        {
                "operation": "insert",
                "name": "UsrMRStatusReview",
                "values": {
                        "type": "crt.Button",
                        "caption": "$UsrMRCountReview",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRSelectStatus",
                                "params": {
                                        "status": "Under TE Review"
                                }
                        },
                        "classes": [
                                "usr-mr-status-button",
                                "usr-mr-status-review"
                        ]
                },
                "parentName": "UsrMRStatusBar",
                "propertyName": "items",
                "index": 4
        },
        {
                "operation": "insert",
                "name": "UsrMRStatusProvisioning",
                "values": {
                        "type": "crt.Button",
                        "caption": "$UsrMRCountProvisioning",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRSelectStatus",
                                "params": {
                                        "status": "Provisioning in Progress"
                                }
                        },
                        "classes": [
                                "usr-mr-status-button",
                                "usr-mr-status-provisioning"
                        ]
                },
                "parentName": "UsrMRStatusBar",
                "propertyName": "items",
                "index": 5
        },
        {
                "operation": "insert",
                "name": "UsrMRStatusCompleted",
                "values": {
                        "type": "crt.Button",
                        "caption": "$UsrMRCountCompleted",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRSelectStatus",
                                "params": {
                                        "status": "Completed"
                                }
                        },
                        "classes": [
                                "usr-mr-status-button",
                                "usr-mr-status-completed"
                        ]
                },
                "parentName": "UsrMRStatusBar",
                "propertyName": "items",
                "index": 6
        },
        {
                "operation": "insert",
                "name": "UsrMRStatusRejected",
                "values": {
                        "type": "crt.Button",
                        "caption": "$UsrMRCountRejected",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRSelectStatus",
                                "params": {
                                        "status": "Rejected"
                                }
                        },
                        "classes": [
                                "usr-mr-status-button",
                                "usr-mr-status-rejected"
                        ]
                },
                "parentName": "UsrMRStatusBar",
                "propertyName": "items",
                "index": 7
        },
        {
                "operation": "insert",
                "name": "UsrMRTableCard",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "column",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "stretch",
                        "gap": "none",
                        "visible": true,
                        "classes": [
                                "usr-mr-table-card"
                        ]
                },
                "parentName": "UsrMRRoot",
                "propertyName": "items",
                "index": 3
        },
        {
                "operation": "insert",
                "name": "UsrMRTableViewport",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "column",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "stretch",
                        "gap": "none",
                        "visible": true,
                        "classes": [
                                "usr-mr-table-viewport"
                        ]
                },
                "parentName": "UsrMRTableCard",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRTableHead",
                "values": {
                        "type": "crt.GridContainer",
                        "classes": [
                                "usr-mr-grid",
                                "usr-mr-table-head"
                        ],
                        "columns": [
                                "minmax(94px, 7fr)",
                                "minmax(70px, 5fr)",
                                "minmax(194px, 18fr)",
                                "minmax(104px, 9fr)",
                                "minmax(125px, 10fr)",
                                "minmax(118px, 10fr)",
                                "minmax(60px, 5fr)",
                                "minmax(104px, 8fr)",
                                "minmax(104px, 8fr)",
                                "minmax(104px, 9fr)",
                                "minmax(132px, 10fr)",
                                "minmax(86px, 7fr)",
                                "minmax(106px, 10fr)"
                        ],
                        "rows": "minmax(max-content, 42px)",
                        "gap": {
                                "columnGap": "small",
                                "rowGap": "none"
                        },
                        "fitContent": false,
                        "alignItems": "center",
                        "items": [
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 1,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Request ID",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-req"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 2,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Source",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-source"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 3,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Title",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-title"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 4,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Contract",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-contract"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 5,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Authority",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-authority"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 6,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Project",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-project"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 7,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Items",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-items"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 8,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Created",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-created"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 9,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Submitted",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-submitted"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 10,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Stage",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-stage"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 11,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Status",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-status"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 12,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "SLA",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-sla"
                                        ]
                                },
                                {
                                        "type": "crt.Label",
                                        "layoutConfig": {
                                                "column": 13,
                                                "row": 1,
                                                "colSpan": 1,
                                                "rowSpan": 1
                                        },
                                        "caption": "Actions",
                                        "labelType": "caption",
                                        "labelThickness": "bold",
                                        "classes": [
                                                "usr-mr-th",
                                                "usr-mr-th-actions"
                                        ]
                                }
                        ],
                        "padding": {
                                "top": "small",
                                "right": "small",
                                "bottom": "small",
                                "left": "small"
                        }
                },
                "parentName": "UsrMRTableViewport",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRRecords",
                "values": {
                        "type": "crt.TemplateList",
                        "classes": [
                                "usr-mr-records"
                        ],
                        "items": "$Items",
                        "template": [
                                {
                                        "type": "crt.GridContainer",
                                        "classes": "$Items.PDS_Id | usr.MRRowClass",
                                        "columns": [
                                                "minmax(94px, 7fr)",
                                                "minmax(70px, 5fr)",
                                                "minmax(194px, 18fr)",
                                                "minmax(104px, 9fr)",
                                                "minmax(125px, 10fr)",
                                                "minmax(118px, 10fr)",
                                                "minmax(60px, 5fr)",
                                                "minmax(104px, 8fr)",
                                                "minmax(104px, 8fr)",
                                                "minmax(104px, 9fr)",
                                                "minmax(132px, 10fr)",
                                                "minmax(86px, 7fr)",
                                                "minmax(106px, 10fr)"
                                        ],
                                        "rows": "minmax(max-content, 56px)",
                                        "gap": {
                                                "columnGap": "small",
                                                "rowGap": "none"
                                        },
                                        "fitContent": false,
                                        "alignItems": "center",
                                        "padding": {
                                                "top": "small",
                                                "right": "small",
                                                "bottom": "small",
                                                "left": "small"
                                        },
                                        "items": [
                                                {
                                                        "type": "crt.Button",
                                                        "layoutConfig": {
                                                                "column": 1,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "$Items.PDS_UsrNumber",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-request"
                                                        ],
                                                        "displayType": "text",
                                                        "color": "accent",
                                                        "size": "small",
                                                        "iconPosition": "only-text",
                                                        "clicked": {
                                                                "request": "usr.MROpenRecord",
                                                                "params": {
                                                                        "recordId": "$Items.PDS_Id",
                                                                        "mode": "view"
                                                                }
                                                        }
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 2,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "—",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-source"
                                                        ],
                                                        "labelType": "body"
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 3,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "$Items.PDS_UsrName",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-title"
                                                        ],
                                                        "labelType": "body",
                                                        "labelThickness": "bold"
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 4,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "$Items.PDS_UsrContract | usr.MRLookup",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-contract"
                                                        ],
                                                        "labelType": "body"
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 5,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "$Items.PDS_UsrAccount | usr.MRLookup",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-authority"
                                                        ],
                                                        "labelType": "body"
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 6,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "$Items.PDS_UsrProject | usr.MRLookup",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-project"
                                                        ],
                                                        "labelType": "body"
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 7,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "$Items.PDS_Id | usr.MRItemsCount",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-items"
                                                        ],
                                                        "labelType": "body"
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 8,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "$Items.PDS_CreatedOn | usr.MRDate",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-created"
                                                        ],
                                                        "labelType": "body"
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 9,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "$Items.PDS_Id | usr.MRSubmittedDate",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-submitted"
                                                        ],
                                                        "labelType": "body"
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 10,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "—",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-stage"
                                                        ],
                                                        "labelType": "body"
                                                },
                                                {
                                                        "type": "crt.FlexContainer",
                                                        "layoutConfig": {
                                                                "column": 11,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "classes": "$Items.PDS_UsrStatus | usr.MRStatusClass",
                                                        "direction": "row",
                                                        "fitContent": true,
                                                        "alignItems": "center",
                                                        "items": [
                                                                {
                                                                        "type": "crt.Label",
                                                                        "caption": "$Items.PDS_UsrStatus | usr.MRStatusText",
                                                                        "labelType": "body"
                                                                }
                                                        ]
                                                },
                                                {
                                                        "type": "crt.Label",
                                                        "layoutConfig": {
                                                                "column": 12,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "caption": "—",
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-sla"
                                                        ],
                                                        "labelType": "body"
                                                },
                                                {
                                                        "type": "crt.FlexContainer",
                                                        "layoutConfig": {
                                                                "column": 13,
                                                                "row": 1,
                                                                "colSpan": 1,
                                                                "rowSpan": 1
                                                        },
                                                        "classes": [
                                                                "usr-mr-cell",
                                                                "usr-mr-col-actions"
                                                        ],
                                                        "direction": "row",
                                                        "alignItems": "center",
                                                        "fitContent": true,
                                                        "gap": "small",
                                                        "items": [
                                                                {
                                                                        "type": "crt.Button",
                                                                        "caption": "View",
                                                                        "color": "accent",
                                                                        "displayType": "text",
                                                                        "size": "small",
                                                                        "iconPosition": "only-text",
                                                                        "classes": [
                                                                                "usr-mr-view-action"
                                                                        ],
                                                                        "clicked": {
                                                                                "request": "usr.MROpenRecord",
                                                                                "params": {
                                                                                        "recordId": "$Items.PDS_Id",
                                                                                        "mode": "view"
                                                                                }
                                                                        }
                                                                },
                                                                {
                                                                        "type": "crt.Button",
                                                                        "caption": "Edit",
                                                                        "color": "default",
                                                                        "displayType": "text",
                                                                        "size": "small",
                                                                        "iconPosition": "only-text",
                                                                        "visible": "$Items.PDS_UsrStatus | usr.MRCanEdit",
                                                                        "classes": [
                                                                                "usr-mr-edit-action"
                                                                        ],
                                                                        "clicked": {
                                                                                "request": "usr.MROpenRecord",
                                                                                "params": {
                                                                                        "recordId": "$Items.PDS_Id",
                                                                                        "mode": "edit"
                                                                                }
                                                                        }
                                                                }
                                                        ]
                                                }
                                        ]
                                }
                        ],
                        "direction": "column",
                        "gap": 0
                },
                "parentName": "UsrMRTableViewport",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMREmpty",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "column",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "center",
                        "gap": "small",
                        "visible": true,
                        "classes": [
                                "usr-mr-empty"
                        ]
                },
                "parentName": "UsrMRTableCard",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMREmptyIcon",
                "values": {
                        "type": "crt.Label",
                        "caption": "▤",
                        "labelType": "body",
                        "labelThickness": "default",
                        "classes": [
                                "usr-mr-empty-icon"
                        ]
                },
                "parentName": "UsrMREmpty",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMREmptyTitle",
                "values": {
                        "type": "crt.Label",
                        "caption": "No requests found",
                        "labelType": "body",
                        "labelThickness": "bold",
                        "classes": [
                                "usr-mr-empty-title"
                        ]
                },
                "parentName": "UsrMREmpty",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMREmptySub",
                "values": {
                        "type": "crt.Label",
                        "caption": "Requests for your authority will appear here when created.",
                        "labelType": "body",
                        "labelThickness": "default",
                        "classes": [
                                "usr-mr-empty-sub"
                        ]
                },
                "parentName": "UsrMREmpty",
                "propertyName": "items",
                "index": 2
        },
        {
                "operation": "insert",
                "name": "UsrMRFooter",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "row",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": false,
                        "alignItems": "center",
                        "gap": "small",
                        "visible": true,
                        "classes": [
                                "usr-mr-footer"
                        ],
                        "justifyContent": "space-between"
                },
                "parentName": "UsrMRTableCard",
                "propertyName": "items",
                "index": 2
        },
        {
                "operation": "insert",
                "name": "UsrMRShowing",
                "values": {
                        "type": "crt.Label",
                        "caption": "$UsrMRFooterText",
                        "labelType": "body",
                        "labelThickness": "default",
                        "classes": [
                                "usr-mr-showing"
                        ]
                },
                "parentName": "UsrMRFooter",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRPages",
                "values": {
                        "type": "crt.FlexContainer",
                        "direction": "row",
                        "wrap": "nowrap",
                        "items": [],
                        "fitContent": true,
                        "alignItems": "center",
                        "gap": "small",
                        "visible": true,
                        "classes": [
                                "usr-mr-pages"
                        ]
                },
                "parentName": "UsrMRFooter",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMRPrev",
                "values": {
                        "type": "crt.Button",
                        "caption": "← Prev",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRChangePage",
                                "params": {
                                        "step": -1
                                }
                        },
                        "classes": [
                                "usr-mr-page-control"
                        ]
                },
                "parentName": "UsrMRPages",
                "propertyName": "items",
                "index": 0
        },
        {
                "operation": "insert",
                "name": "UsrMRPageNumber",
                "values": {
                        "type": "crt.Label",
                        "caption": "$UsrMRPageLabel",
                        "labelType": "body",
                        "labelThickness": "default",
                        "classes": [
                                "usr-mr-page-current"
                        ]
                },
                "parentName": "UsrMRPages",
                "propertyName": "items",
                "index": 1
        },
        {
                "operation": "insert",
                "name": "UsrMRNext",
                "values": {
                        "type": "crt.Button",
                        "caption": "Next →",
                        "color": "default",
                        "size": "small",
                        "iconPosition": "only-text",
                        "displayType": "contained",
                        "clicked": {
                                "request": "usr.MRChangePage",
                                "params": {
                                        "step": 1
                                }
                        },
                        "classes": [
                                "usr-mr-page-control"
                        ]
                },
                "parentName": "UsrMRPages",
                "propertyName": "items",
                "index": 2
        }
]/**SCHEMA_VIEW_CONFIG_DIFF*/,
        viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
        {
                "operation": "merge",
                "path": [
                        "attributes",
                        "Items",
                        "viewModelConfig",
                        "attributes"
                ],
                "values": {
                        "PDS_UsrNumber": {
                                "modelConfig": {
                                        "path": "PDS.UsrNumber"
                                }
                        },
                        "PDS_UsrName": {
                                "modelConfig": {
                                        "path": "PDS.UsrName"
                                }
                        },
                        "PDS_UsrContract": {
                                "modelConfig": {
                                        "path": "PDS.UsrContract"
                                }
                        },
                        "PDS_UsrAccount": {
                                "modelConfig": {
                                        "path": "PDS.UsrAccount"
                                }
                        },
                        "PDS_UsrProject": {
                                "modelConfig": {
                                        "path": "PDS.UsrProject"
                                }
                        },
                        "PDS_CreatedOn": {
                                "modelConfig": {
                                        "path": "PDS.CreatedOn"
                                }
                        },
                        "PDS_UsrStatus": {
                                "modelConfig": {
                                        "path": "PDS.UsrStatus"
                                }
                        }
                }
        },
        {
                "operation": "merge",
                "path": [
                        "attributes"
                ],
                "values": {
                        "UsrMRAuthorityId": {
                                "value": "00000000-0000-0000-0000-000000000000"
                        },
                        "UsrMRAuthorityName": {
                                "value": ""
                        },
                        "UsrMRContactId": {
                                "value": "00000000-0000-0000-0000-000000000000"
                        },
                        "UsrMRSelectedStatus": {
                                "value": ""
                        },
                        "UsrMRSelectedContractId": {
                                "value": ""
                        },
                        "UsrMRSelectedTypeId": {
                                "value": ""
                        },
                        "UsrMRSearchText": {
                                "value": ""
                        },
                        "UsrMRPageOffset": {
                                "value": 0
                        },
                        "UsrMRPageSize": {
                                "value": 6
                        },
                        "UsrMRPageLabel": {
                                "value": "1"
                        },
                        "UsrMRFooterText": {
                                "value": "Showing 0 of 0 requests"
                        },
                        "UsrMRSubtitleText": {
                                "value": "Loading authority requests…"
                        },
                        "UsrMRHasCorrection": {
                                "value": false
                        },
                        "UsrMRAlertText": {
                                "value": ""
                        },
                        "UsrMRCountAll": {
                                "value": "All 0"
                        },
                        "UsrMRCountDraft": {
                                "value": "Draft 0"
                        },
                        "UsrMRCountCorrection": {
                                "value": "Requires Correction 0"
                        },
                        "UsrMRCountSubmitted": {
                                "value": "Submitted 0"
                        },
                        "UsrMRCountReview": {
                                "value": "Under TE Review 0"
                        },
                        "UsrMRCountProvisioning": {
                                "value": "Provisioning 0"
                        },
                        "UsrMRCountCompleted": {
                                "value": "Completed 0"
                        },
                        "UsrMRCountRejected": {
                                "value": "Rejected 0"
                        }
                }
        },
        {
                "operation": "merge",
                "path": [
                        "attributes",
                        "Items",
                        "modelConfig",
                        "pagingConfig"
                ],
                "values": {
                        "rowsOffset": "UsrMRPageOffset",
                        "rowCount": 6
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
                        "entitySchemaName": "UsrVMRequest",
                        "attributes": {
                                "UsrNumber": {
                                        "path": "UsrNumber"
                                },
                                "UsrName": {
                                        "path": "UsrName"
                                },
                                "UsrContract": {
                                        "path": "UsrContract"
                                },
                                "UsrAccount": {
                                        "path": "UsrAccount"
                                },
                                "UsrProject": {
                                        "path": "UsrProject"
                                },
                                "CreatedOn": {
                                        "path": "CreatedOn"
                                },
                                "UsrStatus": {
                                        "path": "UsrStatus"
                                }
                        }
                }
        }
]/**SCHEMA_MODEL_CONFIG_DIFF*/,

        // No top-level browser globals. The Page Designer can save this schema safely.
        handlers: /**SCHEMA_HANDLERS*/[
            {
                request: "crt.HandleViewModelInitRequest",
                handler: async (request, next) => {
                    if (isPageDesigner()) return next?.handle(request);
                    const result = await next?.handle(request);
                    const ctx = request.$context;
                    const ZERO = "00000000-0000-0000-0000-000000000000";
                    const id = x => String(x?.value ?? x?.Id ?? x?.id ?? x ?? "").toLowerCase();
                    const display = x => String(x?.displayValue ?? x?.Name ?? x?.name ?? x ?? "");
                    const compatible = group => ({...group, items: group.items});
                    const statuses = [
                        ["All", "All", ""], ["Draft", "Draft", "Draft"],
                        ["Correction", "Requires Correction", "Requires Correction"],
                        ["Submitted", "Submitted", "Submitted"],
                        ["Review", "Under TE Review", "Under TE Review"],
                        ["Provisioning", "Provisioning", "Provisioning in Progress"],
                        ["Completed", "Completed", "Completed"],
                        ["Rejected", "Rejected", "Rejected"]
                    ];
                    // Shared page lifecycle state: always dispose previous runtime listeners.
                    const key = "__usrMCITMyRequestsFigmaV2";
                    if (typeof document !== "undefined" && document[key]?.dispose) document[key].dispose();
                    const runtime = {context:ctx, disposed:false, authorityId:ZERO, contactId:ZERO, records:[],
                                     itemCounts:new Map(), itemCountsAvailable:false, submittedDates:new Map(), submissionSources:new Map(), submissionProcessCache:new Map(),
                                     stageChanges:new Map(), stageColumns:[],
                                     rowCount:0, statusCounts:{}, observer:null, clock:null,
                                     style:null, contractId:"", typeId:"", typeAvailable:false, requestTypes:[], search:"", status:"", pageOffset:0, capped:false, tableSignature:"", requestCodes:new Map(),
                                     archivedView:false, archiveAvailable:false};
                    if (typeof document !== "undefined") document[key]=runtime;
                    // New request stores the selected government Authority in UsrAccount.
                    // The previous Contact.Account-only filter would hide such requests.
                    // OR keeps owner-visible new requests plus historically scoped rows.
                    const scopeFor = async (prefix="") => {
                        const f = new sdk.FilterGroup();
                        f.logicalOperation = sdk.LogicalOperatorType.Or;
                        await f.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,
                            prefix+"CreatedBy",runtime.contactId);
                        if (runtime.authorityId!==ZERO) {
                            await f.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,
                                prefix+"UsrAccount",runtime.authorityId);
                        }
                        return {...f,items:f.items};
                    };
                    runtime.dispose = () => {
                        runtime.disposed = true;
                        if (runtime.observer) runtime.observer.disconnect();
                        if (runtime.clock) clearInterval(runtime.clock);
                        if (runtime.onRowClick && typeof document !== "undefined") document.removeEventListener("click",runtime.onRowClick);
                        if (runtime.onStatusClick && typeof document !== "undefined") document.removeEventListener("click",runtime.onStatusClick,true);
                        if (typeof document !== "undefined") {
                            document.querySelectorAll('.usr-mr-filter-live,.usr-mr-live-status,.usr-mr-live-toolbar,.usr-mr-live-table').forEach(el=>el.remove());
                        }
                    };
                    const refreshGrid = async () => {
                        if (runtime.disposed) return;
                        ctx.UsrMRPageOffset = runtime.pageOffset;
                        // Render directly from authority-scoped SDK data. Native TemplateList
                        // in this Creatio build drops the status and nested action controls.
                        runtime.renderRows?.();
                        // Preserve legacy PDS synchronization for Export-to-Excel only.
                        // A PDS binding failure must not empty the visible list.
                        try {
                            await ctx.executeRequest({type:"crt.LoadDataRequest",$context:ctx,
                                dataSourceName:"PDS",config:{loadType:"reload",useLastLoadParameters:false}});
                        } catch (e) { console.warn('MCIT native export grid refresh failed', e); }
                        runtime.decorate();
                    };
                    runtime.refreshGrid=refreshGrid;
                    // Base filters are shared by the table and the status counters.
                    // Status is applied afterwards so selecting a status does not zero the other badges.
                    runtime.baseFiltered = () => {
                        const q=(runtime.search || "").trim().toLocaleLowerCase();
                        return runtime.records.filter(r => {
                            // Default is Active requests only. Archived remain in the SAME
                            // database table, but are shown only in the Archived view.
                            if (isArchivedRecord(r) !== runtime.archivedView) return false;
                            if (runtime.contractId && id(r.UsrContract)!==runtime.contractId) return false;
                            if (runtime.typeId && (!runtime.typeAvailable || id(r.UsrRequestType)!==runtime.typeId)) return false;
                            if (!q) return true;
                            const text=[r.UsrNumber,r.UsrName,display(r.UsrAuthority||r.UsrAccount),display(r.UsrProject)]
                                .join(" ").toLocaleLowerCase();
                            return text.includes(q);
                        });
                    };
                    runtime.filtered = () => runtime.baseFiltered().filter(r =>
                        !runtime.status || display(r.UsrStatus) === runtime.status);
                    runtime.updateLabels = () => {
                        const counts={};
                        const scoped=runtime.baseFiltered();
                        for(const r of scoped) {
                            const status=display(r.UsrStatus);
                            counts[status]=(counts[status]||0)+1;
                        }
                        for(const [keyName,label,status] of statuses) {
                            ctx['UsrMRCount'+keyName]=label+' '+(status ? (counts[status]||0):scoped.length)
                                +(runtime.capped ? '+' : '');
                        }
                        const total=runtime.filtered().length;
                        const page= Math.floor(runtime.pageOffset/PAGE_SIZE)+1;
                        ctx.UsrMRPageLabel=String(page);
                        ctx.UsrMRFooterText=total ?
                            ('Showing '+(runtime.pageOffset+1)+'–'+Math.min(runtime.pageOffset+PAGE_SIZE,total)+' of '+total+(runtime.capped?'+':'')+' requests'):
                            'Showing 0 of 0 requests';
                        ctx.UsrMRSubtitleText=scoped.length+(runtime.archivedView?' archived':' active')+
                            ' requests across your authority'+(runtime.capped?' (minimum)':'');
                        const correction=scoped.filter(r=>display(r.UsrStatus)==='Requires Correction').length;
                        ctx.UsrMRHasCorrection=correction>0;
                        ctx.UsrMRAlertText='⚠  Action Required: '+correction+
                            (correction===1?' request has':' requests have')+
                            ' been returned for correction. Review TE comments and resubmit.';
                        runtime.mountStatus?.();
                        runtime.paintArchiveSwitch?.();
                    };
                    // Archive and active requests are alternate views over the same
                    // persisted records. Preserve status/type/contract/search controls.
                    runtime.selectArchiveView = async archived => {
                        if(runtime.disposed || (archived && !runtime.archiveAvailable))return;
                        const nextArchived=!!archived;
                        if(runtime.archivedView===nextArchived)return;
                        runtime.archivedView=nextArchived;
                        runtime.status="";
                        ctx.UsrMRSelectedStatus="";
                        runtime.pageOffset=0;
                        ctx.UsrMRPageOffset=0;
                        runtime.tableSignature="";
                        runtime.updateLabels();
                        runtime.paintArchiveSwitch?.();
                        await refreshGrid();
                    };
                    // V6: Status is an in-memory filter on the already permission-scoped SDK rows.
                    // IMPORTANT: Do not invoke a PDS reload on every chip click. On some Creatio
                    // builds that reload replaces runtime DOM nodes and leaves controls unclickable.
                    runtime.selectStatus = (newStatus) => {
                        if (runtime.disposed) return;
                        runtime.status = String(newStatus || "");
                        ctx.UsrMRSelectedStatus = runtime.status;
                        runtime.pageOffset = 0;
                        ctx.UsrMRPageOffset = 0;
                        runtime.updateLabels();
                        runtime.renderRows?.();
                        runtime.mountStatus?.();
                    };
                    runtime.apply = async () => {
                        runtime.pageOffset=0;
                        runtime.status=await ctx.UsrMRSelectedStatus || "";
                        runtime.search=await ctx.UsrMRSearchText || "";
                        runtime.contractId=await ctx.UsrMRSelectedContractId || "";
                        runtime.typeId=runtime.typeAvailable ? (await ctx.UsrMRSelectedTypeId || "") : "";
                        runtime.updateLabels();
                        await refreshGrid();
                        runtime.decorate();
                    };
                    runtime.decorate = () => {
                        if(typeof document==='undefined' || runtime.disposed) return;
                        const root=document.querySelector('.usr-mr-root');
                        if(!root) return;
                        const rows=[...root.querySelectorAll('.usr-mr-data-row')];
                        const empty=root.querySelector('.usr-mr-empty');
                        if(empty) empty.style.display=rows.length?'none':'flex';
                        // VM item counts are bound to a native label converter.
                        // Avoid mutating the DOM of crt.Label (Shadow DOM unsafe).
                        for(const [keyName, ,st] of statuses) {
                            const el=root.querySelector('.usr-mr-status-'+keyName.toLowerCase());
                            if(el) el.classList.toggle('usr-mr-active',runtime.status===st);
                        }
                        runtime.mountStatus?.();
                        runtime.renderRows?.();
                    };
                    const safeDateForHistory=value=>{
                        if(!value)return null;
                        const d=value instanceof Date?value:new Date(value);
                        return Number.isFinite(d.getTime())?d:null;
                    };
                    runtime.recount=async () => {
                        runtime.records=[];runtime.capped=false;runtime.itemCounts.clear();
                        runtime.itemCountsAvailable=false;runtime.submittedDates.clear();runtime.submissionSources.clear();runtime.stageChanges.clear();
                        runtime.requestCodes.clear();runtime.tableSignature="";
                        if (runtime.contactId===ZERO) {runtime.updateLabels();return;}
                        const flt=await scopeFor();
                        const model=await sdk.Model.create('UsrVMRequest');
                        // Avoid querying an undefined column. When the customer adds the lookup
                        // UsrVMRequest.UsrRequestType, this dropdown becomes active automatically.
                        runtime.typeAvailable=false;
                        try {
                            await model.load({attributes:['Id','UsrRequestType'],
                                parameters:[{type:sdk.ModelParameterType.Filter,value:compatible(flt)}],
                                options:{pagingConfig:{rowsOffset:0,rowCount:1}}});
                            runtime.typeAvailable=true;
                        }catch(error){
                            console.warn('MCIT Request Type filter inactive: add UsrRequestType lookup to UsrVMRequest',error);
                            runtime.typeId='';ctx.UsrMRSelectedTypeId='';
                        }
                        if(runtime.typeAvailable){
                            try {
                                const tm=await sdk.Model.create('UsrMCITRequestType');
                                runtime.requestTypes=await tm.load({attributes:['Id','Name'],
                                    options:{pagingConfig:{rowsOffset:0,rowCount:100}}})||[];
                            }catch(error){
                                runtime.typeAvailable=false;runtime.requestTypes=[];
                                runtime.typeId='';ctx.UsrMRSelectedTypeId='';
                                console.warn('MCIT Request Types lookup unavailable',error);
                            }
                        }
                        // Non-breaking optional fields: rollout does not require a database migration
                        // to keep the current My Requests page functional.
                        const supportsColumn=async column=>{
                            try {
                                await model.load({attributes:['Id',column],
                                    parameters:[{type:sdk.ModelParameterType.Filter,value:compatible(flt)}],
                                    options:{pagingConfig:{rowsOffset:0,rowCount:1}}});
                                return true;
                            }catch(e){return false;}
                        };
                        runtime.stageColumns=[];
                        runtime.archiveAvailable=await supportsColumn(ARCHIVE_FIELD);
                        if(!runtime.archiveAvailable){
                            runtime.archivedView=false;
                            console.warn("MCIT: Archive view unavailable. Publish UsrVMRequest.UsrIsArchived (Boolean, default false).");
                        }
                        // Optional real date/time field. Do not infer submission from CreatedOn or ModifiedOn.
                        // Add UsrSubmittedOn (Date/Time) to UsrVMRequest and populate from the
                        // process at the first Submitted transition. Keep older schema compatible.
                        runtime.submissionDateColumn = '';
                        for (const col of ['UsrSubmittedOn','UsrSubmittedAt','UsrSubmittedDate']) {
                            if(await supportsColumn(col)) {runtime.submissionDateColumn=col;break;}
                        }
                        for (const col of ['UsrStage','UsrStageStartedOn','UsrSLADeadline','UsrSLADueOn','UsrSlaDeadline']) {
                            if(await supportsColumn(col)) runtime.stageColumns.push(col);
                        }
                        const LIMIT=10000, SIZE=250;
                        for(let offset=0;offset<LIMIT;offset+=SIZE){
                            const attrs=['Id','UsrNumber','UsrName','UsrAccount','UsrAuthority','UsrProject','UsrContract','UsrStatus','CreatedOn'];
                            if(runtime.archiveAvailable)attrs.push(ARCHIVE_FIELD);
                            attrs.push(...runtime.stageColumns);
                            if(runtime.submissionDateColumn) attrs.push(runtime.submissionDateColumn);
                            if(runtime.typeAvailable)attrs.push('UsrRequestType');
                            const data=await model.load({attributes:attrs,
                                parameters:[{type:sdk.ModelParameterType.Filter,value:compatible(flt)}],
                                options:{pagingConfig:{rowsOffset:offset,rowCount:SIZE}}});
                            if(!data?.length)break;
                            runtime.records.push(...data);
                            // Persisted submission timestamp takes precedence over audit/history.
                            // This also covers when a process changes Submitted -> Under TE Review
                            // before My Requests first loads.
                            if(runtime.submissionDateColumn){
                                for(const record of data){
                                    const stamp=safeDateForHistory(record[runtime.submissionDateColumn]);
                                    const key=id(record.Id);
                                    if(key && stamp){runtime.submittedDates.set(key,stamp);runtime.submissionSources.set(key,'Saved submission timestamp');}
                                }
                            }
                            if(data.length<SIZE)break;
                            if(offset+SIZE>=LIMIT)runtime.capped=true;
                        }
                        // Real child-VM counts: only query the existing UsrRequest relation.
                        // A failure must not interrupt loading the requests list.
                        if(runtime.records.length){
                            try{
                                const iff=await scopeFor('UsrRequest.');
                                const im=await sdk.Model.create('UsrVMRequestItem');
                                for(let offset=0;offset<10000;offset+=250){
                                    const batch=await im.load({attributes:['Id','UsrRequest'],
                                        parameters:[{type:sdk.ModelParameterType.Filter,value:compatible(iff)}],
                                        options:{pagingConfig:{rowsOffset:offset,rowCount:250}}});
                                    if(!batch?.length)break;
                                    for(const item of batch){
                                        const rid=id(item.UsrRequest);
                                        if(rid)runtime.itemCounts.set(rid,(runtime.itemCounts.get(rid)||0)+1);
                                    }
                                    if(batch.length<250)break;
                                }
                                runtime.itemCountsAvailable=true;
                            } catch(err){console.warn('MCIT: VM item count unavailable',err);}
                        }
                        // Submitted is the earliest true Submitted transition in status history.
                        try {
                            const hf=await scopeFor('UsrRequest.');
                            const hm=await sdk.Model.create('UsrRequestStatusHistory');
                            for(let offset=0;offset<10000;offset+=250){
                                const batch=await hm.load({attributes:['Id','UsrRequest','UsrNewStatus','UsrChangedOn'],
                                    parameters:[{type:sdk.ModelParameterType.Filter,value:compatible(hf)}],
                                    options:{pagingConfig:{rowsOffset:offset,rowCount:250}}});
                                if(!batch?.length)break;
                                for(const event of batch){
                                    const rid=id(event.UsrRequest);
                                    const statusName=display(event.UsrNewStatus).trim();
                                    const changed=safeDateForHistory(event.UsrChangedOn);
                                    if(rid && statusName && changed){
                                        const prev=runtime.stageChanges.get(rid);
                                        if(!prev || changed>prev.date)
                                            runtime.stageChanges.set(rid,{status:statusName,date:changed});
                                    }
                                    if(rid && display(event.UsrNewStatus)==='Submitted' && event.UsrChangedOn){
                                        const date=new Date(event.UsrChangedOn);
                                        const last=runtime.submittedDates.get(rid);
                                        // A persisted field is canonical. History is for
                                        // legacy requests without a persisted timestamp only.
                                        if(!Number.isNaN(date.getTime()) && !runtime.records.some(r=>
                                            id(r.Id)===rid && runtime.submissionDateColumn &&
                                            safeDateForHistory(r[runtime.submissionDateColumn])) && (!last || date<last))
                                            {runtime.submittedDates.set(rid,date);runtime.submissionSources.set(rid,'Submitted status history');}
                                    }
                                }
                                if(batch.length<250)break;
                            }
                        }catch(err){console.warn('MCIT: Submitted date history unavailable',err);}
                        // Cache successful process-derived timestamps between automatic
                        // 60-second refreshes. A missing process is rechecked every 5 minutes.
                        const cacheNow=Date.now();
                        for(const rec of runtime.records){
                            const rid=id(rec.Id),cached=runtime.submissionProcessCache.get(rid);
                            if(cached && cached.expires>cacheNow && cached.date &&
                                !runtime.submittedDates.has(rid)){
                                runtime.submittedDates.set(rid,cached.date);
                                runtime.submissionSources.set(rid,'Linked submission process start (approximate)');
                            }
                        }
                        // Existing installation changes Submitted to Under TE Review immediately.
                        // When a dedicated submitted timestamp and status-history table do not
                        // exist, use only a *linked submission process* StartDate as evidence.
                        // This timestamp is the process start, not a fabricated exact click time.
                        const missing = runtime.records.filter(r=>!runtime.submittedDates.has(id(r.Id)) &&
                            (!runtime.submissionProcessCache.has(id(r.Id)) ||
                              runtime.submissionProcessCache.get(id(r.Id)).expires<=cacheNow) &&
                            !['Draft','Requires Correction'].includes(display(r.UsrStatus)));
                        if(missing.length && missing.length<=150){
                            const linked=async rec=>{
                                const rid=id(rec.Id);
                                try{
                                    const pm=await sdk.Model.create('SysProcessEntity');
                                    const pf=new sdk.FilterGroup();
                                    await pf.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,'EntityId',rid);
                                    const ties=await pm.load({attributes:['SysProcessId'],
                                        parameters:[{type:sdk.ModelParameterType.Filter,value:compatible(pf)}],
                                        options:{pagingConfig:{rowsOffset:0,rowCount:25}}})||[];
                                    const seen=new Set();
                                    for(const tie of ties){
                                        const pid=id(tie.SysProcessId);
                                        if(!pid || seen.has(pid))continue;seen.add(pid);
                                        const sm=await sdk.Model.create('SysProcessLog');
                                        const logs=await sm.load({attributes:['Id','Name','StartDate'],
                                            parameters:[{type:sdk.ModelParameterType.PrimaryColumnValue,value:pid}],
                                            options:{pagingConfig:{rowsOffset:0,rowCount:1}}})||[];
                                        const log=logs[0];
                                        if(!log || !/vm request submission|submit.*vm request/i.test(display(log.Name)))continue;
                                        const dt=safeDateForHistory(log.StartDate);
                                        if(dt && (!safeDateForHistory(rec.CreatedOn) || dt>=safeDateForHistory(rec.CreatedOn))){
                                            const existing=runtime.submittedDates.get(rid);
                                            if(!existing || dt<existing){
                                                runtime.submittedDates.set(rid,dt);
                                                runtime.submissionSources.set(rid,'Linked submission process start (approximate)');
                                            }
                                        }
                                    }
                                }catch(err){console.info('MCIT: submission process log unavailable for request',rid,err?.message||err);}
                                runtime.submissionProcessCache.set(rid,{
                                    date:runtime.submittedDates.get(rid)||null,
                                    expires:Date.now()+5*60000});
                            };
                            for(let i=0;i<missing.length;i+=5)await Promise.all(missing.slice(i,i+5).map(linked));
                        }
                        // Native Freedom UI approvals are stored in SysApproval.
                        // Their CreatedOn indicates that review was requested, not the
                        // exact time the user clicked Submit. Mark this fallback ≈.
                        const noSubmit=runtime.records.filter(r=>!runtime.submittedDates.has(id(r.Id)) &&
                            !['Draft','Requires Correction'].includes(display(r.UsrStatus)));
                        if(noSubmit.length && noSubmit.length<=150){
                            const queryApproval=async record=>{
                                const rid=id(record.Id);
                                try{
                                    const f=new sdk.FilterGroup();
                                    await f.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,'EntityId',rid);
                                    const am=await sdk.Model.create('SysApproval');
                                    const rows=await am.load({attributes:['Id','CreatedOn'],
                                        parameters:[{type:sdk.ModelParameterType.Filter,value:compatible(f)}],
                                        options:{pagingConfig:{rowsOffset:0,rowCount:100}}})||[];
                                    const dates=rows.map(row=>safeDateForHistory(row.CreatedOn)).filter(Boolean)
                                        .filter(t=>!safeDateForHistory(record.CreatedOn) || t>=safeDateForHistory(record.CreatedOn))
                                        .sort((a,b)=>a-b);
                                    if(dates.length && !runtime.submittedDates.has(rid)){
                                        runtime.submittedDates.set(rid,dates[0]);
                                        runtime.submissionSources.set(rid,'Approximate: first native approval CreatedOn (NOT exact Submit time)');
                                    }
                                }catch(err){console.info('MCIT: approval timestamp unavailable',rid,err?.message||err);}
                            };
                            for(let i=0;i<noSubmit.length;i+=5)
                                await Promise.all(noSubmit.slice(i,i+5).map(queryApproval));
                        }
                        runtime.rebuildRequestCodes();
                        runtime.updateLabels();runtime.decorate();
                    };
                    // Figma live table V5. Built from the exact records that drive status counters.
                    // All untrusted text is set via textContent (not injected as HTML).
                    // Do not issue database writes from a read-only list view.
                    const safeDate = value => {
                        if (!value) return null;
                        const date = value instanceof Date ? value : new Date(value);
                        return Number.isNaN(date.getTime()) ? null : date;
                    };
                    const fmtDate = value => {
                        const date = safeDate(value);
                        if (!date) return '—';
                        const y = date.getFullYear();
                        const m = String(date.getMonth() + 1).padStart(2, '0');
                        const d = String(date.getDate()).padStart(2, '0');
                        return `${y}-${m}-${d}`;
                    };
                    // An actual timestamp, not only a date. Never use CreatedOn or
                    // ModifiedOn as a fabricated submission time. Egypt is the project TZ.
                    const fmtSubmitted = (value,source) => {
                        const stamp=safeDate(value);
                        if(!stamp)return '—';
                        const result=new Intl.DateTimeFormat('en-GB',{
                            timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',
                            hour:'2-digit',minute:'2-digit',hour12:false
                        }).format(stamp);
                        return /approx|process start|approval created/i.test(source||'') ? '≈ '+result : result;
                    };
                    const realStatus = item => display(item?.UsrStatus).trim() || '—';
                    const stageName = record => {
                        const status=realStatus(record);
                        // Do not keep displaying a stale TE Review stage on terminal statuses.
                        // The process must update status, and ideally UsrStage, after task completion.
                        if(status==='Completed'||status==='Rejected')
                            return {name:status,derived:true};
                        const stored=display(record.UsrStage).trim();
                        if(stored && stored!=='—') return {name:stored, derived:false};
                        const stages={
                            'Draft':'Request Created', 'Submitted':'Submitted',
                            'Requires Correction':'Returned for Correction',
                            'Under TE Review':'TE Review',
                            'Provisioning in Progress':'Manual Provisioning',
                            'Completed':'Completed', 'Rejected':'Rejected'
                        };
                        return {name:stages[status]||status, derived:true};
                    };
                    const currentStageStart = record => {
                        const stamped=safeDateForHistory(record.UsrStageStartedOn);
                        if(stamped)return stamped;
                        const event=runtime.stageChanges.get(realId(record));
                        // Only use the latest matching status transition, not CreatedOn or
                        // ModifiedOn: either would give wrong SLA remaining time.
                        return event?.status===realStatus(record)?event.date:null;
                    };
                    const slaInfo = record => {
                        const status=realStatus(record).toLowerCase();
                        if(status==='draft'||status==='rejected')return {text:'—',mode:'na',hint:'No active SLA for this request status'};
                        if(status==='completed')return {text:'Closed',mode:'closed',hint:'Request completed; refer to the recorded stage deadline for SLA compliance'};
                        // There is no universal 24-hour SLA in the customer's SRS.
                        // Only display a countdown when the process/configuration saved an
                        // actual deadline on the request. Never compute an invented default.
                        const deadline=safeDateForHistory(record.UsrSLADeadline) ||
                            safeDateForHistory(record.UsrSLADueOn) ||
                            safeDateForHistory(record.UsrSlaDeadline);
                        if(!deadline)return {text:'Not set',mode:'unknown',
                            hint:'No persisted SLA deadline. Configure the stage SLA business process to write UsrSLADeadline on UsrVMRequest.'};
                        const hours=(deadline.getTime()-Date.now())/3600000;
                        const left=Math.abs(hours);
                        const text=(left<1?Math.max(1,Math.ceil(left*60))+'m':Math.ceil(left)+'h')+
                            (hours<0?' overdue':' left');
                        return {text,mode:hours<0?'overdue':hours<=6?'warning':'ontrack',
                            hint:'Configured SLA deadline: '+deadline.toLocaleString('en-GB',{timeZone:'Africa/Cairo'})+' (Cairo time)'};
                    };

                    const realId = item => id(item?.Id);
                    const rowsByDate = items => [...items].sort((a,b) => {
                        const aD = safeDate(a.CreatedOn)?.getTime() || 0;
                        const bD = safeDate(b.CreatedOn)?.getTime() || 0;
                        return bD - aD || realId(a).localeCompare(realId(b));
                    });
                    runtime.rebuildRequestCodes = () => {
                        runtime.requestCodes.clear();
                        const grouped = new Map();
                        for (const record of runtime.records) {
                            const year = String(safeDate(record.CreatedOn)?.getFullYear() || new Date().getFullYear());
                            if (!grouped.has(year)) grouped.set(year, []);
                            grouped.get(year).push(record);
                        }
                        for (const [year, group] of grouped) {
                            // Provisional visual sequence only. Must not be used as a server ID.
                            group.sort((a,b) =>
                                (safeDate(a.CreatedOn)?.getTime() || 0) -
                                (safeDate(b.CreatedOn)?.getTime() || 0) ||
                                realId(a).localeCompare(realId(b)));
                            group.forEach((record,index) => {
                                const raw = String(record.UsrNumber ?? '').trim();
                                let code;
                                if (/^REQ-\d{4}-\d+$/i.test(raw)) code = raw.toUpperCase();
                                else if (/^\d+$/.test(raw)) code = 'REQ-' + year + '-' + raw.padStart(4,'0');
                                else if (/^REQ-\d+$/i.test(raw)) code = 'REQ-' + year + '-' + raw.substring(4).padStart(4,'0');
                                else if (raw) code = raw; // Never misrepresent an existing official code.
                                else code = 'REQ-' + year + '-' + String(index+1).padStart(4,'0');
                                runtime.requestCodes.set(realId(record), {code, provisional:!raw});
                            });
                        }
                    };
                    const makeElem = (tag, className, text) => {
                        const el=document.createElement(tag);
                        if(className)el.className=className;
                        if(text!==undefined&&text!==null)el.textContent=String(text);
                        return el;
                    };
                    const openRequest = (recordId, mode) => {
                        if (!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(recordId)) return;
                        ctx.executeRequest({type:'usr.MROpenRecord',$context:ctx,recordId,mode})
                            .catch(e=>console.error('MCIT request navigation failed',e));
                    };
                    runtime.renderRows = () => {
                        if (typeof document === 'undefined' || runtime.disposed) return;
                        const viewport = document.querySelector('.usr-mr-table-viewport');
                        if (!viewport) return;
                        let table = viewport.querySelector('.usr-mr-live-table');
                        if (!table) {
                            table=makeElem('table','usr-mr-live-table');
                            table.setAttribute('aria-label','My Requests');
                            const colgroup=makeElem('colgroup');
                            for(const width of [100,72,220,116,132,120,66,108,110,106,140,88,150]){
                                const col=makeElem('col');col.style.width=width+'px';colgroup.appendChild(col);
                            }
                            table.appendChild(colgroup);
                            const thead=makeElem('thead');const head=makeElem('tr');
                            for(const title of ['Request ID','Source','Title','Contract','Authority','Project',
                                'Items','Created','Submitted','Stage','Status','SLA','Actions']){
                                const th=makeElem('th','usr-mr-live-th',title);
                                th.scope='col';head.appendChild(th);
                            }
                            thead.appendChild(head);table.appendChild(thead);
                            table.appendChild(makeElem('tbody'));
                            viewport.appendChild(table);
                            runtime.tableSignature=''; // A recreated table needs a fresh render.
                        }
                        const items=rowsByDate(runtime.filtered());
                        const total=items.length;
                        if(runtime.pageOffset && runtime.pageOffset>=total){
                            runtime.pageOffset=Math.max(0,Math.floor((total-1)/PAGE_SIZE)*PAGE_SIZE);
                            ctx.UsrMRPageOffset=runtime.pageOffset;
                        }
                        const page=items.slice(runtime.pageOffset,runtime.pageOffset+PAGE_SIZE);
                        const signature=JSON.stringify({ids:page.map(r=>realId(r)),
                            statuses:page.map(realStatus),codes:page.map(r=>runtime.requestCodes.get(realId(r))?.code||r.UsrNumber),
                            counts:page.map(r=>runtime.itemCounts.get(realId(r))),
                            stages:page.map(r=>display(r.UsrStage)),
                            submitted:page.map(r=>runtime.submittedDates.get(realId(r))?.getTime()||0),
                            stageStarts:page.map(r=>currentStageStart(r)?.getTime()||0),
                            nowMinute:Math.floor(Date.now()/60000),
                            from:runtime.pageOffset,filter:runtime.status,search:runtime.search,
                            archived:runtime.archivedView,
                            contract:runtime.contractId,type:runtime.typeId});
                        if(runtime.tableSignature===signature && table.querySelector('tbody')) return;
                        runtime.tableSignature=signature;
                        const body=table.querySelector('tbody');
                        body.replaceChildren();
                        for(const record of page){
                            const rid=realId(record);
                            const status=realStatus(record);
                            const tr=makeElem('tr','usr-mr-live-row');
                            tr.dataset.recordId=rid;
                            const td=(node,cls) => {
                                const cell=makeElem('td',cls||'');
                                if(typeof node==='string')cell.textContent=node;
                                else if(node)cell.appendChild(node);
                                tr.appendChild(cell);
                                return cell;
                            };
                            const num = runtime.requestCodes.get(rid) || {code:'—',provisional:false};
                            const numberLink=makeElem('button','usr-mr-live-id',num.code);
                            numberLink.type='button';
                            if(num.provisional){
                                numberLink.title='Provisional display only: UsrNumber is blank. Configure server-side numbering to save a permanent ID.';
                                numberLink.classList.add('usr-mr-provisional');
                            }
                            numberLink.addEventListener('click', e=>{e.stopPropagation();openRequest(rid,'view');});
                            td(numberLink,'usr-mr-live-num-cell');
                            td('—'); // Source: not mapped yet.
                            const title=makeElem('div','usr-mr-live-title',record.UsrName || '—');
                            const titleCell=td(title,'usr-mr-live-title-cell');
                            if(record.UsrRequestType){
                                titleCell.appendChild(makeElem('div','usr-mr-live-subtitle',display(record.UsrRequestType)));
                            }
                            td(display(record.UsrContract)||'—');
                            td(display(record.UsrAuthority || record.UsrAccount)||'—'); // Government Account (legacy Authority bridge first).
                            td(display(record.UsrProject)||'—');
                            td(runtime.itemCountsAvailable?String(runtime.itemCounts.get(rid)||0):'—','usr-mr-live-item-count');
                            td(fmtDate(record.CreatedOn));
                            const submittedSource=runtime.submissionSources.get(rid)||'';
                            const submittedCell=td(fmtSubmitted(runtime.submittedDates.get(rid),submittedSource));
                            submittedCell.title=submittedSource||'Exact submission time not recorded. Set UsrSubmittedOn when the request is first submitted.';
                            const stage=stageName(record);
                            const stageCell=td(stage.name,'usr-mr-live-stage');
                            if(stage.derived)stageCell.title='Stage label derived from current Status; configure UsrStage for exact TE workflow stage.';
                            const statusKey = status.toLowerCase();
                            const statusColor=statusKey==='draft'?'draft':statusKey==='submitted'?'submitted':
                                statusKey.includes('review')?'review':statusKey.includes('correction')?'correction':
                                statusKey.includes('provision')?'provisioning':statusKey.includes('complet')?'completed':
                                statusKey.includes('reject')?'rejected':'default';
                            const badge=makeElem('span','usr-mr-live-badge usr-mr-live-badge-'+statusColor,
                                status==='Provisioning in Progress'?'Provisioning':status);
                            td(badge);
                            const sla=slaInfo(record);
                            const meter=makeElem('div','usr-mr-live-sla usr-mr-live-sla-'+sla.mode);
                            meter.title=sla.hint;
                            if(sla.mode!=='na'&&sla.mode!=='unknown'&&sla.mode!=='closed'){
                                const deadline=safeDateForHistory(record.UsrSLADeadline) ||
                                    safeDateForHistory(record.UsrSLADueOn) ||
                                    safeDateForHistory(record.UsrSlaDeadline);
                                const start=currentStageStart(record);
                                const fill=makeElem('span','usr-mr-live-sla-bar');
                                // Do not invent an SLA duration. Percentage requires both
                                // persisted entry time and deadline; text alone needs deadline.
                                if(start && deadline && deadline>start){
                                    const total=deadline.getTime()-start.getTime();
                                    const elapsed=Math.max(0,Math.min(total,Date.now()-start.getTime()));
                                    fill.style.width=(100*elapsed/total).toFixed(1)+'%';
                                }else fill.style.width='0%';
                                meter.appendChild(fill);
                            }
                            meter.appendChild(makeElem('span','usr-mr-live-sla-text',sla.text));
                            td(meter);
                            const actions=makeElem('div','usr-mr-live-actions');
                            const view=makeElem('button','usr-mr-live-action','View');
                            view.type='button';
                            view.addEventListener('click',e=>{e.stopPropagation();openRequest(rid,'view');});
                            actions.appendChild(view);
                            if(!runtime.archivedView && (statusKey==='draft'||statusKey==='requires correction')){
                                const edit=makeElem('button','usr-mr-live-action usr-mr-live-edit','Edit');
                                edit.type='button';
                                edit.addEventListener('click',e=>{e.stopPropagation();openRequest(rid,'edit');});
                                actions.appendChild(edit);
                            }
                            td(actions);
                            tr.addEventListener('click',e=>{
                                if(!e.target.closest('button,a,input,select,[role="button"]'))openRequest(rid,'view');
                            });
                            body.appendChild(tr);
                        }
                        // Keep the empty state fully inside the live table for stable height.
                        if(!page.length){
                            const emptyRow=makeElem('tr','usr-mr-live-empty-row');
                            const emptyCell=makeElem('td');emptyCell.colSpan=13;
                            const icon=makeElem('div','usr-mr-live-empty-icon','▤');
                            const heading=makeElem('div','usr-mr-live-empty-heading',
                                runtime.archivedView?'No archived requests':'No requests found');
                            const explanation=makeElem('div','usr-mr-live-empty-description',
                                runtime.archivedView?'Rejected requests you archive will appear here. They are not deleted.':
                                'Requests for your authority will appear here when created.');
                            emptyCell.append(icon,heading,explanation);
                            emptyRow.appendChild(emptyCell);body.appendChild(emptyRow);
                        }
                        const shown=total?
                            `Showing ${runtime.pageOffset+1}–${Math.min(runtime.pageOffset+PAGE_SIZE,total)} of ${total} requests`:
                            'Showing 0 of 0 requests';
                        ctx.UsrMRFooterText=shown;
                        ctx.UsrMRPageLabel=String(Math.floor(runtime.pageOffset/PAGE_SIZE)+1);
                    };
                    const makeStyle=() => {
                        if(typeof document==='undefined')return;
                        const previousStyle=document.getElementById('usr-mcit-mr-v2-style');
                        if(previousStyle)previousStyle.remove();
                        if(document.getElementById('usr-mcit-mr-v6-style'))return;
                        const style=document.createElement('style');
                        style.id='usr-mcit-mr-v6-style';
                        style.textContent=`
                            .usr-mr-main-container{background:#f6f5fa!important;}
                            .usr-mr-content-wrapper{overflow:visible!important;}
                            .usr-mr-root{box-sizing:border-box;width:min(100%,1180px)!important;max-width:1180px!important;
                                margin:0 auto!important;padding:18px 12px 28px!important;display:flex!important;gap:16px!important;
                                color:#15243c!important;font-family:Inter,Arial,sans-serif!important;}
                            .usr-mr-archive-switch{display:inline-flex!important;gap:2px!important;padding:3px!important;
                                border:1px solid #e4def1!important;border-radius:9px!important;background:#f8f6fc!important;}
                            .usr-mr-archive-tab{appearance:none!important;border:0!important;cursor:pointer!important;
                                background:transparent!important;color:#687286!important;border-radius:6px!important;
                                padding:6px 10px!important;font:650 11px Inter,Arial,sans-serif!important;white-space:nowrap!important;}
                            .usr-mr-archive-tab[aria-pressed="true"]{background:#6122b8!important;color:#fff!important;}
                            .usr-mr-archive-tab:disabled{opacity:.5!important;cursor:not-allowed!important;}
                            .usr-mr-archive-tab:focus-visible{outline:2px solid #8b5cf6!important;outline-offset:2px!important;}
                            .usr-mr-header{padding:4px 2px 0!important;align-items:center!important;gap:12px!important;}
                            .usr-mr-heading{align-items:flex-start!important;}
                            .usr-mr-page-title{font-size:19px!important;font-weight:750!important;color:#101c31!important;}
                            .usr-mr-subtitle{font-size:12px!important;color:#7a869e!important;margin-top:4px!important;}
                            .usr-mr-top-actions{gap:9px!important;}
                            .usr-mr-top-actions crt-button::part(button){border-radius:10px!important;min-height:35px!important;}
                            .usr-mr-new-button crt-button::part(button),crt-button.usr-mr-new-button::part(button){
                                background:#6318d9!important;color:white!important;}
                            .usr-mr-alert{border:1px solid #f9d968!important;background:#fffbeb!important;
                                border-radius:10px!important;padding:11px 14px!important;min-height:42px!important;}
                            .usr-mr-alert-text{color:#a04703!important;font-size:12px!important;}
                            .usr-mr-alert-link{color:#92400e!important;text-decoration:underline!important;}
                            .usr-mr-filters-card{box-sizing:border-box;background:#fff!important;border:1px solid #e4e5eb!important;
                                border-radius:14px!important;padding:13px 14px!important;gap:8px!important;min-height:98px!important;}
                            .usr-mr-filter-mount{display:block!important;width:100%!important;min-height:35px!important;}
                            .usr-mr-filter-live{display:grid;grid-template-columns:minmax(0,1fr) 138px 168px;gap:10px;width:100%;}
                            .usr-mr-filter-live input,.usr-mr-filter-live select{box-sizing:border-box;height:35px;width:100%;
                                border:1px solid #e1e4eb;background:#fafbfc;border-radius:10px;padding:0 12px;
                                font:12px Inter,Arial,sans-serif;color:#24354d;outline:none;}
                            .usr-mr-filter-live input:focus,.usr-mr-filter-live select:focus{border-color:#8a47f4;box-shadow:0 0 0 2px #efe7ff;}
                            .usr-mr-filter-live input{padding-left:29px;}
                            .usr-mr-search-wrap{position:relative;}
                            .usr-mr-search-wrap::before{content:'⌕';position:absolute;left:10px;top:5px;color:#9ba4b5;font-size:20px;}
                            .usr-mr-filter-live select:disabled{opacity:.58;cursor:not-allowed;}
                            .usr-mr-status-bar{gap:4px!important;row-gap:5px!important;}
                            .usr-mr-status-button{margin:0!important;}
                            .usr-mr-status-button::part(button){background:#f2f3f6!important;border:0!important;
                                border-radius:9px!important;color:#69748a!important;font-size:11px!important;
                                padding:5px 10px!important;min-height:27px!important;}
                            .usr-mr-status-button.usr-mr-active::part(button){background:#5a20b0!important;color:#fff!important;}
                            .usr-mr-table-card{background:#fff!important;border:1px solid #e2e4ea!important;
                                border-radius:14px!important;overflow:hidden!important;min-height:250px!important;}
                            .usr-mr-table-viewport{display:block!important;width:100%!important;overflow-x:auto!important;
                                overflow-y:hidden!important;max-width:100%!important;}
                            .usr-mr-grid{box-sizing:border-box;min-width:1600px!important;width:100%!important;
                                grid-template-columns:94px 70px 210px 104px 125px 118px 60px 104px 104px 104px 132px 86px 106px!important;}
                            .usr-mr-table-head{background:#fafafa!important;border-bottom:1px solid #edf0f4!important;min-height:47px!important;}
                            .usr-mr-th{color:#69758c!important;font-size:11px!important;font-weight:650!important;}
                            .usr-mr-data-row{background:#fff!important;border-bottom:1px solid #f0f0f2!important;min-height:55px!important;
                                cursor:pointer;transition:background .14s;}
                            .usr-mr-data-row:nth-child(even){background:#fbfbfc!important;}
                            .usr-mr-data-row:hover{background:#f5f1ff!important;}
                            .usr-mr-cell{font-size:11px!important;color:#35445d!important;line-height:1.35!important;}
                            .usr-mr-col-title{font-weight:650!important;color:#14243d!important;}
                            .usr-mr-col-request{color:#5d20b7!important;}
                            .usr-mr-col-request::part(button){color:#5d20b7!important;font-size:11px!important;font-weight:700!important;}
                            .usr-mr-col-actions crt-button::part(button){font-size:11px!important;color:#5d20b7!important;}
                            .usr-mr-col-items{font-weight:700!important;color:#14213c!important;}
                            .usr-mr-status-badge{border-radius:18px;padding:3px 7px!important;max-width:100%;font-size:11px!important;
                                background:#f1f2f4!important;color:#697587!important;white-space:normal;}
                            .usr-mr-badge-review{background:#f2edfc!important;color:#6515bb!important;}
                            .usr-mr-badge-provisioning,.usr-mr-badge-completed{background:#eafaf0!important;color:#008c4d!important;}
                            .usr-mr-badge-correction{background:#fff7e5!important;color:#c36900!important;}
                            .usr-mr-badge-rejected{background:#fff1f1!important;color:#dd2424!important;}
                            .usr-mr-empty{min-height:250px!important;justify-content:center!important;gap:4px!important;align-items:center!important;}
                            .usr-mr-empty-icon{color:#9271e2!important;font-size:35px!important;}
                            .usr-mr-empty-title{font-size:14px!important;font-weight:700!important;color:#23304b!important;}
                            .usr-mr-empty-sub{font-size:12px!important;color:#8993a8!important;text-align:center!important;}
                            .usr-mr-footer{padding:10px 13px!important;border-top:1px solid #e9ebf0!important;min-height:40px!important;}
                            .usr-mr-showing{font-size:11px!important;color:#728099!important;}
                            .usr-mr-pages{gap:5px!important;}
                            .usr-mr-page-current{background:#5920a9!important;color:#fff!important;border-radius:4px!important;
                                padding:4px 9px!important;font-size:11px!important;}
                            .usr-mr-page-control::part(button){background:#fff!important;color:#697589!important;
                                border:1px solid #e2e5ea!important;font-size:11px!important;min-height:25px!important;}
                            /* V3: actual DOM-native HTML buttons prevent environment accent from turning green. */
                            .usr-mr-top-actions .usr-mr-export-button,
                            .usr-mr-top-actions .usr-mr-new-button{display:none!important;}
                            .usr-mr-live-toolbar{display:flex!important;gap:9px!important;align-items:center!important;justify-content:flex-end!important;}
                            .usr-mr-live-toolbar button{font:600 12px Inter,Arial,sans-serif!important;border-radius:10px!important;
                                height:35px!important;min-height:35px!important;padding:0 15px!important;cursor:pointer!important;
                                transition:filter .13s ease,background .13s ease!important;box-shadow:none!important;}
                            .usr-mr-live-toolbar button:focus-visible,.usr-mr-status-chip:focus-visible{
                                outline:2px solid #9e6efa!important;outline-offset:2px!important;}
                            .usr-mr-live-toolbar button:hover{filter:brightness(.96)!important;}
                            .usr-mr-live-export{background:#fff!important;color:#20304b!important;border:1px solid #e1e3ea!important;}
                            .usr-mr-live-new{background:#6318d9!important;color:#fff!important;border:1px solid #6318d9!important;}
                            .usr-mr-status-bar .usr-mr-status-button{display:none!important;}
                            .usr-mr-live-status{width:100%!important;display:flex!important;gap:5px!important;flex-wrap:wrap!important;align-items:center!important;}
                            .usr-mr-status-chip{background:#f1f2f5!important;border:0!important;color:#69758a!important;
                                border-radius:11px!important;padding:6px 10px!important;cursor:pointer!important;
                                font:600 11px Inter,Arial,sans-serif!important;white-space:nowrap!important;line-height:1.5!important;}
                            .usr-mr-live-status,.usr-mr-status-chip{position:relative!important;z-index:2!important;pointer-events:auto!important;}
                            .usr-mr-status-chip[aria-pressed="true"]{background:#5e20ae!important;color:#fff!important;}
                            .usr-mr-status-chip:hover:not([aria-pressed="true"]){background:#e7e1f5!important;color:#5621a3!important;}
                            .usr-mr-status-chip .usr-mr-chip-count{display:inline-flex;align-items:center;justify-content:center;
                                min-width:16px;height:16px;margin-left:5px;border-radius:50%;background:#e1e4ea;color:#64718a;font-size:10px;padding:0 3px;}
                            .usr-mr-status-chip[aria-pressed="true"] .usr-mr-chip-count{background:#7d4bc0;color:#fff;}
                            .usr-mr-data-row{cursor:pointer!important;}
                            .usr-mr-col-actions button,.usr-mr-col-actions crt-button{color:#601ec1!important;}
                            /* V5: visible live table bypasses broken crt.TemplateList status/actions bindings. */
                            .usr-mr-table-viewport>.usr-mr-table-head,
                            .usr-mr-table-viewport .usr-mr-table-head,
                            .usr-mr-table-viewport>.usr-mr-records,
                            .usr-mr-table-viewport .usr-mr-records,
                            .usr-mr-table-card .usr-mr-empty{display:none!important;}
                            .usr-mr-table-card{min-height:0!important;}
                            .usr-mr-table-viewport{overflow-x:auto!important;overflow-y:hidden!important;}
                            .usr-mr-live-table{width:1728px!important;min-width:1728px!important;max-width:none!important;
                                table-layout:fixed!important;border-collapse:collapse!important;
                                border-spacing:0!important;font:12px Inter,Arial,sans-serif!important;
                                color:#24344f!important;background:white!important;}
                            .usr-mr-live-table thead{background:#fafbfc!important;}
                            .usr-mr-live-table th{font-size:11px!important;font-weight:700!important;color:#66748c!important;
                                text-align:left!important;border-bottom:1px solid #e8eaf0!important;padding:13px 10px!important;
                                white-space:normal!important;}
                            .usr-mr-live-table td{font-size:11px!important;line-height:1.38!important;padding:11px 10px!important;
                                border-bottom:1px solid #f0f1f5!important;overflow-wrap:anywhere!important;
                                vertical-align:middle!important;white-space:normal!important;}
                            .usr-mr-live-table tbody tr:nth-child(even){background:#fafbfc!important;}
                            .usr-mr-live-table tbody tr:hover:not(.usr-mr-live-empty-row){background:#f7f2ff!important;cursor:pointer!important;}
                            .usr-mr-live-id{background:none!important;border:0!important;padding:0!important;
                                margin:0!important;font:700 11px Inter,Arial,sans-serif!important;
                                color:#5b20b1!important;cursor:pointer!important;text-align:left!important;
                                white-space:normal!important;overflow-wrap:anywhere!important;}
                            .usr-mr-live-id:hover{text-decoration:underline!important;}
                            .usr-mr-live-id.usr-mr-provisional{border-bottom:1px dotted #9b7bcb!important;}
                            .usr-mr-live-title{font-weight:700!important;color:#13213a!important;}
                            .usr-mr-live-subtitle{font-size:10px!important;color:#99a1b2!important;margin-top:3px!important;}
                            .usr-mr-live-item-count{font-weight:750!important;color:#14213c!important;}
                            .usr-mr-live-badge{display:inline-block!important;border-radius:18px!important;
                                padding:5px 10px!important;font-size:11px!important;line-height:1.4!important;
                                white-space:normal!important;overflow-wrap:normal!important;
                                background:#eef0f3!important;color:#5e6678!important;}
                            .usr-mr-live-badge-draft{background:#f0f1f4!important;color:#687487!important;}
                            .usr-mr-live-badge-submitted,.usr-mr-live-badge-review{background:#f2ecfc!important;color:#6419b1!important;}
                            .usr-mr-live-badge-correction{background:#fff6e4!important;color:#bd7200!important;}
                            .usr-mr-live-badge-provisioning,.usr-mr-live-badge-completed{background:#e8f9f0!important;color:#048f53!important;}
                            .usr-mr-live-badge-rejected{background:#fff0f1!important;color:#c52234!important;}
                            .usr-mr-live-stage{color:#35445b!important;font-size:11px!important;}
                            .usr-mr-live-sla{display:flex!important;align-items:center!important;gap:7px!important;
                                font-weight:650!important;white-space:nowrap!important;}
                            .usr-mr-live-sla-bar{display:inline-block!important;flex:none!important;height:5px!important;
                                max-width:55px!important;min-width:0;border-radius:8px!important;background:#17a34a!important;}
                            .usr-mr-live-sla-warning{color:#cf7400!important;}
                            .usr-mr-live-sla-warning .usr-mr-live-sla-bar{background:#e27b00!important;}
                            .usr-mr-live-sla-overdue{color:#d32436!important;}
                            .usr-mr-live-sla-overdue .usr-mr-live-sla-bar{background:#d32436!important;}
                            .usr-mr-live-sla-ontrack{color:#079954!important;}
                            .usr-mr-live-sla-closed{color:#008a63!important;}
                            .usr-mr-live-sla-na,.usr-mr-live-sla-unknown{color:#94a3b8!important;}
                            .usr-mr-live-actions{display:flex!important;gap:8px!important;align-items:center!important;flex-wrap:nowrap!important;}
                            .usr-mr-live-action{appearance:none!important;display:inline-flex!important;
                                align-items:center!important;justify-content:center!important;
                                border:1px solid #e0e3ec!important;border-radius:7px!important;
                                background:#fff!important;color:#5e1db6!important;
                                min-width:48px!important;min-height:29px!important;
                                font:600 11px Inter,Arial,sans-serif!important;padding:5px 10px!important;
                                cursor:pointer!important;}
                            .usr-mr-live-edit{color:#46328b!important;}
                            .usr-mr-live-action:hover{background:#f3eafe!important;border-color:#bea1ef!important;}
                            .usr-mr-live-action:focus-visible,.usr-mr-live-id:focus-visible{outline:2px solid #7c3aed!important;outline-offset:2px!important;}
                            .usr-mr-live-empty-row td{padding:75px 15px!important;text-align:center!important;}
                            .usr-mr-live-empty-icon{font-size:30px!important;color:#8a66d7!important;}
                            .usr-mr-live-empty-heading{font-size:14px!important;font-weight:700!important;margin-top:8px!important;}
                            .usr-mr-live-empty-description{font-size:12px!important;color:#8790a5!important;margin-top:5px!important;}
                            @media(max-width:760px){.usr-mr-filter-live{grid-template-columns:1fr!important;}
                                .usr-mr-header{flex-wrap:wrap!important;}.usr-mr-root{padding:12px 8px!important;}}
                        `;
                        document.head.appendChild(style);
                    };
                    // V3: Render precisely colored controls using regular DOM buttons.
                    // Native crt.Button objects remain present in viewConfigDiff (Designer-safe).
                    runtime.mountToolbar=() => {
                        if(typeof document==='undefined'||runtime.disposed)return;
                        const host=document.querySelector('.usr-mr-top-actions');
                        if(!host)return;
                        const oldToolbar=host.querySelector('.usr-mr-live-toolbar');
                        if(oldToolbar && oldToolbar.__mrOwner !== runtime)oldToolbar.remove();
                        else if(oldToolbar)return;
                        const bar=document.createElement('div');bar.className='usr-mr-live-toolbar';
                        const exportBtn=document.createElement('button');exportBtn.type='button';
                        exportBtn.className='usr-mr-live-export';exportBtn.textContent='⇩  Export to Excel';
                        exportBtn.addEventListener('click', async()=>{
                            try {
                                await ctx.executeRequest({type:'crt.LoadDataRequest',$context:ctx,
                                    dataSourceName:'PDS',config:{loadType:'reload',useLastLoadParameters:false}});
                                await ctx.executeRequest({type:'crt.ExportDataGridToExcelRequest',
                                    $context:ctx,viewName:'DataTable'});
                            }
                            catch(error){console.error('MCIT Export failed:',error);}
                        });
                        const newBtn=document.createElement('button');newBtn.type='button';
                        newBtn.className='usr-mr-live-new';newBtn.textContent='+  New Request';
                        newBtn.addEventListener('click',async()=>{
                            try {await ctx.executeRequest({type:'usr.MRNewRequest',$context:ctx});}
                            catch(error){console.error('MCIT New Request navigation failed:',error);}
                        });
                        const switcher=document.createElement('div');
                        switcher.className='usr-mr-archive-switch';
                        switcher.setAttribute('role','group');
                        switcher.setAttribute('aria-label','Request archive view');
                        const activeTab=document.createElement('button');
                        activeTab.type='button';activeTab.className='usr-mr-archive-tab';
                        activeTab.textContent='Active Requests';
                        const archivedTab=document.createElement('button');
                        archivedTab.type='button';archivedTab.className='usr-mr-archive-tab';
                        archivedTab.textContent='Archived';
                        activeTab.addEventListener('click',()=>{void runtime.selectArchiveView(false);});
                        archivedTab.addEventListener('click',()=>{void runtime.selectArchiveView(true);});
                        switcher.append(activeTab,archivedTab);
                        runtime.paintArchiveSwitch=()=>{
                            activeTab.setAttribute('aria-pressed',String(!runtime.archivedView));
                            archivedTab.setAttribute('aria-pressed',String(runtime.archivedView));
                            archivedTab.disabled=!runtime.archiveAvailable;
                            archivedTab.title=runtime.archiveAvailable?
                                'View archived requests stored in UsrVMRequest':
                                'Publish Boolean UsrVMRequest.UsrIsArchived to enable archive view';
                        };
                        bar.__mrOwner=runtime;
                        bar.append(switcher,exportBtn,newBtn);host.appendChild(bar);
                        runtime.paintArchiveSwitch();
                    };
                    runtime.mountStatus=() => {
                        if(typeof document==='undefined'||runtime.disposed)return;
                        const host=document.querySelector('.usr-mr-status-bar');
                        if(!host)return;
                        let bar=host.querySelector('.usr-mr-live-status');
                        if (bar && bar.__mrOwner !== runtime) {bar.remove();bar=null;}
                        if(!bar){bar=document.createElement('div');bar.className='usr-mr-live-status';host.appendChild(bar);}
                        bar.__mrOwner=runtime;
                        const counts={};
                        const scoped=runtime.baseFiltered();
                        scoped.forEach(r=>{const value=display(r.UsrStatus);counts[value]=(counts[value]||0)+1;});
                        for(const [keyName,label,value] of statuses){
                            let chip=bar.querySelector('[data-mr-status="'+keyName+'"]');
                            if(!chip){
                                chip=document.createElement('button');chip.type='button';chip.className='usr-mr-status-chip';
                                chip.dataset.mrStatus=keyName;
                                bar.appendChild(chip);
                            }
                            const count=value?(counts[value]||0):scoped.length;
                            const text=label+(runtime.capped?' +':'');
                            const rendered=chip.querySelector('.usr-mr-chip-label');
                            const badge=chip.querySelector('.usr-mr-chip-count');
                            if(!rendered){
                                const title=document.createElement('span');title.className='usr-mr-chip-label';
                                const number=document.createElement('span');number.className='usr-mr-chip-count';
                                chip.appendChild(title);chip.appendChild(number);
                            }
                            const title=chip.querySelector('.usr-mr-chip-label');
                            const number=chip.querySelector('.usr-mr-chip-count');
                            if(title.textContent!==text)title.textContent=text;
                            if(number.textContent!==String(count))number.textContent=String(count);
                            chip.setAttribute('aria-pressed',String(runtime.status===value));
                        }
                    };
                    runtime.mount=() => {
                        if(typeof document==='undefined'||runtime.disposed)return;
                        makeStyle();
                        runtime.mountToolbar();
                        runtime.mountStatus();
                        runtime.renderRows?.();
                        const host=document.querySelector('.usr-mr-filter-mount');
                        if(!host||host.querySelector('.usr-mr-filter-live')){runtime.decorate();return;}
                        const frame=document.createElement('div');frame.className='usr-mr-filter-live';
                        const searchWrap=document.createElement('div');searchWrap.className='usr-mr-search-wrap';
                        const search=document.createElement('input');search.type='search';
                        search.placeholder='Search by ID, title, authority or project…';
                        search.setAttribute('aria-label','Search requests');
                        search.value=runtime.search;searchWrap.appendChild(search);frame.appendChild(searchWrap);
                        const contract=document.createElement('select');contract.setAttribute('aria-label','Filter by contract');
                        const option=document.createElement('option');option.value='';option.textContent='All Contracts';contract.appendChild(option);
                        const types=document.createElement('select');types.setAttribute('aria-label','Request types');
                        const typeOpt=document.createElement('option');typeOpt.value='';typeOpt.textContent='All Types';types.appendChild(typeOpt);
                        frame.appendChild(contract);frame.appendChild(types);host.appendChild(frame);
                        runtime.fillTypes=()=>{
                            while(types.options.length>1)types.remove(1);
                            types.disabled=!runtime.typeAvailable;
                            types.title=runtime.typeAvailable?'Filter requests using MCIT Request Types':
                                'First add Lookup column UsrRequestType to UsrVMRequest, linked to UsrMCITRequestType';
                            if(!runtime.typeAvailable)return;
                            const vals=new Map();
                            for(const item of runtime.requestTypes){
                                const value=id(item.Id),label=display(item.Name);
                                if(value&&label)vals.set(value,label);
                            }
                            [...vals].sort((a,b)=>a[1].localeCompare(b[1])).forEach(([value,label])=>
                                types.add(new Option(label,value)));
                            types.value=runtime.typeId||'';
                        };
                        runtime.fillTypes();
                        runtime.fillContracts=()=>{
                            const before=contract.value;
                            while(contract.options.length>1)contract.remove(1);
                            const options=new Map();
                            runtime.records.forEach(r=>{const i=id(r.UsrContract),t=display(r.UsrContract);if(i&&t)options.set(i,t);});
                            [...options].sort((a,b)=>a[1].localeCompare(b[1])).forEach(([i,t])=>
                                contract.add(new Option(t,i)));
                            contract.value=runtime.contractId||before||'';
                        };
                        runtime.fillContracts();
                        let pending;
                        search.addEventListener('input',()=>{
                            clearTimeout(pending);
                            pending=setTimeout(async()=>{if(runtime.disposed)return;ctx.UsrMRSearchText=search.value.trim();await runtime.apply();},280);
                        });
                        contract.addEventListener('change',async()=>{ctx.UsrMRSelectedContractId=contract.value;await runtime.apply();});
                        types.addEventListener('change',async()=>{ctx.UsrMRSelectedTypeId=types.value;await runtime.apply();});
                        runtime.decorate();
                    };
                    if (typeof document !== 'undefined') {
                        runtime.onStatusClick = (event) => {
                            if (runtime.disposed) return;
                            const chip = event.target?.closest?.('.usr-mr-status-chip');
                            if (!chip || !chip.closest('.usr-mr-root .usr-mr-status-bar')) return;
                            const match = statuses.find(([keyName]) => keyName === chip.dataset.mrStatus);
                            if (!match) return;
                            event.preventDefault();
                            event.stopPropagation();
                            runtime.selectStatus(match[2]);
                        };
                        document.addEventListener('click',runtime.onStatusClick,true);
                    }
                    try {
                        // Resolve current Contact for CreatedBy ownership; Contact.Account is
                        // retained solely for compatibility with old records.
                        ctx.UsrMRAuthorityId=ZERO;
                        ctx.UsrMRContactId=ZERO;
                        const sv=await new sdk.SysValuesService().loadSysValues();
                        const contactId=id(sv?.userContact);
                        if(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(contactId)){
                            runtime.contactId=contactId;
                            ctx.UsrMRContactId=contactId;
                            const cf=new sdk.FilterGroup();
                            await cf.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,'Id',contactId);
                            const cm=await sdk.Model.create('Contact');
                            const contacts=await cm.load({attributes:['Id','Account'],
                                parameters:[{type:sdk.ModelParameterType.Filter,value:compatible(cf)}],
                                options:{pagingConfig:{rowsOffset:0,rowCount:1}}});
                            const account=contacts?.[0]?.Account;
                            if(id(account) && /^[0-9a-f-]{36}$/.test(id(account))){
                                runtime.authorityId=id(account);
                                ctx.UsrMRAuthorityId=runtime.authorityId;
                                ctx.UsrMRAuthorityName=display(account);
                            }
                        }
                        if(runtime.contactId===ZERO){
                            ctx.UsrMRSubtitleText='Your Contact could not be resolved; no requests can be shown.';
                            console.warn('MCIT My Requests: current Contact not resolved; scope denied.');
                        }
                        // Row anywhere -> Detail (View). Buttons/links keep their own actions.
                        if(typeof document!=='undefined'){
                            runtime.onRowClick=event=>{
                                const target=event.target;
                                if(!target||typeof target.closest!=='function')return;
                                if(target.closest('button,crt-button,a,[role="button"],input,select,textarea,[contenteditable="true"]'))return;
                                const row=target.closest('.usr-mr-data-row');
                                if(!row||!row.closest('.usr-mr-root'))return;
                                const token=Array.from(row.classList).find(c=>c.startsWith('usr-mr-id-'));
                                const recordId=token?.substring('usr-mr-id-'.length)||'';
                                if(!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(recordId))return;
                                ctx.executeRequest({type:'usr.MROpenRecord',$context:ctx,recordId,mode:'view'});
                            };
                            document.addEventListener('click',runtime.onRowClick);
                        }
                        // Keep root rendering even if there is no authority mapping.
                        runtime.mount();
                        if(typeof document!=='undefined'){
                            runtime.observer=new MutationObserver(()=>{if(!runtime.disposed){
                                // Pure decoration only; never mutate observed grid structure.
                                runtime.mount();
                            }});
                            runtime.observer.observe(document.body,{childList:true,subtree:true});
                        }
                        await runtime.recount();
                        runtime.clock=setInterval(async()=>{
                            if(runtime.disposed || runtime.recountBusy)return;
                            runtime.recountBusy=true;
                            try {await runtime.recount();runtime.renderRows?.();}
                            catch(error){console.warn('MCIT My Requests automatic refresh failed',error);}
                            finally {runtime.recountBusy=false;}
                        },60000);
                        runtime.fillContracts?.();
                        runtime.fillTypes?.();
                        if(runtime.contactId===ZERO)
                            ctx.UsrMRSubtitleText='Your Contact could not be resolved; no requests can be shown.';
                        await refreshGrid();
                    }catch(err){
                        console.error('MCIT My Requests initialization failed:',err);
                        ctx.UsrMRAuthorityId=ZERO;ctx.UsrMRContactId=ZERO;
                        runtime.authorityId=ZERO;runtime.contactId=ZERO;runtime.records=[];
                        ctx.UsrMRSubtitleText='Could not resolve your Contact. No records are shown.';
                    }
                    return result;
                }
            },
            {
                request:"crt.HandleViewModelResumeRequest",
                handler: async (request,next)=>{
                    if (isPageDesigner()) return next?.handle(request);
                    const result=await next?.handle(request);
                    const rt=typeof document!=="undefined" && document.__usrMCITMyRequestsFigmaV2;
                    if(rt && !rt.disposed && rt.context===request.$context && rt.authorityId &&
                        rt.authorityId!=="00000000-0000-0000-0000-000000000000"){
                        try{
                            await rt.recount();
                            await rt.refreshGrid();
                            rt.mount?.();
                        }catch(error){console.warn("MCIT My Requests: resume refresh failed",error);}
                    }
                    return result;
                }
            },
            {
                request:"crt.LoadDataRequest",
                handler:async(request,next)=>{
                    if (isPageDesigner()) return next?.handle(request);
                    if(request.dataSourceName!=="PDS")return next?.handle(request);
                    const ctx=request.$context;
                    const filter=new sdk.FilterGroup();
                    // Security: scope to CreatedBy=current Contact OR legacy Contact.Account.
                    // Never remove this condition; Creatio server permissions still apply.
                    const ZERO='00000000-0000-0000-0000-000000000000';
                    const contact=(await ctx.UsrMRContactId)||ZERO;
                    const auth=(await ctx.UsrMRAuthorityId)||ZERO;
                    const scope=new sdk.FilterGroup();
                    scope.logicalOperation=sdk.LogicalOperatorType.Or;
                    await scope.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,'CreatedBy',contact);
                    if(auth!==ZERO)
                        await scope.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,'UsrAccount',auth);
                    filter.items['UsrMRVisibilityScope']={...scope,items:scope.items};
                    const status=(await ctx.UsrMRSelectedStatus)||'';
                    const contract=(await ctx.UsrMRSelectedContractId)||'';
                    const typeId=(await ctx.UsrMRSelectedTypeId)||'';
                    const search=((await ctx.UsrMRSearchText)||'').trim();
                    if(status)await filter.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,'UsrStatus.Name',status);
                    if(contract)await filter.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,'UsrContract',contract);
                    // Never send a filter on a column that does not exist yet.
                    const rt=typeof document!=='undefined'&&document.__usrMCITMyRequestsFigmaV2;
                    if(typeId&&rt?.typeAvailable)await filter.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,'UsrRequestType',typeId);
                    // This applies to the native PDS as well (including Excel export).
                    // SDK visible table uses the same condition in baseFiltered().
                    if(rt?.archiveAvailable)
                        await filter.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,
                            ARCHIVE_FIELD,!!rt.archivedView);
                    if(search){
                        const any=new sdk.FilterGroup();
                        any.logicalOperation=sdk.LogicalOperatorType.Or;
                        for(const path of ['UsrNumber','UsrName','UsrAccount.Name','UsrProject.Name']){
                            await any.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Contain,path,search);
                        }
                        filter.items['UsrMRSearchOR']={...any,items:any.items};
                    }
                    request.parameters=request.parameters||[];
                    request.parameters.push({type:'filter',value:{...filter,items:filter.items}});
                    return next?.handle(request);
                }
            },
            {
                request:'usr.MRSelectStatus',
                handler:async(request)=>{
                    if (isPageDesigner()) return;
                    const ctx=request.$context;
                    ctx.UsrMRSelectedStatus=request.status||'';
                    const runtime=typeof document!=='undefined'&&document.__usrMCITMyRequestsFigmaV2;
                    if(runtime?.selectStatus && !runtime.disposed && runtime.context===ctx) runtime.selectStatus(request.status||'');
                    else await ctx.executeRequest({type:'crt.LoadDataRequest',$context:ctx,dataSourceName:'PDS',
                        config:{loadType:'reload',useLastLoadParameters:false}});
                }
            },
            {
                request:'usr.MRChangePage',
                handler:async(request)=>{
                    if (isPageDesigner()) return;
                    const runtime=typeof document!=='undefined'&&document.__usrMCITMyRequestsFigmaV2;
                    if(!runtime?.refreshGrid)return;
                    const total=runtime.filtered().length;
                    const last=Math.max(0,Math.floor(Math.max(total-1,0)/PAGE_SIZE)*PAGE_SIZE);
                    runtime.pageOffset=Math.min(last,Math.max(0,runtime.pageOffset+Number(request.step||0)*PAGE_SIZE));
                    runtime.updateLabels();await runtime.refreshGrid();
                }
            },
            {
                request:'usr.MRNewRequest',
                handler:async(request)=>{
                    if (isPageDesigner()) return;
                    // This schema MUST be created as a full Freedom UI page in MCIT Portal.
                    // Never use crt.CreateRecordRequest here: it selects the default popup.
                    await sdk.HandlerChainService.instance.process({
                        type:'crt.OpenPageRequest',
                        schemaName:'UsrMCITNewRequest_WizardPage',
                        modelInitConfigs:[{action:'add'}],
                        $context:request.$context,
                        scopes:[...(request.scopes||[])]
                    });
                }
            },
            {
                request:'usr.MROpenRecord',
                handler:async(request)=>{
                    if (isPageDesigner()) return;
                    const recordId=String(request.recordId?.value??request.recordId??'');
                    if(!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(recordId))return;
                    const isEdit=request.mode==='edit';
                    // View -> five-tab Request Detail, Edit -> Wizard on SAME record Id.
                    // Both target pages must be created (full-page, not mini-page).
                    await sdk.HandlerChainService.instance.process({
                        type:'crt.OpenPageRequest',
                        schemaName:isEdit?'UsrMCITNewRequest_WizardPage':'UsrMCITRequestDetail_Page',
                        modelInitConfigs:[{action:'edit',recordId}],
                        $context:request.$context,
                        scopes:[...(request.scopes||[])]
                    });
                }
            },
            {
                request:'crt.HandleViewModelDestroyRequest',
                handler:async(request,next)=>{
                    if (isPageDesigner()) return next?.handle(request);
                    if(typeof document!=='undefined')document.__usrMCITMyRequestsFigmaV2?.dispose?.();
                    return next?.handle(request);
                }
            }
        ]/**SCHEMA_HANDLERS*/,
        converters: /**SCHEMA_CONVERTERS*/{
            'usr.MRLookup':v=>v?.displayValue??v?.Name??v?.name??(typeof v==='string'?v:'—'),
            'usr.MRSubmittedDate':v=>{
                const id=String(v?.value??v??'').toLowerCase();
                const rt=typeof document!=='undefined'&&document.__usrMCITMyRequestsFigmaV2;
                const date=rt?.submittedDates?.get(id);
                if(!date)return '—';
                const y=date.getFullYear(),m=String(date.getMonth()+1).padStart(2,'0'),d=String(date.getDate()).padStart(2,'0');
                return `${y}-${m}-${d}`;
            },
            'usr.MRItemsCount':v=>{
                const id=String(v?.value??v??'').toLowerCase();
                const rt=typeof document!=='undefined'&&document.__usrMCITMyRequestsFigmaV2;
                return rt?.itemCounts?.has(id)?String(rt.itemCounts.get(id)):'—';
            },
            'usr.MRDate':v=>{
                if(!v)return '—';
                const d=new Date(v);return Number.isNaN(d.getTime())?'—':
                    d.toLocaleDateString('en-CA',{year:'numeric',month:'2-digit',day:'2-digit'});
            },
            'usr.MRStatusText':v=>{
                const x=v?.displayValue??v?.Name??v??'';
                return x==='Provisioning in Progress'?'Provisioning':(x||'—');
            },
            'usr.MRStatusClass':v=>{
                const x=String(v?.displayValue??v?.Name??v??'').toLowerCase();
                const suffix=x.includes('review')?'review':x.includes('correction')?'correction':
                    x.includes('provision')?'provisioning':x.includes('complete')?'completed':
                    x.includes('reject')?'rejected':'default';
                return ['usr-mr-status-badge','usr-mr-badge-'+suffix];
            },
            'usr.MRRowClass':v=>['usr-mr-grid','usr-mr-data-row',
                'usr-mr-id-'+String(v?.value??v??'').toLowerCase()],
            'usr.MRCanEdit':v=>{
                const x=String(v?.displayValue??v?.Name??v??'').toLowerCase();
                return x==='draft'||x==='requires correction';
            }
        }/**SCHEMA_CONVERTERS*/,
        validators: /**SCHEMA_VALIDATORS*/{} /**SCHEMA_VALIDATORS*/
    };
});
