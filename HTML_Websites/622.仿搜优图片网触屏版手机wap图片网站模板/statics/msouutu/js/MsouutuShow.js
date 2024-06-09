(function (Z) {
	var W = window, D = W.document, E = D.documentElement, C = 'className', N = W.navigator, O = 'hasOwnProperty', P = 'prototype', R = 'replace', S = 'style', x;
	
	var aC = 'appendChild', aE = 'addEventListener', cE = 'createElement', cN = 'childNodes', cO = 'constructor', gA = 'getAttribute', iB = 'insertBefore', iH = 'innerHTML', rC = 'removeChild', tN = 'tagName', qA = 'querySelectorAll', qS = 'querySelector', nE = 'nextElementSibling', Oo = '[object Object]';
	var android = /android/ig.test(N.userAgent), iPod = /ipod/ig.test(N.userAgent);
	function M(s, g) { return new RegExp(s, g) }
	function V(e) { return e && e.value }
	
	function fC(e) { return e[qS]('*') }
	function iS(s) { return (typeof s === "string") || (s && s[cO] === String) }
	function lC(e) { var m = e[qA]('*'), l = L(m); return l ? m[l - 1] : undefined }
	function lS(s, d) { return S(s) ? s.toLowerCase() : d }
	function mA(i) { return Math.abs(i) }
	function sD(e, d) { if (e && (e = e[S])) e.display = d }
	function uS(s, d) { return S(s) ? s.toUpperCase() : d }
	function $(e) { return (e && iF(e)) ? Z.ready(e) : D[qA](e + '') }
	if (iS(Z)) { Z = W[Z] = $ } else if (Z) { Z.$ = $ }

	Z.isString = iS;
	Z.datediff = 0;
	Z.globalEval = function (d) { if (d && /\S/.test(d)) { return (W['exeScript'] || W['eval'])(d) } }
	Z.ready = function (f) { if (iF(f)) { var a = arguments, p = [], i = 1, l = L(arguments), x = f; if (l > 1) { for (; i < l; i++) { p.push(a[i]) } x = function () { f.apply(null, p) } } if (D.readyState == 'complete') { f() } else { D[aE]('DOMContentLoaded', f) } } };
	var TOUCH = Z.TOUCH = !!('createTouch' in D || android || iPod), dE = TOUCH ? 'touchstart' : 'click',
	L = Z.len = function (e) { var a = arguments, l = e ? (e.length || 0) : 0; if (a.length == 1) return l; else return a[1] == l },
	nF = Z.noop = function (e) { if (e && iF(e.preventDefault)) e.preventDefault() },
	eT = Z.extend = function () { var a = arguments, l = L(a), t = a[0] || {}, i = 1, d = false, o, n, s, c; if (typeof t === "boolean") { d = t; t = a[1] || {}; i = 2 } if (typeof t !== "object" && !iF(t)) { t = {} } if (l === i) { t = Z; --i } for (; i < l; i++) { if ((o = a[i]) != null) { for (n in o) { s = t[n]; c = o[n]; if (t === c) continue; if (d && c && (iP(c) || b(c))) { t[n] = Z.extend(e, s && (iP(s) || b(s)) ? s : b(c) ? [] : {}, c) } else if (c !== undefined) { t[n] = c } } } return t } },
	F = Z.float = function (s, d) { var f = parseFloat(s); if (!iN(d) && isNaN(f)) f = d; return f },
	I = Z.int = function (s, d) { var i = parseInt(s); if (!iN(d) && isNaN(i)) i = d; return i },
	X = Z.parse = function (t) { var r = t; if (iS(t)) { try { r = Z.globalEval("(" + t + ")") } catch (e) { r = t } } if (L(arguments)) { arguments[1] = r } return r },
	rE = Z.recon = function (s) { for (var t = ['\\', '$', '.', '+', '(', ')', '*', '[', '?', '^', '{', '|'], i = 0, l = L(t) ; i < l; i++) { s = s[R](t[i], '\\' + t[i]) }; return s },
	iP = Z.isPlainObject = function (o) { var k, s; if ((!o || (o + '') !== Oo || o.nodeType || o.setInterval) || (o[cO] && !o[O](cO) && !o[cO][P][O]('isPrototypeOf'))) { s = false } else { for (k in o) { } s = (k === undefined || o[O](k)) } return s },
	iN = Z.isNull = function (o) { return typeof o === "undefined" || o === null },
	is = Z.is = function (o) { if (!iN(o)) { var a = arguments, l = L(a), i = 1; for (; i < l; i++) { if (o[cO] === a[i]) { return o } } } return 0 },
	iO = Z.isNot = function (o) { if (!iN(o)) { var a = arguments, l = L(a), i = 1; for (; i < l; i++) { if (o[cO] === a[i]) { return 0 } } } return o },
	iA = Z.isArray = function (o) { var c; return ((!iN(o)) && (c = o[cO]) && (c === Array || c === W['HTMLCollection'] || c === W['NodeList'])) ? o : 0 },
	iF = Z.isFunction = function (o) { return (!(iN(o)) && o[cO] + '' == Function) ? o : 0 },
	iE = Z.isElement = function (o, t) { var v = false; if (o && o + '' !== Oo && o.nodeType && o[tN]) v = !t || (lC(o[tN]) === lC(t)); return v },
	iM = Z.isEmptyObject = function (o) { for (var n in o) { return false } return true };
	String.prototype.padLeft = function (c, l) { var s = this; while (s.length < l) { s += c } return s };
	String.prototype.padRight = function (c, l) { var s = this; while (s.length < l) { s = c + s } return s };
	String.prototype.startWiths = function (s) { s += ''; return !s || this.indexOf(s) == 0 };
	String.prototype.endWiths = function (s) { s += ''; return !s || this.indexOf(s) == (this.length - s.length) };
	Function[P].extend = function (a) { var z = this, o; z[P] = new a(); o = z[P]; o.base = a[P]; o[cO] = z }
	var MU, MD, MV;
	if (TOUCH) { MU = 'touchend'; MD = 'touchstart'; MV = 'touchmove' } else { MU = 'mouseup'; MD = 'mousedown'; MV = 'mousemove' }
	Z.fixedSupported = !TOUCH || (function (u) { var a = u.match(/android\s([\d\.]+)/i), i = u.match(/i(phone)?\s*os\s([\d\.]+)/i); return (a && a[1] > 2.1) || (i && i[2] > 4.9) })(N.userAgent);
	if (x = W.Event) {
		x.fire = function (e, t, n) {
			var v = D.createEvent(n || "HTMLEvents");
			v.initEvent(t, true, true);
			return !e.dispatchEvent(v);
		}
	}
	var aN = Z.addClass = function aN(e, n) {
		if (L(arguments) == 1) { n = e; e = this }
		if (e) {
			if (!e[C]) e[C] = n;
			else {
				var a = e[C].split(' '), i = 0, l = L(a);
				for (; i < l; i++) { if (a[i] == n) return }
				a.push(n);
				e[C] = a.join(' ')
			}
		}
	},
	rN = Z.removeClass = function (e, n) {
		if (L(arguments) == 1) { n = e; e = this }
		if (e && e[C]) {
			if (e[C] == n) { e[C] = ''; return }
			var a = e[C].split(' '), l = L(a) - 1;
			for (; l >= 0; l--) { if (a[l] == n) a.splice(l, 1) }
			e[C] = a.join(' ')
		}
	},
	hN = Z.hasClass = function (e, n) {
		if (L(arguments) == 1) { n = e; e = this }
		if (e && e[C]) {
			if (e[C] == n) return true;
			var a = e[C].split(' '), i = 0, l = L(a);
			for (; i < l; i++) { if (a[i] == n) return true }
		}
		return false
	};
	function tap(element, func) {
		var x, y, dx, dy;
		if (TOUCH) {
			function tapStart(e) {
				e = e.touches && e.touches[0] || e;
				dx = x = e.pageX;
				dy = y = e.pageY;
			}
			function tapMove(e) {
				e = e.touches && e.touches[0] || e;
				dx = e.pageX;
				dy = e.pageY;
			}
			function tapEnd(e) {
				var t = e.touches && e.touches[0] || e;
				t.pageX = x;
				t.pageY = y;
				if (Math.abs(dx - x) < 15 && Math.abs(dy - y) < 15) {
					func.call(this, t, x, y);
				}
				return false;
			}
			element[aE](MD, tapStart);
			//element[aE](MV, tapMove);
			element[aE](MU, tapEnd);
		} else {
			element[aE]('click', function (e) { func.call(this, e, e.pageX, e.pageY) });
		}
	}
	D.click = function (f, c) { this[aE](dE, f, c) };
	if (x = Element) {
		eT(x[P], { addClass: aN, removeClass: rN, hasClass: hN, tap: function (f) { tap(this, f) }, click: function (f, c) { this[aE](dE, f, c) } });
	}
	if (x = HTMLImageElement) {
		x[P].lazyLoad = function () {
			var z = this, s = z[gA]('src'), r = z[gA]('itemref') || z[gA]('rel');
			if (r && s != r) { z.setAttribute('src', r); return r }
			else return s;
		}
	}
	if (x = W.NodeList) {
		eT(x[P], {
			each: function (f) {
				if (iF(f)) {
					for (var n = this, i = 0, l = L(n) ; i < l; i++) f.call(n[i], i);
				}
			},
			on: function (e, f, c) {
				if (e && iF(f)) this.each(function () { if (e == 'tap') { tap(this,f) } else { this[aE](e, f, c) }});
			},
			un: function (e, f, c) {
				if (e && iF(f)) this.each(function () { this.removeEventListener(e, f, c) });
			},
			click: function (f, c) {
				this.on(dE, f, c);
			},
			tap: function (f) {
				this.on('tap', f);
			},
			addClass: function (c) {
				this.each(function () { aN(this, c) })
			},
			removeClass: function (c) {
				this.each(function () { rN(this, c) })
			},
			attr: function (n, v) {
				this.each(function () { this.setAttribute(n, v) });
			},
			removeAttr: function (n) {
				this.each(function () { this.removeAttribute(n) });
			},
			style: function (n, v) {
				this.each(function () { this.style[n] = v });
			},
			html: function (s) {
				this.each(function () { this.innerHTML = s })
			},
			text: function (s) {
				this.each(function () {
					if (this[O]('value'))
						this.value = s;
					else if (this[O]('textContent'))
						this.textContent = s;
				});
			}
		});
	}
	x = Z.FlipTab = function (e) {
		var z = e, c = z.container = e[qS]('.container'), t = z.tabs = e[qS]('.tabs'), a = z.articles = e[qA]('.container>' + (c[gA]('itemref') || '*')), n = z.count = L(a), m = [], wT = 'webkitTransform', index = z.index = 0, firstCopy, lastCopy, w, h, left = z.left = 0, top = z.top = 0, touch = e[gA]('touch') != 'false', loop = e[gA]('loop') != 'false';
		var startX, startY, touched, moved, touchmove;

		var transform = e[gA]('transform') != 'false';
		if (t) {
			(t = z.navigators = e[qA]('.tabs>' + (t[gA]('itemref') || '*'))).each(function (i) {
				this[aE](MD, function (e) { z.go(i); if (android) { e.preventDefault(); if (e.touches) { e = e.touches[0] } this.startY = e.pageY } });
				if (android) {
					this[aE](MV, function (e) {
						e.preventDefault();
						if (e.touches) { e = e.touches[0] }
						if (this.startY) W.scrollTo(0, D.body.scrollTop + this.startY - e.pageY);
					});
				}
				this[aE](MU, nF);
			});
		}
		var cw = c.offsetWidth, w = a[0].offsetWidth, ch = c.offsetHeight, h = a[0].offsetHeight, tw, th;
		if (cw >= w * n && cw > 0) {
			z.dir = 'left-right';
			tw = 1;
		} else if (ch >= h * n && ch > 0) {
			z.dir = 'top-bottom';
			th = 1;
		}
		if (touch && loop) {
			firstCopy = a[0].cloneNode(true);
			lastCopy = a[n - 1].cloneNode(true);
			c.insertBefore(lastCopy, c.firstChild);
			c.appendChild(firstCopy);
		}
		W.addEventListener(TOUCH ? 'orientationchange' : 'resize', init);
		var lastWindowWidth;
		setInterval(init, 2000);
		function init() {
			if (lastWindowWidth != E.offsetWidth) {
				lastWindowWidth = E.offsetWidth;
				if (touch && loop) {
					firstCopy.left = 0 - firstCopy.offsetLeft;
					firstCopy.top = 0 - firstCopy.offsetTop;
					lastCopy.left = 0 - lastCopy.offsetLeft;
					lastCopy.top = 0 - lastCopy.offsetTop;
				}
				a.each(function (i) {
					this.left = 0 - this.offsetLeft;
					this.top = 0 - this.offsetTop;
				});
				z.go(index, false);
			}
		};
		z.to = function (x, y) {
			if (tw) { x = x ? (x + 'px') : 0; y = 0 }
			if (th) { y = x ? (y + 'px') : 0; x = 0 }
			if (transform) { c.style[wT] = 'translate3d(' + x + ',' + y + ', 0)' }
			else { if (tw) { c.style.left = x } if (th) { c.style.top = y } }
		};
		z.go = function (i, t, f) {
			i = ((i % n) + n) % n;
			var o = z.navigators;
			if (o) {
				if (o[index]) rN(o[index], 'selected');
				if (o[i]) aN(o[i], 'selected');
			}

			c[(arguments.length == 1 || t) ? 'removeClass' : 'addClass']('touching');
			if (a[i]) z.to(a[i].left, a[i].top);
			left = z.left = top = z.top = 0;
			if (i != index) {
				index = z.index = i;
				z.lastIndex = index;
				if (f !== false)
					Event.fire(e, 'indexChanged');
			}
		};
		init();
		z.previous = function () {
			var i = index - 1;
			if (i >= 0 || !firstCopy) { z.go(i) } else {
				c.addClass('touching');
				z.to(firstCopy.left + left, firstCopy.top + top);
				setTimeout(function () { z.go(-1) }, 0);
			}
		};

		z.next = function () {
			var i = index + 1;
			if (i < z.count || !lastCopy) { z.go(i) } else {
				c.addClass('touching');
				z.to(lastCopy.left + left, lastCopy.top + top);
				setTimeout(function () { z.go(0) }, 0);
			}
		};
		if (touch) {
			if (!TOUCH) {
				c[aE]('click', function (e) { if (touchmove) { e.preventDefault(); return false; } });
			}
			c[aE](TOUCH ? 'touchstart' : 'mousedown', function (e) {
				if (!TOUCH)
					e.preventDefault();
				touchmove = 0;
				if (e.touches) e = e.touches[0];
				if (!e) return;
				touched = 1;
				startX = e.pageX;
				startY = e.pageY;
				lastTouch = e;
				rN(c, 'touching');
			});
			c[aE](TOUCH ? 'touchmove' : 'mousemove', function (e) {
				if (touched) {
					var t, v, x, y;
					if (t = e.touches) { t = t[0] } else { t = e }
					lastTouch = t;
					left = z.left = t.pageX - startX;
					top = z.top = t.pageY - startY;

					x = mA(left); y = mA(top);
					if (!moved) {
						if (tw) { if (y > 5 && y - x > 0) { touched = 0; return } moved = x > 5 && x - y > 0; }
						if (th) { if (x > 5 && x - y > 0) { touched = 0; return } moved = y > 5 && y - x > 0; }
						if (moved) {
							x = D.body.scrollTop; y = z.offsetTop; v = y + z.offsetHeight - E.clientHeight - (iPod ? 60 : 0);
							if (x > y || v >= y) W.scrollTo(0, y);
							else if (x < v) W.scrollTo(0, v);
						}
					}
					if (moved) {
						c.addClass('touching');
						z.to(left + a[index].left, top + a[index].top);
						if (x > 1 || y > 1) {
							touchmove = 1;
							e.preventDefault();
						}
					}
				}
			});
			D[aE](TOUCH ? 'touchend' : 'mouseup', function (e) {
				var t, x, y, v;
				if (touched && moved) {
					if (t = e.touches) { t = t[0] } else { t = e }
					t = t || lastTouch;
					x = t.pageX - startX; y = t.pageY - startY;
					if (tw) { v = x } else if (th) { v = y }
					if (v > 5) { z.previous(); }
					else if (v < -5) { z.next(); }
					else { z.go(index, 0); }
				}
				touched = 0; moved = 0;
				if (touchmove) e.preventDefault();
			});
		}
	}

	x.init = function (e, p) {
		if (iE(e) && e[tN]) e = [e];
		else if (iS(e)) e = $(e);
		else if (iO(e, 'NodeList')) return;
		var l = L(e), i = 0;
		for (; i < l; i++) { Z.FlipTab(e[i], p) }
		return l;
	};
	(x.tryInit = function (e, p, f) {
		if (iF(p)) f = p; p = 0;
		$(function () { var k, x = Z.FlipTab.init(e, p); if (iF(f)) { f(x) } });
	})('.fliptab');
	var toast;
	Z.toast = function (c, t, s, h) {
		if (typeof c == 'string') {
			if (!toast) {
				toast = D[cE]('div');
				toast.className = 'toast';
				D.body.insertBefore(toast);
			}
			toast.innerHTML = c;
			c = toast;
		}
		if (iF(s)) {
			s.call(c);
		} else {
			c.addClass('visible');
		}
		if (c.timeout) {
			clearTimeout(c.timeout);
		}
		t = parseInt(t) || 0;
		if (t < 1)
			t = 2000;
		c.timeout = setTimeout(function () {
			if (iF(h)) {
				h.call(c);
			} else {
				c.removeClass('visible');
			}
		}, t);
		return c;
	};
})('$');
$.ready(function () {
	$('.turnon').click(function (e) {
		var z = this, b = document.body, c = z.checked != true;
		z.checked = c ? true : false;
		Event.fire(z, 'change');
		z[c ? 'addClass' : 'removeClass']('on');
		e.preventDefault();
	});
	scrollTo(0, 1);
});
(function () {
	function c() {
		var f = this.form;
		if (f && (f = f.querySelector('input[type=submit]')))
			f.disabled = (this.value.length == 0);
	}
	$('input[type=search]').on('input', c);
	$('input[type=search]').on('change', c);
	document.querySelectorAll('input[type=search]').each(function () {
		var i = this, s = i.form.querySelector('input[type=submit]');
		if (s && i.value.length == 0) s.disabled = true;
		i.form.addEventListener('submit', function (e) {
			if (i.value.length == 0) {
				e.preventDefault();
				return false;
			}
		});
	});
})();