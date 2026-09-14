import { n as _defineProperty } from "./objectSpread2-C_IE-bIJ.js";
import { $ as isDevMode, Dc as Injector, Dl as ɵɵdefineInjector, Ec as InjectionToken, Fc as NgZone, Lc as PLATFORM_ID, Qn as Optional, Wi as setClassMetadata, pl as makeEnvironmentProviders, qn as NgModule, ro as ɵɵdefineNgModule } from "./core-Cmi87fr7.js";
import { Cn as from, Ft as concatMap, bt as distinct, rn as timer } from "./zipWith-BIPy9JuQ.js";
import { t as _asyncToGenerator } from "./asyncToGenerator-B0cJ8fiL.js";
import { d as isPlatformServer } from "./common-DMPRmAEJ.js";
import { A as calculateBackoffMillis, C as Logger, E as ErrorFactory, K as isIndexedDBAvailable, O as base64, R as getGlobal, T as Deferred, Z as issuedAtTime, b as registerVersion, c as _getProvider, d as _registerComponent, h as getApp, w as Component, z as getModularInstance } from "./index.esm2017-DghwDOiZ.js";
import "./firebase_app.js";
import { _ as ɵgetDefaultInstanceOf, g as ɵgetAllInstancesOf, h as ɵAngularFireSchedulers, m as VERSION, r as FirebaseApps, t as FirebaseApp, v as ɵzoneWrap } from "./angular-fire-app-DXJ_OEJm.js";
//#region node_modules/@firebase/app-check/dist/esm/index.esm2017.js
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var APP_CHECK_STATES = /* @__PURE__ */ new Map();
var DEFAULT_STATE = {
	activated: false,
	tokenObservers: []
};
var DEBUG_STATE = {
	initialized: false,
	enabled: false
};
/**
* Gets a reference to the state object.
*/
function getStateReference(app) {
	return APP_CHECK_STATES.get(app) || Object.assign({}, DEFAULT_STATE);
}
/**
* Set once on initialization. The map should hold the same reference to the
* same object until this entry is deleted.
*/
function setInitialState(app, state) {
	APP_CHECK_STATES.set(app, state);
	return APP_CHECK_STATES.get(app);
}
function getDebugState() {
	return DEBUG_STATE;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var BASE_ENDPOINT = "https://content-firebaseappcheck.googleapis.com/v1";
var EXCHANGE_RECAPTCHA_TOKEN_METHOD = "exchangeRecaptchaV3Token";
var EXCHANGE_RECAPTCHA_ENTERPRISE_TOKEN_METHOD = "exchangeRecaptchaEnterpriseToken";
var EXCHANGE_DEBUG_TOKEN_METHOD = "exchangeDebugToken";
var TOKEN_REFRESH_TIME = {
	/**
	* The offset time before token natural expiration to run the refresh.
	* This is currently 5 minutes.
	*/
	OFFSET_DURATION: 300 * 1e3,
	/**
	* This is the first retrial wait after an error. This is currently
	* 30 seconds.
	*/
	RETRIAL_MIN_WAIT: 30 * 1e3,
	/**
	* This is the maximum retrial wait, currently 16 minutes.
	*/
	RETRIAL_MAX_WAIT: 960 * 1e3
};
/**
* One day in millis, for certain error code backoffs.
*/
var ONE_DAY = 1440 * 60 * 1e3;
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Port from auth proactiverefresh.js
*
*/
var Refresher = class {
	constructor(operation, retryPolicy, getWaitDuration, lowerBound, upperBound) {
		this.operation = operation;
		this.retryPolicy = retryPolicy;
		this.getWaitDuration = getWaitDuration;
		this.lowerBound = lowerBound;
		this.upperBound = upperBound;
		this.pending = null;
		this.nextErrorWaitInterval = lowerBound;
		if (lowerBound > upperBound) throw new Error("Proactive refresh lower bound greater than upper bound!");
	}
	start() {
		this.nextErrorWaitInterval = this.lowerBound;
		this.process(true).catch(() => {});
	}
	stop() {
		if (this.pending) {
			this.pending.reject("cancelled");
			this.pending = null;
		}
	}
	isRunning() {
		return !!this.pending;
	}
	process(hasSucceeded) {
		var _this = this;
		return _asyncToGenerator(function* () {
			_this.stop();
			try {
				_this.pending = new Deferred();
				_this.pending.promise.catch((_e) => {});
				yield sleep(_this.getNextRun(hasSucceeded));
				_this.pending.resolve();
				yield _this.pending.promise;
				_this.pending = new Deferred();
				_this.pending.promise.catch((_e) => {});
				yield _this.operation();
				_this.pending.resolve();
				yield _this.pending.promise;
				_this.process(true).catch(() => {});
			} catch (error) {
				if (_this.retryPolicy(error)) _this.process(false).catch(() => {});
				else _this.stop();
			}
		})();
	}
	getNextRun(hasSucceeded) {
		if (hasSucceeded) {
			this.nextErrorWaitInterval = this.lowerBound;
			return this.getWaitDuration();
		} else {
			const currentErrorWaitInterval = this.nextErrorWaitInterval;
			this.nextErrorWaitInterval *= 2;
			if (this.nextErrorWaitInterval > this.upperBound) this.nextErrorWaitInterval = this.upperBound;
			return currentErrorWaitInterval;
		}
	}
};
function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ERROR_FACTORY = new ErrorFactory("appCheck", "AppCheck", {
	["already-initialized"]: "You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.",
	["use-before-activation"]: "App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.",
	["fetch-network-error"]: "Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.",
	["fetch-parse-error"]: "Fetch client could not parse response. Original error: {$originalErrorMessage}.",
	["fetch-status-error"]: "Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.",
	["storage-open"]: "Error thrown when opening storage. Original error: {$originalErrorMessage}.",
	["storage-get"]: "Error thrown when reading from storage. Original error: {$originalErrorMessage}.",
	["storage-set"]: "Error thrown when writing to storage. Original error: {$originalErrorMessage}.",
	["recaptcha-error"]: "ReCAPTCHA error.",
	["initial-throttle"]: `{$httpStatus} error. Attempts allowed again after {$time}`,
	["throttled"]: `Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}`
});
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function getRecaptcha(isEnterprise = false) {
	var _a;
	if (isEnterprise) return (_a = self.grecaptcha) === null || _a === void 0 ? void 0 : _a.enterprise;
	return self.grecaptcha;
}
function ensureActivated(app) {
	if (!getStateReference(app).activated) throw ERROR_FACTORY.create("use-before-activation", { appName: app.name });
}
function getDurationString(durationInMillis) {
	const totalSeconds = Math.round(durationInMillis / 1e3);
	const days = Math.floor(totalSeconds / (3600 * 24));
	const hours = Math.floor((totalSeconds - days * 3600 * 24) / 3600);
	const minutes = Math.floor((totalSeconds - days * 3600 * 24 - hours * 3600) / 60);
	const seconds = totalSeconds - days * 3600 * 24 - hours * 3600 - minutes * 60;
	let result = "";
	if (days) result += pad(days) + "d:";
	if (hours) result += pad(hours) + "h:";
	result += pad(minutes) + "m:" + pad(seconds) + "s";
	return result;
}
function pad(value) {
	if (value === 0) return "00";
	return value >= 10 ? value.toString() : "0" + value;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function exchangeToken(_x, _x2) {
	return _exchangeToken.apply(this, arguments);
}
function _exchangeToken() {
	_exchangeToken = _asyncToGenerator(function* ({ url, body }, heartbeatServiceProvider) {
		const headers = { "Content-Type": "application/json" };
		const heartbeatService = heartbeatServiceProvider.getImmediate({ optional: true });
		if (heartbeatService) {
			const heartbeatsHeader = yield heartbeatService.getHeartbeatsHeader();
			if (heartbeatsHeader) headers["X-Firebase-Client"] = heartbeatsHeader;
		}
		const options = {
			method: "POST",
			body: JSON.stringify(body),
			headers
		};
		let response;
		try {
			response = yield fetch(url, options);
		} catch (originalError) {
			throw ERROR_FACTORY.create("fetch-network-error", { originalErrorMessage: originalError === null || originalError === void 0 ? void 0 : originalError.message });
		}
		if (response.status !== 200) throw ERROR_FACTORY.create("fetch-status-error", { httpStatus: response.status });
		let responseBody;
		try {
			responseBody = yield response.json();
		} catch (originalError) {
			throw ERROR_FACTORY.create("fetch-parse-error", { originalErrorMessage: originalError === null || originalError === void 0 ? void 0 : originalError.message });
		}
		const match = responseBody.ttl.match(/^([\d.]+)(s)$/);
		if (!match || !match[2] || isNaN(Number(match[1]))) throw ERROR_FACTORY.create("fetch-parse-error", { originalErrorMessage: `ttl field (timeToLive) is not in standard Protobuf Duration format: ${responseBody.ttl}` });
		const timeToLiveAsNumber = Number(match[1]) * 1e3;
		const now = Date.now();
		return {
			token: responseBody.token,
			expireTimeMillis: now + timeToLiveAsNumber,
			issuedAtTimeMillis: now
		};
	});
	return _exchangeToken.apply(this, arguments);
}
function getExchangeRecaptchaV3TokenRequest(app, reCAPTCHAToken) {
	const { projectId, appId, apiKey } = app.options;
	return {
		url: `${BASE_ENDPOINT}/projects/${projectId}/apps/${appId}:${EXCHANGE_RECAPTCHA_TOKEN_METHOD}?key=${apiKey}`,
		body: { "recaptcha_v3_token": reCAPTCHAToken }
	};
}
function getExchangeRecaptchaEnterpriseTokenRequest(app, reCAPTCHAToken) {
	const { projectId, appId, apiKey } = app.options;
	return {
		url: `${BASE_ENDPOINT}/projects/${projectId}/apps/${appId}:${EXCHANGE_RECAPTCHA_ENTERPRISE_TOKEN_METHOD}?key=${apiKey}`,
		body: { "recaptcha_enterprise_token": reCAPTCHAToken }
	};
}
function getExchangeDebugTokenRequest(app, debugToken) {
	const { projectId, appId, apiKey } = app.options;
	return {
		url: `${BASE_ENDPOINT}/projects/${projectId}/apps/${appId}:${EXCHANGE_DEBUG_TOKEN_METHOD}?key=${apiKey}`,
		body: { debug_token: debugToken }
	};
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var DB_NAME = "firebase-app-check-database";
var DB_VERSION = 1;
var STORE_NAME = "firebase-app-check-store";
var DEBUG_TOKEN_KEY = "debug-token";
var dbPromise = null;
function getDBPromise() {
	if (dbPromise) return dbPromise;
	dbPromise = new Promise((resolve, reject) => {
		try {
			const request = indexedDB.open(DB_NAME, DB_VERSION);
			request.onsuccess = (event) => {
				resolve(event.target.result);
			};
			request.onerror = (event) => {
				var _a;
				reject(ERROR_FACTORY.create("storage-open", { originalErrorMessage: (_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message }));
			};
			request.onupgradeneeded = (event) => {
				const db = event.target.result;
				switch (event.oldVersion) {
					case 0: db.createObjectStore(STORE_NAME, { keyPath: "compositeKey" });
				}
			};
		} catch (e) {
			reject(ERROR_FACTORY.create("storage-open", { originalErrorMessage: e === null || e === void 0 ? void 0 : e.message }));
		}
	});
	return dbPromise;
}
function readTokenFromIndexedDB(app) {
	return read(computeKey(app));
}
function writeTokenToIndexedDB(app, token) {
	return write(computeKey(app), token);
}
function writeDebugTokenToIndexedDB(token) {
	return write(DEBUG_TOKEN_KEY, token);
}
function readDebugTokenFromIndexedDB() {
	return read(DEBUG_TOKEN_KEY);
}
function write(_x3, _x4) {
	return _write.apply(this, arguments);
}
function _write() {
	_write = _asyncToGenerator(function* (key, value) {
		const transaction = (yield getDBPromise()).transaction(STORE_NAME, "readwrite");
		const request = transaction.objectStore(STORE_NAME).put({
			compositeKey: key,
			value
		});
		return new Promise((resolve, reject) => {
			request.onsuccess = (_event) => {
				resolve();
			};
			transaction.onerror = (event) => {
				var _a;
				reject(ERROR_FACTORY.create("storage-set", { originalErrorMessage: (_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message }));
			};
		});
	});
	return _write.apply(this, arguments);
}
function read(_x5) {
	return _read.apply(this, arguments);
}
function _read() {
	_read = _asyncToGenerator(function* (key) {
		const transaction = (yield getDBPromise()).transaction(STORE_NAME, "readonly");
		const request = transaction.objectStore(STORE_NAME).get(key);
		return new Promise((resolve, reject) => {
			request.onsuccess = (event) => {
				const result = event.target.result;
				if (result) resolve(result.value);
				else resolve(void 0);
			};
			transaction.onerror = (event) => {
				var _a;
				reject(ERROR_FACTORY.create("storage-get", { originalErrorMessage: (_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message }));
			};
		});
	});
	return _read.apply(this, arguments);
}
function computeKey(app) {
	return `${app.options.appId}-${app.name}`;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var logger = new Logger("@firebase/app-check");
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Always resolves. In case of an error reading from indexeddb, resolve with undefined
*/
function readTokenFromStorage(_x6) {
	return _readTokenFromStorage.apply(this, arguments);
}
function _readTokenFromStorage() {
	_readTokenFromStorage = _asyncToGenerator(function* (app) {
		if (isIndexedDBAvailable()) {
			let token = void 0;
			try {
				token = yield readTokenFromIndexedDB(app);
			} catch (e) {
				logger.warn(`Failed to read token from IndexedDB. Error: ${e}`);
			}
			return token;
		}
	});
	return _readTokenFromStorage.apply(this, arguments);
}
/**
* Always resolves. In case of an error writing to indexeddb, print a warning and resolve the promise
*/
function writeTokenToStorage(app, token) {
	if (isIndexedDBAvailable()) return writeTokenToIndexedDB(app, token).catch((e) => {
		logger.warn(`Failed to write token to IndexedDB. Error: ${e}`);
	});
	return Promise.resolve();
}
function readOrCreateDebugTokenFromStorage() {
	return _readOrCreateDebugTokenFromStorage.apply(this, arguments);
}
function _readOrCreateDebugTokenFromStorage() {
	_readOrCreateDebugTokenFromStorage = _asyncToGenerator(function* () {
		/**
		* Theoretically race condition can happen if we read, then write in 2 separate transactions.
		* But it won't happen here, because this function will be called exactly once.
		*/
		let existingDebugToken = void 0;
		try {
			existingDebugToken = yield readDebugTokenFromIndexedDB();
		} catch (_e) {}
		if (!existingDebugToken) {
			const newToken = crypto.randomUUID();
			writeDebugTokenToIndexedDB(newToken).catch((e) => logger.warn(`Failed to persist debug token to IndexedDB. Error: ${e}`));
			return newToken;
		} else return existingDebugToken;
	});
	return _readOrCreateDebugTokenFromStorage.apply(this, arguments);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function isDebugMode() {
	return getDebugState().enabled;
}
function getDebugToken() {
	return _getDebugToken.apply(this, arguments);
}
function _getDebugToken() {
	_getDebugToken = _asyncToGenerator(function* () {
		const state = getDebugState();
		if (state.enabled && state.token) return state.token.promise;
		else throw Error(`
            Can't get debug token in production mode.
        `);
	});
	return _getDebugToken.apply(this, arguments);
}
function initializeDebugMode() {
	const globals = getGlobal();
	const debugState = getDebugState();
	debugState.initialized = true;
	if (typeof globals.FIREBASE_APPCHECK_DEBUG_TOKEN !== "string" && globals.FIREBASE_APPCHECK_DEBUG_TOKEN !== true) return;
	debugState.enabled = true;
	const deferredToken = new Deferred();
	debugState.token = deferredToken;
	if (typeof globals.FIREBASE_APPCHECK_DEBUG_TOKEN === "string") deferredToken.resolve(globals.FIREBASE_APPCHECK_DEBUG_TOKEN);
	else deferredToken.resolve(readOrCreateDebugTokenFromStorage());
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var defaultTokenErrorData = { error: "UNKNOWN_ERROR" };
/**
* Stringify and base64 encode token error data.
*
* @param tokenError Error data, currently hardcoded.
*/
function formatDummyToken(tokenErrorData) {
	return base64.encodeString(JSON.stringify(tokenErrorData), false);
}
/**
* This function always resolves.
* The result will contain an error field if there is any error.
* In case there is an error, the token field in the result will be populated with a dummy value
*/
function getToken$2(_x7) {
	return _getToken$.apply(this, arguments);
}
function _getToken$() {
	_getToken$ = _asyncToGenerator(function* (appCheck, forceRefresh = false, shouldLogErrors = false) {
		const app = appCheck.app;
		ensureActivated(app);
		const state = getStateReference(app);
		/**
		* First check if there is a token in memory from a previous `getToken()` call.
		*/
		let token = state.token;
		let error = void 0;
		/**
		* If an invalid token was found in memory, clear token from
		* memory and unset the local variable `token`.
		*/
		if (token && !isValid(token)) {
			state.token = void 0;
			token = void 0;
		}
		/**
		* If there is no valid token in memory, try to load token from indexedDB.
		*/
		if (!token) {
			const cachedToken = yield state.cachedTokenPromise;
			if (cachedToken) if (isValid(cachedToken)) token = cachedToken;
			else yield writeTokenToStorage(app, void 0);
		}
		if (!forceRefresh && token && isValid(token)) return { token: token.token };
		let shouldCallListeners = false;
		/**
		* DEBUG MODE
		* If debug mode is set, and there is no cached token, fetch a new App
		* Check token using the debug token, and return it directly.
		*/
		if (isDebugMode()) try {
			if (!state.exchangeTokenPromise) {
				state.exchangeTokenPromise = exchangeToken(getExchangeDebugTokenRequest(app, yield getDebugToken()), appCheck.heartbeatServiceProvider).finally(() => {
					state.exchangeTokenPromise = void 0;
				});
				shouldCallListeners = true;
			}
			const tokenFromDebugExchange = yield state.exchangeTokenPromise;
			yield writeTokenToStorage(app, tokenFromDebugExchange);
			state.token = tokenFromDebugExchange;
			return { token: tokenFromDebugExchange.token };
		} catch (e) {
			if (e.code === `appCheck/throttled` || e.code === `appCheck/initial-throttle`) logger.warn(e.message);
			else if (shouldLogErrors) logger.error(e);
			return makeDummyTokenResult(e);
		}
		/**
		* There are no valid tokens in memory or indexedDB and we are not in
		* debug mode.
		* Request a new token from the exchange endpoint.
		*/
		try {
			if (!state.exchangeTokenPromise) {
				state.exchangeTokenPromise = state.provider.getToken().finally(() => {
					state.exchangeTokenPromise = void 0;
				});
				shouldCallListeners = true;
			}
			token = yield getStateReference(app).exchangeTokenPromise;
		} catch (e) {
			if (e.code === `appCheck/throttled` || e.code === `appCheck/initial-throttle`) logger.warn(e.message);
			else if (shouldLogErrors) logger.error(e);
			error = e;
		}
		let interopTokenResult;
		if (!token) interopTokenResult = makeDummyTokenResult(error);
		else if (error) if (isValid(token)) interopTokenResult = {
			token: token.token,
			internalError: error
		};
		else interopTokenResult = makeDummyTokenResult(error);
		else {
			interopTokenResult = { token: token.token };
			state.token = token;
			yield writeTokenToStorage(app, token);
		}
		if (shouldCallListeners) notifyTokenListeners(app, interopTokenResult);
		return interopTokenResult;
	});
	return _getToken$.apply(this, arguments);
}
/**
* Internal API for limited use tokens. Skips all FAC state and simply calls
* the underlying provider.
*/
function getLimitedUseToken$1(_x8) {
	return _getLimitedUseToken$.apply(this, arguments);
}
function _getLimitedUseToken$() {
	_getLimitedUseToken$ = _asyncToGenerator(function* (appCheck) {
		const app = appCheck.app;
		ensureActivated(app);
		const { provider } = getStateReference(app);
		if (isDebugMode()) {
			const { token } = yield exchangeToken(getExchangeDebugTokenRequest(app, yield getDebugToken()), appCheck.heartbeatServiceProvider);
			return { token };
		} else {
			const { token } = yield provider.getToken();
			return { token };
		}
	});
	return _getLimitedUseToken$.apply(this, arguments);
}
function addTokenListener(appCheck, type, listener, onError) {
	const { app } = appCheck;
	const state = getStateReference(app);
	const tokenObserver = {
		next: listener,
		error: onError,
		type
	};
	state.tokenObservers = [...state.tokenObservers, tokenObserver];
	if (state.token && isValid(state.token)) {
		const validToken = state.token;
		Promise.resolve().then(() => {
			listener({ token: validToken.token });
			initTokenRefresher(appCheck);
		}).catch(() => {});
	}
	/**
	* Wait for any cached token promise to resolve before starting the token
	* refresher. The refresher checks to see if there is an existing token
	* in state and calls the exchange endpoint if not. We should first let the
	* IndexedDB check have a chance to populate state if it can.
	*
	* Listener call isn't needed here because cachedTokenPromise will call any
	* listeners that exist when it resolves.
	*/
	state.cachedTokenPromise.then(() => initTokenRefresher(appCheck));
}
function removeTokenListener(app, listener) {
	const state = getStateReference(app);
	const newObservers = state.tokenObservers.filter((tokenObserver) => tokenObserver.next !== listener);
	if (newObservers.length === 0 && state.tokenRefresher && state.tokenRefresher.isRunning()) state.tokenRefresher.stop();
	state.tokenObservers = newObservers;
}
/**
* Logic to create and start refresher as needed.
*/
function initTokenRefresher(appCheck) {
	const { app } = appCheck;
	const state = getStateReference(app);
	let refresher = state.tokenRefresher;
	if (!refresher) {
		refresher = createTokenRefresher(appCheck);
		state.tokenRefresher = refresher;
	}
	if (!refresher.isRunning() && state.isTokenAutoRefreshEnabled) refresher.start();
}
function createTokenRefresher(appCheck) {
	const { app } = appCheck;
	return new Refresher(_asyncToGenerator(function* () {
		const state = getStateReference(app);
		let result;
		if (!state.token) result = yield getToken$2(appCheck);
		else result = yield getToken$2(appCheck, true);
		/**
		* getToken() always resolves. In case the result has an error field defined, it means
		* the operation failed, and we should retry.
		*/
		if (result.error) throw result.error;
		/**
		* A special `internalError` field reflects that there was an error
		* getting a new token from the exchange endpoint, but there's still a
		* previous token that's valid for now and this should be passed to 2P/3P
		* requests for a token. But we want this callback (`this.operation` in
		* `Refresher`) to throw in order to kick off the Refresher's retry
		* backoff. (Setting `hasSucceeded` to false.)
		*/
		if (result.internalError) throw result.internalError;
	}), () => {
		return true;
	}, () => {
		const state = getStateReference(app);
		if (state.token) {
			let nextRefreshTimeMillis = state.token.issuedAtTimeMillis + (state.token.expireTimeMillis - state.token.issuedAtTimeMillis) * .5 + 300 * 1e3;
			const latestAllowableRefresh = state.token.expireTimeMillis - 300 * 1e3;
			nextRefreshTimeMillis = Math.min(nextRefreshTimeMillis, latestAllowableRefresh);
			return Math.max(0, nextRefreshTimeMillis - Date.now());
		} else return 0;
	}, TOKEN_REFRESH_TIME.RETRIAL_MIN_WAIT, TOKEN_REFRESH_TIME.RETRIAL_MAX_WAIT);
}
function notifyTokenListeners(app, token) {
	const observers = getStateReference(app).tokenObservers;
	for (const observer of observers) try {
		if (observer.type === "EXTERNAL" && token.error != null) observer.error(token.error);
		else observer.next(token);
	} catch (e) {}
}
function isValid(token) {
	return token.expireTimeMillis - Date.now() > 0;
}
function makeDummyTokenResult(error) {
	return {
		token: formatDummyToken(defaultTokenErrorData),
		error
	};
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* AppCheck Service class.
*/
var AppCheckService = class {
	constructor(app, heartbeatServiceProvider) {
		this.app = app;
		this.heartbeatServiceProvider = heartbeatServiceProvider;
	}
	_delete() {
		const { tokenObservers } = getStateReference(this.app);
		for (const tokenObserver of tokenObservers) removeTokenListener(this.app, tokenObserver.next);
		return Promise.resolve();
	}
};
function factory(app, heartbeatServiceProvider) {
	return new AppCheckService(app, heartbeatServiceProvider);
}
function internalFactory(appCheck) {
	return {
		getToken: (forceRefresh) => getToken$2(appCheck, forceRefresh),
		getLimitedUseToken: () => getLimitedUseToken$1(appCheck),
		addTokenListener: (listener) => addTokenListener(appCheck, "INTERNAL", listener),
		removeTokenListener: (listener) => removeTokenListener(appCheck.app, listener)
	};
}
var name = "@firebase/app-check";
var version = "0.10.1";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var RECAPTCHA_URL = "https://www.google.com/recaptcha/api.js";
var RECAPTCHA_ENTERPRISE_URL = "https://www.google.com/recaptcha/enterprise.js";
function initializeV3(app, siteKey) {
	const initialized = new Deferred();
	const state = getStateReference(app);
	state.reCAPTCHAState = { initialized };
	const divId = makeDiv(app);
	const grecaptcha = getRecaptcha(false);
	if (!grecaptcha) loadReCAPTCHAV3Script(() => {
		const grecaptcha = getRecaptcha(false);
		if (!grecaptcha) throw new Error("no recaptcha");
		queueWidgetRender(app, siteKey, grecaptcha, divId, initialized);
	});
	else queueWidgetRender(app, siteKey, grecaptcha, divId, initialized);
	return initialized.promise;
}
function initializeEnterprise(app, siteKey) {
	const initialized = new Deferred();
	const state = getStateReference(app);
	state.reCAPTCHAState = { initialized };
	const divId = makeDiv(app);
	const grecaptcha = getRecaptcha(true);
	if (!grecaptcha) loadReCAPTCHAEnterpriseScript(() => {
		const grecaptcha = getRecaptcha(true);
		if (!grecaptcha) throw new Error("no recaptcha");
		queueWidgetRender(app, siteKey, grecaptcha, divId, initialized);
	});
	else queueWidgetRender(app, siteKey, grecaptcha, divId, initialized);
	return initialized.promise;
}
/**
* Add listener to render the widget and resolve the promise when
* the grecaptcha.ready() event fires.
*/
function queueWidgetRender(app, siteKey, grecaptcha, container, initialized) {
	grecaptcha.ready(() => {
		renderInvisibleWidget(app, siteKey, grecaptcha, container);
		initialized.resolve(grecaptcha);
	});
}
/**
* Add invisible div to page.
*/
function makeDiv(app) {
	const divId = `fire_app_check_${app.name}`;
	const invisibleDiv = document.createElement("div");
	invisibleDiv.id = divId;
	invisibleDiv.style.display = "none";
	document.body.appendChild(invisibleDiv);
	return divId;
}
function getToken$1(_x9) {
	return _getToken$2.apply(this, arguments);
}
function _getToken$2() {
	_getToken$2 = _asyncToGenerator(function* (app) {
		ensureActivated(app);
		const recaptcha = yield getStateReference(app).reCAPTCHAState.initialized.promise;
		return new Promise((resolve, _reject) => {
			const reCAPTCHAState = getStateReference(app).reCAPTCHAState;
			recaptcha.ready(() => {
				resolve(recaptcha.execute(reCAPTCHAState.widgetId, { action: "fire_app_check" }));
			});
		});
	});
	return _getToken$2.apply(this, arguments);
}
/**
*
* @param app
* @param container - Id of a HTML element.
*/
function renderInvisibleWidget(app, siteKey, grecaptcha, container) {
	const widgetId = grecaptcha.render(container, {
		sitekey: siteKey,
		size: "invisible",
		callback: () => {
			getStateReference(app).reCAPTCHAState.succeeded = true;
		},
		"error-callback": () => {
			getStateReference(app).reCAPTCHAState.succeeded = false;
		}
	});
	const state = getStateReference(app);
	state.reCAPTCHAState = Object.assign(Object.assign({}, state.reCAPTCHAState), { widgetId });
}
function loadReCAPTCHAV3Script(onload) {
	const script = document.createElement("script");
	script.src = RECAPTCHA_URL;
	script.onload = onload;
	document.head.appendChild(script);
}
function loadReCAPTCHAEnterpriseScript(onload) {
	const script = document.createElement("script");
	script.src = RECAPTCHA_ENTERPRISE_URL;
	script.onload = onload;
	document.head.appendChild(script);
}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* App Check provider that can obtain a reCAPTCHA V3 token and exchange it
* for an App Check token.
*
* @public
*/
var ReCaptchaV3Provider = class ReCaptchaV3Provider {
	/**
	* Create a ReCaptchaV3Provider instance.
	* @param siteKey - ReCAPTCHA V3 siteKey.
	*/
	constructor(_siteKey) {
		this._siteKey = _siteKey;
		/**
		* Throttle requests on certain error codes to prevent too many retries
		* in a short time.
		*/
		this._throttleData = null;
	}
	/**
	* Returns an App Check token.
	* @internal
	*/
	getToken() {
		var _this2 = this;
		return _asyncToGenerator(function* () {
			var _a, _b, _c;
			throwIfThrottled(_this2._throttleData);
			const attestedClaimsToken = yield getToken$1(_this2._app).catch((_e) => {
				throw ERROR_FACTORY.create("recaptcha-error");
			});
			if (!((_a = getStateReference(_this2._app).reCAPTCHAState) === null || _a === void 0 ? void 0 : _a.succeeded)) throw ERROR_FACTORY.create("recaptcha-error");
			let result;
			try {
				result = yield exchangeToken(getExchangeRecaptchaV3TokenRequest(_this2._app, attestedClaimsToken), _this2._heartbeatServiceProvider);
			} catch (e) {
				if ((_b = e.code) === null || _b === void 0 ? void 0 : _b.includes("fetch-status-error")) {
					_this2._throttleData = setBackoff(Number((_c = e.customData) === null || _c === void 0 ? void 0 : _c.httpStatus), _this2._throttleData);
					throw ERROR_FACTORY.create("initial-throttle", {
						time: getDurationString(_this2._throttleData.allowRequestsAfter - Date.now()),
						httpStatus: _this2._throttleData.httpStatus
					});
				} else throw e;
			}
			_this2._throttleData = null;
			return result;
		})();
	}
	/**
	* @internal
	*/
	initialize(app) {
		this._app = app;
		this._heartbeatServiceProvider = _getProvider(app, "heartbeat");
		initializeV3(app, this._siteKey).catch(() => {});
	}
	/**
	* @internal
	*/
	isEqual(otherProvider) {
		if (otherProvider instanceof ReCaptchaV3Provider) return this._siteKey === otherProvider._siteKey;
		else return false;
	}
};
/**
* App Check provider that can obtain a reCAPTCHA Enterprise token and exchange it
* for an App Check token.
*
* @public
*/
var ReCaptchaEnterpriseProvider = class ReCaptchaEnterpriseProvider {
	/**
	* Create a ReCaptchaEnterpriseProvider instance.
	* @param siteKey - reCAPTCHA Enterprise score-based site key.
	*/
	constructor(_siteKey) {
		this._siteKey = _siteKey;
		/**
		* Throttle requests on certain error codes to prevent too many retries
		* in a short time.
		*/
		this._throttleData = null;
	}
	/**
	* Returns an App Check token.
	* @internal
	*/
	getToken() {
		var _this3 = this;
		return _asyncToGenerator(function* () {
			var _a, _b, _c;
			throwIfThrottled(_this3._throttleData);
			const attestedClaimsToken = yield getToken$1(_this3._app).catch((_e) => {
				throw ERROR_FACTORY.create("recaptcha-error");
			});
			if (!((_a = getStateReference(_this3._app).reCAPTCHAState) === null || _a === void 0 ? void 0 : _a.succeeded)) throw ERROR_FACTORY.create("recaptcha-error");
			let result;
			try {
				result = yield exchangeToken(getExchangeRecaptchaEnterpriseTokenRequest(_this3._app, attestedClaimsToken), _this3._heartbeatServiceProvider);
			} catch (e) {
				if ((_b = e.code) === null || _b === void 0 ? void 0 : _b.includes("fetch-status-error")) {
					_this3._throttleData = setBackoff(Number((_c = e.customData) === null || _c === void 0 ? void 0 : _c.httpStatus), _this3._throttleData);
					throw ERROR_FACTORY.create("initial-throttle", {
						time: getDurationString(_this3._throttleData.allowRequestsAfter - Date.now()),
						httpStatus: _this3._throttleData.httpStatus
					});
				} else throw e;
			}
			_this3._throttleData = null;
			return result;
		})();
	}
	/**
	* @internal
	*/
	initialize(app) {
		this._app = app;
		this._heartbeatServiceProvider = _getProvider(app, "heartbeat");
		initializeEnterprise(app, this._siteKey).catch(() => {});
	}
	/**
	* @internal
	*/
	isEqual(otherProvider) {
		if (otherProvider instanceof ReCaptchaEnterpriseProvider) return this._siteKey === otherProvider._siteKey;
		else return false;
	}
};
/**
* Custom provider class.
* @public
*/
var CustomProvider = class CustomProvider {
	constructor(_customProviderOptions) {
		this._customProviderOptions = _customProviderOptions;
	}
	/**
	* @internal
	*/
	getToken() {
		var _this4 = this;
		return _asyncToGenerator(function* () {
			const customToken = yield _this4._customProviderOptions.getToken();
			const issuedAtTimeSeconds = issuedAtTime(customToken.token);
			const issuedAtTimeMillis = issuedAtTimeSeconds !== null && issuedAtTimeSeconds < Date.now() && issuedAtTimeSeconds > 0 ? issuedAtTimeSeconds * 1e3 : Date.now();
			return Object.assign(Object.assign({}, customToken), { issuedAtTimeMillis });
		})();
	}
	/**
	* @internal
	*/
	initialize(app) {
		this._app = app;
	}
	/**
	* @internal
	*/
	isEqual(otherProvider) {
		if (otherProvider instanceof CustomProvider) return this._customProviderOptions.getToken.toString() === otherProvider._customProviderOptions.getToken.toString();
		else return false;
	}
};
/**
* Set throttle data to block requests until after a certain time
* depending on the failed request's status code.
* @param httpStatus - Status code of failed request.
* @param throttleData - `ThrottleData` object containing previous throttle
* data state.
* @returns Data about current throttle state and expiration time.
*/
function setBackoff(httpStatus, throttleData) {
	/**
	* Block retries for 1 day for the following error codes:
	*
	* 404: Likely malformed URL.
	*
	* 403:
	* - Attestation failed
	* - Wrong API key
	* - Project deleted
	*/
	if (httpStatus === 404 || httpStatus === 403) return {
		backoffCount: 1,
		allowRequestsAfter: Date.now() + ONE_DAY,
		httpStatus
	};
	else {
		/**
		* For all other error codes, the time when it is ok to retry again
		* is based on exponential backoff.
		*/
		const backoffCount = throttleData ? throttleData.backoffCount : 0;
		const backoffMillis = calculateBackoffMillis(backoffCount, 1e3, 2);
		return {
			backoffCount: backoffCount + 1,
			allowRequestsAfter: Date.now() + backoffMillis,
			httpStatus
		};
	}
}
function throwIfThrottled(throttleData) {
	if (throttleData) {
		if (Date.now() - throttleData.allowRequestsAfter <= 0) throw ERROR_FACTORY.create("throttled", {
			time: getDurationString(throttleData.allowRequestsAfter - Date.now()),
			httpStatus: throttleData.httpStatus
		});
	}
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Activate App Check for the given app. Can be called only once per app.
* @param app - the {@link @firebase/app#FirebaseApp} to activate App Check for
* @param options - App Check initialization options
* @public
*/
function initializeAppCheck$1(app = getApp(), options) {
	app = getModularInstance(app);
	const provider = _getProvider(app, "app-check");
	if (!getDebugState().initialized) initializeDebugMode();
	if (isDebugMode()) getDebugToken().then((token) => console.log(`App Check debug token: ${token}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`));
	if (provider.isInitialized()) {
		const existingInstance = provider.getImmediate();
		const initialOptions = provider.getOptions();
		if (initialOptions.isTokenAutoRefreshEnabled === options.isTokenAutoRefreshEnabled && initialOptions.provider.isEqual(options.provider)) return existingInstance;
		else throw ERROR_FACTORY.create("already-initialized", { appName: app.name });
	}
	const appCheck = provider.initialize({ options });
	_activate(app, options.provider, options.isTokenAutoRefreshEnabled);
	if (getStateReference(app).isTokenAutoRefreshEnabled) addTokenListener(appCheck, "INTERNAL", () => {});
	return appCheck;
}
/**
* Activate App Check
* @param app - Firebase app to activate App Check for.
* @param provider - reCAPTCHA v3 provider or
* custom token provider.
* @param isTokenAutoRefreshEnabled - If true, the SDK automatically
* refreshes App Check tokens as needed. If undefined, defaults to the
* value of `app.automaticDataCollectionEnabled`, which defaults to
* false and can be set in the app config.
*/
function _activate(app, provider, isTokenAutoRefreshEnabled = false) {
	const state = setInitialState(app, Object.assign({}, DEFAULT_STATE));
	state.activated = true;
	state.provider = provider;
	state.cachedTokenPromise = readTokenFromStorage(app).then((cachedToken) => {
		if (cachedToken && isValid(cachedToken)) {
			state.token = cachedToken;
			notifyTokenListeners(app, { token: cachedToken.token });
		}
		return cachedToken;
	});
	state.isTokenAutoRefreshEnabled = isTokenAutoRefreshEnabled && app.automaticDataCollectionEnabled;
	if (!app.automaticDataCollectionEnabled && isTokenAutoRefreshEnabled) logger.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh.");
	state.provider.initialize(app);
}
/**
* Set whether App Check will automatically refresh tokens as needed.
*
* @param appCheckInstance - The App Check service instance.
* @param isTokenAutoRefreshEnabled - If true, the SDK automatically
* refreshes App Check tokens as needed. This overrides any value set
* during `initializeAppCheck()`.
* @public
*/
function setTokenAutoRefreshEnabled$1(appCheckInstance, isTokenAutoRefreshEnabled) {
	const app = appCheckInstance.app;
	const state = getStateReference(app);
	if (state.tokenRefresher) if (isTokenAutoRefreshEnabled === true) state.tokenRefresher.start();
	else state.tokenRefresher.stop();
	state.isTokenAutoRefreshEnabled = isTokenAutoRefreshEnabled;
}
/**
* Get the current App Check token. If `forceRefresh` is false, this function first
* checks for a valid token in memory, then local persistence (IndexedDB).
* If not found, or if `forceRefresh` is true, it makes a request to the
* App Check endpoint for a fresh token. That request attaches
* to the most recent in-flight request if one is present.
*
* @param appCheckInstance - The App Check service instance.
* @param forceRefresh - If true, will always try to fetch a fresh token.
* If false, will use a cached token if found in storage.
* @public
*/
function getToken$3(_x10, _x11) {
	return _getToken.apply(this, arguments);
}
function _getToken() {
	_getToken = _asyncToGenerator(function* (appCheckInstance, forceRefresh) {
		const result = yield getToken$2(appCheckInstance, forceRefresh);
		if (result.error) throw result.error;
		if (result.internalError) throw result.internalError;
		return { token: result.token };
	});
	return _getToken.apply(this, arguments);
}
/**
* Requests a Firebase App Check token. This method should be used
* only if you need to authorize requests to a non-Firebase backend.
*
* Returns limited-use tokens that are intended for use with your
* non-Firebase backend endpoints that are protected with
* <a href="https://firebase.google.com/docs/app-check/custom-resource-backend#replay-protection">
* Replay Protection</a>. This method
* does not affect the token generation behavior of the
* #getAppCheckToken() method.
*
* @param appCheckInstance - The App Check service instance.
* @returns The limited use token.
* @public
*/
function getLimitedUseToken$2(appCheckInstance) {
	return getLimitedUseToken$1(appCheckInstance);
}
/**
* Wraps `addTokenListener`/`removeTokenListener` methods in an `Observer`
* pattern for public use.
*/
function onTokenChanged$1(appCheckInstance, onNextOrObserver, onError, onCompletion) {
	let nextFn = () => {};
	let errorFn = () => {};
	if (onNextOrObserver.next != null) nextFn = onNextOrObserver.next.bind(onNextOrObserver);
	else nextFn = onNextOrObserver;
	if (onNextOrObserver.error != null) errorFn = onNextOrObserver.error.bind(onNextOrObserver);
	else if (onError) errorFn = onError;
	addTokenListener(appCheckInstance, "EXTERNAL", nextFn, errorFn);
	return () => removeTokenListener(appCheckInstance.app, nextFn);
}
/**
* The Firebase App Check Web SDK.
*
* @remarks
* Firebase App Check does not work in a Node.js environment using `ReCaptchaV3Provider` or
* `ReCaptchaEnterpriseProvider`, but can be used in Node.js if you use
* `CustomProvider` and write your own attestation method.
*
* @packageDocumentation
*/
var APP_CHECK_NAME = "app-check";
var APP_CHECK_NAME_INTERNAL = "app-check-internal";
function registerAppCheck() {
	_registerComponent(new Component(APP_CHECK_NAME, (container) => {
		return factory(container.getProvider("app").getImmediate(), container.getProvider("heartbeat"));
	}, "PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((container, _identifier, _appcheckService) => {
		container.getProvider(APP_CHECK_NAME_INTERNAL).initialize();
	}));
	_registerComponent(new Component(APP_CHECK_NAME_INTERNAL, (container) => {
		return internalFactory(container.getProvider("app-check").getImmediate());
	}, "PUBLIC").setInstantiationMode("EXPLICIT"));
	registerVersion(name, version);
}
registerAppCheck();
//#endregion
//#region node_modules/@angular/fire/fesm2022/angular-fire-app-check.mjs
var _AppCheckModule;
var APP_CHECK_PROVIDER_NAME = "app-check";
var AppCheck = class {
	constructor(appCheck) {
		return appCheck;
	}
};
var AppCheckInstances = class {
	constructor() {
		return ɵgetAllInstancesOf(APP_CHECK_PROVIDER_NAME);
	}
};
var appCheckInstance$ = timer(0, 300).pipe(concatMap(() => from(ɵgetAllInstancesOf(APP_CHECK_PROVIDER_NAME))), distinct());
var PROVIDED_APP_CHECK_INSTANCES = new InjectionToken("angularfire2.app-check-instances");
function defaultAppCheckInstanceFactory(provided, defaultApp) {
	const defaultAppCheck = ɵgetDefaultInstanceOf(APP_CHECK_PROVIDER_NAME, provided, defaultApp);
	return defaultAppCheck && new AppCheck(defaultAppCheck);
}
var isLocalhost = typeof window !== "undefined" && [
	"localhost",
	"0.0.0.0",
	"127.0.0.1"
].includes(window.location.hostname);
function appCheckInstanceFactory(fn) {
	return (zone, injector, platformId) => {
		if (!isPlatformServer(platformId) && (isDevMode() || isLocalhost)) {
			var _globalThis, _globalThis$FIREBASE_;
			(_globalThis$FIREBASE_ = (_globalThis = globalThis).FIREBASE_APPCHECK_DEBUG_TOKEN) !== null && _globalThis$FIREBASE_ !== void 0 || (_globalThis.FIREBASE_APPCHECK_DEBUG_TOKEN = true);
		}
		return new AppCheck(zone.runOutsideAngular(() => fn(injector)));
	};
}
var APP_CHECK_INSTANCES_PROVIDER = {
	provide: AppCheckInstances,
	deps: [[new Optional(), PROVIDED_APP_CHECK_INSTANCES]]
};
var DEFAULT_APP_CHECK_INSTANCE_PROVIDER = {
	provide: AppCheck,
	useFactory: defaultAppCheckInstanceFactory,
	deps: [
		[new Optional(), PROVIDED_APP_CHECK_INSTANCES],
		FirebaseApp,
		PLATFORM_ID
	]
};
var AppCheckModule = class {
	constructor() {
		registerVersion("angularfire", VERSION.full, "app-check");
	}
};
_AppCheckModule = AppCheckModule;
_defineProperty(AppCheckModule, "ɵfac", function AppCheckModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _AppCheckModule)();
});
_defineProperty(AppCheckModule, "ɵmod", /* @__PURE__ */ ɵɵdefineNgModule({ type: _AppCheckModule }));
_defineProperty(AppCheckModule, "ɵinj", /* @__PURE__ */ ɵɵdefineInjector({ providers: [DEFAULT_APP_CHECK_INSTANCE_PROVIDER, APP_CHECK_INSTANCES_PROVIDER] }));
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppCheckModule, [{
		type: NgModule,
		args: [{ providers: [DEFAULT_APP_CHECK_INSTANCE_PROVIDER, APP_CHECK_INSTANCES_PROVIDER] }]
	}], () => [], null);
})();
function provideAppCheck(fn, ...deps) {
	registerVersion("angularfire", VERSION.full, "app-check");
	return makeEnvironmentProviders([
		DEFAULT_APP_CHECK_INSTANCE_PROVIDER,
		APP_CHECK_INSTANCES_PROVIDER,
		{
			provide: PROVIDED_APP_CHECK_INSTANCES,
			useFactory: appCheckInstanceFactory(fn),
			multi: true,
			deps: [
				NgZone,
				Injector,
				PLATFORM_ID,
				ɵAngularFireSchedulers,
				FirebaseApps,
				...deps
			]
		}
	]);
}
var getLimitedUseToken = ɵzoneWrap(getLimitedUseToken$2, true, 2);
var getToken = ɵzoneWrap(getToken$3, true);
var initializeAppCheck = ɵzoneWrap(initializeAppCheck$1, true);
var onTokenChanged = ɵzoneWrap(onTokenChanged$1, true);
var setTokenAutoRefreshEnabled = ɵzoneWrap(setTokenAutoRefreshEnabled$1, true);
//#endregion
export { getLimitedUseToken as a, onTokenChanged as c, CustomProvider as d, ReCaptchaEnterpriseProvider as f, appCheckInstance$ as i, provideAppCheck as l, AppCheckInstances as n, getToken as o, ReCaptchaV3Provider as p, AppCheckModule as r, initializeAppCheck as s, AppCheck as t, setTokenAutoRefreshEnabled as u };
