define("UsrVMLifecycle_ListPage",["@creatio-devkit/common"],function(sdk){
const modules={"host.js":function(require,exports){
const { PortalElement } = require("core/portal-element.js");
const { html } = require("core/html.js");
const { raw } = require("core/html.js");
const { SESSION, refreshData } = require("data/api.js");
require("mcit/vms.js");
require("mcit/vm-lifecycle.js");
require("mcit/vm-lifecycle-action.js");
require("mcit/vm-lifecycle-history.js");
class VMPortalHost extends PortalElement {
 static tag='usr-vm-portal-v2'
 static styles=':host{display:block;width:100%;background:#f5f4f8;min-height:75vh}.frame{padding:24px;max-width:1600px;margin:auto}.nav{display:flex;gap:8px;padding:16px 24px;background:white;border-bottom:1px solid #e5e7eb}.nav button{font:inherit;border:1px solid #e5e7eb;border-radius:10px;background:white;padding:8px 16px;cursor:pointer}.nav button[aria-current=page]{background:#5b1fa8;color:white} .crumb{font-size:13px;color:#6b7280;margin-bottom:20px}'
 constructor(){super();this.addEventListener('portal-navigate',e=>{e.stopPropagation();this.route(e.detail.page,e.detail.id)})}
 initialState(){return {page:this.getAttribute('initial-page')||'vm-lifecycle',recordId:null}}
 async load(){await refreshData();this.canReview=SESSION.canReview}
 route(page,id){
  if(page==='request-detail'){
   const match=String(id||'').match(/^[0-9a-f-]{36}$/i)
   if(!match){this._actionError='This VM has no linked source request.';this.requestRender();return}
   // Route the record through Creatio, using the native page already configured for this object.
   this.dispatchEvent(new CustomEvent('usr-open-request',{bubbles:true,composed:true,detail:{id}}));return
  }
  if(!['vms','vm-lifecycle','vm-lifecycle-action','vm-lifecycle-history'].includes(page)){this._actionError='This destination is outside the installed VM portal.';this.requestRender();return}
  this.setState({page,recordId:id||null})
 }
 onNav(e,el){this.route(el.dataset.page)}
 template(){
  const tags={'vms':'mcit-vms','vm-lifecycle':'mcit-vm-lifecycle','vm-lifecycle-action':'mcit-vm-lifecycle-action','vm-lifecycle-history':'mcit-vm-lifecycle-history'}
  const tag=tags[this.state.page]||'mcit-vm-lifecycle'
  const record=this.state.recordId?html` record-id="${this.state.recordId}"`:''
  return html`<div class="frame">${raw('<'+tag+String(record)+'></'+tag+'>')}</div>`
 }
}
PortalElement.define(VMPortalHost)

},
"core/portal-element.js":function(require,exports){
// PortalElement — base class for every screen component.
//
// A screen is a custom element with its own Shadow DOM, so its markup and
// styles are isolated from the host page (Creatio or the dev harness).
//
//   class McitRequests extends PortalElement {
//     static tag = 'mcit-requests'
//     static styles = css`...`                    // screen-only CSS (optional)
//     initialState() { return { search: '' } }    // like useState defaults
//     async load() { this.requests = await api.getRequests() }
//     template() { return html`...` }             // like the JSX return
//     onSearch(e) { this.setState({ search: e.target.value }) }
//   }
//   PortalElement.define(McitRequests)
//
// Events: put `data-on-<event>="methodName"` on any element inside the
// template; the base class delegates the DOM event and calls
// this.methodName(event, element). Supported events are listed in EVENTS.
//
// Navigation: this.navigate('request-detail', id) fires a `portal-navigate`
// event that leaves the shadow root. The host (dev harness or Creatio page)
// decides how to open the target screen.
//
// Inputs from the host: the `record-id` attribute (this.recordId) carries the
// ID a screen needs, matching the `param` the prototype's navigate() passed.

const { escapeHtml } = require("core/html.js");
const { sharedSheets, sheetFromCss } = require("styles/index.js");
const EVENTS = ['click', 'input', 'change', 'submit', 'keydown', 'focusout', 'mouseover', 'mouseout']

const ownSheets = new WeakMap()

class PortalElement extends HTMLElement {
  /** Custom element tag name. Override in subclasses. */
  static tag = ''
  /** Screen-specific CSS string. Override in subclasses. */
  static styles = ''
  /** Portal the screen belongs to ('mcit' | 'te'); included in navigate events. */
  static portal = ''

  static get observedAttributes() {
    return ['record-id']
  }

  /** Registers the element once; safe to call repeatedly. */
  static define(Cls) {
    if (!Cls.tag) throw new Error(`${Cls.name} has no static tag`)
    if (!customElements.get(Cls.tag)) customElements.define(Cls.tag, Cls)
    return Cls
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const Cls = this.constructor
    if (!ownSheets.has(Cls)) ownSheets.set(Cls, Cls.styles ? sheetFromCss(Cls.styles) : null)
    const own = ownSheets.get(Cls)
    this.shadowRoot.adoptedStyleSheets = own ? [...sharedSheets, own] : [...sharedSheets]

    this.state = {}
    this._renderQueued = false
    this._ready = false
    this._error = null

    for (const type of EVENTS) {
      this.shadowRoot.addEventListener(type, (event) => this._dispatch(type, event))
    }
  }

  connectedCallback() {
    // A host may set .recordId before this element's module has loaded; that
    // creates an own property hiding the setter, so move it onto the attribute.
    if (Object.prototype.hasOwnProperty.call(this, 'recordId')) {
      const value = this.recordId
      delete this.recordId
      this.recordId = value
    }
    if (!this._started) {
      this._started = true
      this._start()
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this._started && oldValue !== newValue) this._start()
  }

  /** ID passed in by the host (prototype: the second argument of navigate()). */
  get recordId() {
    return this.getAttribute('record-id')
  }

  /** Hosts may set the ID as a property (e.g. a Creatio binding) instead of the attribute. */
  set recordId(value) {
    if (value === null || value === undefined || value === '') this.removeAttribute('record-id')
    else this.setAttribute('record-id', String(value))
  }

  /** Default state. Override; called before load() each time the screen starts. */
  initialState() {
    return {}
  }

  /** Fetch data. Override; may be sync or async. Store results on `this` or in state. */
  load() {}

  /** Return the screen markup (an html`` result). Override. */
  template() {
    return ''
  }

  /** Called after each render, e.g. to focus an element. Override if needed. */
  afterRender() {}

  /** Merge a patch (object, or function of state) into state and re-render. */
  setState(patch) {
    const next = typeof patch === 'function' ? patch(this.state) : patch
    Object.assign(this.state, next)
    this.requestRender()
  }

  /** Re-render on the next microtask (batches several setState calls). */
  requestRender() {
    if (this._renderQueued) return
    this._renderQueued = true
    queueMicrotask(() => {
      this._renderQueued = false
      this.render()
    })
  }

  /** Ask the host to open another screen. Mirrors the prototype's navigate(page, param). */
  navigate(page, id) {
    this.dispatchEvent(
      new CustomEvent('portal-navigate', {
        bubbles: true,
        composed: true,
        detail: { portal: this.constructor.portal, page, id: id ?? null },
      }),
    )
  }

  /** Shorthand for querySelector inside the shadow root. */
  $(selector) {
    return this.shadowRoot.querySelector(selector)
  }

  // ── internals ─────────────────────────────────────────────────────────────

  async _start() {
    this.state = { ...this.initialState() }
    this._ready = false
    this._error = null
    this.render()
    try {
      await this.load()
    } catch (err) {
      console.error(`[${this.constructor.tag}] load failed`, err)
      this._error = err
    }
    this._ready = true
    this.render()
  }

  render() {
    const root = this.shadowRoot
    const focus = this._captureFocus()
    const scroll = this._captureScroll()

    if (this._error) {
      root.innerHTML = `<div class="portal-message portal-message--error">Something went wrong loading this screen.</div>`
    } else if (!this._ready) {
      root.innerHTML = `<div class="portal-message">Loading…</div>`
    } else {
      root.innerHTML = (this._actionError ? `<div role="alert" class="portal-message portal-message--error">${escapeHtml(this._actionError)}</div>` : '') + String(this.template())
    }

    this._restoreScroll(scroll)
    this._restoreFocus(focus)
    if (this._ready && !this._error) this.afterRender()
  }

  _dispatch(type, event) {
    const attr = `data-on-${type}`
    for (const node of event.composedPath()) {
      if (node === this.shadowRoot) break
      if (node instanceof Element && node.hasAttribute(attr)) {
        const method = node.getAttribute(attr)
        if (typeof this[method] !== 'function') {
          console.warn(`[${this.constructor.tag}] no handler "${method}" for ${type}`)
          return
        }
        if (type === 'submit') event.preventDefault()
        if (this._actionPending) return
        this._actionError = null
        try {
          const pending = this[method](event, node)
          if (pending && typeof pending.then === 'function') {
            this._actionPending = true
            if (node.tagName === 'BUTTON') node.disabled = true
            pending.catch(error => { this._actionError = error.message || 'The operation failed.' }).finally(() => {
              this._actionPending = false
              this.requestRender()
            })
          }
        } catch (error) { this._actionError = error.message || 'The operation failed.'; this.requestRender() }
        return
      }
    }
  }

  // Re-rendering replaces the DOM, so keep the user's place in form fields
  // and scrollable panels. Elements are matched by id, name or data-key.
  _keyOf(el) {
    if (!el) return null
    if (el.id) return `#${CSS.escape(el.id)}`
    if (el.getAttribute('name')) return `[name="${CSS.escape(el.getAttribute('name'))}"]`
    if (el.dataset?.key) return `[data-key="${CSS.escape(el.dataset.key)}"]`
    return null
  }

  _captureFocus() {
    const el = this.shadowRoot.activeElement
    const key = this._keyOf(el)
    if (!key) return null
    let start = null
    let end = null
    try {
      start = el.selectionStart
      end = el.selectionEnd
    } catch {
      /* not a text field */
    }
    return { key, start, end }
  }

  _restoreFocus(focus) {
    if (!focus) return
    const el = this.shadowRoot.querySelector(focus.key)
    if (!el) return
    el.focus({ preventScroll: true })
    if (focus.start !== null && typeof el.setSelectionRange === 'function') {
      try {
        el.setSelectionRange(focus.start, focus.end)
      } catch {
        /* input type without selection support */
      }
    }
  }

  _captureScroll() {
    const out = []
    this.shadowRoot.querySelectorAll('[data-key]').forEach((el) => {
      if (el.scrollTop || el.scrollLeft) out.push([`[data-key="${CSS.escape(el.dataset.key)}"]`, el.scrollTop, el.scrollLeft])
    })
    return out
  }

  _restoreScroll(list) {
    for (const [sel, top, left] of list) {
      const el = this.shadowRoot.querySelector(sel)
      if (el) {
        el.scrollTop = top
        el.scrollLeft = left
      }
    }
  }
}

/** Tag for CSS strings: gives editors CSS highlighting; returns the string unchanged. */
function css(strings, ...values) {
  return strings.reduce((out, s, i) => out + s + (i < values.length ? values[i] : ''), '')
}

Object.defineProperty(exports,"PortalElement",{enumerable:true,get:()=>PortalElement});
Object.defineProperty(exports,"css",{enumerable:true,get:()=>css});
},
"core/html.js":function(require,exports){
// Safe HTML templating — the replacement for JSX.
//
//   html`<p class="text-sm">${user.name}</p>`
//
// Every interpolated value is HTML-escaped unless it is itself an `html`
// result (or wrapped in `raw()`), so nested templates compose naturally:
//
//   html`<ul>${items.map(i => html`<li>${i.label}</li>`)}</ul>`
//
// null / undefined / false render as nothing (like `{cond && <x/>}` in JSX).
// Arrays are flattened. The result is a SafeHtml object; String(result)
// gives the markup.

class SafeHtml {
  constructor(value) {
    this.value = value
  }
  toString() {
    return this.value
  }
}

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ESCAPES[c])
}

function renderValue(value) {
  if (value === null || value === undefined || value === false || value === true) return ''
  if (value instanceof SafeHtml) return value.value
  if (Array.isArray(value)) return value.map(renderValue).join('')
  return escapeHtml(value)
}

function html(strings, ...values) {
  let out = strings[0]
  for (let i = 0; i < values.length; i++) {
    out += renderValue(values[i]) + strings[i + 1]
  }
  return new SafeHtml(out)
}

/** Marks a trusted string (e.g. an SVG from icons.js) as safe to insert unescaped. */
function raw(markup) {
  return new SafeHtml(markup ?? '')
}

/**
 * Builds a class attribute value from strings and conditional objects.
 *   cx('btn', size === 'sm' && 'btn--sm', { 'is-active': active })
 */
function cx(...parts) {
  const out = []
  for (const part of parts) {
    if (!part) continue
    if (typeof part === 'string') out.push(part)
    else if (typeof part === 'object') {
      for (const [name, on] of Object.entries(part)) if (on) out.push(name)
    }
  }
  return out.join(' ')
}

/**
 * Builds an inline style attribute value from an object, skipping empty values.
 * Keys are written in CSS form: style({ 'background': 'var(--we-tint)', width: pct + '%' })
 */
function styleAttr(obj) {
  return Object.entries(obj)
    .filter(([, v]) => v !== null && v !== undefined && v !== false && v !== '')
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ')
}

Object.defineProperty(exports,"SafeHtml",{enumerable:true,get:()=>SafeHtml});
Object.defineProperty(exports,"escapeHtml",{enumerable:true,get:()=>escapeHtml});
Object.defineProperty(exports,"html",{enumerable:true,get:()=>html});
Object.defineProperty(exports,"raw",{enumerable:true,get:()=>raw});
Object.defineProperty(exports,"cx",{enumerable:true,get:()=>cx});
Object.defineProperty(exports,"styleAttr",{enumerable:true,get:()=>styleAttr});
},
"styles/index.js":function(require,exports){
// Shared stylesheets adopted by every screen's shadow root.
// Built once and shared by reference, so 40 screens don't duplicate CSS.

const tokens = require("styles/tokens.js").default;
const utilities = require("styles/utilities.js").default;
const ui = require("styles/ui.js").default;
/** Turns a CSS string into a constructable stylesheet (shareable across shadow roots). */
function sheetFromCss(cssText) {
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(cssText)
  return sheet
}

// Order matters: tokens → reset + utilities (in @layer) → UI components (unlayered, wins).
const sharedSheets = [sheetFromCss(tokens), sheetFromCss(utilities), sheetFromCss(ui)]

// Fonts must be registered on the document, not inside a shadow root.
// If the host page's Content Security Policy blocks Google Fonts (possible in
// Creatio), the components fall back to the system UI font.
const FONT_URL = 'https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap'
if (typeof document !== 'undefined' && !document.querySelector(`link[href="${FONT_URL}"]`)) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = FONT_URL
  document.head.appendChild(link)
}

Object.defineProperty(exports,"sheetFromCss",{enumerable:true,get:()=>sheetFromCss});
Object.defineProperty(exports,"sharedSheets",{enumerable:true,get:()=>sharedSheets});
},
"styles/tokens.js":function(require,exports){
// Design tokens — WE Design System + the colour palette used by the screens.
//
// Declared on :host so they apply inside each component's shadow root and do
// NOT leak into the page that hosts the component (e.g. Creatio).
//
// Rule: screens never hard-code colours. Use these variables, e.g.
//   style="background: var(--we-tint); color: var(--color-we-600)"
// The table in CLAUDE.md maps every hex value the prototype used to a token.

exports.default = /* css */ `
:host {
  --font-sans: 'Rubik', ui-sans-serif, system-ui, sans-serif;

  /* WE Brand Violet scale */
  --color-we-50:  #f3eeff;
  --color-we-100: #e4d5ff;
  --color-we-200: #ccb0ff;
  --color-we-300: #a97dff;
  --color-we-400: #8a4fff;
  --color-we-500: #7027f5;
  --color-we-600: #5b1fa8;
  --color-we-700: #4a1a8a;
  --color-we-800: #341260;
  --color-we-900: #1e0a38;
  --we-gradient: linear-gradient(135deg, var(--color-we-600) 0%, var(--color-we-500) 100%);

  /* Semantic colours */
  --color-surface:        #f5f4f8;
  --color-surface-card:   #ffffff;
  --color-border:         #e5e7eb;
  --color-border-strong:  #d1d5db;
  --color-text-primary:   #1c1b1f;
  --color-text-secondary: #6b7280;
  --color-text-muted:     #9ca3af;

  --color-success-bg: #ecfdf5;
  --color-success:    #16a34a;
  --color-warning-bg: #fffbeb;
  --color-warning:    #d97706;
  --color-error-bg:   #fef2f2;
  --color-error:      #dc2626;
  --color-info-bg:    #eff6ff;
  --color-info:       #2563eb;

  /* Palette — every hex the prototype hard-coded, by name */
  --white: #ffffff;

  --gray-50:  #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #1c1b1f;
  --neutral-50: #fafafa;

  --green-50:  #f0fdf4;
  --green-100: #dcfce7;
  --green-600: #16a34a;
  --emerald-50:  #ecfdf5;
  --emerald-200: #a7f3d0;
  --emerald-800: #065f46;

  --red-25:  #fff5f5;
  --red-50:  #fef2f2;
  --red-100: #fee2e2;
  --red-200: #fecaca;
  --red-300: #fca5a5;
  --red-600: #dc2626;
  --red-800: #991b1b;

  --amber-50:  #fffbeb;
  --amber-200: #fde68a;
  --amber-500: #f59e0b;
  --amber-600: #d97706;
  --amber-800: #92400e;
  --yellow-50:  #fefce8;
  --yellow-100: #fef9c3;
  --yellow-600: #ca8a04;

  --blue-50:  #eff6ff;
  --blue-200: #bfdbfe;
  --blue-600: #2563eb;
  --blue-700: #1d4ed8;
  --blue-800: #1e40af;
  --cyan-600: #0891b2;

  --violet-50:  #f5f3ff;
  --violet-100: #ede9fe;
  --violet-200: #ddd6fe;
  --violet-300: #c4b5fd;
  --violet-400: #a78bfa;

  /* WE lilac tints (backgrounds, hovers, selected rows) */
  --we-tint:     #f0edf8;  /* the main tint: active nav, badges, icon tiles */
  --we-tint-25:  #fdfcff;
  --we-tint-40:  #faf9fd;
  --we-tint-50:  #f9f8fc;
  --we-tint-60:  #f9f8ff;
  --we-tint-70:  #f9f7ff;
  --we-tint-80:  #f8f7ff;
  --we-tint-100: #f5f0ff;
  --we-tint-200: #ede9f6;
  --we-tint-300: #e0d9f7;

  /* Radii */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.04);
  --shadow-we: 0 2px 8px rgba(91, 31, 168, 0.35);

  display: block;
  font-family: var(--font-sans);
  color: var(--color-text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:host([hidden]) { display: none; }

:focus-visible {
  outline: 2px solid var(--color-we-600);
  outline-offset: 2px;
}

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--gray-300); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--gray-400); }

.portal-message {
  padding: 48px 16px;
  text-align: center;
  font-size: 14px;
  color: var(--color-text-muted);
}
.portal-message--error { color: var(--color-error); }
`

},
"styles/utilities.js":function(require,exports){
// Layout & utility stylesheet for all portal components.
//
// Contains a CSS reset plus the layout/spacing/typography helper classes the
// MCIT and TE screens use (flex, grid, gap-*, p-*, text-sm, rounded-lg, …).
// It was generated ONCE from the prototype's class usage and is now plain,
// hand-maintained CSS — there is no Tailwind dependency or build step.
// Class names match the prototype so markup can be ported faithfully.
// Portions derived from Tailwind CSS (MIT License, https://tailwindcss.com).
//
// Add a helper here only if several screens need it; screen-specific styling
// belongs in the screen's own `styles` string.

exports.default = /* css */ `
@layer theme {
  :root, :host {
    --font-sans: 'Rubik', ui-sans-serif, system-ui, sans-serif;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
    --color-red-50: oklch(97.1% 0.013 17.38);
    --color-red-200: oklch(88.5% 0.062 18.334);
    --color-red-500: oklch(63.7% 0.237 25.331);
    --color-red-600: oklch(57.7% 0.245 27.325);
    --color-red-700: oklch(50.5% 0.213 27.518);
    --color-red-800: oklch(44.4% 0.177 26.899);
    --color-red-900: oklch(39.6% 0.141 25.723);
    --color-amber-50: oklch(98.7% 0.022 95.277);
    --color-amber-200: oklch(92.4% 0.12 95.746);
    --color-amber-500: oklch(76.9% 0.188 70.08);
    --color-amber-600: oklch(66.6% 0.179 58.318);
    --color-amber-700: oklch(55.5% 0.163 48.998);
    --color-amber-800: oklch(47.3% 0.137 46.201);
    --color-amber-900: oklch(41.4% 0.112 45.904);
    --color-green-50: oklch(98.2% 0.018 155.826);
    --color-green-500: oklch(72.3% 0.219 149.579);
    --color-green-600: oklch(62.7% 0.194 149.214);
    --color-green-700: oklch(52.7% 0.154 150.069);
    --color-green-800: oklch(44.8% 0.119 151.328);
    --color-green-900: oklch(39.3% 0.095 152.535);
    --color-blue-50: oklch(97% 0.014 254.604);
    --color-blue-600: oklch(54.6% 0.245 262.881);
    --color-blue-700: oklch(48.8% 0.243 264.376);
    --color-violet-50: oklch(96.9% 0.016 293.756);
    --color-violet-100: oklch(94.3% 0.029 294.588);
    --color-violet-200: oklch(89.4% 0.057 293.283);
    --color-violet-400: oklch(70.2% 0.183 293.541);
    --color-violet-500: oklch(60.6% 0.25 292.717);
    --color-violet-600: oklch(54.1% 0.281 293.009);
    --color-violet-700: oklch(49.1% 0.27 292.581);
    --color-violet-800: oklch(43.2% 0.232 292.759);
    --color-purple-200: oklch(90.2% 0.063 306.703);
    --color-gray-50: oklch(98.5% 0.002 247.839);
    --color-gray-100: oklch(96.7% 0.003 264.542);
    --color-gray-200: oklch(92.8% 0.006 264.531);
    --color-gray-300: oklch(87.2% 0.01 258.338);
    --color-gray-400: oklch(70.7% 0.022 261.325);
    --color-gray-500: oklch(55.1% 0.027 264.364);
    --color-gray-600: oklch(44.6% 0.03 256.802);
    --color-gray-700: oklch(37.3% 0.034 259.733);
    --color-gray-800: oklch(27.8% 0.033 256.848);
    --color-gray-900: oklch(21% 0.034 264.665);
    --color-black: #000;
    --color-white: #fff;
    --spacing: 0.25rem;
    --container-xs: 20rem;
    --container-sm: 24rem;
    --container-md: 28rem;
    --container-lg: 32rem;
    --container-xl: 36rem;
    --container-2xl: 42rem;
    --container-3xl: 48rem;
    --container-4xl: 56rem;
    --text-xs: 0.75rem;
    --text-xs--line-height: calc(1 / 0.75);
    --text-sm: 0.875rem;
    --text-sm--line-height: calc(1.25 / 0.875);
    --text-base: 1rem;
    --text-base--line-height: calc(1.5 / 1);
    --text-lg: 1.125rem;
    --text-lg--line-height: calc(1.75 / 1.125);
    --text-xl: 1.25rem;
    --text-xl--line-height: calc(1.75 / 1.25);
    --text-2xl: 1.5rem;
    --text-2xl--line-height: calc(2 / 1.5);
    --text-3xl: 1.875rem;
    --text-3xl--line-height: calc(2.25 / 1.875);
    --text-5xl: 3rem;
    --text-5xl--line-height: 1;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --font-weight-black: 900;
    --tracking-wide: 0.025em;
    --tracking-wider: 0.05em;
    --leading-tight: 1.25;
    --leading-snug: 1.375;
    --leading-relaxed: 1.625;
    --radius-sm: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-2xl: 1rem;
    --animate-spin: spin 1s linear infinite;
    --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    --default-transition-duration: 150ms;
    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    --default-font-family: var(--font-sans);
    --default-mono-font-family: var(--font-mono);
  }
}
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--default-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji');
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b, strong {
    font-weight: bolder;
  }
  code, kbd, samp, pre {
    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace);
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(--default-mono-font-variation-settings, normal);
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring:where(:not(iframe)) {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol, ul, menu {
    list-style: none;
  }
  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button, input:where([type='button'], [type='reset'], [type='submit']), ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden='until-found'])) {
    display: none !important;
  }
}
@layer utilities {
  .pointer-events-none {
    pointer-events: none;
  }
  .visible {
    visibility: visible;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border-width: 0;
  }
  .absolute {
    position: absolute;
  }
  .fixed {
    position: fixed;
  }
  .relative {
    position: relative;
  }
  .sticky {
    position: sticky;
  }
  .inset-0 {
    inset: 0px;
  }
  .-top-1 {
    top: calc(var(--spacing) * -1);
  }
  .-top-8 {
    top: calc(var(--spacing) * -8);
  }
  .top-0 {
    top: 0px;
  }
  .top-1 {
    top: var(--spacing);
  }
  .top-1\\.5 {
    top: calc(var(--spacing) * 1.5);
  }
  .top-1\\/2 {
    top: calc(1 / 2 * 100%);
  }
  .top-4 {
    top: calc(var(--spacing) * 4);
  }
  .-right-1 {
    right: calc(var(--spacing) * -1);
  }
  .right-1 {
    right: var(--spacing);
  }
  .right-3 {
    right: calc(var(--spacing) * 3);
  }
  .bottom-1\\.5 {
    bottom: calc(var(--spacing) * 1.5);
  }
  .left-0 {
    left: 0px;
  }
  .left-1\\/2 {
    left: calc(1 / 2 * 100%);
  }
  .left-3 {
    left: calc(var(--spacing) * 3);
  }
  .z-10 {
    z-index: 10;
  }
  .z-40 {
    z-index: 40;
  }
  .z-50 {
    z-index: 50;
  }
  .col-span-1 {
    grid-column: span 1 / span 1;
  }
  .col-span-2 {
    grid-column: span 2 / span 2;
  }
  .col-span-3 {
    grid-column: span 3 / span 3;
  }
  .-mx-2 {
    margin-inline: calc(var(--spacing) * -2);
  }
  .-mx-5 {
    margin-inline: calc(var(--spacing) * -5);
  }
  .mx-1 {
    margin-inline: var(--spacing);
  }
  .mx-2 {
    margin-inline: calc(var(--spacing) * 2);
  }
  .mx-4 {
    margin-inline: calc(var(--spacing) * 4);
  }
  .mx-auto {
    margin-inline: auto;
  }
  .my-1 {
    margin-block: var(--spacing);
  }
  .my-2 {
    margin-block: calc(var(--spacing) * 2);
  }
  .my-4 {
    margin-block: calc(var(--spacing) * 4);
  }
  .mt-0\\.5 {
    margin-top: calc(var(--spacing) * 0.5);
  }
  .mt-1 {
    margin-top: var(--spacing);
  }
  .mt-1\\.5 {
    margin-top: calc(var(--spacing) * 1.5);
  }
  .mt-2 {
    margin-top: calc(var(--spacing) * 2);
  }
  .mt-3 {
    margin-top: calc(var(--spacing) * 3);
  }
  .mt-3\\.5 {
    margin-top: calc(var(--spacing) * 3.5);
  }
  .mt-4 {
    margin-top: calc(var(--spacing) * 4);
  }
  .mt-5 {
    margin-top: calc(var(--spacing) * 5);
  }
  .mt-6 {
    margin-top: calc(var(--spacing) * 6);
  }
  .mt-8 {
    margin-top: calc(var(--spacing) * 8);
  }
  .mt-\\[-12px\\] {
    margin-top: -12px;
  }
  .mr-1 {
    margin-right: var(--spacing);
  }
  .-mb-5 {
    margin-bottom: calc(var(--spacing) * -5);
  }
  .-mb-px {
    margin-bottom: -1px;
  }
  .mb-0\\.5 {
    margin-bottom: calc(var(--spacing) * 0.5);
  }
  .mb-1 {
    margin-bottom: var(--spacing);
  }
  .mb-1\\.5 {
    margin-bottom: calc(var(--spacing) * 1.5);
  }
  .mb-2 {
    margin-bottom: calc(var(--spacing) * 2);
  }
  .mb-3 {
    margin-bottom: calc(var(--spacing) * 3);
  }
  .mb-4 {
    margin-bottom: calc(var(--spacing) * 4);
  }
  .mb-5 {
    margin-bottom: calc(var(--spacing) * 5);
  }
  .mb-6 {
    margin-bottom: calc(var(--spacing) * 6);
  }
  .mb-8 {
    margin-bottom: calc(var(--spacing) * 8);
  }
  .ml-0\\.5 {
    margin-left: calc(var(--spacing) * 0.5);
  }
  .ml-1\\.5 {
    margin-left: calc(var(--spacing) * 1.5);
  }
  .ml-2 {
    margin-left: calc(var(--spacing) * 2);
  }
  .ml-3 {
    margin-left: calc(var(--spacing) * 3);
  }
  .ml-4 {
    margin-left: calc(var(--spacing) * 4);
  }
  .ml-auto {
    margin-left: auto;
  }
  .line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .block {
    display: block;
  }
  .flex {
    display: flex;
  }
  .grid {
    display: grid;
  }
  .hidden {
    display: none;
  }
  .inline {
    display: inline;
  }
  .inline-block {
    display: inline-block;
  }
  .inline-flex {
    display: inline-flex;
  }
  .table {
    display: table;
  }
  .h-0\\.5 {
    height: calc(var(--spacing) * 0.5);
  }
  .h-1\\.5 {
    height: calc(var(--spacing) * 1.5);
  }
  .h-2 {
    height: calc(var(--spacing) * 2);
  }
  .h-2\\.5 {
    height: calc(var(--spacing) * 2.5);
  }
  .h-3 {
    height: calc(var(--spacing) * 3);
  }
  .h-4 {
    height: calc(var(--spacing) * 4);
  }
  .h-5 {
    height: calc(var(--spacing) * 5);
  }
  .h-6 {
    height: calc(var(--spacing) * 6);
  }
  .h-7 {
    height: calc(var(--spacing) * 7);
  }
  .h-8 {
    height: calc(var(--spacing) * 8);
  }
  .h-9 {
    height: calc(var(--spacing) * 9);
  }
  .h-10 {
    height: calc(var(--spacing) * 10);
  }
  .h-12 {
    height: calc(var(--spacing) * 12);
  }
  .h-14 {
    height: calc(var(--spacing) * 14);
  }
  .h-16 {
    height: calc(var(--spacing) * 16);
  }
  .h-20 {
    height: calc(var(--spacing) * 20);
  }
  .h-full {
    height: 100%;
  }
  .h-px {
    height: 1px;
  }
  .h-screen {
    height: 100vh;
  }
  .max-h-36 {
    max-height: calc(var(--spacing) * 36);
  }
  .max-h-\\[70vh\\] {
    max-height: 70vh;
  }
  .max-h-screen {
    max-height: 100vh;
  }
  .min-h-4 {
    min-height: calc(var(--spacing) * 4);
  }
  .min-h-screen {
    min-height: 100vh;
  }
  .w-0\\.5 {
    width: calc(var(--spacing) * 0.5);
  }
  .w-1\\.5 {
    width: calc(var(--spacing) * 1.5);
  }
  .w-2 {
    width: calc(var(--spacing) * 2);
  }
  .w-2\\.5 {
    width: calc(var(--spacing) * 2.5);
  }
  .w-3 {
    width: calc(var(--spacing) * 3);
  }
  .w-4 {
    width: calc(var(--spacing) * 4);
  }
  .w-5 {
    width: calc(var(--spacing) * 5);
  }
  .w-6 {
    width: calc(var(--spacing) * 6);
  }
  .w-7 {
    width: calc(var(--spacing) * 7);
  }
  .w-8 {
    width: calc(var(--spacing) * 8);
  }
  .w-9 {
    width: calc(var(--spacing) * 9);
  }
  .w-10 {
    width: calc(var(--spacing) * 10);
  }
  .w-12 {
    width: calc(var(--spacing) * 12);
  }
  .w-14 {
    width: calc(var(--spacing) * 14);
  }
  .w-16 {
    width: calc(var(--spacing) * 16);
  }
  .w-20 {
    width: calc(var(--spacing) * 20);
  }
  .w-24 {
    width: calc(var(--spacing) * 24);
  }
  .w-28 {
    width: calc(var(--spacing) * 28);
  }
  .w-32 {
    width: calc(var(--spacing) * 32);
  }
  .w-36 {
    width: calc(var(--spacing) * 36);
  }
  .w-72 {
    width: calc(var(--spacing) * 72);
  }
  .w-fit {
    width: fit-content;
  }
  .w-full {
    width: 100%;
  }
  .w-px {
    width: 1px;
  }
  .max-w-2xl {
    max-width: var(--container-2xl);
  }
  .max-w-3xl {
    max-width: var(--container-3xl);
  }
  .max-w-4xl {
    max-width: var(--container-4xl);
  }
  .max-w-20 {
    max-width: calc(var(--spacing) * 20);
  }
  .max-w-28 {
    max-width: calc(var(--spacing) * 28);
  }
  .max-w-32 {
    max-width: calc(var(--spacing) * 32);
  }
  .max-w-56 {
    max-width: calc(var(--spacing) * 56);
  }
  .max-w-full {
    max-width: 100%;
  }
  .max-w-lg {
    max-width: var(--container-lg);
  }
  .max-w-md {
    max-width: var(--container-md);
  }
  .max-w-sm {
    max-width: var(--container-sm);
  }
  .max-w-xl {
    max-width: var(--container-xl);
  }
  .max-w-xs {
    max-width: var(--container-xs);
  }
  .min-w-0 {
    min-width: 0px;
  }
  .min-w-4 {
    min-width: calc(var(--spacing) * 4);
  }
  .min-w-16 {
    min-width: calc(var(--spacing) * 16);
  }
  .min-w-28 {
    min-width: calc(var(--spacing) * 28);
  }
  .min-w-32 {
    min-width: calc(var(--spacing) * 32);
  }
  .min-w-48 {
    min-width: calc(var(--spacing) * 48);
  }
  .min-w-\\[900px\\] {
    min-width: 900px;
  }
  .min-w-\\[1000px\\] {
    min-width: 1000px;
  }
  .min-w-\\[1100px\\] {
    min-width: 1100px;
  }
  .min-w-max {
    min-width: max-content;
  }
  .flex-1 {
    flex: 1;
  }
  .shrink-0 {
    flex-shrink: 0;
  }
  .border-collapse {
    border-collapse: collapse;
  }
  .-translate-x-1\\/2 {
    --tw-translate-x: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .-translate-y-1\\/2 {
    --tw-translate-y: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .animate-pulse {
    animation: var(--animate-pulse);
  }
  .animate-spin {
    animation: var(--animate-spin);
  }
  .cursor-not-allowed {
    cursor: not-allowed;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .resize {
    resize: both;
  }
  .resize-none {
    resize: none;
  }
  .appearance-none {
    appearance: none;
  }
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  .flex-col {
    flex-direction: column;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .items-center {
    align-items: center;
  }
  .items-end {
    align-items: flex-end;
  }
  .items-start {
    align-items: flex-start;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .gap-0 {
    gap: 0px;
  }
  .gap-0\\.5 {
    gap: calc(var(--spacing) * 0.5);
  }
  .gap-1 {
    gap: var(--spacing);
  }
  .gap-1\\.5 {
    gap: calc(var(--spacing) * 1.5);
  }
  .gap-2 {
    gap: calc(var(--spacing) * 2);
  }
  .gap-2\\.5 {
    gap: calc(var(--spacing) * 2.5);
  }
  .gap-3 {
    gap: calc(var(--spacing) * 3);
  }
  .gap-4 {
    gap: calc(var(--spacing) * 4);
  }
  .gap-5 {
    gap: calc(var(--spacing) * 5);
  }
  .gap-6 {
    gap: calc(var(--spacing) * 6);
  }
  :where(.space-y-4 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));
    margin-block-end: calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)));
  }
  :where(.space-y-5 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(calc(var(--spacing) * 5) * var(--tw-space-y-reverse));
    margin-block-end: calc(calc(var(--spacing) * 5) * calc(1 - var(--tw-space-y-reverse)));
  }
  :where(.divide-y > :not(:last-child)) {
    --tw-divide-y-reverse: 0;
    border-bottom-style: var(--tw-border-style);
    border-top-style: var(--tw-border-style);
    border-top-width: calc(1px * var(--tw-divide-y-reverse));
    border-bottom-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  }
  :where(.divide-gray-50 > :not(:last-child)) {
    border-color: var(--color-gray-50);
  }
  :where(.divide-gray-100 > :not(:last-child)) {
    border-color: var(--color-gray-100);
  }
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .overflow-visible {
    overflow: visible;
  }
  .overflow-x-auto {
    overflow-x: auto;
  }
  .overflow-y-auto {
    overflow-y: auto;
  }
  .rounded {
    border-radius: 0.25rem;
  }
  .rounded-2xl {
    border-radius: var(--radius-2xl);
  }
  .rounded-full {
    border-radius: calc(infinity * 1px);
  }
  .rounded-lg {
    border-radius: var(--radius-lg);
  }
  .rounded-md {
    border-radius: var(--radius-md);
  }
  .rounded-sm {
    border-radius: var(--radius-sm);
  }
  .rounded-xl {
    border-radius: var(--radius-xl);
  }
  .rounded-r-full {
    border-top-right-radius: calc(infinity * 1px);
    border-bottom-right-radius: calc(infinity * 1px);
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  .border-2 {
    border-style: var(--tw-border-style);
    border-width: 2px;
  }
  .border-4 {
    border-style: var(--tw-border-style);
    border-width: 4px;
  }
  .border-t {
    border-top-style: var(--tw-border-style);
    border-top-width: 1px;
  }
  .border-r {
    border-right-style: var(--tw-border-style);
    border-right-width: 1px;
  }
  .border-b {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 1px;
  }
  .border-b-2 {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 2px;
  }
  .border-dashed {
    --tw-border-style: dashed;
    border-style: dashed;
  }
  .border-amber-200 {
    border-color: var(--color-amber-200);
  }
  .border-gray-50 {
    border-color: var(--color-gray-50);
  }
  .border-gray-100 {
    border-color: var(--color-gray-100);
  }
  .border-gray-200 {
    border-color: var(--color-gray-200);
  }
  .border-red-200 {
    border-color: var(--color-red-200);
  }
  .border-violet-100 {
    border-color: var(--color-violet-100);
  }
  .border-violet-200 {
    border-color: var(--color-violet-200);
  }
  .border-t-violet-600 {
    border-top-color: var(--color-violet-600);
  }
  .bg-amber-50 {
    background-color: var(--color-amber-50);
  }
  .bg-black\\/40 {
    background-color: color-mix(in srgb, #000 40%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-black) 40%, transparent);
    }
  }
  .bg-blue-50 {
    background-color: var(--color-blue-50);
  }
  .bg-gray-50 {
    background-color: var(--color-gray-50);
  }
  .bg-gray-100 {
    background-color: var(--color-gray-100);
  }
  .bg-gray-200 {
    background-color: var(--color-gray-200);
  }
  .bg-green-50 {
    background-color: var(--color-green-50);
  }
  .bg-green-500 {
    background-color: var(--color-green-500);
  }
  .bg-purple-200 {
    background-color: var(--color-purple-200);
  }
  .bg-red-50 {
    background-color: var(--color-red-50);
  }
  .bg-red-500 {
    background-color: var(--color-red-500);
  }
  .bg-violet-50 {
    background-color: var(--color-violet-50);
  }
  .bg-violet-100 {
    background-color: var(--color-violet-100);
  }
  .bg-white {
    background-color: var(--color-white);
  }
  .object-contain {
    object-fit: contain;
  }
  .p-1\\.5 {
    padding: calc(var(--spacing) * 1.5);
  }
  .p-2 {
    padding: calc(var(--spacing) * 2);
  }
  .p-2\\.5 {
    padding: calc(var(--spacing) * 2.5);
  }
  .p-3 {
    padding: calc(var(--spacing) * 3);
  }
  .p-4 {
    padding: calc(var(--spacing) * 4);
  }
  .p-5 {
    padding: calc(var(--spacing) * 5);
  }
  .p-6 {
    padding: calc(var(--spacing) * 6);
  }
  .p-8 {
    padding: calc(var(--spacing) * 8);
  }
  .p-10 {
    padding: calc(var(--spacing) * 10);
  }
  .p-12 {
    padding: calc(var(--spacing) * 12);
  }
  .px-1 {
    padding-inline: var(--spacing);
  }
  .px-1\\.5 {
    padding-inline: calc(var(--spacing) * 1.5);
  }
  .px-2 {
    padding-inline: calc(var(--spacing) * 2);
  }
  .px-2\\.5 {
    padding-inline: calc(var(--spacing) * 2.5);
  }
  .px-3 {
    padding-inline: calc(var(--spacing) * 3);
  }
  .px-4 {
    padding-inline: calc(var(--spacing) * 4);
  }
  .px-5 {
    padding-inline: calc(var(--spacing) * 5);
  }
  .px-6 {
    padding-inline: calc(var(--spacing) * 6);
  }
  .py-0\\.5 {
    padding-block: calc(var(--spacing) * 0.5);
  }
  .py-1 {
    padding-block: var(--spacing);
  }
  .py-1\\.5 {
    padding-block: calc(var(--spacing) * 1.5);
  }
  .py-2 {
    padding-block: calc(var(--spacing) * 2);
  }
  .py-2\\.5 {
    padding-block: calc(var(--spacing) * 2.5);
  }
  .py-3 {
    padding-block: calc(var(--spacing) * 3);
  }
  .py-3\\.5 {
    padding-block: calc(var(--spacing) * 3.5);
  }
  .py-4 {
    padding-block: calc(var(--spacing) * 4);
  }
  .py-5 {
    padding-block: calc(var(--spacing) * 5);
  }
  .py-6 {
    padding-block: calc(var(--spacing) * 6);
  }
  .py-8 {
    padding-block: calc(var(--spacing) * 8);
  }
  .py-10 {
    padding-block: calc(var(--spacing) * 10);
  }
  .py-12 {
    padding-block: calc(var(--spacing) * 12);
  }
  .py-16 {
    padding-block: calc(var(--spacing) * 16);
  }
  .pt-0\\.5 {
    padding-top: calc(var(--spacing) * 0.5);
  }
  .pt-1 {
    padding-top: var(--spacing);
  }
  .pt-2 {
    padding-top: calc(var(--spacing) * 2);
  }
  .pt-3 {
    padding-top: calc(var(--spacing) * 3);
  }
  .pt-4 {
    padding-top: calc(var(--spacing) * 4);
  }
  .pt-5 {
    padding-top: calc(var(--spacing) * 5);
  }
  .pr-3 {
    padding-right: calc(var(--spacing) * 3);
  }
  .pr-9 {
    padding-right: calc(var(--spacing) * 9);
  }
  .pb-4 {
    padding-bottom: calc(var(--spacing) * 4);
  }
  .pb-5 {
    padding-bottom: calc(var(--spacing) * 5);
  }
  .pb-6 {
    padding-bottom: calc(var(--spacing) * 6);
  }
  .pl-8 {
    padding-left: calc(var(--spacing) * 8);
  }
  .pl-9 {
    padding-left: calc(var(--spacing) * 9);
  }
  .text-center {
    text-align: center;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .font-mono {
    font-family: var(--font-mono);
  }
  .text-2xl {
    font-size: var(--text-2xl);
    line-height: var(--tw-leading, var(--text-2xl--line-height));
  }
  .text-3xl {
    font-size: var(--text-3xl);
    line-height: var(--tw-leading, var(--text-3xl--line-height));
  }
  .text-5xl {
    font-size: var(--text-5xl);
    line-height: var(--tw-leading, var(--text-5xl--line-height));
  }
  .text-base {
    font-size: var(--text-base);
    line-height: var(--tw-leading, var(--text-base--line-height));
  }
  .text-lg {
    font-size: var(--text-lg);
    line-height: var(--tw-leading, var(--text-lg--line-height));
  }
  .text-sm {
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm--line-height));
  }
  .text-xl {
    font-size: var(--text-xl);
    line-height: var(--tw-leading, var(--text-xl--line-height));
  }
  .text-xs {
    font-size: var(--text-xs);
    line-height: var(--tw-leading, var(--text-xs--line-height));
  }
  .text-\\[10px\\] {
    font-size: 10px;
  }
  .leading-none {
    --tw-leading: 1;
    line-height: 1;
  }
  .leading-relaxed {
    --tw-leading: var(--leading-relaxed);
    line-height: var(--leading-relaxed);
  }
  .leading-snug {
    --tw-leading: var(--leading-snug);
    line-height: var(--leading-snug);
  }
  .leading-tight {
    --tw-leading: var(--leading-tight);
    line-height: var(--leading-tight);
  }
  .font-black {
    --tw-font-weight: var(--font-weight-black);
    font-weight: var(--font-weight-black);
  }
  .font-bold {
    --tw-font-weight: var(--font-weight-bold);
    font-weight: var(--font-weight-bold);
  }
  .font-medium {
    --tw-font-weight: var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
  }
  .font-normal {
    --tw-font-weight: var(--font-weight-normal);
    font-weight: var(--font-weight-normal);
  }
  .font-semibold {
    --tw-font-weight: var(--font-weight-semibold);
    font-weight: var(--font-weight-semibold);
  }
  .tracking-wide {
    --tw-tracking: var(--tracking-wide);
    letter-spacing: var(--tracking-wide);
  }
  .tracking-wider {
    --tw-tracking: var(--tracking-wider);
    letter-spacing: var(--tracking-wider);
  }
  .whitespace-nowrap {
    white-space: nowrap;
  }
  .text-amber-500 {
    color: var(--color-amber-500);
  }
  .text-amber-600 {
    color: var(--color-amber-600);
  }
  .text-amber-700 {
    color: var(--color-amber-700);
  }
  .text-amber-800 {
    color: var(--color-amber-800);
  }
  .text-amber-900 {
    color: var(--color-amber-900);
  }
  .text-blue-600 {
    color: var(--color-blue-600);
  }
  .text-blue-700 {
    color: var(--color-blue-700);
  }
  .text-gray-200 {
    color: var(--color-gray-200);
  }
  .text-gray-300 {
    color: var(--color-gray-300);
  }
  .text-gray-400 {
    color: var(--color-gray-400);
  }
  .text-gray-500 {
    color: var(--color-gray-500);
  }
  .text-gray-600 {
    color: var(--color-gray-600);
  }
  .text-gray-700 {
    color: var(--color-gray-700);
  }
  .text-gray-800 {
    color: var(--color-gray-800);
  }
  .text-gray-900 {
    color: var(--color-gray-900);
  }
  .text-green-600 {
    color: var(--color-green-600);
  }
  .text-green-700 {
    color: var(--color-green-700);
  }
  .text-green-800 {
    color: var(--color-green-800);
  }
  .text-green-900 {
    color: var(--color-green-900);
  }
  .text-red-500 {
    color: var(--color-red-500);
  }
  .text-red-600 {
    color: var(--color-red-600);
  }
  .text-red-700 {
    color: var(--color-red-700);
  }
  .text-red-800 {
    color: var(--color-red-800);
  }
  .text-red-900 {
    color: var(--color-red-900);
  }
  .text-violet-400 {
    color: var(--color-violet-400);
  }
  .text-violet-500 {
    color: var(--color-violet-500);
  }
  .text-violet-600 {
    color: var(--color-violet-600);
  }
  .text-violet-700 {
    color: var(--color-violet-700);
  }
  .text-violet-800 {
    color: var(--color-violet-800);
  }
  .text-white {
    color: var(--color-white);
  }
  .capitalize {
    text-transform: capitalize;
  }
  .uppercase {
    text-transform: uppercase;
  }
  .italic {
    font-style: italic;
  }
  .underline {
    text-decoration-line: underline;
  }
  .accent-violet-600 {
    accent-color: var(--color-violet-600);
  }
  .opacity-0 {
    opacity: 0%;
  }
  .opacity-40 {
    opacity: 40%;
  }
  .opacity-50 {
    opacity: 50%;
  }
  .opacity-60 {
    opacity: 60%;
  }
  .opacity-90 {
    opacity: 90%;
  }
  .shadow-2xl {
    --tw-shadow: 0 25px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / 0.25));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-md {
    --tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-xl {
    --tw-shadow: 0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .filter {
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .transition {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-all {
    transition-property: all;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-colors {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-opacity {
    transition-property: opacity;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .duration-200 {
    --tw-duration: 200ms;
    transition-duration: 200ms;
  }
  .outline-none {
    --tw-outline-style: none;
    outline-style: none;
  }
  @media (hover: hover) {
    .group-hover\\:opacity-100:is(:where(.group):hover *) {
      opacity: 100%;
    }
  }
  .last\\:flex-none:last-child {
    flex: none;
  }
  .last\\:border-0:last-child {
    border-style: var(--tw-border-style);
    border-width: 0px;
  }
  .last\\:border-b-0:last-child {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 0px;
  }
  @media (hover: hover) {
    .hover\\:border-gray-300:hover {
      border-color: var(--color-gray-300);
    }
    .hover\\:bg-blue-50:hover {
      background-color: var(--color-blue-50);
    }
    .hover\\:bg-gray-50:hover {
      background-color: var(--color-gray-50);
    }
    .hover\\:bg-gray-100:hover {
      background-color: var(--color-gray-100);
    }
    .hover\\:bg-green-50:hover {
      background-color: var(--color-green-50);
    }
    .hover\\:bg-red-50:hover {
      background-color: var(--color-red-50);
    }
    .hover\\:bg-violet-50:hover {
      background-color: var(--color-violet-50);
    }
    .hover\\:bg-violet-50\\/40:hover {
      background-color: color-mix(in srgb, oklch(96.9% 0.016 293.756) 40%, transparent);
    }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\\:bg-violet-50\\/40:hover {
        background-color: color-mix(in oklab, var(--color-violet-50) 40%, transparent);
      }
    }
    .hover\\:bg-white:hover {
      background-color: var(--color-white);
    }
    .hover\\:text-blue-600:hover {
      color: var(--color-blue-600);
    }
    .hover\\:text-gray-600:hover {
      color: var(--color-gray-600);
    }
    .hover\\:text-gray-700:hover {
      color: var(--color-gray-700);
    }
    .hover\\:text-gray-800:hover {
      color: var(--color-gray-800);
    }
    .hover\\:text-red-500:hover {
      color: var(--color-red-500);
    }
    .hover\\:text-violet-600:hover {
      color: var(--color-violet-600);
    }
    .hover\\:underline:hover {
      text-decoration-line: underline;
    }
    .hover\\:opacity-80:hover {
      opacity: 80%;
    }
    .hover\\:opacity-90:hover {
      opacity: 90%;
    }
    .hover\\:opacity-100:hover {
      opacity: 100%;
    }
    .hover\\:shadow-md:hover {
      --tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
    .hover\\:shadow-sm:hover {
      --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .focus\\:border-violet-400:focus {
    border-color: var(--color-violet-400);
  }
  .active\\:scale-95:active {
    --tw-scale-x: 95%;
    --tw-scale-y: 95%;
    --tw-scale-z: 95%;
    scale: var(--tw-scale-x) var(--tw-scale-y);
  }
  .disabled\\:opacity-30:disabled {
    opacity: 30%;
  }
  @media (width >= 40rem) {
    .sm\\:col-span-2 {
      grid-column: span 2 / span 2;
    }
    .sm\\:block {
      display: block;
    }
    .sm\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .sm\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .sm\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .sm\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .sm\\:flex-row {
      flex-direction: row;
    }
    .sm\\:items-center {
      align-items: center;
    }
  }
  @media (width >= 48rem) {
    .md\\:block {
      display: block;
    }
    .md\\:flex {
      display: flex;
    }
    .md\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  @media (width >= 64rem) {
    .lg\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .lg\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .lg\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .lg\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .lg\\:flex-row {
      flex-direction: row;
    }
    .lg\\:items-start {
      align-items: flex-start;
    }
  }
  @media (width >= 80rem) {
    .xl\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .xl\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .xl\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .xl\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
  }
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}
@layer base {
    *, ::before, ::after, ::backdrop {
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-translate-z: 0;
      --tw-space-y-reverse: 0;
      --tw-divide-y-reverse: 0;
      --tw-border-style: solid;
      --tw-leading: initial;
      --tw-font-weight: initial;
      --tw-tracking: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-blur: initial;
      --tw-brightness: initial;
      --tw-contrast: initial;
      --tw-grayscale: initial;
      --tw-hue-rotate: initial;
      --tw-invert: initial;
      --tw-opacity: initial;
      --tw-saturate: initial;
      --tw-sepia: initial;
      --tw-drop-shadow: initial;
      --tw-drop-shadow-color: initial;
      --tw-drop-shadow-alpha: 100%;
      --tw-drop-shadow-size: initial;
      --tw-duration: initial;
      --tw-scale-x: 1;
      --tw-scale-y: 1;
      --tw-scale-z: 1;
    }
  }
`

},
"styles/ui.js":function(require,exports){
// Shared UI component styles — the WE components from prototype/src/mcit/shared.tsx
// (WEButton, WEInput, WESelect, WEAlert, badges, SLAIndicator, SectionCard,
// EmptyState, Tooltip). Markup for these comes from src/ui/index.js.
//
// These rules are unlayered, so they win over the utility layer.

exports.default = /* css */ `
/* ── Button ─────────────────────────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  transition: all 150ms;
  cursor: pointer;
  font-family: inherit;
}
.btn--sm { padding: 6px 12px; font-size: 12px; line-height: 16px; }
.btn--md { padding: 8px 16px; font-size: 14px; line-height: 20px; }
.btn--lg { padding: 10px 20px; font-size: 14px; line-height: 20px; }

.btn--primary   { background: var(--we-gradient); color: var(--white); border-color: transparent; }
.btn--secondary { background: var(--white); color: var(--gray-700); border-color: var(--gray-200); }
.btn--ghost     { background: transparent; color: var(--gray-500); border-color: transparent; }
.btn--danger    { background: var(--white); color: var(--red-600); border-color: var(--red-200); }

.btn:not(:disabled):hover  { opacity: 0.9; }
.btn:not(:disabled):active { transform: scale(0.95); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* ── Form fields ────────────────────────────────────────────────────────── */
.field { display: flex; flex-direction: column; gap: 4px; }
.field__label { font-size: 14px; line-height: 20px; font-weight: 500; color: var(--gray-700); }
.field__required { color: var(--red-600); margin-inline-start: 2px; }
.field__error { font-size: 12px; line-height: 16px; color: var(--red-600); }
.field__hint  { font-size: 12px; line-height: 16px; color: var(--gray-400); }

.input,
.select {
  width: 100%;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 8px 12px;
  font-family: inherit;
  font-size: 14px;
  line-height: 20px;
  background: var(--white);
  color: inherit;
  outline: none;
  transition: border-color 150ms;
}
.input { height: 40px; }
textarea.input { height: auto; resize: none; }
.input:focus, .select:focus { border-color: var(--color-we-500); }
.input:disabled, .select:disabled { background: var(--gray-50); }
.input--error, .input--error:focus,
.select--error, .select--error:focus { border-color: var(--red-300); }

.select-wrap { position: relative; }
.select { height: 40px; appearance: none; padding-inline-end: 36px; }
.select-wrap__chevron {
  position: absolute;
  inset-inline-end: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-400);
  pointer-events: none;
}

/* ── Alert ──────────────────────────────────────────────────────────────── */
.alert {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  border: 1px solid;
  font-size: 14px;
  line-height: 20px;
}
.alert__icon { flex-shrink: 0; margin-top: 2px; }
.alert__body { flex: 1; min-width: 0; }
.alert__title { font-weight: 600; }
.alert__message { opacity: 0.9; }
.alert__close { flex-shrink: 0; opacity: 0.6; transition: opacity 150ms; color: inherit; }
.alert__close:hover { opacity: 1; }
.alert--info    { background: var(--blue-50);   border-color: var(--blue-200);   color: var(--blue-700); }
.alert--warning { background: var(--amber-50);  border-color: var(--amber-200);  color: var(--amber-800); }
.alert--error   { background: var(--red-50);    border-color: var(--red-200);    color: var(--red-800); }
.alert--success { background: var(--emerald-50); border-color: var(--emerald-200); color: var(--emerald-800); }

/* ── Status badge (request / VM) ────────────────────────────────────────── */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
}
.status-badge__dot { flex-shrink: 0; width: 6px; height: 6px; border-radius: var(--radius-full); background: currentColor; }

/* ── SLA indicator ──────────────────────────────────────────────────────── */
.sla { display: flex; align-items: center; gap: 8px; }
.sla__track { flex: 1; height: 6px; border-radius: var(--radius-full); background: var(--gray-100); min-width: 64px; }
.sla__bar { height: 100%; border-radius: var(--radius-full); transition: all 150ms; }
.sla__label { font-size: 12px; line-height: 16px; font-weight: 500; white-space: nowrap; }

/* ── Section card ───────────────────────────────────────────────────────── */
.section-card { background: var(--white); border-radius: var(--radius-lg); border: 1px solid var(--gray-200); }
.section-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--gray-100);
}
.section-card__title { font-size: 14px; line-height: 20px; font-weight: 600; color: var(--gray-800); }
.section-card__subtitle { font-size: 12px; line-height: 16px; color: var(--gray-500); margin-top: 2px; }
.section-card__actions { display: flex; align-items: center; gap: 8px; }
.section-card__body { padding: 20px; }

/* ── Empty state ────────────────────────────────────────────────────────── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 0;
  text-align: center;
}
.empty-state__icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  background: var(--we-tint);
  color: var(--violet-400);
}
.empty-state__title { font-size: 14px; line-height: 20px; font-weight: 600; color: var(--gray-600); margin-bottom: 4px; }
.empty-state__description { font-size: 12px; line-height: 16px; color: var(--gray-400); max-width: 20rem; }
.empty-state__action { margin-top: 16px; }

/* ── Tooltip ────────────────────────────────────────────────────────────── */
.tooltip { position: relative; display: inline-flex; }
.tooltip__label {
  pointer-events: none;
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  border-radius: var(--radius-sm);
  padding: 4px 8px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  color: var(--white);
  background: var(--gray-900);
  opacity: 0;
  transition: opacity 150ms;
  z-index: 50;
}
.tooltip:hover .tooltip__label { opacity: 1; }

/* ── Logos ──────────────────────────────────────────────────────────────── */
.logo { display: block; max-width: 100%; flex-shrink: 0; object-fit: contain; }
.we-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: var(--radius-md);
  background: var(--we-gradient);
  box-shadow: var(--shadow-we);
  color: var(--white);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
}

/* ── Icons ──────────────────────────────────────────────────────────────── */
/* Like the prototype: SVGs are display:block (from the reset) and the
   utility classes on the icon decide the rest (hidden, mt-0.5, absolute…). */
.icon { flex-shrink: 0; }
`

},
"data/api.js":function(require,exports){
// Creatio integration. No demo fallbacks: failed requests remain failed.
const VM_RECORDS = []
const CONTRACTS = []
const LC_REQUESTS = []
const ADD_ONS = []
const WORK_ITEMS = []
const CURRENCIES = []
const SESSION = { canReview: false }
let inFlight

async function command(action, data = {}) {
  const root = location.pathname.split('/0/')[0]
  const csrf = document.cookie.match(/(?:^|;\s*)BPMCSRF=([^;]*)/)
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json', ForceUseSession: 'true' }
  if (csrf) headers.BPMCSRF = decodeURIComponent(csrf[1])
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 45000)
  try {
    const response = await fetch(`${root}/0/ServiceModel/UsrVMPortalService.svc/Execute`, {
      method: 'POST', credentials: 'same-origin', headers,
      body: JSON.stringify({ payload: JSON.stringify({ action, ...data }) }), signal: controller.signal,
    })
    if (!response.ok) throw Error(`Creatio request failed (${response.status}). Your entries have been retained.`)
    let result = await response.json()
    result = result.ExecuteResult ?? result
    if (typeof result === 'string') result = JSON.parse(result)
    if (result.success !== true) throw Error(result.message || 'Creatio could not complete this operation.')
    return result.data
  } catch (error) {
    if (error.name === 'AbortError') throw Error('Creatio did not respond within 45 seconds. Refresh history before retrying a submission.')
    throw error
  } finally { clearTimeout(timeout) }
}

async function refreshData() {
  if (inFlight) return inFlight
  inFlight = (async () => {
    const data = await command('load')
    for (const key of ['vms', 'contracts', 'requests', 'addOns', 'workItems']) {
      if (!Array.isArray(data[key])) throw Error(`Creatio returned invalid ${key} data.`)
    }
    VM_RECORDS.splice(0, VM_RECORDS.length, ...data.vms)
    CONTRACTS.splice(0, CONTRACTS.length, ...data.contracts)
    LC_REQUESTS.splice(0, LC_REQUESTS.length, ...data.requests)
    ADD_ONS.splice(0, ADD_ONS.length, ...data.addOns)
    WORK_ITEMS.splice(0, WORK_ITEMS.length, ...data.workItems)
    CURRENCIES.splice(0, CURRENCIES.length, ...(data.currencies || []))
    SESSION.canReview = data.canReview === true
    return data
  })()
  try { return await inFlight } finally { inFlight = null }
}

const loadAddOns = () => ADD_ONS

async function saveNetwork(vm, ip, vip) {
  return command('network', { vmId: vm.recordId, expectedModifiedOn: vm.modifiedOn, ip, vip })
}

async function submitLifecycle(vm, draft, requestId) {
  return command('submit', { requestId, vmId: vm.recordId, expectedModifiedOn: vm.modifiedOn, draft })
}

async function submitBulk(vms, draft, requestId) {
  return command('bulk', { requestId, vms: vms.map(v => ({ vmId: v.recordId, expectedModifiedOn: v.modifiedOn })), draft })
}

function exportCSV(rows) {
  const columns = ['id','name','sourceRequestId','authority','project','environment','ip','vip','cpu','ram','storage','status','provisionedDate','zone']
  const cell = value => {
    let text = String(value ?? '')
    // Prevent spreadsheet formula execution when user-controlled values are exported.
    if (/^[\s\uFEFF]*[=+@-]/.test(text)) text = "'" + text
    return '"' + text.replaceAll('"', '""') + '"'
  }
  const content = '\uFEFF' + [columns, ...rows.map(row => columns.map(key => row[key]))].map(row => row.map(cell).join(',')).join('\r\n')
  const url = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `MCIT-Virtual-Machines-${new Date().toISOString().slice(0,10)}.csv`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

// Recover only the four pre-existing DEMO fixtures after a schema rollback.
// Fill missing metadata from retained legacy rows; never post accounting or change status.
async function restoreDemoMetadata() {
  const root=location.pathname.split('/0/')[0]
  const token=document.cookie.match(/(?:^|;\s*)BPMCSRF=([^;]*)/)
  if(!token)throw Error('Refresh your Creatio session before restoring demo details.')
  const headers={Accept:'application/json','Content-Type':'application/json',ForceUseSession:'true',BPMCSRF:decodeURIComponent(token[1])}
  const contract='738d2521-3590-47b8-8f44-ce366e94a102'
  const ids=['111','112','113','114'].map(s=>'738d2521-3590-47b8-8f44-ce366e94a'+s)
  async function read(url){const r=await fetch(root+'/0/odata/'+url,{headers,credentials:'same-origin'});if(!r.ok)throw Error('Could not read the retained demo details ('+r.status+').');return {row:await r.json(),etag:r.headers.get('ETag')}}
  const plans=[]
  for(const id of ids){
    const {row:old}=await read('UsrVMLifecycle('+id+')')
    const {row:vm,etag}=await read('UsrVirtualMachine('+id+')?$expand=UsrStatus($select=Name)')
    if(old.UsrContractId!==contract||vm.UsrContractId!==contract||vm.UsrName!==old.UsrName||!vm.UsrName.startsWith('DEMO '))throw Error('A fixture no longer matches the retained DEMO record. No recovery was started.')
    if(vm.UsrCPU!==old.UsrCPU||vm.UsrRAMGB!==old.UsrRAM||vm.UsrStorageGB!==old.UsrStorage)throw Error('DEMO resources changed. Allocated points need reconciliation; no recovery was started.')
    const state=String(vm.UsrStatus?.Name||'').toLowerCase()
    if(!['active','suspended','terminated'].includes(state))throw Error('A DEMO VM has an unexpected status. No recovery was started.')
    const patch={}
    for(const [key,value] of Object.entries({UsrVMCode:old.UsrVMId,UsrVIP:old.UsrVIP,UsrEnvironment:'Production',UsrZone:'Cairo'}))if(!vm[key])patch[key]=value
    if(state!=='terminated'&&Number(vm.UsrAllocatedPoints)===0){if(!(old.UsrPoints>0))throw Error('The retained allocated points are invalid.');patch.UsrAllocatedPoints=old.UsrPoints}
    plans.push({id,vm,patch,etag:etag||vm['@odata.etag']})
  }
  let count=0
  for(const plan of plans){
    if(!Object.keys(plan.patch).length)continue
    const {row:fresh}=await read('UsrVirtualMachine('+plan.id+')?$select=Id,ModifiedOn')
    if(fresh.ModifiedOn!==plan.vm.ModifiedOn)throw Error('A DEMO VM changed during recovery. Stop and refresh before retrying.')
    const h={...headers};if(plan.etag)h['If-Match']=plan.etag
    const r=await fetch(root+'/0/odata/UsrVirtualMachine('+plan.id+')',{method:'PATCH',headers:h,credentials:'same-origin',body:JSON.stringify(plan.patch)})
    if(!r.ok)throw Error('DEMO recovery stopped ('+r.status+'). Only missing fields are restored; completed records are safe to retry.')
    count++
  }
  await refreshData()
  return count
}

Object.defineProperty(exports,"VM_RECORDS",{enumerable:true,get:()=>VM_RECORDS});
Object.defineProperty(exports,"CONTRACTS",{enumerable:true,get:()=>CONTRACTS});
Object.defineProperty(exports,"LC_REQUESTS",{enumerable:true,get:()=>LC_REQUESTS});
Object.defineProperty(exports,"ADD_ONS",{enumerable:true,get:()=>ADD_ONS});
Object.defineProperty(exports,"WORK_ITEMS",{enumerable:true,get:()=>WORK_ITEMS});
Object.defineProperty(exports,"CURRENCIES",{enumerable:true,get:()=>CURRENCIES});
Object.defineProperty(exports,"SESSION",{enumerable:true,get:()=>SESSION});
Object.defineProperty(exports,"command",{enumerable:true,get:()=>command});
Object.defineProperty(exports,"refreshData",{enumerable:true,get:()=>refreshData});
Object.defineProperty(exports,"loadAddOns",{enumerable:true,get:()=>loadAddOns});
Object.defineProperty(exports,"saveNetwork",{enumerable:true,get:()=>saveNetwork});
Object.defineProperty(exports,"submitLifecycle",{enumerable:true,get:()=>submitLifecycle});
Object.defineProperty(exports,"submitBulk",{enumerable:true,get:()=>submitBulk});
Object.defineProperty(exports,"exportCSV",{enumerable:true,get:()=>exportCSV});
Object.defineProperty(exports,"restoreDemoMetadata",{enumerable:true,get:()=>restoreDemoMetadata});
},
"mcit/vms.js":function(require,exports){
// MCIT — Virtual Machines (VM inventory + detail drawer)
// Source: prototype/src/mcit/VMInventory.tsx (page key: 'vms')

const { PortalElement, css } = require("core/portal-element.js");
const { html } = require("core/html.js");
const { icon, button, input, alert, vmStatusBadge, emptyState } = require("ui/index.js");
const { VM_RECORDS, refreshData, saveNetwork, exportCSV } = require("data/api.js");
const isValidIp = (value) => {
  if (!value) return true
  const parts = value.split('.')
  return parts.length === 4 && parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255)
}

const styles = css`
  .card {
    border-color: var(--gray-200);
  }
  .search-input {
    border-color: var(--gray-200);
    font-family: Rubik;
  }
  .search-input:focus {
    border-color: var(--color-we-500);
  }
  .filter-select {
    border-color: var(--gray-200);
    font-family: Rubik;
  }
  .table-head {
    background: var(--neutral-50);
    border-bottom: 1px solid var(--gray-100);
  }
  .vm-row {
    border-color: var(--gray-100);
  }
  .vm-row:nth-child(even) {
    background: var(--neutral-50);
  }
  .vm-row:nth-child(odd) {
    background: var(--white);
  }
  .vm-row:hover {
    background: var(--violet-50);
  }
  .we-text {
    color: var(--color-we-600);
  }
  .env-tag {
    background: var(--red-50);
    color: var(--red-600);
  }
  .drawer-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
  .drawer {
    border-left: 1px solid var(--gray-200);
  }
  .drawer-header {
    border-color: var(--we-tint);
  }
  .spec-tile {
    background: var(--we-tint-50);
  }
  .row-line {
    border-color: var(--gray-100);
  }
  .source-link {
    border-color: var(--violet-300);
  }
  .drawer-note {
    background: var(--gray-50);
  }
`

class McitVms extends PortalElement {
  static tag = 'mcit-vms'
  static portal = 'mcit'
  static styles = styles

  initialState() {
    return {
      vms: [],
      search: '',
      statusFilter: '',
      envFilter: '',
      selectedVMId: null,
      // drawer state (VMDrawer's useState; reset each time the drawer opens)
      editingNetwork: false,
      ip: '',
      vip: '',
      error: '',
      saved: false,
    }
  }

  async load() {
    await refreshData()
    // Copied so edits (IP / vIP) don't mutate the shared demo data.
    this.setState({ vms: VM_RECORDS.map((vm) => ({ ...vm })) })
  }

  filtered() {
    const { vms, statusFilter, envFilter, search } = this.state
    return vms
      .filter((v) => !statusFilter || v.status === statusFilter)
      .filter((v) => !envFilter || v.environment === envFilter)
      .filter((v) => {
        if (!search) return true
        const q = search.toLowerCase()
        return (
          v.id.toLowerCase().includes(q) ||
          v.name.toLowerCase().includes(q) ||
          v.sourceRequestId.toLowerCase().includes(q) ||
          v.project.toLowerCase().includes(q)
        )
      })
  }

  selectedVM() {
    return this.state.vms.find((r) => r.recordId === this.state.selectedVMId) ?? null
  }

  // ── list handlers ─────────────────────────────────────────────────────────

  onSearch(e) {
    this.setState({ search: e.target.value })
  }
  onStatusFilter(e) {
    this.setState({ statusFilter: e.target.value })
  }
  onEnvFilter(e) {
    this.setState({ envFilter: e.target.value })
  }
  onExport() { exportCSV(this.filtered()) }
  onOpenVM(e, el) {
    const vm = this.state.vms.find((r) => r.recordId === el.dataset.id)
    this.setState({ selectedVMId: vm.recordId, editingNetwork: false, ip: vm.ip ?? '', vip: vm.vip ?? '', error: '', saved: false })
  }
  onSourceRequest(e, el) {
    this.navigate('request-detail', el.dataset.id)
  }
  ignore() {}

  // ── drawer handlers ───────────────────────────────────────────────────────

  onCloseDrawer() {
    this.setState({ selectedVMId: null })
  }
  onEditNetwork() {
    if (this.selectedVM()?.status === 'pending provisioning') return
    this.setState({ editingNetwork: true })
  }
  onIp(e) {
    this.setState({ ip: e.target.value, error: '' })
  }
  onVip(e) {
    this.setState({ vip: e.target.value, error: '' })
  }
  onCancelNetwork() {
    const vm = this.selectedVM()
    this.setState({ ip: vm.ip ?? '', vip: vm.vip ?? '', error: '', editingNetwork: false })
  }
  async onSaveNetwork() {
    const { ip, vip } = this.state
    if (!isValidIp(ip) || !isValidIp(vip)) {
      this.setState({ error: 'Enter a valid IPv4 address, for example 10.10.1.20.' })
      return
    }
    const vm = this.selectedVM()
    const updated = await saveNetwork(vm, ip, vip)
    this.setState({
      vms: this.state.vms.map((r) => (r.recordId === updated.recordId ? updated : r)),
      error: '',
      editingNetwork: false,
      saved: true,
    })
  }
  onDismissSaved() {
    this.setState({ saved: false })
  }
  onDrawerSourceRequest(e, el) {
    this.setState({ selectedVMId: null })
    this.navigate('request-detail', el.dataset.id)
  }

  // ── drawer ────────────────────────────────────────────────────────────────

  drawer(vm) {
    const { editingNetwork, ip, vip, error, saved } = this.state
    const sectionTitle = 'text-xs font-semibold text-gray-500 uppercase tracking-wide'
    return html`<div class="drawer-overlay fixed inset-0 z-40 flex" data-on-click="onCloseDrawer">
      <div class="drawer ml-auto w-full max-w-lg bg-white shadow-2xl flex flex-col h-full overflow-y-auto" data-key="vm-drawer" data-on-click="ignore">
        <div class="drawer-header flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
          <div>
            <h2 class="font-semibold text-gray-900">${vm.name}</h2>
            <p class="we-text text-xs font-mono mt-0.5">${vm.id}</p>
          </div>
          <button type="button" data-on-click="onCloseDrawer" aria-label="Close" class="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
            ${icon('close', { size: 16 })}
          </button>
        </div>

        <div class="p-6 flex flex-col gap-5">
          ${vmStatusBadge(vm.status)}
          ${saved ? alert({ severity: 'success', message: 'VM IP configuration updated successfully.', closeAction: 'onDismissSaved' }) : ''}

          <!-- Configuration -->
          <section>
            <div class="mb-3 flex items-center justify-between">
              <h3 class="${sectionTitle}">Configuration</h3>
              ${!editingNetwork && vm.status !== 'pending provisioning' ? button({ size: 'sm', variant: 'secondary', icon: 'edit', label: 'Edit IP & vIP', action: 'onEditNetwork' }) : ''}
            </div>
            <div class="grid grid-cols-2 gap-3">
              ${[
                { label: 'vCPU', value: `${vm.cpu} cores` },
                { label: 'RAM', value: `${vm.ram} GB` },
                { label: 'Storage', value: `${vm.storage} GB` },
                { label: 'Environment', value: vm.environment },
                { label: 'Zone', value: vm.zone },
              ].map(
                (f) => html`<div class="spec-tile p-3 rounded-lg">
                  <p class="text-xs text-gray-500">${f.label}</p>
                  <p class="text-sm font-semibold text-gray-800 mt-0.5">${f.value}</p>
                </div>`,
              )}
            </div>
            ${editingNetwork
              ? html`<div class="mt-4 rounded-xl border border-violet-200 bg-violet-50 p-4">
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    ${input({ label: 'Private IP Address', id: 'vm-ip', value: ip, action: 'onIp', placeholder: 'e.g. 10.10.1.20', error: error && !isValidIp(ip) ? error : undefined })}
                    ${input({ label: 'Virtual IP (vIP)', id: 'vm-vip', value: vip, action: 'onVip', placeholder: 'e.g. 172.20.10.40', error: error && !isValidIp(vip) ? error : undefined })}
                  </div>
                  ${error && isValidIp(ip) && isValidIp(vip) ? html`<p class="mt-2 text-xs text-red-600">${error}</p>` : ''}
                  <div class="mt-4 flex justify-end gap-2">
                    ${button({ size: 'sm', variant: 'secondary', label: 'Cancel', action: 'onCancelNetwork' })}
                    ${button({ size: 'sm', variant: 'primary', label: 'Save IP Configuration', action: 'onSaveNetwork' })}
                  </div>
                </div>`
              : html`<div class="mt-3 grid grid-cols-2 gap-3">
                  ${[
                    { label: 'Private IP Address', value: vm.ip ?? '—' },
                    { label: 'Virtual IP (vIP)', value: vm.vip ?? '—' },
                  ].map(
                    (field) => html`<div class="rounded-lg border border-violet-100 bg-violet-50 p-3">
                      <p class="text-xs text-gray-500">${field.label}</p>
                      <p class="mt-0.5 font-mono text-sm font-semibold text-gray-800">${field.value}</p>
                    </div>`,
                  )}
                </div>`}
          </section>

          <!-- Ownership -->
          <section>
            <h3 class="${sectionTitle} mb-3">Ownership &amp; Scope</h3>
            <div class="flex flex-col gap-2 text-sm">
              ${[
                { label: 'Contract', value: vm.contractNumber || vm.contractId },
                { label: 'Authority', value: vm.authority },
                { label: 'Project', value: vm.project },
              ].map(
                (f) => html`<div class="row-line flex items-center justify-between py-2 border-b">
                  <span class="text-gray-500">${f.label}</span>
                  <span class="font-medium text-gray-800">${f.value}</span>
                </div>`,
              )}
            </div>
          </section>

          <!-- Source request -->
          <section>
            <h3 class="${sectionTitle} mb-3">Source Request</h3>
            <button type="button" data-on-click="onDrawerSourceRequest" data-id="${vm.sourceRequestRecordId}" ${!vm.sourceRequestRecordId?'disabled':''}
              class="source-link flex items-center gap-2 px-4 py-3 rounded-xl border w-full text-left hover:bg-violet-50 transition-colors">
              ${icon('requests', { size: 16, className: 'text-violet-600' })}
              <div class="flex-1">
                <p class="we-text text-sm font-semibold">${vm.sourceRequestId || 'No linked source request'}</p>
                <p class="text-xs text-gray-500">View source provisioning request</p>
              </div>
              ${icon('chevRight', { size: 14, className: 'text-gray-400' })}
            </button>
          </section>

          <!-- Provisioning info -->
          <section>
            <h3 class="${sectionTitle} mb-3">Provisioning Information</h3>
            <div class="flex flex-col gap-2 text-sm">
              <div class="row-line flex justify-between py-2 border-b">
                <span class="text-gray-500">Provisioned Date</span>
                <span class="font-medium text-gray-800">${vm.provisionedDate}</span>
              </div>
              <div class="flex justify-between py-2">
                <span class="text-gray-500">Last Updated</span>
                <span class="font-medium text-gray-800">${vm.lastUpdated}</span>
              </div>
            </div>
            <div class="drawer-note mt-3 p-3 rounded-lg text-xs text-gray-500">
              ℹ️ VM lifecycle is managed by Telecom Egypt operations. Direct vCenter or OpenStack access is not available through this portal.
            </div>
          </section>
        </div>
      </div>
    </div>`
  }

  // ── template ──────────────────────────────────────────────────────────────

  template() {
    const { vms, search, statusFilter, envFilter } = this.state
    const filtered = this.filtered()
    const vm = this.selectedVM()
    const opt = (value, label, current) => html`<option value="${value}" ${value === current ? 'selected' : ''}>${label}</option>`

    return html`
      <div class="flex flex-col gap-5">
        ${vm ? this.drawer(vm) : ''}

        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-xl font-semibold text-gray-900">Virtual Machines</h1>
            <p class="text-sm text-gray-500 mt-0.5">Showing VMs within your authorised scope · ${vms.length} total</p>
          </div>
          ${button({ variant: 'secondary', icon: 'download', label: 'Export', action: 'onExport' })}
        </div>

        <!-- Filters -->
        <div class="card bg-white rounded-xl border p-4 flex items-center gap-3 flex-wrap">
          <div class="relative flex-1 min-w-48">
            ${icon('search', { size: 14, className: 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' })}
            <input id="vm-search" class="search-input w-full pl-8 pr-3 py-2 text-sm rounded-lg border bg-gray-50 outline-none"
              value="${search}" data-on-input="onSearch" placeholder="Search by VM ID, name, or request ID…" aria-label="Search VMs" />
          </div>
          <select id="status-filter" data-on-change="onStatusFilter" aria-label="Status"
            class="filter-select px-3 py-2 text-sm rounded-lg border bg-white outline-none h-9">
            ${[
              ['', 'All Statuses'],
              ['active', 'Active'],
              ['suspended', 'Suspended'],
              ['provisioning', 'Provisioning'],
              ['terminated', 'Terminated'],
              ['pending provisioning', 'Pending Provisioning'],
              ['error', 'Error'],
            ].map(([v, l]) => opt(v, l, statusFilter))}
          </select>
          <select id="env-filter" data-on-change="onEnvFilter" aria-label="Environment"
            class="filter-select px-3 py-2 text-sm rounded-lg border bg-white outline-none h-9">
            ${[
              ['', 'All Environments'],
              ['Production', 'Production'],
              ['Staging', 'Staging'],
              ['Development', 'Development'],
              ['DR', 'DR'],
            ].map(([v, l]) => opt(v, l, envFilter))}
          </select>
        </div>

        <!-- Table -->
        <div class="card bg-white rounded-xl border overflow-hidden">
          ${filtered.length === 0
            ? emptyState({ icon: 'vm', title: 'No VMs found', description: 'No virtual machines match your current filters.' })
            : html`<div class="overflow-x-auto" data-key="vm-table-scroll">
                <table class="w-full text-sm border-collapse">
                  <thead>
                    <tr class="table-head">
                      ${['VM ID', 'VM Name', 'Source Request', 'Authority', 'Project', 'Env', 'vIP', 'CPU', 'RAM', 'Storage', 'Status', 'Provisioned', 'Zone', ''].map(
                        (h) => html`<th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">${h}</th>`,
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    ${filtered.map(
                      (v) => html`<tr class="vm-row border-b transition-colors cursor-pointer" data-on-click="onOpenVM" data-id="${v.recordId}">
                        <td class="we-text px-4 py-3 font-mono text-xs font-semibold">${v.id}</td>
                        <td class="px-4 py-3 font-medium text-gray-800">${v.name}</td>
                        <td class="px-4 py-3">
                          <button type="button" class="we-text font-mono text-xs hover:underline" data-on-click="onSourceRequest" data-id="${v.sourceRequestRecordId}" ${!v.sourceRequestRecordId?'disabled':''}>${v.sourceRequestId || '—'}</button>
                        </td>
                        <td class="px-4 py-3 text-xs text-gray-600 max-w-28 truncate">${v.authority}</td>
                        <td class="px-4 py-3 text-xs text-gray-600 max-w-28 truncate">${v.project}</td>
                        <td class="px-4 py-3"><span class="env-tag text-xs px-2 py-0.5 rounded font-medium">${v.environment}</span></td>
                        <td class="px-4 py-3 font-mono text-xs text-gray-600">${v.vip ?? '—'}</td>
                        <td class="px-4 py-3 text-xs text-center font-semibold text-gray-700">${v.cpu}</td>
                        <td class="px-4 py-3 text-xs text-center text-gray-600">${v.ram} GB</td>
                        <td class="px-4 py-3 text-xs text-center text-gray-600">${v.storage} GB</td>
                        <td class="px-4 py-3">${vmStatusBadge(v.status)}</td>
                        <td class="px-4 py-3 text-xs text-gray-500">${v.provisionedDate}</td>
                        <td class="we-text px-4 py-3 text-xs font-medium">${v.zone}</td>
                        <td class="px-4 py-3">${icon('chevRight', { size: 14, className: 'text-gray-400' })}</td>
                      </tr>`,
                    )}
                  </tbody>
                </table>
              </div>`}
        </div>
      </div>
    `
  }
}

PortalElement.define(McitVms)

},
"ui/index.js":function(require,exports){
// Shared UI helpers — plain-function versions of the WE components in
// prototype/src/mcit/shared.tsx. Each returns markup (SafeHtml) for use inside
// a screen's html`` template. Styles live in src/styles/ui.js.
//
// React props that were callbacks (onClick, onChange, onClose) become an
// `action` name: the helper writes data-on-click / data-on-input /
// data-on-change="<action>" and the screen implements that method.
//
//   ${button({ variant: 'primary', icon: 'plus', label: 'New Request', action: 'onNewRequest' })}

const { html, raw, cx, styleAttr } = require("core/html.js");
const { icon } = require("core/icons.js");
const IMG_BASE = ""

/** Extra attributes as an object → attribute string (values escaped). */
function attrs(extra = {}) {
  return raw(
    Object.entries(extra)
      .filter(([, v]) => v !== null && v !== undefined && v !== false)
      .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"`))
      .join(''),
  )
}

// ── Button (WEButton) ───────────────────────────────────────────────────────
// variant: primary | secondary | ghost | danger   size: sm | md | lg
// `label` may be a string or html``; `attrs` adds data-*/aria-* attributes.
function button({ variant = 'secondary', size = 'md', icon: iconName, label = '', action, type = 'button', disabled = false, className = '', attrs: extra } = {}) {
  return html`<button type="${type}" class="${cx('btn', `btn--${variant}`, `btn--${size}`, className)}"${attrs({ 'data-on-click': action, disabled, ...extra })}>${iconName ? icon(iconName, { size: size === 'sm' ? 13 : 15 }) : ''}${label}</button>`
}

// ── Alert (WEAlert) ─────────────────────────────────────────────────────────
// severity: info | warning | error | success. `closeAction` shows the dismiss button.
const ALERT_ICON = { info: 'info', warning: 'warning', error: 'xCircle', success: 'checkCircle' }

function alert({ severity = 'info', title, message, closeAction, className = '', attrs: extra } = {}) {
  return html`<div class="${cx('alert', `alert--${severity}`, className)}" role="${severity === 'error' ? 'alert' : 'status'}"${attrs(extra)}>
    ${icon(ALERT_ICON[severity], { size: 16, className: 'alert__icon' })}
    <div class="alert__body">${title ? html`<span class="alert__title">${title}: </span>` : ''}<span class="alert__message">${message}</span></div>
    ${closeAction ? html`<button type="button" class="alert__close" aria-label="Dismiss" data-on-click="${closeAction}">${icon('close', { size: 14 })}</button>` : ''}
  </div>`
}

// ── Status badges (RequestBadge, VMStatusBadge) ─────────────────────────────
const REQUEST_STATUS = {
  draft:               { label: 'Draft',               bg: 'var(--gray-100)',   text: 'var(--gray-500)' },
  submitted:           { label: 'Submitted',           bg: 'var(--blue-50)',    text: 'var(--blue-600)' },
  under_review:        { label: 'Under TE Review',     bg: 'var(--we-tint)',    text: 'var(--color-we-600)' },
  requires_correction: { label: 'Requires Correction', bg: 'var(--amber-50)',   text: 'var(--amber-600)' },
  provisioning:        { label: 'Provisioning',        bg: 'var(--green-50)',   text: 'var(--green-600)' },
  completed:           { label: 'Completed',           bg: 'var(--emerald-50)', text: 'var(--emerald-800)' },
  rejected:            { label: 'Rejected',            bg: 'var(--red-50)',     text: 'var(--red-600)' },
  archived:            { label: 'Archived',            bg: 'var(--gray-50)',    text: 'var(--gray-400)' },
}

const VM_STATUS = {
  active:       { label: 'Active',       bg: 'var(--emerald-50)', text: 'var(--green-600)' },
  suspended:    { label: 'Suspended',    bg: 'var(--amber-50)',   text: 'var(--amber-600)' },
  'pending provisioning': { label: 'Pending Provisioning', bg: 'var(--amber-50)', text: 'var(--amber-600)' },
  terminated:   { label: 'Terminated',   bg: 'var(--gray-100)',   text: 'var(--gray-500)' },
  error:        { label: 'Error',        bg: 'var(--red-50)',     text: 'var(--red-600)' },
  provisioning: { label: 'Provisioning', bg: 'var(--blue-50)',    text: 'var(--blue-600)' },
}

/** Generic pill with a dot, for any { label, bg, text } config. */
function statusBadge({ label, bg, text }) {
  return html`<span class="status-badge" style="${styleAttr({ background: bg, color: text })}"><span class="status-badge__dot"></span>${label}</span>`
}

const requestBadge = (status) => statusBadge(REQUEST_STATUS[status])
const vmStatusBadge = (status) => statusBadge(VM_STATUS[status] || {label: status || 'Unknown', bg:'var(--gray-100)', text:'var(--gray-500)'})

// ── SLA indicator (SLAIndicator) ────────────────────────────────────────────
function slaIndicator(hoursRemaining, totalHours) {
  const pct = Math.min(100, Math.round((1 - hoursRemaining / totalHours) * 100))
  const color = hoursRemaining < 12 ? 'var(--red-600)' : hoursRemaining < 24 ? 'var(--amber-600)' : 'var(--green-600)'
  return html`<div class="sla">
    <div class="sla__track"><div class="sla__bar" style="width: ${pct}%; background: ${color}"></div></div>
    <span class="sla__label" style="color: ${color}">${hoursRemaining}h left</span>
  </div>`
}

// ── Text input / textarea (WEInput) ─────────────────────────────────────────
// `action` is called on every keystroke (data-on-input), like onChange in React.
// `name` defaults to the id so focus and caret survive re-renders.
function input({ label, required, error, hint, type = 'text', placeholder, value = '', action, disabled, rows, id, name, attrs: extra } = {}) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  const common = attrs({ id: inputId, name: name ?? inputId, placeholder, disabled, 'data-on-input': action, ...extra })
  const cls = cx('input', error && 'input--error')
  return html`<div class="field">
    <label for="${inputId}" class="field__label">${label}${required ? html`<span class="field__required">*</span>` : ''}</label>
    ${rows
      ? html`<textarea class="${cls}" rows="${rows}"${common}>${value}</textarea>`
      : html`<input class="${cls}" type="${type}" value="${value}"${common} />`}
    ${error ? html`<p class="field__error">${error}</p>` : ''}
    ${hint && !error ? html`<p class="field__hint">${hint}</p>` : ''}
  </div>`
}

// ── Select (WESelect) ───────────────────────────────────────────────────────
// options: [{ value, label }]. `action` is called on change.
function select({ label, required, error, value = '', action, options = [], placeholder, disabled, id, name, attrs: extra } = {}) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  return html`<div class="field">
    <label for="${inputId}" class="field__label">${label}${required ? html`<span class="field__required">*</span>` : ''}</label>
    <div class="select-wrap">
      <select class="${cx('select', error && 'select--error')}"${attrs({ id: inputId, name: name ?? inputId, disabled, 'data-on-change': action, ...extra })}>
        ${placeholder ? html`<option value="">${placeholder}</option>` : ''}
        ${options.map((o) => html`<option value="${o.value}"${o.value === value ? raw(' selected') : ''}>${o.label}</option>`)}
      </select>
      ${icon('chevDown', { size: 14, className: 'select-wrap__chevron' })}
    </div>
    ${error ? html`<p class="field__error">${error}</p>` : ''}
  </div>`
}

// ── Section card (SectionCard) ──────────────────────────────────────────────
function sectionCard({ title, subtitle, actions, body, className = '' } = {}) {
  return html`<div class="${cx('section-card', className)}">
    ${title || actions
      ? html`<div class="section-card__header">
          <div>
            ${title ? html`<h3 class="section-card__title">${title}</h3>` : ''}
            ${subtitle ? html`<p class="section-card__subtitle">${subtitle}</p>` : ''}
          </div>
          ${actions ? html`<div class="section-card__actions">${actions}</div>` : ''}
        </div>`
      : ''}
    <div class="section-card__body">${body}</div>
  </div>`
}

// ── Empty state (EmptyState) ────────────────────────────────────────────────
function emptyState({ icon: iconName, title, description, action } = {}) {
  return html`<div class="empty-state">
    <div class="empty-state__icon">${icon(iconName, { size: 24 })}</div>
    <p class="empty-state__title">${title}</p>
    ${description ? html`<p class="empty-state__description">${description}</p>` : ''}
    ${action ? html`<div class="empty-state__action">${action}</div>` : ''}
  </div>`
}

// ── Tooltip (Tooltip) ───────────────────────────────────────────────────────
function tooltip(label, content) {
  return html`<span class="tooltip">${content}${label ? html`<span class="tooltip__label" role="tooltip">${label}</span>` : ''}</span>`
}

// ── Logos (WETelecomLogo, MCITLogo, WELogo) ─────────────────────────────────
function weTelecomLogo({ height = 48, width } = {}) {
  const size = width ? `width: ${width}px; height: auto` : `height: ${height}px; width: auto`
  return html`<img class="logo" src="data:image/png;base64,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" alt="WE Telecom Egypt" style="${size}" />`
}

function mcitLogo({ width = 88 } = {}) {
  return html`<img class="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKUAAABQCAYAAAB4dLVwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHTmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA5LTIyVDExOjAwOjUyKzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0xMC0yNVQwODowNzo0MSswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0xMC0yNVQwODowNzo0MSswMjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNmEyNjg4My0wNzYxLTQwNTktYjFiZC03YjA3NmJkNGUyNGYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1ZjU0OTBmNS1mM2MxLTMwNDctYWNjOS0xNmE1MGEzN2RiN2IiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3YTMwZDNmYS00YTYxLTRmNmQtOThmMy1jOWM0MGIyNWIwZDIiPiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT54bXAuZGlkOjgwNDEwNmY5LTcxMjYtNDNhNy04MjNiLWQzZmVhZTQzMDA0YTwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjdhMzBkM2ZhLTRhNjEtNGY2ZC05OGYzLWM5YzQwYjI1YjBkMiIgc3RFdnQ6d2hlbj0iMjAyMC0wOS0yMlQxMTowMDo1MiswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowZDMwNTQzNy1hYWU1LTRjOTUtYWQ5OC01MzY5ODYzNzM3ZmQiIHN0RXZ0OndoZW49IjIwMjAtMDktMjlUMTg6NDI6MjArMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MDZhMjY4ODMtMDc2MS00MDU5LWIxYmQtN2IwNzZiZDRlMjRmIiBzdEV2dDp3aGVuPSIyMDIwLTEwLTI1VDA4OjA3OjQxKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90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" alt="Ministry of Communications and Information Technology" style="width: ${width}px; height: auto" />`
}

function weMark({ size = 36 } = {}) {
  return html`<div class="we-mark" style="width: ${size}px; height: ${size}px; font-size: ${size * 0.4}px">we</div>`
}

// ── Notification type label (notifTypeLabel) ───────────────────────────────
const NOTIF_TYPE_LABELS = {
  submission: 'Request Submitted',
  review_queue: 'Entered Review Queue',
  correction_required: 'Correction Required',
  financial_approved: 'Financial Approved',
  technical_approved: 'Technical Approved',
  rejected: 'Request Rejected',
  provisioning_start: 'Provisioning Started',
  provisioning_complete: 'Provisioning Complete',
  completion: 'Request Completed',
  sla_warning: 'SLA Warning',
}

const notifTypeLabel = (type) => NOTIF_TYPE_LABELS[type]

Object.assign(exports, (({ icon }) => ({ icon }))(require("core/icons.js")));

Object.defineProperty(exports,"button",{enumerable:true,get:()=>button});
Object.defineProperty(exports,"alert",{enumerable:true,get:()=>alert});
Object.defineProperty(exports,"REQUEST_STATUS",{enumerable:true,get:()=>REQUEST_STATUS});
Object.defineProperty(exports,"VM_STATUS",{enumerable:true,get:()=>VM_STATUS});
Object.defineProperty(exports,"statusBadge",{enumerable:true,get:()=>statusBadge});
Object.defineProperty(exports,"requestBadge",{enumerable:true,get:()=>requestBadge});
Object.defineProperty(exports,"vmStatusBadge",{enumerable:true,get:()=>vmStatusBadge});
Object.defineProperty(exports,"slaIndicator",{enumerable:true,get:()=>slaIndicator});
Object.defineProperty(exports,"input",{enumerable:true,get:()=>input});
Object.defineProperty(exports,"select",{enumerable:true,get:()=>select});
Object.defineProperty(exports,"sectionCard",{enumerable:true,get:()=>sectionCard});
Object.defineProperty(exports,"emptyState",{enumerable:true,get:()=>emptyState});
Object.defineProperty(exports,"tooltip",{enumerable:true,get:()=>tooltip});
Object.defineProperty(exports,"weTelecomLogo",{enumerable:true,get:()=>weTelecomLogo});
Object.defineProperty(exports,"mcitLogo",{enumerable:true,get:()=>mcitLogo});
Object.defineProperty(exports,"weMark",{enumerable:true,get:()=>weMark});
Object.defineProperty(exports,"notifTypeLabel",{enumerable:true,get:()=>notifTypeLabel});
},
"core/icons.js":function(require,exports){
// Icon set — ported 1:1 from prototype/src/mcit/shared.tsx (const P).
// Every icon is a single 24x24 stroke path. Keep keys identical to the
// prototype so converted screens can use the same names (P.bell -> icon('bell')).

const { raw } = require("core/html.js");
const ICONS = {
  dashboard:    'M3 3h7v9H3V3zm11 0h7v5h-7V3zm0 9h7v9h-7v-9zm-11 4h7v5H3v-5z',
  requests:     'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4',
  vm:           'M20 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8 19h8m-4-4v4',
  bell:         'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9m-4.27 13a2 2 0 0 1-3.46 0',
  plus:         'M12 5v14m-7-7h14',
  search:       'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z',
  filter:       'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  chevDown:     'M6 9l6 6 6-6',
  chevRight:    'M9 18l6-6-6-6',
  chevLeft:     'M15 18l-6-6 6-6',
  chevUp:       'M18 15l-6-6-6 6',
  check:        'M20 6L9 17l-5-5',
  checkCircle:  'M22 11.08V12a10 10 0 1 1-5.93-9.14m5.93-.86L12 12l-3-3',
  xCircle:      'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  info:         'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  warning:      'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01',
  upload:       'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5l5-5 5 5m-5-5v12',
  download:     'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5l5 5 5-5m-5 5V3',
  file:         'M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7-7zm-1 1v5h5',
  trash:        'M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2',
  edit:         'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7m-1.5-9.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
  copy:         'M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1',
  refresh:      'M23 4v6h-6M1 20v-6h6m15.364-6.364A9 9 0 0 0 3.515 9.515M.636 14.485A9 9 0 0 0 20.485 14.485',
  settings:     'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.9-2.1a6.9 6.9 0 0 0 .1-1 6.9 6.9 0 0 0-.1-.9l2-1.6c.2-.1.2-.4.1-.6l-1.9-3.3c-.1-.2-.4-.3-.6-.2l-2.4 1a6.5 6.5 0 0 0-1.6-.9L14 2.4c0-.2-.2-.4-.4-.4h-3.2c-.2 0-.4.2-.4.4l-.4 2.5c-.6.2-1.1.5-1.6.9l-2.4-1c-.2-.1-.4 0-.6.2L3 8.4c-.1.2-.1.4.1.6l2 1.6c0 .3-.1.6-.1.9s0 .6.1.9l-2 1.6c-.2.1-.2.4-.1.6l1.9 3.3c.1.2.4.3.6.2l2.4-1c.5.4 1 .7 1.6.9l.4 2.5c0 .2.2.4.4.4h3.2c.2 0 .4-.2.4-.4l.4-2.5c.6-.2 1.1-.5 1.6-.9l2.4 1c.2.1.4 0 .6-.2l1.9-3.3c.1-.2.1-.4-.1-.6l-2-1.6z',
  logout:       'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5-5-5m5 5H9',
  externalLink: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3',
  clock:        'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-6v-4l3-3',
  calendar:     'M3 4h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm13-2v4M8 2v4M2 10h20',
  contract:     'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1v5h5M16 13H8m8 4H8m2-8H8',
  moreVert:     'M12 5h.01M12 12h.01M12 19h.01',
  link:         'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71m-3.54 9.9l-1.72 1.72a5 5 0 0 1-7.07-7.07l3-3a5 5 0 0 1 5.46-.93',
  points:       'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 6v4l3 3',
  eye:          'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zm11-3a3 3 0 1 1 0 6 3 3 0 0 1 0-6z',
  send:         'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
  close:        'M18 6L6 18M6 6l12 12',
  arrowRight:   'M5 12h14m-7-7 7 7-7 7',
  spinner:      'M21 12a9 9 0 1 1-6.219-8.56',
}

/**
 * Returns inline SVG (as SafeHtml) for the named icon.
 * Usage: html`${icon('bell', { size: 18, className: 'text-gray-400' })}`
 */
function icon(name, { size = 20, className = '', style = '' } = {}) {
  // Accepts a key ('bell') or a raw path string, like the prototype's <Icon d={...}>.
  const d = ICONS[name] ?? (typeof name === 'string' && /^[Mm]/.test(name) ? name : null)
  if (!d) {
    console.warn(`icon(): unknown icon "${name}"`)
    return raw('')
  }
  return raw(`<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${style ? ` style="${style}"` : ''}><path d="${d}"/></svg>`)
}

Object.defineProperty(exports,"P",{enumerable:true,get:()=>P});
Object.defineProperty(exports,"ICONS",{enumerable:true,get:()=>ICONS});
Object.defineProperty(exports,"icon",{enumerable:true,get:()=>icon});
},
"mcit/vm-lifecycle.js":function(require,exports){
const { localDate } = require("data/lifecycle-rules.js");
// MCIT — VM Lifecycle Management (inventory)
// Source: prototype/src/mcit/VMLifecycle.tsx → MCITVMLifecycleInventory (page key: 'vm-lifecycle')

const { PortalElement, css } = require("core/portal-element.js");
const { html } = require("core/html.js");
const { icon, button, alert, input, select, sectionCard, emptyState } = require("ui/index.js");
const { VM_RECORDS, CONTRACTS, refreshData, submitBulk, restoreDemoMetadata } = require("data/api.js");
const { badge, th, td } = require("mcit/vm-lifecycle-parts.js");
const TERMINATION_REASONS = [
  { value: 'project_complete', label: 'Project Completed' },
  { value: 'cost_saving', label: 'Cost Saving / Budget Reduction' },
  { value: 'migration', label: 'Migration to Another Environment' },
  { value: 'decommission', label: 'System Decommission' },
  { value: 'other', label: 'Other' },
]

const DISPOSAL_METHODS = [
  { value: 'secure_erase', label: 'Secure Erase (DoD 5220.22-M)' },
  { value: 'snapshot_archive', label: 'Archive Snapshot (30-day retention)' },
  { value: 'backup_transfer', label: 'Transfer to Backup Storage' },
]

const styles = css`
  .vm-row:hover {
    background: var(--gray-50);
  }
  .table-head {
    background: var(--neutral-50);
    border-color: var(--gray-100);
  }
`

class McitVmLifecycle extends PortalElement {
  static tag = 'mcit-vm-lifecycle'
  static portal = 'mcit'
  static styles = styles

  initialState() {
    return {
      search: '',
      filterContract: '',
      filterStatus: 'all',
      selectedIds: [],
      showBulkTermination: false,
      bulkDate: localDate(),
      bulkReason: '',
      bulkDisposal: 'secure_erase',
      bulkConfirmed: false,
      bulkSubmitted: false,
      bulkRequestId: crypto.randomUUID(),
    }
  }

  async load() {
    await refreshData()
    this.vms = VM_RECORDS
    this.contracts = CONTRACTS
  }

  // ── derived data ──────────────────────────────────────────────────────────

  filtered() {
    const { search, filterContract, filterStatus } = this.state
    return this.vms.filter((vm) => {
      if (search) {
        const q = search.toLowerCase()
        if (!vm.id.toLowerCase().includes(q) && !vm.name.toLowerCase().includes(q)) return false
      }
      if (filterContract && vm.contractId !== filterContract) return false
      if (filterStatus !== 'all' && vm.status !== filterStatus) return false
      return true
    })
  }

  selectableIds() {
    return this.filtered()
      .filter((vm) => vm.status === 'active' || vm.status === 'suspended')
      .map((vm) => vm.recordId)
  }

  allSelected() {
    const ids = this.selectableIds()
    return ids.length > 0 && ids.every((id) => this.state.selectedIds.includes(id))
  }

  // ── event handlers ────────────────────────────────────────────────────────

  onSearch(e) {
    this.setState({ search: e.target.value })
  }
  onFilterContract(e) {
    this.setState({ filterContract: e.target.value })
  }
  onFilterStatus(e) {
    this.setState({ filterStatus: e.target.value })
  }
  onToggleAll() {
    const { selectedIds } = this.state
    const selectable = this.selectableIds()
    this.setState({
      selectedIds: this.allSelected()
        ? selectedIds.filter((id) => !selectable.includes(id))
        : Array.from(new Set([...selectedIds, ...selectable])),
    })
  }
  onToggleSelected(e, el) {
    const id = el.dataset.id
    const prev = this.state.selectedIds
    this.setState({ selectedIds: prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id] })
  }
  onOpenBulk() {
    this.setState({ showBulkTermination: true })
  }
  onCloseBulk() {
    this.setState({ showBulkTermination: false })
  }
  onBulkDate(e) {
    this.setState({ bulkDate: e.target.value })
  }
  onBulkReason(e) {
    this.setState({ bulkReason: e.target.value })
  }
  onBulkDisposal(e) {
    this.setState({ bulkDisposal: e.target.value })
  }
  onBulkConfirmed(e) {
    this.setState({ bulkConfirmed: e.target.checked })
  }
  async onSubmitBulk() {
    const selected = this.vms.filter(v => this.state.selectedIds.includes(v.recordId))
    if (!selected.length) throw Error('Select at least one eligible VM.')
    await submitBulk(selected, {
      selectedAction:'terminate', terminationDate:this.state.bulkDate, terminationReason:this.state.bulkReason,
      dataDisposalMethod:this.state.bulkDisposal, backupConfirm:this.state.bulkConfirmed,
    }, this.state.bulkRequestId)
    await this.load()
    this.setState({ showBulkTermination:false, bulkSubmitted:true, selectedIds:[], bulkRequestId:crypto.randomUUID() })
  }
  onDismissBulkSubmitted() {
    this.setState({ bulkSubmitted: false })
  }
  onHistory() {
    this.navigate('vm-lifecycle-history')
  }
  onPendingRequest(e, el) {
    this.navigate('request-detail', el.dataset.id)
  }
  onAction(e, el) {
    this.navigate('vm-lifecycle-action', `${el.dataset.id}|${el.dataset.action}`)
  }

  // ── template ──────────────────────────────────────────────────────────────

  bulkModal() {
    const { selectedIds, bulkDate, bulkReason, bulkDisposal, bulkConfirmed } = this.state
    return html`<div class="fixed inset-0 z-50 flex items-center justify-center p-4" style="background: rgba(0,0,0,0.45)">
      <div class="w-full max-w-2xl rounded-2xl bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="bulk-title">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 id="bulk-title" class="text-base font-semibold text-gray-900">Bulk VM Termination</h2>
            <p class="mt-0.5 text-xs text-gray-500">${selectedIds.length} VMs selected for one termination request</p>
          </div>
          ${button({ variant: 'ghost', icon: 'close', action: 'onCloseBulk', attrs: { 'aria-label': 'Close' } })}
        </div>
        <div class="flex flex-col gap-5 p-6">
          ${alert({ severity: 'error', message: 'Submitting immediately marks all selected VMs Terminated in Creatio and returns their allocated points. No infrastructure deletion is executed.' })}
          <div class="max-h-36 overflow-y-auto rounded-xl border border-gray-200" data-key="bulk-list">
            ${selectedIds.map((id) => {
              const vm = this.vms.find((r) => r.recordId === id)
              return vm
                ? html`<div class="flex items-center justify-between border-b border-gray-100 px-4 py-2.5 last:border-0">
                    <div><p class="font-mono text-xs font-semibold text-violet-700">${vm.id}</p><p class="text-xs text-gray-500">${vm.name}</p></div>
                    <span class="text-xs text-gray-500">${vm.contractNumber || vm.contractId} · ${vm.project}</span>
                  </div>`
                : ''
            })}
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            ${input({ label: 'Termination Date (applies today)', type: 'date', value: bulkDate, action: 'onBulkDate', attrs: { min: localDate(), max: localDate() } })}
            ${select({ label: 'Termination Reason', value: bulkReason, action: 'onBulkReason', options: TERMINATION_REASONS, placeholder: 'Select reason…' })}
            <div class="sm:col-span-2">
              ${select({ label: 'Data Disposal Method', value: bulkDisposal, action: 'onBulkDisposal', options: DISPOSAL_METHODS })}
            </div>
          </div>
          <label class="flex cursor-pointer items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
            <input id="bulk-confirmed" type="checkbox" ${bulkConfirmed ? 'checked' : ''} data-on-change="onBulkConfirmed"
              class="mt-0.5 h-4 w-4" style="accent-color: var(--red-600)" />
            <span class="text-sm leading-relaxed text-red-700">I confirm that backup and disposal requirements have been reviewed for all selected VMs.</span>
          </label>
        </div>
        <div class="flex justify-end gap-2 border-t border-gray-100 px-6 py-4">
          ${button({ variant: 'secondary', label: 'Cancel', action: 'onCloseBulk' })}
          ${button({
            variant: 'danger',
            icon: 'trash',
            label: `Submit ${selectedIds.length} Terminations`,
            action: 'onSubmitBulk',
            disabled: bulkDate !== localDate() || !bulkReason || !bulkConfirmed,
          })}
        </div>
      </div>
    </div>`
  }

  vmRow(vm) {
    const contract = this.contracts.find((c) => c.id === vm.contractId)
    const isActive = vm.status === 'active'
    const isSuspended = vm.status === 'suspended'
    const canLifecycle = isActive || isSuspended
    return html`<tr class="vm-row transition-colors">
      ${td(html`<input id="sel-${vm.recordId}" type="checkbox" aria-label="Select ${vm.id}" ${this.state.selectedIds.includes(vm.recordId) ? 'checked' : ''}
        ${!canLifecycle ? 'disabled' : ''} data-on-change="onToggleSelected" data-id="${vm.recordId}"
        class="h-4 w-4 disabled:opacity-30" style="accent-color: var(--color-we-600)" />`)}
      ${td(html`<span style="color: var(--color-we-600)">${vm.id}</span>`, true)}
      ${td(html`<span class="font-medium text-gray-800">${vm.name}</span>`)}
      ${td(html`<div class="flex flex-col gap-0.5">
        <span class="text-xs font-mono" style="color: var(--color-we-600)">${vm.contractNumber || vm.contractId}</span>
        <span class="text-xs text-gray-400">${contract?.authority}</span>
      </div>`)}
      ${td(vm.vip ?? '—', true)}
      ${td(html`<span class="text-xs text-gray-600">${vm.cpu}vCPU · ${vm.ram}G RAM · ${vm.storage}G</span>`)}
      ${td(
        badge({
          label: vm.status === 'pending provisioning' ? 'Pending Provisioning' : vm.status.charAt(0).toUpperCase() + vm.status.slice(1),
          color: isActive ? 'var(--green-600)' : isSuspended ? 'var(--amber-600)' : 'var(--gray-500)',
          bg: isActive ? 'var(--emerald-50)' : isSuspended ? 'var(--amber-50)' : 'var(--gray-100)',
        }),
      )}
      ${td(vm.provisionedDate, true)}
      <td class="px-4 py-3">
        ${canLifecycle
          ? html`<div class="flex items-center gap-1.5">
              ${button({ size: 'sm', variant: 'secondary', icon: 'arrowRight', label: 'Upgrade', action: 'onAction', attrs: { 'data-id': vm.recordId, 'data-action': 'upgrade' } })}
              ${button({ size: 'sm', variant: 'secondary', label: 'Downgrade', action: 'onAction', attrs: { 'data-id': vm.recordId, 'data-action': 'downgrade' } })}
              ${button({ size: 'sm', variant: 'danger', label: 'Terminate', action: 'onAction', attrs: { 'data-id': vm.recordId, 'data-action': 'terminate' } })}
            </div>`
           : vm.status === 'pending provisioning' && vm.sourceRequestRecordId
            ? button({ size: 'sm', variant: 'secondary', label: 'View Request', action: 'onPendingRequest', attrs: { 'data-id': vm.sourceRequestRecordId } })
            : html`<span class="text-xs text-gray-400">No actions available</span>`}
      </td>
    </tr>`
  }

  async onRestoreDemoMetadata() {
    const count=await restoreDemoMetadata()
    await this.load()
    this.setState({recoveryNotice:`Restored missing details for ${count} DEMO VMs. Status and contract ledger were not changed.`})
  }
  template() {
    const { search, filterContract, filterStatus, selectedIds, showBulkTermination, bulkSubmitted } = this.state
    const filtered = this.filtered()

    return html`
      <div class="flex flex-col gap-6">
        ${showBulkTermination ? this.bulkModal() : ''}

        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-xl font-semibold text-gray-900">VM Lifecycle Management</h1>
            <p class="text-sm text-gray-500 mt-0.5">Request upgrades, downgrades, or termination for provisioned VMs</p>
          </div>
          <div class="flex items-center gap-2">
            ${selectedIds.length > 0
              ? button({ variant: 'danger', icon: 'trash', label: `Terminate Selected (${selectedIds.length})`, action: 'onOpenBulk' })
              : ''}
            ${button({ variant: 'secondary', icon: 'requests', label: 'Request History', action: 'onHistory' })}
          </div>
        </div>

        ${bulkSubmitted
          ? alert({
              severity: 'success',
              title: 'Bulk changes applied',
              message: 'The selected VM records were marked Terminated and their allocated points returned. The changes are recorded in request history.',
              closeAction: 'onDismissBulkSubmitted',
            })
          : ''}

        ${this.vms.some(v=>v.status!=='pending provisioning'&&v.name.startsWith('DEMO ')&&(!v.id||(v.status!=='terminated'&&v.points===0)))?html`<div class="flex flex-col gap-3">${alert({severity:'warning',message:'The package update removed DEMO VM metadata. Restore missing details from retained demo records before submitting changes. VM status and contract accounting will be preserved.'})}${button({label:'Restore missing DEMO details',action:'onRestoreDemoMetadata'})}</div>`:''}
        ${this.state.recoveryNotice?alert({severity:'success',message:this.state.recoveryNotice}):''}
        ${alert({ severity: 'info', message: 'Lifecycle submissions update Creatio VM records and contract points immediately. All changes are recorded in request history.' })}

        ${sectionCard({
          body: html`<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            ${input({ label: '', id: 'search', value: search, action: 'onSearch', placeholder: 'Search VM ID or name…', attrs: { 'aria-label': 'Search VM ID or name' } })}
            ${select({
              label: '',
              id: 'filter-contract',
              value: filterContract,
              action: 'onFilterContract',
              options: this.contracts.map((c) => ({ value: c.id, label: c.authority })),
              placeholder: 'All contracts',
              attrs: { 'aria-label': 'Contract' },
            })}
            ${select({
              label: '',
              id: 'filter-status',
              value: filterStatus,
              action: 'onFilterStatus',
              options: [
                { value: 'all', label: 'All Statuses' },
                { value: 'active', label: 'Active' },
                { value: 'suspended', label: 'Suspended' },
                { value: 'terminated', label: 'Terminated' },
                { value: 'pending provisioning', label: 'Pending Provisioning' },
              ],
             
              attrs: { 'aria-label': 'Status' },
            })}
          </div>`,
        })}

        ${sectionCard({
          title: `${filtered.length} VM${filtered.length !== 1 ? 's' : ''}`,
          body:
            filtered.length === 0
              ? emptyState({ icon: 'vm', title: 'No VMs found', description: 'No virtual machines match your filters.' })
              : html`<div class="overflow-x-auto -mx-5 -mb-5" data-key="vm-table">
                  <table class="w-full text-sm">
                    <thead>
                      <tr class="table-head border-b">
                        ${th(html`<input id="select-all" type="checkbox" aria-label="Select all eligible VMs" ${this.allSelected() ? 'checked' : ''}
                          data-on-change="onToggleAll" class="h-4 w-4" style="accent-color: var(--color-we-600)" />`)}
                        ${['VM ID', 'VM Name', 'Contract', 'vIP', 'Specs', 'Status', 'Provisioned', 'Actions'].map((h) => th(h))}
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                      ${filtered.map((vm) => this.vmRow(vm))}
                    </tbody>
                  </table>
                </div>`,
        })}
      </div>
    `
  }
}

PortalElement.define(McitVmLifecycle)

},
"data/lifecycle-rules.js":function(require,exports){
// Pure client-side preflight. The service must independently enforce these rules.
const ipv4 = value => !value || /^(?:\d{1,3}\.){3}\d{1,3}$/.test(value) && value.split('.').every(p => Number(p) <= 255)
function localDate(date = new Date()) {
  return [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-')
}
function project(vm, contract, action, points, addOns = {}, catalog = []) {
  const n = Number(points)
  const cfg = contract.pointConfig
  if (!cfg || [cfg.cpuPerPoint,cfg.ramGBPerPoint,cfg.storageGBPerPoint].some(x => !Number.isFinite(x) || x <= 0)) throw Error('The contract needs an active point configuration.')
  if (!['upgrade','downgrade'].includes(action)) throw Error('Invalid resource-change action.')
  if (!Number.isSafeInteger(n) || n < 1) throw Error('Enter a positive whole number of points.')
  const increment = cfg.pointIncrement ?? 1
  if (increment <= 0 || Math.abs(n/increment-Math.round(n/increment)) > 1e-7) throw Error(`Use increments of ${increment} points.`)
  if (action === 'upgrade' && n > contract.availablePoints) throw Error('The requested points exceed the available balance.')
  const delta = action === 'upgrade' ? n : -n
  const after = { cpu:vm.cpu+delta*cfg.cpuPerPoint,ram:vm.ram+delta*cfg.ramGBPerPoint,storage:vm.storage+delta*cfg.storageGBPerPoint,points:vm.points+delta,amount:0 }
  if (after.points < (cfg.minPoints ?? 1) || cfg.maxPoints && after.points > cfg.maxPoints) throw Error('Resulting points are outside contract limits.')
  for (const [id, quantity] of Object.entries(addOns)) {
    const value = Number(quantity)
    if (value === 0) continue
    if (action !== 'upgrade') throw Error('Add-ons are available only for upgrades.')
    const item = catalog.find(x => x.id === id && x.status === 'active')
    if (!item) throw Error('An add-on is no longer available.')
    if (!Number.isFinite(value) || value < item.min || value > item.max || item.increment <= 0 || Math.abs((value-item.min)/item.increment-Math.round((value-item.min)/item.increment)) > 1e-7) throw Error(`Invalid quantity for ${item.name}.`)
    if (!Number.isFinite(item.unitPrice) || item.unitPrice < 0) throw Error('Invalid add-on price.')
    after.amount += value * item.unitPrice
    if (item.resourceEffect === 'ram') after.ram += value
    if (item.resourceEffect === 'storage') after.storage += value
  }
  if ([after.cpu,after.ram,after.storage].some(x => !Number.isFinite(x)||x<=0)) throw Error('The requested change would leave invalid VM resources.')
  return after
}

function validateDraft(vm, contract, draft, catalog = []) {
  if (!['active','suspended'].includes(vm.status)) throw Error('This VM is not eligible for a lifecycle request.')
  const action = draft.selectedAction
  if (action === 'terminate') {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.terminationDate) || draft.terminationDate !== localDate()) throw Error('Termination applies immediately. Select today as the termination date.')
    if (!['project_complete','cost_saving','migration','decommission','other'].includes(draft.terminationReason)) throw Error('Select a termination reason.')
    if (!['secure_erase','snapshot_archive','backup_transfer'].includes(draft.dataDisposalMethod)) throw Error('Select a disposal method.')
    if (!draft.backupConfirm) throw Error('Confirm the backup and disposal requirements.')
    return null
  }
  if (!['standard','high','critical'].includes(draft.urgency)) throw Error('Select an urgency level.')
  const reasons = action === 'upgrade' ? ['capacity_growth','performance_issue','peak_season','application_req'] : ['over_provisioned','cost_optimize','workload_reduced','other']
  if (!reasons.includes(draft.reason)) throw Error('Select a primary reason.')
  if ((draft.justification ?? '').trim().length < 20) throw Error('Business justification must contain at least 20 characters.')
  return project(vm,contract,action,action==='upgrade'?draft.additionalPoints:draft.pointsToRemove,draft.addOns,catalog)
}

Object.defineProperty(exports,"ipv4",{enumerable:true,get:()=>ipv4});
Object.defineProperty(exports,"localDate",{enumerable:true,get:()=>localDate});
Object.defineProperty(exports,"project",{enumerable:true,get:()=>project});
Object.defineProperty(exports,"validateDraft",{enumerable:true,get:()=>validateDraft});
},
"mcit/vm-lifecycle-parts.js":function(require,exports){
// MCIT — VM Lifecycle shared parts (private helpers for the three lifecycle screens)
// Source: prototype/src/mcit/VMLifecycle.tsx (Badge, StatusBadge, ActionBadge, Th, Td,
// StepBar, SpecRow, pointsForSpec, DEMO_LC_REQUESTS)

const { html } = require("core/html.js");
const { icon } = require("ui/index.js");
/** Plain pill badge (no dot) — `Badge` in the prototype. */
function badge({ label, color, bg }) {
  return html`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    style="background: ${bg}; color: ${color}">${label}</span>`
}

const LC_STATUS = {
  pending_te_review: { label: 'Pending TE Review', color: 'var(--amber-600)', bg: 'var(--amber-50)' },
  te_approved: { label: 'TE Approved', color: 'var(--green-600)', bg: 'var(--emerald-50)' },
  rejected: { label: 'Rejected', color: 'var(--red-600)', bg: 'var(--red-50)' },
  completed: { label: 'Completed', color: 'var(--color-we-600)', bg: 'var(--we-tint)' },
}

const LC_ACTION = {
  upgrade: { label: 'Upgrade', color: 'var(--green-600)', bg: 'var(--emerald-50)' },
  downgrade: { label: 'Downgrade', color: 'var(--amber-600)', bg: 'var(--amber-50)' },
  terminate: { label: 'Terminate', color: 'var(--red-600)', bg: 'var(--red-50)' },
}

const lcStatusBadge = (status) => badge(LC_STATUS[status])
const actionBadge = (action) => badge(LC_ACTION[action])

/** Table header cell (`Th`). */
function th(content) {
  return html`<th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">${content}</th>`
}

/** Table body cell (`Td`). */
function td(content, mono = false) {
  return html`<td class="px-4 py-3 text-sm ${mono ? 'font-mono text-xs' : ''} whitespace-nowrap">${content}</td>`
}

/** Wizard progress bar (`StepBar`). */
function stepBar(steps, current) {
  return html`<div class="flex items-center gap-0 mb-6">
    ${steps.map((s, i) => {
      const done = i < current
      const active = i === current
      const bg = done ? 'var(--color-we-600)' : active ? 'var(--white)' : 'var(--gray-100)'
      const border = done || active ? 'var(--color-we-600)' : 'var(--gray-200)'
      const color = done ? 'var(--white)' : active ? 'var(--color-we-600)' : 'var(--gray-400)'
      return html`<div class="flex items-center flex-1 min-w-0">
        <div class="flex flex-col items-center gap-1 shrink-0">
          <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all"
            style="background: ${bg}; border-color: ${border}; color: ${color}">
            ${done ? icon('check', { size: 12 }) : i + 1}
          </div>
          <span class="text-[10px] font-medium text-center leading-tight hidden sm:block"
            style="color: ${done || active ? 'var(--color-we-600)' : 'var(--gray-400)'}; max-width: 64px">${s}</span>
        </div>
        ${i < steps.length - 1
          ? html`<div class="flex-1 h-0.5 mx-1 mb-4" style="background: ${done ? 'var(--color-we-600)' : 'var(--gray-200)'}"></div>`
          : ''}
      </div>`
    })}
  </div>`
}

/** Current → next spec line (`SpecRow`). */
function specRow(label, current, next, isUp = false) {
  const changed = String(current) !== String(next)
  return html`<div class="flex items-center gap-3 py-2.5 border-b last:border-0" style="border-color: var(--gray-100)">
    <span class="text-sm text-gray-500 w-20 shrink-0">${label}</span>
    <span class="text-sm font-mono font-medium text-gray-700">${current}</span>
    ${changed
      ? html`${icon('arrowRight', { size: 14, className: 'text-gray-400 shrink-0' })}
          <span class="text-sm font-mono font-semibold" style="color: ${isUp ? 'var(--green-600)' : 'var(--amber-600)'}">${next}</span>`
      : ''}
  </div>`
}

function pointsForSpec(cpu, ram, storage, contractId, contracts) {
  const c = contracts.find((c) => c.id === contractId)
  if (!c) return 0
  const pc = c.pointConfig
  const cpuPts = cpu / (pc.cpuPerPoint || 1)
  const ramPts = ram / (pc.ramGBPerPoint || 4)
  const stPts = storage / (pc.storageGBPerPoint || 75)
  return Math.ceil(Math.max(cpuPts, ramPts, stPts))
}


Object.defineProperty(exports,"badge",{enumerable:true,get:()=>badge});
Object.defineProperty(exports,"lcStatusBadge",{enumerable:true,get:()=>lcStatusBadge});
Object.defineProperty(exports,"actionBadge",{enumerable:true,get:()=>actionBadge});
Object.defineProperty(exports,"th",{enumerable:true,get:()=>th});
Object.defineProperty(exports,"td",{enumerable:true,get:()=>td});
Object.defineProperty(exports,"stepBar",{enumerable:true,get:()=>stepBar});
Object.defineProperty(exports,"specRow",{enumerable:true,get:()=>specRow});
Object.defineProperty(exports,"pointsForSpec",{enumerable:true,get:()=>pointsForSpec});
},
"mcit/vm-lifecycle-action.js":function(require,exports){
// MCIT — VM Lifecycle Action wizard (upgrade / downgrade / terminate)
// Source: prototype/src/mcit/VMLifecycle.tsx → VMLifecycleAction (page key: 'vm-lifecycle-action')
//
// The prototype portal passes 'vmId|action' as one param and splits it on '|';
// this.recordId receives that same string.

const { PortalElement, css } = require("core/portal-element.js");
const { html } = require("core/html.js");
const { icon, button, alert, input, select, sectionCard } = require("ui/index.js");
const { VM_RECORDS, CONTRACTS, loadAddOns, refreshData, submitLifecycle } = require("data/api.js");
const { validateDraft, project, localDate } = require("data/lifecycle-rules.js");
const { actionBadge, stepBar, specRow, pointsForSpec } = require("mcit/vm-lifecycle-parts.js");
const ACTIONS = [
  {
    key: 'upgrade', icon: 'arrowRight', title: 'Upgrade VM',
    desc: 'Increase CPU, RAM, or storage to meet higher demand. Additional points will be consumed.',
    color: 'var(--green-600)', bg: 'var(--emerald-50)',
  },
  {
    key: 'downgrade', icon: 'chevDown', title: 'Downgrade VM',
    desc: 'Reduce VM resources to recover points for other workloads. Requires impact assessment.',
    color: 'var(--amber-600)', bg: 'var(--amber-50)',
  },
  {
    key: 'terminate', icon: 'trash', title: 'Request Termination',
    desc: 'Permanently decommission this VM. Points will be restored to the contract balance after confirmation.',
    color: 'var(--red-600)', bg: 'var(--red-50)',
  },
]

const TERMINATION_REASONS = [
  { value: 'project_complete', label: 'Project Completed' },
  { value: 'cost_saving', label: 'Cost Saving / Budget Reduction' },
  { value: 'migration', label: 'Migration to Another Environment' },
  { value: 'decommission', label: 'System Decommission' },
  { value: 'other', label: 'Other' },
]

const DISPOSAL_METHODS = [
  { value: 'secure_erase', label: 'Secure Erase (DoD 5220.22-M)' },
  { value: 'snapshot_archive', label: 'Archive Snapshot (30-day retention)' },
  { value: 'backup_transfer', label: 'Transfer to Backup Storage' },
]

const UPGRADE_REASONS = [
  { value: 'capacity_growth', label: 'Capacity Growth' },
  { value: 'performance_issue', label: 'Performance Issue' },
  { value: 'peak_season', label: 'Peak Season Preparation' },
  { value: 'application_req', label: 'New Application Requirements' },
]

const DOWNGRADE_REASONS = [
  { value: 'over_provisioned', label: 'Over-provisioned' },
  { value: 'cost_optimize', label: 'Cost Optimization' },
  { value: 'workload_reduced', label: 'Reduced Workload' },
  { value: 'other', label: 'Other' },
]

const URGENCY = [
  { value: 'standard', label: 'Standard (3-5 business days)' },
  { value: 'high', label: 'High (within 48 hours)' },
  { value: 'critical', label: 'Critical (within 24 hours)' },
]

const styles = css`
  .justification {
    border-color: var(--gray-200);
    font-family: inherit;
  }
  .justification:focus {
    border-color: var(--color-we-600);
  }
`

class McitVmLifecycleAction extends PortalElement {
  static tag = 'mcit-vm-lifecycle-action'
  static portal = 'mcit'
  static styles = styles

  /** 'vmId|action' → [vmId, action], same split as the prototype portal. */
  param() {
    const [vmId, action] = (this.recordId ?? '').split('|')
    return { vmId, action: ['upgrade', 'downgrade', 'terminate'].includes(action) ? action : null }
  }

  initialState() {
    const { action } = this.param()
    return {
      selectedAction: action,
      step: action ? 1 : 0,
      submitted: false,
      requestId: crypto.randomUUID(),
      additionalPoints: 1,
      pointsToRemove: 1,
      addOns: {},
      terminationDate: localDate(),
      backupConfirm: false,
      dataDisposalMethod: 'secure_erase',
      terminationReason: '',
      reason: '',
      justification: '',
      urgency: 'standard',
    }
  }

  async load() {
    await refreshData()
    const { vmId } = this.param()
    this.vm = VM_RECORDS.find((v) => v.recordId === vmId)
    this.contract = this.vm ? CONTRACTS.find((c) => c.id === this.vm.contractId) : null
    this.addOnCatalog = loadAddOns().filter((a) => a.status === 'active')
  }

  // ── derived data ──────────────────────────────────────────────────────────

  calc() {
    const { vm, contract, addOnCatalog } = this
    const { additionalPoints, pointsToRemove, addOns, selectedAction } = this.state
    const cfg = contract?.pointConfig
    const cpuPP = cfg?.cpuPerPoint ?? 1
    const ramPP = cfg?.ramGBPerPoint ?? 4
    const stoPP = cfg?.storageGBPerPoint ?? 75
    const currentPts = vm.points

    const upgradeAddCpu = additionalPoints * cpuPP
    const upgradeAddRam = additionalPoints * ramPP
    const upgradeAddSto = additionalPoints * stoPP
    const addOnRam = addOnCatalog.filter((a) => a.resourceEffect === 'ram').reduce((s, a) => s + (addOns[a.id] ?? 0), 0)
    const addOnStorage = addOnCatalog.filter((a) => a.resourceEffect === 'storage').reduce((s, a) => s + (addOns[a.id] ?? 0), 0)
    const addOnFinancial = addOnCatalog.reduce((s, a) => s + (addOns[a.id] ?? 0) * a.unitPrice, 0)

    const safeRemove = pointsToRemove
    const downgradeRemoveCpu = safeRemove * cpuPP
    const downgradeRemoveRam = safeRemove * ramPP
    const downgradeRemoveSto = safeRemove * stoPP

    return {
      cfg, cpuPP, ramPP, stoPP, currentPts,
      upgradeAddCpu, upgradeAddRam, upgradeAddSto, addOnFinancial,
      upgradeNewCpu: vm.cpu + upgradeAddCpu,
      upgradeNewRam: vm.ram + upgradeAddRam + addOnRam,
      upgradeNewSto: vm.storage + upgradeAddSto + addOnStorage,
      upgradeNewPts: currentPts + additionalPoints,
      safeRemove, downgradeRemoveCpu, downgradeRemoveRam, downgradeRemoveSto,
      downgradeNewCpu: vm.cpu - downgradeRemoveCpu,
      downgradeNewRam: vm.ram - downgradeRemoveRam,
      downgradeNewSto: vm.storage - downgradeRemoveSto,
      downgradeNewPts: currentPts - safeRemove,
      ptDelta: selectedAction === 'upgrade' ? additionalPoints : -safeRemove,
    }
  }

  steps() {
    const a = this.state.selectedAction
    return a === 'terminate'
      ? ['VM Details', 'Termination Details', 'Data & Backup', 'Review & Submit']
      : a === 'upgrade'
        ? ['VM Details', 'Additional Points', 'Justification', 'Review & Submit']
        : ['VM Details', 'Points to Remove', 'Justification', 'Review & Submit']
  }

  canProceed() {
    const { step, selectedAction, terminationDate, terminationReason, backupConfirm, reason, justification } = this.state
    const isTerminate = selectedAction === 'terminate'
    if (step === 1) return !!this.contract.pointConfig && ['active','suspended'].includes(this.vm.status)
    if (step === 2) {
      if (isTerminate) return terminationDate === localDate() && terminationReason !== ''
      try { project(this.vm,this.contract,selectedAction,selectedAction==='upgrade'?this.state.additionalPoints:this.state.pointsToRemove,this.state.addOns,this.addOnCatalog); return true } catch { return false }
    }
    if (step === 3) {
      if (isTerminate) return backupConfirm
      return reason !== '' && justification.trim().length >= 20
    }
    return true
  }

  // ── event handlers ────────────────────────────────────────────────────────

  onBackToList() {
    this.navigate('vm-lifecycle')
  }
  onHistory() {
    this.navigate('vm-lifecycle-history')
  }
  onSelectAction(e, el) {
    this.setState({ selectedAction: el.dataset.action, step: 1 })
  }
  async onNext() {
    if (!this.canProceed()) throw Error('Complete the required fields before continuing.')
    if (this.state.step < this.steps().length) { this.setState({ step: this.state.step + 1 }); return }
    validateDraft(this.vm,this.contract,this.state,this.addOnCatalog)
    const result = await submitLifecycle(this.vm,this.state,this.state.requestId)
    this.setState({ submitted:true, requestId:result.number || result.id })
  }
  onPrev() {
    if (this.state.step > 1) this.setState({ step: this.state.step - 1 })
    else this.setState({ selectedAction: null, step: 0 })
  }
  onAddPointsDec() {
    this.setState({ additionalPoints: Math.max(1, this.state.additionalPoints - 1) })
  }
  onAddPointsInc() {
    this.setState({ additionalPoints: Math.min(this.contract.availablePoints, this.state.additionalPoints + 1) })
  }
  onRemovePointsDec() {
    this.setState({ pointsToRemove: Math.max(1, this.state.pointsToRemove - 1) })
  }
  onRemovePointsInc() {
    const currentPts = this.vm.points
    this.setState({ pointsToRemove: Math.min(currentPts - 1, this.state.pointsToRemove + 1) })
  }
  onAddOn(e, el) {
    const addOn = this.addOnCatalog.find((a) => a.id === el.dataset.addon)
    const value = Math.max(addOn.min, Math.min(addOn.max, Number(e.target.value) || 0))
    this.setState({ addOns: { ...this.state.addOns, [addOn.id]: value } })
  }
  onTerminationDate(e) {
    this.setState({ terminationDate: e.target.value })
  }
  onTerminationReason(e) {
    this.setState({ terminationReason: e.target.value })
  }
  onJustification(e) {
    this.setState({ justification: e.target.value })
  }
  onReason(e) {
    this.setState({ reason: e.target.value })
  }
  onUrgency(e) {
    this.setState({ urgency: e.target.value })
  }
  onDisposal(e) {
    this.setState({ dataDisposalMethod: e.target.value })
  }
  onBackupConfirm(e) {
    this.setState({ backupConfirm: e.target.checked })
  }

  // ── template parts ────────────────────────────────────────────────────────

  backLink() {
    return html`<button type="button" data-on-click="onBackToList" class="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
      ${icon('chevLeft', { size: 14 })} VM Lifecycle
    </button>`
  }

  chev() {
    return icon('chevRight', { size: 12, className: 'text-gray-300' })
  }

  selectView() {
    const { vm } = this
    const { selectedAction } = this.state
    return html`<div class="flex flex-col gap-6">
      <div class="flex items-center gap-3">
        ${this.backLink()}
        ${this.chev()}
        <span class="text-sm text-gray-700 font-medium">${vm.name}</span>
      </div>
      ${sectionCard({
        title: 'Select Lifecycle Action',
        subtitle: `VM: ${vm.id} · ${vm.cpu}vCPU / ${vm.ram}G RAM / ${vm.storage}G · Contract: ${vm.contractNumber || vm.contractId}`,
        body: html`<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
          ${ACTIONS.map(
            (a) => html`<button type="button" data-on-click="onSelectAction" data-action="${a.key}"
              class="rounded-xl border-2 p-5 text-left transition-all hover:shadow-md"
              style="border-color: ${selectedAction === a.key ? a.color : 'var(--gray-200)'}; background: ${selectedAction === a.key ? a.bg : 'var(--white)'}">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style="background: ${a.bg}; color: ${a.color}">
                ${icon(a.icon, { size: 18 })}
              </div>
              <p class="font-semibold text-gray-900 mb-1">${a.title}</p>
              <p class="text-xs text-gray-500 leading-relaxed">${a.desc}</p>
            </button>`,
          )}
        </div>`,
      })}
    </div>`
  }

  submittedView() {
    const { selectedAction, requestId } = this.state
    return html`<div class="flex flex-col gap-6">
      <div class="flex items-center gap-3">${this.backLink()}</div>
      ${sectionCard({
        body: html`<div class="flex flex-col items-center gap-4 py-10 text-center">
          <div class="w-16 h-16 rounded-full flex items-center justify-center" style="background: var(--emerald-50); color: var(--green-600)">
            ${icon('checkCircle', { size: 32 })}
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-900">Changes Applied</h2>
            <p class="text-sm text-gray-500 mt-1">The VM record and contract points have been updated in Creatio.</p>
          </div>
          <div class="px-4 py-3 rounded-lg border" style="background: var(--we-tint-80); border-color: var(--we-tint-300)">
            <p class="text-xs text-gray-500">Request ID</p>
            <p class="font-mono font-semibold text-lg mt-0.5" style="color: var(--color-we-600)">${requestId}</p>
          </div>
          <div class="text-sm text-gray-500 max-w-sm leading-relaxed">
            ${selectedAction === 'terminate'
              ? 'The VM is marked Terminated in Creatio and its allocated points have been returned. No physical infrastructure or data disposal was executed.'
              : selectedAction === 'upgrade'
                ? 'The upgraded resources are saved in Creatio and the additional points have been consumed. No physical infrastructure resize was executed.'
                : 'The reduced resources are saved in Creatio and the removed points have been returned. No physical infrastructure resize was executed.'}
          </div>
          <div class="flex items-center gap-3 mt-2">
            ${button({ variant: 'secondary', label: 'View Request History', action: 'onHistory' })}
            ${button({ variant: 'primary', label: 'Back to VM Lifecycle', action: 'onBackToList' })}
          </div>
        </div>`,
      })}
    </div>`
  }

  step1(c, isTerminate, isUpgrade) {
    const { vm, contract } = this
    const fields = [
      { label: 'VM ID', value: vm.id },
      { label: 'Name', value: vm.name },
      { label: 'Contract', value: vm.contractNumber || vm.contractId },
      { label: 'Status', value: vm.status },
      { label: 'CPU', value: `${vm.cpu} vCPU` },
      { label: 'RAM', value: `${vm.ram} GB` },
      { label: 'Storage', value: `${vm.storage} GB` },
      { label: 'Points', value: `${c.currentPts} pts` },
    ]
    return html`<div class="flex flex-col gap-5">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        ${fields.map(
          (f) => html`<div class="flex flex-col gap-0.5">
            <span class="text-xs text-gray-400">${f.label}</span>
            <span class="text-sm font-medium text-gray-800">${f.value}</span>
          </div>`,
        )}
      </div>
      <div class="rounded-lg p-3 border" style="background: var(--we-tint-80); border-color: var(--we-tint-300)">
        <p class="text-xs font-medium mb-1" style="color: var(--color-we-600)">Contract Point Config</p>
        <p class="text-xs text-gray-600">
          ${contract.pointConfig.cpuPerPoint} vCPU / pt · ${contract.pointConfig.ramGBPerPoint} GB RAM / pt · ${contract.pointConfig.storageGBPerPoint} GB Storage / pt
        </p>
        <p class="text-xs text-gray-500 mt-1">
          Available balance: <strong class="text-green-700">${contract.availablePoints.toLocaleString()} pts</strong>
        </p>
      </div>
      ${isTerminate
        ? alert({ severity: 'error', message: 'Submitting marks this VM Terminated in Creatio immediately and returns its allocated points. The selected disposal method is recorded; no infrastructure deletion is executed.' })
        : ''}
      ${isUpgrade && c.ptDelta > 0
        ? alert({ severity: 'info', message: `This upgrade will consume approximately ${c.ptDelta} additional points from the contract balance.` })
        : ''}
    </div>`
  }

  entitlement(c, style) {
    return html`<div class="rounded-lg p-3 border text-xs" style="${style}">
      <strong>Resource Entitlement per Point · الموارد المستحقة لكل نقطة:</strong>
      ${' '}${c.cpuPP} vCPU · ${c.ramPP} GB RAM · ${c.stoPP} GB Storage per point (Config ${c.cfg?.version ?? 'v1.0'})
    </div>`
  }

  upgradeRows(c) {
    const { vm } = this
    return html`${specRow('Points', `${c.currentPts} pts`, `${c.upgradeNewPts} pts`, true)}
      ${specRow('CPU', `${vm.cpu} vCPU`, `${c.upgradeNewCpu} vCPU`, true)}
      ${specRow('RAM', `${vm.ram} GB`, `${c.upgradeNewRam} GB`, true)}
      ${specRow('Storage', `${vm.storage} GB`, `${c.upgradeNewSto} GB`, true)}`
  }

  downgradeRows(c) {
    const { vm } = this
    return html`${specRow('Points', `${c.currentPts} pts`, `${c.downgradeNewPts} pts`)}
      ${specRow('CPU', `${vm.cpu} vCPU`, `${c.downgradeNewCpu} vCPU`)}
      ${specRow('RAM', `${vm.ram} GB`, `${c.downgradeNewRam} GB`)}
      ${specRow('Storage', `${vm.storage} GB`, `${c.downgradeNewSto} GB`)}`
  }

  step2Upgrade(c) {
    const { contract, addOnCatalog } = this
    const { additionalPoints, addOns } = this.state
    const atMin = additionalPoints <= 1
    return html`<div class="flex flex-col gap-5">
      ${this.entitlement(c, 'background: var(--we-tint); border-color: var(--violet-300); color: var(--color-we-600)')}

      <div class="flex flex-col items-start gap-2">
        <label class="text-sm font-medium text-gray-700">Additional Service Points · النقاط الإضافية</label>
        <div class="flex items-center gap-3">
          <button type="button" data-on-click="onAddPointsDec"
            class="w-10 h-10 rounded-lg text-xl font-bold flex items-center justify-center transition-all"
            style="background: ${atMin ? 'var(--gray-100)' : 'var(--we-tint)'}; color: ${atMin ? 'var(--gray-300)' : 'var(--color-we-600)'}">−</button>
          <span class="w-16 text-center text-2xl font-bold" style="color: var(--color-we-600)">${additionalPoints}</span>
          <button type="button" data-on-click="onAddPointsInc"
            class="w-10 h-10 rounded-lg text-xl font-bold flex items-center justify-center transition-all"
            style="background: var(--we-tint); color: var(--color-we-600)">+</button>
          <span class="text-xs text-gray-500 ml-2">
            Balance: <strong class="text-green-700">${contract.availablePoints} pts available</strong>
          </span>
        </div>
      </div>

      <div>
        <p class="text-sm font-medium text-gray-700 mb-3">Resulting Configuration · التكوين النهائي</p>
        <div class="rounded-xl border p-4" style="border-color: var(--gray-200)">
          <div class="text-xs text-gray-400 mb-3">Base resources from points · الموارد الأساسية من النقاط</div>
          ${this.upgradeRows(c)}
          <div class="mt-3 pt-3 border-t text-xs text-gray-500" style="border-color: var(--gray-100)">
            Calculation: +${additionalPoints} pts × ${c.cpuPP} vCPU = +${c.upgradeAddCpu} vCPU · × ${c.ramPP} GB = +${c.upgradeAddRam} GB RAM · × ${c.stoPP} GB = +${c.upgradeAddSto} GB storage
          </div>
        </div>
      </div>

      <div>
        <p class="text-sm font-medium text-gray-700 mb-2">Optional Add-ons · الإضافات الاختيارية</p>
        <p class="text-xs text-gray-400 mb-3">Add-ons create financial charges only — they do not consume additional service points.</p>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          ${addOnCatalog.map((a) =>
            input({
              label: `${a.name} (${a.unit})`,
              id: `addon-${a.id}`,
              type: 'number',
              value: String(addOns[a.id] ?? 0),
              action: 'onAddOn',
              hint: `${a.unitPrice.toLocaleString()} per ${a.unit} · max ${a.max} · contract currency`,
              attrs: { 'data-addon': a.id },
            }),
          )}
        </div>
        ${c.addOnFinancial > 0
          ? html`<div class="mt-3 flex justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
              <span class="font-medium text-amber-700">Estimated add-on charges</span>
              <span class="font-semibold text-amber-900">${c.addOnFinancial.toLocaleString()} · contract currency</span>
            </div>`
          : ''}
      </div>
    </div>`
  }

  step2Downgrade(c) {
    const { pointsToRemove } = this.state
    const atMax = pointsToRemove >= c.currentPts - 1
    return html`<div class="flex flex-col gap-5">
      ${this.entitlement(c, 'background: var(--amber-50); border-color: var(--amber-200); color: var(--amber-800)')}

      <div class="flex flex-col items-start gap-2">
        <label class="text-sm font-medium text-gray-700">Points to Remove · النقاط المطلوب إزالتها</label>
        <div class="flex items-center gap-3">
          <button type="button" data-on-click="onRemovePointsDec"
            class="w-10 h-10 rounded-lg text-xl font-bold flex items-center justify-center"
            style="background: var(--we-tint); color: var(--color-we-600)">−</button>
          <span class="w-16 text-center text-2xl font-bold" style="color: var(--amber-600)">${pointsToRemove}</span>
          <button type="button" data-on-click="onRemovePointsInc"
            class="w-10 h-10 rounded-lg text-xl font-bold flex items-center justify-center"
            style="background: ${atMax ? 'var(--gray-100)' : 'var(--amber-50)'}; color: ${atMax ? 'var(--gray-300)' : 'var(--amber-600)'}">+</button>
          <span class="text-xs text-gray-500 ml-2">
            Current: <strong>${c.currentPts} pts</strong> · Min retained: 1 pt
          </span>
        </div>
      </div>

      <div>
        <p class="text-sm font-medium text-gray-700 mb-3">Resulting Configuration · التكوين النهائي</p>
        <div class="rounded-xl border p-4" style="border-color: var(--gray-200)">
          <div class="text-xs text-gray-400 mb-3">Base resources from points · الموارد الأساسية</div>
          ${this.downgradeRows(c)}
          <div class="mt-3 pt-3 border-t text-xs text-gray-500" style="border-color: var(--gray-100)">
            Calculation: −${c.safeRemove} pts × ${c.cpuPP} vCPU = −${c.downgradeRemoveCpu} vCPU · × ${c.ramPP} GB = −${c.downgradeRemoveRam} GB RAM · × ${c.stoPP} GB = −${c.downgradeRemoveSto} GB storage
          </div>
        </div>
      </div>

      <div class="rounded-xl border p-4" style="border-color: var(--amber-200); background: var(--amber-50)">
        <p class="text-xs font-semibold text-amber-800 mb-1">Point Restoration Outcome</p>
        <p class="text-xs text-amber-700">
          The removed allocated points will be returned to the contract immediately when you submit.
        </p>
      </div>
    </div>`
  }

  step2Terminate() {
    const { terminationDate, terminationReason, justification } = this.state
    return html`<div class="flex flex-col gap-5">
      ${input({ label: 'Termination Date (applies today)', type: 'date', value: terminationDate, action: 'onTerminationDate', attrs: { min: localDate(), max: localDate() } })}
      ${select({ label: 'Termination Reason', value: terminationReason, action: 'onTerminationReason', options: TERMINATION_REASONS, placeholder: 'Select reason…' })}
      ${input({ label: 'Additional Justification', value: justification, action: 'onJustification', placeholder: 'Describe why this VM is being terminated…' })}
    </div>`
  }

  step3Justification(isUpgrade) {
    const { reason, urgency, justification } = this.state
    return html`<div class="flex flex-col gap-5">
      ${select({ label: 'Primary Reason', value: reason, action: 'onReason', options: isUpgrade ? UPGRADE_REASONS : DOWNGRADE_REASONS, placeholder: 'Select reason…' })}
      ${select({ label: 'Urgency Level', value: urgency, action: 'onUrgency', options: URGENCY })}
      <div>
        <label for="business-justification" class="block text-sm font-medium text-gray-700 mb-1.5">Business Justification</label>
        <textarea id="business-justification" rows="4" data-on-input="onJustification"
          placeholder="Describe the business need and expected impact of this change (min. 20 characters)…"
          class="justification w-full text-sm rounded-lg border px-3 py-2.5 outline-none resize-none transition-colors">${justification}</textarea>
        <p class="text-xs text-gray-400 mt-1">${justification.length} / 20 min chars</p>
      </div>
    </div>`
  }

  step3Terminate() {
    const { dataDisposalMethod, backupConfirm } = this.state
    return html`<div class="flex flex-col gap-5">
      ${select({ label: 'Data Disposal Method', value: dataDisposalMethod, action: 'onDisposal', options: DISPOSAL_METHODS })}
      <div class="rounded-xl border p-4 flex items-start gap-3" style="border-color: var(--red-300); background: var(--red-25)">
        <input type="checkbox" id="backup-confirm" ${backupConfirm ? 'checked' : ''} data-on-change="onBackupConfirm"
          class="mt-0.5 w-4 h-4 cursor-pointer" style="accent-color: var(--red-600)" />
        <label for="backup-confirm" class="text-sm text-red-700 leading-relaxed cursor-pointer">
          I confirm that all critical data has been backed up or will be handled per the disposal method selected above, and I understand this action cannot be undone.
        </label>
      </div>
    </div>`
  }

  reviewLine(f) {
    return html`<div class="flex justify-between py-1.5 border-b last:border-0 text-sm" style="border-color: var(--gray-100)">
      <span class="text-gray-500">${f.label}</span>
      <span class="font-medium text-gray-800">${f.value}</span>
    </div>`
  }

  step4(c, isTerminate, isUpgrade) {
    const { vm } = this
    const { selectedAction, terminationDate, terminationReason, dataDisposalMethod, backupConfirm, justification } = this.state
    return html`<div class="flex flex-col gap-5">
      ${alert({ severity: 'info', message: 'Review the details before submitting. This immediately updates Creatio inventory and contract accounting without an approval stage.' })}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="rounded-xl border p-4" style="border-color: var(--gray-200)">
          <p class="text-xs font-semibold text-gray-500 uppercase mb-3">VM Details</p>
          ${[
            { label: 'VM ID', value: vm.id },
            { label: 'Name', value: vm.name },
            { label: 'Contract', value: vm.contractNumber || vm.contractId },
            { label: 'Action', value: selectedAction.charAt(0).toUpperCase() + selectedAction.slice(1) },
          ].map((f) => this.reviewLine(f))}
        </div>
        <div class="rounded-xl border p-4" style="border-color: var(--gray-200)">
          <p class="text-xs font-semibold text-gray-500 uppercase mb-3">${isTerminate ? 'Termination Details' : 'Resource Changes'}</p>
          ${isTerminate
            ? [
                { label: 'Date', value: terminationDate },
                { label: 'Reason', value: terminationReason },
                { label: 'Disposal', value: dataDisposalMethod.replace('_', ' ') },
                { label: 'Backup Confirmed', value: backupConfirm ? 'Yes' : 'No' },
              ].map((f) => this.reviewLine(f))
            : html`${isUpgrade ? this.upgradeRows(c) : this.downgradeRows(c)}
                <div class="pt-2 text-sm flex justify-between">
                  <span class="text-gray-500">Point delta</span>
                  <span class="font-semibold" style="color: ${c.ptDelta > 0 ? 'var(--red-600)' : 'var(--green-600)'}">
                    ${c.ptDelta > 0 ? `+${c.ptDelta}` : c.ptDelta} pts
                  </span>
                </div>`}
        </div>
      </div>
      ${!isTerminate
        ? html`<div class="rounded-xl border p-4" style="border-color: var(--gray-200)">
            <p class="text-xs font-semibold text-gray-500 uppercase mb-2">Justification</p>
            <p class="text-sm text-gray-700">${justification}</p>
          </div>`
        : ''}
    </div>`
  }

  // ── template ──────────────────────────────────────────────────────────────

  template() {
    const { vm, contract } = this
    if (!vm || !contract) return html`<div class="p-6 text-sm text-gray-500">VM not found.</div>`
    if (!contract.pointConfig) return html`${this.backLink()}${alert({severity:'error',message:contract.configurationError || 'The contract needs an active point configuration.'})}`

    const { selectedAction, step, submitted } = this.state
    if (!selectedAction || step === 0) return this.selectView()
    if (submitted) return this.submittedView()

    const isTerminate = selectedAction === 'terminate'
    const isUpgrade = selectedAction === 'upgrade'
    const c = this.calc()
    const steps = this.steps()
    const totalSteps = steps.length
    const isLast = step === totalSteps

    return html`<div class="flex flex-col gap-6">
      <div class="flex items-center gap-3">
        ${this.backLink()}
        ${this.chev()}
        <span class="text-sm text-gray-700 font-medium">${vm.name}</span>
        ${this.chev()}
        ${actionBadge(selectedAction)}
      </div>

      ${sectionCard({
        body: html`
          ${stepBar(steps, step - 1)}
          ${step === 1 ? this.step1(c, isTerminate, isUpgrade) : ''}
          ${step === 2 && isUpgrade ? this.step2Upgrade(c) : ''}
          ${step === 2 && !isUpgrade && !isTerminate ? this.step2Downgrade(c) : ''}
          ${step === 2 && isTerminate ? this.step2Terminate() : ''}
          ${step === 3 && !isTerminate ? this.step3Justification(isUpgrade) : ''}
          ${step === 3 && isTerminate ? this.step3Terminate() : ''}
          ${step === 4 ? this.step4(c, isTerminate, isUpgrade) : ''}

          <div class="flex items-center justify-between mt-6 pt-5 border-t" style="border-color: var(--gray-100)">
            ${button({ variant: 'secondary', icon: 'chevLeft', label: step === 1 ? 'Change Action' : 'Back', action: 'onPrev' })}
            <div class="flex items-center gap-2 text-xs text-gray-400">Step ${step} of ${totalSteps}</div>
            ${button({
              variant: isLast ? (isTerminate ? 'danger' : 'primary') : 'primary',
              icon: isLast ? 'send' : 'arrowRight',
              label: isLast ? (isTerminate ? 'Submit Termination Request' : 'Submit Request') : 'Continue',
              action: 'onNext',
              disabled: !this.canProceed(),
            })}
          </div>
        `,
      })}
    </div>`
  }
}

PortalElement.define(McitVmLifecycleAction)

},
"mcit/vm-lifecycle-history.js":function(require,exports){
// MCIT — Lifecycle Request History
// Source: prototype/src/mcit/VMLifecycle.tsx → VMLifecycleHistory (page key: 'vm-lifecycle-history')

const { PortalElement, css } = require("core/portal-element.js");
const { html } = require("core/html.js");
const { button, select, sectionCard, emptyState } = require("ui/index.js");
const { LC_REQUESTS, refreshData } = require("data/api.js");
const { actionBadge, lcStatusBadge, th, td } = require("mcit/vm-lifecycle-parts.js");
const styles = css`
  .history-row:hover {
    background: var(--gray-50);
  }
  .table-head {
    background: var(--neutral-50);
    border-color: var(--gray-100);
  }
`

class McitVmLifecycleHistory extends PortalElement {
  static tag = 'mcit-vm-lifecycle-history'
  static portal = 'mcit'
  static styles = styles

  initialState() {
    return { filterAction: 'all' }
  }

  async load() {
    await refreshData()
    this.requests = LC_REQUESTS
  }

  onFilterAction(e) {
    this.setState({ filterAction: e.target.value })
  }
  onBack() {
    this.navigate('vm-lifecycle')
  }

  template() {
    const { filterAction } = this.state
    const filtered = this.requests.filter((r) => filterAction === 'all' || r.action === filterAction)

    return html`
      <div class="flex flex-col gap-6">
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-xl font-semibold text-gray-900">Lifecycle Request History</h1>
            <p class="text-sm text-gray-500 mt-0.5">All submitted upgrade, downgrade, and termination requests</p>
          </div>
          ${button({ variant: 'secondary', icon: 'chevLeft', label: 'Back to VM Lifecycle', action: 'onBack' })}
        </div>

        ${sectionCard({
          body: html`<div class="flex items-center gap-3">
            ${select({
              label: '',
              id: 'filter-action',
              value: filterAction,
              action: 'onFilterAction',
              options: [
                { value: 'all', label: 'All Actions' },
                { value: 'upgrade', label: 'Upgrade' },
                { value: 'downgrade', label: 'Downgrade' },
                { value: 'terminate', label: 'Terminate' },
              ],
              attrs: { 'aria-label': 'Action' },
            })}
          </div>`,
        })}

        ${sectionCard({
          title: `${filtered.length} request${filtered.length !== 1 ? 's' : ''}`,
          body:
            filtered.length === 0
              ? emptyState({ icon: 'requests', title: 'No requests found', description: 'No lifecycle requests match your filter.' })
              : html`<div class="overflow-x-auto -mx-5 -mb-5" data-key="history-table">
                  <table class="w-full text-sm">
                    <thead>
                      <tr class="table-head border-b">
                        ${['Request ID', 'VM', 'Action', 'From', 'To', 'Point Δ', 'Status', 'Submitted'].map((h) => th(h))}
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                      ${filtered.map(
                        (r) => html`<tr class="history-row transition-colors">
                          ${td(html`<span style="color: var(--color-we-600)">${r.requestId}</span>`, true)}
                          ${td(html`<div class="flex flex-col gap-0.5">
                            <span class="font-medium text-gray-800">${r.vmName}</span>
                            <span class="text-xs text-gray-400 font-mono">${r.vmId}</span>
                          </div>`)}
                          ${td(actionBadge(r.action))}
                          ${td(r.currentCpu ? `${r.currentCpu}vCPU / ${r.currentRam}G / ${r.currentStorage}G` : '—', true)}
                          ${td(r.targetCpu ? `${r.targetCpu}vCPU / ${r.targetRam}G / ${r.targetStorage}G` : '—', true)}
                          ${td(
                            r.pointDelta !== undefined
                              ? html`<span class="font-semibold font-mono" style="color: ${r.pointDelta > 0 ? 'var(--red-600)' : 'var(--green-600)'}">${r.pointDelta > 0 ? `+${r.pointDelta}` : r.pointDelta}</span>`
                              : '—',
                          )}
                          ${td(lcStatusBadge(r.status))}
                          ${td(r.submittedAt.slice(0, 10), true)}
                        </tr>`,
                      )}
                    </tbody>
                  </table>
                </div>`,
        })}
      </div>
    `
  }
}

PortalElement.define(McitVmLifecycleHistory)

}};const cache={};function require(id){if(cache[id])return cache[id];const result=cache[id]={};modules[id](require,result);return result;}require("host.js");
if(!customElements.get("usr-usrvmlifecycle-listpage-v2")){class PageHost extends customElements.get('usr-vm-portal-v2'){connectedCallback(){this.setAttribute('initial-page',"vm-lifecycle");super.connectedCallback();this.addEventListener('usr-open-request',event=>{sdk.HandlerChainService.instance.process({type:'crt.OpenPageRequest',schemaName:'UsrMCITRequestDetail_Page',modelInitConfigs:[{action:'edit',recordId:event.detail.id}]});});}}customElements.define("usr-usrvmlifecycle-listpage-v2",PageHost);sdk.registerViewElement({type:"usr.UsrVMLifecycle_ListPageV2",selector:"usr-usrvmlifecycle-listpage-v2"});}
return {viewConfigDiff:[{operation:'remove',name:'MainHeader'},{operation:'remove',name:'MainContainer'},{operation:'insert',name:'UsrVMPortalV2',values:{type:"usr.UsrVMLifecycle_ListPageV2"},parentName:'Main',propertyName:'items',index:0}],viewModelConfigDiff:[],modelConfigDiff:[{operation:'merge',path:['dataSources','PDS','config'],values:{entitySchemaName:"UsrVirtualMachine"}}],handlers:[],converters:{},validators:{}};});