/**
 * JQuery plugin for the SinglePageManager.
 * 
 * @author Kevin Haack
 */
;
((function($, window, document) {

	/* global jQuery, console */

	"use strict";

	/**
	 * The plugin name.
	 */
	var pluginName = "SinglePageManager";

	/**
	 * pages
	 */
	var pages = {};

	var _default = {};

	_default.settings = {
		startPage : 'home'
	};

	_default.options = {};

	/**
	 * logging function
	 */
	var logError = function(message) {
		if (window.console) {
			window.console.error(pluginName + ": " + message);
		}
	};

	var SinglePageManager = function(element, options) {

		this.$element = $(element);
		this.elementId = element.id;
		this.styleId = this.elementId + "-style";

		this.init(options);

		return {
			options : this.options,
			init : $.proxy(this.init, this),
			onLoadPage : $.proxy(this.onLoadPage, this)
		};
	};

	/**
	 * Init.
	 */
	SinglePageManager.prototype.init = function(options) {
		this.options = $.extend({}, _default.settings, options);

		this.initPages();
		this.onLoadPage(this.options.startPage);
	};

	SinglePageManager.prototype.initPages = function() {
		var home = $('<div></div>');
		home.Home({});
		pages['home'] = home;

		var sensors = $('<div></div>');
		sensors.Sensors({});
		pages['sensors'] = sensors;
	};

	SinglePageManager.prototype.onLoadPage = function(page) {
		var page = pages[page];
		this.$element.empty();
		this.$element.append(page);
	};

	/**
	 * Add plugin.
	 */
	$.fn[pluginName] = function(options, args) {
		// Prevent against multiple instantiations,
		// handle updates and method calls
		var result;

		this.each(function() {
			var _this = $.data(this, pluginName);

			if (typeof options === "string") {
				if (!_this) {
					logError("Not initialized, can not call method : "
							+ options);
				} else if (!$.isFunction(_this[options])
						|| options.charAt(0) === "_") {
					logError("No such method : " + options);
				} else {
					if (!(args instanceof Array)) {
						args = [ args ];
					}
					result = _this[options].apply(_this, args);
				}
			} else if (typeof options === "boolean") {
				result = _this;
			} else {
				$.data(this, pluginName, new SinglePageManager(this, $.extend(
						true, {}, options)));
			}
		});

		return result || this;
	};

})(jQuery, window, document));