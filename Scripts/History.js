///*
//* jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010
//* http://benalman.com/projects/jquery-bbq-plugin/
//* 
//* Copyright (c) 2010 "Cowboy" Ben Alman
//* Dual licensed under the MIT and GPL licenses.
//* http://benalman.com/about/license/
//*/
//(function ($, p) { var i, m = Array.prototype.slice, r = decodeURIComponent, a = $.param, c, l, v, b = $.bbq = $.bbq || {}, q, u, j, e = $.event.special, d = "hashchange", A = "querystring", D = "fragment", y = "elemUrlAttr", g = "location", k = "href", t = "src", x = /^.*\?|#.*$/g, w = /^.*\#/, h, C = {}; function E(F) { return typeof F === "string" } function B(G) { var F = m.call(arguments, 1); return function () { return G.apply(this, F.concat(m.call(arguments))) } } function n(F) { return F.replace(/^[^#]*#?(.*)$/, "$1") } function o(F) { return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1") } function f(H, M, F, I, G) { var O, L, K, N, J; if (I !== i) { K = F.match(H ? /^([^#]*)\#?(.*)$/ : /^([^#?]*)\??([^#]*)(#?.*)/); J = K[3] || ""; if (G === 2 && E(I)) { L = I.replace(H ? w : x, "") } else { N = l(K[2]); I = E(I) ? l[H ? D : A](I) : I; L = G === 2 ? I : G === 1 ? $.extend({}, I, N) : $.extend({}, N, I); L = a(L); if (H) { L = L.replace(h, r) } } O = K[1] + (H ? "#" : L || !K[1] ? "?" : "") + L + J } else { O = M(F !== i ? F : p[g][k]) } return O } a[A] = B(f, 0, o); a[D] = c = B(f, 1, n); c.noEscape = function (G) { G = G || ""; var F = $.map(G.split(""), encodeURIComponent); h = new RegExp(F.join("|"), "g") }; c.noEscape(",/"); $.deparam = l = function (I, F) { var H = {}, G = { "true": !0, "false": !1, "null": null }; $.each(I.replace(/\+/g, " ").split("&"), function (L, Q) { var K = Q.split("="), P = r(K[0]), J, O = H, M = 0, R = P.split("]["), N = R.length - 1; if (/\[/.test(R[0]) && /\]$/.test(R[N])) { R[N] = R[N].replace(/\]$/, ""); R = R.shift().split("[").concat(R); N = R.length - 1 } else { N = 0 } if (K.length === 2) { J = r(K[1]); if (F) { J = J && !isNaN(J) ? +J : J === "undefined" ? i : G[J] !== i ? G[J] : J } if (N) { for (; M <= N; M++) { P = R[M] === "" ? O.length : R[M]; O = O[P] = M < N ? O[P] || (R[M + 1] && isNaN(R[M + 1]) ? {} : []) : J } } else { if ($.isArray(H[P])) { H[P].push(J) } else { if (H[P] !== i) { H[P] = [H[P], J] } else { H[P] = J } } } } else { if (P) { H[P] = F ? i : "" } } }); return H }; function z(H, F, G) { if (F === i || typeof F === "boolean") { G = F; F = a[H ? D : A]() } else { F = E(F) ? F.replace(H ? w : x, "") : F } return l(F, G) } l[A] = B(z, 0); l[D] = v = B(z, 1); $[y] || ($[y] = function (F) { return $.extend(C, F) })({ a: k, base: k, iframe: t, img: t, input: t, form: "action", link: k, script: t }); j = $[y]; function s(I, G, H, F) { if (!E(H) && typeof H !== "object") { F = H; H = G; G = i } return this.each(function () { var L = $(this), J = G || j()[(this.nodeName || "").toLowerCase()] || "", K = J && L.attr(J) || ""; L.attr(J, a[I](K, H, F)) }) } $.fn[A] = B(s, A); $.fn[D] = B(s, D); b.pushState = q = function (I, F) { if (E(I) && /^#/.test(I) && F === i) { F = 2 } var H = I !== i, G = c(p[g][k], H ? I : {}, H ? F : 2); p[g][k] = G + (/#/.test(G) ? "" : "#") }; b.getState = u = function (F, G) { return F === i || typeof F === "boolean" ? v(F) : v(G)[F] }; b.removeState = function (F) { var G = {}; if (F !== i) { G = u(); $.each($.isArray(F) ? F : arguments, function (I, H) { delete G[H] }) } q(G, 2) }; e[d] = $.extend(e[d], { add: function (F) { var H; function G(J) { var I = J[D] = c(); J.getState = function (K, L) { return K === i || typeof K === "boolean" ? l(I, K) : l(I, L)[K] }; H.apply(this, arguments) } if ($.isFunction(F)) { H = F; return G } else { H = F.handler; F.handler = G } } }) })(jQuery, this);
///*
//* jQuery hashchange event - v1.2 - 2/11/2010
//* http://benalman.com/projects/jquery-hashchange-plugin/
//* 
//* Copyright (c) 2010 "Cowboy" Ben Alman
//* Dual licensed under the MIT and GPL licenses.
//* http://benalman.com/about/license/
//*/
//(function ($, i, b) { var j, k = $.event.special, c = "location", d = "hashchange", l = "href", f = $.browser, g = document.documentMode, h = f.msie && (g === b || g < 8), e = "on" + d in i && !h; function a(m) { m = m || i[c][l]; return m.replace(/^[^#]*#?(.*)$/, "$1") } $[d + "Delay"] = 100; k[d] = $.extend(k[d], { setup: function () { if (e) { return false } $(j.start) }, teardown: function () { if (e) { return false } $(j.stop) } }); j = (function () { var m = {}, r, n, o, q; function p() { o = q = function (s) { return s }; if (h) { n = $('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow; q = function () { return a(n.document[c][l]) }; o = function (u, s) { if (u !== s) { var t = n.document; t.open().close(); t[c].hash = "#" + u } }; o(a()) } } m.start = function () { if (r) { return } var t = a(); o || p(); (function s() { var v = a(), u = q(t); if (v !== t) { o(t = v, u); $(i).trigger(d) } else { if (u !== t) { i[c][l] = i[c][l].replace(/#.*/, "") + "#" + u } } r = setTimeout(s, $[d + "Delay"]) })() }; m.stop = function () { if (!n) { r && clearTimeout(r); r = 0 } }; return m })() })(jQuery, this);
/*
* jQuery Address Plugin v1.3
* http://www.asual.com/jquery/address/
*
* Copyright (c) 2009-2010 Rostislav Hristov
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* Date: 2010-09-26 17:58:16 +0300 (Sun, 26 Sep 2010)
*/
(function (c) {
    c.address = function () {
        var x = function (a) { c(c.address).trigger(c.extend(c.Event(a), function () { for (var b = {}, f = c.address.parameterNames(), h = 0, q = f.length; h < q; h++) b[f[h]] = c.address.parameter(f[h]); return { value: c.address.value(), path: c.address.path(), pathNames: c.address.pathNames(), parameterNames: f, parameters: b, queryString: c.address.queryString()} } .call(c.address))) }, y = function (a, b, f) { c(c.address).bind(a, b, f); return c.address }, A = function () { return z.pushState && typeof d.state !== t }, H = function () {
            return "/" +
e.pathname.replace(new RegExp(d.state), "") + e.search + (G() ? "#" + G() : "")
        }, G = function () { var a = e.href.indexOf("#"); return a != -1 ? B(e.href.substr(a + 1), l) : "" }, u = function () { return A() ? H() : G() }, ra = function () { return "javascript" }, $ = function (a, b) { if (d.strict) a = b ? a.substr(0, 1) != "/" ? "/" + a : a : a == "" ? "/" : a; return a }, B = function (a, b) { if (d.crawlable && b) return (a != "" ? "!" : "") + a; return a.replace(/^\!/, "") }, C = function (a, b) { return parseInt(a.css(b), 10) }, aa = function (a) {
            for (var b, f, h = 0, q = a.childNodes.length; h < q; h++) {
                if (a.childNodes[h].src) b =
String(a.childNodes[h].src); if (f = aa(a.childNodes[h])) b = f
            } return b
        }, M = function () { if (!R) { var a = u(), b = g != a; if (D && o < 523) { if (I != z.length) { I = z.length; if (typeof F[I - 1] != t) g = F[I - 1]; J(l) } } else if (b) if (E && o < 7) e.reload(); else { E && o < 8 && d.history && v(U, 50); g = a; J(l) } } }, J = function (a) { x(ba); x(a ? ca : da); v(ea, 10) }, ea = function () {
            if (d.tracker !== "null" && d.tracker !== null) {
                var a = c.isFunction(d.tracker) ? d.tracker : j[d.tracker], b = (e.pathname + e.search + (c.address && !A() ? c.address.value() : "")).replace(/\/\//, "/").replace(/^\/$/,
""); if (c.isFunction(a)) a(b); else if (c.isFunction(j.urchinTracker)) j.urchinTracker(b); else if (typeof j.pageTracker != t && c.isFunction(j.pageTracker._trackPageview)) j.pageTracker._trackPageview(b); else typeof j._gaq != t && c.isFunction(j._gaq.push) && j._gaq.push(["_trackPageview", b])
            } 
        }, U = function () {
            var a = ra() + ":" + l + ";document.open();document.writeln('<html><head><title>" + m.title + "</title><script>var " + p + ' = "' + u() + (m.domain != e.host ? '";document.domain="' + m.domain : "") + "\";<\/script></head></html>');document.close();";
            if (o < 7) n.src = a; else n.contentWindow.location.replace(a)
        }, ga = function () { if (N && fa != -1) { var a, b = N.substr(fa + 1).split("&"); for (r = 0; r < b.length; r++) { a = b[r].split("="); if (/^(autoUpdate|crawlable|history|strict|wrap)$/.test(a[0])) d[a[0]] = isNaN(a[1]) ? /^(true|yes)$/i.test(a[1]) : parseInt(a[1], 10) !== 0; if (/^(state|tracker)$/.test(a[0])) d[a[0]] = a[1] } N = null } g = u() }, ia = function () {
            if (!ha) {
                ha = k; ga(); var a = c("body").ajaxComplete(function () { sa.call(this); ta.call(this) }).trigger("ajaxComplete"); if (d.wrap) {
                    c("body > *").wrapAll('<div style="padding:' +
(C(a, "marginTop") + C(a, "paddingTop")) + "px " + (C(a, "marginRight") + C(a, "paddingRight")) + "px " + (C(a, "marginBottom") + C(a, "paddingBottom")) + "px " + (C(a, "marginLeft") + C(a, "paddingLeft")) + 'px;" />').parent().wrap('<div id="' + p + '" style="height:100%; overflow:auto;' + (D ? window.statusbar.visible && !/chrome/i.test(V) ? "" : " resize:both;" : "") + '" />'); c("html, body").css({ height: "100%", margin: 0, padding: 0, overflow: "hidden" }); D && c('<style type="text/css" />').appendTo("head").text("#" + p + "::-webkit-resizer { background-color: #fff; }")
                } if (E &&
o < 8) { a = m.getElementsByTagName("frameset")[0]; n = m.createElement((a ? "" : "i") + "frame"); if (a) { a.insertAdjacentElement("beforeEnd", n); a[a.cols ? "cols" : "rows"] += ",0"; n.noResize = k; n.frameBorder = n.frameSpacing = 0 } else { n.style.display = "none"; n.style.width = n.style.height = 0; n.tabIndex = -1; m.body.insertAdjacentElement("afterBegin", n) } v(function () { c(n).bind("load", function () { var b = n.contentWindow; g = typeof b[p] != t ? b[p] : ""; if (g != u()) { J(l); e.hash = B(g, k) } }); typeof n.contentWindow[p] == t && U() }, 50) } else if (D) {
                    if (o < 418) {
                        c(m.body).append('<form id="' +
p + '" style="position:absolute;top:-9999px;" method="get"></form>'); W = m.getElementById(p)
                    } if (typeof e[p] == t) e[p] = {}; if (typeof e[p][e.pathname] != t) F = e[p][e.pathname].split(",")
                } v(function () { x("init"); J(l) }, 1); if (!A()) if (E && o > 7 || !E && "on" + O in j) if (j.addEventListener) j.addEventListener(O, M, false); else j.attachEvent && j.attachEvent("on" + O, M); else ua(M, 50)
            } 
        }, sa = function () { var a, b = c("a"), f = b.size(), h = -1; v(function () { if (++h != f) { a = c(b.get(h)); a.is("[rel*=address:]") && a.address(); v(arguments.callee, 1) } }, 1) },
va = function () { if (g != u()) { g = u(); J(l) } }, wa = function () { if (j.removeEventListener) j.removeEventListener(O, M, false); else j.detachEvent && j.detachEvent("on" + O, M) }, ta = function () {
    var a = e.pathname.replace(/\/$/, ""); c("body").html().indexOf("_escaped_fragment_") != -1 && c("a[href]:not([href^=http]), , a[href*=" + document.domain + "]", this).each(function () {
        var b = c(this).attr("href").replace(/^http:/, "").replace(new RegExp(a + "/?$"), ""); if (b == "" || b.indexOf("_escaped_fragment_") != -1) c(this).attr("href", "#" + this.decode(b.replace(/\/(.*)\?_escaped_fragment_=(.*)$/,
"!$2")))
    })
}, K = function (a) { return encodeURIComponent(a).replace(/%20/g, "+") }, ja = function (a) { return a.split("#")[0].split("?")[0] }, ka = function (a) { a = ja(a); var b = a.replace(/\/{2,9}/g, "/").split("/"); if (a.substr(0, 1) == "/" || a.length === 0) b.splice(0, 1); a.substr(a.length - 1, 1) == "/" && b.splice(b.length - 1, 1); return b }, S = function (a) { a = a.split("?"); return a.slice(1, a.length).join("?").split("#")[0] }, la = function (a, b) {
    if (b = S(b)) {
        params = b.split("&"); b = []; for (r = 0; r < params.length; r++) {
            var f = params[r].split("="); f[0] ==
a && b.push(f.slice(1).join("="))
        } if (b.length !== 0) return b.length != 1 ? b : b[0]
    } 
}, ma = function (a) { var b = S(a); a = []; if (b && b.indexOf("=") != -1) { b = b.split("&"); for (var f = 0; f < b.length; f++) { var h = b[f].split("=")[0]; c.inArray(h, a) == -1 && a.push(h) } } return a }, na = function (a) { a = a.split("#"); return a.slice(1, a.length).join("#") }, p = "jQueryAddress", t = "undefined", O = "hashchange", ba = "change", ca = "internalChange", da = "externalChange", k = true, l = false, d = { autoUpdate: k, crawlable: l, history: k, strict: k, wrap: l }, s = c.browser, o = parseFloat(c.browser.version),
oa = s.mozilla, E = s.msie, pa = s.opera, D = s.webkit, X = l, j = function () { try { return top.document !== undefined ? top : window } catch (a) { return window } } (), m = j.document, z = j.history, e = j.location, ua = setInterval, v = setTimeout, V = navigator.userAgent, n, W, N = aa(document), fa = N ? N.indexOf("?") : -1, Y = m.title, I = z.length, R = l, ha = l, Z = k, qa = k, T = l, F = [], g = u(); if (E) {
            o = parseFloat(V.substr(V.indexOf("MSIE") + 4)); if (m.documentMode && m.documentMode != o) o = m.documentMode != 8 ? 7 : 8; c(document).bind("propertychange", function () {
                if (m.title != Y && m.title.indexOf("#" +
u()) != -1) m.title = Y
            })
        } if (X = oa && o >= 1 || E && o >= 6 || pa && o >= 9.5 || D && o >= 312) {
            for (var r = 1; r < I; r++) F.push(""); F.push(g); if (pa) history.navigationMode = "compatible"; if (document.readyState == "complete") var xa = setInterval(function () { if (c.address) { ia(); clearInterval(xa) } }, 50); else { ga(); c(ia) } s = H(); if (typeof d.state !== t) if (z.pushState) s.substr(0, 3) == "/#/" && e.replace(d.state.replace(/^\/$/, "") + s.substr(2)); else s != "/" && s.replace(/^\/#/, "") != G() && e.replace(d.state.replace(/^\/$/, "") + "/#" + s); c(window).bind("popstate",
va).bind("unload", wa)
        } else !X && G() != "" || D && o < 418 && G() != "" && e.search != "" ? e.replace(e.href.substr(0, e.href.indexOf("#"))) : ea(); return { bind: function (a, b, f) { return y(a, b, f) }, init: function (a) { return y("init", a) }, change: function (a) { return y(ba, a) }, internalChange: function (a) { return y(ca, a) }, externalChange: function (a) { return y(da, a) }, baseURL: function () { var a = e.href; if (a.indexOf("#") != -1) a = a.substr(0, a.indexOf("#")); if (/\/$/.test(a)) a = a.substr(0, a.length - 1); return a }, autoUpdate: function (a) {
            if (a !== undefined) {
                d.autoUpdate =
a; return this
            } return d.autoUpdate
        }, crawlable: function (a) { if (a !== undefined) { d.crawlable = a; return this } return d.crawlable }, history: function (a) { if (a !== undefined) { d.history = a; return this } return d.history }, state: function (a) { if (a !== undefined) { d.state = a; return this } return d.state }, strict: function (a) { if (a !== undefined) { d.strict = a; return this } return d.strict }, tracker: function (a) { if (a !== undefined) { d.tracker = a; return this } return d.tracker }, wrap: function (a) { if (a !== undefined) { d.wrap = a; return this } return d.wrap },
            update: function () { T = k; this.value(g); T = l; return this }, encode: function (a) { var b = ka(a), f = ma(a), h = S(a), q = na(a), P = a.substr(0, 1), L = a.substr(a.length - 1), i = ""; c.each(b, function (w, Q) { i += "/" + K(Q) }); if (h !== "") { i += "?"; if (f.length === 0) i += h; else { c.each(f, function (w, Q) { w = la(Q, a); if (typeof w !== "string") c.each(w, function (za, ya) { i += K(Q) + "=" + K(ya) + "&" }); else i += K(Q) + "=" + K(w) + "&" }); i = i.substr(0, i.length - 1) } } if (q !== "") i += "#" + K(q); if (P != "/" && i.substr(0, 1) == "/") i = i.substr(1); if (/#|&|\?/.test(L)) i += L; return i }, decode: function (a) {
                return decodeURIComponent(a.replace(/\+/g,
"%20"))
            }, title: function (a) { if (a !== undefined) { v(function () { Y = m.title = a; if (qa && n && n.contentWindow && n.contentWindow.document) { n.contentWindow.document.title = a; qa = l } if (!Z && oa) e.replace(e.href.indexOf("#") != -1 ? e.href : e.href + "#"); Z = l }, 50); return this } return m.title }, value: function (a) {
                if (a !== undefined) {
                    a = $(this.encode(a), k); if (a == "/") a = ""; if (g == a && !T) return; Z = k; g = a; if (d.autoUpdate || T) {
                        J(k); if (A()) z[d.history ? "pushState" : "replaceState"]({}, "", d.state.replace(/\/$/, "") + (g == "" ? "/" : g)); else {
                            R = k; F[z.length] =
g; if (D) if (d.history) { e[p][e.pathname] = F.toString(); I = z.length + 1; if (o < 418) { if (e.search == "") { W.action = "#" + B(g, k); W.submit() } } else if (o < 523 || g == "") { a = m.createEvent("MouseEvents"); a.initEvent("click", k, k); var b = m.createElement("a"); b.href = "#" + B(g, k); b.dispatchEvent(a) } else e.hash = "#" + B(g, k) } else e.replace("#" + B(g, k)); else if (g != u()) if (d.history) e.hash = "#" + B(g, k); else e.replace("#" + B(g, k)); E && o < 8 && d.history && v(U, 50); if (D) v(function () { R = l }, 1); else R = l
                        } 
                    } return this
                } if (!X) return null; return $(this.decode(g),
l)
            }, path: function (a) { if (a !== undefined) { var b = this.queryString(), f = this.hash(); this.value(a + (b ? "?" + b : "") + (f ? "#" + f : "")); return this } return ja(this.value()) }, pathNames: function () { return ka(this.value()) }, queryString: function (a) { if (a !== undefined) { var b = this.hash(); this.value(this.path() + (a ? "?" + a : "") + (b ? "#" + b : "")); return this } return S(this.value()) }, parameter: function (a, b, f) {
                var h, q; if (b !== undefined) {
                    var P = this.parameterNames(); q = []; for (h = 0; h < P.length; h++) {
                        var L = P[h], i = this.parameter(L); if (typeof i == "string") i =
[i]; if (L == a) i = b === null || b === "" ? [] : f ? i.concat([b]) : [b]; for (var w = 0; w < i.length; w++) q.push(L + "=" + i[w])
                    } c.inArray(a, P) == -1 && b !== null && b !== "" && q.push(a + "=" + b); this.queryString(q.join("&")); return this
                } return la(a, this.value())
            }, parameterNames: function () { return ma(this.value()) }, hash: function (a) { if (a !== undefined) { this.value(this.value().split("#")[0] + (a ? "#" + a : "")); return this } return na(this.value()) } 
        }
    } (); c.fn.address = function (x) {
        if (!c(this).attr("address")) {
            var y = function (A) {
                if (c(this).is("a")) {
                    var H = x ?
x.call(this) : /address:/.test(c(this).attr("rel")) ? c(this).attr("rel").split("address:")[1].split(" ")[0] : typeof c.address.state() !== "undefined" && c.address.state() != "/" ? c(this).attr("href").replace(new RegExp("^(.*" + c.address.state() + "|\\.)"), "") : c(this).attr("href").replace(/^(#\!?|\.)/, ""); c.address.value(H); A.preventDefault()
                } 
            }; c(this).click(y).live("click", y).submit(function (A) {
                if (c(this).is("form")) {
                    var H = x ? x.call(this) : c(this).attr("action") + "?" + c.address.decode(c(this).serialize()); c.address.value(H);
                    A.preventDefault()
                } 
            }).attr("address", true)
        } return this
    } 
})(jQuery);


/*!
* jQuery UI AriaTabs (12.07.10)
* http://github.com/fnagel/jQuery-Accessible-RIA
*
* Copyright (c) 2009 Felix Nagel for Namics (Deustchland) GmbH
* Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
*
* Depends: ui.core.js 1.8
*   		ui.tabs.js
*/
/* 
USAGE:::::::::::::
* Take a look in the html file or the (german) pdf file delivered with this example
* Simply add the js file uner the regular ui.tabs.js script tag
* Supports all options, methods and callbacks of the original widget
* sortable tabs are accessable but the sortable functionality as it is provided by the ui.sortable widget doesnt support ARIA 

* Options	
jqAddress			You need to add the add the jQuery Address file, please see demo file!
enable			enable browser history support
title
enable		enable title change
split		set delimiter string
 
*/
(function ($) {
    $.fn.extend($.ui.tabs.prototype, {

        // when widget is initiated
        _create: function () {
            var self = this, options = this.options;
            // add jQuery address default options
            if ($.address) {
                var jqAddressDefOpt = {
                    enable: true,
                    title: {
                        enable: true,
                        split: ' | '
                    }
                };
                if (!$.isEmptyObject(options.jqAddress)) $.extend(true, jqAddressDefOpt, options.jqAddress);
                else options.jqAddress = {};
                $.extend(true, options.jqAddress, jqAddressDefOpt);
            }

            // add jQuery Address stuff
            if ($.address && options.jqAddress.enable) var anchorId = "#" + $.address.value().replace("/", '');

            // fire original function
            self._tabify(true);

            // accessibility: needed to prevent blur() when enter key is pushed to enable forms mode in screenreader
            // needs to be fixed in tabs widget in line 333
            this.anchors.bind(options.event + '.tabs-accessibility', function () { this.focus(); });


            // ARIA
            // self.element.attr("role", "application");
            self.list.attr("role", "tablist");
            for (var x = 0; x < self.anchors.length; x++) {
                // add jQuery Address stuff | get proper tab by anchor
                if ($.address && options.jqAddress.enable && anchorId != "#" && $(self.anchors[x]).attr("href") == anchorId) self.select(x);
                // init aria atrributes for each panel and anchor
                self._ariaInit(x);
            }

            // keyboard
//            self.list.keydown(function (event) {
//                switch (event.keyCode) {
//                    case $.ui.keyCode.RIGHT:
//                        self.select(options.selected + 1);
//                        return false;
//                        break;
//                    case $.ui.keyCode.DOWN:
//                        self.select(options.selected + 1);
//                        // return false;
//                        break;
//                    case $.ui.keyCode.UP:
//                        self.select(options.selected - 1);
//                        return false;
//                        break;
//                    case $.ui.keyCode.LEFT:
//                        self.select(options.selected - 1);
//                        return false;
//                        break;
//                    case $.ui.keyCode.END:
//                        self.select(self.anchors.length - 1);
//                        return false;
//                        break;
//                    case $.ui.keyCode.HOME:
//                        self.select(0);
//                        return false;
//                        break;
//                }
//            });

            // add jQuery address stuff
            if ($.address && this.options.jqAddress.enable) {
                $.address.externalChange(function (event) {
                    // Select the proper tab
                    var anchorId = "#" + event.value.replace("/", '');
                    var x = 0;
                    while (x < self.anchors.length) {
                        if ($(self.anchors[x]).attr("href") == anchorId) {
                            self.select(x);
                            return;
                        }
                        x++;
                    }
                });
            }
        },

        _original_load: $.ui.tabs.prototype.load,
        // called whenever a tab is selected but if option collapsible is set | fired once at init for the chosen tab
        load: function (index) {

            // add jQuery Address stuff
            // workaround: only set values when user interacts aka not on init
            if ($.address && this.options.jqAddress.enable) {
                if ($(this.anchors[0]).attr("aria-selected") !== undefined) {
                    if (this.options.forceFirst === 0 && index !== 0) {
                        // if there is no anchor to keep, prevent double entry
                        if ($.address.value() == "") $.address.history(false);
                        $.address.value($(this.anchors[0]).attr("href").replace(/^#/, ''));
                        $.address.history(true);
                        this.options.forceFirst = false;
                    }
                    if (this.options.jqAddress.title.enable) $.address.title($.address.title().split(this.options.jqAddress.title.split)[0] + this.options.jqAddress.title.split + $(this.anchors[index]).text());
                    if ($.address.value().indexOf($(this.anchors[index]).attr("href").replace(/^#/, '')) == -1){
                        $.address.value($(this.anchors[index]).attr("href").replace(/^#/, ''));
                    }
                
                } else {
                    this.options.forceFirst = index;
                }
            }

            // hide all unselected
            for (var x = 0; x < this.anchors.length; x++) {
                // anchors
                this._ariaSet(x, false);
                // remove ARIA live settings
                if ($.data(this.anchors[x], 'href.tabs')) {
                    $(this.panels[x])
						.removeAttr("aria-live")
						.removeAttr("aria-busy");
                }
            };
            // is remote? set ARIA states 
            if ($.data(this.anchors[index], 'href.tabs')) {
                $(this.panels[index])
					.attr("aria-live", "polite")
					.attr("aria-busy", "true");
            }
            // fire original function
            this._original_load(index);

            // is remote? end ARIA busy
            if ($.data(this.anchors[index], 'href.tabs')) {
                $(this.panels[index])
					.attr("aria-busy", "false");
                // TO DO jQuery Address: title is wrong when using Ajax Tab
            }
            // set state for the activated tab
            this._ariaSet(index, true);
        },

        // sets aria states for single tab and its panel
        _ariaSet: function (index, state) {
            var tabindex = (state) ? 0 : -1;
            var anchor = $(this.anchors[index]);
            // set ARIA state for loaded tab			
            anchor.attr("tabindex", tabindex)
				.attr("aria-selected", state);
            // set focus and remove focus CSS class
            if (state) {
                if (!$.browser.msie) anchor.focus();
            } else {
                // needed to remove CSS class set by original widget
                anchor.closest("li").removeClass("ui-state-focus");
            }
            // set ARIA state for loaded tab
            $(this.panels[index])
				.attr("aria-hidden", !state)
				.attr("aria-expanded", state);
            // accessibility: needed to prevent blur() because IE loses focus when using keyboard control
            // this needs rto be fixed in jQuery UI Tabs in line 402
            if ($.browser.msie) this.options.timeout = window.setTimeout(function () { anchor.focus(); }, 100);
            // update virtual Buffer
            if (state) this._updateVirtualBuffer();
        },

        // sets all attributes when plugin is called or if tab is added
        _ariaInit: function (index) {
            var self = this;
            // get widget generated ID of the panel
            var panelId = $(this.panels[index]).attr("id");
            // ARIA anchors and li's
            $(this.anchors[index])
				.attr("role", "tab")
				.attr("aria-controls", panelId)
				.attr("id", panelId + "-tab")
            // set li to presentation role
			.parent().attr("role", "presentation");
            // ARIA panels aka content wrapper
            $(this.panels[index])
				.attr("role", "tabpanel")
            // add tabpanel to the tabindex
				.attr("tabindex", 0)
				.attr("aria-labelledby", panelId + "-tab");
            // if collapsible, set event to toggle ARIA state
            if (this.options.collapsible) {
                $(this.anchors[index]).bind(this.options.event, function (event) {
                    // get class to negate it to set states correctly when panel is collapsed
                    self._ariaSet(index, !$(self.panels[index]).hasClass("ui-tabs-hide"));
                });
            }
        },

        _original_add: $.ui.tabs.prototype.add,
        // called when a tab is added
        add: function (url, label, index) {
            // fire original function
            this._original_add(url, label, index);
            // ARIA			
            this.element
				.attr("aria-live", "polite")
				.attr("aria-relevant", "additions");

            // if no index is defined tab should be added at the end of the tab list
            if (index) {
                this._ariaInit(index);
                this._ariaSet(index, false);
            } else {
                this._ariaInit(this.anchors.length - 1);
                this._ariaSet(this.anchors.length - 1, false);
            }
        },

        _original_remove: $.ui.tabs.prototype.remove,
        // called when a tab is removed
        remove: function (index) {
            // fire original function
            this._original_remove(index);
            // ARIA
            this.element
				.attr("aria-live", "polite")
				.attr("aria-relevant", "removals");
        },

        _original_destroy: $.ui.tabs.prototype.destroy,
        // removes all the setted attributes
        destroy: function () {
            var self = this, options = this.options;
            // remove ARIA attribute
            // wrapper element
            self.element
				.removeAttr("role")
				.removeAttr("aria-live")
				.removeAttr("aria-relevant");
            // ul element
            self.list.removeAttr("role");
            for (var x = 0; x < self.anchors.length; x++) {
                // tabs
                $(self.anchors[x])
					.removeAttr("aria-selected")
					.removeAttr("aria-controls")
					.removeAttr("role")
					.removeAttr("id")
					.removeAttr("tabindex")
                // remove presentation role of the li element
				.parent().removeAttr("role");
                // tab panels
                $(self.panels[x])
					.removeAttr("aria-hidden")
					.removeAttr("aria-expanded")
					.removeAttr("aria-labelledby")
					.removeAttr("aria-live")
					.removeAttr("aria-busy")
					.removeAttr("aria-relevant")
					.removeAttr("role");
            }
            // remove virtual buffer form
            $("body>form #virtualBufferForm").parent().remove();
            // fire original function
            this._original_destroy();
        },

        // updates virtual buffer | for older screenreader
        _updateVirtualBuffer: function () {
            var form = $("body>form #virtualBufferForm");
            if (form.length) {
                if (form.val() == "1") form.val("0"); else form.val("1");
                if (form.hasClass("ui-accessibility-odd")) form.addClass("ui-accessibility-even").removeClass("ui-accessibility-odd");
                else form.addClass("ui-accessibility-odd").removeClass("ui-accessibility-even");
            } else {
                $("body").append('<form><input id="virtualBufferForm" type="hidden" value="1" /></form>');
            }
        }
    });
})(jQuery); 
