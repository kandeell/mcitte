/*
 * TE-MCIT MY TASKS v5 -- RUNTIME ONLY.
 * Native Freedom UI Page: UsrMyTasks_ListPage
 * Object: UsrRequestApproval (existing, never cloned)
 * Reuses role-limited approach of FinancialReviewRuntime v18 / TechnicalReviewRuntime v6.
 * Provisioning intentionally NOT routed until its actual object/form is merged.
 * Assignment updates UsrAssignedTo + UsrAssignedOn ONLY, not native SysApproval.
 * No BPMN/decision/status/approval changes are performed by this module.
 */
define("UsrMyTasksRuntime", ["@creatio-devkit/common"], function(sdk) {
    "use strict";

    const OBJECT = "UsrRequestApproval";
    const STAGE_LOOKUP = "UsrMCITApprovalStage";
    const REQUEST_OBJECT = "UsrVMRequest";
    const TASK_LIMIT = 2000;
    const NUMBERING_LIMIT = 10000; // Same cap as Financial/Technical My Requests scoped fallback.
    const ITEM_LIMIT_PER_BATCH = 2500;
    const EMPTY = "00000000-0000-0000-0000-000000000000";
    const GUID = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;
    const RUNTIME_KEY = "__usrMCITMyTasksRuntimeV5";
    const LEGACY_RUNTIME_KEYS = ["__usrMCITMyTasksRuntimeV4", "__usrMCITMyTasksRuntimeV3", "__usrMCITMyTasksRuntimeV2"];
    const FILTERS = ["mine", "unassigned", "team", "approaching", "overdue", "completed"];
    const TYPE_CAPTIONS = {
        all: "All Task Types ▾", financial: "Financial Review ▾",
        technical: "Technical Review ▾", provisioning: "Provisioning ▾"
    };
    const FILTER_CAPTIONS = {
        mine: "Assigned to Me", unassigned: "Unassigned", team: "My Team",
        approaching: "Approaching SLA", overdue: "Overdue", completed: "Completed"
    };
    const STAGES = {
        financial: {role: "TE Financial Reviewer", page: "UsrFinancialReview_FormPage"},
        technical: {role: "TE Technical Reviewer", page: "UsrTechnicalReview_FormPage"}
        // Add provisioning here only after confirming its real task object + form.
    };
    const id = v => String(v?.value ?? v?.Id ?? v?.id ?? v ?? "").trim();
    const valid = v => GUID.test(id(v)) && id(v).toLowerCase() !== EMPTY;
    const key = v => id(v).toLowerCase();
    const label = v => String(v?.displayValue ?? v?.Name ?? v?.UsrName ?? v ?? "").trim();
    const norm = v => label(v).replace(/\s+/g, " ").toLowerCase();
    const esc = v => String(v || "").replace(/[&<>"']/g, s => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[s]));
    const active = r => !(r?.UsrIsCompleted === true || r?.UsrIsCompleted === 1);
    const parseDate = value => {
        const d = value ? new Date(value) : null;
        return d && Number.isFinite(d.getTime()) ? d.getTime() : NaN;
    };
    const formatDate = value => {
        const time = parseDate(value);
        if (!Number.isFinite(time)) return "—";
        return new Intl.DateTimeFormat("en-CA", {
            year: "numeric", month: "2-digit", day: "2-digit", timeZone: "Africa/Cairo"
        }).format(new Date(time));
    };
    // Display-only short Cairo date for the existing CreatedOn column.
    // The source remains UsrRequestApproval.CreatedOn (no new object/field).
    function queueArrivalText(value) {
        const ms = parseDate(value);
        if (!Number.isFinite(ms)) return "—";
        const parts = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Africa/Cairo", year: "numeric", month: "2-digit", day: "2-digit"
        }).formatToParts(new Date(ms));
        const part = type => parts.find(p => p.type === type)?.value || "";
        return `${part("year")}-${part("month")}-${part("day")}`;
    }
    const notify = msg => { if (typeof window !== "undefined") window.alert(msg); };
    const saved = () => typeof document !== "undefined" ? document[RUNTIME_KEY] : undefined;
    const isDesigner = () => {
        if (typeof window === "undefined") return true;
        const rx = /PageDesigner|FreedomUIPageDesigner/i;
        try { if (rx.test(document.referrer || "")) return true; } catch (_) {}
        let w = window;
        for (let i = 0; i < 7; i++) {
            try {
                if (rx.test(w.location.href)) return true;
                if (w.parent === w) break;
                w = w.parent;
            } catch (_) { break; }
        }
        return false;
    };
    // Creatio SDK FilterGroup items are a collection. Flatten before Model.load.
    const flatFilter = f => ({...f, items: f.items});
    const paramsFor = f => [{type: sdk.ModelParameterType.Filter, value: flatFilter(f)}];

    async function queryRows(schema, columns, predicates = [], limit = TASK_LIMIT) {
        const model = await sdk.Model.create(schema);
        let parameters = [];
        if (predicates.length) {
            const fg = new sdk.FilterGroup();
            for (const [col, value] of predicates) {
                await fg.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal, col, value);
            }
            parameters = paramsFor(fg);
        }
        const output = [];
        while (output.length < limit) {
            const size = Math.min(200, limit - output.length);
            const batch = await model.load({
                attributes: columns, parameters,
                options: {pagingConfig: {rowsOffset: output.length, rowCount: size}}
            }) || [];
            output.push(...batch);
            if (batch.length < size) break;
        }
        return output;
    }

    // Only already-persisted task records; no sample data and no synthetic IDs.
    async function taskRows() {
        return queryRows(OBJECT, ["Id", "UsrName", "UsrRequest", "UsrStage",
            "UsrAssignedTo", "UsrAssignedOn", "UsrDueOn", "UsrDecision",
            "UsrIsCompleted", "CreatedOn"], [], TASK_LIMIT);
    }

    async function getRequestMap(rows) {
        const ids = [...new Set(rows.map(r => key(r.UsrRequest)).filter(valid))];
        const results = new Map();
        const model = await sdk.Model.create(REQUEST_OBJECT);
        for (let offset = 0; offset < ids.length; offset += 35) {
            const fg = new sdk.FilterGroup();
            fg.logicalOperation = sdk.LogicalOperatorType.Or;
            for (const requestId of ids.slice(offset, offset + 35)) {
                await fg.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal, "Id", requestId);
            }
            const batch = await model.load({
                attributes: ["Id", "UsrNumber", "UsrName", "UsrContract", "UsrAccount", "UsrProject",
                    "CreatedBy", "CreatedOn"],
                parameters: paramsFor(fg), options: {pagingConfig: {rowsOffset: 0, rowCount: 40}}
            }) || [];
            for (const entry of batch) results.set(key(entry.Id), entry);
        }
        return results;
    }

    // Keep Request ID identical to the existing Financial and Technical Review lists.
    // Saved UsrVMRequest.UsrNumber is authoritative. A missing number may be shown
    // as the SAME provisional (display-only) My Requests code for the current scope.
    // Never save a provisional display code or use it as the record identifier.
    function formatRequestCode(record, provisionalIndex) {
        const d = record?.CreatedOn ? new Date(record.CreatedOn) : null;
        const year = String(d && Number.isFinite(d.getTime()) ? d.getFullYear() : new Date().getFullYear());
        const raw = String(record?.UsrNumber ?? "").trim();
        let code;
        if (/^REQ-\d{4}-\d+$/i.test(raw)) code = raw.toUpperCase();
        else if (/^\d+$/.test(raw)) code = "REQ-" + year + "-" + raw.padStart(4, "0");
        else if (/^REQ-\d+$/i.test(raw)) code = "REQ-" + year + "-" + raw.substring(4).padStart(4, "0");
        else if (raw) code = raw;
        else if (Number.isInteger(provisionalIndex) && provisionalIndex >= 0)
            code = "REQ-" + year + "-" + String(provisionalIndex + 1).padStart(4, "0");
        else code = "—";
        return {code, provisional: !raw && Number.isInteger(provisionalIndex), stored: !!raw};
    }

    function displayedRequestCode(rt, requestId) {
        const rid = key(requestId);
        const request = rt.requests.get(rid);
        if (!request) return {code: "—", provisional: false, stored: false};
        return rt.requestCodes?.get(rid) || formatRequestCode(request);
    }

    async function hydrateRequestCodes(requests) {
        const codes = new Map();
        for (const [rid, row] of requests) {
            if (String(row.UsrNumber ?? "").trim()) codes.set(rid, formatRequestCode(row));
        }
        const missing = [...requests].filter(([rid]) => !codes.has(rid));
        if (!missing.length) return codes;
        try {
            const sys = await new sdk.SysValuesService().loadSysValues();
            const contactId = id(sys?.userContact);
            if (!valid(contactId)) throw Error("Current Contact unavailable for provisional request numbering");
            let authorityId = "";
            const contacts = await queryRows("Contact", ["Id", "Account"], [["Id", contactId]], 1);
            if (contacts.length && valid(contacts[0].Account)) authorityId = id(contacts[0].Account);
            const scope = new sdk.FilterGroup();
            scope.logicalOperation = sdk.LogicalOperatorType.Or;
            await scope.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal, "CreatedBy", contactId);
            if (valid(authorityId)) await scope.addSchemaColumnFilterWithParameter(
                sdk.ComparisonType.Equal, "UsrAccount", authorityId);
            const model = await sdk.Model.create(REQUEST_OBJECT);
            const all = [];
            for (let offset = 0; offset < NUMBERING_LIMIT; offset += 250) {
                const batch = await model.load({
                    attributes: ["Id", "UsrNumber", "CreatedOn"],
                    parameters: paramsFor(scope),
                    options: {pagingConfig: {rowsOffset: offset, rowCount: 250}}
                }) || [];
                all.push(...batch);
                if (batch.length < 250) break;
            }
            if (all.length >= NUMBERING_LIMIT) {
                console.warn("My Tasks: scoped provisional numbering cap reached; do not guess numbers.");
                return codes;
            }
            const byYear = new Map();
            for (const row of all) {
                const d = row.CreatedOn ? new Date(row.CreatedOn) : null;
                const year = String(d && Number.isFinite(d.getTime()) ? d.getFullYear() : new Date().getFullYear());
                if (!byYear.has(year)) byYear.set(year, []);
                byYear.get(year).push(row);
            }
            for (const group of byYear.values()) {
                group.sort((a, b) =>
                    ((new Date(a.CreatedOn).getTime() || 0) - (new Date(b.CreatedOn).getTime() || 0)) ||
                    id(a.Id).localeCompare(id(b.Id)));
                group.forEach((row, index) => {
                    const rid = key(row.Id);
                    if (!codes.has(rid)) codes.set(rid, formatRequestCode(row, index));
                });
            }
        } catch (error) {
            console.warn("My Tasks: cannot reproduce scoped provisional My Requests codes; saved numbers remain valid.", error);
        }
        return codes;
    }

    async function lookupStages() {
        const result = new Map();
        for (const column of ["UsrName", "Name"]) {
            try {
                const rows = await queryRows(STAGE_LOOKUP, ["Id", column], [], 250);
                for (const row of rows) result.set(key(row.Id), label(row[column]));
                if (result.size) break;
            } catch (error) {
                console.warn("My Tasks: stage lookup projection failed", column, error);
            }
        }
        return result;
    }

    function stageType(row, stages) {
        const text = [label(row.UsrStage), stages.get(key(row.UsrStage)) || ""].join(" ");
        if (/financial|finance/i.test(text)) return "financial";
        if (/technical/i.test(text)) return "technical";
        // Provisioning records may NOT be in UsrRequestApproval. Never fabricate them.
        return null;
    }

    async function userContact() {
        const values = await new sdk.SysValuesService().loadSysValues();
        return valid(values?.userContact) ? id(values.userContact) : "";
    }

    async function loadRoleContacts(roleName) {
        const roles = (await queryRows("SysAdminUnit", ["Id", "Name", "SysAdminUnitTypeValue"],
            [["Name", roleName]], 50)).filter(r =>
                norm(r.Name) === roleName.toLowerCase() &&
                Number(r.SysAdminUnitTypeValue) === 6 && valid(r.Id));
        if (roles.length !== 1) throw Error("Unique functional role not found: " + roleName);
        const members = await queryRows("SysUserInRole", ["Id", "SysUser", "SysRole"],
            [["SysRole", id(roles[0].Id)]], 10000);
        if (members.length === 10000) throw Error("Role member limit reached; assignment blocked.");
        const userIds = [...new Set(members.map(r => key(r.SysUser)).filter(valid))];
        const contacts = new Set();
        const userModel = await sdk.Model.create("SysAdminUnit");
        for (let offset = 0; offset < userIds.length; offset += 35) {
            const batch = userIds.slice(offset, offset + 35);
            const fg = new sdk.FilterGroup(); fg.logicalOperation = sdk.LogicalOperatorType.Or;
            for (const uid of batch) await fg.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal, "Id", uid);
            const result = await userModel.load({attributes: ["Id", "Contact", "SysAdminUnitTypeValue"],
                parameters: paramsFor(fg), options: {pagingConfig: {rowsOffset: 0, rowCount: 40}}}) || [];
            for (const unit of result) {
                if (batch.includes(key(unit.Id)) && Number(unit.SysAdminUnitTypeValue) === 4 && valid(unit.Contact)) {
                    contacts.add(key(unit.Contact));
                }
            }
        }
        if (!contacts.size) throw Error("No active user Contacts found in role " + roleName);
        return contacts;
    }

    // Read the *actual* Contacts linked to SysAdminUnit users in the target
    // SysUserInRole functional role. This list is used only for display;
    // persistAssignment re-reads role membership at save time (fail closed).
    async function loadRoleReviewers(type) {
        if (!STAGES[type]) throw Error("Role not configured for this task type.");
        const ids = [...await loadRoleContacts(STAGES[type].role)];
        const result = [];
        const model = await sdk.Model.create("Contact");
        for (let offset = 0; offset < ids.length; offset += 35) {
            const batch = ids.slice(offset, offset + 35);
            const filters = new sdk.FilterGroup();
            filters.logicalOperation = sdk.LogicalOperatorType.Or;
            for (const contactId of batch) {
                await filters.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal, "Id", contactId);
            }
            const rows = await model.load({attributes: ["Id", "Name"],
                parameters: paramsFor(filters),
                options: {pagingConfig: {rowsOffset: 0, rowCount: 40}}}) || [];
            for (const row of rows) {
                if (valid(row.Id) && batch.includes(key(row.Id))) {
                    result.push({id: id(row.Id), name: label(row.Name) || "Unnamed reviewer"});
                }
            }
        }
        if (!result.length) throw Error("No readable Contacts belong to " + STAGES[type].role + ".");
        result.sort((a, b) => a.name.localeCompare(b.name, undefined, {sensitivity: "base"}));
        return result;
    }

    async function ensureEligible(type, contactId) {
        if (!STAGES[type]) throw Error("Assignments for " + type + " are not configured.");
        if (!valid(contactId)) throw Error("A valid Contact is required.");
        const contacts = await loadRoleContacts(STAGES[type].role);
        if (!contacts.has(key(contactId))) throw Error("Selected user is not in " + STAGES[type].role + ".");
        return contacts;
    }

    async function lookupFiltersFor(type) {
        const contacts = await loadRoleContacts(STAGES[type].role);
        const fg = new sdk.FilterGroup();
        fg.logicalOperation = sdk.LogicalOperatorType.Or;
        for (const contactId of contacts) {
            await fg.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal, "Id", contactId);
        }
        return {
            filterAttributes: [{name: "UsrMyTasksRoleContacts", loadOnChange: false}],
            attributesConfig: {UsrMyTasksRoleContacts: {
                value: {...flatFilter(fg), rootSchemaName: "Contact"}
            }}
        };
    }

    async function selectedContact(result) {
        if (!result || result.canceled === true) return null;
        let values = [];
        if (typeof result.getLookupValues === "function") {
            values = await result.getLookupValues({pagingConfig: {rowsOffset: 0, rowCount: 2}});
        } else if (Array.isArray(result)) values = result;
        else if (Array.isArray(result.value)) values = result.value;
        else if (Array.isArray(result.selectedRows)) values = result.selectedRows;
        else if (result.selectedRows && typeof result.selectedRows === "object") values = Object.values(result.selectedRows);
        else if (result.value && typeof result.value === "object") values = Object.values(result.value);
        else if (valid(result)) values = [result];
        else if (typeof result === "object") values = Object.values(result).filter(valid);
        if (!Array.isArray(values)) values = Object.values(values || {});
        const found = values.filter(valid);
        if (found.length > 1) throw Error("Select exactly one reviewer.");
        return found[0] || null;
    }

    async function contactName(contactId) {
        const row = (await queryRows("Contact", ["Id", "Name"], [["Id", contactId]], 1))[0];
        if (!row) throw Error("Selected Contact is not readable.");
        return label(row.Name);
    }

    // Optional read-only VM item count. Auto-probe the real FK, fail closed to '—'.
    async function loadItemCounts(requests) {
        const ids = [...requests.keys()];
        if (!ids.length) return new Map();
        const model = await sdk.Model.create("UsrVMRequestItem");
        for (const fk of ["UsrRequest", "UsrVMRequest"]) {
            const counts = new Map();
            let ok = true;
            try {
                for (let offset = 0; offset < ids.length; offset += 30) {
                    const group = ids.slice(offset, offset + 30);
                    const fg = new sdk.FilterGroup(); fg.logicalOperation = sdk.LogicalOperatorType.Or;
                    for (const rid of group) await fg.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal, fk, rid);
                    let seen = 0;
                    for (let page = 0; page < ITEM_LIMIT_PER_BATCH; page += 200) {
                        const size = Math.min(200, ITEM_LIMIT_PER_BATCH - page);
                        const batch = await model.load({attributes: ["Id", fk], parameters: paramsFor(fg),
                            options: {pagingConfig: {rowsOffset: page, rowCount: size}}}) || [];
                        for (const item of batch) {
                            const rid = key(item[fk]);
                            if (requests.has(rid)) counts.set(rid, (counts.get(rid) || 0) + 1);
                        }
                        seen += batch.length;
                        if (batch.length < size) break;
                    }
                    if (seen >= ITEM_LIMIT_PER_BATCH) { ok = false; break; }
                }
                if (ok) {
                    ids.forEach(rid => { if (!counts.has(rid)) counts.set(rid, 0); });
                    return counts;
                }
            } catch (error) {
                console.debug("My Tasks: cannot read VM item FK " + fk, error);
            }
        }
        return new Map();
    }

    function status(row) {
        const decision = label(row.UsrDecision);
        if (!active(row)) return decision || "Completed";
        if (decision && !/pending|not set|none/i.test(decision)) return decision;
        return valid(row.UsrAssignedTo) ? "Assigned" : "New";
    }
    function isOverdue(row, now = Date.now()) {
        const due = parseDate(row.UsrDueOn);
        return active(row) && Number.isFinite(due) && due < now;
    }
    function isApproaching(row, now = Date.now()) {
        const due = parseDate(row.UsrDueOn);
        return active(row) && Number.isFinite(due) && due >= now && due <= now + 24 * 3600000;
    }
    function selectionBase(rt) {
        return rt.rows.filter(row => !!stageType(row, rt.stages));
    }
    function selectedType(rt) {
        return selectionBase(rt).filter(row => rt.type === "all" || stageType(row, rt.stages) === rt.type);
    }
    function belongsMine(rt, row) { return valid(rt.contactId) && key(row.UsrAssignedTo) === key(rt.contactId); }
    function matchesTab(rt, row, tab) {
        if (tab === "team") return true; // All readable tasks in the review queues, including completed.
        if (tab === "mine") return active(row) && belongsMine(rt, row);
        if (tab === "unassigned") return active(row) && !valid(row.UsrAssignedTo);
        if (tab === "approaching") return isApproaching(row);
        if (tab === "overdue") return isOverdue(row);
        if (tab === "completed") return !active(row);
        return false;
    }
    function matchesSearch(rt, row) {
        const term = rt.search.toLowerCase().trim();
        if (!term) return true;
        const req = rt.requests.get(key(row.UsrRequest)) || {};
        return [row.UsrName, row.UsrStage, row.UsrAssignedTo, row.UsrDecision,
            displayedRequestCode(rt, row.UsrRequest).code, req.UsrNumber, req.UsrName, req.UsrContract, req.UsrAccount, req.UsrProject]
            .some(value => norm(value).includes(term));
    }
    function visibleRows(rt) {
        return selectedType(rt).filter(row => matchesTab(rt, row, rt.filter) && matchesSearch(rt, row));
    }
    function updateLabels(rt) {
        const base = selectedType(rt);
        const counts = {};
        for (const tab of FILTERS) counts[tab] = base.filter(row => matchesTab(rt, row, tab)).length;
        for (const tab of FILTERS) {
            rt.ctx["MT_Chip_" + tab] = FILTER_CAPTIONS[tab] + "  " + counts[tab];
            rt.ctx["MT_Style_" + tab] = tab === rt.filter ? "contained" : "text";
        }
        const visible = visibleRows(rt).length;
        rt.ctx.MT_TypeCaption = TYPE_CAPTIONS[rt.type];
        rt.ctx.MT_Footer = "Showing " + visible + " task" + (visible === 1 ? "" : "s") +
            " · " + base.length + " available in selected task type";
        const notices = [];
        if (rt.truncated) notices.push("Only the first " + TASK_LIMIT + " approval records were loaded. Counts may be incomplete.");
        if (rt.type === "provisioning") notices.push("Provisioning source is pending the separate Provisioning module merge; no fabricated records are shown.");
        if (!rt.contactId) notices.push("Cannot resolve signed-in Contact; Assigned to Me will be empty.");
        if (base.length === 0 && rt.type !== "provisioning") notices.push("No persisted Financial/Technical approval tasks are available to this user.");
        rt.ctx.MT_Notice = notices.join("  ");
        // Only the style of the current tab is changed; counts are based on real persisted rows.
        try { document.body?.setAttribute("data-usr-mt-filter", rt.filter); } catch (_) {}
    }

    async function reloadPDS(ctx) {
        return ctx.executeRequest({type: "crt.LoadDataRequest", dataSourceName: "PDS", $context: ctx,
            config: {loadType: "reload", useLastLoadParameters: false}});
    }

    async function findTask(rt, proposed) {
        let taskId = id(proposed);
        if (!valid(taskId)) taskId = id(await rt.ctx.DataTable_ActiveRow);
        if (!valid(taskId)) {
            const selection = await rt.ctx.DataTable_SelectionState;
            if (selection?.type === "specific" && selection.selected?.length === 1) taskId = id(selection.selected[0]);
        }
        if (!valid(taskId)) throw Error("Select exactly one task in the table.");
        const row = rt.rows.find(r => key(r.Id) === key(taskId));
        if (!row || !stageType(row, rt.stages)) throw Error("Selected task is not a configured Financial/Technical approval.");
        return row;
    }

    async function persistAssignment(rt, taskId, contactId, previousAssignee) {
        const original = await findTask(rt, taskId);
        const type = stageType(original, rt.stages);
        if (!active(original)) throw Error("Completed tasks cannot be assigned or reassigned.");
        await ensureEligible(type, contactId);
        // Reload immediately before write: no overwriting somebody else's assignment.
        const fresh = (await queryRows(OBJECT, ["Id", "UsrStage", "UsrAssignedTo", "UsrIsCompleted"],
            [["Id", id(original.Id)]], 1))[0];
        if (!fresh || !active(fresh) || key(fresh.UsrStage) !== key(original.UsrStage)) {
            throw Error("Task stage or completion changed. Refresh and try again.");
        }
        if (key(fresh.UsrAssignedTo) !== key(previousAssignee)) {
            throw Error("Task assignment changed since you opened it. Refresh before assigning.");
        }
        const model = await sdk.Model.create(OBJECT);
        const response = await model.update(
            {UsrAssignedTo: id(contactId), UsrAssignedOn: new Date()},
            [{type: sdk.ModelParameterType.PrimaryColumnValue, value: id(original.Id)}]
        );
        if (response === false || response?.success === false || response?.rowsAffected === 0) {
            throw Error("Creatio did not accept the assignment update.");
        }
        const confirmed = (await queryRows(OBJECT, ["Id", "UsrAssignedTo"], [["Id", id(original.Id)]], 1))[0];
        if (key(confirmed?.UsrAssignedTo) !== key(contactId)) {
            throw Error("Assignment could not be verified after saving. Check Creatio rights and the BPMN.");
        }
        return true;
    }

    async function openTask(rt, taskId) {
        const row = await findTask(rt, taskId);
        const type = stageType(row, rt.stages);
        const page = STAGES[type]?.page;
        if (!page) throw Error("The actual " + type + " task form is not yet configured.");
        const dest = "Page/" + page + "/edit/" + encodeURIComponent(id(row.Id));
        if (window.location.hash.replace(/^#/, "") !== dest) window.location.hash = dest;
    }

    // Both Assign to Me and Reassign now open the same real, role-scoped
    // reviewer list in the native Freedom UI modal, matching the provided Figma.
    // No writes happen until the user explicitly confirms a selected Contact.
    async function beginAssignmentDialog(rt, taskId, mode) {
        const row = await findTask(rt, taskId);
        const type = stageType(row, rt.stages);
        if (!active(row)) throw Error("Completed tasks cannot be assigned or reassigned.");
        if (mode === "assign" && valid(row.UsrAssignedTo)) {
            throw Error("This task is already assigned. Use Reassign instead.");
        }
        if (mode === "reassign" && !valid(row.UsrAssignedTo)) {
            throw Error("This task is unassigned. Use Assign to Me.");
        }
        // As in the Financial Queue, the TARGET user must be in the matching
        // reviewer role, but an authorized queue manager need not belong to
        // that role to assign it. Creatio's actual entity/column permissions
        // authorize or reject the write; never bypass those server checks.
        const current = ++rt.dialogNonce;
        const people = await loadRoleReviewers(type);
        if (rt.disposed || saved() !== rt || rt.dialogNonce !== current) return;
        rt.reviewers = people;
        rt.selectedReviewerId = "";
        rt.assignedMode = mode;
        rt.assignedTaskId = id(row.Id);
        rt.previousAssignee = mode === "reassign" ? id(row.UsrAssignedTo) : "";
        rt.ctx.MT_AssignHeading = (mode === "assign" ? "Assign Task " : "Reassign Task ") +
            (label(row.UsrName) || displayedRequestCode(rt, row.UsrRequest).code);
        rt.ctx.MT_AssignDetail = STAGES[type].role;
        rt.ctx.MT_SelectedPerson = "No reviewer selected";
        rt.ctx.MT_SelectedPersonId = "";
        rt.ctx.MT_AssignVisible = true;
        // The native modal is instantiated asynchronously by Freedom UI.
        // MutationObserver also calls renderReviewerList after it appears.
        rt.refreshReviewers?.();
    }

    async function assignMe(rt, taskId) {
        return beginAssignmentDialog(rt, taskId, "assign");
    }

    async function beginReassign(rt, taskId) {
        return beginAssignmentDialog(rt, taskId, "reassign");
    }

    async function pickReviewer(rt, req) {
        if (!rt.assignedTaskId || rt.pickerOpen) return;
        const row = await findTask(rt, rt.assignedTaskId);
        const type = stageType(row, rt.stages);
        rt.pickerOpen = true;
        rt.ctx.MT_AssignVisible = false; // Native lookup must not be blocked by custom overlay.
        try {
            const filters = await lookupFiltersFor(type); // fail closed before showing Contact page
            await new Promise(done => setTimeout(done, 0));
            await rt.ctx.executeRequest({
                type: "crt.OpenLookupPageRequest", $context: rt.ctx, scopes: [...(req.scopes || [])],
                entitySchemaName: "Contact", caption: "Choose " + STAGES[type].role,
                filtersConfig: filters,
                features: {select: {multiple: false, selectAll: false, resultType: "lookupValues"},
                    create: {enabled: false}},
                afterClosed: async (selection) => {
                    try {
                        if (rt.disposed || saved() !== rt) return;
                        const chosen = await selectedContact(selection);
                        if (!chosen) return;
                        await ensureEligible(type, id(chosen));
                        const display = await contactName(id(chosen));
                        rt.ctx.MT_SelectedPersonId = id(chosen);
                        rt.ctx.MT_SelectedPerson = display;
                    } catch (error) {
                        console.error("My Tasks reviewer selection", error);
                        notify("Reviewer selection failed: " + (error.message || error));
                    } finally {
                        rt.pickerOpen = false;
                        if (!rt.disposed && saved() === rt && rt.assignedTaskId) rt.ctx.MT_AssignVisible = true;
                    }
                }
            });
        } catch (error) {
            rt.pickerOpen = false;
            if (!rt.disposed && saved() === rt) rt.ctx.MT_AssignVisible = true;
            throw error;
        }
    }

    async function commitAssignment(rt) {
        if (!rt.assignedTaskId || rt.busy || rt.savingAssignment) return;
        const selectedId = id(await rt.ctx.MT_SelectedPersonId);
        if (!valid(selectedId)) throw Error("Select a reviewer from the role list first.");
        if (!rt.reviewers.some(person => key(person.id) === key(selectedId))) {
            throw Error("Selected reviewer is not in this task's eligible role list.");
        }
        const pending = rt.assignedTaskId, prior = rt.previousAssignee;
        const mode = rt.assignedMode;
        rt.savingAssignment = true;
        try {
            // Fresh state and fresh role membership are re-validated in persistAssignment.
            await persistAssignment(rt, pending, selectedId, prior);
            closeDialog(rt);
            await rt.refresh();
            notify((mode === "reassign" ? "Reassignment" : "Assignment") +
                " saved and verified. This is a queue assignment; native SysApproval is unchanged.");
        } finally {
            rt.savingAssignment = false;
        }
    }

    function closeDialog(rt) {
        ++rt.dialogNonce;
        rt.assignedTaskId = "";
        rt.assignedMode = "";
        rt.reviewers = [];
        rt.selectedReviewerId = "";
        rt.previousAssignee = "";
        rt.pickerOpen = false;
        rt.ctx.MT_AssignVisible = false;
        rt.ctx.MT_SelectedPersonId = "";
        rt.ctx.MT_SelectedPerson = "No reviewer selected";
    }

    // The modal's heading, footer and list host are native Page Designer
    // components. Only variable-length reviewer radio rows are runtime-filled.
    function renderReviewerList(rt) {
        if (!rt || rt.disposed || !rt.assignedTaskId) return;
        const host = [...document.querySelectorAll(".usr-mt-reviewer-list")]
            .find(node => node.isConnected && node.getClientRects().length);
        if (!host) return;
        const people = rt.reviewers || [];
        const selected = key(rt.selectedReviewerId || "");
        const stamp = rt.assignedTaskId + "|" + selected + "|" +
            people.map(person => key(person.id)).join(",");
        if (host.dataset.mtReviewerStamp === stamp && host.children.length === people.length) return;
        const nodes = people.map(person => {
            const option = document.createElement("button");
            option.type = "button";
            option.className = "usr-mt-reviewer-option";
            option.setAttribute("role", "radio");
            option.setAttribute("aria-checked", key(person.id) === selected ? "true" : "false");
            option.dataset.mtReviewerId = id(person.id);
            const circle = document.createElement("span");
            circle.className = "usr-mt-reviewer-radio";
            circle.setAttribute("aria-hidden", "true");
            const avatar = document.createElement("span");
            avatar.className = "usr-mt-reviewer-avatar";
            const initials = person.name.split(/\s+/).filter(Boolean).slice(0, 2)
                .map(part => part[0] || "").join("").toUpperCase();
            avatar.textContent = initials || "U";
            avatar.setAttribute("aria-hidden", "true");
            const name = document.createElement("span");
            name.className = "usr-mt-reviewer-name";
            name.textContent = person.name; // textContent, no HTML injection
            option.append(circle, avatar, name);
            option.addEventListener("click", () => {
                if (rt.disposed || !rt.assignedTaskId || rt.savingAssignment) return;
                // Selection is client-only until Assign is clicked. Commit verifies again.
                rt.selectedReviewerId = id(person.id);
                rt.ctx.MT_SelectedPersonId = id(person.id);
                rt.ctx.MT_SelectedPerson = person.name;
                rt.refreshReviewers?.();
            });
            return option;
        });
        host.replaceChildren(...nodes);
        host.dataset.mtReviewerStamp = stamp;
        host.setAttribute("role", "radiogroup");
        host.setAttribute("aria-label", "Eligible reviewers for this task role");
    }

    // DOM enhancement is intentionally restricted to table decoration & inline actions;
    // all base columns, filters, popup and data bindings remain native in Page Designer.
    const cellSelectors = code => `.cdk-column-${code},[data-column-code="${code}"],[data-column-id="${code}"]`;
    const getCell = (row, code) => row.querySelector(cellSelectors(code));
    function resolveRenderedRow(rt, el) {
        const row = el?.closest("tr,[role='row']");
        if (!row) return null;
        // Prefer a real Creatio row GUID; never associate actions using row order.
        for (const element of [row, ...row.querySelectorAll("[row-id],[data-row-id],[data-id],[data-record-id],[data-row-key]")]) {
            for (const attr of ["row-id", "data-row-id", "data-id", "data-record-id", "data-row-key"]) {
                const guid = element.getAttribute?.(attr);
                if (valid(guid)) return visibleRows(rt).find(r => key(r.Id) === key(guid)) || null;
            }
        }
        const task = norm(getCell(row, "PDS_UsrName")?.textContent);
        const nativeRequest = norm(getCell(row, "PDS_UsrRequest_UsrNumber")?.textContent);
        const displayedRequest = norm(row.querySelector("[data-mt-field='requestid']")?.textContent);
        const request = (nativeRequest && nativeRequest !== "—") ? nativeRequest :
            (displayedRequest && displayedRequest !== "—" ? displayedRequest : "");
        const stage = norm(getCell(row, "PDS_UsrStage")?.textContent);
        const contract = norm(getCell(row, "PDS_UsrRequest_UsrContract")?.textContent);
        const authority = norm(getCell(row, "PDS_UsrRequest_UsrAccount")?.textContent);
        const project = norm(getCell(row, "PDS_UsrRequest_UsrProject")?.textContent);
        const displayMatches = (rendered, actual) => {
            if (!rendered) return true;
            if (rendered === norm(actual)) return true;
            // Creatio may truncate the VISIBLE DOM string using an ellipsis.
            if (/(\.\.\.|…)$/.test(rendered)) {
                const prefix = rendered.replace(/(\.\.\.|…)$/, "").trim();
                return !!prefix && norm(actual).startsWith(prefix);
            }
            return false;
        };
        const assigned = norm(getCell(row, "PDS_UsrAssignedTo")?.textContent);
        const arrival = norm(getCell(row, "PDS_CreatedOn")?.textContent);
        const candidates = visibleRows(rt).filter(record => {
            const req = rt.requests.get(key(record.UsrRequest)) || {};
            if (task && norm(record.UsrName) !== task) return false;
            if (request && norm(displayedRequestCode(rt, record.UsrRequest).code) !== request &&
                norm(req.UsrNumber) !== request) return false;
            if (stage && norm(record.UsrStage) !== stage &&
                !norm(record.UsrStage).includes(stage)) return false;
            if (contract && !displayMatches(contract, req.UsrContract)) return false;
            if (authority && !displayMatches(authority, req.UsrAccount)) return false;
            if (project && !displayMatches(project, req.UsrProject)) return false;
            if (assigned && norm(record.UsrAssignedTo) !== assigned) return false;
            // Date is only a tie-breaker. Native formatting is locale-specific.
            if (arrival && !norm(record.CreatedOn).includes(arrival)) {
                const d = parseDate(record.CreatedOn);
                if (Number.isFinite(d)) {
                    const local = new Intl.DateTimeFormat("en-US", {
                        year: "numeric", month: "numeric", day: "numeric", timeZone: "Africa/Cairo"
                    }).formatToParts(new Date(d));
                    const dateParts = local.filter(p => ["year", "month", "day"].includes(p.type))
                        .map(p => Number(p.value));
                    const visibleNums = arrival.match(/\d+/g) || [];
                    if (visibleNums.length >= 3 && !dateParts.every(n => visibleNums.includes(String(n)) ||
                        visibleNums.includes(String(n).padStart(2, "0")))) return false;
                }
            }
            return true;
        });
        return (task || request) && candidates.length === 1 ? candidates[0] : null;
    }

    function modifyCell(row, code, text, variant) {
        const cell = getCell(row, code);
        if (!cell) return;
        const value = String(text ?? "—");
        if (cell.dataset.mtDecorated !== value + "|" + variant) {
            cell.textContent = value;
            cell.dataset.mtDecorated = value + "|" + variant;
        }
        cell.classList.remove("usr-mt-pill-green", "usr-mt-pill-red", "usr-mt-pill-orange", "usr-mt-pill-gray");
        if (variant) cell.classList.add("usr-mt-pill-" + variant);
    }
    function slaText(row) {
        if (!active(row)) return {text: "—", variant: "gray"};
        const due = parseDate(row.UsrDueOn);
        if (!Number.isFinite(due)) return {text: "—", variant: "gray"};
        const diff = due - Date.now();
        const hours = Math.ceil(Math.abs(diff) / 3600000);
        return diff < 0 ? {text: hours + "h overdue", variant: "red"} :
            diff <= 24 * 3600000 ? {text: hours + "h left", variant: "orange"} :
                {text: hours + "h left", variant: "green"};
    }

    function installGridEnhancement(rt) {
        if (typeof document === "undefined" || !document.body) return;
        const scope = ".usr-mt-datagrid";
        const colSpecs = [
            {field: "items", title: "Items", width: "48px", reference: "PDS_CreatedOn"},
            {field: "actions", title: "Actions", width: "160px", reference: null}
        ];
        // Use the already-bound native Request ID column. Do NOT add a second
        // runtime Request ID track: Creatio retained the hidden original track
        // and created the blank gap seen before Task ID in v4.
        const nativeWidths = [
            {code: "PDS_UsrRequest_UsrNumber", width: 122, caption: "Request ID"},
            {code: "PDS_UsrName", width: 126, caption: "Task ID"},
            {code: "PDS_UsrStage", width: 111, caption: "Task Type"},
            {code: "PDS_UsrRequest_UsrContract", width: 94, caption: "Contract"},
            {code: "PDS_UsrRequest_UsrAccount", width: 130, caption: "Authority"},
            {code: "PDS_UsrRequest_UsrProject", width: 120, caption: "Project"},
            {code: "PDS_CreatedOn", width: 116, caption: "Queue Arrival"},
            {code: "PDS_UsrAssignedTo", width: 115, caption: "Assigned To"},
            {code: "PDS_UsrDueOn", width: 70, caption: "SLA"},
            {code: "PDS_UsrDecision", width: 128, caption: "Status / Decision"}
        ];
        function makeCell(row, field, heading) {
            const attr = heading ? "data-mt-heading" : "data-mt-field";
            let node = row.querySelector(`[${attr}="${field}"]`);
            if (!node) {
                const tableRow = row.tagName.toLowerCase() === "tr";
                node = document.createElement(tableRow ? (heading ? "th" : "td") : "div");
                node.setAttribute(attr, field);
                if (!tableRow) node.setAttribute("role", heading ? "columnheader" : "gridcell");
                node.className = "usr-mt-extra usr-mt-extra-" + field;
                if (heading) node.textContent = colSpecs.find(s => s.field === field).title;
            }
            return node;
        }
        function insertAt(row, node, reference) {
            const before = reference ? getCell(row, reference) : null;
            if (before) {
                if (node.parentElement !== row || node.nextElementSibling !== before) row.insertBefore(node, before);
            } else if (node.parentElement !== row || node.nextElementSibling !== null) row.appendChild(node);
        }
        // Keep the real native Queue Arrival column and Page Designer binding.
        // Certain Creatio colgroup/personalization layouts omit or visually clip
        // its header while still rendering the CreatedOn dates in data rows.
        // Only supply a label if the native heading is blank; never replace the
        // bound field with a second, unrelated runtime data source.
        function repairQueueArrivalHeading(heading) {
            const cell = getCell(heading, "PDS_CreatedOn");
            if (!cell) return;
            cell.classList.add("usr-mt-queue-arrival-column", "usr-mt-queue-arrival-heading");
            cell.setAttribute("title", "Queue Arrival");
            if (norm(cell.textContent).includes("queue arrival")) return;
            if (!cell.querySelector("[data-mt-arrival-caption]")) {
                const text = document.createElement("span");
                text.dataset.mtArrivalCaption = "";
                text.className = "usr-mt-queue-arrival-caption";
                text.textContent = "Queue Arrival";
                cell.appendChild(text);
            }
        }
        function alignColgroup(table, heading) {
            if (table.tagName.toLowerCase() !== "table" || !heading) return;
            const group = table.querySelector(":scope > colgroup");
            if (!group) return;
            // Give every inserted cell a dedicated track. Never borrow the
            // checkbox track or the final native Status/Decision track.
            for (const spec of colSpecs) {
                let col = group.querySelector(`col[data-mt-col="${spec.field}"]`);
                if (!col) {
                    col = document.createElement("col");
                    col.dataset.mtCol = spec.field;
                }
                const header = heading.querySelector(`[data-mt-heading="${spec.field}"]`);
                if (!header) continue;
                const index = [...heading.children].indexOf(header);
                const otherCols = [...group.children].filter(c => c !== col);
                const before = otherCols[index] || null;
                if (col.parentElement !== group || col.nextElementSibling !== before) group.insertBefore(col, before);
                col.style.setProperty("width", spec.width, "important");
                col.style.setProperty("min-width", spec.width, "important");
            }
        }
        // Align every native header/body column with the corresponding colgroup
        // track. Do not touch native data attributes, filters, events or records.
        // This is a visual density adjustment, not a custom replacement table.
        function compactNativeColumns(table, heading, rows) {
            const tracks = [
                ...nativeWidths.map(s => ({selector: cellSelectors(s.code), width: s.width, caption: s.caption})),
                {selector: '[data-mt-heading="items"],[data-mt-field="items"]', width: 48, caption: "Items"},
                {selector: '[data-mt-heading="actions"],[data-mt-field="actions"]', width: 160, caption: "Actions"}
            ];
            const headCells = [...heading.children];
            const group = table.tagName.toLowerCase() === "table" ? table.querySelector(":scope > colgroup") : null;
            const cols = group ? [...group.children].filter(c => c.tagName.toLowerCase() === "col") : [];
            const aligned = cols.length === headCells.length;
            let knownWidth = 0;
            let unknownWidth = 0;
            for (let i = 0; i < headCells.length; i++) {
                const head = headCells[i];
                const spec = tracks.find(t => head.matches(t.selector));
                if (!spec) {
                    unknownWidth += 35; // Native checkbox/row-number/toolbar track
                    continue;
                }
                const px = spec.width + "px";
                const members = [head, ...rows.map(row => row.querySelector(spec.selector)).filter(Boolean)];
                for (const cell of members) {
                    cell.style.setProperty("box-sizing", "border-box", "important");
                    cell.style.setProperty("width", px, "important");
                    cell.style.setProperty("min-width", px, "important");
                    cell.style.setProperty("max-width", px, "important");
                    cell.style.setProperty("overflow", "hidden", "important");
                    cell.style.setProperty("text-overflow", "ellipsis", "important");
                }
                head.title = spec.caption;
                if (aligned) {
                    cols[i].style.setProperty("width", px, "important");
                    cols[i].style.setProperty("min-width", px, "important");
                    cols[i].style.setProperty("max-width", px, "important");
                }
                knownWidth += spec.width;
            }
            if (table.tagName.toLowerCase() === "table") {
                table.style.setProperty("table-layout", "fixed", "important");
                table.style.setProperty("min-width", Math.ceil(knownWidth + unknownWidth) + "px", "important");
            }
        }
        function createAction(container, action, caption, taskId, colorClass) {
            const button = document.createElement("button");
            button.type = "button";
            button.dataset.mtAction = action;
            button.dataset.mtTaskId = taskId;
            button.textContent = caption;
            button.className = "usr-mt-action usr-mt-action-" + colorClass;
            container.appendChild(button);
        }
        function decorateActions(cell, record) {
            const signature = [key(record.Id), key(record.UsrAssignedTo), active(record)].join("|");
            if (cell.dataset.mtSignature === signature) return;
            cell.dataset.mtSignature = signature;
            cell.replaceChildren();
            createAction(cell, "open", "Open", id(record.Id), "open");
            if (active(record) && !valid(record.UsrAssignedTo))
                createAction(cell, "assign", "Assign to Me", id(record.Id), "assign");
            else if (active(record) && valid(record.UsrAssignedTo))
                createAction(cell, "reassign", "Reassign", id(record.Id), "reassign");
        }
        function decorateRequestId(cell, record) {
            const code = displayedRequestCode(rt, record.UsrRequest);
            const buttonId = id(record.Id);
            let button = cell.querySelector("button[data-mt-request-id]");
            if (!button || button.dataset.mtTaskId !== buttonId) {
                cell.replaceChildren();
                button = document.createElement("button");
                button.type = "button";
                button.dataset.mtRequestId = "";
                button.dataset.mtTaskId = buttonId;
                button.className = "usr-mt-request-link";
                cell.appendChild(button);
            }
            if (button.textContent !== code.code) button.textContent = code.code;
            button.disabled = code.code === "—";
            button.title = code.provisional ?
                "Display-only My Requests number; UsrVMRequest.UsrNumber is not saved. Configure permanent numbering." :
                code.stored ? "Persisted UsrVMRequest.UsrNumber" : "Request number is unavailable for this record";
            button.classList.toggle("usr-mt-request-provisional", code.provisional);
        }
        function updateTable(table) {
            const heading = table.querySelector("thead tr") || [...table.querySelectorAll("[role='row']")]
                .find(row => row.querySelector("th,[role='columnheader']"));
            if (!heading) return;
            const rows = [...table.querySelectorAll("tbody tr,[role='row']")]
                .filter(row => !row.closest("thead") && !row.querySelector("[role='columnheader']") &&
                    row.querySelector("td,[role='gridcell']"));
            const resolved = rows.map(row => ({row, record: resolveRenderedRow(rt, row)}));
            if (!resolved.some(item => !!item.record)) return;
            // The native Request ID column is now displayed directly, followed
            // immediately by Task ID; no ghost/hidden column is inserted.
            for (const spec of colSpecs) insertAt(heading, makeCell(heading, spec.field, true), spec.reference);
            alignColgroup(table, heading);
            repairQueueArrivalHeading(heading);
            for (const {row, record} of resolved) {
                if (!record) {
                    row.querySelectorAll("[data-mt-field]").forEach(cell => cell.remove());
                    continue; // Never bind actions to an ambiguous row.
                }
                for (const spec of colSpecs) {
                    const cell = makeCell(row, spec.field, false);
                    insertAt(row, cell, spec.reference);
                    if (spec.field === "items") {
                        const count = rt.items.get(key(record.UsrRequest));
                        const countText = Number.isInteger(count) ? String(count) : "—";
                        if (cell.textContent !== countText) cell.textContent = countText;
                    } else decorateActions(cell, record);
                }
                // Decorate the real native Request ID cell with the same
                // persisted/provisional display code as Financial/Technical.
                const nativeRequestCell = getCell(row, "PDS_UsrRequest_UsrNumber");
                if (nativeRequestCell) decorateRequestId(nativeRequestCell, record);
                // Keep the bound CreatedOn field, with a concise untruncated
                // date like Figma. Never derive queue arrival from SLA.
                const arrivalCell = getCell(row, "PDS_CreatedOn");
                if (arrivalCell) arrivalCell.classList.add("usr-mt-queue-arrival-column");
                modifyCell(row, "PDS_CreatedOn", queueArrivalText(record.CreatedOn));
                const sla = slaText(record);
                modifyCell(row, "PDS_UsrDueOn", sla.text, sla.variant);
                modifyCell(row, "PDS_UsrDecision", status(record), "gray");
                const taskCell = getCell(row, "PDS_UsrName");
                if (taskCell) taskCell.title = label(record.UsrName) || "Task ID not saved";
            }
            compactNativeColumns(table, heading, rows);
            // Keep the native DataTable; classes only decorate its DOM.
            table.classList.add("usr-mt-table-enhanced");
        }
        function schedule() {
            if (rt.disposed || rt.scheduled) return;
            rt.scheduled = true;
            rt.clock = setTimeout(() => {
                rt.scheduled = false;
                if (!rt.disposed && rt.ready) {
                    const holder = document.querySelector(scope);
                    if (holder) {
                        const tables = [...holder.querySelectorAll("table")].filter(t => t.querySelector("tbody"));
                        if (tables.length) tables.forEach(updateTable);
                        else {
                            const grid = holder.querySelector("[role='grid']");
                            if (grid) updateTable(grid);
                        }
                    }
                    rt.refreshDock?.();
                    rt.refreshReviewers?.();
                }
            }, 60);
        }
        rt.inlineObserver = new MutationObserver(() => {
            schedule();
            rt.refreshDock?.();
            rt.refreshReviewers?.();
        });
        rt.inlineObserver.observe(document.body, {childList: true, subtree: true});
        rt.inlineClick = event => {
            const button = event.target instanceof Element ?
                event.target.closest("button[data-mt-action],button[data-mt-request-id]") : null;
            if (!button || (!button.closest(scope) && !button.closest(".usr-mt-actions-dock"))) return;
            event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
            if (button.disabled || rt.disposed || rt.busy) return;
            const dockButton = !!button.closest(".usr-mt-actions-dock");
            const record = dockButton ? visibleRows(rt).find(row =>
                key(row.Id) === key(button.dataset.mtTaskId) &&
                rt.dockRecords.has(key(row.Id))) : resolveRenderedRow(rt, button);
            if (!record || key(record.Id) !== key(button.dataset.mtTaskId)) {
                notify("Task row could not be uniquely verified. Reload the table."); return;
            }
            // Request ID opens the SAME type-specific review page as Open.
            rt.perform(button.hasAttribute("data-mt-request-id") ? "open" :
                button.dataset.mtAction, id(record.Id));
        };
        document.addEventListener("click", rt.inlineClick, true);
        rt.minuteClock = setInterval(() => { if (!rt.disposed) { updateLabels(rt); schedule(); } }, 60000);
        rt.refreshInline = () => { schedule(); rt.refreshDock?.(); };
        schedule();
    }

    // Fixed-position action rail renders *above* the visible right edge of
    // Creatio's horizontally scrollable DataTable. Unlike a sticky <td>, it
    // is not constrained by Creatio's nested colgroup / split scroll layouts.
    // It tracks the actual DOM row rectangles, and never derives task IDs
    // from row ordinal positions. All business actions still use findTask.
    function installActionsDock(rt) {
        const holderSelector = ".usr-mt-datagrid";
        const WIDTH = 160;
        function makeAction(parent, action, title, taskId) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "usr-mt-action usr-mt-action-" + (action === "assign" ? "assign" : action);
            btn.dataset.mtAction = action;
            btn.dataset.mtTaskId = taskId;
            btn.textContent = title;
            parent.appendChild(btn);
        }
        function makeDockRow(record) {
            const item = document.createElement("div");
            item.className = "usr-mt-dock-row";
            item.dataset.mtDockId = id(record.Id);
            makeAction(item, "open", "Open", id(record.Id));
            if (active(record) && !valid(record.UsrAssignedTo))
                makeAction(item, "assign", "Assign to Me", id(record.Id));
            else if (active(record) && valid(record.UsrAssignedTo))
                makeAction(item, "reassign", "Reassign", id(record.Id));
            return item;
        }
        rt.dock = document.createElement("div");
        rt.dock.className = "usr-mt-actions-dock";
        rt.dock.style.display = "none";
        document.body.appendChild(rt.dock);
        rt.dockRecords = new Set();
        function synchronize() {
            const holder = document.querySelector(holderSelector);
            if (!holder || !rt.ready || rt.disposed) {
                rt.dock.style.display = "none";
                holder?.classList.remove("usr-mt-actions-docked");
                return;
            }
            const holderRect = holder.getBoundingClientRect();
            const top = Math.max(0, holderRect.top);
            const bottom = Math.min(window.innerHeight, holderRect.bottom);
            if (bottom <= top || holderRect.right <= 0 || holderRect.left >= window.innerWidth) {
                rt.dock.style.display = "none"; return;
            }
            const table = [...holder.querySelectorAll("table")].find(node => node.querySelector("tbody tr")) ||
                holder.querySelector("[role='grid']");
            const head = table?.querySelector("thead tr") || [...(table?.querySelectorAll("[role='row']") || [])]
                .find(row => row.querySelector("th,[role='columnheader']"));
            if (!table || !head) {
                rt.dock.style.display = "none";
                holder.classList.remove("usr-mt-actions-docked");
                return;
            }
            const sourceRows = [...table.querySelectorAll("tbody tr,[role='row']")]
                .filter(row => !row.closest("thead") && !row.querySelector("[role='columnheader']") &&
                    row.querySelector("td,[role='gridcell']"));
            const resolved = sourceRows.map(row => ({row, record: resolveRenderedRow(rt, row)}))
                .filter(pair => !!pair.record);
            if (!resolved.length) {
                rt.dock.style.display = "none";
                holder.classList.remove("usr-mt-actions-docked");
                return;
            }
            const stamp = resolved.map(pair => [key(pair.record.Id),
                key(pair.record.UsrAssignedTo), active(pair.record)].join(":" )).join("|");
            if (rt.dock.dataset.mtDockStamp !== stamp) {
                const heading = document.createElement("div");
                heading.className = "usr-mt-dock-header";
                heading.textContent = "Actions";
                const nodes = [heading, ...resolved.map(pair => makeDockRow(pair.record))];
                rt.dock.replaceChildren(...nodes);
                rt.dock.dataset.mtDockStamp = stamp;
            }
            rt.dockRecords = new Set(resolved.map(pair => key(pair.record.Id)));
            rt.dock.style.left = Math.round(Math.max(0,
                Math.min(window.innerWidth - WIDTH, holderRect.right - WIDTH - 2))) + "px";
            rt.dock.style.top = Math.round(top) + "px";
            rt.dock.style.width = WIDTH + "px";
            rt.dock.style.height = Math.round(bottom - top) + "px";
            const headerRect = head.getBoundingClientRect();
            const heading = rt.dock.firstElementChild;
            if (heading) {
                heading.style.top = Math.round(headerRect.top - top) + "px";
                heading.style.height = Math.max(30, Math.round(headerRect.height)) + "px";
                heading.style.display = headerRect.bottom > top && headerRect.top < bottom ? "flex" : "none";
            }
            const dockRows = rt.dock.querySelectorAll(".usr-mt-dock-row");
            resolved.forEach(({row}, i) => {
                const rowRect = row.getBoundingClientRect();
                const target = dockRows[i];
                if (!target) return;
                target.style.top = Math.round(rowRect.top - top) + "px";
                target.style.height = Math.round(rowRect.height) + "px";
                target.style.display = rowRect.bottom > Math.max(headerRect.bottom, top) &&
                    rowRect.top < bottom ? "flex" : "none";
            });
            rt.dock.style.display = "block";
            holder.classList.add("usr-mt-actions-docked");
        }
        let raf = 0;
        rt.refreshDock = () => {
            if (rt.disposed || raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                if (!rt.disposed) synchronize();
            });
        };
        rt.removeDockListeners = () => {
            if (raf) cancelAnimationFrame(raf);
            document.removeEventListener("scroll", rt.refreshDock, true);
            window.removeEventListener("resize", rt.refreshDock);
            document.querySelector(holderSelector)?.classList.remove("usr-mt-actions-docked");
            rt.dock?.remove();
        };
        document.addEventListener("scroll", rt.refreshDock, true);
        window.addEventListener("resize", rt.refreshDock);
        rt.refreshDock();
    }

    const CSS = `
    .usr-mt-root {padding:18px 20px 22px!important;gap:16px!important;color:#17233b!important}
    .usr-mt-header {display:flex!important;align-items:center!important;justify-content:space-between!important}
    .usr-mt-title-group {gap:2px!important}
    .usr-mt-title,.usr-mt-title * {font-size:20px!important;font-weight:750!important;color:#101a2c!important}
    .usr-mt-subtitle,.usr-mt-subtitle * {font-size:12px!important;color:#68768e!important}
    .usr-mt-search-panel {position:relative!important;border:1px solid #e0e4eb!important;
       border-radius:16px!important;padding:14px!important;background:#fff!important;gap:10px!important;
       z-index:1500!important;overflow:visible!important;isolation:isolate!important}
    /* Full-width native input; task type always occupies the far-right slot. */
    .usr-mt-search-row {display:grid!important;grid-template-columns:minmax(0,1fr) 155px!important;
       align-items:center!important;gap:10px!important;width:100%!important;min-width:0!important}
    .usr-mt-search-row > :first-child {width:100%!important;min-width:0!important;max-width:none!important}
    .usr-mt-search {width:100%!important;max-width:none!important;min-width:0!important;
       flex:1 1 auto!important;justify-self:stretch!important}
    .usr-mt-search input,.usr-mt-search input[type="text"] {
       box-sizing:border-box!important;width:100%!important;min-width:0!important;max-width:none!important;
       border:1px solid #e5e8ef!important;border-radius:11px!important;
       background:#f8f9fc!important;font-size:12px!important;padding:9px 12px!important}
    .usr-mt-type-trigger {min-width:155px!important;width:155px!important;max-width:155px!important;
       justify-self:end!important;flex:0 0 auto!important}
    /* The whole native 4-option selector must overlay (not sit behind) DataTable. */
    .usr-mt-root {overflow:visible!important}
    .usr-mt-search-row {position:relative!important;overflow:visible!important}
    .usr-mt-type-options {
       position:absolute!important;right:14px!important;top:55px!important;
       z-index:1600!important;flex-direction:column!important;flex-wrap:nowrap!important;
       align-items:stretch!important;justify-content:flex-start!important;
       width:176px!important;min-width:176px!important;max-width:210px!important;
       max-height:240px!important;overflow-y:auto!important;overflow-x:hidden!important;
       border:1px solid #e5e7ec!important;border-radius:8px!important;padding:5px!important;
       box-sizing:border-box!important;
       box-shadow:0 9px 28px #1e123a24!important;background:#fff!important}
    .usr-mt-type-options .usr-mt-type-option {
       display:flex!important;flex:0 0 auto!important;min-height:30px!important;
       width:100%!important;min-width:0!important;white-space:nowrap!important;
       text-align:left!important;justify-content:flex-start!important}

    .usr-mt-chips {gap:5px!important;align-items:center!important}
    .usr-mt-chip {border-radius:12px!important;padding:4px 9px!important;min-height:29px!important;
       background:#f3f4f7!important;color:#64748b!important;font-weight:650!important;font-size:11px!important}
    body[data-usr-mt-filter="mine"] .usr-mt-chip-mine,
    body[data-usr-mt-filter="unassigned"] .usr-mt-chip-unassigned,
    body[data-usr-mt-filter="team"] .usr-mt-chip-team,
    body[data-usr-mt-filter="approaching"] .usr-mt-chip-approaching,
    body[data-usr-mt-filter="overdue"] .usr-mt-chip-overdue,
    body[data-usr-mt-filter="completed"] .usr-mt-chip-completed {
       background:linear-gradient(100deg,#5b14ad,#7923e8)!important;color:#fff!important}
    .usr-mt-notice,.usr-mt-notice * {font-size:11px!important;color:#95691d!important}
    .usr-mt-footer,.usr-mt-footer * {font-size:11px!important;color:#65748b!important}
    /* Grid stays behind the open selector; its existing horizontal scroll remains. */
    .usr-mt-datagrid {border:1px solid #e2e6ec!important;border-radius:15px!important;
       overflow:auto!important;position:relative!important;z-index:1!important}
    .usr-mt-datagrid table {width:100%!important;table-layout:fixed!important;border-collapse:separate!important;border-spacing:0!important}
    .usr-mt-datagrid th,.usr-mt-datagrid [role="columnheader"] {
       background:#f9fafc!important;color:#606b80!important;font-size:10px!important;
       font-weight:750!important;white-space:nowrap!important;padding:10px 4px!important;
       overflow:hidden!important;text-overflow:ellipsis!important}
    .usr-mt-datagrid td,.usr-mt-datagrid [role="gridcell"] {
       font-size:11px!important;color:#334155!important;padding:10px 4px!important;
       border-bottom:1px solid #edf0f4!important;white-space:nowrap!important;
       overflow:hidden!important;text-overflow:ellipsis!important}
    /* v5: field-specific compact widths preserve all header names and correct column alignment. */
    .usr-mt-datagrid .cdk-column-PDS_UsrRequest_UsrNumber,
    .usr-mt-datagrid [data-column-code="PDS_UsrRequest_UsrNumber"],
    .usr-mt-datagrid [data-column-id="PDS_UsrRequest_UsrNumber"] {box-sizing:border-box!important;width:122px!important;min-width:122px!important;max-width:122px!important;
       padding-left:4px!important;padding-right:4px!important;overflow:hidden!important;text-overflow:ellipsis!important}
    .usr-mt-datagrid .cdk-column-PDS_UsrName,
    .usr-mt-datagrid [data-column-code="PDS_UsrName"],
    .usr-mt-datagrid [data-column-id="PDS_UsrName"] {box-sizing:border-box!important;width:126px!important;min-width:126px!important;max-width:126px!important;
       padding-left:4px!important;padding-right:4px!important;overflow:hidden!important;text-overflow:ellipsis!important}
    .usr-mt-datagrid .cdk-column-PDS_UsrStage,
    .usr-mt-datagrid [data-column-code="PDS_UsrStage"],
    .usr-mt-datagrid [data-column-id="PDS_UsrStage"] {box-sizing:border-box!important;width:111px!important;min-width:111px!important;max-width:111px!important;
       padding-left:4px!important;padding-right:4px!important;overflow:hidden!important;text-overflow:ellipsis!important}
    .usr-mt-datagrid .cdk-column-PDS_UsrRequest_UsrContract,
    .usr-mt-datagrid [data-column-code="PDS_UsrRequest_UsrContract"],
    .usr-mt-datagrid [data-column-id="PDS_UsrRequest_UsrContract"] {box-sizing:border-box!important;width:94px!important;min-width:94px!important;max-width:94px!important;
       padding-left:4px!important;padding-right:4px!important;overflow:hidden!important;text-overflow:ellipsis!important}
    .usr-mt-datagrid .cdk-column-PDS_UsrRequest_UsrAccount,
    .usr-mt-datagrid [data-column-code="PDS_UsrRequest_UsrAccount"],
    .usr-mt-datagrid [data-column-id="PDS_UsrRequest_UsrAccount"] {box-sizing:border-box!important;width:130px!important;min-width:130px!important;max-width:130px!important;
       padding-left:4px!important;padding-right:4px!important;overflow:hidden!important;text-overflow:ellipsis!important}
    .usr-mt-datagrid .cdk-column-PDS_UsrRequest_UsrProject,
    .usr-mt-datagrid [data-column-code="PDS_UsrRequest_UsrProject"],
    .usr-mt-datagrid [data-column-id="PDS_UsrRequest_UsrProject"] {box-sizing:border-box!important;width:120px!important;min-width:120px!important;max-width:120px!important;
       padding-left:4px!important;padding-right:4px!important;overflow:hidden!important;text-overflow:ellipsis!important}
    .usr-mt-datagrid .cdk-column-PDS_CreatedOn,
    .usr-mt-datagrid [data-column-code="PDS_CreatedOn"],
    .usr-mt-datagrid [data-column-id="PDS_CreatedOn"] {box-sizing:border-box!important;width:116px!important;min-width:116px!important;max-width:116px!important;
       padding-left:4px!important;padding-right:4px!important;overflow:hidden!important;text-overflow:ellipsis!important}
    .usr-mt-datagrid .cdk-column-PDS_UsrAssignedTo,
    .usr-mt-datagrid [data-column-code="PDS_UsrAssignedTo"],
    .usr-mt-datagrid [data-column-id="PDS_UsrAssignedTo"] {box-sizing:border-box!important;width:115px!important;min-width:115px!important;max-width:115px!important;
       padding-left:4px!important;padding-right:4px!important;overflow:hidden!important;text-overflow:ellipsis!important}
    .usr-mt-datagrid .cdk-column-PDS_UsrDueOn,
    .usr-mt-datagrid [data-column-code="PDS_UsrDueOn"],
    .usr-mt-datagrid [data-column-id="PDS_UsrDueOn"] {box-sizing:border-box!important;width:70px!important;min-width:70px!important;max-width:70px!important;
       padding-left:4px!important;padding-right:4px!important;overflow:hidden!important;text-overflow:ellipsis!important}
    .usr-mt-datagrid .cdk-column-PDS_UsrDecision,
    .usr-mt-datagrid [data-column-code="PDS_UsrDecision"],
    .usr-mt-datagrid [data-column-id="PDS_UsrDecision"] {box-sizing:border-box!important;width:128px!important;min-width:128px!important;max-width:128px!important;
       padding-left:4px!important;padding-right:4px!important;overflow:hidden!important;text-overflow:ellipsis!important}
    .usr-mt-queue-arrival-heading,
    .usr-mt-queue-arrival-caption {color:#606b80!important;font-weight:750!important;font-size:10px!important}
    .usr-mt-queue-arrival-caption {display:inline!important;white-space:nowrap!important}
    .usr-mt-datagrid tbody tr:hover {background:#faf8ff!important}
    .usr-mt-datagrid th:not(:last-child),.usr-mt-datagrid td:not(:last-child) {
       border-right:0!important}
    .usr-mt-datagrid th {letter-spacing:0!important}

    .usr-mt-datagrid .cdk-column-PDS_UsrName,
    .usr-mt-datagrid .cdk-column-PDS_UsrRequest_UsrNumber {color:#6417c1!important;font-weight:750!important}
    /* Request ID uses the visible native bound column; no ghost spacer. */
    .usr-mt-datagrid .cdk-column-PDS_UsrRequest_UsrNumber {background:#fff!important}
    .usr-mt-datagrid .usr-mt-request-link {
       appearance:none!important;border:0!important;background:transparent!important;
       color:#6815c1!important;font-size:11px!important;font-weight:750!important;
       cursor:pointer!important;text-decoration:underline!important;text-underline-offset:2px!important;
       padding:3px 0!important;max-width:112px!important;overflow:hidden!important;
       white-space:nowrap!important;text-overflow:ellipsis!important}
    .usr-mt-datagrid .usr-mt-request-link:disabled {
       color:#8894a6!important;cursor:default!important;text-decoration:none!important}
    .usr-mt-datagrid .usr-mt-request-provisional {text-decoration-style:dotted!important}
    .usr-mt-extra-items {width:48px!important;min-width:48px!important;max-width:48px!important;text-align:center!important;font-weight:700!important}
    /* Same sticky-right Actions technique as Financial/Technical Review. */
    .usr-mt-datagrid [data-mt-heading="actions"],
    .usr-mt-datagrid [data-mt-field="actions"] {
       position:sticky!important;right:0!important;
       width:160px!important;min-width:160px!important;max-width:160px!important;
       box-sizing:border-box!important;white-space:nowrap!important;
       border-left:1px solid #e9edf4!important;background:#fff!important;
       box-shadow:-4px 0 8px rgba(26,32,51,.055)!important;
       z-index:4!important;text-align:left!important;vertical-align:middle!important}
    .usr-mt-datagrid [data-mt-heading="actions"] {
       z-index:6!important;background:#f9fafc!important}
    .usr-mt-datagrid tbody tr:hover [data-mt-field="actions"],
    .usr-mt-datagrid [role=row]:hover [data-mt-field="actions"] {
       background:#faf8ff!important}
    .usr-mt-action {border:0!important;background:transparent!important;font-size:11px!important;
       padding:3px 5px!important;font-weight:720!important;cursor:pointer!important;white-space:nowrap!important}
    .usr-mt-action-open {color:#6512bf!important}
    .usr-mt-action-assign {color:#008b48!important}
    .usr-mt-action-reassign {color:#475569!important}
    .usr-mt-pill-red,.usr-mt-pill-orange,.usr-mt-pill-green,.usr-mt-pill-gray {font-weight:700!important}
    .usr-mt-pill-red {color:#d92f30!important}
    .usr-mt-pill-orange {color:#d67d00!important}
    .usr-mt-pill-green {color:#009557!important}
    .usr-mt-pill-gray {color:#5a687b!important}
    .usr-mt-modal-overlay {position:fixed!important;inset:0!important;z-index:9998!important;align-items:center!important;justify-content:center!important;
       background:#0f172a75!important}
    .usr-mt-modal-card {background:#fff!important;border-radius:16px!important;
       box-shadow:0 18px 56px #10142646!important;width:min(390px,calc(100vw - 32px))!important;
       padding:22px!important;gap:17px!important;max-height:85vh!important;overflow:auto!important}
    .usr-mt-modal-heading,.usr-mt-modal-heading * {font-size:16px!important;font-weight:750!important;color:#172033!important}
    .usr-mt-modal-detail,.usr-mt-modal-detail * {font-size:11px!important;color:#65748b!important}
    .usr-mt-modal-selected,.usr-mt-modal-selected * {font-size:13px!important;font-weight:650!important;color:#5e1ac2!important}
    .usr-mt-modal-footer {display:flex!important;justify-content:space-between!important;align-items:center!important}
    .usr-mt-modal-confirm {background:#6420c3!important;color:#fff!important;border-radius:9px!important}
    /* v3: independent action rail, aligned to real row rectangles. Even a
       personalized Creatio colgroup can't scroll/clip this fixed rail. */
    .usr-mt-actions-dock {
       position:fixed!important;z-index:120!important;overflow:hidden!important;
       pointer-events:none!important;border-left:1px solid #e8eaf0!important;
       box-sizing:border-box!important;font-family:inherit!important}
    .usr-mt-dock-header,.usr-mt-dock-row {
       position:absolute!important;left:0!important;right:0!important;
       box-sizing:border-box!important;display:flex;align-items:center!important;
       justify-content:flex-start!important;padding:0 8px!important;
       background:#fff!important;pointer-events:auto!important;
       gap:2px!important;white-space:nowrap!important}
    .usr-mt-dock-header {background:#f9fafc!important;color:#5e6b80!important;
       font-size:11px!important;font-weight:750!important;
       border-bottom:1px solid #e5e9f0!important}
    .usr-mt-dock-row {border-bottom:1px solid #edf0f4!important;
       box-shadow:-5px 0 10px #1e244013!important}
    .usr-mt-dock-row:hover {background:#f8f3ff!important}
    .usr-mt-dock-row .usr-mt-action {display:inline-flex!important;
       align-items:center!important;padding:5px 6px!important;line-height:1.2!important;
       flex:0 0 auto!important}
    .usr-mt-dock-row .usr-mt-action:focus-visible {outline:2px solid #6c24c4!important;
       border-radius:6px!important}
    .usr-mt-datagrid.usr-mt-actions-docked [data-mt-field="actions"],
    .usr-mt-datagrid.usr-mt-actions-docked [data-mt-heading="actions"] {
       visibility:hidden!important;pointer-events:none!important}
    /* Only hide Creatio's secondary ellipsis; the dock supplies direct actions. */
    .usr-mt-datagrid.usr-mt-actions-docked .crt-row-toolbar,
    .usr-mt-datagrid.usr-mt-actions-docked [class*="row-toolbar"],
    .usr-mt-datagrid.usr-mt-actions-docked [class*="rowToolbar"] {
       visibility:hidden!important;pointer-events:none!important}
    /* Native modal, role-filtered reviewers rendered as selectable radio rows. */
    .usr-mt-modal-card {width:min(350px,calc(100vw - 32px))!important;
       border-radius:14px!important;padding:22px!important;gap:13px!important}
    .usr-mt-modal-heading,.usr-mt-modal-heading * {font-size:15px!important}
    .usr-mt-reviewer-list {width:100%!important;min-height:36px!important;
       max-height:370px!important;overflow-y:auto!important;
       display:flex!important;flex-direction:column!important;gap:2px!important}
    .usr-mt-reviewer-option {width:100%!important;min-height:45px!important;
       display:flex!important;flex-direction:row!important;align-items:center!important;
       gap:10px!important;border:0!important;background:transparent!important;
       border-radius:8px!important;padding:5px 6px!important;
       cursor:pointer!important;text-align:left!important}
    .usr-mt-reviewer-option:hover,.usr-mt-reviewer-option:focus-visible {
       background:#f6f0ff!important;outline:none!important}
    .usr-mt-reviewer-radio {width:13px!important;height:13px!important;
       border:1px solid #8e92a0!important;border-radius:100%!important;
       box-sizing:border-box!important;flex:0 0 auto!important}
    .usr-mt-reviewer-option[aria-checked="true"] .usr-mt-reviewer-radio {
       border:4px solid #6920cb!important}
    .usr-mt-reviewer-avatar {display:inline-flex!important;
       width:26px!important;height:26px!important;border-radius:50%!important;
       align-items:center!important;justify-content:center!important;flex:0 0 auto!important;
       color:#fff!important;background:#6920cb!important;font-size:10px!important;
       font-weight:750!important}
    .usr-mt-reviewer-name {font-size:12px!important;font-weight:650!important;
       color:#192238!important;overflow:hidden!important;text-overflow:ellipsis!important}
    .usr-mt-modal-footer {padding-top:8px!important}
    .usr-mt-modal-confirm {min-width:140px!important;
       background:linear-gradient(100deg,#6430ba,#8436e9)!important}

    @media(max-width:900px) {
       .usr-mt-root{padding:12px!important}
       .usr-mt-search-row{grid-template-columns:minmax(0,1fr)!important}
       .usr-mt-type-trigger{justify-self:end!important}
       .usr-mt-type-options{top:95px!important}
    }
    `;

    async function performSafely(rt, action, taskId) {
        if (rt.busy) return;
        rt.busy = true;
        try {
            if (action === "open") await openTask(rt, taskId);
            else if (action === "assign") await assignMe(rt, taskId);
            else if (action === "reassign") await beginReassign(rt, taskId);
            else throw Error("Unknown task action: " + action);
        } catch (error) {
            console.error("My Tasks action", action, error);
            notify("Action failed: " + (error.message || error));
        } finally { rt.busy = false; }
    }

    const handlerMap = new Map([
        ["crt.HandleViewModelInitRequest", async (req, next) => {
            const result = await next?.handle(req);
            if (isDesigner()) return result;
            saved()?.dispose?.();
            for (const legacyKey of LEGACY_RUNTIME_KEYS) document[legacyKey]?.dispose?.();
            const rt = {
                ctx: req.$context, rows: [], requests: new Map(), requestCodes: new Map(),
                items: new Map(), stages: new Map(),
                contactId: "", filter: "mine", type: "all", search: "", ready: false,
                truncated: false, busy: false, disposed: false, assignedTaskId: "",
                previousAssignee: "", pickerOpen: false, scheduled: false, clock: null,
                assignedMode: "", reviewers: [], selectedReviewerId: "",
                dialogNonce: 0, savingAssignment: false,
                dispose() {
                    this.disposed = true;
                    this.inlineObserver?.disconnect();
                    this.removeDockListeners?.();
                    if (this.inlineClick) document.removeEventListener("click", this.inlineClick, true);
                    clearTimeout(this.clock);
                    clearTimeout(this.searchClock);
                    clearInterval(this.minuteClock);
                    this.style?.remove();
                    document.querySelectorAll(".usr-mt-datagrid [data-mt-field],.usr-mt-datagrid [data-mt-heading],.usr-mt-datagrid col[data-mt-col]")
                        .forEach(node => node.remove());
                    document.querySelectorAll(".usr-mt-datagrid .usr-mt-native-requestid-shadow")
                        .forEach(node => node.classList.remove("usr-mt-native-requestid-shadow"));
                    if (saved() === this) {
                        document.body?.removeAttribute("data-usr-mt-filter");
                        delete document[RUNTIME_KEY];
                    }
                },
                async refresh() {
                    if (this.disposed) return;
                    this.ready = false;
                    const all = await taskRows();
                    this.truncated = all.length >= TASK_LIMIT;
                    this.rows = all;
                    this.stages = await lookupStages();
                    const reviewTasks = selectionBase(this);
                    try { this.requests = await getRequestMap(reviewTasks); }
                    catch (error) {
                        console.warn("My Tasks request details unavailable; task rows remain visible", error);
                        this.requests = new Map();
                    }
                    try { this.requestCodes = await hydrateRequestCodes(this.requests); }
                    catch (error) {
                        console.warn("My Tasks Request ID display codes unavailable", error);
                        this.requestCodes = new Map();
                    }
                    try { this.items = await loadItemCounts(this.requests); }
                    catch (error) { console.warn("My Tasks optional item counts unavailable", error); this.items = new Map(); }
                    try { this.contactId = await userContact(); }
                    catch (error) { console.warn("My Tasks user Contact unavailable", error); this.contactId = ""; }
                    if (this.disposed) return;
                    this.ready = true;
                    updateLabels(this);
                    await reloadPDS(this.ctx);
                    this.refreshInline?.();
                }
            };
            rt.perform = (action, taskId) => performSafely(rt, action, taskId);
            document[RUNTIME_KEY] = rt;
            const style = document.createElement("style");
            style.id = "usr-mt-runtime-style"; style.textContent = CSS;
            document.head.appendChild(style); rt.style = style;
            rt.refreshReviewers = () => renderReviewerList(rt);
            installGridEnhancement(rt);
            installActionsDock(rt);
            try { await rt.refresh(); }
            catch (error) {
                console.error("My Tasks initial load failed", error);
                rt.ctx.MT_Notice = "Cannot load My Tasks: " + (error.message || error);
            }
            return result;
        }],
        ["crt.LoadDataRequest", async (req, next) => {
            if (isDesigner() || req.dataSourceName !== "PDS") return next?.handle(req);
            const rt = saved();
            const ids = rt?.ready ? visibleRows(rt).map(row => id(row.Id)).filter(valid) : [];
            const fg = new sdk.FilterGroup();
            if (!ids.length) {
                await fg.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal, "Id", EMPTY);
            } else {
                fg.logicalOperation = sdk.LogicalOperatorType.Or;
                for (const taskId of ids) {
                    await fg.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal, "Id", taskId);
                }
            }
            req.parameters = req.parameters || [];
            req.parameters.push({type: "filter", value: flatFilter(fg)});
            return next?.handle(req);
        }],
        ["crt.HandleViewModelAttributeChangeRequest", async (req, next) => {
            const result = await next?.handle(req);
            if (isDesigner() || req.attributeName !== "MT_SearchText") return result;
            const rt = saved(); if (!rt || !rt.ready) return result;
            clearTimeout(rt.searchClock);
            rt.searchClock = setTimeout(async () => {
                if (rt.disposed) return;
                try {
                    rt.search = String(await rt.ctx.MT_SearchText || "");
                    updateLabels(rt); await reloadPDS(rt.ctx);
                } catch (error) { console.warn("My Tasks search", error); }
            }, 220);
            return result;
        }],
        ["usr.MTSelectFilter", async req => {
            const rt = saved(); if (!rt?.ready) return;
            rt.filter = FILTERS.includes(req.filter) ? req.filter : "mine";
            updateLabels(rt); await reloadPDS(rt.ctx);
        }],
        ["usr.MTToggleTypeMenu", async () => {
            const rt = saved(); if (!rt) return;
            rt.ctx.MT_TypeMenuVisible = !(await rt.ctx.MT_TypeMenuVisible);
        }],
        ["usr.MTSelectType", async req => {
            const rt = saved(); if (!rt?.ready) return;
            rt.type = Object.hasOwn(TYPE_CAPTIONS, req.taskType) ? req.taskType : "all";
            rt.ctx.MT_TypeMenuVisible = false;
            updateLabels(rt); await reloadPDS(rt.ctx);
        }],
        ["usr.MTOpen", async req => {
            const rt = saved(); if (rt?.ready) await rt.perform("open", req.taskId);
        }],
        ["usr.MTAssignToMe", async req => {
            const rt = saved(); if (rt?.ready) await rt.perform("assign", req.taskId);
        }],
        ["usr.MTReassign", async req => {
            const rt = saved(); if (rt?.ready) await rt.perform("reassign", req.taskId);
        }],
        ["usr.MTPickReviewer", async () => {
            // Backwards-compatible handler; role reviewers are now shown inline.
            const rt = saved(); if (rt) rt.refreshReviewers?.();
        }],
        ["usr.MTCommitAssign", async () => {
            const rt = saved(); if (!rt) return;
            try { await commitAssignment(rt); }
            catch (error) { notify("Assignment not saved: " + (error.message || error)); }
        }],
        ["usr.MTCancelAssign", async () => {
            const rt = saved(); if (rt && !rt.pickerOpen) closeDialog(rt);
        }],
        ["usr.MTRefresh", async () => {
            const rt = saved(); if (!rt || rt.busy) return;
            try { await rt.refresh(); }
            catch (error) { notify("My Tasks refresh failed: " + (error.message || error)); }
        }],
        ["crt.HandleViewModelResumeRequest", async (req, next) => {
            const result = await next?.handle(req);
            const rt = saved();
            if (!isDesigner() && rt && !rt.disposed) try { await rt.refresh(); }
            catch (error) { console.warn("My Tasks resume", error); }
            return result;
        }],
        ["crt.HandleViewModelDestroyRequest", async (req, next) => {
            if (!isDesigner()) saved()?.dispose?.();
            return next?.handle(req);
        }]
    ]);
    return {
        handle(requestName, req, next) {
            const implementation = handlerMap.get(requestName);
            if (!implementation) throw Error("Unknown My Tasks request " + requestName);
            return implementation(req, next);
        }
    };
});
