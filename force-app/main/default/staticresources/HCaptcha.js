/* https://hcaptcha.com/license */
var hcaptcha = function() { "use strict";

    function e(e) { var t = this.constructor; return this.then((function(n) { return t.resolve(e()).then((function() { return n })) }), (function(n) { return t.resolve(e()).then((function() { return t.reject(n) })) })) }

    function t(e) { return new this((function(t, n) { if (!e || "undefined" == typeof e.length) return n(new TypeError(typeof e + " " + e + " is not iterable(cannot read property Symbol(Symbol.iterator))")); var i = Array.prototype.slice.call(e); if (0 === i.length) return t([]); var r = i.length;

            function o(e, n) { if (n && ("object" == typeof n || "function" == typeof n)) { var a = n.then; if ("function" == typeof a) return void a.call(n, (function(t) { o(e, t) }), (function(n) { i[e] = { status: "rejected", reason: n }, 0 == --r && t(i) })) }
                i[e] = { status: "fulfilled", value: n }, 0 == --r && t(i) } for (var a = 0; a < i.length; a++) o(a, i[a]) })) } var n = setTimeout,
        i = "undefined" != typeof setImmediate ? setImmediate : null;

    function r(e) { return Boolean(e && "undefined" != typeof e.length) }

    function o() {}

    function a(e) { if (!(this instanceof a)) throw new TypeError("Promises must be constructed via new"); if ("function" != typeof e) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = undefined, this._deferreds = [], u(e, this) }

    function s(e, t) { for (; 3 === e._state;) e = e._value;
        0 !== e._state ? (e._handled = !0, a._immediateFn((function() { var n = 1 === e._state ? t.onFulfilled : t.onRejected; if (null !== n) { var i; try { i = n(e._value) } catch (r) { return void h(t.promise, r) }
                c(t.promise, i) } else(1 === e._state ? c : h)(t.promise, e._value) }))) : e._deferreds.push(t) }

    function c(e, t) { try { if (t === e) throw new TypeError("A promise cannot be resolved with itself."); if (t && ("object" == typeof t || "function" == typeof t)) { var n = t.then; if (t instanceof a) return e._state = 3, e._value = t, void l(e); if ("function" == typeof n) return void u((i = n, r = t, function() { i.apply(r, arguments) }), e) }
            e._state = 1, e._value = t, l(e) } catch (o) { h(e, o) } var i, r }

    function h(e, t) { e._state = 2, e._value = t, l(e) }

    function l(e) { 2 === e._state && 0 === e._deferreds.length && a._immediateFn((function() { e._handled || a._unhandledRejectionFn(e._value) })); for (var t = 0, n = e._deferreds.length; t < n; t++) s(e, e._deferreds[t]);
        e._deferreds = null }

    function d(e, t, n) { this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n }

    function u(e, t) { var n = !1; try { e((function(e) { n || (n = !0, c(t, e)) }), (function(e) { n || (n = !0, h(t, e)) })) } catch (i) { if (n) return;
            n = !0, h(t, i) } }
    a.prototype["catch"] = function(e) { return this.then(null, e) }, a.prototype.then = function(e, t) { var n = new this.constructor(o); return s(this, new d(e, t, n)), n }, a.prototype["finally"] = e, a.all = function(e) { return new a((function(t, n) { if (!r(e)) return n(new TypeError("Promise.all accepts an array")); var i = Array.prototype.slice.call(e); if (0 === i.length) return t([]); var o = i.length;

            function a(e, r) { try { if (r && ("object" == typeof r || "function" == typeof r)) { var s = r.then; if ("function" == typeof s) return void s.call(r, (function(t) { a(e, t) }), n) }
                    i[e] = r, 0 == --o && t(i) } catch (c) { n(c) } } for (var s = 0; s < i.length; s++) a(s, i[s]) })) }, a.allSettled = t, a.resolve = function(e) { return e && "object" == typeof e && e.constructor === a ? e : new a((function(t) { t(e) })) }, a.reject = function(e) { return new a((function(t, n) { n(e) })) }, a.race = function(e) { return new a((function(t, n) { if (!r(e)) return n(new TypeError("Promise.race accepts an array")); for (var i = 0, o = e.length; i < o; i++) a.resolve(e[i]).then(t, n) })) }, a._immediateFn = "function" == typeof i && function(e) { i(e) } || function(e) { n(e, 0) }, a._unhandledRejectionFn = function(e) { "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e) }; var p, f = function() { if ("undefined" != typeof self) return self; if ("undefined" != typeof window) return window; if ("undefined" != typeof global) return global; throw new Error("unable to locate global object") }(); "function" != typeof f.Promise ? f.Promise = a : (f.Promise.prototype["finally"] || (f.Promise.prototype["finally"] = e), f.Promise.allSettled || (f.Promise.allSettled = t)), Array.prototype.indexOf || (Array.prototype.indexOf = function(e) { return function(t, n) { if (null === this || this === undefined) throw TypeError("Array.prototype.indexOf called on null or undefined"); var i = e(this),
                r = i.length >>> 0,
                o = Math.min(0 | n, r); if (o < 0) o = Math.max(0, r + o);
            else if (o >= r) return -1; if (void 0 === t) { for (; o !== r; ++o)
                    if (void 0 === i[o] && o in i) return o } else if (t != t) { for (; o !== r; ++o)
                    if (i[o] != i[o]) return o } else
                for (; o !== r; ++o)
                    if (i[o] === t) return o; return -1 } }(Object)), Array.isArray || (Array.isArray = function(e) { return "[object Array]" === Object.prototype.toString.call(e) }), document.getElementsByClassName || (window.Element.prototype.getElementsByClassName = document.constructor.prototype.getElementsByClassName = function(e) { if (document.querySelectorAll) return document.querySelectorAll("." + e); for (var t = document.getElementsByTagName("*"), n = new RegExp("(^|\\s)" + e + "(\\s|$)"), i = [], r = 0; r < t.length; r++) n.test(t[r].className) && i.push(t[r]); return i }), String.prototype.startsWith || (String.prototype.startsWith = function(e, t) { return this.substr(!t || t < 0 ? 0 : +t, e.length) === e }), String.prototype.endsWith || (String.prototype.endsWith = function(e, t) { return (t === undefined || t > this.length) && (t = this.length), this.substring(t - e.length, t) === e }); try { if (Object.defineProperty && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(Element.prototype, "textContent") && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) { var m = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
            Object.defineProperty(Element.prototype, "textContent", { get: function() { return m.get.call(this) }, set: function(e) { m.set.call(this, e) } }) } } catch (nn) {}
    Function.prototype.bind || (Function.prototype.bind = function(e) { if ("function" != typeof this) throw new TypeError("Function.prototype.bind: Item Can Not Be Bound."); var t = Array.prototype.slice.call(arguments, 1),
            n = this,
            i = function() {},
            r = function() { return n.apply(this instanceof i ? this : e, t.concat(Array.prototype.slice.call(arguments))) }; return this.prototype && (i.prototype = this.prototype), r.prototype = new i, r }), "function" != typeof Object.create && (Object.create = function(e, t) {
        function n() {} if (n.prototype = e, "object" == typeof t)
            for (var i in t) t.hasOwnProperty(i) && (n[i] = t[i]); return new n }), Date.now || (Date.now = function() { return (new Date).getTime() }), window.console || (window.console = {}); for (var g, y, v, w, b, _, x = ["error", "info", "log", "show", "table", "trace", "warn"], C = function(e) {}, k = x.length; --k > -1;) p = x[k], window.console[p] || (window.console[p] = C); if (window.atob) try { window.atob(" ") } catch (rn) { window.atob = (g = window.atob, (y = function(e) { return g(String(e).replace(/[\t\n\f\r ]+/g, "")) }).original = g, y) } else { var E = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            O = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
        window.atob = function(e) { if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !O.test(e)) throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded."); var t, n, i;
            e += "==".slice(2 - (3 & e.length)); for (var r = "", o = 0; o < e.length;) t = E.indexOf(e.charAt(o++)) << 18 | E.indexOf(e.charAt(o++)) << 12 | (n = E.indexOf(e.charAt(o++))) << 6 | (i = E.indexOf(e.charAt(o++))), r += 64 === n ? String.fromCharCode(t >> 16 & 255) : 64 === i ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t); return r } }
    if (Event.prototype.preventDefault || (Event.prototype.preventDefault = function() { this.returnValue = !1 }), Event.prototype.stopPropagation || (Event.prototype.stopPropagation = function() { this.cancelBubble = !0 }), window.Prototype && Array.prototype.toJSON) { console.error("[hCaptcha] Custom JSON polyfill detected, please remove to ensure hCaptcha works properly"); var S = Array.prototype.toJSON,
            B = JSON.stringify;
        JSON.stringify = function(e) { try { return delete Array.prototype.toJSON, B(e) } finally { Array.prototype.toJSON = S } } }
    Object.keys || (Object.keys = (v = Object.prototype.hasOwnProperty, w = !Object.prototype.propertyIsEnumerable.call({ toString: null }, "toString"), _ = (b = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]).length, function(e) { if ("function" != typeof e && ("object" != typeof e || null === e)) throw new TypeError("Object.keys called on non-object"); var t, n, i = []; for (t in e) v.call(e, t) && i.push(t); if (w)
            for (n = 0; n < _; n++) v.call(e, b[n]) && i.push(b[n]); return i })); var I = [{ family: "UC Browser", patterns: ["(UC? ?Browser|UCWEB|U3)[ /]?(\\d+)\\.(\\d+)\\.(\\d+)"] }, { family: "Opera", name_replace: "Opera Mobile", patterns: ["(Opera)/.+Opera Mobi.+Version/(\\d+)\\.(\\d+)", "(Opera)/(\\d+)\\.(\\d+).+Opera Mobi", "Opera Mobi.+(Opera)(?:/|\\s+)(\\d+)\\.(\\d+)", "Opera Mobi", "(?:Mobile Safari).*(OPR)/(\\d+)\\.(\\d+)\\.(\\d+)"] }, { family: "Opera", name_replace: "Opera Mini", patterns: ["(Opera Mini)(?:/att|)/?(\\d+|)(?:\\.(\\d+)|)(?:\\.(\\d+)|)", "(OPiOS)/(\\d+).(\\d+).(\\d+)"] }, { family: "Opera", name_replace: "Opera Neon", patterns: ["Chrome/.+( MMS)/(\\d+).(\\d+).(\\d+)"] }, { name_replace: "Opera", patterns: ["(Opera)/9.80.*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(?:Chrome).*(OPR)/(\\d+)\\.(\\d+)\\.(\\d+)"] }, { family: "Firefox", name_replace: "Firefox Mobile", patterns: ["(Fennec)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)", "(Fennec)/(\\d+)\\.(\\d+)(pre)", "(Fennec)/(\\d+)\\.(\\d+)", "(?:Mobile|Tablet);.*(Firefox)/(\\d+)\\.(\\d+)", "(FxiOS)/(\\d+)\\.(\\d+)(\\.(\\d+)|)(\\.(\\d+)|)"] }, { name_replace: "Coc Coc", patterns: ["(coc_coc_browser)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)"] }, { family: "QQ", name_replace: "QQ Mini", patterns: ["(MQQBrowser/Mini)(?:(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)|)"] }, { family: "QQ", name_replace: "QQ Mobile", patterns: ["(MQQBrowser)(?:/(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)|)"] }, { name_replace: "QQ", patterns: ["(QQBrowser)(?:/(\\d+)(?:\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)|)"] }, { family: "Edge", name: "Edge Mobile", patterns: ["Windows Phone .*(Edge)/(\\d+)\\.(\\d+)", "(EdgiOS|EdgA)/(\\d+)\\.(\\d+).(\\d+).(\\d+)"] }, { name_replace: "Edge", patterns: ["(Edge|Edg)/(\\d+)(?:\\.(\\d+)|)"] }, { patterns: ["(Puffin)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)"] }, { family: "Chrome", name_replace: "Chrome Mobile", patterns: ["Version/.+(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "; wv\\).+(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(CriOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(CrMo)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+) Mobile(?:[ /]|$)", " Mobile .*(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)"] }, { family: "Yandex", name_replace: "Yandex Mobile", patterns: ["(YaBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+).*Mobile"] }, { name_replace: "Yandex", patterns: ["(YaBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)"] }, { patterns: ["(Vivaldi)/(\\d+)\\.(\\d+)", "(Vivaldi)/(\\d+)\\.(\\d+)\\.(\\d+)"] }, { name_replace: "Brave", patterns: ["(brave)/(\\d+)\\.(\\d+)\\.(\\d+) Chrome"] }, { family: "Chrome", patterns: ["(Chromium|Chrome)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)"] }, { name_replace: "Internet Explorer Mobile", patterns: ["(IEMobile)[ /](\\d+)\\.(\\d+)"] }, { family: "Safari", name_replace: "Safari Mobile", patterns: ["(iPod|iPhone|iPad).+Version/(d+).(d+)(?:.(d+)|).*[ +]Safari", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).* AppleNews\\/\\d+\\.\\d+\\.\\d+?", "(iPod|iPhone|iPad).+Version/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).*Mobile.*[ +]Safari", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).*Mobile", "(iPod|iPod touch|iPhone|iPad).* Safari", "(iPod|iPod touch|iPhone|iPad)"] }, { name_replace: "Safari", patterns: ["(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|).*Safari/"] }, { name_replace: "Internet Explorer", patterns: ["(Trident)/(7|8).(0)"], major_replace: "11" }, { name_replace: "Internet Explorer", patterns: ["(Trident)/(6)\\.(0)"], major_replace: "10" }, { name_replace: "Internet Explorer", patterns: ["(Trident)/(5)\\.(0)"], major_replace: "9" }, { name_replace: "Internet Explorer", patterns: ["(Trident)/(4)\\.(0)"], major_replace: "8" }, { family: "Firefox", patterns: ["(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)", "(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*|)"] }],
        P = [{ family: "Windows", name_replace: "Windows Phone", patterns: ["(Windows Phone) (?:OS[ /])?(\\d+)\\.(\\d+)", "^UCWEB.*; (wds) (\\d+)\\.(d+)(?:\\.(\\d+)|);", "^UCWEB.*; (wds) (\\d+)\\.(\\d+)(?:\\.(\\d+)|);"] }, { family: "Windows", name_replace: "Windows Mobile", patterns: ["(Windows ?Mobile)"] }, { name_replace: "Android", patterns: ["(Android)[ \\-/](\\d+)(?:\\.(\\d+)|)(?:[.\\-]([a-z0-9]+)|)", "(Android) (d+);", "^UCWEB.*; (Adr) (\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+)|);", "^(JUC).*; ?U; ?(?:Android|)(\\d+)\\.(\\d+)(?:[\\.\\-]([a-z0-9]+)|)", "(android)\\s(?:mobile\\/)(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)|)|)", "(Silk-Accelerated=[a-z]{4,5})", "Puffin/[\\d\\.]+AT", "Puffin/[\\d\\.]+AP"] }, { name_replace: "Chrome OS", patterns: ["(x86_64|aarch64)\\ (\\d+)\\.(\\d+)\\.(\\d+).*Chrome.*(?:CitrixChromeApp)$", "(CrOS) [a-z0-9_]+ (\\d+)\\.(\\d+)(?:\\.(\\d+)|)"] }, { name_replace: "Windows", patterns: ["(Windows 10)", "(Windows NT 6\\.4)", "(Windows NT 10\\.0)"], major_replace: "10" }, { name_replace: "Windows", patterns: ["(Windows NT 6\\.3; ARM;)", "(Windows NT 6.3)"], major_replace: "8", minor_replace: "1" }, { name_replace: "Windows", patterns: ["(Windows NT 6\\.2)"], major_replace: "8" }, { name_replace: "Windows", patterns: ["(Windows NT 6\\.1)"], major_replace: "7" }, { name_replace: "Windows", patterns: ["(Windows NT 6\\.0)"], major_replace: "Vista" }, { name_replace: "Windows", patterns: ["(Windows (?:NT 5\\.2|NT 5\\.1))"], major_replace: "XP" }, { name_replace: "Mac OS X", patterns: ["((?:Mac[ +]?|; )OS[ +]X)[\\s+/](?:(\\d+)[_.](\\d+)(?:[_.](\\d+)|)|Mach-O)", "\\w+\\s+Mac OS X\\s+\\w+\\s+(\\d+).(\\d+).(\\d+).*", "(?:PPC|Intel) (Mac OS X)"] }, { name_replace: "Mac OS X", patterns: [" (Dar)(win)/(10).(d+).*((?:i386|x86_64))"], major_replace: "10", minor_replace: "6" }, { name_replace: "Mac OS X", patterns: [" (Dar)(win)/(11).(\\d+).*\\((?:i386|x86_64)\\)"], major_replace: "10", minor_replace: "7" }, { name_replace: "Mac OS X", patterns: [" (Dar)(win)/(12).(\\d+).*\\((?:i386|x86_64)\\)"], major_replace: "10", minor_replace: "8" }, { name_replace: "Mac OS X", patterns: [" (Dar)(win)/(13).(\\d+).*\\((?:i386|x86_64)\\)"], major_replace: "10", minor_replace: "9" }, { name_replace: "iOS", patterns: ["^UCWEB.*; (iPad|iPh|iPd) OS (\\d+)_(\\d+)(?:_(\\d+)|);", "(CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS)[ +]+(\\d+)[_\\.](\\d+)(?:[_\\.](\\d+)|)", "(iPhone|iPad|iPod); Opera", "(iPhone|iPad|iPod).*Mac OS X.*Version/(\\d+)\\.(\\d+)", "\\b(iOS[ /]|iOS; |iPhone(?:/| v|[ _]OS[/,]|; | OS : |\\d,\\d/|\\d,\\d; )|iPad/)(\\d{1,2})[_\\.](\\d{1,2})(?:[_\\.](\\d+)|)", "\\((iOS);", "(iPod|iPhone|iPad)", "Puffin/[\\d\\.]+IT", "Puffin/[\\d\\.]+IP"] }, { family: "Chrome", name_replace: "Chromecast", patterns: ["(CrKey -)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "(CrKey[ +]armv7l)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "(CrKey)(?:[/](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)"] }, { name_replace: "Debian", patterns: ["([Dd]ebian)"] }, { family: "Linux", name_replace: "Linux", patterns: ["(Linux Mint)(?:/(\\d+)|)"] }, { family: "Linux", patterns: ["(Ubuntu|Kubuntu|Arch Linux|CentOS|Slackware|Gentoo|openSUSE|SUSE|Red Hat|Fedora|PCLinuxOS|Mageia|(?:Free|Open|Net|\\b)BSD)", "(Mandriva)(?: Linux|)/(?:[\\d.-]+m[a-z]{2}(\\d+).(\\d)|)", "(Linux)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "\\(linux-gnu\\)"] }, { family: "BlackBerry", name_replace: "BlackBerry OS", patterns: ["(BB10);.+Version/(\\d+)\\.(\\d+)\\.(\\d+)", "(Black[Bb]erry)[0-9a-z]+/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(Black[Bb]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(Black[Bb]erry)"] }, { patterns: ["(Fedora|Red Hat|PCLinuxOS|Puppy|Ubuntu|Kindle|Bada|Sailfish|Lubuntu|BackTrack|Slackware|(?:Free|Open|Net|\\b)BSD)[/ ](\\d+)\\.(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)"] }],
        T = navigator.userAgent,
        A = function() { return T },
        j = function(e) { return L(e || T, I) },
        M = function(e) { return L(e || T, P) };

    function $(e, t) { try { var n = new RegExp(t).exec(e); return n ? { name: n[1] || "Other", major: n[2] || "0", minor: n[3] || "0", patch: n[4] || "0" } : null } catch (rn) { return null } }

    function L(e, t) { for (var n = null, i = null, r = -1, o = !1; ++r < t.length && !o;) { n = t[r]; for (var a = -1; ++a < n.patterns.length && !o;) o = null !== (i = $(e, n.patterns[a])) } return o ? (i.family = n.family || n.name_replace || i.name, n.name_replace && (i.name = n.name_replace), n.major_replace && (i.major = n.major_replace), n.minor_replace && (i.minor = n.minor_replace), n.patch_replace && (i.minor = n.patch_replace), i) : { family: "Other", name: "Other", major: "0", minor: "0", patch: "0" } }

    function R() { var e = this,
            t = j(),
            n = A();
        this.agent = n.toLowerCase(), this.language = window.navigator.userLanguage || window.navigator.language, this.isCSS1 = "CSS1Compat" === (document.compatMode || ""), this.width = function() { return window.innerWidth && window.document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || window.document.documentElement.clientWidth || document.body.clientWidth }, this.height = function() { return window.innerHeight || window.document.documentElement.clientHeight || document.body.clientHeight }, this.scrollX = function() { return window.pageXOffset !== undefined ? window.pageXOffset : e.isCSS1 ? document.documentElement.scrollLeft : document.body.scrollLeft }, this.scrollY = function() { return window.pageYOffset !== undefined ? window.pageYOffset : e.isCSS1 ? document.documentElement.scrollTop : document.body.scrollTop }, this.type = "Edge" === t.family ? "edge" : "Internet Explorer" === t.family ? "ie" : "Chrome" === t.family ? "chrome" : "Safari" === t.family ? "safari" : "Firefox" === t.family ? "firefox" : t.family.toLowerCase(), this.version = 1 * (t.major + "." + t.minor) || 0, this.hasPostMessage = !!window.postMessage }
    R.prototype.hasEvent = function(e, t) { return "on" + e in (t || document.createElement("div")) }, R.prototype.getScreenDimensions = function() { var e = {}; for (var t in window.screen) e[t] = window.screen[t]; return delete e.orientation, e }, R.prototype.interrogateNavigator = function() { var e = {}; for (var t in window.navigator) try { e[t] = window.navigator[t] } catch (nn) {}
        if (delete e.plugins, delete e.mimeTypes, e.plugins = [], window.navigator.plugins)
            for (var n = 0; n < window.navigator.plugins.length; n++) e.plugins[n] = window.navigator.plugins[n].filename; return e }, R.prototype.supportsCanvas = function() { var e = document.createElement("canvas"); return !(!e.getContext || !e.getContext("2d")) }, R.prototype.supportsWebAssembly = function() { try { if ("object" == typeof WebAssembly && "function" == typeof WebAssembly.instantiate) { var e = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0)); if (e instanceof WebAssembly.Module) return new WebAssembly.Instance(e) instanceof WebAssembly.Instance } } catch (rn) { return !1 } }; var D = { Browser: new R, System: new function() { var e, t, n = M(),
                    i = A();
                this.mobile = (e = !!("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0), t = !1, n && (t = ["iOS", "Windows Phone", "Windows Mobile", "Android", "BlackBerry OS"].indexOf(n.name) >= 0), e && t), this.dpr = function() { return window.devicePixelRatio || 1 }, this.mobile && n && "Windows" === n.family && i.indexOf("touch") < 0 && (this.mobile = !1), this.os = "iOS" === n.family ? "ios" : "Android" === n.family ? "android" : "Mac OS X" === n.family ? "mac" : "Windows" === n.family ? "windows" : "Linux" === n.family ? "linux" : n.family.toLowerCase(), this.version = function() { if (!n) return "unknown"; var e = n.major; return n.minor && (e += "." + n.minor), n.patch && (e += "." + n.patch), e }() } },
        N = { host: null, file: null, sitekey: null, a11y_tfe: null, pingdom: "safari" === D.Browser.type && "windows" !== D.System.os && "mac" !== D.System.os && "ios" !== D.System.os && "android" !== D.System.os, assetDomain: "https://newassets.hcaptcha.com", assetUrl: "https://newassets.hcaptcha.com/captcha/v1/7049f0e/static", width: null, height: null, mobile: null },
        z = { se: null, custom: !1, tplinks: "on", language: null, reportapi: "https://accounts.hcaptcha.com", endpoint: "https://hcaptcha.com", endpointOverride: null, size: "normal", theme: "light", assethost: null, imghost: null, recaptchacompat: "true" },
        W = { getCookie: function(e) { var t = document.cookie.replace(/ /g, "").split(";"); try { for (var n = "", i = t.length; i-- && !n;) t[i].indexOf(e) >= 0 && (n = t[i]); return n } catch (rn) { return "" } }, hasCookie: function(e) { return !!W.getCookie(e) }, supportsAPI: function() { try { return "hasStorageAccess" in document && "requestStorageAccess" in document } catch (rn) { return !1 } }, hasAccess: function() { return new Promise((function(e) { document.hasStorageAccess().then((function() { e(!0) }))["catch"]((function() { e(!1) })) })) }, requestAccess: function() { try { return document.requestStorageAccess() } catch (rn) { return Promise.resolve() } } };

    function U(e) { this.r = 255, this.g = 255, this.b = 255, this.a = 1, this.h = 1, this.s = 1, this.l = 1, this.parseString(e) }

    function F(e, t, n) { return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + 6 * (t - e) * n : n < .5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e }
    U.hasAlpha = function(e) { return "string" == typeof e && (-1 !== e.indexOf("rgba") || 9 === e.length && "#" === e[0]) }, U.prototype.parseString = function(e) { e && (0 === e.indexOf("#") ? this.fromHex(e) : 0 === e.indexOf("rgb") && this.fromRGBA(e)) }, U.prototype.fromHex = function(e) { var t = 1;
        9 === e.length && (t = parseInt(e.substr(7, 2), 16) / 255); var n = (e = e.substr(1, 6)).replace(/^([a-f\d])([a-f\d])([a-f\d])?$/i, (function(e, t, n, i) { return t + t + n + n + i + i })),
            i = parseInt(n, 16),
            r = i >> 16,
            o = i >> 8 & 255,
            a = 255 & i;
        this.setRGBA(r, o, a, t) }, U.prototype.fromRGBA = function(e) { var t = e.indexOf("rgba"),
            n = e.substr(t).replace(/rgba?\(/, "").replace(/\)/, "").replace(/[\s+]/g, "").split(","),
            i = Math.floor(parseInt(n[0])),
            r = Math.floor(parseInt(n[1])),
            o = Math.floor(parseInt(n[2])),
            a = parseFloat(n[3]);
        this.setRGBA(i, r, o, a) }, U.prototype.setRGB = function(e, t, n) { this.setRGBA(e, t, n, 1) }, U.prototype.setRGBA = function(e, t, n, i) { this.r = e, this.g = t, this.b = n, this.a = isNaN(i) ? this.a : i, this.updateHSL() }, U.prototype.hsl2rgb = function(e, t, n) { if (0 === t) { var i = Math.round(255 * n); return this.setRGB(i, i, i), this } var r = n <= .5 ? n * (1 + t) : n + t - n * t,
            o = 2 * n - r; return this.r = Math.round(255 * F(o, r, e + 1 / 3)), this.g = Math.round(255 * F(o, r, e)), this.b = Math.round(255 * F(o, r, e - 1 / 3)), this.h = e, this.s = t, this.l = n, this }, U.prototype.updateHSL = function() { var e, t = this.r / 255,
            n = this.g / 255,
            i = this.b / 255,
            r = Math.max(t, n, i),
            o = Math.min(t, n, i),
            a = null,
            s = (r + o) / 2; if (r === o) a = e = 0;
        else { var c = r - o; switch (e = s > .5 ? c / (2 - r - o) : c / (r + o), r) {
                case t:
                    a = (n - i) / c + (n < i ? 6 : 0); break;
                case n:
                    a = (i - t) / c + 2; break;
                case i:
                    a = (t - n) / c + 4 }
            a /= 6 } return this.h = a, this.s = e, this.l = s, this }, U.prototype.getHex = function() { return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1) }, U.prototype.getRGBA = function() { return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")" }, U.prototype.clone = function() { var e = new U; return e.setRGBA(this.r, this.g, this.b, this.a), e }, U.prototype.mix = function(e, t) { e instanceof U || (e = new U(e)); var n = new U,
            i = Math.round(this.r + t * (e.r - this.r)),
            r = Math.round(this.g + t * (e.g - this.g)),
            o = Math.round(this.b + t * (e.b - this.b)); return n.setRGB(i, r, o), n }, U.prototype.blend = function(e, t) { var n;
        e instanceof U || (e = new U(e)); for (var i = [], r = 0; r < t; r++) n = this.mix.call(this, e, r / t), i.push(n); return i }, U.prototype.lightness = function(e) { return e > 1 && (e /= 100), this.hsl2rgb(this.h, this.s, e), this }, U.prototype.saturation = function(e) { return e > 1 && (e /= 100), this.hsl2rgb(this.h, e, this.l), this }, U.prototype.hue = function(e) { return this.hsl2rgb(e / 360, this.s, this.l), this };

    function H(e, t) { e.style.width = "304px", e.style.height = "78px", e.style.backgroundColor = "#f9e5e5", e.style.position = "relative", e.innerHTML = ""; var n = document.createElement("div");
        n.style.width = "284px", n.style.position = "absolute", n.style.top = "12px", n.style.left = "10px", n.style.color = "#7c0a06", n.style.fontSize = "14px", n.style.fontWeight = "normal", n.style.lineHeight = "18px", n.innerHTML = t || "Please <a style='color:inherit;text-decoration:underline; font: inherit' target='_blank' href='https://www.whatismybrowser.com/guides/how-to-update-your-browser/auto'>upgrade your browser</a> to complete this captcha.", e.appendChild(n) } var J = !0;

    function X(e) { var t = { message: e.name + ": " + e.message };
        e.stack && (t.stack_trace = { trace: e.stack }), q("report error", "internal", "debug", t), Y("internal error", "error", N.file) }

    function Y(e, t, n, i) { if (t = t || "error", J) { var r = "warn" === t ? "warning" : t;
            window.Raven && Raven.captureMessage(e, { level: r, logger: n, extra: i }) } }

    function G(e, t, n) { return (n = n || {}).error = t, Y(t.message || "Missing error message", "error", e, n) }

    function q(e, t, n, i) { J && window.Raven && Raven.captureBreadcrumb({ message: e, category: t, level: n, data: i }) } var V = function(e) { var t = []; for (var n in e) { var i = e[n];
            i = "object" == typeof i ? JSON.stringify(i) : i, t.push([encodeURIComponent(n), encodeURIComponent(i)].join("=")) } return t.join("&") };

    function Q(e) { var t = [].slice.call(arguments, 1); "string" == typeof e ? window[e] ? "function" == typeof window[e] ? window[e].apply(null, t) : console.log("[hCaptcha] Callback '" + e + "' is not a function.") : console.log("[hCaptcha] Callback '" + e + "' is not defined.") : "function" == typeof e ? e.apply(null, t) : console.log("[hcaptcha] Invalid callback '" + e + "'.") }

    function K() { try { Q.apply(null, arguments) } catch (nn) { console.error("[hCaptcha] There was an error in your callback."), console.error(nn) } } var Z = { UUID: function(e) { return /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i.test(e) || !1 }, UUIDv4: function(e) { return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e) || !1 }, URL: function(e) { var t = new RegExp("^(http|https)://"),
                n = new RegExp("^((?!(data|javascript):).)*$"); return t.test(e) && n.test(e) } };

    function ee(e, t) { var n, i = "attempts" in (t = t || {}) ? t.attempts : 1,
            r = t.delay || 0,
            o = t.onFail; return n = function(t, n, a) { e().then(t, (function(e) { var t = i-- > 0;
                o && (t = !1 !== o(e) && t), t ? setTimeout(a, r) : n(e) })) }, new Promise((function(e, t) { n(e, t, (function i() { n(e, t, i) })) })) } var te = { eventName: function(e) { var t = e; return "down" === e || "up" === e || "move" === e || "over" === e || "out" === e ? t = !D.System.mobile || "down" !== e && "up" !== e && "move" !== e ? "mouse" + e : "down" === e ? "touchstart" : "up" === e ? "touchend" : "touchmove" : "enter" === e && (t = "keydown"), t }, actionName: function(e) { var t = e; return "touchstart" === t || "mousedown" === t ? t = "down" : "touchmove" === t || "mousemove" === t ? t = "move" : "touchend" === t || "mouseup" === t ? t = "up" : "mouseover" === t ? t = "over" : "mouseout" === t && (t = "out"), t }, eventCallback: function(e, t, n) { var i = te.actionName(e); return function(r) { if (r = r || window.event, "down" === i || "move" === i || "up" === i || "over" === i || "out" === i || "click" === i) { var o = te.eventCoords(r); if (!o) return; var a = n.getBoundingClientRect();
                        r.windowX = o.x, r.windowY = o.y, r.elementX = r.windowX - (a.x || a.left), r.elementY = r.windowY - (a.y || a.top) }
                    r.keyNum = r.which || r.keyCode || 0, "enter" === e && 13 !== r.keyNum && 32 !== r.keyNum || (r.action = i, r.targetElement = n, t(r)) } }, eventCoords: function(e) { if (!e) return null; var t = e; if (e.touches || e.changedTouches) { var n = e.touches && e.touches.length >= 1 ? e.touches : e.changedTouches;
                    n && n[0] && (t = n[0]) } return "number" == typeof t.pageX && "number" == typeof t.pageY ? { x: t.pageX, y: t.pageY } : "number" == typeof t.clientX && "number" == typeof t.clientY ? { x: t.clientX, y: t.clientY } : null } },
        ne = ["Webkit", "Moz", "ms"],
        ie = document.createElement("div").style,
        re = {};

    function oe(e) { var t = re[e]; return t || (e in ie ? e : re[e] = function(e) { for (var t = e[0].toUpperCase() + e.slice(1), n = ne.length; n--;)
                if ((e = ne[n] + t) in ie) return e }(e) || e) }

    function ae(e, t, n) { if (this.dom = null, this._clss = [], this._nodes = [], this._listeners = [], this._frag = null, e && "object" == typeof e) { this.dom = e; var i = [],
                r = []; "string" == typeof e.className && (r = e.className.split(" ")); for (var o = 0; o < r.length; o++) "" !== r[o] && " " !== r[o] && i.push(r[o]);
            this._clss = i } else n !== undefined && null !== n || (n = !0), (!e || "string" == typeof e && (e.indexOf("#") >= 0 || e.indexOf(".") >= 0)) && (e && (t = e), e = "div"), this.dom = document.createElement(e), t && (t.indexOf("#") >= 0 ? this.dom.id = t.split("#")[1] : (t.indexOf(".") >= 0 && (t = t.split(".")[1]), this.addClass.call(this, t)));!0 === n && (this._frag = document.createDocumentFragment(), this._frag.appendChild(this.dom)) }
    ae.prototype.createElement = function(e, t) { var n = new ae(e, t, !1); return this.appendElement.call(this, n), this._nodes.push(n), n }, ae.prototype.appendElement = function(e) { if (e === undefined) return X({ name: "DomElement Add Child", message: "Child Element is undefined" }); var t;
        t = e._frag !== undefined && null !== e._frag ? e._frag : e.dom !== undefined ? e.dom : e; try { e instanceof ae && (e._parent = this), this.dom.appendChild(t) } catch (rn) { X({ name: "DomElement Add Child", message: "Failed to append child." }) } return this }, ae.prototype.removeElement = function(e) { try { var t; if (e._nodes)
                for (t = e._nodes.length; t--;) e.removeElement(e._nodes[t]); for (t = this._nodes.length; --t > -1;) this._nodes[t] === e && this._nodes.splice(t, 1);
            this.dom.removeChild(e.dom || e), e.__destroy && e.__destroy() } catch (rn) { X({ name: "DomElement Remove Child", message: "Failed to remove child." }) } }, ae.prototype.addClass = function(e) { return !1 === this.hasClass.call(this, e) && (this._clss.push(e), this.dom.className = this._clss.join(" ")), this }, ae.prototype.hasClass = function(e) { for (var t = -1 !== this.dom.className.split(" ").indexOf(e), n = this._clss.length; n-- && !t;) t = this._clss[n] === e; return t }, ae.prototype.removeClass = function(e) { for (var t = this._clss.length; --t > -1;) this._clss[t] === e && this._clss.splice(t, 1); return this.dom.className = this._clss.join(" "), this }, ae.prototype.text = function(e) { if (this && this.dom) { if (!e) return this.dom.textContent; for (var t, n, i, r, o = /&(.*?);/g, a = /<[a-z][\s\S]*>/i; null !== (t = o.exec(e));) {!1 === a.test(t[0]) ? (i = t[0], r = void 0, (r = document.createElement("div")).innerHTML = i, n = r.textContent, e = e.replace(new RegExp(t[0], "g"), n)) : e = e.replace(t[0], "") } return this.dom.textContent = e, this } }, ae.prototype.content = ae.prototype.text, ae.prototype.css = function(e) { var t, n = "ie" === D.Browser.type && 8 === D.Browser.version; for (var i in e) { t = e[i]; try { "opacity" !== i && "zIndex" !== i && "fontWeight" !== i && isFinite(t) && parseFloat(t) === t && (t += "px"); var r = oe(i);
                n && "opacity" === i ? this.dom.style.filter = "alpha(opacity=" + 100 * t + ")" : n && U.hasAlpha(t) ? this.dom.style[r] = new U(t).getHex() : this.dom.style[r] = t } catch (nn) {} } return this }, ae.prototype.backgroundImage = function(e, t, n, i) { var r = t !== undefined && n !== undefined,
            o = { "-ms-high-contrast-adjust": "none" }; if ("object" == typeof t && (i = t), i === undefined && (i = {}), r) { var a = e.width / e.height,
                s = t,
                c = s / a;
            i.cover && c < n && (s = (c = n) * a), i.contain && c > n && (s = (c = n) * a), o.width = s, o.height = c, i.center && (o.marginLeft = -s / 2, o.marginTop = -c / 2, o.position = "absolute", o.left = "50%", o.top = "50%"), (i.left || i.right) && (o.left = i.left || 0, o.top = i.top || 0) } "ie" === D.Browser.type && 8 === D.Browser.version ? o.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + e.src + "',sizingMethod='scale')" : (o.background = "url(" + e.src + ")", o.backgroundPosition = "50% 50%", o.backgroundRepeat = "no-repeat", o.backgroundSize = r ? s + "px " + c + "px" : i.cover ? "cover" : i.contain ? "contain" : "100%"), this.css.call(this, o) }, ae.prototype.setAttribute = function(e, t) { var n; if ("object" == typeof e)
            for (var i in e) n = e[i], this.dom.setAttribute(i, n);
        else this.dom.setAttribute(e, t) }, ae.prototype.removeAttribute = function(e, t) { var n; if ("object" == typeof e)
            for (var i in e) n = e[i], this.dom.removeAttribute(i, n);
        else this.dom.removeAttribute(e, t) }, ae.prototype.addEventListener = function(e, t, n) { var i = { event: te.eventName(e), handler: te.eventCallback(e, t, this.dom), callback: t };
        this._listeners.push(i), this.dom.addEventListener ? this.dom.addEventListener(i.event, i.handler, n) : this.dom.attachEvent("on" + i.event, i.handler) }, ae.prototype.removeEventListener = function(e, t, n) { for (var i, r = this._listeners.length; --r > -1;)(i = this._listeners[r]).event === e && i.callback === t && (this._listeners.splice(r, 1), this.dom.removeEventListener ? this.dom.removeEventListener(i.event, i.handler, n) : this.dom.detachEvent("on" + i.event, i.handler)) }, ae.prototype.focus = function() { this.dom.focus() }, ae.prototype.blur = function() { this.dom.blur() }, ae.prototype.html = function(e) { return e && (this.dom.innerHTML = e), this.dom.innerHTML }, ae.prototype.__destroy = function() { for (var e, t = this._listeners.length; --t > -1;) e = this._listeners[t], this._listeners.splice(t, 1), this.dom.removeEventListener ? this.dom.removeEventListener(e.event, e.handler) : this.dom.detachEvent("on" + e.event, e.handler); return this.dom = null, this._clss = [], this._nodes = [], this._listeners = [], this._frag = null, e = null, null }; var se = "challenge-passed",
        ce = "challenge-escaped",
        he = "challenge-closed",
        le = "challenge-expired",
        de = "invalid-data",
        ue = "bundle-error",
        pe = "network-error",
        fe = "rate-limited",
        me = "challenge-error",
        ge = "incomplete-answer",
        ye = "missing-captcha",
        ve = "missing-sitekey",
        we = "invalid-captcha-id";

    function be(e) { if (null === e) return ""; var t = []; return _e(e, t), t.join("&") }

    function _e(e, t) { var n, i; if ("object" == typeof e)
            for (i in e) !0 === xe(n = e[i]) ? _e(n, t) : t[t.length] = Ce(i, n);
        else if (!0 === Array.isArray(e))
            for (var r = 0; r < e.length; r++) !0 === xe(n = e[r]) ? _e(e, t) : t[t.length] = Ce(i, n);
        else t[t.length] = Ce(e) }

    function xe(e) { return !0 === Array.isArray(e) || "object" == typeof e }

    function Ce(e, t) { return encodeURIComponent(e) + "=" + encodeURIComponent(null === t ? "" : t) } var ke = { af: "Afrikaans", sq: "Albanian", am: "Amharic", ar: "Arabic", hy: "Armenian", az: "Azerbaijani", eu: "Basque", be: "Belarusian", bn: "Bengali", bg: "Bulgarian", bs: "Bosnian", my: "Burmese", ca: "Catalan", ceb: "Cebuano", zh: "Chinese", "zh-CN": "Chinese Simplified", "zh-TW": "Chinese Traditional", co: "Corsican", hr: "Croatian", cs: "Czech", da: "Danish", nl: "Dutch", en: "English", eo: "Esperanto", et: "Estonian", fa: "Persian", fi: "Finnish", fr: "French", fy: "Frisian", gd: "Gaelic", gl: "Galacian", ka: "Georgian", de: "German", el: "Greek", gu: "Gujurati", ht: "Haitian", ha: "Hausa", haw: "Hawaiian", he: "Hebrew", hi: "Hindi", hmn: "Hmong", hu: "Hungarian", is: "Icelandic", ig: "Igbo", id: "Indonesian", ga: "Irish", it: "Italian", ja: "Japanese", jw: "Javanese", kn: "Kannada", kk: "Kazakh", km: "Khmer", rw: "Kinyarwanda", ky: "Kirghiz", ko: "Korean", ku: "Kurdish", lo: "Lao", la: "Latin", lv: "Latvian", lt: "Lithuanian", lb: "Luxembourgish", mk: "Macedonian", mg: "Malagasy", ms: "Malay", ml: "Malayalam", mt: "Maltese", mi: "Maori", mr: "Marathi", mn: "Mongolian", ne: "Nepali", no: "Norwegian", ny: "Nyanja", or: "Oriya", pl: "Polish", "pt-BR": "Portuguese (Brazil)", pt: "Portuguese (Portugal)", ps: "Pashto", pa: "Punjabi", ro: "Romanian", ru: "Russian", sm: "Samoan", sn: "Shona", sd: "Sindhi", si: "Singhalese", sr: "Serbian", sk: "Slovak", sl: "Slovenian", so: "Somani", st: "Southern Sotho", es: "Spanish", su: "Sundanese", sw: "Swahili", sv: "Swedish", tl: "Tagalog", tg: "Tajik", ta: "Tamil", tt: "Tatar", te: "Teluga", th: "Thai", tr: "Turkish", tk: "Turkmen", ug: "Uyghur", uk: "Ukrainian", ur: "Urdu", uz: "Uzbek", vi: "Vietnamese", cy: "Welsh", xh: "Xhosa", yi: "Yiddish", yo: "Yoruba", zu: "Zulu" },
        Ee = { zh: { "I am human": "æˆ‘æ˜¯äºº" }, ar: { "I am human": "Ø£Ù†Ø§ Ø§Ù„Ø¥Ù†Ø³Ø§Ù†" }, af: { "I am human": "Ek is menslike" }, am: { "I am human": "áŠ¥áŠ” áˆ°á‹ áŠáŠ" }, hy: { "I am human": "ÔµÕ½ Õ´Õ¡Ö€Õ¤ Õ¥Õ´" }, az: { "I am human": "MÉ™n insanam" }, eu: { "I am human": "Gizakia naiz" }, bn: { "I am human": "à¦†à¦®à¦¿ à¦®à¦¾à¦¨à¦¬ à¦¨à¦‡" }, bg: { "I am human": "ÐÐ· ÑÑŠÐ¼ Ñ‡Ð¾Ð²ÐµÐº" }, ca: { "I am human": "SÃ³c humÃ " }, hr: { "I am human": "Ja sam Äovjek" }, cs: { "I am human": "Jsem ÄlovÄ›k" }, da: { "I am human": "Jeg er et menneske" }, nl: { "I am human": "Ik ben een mens" }, et: { "I am human": "Ma olen inimeste" }, fi: { "I am human": "Olen ihminen" }, fr: { "I am human": "Je suis humain" }, gl: { "I am human": "Eu son humano" }, ka: { "I am human": "áƒ›áƒ” áƒ•áƒáƒ  áƒáƒ“áƒáƒ›áƒ˜áƒáƒœáƒ˜" }, de: { "I am human": "Ich bin ein Mensch" }, el: { "I am human": "Î•Î¯Î¼Î±Î¹ Î¬Î½Î¸ÏÏ‰Ï€Î¿Ï‚" }, gu: { "I am human": "àª¹à«àª‚ àª®àª¾àª¨àªµ àª›à«àª‚" }, iw: { "I am human": ". ×× ×™ ×× ×•×©×™" }, hi: { "I am human": "à¤®à¥ˆà¤‚ à¤®à¤¾à¤¨à¤µ à¤¹à¥‚à¤‚" }, hu: { "I am human": "Nem vagyok robot" }, is: { "I am human": "Ã‰g er manneskja" }, id: { "I am human": "Aku manusia" }, it: { "I am human": "Sono un essere umano" }, ja: { "I am human": "ç§ã¯äººé–“ã§ã™" }, kn: { "I am human": "à²¨à²¾à²¨à³ à²®à²¾à²¨à²µà²¨à³" }, ko: { "I am human": "ì‚¬ëžŒìž…ë‹ˆë‹¤" }, lo: { "I am human": "àº‚à»‰àº­àºà»€àº›àº±àº™àº¡àº°àº™àº¸àº”" }, lv: { "I am human": "Es esmu cilvÄ“ks" }, lt: { "I am human": "AÅ¡ esu Å¾mogaus" }, ms: { "I am human": "Saya manusia" }, ml: { "I am human": "à´žà´¾àµ» à´®à´¨àµà´·àµà´¯à´¨à´¾à´£àµ" }, mr: { "I am human": "à¤®à¥€ à¤®à¤¾à¤¨à¤µà¥€ à¤†à¤¹à¥‡" }, mn: { "I am human": "Ð‘Ð¸ Ð±Ð¾Ð» Ñ…Ò¯Ð½" }, no: { "I am human": "Jeg er menneskelig" }, fa: { "I am human": "Ù…Ù† Ø§Ù†Ø³Ø§Ù†ÛŒ Ù‡Ø³ØªÙ…" }, pl: { "I am human": "Jestem czÅ‚owiekiem" }, pt: { "I am human": "Sou humano" }, ro: { "I am human": "Eu sunt om" }, ru: { "I am human": "Ð¯ Ñ‡ÐµÐ»Ð¾Ð²ÐµÐº" }, sr: { "I am human": "Ja sam ljudski" }, si: { "I am human": "à¶¸à¶¸ à¶¸à·’à¶±à·’à·ƒà·Šà·ƒà·”" }, sk: { "I am human": "Ja som Älovek" }, sl: { "I am human": "Jaz sem ÄloveÅ¡ki" }, es: { "I am human": "Soy humano" }, sw: { "I am human": "Mimi ni binadamu" }, sv: { "I am human": "Jag Ã¤r mÃ¤nniska" }, ta: { "I am human": "à®¨à®¾à®©à¯ à®®à®©à®¿à®¤" }, te: { "I am human": "à°¨à±‡à°¨à± à°®à°¨à°¿à°·à°¿à°¨à°¿" }, th: { "I am human": "à¸œà¸¡à¸¡à¸™à¸¸à¸©à¸¢à¹Œ" }, tr: { "I am human": "Ben bir insanÄ±m" }, uk: { "I am human": "Ð¯ Ð»ÑŽÐ´Ð¸Ð½Ð¸" }, ur: { "I am human": "Ù…ÛŒÚº Ø§Ù†Ø³Ø§Ù† ÛÙˆÚº" }, vi: { "I am human": "TÃ´i lÃ  con ngÆ°á»i" }, zu: { "I am human": "Ngingumuntu" } },
        Oe = null,
        Se = { translate: function(e, t) { var n = Se.getBestTrans(Ee),
                    i = n && n[e]; if (i = i || e, t)
                    for (var r = Object.keys(t), o = r.length; o--;) i = i.replace(new RegExp("{{" + r[o] + "}}", "g"), t[r[o]]); return i }, getBestTrans: function(e) { var t = Se.getLocale(); return t in e ? e[t] : Se.getShortLocale(t) in e ? e[Se.getShortLocale(t)] : "en" in e ? e.en : null }, getLocale: function() { var e = Oe || window.navigator.userLanguage || window.navigator.language,
                    t = Se.getShortLocale(e); return "in" === t && (e = "id"), "iw" === t && (e = "he"), "nb" === t && (e = "no"), "ji" === t && (e = "yi"), "zh-CN" === e && (e = "zh"), "jv" === t && (e = "jw"), ke[e] ? e : ke[t] ? t : "en" }, setLocale: function(e) { Oe = e }, getShortLocale: function(e) { return e.indexOf("-") >= 0 ? e.substring(0, e.indexOf("-")) : e }, isShortLocale: function(e) { return 2 === e.length || 3 === e.length }, addTable: function(e, t) { if (t || (t = Object.create(null)), Ee[e]) { var n = Ee[e]; for (var i in t) n[i] = t[i] } else Ee[e] = t; return Ee[e] }, getTable: function(e) { return Ee[e] }, addTables: function(e) { for (var t in e) Se.addTable(t, e[t]); return Ee }, getTables: function() { return Ee } },
        Be = { 400: "Rate limited or network error. Please retry.", 429: "Your computer or network has sent too many requests.", 500: "Cannot contact hCaptcha. Check your connection and try again." },
        Ie = function(e) { try { return Se.translate(Be[e]) } catch (rn) { return !1 } },
        Pe = "undefined" != typeof XDomainRequest && !("withCredentials" in XMLHttpRequest.prototype);

    function Te(e, t, n) { n = n || {}; var i = { url: t, method: e.toUpperCase(), responseType: n.responseType || "string", dataType: n.dataType || null, withCredentials: n.withCredentials || !1, headers: n.headers || null, data: n.data || null, timeout: n.timeout || null }; return i.legacy = i.withCredentials && Pe, i.data && ("json" === i.dataType && "object" == typeof i.data && (i.data = JSON.stringify(i.data)), "query" === i.dataType && (i.data = be(i.data))), n.retry ? ee((function() { return Ae(i) }), n.retry) : Ae(i) }

    function Ae(e) { var t = e.legacy ? new XDomainRequest : new XMLHttpRequest,
            n = "function" == typeof e.url ? e.url() : e.url; return new Promise((function(i, r) { var o, a = function(o) { return function() { var a = t.response || t.responseText,
                        s = t.statusText || "",
                        c = t.status,
                        h = t.readyState; if (4 === h || e.legacy) { if ("json" === e.responseType && a) try { a = JSON.parse(a) } catch (l) {}
                        if ("error" === o || c >= 400 && c <= 511) return void r({ event: pe, endpoint: n, response: a, state: h, status: c, message: Ie(c || 400) || s });
                        i({ state: h, status: c, body: a, message: s }) } } }; if ((t.onload = a("complete"), t.onerror = t.ontimeout = a("error"), t.open(e.method, n), e.timeout && (t.timeout = e.timeout), !e.legacy) && (t.withCredentials = e.withCredentials, e.headers))
                for (var s in e.headers) o = e.headers[s], t.setRequestHeader(s, o);
            setTimeout((function() { t.send(e.data) }), 0) })) } var je = function(e, t) { if ("object" == typeof e && t === undefined && (e = (t = e).url), null === e) throw new Error("Url missing"); return Te("GET", e, t) },
        Me = function(e) { return e.toLowerCase().match(/\.(?:jpg|gif|png|jpeg|svg)$/g) ? "image" : e.toLowerCase().match(/\.(?:js)$/g) ? "script" : "file" },
        $e = function(e) { if (z.assethost && e.indexOf(N.assetDomain) >= 0) return z.assethost + e.replace(N.assetDomain, ""); if (z.imghost && e.indexOf("imgs") >= 0) { var t = e.indexOf(".ai") >= 0 ? e.indexOf(".ai") + 3 : e.indexOf(".com") + 4; return z.imghost + e.substr(t, e.length) } return e },
        Le = ["svg", "gif", "png"];

    function Re(e, t) { t = t || {}; var n, i = e; if (0 === i.indexOf("data:image"))
            for (var r = !1, o = Le.length, a = -1; a++ < o && !r;)(r = i.indexOf(Le[a]) >= 0) && (n = Le[a]);
        else n = i.substr(i.lastIndexOf(".") + 1, i.length);!!(!document.createElementNS || !document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect) && t.fallback && (t.fallback.indexOf(".") >= 0 ? n = (i = t.fallback).substr(i.lastIndexOf(".") + 1, i.length) : (i = e.substr(0, e.indexOf(n)) + t.fallback, n = t.fallback)), t.prefix && (i = t.prefix + "/" + i), this.attribs = { crossOrigin: t.crossOrigin || null }, this.id = i, this.src = $e(i), this.ext = n, this.width = 0, this.height = 0, this.aspect = 0, this.loaded = !1, this.error = !1, this.element = null, this.cb = { load: [], error: [] } }

    function De(e, t, n) { for (var i = e[t], r = i.length, o = null; --r > -1;) o = i[r], i.splice(r, 1), o(n); "error" === t ? e.load = [] : e.error = [] }

    function Ne(e, t) { var n = e;
        t || (t = {}), t.prefix && (n = t.prefix + "/" + e), this.attribs = { defer: t.defer || null, async: t.async || null, crossOrigin: t.crossOrigin || null }, this.id = n, this.src = $e(n), this.loaded = !1, this.error = !1, this.element = null, this.cb = { load: [], error: [] } }

    function ze(e, t, n) { for (var i = e[t], r = i.length, o = null; --r > -1;) o = i[r], i.splice(r, 1), o(n); "error" === t ? e.load = [] : e.error = [] }

    function We(e, t) { var n = e;
        t || (t = {}), t.prefix && (n = t.prefix + "/" + e), this.id = n, this.src = $e(n), this.loaded = !1, this.error = !1, this.cb = { load: [], error: [] }, this.data = null }

    function Ue(e, t, n) { for (var i = e[t], r = i.length, o = null; --r > -1;) o = i[r], i.splice(r, 1), o(n); "error" === t ? e.load = [] : e.error = [] }
    Re.prototype.load = function() { return ("svg" === this.ext ? this._loadSvg() : this._loadImg())["catch"]((function(e) { throw Y("Asset failed", "error", "assets", { error: e }), e })) }, Re.prototype._loadSvg = function() { var e, t = this,
            n = this.src,
            i = this.id; if (0 === n.indexOf("data:image/svg+xml")) { var r = n.slice("data:image/svg+xml,".length);
            e = Promise.resolve(decodeURIComponent(r)) } else e = je(n).then((function(e) { return e.body })); return e.then((function(e) { var n = (new DOMParser).parseFromString(e, "image/svg+xml").documentElement,
                i = parseInt(n.getAttribute("width")),
                r = parseInt(n.getAttribute("height")); return t._imgLoaded(n, i, r), t }))["catch"]((function(e) { t.error = !0; var n = (e && e.message ? e.message : e || "Loading Error") + ": " + i; throw De(t.cb, "error", n), n })) }, Re.prototype._loadImg = function() { var e = this,
            t = this.attribs,
            n = this.src,
            i = this.id; return new Promise((function(r, o) { var a = new Image;
            t.crossOrigin && (a.crossOrigin = t.crossOrigin), a.onerror = function() { e.error = !0, a.onload = a.onerror = null; var t = "Loading Error: " + i;
                De(e.cb, "error", t), o(t) }, a.onload = function() { e.loaded || (e._imgLoaded(a, a.width, a.height), a.onload = a.onerror = null, r(e)) }, a.src = n, a.complete && a.onload() })) }, Re.prototype._imgLoaded = function(e, t, n) { this.element = new ae(e), this.width = t, this.height = n, this.aspect = t / n, this.loaded = !0, De(this.cb, "load", this) }, Re.prototype.onload = function(e) { this.error || (this.loaded ? e(this) : this.cb.load.push(e)) }, Re.prototype.onerror = function(e) { this.loaded && !this.error || (this.error ? e(this) : this.cb.error.push(e)) }, Ne.prototype.load = function() { var e = this,
            t = this.attribs,
            n = this.src,
            i = this.id; return new Promise((function(r, o) { var a = document.createElement("script");
            e.element = a, a.onerror = function() { e.error = !0, a.onload = a.onreadystatechange = a.onerror = null; var t = "Loading Error: " + i;
                ze(e.cb, "error", t), o(t) }, a.onload = a.onreadystatechange = function() { this.loaded || a.readyState && "loaded" !== a.readyState && "complete" !== a.readyState || (e.loaded = !0, a.onload = a.onreadystatechange = a.onerror = null, document.body.removeChild(a), ze(e.cb, "load", e), r(e)) }, a.type = "text/javascript", a.src = n, t.crossOrigin && (a.crossorigin = t.crossOrigin), t.async && (a.async = !0), t.defer && (a.defer = !0), document.body.appendChild(a), a.complete && a.onload() })) }, Ne.prototype.onload = function(e) { this.error || (this.loaded ? e(this) : this.cb.load.push(e)) }, Ne.prototype.onerror = function(e) { this.loaded && !this.error || (this.error ? e(this) : this.cb.error.push(e)) }, We.prototype.load = function() { var e = this,
            t = this.src,
            n = this.id; return new Promise((function(i, r) { var o = {};
            t.indexOf("json") >= 0 && (o.responseType = "json"), je(t, o).then((function(t) { e.loaded = !0, e.data = t.body, Ue(e.cb, "load", e), i(e) }))["catch"]((function(t) { e.error = !0; var i = (t && t.message ? t.message : "Loading Error") + ": " + n;
                Ue(e.cb, "error", i), r(i) })) })) }, We.prototype.onload = function(e) { this.error || (this.loaded ? e(this) : this.cb.load.push(e)) }, We.prototype.onerror = function(e) { this.loaded && !this.error || (this.error ? e(this) : this.cb.error.push(e)) }; var Fe = [],
        He = { add: function(e, t) { var n = Me(e); return He[n] ? He[n](e, t) : Promise.resolve(null) }, batch: function(e, t) { for (var n = [], i = -1; ++i < e.length;) { var r = e[i];
                    n.push(He.add(r, t)) } return Promise.all(n)["finally"]((function() { n = [] })) }, image: function(e, t) { var n = new Re(e, t); return Fe.push(n), n.load() }, script: function(e, t) { var n = new Ne(e, t); return Fe.push(n), n.load() }, file: function(e, t) { var n = new We(e, t); return Fe.push(n), n.load() }, retrieve: function(e) { return new Promise((function(t, n) { for (var i = Fe.length, r = !1, o = null; --i > -1 && !r;) r = (o = Fe[i]).id === e || -1 !== o.id.indexOf("/" === e[0] ? "" : "/" + e); if (!r) return t(null);
                    o.onload(t), o.onerror(n) })) } },
        Je = [],
        Xe = !1,
        Ye = !1;

    function Ge() { document.addEventListener ? (document.addEventListener("DOMContentLoaded", Ve), window.addEventListener("load", Ve)) : (document.attachEvent("onreadystatechange", qe), window.attachEvent("onload", Ve)), Xe = !0 }

    function qe() { "interactive" !== document.readyState && "loaded" !== document.readyState && "complete" !== document.readyState || Ve() }

    function Ve() { if (!1 === Ye) { for (var e = 0; e < Je.length; e++) Je[e].fn.apply(null, Je[e].args);
            Je = [] }
        Ye = !0, document.removeEventListener ? (document.removeEventListener("DOMContentLoaded", Ve), window.removeEventListener("load", Ve)) : (document.detachEvent("onreadystatechange", qe), window.detachEvent("onload", Ve)) }
    new ae(document); var Qe = new ae(window);

    function Ke(e, t) { this._period = e, this._interval = t, this._date = [], this._data = [], this._prevTimestamp = 0, this._meanPeriod = 0, this._meanCounter = 0 }
    Ke.prototype.getMeanPeriod = function() { return this._meanPeriod }, Ke.prototype.getData = function() { return this._cleanStaleData(), this._data }, Ke.prototype.getSize = function() { return this._cleanStaleData(), this._data.length }, Ke.prototype.getCapacity = function() { return 0 === this._period ? this._interval : Math.ceil(this._interval / this._period) }, Ke.prototype.push = function(e, t) { this._cleanStaleData(); var n = 0 === this._date.length; if (e - (this._date[this._date.length - 1] || 0) >= this._period && (this._date.push(e), this._data.push(t)), !n) { var i = e - this._prevTimestamp;
            this._meanPeriod = (this._meanPeriod * this._meanCounter + i) / (this._meanCounter + 1), this._meanCounter++ }
        this._prevTimestamp = e }, Ke.prototype._cleanStaleData = function() { for (var e = Date.now(), t = this._date.length - 1; t >= 0; t--) { if (e - this._date[t] >= this._interval) { this._date.splice(0, t + 1), this._data.splice(0, t + 1); break } } }; var Ze = { touchstart: "ts", touchend: "te", touchmove: "tm", touchcancel: "tc" },
        et = { mousedown: "md", mouseup: "mu", mousemove: "mm" },
        tt = { keydown: "kd", keyup: "ku" },
        nt = { devicemotion: "dm" },
        it = function(e, t) { var n = et[e],
                i = null; return function(e) { i = function(e) { return [e.windowX, e.windowY, Date.now()] }(e), t(n, i) } },
        rt = function(e, t) { var n = Ze[e],
                i = null; return function(e) { i = function(e) { var t = []; try { var n, i; if (e.touches && e.touches.length >= 1 ? n = e.touches : e.changedTouches && e.changedTouches.length >= 1 && (n = e.changedTouches), n) { for (var r = 0; r < n.length; r++)(i = te.eventCoords(n[r])) && t.push([n[r].identifier, i.x, i.y]);
                            t.push(Date.now()) } return t } catch (rn) { return t } }(e), t(n, i) } },
        ot = function(e, t) { var n = tt[e],
                i = null; return function(e) { i = function(e) { return [e.keyNum, Date.now()] }(e), t(n, i) } },
        at = function(e, t) { var n = nt[e],
                i = null,
                r = []; return function(e) { i = function(e, t) {
                    (e.acceleration === undefined || e.acceleration && e.acceleration.x === undefined) && (e.acceleration = { x: 0, y: 0, z: 0 });
                    (e.rotationRate === undefined || e.rotationRate && e.rotationRate.alpha === undefined) && (e.rotationRate = { alpha: 0, beta: 0, gamma: 0 }); var n = [e.acceleration.x, e.acceleration.y, e.acceleration.z, e.rotationRate.alpha, e.rotationRate.beta, e.rotationRate.gamma, Date.now()],
                        i = []; if (0 === t.length) t = n, i = n;
                    else { for (var r, o = 0, a = 0; a < 6; a++) r = t[a] - n[a], i.push(n[a]), o += Math.abs(r); if (i.push(Date.now()), t = n, o <= 0) return null } return { motion: i, prevmotion: t } }(e, r), null !== i && (r = i.prevmotion, i = i.motion, t(n, i)) } };

    function st() { this._manifest = {}, this.state = { timeBuffers: {}, loadTime: Date.now(), recording: !1, initRecord: !1, record: { mouse: !0, touch: !0, keys: !1, motion: !0 } }, this._recordEvent = this._recordEvent.bind(this) }
    st.prototype.record = function(e, t, n, i) { if (this._manifest.st = Date.now(), this.state.record.mouse = e === undefined ? this.state.record.mouse : e, this.state.record.touch = n === undefined ? this.state.record.touch : n, this.state.record.keys = t === undefined ? this.state.record.keys : t, this.state.record.motion = i === undefined ? this.state.record.motion : i, !1 === this.state.initRecord) { var r = new ae(document.body);
            this.state.record.mouse && (r.addEventListener("mousedown", it("mousedown", this._recordEvent), !0), r.addEventListener("mousemove", it("mousemove", this._recordEvent), !0), r.addEventListener("mouseup", it("mouseup", this._recordEvent), !0)), !0 === this.state.record.keys && (r.addEventListener("keyup", ot("keyup", this._recordEvent), !0), r.addEventListener("keydown", ot("keydown", this._recordEvent), !0)), this.state.record.touch && !0 === D.Browser.hasEvent("touchstart", document.body) && (r.addEventListener("touchstart", rt("touchstart", this._recordEvent), !0), r.addEventListener("touchmove", rt("touchmove", this._recordEvent), !0), r.addEventListener("touchend", rt("touchend", this._recordEvent), !0)), this.state.record.motion && !0 === D.Browser.hasEvent("devicemotion", window) && r.addEventListener("devicemotion", at("devicemotion", this._recordEvent), !0), this.state.initRecord = !0 }
        this.state.recording = !0 }, st.prototype.stop = function() { this.state.recording = !1 }, st.prototype.time = function() { return this.state.loadTime }, st.prototype.getData = function() { for (var e in this.state.timeBuffers) this._manifest[e] = this.state.timeBuffers[e].getData(), this._manifest[e + "-mp"] = this.state.timeBuffers[e].getMeanPeriod(); return this._manifest }, st.prototype.setData = function(e, t) { this._manifest[e] = t }, st.prototype.resetData = function() { this._manifest = {}, this.state.timeBuffers = {} }, st.prototype.circBuffPush = function(e, t) { this._recordEvent(e, t) }, st.prototype._recordEvent = function(e, t) { if (!1 !== this.state.recording) try { var n = t[t.length - 1];
            this.state.timeBuffers[e] || (this.state.timeBuffers[e] = new Ke(16, 15e3)), this.state.timeBuffers[e].push(n, t) } catch (nn) { G("motion", nn) } }; var ct = new st;

    function ht(e, t) { this.cause = e, this.message = t }

    function lt(e) { ht.call(this, we, "Invalid hCaptcha id: " + e) }

    function dt() { ht.call(this, ye, "No hCaptcha exists.") }

    function ut() { ht.call(this, ve, "Missing sitekey - https://hcaptcha.com/docs/configuration#jsapi") }
    ht.prototype = Error.prototype; var pt = [],
        ft = [],
        mt = { add: function(e) { pt.push(e) }, remove: function(e) { for (var t = !1, n = pt.length; --n > -1 && !1 === t;) pt[n].id === e.id && (t = pt[n], pt.splice(n, 1)); return t }, each: function(e) { for (var t = -1; ++t < pt.length;) e(pt[t]) }, isValidId: function(e) { for (var t = !1, n = -1; ++n < pt.length && !1 === t;) pt[n].id === e && (t = !0); return t }, getByIndex: function(e) { for (var t = !1, n = -1; ++n < pt.length && !1 === t;) n === e && (t = pt[n]); return t }, getById: function(e) { for (var t = !1, n = -1; ++n < pt.length && !1 === t;) pt[n].id === e && (t = pt[n]); return t }, getCaptchaIdList: function() { var e = []; return mt.each((function(t) { e.push(t.id) })), e }, pushSession: function(e, t) { ft.push([e, t]), ft.length > 10 && ft.splice(0, ft.length - 10) }, getSession: function() { return ft } };

    function gt(e, t) { "object" != typeof e || t || (t = e, e = null); var n, i, r, o = !0 === (t = t || {}).async,
            a = new Promise((function(e, t) { i = e, r = t })); if (a.resolve = i, a.reject = r, n = e ? mt.getById(e) : mt.getByIndex(0)) ct.setData("exec", !0), o && n.setPromise(a), n.onReady(n.initChallenge, t);
        else if (e) { if (!o) throw new lt(e);
            a.reject(we) } else { if (!o) throw new dt;
            a.reject(ye) } if (o) return a }

    function yt(e) { var t = "",
            n = null;
        n = e ? mt.getById(e) : mt.getByIndex(0); try { for (var i = mt.getSession(), r = i.length, o = !1; --r > -1 && !o;)(o = i[r][1] === n.id) && (t = i[r][0]) } catch (a) { t = "" } return t }

    function vt(e, t) { var n = e instanceof HTMLIFrameElement; try { n ? e.parentNode && e.contentWindow.postMessage(JSON.stringify(t), "*") : e.postMessage(JSON.stringify(t), "*") } catch (nn) { G("messaging", nn) } }

    function wt(e, t) { this.target = e, this.id = t, this.messages = [], this.incoming = [], this.waiting = [] }

    function bt(e, t) { var n = this,
            i = {},
            r = new Promise((function(e, t) { i.resolve = e, i.reject = t })),
            o = { source: "hcaptcha", label: e, id: n.id, promise: null, lookup: t }; return r.then((function(e) { o.promise = "resolve", null !== e && (o.contents = e), vt(n.target, o) }))["catch"]((function(e) { o.promise = "reject", null !== e && (o.error = e), vt(n.target, o) })), i }
    wt.prototype.setID = function(e) { this.id = e }, wt.prototype.contact = function(e, t) { if (!this.id) throw new Error("Chat requires unique id to communicate between windows"); var n = this,
            i = Date.now().toString(36),
            r = { source: "hcaptcha", label: e, id: this.id, promise: "create", lookup: i }; if (t) { if ("object" != typeof t) throw new Error("Message must be an object.");
            r.contents = t } return new Promise((function(t, o) { n.waiting.push({ label: e, reject: o, resolve: t, lookup: i }), vt(n.target, r) })) }, wt.prototype.listen = function(e, t) { if (!this.id) throw new Error("Chat requires unique id to communicate between windows"); for (var n = this.messages.length, i = !1; --n > -1 && !1 === i;) this.messages[n].label === e && (i = this.messages[n]);!1 === i && (i = { label: e, listeners: [] }, this.messages.push(i)), i.listeners.push(t) }, wt.prototype.answer = function(e, t) { if (!this.id) throw new Error("Chat requires unique id to communicate between windows"); for (var n = this.incoming.length, i = !1; --n > -1 && !1 === i;) this.incoming[n].label === e && (i = this.incoming[n]);!1 === i && (i = { label: e, listeners: [] }, this.incoming.push(i)), i.listeners.push(t) }, wt.prototype.send = function(e, t) { if (!this.id) throw new Error("Chat requires unique id to communicate between windows"); var n = { source: "hcaptcha", label: e, id: this.id }; if (t) { if ("object" != typeof t) throw new Error("Message must be an object.");
            n.contents = t }
        vt(this.target, n) }, wt.prototype.check = function(e, t) { for (var n = [].concat.apply([], [this.messages, this.incoming, this.waiting]), i = [], r = -1; ++r < n.length;)
            if (n[r].label === e) { if (t && n[r].lookup && t !== n[r].lookup) continue;
                i.push(n[r]) }
        return i }, wt.prototype.respond = function(e) { for (var t, n, i = -1, r = 0, o = [].concat.apply([], [this.messages, this.incoming, this.waiting]); ++i < o.length;)
            if (o[i].label === e.label) { if (e.lookup && o[i].lookup && e.lookup !== o[i].lookup) continue; var a = []; if (t = o[i], e.error && a.push(e.error), e.contents && a.push(e.contents), e.promise && "create" !== e.promise) { t[e.promise].apply(t[e.promise], a); for (var s = this.waiting.length, c = !1; --s > -1 && !1 === c;) this.waiting[s].label === t.label && this.waiting[s].lookup === t.lookup && (c = !0, this.waiting.splice(s, 1)); continue } for (r = 0; r < t.listeners.length; r++) { if (n = t.listeners[r], "create" === e.promise) { var h = bt.call(this, t.label, e.lookup);
                        a.push(h) }
                    n.apply(n, a) } }
        o = null }, wt.prototype.destroy = function() { return this.messages = null, this.incoming = null, this.waiting = null, null }; var _t = { chats: [], isSupported: function() { return !!window.postMessage }, createChat: function(e, t) { var n = new wt(e, t); return _t.chats.push(n), n }, addChat: function(e) { _t.chats.push(e) }, removeChat: function(e) { for (var t = !1, n = _t.chats.length; --n > -1 && !1 === t;) e.id === _t.chats[n].id && e.target === _t.chats[n].target && (t = _t.chats[n], _t.chats.splice(n, 1)); return t }, handle: function(e) { var t = e.data; if ("string" == typeof t) try { if (!(t.indexOf("hcaptcha") >= 0)) return;
                t = JSON.parse(t); for (var n, i = _t.chats, r = -1; ++r < i.length;)(n = i[r]).id === t.id && n.respond(t) } catch (nn) { q("postMessage handler error", "postMessage", "debug", { event: e, error: nn }) } } };

    function xt() { try { return Object.keys(window).sort().join(",") } catch (rn) { return null } }

    function Ct(e, t) { for (var n in t) { var i = t[n]; switch (typeof i) {
                case "string":
                    e[n] = i; break;
                case "object":
                    e[n] = e[n] || {}, Ct(e[n], i); break;
                default:
                    throw new Error("Source theme contains invalid data types. Only string and object types are supported.") } } }

    function kt(e, t) { try { return e in t } catch (n) { return !1 } }

    function Et(e) { return !!e && "object" == typeof e }

    function Ot(e) { return Et(e) ? St({}, e) : e }

    function St(e, t) { var n, i = {},
            r = Object.keys(e); for (n = 0; n < r.length; n++) i[r[n]] = Ot(e[r[n]]); var o, a, s = Object.keys(t); for (n = 0; n < s.length; n++) { var c = s[n]; if (!(!kt(o = c, a = e) || Object.hasOwnProperty.call(a, o) && Object.propertyIsEnumerable.call(a, o))) return;
            kt(c, e) && Et(e[c]) ? i[c] = St(e[c], t[c]) : i[c] = Ot(t[c]) } return i }
    window.addEventListener ? window.addEventListener("message", _t.handle) : window.attachEvent("onmessage", _t.handle); var Bt = { transparent: "transparent", white: "#ffffff", black: "#000000" },
        It = { 100: "#fafafa", 200: "#f5f5f5", 300: "#E0E0E0", 400: "#D7D7D7", 500: "#BFBFBF", 600: "#919191", 700: "#555555", 800: "#333333", 900: "#222222", 1e3: "#14191F" },
        Pt = "#4DE1D2",
        Tt = "#00838F",
        At = { mode: "light", grey: It, primary: { main: Tt }, secondary: { main: Pt }, warn: { light: "#EB5757", main: "#EB5757", dark: "#DE3F3F" }, text: { heading: It[700], body: It[700] } },
        jt = { mode: "dark", grey: It, primary: { main: Tt }, secondary: { main: Pt }, text: { heading: It[200], body: It[200] } };

    function Mt(e, t) { return "dark" === t && e in jt ? jt[e] : At[e] }

    function $t() { this._themes = Object.create(null), this._active = "light", this.add("light", {}), this.add("dark", { palette: { mode: "dark" } }) }
    $t.prototype.get = function(e) { if (!e) return this._themes[this._active]; var t = this._themes[e]; if (!t) throw new Error("Cannot find theme with name: " + e); return t }, $t.prototype.use = function(e) { this._themes[e] ? this._active = e : console.error("Cannot find theme with name: " + e) }, $t.prototype.active = function() { return this._active }, $t.prototype.add = function(e, t) { t || (t = {}), t.palette = function(e) { e || (e = {}); var t = e.mode || "light",
                n = e.primary || Mt("primary", t),
                i = e.secondary || Mt("secondary", t),
                r = e.warn || Mt("warn", t),
                o = e.grey || Mt("grey", t),
                a = e.text || Mt("text", t); return St({ common: Bt, mode: t, primary: n, secondary: i, grey: o, warn: r, text: a }, e) }(t.palette), t.component = t.component || Object.create(null), this._themes[e] = t }, $t.prototype.extend = function(e, t) { "string" == typeof t && (t = JSON.parse(t)); var n = JSON.parse(JSON.stringify(this.get(e))); return Ct(n, t), n }, $t.merge = function(e, t) { return St(e, t || {}) }; var Lt = ["light", "dark", "contrast", "grey-red"],
        Rt = new $t;

    function Dt(e, t) { this.id = e, this.width = null, this.height = null, this.mobile = !1, this.ready = !1, this.listeners = [], this.config = t, this._visible = !1, this._selected = !1, this.$iframe = new ae("iframe"), this._host = N.host || window.location.hostname; var n = N.assetUrl;
        z.assethost && (n = z.assethost + N.assetUrl.replace(N.assetDomain, "")), this.$iframe.dom.src = n + "/hcaptcha-challenge.html#id=" + this.id + "&host=" + this._host + (t ? "&" + V(this.config) : ""), this.$iframe.dom.title = "Main content of the hCaptcha challenge", this.$iframe.dom.frameBorder = 0, this.$iframe.dom.scrolling = "no", this.setupParentContainer(t), this._hasCustomContainer ? (this._hideIframe(), this._parent.appendChild(this.$iframe.dom)) : (this.$container = new ae("div"), this.$wrapper = this.$container.createElement("div"), this.$overlay = this.$container.createElement("div"), this.$arrow = this.$container.createElement("div"), this.$arrow.fg = this.$arrow.createElement("div"), this.$arrow.bg = this.$arrow.createElement("div"), this.style.call(this), this.$wrapper.appendElement(this.$iframe), this._parent.appendChild(this.$container.dom), this.$container.setAttribute("aria-hidden", !0)), this.chat = _t.createChat(this.$iframe.dom, e) }

    function Nt(e, t, n) { this.id = t, this.response = null, this.location = { tick: null, offset: null, bounding: null }, this.config = n, this._ticked = !0, this.$container = e instanceof ae ? e : new ae(e), this._host = N.host || window.location.hostname, this.$iframe = new ae("iframe"); var i = N.assetUrl;
        z.assethost && (i = z.assethost + N.assetUrl.replace(N.assetDomain, "")), this.$iframe.dom.src = i + "/hcaptcha-checkbox.html#id=" + this.id + "&host=" + this._host + (n ? "&" + V(this.config) : ""), this.$iframe.dom.title = "widget containing checkbox for hCaptcha security challenge", this.$iframe.dom.tabIndex = this.config.tabindex || 0, this.$iframe.dom.frameBorder = "0", this.$iframe.dom.scrolling = "no", this.config.size && "invisible" === this.config.size && this.$iframe.setAttribute("aria-hidden", "true"), this.$iframe.setAttribute("data-hcaptcha-widget-id", t), this.$iframe.setAttribute("data-hcaptcha-response", ""), this.$container.appendElement(this.$iframe), "off" !== z.recaptchacompat && (this.$textArea0 = this.$container.createElement("textarea", "#g-recaptcha-response-" + t), this.$textArea0.dom.name = "g-recaptcha-response", this.$textArea0.css({ display: "none" })), this.$textArea1 = this.$container.createElement("textarea", "#h-captcha-response-" + t), this.$textArea1.dom.name = "h-captcha-response", this.$textArea1.css({ display: "none" }), this.chat = _t.createChat(this.$iframe.dom, t), this.clearLoading = this.clearLoading.bind(this) }

    function zt(e, t, n) { if (!n.sitekey) throw new ut;
        this.id = t, this.visible = !1, this.overflow = { override: !1, cssUsed: !0, value: null, scroll: 0 }, this.onError = null, this.onPass = null, this.onExpire = null, this.onChalExpire = null, this.onOpen = null, this.onClose = null, this._ready = !1, this._active = !1, this._listeners = [], this.config = n, Lt.indexOf(n.theme) >= 0 && Rt.use(n.theme), this._state = { escaped: !1, passed: !1, expiredChallenge: !1, expiredResponse: !1 }, this._origData = null, this._promise = null, this._responseTimer = null, this.challenge = new Dt(t, n), this.checkbox = new Nt(e, t, n), this.initChallenge = this.initChallenge.bind(this), this.closeChallenge = this.closeChallenge.bind(this), this.displayChallenge = this.displayChallenge.bind(this), this.getGetCaptchaManifest = this.getGetCaptchaManifest.bind(this) }

    function Wt(e) { if ("en" === e) return Promise.resolve(); var t = e + ".json"; return new Promise((function(n, i) { He.retrieve(t).then((function(n) { return n || He.file(t, { prefix: "https://newassets.hcaptcha.com/captcha/v1/7049f0e/static/i18n" }).then((function(t) { return Se.addTable(e, t.data), t })) })).then((function(e) { n(e.data) }))["catch"]((function(e) { i(e) })) })) }
    Rt.add("contrast", {}), Rt.add("grey-red", { component: { challenge: { main: { border: "#6a6a6a" } } } }), Dt.prototype.setupParentContainer = function(e) { var t, n = e["challenge-container"];
        n && (t = "string" == typeof n ? document.getElementById(n) : n), t ? (this._hasCustomContainer = !0, this._parent = t) : (this._hasCustomContainer = !1, this._parent = document.body) }, Dt.prototype._hideIframe = function() { var e = {}; "ie" !== D.Browser.type || "ie" === D.Browser.type && 8 !== D.Browser.version ? (e.opacity = 0, e.visibility = "hidden") : e.display = "none", this.$iframe.setAttribute("aria-hidden", !0), this.$iframe.css(e) }, Dt.prototype._showIframe = function() { var e = {}; "ie" !== D.Browser.type || "ie" === D.Browser.type && 8 !== D.Browser.version ? (e.opacity = 1, e.visibility = "visible") : e.display = "block", this.$iframe.removeAttribute("aria-hidden"), this.$iframe.css(e) }, Dt.prototype.style = function() { var e = function(e) { var t = e.palette,
                n = e.component; return $t.merge({ main: { fill: t.common.white, border: t.grey[400] } }, n.challenge) }(Rt.get()); if (this._hasCustomContainer) this.$iframe.css({ border: 0, position: "relative", backgroundColor: e.main.fill });
        else { var t = { backgroundColor: e.main.fill, border: "1px solid " + e.main.border, boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 4px", borderRadius: 4, left: -1e4, top: -1e4, zIndex: -9999999999999, position: "absolute" }; "ie" !== D.Browser.type || "ie" === D.Browser.type && 8 !== D.Browser.version ? (t.transition = "opacity 0.15s ease-out", t.opacity = 0, t.visibility = "hidden") : t.display = "none", this.$container.css(t), this.$wrapper.css({ position: "relative", zIndex: 1 }), this.$overlay.css({ width: "100%", height: "100%", position: "fixed", pointerEvents: "none", top: 0, left: 0, zIndex: 0, backgroundColor: e.main.fill, opacity: .05 }), this.$arrow.css({ borderWidth: 11, position: "absolute", pointerEvents: "none", marginTop: -11, zIndex: 1, right: "100%" }), this.$arrow.fg.css({ borderWidth: 10, borderStyle: "solid", borderColor: "transparent rgb(255, 255, 255) transparent transparent", position: "relative", top: 10, zIndex: 1 }), this.$arrow.bg.css({ borderWidth: 11, borderStyle: "solid", borderColor: "transparent " + e.main.border + " transparent transparent", position: "relative", top: -11, zIndex: 0 }), this.$iframe.css({ border: 0, zIndex: 2e9, position: "relative" }) } }, Dt.prototype.setup = function(e) { return this.chat.send("create-challenge", e) }, Dt.prototype.sendTranslation = function(e) { var t = { locale: e, table: Se.getTable(e) || {} };
        this.chat && this.chat.send("challenge-translate", t) }, Dt.prototype.isVisible = function() { return this._visible }, Dt.prototype.getDimensions = function(e, t) { return this._visible ? this.chat.contact("resize-challenge", { width: e, height: t }) : Promise.resolve(null) }, Dt.prototype.show = function() { if (!0 !== this._visible)
            if (this._visible = !0, this._hasCustomContainer) this._showIframe();
            else { var e = { zIndex: 9999999999999, display: "block" };
                ("ie" !== D.Browser.type || "ie" === D.Browser.type && 8 !== D.Browser.version) && (e.opacity = 1, e.visibility = "visible"), this.$container.css(e), this.$container.removeAttribute("aria-hidden"), this.$overlay.css({ pointerEvents: "auto", cursor: "pointer" }), this.$iframe.dom.focus() } }, Dt.prototype.close = function(e) { if (this._visible = !1, this._hasCustomContainer) return this._hideIframe(), void this.chat.send("close-challenge", { event: e }); var t = { left: -1e4, top: -1e4, zIndex: -9999999999999 }; "ie" !== D.Browser.type || "ie" === D.Browser.type && 8 !== D.Browser.version ? (t.opacity = 0, t.visibility = "hidden") : t.display = "none", this.$container.css(t), this._hasCustomContainer || this.$overlay.css({ pointerEvents: "none", cursor: "default" }), this.chat.send("close-challenge", { event: e }), this.$container.setAttribute("aria-hidden", !0) }, Dt.prototype.size = function(e, t, n) { this.width = e, this.height = t, this.mobile = n, this.$iframe.css({ width: e, height: t }), this._hasCustomContainer || (this.$wrapper.css({ width: e, height: t }), n ? this.$overlay.css({ opacity: .5 }) : this.$overlay.css({ opacity: .05 })) }, Dt.prototype.position = function(e) { if (!this._hasCustomContainer && e) { var t = 10,
                n = window.document.documentElement,
                i = D.Browser.scrollY(),
                r = D.Browser.width(),
                o = D.Browser.height(),
                a = this.mobile || "invisible" === this.config.size || e.offset.left + e.tick.x <= e.tick.width / 2,
                s = Math.round(e.bounding.top) + i !== e.offset.top,
                c = this.height > n.clientHeight,
                h = a ? (r - this.width) / 2 : e.bounding.left + e.tick.right + 10;
            (h + this.width + t > r || h < 0) && (h = (r - this.width) / 2, a = !0); var l = (n.scrollHeight < n.clientHeight ? n.clientHeight : n.scrollHeight) - this.height - t,
                d = a ? (o - this.height) / 2 + i : e.bounding.top + e.tick.y + i - this.height / 2;
            s && d < i && (d = i + t), s && d + this.height >= i + o && (d = i + o - (this.height + t)), d = Math.max(Math.min(d, l), 10); var u = e.bounding.top + e.tick.y + i - d - 10,
                p = this.height - 10 - 30; return u = Math.max(Math.min(u, p), t), this.$container.css({ left: h, top: d }), this.$arrow.fg.css({ display: a ? "none" : "block" }), this.$arrow.bg.css({ display: a ? "none" : "block" }), this.$arrow.css({ top: u }), this.top = d, this.$container.dom.getBoundingClientRect(), c } }, Dt.prototype.destroy = function() { this._visible && this.close.call(this), this._hasCustomContainer ? this._parent.removeChild(this.$iframe.dom) : (this._parent.removeChild(this.$container.dom), this.$container = this.$container.__destroy()), this.$iframe = this.$iframe.__destroy(), _t.removeChat(this.chat), this.chat = this.chat.destroy() }, Dt.prototype.setReady = function(e) { if (this.ready = e, this.ready)
            for (var t, n = this.listeners.length; --n > -1;) t = this.listeners[n], this.listeners.splice(n, 1), t() }, Dt.prototype.onReady = function(e) { var t = Array.prototype.slice.call(arguments, 1),
            n = function() { e.apply(null, t) };
        this.ready ? n() : this.listeners.push(n) }, Dt.prototype.onOverlayClick = function(e) { this._hasCustomContainer || this.$overlay.addEventListener("click", e) }, Dt.prototype.setConfig = function(e) { return this.chat ? this.chat.contact("challenge-update", e) : Promise.resolve() }, Dt.prototype.setData = function(e) { this.chat && this.chat.send("challenge-data", e) }, Nt.prototype.setResponse = function(e) { this.response = e, this.$iframe.dom.setAttribute("data-hcaptcha-response", e), "off" !== z.recaptchacompat && (this.$textArea0.dom.value = e), this.$textArea1.dom.value = e }, Nt.prototype.style = function() { switch (this.config.size) {
            case "compact":
                this.$iframe.css({ width: 164, height: 144 }); break;
            case "invisible":
                this.$iframe.css({ display: "none" }); break;
            default:
                this.$iframe.css({ width: 303, height: 78, overflow: "hidden" }) } }, Nt.prototype.reset = function() { this._ticked = !1, this.chat && this.chat.send("checkbox-reset") }, Nt.prototype.clearLoading = function() { this.chat && this.chat.send("checkbox-clear") }, Nt.prototype.sendTranslation = function(e) { var t = { locale: e, table: Se.getTable(e) || {} };
        this.chat && this.chat.send("checkbox-translate", t) }, Nt.prototype.status = function(e, t) { this.chat && this.chat.send("checkbox-status", { text: e || null, a11yOnly: t || !1 }) }, Nt.prototype.tick = function() { this._ticked = !0, this.chat && this.chat.send("checkbox-tick") }, Nt.prototype.getTickLocation = function() { return this.chat.contact("checkbox-location") }, Nt.prototype.getOffset = function() { var e = this.$iframe.dom;
        e.offsetParent || (e = e.parentElement); for (var t = 0, n = 0; e;) t += e.offsetLeft, n += e.offsetTop, e = e.offsetParent; return { top: n, left: t } }, Nt.prototype.getBounding = function() { return this.$iframe.dom.getBoundingClientRect() }, Nt.prototype.destroy = function() { this._ticked && this.reset(), this.$container.removeElement(this.$iframe), this.$container.removeElement(this.$textArea1), "off" !== z.recaptchacompat && (this.$container.removeElement(this.$textArea0), this.$textArea0 = this.$textArea0.__destroy()), this.$textArea1 = this.$textArea1.__destroy(), this.$container = this.$container.__destroy(), this.$iframe = this.$iframe.__destroy(), _t.removeChat(this.chat), this.chat = this.chat.destroy() }, zt.prototype._resetTimer = function() { null !== this._responseTimer && (clearTimeout(this._responseTimer), this._responseTimer = null) }, zt.prototype.initChallenge = function(e) { e || (e = {}), this._origData = e; var t = this.getGetCaptchaManifest(),
            n = e.charity || null,
            i = e.a11yChallenge || !1,
            r = e.link || null,
            o = e.action || "",
            a = e.rqdata || null,
            s = D.Browser.width(),
            c = D.Browser.height();
        this._active = !0, this._resetTimer(), this._resetState(), this.checkbox.setResponse(""), this.challenge.setup({ a11yChallenge: i, manifest: t, width: s, height: c, charity: n, link: r, action: o, rqdata: a, wdata: xt() }) }, zt.prototype.getGetCaptchaManifest = function() { var e = (this._origData || {}).manifest || null; return e || ((e = Object.create(null)).st = Date.now()), e.v = 1, e.topLevel = ct.getData(), e.session = mt.getSession(), e.widgetList = mt.getCaptchaIdList(), e.widgetId = this.id, e.href = window.location.href, e.prev = JSON.parse(JSON.stringify(this._state)), e }, zt.prototype.displayChallenge = function(e) { if (this._active) { var t = this;
            this.visible = !0; var n = this.checkbox,
                i = this.challenge,
                r = D.Browser.height(); if (!("ie" === D.Browser.type && 8 === D.Browser.version)) { var o = window.getComputedStyle(document.body).getPropertyValue("overflow-y");
                this.overflow.override = "hidden" === o, this.overflow.override && (this.overflow.cssUsed = "" === document.body.style.overflow && "" === document.body.style.overflowY, this.overflow.cssUsed || (this.overflow.value = "" === o ? "auto" : o), this.overflow.scroll = D.Browser.scrollY(), document.body.style.overflowY = "auto") } return new Promise((function(o) { n.status(), n.getTickLocation().then((function(a) { if (t._active) { if (i.size(e.width, e.height, e.mobile), i.show(), n.clearLoading(), n.location.bounding = n.getBounding(), n.location.tick = a, n.location.offset = n.getOffset(), i.position(n.location))(window.document.scrollingElement || document.getElementsByTagName("html")[0]).scrollTop = Math.abs(i.height - r) + i.top;
                        o() } })) })).then((function() { t.onOpen && K(t.onOpen) })) } }, zt.prototype.resize = function(e, t, n) { var i = this,
            r = this.checkbox,
            o = this.challenge;
        o.getDimensions(e, t).then((function(e) { e && o.size(e.width, e.height, e.mobile), r.location.bounding = r.getBounding(), r.location.offset = r.getOffset(), D.System.mobile && !n || o.position(r.location) }))["catch"]((function(e) { i.closeChallenge.call(i, { event: me, message: "Captcha resize caused error.", error: e }) })) }, zt.prototype.position = function() { var e = this.checkbox,
            t = this.challenge;
        D.System.mobile || (e.location.bounding = e.getBounding(), t.position(e.location)) }, zt.prototype.reset = function() { this.checkbox.reset(), this.checkbox.setResponse(""), this._resetTimer(), this._resetState() }, zt.prototype._resetState = function() { for (var e in this._state) this._state[e] = !1 }, zt.prototype.closeChallenge = function(e) { this.visible = !1, this._active = !1; var t = this,
            n = this.checkbox,
            i = this.challenge;
        this.overflow.override && ((window.document.scrollingElement || document.getElementsByTagName("html")[0]).scrollTop = this.overflow.scroll, this.overflow.override = !1, this.overflow.scroll = 0, document.body.style.overflowY = this.overflow.cssUsed ? null : this.overflow.value); var r = e.response || ""; switch (n.setResponse(r), i.close(e.event), n.$iframe.dom.focus(), e.event) {
            case ce:
                this._state.escaped = !0, n.reset(), t.onClose && K(t.onClose), t._promise && t._promise.reject(he); break;
            case le:
                this._state.expiredChallenge = !0, n.reset(), n.status("hCaptcha window closed due to timeout.", !0), t.onChalExpire && K(t.onChalExpire), t._promise && t._promise.reject(le); break;
            case me:
            case ue:
            case pe:
                var o = e.event;
                n.reset(), e.event === pe ? (n.status(e.message), 429 === e.status ? o = fe : "invalid-data" === e.message && (o = de)) : e.event === ue ? o = me : e.event === me && "Answers are incomplete" === e.message && (o = ge), this.onError && K(this.onError, o), t._promise && t._promise.reject(o); break;
            case se:
                this._state.passed = !0, n.tick(), this.onPass && K(this.onPass, r), t._promise && t._promise.resolve({ response: r, key: yt(this.id) }), "number" == typeof e.expiration && (t._resetTimer(), t._responseTimer = setTimeout((function() { try { n.reset(), n.setResponse(""), n.status("hCaptcha security token has expired. Please complete the challenge again.", !0) } catch (nn) { G("global", nn) }
                    t.onExpire && K(t.onExpire), t._responseTimer = null, t._state.expiredResponse = !0 }), 1e3 * e.expiration)) }
        t._promise = null }, zt.prototype.updateTranslation = function(e) { this.checkbox.sendTranslation(e), this.challenge.sendTranslation(e) }, zt.prototype.isReady = function() { return this._ready }, zt.prototype.setReady = function(e) { if (this._ready = e, this._ready)
            for (var t, n = this._listeners.length; --n > -1;) t = this._listeners[n], this._listeners.splice(n, 1), t() }, zt.prototype.setPromise = function(e) { this._promise = e }, zt.prototype.onReady = function(e) { var t = Array.prototype.slice.call(arguments, 1),
            n = function() { e.apply(null, t) };
        this._ready ? n() : this._listeners.push(n) }, zt.prototype.destroy = function() {
        (this._resetTimer(), this.overflow.override) && ((window.document.scrollingElement || document.getElementsByTagName("html")[0]).scrollTop = this.overflow.scroll, this.overflow.override = !1, this.overflow.scroll = 0, document.body.style.overflowY = this.overflow.cssUsed ? null : this.overflow.value);
        this.challenge.destroy(), this.checkbox.destroy(), this.challenge = null, this.checkbox = null }, zt.prototype.setSiteConfig = function(e) { var t = e && e.features && e.features.custom_theme; if (this.config.themeConfig && t) { var n = "custom-" + this.id;
            Rt.add(n, Rt.extend(Rt.active(), this.config.themeConfig)), Rt.use(n), this.challenge.style() } return this.challenge.setConfig({ siteConfig: e, wdata: xt() }) }; var Ut = 0,
        Ft = ["hl", "custom", "tplinks", "sitekey", "theme", "size", "tabindex", "challenge-container"]; var Ht = { render: function(e, t) { if ("string" == typeof e && (e = document.getElementById(e)), e && 1 === e.nodeType)
                if (function(e) { if (!e || !("challenge-container" in e)) return !0; var t = e["challenge-container"]; return "string" == typeof t && (t = document.getElementById(t)), !!t && 1 === t.nodeType }(t)) { if (!1 !== _t.isSupported()) { for (var n, i, r = e.getElementsByTagName("iframe"), o = -1; ++o < r.length && !n;)(i = r[o].getAttribute("data-hcaptcha-widget-id")) && (n = !0); if (n) return console.error("Only one captcha is permitted per parent container."), i; var a = function(e, t) { for (var n = ["hl", "custom", "tplinks", "sitekey", "theme", "type", "size", "tabindex", "callback", "expired-callback", "chalexpired-callback", "error-callback", "open-callback", "close-callback", "endpoint", "challenge-container"], i = {}, r = 0; r < n.length; r++) { var o = n[r],
                                        a = t && t[o];
                                    a || (a = e.getAttribute("data-" + o)), a && (i[o] = a) } return i }(e, t),
                            s = Ut++ + Math.random().toString(36).substr(2),
                            c = Object.create(null);
                        c.sentry = J, c.reportapi = z.reportapi, c.recaptchacompat = z.recaptchacompat, c.custom = z.custom, z.endpointOverride && (c.endpoint = z.endpointOverride), null !== z.language && (c.hl = Se.getLocale()), z.assethost && (c.assethost = z.assethost), z.imghost && (c.imghost = z.imghost), z.tplinks && (c.tplinks = z.tplinks), z.se && (c.se = z.se); for (var h = 0; h < Ft.length; h++) { var l = Ft[h];
                            l in a && (c[l] = a[l]) } if (c.theme = z.theme, a.theme) try { var d = a.theme; "string" == typeof d && (d = JSON.parse(d)), c.themeConfig = d } catch (rn) { c.theme = d }
                        if (e instanceof HTMLButtonElement || e instanceof HTMLInputElement) { var u = new ae("div", ".h-captcha");
                            u.css({ display: "none" }); for (var p = null, f = 0; f < e.attributes.length; f++)(p = e.attributes[f]).name.startsWith("data-") && u.setAttribute(p.name, p.value); var m = e.tagName.toLowerCase() + "[data-hcaptcha-widget-id='" + s + "']";
                            e.setAttribute("data-hcaptcha-widget-id", s), u.setAttribute("data-hcaptcha-source-id", m), e.parentNode.insertBefore(u.dom, e), e.onclick = function(e) { return e.preventDefault(), gt(s) }, e = u, c.size = "invisible" } try { var g = new zt(e, s, c);
                            g.challenge.style(), g.checkbox.style() } catch (nn) { var y = "Your browser plugins or privacy policies are blocking the hCaptcha service. Please disable them for hCaptcha.com"; return nn instanceof ut && (y = "hCaptcha has failed to initialize. Please see the developer tools console for more information.", console.error(nn.message)), void H(e, y) } return a.callback && (g.onPass = a.callback), a["expired-callback"] && (g.onExpire = a["expired-callback"]), a["chalexpired-callback"] && (g.onChalExpire = a["chalexpired-callback"]), a["open-callback"] && (g.onOpen = a["open-callback"]), a["close-callback"] && (g.onClose = a["close-callback"]), a["error-callback"] && (g.onError = a["error-callback"]), ct.setData("inv", "invisible" === c.size), g.checkbox.chat.listen("checkbox-selected", (function(e) { ct.setData("exec", !1), g.onReady(g.initChallenge, e) })), g.checkbox.chat.listen("checkbox-loaded", (function(e) { g.checkbox.location.bounding = g.checkbox.getBounding(), g.checkbox.location.tick = e, g.checkbox.location.offset = g.checkbox.getOffset(), g.checkbox.sendTranslation(c.hl) })), g.checkbox.chat.listen("checkbox-setup", (function(e) { z.endpointOverride && "https://cloudflare.hcaptcha.com" !== z.endpointOverride && (e.endpoint = null), g.challenge.onReady((function() { g.setSiteConfig(e).then((function() { g.setReady(!0) })) })) })), g.challenge.chat.listen("challenge-loaded", (function() { g.challenge.setReady(!0), g.challenge.sendTranslation(c.hl) })), g.challenge.chat.answer("challenge-ready", (function(e, t) { g.displayChallenge(e).then(t.resolve) })), g.challenge.chat.listen("challenge-resize", (function() { var e = D.Browser.width(),
                                t = D.Browser.height();
                            g.resize(e, t) })), g.challenge.chat.listen(he, (function(e) { ct.setData("lpt", Date.now()), g.closeChallenge(e) })), g.challenge.chat.answer("get-url", (function(e) { e.resolve(window.location.href) })), g.challenge.chat.answer("getcaptcha-manifest", (function(e) { e.resolve(g.getGetCaptchaManifest()) })), g.challenge.chat.answer("check-api", (function(e) { e.resolve(ct.getData()) })), g.challenge.chat.listen("challenge-key", (function(e) { mt.pushSession(e.key, g.id) })), g.challenge.onOverlayClick((function() { g.closeChallenge({ event: ce }) })), g.challenge.chat.listen("challenge-language", v), v({ locale: c.hl }, !0), g.challenge.chat.answer("get-ac", (function(e) { e.resolve(W.hasCookie("hc_accessibility")) })), mt.add(g), s }
                    H(e, "Your browser is missing or has disabled Cross-Window Messaging. Please <a style='color:inherit;text-decoration:underline; font: inherit' target='_blank' href='https://www.whatismybrowser.com/guides/how-to-update-your-browser/auto'>upgrade your browser</a> or enable it for hCaptcha.com") } else console.log("[hCaptcha] render: invalid challenge container '" + t["challenge-container"] + "'.");
            else console.log("[hCaptcha] render: invalid container '" + e + "'.");

            function v(e, t) { var n = e.locale;

                function i(e) { if (e) try { e.updateTranslation(n) } catch (nn) { G("translation", nn) } }
                n && Wt(n).then((function() { t ? i(g) : mt.each(i) }))["catch"]((function(e) { G("api", e, { locale: n }) })) } }, reset: function(e) { var t; if (e) { if (!(t = mt.getById(e))) throw new lt(e);
                t.reset() } else { if (!(t = mt.getByIndex(0))) throw new dt;
                t.reset() } }, remove: function(e) { var t = e ? mt.getById(e) : mt.getByIndex(0); if (!t) throw e ? new lt(e) : new dt;
            mt.remove(t), t.destroy(), t = null }, execute: gt, getResponse: function(e) { var t, n; if ((n = e ? mt.getById(e) : mt.getByIndex(0)) && (t = n.checkbox.response || ""), void 0 !== t) return t; throw e ? new lt(e) : new dt }, getRespKey: yt, close: function(e) { var t = !1; if (!(t = e ? mt.getById(e) : mt.getByIndex(0))) throw e ? new lt(e) : new dt;
            t.closeChallenge({ event: ce }) }, setData: function(e, t) { if ("object" != typeof e || t || (t = e, e = null), !t || "object" != typeof t) throw Error("[hCaptcha] invalid data supplied"); var n = !1; if (!(n = e ? mt.getById(e) : mt.getByIndex(0))) throw e ? new lt(e) : new dt; var i = n.challenge.setData.bind(n.challenge);
            n.onReady(i, t) }, nodes: mt };
    N.file = "hcaptcha"; var Jt = document.currentScript,
        Xt = !1,
        Yt = !1,
        Gt = "on",
        qt = D.Browser.width() / D.Browser.height(),
        Vt = window.hcaptcha || !1;

    function Qt() { var e = D.Browser.width(),
            t = D.Browser.height(),
            n = D.System.mobile && qt !== e / t;
        qt = e / t, en(), Ht.nodes.each((function(i) { i.visible && i.resize(e, t, n) })) }

    function Kt(e) { e.preventDefault && e.preventDefault(), Zt(), Ht.nodes.each((function(e) { e.visible && e.position() })) }

    function Zt() { ct.circBuffPush("xy", [D.Browser.scrollX(), D.Browser.scrollY(), document.documentElement.clientWidth / D.Browser.width(), Date.now()]) }

    function en() { ct.circBuffPush("wn", [D.Browser.width(), D.Browser.height(), D.System.dpr(), Date.now()]) }! function(e) { var t = Array.prototype.slice.call(arguments, 1);!0 !== Ye && "interactive" !== document.readyState && "loaded" !== document.readyState && "complete" !== document.readyState ? (Je.push({ fn: e, args: t }), !1 === Xe && Ge()) : setTimeout((function() { e(t) }), 1) }((function() { Vt || (! function() { var e;
            e = Jt ? [Jt] : document.getElementsByTagName("script"); var t = -1,
                n = !1,
                i = null,
                r = null; for (; ++t < e.length && !1 === n;) e[t] && e[t].src && (r = (i = e[t].src.split("?"))[0], /\/(hcaptcha|1\/api)\.js$/.test(r) && (n = e[t], r && -1 !== r.toLowerCase().indexOf("www.") && console.warn("[hCaptcha] JS API is being loaded from www.hcaptcha.com. Please use https://js.hcaptcha.com/1/api.js"))); if (!1 === n) return; var o = function(e) { for (var t, n, i, r = {}, o = e ? e.indexOf("&") >= 0 ? e.split("&") : [e] : [], a = 0; a < o.length; a++)
                    if (o[a].indexOf("=") >= 0) { if (t = o[a].split("="), n = decodeURIComponent(t[0]), "false" !== (i = decodeURIComponent(t[1])) && "true" !== i || (i = "true" === i), "theme" === n || "themeConfig" === n) try { i = JSON.parse(i) } catch (rn) {}
                        r[n] = i }
                return r }(i[1]);
            Xt = o.onload || !1, Yt = o.render || !1, "off" === o.tplinks && (Gt = "off");
            z.tplinks = Gt, z.language = o.hl || null, o.endpoint && (z.endpointOverride = o.endpoint);
            z.reportapi = o.reportapi || z.reportapi, z.imghost = o.imghost || null, z.custom = o.custom || z.custom, z.se = o.se || null, z.assethost = o.assethost || null, z.assethost && !Z.URL(z.assethost) && (z.assethost = null, console.error("Invalid assethost uri."));
            z.recaptchacompat = o.recaptchacompat || z.recaptchacompat, N.host = o.host || window.location.hostname, z.language = z.language || window.navigator.userLanguage || window.navigator.language, Se.setLocale(z.language), a = o.sentry === undefined || o.sentry, void(J = a), "off" === z.recaptchacompat ? console.log("recaptchacompat disabled") : window.grecaptcha = tn; var a }(), function() { var e = Se.getLocale(); if (e.indexOf("en") >= 0) return;
            Wt(e).then((function() { Ht.nodes.each((function(t) { if (t) try { t.updateTranslation(e) } catch (nn) { G("translation", nn) } })) }))["catch"]((function(t) { G("api", t, { locale: e }) })) }(), !1 === Yt || "onload" === Yt ? function(e) { for (var t = document.getElementsByClassName("h-captcha"), n = [], i = 0; i < t.length; i++) n.push(t[i]); var r = []; if ("off" !== z.recaptchacompat)
                for (var o = document.getElementsByClassName("g-recaptcha"), a = 0; a < o.length; a++) r.push(o[a]); for (var s = [].concat(n, r), c = 0; c < s.length; c++) e(s[c]) }(Ht.render) : "explicit" !== Yt && console.log("hcaptcha: invalid render parameter '" + Yt + "', using 'explicit' instead."), Xt && setTimeout((function() { K(Xt) }), 1), function() { try { ct.record(), ct.setData("sc", D.Browser.getScreenDimensions()), ct.setData("nv", D.Browser.interrogateNavigator()), ct.setData("dr", document.referrer), en(), Zt() } catch (nn) {} }(), Qe.addEventListener("resize", Qt), Qe.addEventListener("scroll", Kt)) })); var tn = { render: Ht.render, remove: Ht.remove, execute: Ht.execute, reset: Ht.reset, close: Ht.close, setData: Ht.setData, getResponse: Ht.getResponse, getRespKey: Ht.getRespKey }; return tn }();