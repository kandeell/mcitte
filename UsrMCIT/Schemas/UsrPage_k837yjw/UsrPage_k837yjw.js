define("UsrPage_k837yjw", /**SCHEMA_DEPS*/["@creatio-devkit/common", "css!UsrMCITRoleEditorStyles"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {

    // MCIT Screen Permissions V1 — functionality only; original Freedom UI layout is retained.
    // Uses verified UsrMCITPermissionScreen screen registry and UsrScreen lookup relation.
    const MCIT_SCREEN_CATALOG_CANDIDATES = ["UsrMCITPermissionScreen"];
    const MCIT_SCREEN_FLAGS = [
      "UsrCanView", "UsrCanCreate", "UsrCanEdit", "UsrCanApprove",
      "UsrCanAssign", "UsrCanExport", "UsrCanConfigure", "UsrCanActivate"
    ];
    const MCIT_SCREEN_PAGE_SIZE = 100;
    const MCIT_SCREEN_MAX_ROWS = 1000;
    const mcitScreenSyncInflight = new WeakMap();

    function mcitScreenId(value) {
      const raw = (value && typeof value === "object")
        ? (value.value || value.Id || value.id || "") : value;
      const text = String(raw || "").trim().toLowerCase();
      return /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/.test(text) ? text : "";
    }
    function mcitScreenLookupText(value) {
      return String(value?.displayValue || value?.Name || value?.name ||
        (typeof value === "string" ? value : "") || "").trim();
    }
    function mcitScreenFilter(sdk, column, value) {
      return (async () => {
        const fg = new sdk.FilterGroup();
        await fg.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal, column, value);
        const p = Object.assign({}, fg); p.items = fg.items;
        return [{type:sdk.ModelParameterType.Filter, value:p}];
      })();
    }
    async function mcitScreenRole(context, sdk) {
      const possible = [await context.Id, await context.UsrMCITRoleDS_Id];
      try {
        const primary = await context.getPrimaryModelName();
        const schema = await context.dataSchemas[primary];
        if (schema?.primaryAttributeName) possible.push(await context[schema.primaryAttributeName]);
      } catch (_) { /* Not yet initialized in Create mode. */ }
      const model = await sdk.Model.create("UsrMCITRole");
      for (const maybeId of possible) {
        const id = mcitScreenId(maybeId);
        if (!id) continue;
        const rows = await model.load({
          attributes:["Id", "UsrMCITRoleStatuses"],
          parameters:[{type:sdk.ModelParameterType.PrimaryColumnValue, value:id}]
        });
        if (Array.isArray(rows) && rows.length) {
          return {id, status: mcitScreenLookupText(rows[0].UsrMCITRoleStatuses)};
        }
      }
      return null; // A new page can already hold a GUID before it has a real DB row.
    }
    async function mcitScreenAllRows(model, attributes, parameters=[]) {
      const rows = [];
      for (let offset=0; offset<MCIT_SCREEN_MAX_ROWS; offset+=MCIT_SCREEN_PAGE_SIZE) {
        const batch = await model.load({attributes, parameters,
          options:{pagingConfig:{rowsOffset:offset,rowCount:MCIT_SCREEN_PAGE_SIZE}}});
        if (!Array.isArray(batch)) throw new Error("Invalid lookup result (not an array).");
        rows.push(...batch);
        if (batch.length<MCIT_SCREEN_PAGE_SIZE) return rows;
      }
      throw new Error("More than 1000 screen rows; configure server-side pagination before syncing.");
    }
    async function mcitScreenFindCatalog(sdk) {
      const errors=[];
      for (const schema of MCIT_SCREEN_CATALOG_CANDIDATES) {
        try {
          const model=await sdk.Model.create(schema);
          const rows=await mcitScreenAllRows(model,["Id","UsrScreenName","UsrScreenCode","UsrIsActive","UsrSortOrder"]);
          return {schema, rows:rows.filter(x=>mcitScreenId(x.Id) && x.UsrIsActive===true)};
        } catch (err) {
          errors.push(schema+": "+String(err?.message||err));
        }
      }
      throw new Error("Screen lookup not readable. Check the UsrScreen column's lookup object. " +
        "Tried "+MCIT_SCREEN_CATALOG_CANDIDATES.join(" / ") + ". "+errors.join(" | "));
    }
    function mcitScreenIsDesigner() {
      if (typeof location==="undefined") return false;
      return /(?:page|ui|schema|freedom)[-_]?designer|designer(?:\/|%2f|\?|#)/i.test(String(location.href||""));
    }
    async function mcitScreenReload(context) {
      return context.executeRequest({
        type:"crt.LoadDataRequest", $context:context,
        dataSourceName:"DataGrid_1yq715aDS",
        config:{loadType:"reload"}
      });
    }
    const mcitLifecycleInflight = new WeakMap();
    async function mcitMessage(ctx, title, message) {
        return ctx.executeRequest({type:"crt.ShowDialogRequest", $context:ctx,
            dialogConfig:{data:{title,message,actions:[{key:"OK",config:{color:"primary",caption:"OK"}}]}}});
    }
    async function mcitCall(ctx, action, roleId, userId) {
        const response = await new sdk.HttpClientService().post("rest/UsrMCITRoleFormService/Execute", {
            action, roleId, userId:userId || "00000000-0000-0000-0000-000000000000"
        });
        const body = response?.body;
        const result = body?.ExecuteResult || body;
        if (!result || result.Success !== true) throw new Error(result?.Message || "Role service returned no successful result.");
        for (const flag of ["CanEdit","CanActivate","CanDeactivate","CanCreateDraft","CanDiscardDraft","CanAssign"])
            ctx["UsrLifecycle"+flag] = !!result[flag];
        ctx.UsrMCITScreenSyncStatus = result.Message || "Role configuration loaded.";
        return result;
    }
    async function mcitReloadAll(ctx) {
        const names=["DataGrid_1yq715aDS","UsrDataScopeGridDS","DataGrid_cjsl4ajDS",
            "UsrAdminPermissionsGridDS","UsrReportingPermissionsGridDS","DataGrid_6bdu0haDS","UsrMCITRoleChangeGridDS"];
        for (const name of names) {
            await ctx.executeRequest({type:"crt.LoadDataRequest",$context:ctx,
                dataSourceName:name,config:{loadType:"reload"}});
        }
    }
    async function mcitScreenSync(ctx, sdk) {
        if (mcitLifecycleInflight.has(ctx)) return mcitLifecycleInflight.get(ctx);
        const work=(async()=>{
            const role=await mcitScreenRole(ctx,sdk);
            if (!role) {
                ctx.UsrMCITScreenSyncStatus="Save the role to create its native role and permissions.";
                return {saved:false};
            }
            const result=await mcitCall(ctx,"Inspect",role.id);
            await mcitReloadAll(ctx);
            return result;
        })();
        mcitLifecycleInflight.set(ctx,work);
        try { return await work; }
        catch(error) {ctx.UsrMCITScreenSyncStatus=String(error.message || error); throw error;}
        finally {mcitLifecycleInflight.delete(ctx);}
    }
    async function mcitScopeSync(ctx, sdk) { return mcitScreenSync(ctx,sdk); }


	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
	{
		"operation": "remove",
		"name": "MainHeader"
	},
	{
		"operation": "move",
		"name": "MainHeaderTop",
		"parentName": "FlexContainer_5pph8bx",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "merge",
		"name": "BackButton",
		"values": {
			"caption": "#ResourceString(BackButton_caption)#",
			"size": "extra-large",
			"iconPosition": "left-icon",
			"layoutConfig": {
				"column": 1,
				"colSpan": 1,
				"row": 1,
				"rowSpan": 1
			},
			"clickMode": "default"
		}
	},
	{
		"operation": "move",
		"name": "BackButton",
		"parentName": "GridContainer_pf3f8m8",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "move",
		"name": "MainHeaderBottom",
		"parentName": "FlexContainer_5pph8bx",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "remove",
		"name": "CardToolsContainer"
	},
	{
		"operation": "remove",
		"name": "TagSelect"
	},
	{
		"operation": "remove",
		"name": "TopAreaProfileContainer"
	},
	{
		"operation": "merge",
		"name": "Tabs",
		"values": {
			"styleType": "partiallyColored",
			"mode": "tab",
			"bodyBackgroundColor": "transparent",
			"selectedTabTitleColor": "#5B21A5",
			"tabTitleColor": "#667085",
			"underlineSelectedTabColor": "#6D28D9",
			"headerBackgroundColor": "crt-color-primary-white",
			"stretch": false,
			"classes": [
				"usr-mcit-role-tabs",
				"usr-mcit-role-tabs-wrap"
			],
			"allowToggleClose": true
		}
	},
	{
		"operation": "merge",
		"name": "GeneralInfoTab",
		"values": {
			"caption": "ROLE INFORMATION",
			"iconPosition": "only-text",
			"classes": [
				"usr-mcit-role-info-tab"
			]
		}
	},
	{
		"operation": "merge",
		"name": "GridContainer_uxln7d4",
		"values": {
			"layoutConfig": {
				"column": 1,
				"colSpan": 1,
				"row": 2,
				"rowSpan": 1
			}
		}
	},
	{
		"operation": "move",
		"name": "GridContainer_uxln7d4",
		"parentName": "GridContainer_yphet7j",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "GridContainer_pf3f8m8",
		"values": {
			"type": "crt.GridContainer",
			"columns": [
				"minmax(32px, 1fr)"
			],
			"rows": "minmax(max-content, 32px)",
			"items": [],
			"padding": {
				"top": "medium",
				"bottom": "medium",
				"right": "medium",
				"left": "medium"
			}
		},
		"parentName": "MainContainer",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "GridContainer_f3cjmcs",
		"values": {
			"type": "crt.GridContainer",
			"columns": [
				"minmax(32px, 1fr)"
			],
			"rows": "minmax(max-content, 32px)",
			"items": [],
			"color": "primary",
			"borderRadius": "medium",
			"padding": {
				"top": "medium",
				"bottom": "medium",
				"right": "medium",
				"left": "medium"
			}
		},
		"parentName": "MainContainer",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "FlexContainer_5pph8bx",
		"values": {
			"layoutConfig": {
				"column": 1,
				"colSpan": 1,
				"row": 1,
				"rowSpan": 1
			},
			"type": "crt.FlexContainer",
			"direction": "column",
			"wrap": "nowrap",
			"items": []
		},
		"parentName": "GridContainer_f3cjmcs",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrMCITRoleHero",
		"values": {
			"type": "crt.FlexContainer",
			"direction": "column",
			"items": [],
			"classes": [
				"usr-mcit-role-overview"
			]
		},
		"parentName": "MainHeaderBottom",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrMCITRoleHeroDescription",
		"values": {
			"type": "crt.Label",
			"caption": "$UsrMCITRoleDS_UsrDescription_ouy3rc1",
			"labelType": "body",
			"labelThickness": "default",
			"classes": [
				"usr-mcit-hero-description"
			]
		},
		"parentName": "UsrMCITRoleHero",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrMCITRoleHeroBadges",
		"values": {
			"type": "crt.FlexContainer",
			"direction": "row",
			"items": [],
			"classes": [
				"usr-mcit-hero-badges"
			]
		},
		"parentName": "UsrMCITRoleHero",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrMCITRoleHeroCategory",
		"values": {
			"type": "crt.Label",
			"caption": "$UsrMCITRoleCategoryLabel",
			"labelType": "body",
			"labelThickness": "default",
			"classes": [
				"usr-mcit-hero-category"
			]
		},
		"parentName": "UsrMCITRoleHeroBadges",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrMCITRoleHeroStatus",
		"values": {
			"type": "crt.Label",
			"caption": "$UsrMCITRoleStatusLabel",
			"labelType": "body",
			"labelThickness": "default",
			"classes": [
				"usr-mcit-hero-status"
			]
		},
		"parentName": "UsrMCITRoleHeroBadges",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrMCITRoleActiveWarning",
		"values": {
			"type": "crt.Label",
			"caption": "Active role: changes require a new draft version.",
			"labelType": "body",
			"visible": "$UsrMCITIsActiveRole",
			"classes": [
				"usr-mcit-active-warning"
			]
		},
		"parentName": "UsrMCITRoleHero",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "GridContainer_yphet7j",
		"values": {
			"type": "crt.GridContainer",
			"columns": [
				"minmax(32px, 1fr)"
			],
			"rows": "minmax(max-content, 32px)",
			"items": [],
			"color": "primary",
			"borderRadius": "medium",
			"padding": {
				"top": "medium",
				"bottom": "medium",
				"right": "medium",
				"left": "medium"
			}
		},
		"parentName": "GeneralInfoTab",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "Input_36c94gc",
		"values": {
			"type": "crt.Input",
			"label": "Role Name",
			"control": "$UsrMCITRoleDS_UsrName_n9pu298",
			"layoutConfig": {
				"column": 1,
				"colSpan": 1,
				"row": 1,
				"rowSpan": 1
			}
		},
		"parentName": "GridContainer_yphet7j",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "ComboBox_7704p0c",
		"values": {
			"type": "crt.ComboBox",
			"label": "Role Category",
			"control": "$UsrMCITRoleDS_UsrRoleCategory_pvorvyc",
			"isAddAllowed": false,
			"showValueAsLink": true,
			"layoutConfig": {
				"column": 1,
				"row": 1,
				"colSpan": 1,
				"rowSpan": 1
			},
			"listActions": [],
			"controlActions": []
		},
		"parentName": "GridContainer_uxln7d4",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "ListAction_1mfa21i",
		"values": {
			"code": "addRecord",
			"type": "crt.ComboboxSearchTextAction",
			"icon": "combobox-add-new",
			"caption": "Add new",
			"clicked": {
				"request": "crt.CreateRecordFromLookupRequest",
				"params": {}
			}
		},
		"parentName": "ComboBox_7704p0c",
		"propertyName": "listActions",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "ComboBox_73trk9x",
		"values": {
			"type": "crt.ComboBox",
			"label": "Scope Behavior",
			"control": "$UsrMCITRoleDS_UsrScopeBehavior_k2vuil1",
			"isAddAllowed": false,
			"showValueAsLink": true,
			"layoutConfig": {
				"column": 2,
				"row": 1,
				"colSpan": 1,
				"rowSpan": 1
			}
		},
		"parentName": "GridContainer_uxln7d4",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "Input_yg422ep",
		"values": {
			"type": "crt.Input",
			"label": "Description",
			"control": "$UsrMCITRoleDS_UsrDescription_ouy3rc1",
			"layoutConfig": {
				"column": 1,
				"colSpan": 1,
				"row": 3,
				"rowSpan": 1
			}
		},
		"parentName": "GridContainer_yphet7j",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "GridContainer_gxbrod6",
		"values": {
			"type": "crt.GridContainer",
			"columns": [
				"minmax(64px,1fr)",
				"minmax(64px,1fr)"
			],
			"rows": "minmax(32px,max-content)",
			"items": [],
			"layoutConfig": {
				"column": 1,
				"colSpan": 1,
				"row": 4,
				"rowSpan": 1
			}
		},
		"parentName": "GridContainer_yphet7j",
		"propertyName": "items",
		"index": 3
	},
	{
		"operation": "insert",
		"name": "ComboBox_jdrqqpc",
		"values": {
			"type": "crt.ComboBox",
			"label": "Status",
			"control": "$UsrMCITRoleDS_UsrMCITRoleStatuses_6o62qb3",
			"isAddAllowed": false,
			"showValueAsLink": true,
			"layoutConfig": {
				"column": 1,
				"row": 1,
				"colSpan": 1,
				"rowSpan": 1
			},
			"listActions": [],
			"controlActions": []
		},
		"parentName": "GridContainer_gxbrod6",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "ListAction_9txzb86",
		"values": {
			"code": "addRecord",
			"type": "crt.ComboboxSearchTextAction",
			"icon": "combobox-add-new",
			"caption": "Add new",
			"clicked": {
				"request": "crt.CreateRecordFromLookupRequest",
				"params": {}
			}
		},
		"parentName": "ComboBox_jdrqqpc",
		"propertyName": "listActions",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "TabContainer_8h8i8hs",
		"values": {
			"type": "crt.TabContainer",
			"items": [],
			"caption": "SCREEN PERMISSIONS",
			"iconPosition": "only-text"
		},
		"parentName": "Tabs",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "GridContainer_97rlmam",
		"values": {
			"type": "crt.GridContainer",
			"columns": [
				"minmax(32px, 1fr)"
			],
			"rows": "minmax(max-content, 32px)",
			"items": [],
			"color": "primary",
			"borderRadius": "medium",
			"padding": {
				"top": "medium",
				"bottom": "medium",
				"right": "medium",
				"left": "medium"
			}
		},
		"parentName": "TabContainer_8h8i8hs",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrMCITScreenNote",
		"values": {
			"type": "crt.Label",
			"caption": "$UsrMCITScreenSyncStatus",
			"labelType": "body",
			"labelThickness": "default",
			"classes": [
				"usr-mcit-note"
			],
			"layoutConfig": {
				"column": 1,
				"colSpan": 1,
				"row": 1,
				"rowSpan": 1
			}
		},
		"parentName": "GridContainer_97rlmam",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "DataGrid_1yq715a",
		"values": {
			"type": "crt.DataGrid",
			"items": "$DataGrid_1yq715a",
			"primaryColumnName": "DataGrid_1yq715aDS_Id",
			"fitContent": true,
			"placeholder": false,
			"classes": [
				"usr-mcit-permissions-table"
			],
			"features": {
				"rows": {
					"selection": false,
					"numeration": false
				},
				"editable": {
					"enable": true,
					"itemsCreation": false,
					"floatingEditPanel": true
				},
				"header": {
					"visible": true
				},
				"columns": {
					"resizing": false,
					"dragAndDrop": false,
					"sorting": true
				}
			},
			"columns": [
				{
					"id": "82216997-f5e3-4567-89ab-000000000000",
					"code": "DataGrid_1yq715aDS_UsrScreen",
					"caption": "Screen",
					"dataValueType": 10,
					"width": 240
				},
				{
					"id": "81216804-f5e3-4567-89ab-000000000001",
					"code": "DataGrid_1yq715aDS_UsrCanView",
					"caption": "View",
					"dataValueType": 12,
					"width": 90
				},
				{
					"id": "84216cbd-f5e3-4567-89ab-000000000002",
					"code": "DataGrid_1yq715aDS_UsrCanCreate",
					"caption": "Create",
					"dataValueType": 12,
					"width": 90
				},
				{
					"id": "83216b2a-f5e3-4567-89ab-000000000003",
					"code": "DataGrid_1yq715aDS_UsrCanEdit",
					"caption": "Edit",
					"dataValueType": 12,
					"width": 90
				},
				{
					"id": "7e21634b-f5e3-4567-89ab-000000000004",
					"code": "DataGrid_1yq715aDS_UsrCanApprove",
					"caption": "Approve",
					"dataValueType": 12,
					"width": 110
				},
				{
					"id": "7d2161b8-f5e3-4567-89ab-000000000005",
					"code": "DataGrid_1yq715aDS_UsrCanAssign",
					"caption": "Assign",
					"dataValueType": 12,
					"width": 90
				},
				{
					"id": "80216671-f5e3-4567-89ab-000000000006",
					"code": "DataGrid_1yq715aDS_UsrCanExport",
					"caption": "Export",
					"dataValueType": 12,
					"width": 90
				},
				{
					"id": "7f2164de-f5e3-4567-89ab-000000000007",
					"code": "DataGrid_1yq715aDS_UsrCanConfigure",
					"caption": "Configure",
					"dataValueType": 12,
					"width": 110
				},
				{
					"id": "7a215cff-f5e3-4567-89ab-000000000008",
					"code": "DataGrid_1yq715aDS_UsrCanActivate",
					"caption": "Activate",
					"dataValueType": 12,
					"width": 110
				}
			],
			"layoutConfig": {
				"column": 1,
				"colSpan": 1,
				"row": 2,
				"rowSpan": 1
			}
		},
		"parentName": "GridContainer_97rlmam",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrDataScopeTab",
		"values": {
			"type": "crt.TabContainer",
			"items": [],
			"caption": "DATA SCOPE RULES",
			"iconPosition": "only-text"
		},
		"parentName": "Tabs",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "GridContainer_pyaij2y",
		"values": {
			"type": "crt.GridContainer",
			"columns": [
				"minmax(32px, 1fr)"
			],
			"rows": "minmax(max-content, 32px)",
			"items": [],
			"color": "primary",
			"borderRadius": "medium",
			"padding": {
				"top": "medium",
				"bottom": "medium",
				"right": "medium",
				"left": "medium"
			}
		},
		"parentName": "UsrDataScopeTab",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrScopeBanner",
		"values": {
			"type": "crt.FlexContainer",
			"direction": "column",
			"items": [],
			"classes": [
				"usr-mcit-scope-banner"
			],
			"layoutConfig": {
				"column": 1,
				"colSpan": 1,
				"row": 1,
				"rowSpan": 1
			}
		},
		"parentName": "GridContainer_pyaij2y",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrScopeBannerTitleLabel",
		"values": {
			"type": "crt.Label",
			"caption": "$UsrScopeBannerTitle",
			"labelType": "body",
			"labelThickness": "default",
			"classes": [
				"usr-mcit-banner-title"
			]
		},
		"parentName": "UsrScopeBanner",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrScopeBannerDescriptionLabel",
		"values": {
			"type": "crt.Label",
			"caption": "$UsrScopeBannerDescription",
			"labelType": "body",
			"labelThickness": "default",
			"classes": []
		},
		"parentName": "UsrScopeBanner",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrDataScopeGrid",
		"values": {
			"type": "crt.DataGrid",
			"items": "$UsrDataScopeGrid",
			"primaryColumnName": "UsrDataScopeGridDS_Id",
			"fitContent": true,
			"placeholder": false,
			"classes": [
				"usr-mcit-table"
			],
			"features": {
				"rows": {
					"selection": false,
					"numeration": false
				},
				"editable": {
					"enable": true,
					"itemsCreation": true,
					"floatingEditPanel": true
				},
				"header": {
					"visible": true
				},
				"columns": {
					"resizing": false,
					"dragAndDrop": false,
					"sorting": true
				}
			},
			"columns": [
				{
					"id": "2017b8c9-f5e3-4567-89ab-000000000000",
					"code": "UsrDataScopeGridDS_UsrScopeType",
					"caption": "#ResourceString(UsrMigration_UsrDataScopeGrid_columns_0_caption)#",
					"dataValueType": 28,
					"width": 230
				},
				{
					"id": "1f17b736-f5e3-4567-89ab-000000000001",
					"code": "UsrDataScopeGridDS_UsrAllowedValues",
					"caption": "#ResourceString(UsrMigration_UsrDataScopeGrid_columns_1_caption)#",
					"dataValueType": 28,
					"width": 260
				},
				{
					"id": "1e17b5a3-f5e3-4567-89ab-000000000002",
					"code": "UsrDataScopeGridDS_UsrDescription",
					"caption": "#ResourceString(UsrMigration_UsrDataScopeGrid_columns_2_caption)#",
					"dataValueType": 28,
					"width": 450
				}
			],
			"layoutConfig": {
				"column": 1,
				"colSpan": 1,
				"row": 2,
				"rowSpan": 1
			}
		},
		"parentName": "GridContainer_pyaij2y",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "TabContainer_w4rpe7i",
		"values": {
			"type": "crt.TabContainer",
			"items": [],
			"caption": "QUEUE PERMISSIONS",
			"iconPosition": "only-text"
		},
		"parentName": "Tabs",
		"propertyName": "items",
		"index": 3
	},
	{
		"operation": "insert",
		"name": "UsrMCITQueuePanel",
		"values": {
			"type": "crt.FlexContainer",
			"direction": "column",
			"items": [],
			"classes": [
				"usr-mcit-card",
				"usr-mcit-static-panel",
				"usrmcitqueuepanel"
			]
		},
		"parentName": "TabContainer_w4rpe7i",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrMCITQueueHeader",
		"values": {
			"type": "crt.FlexContainer",
			"direction": "row",
			"wrap": "wrap",
			"items": [],
			"classes": [
				"usr-mcit-static-panel-header"
			]
		},
		"parentName": "UsrMCITQueuePanel",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrMCITQueueTitle",
		"values": {
			"type": "crt.Label",
			"caption": "Queue Permissions",
			"labelType": "headline-4",
			"classes": [
				"usr-mcit-static-panel-title"
			]
		},
		"parentName": "UsrMCITQueueHeader",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "DataGrid_cjsl4aj",
		"values": {
			"type": "crt.DataGrid",
			"items": "$DataGrid_cjsl4aj",
			"primaryColumnName": "DataGrid_cjsl4ajDS_Id",
			"fitContent": true,
			"placeholder": false,
			"classes": [
				"usr-mcit-table"
			],
			"features": {
				"rows": {
					"selection": false,
					"numeration": false
				},
				"editable": {
					"enable": true,
					"itemsCreation": true,
					"floatingEditPanel": true
				},
				"header": {
					"visible": true
				},
				"columns": {
					"resizing": false,
					"dragAndDrop": false,
					"sorting": true
				}
			},
			"columns": [
				{
					"id": "8a097921-f5e3-4567-89ab-000000000000",
					"code": "DataGrid_cjsl4ajDS_UsrQueue",
					"caption": "Queue Name",
					"dataValueType": 10,
					"width": 260
				},
				{
					"id": "8909778e-f5e3-4567-89ab-000000000001",
					"code": "DataGrid_cjsl4ajDS_UsrQueue_UsrDescription",
					"caption": "Description",
					"dataValueType": 28,
					"width": 450
				},
				{
					"id": "880975fb-f5e3-4567-89ab-000000000002",
					"code": "DataGrid_cjsl4ajDS_UsrIsEnabled",
					"caption": "Access",
					"dataValueType": 12,
					"width": 115
				}
			]
		},
		"parentName": "UsrMCITQueuePanel",
		"propertyName": "items",
		"index": 3
	},
	{
		"operation": "insert",
		"name": "TabContainer_mdfdx0c",
		"values": {
			"type": "crt.TabContainer",
			"items": [],
			"caption": "REPORTING PERMISSIONS",
			"iconPosition": "only-text"
		},
		"parentName": "Tabs",
		"propertyName": "items",
		"index": 4
	},
	{
		"operation": "insert",
		"name": "UsrMCITReportingPanel",
		"values": {
			"type": "crt.FlexContainer",
			"direction": "column",
			"items": [],
			"classes": [
				"usr-mcit-card",
				"usr-mcit-static-panel",
				"usrmcitreportingpanel"
			]
		},
		"parentName": "TabContainer_mdfdx0c",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrMCITReportingHeader",
		"values": {
			"type": "crt.FlexContainer",
			"direction": "row",
			"wrap": "wrap",
			"items": [],
			"classes": [
				"usr-mcit-static-panel-header"
			]
		},
		"parentName": "UsrMCITReportingPanel",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrMCITReportingTitle",
		"values": {
			"type": "crt.Label",
			"caption": "Reporting Permissions",
			"labelType": "headline-4",
			"classes": [
				"usr-mcit-static-panel-title"
			]
		},
		"parentName": "UsrMCITReportingHeader",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrReportingPermissionsGridWrap",
		"values": {
			"type": "crt.GridContainer",
			"columns": [
				"minmax(32px, 1fr)",
				"minmax(32px, 1fr)"
			],
			"rows": "auto",
			"items": []
		},
		"parentName": "UsrMCITReportingPanel",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrReportingPermissionsGrid",
		"values": {
			"type": "crt.DataGrid",
			"items": "$UsrReportingPermissionsGrid",
			"primaryColumnName": "UsrReportingPermissionsGridDS_Id",
			"fitContent": true,
			"columns": [
				{
					"id": "78065914-da8d-5fe3-163d-f5e52f3c1df7",
					"code": "UsrReportingPermissionsGridDS_UsrReport",
					"caption": "#ResourceString(UsrReportingPermissionsGrid_UsrReport_caption)#",
					"dataValueType": 10,
					"width": 240
				},
				{
					"id": "06e7acca-51a6-03b4-1deb-4344faffe89f",
					"code": "UsrReportingPermissionsGridDS_UsrCanView",
					"caption": "#ResourceString(UsrReportingPermissionsGrid_UsrCanView_caption)#",
					"dataValueType": 12,
					"width": 150
				}
			],
			"features": {
				"rows": {
					"selection": {
						"enable": true,
						"multiple": false
					}
				},
				"editable": {
					"enable": true,
					"itemsCreation": true,
					"floatingEditPanel": true
				},
				"header": {
					"visible": true
				},
				"columns": {
					"sorting": true,
					"resizing": true,
					"dragAndDrop": false
				}
			},
			"layoutConfig": {
				"column": 1,
				"row": 1,
				"colSpan": 2,
				"rowSpan": 1
			}
		},
		"parentName": "UsrReportingPermissionsGridWrap",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrReportingPermissionsGridTools",
		"values": {
			"type": "crt.GridContainer",
			"columns": [
				"minmax(32px, 1fr)"
			],
			"rows": "auto",
			"items": [],
			"classes": [
				"usr-mcit-static-panel-toolbar"
			]
		},
		"parentName": "UsrMCITReportingHeader",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrReportingPermissionsGridToolsRow",
		"values": {
			"type": "crt.FlexContainer",
			"direction": "row",
			"alignItems": "center",
			"gap": "none",
			"items": []
		},
		"parentName": "UsrReportingPermissionsGridTools",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrReportingPermissionsGridRefresh",
		"values": {
			"type": "crt.Button",
			"icon": "reload-icon",
			"iconPosition": "only-icon",
			"color": "default",
			"clicked": {
				"request": "crt.LoadDataRequest",
				"params": {
					"dataSourceName": "UsrReportingPermissionsGridDS",
					"config": {
						"loadType": "reload"
					}
				}
			}
		},
		"parentName": "UsrReportingPermissionsGridToolsRow",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrReportingPermissionsGridSettings",
		"values": {
			"type": "crt.Button",
			"icon": "actions-button-icon",
			"iconPosition": "only-icon",
			"color": "default",
			"clickMode": "menu",
			"menuItems": []
		},
		"parentName": "UsrReportingPermissionsGridToolsRow",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrReportingPermissionsGridExport",
		"values": {
			"type": "crt.MenuItem",
			"icon": "export-button-icon",
			"caption": "Export permissions",
			"clicked": {
				"request": "crt.ExportDataGridToExcelRequest",
				"params": {
					"viewName": "UsrReportingPermissionsGrid"
				}
			}
		},
		"parentName": "UsrReportingPermissionsGridSettings",
		"propertyName": "menuItems",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrReportingPermissionsGridImport",
		"values": {
			"type": "crt.MenuItem",
			"icon": "import-button-icon",
			"caption": "Import permissions",
			"clicked": {
				"request": "crt.ImportDataRequest",
				"params": {
					"entitySchemaName": "UsrMCITRoleReportingPermission"
				}
			}
		},
		"parentName": "UsrReportingPermissionsGridSettings",
		"propertyName": "menuItems",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrReportingPermissionsGridSearch",
		"values": {
			"type": "crt.SearchFilter",
			"iconOnly": true,
			"placeholder": "Search permissions",
			"_filterOptions": {
				"expose": [
					{
						"attribute": "UsrReportingPermissionsGridSearch_UsrReportingPermissionsGrid",
						"converters": [
							{
								"converter": "crt.SearchFilterAttributeConverter",
								"args": [
									"UsrReportingPermissionsGrid"
								]
							}
						]
					}
				],
				"from": [
					"UsrReportingPermissionsGridSearch_SearchValue",
					"UsrReportingPermissionsGridSearch_FilteredColumnsGroups"
				]
			}
		},
		"parentName": "UsrReportingPermissionsGridToolsRow",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "TabContainer_5194hoo",
		"values": {
			"type": "crt.TabContainer",
			"items": [],
			"caption": "ADMINISTRATIVE PERMISSIONS",
			"iconPosition": "only-text"
		},
		"parentName": "Tabs",
		"propertyName": "items",
		"index": 5
	},
	{
		"operation": "insert",
		"name": "UsrMCITAdminPanel",
		"values": {
			"type": "crt.FlexContainer",
			"direction": "column",
			"items": [],
			"classes": [
				"usr-mcit-card",
				"usr-mcit-static-panel",
				"usrmcitadminpanel"
			]
		},
		"parentName": "TabContainer_5194hoo",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrMCITAdminHeader",
		"values": {
			"type": "crt.FlexContainer",
			"direction": "row",
			"wrap": "wrap",
			"items": [],
			"classes": [
				"usr-mcit-static-panel-header"
			]
		},
		"parentName": "UsrMCITAdminPanel",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrMCITAdminTitle",
		"values": {
			"type": "crt.Label",
			"caption": "Administrative Permissions",
			"labelType": "headline-4",
			"classes": [
				"usr-mcit-static-panel-title"
			]
		},
		"parentName": "UsrMCITAdminHeader",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrAdminPermissionsGridWrap",
		"values": {
			"type": "crt.GridContainer",
			"columns": [
				"minmax(32px, 1fr)",
				"minmax(32px, 1fr)"
			],
			"rows": "auto",
			"items": []
		},
		"parentName": "UsrMCITAdminPanel",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrAdminPermissionsGrid",
		"values": {
			"type": "crt.DataGrid",
			"items": "$UsrAdminPermissionsGrid",
			"primaryColumnName": "UsrAdminPermissionsGridDS_Id",
			"fitContent": true,
			"columns": [
				{
					"id": "f34b9715-69e0-50a9-91bb-0bd09113a989",
					"code": "UsrAdminPermissionsGridDS_UsrCanManageUsers",
					"caption": "#ResourceString(UsrAdminPermissionsGrid_UsrCanManageUsers_caption)#",
					"dataValueType": 12,
					"width": 150
				},
				{
					"id": "e49dc366-3b6c-9f69-aacb-43c75fb7481f",
					"code": "UsrAdminPermissionsGridDS_UsrCanManageRoles",
					"caption": "#ResourceString(UsrAdminPermissionsGrid_UsrCanManageRoles_caption)#",
					"dataValueType": 12,
					"width": 150
				},
				{
					"id": "dc367eec-df07-9f61-2e48-126ea706dff3",
					"code": "UsrAdminPermissionsGridDS_UsrCanManageWorkflows",
					"caption": "#ResourceString(UsrAdminPermissionsGrid_UsrCanManageWorkflows_caption)#",
					"dataValueType": 12,
					"width": 150
				},
				{
					"id": "c230293a-4c25-c96d-eecd-b82b3ddb8bd8",
					"code": "UsrAdminPermissionsGridDS_UsrCanManageSLAPolicies",
					"caption": "#ResourceString(UsrAdminPermissionsGrid_UsrCanManageSLAPolicies_caption)#",
					"dataValueType": 12,
					"width": 150
				},
				{
					"id": "c8491866-12c6-b150-1b38-56bb31f39d04",
					"code": "UsrAdminPermissionsGridDS_UsrCanViewAuditLog",
					"caption": "#ResourceString(UsrAdminPermissionsGrid_UsrCanViewAuditLog_caption)#",
					"dataValueType": 12,
					"width": 150
				},
				{
					"id": "c299eadd-906c-3b43-3a86-e70012cd2b8e",
					"code": "UsrAdminPermissionsGridDS_UsrCanExportAuditLog",
					"caption": "#ResourceString(UsrAdminPermissionsGrid_UsrCanExportAuditLog_caption)#",
					"dataValueType": 12,
					"width": 150
				},
				{
					"id": "37202a76-efad-cb58-09c9-dc4ae7388fbb",
					"code": "UsrAdminPermissionsGridDS_UsrCanSystemConfigure",
					"caption": "#ResourceString(UsrAdminPermissionsGrid_UsrCanSystemConfigure_caption)#",
					"dataValueType": 12,
					"width": 150
				}
			],
			"features": {
				"rows": {
					"selection": {
						"enable": true,
						"multiple": false
					}
				},
				"editable": {
					"enable": true,
					"itemsCreation": true,
					"floatingEditPanel": true
				},
				"header": {
					"visible": true
				},
				"columns": {
					"sorting": true,
					"resizing": true,
					"dragAndDrop": false
				}
			},
			"layoutConfig": {
				"column": 1,
				"row": 1,
				"colSpan": 2,
				"rowSpan": 1
			}
		},
		"parentName": "UsrAdminPermissionsGridWrap",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrAdminPermissionsGridTools",
		"values": {
			"type": "crt.GridContainer",
			"columns": [
				"minmax(32px, 1fr)"
			],
			"rows": "auto",
			"items": [],
			"classes": [
				"usr-mcit-static-panel-toolbar"
			]
		},
		"parentName": "UsrMCITAdminHeader",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrAdminPermissionsGridToolsRow",
		"values": {
			"type": "crt.FlexContainer",
			"direction": "row",
			"alignItems": "center",
			"gap": "none",
			"items": []
		},
		"parentName": "UsrAdminPermissionsGridTools",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrAdminPermissionsGridRefresh",
		"values": {
			"type": "crt.Button",
			"icon": "reload-icon",
			"iconPosition": "only-icon",
			"color": "default",
			"clicked": {
				"request": "crt.LoadDataRequest",
				"params": {
					"dataSourceName": "UsrAdminPermissionsGridDS",
					"config": {
						"loadType": "reload"
					}
				}
			}
		},
		"parentName": "UsrAdminPermissionsGridToolsRow",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrAdminPermissionsGridSettings",
		"values": {
			"type": "crt.Button",
			"icon": "actions-button-icon",
			"iconPosition": "only-icon",
			"color": "default",
			"clickMode": "menu",
			"menuItems": []
		},
		"parentName": "UsrAdminPermissionsGridToolsRow",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrAdminPermissionsGridExport",
		"values": {
			"type": "crt.MenuItem",
			"icon": "export-button-icon",
			"caption": "Export permissions",
			"clicked": {
				"request": "crt.ExportDataGridToExcelRequest",
				"params": {
					"viewName": "UsrAdminPermissionsGrid"
				}
			}
		},
		"parentName": "UsrAdminPermissionsGridSettings",
		"propertyName": "menuItems",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrAdminPermissionsGridImport",
		"values": {
			"type": "crt.MenuItem",
			"icon": "import-button-icon",
			"caption": "Import permissions",
			"clicked": {
				"request": "crt.ImportDataRequest",
				"params": {
					"entitySchemaName": "UsrMCITRoleAdministrativePermission"
				}
			}
		},
		"parentName": "UsrAdminPermissionsGridSettings",
		"propertyName": "menuItems",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrAdminPermissionsGridSearch",
		"values": {
			"type": "crt.SearchFilter",
			"iconOnly": true,
			"placeholder": "Search permissions",
			"_filterOptions": {
				"expose": [
					{
						"attribute": "UsrAdminPermissionsGridSearch_UsrAdminPermissionsGrid",
						"converters": [
							{
								"converter": "crt.SearchFilterAttributeConverter",
								"args": [
									"UsrAdminPermissionsGrid"
								]
							}
						]
					}
				],
				"from": [
					"UsrAdminPermissionsGridSearch_SearchValue",
					"UsrAdminPermissionsGridSearch_FilteredColumnsGroups"
				]
			}
		},
		"parentName": "UsrAdminPermissionsGridToolsRow",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "TabContainer_0wqwdih",
		"values": {
			"type": "crt.TabContainer",
			"items": [],
			"caption": "ASSIGNED USERS",
			"iconPosition": "only-text"
		},
		"parentName": "Tabs",
		"propertyName": "items",
		"index": 6
	},
	{
		"operation": "insert",
		"name": "FlexContainer_pi5xshf",
		"values": {
			"type": "crt.FlexContainer",
			"direction": "row",
			"items": []
		},
		"parentName": "TabContainer_0wqwdih",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "Button_n3lharv",
		"values": {
			"type": "crt.Button",
			"caption": "#ResourceString(Button_n3lharv_caption)#",
			"color": "primary",
			"size": "large",
			"icon": "person-button-icon",
			"iconPosition": "left-icon",
			"classes": [
				"usr-mcit-action"
			],
			"clicked": {
				"request": "crt.RunBusinessProcessRequest",
				"params": {
					"processName": "UsrMCITAssignUserToRole",
					"processRunType": "ForTheSelectedPage",
					"saveAtProcessStart": true,
					"showNotification": true,
					"notificationText": "#ResourceString(Button_n3lharv_clicked_params_notificationText)#",
					"recordIdProcessParameterName": "MCITRoleId"
				}
			}
		},
		"parentName": "FlexContainer_pi5xshf",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "Button_tg337p6",
		"values": {
			"type": "crt.Button",
			"caption": "#ResourceString(Button_tg337p6_caption)#",
			"color": "primary",
			"size": "large",
			"icon": "image-update",
			"iconPosition": "left-icon",
			"classes": [
				"usr-mcit-action-secondary"
			],
			"clicked": {
				"request": "crt.LoadDataRequest",
				"params": {
					"config": {
						"loadType": "reload"
					},
					"refreshDataConfig": {
						"mode": "RefreshSpecific",
						"targetDataSourceNames": [
							"DataGrid_6bdu0haDS"
						]
					}
				}
			}
		},
		"parentName": "FlexContainer_pi5xshf",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "DataGrid_6bdu0ha",
		"values": {
			"type": "crt.DataGrid",
			"items": "$DataGrid_6bdu0ha",
			"primaryColumnName": "DataGrid_6bdu0haDS_Id",
			"fitContent": true,
			"placeholder": false,
			"classes": [
				"usr-mcit-table"
			],
			"features": {
				"rows": {
					"selection": false,
					"numeration": false
				},
				"editable": {
					"enable": false,
					"itemsCreation": false,
					"floatingEditPanel": false
				},
				"header": {
					"visible": true
				},
				"columns": {
					"resizing": false,
					"dragAndDrop": false,
					"sorting": true
				}
			},
			"columns": [
				{
					"id": "16d07434-f5e3-4567-89ab-000000000000",
					"code": "DataGrid_6bdu0haDS_CreatedBy",
					"caption": "Created By",
					"dataValueType": 10
				},
				{
					"id": "17d075c7-f5e3-4567-89ab-000000000001",
					"code": "DataGrid_6bdu0haDS_SysUser",
					"caption": "User",
					"dataValueType": 10
				},
				{
					"id": "18d0775a-f5e3-4567-89ab-000000000002",
					"code": "DataGrid_6bdu0haDS_SysUser_Email",
					"caption": "Email",
					"dataValueType": 28
				},
				{
					"id": "19d078ed-f5e3-4567-89ab-000000000003",
					"code": "DataGrid_6bdu0haDS_SysRole",
					"caption": "Role",
					"dataValueType": 10
				}
			]
		},
		"parentName": "TabContainer_0wqwdih",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "TabContainer_wsi30mm",
		"values": {
			"type": "crt.TabContainer",
			"items": [],
			"caption": "CHANGE SUMMARY",
			"iconPosition": "only-text"
		},
		"parentName": "Tabs",
		"propertyName": "items",
		"index": 7
	},
	{
		"operation": "insert",
		"name": "UsrMCITChangeSummaryPanel",
		"values": {
			"type": "crt.FlexContainer",
			"direction": "column",
			"items": [],
			"classes": [
				"usr-mcit-card",
				"usr-mcit-static-panel",
				"usrmcitchangesummarypanel"
			]
		},
		"parentName": "TabContainer_wsi30mm",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrMCITFieldHistoryPanel",
		"values": {
			"type": "crt.FlexContainer",
			"direction": "column",
			"items": [],
			"classes": [
				"usr-mcit-card",
				"usr-mcit-static-panel",
				"usr-mcit-field-history-panel"
			]
		},
		"parentName": "TabContainer_wsi30mm",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrMCITFieldHistoryHeader",
		"values": {
			"type": "crt.FlexContainer",
			"direction": "row",
			"wrap": "wrap",
			"items": [],
			"classes": [
				"usr-mcit-static-panel-header"
			]
		},
		"parentName": "UsrMCITFieldHistoryPanel",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrMCITFieldHistoryNote",
		"values": {
			"type": "crt.Label",
			"caption": "Saved field changes for this role. Existing audit values are shown as recorded, including system field names and empty initial values.",
			"labelType": "body",
			"classes": [
				"usr-mcit-static-panel-note",
				"usr-mcit-audit-note"
			]
		},
		"parentName": "UsrMCITFieldHistoryPanel",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrMCITRoleHistoryHeader",
		"values": {
			"type": "crt.FlexContainer",
			"direction": "row",
			"wrap": "wrap",
			"items": [],
			"classes": [
				"usr-mcit-static-panel-header"
			]
		},
		"parentName": "UsrMCITChangeSummaryPanel",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrMCITRoleHistoryTitle",
		"values": {
			"type": "crt.Label",
			"caption": "Role Activity and Change History",
			"labelType": "headline-4",
			"classes": [
				"usr-mcit-static-panel-title"
			]
		},
		"parentName": "UsrMCITRoleHistoryHeader",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrMCITRoleActivityNote",
		"values": {
			"type": "crt.Label",
			"caption": "Read-only events written to MCIT Business Audit Event for this role. Save the role first; events are recorded only after auditing is enabled.",
			"labelType": "body",
			"classes": [
				"usr-mcit-note",
				"usr-mcit-audit-note"
			]
		},
		"parentName": "UsrMCITChangeSummaryPanel",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrMCITRoleActivityGrid",
		"values": {
			"type": "crt.DataGrid",
			"items": "$UsrMCITRoleActivityGrid",
			"primaryColumnName": "UsrMCITRoleActivityGridDS_Id",
			"fitContent": true,
			"placeholder": false,
			"classes": [
				"usr-mcit-table",
				"usr-mcit-role-history-grid",
				"usr-mcit-history-grid"
			],
			"features": {
				"rows": {
					"selection": false,
					"numeration": false
				},
				"editable": {
					"enable": false,
					"itemsCreation": false,
					"floatingEditPanel": false
				},
				"header": {
					"visible": true
				},
				"columns": {
					"resizing": true,
					"sorting": true,
					"dragAndDrop": false
				}
			},
			"columns": [
				{
					"id": "1cd66243-602a-4e9b-8335-77b84be51201",
					"code": "UsrMCITRoleActivityGridDS_CreatedOn",
					"caption": "Date / Time",
					"dataValueType": 7,
					"width": 170
				},
				{
					"id": "1cd66243-602a-4e9b-8335-77b84be51202",
					"code": "UsrMCITRoleActivityGridDS_UsrAction",
					"caption": "Action",
					"dataValueType": 28,
					"width": 120
				},
				{
					"id": "1cd66243-602a-4e9b-8335-77b84be51203",
					"code": "UsrMCITRoleActivityGridDS_UsrEventCode",
					"caption": "Event Code",
					"dataValueType": 28,
					"width": 190
				},
				{
					"id": "1cd66243-602a-4e9b-8335-77b84be51204",
					"code": "UsrMCITRoleActivityGridDS_UsrActor",
					"caption": "Actor",
					"dataValueType": 10,
					"width": 140
				},
				{
					"id": "1cd66243-602a-4e9b-8335-77b84be51205",
					"code": "UsrMCITRoleActivityGridDS_UsrOutcome",
					"caption": "Outcome",
					"dataValueType": 28,
					"width": 100
				},
				{
					"id": "1cd66243-602a-4e9b-8335-77b84be51206",
					"code": "UsrMCITRoleActivityGridDS_UsrDescription",
					"caption": "Details",
					"dataValueType": 28,
					"width": 360
				}
			]
		},
		"parentName": "UsrMCITChangeSummaryPanel",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "UsrMCITRoleAuditRefresh",
		"values": {
			"type": "crt.Button",
			"caption": "Refresh history",
			"color": "default",
			"size": "medium",
			"icon": "reload-icon",
			"iconPosition": "left-icon",
			"clicked": {
				"request": "usr.MCITRefreshRoleHistory"
			},
			"classes": [
				"usr-mcit-history-refresh"
			]
		},
		"parentName": "UsrMCITRoleHistoryHeader",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrMCITRoleFieldHistoryTitle",
		"values": {
			"type": "crt.Label",
			"caption": "Field-Level History",
			"labelType": "headline-4",
			"classes": [
				"usr-mcit-static-panel-title"
			]
		},
		"parentName": "UsrMCITFieldHistoryHeader",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrMCITRoleChangeGrid",
		"values": {
			"type": "crt.DataGrid",
			"items": "$UsrMCITRoleChangeGrid",
			"primaryColumnName": "UsrMCITRoleChangeGridDS_Id",
			"fitContent": true,
			"placeholder": false,
			"classes": [
				"usr-mcit-table",
				"usr-mcit-role-history-grid",
				"usr-mcit-history-grid"
			],
			"features": {
				"rows": {
					"selection": false,
					"numeration": false
				},
				"editable": {
					"enable": false,
					"itemsCreation": false,
					"floatingEditPanel": false
				},
				"header": {
					"visible": true
				},
				"columns": {
					"resizing": true,
					"sorting": true,
					"dragAndDrop": false
				}
			},
			"columns": [
				{
					"id": "1bd66243-602a-4e9b-8335-77b84be51211",
					"code": "UsrMCITRoleChangeGridDS_CreatedOn",
					"caption": "Changed On",
					"dataValueType": 7,
					"width": 170
				},
				{
					"id": "1bd66243-602a-4e9b-8335-77b84be51212",
					"code": "UsrMCITRoleChangeGridDS_UsrFieldName",
					"caption": "Field",
					"dataValueType": 28,
					"width": 230
				},
				{
					"id": "1bd66243-602a-4e9b-8335-77b84be51213",
					"code": "UsrMCITRoleChangeGridDS_UsrOldValue",
					"caption": "Previous Value",
					"dataValueType": 28,
					"width": 245
				},
				{
					"id": "1bd66243-602a-4e9b-8335-77b84be51214",
					"code": "UsrMCITRoleChangeGridDS_UsrNewValue",
					"caption": "New Value",
					"dataValueType": 28,
					"width": 245
				},
				{
					"id": "1bd66243-602a-4e9b-8335-77b84be51215",
					"code": "UsrMCITRoleChangeGridDS_UsrChangeType",
					"caption": "Change Type",
					"dataValueType": 28,
					"width": 310
				}
			]
		},
		"parentName": "UsrMCITFieldHistoryPanel",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "UsrMCITQueueHelp",
		"values": {
			"type": "crt.Label",
			"caption": "Queues appear after the role is saved. Use the grid to assign available queues and switch Access on or off.",
			"labelType": "body",
			"classes": [
				"usr-mcit-note"
			]
		},
		"parentName": "UsrMCITQueuePanel",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrMCITReportingHelp",
		"values": {
			"type": "crt.Label",
			"caption": "Reporting access is stored per MCIT role. Create one row for each report, then set Allow viewing. This flag must also be enforced by the server.",
			"labelType": "body",
			"classes": [
				"usr-mcit-note"
			]
		},
		"parentName": "UsrMCITReportingPanel",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrMCITAdminHelp",
		"values": {
			"type": "crt.Label",
			"caption": "Administrative flags are stored against this role. These settings do not replace native Creatio operation, object, or record permissions.",
			"labelType": "body",
			"classes": [
				"usr-mcit-note"
			]
		},
		"parentName": "UsrMCITAdminPanel",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrMCITAssignedUsersHelp",
		"values": {
			"type": "crt.Label",
			"caption": "Assigned users are read from Creatio role membership. Save this role and make sure Linked Creatio Role is set before refreshing this list.",
			"labelType": "body",
			"classes": [
				"usr-mcit-note"
			]
		},
		"parentName": "TabContainer_0wqwdih",
		"propertyName": "items",
		"index": 0
	},
{
  "operation": "insert",
  "name": "UsrLifecycleActions",
  "values": {
    "type": "crt.FlexContainer",
    "direction": "row",
    "wrap": "wrap",
    "items": []
  },
  "parentName": "UsrMCITRoleHero",
  "propertyName": "items",
  "index": 1
},
{
  "operation": "insert",
  "name": "UsrLifecycleActivate",
  "values": {
    "type": "crt.Button",
    "caption": "Activate",
    "size": "small",
    "color": "primary",
    "clicked": {
      "request": "usr.MCITLifecycle",
      "params": {
        "action": "Activate"
      }
    },
    "visible": "$UsrLifecycleCanActivate"
  },
  "parentName": "UsrLifecycleActions",
  "propertyName": "items",
  "index": 0
},
{
  "operation": "insert",
  "name": "UsrLifecycleCreateDraft",
  "values": {
    "type": "crt.Button",
    "caption": "Create draft",
    "size": "small",
    "color": "default",
    "clicked": {
      "request": "usr.MCITLifecycle",
      "params": {
        "action": "CreateDraft"
      }
    },
    "visible": "$UsrLifecycleCanCreateDraft"
  },
  "parentName": "UsrLifecycleActions",
  "propertyName": "items",
  "index": 1
},
{
  "operation": "insert",
  "name": "UsrLifecycleDeactivate",
  "values": {
    "type": "crt.Button",
    "caption": "Deactivate",
    "size": "small",
    "color": "default",
    "clicked": {
      "request": "usr.MCITLifecycle",
      "params": {
        "action": "Deactivate"
      }
    },
    "visible": "$UsrLifecycleCanDeactivate"
  },
  "parentName": "UsrLifecycleActions",
  "propertyName": "items",
  "index": 2
},
{
  "operation": "insert",
  "name": "UsrLifecycleAbandonDraft",
  "values": {
    "type": "crt.Button",
    "caption": "Discard draft",
    "size": "small",
    "color": "default",
    "clicked": {
      "request": "usr.MCITLifecycle",
      "params": {
        "action": "AbandonDraft"
      }
    },
    "visible": "$UsrLifecycleCanDiscardDraft"
  },
  "parentName": "UsrLifecycleActions",
  "propertyName": "items",
  "index": 3
},
{
  "operation": "merge",
  "name": "Button_n3lharv",
  "values": {
    "caption": "Assign user",
    "visible": "$UsrLifecycleCanAssign",
    "clicked": {
      "request": "usr.MCITMembership",
      "params": {
        "action": "Assign"
      }
    }
  }
},
{
  "operation": "insert",
  "name": "UsrUnassignUser",
  "values": {
    "type": "crt.Button",
    "caption": "Remove direct membership",
    "visible": "$UsrLifecycleCanAssign",
    "clicked": {
      "request": "usr.MCITMembership",
      "params": {
        "action": "Unassign"
      }
    }
  },
  "parentName": "FlexContainer_pi5xshf",
  "propertyName": "items",
  "index": 2
},
{
  "operation": "merge",
  "name": "DataGrid_1yq715a",
  "values": {
    "features": {
      "editable": {
        "enable": "$UsrLifecycleCanEdit",
        "itemsCreation": false
      }
    }
  }
},
{
  "operation": "merge",
  "name": "UsrDataScopeGrid",
  "values": {
    "features": {
      "editable": {
        "enable": "$UsrLifecycleCanEdit",
        "itemsCreation": false
      }
    }
  }
},
{
  "operation": "merge",
  "name": "DataGrid_cjsl4aj",
  "values": {
    "features": {
      "editable": {
        "enable": "$UsrLifecycleCanEdit",
        "itemsCreation": false
      }
    }
  }
},
{
  "operation": "merge",
  "name": "UsrAdminPermissionsGrid",
  "values": {
    "features": {
      "editable": {
        "enable": "$UsrLifecycleCanEdit",
        "itemsCreation": false
      }
    }
  }
},
{"operation": "merge", "name": "UsrReportingPermissionsGrid", "values": {"features": {"editable": {"enable": "$UsrLifecycleCanEdit", "itemsCreation": false}}}},
{"operation": "merge", "name": "ComboBox_jdrqqpc", "values": {"readonly": true}}
]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"attributes"
				],
				"values": {
					"UsrMCITRoleDS_UsrRoleCategory_pvorvyc": {
						"modelConfig": {
							"path": "UsrMCITRoleDS.UsrRoleCategory"
						}
					},
					"UsrMCITRoleDS_UsrName_n9pu298": {
						"modelConfig": {
							"path": "UsrMCITRoleDS.UsrName"
						}
					},
					"UsrMCITRoleDS_UsrScopeBehavior_k2vuil1": {
						"modelConfig": {
							"path": "UsrMCITRoleDS.UsrScopeBehavior"
						}
					},
					"UsrMCITRoleDS_UsrMCITRoleStatuses_6o62qb3": {
						"modelConfig": {
							"path": "UsrMCITRoleDS.UsrMCITRoleStatuses"
						}
					},
					"UsrMCITRoleDS_UsrDescription_ouy3rc1": {
						"modelConfig": {
							"path": "UsrMCITRoleDS.UsrDescription"
						}
					},
					"UsrMCITRoleDS_UsrProvisioningError_4yjz5yl": {
						"modelConfig": {
							"path": "UsrMCITRoleDS.UsrProvisioningError"
						}
					},
					"UsrMCITRoleDS_UsrRoleCategory_pvorvyc_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "Name",
										"direction": "asc"
									}
								]
							}
						}
					},
					"UsrMCITRoleDS_UsrScopeBehavior_k2vuil1_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "Name",
										"direction": "asc"
									}
								]
							}
						}
					},
					"UsrMCITRoleDS_UsrMCITRoleStatuses_6o62qb3_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "Name",
										"direction": "asc"
									}
								]
							}
						}
					},
					"UsrScopeBannerTitle": {
						"value": "Scope Behavior: Not configured"
					},
					"UsrScopeBannerDescription": {
						"value": "Data scope rules for this role are listed below."
					},
					"UsrMCITRoleCategoryLabel": {
						"value": "Role category not set"
					},
					"UsrMCITRoleStatusLabel": {
						"value": "Status not set"
					},
					"UsrLifecycleCanEdit": {"value":false},
"UsrLifecycleCanActivate": {"value":false},
"UsrLifecycleCanDeactivate": {"value":false},
"UsrLifecycleCanCreateDraft": {"value":false},
"UsrLifecycleCanDiscardDraft": {"value":false},
"UsrLifecycleCanAssign": {"value":false},
"UsrLifecycleBusy": {"value":false},
"UsrMCITIsActiveRole": {
						"value": false
					},
					"UsrMCITScreenSyncStatus": {"value": "Save the role to initialize screen permissions."},
					"DataGrid_1yq715a": {
						"isCollection": true,
					"modelConfig": {
    "path": "DataGrid_1yq715aDS",
    "filterAttributes": [
        {
            "name": "UsrMCITActiveScreenFilter",
            "loadOnChange": true
        }
    ]
},
						"viewModelConfig": {
							"attributes": {
								"DataGrid_1yq715aDS_UsrScreen": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrScreen"
									}
								},
								"DataGrid_1yq715aDS_UsrCanView": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrCanView"
									}
								},
								"DataGrid_1yq715aDS_UsrCanCreate": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrCanCreate"
									}
								},
								"DataGrid_1yq715aDS_UsrCanEdit": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrCanEdit"
									}
								},
								"DataGrid_1yq715aDS_UsrCanApprove": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrCanApprove"
									}
								},
								"DataGrid_1yq715aDS_UsrCanAssign": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrCanAssign"
									}
								},
								"DataGrid_1yq715aDS_UsrCanExport": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrCanExport"
									}
								},
								"DataGrid_1yq715aDS_UsrCanConfigure": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrCanConfigure"
									}
								},
								"DataGrid_1yq715aDS_UsrCanActivate": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrCanActivate"
									}
								},
								"DataGrid_1yq715aDS_Id": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.Id"
									}
								},
								"DataGrid_1yq715aDS_UsrMCITRole": {
									"modelConfig": {
										"path": "DataGrid_1yq715aDS.UsrMCITRole"
									}
								}
							}
						}
					},
					
"UsrMCITActiveScreenFilter": {
    "value": {
        "filterType": 6,
        "logicalOperation": 0,
        "isEnabled": true,
        "items": {
            "ActiveScreenCondition": {
                "filterType": 4,
                "comparisonType": 3,
                "isEnabled": true,
                "leftExpression": {
                    "expressionType": 0,
                    "columnPath": "UsrScreen.UsrIsActive"
                },
                "dataValueType": 12,
                "rightExpressions": [
                    {
                        "expressionType": 2,
                        "parameter": {
                            "dataValueType": 12,
                            "value": true
                        }
                    }
                ]
            }
        }
    }
},

					"UsrDataScopeGrid": {
						"isCollection": true,
						"modelConfig": {
							"path": "UsrDataScopeGridDS",
							"sortingConfig": {
								"default": [
									{
										"columnName": "UsrSortOrder",
										"direction": "asc"
									}
								]
							}
						},
						"viewModelConfig": {
							"attributes": {
								"UsrDataScopeGridDS_UsrScopeType": {
									"modelConfig": {
										"path": "UsrDataScopeGridDS.UsrScopeType"
									}
								},
								"UsrDataScopeGridDS_UsrAllowedValues": {
									"modelConfig": {
										"path": "UsrDataScopeGridDS.UsrAllowedValues"
									}
								},
								"UsrDataScopeGridDS_UsrDescription": {
									"modelConfig": {
										"path": "UsrDataScopeGridDS.UsrDescription"
									}
								},
								"UsrDataScopeGridDS_Id": {
									"modelConfig": {
										"path": "UsrDataScopeGridDS.Id"
									}
								}
							}
						}
					},
					"DataGrid_cjsl4aj": {
						"isCollection": true,
						"modelConfig": {
							"path": "DataGrid_cjsl4ajDS"
						},
						"viewModelConfig": {
							"attributes": {
								"DataGrid_cjsl4ajDS_UsrQueue": {
									"modelConfig": {
										"path": "DataGrid_cjsl4ajDS.UsrQueue"
									}
								},
								"DataGrid_cjsl4ajDS_UsrQueue_UsrDescription": {
									"modelConfig": {
										"path": "DataGrid_cjsl4ajDS.UsrQueue_UsrDescription"
									}
								},
								"DataGrid_cjsl4ajDS_UsrIsEnabled": {
									"modelConfig": {
										"path": "DataGrid_cjsl4ajDS.UsrIsEnabled"
									}
								},
								"DataGrid_cjsl4ajDS_Id": {
									"modelConfig": {
										"path": "DataGrid_cjsl4ajDS.Id"
									}
								}
							}
						}
					},
					"DataGrid_6bdu0ha": {
						"isCollection": true,
						"modelConfig": {
							"path": "DataGrid_6bdu0haDS",
							"filterAttributes": [
								{
									"loadOnChange": true,
									"name": "DataGrid_6bdu0ha_PredefinedFilter"
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"DataGrid_6bdu0haDS_CreatedBy": {
									"modelConfig": {
										"path": "DataGrid_6bdu0haDS.CreatedBy"
									}
								},
								"DataGrid_6bdu0haDS_SysUser": {
									"modelConfig": {
										"path": "DataGrid_6bdu0haDS.SysUser"
									}
								},
								"DataGrid_6bdu0haDS_SysUser_Email": {
									"modelConfig": {
										"path": "DataGrid_6bdu0haDS.SysUser_Email"
									}
								},
								"DataGrid_6bdu0haDS_SysRole": {
									"modelConfig": {
										"path": "DataGrid_6bdu0haDS.SysRole"
									}
								},
								"DataGrid_6bdu0haDS_Id": {
									"modelConfig": {
										"path": "DataGrid_6bdu0haDS.Id"
									}
								}
							}
						}
					},
					"DataGrid_6bdu0ha_PredefinedFilter": {
						"value": {
							"items": {},
							"logicalOperation": 0,
							"isEnabled": true,
							"filterType": 6,
							"rootSchemaName": "SysUserInRole"
						}
					},
					"UsrAdminPermissionsGrid": {
						"isCollection": true,
						"modelConfig": {
							"path": "UsrAdminPermissionsGridDS",
							"filterAttributes": [
								{
									"name": "UsrAdminPermissionsGridSearch_UsrAdminPermissionsGrid",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"UsrAdminPermissionsGridDS_Id": {
									"modelConfig": {
										"path": "UsrAdminPermissionsGridDS.Id"
									}
								},
								"UsrAdminPermissionsGridDS_UsrMCITRole": {
									"modelConfig": {
										"path": "UsrAdminPermissionsGridDS.UsrMCITRole"
									}
								},
								"UsrAdminPermissionsGridDS_UsrCanManageUsers": {
									"modelConfig": {
										"path": "UsrAdminPermissionsGridDS.UsrCanManageUsers"
									}
								},
								"UsrAdminPermissionsGridDS_UsrCanManageRoles": {
									"modelConfig": {
										"path": "UsrAdminPermissionsGridDS.UsrCanManageRoles"
									}
								},
								"UsrAdminPermissionsGridDS_UsrCanManageWorkflows": {
									"modelConfig": {
										"path": "UsrAdminPermissionsGridDS.UsrCanManageWorkflows"
									}
								},
								"UsrAdminPermissionsGridDS_UsrCanManageSLAPolicies": {
									"modelConfig": {
										"path": "UsrAdminPermissionsGridDS.UsrCanManageSLAPolicies"
									}
								},
								"UsrAdminPermissionsGridDS_UsrCanViewAuditLog": {
									"modelConfig": {
										"path": "UsrAdminPermissionsGridDS.UsrCanViewAuditLog"
									}
								},
								"UsrAdminPermissionsGridDS_UsrCanExportAuditLog": {
									"modelConfig": {
										"path": "UsrAdminPermissionsGridDS.UsrCanExportAuditLog"
									}
								},
								"UsrAdminPermissionsGridDS_UsrCanSystemConfigure": {
									"modelConfig": {
										"path": "UsrAdminPermissionsGridDS.UsrCanSystemConfigure"
									}
								}
							}
						}
					},
					"UsrReportingPermissionsGrid": {
						"isCollection": true,
						"modelConfig": {
							"path": "UsrReportingPermissionsGridDS",
							"filterAttributes": [
								{
									"name": "UsrReportingPermissionsGridSearch_UsrReportingPermissionsGrid",
									"loadOnChange": true
								}
							]
						},
						"viewModelConfig": {
							"attributes": {
								"UsrReportingPermissionsGridDS_Id": {
									"modelConfig": {
										"path": "UsrReportingPermissionsGridDS.Id"
									}
								},
								"UsrReportingPermissionsGridDS_UsrMCITRole": {
									"modelConfig": {
										"path": "UsrReportingPermissionsGridDS.UsrMCITRole"
									}
								},
								"UsrReportingPermissionsGridDS_UsrReport": {
									"modelConfig": {
										"path": "UsrReportingPermissionsGridDS.UsrReport"
									}
								},
								"UsrReportingPermissionsGridDS_UsrCanView": {
									"modelConfig": {
										"path": "UsrReportingPermissionsGridDS.UsrCanView"
									}
								}
							}
						}
					},
					"UsrMCITRoleActivityGrid": {
					  "isCollection": true,
					  "modelConfig": {
					    "path": "UsrMCITRoleActivityGridDS",
					    "sortingConfig": {
					      "default": [
					        {
					          "columnName": "CreatedOn",
					          "direction": "desc"
					        }
					      ]
					    }
					  },
					  "viewModelConfig": {
					    "attributes": {
					      "UsrMCITRoleActivityGridDS_Id": {
					        "modelConfig": {
					          "path": "UsrMCITRoleActivityGridDS.Id"
					        }
					      },
					      "UsrMCITRoleActivityGridDS_CreatedOn": {
					        "modelConfig": {
					          "path": "UsrMCITRoleActivityGridDS.CreatedOn"
					        }
					      },
					      "UsrMCITRoleActivityGridDS_UsrAction": {
					        "modelConfig": {
					          "path": "UsrMCITRoleActivityGridDS.UsrAction"
					        }
					      },
					      "UsrMCITRoleActivityGridDS_UsrEventCode": {
					        "modelConfig": {
					          "path": "UsrMCITRoleActivityGridDS.UsrEventCode"
					        }
					      },
					      "UsrMCITRoleActivityGridDS_UsrActor": {
					        "modelConfig": {
					          "path": "UsrMCITRoleActivityGridDS.UsrActor"
					        }
					      },
					      "UsrMCITRoleActivityGridDS_UsrOutcome": {
					        "modelConfig": {
					          "path": "UsrMCITRoleActivityGridDS.UsrOutcome"
					        }
					      },
					      "UsrMCITRoleActivityGridDS_UsrDescription": {
					        "modelConfig": {
					          "path": "UsrMCITRoleActivityGridDS.UsrDescription"
					        }
					      },
					      "UsrMCITRoleActivityGridDS_UsrRecordId": {
					        "modelConfig": {
					          "path": "UsrMCITRoleActivityGridDS.UsrRecordId"
					        }
					      }
					    }
					  }
					},
					"UsrMCITRoleChangeGrid": {
					  "isCollection": true,
					  "modelConfig": {
					    "path": "UsrMCITRoleChangeGridDS",
					    "sortingConfig": {
					      "default": [
					        {
					          "columnName": "CreatedOn",
					          "direction": "desc"
					        }
					      ]
					    }
					  },
					  "viewModelConfig": {
					    "attributes": {
					      "UsrMCITRoleChangeGridDS_Id": {
					        "modelConfig": {
					          "path": "UsrMCITRoleChangeGridDS.Id"
					        }
					      },
					      "UsrMCITRoleChangeGridDS_CreatedOn": {
					        "modelConfig": {
					          "path": "UsrMCITRoleChangeGridDS.CreatedOn"
					        }
					      },
					      "UsrMCITRoleChangeGridDS_UsrFieldName": {
					        "modelConfig": {
					          "path": "UsrMCITRoleChangeGridDS.UsrFieldName"
					        }
					      },
					      "UsrMCITRoleChangeGridDS_UsrOldValue": {
					        "modelConfig": {
					          "path": "UsrMCITRoleChangeGridDS.UsrOldValue"
					        }
					      },
					      "UsrMCITRoleChangeGridDS_UsrNewValue": {
					        "modelConfig": {
					          "path": "UsrMCITRoleChangeGridDS.UsrNewValue"
					        }
					      },
					      "UsrMCITRoleChangeGridDS_UsrChangeType": {
					        "modelConfig": {
					          "path": "UsrMCITRoleChangeGridDS.UsrChangeType"
					        }
					      },
					      "UsrMCITRoleChangeGridDS_UsrMCITRole": {
					        "modelConfig": {
					          "path": "UsrMCITRoleChangeGridDS.UsrMCITRole"
					        }
					      }
					    }
					  }
					}
				}
			}
		]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [],
				"values": {
					"dataSources": {
						"UsrMCITRoleDS": {
							"type": "crt.EntityDataSource",
							"scope": "page",
							"config": {
								"entitySchemaName": "UsrMCITRole",
								"allowCopyingRecords": false
							}
						},
						"DataGrid_1yq715aDS": {
							"type": "crt.EntityDataSource",
							"scope": "viewElement",
							"config": {
								"entitySchemaName": "UsrMCITRoleScreenPermission",
								"attributes": {
									"UsrScreen": {
										"path": "UsrScreen"
									},
									"UsrCanView": {
										"path": "UsrCanView"
									},
									"UsrCanCreate": {
										"path": "UsrCanCreate"
									},
									"UsrCanEdit": {
										"path": "UsrCanEdit"
									},
									"UsrCanApprove": {
										"path": "UsrCanApprove"
									},
									"UsrCanAssign": {
										"path": "UsrCanAssign"
									},
									"UsrCanExport": {
										"path": "UsrCanExport"
									},
									"UsrCanConfigure": {
										"path": "UsrCanConfigure"
									},
									"UsrCanActivate": {
										"path": "UsrCanActivate"
									},
									"UsrMCITRole": {
										"path": "UsrMCITRole"
									}
								}
							}
						},
						"UsrDataScopeGridDS": {
							"type": "crt.EntityDataSource",
							"scope": "viewElement",
							"config": {
								"entitySchemaName": "UsrMCITRoleDataScopeRule",
								"attributes": {
									"UsrScopeType": {
										"path": "UsrScopeType"
									},
									"UsrAllowedValues": {
										"path": "UsrAllowedValues"
									},
									"UsrDescription": {
										"path": "UsrDescription"
									},
									"UsrSortOrder": {
										"path": "UsrSortOrder"
									}
								}
							}
						},
						"DataGrid_cjsl4ajDS": {
							"type": "crt.EntityDataSource",
							"scope": "viewElement",
							"config": {
								"entitySchemaName": "UsrMCITRoleQueuePermission",
								"attributes": {
									"UsrQueue": {
										"path": "UsrQueue"
									},
									"UsrIsEnabled": {
										"path": "UsrIsEnabled"
									},
									"UsrQueue_UsrDescription": {
										"type": "ForwardReference",
										"path": "UsrQueue.UsrDescription"
									}
								}
							}
						},
						"DataGrid_6bdu0haDS": {
							"type": "crt.EntityDataSource",
							"scope": "viewElement",
							"config": {
								"entitySchemaName": "SysUserInRole",
								"attributes": {
									"CreatedBy": {
										"path": "CreatedBy"
									},
									"SysUser": {
										"path": "SysUser"
									},
									"SysUser_Email": {
										"type": "ForwardReference",
										"path": "SysUser.Email"
									},
									"SysRole": {
										"path": "SysRole"
									}
								}
							}
						},
						"UsrAdminPermissionsGridDS": {
							"type": "crt.EntityDataSource",
							"scope": "viewElement",
							"config": {
								"entitySchemaName": "UsrMCITRoleAdministrativePermission",
								"attributes": {
									"Id": {
										"path": "Id"
									},
									"UsrMCITRole": {
										"path": "UsrMCITRole"
									},
									"UsrCanManageUsers": {
										"path": "UsrCanManageUsers"
									},
									"UsrCanManageRoles": {
										"path": "UsrCanManageRoles"
									},
									"UsrCanManageWorkflows": {
										"path": "UsrCanManageWorkflows"
									},
									"UsrCanManageSLAPolicies": {
										"path": "UsrCanManageSLAPolicies"
									},
									"UsrCanViewAuditLog": {
										"path": "UsrCanViewAuditLog"
									},
									"UsrCanExportAuditLog": {
										"path": "UsrCanExportAuditLog"
									},
									"UsrCanSystemConfigure": {
										"path": "UsrCanSystemConfigure"
									}
								},
								"allowCopyingRecords": false
							}
						},
						"UsrReportingPermissionsGridDS": {
							"type": "crt.EntityDataSource",
							"scope": "viewElement",
							"config": {
								"entitySchemaName": "UsrMCITRoleReportingPermission",
								"attributes": {
									"Id": {
										"path": "Id"
									},
									"UsrMCITRole": {
										"path": "UsrMCITRole"
									},
									"UsrReport": {
										"path": "UsrReport"
									},
									"UsrCanView": {
										"path": "UsrCanView"
									}
								},
								"allowCopyingRecords": false
							}
						},
						"UsrMCITRoleActivityGridDS": {
						  "type": "crt.EntityDataSource",
						  "scope": "viewElement",
						  "config": {
						    "entitySchemaName": "UsrMCITBusinessAuditEvent",
						    "attributes": {
						      "Id": {
						        "path": "Id"
						      },
						      "CreatedOn": {
						        "path": "CreatedOn"
						      },
						      "UsrRecordId": {
						        "path": "UsrRecordId"
						      },
						      "UsrEventCode": {
						        "path": "UsrEventCode"
						      },
						      "UsrAction": {
						        "path": "UsrAction"
						      },
						      "UsrActor": {
						        "path": "UsrActor"
						      },
						      "UsrOutcome": {
						        "path": "UsrOutcome"
						      },
						      "UsrDescription": {
						        "path": "UsrDescription"
						      }
						    },
						    "allowCopyingRecords": false
						  }
						},
						"UsrMCITRoleChangeGridDS": {
						  "type": "crt.EntityDataSource",
						  "scope": "viewElement",
						  "config": {
						    "entitySchemaName": "UsrMCITRoleChangeLog",
						    "attributes": {
						      "Id": {
						        "path": "Id"
						      },
						      "CreatedOn": {
						        "path": "CreatedOn"
						      },
						      "UsrMCITRole": {
						        "path": "UsrMCITRole"
						      },
						      "UsrFieldName": {
						        "path": "UsrFieldName"
						      },
						      "UsrOldValue": {
						        "path": "UsrOldValue"
						      },
						      "UsrNewValue": {
						        "path": "UsrNewValue"
						      },
						      "UsrChangeType": {
						        "path": "UsrChangeType"
						      }
						    },
						    "allowCopyingRecords": false
						  }
						}
					},
					"primaryDataSourceName": "UsrMCITRoleDS",
					"dependencies": {
						"DataGrid_1yq715aDS": [
							{
								"attributePath": "UsrMCITRole",
								"relationPath": "UsrMCITRoleDS.Id"
							}
						],
						"UsrDataScopeGridDS": [
							{
								"attributePath": "UsrMCITRole",
								"relationPath": "UsrMCITRoleDS.Id"
							}
						],
						"DataGrid_cjsl4ajDS": [
							{
								"attributePath": "UsrMCITRole",
								"relationPath": "UsrMCITRoleDS.Id"
							}
						],
						"DataGrid_6bdu0haDS": [
							{
								"attributePath": "SysRole",
								"relationPath": "UsrMCITRoleDS.UsrRole"
							}
						],
						"UsrAdminPermissionsGridDS": [
							{
								"attributePath": "UsrMCITRole",
								"relationPath": "UsrMCITRoleDS.Id"
							}
						],
						"UsrReportingPermissionsGridDS": [
							{
								"attributePath": "UsrMCITRole",
								"relationPath": "UsrMCITRoleDS.Id"
							}
						],
						"UsrMCITRoleActivityGridDS": [{"attributePath":"UsrRecordId","relationPath":"UsrMCITRoleDS.Id"}],
						"UsrMCITRoleChangeGridDS": [{"attributePath":"UsrMCITRole","relationPath":"UsrMCITRoleDS.Id"}]
					}
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[
            {
                request:"usr.MCITLifecycle",
                handler:async(request)=>{
                    const ctx=request.$context;
                    if (await ctx.UsrLifecycleBusy) return false;
                    ctx.UsrLifecycleBusy=true;
                    try {
                        const role=await mcitScreenRole(ctx,sdk);
                        if (!role) throw new Error("Save the role before using this action.");
                        // Persist form edits before activation/provisioning, but not read-only source pages.
                        if (role.status.toLowerCase()==="draft" && request.action!=="AbandonDraft") {
                            const saved=await ctx.executeRequest({type:"crt.SaveRecordRequest",$context:ctx,preventCardClose:true});
                            if (saved===false || saved?.success===false) return false;
                        }
                        const result=await mcitCall(ctx,request.action,role.id);
                        await mcitMessage(ctx,"Role updated",result.Message);
                        if (mcitScreenId(result.RoleId)!==role.id) {
                            await ctx.executeRequest({type:"crt.OpenPageRequest",$context:ctx,
                                schemaName:"UsrPage_k837yjw",modelInitConfigs:[{action:"edit",recordId:result.RoleId}]});
                        } else {
                            await ctx.executeRequest({type:"crt.LoadDataRequest",$context:ctx,
                                dataSourceName:"UsrMCITRoleDS",config:{loadType:"reload"}});
                            await mcitReloadAll(ctx);
                        }
                        return true;
                    } catch(error) {await mcitMessage(ctx,"Role action failed",String(error.message||error)); return false;}
                    finally {ctx.UsrLifecycleBusy=false;}
                }
            },
            {
                request:"usr.MCITMembership",
                handler:async(request)=>{
                    const ctx=request.$context;
                    try {
                        const role=await mcitScreenRole(ctx,sdk);
                        if (!role) throw new Error("Save and activate the role first.");
                        const state=await mcitCall(ctx,"Inspect",role.id);
                        if (!state.CanAssign) throw new Error("Users can be assigned only to an active role.");
                        const filters = new sdk.FilterGroup();
                        await filters.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,"SysAdminUnitTypeValue",4);
                        await filters.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,"ConnectionType",0);
                        if (request.action==="Assign") await filters.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,"Active",true);
                        const filter = Object.assign({},filters); filter.items=filters.items;
                        return sdk.HandlerChainService.instance.process({
                            filtersConfig:{filterAttributes:[{name:"MCITUsersFilter",loadOnChange:false}],
                                attributesConfig:{MCITUsersFilter:{value:filter}}},
                            type:"crt.OpenSelectionWindowRequest",$context:ctx,scopes:request.scopes || [],
                            entitySchemaName:"SysAdminUnit",caption:request.action==="Assign"?"Select user to assign":"Select user to remove",
                            features:{select:{multiple:false,selectAll:false},create:{enabled:false}},
                            afterClosed:async(result)=>{
                                if (result.canceled) return;
                                try {
                                    const users=await result.getLookupValues();
                                    const id=mcitScreenId(users[0]);
                                    if (!id) return;
                                    const changed=await mcitCall(ctx,request.action,role.id,id);
                                    await mcitReloadAll(ctx);
                                    await mcitMessage(ctx,"Membership updated",changed.Message);
                                } catch(error) {await mcitMessage(ctx,"Membership failed",String(error.message||error));}
                            }
                        });
                    } catch(error) {await mcitMessage(ctx,"Membership failed",String(error.message||error)); return false;}
                }
            },

            {
                request: "usr.MCITRefreshRoleHistory",
                handler: async (request) => {
                    const ctx = request.$context;
                    const names = ["UsrMCITRoleActivityGridDS", "UsrMCITRoleChangeGridDS"];
                    const results = await Promise.allSettled(names.map(dataSourceName =>
                        ctx.executeRequest({
                            type: "crt.LoadDataRequest",
                            $context: ctx,
                            dataSourceName,
                            config: { loadType: "reload" }
                        })
                    ));
                    const errors = results
                        .map((result, i) => result.status === "rejected"
                            ? names[i] + ": " + String(result.reason?.message || result.reason)
                            : null)
                        .filter(Boolean);
                    if (errors.length) {
                        console.error("MCIT Change Summary refresh failed", errors.join(" | "));
                        await ctx.executeRequest({
                            type: "crt.ShowDialogRequest",
                            $context: ctx,
                            dialogConfig: {data: {
                                title: "History refresh failed",
                                message: errors.join("\n"),
                                actions: [{key: "OK", config: {color: "primary", caption: "OK"}}]
                            }}
                        });
                    }
                    return errors.length === 0;
                }
            },

            {
                request: "crt.HandleViewModelInitRequest",
                handler: async (request, next) => {
                    const result=await next?.handle(request);
                    if (!mcitScreenIsDesigner()) {
                        // Delay permits native data-source initialization before reading the role Id.
                        setTimeout(()=>{
                            mcitScreenSync(request.$context,sdk).catch(err=>
                              console.warn("MCIT screen initialization",err));

                        },300);
                    }
                    return result;
                }
            },
            {
                request: "usr.MCITRefreshScreenPermissions",
                handler: async (request) => {
                    try {return await mcitScreenSync(request.$context,sdk);}
                    catch (_) {return null;}
                }
            },


            {
                request: "crt.HandleViewModelAttributeChangeRequest",

                handler: async (request, next) => {

                    const value =
                        request.value?.displayValue ||
                        request.value?.Name ||
                        "";

                    const ctx = request.$context;

                    if (
                        request.attributeName ===
                        "UsrMCITRoleDS_UsrRoleCategory_pvorvyc"
                    ) {
                        ctx.UsrMCITRoleCategoryLabel =
                            value || "Role category not set";
                    }

                    if (
                        request.attributeName ===
                        "UsrMCITRoleDS_UsrMCITRoleStatuses_6o62qb3"
                    ) {
                        ctx.UsrMCITRoleStatusLabel =
                            value || "Status not set";

                        ctx.UsrMCITIsActiveRole =
                            String(value).toLowerCase() === "active";
                    }

                    if (
                        request.attributeName ===
                        "UsrMCITRoleDS_UsrScopeBehavior_k2vuil1"
                    ) {

                        ctx.UsrScopeBannerTitle =
                            "Scope Behavior: " +
                            (value || "Not configured");

                        const s = String(value).toLowerCase();

                        ctx.UsrScopeBannerDescription =
                            s.includes("contract")
                                ? "Configured for contract-scoped access; see rules below."
                                : s.includes("authority")
                                    ? "Configured for authority-scoped access; see rules below."
                                    : s.includes("project")
                                        ? "Configured for project-scoped access; see rules below."
                                        : "Data scope rules for this role are listed below.";
                    }

                    return next?.handle(request);
                }
            },

            {
                request: "crt.SaveRecordRequest",

                handler: async (request, next) => {

                    const ctx = request.$context;

                    const show = (title, message) =>
                        ctx.executeRequest({
                            type: "crt.ShowDialogRequest",
                            $context: ctx,

                            dialogConfig: {
                                data: {
                                    title,
                                    message,

                                    actions: [{
                                        key: "OK",
                                        config: {
                                            color: "primary",
                                            caption: "OK"
                                        }
                                    }]
                                }
                            }
                        });

                    try {

                        const name = String(
                            (await ctx.UsrMCITRoleDS_UsrName_n9pu298) ?? ""
                        ).trim();

                        if (!name) {
                            await show(
                                "Validation Error",
                                "Role Name is required."
                            );
                            return;
                        }

                        const pds =
                            await ctx.getPrimaryModelName();

                        const schema =
                            await ctx.dataSchemas[pds];

                        const id = String(
                            (
                                schema?.primaryAttributeName
                                    ? await ctx[schema.primaryAttributeName]
                                    : null
                            ) ??
                            (await ctx.Id) ??
                            ""
                        ).toLowerCase();

                        const filter = new sdk.FilterGroup();

                        await filter.addSchemaColumnFilterWithParameter(
                            sdk.ComparisonType.Equal,
                            "UsrName",
                            name
                        );

                        const plainFilter =
                            Object.assign({}, filter);

                        plainFilter.items = filter.items;

                        const model =
                            await sdk.Model.create("UsrMCITRole");

                        const records = await model.load({
                            attributes: ["Id"],

                            parameters: [{
                                type: sdk.ModelParameterType.Filter,
                                value: plainFilter
                            }]
                        });

                        if (!Array.isArray(records)) {
                            throw new Error(
                                "Could not load MCIT Role records."
                            );
                        }

                        if (
                            records.some(
                                r =>
                                    String(r.Id).toLowerCase() !== id
                            )
                        ) {
                            await show(
                                "Duplicate Role Name",
                                "Role name already exists."
                            );
                            return;
                        }

                        const saved=await next?.handle(request);
                        if (saved === false || saved?.success === false) return saved;
                        // Normal Save synchronizes after persisting. Lifecycle actions (such as
                        // Activate) perform their own native-role synchronization in C#.
                        // Skip an extra Provision call for those internal Save requests.
                        if (!mcitScreenIsDesigner() && !(await ctx.UsrLifecycleBusy)) {
                            const role=await mcitScreenRole(ctx,sdk);
                            if (role) {
                                try {
                                    await mcitCall(ctx,"Provision",role.id);
                                    await mcitReloadAll(ctx);
                                } catch (error) {
                                    await show("Role saved; synchronization failed", String(error.message || error));
                                    return false;
                                }
                            }
                        }
                        return saved;

                    } catch (error) {

                        console.error(
                            "MCIT Role validation error",
                            error
                        );

                        await show(
                            "Save Validation Error",
                            error?.message || String(error)
                        );

                        return;
                    }
                }
            }

        ]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});