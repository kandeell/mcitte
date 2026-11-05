/**
 * MCIT – Finance Configuration page with a separate Resource Rates tab.
 * Uses the existing UsrConfigResourceRate object. No database schema changes.
 * Add button uses an SDK-backed editor so no object record page is required.
 * Preserve a backup; test on MCITLU before promoting to a shared branch.
 */
define("UsrFinanceConfig_ListPage", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {

    // --- Add Resource Rate: isolated modal and SDK persistence. The surrounding
    // TabPanel, DataGrid, and filters remain designer-native and unchanged.
    // No assumption that an object record page is registered in Application Hub.
    const usrRateLookupSchemas = {
        versions: ["UsrContractConfigVersion"],
        types: ["UsrMCITResourceType", "UsrResourceType", "UsrMCITResourceTypes"],
        units: ["UsrPricingUnit", "UsrPricingUnitLookup", "UsrMCITPricingUnit", "UsrMCITPricingUnitLookup", "UsrResourcePricingUnit", "UsrResourceUnit", "UsrMCITUnitOfMeasure", "UnitOfMeasure"],
        currencies: ["Currency", "UsrCurrency", "UsrMCITCurrency"]
    };
    const usrGuidRe = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;
    const usrId = v => typeof v === "string" ? v : (v?.value || v?.Id || null);

    async function usrLoadOptions(kind) {
        const names = usrRateLookupSchemas[kind];
        const columns = kind === "versions" ? [["Id", "UsrName", "UsrVersionNumber", "UsrContract"]] :
            [["Id", "Name"], ["Id", "UsrEnglishName", "UsrResourceCode"],
                ["Id", "UsrName"], ["Id", "UsrCode", "Name"]];
        for (const schema of names) {
            for (const fields of columns) {
                try {
                    const model = await sdk.Model.create(schema);
                    const rows = await model.load({
                        attributes: fields,
                        options: {pagingConfig: {rowsOffset: 0, rowCount: 500}}
                    });
                    if (!rows?.length) { continue; }
                    const result = rows.map(row => {
                        const id = usrId(row.Id);
                        let label;
                        if (kind === "versions") {
                            const contract = row.UsrContract?.displayValue || "";
                            label = `${row.UsrName || ""} ${row.UsrVersionNumber ? "· " + row.UsrVersionNumber : ""}${contract ? " (" + contract + ")" : ""}`;
                        } else {
                            label = row.UsrEnglishName || row.Name || row.UsrName || row.UsrCode || row.UsrResourceCode;
                        }
                        return {id, label: String(label || "").trim()};
                    }).filter(x => usrGuidRe.test(String(x.id)) && x.label);
                    if (result.length) { return {schema, options: result}; }
                } catch (e) {
                    // A candidate may be absent or have different display columns.
                    console.debug("MCIT rate lookup candidate unavailable", kind, schema, fields, e);
                }
            }
        }
        return {schema: null, options: []};
    }

    function usrRateStyles() {
        if (document.getElementById("usr-mcit-rate-editor-css")) { return; }
        const el = document.createElement("style");
        el.id = "usr-mcit-rate-editor-css";
        el.textContent = `
            .usr-rate-mask{position:fixed;inset:0;z-index:2147482900;background:rgba(23,20,38,.55);display:flex;justify-content:center;align-items:center;padding:18px;box-sizing:border-box}
            .usr-rate-dialog{box-sizing:border-box;width:min(720px,100%);max-height:92vh;overflow:auto;background:#fff;border-radius:15px;box-shadow:0 25px 70px #18112450;color:#19304c;font:13px/1.5 Arial,sans-serif}
            .usr-rate-head{padding:20px 24px;border-bottom:1px solid #e9ebf1;display:flex;justify-content:space-between;align-items:center;gap:14px}
            .usr-rate-head strong{font-size:18px}.usr-rate-body{padding:23px 24px;display:grid;grid-template-columns:1fr 1fr;gap:17px 15px}
            .usr-rate-field{display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:600}
            .usr-rate-field input,.usr-rate-field select{min-width:0;width:100%;box-sizing:border-box;border:1px solid #d6d9e5;border-radius:8px;padding:10px;background:#fff;color:#24324b;font:13px Arial,sans-serif}
            .usr-rate-field input:focus,.usr-rate-field select:focus{outline:2px solid #b9a0fd;border-color:#7330db}
            .usr-rate-wide{grid-column:1/-1}.usr-rate-notice{font-size:11px;color:#6e7794;font-weight:400}
            .usr-rate-errors{color:#c12a39;white-space:pre-line;background:#fff6f7;border-radius:8px;padding:8px 10px;margin:0 24px 10px;display:none}
            .usr-rate-actions{padding:16px 24px;border-top:1px solid #e8e9ef;display:flex;justify-content:flex-end;gap:10px}
            .usr-rate-actions button,.usr-rate-close{border:1px solid #d9dce5;background:#fff;border-radius:9px;cursor:pointer;padding:9px 16px;color:#263653}
            .usr-rate-actions .usr-rate-save{background:#691cda;color:white;border:0;font-weight:700}
            .usr-rate-actions button:disabled{opacity:.6;cursor:wait}
            @media(max-width:560px){.usr-rate-body{grid-template-columns:1fr}.usr-rate-head,.usr-rate-body,.usr-rate-actions{padding:14px}.usr-rate-wide{grid-column:auto}}
        `;
        document.head.appendChild(el);
    }

    async function usrOpenRateEditor(ctx) {
        if (typeof document === "undefined") { return; }
        document.getElementById("usr-mcit-rate-editor")?.remove();
        usrRateStyles();
        const mask = document.createElement("div");
        mask.id = "usr-mcit-rate-editor";
        mask.className = "usr-rate-mask";
        const dialog = document.createElement("section");
        dialog.className = "usr-rate-dialog";
        dialog.setAttribute("role", "dialog");
        dialog.setAttribute("aria-modal", "true");
        dialog.setAttribute("aria-label", "Add configuration resource rate");
        const head = document.createElement("div");
        head.className = "usr-rate-head";
        const title = document.createElement("strong");
        title.textContent = "Add Resource Rate";
        const closeButton = document.createElement("button");
        closeButton.className = "usr-rate-close";
        closeButton.textContent = "✕";
        closeButton.setAttribute("aria-label", "Close");
        head.append(title, closeButton);
        const body = document.createElement("div");
        body.className = "usr-rate-body";
        const errors = document.createElement("div");
        errors.className = "usr-rate-errors";
        errors.setAttribute("role", "alert");
        const footer = document.createElement("div");
        footer.className = "usr-rate-actions";
        const cancel = document.createElement("button");
        cancel.textContent = "Cancel";
        const save = document.createElement("button");
        save.className = "usr-rate-save";
        save.textContent = "Save Rate";
        save.disabled = true;
        footer.append(cancel, save);
        dialog.append(head, body, errors, footer);
        mask.appendChild(dialog);
        document.body.appendChild(mask);
        const close = () => mask.remove();
        closeButton.addEventListener("click", close);
        cancel.addEventListener("click", close);
        mask.addEventListener("click", e => {if (e.target === mask) { close(); }});
        mask.addEventListener("keydown", e => {if (e.key === "Escape") {close();}});
        const report = msg => {errors.textContent = msg; errors.style.display = "block";};
        const makeField = (label, type = "text", required = true, wide = false) => {
            const wrapper = document.createElement("label");
            wrapper.className = "usr-rate-field" + (wide ? " usr-rate-wide" : "");
            const cap = document.createElement("span");
            cap.textContent = label + (required ? " *" : "");
            const input = document.createElement(type === "select" ? "select" : "input");
            if (type !== "select") {input.type = type;}
            input.required = required;
            wrapper.append(cap, input);
            body.appendChild(wrapper);
            return input;
        };
        const name = makeField("Rate name", "text", true, true);
        name.placeholder = "e.g. Additional RAM - v1";
        const versions = makeField("Configuration Version", "select");
        const types = makeField("Resource Type", "select");
        const units = makeField("Pricing Unit", "select");
        const currency = makeField("Currency", "select");
        const amount = makeField("Amount per Unit", "number");
        const points = makeField("Points per Unit", "number");
        for (const input of [amount, points]) {input.min = "0"; input.step = "any";}
        amount.value = "0"; points.value = "0";
        const hint = document.createElement("div");
        hint.className = "usr-rate-notice usr-rate-wide";
        hint.textContent = "Only real Creatio lookup records can be selected. Values are saved in UsrConfigResourceRate after validation.";
        body.appendChild(hint);
        const combo = {versions, types, units, currencies: currency};
        const specs = await Promise.all(["versions", "types", "units", "currencies"].map(usrLoadOptions));
        if (!mask.isConnected) {return;}
        const missing = [];
        ["versions", "types", "units", "currencies"].forEach((key, i) => {
            const control = combo[key];
            const placeholder = document.createElement("option");
            placeholder.textContent = "Select " + key.replace(/ies$/, "y");
            placeholder.value = "";
            control.appendChild(placeholder);
            for (const row of specs[i].options) {
                const option = document.createElement("option");
                option.value = row.id; option.textContent = row.label;
                control.appendChild(option);
            }
            if (!specs[i].options.length) {missing.push(key);}
        });
        if (specs[0].options.length === 1) {versions.value = specs[0].options[0].id;}
        if (missing.length) {
            report("Cannot load lookup records for: " + missing.join(", ") + ".\nOpen the corresponding lookup and confirm its Object/Data source. Save is blocked to prevent incorrect references.");
            return;
        }
        save.disabled = false;
        const desired = await ctx?.UsrResourceRateVersionFilterValue;
        const selected = Array.isArray(desired) ? desired[0] : desired;
        const selectedVersion = usrId(selected);
        if (usrGuidRe.test(String(selectedVersion)) && [...versions.options].some(o => o.value === selectedVersion)) {
            versions.value = selectedVersion;
        }
        save.addEventListener("click", async () => {
            errors.style.display = "none";
            const val = [versions, types, units, currency].map(x => x.value);
            const price = Number(amount.value), pts = Number(points.value);
            if (!name.value.trim() || val.some(v => !usrGuidRe.test(v)) ||
                amount.value.trim() === "" || points.value.trim() === "" ||
                !Number.isFinite(price) || !Number.isFinite(pts) || price < 0 || pts < 0) {
                report("Enter a rate name, select all four lookups, and enter non-negative price and points values.");
                return;
            }
            save.disabled = true;
            save.textContent = "Saving…";
            try {
                const model = await sdk.Model.create("UsrConfigResourceRate");
                const result = await model.insert({
                    UsrName: name.value.trim(), UsrConfigVersion: versions.value,
                    UsrResourceType: types.value, UsrPricingUnitLookup: units.value,
                    UsrCurrency: currency.value, UsrAmountPerUnit: price, UsrPointsPerUnit: pts
                });
                if (!result?.success || !(result.rowsAffected > 0)) {
                    throw new Error("Creatio did not confirm the database insert. Check permissions and required columns.");
                }
                const recordId = result?.primaryAttributes?.[0]?.Id;
                if (usrGuidRe.test(String(recordId))) {
                    const verified = await model.load({attributes: ["Id", "UsrName"], parameters: [{
                        type: sdk.ModelParameterType.PrimaryColumnValue, value: recordId
                    }]});
                    if (!verified?.length) {
                        report("Insert returned success, but the created record could not be read back. Do not click Save again; refresh and check permissions.");
                        save.textContent = "Save Rate";
                        return;
                    }
                }
                close();
                try {
                    await ctx.executeRequest({type: "crt.LoadDataRequest", dataSourceName: "UsrResourceRateDS",
                        config: {loadType: "reload", useLastLoadParameters: true}, $context: ctx});
                } catch (err) {
                    console.warn("MCIT Resource Rate saved; grid reload failed. Use Refresh.", err);
                }
            } catch (e) {
                console.error("MCIT resource rate insert failed", e);
                report("Could not save the Resource Rate: " + (e?.message || String(e)));
                save.disabled = false;
                save.textContent = "Save Rate";
            }
        });
        name.focus();
    }

    return {
        viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
    {
        "operation": "merge",
        "name": "AddButton",
        "values": {
            "caption": "New Version",
            "size": "large"
        }
    },
    {
        "operation": "merge",
        "name": "MenuItem_ImportFromExcel",
        "values": {
            "clicked": {
                "request": "crt.ImportDataRequest",
                "params": {
                    "entitySchemaName": "UsrContractConfigVersion"
                }
            }
        }
    },
    {
        "operation": "merge",
        "name": "MainContainer",
        "values": {
            "color": "#F8FAFC",
            "visible": true,
            "padding": {
                "top": "none",
                "right": "none",
                "bottom": "none",
                "left": "none"
            },
            "borderRadius": "none",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap"
        }
    },
    {
        "operation": "merge",
        "name": "MainFilterContainer",
        "values": {
            "alignItems": "stretch"
        }
    },
    {
        "operation": "merge",
        "name": "LeftFilterContainer",
        "values": {
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 3,
                "rowSpan": 1
            }
        }
    },
    {
        "operation": "remove",
        "name": "RightFilterContainer",
        "properties": [
            "layoutConfig"
        ]
    },
    {
        "operation": "move",
        "name": "RightFilterContainer",
        "parentName": "LeftFilterContainerInner",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "merge",
        "name": "FolderTree",
        "values": {
            "rootSchemaName": "UsrContractConfigVersion"
        }
    },
    {
        "operation": "merge",
        "name": "DataTable",
        "values": {
            "columns": [
                {
                    "id": "f252f581-0ccf-44ac-b7c9-c00df2ad9919",
                    "code": "PDS_UsrName",
                    "caption": "Configuration name",
                    "dataValueType": 1
                },
                {
                    "id": "6d36ec7b-19bc-41a9-8817-372021eb7f31",
                    "code": "PDS_UsrContract",
                    "caption": "Contract",
                    "dataValueType": 10
                },
                {
                    "id": "de6957c8-9e66-4884-a186-8a3d50ae0f92",
                    "code": "PDS_UsrVersionNumber",
                    "caption": "Version number",
                    "dataValueType": 1
                },
                {
                    "id": "abc418bc-4520-4505-9654-ac3a172efa41",
                    "code": "PDS_UsrConfigVersionStatus",
                    "caption": "Status",
                    "dataValueType": 10
                },
                {
                    "id": "fb55fc03-cdf1-4fea-86ce-247099fdb8b7",
                    "code": "PDS_UsrEffectiveFrom",
                    "caption": "Effective from",
                    "dataValueType": 7
                },
                {
                    "id": "2a5478b5-c412-490f-a3b3-cab89b6842de",
                    "code": "PDS_UsrEffectiveTo",
                    "caption": "Effective to",
                    "dataValueType": 7
                },
                {
                    "id": "c8689d78-80ba-4e71-8cf2-fa478e3be5bc",
                    "code": "PDS_CreatedOn",
                    "caption": "Created on",
                    "dataValueType": 7
                },
                {
                    "id": "fd4b3485-a46e-4219-b775-adef1210fe51",
                    "code": "PDS_CreatedBy",
                    "caption": "Created by",
                    "dataValueType": 10
                }
            ]
        }
    },
    {
        "operation": "merge",
        "name": "Dashboards",
        "values": {
            "_designOptions": {
                "entitySchemaName": "UsrContractConfigVersion",
                "dependencies": [
                    {
                        "attributePath": "Id",
                        "relationPath": "PDS.Id"
                    }
                ],
                "filters": []
            }
        }
    },
    {
        "operation": "insert",
        "name": "FlexContainer_f2avkan",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "fitContent": true,
            "visible": true,
            "padding": {
                "top": "large",
                "right": "large",
                "bottom": "large",
                "left": "large"
            },
            "color": "#F8FAFC",
            "borderRadius": "small",
            "alignItems": "stretch",
            "justifyContent": "center",
            "gap": "large"
        },
        "parentName": "MainContainer",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "IndicatorWidget_2df1nqy",
        "values": {
            "type": "crt.IndicatorWidget",
            "config": {
                "title": "#ResourceString(IndicatorWidget_2df1nqy_title)#",
                "theme": "without-fill",
                "layout": {
                    "color": "violet"
                },
                "text": {
                    "template": "#ResourceString(IndicatorWidget_2df1nqy_config_text_template)#",
                    "metricMacros": "{0}",
                    "labelPosition": "above-under",
                    "fontSizeMode": "medium"
                },
                "data": {
                    "formatting": {
                        "type": "number",
                        "decimalPrecision": 0,
                        "decimalSeparator": ".",
                        "thousandSeparator": ","
                    },
                    "comparisonProviding": null,
                    "providing": {
                        "attribute": "IndicatorWidget_2df1nqy_Data",
                        "schemaName": "UsrContractConfigVersion",
                        "filters": {
                            "filter": {
                                "items": {
                                    "ed0a3dca-cde0-4190-9c62-9ef210a2f8be": {
                                        "filterType": 4,
                                        "comparisonType": 3,
                                        "isEnabled": true,
                                        "trimDateTimeParameterToDate": false,
                                        "leftExpression": {
                                            "expressionType": 0,
                                            "columnPath": "UsrConfigVersionStatus"
                                        },
                                        "isAggregative": false,
                                        "dataValueType": 10,
                                        "referenceSchemaName": "UsrConfigVersionStatus",
                                        "rightExpressions": [
                                            {
                                                "expressionType": 2,
                                                "parameter": {
                                                    "dataValueType": 10,
                                                    "value": {
                                                        "Name": "Draft",
                                                        "Id": "d153cb20-1a9c-44bf-8ced-1a53f88eed22",
                                                        "value": "d153cb20-1a9c-44bf-8ced-1a53f88eed22",
                                                        "displayValue": "Draft"
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                "logicalOperation": 0,
                                "isEnabled": true,
                                "filterType": 6,
                                "rootSchemaName": "UsrContractConfigVersion"
                            },
                            "filterAttributes": [
                                {
                                    "attribute": "QuickFilter_ghstixv_IndicatorWidget_2df1nqy_Data",
                                    "loadOnChange": true
                                }
                            ]
                        },
                        "aggregation": {
                            "column": {
                                "orderDirection": 0,
                                "orderPosition": -1,
                                "isVisible": true,
                                "expression": {
                                    "expressionType": 1,
                                    "functionArgument": {
                                        "expressionType": 0,
                                        "columnPath": "Id"
                                    },
                                    "functionType": 2,
                                    "aggregationType": 1,
                                    "aggregationEvalType": 2
                                }
                            }
                        },
                        "dependencies": []
                    }
                },
                "comparison": {
                    "type": null,
                    "text": ""
                },
                "hint": "#ResourceString(IndicatorWidget_2df1nqy_hint)#"
            },
            "visible": true,
            "layoutConfig": {
                "width": 202.390625
            }
        },
        "parentName": "FlexContainer_f2avkan",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "IndicatorWidget_hzkxiee",
        "values": {
            "type": "crt.IndicatorWidget",
            "config": {
                "title": "#ResourceString(IndicatorWidget_hzkxiee_title)#",
                "theme": "without-fill",
                "layout": {
                    "color": "violet"
                },
                "text": {
                    "template": "#ResourceString(IndicatorWidget_hzkxiee_config_text_template)#",
                    "metricMacros": "{0}",
                    "labelPosition": "above-under",
                    "fontSizeMode": "medium"
                },
                "data": {
                    "formatting": {
                        "type": "number",
                        "decimalPrecision": 0,
                        "decimalSeparator": ".",
                        "thousandSeparator": ","
                    },
                    "comparisonProviding": null,
                    "providing": {
                        "attribute": "IndicatorWidget_hzkxiee_Data",
                        "schemaName": "UsrContractConfigVersion",
                        "filters": {
                            "filter": {
                                "items": {
                                    "0b90afa8-619f-465d-ac85-4f8f631121c2": {
                                        "filterType": 4,
                                        "comparisonType": 3,
                                        "isEnabled": true,
                                        "trimDateTimeParameterToDate": false,
                                        "leftExpression": {
                                            "expressionType": 0,
                                            "columnPath": "UsrConfigVersionStatus"
                                        },
                                        "isAggregative": false,
                                        "dataValueType": 10,
                                        "referenceSchemaName": "UsrConfigVersionStatus",
                                        "rightExpressions": [
                                            {
                                                "expressionType": 2,
                                                "parameter": {
                                                    "dataValueType": 10,
                                                    "value": {
                                                        "Name": "Scheduled",
                                                        "Id": "1cd0011f-6971-49b3-a5b8-04d46130daee",
                                                        "value": "1cd0011f-6971-49b3-a5b8-04d46130daee",
                                                        "displayValue": "Scheduled"
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                "logicalOperation": 0,
                                "isEnabled": true,
                                "filterType": 6,
                                "rootSchemaName": "UsrContractConfigVersion"
                            },
                            "filterAttributes": [
                                {
                                    "attribute": "QuickFilter_ghstixv_IndicatorWidget_hzkxiee_Data",
                                    "loadOnChange": true
                                }
                            ]
                        },
                        "aggregation": {
                            "column": {
                                "orderDirection": 0,
                                "orderPosition": -1,
                                "isVisible": true,
                                "expression": {
                                    "expressionType": 1,
                                    "functionArgument": {
                                        "expressionType": 0,
                                        "columnPath": "Id"
                                    },
                                    "functionType": 2,
                                    "aggregationType": 1,
                                    "aggregationEvalType": 2
                                }
                            }
                        },
                        "dependencies": []
                    }
                },
                "comparison": {
                    "type": null,
                    "text": ""
                },
                "hint": "#ResourceString(IndicatorWidget_hzkxiee_hint)#"
            },
            "visible": true,
            "layoutConfig": {
                "width": 173.359375
            }
        },
        "parentName": "FlexContainer_f2avkan",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "IndicatorWidget_so5fw0r",
        "values": {
            "type": "crt.IndicatorWidget",
            "config": {
                "title": "#ResourceString(IndicatorWidget_so5fw0r_title)#",
                "theme": "without-fill",
                "layout": {
                    "color": "violet"
                },
                "text": {
                    "template": "#ResourceString(IndicatorWidget_so5fw0r_config_text_template)#",
                    "metricMacros": "{0}",
                    "labelPosition": "above-under",
                    "fontSizeMode": "medium"
                },
                "data": {
                    "formatting": {
                        "type": "number",
                        "decimalPrecision": 0,
                        "decimalSeparator": ".",
                        "thousandSeparator": ","
                    },
                    "comparisonProviding": null,
                    "providing": {
                        "attribute": "IndicatorWidget_so5fw0r_Data",
                        "schemaName": "UsrContractConfigVersion",
                        "filters": {
                            "filter": {
                                "items": {
                                    "0fce6e57-280e-445f-acfb-7107e3bbf905": {
                                        "filterType": 4,
                                        "comparisonType": 3,
                                        "isEnabled": true,
                                        "trimDateTimeParameterToDate": false,
                                        "leftExpression": {
                                            "expressionType": 0,
                                            "columnPath": "UsrConfigVersionStatus"
                                        },
                                        "isAggregative": false,
                                        "dataValueType": 10,
                                        "referenceSchemaName": "UsrConfigVersionStatus",
                                        "rightExpressions": [
                                            {
                                                "expressionType": 2,
                                                "parameter": {
                                                    "dataValueType": 10,
                                                    "value": {
                                                        "Name": "Active",
                                                        "Id": "e7d05248-9d33-41c3-b688-c0b172b039cc",
                                                        "value": "e7d05248-9d33-41c3-b688-c0b172b039cc",
                                                        "displayValue": "Active"
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                "logicalOperation": 0,
                                "isEnabled": true,
                                "filterType": 6,
                                "rootSchemaName": "UsrContractConfigVersion"
                            },
                            "filterAttributes": [
                                {
                                    "attribute": "QuickFilter_ghstixv_IndicatorWidget_so5fw0r_Data",
                                    "loadOnChange": true
                                }
                            ]
                        },
                        "aggregation": {
                            "column": {
                                "orderDirection": 0,
                                "orderPosition": -1,
                                "isVisible": true,
                                "expression": {
                                    "expressionType": 1,
                                    "functionArgument": {
                                        "expressionType": 0,
                                        "columnPath": "Id"
                                    },
                                    "functionType": 2,
                                    "aggregationType": 1,
                                    "aggregationEvalType": 2
                                }
                            }
                        },
                        "dependencies": []
                    }
                },
                "comparison": {
                    "type": null,
                    "text": ""
                },
                "hint": "#ResourceString(IndicatorWidget_so5fw0r_hint)#"
            },
            "visible": true,
            "layoutConfig": {
                "width": 219.78125
            }
        },
        "parentName": "FlexContainer_f2avkan",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "QuickFilter_ghstixv",
        "values": {
            "type": "crt.QuickFilter",
            "config": {
                "caption": "#ResourceString(QuickFilter_ghstixv_config_caption)#",
                "hint": "",
                "icon": "filter-column-icon",
                "iconPosition": "left-icon",
                "defaultValue": [],
                "entitySchemaName": "UsrMCITContract",
                "recordsFilter": null,
                "defaultValueListSorting": null
            },
            "_filterOptions": {
                "expose": [
                    {
                        "attribute": "QuickFilter_ghstixv_Items",
                        "converters": [
                            {
                                "converter": "crt.QuickFilterAttributeConverter",
                                "args": [
                                    {
                                        "target": {
                                            "viewAttributeName": "Items",
                                            "filterColumn": "UsrContract"
                                        },
                                        "quickFilterType": "lookup"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "from": "QuickFilter_ghstixv_Value"
            },
            "filterType": "lookup"
        },
        "parentName": "LeftFilterContainerInner",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "QuickFilter_g9wucbw",
        "values": {
            "type": "crt.QuickFilter",
            "config": {
                "caption": "#ResourceString(QuickFilter_g9wucbw_config_caption)#",
                "hint": "",
                "icon": "filter-column-icon",
                "iconPosition": "left-icon",
                "defaultValue": [],
                "entitySchemaName": "UsrConfigVersionStatus",
                "recordsFilter": null,
                "defaultValueListSorting": null
            },
            "_filterOptions": {
                "expose": [
                    {
                        "attribute": "QuickFilter_g9wucbw_Items",
                        "converters": [
                            {
                                "converter": "crt.QuickFilterAttributeConverter",
                                "args": [
                                    {
                                        "target": {
                                            "viewAttributeName": "Items",
                                            "filterColumn": "UsrConfigVersionStatus"
                                        },
                                        "quickFilterType": "lookup"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "attribute": "QuickFilter_g9wucbw_IndicatorWidget_2df1nqy_Data",
                        "converters": [
                            {
                                "converter": "crt.QuickFilterAttributeConverter",
                                "args": [
                                    {
                                        "target": {
                                            "viewAttributeName": "IndicatorWidget_2df1nqy_Data",
                                            "filterColumn": "UsrConfigVersionStatus"
                                        },
                                        "quickFilterType": "lookup"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "attribute": "QuickFilter_g9wucbw_IndicatorWidget_hzkxiee_Data",
                        "converters": [
                            {
                                "converter": "crt.QuickFilterAttributeConverter",
                                "args": [
                                    {
                                        "target": {
                                            "viewAttributeName": "IndicatorWidget_hzkxiee_Data",
                                            "filterColumn": "UsrConfigVersionStatus"
                                        },
                                        "quickFilterType": "lookup"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "attribute": "QuickFilter_g9wucbw_IndicatorWidget_so5fw0r_Data",
                        "converters": [
                            {
                                "converter": "crt.QuickFilterAttributeConverter",
                                "args": [
                                    {
                                        "target": {
                                            "viewAttributeName": "IndicatorWidget_so5fw0r_Data",
                                            "filterColumn": "UsrConfigVersionStatus"
                                        },
                                        "quickFilterType": "lookup"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "from": "QuickFilter_g9wucbw_Value"
            },
            "filterType": "lookup"
        },
        "parentName": "LeftFilterContainerInner",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrFinanceRatesTabs",
        "values": {
            "type": "crt.TabPanel",
            "items": [],
            "styleType": "default",
            "mode": "tab",
            "selectedTab": {
                "value": "UsrFinanceVersionsTab"
            },
            "visible": true,
            "stretch": true,
            "bodyBackgroundColor": "primary-contrast-500",
            "underlineSelectedTabColor": "violet",
            "selectedTabTitleColor": "violet"
        },
        "parentName": "MainContainer",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrFinanceVersionsTab",
        "values": {
            "type": "crt.TabContainer",
            "items": [],
            "caption": "Configuration Versions",
            "iconPosition": "only-text",
            "visible": true
        },
        "parentName": "UsrFinanceRatesTabs",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrFinanceResourceRatesTab",
        "values": {
            "type": "crt.TabContainer",
            "items": [],
            "caption": "Resource Rates",
            "iconPosition": "only-text",
            "visible": true
        },
        "parentName": "UsrFinanceRatesTabs",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "move",
        "name": "MainFilterContainer",
        "parentName": "UsrFinanceVersionsTab",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "move",
        "name": "SectionContentWrapper",
        "parentName": "UsrFinanceVersionsTab",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrResourceRatePanel",
        "values": {
            "type": "crt.FlexContainer",
            "items": [],
            "direction": "column",
            "alignItems": "stretch",
            "justifyContent": "start",
            "gap": "medium",
            "padding": {
                "top": "large",
                "right": "large",
                "bottom": "large",
                "left": "large"
            },
            "color": "primary-contrast-500",
            "borderRadius": "medium",
            "visible": true
        },
        "parentName": "UsrFinanceResourceRatesTab",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrResourceRateTitle",
        "values": {
            "type": "crt.Label",
            "caption": "Configuration Resource Rates",
            "labelType": "headline-2",
            "visible": true
        },
        "parentName": "UsrResourceRatePanel",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrResourceRateNote",
        "values": {
            "type": "crt.Label",
            "caption": "Resource rates belong to a specific configuration version. Filter by version, then add or update the contracted unit prices and points.",
            "labelType": "body",
            "visible": true
        },
        "parentName": "UsrResourceRatePanel",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrResourceRatesTools",
        "values": {
            "type": "crt.FlexContainer",
            "items": [],
            "direction": "row",
            "wrap": "wrap",
            "gap": "medium",
            "alignItems": "center",
            "justifyContent": "start",
            "visible": true
        },
        "parentName": "UsrResourceRatePanel",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "UsrResourceVersionQuickFilter",
        "values": {
            "type": "crt.QuickFilter",
            "config": {
                "caption": "Configuration Version",
                "hint": "Filter Resource Rates by configuration version",
                "icon": "filter-column-icon",
                "iconPosition": "left-icon",
                "defaultValue": [],
                "entitySchemaName": "UsrContractConfigVersion",
                "recordsFilter": null,
                "defaultValueListSorting": null
            },
            "_filterOptions": {
                "expose": [
                    {
                        "attribute": "UsrResourceRateVersionFilter",
                        "converters": [
                            {
                                "converter": "crt.QuickFilterAttributeConverter",
                                "args": [
                                    {
                                        "target": {
                                            "viewAttributeName": "UsrResourceRateItems",
                                            "filterColumn": "UsrConfigVersion"
                                        },
                                        "quickFilterType": "lookup"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "from": "UsrResourceRateVersionFilterValue"
            },
            "filterType": "lookup"
        },
        "parentName": "UsrResourceRatesTools",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "UsrNewResourceRateButton",
        "values": {
            "type": "crt.Button",
            "caption": "Add Resource Rate",
            "color": "primary",
            "size": "medium",
            "icon": "add-button-icon",
            "iconPosition": "left-icon",
            "clicked": {
                "request": "usr.MCITOpenRateEditor",
                "params": {}
            }
        },
        "parentName": "UsrResourceRatesTools",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "UsrResourceRateReloadButton",
        "values": {
            "type": "crt.Button",
            "caption": "Refresh",
            "color": "default",
            "size": "medium",
            "clicked": {
                "request": "crt.LoadDataRequest",
                "params": {
                    "dataSourceName": "UsrResourceRateDS",
                    "config": {
                        "loadType": "reload",
                        "useLastLoadParameters": true
                    }
                }
            }
        },
        "parentName": "UsrResourceRatesTools",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "UsrResourceRateGrid",
        "values": {
            "type": "crt.DataGrid",
            "items": "$UsrResourceRateItems",
            "primaryColumnName": "UsrResourceRateDS_Id",
            "columns": [
                {
                    "id": "49694169-e5fb-5cfc-85bc-779bb5fad927",
                    "code": "UsrResourceRateDS_UsrName",
                    "caption": "Rate name",
                    "dataValueType": 1
                },
                {
                    "id": "be51c7db-f797-56f7-b43d-dbee5d69e77b",
                    "code": "UsrResourceRateDS_UsrConfigVersion",
                    "caption": "Configuration version",
                    "dataValueType": 10
                },
                {
                    "id": "348307b8-607f-53e7-8103-e17fae55f3c2",
                    "code": "UsrResourceRateDS_UsrResourceType",
                    "caption": "Resource type",
                    "dataValueType": 10
                },
                {
                    "id": "c755d27b-25af-5f8c-b68f-86c654285f5d",
                    "code": "UsrResourceRateDS_UsrPricingUnitLookup",
                    "caption": "Pricing unit",
                    "dataValueType": 10
                },
                {
                    "id": "720cb379-12ea-58c8-8c00-625daa515077",
                    "code": "UsrResourceRateDS_UsrAmountPerUnit",
                    "caption": "Amount per unit",
                    "dataValueType": 5
                },
                {
                    "id": "d8b252a3-a2a8-564d-9096-81ac90acd982",
                    "code": "UsrResourceRateDS_UsrCurrency",
                    "caption": "Currency",
                    "dataValueType": 10
                },
                {
                    "id": "c8658276-a872-5434-9522-a53ddc9558a7",
                    "code": "UsrResourceRateDS_UsrPointsPerUnit",
                    "caption": "Points per unit",
                    "dataValueType": 5
                }
            ],
            "features": {
                "editable": false,
                "rows": {
                    "toolbar": true
                }
            },
            "placeholder": false,
            "visible": true,
            "fitContent": false
        },
        "parentName": "UsrResourceRatePanel",
        "propertyName": "items",
        "index": 3
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
            "PDS_UsrVersionNumber": {
                "modelConfig": {
                    "path": "PDS.UsrVersionNumber"
                }
            },
            "PDS_UsrConfigVersionStatus": {
                "modelConfig": {
                    "path": "PDS.UsrConfigVersionStatus"
                }
            },
            "PDS_UsrEffectiveFrom": {
                "modelConfig": {
                    "path": "PDS.UsrEffectiveFrom"
                }
            },
            "PDS_UsrEffectiveTo": {
                "modelConfig": {
                    "path": "PDS.UsrEffectiveTo"
                }
            },
            "PDS_CreatedOn": {
                "modelConfig": {
                    "path": "PDS.CreatedOn"
                }
            },
            "PDS_CreatedBy": {
                "modelConfig": {
                    "path": "PDS.CreatedBy"
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
                    "loadOnChange": true,
                    "name": "FolderTree_active_folder_filter"
                },
                {
                    "loadOnChange": true,
                    "name": "Items_PredefinedFilter"
                },
                {
                    "loadOnChange": true,
                    "name": "LookupQuickFilterByTag_Items"
                },
                {
                    "loadOnChange": true,
                    "name": "SearchFilter_Items"
                },
                {
                    "loadOnChange": true,
                    "name": "Filters_Filter"
                },
                {
                    "loadOnChange": true,
                    "name": "QuickFilter_ghstixv_Items"
                },
                {
                    "loadOnChange": true,
                    "name": "QuickFilter_g9wucbw_Items"
                }
            ]
        }
    },
    {
        "operation": "merge",
        "path": [
            "attributes"
        ],
        "values": {
            "UsrResourceRateItems": {
                "isCollection": true,
                "modelConfig": {
                    "path": "UsrResourceRateDS",
                    "filterAttributes": [
                        {
                            "name": "UsrResourceRateVersionFilter",
                            "loadOnChange": true
                        }
                    ],
                    "pagingConfig": {
                        "rowCount": 50
                    },
                    "sortingConfig": {
                        "default": [
                            {
                                "columnName": "UsrName",
                                "direction": "asc"
                            }
                        ]
                    }
                },
                "viewModelConfig": {
                    "attributes": {
                        "UsrResourceRateDS_Id": {
                            "modelConfig": {
                                "path": "UsrResourceRateDS.Id"
                            }
                        },
                        "UsrResourceRateDS_UsrName": {
                            "modelConfig": {
                                "path": "UsrResourceRateDS.UsrName"
                            }
                        },
                        "UsrResourceRateDS_UsrConfigVersion": {
                            "modelConfig": {
                                "path": "UsrResourceRateDS.UsrConfigVersion"
                            }
                        },
                        "UsrResourceRateDS_UsrResourceType": {
                            "modelConfig": {
                                "path": "UsrResourceRateDS.UsrResourceType"
                            }
                        },
                        "UsrResourceRateDS_UsrPricingUnitLookup": {
                            "modelConfig": {
                                "path": "UsrResourceRateDS.UsrPricingUnitLookup"
                            }
                        },
                        "UsrResourceRateDS_UsrAmountPerUnit": {
                            "modelConfig": {
                                "path": "UsrResourceRateDS.UsrAmountPerUnit"
                            }
                        },
                        "UsrResourceRateDS_UsrCurrency": {
                            "modelConfig": {
                                "path": "UsrResourceRateDS.UsrCurrency"
                            }
                        },
                        "UsrResourceRateDS_UsrPointsPerUnit": {
                            "modelConfig": {
                                "path": "UsrResourceRateDS.UsrPointsPerUnit"
                            }
                        }
                    }
                }
            },
            "UsrResourceRateVersionFilter": {},
            "UsrResourceRateVersionFilterValue": {}
        }
    }
]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
        modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
    {
        "operation": "remove",
        "path": [],
        "properties": [
            "dependencies"
        ]
    },
    {
        "operation": "merge",
        "path": [
            "dataSources",
            "PDS",
            "config"
        ],
        "values": {
            "entitySchemaName": "UsrContractConfigVersion",
            "attributes": {
                "UsrName": {
                    "path": "UsrName"
                },
                "UsrContract": {
                    "path": "UsrContract"
                },
                "UsrVersionNumber": {
                    "path": "UsrVersionNumber"
                },
                "UsrConfigVersionStatus": {
                    "path": "UsrConfigVersionStatus"
                },
                "UsrEffectiveFrom": {
                    "path": "UsrEffectiveFrom"
                },
                "UsrEffectiveTo": {
                    "path": "UsrEffectiveTo"
                },
                "CreatedOn": {
                    "path": "CreatedOn"
                },
                "CreatedBy": {
                    "path": "CreatedBy"
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
            "UsrResourceRateDS": {
                "type": "crt.EntityDataSource",
                "scope": "viewElement",
                "config": {
                    "entitySchemaName": "UsrConfigResourceRate",
                    "attributes": {
                        "Id": {
                            "path": "Id"
                        },
                        "UsrName": {
                            "path": "UsrName"
                        },
                        "UsrConfigVersion": {
                            "path": "UsrConfigVersion"
                        },
                        "UsrResourceType": {
                            "path": "UsrResourceType"
                        },
                        "UsrPricingUnitLookup": {
                            "path": "UsrPricingUnitLookup"
                        },
                        "UsrAmountPerUnit": {
                            "path": "UsrAmountPerUnit"
                        },
                        "UsrCurrency": {
                            "path": "UsrCurrency"
                        },
                        "UsrPointsPerUnit": {
                            "path": "UsrPointsPerUnit"
                        }
                    }
                }
            }
        }
    }
]/**SCHEMA_MODEL_CONFIG_DIFF*/,
        handlers: /**SCHEMA_HANDLERS*/[
            {
                request: "usr.MCITOpenRateEditor",
                handler: async (request) => {
                    await usrOpenRateEditor(request.$context);
                }
            }
        ]/**SCHEMA_HANDLERS*/,
        converters: /**SCHEMA_CONVERTERS*/{} /**SCHEMA_CONVERTERS*/,
        validators: /**SCHEMA_VALIDATORS*/{} /**SCHEMA_VALIDATORS*/
    };
});
