/* MCIT Report Parameters — V14 saved-filter text left-aligned below buttons, based on V12 Figma: clean footer, Authority and SLA selectors. Designer-friendly.
 * Schema: UsrReportParameters. This version preserves the original page handlers.
 * Styling is scoped to this page. No replacement of native UI with injected HTML.
 * Contract, Project, Request Status and Request Type use real Creatio lookups. Authority loads from Account (UsrProject.UsrAuthorityId references Account); SLA choices are UI-only until the report service supports them.
 * Authority selection filters through the project-to-Account mapping in the Viewer (development only).
 * Request Type requires UsrVMRequest.UsrRequestType (lookup) and SLA requires
 * UsrVMRequest.UsrSLAStatus (text) to be created and populated.
 * Saved filter permissions and MCIT-specific scope enforcement are still required server-side.
 * Exports remain disabled in this parameter form; use the actual Report Viewer results.
 */
define("UsrReportParameters", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/,
function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
  "use strict";
  const STYLE_ID = "usr-mcit-report-parameters-figma-v12";
  const STYLE_TEXT = `/* MCIT Report Parameters — V7, scoped Figma refinement
   Single borders and native structural wrappers. All controls remain native Freedom UI components.
   No body scaling, global themes, or DOM element replacements. */
body .usr-rp-stage {
  --usr-rp-bg:#F8F7FF;
  --usr-rp-primary:#5B21A5;
  --usr-rp-accent:#7027F5;
  --usr-rp-border:#E4E4EF;
  --usr-rp-ink:#211633;
  --usr-rp-muted:#6D7280;
  background:var(--usr-rp-bg)!important;
  width:100%!important; min-width:0!important;
  min-height:calc(100vh - 70px)!important;
  box-sizing:border-box!important;
  padding:24px 24px 76px!important;
  align-self:stretch!important;
  display:block!important;
  font-family:Rubik,Arial,sans-serif;
}
body .usr-rp-stage * {box-sizing:border-box}
body .usr-rp-stage .usr-report-parameters-page {
  width:100%!important;
  max-width:900px!important;
  min-width:0!important;
  margin:0 auto!important;
  display:flex!important;
  flex-direction:column!important;
  gap:0!important;
}
/* Breadcrumb, heading, subtitle */
body .usr-rp-stage .usr-rp-back {align-self:flex-start!important; margin:0 0 24px!important}
body .usr-rp-stage .usr-rp-back,
body .usr-rp-stage .usr-rp-back button,
body .usr-rp-stage .usr-rp-back .crt-button {
  background:transparent!important; box-shadow:none!important;
  border:0!important; color:#687084!important;
  font-size:12px!important; padding:4px 0!important;
}
body .usr-rp-stage .usr-rp-title-row {
  display:flex!important; align-items:center!important; flex-wrap:wrap!important;
  justify-content:flex-start!important; column-gap:12px!important;
  row-gap:6px!important; margin:0 0 8px!important;
}
body .usr-rp-stage .usr-rp-heading,
body .usr-rp-stage .usr-rp-heading * {
  font-size:25px!important; font-weight:750!important;
  letter-spacing:-.45px!important; line-height:1.3!important;
  color:var(--usr-rp-ink)!important; margin:0!important;
}
body .usr-rp-stage .usr-rp-badge {
  align-self:center!important; display:inline-flex!important;
  width:max-content!important; padding:4px 10px!important;
  background:#F5F0FF!important; border:1px solid #E3D6F9!important;
  border-radius:20px!important; color:#6C31C7!important;
  font-size:11px!important; font-weight:700!important; line-height:1.25!important;
}
body .usr-rp-stage .usr-rp-badge * {
  color:inherit!important; font-size:inherit!important;
  font-weight:inherit!important; line-height:inherit!important;
}
body .usr-rp-stage .usr-rp-description {
  font-size:12px!important; color:var(--usr-rp-muted)!important;
  margin:0 0 22px!important;
}
body .usr-rp-stage .usr-rp-description * {
  color:inherit!important; font-size:inherit!important;
  line-height:1.5!important;
}
/* Scope notice */
body .usr-rp-stage .usr-rp-notice {
  background:#EEF5FF!important; border:1px solid #BDD9FB!important;
  border-radius:10px!important; padding:12px 16px!important;
  margin:0 0 20px!important; align-items:center!important;
}
body .usr-rp-stage .usr-rp-notice,
body .usr-rp-stage .usr-rp-notice * {
  font-size:12px!important; color:#2C68B3!important; line-height:1.45!important;
}
/* White parameter card with a distinct header and even gutters */
body .usr-rp-stage .usr-rp-panel {
  width:100%!important; min-width:0!important;
  border:1px solid #E4E4EF!important;
  border-radius:14px!important;
  background:#FFF!important; overflow:hidden!important;
  padding:0!important; margin:0!important; gap:0!important;
  box-shadow:0 1px 3px rgba(40,22,80,.025)!important;
}
body .usr-rp-stage .usr-rp-panel-title {
  width:100%!important; margin:0!important;
  padding:16px 19px!important;
  border-bottom:1px solid #EEEFF5!important;
  font-size:14px!important; font-weight:750!important;
  color:var(--usr-rp-ink)!important;
}
body .usr-rp-stage .usr-rp-panel-title * {
  color:inherit!important; font-size:inherit!important;
  font-weight:inherit!important;
}
body .usr-rp-stage .usr-rp-grid {
  width:100%!important; min-width:0!important;
  padding:18px 19px 21px!important;
  column-gap:16px!important; row-gap:12px!important;
}
/* The V2 multi-border issue came from styling both the Angular field
   wrappers and the actual <input>. All wrapper surfaces are transparent now. */
body .usr-rp-stage .usr-rp-field {
  background:transparent!important; border:0!important;
  box-shadow:none!important; outline:0!important;
  padding:0!important; margin:0!important;
  width:100%!important; min-width:0!important; gap:0!important;
}
body .usr-rp-stage .usr-rp-field .crt-input,
body .usr-rp-stage .usr-rp-field .crt-input-container,
body .usr-rp-stage .usr-rp-field .crt-input-control,
body .usr-rp-stage .usr-rp-field .crt-date-time-picker-container,
body .usr-rp-stage .usr-rp-field [class*="input-wrapper"] {
  border:0!important; border-radius:0!important;
  box-shadow:none!important; background:transparent!important;
  outline:0!important; padding:0!important;
}
body .usr-rp-stage .usr-rp-field .crt-input-label,
body .usr-rp-stage .usr-rp-field label {
  display:block!important; margin:0 0 5px!important;
  padding:0!important; font-size:12px!important;
  line-height:1.35!important; font-weight:700!important;
  color:#303447!important;
}
/* Exactly one visible input border, with room for native picker controls. */
body .usr-rp-stage .usr-rp-field input:not([type=checkbox]),
body .usr-rp-stage .usr-rp-field textarea {
  display:block!important; width:100%!important;
  height:39px!important; min-height:39px!important;
  border:1px solid #E1E4ED!important;
  border-radius:9px!important; background:#FFF!important;
  box-shadow:none!important; padding:8px 11px!important;
  color:#263145!important; font-size:12px!important;
  outline:none!important; transition:border-color .14s,box-shadow .14s;
}
body .usr-rp-stage .usr-rp-field input:not([type=checkbox]):focus,
body .usr-rp-stage .usr-rp-field textarea:focus {
  border-color:#8A51DC!important;
  box-shadow:0 0 0 2px rgba(112,39,245,.09)!important;
}
body .usr-rp-stage .usr-rp-field input::placeholder {
  color:#8B93A4!important; opacity:1!important;
}
/* Row actions: button sizes and spacing follow Figma. */
body .usr-rp-stage .usr-rp-actions {
  width:100%!important; margin-top:19px!important;
  display:flex!important; align-items:center!important;
  justify-content:space-between!important;
  gap:14px!important; flex-wrap:wrap!important;
}
body .usr-rp-stage .usr-rp-actions-left,
body .usr-rp-stage .usr-rp-actions-right {
  display:flex!important; align-items:center!important;
  flex-wrap:wrap!important; gap:9px!important;
}
body .usr-rp-stage .usr-rp-actions button,
body .usr-rp-stage .usr-rp-actions .crt-button {
  min-height:36px!important; border-radius:9px!important;
  padding:8px 15px!important; box-shadow:none!important;
  font-size:12px!important; font-weight:650!important;
  line-height:1.35!important;
}
body .usr-rp-stage .usr-rp-action-secondary,
body .usr-rp-stage .usr-rp-action-secondary button,
body .usr-rp-stage .usr-rp-action-secondary .crt-button {
  background:#FFF!important; color:#354054!important;
  border:1px solid #E0E4ED!important;
}
body .usr-rp-stage .usr-rp-run,
body .usr-rp-stage .usr-rp-run button,
body .usr-rp-stage .usr-rp-run .crt-button {
  background:#5B21A5!important; color:#FFF!important;
  border:1px solid #5B21A5!important;
}
body .usr-rp-stage .usr-rp-reset,
body .usr-rp-stage .usr-rp-reset button,
body .usr-rp-stage .usr-rp-reset .crt-button {
  background:transparent!important; border:0!important;
  box-shadow:none!important; color:#697084!important;
  padding-left:0!important;
}
body .usr-rp-stage .usr-rp-disabled {opacity:.65!important}
body .usr-rp-stage .usr-rp-status {
  margin-top:11px!important; color:#59647B!important;
  font-size:12px!important;
}
body .usr-rp-stage .usr-rp-status * {color:inherit!important;font-size:inherit!important}
@media (max-width:760px) {
  body .usr-rp-stage {padding:18px 12px 45px!important}
  body .usr-rp-stage .usr-rp-grid {
    display:flex!important; flex-direction:column!important;
    gap:12px!important;
  }
  body .usr-rp-stage .usr-rp-actions {justify-content:flex-start!important}
  body .usr-rp-stage .usr-rp-heading,
  body .usr-rp-stage .usr-rp-heading * {font-size:21px!important}
}
/* V4 — native layout wrappers ensure typography and padding render in Creatio 10.1. */
body .usr-rp-stage .usr-rp-panel-header {
  display:flex!important; align-items:stretch!important;
  width:100%!important; min-width:0!important;
  padding:17px 20px!important;
  margin:0!important;
  background:#fff!important;
  border:0!important; border-bottom:1px solid #e9e9f1!important;
  box-sizing:border-box!important;
}
body .usr-rp-stage .usr-rp-panel-header .usr-rp-panel-title {
  padding:0!important; margin:0!important;
  border:0!important; background:transparent!important;
  font-weight:750!important;
  color:#211633!important;
}
body .usr-rp-stage .usr-rp-panel-header .usr-rp-panel-title,
body .usr-rp-stage .usr-rp-panel-header .usr-rp-panel-title * {
  font-size:15px!important; line-height:1.4!important;
  font-weight:750!important; color:#211633!important;
}
body .usr-rp-stage .usr-rp-badge-pill {
  display:inline-flex!important; flex:0 0 auto!important;
  align-items:center!important; justify-content:center!important;
  padding:4px 10px!important; margin:0!important;
  border:1px solid #e2d5fa!important;
  background:#f6f1ff!important; border-radius:100px!important;
  min-height:24px!important; width:auto!important;
}
body .usr-rp-stage .usr-rp-badge-pill .usr-rp-badge {
  display:inline-flex!important; padding:0!important; margin:0!important;
  border:0!important; background:transparent!important;
  border-radius:0!important; min-height:0!important;
}
body .usr-rp-stage .usr-rp-badge-pill .usr-rp-badge,
body .usr-rp-stage .usr-rp-badge-pill .usr-rp-badge * {
  color:#6831bd!important; font-size:11px!important;
  font-weight:700!important; line-height:1.3!important;
}
body .usr-rp-stage .usr-rp-heading,
body .usr-rp-stage .usr-rp-heading * {
  font-size:25px!important; font-weight:800!important;
  color:#20132f!important; line-height:1.25!important;
}
body .usr-rp-stage .usr-rp-description {
  margin:2px 0 18px!important;
}
body .usr-rp-stage .usr-rp-notice {
  padding:12px 15px!important; margin:0 0 19px!important;
}
body .usr-rp-stage .usr-rp-grid {
  padding:18px 20px 22px!important;
  column-gap:16px!important;
  row-gap:14px!important;
}
body .usr-rp-stage .usr-rp-field,
body .usr-rp-stage .usr-rp-field crt-input,
body .usr-rp-stage .usr-rp-field crt-date-time-picker {
  border:0!important; border-bottom:0!important;
  outline:0!important; box-shadow:none!important;
  background:transparent!important;
}
body .usr-rp-stage .usr-rp-field .crt-input::after,
body .usr-rp-stage .usr-rp-field crt-input::after,
body .usr-rp-stage .usr-rp-field crt-date-time-picker::after {
  content:none!important; display:none!important;
}
body .usr-rp-stage .usr-rp-field input:not([type=checkbox]) {
  min-height:39px!important; height:39px!important;
  border:1px solid #e2e3ec!important; border-radius:9px!important;
  padding-left:11px!important; padding-right:11px!important;
}
body .usr-rp-stage .usr-rp-actions {
  margin-top:19px!important; padding:0 1px!important;
}
body .usr-rp-stage .usr-rp-actions button,
body .usr-rp-stage .usr-rp-actions .crt-button {
  font-weight:700!important; font-size:12px!important;
  min-height:36px!important;
}


/* ComboBox integration: no duplicate field-wrapper borders; native dropdown handles its own popup. */
body .usr-rp-stage .usr-rp-field .crt-combobox {width:100%!important;min-width:0!important}
body .usr-rp-stage .usr-rp-field crt-combobox {display:block!important;width:100%!important}
body .usr-rp-stage .usr-rp-field .crt-combobox input {height:39px!important}
body .usr-rp-stage .usr-rp-field .usr-rp-unavailable input {background:#f5f5fa!important;color:#7c8190!important}


/* V6 — refined Figma styling. Scoped: never change Creatio shell or other pages. */
body .usr-rp-stage {
  background:#F8F7FF!important;
  padding:34px 24px 84px!important;
}
body .usr-rp-stage .usr-report-parameters-page {
  max-width:920px!important;
}
body .usr-rp-stage .usr-rp-title-row {margin-bottom:10px!important}
body .usr-rp-stage .usr-rp-heading,
body .usr-rp-stage .usr-rp-heading * {
  font-size:26px!important;letter-spacing:-.5px!important;line-height:1.25!important;
}
body .usr-rp-stage .usr-rp-description {margin:3px 0 19px!important;line-height:1.55!important}
body .usr-rp-stage .usr-rp-notice {
  border-radius:11px!important;
  margin-bottom:23px!important;
  padding:13px 16px!important;
}
body .usr-rp-stage .usr-rp-panel {
  border:1px solid #E1E3EF!important;
  border-radius:14px!important;
  box-shadow:0 5px 18px rgba(55,30,107,.035)!important;
}
body .usr-rp-stage .usr-rp-panel-header {
  padding:18px 23px!important;
  border-bottom:1px solid #EBEDF5!important;
}
body .usr-rp-stage .usr-rp-grid {
  padding:22px 23px 25px!important;
  column-gap:19px!important;row-gap:18px!important;
}
/* Remove Creatio's field-level underlines and separator effects.
   The actual input keeps one full rectangular border. */
body .usr-rp-stage .usr-rp-field,
body .usr-rp-stage .usr-rp-field > *,
body .usr-rp-stage .usr-rp-field crt-input,
body .usr-rp-stage .usr-rp-field crt-combobox,
body .usr-rp-stage .usr-rp-field crt-date-time-picker,
body .usr-rp-stage .usr-rp-field .crt-input,
body .usr-rp-stage .usr-rp-field .crt-input-container,
body .usr-rp-stage .usr-rp-field .crt-input-control,
body .usr-rp-stage .usr-rp-field .crt-date-time-picker-container,
body .usr-rp-stage .usr-rp-field .crt-combobox,
body .usr-rp-stage .usr-rp-field .t-input,
body .usr-rp-stage .usr-rp-field .t-input__wrapper {
  border-bottom:0!important;
  text-decoration:none!important;
  box-shadow:none!important;
}
body .usr-rp-stage .usr-rp-field::before,
body .usr-rp-stage .usr-rp-field::after,
body .usr-rp-stage .usr-rp-field .crt-input-container::before,
body .usr-rp-stage .usr-rp-field .crt-input-container::after,
body .usr-rp-stage .usr-rp-field .crt-combobox::after,
body .usr-rp-stage .usr-rp-field .t-input::before,
body .usr-rp-stage .usr-rp-field .t-input::after,
body .usr-rp-stage .usr-rp-field .t-input__wrapper::after {
  content:none!important;border-bottom:0!important;
  box-shadow:none!important;
}
body .usr-rp-stage .usr-rp-field [class*="underline"],
body .usr-rp-stage .usr-rp-field [class*="line-ripple"] {
  display:none!important;
}
body .usr-rp-stage .usr-rp-field input:not([type=checkbox]),
body .usr-rp-stage .usr-rp-field textarea {
  width:100%!important;height:43px!important;min-height:43px!important;
  border:1px solid #DDE1EC!important;
  border-radius:10px!important;
  background:#FFFFFF!important;color:#25283E!important;
  box-shadow:none!important;
  outline:none!important;
  font-size:13px!important;line-height:1.35!important;
  padding:9px 12px!important;
}
body .usr-rp-stage .usr-rp-field input:not([type=checkbox]):focus,
body .usr-rp-stage .usr-rp-field textarea:focus {
  border-color:#7B3AC8!important;
  box-shadow:0 0 0 3px rgba(112,39,245,.11)!important;
}
body .usr-rp-stage .usr-rp-field .crt-input-label,
body .usr-rp-stage .usr-rp-field label {
  margin-bottom:7px!important;font-size:12.5px!important;
  font-weight:700!important;color:#293044!important;
}
body .usr-rp-stage .usr-rp-actions {
  margin-top:22px!important;gap:14px!important;
}
body .usr-rp-stage .usr-rp-actions button,
body .usr-rp-stage .usr-rp-actions .crt-button {
  min-height:40px!important;border-radius:9px!important;
  padding:9px 15px!important;font-size:12.5px!important;
}
body .usr-rp-stage .usr-rp-run,
body .usr-rp-stage .usr-rp-run button,
body .usr-rp-stage .usr-rp-run .crt-button {
  background:#5B21A5!important;border-color:#5B21A5!important;
  color:#fff!important;
}
body .usr-rp-stage .usr-rp-run:hover,
body .usr-rp-stage .usr-rp-run button:hover {
  background:#4B198D!important;border-color:#4B198D!important;
}
/* Bottom navigation: after the filters, action row, and status message. */
body .usr-rp-stage .usr-rp-footer {
  width:100%!important;margin-top:28px!important;
  padding-top:18px!important;border-top:1px solid #E6E5F0!important;
  display:flex!important;justify-content:flex-start!important;
  align-items:center!important;gap:0!important;
}
body .usr-rp-stage .usr-rp-footer .usr-rp-back,
body .usr-rp-stage .usr-rp-footer .usr-rp-back button,
body .usr-rp-stage .usr-rp-footer .usr-rp-back .crt-button {
  display:inline-flex!important;align-items:center!important;
  background:#FFFFFF!important;
  border:1px solid #DADDE9!important;
  color:#4B5270!important;
  border-radius:9px!important;
  padding:10px 16px!important;
  margin:0!important;min-height:40px!important;
  font-weight:650!important;font-size:12.5px!important;
  box-shadow:none!important;
}
body .usr-rp-stage .usr-rp-footer .usr-rp-back:hover,
body .usr-rp-stage .usr-rp-footer .usr-rp-back button:hover {
  border-color:#BCA2E4!important;
  background:#F9F6FF!important;
  color:#5B21A5!important;
}
@media(max-width:760px) {
  body .usr-rp-stage {padding:22px 12px 58px!important}
  body .usr-rp-stage .usr-rp-grid {padding:18px 15px 21px!important;gap:15px!important}
  body .usr-rp-stage .usr-rp-panel-header {padding:16px 15px!important}
  body .usr-rp-stage .usr-rp-actions {align-items:stretch!important}
  body .usr-rp-stage .usr-rp-footer {margin-top:22px!important}
}


/* V7: Back to Catalog belongs above the title, not below the action row. */
body .usr-rp-stage .usr-report-parameters-page > .usr-rp-back,
body .usr-rp-stage .usr-report-parameters-page > .usr-rp-back button,
body .usr-rp-stage .usr-report-parameters-page > .usr-rp-back .crt-button {
  background:transparent!important;
  border:0!important;
  box-shadow:none!important;
  color:#5b647a!important;
  margin:0 0 17px!important;
  padding:4px 0!important;
  font-size:12.5px!important;
  min-height:26px!important;
  text-align:left!important;
}
body .usr-rp-stage .usr-rp-back:hover,
body .usr-rp-stage .usr-rp-back button:hover {color:#5B21A5!important;}
/* V7: The outlined surface belongs to the complete combo field (including its arrow).
   Native combo markups differ across Creatio builds: prefer .crt-input-container,
   fall back to .t-input only when the former is absent. */
body .usr-rp-stage .usr-rp-field crt-combobox .crt-input-container,
body .usr-rp-stage .usr-rp-field crt-combobox:not(:has(.crt-input-container)) .t-input {
  display:flex!important;
  align-items:center!important;
  width:100%!important;
  min-width:0!important;
  min-height:43px!important;
  height:43px!important;
  border:1px solid #DDE1EC!important;
  border-radius:10px!important;
  background:#FFF!important;
  box-shadow:none!important;
  outline:none!important;
  box-sizing:border-box!important;
  padding:0 5px 0 0!important;
}
/* Inner textbox no longer draws a second box that ends before the arrow. */
body .usr-rp-stage .usr-rp-field crt-combobox input:not([type=checkbox]) {
  flex:1 1 0!important;
  min-width:0!important;
  width:100%!important;
  height:40px!important;
  min-height:40px!important;
  padding:8px 10px!important;
  border:0!important;
  border-radius:9px!important;
  box-shadow:none!important;
  background:transparent!important;
  outline:none!important;
}
body .usr-rp-stage .usr-rp-field crt-combobox .crt-input-container:focus-within,
body .usr-rp-stage .usr-rp-field crt-combobox:not(:has(.crt-input-container)) .t-input:focus-within {
  border-color:#8A51DC!important;
  box-shadow:0 0 0 2px rgba(112,39,245,.10)!important;
}
/* Ensure combobox trailing action is inside the shared field, not occupying extra width. */
body .usr-rp-stage .usr-rp-field crt-combobox button,
body .usr-rp-stage .usr-rp-field crt-combobox [class*="arrow"],
body .usr-rp-stage .usr-rp-field crt-combobox [class*="toggle"] {
  flex-shrink:0!important;
  margin-right:5px!important;
}
/* Date picker: allow its trailing calendar button to share the input outline. */
body .usr-rp-stage .usr-rp-field crt-date-time-picker .crt-date-time-picker-container {
  display:flex!important;
  align-items:center!important;
  min-height:43px!important;
  border:1px solid #DDE1EC!important;
  border-radius:10px!important;
  background:#FFF!important;
  box-shadow:none!important;
}
body .usr-rp-stage .usr-rp-field crt-date-time-picker .crt-date-time-picker-container input:not([type=checkbox]) {
  min-width:0!important;
  flex:1 1 0!important;
  border:0!important;
  outline:none!important;
  background:transparent!important;
  box-shadow:none!important;
}


/* V8 — One complete visible outline per field. All eight are native Freedom UI
   controls inside Designer-editable layout containers. The border lives on
   the input shell rather than the varying Creatio input/combobox internals. */
body .usr-rp-stage .usr-rp-field {
  display:flex!important; flex-direction:column!important;
  gap:7px!important; min-width:0!important; width:100%!important;
}
body .usr-rp-stage .usr-rp-standalone-label,
body .usr-rp-stage .usr-rp-standalone-label * {
  display:block!important; margin:0!important; padding:0!important;
  font-family:Rubik,Arial,sans-serif!important;
  font-size:12.5px!important; font-weight:700!important;
  line-height:1.4!important; color:#303447!important;
}
body .usr-rp-stage .usr-rp-control-shell {
  width:100%!important; min-width:0!important; max-width:100%!important;
  min-height:42px!important; height:42px!important;
  display:flex!important; flex-direction:row!important;
  flex-wrap:nowrap!important; align-items:center!important;
  position:relative!important; box-sizing:border-box!important;
  border:1px solid #E1E3EC!important;
  border-radius:10px!important; background:#FFFFFF!important;
  padding:0 11px!important; margin:0!important;
  outline:0!important; box-shadow:none!important;
  transition:border-color .15s ease,box-shadow .15s ease!important;
}
body .usr-rp-stage .usr-rp-control-shell:hover {border-color:#C8C5D9!important}
body .usr-rp-stage .usr-rp-control-shell:focus-within {
  border-color:#7D44C5!important;
  box-shadow:0 0 0 2px rgba(112,39,245,.09)!important;
}
/* The real component must occupy available space without drawing a second box. */
body .usr-rp-stage .usr-rp-control-shell > *,
body .usr-rp-stage .usr-rp-control-shell .usr-rp-inner-control {
  width:100%!important; max-width:100%!important;
  flex:1 1 auto!important; min-width:0!important;
  min-height:0!important; height:auto!important;
  padding:0!important; margin:0!important;
  border:0!important; border-bottom:0!important;
  background:transparent!important; box-shadow:none!important;
  outline:0!important;
}
body .usr-rp-stage .usr-rp-control-shell .crt-input,
body .usr-rp-stage .usr-rp-control-shell .crt-input-container,
body .usr-rp-stage .usr-rp-control-shell .crt-input-control,
body .usr-rp-stage .usr-rp-control-shell .crt-date-time-picker-container,
body .usr-rp-stage .usr-rp-control-shell .crt-combobox,
body .usr-rp-stage .usr-rp-control-shell .t-input,
body .usr-rp-stage .usr-rp-control-shell .t-input__wrapper,
body .usr-rp-stage .usr-rp-control-shell [class*="input-wrapper"] {
  border:0!important; border-bottom:0!important;
  background:transparent!important; box-shadow:none!important;
  outline:0!important; min-width:0!important;
}
body .usr-rp-stage .usr-rp-control-shell input:not([type=checkbox]),
body .usr-rp-stage .usr-rp-control-shell textarea {
  display:block!important; flex:1 1 auto!important;
  width:100%!important; min-width:0!important;
  height:38px!important; min-height:38px!important;
  padding:8px 2px!important; margin:0!important;
  font-family:Rubik,Arial,sans-serif!important;
  font-size:13px!important; line-height:1.35!important;
  color:#283144!important; background:transparent!important;
  border:0!important; border-bottom:0!important;
  border-radius:0!important;
  outline:none!important; box-shadow:none!important;
}
body .usr-rp-stage .usr-rp-control-shell input:not([type=checkbox]):focus,
body .usr-rp-stage .usr-rp-control-shell textarea:focus {
  border:0!important; border-bottom:0!important;
  box-shadow:none!important; outline:none!important;
}
body .usr-rp-stage .usr-rp-control-shell input::placeholder,
body .usr-rp-stage .usr-rp-control-shell textarea::placeholder {
  color:#9198A7!important; opacity:1!important;
}
/* Hide the original built-in label: the standalone label above the shell is
   the single visual label; native controls retain their label/accessible name. */
body .usr-rp-stage .usr-rp-control-shell label,
body .usr-rp-stage .usr-rp-control-shell .crt-input-label,
body .usr-rp-stage .usr-rp-control-shell [class*="input-label"] {
  display:none!important;
}
body .usr-rp-stage .usr-rp-control-shell [class*="underline"],
body .usr-rp-stage .usr-rp-control-shell [class*="line-ripple"] {
  display:none!important;
}
body .usr-rp-stage .usr-rp-control-shell .t-input::after,
body .usr-rp-stage .usr-rp-control-shell .crt-input-container::after,
body .usr-rp-stage .usr-rp-control-shell .t-input__wrapper::after {
  content:none!important; display:none!important;
}
/* Keep Creatio's actual dropdown/caret/calendar triggers within the shell;
   do not replace them or block their click handlers. */
body .usr-rp-stage .usr-rp-control-shell crt-combobox,
body .usr-rp-stage .usr-rp-control-shell crt-date-time-picker,
body .usr-rp-stage .usr-rp-control-shell crt-input {
  width:100%!important; min-width:0!important;
  display:block!important;
}
body .usr-rp-stage .usr-rp-control-shell crt-combobox .crt-input-container,
body .usr-rp-stage .usr-rp-control-shell crt-combobox:not(:has(.crt-input-container)) .t-input,
body .usr-rp-stage .usr-rp-control-shell crt-date-time-picker .crt-date-time-picker-container {
  width:100%!important; min-height:38px!important; height:38px!important;
  display:flex!important; align-items:center!important;
  border:0!important; border-radius:0!important;
  padding:0!important; background:transparent!important;
  box-shadow:none!important;
}
body .usr-rp-stage .usr-rp-control-shell button,
body .usr-rp-stage .usr-rp-control-shell [class*="arrow"],
body .usr-rp-stage .usr-rp-control-shell [class*="toggle"] {
  flex-shrink:0!important; margin-right:0!important;
}
/* Saved personal filter selector. Matches V8/V9 input border and action row. */
body .usr-rp-stage .usr-rp-saved-bar {
  display:flex!important; align-items:flex-end!important;
  flex-wrap:wrap!important; gap:12px!important;
  margin-top:16px!important; padding:0!important;
  background:transparent!important;
}
body .usr-rp-stage .usr-rp-saved-area {
  flex:1 1 320px!important; max-width:455px!important;
  display:flex!important; flex-direction:column!important;
  gap:5px!important; min-width:200px!important;
}
body .usr-rp-stage .usr-rp-saved-label,
body .usr-rp-stage .usr-rp-saved-label * {
  color:#303447!important; font-size:12px!important; font-weight:700!important;
}
body .usr-rp-stage .usr-rp-saved-input {
  display:flex!important; width:100%!important;
  min-height:39px!important; border:1px solid #E1E4ED!important;
  border-radius:9px!important; background:#FFF!important;
  box-shadow:none!important; overflow:hidden!important;
}
body .usr-rp-stage .usr-rp-saved-input:focus-within {
  border-color:#8A51DC!important; box-shadow:0 0 0 2px rgba(112,39,245,.09)!important;
}
body .usr-rp-stage .usr-rp-saved-input crt-combobox,
body .usr-rp-stage .usr-rp-saved-input .crt-input-container {
  width:100%!important; border:0!important; background:transparent!important;
  box-shadow:none!important;
}
/* V14: left-align the saved-filter selection and add the same inner padding
   as other controls. Scoped only to My Saved Filters. */
body .usr-rp-stage .usr-rp-saved-input {
  padding-left:12px!important;
  padding-right:10px!important;
  justify-content:flex-start!important;
  text-align:left!important;
}
body .usr-rp-stage .usr-rp-saved-input crt-combobox,
body .usr-rp-stage .usr-rp-saved-input .crt-input-container,
body .usr-rp-stage .usr-rp-saved-input input,
body .usr-rp-stage .usr-rp-saved-input [role="combobox"] {
  text-align:left!important;
}
body .usr-rp-stage .usr-rp-saved-input input {
  border:0!important; background:transparent!important; box-shadow:none!important;
  width:100%!important; min-height:36px!important;
  padding-left:0!important;
}
body .usr-rp-stage .usr-rp-load-button,
body .usr-rp-stage .usr-rp-load-button button,
body .usr-rp-stage .usr-rp-load-button .crt-button {
  min-height:39px!important; padding:8px 16px!important;
  background:#FFF!important; color:#5B21A5!important;
  border:1px solid #DDD7ED!important; border-radius:9px!important;
  font-size:12px!important; font-weight:650!important;
}
/* Consistent row spacing and the reference's compact panel. */
body .usr-rp-stage .usr-rp-grid {
  padding:20px 20px 22px!important; column-gap:16px!important;
  row-gap:17px!important;
}
body .usr-rp-stage .usr-rp-panel {background:#FFF!important}
@media (max-width:760px) {
  body .usr-rp-stage .usr-rp-grid {gap:16px!important}
}


/* Input-only scrollbar fix: preserve scrolling inside actual dropdown result lists. */
body .usr-rp-stage .usr-rp-control-shell,
body .usr-rp-stage .usr-rp-control-shell .usr-rp-inner-control,
body .usr-rp-stage .usr-rp-control-shell crt-combobox,
body .usr-rp-stage .usr-rp-control-shell crt-date-time-picker,
body .usr-rp-stage .usr-rp-control-shell .crt-input-container,
body .usr-rp-stage .usr-rp-control-shell .t-input,
body .usr-rp-stage .usr-rp-control-shell .t-input__wrapper {
  scrollbar-width:none!important;
}
body .usr-rp-stage .usr-rp-control-shell::-webkit-scrollbar,
body .usr-rp-stage .usr-rp-control-shell .usr-rp-inner-control::-webkit-scrollbar,
body .usr-rp-stage .usr-rp-control-shell crt-combobox::-webkit-scrollbar,
body .usr-rp-stage .usr-rp-control-shell crt-date-time-picker::-webkit-scrollbar,
body .usr-rp-stage .usr-rp-control-shell .crt-input-container::-webkit-scrollbar,
body .usr-rp-stage .usr-rp-control-shell .t-input::-webkit-scrollbar,
body .usr-rp-stage .usr-rp-control-shell .t-input__wrapper::-webkit-scrollbar {
  width:0!important; height:0!important;
}

`;
  // Inject only a stylesheet, never form markup; all elements stay native and Designer-editable.
  if (typeof document !== "undefined") {
    const oldStyle = document.getElementById(STYLE_ID);
    if (oldStyle) {
      oldStyle.textContent = STYLE_TEXT;
    } else {
      const stylesheet = document.createElement("style");
      stylesheet.id = STYLE_ID;
      stylesheet.textContent = STYLE_TEXT;
      document.head.appendChild(stylesheet);
    }
  }
  const keys = ["DateFrom", "DateTo", "Contract", "Authority", "Project", "RequestType", "RequestStatus", "SLAStatus"];
  async function collect(context) {
    const result = {};
    for (const key of keys) result[key] = await context["UsrRP" + key];
    return result;
  }
  function serializable(v) {
    return v instanceof Date ? v.toISOString() : (v ?? null);
  }
  // Creatio SDK reads records with the logged-in user's object permissions.
  // Record access rules and report-specific contract/authority scope MUST still
  // be enforced by the server-side report service before production use.
  const LOOKUP_SOURCES = [
    {key:"Contract", schema:"UsrMCITContract", display:"UsrName"},
    {key:"Project", schema:"UsrProject", display:"UsrName"},
    {key:"RequestStatus", schema:"UsrMCITRequestStatus", display:"Name"},
    {key:"RequestType", schema:"UsrMCITRequestType", display:"Name"},
    {key:"Authority", schema:"Account", display:"Name"}
  ];
  async function loadLookup(context, spec) {
    const model = await sdk.Model.create(spec.schema);
    let rows, display, lastError;
    for (const field of (spec.displays || [spec.display])) {
      try {
        rows = await model.load({
          attributes:["Id",field],
          options:{pagingConfig:{rowsOffset:0,rowCount:200},
            sortingConfig:{columns:[{columnName:field,direction:"asc"}]}}
        });
        display = field;
        break;
      } catch (error) { lastError = error; }
    }
    if (!display) throw lastError || new Error("No readable display column on "+spec.schema);
    if (!Array.isArray(rows)) throw new Error("Unexpected "+spec.schema+" response");
    if (rows.length >= 200) throw new Error(spec.schema+" returned at least 200 records; implement paging.");
    const clean = rows.map(row=>({
      value:row.Id?.value ?? row.Id,
      displayValue:row[display]?.displayValue ?? row[display]?.value ?? row[display]
    })).filter(item=>item.value && typeof item.displayValue==="string" && item.displayValue.trim());
    context["UsrRP"+spec.key+"Options"] = clean;
    return clean.length;
  }
  // UI choices from the Figma report samples, not records in a Creatio SLA object.
  // Do not interpret these fixed identifiers as database IDs.
  const SLA_OPTIONS = [
    {value:"612dbbd5-8b79-53a7-9ecb-72dbb493a712",displayValue:"Healthy"},
    {value:"a674aeaf-6e62-5ba6-812f-1cd0bf1bcf7e",displayValue:"Approaching"},
    {value:"8d950086-a663-572d-9778-342272ba23ca",displayValue:"Overdue"}
  ];
  function showFeedback(context,message) {
    context.UsrRPStatusMessage = message || "";
    context.UsrRPStatusVisible = Boolean(message);
  }
  function idOf(v) {
    if (v == null || v === "") return null;
    return (typeof v === "object") ? (v.value ?? v.Id ?? null) : v;
  }
  function normalized(data) {
    return {
      DateFrom:serializable(data.DateFrom), DateTo:serializable(data.DateTo),
      ContractId:idOf(data.Contract), ProjectId:idOf(data.Project),
      RequestStatusId:idOf(data.RequestStatus),
      AuthorityId:idOf(data.Authority),
      RequestTypeId:idOf(data.RequestType),
      // The SLA dropdown uses stable UI keys; convert them to the report's text value.
      SLAStatusName:(SLA_OPTIONS.find(x=>x.value===idOf(data.SLAStatus))||{}).displayValue||null
    };
  }
  function check(data) {
    const a = data.DateFrom ? new Date(data.DateFrom) : null;
    const b = data.DateTo ? new Date(data.DateTo) : null;
    if (a && Number.isNaN(a.getTime())) return "Date From is invalid.";
    if (b && Number.isNaN(b.getTime())) return "Date To is invalid.";
    if (a && b && a > b) return "Date From must not be after Date To.";
    if (idOf(data.SLAStatus) && !SLA_OPTIONS.some(x=>x.value===idOf(data.SLAStatus))) {
      return "Invalid SLA Status selection.";
    }
    // The Report Viewer applies Authority through the Project.Account relationship.
    // Request Type and SLA Status require the corresponding UsrVMRequest fields.
    // Missing fields produce an explicit report error rather than silently ignoring a filter.
    return "";
  }

  // Saved filters are retrieved with an Owner + report-code filter in the
  // Creatio data query. This is not a replacement for Creatio record permissions.
  async function currentContactId() {
    const values = await new sdk.SysValuesService().loadSysValues();
    const contact = idOf(values.userContact);
    if (!contact) throw new Error("Current user contact could not be resolved.");
    return String(contact).toLowerCase();
  }
  function readValue(raw) {
    if (raw && typeof raw === "object" && !(raw instanceof Date)) {
      return raw.value ?? raw.displayValue ?? raw;
    }
    return raw;
  }
  function asDate(raw) {
    const v = readValue(raw);
    if (!v) return null;
    // Use local midnight for SQL Date columns to avoid an off-by-one-day
    // timezone shift when the SDK returns a date-only ISO string.
    const parsed = typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v)
      ? new Date(v + "T00:00:00") : new Date(v);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  function chooseOption(options, raw, label) {
    const id = idOf(raw);
    if (!id) return null;
    const found = (options || []).find(x => String(x.value).toLowerCase() === String(id).toLowerCase());
    if (!found) throw new Error("Saved " + label + " is no longer available in your lookup options.");
    return found;
  }
  async function getOwnedSavedRows(ctx) {
    const ownerId = await currentContactId();
    const filters = new sdk.FilterGroup();
    await filters.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal, "UsrOwner", ownerId);
    await filters.addSchemaColumnFilterWithParameter(sdk.ComparisonType.Equal, "UsrReportCode", "REQUEST_STATUS");
    const model = await sdk.Model.create("UsrMCITReportSavedFilter");
    const rows = await model.load({
      attributes:[
        "Id", "UsrName", "UsrOwner", "UsrReportCode", "UsrDateFrom", "UsrDateTo",
        "UsrContract", "UsrAuthority", "UsrProject", "UsrRequestType",
        "UsrRequestStatus", "UsrSLAStatus", "CreatedOn"
      ],
      parameters:[{
        type:sdk.ModelParameterType.Filter,
        value:Object.assign({}, filters, {items:filters.items})
      }],
      options:{
        pagingConfig:{rowsOffset:0,rowCount:200},
        sortingConfig:{columns:[{columnName:"CreatedOn",direction:"desc"}]}
      }
    });
    if (!Array.isArray(rows)) throw new Error("Unexpected saved-filter response.");
    if (rows.length >= 200) throw new Error("Saved filter limit reached (200). Implement pagination.");
    // Defense in depth: require exact match even if server filtering is misconfigured.
    return rows.filter(row =>
      String(idOf(row.UsrOwner) || "").toLowerCase() === ownerId &&
      String(readValue(row.UsrReportCode) || "") === "REQUEST_STATUS"
    );
  }
  async function refreshSavedFilterChoices(ctx, preferredId) {
    const rows = await getOwnedSavedRows(ctx);
    const options = rows.map(row => ({
      value:idOf(row.Id),
      displayValue:String(readValue(row.UsrName) || "Unnamed filter")
    }));
    ctx.UsrRPSavedFilterOptions = options;
    ctx.UsrRPSavedFilter = options.find(x =>
      String(x.value).toLowerCase() === String(preferredId || "").toLowerCase()) || null;
    return rows;
  }
  async function applySavedRow(ctx, row) {
    // Resolve all values BEFORE changing the form. Inactive or missing lookups
    // should fail without partially applying a saved filter.
    const restored = {
      DateFrom:asDate(row.UsrDateFrom),
      DateTo:asDate(row.UsrDateTo),
      Contract:chooseOption(await ctx.UsrRPContractOptions, row.UsrContract, "Contract"),
      Authority:chooseOption(await ctx.UsrRPAuthorityOptions, row.UsrAuthority, "Authority"),
      Project:chooseOption(await ctx.UsrRPProjectOptions, row.UsrProject, "Project"),
      RequestType:chooseOption(await ctx.UsrRPRequestTypeOptions, row.UsrRequestType, "Request Type"),
      RequestStatus:chooseOption(await ctx.UsrRPRequestStatusOptions, row.UsrRequestStatus, "Request Status"),
      SLAStatus:null
    };
    const slaName = String(readValue(row.UsrSLAStatus) || "");
    if (slaName) {
      restored.SLAStatus=SLA_OPTIONS.find(x=>x.displayValue.toLowerCase()===slaName.toLowerCase()) || null;
      if (!restored.SLAStatus) throw new Error("Unknown saved SLA Status: " + slaName);
    }
    for (const key of keys) ctx["UsrRP"+key] = restored[key];
  }

  return {
    viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[

  {
    "operation": "insert",
    "name": "UsrRPStage",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "alignItems": "stretch",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-stage"
      ]
    },
    "parentName": "Main",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrReportParametersRoot",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "alignItems": "stretch",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-report-parameters-page"
      ]
    },
    "parentName": "UsrRPStage",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPTitleRow",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "row",
      "alignItems": "center",
      "wrap": "wrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-title-row"
      ]
    },
    "parentName": "UsrReportParametersRoot",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "UsrRPHeading",
    "values": {
      "type": "crt.Label",
      "caption": "Request Status Report",
      "labelType": "headline-1",
      "headingLevel": "h1",
      "classes": [
        "usr-rp-heading"
      ]
    },
    "parentName": "UsrRPTitleRow",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPBadgePill",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "row",
      "alignItems": "center",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-badge-pill"
      ]
    },
    "parentName": "UsrRPTitleRow",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "UsrRPBadge",
    "values": {
      "type": "crt.Label",
      "caption": "Requests",
      "labelType": "body",
      "classes": [
        "usr-rp-badge"
      ]
    },
    "parentName": "UsrRPBadgePill",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPDescription",
    "values": {
      "type": "crt.Label",
      "caption": "Current status of all VM requests with workflow stage and SLA position",
      "labelType": "body",
      "classes": [
        "usr-rp-description"
      ]
    },
    "parentName": "UsrReportParametersRoot",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "UsrRPNoticeBar",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "row",
      "alignItems": "center",
      "wrap": "wrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-notice"
      ]
    },
    "parentName": "UsrReportParametersRoot",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "UsrRPScopeNotice",
    "values": {
      "type": "crt.Label",
      "caption": "ⓘ  Data Scope Notice: reports must respect your assigned contract, authority and project scope. Server-side enforcement is still required.",
      "labelType": "body"
    },
    "parentName": "UsrRPNoticeBar",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPPanel",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "alignItems": "stretch",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-panel"
      ]
    },
    "parentName": "UsrReportParametersRoot",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "UsrRPPanelHeader",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "alignItems": "stretch",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-panel-header"
      ]
    },
    "parentName": "UsrRPPanel",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPPanelTitle",
    "values": {
      "type": "crt.Label",
      "caption": "Report Parameters",
      "labelType": "headline-2",
      "classes": [
        "usr-rp-panel-title"
      ]
    },
    "parentName": "UsrRPPanelHeader",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPFormGrid",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(0,1fr)",
        "minmax(0,1fr)"
      ],
      "rows": "repeat(4,minmax(70px,max-content))",
      "gap": {
        "columnGap": "medium",
        "rowGap": "small"
      },
      "items": [],
      "fitContent": true,
      "alignItems": "stretch",
      "classes": [
        "usr-rp-grid"
      ]
    },
    "parentName": "UsrRPPanel",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "UsrRPDateFromArea",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "alignItems": "stretch",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-field"
      ],
      "layoutConfig": {
        "column": 1,
        "row": 1,
        "colSpan": 1,
        "rowSpan": 1
      }
    },
    "parentName": "UsrRPFormGrid",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPDateFromStandaloneLabel",
    "values": {
      "type": "crt.Label",
      "caption": "Date From",
      "labelType": "body",
      "visible": true,
      "classes": [
        "usr-rp-standalone-label"
      ]
    },
    "parentName": "UsrRPDateFromArea",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPDateFromInputShell",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "row",
      "alignItems": "center",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-control-shell"
      ]
    },
    "parentName": "UsrRPDateFromArea",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "UsrRPDateFromControl",
    "values": {
      "type": "crt.DateTimePicker",
      "label": "Date From",
      "labelPosition": "hidden",
      "control": "$UsrRPDateFrom",
      "visible": true,
      "pickerType": "date",
      "classes": [
        "usr-rp-inner-control"
      ],
      "placeholder": "DD/MM/YYYY"
    },
    "parentName": "UsrRPDateFromInputShell",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPDateToArea",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "alignItems": "stretch",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-field"
      ],
      "layoutConfig": {
        "column": 2,
        "row": 1,
        "colSpan": 1,
        "rowSpan": 1
      }
    },
    "parentName": "UsrRPFormGrid",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "UsrRPDateToStandaloneLabel",
    "values": {
      "type": "crt.Label",
      "caption": "Date To",
      "labelType": "body",
      "visible": true,
      "classes": [
        "usr-rp-standalone-label"
      ]
    },
    "parentName": "UsrRPDateToArea",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPDateToInputShell",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "row",
      "alignItems": "center",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-control-shell"
      ]
    },
    "parentName": "UsrRPDateToArea",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "UsrRPDateToControl",
    "values": {
      "type": "crt.DateTimePicker",
      "label": "Date To",
      "labelPosition": "hidden",
      "control": "$UsrRPDateTo",
      "visible": true,
      "pickerType": "date",
      "classes": [
        "usr-rp-inner-control"
      ],
      "placeholder": "DD/MM/YYYY"
    },
    "parentName": "UsrRPDateToInputShell",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPContractArea",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "alignItems": "stretch",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-field"
      ],
      "layoutConfig": {
        "column": 1,
        "row": 2,
        "colSpan": 1,
        "rowSpan": 1
      }
    },
    "parentName": "UsrRPFormGrid",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "UsrRPContractStandaloneLabel",
    "values": {
      "type": "crt.Label",
      "caption": "Contract",
      "labelType": "body",
      "visible": true,
      "classes": [
        "usr-rp-standalone-label"
      ]
    },
    "parentName": "UsrRPContractArea",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPContractInputShell",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "row",
      "alignItems": "center",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-control-shell"
      ]
    },
    "parentName": "UsrRPContractArea",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "UsrRPContractControl",
    "values": {
      "type": "crt.ComboBox",
      "label": "Contract",
      "labelPosition": "hidden",
      "control": "$UsrRPContract",
      "visible": true,
      "placeholder": "All",
      "items": "$UsrRPContractOptions",
      "isAddAllowed": false,
      "showValueAsLink": false,
      "listActions": [],
      "controlActions": [],
      "classes": [
        "usr-rp-inner-control"
      ]
    },
    "parentName": "UsrRPContractInputShell",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPAuthorityArea",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "alignItems": "stretch",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-field"
      ],
      "layoutConfig": {
        "column": 2,
        "row": 2,
        "colSpan": 1,
        "rowSpan": 1
      }
    },
    "parentName": "UsrRPFormGrid",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "UsrRPAuthorityStandaloneLabel",
    "values": {
      "type": "crt.Label",
      "caption": "Authority",
      "labelType": "body",
      "visible": true,
      "classes": [
        "usr-rp-standalone-label"
      ]
    },
    "parentName": "UsrRPAuthorityArea",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPAuthorityInputShell",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "row",
      "alignItems": "center",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-control-shell"
      ]
    },
    "parentName": "UsrRPAuthorityArea",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "UsrRPAuthorityControl",
    "values": {
      "type": "crt.ComboBox",
      "label": "Authority",
      "labelPosition": "hidden",
      "control": "$UsrRPAuthority",
      "visible": true,
      "placeholder": "All",
      "items": "$UsrRPAuthorityOptions",
      "isAddAllowed": false,
      "showValueAsLink": false,
      "listActions": [],
      "controlActions": [],
      "classes": [
        "usr-rp-inner-control"
      ]
    },
    "parentName": "UsrRPAuthorityInputShell",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPProjectArea",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "alignItems": "stretch",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-field"
      ],
      "layoutConfig": {
        "column": 1,
        "row": 3,
        "colSpan": 1,
        "rowSpan": 1
      }
    },
    "parentName": "UsrRPFormGrid",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "UsrRPProjectStandaloneLabel",
    "values": {
      "type": "crt.Label",
      "caption": "Project",
      "labelType": "body",
      "visible": true,
      "classes": [
        "usr-rp-standalone-label"
      ]
    },
    "parentName": "UsrRPProjectArea",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPProjectInputShell",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "row",
      "alignItems": "center",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-control-shell"
      ]
    },
    "parentName": "UsrRPProjectArea",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "UsrRPProjectControl",
    "values": {
      "type": "crt.ComboBox",
      "label": "Project",
      "labelPosition": "hidden",
      "control": "$UsrRPProject",
      "visible": true,
      "placeholder": "All",
      "items": "$UsrRPProjectOptions",
      "isAddAllowed": false,
      "showValueAsLink": false,
      "listActions": [],
      "controlActions": [],
      "classes": [
        "usr-rp-inner-control"
      ]
    },
    "parentName": "UsrRPProjectInputShell",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPRequestTypeArea",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "alignItems": "stretch",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-field"
      ],
      "layoutConfig": {
        "column": 2,
        "row": 3,
        "colSpan": 1,
        "rowSpan": 1
      }
    },
    "parentName": "UsrRPFormGrid",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "UsrRPRequestTypeStandaloneLabel",
    "values": {
      "type": "crt.Label",
      "caption": "Request Type",
      "labelType": "body",
      "visible": true,
      "classes": [
        "usr-rp-standalone-label"
      ]
    },
    "parentName": "UsrRPRequestTypeArea",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPRequestTypeInputShell",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "row",
      "alignItems": "center",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-control-shell"
      ]
    },
    "parentName": "UsrRPRequestTypeArea",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "UsrRPRequestTypeControl",
    "values": {
      "type": "crt.ComboBox",
      "label": "Request Type",
      "labelPosition": "hidden",
      "control": "$UsrRPRequestType",
      "visible": true,
      "placeholder": "All",
      "items": "$UsrRPRequestTypeOptions",
      "isAddAllowed": false,
      "showValueAsLink": false,
      "listActions": [],
      "controlActions": [],
      "readonly": false,
      "classes": [
        "usr-rp-inner-control"
      ]
    },
    "parentName": "UsrRPRequestTypeInputShell",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPRequestStatusArea",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "alignItems": "stretch",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-field"
      ],
      "layoutConfig": {
        "column": 1,
        "row": 4,
        "colSpan": 1,
        "rowSpan": 1
      }
    },
    "parentName": "UsrRPFormGrid",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "UsrRPRequestStatusStandaloneLabel",
    "values": {
      "type": "crt.Label",
      "caption": "Request Status",
      "labelType": "body",
      "visible": true,
      "classes": [
        "usr-rp-standalone-label"
      ]
    },
    "parentName": "UsrRPRequestStatusArea",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPRequestStatusInputShell",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "row",
      "alignItems": "center",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-control-shell"
      ]
    },
    "parentName": "UsrRPRequestStatusArea",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "UsrRPRequestStatusControl",
    "values": {
      "type": "crt.ComboBox",
      "label": "Request Status",
      "labelPosition": "hidden",
      "control": "$UsrRPRequestStatus",
      "visible": true,
      "placeholder": "All",
      "items": "$UsrRPRequestStatusOptions",
      "isAddAllowed": false,
      "showValueAsLink": false,
      "listActions": [],
      "controlActions": [],
      "classes": [
        "usr-rp-inner-control"
      ]
    },
    "parentName": "UsrRPRequestStatusInputShell",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPSLAStatusArea",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "alignItems": "stretch",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-field"
      ],
      "layoutConfig": {
        "column": 2,
        "row": 4,
        "colSpan": 1,
        "rowSpan": 1
      }
    },
    "parentName": "UsrRPFormGrid",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "UsrRPSLAStatusStandaloneLabel",
    "values": {
      "type": "crt.Label",
      "caption": "SLA Status",
      "labelType": "body",
      "visible": true,
      "classes": [
        "usr-rp-standalone-label"
      ]
    },
    "parentName": "UsrRPSLAStatusArea",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPSLAStatusInputShell",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "row",
      "alignItems": "center",
      "wrap": "nowrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-control-shell"
      ]
    },
    "parentName": "UsrRPSLAStatusArea",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "UsrRPSLAStatusControl",
    "values": {
      "type": "crt.ComboBox",
      "label": "SLA Status",
      "labelPosition": "hidden",
      "control": "$UsrRPSLAStatus",
      "visible": true,
      "placeholder": "All",
      "items": "$UsrRPSLAStatusOptions",
      "isAddAllowed": false,
      "showValueAsLink": false,
      "listActions": [],
      "controlActions": [],
      "classes": [
        "usr-rp-inner-control"
      ]
    },
    "parentName": "UsrRPSLAStatusInputShell",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPActions",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "row",
      "alignItems": "center",
      "wrap": "wrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-actions"
      ],
      "justifyContent": "space-between"
    },
    "parentName": "UsrReportParametersRoot",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "UsrRPLeftActions",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "row",
      "alignItems": "center",
      "wrap": "wrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-actions-left"
      ]
    },
    "parentName": "UsrRPActions",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPRightActions",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "row",
      "alignItems": "center",
      "wrap": "wrap",
      "gap": "none",
      "items": [],
      "fitContent": true,
      "classes": [
        "usr-rp-actions-right"
      ]
    },
    "parentName": "UsrRPActions",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "UsrRPResetButton",
    "values": {
      "type": "crt.Button",
      "caption": "Reset",
      "color": "default",
      "size": "large",
      "iconPosition": "only-text",
      "disabled": false,
      "classes": [
        "usr-rp-reset"
      ],
      "clicked": {
        "request": "usr.ReportParametersReset"
      }
    },
    "parentName": "UsrRPLeftActions",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPSaveButton",
    "values": {
      "type": "crt.Button",
      "caption": "Save Personal Filter",
      "color": "default",
      "size": "large",
      "iconPosition": "only-text",
      "disabled": false,
      "classes": [
        "usr-rp-action-secondary"
      ],
      "clicked": {
        "request": "usr.ReportParametersSave"
      }
    },
    "parentName": "UsrRPLeftActions",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "UsrRPRunButton",
    "values": {
      "type": "crt.Button",
      "caption": "Run Report",
      "color": "primary",
      "size": "large",
      "iconPosition": "only-text",
      "disabled": false,
      "classes": [
        "usr-rp-run"
      ],
      "clicked": {
        "request": "usr.ReportParametersRun"
      }
    },
    "parentName": "UsrRPRightActions",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "UsrRPExcelButton",
    "values": {
      "type": "crt.Button",
      "caption": "Export Excel",
      "color": "default",
      "size": "large",
      "iconPosition": "only-text",
      "disabled": true,
      "classes": [
        "usr-rp-action-secondary",
        "usr-rp-disabled"
      ],
      "clicked": {
        "request": "usr.ReportParametersExport"
      }
    },
    "parentName": "UsrRPRightActions",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "UsrRPPdfButton",
    "values": {
      "type": "crt.Button",
      "caption": "Export PDF",
      "color": "default",
      "size": "large",
      "iconPosition": "only-text",
      "disabled": true,
      "classes": [
        "usr-rp-action-secondary",
        "usr-rp-disabled"
      ],
      "clicked": {
        "request": "usr.ReportParametersExport"
      }
    },
    "parentName": "UsrRPRightActions",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation":"insert",
    "name":"UsrRPSavedFilterBar",
    "values":{
      "type":"crt.FlexContainer","direction":"row","alignItems":"end",
      "wrap":"wrap","gap":"small","fitContent":true,"items":[],
      "classes":["usr-rp-saved-bar"]
    },
    "parentName":"UsrReportParametersRoot","propertyName":"items","index":6
  },
  {
    "operation":"insert",
    "name":"UsrRPSavedSelectArea",
    "values":{
      "type":"crt.FlexContainer","direction":"column","alignItems":"stretch",
      "wrap":"nowrap","gap":"none","fitContent":true,"items":[],
      "classes":["usr-rp-saved-area"]
    },
    "parentName":"UsrRPSavedFilterBar","propertyName":"items","index":0
  },
  {
    "operation":"insert",
    "name":"UsrRPSavedFilterLabel",
    "values":{"type":"crt.Label","caption":"My Saved Filters","labelType":"body", "classes":["usr-rp-saved-label"]},
    "parentName":"UsrRPSavedSelectArea","propertyName":"items","index":0
  },
  {
    "operation":"insert",
    "name":"UsrRPSavedFilterInputShell",
    "values":{
      "type":"crt.FlexContainer","direction":"row","alignItems":"center",
      "gap":"none","fitContent":true,"items":[],
      "classes":["usr-rp-saved-input"]
    },
    "parentName":"UsrRPSavedSelectArea","propertyName":"items","index":1
  },
  {
    "operation":"insert",
    "name":"UsrRPSavedFilterControl",
    "values":{
      "type":"crt.ComboBox","label":"My Saved Filters","labelPosition":"hidden",
      "control":"$UsrRPSavedFilter", "placeholder":"Choose a saved filter",
      "items":"$UsrRPSavedFilterOptions", "isAddAllowed":false,
      "showValueAsLink":false, "listActions":[],"controlActions":[]
    },
    "parentName":"UsrRPSavedFilterInputShell","propertyName":"items","index":0
  },
  {
    "operation":"insert",
    "name":"UsrRPLoadSavedButton",
    "values":{
      "type":"crt.Button","caption":"Load Saved Filter","color":"default",
      "size":"large","iconPosition":"only-text","disabled":false,
      "classes":["usr-rp-load-button"],
      "clicked":{"request":"usr.ReportParametersLoadSaved"}
    },
    "parentName":"UsrRPSavedFilterBar","propertyName":"items","index":1
  },
  {
    "operation": "insert",
    "name": "UsrRPStatusMessage",
    "values": {
      "type": "crt.Label",
      "caption": "$UsrRPStatusMessage",
      "visible": "$UsrRPStatusVisible",
      "labelType": "body",
      "classes": [
        "usr-rp-status"
      ]
    },
    "parentName": "UsrReportParametersRoot",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "UsrRPBackButton",
    "values": {
      "type": "crt.Button",
      "caption": "←  Back to Catalog",
      "color": "default",
      "size": "large",
      "iconPosition": "only-text",
      "classes": [
        "usr-rp-back"
      ],
      "clicked": {
        "request": "crt.ClosePageRequest"
      }
    },
    "parentName": "UsrReportParametersRoot",
    "propertyName": "items",
    "index": 0
  }

]/**SCHEMA_VIEW_CONFIG_DIFF*/,
    viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
      {"operation":"merge","path":["attributes"],"values":{
  "UsrRPDateFrom": {},
  "UsrRPDateTo": {},
  "UsrRPContract": {"value":null,"dataValueType":10},
  "UsrRPContractOptions": {"value":[]},
  "UsrRPAuthority": {"value":null,"dataValueType":10},
  "UsrRPAuthorityOptions": {"value":[]},
  "UsrRPProject": {"value":null,"dataValueType":10},
  "UsrRPProjectOptions": {"value":[]},
  "UsrRPRequestType": {"value":null,"dataValueType":10},
  "UsrRPRequestTypeOptions": {"value":[]},
  "UsrRPRequestStatus": {"value":null,"dataValueType":10},
  "UsrRPRequestStatusOptions": {"value":[]},
  "UsrRPSLAStatus": {"value":null,"dataValueType":10},
  "UsrRPSLAStatusOptions": {"value":[]},
  "UsrRPLookupError": {"value":false},
  "UsrRPSavedFilter": {"value":null,"dataValueType":10},
  "UsrRPSavedFilterOptions": {"value":[]},
  "UsrRPLoadingSaved": {"value":false},
  "UsrRPSaving": {"value":false},
  "UsrRPStatusMessage": {"value":""},
  "UsrRPStatusVisible": {"value":false}
}}
    ]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
    modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
      {"operation":"merge","path":[],"values":{"dataSources":{}}}
    ]/**SCHEMA_MODEL_CONFIG_DIFF*/,
    handlers: /**SCHEMA_HANDLERS*/[
      {
        request:"crt.HandleViewModelInitRequest",
        handler:async (request,next)=>{
          const result = await next?.handle(request);
          request.$context.UsrRPSLAStatusOptions = SLA_OPTIONS;
          // Keep the initial layout clean: no lookup counts or diagnostics under the buttons.
          showFeedback(request.$context, "");
          for (const spec of LOOKUP_SOURCES) {
            try { await loadLookup(request.$context,spec); }
            catch(error){
              console.warn("MCIT report lookup unavailable",spec.schema,error);
              request.$context["UsrRP"+spec.key+"Options"] = [];
              // Authority is optional until it is connected to the VM Request backend.
              if (spec.key !== "Authority") request.$context.UsrRPLookupError = true;
            }
          }
          if (await request.$context.UsrRPLookupError) {
            showFeedback(request.$context, "Some required lookups could not be loaded. Check access and console logs.");
          }
          try { await refreshSavedFilterChoices(request.$context); }
          catch(e) {
            console.warn("MCIT saved filters unavailable",e);
            showFeedback(request.$context, "Saved filters could not be loaded. Check access to UsrMCITReportSavedFilter.");
          }
          return result;
        }
      },
      {
        request:"usr.ReportParametersReset",
        handler:async (request,next)=>{
          for (const key of keys) request.$context["UsrRP"+key]=null;
          showFeedback(request.$context, "");
          return next?.handle(request);
        }
      },
      {
        request:"usr.ReportParametersLoadSaved",
        handler:async (request,next)=>{
          const ctx=request.$context;
          if (await ctx.UsrRPLoadingSaved) return;
          const selected=idOf(await ctx.UsrRPSavedFilter);
          if (!selected) {
            showFeedback(ctx,"Select a saved filter first.");
            return;
          }
          ctx.UsrRPLoadingSaved=true;
          try {
            // Query the database again rather than trusting an option or cached row.
            const rows=await getOwnedSavedRows(ctx);
            const row=rows.find(x=>String(idOf(x.Id)).toLowerCase()===String(selected).toLowerCase());
            if (!row) throw new Error("Saved filter not found or not owned by the signed-in user.");
            await applySavedRow(ctx,row);
            showFeedback(ctx,"Loaded personal filter: "+String(readValue(row.UsrName)||"Unnamed filter"));
          } catch(e) {
            console.error("MCIT personal filter load failed",e);
            showFeedback(ctx,"Could not load filter. "+(e?.message||"Check permissions."));
          } finally {ctx.UsrRPLoadingSaved=false;}
          return next?.handle(request);
        }
      },
      {
        request:"usr.ReportParametersSave",
        handler:async (request,next)=>{
          // Saving a filter is allowed even when the Report Viewer does not yet
          // support a selected filter. Execution is validated independently.
          const ctx=request.$context;
          if (await ctx.UsrRPSaving) return;
          const data=await collect(ctx);
          const error=check({...data,Authority:null,RequestType:null,SLAStatus:null});
          if (error) {showFeedback(ctx,error);return;}

          const proposed="Request Status - "+new Date().toLocaleString("en-GB");
          const entered=window.prompt("Saved filter name",proposed);
          if (entered===null) return; // User canceled.
          const name=entered.trim();
          if (!name || name.length>250) {
            showFeedback(ctx,"Enter a filter name (1 to 250 characters).");
            return;
          }

          ctx.UsrRPSaving=true;
          try {
            // The lookup is tied to the current authenticated Creatio user.
            const sysValues=await new sdk.SysValuesService().loadSysValues();
            const ownerId=idOf(sysValues.userContact);
            if (!ownerId) throw new Error("Current user contact is unavailable.");

            const dto={
              UsrName:name,
              UsrOwner:ownerId,
              UsrReportCode:"REQUEST_STATUS"
            };
            // Native Date attributes are saved to real Date columns.
            if (data.DateFrom) dto.UsrDateFrom=new Date(data.DateFrom);
            if (data.DateTo) dto.UsrDateTo=new Date(data.DateTo);
            if (idOf(data.Contract)) dto.UsrContract=idOf(data.Contract);
            if (idOf(data.Authority)) dto.UsrAuthority=idOf(data.Authority);
            if (idOf(data.Project)) dto.UsrProject=idOf(data.Project);
            if (idOf(data.RequestType)) dto.UsrRequestType=idOf(data.RequestType);
            if (idOf(data.RequestStatus)) dto.UsrRequestStatus=idOf(data.RequestStatus);
            if (idOf(data.SLAStatus)) {
              const selected=SLA_OPTIONS.find(x=>x.value===idOf(data.SLAStatus));
              if(!selected) throw new Error("Invalid SLA Status selection.");
              dto.UsrSLAStatus=selected.displayValue;
            }
            const model=await sdk.Model.create("UsrMCITReportSavedFilter");
            const result=await model.insert(dto);
            if(result===false || (result && result.success===false)) {
              throw new Error("Creatio did not confirm the insert.");
            }
            try {
              await refreshSavedFilterChoices(ctx);
            } catch(refreshErr) {
              console.warn("MCIT saved filter list refresh failed",refreshErr);
              showFeedback(ctx,"Filter saved, but saved-filter list could not refresh. Reopen the page.");
              return;
            }
            showFeedback(ctx,"Personal filter saved to Creatio: "+name);
          } catch(e) {
            console.error("MCIT personal filter database save failed",e);
            showFeedback(ctx,"Could not save filter to Creatio. "+(e?.message||"Check object permissions and columns."));
          } finally {
            ctx.UsrRPSaving=false;
          }
          return next?.handle(request);
        }
      },
      {
        request:"usr.ReportParametersRun",
        handler:async (request,next)=>{
          const data=await collect(request.$context);
          const error=check(data);
          if(error){showFeedback(request.$context,error);return;}
          if(await request.$context.UsrRPLookupError) {
            showFeedback(request.$context,"Lookups were not loaded. Cannot run report reliably.");
            return;
          }
          try {
            sessionStorage.setItem("MCIT.ReportParameters.PendingRun.v1",
              JSON.stringify(normalized(data)));
          } catch(e) {
            showFeedback(request.$context,"Unable to pass filters to the viewer.");
            return;
          }
          // Use Creatio's documented page navigation request, not a raw URL hash.
          // The previous working flow used crt.OpenPageRequest.
          showFeedback(request.$context, "Opening Report Viewer...");
          let navigationTimeout;
          try {
            const opening = sdk.HandlerChainService.instance.process({
              type:"crt.OpenPageRequest",
              schemaName:"UsrReportViewer",
              $context:request.$context,
              scopes:[...(request.scopes || [])]
            });
            await Promise.race([
              opening,
              new Promise((_, reject) => {
                navigationTimeout=setTimeout(() => reject(new Error(
                  "Report Viewer did not finish opening within 15 seconds. Inspect the browser Console / Network tab."
                )),15000);
              })
            ]);
          } catch (error) {
            console.error("MCIT Report Viewer navigation failed",error);
            showFeedback(request.$context,"Report Viewer navigation failed: "+
              (error && error.message ? error.message : String(error)));
          } finally {
            if(navigationTimeout) clearTimeout(navigationTimeout);
          }
          return next?.handle(request);
        }
      },
      {
        request:"usr.ReportParametersExport",
        handler:async(request,next)=>{
          showFeedback(request.$context,"Run a real report first. Export will be enabled on the results page.");
          return next?.handle(request);
        }
      }
    ]/**SCHEMA_HANDLERS*/,
    converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
    validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
  };
});
