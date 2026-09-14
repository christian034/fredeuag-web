import { $n as Output, Al as ɵɵinject, Dl as ɵɵdefineInjector, El as ɵɵdefineInjectable, En as ElementRef, Fc as NgZone, Fn as Injectable, In as Input, Qn as Optional, Wi as setClassMetadata, bc as EventEmitter, la as ɵɵNgOnChangesFeature, no as ɵɵdefineDirective, oo as ɵɵdirectiveInject, qn as NgModule, ro as ɵɵdefineNgModule, wn as Directive } from "./core-Cmi87fr7.js";
import { Un as BehaviorSubject, yt as distinctUntilChanged } from "./zipWith-BIPy9JuQ.js";
import { U as registerables, q as defaults, u as Chart } from "./chart-BE2gdqdT.js";
import { t as merge } from "./merge-COLS5Zyg.js";
//#region node_modules/ng2-charts/fesm2022/ng2-charts.mjs
var _ThemeService;
var _BaseChartDirective;
var _NgChartsConfiguration;
var _NgChartsModule;
var ThemeService = class {
	constructor() {
		this.colorschemesOptions = new BehaviorSubject(void 0);
	}
	setColorschemesOptions(options) {
		this.pColorschemesOptions = options;
		this.colorschemesOptions.next(options);
	}
	getColorschemesOptions() {
		return this.pColorschemesOptions;
	}
};
_ThemeService = ThemeService;
_ThemeService.ɵfac = function ThemeService_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ThemeService)();
};
_ThemeService.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
	token: _ThemeService,
	factory: _ThemeService.ɵfac,
	providedIn: "root"
});
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeService, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], null, null);
})();
var BaseChartDirective = class {
	constructor(element, zone, themeService) {
		this.zone = zone;
		this.themeService = themeService;
		this.type = "bar";
		this.plugins = [];
		this.chartClick = new EventEmitter();
		this.chartHover = new EventEmitter();
		this.subs = [];
		this.themeOverrides = {};
		this.ctx = element.nativeElement.getContext("2d");
		this.subs.push(this.themeService.colorschemesOptions.pipe(distinctUntilChanged()).subscribe((r) => this.themeChanged(r)));
	}
	ngOnChanges(changes) {
		const requireRender = ["type"];
		const propertyNames = Object.getOwnPropertyNames(changes);
		if (propertyNames.some((key) => requireRender.includes(key)) || propertyNames.every((key) => changes[key].isFirstChange())) this.render();
		else {
			const config = this.getChartConfiguration();
			if (this.chart) {
				Object.assign(this.chart.config.data, config.data);
				if (this.chart.config.plugins) Object.assign(this.chart.config.plugins, config.plugins);
				if (this.chart.config.options) Object.assign(this.chart.config.options, config.options);
			}
			this.update();
		}
	}
	ngOnDestroy() {
		if (this.chart) {
			this.chart.destroy();
			this.chart = void 0;
		}
		this.subs.forEach((s) => s.unsubscribe());
	}
	render() {
		if (this.chart) this.chart.destroy();
		return this.zone.runOutsideAngular(() => this.chart = new Chart(this.ctx, this.getChartConfiguration()));
	}
	update(duration) {
		if (this.chart) this.zone.runOutsideAngular(() => {
			var _this$chart;
			return (_this$chart = this.chart) === null || _this$chart === void 0 ? void 0 : _this$chart.update(duration);
		});
	}
	hideDataset(index, hidden) {
		if (this.chart) {
			this.chart.getDatasetMeta(index).hidden = hidden;
			this.update();
		}
	}
	isDatasetHidden(index) {
		var _this$chart2;
		return (_this$chart2 = this.chart) === null || _this$chart2 === void 0 || (_this$chart2 = _this$chart2.getDatasetMeta(index)) === null || _this$chart2 === void 0 ? void 0 : _this$chart2.hidden;
	}
	toBase64Image() {
		var _this$chart3;
		return (_this$chart3 = this.chart) === null || _this$chart3 === void 0 ? void 0 : _this$chart3.toBase64Image();
	}
	themeChanged(options) {
		this.themeOverrides = options;
		if (this.chart) {
			if (this.chart.config.options) Object.assign(this.chart.config.options, this.getChartOptions());
			this.update();
		}
	}
	getChartOptions() {
		return merge({
			onHover: (event, active) => {
				var _this$chartHover$obse;
				if (!this.chartHover.observed && !((_this$chartHover$obse = this.chartHover.observers) === null || _this$chartHover$obse === void 0 ? void 0 : _this$chartHover$obse.length)) return;
				this.zone.run(() => this.chartHover.emit({
					event,
					active
				}));
			},
			onClick: (event, active) => {
				var _this$chartClick$obse;
				if (!this.chartClick.observed && !((_this$chartClick$obse = this.chartClick.observers) === null || _this$chartClick$obse === void 0 ? void 0 : _this$chartClick$obse.length)) return;
				this.zone.run(() => this.chartClick.emit({
					event,
					active
				}));
			}
		}, this.themeOverrides, this.options, { plugins: { legend: { display: this.legend } } });
	}
	getChartConfiguration() {
		return {
			type: this.type,
			data: this.getChartData(),
			options: this.getChartOptions(),
			plugins: this.plugins
		};
	}
	getChartData() {
		return this.data ? this.data : {
			labels: this.labels || [],
			datasets: this.datasets || []
		};
	}
};
_BaseChartDirective = BaseChartDirective;
_BaseChartDirective.ɵfac = function BaseChartDirective_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _BaseChartDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ThemeService));
};
_BaseChartDirective.ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
	type: _BaseChartDirective,
	selectors: [[
		"canvas",
		"baseChart",
		""
	]],
	inputs: {
		type: "type",
		legend: "legend",
		data: "data",
		options: "options",
		plugins: "plugins",
		labels: "labels",
		datasets: "datasets"
	},
	outputs: {
		chartClick: "chartClick",
		chartHover: "chartHover"
	},
	exportAs: ["base-chart"],
	standalone: false,
	features: [ɵɵNgOnChangesFeature]
});
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseChartDirective, [{
		type: Directive,
		args: [{
			selector: "canvas[baseChart]",
			exportAs: "base-chart"
		}]
	}], function() {
		return [
			{ type: ElementRef },
			{ type: NgZone },
			{ type: ThemeService }
		];
	}, {
		type: [{ type: Input }],
		legend: [{ type: Input }],
		data: [{ type: Input }],
		options: [{ type: Input }],
		plugins: [{ type: Input }],
		labels: [{ type: Input }],
		datasets: [{ type: Input }],
		chartClick: [{ type: Output }],
		chartHover: [{ type: Output }]
	});
})();
var baseColors = [
	[
		255,
		99,
		132
	],
	[
		54,
		162,
		235
	],
	[
		255,
		206,
		86
	],
	[
		231,
		233,
		237
	],
	[
		75,
		192,
		192
	],
	[
		151,
		187,
		205
	],
	[
		220,
		220,
		220
	],
	[
		247,
		70,
		74
	],
	[
		70,
		191,
		189
	],
	[
		253,
		180,
		92
	],
	[
		148,
		159,
		177
	],
	[
		77,
		83,
		96
	]
];
var builtInDefaults = {
	plugins: { colors: { enabled: false } },
	datasets: {
		line: {
			backgroundColor: (context) => rgba(generateColor(context.datasetIndex), .4),
			borderColor: (context) => rgba(generateColor(context.datasetIndex), 1),
			pointBackgroundColor: (context) => rgba(generateColor(context.datasetIndex), 1),
			pointBorderColor: "#fff"
		},
		bar: {
			backgroundColor: (context) => rgba(generateColor(context.datasetIndex), .6),
			borderColor: (context) => rgba(generateColor(context.datasetIndex), 1)
		},
		get radar() {
			return this.line;
		},
		doughnut: {
			backgroundColor: (context) => rgba(generateColor(context.dataIndex), .6),
			borderColor: "#fff"
		},
		get pie() {
			return this.doughnut;
		},
		polarArea: {
			backgroundColor: (context) => rgba(generateColor(context.dataIndex), .6),
			borderColor: (context) => rgba(generateColor(context.dataIndex), 1)
		},
		get bubble() {
			return this.doughnut;
		},
		get scatter() {
			return this.doughnut;
		},
		get area() {
			return this.polarArea;
		}
	}
};
function rgba(colour, alpha) {
	return "rgba(" + colour.concat(alpha).join(",") + ")";
}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomColor() {
	return [
		getRandomInt(0, 255),
		getRandomInt(0, 255),
		getRandomInt(0, 255)
	];
}
/**
* Generate colors
*/
function generateColor(index = 0) {
	return baseColors[index] || getRandomColor();
}
var NgChartsConfiguration = class {
	constructor() {
		this.generateColors = true;
	}
};
_NgChartsConfiguration = NgChartsConfiguration;
_NgChartsConfiguration.ɵfac = function NgChartsConfiguration_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _NgChartsConfiguration)();
};
_NgChartsConfiguration.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
	token: _NgChartsConfiguration,
	factory: _NgChartsConfiguration.ɵfac,
	providedIn: "root"
});
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgChartsConfiguration, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], null, null);
})();
Chart.register(...registerables);
var NgChartsModule = class NgChartsModule {
	constructor(config) {
		if (config === null || config === void 0 ? void 0 : config.plugins) Chart.register(...config.plugins);
		const ngChartsDefaults = merge((config === null || config === void 0 ? void 0 : config.generateColors) ? builtInDefaults : {}, (config === null || config === void 0 ? void 0 : config.defaults) || {});
		defaults.set(ngChartsDefaults);
	}
	static forRoot(config) {
		return {
			ngModule: NgChartsModule,
			providers: [{
				provide: NgChartsConfiguration,
				useValue: config
			}]
		};
	}
};
_NgChartsModule = NgChartsModule;
_NgChartsModule.ɵfac = function NgChartsModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _NgChartsModule)(ɵɵinject(NgChartsConfiguration, 8));
};
_NgChartsModule.ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({
	type: _NgChartsModule,
	declarations: [BaseChartDirective],
	exports: [BaseChartDirective]
});
_NgChartsModule.ɵinj = /* @__PURE__ */ ɵɵdefineInjector({});
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgChartsModule, [{
		type: NgModule,
		args: [{
			imports: [],
			declarations: [BaseChartDirective],
			exports: [BaseChartDirective]
		}]
	}], function() {
		return [{
			type: NgChartsConfiguration,
			decorators: [{ type: Optional }]
		}];
	}, null);
})();
//#endregion
export { BaseChartDirective, NgChartsConfiguration, NgChartsModule, ThemeService, baseColors };
