import { n as _defineProperty, t as _objectSpread2 } from "./objectSpread2-C_IE-bIJ.js";
import { $n as Output, Dl as ɵɵdefineInjector, En as ElementRef, Fc as NgZone, Hs as ɵɵtemplate, In as Input, Kc as VERSION, Wi as setClassMetadata, bc as EventEmitter, cn as Component, la as ɵɵNgOnChangesFeature, oo as ɵɵdirectiveInject, qn as NgModule, rl as forwardRef, ro as ɵɵdefineNgModule, to as ɵɵdefineComponent, ua as ɵɵProvidersFeature } from "./core-Cmi87fr7.js";
import { ot as first } from "./zipWith-BIPy9JuQ.js";
import { t as _asyncToGenerator } from "./asyncToGenerator-B0cJ8fiL.js";
import { C as CommonModule } from "./common-DMPRmAEJ.js";
import { FormsModule, NG_VALUE_ACCESSOR } from "./@angular_forms.js";
//#region node_modules/@ckeditor/ckeditor5-integrations-common/dist/index.js
function waitFor(callback, { timeOutAfter = 500, retryAfter = 100 } = {}) {
	return new Promise((resolve, reject) => {
		const startTime = Date.now();
		let lastError = null;
		const timeoutTimerId = setTimeout(() => {
			var _lastError;
			reject((_lastError = lastError) !== null && _lastError !== void 0 ? _lastError : /* @__PURE__ */ new Error("Timeout"));
		}, timeOutAfter);
		const tick = function() {
			var _ref = _asyncToGenerator(function* () {
				try {
					const result = yield callback();
					clearTimeout(timeoutTimerId);
					resolve(result);
				} catch (err) {
					lastError = err;
					if (Date.now() - startTime > timeOutAfter) reject(err);
					else setTimeout(tick, retryAfter);
				}
			});
			return function tick() {
				return _ref.apply(this, arguments);
			};
		}();
		tick();
	});
}
var INJECTED_SCRIPTS = /* @__PURE__ */ new Map();
function injectScript(src, { attributes } = {}) {
	if (INJECTED_SCRIPTS.has(src)) return INJECTED_SCRIPTS.get(src);
	const maybePrevScript = document.querySelector(`script[src="${src}"]`);
	if (maybePrevScript) {
		console.warn(`Script with "${src}" src is already present in DOM!`);
		maybePrevScript.remove();
	}
	const promise = new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.onerror = reject;
		script.onload = () => {
			resolve();
		};
		for (const [key, value] of Object.entries(attributes || {})) script.setAttribute(key, value);
		script.setAttribute("data-injected-by", "ckeditor-integration");
		script.type = "text/javascript";
		script.async = true;
		script.src = src;
		document.head.appendChild(script);
		const observer = new MutationObserver((mutations) => {
			if (mutations.flatMap((mutation) => Array.from(mutation.removedNodes)).includes(script)) {
				INJECTED_SCRIPTS.delete(src);
				observer.disconnect();
			}
		});
		observer.observe(document.head, {
			childList: true,
			subtree: true
		});
	});
	INJECTED_SCRIPTS.set(src, promise);
	return promise;
}
function injectScriptsInParallel(_x, _x2) {
	return _injectScriptsInParallel.apply(this, arguments);
}
function _injectScriptsInParallel() {
	_injectScriptsInParallel = _asyncToGenerator(function* (sources, props) {
		yield Promise.all(sources.map((src) => injectScript(src, props)));
	});
	return _injectScriptsInParallel.apply(this, arguments);
}
var INJECTED_STYLESHEETS = /* @__PURE__ */ new Map();
function injectStylesheet({ href, placementInHead = "start", attributes = {} }) {
	if (INJECTED_STYLESHEETS.has(href)) return INJECTED_STYLESHEETS.get(href);
	const maybePrevStylesheet = document.querySelector(`link[href="${href}"][rel="stylesheet"]`);
	if (maybePrevStylesheet) {
		console.warn(`Stylesheet with "${href}" href is already present in DOM!`);
		maybePrevStylesheet.remove();
	}
	const appendLinkTagToHead = (link) => {
		const previouslyInjectedLinks = Array.from(document.head.querySelectorAll("link[data-injected-by=\"ckeditor-integration\"]"));
		switch (placementInHead) {
			case "start":
				if (previouslyInjectedLinks.length) previouslyInjectedLinks.slice(-1)[0].after(link);
				else document.head.insertBefore(link, document.head.firstChild);
				break;
			case "end":
				document.head.appendChild(link);
				break;
		}
	};
	const promise = new Promise((resolve, reject) => {
		const link = document.createElement("link");
		for (const [key, value] of Object.entries(attributes || {})) link.setAttribute(key, value);
		link.setAttribute("data-injected-by", "ckeditor-integration");
		link.rel = "stylesheet";
		link.href = href;
		link.onerror = reject;
		link.onload = () => {
			resolve();
		};
		appendLinkTagToHead(link);
		const observer = new MutationObserver((mutations) => {
			if (mutations.flatMap((mutation) => Array.from(mutation.removedNodes)).includes(link)) {
				INJECTED_STYLESHEETS.delete(href);
				observer.disconnect();
			}
		});
		observer.observe(document.head, {
			childList: true,
			subtree: true
		});
	});
	INJECTED_STYLESHEETS.set(href, promise);
	return promise;
}
function preloadResource(url, { attributes } = {}) {
	if (document.head.querySelector(`link[href="${url}"][rel="preload"]`)) return;
	const link = document.createElement("link");
	for (const [key, value] of Object.entries(attributes || {})) link.setAttribute(key, value);
	link.setAttribute("data-injected-by", "ckeditor-integration");
	link.rel = "preload";
	link.as = detectTypeOfResource(url);
	link.href = url;
	document.head.insertBefore(link, document.head.firstChild);
}
function detectTypeOfResource(url) {
	switch (true) {
		case /\.css$/.test(url): return "style";
		case /\.js$/.test(url): return "script";
		default: return "fetch";
	}
}
var HEX_NUMBERS = new Array(256).fill("").map((_, index) => ("0" + index.toString(16)).slice(-2));
function uid() {
	const [r1, r2, r3, r4] = crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(4));
	return "e" + HEX_NUMBERS[r1 >> 0 & 255] + HEX_NUMBERS[r1 >> 8 & 255] + HEX_NUMBERS[r1 >> 16 & 255] + HEX_NUMBERS[r1 >> 24 & 255] + HEX_NUMBERS[r2 >> 0 & 255] + HEX_NUMBERS[r2 >> 8 & 255] + HEX_NUMBERS[r2 >> 16 & 255] + HEX_NUMBERS[r2 >> 24 & 255] + HEX_NUMBERS[r3 >> 0 & 255] + HEX_NUMBERS[r3 >> 8 & 255] + HEX_NUMBERS[r3 >> 16 & 255] + HEX_NUMBERS[r3 >> 24 & 255] + HEX_NUMBERS[r4 >> 0 & 255] + HEX_NUMBERS[r4 >> 8 & 255] + HEX_NUMBERS[r4 >> 16 & 255] + HEX_NUMBERS[r4 >> 24 & 255];
}
function uniq(source) {
	return Array.from(new Set(source));
}
function waitForWindowEntry(_x3, _x4) {
	return _waitForWindowEntry.apply(this, arguments);
}
function _waitForWindowEntry() {
	_waitForWindowEntry = _asyncToGenerator(function* (entryNames, config) {
		const tryPickBundle = () => entryNames.map((name) => window[name]).filter(Boolean)[0];
		return waitFor(() => {
			const result = tryPickBundle();
			if (!result) throw new Error(`Window entry "${entryNames.join(",")}" not found.`);
			return result;
		}, config);
	});
	return _waitForWindowEntry.apply(this, arguments);
}
function filterObjectValues(obj, filter) {
	const filteredEntries = Object.entries(obj).filter(([key, value]) => filter(value, key));
	return Object.fromEntries(filteredEntries);
}
function filterBlankObjectValues(obj) {
	return filterObjectValues(obj, (value) => value !== null && value !== void 0);
}
function mapObjectValues(obj, mapper) {
	const mappedEntries = Object.entries(obj).map(([key, value]) => [key, mapper(value, key)]);
	return Object.fromEntries(mappedEntries);
}
function without(itemsToRemove, items) {
	return items.filter((item) => !itemsToRemove.includes(item));
}
function isSemanticVersion(version) {
	return !!version && /^\d+\.\d+\.\d+/.test(version);
}
function destructureSemanticVersion(version) {
	if (!isSemanticVersion(version)) throw new Error(`Invalid semantic version: ${version || "<blank>"}.`);
	const [major, minor, patch] = version.split(".");
	return {
		major: Number.parseInt(major, 10),
		minor: Number.parseInt(minor, 10),
		patch: Number.parseInt(patch, 10)
	};
}
function isCKTestingVersion(version) {
	if (!version) return false;
	return [
		"nightly",
		"alpha",
		"internal",
		"nightly-",
		"staging"
	].some((testVersion) => version.includes(testVersion));
}
function isCKVersion(version) {
	return isSemanticVersion(version) || isCKTestingVersion(version);
}
function appendExtraPluginsToEditorConfig(config, plugins) {
	const extraPlugins = config.extraPlugins || [];
	return _objectSpread2(_objectSpread2({}, config), {}, { extraPlugins: [...extraPlugins, ...plugins.filter((item) => !extraPlugins.includes(item))] });
}
function getLicenseVersionFromEditorVersion(version) {
	if (isCKTestingVersion(version)) return 3;
	const { major } = destructureSemanticVersion(version);
	switch (true) {
		case major >= 44: return 3;
		case major >= 38: return 2;
		default: return 1;
	}
}
function getCKBaseBundleInstallationInfo() {
	const { CKEDITOR_VERSION, CKEDITOR } = window;
	if (!isCKVersion(CKEDITOR_VERSION)) return null;
	return {
		source: CKEDITOR ? "cdn" : "npm",
		version: CKEDITOR_VERSION
	};
}
function getSupportedLicenseVersionInstallationInfo() {
	const installationInfo = getCKBaseBundleInstallationInfo();
	if (!installationInfo) return null;
	return getLicenseVersionFromEditorVersion(installationInfo.version);
}
function isCKEditorFreeLicense(licenseKey, licenseVersion) {
	licenseVersion || (licenseVersion = getSupportedLicenseVersionInstallationInfo() || void 0);
	switch (licenseVersion) {
		case 1:
		case 2: return licenseKey === void 0;
		case 3: return licenseKey === "GPL";
		default: return false;
	}
}
function createIntegrationUsageDataPlugin(integrationName, usageData) {
	return function IntegrationUsageDataPlugin(editor) {
		if (isCKEditorFreeLicense(editor.config.get("licenseKey"))) return;
		editor.on("collectUsageData", (source, { setUsageData }) => {
			setUsageData(`integration.${integrationName}`, usageData);
		});
	};
}
var CK_CDN_URL = "https://cdn.ckeditor.com";
function createCKCdnUrl(bundle, file, version) {
	return `${CK_CDN_URL}/${bundle}/${version}/${file}`;
}
var CKBOX_CDN_URL = "https://cdn.ckbox.io";
function createCKBoxCdnUrl(bundle, file, version) {
	return `${CKBOX_CDN_URL}/${bundle}/${version}/${file}`;
}
var CK_DOCS_URL = "https://ckeditor.com/docs/ckeditor5";
function createCKDocsUrl(path, version = "latest") {
	return `${CK_DOCS_URL}/${version}/${path}`;
}
function createCKCdnBaseBundlePack({ version, translations, createCustomCdnUrl = createCKCdnUrl }) {
	const urls = {
		scripts: [createCustomCdnUrl("ckeditor5", "ckeditor5.umd.js", version), ...without(["en"], translations || []).map((translation) => createCustomCdnUrl("ckeditor5", `translations/${translation}.umd.js`, version))],
		stylesheets: [createCustomCdnUrl("ckeditor5", "ckeditor5.css", version)]
	};
	return {
		preload: [...urls.stylesheets, ...urls.scripts],
		scripts: [function() {
			var _ref2 = _asyncToGenerator(function* (attributes) {
				return injectScriptsInParallel(urls.scripts, attributes);
			});
			return function(_x5) {
				return _ref2.apply(this, arguments);
			};
		}()],
		stylesheets: urls.stylesheets,
		checkPluginLoaded: function() {
			var _ref3 = _asyncToGenerator(function* () {
				return waitForWindowEntry(["CKEDITOR"]);
			});
			return function checkPluginLoaded() {
				return _ref3.apply(this, arguments);
			};
		}(),
		beforeInject: () => {
			const installationInfo = getCKBaseBundleInstallationInfo();
			switch (installationInfo === null || installationInfo === void 0 ? void 0 : installationInfo.source) {
				case "npm": throw new Error("CKEditor 5 is already loaded from npm. Check the migration guide for more details: " + createCKDocsUrl("updating/migrations/vanilla-js.html"));
				case "cdn":
					if (installationInfo.version !== version) throw new Error(`CKEditor 5 is already loaded from CDN in version ${installationInfo.version}. Remove the old <script> and <link> tags loading CKEditor 5 to allow loading the ${version} version.`);
					break;
			}
		}
	};
}
function createCKCdnPremiumBundlePack({ version, translations, createCustomCdnUrl = createCKCdnUrl }) {
	const urls = {
		scripts: [createCustomCdnUrl("ckeditor5-premium-features", "ckeditor5-premium-features.umd.js", version), ...without(["en"], translations || []).map((translation) => createCustomCdnUrl("ckeditor5-premium-features", `translations/${translation}.umd.js`, version))],
		stylesheets: [createCustomCdnUrl("ckeditor5-premium-features", "ckeditor5-premium-features.css", version)]
	};
	return {
		preload: [...urls.stylesheets, ...urls.scripts],
		scripts: [function() {
			var _ref4 = _asyncToGenerator(function* (attributes) {
				return injectScriptsInParallel(urls.scripts, attributes);
			});
			return function(_x6) {
				return _ref4.apply(this, arguments);
			};
		}()],
		stylesheets: urls.stylesheets,
		checkPluginLoaded: function() {
			var _ref5 = _asyncToGenerator(function* () {
				return waitForWindowEntry(["CKEDITOR_PREMIUM_FEATURES"]);
			});
			return function checkPluginLoaded() {
				return _ref5.apply(this, arguments);
			};
		}()
	};
}
function loadCKCdnResourcesPack(_x7) {
	return _loadCKCdnResourcesPack.apply(this, arguments);
}
function _loadCKCdnResourcesPack() {
	_loadCKCdnResourcesPack = _asyncToGenerator(function* (pack) {
		let { htmlAttributes = {}, scripts = [], stylesheets = [], preload, beforeInject, checkPluginLoaded } = normalizeCKCdnResourcesPack(pack);
		beforeInject === null || beforeInject === void 0 || beforeInject();
		if (!preload) preload = uniq([...stylesheets.filter((item) => typeof item === "string"), ...scripts.filter((item) => typeof item === "string")]);
		for (const url of preload) preloadResource(url, { attributes: htmlAttributes });
		yield Promise.all(uniq(stylesheets).map((href) => injectStylesheet({
			href,
			attributes: htmlAttributes,
			placementInHead: "start"
		})));
		for (const script of uniq(scripts)) {
			const injectorProps = { attributes: htmlAttributes };
			if (typeof script === "string") yield injectScript(script, injectorProps);
			else yield script(injectorProps);
		}
		return checkPluginLoaded === null || checkPluginLoaded === void 0 ? void 0 : checkPluginLoaded();
	});
	return _loadCKCdnResourcesPack.apply(this, arguments);
}
function normalizeCKCdnResourcesPack(pack) {
	if (Array.isArray(pack)) return {
		scripts: pack.filter((item) => typeof item === "function" || item.endsWith(".js")),
		stylesheets: pack.filter((item) => item.endsWith(".css"))
	};
	if (typeof pack === "function") return { checkPluginLoaded: pack };
	return pack;
}
function combineCKCdnBundlesPacks(packs) {
	const normalizedPacks = mapObjectValues(filterBlankObjectValues(packs), normalizeCKCdnResourcesPack);
	const mergedPacks = Object.values(normalizedPacks).reduce((acc, pack) => {
		var _pack$scripts, _pack$stylesheets, _pack$preload;
		acc.scripts.push(...(_pack$scripts = pack.scripts) !== null && _pack$scripts !== void 0 ? _pack$scripts : []);
		acc.stylesheets.push(...(_pack$stylesheets = pack.stylesheets) !== null && _pack$stylesheets !== void 0 ? _pack$stylesheets : []);
		acc.preload.push(...(_pack$preload = pack.preload) !== null && _pack$preload !== void 0 ? _pack$preload : []);
		return acc;
	}, {
		preload: [],
		scripts: [],
		stylesheets: []
	});
	const checkPluginLoaded = function() {
		var _ref6 = _asyncToGenerator(function* () {
			const exportedGlobalVariables = /* @__PURE__ */ Object.create(null);
			for (const [name, pack] of Object.entries(normalizedPacks)) {
				var _pack$checkPluginLoad;
				exportedGlobalVariables[name] = yield pack === null || pack === void 0 || (_pack$checkPluginLoad = pack.checkPluginLoaded) === null || _pack$checkPluginLoad === void 0 ? void 0 : _pack$checkPluginLoad.call(pack);
			}
			return exportedGlobalVariables;
		});
		return function checkPluginLoaded() {
			return _ref6.apply(this, arguments);
		};
	}();
	const beforeInject = () => {
		for (const pack of Object.values(normalizedPacks)) {
			var _pack$beforeInject;
			(_pack$beforeInject = pack.beforeInject) === null || _pack$beforeInject === void 0 || _pack$beforeInject.call(pack);
		}
	};
	return _objectSpread2(_objectSpread2({}, mergedPacks), {}, {
		beforeInject,
		checkPluginLoaded
	});
}
function getCKBoxInstallationInfo() {
	var _window$CKBox;
	const version = (_window$CKBox = window.CKBox) === null || _window$CKBox === void 0 ? void 0 : _window$CKBox.version;
	if (!isSemanticVersion(version)) return null;
	return {
		source: "cdn",
		version
	};
}
function createCKBoxBundlePack({ version, theme = "lark", translations, createCustomCdnUrl = createCKBoxCdnUrl }) {
	return _objectSpread2(_objectSpread2({ scripts: [createCustomCdnUrl("ckbox", "ckbox.js", version), ...without(["en"], translations || []).map((translation) => createCustomCdnUrl("ckbox", `translations/${translation}.js`, version))] }, theme && { stylesheets: [createCustomCdnUrl("ckbox", `styles/themes/${theme}.css`, version)] }), {}, {
		checkPluginLoaded: function() {
			var _ref7 = _asyncToGenerator(function* () {
				return waitForWindowEntry(["CKBox"]);
			});
			return function checkPluginLoaded() {
				return _ref7.apply(this, arguments);
			};
		}(),
		beforeInject: () => {
			const installationInfo = getCKBoxInstallationInfo();
			if (installationInfo && installationInfo.version !== version) throw new Error(`CKBox is already loaded from CDN in version ${installationInfo.version}. Remove the old <script> and <link> tags loading CKBox to allow loading the ${version} version.`);
		}
	});
}
function isCKCdnSupportedByEditorVersion(version) {
	if (isCKTestingVersion(version)) return true;
	const { major } = destructureSemanticVersion(version);
	switch (getLicenseVersionFromEditorVersion(version)) {
		case 3: return true;
		default: return major === 43;
	}
}
function combineCdnPluginsPacks(pluginsPacks) {
	return combineCKCdnBundlesPacks(mapObjectValues(pluginsPacks, (pluginPack, pluginName) => {
		if (!pluginPack) return;
		const normalizedPluginPack = normalizeCKCdnResourcesPack(pluginPack);
		return _objectSpread2({ checkPluginLoaded: function() {
			var _ref8 = _asyncToGenerator(function* () {
				return waitForWindowEntry([pluginName]);
			});
			return function checkPluginLoaded() {
				return _ref8.apply(this, arguments);
			};
		}() }, normalizedPluginPack);
	}));
}
function loadCKEditorCloud(config) {
	const { version, translations, plugins, premium, ckbox, createCustomCdnUrl, injectedHtmlElementsAttributes = { crossorigin: "anonymous" } } = config;
	validateCKEditorVersion(version);
	return loadCKCdnResourcesPack(_objectSpread2(_objectSpread2({}, combineCKCdnBundlesPacks(_objectSpread2(_objectSpread2(_objectSpread2({ CKEditor: createCKCdnBaseBundlePack({
		version,
		translations,
		createCustomCdnUrl
	}) }, premium && { CKEditorPremiumFeatures: createCKCdnPremiumBundlePack({
		version,
		translations,
		createCustomCdnUrl
	}) }), ckbox && { CKBox: createCKBoxBundlePack(ckbox) }), {}, { loadedPlugins: combineCdnPluginsPacks(plugins !== null && plugins !== void 0 ? plugins : {}) }))), {}, { htmlAttributes: injectedHtmlElementsAttributes }));
}
function validateCKEditorVersion(version) {
	if (isCKTestingVersion(version)) console.warn("You are using a testing version of CKEditor 5. Please remember that it is not suitable for production environments.");
	if (!isCKCdnSupportedByEditorVersion(version)) throw new Error(`The CKEditor 5 CDN can't be used with the given editor version: ${version}. Please make sure you are using at least the CKEditor 5 version 44.`);
}
//#endregion
//#region node_modules/@ckeditor/ckeditor5-angular/fesm2022/ckeditor-ckeditor5-angular.mjs
var _CKEditorComponent;
var _CKEditorModule;
function CKEditorComponent_ng_template_0_Template(rf, ctx) {}
/**
* @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
/**
* This part of the code is not executed in open-source implementations using a GPL key.
* It only runs when a specific license key is provided. If you are uncertain whether
* this applies to your installation, please contact our support team.
*/
var AngularIntegrationUsageDataPlugin = createIntegrationUsageDataPlugin("angular", {
	version: "9.1.0",
	frameworkVersion: VERSION.full
});
/**
* @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
/**
* Appends all integration plugins to the editor configuration.
*
* @param editorConfig The editor configuration.
* @returns The editor configuration with all integration plugins appended.
*/
function appendAllIntegrationPluginsToConfig(editorConfig) {
	const extraPlugins = [];
	if (!isCKEditorFreeLicense(editorConfig.licenseKey))
 /**
	* This part of the code is not executed in open-source implementations using a GPL key.
	* It only runs when a specific license key is provided. If you are uncertain whether
	* this applies to your installation, please contact our support team.
	*/
	extraPlugins.push(AngularIntegrationUsageDataPlugin);
	return appendExtraPluginsToEditorConfig(editorConfig, extraPlugins);
}
var ANGULAR_INTEGRATION_READ_ONLY_LOCK_ID = "Lock from Angular integration (@ckeditor/ckeditor5-angular)";
var CKEditorComponent = class {
	/**
	* When set `true`, the editor becomes read-only.
	* See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html#member-isReadOnly
	* to learn more.
	*/
	set disabled(isDisabled) {
		this.setDisabledState(isDisabled);
	}
	get disabled() {
		if (this.editorInstance) return this.editorInstance.isReadOnly;
		return this.initiallyDisabled;
	}
	/**
	* The instance of the editor created by this component.
	*/
	get editorInstance() {
		let editorWatchdog = this.editorWatchdog;
		if (this.watchdog) editorWatchdog = this.watchdog._watchdogs.get(this.id);
		if (editorWatchdog) return editorWatchdog.editor;
		return null;
	}
	getId() {
		return this.id;
	}
	constructor(elementRef, ngZone) {
		_defineProperty(
			this,
			/**
			* The reference to the DOM element created by the component.
			*/
			"elementRef",
			void 0
		);
		_defineProperty(
			this,
			/**
			* The constructor of the editor to be used for the instance of the component.
			* It can be e.g. the `ClassicEditorBuild`, `InlineEditorBuild` or some custom editor.
			*/
			"editor",
			void 0
		);
		_defineProperty(
			this,
			/**
			* The configuration of the editor.
			* See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html
			* to learn more.
			*/
			"config",
			{}
		);
		_defineProperty(
			this,
			/**
			* The initial data of the editor. Useful when not using the ngModel.
			* See https://angular.io/api/forms/NgModel to learn more.
			*/
			"data",
			""
		);
		_defineProperty(
			this,
			/**
			* Tag name of the editor component.
			*
			* The default tag is 'div'.
			*/
			"tagName",
			"div"
		);
		_defineProperty(
			this,
			/**
			* The context watchdog.
			*/
			"watchdog",
			void 0
		);
		_defineProperty(
			this,
			/**
			* Config for the EditorWatchdog.
			*/
			"editorWatchdogConfig",
			void 0
		);
		_defineProperty(
			this,
			/**
			* Allows disabling the two-way data binding mechanism. Disabling it can boost performance for large documents.
			*
			* When a component is connected using the [(ngModel)] or [formControl] directives and this value is set to true then none of the data
			* will ever be synchronized.
			*
			* An integrator must call `editor.data.get()` manually once the application needs the editor's data.
			* An editor instance can be received in the `ready()` callback.
			*/
			"disableTwoWayDataBinding",
			false
		);
		_defineProperty(
			this,
			/**
			* Fires when the editor is ready. It corresponds with the `editor#ready`
			* https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html#event-ready
			* event.
			*/
			"ready",
			new EventEmitter()
		);
		_defineProperty(
			this,
			/**
			* Fires when the content of the editor has changed. It corresponds with the `editor.model.document#change`
			* https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_document-Document.html#event-change
			* event.
			*/
			"change",
			new EventEmitter()
		);
		_defineProperty(
			this,
			/**
			* Fires when the editing view of the editor is blurred. It corresponds with the `editor.editing.view.document#blur`
			* https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_view_document-Document.html#event-event:blur
			* event.
			*/
			"blur",
			new EventEmitter()
		);
		_defineProperty(
			this,
			/**
			* Fires when the editing view of the editor is focused. It corresponds with the `editor.editing.view.document#focus`
			* https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_view_document-Document.html#event-event:focus
			* event.
			*/
			"focus",
			new EventEmitter()
		);
		_defineProperty(
			this,
			/**
			* Fires when the editor component crashes.
			*/
			"error",
			new EventEmitter()
		);
		_defineProperty(
			this,
			/**
			* The editor watchdog. It is created when the context watchdog is not passed to the component.
			* It keeps the editor running.
			*/
			"editorWatchdog",
			void 0
		);
		_defineProperty(
			this,
			/**
			* If the component is read–only before the editor instance is created, it remembers that state,
			* so the editor can become read–only once it is ready.
			*/
			"initiallyDisabled",
			false
		);
		_defineProperty(
			this,
			/**
			* An instance of https://angular.io/api/core/NgZone to allow the interaction with the editor
			* withing the Angular event loop.
			*/
			"ngZone",
			void 0
		);
		_defineProperty(
			this,
			/**
			* A callback executed when the content of the editor changes. Part of the
			* `ControlValueAccessor` (https://angular.io/api/forms/ControlValueAccessor) interface.
			*
			* Note: Unset unless the component uses the `ngModel`.
			*/
			"cvaOnChange",
			void 0
		);
		_defineProperty(
			this,
			/**
			* A callback executed when the editor has been blurred. Part of the
			* `ControlValueAccessor` (https://angular.io/api/forms/ControlValueAccessor) interface.
			*
			* Note: Unset unless the component uses the `ngModel`.
			*/
			"cvaOnTouched",
			void 0
		);
		_defineProperty(
			this,
			/**
			* Reference to the source element used by the editor.
			*/
			"editorElement",
			void 0
		);
		_defineProperty(
			this,
			/**
			* A lock flag preventing from calling the `cvaOnChange()` during setting editor data.
			*/
			"isEditorSettingData",
			false
		);
		_defineProperty(this, "id", uid());
		this.ngZone = ngZone;
		this.elementRef = elementRef;
		this.checkVersion();
	}
	checkVersion() {
		const { CKEDITOR_VERSION } = window;
		if (!CKEDITOR_VERSION) return console.warn("Cannot find the \"CKEDITOR_VERSION\" in the \"window\" scope.");
		const [major] = CKEDITOR_VERSION.split(".").map(Number);
		if (major >= 42 || CKEDITOR_VERSION.startsWith("0.0.0")) return;
		console.warn("The <CKEditor> component requires using CKEditor 5 in version 42+ or nightly build.");
	}
	ngOnChanges(changes) {
		if (Object.prototype.hasOwnProperty.call(changes, "data") && changes.data && !changes.data.isFirstChange()) this.writeValue(changes.data.currentValue);
	}
	ngAfterViewInit() {
		this.attachToWatchdog();
	}
	ngOnDestroy() {
		var _this = this;
		return _asyncToGenerator(function* () {
			if (_this.watchdog) yield _this.watchdog.remove(_this.id);
			else if (_this.editorWatchdog && _this.editorWatchdog.editor) {
				yield _this.editorWatchdog.destroy();
				_this.editorWatchdog = void 0;
			}
		})();
	}
	writeValue(value) {
		if (value === null) value = "";
		if (this.editorInstance) {
			this.isEditorSettingData = true;
			this.editorInstance.data.set(value);
			this.isEditorSettingData = false;
		} else {
			this.data = value;
			this.ready.pipe(first()).subscribe((editor) => {
				editor.data.set(this.data);
			});
		}
	}
	registerOnChange(callback) {
		this.cvaOnChange = callback;
	}
	registerOnTouched(callback) {
		this.cvaOnTouched = callback;
	}
	setDisabledState(isDisabled) {
		if (this.editorInstance) if (isDisabled) this.editorInstance.enableReadOnlyMode(ANGULAR_INTEGRATION_READ_ONLY_LOCK_ID);
		else this.editorInstance.disableReadOnlyMode(ANGULAR_INTEGRATION_READ_ONLY_LOCK_ID);
		this.initiallyDisabled = isDisabled;
	}
	/**
	* Creates the editor instance, sets initial editor data, then integrates
	* the editor with the Angular component. This method does not use the `editor.data.set()`
	* because of the issue in the collaboration mode (#6).
	*/
	attachToWatchdog() {
		var _this2 = this;
		const creator = (elementOrData, config) => {
			return this.ngZone.runOutsideAngular(_asyncToGenerator(function* () {
				_this2.elementRef.nativeElement.appendChild(elementOrData);
				const editor = yield _this2.editor.create(elementOrData, config);
				if (_this2.initiallyDisabled) editor.enableReadOnlyMode(ANGULAR_INTEGRATION_READ_ONLY_LOCK_ID);
				_this2.ngZone.run(() => {
					_this2.ready.emit(editor);
				});
				_this2.setUpEditorEvents(editor);
				return editor;
			}));
		};
		const destructor = function() {
			var _ref = _asyncToGenerator(function* (editor) {
				yield editor.destroy();
				_this2.elementRef.nativeElement.removeChild(_this2.editorElement);
			});
			return function destructor(_x) {
				return _ref.apply(this, arguments);
			};
		}();
		const emitError = (e) => {
			if (hasObservers(this.error)) this.ngZone.run(() => this.error.emit(e));
			else console.error(e);
		};
		const element = document.createElement(this.tagName);
		const config = this.getConfig();
		this.editorElement = element;
		if (this.watchdog) {
			this.watchdog.add({
				id: this.id,
				type: "editor",
				creator,
				destructor,
				sourceElementOrData: element,
				config
			}).catch((e) => {
				emitError(e);
			});
			this.watchdog.on("itemError", (_, { itemId }) => {
				if (itemId === this.id) emitError();
			});
		} else {
			const editorWatchdog = new this.editor.EditorWatchdog(this.editor, this.editorWatchdogConfig);
			editorWatchdog.setCreator(creator);
			editorWatchdog.setDestructor(destructor);
			editorWatchdog.on("error", emitError);
			this.editorWatchdog = editorWatchdog;
			this.ngZone.runOutsideAngular(() => {
				editorWatchdog.create(element, config).catch((e) => {
					emitError(e);
				});
			});
		}
	}
	getConfig() {
		if (this.data && this.config.initialData) throw new Error("Editor data should be provided either using `config.initialData` or `data` properties.");
		const config = _objectSpread2({}, this.config);
		const initialData = this.config.initialData || this.data;
		if (initialData) config.initialData = initialData;
		return appendAllIntegrationPluginsToConfig(config);
	}
	/**
	* Integrates the editor with the component by attaching related event listeners.
	*/
	setUpEditorEvents(editor) {
		const modelDocument = editor.model.document;
		const viewDocument = editor.editing.view.document;
		modelDocument.on("change:data", (evt) => {
			this.ngZone.run(() => {
				if (this.disableTwoWayDataBinding) return;
				if (this.cvaOnChange && !this.isEditorSettingData) {
					const data = editor.data.get();
					this.cvaOnChange(data);
				}
				this.change.emit({
					event: evt,
					editor
				});
			});
		});
		viewDocument.on("focus", (evt) => {
			this.ngZone.run(() => {
				this.focus.emit({
					event: evt,
					editor
				});
			});
		});
		viewDocument.on("blur", (evt) => {
			this.ngZone.run(() => {
				if (this.cvaOnTouched) this.cvaOnTouched();
				this.blur.emit({
					event: evt,
					editor
				});
			});
		});
	}
};
_CKEditorComponent = CKEditorComponent;
_defineProperty(CKEditorComponent, "ɵfac", function CKEditorComponent_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _CKEditorComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
});
_defineProperty(CKEditorComponent, "ɵcmp", /* @__PURE__ */ ɵɵdefineComponent({
	type: _CKEditorComponent,
	selectors: [["ckeditor"]],
	inputs: {
		editor: "editor",
		config: "config",
		data: "data",
		tagName: "tagName",
		watchdog: "watchdog",
		editorWatchdogConfig: "editorWatchdogConfig",
		disableTwoWayDataBinding: "disableTwoWayDataBinding",
		disabled: "disabled"
	},
	outputs: {
		ready: "ready",
		change: "change",
		blur: "blur",
		focus: "focus",
		error: "error"
	},
	standalone: false,
	features: [ɵɵProvidersFeature([{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => _CKEditorComponent),
		multi: true
	}]), ɵɵNgOnChangesFeature],
	decls: 1,
	vars: 0,
	template: function CKEditorComponent_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, CKEditorComponent_ng_template_0_Template, 0, 0, "ng-template");
	},
	encapsulation: 2,
	changeDetection: 1
}));
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CKEditorComponent, [{
		type: Component,
		args: [{
			selector: "ckeditor",
			template: "<ng-template></ng-template>",
			providers: [{
				provide: NG_VALUE_ACCESSOR,
				useExisting: forwardRef(() => CKEditorComponent),
				multi: true
			}]
		}]
	}], function() {
		return [{ type: ElementRef }, { type: NgZone }];
	}, {
		editor: [{ type: Input }],
		config: [{ type: Input }],
		data: [{ type: Input }],
		tagName: [{ type: Input }],
		watchdog: [{ type: Input }],
		editorWatchdogConfig: [{ type: Input }],
		disableTwoWayDataBinding: [{ type: Input }],
		disabled: [{ type: Input }],
		ready: [{ type: Output }],
		change: [{ type: Output }],
		blur: [{ type: Output }],
		focus: [{ type: Output }],
		error: [{ type: Output }]
	});
})();
function hasObservers(emitter) {
	return emitter.observed || emitter.observers.length > 0;
}
/**
* @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
var CKEditorModule = class {};
_CKEditorModule = CKEditorModule;
_defineProperty(CKEditorModule, "ɵfac", function CKEditorModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _CKEditorModule)();
});
_defineProperty(CKEditorModule, "ɵmod", /* @__PURE__ */ ɵɵdefineNgModule({
	type: _CKEditorModule,
	declarations: [CKEditorComponent],
	imports: [FormsModule, CommonModule],
	exports: [CKEditorComponent]
}));
_defineProperty(CKEditorModule, "ɵinj", /* @__PURE__ */ ɵɵdefineInjector({ imports: [FormsModule, CommonModule] }));
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CKEditorModule, [{
		type: NgModule,
		args: [{
			imports: [FormsModule, CommonModule],
			declarations: [CKEditorComponent],
			exports: [CKEditorComponent]
		}]
	}], null, null);
})();
/**
* @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
//#endregion
export { CKEditorComponent, CKEditorModule, loadCKEditorCloud };
