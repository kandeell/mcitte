define("UsrMCITNewRequest_WizardPage", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
    "use strict";

    async function readRecord(entityName, recordId, columns) {
        if (!recordId) { return null; }
        const model = await sdk.Model.create(entityName);
        const rows = await model.load({
            attributes: columns,
            parameters: [{ type: sdk.ModelParameterType.PrimaryColumnValue, value: recordId }]
        });
        return rows && rows.length ? rows[0] : null;
    }

    function selectedId(lookup) {
        if (!lookup) { return null; }
        return typeof lookup === "string" ? lookup : (lookup.value || lookup.Id || null);
    }

    function formatDate(value) {
        if (!value) { return "—"; }
        const d = new Date(value);
        return Number.isNaN(d.getTime()) ? String(value) :
            d.toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" });
    }

    async function refreshContract(context) {
        const contract = await context.WZ_Contract;
        const id = selectedId(contract);
        context.WZ_ShowContractSummary = !!id;
        if (!id) {
            context.WZ_ContractName = "—";
            context.WZ_ContractReference = "Reference: —";
            context.WZ_ContractPeriod = "Validity: —";
            context.WZ_InitialPoints = "Initial points: —";
            context.WZ_ContractInitialPointsValue = null;
            context.WZ_ContractLedgerNote = "Point balances are calculated from the ledger (not connected yet).";
            return;
        }
        try {
            // All these column codes are visible in the supplied UsrMCITContract screenshot.
            const row = await readRecord("UsrMCITContract", id,
                ["Id", "UsrName", "UsrNumber", "UsrReference", "UsrStartDate", "UsrEndDate", "UsrInitialPoints"]);
            if (!row) {
                context.WZ_ShowContractSummary = false;
                return;
            }
            // Ignore a stale asynchronous reply if the user selected a different contract.
            if (selectedId(await context.WZ_Contract) !== id) { return; }
            context.WZ_ContractName = row.UsrName || contract.displayValue || "—";
            context.WZ_ContractReference = "Number: " + (row.UsrNumber || "—") +
                " | Reference: " + (row.UsrReference || "—");
            context.WZ_ContractPeriod = "Validity: " + formatDate(row.UsrStartDate) +
                " to " + formatDate(row.UsrEndDate);
            context.WZ_InitialPoints = "Initial points: " +
                (row.UsrInitialPoints == null ? "—" : Number(row.UsrInitialPoints).toLocaleString("en-US"));
            context.WZ_ContractInitialPointsValue = row.UsrInitialPoints == null ? null : Number(row.UsrInitialPoints);
            context.WZ_ContractLedgerNote =
                "Available / Consumed / Restored: pending point-ledger integration";
        } catch (error) {
            console.error("MCIT Wizard: unable to load contract summary", error);
            context.WZ_ContractName = contract.displayValue || "—";
            context.WZ_ContractReference = "Contract summary unavailable — check access rights";
            context.WZ_ContractPeriod = "Validity: —";
            context.WZ_InitialPoints = "Initial points: —";
            context.WZ_ContractInitialPointsValue = null;
        }
    }


    // Project is the existing UsrVMRequest.UsrProject -> UsrProject lookup.
    // Project data uses UsrProject.UsrAuthority (a DIRECT lookup column).
    // The selected Government Authority is an Account (UsrVMRequest.UsrAccount).
    // In different MCIT package versions, Project.Authority may point either to
    // Account or to a legacy UsrAuthority row whose UsrAccount points to Account.
    // Filter by the direct Project column using both IDs instead of generating
    // the fragile nested query path "UsrAuthority.UsrAccount".
    const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";

    async function updateProjectFilter(ctx) {
        const accountId = selectedId(await ctx.WZ_AuthorityAccount);
        const legacyId = selectedId(await ctx.WZ_Authority);
        const filter = new sdk.FilterGroup();
        const candidates = [accountId, legacyId].filter(validGuid);
        const uniqueIds = [...new Set(candidates.map(x => x.toLowerCase()))];

        if (uniqueIds.length > 1) {
            filter.logicalOperation = sdk.LogicalOperatorType.Or;
        }
        if (uniqueIds.length) {
            // One-hop schema path: this is a real column on UsrProject.
            for (const id of uniqueIds) {
                await filter.addSchemaColumnFilterWithParameter(
                    sdk.ComparisonType.Equal, "UsrAuthority", id);
            }
        } else {
            // Until an Account is selected, do not expose all projects.
            await filter.addSchemaColumnFilterWithParameter(
                sdk.ComparisonType.Equal, "Id", EMPTY_GUID);
        }
        ctx.WZ_ProjectFilter = { ...filter, items: filter.items };

        // Separate AND condition, so (Authority = Account OR Authority =
        // legacy Authority) AND Active, without relying on manual LoadDataRequest.
        const activeFilter = new sdk.FilterGroup();
        await activeFilter.addSchemaColumnFilterWithParameter(
            sdk.ComparisonType.Equal, "UsrActive", true);
        ctx.WZ_ProjectActiveFilter = { ...activeFilter, items: activeFilter.items };
        console.info("MCIT Wizard: Project lookup filter refreshed", {
            selectedAccount: accountId || null,
            hasLegacyAuthority: validGuid(legacyId),
            authorityChoices: uniqueIds.length
        });
    }

    // Retain the existing legacy UsrVMRequest.UsrAuthority field for pages that
    // depend on it, but never replace the selected Customer 360 Account with it.
    async function syncLegacyAuthority(ctx) {
        const selected = await ctx.WZ_AuthorityAccount;
        const accountId = selectedId(selected);
        if (!validGuid(accountId)) {
            ctx.WZ_Authority = null;
            return;
        }
        try {
            const model = await sdk.Model.create("UsrAuthority");
            const f = new sdk.FilterGroup();
            await f.addSchemaColumnFilterWithParameter(
                sdk.ComparisonType.Equal, "UsrAccount", accountId);
            const rows = await model.load({
                attributes: ["Id", "UsrName"],
                parameters: [{ type: sdk.ModelParameterType.Filter,
                    value: { ...f, items: f.items } }],
                options: { pagingConfig: { rowsOffset: 0, rowCount: 2 } }
            });
            if (rows?.length) {
                ctx.WZ_Authority = {
                    value: rows[0].Id,
                    displayValue: rows[0].UsrName || selected.displayValue || ""
                };
            } else {
                ctx.WZ_Authority = null;
                console.warn("MCIT Wizard: no legacy UsrAuthority maps to this Account; Project filter will use Account ID.");
            }
        } catch (error) {
            // Account-direct Projects remain usable when the optional legacy
            // mapping is absent. Inspect the browser console to diagnose mapping.
            ctx.WZ_Authority = null;
            console.warn("MCIT Wizard: optional UsrAuthority mapping unavailable", error);
        }
    }

    async function checkProjectBelongsToAccount(ctx) {
        const accountId = selectedId(await ctx.WZ_AuthorityAccount);
        const projectId = selectedId(await ctx.WZ_Project);
        if (!validGuid(accountId) || !validGuid(projectId)) { return false; }
        const row = await readRecord("UsrProject", projectId,
            ["Id", "UsrActive", "UsrAuthority"]);
        if (!row || row.UsrActive === false) { return false; }
        const projectAuthorityId = selectedId(row.UsrAuthority);
        if (!validGuid(projectAuthorityId)) { return false; }
        // New data model: Project.Authority directly references Account.
        if (projectAuthorityId.toLowerCase() === accountId.toLowerCase()) {
            return true;
        }
        // Legacy data model: Project.Authority references UsrAuthority.
        const bridge = await readRecord("UsrAuthority", projectAuthorityId,
            ["Id", "UsrAccount"]);
        return String(selectedId(bridge?.UsrAccount) || "").toLowerCase() ===
            accountId.toLowerCase();
    }

    // Use the same contract's original point amount; don't fabricate Available/Consumed
    // figures without a working ledger transaction query.
    async function findDraftStatus() {
        const model = await sdk.Model.create("UsrMCITRequestStatus");
        const filter = new sdk.FilterGroup();
        await filter.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal, "Name", "Draft");
        const rows = await model.load({
            attributes: ["Id", "Name"],
            parameters: [{ type: sdk.ModelParameterType.Filter, value: filter }]
        });
        if (!rows || !rows.length) {
            throw new Error("Draft status not found in UsrMCITRequestStatus lookup");
        }
        return { value: rows[0].Id, displayValue: rows[0].Name };
    }

    async function ensureDraftFields(context, automaticTitle) {
        context.WZ_Status = await findDraftStatus();
        const currentName = (await context.WZ_Title || "").trim();
        if (!currentName && automaticTitle) {
            // UsrName is REQUIRED at object level. The placeholder is saved only for drafts.
            context.WZ_Title = "Draft VM Request - " + new Date().toISOString().slice(0, 19).replace("T", " ");
        }
    }


    // Step 1 required fields: mandatory to CONTINUE, not mandatory for Save as Draft.
    // Keep DB lookup columns optional so partially completed drafts can be saved.
    const WZ_REQUIRED_FIELDS = [
        {code: "type", field: "WZ_RequestType", error: "WZ_ErrRequestType", lookup: true},
        {code: "contract", field: "WZ_Contract", error: "WZ_ErrContract", lookup: true},
        {code: "authority", field: "WZ_AuthorityAccount", error: "WZ_ErrAuthority", lookup: true},
        {code: "project", field: "WZ_Project", error: "WZ_ErrProject", lookup: true},
        {code: "title", field: "WZ_Title", error: "WZ_ErrTitle", lookup: false},
        {code: "justification", field: "WZ_Justification", error: "WZ_ErrJustification", lookup: false}
    ];

    function syncWizardValidationBorders(ctx) {
        if (typeof document === "undefined") { return; }
        Promise.resolve().then(async () => {
            if (document.__usrMCITWizardActiveContext !== ctx) { return; }
            for (const def of WZ_REQUIRED_FIELDS) {
                const invalid = !!(await ctx[def.error]);
                document.querySelectorAll(".usr-wz-root .usr-wz-field-" + def.code).forEach(host => {
                    // Avoid a MutationObserver update loop: mutate only on real changes.
                    if (host.classList.contains("usr-wz-invalid") !== invalid) {
                        host.classList.toggle("usr-wz-invalid", invalid);
                    }
                });
            }
        }).catch(error => console.warn("MCIT Wizard validation border update", error));
    }

    async function isRequiredFieldEmpty(ctx, def) {
        const value = await ctx[def.field];
        return def.lookup ? !hasLookup(value) : !String(value == null ? "" : value).trim();
    }

    async function updateRequiredField(ctx, def) {
        if (!def) { return; }
        ctx[def.error] = await isRequiredFieldEmpty(ctx, def);
        syncWizardValidationBorders(ctx);
    }

    async function validateRequiredStepOne(ctx) {
        // Validation is activated only for Step 1 Continue, not for Save as Draft.
        ctx.WZ_ValidationAttempted = true;
        let valid = true;
        for (const def of WZ_REQUIRED_FIELDS) {
            const empty = await isRequiredFieldEmpty(ctx, def);
            ctx[def.error] = empty;
            if (empty) { valid = false; }
        }
        syncWizardValidationBorders(ctx);
        if (!valid && typeof document !== "undefined") {
            Promise.resolve().then(() => {
                const target = document.querySelector(
                    ".usr-wz-root .usr-wz-validation-wrap.usr-wz-invalid");
                target?.scrollIntoView?.({behavior: "smooth", block: "center"});
            });
        }
        return valid;
    }

    function hasLookup(value) { return !!selectedId(value); }

    function validGuid(value) {
        return /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(String(value || ""));
    }

    // UsrVMRequest.UsrAccount is the SELECTED GOVERNMENT AUTHORITY, not the
    // logged-in user's Contact.Account. Owner identity is Creatio CreatedBy.
    // My Requests scopes by CreatedBy plus the original Contact.Account for legacy rows.
    async function resolveRequester(context) {
        const sv = await new sdk.SysValuesService().loadSysValues();
        const contact = sv?.userContact;
        const contactId = selectedId(contact);
        if (!validGuid(contactId)) { throw new Error("Current user has no linked Contact."); }
        context.WZ_ContactId = contactId;
        context.WZ_CurrentContactName = contact.displayValue || "—";
        const info = await readRecord("Contact", contactId, ["Id", "Email", "Account"]);
        if (!info) { throw new Error("Current user Contact is not readable."); }
        context.WZ_CurrentEmail = info.Email || "—";
        const account = info.Account;
        const accountId = selectedId(account);
        context.WZ_CurrentAuthorityName = account?.displayValue || "—";
        // Keep requester profile Account separate; never set the form's
        // UsrAccount from Contact.Account (would overwrite the selected Authority).
        context.WZ_RequesterAccount = validGuid(accountId) ?
            {value: accountId, displayValue: account?.displayValue || ""} : null;
        context.WZ_RequesterError = "";
        // Do not set UsrRequester automatically until its lookup target is confirmed
        // in the object's Designer; the visible requester details come from Contact.
        // Functional roles are SysAdminUnit type 6, as used by the MCIT User Profile.
        // Never display fabricated roles, and never use the selected request type as a role.
        try {
            const users = await sdk.Model.create("SysAdminUnit");
            const f = new sdk.FilterGroup();
            await f.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal, "Contact", contactId);
            await f.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal, "SysAdminUnitTypeValue", 4);
            const userRows = await users.load({attributes:["Id"],
                parameters:[{type:sdk.ModelParameterType.Filter,value:{...f,items:f.items}}],
                options:{pagingConfig:{rowsOffset:0,rowCount:2}}});
            const userId = userRows?.[0]?.Id;
            if (validGuid(userId)) {
                const roleModel = await sdk.Model.create("SysUserInRole");
                const rf = new sdk.FilterGroup();
                await rf.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal,"SysUser",userId);
                const assigned = await roleModel.load({attributes:["Id","SysRole"],
                    parameters:[{type:sdk.ModelParameterType.Filter,value:{...rf,items:rf.items}}],
                    options:{pagingConfig:{rowsOffset:0,rowCount:200}}});
                const seen = new Set(); const found = [];
                for (const assignment of (assigned || [])) {
                    const roleId = selectedId(assignment.SysRole);
                    if (!validGuid(roleId) || seen.has(roleId)) { continue; }
                    seen.add(roleId);
                    const role = await readRecord("SysAdminUnit",roleId,
                        ["Id","Name","SysAdminUnitTypeValue"]);
                    if (role && Number(role.SysAdminUnitTypeValue) === 6 && role.Name) {
                        found.push(String(role.Name));
                    }
                }
                context.WZ_CurrentRoleName = found.length ? found.join(", ") : "—";
            }
        } catch (error) {
            console.warn("MCIT Wizard: assigned functional role unavailable",error);
            context.WZ_CurrentRoleName = "—";
        }
    }

    async function verifySavedRequest(context, title, savedSince) {
        // Read back from the server, rather than treating a temporary UI row as proof.
        const model = await sdk.Model.create("UsrVMRequest");
        const recordId = selectedId(await context.WZ_RecordId);
        let records = [];
        const cols = ["Id", "UsrName", "UsrStatus", "UsrAccount", "CreatedBy", "CreatedOn"];
        if (validGuid(recordId)) {
            const row = await readRecord("UsrVMRequest",recordId,cols);
            if (row) { records = [row]; }
        }
        if (!records.length) {
            const filter = new sdk.FilterGroup();
            await filter.addSchemaColumnFilterWithParameter(
                sdk.ComparisonType.Equal,"UsrName",title);
            await filter.addSchemaColumnFilterWithParameter(
                sdk.ComparisonType.Equal,"CreatedBy",selectedId(await context.WZ_ContactId));
            records = await model.load({attributes:cols,
                parameters:[{type:sdk.ModelParameterType.Filter,value:{...filter,items:filter.items}}],
                options:{pagingConfig:{rowsOffset:0,rowCount:30}}}) || [];
            // With matching titles, verify only a newly-created row (not an older duplicate).
            records = records.filter(row=>{
                if (validGuid(recordId)) { return selectedId(row.Id)===recordId; }
                const timestamp = new Date(row.CreatedOn).getTime();
                return Number.isFinite(timestamp) && timestamp>=savedSince-60000;
            });
        }
        const row = records[0];
        if (!row) {throw new Error("Save could not be verified in UsrVMRequest. The page remains open.");}
        const govAccount = selectedId(await context.WZ_AuthorityAccount);
        // Selected government authority MUST be persisted in existing UsrAccount.
        if (govAccount && selectedId(row.UsrAccount)?.toLowerCase() !== govAccount.toLowerCase()) {
            throw new Error("Selected government Authority was not saved in UsrVMRequest.UsrAccount. Verify the existing lookup binding.");
        }
        const statusId = selectedId(await context.WZ_Status);
        if (selectedId(row.UsrStatus)!==statusId) {
            // Correct Status only; never overwrite the government Authority with Contact.Account.
            await model.update({UsrStatus:await context.WZ_Status},
                [{type:sdk.ModelParameterType.PrimaryColumnValue,value:selectedId(row.Id)}]);
            const checked = await readRecord("UsrVMRequest",selectedId(row.Id),cols);
            if (selectedId(checked?.UsrStatus)!==statusId) {
                throw new Error("Draft status could not be verified. Check object rights and lookup mapping.");
            }
        }
        context.WZ_RecordId = selectedId(row.Id);
        return row;
    }

    async function persistDraft(context, automaticTitle) {
        // A submitted/under-review request must never be silently reset to Draft.
        const currentId=vmRequestKey(context);
        if(validGuid(currentId)){
            const persisted=await readRecord("UsrVMRequest",currentId,["Id","UsrStatus"]);
            if(persisted){
                const storedStatus=wzPretty(persisted.UsrStatus,"").toLowerCase();
                if(storedStatus && storedStatus!=="draft"){
                    throw new Error("Cannot Save as Draft: request is already "+wzPretty(persisted.UsrStatus)+". Open My Requests to view it.");
                }
            }
        }
        // CreatedBy / Contact identify the requester even when Contact.Account is empty.
        // New drafts are shown in My Requests by their creator; Contact.Account is only
        // retained as a compatibility scope for older requests.
        if (!validGuid(selectedId(await context.WZ_ContactId))) {
            await resolveRequester(context);
        }
        if (!validGuid(selectedId(await context.WZ_ContactId))) {
            throw new Error("Cannot resolve the current Contact; request ownership cannot be verified.");
        }
        // Validate that the chosen Authority is a valid Account lookup.
        const accountChoice = await context.WZ_AuthorityAccount;
        if (accountChoice && !validGuid(selectedId(accountChoice))) {
            throw new Error("Selected government authority is not a valid Account lookup.");
        }
        await ensureDraftFields(context, automaticTitle);
        // Ensure field bindings have propagated to the primary page data source.
        const title = String(await context.WZ_Title || "").trim();
        const started = Date.now();
        const saved = await context.executeRequest({type:"crt.SaveRecordRequest",
            preventCardClose:true,$context:context});
        if (saved === false) { throw new Error("Creatio rejected the SaveRecordRequest."); }
        return await verifySavedRequest(context,title,started);
    }


    // ---- STEP 2: verified database-backed VM Items (Draft-safe) ----------------
    // Core UsrVMRequestItem exists. See README for required extension columns.
    // Important: creating an item does NOT consume points or post ledger transactions.
    const EMPTY_VM_ITEMS = [];
    const vmItemsInMemory = new Map();
    const vmLoadedKeys = new Set();
    const vmContextRequestIds = new WeakMap();
    const vmLookupCache = {environments: [], zones: [], operatingSystems: []};
    const vmConfigCache = new Map();
    let vmModalCounter = 0;
    const VM_EXTRA_COLUMNS = [
        "UsrEnvironment", "UsrNetworkZone", "UsrAdditionalRAMGB",
        "UsrAdditionalStorageGB", "UsrVPNMbps", "UsrInternetMbps",
        "UsrConfigVersion"
    ];
    const VM_ITEM_COLUMNS = [
        "Id", "UsrRequest", "UsrName", "UsrPurpose", "UsrOperatingSystem",
        "UsrCPU", "UsrRAMGB", "UsrStorageGB", "UsrEstimatedPoints",
        "UsrTotalPointsSnapshot", "UsrTotalAmountSnapshot", "UsrDisplayOrder",
        "UsrCurrency", ...VM_EXTRA_COLUMNS
    ];
    const VM_TYPES = ["ADD_RAM", "ADD_STORAGE", "VPN", "INTERNET"];

    function vmNumber(value, fallback = 0) {
        const n = Number(value);
        return Number.isFinite(n) && n >= 0 ? n : fallback;
    }
    function vmFormat(value) {
        return Number.isFinite(Number(value)) ?
            Number(value).toLocaleString("en-US", {maximumFractionDigits: 2}) : "—";
    }
    function vmRequestKey(ctx) {
        const id = vmContextRequestIds.get(ctx);
        if (validGuid(id)) { return String(id).toLowerCase(); }
        if (typeof location !== "undefined") {
            const match = location.hash.match(/\/edit\/([0-9a-f-]{36})/i);
            if (match && validGuid(match[1])) { return match[1].toLowerCase(); }
        }
        return null;
    }
    function vmState(ctx) {
        const key = vmRequestKey(ctx);
        return key ? (vmItemsInMemory.get(key) || EMPTY_VM_ITEMS) : EMPTY_VM_ITEMS;
    }
    function vmPageNotice(ctx, message) {
        console.warn("MCIT Wizard Step 2:", message);
        try { ctx._notifyService?.show({message}); } catch(e) { console.warn(e); }
    }
    function vmExtractName(value) {
        return String(value?.displayValue || value?.Name || value?.UsrName ||
            value?.UsrEnglishName || value || "").trim();
    }
    function vmFilterParams(filters) {
        if (!filters?.length) { return []; }
        return [{type: sdk.ModelParameterType.Filter, value: filters[0]}];
    }
    async function vmLoadRows(schemaName, attributes, conditions = [], limit = 200, offset = 0) {
        const model = await sdk.Model.create(schemaName);
        const filter = new sdk.FilterGroup();
        for (const [column, value] of conditions) {
            await filter.addSchemaColumnFilterWithParameter(
                sdk.ComparisonType.Equal, column, value);
        }
        return await model.load({
            attributes,
            parameters: conditions.length ? [
                {type: sdk.ModelParameterType.Filter, value: {...filter, items:filter.items}}
            ] : [],
            options: {pagingConfig: {rowsOffset:offset, rowCount:limit}}
        }) || [];
    }
    async function vmLoadLookupOptions() {
        // Read actual database lookup rows. Schema names can differ among package revisions.
        // Never fabricate options: only display rows actually returned by Creatio.
        const sources = {
            environments: ["UsrVMEnvironment", "UsrMCITVMEnvironment", "UsrMCITEnvironment"],
            zones: ["UsrVMNetworkZone", "UsrMCITVMNetworkZone", "UsrMCITNetworkZone"],
            operatingSystems: ["UsrMCITOperatingSystem"]
        };
        const failures = [];
        for (const [key, candidates] of Object.entries(sources)) {
            vmLookupCache[key] = [];
            for (const schemaName of candidates) {
                let rows;
                try {
                    rows = await vmLoadRows(schemaName, ["Id", "Name"], [], 300);
                } catch (error) {
                    // Some custom objects use UsrName rather than inherited Name.
                    try { rows = await vmLoadRows(schemaName, ["Id", "UsrName"], [], 300); }
                    catch (secondary) {
                        failures.push(schemaName + ": " + (secondary.message || secondary));
                        continue;
                    }
                }
                const options = rows.map(row => ({
                    id: selectedId(row.Id),
                    label: String(row.Name || row.UsrName || "").trim()
                })).filter(row => validGuid(row.id) && row.label);
                if (options.length) {
                    vmLookupCache[key] = options;
                    console.info("MCIT Wizard lookup loaded", {type:key, schema:schemaName, count:options.length});
                    break;
                }
            }
            if (!vmLookupCache[key].length) {
                console.warn("MCIT Wizard lookup returned no options", key, candidates, failures);
            }
        }
        return {
            counts: Object.fromEntries(Object.entries(vmLookupCache).map(([key, rows])=>[key,rows.length])),
            failures
        };
    }

    function vmGetOptionName(key, id) {
        return vmLookupCache[key].find(row=>row.id?.toLowerCase()===String(id||"").toLowerCase())?.label || "";
    }
    function vmBuildSelect(label, name) {
        return `<label class="usr-wz-vm-field"><span>${label}<b aria-hidden="true"> *</b></span>`+
            `<select name="${name}" required><option value="">Select ${label}</option></select></label>`;
    }
    function vmMakeOptions(select, options, selected) {
        if (!select) { throw new Error("VM lookup select was not rendered."); }
        if (!options.length) {
            const opt = document.createElement("option");
            opt.value = "";
            opt.textContent = "No lookup records available — check Object schema and Read rights";
            opt.disabled = true;
            select.appendChild(opt);
            console.warn("MCIT Wizard: no lookup records for", select.name);
        }
        for (const item of options) {
            const opt = document.createElement("option");
            opt.value = item.id;
            opt.textContent = item.label;
            select.appendChild(opt);
        }
        if (selected) { select.value = selected; }
    }
    function vmDateIsActive(row) {
        const now = Date.now();
        const start = row.UsrEffectiveFrom ? new Date(row.UsrEffectiveFrom).getTime() : -Infinity;
        const end = row.UsrEffectiveTo ? new Date(row.UsrEffectiveTo).getTime() : Infinity;
        return (!Number.isFinite(start) || start <= now) &&
            (!Number.isFinite(end) || end >= now);
    }
    // Treat lookup IDs as the source of truth, regardless of the display name.
    // Creatio can return a lookup as {value}, {Id}, or a nested value object
    // depending on its data source. Do not compare UI display text to link rates.
    function vmLookupId(value, depth=0) {
        if (depth>3 || !value) { return null; }
        if (typeof value==="string") {
            const id=value.trim();
            return validGuid(id) ? id.toLowerCase() : null;
        }
        if (typeof value!=="object") { return null; }
        for (const key of ["value", "Id", "id", "Value", "UsrConfigVersionId"]) {
            const id=vmLookupId(value[key],depth+1);
            if(id){return id;}
        }
        return null;
    }

    // Read only Resource Rates proven to be related to the EXACT chosen version.
    // Some Creatio installations return 0 rows for the direct lookup filter even
    // when the native detail (which uses a relation dependency) shows records.
    // Try the lookup and relation filters first, then a bounded scan with strict
    // client-side UUID verification. Never fall back to rates from another version.
    async function vmLoadVerifiedRates(versionId) {
        const versionKey=vmLookupId(versionId);
        if (!versionKey) { throw new Error("Selected Configuration Version has no valid ID."); }
        const fields=["Id","UsrName","UsrConfigVersion","UsrResourceType",
            "UsrPricingUnitLookup","UsrAmountPerUnit","UsrPointsPerUnit","UsrCurrency"];
        const attempts=[];
        const pageSize=200;
        const maxPages=15;
        for (const filterColumn of ["UsrConfigVersion", "UsrConfigVersion.Id", null]) {
            const collected=[];
            let totalRows=0;
            let failed=false;
            for (let page=0;page<maxPages;page++) {
                let batch;
                try {
                    batch=await vmLoadRows("UsrConfigResourceRate",fields,
                        filterColumn ? [[filterColumn,versionKey]] : [],pageSize,page*pageSize);
                } catch(error) {
                    attempts.push({filter:filterColumn||"unfiltered ID check", error:String(error.message||error)});
                    failed=true;
                    break;
                }
                totalRows+=batch.length;
                for (const row of batch) {
                    if (vmLookupId(row.UsrConfigVersion)===versionKey) {collected.push(row);}
                }
                if (batch.length<pageSize) {break;}
            }
            if (failed) {continue;}
            attempts.push({filter:filterColumn||"unfiltered ID check",returned:totalRows,
                idVerified:collected.length});
            if (collected.length) {
                if (!filterColumn) {
                    console.warn("MCIT Wizard: SDK version filter returned no matching rates; " +
                        "used explicit UUID verification on visible Resource Rate records.",attempts);
                }
                return {rows:collected,diagnostic:{method:filterColumn||"UUID-verified fallback",attempts}};
            }
            // A bounded unfiltered scan is a diagnostic fallback ONLY. If the
            // record count exceeds our limit, fail safely rather than guessing.
            if (!filterColumn && totalRows>=pageSize*maxPages) {
                throw new Error("Could not verify Resource Rates: more than " +
                    (pageSize*maxPages)+" records require a server-side filter. " +
                    "Check UsrConfigVersion lookup permissions / configuration.");
            }
        }
        console.warn("MCIT Wizard: no Resource Rate was verified for version",versionKey,attempts);
        return {rows:[],diagnostic:{method:"none",attempts}};
    }

    async function vmResolveResourceTypes() {
        const rows = await vmLoadRows("UsrMCITResourceType",
            ["Id","UsrResourceCode","UsrEnglishName"],[],300);
        const byId = new Map();
        for (const row of rows) {
            if (vmLookupId(row.Id)) {
                byId.set(vmLookupId(row.Id),
                    String(row.UsrResourceCode || "").toUpperCase());
            }
        }
        return byId;
    }
    async function vmLoadContractConfig(ctx, force=false) {
        const contractId=selectedId(await ctx.WZ_Contract);
        if (!validGuid(contractId)) { throw new Error("Choose a Contract in Step 1."); }
        if (!force && vmConfigCache.has(contractId)) { return vmConfigCache.get(contractId); }
        const versions=await vmLoadRows("UsrContractConfigVersion",[
            "Id","UsrName","UsrContract","UsrVersionNumber","UsrConfigVersionStatus",
            "UsrEffectiveFrom","UsrEffectiveTo","UsrCPUPerPoint","UsrRAMGBPerPoint",
            "UsrStorageGBPerPoint","UsrMinPointsPerVM","UsrMaxPointsPerVM",
            "UsrPointIncrement"
        ],[["UsrContract",contractId]],250);
        const candidates=versions.filter(row=>validGuid(selectedId(row.Id)) && vmDateIsActive(row));
        candidates.sort((a,b)=>
            new Date(b.UsrEffectiveFrom||0).getTime()-new Date(a.UsrEffectiveFrom||0).getTime());
        const statusOf=row=>vmExtractName(row.UsrConfigVersionStatus).toLowerCase();
        const active=candidates.filter(row=>statusOf(row)==="active");
        if (active.length>1) {
            throw new Error("More than one active configuration is valid for the same contract. Resolve overlap first.");
        }
        // Draft v1 is usable ONLY for preparing a draft, not for posting or submission.
        const version=active[0] || candidates.find(row=>statusOf(row)==="draft");
        if (!version) { throw new Error("No effective Active or Draft Configuration Version for this Contract."); }
        for (const f of ["UsrCPUPerPoint","UsrRAMGBPerPoint","UsrStorageGBPerPoint"]) {
            if (!(Number(version[f])>0)) {
                throw new Error("Contract Configuration "+f+" must be greater than zero.");
            }
        }
        const verifiedRates=await vmLoadVerifiedRates(selectedId(version.Id));
        const rateRows=verifiedRates.rows;
        const typeIds=await vmResolveResourceTypes();
        const rates={};
        const unmatchedTypes = [];
        const resourceNameToCode = {
            "additional ram":"ADD_RAM",
            "additional storage":"ADD_STORAGE",
            "vpn bandwidth":"VPN",
            "dedicated internet":"INTERNET"
        };
        for (const r of rateRows) {
            const id=vmLookupId(r.UsrResourceType)||"";
            // The resource type's unique ID is authoritative. The label fallback only
            // accepts exact existing MCIT Resource Type names, never fuzzy matching.
            const label=vmExtractName(r.UsrResourceType).toLowerCase();
            const code=typeIds.get(id) || resourceNameToCode[label];
            if (!VM_TYPES.includes(code)) {
                unmatchedTypes.push({rate: r.UsrName || selectedId(r.Id), resourceTypeId: id, label});
                continue;
            }
            if (rates[code]) { throw new Error("Duplicate Resource Rate for "+code+" in this configuration."); }
            rates[code]={
                id:selectedId(r.Id), code,
                price:vmNumber(r.UsrAmountPerUnit),
                pointsPerUnit:vmNumber(r.UsrPointsPerUnit),
                unit:vmExtractName(r.UsrPricingUnitLookup),
                currencyId:selectedId(r.UsrCurrency),
                currency:vmExtractName(r.UsrCurrency)
            };
        }
        const config = {
            id:selectedId(version.Id), name:version.UsrName,
            version:version.UsrVersionNumber || "",
            status:statusOf(version),
            draft:statusOf(version)!=="active",
            cpuPerPoint:Number(version.UsrCPUPerPoint),
            ramPerPoint:Number(version.UsrRAMGBPerPoint),
            storagePerPoint:Number(version.UsrStorageGBPerPoint),
            minPoints:Math.max(1,vmNumber(version.UsrMinPointsPerVM,1)),
            maxPoints:Math.max(1,vmNumber(version.UsrMaxPointsPerVM,20)),
            increment:Math.max(1,vmNumber(version.UsrPointIncrement,1)),
            rates,
            rateDiagnostics: {
                linkedRateRows: rateRows.length,
                recognizedCodes: Object.keys(rates),
                unmatchedTypes,
                lookupMethod:verifiedRates.diagnostic.method,
                attempts:verifiedRates.diagnostic.attempts
            }
        };
        console.info("MCIT Wizard Step 2: rates for the selected Configuration Version", {
            configurationName: config.name,
            version: config.version,
            versionId: config.id,
            linkedRows: rateRows.length,
            recognized: Object.keys(rates),
            unmatchedTypes,
            queryAttempts:verifiedRates.diagnostic.attempts
        });
        if (config.maxPoints < config.minPoints) {
            throw new Error("Configuration Max Points must be >= Min Points.");
        }
        vmConfigCache.set(contractId,config);
        return config;
    }
    function vmCostAndResources(points,extras,cfg) {
        const p=Number(points);
        const amounts={
            ADD_RAM:vmNumber(extras.extraRAM),
            ADD_STORAGE:vmNumber(extras.extraStorage),
            VPN:vmNumber(extras.vpnMbps),
            INTERNET:vmNumber(extras.internetMbps)
        };
        let price=0, additionalPoints=0, currencyId=null;
        for (const [code,qty] of Object.entries(amounts)) {
            if (qty<=0) {continue;}
            const rate=cfg.rates[code];
            if (!rate) {
                throw new Error("Missing " + code + " Rate for " + (cfg.name || "selected Configuration") +
                    " " + (cfg.version || "") + ". Set its quantity to 0 to save a VM without this add-on, " +
                    "or link a Resource Rate to this exact Configuration Version in Finance Configuration.");
            }
            const u=rate.unit.toLowerCase();
            const isGb=code==="ADD_RAM"||code==="ADD_STORAGE";
            if (isGb ? !u.includes("gb") : !u.includes("mbps")) {
                throw new Error(code+" must use "+(isGb?"GB":"Mbps")+" pricing units (currently "+rate.unit+").");
            }
            if (!validGuid(rate.currencyId)) { throw new Error(code+" has no Currency."); }
            if (currencyId && currencyId!==rate.currencyId) {
                throw new Error("All selected add-ons must use the same currency.");
            }
            currencyId=rate.currencyId;
            price+=qty*rate.price;
            additionalPoints+=qty*rate.pointsPerUnit;
        }
        return {
            cpu:p*cfg.cpuPerPoint,
            ram:p*cfg.ramPerPoint+amounts.ADD_RAM,
            storage:p*cfg.storagePerPoint+amounts.ADD_STORAGE,
            points:p+additionalPoints,
            extraPoints:additionalPoints,
            amount:price,
            currencyId
        };
    }
    function vmSnapshotToItem(row) {
        return {
            id:selectedId(row.Id),
            name:String(row.UsrName||""),
            purpose:String(row.UsrPurpose||row.UsrName||""),
            operatingSystem:selectedId(row.UsrOperatingSystem),
            environment:selectedId(row.UsrEnvironment),
            zone:selectedId(row.UsrNetworkZone),
            points:vmNumber(row.UsrEstimatedPoints),
            configId:selectedId(row.UsrConfigVersion),
            cpu:vmNumber(row.UsrCPU),
            ram:vmNumber(row.UsrRAMGB),
            storage:vmNumber(row.UsrStorageGB),
            extraRAM:vmNumber(row.UsrAdditionalRAMGB),
            extraStorage:vmNumber(row.UsrAdditionalStorageGB),
            vpnMbps:vmNumber(row.UsrVPNMbps),
            internetMbps:vmNumber(row.UsrInternetMbps),
            totalAmount:vmNumber(row.UsrTotalAmountSnapshot),
            totalPoints:vmNumber(row.UsrTotalPointsSnapshot),
            currencyId:selectedId(row.UsrCurrency),
            currencyName:(row.UsrCurrency && typeof row.UsrCurrency==="object") ?
                String(row.UsrCurrency.displayValue||row.UsrCurrency.Name||"") : ""
        };
    }
    async function vmLoadSavedItems(ctx, force=false) {
        const key=vmRequestKey(ctx);
        if (!key) { throw new Error("Save the request header before reading VM items."); }
        if (vmLoadedKeys.has(key) && !force) { return vmState(ctx); }
        let rows;
        try {
            rows=await vmLoadRows("UsrVMRequestItem",VM_ITEM_COLUMNS,
                [["UsrRequest",key]],300);
        } catch(error) {
            console.error("UsrVMRequestItem schema mapping or read failed",error);
            throw new Error("VM Item persistence requires columns: "+VM_EXTRA_COLUMNS.join(", ")+
                ". Add them in Object Designer, compile, then reload the Wizard.");
        }
        rows.sort((a,b)=>vmNumber(a.UsrDisplayOrder)-vmNumber(b.UsrDisplayOrder));
        vmItemsInMemory.set(key,rows.map(vmSnapshotToItem));
        vmLoadedKeys.add(key);
        vmSyncVisibility(ctx);
        vmRenderItems(ctx);
        return vmState(ctx);
    }
    async function vmSaveItem(ctx,item,editIndex,cfg) {
        const key=vmRequestKey(ctx);
        if (!key) { throw new Error("Save the request before adding a VM Item."); }
        const calculated=vmCostAndResources(item.points,item,cfg);
        const dto={
            UsrRequest:key,
            UsrName:item.name,
            UsrPurpose:item.name,
            UsrOperatingSystem:item.operatingSystem,
            UsrEnvironment:item.environment,
            UsrNetworkZone:item.zone,
            UsrConfigVersion:cfg.id,
            UsrCPU:calculated.cpu,
            UsrRAMGB:calculated.ram,
            UsrStorageGB:calculated.storage,
            UsrEstimatedPoints:item.points,
            UsrTotalPointsSnapshot:calculated.points,
            UsrTotalAmountSnapshot:calculated.amount,
            UsrAdditionalRAMGB:item.extraRAM,
            UsrAdditionalStorageGB:item.extraStorage,
            UsrVPNMbps:item.vpnMbps,
            UsrInternetMbps:item.internetMbps,
            UsrDisplayOrder:editIndex>=0?editIndex+1:vmState(ctx).length+1
        };
        if (calculated.currencyId) {dto.UsrCurrency=calculated.currencyId;}
        const model=await sdk.Model.create("UsrVMRequestItem");
        const beforeIds=new Set(vmState(ctx).map(row=>String(row.id).toLowerCase()));
        const existing=editIndex>=0?vmState(ctx)[editIndex]:null;
        let result;
        if (existing) {
            const owner=await readRecord("UsrVMRequestItem",existing.id,["Id","UsrRequest"]);
            if (String(selectedId(owner?.UsrRequest)||"").toLowerCase()!==key.toLowerCase()) {throw new Error("VM Item does not belong to this request.");}
            result=await model.update(dto,[
                {type:sdk.ModelParameterType.PrimaryColumnValue,value:existing.id}]);
        } else {result=await model.insert(dto);}
        if (result?.success===false || result?.rowsAffected===0) {
            throw new Error("Creatio did not confirm saving the VM Item.");
        }
        await vmLoadSavedItems(ctx,true);
        // Verify via reload, not the old session cache.
        const check=vmState(ctx);
        if (existing) {
            if (!check.find(row=>row.id===existing.id && row.name===item.name)) {
                throw new Error("VM Item update not found after database reload.");
            }
        } else if (!check.some(row=>row.name===item.name &&
                !beforeIds.has(String(row.id).toLowerCase()))) {
            throw new Error("New VM Item insert could not be verified after database reload. Refresh before retrying.");
        }
        return true;
    }
    async function vmDeleteItem(ctx,index) {
        const item=vmState(ctx)[index];
        if (!validGuid(item?.id)) {throw new Error("Item is not a saved record.");}
        const key=vmRequestKey(ctx);
        const owner=await readRecord("UsrVMRequestItem",item.id,["Id","UsrRequest"]);
        if (String(selectedId(owner?.UsrRequest)||"").toLowerCase()!==key.toLowerCase()) {throw new Error("VM Item ownership mismatch.");}
        const model=await sdk.Model.create("UsrVMRequestItem");
        const result=await model.delete([
            {type:sdk.ModelParameterType.PrimaryColumnValue,value:item.id}]);
        if (result?.success===false || result?.rowsAffected===0) {
            throw new Error("Could not delete saved VM Item.");
        }
        await vmLoadSavedItems(ctx,true);
        if (vmState(ctx).some(x=>x.id===item.id)) {
            throw new Error("Delete was not confirmed by database reload.");
        }
        return true;
    }
    // Step 2 presentation: Figma-aligned VM table and summaries.
    // All values below are verified, persisted UsrVMRequestItem snapshots; no
    // new prices, balances or ledger transactions are calculated or posted here.
    function vmCurrencyText(item) {
        let display=String(item.currencyName||"").trim();
        if (!display && item.currencyId) {
            for (const cfg of vmConfigCache.values()) {
                if (item.configId && String(cfg.id).toLowerCase()!==String(item.configId).toLowerCase()) {continue;}
                const matching=Object.values(cfg.rates||{}).find(rate=>
                    rate.currencyId && String(rate.currencyId).toLowerCase()===String(item.currencyId).toLowerCase());
                if (matching?.currency) {display=matching.currency;break;}
            }
        }
        if (/^(egyptian pound|egp|جنيه مصري)$/i.test(display)) {return "EGP";}
        if (/^(us dollar|united states dollar|usd)$/i.test(display)) {return "USD";}
        if (/^(euro|eur)$/i.test(display)) {return "EUR";}
        return display||"Currency unavailable";
    }
    function vmElement(tag,cssClass,text) {
        const el=document.createElement(tag);
        if(cssClass) {el.className=cssClass;}
        if(text!==undefined && text!==null) {el.textContent=String(text);}
        return el;
    }
    function vmAddonDetails(item) {
        return [
            ["Additional RAM",item.extraRAM,"GB"],
            ["Additional Storage",item.extraStorage,"GB"],
            ["VPN",item.vpnMbps,"Mbps"],
            ["Dedicated Internet",item.internetMbps,"Mbps"]
        ].filter(([,value])=>vmNumber(value)>0);
    }
    function vmRenderItems(ctx) {
        if (typeof document === "undefined") {return;}
        const items=vmState(ctx);
        const host=document.querySelector(".usr-wz-vm-items-render");
        if(!host) {return;}
        let slot=host.querySelector(".usr-wz-items-dynamic-root");
        if(!slot) {
            slot=vmElement("div","usr-wz-items-dynamic-root");
            host.appendChild(slot);
        }
        // Keep the Figma summary cards outside the white VM Items table card
        // when the native Freedom UI stage is reachable; fall back inside safely.
        const stage=host.closest(".usr-wz-vm-stage");
        const stageParent=stage?.parentElement;
        let outside=stageParent ? Array.from(stageParent.children).find(el=>
            el.classList?.contains("usr-wz-vm-summaries-outside")) : null;
        const signature=JSON.stringify({items,lookups:{
            environments:vmLookupCache.environments,
            operatingSystems:vmLookupCache.operatingSystems,
            zones:vmLookupCache.zones
        },currencies:[...vmConfigCache.values()].map(cfg=>({id:cfg.id,rates:cfg.rates}))});
        if(slot.dataset.vmSignature===signature && (!items.length || !stageParent || outside?.isConnected)) {return;}
        slot.dataset.vmSignature=signature;
        slot.replaceChildren();
        if(!items.length) {outside?.remove();return;}

        // Exactly the same columns as the provided Figma table.
        const tableWrap=vmElement("div","usr-wz-vm-table-scroll");
        tableWrap.setAttribute("role","region");
        tableWrap.setAttribute("aria-label","Saved virtual machine items");
        tableWrap.tabIndex=0;
        const table=vmElement("table","usr-wz-vm-table");
        const thead=vmElement("thead");
        const header=vmElement("tr");
        for(const label of ["#","VM Name","Env","Pts","CPU","RAM","Storage","Add-ons","Financial",""]) {
            const cell=vmElement("th",null,label);
            cell.scope="col";
            header.appendChild(cell);
        }
        thead.appendChild(header);table.appendChild(thead);
        const tbody=vmElement("tbody");
        let totalPoints=0;
        const chargeGroups=new Map();
        let addonTypesTotal=0;
        items.forEach((item,index)=>{
            const tr=vmElement("tr");
            const addons=vmAddonDetails(item);
            addonTypesTotal+=addons.length;
            const env=vmGetOptionName("environments",item.environment)||"—";
            const os=vmGetOptionName("operatingSystems",item.operatingSystem)||"OS not available";
            const usedPoints=vmNumber(item.totalPoints||item.points);
            totalPoints+=usedPoints;
            tr.appendChild(vmElement("td","usr-wz-vm-ordinal",index+1));
            const vmNameCell=vmElement("td","usr-wz-vm-name-cell");
            vmNameCell.appendChild(vmElement("strong",null,item.name||"VM Item "+(index+1)));
            vmNameCell.appendChild(vmElement("small",null,os));
            tr.appendChild(vmNameCell);
            const envCell=vmElement("td");
            const envBadge=vmElement("span","usr-wz-vm-env-pill",env);
            const normalized=env.toLowerCase();
            envBadge.dataset.env=normalized.includes("prod")?"production":
                (normalized.includes("test")||normalized.includes("stag"))?"testing":
                normalized.includes("dev")?"development":
                (normalized==="dr"||normalized.includes("recovery"))?"recovery":"other";
            envCell.appendChild(envBadge);tr.appendChild(envCell);
            tr.appendChild(vmElement("td","usr-wz-vm-points-cell",vmFormat(usedPoints)));
            tr.appendChild(vmElement("td",null,vmFormat(item.cpu)));
            tr.appendChild(vmElement("td",null,vmFormat(item.ram)+" GB"));
            tr.appendChild(vmElement("td",null,vmFormat(item.storage)+" GB"));
            const addonCell=vmElement("td","usr-wz-vm-addons-cell",addons.length?addons.length+" configured":"—");
            addonCell.title=addons.length?addons.map(([label,qty,unit])=>label+": "+vmFormat(qty)+" "+unit).join("; "):"No optional add-ons";
            tr.appendChild(addonCell);
            const amount=vmNumber(item.totalAmount);
            if(amount>0){
                const currency=vmCurrencyText(item);
                const key=item.currencyId||"unresolved:"+currency;
                if(!chargeGroups.has(key)){chargeGroups.set(key,{amount:0,currency});}
                chargeGroups.get(key).amount+=amount;
            }
            tr.appendChild(vmElement("td","usr-wz-vm-money-cell",amount>0?
                vmFormat(amount)+" "+vmCurrencyText(item):"—"));
            const actions=vmElement("td","usr-wz-vm-row-actions");
            const edit=vmElement("button","usr-wz-vm-icon-button");
            edit.type="button";
            edit.setAttribute("aria-label","Edit "+(item.name||"VM Item"));
            edit.title="Edit VM Item";
            edit.innerHTML='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4z"/></svg>';
            edit.addEventListener("click",()=>vmOpenModal(ctx,index).catch(e=>vmPageNotice(ctx,e.message)));
            const del=vmElement("button","usr-wz-vm-icon-button");
            del.type="button";
            del.setAttribute("aria-label","Remove "+(item.name||"VM Item"));
            del.title="Remove VM Item";
            del.innerHTML='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m5 4v7m4-7v7"/></svg>';
            del.addEventListener("click",async()=>{
                if(!confirm("Remove this saved VM Item?")){return;}
                del.disabled=true;
                try{await vmDeleteItem(ctx,index);}
                catch(e){vmPageNotice(ctx,e.message);}
                finally{del.disabled=false;}
            });
            actions.append(edit,del);tr.appendChild(actions);
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        const tfoot=vmElement("tfoot");
        const totals=vmElement("tr");
        const totalsLabel=vmElement("td","usr-wz-vm-table-totals-label","Totals ("+items.length+" item"+(items.length===1?"":"s")+")");
        totalsLabel.colSpan=3;
        totals.appendChild(totalsLabel);
        totals.appendChild(vmElement("td","usr-wz-vm-table-total-points",vmFormat(totalPoints)+" pts"));
        for(let k=0;k<4;k++){totals.appendChild(vmElement("td"));}
        const totalFinancial=vmElement("td","usr-wz-vm-money-cell");
        if(chargeGroups.size===1){
            const charge=[...chargeGroups.values()][0];
            totalFinancial.textContent=vmFormat(charge.amount)+" "+charge.currency;
        } else if(chargeGroups.size>1){
            totalFinancial.textContent="Multiple currencies";
            totalFinancial.title=[...chargeGroups.values()].map(x=>vmFormat(x.amount)+" "+x.currency).join(" · ");
        } else {totalFinancial.textContent="—";}
        totals.appendChild(totalFinancial);
        totals.appendChild(vmElement("td"));
        tfoot.appendChild(totals);table.appendChild(tfoot);
        tableWrap.appendChild(table);slot.appendChild(tableWrap);

        const summaryGrid=vmElement("div","usr-wz-vm-stage-summaries");
        const pointCard=vmElement("section","usr-wz-vm-point-summary");
        pointCard.appendChild(vmElement("h3",null,"POINT SUMMARY · ملخص النقاط"));
        const summaryLine=(parent,label,value,emphasis="")=>{
            const line=vmElement("div","usr-wz-vm-summary-line");
            line.appendChild(vmElement("span",null,label));
            line.appendChild(vmElement("strong",emphasis,value));
            parent.appendChild(line);
        };
        summaryLine(pointCard,"Total VM Items",items.length);
        summaryLine(pointCard,"Total Points",vmFormat(totalPoints)+" pts","usr-wz-vm-violet-text");
        summaryLine(pointCard,"Planned points (not deducted)",vmFormat(totalPoints)+" pts","usr-wz-vm-green-text");
        const financialCard=vmElement("section","usr-wz-vm-financial-summary");
        financialCard.appendChild(vmElement("h3",null,"FINANCIAL SUMMARY · الملخص المالي"));
        if(chargeGroups.size===0){
            summaryLine(financialCard,"Total Add-on Charges","No charges");
        } else if(chargeGroups.size===1){
            const charge=[...chargeGroups.values()][0];
            summaryLine(financialCard,"Total Add-on Charges",vmFormat(charge.amount)+" "+charge.currency,"usr-wz-vm-money-highlight");
        } else {
            for(const charge of chargeGroups.values()){
                summaryLine(financialCard,"Add-on Charges ("+charge.currency+")",
                    vmFormat(charge.amount)+" "+charge.currency,"usr-wz-vm-money-highlight");
            }
        }
        financialCard.appendChild(vmElement("small",null,
            "يتم احتساب نقاط الخدمة والتكاليف المالية بشكل منفصل. Draft amounts are saved; no point-ledger consumption has been posted."));
        summaryGrid.append(pointCard,financialCard);
        if(stageParent) {
            if(!outside) {outside=vmElement("div","usr-wz-vm-summaries-outside");}
            outside.replaceChildren(summaryGrid);
            stage.after(outside);
        } else {
            slot.appendChild(summaryGrid);
        }
    }
    function vmSyncVisibility(ctx) {
        const items=vmState(ctx);
        const empty=items.length===0;
        ctx.WZ_VMEmptyState=empty;
        ctx.WZ_VMHasItems=!empty;
        if(typeof document==="undefined") {return;}
        document.querySelectorAll(".usr-wz-vm-first-native").forEach(btn=>{btn.hidden=!empty;});
        document.querySelectorAll(".usr-wz-vm-actions .usr-wz-live-next").forEach(btn=>{
            btn.disabled=empty;
            btn.title=empty?"Add and save at least one VM Item in Creatio first.":
                "Continue to the Documents step (draft only).";
        });
    }
    async function vmRefreshModalMath(root,ctx,index=-1) {
        const cfg=root.__vmConfig;
        if (!cfg) {return;}
        const get=n=>root.querySelector(`[name="${n}"]`);
        const pRaw=Number(get("vmPoints").value);
        const p=Number.isFinite(pRaw) ? Math.max(cfg.minPoints,Math.min(cfg.maxPoints,pRaw)) : cfg.minPoints;
        const keys={ADD_RAM:"extraRAM",ADD_STORAGE:"extraStorage",VPN:"vpnMbps",INTERNET:"internetMbps"};
        const numeric={};
        const invalidNames=[];
        for (const [code,name] of Object.entries(keys)) {
            const field=get(name);
            const n=Number(field.value || 0);
            const bad=!Number.isFinite(n)||n<0;
            field.classList.toggle("usr-wz-vm-input-error",bad);
            if(bad){invalidNames.push(code);}
            // Invalid values never become stored quantities. Display the *base* figures
            // until the user corrects them, and block saving below.
            numeric[name]=bad?0:n;
        }
        const missingRates=Object.entries(keys).filter(([code,name])=>numeric[name]>0 && !cfg.rates[code])
            .map(([code])=>code);
        const problems=[];
        if(invalidNames.length){problems.push("Negative or invalid quantities: "+invalidNames.join(", ")+". Use 0 or a positive number.");}
        if(missingRates.length){problems.push("No Rate linked to " +(cfg.name||"Configuration")+" " +(cfg.version||"")+" for "+
            missingRates.join(", ")+". Set quantity to 0 or configure a matching Resource Rate in Finance Configuration.");}
        let spec;
        try {
            spec=vmCostAndResources(p,numeric,cfg);
        } catch(error) {
            // The same missing-rate error was already added above; don't repeat it.
            if (!missingRates.length || !/Missing\s+.*Rate/i.test(String(error.message||error))) {
                problems.push(error.message||String(error));
            }
            // Calculation of CPU/RAM/Storage is still meaningful. Financial amount
            // MUST remain unknown; never silently price an unconfigured add-on at 0.
            spec={cpu:p*cfg.cpuPerPoint,ram:p*cfg.ramPerPoint+numeric.extraRAM,
                storage:p*cfg.storagePerPoint+numeric.extraStorage,
                points:p,extraPoints:NaN,amount:NaN};
        }
        const set=(selector,value)=>root.querySelectorAll(selector).forEach(
            node=>{node.textContent=String(value);});
        set("[data-vm-cpu]",vmFormat(spec.cpu));
        set("[data-vm-ram]",vmFormat(spec.ram));
        set("[data-vm-storage]",vmFormat(spec.storage));
        set("[data-vm-points]",Number.isFinite(spec.extraPoints)?vmFormat(spec.points)+" pts":"Pending rate verification");
        set("[data-vm-calc-points]",vmFormat(p)+" pts");
        set("[data-vm-calc-cpu]",vmFormat(spec.cpu)+" vCPU");
        set("[data-vm-calc-ram]",vmFormat(spec.ram)+" GB");
        set("[data-vm-calc-storage]",vmFormat(spec.storage)+" GB");
        const selectedAddOnCodes={ADD_RAM:numeric.extraRAM,ADD_STORAGE:numeric.extraStorage,
            VPN:numeric.vpnMbps,INTERNET:numeric.internetMbps};
        const selectedCurrency=Object.entries(selectedAddOnCodes)
            .filter(([,qty])=>qty>0).map(([code])=>cfg.rates[code]?.currency)
            .find(Boolean)||"";
        set("[data-vm-amount]",Number.isFinite(spec.amount) ?
            vmFormat(spec.amount)+(selectedCurrency ? " "+selectedCurrency : "") : "Not configured");
        set("[data-vm-extra-points]",Number.isFinite(spec.extraPoints)?vmFormat(spec.extraPoints)+" pts":"Not configured");
        set("[data-vm-initial]","Ledger not verified");
        set("[data-vm-remaining]","Not verified");
        set("[data-vm-remaining-caption]","Live balance");
        const missingAll=VM_TYPES.filter(code=>!cfg.rates[code]);
        const overview=root.querySelector("[data-vm-rate-overview]");
        if(overview){
            const diag=cfg.rateDiagnostics||{};
            const unmatched=diag.unmatchedTypes||[];
            overview.textContent=missingAll.length ?
                "Verified rates for this exact version: " + (4-missingAll.length) +
                "/4. Missing: " + missingAll.join(", ") +
                (unmatched.length ? ". Unrecognized Resource Types: " + unmatched.length : "") +
                ". Lookup method: " + (diag.lookupMethod||"unknown") +
                ". You may save a basic VM with optional quantities = 0." :
                "All four Resource Rates verified against the chosen Configuration Version ("+
                (diag.lookupMethod||"linked query")+").";
        }
        for(const [code,name] of Object.entries(keys)){
            const rate=cfg.rates[code];
            const label=root.querySelector(`[data-vm-rate="${code}"]`);
            if(label){label.textContent=rate ?
                vmFormat(rate.price)+" "+rate.currency+" / "+rate.unit+" · "+vmFormat(rate.pointsPerUnit)+" pts/unit":
                "No Rate linked to selected " +(cfg.version||"configuration")+" — enter 0 or configure rate";}
            const subtotal=root.querySelector(`[data-vm-subtotal="${code}"]`);
            if(subtotal){subtotal.textContent=rate?vmFormat(rate.price*numeric[name])+" "+rate.currency:"Not configured";}
        }
        const note=root.querySelector("[data-vm-math-error]");
        if(note){note.textContent=[...new Set(problems)].join(" ");}
    }
    function vmCloseModal() {
        if (typeof document === "undefined") { return; }
        const overlay=document.getElementById("usr-wz-vm-modal");
        if (overlay){overlay.remove();}
        document.body.classList.remove("usr-wz-vm-modal-open");
    }
    function vmInput(label, name, type="text", required=false, hint="") {
        const numberLimits = type === "number" ? 'min="0" step="any" inputmode="decimal"' : "";
        return `<label class="usr-wz-vm-field"><span>${label}${required?'<b aria-hidden="true"> *</b>':''}</span>`+
            `<input name="${name}" type="${type}" ${numberLimits} ${required?'required':''} ${hint?`placeholder="${hint}"`:''}/>`+
            `</label>`;
    }
    async function vmOpenModal(ctx, editIndex = -1) {
        if (typeof document === "undefined") { return; }
        vmCloseModal();
        if (!validGuid(selectedId(await ctx.WZ_Contract))) {
            vmPageNotice(ctx,"Select and save a Contract before adding VM items."); return;
        }
        await vmLoadSavedItems(ctx);
        await vmLoadLookupOptions();
        let cfg = await vmLoadContractConfig(ctx,true);
        const current = editIndex >= 0 ? vmState(ctx)[editIndex] : null;
        const overlay=document.createElement("div");
        overlay.id="usr-wz-vm-modal";
        overlay.className="usr-wz-vm-modal-backdrop";
        overlay.setAttribute("role","presentation");
        overlay.innerHTML=`<div class="usr-wz-vm-modal" role="dialog" aria-modal="true" aria-labelledby="usr-vm-dialog-title">
          <div class="usr-wz-vm-modal-header"><div><strong id="usr-vm-dialog-title">${current?"Edit VM Item":"Add VM Item · إضافة الخادم للطلب"}</strong>
            <div class="usr-wz-vm-muted">Configuration from the selected Contract. Draft settings are for testing, not submission.</div>
            <div class="usr-wz-vm-muted" data-vm-version></div></div>
            <button type="button" class="usr-wz-vm-close" aria-label="Close dialog">×</button></div>
          <div class="usr-wz-vm-modal-scroll"><div class="usr-wz-vm-contract-snapshot">
            <strong data-vm-contract></strong><div class="usr-wz-vm-snapshot-grid">
              <span>Initial points<br><b data-vm-initial>—</b></span>
              <span>Restored<br><b>Ledger pending</b></span>
              <span>Live available<br><b>Ledger pending</b></span>
              <span>Point conversion<br><b data-vm-conversion>Loading configuration...</b></span>
            </div></div>
            <div class="usr-wz-vm-section-title">VM PURPOSE & CONFIGURATION</div>
            <div class="usr-wz-vm-grid">
              ${vmInput('VM Purpose / Name','vmName','text',true,'e.g. Web Application Server')}
              ${vmBuildSelect('Environment','environment')}
              ${vmBuildSelect('Operating System','operatingSystem')}
              ${vmBuildSelect('Zone / Network Segment','zone')}
            </div>
            <div class="usr-wz-vm-basic-heading">
              <div class="usr-wz-vm-section-title">BASIC RESOURCES · الموارد الأساسية
                <small>Calculated from the selected contract's Configuration Version.</small>
              </div>
              <button class="usr-wz-vm-explain-link" type="button" data-vm-explain-toggle
                aria-controls="usr-wz-vm-explain-panel" aria-expanded="false">Explain Calculation</button>
            </div>
            <div class="usr-wz-vm-explain-panel" id="usr-wz-vm-explain-panel" data-vm-explain-panel hidden>
              <strong>How are resources calculated? · طريقة الحساب</strong>
              <p>This calculation uses the selected Configuration Version. Draft versions can be used
                to prepare test drafts, but not to approve or consume points.</p>
              <div class="usr-wz-vm-explain-formula">
                <div><span>Selected points</span><b data-vm-calc-points>1 point</b></div>
                <div><span>CPU (selected points × contract CPU per point)</span><b data-vm-calc-cpu>1 vCPU</b></div>
                <div><span>RAM (selected points × contract RAM per point + extra RAM)</span><b data-vm-calc-ram>4 GB</b></div>
                <div><span>Storage (selected points × contract storage per point + extra Storage)</span><b data-vm-calc-storage>75 GB</b></div>
              </div>
              <p>Extra RAM, storage, VPN and Internet rates are read from the selected Configuration Version.
                No point ledger transaction is posted when you save a Draft VM Item.</p>
            </div>
            <div class="usr-wz-vm-resource-panel">
              <div class="usr-wz-vm-points-title">Required Service Points · عدد نقاط الخدمة المطلوبة</div>
              <div class="usr-wz-vm-muted" data-vm-limits>Contract limits loading</div>
              <div class="usr-wz-vm-stepper"><button type="button" data-vm-minus aria-label="Decrease points">−</button>
              <input name="vmPoints" type="number" min="1" max="20" step="1" value="1" aria-label="Selected service points"/>
              <button type="button" data-vm-plus aria-label="Increase points">+</button></div>
              <div class="usr-wz-vm-after"><span class="usr-wz-vm-green">●</span> <span data-vm-remaining-caption></span>: <b data-vm-remaining></b></div>
              <div class="usr-wz-vm-resource-cards">
                <div>Included CPU<br><b data-vm-cpu>1</b><small>vCPU</small></div>
                <div>Included RAM<br><b data-vm-ram>4</b><small>GB RAM</small></div>
                <div>Included Storage<br><b data-vm-storage>75</b><small>GB</small></div>
              </div></div>
              <div class="usr-wz-vm-section-title">OPTIONAL ADD-ONS · الإضافات الاختيارية
                <small>Prices and additional point usage come from the selected contract's Resource Rates.</small></div>
              <div class="usr-wz-vm-rate-helper">
                <span data-vm-rate-overview role="status" aria-live="polite">Checking linked rates…</span>
                <button type="button" data-vm-refresh-rates>Refresh rates</button>
                <button type="button" data-vm-reset-extras>Clear optional quantities</button>
              </div>
              <div class="usr-wz-vm-addons">
                <details class="usr-wz-vm-addon">
                  <summary><span class="usr-wz-vm-addon-main"><b>Additional RAM <span lang="ar">· ذاكرة إضافية</span></b>
                    <small>Extra RAM beyond the included point allocation</small></span><span class="usr-wz-vm-addon-chevron" aria-hidden="true">⌄</span></summary>
                  <div class="usr-wz-vm-addon-content">
                    ${vmInput('Additional RAM (GB)','extraRAM','number',false,'0')}
                    <small data-vm-rate="ADD_RAM">Checking Rate</small>
                    <div class="usr-wz-vm-addon-subtotal">Subtotal: <b data-vm-subtotal="ADD_RAM">0</b></div>
                  </div>
                </details>
                <details class="usr-wz-vm-addon">
                  <summary><span class="usr-wz-vm-addon-main"><b>Additional Storage <span lang="ar">· مساحة تخزين إضافية</span></b>
                    <small>Extra block storage beyond the included point allocation</small></span><span class="usr-wz-vm-addon-chevron" aria-hidden="true">⌄</span></summary>
                  <div class="usr-wz-vm-addon-content">
                    ${vmInput('Additional Storage (GB)','extraStorage','number',false,'0')}
                    <small data-vm-rate="ADD_STORAGE">Checking Rate</small>
                    <div class="usr-wz-vm-addon-subtotal">Subtotal: <b data-vm-subtotal="ADD_STORAGE">0</b></div>
                  </div>
                </details>
                <details class="usr-wz-vm-addon">
                  <summary><span class="usr-wz-vm-addon-main"><b>VPN Connection <span lang="ar">· اتصال VPN</span></b>
                    <small>Dedicated VPN connectivity for secure access</small></span><span class="usr-wz-vm-addon-chevron" aria-hidden="true">⌄</span></summary>
                  <div class="usr-wz-vm-addon-content">
                    ${vmInput('VPN Bandwidth (Mbps)','vpnMbps','number',false,'0')}
                    <small data-vm-rate="VPN">Checking Rate</small>
                    <div class="usr-wz-vm-addon-subtotal">Subtotal: <b data-vm-subtotal="VPN">0</b></div>
                  </div>
                </details>
                <details class="usr-wz-vm-addon">
                  <summary><span class="usr-wz-vm-addon-main"><b>Dedicated Internet <span lang="ar">· إنترنت مخصص</span></b>
                    <small>Dedicated internet bandwidth allocation</small></span><span class="usr-wz-vm-addon-chevron" aria-hidden="true">⌄</span></summary>
                  <div class="usr-wz-vm-addon-content">
                    ${vmInput('Internet Bandwidth (Mbps)','internetMbps','number',false,'0')}
                    <small data-vm-rate="INTERNET">Checking Rate</small>
                    <div class="usr-wz-vm-addon-subtotal">Subtotal: <b data-vm-subtotal="INTERNET">0</b></div>
                  </div>
                </details>
              </div><div class="usr-wz-vm-totals">
                <div><strong>POINT SUMMARY · ملخص النقاط</strong>
                  <p>Selected points <b data-vm-points>1 pts</b></p>
                  <p>Add-on charges <b data-vm-amount>0</b></p>
                  <p>Add-on points <b data-vm-extra-points>0 pts</b></p>
                  <p>Initial points <b data-vm-initial>—</b></p>
                  <p>Remaining (illustrative) <b data-vm-remaining>—</b></p></div>
                <div><strong>FINAL VM CONFIG · التكوين النهائي</strong>
                  <p>CPU <b><span data-vm-cpu>1</span> vCPU</b></p>
                  <p>RAM <b><span data-vm-ram>4</span> GB</b></p>
                  <p>Storage <b><span data-vm-storage>75</span> GB</b></p></div>
              </div>
              <div class="usr-wz-vm-caution">ⓘ Draft preparation only. VM Items are saved only after Creatio confirms the database write.
                Available/Restored points require verified ledger reconciliation; Draft configuration is not approved for submission.</div>
              <div class="usr-wz-vm-error" data-vm-math-error role="status" aria-live="polite"></div>
              <div class="usr-wz-vm-error" role="alert" aria-live="polite"></div>
          </div><div class="usr-wz-vm-modal-footer"><button type="button" data-vm-cancel>Cancel</button>
              <button type="button" data-vm-add>${current?"Update VM Item":"Add VM Item · إضافة الخادم للطلب"}</button>
          </div></div>`;
        document.body.appendChild(overlay);
        document.body.classList.add("usr-wz-vm-modal-open");
        // Keep Close and Cancel working even if subsequent SDK/lookup work fails.
        overlay.querySelector(".usr-wz-vm-close").addEventListener("click", vmCloseModal);
        overlay.querySelector("[data-vm-cancel]").addEventListener("click", vmCloseModal);
        overlay.addEventListener("keydown", event => {
            if (event.key === "Escape") { event.preventDefault(); vmCloseModal(); }
        });
        const get = n => overlay.querySelector(`[name="${n}"]`);
        overlay.__vmConfig=cfg;
        overlay.querySelector("[data-vm-version]").textContent=
            (cfg.name||"Configuration")+" "+cfg.version+" ("+cfg.status+")";
        overlay.querySelector("[data-vm-conversion]").textContent=
            "1 pt = "+vmFormat(cfg.cpuPerPoint)+" vCPU · "+
            vmFormat(cfg.ramPerPoint)+" GB RAM · "+vmFormat(cfg.storagePerPoint)+" GB";
        overlay.querySelector("[data-vm-limits]").textContent=
            "Min "+vmFormat(cfg.minPoints)+" · Max "+vmFormat(cfg.maxPoints)+
            " · Increment "+vmFormat(cfg.increment);
        const pointControl=get("vmPoints");
        pointControl.min=cfg.minPoints;pointControl.max=cfg.maxPoints;pointControl.step=cfg.increment;
        vmMakeOptions(get("environment"),vmLookupCache.environments,current?.environment);
        vmMakeOptions(get("operatingSystem"),vmLookupCache.operatingSystems,current?.operatingSystem);
        vmMakeOptions(get("zone"),vmLookupCache.zones,current?.zone);
        const missingLookups = [
            ["Environment", vmLookupCache.environments],
            ["Operating System", vmLookupCache.operatingSystems],
            ["Network Zone", vmLookupCache.zones]
        ].filter(([, list]) => !list.length).map(([label]) => label);
        if (missingLookups.length) {
            overlay.querySelector(".usr-wz-vm-error:not([data-vm-math-error])").textContent =
                "No Creatio lookup records loaded for: " + missingLookups.join(", ") +
                ". Check the lookup object Code and access rights (not just its display title).";
        }
        get("vmName").value=current?.name||"";
        pointControl.value=current?.points||cfg.minPoints;
        get("extraRAM").value=current?.extraRAM||0;
        get("extraStorage").value=current?.extraStorage||0;
        get("vpnMbps").value=current?.vpnMbps||0;
        get("internetMbps").value=current?.internetMbps||0;
        overlay.querySelector("[data-vm-contract]").textContent=
            String(await ctx.WZ_ContractName || "Selected contract");
        const rerender=async()=>{
            const oldWarning=overlay.querySelector(".usr-wz-vm-error:not([data-vm-math-error])");
            if(oldWarning){oldWarning.textContent="";}
            try{await vmRefreshModalMath(overlay,ctx,editIndex);}
            catch(error){
                console.error("MCIT VM calculation failed", error);
                const note = overlay.querySelector("[data-vm-math-error]");
                if (note) { note.textContent = error.message || "Could not calculate resources."; }
            }
        };
        for (const field of ["vmPoints","extraRAM","extraStorage","vpnMbps","internetMbps"]) {
            get(field).addEventListener("input",rerender);
        }
        overlay.querySelector("[data-vm-refresh-rates]").addEventListener("click",async()=>{
            const refresh=overlay.querySelector("[data-vm-refresh-rates]");
            refresh.disabled=true;refresh.textContent="Loading rates…";
            try {
                cfg=await vmLoadContractConfig(ctx,true);
                overlay.__vmConfig=cfg;
                await rerender();
            } catch(error) {
                overlay.querySelector(".usr-wz-vm-error:not([data-vm-math-error])").textContent=
                    "Resource Rate refresh failed: " +(error.message||String(error));
            } finally {refresh.disabled=false;refresh.textContent="Refresh rates";}
        });
        overlay.querySelector("[data-vm-reset-extras]").addEventListener("click",()=>{
            // This action is explicit: never silently drop user-provided add-ons.
            for(const field of ["extraRAM","extraStorage","vpnMbps","internetMbps"]){
                get(field).value="0";
                get(field).classList.remove("usr-wz-vm-input-error");
            }
            overlay.querySelector(".usr-wz-vm-error:not([data-vm-math-error])").textContent="";
            rerender();
        });
        const explainToggle=overlay.querySelector("[data-vm-explain-toggle]");
        const explainPanel=overlay.querySelector("[data-vm-explain-panel]");
        explainToggle.addEventListener("click",()=>{
            const expand=explainPanel.hidden;
            explainPanel.hidden=!expand;
            explainToggle.setAttribute("aria-expanded",String(expand));
            explainToggle.textContent=expand?"Hide Calculation":"Explain Calculation";
        });
        overlay.querySelector("[data-vm-minus]").addEventListener("click",()=>{
            pointControl.value=Math.max(cfg.minPoints,Number(pointControl.value||cfg.minPoints)-cfg.increment);
            rerender();
        });
        overlay.querySelector("[data-vm-plus]").addEventListener("click",()=>{
            pointControl.value=Math.min(cfg.maxPoints,Number(pointControl.value||cfg.minPoints)+cfg.increment);
            rerender();
        });
        overlay.querySelector("[data-vm-add]").addEventListener("click",async()=>{
            const required=["vmName","environment","operatingSystem","zone"];
            const missing=required.filter(name=>!String(get(name).value||"").trim());
            const points=Number(pointControl.value);
            const ram=Number(get("extraRAM").value||0);
            const storage=Number(get("extraStorage").value||0);
            const vpn=Number(get("vpnMbps").value||0);
            const internet=Number(get("internetMbps").value||0);
            const error=overlay.querySelector(".usr-wz-vm-error:not([data-vm-math-error])");
            required.forEach(name=>get(name).classList.toggle("usr-wz-vm-input-error",missing.includes(name)));
            const stepValid=Math.abs((points-cfg.minPoints)/cfg.increment-
                Math.round((points-cfg.minPoints)/cfg.increment))<0.000001;
            const errors=[];
            if(missing.length){
                errors.push("Required fields: " + missing.map(name=>({vmName:"VM Purpose / Name",environment:"Environment",operatingSystem:"Operating System",zone:"Zone / Network Segment"}[name]||name)).join(", ")+".");
            }
            if(!Number.isFinite(points) || points<cfg.minPoints || points>cfg.maxPoints || !stepValid){
                errors.push("Service points must match this contract's min/max/increment.");
            }
            const addonValues={ADD_RAM:ram,ADD_STORAGE:storage,VPN:vpn,INTERNET:internet};
            const negatives=Object.entries(addonValues).filter(([,n])=>!Number.isFinite(n)||n<0).map(([code])=>code);
            if(negatives.length){errors.push("Negative or invalid add-on quantities: "+negatives.join(", ")+". Use 0 or greater.");}
            const missingRateCodes=Object.entries(addonValues).filter(([code,n])=>n>0 && !cfg.rates[code]).map(([code])=>code);
            if(missingRateCodes.length){
                errors.push("Missing Resource Rates for " + missingRateCodes.join(", ") + " in " +
                    (cfg.name || "Configuration") + " " + (cfg.version || "") +
                    ". Set these quantities to 0, or link rates to this exact version in Finance Configuration.");
            }
            if(errors.length){
                const mathError=overlay.querySelector("[data-vm-math-error]");
                if (mathError) {mathError.textContent="";}
                error.textContent=errors.join(" ");
                error.scrollIntoView?.({behavior:"smooth",block:"nearest"});
                return;
            }
            error.textContent="";
            const selected={
                name:get("vmName").value.trim(),
                environment:get("environment").value,
                operatingSystem:get("operatingSystem").value,
                zone:get("zone").value,
                points,
                extraRAM:ram,extraStorage:storage,vpnMbps:vpn,internetMbps:internet
            };
            for(const [key,value] of [["environments",selected.environment],
                ["operatingSystems",selected.operatingSystem],["zones",selected.zone]]){
                if(!Array.isArray(vmLookupCache[key]) || !vmLookupCache[key].some(row=>row.id===value)){
                    error.textContent="Select valid Environment, OS and Zone records from Creatio.";
                    return;
                }
            }
            const saveButton=overlay.querySelector("[data-vm-add]");
            saveButton.disabled=true;
            saveButton.textContent="Saving...";
            try{
                await vmSaveItem(ctx,selected,editIndex,cfg);
                vmCloseModal();
                vmSyncVisibility(ctx);
                vmRenderItems(ctx);
            }catch(saveError){
                console.error("MCIT VM Item database save",saveError);
                error.textContent=saveError.message||"Could not save VM Item.";
                saveButton.disabled=false;
                saveButton.textContent=current?"Update VM Item":"Add VM Item · إضافة الخادم للطلب";
            }
        });
        await rerender();
        get("vmName")?.focus();
    }

    function vmAddStyles() {
        if (typeof document === "undefined" || document.getElementById("usr-wz-vm-step2-styles")) {return;}
        const style=document.createElement("style");
        style.id="usr-wz-vm-step2-styles";
        style.textContent=`
        .usr-wz-vm-stage{border:1px solid #dfe3eb!important;border-radius:16px!important;background:#fff!important;overflow:hidden!important;gap:0!important;}
        .usr-wz-vm-stage-header{padding:18px!important;border-bottom:1px solid #edf0f4!important;align-items:center!important;justify-content:space-between!important;}
        .usr-wz-vm-stage-heading{font-weight:750!important;color:#10243e!important;font-size:14px!important;}
        .usr-wz-vm-stage-caption{color:#8090a8!important;font-size:12px!important;}
        .usr-wz-vm-stage-body{min-height:270px!important;padding:28px 16px!important;}
        .usr-wz-vm-blank{align-items:center!important;justify-content:center!important;gap:8px!important;min-height:210px!important;}
        .usr-wz-vm-blank-symbol{color:#651dd1!important;font-size:36px!important;}
        .usr-wz-vm-blank-title{font-weight:750!important;color:#213855!important;}
        .usr-wz-vm-blank-copy{color:#8996ad!important;font-size:12px!important;text-align:center!important;}
        /* Native fallback bypasses the deployment's green crt.Button theme. */
        .usr-wz-vm-native-hidden{display:none!important;}
        .usr-wz-vm-native-btn{box-sizing:border-box;min-height:35px;height:35px;border:1px solid #6618d9;
            background:#6618d9;color:#fff;border-radius:10px;padding:0 15px;
            display:inline-flex;align-items:center;justify-content:center;
            font:700 12px/1.2 Inter,Arial,sans-serif;white-space:nowrap;
            cursor:pointer;box-shadow:none;transition:filter .13s ease;}
        .usr-wz-vm-native-btn:hover:not(:disabled){filter:brightness(.95);}
        .usr-wz-vm-native-btn:focus-visible{outline:2px solid #a382f7;outline-offset:2px;}
        .usr-wz-vm-native-btn:disabled{opacity:.65;cursor:wait;}
        .usr-wz-vm-add-native{margin-left:auto;}
        .usr-wz-vm-btn-add::part(button),.usr-wz-vm-btn-first::part(button),
        .usr-wz-vm-btn-add button,.usr-wz-vm-btn-first button{
            background:#6618d9!important;color:#fff!important;border:0!important;
            border-radius:10px!important;min-height:35px!important;font-size:12px!important;}
        .usr-wz-vm-actions{width:100%!important;padding:10px 0 4px!important;
            align-items:center!important;justify-content:flex-end!important;gap:9px!important;
            flex-wrap:wrap!important;box-sizing:border-box!important;}
        /* The Step 2 native footer is identical to Step 1's trusted button bar. */
        .usr-wz-vm-actions.usr-wz-buttons-live-ready > :not(.usr-wz-live-toolbar),
        .usr-wz-doc-actions.usr-wz-buttons-live-ready > :not(.usr-wz-live-toolbar){display:none!important;}
        .usr-wz-vm-actions .usr-wz-live-toolbar{display:flex!important;width:100%!important;
            justify-content:flex-end!important;align-items:center!important;gap:9px!important;
            flex-wrap:wrap!important;}
        .usr-wz-vm-actions .usr-wz-live-back{margin-right:auto!important;color:#20304b!important;}
        .usr-wz-vm-actions .usr-wz-live-next:disabled{background:#b396ea!important;
            border-color:#b396ea!important;color:#fff!important;opacity:1!important;
            cursor:not-allowed!important;}
        .usr-wz-vm-action-back{margin-right:auto!important;}
        .usr-wz-vm-action-back::part(button){background:transparent!important;color:#64748b!important;border:0!important;}
        .usr-wz-vm-action-docs::part(button){background:#b39ae5!important;color:white!important;border:0!important;border-radius:10px!important;}
        .usr-wz-vm-items-render{display:flex;flex-direction:column;gap:10px;width:100%;}
        .usr-wz-vm-items-summary{font-size:12px;color:#8b6dc7;margin:8px 0;}
        .usr-wz-vm-item-card{border:1px solid #e5def9;border-radius:12px;padding:16px;display:flex;align-items:center;justify-content:space-between;gap:14px;background:#fbfaff;}
        .usr-wz-vm-item-details{min-width:0;display:flex;flex-direction:column;gap:7px;color:#21304e;font-size:13px;}
        .usr-wz-vm-item-meta{font-size:11px;color:#66778b;line-height:1.6;}
        .usr-wz-vm-item-controls{display:flex;gap:7px;flex:none;}
        .usr-wz-vm-item-controls button{border-radius:8px;border:1px solid #ddd8ea;background:white;padding:6px 11px;color:#6025ac;cursor:pointer;}
        /* Figma Step 2: table + totals + two full-width summary cards. */
        .usr-wz-vm-stage-body:has(.usr-wz-items-dynamic-root){min-height:0!important;padding:14px 16px!important;}
        .usr-wz-vm-items-render{width:100%!important;min-width:0!important;display:block!important;}
        .usr-wz-items-dynamic-root{width:100%;display:flex;flex-direction:column;gap:18px;font-family:Inter,Arial,sans-serif;}
        .usr-wz-vm-table-scroll{width:100%;max-width:100%;overflow-x:auto;overscroll-behavior-x:contain;box-sizing:border-box;}
        .usr-wz-vm-table{width:100%;min-width:870px;border-collapse:collapse;border-spacing:0;table-layout:auto;color:#26344e;font-size:11px;line-height:1.45;}
        .usr-wz-vm-table thead{background:#f7f7f9;}
        .usr-wz-vm-table th{color:#64738a;font-weight:700;font-size:10px;white-space:nowrap;text-align:left;padding:12px 10px;}
        .usr-wz-vm-table th:first-child,.usr-wz-vm-table td:first-child{width:30px;text-align:center;}
        .usr-wz-vm-table th:nth-child(2){min-width:175px;}
        .usr-wz-vm-table th:nth-child(8){min-width:83px;}
        .usr-wz-vm-table td{padding:12px 10px;border-bottom:1px solid #edf0f4;vertical-align:middle;white-space:nowrap;}
        .usr-wz-vm-table tbody tr:hover{background:#fbf9ff;}
        .usr-wz-vm-name-cell strong{display:block;color:#152a4a;font-size:12px;font-weight:750;max-width:230px;overflow-wrap:anywhere;white-space:normal;}
        .usr-wz-vm-name-cell small{display:block;color:#8794a7;font-size:10px;margin-top:3px;max-width:230px;white-space:normal;}
        .usr-wz-vm-ordinal{color:#8995a8;}
        .usr-wz-vm-points-cell{color:#5d18c5;font-weight:750;}
        .usr-wz-vm-env-pill{display:inline-flex;align-items:center;border-radius:6px;padding:4px 7px;background:#f3f2f9;color:#5c6176;font-weight:700;font-size:10px;white-space:nowrap;}
        .usr-wz-vm-env-pill[data-env="production"]{background:#fff0ef;color:#e33c45;}
        .usr-wz-vm-env-pill[data-env="testing"]{background:#fff6dc;color:#96620c;}
        .usr-wz-vm-env-pill[data-env="development"]{background:#e9f3ff;color:#1f6bbc;}
        .usr-wz-vm-env-pill[data-env="recovery"]{background:#eaf9f1;color:#128149;}
        .usr-wz-vm-addons-cell{color:#62738b;}
        .usr-wz-vm-money-cell{color:#c45711;font-weight:750;white-space:nowrap;}
        .usr-wz-vm-row-actions{white-space:nowrap;min-width:63px;}
        .usr-wz-vm-icon-button{display:inline-flex;justify-content:center;align-items:center;width:27px;height:27px;margin-right:3px;border:1px solid transparent;border-radius:6px;cursor:pointer;background:transparent;color:#8592a5;}
        .usr-wz-vm-icon-button:hover{color:#6419cb;border-color:#dfd2ff;background:#f9f6ff;}
        .usr-wz-vm-icon-button:focus-visible{outline:2px solid #8f66e3;outline-offset:2px;}
        .usr-wz-vm-icon-button:disabled{opacity:.4;cursor:wait;}
        .usr-wz-vm-table tfoot tr{background:#f2edfb;}
        .usr-wz-vm-table tfoot td{font-size:11px;font-weight:700;border-bottom:none;color:#551bad;padding:13px 10px;}
        .usr-wz-vm-table tfoot .usr-wz-vm-money-cell{color:#ba4d0c;}
        .usr-wz-vm-table-totals-label{white-space:nowrap;}
        .usr-wz-vm-summaries-outside{width:100%;box-sizing:border-box;min-width:0;margin:16px 0 4px;}
        .usr-wz-vm-stage-summaries{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:stretch;width:100%;}
        .usr-wz-vm-stage-summaries section{border-radius:13px;padding:16px;min-width:0;box-sizing:border-box;}
        .usr-wz-vm-point-summary{background:#fbf9ff;border:1px solid #d9caff;}
        .usr-wz-vm-financial-summary{background:#fffbeb;border:1px solid #f5df91;}
        .usr-wz-vm-stage-summaries h3{font-size:11px;color:#52627b;font-weight:750;letter-spacing:.1px;margin:0 0 12px;}
        .usr-wz-vm-financial-summary h3{color:#ad4c0c;}
        .usr-wz-vm-summary-line{display:flex;justify-content:space-between;gap:15px;align-items:baseline;color:#5b6c84;font-size:12px;margin:9px 0;}
        .usr-wz-vm-summary-line strong{font-size:12px;color:#1c3152;font-weight:750;text-align:right;white-space:nowrap;}
        .usr-wz-vm-summary-line .usr-wz-vm-violet-text{color:#6022bf;}
        .usr-wz-vm-summary-line .usr-wz-vm-green-text{color:#159d56;}
        .usr-wz-vm-summary-line .usr-wz-vm-money-highlight{color:#b24a0d;}
        .usr-wz-vm-financial-summary small{display:block;color:#af6a28;margin-top:12px;font-size:10px;line-height:1.7;}
        @media(max-width:740px){.usr-wz-vm-stage-summaries{grid-template-columns:1fr;}.usr-wz-vm-table{min-width:820px;}}
        .usr-wz-vm-modal-open{overflow:hidden!important;}
        .usr-wz-vm-modal-backdrop{position:fixed;inset:0;z-index:2147483000;background:rgba(25,23,35,.53);display:flex;align-items:center;justify-content:center;padding:18px;box-sizing:border-box;}
        .usr-wz-vm-modal{width:min(650px,100%);max-height:min(90vh,950px);background:white;border-radius:16px;display:flex;flex-direction:column;box-shadow:0 22px 75px rgba(0,0,0,.28);font-family:Inter,Arial,sans-serif;font-size:12px;color:#263653;overflow:hidden;}
        .usr-wz-vm-modal-header{padding:18px 20px 14px;display:flex;gap:10px;justify-content:space-between;align-items:flex-start;border-bottom:1px solid #edf0f5;}
        .usr-wz-vm-modal-header strong{font-size:16px;color:#1a2539;}
        .usr-wz-vm-muted{color:#8995a9;font-size:11px;line-height:1.5;}
        .usr-wz-vm-close{border:0;background:transparent;color:#8b93a6;font-size:22px;cursor:pointer;}
        .usr-wz-vm-modal-scroll{overflow:auto;padding:20px;display:flex;flex-direction:column;gap:17px;}
        .usr-wz-vm-contract-snapshot,.usr-wz-vm-resource-panel,.usr-wz-vm-totals>div{background:#f8f6ff;border:1px solid #dcd0ff;border-radius:13px;padding:15px;}
        .usr-wz-vm-contract-snapshot>strong{color:#621bba;font-size:12px;}
        .usr-wz-vm-snapshot-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px;margin-top:12px;color:#69758f;font-size:10px;line-height:1.7;}
        .usr-wz-vm-snapshot-grid b{color:#26335b;font-size:12px;}
        .usr-wz-vm-section-title{font-weight:750;color:#617189;font-size:11px;text-transform:uppercase;display:flex;flex-direction:column;gap:4px;}
        .usr-wz-vm-section-title small{font-weight:400;color:#a0a9ba;font-size:10px;text-transform:none;}
        .usr-wz-vm-basic-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;}
        .usr-wz-vm-basic-heading .usr-wz-vm-section-title{flex:1;min-width:220px;}
        .usr-wz-vm-explain-link{align-self:flex-start;color:#7027d7;background:transparent;border:0;
            padding:2px 0;cursor:pointer;text-decoration:underline;font:600 11px Inter,Arial,sans-serif;white-space:nowrap;}
        .usr-wz-vm-explain-link:focus-visible{outline:2px solid #a780e6;outline-offset:3px;border-radius:3px;}
        .usr-wz-vm-explain-panel{border:1px solid #dcd0ff;border-radius:12px;background:#f9f7ff;
            color:#5c6880;padding:12px 14px;font-size:11px;line-height:1.6;}
        .usr-wz-vm-explain-panel[hidden]{display:none!important;}
        .usr-wz-vm-explain-panel strong{display:block;color:#53208d;margin-bottom:5px;font-size:12px;}
        .usr-wz-vm-explain-panel p{margin:7px 0;}
        .usr-wz-vm-explain-formula{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin:10px 0;}
        .usr-wz-vm-explain-formula>div{display:flex;align-items:center;justify-content:space-between;gap:12px;
            background:#fff;border:1px solid #eee7ff;border-radius:8px;padding:8px;}
        .usr-wz-vm-explain-formula b{color:#5e1bc1;white-space:nowrap;}
        .usr-wz-vm-grid{display:grid;grid-template-columns:1fr 1fr;gap:13px;}
        .usr-wz-vm-rate-helper{display:flex;justify-content:space-between;align-items:center;gap:12px;
            flex-wrap:wrap;color:#776e92;font-size:11px;background:#faf8ff;border:1px solid #eee8fa;
            padding:9px 12px;border-radius:9px;}
        .usr-wz-vm-rate-helper button{border:0;background:transparent;color:#6622bd;text-decoration:underline;
            font:600 11px Inter,Arial,sans-serif;cursor:pointer;padding:0;}
        .usr-wz-vm-field{display:flex;flex-direction:column;gap:7px;font-weight:600;font-size:12px;color:#253757;}
        .usr-wz-vm-field b{color:#ec3535;}
        .usr-wz-vm-field input,.usr-wz-vm-field select{outline:none;border:1px solid #dfe2eb;border-radius:10px;padding:10px 12px;width:100%;font:12px Inter,Arial,sans-serif;background:white;box-sizing:border-box;}
        .usr-wz-vm-field input:focus,.usr-wz-vm-field select:focus{border-color:#752ae4;box-shadow:0 0 0 2px rgba(117,42,228,.11);}
        .usr-wz-vm-input-error{border-color:#ee4a56!important;}
        .usr-wz-vm-resource-panel{text-align:center;display:flex;flex-direction:column;gap:10px;}
        .usr-wz-vm-points-title{font-weight:750;}
        .usr-wz-vm-stepper{display:flex;justify-content:center;}
        .usr-wz-vm-stepper button,.usr-wz-vm-stepper input{border:1px solid #d5c3ff;text-align:center;background:#fff;color:#5c1bb9;font-size:19px;height:36px;box-sizing:border-box;}
        .usr-wz-vm-stepper button{width:37px;cursor:pointer;background:#f3effd;}
        .usr-wz-vm-stepper button:first-child{border-radius:11px 0 0 11px;}
        .usr-wz-vm-stepper button:last-child{border-radius:0 11px 11px 0;}
        .usr-wz-vm-stepper input{width:52px;appearance:textfield;font-weight:750;}
        .usr-wz-vm-stepper input::-webkit-inner-spin-button{-webkit-appearance:none;}
        .usr-wz-vm-green{color:#14a35a;}
        .usr-wz-vm-after{color:#71809a;font-size:11px;}
        .usr-wz-vm-after b{color:#0a9e52;}
        .usr-wz-vm-resource-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
        .usr-wz-vm-resource-cards>div{border:1px solid #ded5ff;border-radius:10px;padding:13px 8px;background:white;font-size:10px;color:#6e7c91;}
        .usr-wz-vm-resource-cards b{display:block;font-size:23px;color:#631bb9;margin-top:7px;}
        .usr-wz-vm-resource-cards small{display:block;color:#243451;}
        .usr-wz-vm-addons{display:flex;flex-direction:column;gap:7px;}
        .usr-wz-vm-addon{background:#fbfbfc;border:1px solid #e4e7ee;border-radius:12px;overflow:hidden;}
        .usr-wz-vm-addon[open]{border-color:#dccbff;background:#fff;}
        .usr-wz-vm-addon summary{cursor:pointer;list-style:none;display:flex;align-items:center;
            justify-content:space-between;gap:12px;min-height:48px;padding:11px 14px;color:#1c3155;}
        .usr-wz-vm-addon summary::-webkit-details-marker{display:none;}
        .usr-wz-vm-addon summary:focus-visible{outline:2px solid #a780e6;outline-offset:-2px;}
        .usr-wz-vm-addon-main{display:flex;flex-direction:column;gap:4px;line-height:1.25;}
        .usr-wz-vm-addon-main b{font-size:12px;font-weight:750;}
        .usr-wz-vm-addon-main b span{font-size:10px;color:#96a0b1;font-weight:500;}
        .usr-wz-vm-addon-main small{font-size:10px;color:#8796ad;font-weight:400;}
        .usr-wz-vm-addon-chevron{font-size:18px;line-height:1;color:#a3adbb;transition:transform .15s ease;}
        .usr-wz-vm-addon[open] .usr-wz-vm-addon-chevron{transform:rotate(180deg);}
        .usr-wz-vm-addon-content{padding:12px 14px 16px;border-top:1px solid #ece8f5;display:flex;flex-direction:column;gap:9px;}
        .usr-wz-vm-addon-content>.usr-wz-vm-field{max-width:250px;}
        .usr-wz-vm-addon-content>small{color:#8e98ac;font-size:10px;line-height:1.45;}
        .usr-wz-vm-addon-subtotal{display:flex;justify-content:flex-end;gap:10px;color:#6b4ba5;font-size:12px;}
        .usr-wz-vm-addon-subtotal b{color:#6221c6;}
        .usr-wz-vm-switchline{display:flex;align-items:center;gap:10px;color:#253654;font-size:12px;font-weight:650;cursor:pointer;}
        .usr-wz-vm-switchline input{accent-color:#6a1dd9;width:17px;height:17px;cursor:pointer;}
        .usr-wz-vm-check{display:flex;align-items:center;gap:9px;margin-top:12px;}
        .usr-wz-vm-totals{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .usr-wz-vm-totals strong{font-size:10px;color:#67778c;}
        .usr-wz-vm-totals p{display:flex;justify-content:space-between;gap:10px;font-size:11px;color:#65748c;}
        .usr-wz-vm-totals p b{color:#25314c;}
        .usr-wz-vm-caution{background:#f2eefb;border-radius:10px;padding:12px;color:#6936ab;font-size:11px;line-height:1.6;}
        .usr-wz-vm-error{color:#e92d39;min-height:0;}
        .usr-wz-vm-modal-footer{display:flex;justify-content:space-between;padding:14px 20px;border-top:1px solid #edf0f5;gap:15px;}
        .usr-wz-vm-modal-footer button{border-radius:9px;padding:10px 13px;cursor:pointer;font-weight:650;}
        .usr-wz-vm-modal-footer button:first-child{border:0;background:transparent;color:#566379;}
        .usr-wz-vm-modal-footer button:last-child{border:0;background:#681bd9;color:white;}
        @media(max-width:560px){
          .usr-wz-vm-native-btn{font-size:11px;padding:0 10px;}
          .usr-wz-vm-add-native{margin-left:0;}
          .usr-wz-vm-basic-heading{flex-direction:column;gap:6px;}
          .usr-wz-vm-explain-formula{grid-template-columns:1fr;}
          .usr-wz-vm-grid,.usr-wz-vm-totals{grid-template-columns:1fr;}
        .usr-wz-vm-snapshot-grid{grid-template-columns:repeat(2,1fr);}.usr-wz-vm-modal-scroll{padding:14px;}
        .usr-wz-vm-stage-header{flex-direction:column!important;align-items:flex-start!important;}}
        `;
        document.head.appendChild(style);
    }


    // ---- STEP 3: real UsrVMRequest attachments via Creatio SysFile ---------
    // SysFile.RecordId and SysFile.RecordSchemaName provide the parent link.
    // No File/Blob is persisted in sessionStorage and no optimistic success message.
    const DOC_PARENT_SCHEMA = "UsrVMRequest";
    const DOC_FILE_SCHEMA = "SysFile";
    const DOC_EXTENSIONS = new Set(["pdf", "docx", "xlsx"]);
    const DOC_MAX_BYTES = 25 * 1024 * 1024;
    const docStateByRequest = new Map();
    const docInFlight = new Set();
    const docState = (key) => {
        if (!docStateByRequest.has(key)) {
            docStateByRequest.set(key, {files:[],status:"",busy:false,loaded:false});
        }
        return docStateByRequest.get(key);
    };
    function docGuid() {
        if (typeof crypto !== "undefined" && crypto.randomUUID) {return crypto.randomUUID();}
        if (typeof crypto !== "undefined" && crypto.getRandomValues) {
            const bytes=new Uint8Array(16);
            crypto.getRandomValues(bytes);
            bytes[6]=(bytes[6]&0x0f)|0x40;
            bytes[8]=(bytes[8]&0x3f)|0x80;
            const hex=Array.from(bytes,x=>x.toString(16).padStart(2,"0")).join("");
            return hex.slice(0,8)+"-"+hex.slice(8,12)+"-"+hex.slice(12,16)+"-"+hex.slice(16,20)+"-"+hex.slice(20);
        }
        if (typeof Terrasoft !== "undefined" && Terrasoft.generateGUID) {return Terrasoft.generateGUID();}
        throw new Error("Secure GUID generator unavailable. Attachment was not uploaded.");
    }
    function docRootPath() {
        const path = (typeof location !== "undefined" && location.pathname) || "/0/";
        const idx = path.indexOf("/0/");
        return idx >= 0 ? path.slice(0,idx) + "/0/" : "/0/";
    }
    function docFileUrl(fileId) {
        return docRootPath() + "rest/FileService/Download/SysFile/" + encodeURIComponent(fileId);
    }
    function docReadableSize(num) {
        const n=Number(num);
        return Number.isFinite(n) && n>=0 ? (n<1024*1024 ? Math.max(1,Math.ceil(n/1024))+" KB" : (n/(1024*1024)).toFixed(2)+" MB") : "";
    }
    function docCheckFile(file) {
        const extension=String(file?.name||"").split(".").pop().toLowerCase();
        if (!file || !DOC_EXTENSIONS.has(extension)) {
            throw new Error("Only PDF, DOCX and XLSX files are allowed.");
        }
        if (!file.size || file.size > DOC_MAX_BYTES) {
            throw new Error("Each file must be nonempty and at most 25 MB.");
        }
        return true;
    }
    async function docReadAll(ctx) {
        const requestId=vmRequestKey(ctx);
        if(!validGuid(requestId)) {throw new Error("Save the request first to attach supporting documents.");}
        const rows=await vmLoadRows(DOC_FILE_SCHEMA,
            ["Id","Name","Size","CreatedOn"],
            [["RecordId",requestId],["RecordSchemaName",DOC_PARENT_SCHEMA]],200);
        return (rows||[]).filter(r=>validGuid(r.Id));
    }
    async function docRefresh(ctx) {
        const key=vmRequestKey(ctx);
        if(!validGuid(key)) {return;}
        const state=docState(key);
        try {
            state.files=await docReadAll(ctx);
            state.loaded=true;
            state.status="";
        } catch(error) {
            state.status="Cannot load attachments from Creatio: " + (error.message || String(error));
            state.loaded=false;
            console.error("MCIT Step 3 attachments read failed",error);
        }
        docPaint(ctx);
    }
    function docNotify(ctx,text) {
        const key=vmRequestKey(ctx);
        if(key){docState(key).status=String(text||"");}
        docPaint(ctx);
    }
    // Metadata is created first and the binary stream is sent to the Creatio
    // FileApiService endpoint. Browser authentication/CSRF cookie are reused.
    async function docUploadOne(ctx,file) {
        docCheckFile(file);
        const requestId=vmRequestKey(ctx);
        if(!validGuid(requestId)) {throw new Error("The request was not saved. Return to Step 1 and save draft.");}
        const fileId=docGuid();
        const model=await sdk.Model.create(DOC_FILE_SCHEMA);
        let inserted=false;
        try {
            const result=await model.insert({
                Id:fileId,Name:file.name,RecordId:requestId,
                RecordSchemaName:DOC_PARENT_SCHEMA
            });
            if(result===false || result?.success===false){throw new Error("Creatio rejected attachment metadata.");}
            inserted=true;
            const query=new URLSearchParams({
                fileId, fileName:file.name, mimeType:file.type||"application/octet-stream",
                totalFileLength:String(file.size),columnName:"Data",
                entitySchemaName:DOC_FILE_SCHEMA,
                parentColumnName:"RecordId",parentColumnValue:requestId,
                recordSchemaName:DOC_PARENT_SCHEMA
            });
            let csrf=null;
            try {csrf=typeof document!=="undefined" ?
                document.cookie.match(/(?:^|;\s*)BPMCSRF=([^;]+)/i)?.[1] : null;}
            catch(_cookieUnavailable) {}
            const headers={
                "Content-Type":"application/octet-stream",
                "Content-Range":"bytes 0-"+(file.size-1)+"/"+file.size
            };
            if(csrf) {headers.BPMCSRF=decodeURIComponent(csrf);}
            const response=await fetch(docRootPath()+"rest/FileApiService/UploadFile?"+query.toString(),{
                method:"POST",body:file,credentials:"same-origin",headers
            });
            const bodyText=await response.text();
            let responseBody=null;
            try {responseBody=JSON.parse(bodyText);} catch(_ignore){}
            if(!response.ok || responseBody?.success===false){
                throw new Error(responseBody?.errorInfo?.message || responseBody?.responseStatus?.Message ||
                    "File service returned HTTP " + response.status + ".");
            }
            const verified=await docReadAll(ctx);
            const found=verified.find(r=>String(r.Id).toLowerCase()===fileId.toLowerCase());
            if(!found){throw new Error("Upload response received but the saved file could not be verified in SysFile.");}
            if(Number(found.Size)<1 && Number.isFinite(Number(found.Size))){
                throw new Error("File metadata has zero size. Check Creatio FileApiService upload processing.");
            }
            return found;
        } catch(error) {
            if(inserted) {
                try {await model.delete([{type:sdk.ModelParameterType.PrimaryColumnValue,value:fileId}]);}
                catch(cleanError){console.warn("Failed to clean up invalid file metadata",fileId,cleanError);}
            }
            throw error;
        }
    }
    async function docUploadFiles(ctx,files) {
        const key=vmRequestKey(ctx);
        if(!validGuid(key)) {docNotify(ctx,"Save your request before uploading files.");return;}
        if(docInFlight.has(key)) {return;}
        const state=docState(key);
        const list=Array.from(files||[]);
        if(!list.length){return;}
        try {list.forEach(docCheckFile);}catch(error){docNotify(ctx,error.message);return;}
        docInFlight.add(key);state.busy=true;
        let succeeded=0;
        try {
            for(let i=0;i<list.length;i++){
                state.status="Uploading "+(i+1)+" of "+list.length+": "+list[i].name;
                docPaint(ctx);
                try {await docUploadOne(ctx,list[i]);succeeded++;}
                catch(error){
                    console.error("MCIT Step 3 upload failed",list[i].name,error);
                    state.status="Upload failed for " + list[i].name + ": " + (error.message||error);
                    break;
                }
            }
            const message=state.status;
            await docRefresh(ctx);
            state.status=succeeded===list.length && state.loaded ?
                (succeeded+" file(s) uploaded and verified in Creatio.") :
                (state.loaded ? message : state.status);
        } finally {state.busy=false;docInFlight.delete(key);docPaint(ctx);}
    }
    async function docDelete(ctx,id,name) {
        const key=vmRequestKey(ctx);
        if(!validGuid(key) || !validGuid(id) || !confirm("Remove '"+name+"' from this request?")) {return;}
        const state=docState(key);
        if(state.busy){return;}
        state.busy=true;docPaint(ctx);
        try {
            // Do not delete another request's files, even if a forged ID is passed.
            const target=(await docReadAll(ctx)).find(r=>String(r.Id).toLowerCase()===String(id).toLowerCase());
            if(!target){throw new Error("The selected attachment is not linked to this request.");}
            const model=await sdk.Model.create(DOC_FILE_SCHEMA);
            const result=await model.delete([{type:sdk.ModelParameterType.PrimaryColumnValue,value:id}]);
            if(result===false || result?.success===false){throw new Error("Delete was rejected by Creatio.");}
            const after=await docReadAll(ctx);
            if(after.some(r=>String(r.Id).toLowerCase()===String(id).toLowerCase())){
                throw new Error("Attachment still exists after delete request.");
            }
            state.files=after;state.loaded=true;state.status="Attachment removed.";
        } catch(error){state.status="Cannot delete file: "+(error.message||error);}
        finally {state.busy=false;docPaint(ctx);}
    }
    function docPaint(ctx) {
        if(typeof document==="undefined") {return;}
        const host=document.querySelector(".usr-wz-docs-dynamic");
        const key=vmRequestKey(ctx);
        if(!host || !key){return;}
        const state=docState(key);
        const zone=host.querySelector(".usr-wz-doc-drop");
        if(zone){zone.classList.toggle("usr-wz-doc-busy",state.busy);}
        const input=host.querySelector("input[type=file]");
        if(input){input.disabled=state.busy;}
        const browse=host.querySelector(".usr-wz-doc-browse");
        if(browse){browse.disabled=state.busy;}
        const message=host.querySelector(".usr-wz-doc-status");
        if(message){message.textContent=state.status;message.hidden=!state.status;}
        const list=host.querySelector(".usr-wz-doc-list");
        if(!list){return;}
        list.replaceChildren();
        if(!state.loaded && !state.files.length){
            list.appendChild(vmElement("div","usr-wz-doc-empty","Loading documents from Creatio..."));return;
        }
        if(!state.files.length){
            list.appendChild(vmElement("div","usr-wz-doc-empty","No documents uploaded yet"));return;
        }
        for(const file of state.files){
            const row=vmElement("div","usr-wz-doc-row");
            row.appendChild(vmElement("span","usr-wz-doc-file-icon","▤"));
            const info=vmElement("div","usr-wz-doc-file-info");
            const anchor=vmElement("a",null,file.Name||"Document");
            anchor.href=docFileUrl(file.Id);anchor.target="_blank";anchor.rel="noopener";
            anchor.title="Download " +(file.Name||"document");
            info.appendChild(anchor);
            info.appendChild(vmElement("small",null,docReadableSize(file.Size)));
            row.appendChild(info);
            const remove=vmElement("button","usr-wz-doc-remove","Remove");
            remove.type="button";remove.disabled=state.busy;
            remove.addEventListener("click",()=>docDelete(ctx,file.Id,file.Name));
            row.appendChild(remove);list.appendChild(row);
        }
    }
    function docMount(ctx){
        if(typeof document==="undefined") {return;}
        const host=document.querySelector(".usr-wz-documents-mount:not(.usr-wz-validation-mount):not(.usr-wz-review-mount)");
        if(!host){return;}
        const key=vmRequestKey(ctx);
        let root=host.querySelector(".usr-wz-docs-dynamic");
        if(root && root.dataset.requestKey===key){return;}
        if(root){root.remove();}
        root=vmElement("div","usr-wz-docs-dynamic");
        root.dataset.requestKey=key||"";
        const drop=vmElement("div","usr-wz-doc-drop");
        drop.tabIndex=0;drop.setAttribute("role","button");
        drop.setAttribute("aria-label","Browse or drop supporting documents");
        drop.appendChild(vmElement("div","usr-wz-doc-upload-icon","⇧"));
        const line=vmElement("div","usr-wz-doc-prompt");
        line.appendChild(vmElement("span",null,"Drop files here or "));
        const browse=vmElement("button","usr-wz-doc-browse","browse");
        browse.type="button";line.appendChild(browse);drop.appendChild(line);
        drop.appendChild(vmElement("small",null,"PDF, DOCX, XLSX · Max 25 MB per file"));
        const chooser=vmElement("input","usr-wz-doc-file-input");
        chooser.type="file";chooser.multiple=true;chooser.accept=".pdf,.docx,.xlsx";chooser.hidden=true;
        const startBrowse=(event)=>{
            event.preventDefault();event.stopPropagation();
            if(!docState(key||"").busy){chooser.click();}
        };
        drop.addEventListener("click",e=>{if(e.target!==browse){startBrowse(e);}});
        browse.addEventListener("click",startBrowse);
        drop.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){startBrowse(e);}});
        chooser.addEventListener("change",()=>{const files=Array.from(chooser.files||[]);chooser.value="";docUploadFiles(ctx,files);});
        for(const event of ["dragenter","dragover"]){
            drop.addEventListener(event,e=>{e.preventDefault();e.stopPropagation();drop.classList.add("usr-wz-doc-dragging");});
        }
        drop.addEventListener("dragleave",e=>{e.preventDefault();drop.classList.remove("usr-wz-doc-dragging");});
        drop.addEventListener("drop",e=>{
            e.preventDefault();e.stopPropagation();drop.classList.remove("usr-wz-doc-dragging");
            docUploadFiles(ctx,e.dataTransfer?.files);
        });
        const alert=vmElement("div","usr-wz-doc-alert");
        alert.textContent='ⓘ  A "Signed Acceptance Form" document may be required before provisioning. Please attach it if available.';
        const status=vmElement("div","usr-wz-doc-status");status.hidden=true;
        const list=vmElement("div","usr-wz-doc-list");
        root.append(drop,chooser,alert,status,list);host.appendChild(root);
        docPaint(ctx);
        if(key && !docState(key).loaded){
            docRefresh(ctx).catch(error=>docNotify(ctx,error.message));
        }
    }
    function docShowStep(ctx,step) {
        // Summary cards are Step 2 content. They must not appear before the
        // progress bar when Step 3 / Step 4 is displayed.
        if(typeof document==="undefined"){return;}
        document.querySelectorAll(".usr-wz-vm-summaries-outside").forEach(el=>{
            el.style.display=step===2?"":"none";
        });
    }
    // STEP 5: object-Signal handoff for the TEST environment.
    // The active "MCIT VM Request Submission" process starts on a VM Request
    // status transition Draft -> Submitted (record modified, Status selected).
    // Do not call executeProcessByName here: this is a Signal-started process,
    // and starting it explicitly could create a duplicate workflow instance.
    //
    // IMPORTANT: TEST ONLY. The current process does not verify/post Point Ledger
    // transactions atomically. Disable this switch for production until a
    // server-side submission service/guard verifies ledger, documents and rights.
    const WZ_ALLOW_TEST_SIGNAL_SUBMIT_WITHOUT_LEDGER = true;
    const wzSubmitInFlight = new WeakSet();

    async function wzFindStatusByName(name){
        const rows=await vmLoadRows("UsrMCITRequestStatus",["Id","Name"],[["Name",name]],3);
        if(rows.length!==1 || !validGuid(selectedId(rows[0].Id))){
            throw new Error("Expected exactly one "+name+" record in MCIT Request Statuses lookup; found "+rows.length+".");
        }
        return {value:selectedId(rows[0].Id),displayValue:String(rows[0].Name)};
    }

    // Step 4 - Figma-style, evidence-based validation.  The count displayed in the
    // UI is computed from these checks; never hard-code the sample Figma 0/1/7.
    // Warnings allow REVIEW after acknowledgement, but do not authorize SUBMIT.
    const wzValidationInFlight = new WeakSet();
    function wzCheck(level, section, title, message, recommendation="") {
        return {level, section, title, message, recommendation};
    }
    function wzCount(checks) {
        return {errors:checks.filter(x=>x.level==="error").length,
            warnings:checks.filter(x=>x.level==="warning").length,
            passed:checks.filter(x=>x.level==="passed").length,
            info:checks.filter(x=>x.level==="info").length};
    }
    async function docRunValidation(ctx) {
        const checks=[];
        const requestId=vmRequestKey(ctx);
        if (!validGuid(requestId)) {throw new Error("Save the request before validation.");}
        const record=await readRecord(DOC_PARENT_SCHEMA,requestId,[
            "Id","UsrName","UsrRequestType","UsrContract","UsrAccount","UsrProject",
            "UsrBusinessJustification"]);
        if (!record) {throw new Error("The saved request could not be read back from Creatio.");}
        const requestComplete=Boolean(String(record.UsrName||"").trim() &&
            String(record.UsrBusinessJustification||"").trim() &&
            selectedId(record.UsrRequestType) && selectedId(record.UsrContract) &&
            selectedId(record.UsrAccount) && selectedId(record.UsrProject));
        checks.push(requestComplete ?
            wzCheck("passed","Request Information","Required fields are complete",
                "Request information was verified against the saved Creatio record.") :
            wzCheck("error","Request Information","Required request fields are missing",
                "Complete the title, justification, request type, contract, authority and project.",
                "Return to Request Information and save the missing fields."));
        let scopeValid=false;
        try {scopeValid=await checkProjectBelongsToAccount(ctx);} catch(err) {
            console.warn("MCIT Step 4 project scope verification",err);
        }
        checks.push(scopeValid ?
            wzCheck("passed","Request Information","Project belongs to selected authority",
                "The selected active Project was checked against the government Account.") :
            wzCheck("error","Request Information","Project authority cannot be verified",
                "The project is inactive, does not belong to the selected Account, or the link could not be read.",
                "Verify Project > Authority in Customer 360 / MCIT Project."));
        const items=await vmLoadSavedItems(ctx,true);
        checks.push(items.length ?
            wzCheck("passed","VM Items","VM Items saved in Creatio",
                items.length+" saved VM Item(s) were read from the database.") :
            wzCheck("error","VM Items","No saved VM Items",
                "At least one VM Item must be saved before review.",
                "Return to Step 2 and add a VM Item."));
        if(items.length){
            const incomplete=items.filter(i=>!String(i.name||"").trim() ||
                !validGuid(i.environment) || !validGuid(i.operatingSystem) || !validGuid(i.zone));
            checks.push(incomplete.length ?
                wzCheck("error","VM Items","VM configuration fields are incomplete",
                    incomplete.length+" item(s) have missing Name, Environment, Operating System or Zone.",
                    "Edit the listed VM Items in Step 2.") :
                wzCheck("passed","VM Items","Required VM fields are complete",
                    "Every saved VM has a name, environment, operating system and network zone."));
            const badSpecs=items.filter(i=>!(Number(i.points)>0 && Number(i.cpu)>0 &&
                Number(i.ram)>0 && Number(i.storage)>0) ||
                [i.extraRAM,i.extraStorage,i.vpnMbps,i.internetMbps].some(x=>!Number.isFinite(Number(x)) || Number(x)<0));
            checks.push(badSpecs.length ?
                wzCheck("error","VM Items","Resource quantities need correction",
                    badSpecs.length+" VM Item(s) contain invalid points, resources or add-on quantities.",
                    "Correct the resource values before reviewing.") :
                wzCheck("passed","VM Items","VM resource values are valid",
                    "Saved VM points, CPU, RAM, storage and optional quantities passed range checks."));
        }
        let config=null;
        try {config=await vmLoadContractConfig(ctx,true);} catch(error) {
            checks.push(wzCheck("error","Contract Configuration","Configuration cannot be verified",
                String(error.message||error),"Check the contract configuration and Resource Rate relationships."));
        }
        if(config){
            const mismatched=items.filter(i=>!validGuid(i.configId) ||
                i.configId.toLowerCase()!==config.id.toLowerCase());
            checks.push(mismatched.length ?
                wzCheck("error","VM Items","VM Items reference a different configuration",
                    mismatched.length+" VM Item(s) do not reference the selected contract's configuration version.",
                    "Review existing items and the Contract in Step 1.") :
                wzCheck("passed","VM Items","Configuration Version matches",
                    "Saved VM Items belong to "+(config.name||"the selected configuration")+
                        " "+(config.version||"")+"."));
            const invalidPoints=items.filter(i=>{
                const points=Number(i.points);
                const increment=Number(config.increment)||1;
                return points < config.minPoints || points > config.maxPoints ||
                    Math.abs((points-config.minPoints)/increment -
                        Math.round((points-config.minPoints)/increment))>0.000001;
            });
            checks.push(invalidPoints.length ?
                wzCheck("error","VM Items","VM point limits violated",
                    invalidPoints.length+" VM Item(s) do not follow contract min / max / increment.",
                    "Correct the points in Step 2.") :
                wzCheck("passed","VM Items","Contract point limits satisfied",
                    "Each item follows the contract's configured min, max and increment."));
            const errors=[];
            for(const item of items){
                try {
                    const computed=vmCostAndResources(item.points,item,config);
                    // Do not silently accept a changed price with stale snapshots.
                    if(Math.abs(Number(item.totalAmount)-Number(computed.amount))>0.011 ||
                       Math.abs(Number(item.totalPoints)-Number(computed.points))>0.011){
                        errors.push((item.name||"VM Item")+": price/point snapshot differs from active draft rates");
                    }
                } catch(error){errors.push((item.name||"VM Item")+": "+(error.message||error));}
            }
            checks.push(errors.length ?
                wzCheck("error","Financial","Add-on pricing requires attention",
                    errors.slice(0,3).join("; ")+(errors.length>3?"; more items also require review.":""),
                    "Open Step 2, verify the rates and resave the affected VM Items.") :
                wzCheck("passed","Financial","Saved resource pricing is consistent",
                    "Resource Rates and saved currency/point snapshots were recalculated for the selected version."));
            checks.push(config.draft ?
                wzCheck("warning","Contract Configuration","Configuration is Draft",
                    (config.name||"Contract configuration")+" "+(config.version||"")+
                        " is for preparation only. It cannot authorize a final request submission.",
                    "Activate an approved configuration before final submission.") :
                wzCheck("passed","Contract Configuration","Configuration is Active",
                    "The selected effective contract configuration has Active status."));
        }
        const files=await docReadAll(ctx); // A failed read must fail the run; do not report 0 files.
        const allowed=files.every(file=>DOC_EXTENSIONS.has(String(file.Name||"").split(".").pop().toLowerCase()) &&
            Number(file.Size)>0 && Number(file.Size)<=DOC_MAX_BYTES);
        checks.push(allowed ?
            wzCheck("passed","Documents","Uploaded documents verified",
                files.length+" document(s) verified in Creatio; all have allowed names and sizes.") :
            wzCheck("error","Documents","A stored document violates upload rules",
                "Document type must be PDF, DOCX or XLSX and size must be 1–25 MB.",
                "Review the uploaded file list in Step 3."));
        const signedFilename=files.some(f=>/acceptance/i.test(String(f.Name||"")) &&
            /signed|signature/i.test(String(f.Name||"")));
        checks.push(wzCheck("info","Documents",signedFilename ?
            "Possible Signed Acceptance Form attached" : "Signed Acceptance Form has not been identified",
            signedFilename ?
                "A filename suggests the acceptance form is attached. Its contents and signature are not verified automatically." :
                "A Signed Acceptance Form may be required before provisioning.",
            "Upload and verify the signed form if required by the contract."));
        // The ledger has NOT been reconciled with live Available/Consumed/Restored balances.
        // Treat as a transparent warning. Allow review, but no final submit in this build.
        checks.push(wzCheck("warning","Point Ledger","Live point balance is not verified",
            "The current live point balance has not been reconciled with the Point Ledger. No points were deducted.",
            "Complete ledger reconciliation before enabling final submission."));
        return {requestId,checkedAt:new Date().toISOString(),checks,counts:wzCount(checks)};
    }
    function wzButton(label,css,callback){
        const node=vmElement("button",css,label);
        node.type="button";
        node.addEventListener("click",event=>{
            event.preventDefault();event.stopPropagation();
            if(node.disabled){return;}
            Promise.resolve(callback()).catch(error=>{
                console.error("MCIT Step 4 action failed",error);
            });
        });
        return node;
    }
    function wzSyncReviewButton(ctx){
        if(typeof document==="undefined"){return;}
        const data=ctx?.__wzValidationData;
        const canContinue=Boolean(data && !data.loading && data.requestId===vmRequestKey(ctx) &&
            data.counts?.errors===0 && ctx.__wzValidationAcknowledged===true);
        document.querySelectorAll(".usr-wz-validation-actions .usr-wz-live-next").forEach(button=>{
            if(button.disabled===canContinue){button.disabled=!canContinue;}
            button.title=canContinue ? "Continue to the read-only Review step." :
                "Run validation, fix all errors and acknowledge any warnings before review.";
        });
    }
    function docRenderValidation(ctx){
        if(typeof document==="undefined"){return;}
        const host=document.querySelector(".usr-wz-validation-mount");
        if(!host){return;}
        let block=host.querySelector(".usr-wz-validation-dynamic");
        if(!block){block=vmElement("div","usr-wz-validation-dynamic");host.appendChild(block);}
        const data=ctx.__wzValidationData||null;
        const signature=JSON.stringify(data||{status:"ready"});
        if(block.dataset.signature===signature){wzSyncReviewButton(ctx);return;}
        block.dataset.signature=signature;
        block.replaceChildren();
        if(!data || data.loading){
            const ready=vmElement("div","usr-wz-validation-ready");
            const mark=vmElement("div","usr-wz-validation-ready-icon",data?.loading?"◌":"✓");
            ready.append(mark,
                vmElement("b",null,data?.loading?"Running validation...":"Ready to run validation"),
                vmElement("p",null,"Checks request, items, contract balance and documents before submission."));
            const run=wzButton(data?.loading?"Validating...":"↻  Run Validation",
                "usr-wz-validation-run",()=>ctx.executeRequest({type:"usr.WZ_ExecuteValidation",$context:ctx}));
            run.disabled=Boolean(data?.loading);
            ready.appendChild(run);block.appendChild(ready);
            wzSyncReviewButton(ctx);return;
        }
        const {checks,counts}=data;
        const heading=vmElement("div","usr-wz-validation-status-banner "+
            (counts.errors?"usr-wz-v-error":counts.warnings?"usr-wz-v-warning":"usr-wz-v-success"));
        heading.appendChild(vmElement("span","usr-wz-v-banner-icon",counts.errors?"!":counts.warnings?"⚠":"✓"));
        const status=vmElement("div","usr-wz-v-banner-text");
        status.appendChild(vmElement("b",null,counts.errors ? "Validation Completed with Errors" :
            counts.warnings ? "Validation Completed with Warnings" : "Validation Passed"));
        status.appendChild(vmElement("small",null,counts.errors ?
            "Fix the errors before continuing to review." :
            counts.warnings ? "No validation errors — review and acknowledge the warnings before continuing." :
            "Required checks passed. Review the request before final submission."));
        heading.appendChild(status);
        const metrics=vmElement("div","usr-wz-v-banner-metrics");
        for(const [n,title,cls] of [[counts.errors,"Errors","usr-wz-v-num-error"],
             [counts.warnings,"Warnings","usr-wz-v-num-warning"],[counts.passed,"Passed","usr-wz-v-num-pass"]]) {
            const cell=vmElement("div","usr-wz-v-metric "+cls);
            cell.append(vmElement("b",null,String(n)),vmElement("small",null,title));
            metrics.appendChild(cell);
        }
        heading.appendChild(metrics);block.appendChild(heading);
        // Only actionable warnings/errors and document information appear in the list;
        // passed checks remain reflected accurately in the counter.
        for(const item of checks.filter(c=>c.level!=="passed")){
            const css=item.level==="error"?"usr-wz-v-error":item.level==="warning"?"usr-wz-v-warning":"usr-wz-v-info";
            const row=vmElement("div","usr-wz-v-issue "+css);
            row.appendChild(vmElement("div","usr-wz-v-issue-icon",item.level==="info"?"ⓘ":"⚠"));
            const body=vmElement("div","usr-wz-v-issue-body");
            const overline=vmElement("div","usr-wz-v-overline",item.level.toUpperCase()+"  ·  "+item.section);
            const title=vmElement("b",null,item.title);
            const message=vmElement("div","usr-wz-v-description",item.message);
            body.append(overline,title,message);
            if(item.recommendation){body.appendChild(vmElement("small",null,"Recommendation: "+item.recommendation));}
            row.appendChild(body);block.appendChild(row);
        }
        if(!checks.some(c=>c.level!=="passed")){
            block.appendChild(vmElement("div","usr-wz-v-success-note","✓  All checks passed."));
        }
        const ack=vmElement("label","usr-wz-v-acknowledge");
        const input=document.createElement("input");
        input.type="checkbox";
        input.checked=Boolean(ctx.__wzValidationAcknowledged);
        input.addEventListener("change",()=>{
            ctx.__wzValidationAcknowledged=input.checked;
            wzSyncReviewButton(ctx);
        });
        ack.append(input,vmElement("span",null,"I have reviewed and acknowledge the warnings above."));
        block.appendChild(ack);
        block.appendChild(wzButton("↻  Run Again","usr-wz-v-rerun",
            ()=>ctx.executeRequest({type:"usr.WZ_ExecuteValidation",$context:ctx})));
        const caution=vmElement("div","usr-wz-v-final-caution",
            "Review is available after passing validation and acknowledging warnings. Final submission is server-gated: Active contract configuration and verified point ledger are required by the approved submission process.");
        block.appendChild(caution);
        wzSyncReviewButton(ctx);
    }
    // ----- STEP 5: Figma-matched Review & Submit, all values from saved rows -----
    function wzPretty(value, fallback="—") {
        if (value==null || value==="") {return fallback;}
        if (typeof value==="object") {
            const label=value.displayValue||value.Name||value.UsrName;
            return String(label||fallback);
        }
        return String(value);
    }
    function wzDateTime(value) {
        if(!value){return "—";}
        const d=new Date(value);
        return Number.isFinite(d.getTime()) ? d.toLocaleString("en-GB",{
            year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"
        }) : String(value);
    }
    function wzReviewValue(label, value) {
        const group=vmElement("div","usr-wz-review-field");
        group.append(vmElement("small",null,label),vmElement("b",null,wzPretty(value)));
        return group;
    }
    function wzReviewCard(title,subtitle="") {
        const panel=vmElement("section","usr-wz-review-card");
        const head=vmElement("div","usr-wz-review-card-head");
        head.appendChild(vmElement("b",null,title));
        if(subtitle){head.appendChild(vmElement("small",null,subtitle));}
        panel.appendChild(head);
        return panel;
    }
    async function wzLoadReviewData(ctx) {
        const id=vmRequestKey(ctx);
        if(!validGuid(id)){throw new Error("Save the request first.");}
        const record=await readRecord("UsrVMRequest",id,["Id","UsrName","UsrRequestType",
            "UsrContract","UsrAccount","UsrProject","UsrRequestedDeliveryDate",
            "UsrBusinessJustification","UsrStatus","CreatedOn"]);
        if(!record){throw new Error("Saved request not found in Creatio.");}
        const items=await vmLoadSavedItems(ctx,true);
        const files=await docReadAll(ctx);
        const contractId=selectedId(record.UsrContract);
        let contractNumber=wzPretty(record.UsrContract);
        if(validGuid(contractId)){
            const contract=await readRecord("UsrMCITContract",contractId,
                ["Id","UsrNumber","UsrReference","UsrName"]);
            if(contract){contractNumber=String(contract.UsrNumber||contract.UsrReference||contract.UsrName||"—");}
        }
        return {id,record,items,files,contractNumber,readAt:new Date().toISOString()};
    }
    function wzSyncSubmitButton(ctx){
        if(typeof document==="undefined"){return;}
        const valid=Boolean(ctx?.__wzReviewData &&
            ctx.__wzReviewData.id===vmRequestKey(ctx) &&
            ctx.__wzSubmitAcknowledged && !ctx.__wzSubmissionBusy &&
            !ctx.__wzSubmitProcessStarted && ctx.__wzValidationAcknowledged &&
            ctx.__wzValidationData?.counts?.errors===0);
        for(const button of document.querySelectorAll(".usr-wz-review-actions .usr-wz-live-next")){
            if(button.disabled!==!valid){button.disabled=!valid;}
            button.title=valid?"Submit through the approved Creatio process" :
                "Review the request and select Submission Acknowledgement first.";
        }
    }
    function docRenderReview(ctx){
        if(typeof document==="undefined"){return;}
        const host=document.querySelector(".usr-wz-review-mount");
        if(!host){return;}
        let block=host.querySelector(".usr-wz-review-dynamic");
        if(!block){block=vmElement("div","usr-wz-review-dynamic");host.appendChild(block);}
        const payload=ctx.__wzReviewData;
        const signature=JSON.stringify({id:vmRequestKey(ctx),ready:!!payload,
            readAt:payload?.readAt||"",ack:!!ctx.__wzSubmitAcknowledged,
            error:ctx.__wzReviewError||"",busy:!!ctx.__wzSubmissionBusy});
        if(block.dataset.signature===signature){wzSyncSubmitButton(ctx);return;}
        block.dataset.signature=signature;block.replaceChildren();
        if(!payload || payload.id!==vmRequestKey(ctx)){
            block.appendChild(vmElement("p","usr-wz-review-loading",
                ctx.__wzReviewError||"Loading the saved request, VM Items and documents..."));
            wzSyncSubmitButton(ctx);return;
        }
        const {record,items,files,contractNumber}=payload;
        const request=wzReviewCard("Request Information","Read-only summary");
        const fields=vmElement("div","usr-wz-review-request-grid");
        fields.append(
            wzReviewValue("Request Type",wzPretty(record.UsrRequestType)),
            wzReviewValue("Contract",contractNumber),
            wzReviewValue("Authority",wzPretty(record.UsrAccount)),
            wzReviewValue("Project",wzPretty(record.UsrProject)),
            wzReviewValue("Title",wzPretty(record.UsrName)),
            wzReviewValue("Delivery Date",formatDate(record.UsrRequestedDeliveryDate)),
            wzReviewValue("Business Justification",wzPretty(record.UsrBusinessJustification)));
        request.appendChild(fields);block.appendChild(request);
        const itemsCard=wzReviewCard("VM Items ("+items.length+")");
        const rows=vmElement("div","usr-wz-review-vm-items");
        let totalPoints=0;
        for(const [index,item] of items.entries()){
            const row=vmElement("div","usr-wz-review-vm-row");
            const badge=vmElement("span","usr-wz-review-vm-badge",String(index+1));
            const text=vmElement("div","usr-wz-review-vm-copy");
            const env=vmGetOptionName("environments",item.environment)||"Environment unverified";
            const os=vmGetOptionName("operatingSystems",item.operatingSystem)||"OS unverified";
            text.appendChild(vmElement("b",null,item.name||"VM Item"));
            text.appendChild(vmElement("small",null,os+" · "+env+" · "+
                vmFormat(item.cpu)+" vCPU / "+vmFormat(item.ram)+" GB RAM / "+
                vmFormat(item.storage)+" GB"));
            const amount=Number(item.totalPoints || item.points || 0);
            totalPoints+=amount;
            row.append(badge,text,vmElement("strong","usr-wz-review-item-points",vmFormat(amount)+" pts"));
            rows.appendChild(row);
        }
        if(!items.length){rows.appendChild(vmElement("div","usr-wz-review-empty","No VM Items saved"));}
        itemsCard.appendChild(rows);
        const pointWrap=vmElement("div","usr-wz-review-points-wrap");
        const pointBox=vmElement("div","usr-wz-review-points");
        pointBox.appendChild(vmElement("b",null,"Points · النقاط"));
        for(const [label,value,css] of [
            ["Total",vmFormat(totalPoints)+" pts",""],
            ["Planned available usage (not deducted)",vmFormat(totalPoints)+" pts","usr-wz-review-green"]]){
            const line=vmElement("div","usr-wz-review-point-row");
            line.append(vmElement("span",null,label),vmElement("strong",css,value));pointBox.appendChild(line);
        }
        pointWrap.appendChild(pointBox);
        itemsCard.appendChild(pointWrap);block.appendChild(itemsCard);
        const docs=wzReviewCard("Documents ("+files.length+")");
        const docBody=vmElement("div","usr-wz-review-doc-list");
        if(!files.length){docBody.appendChild(vmElement("span","usr-wz-review-empty","No documents uploaded"));}
        for(const file of files){
            const link=vmElement("a","usr-wz-review-doc-link",file.Name||"Document");
            link.href=docFileUrl(file.Id);link.target="_blank";link.rel="noopener noreferrer";
            docBody.appendChild(link);
        }
        docs.appendChild(docBody);block.appendChild(docs);
        const ack=vmElement("label","usr-wz-submit-ack");
        const input=vmElement("input");input.type="checkbox";
        input.checked=!!ctx.__wzSubmitAcknowledged;
        input.disabled=!!ctx.__wzSubmissionBusy || !!ctx.__wzSubmitProcessStarted;
        input.addEventListener("change",()=>{
            ctx.__wzSubmitAcknowledged=input.checked;
            wzSyncSubmitButton(ctx);
        });
        const msg=vmElement("div","usr-wz-submit-ack-copy");
        msg.appendChild(vmElement("b",null,"Submission Acknowledgement"));
        msg.appendChild(vmElement("small",null,
            "I confirm that the information provided is accurate and complete. I understand this request will be submitted to Telecom Egypt for review. I have the authority to submit on behalf of "+
            wzPretty(record.UsrAccount,"the selected authority")+"."));
        ack.append(input,msg);block.appendChild(ack);
        const warning=vmElement("div","usr-wz-review-backend-note",
            WZ_ALLOW_TEST_SIGNAL_SUBMIT_WITHOUT_LEDGER ?
                "TEST ENVIRONMENT ONLY: Submit changes the real request status to Submitted and triggers the configured Object Signal. Point Ledger balance/consumption and process tasks are NOT verified here. Do not use this test handoff for production." :
                "Production submission requires a server-side approved workflow that verifies the Active contract configuration, live Point Ledger, required documents and user permissions.");
        block.appendChild(warning);
        if(ctx.__wzReviewError){block.appendChild(vmElement("div","usr-wz-review-inline-error",ctx.__wzReviewError));}
        wzSyncSubmitButton(ctx);
    }
    async function wzOpenRequestDetail(ctx){
        const id=ctx?.__wzSubmitted?.recordId;
        if(!validGuid(id)){throw new Error("No verified submitted Request ID is available.");}
        // Native Freedom UI navigation preserves the record ID for the actual Detail page.
        await ctx.executeRequest({type:"crt.OpenPageRequest",$context:ctx,
            schemaName:"UsrMCITRequestDetail_Page",
            modelInitConfigs:[{action:"edit",recordId:id}]});
    }
    function docRenderSuccess(ctx){
        if(typeof document==="undefined"){return;}
        const root=document.querySelector(".usr-wz-root");
        if(root){root.classList.toggle("usr-wz-submitted-screen",!!ctx?.__wzSubmitted);}
        const mount=document.querySelector(".usr-wz-success-mount");
        if(!mount){return;}
        let block=mount.querySelector(".usr-wz-success-content");
        if(!block){block=vmElement("div","usr-wz-success-content");mount.appendChild(block);}
        const submitted=ctx.__wzSubmitted;
        if(!submitted){block.replaceChildren();return;}
        if(block.dataset.recordId===submitted.recordId){return;}
        block.dataset.recordId=submitted.recordId;block.replaceChildren();
        block.appendChild(vmElement("div","usr-wz-success-icon","✓"));
        block.appendChild(vmElement("h2",null,"Request Submitted Successfully"));
        block.appendChild(vmElement("p",null,"The saved request status was verified in Creatio. The Object Signal should start Technical Review; confirm the process instance and assigned task in Process Log. Point Ledger was not posted by this page."));
        const table=vmElement("div","usr-wz-success-meta");
        for(const [label,value,cls] of [
            ["Creatio Record ID",submitted.recordId,"usr-wz-success-id"],
            ["Status verified at",wzDateTime(submitted.submittedAt),""],
            ["Status",submitted.status,""],
            ["Current Stage",submitted.status==="Under TE Review"?
                "Technical Review (status confirmed)":"Awaiting process confirmation",""],
            ["Expected SLA","Not confirmed",""],
        ]){
            const row=vmElement("div","usr-wz-success-meta-row");
            row.append(vmElement("span",null,label),vmElement("b",cls,value));table.appendChild(row);
        }
        block.appendChild(table);
        const buttons=vmElement("div","usr-wz-success-actions");
        buttons.appendChild(wzButton("Return to My Requests","usr-wz-success-return",()=>{
            // Known MCIT My Requests section code; native Shell hash navigation.
            location.hash="/Section/UsrMyRequests_ListPage";
        }));
        buttons.appendChild(wzButton("View Request","usr-wz-success-view",()=>wzOpenRequestDetail(ctx)));
        block.appendChild(buttons);
    }
    async function wzExecuteSubmission(ctx){
        const id=vmRequestKey(ctx);
        if(!validGuid(id)){throw new Error("No saved Request ID is available.");}
        if(wzSubmitInFlight.has(ctx) || ctx.__wzSubmitProcessStarted){
            throw new Error("Submission already started. Check the request status in My Requests before retrying.");
        }
        if(!ctx.__wzSubmitAcknowledged){throw new Error("Select Submission Acknowledgement.");}
        const prior=ctx.__wzValidationData;
        if(!prior || prior.counts?.errors!==0 || !ctx.__wzValidationAcknowledged){
            throw new Error("Run Validation and acknowledge its results before submitting.");
        }
        wzSubmitInFlight.add(ctx);ctx.__wzSubmissionBusy=true;
        try{
            // Fresh database verification; never submit based on a stale validation.
            const current=await docRunValidation(ctx);
            if(current.counts.errors){
                ctx.__wzValidationData=current;ctx.__wzValidationAcknowledged=false;
                throw new Error("Request changed or failed validation. Return to Step 4 and run it again.");
            }
            const sig=x=>JSON.stringify(x.checks.map(c=>[c.level,c.section,c.title,c.message]));
            if(sig(current)!==sig(prior)){
                ctx.__wzValidationData=current;ctx.__wzValidationAcknowledged=false;
                throw new Error("Request data changed after validation. Revalidate and acknowledge the results.");
            }
            const config=await vmLoadContractConfig(ctx,true);
            if(config.draft){
                throw new Error("The selected Contract Configuration is Draft. Activate the approved version before Final Submit.");
            }
            if(!WZ_ALLOW_TEST_SIGNAL_SUBMIT_WITHOUT_LEDGER){
                throw new Error("Production submission is blocked until server-side Point Ledger, documents and authorization checks are implemented. Test Signal mode is disabled.");
            }
            // Check the exact stored lookup record, not a display label from the UI.
            const saved=await readRecord("UsrVMRequest",id,["Id","UsrStatus"]);
            if(!saved){throw new Error("Saved request is no longer available.");}
            const draft=await wzFindStatusByName("Draft");
            const submitted=await wzFindStatusByName("Submitted");
            if(String(selectedId(saved.UsrStatus)||"").toLowerCase()!==draft.value.toLowerCase()){
                throw new Error("Request is no longer Draft ("+wzPretty(saved.UsrStatus)+"). Refresh My Requests before another submission attempt.");
            }
            // The process Start Signal watches UsrVMRequest.UsrStatus. Do ONE real
            // status update; do not invoke the process directly as a second trigger.
            const requestModel=await sdk.Model.create("UsrVMRequest");
            const update=await requestModel.update({UsrStatus:submitted.value},[
                {type:sdk.ModelParameterType.PrimaryColumnValue,value:id}
            ]);
            // A transport/timeout ambiguity must NOT lead to a retry that triggers
            // a duplicate workflow. Always check the persisted status after write.
            ctx.__wzSubmitProcessStarted=true;
            let verified=null;
            for(let n=0;n<8;n++){
                const record=await readRecord("UsrVMRequest",id,["Id","UsrStatus"]);
                const status=wzPretty(record?.UsrStatus,"").trim();
                const statusId=String(selectedId(record?.UsrStatus)||"").toLowerCase();
                // Under TE Review may already have been set by the asynchronous process.
                if(record && (statusId===submitted.value.toLowerCase() ||
                    status.toLowerCase()==="under te review")){
                    verified={recordId:id,status,submittedAt:new Date().toISOString()};
                    break;
                }
                if(n<7){await new Promise(done=>setTimeout(done,500));}
            }
            if(!verified){
                const detail=(update===false || update?.success===false || update?.rowsAffected===0) ?
                    "The status update was not confirmed." :
                    "The saved record did not reach Submitted/Under TE Review in the verification window.";
                throw new Error(detail+" Check the real request status and Process Log before retrying. Do NOT resubmit blindly.");
            }
            // Update the page view model so a later native save cannot accidentally
            // restore the stale Draft lookup; no further draft save is performed here.
            ctx.WZ_Status={value:submitted.value,displayValue:"Submitted"};
            ctx.__wzSubmitted=verified;
            ctx.WZ_StepOne=false;ctx.WZ_StepTwo=false;ctx.WZ_StepThree=false;
            ctx.WZ_StepFour=false;ctx.WZ_StepFive=false;ctx.WZ_Success=true;
            ctx.WZ_ShowWizardHeader=false;
            docShowStep(ctx,6);docRenderSuccess(ctx);
            return true;
        }finally{
            ctx.__wzSubmissionBusy=false;wzSubmitInFlight.delete(ctx);
            wzSyncSubmitButton(ctx);
        }
    }

    function mountWizardStyling(ctx) {
        if (typeof document === "undefined") {return;}
        vmAddStyles();
        // Keep the active instance when Creatio reopens the page in the same SPA document.
        document.__usrMCITWizardActiveContext = ctx;
        if(!document.getElementById("usr-wz-doc-step3-css")) {
            const el=document.createElement("style");el.id="usr-wz-doc-step3-css";
            el.textContent=`
                .usr-wz-doc-shell{overflow:visible!important;padding:0!important;gap:0!important;}
                .usr-wz-doc-head{padding:16px 18px!important;border-bottom:1px solid #edf0f4!important;
                    color:#13243d!important;font:700 13px Inter,Arial,sans-serif!important;}
                .usr-wz-documents-mount{display:block!important;width:100%!important;padding:18px!important;box-sizing:border-box!important;}
                .usr-wz-docs-dynamic{width:100%;box-sizing:border-box;}
                .usr-wz-doc-drop{border:1.5px dashed #dbe1ea;background:#fcfcfe;border-radius:12px;
                    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;
                    height:140px;box-sizing:border-box;cursor:pointer;color:#264060;outline:none;}
                .usr-wz-doc-drop:hover,.usr-wz-doc-drop:focus-visible,.usr-wz-doc-dragging{
                    background:#f7f2ff;border-color:#9250ee;}
                .usr-wz-doc-busy{opacity:.6;pointer-events:none;}
                .usr-wz-doc-upload-icon{font-size:26px;color:#b1bed0;height:29px;line-height:28px;}
                .usr-wz-doc-prompt{font:600 12px Inter,Arial,sans-serif;}
                .usr-wz-doc-prompt button{border:0;background:transparent;color:#651bd2;font:inherit;padding:0;
                    cursor:pointer;text-decoration:underline;}
                .usr-wz-doc-drop small{color:#9aa5bf;font-size:11px;}
                .usr-wz-doc-alert{background:#edf5ff;border:1px solid #c1dafe;color:#2760c8;border-radius:9px;
                    padding:12px;margin-top:17px;font:500 12px/1.6 Inter,Arial,sans-serif;}
                .usr-wz-doc-status{padding:12px;color:#7742bc;font:600 12px Inter,Arial,sans-serif;}
                .usr-wz-doc-list{margin-top:15px;min-height:65px;}
                .usr-wz-doc-empty{display:flex;justify-content:center;align-items:center;min-height:65px;
                    color:#a1acc1;font:500 12px Inter,Arial,sans-serif;}
                .usr-wz-doc-row{display:flex;gap:10px;align-items:center;padding:11px 12px;
                    border:1px solid #e5e8ef;border-radius:9px;margin:8px 0;}
                .usr-wz-doc-file-icon{color:#6b25c2;font-size:22px;}
                .usr-wz-doc-file-info{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px;}
                .usr-wz-doc-file-info a{font-size:12px;color:#263a5c;overflow-wrap:anywhere;text-decoration:none;font-weight:600;}
                .usr-wz-doc-file-info a:hover{text-decoration:underline;color:#681bd9;}
                .usr-wz-doc-file-info small{color:#8390a6;font-size:10px;}
                .usr-wz-doc-remove{border:1px solid #e2dcf1;background:white;color:#6735a5;border-radius:8px;
                    padding:7px 10px;cursor:pointer;font-size:11px;}
                .usr-wz-validation-result{display:flex;align-items:start;gap:11px;padding:13px;
                    margin-bottom:8px;border:1px solid #e5e8ef;border-radius:10px;}
                .usr-wz-validation-result strong{border:1px solid currentColor;border-radius:50%;width:22px;
                    height:22px;display:flex;align-items:center;justify-content:center;}
                .usr-wz-result-good{color:#14a25b;}.usr-wz-result-warn{color:#d97706;}
                .usr-wz-validation-result b{display:block;color:#213454;font-size:13px;}
                .usr-wz-validation-result small{display:block;color:#7c8ca4;margin-top:3px;font-size:11px;}
                .usr-wz-doc-caution{background:#fff5eb;padding:12px;color:#9a5519;border-radius:9px;font-size:11px;line-height:1.5;}
                .usr-wz-doc-actions{margin-top:1px!important;}
                /* Step 4 — Figma-aligned ready/results states; scoped to Wizard. */
                .usr-wz-validation-mount{padding:18px!important;}
                .usr-wz-validation-dynamic{width:100%;font:500 12px/1.55 Inter,Arial,sans-serif;color:#1a2b47;}
                .usr-wz-validation-ready{height:250px;display:flex;align-items:center;justify-content:center;
                    flex-direction:column;gap:12px;text-align:center;box-sizing:border-box;}
                .usr-wz-validation-ready-icon{width:50px;height:50px;display:flex;align-items:center;
                    justify-content:center;border-radius:13px;background:#f2ecfb;color:#7924e8;font-size:29px;}
                .usr-wz-validation-ready b{font-size:13px;color:#172c4b;}
                .usr-wz-validation-ready p{margin:0;color:#97a2b8;font-size:11px;}
                .usr-wz-validation-run{background:#641ed3;color:#fff;border:0;border-radius:9px;
                    font:700 12px Inter,Arial,sans-serif;padding:10px 18px;cursor:pointer;}
                .usr-wz-validation-run:disabled{opacity:.6;cursor:wait;}
                .usr-wz-validation-status-banner{display:flex;align-items:center;gap:15px;padding:14px 17px;
                    border:1px solid;border-radius:11px;margin-bottom:16px;min-height:66px;box-sizing:border-box;}
                .usr-wz-v-warning{background:#fff9e7;border-color:#ffd269;color:#a94d0b;}
                .usr-wz-v-error{background:#fff3f3;border-color:#fbb8bf;color:#a02028;}
                .usr-wz-v-success{background:#f0faf5;border-color:#bde9d0;color:#167444;}
                .usr-wz-v-info{background:#eef5ff;border-color:#bbd9ff;color:#225cd1;}
                .usr-wz-v-banner-icon{font-size:23px;flex:none;}
                .usr-wz-v-banner-text{display:flex;flex-direction:column;gap:3px;min-width:0;flex:1;}
                .usr-wz-v-banner-text b{font-size:13px;}.usr-wz-v-banner-text small{font-size:11px;}
                .usr-wz-v-banner-metrics{display:flex;gap:20px;align-items:center;margin-left:auto;}
                .usr-wz-v-metric{text-align:center;min-width:45px;display:flex;flex-direction:column;gap:1px;}
                .usr-wz-v-metric b{font-size:17px;}.usr-wz-v-metric small{font-size:10px;color:#7e8aa2;}
                .usr-wz-v-num-error b{color:#f02c43;}.usr-wz-v-num-warning b{color:#f39a00;}
                .usr-wz-v-num-pass b{color:#0a9a55;}
                .usr-wz-v-issue{border:1px solid;border-radius:12px;display:flex;align-items:flex-start;gap:12px;
                    padding:14px 15px;margin-bottom:10px;}
                .usr-wz-v-issue-icon{font-size:18px;line-height:1.2;flex:none;}
                .usr-wz-v-issue-body{display:flex;flex-direction:column;gap:3px;min-width:0;}
                .usr-wz-v-overline{font-size:10px;font-weight:700;letter-spacing:.02em;}
                .usr-wz-v-issue-body b{font-size:12px;}.usr-wz-v-description{font-size:11px;}
                .usr-wz-v-issue-body small{font-size:10px;opacity:.86;}
                .usr-wz-v-success-note{padding:17px;border-radius:10px;background:#f0faf5;color:#167444;}
                .usr-wz-v-acknowledge{display:flex;align-items:center;gap:10px;padding:12px;
                    border-radius:10px;background:#f8f7fc;margin:16px 0;color:#233651;
                    font:500 12px Inter,Arial,sans-serif;cursor:pointer;}
                .usr-wz-v-acknowledge input{width:16px;height:16px;accent-color:#681dc9;flex:none;cursor:pointer;}
                .usr-wz-v-rerun{display:block;width:100%;border:1px solid #e5e9f1;border-radius:9px;
                    color:#253653;background:#fff;padding:9px 11px;text-align:left;
                    font:600 11px Inter,Arial,sans-serif;cursor:pointer;}
                .usr-wz-v-final-caution{margin-top:12px;color:#7b6c96;background:#f5f0fc;
                    border-radius:8px;padding:11px;font:500 11px/1.6 Inter,Arial,sans-serif;}
                .usr-wz-validation-actions .usr-wz-live-next:disabled,.usr-wz-review-actions .usr-wz-live-next:disabled{
                    background:#af8de7!important;border-color:#af8de7!important;cursor:not-allowed!important;opacity:1!important;}
                /* STEP 5 - native designer containers plus scoped Figma UI */
                .usr-wz-review-shell{background:transparent!important;border:0!important;
                    box-shadow:none!important;padding:0!important;overflow:visible!important;}
                .usr-wz-review-mount{padding:0!important;background:transparent!important;}
                .usr-wz-review-dynamic{display:flex;flex-direction:column;gap:18px;}
                .usr-wz-review-card{border:1px solid #e0e4ed;border-radius:14px;
                    background:#fff;overflow:hidden;box-sizing:border-box;width:100%;}
                .usr-wz-review-card-head{min-height:50px;padding:14px 19px;
                    display:flex;flex-direction:column;gap:3px;border-bottom:1px solid #e9ecf2;
                    color:#152440;font:700 13px Inter,Arial,sans-serif;box-sizing:border-box;}
                .usr-wz-review-card-head small{font:500 11px Inter,Arial,sans-serif;color:#8190aa;}
                .usr-wz-review-request-grid{padding:18px 19px 22px;display:grid;
                    grid-template-columns:repeat(3,minmax(0,1fr));gap:20px 26px;}
                .usr-wz-review-field{min-width:0;display:flex;flex-direction:column;gap:4px;}
                .usr-wz-review-field small{font-size:11px;color:#76859c;}
                .usr-wz-review-field b{font-size:12px;line-height:1.45;color:#0f2444;
                    font-weight:650;overflow-wrap:anywhere;}
                .usr-wz-review-vm-items{padding:12px 19px 0;}
                .usr-wz-review-vm-row{display:flex;align-items:center;gap:14px;
                    padding:13px 0;border-bottom:1px solid #e8ebf1;}
                .usr-wz-review-vm-badge{display:flex;align-items:center;justify-content:center;
                    width:24px;height:24px;border-radius:50%;background:#5c20b2;color:#fff;
                    font:700 12px Inter,Arial,sans-serif;flex:none;}
                .usr-wz-review-vm-copy{min-width:0;flex:1;display:flex;flex-direction:column;gap:3px;}
                .usr-wz-review-vm-copy b{font-size:12px;color:#182d4d;}
                .usr-wz-review-vm-copy small{font-size:11px;color:#8695aa;}
                .usr-wz-review-item-points{color:#6018c6;white-space:nowrap;font-size:12px;}
                .usr-wz-review-points-wrap{padding:15px 19px 20px;}
                .usr-wz-review-points{background:#f8f7fe;border-radius:12px;
                    padding:13px 15px;max-width:560px;box-sizing:border-box;}
                .usr-wz-review-points>b{display:block;color:#67758d;font-size:11px;margin-bottom:9px;}
                .usr-wz-review-point-row{display:flex;gap:16px;justify-content:space-between;
                    padding:3px 0;color:#65748c;font-size:12px;}
                .usr-wz-review-point-row strong{color:#641acf;white-space:nowrap;}
                .usr-wz-review-point-row .usr-wz-review-green{color:#0d994f;}
                .usr-wz-review-doc-list{padding:19px;min-height:40px;display:flex;
                    gap:8px;flex-wrap:wrap;align-items:center;}
                .usr-wz-review-empty{color:#9ba6bb;font-size:12px;}
                .usr-wz-review-doc-link{color:#641ed3;font-size:12px;text-decoration:underline;}
                .usr-wz-submit-ack{background:#f8f7fc;border:1px solid #e2e3eb;
                    border-radius:13px;padding:14px 16px;display:flex;align-items:flex-start;
                    gap:12px;cursor:pointer;}
                .usr-wz-submit-ack input{margin:2px 0 0;width:16px;height:16px;
                    accent-color:#641ed3;cursor:pointer;flex:none;}
                .usr-wz-submit-ack-copy{display:flex;flex-direction:column;gap:5px;}
                .usr-wz-submit-ack-copy b{font-size:12px;color:#182d4d;}
                .usr-wz-submit-ack-copy small{font-size:11px;color:#8795ac;line-height:1.5;}
                .usr-wz-review-backend-note{font-size:11px;color:#67538d;
                    padding:10px 12px;border-radius:8px;background:#f6f1fd;}
                .usr-wz-review-inline-error{color:#b4242c;font-weight:600;font-size:12px;
                    border:1px solid #f0bfc1;background:#fff5f5;border-radius:8px;padding:11px;}
                .usr-wz-review-loading{padding:22px;background:#fff;border:1px solid #dce1ec;
                    border-radius:12px;color:#64748b;}
                /* On verified submission, remove the wizard chrome, including
                   elements whose designer visibility is managed asynchronously. */
                .usr-wz-submitted-screen .usr-wz-steps-card,
                .usr-wz-submitted-screen .usr-wz-actions,
                .usr-wz-submitted-screen .usr-wz-vm-stage,
                .usr-wz-submitted-screen .usr-wz-doc-shell,
                .usr-wz-submitted-screen .usr-wz-title,
                .usr-wz-submitted-screen .usr-wz-subtitle{display:none!important;}
                .usr-wz-submitted-screen .usr-wz-success-panel{display:flex!important;}
                .usr-wz-success-panel{border:0!important;background:transparent!important;
                    box-shadow:none!important;min-height:580px;padding:40px 10px!important;}
                .usr-wz-success-content{display:flex;flex-direction:column;align-items:center;
                    gap:16px;margin:auto;max-width:620px;text-align:center;
                    color:#112340;font:500 12px/1.5 Inter,Arial,sans-serif;}
                .usr-wz-success-icon{width:70px;height:70px;border-radius:50%;
                    background:#eafbf2;color:#159c58;display:flex;align-items:center;
                    justify-content:center;font-size:39px;}
                .usr-wz-success-content h2{font-size:21px;font-weight:750;margin:3px 0 0;}
                .usr-wz-success-content>p{margin:0;color:#71829b;font-size:13px;}
                .usr-wz-success-meta{border:1px solid #e3e8ef;background:#fff;
                    border-radius:14px;padding:17px 20px;display:flex;flex-direction:column;
                    gap:13px;width:min(100%,520px);box-sizing:border-box;text-align:left;}
                .usr-wz-success-meta-row{display:flex;align-items:flex-start;justify-content:space-between;
                    gap:14px;font-size:12px;}
                .usr-wz-success-meta-row span{color:#7888a3;}
                .usr-wz-success-meta-row b{font-weight:700;text-align:right;overflow-wrap:anywhere;}
                .usr-wz-success-meta-row .usr-wz-success-id{color:#681cd9;font-family:monospace;}
                .usr-wz-success-actions{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;}
                .usr-wz-success-actions button{border-radius:9px;border:1px solid #e1e5ee;
                    background:#fff;color:#1e3352;padding:11px 17px;font:700 12px Inter,Arial,sans-serif;cursor:pointer;}
                .usr-wz-success-actions .usr-wz-success-view{color:#fff;background:#641ed3;
                    border-color:#641ed3;}
                @media(max-width:680px){.usr-wz-review-request-grid{
                    grid-template-columns:repeat(2,minmax(0,1fr));}}
                @media(max-width:420px){.usr-wz-review-request-grid{grid-template-columns:1fr;}
                    .usr-wz-review-vm-row{gap:8px;}.usr-wz-success-meta-row{flex-direction:column;gap:3px;}}
                .usr-wz-review-dynamic{font:500 12px/1.55 Inter,Arial,sans-serif;}
                .usr-wz-review-title{font-size:15px;color:#172c4b;}.usr-wz-review-list{margin-top:16px;}
                .usr-wz-review-row{display:flex;align-items:center;justify-content:space-between;gap:12px;
                    padding:12px 10px;border-bottom:1px solid #e8e8f1;}
                .usr-wz-review-row span{color:#67758d;font-size:11px;}
                @media(max-width:670px){.usr-wz-validation-status-banner{flex-wrap:wrap;}
                    .usr-wz-v-banner-metrics{width:100%;justify-content:space-around;margin:0;}
                    .usr-wz-review-row{flex-direction:column;align-items:flex-start;}}
                @media(max-width:650px){.usr-wz-documents-mount{padding:12px!important;}}
            `;
            document.head.appendChild(el);
        }
        const styleId="usr-mcit-wz-stepper-v5-myrequests-buttons";
        if (!document.getElementById(styleId)) {
            const tag=document.createElement("style");tag.id=styleId;
            tag.textContent=`
                .usr-wz-root{max-width:1180px!important;width:min(100%,1180px)!important;margin:0 auto!important;
                    box-sizing:border-box!important;padding:22px 16px 30px!important;gap:16px!important;}
                .usr-wz-title{color:#10243e!important;font-size:21px!important;font-weight:750!important;}
                .usr-wz-subtitle{color:#72809a!important;margin-top:-7px!important;}
                .usr-wz-steps-card{display:flex!important;position:relative!important;box-sizing:border-box!important;
                    background:#fff!important;border:1px solid #e2e5ee!important;border-radius:15px!important;
                    min-height:100px!important;padding:18px 22px!important;gap:0!important;align-items:center!important;}
                .usr-wz-steps-card crt-label{display:none!important;}
                .usr-wz-live-steps{width:100%;display:flex;align-items:flex-start;justify-content:space-between;
                    gap:8px;font:600 12px/1.35 Inter,Arial,sans-serif;}
                .usr-wz-live-step{flex:1;min-width:0;position:relative;text-align:center;color:#9aa6ba;}
                .usr-wz-live-step:not(:last-child)::after{content:"";position:absolute;top:15px;
                    left:calc(50% + 25px);width:calc(100% - 50px);height:2px;background:#e0e4ea;}
                .usr-wz-live-step.done:not(:last-child)::after{background:#6420c8;}
                .usr-wz-step-circle{display:flex;align-items:center;justify-content:center;width:31px;height:31px;
                    margin:0 auto 7px;background:#f4f5f8;color:#9aa6ba;border:1px solid #e0e4ea;
                    border-radius:50%;font-size:13px;}
                .usr-wz-live-step.active{color:#5c1cb0;}
                .usr-wz-live-step.active .usr-wz-step-circle{color:#5c1cb0;background:#fff;border:2px solid #6523c3;}
                .usr-wz-live-step.done{color:#5c1cb0;}
                .usr-wz-live-step.done .usr-wz-step-circle{background:#6523c3;border-color:#6523c3;color:white;}
                .usr-wz-step-name{max-width:115px;margin:0 auto;overflow-wrap:normal;}
                /* Editable, Designer-native required labels and inline error components. */
                .usr-wz-validation-wrap{width:100%!important;min-width:0!important;gap:3px!important;}
                .usr-wz-caption-row{display:flex!important;align-items:center!important;
                    justify-content:flex-start!important;gap:2px!important;min-height:18px!important;}
                .usr-wz-caption-text{color:#152e50!important;font-size:12px!important;font-weight:650!important;}
                .usr-wz-required-star{color:#ef4444!important;font-size:13px!important;font-weight:700!important;}
                .usr-wz-validation-error{color:#ef4444!important;font-size:11px!important;
                    line-height:1.35!important;margin-top:1px!important;}
                .usr-wz-validation-wrap .usr-wz-field-control{width:100%!important;max-width:100%!important;}
                .usr-wz-validation-wrap.usr-wz-invalid .usr-wz-field-control{
                    outline:1px solid #fb7078!important;outline-offset:-1px!important;
                    border-radius:10px!important;
                }
                /* Figma Contract Summary – lavender, outlined and scoped only to this panel. */
                .usr-wz-contract-summary{
                    background:#f1edfb!important;border:1px solid #c9b0ff!important;
                    border-radius:15px!important;overflow:hidden!important;
                    --crt-color-background-container:#f1edfb!important;
                }
                .usr-wz-contract-summary::part(container),
                .usr-wz-contract-summary::part(content),
                .usr-wz-contract-summary::part(header){background:#f1edfb!important;}
                .usr-wz-contract-summary .usr-wz-contract-inside,
                .usr-wz-contract-summary crt-flex-container,
                .usr-wz-contract-summary crt-grid-container{background:transparent!important;}
                .usr-wz-contract-summary crt-label{color:#392071!important;}
                .usr-wz-contract-summary [class*="title"]{color:#6121bb!important;font-weight:700!important;}
                .usr-wz-panel{border-radius:14px!important;border:1px solid #e2e5ed!important;
                    overflow:clip!important;background:#fff!important;}
                /* Figma-style footer buttons; CSS is scoped to this Wizard only. */
                .usr-wz-actions{width:100%!important;display:flex!important;align-items:center!important;
                    justify-content:flex-end!important;flex-wrap:wrap!important;gap:8px!important;
                    padding:7px 0 4px!important;box-sizing:border-box!important;}
                .usr-wz-btn-cancel{margin-right:auto!important;}
                .usr-wz-btn-cancel::part(button),.usr-wz-btn-cancel button,
                .usr-wz-btn-cancel .mat-mdc-button{background:transparent!important;border:0!important;
                    box-shadow:none!important;color:#64748b!important;font-weight:500!important;
                    min-height:38px!important;padding:0 10px!important;}
                .usr-wz-btn-draft::part(button),.usr-wz-btn-draft button,
                .usr-wz-btn-draft .mat-mdc-button{background:#fff!important;border:1px solid #dfe3ee!important;
                    color:#142c4d!important;border-radius:10px!important;min-height:38px!important;
                    padding:0 16px!important;box-shadow:none!important;font-weight:600!important;
                    text-transform:none!important;}
                .usr-wz-btn-next::part(button),.usr-wz-btn-next button,
                .usr-wz-btn-next .mat-mdc-button{background:#651dd1!important;
                    background-color:#651dd1!important;border:1px solid #651dd1!important;
                    color:#fff!important;border-radius:10px!important;min-height:38px!important;
                    padding:0 17px!important;box-shadow:none!important;font-weight:700!important;
                    text-transform:none!important;}
                .usr-wz-btn-next:hover::part(button),.usr-wz-btn-next:hover button,
                .usr-wz-btn-next:hover .mat-mdc-button{background:#5513b5!important;
                    background-color:#5513b5!important;border-color:#5513b5!important;}
                .usr-wz-btn-draft:hover::part(button),.usr-wz-btn-draft:hover button,
                .usr-wz-btn-draft:hover .mat-mdc-button{background:#f8f6fc!important;}
                /* Exact visual treatment used by the live toolbar in My Requests. */
                .usr-wz-actions.usr-wz-buttons-live-ready > :not(.usr-wz-live-toolbar){display:none!important;}
                .usr-wz-actions .usr-wz-live-toolbar,.usr-wz-doc-actions .usr-wz-live-toolbar{display:flex!important;width:100%!important;
                    justify-content:flex-end!important;align-items:center!important;gap:9px!important;flex-wrap:wrap!important;}
                .usr-wz-live-toolbar button{box-sizing:border-box!important;height:35px!important;min-height:35px!important;
                    padding:0 15px!important;border-radius:10px!important;cursor:pointer!important;
                    font:600 12px Inter,Arial,sans-serif!important;white-space:nowrap!important;
                    box-shadow:none!important;line-height:1!important;transition:filter .13s ease!important;
                    display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;}
                .usr-wz-live-toolbar button:hover:not(:disabled){filter:brightness(.96)!important;}
                .usr-wz-live-toolbar button:focus-visible{outline:2px solid #9e6efa!important;outline-offset:2px!important;}
                .usr-wz-live-toolbar button:disabled{opacity:.65!important;cursor:wait!important;}
                .usr-wz-live-cancel{margin-right:auto!important;padding:0 5px!important;
                    background:transparent!important;border:0!important;color:#20304b!important;}
                .usr-wz-live-draft{background:#fff!important;color:#20304b!important;border:1px solid #e1e3ea!important;}
                .usr-wz-live-next{background:#6318d9!important;color:#fff!important;border:1px solid #6318d9!important;}
                .usr-wz-vm-actions .usr-wz-live-next:disabled{background:#b396ea!important;
                    border-color:#b396ea!important;color:#fff!important;opacity:1!important;}
                .usr-wz-live-draft svg{width:14px!important;height:14px!important;stroke:currentColor!important;flex:none!important;}
                @media(max-width:500px){.usr-wz-live-toolbar button{padding:0 9px!important;font-size:11px!important;}
                    .usr-wz-live-toolbar{gap:6px!important;}}
                @media(max-width:750px){.usr-wz-root{padding:12px!important;}
                    .usr-wz-actions{gap:6px!important;}
                    .usr-wz-btn-cancel{margin-right:auto!important;}
                    .usr-wz-steps-card{padding:16px 8px!important;}.usr-wz-live-steps{font-size:10px!important;gap:3px!important;}
                    .usr-wz-live-step:not(:last-child)::after{left:calc(50% + 16px);width:calc(100% - 32px);}
                    .usr-wz-step-name{max-width:65px;}.usr-wz-step-circle{width:27px;height:27px;}
                }`;
            document.head.appendChild(tag);
        }
        // Mirrors My Requests: use native DOM buttons for reliable theme-independent colors.
        // Designer-visible crt.Button schema nodes stay intact as fallbacks.
        const mountFooterButtons=()=>{
            for(const host of document.querySelectorAll(".usr-wz-actions, .usr-wz-vm-actions, .usr-wz-doc-actions")){
                const isStepTwo = host.classList.contains("usr-wz-vm-actions");
                const isDocs = host.classList.contains("usr-wz-doc-actions");
                const isValidation = host.classList.contains("usr-wz-validation-actions");
                const isReview = host.classList.contains("usr-wz-review-actions");
                const existingToolbar = host.querySelector(".usr-wz-live-toolbar");
                if (existingToolbar) {
                    if (isStepTwo) {
                        const nextButton = existingToolbar.querySelector(".usr-wz-live-next");
                        const active = document.__usrMCITWizardActiveContext;
                        if (nextButton && active) {
                            // Proceed only when at least one database-backed VM Item was loaded.
                            const disabled = vmState(active).length === 0;
                            if (nextButton.disabled !== disabled) { nextButton.disabled = disabled; }
                        }
                    }
                    if(isValidation){wzSyncReviewButton(ctx);}
                    if(isReview){wzSyncSubmitButton(ctx);}
                    continue;
                }
                const toolbar=document.createElement("div");
                toolbar.className="usr-wz-live-toolbar";
                const createButton=(cls,text,requestType)=>{
                    const button=document.createElement("button");
                    button.type="button";button.className=cls;
                    button.textContent=text;
                    button.addEventListener("click",async(event)=>{
                        event.preventDefault();event.stopPropagation();
                        const active=document.__usrMCITWizardActiveContext;
                        if(!active || button.disabled){return;}
                        button.disabled=true;
                        try{
                            // Same existing request handlers, including draft verification.
                            await active.executeRequest({type:requestType,$context:active});
                        }catch(error){
                            console.error("MCIT Wizard footer action failed:",requestType,error);
                        }finally{button.disabled=false;}
                    });
                    return button;
                };
                const cancel=createButton("usr-wz-live-cancel",
                    (isStepTwo || isDocs || isValidation || isReview) ? "‹  Back" : "Cancel",
                    isReview ? "usr.WZ_BackToValidation" : isValidation ? "usr.WZ_BackToDocuments" :
                        isDocs ? "usr.WZ_BackToItems" : isStepTwo ? "usr.WZ_Back" : "usr.WZ_Cancel");
                if (isStepTwo) { cancel.classList.add("usr-wz-live-back"); }
                const draft=createButton("usr-wz-live-draft","Save as Draft","usr.WZ_SaveDraft");
                const icon=document.createElementNS("http://www.w3.org/2000/svg","svg");
                icon.setAttribute("viewBox","0 0 24 24");
                icon.setAttribute("fill","none");
                icon.setAttribute("stroke","currentColor");
                icon.setAttribute("stroke-width","2");
                icon.setAttribute("stroke-linecap","round");
                icon.setAttribute("stroke-linejoin","round");
                icon.setAttribute("aria-hidden","true");
                const outline=document.createElementNS("http://www.w3.org/2000/svg","path");
                outline.setAttribute("d","M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z M17 21v-8H7v8 M7 3v5h8");
                icon.appendChild(outline);
                draft.insertBefore(icon,draft.firstChild);
                const next=createButton("usr-wz-live-next",
                    isReview ? "Submit Request · متابعة" : isValidation ? "Continue to Review" :
                        isDocs ? "Run Validation" : isStepTwo ? "Continue to Documents" : "Continue to VM Items",
                    isReview ? "usr.WZ_SubmitRequest" :
                        isValidation ? "usr.WZ_ContinueToReview" : isDocs ? "usr.WZ_RunValidation" :
                        isStepTwo ? "usr.WZ_ContinueDocuments" : "usr.WZ_Continue");
                if(isValidation){next.disabled=true;
                    next.title="Run validation and acknowledge warnings before continuing to Review.";}
                if(isReview){next.disabled=true;
                    next.title="Select Submission Acknowledgement to enable Submit Request.";}
                if (isStepTwo) {
                    next.disabled = vmState(ctx).length === 0;
                    next.title = "Continue after saving at least one VM Item in Creatio.";
                }
                toolbar.append(cancel,draft,next);
                host.appendChild(toolbar);
                host.classList.add("usr-wz-buttons-live-ready");
                if(isReview){wzSyncSubmitButton(ctx);}
            }
        };
        const mountStepTwoAddButtons=()=>{
            const options = [
                {selector: ".usr-wz-vm-btn-add", label: "+  Add VM Item · إضافة الخادم للطلب",
                    css: "usr-wz-vm-add-native"},
                {selector: ".usr-wz-vm-btn-first", label: "+  Add First Item",
                    css: "usr-wz-vm-first-native"}
            ];
            for (const option of options) {
                for (const original of document.querySelectorAll(option.selector)) {
                    if (original.classList.contains("usr-wz-vm-native-hidden")) {continue;}
                    const button = document.createElement("button");
                    button.type = "button";
                    button.className = "usr-wz-vm-native-btn " + option.css;
                    button.textContent = option.label;
                    button.addEventListener("click", async event => {
                        event.preventDefault(); event.stopPropagation();
                        const active = document.__usrMCITWizardActiveContext;
                        if (!active || button.disabled) {return;}
                        button.disabled = true;
                        try {
                            await active.executeRequest({type: "usr.WZ_OpenVMModal", $context: active});
                        } catch (error) {
                            console.error("MCIT Wizard: Add VM button failed",error);
                        } finally {
                            button.disabled = false;
                        }
                    });
                    original.insertAdjacentElement("afterend", button);
                    original.classList.add("usr-wz-vm-native-hidden");
                }
            }
            const firstVisible=vmState(ctx).length===0;
            document.querySelectorAll(".usr-wz-vm-first-native").forEach(btn=>{
                if (btn.hidden !== !firstVisible) {btn.hidden = !firstVisible;}
            });
        };
        const render=()=>{
            for(const host of document.querySelectorAll(".usr-wz-steps-card")){
                const isSecond=host.classList.contains("usr-wz-second");
                const isThird=host.classList.contains("usr-wz-third");
                const isFourth=host.classList.contains("usr-wz-fourth");
                const isFifth=host.classList.contains("usr-wz-fifth");
                const active=isFifth?5:isFourth?4:isThird?3:isSecond?2:1;
                const existing=host.querySelector(".usr-wz-live-steps");
                if(existing && existing.dataset.step===String(active)){continue;}
                if(existing){existing.remove();}
                const captions=["Request Information","VM Items","Documents","Validation","Review & Submit"];
                const bar=document.createElement("div");bar.className="usr-wz-live-steps";
                bar.dataset.step=String(active);
                captions.forEach((name,i)=>{
                    const n=i+1,step=document.createElement("div");
                    step.className="usr-wz-live-step "+(n<active?"done":n===active?"active":"pending");
                    const circle=document.createElement("div");circle.className="usr-wz-step-circle";
                    circle.textContent=n<active?"✓":String(n);
                    const caption=document.createElement("div");caption.className="usr-wz-step-name";caption.textContent=name;
                    step.append(circle,caption);bar.appendChild(step);
                });host.appendChild(bar);
            }
        };
        render();
        mountFooterButtons();
        mountStepTwoAddButtons();
        vmRenderItems(ctx);
        docMount(ctx);
        docRenderValidation(ctx);
        docRenderReview(ctx);docRenderSuccess(ctx);
        Promise.all([ctx.WZ_StepTwo,ctx.WZ_StepThree,ctx.WZ_StepFour,ctx.WZ_StepFive]).then(([two,three,four,five])=>{
            if(five){docShowStep(ctx,5);}else if(four){docShowStep(ctx,4);}
            else if(three){docShowStep(ctx,3);}else if(two){docShowStep(ctx,2);}
        }).catch(()=>{});
        syncWizardValidationBorders(ctx);
        // Blur marks a single field as required; corrections clear its warning instantly.
        if (!document.__usrMCITWizardValidationBlurInstalled) {
            document.addEventListener("focusout", event => {
                const wrapper = event.target?.closest?.(".usr-wz-validation-wrap");
                if (!wrapper || !wrapper.closest(".usr-wz-root")) { return; }
                const def = WZ_REQUIRED_FIELDS.find(item =>
                    wrapper.classList.contains("usr-wz-field-" + item.code));
                const active = document.__usrMCITWizardActiveContext;
                if (!def || !active) { return; }
                Promise.resolve().then(async () => {
                    if (await active.WZ_Hydrating) { return; }
                    await updateRequiredField(active, def);
                }).catch(error => console.warn("MCIT Wizard validation blur", error));
            }, true);
            document.__usrMCITWizardValidationBlurInstalled = true;
        }
        if(!document.__usrMCITWizardObserver){
            // Watch mount of the Freedom UI view. Avoid replacing controls or their values.
            const observer=new MutationObserver(()=>{
                render();
                mountFooterButtons();
                mountStepTwoAddButtons();
                const active=document.__usrMCITWizardActiveContext;
                if(active){
                    vmRenderItems(active);docMount(active);docRenderValidation(active);docRenderReview(active);docRenderSuccess(active);
                    Promise.all([active.WZ_StepTwo,active.WZ_StepThree,active.WZ_StepFour,active.WZ_StepFive]).then(([two,three,four,five])=>{
                        if(five){docShowStep(active,5);}else if(four){docShowStep(active,4);}
                        else if(three){docShowStep(active,3);}else if(two){docShowStep(active,2);}
                    }).catch(()=>{});
                }
                syncWizardValidationBorders(active);
            });
            observer.observe(document.body,{childList:true,subtree:true});
            document.__usrMCITWizardObserver=observer;
        }
    }

    return {
        // This page currently inherits PageWithTabsAndProgressBarTemplate.
        // We add a new content group to the known base MainContainer rather than
        // attempting to delete unknown template items (which can break page loading).
        viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
        // Hide ONLY the native Creatio form chrome inherited from
        // PageWithTabsAndProgressBarTemplate. Do not remove schema nodes:
        // custom WZ_Root lives separately under MainContainer.
        // Same visible:false technique used in UsrMyRequests_ListPage.
        {
            "operation": "merge",
            "name": "MainHeader",
            "values": { "visible": false }
        },
        {
            "operation": "merge",
            "name": "CardContentWrapper",
            "values": { "visible": false }
        },
    {
        "operation": "insert",
        "name": "WZ_Root",
        "values": {
            "classes": ["usr-wz-root"],
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "large",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap",
            "padding": {
                "top": "large",
                "left": "large",
                "right": "large",
                "bottom": "large"
            }
        },
        "parentName": "MainContainer",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_Header",
        "values": {
            "classes": ["usr-wz-title"],
            "type": "crt.Label",
            "caption": "Create New Request · طلب جديد",
            "labelType": "headline-1-small",
            "labelEllipsis": false,
            "visible":"$WZ_ShowWizardHeader"
        },
        "parentName": "WZ_Root",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_Subtitle",
        "values": {
            "classes": ["usr-wz-subtitle"],
            "type": "crt.Label",
            "caption": "$WZ_PageSubtitle",
            "labelType": "caption",
            "labelEllipsis": false,
            "labelColor": "#64748b",
            "visible":"$WZ_ShowWizardHeader"
        },
        "parentName": "WZ_Root",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_StepsOne",
        "values": {
            "classes": ["usr-wz-steps-card"],
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "large",
            "alignItems": "stretch",
            "justifyContent": "space-between",
            "wrap": "wrap",
            "visible": "$WZ_StepOne"
        },
        "parentName": "WZ_Root",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_Step1_1",
        "values": {
            "type": "crt.Label",
            "caption": "① Request Information",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#6523C3"
        },
        "parentName": "WZ_StepsOne",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_Step1_2",
        "values": {
            "type": "crt.Label",
            "caption": "② VM Items",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#94a3b8"
        },
        "parentName": "WZ_StepsOne",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_Step1_3",
        "values": {
            "type": "crt.Label",
            "caption": "③ Documents",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#94a3b8"
        },
        "parentName": "WZ_StepsOne",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_Step1_4",
        "values": {
            "type": "crt.Label",
            "caption": "④ Validation",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#94a3b8"
        },
        "parentName": "WZ_StepsOne",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "WZ_Step1_5",
        "values": {
            "type": "crt.Label",
            "caption": "⑤ Review & Submit",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#94a3b8"
        },
        "parentName": "WZ_StepsOne",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "WZ_StepsTwo",
        "values": {
            "classes": ["usr-wz-steps-card", "usr-wz-second"],
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "large",
            "alignItems": "stretch",
            "justifyContent": "space-between",
            "wrap": "wrap",
            "visible": "$WZ_StepTwo"
        },
        "parentName": "WZ_Root",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "WZ_Step2_1",
        "values": {
            "type": "crt.Label",
            "caption": "✓ Request Information",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#6523C3"
        },
        "parentName": "WZ_StepsTwo",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_Step2_2",
        "values": {
            "type": "crt.Label",
            "caption": "② VM Items",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#6523C3"
        },
        "parentName": "WZ_StepsTwo",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_Step2_3",
        "values": {
            "type": "crt.Label",
            "caption": "③ Documents",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#94a3b8"
        },
        "parentName": "WZ_StepsTwo",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_Step2_4",
        "values": {
            "type": "crt.Label",
            "caption": "④ Validation",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#94a3b8"
        },
        "parentName": "WZ_StepsTwo",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "WZ_Step2_5",
        "values": {
            "type": "crt.Label",
            "caption": "⑤ Review & Submit",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#94a3b8"
        },
        "parentName": "WZ_StepsTwo",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "WZ_FormOne",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "large",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap",
            "visible": "$WZ_StepOne"
        },
        "parentName": "WZ_Root",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "WZ_RequestScope",
        "values": {
            "classes": ["usr-wz-panel"],
            "type": "crt.ExpansionPanel",
            "title": "Request Type & Scope",
            "expanded": true,
            "items": []
        },
        "parentName": "WZ_FormOne",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ScopeGrid",
        "values": {
            "type": "crt.GridContainer",
            "columns": [
                "minmax(250px, 1fr)",
                "minmax(250px, 1fr)"
            ],
            "rows": "repeat(2, minmax(64px, max-content))",
            "gap": {
                "columnGap": "large",
                "rowGap": "medium"
            },
            "items": []
        },
        "parentName": "WZ_RequestScope",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTypeGroup",
        "values": {
            "classes": [
                "usr-wz-validation-wrap",
                "usr-wz-field-type"
            ],
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap",
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_ScopeGrid",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTypeCaptionRow",
        "values": {
            "classes": [
                "usr-wz-caption-row"
            ],
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_ReqTypeGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTypeCaption",
        "values": {
            "classes": [
                "usr-wz-caption-text"
            ],
            "type": "crt.Label",
            "caption": "Request Type",
            "labelType": "body",
            "labelEllipsis": false
        },
        "parentName": "WZ_ReqTypeCaptionRow",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTypeStar",
        "values": {
            "classes": [
                "usr-wz-required-star"
            ],
            "type": "crt.Label",
            "caption": "*",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#ef4444"
        },
        "parentName": "WZ_ReqTypeCaptionRow",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_TypeControl",
        "values": {
            "type": "crt.ComboBox",
            "label": "Request Type",
            "labelPosition": "hidden",
            "ariaLabel": "Request Type required",
            "appearance": "outline",
            "placeholder": "Select request type",
            "classes": ["usr-wz-field-control"],
            "control": "$WZ_RequestType",
            "listActions": [],
            "controlActions": [],
            "showValueAsLink": false
        },
        "parentName": "WZ_ReqTypeGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTypeErrorLabel",
        "values": {
            "classes": [
                "usr-wz-validation-error"
            ],
            "type": "crt.Label",
            "caption": "Request type is required",
            "labelType": "caption",
            "labelEllipsis": false,
            "labelColor": "#ef4444",
            "visible": "$WZ_ErrRequestType"
        },
        "parentName": "WZ_ReqTypeGroup",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_ReqContractGroup",
        "values": {
            "classes": [
                "usr-wz-validation-wrap",
                "usr-wz-field-contract"
            ],
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap",
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_ScopeGrid",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ReqContractCaptionRow",
        "values": {
            "classes": [
                "usr-wz-caption-row"
            ],
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_ReqContractGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqContractCaption",
        "values": {
            "classes": [
                "usr-wz-caption-text"
            ],
            "type": "crt.Label",
            "caption": "Contract",
            "labelType": "body",
            "labelEllipsis": false
        },
        "parentName": "WZ_ReqContractCaptionRow",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqContractStar",
        "values": {
            "classes": [
                "usr-wz-required-star"
            ],
            "type": "crt.Label",
            "caption": "*",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#ef4444"
        },
        "parentName": "WZ_ReqContractCaptionRow",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ContractControl",
        "values": {
            "type": "crt.ComboBox",
            "label": "Contract",
            "labelPosition": "hidden",
            "ariaLabel": "Contract required",
            "appearance": "outline",
            "placeholder": "Select contract",
            "classes": ["usr-wz-field-control"],
            "control": "$WZ_Contract",
            "listActions": [],
            "controlActions": [],
            "showValueAsLink": false
        },
        "parentName": "WZ_ReqContractGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ReqContractErrorLabel",
        "values": {
            "classes": [
                "usr-wz-validation-error"
            ],
            "type": "crt.Label",
            "caption": "Contract is required",
            "labelType": "caption",
            "labelEllipsis": false,
            "labelColor": "#ef4444",
            "visible": "$WZ_ErrContract"
        },
        "parentName": "WZ_ReqContractGroup",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_ReqAuthorityGroup",
        "values": {
            "classes": [
                "usr-wz-validation-wrap",
                "usr-wz-field-authority"
            ],
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap",
            "layoutConfig": {
                "column": 1,
                "row": 2,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_ScopeGrid",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_ReqAuthorityCaptionRow",
        "values": {
            "classes": [
                "usr-wz-caption-row"
            ],
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_ReqAuthorityGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqAuthorityCaption",
        "values": {
            "classes": [
                "usr-wz-caption-text"
            ],
            "type": "crt.Label",
            "caption": "Government Authority Name",
            "labelType": "body",
            "labelEllipsis": false
        },
        "parentName": "WZ_ReqAuthorityCaptionRow",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqAuthorityStar",
        "values": {
            "classes": [
                "usr-wz-required-star"
            ],
            "type": "crt.Label",
            "caption": "*",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#ef4444"
        },
        "parentName": "WZ_ReqAuthorityCaptionRow",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_AuthorityControl",
        "values": {
            "type": "crt.ComboBox",
            "label": "Government Authority Name",
            "labelPosition": "hidden",
            "ariaLabel": "Government Authority Name required",
            "appearance": "outline",
            "placeholder": "Select authority",
            "classes": ["usr-wz-field-control"],
            "control": "$WZ_AuthorityAccount",
            "listActions": [],
            "controlActions": [],
            "showValueAsLink": false
        },
        "parentName": "WZ_ReqAuthorityGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ReqAuthorityErrorLabel",
        "values": {
            "classes": [
                "usr-wz-validation-error"
            ],
            "type": "crt.Label",
            "caption": "Authority is required",
            "labelType": "caption",
            "labelEllipsis": false,
            "labelColor": "#ef4444",
            "visible": "$WZ_ErrAuthority"
        },
        "parentName": "WZ_ReqAuthorityGroup",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_ReqProjectGroup",
        "values": {
            "classes": [
                "usr-wz-validation-wrap",
                "usr-wz-field-project"
            ],
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap",
            "layoutConfig": {
                "column": 2,
                "row": 2,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_ScopeGrid",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "WZ_ReqProjectCaptionRow",
        "values": {
            "classes": [
                "usr-wz-caption-row"
            ],
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_ReqProjectGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqProjectCaption",
        "values": {
            "classes": [
                "usr-wz-caption-text"
            ],
            "type": "crt.Label",
            "caption": "Project",
            "labelType": "body",
            "labelEllipsis": false
        },
        "parentName": "WZ_ReqProjectCaptionRow",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqProjectStar",
        "values": {
            "classes": [
                "usr-wz-required-star"
            ],
            "type": "crt.Label",
            "caption": "*",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#ef4444"
        },
        "parentName": "WZ_ReqProjectCaptionRow",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ProjectControl",
        "values": {
            "type": "crt.ComboBox",
            "label": "Project",
            "labelPosition": "hidden",
            "ariaLabel": "Project required",
            "appearance": "outline",
            "placeholder": "Select project",
            "classes": ["usr-wz-field-control"],
            "control": "$WZ_Project",
            "listActions": [],
            "controlActions": [],
            "showValueAsLink": false
        },
        "parentName": "WZ_ReqProjectGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ReqProjectErrorLabel",
        "values": {
            "classes": [
                "usr-wz-validation-error"
            ],
            "type": "crt.Label",
            "caption": "Project is required",
            "labelType": "caption",
            "labelEllipsis": false,
            "labelColor": "#ef4444",
            "visible": "$WZ_ErrProject"
        },
        "parentName": "WZ_ReqProjectGroup",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_ContractSummary",
        "values": {
            "type": "crt.ExpansionPanel",
            "title": "Contract Summary",
            "classes": ["usr-wz-contract-summary"],
            "expanded": true,
            "items": [],
            "visible": "$WZ_ShowContractSummary"
        },
        "parentName": "WZ_FormOne",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_SummaryContents",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_ContractSummary",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ContractNameLabel",
        "values": {
            "type": "crt.Label",
            "caption": "Name",
            "labelType": "caption",
            "labelEllipsis": false,
            "labelColor": "#6d28d9"
        },
        "parentName": "WZ_SummaryContents",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ContractNameValue",
        "values": {
            "type": "crt.Label",
            "caption": "$WZ_ContractName",
            "labelType": "body",
            "labelEllipsis": false
        },
        "parentName": "WZ_SummaryContents",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ContractGrid",
        "values": {
            "type": "crt.GridContainer",
            "columns": [
                "minmax(200px, 1fr)",
                "minmax(200px, 1fr)"
            ],
            "rows": "repeat(2, minmax(64px, max-content))",
            "gap": {
                "columnGap": "large",
                "rowGap": "medium"
            },
            "items": []
        },
        "parentName": "WZ_SummaryContents",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_ContractRefValue",
        "values": {
            "type": "crt.Label",
            "caption": "$WZ_ContractReference",
            "labelType": "body",
            "labelEllipsis": false,
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_ContractGrid",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ContractPeriodValue",
        "values": {
            "type": "crt.Label",
            "caption": "$WZ_ContractPeriod",
            "labelType": "body",
            "labelEllipsis": false,
            "layoutConfig": {
                "column": 2,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_ContractGrid",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_InitialPointsValue",
        "values": {
            "type": "crt.Label",
            "caption": "$WZ_InitialPoints",
            "labelType": "body",
            "labelEllipsis": false,
            "layoutConfig": {
                "column": 1,
                "row": 2,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_ContractGrid",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_ConsumptionValue",
        "values": {
            "type": "crt.Label",
            "caption": "$WZ_ContractLedgerNote",
            "labelType": "caption",
            "labelEllipsis": false,
            "labelColor": "#64748b",
            "layoutConfig": {
                "column": 2,
                "row": 2,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_ContractGrid",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "WZ_RequestDetails",
        "values": {
            "classes": ["usr-wz-panel"],
            "type": "crt.ExpansionPanel",
            "title": "Request Details",
            "expanded": true,
            "items": []
        },
        "parentName": "WZ_FormOne",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_RequestDetailsContents",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "medium",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_RequestDetails",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTitleGroup",
        "values": {
            "classes": [
                "usr-wz-validation-wrap",
                "usr-wz-field-title"
            ],
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_RequestDetailsContents",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTitleCaptionRow",
        "values": {
            "classes": [
                "usr-wz-caption-row"
            ],
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_ReqTitleGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTitleCaption",
        "values": {
            "classes": [
                "usr-wz-caption-text"
            ],
            "type": "crt.Label",
            "caption": "Request Title",
            "labelType": "body",
            "labelEllipsis": false
        },
        "parentName": "WZ_ReqTitleCaptionRow",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTitleStar",
        "values": {
            "classes": [
                "usr-wz-required-star"
            ],
            "type": "crt.Label",
            "caption": "*",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#ef4444"
        },
        "parentName": "WZ_ReqTitleCaptionRow",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_TitleControl",
        "values": {
            "type": "crt.Input",
            "label": "Request Title",
            "labelPosition": "hidden",
            "ariaLabel": "Request Title required",
            "appearance": "outline",
            "placeholder": "Brief, descriptive title for this request",
            "classes": ["usr-wz-field-control"],
            "control": "$WZ_Title"
        },
        "parentName": "WZ_ReqTitleGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ReqTitleErrorLabel",
        "values": {
            "classes": [
                "usr-wz-validation-error"
            ],
            "type": "crt.Label",
            "caption": "Request title is required",
            "labelType": "caption",
            "labelEllipsis": false,
            "labelColor": "#ef4444",
            "visible": "$WZ_ErrTitle"
        },
        "parentName": "WZ_ReqTitleGroup",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_ReqJustificationGroup",
        "values": {
            "classes": [
                "usr-wz-validation-wrap",
                "usr-wz-field-justification"
            ],
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "small",
            "alignItems": "stretch",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_RequestDetailsContents",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ReqJustificationCaptionRow",
        "values": {
            "classes": [
                "usr-wz-caption-row"
            ],
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "small",
            "alignItems": "center",
            "justifyContent": "start",
            "wrap": "nowrap"
        },
        "parentName": "WZ_ReqJustificationGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqJustificationCaption",
        "values": {
            "classes": [
                "usr-wz-caption-text"
            ],
            "type": "crt.Label",
            "caption": "Business Justification",
            "labelType": "body",
            "labelEllipsis": false
        },
        "parentName": "WZ_ReqJustificationCaptionRow",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ReqJustificationStar",
        "values": {
            "classes": [
                "usr-wz-required-star"
            ],
            "type": "crt.Label",
            "caption": "*",
            "labelType": "body",
            "labelEllipsis": false,
            "labelColor": "#ef4444"
        },
        "parentName": "WZ_ReqJustificationCaptionRow",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_JustificationControl",
        "values": {
            "type": "crt.Input",
            "label": "Business Justification",
            "labelPosition": "hidden",
            "ariaLabel": "Business Justification required",
            "appearance": "outline",
            "placeholder": "Explain the business need, intended use, and impact on government services",
            "classes": ["usr-wz-field-control"],
            "control": "$WZ_Justification",
            "multiline": true
        },
        "parentName": "WZ_ReqJustificationGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ReqJustificationErrorLabel",
        "values": {
            "classes": [
                "usr-wz-validation-error"
            ],
            "type": "crt.Label",
            "caption": "Business justification is required",
            "labelType": "caption",
            "labelEllipsis": false,
            "labelColor": "#ef4444",
            "visible": "$WZ_ErrJustification"
        },
        "parentName": "WZ_ReqJustificationGroup",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_DeliveryDateControl",
        "values": {
            "type": "crt.DateTimePicker",
            "label": "Requested Delivery Date (optional)",
            "labelPosition": "above",
            "control": "$WZ_DeliveryDate"
        },
        "parentName": "WZ_RequestDetailsContents",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterInformation",
        "values": {
            "classes": ["usr-wz-panel"],
            "type": "crt.ExpansionPanel",
            "title": "Requester Information — read-only",
            "expanded": true,
            "items": []
        },
        "parentName": "WZ_FormOne",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterGrid",
        "values": {
            "type": "crt.GridContainer",
            "columns": [
                "minmax(180px, 1fr)",
                "minmax(180px, 1fr)",
                "minmax(180px, 1fr)"
            ],
            "rows": "repeat(4, minmax(34px, max-content))",
            "gap": {
                "columnGap": "large",
                "rowGap": "medium"
            },
            "items": []
        },
        "parentName": "WZ_RequesterInformation",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterNameCaption",
        "values": {
            "type": "crt.Label",
            "caption": "Full Name",
            "labelType": "caption",
            "labelEllipsis": false,
            "layoutConfig": {
                "column": 1,
                "row": 1,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_RequesterGrid",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterNameValue",
        "values": {
            "type": "crt.Label",
            "caption": "$WZ_CurrentContactName",
            "labelType": "body",
            "labelEllipsis": false,
            "layoutConfig": {
                "column": 1,
                "row": 2,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_RequesterGrid",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterEmailCaption",
        "values": {
            "type": "crt.Label",
            "caption": "Email",
            "labelType": "caption",
            "labelEllipsis": false,
            "layoutConfig": {
                "column": 1,
                "row": 3,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_RequesterGrid",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterEmailValue",
        "values": {
            "type": "crt.Label",
            "caption": "$WZ_CurrentEmail",
            "labelType": "body",
            "labelEllipsis": false,
            "layoutConfig": {
                "column": 1,
                "row": 4,
                "colSpan": 1,
                "rowSpan": 1
            }
        },
        "parentName": "WZ_RequesterGrid",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterRoleCaption",
        "values": {
            "type": "crt.Label",
            "caption": "Role",
            "labelType": "caption",
            "labelEllipsis": false,
            "layoutConfig": {"column": 2, "row": 1, "colSpan": 1, "rowSpan": 1}
        },
        "parentName": "WZ_RequesterGrid", "propertyName": "items", "index": 4
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterRoleValue",
        "values": {
            "type": "crt.Label",
            "caption": "$WZ_CurrentRoleName",
            "labelType": "body",
            "labelEllipsis": false,
            "layoutConfig": {"column": 2, "row": 2, "colSpan": 1, "rowSpan": 1}
        },
        "parentName": "WZ_RequesterGrid", "propertyName": "items", "index": 5
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterAuthorityCaption",
        "values": {
            "type": "crt.Label",
            "caption": "Authority",
            "labelType": "caption",
            "labelEllipsis": false,
            "layoutConfig": {"column": 3, "row": 1, "colSpan": 1, "rowSpan": 1}
        },
        "parentName": "WZ_RequesterGrid", "propertyName": "items", "index": 6
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterAuthorityValue",
        "values": {
            "type": "crt.Label",
            "caption": "$WZ_CurrentAuthorityName",
            "labelType": "body",
            "labelEllipsis": false,
            "layoutConfig": {"column": 3, "row": 2, "colSpan": 1, "rowSpan": 1}
        },
        "parentName": "WZ_RequesterGrid", "propertyName": "items", "index": 7
    },
    {
        "operation": "insert",
        "name": "WZ_RequesterFootnote",
        "values": {
            "type": "crt.Label",
            "caption": "$WZ_RequesterError",
            "labelType": "caption",
            "labelEllipsis": false,
            "labelColor": "#64748b"
        },
        "parentName": "WZ_RequesterInformation",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_StepOneActions",
        "values": {
            "classes": ["usr-wz-actions"],
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "gap": "medium",
            "alignItems": "stretch",
            "justifyContent": "end",
            "wrap": "wrap"
        },
        "parentName": "WZ_FormOne",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "WZ_CancelButton",
        "values": {
            "classes": ["usr-wz-btn-cancel"],
            "type": "crt.Button",
            "caption": "Cancel",
            "color": "default",
            "displayType": "text",
            "disabled": false,
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.WZ_Cancel"
            }
        },
        "parentName": "WZ_StepOneActions",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_DraftButton",
        "values": {
            "classes": ["usr-wz-btn-draft"],
            "type": "crt.Button",
            "caption": "Save as Draft",
            "color": "default",
            "displayType": "contained",
            "disabled": false,
            "size": "medium",
            "icon": "save-button-icon",
            "iconPosition": "left-icon",
            "clicked": {
                "request": "usr.WZ_SaveDraft"
            }
        },
        "parentName": "WZ_StepOneActions",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ContinueButton",
        "values": {
            "classes": ["usr-wz-btn-next"],
            "type": "crt.Button",
            "caption": "Continue to VM Items",
            "color": "accent",
            "displayType": "contained",
            "disabled": false,
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.WZ_Continue"
            }
        },
        "parentName": "WZ_StepOneActions",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_ItemsPanel",
        "values": {
            "type": "crt.FlexContainer",
            "classes": [
                "usr-wz-vm-stage"
            ],
            "direction": "column",
            "items": [],
            "gap": "small",
            "wrap": "nowrap",
            "visible": "$WZ_StepTwo"
        },
        "parentName": "WZ_Root",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "WZ_ItemsHeader",
        "values": {
            "type": "crt.FlexContainer",
            "classes": [
                "usr-wz-vm-stage-header"
            ],
            "direction": "row",
            "items": [],
            "gap": "medium",
            "wrap": "wrap"
        },
        "parentName": "WZ_ItemsPanel",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ItemsHeaderCopy",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "gap": "small"
        },
        "parentName": "WZ_ItemsHeader",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ItemsHeaderTitle",
        "values": {
            "type": "crt.Label",
            "classes": [
                "usr-wz-vm-stage-heading"
            ],
            "caption": "VM Items",
            "labelType": "body",
            "labelEllipsis": false
        },
        "parentName": "WZ_ItemsHeaderCopy",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_ItemsHeaderHint",
        "values": {
            "type": "crt.Label",
            "classes": [
                "usr-wz-vm-stage-caption"
            ],
            "caption": "Add all virtual machines required in this request",
            "labelType": "caption",
            "labelEllipsis": false
        },
        "parentName": "WZ_ItemsHeaderCopy",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_AddVMTop",
        "values": {
            "type": "crt.Button",
            "classes": [
                "usr-wz-vm-btn-add"
            ],
            "caption": "＋ Add VM Item · إضافة الخادم للطلب",
            "color": "accent",
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.WZ_OpenVMModal"
            },
            "disabled": false
        },
        "parentName": "WZ_ItemsHeader",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ItemsBody",
        "values": {
            "type": "crt.FlexContainer",
            "classes": [
                "usr-wz-vm-stage-body"
            ],
            "direction": "column",
            "items": [],
            "gap": "medium"
        },
        "parentName": "WZ_ItemsPanel",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_EmptyVMGroup",
        "values": {
            "type": "crt.FlexContainer",
            "classes": [
                "usr-wz-vm-blank"
            ],
            "direction": "column",
            "items": [],
            "gap": "small",
            "visible": "$WZ_VMEmptyState"
        },
        "parentName": "WZ_ItemsBody",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_EmptyVMIcon",
        "values": {
            "type": "crt.Label",
            "classes": [
                "usr-wz-vm-blank-symbol"
            ],
            "caption": "▣",
            "labelType": "headline-1-small",
            "labelEllipsis": false
        },
        "parentName": "WZ_EmptyVMGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_EmptyVMTitle",
        "values": {
            "type": "crt.Label",
            "classes": [
                "usr-wz-vm-blank-title"
            ],
            "caption": "No VM items added yet",
            "labelType": "body",
            "labelEllipsis": false
        },
        "parentName": "WZ_EmptyVMGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_EmptyVMText",
        "values": {
            "type": "crt.Label",
            "classes": [
                "usr-wz-vm-blank-copy"
            ],
            "caption": "Service points and resources come from your Contract Configuration Version.",
            "labelType": "caption",
            "labelEllipsis": false
        },
        "parentName": "WZ_EmptyVMGroup",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_AddFirstVM",
        "values": {
            "type": "crt.Button",
            "classes": [
                "usr-wz-vm-btn-first"
            ],
            "caption": "＋ Add First Item",
            "color": "accent",
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.WZ_OpenVMModal"
            },
            "disabled": false
        },
        "parentName": "WZ_EmptyVMGroup",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "WZ_VMItemsList",
        "values": {
            "type": "crt.FlexContainer",
            "classes": [
                "usr-wz-vm-items-render"
            ],
            "direction": "column",
            "items": [],
            "gap": "small",
            "visible": "$WZ_VMHasItems"
        },
        "parentName": "WZ_ItemsBody",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_VMItemsDisclaimer",
        "values": {
            "type": "crt.Label",
            "classes": [
                "usr-wz-vm-stage-caption"
            ],
            "caption": "VM Items are saved to Creatio as draft records; point ledger consumption happens only in the approved workflow.",
            "labelType": "caption",
            "labelEllipsis": false,
            "visible": "$WZ_VMHasItems"
        },
        "parentName": "WZ_ItemsBody",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "WZ_StepTwoActions",
        "values": {
            "type": "crt.FlexContainer",
            "classes": [
                "usr-wz-vm-actions"
            ],
            "direction": "row",
            "items": [],
            "gap": "medium",
            "wrap": "wrap",
            "justifyContent": "end",
            "visible": "$WZ_StepTwo"
        },
        "parentName": "WZ_Root",
        "propertyName": "items",
        "index": 6
    },
    {
        "operation": "insert",
        "name": "WZ_BackButton",
        "values": {
            "type": "crt.Button",
            "classes": [
                "usr-wz-vm-action-back"
            ],
            "caption": "‹ Back",
            "color": "default",
            "displayType": "text",
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.WZ_Back"
            },
            "disabled": false
        },
        "parentName": "WZ_StepTwoActions",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "WZ_DraftButton2",
        "values": {
            "type": "crt.Button",
            "classes": [
                "usr-wz-btn-draft"
            ],
            "caption": "Save as Draft",
            "color": "default",
            "displayType": "contained",
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.WZ_SaveDraft"
            },
            "disabled": false
        },
        "parentName": "WZ_StepTwoActions",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "WZ_ContinueDocuments",
        "values": {
            "type": "crt.Button",
            "classes": [
                "usr-wz-vm-action-docs"
            ],
            "caption": "Continue to Documents",
            "color": "accent",
            "size": "medium",
            "iconPosition": "only-text",
            "clicked": {
                "request": "usr.WZ_ContinueDocuments"
            },
            "disabled": "$WZ_VMEmptyState"
        },
        "parentName": "WZ_StepTwoActions",
        "propertyName": "items",
        "index": 2
    },

    // Step 3: real supporting-document attachments; Step 4: read-only validation.
    // A Draft may be REVIEWED but cannot be finally submitted without ledger approval.
    {
        "operation":"insert","name":"WZ_StepsThree",
        "values":{
            "type":"crt.FlexContainer",
            "classes":["usr-wz-steps-card","usr-wz-third"],
            "direction":"row","items":[],"gap":"large",
            "visible":"$WZ_StepThree"
        },
        "parentName":"WZ_Root","propertyName":"items","index":7
    },
    {
        "operation":"insert","name":"WZ_DocumentsShell",
        "values":{
            "type":"crt.FlexContainer",
            "classes":["usr-wz-vm-stage","usr-wz-doc-shell"],
            "direction":"column","items":[],"gap":"none",
            "visible":"$WZ_StepThree",
            "padding":{"top":"none","right":"none","bottom":"none","left":"none"}
        },
        "parentName":"WZ_Root","propertyName":"items","index":8
    },
    {
        "operation":"insert","name":"WZ_DocumentsHeading",
        "values":{
            "type":"crt.Label",
            "caption":"Supporting Documents",
            "labelType":"body",
            "classes":["usr-wz-doc-head"]
        },
        "parentName":"WZ_DocumentsShell","propertyName":"items","index":0
    },
    {
        "operation":"insert","name":"WZ_DocumentsMount",
        "values":{
            "type":"crt.FlexContainer",
            "classes":["usr-wz-documents-mount"],
            "direction":"column","items":[],"gap":"none"
        },
        "parentName":"WZ_DocumentsShell","propertyName":"items","index":1
    },
    {
        "operation":"insert","name":"WZ_DocumentsActions",
        "values":{
            "type":"crt.FlexContainer",
            "classes":["usr-wz-doc-actions","usr-wz-actions"],
            "direction":"row","items":[],"gap":"medium",
            "visible":"$WZ_StepThree"
        },
        "parentName":"WZ_Root","propertyName":"items","index":9
    },
    {
        "operation":"insert","name":"WZ_StepsFour",
        "values":{
            "type":"crt.FlexContainer","classes":["usr-wz-steps-card","usr-wz-fourth"],
            "direction":"row","items":[],"gap":"large","visible":"$WZ_StepFour"
        },
        "parentName":"WZ_Root","propertyName":"items","index":10
    },
    {
        "operation":"insert","name":"WZ_ValidationPanel",
        "values":{
            "type":"crt.FlexContainer","classes":["usr-wz-vm-stage","usr-wz-doc-shell"],
            "direction":"column","items":[],"visible":"$WZ_StepFour"
        },
        "parentName":"WZ_Root","propertyName":"items","index":11
    },
    {
        "operation":"insert","name":"WZ_ValidationHeading",
        "values":{"type":"crt.Label","caption":"Validation","labelType":"body",
            "classes":["usr-wz-doc-head"]},
        "parentName":"WZ_ValidationPanel","propertyName":"items","index":0
    },
    {
        "operation":"insert","name":"WZ_ValidationMount",
        "values":{"type":"crt.FlexContainer","classes":["usr-wz-documents-mount","usr-wz-validation-mount"],
            "direction":"column","items":[]},
        "parentName":"WZ_ValidationPanel","propertyName":"items","index":1
    },
    {
        "operation":"insert","name":"WZ_ValidationActions",
        "values":{"type":"crt.FlexContainer","classes":["usr-wz-actions","usr-wz-validation-actions"],
            "direction":"row","items":[],"visible":"$WZ_StepFour"},
        "parentName":"WZ_Root","propertyName":"items","index":12
    },
    // Step 5: native designer-visible containers; dynamic review from persisted rows.
    {
        "operation":"insert","name":"WZ_StepsFive",
        "values":{"type":"crt.FlexContainer","classes":["usr-wz-steps-card","usr-wz-fifth"],
            "direction":"row","items":[],"gap":"large","visible":"$WZ_StepFive"},
        "parentName":"WZ_Root","propertyName":"items","index":13
    },
    {
        "operation":"insert","name":"WZ_ReviewPanel",
        "values":{"type":"crt.FlexContainer","classes":["usr-wz-vm-stage","usr-wz-doc-shell","usr-wz-review-shell"],
            "direction":"column","items":[],"visible":"$WZ_StepFive"},
        "parentName":"WZ_Root","propertyName":"items","index":14
    },
    {
        "operation":"insert","name":"WZ_ReviewHeading",
        "values":{"type":"crt.Label","caption":"Review & Submit","labelType":"body",
            "classes":["usr-wz-doc-head"],"visible":false},
        "parentName":"WZ_ReviewPanel","propertyName":"items","index":0
    },
    {
        "operation":"insert","name":"WZ_ReviewMount",
        "values":{"type":"crt.FlexContainer","classes":["usr-wz-documents-mount","usr-wz-review-mount"],
            "direction":"column","items":[]},
        "parentName":"WZ_ReviewPanel","propertyName":"items","index":1
    },
    {
        "operation":"insert","name":"WZ_ReviewActions",
        "values":{"type":"crt.FlexContainer","classes":["usr-wz-actions","usr-wz-review-actions"],
            "direction":"row","items":[],"visible":"$WZ_StepFive"},
        "parentName":"WZ_Root","propertyName":"items","index":15
    },
    {"operation":"insert","name":"WZ_SuccessPanel",
     "values":{"type":"crt.FlexContainer","classes":["usr-wz-success-panel"],
         "direction":"column","items":[],"visible":"$WZ_Success"},
     "parentName":"WZ_Root","propertyName":"items","index":16},
    {"operation":"insert","name":"WZ_SuccessMount",
     "values":{"type":"crt.FlexContainer","classes":["usr-wz-success-mount"],
         "direction":"column","items":[]},
     "parentName":"WZ_SuccessPanel","propertyName":"items","index":0},
]/**SCHEMA_VIEW_CONFIG_DIFF*/,
        viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
            {
                "operation": "merge", "path": ["attributes"], "values": {
    "WZ_RequestType": {
        "modelConfig": {
            "path": "UsrVMRequestDS.UsrRequestType"
        }
    },
    "WZ_Contract": {
        "modelConfig": {
            "path": "UsrVMRequestDS.UsrContract"
        }
    },
    "WZ_Authority": {
        // Preserve legacy lookup for historical records; not the Customer 360 selector.
        "modelConfig": {"path": "UsrVMRequestDS.UsrAuthority"}
    },
    "WZ_AuthorityAccount": {
        // Existing lookup from user's screenshot: UsrVMRequest.UsrAccount -> Account.
        // NOTE: this is the chosen government Authority, not Contact.Account.
        "modelConfig": {"path": "UsrVMRequestDS.UsrAccount"}
    },
    "WZ_ValidationAttempted": {"value": false},
    "WZ_ErrRequestType": {"value": false},
    "WZ_ErrContract": {"value": false},
    "WZ_ErrAuthority": {"value": false},
    "WZ_ErrProject": {"value": false},
    "WZ_ErrTitle": {"value": false},
    "WZ_ErrJustification": {"value": false},
    "WZ_ProjectFilter": {"value": {}},
    "WZ_ProjectActiveFilter": {"value": {}},
    "WZ_Hydrating": {"value": true},
    "WZ_Project": {
        "modelConfig": {
            "path": "UsrVMRequestDS.UsrProject"
        }
    },
    "WZ_Title": {
        "modelConfig": {
            "path": "UsrVMRequestDS.UsrName"
        }
    },
    "WZ_Justification": {
        "modelConfig": {
            "path": "UsrVMRequestDS.UsrBusinessJustification"
        }
    },
    "WZ_DeliveryDate": {
        "modelConfig": {
            "path": "UsrVMRequestDS.UsrRequestedDeliveryDate"
        }
    },
    "WZ_Status": {
        "modelConfig": {
            "path": "UsrVMRequestDS.UsrStatus"
        }
    },
    "WZ_RecordId": {
        "modelConfig": {
            "path": "UsrVMRequestDS.Id"
        }
    },
    "WZ_Requester": {
        "modelConfig": {
            "path": "UsrVMRequestDS.UsrRequester"
        }
    },
    "WZ_RequesterAccount": {"value": null},
    "WZ_ContactId": {"value": null},
    "WZ_CurrentRoleName": {"value": "—"},
    "WZ_CurrentAuthorityName": {"value": "—"},
    "WZ_RequesterError": {"value": ""},
    "WZ_StepOne": {
        "value": true
    },
    "WZ_StepTwo": {
        "value": false
    },
    "WZ_StepThree": {"value": false},
    "WZ_StepFour": {"value": false},
    "WZ_StepFive": {"value": false},
    "WZ_Success": {"value": false},
    "WZ_ShowWizardHeader": {"value": true},
    "WZ_PageSubtitle": {"value": "New VM Provisioning Request — Request Information"},
    "WZ_VMEmptyState": {"value": true},
    "WZ_VMHasItems": {"value": false},
    "WZ_ContractInitialPointsValue": {"value": null},
    "WZ_ShowContractSummary": {
        "value": false
    },
    "WZ_ContractName": {
        "value": "—"
    },
    "WZ_ContractReference": {
        "value": "Reference: —"
    },
    "WZ_ContractPeriod": {
        "value": "Validity: —"
    },
    "WZ_InitialPoints": {
        "value": "Initial points: —"
    },
    "WZ_ContractLedgerNote": {
        "value": "Available / Consumed / Restored: pending point-ledger integration"
    },
    "WZ_CurrentContactName": {
        "value": "—"
    },
    "WZ_CurrentEmail": {
        "value": "—"
    },
    "WZ_RequestType_List": {},
    "WZ_Contract_List": {},
    "WZ_Authority_List": {},
    "WZ_AuthorityAccount_List": {},
    "WZ_Project_List": {
        "modelConfig": {
            "filterAttributes": [
                {"name": "WZ_ProjectFilter", "loadOnChange": true},
                {"name": "WZ_ProjectActiveFilter", "loadOnChange": true}
            ]
        }
    }
}
            }
        ]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
        // Keep the user's original tested primary data source name unchanged.
        modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
            {
                "operation": "merge", "path": [],
                "values": { "primaryDataSourceName": "UsrVMRequestDS" }
            },
            {
                "operation": "merge", "path": ["dataSources"],
                "values": {
                    "UsrVMRequestDS": {
                        "type": "crt.EntityDataSource", "scope": "page",
                        "config": {
                            "entitySchemaName": "UsrVMRequest",
                            "loadParameters": {
                                "options": {
                                    "pagingConfig": { "rowCount": 1, "rowsOffset": -1 },
                                    "sortingConfig": { "columns": [] }
                                }
                            },
                            "allowCopyingRecords": false
                        }
                    }
                }
            }
        ]/**SCHEMA_MODEL_CONFIG_DIFF*/,
        handlers: /**SCHEMA_HANDLERS*/[
            // NOTE: Do NOT also append WZ_ProjectFilter in crt.LoadDataRequest.
            // The two filterAttributes above load/reload the lookup natively.
            {
                request: "crt.HandleViewModelInitRequest",
                handler: async (request, next) => {
                    const ctx = request.$context;
                    // Protect project selected in an existing /edit/ record while
                    // the page data source is hydrating its initial values.
                    ctx.WZ_Hydrating = true;
                    try {
                        const result = await next?.handle(request);
                        ctx.WZ_StepOne = true;
                        ctx.WZ_StepTwo = false;
                        ctx.WZ_StepThree = false;
                        ctx.WZ_StepFour = false;
                        ctx.WZ_StepFive = false;
                        ctx.WZ_Success = false;
                        ctx.WZ_ShowWizardHeader = true;
                        ctx.__wzSubmitted = null;
                        ctx.__wzReviewData = null;
                        ctx.__wzReviewError = "";
                        ctx.__wzSubmitAcknowledged = false;
                        ctx.__wzSubmissionBusy = false;
                        ctx.__wzSubmitProcessStarted = false;
                        ctx.__wzValidationData = null;
                        ctx.__wzValidationAcknowledged = false;
                        ctx.WZ_PageSubtitle = "New VM Provisioning Request — Request Information";
                        ctx.WZ_VMEmptyState = true;
                        ctx.WZ_VMHasItems = false;
                        ctx.WZ_ValidationAttempted = false;
                        for (const def of WZ_REQUIRED_FIELDS) { ctx[def.error] = false; }
                        try {
                            await resolveRequester(ctx);
                            const existing = await ctx.WZ_Status;
                            if (!existing) { ctx.WZ_Status = await findDraftStatus(); }
                        } catch (error) {
                            console.error("MCIT Wizard initialization", error);
                        }
                        await refreshContract(ctx);
                        try {
                            // First resolve legacy lookup, THEN construct filter;
                            // otherwise /edit/ could use the previous Authority ID.
                            await syncLegacyAuthority(ctx);
                            await updateProjectFilter(ctx);
                        } catch (error) {
                            console.warn("MCIT Wizard: Project filter init failed", error);
                        }
                        mountWizardStyling(ctx);
                        return result;
                    } finally {
                        ctx.WZ_Hydrating = false;
                    }
                }
            },
            {
                request: "crt.HandleViewModelAttributeChangeRequest",
                handler: async (request, next) => {
                    const result = await next?.handle(request);
                    if (request.attributeName === "WZ_Contract") {
                        await refreshContract(request.$context);
                    }
                    if (request.attributeName === "WZ_AuthorityAccount" &&
                        selectedId(request.value) !== selectedId(request.oldValue)) {
                        const ctx = request.$context;
                        if (await ctx.WZ_Hydrating) { return result; }
                        // Only reset a Project on a genuine Account change,
                        // not while an existing request is opening for edit.
                        ctx.WZ_Project = null;
                        try {
                            await syncLegacyAuthority(ctx);
                            await updateProjectFilter(ctx);
                        } catch (error) {
                            console.warn("MCIT Wizard: Project filter refresh failed", error);
                        }
                    }
                    const changedField = WZ_REQUIRED_FIELDS.find(
                        item => item.field === request.attributeName);
                    if (changedField && !(await request.$context.WZ_Hydrating) &&
                        ((await request.$context.WZ_ValidationAttempted) ||
                         (await request.$context[changedField.error]))) {
                        await updateRequiredField(request.$context, changedField);
                    }
                    return result;
                }
            },
            {
                request: "usr.WZ_SaveDraft",
                handler: async (request, next) => {
                    const ctx = request.$context;
                    try {
                        if(docInFlight.has(vmRequestKey(ctx))){
                            docNotify(ctx,"Please finish the file upload before saving the draft.");return false;
                        }
                        const saved=await persistDraft(ctx, true);
                        if (validGuid(selectedId(saved?.Id))) { vmContextRequestIds.set(ctx,selectedId(saved.Id)); }
                        if (await ctx.WZ_StepTwo) {
                            try {await vmLoadSavedItems(ctx,true);}
                            catch(err){console.warn("Draft header saved; VM Item columns still need mapping",err);}
                        }
                        // Each VM Item is independently saved and verified at Add/Update time.
                        await ctx.executeRequest({type:"crt.ClosePageRequest",$context:ctx});
                        return true;
                    } catch (error) {
                        console.error("MCIT Wizard Save as Draft", error);
                        ctx._notifyService?.show({ message: error.message || "Unable to save draft" });
                        return false;
                    }
                }
            },
            {
                request: "usr.WZ_Continue",
                handler: async (request, next) => {
                    const ctx = request.$context;
                    if (!(await validateRequiredStepOne(ctx))) {
                        ctx._notifyService?.show({
                            message: "Complete the required fields highlighted in red before continuing."
                        });
                        return false;
                    }
                    try {
                        const linked = await checkProjectBelongsToAccount(ctx);
                        if (!linked) {
                            ctx._notifyService?.show({message:
                                "Select an active Project whose Authority matches the chosen government Account. Check MCIT Project > Authority if the dropdown is empty."});
                            return false;
                        }
                        const saved=await persistDraft(ctx, false);
                        if (validGuid(selectedId(saved?.Id))) { vmContextRequestIds.set(ctx,selectedId(saved.Id)); }
                        vmConfigCache.delete(selectedId(await ctx.WZ_Contract));
                        await vmLoadLookupOptions();
                        await vmLoadContractConfig(ctx,true);
                        ctx.WZ_StepOne = false;
                        ctx.WZ_StepTwo = true;
                        ctx.WZ_StepThree = false;
                        ctx.WZ_StepFour = false;
                        ctx.WZ_StepFive = false;
                        ctx.WZ_PageSubtitle = "New VM Provisioning Request — VM Items";
                        try {
                            const savedItems=await vmLoadSavedItems(ctx,true);
                            const config=await vmLoadContractConfig(ctx);
                            if(savedItems.some(item=>item.configId &&
                                    item.configId.toLowerCase()!==config.id.toLowerCase())){
                                vmPageNotice(ctx,"Existing VM Items were saved under a different Contract Configuration. Review the Items before continuing.");
                            }
                        }
                        catch(loadError) {
                            console.warn("VM item columns may be missing",loadError);
                            vmPageNotice(ctx,loadError.message);
                        }
                        vmSyncVisibility(ctx);
                        vmRenderItems(ctx);
                        return true;
                    } catch (error) {
                        console.error("MCIT Wizard Continue", error);
                        ctx._notifyService?.show({ message: error.message || "Could not continue" });
                        return false;
                    }
                }
            },
            {
                request: "usr.WZ_OpenVMModal",
                handler: async (request) => {
                    await vmOpenModal(request.$context);
                    return true;
                }
            },
            {
                request: "usr.WZ_ContinueDocuments",
                handler: async (request) => {
                    const ctx=request.$context;
                    try {
                        const records=await vmLoadSavedItems(ctx,true);
                        if (!records.length || records.some(item=>!validGuid(item.id))) {
                            vmPageNotice(ctx,"Add and save a VM Item before Documents.");
                            return false;
                        }
                        const config=await vmLoadContractConfig(ctx,true);
                        if(records.some(item=>item.configId &&
                                item.configId.toLowerCase()!==config.id.toLowerCase())){
                            vmPageNotice(ctx,"VM Items were priced under a different Configuration Version. Review before Documents.");
                            return false;
                        }
                        await persistDraft(ctx,false);
                        ctx.WZ_StepOne=false;
                        ctx.WZ_StepTwo=false;
                        ctx.WZ_StepThree=true;
                        ctx.WZ_StepFour=false;
                        ctx.WZ_StepFive=false;
                        ctx.WZ_PageSubtitle="New VM Provisioning Request — Documents";
                        docShowStep(ctx,3);
                        docMount(ctx);
                        await docRefresh(ctx);
                        return true;
                    } catch(error) {
                        vmPageNotice(ctx,error.message||"VM Item verification failed.");
                        return false;
                    }
                }
            },
            {
                request:"usr.WZ_BackToItems",
                handler: async request=>{
                    const ctx=request.$context;
                    ctx.WZ_StepThree=false;
                    ctx.WZ_StepFour=false;
                    ctx.WZ_StepTwo=true;
                    docShowStep(ctx,2);
                    ctx.WZ_PageSubtitle="New VM Provisioning Request — VM Items";
                    await vmLoadSavedItems(ctx,true);
                    return true;
                }
            },
            {
                // Step 3 -> Step 4 opens the ready state, mirroring Figma.
                request:"usr.WZ_RunValidation",
                handler: async request=>{
                    const ctx=request.$context;
                    const key=vmRequestKey(ctx);
                    if(docInFlight.has(key)) {docNotify(ctx,"Complete uploads before validation.");return false;}
                    if(!validGuid(key)){docNotify(ctx,"Save the request before validation.");return false;}
                    ctx.__wzValidationData=null;
                    ctx.__wzValidationAcknowledged=false;
                    ctx.WZ_StepOne=false;ctx.WZ_StepTwo=false;
                    ctx.WZ_StepThree=false;ctx.WZ_StepFour=true;ctx.WZ_StepFive=false;
                    ctx.WZ_PageSubtitle="New VM Provisioning Request — Validation";
                    docShowStep(ctx,4);docRenderValidation(ctx);wzSyncReviewButton(ctx);
                    return true;
                }
            },
            {
                request:"usr.WZ_ExecuteValidation",
                handler: async request=>{
                    const ctx=request.$context;
                    if(wzValidationInFlight.has(ctx)){return false;}
                    const key=vmRequestKey(ctx);
                    if(docInFlight.has(key)){vmPageNotice(ctx,"Complete document uploads before validating.");return false;}
                    wzValidationInFlight.add(ctx);
                    ctx.__wzValidationAcknowledged=false;
                    ctx.__wzValidationData={loading:true};
                    docRenderValidation(ctx);
                    try {
                        const result=await docRunValidation(ctx);
                        if(vmRequestKey(ctx)!==key){throw new Error("Request changed during validation.");}
                        ctx.__wzValidationData=result;
                        docRenderValidation(ctx);
                        return true;
                    } catch(error) {
                        console.error("MCIT Step 4 validation failed",error);
                        // Infrastructure/permission failures must NOT be shown as passed checks.
                        ctx.__wzValidationData={requestId:key,checkedAt:new Date().toISOString(),
                            checks:[wzCheck("error","System","Validation could not complete",
                                String(error.message||error),"Check record access and retry Run Again.")],
                            counts:{errors:1,warnings:0,passed:0,info:0}};
                        docRenderValidation(ctx);
                        return false;
                    } finally {wzValidationInFlight.delete(ctx);}
                }
            },
            {
                request:"usr.WZ_ContinueToReview",
                handler:async request=>{
                    const ctx=request.$context;
                    const result=ctx.__wzValidationData;
                    if(!result || result.loading || result.requestId!==vmRequestKey(ctx) ||
                        result.counts?.errors!==0 || !ctx.__wzValidationAcknowledged){
                        vmPageNotice(ctx,"Run validation, fix all errors and acknowledge the warnings before review.");
                        return false;
                    }
                    // Recheck mutable DB state to prevent a stale pass after another edit.
                    try {
                        const fresh=await docRunValidation(ctx);
                        const previous=JSON.stringify(result.checks.map(x=>[x.level,x.section,x.title,x.message]));
                        const now=JSON.stringify(fresh.checks.map(x=>[x.level,x.section,x.title,x.message]));
                        if(fresh.counts.errors || now!==previous){
                            ctx.__wzValidationData=fresh;ctx.__wzValidationAcknowledged=false;
                            docRenderValidation(ctx);
                            vmPageNotice(ctx,"Data changed after validation. Review the updated findings and acknowledge them again.");
                            return false;
                        }
                    } catch(error){
                        vmPageNotice(ctx,"Could not re-verify the request before review: "+(error.message||error));
                        return false;
                    }
                    ctx.__wzReviewData=null;ctx.__wzReviewError="";
                    ctx.__wzSubmitAcknowledged=false;
                    ctx.WZ_StepFour=false;ctx.WZ_StepFive=true;
                    ctx.WZ_PageSubtitle="New VM Provisioning Request — Review & Submit";
                    docShowStep(ctx,5);docRenderReview(ctx);
                    try{
                        const review=await wzLoadReviewData(ctx);
                        if(vmRequestKey(ctx)!==review.id){throw new Error("Request changed during review.");}
                        ctx.__wzReviewData=review;
                        docRenderReview(ctx);
                        return true;
                    }catch(error){
                        console.error("MCIT Step 5 review loading failed",error);
                        ctx.__wzReviewError="Unable to load the saved review: "+(error.message||error);
                        docRenderReview(ctx);
                        return false;
                    }
                }
            },
            {
                request:"usr.WZ_BackToValidation",
                handler:async request=>{
                    const ctx=request.$context;
                    ctx.WZ_StepFive=false;ctx.WZ_StepFour=true;
                    ctx.WZ_PageSubtitle="New VM Provisioning Request — Validation";
                    docShowStep(ctx,4);docRenderValidation(ctx);
                    return true;
                }
            },
            {
                request:"usr.WZ_BackToDocuments",
                handler: async request=>{
                    const ctx=request.$context;
                    ctx.WZ_StepFive=false;ctx.WZ_StepFour=false;ctx.WZ_StepThree=true;
                    ctx.WZ_PageSubtitle="New VM Provisioning Request — Documents";
                    docShowStep(ctx,3);docMount(ctx);await docRefresh(ctx);
                    return true;
                }
            },
            {
                request:"usr.WZ_SubmitRequest",
                handler:async request=>{
                    const ctx=request.$context;
                    if(ctx.__wzSubmissionBusy){return false;}
                    ctx.__wzReviewError="";
                    try{
                        return await wzExecuteSubmission(ctx);
                    }catch(error){
                        console.error("MCIT Step 5 Final Submit",error);
                        ctx.__wzReviewError=String(error.message||error);
                        docRenderReview(ctx);
                        vmPageNotice(ctx,ctx.__wzReviewError);
                        return false;
                    }
                }
            },
            {
                request:"usr.WZ_ValidationNotReady",
                handler: async request=>{
                    vmPageNotice(request.$context,
                        "Submission remains blocked until an active configuration, verified ledger and complete document policy are available.");
                    return false;
                }
            },
            {
                request: "usr.WZ_Cancel",
                handler: async (request) => request.$context.executeRequest({
                    type:"crt.ClosePageRequest",$context:request.$context
                })
            },
            {
                request: "usr.WZ_Back",
                handler: async (request, next) => {
                    request.$context.WZ_StepThree = false;
                    request.$context.WZ_StepFour = false;
                    request.$context.WZ_StepFive = false;
                    request.$context.WZ_StepTwo = false;
                    request.$context.WZ_StepOne = true;
                    request.$context.WZ_PageSubtitle = "New VM Provisioning Request — Request Information";
                    return true;
                }
            }
        ]/**SCHEMA_HANDLERS*/,
        converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
        validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
    };
});
