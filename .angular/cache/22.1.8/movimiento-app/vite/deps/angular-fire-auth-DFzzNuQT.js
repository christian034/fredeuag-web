import { n as _defineProperty } from "./objectSpread2-C_IE-bIJ.js";
import { Dc as Injector, Dl as ɵɵdefineInjector, Ec as InjectionToken, Fc as NgZone, Qn as Optional, Wi as setClassMetadata, pl as makeEnvironmentProviders, qn as NgModule, ro as ɵɵdefineNgModule } from "./core-Cmi87fr7.js";
import { Cn as from, Ft as concatMap, Sn as of, Yn as Observable, bt as distinct, rn as timer, x as switchMap } from "./zipWith-BIPy9JuQ.js";
import { b as registerVersion } from "./index.esm2017-DghwDOiZ.js";
import "./firebase_app.js";
import { _ as ɵgetDefaultInstanceOf, g as ɵgetAllInstancesOf, h as ɵAngularFireSchedulers, m as VERSION, r as FirebaseApps, t as FirebaseApp, v as ɵzoneWrap } from "./angular-fire-app-DXJ_OEJm.js";
import { n as AppCheckInstances } from "./angular-fire-app-check-CTr64DsK.js";
import { $ as onAuthStateChanged$1, A as checkActionCode$1, At as verifyBeforeUpdateEmail$1, B as getIdTokenResult$1, Ct as updateCurrentUser$1, Dt as updateProfile$1, Et as updatePhoneNumber$1, F as deleteUser$1, G as initializeAuth$1, H as getRedirectResult$1, I as fetchSignInMethodsForEmail$1, J as linkWithCredential$1, K as initializeRecaptchaConfig$1, L as getAdditionalUserInfo$1, M as connectAuthEmulator$1, N as createUserWithEmailAndPassword$1, Ot as useDeviceLanguage$1, R as getAuth$1, St as unlink$1, T as beforeAuthStateChanged$1, Tt as updatePassword$1, V as getMultiFactorResolver$1, X as linkWithPopup$1, Y as linkWithPhoneNumber$1, Z as linkWithRedirect$1, _t as signInWithEmailLink$1, at as reauthenticateWithPopup$1, bt as signInWithRedirect$1, ct as revokeAccessToken$1, dt as sendSignInLinkToEmail$1, et as onIdTokenChanged$1, ft as setPersistence$1, gt as signInWithEmailAndPassword$1, ht as signInWithCustomToken$1, it as reauthenticateWithPhoneNumber$1, j as confirmPasswordReset$1, jt as verifyPasswordResetCode$1, kt as validatePassword$1, lt as sendEmailVerification$1, mt as signInWithCredential$1, ot as reauthenticateWithRedirect$1, pt as signInAnonymously$1, q as isSignInWithEmailLink$1, rt as reauthenticateWithCredential$1, st as reload$1, tt as parseActionCodeURL$1, ut as sendPasswordResetEmail$1, vt as signInWithPhoneNumber$1, w as applyActionCode$1, wt as updateEmail$1, xt as signOut$1, yt as signInWithPopup$1, z as getIdToken$1 } from "./index.esm-BvLMCDoa.js";
//#region node_modules/rxfire/auth/index.esm.js
/**
* @license
* Copyright 2018 Google LLC
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
* Create an observable of authentication state. The observer is only
* triggered on sign-in or sign-out.
* @param auth firebase.auth.Auth
*/
function authState$1(auth) {
	return new Observable(function(subscriber) {
		return { unsubscribe: onAuthStateChanged$1(auth, subscriber.next.bind(subscriber), subscriber.error.bind(subscriber), subscriber.complete.bind(subscriber)) };
	});
}
/**
* Create an observable of user state. The observer is triggered for sign-in,
* sign-out, and token refresh events
* @param auth firebase.auth.Auth
*/
function user$1(auth) {
	return new Observable(function(subscriber) {
		return { unsubscribe: onIdTokenChanged$1(auth, subscriber.next.bind(subscriber), subscriber.error.bind(subscriber), subscriber.complete.bind(subscriber)) };
	});
}
/**
* Create an observable of idToken state. The observer is triggered for sign-in,
* sign-out, and token refresh events
* @param auth firebase.auth.Auth
*/
function idToken$1(auth) {
	return user$1(auth).pipe(switchMap(function(user) {
		return user ? from(getIdToken$1(user)) : of(null);
	}));
}
//#endregion
//#region node_modules/@angular/fire/fesm2022/angular-fire-auth.mjs
var _AuthModule;
var AUTH_PROVIDER_NAME = "auth";
var Auth = class {
	constructor(auth) {
		return auth;
	}
};
var AuthInstances = class {
	constructor() {
		return ɵgetAllInstancesOf(AUTH_PROVIDER_NAME);
	}
};
var authInstance$ = timer(0, 300).pipe(concatMap(() => from(ɵgetAllInstancesOf(AUTH_PROVIDER_NAME))), distinct());
var PROVIDED_AUTH_INSTANCES = new InjectionToken("angularfire2.auth-instances");
function defaultAuthInstanceFactory(provided, defaultApp) {
	const defaultAuth = ɵgetDefaultInstanceOf(AUTH_PROVIDER_NAME, provided, defaultApp);
	return defaultAuth && new Auth(defaultAuth);
}
function authInstanceFactory(fn) {
	return (zone, injector) => {
		return new Auth(zone.runOutsideAngular(() => fn(injector)));
	};
}
var AUTH_INSTANCES_PROVIDER = {
	provide: AuthInstances,
	deps: [[new Optional(), PROVIDED_AUTH_INSTANCES]]
};
var DEFAULT_AUTH_INSTANCE_PROVIDER = {
	provide: Auth,
	useFactory: defaultAuthInstanceFactory,
	deps: [[new Optional(), PROVIDED_AUTH_INSTANCES], FirebaseApp]
};
var AuthModule = class {
	constructor() {
		registerVersion("angularfire", VERSION.full, "auth");
	}
};
_AuthModule = AuthModule;
_defineProperty(AuthModule, "ɵfac", function AuthModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _AuthModule)();
});
_defineProperty(AuthModule, "ɵmod", /* @__PURE__ */ ɵɵdefineNgModule({ type: _AuthModule }));
_defineProperty(AuthModule, "ɵinj", /* @__PURE__ */ ɵɵdefineInjector({ providers: [DEFAULT_AUTH_INSTANCE_PROVIDER, AUTH_INSTANCES_PROVIDER] }));
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthModule, [{
		type: NgModule,
		args: [{ providers: [DEFAULT_AUTH_INSTANCE_PROVIDER, AUTH_INSTANCES_PROVIDER] }]
	}], () => [], null);
})();
function provideAuth(fn, ...deps) {
	registerVersion("angularfire", VERSION.full, "auth");
	return makeEnvironmentProviders([
		DEFAULT_AUTH_INSTANCE_PROVIDER,
		AUTH_INSTANCES_PROVIDER,
		{
			provide: PROVIDED_AUTH_INSTANCES,
			useFactory: authInstanceFactory(fn),
			multi: true,
			deps: [
				NgZone,
				Injector,
				ɵAngularFireSchedulers,
				FirebaseApps,
				[new Optional(), AppCheckInstances],
				...deps
			]
		}
	]);
}
var authState = ɵzoneWrap(authState$1, true);
var idToken = ɵzoneWrap(idToken$1, true);
var user = ɵzoneWrap(user$1, true);
var applyActionCode = ɵzoneWrap(applyActionCode$1, true);
var beforeAuthStateChanged = ɵzoneWrap(beforeAuthStateChanged$1, true);
var checkActionCode = ɵzoneWrap(checkActionCode$1, true);
var confirmPasswordReset = ɵzoneWrap(confirmPasswordReset$1, true, 2);
var connectAuthEmulator = ɵzoneWrap(connectAuthEmulator$1, true);
var createUserWithEmailAndPassword = ɵzoneWrap(createUserWithEmailAndPassword$1, true, 2);
var deleteUser = ɵzoneWrap(deleteUser$1, true, 2);
var fetchSignInMethodsForEmail = ɵzoneWrap(fetchSignInMethodsForEmail$1, true, 2);
var getAdditionalUserInfo = ɵzoneWrap(getAdditionalUserInfo$1, true, 2);
var getAuth = ɵzoneWrap(getAuth$1, true);
var getIdToken = ɵzoneWrap(getIdToken$1, true);
var getIdTokenResult = ɵzoneWrap(getIdTokenResult$1, true);
var getMultiFactorResolver = ɵzoneWrap(getMultiFactorResolver$1, true);
var getRedirectResult = ɵzoneWrap(getRedirectResult$1, true);
var initializeAuth = ɵzoneWrap(initializeAuth$1, true);
var initializeRecaptchaConfig = ɵzoneWrap(initializeRecaptchaConfig$1, true);
var isSignInWithEmailLink = ɵzoneWrap(isSignInWithEmailLink$1, true);
var linkWithCredential = ɵzoneWrap(linkWithCredential$1, true, 2);
var linkWithPhoneNumber = ɵzoneWrap(linkWithPhoneNumber$1, true, 2);
var linkWithPopup = ɵzoneWrap(linkWithPopup$1, true, 2);
var linkWithRedirect = ɵzoneWrap(linkWithRedirect$1, true, 2);
var onAuthStateChanged = ɵzoneWrap(onAuthStateChanged$1, true);
var onIdTokenChanged = ɵzoneWrap(onIdTokenChanged$1, true);
var parseActionCodeURL = ɵzoneWrap(parseActionCodeURL$1, true);
var reauthenticateWithCredential = ɵzoneWrap(reauthenticateWithCredential$1, true, 2);
var reauthenticateWithPhoneNumber = ɵzoneWrap(reauthenticateWithPhoneNumber$1, true, 2);
var reauthenticateWithPopup = ɵzoneWrap(reauthenticateWithPopup$1, true, 2);
var reauthenticateWithRedirect = ɵzoneWrap(reauthenticateWithRedirect$1, true, 2);
var reload = ɵzoneWrap(reload$1, true, 2);
var revokeAccessToken = ɵzoneWrap(revokeAccessToken$1, true, 2);
var sendEmailVerification = ɵzoneWrap(sendEmailVerification$1, true, 2);
var sendPasswordResetEmail = ɵzoneWrap(sendPasswordResetEmail$1, true, 2);
var sendSignInLinkToEmail = ɵzoneWrap(sendSignInLinkToEmail$1, true, 2);
var setPersistence = ɵzoneWrap(setPersistence$1, true);
var signInAnonymously = ɵzoneWrap(signInAnonymously$1, true, 2);
var signInWithCredential = ɵzoneWrap(signInWithCredential$1, true, 2);
var signInWithCustomToken = ɵzoneWrap(signInWithCustomToken$1, true, 2);
var signInWithEmailAndPassword = ɵzoneWrap(signInWithEmailAndPassword$1, true, 2);
var signInWithEmailLink = ɵzoneWrap(signInWithEmailLink$1, true, 2);
var signInWithPhoneNumber = ɵzoneWrap(signInWithPhoneNumber$1, true, 2);
var signInWithPopup = ɵzoneWrap(signInWithPopup$1, true, 2);
var signInWithRedirect = ɵzoneWrap(signInWithRedirect$1, true, 2);
var signOut = ɵzoneWrap(signOut$1, true, 2);
var unlink = ɵzoneWrap(unlink$1, true, 2);
var updateCurrentUser = ɵzoneWrap(updateCurrentUser$1, true, 2);
var updateEmail = ɵzoneWrap(updateEmail$1, true, 2);
var updatePassword = ɵzoneWrap(updatePassword$1, true, 2);
var updatePhoneNumber = ɵzoneWrap(updatePhoneNumber$1, true, 2);
var updateProfile = ɵzoneWrap(updateProfile$1, true, 2);
var useDeviceLanguage = ɵzoneWrap(useDeviceLanguage$1, true, 2);
var validatePassword = ɵzoneWrap(validatePassword$1, true, 2);
var verifyBeforeUpdateEmail = ɵzoneWrap(verifyBeforeUpdateEmail$1, true, 2);
var verifyPasswordResetCode = ɵzoneWrap(verifyPasswordResetCode$1, true, 2);
//#endregion
export { updateEmail as $, parseActionCodeURL as A, sendSignInLinkToEmail as B, isSignInWithEmailLink as C, linkWithRedirect as D, linkWithPopup as E, reauthenticateWithRedirect as F, signInWithEmailAndPassword as G, signInAnonymously as H, reload as I, signInWithPopup as J, signInWithEmailLink as K, revokeAccessToken as L, reauthenticateWithCredential as M, reauthenticateWithPhoneNumber as N, onAuthStateChanged as O, reauthenticateWithPopup as P, updateCurrentUser as Q, sendEmailVerification as R, initializeRecaptchaConfig as S, linkWithPhoneNumber as T, signInWithCredential as U, setPersistence as V, signInWithCustomToken as W, signOut as X, signInWithRedirect as Y, unlink as Z, getIdTokenResult as _, authInstance$ as a, validatePassword as at, idToken as b, checkActionCode as c, createUserWithEmailAndPassword as d, updatePassword as et, deleteUser as f, getIdToken as g, getAuth as h, applyActionCode as i, user as it, provideAuth as j, onIdTokenChanged as k, confirmPasswordReset as l, getAdditionalUserInfo as m, AuthInstances as n, updateProfile as nt, authState as o, verifyBeforeUpdateEmail as ot, fetchSignInMethodsForEmail as p, signInWithPhoneNumber as q, AuthModule as r, useDeviceLanguage as rt, beforeAuthStateChanged as s, verifyPasswordResetCode as st, Auth as t, updatePhoneNumber as tt, connectAuthEmulator as u, getMultiFactorResolver as v, linkWithCredential as w, initializeAuth as x, getRedirectResult as y, sendPasswordResetEmail as z };
