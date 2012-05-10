// Silly.js
// (c) 2012 David Ed Mellum
// Browserijade may be freely distributed under the MIT license.

// Keep all our nasty local variables to ourselves.
(function() {

	// Extend an object with a mixin object in a
	// horrible naive way, yes I know this is bad.
	var extend = function(target, mixin) {
		for(var prop in mixin) {
			target[prop] = mixin[prop];
		}
	}

	// Base exported function.
	// Finds elements using a CSS selector and returns
	// a Silly object with all elements in it.
	var find = function(els) {
		var selector = null;
		if('string' === typeof els) {
			selector = els;
			els = document.querySelectorAll(els);
		} else {
			els = [els];
		}

		var sillyEls = {}

		extend(sillyEls, $.fn);

		for(var i=0, len=els.length; i<len; i++) {
			sillyEls[i] = els[i];
		}

		sillyEls.length = els.length;

		return sillyEls;
	}

	// The dollar sign is my golden idol and I
	// will never give it up.
	var $;
	// Export to a Node.js module or just make a
	// global.
	if('undefined' !== typeof exports) {
		$ = module.exports = find;
	} else {
		$ = this.silly = {};
	}

	// This is where all the functions attached
	// to Silly's element list objects are.
	$.fn = {};

	$.fn.find = find;

	// Iterate over every element in a Silly object.
	$.fn.each = function(iterator) {
		var els = this;
		for(var i=0; i < els.length; i++) {
			iterator(els[i]);
		}
	}

	// Add an event listener to all elements.
	$.fn.bind = function(eventName, callback) {
		this.each(function(el) {
			el.addEventListener(eventName, callback, false);
		});
	}

	// Get the style of the first element.
	$.fn.css = function(prop) {
		var el = this[0];
		var style = getComputedStyle(el, null);
		if(prop) {
			return style[prop];
		}
		return style
	}

	// Show all elements.
	$.fn.show = function() {
		this.each(function(el) {
			el.style.display = 'block';
		});
	}

	// Hide all elements.
	$.fn.hide = function() {
		this.each(function(el) {
			el.style.display = 'none';
		});
	}

	// Toggle between hiding and showing the first element.
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

	// Send an AJAX request.
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

	// Shortcut to send an AJAX GET request.
	var get = $.get = function(url, callback) {
		$.ajax(url, {method: 'get'}, callback);
	}

	// Shortcut to send an AJAX POST request.
	var post = $.post = function(url, payload, callback) {
		$.ajax(url, {method: 'post', payload: payload}, callback);
	}

	// Automatically parse JSON that's returned from
	// from an AJAX request.
	var ajaxHandler = function(event, callback) {
		var data = event.target.responseText;
		try {
			data = JSON.parse(data);
		} catch(e) {
			console.log(e)
		}
		callback(data);
	}

}).call(this);