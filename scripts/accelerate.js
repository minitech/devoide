/*!
 * Accelerate
 * Just events.
 *
 * https://github.com/minitech/Accelerate
 *
 */

'use strict';

window.Accelerate = {
	_listeners: [],
	addEventListener: function(event, listener) {
		if(typeof listener !== 'function') {
			throw new TypeError('Expected function as listener.');
		}

		var l = Accelerate._listeners[event];

		if(l) {
			if(l.raised) {
				listener(l.data);
			} else {
				l.push(listener);
			}
		} else {
			Accelerate._listeners[event] = [listener];
		}
	},
	raiseEvent: function(event, data) {
		var l = Accelerate._listeners[event];

		if(l) {
			var i, c;

			for(i = 0; c = l[i]; i++) {
				c(data);
			}
		}
	},
	raiseOnce: function(event, data) {
		Accelerate.raiseEvent(event, data);

		Accelerate._listeners[event] = {
			raised: true,
			data: data
		};
	}
};
