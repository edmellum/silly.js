// Silly.js
// (c) 2012 David Ed Mellum
// Browserijade may be freely distributed under the MIT license.

(function() {
	var root = this;

	var find = function(el) {
		var selector = null;
		if('string' === typeof el) {
			selector = el;
			el = document.querySelectorAll(el);
		} else {
			el = [el];
		}

		var sillyEls = {
		}

		for(var prop in $.fn) {
			sillyEls[prop] = $.fn[prop];
		}

		var i = 0;
		forEach.call(el, function(el) {
			sillyEls[i] = el;
			i++;
		});

		sillyEls.length = el.length;

		return sillyEls;
	}

	var $;

	if('undefined' !== typeof exports) {
		$ = module.exports = find;
	} else {
		$ = root.silly = {};
	}

	var forEach = Array.prototype.forEach;

	$.fn = {};

	$.fn.find = find;

	$.fn.each = function(iterator) {
		var els = this;
		for(var i=0; i < els.length; i++) {
			iterator(els[i]);
		}
	}

	$.fn.bind = function(eventName, callback) {
		var sillyEls = this;
		sillyEls.each(function(el) {
			el.addEventListener(eventName, callback, false);
		});
	}

	var ajax = $.ajax = function(url, options, callback) {
		var method = options.method.toUpperCase();

		var req = new XMLHttpRequest();
		req.onload = function(event) {
			ajaxHandler(event, callback)
		}
		req.open(method, url, true);

		if(options.payload) {
			if('object' === typeof options.payload) {
				req.setRequestHeader('Content-Type', 'application/json');
				var payload = JSON.stringify(options.payload);
			} else {
				var payload = options.payload;
			}
		}

		req.send(payload);
	}

	var get = $.get = function(url, callback) {
		$.ajax(url, {method: 'get'}, callback);
	}

	var post = $.post = function(url, payload, callback) {
		$.ajax(url, {method: 'post', payload: payload}, callback);
	}

	var ajaxHandler = function(event, callback) {
		var data = event.target.responseText;
		try {
			data = JSON.parse(data);
		} catch(e) {
			console.log(e)
		}
		callback(data);
	}

	$.fn.css = function(prop) {
		var el = this;
		var style = getComputedStyle(el, null);
		if(prop) {
			return style[prop];
		}
		return style
	}

	$.fn.show = function() {
		var el = this;
		el.style.display = 'block';
	}

	$.fn.hide = function() {
		var el = this;
		el.style.display = 'none';
	}

	$.fn.toggle = function() {
		var el = this;
		if('none' === el.css('display')) {
			el.show();
		} else {
			el.hide();
		}
	}

	$.fn.submit = function() {
		var el = this;
		el.find('input');
		input.forEach()
	}

}).call(this);