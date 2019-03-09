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
	var pluginName = "Sensor";

	/**
	 * Options
	 */
	var _default = {};

	_default.settings = {
		idPrefix : 'sensor-canvas-'
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

	var Sensor = function(element, options) {

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
	Sensor.prototype.init = function(options) {
		this.options = $.extend({}, _default.settings, options);

		this.loadSensorData();
	};

	Sensor.prototype.loadSensorData = function() {
		var data = {
			sensorId : this.options.sensor.id,
			limit : 100,
			sampleAverage : "minute"
		};
		
		var self = this;
		$.ajax({
			url : './getSamples',
			type : 'GET',
			contentType : 'application/json',
			data : data
		}).done(function(result) {
			if (result) {
				self.onNewData(result);
			}
		});
	};

	Sensor.prototype.onNewData = function(data) {
		var sensor = this.options.sensor;

		var h = $('<h2></h2>');
		h.text(sensor.name);
		this.$element.append(h);

		var details = $('<dl class="row"></dl>');
		this.$element.append(details);

		var labelLocation = $('<dt class="col-sm-3">Location</dt>');
		details.append(labelLocation);

		var valueLocation = $('<dd class="col-sm-9"></dd>');
		valueLocation.text(sensor.location);
		details.append(valueLocation);

		var labelUnit = $('<dt class="col-sm-3">Unit</dt>');
		details.append(labelUnit);

		var valueUnit = $('<dd class="col-sm-9"></dd>');
		valueUnit.text(sensor.unit);
		details.append(valueUnit);

		var labelSamplingRate = $('<dt class="col-sm-3">Sampling Rate</dt>');
		details.append(labelSamplingRate);

		var valueSamplingRate = $('<dd class="col-sm-9"></dd>');
		valueSamplingRate.text(sensor.samplingRate + ' seconds');
		details.append(valueSamplingRate);

		var label = sensor.name + ' (in ' + sensor.unit + ')';

		/*
		 * data
		 */
		var times = [];
		var values = [];

		// save last date to display only date if the day changed
		var lastDate;
		for ( var d in data) {
			var datetime = new Date(Date.parse(data[d].datetime));

			var hours = datetime.getHours();
			var minutes = datetime.getMinutes();
			var timeString = (minutes < 10) ? hours + ':0' + minutes : hours
					+ ':' + minutes;

			var currentDate = datetime.toDateString();
			if (lastDate != currentDate) {
				lastDate = currentDate;
				times.push(currentDate + ' ' + timeString);
			} else {
				times.push(timeString);
			}

			values.push(data[d].value);
		}
		;

		var data = {
			labels : times,
			datasets : [ {
				label : label,
				data : values
			} ]
		};

		/*
		 * options
		 */
		var options = {
			scales : {
				yAxes : [ {
					scaleLabel : {
						display : true,
						labelString : sensor.unit
					}
				} ]
			}
		};

		/*
		 * create chart
		 */
		var canvas = document.createElement('canvas');
		canvas.id = this.options.idPrefix + this.options.sensor.id;

		this.$element.append(canvas);
		var context = canvas.getContext('2d');
		var chart = new Chart(context, {
			type : 'line',
			data : data,
			options : options
		});
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
				$.data(this, pluginName, new Sensor(this, $.extend(true, {},
						options)));
			}
		});

		return result || this;
	};

})(jQuery, window, document));