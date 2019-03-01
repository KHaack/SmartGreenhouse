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
	var pluginName = "Home";

	var _default = {};

	_default.settings = {
		
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

	var Home = function(element, options) {

		this.$element = $(element);
		this.elementId = element.id;
		this.styleId = this.elementId + "-style";

		this.init(options);

		return {
			options : this.options,
			init : $.proxy(this.init, this)
		};
	};

	/**
	 * Init.
	 */
	Home.prototype.init = function(options) {
		this.options = $.extend({}, _default.settings, options);
		var jum = $('<div class="jumbotron"></div>');
		var par = $('<p class="lead"></p>');
		
		jum.append(par);
		par.text('Lorem ipsum dolor sit amet, consetetur sadipscing'
				+ ' elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore'
				+ ' magna aliquyam erat, sed diam voluptua. At vero eos et accusam et'
				+ ' justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea'
				+ ' takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor'
				+ ' sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor'
				+ ' invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
				+ ' At vero eos et accusam et justo duo dolores et ea rebum. Stet clita'
				+ ' kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit'
				+ ' amet.');
		
		this.$element.append(jum);
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
				$.data(this, pluginName, new Home(this, $.extend(true, {},
						options)));
			}
		});

		return result || this;
	};

})(jQuery, window, document));