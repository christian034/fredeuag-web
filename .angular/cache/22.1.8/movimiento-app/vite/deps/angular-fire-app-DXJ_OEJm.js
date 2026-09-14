import { n as _defineProperty } from "./objectSpread2-C_IE-bIJ.js";
import { $ as isDevMode, Al as ɵɵinject, Bc as PendingTasks, Dc as Injector, Dl as ɵɵdefineInjector, Ec as InjectionToken, El as ɵɵdefineInjectable, Fc as NgZone, Fn as Injectable, Kc as VERSION$1, Lc as PLATFORM_ID, Pn as Inject, Qn as Optional, Wi as setClassMetadata, Zc as assertInInjectionContext, pl as makeEnvironmentProviders, qc as Version, qn as NgModule, ro as ɵɵdefineNgModule, sl as inject, vc as EnvironmentInjector, yl as runInInjectionContext } from "./core-Cmi87fr7.js";
import { Cn as from, Dn as observeOn, En as subscribeOn, Ft as concatMap, Ln as asyncScheduler, Yn as Observable, bt as distinct, rn as timer } from "./zipWith-BIPy9JuQ.js";
import { T as queueScheduler } from "./esm5-CHmRCD0e.js";
import { _ as initializeApp$1, b as registerVersion$1, g as getApps$1, h as getApp$1, m as deleteApp$1, v as initializeServerApp$1, x as setLogLevel$1, y as onLog$1 } from "./index.esm2017-DghwDOiZ.js";
import "./firebase_app.js";
//#region node_modules/@angular/core/fesm2022/rxjs-interop.mjs
/**
* @license Angular v22.1.6
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
function pendingUntilEvent(injector) {
	if (injector === void 0) {
		ngDevMode && assertInInjectionContext(pendingUntilEvent);
		injector = inject(Injector);
	}
	const taskService = injector.get(PendingTasks);
	return (sourceObservable) => {
		return new Observable((originalSubscriber) => {
			const removeTask = taskService.add();
			let cleanedUp = false;
			function cleanupTask() {
				if (cleanedUp) return;
				removeTask();
				cleanedUp = true;
			}
			const innerSubscription = sourceObservable.subscribe({
				next: (v) => {
					originalSubscriber.next(v);
					cleanupTask();
				},
				complete: () => {
					originalSubscriber.complete();
					cleanupTask();
				},
				error: (e) => {
					originalSubscriber.error(e);
					cleanupTask();
				}
			});
			innerSubscription.add(() => {
				originalSubscriber.unsubscribe();
				cleanupTask();
			});
			return innerSubscription;
		});
	};
}
//#endregion
//#region node_modules/@angular/fire/fesm2022/angular-fire.mjs
var _ɵAngularFireSchedulers;
var VERSION = new Version("ANGULARFIRE2_VERSION");
function ɵgetDefaultInstanceOf(identifier, provided, defaultApp) {
	if (provided) {
		if (provided.length === 1) return provided[0];
		const providedUsingDefaultApp = provided.filter((it) => it.app === defaultApp);
		if (providedUsingDefaultApp.length === 1) return providedUsingDefaultApp[0];
	}
	return defaultApp.container.getProvider(identifier).getImmediate({ optional: true });
}
var ɵgetAllInstancesOf = (identifier, app) => {
	const apps = app ? [app] : getApps$1();
	const instances = [];
	apps.forEach((app) => {
		app.container.getProvider(identifier).instances.forEach((instance) => {
			if (!instances.includes(instance)) instances.push(instance);
		});
	});
	return instances;
};
var LogLevel;
(function(LogLevel) {
	LogLevel[LogLevel["SILENT"] = 0] = "SILENT";
	LogLevel[LogLevel["WARN"] = 1] = "WARN";
	LogLevel[LogLevel["VERBOSE"] = 2] = "VERBOSE";
})(LogLevel || (LogLevel = {}));
var currentLogLevel = isDevMode() && typeof Zone !== "undefined" ? LogLevel.WARN : LogLevel.SILENT;
/**
* Schedules tasks so that they are invoked inside the Zone that is passed in the constructor.
*/
var ɵZoneScheduler = class {
	constructor(zone, delegate = queueScheduler) {
		_defineProperty(this, "zone", void 0);
		_defineProperty(this, "delegate", void 0);
		this.zone = zone;
		this.delegate = delegate;
	}
	now() {
		return this.delegate.now();
	}
	schedule(work, delay, state) {
		const targetZone = this.zone;
		const workInZone = function(state) {
			if (targetZone) targetZone.runGuarded(() => {
				work.apply(this, [state]);
			});
			else work.apply(this, [state]);
		};
		return this.delegate.schedule(workInZone, delay, state);
	}
};
var ɵAngularFireSchedulers = class {
	constructor() {
		_defineProperty(this, "outsideAngular", void 0);
		_defineProperty(this, "insideAngular", void 0);
		const ngZone = inject(NgZone);
		this.outsideAngular = ngZone.runOutsideAngular(() => new ɵZoneScheduler(typeof Zone === "undefined" ? void 0 : Zone.current));
		this.insideAngular = ngZone.run(() => new ɵZoneScheduler(typeof Zone === "undefined" ? void 0 : Zone.current, asyncScheduler));
	}
};
_ɵAngularFireSchedulers = ɵAngularFireSchedulers;
_defineProperty(ɵAngularFireSchedulers, "ɵfac", function ɵAngularFireSchedulers_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ɵAngularFireSchedulers)();
});
_defineProperty(ɵAngularFireSchedulers, "ɵprov", /* @__PURE__ */ ɵɵdefineInjectable({
	token: _ɵAngularFireSchedulers,
	factory: _ɵAngularFireSchedulers.ɵfac,
	providedIn: "root"
}));
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ɵAngularFireSchedulers, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], () => [], null);
})();
var alreadyWarned = false;
function warnOutsideInjectionContext(original, logLevel) {
	if (!alreadyWarned && (currentLogLevel > LogLevel.SILENT || isDevMode())) {
		alreadyWarned = true;
		console.warn("Calling Firebase APIs outside of an Injection context may destabilize your application leading to subtle change-detection and hydration bugs. Find more at https://github.com/angular/angularfire/blob/main/docs/zones.md");
	}
	if (currentLogLevel >= logLevel) console.warn(`Firebase API called outside injection context: ${original.name}`);
}
function runOutsideAngular(fn) {
	const ngZone = inject(NgZone, { optional: true });
	if (!ngZone) return fn();
	return ngZone.runOutsideAngular(() => fn());
}
function run(fn) {
	const ngZone = inject(NgZone, { optional: true });
	if (!ngZone) return fn();
	return ngZone.run(() => fn());
}
var zoneWrapFn = (it, taskDone, injector) => {
	return (...args) => {
		if (taskDone) setTimeout(taskDone, 0);
		return runInInjectionContext(injector, () => run(() => it.apply(void 0, args)));
	};
};
var ɵzoneWrap = (it, blockUntilFirst, logLevel) => {
	logLevel || (logLevel = blockUntilFirst ? LogLevel.WARN : LogLevel.VERBOSE);
	return function() {
		let taskDone;
		const _arguments = arguments;
		let schedulers;
		let pendingTasks;
		let injector;
		try {
			schedulers = inject(ɵAngularFireSchedulers);
			pendingTasks = inject(PendingTasks);
			injector = inject(EnvironmentInjector);
		} catch (e) {
			warnOutsideInjectionContext(it, logLevel);
			return it.apply(this, _arguments);
		}
		for (let i = 0; i < arguments.length; i++) if (typeof _arguments[i] === "function") {
			if (blockUntilFirst) taskDone || (taskDone = run(() => pendingTasks.add()));
			_arguments[i] = zoneWrapFn(_arguments[i], taskDone, injector);
		}
		const ret = runOutsideAngular(() => it.apply(this, _arguments));
		if (!blockUntilFirst) if (ret instanceof Observable) return ret.pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular));
		else return run(() => ret);
		if (ret instanceof Observable) return ret.pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular), pendingUntilEvent(injector));
		else if (ret instanceof Promise) return run(() => {
			const removeTask = pendingTasks.add();
			return new Promise((resolve, reject) => {
				ret.then((it) => runInInjectionContext(injector, () => run(() => resolve(it))), (reason) => runInInjectionContext(injector, () => run(() => reject(reason)))).finally(removeTask);
			});
		});
		else if (typeof ret === "function" && taskDone) return function() {
			setTimeout(taskDone, 0);
			return ret.apply(this, arguments);
		};
		else return run(() => ret);
	};
};
//#endregion
//#region node_modules/@angular/fire/fesm2022/angular-fire-app.mjs
var _FirebaseAppModule;
var FirebaseApp = class {
	constructor(app) {
		return app;
	}
};
var FirebaseApps = class {
	constructor() {
		return getApps$1();
	}
};
var firebaseApp$ = timer(0, 300).pipe(concatMap(() => from(getApps$1())), distinct());
function defaultFirebaseAppFactory(provided) {
	if (provided && provided.length === 1) return provided[0];
	return new FirebaseApp(getApp$1());
}
var PROVIDED_FIREBASE_APPS = new InjectionToken("angularfire2._apps");
var DEFAULT_FIREBASE_APP_PROVIDER = {
	provide: FirebaseApp,
	useFactory: defaultFirebaseAppFactory,
	deps: [[new Optional(), PROVIDED_FIREBASE_APPS]]
};
var FIREBASE_APPS_PROVIDER = {
	provide: FirebaseApps,
	deps: [[new Optional(), PROVIDED_FIREBASE_APPS]]
};
function firebaseAppFactory(fn) {
	return (zone, injector) => {
		const platformId = injector.get(PLATFORM_ID);
		registerVersion$1("angularfire", VERSION.full, "core");
		registerVersion$1("angularfire", VERSION.full, "app");
		registerVersion$1("angular", VERSION$1.full, platformId.toString());
		return new FirebaseApp(zone.runOutsideAngular(() => fn(injector)));
	};
}
var FirebaseAppModule = class {
	constructor(platformId) {
		registerVersion$1("angularfire", VERSION.full, "core");
		registerVersion$1("angularfire", VERSION.full, "app");
		registerVersion$1("angular", VERSION$1.full, platformId.toString());
	}
};
_FirebaseAppModule = FirebaseAppModule;
_defineProperty(FirebaseAppModule, "ɵfac", function FirebaseAppModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _FirebaseAppModule)(ɵɵinject(PLATFORM_ID));
});
_defineProperty(FirebaseAppModule, "ɵmod", /* @__PURE__ */ ɵɵdefineNgModule({ type: _FirebaseAppModule }));
_defineProperty(FirebaseAppModule, "ɵinj", /* @__PURE__ */ ɵɵdefineInjector({ providers: [DEFAULT_FIREBASE_APP_PROVIDER, FIREBASE_APPS_PROVIDER] }));
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FirebaseAppModule, [{
		type: NgModule,
		args: [{ providers: [DEFAULT_FIREBASE_APP_PROVIDER, FIREBASE_APPS_PROVIDER] }]
	}], () => [{
		type: Object,
		decorators: [{
			type: Inject,
			args: [PLATFORM_ID]
		}]
	}], null);
})();
function provideFirebaseApp(fn, ...deps) {
	return makeEnvironmentProviders([
		DEFAULT_FIREBASE_APP_PROVIDER,
		FIREBASE_APPS_PROVIDER,
		{
			provide: PROVIDED_FIREBASE_APPS,
			useFactory: firebaseAppFactory(fn),
			multi: true,
			deps: [
				NgZone,
				Injector,
				ɵAngularFireSchedulers,
				...deps
			]
		}
	]);
}
var deleteApp = ɵzoneWrap(deleteApp$1, true);
var getApp = ɵzoneWrap(getApp$1, true);
var getApps = ɵzoneWrap(getApps$1, true);
var initializeApp = ɵzoneWrap(initializeApp$1, true);
var initializeServerApp = ɵzoneWrap(initializeServerApp$1, true);
var onLog = ɵzoneWrap(onLog$1, true);
var registerVersion = ɵzoneWrap(registerVersion$1, true);
var setLogLevel = ɵzoneWrap(setLogLevel$1, true);
//#endregion
export { ɵgetDefaultInstanceOf as _, firebaseApp$ as a, initializeApp as c, provideFirebaseApp as d, registerVersion as f, ɵgetAllInstancesOf as g, ɵAngularFireSchedulers as h, deleteApp as i, initializeServerApp as l, VERSION as m, FirebaseAppModule as n, getApp as o, setLogLevel as p, FirebaseApps as r, getApps as s, FirebaseApp as t, onLog as u, ɵzoneWrap as v };
