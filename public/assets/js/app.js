(function () {
    function t(t, e) {
        function i() {
            this.constructor = t;
        }
        for (var n in e) Q.call(e, n) && (t[n] = e[n]);
        return (i.prototype = e.prototype), (t.prototype = new i()), (t.__super__ = e.prototype), t;
    }
    var e,
        i,
        n,
        s,
        o,
        r,
        a,
        l,
        h,
        c,
        u,
        d,
        p,
        f,
        g,
        m,
        v,
        _,
        b,
        y,
        w,
        C,
        x,
        k,
        T,
        D,
        S,
        E,
        I,
        A,
        P,
        N,
        O,
        M,
        $,
        H,
        L,
        W,
        R,
        F,
        j,
        z,
        q,
        B,
        U,
        Y,
        K,
        V,
        X = [].slice,
        Q = {}.hasOwnProperty,
        G =
            [].indexOf ||
            function (t) {
                for (var e = 0, i = this.length; e < i; e++) if (e in this && this[e] === t) return e;
                return -1;
            };
    for (
        w = {
            catchupTime: 100,
            initialRate: 0.03,
            minTime: 250,
            ghostTime: 100,
            maxProgressPerFrame: 20,
            easeFactor: 1.25,
            startOnPageLoad: !0,
            restartOnPushState: !0,
            restartOnRequestAfter: 500,
            target: "body",
            elements: { checkInterval: 100, selectors: ["body"] },
            eventLag: { minSamples: 10, sampleCount: 3, lagThreshold: 3 },
            ajax: { trackMethods: ["GET"], trackWebSockets: !0, ignoreURLs: [] },
        },
            I = function () {
                var t;
                return null != (t = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? t : +new Date();
            },
            P = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
            y = window.cancelAnimationFrame || window.mozCancelAnimationFrame,
            null == P &&
                ((P = function (t) {
                    return setTimeout(t, 50);
                }),
                (y = function (t) {
                    return clearTimeout(t);
                })),
            O = function (t) {
                var e, i;
                return (
                    (e = I()),
                    (i = function () {
                        var n;
                        return 33 <= (n = I() - e)
                            ? ((e = I()),
                              t(n, function () {
                                  return P(i);
                              }))
                            : setTimeout(i, 33 - n);
                    })()
                );
            },
            N = function () {
                var t, e, i;
                return (i = arguments[0]), (e = arguments[1]), (t = 3 <= arguments.length ? X.call(arguments, 2) : []), "function" == typeof i[e] ? i[e].apply(i, t) : i[e];
            },
            C = function () {
                var t, e, i, n, s, o, r;
                for (e = arguments[0], o = 0, r = (n = 2 <= arguments.length ? X.call(arguments, 1) : []).length; o < r; o++)
                    if ((i = n[o])) for (t in i) Q.call(i, t) && ((s = i[t]), null != e[t] && "object" == typeof e[t] && null != s && "object" == typeof s ? C(e[t], s) : (e[t] = s));
                return e;
            },
            v = function (t) {
                var e, i, n, s, o;
                for (i = e = 0, s = 0, o = t.length; s < o; s++) (n = t[s]), (i += Math.abs(n)), e++;
                return i / e;
            },
            k = function (t, e) {
                var i, n, s;
                if ((null == t && (t = "options"), null == e && (e = !0), (s = document.querySelector("[data-pace-" + t + "]")))) {
                    if (((i = s.getAttribute("data-pace-" + t)), !e)) return i;
                    try {
                        return JSON.parse(i);
                    } catch (t) {
                        return (n = t), "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", n) : void 0;
                    }
                }
            },
            J.prototype.on = function (t, e, i, n) {
                var s;
                return null == n && (n = !1), null == this.bindings && (this.bindings = {}), null == (s = this.bindings)[t] && (s[t] = []), this.bindings[t].push({ handler: e, ctx: i, once: n });
            },
            J.prototype.once = function (t, e, i) {
                return this.on(t, e, i, !0);
            },
            J.prototype.off = function (t, e) {
                var i, n, s;
                if (null != (null != (n = this.bindings) ? n[t] : void 0)) {
                    if (null == e) return delete this.bindings[t];
                    for (i = 0, s = []; i < this.bindings[t].length; ) this.bindings[t][i].handler === e ? s.push(this.bindings[t].splice(i, 1)) : s.push(i++);
                    return s;
                }
            },
            J.prototype.trigger = function () {
                var t, e, i, n, s, o, r, a, l;
                if (((i = arguments[0]), (t = 2 <= arguments.length ? X.call(arguments, 1) : []), null != (r = this.bindings) ? r[i] : void 0)) {
                    for (s = 0, l = []; s < this.bindings[i].length; ) (n = (a = this.bindings[i][s]).handler), (e = a.ctx), (o = a.once), n.apply(null != e ? e : this, t), o ? l.push(this.bindings[i].splice(s, 1)) : l.push(s++);
                    return l;
                }
            },
            a = J,
            c = window.Pace || {},
            window.Pace = c,
            C(c, a.prototype),
            A = c.options = C({}, w, window.paceOptions, k()),
            q = 0,
            U = (K = ["ajax", "document", "eventLag", "elements"]).length;
        q < U;
        q++
    )
        !0 === A[(L = K[q])] && (A[L] = w[L]);
    function J() {}
    function Z(t) {
        (this.source = t), (this.last = this.sinceLastUpdate = 0), (this.rate = A.initialRate), (this.catchup = 0), (this.progress = this.lastProgress = 0), null != this.source && (this.progress = N(this.source, "progress"));
    }
    function tt() {
        var t,
            e,
            i = this;
        (this.progress = null != (e = this.states[document.readyState]) ? e : 100),
            (t = document.onreadystatechange),
            (document.onreadystatechange = function () {
                return null != i.states[document.readyState] && (i.progress = i.states[document.readyState]), "function" == typeof t ? t.apply(null, arguments) : void 0;
            });
    }
    function et(t) {
        (this.selector = t), (this.progress = 0), this.check();
    }
    function it() {
        var t = this;
        (this.elements = []),
            T().on("request", function () {
                return t.watch.apply(t, arguments);
            });
    }
    function nt() {
        var t,
            e = this;
        nt.__super__.constructor.apply(this, arguments),
            (t = function (t) {
                var i;
                return (
                    (i = t.open),
                    (t.open = function (n, s, o) {
                        return H(n) && e.trigger("request", { type: n, url: s, request: t }), i.apply(t, arguments);
                    })
                );
            }),
            (window.XMLHttpRequest = function (e) {
                var i;
                return (i = new z(e)), t(i), i;
            });
        try {
            x(window.XMLHttpRequest, z);
        } catch (t) {}
        if (null != j) {
            window.XDomainRequest = function () {
                var e;
                return (e = new j()), t(e), e;
            };
            try {
                x(window.XDomainRequest, j);
            } catch (t) {}
        }
        if (null != F && A.ajax.trackWebSockets) {
            window.WebSocket = function (t, i) {
                var n;
                return (n = null != i ? new F(t, i) : new F(t)), H("socket") && e.trigger("request", { type: "socket", url: t, protocols: i, request: n }), n;
            };
            try {
                x(window.WebSocket, F);
            } catch (t) {}
        }
    }
    function st() {
        this.bindings = {};
    }
    function ot() {
        this.progress = 0;
    }
    function rt() {
        return rt.__super__.constructor.apply(this, arguments);
    }
    t(rt, Error),
        (h = rt),
        (ot.prototype.getElement = function () {
            var t;
            if (null == this.el) {
                if (!(t = document.querySelector(A.target))) throw new h();
                (this.el = document.createElement("div")),
                    (this.el.className = "pace pace-active"),
                    (document.body.className = document.body.className.replace(/pace-done/g, "")),
                    (document.body.className += " pace-running"),
                    (this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>'),
                    null != t.firstChild ? t.insertBefore(this.el, t.firstChild) : t.appendChild(this.el);
            }
            return this.el;
        }),
        (ot.prototype.finish = function () {
            var t;
            return (
                ((t = this.getElement()).className = t.className.replace("pace-active", "")),
                (t.className += " pace-inactive"),
                (document.body.className = document.body.className.replace("pace-running", "")),
                (document.body.className += " pace-done")
            );
        }),
        (ot.prototype.update = function (t) {
            return (this.progress = t), this.render();
        }),
        (ot.prototype.destroy = function () {
            try {
                this.getElement().parentNode.removeChild(this.getElement());
            } catch (t) {
                h = t;
            }
            return (this.el = void 0);
        }),
        (ot.prototype.render = function () {
            var t, e, i, n, s, o, r;
            if (null == document.querySelector(A.target)) return !1;
            for (t = this.getElement(), n = "translate3d(" + this.progress + "%, 0, 0)", s = 0, o = (r = ["webkitTransform", "msTransform", "transform"]).length; s < o; s++) (e = r[s]), (t.children[0].style[e] = n);
            return (
                (!this.lastRenderedProgress || this.lastRenderedProgress | (0 !== this.progress) | 0) &&
                    (t.children[0].setAttribute("data-progress-text", (0 | this.progress) + "%"),
                    100 <= this.progress ? (i = "99") : ((i = this.progress < 10 ? "0" : ""), (i += 0 | this.progress)),
                    t.children[0].setAttribute("data-progress", "" + i)),
                (this.lastRenderedProgress = this.progress)
            );
        }),
        (ot.prototype.done = function () {
            return 100 <= this.progress;
        }),
        (i = ot),
        (st.prototype.trigger = function (t, e) {
            var i, n, s, o, r;
            if (null != this.bindings[t]) {
                for (r = [], n = 0, s = (o = this.bindings[t]).length; n < s; n++) (i = o[n]), r.push(i.call(this, e));
                return r;
            }
        }),
        (st.prototype.on = function (t, e) {
            var i;
            return null == (i = this.bindings)[t] && (i[t] = []), this.bindings[t].push(e);
        }),
        (l = st),
        (z = window.XMLHttpRequest),
        (j = window.XDomainRequest),
        (F = window.WebSocket),
        (x = function (t, e) {
            var i, n;
            for (i in ((n = []), e.prototype))
                try {
                    null == t[i] && "function" != typeof e[i]
                        ? "function" == typeof Object.defineProperty
                            ? n.push(
                                  Object.defineProperty(t, i, {
                                      get: function () {
                                          return e.prototype[i];
                                      },
                                      configurable: !0,
                                      enumerable: !0,
                                  })
                              )
                            : n.push((t[i] = e.prototype[i]))
                        : n.push(void 0);
                } catch (t) {}
            return n;
        }),
        (S = []),
        (c.ignore = function () {
            var t, e, i;
            return (e = arguments[0]), (t = 2 <= arguments.length ? X.call(arguments, 1) : []), S.unshift("ignore"), (i = e.apply(null, t)), S.shift(), i;
        }),
        (c.track = function () {
            var t, e, i;
            return (e = arguments[0]), (t = 2 <= arguments.length ? X.call(arguments, 1) : []), S.unshift("track"), (i = e.apply(null, t)), S.shift(), i;
        }),
        (H = function (t) {
            var e;
            if ((null == t && (t = "GET"), "track" === S[0])) return "force";
            if (!S.length && A.ajax) {
                if ("socket" === t && A.ajax.trackWebSockets) return !0;
                if (((e = t.toUpperCase()), 0 <= G.call(A.ajax.trackMethods, e))) return !0;
            }
            return !1;
        }),
        t(nt, l),
        (u = nt),
        (B = null),
        ($ = function (t) {
            var e, i, n, s;
            for (i = 0, n = (s = A.ajax.ignoreURLs).length; i < n; i++)
                if ("string" == typeof (e = s[i])) {
                    if (-1 !== t.indexOf(e)) return !0;
                } else if (e.test(t)) return !0;
            return !1;
        }),
        (T = function () {
            return null == B && (B = new u()), B;
        })().on("request", function (t) {
            var i, n, s, o, r;
            return (
                (o = t.type),
                (s = t.request),
                (r = t.url),
                $(r)
                    ? void 0
                    : c.running || (!1 === A.restartOnRequestAfter && "force" !== H(o))
                    ? void 0
                    : ((n = arguments),
                      "boolean" == typeof (i = A.restartOnRequestAfter || 0) && (i = 0),
                      setTimeout(function () {
                          var t, i, r, a, l;
                          if ("socket" === o ? s.readyState < 2 : 0 < (r = s.readyState) && r < 4) {
                              for (c.restart(), l = [], t = 0, i = (a = c.sources).length; t < i; t++) {
                                  if ((L = a[t]) instanceof e) {
                                      L.watch.apply(L, n);
                                      break;
                                  }
                                  l.push(void 0);
                              }
                              return l;
                          }
                      }, i))
            );
        }),
        (it.prototype.watch = function (t) {
            var e, i, n, s;
            return (n = t.type), (e = t.request), (s = t.url), $(s) ? void 0 : ((i = "socket" === n ? new f(e) : new g(e)), this.elements.push(i));
        }),
        (e = it),
        (g = function (t) {
            var e,
                i,
                n,
                s,
                o,
                r = this;
            if (((this.progress = 0), null != window.ProgressEvent))
                for (
                    t.addEventListener(
                        "progress",
                        function (t) {
                            return t.lengthComputable ? (r.progress = (100 * t.loaded) / t.total) : (r.progress = r.progress + (100 - r.progress) / 2);
                        },
                        !1
                    ),
                        i = 0,
                        n = (o = ["load", "abort", "timeout", "error"]).length;
                    i < n;
                    i++
                )
                    (e = o[i]),
                        t.addEventListener(
                            e,
                            function () {
                                return (r.progress = 100);
                            },
                            !1
                        );
            else
                (s = t.onreadystatechange),
                    (t.onreadystatechange = function () {
                        var e;
                        return 0 === (e = t.readyState) || 4 === e ? (r.progress = 100) : 3 === t.readyState && (r.progress = 50), "function" == typeof s ? s.apply(null, arguments) : void 0;
                    });
        }),
        (f = function (t) {
            var e,
                i,
                n,
                s,
                o = this;
            for (i = this.progress = 0, n = (s = ["error", "open"]).length; i < n; i++)
                (e = s[i]),
                    t.addEventListener(
                        e,
                        function () {
                            return (o.progress = 100);
                        },
                        !1
                    );
        }),
        (s = function (t) {
            var e, i, n, s;
            for (null == t && (t = {}), this.elements = [], null == t.selectors && (t.selectors = []), i = 0, n = (s = t.selectors).length; i < n; i++) (e = s[i]), this.elements.push(new o(e));
        }),
        (et.prototype.check = function () {
            var t = this;
            return document.querySelector(this.selector)
                ? this.done()
                : setTimeout(function () {
                      return t.check();
                  }, A.elements.checkInterval);
        }),
        (et.prototype.done = function () {
            return (this.progress = 100);
        }),
        (o = et),
        (tt.prototype.states = { loading: 0, interactive: 50, complete: 100 }),
        (n = tt),
        (r = function () {
            var t,
                e,
                i,
                n,
                s,
                o = this;
            (this.progress = 0),
                (s = []),
                (n = t = 0),
                (i = I()),
                (e = setInterval(function () {
                    var r;
                    return (
                        (r = I() - i - 50),
                        (i = I()),
                        s.push(r),
                        s.length > A.eventLag.sampleCount && s.shift(),
                        (t = v(s)),
                        ++n >= A.eventLag.minSamples && t < A.eventLag.lagThreshold ? ((o.progress = 100), clearInterval(e)) : (o.progress = (3 / (t + 3)) * 100)
                    );
                }, 50));
        }),
        (Z.prototype.tick = function (t, e) {
            var i;
            return (
                null == e && (e = N(this.source, "progress")),
                100 <= e && (this.done = !0),
                e === this.last
                    ? (this.sinceLastUpdate += t)
                    : (this.sinceLastUpdate && (this.rate = (e - this.last) / this.sinceLastUpdate), (this.catchup = (e - this.progress) / A.catchupTime), (this.sinceLastUpdate = 0), (this.last = e)),
                e > this.progress && (this.progress += this.catchup * t),
                (i = 1 - Math.pow(this.progress / 100, A.easeFactor)),
                (this.progress += i * this.rate * t),
                (this.progress = Math.min(this.lastProgress + A.maxProgressPerFrame, this.progress)),
                (this.progress = Math.max(0, this.progress)),
                (this.progress = Math.min(100, this.progress)),
                (this.lastProgress = this.progress),
                this.progress
            );
        }),
        (p = Z),
        (b = m = R = _ = M = W = null),
        (c.running = !1),
        (D = function () {
            return A.restartOnPushState ? c.restart() : void 0;
        }),
        null != window.history.pushState &&
            ((Y = window.history.pushState),
            (window.history.pushState = function () {
                return D(), Y.apply(window.history, arguments);
            })),
        null != window.history.replaceState &&
            ((V = window.history.replaceState),
            (window.history.replaceState = function () {
                return D(), V.apply(window.history, arguments);
            })),
        (d = { ajax: e, elements: s, document: n, eventLag: r }),
        (E = function () {
            var t, e, n, s, o, r, a, l;
            for (c.sources = W = [], e = 0, s = (r = ["ajax", "elements", "document", "eventLag"]).length; e < s; e++) !1 !== A[(t = r[e])] && W.push(new d[t](A[t]));
            for (n = 0, o = (l = null != (a = A.extraSources) ? a : []).length; n < o; n++) (L = l[n]), W.push(new L(A));
            return (c.bar = _ = new i()), (M = []), (R = new p());
        })(),
        (c.stop = function () {
            return c.trigger("stop"), (c.running = !1), _.destroy(), (b = !0), null != m && ("function" == typeof y && y(m), (m = null)), E();
        }),
        (c.restart = function () {
            return c.trigger("restart"), c.stop(), c.start();
        }),
        (c.go = function () {
            var t;
            return (
                (c.running = !0),
                _.render(),
                (t = I()),
                (b = !1),
                (m = O(function (e, i) {
                    var n, s, o, r, a, l, h, u, d, f, g, m, v, y, w;
                    for (_.progress, s = f = 0, o = !0, l = g = 0, v = W.length; g < v; l = ++g)
                        for (L = W[l], d = null != M[l] ? M[l] : (M[l] = []), h = m = 0, y = (a = null != (w = L.elements) ? w : [L]).length; m < y; h = ++m)
                            (r = a[h]), (o &= (u = null != d[h] ? d[h] : (d[h] = new p(r))).done), u.done || (s++, (f += u.tick(e)));
                    return (
                        (n = f / s),
                        _.update(R.tick(e, n)),
                        _.done() || o || b
                            ? (_.update(100),
                              c.trigger("done"),
                              setTimeout(function () {
                                  return _.finish(), (c.running = !1), c.trigger("hide");
                              }, Math.max(A.ghostTime, Math.max(A.minTime - (I() - t), 0))))
                            : i()
                    );
                }))
            );
        }),
        (c.start = function (t) {
            C(A, t), (c.running = !0);
            try {
                _.render();
            } catch (t) {
                h = t;
            }
            return document.querySelector(".pace") ? (c.trigger("start"), c.go()) : setTimeout(c.start, 50);
        }),
        "function" == typeof define && define.amd
            ? define(["pace"], function () {
                  return c;
              })
            : "object" == typeof exports
            ? (module.exports = c)
            : A.startOnPageLoad && c.start();
}.call(this),
    (function (t, e) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports
            ? (module.exports = t.document
                  ? e(t, !0)
                  : function (t) {
                        if (!t.document) throw new Error("jQuery requires a window with a document");
                        return e(t);
                    })
            : e(t);
    })("undefined" != typeof window ? window : this, function (t, e) {
        "use strict";
        function i(t) {
            return null != t && t === t.window;
        }
        var n = [],
            s = t.document,
            o = Object.getPrototypeOf,
            r = n.slice,
            a = n.concat,
            l = n.push,
            h = n.indexOf,
            c = {},
            u = c.toString,
            d = c.hasOwnProperty,
            p = d.toString,
            f = p.call(Object),
            g = {},
            m = function (t) {
                return "function" == typeof t && "number" != typeof t.nodeType;
            },
            v = { type: !0, src: !0, nonce: !0, noModule: !0 };
        function _(t, e, i) {
            var n,
                o,
                r = (i = i || s).createElement("script");
            if (((r.text = t), e)) for (n in v) (o = e[n] || (e.getAttribute && e.getAttribute(n))) && r.setAttribute(n, o);
            i.head.appendChild(r).parentNode.removeChild(r);
        }
        function b(t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? c[u.call(t)] || "object" : typeof t;
        }
        var y = function (t, e) {
                return new y.fn.init(t, e);
            },
            w = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        function C(t) {
            var e = !!t && "length" in t && t.length,
                n = b(t);
            return !m(t) && !i(t) && ("array" === n || 0 === e || ("number" == typeof e && 0 < e && e - 1 in t));
        }
        (y.fn = y.prototype = {
            jquery: "3.4.1",
            constructor: y,
            length: 0,
            toArray: function () {
                return r.call(this);
            },
            get: function (t) {
                return null == t ? r.call(this) : t < 0 ? this[t + this.length] : this[t];
            },
            pushStack: function (t) {
                var e = y.merge(this.constructor(), t);
                return (e.prevObject = this), e;
            },
            each: function (t) {
                return y.each(this, t);
            },
            map: function (t) {
                return this.pushStack(
                    y.map(this, function (e, i) {
                        return t.call(e, i, e);
                    })
                );
            },
            slice: function () {
                return this.pushStack(r.apply(this, arguments));
            },
            first: function () {
                return this.eq(0);
            },
            last: function () {
                return this.eq(-1);
            },
            eq: function (t) {
                var e = this.length,
                    i = +t + (t < 0 ? e : 0);
                return this.pushStack(0 <= i && i < e ? [this[i]] : []);
            },
            end: function () {
                return this.prevObject || this.constructor();
            },
            push: l,
            sort: n.sort,
            splice: n.splice,
        }),
            (y.extend = y.fn.extend = function () {
                var t,
                    e,
                    i,
                    n,
                    s,
                    o,
                    r = arguments[0] || {},
                    a = 1,
                    l = arguments.length,
                    h = !1;
                for ("boolean" == typeof r && ((h = r), (r = arguments[a] || {}), a++), "object" == typeof r || m(r) || (r = {}), a === l && ((r = this), a--); a < l; a++)
                    if (null != (t = arguments[a]))
                        for (e in t)
                            (n = t[e]),
                                "__proto__" !== e &&
                                    r !== n &&
                                    (h && n && (y.isPlainObject(n) || (s = Array.isArray(n)))
                                        ? ((i = r[e]), (o = s && !Array.isArray(i) ? [] : s || y.isPlainObject(i) ? i : {}), (s = !1), (r[e] = y.extend(h, o, n)))
                                        : void 0 !== n && (r[e] = n));
                return r;
            }),
            y.extend({
                expando: "jQuery" + ("3.4.1" + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function (t) {
                    throw new Error(t);
                },
                noop: function () {},
                isPlainObject: function (t) {
                    var e, i;
                    return !(!t || "[object Object]" !== u.call(t) || ((e = o(t)) && ("function" != typeof (i = d.call(e, "constructor") && e.constructor) || p.call(i) !== f)));
                },
                isEmptyObject: function (t) {
                    var e;
                    for (e in t) return !1;
                    return !0;
                },
                globalEval: function (t, e) {
                    _(t, { nonce: e && e.nonce });
                },
                each: function (t, e) {
                    var i,
                        n = 0;
                    if (C(t)) for (i = t.length; n < i && !1 !== e.call(t[n], n, t[n]); n++);
                    else for (n in t) if (!1 === e.call(t[n], n, t[n])) break;
                    return t;
                },
                trim: function (t) {
                    return null == t ? "" : (t + "").replace(w, "");
                },
                makeArray: function (t, e) {
                    var i = e || [];
                    return null != t && (C(Object(t)) ? y.merge(i, "string" == typeof t ? [t] : t) : l.call(i, t)), i;
                },
                inArray: function (t, e, i) {
                    return null == e ? -1 : h.call(e, t, i);
                },
                merge: function (t, e) {
                    for (var i = +e.length, n = 0, s = t.length; n < i; n++) t[s++] = e[n];
                    return (t.length = s), t;
                },
                grep: function (t, e, i) {
                    for (var n = [], s = 0, o = t.length, r = !i; s < o; s++) !e(t[s], s) != r && n.push(t[s]);
                    return n;
                },
                map: function (t, e, i) {
                    var n,
                        s,
                        o = 0,
                        r = [];
                    if (C(t)) for (n = t.length; o < n; o++) null != (s = e(t[o], o, i)) && r.push(s);
                    else for (o in t) null != (s = e(t[o], o, i)) && r.push(s);
                    return a.apply([], r);
                },
                guid: 1,
                support: g,
            }),
            "function" == typeof Symbol && (y.fn[Symbol.iterator] = n[Symbol.iterator]),
            y.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (t, e) {
                c["[object " + e + "]"] = e.toLowerCase();
            });
        var x = (function (t) {
            function e(t, e, i) {
                var n = "0x" + e - 65536;
                return n != n || i ? e : n < 0 ? String.fromCharCode(65536 + n) : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320);
            }
            function i() {
                f();
            }
            var n,
                s,
                o,
                r,
                a,
                l,
                h,
                c,
                u,
                d,
                p,
                f,
                g,
                m,
                v,
                _,
                b,
                y,
                w,
                C = "sizzle" + 1 * new Date(),
                x = t.document,
                k = 0,
                T = 0,
                D = lt(),
                S = lt(),
                E = lt(),
                I = lt(),
                A = function (t, e) {
                    return t === e && (p = !0), 0;
                },
                P = {}.hasOwnProperty,
                N = [],
                O = N.pop,
                M = N.push,
                $ = N.push,
                H = N.slice,
                L = function (t, e) {
                    for (var i = 0, n = t.length; i < n; i++) if (t[i] === e) return i;
                    return -1;
                },
                W = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                R = "[\\x20\\t\\r\\n\\f]",
                F = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                j = "\\[" + R + "*(" + F + ")(?:" + R + "*([*^$|!~]?=)" + R + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + F + "))|)" + R + "*\\]",
                z = ":(" + F + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + j + ")*)|.*)\\)|)",
                q = new RegExp(R + "+", "g"),
                B = new RegExp("^" + R + "+|((?:^|[^\\\\])(?:\\\\.)*)" + R + "+$", "g"),
                U = new RegExp("^" + R + "*," + R + "*"),
                Y = new RegExp("^" + R + "*([>+~]|" + R + ")" + R + "*"),
                K = new RegExp(R + "|>"),
                V = new RegExp(z),
                X = new RegExp("^" + F + "$"),
                Q = {
                    ID: new RegExp("^#(" + F + ")"),
                    CLASS: new RegExp("^\\.(" + F + ")"),
                    TAG: new RegExp("^(" + F + "|[*])"),
                    ATTR: new RegExp("^" + j),
                    PSEUDO: new RegExp("^" + z),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + R + "*(even|odd|(([+-]|)(\\d*)n|)" + R + "*(?:([+-]|)" + R + "*(\\d+)|))" + R + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + W + ")$", "i"),
                    needsContext: new RegExp("^" + R + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + R + "*((?:-\\d)?\\d*)" + R + "*\\)|)(?=[^-]|$)", "i"),
                },
                G = /HTML$/i,
                J = /^(?:input|select|textarea|button)$/i,
                Z = /^h\d$/i,
                tt = /^[^{]+\{\s*\[native \w/,
                et = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                it = /[+~]/,
                nt = new RegExp("\\\\([\\da-f]{1,6}" + R + "?|(" + R + ")|.)", "ig"),
                st = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                ot = function (t, e) {
                    return e ? ("\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " ") : "\\" + t;
                },
                rt = yt(
                    function (t) {
                        return !0 === t.disabled && "fieldset" === t.nodeName.toLowerCase();
                    },
                    { dir: "parentNode", next: "legend" }
                );
            try {
                $.apply((N = H.call(x.childNodes)), x.childNodes), N[x.childNodes.length].nodeType;
            } catch (n) {
                $ = {
                    apply: N.length
                        ? function (t, e) {
                              M.apply(t, H.call(e));
                          }
                        : function (t, e) {
                              for (var i = t.length, n = 0; (t[i++] = e[n++]); );
                              t.length = i - 1;
                          },
                };
            }
            function at(t, e, i, n) {
                var o,
                    r,
                    a,
                    h,
                    u,
                    d,
                    p,
                    m = e && e.ownerDocument,
                    b = e ? e.nodeType : 9;
                if (((i = i || []), "string" != typeof t || !t || (1 !== b && 9 !== b && 11 !== b))) return i;
                if (!n && ((e ? e.ownerDocument || e : x) !== g && f(e), (e = e || g), v)) {
                    if (11 !== b && (u = et.exec(t)))
                        if ((o = u[1])) {
                            if (9 === b) {
                                if (!(a = e.getElementById(o))) return i;
                                if (a.id === o) return i.push(a), i;
                            } else if (m && (a = m.getElementById(o)) && w(e, a) && a.id === o) return i.push(a), i;
                        } else {
                            if (u[2]) return $.apply(i, e.getElementsByTagName(t)), i;
                            if ((o = u[3]) && s.getElementsByClassName && e.getElementsByClassName) return $.apply(i, e.getElementsByClassName(o)), i;
                        }
                    if (s.qsa && !I[t + " "] && (!_ || !_.test(t)) && (1 !== b || "object" !== e.nodeName.toLowerCase())) {
                        if (((p = t), (m = e), 1 === b && K.test(t))) {
                            for ((h = e.getAttribute("id")) ? (h = h.replace(st, ot)) : e.setAttribute("id", (h = C)), r = (d = l(t)).length; r--; ) d[r] = "#" + h + " " + bt(d[r]);
                            (p = d.join(",")), (m = (it.test(t) && vt(e.parentNode)) || e);
                        }
                        try {
                            return $.apply(i, m.querySelectorAll(p)), i;
                        } catch (e) {
                            I(t, !0);
                        } finally {
                            h === C && e.removeAttribute("id");
                        }
                    }
                }
                return c(t.replace(B, "$1"), e, i, n);
            }
            function lt() {
                var t = [];
                return function e(i, n) {
                    return t.push(i + " ") > o.cacheLength && delete e[t.shift()], (e[i + " "] = n);
                };
            }
            function ht(t) {
                return (t[C] = !0), t;
            }
            function ct(t) {
                var e = g.createElement("fieldset");
                try {
                    return !!t(e);
                } catch (t) {
                    return !1;
                } finally {
                    e.parentNode && e.parentNode.removeChild(e), (e = null);
                }
            }
            function ut(t, e) {
                for (var i = t.split("|"), n = i.length; n--; ) o.attrHandle[i[n]] = e;
            }
            function dt(t, e) {
                var i = e && t,
                    n = i && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex;
                if (n) return n;
                if (i) for (; (i = i.nextSibling); ) if (i === e) return -1;
                return t ? 1 : -1;
            }
            function pt(t) {
                return function (e) {
                    return "input" === e.nodeName.toLowerCase() && e.type === t;
                };
            }
            function ft(t) {
                return function (e) {
                    var i = e.nodeName.toLowerCase();
                    return ("input" === i || "button" === i) && e.type === t;
                };
            }
            function gt(t) {
                return function (e) {
                    return "form" in e
                        ? e.parentNode && !1 === e.disabled
                            ? "label" in e
                                ? "label" in e.parentNode
                                    ? e.parentNode.disabled === t
                                    : e.disabled === t
                                : e.isDisabled === t || (e.isDisabled !== !t && rt(e) === t)
                            : e.disabled === t
                        : "label" in e && e.disabled === t;
                };
            }
            function mt(t) {
                return ht(function (e) {
                    return (
                        (e = +e),
                        ht(function (i, n) {
                            for (var s, o = t([], i.length, e), r = o.length; r--; ) i[(s = o[r])] && (i[s] = !(n[s] = i[s]));
                        })
                    );
                });
            }
            function vt(t) {
                return t && void 0 !== t.getElementsByTagName && t;
            }
            for (n in ((s = at.support = {}),
            (a = at.isXML = function (t) {
                var e = t.namespaceURI,
                    i = (t.ownerDocument || t).documentElement;
                return !G.test(e || (i && i.nodeName) || "HTML");
            }),
            (f = at.setDocument = function (t) {
                var n,
                    r,
                    l = t ? t.ownerDocument || t : x;
                return (
                    l !== g &&
                        9 === l.nodeType &&
                        l.documentElement &&
                        ((m = (g = l).documentElement),
                        (v = !a(g)),
                        x !== g && (r = g.defaultView) && r.top !== r && (r.addEventListener ? r.addEventListener("unload", i, !1) : r.attachEvent && r.attachEvent("onunload", i)),
                        (s.attributes = ct(function (t) {
                            return (t.className = "i"), !t.getAttribute("className");
                        })),
                        (s.getElementsByTagName = ct(function (t) {
                            return t.appendChild(g.createComment("")), !t.getElementsByTagName("*").length;
                        })),
                        (s.getElementsByClassName = tt.test(g.getElementsByClassName)),
                        (s.getById = ct(function (t) {
                            return (m.appendChild(t).id = C), !g.getElementsByName || !g.getElementsByName(C).length;
                        })),
                        s.getById
                            ? ((o.filter.ID = function (t) {
                                  var i = t.replace(nt, e);
                                  return function (t) {
                                      return t.getAttribute("id") === i;
                                  };
                              }),
                              (o.find.ID = function (t, e) {
                                  if (void 0 !== e.getElementById && v) {
                                      var i = e.getElementById(t);
                                      return i ? [i] : [];
                                  }
                              }))
                            : ((o.filter.ID = function (t) {
                                  var i = t.replace(nt, e);
                                  return function (t) {
                                      var e = void 0 !== t.getAttributeNode && t.getAttributeNode("id");
                                      return e && e.value === i;
                                  };
                              }),
                              (o.find.ID = function (t, e) {
                                  if (void 0 !== e.getElementById && v) {
                                      var i,
                                          n,
                                          s,
                                          o = e.getElementById(t);
                                      if (o) {
                                          if ((i = o.getAttributeNode("id")) && i.value === t) return [o];
                                          for (s = e.getElementsByName(t), n = 0; (o = s[n++]); ) if ((i = o.getAttributeNode("id")) && i.value === t) return [o];
                                      }
                                      return [];
                                  }
                              })),
                        (o.find.TAG = s.getElementsByTagName
                            ? function (t, e) {
                                  return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : s.qsa ? e.querySelectorAll(t) : void 0;
                              }
                            : function (t, e) {
                                  var i,
                                      n = [],
                                      s = 0,
                                      o = e.getElementsByTagName(t);
                                  if ("*" !== t) return o;
                                  for (; (i = o[s++]); ) 1 === i.nodeType && n.push(i);
                                  return n;
                              }),
                        (o.find.CLASS =
                            s.getElementsByClassName &&
                            function (t, e) {
                                if (void 0 !== e.getElementsByClassName && v) return e.getElementsByClassName(t);
                            }),
                        (b = []),
                        (_ = []),
                        (s.qsa = tt.test(g.querySelectorAll)) &&
                            (ct(function (t) {
                                (m.appendChild(t).innerHTML = "<a id='" + C + "'></a><select id='" + C + "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                                    t.querySelectorAll("[msallowcapture^='']").length && _.push("[*^$]=" + R + "*(?:''|\"\")"),
                                    t.querySelectorAll("[selected]").length || _.push("\\[" + R + "*(?:value|" + W + ")"),
                                    t.querySelectorAll("[id~=" + C + "-]").length || _.push("~="),
                                    t.querySelectorAll(":checked").length || _.push(":checked"),
                                    t.querySelectorAll("a#" + C + "+*").length || _.push(".#.+[+~]");
                            }),
                            ct(function (t) {
                                t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                                var e = g.createElement("input");
                                e.setAttribute("type", "hidden"),
                                    t.appendChild(e).setAttribute("name", "D"),
                                    t.querySelectorAll("[name=d]").length && _.push("name" + R + "*[*^$|!~]?="),
                                    2 !== t.querySelectorAll(":enabled").length && _.push(":enabled", ":disabled"),
                                    (m.appendChild(t).disabled = !0),
                                    2 !== t.querySelectorAll(":disabled").length && _.push(":enabled", ":disabled"),
                                    t.querySelectorAll("*,:x"),
                                    _.push(",.*:");
                            })),
                        (s.matchesSelector = tt.test((y = m.matches || m.webkitMatchesSelector || m.mozMatchesSelector || m.oMatchesSelector || m.msMatchesSelector))) &&
                            ct(function (t) {
                                (s.disconnectedMatch = y.call(t, "*")), y.call(t, "[s!='']:x"), b.push("!=", z);
                            }),
                        (_ = _.length && new RegExp(_.join("|"))),
                        (b = b.length && new RegExp(b.join("|"))),
                        (n = tt.test(m.compareDocumentPosition)),
                        (w =
                            n || tt.test(m.contains)
                                ? function (t, e) {
                                      var i = 9 === t.nodeType ? t.documentElement : t,
                                          n = e && e.parentNode;
                                      return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)));
                                  }
                                : function (t, e) {
                                      if (e) for (; (e = e.parentNode); ) if (e === t) return !0;
                                      return !1;
                                  }),
                        (A = n
                            ? function (t, e) {
                                  if (t === e) return (p = !0), 0;
                                  var i = !t.compareDocumentPosition - !e.compareDocumentPosition;
                                  return (
                                      i ||
                                      (1 & (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || (!s.sortDetached && e.compareDocumentPosition(t) === i)
                                          ? t === g || (t.ownerDocument === x && w(x, t))
                                              ? -1
                                              : e === g || (e.ownerDocument === x && w(x, e))
                                              ? 1
                                              : d
                                              ? L(d, t) - L(d, e)
                                              : 0
                                          : 4 & i
                                          ? -1
                                          : 1)
                                  );
                              }
                            : function (t, e) {
                                  if (t === e) return (p = !0), 0;
                                  var i,
                                      n = 0,
                                      s = t.parentNode,
                                      o = e.parentNode,
                                      r = [t],
                                      a = [e];
                                  if (!s || !o) return t === g ? -1 : e === g ? 1 : s ? -1 : o ? 1 : d ? L(d, t) - L(d, e) : 0;
                                  if (s === o) return dt(t, e);
                                  for (i = t; (i = i.parentNode); ) r.unshift(i);
                                  for (i = e; (i = i.parentNode); ) a.unshift(i);
                                  for (; r[n] === a[n]; ) n++;
                                  return n ? dt(r[n], a[n]) : r[n] === x ? -1 : a[n] === x ? 1 : 0;
                              })),
                    g
                );
            }),
            (at.matches = function (t, e) {
                return at(t, null, null, e);
            }),
            (at.matchesSelector = function (t, e) {
                if (((t.ownerDocument || t) !== g && f(t), s.matchesSelector && v && !I[e + " "] && (!b || !b.test(e)) && (!_ || !_.test(e))))
                    try {
                        var i = y.call(t, e);
                        if (i || s.disconnectedMatch || (t.document && 11 !== t.document.nodeType)) return i;
                    } catch (t) {
                        I(e, !0);
                    }
                return 0 < at(e, g, null, [t]).length;
            }),
            (at.contains = function (t, e) {
                return (t.ownerDocument || t) !== g && f(t), w(t, e);
            }),
            (at.attr = function (t, e) {
                (t.ownerDocument || t) !== g && f(t);
                var i = o.attrHandle[e.toLowerCase()],
                    n = i && P.call(o.attrHandle, e.toLowerCase()) ? i(t, e, !v) : void 0;
                return void 0 !== n ? n : s.attributes || !v ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null;
            }),
            (at.escape = function (t) {
                return (t + "").replace(st, ot);
            }),
            (at.error = function (t) {
                throw new Error("Syntax error, unrecognized expression: " + t);
            }),
            (at.uniqueSort = function (t) {
                var e,
                    i = [],
                    n = 0,
                    o = 0;
                if (((p = !s.detectDuplicates), (d = !s.sortStable && t.slice(0)), t.sort(A), p)) {
                    for (; (e = t[o++]); ) e === t[o] && (n = i.push(o));
                    for (; n--; ) t.splice(i[n], 1);
                }
                return (d = null), t;
            }),
            (r = at.getText = function (t) {
                var e,
                    i = "",
                    n = 0,
                    s = t.nodeType;
                if (s) {
                    if (1 === s || 9 === s || 11 === s) {
                        if ("string" == typeof t.textContent) return t.textContent;
                        for (t = t.firstChild; t; t = t.nextSibling) i += r(t);
                    } else if (3 === s || 4 === s) return t.nodeValue;
                } else for (; (e = t[n++]); ) i += r(e);
                return i;
            }),
            ((o = at.selectors = {
                cacheLength: 50,
                createPseudo: ht,
                match: Q,
                attrHandle: {},
                find: {},
                relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
                preFilter: {
                    ATTR: function (t) {
                        return (t[1] = t[1].replace(nt, e)), (t[3] = (t[3] || t[4] || t[5] || "").replace(nt, e)), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4);
                    },
                    CHILD: function (t) {
                        return (
                            (t[1] = t[1].toLowerCase()),
                            "nth" === t[1].slice(0, 3) ? (t[3] || at.error(t[0]), (t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3]))), (t[5] = +(t[7] + t[8] || "odd" === t[3]))) : t[3] && at.error(t[0]),
                            t
                        );
                    },
                    PSEUDO: function (t) {
                        var e,
                            i = !t[6] && t[2];
                        return Q.CHILD.test(t[0])
                            ? null
                            : (t[3] ? (t[2] = t[4] || t[5] || "") : i && V.test(i) && (e = l(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && ((t[0] = t[0].slice(0, e)), (t[2] = i.slice(0, e))), t.slice(0, 3));
                    },
                },
                filter: {
                    TAG: function (t) {
                        var i = t.replace(nt, e).toLowerCase();
                        return "*" === t
                            ? function () {
                                  return !0;
                              }
                            : function (t) {
                                  return t.nodeName && t.nodeName.toLowerCase() === i;
                              };
                    },
                    CLASS: function (t) {
                        var e = D[t + " "];
                        return (
                            e ||
                            ((e = new RegExp("(^|" + R + ")" + t + "(" + R + "|$)")) &&
                                D(t, function (t) {
                                    return e.test(("string" == typeof t.className && t.className) || (void 0 !== t.getAttribute && t.getAttribute("class")) || "");
                                }))
                        );
                    },
                    ATTR: function (t, e, i) {
                        return function (n) {
                            var s = at.attr(n, t);
                            return null == s
                                ? "!=" === e
                                : !e ||
                                      ((s += ""),
                                      "=" === e
                                          ? s === i
                                          : "!=" === e
                                          ? s !== i
                                          : "^=" === e
                                          ? i && 0 === s.indexOf(i)
                                          : "*=" === e
                                          ? i && -1 < s.indexOf(i)
                                          : "$=" === e
                                          ? i && s.slice(-i.length) === i
                                          : "~=" === e
                                          ? -1 < (" " + s.replace(q, " ") + " ").indexOf(i)
                                          : "|=" === e && (s === i || s.slice(0, i.length + 1) === i + "-"));
                        };
                    },
                    CHILD: function (t, e, i, n, s) {
                        var o = "nth" !== t.slice(0, 3),
                            r = "last" !== t.slice(-4),
                            a = "of-type" === e;
                        return 1 === n && 0 === s
                            ? function (t) {
                                  return !!t.parentNode;
                              }
                            : function (e, i, l) {
                                  var h,
                                      c,
                                      u,
                                      d,
                                      p,
                                      f,
                                      g = o != r ? "nextSibling" : "previousSibling",
                                      m = e.parentNode,
                                      v = a && e.nodeName.toLowerCase(),
                                      _ = !l && !a,
                                      b = !1;
                                  if (m) {
                                      if (o) {
                                          for (; g; ) {
                                              for (d = e; (d = d[g]); ) if (a ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
                                              f = g = "only" === t && !f && "nextSibling";
                                          }
                                          return !0;
                                      }
                                      if (((f = [r ? m.firstChild : m.lastChild]), r && _)) {
                                          for (
                                              b = (p = (h = (c = (u = (d = m)[C] || (d[C] = {}))[d.uniqueID] || (u[d.uniqueID] = {}))[t] || [])[0] === k && h[1]) && h[2], d = p && m.childNodes[p];
                                              (d = (++p && d && d[g]) || (b = p = 0) || f.pop());

                                          )
                                              if (1 === d.nodeType && ++b && d === e) {
                                                  c[t] = [k, p, b];
                                                  break;
                                              }
                                      } else if ((_ && (b = p = (h = (c = (u = (d = e)[C] || (d[C] = {}))[d.uniqueID] || (u[d.uniqueID] = {}))[t] || [])[0] === k && h[1]), !1 === b))
                                          for (
                                              ;
                                              (d = (++p && d && d[g]) || (b = p = 0) || f.pop()) &&
                                              ((a ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++b || (_ && ((c = (u = d[C] || (d[C] = {}))[d.uniqueID] || (u[d.uniqueID] = {}))[t] = [k, b]), d !== e));

                                          );
                                      return (b -= s) === n || (b % n == 0 && 0 <= b / n);
                                  }
                              };
                    },
                    PSEUDO: function (t, e) {
                        var i,
                            n = o.pseudos[t] || o.setFilters[t.toLowerCase()] || at.error("unsupported pseudo: " + t);
                        return n[C]
                            ? n(e)
                            : 1 < n.length
                            ? ((i = [t, t, "", e]),
                              o.setFilters.hasOwnProperty(t.toLowerCase())
                                  ? ht(function (t, i) {
                                        for (var s, o = n(t, e), r = o.length; r--; ) t[(s = L(t, o[r]))] = !(i[s] = o[r]);
                                    })
                                  : function (t) {
                                        return n(t, 0, i);
                                    })
                            : n;
                    },
                },
                pseudos: {
                    not: ht(function (t) {
                        var e = [],
                            i = [],
                            n = h(t.replace(B, "$1"));
                        return n[C]
                            ? ht(function (t, e, i, s) {
                                  for (var o, r = n(t, null, s, []), a = t.length; a--; ) (o = r[a]) && (t[a] = !(e[a] = o));
                              })
                            : function (t, s, o) {
                                  return (e[0] = t), n(e, null, o, i), (e[0] = null), !i.pop();
                              };
                    }),
                    has: ht(function (t) {
                        return function (e) {
                            return 0 < at(t, e).length;
                        };
                    }),
                    contains: ht(function (t) {
                        return (
                            (t = t.replace(nt, e)),
                            function (e) {
                                return -1 < (e.textContent || r(e)).indexOf(t);
                            }
                        );
                    }),
                    lang: ht(function (t) {
                        return (
                            X.test(t || "") || at.error("unsupported lang: " + t),
                            (t = t.replace(nt, e).toLowerCase()),
                            function (e) {
                                var i;
                                do {
                                    if ((i = v ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))) return (i = i.toLowerCase()) === t || 0 === i.indexOf(t + "-");
                                } while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1;
                            }
                        );
                    }),
                    target: function (e) {
                        var i = t.location && t.location.hash;
                        return i && i.slice(1) === e.id;
                    },
                    root: function (t) {
                        return t === m;
                    },
                    focus: function (t) {
                        return t === g.activeElement && (!g.hasFocus || g.hasFocus()) && !!(t.type || t.href || ~t.tabIndex);
                    },
                    enabled: gt(!1),
                    disabled: gt(!0),
                    checked: function (t) {
                        var e = t.nodeName.toLowerCase();
                        return ("input" === e && !!t.checked) || ("option" === e && !!t.selected);
                    },
                    selected: function (t) {
                        return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected;
                    },
                    empty: function (t) {
                        for (t = t.firstChild; t; t = t.nextSibling) if (t.nodeType < 6) return !1;
                        return !0;
                    },
                    parent: function (t) {
                        return !o.pseudos.empty(t);
                    },
                    header: function (t) {
                        return Z.test(t.nodeName);
                    },
                    input: function (t) {
                        return J.test(t.nodeName);
                    },
                    button: function (t) {
                        var e = t.nodeName.toLowerCase();
                        return ("input" === e && "button" === t.type) || "button" === e;
                    },
                    text: function (t) {
                        var e;
                        return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase());
                    },
                    first: mt(function () {
                        return [0];
                    }),
                    last: mt(function (t, e) {
                        return [e - 1];
                    }),
                    eq: mt(function (t, e, i) {
                        return [i < 0 ? i + e : i];
                    }),
                    even: mt(function (t, e) {
                        for (var i = 0; i < e; i += 2) t.push(i);
                        return t;
                    }),
                    odd: mt(function (t, e) {
                        for (var i = 1; i < e; i += 2) t.push(i);
                        return t;
                    }),
                    lt: mt(function (t, e, i) {
                        for (var n = i < 0 ? i + e : e < i ? e : i; 0 <= --n; ) t.push(n);
                        return t;
                    }),
                    gt: mt(function (t, e, i) {
                        for (var n = i < 0 ? i + e : i; ++n < e; ) t.push(n);
                        return t;
                    }),
                },
            }).pseudos.nth = o.pseudos.eq),
            { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
                o.pseudos[n] = pt(n);
            for (n in { submit: !0, reset: !0 }) o.pseudos[n] = ft(n);
            function _t() {}
            function bt(t) {
                for (var e = 0, i = t.length, n = ""; e < i; e++) n += t[e].value;
                return n;
            }
            function yt(t, e, i) {
                var n = e.dir,
                    s = e.next,
                    o = s || n,
                    r = i && "parentNode" === o,
                    a = T++;
                return e.first
                    ? function (e, i, s) {
                          for (; (e = e[n]); ) if (1 === e.nodeType || r) return t(e, i, s);
                          return !1;
                      }
                    : function (e, i, l) {
                          var h,
                              c,
                              u,
                              d = [k, a];
                          if (l) {
                              for (; (e = e[n]); ) if ((1 === e.nodeType || r) && t(e, i, l)) return !0;
                          } else
                              for (; (e = e[n]); )
                                  if (1 === e.nodeType || r)
                                      if (((c = (u = e[C] || (e[C] = {}))[e.uniqueID] || (u[e.uniqueID] = {})), s && s === e.nodeName.toLowerCase())) e = e[n] || e;
                                      else {
                                          if ((h = c[o]) && h[0] === k && h[1] === a) return (d[2] = h[2]);
                                          if (((c[o] = d)[2] = t(e, i, l))) return !0;
                                      }
                          return !1;
                      };
            }
            function wt(t) {
                return 1 < t.length
                    ? function (e, i, n) {
                          for (var s = t.length; s--; ) if (!t[s](e, i, n)) return !1;
                          return !0;
                      }
                    : t[0];
            }
            function Ct(t, e, i, n, s) {
                for (var o, r = [], a = 0, l = t.length, h = null != e; a < l; a++) (o = t[a]) && ((i && !i(o, n, s)) || (r.push(o), h && e.push(a)));
                return r;
            }
            function xt(t, e, i, n, s, o) {
                return (
                    n && !n[C] && (n = xt(n)),
                    s && !s[C] && (s = xt(s, o)),
                    ht(function (o, r, a, l) {
                        var h,
                            c,
                            u,
                            d = [],
                            p = [],
                            f = r.length,
                            g =
                                o ||
                                (function (t, e, i) {
                                    for (var n = 0, s = e.length; n < s; n++) at(t, e[n], i);
                                    return i;
                                })(e || "*", a.nodeType ? [a] : a, []),
                            m = !t || (!o && e) ? g : Ct(g, d, t, a, l),
                            v = i ? (s || (o ? t : f || n) ? [] : r) : m;
                        if ((i && i(m, v, a, l), n)) for (h = Ct(v, p), n(h, [], a, l), c = h.length; c--; ) (u = h[c]) && (v[p[c]] = !(m[p[c]] = u));
                        if (o) {
                            if (s || t) {
                                if (s) {
                                    for (h = [], c = v.length; c--; ) (u = v[c]) && h.push((m[c] = u));
                                    s(null, (v = []), h, l);
                                }
                                for (c = v.length; c--; ) (u = v[c]) && -1 < (h = s ? L(o, u) : d[c]) && (o[h] = !(r[h] = u));
                            }
                        } else (v = Ct(v === r ? v.splice(f, v.length) : v)), s ? s(null, r, v, l) : $.apply(r, v);
                    })
                );
            }
            function kt(t) {
                for (
                    var e,
                        i,
                        n,
                        s = t.length,
                        r = o.relative[t[0].type],
                        a = r || o.relative[" "],
                        l = r ? 1 : 0,
                        h = yt(
                            function (t) {
                                return t === e;
                            },
                            a,
                            !0
                        ),
                        c = yt(
                            function (t) {
                                return -1 < L(e, t);
                            },
                            a,
                            !0
                        ),
                        d = [
                            function (t, i, n) {
                                var s = (!r && (n || i !== u)) || ((e = i).nodeType ? h(t, i, n) : c(t, i, n));
                                return (e = null), s;
                            },
                        ];
                    l < s;
                    l++
                )
                    if ((i = o.relative[t[l].type])) d = [yt(wt(d), i)];
                    else {
                        if ((i = o.filter[t[l].type].apply(null, t[l].matches))[C]) {
                            for (n = ++l; n < s && !o.relative[t[n].type]; n++);
                            return xt(1 < l && wt(d), 1 < l && bt(t.slice(0, l - 1).concat({ value: " " === t[l - 2].type ? "*" : "" })).replace(B, "$1"), i, l < n && kt(t.slice(l, n)), n < s && kt((t = t.slice(n))), n < s && bt(t));
                        }
                        d.push(i);
                    }
                return wt(d);
            }
            return (
                (_t.prototype = o.filters = o.pseudos),
                (o.setFilters = new _t()),
                (l = at.tokenize = function (t, e) {
                    var i,
                        n,
                        s,
                        r,
                        a,
                        l,
                        h,
                        c = S[t + " "];
                    if (c) return e ? 0 : c.slice(0);
                    for (a = t, l = [], h = o.preFilter; a; ) {
                        for (r in ((i && !(n = U.exec(a))) || (n && (a = a.slice(n[0].length) || a), l.push((s = []))),
                        (i = !1),
                        (n = Y.exec(a)) && ((i = n.shift()), s.push({ value: i, type: n[0].replace(B, " ") }), (a = a.slice(i.length))),
                        o.filter))
                            !(n = Q[r].exec(a)) || (h[r] && !(n = h[r](n))) || ((i = n.shift()), s.push({ value: i, type: r, matches: n }), (a = a.slice(i.length)));
                        if (!i) break;
                    }
                    return e ? a.length : a ? at.error(t) : S(t, l).slice(0);
                }),
                (h = at.compile = function (t, e) {
                    var i,
                        n,
                        s,
                        r,
                        a,
                        h,
                        c = [],
                        d = [],
                        p = E[t + " "];
                    if (!p) {
                        for (i = (e = e || l(t)).length; i--; ) (p = kt(e[i]))[C] ? c.push(p) : d.push(p);
                        (p = E(
                            t,
                            ((n = d),
                            (r = 0 < (s = c).length),
                            (a = 0 < n.length),
                            (h = function (t, e, i, l, h) {
                                var c,
                                    d,
                                    p,
                                    m = 0,
                                    _ = "0",
                                    b = t && [],
                                    y = [],
                                    w = u,
                                    C = t || (a && o.find.TAG("*", h)),
                                    x = (k += null == w ? 1 : Math.random() || 0.1),
                                    T = C.length;
                                for (h && (u = e === g || e || h); _ !== T && null != (c = C[_]); _++) {
                                    if (a && c) {
                                        for (d = 0, e || c.ownerDocument === g || (f(c), (i = !v)); (p = n[d++]); )
                                            if (p(c, e || g, i)) {
                                                l.push(c);
                                                break;
                                            }
                                        h && (k = x);
                                    }
                                    r && ((c = !p && c) && m--, t && b.push(c));
                                }
                                if (((m += _), r && _ !== m)) {
                                    for (d = 0; (p = s[d++]); ) p(b, y, e, i);
                                    if (t) {
                                        if (0 < m) for (; _--; ) b[_] || y[_] || (y[_] = O.call(l));
                                        y = Ct(y);
                                    }
                                    $.apply(l, y), h && !t && 0 < y.length && 1 < m + s.length && at.uniqueSort(l);
                                }
                                return h && ((k = x), (u = w)), b;
                            }),
                            r ? ht(h) : h)
                        )).selector = t;
                    }
                    return p;
                }),
                (c = at.select = function (t, i, n, s) {
                    var r,
                        a,
                        c,
                        u,
                        d,
                        p = "function" == typeof t && t,
                        f = !s && l((t = p.selector || t));
                    if (((n = n || []), 1 === f.length)) {
                        if (2 < (a = f[0] = f[0].slice(0)).length && "ID" === (c = a[0]).type && 9 === i.nodeType && v && o.relative[a[1].type]) {
                            if (!(i = (o.find.ID(c.matches[0].replace(nt, e), i) || [])[0])) return n;
                            p && (i = i.parentNode), (t = t.slice(a.shift().value.length));
                        }
                        for (r = Q.needsContext.test(t) ? 0 : a.length; r-- && ((c = a[r]), !o.relative[(u = c.type)]); )
                            if ((d = o.find[u]) && (s = d(c.matches[0].replace(nt, e), (it.test(a[0].type) && vt(i.parentNode)) || i))) {
                                if ((a.splice(r, 1), !(t = s.length && bt(a)))) return $.apply(n, s), n;
                                break;
                            }
                    }
                    return (p || h(t, f))(s, i, !v, n, !i || (it.test(t) && vt(i.parentNode)) || i), n;
                }),
                (s.sortStable = C.split("").sort(A).join("") === C),
                (s.detectDuplicates = !!p),
                f(),
                (s.sortDetached = ct(function (t) {
                    return 1 & t.compareDocumentPosition(g.createElement("fieldset"));
                })),
                ct(function (t) {
                    return (t.innerHTML = "<a href='#'></a>"), "#" === t.firstChild.getAttribute("href");
                }) ||
                    ut("type|href|height|width", function (t, e, i) {
                        if (!i) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2);
                    }),
                (s.attributes &&
                    ct(function (t) {
                        return (t.innerHTML = "<input/>"), t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value");
                    })) ||
                    ut("value", function (t, e, i) {
                        if (!i && "input" === t.nodeName.toLowerCase()) return t.defaultValue;
                    }),
                ct(function (t) {
                    return null == t.getAttribute("disabled");
                }) ||
                    ut(W, function (t, e, i) {
                        var n;
                        if (!i) return !0 === t[e] ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null;
                    }),
                at
            );
        })(t);
        function k(t, e, i) {
            for (var n = [], s = void 0 !== i; (t = t[e]) && 9 !== t.nodeType; )
                if (1 === t.nodeType) {
                    if (s && y(t).is(i)) break;
                    n.push(t);
                }
            return n;
        }
        function T(t, e) {
            for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
            return i;
        }
        (y.find = x), (y.expr = x.selectors), (y.expr[":"] = y.expr.pseudos), (y.uniqueSort = y.unique = x.uniqueSort), (y.text = x.getText), (y.isXMLDoc = x.isXML), (y.contains = x.contains), (y.escapeSelector = x.escape);
        var D = y.expr.match.needsContext;
        function S(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
        }
        var E = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        function I(t, e, i) {
            return m(e)
                ? y.grep(t, function (t, n) {
                      return !!e.call(t, n, t) !== i;
                  })
                : e.nodeType
                ? y.grep(t, function (t) {
                      return (t === e) !== i;
                  })
                : "string" != typeof e
                ? y.grep(t, function (t) {
                      return -1 < h.call(e, t) !== i;
                  })
                : y.filter(e, t, i);
        }
        (y.filter = function (t, e, i) {
            var n = e[0];
            return (
                i && (t = ":not(" + t + ")"),
                1 === e.length && 1 === n.nodeType
                    ? y.find.matchesSelector(n, t)
                        ? [n]
                        : []
                    : y.find.matches(
                          t,
                          y.grep(e, function (t) {
                              return 1 === t.nodeType;
                          })
                      )
            );
        }),
            y.fn.extend({
                find: function (t) {
                    var e,
                        i,
                        n = this.length,
                        s = this;
                    if ("string" != typeof t)
                        return this.pushStack(
                            y(t).filter(function () {
                                for (e = 0; e < n; e++) if (y.contains(s[e], this)) return !0;
                            })
                        );
                    for (i = this.pushStack([]), e = 0; e < n; e++) y.find(t, s[e], i);
                    return 1 < n ? y.uniqueSort(i) : i;
                },
                filter: function (t) {
                    return this.pushStack(I(this, t || [], !1));
                },
                not: function (t) {
                    return this.pushStack(I(this, t || [], !0));
                },
                is: function (t) {
                    return !!I(this, "string" == typeof t && D.test(t) ? y(t) : t || [], !1).length;
                },
            });
        var A,
            P = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        ((y.fn.init = function (t, e, i) {
            var n, o;
            if (!t) return this;
            if (((i = i || A), "string" != typeof t)) return t.nodeType ? ((this[0] = t), (this.length = 1), this) : m(t) ? (void 0 !== i.ready ? i.ready(t) : t(y)) : y.makeArray(t, this);
            if (!(n = "<" === t[0] && ">" === t[t.length - 1] && 3 <= t.length ? [null, t, null] : P.exec(t)) || (!n[1] && e)) return !e || e.jquery ? (e || i).find(t) : this.constructor(e).find(t);
            if (n[1]) {
                if (((e = e instanceof y ? e[0] : e), y.merge(this, y.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : s, !0)), E.test(n[1]) && y.isPlainObject(e))) for (n in e) m(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
                return this;
            }
            return (o = s.getElementById(n[2])) && ((this[0] = o), (this.length = 1)), this;
        }).prototype = y.fn),
            (A = y(s));
        var N = /^(?:parents|prev(?:Until|All))/,
            O = { children: !0, contents: !0, next: !0, prev: !0 };
        function M(t, e) {
            for (; (t = t[e]) && 1 !== t.nodeType; );
            return t;
        }
        y.fn.extend({
            has: function (t) {
                var e = y(t, this),
                    i = e.length;
                return this.filter(function () {
                    for (var t = 0; t < i; t++) if (y.contains(this, e[t])) return !0;
                });
            },
            closest: function (t, e) {
                var i,
                    n = 0,
                    s = this.length,
                    o = [],
                    r = "string" != typeof t && y(t);
                if (!D.test(t))
                    for (; n < s; n++)
                        for (i = this[n]; i && i !== e; i = i.parentNode)
                            if (i.nodeType < 11 && (r ? -1 < r.index(i) : 1 === i.nodeType && y.find.matchesSelector(i, t))) {
                                o.push(i);
                                break;
                            }
                return this.pushStack(1 < o.length ? y.uniqueSort(o) : o);
            },
            index: function (t) {
                return t ? ("string" == typeof t ? h.call(y(t), this[0]) : h.call(this, t.jquery ? t[0] : t)) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            },
            add: function (t, e) {
                return this.pushStack(y.uniqueSort(y.merge(this.get(), y(t, e))));
            },
            addBack: function (t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
            },
        }),
            y.each(
                {
                    parent: function (t) {
                        var e = t.parentNode;
                        return e && 11 !== e.nodeType ? e : null;
                    },
                    parents: function (t) {
                        return k(t, "parentNode");
                    },
                    parentsUntil: function (t, e, i) {
                        return k(t, "parentNode", i);
                    },
                    next: function (t) {
                        return M(t, "nextSibling");
                    },
                    prev: function (t) {
                        return M(t, "previousSibling");
                    },
                    nextAll: function (t) {
                        return k(t, "nextSibling");
                    },
                    prevAll: function (t) {
                        return k(t, "previousSibling");
                    },
                    nextUntil: function (t, e, i) {
                        return k(t, "nextSibling", i);
                    },
                    prevUntil: function (t, e, i) {
                        return k(t, "previousSibling", i);
                    },
                    siblings: function (t) {
                        return T((t.parentNode || {}).firstChild, t);
                    },
                    children: function (t) {
                        return T(t.firstChild);
                    },
                    contents: function (t) {
                        return void 0 !== t.contentDocument ? t.contentDocument : (S(t, "template") && (t = t.content || t), y.merge([], t.childNodes));
                    },
                },
                function (t, e) {
                    y.fn[t] = function (i, n) {
                        var s = y.map(this, e, i);
                        return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (s = y.filter(n, s)), 1 < this.length && (O[t] || y.uniqueSort(s), N.test(t) && s.reverse()), this.pushStack(s);
                    };
                }
            );
        var $ = /[^\x20\t\r\n\f]+/g;
        function H(t) {
            return t;
        }
        function L(t) {
            throw t;
        }
        function W(t, e, i, n) {
            var s;
            try {
                t && m((s = t.promise)) ? s.call(t).done(e).fail(i) : t && m((s = t.then)) ? s.call(t, e, i) : e.apply(void 0, [t].slice(n));
            } catch (t) {
                i.apply(void 0, [t]);
            }
        }
        (y.Callbacks = function (t) {
            var e, i;
            function n() {
                for (a = a || t.once, r = s = !0; h.length; c = -1) for (o = h.shift(); ++c < l.length; ) !1 === l[c].apply(o[0], o[1]) && t.stopOnFalse && ((c = l.length), (o = !1));
                t.memory || (o = !1), (s = !1), a && (l = o ? [] : "");
            }
            t =
                "string" == typeof t
                    ? ((e = t),
                      (i = {}),
                      y.each(e.match($) || [], function (t, e) {
                          i[e] = !0;
                      }),
                      i)
                    : y.extend({}, t);
            var s,
                o,
                r,
                a,
                l = [],
                h = [],
                c = -1,
                u = {
                    add: function () {
                        return (
                            l &&
                                (o && !s && ((c = l.length - 1), h.push(o)),
                                (function e(i) {
                                    y.each(i, function (i, n) {
                                        m(n) ? (t.unique && u.has(n)) || l.push(n) : n && n.length && "string" !== b(n) && e(n);
                                    });
                                })(arguments),
                                o && !s && n()),
                            this
                        );
                    },
                    remove: function () {
                        return (
                            y.each(arguments, function (t, e) {
                                for (var i; -1 < (i = y.inArray(e, l, i)); ) l.splice(i, 1), i <= c && c--;
                            }),
                            this
                        );
                    },
                    has: function (t) {
                        return t ? -1 < y.inArray(t, l) : 0 < l.length;
                    },
                    empty: function () {
                        return (l = l && []), this;
                    },
                    disable: function () {
                        return (a = h = []), (l = o = ""), this;
                    },
                    disabled: function () {
                        return !l;
                    },
                    lock: function () {
                        return (a = h = []), o || s || (l = o = ""), this;
                    },
                    locked: function () {
                        return !!a;
                    },
                    fireWith: function (t, e) {
                        return a || ((e = [t, (e = e || []).slice ? e.slice() : e]), h.push(e), s || n()), this;
                    },
                    fire: function () {
                        return u.fireWith(this, arguments), this;
                    },
                    fired: function () {
                        return !!r;
                    },
                };
            return u;
        }),
            y.extend({
                Deferred: function (e) {
                    var i = [
                            ["notify", "progress", y.Callbacks("memory"), y.Callbacks("memory"), 2],
                            ["resolve", "done", y.Callbacks("once memory"), y.Callbacks("once memory"), 0, "resolved"],
                            ["reject", "fail", y.Callbacks("once memory"), y.Callbacks("once memory"), 1, "rejected"],
                        ],
                        n = "pending",
                        s = {
                            state: function () {
                                return n;
                            },
                            always: function () {
                                return o.done(arguments).fail(arguments), this;
                            },
                            catch: function (t) {
                                return s.then(null, t);
                            },
                            pipe: function () {
                                var t = arguments;
                                return y
                                    .Deferred(function (e) {
                                        y.each(i, function (i, n) {
                                            var s = m(t[n[4]]) && t[n[4]];
                                            o[n[1]](function () {
                                                var t = s && s.apply(this, arguments);
                                                t && m(t.promise) ? t.promise().progress(e.notify).done(e.resolve).fail(e.reject) : e[n[0] + "With"](this, s ? [t] : arguments);
                                            });
                                        }),
                                            (t = null);
                                    })
                                    .promise();
                            },
                            then: function (e, n, s) {
                                var o = 0;
                                function r(e, i, n, s) {
                                    return function () {
                                        function a() {
                                            var t, a;
                                            if (!(e < o)) {
                                                if ((t = n.apply(l, h)) === i.promise()) throw new TypeError("Thenable self-resolution");
                                                (a = t && ("object" == typeof t || "function" == typeof t) && t.then),
                                                    m(a)
                                                        ? s
                                                            ? a.call(t, r(o, i, H, s), r(o, i, L, s))
                                                            : (o++, a.call(t, r(o, i, H, s), r(o, i, L, s), r(o, i, H, i.notifyWith)))
                                                        : (n !== H && ((l = void 0), (h = [t])), (s || i.resolveWith)(l, h));
                                            }
                                        }
                                        var l = this,
                                            h = arguments,
                                            c = s
                                                ? a
                                                : function () {
                                                      try {
                                                          a();
                                                      } catch (t) {
                                                          y.Deferred.exceptionHook && y.Deferred.exceptionHook(t, c.stackTrace), o <= e + 1 && (n !== L && ((l = void 0), (h = [t])), i.rejectWith(l, h));
                                                      }
                                                  };
                                        e ? c() : (y.Deferred.getStackHook && (c.stackTrace = y.Deferred.getStackHook()), t.setTimeout(c));
                                    };
                                }
                                return y
                                    .Deferred(function (t) {
                                        i[0][3].add(r(0, t, m(s) ? s : H, t.notifyWith)), i[1][3].add(r(0, t, m(e) ? e : H)), i[2][3].add(r(0, t, m(n) ? n : L));
                                    })
                                    .promise();
                            },
                            promise: function (t) {
                                return null != t ? y.extend(t, s) : s;
                            },
                        },
                        o = {};
                    return (
                        y.each(i, function (t, e) {
                            var r = e[2],
                                a = e[5];
                            (s[e[1]] = r.add),
                                a &&
                                    r.add(
                                        function () {
                                            n = a;
                                        },
                                        i[3 - t][2].disable,
                                        i[3 - t][3].disable,
                                        i[0][2].lock,
                                        i[0][3].lock
                                    ),
                                r.add(e[3].fire),
                                (o[e[0]] = function () {
                                    return o[e[0] + "With"](this === o ? void 0 : this, arguments), this;
                                }),
                                (o[e[0] + "With"] = r.fireWith);
                        }),
                        s.promise(o),
                        e && e.call(o, o),
                        o
                    );
                },
                when: function (t) {
                    function e(t) {
                        return function (e) {
                            (s[t] = this), (o[t] = 1 < arguments.length ? r.call(arguments) : e), --i || a.resolveWith(s, o);
                        };
                    }
                    var i = arguments.length,
                        n = i,
                        s = Array(n),
                        o = r.call(arguments),
                        a = y.Deferred();
                    if (i <= 1 && (W(t, a.done(e(n)).resolve, a.reject, !i), "pending" === a.state() || m(o[n] && o[n].then))) return a.then();
                    for (; n--; ) W(o[n], e(n), a.reject);
                    return a.promise();
                },
            });
        var R = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        (y.Deferred.exceptionHook = function (e, i) {
            t.console && t.console.warn && e && R.test(e.name) && t.console.warn("jQuery.Deferred exception: " + e.message, e.stack, i);
        }),
            (y.readyException = function (e) {
                t.setTimeout(function () {
                    throw e;
                });
            });
        var F = y.Deferred();
        function j() {
            s.removeEventListener("DOMContentLoaded", j), t.removeEventListener("load", j), y.ready();
        }
        (y.fn.ready = function (t) {
            return (
                F.then(t).catch(function (t) {
                    y.readyException(t);
                }),
                this
            );
        }),
            y.extend({
                isReady: !1,
                readyWait: 1,
                ready: function (t) {
                    (!0 === t ? --y.readyWait : y.isReady) || ((y.isReady = !0) !== t && 0 < --y.readyWait) || F.resolveWith(s, [y]);
                },
            }),
            (y.ready.then = F.then),
            "complete" === s.readyState || ("loading" !== s.readyState && !s.documentElement.doScroll) ? t.setTimeout(y.ready) : (s.addEventListener("DOMContentLoaded", j), t.addEventListener("load", j));
        var z = function (t, e, i, n, s, o, r) {
                var a = 0,
                    l = t.length,
                    h = null == i;
                if ("object" === b(i)) for (a in ((s = !0), i)) z(t, e, a, i[a], !0, o, r);
                else if (
                    void 0 !== n &&
                    ((s = !0),
                    m(n) || (r = !0),
                    h &&
                        (e = r
                            ? (e.call(t, n), null)
                            : ((h = e),
                              function (t, e, i) {
                                  return h.call(y(t), i);
                              })),
                    e)
                )
                    for (; a < l; a++) e(t[a], i, r ? n : n.call(t[a], a, e(t[a], i)));
                return s ? t : h ? e.call(t) : l ? e(t[0], i) : o;
            },
            q = /^-ms-/,
            B = /-([a-z])/g;
        function U(t, e) {
            return e.toUpperCase();
        }
        function Y(t) {
            return t.replace(q, "ms-").replace(B, U);
        }
        function K(t) {
            return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
        }
        function V() {
            this.expando = y.expando + V.uid++;
        }
        (V.uid = 1),
            (V.prototype = {
                cache: function (t) {
                    var e = t[this.expando];
                    return e || ((e = {}), K(t) && (t.nodeType ? (t[this.expando] = e) : Object.defineProperty(t, this.expando, { value: e, configurable: !0 }))), e;
                },
                set: function (t, e, i) {
                    var n,
                        s = this.cache(t);
                    if ("string" == typeof e) s[Y(e)] = i;
                    else for (n in e) s[Y(n)] = e[n];
                    return s;
                },
                get: function (t, e) {
                    return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][Y(e)];
                },
                access: function (t, e, i) {
                    return void 0 === e || (e && "string" == typeof e && void 0 === i) ? this.get(t, e) : (this.set(t, e, i), void 0 !== i ? i : e);
                },
                remove: function (t, e) {
                    var i,
                        n = t[this.expando];
                    if (void 0 !== n) {
                        if (void 0 !== e) {
                            i = (e = Array.isArray(e) ? e.map(Y) : (e = Y(e)) in n ? [e] : e.match($) || []).length;
                            for (; i--; ) delete n[e[i]];
                        }
                        (void 0 !== e && !y.isEmptyObject(n)) || (t.nodeType ? (t[this.expando] = void 0) : delete t[this.expando]);
                    }
                },
                hasData: function (t) {
                    var e = t[this.expando];
                    return void 0 !== e && !y.isEmptyObject(e);
                },
            });
        var X = new V(),
            Q = new V(),
            G = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            J = /[A-Z]/g;
        function Z(t, e, i) {
            var n, s;
            if (void 0 === i && 1 === t.nodeType)
                if (((n = "data-" + e.replace(J, "-$&").toLowerCase()), "string" == typeof (i = t.getAttribute(n)))) {
                    try {
                        i = "true" === (s = i) || ("false" !== s && ("null" === s ? null : s === +s + "" ? +s : G.test(s) ? JSON.parse(s) : s));
                    } catch (t) {}
                    Q.set(t, e, i);
                } else i = void 0;
            return i;
        }
        y.extend({
            hasData: function (t) {
                return Q.hasData(t) || X.hasData(t);
            },
            data: function (t, e, i) {
                return Q.access(t, e, i);
            },
            removeData: function (t, e) {
                Q.remove(t, e);
            },
            _data: function (t, e, i) {
                return X.access(t, e, i);
            },
            _removeData: function (t, e) {
                X.remove(t, e);
            },
        }),
            y.fn.extend({
                data: function (t, e) {
                    var i,
                        n,
                        s,
                        o = this[0],
                        r = o && o.attributes;
                    if (void 0 !== t)
                        return "object" == typeof t
                            ? this.each(function () {
                                  Q.set(this, t);
                              })
                            : z(
                                  this,
                                  function (e) {
                                      var i;
                                      if (o && void 0 === e) return void 0 !== (i = Q.get(o, t)) ? i : void 0 !== (i = Z(o, t)) ? i : void 0;
                                      this.each(function () {
                                          Q.set(this, t, e);
                                      });
                                  },
                                  null,
                                  e,
                                  1 < arguments.length,
                                  null,
                                  !0
                              );
                    if (this.length && ((s = Q.get(o)), 1 === o.nodeType && !X.get(o, "hasDataAttrs"))) {
                        for (i = r.length; i--; ) r[i] && 0 === (n = r[i].name).indexOf("data-") && ((n = Y(n.slice(5))), Z(o, n, s[n]));
                        X.set(o, "hasDataAttrs", !0);
                    }
                    return s;
                },
                removeData: function (t) {
                    return this.each(function () {
                        Q.remove(this, t);
                    });
                },
            }),
            y.extend({
                queue: function (t, e, i) {
                    var n;
                    if (t) return (e = (e || "fx") + "queue"), (n = X.get(t, e)), i && (!n || Array.isArray(i) ? (n = X.access(t, e, y.makeArray(i))) : n.push(i)), n || [];
                },
                dequeue: function (t, e) {
                    e = e || "fx";
                    var i = y.queue(t, e),
                        n = i.length,
                        s = i.shift(),
                        o = y._queueHooks(t, e);
                    "inprogress" === s && ((s = i.shift()), n--),
                        s &&
                            ("fx" === e && i.unshift("inprogress"),
                            delete o.stop,
                            s.call(
                                t,
                                function () {
                                    y.dequeue(t, e);
                                },
                                o
                            )),
                        !n && o && o.empty.fire();
                },
                _queueHooks: function (t, e) {
                    var i = e + "queueHooks";
                    return (
                        X.get(t, i) ||
                        X.access(t, i, {
                            empty: y.Callbacks("once memory").add(function () {
                                X.remove(t, [e + "queue", i]);
                            }),
                        })
                    );
                },
            }),
            y.fn.extend({
                queue: function (t, e) {
                    var i = 2;
                    return (
                        "string" != typeof t && ((e = t), (t = "fx"), i--),
                        arguments.length < i
                            ? y.queue(this[0], t)
                            : void 0 === e
                            ? this
                            : this.each(function () {
                                  var i = y.queue(this, t, e);
                                  y._queueHooks(this, t), "fx" === t && "inprogress" !== i[0] && y.dequeue(this, t);
                              })
                    );
                },
                dequeue: function (t) {
                    return this.each(function () {
                        y.dequeue(this, t);
                    });
                },
                clearQueue: function (t) {
                    return this.queue(t || "fx", []);
                },
                promise: function (t, e) {
                    function i() {
                        --s || o.resolveWith(r, [r]);
                    }
                    var n,
                        s = 1,
                        o = y.Deferred(),
                        r = this,
                        a = this.length;
                    for ("string" != typeof t && ((e = t), (t = void 0)), t = t || "fx"; a--; ) (n = X.get(r[a], t + "queueHooks")) && n.empty && (s++, n.empty.add(i));
                    return i(), o.promise(e);
                },
            });
        var tt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            et = new RegExp("^(?:([+-])=|)(" + tt + ")([a-z%]*)$", "i"),
            it = ["Top", "Right", "Bottom", "Left"],
            nt = s.documentElement,
            st = function (t) {
                return y.contains(t.ownerDocument, t);
            },
            ot = { composed: !0 };
        function rt(t, e) {
            return "none" === (t = e || t).style.display || ("" === t.style.display && st(t) && "none" === y.css(t, "display"));
        }
        function at(t, e, i, n) {
            var s,
                o,
                r = {};
            for (o in e) (r[o] = t.style[o]), (t.style[o] = e[o]);
            for (o in ((s = i.apply(t, n || [])), e)) t.style[o] = r[o];
            return s;
        }
        function lt(t, e, i, n) {
            var s,
                o,
                r = 20,
                a = n
                    ? function () {
                          return n.cur();
                      }
                    : function () {
                          return y.css(t, e, "");
                      },
                l = a(),
                h = (i && i[3]) || (y.cssNumber[e] ? "" : "px"),
                c = t.nodeType && (y.cssNumber[e] || ("px" !== h && +l)) && et.exec(y.css(t, e));
            if (c && c[3] !== h) {
                for (l /= 2, h = h || c[3], c = +l || 1; r--; ) y.style(t, e, c + h), (1 - o) * (1 - (o = a() / l || 0.5)) <= 0 && (r = 0), (c /= o);
                (c *= 2), y.style(t, e, c + h), (i = i || []);
            }
            return i && ((c = +c || +l || 0), (s = i[1] ? c + (i[1] + 1) * i[2] : +i[2]), n && ((n.unit = h), (n.start = c), (n.end = s))), s;
        }
        nt.getRootNode &&
            (st = function (t) {
                return y.contains(t.ownerDocument, t) || t.getRootNode(ot) === t.ownerDocument;
            });
        var ht = {};
        function ct(t, e) {
            for (var i, n, s, o, r, a, l, h = [], c = 0, u = t.length; c < u; c++)
                (n = t[c]).style &&
                    ((i = n.style.display),
                    e
                        ? ("none" === i && ((h[c] = X.get(n, "display") || null), h[c] || (n.style.display = "")),
                          "" === n.style.display &&
                              rt(n) &&
                              (h[c] =
                                  ((l = r = o = void 0),
                                  (r = (s = n).ownerDocument),
                                  (a = s.nodeName),
                                  (l = ht[a]) || ((o = r.body.appendChild(r.createElement(a))), (l = y.css(o, "display")), o.parentNode.removeChild(o), "none" === l && (l = "block"), (ht[a] = l)))))
                        : "none" !== i && ((h[c] = "none"), X.set(n, "display", i)));
            for (c = 0; c < u; c++) null != h[c] && (t[c].style.display = h[c]);
            return t;
        }
        y.fn.extend({
            show: function () {
                return ct(this, !0);
            },
            hide: function () {
                return ct(this);
            },
            toggle: function (t) {
                return "boolean" == typeof t
                    ? t
                        ? this.show()
                        : this.hide()
                    : this.each(function () {
                          rt(this) ? y(this).show() : y(this).hide();
                      });
            },
        });
        var ut = /^(?:checkbox|radio)$/i,
            dt = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            pt = /^$|^module$|\/(?:java|ecma)script/i,
            ft = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""],
            };
        function gt(t, e) {
            var i;
            return (i = void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e || "*") : void 0 !== t.querySelectorAll ? t.querySelectorAll(e || "*") : []), void 0 === e || (e && S(t, e)) ? y.merge([t], i) : i;
        }
        function mt(t, e) {
            for (var i = 0, n = t.length; i < n; i++) X.set(t[i], "globalEval", !e || X.get(e[i], "globalEval"));
        }
        (ft.optgroup = ft.option), (ft.tbody = ft.tfoot = ft.colgroup = ft.caption = ft.thead), (ft.th = ft.td);
        var vt,
            _t,
            bt = /<|&#?\w+;/;
        function yt(t, e, i, n, s) {
            for (var o, r, a, l, h, c, u = e.createDocumentFragment(), d = [], p = 0, f = t.length; p < f; p++)
                if ((o = t[p]) || 0 === o)
                    if ("object" === b(o)) y.merge(d, o.nodeType ? [o] : o);
                    else if (bt.test(o)) {
                        for (r = r || u.appendChild(e.createElement("div")), a = (dt.exec(o) || ["", ""])[1].toLowerCase(), l = ft[a] || ft._default, r.innerHTML = l[1] + y.htmlPrefilter(o) + l[2], c = l[0]; c--; ) r = r.lastChild;
                        y.merge(d, r.childNodes), ((r = u.firstChild).textContent = "");
                    } else d.push(e.createTextNode(o));
            for (u.textContent = "", p = 0; (o = d[p++]); )
                if (n && -1 < y.inArray(o, n)) s && s.push(o);
                else if (((h = st(o)), (r = gt(u.appendChild(o), "script")), h && mt(r), i)) for (c = 0; (o = r[c++]); ) pt.test(o.type || "") && i.push(o);
            return u;
        }
        (vt = s.createDocumentFragment().appendChild(s.createElement("div"))),
            (_t = s.createElement("input")).setAttribute("type", "radio"),
            _t.setAttribute("checked", "checked"),
            _t.setAttribute("name", "t"),
            vt.appendChild(_t),
            (g.checkClone = vt.cloneNode(!0).cloneNode(!0).lastChild.checked),
            (vt.innerHTML = "<textarea>x</textarea>"),
            (g.noCloneChecked = !!vt.cloneNode(!0).lastChild.defaultValue);
        var wt = /^key/,
            Ct = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            xt = /^([^.]*)(?:\.(.+)|)/;
        function kt() {
            return !0;
        }
        function Tt() {
            return !1;
        }
        function Dt(t, e) {
            return (
                (t ===
                    (function () {
                        try {
                            return s.activeElement;
                        } catch (t) {}
                    })()) ==
                ("focus" === e)
            );
        }
        function St(t, e, i, n, s, o) {
            var r, a;
            if ("object" == typeof e) {
                for (a in ("string" != typeof i && ((n = n || i), (i = void 0)), e)) St(t, a, i, n, e[a], o);
                return t;
            }
            if ((null == n && null == s ? ((s = i), (n = i = void 0)) : null == s && ("string" == typeof i ? ((s = n), (n = void 0)) : ((s = n), (n = i), (i = void 0))), !1 === s)) s = Tt;
            else if (!s) return t;
            return (
                1 === o &&
                    ((r = s),
                    ((s = function (t) {
                        return y().off(t), r.apply(this, arguments);
                    }).guid = r.guid || (r.guid = y.guid++))),
                t.each(function () {
                    y.event.add(this, e, s, n, i);
                })
            );
        }
        function Et(t, e, i) {
            i
                ? (X.set(t, e, !1),
                  y.event.add(t, e, {
                      namespace: !1,
                      handler: function (t) {
                          var n,
                              s,
                              o = X.get(this, e);
                          if (1 & t.isTrigger && this[e]) {
                              if (o.length) (y.event.special[e] || {}).delegateType && t.stopPropagation();
                              else if (((o = r.call(arguments)), X.set(this, e, o), (n = i(this, e)), this[e](), o !== (s = X.get(this, e)) || n ? X.set(this, e, !1) : (s = {}), o !== s))
                                  return t.stopImmediatePropagation(), t.preventDefault(), s.value;
                          } else o.length && (X.set(this, e, { value: y.event.trigger(y.extend(o[0], y.Event.prototype), o.slice(1), this) }), t.stopImmediatePropagation());
                      },
                  }))
                : void 0 === X.get(t, e) && y.event.add(t, e, kt);
        }
        (y.event = {
            global: {},
            add: function (t, e, i, n, s) {
                var o,
                    r,
                    a,
                    l,
                    h,
                    c,
                    u,
                    d,
                    p,
                    f,
                    g,
                    m = X.get(t);
                if (m)
                    for (
                        i.handler && ((i = (o = i).handler), (s = o.selector)),
                            s && y.find.matchesSelector(nt, s),
                            i.guid || (i.guid = y.guid++),
                            (l = m.events) || (l = m.events = {}),
                            (r = m.handle) ||
                                (r = m.handle = function (e) {
                                    return void 0 !== y && y.event.triggered !== e.type ? y.event.dispatch.apply(t, arguments) : void 0;
                                }),
                            h = (e = (e || "").match($) || [""]).length;
                        h--;

                    )
                        (p = g = (a = xt.exec(e[h]) || [])[1]),
                            (f = (a[2] || "").split(".").sort()),
                            p &&
                                ((u = y.event.special[p] || {}),
                                (p = (s ? u.delegateType : u.bindType) || p),
                                (u = y.event.special[p] || {}),
                                (c = y.extend({ type: p, origType: g, data: n, handler: i, guid: i.guid, selector: s, needsContext: s && y.expr.match.needsContext.test(s), namespace: f.join(".") }, o)),
                                (d = l[p]) || (((d = l[p] = []).delegateCount = 0), (u.setup && !1 !== u.setup.call(t, n, f, r)) || (t.addEventListener && t.addEventListener(p, r))),
                                u.add && (u.add.call(t, c), c.handler.guid || (c.handler.guid = i.guid)),
                                s ? d.splice(d.delegateCount++, 0, c) : d.push(c),
                                (y.event.global[p] = !0));
            },
            remove: function (t, e, i, n, s) {
                var o,
                    r,
                    a,
                    l,
                    h,
                    c,
                    u,
                    d,
                    p,
                    f,
                    g,
                    m = X.hasData(t) && X.get(t);
                if (m && (l = m.events)) {
                    for (h = (e = (e || "").match($) || [""]).length; h--; )
                        if (((p = g = (a = xt.exec(e[h]) || [])[1]), (f = (a[2] || "").split(".").sort()), p)) {
                            for (u = y.event.special[p] || {}, d = l[(p = (n ? u.delegateType : u.bindType) || p)] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), r = o = d.length; o--; )
                                (c = d[o]),
                                    (!s && g !== c.origType) ||
                                        (i && i.guid !== c.guid) ||
                                        (a && !a.test(c.namespace)) ||
                                        (n && n !== c.selector && ("**" !== n || !c.selector)) ||
                                        (d.splice(o, 1), c.selector && d.delegateCount--, u.remove && u.remove.call(t, c));
                            r && !d.length && ((u.teardown && !1 !== u.teardown.call(t, f, m.handle)) || y.removeEvent(t, p, m.handle), delete l[p]);
                        } else for (p in l) y.event.remove(t, p + e[h], i, n, !0);
                    y.isEmptyObject(l) && X.remove(t, "handle events");
                }
            },
            dispatch: function (t) {
                var e,
                    i,
                    n,
                    s,
                    o,
                    r,
                    a = y.event.fix(t),
                    l = new Array(arguments.length),
                    h = (X.get(this, "events") || {})[a.type] || [],
                    c = y.event.special[a.type] || {};
                for (l[0] = a, e = 1; e < arguments.length; e++) l[e] = arguments[e];
                if (((a.delegateTarget = this), !c.preDispatch || !1 !== c.preDispatch.call(this, a))) {
                    for (r = y.event.handlers.call(this, a, h), e = 0; (s = r[e++]) && !a.isPropagationStopped(); )
                        for (a.currentTarget = s.elem, i = 0; (o = s.handlers[i++]) && !a.isImmediatePropagationStopped(); )
                            (a.rnamespace && !1 !== o.namespace && !a.rnamespace.test(o.namespace)) ||
                                ((a.handleObj = o), (a.data = o.data), void 0 !== (n = ((y.event.special[o.origType] || {}).handle || o.handler).apply(s.elem, l)) && !1 === (a.result = n) && (a.preventDefault(), a.stopPropagation()));
                    return c.postDispatch && c.postDispatch.call(this, a), a.result;
                }
            },
            handlers: function (t, e) {
                var i,
                    n,
                    s,
                    o,
                    r,
                    a = [],
                    l = e.delegateCount,
                    h = t.target;
                if (l && h.nodeType && !("click" === t.type && 1 <= t.button))
                    for (; h !== this; h = h.parentNode || this)
                        if (1 === h.nodeType && ("click" !== t.type || !0 !== h.disabled)) {
                            for (o = [], r = {}, i = 0; i < l; i++) void 0 === r[(s = (n = e[i]).selector + " ")] && (r[s] = n.needsContext ? -1 < y(s, this).index(h) : y.find(s, this, null, [h]).length), r[s] && o.push(n);
                            o.length && a.push({ elem: h, handlers: o });
                        }
                return (h = this), l < e.length && a.push({ elem: h, handlers: e.slice(l) }), a;
            },
            addProp: function (t, e) {
                Object.defineProperty(y.Event.prototype, t, {
                    enumerable: !0,
                    configurable: !0,
                    get: m(e)
                        ? function () {
                              if (this.originalEvent) return e(this.originalEvent);
                          }
                        : function () {
                              if (this.originalEvent) return this.originalEvent[t];
                          },
                    set: function (e) {
                        Object.defineProperty(this, t, { enumerable: !0, configurable: !0, writable: !0, value: e });
                    },
                });
            },
            fix: function (t) {
                return t[y.expando] ? t : new y.Event(t);
            },
            special: {
                load: { noBubble: !0 },
                click: {
                    setup: function (t) {
                        var e = this || t;
                        return ut.test(e.type) && e.click && S(e, "input") && Et(e, "click", kt), !1;
                    },
                    trigger: function (t) {
                        var e = this || t;
                        return ut.test(e.type) && e.click && S(e, "input") && Et(e, "click"), !0;
                    },
                    _default: function (t) {
                        var e = t.target;
                        return (ut.test(e.type) && e.click && S(e, "input") && X.get(e, "click")) || S(e, "a");
                    },
                },
                beforeunload: {
                    postDispatch: function (t) {
                        void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result);
                    },
                },
            },
        }),
            (y.removeEvent = function (t, e, i) {
                t.removeEventListener && t.removeEventListener(e, i);
            }),
            (y.Event = function (t, e) {
                if (!(this instanceof y.Event)) return new y.Event(t, e);
                t && t.type
                    ? ((this.originalEvent = t),
                      (this.type = t.type),
                      (this.isDefaultPrevented = t.defaultPrevented || (void 0 === t.defaultPrevented && !1 === t.returnValue) ? kt : Tt),
                      (this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target),
                      (this.currentTarget = t.currentTarget),
                      (this.relatedTarget = t.relatedTarget))
                    : (this.type = t),
                    e && y.extend(this, e),
                    (this.timeStamp = (t && t.timeStamp) || Date.now()),
                    (this[y.expando] = !0);
            }),
            (y.Event.prototype = {
                constructor: y.Event,
                isDefaultPrevented: Tt,
                isPropagationStopped: Tt,
                isImmediatePropagationStopped: Tt,
                isSimulated: !1,
                preventDefault: function () {
                    var t = this.originalEvent;
                    (this.isDefaultPrevented = kt), t && !this.isSimulated && t.preventDefault();
                },
                stopPropagation: function () {
                    var t = this.originalEvent;
                    (this.isPropagationStopped = kt), t && !this.isSimulated && t.stopPropagation();
                },
                stopImmediatePropagation: function () {
                    var t = this.originalEvent;
                    (this.isImmediatePropagationStopped = kt), t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation();
                },
            }),
            y.each(
                {
                    altKey: !0,
                    bubbles: !0,
                    cancelable: !0,
                    changedTouches: !0,
                    ctrlKey: !0,
                    detail: !0,
                    eventPhase: !0,
                    metaKey: !0,
                    pageX: !0,
                    pageY: !0,
                    shiftKey: !0,
                    view: !0,
                    char: !0,
                    code: !0,
                    charCode: !0,
                    key: !0,
                    keyCode: !0,
                    button: !0,
                    buttons: !0,
                    clientX: !0,
                    clientY: !0,
                    offsetX: !0,
                    offsetY: !0,
                    pointerId: !0,
                    pointerType: !0,
                    screenX: !0,
                    screenY: !0,
                    targetTouches: !0,
                    toElement: !0,
                    touches: !0,
                    which: function (t) {
                        var e = t.button;
                        return null == t.which && wt.test(t.type) ? (null != t.charCode ? t.charCode : t.keyCode) : !t.which && void 0 !== e && Ct.test(t.type) ? (1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0) : t.which;
                    },
                },
                y.event.addProp
            ),
            y.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
                y.event.special[t] = {
                    setup: function () {
                        return Et(this, t, Dt), !1;
                    },
                    trigger: function () {
                        return Et(this, t), !0;
                    },
                    delegateType: e,
                };
            }),
            y.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (t, e) {
                y.event.special[t] = {
                    delegateType: e,
                    bindType: e,
                    handle: function (t) {
                        var i,
                            n = t.relatedTarget,
                            s = t.handleObj;
                        return (n && (n === this || y.contains(this, n))) || ((t.type = s.origType), (i = s.handler.apply(this, arguments)), (t.type = e)), i;
                    },
                };
            }),
            y.fn.extend({
                on: function (t, e, i, n) {
                    return St(this, t, e, i, n);
                },
                one: function (t, e, i, n) {
                    return St(this, t, e, i, n, 1);
                },
                off: function (t, e, i) {
                    var n, s;
                    if (t && t.preventDefault && t.handleObj) return (n = t.handleObj), y(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
                    if ("object" != typeof t)
                        return (
                            (!1 !== e && "function" != typeof e) || ((i = e), (e = void 0)),
                            !1 === i && (i = Tt),
                            this.each(function () {
                                y.event.remove(this, t, i, e);
                            })
                        );
                    for (s in t) this.off(s, e, t[s]);
                    return this;
                },
            });
        var It = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            At = /<script|<style|<link/i,
            Pt = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Nt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        function Ot(t, e) {
            return (S(t, "table") && S(11 !== e.nodeType ? e : e.firstChild, "tr") && y(t).children("tbody")[0]) || t;
        }
        function Mt(t) {
            return (t.type = (null !== t.getAttribute("type")) + "/" + t.type), t;
        }
        function $t(t) {
            return "true/" === (t.type || "").slice(0, 5) ? (t.type = t.type.slice(5)) : t.removeAttribute("type"), t;
        }
        function Ht(t, e) {
            var i, n, s, o, r, a, l, h;
            if (1 === e.nodeType) {
                if (X.hasData(t) && ((o = X.access(t)), (r = X.set(e, o)), (h = o.events))) for (s in (delete r.handle, (r.events = {}), h)) for (i = 0, n = h[s].length; i < n; i++) y.event.add(e, s, h[s][i]);
                Q.hasData(t) && ((a = Q.access(t)), (l = y.extend({}, a)), Q.set(e, l));
            }
        }
        function Lt(t, e, i, n) {
            e = a.apply([], e);
            var s,
                o,
                r,
                l,
                h,
                c,
                u = 0,
                d = t.length,
                p = d - 1,
                f = e[0],
                v = m(f);
            if (v || (1 < d && "string" == typeof f && !g.checkClone && Pt.test(f)))
                return t.each(function (s) {
                    var o = t.eq(s);
                    v && (e[0] = f.call(this, s, o.html())), Lt(o, e, i, n);
                });
            if (d && ((o = (s = yt(e, t[0].ownerDocument, !1, t, n)).firstChild), 1 === s.childNodes.length && (s = o), o || n)) {
                for (l = (r = y.map(gt(s, "script"), Mt)).length; u < d; u++) (h = s), u !== p && ((h = y.clone(h, !0, !0)), l && y.merge(r, gt(h, "script"))), i.call(t[u], h, u);
                if (l)
                    for (c = r[r.length - 1].ownerDocument, y.map(r, $t), u = 0; u < l; u++)
                        (h = r[u]),
                            pt.test(h.type || "") &&
                                !X.access(h, "globalEval") &&
                                y.contains(c, h) &&
                                (h.src && "module" !== (h.type || "").toLowerCase() ? y._evalUrl && !h.noModule && y._evalUrl(h.src, { nonce: h.nonce || h.getAttribute("nonce") }) : _(h.textContent.replace(Nt, ""), h, c));
            }
            return t;
        }
        function Wt(t, e, i) {
            for (var n, s = e ? y.filter(e, t) : t, o = 0; null != (n = s[o]); o++) i || 1 !== n.nodeType || y.cleanData(gt(n)), n.parentNode && (i && st(n) && mt(gt(n, "script")), n.parentNode.removeChild(n));
            return t;
        }
        y.extend({
            htmlPrefilter: function (t) {
                return t.replace(It, "<$1></$2>");
            },
            clone: function (t, e, i) {
                var n,
                    s,
                    o,
                    r,
                    a,
                    l,
                    h,
                    c = t.cloneNode(!0),
                    u = st(t);
                if (!(g.noCloneChecked || (1 !== t.nodeType && 11 !== t.nodeType) || y.isXMLDoc(t)))
                    for (r = gt(c), n = 0, s = (o = gt(t)).length; n < s; n++)
                        (a = o[n]), "input" === (h = (l = r[n]).nodeName.toLowerCase()) && ut.test(a.type) ? (l.checked = a.checked) : ("input" !== h && "textarea" !== h) || (l.defaultValue = a.defaultValue);
                if (e)
                    if (i) for (o = o || gt(t), r = r || gt(c), n = 0, s = o.length; n < s; n++) Ht(o[n], r[n]);
                    else Ht(t, c);
                return 0 < (r = gt(c, "script")).length && mt(r, !u && gt(t, "script")), c;
            },
            cleanData: function (t) {
                for (var e, i, n, s = y.event.special, o = 0; void 0 !== (i = t[o]); o++)
                    if (K(i)) {
                        if ((e = i[X.expando])) {
                            if (e.events) for (n in e.events) s[n] ? y.event.remove(i, n) : y.removeEvent(i, n, e.handle);
                            i[X.expando] = void 0;
                        }
                        i[Q.expando] && (i[Q.expando] = void 0);
                    }
            },
        }),
            y.fn.extend({
                detach: function (t) {
                    return Wt(this, t, !0);
                },
                remove: function (t) {
                    return Wt(this, t);
                },
                text: function (t) {
                    return z(
                        this,
                        function (t) {
                            return void 0 === t
                                ? y.text(this)
                                : this.empty().each(function () {
                                      (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || (this.textContent = t);
                                  });
                        },
                        null,
                        t,
                        arguments.length
                    );
                },
                append: function () {
                    return Lt(this, arguments, function (t) {
                        (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || Ot(this, t).appendChild(t);
                    });
                },
                prepend: function () {
                    return Lt(this, arguments, function (t) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var e = Ot(this, t);
                            e.insertBefore(t, e.firstChild);
                        }
                    });
                },
                before: function () {
                    return Lt(this, arguments, function (t) {
                        this.parentNode && this.parentNode.insertBefore(t, this);
                    });
                },
                after: function () {
                    return Lt(this, arguments, function (t) {
                        this.parentNode && this.parentNode.insertBefore(t, this.nextSibling);
                    });
                },
                empty: function () {
                    for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (y.cleanData(gt(t, !1)), (t.textContent = ""));
                    return this;
                },
                clone: function (t, e) {
                    return (
                        (t = null != t && t),
                        (e = null == e ? t : e),
                        this.map(function () {
                            return y.clone(this, t, e);
                        })
                    );
                },
                html: function (t) {
                    return z(
                        this,
                        function (t) {
                            var e = this[0] || {},
                                i = 0,
                                n = this.length;
                            if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                            if ("string" == typeof t && !At.test(t) && !ft[(dt.exec(t) || ["", ""])[1].toLowerCase()]) {
                                t = y.htmlPrefilter(t);
                                try {
                                    for (; i < n; i++) 1 === (e = this[i] || {}).nodeType && (y.cleanData(gt(e, !1)), (e.innerHTML = t));
                                    e = 0;
                                } catch (t) {}
                            }
                            e && this.empty().append(t);
                        },
                        null,
                        t,
                        arguments.length
                    );
                },
                replaceWith: function () {
                    var t = [];
                    return Lt(
                        this,
                        arguments,
                        function (e) {
                            var i = this.parentNode;
                            y.inArray(this, t) < 0 && (y.cleanData(gt(this)), i && i.replaceChild(e, this));
                        },
                        t
                    );
                },
            }),
            y.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (t, e) {
                y.fn[t] = function (t) {
                    for (var i, n = [], s = y(t), o = s.length - 1, r = 0; r <= o; r++) (i = r === o ? this : this.clone(!0)), y(s[r])[e](i), l.apply(n, i.get());
                    return this.pushStack(n);
                };
            });
        var Rt,
            Ft,
            jt,
            zt,
            qt,
            Bt,
            Ut,
            Yt = new RegExp("^(" + tt + ")(?!px)[a-z%]+$", "i"),
            Kt = function (e) {
                var i = e.ownerDocument.defaultView;
                return (i && i.opener) || (i = t), i.getComputedStyle(e);
            },
            Vt = new RegExp(it.join("|"), "i");
        function Xt(t, e, i) {
            var n,
                s,
                o,
                r,
                a = t.style;
            return (
                (i = i || Kt(t)) &&
                    ("" !== (r = i.getPropertyValue(e) || i[e]) || st(t) || (r = y.style(t, e)),
                    !g.pixelBoxStyles() && Yt.test(r) && Vt.test(e) && ((n = a.width), (s = a.minWidth), (o = a.maxWidth), (a.minWidth = a.maxWidth = a.width = r), (r = i.width), (a.width = n), (a.minWidth = s), (a.maxWidth = o))),
                void 0 !== r ? r + "" : r
            );
        }
        function Qt(t, e) {
            return {
                get: function () {
                    if (!t()) return (this.get = e).apply(this, arguments);
                    delete this.get;
                },
            };
        }
        function Gt() {
            if (Ut) {
                (Bt.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
                    (Ut.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
                    nt.appendChild(Bt).appendChild(Ut);
                var e = t.getComputedStyle(Ut);
                (Rt = "1%" !== e.top),
                    (qt = 12 === Jt(e.marginLeft)),
                    (Ut.style.right = "60%"),
                    (zt = 36 === Jt(e.right)),
                    (Ft = 36 === Jt(e.width)),
                    (Ut.style.position = "absolute"),
                    (jt = 12 === Jt(Ut.offsetWidth / 3)),
                    nt.removeChild(Bt),
                    (Ut = null);
            }
        }
        function Jt(t) {
            return Math.round(parseFloat(t));
        }
        (Bt = s.createElement("div")),
            (Ut = s.createElement("div")).style &&
                ((Ut.style.backgroundClip = "content-box"),
                (Ut.cloneNode(!0).style.backgroundClip = ""),
                (g.clearCloneStyle = "content-box" === Ut.style.backgroundClip),
                y.extend(g, {
                    boxSizingReliable: function () {
                        return Gt(), Ft;
                    },
                    pixelBoxStyles: function () {
                        return Gt(), zt;
                    },
                    pixelPosition: function () {
                        return Gt(), Rt;
                    },
                    reliableMarginLeft: function () {
                        return Gt(), qt;
                    },
                    scrollboxSize: function () {
                        return Gt(), jt;
                    },
                }));
        var Zt = ["Webkit", "Moz", "ms"],
            te = s.createElement("div").style,
            ee = {};
        function ie(t) {
            return (
                y.cssProps[t] ||
                ee[t] ||
                (t in te
                    ? t
                    : (ee[t] =
                          (function (t) {
                              for (var e = t[0].toUpperCase() + t.slice(1), i = Zt.length; i--; ) if ((t = Zt[i] + e) in te) return t;
                          })(t) || t))
            );
        }
        var ne = /^(none|table(?!-c[ea]).+)/,
            se = /^--/,
            oe = { position: "absolute", visibility: "hidden", display: "block" },
            re = { letterSpacing: "0", fontWeight: "400" };
        function ae(t, e, i) {
            var n = et.exec(e);
            return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : e;
        }
        function le(t, e, i, n, s, o) {
            var r = "width" === e ? 1 : 0,
                a = 0,
                l = 0;
            if (i === (n ? "border" : "content")) return 0;
            for (; r < 4; r += 2)
                "margin" === i && (l += y.css(t, i + it[r], !0, s)),
                    n
                        ? ("content" === i && (l -= y.css(t, "padding" + it[r], !0, s)), "margin" !== i && (l -= y.css(t, "border" + it[r] + "Width", !0, s)))
                        : ((l += y.css(t, "padding" + it[r], !0, s)), "padding" !== i ? (l += y.css(t, "border" + it[r] + "Width", !0, s)) : (a += y.css(t, "border" + it[r] + "Width", !0, s)));
            return !n && 0 <= o && (l += Math.max(0, Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - o - l - a - 0.5)) || 0), l;
        }
        function he(t, e, i) {
            var n = Kt(t),
                s = (!g.boxSizingReliable() || i) && "border-box" === y.css(t, "boxSizing", !1, n),
                o = s,
                r = Xt(t, e, n),
                a = "offset" + e[0].toUpperCase() + e.slice(1);
            if (Yt.test(r)) {
                if (!i) return r;
                r = "auto";
            }
            return (
                ((!g.boxSizingReliable() && s) || "auto" === r || (!parseFloat(r) && "inline" === y.css(t, "display", !1, n))) &&
                    t.getClientRects().length &&
                    ((s = "border-box" === y.css(t, "boxSizing", !1, n)), (o = a in t) && (r = t[a])),
                (r = parseFloat(r) || 0) + le(t, e, i || (s ? "border" : "content"), o, n, r) + "px"
            );
        }
        function ce(t, e, i, n, s) {
            return new ce.prototype.init(t, e, i, n, s);
        }
        y.extend({
            cssHooks: {
                opacity: {
                    get: function (t, e) {
                        if (e) {
                            var i = Xt(t, "opacity");
                            return "" === i ? "1" : i;
                        }
                    },
                },
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                gridArea: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnStart: !0,
                gridRow: !0,
                gridRowEnd: !0,
                gridRowStart: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0,
            },
            cssProps: {},
            style: function (t, e, i, n) {
                if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                    var s,
                        o,
                        r,
                        a = Y(e),
                        l = se.test(e),
                        h = t.style;
                    if ((l || (e = ie(a)), (r = y.cssHooks[e] || y.cssHooks[a]), void 0 === i)) return r && "get" in r && void 0 !== (s = r.get(t, !1, n)) ? s : h[e];
                    "string" == (o = typeof i) && (s = et.exec(i)) && s[1] && ((i = lt(t, e, s)), (o = "number")),
                        null != i &&
                            i == i &&
                            ("number" !== o || l || (i += (s && s[3]) || (y.cssNumber[a] ? "" : "px")),
                            g.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (h[e] = "inherit"),
                            (r && "set" in r && void 0 === (i = r.set(t, i, n))) || (l ? h.setProperty(e, i) : (h[e] = i)));
                }
            },
            css: function (t, e, i, n) {
                var s,
                    o,
                    r,
                    a = Y(e);
                return (
                    se.test(e) || (e = ie(a)),
                    (r = y.cssHooks[e] || y.cssHooks[a]) && "get" in r && (s = r.get(t, !0, i)),
                    void 0 === s && (s = Xt(t, e, n)),
                    "normal" === s && e in re && (s = re[e]),
                    "" === i || i ? ((o = parseFloat(s)), !0 === i || isFinite(o) ? o || 0 : s) : s
                );
            },
        }),
            y.each(["height", "width"], function (t, e) {
                y.cssHooks[e] = {
                    get: function (t, i, n) {
                        if (i)
                            return !ne.test(y.css(t, "display")) || (t.getClientRects().length && t.getBoundingClientRect().width)
                                ? he(t, e, n)
                                : at(t, oe, function () {
                                      return he(t, e, n);
                                  });
                    },
                    set: function (t, i, n) {
                        var s,
                            o = Kt(t),
                            r = !g.scrollboxSize() && "absolute" === o.position,
                            a = (r || n) && "border-box" === y.css(t, "boxSizing", !1, o),
                            l = n ? le(t, e, n, a, o) : 0;
                        return (
                            a && r && (l -= Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - parseFloat(o[e]) - le(t, e, "border", !1, o) - 0.5)),
                            l && (s = et.exec(i)) && "px" !== (s[3] || "px") && ((t.style[e] = i), (i = y.css(t, e))),
                            ae(0, i, l)
                        );
                    },
                };
            }),
            (y.cssHooks.marginLeft = Qt(g.reliableMarginLeft, function (t, e) {
                if (e)
                    return (
                        (parseFloat(Xt(t, "marginLeft")) ||
                            t.getBoundingClientRect().left -
                                at(t, { marginLeft: 0 }, function () {
                                    return t.getBoundingClientRect().left;
                                })) + "px"
                    );
            })),
            y.each({ margin: "", padding: "", border: "Width" }, function (t, e) {
                (y.cssHooks[t + e] = {
                    expand: function (i) {
                        for (var n = 0, s = {}, o = "string" == typeof i ? i.split(" ") : [i]; n < 4; n++) s[t + it[n] + e] = o[n] || o[n - 2] || o[0];
                        return s;
                    },
                }),
                    "margin" !== t && (y.cssHooks[t + e].set = ae);
            }),
            y.fn.extend({
                css: function (t, e) {
                    return z(
                        this,
                        function (t, e, i) {
                            var n,
                                s,
                                o = {},
                                r = 0;
                            if (Array.isArray(e)) {
                                for (n = Kt(t), s = e.length; r < s; r++) o[e[r]] = y.css(t, e[r], !1, n);
                                return o;
                            }
                            return void 0 !== i ? y.style(t, e, i) : y.css(t, e);
                        },
                        t,
                        e,
                        1 < arguments.length
                    );
                },
            }),
            (((y.Tween = ce).prototype = {
                constructor: ce,
                init: function (t, e, i, n, s, o) {
                    (this.elem = t), (this.prop = i), (this.easing = s || y.easing._default), (this.options = e), (this.start = this.now = this.cur()), (this.end = n), (this.unit = o || (y.cssNumber[i] ? "" : "px"));
                },
                cur: function () {
                    var t = ce.propHooks[this.prop];
                    return t && t.get ? t.get(this) : ce.propHooks._default.get(this);
                },
                run: function (t) {
                    var e,
                        i = ce.propHooks[this.prop];
                    return (
                        this.options.duration ? (this.pos = e = y.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration)) : (this.pos = e = t),
                        (this.now = (this.end - this.start) * e + this.start),
                        this.options.step && this.options.step.call(this.elem, this.now, this),
                        i && i.set ? i.set(this) : ce.propHooks._default.set(this),
                        this
                    );
                },
            }).init.prototype = ce.prototype),
            ((ce.propHooks = {
                _default: {
                    get: function (t) {
                        var e;
                        return 1 !== t.elem.nodeType || (null != t.elem[t.prop] && null == t.elem.style[t.prop]) ? t.elem[t.prop] : (e = y.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0;
                    },
                    set: function (t) {
                        y.fx.step[t.prop] ? y.fx.step[t.prop](t) : 1 !== t.elem.nodeType || (!y.cssHooks[t.prop] && null == t.elem.style[ie(t.prop)]) ? (t.elem[t.prop] = t.now) : y.style(t.elem, t.prop, t.now + t.unit);
                    },
                },
            }).scrollTop = ce.propHooks.scrollLeft = {
                set: function (t) {
                    t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
                },
            }),
            (y.easing = {
                linear: function (t) {
                    return t;
                },
                swing: function (t) {
                    return 0.5 - Math.cos(t * Math.PI) / 2;
                },
                _default: "swing",
            }),
            (y.fx = ce.prototype.init),
            (y.fx.step = {});
        var ue,
            de,
            pe,
            fe,
            ge = /^(?:toggle|show|hide)$/,
            me = /queueHooks$/;
        function ve() {
            de && (!1 === s.hidden && t.requestAnimationFrame ? t.requestAnimationFrame(ve) : t.setTimeout(ve, y.fx.interval), y.fx.tick());
        }
        function _e() {
            return (
                t.setTimeout(function () {
                    ue = void 0;
                }),
                (ue = Date.now())
            );
        }
        function be(t, e) {
            var i,
                n = 0,
                s = { height: t };
            for (e = e ? 1 : 0; n < 4; n += 2 - e) s["margin" + (i = it[n])] = s["padding" + i] = t;
            return e && (s.opacity = s.width = t), s;
        }
        function ye(t, e, i) {
            for (var n, s = (we.tweeners[e] || []).concat(we.tweeners["*"]), o = 0, r = s.length; o < r; o++) if ((n = s[o].call(i, e, t))) return n;
        }
        function we(t, e, i) {
            var n,
                s,
                o = 0,
                r = we.prefilters.length,
                a = y.Deferred().always(function () {
                    delete l.elem;
                }),
                l = function () {
                    if (s) return !1;
                    for (var e = ue || _e(), i = Math.max(0, h.startTime + h.duration - e), n = 1 - (i / h.duration || 0), o = 0, r = h.tweens.length; o < r; o++) h.tweens[o].run(n);
                    return a.notifyWith(t, [h, n, i]), n < 1 && r ? i : (r || a.notifyWith(t, [h, 1, 0]), a.resolveWith(t, [h]), !1);
                },
                h = a.promise({
                    elem: t,
                    props: y.extend({}, e),
                    opts: y.extend(!0, { specialEasing: {}, easing: y.easing._default }, i),
                    originalProperties: e,
                    originalOptions: i,
                    startTime: ue || _e(),
                    duration: i.duration,
                    tweens: [],
                    createTween: function (e, i) {
                        var n = y.Tween(t, h.opts, e, i, h.opts.specialEasing[e] || h.opts.easing);
                        return h.tweens.push(n), n;
                    },
                    stop: function (e) {
                        var i = 0,
                            n = e ? h.tweens.length : 0;
                        if (s) return this;
                        for (s = !0; i < n; i++) h.tweens[i].run(1);
                        return e ? (a.notifyWith(t, [h, 1, 0]), a.resolveWith(t, [h, e])) : a.rejectWith(t, [h, e]), this;
                    },
                }),
                c = h.props;
            for (
                (function (t, e) {
                    var i, n, s, o, r;
                    for (i in t)
                        if (((s = e[(n = Y(i))]), (o = t[i]), Array.isArray(o) && ((s = o[1]), (o = t[i] = o[0])), i !== n && ((t[n] = o), delete t[i]), (r = y.cssHooks[n]) && ("expand" in r)))
                            for (i in ((o = r.expand(o)), delete t[n], o)) (i in t) || ((t[i] = o[i]), (e[i] = s));
                        else e[n] = s;
                })(c, h.opts.specialEasing);
                o < r;
                o++
            )
                if ((n = we.prefilters[o].call(h, t, c, h.opts))) return m(n.stop) && (y._queueHooks(h.elem, h.opts.queue).stop = n.stop.bind(n)), n;
            return (
                y.map(c, ye, h),
                m(h.opts.start) && h.opts.start.call(t, h),
                h.progress(h.opts.progress).done(h.opts.done, h.opts.complete).fail(h.opts.fail).always(h.opts.always),
                y.fx.timer(y.extend(l, { elem: t, anim: h, queue: h.opts.queue })),
                h
            );
        }
        (y.Animation = y.extend(we, {
            tweeners: {
                "*": [
                    function (t, e) {
                        var i = this.createTween(t, e);
                        return lt(i.elem, t, et.exec(e), i), i;
                    },
                ],
            },
            tweener: function (t, e) {
                for (var i, n = 0, s = (t = m(t) ? ((e = t), ["*"]) : t.match($)).length; n < s; n++) (i = t[n]), (we.tweeners[i] = we.tweeners[i] || []), we.tweeners[i].unshift(e);
            },
            prefilters: [
                function (t, e, i) {
                    var n,
                        s,
                        o,
                        r,
                        a,
                        l,
                        h,
                        c,
                        u = "width" in e || "height" in e,
                        d = this,
                        p = {},
                        f = t.style,
                        g = t.nodeType && rt(t),
                        m = X.get(t, "fxshow");
                    for (n in (i.queue ||
                        (null == (r = y._queueHooks(t, "fx")).unqueued &&
                            ((r.unqueued = 0),
                            (a = r.empty.fire),
                            (r.empty.fire = function () {
                                r.unqueued || a();
                            })),
                        r.unqueued++,
                        d.always(function () {
                            d.always(function () {
                                r.unqueued--, y.queue(t, "fx").length || r.empty.fire();
                            });
                        })),
                    e))
                        if (((s = e[n]), ge.test(s))) {
                            if ((delete e[n], (o = o || "toggle" === s), s === (g ? "hide" : "show"))) {
                                if ("show" !== s || !m || void 0 === m[n]) continue;
                                g = !0;
                            }
                            p[n] = (m && m[n]) || y.style(t, n);
                        }
                    if ((l = !y.isEmptyObject(e)) || !y.isEmptyObject(p))
                        for (n in (u &&
                            1 === t.nodeType &&
                            ((i.overflow = [f.overflow, f.overflowX, f.overflowY]),
                            null == (h = m && m.display) && (h = X.get(t, "display")),
                            "none" === (c = y.css(t, "display")) && (h ? (c = h) : (ct([t], !0), (h = t.style.display || h), (c = y.css(t, "display")), ct([t]))),
                            ("inline" === c || ("inline-block" === c && null != h)) &&
                                "none" === y.css(t, "float") &&
                                (l ||
                                    (d.done(function () {
                                        f.display = h;
                                    }),
                                    null == h && ((c = f.display), (h = "none" === c ? "" : c))),
                                (f.display = "inline-block"))),
                        i.overflow &&
                            ((f.overflow = "hidden"),
                            d.always(function () {
                                (f.overflow = i.overflow[0]), (f.overflowX = i.overflow[1]), (f.overflowY = i.overflow[2]);
                            })),
                        (l = !1),
                        p))
                            l ||
                                (m ? "hidden" in m && (g = m.hidden) : (m = X.access(t, "fxshow", { display: h })),
                                o && (m.hidden = !g),
                                g && ct([t], !0),
                                d.done(function () {
                                    for (n in (g || ct([t]), X.remove(t, "fxshow"), p)) y.style(t, n, p[n]);
                                })),
                                (l = ye(g ? m[n] : 0, n, d)),
                                n in m || ((m[n] = l.start), g && ((l.end = l.start), (l.start = 0)));
                },
            ],
            prefilter: function (t, e) {
                e ? we.prefilters.unshift(t) : we.prefilters.push(t);
            },
        })),
            (y.speed = function (t, e, i) {
                var n = t && "object" == typeof t ? y.extend({}, t) : { complete: i || (!i && e) || (m(t) && t), duration: t, easing: (i && e) || (e && !m(e) && e) };
                return (
                    y.fx.off ? (n.duration = 0) : "number" != typeof n.duration && (n.duration in y.fx.speeds ? (n.duration = y.fx.speeds[n.duration]) : (n.duration = y.fx.speeds._default)),
                    (null != n.queue && !0 !== n.queue) || (n.queue = "fx"),
                    (n.old = n.complete),
                    (n.complete = function () {
                        m(n.old) && n.old.call(this), n.queue && y.dequeue(this, n.queue);
                    }),
                    n
                );
            }),
            y.fn.extend({
                fadeTo: function (t, e, i, n) {
                    return this.filter(rt).css("opacity", 0).show().end().animate({ opacity: e }, t, i, n);
                },
                animate: function (t, e, i, n) {
                    function s() {
                        var e = we(this, y.extend({}, t), r);
                        (o || X.get(this, "finish")) && e.stop(!0);
                    }
                    var o = y.isEmptyObject(t),
                        r = y.speed(e, i, n);
                    return (s.finish = s), o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s);
                },
                stop: function (t, e, i) {
                    function n(t) {
                        var e = t.stop;
                        delete t.stop, e(i);
                    }
                    return (
                        "string" != typeof t && ((i = e), (e = t), (t = void 0)),
                        e && !1 !== t && this.queue(t || "fx", []),
                        this.each(function () {
                            var e = !0,
                                s = null != t && t + "queueHooks",
                                o = y.timers,
                                r = X.get(this);
                            if (s) r[s] && r[s].stop && n(r[s]);
                            else for (s in r) r[s] && r[s].stop && me.test(s) && n(r[s]);
                            for (s = o.length; s--; ) o[s].elem !== this || (null != t && o[s].queue !== t) || (o[s].anim.stop(i), (e = !1), o.splice(s, 1));
                            (!e && i) || y.dequeue(this, t);
                        })
                    );
                },
                finish: function (t) {
                    return (
                        !1 !== t && (t = t || "fx"),
                        this.each(function () {
                            var e,
                                i = X.get(this),
                                n = i[t + "queue"],
                                s = i[t + "queueHooks"],
                                o = y.timers,
                                r = n ? n.length : 0;
                            for (i.finish = !0, y.queue(this, t, []), s && s.stop && s.stop.call(this, !0), e = o.length; e--; ) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
                            for (e = 0; e < r; e++) n[e] && n[e].finish && n[e].finish.call(this);
                            delete i.finish;
                        })
                    );
                },
            }),
            y.each(["toggle", "show", "hide"], function (t, e) {
                var i = y.fn[e];
                y.fn[e] = function (t, n, s) {
                    return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(be(e, !0), t, n, s);
                };
            }),
            y.each({ slideDown: be("show"), slideUp: be("hide"), slideToggle: be("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (t, e) {
                y.fn[t] = function (t, i, n) {
                    return this.animate(e, t, i, n);
                };
            }),
            (y.timers = []),
            (y.fx.tick = function () {
                var t,
                    e = 0,
                    i = y.timers;
                for (ue = Date.now(); e < i.length; e++) (t = i[e])() || i[e] !== t || i.splice(e--, 1);
                i.length || y.fx.stop(), (ue = void 0);
            }),
            (y.fx.timer = function (t) {
                y.timers.push(t), y.fx.start();
            }),
            (y.fx.interval = 13),
            (y.fx.start = function () {
                de || ((de = !0), ve());
            }),
            (y.fx.stop = function () {
                de = null;
            }),
            (y.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
            (y.fn.delay = function (e, i) {
                return (
                    (e = (y.fx && y.fx.speeds[e]) || e),
                    (i = i || "fx"),
                    this.queue(i, function (i, n) {
                        var s = t.setTimeout(i, e);
                        n.stop = function () {
                            t.clearTimeout(s);
                        };
                    })
                );
            }),
            (pe = s.createElement("input")),
            (fe = s.createElement("select").appendChild(s.createElement("option"))),
            (pe.type = "checkbox"),
            (g.checkOn = "" !== pe.value),
            (g.optSelected = fe.selected),
            ((pe = s.createElement("input")).value = "t"),
            (pe.type = "radio"),
            (g.radioValue = "t" === pe.value);
        var Ce,
            xe = y.expr.attrHandle;
        y.fn.extend({
            attr: function (t, e) {
                return z(this, y.attr, t, e, 1 < arguments.length);
            },
            removeAttr: function (t) {
                return this.each(function () {
                    y.removeAttr(this, t);
                });
            },
        }),
            y.extend({
                attr: function (t, e, i) {
                    var n,
                        s,
                        o = t.nodeType;
                    if (3 !== o && 8 !== o && 2 !== o)
                        return void 0 === t.getAttribute
                            ? y.prop(t, e, i)
                            : ((1 === o && y.isXMLDoc(t)) || (s = y.attrHooks[e.toLowerCase()] || (y.expr.match.bool.test(e) ? Ce : void 0)),
                              void 0 !== i
                                  ? null === i
                                      ? void y.removeAttr(t, e)
                                      : s && "set" in s && void 0 !== (n = s.set(t, i, e))
                                      ? n
                                      : (t.setAttribute(e, i + ""), i)
                                  : s && "get" in s && null !== (n = s.get(t, e))
                                  ? n
                                  : null == (n = y.find.attr(t, e))
                                  ? void 0
                                  : n);
                },
                attrHooks: {
                    type: {
                        set: function (t, e) {
                            if (!g.radioValue && "radio" === e && S(t, "input")) {
                                var i = t.value;
                                return t.setAttribute("type", e), i && (t.value = i), e;
                            }
                        },
                    },
                },
                removeAttr: function (t, e) {
                    var i,
                        n = 0,
                        s = e && e.match($);
                    if (s && 1 === t.nodeType) for (; (i = s[n++]); ) t.removeAttribute(i);
                },
            }),
            (Ce = {
                set: function (t, e, i) {
                    return !1 === e ? y.removeAttr(t, i) : t.setAttribute(i, i), i;
                },
            }),
            y.each(y.expr.match.bool.source.match(/\w+/g), function (t, e) {
                var i = xe[e] || y.find.attr;
                xe[e] = function (t, e, n) {
                    var s,
                        o,
                        r = e.toLowerCase();
                    return n || ((o = xe[r]), (xe[r] = s), (s = null != i(t, e, n) ? r : null), (xe[r] = o)), s;
                };
            });
        var ke = /^(?:input|select|textarea|button)$/i,
            Te = /^(?:a|area)$/i;
        function De(t) {
            return (t.match($) || []).join(" ");
        }
        function Se(t) {
            return (t.getAttribute && t.getAttribute("class")) || "";
        }
        function Ee(t) {
            return Array.isArray(t) ? t : ("string" == typeof t && t.match($)) || [];
        }
        y.fn.extend({
            prop: function (t, e) {
                return z(this, y.prop, t, e, 1 < arguments.length);
            },
            removeProp: function (t) {
                return this.each(function () {
                    delete this[y.propFix[t] || t];
                });
            },
        }),
            y.extend({
                prop: function (t, e, i) {
                    var n,
                        s,
                        o = t.nodeType;
                    if (3 !== o && 8 !== o && 2 !== o)
                        return (
                            (1 === o && y.isXMLDoc(t)) || ((e = y.propFix[e] || e), (s = y.propHooks[e])),
                            void 0 !== i ? (s && "set" in s && void 0 !== (n = s.set(t, i, e)) ? n : (t[e] = i)) : s && "get" in s && null !== (n = s.get(t, e)) ? n : t[e]
                        );
                },
                propHooks: {
                    tabIndex: {
                        get: function (t) {
                            var e = y.find.attr(t, "tabindex");
                            return e ? parseInt(e, 10) : ke.test(t.nodeName) || (Te.test(t.nodeName) && t.href) ? 0 : -1;
                        },
                    },
                },
                propFix: { for: "htmlFor", class: "className" },
            }),
            g.optSelected ||
                (y.propHooks.selected = {
                    get: function (t) {
                        var e = t.parentNode;
                        return e && e.parentNode && e.parentNode.selectedIndex, null;
                    },
                    set: function (t) {
                        var e = t.parentNode;
                        e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex);
                    },
                }),
            y.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                y.propFix[this.toLowerCase()] = this;
            }),
            y.fn.extend({
                addClass: function (t) {
                    var e,
                        i,
                        n,
                        s,
                        o,
                        r,
                        a,
                        l = 0;
                    if (m(t))
                        return this.each(function (e) {
                            y(this).addClass(t.call(this, e, Se(this)));
                        });
                    if ((e = Ee(t)).length)
                        for (; (i = this[l++]); )
                            if (((s = Se(i)), (n = 1 === i.nodeType && " " + De(s) + " "))) {
                                for (r = 0; (o = e[r++]); ) n.indexOf(" " + o + " ") < 0 && (n += o + " ");
                                s !== (a = De(n)) && i.setAttribute("class", a);
                            }
                    return this;
                },
                removeClass: function (t) {
                    var e,
                        i,
                        n,
                        s,
                        o,
                        r,
                        a,
                        l = 0;
                    if (m(t))
                        return this.each(function (e) {
                            y(this).removeClass(t.call(this, e, Se(this)));
                        });
                    if (!arguments.length) return this.attr("class", "");
                    if ((e = Ee(t)).length)
                        for (; (i = this[l++]); )
                            if (((s = Se(i)), (n = 1 === i.nodeType && " " + De(s) + " "))) {
                                for (r = 0; (o = e[r++]); ) for (; -1 < n.indexOf(" " + o + " "); ) n = n.replace(" " + o + " ", " ");
                                s !== (a = De(n)) && i.setAttribute("class", a);
                            }
                    return this;
                },
                toggleClass: function (t, e) {
                    var i = typeof t,
                        n = "string" == i || Array.isArray(t);
                    return "boolean" == typeof e && n
                        ? e
                            ? this.addClass(t)
                            : this.removeClass(t)
                        : m(t)
                        ? this.each(function (i) {
                              y(this).toggleClass(t.call(this, i, Se(this), e), e);
                          })
                        : this.each(function () {
                              var e, s, o, r;
                              if (n) for (s = 0, o = y(this), r = Ee(t); (e = r[s++]); ) o.hasClass(e) ? o.removeClass(e) : o.addClass(e);
                              else (void 0 !== t && "boolean" != i) || ((e = Se(this)) && X.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === t ? "" : X.get(this, "__className__") || ""));
                          });
                },
                hasClass: function (t) {
                    var e,
                        i,
                        n = 0;
                    for (e = " " + t + " "; (i = this[n++]); ) if (1 === i.nodeType && -1 < (" " + De(Se(i)) + " ").indexOf(e)) return !0;
                    return !1;
                },
            });
        var Ie = /\r/g;
        function Ae(t) {
            t.stopPropagation();
        }
        y.fn.extend({
            val: function (t) {
                var e,
                    i,
                    n,
                    s = this[0];
                return arguments.length
                    ? ((n = m(t)),
                      this.each(function (i) {
                          var s;
                          1 === this.nodeType &&
                              (null == (s = n ? t.call(this, i, y(this).val()) : t)
                                  ? (s = "")
                                  : "number" == typeof s
                                  ? (s += "")
                                  : Array.isArray(s) &&
                                    (s = y.map(s, function (t) {
                                        return null == t ? "" : t + "";
                                    })),
                              ((e = y.valHooks[this.type] || y.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, s, "value")) || (this.value = s));
                      }))
                    : s
                    ? (e = y.valHooks[s.type] || y.valHooks[s.nodeName.toLowerCase()]) && "get" in e && void 0 !== (i = e.get(s, "value"))
                        ? i
                        : "string" == typeof (i = s.value)
                        ? i.replace(Ie, "")
                        : null == i
                        ? ""
                        : i
                    : void 0;
            },
        }),
            y.extend({
                valHooks: {
                    option: {
                        get: function (t) {
                            var e = y.find.attr(t, "value");
                            return null != e ? e : De(y.text(t));
                        },
                    },
                    select: {
                        get: function (t) {
                            var e,
                                i,
                                n,
                                s = t.options,
                                o = t.selectedIndex,
                                r = "select-one" === t.type,
                                a = r ? null : [],
                                l = r ? o + 1 : s.length;
                            for (n = o < 0 ? l : r ? o : 0; n < l; n++)
                                if (((i = s[n]).selected || n === o) && !i.disabled && (!i.parentNode.disabled || !S(i.parentNode, "optgroup"))) {
                                    if (((e = y(i).val()), r)) return e;
                                    a.push(e);
                                }
                            return a;
                        },
                        set: function (t, e) {
                            for (var i, n, s = t.options, o = y.makeArray(e), r = s.length; r--; ) ((n = s[r]).selected = -1 < y.inArray(y.valHooks.option.get(n), o)) && (i = !0);
                            return i || (t.selectedIndex = -1), o;
                        },
                    },
                },
            }),
            y.each(["radio", "checkbox"], function () {
                (y.valHooks[this] = {
                    set: function (t, e) {
                        if (Array.isArray(e)) return (t.checked = -1 < y.inArray(y(t).val(), e));
                    },
                }),
                    g.checkOn ||
                        (y.valHooks[this].get = function (t) {
                            return null === t.getAttribute("value") ? "on" : t.value;
                        });
            }),
            (g.focusin = "onfocusin" in t);
        var Pe = /^(?:focusinfocus|focusoutblur)$/;
        y.extend(y.event, {
            trigger: function (e, n, o, r) {
                var a,
                    l,
                    h,
                    c,
                    u,
                    p,
                    f,
                    g,
                    v = [o || s],
                    _ = d.call(e, "type") ? e.type : e,
                    b = d.call(e, "namespace") ? e.namespace.split(".") : [];
                if (
                    ((l = g = h = o = o || s),
                    3 !== o.nodeType &&
                        8 !== o.nodeType &&
                        !Pe.test(_ + y.event.triggered) &&
                        (-1 < _.indexOf(".") && ((_ = (b = _.split(".")).shift()), b.sort()),
                        (u = _.indexOf(":") < 0 && "on" + _),
                        ((e = e[y.expando] ? e : new y.Event(_, "object" == typeof e && e)).isTrigger = r ? 2 : 3),
                        (e.namespace = b.join(".")),
                        (e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null),
                        (e.result = void 0),
                        e.target || (e.target = o),
                        (n = null == n ? [e] : y.makeArray(n, [e])),
                        (f = y.event.special[_] || {}),
                        r || !f.trigger || !1 !== f.trigger.apply(o, n)))
                ) {
                    if (!r && !f.noBubble && !i(o)) {
                        for (c = f.delegateType || _, Pe.test(c + _) || (l = l.parentNode); l; l = l.parentNode) v.push(l), (h = l);
                        h === (o.ownerDocument || s) && v.push(h.defaultView || h.parentWindow || t);
                    }
                    for (a = 0; (l = v[a++]) && !e.isPropagationStopped(); )
                        (g = l),
                            (e.type = 1 < a ? c : f.bindType || _),
                            (p = (X.get(l, "events") || {})[e.type] && X.get(l, "handle")) && p.apply(l, n),
                            (p = u && l[u]) && p.apply && K(l) && ((e.result = p.apply(l, n)), !1 === e.result && e.preventDefault());
                    return (
                        (e.type = _),
                        r ||
                            e.isDefaultPrevented() ||
                            (f._default && !1 !== f._default.apply(v.pop(), n)) ||
                            !K(o) ||
                            (u &&
                                m(o[_]) &&
                                !i(o) &&
                                ((h = o[u]) && (o[u] = null),
                                (y.event.triggered = _),
                                e.isPropagationStopped() && g.addEventListener(_, Ae),
                                o[_](),
                                e.isPropagationStopped() && g.removeEventListener(_, Ae),
                                (y.event.triggered = void 0),
                                h && (o[u] = h))),
                        e.result
                    );
                }
            },
            simulate: function (t, e, i) {
                var n = y.extend(new y.Event(), i, { type: t, isSimulated: !0 });
                y.event.trigger(n, null, e);
            },
        }),
            y.fn.extend({
                trigger: function (t, e) {
                    return this.each(function () {
                        y.event.trigger(t, e, this);
                    });
                },
                triggerHandler: function (t, e) {
                    var i = this[0];
                    if (i) return y.event.trigger(t, e, i, !0);
                },
            }),
            g.focusin ||
                y.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
                    function i(t) {
                        y.event.simulate(e, t.target, y.event.fix(t));
                    }
                    y.event.special[e] = {
                        setup: function () {
                            var n = this.ownerDocument || this,
                                s = X.access(n, e);
                            s || n.addEventListener(t, i, !0), X.access(n, e, (s || 0) + 1);
                        },
                        teardown: function () {
                            var n = this.ownerDocument || this,
                                s = X.access(n, e) - 1;
                            s ? X.access(n, e, s) : (n.removeEventListener(t, i, !0), X.remove(n, e));
                        },
                    };
                });
        var Ne = t.location,
            Oe = Date.now(),
            Me = /\?/;
        y.parseXML = function (e) {
            var i;
            if (!e || "string" != typeof e) return null;
            try {
                i = new t.DOMParser().parseFromString(e, "text/xml");
            } catch (e) {
                i = void 0;
            }
            return (i && !i.getElementsByTagName("parsererror").length) || y.error("Invalid XML: " + e), i;
        };
        var $e = /\[\]$/,
            He = /\r?\n/g,
            Le = /^(?:submit|button|image|reset|file)$/i,
            We = /^(?:input|select|textarea|keygen)/i;
        function Re(t, e, i, n) {
            var s;
            if (Array.isArray(e))
                y.each(e, function (e, s) {
                    i || $e.test(t) ? n(t, s) : Re(t + "[" + ("object" == typeof s && null != s ? e : "") + "]", s, i, n);
                });
            else if (i || "object" !== b(e)) n(t, e);
            else for (s in e) Re(t + "[" + s + "]", e[s], i, n);
        }
        (y.param = function (t, e) {
            function i(t, e) {
                var i = m(e) ? e() : e;
                s[s.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == i ? "" : i);
            }
            var n,
                s = [];
            if (null == t) return "";
            if (Array.isArray(t) || (t.jquery && !y.isPlainObject(t)))
                y.each(t, function () {
                    i(this.name, this.value);
                });
            else for (n in t) Re(n, t[n], e, i);
            return s.join("&");
        }),
            y.fn.extend({
                serialize: function () {
                    return y.param(this.serializeArray());
                },
                serializeArray: function () {
                    return this.map(function () {
                        var t = y.prop(this, "elements");
                        return t ? y.makeArray(t) : this;
                    })
                        .filter(function () {
                            var t = this.type;
                            return this.name && !y(this).is(":disabled") && We.test(this.nodeName) && !Le.test(t) && (this.checked || !ut.test(t));
                        })
                        .map(function (t, e) {
                            var i = y(this).val();
                            return null == i
                                ? null
                                : Array.isArray(i)
                                ? y.map(i, function (t) {
                                      return { name: e.name, value: t.replace(He, "\r\n") };
                                  })
                                : { name: e.name, value: i.replace(He, "\r\n") };
                        })
                        .get();
                },
            });
        var Fe = /%20/g,
            je = /#.*$/,
            ze = /([?&])_=[^&]*/,
            qe = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Be = /^(?:GET|HEAD)$/,
            Ue = /^\/\//,
            Ye = {},
            Ke = {},
            Ve = "*/".concat("*"),
            Xe = s.createElement("a");
        function Qe(t) {
            return function (e, i) {
                "string" != typeof e && ((i = e), (e = "*"));
                var n,
                    s = 0,
                    o = e.toLowerCase().match($) || [];
                if (m(i)) for (; (n = o[s++]); ) "+" === n[0] ? ((n = n.slice(1) || "*"), (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i);
            };
        }
        function Ge(t, e, i, n) {
            var s = {},
                o = t === Ke;
            function r(a) {
                var l;
                return (
                    (s[a] = !0),
                    y.each(t[a] || [], function (t, a) {
                        var h = a(e, i, n);
                        return "string" != typeof h || o || s[h] ? (o ? !(l = h) : void 0) : (e.dataTypes.unshift(h), r(h), !1);
                    }),
                    l
                );
            }
            return r(e.dataTypes[0]) || (!s["*"] && r("*"));
        }
        function Je(t, e) {
            var i,
                n,
                s = y.ajaxSettings.flatOptions || {};
            for (i in e) void 0 !== e[i] && ((s[i] ? t : (n = n || {}))[i] = e[i]);
            return n && y.extend(!0, t, n), t;
        }
        (Xe.href = Ne.href),
            y.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: Ne.href,
                    type: "GET",
                    isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Ne.protocol),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: { "*": Ve, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" },
                    contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                    responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
                    converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": y.parseXML },
                    flatOptions: { url: !0, context: !0 },
                },
                ajaxSetup: function (t, e) {
                    return e ? Je(Je(t, y.ajaxSettings), e) : Je(y.ajaxSettings, t);
                },
                ajaxPrefilter: Qe(Ye),
                ajaxTransport: Qe(Ke),
                ajax: function (e, i) {
                    "object" == typeof e && ((i = e), (e = void 0)), (i = i || {});
                    var n,
                        o,
                        r,
                        a,
                        l,
                        h,
                        c,
                        u,
                        d,
                        p,
                        f = y.ajaxSetup({}, i),
                        g = f.context || f,
                        m = f.context && (g.nodeType || g.jquery) ? y(g) : y.event,
                        v = y.Deferred(),
                        _ = y.Callbacks("once memory"),
                        b = f.statusCode || {},
                        w = {},
                        C = {},
                        x = "canceled",
                        k = {
                            readyState: 0,
                            getResponseHeader: function (t) {
                                var e;
                                if (c) {
                                    if (!a) for (a = {}; (e = qe.exec(r)); ) a[e[1].toLowerCase() + " "] = (a[e[1].toLowerCase() + " "] || []).concat(e[2]);
                                    e = a[t.toLowerCase() + " "];
                                }
                                return null == e ? null : e.join(", ");
                            },
                            getAllResponseHeaders: function () {
                                return c ? r : null;
                            },
                            setRequestHeader: function (t, e) {
                                return null == c && ((t = C[t.toLowerCase()] = C[t.toLowerCase()] || t), (w[t] = e)), this;
                            },
                            overrideMimeType: function (t) {
                                return null == c && (f.mimeType = t), this;
                            },
                            statusCode: function (t) {
                                var e;
                                if (t)
                                    if (c) k.always(t[k.status]);
                                    else for (e in t) b[e] = [b[e], t[e]];
                                return this;
                            },
                            abort: function (t) {
                                var e = t || x;
                                return n && n.abort(e), T(0, e), this;
                            },
                        };
                    if (
                        (v.promise(k),
                        (f.url = ((e || f.url || Ne.href) + "").replace(Ue, Ne.protocol + "//")),
                        (f.type = i.method || i.type || f.method || f.type),
                        (f.dataTypes = (f.dataType || "*").toLowerCase().match($) || [""]),
                        null == f.crossDomain)
                    ) {
                        h = s.createElement("a");
                        try {
                            (h.href = f.url), (h.href = h.href), (f.crossDomain = Xe.protocol + "//" + Xe.host != h.protocol + "//" + h.host);
                        } catch (e) {
                            f.crossDomain = !0;
                        }
                    }
                    if ((f.data && f.processData && "string" != typeof f.data && (f.data = y.param(f.data, f.traditional)), Ge(Ye, f, i, k), c)) return k;
                    for (d in ((u = y.event && f.global) && 0 == y.active++ && y.event.trigger("ajaxStart"),
                    (f.type = f.type.toUpperCase()),
                    (f.hasContent = !Be.test(f.type)),
                    (o = f.url.replace(je, "")),
                    f.hasContent
                        ? f.data && f.processData && 0 === (f.contentType || "").indexOf("application/x-www-form-urlencoded") && (f.data = f.data.replace(Fe, "+"))
                        : ((p = f.url.slice(o.length)),
                          f.data && (f.processData || "string" == typeof f.data) && ((o += (Me.test(o) ? "&" : "?") + f.data), delete f.data),
                          !1 === f.cache && ((o = o.replace(ze, "$1")), (p = (Me.test(o) ? "&" : "?") + "_=" + Oe++ + p)),
                          (f.url = o + p)),
                    f.ifModified && (y.lastModified[o] && k.setRequestHeader("If-Modified-Since", y.lastModified[o]), y.etag[o] && k.setRequestHeader("If-None-Match", y.etag[o])),
                    ((f.data && f.hasContent && !1 !== f.contentType) || i.contentType) && k.setRequestHeader("Content-Type", f.contentType),
                    k.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Ve + "; q=0.01" : "") : f.accepts["*"]),
                    f.headers))
                        k.setRequestHeader(d, f.headers[d]);
                    if (f.beforeSend && (!1 === f.beforeSend.call(g, k, f) || c)) return k.abort();
                    if (((x = "abort"), _.add(f.complete), k.done(f.success), k.fail(f.error), (n = Ge(Ke, f, i, k)))) {
                        if (((k.readyState = 1), u && m.trigger("ajaxSend", [k, f]), c)) return k;
                        f.async &&
                            0 < f.timeout &&
                            (l = t.setTimeout(function () {
                                k.abort("timeout");
                            }, f.timeout));
                        try {
                            (c = !1), n.send(w, T);
                        } catch (e) {
                            if (c) throw e;
                            T(-1, e);
                        }
                    } else T(-1, "No Transport");
                    function T(e, i, s, a) {
                        var h,
                            d,
                            p,
                            w,
                            C,
                            x = i;
                        c ||
                            ((c = !0),
                            l && t.clearTimeout(l),
                            (n = void 0),
                            (r = a || ""),
                            (k.readyState = 0 < e ? 4 : 0),
                            (h = (200 <= e && e < 300) || 304 === e),
                            s &&
                                (w = (function (t, e, i) {
                                    for (var n, s, o, r, a = t.contents, l = t.dataTypes; "*" === l[0]; ) l.shift(), void 0 === n && (n = t.mimeType || e.getResponseHeader("Content-Type"));
                                    if (n)
                                        for (s in a)
                                            if (a[s] && a[s].test(n)) {
                                                l.unshift(s);
                                                break;
                                            }
                                    if (l[0] in i) o = l[0];
                                    else {
                                        for (s in i) {
                                            if (!l[0] || t.converters[s + " " + l[0]]) {
                                                o = s;
                                                break;
                                            }
                                            r = r || s;
                                        }
                                        o = o || r;
                                    }
                                    if (o) return o !== l[0] && l.unshift(o), i[o];
                                })(f, k, s)),
                            (w = (function (t, e, i, n) {
                                var s,
                                    o,
                                    r,
                                    a,
                                    l,
                                    h = {},
                                    c = t.dataTypes.slice();
                                if (c[1]) for (r in t.converters) h[r.toLowerCase()] = t.converters[r];
                                for (o = c.shift(); o; )
                                    if ((t.responseFields[o] && (i[t.responseFields[o]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), (l = o), (o = c.shift())))
                                        if ("*" === o) o = l;
                                        else if ("*" !== l && l !== o) {
                                            if (!(r = h[l + " " + o] || h["* " + o]))
                                                for (s in h)
                                                    if ((a = s.split(" "))[1] === o && (r = h[l + " " + a[0]] || h["* " + a[0]])) {
                                                        !0 === r ? (r = h[s]) : !0 !== h[s] && ((o = a[0]), c.unshift(a[1]));
                                                        break;
                                                    }
                                            if (!0 !== r)
                                                if (r && t.throws) e = r(e);
                                                else
                                                    try {
                                                        e = r(e);
                                                    } catch (t) {
                                                        return { state: "parsererror", error: r ? t : "No conversion from " + l + " to " + o };
                                                    }
                                        }
                                return { state: "success", data: e };
                            })(f, w, k, h)),
                            h
                                ? (f.ifModified && ((C = k.getResponseHeader("Last-Modified")) && (y.lastModified[o] = C), (C = k.getResponseHeader("etag")) && (y.etag[o] = C)),
                                  204 === e || "HEAD" === f.type ? (x = "nocontent") : 304 === e ? (x = "notmodified") : ((x = w.state), (d = w.data), (h = !(p = w.error))))
                                : ((p = x), (!e && x) || ((x = "error"), e < 0 && (e = 0))),
                            (k.status = e),
                            (k.statusText = (i || x) + ""),
                            h ? v.resolveWith(g, [d, x, k]) : v.rejectWith(g, [k, x, p]),
                            k.statusCode(b),
                            (b = void 0),
                            u && m.trigger(h ? "ajaxSuccess" : "ajaxError", [k, f, h ? d : p]),
                            _.fireWith(g, [k, x]),
                            u && (m.trigger("ajaxComplete", [k, f]), --y.active || y.event.trigger("ajaxStop")));
                    }
                    return k;
                },
                getJSON: function (t, e, i) {
                    return y.get(t, e, i, "json");
                },
                getScript: function (t, e) {
                    return y.get(t, void 0, e, "script");
                },
            }),
            y.each(["get", "post"], function (t, e) {
                y[e] = function (t, i, n, s) {
                    return m(i) && ((s = s || n), (n = i), (i = void 0)), y.ajax(y.extend({ url: t, type: e, dataType: s, data: i, success: n }, y.isPlainObject(t) && t));
                };
            }),
            (y._evalUrl = function (t, e) {
                return y.ajax({
                    url: t,
                    type: "GET",
                    dataType: "script",
                    cache: !0,
                    async: !1,
                    global: !1,
                    converters: { "text script": function () {} },
                    dataFilter: function (t) {
                        y.globalEval(t, e);
                    },
                });
            }),
            y.fn.extend({
                wrapAll: function (t) {
                    var e;
                    return (
                        this[0] &&
                            (m(t) && (t = t.call(this[0])),
                            (e = y(t, this[0].ownerDocument).eq(0).clone(!0)),
                            this[0].parentNode && e.insertBefore(this[0]),
                            e
                                .map(function () {
                                    for (var t = this; t.firstElementChild; ) t = t.firstElementChild;
                                    return t;
                                })
                                .append(this)),
                        this
                    );
                },
                wrapInner: function (t) {
                    return m(t)
                        ? this.each(function (e) {
                              y(this).wrapInner(t.call(this, e));
                          })
                        : this.each(function () {
                              var e = y(this),
                                  i = e.contents();
                              i.length ? i.wrapAll(t) : e.append(t);
                          });
                },
                wrap: function (t) {
                    var e = m(t);
                    return this.each(function (i) {
                        y(this).wrapAll(e ? t.call(this, i) : t);
                    });
                },
                unwrap: function (t) {
                    return (
                        this.parent(t)
                            .not("body")
                            .each(function () {
                                y(this).replaceWith(this.childNodes);
                            }),
                        this
                    );
                },
            }),
            (y.expr.pseudos.hidden = function (t) {
                return !y.expr.pseudos.visible(t);
            }),
            (y.expr.pseudos.visible = function (t) {
                return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
            }),
            (y.ajaxSettings.xhr = function () {
                try {
                    return new t.XMLHttpRequest();
                } catch (t) {}
            });
        var Ze = { 0: 200, 1223: 204 },
            ti = y.ajaxSettings.xhr();
        (g.cors = !!ti && "withCredentials" in ti),
            (g.ajax = ti = !!ti),
            y.ajaxTransport(function (e) {
                var i, n;
                if (g.cors || (ti && !e.crossDomain))
                    return {
                        send: function (s, o) {
                            var r,
                                a = e.xhr();
                            if ((a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)) for (r in e.xhrFields) a[r] = e.xhrFields[r];
                            for (r in (e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || s["X-Requested-With"] || (s["X-Requested-With"] = "XMLHttpRequest"), s)) a.setRequestHeader(r, s[r]);
                            (i = function (t) {
                                return function () {
                                    i &&
                                        ((i = n = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null),
                                        "abort" === t
                                            ? a.abort()
                                            : "error" === t
                                            ? "number" != typeof a.status
                                                ? o(0, "error")
                                                : o(a.status, a.statusText)
                                            : o(
                                                  Ze[a.status] || a.status,
                                                  a.statusText,
                                                  "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? { binary: a.response } : { text: a.responseText },
                                                  a.getAllResponseHeaders()
                                              ));
                                };
                            }),
                                (a.onload = i()),
                                (n = a.onerror = a.ontimeout = i("error")),
                                void 0 !== a.onabort
                                    ? (a.onabort = n)
                                    : (a.onreadystatechange = function () {
                                          4 === a.readyState &&
                                              t.setTimeout(function () {
                                                  i && n();
                                              });
                                      }),
                                (i = i("abort"));
                            try {
                                a.send((e.hasContent && e.data) || null);
                            } catch (s) {
                                if (i) throw s;
                            }
                        },
                        abort: function () {
                            i && i();
                        },
                    };
            }),
            y.ajaxPrefilter(function (t) {
                t.crossDomain && (t.contents.script = !1);
            }),
            y.ajaxSetup({
                accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
                contents: { script: /\b(?:java|ecma)script\b/ },
                converters: {
                    "text script": function (t) {
                        return y.globalEval(t), t;
                    },
                },
            }),
            y.ajaxPrefilter("script", function (t) {
                void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET");
            }),
            y.ajaxTransport("script", function (t) {
                var e, i;
                if (t.crossDomain || t.scriptAttrs)
                    return {
                        send: function (n, o) {
                            (e = y("<script>")
                                .attr(t.scriptAttrs || {})
                                .prop({ charset: t.scriptCharset, src: t.url })
                                .on(
                                    "load error",
                                    (i = function (t) {
                                        e.remove(), (i = null), t && o("error" === t.type ? 404 : 200, t.type);
                                    })
                                )),
                                s.head.appendChild(e[0]);
                        },
                        abort: function () {
                            i && i();
                        },
                    };
            });
        var ei,
            ii = [],
            ni = /(=)\?(?=&|$)|\?\?/;
        y.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
                var t = ii.pop() || y.expando + "_" + Oe++;
                return (this[t] = !0), t;
            },
        }),
            y.ajaxPrefilter("json jsonp", function (e, i, n) {
                var s,
                    o,
                    r,
                    a = !1 !== e.jsonp && (ni.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && ni.test(e.data) && "data");
                if (a || "jsonp" === e.dataTypes[0])
                    return (
                        (s = e.jsonpCallback = m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
                        a ? (e[a] = e[a].replace(ni, "$1" + s)) : !1 !== e.jsonp && (e.url += (Me.test(e.url) ? "&" : "?") + e.jsonp + "=" + s),
                        (e.converters["script json"] = function () {
                            return r || y.error(s + " was not called"), r[0];
                        }),
                        (e.dataTypes[0] = "json"),
                        (o = t[s]),
                        (t[s] = function () {
                            r = arguments;
                        }),
                        n.always(function () {
                            void 0 === o ? y(t).removeProp(s) : (t[s] = o), e[s] && ((e.jsonpCallback = i.jsonpCallback), ii.push(s)), r && m(o) && o(r[0]), (r = o = void 0);
                        }),
                        "script"
                    );
            }),
            (g.createHTMLDocument = (((ei = s.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>"), 2 === ei.childNodes.length)),
            (y.parseHTML = function (t, e, i) {
                return "string" != typeof t
                    ? []
                    : ("boolean" == typeof e && ((i = e), (e = !1)),
                      e || (g.createHTMLDocument ? (((n = (e = s.implementation.createHTMLDocument("")).createElement("base")).href = s.location.href), e.head.appendChild(n)) : (e = s)),
                      (r = !i && []),
                      (o = E.exec(t)) ? [e.createElement(o[1])] : ((o = yt([t], e, r)), r && r.length && y(r).remove(), y.merge([], o.childNodes)));
                var n, o, r;
            }),
            (y.fn.load = function (t, e, i) {
                var n,
                    s,
                    o,
                    r = this,
                    a = t.indexOf(" ");
                return (
                    -1 < a && ((n = De(t.slice(a))), (t = t.slice(0, a))),
                    m(e) ? ((i = e), (e = void 0)) : e && "object" == typeof e && (s = "POST"),
                    0 < r.length &&
                        y
                            .ajax({ url: t, type: s || "GET", dataType: "html", data: e })
                            .done(function (t) {
                                (o = arguments), r.html(n ? y("<div>").append(y.parseHTML(t)).find(n) : t);
                            })
                            .always(
                                i &&
                                    function (t, e) {
                                        r.each(function () {
                                            i.apply(this, o || [t.responseText, e, t]);
                                        });
                                    }
                            ),
                    this
                );
            }),
            y.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) {
                y.fn[e] = function (t) {
                    return this.on(e, t);
                };
            }),
            (y.expr.pseudos.animated = function (t) {
                return y.grep(y.timers, function (e) {
                    return t === e.elem;
                }).length;
            }),
            (y.offset = {
                setOffset: function (t, e, i) {
                    var n,
                        s,
                        o,
                        r,
                        a,
                        l,
                        h = y.css(t, "position"),
                        c = y(t),
                        u = {};
                    "static" === h && (t.style.position = "relative"),
                        (a = c.offset()),
                        (o = y.css(t, "top")),
                        (l = y.css(t, "left")),
                        (s = ("absolute" === h || "fixed" === h) && -1 < (o + l).indexOf("auto") ? ((r = (n = c.position()).top), n.left) : ((r = parseFloat(o) || 0), parseFloat(l) || 0)),
                        m(e) && (e = e.call(t, i, y.extend({}, a))),
                        null != e.top && (u.top = e.top - a.top + r),
                        null != e.left && (u.left = e.left - a.left + s),
                        "using" in e ? e.using.call(t, u) : c.css(u);
                },
            }),
            y.fn.extend({
                offset: function (t) {
                    if (arguments.length)
                        return void 0 === t
                            ? this
                            : this.each(function (e) {
                                  y.offset.setOffset(this, t, e);
                              });
                    var e,
                        i,
                        n = this[0];
                    return n ? (n.getClientRects().length ? ((e = n.getBoundingClientRect()), (i = n.ownerDocument.defaultView), { top: e.top + i.pageYOffset, left: e.left + i.pageXOffset }) : { top: 0, left: 0 }) : void 0;
                },
                position: function () {
                    if (this[0]) {
                        var t,
                            e,
                            i,
                            n = this[0],
                            s = { top: 0, left: 0 };
                        if ("fixed" === y.css(n, "position")) e = n.getBoundingClientRect();
                        else {
                            for (e = this.offset(), i = n.ownerDocument, t = n.offsetParent || i.documentElement; t && (t === i.body || t === i.documentElement) && "static" === y.css(t, "position"); ) t = t.parentNode;
                            t && t !== n && 1 === t.nodeType && (((s = y(t).offset()).top += y.css(t, "borderTopWidth", !0)), (s.left += y.css(t, "borderLeftWidth", !0)));
                        }
                        return { top: e.top - s.top - y.css(n, "marginTop", !0), left: e.left - s.left - y.css(n, "marginLeft", !0) };
                    }
                },
                offsetParent: function () {
                    return this.map(function () {
                        for (var t = this.offsetParent; t && "static" === y.css(t, "position"); ) t = t.offsetParent;
                        return t || nt;
                    });
                },
            }),
            y.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (t, e) {
                var n = "pageYOffset" === e;
                y.fn[t] = function (s) {
                    return z(
                        this,
                        function (t, s, o) {
                            var r;
                            if ((i(t) ? (r = t) : 9 === t.nodeType && (r = t.defaultView), void 0 === o)) return r ? r[e] : t[s];
                            r ? r.scrollTo(n ? r.pageXOffset : o, n ? o : r.pageYOffset) : (t[s] = o);
                        },
                        t,
                        s,
                        arguments.length
                    );
                };
            }),
            y.each(["top", "left"], function (t, e) {
                y.cssHooks[e] = Qt(g.pixelPosition, function (t, i) {
                    if (i) return (i = Xt(t, e)), Yt.test(i) ? y(t).position()[e] + "px" : i;
                });
            }),
            y.each({ Height: "height", Width: "width" }, function (t, e) {
                y.each({ padding: "inner" + t, content: e, "": "outer" + t }, function (n, s) {
                    y.fn[s] = function (o, r) {
                        var a = arguments.length && (n || "boolean" != typeof o),
                            l = n || (!0 === o || !0 === r ? "margin" : "border");
                        return z(
                            this,
                            function (e, n, o) {
                                var r;
                                return i(e)
                                    ? 0 === s.indexOf("outer")
                                        ? e["inner" + t]
                                        : e.document.documentElement["client" + t]
                                    : 9 === e.nodeType
                                    ? ((r = e.documentElement), Math.max(e.body["scroll" + t], r["scroll" + t], e.body["offset" + t], r["offset" + t], r["client" + t]))
                                    : void 0 === o
                                    ? y.css(e, n, l)
                                    : y.style(e, n, o, l);
                            },
                            e,
                            a ? o : void 0,
                            a
                        );
                    };
                });
            }),
            y.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (t, e) {
                y.fn[e] = function (t, i) {
                    return 0 < arguments.length ? this.on(e, null, t, i) : this.trigger(e);
                };
            }),
            y.fn.extend({
                hover: function (t, e) {
                    return this.mouseenter(t).mouseleave(e || t);
                },
            }),
            y.fn.extend({
                bind: function (t, e, i) {
                    return this.on(t, null, e, i);
                },
                unbind: function (t, e) {
                    return this.off(t, null, e);
                },
                delegate: function (t, e, i, n) {
                    return this.on(e, t, i, n);
                },
                undelegate: function (t, e, i) {
                    return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i);
                },
            }),
            (y.proxy = function (t, e) {
                var i, n, s;
                if (("string" == typeof e && ((i = t[e]), (e = t), (t = i)), m(t)))
                    return (
                        (n = r.call(arguments, 2)),
                        ((s = function () {
                            return t.apply(e || this, n.concat(r.call(arguments)));
                        }).guid = t.guid = t.guid || y.guid++),
                        s
                    );
            }),
            (y.holdReady = function (t) {
                t ? y.readyWait++ : y.ready(!0);
            }),
            (y.isArray = Array.isArray),
            (y.parseJSON = JSON.parse),
            (y.nodeName = S),
            (y.isFunction = m),
            (y.isWindow = i),
            (y.camelCase = Y),
            (y.type = b),
            (y.now = Date.now),
            (y.isNumeric = function (t) {
                var e = y.type(t);
                return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t));
            }),
            "function" == typeof define &&
                define.amd &&
                define("jquery", [], function () {
                    return y;
                });
        var si = t.jQuery,
            oi = t.$;
        return (
            (y.noConflict = function (e) {
                return t.$ === y && (t.$ = oi), e && t.jQuery === y && (t.jQuery = si), y;
            }),
            e || (t.jQuery = t.$ = y),
            y
        );
    }),
    (function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
    })(function (t) {
        function e() {
            (this._curInst = null),
                (this._keyEvent = !1),
                (this._disabledInputs = []),
                (this._datepickerShowing = !1),
                (this._inDialog = !1),
                (this._mainDivId = "ui-datepicker-div"),
                (this._inlineClass = "ui-datepicker-inline"),
                (this._appendClass = "ui-datepicker-append"),
                (this._triggerClass = "ui-datepicker-trigger"),
                (this._dialogClass = "ui-datepicker-dialog"),
                (this._disableClass = "ui-datepicker-disabled"),
                (this._unselectableClass = "ui-datepicker-unselectable"),
                (this._currentClass = "ui-datepicker-current-day"),
                (this._dayOverClass = "ui-datepicker-days-cell-over"),
                (this.regional = []),
                (this.regional[""] = {
                    closeText: "Done",
                    prevText: "Prev",
                    nextText: "Next",
                    currentText: "Today",
                    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    weekHeader: "Wk",
                    dateFormat: "mm/dd/yy",
                    firstDay: 0,
                    isRTL: !1,
                    showMonthAfterYear: !1,
                    yearSuffix: "",
                }),
                (this._defaults = {
                    showOn: "focus",
                    showAnim: "fadeIn",
                    showOptions: {},
                    defaultDate: null,
                    appendText: "",
                    buttonText: "...",
                    buttonImage: "",
                    buttonImageOnly: !1,
                    hideIfNoPrevNext: !1,
                    navigationAsDateFormat: !1,
                    gotoCurrent: !1,
                    changeMonth: !1,
                    changeYear: !1,
                    yearRange: "c-10:c+10",
                    showOtherMonths: !1,
                    selectOtherMonths: !1,
                    showWeek: !1,
                    calculateWeek: this.iso8601Week,
                    shortYearCutoff: "+10",
                    minDate: null,
                    maxDate: null,
                    duration: "fast",
                    beforeShowDay: null,
                    beforeShow: null,
                    onSelect: null,
                    onChangeMonthYear: null,
                    onClose: null,
                    numberOfMonths: 1,
                    showCurrentAtPos: 0,
                    stepMonths: 1,
                    stepBigMonths: 12,
                    altField: "",
                    altFormat: "",
                    constrainInput: !0,
                    showButtonPanel: !1,
                    autoSize: !1,
                    disabled: !1,
                }),
                t.extend(this._defaults, this.regional[""]),
                (this.regional.en = t.extend(!0, {}, this.regional[""])),
                (this.regional["en-US"] = t.extend(!0, {}, this.regional.en)),
                (this.dpDiv = i(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")));
        }
        function i(e) {
            var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return e
                .on("mouseout", i, function () {
                    t(this).removeClass("ui-state-hover"),
                        -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"),
                        -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover");
                })
                .on("mouseover", i, n);
        }
        function n() {
            t.datepicker._isDisabledDatepicker(it.inline ? it.dpDiv.parent()[0] : it.input[0]) ||
                (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),
                t(this).addClass("ui-state-hover"),
                -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"),
                -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"));
        }
        function s(e, i) {
            for (var n in (t.extend(e, i), i)) null == i[n] && (e[n] = i[n]);
            return e;
        }
        function o(t) {
            return function () {
                var e = this.element.val();
                t.apply(this, arguments), this._refresh(), e !== this.element.val() && this._trigger("change");
            };
        }
        (t.ui = t.ui || {}), (t.ui.version = "1.12.1");
        var r,
            a,
            l,
            h,
            c,
            u,
            d,
            p,
            f,
            g,
            m,
            v = 0,
            _ = Array.prototype.slice;
        function b(t, e, i) {
            return [parseFloat(t[0]) * (f.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (f.test(t[1]) ? i / 100 : 1)];
        }
        function y(e, i) {
            return parseInt(t.css(e, i), 10) || 0;
        }
        (t.cleanData =
            ((m = t.cleanData),
            function (e) {
                var i, n, s;
                for (s = 0; null != (n = e[s]); s++)
                    try {
                        (i = t._data(n, "events")) && i.remove && t(n).triggerHandler("remove");
                    } catch (e) {}
                m(e);
            })),
            (t.widget = function (e, i, n) {
                var s,
                    o,
                    r,
                    a = {},
                    l = e.split(".")[0],
                    h = l + "-" + (e = e.split(".")[1]);
                return (
                    n || ((n = i), (i = t.Widget)),
                    t.isArray(n) && (n = t.extend.apply(null, [{}].concat(n))),
                    (t.expr[":"][h.toLowerCase()] = function (e) {
                        return !!t.data(e, h);
                    }),
                    (t[l] = t[l] || {}),
                    (s = t[l][e]),
                    (o = t[l][e] = function (t, e) {
                        return this._createWidget ? void (arguments.length && this._createWidget(t, e)) : new o(t, e);
                    }),
                    t.extend(o, s, { version: n.version, _proto: t.extend({}, n), _childConstructors: [] }),
                    ((r = new i()).options = t.widget.extend({}, r.options)),
                    t.each(n, function (e, n) {
                        return t.isFunction(n)
                            ? void (a[e] = function () {
                                  var t,
                                      e = this._super,
                                      i = this._superApply;
                                  return (this._super = s), (this._superApply = o), (t = n.apply(this, arguments)), (this._super = e), (this._superApply = i), t;
                              })
                            : void (a[e] = n);
                        function s() {
                            return i.prototype[e].apply(this, arguments);
                        }
                        function o(t) {
                            return i.prototype[e].apply(this, t);
                        }
                    }),
                    (o.prototype = t.widget.extend(r, { widgetEventPrefix: (s && r.widgetEventPrefix) || e }, a, { constructor: o, namespace: l, widgetName: e, widgetFullName: h })),
                    s
                        ? (t.each(s._childConstructors, function (e, i) {
                              var n = i.prototype;
                              t.widget(n.namespace + "." + n.widgetName, o, i._proto);
                          }),
                          delete s._childConstructors)
                        : i._childConstructors.push(o),
                    t.widget.bridge(e, o),
                    o
                );
            }),
            (t.widget.extend = function (e) {
                for (var i, n, s = _.call(arguments, 1), o = 0, r = s.length; o < r; o++)
                    for (i in s[o]) (n = s[o][i]), s[o].hasOwnProperty(i) && void 0 !== n && (e[i] = t.isPlainObject(n) ? (t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], n) : t.widget.extend({}, n)) : n);
                return e;
            }),
            (t.widget.bridge = function (e, i) {
                var n = i.prototype.widgetFullName || e;
                t.fn[e] = function (s) {
                    var o = "string" == typeof s,
                        r = _.call(arguments, 1),
                        a = this;
                    return (
                        o
                            ? this.length || "instance" !== s
                                ? this.each(function () {
                                      var i,
                                          o = t.data(this, n);
                                      return "instance" === s
                                          ? ((a = o), !1)
                                          : o
                                          ? t.isFunction(o[s]) && "_" !== s.charAt(0)
                                              ? (i = o[s].apply(o, r)) !== o && void 0 !== i
                                                  ? ((a = i && i.jquery ? a.pushStack(i.get()) : i), !1)
                                                  : void 0
                                              : t.error("no such method '" + s + "' for " + e + " widget instance")
                                          : t.error("cannot call methods on " + e + " prior to initialization; attempted to call method '" + s + "'");
                                  })
                                : (a = void 0)
                            : (r.length && (s = t.widget.extend.apply(null, [s].concat(r))),
                              this.each(function () {
                                  var e = t.data(this, n);
                                  e ? (e.option(s || {}), e._init && e._init()) : t.data(this, n, new i(s, this));
                              })),
                        a
                    );
                };
            }),
            (t.Widget = function () {}),
            (t.Widget._childConstructors = []),
            (t.Widget.prototype = {
                widgetName: "widget",
                widgetEventPrefix: "",
                defaultElement: "<div>",
                options: { classes: {}, disabled: !1, create: null },
                _createWidget: function (e, i) {
                    (i = t(i || this.defaultElement || this)[0]),
                        (this.element = t(i)),
                        (this.uuid = v++),
                        (this.eventNamespace = "." + this.widgetName + this.uuid),
                        (this.bindings = t()),
                        (this.hoverable = t()),
                        (this.focusable = t()),
                        (this.classesElementLookup = {}),
                        i !== this &&
                            (t.data(i, this.widgetFullName, this),
                            this._on(!0, this.element, {
                                remove: function (t) {
                                    t.target === i && this.destroy();
                                },
                            }),
                            (this.document = t(i.style ? i.ownerDocument : i.document || i)),
                            (this.window = t(this.document[0].defaultView || this.document[0].parentWindow))),
                        (this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e)),
                        this._create(),
                        this.options.disabled && this._setOptionDisabled(this.options.disabled),
                        this._trigger("create", null, this._getCreateEventData()),
                        this._init();
                },
                _getCreateOptions: function () {
                    return {};
                },
                _getCreateEventData: t.noop,
                _create: t.noop,
                _init: t.noop,
                destroy: function () {
                    var e = this;
                    this._destroy(),
                        t.each(this.classesElementLookup, function (t, i) {
                            e._removeClass(i, t);
                        }),
                        this.element.off(this.eventNamespace).removeData(this.widgetFullName),
                        this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
                        this.bindings.off(this.eventNamespace);
                },
                _destroy: t.noop,
                widget: function () {
                    return this.element;
                },
                option: function (e, i) {
                    var n,
                        s,
                        o,
                        r = e;
                    if (0 === arguments.length) return t.widget.extend({}, this.options);
                    if ("string" == typeof e)
                        if (((r = {}), (e = (n = e.split(".")).shift()), n.length)) {
                            for (s = r[e] = t.widget.extend({}, this.options[e]), o = 0; n.length - 1 > o; o++) (s[n[o]] = s[n[o]] || {}), (s = s[n[o]]);
                            if (((e = n.pop()), 1 === arguments.length)) return void 0 === s[e] ? null : s[e];
                            s[e] = i;
                        } else {
                            if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
                            r[e] = i;
                        }
                    return this._setOptions(r), this;
                },
                _setOptions: function (t) {
                    var e;
                    for (e in t) this._setOption(e, t[e]);
                    return this;
                },
                _setOption: function (t, e) {
                    return "classes" === t && this._setOptionClasses(e), (this.options[t] = e), "disabled" === t && this._setOptionDisabled(e), this;
                },
                _setOptionClasses: function (e) {
                    var i, n, s;
                    for (i in e) (s = this.classesElementLookup[i]), e[i] !== this.options.classes[i] && s && s.length && ((n = t(s.get())), this._removeClass(s, i), n.addClass(this._classes({ element: n, keys: i, classes: e, add: !0 })));
                },
                _setOptionDisabled: function (t) {
                    this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t), t && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"));
                },
                enable: function () {
                    return this._setOptions({ disabled: !1 });
                },
                disable: function () {
                    return this._setOptions({ disabled: !0 });
                },
                _classes: function (e) {
                    function i(i, o) {
                        var r, a;
                        for (a = 0; i.length > a; a++)
                            (r = s.classesElementLookup[i[a]] || t()),
                                (r = e.add ? t(t.unique(r.get().concat(e.element.get()))) : t(r.not(e.element).get())),
                                (s.classesElementLookup[i[a]] = r),
                                n.push(i[a]),
                                o && e.classes[i[a]] && n.push(e.classes[i[a]]);
                    }
                    var n = [],
                        s = this;
                    return (
                        (e = t.extend({ element: this.element, classes: this.options.classes || {} }, e)),
                        this._on(e.element, { remove: "_untrackClassesElement" }),
                        e.keys && i(e.keys.match(/\S+/g) || [], !0),
                        e.extra && i(e.extra.match(/\S+/g) || []),
                        n.join(" ")
                    );
                },
                _untrackClassesElement: function (e) {
                    var i = this;
                    t.each(i.classesElementLookup, function (n, s) {
                        -1 !== t.inArray(e.target, s) && (i.classesElementLookup[n] = t(s.not(e.target).get()));
                    });
                },
                _removeClass: function (t, e, i) {
                    return this._toggleClass(t, e, i, !1);
                },
                _addClass: function (t, e, i) {
                    return this._toggleClass(t, e, i, !0);
                },
                _toggleClass: function (t, e, i, n) {
                    n = "boolean" == typeof n ? n : i;
                    var s = "string" == typeof t || null === t,
                        o = { extra: s ? e : i, keys: s ? t : e, element: s ? this.element : t, add: n };
                    return o.element.toggleClass(this._classes(o), n), this;
                },
                _on: function (e, i, n) {
                    var s,
                        o = this;
                    "boolean" != typeof e && ((n = i), (i = e), (e = !1)),
                        n ? ((i = s = t(i)), (this.bindings = this.bindings.add(i))) : ((n = i), (i = this.element), (s = this.widget())),
                        t.each(n, function (n, r) {
                            function a() {
                                return e || (!0 !== o.options.disabled && !t(this).hasClass("ui-state-disabled")) ? ("string" == typeof r ? o[r] : r).apply(o, arguments) : void 0;
                            }
                            "string" != typeof r && (a.guid = r.guid = r.guid || a.guid || t.guid++);
                            var l = n.match(/^([\w:-]*)\s*(.*)$/),
                                h = l[1] + o.eventNamespace,
                                c = l[2];
                            c ? s.on(h, c, a) : i.on(h, a);
                        });
                },
                _off: function (e, i) {
                    (i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace),
                        e.off(i).off(i),
                        (this.bindings = t(this.bindings.not(e).get())),
                        (this.focusable = t(this.focusable.not(e).get())),
                        (this.hoverable = t(this.hoverable.not(e).get()));
                },
                _delay: function (t, e) {
                    var i = this;
                    return setTimeout(function () {
                        return ("string" == typeof t ? i[t] : t).apply(i, arguments);
                    }, e || 0);
                },
                _hoverable: function (e) {
                    (this.hoverable = this.hoverable.add(e)),
                        this._on(e, {
                            mouseenter: function (e) {
                                this._addClass(t(e.currentTarget), null, "ui-state-hover");
                            },
                            mouseleave: function (e) {
                                this._removeClass(t(e.currentTarget), null, "ui-state-hover");
                            },
                        });
                },
                _focusable: function (e) {
                    (this.focusable = this.focusable.add(e)),
                        this._on(e, {
                            focusin: function (e) {
                                this._addClass(t(e.currentTarget), null, "ui-state-focus");
                            },
                            focusout: function (e) {
                                this._removeClass(t(e.currentTarget), null, "ui-state-focus");
                            },
                        });
                },
                _trigger: function (e, i, n) {
                    var s,
                        o,
                        r = this.options[e];
                    if (((n = n || {}), ((i = t.Event(i)).type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase()), (i.target = this.element[0]), (o = i.originalEvent))) for (s in o) s in i || (i[s] = o[s]);
                    return this.element.trigger(i, n), !((t.isFunction(r) && !1 === r.apply(this.element[0], [i].concat(n))) || i.isDefaultPrevented());
                },
            }),
            t.each({ show: "fadeIn", hide: "fadeOut" }, function (e, i) {
                t.Widget.prototype["_" + e] = function (n, s, o) {
                    "string" == typeof s && (s = { effect: s });
                    var r,
                        a = s ? (!0 === s || "number" == typeof s ? i : s.effect || i) : e;
                    "number" == typeof (s = s || {}) && (s = { duration: s }),
                        (r = !t.isEmptyObject(s)),
                        (s.complete = o),
                        s.delay && n.delay(s.delay),
                        r && t.effects && t.effects.effect[a]
                            ? n[e](s)
                            : a !== e && n[a]
                            ? n[a](s.duration, s.easing, o)
                            : n.queue(function (i) {
                                  t(this)[e](), o && o.call(n[0]), i();
                              });
                };
            }),
            t.widget,
            (l = Math.max),
            (h = Math.abs),
            (c = /left|center|right/),
            (u = /top|center|bottom/),
            (d = /[\+\-]\d+(\.[\d]+)?%?/),
            (p = /^\w+/),
            (f = /%$/),
            (g = t.fn.position),
            (t.position = {
                scrollbarWidth: function () {
                    if (void 0 !== a) return a;
                    var e,
                        i,
                        n = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                        s = n.children()[0];
                    return t("body").append(n), (e = s.offsetWidth), n.css("overflow", "scroll"), e === (i = s.offsetWidth) && (i = n[0].clientWidth), n.remove(), (a = e - i);
                },
                getScrollInfo: function (e) {
                    var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
                        n = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
                        s = "scroll" === i || ("auto" === i && e.width < e.element[0].scrollWidth);
                    return { width: "scroll" === n || ("auto" === n && e.height < e.element[0].scrollHeight) ? t.position.scrollbarWidth() : 0, height: s ? t.position.scrollbarWidth() : 0 };
                },
                getWithinInfo: function (e) {
                    var i = t(e || window),
                        n = t.isWindow(i[0]),
                        s = !!i[0] && 9 === i[0].nodeType;
                    return { element: i, isWindow: n, isDocument: s, offset: n || s ? { left: 0, top: 0 } : t(e).offset(), scrollLeft: i.scrollLeft(), scrollTop: i.scrollTop(), width: i.outerWidth(), height: i.outerHeight() };
                },
            }),
            (t.fn.position = function (e) {
                if (!e || !e.of) return g.apply(this, arguments);
                e = t.extend({}, e);
                var i,
                    n,
                    s,
                    o,
                    r,
                    a,
                    f = t(e.of),
                    m = t.position.getWithinInfo(e.within),
                    v = t.position.getScrollInfo(m),
                    _ = (e.collision || "flip").split(" "),
                    w = {};
                return (
                    (a = (function (e) {
                        var i = e[0];
                        return 9 === i.nodeType
                            ? { width: e.width(), height: e.height(), offset: { top: 0, left: 0 } }
                            : t.isWindow(i)
                            ? { width: e.width(), height: e.height(), offset: { top: e.scrollTop(), left: e.scrollLeft() } }
                            : i.preventDefault
                            ? { width: 0, height: 0, offset: { top: i.pageY, left: i.pageX } }
                            : { width: e.outerWidth(), height: e.outerHeight(), offset: e.offset() };
                    })(f)),
                    f[0].preventDefault && (e.at = "left top"),
                    (n = a.width),
                    (s = a.height),
                    (o = a.offset),
                    (r = t.extend({}, o)),
                    t.each(["my", "at"], function () {
                        var t,
                            i,
                            n = (e[this] || "").split(" ");
                        1 === n.length && (n = c.test(n[0]) ? n.concat(["center"]) : u.test(n[0]) ? ["center"].concat(n) : ["center", "center"]),
                            (n[0] = c.test(n[0]) ? n[0] : "center"),
                            (n[1] = u.test(n[1]) ? n[1] : "center"),
                            (t = d.exec(n[0])),
                            (i = d.exec(n[1])),
                            (w[this] = [t ? t[0] : 0, i ? i[0] : 0]),
                            (e[this] = [p.exec(n[0])[0], p.exec(n[1])[0]]);
                    }),
                    1 === _.length && (_[1] = _[0]),
                    "right" === e.at[0] ? (r.left += n) : "center" === e.at[0] && (r.left += n / 2),
                    "bottom" === e.at[1] ? (r.top += s) : "center" === e.at[1] && (r.top += s / 2),
                    (i = b(w.at, n, s)),
                    (r.left += i[0]),
                    (r.top += i[1]),
                    this.each(function () {
                        var a,
                            c,
                            u = t(this),
                            d = u.outerWidth(),
                            p = u.outerHeight(),
                            g = y(this, "marginLeft"),
                            C = y(this, "marginTop"),
                            x = d + g + y(this, "marginRight") + v.width,
                            k = p + C + y(this, "marginBottom") + v.height,
                            T = t.extend({}, r),
                            D = b(w.my, u.outerWidth(), u.outerHeight());
                        "right" === e.my[0] ? (T.left -= d) : "center" === e.my[0] && (T.left -= d / 2),
                            "bottom" === e.my[1] ? (T.top -= p) : "center" === e.my[1] && (T.top -= p / 2),
                            (T.left += D[0]),
                            (T.top += D[1]),
                            (a = { marginLeft: g, marginTop: C }),
                            t.each(["left", "top"], function (o, r) {
                                t.ui.position[_[o]] &&
                                    t.ui.position[_[o]][r](T, {
                                        targetWidth: n,
                                        targetHeight: s,
                                        elemWidth: d,
                                        elemHeight: p,
                                        collisionPosition: a,
                                        collisionWidth: x,
                                        collisionHeight: k,
                                        offset: [i[0] + D[0], i[1] + D[1]],
                                        my: e.my,
                                        at: e.at,
                                        within: m,
                                        elem: u,
                                    });
                            }),
                            e.using &&
                                (c = function (t) {
                                    var i = o.left - T.left,
                                        r = i + n - d,
                                        a = o.top - T.top,
                                        c = a + s - p,
                                        g = {
                                            target: { element: f, left: o.left, top: o.top, width: n, height: s },
                                            element: { element: u, left: T.left, top: T.top, width: d, height: p },
                                            horizontal: r < 0 ? "left" : 0 < i ? "right" : "center",
                                            vertical: c < 0 ? "top" : 0 < a ? "bottom" : "middle",
                                        };
                                    n < d && n > h(i + r) && (g.horizontal = "center"), s < p && s > h(a + c) && (g.vertical = "middle"), (g.important = l(h(i), h(r)) > l(h(a), h(c)) ? "horizontal" : "vertical"), e.using.call(this, t, g);
                                }),
                            u.offset(t.extend(T, { using: c }));
                    })
                );
            }),
            (t.ui.position = {
                fit: {
                    left: function (t, e) {
                        var i,
                            n = e.within,
                            s = n.isWindow ? n.scrollLeft : n.offset.left,
                            o = n.width,
                            r = t.left - e.collisionPosition.marginLeft,
                            a = s - r,
                            h = r + e.collisionWidth - o - s;
                        e.collisionWidth > o
                            ? 0 < a && h <= 0
                                ? ((i = t.left + a + e.collisionWidth - o - s), (t.left += a - i))
                                : (t.left = 0 < h && a <= 0 ? s : h < a ? s + o - e.collisionWidth : s)
                            : 0 < a
                            ? (t.left += a)
                            : 0 < h
                            ? (t.left -= h)
                            : (t.left = l(t.left - r, t.left));
                    },
                    top: function (t, e) {
                        var i,
                            n = e.within,
                            s = n.isWindow ? n.scrollTop : n.offset.top,
                            o = e.within.height,
                            r = t.top - e.collisionPosition.marginTop,
                            a = s - r,
                            h = r + e.collisionHeight - o - s;
                        e.collisionHeight > o
                            ? 0 < a && h <= 0
                                ? ((i = t.top + a + e.collisionHeight - o - s), (t.top += a - i))
                                : (t.top = 0 < h && a <= 0 ? s : h < a ? s + o - e.collisionHeight : s)
                            : 0 < a
                            ? (t.top += a)
                            : 0 < h
                            ? (t.top -= h)
                            : (t.top = l(t.top - r, t.top));
                    },
                },
                flip: {
                    left: function (t, e) {
                        var i,
                            n,
                            s = e.within,
                            o = s.offset.left + s.scrollLeft,
                            r = s.width,
                            a = s.isWindow ? s.scrollLeft : s.offset.left,
                            l = t.left - e.collisionPosition.marginLeft,
                            c = l - a,
                            u = l + e.collisionWidth - r - a,
                            d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
                            p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
                            f = -2 * e.offset[0];
                        c < 0
                            ? ((i = t.left + d + p + f + e.collisionWidth - r - o) < 0 || h(c) > i) && (t.left += d + p + f)
                            : 0 < u && (0 < (n = t.left - e.collisionPosition.marginLeft + d + p + f - a) || u > h(n)) && (t.left += d + p + f);
                    },
                    top: function (t, e) {
                        var i,
                            n,
                            s = e.within,
                            o = s.offset.top + s.scrollTop,
                            r = s.height,
                            a = s.isWindow ? s.scrollTop : s.offset.top,
                            l = t.top - e.collisionPosition.marginTop,
                            c = l - a,
                            u = l + e.collisionHeight - r - a,
                            d = "top" === e.my[1] ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                            p = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
                            f = -2 * e.offset[1];
                        c < 0 ? ((n = t.top + d + p + f + e.collisionHeight - r - o) < 0 || h(c) > n) && (t.top += d + p + f) : 0 < u && (0 < (i = t.top - e.collisionPosition.marginTop + d + p + f - a) || u > h(i)) && (t.top += d + p + f);
                    },
                },
                flipfit: {
                    left: function () {
                        t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments);
                    },
                    top: function () {
                        t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments);
                    },
                },
            }),
            t.ui.position,
            t.extend(t.expr[":"], {
                data: t.expr.createPseudo
                    ? t.expr.createPseudo(function (e) {
                          return function (i) {
                              return !!t.data(i, e);
                          };
                      })
                    : function (e, i, n) {
                          return !!t.data(e, n[3]);
                      },
            }),
            t.fn.extend({
                disableSelection:
                    ((r = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown"),
                    function () {
                        return this.on(r + ".ui-disableSelection", function (t) {
                            t.preventDefault();
                        });
                    }),
                enableSelection: function () {
                    return this.off(".ui-disableSelection");
                },
            });
        var w,
            C,
            x,
            k,
            T,
            D,
            S,
            E,
            I,
            A,
            P,
            N,
            O,
            M,
            $,
            H,
            L,
            W,
            R,
            F,
            j,
            z,
            q,
            B = "ui-effects-",
            U = "ui-effects-style",
            Y = "ui-effects-animated",
            K = t;
        function V(e, i, n, s) {
            return (
                t.isPlainObject(e) && (e = (i = e).effect),
                (e = { effect: e }),
                null == i && (i = {}),
                t.isFunction(i) && ((s = i), (n = null), (i = {})),
                ("number" != typeof i && !t.fx.speeds[i]) || ((s = n), (n = i), (i = {})),
                t.isFunction(n) && ((s = n), (n = null)),
                i && t.extend(e, i),
                (n = n || i.duration),
                (e.duration = t.fx.off ? 0 : "number" == typeof n ? n : n in t.fx.speeds ? t.fx.speeds[n] : t.fx.speeds._default),
                (e.complete = s || i.complete),
                e
            );
        }
        function X(e) {
            return !(e && "number" != typeof e && !t.fx.speeds[e]) || ("string" == typeof e && !t.effects.effect[e]) || !!t.isFunction(e) || ("object" == typeof e && !e.effect);
        }
        function Q(t, e) {
            var i = e.outerWidth(),
                n = e.outerHeight(),
                s = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/.exec(t) || ["", 0, i, n, 0];
            return { top: parseFloat(s[1]) || 0, right: "auto" === s[2] ? i : parseFloat(s[2]), bottom: "auto" === s[3] ? n : parseFloat(s[3]), left: parseFloat(s[4]) || 0 };
        }
        function G(e) {
            var i,
                n,
                s = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
                o = {};
            if (s && s.length && s[0] && s[s[0]]) for (n = s.length; n--; ) "string" == typeof s[(i = s[n])] && (o[t.camelCase(i)] = s[i]);
            else for (i in s) "string" == typeof s[i] && (o[i] = s[i]);
            return o;
        }
        function J(t, e, i) {
            var n = W[e.type] || {};
            return null == t ? (i || !e.def ? null : e.def) : ((t = n.floor ? ~~t : parseFloat(t)), isNaN(t) ? e.def : n.mod ? (t + n.mod) % n.mod : t < 0 ? 0 : t > n.max ? n.max : t);
        }
        function Z(t) {
            var e = H(),
                i = (e._rgba = []);
            return (
                (t = t.toLowerCase()),
                j($, function (n, s) {
                    var o,
                        r = s.re.exec(t),
                        a = r && s.parse(r),
                        l = s.space || "rgba";
                    return a ? ((o = e[l](a)), (e[L[l].cache] = o[L[l].cache]), (i = e._rgba = o._rgba), !1) : N;
                }),
                i.length ? ("0,0,0,0" === i.join() && P.extend(i, O.transparent), e) : O[t]
            );
        }
        function tt(t, e, i) {
            return 6 * (i = (i + 1) % 1) < 1 ? t + 6 * (e - t) * i : 2 * i < 1 ? e : 3 * i < 2 ? t + 6 * (e - t) * (2 / 3 - i) : t;
        }
        (t.effects = { effect: {} }),
            (M = /^([\-+])=\s*(\d+\.?\d*)/),
            ($ = [
                {
                    re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function (t) {
                        return [t[1], t[2], t[3], t[4]];
                    },
                },
                {
                    re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function (t) {
                        return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]];
                    },
                },
                {
                    re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                    parse: function (t) {
                        return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)];
                    },
                },
                {
                    re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                    parse: function (t) {
                        return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)];
                    },
                },
                {
                    re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    space: "hsla",
                    parse: function (t) {
                        return [t[1], t[2] / 100, t[3] / 100, t[4]];
                    },
                },
            ]),
            (H = (P = K).Color = function (t, e, i, n) {
                return new P.Color.fn.parse(t, e, i, n);
            }),
            (L = {
                rgba: { props: { red: { idx: 0, type: "byte" }, green: { idx: 1, type: "byte" }, blue: { idx: 2, type: "byte" } } },
                hsla: { props: { hue: { idx: 0, type: "degrees" }, saturation: { idx: 1, type: "percent" }, lightness: { idx: 2, type: "percent" } } },
            }),
            (W = { byte: { floor: !0, max: 255 }, percent: { max: 1 }, degrees: { mod: 360, floor: !0 } }),
            (R = H.support = {}),
            (F = P("<p>")[0]),
            (j = P.each),
            (F.style.cssText = "background-color:rgba(1,1,1,.5)"),
            (R.rgba = -1 < F.style.backgroundColor.indexOf("rgba")),
            j(L, function (t, e) {
                (e.cache = "_" + t), (e.props.alpha = { idx: 3, type: "percent", def: 1 });
            }),
            (H.fn = P.extend(H.prototype, {
                parse: function (t, e, i, n) {
                    if (t === N) return (this._rgba = [null, null, null, null]), this;
                    (t.jquery || t.nodeType) && ((t = P(t).css(e)), (e = N));
                    var s = this,
                        o = P.type(t),
                        r = (this._rgba = []);
                    return (
                        e !== N && ((t = [t, e, i, n]), (o = "array")),
                        "string" === o
                            ? this.parse(Z(t) || O._default)
                            : "array" === o
                            ? (j(L.rgba.props, function (e, i) {
                                  r[i.idx] = J(t[i.idx], i);
                              }),
                              this)
                            : "object" === o
                            ? (j(
                                  L,
                                  t instanceof H
                                      ? function (e, i) {
                                            t[i.cache] && (s[i.cache] = t[i.cache].slice());
                                        }
                                      : function (e, i) {
                                            var n = i.cache;
                                            j(i.props, function (e, o) {
                                                if (!s[n] && i.to) {
                                                    if ("alpha" === e || null == t[e]) return;
                                                    s[n] = i.to(s._rgba);
                                                }
                                                s[n][o.idx] = J(t[e], o, !0);
                                            }),
                                                s[n] && P.inArray(null, s[n].slice(0, 3)) < 0 && ((s[n][3] = 1), i.from && (s._rgba = i.from(s[n])));
                                        }
                              ),
                              this)
                            : N
                    );
                },
                is: function (t) {
                    var e = H(t),
                        i = !0,
                        n = this;
                    return (
                        j(L, function (t, s) {
                            var o,
                                r = e[s.cache];
                            return (
                                r &&
                                    ((o = n[s.cache] || (s.to && s.to(n._rgba)) || []),
                                    j(s.props, function (t, e) {
                                        return null != r[e.idx] ? (i = r[e.idx] === o[e.idx]) : N;
                                    })),
                                i
                            );
                        }),
                        i
                    );
                },
                _space: function () {
                    var t = [],
                        e = this;
                    return (
                        j(L, function (i, n) {
                            e[n.cache] && t.push(i);
                        }),
                        t.pop()
                    );
                },
                transition: function (t, e) {
                    var i = H(t),
                        n = i._space(),
                        s = L[n],
                        o = 0 === this.alpha() ? H("transparent") : this,
                        r = o[s.cache] || s.to(o._rgba),
                        a = r.slice();
                    return (
                        (i = i[s.cache]),
                        j(s.props, function (t, n) {
                            var s = n.idx,
                                o = r[s],
                                l = i[s],
                                h = W[n.type] || {};
                            null !== l && (null === o ? (a[s] = l) : (h.mod && (l - o > h.mod / 2 ? (o += h.mod) : o - l > h.mod / 2 && (o -= h.mod)), (a[s] = J((l - o) * e + o, n))));
                        }),
                        this[n](a)
                    );
                },
                blend: function (t) {
                    if (1 === this._rgba[3]) return this;
                    var e = this._rgba.slice(),
                        i = e.pop(),
                        n = H(t)._rgba;
                    return H(
                        P.map(e, function (t, e) {
                            return (1 - i) * n[e] + i * t;
                        })
                    );
                },
                toRgbaString: function () {
                    var t = "rgba(",
                        e = P.map(this._rgba, function (t, e) {
                            return null == t ? (2 < e ? 1 : 0) : t;
                        });
                    return 1 === e[3] && (e.pop(), (t = "rgb(")), t + e.join() + ")";
                },
                toHslaString: function () {
                    var t = "hsla(",
                        e = P.map(this.hsla(), function (t, e) {
                            return null == t && (t = 2 < e ? 1 : 0), e && e < 3 && (t = Math.round(100 * t) + "%"), t;
                        });
                    return 1 === e[3] && (e.pop(), (t = "hsl(")), t + e.join() + ")";
                },
                toHexString: function (t) {
                    var e = this._rgba.slice(),
                        i = e.pop();
                    return (
                        t && e.push(~~(255 * i)),
                        "#" +
                            P.map(e, function (t) {
                                return 1 === (t = (t || 0).toString(16)).length ? "0" + t : t;
                            }).join("")
                    );
                },
                toString: function () {
                    return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
                },
            })),
            (H.fn.parse.prototype = H.fn),
            (L.hsla.to = function (t) {
                if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                var e,
                    i,
                    n = t[0] / 255,
                    s = t[1] / 255,
                    o = t[2] / 255,
                    r = t[3],
                    a = Math.max(n, s, o),
                    l = Math.min(n, s, o),
                    h = a - l,
                    c = a + l,
                    u = 0.5 * c;
                return (
                    (e = l === a ? 0 : n === a ? (60 * (s - o)) / h + 360 : s === a ? (60 * (o - n)) / h + 120 : (60 * (n - s)) / h + 240), (i = 0 == h ? 0 : u <= 0.5 ? h / c : h / (2 - c)), [Math.round(e) % 360, i, u, null == r ? 1 : r]
                );
            }),
            (L.hsla.from = function (t) {
                if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                var e = t[0] / 360,
                    i = t[1],
                    n = t[2],
                    s = t[3],
                    o = n <= 0.5 ? n * (1 + i) : n + i - n * i,
                    r = 2 * n - o;
                return [Math.round(255 * tt(r, o, e + 1 / 3)), Math.round(255 * tt(r, o, e)), Math.round(255 * tt(r, o, e - 1 / 3)), s];
            }),
            j(L, function (t, e) {
                var i = e.props,
                    n = e.cache,
                    s = e.to,
                    o = e.from;
                (H.fn[t] = function (t) {
                    if ((s && !this[n] && (this[n] = s(this._rgba)), t === N)) return this[n].slice();
                    var e,
                        r = P.type(t),
                        a = "array" === r || "object" === r ? t : arguments,
                        l = this[n].slice();
                    return (
                        j(i, function (t, e) {
                            var i = a["object" === r ? t : e.idx];
                            null == i && (i = l[e.idx]), (l[e.idx] = J(i, e));
                        }),
                        o ? (((e = H(o(l)))[n] = l), e) : H(l)
                    );
                }),
                    j(i, function (e, i) {
                        H.fn[e] ||
                            (H.fn[e] = function (n) {
                                var s,
                                    o = P.type(n),
                                    r = "alpha" === e ? (this._hsla ? "hsla" : "rgba") : t,
                                    a = this[r](),
                                    l = a[i.idx];
                                return "undefined" === o
                                    ? l
                                    : ("function" === o && ((n = n.call(this, l)), (o = P.type(n))),
                                      null == n && i.empty ? this : ("string" === o && (s = M.exec(n)) && (n = l + parseFloat(s[2]) * ("+" === s[1] ? 1 : -1)), (a[i.idx] = n), this[r](a)));
                            });
                    });
            }),
            (H.hook = function (t) {
                var e = t.split(" ");
                j(e, function (t, e) {
                    (P.cssHooks[e] = {
                        set: function (t, i) {
                            var n,
                                s,
                                o = "";
                            if ("transparent" !== i && ("string" !== P.type(i) || (n = Z(i)))) {
                                if (((i = H(n || i)), !R.rgba && 1 !== i._rgba[3])) {
                                    for (s = "backgroundColor" === e ? t.parentNode : t; ("" === o || "transparent" === o) && s && s.style; )
                                        try {
                                            (o = P.css(s, "backgroundColor")), (s = s.parentNode);
                                        } catch (t) {}
                                    i = i.blend(o && "transparent" !== o ? o : "_default");
                                }
                                i = i.toRgbaString();
                            }
                            try {
                                t.style[e] = i;
                            } catch (t) {}
                        },
                    }),
                        (P.fx.step[e] = function (t) {
                            t.colorInit || ((t.start = H(t.elem, e)), (t.end = H(t.end)), (t.colorInit = !0)), P.cssHooks[e].set(t.elem, t.start.transition(t.end, t.pos));
                        });
                });
            }),
            H.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"),
            (P.cssHooks.borderColor = {
                expand: function (t) {
                    var e = {};
                    return (
                        j(["Top", "Right", "Bottom", "Left"], function (i, n) {
                            e["border" + n + "Color"] = t;
                        }),
                        e
                    );
                },
            }),
            (O = P.Color.names = {
                aqua: "#00ffff",
                black: "#000000",
                blue: "#0000ff",
                fuchsia: "#ff00ff",
                gray: "#808080",
                green: "#008000",
                lime: "#00ff00",
                maroon: "#800000",
                navy: "#000080",
                olive: "#808000",
                purple: "#800080",
                red: "#ff0000",
                silver: "#c0c0c0",
                teal: "#008080",
                white: "#ffffff",
                yellow: "#ffff00",
                transparent: [null, null, null, 0],
                _default: "#ffffff",
            }),
            (I = ["add", "remove", "toggle"]),
            (A = { border: 1, borderBottom: 1, borderColor: 1, borderLeft: 1, borderRight: 1, borderTop: 1, borderWidth: 1, margin: 1, padding: 1 }),
            t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (e, i) {
                t.fx.step[i] = function (t) {
                    (("none" !== t.end && !t.setAttr) || (1 === t.pos && !t.setAttr)) && (K.style(t.elem, i, t.end), (t.setAttr = !0));
                };
            }),
            t.fn.addBack ||
                (t.fn.addBack = function (t) {
                    return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
                }),
            (t.effects.animateClass = function (e, i, n, s) {
                var o = t.speed(i, n, s);
                return this.queue(function () {
                    var i,
                        n = t(this),
                        s = n.attr("class") || "",
                        r = o.children ? n.find("*").addBack() : n;
                    (r = r.map(function () {
                        return { el: t(this), start: G(this) };
                    })),
                        (i = function () {
                            t.each(I, function (t, i) {
                                e[i] && n[i + "Class"](e[i]);
                            });
                        })(),
                        (r = r.map(function () {
                            return (
                                (this.end = G(this.el[0])),
                                (this.diff = (function (e, i) {
                                    var n,
                                        s,
                                        o = {};
                                    for (n in i) (s = i[n]), e[n] !== s && (A[n] || (!t.fx.step[n] && isNaN(parseFloat(s))) || (o[n] = s));
                                    return o;
                                })(this.start, this.end)),
                                this
                            );
                        })),
                        n.attr("class", s),
                        (r = r.map(function () {
                            var e = this,
                                i = t.Deferred(),
                                n = t.extend({}, o, {
                                    queue: !1,
                                    complete: function () {
                                        i.resolve(e);
                                    },
                                });
                            return this.el.animate(this.diff, n), i.promise();
                        })),
                        t.when.apply(t, r.get()).done(function () {
                            i(),
                                t.each(arguments, function () {
                                    var e = this.el;
                                    t.each(this.diff, function (t) {
                                        e.css(t, "");
                                    });
                                }),
                                o.complete.call(n[0]);
                        });
                });
            }),
            t.fn.extend({
                addClass:
                    ((E = t.fn.addClass),
                    function (e, i, n, s) {
                        return i ? t.effects.animateClass.call(this, { add: e }, i, n, s) : E.apply(this, arguments);
                    }),
                removeClass:
                    ((S = t.fn.removeClass),
                    function (e, i, n, s) {
                        return 1 < arguments.length ? t.effects.animateClass.call(this, { remove: e }, i, n, s) : S.apply(this, arguments);
                    }),
                toggleClass:
                    ((D = t.fn.toggleClass),
                    function (e, i, n, s, o) {
                        return "boolean" == typeof i || void 0 === i ? (n ? t.effects.animateClass.call(this, i ? { add: e } : { remove: e }, n, s, o) : D.apply(this, arguments)) : t.effects.animateClass.call(this, { toggle: e }, i, n, s);
                    }),
                switchClass: function (e, i, n, s, o) {
                    return t.effects.animateClass.call(this, { add: i, remove: e }, n, s, o);
                },
            }),
            t.expr &&
                t.expr.filters &&
                t.expr.filters.animated &&
                (t.expr.filters.animated =
                    ((T = t.expr.filters.animated),
                    function (e) {
                        return !!t(e).data(Y) || T(e);
                    })),
            !1 !== t.uiBackCompat &&
                t.extend(t.effects, {
                    save: function (t, e) {
                        for (var i = 0, n = e.length; i < n; i++) null !== e[i] && t.data(B + e[i], t[0].style[e[i]]);
                    },
                    restore: function (t, e) {
                        for (var i, n = 0, s = e.length; n < s; n++) null !== e[n] && ((i = t.data(B + e[n])), t.css(e[n], i));
                    },
                    setMode: function (t, e) {
                        return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e;
                    },
                    createWrapper: function (e) {
                        if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                        var i = { width: e.outerWidth(!0), height: e.outerHeight(!0), float: e.css("float") },
                            n = t("<div></div>").addClass("ui-effects-wrapper").css({ fontSize: "100%", background: "transparent", border: "none", margin: 0, padding: 0 }),
                            s = { width: e.width(), height: e.height() },
                            o = document.activeElement;
                        try {
                            o.id;
                        } catch (n) {
                            o = document.body;
                        }
                        return (
                            e.wrap(n),
                            (e[0] !== o && !t.contains(e[0], o)) || t(o).trigger("focus"),
                            (n = e.parent()),
                            "static" === e.css("position")
                                ? (n.css({ position: "relative" }), e.css({ position: "relative" }))
                                : (t.extend(i, { position: e.css("position"), zIndex: e.css("z-index") }),
                                  t.each(["top", "left", "bottom", "right"], function (t, n) {
                                      (i[n] = e.css(n)), isNaN(parseInt(i[n], 10)) && (i[n] = "auto");
                                  }),
                                  e.css({ position: "relative", top: 0, left: 0, right: "auto", bottom: "auto" })),
                            e.css(s),
                            n.css(i).show()
                        );
                    },
                    removeWrapper: function (e) {
                        var i = document.activeElement;
                        return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] !== i && !t.contains(e[0], i)) || t(i).trigger("focus")), e;
                    },
                }),
            t.extend(t.effects, {
                version: "1.12.1",
                define: function (e, i, n) {
                    return n || ((n = i), (i = "effect")), (t.effects.effect[e] = n), (t.effects.effect[e].mode = i), n;
                },
                scaledDimensions: function (t, e, i) {
                    if (0 === e) return { height: 0, width: 0, outerHeight: 0, outerWidth: 0 };
                    var n = "horizontal" !== i ? (e || 100) / 100 : 1,
                        s = "vertical" !== i ? (e || 100) / 100 : 1;
                    return { height: t.height() * s, width: t.width() * n, outerHeight: t.outerHeight() * s, outerWidth: t.outerWidth() * n };
                },
                clipToBox: function (t) {
                    return { width: t.clip.right - t.clip.left, height: t.clip.bottom - t.clip.top, left: t.clip.left, top: t.clip.top };
                },
                unshift: function (t, e, i) {
                    var n = t.queue();
                    1 < e && n.splice.apply(n, [1, 0].concat(n.splice(e, i))), t.dequeue();
                },
                saveStyle: function (t) {
                    t.data(U, t[0].style.cssText);
                },
                restoreStyle: function (t) {
                    (t[0].style.cssText = t.data(U) || ""), t.removeData(U);
                },
                mode: function (t, e) {
                    var i = t.is(":hidden");
                    return "toggle" === e && (e = i ? "show" : "hide"), (i ? "hide" === e : "show" === e) && (e = "none"), e;
                },
                getBaseline: function (t, e) {
                    var i, n;
                    switch (t[0]) {
                        case "top":
                            i = 0;
                            break;
                        case "middle":
                            i = 0.5;
                            break;
                        case "bottom":
                            i = 1;
                            break;
                        default:
                            i = t[0] / e.height;
                    }
                    switch (t[1]) {
                        case "left":
                            n = 0;
                            break;
                        case "center":
                            n = 0.5;
                            break;
                        case "right":
                            n = 1;
                            break;
                        default:
                            n = t[1] / e.width;
                    }
                    return { x: n, y: i };
                },
                createPlaceholder: function (e) {
                    var i,
                        n = e.css("position"),
                        s = e.position();
                    return (
                        e
                            .css({ marginTop: e.css("marginTop"), marginBottom: e.css("marginBottom"), marginLeft: e.css("marginLeft"), marginRight: e.css("marginRight") })
                            .outerWidth(e.outerWidth())
                            .outerHeight(e.outerHeight()),
                        /^(static|relative)/.test(n) &&
                            ((n = "absolute"),
                            (i = t("<" + e[0].nodeName + ">")
                                .insertAfter(e)
                                .css({
                                    display: /^(inline|ruby)/.test(e.css("display")) ? "inline-block" : "block",
                                    visibility: "hidden",
                                    marginTop: e.css("marginTop"),
                                    marginBottom: e.css("marginBottom"),
                                    marginLeft: e.css("marginLeft"),
                                    marginRight: e.css("marginRight"),
                                    float: e.css("float"),
                                })
                                .outerWidth(e.outerWidth())
                                .outerHeight(e.outerHeight())
                                .addClass("ui-effects-placeholder")),
                            e.data(B + "placeholder", i)),
                        e.css({ position: n, left: s.left, top: s.top }),
                        i
                    );
                },
                removePlaceholder: function (t) {
                    var e = B + "placeholder",
                        i = t.data(e);
                    i && (i.remove(), t.removeData(e));
                },
                cleanUp: function (e) {
                    t.effects.restoreStyle(e), t.effects.removePlaceholder(e);
                },
                setTransition: function (e, i, n, s) {
                    return (
                        (s = s || {}),
                        t.each(i, function (t, i) {
                            var o = e.cssUnit(i);
                            0 < o[0] && (s[i] = o[0] * n + o[1]);
                        }),
                        s
                    );
                },
            }),
            t.fn.extend({
                effect: function () {
                    function e(e) {
                        function i() {
                            t.isFunction(l) && l.call(r[0]), t.isFunction(e) && e();
                        }
                        var r = t(this);
                        (n.mode = c.shift()),
                            !1 === t.uiBackCompat || o
                                ? "none" === n.mode
                                    ? (r[h](), i())
                                    : s.call(r[0], n, function () {
                                          r.removeData(Y), t.effects.cleanUp(r), "hide" === n.mode && r.hide(), i();
                                      })
                                : (r.is(":hidden") ? "hide" === h : "show" === h)
                                ? (r[h](), i())
                                : s.call(r[0], n, i);
                    }
                    function i(e) {
                        var i = t(this),
                            n = t.effects.mode(i, h) || o;
                        i.data(Y, !0), c.push(n), o && ("show" === n || (n === o && "hide" === n)) && i.show(), (o && "none" === n) || t.effects.saveStyle(i), t.isFunction(e) && e();
                    }
                    var n = V.apply(this, arguments),
                        s = t.effects.effect[n.effect],
                        o = s.mode,
                        r = n.queue,
                        a = r || "fx",
                        l = n.complete,
                        h = n.mode,
                        c = [];
                    return t.fx.off || !s
                        ? h
                            ? this[h](n.duration, l)
                            : this.each(function () {
                                  l && l.call(this);
                              })
                        : !1 === r
                        ? this.each(i).each(e)
                        : this.queue(a, i).queue(a, e);
                },
                show:
                    ((k = t.fn.show),
                    function (t) {
                        if (X(t)) return k.apply(this, arguments);
                        var e = V.apply(this, arguments);
                        return (e.mode = "show"), this.effect.call(this, e);
                    }),
                hide:
                    ((x = t.fn.hide),
                    function (t) {
                        if (X(t)) return x.apply(this, arguments);
                        var e = V.apply(this, arguments);
                        return (e.mode = "hide"), this.effect.call(this, e);
                    }),
                toggle:
                    ((C = t.fn.toggle),
                    function (t) {
                        if (X(t) || "boolean" == typeof t) return C.apply(this, arguments);
                        var e = V.apply(this, arguments);
                        return (e.mode = "toggle"), this.effect.call(this, e);
                    }),
                cssUnit: function (e) {
                    var i = this.css(e),
                        n = [];
                    return (
                        t.each(["em", "px", "%", "pt"], function (t, e) {
                            0 < i.indexOf(e) && (n = [parseFloat(i), e]);
                        }),
                        n
                    );
                },
                cssClip: function (t) {
                    return t ? this.css("clip", "rect(" + t.top + "px " + t.right + "px " + t.bottom + "px " + t.left + "px)") : Q(this.css("clip"), this);
                },
                transfer: function (e, i) {
                    var n = t(this),
                        s = t(e.to),
                        o = "fixed" === s.css("position"),
                        r = t("body"),
                        a = o ? r.scrollTop() : 0,
                        l = o ? r.scrollLeft() : 0,
                        h = s.offset(),
                        c = { top: h.top - a, left: h.left - l, height: s.innerHeight(), width: s.innerWidth() },
                        u = n.offset(),
                        d = t("<div class='ui-effects-transfer'></div>")
                            .appendTo("body")
                            .addClass(e.className)
                            .css({ top: u.top - a, left: u.left - l, height: n.innerHeight(), width: n.innerWidth(), position: o ? "fixed" : "absolute" })
                            .animate(c, e.duration, e.easing, function () {
                                d.remove(), t.isFunction(i) && i();
                            });
                },
            }),
            (t.fx.step.clip = function (e) {
                e.clipInit || ((e.start = t(e.elem).cssClip()), "string" == typeof e.end && (e.end = Q(e.end, e.elem)), (e.clipInit = !0)),
                    t(e.elem).cssClip({
                        top: e.pos * (e.end.top - e.start.top) + e.start.top,
                        right: e.pos * (e.end.right - e.start.right) + e.start.right,
                        bottom: e.pos * (e.end.bottom - e.start.bottom) + e.start.bottom,
                        left: e.pos * (e.end.left - e.start.left) + e.start.left,
                    });
            }),
            (w = {}),
            t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (t, e) {
                w[e] = function (e) {
                    return Math.pow(e, t + 2);
                };
            }),
            t.extend(w, {
                Sine: function (t) {
                    return 1 - Math.cos((t * Math.PI) / 2);
                },
                Circ: function (t) {
                    return 1 - Math.sqrt(1 - t * t);
                },
                Elastic: function (t) {
                    return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin(((80 * (t - 1) - 7.5) * Math.PI) / 15);
                },
                Back: function (t) {
                    return t * t * (3 * t - 2);
                },
                Bounce: function (t) {
                    for (var e, i = 4; ((e = Math.pow(2, --i)) - 1) / 11 > t; );
                    return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2);
                },
            }),
            t.each(w, function (e, i) {
                (t.easing["easeIn" + e] = i),
                    (t.easing["easeOut" + e] = function (t) {
                        return 1 - i(1 - t);
                    }),
                    (t.easing["easeInOut" + e] = function (t) {
                        return t < 0.5 ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2;
                    });
            }),
            t.effects,
            t.effects.define("blind", "hide", function (e, i) {
                var n = { up: ["bottom", "top"], vertical: ["bottom", "top"], down: ["top", "bottom"], left: ["right", "left"], horizontal: ["right", "left"], right: ["left", "right"] },
                    s = t(this),
                    o = e.direction || "up",
                    r = s.cssClip(),
                    a = { clip: t.extend({}, r) },
                    l = t.effects.createPlaceholder(s);
                (a.clip[n[o][0]] = a.clip[n[o][1]]),
                    "show" === e.mode && (s.cssClip(a.clip), l && l.css(t.effects.clipToBox(a)), (a.clip = r)),
                    l && l.animate(t.effects.clipToBox(a), e.duration, e.easing),
                    s.animate(a, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
            }),
            t.effects.define("bounce", function (e, i) {
                var n,
                    s,
                    o,
                    r = t(this),
                    a = e.mode,
                    l = "hide" === a,
                    h = "show" === a,
                    c = e.direction || "up",
                    u = e.distance,
                    d = e.times || 5,
                    p = 2 * d + (h || l ? 1 : 0),
                    f = e.duration / p,
                    g = e.easing,
                    m = "up" === c || "down" === c ? "top" : "left",
                    v = "up" === c || "left" === c,
                    _ = 0,
                    b = r.queue().length;
                for (
                    t.effects.createPlaceholder(r),
                        o = r.css(m),
                        u = u || r["top" == m ? "outerHeight" : "outerWidth"]() / 3,
                        h &&
                            (((s = { opacity: 1 })[m] = o),
                            r
                                .css("opacity", 0)
                                .css(m, v ? 2 * -u : 2 * u)
                                .animate(s, f, g)),
                        l && (u /= Math.pow(2, d - 1)),
                        (s = {})[m] = o;
                    _ < d;
                    _++
                )
                    ((n = {})[m] = (v ? "-=" : "+=") + u), r.animate(n, f, g).animate(s, f, g), (u = l ? 2 * u : u / 2);
                l && (((n = { opacity: 0 })[m] = (v ? "-=" : "+=") + u), r.animate(n, f, g)), r.queue(i), t.effects.unshift(r, b, 1 + p);
            }),
            t.effects.define("clip", "hide", function (e, i) {
                var n,
                    s = {},
                    o = t(this),
                    r = e.direction || "vertical",
                    a = "both" === r,
                    l = a || "horizontal" === r,
                    h = a || "vertical" === r;
                (n = o.cssClip()),
                    (s.clip = { top: h ? (n.bottom - n.top) / 2 : n.top, right: l ? (n.right - n.left) / 2 : n.right, bottom: h ? (n.bottom - n.top) / 2 : n.bottom, left: l ? (n.right - n.left) / 2 : n.left }),
                    t.effects.createPlaceholder(o),
                    "show" === e.mode && (o.cssClip(s.clip), (s.clip = n)),
                    o.animate(s, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
            }),
            t.effects.define("drop", "hide", function (e, i) {
                var n,
                    s = t(this),
                    o = "show" === e.mode,
                    r = e.direction || "left",
                    a = "up" === r || "down" === r ? "top" : "left",
                    l = "up" === r || "left" === r ? "-=" : "+=",
                    h = "+=" == l ? "-=" : "+=",
                    c = { opacity: 0 };
                t.effects.createPlaceholder(s),
                    (n = e.distance || s["top" == a ? "outerHeight" : "outerWidth"](!0) / 2),
                    (c[a] = l + n),
                    o && (s.css(c), (c[a] = h + n), (c.opacity = 1)),
                    s.animate(c, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
            }),
            t.effects.define("explode", "hide", function (e, i) {
                function n() {
                    v.push(this), v.length === c * u && (d.css({ visibility: "visible" }), t(v).remove(), i());
                }
                var s,
                    o,
                    r,
                    a,
                    l,
                    h,
                    c = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3,
                    u = c,
                    d = t(this),
                    p = "show" === e.mode,
                    f = d.show().css("visibility", "hidden").offset(),
                    g = Math.ceil(d.outerWidth() / u),
                    m = Math.ceil(d.outerHeight() / c),
                    v = [];
                for (s = 0; s < c; s++)
                    for (a = f.top + s * m, h = s - (c - 1) / 2, o = 0; o < u; o++)
                        (r = f.left + o * g),
                            (l = o - (u - 1) / 2),
                            d
                                .clone()
                                .appendTo("body")
                                .wrap("<div></div>")
                                .css({ position: "absolute", visibility: "visible", left: -o * g, top: -s * m })
                                .parent()
                                .addClass("ui-effects-explode")
                                .css({ position: "absolute", overflow: "hidden", width: g, height: m, left: r + (p ? l * g : 0), top: a + (p ? h * m : 0), opacity: p ? 0 : 1 })
                                .animate({ left: r + (p ? 0 : l * g), top: a + (p ? 0 : h * m), opacity: p ? 1 : 0 }, e.duration || 500, e.easing, n);
            }),
            t.effects.define("fade", "toggle", function (e, i) {
                var n = "show" === e.mode;
                t(this)
                    .css("opacity", n ? 0 : 1)
                    .animate({ opacity: n ? 1 : 0 }, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
            }),
            t.effects.define("fold", "hide", function (e, i) {
                var n = t(this),
                    s = e.mode,
                    o = "show" === s,
                    r = "hide" === s,
                    a = e.size || 15,
                    l = /([0-9]+)%/.exec(a),
                    h = e.horizFirst ? ["right", "bottom"] : ["bottom", "right"],
                    c = e.duration / 2,
                    u = t.effects.createPlaceholder(n),
                    d = n.cssClip(),
                    p = { clip: t.extend({}, d) },
                    f = { clip: t.extend({}, d) },
                    g = [d[h[0]], d[h[1]]],
                    m = n.queue().length;
                l && (a = (parseInt(l[1], 10) / 100) * g[r ? 0 : 1]),
                    (p.clip[h[0]] = a),
                    (f.clip[h[0]] = a),
                    (f.clip[h[1]] = 0),
                    o && (n.cssClip(f.clip), u && u.css(t.effects.clipToBox(f)), (f.clip = d)),
                    n
                        .queue(function (i) {
                            u && u.animate(t.effects.clipToBox(p), c, e.easing).animate(t.effects.clipToBox(f), c, e.easing), i();
                        })
                        .animate(p, c, e.easing)
                        .animate(f, c, e.easing)
                        .queue(i),
                    t.effects.unshift(n, m, 4);
            }),
            t.effects.define("highlight", "show", function (e, i) {
                var n = t(this),
                    s = { backgroundColor: n.css("backgroundColor") };
                "hide" === e.mode && (s.opacity = 0), t.effects.saveStyle(n), n.css({ backgroundImage: "none", backgroundColor: e.color || "#ffff99" }).animate(s, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
            }),
            t.effects.define("size", function (e, i) {
                var n,
                    s,
                    o,
                    r = t(this),
                    a = ["fontSize"],
                    l = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                    h = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                    c = e.mode,
                    u = "effect" !== c,
                    d = e.scale || "both",
                    p = e.origin || ["middle", "center"],
                    f = r.css("position"),
                    g = r.position(),
                    m = t.effects.scaledDimensions(r),
                    v = e.from || m,
                    _ = e.to || t.effects.scaledDimensions(r, 0);
                t.effects.createPlaceholder(r),
                    "show" === c && ((o = v), (v = _), (_ = o)),
                    (s = { from: { y: v.height / m.height, x: v.width / m.width }, to: { y: _.height / m.height, x: _.width / m.width } }),
                    ("box" !== d && "both" !== d) ||
                        (s.from.y !== s.to.y && ((v = t.effects.setTransition(r, l, s.from.y, v)), (_ = t.effects.setTransition(r, l, s.to.y, _))),
                        s.from.x !== s.to.x && ((v = t.effects.setTransition(r, h, s.from.x, v)), (_ = t.effects.setTransition(r, h, s.to.x, _)))),
                    ("content" !== d && "both" !== d) || s.from.y === s.to.y || ((v = t.effects.setTransition(r, a, s.from.y, v)), (_ = t.effects.setTransition(r, a, s.to.y, _))),
                    p &&
                        ((n = t.effects.getBaseline(p, m)),
                        (v.top = (m.outerHeight - v.outerHeight) * n.y + g.top),
                        (v.left = (m.outerWidth - v.outerWidth) * n.x + g.left),
                        (_.top = (m.outerHeight - _.outerHeight) * n.y + g.top),
                        (_.left = (m.outerWidth - _.outerWidth) * n.x + g.left)),
                    r.css(v),
                    ("content" !== d && "both" !== d) ||
                        ((l = l.concat(["marginTop", "marginBottom"]).concat(a)),
                        (h = h.concat(["marginLeft", "marginRight"])),
                        r.find("*[width]").each(function () {
                            var i = t(this),
                                n = t.effects.scaledDimensions(i),
                                o = { height: n.height * s.from.y, width: n.width * s.from.x, outerHeight: n.outerHeight * s.from.y, outerWidth: n.outerWidth * s.from.x },
                                r = { height: n.height * s.to.y, width: n.width * s.to.x, outerHeight: n.height * s.to.y, outerWidth: n.width * s.to.x };
                            s.from.y !== s.to.y && ((o = t.effects.setTransition(i, l, s.from.y, o)), (r = t.effects.setTransition(i, l, s.to.y, r))),
                                s.from.x !== s.to.x && ((o = t.effects.setTransition(i, h, s.from.x, o)), (r = t.effects.setTransition(i, h, s.to.x, r))),
                                u && t.effects.saveStyle(i),
                                i.css(o),
                                i.animate(r, e.duration, e.easing, function () {
                                    u && t.effects.restoreStyle(i);
                                });
                        })),
                    r.animate(_, {
                        queue: !1,
                        duration: e.duration,
                        easing: e.easing,
                        complete: function () {
                            var e = r.offset();
                            0 === _.opacity && r.css("opacity", v.opacity), u || (r.css("position", "static" === f ? "relative" : f).offset(e), t.effects.saveStyle(r)), i();
                        },
                    });
            }),
            t.effects.define("scale", function (e, i) {
                var n = t(this),
                    s = e.mode,
                    o = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "effect" !== s ? 0 : 100),
                    r = t.extend(!0, { from: t.effects.scaledDimensions(n), to: t.effects.scaledDimensions(n, o, e.direction || "both"), origin: e.origin || ["middle", "center"] }, e);
                e.fade && ((r.from.opacity = 1), (r.to.opacity = 0)), t.effects.effect.size.call(this, r, i);
            }),
            t.effects.define("puff", "hide", function (e, i) {
                var n = t.extend(!0, {}, e, { fade: !0, percent: parseInt(e.percent, 10) || 150 });
                t.effects.effect.scale.call(this, n, i);
            }),
            t.effects.define("pulsate", "show", function (e, i) {
                var n = t(this),
                    s = e.mode,
                    o = "show" === s,
                    r = o || "hide" === s,
                    a = 2 * (e.times || 5) + (r ? 1 : 0),
                    l = e.duration / a,
                    h = 0,
                    c = 1,
                    u = n.queue().length;
                for ((!o && n.is(":visible")) || (n.css("opacity", 0).show(), (h = 1)); c < a; c++) n.animate({ opacity: h }, l, e.easing), (h = 1 - h);
                n.animate({ opacity: h }, l, e.easing), n.queue(i), t.effects.unshift(n, u, 1 + a);
            }),
            t.effects.define("shake", function (e, i) {
                var n = 1,
                    s = t(this),
                    o = e.direction || "left",
                    r = e.distance || 20,
                    a = e.times || 3,
                    l = 2 * a + 1,
                    h = Math.round(e.duration / l),
                    c = "up" === o || "down" === o ? "top" : "left",
                    u = "up" === o || "left" === o,
                    d = {},
                    p = {},
                    f = {},
                    g = s.queue().length;
                for (t.effects.createPlaceholder(s), d[c] = (u ? "-=" : "+=") + r, p[c] = (u ? "+=" : "-=") + 2 * r, f[c] = (u ? "-=" : "+=") + 2 * r, s.animate(d, h, e.easing); n < a; n++) s.animate(p, h, e.easing).animate(f, h, e.easing);
                s
                    .animate(p, h, e.easing)
                    .animate(d, h / 2, e.easing)
                    .queue(i),
                    t.effects.unshift(s, g, 1 + l);
            }),
            t.effects.define("slide", "show", function (e, i) {
                var n,
                    s,
                    o = t(this),
                    r = { up: ["bottom", "top"], down: ["top", "bottom"], left: ["right", "left"], right: ["left", "right"] },
                    a = e.mode,
                    l = e.direction || "left",
                    h = "up" === l || "down" === l ? "top" : "left",
                    c = "up" === l || "left" === l,
                    u = e.distance || o["top" == h ? "outerHeight" : "outerWidth"](!0),
                    d = {};
                t.effects.createPlaceholder(o),
                    (n = o.cssClip()),
                    (s = o.position()[h]),
                    (d[h] = (c ? -1 : 1) * u + s),
                    (d.clip = o.cssClip()),
                    (d.clip[r[l][1]] = d.clip[r[l][0]]),
                    "show" === a && (o.cssClip(d.clip), o.css(h, d[h]), (d.clip = n), (d[h] = s)),
                    o.animate(d, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
            }),
            !1 !== t.uiBackCompat &&
                t.effects.define("transfer", function (e, i) {
                    t(this).transfer(e, i);
                }),
            (t.ui.focusable = function (e, i) {
                var n,
                    s,
                    o,
                    r,
                    a,
                    l = e.nodeName.toLowerCase();
                return "area" === l
                    ? ((s = (n = e.parentNode).name), !(!e.href || !s || "map" !== n.nodeName.toLowerCase()) && 0 < (o = t("img[usemap='#" + s + "']")).length && o.is(":visible"))
                    : (/^(input|select|textarea|button|object)$/.test(l) ? (r = !e.disabled) && (a = t(e).closest("fieldset")[0]) && (r = !a.disabled) : (r = ("a" === l && e.href) || i),
                      r &&
                          t(e).is(":visible") &&
                          (function (t) {
                              for (var e = t.css("visibility"); "inherit" === e; ) e = (t = t.parent()).css("visibility");
                              return "hidden" !== e;
                          })(t(e)));
            }),
            t.extend(t.expr[":"], {
                focusable: function (e) {
                    return t.ui.focusable(e, null != t.attr(e, "tabindex"));
                },
            }),
            t.ui.focusable,
            (t.fn.form = function () {
                return "string" == typeof this[0].form ? this.closest("form") : t(this[0].form);
            }),
            (t.ui.formResetMixin = {
                _formResetHandler: function () {
                    var e = t(this);
                    setTimeout(function () {
                        var i = e.data("ui-form-reset-instances");
                        t.each(i, function () {
                            this.refresh();
                        });
                    });
                },
                _bindFormResetHandler: function () {
                    if (((this.form = this.element.form()), this.form.length)) {
                        var t = this.form.data("ui-form-reset-instances") || [];
                        t.length || this.form.on("reset.ui-form-reset", this._formResetHandler), t.push(this), this.form.data("ui-form-reset-instances", t);
                    }
                },
                _unbindFormResetHandler: function () {
                    if (this.form.length) {
                        var e = this.form.data("ui-form-reset-instances");
                        e.splice(t.inArray(this, e), 1), e.length ? this.form.data("ui-form-reset-instances", e) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset");
                    }
                },
            }),
            "1.7" === t.fn.jquery.substring(0, 3) &&
                (t.each(["Width", "Height"], function (e, i) {
                    function n(e, i, n, o) {
                        return (
                            t.each(s, function () {
                                (i -= parseFloat(t.css(e, "padding" + this)) || 0), n && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), o && (i -= parseFloat(t.css(e, "margin" + this)) || 0);
                            }),
                            i
                        );
                    }
                    var s = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
                        o = i.toLowerCase(),
                        r = { innerWidth: t.fn.innerWidth, innerHeight: t.fn.innerHeight, outerWidth: t.fn.outerWidth, outerHeight: t.fn.outerHeight };
                    (t.fn["inner" + i] = function (e) {
                        return void 0 === e
                            ? r["inner" + i].call(this)
                            : this.each(function () {
                                  t(this).css(o, n(this, e) + "px");
                              });
                    }),
                        (t.fn["outer" + i] = function (e, s) {
                            return "number" != typeof e
                                ? r["outer" + i].call(this, e)
                                : this.each(function () {
                                      t(this).css(o, n(this, e, !0, s) + "px");
                                  });
                        });
                }),
                (t.fn.addBack = function (t) {
                    return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
                })),
            (t.ui.keyCode = { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 }),
            (t.ui.escapeSelector =
                ((q = /([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g),
                function (t) {
                    return t.replace(q, "\\$1");
                })),
            (t.fn.labels = function () {
                var e, i, n, s, o;
                return this[0].labels && this[0].labels.length
                    ? this.pushStack(this[0].labels)
                    : ((s = this.eq(0).parents("label")),
                      (n = this.attr("id")) && ((o = (e = this.eq(0).parents().last()).add(e.length ? e.siblings() : this.siblings())), (i = "label[for='" + t.ui.escapeSelector(n) + "']"), (s = s.add(o.find(i).addBack(i)))),
                      this.pushStack(s));
            }),
            (t.fn.scrollParent = function (e) {
                var i = this.css("position"),
                    n = "absolute" === i,
                    s = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                    o = this.parents()
                        .filter(function () {
                            var e = t(this);
                            return (!n || "static" !== e.css("position")) && s.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"));
                        })
                        .eq(0);
                return "fixed" !== i && o.length ? o : t(this[0].ownerDocument || document);
            }),
            t.extend(t.expr[":"], {
                tabbable: function (e) {
                    var i = t.attr(e, "tabindex"),
                        n = null != i;
                    return (!n || 0 <= i) && t.ui.focusable(e, n);
                },
            }),
            t.fn.extend({
                uniqueId:
                    ((z = 0),
                    function () {
                        return this.each(function () {
                            this.id || (this.id = "ui-id-" + ++z);
                        });
                    }),
                removeUniqueId: function () {
                    return this.each(function () {
                        /^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id");
                    });
                },
            }),
            t.widget("ui.accordion", {
                version: "1.12.1",
                options: {
                    active: 0,
                    animate: {},
                    classes: { "ui-accordion-header": "ui-corner-top", "ui-accordion-header-collapsed": "ui-corner-all", "ui-accordion-content": "ui-corner-bottom" },
                    collapsible: !1,
                    event: "click",
                    header: "> li > :first-child, > :not(li):even",
                    heightStyle: "auto",
                    icons: { activeHeader: "ui-icon-triangle-1-s", header: "ui-icon-triangle-1-e" },
                    activate: null,
                    beforeActivate: null,
                },
                hideProps: { borderTopWidth: "hide", borderBottomWidth: "hide", paddingTop: "hide", paddingBottom: "hide", height: "hide" },
                showProps: { borderTopWidth: "show", borderBottomWidth: "show", paddingTop: "show", paddingBottom: "show", height: "show" },
                _create: function () {
                    var e = this.options;
                    (this.prevShow = this.prevHide = t()),
                        this._addClass("ui-accordion", "ui-widget ui-helper-reset"),
                        this.element.attr("role", "tablist"),
                        e.collapsible || (!1 !== e.active && null != e.active) || (e.active = 0),
                        this._processPanels(),
                        e.active < 0 && (e.active += this.headers.length),
                        this._refresh();
                },
                _getCreateEventData: function () {
                    return { header: this.active, panel: this.active.length ? this.active.next() : t() };
                },
                _createIcons: function () {
                    var e,
                        i,
                        n = this.options.icons;
                    n &&
                        ((e = t("<span>")),
                        this._addClass(e, "ui-accordion-header-icon", "ui-icon " + n.header),
                        e.prependTo(this.headers),
                        (i = this.active.children(".ui-accordion-header-icon")),
                        this._removeClass(i, n.header)._addClass(i, null, n.activeHeader)._addClass(this.headers, "ui-accordion-icons"));
                },
                _destroyIcons: function () {
                    this._removeClass(this.headers, "ui-accordion-icons"), this.headers.children(".ui-accordion-header-icon").remove();
                },
                _destroy: function () {
                    var t;
                    this.element.removeAttr("role"),
                        this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(),
                        this._destroyIcons(),
                        (t = this.headers.next().css("display", "").removeAttr("role aria-hidden aria-labelledby").removeUniqueId()),
                        "content" !== this.options.heightStyle && t.css("height", "");
                },
                _setOption: function (t, e) {
                    return "active" === t
                        ? void this._activate(e)
                        : ("event" === t && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e)),
                          this._super(t, e),
                          "collapsible" !== t || e || !1 !== this.options.active || this._activate(0),
                          void ("icons" === t && (this._destroyIcons(), e && this._createIcons())));
                },
                _setOptionDisabled: function (t) {
                    this._super(t), this.element.attr("aria-disabled", t), this._toggleClass(null, "ui-state-disabled", !!t), this._toggleClass(this.headers.add(this.headers.next()), null, "ui-state-disabled", !!t);
                },
                _keydown: function (e) {
                    if (!e.altKey && !e.ctrlKey) {
                        var i = t.ui.keyCode,
                            n = this.headers.length,
                            s = this.headers.index(e.target),
                            o = !1;
                        switch (e.keyCode) {
                            case i.RIGHT:
                            case i.DOWN:
                                o = this.headers[(s + 1) % n];
                                break;
                            case i.LEFT:
                            case i.UP:
                                o = this.headers[(s - 1 + n) % n];
                                break;
                            case i.SPACE:
                            case i.ENTER:
                                this._eventHandler(e);
                                break;
                            case i.HOME:
                                o = this.headers[0];
                                break;
                            case i.END:
                                o = this.headers[n - 1];
                        }
                        o && (t(e.target).attr("tabIndex", -1), t(o).attr("tabIndex", 0), t(o).trigger("focus"), e.preventDefault());
                    }
                },
                _panelKeyDown: function (e) {
                    e.keyCode === t.ui.keyCode.UP && e.ctrlKey && t(e.currentTarget).prev().trigger("focus");
                },
                refresh: function () {
                    var e = this.options;
                    this._processPanels(),
                        (!1 === e.active && !0 === e.collapsible) || !this.headers.length
                            ? ((e.active = !1), (this.active = t()))
                            : !1 === e.active
                            ? this._activate(0)
                            : this.active.length && !t.contains(this.element[0], this.active[0])
                            ? this.headers.length === this.headers.find(".ui-state-disabled").length
                                ? ((e.active = !1), (this.active = t()))
                                : this._activate(Math.max(0, e.active - 1))
                            : (e.active = this.headers.index(this.active)),
                        this._destroyIcons(),
                        this._refresh();
                },
                _processPanels: function () {
                    var t = this.headers,
                        e = this.panels;
                    (this.headers = this.element.find(this.options.header)),
                        this._addClass(this.headers, "ui-accordion-header ui-accordion-header-collapsed", "ui-state-default"),
                        (this.panels = this.headers.next().filter(":not(.ui-accordion-content-active)").hide()),
                        this._addClass(this.panels, "ui-accordion-content", "ui-helper-reset ui-widget-content"),
                        e && (this._off(t.not(this.headers)), this._off(e.not(this.panels)));
                },
                _refresh: function () {
                    var e,
                        i = this.options,
                        n = i.heightStyle,
                        s = this.element.parent();
                    (this.active = this._findActive(i.active)),
                        this._addClass(this.active, "ui-accordion-header-active", "ui-state-active")._removeClass(this.active, "ui-accordion-header-collapsed"),
                        this._addClass(this.active.next(), "ui-accordion-content-active"),
                        this.active.next().show(),
                        this.headers
                            .attr("role", "tab")
                            .each(function () {
                                var e = t(this),
                                    i = e.uniqueId().attr("id"),
                                    n = e.next(),
                                    s = n.uniqueId().attr("id");
                                e.attr("aria-controls", s), n.attr("aria-labelledby", i);
                            })
                            .next()
                            .attr("role", "tabpanel"),
                        this.headers.not(this.active).attr({ "aria-selected": "false", "aria-expanded": "false", tabIndex: -1 }).next().attr({ "aria-hidden": "true" }).hide(),
                        this.active.length ? this.active.attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 }).next().attr({ "aria-hidden": "false" }) : this.headers.eq(0).attr("tabIndex", 0),
                        this._createIcons(),
                        this._setupEvents(i.event),
                        "fill" === n
                            ? ((e = s.height()),
                              this.element.siblings(":visible").each(function () {
                                  var i = t(this),
                                      n = i.css("position");
                                  "absolute" !== n && "fixed" !== n && (e -= i.outerHeight(!0));
                              }),
                              this.headers.each(function () {
                                  e -= t(this).outerHeight(!0);
                              }),
                              this.headers
                                  .next()
                                  .each(function () {
                                      t(this).height(Math.max(0, e - t(this).innerHeight() + t(this).height()));
                                  })
                                  .css("overflow", "auto"))
                            : "auto" === n &&
                              ((e = 0),
                              this.headers
                                  .next()
                                  .each(function () {
                                      var i = t(this).is(":visible");
                                      i || t(this).show(), (e = Math.max(e, t(this).css("height", "").height())), i || t(this).hide();
                                  })
                                  .height(e));
                },
                _activate: function (e) {
                    var i = this._findActive(e)[0];
                    i !== this.active[0] && ((i = i || this.active[0]), this._eventHandler({ target: i, currentTarget: i, preventDefault: t.noop }));
                },
                _findActive: function (e) {
                    return "number" == typeof e ? this.headers.eq(e) : t();
                },
                _setupEvents: function (e) {
                    var i = { keydown: "_keydown" };
                    e &&
                        t.each(e.split(" "), function (t, e) {
                            i[e] = "_eventHandler";
                        }),
                        this._off(this.headers.add(this.headers.next())),
                        this._on(this.headers, i),
                        this._on(this.headers.next(), { keydown: "_panelKeyDown" }),
                        this._hoverable(this.headers),
                        this._focusable(this.headers);
                },
                _eventHandler: function (e) {
                    var i,
                        n,
                        s = this.options,
                        o = this.active,
                        r = t(e.currentTarget),
                        a = r[0] === o[0],
                        l = a && s.collapsible,
                        h = l ? t() : r.next(),
                        c = o.next(),
                        u = { oldHeader: o, oldPanel: c, newHeader: l ? t() : r, newPanel: h };
                    e.preventDefault(),
                        (a && !s.collapsible) ||
                            !1 === this._trigger("beforeActivate", e, u) ||
                            ((s.active = !l && this.headers.index(r)),
                            (this.active = a ? t() : r),
                            this._toggle(u),
                            this._removeClass(o, "ui-accordion-header-active", "ui-state-active"),
                            s.icons && ((i = o.children(".ui-accordion-header-icon")), this._removeClass(i, null, s.icons.activeHeader)._addClass(i, null, s.icons.header)),
                            a ||
                                (this._removeClass(r, "ui-accordion-header-collapsed")._addClass(r, "ui-accordion-header-active", "ui-state-active"),
                                s.icons && ((n = r.children(".ui-accordion-header-icon")), this._removeClass(n, null, s.icons.header)._addClass(n, null, s.icons.activeHeader)),
                                this._addClass(r.next(), "ui-accordion-content-active")));
                },
                _toggle: function (e) {
                    var i = e.newPanel,
                        n = this.prevShow.length ? this.prevShow : e.oldPanel;
                    this.prevShow.add(this.prevHide).stop(!0, !0),
                        (this.prevShow = i),
                        (this.prevHide = n),
                        this.options.animate ? this._animate(i, n, e) : (n.hide(), i.show(), this._toggleComplete(e)),
                        n.attr({ "aria-hidden": "true" }),
                        n.prev().attr({ "aria-selected": "false", "aria-expanded": "false" }),
                        i.length && n.length
                            ? n.prev().attr({ tabIndex: -1, "aria-expanded": "false" })
                            : i.length &&
                              this.headers
                                  .filter(function () {
                                      return 0 === parseInt(t(this).attr("tabIndex"), 10);
                                  })
                                  .attr("tabIndex", -1),
                        i.attr("aria-hidden", "false").prev().attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 });
                },
                _animate: function (t, e, i) {
                    function n() {
                        a._toggleComplete(i);
                    }
                    var s,
                        o,
                        r,
                        a = this,
                        l = 0,
                        h = t.css("box-sizing"),
                        c = t.length && (!e.length || t.index() < e.index()),
                        u = this.options.animate || {},
                        d = (c && u.down) || u;
                    return (
                        "number" == typeof d && (r = d),
                        "string" == typeof d && (o = d),
                        (o = o || d.easing || u.easing),
                        (r = r || d.duration || u.duration),
                        e.length
                            ? t.length
                                ? ((s = t.show().outerHeight()),
                                  e.animate(this.hideProps, {
                                      duration: r,
                                      easing: o,
                                      step: function (t, e) {
                                          e.now = Math.round(t);
                                      },
                                  }),
                                  void t.hide().animate(this.showProps, {
                                      duration: r,
                                      easing: o,
                                      complete: n,
                                      step: function (t, i) {
                                          (i.now = Math.round(t)), "height" !== i.prop ? "content-box" === h && (l += i.now) : "content" !== a.options.heightStyle && ((i.now = Math.round(s - e.outerHeight() - l)), (l = 0));
                                      },
                                  }))
                                : e.animate(this.hideProps, r, o, n)
                            : t.animate(this.showProps, r, o, n)
                    );
                },
                _toggleComplete: function (t) {
                    var e = t.oldPanel,
                        i = e.prev();
                    this._removeClass(e, "ui-accordion-content-active"),
                        this._removeClass(i, "ui-accordion-header-active")._addClass(i, "ui-accordion-header-collapsed"),
                        e.length && (e.parent()[0].className = e.parent()[0].className),
                        this._trigger("activate", null, t);
                },
            }),
            (t.ui.safeActiveElement = function (t) {
                var e;
                try {
                    e = t.activeElement;
                } catch (i) {
                    e = t.body;
                }
                return (e = e || t.body).nodeName || (e = t.body), e;
            }),
            t.widget("ui.menu", {
                version: "1.12.1",
                defaultElement: "<ul>",
                delay: 300,
                options: { icons: { submenu: "ui-icon-caret-1-e" }, items: "> *", menus: "ul", position: { my: "left top", at: "right top" }, role: "menu", blur: null, focus: null, select: null },
                _create: function () {
                    (this.activeMenu = this.element),
                        (this.mouseHandled = !1),
                        this.element.uniqueId().attr({ role: this.options.role, tabIndex: 0 }),
                        this._addClass("ui-menu", "ui-widget ui-widget-content"),
                        this._on({
                            "mousedown .ui-menu-item": function (t) {
                                t.preventDefault();
                            },
                            "click .ui-menu-item": function (e) {
                                var i = t(e.target),
                                    n = t(t.ui.safeActiveElement(this.document[0]));
                                !this.mouseHandled &&
                                    i.not(".ui-state-disabled").length &&
                                    (this.select(e),
                                    e.isPropagationStopped() || (this.mouseHandled = !0),
                                    i.has(".ui-menu").length
                                        ? this.expand(e)
                                        : !this.element.is(":focus") && n.closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)));
                            },
                            "mouseenter .ui-menu-item": function (e) {
                                if (!this.previousFilter) {
                                    var i = t(e.target).closest(".ui-menu-item"),
                                        n = t(e.currentTarget);
                                    i[0] === n[0] && (this._removeClass(n.siblings().children(".ui-state-active"), null, "ui-state-active"), this.focus(e, n));
                                }
                            },
                            mouseleave: "collapseAll",
                            "mouseleave .ui-menu": "collapseAll",
                            focus: function (t, e) {
                                var i = this.active || this.element.find(this.options.items).eq(0);
                                e || this.focus(t, i);
                            },
                            blur: function (e) {
                                this._delay(function () {
                                    t.contains(this.element[0], t.ui.safeActiveElement(this.document[0])) || this.collapseAll(e);
                                });
                            },
                            keydown: "_keydown",
                        }),
                        this.refresh(),
                        this._on(this.document, {
                            click: function (t) {
                                this._closeOnDocumentClick(t) && this.collapseAll(t), (this.mouseHandled = !1);
                            },
                        });
                },
                _destroy: function () {
                    var e = this.element.find(".ui-menu-item").removeAttr("role aria-disabled").children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
                    this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),
                        e.children().each(function () {
                            var e = t(this);
                            e.data("ui-menu-submenu-caret") && e.remove();
                        });
                },
                _keydown: function (e) {
                    var i,
                        n,
                        s,
                        o,
                        r = !0;
                    switch (e.keyCode) {
                        case t.ui.keyCode.PAGE_UP:
                            this.previousPage(e);
                            break;
                        case t.ui.keyCode.PAGE_DOWN:
                            this.nextPage(e);
                            break;
                        case t.ui.keyCode.HOME:
                            this._move("first", "first", e);
                            break;
                        case t.ui.keyCode.END:
                            this._move("last", "last", e);
                            break;
                        case t.ui.keyCode.UP:
                            this.previous(e);
                            break;
                        case t.ui.keyCode.DOWN:
                            this.next(e);
                            break;
                        case t.ui.keyCode.LEFT:
                            this.collapse(e);
                            break;
                        case t.ui.keyCode.RIGHT:
                            this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
                            break;
                        case t.ui.keyCode.ENTER:
                        case t.ui.keyCode.SPACE:
                            this._activate(e);
                            break;
                        case t.ui.keyCode.ESCAPE:
                            this.collapse(e);
                            break;
                        default:
                            (r = !1),
                                (n = this.previousFilter || ""),
                                (o = !1),
                                (s = 96 <= e.keyCode && e.keyCode <= 105 ? "" + (e.keyCode - 96) : String.fromCharCode(e.keyCode)),
                                clearTimeout(this.filterTimer),
                                s === n ? (o = !0) : (s = n + s),
                                (i = this._filterMenuItems(s)),
                                (i = o && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i).length || ((s = String.fromCharCode(e.keyCode)), (i = this._filterMenuItems(s))),
                                i.length
                                    ? (this.focus(e, i),
                                      (this.previousFilter = s),
                                      (this.filterTimer = this._delay(function () {
                                          delete this.previousFilter;
                                      }, 1e3)))
                                    : delete this.previousFilter;
                    }
                    r && e.preventDefault();
                },
                _activate: function (t) {
                    this.active && !this.active.is(".ui-state-disabled") && (this.active.children("[aria-haspopup='true']").length ? this.expand(t) : this.select(t));
                },
                refresh: function () {
                    var e,
                        i,
                        n,
                        s,
                        o = this,
                        r = this.options.icons.submenu,
                        a = this.element.find(this.options.menus);
                    this._toggleClass("ui-menu-icons", null, !!this.element.find(".ui-icon").length),
                        (i = a
                            .filter(":not(.ui-menu)")
                            .hide()
                            .attr({ role: this.options.role, "aria-hidden": "true", "aria-expanded": "false" })
                            .each(function () {
                                var e = t(this),
                                    i = e.prev(),
                                    n = t("<span>").data("ui-menu-submenu-caret", !0);
                                o._addClass(n, "ui-menu-icon", "ui-icon " + r), i.attr("aria-haspopup", "true").prepend(n), e.attr("aria-labelledby", i.attr("id"));
                            })),
                        this._addClass(i, "ui-menu", "ui-widget ui-widget-content ui-front"),
                        (e = a.add(this.element).find(this.options.items)).not(".ui-menu-item").each(function () {
                            var e = t(this);
                            o._isDivider(e) && o._addClass(e, "ui-menu-divider", "ui-widget-content");
                        }),
                        (s = (n = e.not(".ui-menu-item, .ui-menu-divider")).children().not(".ui-menu").uniqueId().attr({ tabIndex: -1, role: this._itemRole() })),
                        this._addClass(n, "ui-menu-item")._addClass(s, "ui-menu-item-wrapper"),
                        e.filter(".ui-state-disabled").attr("aria-disabled", "true"),
                        this.active && !t.contains(this.element[0], this.active[0]) && this.blur();
                },
                _itemRole: function () {
                    return { menu: "menuitem", listbox: "option" }[this.options.role];
                },
                _setOption: function (t, e) {
                    if ("icons" === t) {
                        var i = this.element.find(".ui-menu-icon");
                        this._removeClass(i, null, this.options.icons.submenu)._addClass(i, null, e.submenu);
                    }
                    this._super(t, e);
                },
                _setOptionDisabled: function (t) {
                    this._super(t), this.element.attr("aria-disabled", t + ""), this._toggleClass(null, "ui-state-disabled", !!t);
                },
                focus: function (t, e) {
                    var i, n, s;
                    this.blur(t, t && "focus" === t.type),
                        this._scrollIntoView(e),
                        (this.active = e.first()),
                        (n = this.active.children(".ui-menu-item-wrapper")),
                        this._addClass(n, null, "ui-state-active"),
                        this.options.role && this.element.attr("aria-activedescendant", n.attr("id")),
                        (s = this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper")),
                        this._addClass(s, null, "ui-state-active"),
                        t && "keydown" === t.type
                            ? this._close()
                            : (this.timer = this._delay(function () {
                                  this._close();
                              }, this.delay)),
                        (i = e.children(".ui-menu")).length && t && /^mouse/.test(t.type) && this._startOpening(i),
                        (this.activeMenu = e.parent()),
                        this._trigger("focus", t, { item: e });
                },
                _scrollIntoView: function (e) {
                    var i, n, s, o, r, a;
                    this._hasScroll() &&
                        ((i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0),
                        (n = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0),
                        (s = e.offset().top - this.activeMenu.offset().top - i - n),
                        (o = this.activeMenu.scrollTop()),
                        (r = this.activeMenu.height()),
                        (a = e.outerHeight()),
                        s < 0 ? this.activeMenu.scrollTop(o + s) : r < s + a && this.activeMenu.scrollTop(o + s - r + a));
                },
                blur: function (t, e) {
                    e || clearTimeout(this.timer), this.active && (this._removeClass(this.active.children(".ui-menu-item-wrapper"), null, "ui-state-active"), this._trigger("blur", t, { item: this.active }), (this.active = null));
                },
                _startOpening: function (t) {
                    clearTimeout(this.timer),
                        "true" === t.attr("aria-hidden") &&
                            (this.timer = this._delay(function () {
                                this._close(), this._open(t);
                            }, this.delay));
                },
                _open: function (e) {
                    var i = t.extend({ of: this.active }, this.options.position);
                    clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i);
                },
                collapseAll: function (e, i) {
                    clearTimeout(this.timer),
                        (this.timer = this._delay(function () {
                            var n = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
                            n.length || (n = this.element), this._close(n), this.blur(e), this._removeClass(n.find(".ui-state-active"), null, "ui-state-active"), (this.activeMenu = n);
                        }, this.delay));
                },
                _close: function (t) {
                    (t = t || (this.active ? this.active.parent() : this.element)).find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false");
                },
                _closeOnDocumentClick: function (e) {
                    return !t(e.target).closest(".ui-menu").length;
                },
                _isDivider: function (t) {
                    return !/[^\-\u2014\u2013\s]/.test(t.text());
                },
                collapse: function (t) {
                    var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                    e && e.length && (this._close(), this.focus(t, e));
                },
                expand: function (t) {
                    var e = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
                    e &&
                        e.length &&
                        (this._open(e.parent()),
                        this._delay(function () {
                            this.focus(t, e);
                        }));
                },
                next: function (t) {
                    this._move("next", "first", t);
                },
                previous: function (t) {
                    this._move("prev", "last", t);
                },
                isFirstItem: function () {
                    return this.active && !this.active.prevAll(".ui-menu-item").length;
                },
                isLastItem: function () {
                    return this.active && !this.active.nextAll(".ui-menu-item").length;
                },
                _move: function (t, e, i) {
                    var n;
                    this.active && (n = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)),
                        (n && n.length && this.active) || (n = this.activeMenu.find(this.options.items)[e]()),
                        this.focus(i, n);
                },
                nextPage: function (e) {
                    var i, n, s;
                    return this.active
                        ? void (
                              this.isLastItem() ||
                              (this._hasScroll()
                                  ? ((n = this.active.offset().top),
                                    (s = this.element.height()),
                                    this.active.nextAll(".ui-menu-item").each(function () {
                                        return (i = t(this)).offset().top - n - s < 0;
                                    }),
                                    this.focus(e, i))
                                  : this.focus(e, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))
                          )
                        : void this.next(e);
                },
                previousPage: function (e) {
                    var i, n, s;
                    return this.active
                        ? void (
                              this.isFirstItem() ||
                              (this._hasScroll()
                                  ? ((n = this.active.offset().top),
                                    (s = this.element.height()),
                                    this.active.prevAll(".ui-menu-item").each(function () {
                                        return 0 < (i = t(this)).offset().top - n + s;
                                    }),
                                    this.focus(e, i))
                                  : this.focus(e, this.activeMenu.find(this.options.items).first()))
                          )
                        : void this.next(e);
                },
                _hasScroll: function () {
                    return this.element.outerHeight() < this.element.prop("scrollHeight");
                },
                select: function (e) {
                    this.active = this.active || t(e.target).closest(".ui-menu-item");
                    var i = { item: this.active };
                    this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i);
                },
                _filterMenuItems: function (e) {
                    var i = e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                        n = RegExp("^" + i, "i");
                    return this.activeMenu
                        .find(this.options.items)
                        .filter(".ui-menu-item")
                        .filter(function () {
                            return n.test(t.trim(t(this).children(".ui-menu-item-wrapper").text()));
                        });
                },
            }),
            t.widget("ui.autocomplete", {
                version: "1.12.1",
                defaultElement: "<input>",
                options: {
                    appendTo: null,
                    autoFocus: !1,
                    delay: 300,
                    minLength: 1,
                    position: { my: "left top", at: "left bottom", collision: "none" },
                    source: null,
                    change: null,
                    close: null,
                    focus: null,
                    open: null,
                    response: null,
                    search: null,
                    select: null,
                },
                requestIndex: 0,
                pending: 0,
                _create: function () {
                    var e,
                        i,
                        n,
                        s = this.element[0].nodeName.toLowerCase(),
                        o = "textarea" === s,
                        r = "input" === s;
                    (this.isMultiLine = o || (!r && this._isContentEditable(this.element))),
                        (this.valueMethod = this.element[o || r ? "val" : "text"]),
                        (this.isNewMenu = !0),
                        this._addClass("ui-autocomplete-input"),
                        this.element.attr("autocomplete", "off"),
                        this._on(this.element, {
                            keydown: function (s) {
                                if (this.element.prop("readOnly")) i = n = e = !0;
                                else {
                                    i = n = e = !1;
                                    var o = t.ui.keyCode;
                                    switch (s.keyCode) {
                                        case o.PAGE_UP:
                                            (e = !0), this._move("previousPage", s);
                                            break;
                                        case o.PAGE_DOWN:
                                            (e = !0), this._move("nextPage", s);
                                            break;
                                        case o.UP:
                                            (e = !0), this._keyEvent("previous", s);
                                            break;
                                        case o.DOWN:
                                            (e = !0), this._keyEvent("next", s);
                                            break;
                                        case o.ENTER:
                                            this.menu.active && ((e = !0), s.preventDefault(), this.menu.select(s));
                                            break;
                                        case o.TAB:
                                            this.menu.active && this.menu.select(s);
                                            break;
                                        case o.ESCAPE:
                                            this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(s), s.preventDefault());
                                            break;
                                        default:
                                            (i = !0), this._searchTimeout(s);
                                    }
                                }
                            },
                            keypress: function (n) {
                                if (e) return (e = !1), void ((this.isMultiLine && !this.menu.element.is(":visible")) || n.preventDefault());
                                if (!i) {
                                    var s = t.ui.keyCode;
                                    switch (n.keyCode) {
                                        case s.PAGE_UP:
                                            this._move("previousPage", n);
                                            break;
                                        case s.PAGE_DOWN:
                                            this._move("nextPage", n);
                                            break;
                                        case s.UP:
                                            this._keyEvent("previous", n);
                                            break;
                                        case s.DOWN:
                                            this._keyEvent("next", n);
                                    }
                                }
                            },
                            input: function (t) {
                                return n ? ((n = !1), void t.preventDefault()) : void this._searchTimeout(t);
                            },
                            focus: function () {
                                (this.selectedItem = null), (this.previous = this._value());
                            },
                            blur: function (t) {
                                return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(t), void this._change(t));
                            },
                        }),
                        this._initSource(),
                        (this.menu = t("<ul>").appendTo(this._appendTo()).menu({ role: null }).hide().menu("instance")),
                        this._addClass(this.menu.element, "ui-autocomplete", "ui-front"),
                        this._on(this.menu.element, {
                            mousedown: function (e) {
                                e.preventDefault(),
                                    (this.cancelBlur = !0),
                                    this._delay(function () {
                                        delete this.cancelBlur, this.element[0] !== t.ui.safeActiveElement(this.document[0]) && this.element.trigger("focus");
                                    });
                            },
                            menufocus: function (e, i) {
                                var n, s;
                                return this.isNewMenu && ((this.isNewMenu = !1), e.originalEvent && /^mouse/.test(e.originalEvent.type))
                                    ? (this.menu.blur(),
                                      void this.document.one("mousemove", function () {
                                          t(e.target).trigger(e.originalEvent);
                                      }))
                                    : ((s = i.item.data("ui-autocomplete-item")),
                                      !1 !== this._trigger("focus", e, { item: s }) && e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(s.value),
                                      void ((n = i.item.attr("aria-label") || s.value) && t.trim(n).length && (this.liveRegion.children().hide(), t("<div>").text(n).appendTo(this.liveRegion))));
                            },
                            menuselect: function (e, i) {
                                var n = i.item.data("ui-autocomplete-item"),
                                    s = this.previous;
                                this.element[0] !== t.ui.safeActiveElement(this.document[0]) &&
                                    (this.element.trigger("focus"),
                                    (this.previous = s),
                                    this._delay(function () {
                                        (this.previous = s), (this.selectedItem = n);
                                    })),
                                    !1 !== this._trigger("select", e, { item: n }) && this._value(n.value),
                                    (this.term = this._value()),
                                    this.close(e),
                                    (this.selectedItem = n);
                            },
                        }),
                        (this.liveRegion = t("<div>", { role: "status", "aria-live": "assertive", "aria-relevant": "additions" }).appendTo(this.document[0].body)),
                        this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"),
                        this._on(this.window, {
                            beforeunload: function () {
                                this.element.removeAttr("autocomplete");
                            },
                        });
                },
                _destroy: function () {
                    clearTimeout(this.searching), this.element.removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove();
                },
                _setOption: function (t, e) {
                    this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort();
                },
                _isEventTargetInWidget: function (e) {
                    var i = this.menu.element[0];
                    return e.target === this.element[0] || e.target === i || t.contains(i, e.target);
                },
                _closeOnClickOutside: function (t) {
                    this._isEventTargetInWidget(t) || this.close();
                },
                _appendTo: function () {
                    var e = this.options.appendTo;
                    return ((e = e && (e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0))) && e[0]) || (e = this.element.closest(".ui-front, dialog")), e.length || (e = this.document[0].body), e;
                },
                _initSource: function () {
                    var e,
                        i,
                        n = this;
                    t.isArray(this.options.source)
                        ? ((e = this.options.source),
                          (this.source = function (i, n) {
                              n(t.ui.autocomplete.filter(e, i.term));
                          }))
                        : "string" == typeof this.options.source
                        ? ((i = this.options.source),
                          (this.source = function (e, s) {
                              n.xhr && n.xhr.abort(),
                                  (n.xhr = t.ajax({
                                      url: i,
                                      data: e,
                                      dataType: "json",
                                      success: function (t) {
                                          s(t);
                                      },
                                      error: function () {
                                          s([]);
                                      },
                                  }));
                          }))
                        : (this.source = this.options.source);
                },
                _searchTimeout: function (t) {
                    clearTimeout(this.searching),
                        (this.searching = this._delay(function () {
                            var e = this.term === this._value(),
                                i = this.menu.element.is(":visible"),
                                n = t.altKey || t.ctrlKey || t.metaKey || t.shiftKey;
                            (e && (!e || i || n)) || ((this.selectedItem = null), this.search(null, t));
                        }, this.options.delay));
                },
                search: function (t, e) {
                    return (t = null != t ? t : this._value()), (this.term = this._value()), t.length < this.options.minLength ? this.close(e) : !1 !== this._trigger("search", e) ? this._search(t) : void 0;
                },
                _search: function (t) {
                    this.pending++, this._addClass("ui-autocomplete-loading"), (this.cancelSearch = !1), this.source({ term: t }, this._response());
                },
                _response: function () {
                    var e = ++this.requestIndex;
                    return t.proxy(function (t) {
                        e === this.requestIndex && this.__response(t), this.pending--, this.pending || this._removeClass("ui-autocomplete-loading");
                    }, this);
                },
                __response: function (t) {
                    (t = t && this._normalize(t)), this._trigger("response", null, { content: t }), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close();
                },
                close: function (t) {
                    (this.cancelSearch = !0), this._close(t);
                },
                _close: function (t) {
                    this._off(this.document, "mousedown"), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), (this.isNewMenu = !0), this._trigger("close", t));
                },
                _change: function (t) {
                    this.previous !== this._value() && this._trigger("change", t, { item: this.selectedItem });
                },
                _normalize: function (e) {
                    return e.length && e[0].label && e[0].value
                        ? e
                        : t.map(e, function (e) {
                              return "string" == typeof e ? { label: e, value: e } : t.extend({}, e, { label: e.label || e.value, value: e.value || e.label });
                          });
                },
                _suggest: function (e) {
                    var i = this.menu.element.empty();
                    this._renderMenu(i, e),
                        (this.isNewMenu = !0),
                        this.menu.refresh(),
                        i.show(),
                        this._resizeMenu(),
                        i.position(t.extend({ of: this.element }, this.options.position)),
                        this.options.autoFocus && this.menu.next(),
                        this._on(this.document, { mousedown: "_closeOnClickOutside" });
                },
                _resizeMenu: function () {
                    var t = this.menu.element;
                    t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()));
                },
                _renderMenu: function (e, i) {
                    var n = this;
                    t.each(i, function (t, i) {
                        n._renderItemData(e, i);
                    });
                },
                _renderItemData: function (t, e) {
                    return this._renderItem(t, e).data("ui-autocomplete-item", e);
                },
                _renderItem: function (e, i) {
                    return t("<li>").append(t("<div>").text(i.label)).appendTo(e);
                },
                _move: function (t, e) {
                    return this.menu.element.is(":visible")
                        ? (this.menu.isFirstItem() && /^previous/.test(t)) || (this.menu.isLastItem() && /^next/.test(t))
                            ? (this.isMultiLine || this._value(this.term), void this.menu.blur())
                            : void this.menu[t](e)
                        : void this.search(null, e);
                },
                widget: function () {
                    return this.menu.element;
                },
                _value: function () {
                    return this.valueMethod.apply(this.element, arguments);
                },
                _keyEvent: function (t, e) {
                    (this.isMultiLine && !this.menu.element.is(":visible")) || (this._move(t, e), e.preventDefault());
                },
                _isContentEditable: function (t) {
                    if (!t.length) return !1;
                    var e = t.prop("contentEditable");
                    return "inherit" === e ? this._isContentEditable(t.parent()) : "true" === e;
                },
            }),
            t.extend(t.ui.autocomplete, {
                escapeRegex: function (t) {
                    return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
                },
                filter: function (e, i) {
                    var n = RegExp(t.ui.autocomplete.escapeRegex(i), "i");
                    return t.grep(e, function (t) {
                        return n.test(t.label || t.value || t);
                    });
                },
            }),
            t.widget("ui.autocomplete", t.ui.autocomplete, {
                options: {
                    messages: {
                        noResults: "No search results.",
                        results: function (t) {
                            return t + (1 < t ? " results are" : " result is") + " available, use up and down arrow keys to navigate.";
                        },
                    },
                },
                __response: function (e) {
                    var i;
                    this._superApply(arguments),
                        this.options.disabled ||
                            this.cancelSearch ||
                            ((i = e && e.length ? this.options.messages.results(e.length) : this.options.messages.noResults), this.liveRegion.children().hide(), t("<div>").text(i).appendTo(this.liveRegion));
                },
            }),
            t.ui.autocomplete;
        var et,
            it,
            nt = /ui-corner-([a-z]){2,6}/g;
        t.widget("ui.controlgroup", {
            version: "1.12.1",
            defaultElement: "<div>",
            options: {
                direction: "horizontal",
                disabled: null,
                onlyVisible: !0,
                items: {
                    button: "input[type=button], input[type=submit], input[type=reset], button, a",
                    controlgroupLabel: ".ui-controlgroup-label",
                    checkboxradio: "input[type='checkbox'], input[type='radio']",
                    selectmenu: "select",
                    spinner: ".ui-spinner-input",
                },
            },
            _create: function () {
                this._enhance();
            },
            _enhance: function () {
                this.element.attr("role", "toolbar"), this.refresh();
            },
            _destroy: function () {
                this._callChildMethod("destroy"),
                    this.childWidgets.removeData("ui-controlgroup-data"),
                    this.element.removeAttr("role"),
                    this.options.items.controlgroupLabel && this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap();
            },
            _initWidgets: function () {
                var e = this,
                    i = [];
                t.each(this.options.items, function (n, s) {
                    var o,
                        r = {};
                    return s
                        ? "controlgroupLabel" === n
                            ? ((o = e.element.find(s)).each(function () {
                                  var e = t(this);
                                  e.children(".ui-controlgroup-label-contents").length || e.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>");
                              }),
                              e._addClass(o, null, "ui-widget ui-widget-content ui-state-default"),
                              void (i = i.concat(o.get())))
                            : void (
                                  t.fn[n] &&
                                  ((r = e["_" + n + "Options"] ? e["_" + n + "Options"]("middle") : { classes: {} }),
                                  e.element.find(s).each(function () {
                                      var s = t(this),
                                          o = s[n]("instance"),
                                          a = t.widget.extend({}, r);
                                      if ("button" !== n || !s.parent(".ui-spinner").length) {
                                          (o = o || s[n]()[n]("instance")) && (a.classes = e._resolveClassesValues(a.classes, o)), s[n](a);
                                          var l = s[n]("widget");
                                          t.data(l[0], "ui-controlgroup-data", o || s[n]("instance")), i.push(l[0]);
                                      }
                                  }))
                              )
                        : void 0;
                }),
                    (this.childWidgets = t(t.unique(i))),
                    this._addClass(this.childWidgets, "ui-controlgroup-item");
            },
            _callChildMethod: function (e) {
                this.childWidgets.each(function () {
                    var i = t(this).data("ui-controlgroup-data");
                    i && i[e] && i[e]();
                });
            },
            _updateCornerClass: function (t, e) {
                var i = this._buildSimpleOptions(e, "label").classes.label;
                this._removeClass(t, null, "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all"), this._addClass(t, null, i);
            },
            _buildSimpleOptions: function (t, e) {
                var i = "vertical" === this.options.direction,
                    n = { classes: {} };
                return (n.classes[e] = { middle: "", first: "ui-corner-" + (i ? "top" : "left"), last: "ui-corner-" + (i ? "bottom" : "right"), only: "ui-corner-all" }[t]), n;
            },
            _spinnerOptions: function (t) {
                var e = this._buildSimpleOptions(t, "ui-spinner");
                return (e.classes["ui-spinner-up"] = ""), (e.classes["ui-spinner-down"] = ""), e;
            },
            _buttonOptions: function (t) {
                return this._buildSimpleOptions(t, "ui-button");
            },
            _checkboxradioOptions: function (t) {
                return this._buildSimpleOptions(t, "ui-checkboxradio-label");
            },
            _selectmenuOptions: function (t) {
                var e = "vertical" === this.options.direction;
                return {
                    width: e && "auto",
                    classes: {
                        middle: { "ui-selectmenu-button-open": "", "ui-selectmenu-button-closed": "" },
                        first: { "ui-selectmenu-button-open": "ui-corner-" + (e ? "top" : "tl"), "ui-selectmenu-button-closed": "ui-corner-" + (e ? "top" : "left") },
                        last: { "ui-selectmenu-button-open": e ? "" : "ui-corner-tr", "ui-selectmenu-button-closed": "ui-corner-" + (e ? "bottom" : "right") },
                        only: { "ui-selectmenu-button-open": "ui-corner-top", "ui-selectmenu-button-closed": "ui-corner-all" },
                    }[t],
                };
            },
            _resolveClassesValues: function (e, i) {
                var n = {};
                return (
                    t.each(e, function (s) {
                        var o = i.options.classes[s] || "";
                        (o = t.trim(o.replace(nt, ""))), (n[s] = (o + " " + e[s]).replace(/\s+/g, " "));
                    }),
                    n
                );
            },
            _setOption: function (t, e) {
                return "direction" === t && this._removeClass("ui-controlgroup-" + this.options.direction), this._super(t, e), "disabled" === t ? void this._callChildMethod(e ? "disable" : "enable") : void this.refresh();
            },
            refresh: function () {
                var e,
                    i = this;
                this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction),
                    "horizontal" === this.options.direction && this._addClass(null, "ui-helper-clearfix"),
                    this._initWidgets(),
                    (e = this.childWidgets),
                    this.options.onlyVisible && (e = e.filter(":visible")),
                    e.length &&
                        (t.each(["first", "last"], function (t, n) {
                            var s = e[n]().data("ui-controlgroup-data");
                            if (s && i["_" + s.widgetName + "Options"]) {
                                var o = i["_" + s.widgetName + "Options"](1 === e.length ? "only" : n);
                                (o.classes = i._resolveClassesValues(o.classes, s)), s.element[s.widgetName](o);
                            } else i._updateCornerClass(e[n](), n);
                        }),
                        this._callChildMethod("refresh"));
            },
        }),
            t.widget("ui.checkboxradio", [
                t.ui.formResetMixin,
                {
                    version: "1.12.1",
                    options: { disabled: null, label: null, icon: !0, classes: { "ui-checkboxradio-label": "ui-corner-all", "ui-checkboxradio-icon": "ui-corner-all" } },
                    _getCreateOptions: function () {
                        var e,
                            i,
                            n = this,
                            s = this._super() || {};
                        return (
                            this._readType(),
                            (i = this.element.labels()),
                            (this.label = t(i[i.length - 1])),
                            this.label.length || t.error("No label found for checkboxradio widget"),
                            (this.originalLabel = ""),
                            this.label
                                .contents()
                                .not(this.element[0])
                                .each(function () {
                                    n.originalLabel += 3 === this.nodeType ? t(this).text() : this.outerHTML;
                                }),
                            this.originalLabel && (s.label = this.originalLabel),
                            null != (e = this.element[0].disabled) && (s.disabled = e),
                            s
                        );
                    },
                    _create: function () {
                        var t = this.element[0].checked;
                        this._bindFormResetHandler(),
                            null == this.options.disabled && (this.options.disabled = this.element[0].disabled),
                            this._setOption("disabled", this.options.disabled),
                            this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"),
                            this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget"),
                            "radio" === this.type && this._addClass(this.label, "ui-checkboxradio-radio-label"),
                            this.options.label && this.options.label !== this.originalLabel ? this._updateLabel() : this.originalLabel && (this.options.label = this.originalLabel),
                            this._enhance(),
                            t && (this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active"), this.icon && this._addClass(this.icon, null, "ui-state-hover")),
                            this._on({
                                change: "_toggleClasses",
                                focus: function () {
                                    this._addClass(this.label, null, "ui-state-focus ui-visual-focus");
                                },
                                blur: function () {
                                    this._removeClass(this.label, null, "ui-state-focus ui-visual-focus");
                                },
                            });
                    },
                    _readType: function () {
                        var e = this.element[0].nodeName.toLowerCase();
                        (this.type = this.element[0].type), ("input" === e && /radio|checkbox/.test(this.type)) || t.error("Can't create checkboxradio on element.nodeName=" + e + " and element.type=" + this.type);
                    },
                    _enhance: function () {
                        this._updateIcon(this.element[0].checked);
                    },
                    widget: function () {
                        return this.label;
                    },
                    _getRadioGroup: function () {
                        var e = this.element[0].name,
                            i = "input[name='" + t.ui.escapeSelector(e) + "']";
                        return e
                            ? (this.form.length
                                  ? t(this.form[0].elements).filter(i)
                                  : t(i).filter(function () {
                                        return 0 === t(this).form().length;
                                    })
                              ).not(this.element)
                            : t([]);
                    },
                    _toggleClasses: function () {
                        var e = this.element[0].checked;
                        this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", e),
                            this.options.icon && "checkbox" === this.type && this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", e)._toggleClass(this.icon, null, "ui-icon-blank", !e),
                            "radio" === this.type &&
                                this._getRadioGroup().each(function () {
                                    var e = t(this).checkboxradio("instance");
                                    e && e._removeClass(e.label, "ui-checkboxradio-checked", "ui-state-active");
                                });
                    },
                    _destroy: function () {
                        this._unbindFormResetHandler(), this.icon && (this.icon.remove(), this.iconSpace.remove());
                    },
                    _setOption: function (t, e) {
                        return "label" !== t || e ? (this._super(t, e), "disabled" === t ? (this._toggleClass(this.label, null, "ui-state-disabled", e), void (this.element[0].disabled = e)) : void this.refresh()) : void 0;
                    },
                    _updateIcon: function (e) {
                        var i = "ui-icon ui-icon-background ";
                        this.options.icon
                            ? (this.icon || ((this.icon = t("<span>")), (this.iconSpace = t("<span> </span>")), this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")),
                              "checkbox" === this.type ? ((i += e ? "ui-icon-check ui-state-checked" : "ui-icon-blank"), this._removeClass(this.icon, null, e ? "ui-icon-blank" : "ui-icon-check")) : (i += "ui-icon-blank"),
                              this._addClass(this.icon, "ui-checkboxradio-icon", i),
                              e || this._removeClass(this.icon, null, "ui-icon-check ui-state-checked"),
                              this.icon.prependTo(this.label).after(this.iconSpace))
                            : void 0 !== this.icon && (this.icon.remove(), this.iconSpace.remove(), delete this.icon);
                    },
                    _updateLabel: function () {
                        var t = this.label.contents().not(this.element[0]);
                        this.icon && (t = t.not(this.icon[0])), this.iconSpace && (t = t.not(this.iconSpace[0])), t.remove(), this.label.append(this.options.label);
                    },
                    refresh: function () {
                        var t = this.element[0].checked,
                            e = this.element[0].disabled;
                        this._updateIcon(t),
                            this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", t),
                            null !== this.options.label && this._updateLabel(),
                            e !== this.options.disabled && this._setOptions({ disabled: e });
                    },
                },
            ]),
            t.ui.checkboxradio,
            t.widget("ui.button", {
                version: "1.12.1",
                defaultElement: "<button>",
                options: { classes: { "ui-button": "ui-corner-all" }, disabled: null, icon: null, iconPosition: "beginning", label: null, showLabel: !0 },
                _getCreateOptions: function () {
                    var t,
                        e = this._super() || {};
                    return (
                        (this.isInput = this.element.is("input")),
                        null != (t = this.element[0].disabled) && (e.disabled = t),
                        (this.originalLabel = this.isInput ? this.element.val() : this.element.html()),
                        this.originalLabel && (e.label = this.originalLabel),
                        e
                    );
                },
                _create: function () {
                    !this.option.showLabel & !this.options.icon && (this.options.showLabel = !0),
                        null == this.options.disabled && (this.options.disabled = this.element[0].disabled || !1),
                        (this.hasTitle = !!this.element.attr("title")),
                        this.options.label && this.options.label !== this.originalLabel && (this.isInput ? this.element.val(this.options.label) : this.element.html(this.options.label)),
                        this._addClass("ui-button", "ui-widget"),
                        this._setOption("disabled", this.options.disabled),
                        this._enhance(),
                        this.element.is("a") &&
                            this._on({
                                keyup: function (e) {
                                    e.keyCode === t.ui.keyCode.SPACE && (e.preventDefault(), this.element[0].click ? this.element[0].click() : this.element.trigger("click"));
                                },
                            });
                },
                _enhance: function () {
                    this.element.is("button") || this.element.attr("role", "button"), this.options.icon && (this._updateIcon("icon", this.options.icon), this._updateTooltip());
                },
                _updateTooltip: function () {
                    (this.title = this.element.attr("title")), this.options.showLabel || this.title || this.element.attr("title", this.options.label);
                },
                _updateIcon: function (e, i) {
                    var n = "iconPosition" !== e,
                        s = n ? this.options.iconPosition : i,
                        o = "top" === s || "bottom" === s;
                    this.icon
                        ? n && this._removeClass(this.icon, null, this.options.icon)
                        : ((this.icon = t("<span>")), this._addClass(this.icon, "ui-button-icon", "ui-icon"), this.options.showLabel || this._addClass("ui-button-icon-only")),
                        n && this._addClass(this.icon, null, i),
                        this._attachIcon(s),
                        o
                            ? (this._addClass(this.icon, null, "ui-widget-icon-block"), this.iconSpace && this.iconSpace.remove())
                            : (this.iconSpace || ((this.iconSpace = t("<span> </span>")), this._addClass(this.iconSpace, "ui-button-icon-space")), this._removeClass(this.icon, null, "ui-wiget-icon-block"), this._attachIconSpace(s));
                },
                _destroy: function () {
                    this.element.removeAttr("role"), this.icon && this.icon.remove(), this.iconSpace && this.iconSpace.remove(), this.hasTitle || this.element.removeAttr("title");
                },
                _attachIconSpace: function (t) {
                    this.icon[/^(?:end|bottom)/.test(t) ? "before" : "after"](this.iconSpace);
                },
                _attachIcon: function (t) {
                    this.element[/^(?:end|bottom)/.test(t) ? "append" : "prepend"](this.icon);
                },
                _setOptions: function (t) {
                    var e = void 0 === t.showLabel ? this.options.showLabel : t.showLabel,
                        i = void 0 === t.icon ? this.options.icon : t.icon;
                    e || i || (t.showLabel = !0), this._super(t);
                },
                _setOption: function (t, e) {
                    "icon" === t && (e ? this._updateIcon(t, e) : this.icon && (this.icon.remove(), this.iconSpace && this.iconSpace.remove())),
                        "iconPosition" === t && this._updateIcon(t, e),
                        "showLabel" === t && (this._toggleClass("ui-button-icon-only", null, !e), this._updateTooltip()),
                        "label" === t && (this.isInput ? this.element.val(e) : (this.element.html(e), this.icon && (this._attachIcon(this.options.iconPosition), this._attachIconSpace(this.options.iconPosition)))),
                        this._super(t, e),
                        "disabled" === t && (this._toggleClass(null, "ui-state-disabled", e), (this.element[0].disabled = e) && this.element.blur());
                },
                refresh: function () {
                    var t = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");
                    t !== this.options.disabled && this._setOptions({ disabled: t }), this._updateTooltip();
                },
            }),
            !1 !== t.uiBackCompat &&
                (t.widget("ui.button", t.ui.button, {
                    options: { text: !0, icons: { primary: null, secondary: null } },
                    _create: function () {
                        this.options.showLabel && !this.options.text && (this.options.showLabel = this.options.text),
                            !this.options.showLabel && this.options.text && (this.options.text = this.options.showLabel),
                            this.options.icon || (!this.options.icons.primary && !this.options.icons.secondary)
                                ? this.options.icon && (this.options.icons.primary = this.options.icon)
                                : this.options.icons.primary
                                ? (this.options.icon = this.options.icons.primary)
                                : ((this.options.icon = this.options.icons.secondary), (this.options.iconPosition = "end")),
                            this._super();
                    },
                    _setOption: function (t, e) {
                        return "text" === t
                            ? void this._super("showLabel", e)
                            : ("showLabel" === t && (this.options.text = e),
                              "icon" === t && (this.options.icons.primary = e),
                              "icons" === t && (e.primary ? (this._super("icon", e.primary), this._super("iconPosition", "beginning")) : e.secondary && (this._super("icon", e.secondary), this._super("iconPosition", "end"))),
                              void this._superApply(arguments));
                    },
                }),
                (t.fn.button =
                    ((et = t.fn.button),
                    function () {
                        return !this.length || (this.length && "INPUT" !== this[0].tagName) || (this.length && "INPUT" === this[0].tagName && "checkbox" !== this.attr("type") && "radio" !== this.attr("type"))
                            ? et.apply(this, arguments)
                            : (t.ui.checkboxradio || t.error("Checkboxradio widget missing"), 0 === arguments.length ? this.checkboxradio({ icon: !1 }) : this.checkboxradio.apply(this, arguments));
                    })),
                (t.fn.buttonset = function () {
                    return (
                        t.ui.controlgroup || t.error("Controlgroup widget missing"),
                        "option" === arguments[0] && "items" === arguments[1] && arguments[2]
                            ? this.controlgroup.apply(this, [arguments[0], "items.button", arguments[2]])
                            : "option" === arguments[0] && "items" === arguments[1]
                            ? this.controlgroup.apply(this, [arguments[0], "items.button"])
                            : ("object" == typeof arguments[0] && arguments[0].items && (arguments[0].items = { button: arguments[0].items }), this.controlgroup.apply(this, arguments))
                    );
                })),
            t.ui.button,
            t.extend(t.ui, { datepicker: { version: "1.12.1" } }),
            t.extend(e.prototype, {
                markerClassName: "hasDatepicker",
                maxRows: 4,
                _widgetDatepicker: function () {
                    return this.dpDiv;
                },
                setDefaults: function (t) {
                    return s(this._defaults, t || {}), this;
                },
                _attachDatepicker: function (e, i) {
                    var n, s, o;
                    (s = "div" === (n = e.nodeName.toLowerCase()) || "span" === n),
                        e.id || ((this.uuid += 1), (e.id = "dp" + this.uuid)),
                        ((o = this._newInst(t(e), s)).settings = t.extend({}, i || {})),
                        "input" === n ? this._connectDatepicker(e, o) : s && this._inlineDatepicker(e, o);
                },
                _newInst: function (e, n) {
                    return {
                        id: e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"),
                        input: e,
                        selectedDay: 0,
                        selectedMonth: 0,
                        selectedYear: 0,
                        drawMonth: 0,
                        drawYear: 0,
                        inline: n,
                        dpDiv: n ? i(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv,
                    };
                },
                _connectDatepicker: function (e, i) {
                    var n = t(e);
                    (i.append = t([])),
                        (i.trigger = t([])),
                        n.hasClass(this.markerClassName) ||
                            (this._attachments(n, i),
                            n.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp),
                            this._autoSize(i),
                            t.data(e, "datepicker", i),
                            i.settings.disabled && this._disableDatepicker(e));
                },
                _attachments: function (e, i) {
                    var n,
                        s,
                        o,
                        r = this._get(i, "appendText"),
                        a = this._get(i, "isRTL");
                    i.append && i.append.remove(),
                        r && ((i.append = t("<span class='" + this._appendClass + "'>" + r + "</span>")), e[a ? "before" : "after"](i.append)),
                        e.off("focus", this._showDatepicker),
                        i.trigger && i.trigger.remove(),
                        ("focus" !== (n = this._get(i, "showOn")) && "both" !== n) || e.on("focus", this._showDatepicker),
                        ("button" !== n && "both" !== n) ||
                            ((s = this._get(i, "buttonText")),
                            (o = this._get(i, "buttonImage")),
                            (i.trigger = t(
                                this._get(i, "buttonImageOnly")
                                    ? t("<img/>").addClass(this._triggerClass).attr({ src: o, alt: s, title: s })
                                    : t("<button type='button'></button>")
                                          .addClass(this._triggerClass)
                                          .html(o ? t("<img/>").attr({ src: o, alt: s, title: s }) : s)
                            )),
                            e[a ? "before" : "after"](i.trigger),
                            i.trigger.on("click", function () {
                                return (
                                    t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0]
                                        ? t.datepicker._hideDatepicker()
                                        : (t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] && t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])),
                                    !1
                                );
                            }));
                },
                _autoSize: function (t) {
                    if (this._get(t, "autoSize") && !t.inline) {
                        var e,
                            i,
                            n,
                            s,
                            o = new Date(2009, 11, 20),
                            r = this._get(t, "dateFormat");
                        r.match(/[DM]/) &&
                            ((e = function (t) {
                                for (s = n = i = 0; t.length > s; s++) t[s].length > i && ((i = t[s].length), (n = s));
                                return n;
                            }),
                            o.setMonth(e(this._get(t, r.match(/MM/) ? "monthNames" : "monthNamesShort"))),
                            o.setDate(e(this._get(t, r.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - o.getDay())),
                            t.input.attr("size", this._formatDate(t, o).length);
                    }
                },
                _inlineDatepicker: function (e, i) {
                    var n = t(e);
                    n.hasClass(this.markerClassName) ||
                        (n.addClass(this.markerClassName).append(i.dpDiv),
                        t.data(e, "datepicker", i),
                        this._setDate(i, this._getDefaultDate(i), !0),
                        this._updateDatepicker(i),
                        this._updateAlternate(i),
                        i.settings.disabled && this._disableDatepicker(e),
                        i.dpDiv.css("display", "block"));
                },
                _dialogDatepicker: function (e, i, n, o, r) {
                    var a,
                        l,
                        h,
                        c,
                        u,
                        d = this._dialogInst;
                    return (
                        d ||
                            ((this.uuid += 1),
                            (a = "dp" + this.uuid),
                            (this._dialogInput = t("<input type='text' id='" + a + "' style='position: absolute; top: -100px; width: 0px;'/>")),
                            this._dialogInput.on("keydown", this._doKeyDown),
                            t("body").append(this._dialogInput),
                            ((d = this._dialogInst = this._newInst(this._dialogInput, !1)).settings = {}),
                            t.data(this._dialogInput[0], "datepicker", d)),
                        s(d.settings, o || {}),
                        (i = i && i.constructor === Date ? this._formatDate(d, i) : i),
                        this._dialogInput.val(i),
                        (this._pos = r ? (r.length ? r : [r.pageX, r.pageY]) : null),
                        this._pos ||
                            ((l = document.documentElement.clientWidth),
                            (h = document.documentElement.clientHeight),
                            (c = document.documentElement.scrollLeft || document.body.scrollLeft),
                            (u = document.documentElement.scrollTop || document.body.scrollTop),
                            (this._pos = [l / 2 - 100 + c, h / 2 - 150 + u])),
                        this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"),
                        (d.settings.onSelect = n),
                        (this._inDialog = !0),
                        this.dpDiv.addClass(this._dialogClass),
                        this._showDatepicker(this._dialogInput[0]),
                        t.blockUI && t.blockUI(this.dpDiv),
                        t.data(this._dialogInput[0], "datepicker", d),
                        this
                    );
                },
                _destroyDatepicker: function (e) {
                    var i,
                        n = t(e),
                        s = t.data(e, "datepicker");
                    n.hasClass(this.markerClassName) &&
                        ((i = e.nodeName.toLowerCase()),
                        t.removeData(e, "datepicker"),
                        "input" === i
                            ? (s.append.remove(), s.trigger.remove(), n.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp))
                            : ("div" !== i && "span" !== i) || n.removeClass(this.markerClassName).empty(),
                        it === s && (it = null));
                },
                _enableDatepicker: function (e) {
                    var i,
                        n,
                        s = t(e),
                        o = t.data(e, "datepicker");
                    s.hasClass(this.markerClassName) &&
                        ("input" === (i = e.nodeName.toLowerCase())
                            ? ((e.disabled = !1),
                              o.trigger
                                  .filter("button")
                                  .each(function () {
                                      this.disabled = !1;
                                  })
                                  .end()
                                  .filter("img")
                                  .css({ opacity: "1.0", cursor: "" }))
                            : ("div" !== i && "span" !== i) || ((n = s.children("." + this._inlineClass)).children().removeClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)),
                        (this._disabledInputs = t.map(this._disabledInputs, function (t) {
                            return t === e ? null : t;
                        })));
                },
                _disableDatepicker: function (e) {
                    var i,
                        n,
                        s = t(e),
                        o = t.data(e, "datepicker");
                    s.hasClass(this.markerClassName) &&
                        ("input" === (i = e.nodeName.toLowerCase())
                            ? ((e.disabled = !0),
                              o.trigger
                                  .filter("button")
                                  .each(function () {
                                      this.disabled = !0;
                                  })
                                  .end()
                                  .filter("img")
                                  .css({ opacity: "0.5", cursor: "default" }))
                            : ("div" !== i && "span" !== i) || ((n = s.children("." + this._inlineClass)).children().addClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)),
                        (this._disabledInputs = t.map(this._disabledInputs, function (t) {
                            return t === e ? null : t;
                        })),
                        (this._disabledInputs[this._disabledInputs.length] = e));
                },
                _isDisabledDatepicker: function (t) {
                    if (!t) return !1;
                    for (var e = 0; this._disabledInputs.length > e; e++) if (this._disabledInputs[e] === t) return !0;
                    return !1;
                },
                _getInst: function (e) {
                    try {
                        return t.data(e, "datepicker");
                    } catch (e) {
                        throw "Missing instance data for this datepicker";
                    }
                },
                _optionDatepicker: function (e, i, n) {
                    var o,
                        r,
                        a,
                        l,
                        h = this._getInst(e);
                    return 2 === arguments.length && "string" == typeof i
                        ? "defaults" === i
                            ? t.extend({}, t.datepicker._defaults)
                            : h
                            ? "all" === i
                                ? t.extend({}, h.settings)
                                : this._get(h, i)
                            : null
                        : ((o = i || {}),
                          "string" == typeof i && ((o = {})[i] = n),
                          void (
                              h &&
                              (this._curInst === h && this._hideDatepicker(),
                              (r = this._getDateDatepicker(e, !0)),
                              (a = this._getMinMaxDate(h, "min")),
                              (l = this._getMinMaxDate(h, "max")),
                              s(h.settings, o),
                              null !== a && void 0 !== o.dateFormat && void 0 === o.minDate && (h.settings.minDate = this._formatDate(h, a)),
                              null !== l && void 0 !== o.dateFormat && void 0 === o.maxDate && (h.settings.maxDate = this._formatDate(h, l)),
                              "disabled" in o && (o.disabled ? this._disableDatepicker(e) : this._enableDatepicker(e)),
                              this._attachments(t(e), h),
                              this._autoSize(h),
                              this._setDate(h, r),
                              this._updateAlternate(h),
                              this._updateDatepicker(h))
                          ));
                },
                _changeDatepicker: function (t, e, i) {
                    this._optionDatepicker(t, e, i);
                },
                _refreshDatepicker: function (t) {
                    var e = this._getInst(t);
                    e && this._updateDatepicker(e);
                },
                _setDateDatepicker: function (t, e) {
                    var i = this._getInst(t);
                    i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i));
                },
                _getDateDatepicker: function (t, e) {
                    var i = this._getInst(t);
                    return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null;
                },
                _doKeyDown: function (e) {
                    var i,
                        n,
                        s,
                        o = t.datepicker._getInst(e.target),
                        r = !0,
                        a = o.dpDiv.is(".ui-datepicker-rtl");
                    if (((o._keyEvent = !0), t.datepicker._datepickerShowing))
                        switch (e.keyCode) {
                            case 9:
                                t.datepicker._hideDatepicker(), (r = !1);
                                break;
                            case 13:
                                return (
                                    (s = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", o.dpDiv))[0] && t.datepicker._selectDay(e.target, o.selectedMonth, o.selectedYear, s[0]),
                                    (i = t.datepicker._get(o, "onSelect")) ? ((n = t.datepicker._formatDate(o)), i.apply(o.input ? o.input[0] : null, [n, o])) : t.datepicker._hideDatepicker(),
                                    !1
                                );
                            case 27:
                                t.datepicker._hideDatepicker();
                                break;
                            case 33:
                                t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
                                break;
                            case 34:
                                t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
                                break;
                            case 35:
                                (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), (r = e.ctrlKey || e.metaKey);
                                break;
                            case 36:
                                (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), (r = e.ctrlKey || e.metaKey);
                                break;
                            case 37:
                                (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, a ? 1 : -1, "D"),
                                    (r = e.ctrlKey || e.metaKey),
                                    e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
                                break;
                            case 38:
                                (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), (r = e.ctrlKey || e.metaKey);
                                break;
                            case 39:
                                (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, a ? -1 : 1, "D"),
                                    (r = e.ctrlKey || e.metaKey),
                                    e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
                                break;
                            case 40:
                                (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), (r = e.ctrlKey || e.metaKey);
                                break;
                            default:
                                r = !1;
                        }
                    else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : (r = !1);
                    r && (e.preventDefault(), e.stopPropagation());
                },
                _doKeyPress: function (e) {
                    var i,
                        n,
                        s = t.datepicker._getInst(e.target);
                    return t.datepicker._get(s, "constrainInput")
                        ? ((i = t.datepicker._possibleChars(t.datepicker._get(s, "dateFormat"))), (n = String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode)), e.ctrlKey || e.metaKey || n < " " || !i || -1 < i.indexOf(n))
                        : void 0;
                },
                _doKeyUp: function (e) {
                    var i = t.datepicker._getInst(e.target);
                    if (i.input.val() !== i.lastVal)
                        try {
                            t.datepicker.parseDate(t.datepicker._get(i, "dateFormat"), i.input ? i.input.val() : null, t.datepicker._getFormatConfig(i)) &&
                                (t.datepicker._setDateFromField(i), t.datepicker._updateAlternate(i), t.datepicker._updateDatepicker(i));
                        } catch (e) {}
                    return !0;
                },
                _showDatepicker: function (e) {
                    var i, n, o, r, a, l, h;
                    "input" !== (e = e.target || e).nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]),
                        t.datepicker._isDisabledDatepicker(e) ||
                            t.datepicker._lastInput === e ||
                            ((i = t.datepicker._getInst(e)),
                            t.datepicker._curInst && t.datepicker._curInst !== i && (t.datepicker._curInst.dpDiv.stop(!0, !0), i && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])),
                            !1 !== (o = (n = t.datepicker._get(i, "beforeShow")) ? n.apply(e, [e, i]) : {}) &&
                                (s(i.settings, o),
                                (i.lastVal = null),
                                (t.datepicker._lastInput = e),
                                t.datepicker._setDateFromField(i),
                                t.datepicker._inDialog && (e.value = ""),
                                t.datepicker._pos || ((t.datepicker._pos = t.datepicker._findPos(e)), (t.datepicker._pos[1] += e.offsetHeight)),
                                (r = !1),
                                t(e)
                                    .parents()
                                    .each(function () {
                                        return !(r |= "fixed" === t(this).css("position"));
                                    }),
                                (a = { left: t.datepicker._pos[0], top: t.datepicker._pos[1] }),
                                (t.datepicker._pos = null),
                                i.dpDiv.empty(),
                                i.dpDiv.css({ position: "absolute", display: "block", top: "-1000px" }),
                                t.datepicker._updateDatepicker(i),
                                (a = t.datepicker._checkOffset(i, a, r)),
                                i.dpDiv.css({ position: t.datepicker._inDialog && t.blockUI ? "static" : r ? "fixed" : "absolute", display: "none", left: a.left + "px", top: a.top + "px" }),
                                i.inline ||
                                    ((l = t.datepicker._get(i, "showAnim")),
                                    (h = t.datepicker._get(i, "duration")),
                                    i.dpDiv.css(
                                        "z-index",
                                        (function (t) {
                                            for (var e, i; t.length && t[0] !== document; ) {
                                                if (("absolute" === (e = t.css("position")) || "relative" === e || "fixed" === e) && ((i = parseInt(t.css("zIndex"), 10)), !isNaN(i) && 0 !== i)) return i;
                                                t = t.parent();
                                            }
                                            return 0;
                                        })(t(e)) + 1
                                    ),
                                    (t.datepicker._datepickerShowing = !0),
                                    t.effects && t.effects.effect[l] ? i.dpDiv.show(l, t.datepicker._get(i, "showOptions"), h) : i.dpDiv[l || "show"](l ? h : null),
                                    t.datepicker._shouldFocusInput(i) && i.input.trigger("focus"),
                                    (t.datepicker._curInst = i))));
                },
                _updateDatepicker: function (e) {
                    (this.maxRows = 4), (it = e).dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e);
                    var i,
                        s = this._getNumberOfMonths(e),
                        o = s[1],
                        r = e.dpDiv.find("." + this._dayOverClass + " a");
                    0 < r.length && n.apply(r.get(0)),
                        e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),
                        1 < o && e.dpDiv.addClass("ui-datepicker-multi-" + o).css("width", 17 * o + "em"),
                        e.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"),
                        e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"),
                        e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.trigger("focus"),
                        e.yearshtml &&
                            ((i = e.yearshtml),
                            setTimeout(function () {
                                i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), (i = e.yearshtml = null);
                            }, 0));
                },
                _shouldFocusInput: function (t) {
                    return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus");
                },
                _checkOffset: function (e, i, n) {
                    var s = e.dpDiv.outerWidth(),
                        o = e.dpDiv.outerHeight(),
                        r = e.input ? e.input.outerWidth() : 0,
                        a = e.input ? e.input.outerHeight() : 0,
                        l = document.documentElement.clientWidth + (n ? 0 : t(document).scrollLeft()),
                        h = document.documentElement.clientHeight + (n ? 0 : t(document).scrollTop());
                    return (
                        (i.left -= this._get(e, "isRTL") ? s - r : 0),
                        (i.left -= n && i.left === e.input.offset().left ? t(document).scrollLeft() : 0),
                        (i.top -= n && i.top === e.input.offset().top + a ? t(document).scrollTop() : 0),
                        (i.left -= Math.min(i.left, i.left + s > l && s < l ? Math.abs(i.left + s - l) : 0)),
                        (i.top -= Math.min(i.top, i.top + o > h && o < h ? Math.abs(o + a) : 0)),
                        i
                    );
                },
                _findPos: function (e) {
                    for (var i, n = this._getInst(e), s = this._get(n, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e)); ) e = e[s ? "previousSibling" : "nextSibling"];
                    return [(i = t(e).offset()).left, i.top];
                },
                _hideDatepicker: function (e) {
                    var i,
                        n,
                        s,
                        o,
                        r = this._curInst;
                    !r ||
                        (e && r !== t.data(e, "datepicker")) ||
                        (this._datepickerShowing &&
                            ((i = this._get(r, "showAnim")),
                            (n = this._get(r, "duration")),
                            (s = function () {
                                t.datepicker._tidyDialog(r);
                            }),
                            t.effects && (t.effects.effect[i] || t.effects[i]) ? r.dpDiv.hide(i, t.datepicker._get(r, "showOptions"), n, s) : r.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? n : null, s),
                            i || s(),
                            (this._datepickerShowing = !1),
                            (o = this._get(r, "onClose")) && o.apply(r.input ? r.input[0] : null, [r.input ? r.input.val() : "", r]),
                            (this._lastInput = null),
                            this._inDialog && (this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))),
                            (this._inDialog = !1)));
                },
                _tidyDialog: function (t) {
                    t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar");
                },
                _checkExternalClick: function (e) {
                    if (t.datepicker._curInst) {
                        var i = t(e.target),
                            n = t.datepicker._getInst(i[0]);
                        ((i[0].id === t.datepicker._mainDivId ||
                            0 !== i.parents("#" + t.datepicker._mainDivId).length ||
                            i.hasClass(t.datepicker.markerClassName) ||
                            i.closest("." + t.datepicker._triggerClass).length ||
                            !t.datepicker._datepickerShowing ||
                            (t.datepicker._inDialog && t.blockUI)) &&
                            (!i.hasClass(t.datepicker.markerClassName) || t.datepicker._curInst === n)) ||
                            t.datepicker._hideDatepicker();
                    }
                },
                _adjustDate: function (e, i, n) {
                    var s = t(e),
                        o = this._getInst(s[0]);
                    this._isDisabledDatepicker(s[0]) || (this._adjustInstDate(o, i + ("M" === n ? this._get(o, "showCurrentAtPos") : 0), n), this._updateDatepicker(o));
                },
                _gotoToday: function (e) {
                    var i,
                        n = t(e),
                        s = this._getInst(n[0]);
                    this._get(s, "gotoCurrent") && s.currentDay
                        ? ((s.selectedDay = s.currentDay), (s.drawMonth = s.selectedMonth = s.currentMonth), (s.drawYear = s.selectedYear = s.currentYear))
                        : ((i = new Date()), (s.selectedDay = i.getDate()), (s.drawMonth = s.selectedMonth = i.getMonth()), (s.drawYear = s.selectedYear = i.getFullYear())),
                        this._notifyChange(s),
                        this._adjustDate(n);
                },
                _selectMonthYear: function (e, i, n) {
                    var s = t(e),
                        o = this._getInst(s[0]);
                    (o["selected" + ("M" === n ? "Month" : "Year")] = o["draw" + ("M" === n ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10)), this._notifyChange(o), this._adjustDate(s);
                },
                _selectDay: function (e, i, n, s) {
                    var o,
                        r = t(e);
                    t(s).hasClass(this._unselectableClass) ||
                        this._isDisabledDatepicker(r[0]) ||
                        (((o = this._getInst(r[0])).selectedDay = o.currentDay = t("a", s).html()),
                        (o.selectedMonth = o.currentMonth = i),
                        (o.selectedYear = o.currentYear = n),
                        this._selectDate(e, this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear)));
                },
                _clearDate: function (e) {
                    var i = t(e);
                    this._selectDate(i, "");
                },
                _selectDate: function (e, i) {
                    var n,
                        s = t(e),
                        o = this._getInst(s[0]);
                    (i = null != i ? i : this._formatDate(o)),
                        o.input && o.input.val(i),
                        this._updateAlternate(o),
                        (n = this._get(o, "onSelect")) ? n.apply(o.input ? o.input[0] : null, [i, o]) : o.input && o.input.trigger("change"),
                        o.inline ? this._updateDatepicker(o) : (this._hideDatepicker(), (this._lastInput = o.input[0]), "object" != typeof o.input[0] && o.input.trigger("focus"), (this._lastInput = null));
                },
                _updateAlternate: function (e) {
                    var i,
                        n,
                        s,
                        o = this._get(e, "altField");
                    o && ((i = this._get(e, "altFormat") || this._get(e, "dateFormat")), (n = this._getDate(e)), (s = this.formatDate(i, n, this._getFormatConfig(e))), t(o).val(s));
                },
                noWeekends: function (t) {
                    var e = t.getDay();
                    return [0 < e && e < 6, ""];
                },
                iso8601Week: function (t) {
                    var e,
                        i = new Date(t.getTime());
                    return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), (e = i.getTime()), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1;
                },
                parseDate: function (e, i, n) {
                    if (null == e || null == i) throw "Invalid arguments";
                    if ("" == (i = "object" == typeof i ? "" + i : i + "")) return null;
                    function s(t) {
                        var i = e.length > l + 1 && e.charAt(l + 1) === t;
                        return i && l++, i;
                    }
                    function o(t) {
                        var e = s(t),
                            n = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
                            o = RegExp("^\\d{" + ("y" === t ? n : 1) + "," + n + "}"),
                            r = i.substring(d).match(o);
                        if (!r) throw "Missing number at position " + d;
                        return (d += r[0].length), parseInt(r[0], 10);
                    }
                    function r(e, n, o) {
                        var r = -1,
                            a = t
                                .map(s(e) ? o : n, function (t, e) {
                                    return [[e, t]];
                                })
                                .sort(function (t, e) {
                                    return -(t[1].length - e[1].length);
                                });
                        if (
                            (t.each(a, function (t, e) {
                                var n = e[1];
                                return i.substr(d, n.length).toLowerCase() === n.toLowerCase() ? ((r = e[0]), (d += n.length), !1) : void 0;
                            }),
                            -1 !== r)
                        )
                            return r + 1;
                        throw "Unknown name at position " + d;
                    }
                    function a() {
                        if (i.charAt(d) !== e.charAt(l)) throw "Unexpected literal at position " + d;
                        d++;
                    }
                    var l,
                        h,
                        c,
                        u,
                        d = 0,
                        p = (n ? n.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                        f = "string" != typeof p ? p : (new Date().getFullYear() % 100) + parseInt(p, 10),
                        g = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort,
                        m = (n ? n.dayNames : null) || this._defaults.dayNames,
                        v = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort,
                        _ = (n ? n.monthNames : null) || this._defaults.monthNames,
                        b = -1,
                        y = -1,
                        w = -1,
                        C = -1,
                        x = !1;
                    for (l = 0; e.length > l; l++)
                        if (x) "'" !== e.charAt(l) || s("'") ? a() : (x = !1);
                        else
                            switch (e.charAt(l)) {
                                case "d":
                                    w = o("d");
                                    break;
                                case "D":
                                    r("D", g, m);
                                    break;
                                case "o":
                                    C = o("o");
                                    break;
                                case "m":
                                    y = o("m");
                                    break;
                                case "M":
                                    y = r("M", v, _);
                                    break;
                                case "y":
                                    b = o("y");
                                    break;
                                case "@":
                                    (b = (u = new Date(o("@"))).getFullYear()), (y = u.getMonth() + 1), (w = u.getDate());
                                    break;
                                case "!":
                                    (b = (u = new Date((o("!") - this._ticksTo1970) / 1e4)).getFullYear()), (y = u.getMonth() + 1), (w = u.getDate());
                                    break;
                                case "'":
                                    s("'") ? a() : (x = !0);
                                    break;
                                default:
                                    a();
                            }
                    if (i.length > d && ((c = i.substr(d)), !/^\s+/.test(c))) throw "Extra/unparsed characters found in date: " + c;
                    if ((-1 === b ? (b = new Date().getFullYear()) : b < 100 && (b += new Date().getFullYear() - (new Date().getFullYear() % 100) + (b <= f ? 0 : -100)), -1 < C))
                        for (y = 1, w = C; !(w <= (h = this._getDaysInMonth(b, y - 1))); ) y++, (w -= h);
                    if ((u = this._daylightSavingAdjust(new Date(b, y - 1, w))).getFullYear() !== b || u.getMonth() + 1 !== y || u.getDate() !== w) throw "Invalid date";
                    return u;
                },
                ATOM: "yy-mm-dd",
                COOKIE: "D, dd M yy",
                ISO_8601: "yy-mm-dd",
                RFC_822: "D, d M y",
                RFC_850: "DD, dd-M-y",
                RFC_1036: "D, d M y",
                RFC_1123: "D, d M yy",
                RFC_2822: "D, d M yy",
                RSS: "D, d M y",
                TICKS: "!",
                TIMESTAMP: "@",
                W3C: "yy-mm-dd",
                _ticksTo1970: 864e9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
                formatDate: function (t, e, i) {
                    if (!e) return "";
                    function n(e) {
                        var i = t.length > r + 1 && t.charAt(r + 1) === e;
                        return i && r++, i;
                    }
                    function s(t, e, i) {
                        var s = "" + e;
                        if (n(t)) for (; i > s.length; ) s = "0" + s;
                        return s;
                    }
                    function o(t, e, i, s) {
                        return n(t) ? s[e] : i[e];
                    }
                    var r,
                        a = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                        l = (i ? i.dayNames : null) || this._defaults.dayNames,
                        h = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                        c = (i ? i.monthNames : null) || this._defaults.monthNames,
                        u = "",
                        d = !1;
                    if (e)
                        for (r = 0; t.length > r; r++)
                            if (d) "'" !== t.charAt(r) || n("'") ? (u += t.charAt(r)) : (d = !1);
                            else
                                switch (t.charAt(r)) {
                                    case "d":
                                        u += s("d", e.getDate(), 2);
                                        break;
                                    case "D":
                                        u += o("D", e.getDay(), a, l);
                                        break;
                                    case "o":
                                        u += s("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                                        break;
                                    case "m":
                                        u += s("m", e.getMonth() + 1, 2);
                                        break;
                                    case "M":
                                        u += o("M", e.getMonth(), h, c);
                                        break;
                                    case "y":
                                        u += n("y") ? e.getFullYear() : (e.getFullYear() % 100 < 10 ? "0" : "") + (e.getFullYear() % 100);
                                        break;
                                    case "@":
                                        u += e.getTime();
                                        break;
                                    case "!":
                                        u += 1e4 * e.getTime() + this._ticksTo1970;
                                        break;
                                    case "'":
                                        n("'") ? (u += "'") : (d = !0);
                                        break;
                                    default:
                                        u += t.charAt(r);
                                }
                    return u;
                },
                _possibleChars: function (t) {
                    function e(e) {
                        var n = t.length > i + 1 && t.charAt(i + 1) === e;
                        return n && i++, n;
                    }
                    var i,
                        n = "",
                        s = !1;
                    for (i = 0; t.length > i; i++)
                        if (s) "'" !== t.charAt(i) || e("'") ? (n += t.charAt(i)) : (s = !1);
                        else
                            switch (t.charAt(i)) {
                                case "d":
                                case "m":
                                case "y":
                                case "@":
                                    n += "0123456789";
                                    break;
                                case "D":
                                case "M":
                                    return null;
                                case "'":
                                    e("'") ? (n += "'") : (s = !0);
                                    break;
                                default:
                                    n += t.charAt(i);
                            }
                    return n;
                },
                _get: function (t, e) {
                    return void 0 !== t.settings[e] ? t.settings[e] : this._defaults[e];
                },
                _setDateFromField: function (t, e) {
                    if (t.input.val() !== t.lastVal) {
                        var i = this._get(t, "dateFormat"),
                            n = (t.lastVal = t.input ? t.input.val() : null),
                            s = this._getDefaultDate(t),
                            o = s,
                            r = this._getFormatConfig(t);
                        try {
                            o = this.parseDate(i, n, r) || s;
                        } catch (t) {
                            n = e ? "" : n;
                        }
                        (t.selectedDay = o.getDate()),
                            (t.drawMonth = t.selectedMonth = o.getMonth()),
                            (t.drawYear = t.selectedYear = o.getFullYear()),
                            (t.currentDay = n ? o.getDate() : 0),
                            (t.currentMonth = n ? o.getMonth() : 0),
                            (t.currentYear = n ? o.getFullYear() : 0),
                            this._adjustInstDate(t);
                    }
                },
                _getDefaultDate: function (t) {
                    return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date()));
                },
                _determineDate: function (e, i, n) {
                    var s,
                        o,
                        r =
                            null == i || "" === i
                                ? n
                                : "string" == typeof i
                                ? (function (i) {
                                      try {
                                          return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e));
                                      } catch (i) {}
                                      for (
                                          var n = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date(),
                                              s = n.getFullYear(),
                                              o = n.getMonth(),
                                              r = n.getDate(),
                                              a = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                                              l = a.exec(i);
                                          l;

                                      ) {
                                          switch (l[2] || "d") {
                                              case "d":
                                              case "D":
                                                  r += parseInt(l[1], 10);
                                                  break;
                                              case "w":
                                              case "W":
                                                  r += 7 * parseInt(l[1], 10);
                                                  break;
                                              case "m":
                                              case "M":
                                                  (o += parseInt(l[1], 10)), (r = Math.min(r, t.datepicker._getDaysInMonth(s, o)));
                                                  break;
                                              case "y":
                                              case "Y":
                                                  (s += parseInt(l[1], 10)), (r = Math.min(r, t.datepicker._getDaysInMonth(s, o)));
                                          }
                                          l = a.exec(i);
                                      }
                                      return new Date(s, o, r);
                                  })(i)
                                : "number" == typeof i
                                ? isNaN(i)
                                    ? n
                                    : ((s = i), (o = new Date()).setDate(o.getDate() + s), o)
                                : new Date(i.getTime());
                    return (r = r && "Invalid Date" == "" + r ? n : r) && (r.setHours(0), r.setMinutes(0), r.setSeconds(0), r.setMilliseconds(0)), this._daylightSavingAdjust(r);
                },
                _daylightSavingAdjust: function (t) {
                    return t ? (t.setHours(12 < t.getHours() ? t.getHours() + 2 : 0), t) : null;
                },
                _setDate: function (t, e, i) {
                    var n = !e,
                        s = t.selectedMonth,
                        o = t.selectedYear,
                        r = this._restrictMinMax(t, this._determineDate(t, e, new Date()));
                    (t.selectedDay = t.currentDay = r.getDate()),
                        (t.drawMonth = t.selectedMonth = t.currentMonth = r.getMonth()),
                        (t.drawYear = t.selectedYear = t.currentYear = r.getFullYear()),
                        (s === t.selectedMonth && o === t.selectedYear) || i || this._notifyChange(t),
                        this._adjustInstDate(t),
                        t.input && t.input.val(n ? "" : this._formatDate(t));
                },
                _getDate: function (t) {
                    return !t.currentYear || (t.input && "" === t.input.val()) ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                },
                _attachHandlers: function (e) {
                    var i = this._get(e, "stepMonths"),
                        n = "#" + e.id.replace(/\\\\/g, "\\");
                    e.dpDiv.find("[data-handler]").map(function () {
                        var e = {
                            prev: function () {
                                t.datepicker._adjustDate(n, -i, "M");
                            },
                            next: function () {
                                t.datepicker._adjustDate(n, +i, "M");
                            },
                            hide: function () {
                                t.datepicker._hideDatepicker();
                            },
                            today: function () {
                                t.datepicker._gotoToday(n);
                            },
                            selectDay: function () {
                                return t.datepicker._selectDay(n, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1;
                            },
                            selectMonth: function () {
                                return t.datepicker._selectMonthYear(n, this, "M"), !1;
                            },
                            selectYear: function () {
                                return t.datepicker._selectMonthYear(n, this, "Y"), !1;
                            },
                        };
                        t(this).on(this.getAttribute("data-event"), e[this.getAttribute("data-handler")]);
                    });
                },
                _generateHTML: function (t) {
                    var e,
                        i,
                        n,
                        s,
                        o,
                        r,
                        a,
                        l,
                        h,
                        c,
                        u,
                        d,
                        p,
                        f,
                        g,
                        m,
                        v,
                        _,
                        b,
                        y,
                        w,
                        C,
                        x,
                        k,
                        T,
                        D,
                        S,
                        E,
                        I,
                        A,
                        P,
                        N,
                        O,
                        M,
                        $,
                        H,
                        L,
                        W,
                        R,
                        F = new Date(),
                        j = this._daylightSavingAdjust(new Date(F.getFullYear(), F.getMonth(), F.getDate())),
                        z = this._get(t, "isRTL"),
                        q = this._get(t, "showButtonPanel"),
                        B = this._get(t, "hideIfNoPrevNext"),
                        U = this._get(t, "navigationAsDateFormat"),
                        Y = this._getNumberOfMonths(t),
                        K = this._get(t, "showCurrentAtPos"),
                        V = this._get(t, "stepMonths"),
                        X = 1 !== Y[0] || 1 !== Y[1],
                        Q = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
                        G = this._getMinMaxDate(t, "min"),
                        J = this._getMinMaxDate(t, "max"),
                        Z = t.drawMonth - K,
                        tt = t.drawYear;
                    if ((Z < 0 && ((Z += 12), tt--), J))
                        for (e = this._daylightSavingAdjust(new Date(J.getFullYear(), J.getMonth() - Y[0] * Y[1] + 1, J.getDate())), e = G && e < G ? G : e; this._daylightSavingAdjust(new Date(tt, Z, 1)) > e; ) --Z < 0 && ((Z = 11), tt--);
                    for (
                        t.drawMonth = Z,
                            t.drawYear = tt,
                            i = this._get(t, "prevText"),
                            i = U ? this.formatDate(i, this._daylightSavingAdjust(new Date(tt, Z - V, 1)), this._getFormatConfig(t)) : i,
                            n = this._canAdjustMonth(t, -1, tt, Z)
                                ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (z ? "e" : "w") + "'>" + i + "</span></a>"
                                : B
                                ? ""
                                : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (z ? "e" : "w") + "'>" + i + "</span></a>",
                            s = this._get(t, "nextText"),
                            s = U ? this.formatDate(s, this._daylightSavingAdjust(new Date(tt, Z + V, 1)), this._getFormatConfig(t)) : s,
                            o = this._canAdjustMonth(t, 1, tt, Z)
                                ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (z ? "w" : "e") + "'>" + s + "</span></a>"
                                : B
                                ? ""
                                : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (z ? "w" : "e") + "'>" + s + "</span></a>",
                            r = this._get(t, "currentText"),
                            a = this._get(t, "gotoCurrent") && t.currentDay ? Q : j,
                            r = U ? this.formatDate(r, a, this._getFormatConfig(t)) : r,
                            l = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>",
                            h = q
                                ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" +
                                  (z ? l : "") +
                                  (this._isInRange(t, a) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + r + "</button>" : "") +
                                  (z ? "" : l) +
                                  "</div>"
                                : "",
                            c = parseInt(this._get(t, "firstDay"), 10),
                            c = isNaN(c) ? 0 : c,
                            u = this._get(t, "showWeek"),
                            d = this._get(t, "dayNames"),
                            p = this._get(t, "dayNamesMin"),
                            f = this._get(t, "monthNames"),
                            g = this._get(t, "monthNamesShort"),
                            m = this._get(t, "beforeShowDay"),
                            v = this._get(t, "showOtherMonths"),
                            _ = this._get(t, "selectOtherMonths"),
                            b = this._getDefaultDate(t),
                            y = "",
                            C = 0;
                        Y[0] > C;
                        C++
                    ) {
                        for (x = "", this.maxRows = 4, k = 0; Y[1] > k; k++) {
                            if (((T = this._daylightSavingAdjust(new Date(tt, Z, t.selectedDay))), (D = " ui-corner-all"), (S = ""), X)) {
                                if (((S += "<div class='ui-datepicker-group"), 1 < Y[1]))
                                    switch (k) {
                                        case 0:
                                            (S += " ui-datepicker-group-first"), (D = " ui-corner-" + (z ? "right" : "left"));
                                            break;
                                        case Y[1] - 1:
                                            (S += " ui-datepicker-group-last"), (D = " ui-corner-" + (z ? "left" : "right"));
                                            break;
                                        default:
                                            (S += " ui-datepicker-group-middle"), (D = "");
                                    }
                                S += "'>";
                            }
                            for (
                                S +=
                                    "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" +
                                    D +
                                    "'>" +
                                    (/all|left/.test(D) && 0 === C ? (z ? o : n) : "") +
                                    (/all|right/.test(D) && 0 === C ? (z ? n : o) : "") +
                                    this._generateMonthYearHeader(t, Z, tt, G, J, 0 < C || 0 < k, f, g) +
                                    "</div><table class='ui-datepicker-calendar'><thead><tr>",
                                    E = u ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "",
                                    w = 0;
                                w < 7;
                                w++
                            )
                                E += "<th scope='col'" + (5 <= (w + c + 6) % 7 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + d[(I = (w + c) % 7)] + "'>" + p[I] + "</span></th>";
                            for (
                                S += E + "</tr></thead><tbody>",
                                    A = this._getDaysInMonth(tt, Z),
                                    tt === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, A)),
                                    P = (this._getFirstDayOfMonth(tt, Z) - c + 7) % 7,
                                    N = Math.ceil((P + A) / 7),
                                    O = X && this.maxRows > N ? this.maxRows : N,
                                    this.maxRows = O,
                                    M = this._daylightSavingAdjust(new Date(tt, Z, 1 - P)),
                                    $ = 0;
                                $ < O;
                                $++
                            ) {
                                for (S += "<tr>", H = u ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(M) + "</td>" : "", w = 0; w < 7; w++)
                                    (L = m ? m.apply(t.input ? t.input[0] : null, [M]) : [!0, ""]),
                                        (R = ((W = M.getMonth() !== Z) && !_) || !L[0] || (G && M < G) || (J && J < M)),
                                        (H +=
                                            "<td class='" +
                                            (5 <= (w + c + 6) % 7 ? " ui-datepicker-week-end" : "") +
                                            (W ? " ui-datepicker-other-month" : "") +
                                            ((M.getTime() === T.getTime() && Z === t.selectedMonth && t._keyEvent) || (b.getTime() === M.getTime() && b.getTime() === T.getTime()) ? " " + this._dayOverClass : "") +
                                            (R ? " " + this._unselectableClass + " ui-state-disabled" : "") +
                                            (W && !v ? "" : " " + L[1] + (M.getTime() === Q.getTime() ? " " + this._currentClass : "") + (M.getTime() === j.getTime() ? " ui-datepicker-today" : "")) +
                                            "'" +
                                            ((W && !v) || !L[2] ? "" : " title='" + L[2].replace(/'/g, "&#39;") + "'") +
                                            (R ? "" : " data-handler='selectDay' data-event='click' data-month='" + M.getMonth() + "' data-year='" + M.getFullYear() + "'") +
                                            ">" +
                                            (W && !v
                                                ? "&#xa0;"
                                                : R
                                                ? "<span class='ui-state-default'>" + M.getDate() + "</span>"
                                                : "<a class='ui-state-default" +
                                                  (M.getTime() === j.getTime() ? " ui-state-highlight" : "") +
                                                  (M.getTime() === Q.getTime() ? " ui-state-active" : "") +
                                                  (W ? " ui-priority-secondary" : "") +
                                                  "' href='#'>" +
                                                  M.getDate() +
                                                  "</a>") +
                                            "</td>"),
                                        M.setDate(M.getDate() + 1),
                                        (M = this._daylightSavingAdjust(M));
                                S += H + "</tr>";
                            }
                            11 < ++Z && ((Z = 0), tt++), (x += S += "</tbody></table>" + (X ? "</div>" + (0 < Y[0] && k === Y[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""));
                        }
                        y += x;
                    }
                    return (y += h), (t._keyEvent = !1), y;
                },
                _generateMonthYearHeader: function (t, e, i, n, s, o, r, a) {
                    var l,
                        h,
                        c,
                        u,
                        d,
                        p,
                        f,
                        g,
                        m = this._get(t, "changeMonth"),
                        v = this._get(t, "changeYear"),
                        _ = this._get(t, "showMonthAfterYear"),
                        b = "<div class='ui-datepicker-title'>",
                        y = "";
                    if (o || !m) y += "<span class='ui-datepicker-month'>" + r[e] + "</span>";
                    else {
                        for (l = n && n.getFullYear() === i, h = s && s.getFullYear() === i, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", c = 0; c < 12; c++)
                            (!l || c >= n.getMonth()) && (!h || s.getMonth() >= c) && (y += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + a[c] + "</option>");
                        y += "</select>";
                    }
                    if ((_ || (b += y + (!o && m && v ? "" : "&#xa0;")), !t.yearshtml))
                        if (((t.yearshtml = ""), o || !v)) b += "<span class='ui-datepicker-year'>" + i + "</span>";
                        else {
                            for (
                                u = this._get(t, "yearRange").split(":"),
                                    d = new Date().getFullYear(),
                                    f = (p = function (t) {
                                        var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
                                        return isNaN(e) ? d : e;
                                    })(u[0]),
                                    g = Math.max(f, p(u[1] || "")),
                                    f = n ? Math.max(f, n.getFullYear()) : f,
                                    g = s ? Math.min(g, s.getFullYear()) : g,
                                    t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                                f <= g;
                                f++
                            )
                                t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                            (t.yearshtml += "</select>"), (b += t.yearshtml), (t.yearshtml = null);
                        }
                    return (b += this._get(t, "yearSuffix")), _ && (b += (!o && m && v ? "" : "&#xa0;") + y), b + "</div>";
                },
                _adjustInstDate: function (t, e, i) {
                    var n = t.selectedYear + ("Y" === i ? e : 0),
                        s = t.selectedMonth + ("M" === i ? e : 0),
                        o = Math.min(t.selectedDay, this._getDaysInMonth(n, s)) + ("D" === i ? e : 0),
                        r = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(n, s, o)));
                    (t.selectedDay = r.getDate()), (t.drawMonth = t.selectedMonth = r.getMonth()), (t.drawYear = t.selectedYear = r.getFullYear()), ("M" !== i && "Y" !== i) || this._notifyChange(t);
                },
                _restrictMinMax: function (t, e) {
                    var i = this._getMinMaxDate(t, "min"),
                        n = this._getMinMaxDate(t, "max"),
                        s = i && e < i ? i : e;
                    return n && n < s ? n : s;
                },
                _notifyChange: function (t) {
                    var e = this._get(t, "onChangeMonthYear");
                    e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t]);
                },
                _getNumberOfMonths: function (t) {
                    var e = this._get(t, "numberOfMonths");
                    return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e;
                },
                _getMinMaxDate: function (t, e) {
                    return this._determineDate(t, this._get(t, e + "Date"), null);
                },
                _getDaysInMonth: function (t, e) {
                    return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate();
                },
                _getFirstDayOfMonth: function (t, e) {
                    return new Date(t, e, 1).getDay();
                },
                _canAdjustMonth: function (t, e, i, n) {
                    var s = this._getNumberOfMonths(t),
                        o = this._daylightSavingAdjust(new Date(i, n + (e < 0 ? e : s[0] * s[1]), 1));
                    return e < 0 && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())), this._isInRange(t, o);
                },
                _isInRange: function (t, e) {
                    var i,
                        n,
                        s = this._getMinMaxDate(t, "min"),
                        o = this._getMinMaxDate(t, "max"),
                        r = null,
                        a = null,
                        l = this._get(t, "yearRange");
                    return (
                        l && ((i = l.split(":")), (n = new Date().getFullYear()), (r = parseInt(i[0], 10)), (a = parseInt(i[1], 10)), i[0].match(/[+\-].*/) && (r += n), i[1].match(/[+\-].*/) && (a += n)),
                        (!s || e.getTime() >= s.getTime()) && (!o || e.getTime() <= o.getTime()) && (!r || e.getFullYear() >= r) && (!a || a >= e.getFullYear())
                    );
                },
                _getFormatConfig: function (t) {
                    var e = this._get(t, "shortYearCutoff");
                    return {
                        shortYearCutoff: (e = "string" != typeof e ? e : (new Date().getFullYear() % 100) + parseInt(e, 10)),
                        dayNamesShort: this._get(t, "dayNamesShort"),
                        dayNames: this._get(t, "dayNames"),
                        monthNamesShort: this._get(t, "monthNamesShort"),
                        monthNames: this._get(t, "monthNames"),
                    };
                },
                _formatDate: function (t, e, i, n) {
                    e || ((t.currentDay = t.selectedDay), (t.currentMonth = t.selectedMonth), (t.currentYear = t.selectedYear));
                    var s = e ? ("object" == typeof e ? e : this._daylightSavingAdjust(new Date(n, i, e))) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                    return this.formatDate(this._get(t, "dateFormat"), s, this._getFormatConfig(t));
                },
            }),
            (t.fn.datepicker = function (e) {
                if (!this.length) return this;
                t.datepicker.initialized || (t(document).on("mousedown", t.datepicker._checkExternalClick), (t.datepicker.initialized = !0)), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
                var i = Array.prototype.slice.call(arguments, 1);
                return "string" != typeof e || ("isDisabled" !== e && "getDate" !== e && "widget" !== e)
                    ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1]
                        ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
                        : this.each(function () {
                              "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e);
                          })
                    : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i));
            }),
            (t.datepicker = new e()),
            (t.datepicker.initialized = !1),
            (t.datepicker.uuid = new Date().getTime()),
            (t.datepicker.version = "1.12.1"),
            t.datepicker,
            (t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()));
        var st = !1;
        t(document).on("mouseup", function () {
            st = !1;
        }),
            t.widget("ui.mouse", {
                version: "1.12.1",
                options: { cancel: "input, textarea, button, select, option", distance: 1, delay: 0 },
                _mouseInit: function () {
                    var e = this;
                    this.element
                        .on("mousedown." + this.widgetName, function (t) {
                            return e._mouseDown(t);
                        })
                        .on("click." + this.widgetName, function (i) {
                            return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0;
                        }),
                        (this.started = !1);
                },
                _mouseDestroy: function () {
                    this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
                },
                _mouseDown: function (e) {
                    if (!st) {
                        (this._mouseMoved = !1), this._mouseStarted && this._mouseUp(e), (this._mouseDownEvent = e);
                        var i = this,
                            n = 1 === e.which,
                            s = !("string" != typeof this.options.cancel || !e.target.nodeName) && t(e.target).closest(this.options.cancel).length;
                        return (
                            n &&
                                !s &&
                                this._mouseCapture(e) &&
                                ((this.mouseDelayMet = !this.options.delay),
                                this.mouseDelayMet ||
                                    (this._mouseDelayTimer = setTimeout(function () {
                                        i.mouseDelayMet = !0;
                                    }, this.options.delay)),
                                this._mouseDistanceMet(e) && this._mouseDelayMet(e) && ((this._mouseStarted = !1 !== this._mouseStart(e)), !this._mouseStarted)
                                    ? e.preventDefault()
                                    : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"),
                                      (this._mouseMoveDelegate = function (t) {
                                          return i._mouseMove(t);
                                      }),
                                      (this._mouseUpDelegate = function (t) {
                                          return i._mouseUp(t);
                                      }),
                                      this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate),
                                      e.preventDefault(),
                                      (st = !0))),
                            !0
                        );
                    }
                },
                _mouseMove: function (e) {
                    if (this._mouseMoved) {
                        if (t.ui.ie && (!document.documentMode || document.documentMode < 9) && !e.button) return this._mouseUp(e);
                        if (!e.which)
                            if (e.originalEvent.altKey || e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey) this.ignoreMissingWhich = !0;
                            else if (!this.ignoreMissingWhich) return this._mouseUp(e);
                    }
                    return (
                        (e.which || e.button) && (this._mouseMoved = !0),
                        this._mouseStarted
                            ? (this._mouseDrag(e), e.preventDefault())
                            : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && ((this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, e)), this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)),
                              !this._mouseStarted)
                    );
                },
                _mouseUp: function (e) {
                    this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate),
                        this._mouseStarted && ((this._mouseStarted = !1), e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)),
                        this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer),
                        (this.ignoreMissingWhich = !1),
                        (st = !1),
                        e.preventDefault();
                },
                _mouseDistanceMet: function (t) {
                    return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance;
                },
                _mouseDelayMet: function () {
                    return this.mouseDelayMet;
                },
                _mouseStart: function () {},
                _mouseDrag: function () {},
                _mouseStop: function () {},
                _mouseCapture: function () {
                    return !0;
                },
            }),
            (t.ui.plugin = {
                add: function (e, i, n) {
                    var s,
                        o = t.ui[e].prototype;
                    for (s in n) (o.plugins[s] = o.plugins[s] || []), o.plugins[s].push([i, n[s]]);
                },
                call: function (t, e, i, n) {
                    var s,
                        o = t.plugins[e];
                    if (o && (n || (t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))) for (s = 0; o.length > s; s++) t.options[o[s][0]] && o[s][1].apply(t.element, i);
                },
            }),
            (t.ui.safeBlur = function (e) {
                e && "body" !== e.nodeName.toLowerCase() && t(e).trigger("blur");
            }),
            t.widget("ui.draggable", t.ui.mouse, {
                version: "1.12.1",
                widgetEventPrefix: "drag",
                options: {
                    addClasses: !0,
                    appendTo: "parent",
                    axis: !1,
                    connectToSortable: !1,
                    containment: !1,
                    cursor: "auto",
                    cursorAt: !1,
                    grid: !1,
                    handle: !1,
                    helper: "original",
                    iframeFix: !1,
                    opacity: !1,
                    refreshPositions: !1,
                    revert: !1,
                    revertDuration: 500,
                    scope: "default",
                    scroll: !0,
                    scrollSensitivity: 20,
                    scrollSpeed: 20,
                    snap: !1,
                    snapMode: "both",
                    snapTolerance: 20,
                    stack: !1,
                    zIndex: !1,
                    drag: null,
                    start: null,
                    stop: null,
                },
                _create: function () {
                    "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this._addClass("ui-draggable"), this._setHandleClassName(), this._mouseInit();
                },
                _setOption: function (t, e) {
                    this._super(t, e), "handle" === t && (this._removeHandleClassName(), this._setHandleClassName());
                },
                _destroy: function () {
                    return (this.helper || this.element).is(".ui-draggable-dragging") ? void (this.destroyOnClear = !0) : (this._removeHandleClassName(), void this._mouseDestroy());
                },
                _mouseCapture: function (e) {
                    var i = this.options;
                    return !(
                        this.helper ||
                        i.disabled ||
                        0 < t(e.target).closest(".ui-resizable-handle").length ||
                        ((this.handle = this._getHandle(e)), !this.handle || (this._blurActiveElement(e), this._blockFrames(!0 === i.iframeFix ? "iframe" : i.iframeFix), 0))
                    );
                },
                _blockFrames: function (e) {
                    this.iframeBlocks = this.document.find(e).map(function () {
                        var e = t(this);
                        return t("<div>").css("position", "absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0];
                    });
                },
                _unblockFrames: function () {
                    this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
                },
                _blurActiveElement: function (e) {
                    var i = t.ui.safeActiveElement(this.document[0]);
                    t(e.target).closest(i).length || t.ui.safeBlur(i);
                },
                _mouseStart: function (e) {
                    var i = this.options;
                    return (
                        (this.helper = this._createHelper(e)),
                        this._addClass(this.helper, "ui-draggable-dragging"),
                        this._cacheHelperProportions(),
                        t.ui.ddmanager && (t.ui.ddmanager.current = this),
                        this._cacheMargins(),
                        (this.cssPosition = this.helper.css("position")),
                        (this.scrollParent = this.helper.scrollParent(!0)),
                        (this.offsetParent = this.helper.offsetParent()),
                        (this.hasFixedAncestor =
                            0 <
                            this.helper.parents().filter(function () {
                                return "fixed" === t(this).css("position");
                            }).length),
                        (this.positionAbs = this.element.offset()),
                        this._refreshOffsets(e),
                        (this.originalPosition = this.position = this._generatePosition(e, !1)),
                        (this.originalPageX = e.pageX),
                        (this.originalPageY = e.pageY),
                        i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
                        this._setContainment(),
                        !1 === this._trigger("start", e)
                            ? (this._clear(), !1)
                            : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
                    );
                },
                _refreshOffsets: function (t) {
                    (this.offset = { top: this.positionAbs.top - this.margins.top, left: this.positionAbs.left - this.margins.left, scroll: !1, parent: this._getParentOffset(), relative: this._getRelativeOffset() }),
                        (this.offset.click = { left: t.pageX - this.offset.left, top: t.pageY - this.offset.top });
                },
                _mouseDrag: function (e, i) {
                    if ((this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), (this.position = this._generatePosition(e, !0)), (this.positionAbs = this._convertPositionTo("absolute")), !i)) {
                        var n = this._uiHash();
                        if (!1 === this._trigger("drag", e, n)) return this._mouseUp(new t.Event("mouseup", e)), !1;
                        this.position = n.position;
                    }
                    return (this.helper[0].style.left = this.position.left + "px"), (this.helper[0].style.top = this.position.top + "px"), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1;
                },
                _mouseStop: function (e) {
                    var i = this,
                        n = !1;
                    return (
                        t.ui.ddmanager && !this.options.dropBehaviour && (n = t.ui.ddmanager.drop(this, e)),
                        this.dropped && ((n = this.dropped), (this.dropped = !1)),
                        ("invalid" === this.options.revert && !n) || ("valid" === this.options.revert && n) || !0 === this.options.revert || (t.isFunction(this.options.revert) && this.options.revert.call(this.element, n))
                            ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                                  !1 !== i._trigger("stop", e) && i._clear();
                              })
                            : !1 !== this._trigger("stop", e) && this._clear(),
                        !1
                    );
                },
                _mouseUp: function (e) {
                    return this._unblockFrames(), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), this.handleElement.is(e.target) && this.element.trigger("focus"), t.ui.mouse.prototype._mouseUp.call(this, e);
                },
                cancel: function () {
                    return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new t.Event("mouseup", { target: this.element[0] })) : this._clear(), this;
                },
                _getHandle: function (e) {
                    return !this.options.handle || !!t(e.target).closest(this.element.find(this.options.handle)).length;
                },
                _setHandleClassName: function () {
                    (this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element), this._addClass(this.handleElement, "ui-draggable-handle");
                },
                _removeHandleClassName: function () {
                    this._removeClass(this.handleElement, "ui-draggable-handle");
                },
                _createHelper: function (e) {
                    var i = this.options,
                        n = t.isFunction(i.helper),
                        s = n ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
                    return (
                        s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo),
                        n && s[0] === this.element[0] && this._setPositionRelative(),
                        s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"),
                        s
                    );
                },
                _setPositionRelative: function () {
                    /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative");
                },
                _adjustOffsetFromHelper: function (e) {
                    "string" == typeof e && (e = e.split(" ")),
                        t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }),
                        "left" in e && (this.offset.click.left = e.left + this.margins.left),
                        "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left),
                        "top" in e && (this.offset.click.top = e.top + this.margins.top),
                        "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top);
                },
                _isRootNode: function (t) {
                    return /(html|body)/i.test(t.tagName) || t === this.document[0];
                },
                _getParentOffset: function () {
                    var e = this.offsetParent.offset(),
                        i = this.document[0];
                    return (
                        "absolute" === this.cssPosition && this.scrollParent[0] !== i && t.contains(this.scrollParent[0], this.offsetParent[0]) && ((e.left += this.scrollParent.scrollLeft()), (e.top += this.scrollParent.scrollTop())),
                        this._isRootNode(this.offsetParent[0]) && (e = { top: 0, left: 0 }),
                        { top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) }
                    );
                },
                _getRelativeOffset: function () {
                    if ("relative" !== this.cssPosition) return { top: 0, left: 0 };
                    var t = this.element.position(),
                        e = this._isRootNode(this.scrollParent[0]);
                    return { top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()), left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft()) };
                },
                _cacheMargins: function () {
                    this.margins = {
                        left: parseInt(this.element.css("marginLeft"), 10) || 0,
                        top: parseInt(this.element.css("marginTop"), 10) || 0,
                        right: parseInt(this.element.css("marginRight"), 10) || 0,
                        bottom: parseInt(this.element.css("marginBottom"), 10) || 0,
                    };
                },
                _cacheHelperProportions: function () {
                    this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };
                },
                _setContainment: function () {
                    var e,
                        i,
                        n,
                        s = this.options,
                        o = this.document[0];
                    return (
                        (this.relativeContainer = null),
                        s.containment
                            ? "window" === s.containment
                                ? void (this.containment = [
                                      t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
                                      t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,
                                      t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left,
                                      t(window).scrollTop() + (t(window).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top,
                                  ])
                                : "document" === s.containment
                                ? void (this.containment = [0, 0, t(o).width() - this.helperProportions.width - this.margins.left, (t(o).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top])
                                : s.containment.constructor === Array
                                ? void (this.containment = s.containment)
                                : ("parent" === s.containment && (s.containment = this.helper[0].parentNode),
                                  void (
                                      (n = (i = t(s.containment))[0]) &&
                                      ((e = /(scroll|auto)/.test(i.css("overflow"))),
                                      (this.containment = [
                                          (parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0),
                                          (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0),
                                          (e ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) -
                                              (parseInt(i.css("borderRightWidth"), 10) || 0) -
                                              (parseInt(i.css("paddingRight"), 10) || 0) -
                                              this.helperProportions.width -
                                              this.margins.left -
                                              this.margins.right,
                                          (e ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) -
                                              (parseInt(i.css("borderBottomWidth"), 10) || 0) -
                                              (parseInt(i.css("paddingBottom"), 10) || 0) -
                                              this.helperProportions.height -
                                              this.margins.top -
                                              this.margins.bottom,
                                      ]),
                                      (this.relativeContainer = i))
                                  ))
                            : void (this.containment = null)
                    );
                },
                _convertPositionTo: function (t, e) {
                    e = e || this.position;
                    var i = "absolute" === t ? 1 : -1,
                        n = this._isRootNode(this.scrollParent[0]);
                    return {
                        top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : n ? 0 : this.offset.scroll.top) * i,
                        left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : n ? 0 : this.offset.scroll.left) * i,
                    };
                },
                _generatePosition: function (t, e) {
                    var i,
                        n,
                        s,
                        o,
                        r = this.options,
                        a = this._isRootNode(this.scrollParent[0]),
                        l = t.pageX,
                        h = t.pageY;
                    return (
                        (a && this.offset.scroll) || (this.offset.scroll = { top: this.scrollParent.scrollTop(), left: this.scrollParent.scrollLeft() }),
                        e &&
                            (this.containment &&
                                ((i = this.relativeContainer
                                    ? ((n = this.relativeContainer.offset()), [this.containment[0] + n.left, this.containment[1] + n.top, this.containment[2] + n.left, this.containment[3] + n.top])
                                    : this.containment),
                                t.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left),
                                t.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top),
                                t.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left),
                                t.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)),
                            r.grid &&
                                ((s = r.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY),
                                (h = i ? (s - this.offset.click.top >= i[1] || s - this.offset.click.top > i[3] ? s : s - this.offset.click.top >= i[1] ? s - r.grid[1] : s + r.grid[1]) : s),
                                (o = r.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX),
                                (l = i ? (o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - r.grid[0] : o + r.grid[0]) : o)),
                            "y" === r.axis && (l = this.originalPageX),
                            "x" === r.axis && (h = this.originalPageY)),
                        {
                            top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : a ? 0 : this.offset.scroll.top),
                            left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : a ? 0 : this.offset.scroll.left),
                        }
                    );
                },
                _clear: function () {
                    this._removeClass(this.helper, "ui-draggable-dragging"),
                        this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
                        (this.helper = null),
                        (this.cancelHelperRemoval = !1),
                        this.destroyOnClear && this.destroy();
                },
                _trigger: function (e, i, n) {
                    return (
                        (n = n || this._uiHash()),
                        t.ui.plugin.call(this, e, [i, n, this], !0),
                        /^(drag|start|stop)/.test(e) && ((this.positionAbs = this._convertPositionTo("absolute")), (n.offset = this.positionAbs)),
                        t.Widget.prototype._trigger.call(this, e, i, n)
                    );
                },
                plugins: {},
                _uiHash: function () {
                    return { helper: this.helper, position: this.position, originalPosition: this.originalPosition, offset: this.positionAbs };
                },
            }),
            t.ui.plugin.add("draggable", "connectToSortable", {
                start: function (e, i, n) {
                    var s = t.extend({}, i, { item: n.element });
                    (n.sortables = []),
                        t(n.options.connectToSortable).each(function () {
                            var i = t(this).sortable("instance");
                            i && !i.options.disabled && (n.sortables.push(i), i.refreshPositions(), i._trigger("activate", e, s));
                        });
                },
                stop: function (e, i, n) {
                    var s = t.extend({}, i, { item: n.element });
                    (n.cancelHelperRemoval = !1),
                        t.each(n.sortables, function () {
                            var t = this;
                            t.isOver
                                ? ((t.isOver = 0),
                                  (n.cancelHelperRemoval = !0),
                                  (t.cancelHelperRemoval = !1),
                                  (t._storedCSS = { position: t.placeholder.css("position"), top: t.placeholder.css("top"), left: t.placeholder.css("left") }),
                                  t._mouseStop(e),
                                  (t.options.helper = t.options._helper))
                                : ((t.cancelHelperRemoval = !0), t._trigger("deactivate", e, s));
                        });
                },
                drag: function (e, i, n) {
                    t.each(n.sortables, function () {
                        var s = !1,
                            o = this;
                        (o.positionAbs = n.positionAbs),
                            (o.helperProportions = n.helperProportions),
                            (o.offset.click = n.offset.click),
                            o._intersectsWith(o.containerCache) &&
                                ((s = !0),
                                t.each(n.sortables, function () {
                                    return (
                                        (this.positionAbs = n.positionAbs),
                                        (this.helperProportions = n.helperProportions),
                                        (this.offset.click = n.offset.click),
                                        this !== o && this._intersectsWith(this.containerCache) && t.contains(o.element[0], this.element[0]) && (s = !1),
                                        s
                                    );
                                })),
                            s
                                ? (o.isOver ||
                                      ((o.isOver = 1),
                                      (n._parent = i.helper.parent()),
                                      (o.currentItem = i.helper.appendTo(o.element).data("ui-sortable-item", !0)),
                                      (o.options._helper = o.options.helper),
                                      (o.options.helper = function () {
                                          return i.helper[0];
                                      }),
                                      (e.target = o.currentItem[0]),
                                      o._mouseCapture(e, !0),
                                      o._mouseStart(e, !0, !0),
                                      (o.offset.click.top = n.offset.click.top),
                                      (o.offset.click.left = n.offset.click.left),
                                      (o.offset.parent.left -= n.offset.parent.left - o.offset.parent.left),
                                      (o.offset.parent.top -= n.offset.parent.top - o.offset.parent.top),
                                      n._trigger("toSortable", e),
                                      (n.dropped = o.element),
                                      t.each(n.sortables, function () {
                                          this.refreshPositions();
                                      }),
                                      (n.currentItem = n.element),
                                      (o.fromOutside = n)),
                                  o.currentItem && (o._mouseDrag(e), (i.position = o.position)))
                                : o.isOver &&
                                  ((o.isOver = 0),
                                  (o.cancelHelperRemoval = !0),
                                  (o.options._revert = o.options.revert),
                                  (o.options.revert = !1),
                                  o._trigger("out", e, o._uiHash(o)),
                                  o._mouseStop(e, !0),
                                  (o.options.revert = o.options._revert),
                                  (o.options.helper = o.options._helper),
                                  o.placeholder && o.placeholder.remove(),
                                  i.helper.appendTo(n._parent),
                                  n._refreshOffsets(e),
                                  (i.position = n._generatePosition(e, !0)),
                                  n._trigger("fromSortable", e),
                                  (n.dropped = !1),
                                  t.each(n.sortables, function () {
                                      this.refreshPositions();
                                  }));
                    });
                },
            }),
            t.ui.plugin.add("draggable", "cursor", {
                start: function (e, i, n) {
                    var s = t("body"),
                        o = n.options;
                    s.css("cursor") && (o._cursor = s.css("cursor")), s.css("cursor", o.cursor);
                },
                stop: function (e, i, n) {
                    var s = n.options;
                    s._cursor && t("body").css("cursor", s._cursor);
                },
            }),
            t.ui.plugin.add("draggable", "opacity", {
                start: function (e, i, n) {
                    var s = t(i.helper),
                        o = n.options;
                    s.css("opacity") && (o._opacity = s.css("opacity")), s.css("opacity", o.opacity);
                },
                stop: function (e, i, n) {
                    var s = n.options;
                    s._opacity && t(i.helper).css("opacity", s._opacity);
                },
            }),
            t.ui.plugin.add("draggable", "scroll", {
                start: function (t, e, i) {
                    i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)),
                        i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset());
                },
                drag: function (e, i, n) {
                    var s = n.options,
                        o = !1,
                        r = n.scrollParentNotHidden[0],
                        a = n.document[0];
                    r !== a && "HTML" !== r.tagName
                        ? ((s.axis && "x" === s.axis) ||
                              (n.overflowOffset.top + r.offsetHeight - e.pageY < s.scrollSensitivity
                                  ? (r.scrollTop = o = r.scrollTop + s.scrollSpeed)
                                  : e.pageY - n.overflowOffset.top < s.scrollSensitivity && (r.scrollTop = o = r.scrollTop - s.scrollSpeed)),
                          (s.axis && "y" === s.axis) ||
                              (n.overflowOffset.left + r.offsetWidth - e.pageX < s.scrollSensitivity
                                  ? (r.scrollLeft = o = r.scrollLeft + s.scrollSpeed)
                                  : e.pageX - n.overflowOffset.left < s.scrollSensitivity && (r.scrollLeft = o = r.scrollLeft - s.scrollSpeed)))
                        : ((s.axis && "x" === s.axis) ||
                              (e.pageY - t(a).scrollTop() < s.scrollSensitivity
                                  ? (o = t(a).scrollTop(t(a).scrollTop() - s.scrollSpeed))
                                  : t(window).height() - (e.pageY - t(a).scrollTop()) < s.scrollSensitivity && (o = t(a).scrollTop(t(a).scrollTop() + s.scrollSpeed))),
                          (s.axis && "y" === s.axis) ||
                              (e.pageX - t(a).scrollLeft() < s.scrollSensitivity
                                  ? (o = t(a).scrollLeft(t(a).scrollLeft() - s.scrollSpeed))
                                  : t(window).width() - (e.pageX - t(a).scrollLeft()) < s.scrollSensitivity && (o = t(a).scrollLeft(t(a).scrollLeft() + s.scrollSpeed)))),
                        !1 !== o && t.ui.ddmanager && !s.dropBehaviour && t.ui.ddmanager.prepareOffsets(n, e);
                },
            }),
            t.ui.plugin.add("draggable", "snap", {
                start: function (e, i, n) {
                    var s = n.options;
                    (n.snapElements = []),
                        t(s.snap.constructor !== String ? s.snap.items || ":data(ui-draggable)" : s.snap).each(function () {
                            var e = t(this),
                                i = e.offset();
                            this !== n.element[0] && n.snapElements.push({ item: this, width: e.outerWidth(), height: e.outerHeight(), top: i.top, left: i.left });
                        });
                },
                drag: function (e, i, n) {
                    var s,
                        o,
                        r,
                        a,
                        l,
                        h,
                        c,
                        u,
                        d,
                        p,
                        f = n.options,
                        g = f.snapTolerance,
                        m = i.offset.left,
                        v = m + n.helperProportions.width,
                        _ = i.offset.top,
                        b = _ + n.helperProportions.height;
                    for (d = n.snapElements.length - 1; 0 <= d; d--)
                        (h = (l = n.snapElements[d].left - n.margins.left) + n.snapElements[d].width),
                            (u = (c = n.snapElements[d].top - n.margins.top) + n.snapElements[d].height),
                            v < l - g || h + g < m || b < c - g || u + g < _ || !t.contains(n.snapElements[d].item.ownerDocument, n.snapElements[d].item)
                                ? (n.snapElements[d].snapping && n.options.snap.release && n.options.snap.release.call(n.element, e, t.extend(n._uiHash(), { snapItem: n.snapElements[d].item })), (n.snapElements[d].snapping = !1))
                                : ("inner" !== f.snapMode &&
                                      ((s = g >= Math.abs(c - b)),
                                      (o = g >= Math.abs(u - _)),
                                      (r = g >= Math.abs(l - v)),
                                      (a = g >= Math.abs(h - m)),
                                      s && (i.position.top = n._convertPositionTo("relative", { top: c - n.helperProportions.height, left: 0 }).top),
                                      o && (i.position.top = n._convertPositionTo("relative", { top: u, left: 0 }).top),
                                      r && (i.position.left = n._convertPositionTo("relative", { top: 0, left: l - n.helperProportions.width }).left),
                                      a && (i.position.left = n._convertPositionTo("relative", { top: 0, left: h }).left)),
                                  (p = s || o || r || a),
                                  "outer" !== f.snapMode &&
                                      ((s = g >= Math.abs(c - _)),
                                      (o = g >= Math.abs(u - b)),
                                      (r = g >= Math.abs(l - m)),
                                      (a = g >= Math.abs(h - v)),
                                      s && (i.position.top = n._convertPositionTo("relative", { top: c, left: 0 }).top),
                                      o && (i.position.top = n._convertPositionTo("relative", { top: u - n.helperProportions.height, left: 0 }).top),
                                      r && (i.position.left = n._convertPositionTo("relative", { top: 0, left: l }).left),
                                      a && (i.position.left = n._convertPositionTo("relative", { top: 0, left: h - n.helperProportions.width }).left)),
                                  !n.snapElements[d].snapping && (s || o || r || a || p) && n.options.snap.snap && n.options.snap.snap.call(n.element, e, t.extend(n._uiHash(), { snapItem: n.snapElements[d].item })),
                                  (n.snapElements[d].snapping = s || o || r || a || p));
                },
            }),
            t.ui.plugin.add("draggable", "stack", {
                start: function (e, i, n) {
                    var s,
                        o = n.options,
                        r = t.makeArray(t(o.stack)).sort(function (e, i) {
                            return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0);
                        });
                    r.length &&
                        ((s = parseInt(t(r[0]).css("zIndex"), 10) || 0),
                        t(r).each(function (e) {
                            t(this).css("zIndex", s + e);
                        }),
                        this.css("zIndex", s + r.length));
                },
            }),
            t.ui.plugin.add("draggable", "zIndex", {
                start: function (e, i, n) {
                    var s = t(i.helper),
                        o = n.options;
                    s.css("zIndex") && (o._zIndex = s.css("zIndex")), s.css("zIndex", o.zIndex);
                },
                stop: function (e, i, n) {
                    var s = n.options;
                    s._zIndex && t(i.helper).css("zIndex", s._zIndex);
                },
            }),
            t.ui.draggable,
            t.widget("ui.resizable", t.ui.mouse, {
                version: "1.12.1",
                widgetEventPrefix: "resize",
                options: {
                    alsoResize: !1,
                    animate: !1,
                    animateDuration: "slow",
                    animateEasing: "swing",
                    aspectRatio: !1,
                    autoHide: !1,
                    classes: { "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se" },
                    containment: !1,
                    ghost: !1,
                    grid: !1,
                    handles: "e,s,se",
                    helper: !1,
                    maxHeight: null,
                    maxWidth: null,
                    minHeight: 10,
                    minWidth: 10,
                    zIndex: 90,
                    resize: null,
                    start: null,
                    stop: null,
                },
                _num: function (t) {
                    return parseFloat(t) || 0;
                },
                _isNumber: function (t) {
                    return !isNaN(parseFloat(t));
                },
                _hasScroll: function (e, i) {
                    if ("hidden" === t(e).css("overflow")) return !1;
                    var n = i && "left" === i ? "scrollLeft" : "scrollTop",
                        s = !1;
                    return 0 < e[n] || ((e[n] = 1), (s = 0 < e[n]), (e[n] = 0), s);
                },
                _create: function () {
                    var e,
                        i = this.options,
                        n = this;
                    this._addClass("ui-resizable"),
                        t.extend(this, {
                            _aspectRatio: !!i.aspectRatio,
                            aspectRatio: i.aspectRatio,
                            originalElement: this.element,
                            _proportionallyResizeElements: [],
                            _helper: i.helper || i.ghost || i.animate ? i.helper || "ui-resizable-helper" : null,
                        }),
                        this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) &&
                            (this.element.wrap(
                                t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                                    position: this.element.css("position"),
                                    width: this.element.outerWidth(),
                                    height: this.element.outerHeight(),
                                    top: this.element.css("top"),
                                    left: this.element.css("left"),
                                })
                            ),
                            (this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance"))),
                            (this.elementIsWrapper = !0),
                            (e = {
                                marginTop: this.originalElement.css("marginTop"),
                                marginRight: this.originalElement.css("marginRight"),
                                marginBottom: this.originalElement.css("marginBottom"),
                                marginLeft: this.originalElement.css("marginLeft"),
                            }),
                            this.element.css(e),
                            this.originalElement.css("margin", 0),
                            (this.originalResizeStyle = this.originalElement.css("resize")),
                            this.originalElement.css("resize", "none"),
                            this._proportionallyResizeElements.push(this.originalElement.css({ position: "static", zoom: 1, display: "block" })),
                            this.originalElement.css(e),
                            this._proportionallyResize()),
                        this._setupHandles(),
                        i.autoHide &&
                            t(this.element)
                                .on("mouseenter", function () {
                                    i.disabled || (n._removeClass("ui-resizable-autohide"), n._handles.show());
                                })
                                .on("mouseleave", function () {
                                    i.disabled || n.resizing || (n._addClass("ui-resizable-autohide"), n._handles.hide());
                                }),
                        this._mouseInit();
                },
                _destroy: function () {
                    function e(e) {
                        t(e).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove();
                    }
                    var i;
                    return (
                        this._mouseDestroy(),
                        this.elementIsWrapper &&
                            (e(this.element), (i = this.element), this.originalElement.css({ position: i.css("position"), width: i.outerWidth(), height: i.outerHeight(), top: i.css("top"), left: i.css("left") }).insertAfter(i), i.remove()),
                        this.originalElement.css("resize", this.originalResizeStyle),
                        e(this.originalElement),
                        this
                    );
                },
                _setOption: function (t, e) {
                    switch ((this._super(t, e), t)) {
                        case "handles":
                            this._removeHandles(), this._setupHandles();
                    }
                },
                _setupHandles: function () {
                    var e,
                        i,
                        n,
                        s,
                        o,
                        r = this.options,
                        a = this;
                    if (
                        ((this.handles =
                            r.handles ||
                            (t(".ui-resizable-handle", this.element).length
                                ? { n: ".ui-resizable-n", e: ".ui-resizable-e", s: ".ui-resizable-s", w: ".ui-resizable-w", se: ".ui-resizable-se", sw: ".ui-resizable-sw", ne: ".ui-resizable-ne", nw: ".ui-resizable-nw" }
                                : "e,s,se")),
                        (this._handles = t()),
                        this.handles.constructor === String)
                    )
                        for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), n = this.handles.split(","), this.handles = {}, i = 0; n.length > i; i++)
                            (s = "ui-resizable-" + (e = t.trim(n[i]))), (o = t("<div>")), this._addClass(o, "ui-resizable-handle " + s), o.css({ zIndex: r.zIndex }), (this.handles[e] = ".ui-resizable-" + e), this.element.append(o);
                    (this._renderAxis = function (e) {
                        var i, n, s, o;
                        for (i in ((e = e || this.element), this.handles))
                            this.handles[i].constructor === String
                                ? (this.handles[i] = this.element.children(this.handles[i]).first().show())
                                : (this.handles[i].jquery || this.handles[i].nodeType) && ((this.handles[i] = t(this.handles[i])), this._on(this.handles[i], { mousedown: a._mouseDown })),
                                this.elementIsWrapper &&
                                    this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) &&
                                    ((n = t(this.handles[i], this.element)),
                                    (o = /sw|ne|nw|se|n|s/.test(i) ? n.outerHeight() : n.outerWidth()),
                                    (s = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join("")),
                                    e.css(s, o),
                                    this._proportionallyResize()),
                                (this._handles = this._handles.add(this.handles[i]));
                    }),
                        this._renderAxis(this.element),
                        (this._handles = this._handles.add(this.element.find(".ui-resizable-handle"))),
                        this._handles.disableSelection(),
                        this._handles.on("mouseover", function () {
                            a.resizing || (this.className && (o = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), (a.axis = o && o[1] ? o[1] : "se"));
                        }),
                        r.autoHide && (this._handles.hide(), this._addClass("ui-resizable-autohide"));
                },
                _removeHandles: function () {
                    this._handles.remove();
                },
                _mouseCapture: function (e) {
                    var i,
                        n,
                        s = !1;
                    for (i in this.handles) ((n = t(this.handles[i])[0]) !== e.target && !t.contains(n, e.target)) || (s = !0);
                    return !this.options.disabled && s;
                },
                _mouseStart: function (e) {
                    var i,
                        n,
                        s,
                        o = this.options,
                        r = this.element;
                    return (
                        (this.resizing = !0),
                        this._renderProxy(),
                        (i = this._num(this.helper.css("left"))),
                        (n = this._num(this.helper.css("top"))),
                        o.containment && ((i += t(o.containment).scrollLeft() || 0), (n += t(o.containment).scrollTop() || 0)),
                        (this.offset = this.helper.offset()),
                        (this.position = { left: i, top: n }),
                        (this.size = this._helper ? { width: this.helper.width(), height: this.helper.height() } : { width: r.width(), height: r.height() }),
                        (this.originalSize = this._helper ? { width: r.outerWidth(), height: r.outerHeight() } : { width: r.width(), height: r.height() }),
                        (this.sizeDiff = { width: r.outerWidth() - r.width(), height: r.outerHeight() - r.height() }),
                        (this.originalPosition = { left: i, top: n }),
                        (this.originalMousePosition = { left: e.pageX, top: e.pageY }),
                        (this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1),
                        (s = t(".ui-resizable-" + this.axis).css("cursor")),
                        t("body").css("cursor", "auto" === s ? this.axis + "-resize" : s),
                        this._addClass("ui-resizable-resizing"),
                        this._propagate("start", e),
                        !0
                    );
                },
                _mouseDrag: function (e) {
                    var i,
                        n,
                        s = this.originalMousePosition,
                        o = this.axis,
                        r = e.pageX - s.left || 0,
                        a = e.pageY - s.top || 0,
                        l = this._change[o];
                    return (
                        this._updatePrevProperties(),
                        l &&
                            ((i = l.apply(this, [e, r, a])),
                            this._updateVirtualBoundaries(e.shiftKey),
                            (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)),
                            (i = this._respectSize(i, e)),
                            this._updateCache(i),
                            this._propagate("resize", e),
                            (n = this._applyChanges()),
                            !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(),
                            t.isEmptyObject(n) || (this._updatePrevProperties(), this._trigger("resize", e, this.ui()), this._applyChanges())),
                        !1
                    );
                },
                _mouseStop: function (e) {
                    this.resizing = !1;
                    var i,
                        n,
                        s,
                        o,
                        r,
                        a,
                        l,
                        h = this.options,
                        c = this;
                    return (
                        this._helper &&
                            ((s = (n = (i = this._proportionallyResizeElements).length && /textarea/i.test(i[0].nodeName)) && this._hasScroll(i[0], "left") ? 0 : c.sizeDiff.height),
                            (o = n ? 0 : c.sizeDiff.width),
                            (r = { width: c.helper.width() - o, height: c.helper.height() - s }),
                            (a = parseFloat(c.element.css("left")) + (c.position.left - c.originalPosition.left) || null),
                            (l = parseFloat(c.element.css("top")) + (c.position.top - c.originalPosition.top) || null),
                            h.animate || this.element.css(t.extend(r, { top: l, left: a })),
                            c.helper.height(c.size.height),
                            c.helper.width(c.size.width),
                            this._helper && !h.animate && this._proportionallyResize()),
                        t("body").css("cursor", "auto"),
                        this._removeClass("ui-resizable-resizing"),
                        this._propagate("stop", e),
                        this._helper && this.helper.remove(),
                        !1
                    );
                },
                _updatePrevProperties: function () {
                    (this.prevPosition = { top: this.position.top, left: this.position.left }), (this.prevSize = { width: this.size.width, height: this.size.height });
                },
                _applyChanges: function () {
                    var t = {};
                    return (
                        this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"),
                        this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"),
                        this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"),
                        this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"),
                        this.helper.css(t),
                        t
                    );
                },
                _updateVirtualBoundaries: function (t) {
                    var e,
                        i,
                        n,
                        s,
                        o,
                        r = this.options;
                    (o = {
                        minWidth: this._isNumber(r.minWidth) ? r.minWidth : 0,
                        maxWidth: this._isNumber(r.maxWidth) ? r.maxWidth : 1 / 0,
                        minHeight: this._isNumber(r.minHeight) ? r.minHeight : 0,
                        maxHeight: this._isNumber(r.maxHeight) ? r.maxHeight : 1 / 0,
                    }),
                        (this._aspectRatio || t) &&
                            ((e = o.minHeight * this.aspectRatio),
                            (n = o.minWidth / this.aspectRatio),
                            (i = o.maxHeight * this.aspectRatio),
                            (s = o.maxWidth / this.aspectRatio),
                            e > o.minWidth && (o.minWidth = e),
                            n > o.minHeight && (o.minHeight = n),
                            o.maxWidth > i && (o.maxWidth = i),
                            o.maxHeight > s && (o.maxHeight = s)),
                        (this._vBoundaries = o);
                },
                _updateCache: function (t) {
                    (this.offset = this.helper.offset()),
                        this._isNumber(t.left) && (this.position.left = t.left),
                        this._isNumber(t.top) && (this.position.top = t.top),
                        this._isNumber(t.height) && (this.size.height = t.height),
                        this._isNumber(t.width) && (this.size.width = t.width);
                },
                _updateRatio: function (t) {
                    var e = this.position,
                        i = this.size,
                        n = this.axis;
                    return (
                        this._isNumber(t.height) ? (t.width = t.height * this.aspectRatio) : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio),
                        "sw" === n && ((t.left = e.left + (i.width - t.width)), (t.top = null)),
                        "nw" === n && ((t.top = e.top + (i.height - t.height)), (t.left = e.left + (i.width - t.width))),
                        t
                    );
                },
                _respectSize: function (t) {
                    var e = this._vBoundaries,
                        i = this.axis,
                        n = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
                        s = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
                        o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
                        r = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
                        a = this.originalPosition.left + this.originalSize.width,
                        l = this.originalPosition.top + this.originalSize.height,
                        h = /sw|nw|w/.test(i),
                        c = /nw|ne|n/.test(i);
                    return (
                        o && (t.width = e.minWidth),
                        r && (t.height = e.minHeight),
                        n && (t.width = e.maxWidth),
                        s && (t.height = e.maxHeight),
                        o && h && (t.left = a - e.minWidth),
                        n && h && (t.left = a - e.maxWidth),
                        r && c && (t.top = l - e.minHeight),
                        s && c && (t.top = l - e.maxHeight),
                        t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : (t.top = null),
                        t
                    );
                },
                _getPaddingPlusBorderDimensions: function (t) {
                    for (
                        var e = 0,
                            i = [],
                            n = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")],
                            s = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")];
                        e < 4;
                        e++
                    )
                        (i[e] = parseFloat(n[e]) || 0), (i[e] += parseFloat(s[e]) || 0);
                    return { height: i[0] + i[2], width: i[1] + i[3] };
                },
                _proportionallyResize: function () {
                    if (this._proportionallyResizeElements.length)
                        for (var t, e = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > e; e++)
                            (t = this._proportionallyResizeElements[e]),
                                this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)),
                                t.css({ height: i.height() - this.outerDimensions.height || 0, width: i.width() - this.outerDimensions.width || 0 });
                },
                _renderProxy: function () {
                    var e = this.element,
                        i = this.options;
                    (this.elementOffset = e.offset()),
                        this._helper
                            ? ((this.helper = this.helper || t("<div style='overflow:hidden;'></div>")),
                              this._addClass(this.helper, this._helper),
                              this.helper.css({ width: this.element.outerWidth(), height: this.element.outerHeight(), position: "absolute", left: this.elementOffset.left + "px", top: this.elementOffset.top + "px", zIndex: ++i.zIndex }),
                              this.helper.appendTo("body").disableSelection())
                            : (this.helper = this.element);
                },
                _change: {
                    e: function (t, e) {
                        return { width: this.originalSize.width + e };
                    },
                    w: function (t, e) {
                        var i = this.originalSize;
                        return { left: this.originalPosition.left + e, width: i.width - e };
                    },
                    n: function (t, e, i) {
                        var n = this.originalSize;
                        return { top: this.originalPosition.top + i, height: n.height - i };
                    },
                    s: function (t, e, i) {
                        return { height: this.originalSize.height + i };
                    },
                    se: function (e, i, n) {
                        return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, n]));
                    },
                    sw: function (e, i, n) {
                        return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, n]));
                    },
                    ne: function (e, i, n) {
                        return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, n]));
                    },
                    nw: function (e, i, n) {
                        return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, n]));
                    },
                },
                _propagate: function (e, i) {
                    t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui());
                },
                plugins: {},
                ui: function () {
                    return { originalElement: this.originalElement, element: this.element, helper: this.helper, position: this.position, size: this.size, originalSize: this.originalSize, originalPosition: this.originalPosition };
                },
            }),
            t.ui.plugin.add("resizable", "animate", {
                stop: function (e) {
                    var i = t(this).resizable("instance"),
                        n = i.options,
                        s = i._proportionallyResizeElements,
                        o = s.length && /textarea/i.test(s[0].nodeName),
                        r = o && i._hasScroll(s[0], "left") ? 0 : i.sizeDiff.height,
                        a = o ? 0 : i.sizeDiff.width,
                        l = { width: i.size.width - a, height: i.size.height - r },
                        h = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null,
                        c = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null;
                    i.element.animate(t.extend(l, c && h ? { top: c, left: h } : {}), {
                        duration: n.animateDuration,
                        easing: n.animateEasing,
                        step: function () {
                            var n = { width: parseFloat(i.element.css("width")), height: parseFloat(i.element.css("height")), top: parseFloat(i.element.css("top")), left: parseFloat(i.element.css("left")) };
                            s && s.length && t(s[0]).css({ width: n.width, height: n.height }), i._updateCache(n), i._propagate("resize", e);
                        },
                    });
                },
            }),
            t.ui.plugin.add("resizable", "containment", {
                start: function () {
                    var e,
                        i,
                        n,
                        s,
                        o,
                        r,
                        a,
                        l = t(this).resizable("instance"),
                        h = l.options,
                        c = l.element,
                        u = h.containment,
                        d = u instanceof t ? u.get(0) : /parent/.test(u) ? c.parent().get(0) : u;
                    d &&
                        ((l.containerElement = t(d)),
                        /document/.test(u) || u === document
                            ? ((l.containerOffset = { left: 0, top: 0 }),
                              (l.containerPosition = { left: 0, top: 0 }),
                              (l.parentData = { element: t(document), left: 0, top: 0, width: t(document).width(), height: t(document).height() || document.body.parentNode.scrollHeight }))
                            : ((e = t(d)),
                              (i = []),
                              t(["Top", "Right", "Left", "Bottom"]).each(function (t, n) {
                                  i[t] = l._num(e.css("padding" + n));
                              }),
                              (l.containerOffset = e.offset()),
                              (l.containerPosition = e.position()),
                              (l.containerSize = { height: e.innerHeight() - i[3], width: e.innerWidth() - i[1] }),
                              (n = l.containerOffset),
                              (s = l.containerSize.height),
                              (o = l.containerSize.width),
                              (r = l._hasScroll(d, "left") ? d.scrollWidth : o),
                              (a = l._hasScroll(d) ? d.scrollHeight : s),
                              (l.parentData = { element: d, left: n.left, top: n.top, width: r, height: a })));
                },
                resize: function (e) {
                    var i,
                        n,
                        s,
                        o,
                        r = t(this).resizable("instance"),
                        a = r.options,
                        l = r.containerOffset,
                        h = r.position,
                        c = r._aspectRatio || e.shiftKey,
                        u = { top: 0, left: 0 },
                        d = r.containerElement,
                        p = !0;
                    d[0] !== document && /static/.test(d.css("position")) && (u = l),
                        h.left < (r._helper ? l.left : 0) &&
                            ((r.size.width = r.size.width + (r._helper ? r.position.left - l.left : r.position.left - u.left)), c && ((r.size.height = r.size.width / r.aspectRatio), (p = !1)), (r.position.left = a.helper ? l.left : 0)),
                        h.top < (r._helper ? l.top : 0) &&
                            ((r.size.height = r.size.height + (r._helper ? r.position.top - l.top : r.position.top)), c && ((r.size.width = r.size.height * r.aspectRatio), (p = !1)), (r.position.top = r._helper ? l.top : 0)),
                        (s = r.containerElement.get(0) === r.element.parent().get(0)),
                        (o = /relative|absolute/.test(r.containerElement.css("position"))),
                        s && o ? ((r.offset.left = r.parentData.left + r.position.left), (r.offset.top = r.parentData.top + r.position.top)) : ((r.offset.left = r.element.offset().left), (r.offset.top = r.element.offset().top)),
                        (i = Math.abs(r.sizeDiff.width + (r._helper ? r.offset.left - u.left : r.offset.left - l.left))),
                        (n = Math.abs(r.sizeDiff.height + (r._helper ? r.offset.top - u.top : r.offset.top - l.top))),
                        i + r.size.width >= r.parentData.width && ((r.size.width = r.parentData.width - i), c && ((r.size.height = r.size.width / r.aspectRatio), (p = !1))),
                        n + r.size.height >= r.parentData.height && ((r.size.height = r.parentData.height - n), c && ((r.size.width = r.size.height * r.aspectRatio), (p = !1))),
                        p || ((r.position.left = r.prevPosition.left), (r.position.top = r.prevPosition.top), (r.size.width = r.prevSize.width), (r.size.height = r.prevSize.height));
                },
                stop: function () {
                    var e = t(this).resizable("instance"),
                        i = e.options,
                        n = e.containerOffset,
                        s = e.containerPosition,
                        o = e.containerElement,
                        r = t(e.helper),
                        a = r.offset(),
                        l = r.outerWidth() - e.sizeDiff.width,
                        h = r.outerHeight() - e.sizeDiff.height;
                    e._helper && !i.animate && /relative/.test(o.css("position")) && t(this).css({ left: a.left - s.left - n.left, width: l, height: h }),
                        e._helper && !i.animate && /static/.test(o.css("position")) && t(this).css({ left: a.left - s.left - n.left, width: l, height: h });
                },
            }),
            t.ui.plugin.add("resizable", "alsoResize", {
                start: function () {
                    var e = t(this).resizable("instance").options;
                    t(e.alsoResize).each(function () {
                        var e = t(this);
                        e.data("ui-resizable-alsoresize", { width: parseFloat(e.width()), height: parseFloat(e.height()), left: parseFloat(e.css("left")), top: parseFloat(e.css("top")) });
                    });
                },
                resize: function (e, i) {
                    var n = t(this).resizable("instance"),
                        s = n.options,
                        o = n.originalSize,
                        r = n.originalPosition,
                        a = { height: n.size.height - o.height || 0, width: n.size.width - o.width || 0, top: n.position.top - r.top || 0, left: n.position.left - r.left || 0 };
                    t(s.alsoResize).each(function () {
                        var e = t(this),
                            n = t(this).data("ui-resizable-alsoresize"),
                            s = {},
                            o = e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        t.each(o, function (t, e) {
                            var i = (n[e] || 0) + (a[e] || 0);
                            i && 0 <= i && (s[e] = i || null);
                        }),
                            e.css(s);
                    });
                },
                stop: function () {
                    t(this).removeData("ui-resizable-alsoresize");
                },
            }),
            t.ui.plugin.add("resizable", "ghost", {
                start: function () {
                    var e = t(this).resizable("instance"),
                        i = e.size;
                    (e.ghost = e.originalElement.clone()),
                        e.ghost.css({ opacity: 0.25, display: "block", position: "relative", height: i.height, width: i.width, margin: 0, left: 0, top: 0 }),
                        e._addClass(e.ghost, "ui-resizable-ghost"),
                        !1 !== t.uiBackCompat && "string" == typeof e.options.ghost && e.ghost.addClass(this.options.ghost),
                        e.ghost.appendTo(e.helper);
                },
                resize: function () {
                    var e = t(this).resizable("instance");
                    e.ghost && e.ghost.css({ position: "relative", height: e.size.height, width: e.size.width });
                },
                stop: function () {
                    var e = t(this).resizable("instance");
                    e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0));
                },
            }),
            t.ui.plugin.add("resizable", "grid", {
                resize: function () {
                    var e,
                        i = t(this).resizable("instance"),
                        n = i.options,
                        s = i.size,
                        o = i.originalSize,
                        r = i.originalPosition,
                        a = i.axis,
                        l = "number" == typeof n.grid ? [n.grid, n.grid] : n.grid,
                        h = l[0] || 1,
                        c = l[1] || 1,
                        u = Math.round((s.width - o.width) / h) * h,
                        d = Math.round((s.height - o.height) / c) * c,
                        p = o.width + u,
                        f = o.height + d,
                        g = n.maxWidth && p > n.maxWidth,
                        m = n.maxHeight && f > n.maxHeight,
                        v = n.minWidth && n.minWidth > p,
                        _ = n.minHeight && n.minHeight > f;
                    (n.grid = l),
                        v && (p += h),
                        _ && (f += c),
                        g && (p -= h),
                        m && (f -= c),
                        /^(se|s|e)$/.test(a)
                            ? ((i.size.width = p), (i.size.height = f))
                            : /^(ne)$/.test(a)
                            ? ((i.size.width = p), (i.size.height = f), (i.position.top = r.top - d))
                            : /^(sw)$/.test(a)
                            ? ((i.size.width = p), (i.size.height = f), (i.position.left = r.left - u))
                            : ((f - c <= 0 || p - h <= 0) && (e = i._getPaddingPlusBorderDimensions(this)),
                              0 < f - c ? ((i.size.height = f), (i.position.top = r.top - d)) : ((f = c - e.height), (i.size.height = f), (i.position.top = r.top + o.height - f)),
                              0 < p - h ? ((i.size.width = p), (i.position.left = r.left - u)) : ((p = h - e.width), (i.size.width = p), (i.position.left = r.left + o.width - p)));
                },
            }),
            t.ui.resizable,
            t.widget("ui.dialog", {
                version: "1.12.1",
                options: {
                    appendTo: "body",
                    autoOpen: !0,
                    buttons: [],
                    classes: { "ui-dialog": "ui-corner-all", "ui-dialog-titlebar": "ui-corner-all" },
                    closeOnEscape: !0,
                    closeText: "Close",
                    draggable: !0,
                    hide: null,
                    height: "auto",
                    maxHeight: null,
                    maxWidth: null,
                    minHeight: 150,
                    minWidth: 150,
                    modal: !1,
                    position: {
                        my: "center",
                        at: "center",
                        of: window,
                        collision: "fit",
                        using: function (e) {
                            var i = t(this).css(e).offset().top;
                            i < 0 && t(this).css("top", e.top - i);
                        },
                    },
                    resizable: !0,
                    show: null,
                    title: null,
                    width: 300,
                    beforeClose: null,
                    close: null,
                    drag: null,
                    dragStart: null,
                    dragStop: null,
                    focus: null,
                    open: null,
                    resize: null,
                    resizeStart: null,
                    resizeStop: null,
                },
                sizeRelatedOptions: { buttons: !0, height: !0, maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0, width: !0 },
                resizableRelatedOptions: { maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0 },
                _create: function () {
                    (this.originalCss = {
                        display: this.element[0].style.display,
                        width: this.element[0].style.width,
                        minHeight: this.element[0].style.minHeight,
                        maxHeight: this.element[0].style.maxHeight,
                        height: this.element[0].style.height,
                    }),
                        (this.originalPosition = { parent: this.element.parent(), index: this.element.parent().children().index(this.element) }),
                        (this.originalTitle = this.element.attr("title")),
                        null == this.options.title && null != this.originalTitle && (this.options.title = this.originalTitle),
                        this.options.disabled && (this.options.disabled = !1),
                        this._createWrapper(),
                        this.element.show().removeAttr("title").appendTo(this.uiDialog),
                        this._addClass("ui-dialog-content", "ui-widget-content"),
                        this._createTitlebar(),
                        this._createButtonPane(),
                        this.options.draggable && t.fn.draggable && this._makeDraggable(),
                        this.options.resizable && t.fn.resizable && this._makeResizable(),
                        (this._isOpen = !1),
                        this._trackFocus();
                },
                _init: function () {
                    this.options.autoOpen && this.open();
                },
                _appendTo: function () {
                    var e = this.options.appendTo;
                    return e && (e.jquery || e.nodeType) ? t(e) : this.document.find(e || "body").eq(0);
                },
                _destroy: function () {
                    var t,
                        e = this.originalPosition;
                    this._untrackInstance(),
                        this._destroyOverlay(),
                        this.element.removeUniqueId().css(this.originalCss).detach(),
                        this.uiDialog.remove(),
                        this.originalTitle && this.element.attr("title", this.originalTitle),
                        (t = e.parent.children().eq(e.index)).length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element);
                },
                widget: function () {
                    return this.uiDialog;
                },
                disable: t.noop,
                enable: t.noop,
                close: function (e) {
                    var i = this;
                    this._isOpen &&
                        !1 !== this._trigger("beforeClose", e) &&
                        ((this._isOpen = !1),
                        (this._focusedElement = null),
                        this._destroyOverlay(),
                        this._untrackInstance(),
                        this.opener.filter(":focusable").trigger("focus").length || t.ui.safeBlur(t.ui.safeActiveElement(this.document[0])),
                        this._hide(this.uiDialog, this.options.hide, function () {
                            i._trigger("close", e);
                        }));
                },
                isOpen: function () {
                    return this._isOpen;
                },
                moveToTop: function () {
                    this._moveToTop();
                },
                _moveToTop: function (e, i) {
                    var n = !1,
                        s = this.uiDialog
                            .siblings(".ui-front:visible")
                            .map(function () {
                                return +t(this).css("z-index");
                            })
                            .get(),
                        o = Math.max.apply(null, s);
                    return o >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", o + 1), (n = !0)), n && !i && this._trigger("focus", e), n;
                },
                open: function () {
                    var e = this;
                    return this._isOpen
                        ? void (this._moveToTop() && this._focusTabbable())
                        : ((this._isOpen = !0),
                          (this.opener = t(t.ui.safeActiveElement(this.document[0]))),
                          this._size(),
                          this._position(),
                          this._createOverlay(),
                          this._moveToTop(null, !0),
                          this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1),
                          this._show(this.uiDialog, this.options.show, function () {
                              e._focusTabbable(), e._trigger("focus");
                          }),
                          this._makeFocusTarget(),
                          void this._trigger("open"));
                },
                _focusTabbable: function () {
                    var t = this._focusedElement;
                    (t = t || this.element.find("[autofocus]")).length || (t = this.element.find(":tabbable")),
                        t.length || (t = this.uiDialogButtonPane.find(":tabbable")),
                        t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")),
                        t.length || (t = this.uiDialog),
                        t.eq(0).trigger("focus");
                },
                _keepFocus: function (e) {
                    function i() {
                        var e = t.ui.safeActiveElement(this.document[0]);
                        this.uiDialog[0] === e || t.contains(this.uiDialog[0], e) || this._focusTabbable();
                    }
                    e.preventDefault(), i.call(this), this._delay(i);
                },
                _createWrapper: function () {
                    (this.uiDialog = t("<div>").hide().attr({ tabIndex: -1, role: "dialog" }).appendTo(this._appendTo())),
                        this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front"),
                        this._on(this.uiDialog, {
                            keydown: function (e) {
                                if (this.options.closeOnEscape && !e.isDefaultPrevented() && e.keyCode && e.keyCode === t.ui.keyCode.ESCAPE) return e.preventDefault(), void this.close(e);
                                if (e.keyCode === t.ui.keyCode.TAB && !e.isDefaultPrevented()) {
                                    var i = this.uiDialog.find(":tabbable"),
                                        n = i.filter(":first"),
                                        s = i.filter(":last");
                                    (e.target !== s[0] && e.target !== this.uiDialog[0]) || e.shiftKey
                                        ? (e.target !== n[0] && e.target !== this.uiDialog[0]) ||
                                          !e.shiftKey ||
                                          (this._delay(function () {
                                              s.trigger("focus");
                                          }),
                                          e.preventDefault())
                                        : (this._delay(function () {
                                              n.trigger("focus");
                                          }),
                                          e.preventDefault());
                                }
                            },
                            mousedown: function (t) {
                                this._moveToTop(t) && this._focusTabbable();
                            },
                        }),
                        this.element.find("[aria-describedby]").length || this.uiDialog.attr({ "aria-describedby": this.element.uniqueId().attr("id") });
                },
                _createTitlebar: function () {
                    var e;
                    (this.uiDialogTitlebar = t("<div>")),
                        this._addClass(this.uiDialogTitlebar, "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix"),
                        this._on(this.uiDialogTitlebar, {
                            mousedown: function (e) {
                                t(e.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.trigger("focus");
                            },
                        }),
                        (this.uiDialogTitlebarClose = t("<button type='button'></button>")
                            .button({ label: t("<a>").text(this.options.closeText).html(), icon: "ui-icon-closethick", showLabel: !1 })
                            .appendTo(this.uiDialogTitlebar)),
                        this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close"),
                        this._on(this.uiDialogTitlebarClose, {
                            click: function (t) {
                                t.preventDefault(), this.close(t);
                            },
                        }),
                        (e = t("<span>").uniqueId().prependTo(this.uiDialogTitlebar)),
                        this._addClass(e, "ui-dialog-title"),
                        this._title(e),
                        this.uiDialogTitlebar.prependTo(this.uiDialog),
                        this.uiDialog.attr({ "aria-labelledby": e.attr("id") });
                },
                _title: function (t) {
                    this.options.title ? t.text(this.options.title) : t.html("&#160;");
                },
                _createButtonPane: function () {
                    (this.uiDialogButtonPane = t("<div>")),
                        this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane", "ui-widget-content ui-helper-clearfix"),
                        (this.uiButtonSet = t("<div>").appendTo(this.uiDialogButtonPane)),
                        this._addClass(this.uiButtonSet, "ui-dialog-buttonset"),
                        this._createButtons();
                },
                _createButtons: function () {
                    var e = this,
                        i = this.options.buttons;
                    return (
                        this.uiDialogButtonPane.remove(),
                        this.uiButtonSet.empty(),
                        t.isEmptyObject(i) || (t.isArray(i) && !i.length)
                            ? void this._removeClass(this.uiDialog, "ui-dialog-buttons")
                            : (t.each(i, function (i, n) {
                                  var s, o;
                                  (n = t.isFunction(n) ? { click: n, text: i } : n),
                                      (n = t.extend({ type: "button" }, n)),
                                      (s = n.click),
                                      (o = { icon: n.icon, iconPosition: n.iconPosition, showLabel: n.showLabel, icons: n.icons, text: n.text }),
                                      delete n.click,
                                      delete n.icon,
                                      delete n.iconPosition,
                                      delete n.showLabel,
                                      delete n.icons,
                                      "boolean" == typeof n.text && delete n.text,
                                      t("<button></button>", n)
                                          .button(o)
                                          .appendTo(e.uiButtonSet)
                                          .on("click", function () {
                                              s.apply(e.element[0], arguments);
                                          });
                              }),
                              this._addClass(this.uiDialog, "ui-dialog-buttons"),
                              void this.uiDialogButtonPane.appendTo(this.uiDialog))
                    );
                },
                _makeDraggable: function () {
                    function e(t) {
                        return { position: t.position, offset: t.offset };
                    }
                    var i = this,
                        n = this.options;
                    this.uiDialog.draggable({
                        cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                        handle: ".ui-dialog-titlebar",
                        containment: "document",
                        start: function (n, s) {
                            i._addClass(t(this), "ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", n, e(s));
                        },
                        drag: function (t, n) {
                            i._trigger("drag", t, e(n));
                        },
                        stop: function (s, o) {
                            var r = o.offset.left - i.document.scrollLeft(),
                                a = o.offset.top - i.document.scrollTop();
                            (n.position = { my: "left top", at: "left" + (0 <= r ? "+" : "") + r + " top" + (0 <= a ? "+" : "") + a, of: i.window }),
                                i._removeClass(t(this), "ui-dialog-dragging"),
                                i._unblockFrames(),
                                i._trigger("dragStop", s, e(o));
                        },
                    });
                },
                _makeResizable: function () {
                    function e(t) {
                        return { originalPosition: t.originalPosition, originalSize: t.originalSize, position: t.position, size: t.size };
                    }
                    var i = this,
                        n = this.options,
                        s = n.resizable,
                        o = this.uiDialog.css("position"),
                        r = "string" == typeof s ? s : "n,e,s,w,se,sw,ne,nw";
                    this.uiDialog
                        .resizable({
                            cancel: ".ui-dialog-content",
                            containment: "document",
                            alsoResize: this.element,
                            maxWidth: n.maxWidth,
                            maxHeight: n.maxHeight,
                            minWidth: n.minWidth,
                            minHeight: this._minHeight(),
                            handles: r,
                            start: function (n, s) {
                                i._addClass(t(this), "ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", n, e(s));
                            },
                            resize: function (t, n) {
                                i._trigger("resize", t, e(n));
                            },
                            stop: function (s, o) {
                                var r = i.uiDialog.offset(),
                                    a = r.left - i.document.scrollLeft(),
                                    l = r.top - i.document.scrollTop();
                                (n.height = i.uiDialog.height()),
                                    (n.width = i.uiDialog.width()),
                                    (n.position = { my: "left top", at: "left" + (0 <= a ? "+" : "") + a + " top" + (0 <= l ? "+" : "") + l, of: i.window }),
                                    i._removeClass(t(this), "ui-dialog-resizing"),
                                    i._unblockFrames(),
                                    i._trigger("resizeStop", s, e(o));
                            },
                        })
                        .css("position", o);
                },
                _trackFocus: function () {
                    this._on(this.widget(), {
                        focusin: function (e) {
                            this._makeFocusTarget(), (this._focusedElement = t(e.target));
                        },
                    });
                },
                _makeFocusTarget: function () {
                    this._untrackInstance(), this._trackingInstances().unshift(this);
                },
                _untrackInstance: function () {
                    var e = this._trackingInstances(),
                        i = t.inArray(this, e);
                    -1 !== i && e.splice(i, 1);
                },
                _trackingInstances: function () {
                    var t = this.document.data("ui-dialog-instances");
                    return t || ((t = []), this.document.data("ui-dialog-instances", t)), t;
                },
                _minHeight: function () {
                    var t = this.options;
                    return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height);
                },
                _position: function () {
                    var t = this.uiDialog.is(":visible");
                    t || this.uiDialog.show(), this.uiDialog.position(this.options.position), t || this.uiDialog.hide();
                },
                _setOptions: function (e) {
                    var i = this,
                        n = !1,
                        s = {};
                    t.each(e, function (t, e) {
                        i._setOption(t, e), t in i.sizeRelatedOptions && (n = !0), t in i.resizableRelatedOptions && (s[t] = e);
                    }),
                        n && (this._size(), this._position()),
                        this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", s);
                },
                _setOption: function (e, i) {
                    var n,
                        s,
                        o = this.uiDialog;
                    "disabled" !== e &&
                        (this._super(e, i),
                        "appendTo" === e && this.uiDialog.appendTo(this._appendTo()),
                        "buttons" === e && this._createButtons(),
                        "closeText" === e &&
                            this.uiDialogTitlebarClose.button({
                                label: t("<a>")
                                    .text("" + this.options.closeText)
                                    .html(),
                            }),
                        "draggable" === e && ((n = o.is(":data(ui-draggable)")) && !i && o.draggable("destroy"), !n && i && this._makeDraggable()),
                        "position" === e && this._position(),
                        "resizable" === e && ((s = o.is(":data(ui-resizable)")) && !i && o.resizable("destroy"), s && "string" == typeof i && o.resizable("option", "handles", i), s || !1 === i || this._makeResizable()),
                        "title" === e && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")));
                },
                _size: function () {
                    var t,
                        e,
                        i,
                        n = this.options;
                    this.element.show().css({ width: "auto", minHeight: 0, maxHeight: "none", height: 0 }),
                        n.minWidth > n.width && (n.width = n.minWidth),
                        (t = this.uiDialog.css({ height: "auto", width: n.width }).outerHeight()),
                        (e = Math.max(0, n.minHeight - t)),
                        (i = "number" == typeof n.maxHeight ? Math.max(0, n.maxHeight - t) : "none"),
                        "auto" === n.height ? this.element.css({ minHeight: e, maxHeight: i, height: "auto" }) : this.element.height(Math.max(0, n.height - t)),
                        this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight());
                },
                _blockFrames: function () {
                    this.iframeBlocks = this.document.find("iframe").map(function () {
                        var e = t(this);
                        return t("<div>").css({ position: "absolute", width: e.outerWidth(), height: e.outerHeight() }).appendTo(e.parent()).offset(e.offset())[0];
                    });
                },
                _unblockFrames: function () {
                    this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
                },
                _allowInteraction: function (e) {
                    return !!t(e.target).closest(".ui-dialog").length || !!t(e.target).closest(".ui-datepicker").length;
                },
                _createOverlay: function () {
                    if (this.options.modal) {
                        var e = !0;
                        this._delay(function () {
                            e = !1;
                        }),
                            this.document.data("ui-dialog-overlays") ||
                                this._on(this.document, {
                                    focusin: function (t) {
                                        e || this._allowInteraction(t) || (t.preventDefault(), this._trackingInstances()[0]._focusTabbable());
                                    },
                                }),
                            (this.overlay = t("<div>").appendTo(this._appendTo())),
                            this._addClass(this.overlay, null, "ui-widget-overlay ui-front"),
                            this._on(this.overlay, { mousedown: "_keepFocus" }),
                            this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1);
                    }
                },
                _destroyOverlay: function () {
                    if (this.options.modal && this.overlay) {
                        var t = this.document.data("ui-dialog-overlays") - 1;
                        t ? this.document.data("ui-dialog-overlays", t) : (this._off(this.document, "focusin"), this.document.removeData("ui-dialog-overlays")), this.overlay.remove(), (this.overlay = null);
                    }
                },
            }),
            !1 !== t.uiBackCompat &&
                t.widget("ui.dialog", t.ui.dialog, {
                    options: { dialogClass: "" },
                    _createWrapper: function () {
                        this._super(), this.uiDialog.addClass(this.options.dialogClass);
                    },
                    _setOption: function (t, e) {
                        "dialogClass" === t && this.uiDialog.removeClass(this.options.dialogClass).addClass(e), this._superApply(arguments);
                    },
                }),
            t.ui.dialog,
            t.widget("ui.droppable", {
                version: "1.12.1",
                widgetEventPrefix: "drop",
                options: { accept: "*", addClasses: !0, greedy: !1, scope: "default", tolerance: "intersect", activate: null, deactivate: null, drop: null, out: null, over: null },
                _create: function () {
                    var e,
                        i = this.options,
                        n = i.accept;
                    (this.isover = !1),
                        (this.isout = !0),
                        (this.accept = t.isFunction(n)
                            ? n
                            : function (t) {
                                  return t.is(n);
                              }),
                        (this.proportions = function () {
                            return arguments.length ? void (e = arguments[0]) : e || (e = { width: this.element[0].offsetWidth, height: this.element[0].offsetHeight });
                        }),
                        this._addToManager(i.scope),
                        i.addClasses && this._addClass("ui-droppable");
                },
                _addToManager: function (e) {
                    (t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || []), t.ui.ddmanager.droppables[e].push(this);
                },
                _splice: function (t) {
                    for (var e = 0; t.length > e; e++) t[e] === this && t.splice(e, 1);
                },
                _destroy: function () {
                    var e = t.ui.ddmanager.droppables[this.options.scope];
                    this._splice(e);
                },
                _setOption: function (e, i) {
                    if ("accept" === e)
                        this.accept = t.isFunction(i)
                            ? i
                            : function (t) {
                                  return t.is(i);
                              };
                    else if ("scope" === e) {
                        var n = t.ui.ddmanager.droppables[this.options.scope];
                        this._splice(n), this._addToManager(i);
                    }
                    this._super(e, i);
                },
                _activate: function (e) {
                    var i = t.ui.ddmanager.current;
                    this._addActiveClass(), i && this._trigger("activate", e, this.ui(i));
                },
                _deactivate: function (e) {
                    var i = t.ui.ddmanager.current;
                    this._removeActiveClass(), i && this._trigger("deactivate", e, this.ui(i));
                },
                _over: function (e) {
                    var i = t.ui.ddmanager.current;
                    i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._addHoverClass(), this._trigger("over", e, this.ui(i)));
                },
                _out: function (e) {
                    var i = t.ui.ddmanager.current;
                    i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._removeHoverClass(), this._trigger("out", e, this.ui(i)));
                },
                _drop: function (e, i) {
                    var n = i || t.ui.ddmanager.current,
                        s = !1;
                    return (
                        !(!n || (n.currentItem || n.element)[0] === this.element[0]) &&
                        (this.element
                            .find(":data(ui-droppable)")
                            .not(".ui-draggable-dragging")
                            .each(function () {
                                var i = t(this).droppable("instance");
                                return i.options.greedy &&
                                    !i.options.disabled &&
                                    i.options.scope === n.options.scope &&
                                    i.accept.call(i.element[0], n.currentItem || n.element) &&
                                    rt(n, t.extend(i, { offset: i.element.offset() }), i.options.tolerance, e)
                                    ? !(s = !0)
                                    : void 0;
                            }),
                        !s && !!this.accept.call(this.element[0], n.currentItem || n.element) && (this._removeActiveClass(), this._removeHoverClass(), this._trigger("drop", e, this.ui(n)), this.element))
                    );
                },
                ui: function (t) {
                    return { draggable: t.currentItem || t.element, helper: t.helper, position: t.position, offset: t.positionAbs };
                },
                _addHoverClass: function () {
                    this._addClass("ui-droppable-hover");
                },
                _removeHoverClass: function () {
                    this._removeClass("ui-droppable-hover");
                },
                _addActiveClass: function () {
                    this._addClass("ui-droppable-active");
                },
                _removeActiveClass: function () {
                    this._removeClass("ui-droppable-active");
                },
            });
        var ot,
            rt = (t.ui.intersect = function (t, e, i, n) {
                if (!e.offset) return !1;
                var s = (t.positionAbs || t.position.absolute).left + t.margins.left,
                    o = (t.positionAbs || t.position.absolute).top + t.margins.top,
                    r = s + t.helperProportions.width,
                    a = o + t.helperProportions.height,
                    l = e.offset.left,
                    h = e.offset.top,
                    c = l + e.proportions().width,
                    u = h + e.proportions().height;
                switch (i) {
                    case "fit":
                        return l <= s && r <= c && h <= o && a <= u;
                    case "intersect":
                        return s + t.helperProportions.width / 2 > l && c > r - t.helperProportions.width / 2 && o + t.helperProportions.height / 2 > h && u > a - t.helperProportions.height / 2;
                    case "pointer":
                        return at(n.pageY, h, e.proportions().height) && at(n.pageX, l, e.proportions().width);
                    case "touch":
                        return ((h <= o && o <= u) || (h <= a && a <= u) || (o < h && u < a)) && ((l <= s && s <= c) || (l <= r && r <= c) || (s < l && c < r));
                    default:
                        return !1;
                }
            });
        function at(t, e, i) {
            return e <= t && t < e + i;
        }
        !(t.ui.ddmanager = {
            current: null,
            droppables: { default: [] },
            prepareOffsets: function (e, i) {
                var n,
                    s,
                    o = t.ui.ddmanager.droppables[e.options.scope] || [],
                    r = i ? i.type : null,
                    a = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
                t: for (n = 0; o.length > n; n++)
                    if (!(o[n].options.disabled || (e && !o[n].accept.call(o[n].element[0], e.currentItem || e.element)))) {
                        for (s = 0; a.length > s; s++)
                            if (a[s] === o[n].element[0]) {
                                o[n].proportions().height = 0;
                                continue t;
                            }
                        (o[n].visible = "none" !== o[n].element.css("display")),
                            o[n].visible && ("mousedown" === r && o[n]._activate.call(o[n], i), (o[n].offset = o[n].element.offset()), o[n].proportions({ width: o[n].element[0].offsetWidth, height: o[n].element[0].offsetHeight }));
                    }
            },
            drop: function (e, i) {
                var n = !1;
                return (
                    t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function () {
                        this.options &&
                            (!this.options.disabled && this.visible && rt(e, this, this.options.tolerance, i) && (n = this._drop.call(this, i) || n),
                            !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && ((this.isout = !0), (this.isover = !1), this._deactivate.call(this, i)));
                    }),
                    n
                );
            },
            dragStart: function (e, i) {
                e.element.parentsUntil("body").on("scroll.droppable", function () {
                    e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
                });
            },
            drag: function (e, i) {
                e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i),
                    t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function () {
                        if (!this.options.disabled && !this.greedyChild && this.visible) {
                            var n,
                                s,
                                o,
                                r = rt(e, this, this.options.tolerance, i),
                                a = !r && this.isover ? "isout" : r && !this.isover ? "isover" : null;
                            a &&
                                (this.options.greedy &&
                                    ((s = this.options.scope),
                                    (o = this.element.parents(":data(ui-droppable)").filter(function () {
                                        return t(this).droppable("instance").options.scope === s;
                                    })).length && ((n = t(o[0]).droppable("instance")).greedyChild = "isover" === a)),
                                n && "isover" === a && ((n.isover = !1), (n.isout = !0), n._out.call(n, i)),
                                (this[a] = !0),
                                (this["isout" === a ? "isover" : "isout"] = !1),
                                this["isover" === a ? "_over" : "_out"].call(this, i),
                                n && "isout" === a && ((n.isout = !1), (n.isover = !0), n._over.call(n, i)));
                        }
                    });
            },
            dragStop: function (e, i) {
                e.element.parentsUntil("body").off("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
            },
        }) !== t.uiBackCompat &&
            t.widget("ui.droppable", t.ui.droppable, {
                options: { hoverClass: !1, activeClass: !1 },
                _addActiveClass: function () {
                    this._super(), this.options.activeClass && this.element.addClass(this.options.activeClass);
                },
                _removeActiveClass: function () {
                    this._super(), this.options.activeClass && this.element.removeClass(this.options.activeClass);
                },
                _addHoverClass: function () {
                    this._super(), this.options.hoverClass && this.element.addClass(this.options.hoverClass);
                },
                _removeHoverClass: function () {
                    this._super(), this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
                },
            }),
            t.ui.droppable,
            t.widget("ui.progressbar", {
                version: "1.12.1",
                options: { classes: { "ui-progressbar": "ui-corner-all", "ui-progressbar-value": "ui-corner-left", "ui-progressbar-complete": "ui-corner-right" }, max: 100, value: 0, change: null, complete: null },
                min: 0,
                _create: function () {
                    (this.oldValue = this.options.value = this._constrainedValue()),
                        this.element.attr({ role: "progressbar", "aria-valuemin": this.min }),
                        this._addClass("ui-progressbar", "ui-widget ui-widget-content"),
                        (this.valueDiv = t("<div>").appendTo(this.element)),
                        this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header"),
                        this._refreshValue();
                },
                _destroy: function () {
                    this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"), this.valueDiv.remove();
                },
                value: function (t) {
                    return void 0 === t ? this.options.value : ((this.options.value = this._constrainedValue(t)), void this._refreshValue());
                },
                _constrainedValue: function (t) {
                    return void 0 === t && (t = this.options.value), (this.indeterminate = !1 === t), "number" != typeof t && (t = 0), !this.indeterminate && Math.min(this.options.max, Math.max(this.min, t));
                },
                _setOptions: function (t) {
                    var e = t.value;
                    delete t.value, this._super(t), (this.options.value = this._constrainedValue(e)), this._refreshValue();
                },
                _setOption: function (t, e) {
                    "max" === t && (e = Math.max(this.min, e)), this._super(t, e);
                },
                _setOptionDisabled: function (t) {
                    this._super(t), this.element.attr("aria-disabled", t), this._toggleClass(null, "ui-state-disabled", !!t);
                },
                _percentage: function () {
                    return this.indeterminate ? 100 : (100 * (this.options.value - this.min)) / (this.options.max - this.min);
                },
                _refreshValue: function () {
                    var e = this.options.value,
                        i = this._percentage();
                    this.valueDiv.toggle(this.indeterminate || e > this.min).width(i.toFixed(0) + "%"),
                        this._toggleClass(this.valueDiv, "ui-progressbar-complete", null, e === this.options.max)._toggleClass("ui-progressbar-indeterminate", null, this.indeterminate),
                        this.indeterminate
                            ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || ((this.overlayDiv = t("<div>").appendTo(this.valueDiv)), this._addClass(this.overlayDiv, "ui-progressbar-overlay")))
                            : (this.element.attr({ "aria-valuemax": this.options.max, "aria-valuenow": e }), this.overlayDiv && (this.overlayDiv.remove(), (this.overlayDiv = null))),
                        this.oldValue !== e && ((this.oldValue = e), this._trigger("change")),
                        e === this.options.max && this._trigger("complete");
                },
            }),
            t.widget("ui.selectable", t.ui.mouse, {
                version: "1.12.1",
                options: { appendTo: "body", autoRefresh: !0, distance: 0, filter: "*", tolerance: "touch", selected: null, selecting: null, start: null, stop: null, unselected: null, unselecting: null },
                _create: function () {
                    var e = this;
                    this._addClass("ui-selectable"),
                        (this.dragged = !1),
                        (this.refresh = function () {
                            (e.elementPos = t(e.element[0]).offset()),
                                (e.selectees = t(e.options.filter, e.element[0])),
                                e._addClass(e.selectees, "ui-selectee"),
                                e.selectees.each(function () {
                                    var i = t(this),
                                        n = i.offset(),
                                        s = { left: n.left - e.elementPos.left, top: n.top - e.elementPos.top };
                                    t.data(this, "selectable-item", {
                                        element: this,
                                        $element: i,
                                        left: s.left,
                                        top: s.top,
                                        right: s.left + i.outerWidth(),
                                        bottom: s.top + i.outerHeight(),
                                        startselected: !1,
                                        selected: i.hasClass("ui-selected"),
                                        selecting: i.hasClass("ui-selecting"),
                                        unselecting: i.hasClass("ui-unselecting"),
                                    });
                                });
                        }),
                        this.refresh(),
                        this._mouseInit(),
                        (this.helper = t("<div>")),
                        this._addClass(this.helper, "ui-selectable-helper");
                },
                _destroy: function () {
                    this.selectees.removeData("selectable-item"), this._mouseDestroy();
                },
                _mouseStart: function (e) {
                    var i = this,
                        n = this.options;
                    (this.opos = [e.pageX, e.pageY]),
                        (this.elementPos = t(this.element[0]).offset()),
                        this.options.disabled ||
                            ((this.selectees = t(n.filter, this.element[0])),
                            this._trigger("start", e),
                            t(n.appendTo).append(this.helper),
                            this.helper.css({ left: e.pageX, top: e.pageY, width: 0, height: 0 }),
                            n.autoRefresh && this.refresh(),
                            this.selectees.filter(".ui-selected").each(function () {
                                var n = t.data(this, "selectable-item");
                                (n.startselected = !0),
                                    e.metaKey ||
                                        e.ctrlKey ||
                                        (i._removeClass(n.$element, "ui-selected"), (n.selected = !1), i._addClass(n.$element, "ui-unselecting"), (n.unselecting = !0), i._trigger("unselecting", e, { unselecting: n.element }));
                            }),
                            t(e.target)
                                .parents()
                                .addBack()
                                .each(function () {
                                    var n,
                                        s = t.data(this, "selectable-item");
                                    return s
                                        ? ((n = (!e.metaKey && !e.ctrlKey) || !s.$element.hasClass("ui-selected")),
                                          i._removeClass(s.$element, n ? "ui-unselecting" : "ui-selected")._addClass(s.$element, n ? "ui-selecting" : "ui-unselecting"),
                                          (s.unselecting = !n),
                                          (s.selecting = n),
                                          (s.selected = n) ? i._trigger("selecting", e, { selecting: s.element }) : i._trigger("unselecting", e, { unselecting: s.element }),
                                          !1)
                                        : void 0;
                                }));
                },
                _mouseDrag: function (e) {
                    if (((this.dragged = !0), !this.options.disabled)) {
                        var i,
                            n = this,
                            s = this.options,
                            o = this.opos[0],
                            r = this.opos[1],
                            a = e.pageX,
                            l = e.pageY;
                        return (
                            a < o && ((i = a), (a = o), (o = i)),
                            l < r && ((i = l), (l = r), (r = i)),
                            this.helper.css({ left: o, top: r, width: a - o, height: l - r }),
                            this.selectees.each(function () {
                                var i = t.data(this, "selectable-item"),
                                    h = !1,
                                    c = {};
                                i &&
                                    i.element !== n.element[0] &&
                                    ((c.left = i.left + n.elementPos.left),
                                    (c.right = i.right + n.elementPos.left),
                                    (c.top = i.top + n.elementPos.top),
                                    (c.bottom = i.bottom + n.elementPos.top),
                                    "touch" === s.tolerance ? (h = !(c.left > a || o > c.right || c.top > l || r > c.bottom)) : "fit" === s.tolerance && (h = c.left > o && a > c.right && c.top > r && l > c.bottom),
                                    h
                                        ? (i.selected && (n._removeClass(i.$element, "ui-selected"), (i.selected = !1)),
                                          i.unselecting && (n._removeClass(i.$element, "ui-unselecting"), (i.unselecting = !1)),
                                          i.selecting || (n._addClass(i.$element, "ui-selecting"), (i.selecting = !0), n._trigger("selecting", e, { selecting: i.element })))
                                        : (i.selecting &&
                                              ((e.metaKey || e.ctrlKey) && i.startselected
                                                  ? (n._removeClass(i.$element, "ui-selecting"), (i.selecting = !1), n._addClass(i.$element, "ui-selected"), (i.selected = !0))
                                                  : (n._removeClass(i.$element, "ui-selecting"),
                                                    (i.selecting = !1),
                                                    i.startselected && (n._addClass(i.$element, "ui-unselecting"), (i.unselecting = !0)),
                                                    n._trigger("unselecting", e, { unselecting: i.element }))),
                                          i.selected &&
                                              (e.metaKey ||
                                                  e.ctrlKey ||
                                                  i.startselected ||
                                                  (n._removeClass(i.$element, "ui-selected"), (i.selected = !1), n._addClass(i.$element, "ui-unselecting"), (i.unselecting = !0), n._trigger("unselecting", e, { unselecting: i.element })))));
                            }),
                            !1
                        );
                    }
                },
                _mouseStop: function (e) {
                    var i = this;
                    return (
                        (this.dragged = !1),
                        t(".ui-unselecting", this.element[0]).each(function () {
                            var n = t.data(this, "selectable-item");
                            i._removeClass(n.$element, "ui-unselecting"), (n.unselecting = !1), (n.startselected = !1), i._trigger("unselected", e, { unselected: n.element });
                        }),
                        t(".ui-selecting", this.element[0]).each(function () {
                            var n = t.data(this, "selectable-item");
                            i._removeClass(n.$element, "ui-selecting")._addClass(n.$element, "ui-selected"), (n.selecting = !1), (n.selected = !0), (n.startselected = !0), i._trigger("selected", e, { selected: n.element });
                        }),
                        this._trigger("stop", e),
                        this.helper.remove(),
                        !1
                    );
                },
            }),
            t.widget("ui.selectmenu", [
                t.ui.formResetMixin,
                {
                    version: "1.12.1",
                    defaultElement: "<select>",
                    options: {
                        appendTo: null,
                        classes: { "ui-selectmenu-button-open": "ui-corner-top", "ui-selectmenu-button-closed": "ui-corner-all" },
                        disabled: null,
                        icons: { button: "ui-icon-triangle-1-s" },
                        position: { my: "left top", at: "left bottom", collision: "none" },
                        width: !1,
                        change: null,
                        close: null,
                        focus: null,
                        open: null,
                        select: null,
                    },
                    _create: function () {
                        var e = this.element.uniqueId().attr("id");
                        (this.ids = { element: e, button: e + "-button", menu: e + "-menu" }), this._drawButton(), this._drawMenu(), this._bindFormResetHandler(), (this._rendered = !1), (this.menuItems = t());
                    },
                    _drawButton: function () {
                        var e,
                            i = this,
                            n = this._parseOption(this.element.find("option:selected"), this.element[0].selectedIndex);
                        (this.labels = this.element.labels().attr("for", this.ids.button)),
                            this._on(this.labels, {
                                click: function (t) {
                                    this.button.focus(), t.preventDefault();
                                },
                            }),
                            this.element.hide(),
                            (this.button = t("<span>", {
                                tabindex: this.options.disabled ? -1 : 0,
                                id: this.ids.button,
                                role: "combobox",
                                "aria-expanded": "false",
                                "aria-autocomplete": "list",
                                "aria-owns": this.ids.menu,
                                "aria-haspopup": "true",
                                title: this.element.attr("title"),
                            }).insertAfter(this.element)),
                            this._addClass(this.button, "ui-selectmenu-button ui-selectmenu-button-closed", "ui-button ui-widget"),
                            (e = t("<span>").appendTo(this.button)),
                            this._addClass(e, "ui-selectmenu-icon", "ui-icon " + this.options.icons.button),
                            (this.buttonItem = this._renderButtonItem(n).appendTo(this.button)),
                            !1 !== this.options.width && this._resizeButton(),
                            this._on(this.button, this._buttonEvents),
                            this.button.one("focusin", function () {
                                i._rendered || i._refreshMenu();
                            });
                    },
                    _drawMenu: function () {
                        var e = this;
                        (this.menu = t("<ul>", { "aria-hidden": "true", "aria-labelledby": this.ids.button, id: this.ids.menu })),
                            (this.menuWrap = t("<div>").append(this.menu)),
                            this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front"),
                            this.menuWrap.appendTo(this._appendTo()),
                            (this.menuInstance = this.menu
                                .menu({
                                    classes: { "ui-menu": "ui-corner-bottom" },
                                    role: "listbox",
                                    select: function (t, i) {
                                        t.preventDefault(), e._setSelection(), e._select(i.item.data("ui-selectmenu-item"), t);
                                    },
                                    focus: function (t, i) {
                                        var n = i.item.data("ui-selectmenu-item");
                                        null != e.focusIndex && n.index !== e.focusIndex && (e._trigger("focus", t, { item: n }), e.isOpen || e._select(n, t)),
                                            (e.focusIndex = n.index),
                                            e.button.attr("aria-activedescendant", e.menuItems.eq(n.index).attr("id"));
                                    },
                                })
                                .menu("instance")),
                            this.menuInstance._off(this.menu, "mouseleave"),
                            (this.menuInstance._closeOnDocumentClick = function () {
                                return !1;
                            }),
                            (this.menuInstance._isDivider = function () {
                                return !1;
                            });
                    },
                    refresh: function () {
                        this._refreshMenu(), this.buttonItem.replaceWith((this.buttonItem = this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item") || {}))), null === this.options.width && this._resizeButton();
                    },
                    _refreshMenu: function () {
                        var t,
                            e = this.element.find("option");
                        this.menu.empty(),
                            this._parseOptions(e),
                            this._renderMenu(this.menu, this.items),
                            this.menuInstance.refresh(),
                            (this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper")),
                            (this._rendered = !0),
                            e.length && ((t = this._getSelectedItem()), this.menuInstance.focus(null, t), this._setAria(t.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")));
                    },
                    open: function (t) {
                        this.options.disabled ||
                            (this._rendered ? (this._removeClass(this.menu.find(".ui-state-active"), null, "ui-state-active"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(),
                            this.menuItems.length && ((this.isOpen = !0), this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", t)));
                    },
                    _position: function () {
                        this.menuWrap.position(t.extend({ of: this.button }, this.options.position));
                    },
                    close: function (t) {
                        this.isOpen && ((this.isOpen = !1), this._toggleAttr(), (this.range = null), this._off(this.document), this._trigger("close", t));
                    },
                    widget: function () {
                        return this.button;
                    },
                    menuWidget: function () {
                        return this.menu;
                    },
                    _renderButtonItem: function (e) {
                        var i = t("<span>");
                        return this._setText(i, e.label), this._addClass(i, "ui-selectmenu-text"), i;
                    },
                    _renderMenu: function (e, i) {
                        var n = this,
                            s = "";
                        t.each(i, function (i, o) {
                            var r;
                            o.optgroup !== s &&
                                ((r = t("<li>", { text: o.optgroup })),
                                n._addClass(r, "ui-selectmenu-optgroup", "ui-menu-divider" + (o.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : "")),
                                r.appendTo(e),
                                (s = o.optgroup)),
                                n._renderItemData(e, o);
                        });
                    },
                    _renderItemData: function (t, e) {
                        return this._renderItem(t, e).data("ui-selectmenu-item", e);
                    },
                    _renderItem: function (e, i) {
                        var n = t("<li>"),
                            s = t("<div>", { title: i.element.attr("title") });
                        return i.disabled && this._addClass(n, null, "ui-state-disabled"), this._setText(s, i.label), n.append(s).appendTo(e);
                    },
                    _setText: function (t, e) {
                        e ? t.text(e) : t.html("&#160;");
                    },
                    _move: function (t, e) {
                        var i,
                            n,
                            s = ".ui-menu-item";
                        this.isOpen ? (i = this.menuItems.eq(this.focusIndex).parent("li")) : ((i = this.menuItems.eq(this.element[0].selectedIndex).parent("li")), (s += ":not(.ui-state-disabled)")),
                            (n = "first" === t || "last" === t ? i["first" === t ? "prevAll" : "nextAll"](s).eq(-1) : i[t + "All"](s).eq(0)).length && this.menuInstance.focus(e, n);
                    },
                    _getSelectedItem: function () {
                        return this.menuItems.eq(this.element[0].selectedIndex).parent("li");
                    },
                    _toggle: function (t) {
                        this[this.isOpen ? "close" : "open"](t);
                    },
                    _setSelection: function () {
                        var t;
                        this.range && (window.getSelection ? ((t = window.getSelection()).removeAllRanges(), t.addRange(this.range)) : this.range.select(), this.button.focus());
                    },
                    _documentClick: {
                        mousedown: function (e) {
                            this.isOpen && (t(e.target).closest(".ui-selectmenu-menu, #" + t.ui.escapeSelector(this.ids.button)).length || this.close(e));
                        },
                    },
                    _buttonEvents: {
                        mousedown: function () {
                            var t;
                            window.getSelection ? (t = window.getSelection()).rangeCount && (this.range = t.getRangeAt(0)) : (this.range = document.selection.createRange());
                        },
                        click: function (t) {
                            this._setSelection(), this._toggle(t);
                        },
                        keydown: function (e) {
                            var i = !0;
                            switch (e.keyCode) {
                                case t.ui.keyCode.TAB:
                                case t.ui.keyCode.ESCAPE:
                                    this.close(e), (i = !1);
                                    break;
                                case t.ui.keyCode.ENTER:
                                    this.isOpen && this._selectFocusedItem(e);
                                    break;
                                case t.ui.keyCode.UP:
                                    e.altKey ? this._toggle(e) : this._move("prev", e);
                                    break;
                                case t.ui.keyCode.DOWN:
                                    e.altKey ? this._toggle(e) : this._move("next", e);
                                    break;
                                case t.ui.keyCode.SPACE:
                                    this.isOpen ? this._selectFocusedItem(e) : this._toggle(e);
                                    break;
                                case t.ui.keyCode.LEFT:
                                    this._move("prev", e);
                                    break;
                                case t.ui.keyCode.RIGHT:
                                    this._move("next", e);
                                    break;
                                case t.ui.keyCode.HOME:
                                case t.ui.keyCode.PAGE_UP:
                                    this._move("first", e);
                                    break;
                                case t.ui.keyCode.END:
                                case t.ui.keyCode.PAGE_DOWN:
                                    this._move("last", e);
                                    break;
                                default:
                                    this.menu.trigger(e), (i = !1);
                            }
                            i && e.preventDefault();
                        },
                    },
                    _selectFocusedItem: function (t) {
                        var e = this.menuItems.eq(this.focusIndex).parent("li");
                        e.hasClass("ui-state-disabled") || this._select(e.data("ui-selectmenu-item"), t);
                    },
                    _select: function (t, e) {
                        var i = this.element[0].selectedIndex;
                        (this.element[0].selectedIndex = t.index),
                            this.buttonItem.replaceWith((this.buttonItem = this._renderButtonItem(t))),
                            this._setAria(t),
                            this._trigger("select", e, { item: t }),
                            t.index !== i && this._trigger("change", e, { item: t }),
                            this.close(e);
                    },
                    _setAria: function (t) {
                        var e = this.menuItems.eq(t.index).attr("id");
                        this.button.attr({ "aria-labelledby": e, "aria-activedescendant": e }), this.menu.attr("aria-activedescendant", e);
                    },
                    _setOption: function (t, e) {
                        if ("icons" === t) {
                            var i = this.button.find("span.ui-icon");
                            this._removeClass(i, null, this.options.icons.button)._addClass(i, null, e.button);
                        }
                        this._super(t, e), "appendTo" === t && this.menuWrap.appendTo(this._appendTo()), "width" === t && this._resizeButton();
                    },
                    _setOptionDisabled: function (t) {
                        this._super(t),
                            this.menuInstance.option("disabled", t),
                            this.button.attr("aria-disabled", t),
                            this._toggleClass(this.button, null, "ui-state-disabled", t),
                            this.element.prop("disabled", t),
                            t ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0);
                    },
                    _appendTo: function () {
                        var e = this.options.appendTo;
                        return ((e = e && (e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0))) && e[0]) || (e = this.element.closest(".ui-front, dialog")), e.length || (e = this.document[0].body), e;
                    },
                    _toggleAttr: function () {
                        this.button.attr("aria-expanded", this.isOpen),
                            this._removeClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open"))
                                ._addClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed"))
                                ._toggleClass(this.menuWrap, "ui-selectmenu-open", null, this.isOpen),
                            this.menu.attr("aria-hidden", !this.isOpen);
                    },
                    _resizeButton: function () {
                        var t = this.options.width;
                        return !1 === t ? void this.button.css("width", "") : (null === t && ((t = this.element.show().outerWidth()), this.element.hide()), void this.button.outerWidth(t));
                    },
                    _resizeMenu: function () {
                        this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1));
                    },
                    _getCreateOptions: function () {
                        var t = this._super();
                        return (t.disabled = this.element.prop("disabled")), t;
                    },
                    _parseOptions: function (e) {
                        var i = this,
                            n = [];
                        e.each(function (e, s) {
                            n.push(i._parseOption(t(s), e));
                        }),
                            (this.items = n);
                    },
                    _parseOption: function (t, e) {
                        var i = t.parent("optgroup");
                        return { element: t, index: e, value: t.val(), label: t.text(), optgroup: i.attr("label") || "", disabled: i.prop("disabled") || t.prop("disabled") };
                    },
                    _destroy: function () {
                        this._unbindFormResetHandler(), this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.labels.attr("for", this.ids.element);
                    },
                },
            ]),
            t.widget("ui.slider", t.ui.mouse, {
                version: "1.12.1",
                widgetEventPrefix: "slide",
                options: {
                    animate: !1,
                    classes: { "ui-slider": "ui-corner-all", "ui-slider-handle": "ui-corner-all", "ui-slider-range": "ui-corner-all ui-widget-header" },
                    distance: 0,
                    max: 100,
                    min: 0,
                    orientation: "horizontal",
                    range: !1,
                    step: 1,
                    value: 0,
                    values: null,
                    change: null,
                    slide: null,
                    start: null,
                    stop: null,
                },
                numPages: 5,
                _create: function () {
                    (this._keySliding = !1),
                        (this._mouseSliding = !1),
                        (this._animateOff = !0),
                        (this._handleIndex = null),
                        this._detectOrientation(),
                        this._mouseInit(),
                        this._calculateNewMax(),
                        this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"),
                        this._refresh(),
                        (this._animateOff = !1);
                },
                _refresh: function () {
                    this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue();
                },
                _createHandles: function () {
                    var e,
                        i,
                        n = this.options,
                        s = this.element.find(".ui-slider-handle"),
                        o = [];
                    for (i = (n.values && n.values.length) || 1, s.length > i && (s.slice(i).remove(), (s = s.slice(0, i))), e = s.length; e < i; e++) o.push("<span tabindex='0'></span>");
                    (this.handles = s.add(t(o.join("")).appendTo(this.element))),
                        this._addClass(this.handles, "ui-slider-handle", "ui-state-default"),
                        (this.handle = this.handles.eq(0)),
                        this.handles.each(function (e) {
                            t(this).data("ui-slider-handle-index", e).attr("tabIndex", 0);
                        });
                },
                _createRange: function () {
                    var e = this.options;
                    e.range
                        ? (!0 === e.range &&
                              (e.values ? (e.values.length && 2 !== e.values.length ? (e.values = [e.values[0], e.values[0]]) : t.isArray(e.values) && (e.values = e.values.slice(0))) : (e.values = [this._valueMin(), this._valueMin()])),
                          this.range && this.range.length
                              ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"), this.range.css({ left: "", bottom: "" }))
                              : ((this.range = t("<div>").appendTo(this.element)), this._addClass(this.range, "ui-slider-range")),
                          ("min" !== e.range && "max" !== e.range) || this._addClass(this.range, "ui-slider-range-" + e.range))
                        : (this.range && this.range.remove(), (this.range = null));
                },
                _setupEvents: function () {
                    this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles);
                },
                _destroy: function () {
                    this.handles.remove(), this.range && this.range.remove(), this._mouseDestroy();
                },
                _mouseCapture: function (e) {
                    var i,
                        n,
                        s,
                        o,
                        r,
                        a,
                        l,
                        h = this,
                        c = this.options;
                    return (
                        !c.disabled &&
                        ((this.elementSize = { width: this.element.outerWidth(), height: this.element.outerHeight() }),
                        (this.elementOffset = this.element.offset()),
                        (i = { x: e.pageX, y: e.pageY }),
                        (n = this._normValueFromMouse(i)),
                        (s = this._valueMax() - this._valueMin() + 1),
                        this.handles.each(function (e) {
                            var i = Math.abs(n - h.values(e));
                            (i < s || (s === i && (e === h._lastChangedValue || h.values(e) === c.min))) && ((s = i), (o = t(this)), (r = e));
                        }),
                        !1 !== this._start(e, r) &&
                            ((this._mouseSliding = !0),
                            (this._handleIndex = r),
                            this._addClass(o, null, "ui-state-active"),
                            o.trigger("focus"),
                            (a = o.offset()),
                            (l = !t(e.target).parents().addBack().is(".ui-slider-handle")),
                            (this._clickOffset = l
                                ? { left: 0, top: 0 }
                                : {
                                      left: e.pageX - a.left - o.width() / 2,
                                      top: e.pageY - a.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0),
                                  }),
                            this.handles.hasClass("ui-state-hover") || this._slide(e, r, n),
                            (this._animateOff = !0)))
                    );
                },
                _mouseStart: function () {
                    return !0;
                },
                _mouseDrag: function (t) {
                    var e = { x: t.pageX, y: t.pageY },
                        i = this._normValueFromMouse(e);
                    return this._slide(t, this._handleIndex, i), !1;
                },
                _mouseStop: function (t) {
                    return (
                        this._removeClass(this.handles, null, "ui-state-active"),
                        (this._mouseSliding = !1),
                        this._stop(t, this._handleIndex),
                        this._change(t, this._handleIndex),
                        (this._handleIndex = null),
                        (this._clickOffset = null),
                        (this._animateOff = !1)
                    );
                },
                _detectOrientation: function () {
                    this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal";
                },
                _normValueFromMouse: function (t) {
                    var e, i, n, s;
                    return (
                        1 <
                            (i =
                                ("horizontal" === this.orientation
                                    ? ((e = this.elementSize.width), t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0))
                                    : ((e = this.elementSize.height), t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0))) / e) && (i = 1),
                        i < 0 && (i = 0),
                        "vertical" === this.orientation && (i = 1 - i),
                        (n = this._valueMax() - this._valueMin()),
                        (s = this._valueMin() + i * n),
                        this._trimAlignValue(s)
                    );
                },
                _uiHash: function (t, e, i) {
                    var n = { handle: this.handles[t], handleIndex: t, value: void 0 !== e ? e : this.value() };
                    return this._hasMultipleValues() && ((n.value = void 0 !== e ? e : this.values(t)), (n.values = i || this.values())), n;
                },
                _hasMultipleValues: function () {
                    return this.options.values && this.options.values.length;
                },
                _start: function (t, e) {
                    return this._trigger("start", t, this._uiHash(e));
                },
                _slide: function (t, e, i) {
                    var n,
                        s = this.value(),
                        o = this.values();
                    this._hasMultipleValues() && ((n = this.values(e ? 0 : 1)), (s = this.values(e)), 2 === this.options.values.length && !0 === this.options.range && (i = 0 === e ? Math.min(n, i) : Math.max(n, i)), (o[e] = i)),
                        i === s || (!1 !== this._trigger("slide", t, this._uiHash(e, i, o)) && (this._hasMultipleValues() ? this.values(e, i) : this.value(i)));
                },
                _stop: function (t, e) {
                    this._trigger("stop", t, this._uiHash(e));
                },
                _change: function (t, e) {
                    this._keySliding || this._mouseSliding || ((this._lastChangedValue = e), this._trigger("change", t, this._uiHash(e)));
                },
                value: function (t) {
                    return arguments.length ? ((this.options.value = this._trimAlignValue(t)), this._refreshValue(), void this._change(null, 0)) : this._value();
                },
                values: function (e, i) {
                    var n, s, o;
                    if (1 < arguments.length) return (this.options.values[e] = this._trimAlignValue(i)), this._refreshValue(), void this._change(null, e);
                    if (!arguments.length) return this._values();
                    if (!t.isArray(e)) return this._hasMultipleValues() ? this._values(e) : this.value();
                    for (n = this.options.values, s = e, o = 0; n.length > o; o += 1) (n[o] = this._trimAlignValue(s[o])), this._change(null, o);
                    this._refreshValue();
                },
                _setOption: function (e, i) {
                    var n,
                        s = 0;
                    switch (
                        ("range" === e &&
                            !0 === this.options.range &&
                            ("min" === i ? ((this.options.value = this._values(0)), (this.options.values = null)) : "max" === i && ((this.options.value = this._values(this.options.values.length - 1)), (this.options.values = null))),
                        t.isArray(this.options.values) && (s = this.options.values.length),
                        this._super(e, i),
                        e)
                    ) {
                        case "orientation":
                            this._detectOrientation(),
                                this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation),
                                this._refreshValue(),
                                this.options.range && this._refreshRange(i),
                                this.handles.css("horizontal" === i ? "bottom" : "left", "");
                            break;
                        case "value":
                            (this._animateOff = !0), this._refreshValue(), this._change(null, 0), (this._animateOff = !1);
                            break;
                        case "values":
                            for (this._animateOff = !0, this._refreshValue(), n = s - 1; 0 <= n; n--) this._change(null, n);
                            this._animateOff = !1;
                            break;
                        case "step":
                        case "min":
                        case "max":
                            (this._animateOff = !0), this._calculateNewMax(), this._refreshValue(), (this._animateOff = !1);
                            break;
                        case "range":
                            (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
                    }
                },
                _setOptionDisabled: function (t) {
                    this._super(t), this._toggleClass(null, "ui-state-disabled", !!t);
                },
                _value: function () {
                    var t = this.options.value;
                    return this._trimAlignValue(t);
                },
                _values: function (t) {
                    var e, i, n;
                    if (arguments.length) return (e = this.options.values[t]), this._trimAlignValue(e);
                    if (this._hasMultipleValues()) {
                        for (i = this.options.values.slice(), n = 0; i.length > n; n += 1) i[n] = this._trimAlignValue(i[n]);
                        return i;
                    }
                    return [];
                },
                _trimAlignValue: function (t) {
                    if (this._valueMin() >= t) return this._valueMin();
                    if (t >= this._valueMax()) return this._valueMax();
                    var e = 0 < this.options.step ? this.options.step : 1,
                        i = (t - this._valueMin()) % e,
                        n = t - i;
                    return 2 * Math.abs(i) >= e && (n += 0 < i ? e : -e), parseFloat(n.toFixed(5));
                },
                _calculateNewMax: function () {
                    var t = this.options.max,
                        e = this._valueMin(),
                        i = this.options.step;
                    (t = Math.round((t - e) / i) * i + e) > this.options.max && (t -= i), (this.max = parseFloat(t.toFixed(this._precision())));
                },
                _precision: function () {
                    var t = this._precisionOf(this.options.step);
                    return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t;
                },
                _precisionOf: function (t) {
                    var e = "" + t,
                        i = e.indexOf(".");
                    return -1 === i ? 0 : e.length - i - 1;
                },
                _valueMin: function () {
                    return this.options.min;
                },
                _valueMax: function () {
                    return this.max;
                },
                _refreshRange: function (t) {
                    "vertical" === t && this.range.css({ width: "", left: "" }), "horizontal" === t && this.range.css({ height: "", bottom: "" });
                },
                _refreshValue: function () {
                    var e,
                        i,
                        n,
                        s,
                        o,
                        r = this.options.range,
                        a = this.options,
                        l = this,
                        h = !this._animateOff && a.animate,
                        c = {};
                    this._hasMultipleValues()
                        ? this.handles.each(function (n) {
                              (i = ((l.values(n) - l._valueMin()) / (l._valueMax() - l._valueMin())) * 100),
                                  (c["horizontal" === l.orientation ? "left" : "bottom"] = i + "%"),
                                  t(this).stop(1, 1)[h ? "animate" : "css"](c, a.animate),
                                  !0 === l.options.range &&
                                      ("horizontal" === l.orientation
                                          ? (0 === n && l.range.stop(1, 1)[h ? "animate" : "css"]({ left: i + "%" }, a.animate), 1 === n && l.range[h ? "animate" : "css"]({ width: i - e + "%" }, { queue: !1, duration: a.animate }))
                                          : (0 === n && l.range.stop(1, 1)[h ? "animate" : "css"]({ bottom: i + "%" }, a.animate), 1 === n && l.range[h ? "animate" : "css"]({ height: i - e + "%" }, { queue: !1, duration: a.animate }))),
                                  (e = i);
                          })
                        : ((n = this.value()),
                          (s = this._valueMin()),
                          (o = this._valueMax()),
                          (i = o !== s ? ((n - s) / (o - s)) * 100 : 0),
                          (c["horizontal" === this.orientation ? "left" : "bottom"] = i + "%"),
                          this.handle.stop(1, 1)[h ? "animate" : "css"](c, a.animate),
                          "min" === r && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({ width: i + "%" }, a.animate),
                          "max" === r && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({ width: 100 - i + "%" }, a.animate),
                          "min" === r && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({ height: i + "%" }, a.animate),
                          "max" === r && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({ height: 100 - i + "%" }, a.animate));
                },
                _handleEvents: {
                    keydown: function (e) {
                        var i,
                            n,
                            s,
                            o = t(e.target).data("ui-slider-handle-index");
                        switch (e.keyCode) {
                            case t.ui.keyCode.HOME:
                            case t.ui.keyCode.END:
                            case t.ui.keyCode.PAGE_UP:
                            case t.ui.keyCode.PAGE_DOWN:
                            case t.ui.keyCode.UP:
                            case t.ui.keyCode.RIGHT:
                            case t.ui.keyCode.DOWN:
                            case t.ui.keyCode.LEFT:
                                if ((e.preventDefault(), !this._keySliding && ((this._keySliding = !0), this._addClass(t(e.target), null, "ui-state-active"), !1 === this._start(e, o)))) return;
                        }
                        switch (((s = this.options.step), (i = n = this._hasMultipleValues() ? this.values(o) : this.value()), e.keyCode)) {
                            case t.ui.keyCode.HOME:
                                n = this._valueMin();
                                break;
                            case t.ui.keyCode.END:
                                n = this._valueMax();
                                break;
                            case t.ui.keyCode.PAGE_UP:
                                n = this._trimAlignValue(i + (this._valueMax() - this._valueMin()) / this.numPages);
                                break;
                            case t.ui.keyCode.PAGE_DOWN:
                                n = this._trimAlignValue(i - (this._valueMax() - this._valueMin()) / this.numPages);
                                break;
                            case t.ui.keyCode.UP:
                            case t.ui.keyCode.RIGHT:
                                if (i === this._valueMax()) return;
                                n = this._trimAlignValue(i + s);
                                break;
                            case t.ui.keyCode.DOWN:
                            case t.ui.keyCode.LEFT:
                                if (i === this._valueMin()) return;
                                n = this._trimAlignValue(i - s);
                        }
                        this._slide(e, o, n);
                    },
                    keyup: function (e) {
                        var i = t(e.target).data("ui-slider-handle-index");
                        this._keySliding && ((this._keySliding = !1), this._stop(e, i), this._change(e, i), this._removeClass(t(e.target), null, "ui-state-active"));
                    },
                },
            }),
            t.widget("ui.sortable", t.ui.mouse, {
                version: "1.12.1",
                widgetEventPrefix: "sort",
                ready: !1,
                options: {
                    appendTo: "parent",
                    axis: !1,
                    connectWith: !1,
                    containment: !1,
                    cursor: "auto",
                    cursorAt: !1,
                    dropOnEmpty: !0,
                    forcePlaceholderSize: !1,
                    forceHelperSize: !1,
                    grid: !1,
                    handle: !1,
                    helper: "original",
                    items: "> *",
                    opacity: !1,
                    placeholder: !1,
                    revert: !1,
                    scroll: !0,
                    scrollSensitivity: 20,
                    scrollSpeed: 20,
                    scope: "default",
                    tolerance: "intersect",
                    zIndex: 1e3,
                    activate: null,
                    beforeStop: null,
                    change: null,
                    deactivate: null,
                    out: null,
                    over: null,
                    receive: null,
                    remove: null,
                    sort: null,
                    start: null,
                    stop: null,
                    update: null,
                },
                _isOverAxis: function (t, e, i) {
                    return e <= t && t < e + i;
                },
                _isFloating: function (t) {
                    return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"));
                },
                _create: function () {
                    (this.containerCache = {}), this._addClass("ui-sortable"), this.refresh(), (this.offset = this.element.offset()), this._mouseInit(), this._setHandleClassName(), (this.ready = !0);
                },
                _setOption: function (t, e) {
                    this._super(t, e), "handle" === t && this._setHandleClassName();
                },
                _setHandleClassName: function () {
                    var e = this;
                    this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle"),
                        t.each(this.items, function () {
                            e._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle");
                        });
                },
                _destroy: function () {
                    this._mouseDestroy();
                    for (var t = this.items.length - 1; 0 <= t; t--) this.items[t].item.removeData(this.widgetName + "-item");
                    return this;
                },
                _mouseCapture: function (e, i) {
                    var n = null,
                        s = !1,
                        o = this;
                    return !(
                        this.reverting ||
                        this.options.disabled ||
                        "static" === this.options.type ||
                        (this._refreshItems(e),
                        t(e.target)
                            .parents()
                            .each(function () {
                                return t.data(this, o.widgetName + "-item") === o ? ((n = t(this)), !1) : void 0;
                            }),
                        t.data(e.target, o.widgetName + "-item") === o && (n = t(e.target)),
                        !n ||
                            (this.options.handle &&
                                !i &&
                                (t(this.options.handle, n)
                                    .find("*")
                                    .addBack()
                                    .each(function () {
                                        this === e.target && (s = !0);
                                    }),
                                !s)) ||
                            ((this.currentItem = n), this._removeCurrentsFromItems(), 0))
                    );
                },
                _mouseStart: function (e, i, n) {
                    var s,
                        o,
                        r = this.options;
                    if (
                        ((this.currentContainer = this).refreshPositions(),
                        (this.helper = this._createHelper(e)),
                        this._cacheHelperProportions(),
                        this._cacheMargins(),
                        (this.scrollParent = this.helper.scrollParent()),
                        (this.offset = this.currentItem.offset()),
                        (this.offset = { top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left }),
                        t.extend(this.offset, { click: { left: e.pageX - this.offset.left, top: e.pageY - this.offset.top }, parent: this._getParentOffset(), relative: this._getRelativeOffset() }),
                        this.helper.css("position", "absolute"),
                        (this.cssPosition = this.helper.css("position")),
                        (this.originalPosition = this._generatePosition(e)),
                        (this.originalPageX = e.pageX),
                        (this.originalPageY = e.pageY),
                        r.cursorAt && this._adjustOffsetFromHelper(r.cursorAt),
                        (this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] }),
                        this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
                        this._createPlaceholder(),
                        r.containment && this._setContainment(),
                        r.cursor &&
                            "auto" !== r.cursor &&
                            ((o = this.document.find("body")), (this.storedCursor = o.css("cursor")), o.css("cursor", r.cursor), (this.storedStylesheet = t("<style>*{ cursor: " + r.cursor + " !important; }</style>").appendTo(o))),
                        r.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", r.opacity)),
                        r.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", r.zIndex)),
                        this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()),
                        this._trigger("start", e, this._uiHash()),
                        this._preserveHelperProportions || this._cacheHelperProportions(),
                        !n)
                    )
                        for (s = this.containers.length - 1; 0 <= s; s--) this.containers[s]._trigger("activate", e, this._uiHash(this));
                    return (
                        t.ui.ddmanager && (t.ui.ddmanager.current = this),
                        t.ui.ddmanager && !r.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e),
                        (this.dragging = !0),
                        this._addClass(this.helper, "ui-sortable-helper"),
                        this._mouseDrag(e),
                        !0
                    );
                },
                _mouseDrag: function (e) {
                    var i,
                        n,
                        s,
                        o,
                        r = this.options,
                        a = !1;
                    for (
                        this.position = this._generatePosition(e),
                            this.positionAbs = this._convertPositionTo("absolute"),
                            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
                            this.options.scroll &&
                                (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName
                                    ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < r.scrollSensitivity
                                          ? (this.scrollParent[0].scrollTop = a = this.scrollParent[0].scrollTop + r.scrollSpeed)
                                          : e.pageY - this.overflowOffset.top < r.scrollSensitivity && (this.scrollParent[0].scrollTop = a = this.scrollParent[0].scrollTop - r.scrollSpeed),
                                      this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < r.scrollSensitivity
                                          ? (this.scrollParent[0].scrollLeft = a = this.scrollParent[0].scrollLeft + r.scrollSpeed)
                                          : e.pageX - this.overflowOffset.left < r.scrollSensitivity && (this.scrollParent[0].scrollLeft = a = this.scrollParent[0].scrollLeft - r.scrollSpeed))
                                    : (e.pageY - this.document.scrollTop() < r.scrollSensitivity
                                          ? (a = this.document.scrollTop(this.document.scrollTop() - r.scrollSpeed))
                                          : this.window.height() - (e.pageY - this.document.scrollTop()) < r.scrollSensitivity && (a = this.document.scrollTop(this.document.scrollTop() + r.scrollSpeed)),
                                      e.pageX - this.document.scrollLeft() < r.scrollSensitivity
                                          ? (a = this.document.scrollLeft(this.document.scrollLeft() - r.scrollSpeed))
                                          : this.window.width() - (e.pageX - this.document.scrollLeft()) < r.scrollSensitivity && (a = this.document.scrollLeft(this.document.scrollLeft() + r.scrollSpeed))),
                                !1 !== a && t.ui.ddmanager && !r.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)),
                            this.positionAbs = this._convertPositionTo("absolute"),
                            (this.options.axis && "y" === this.options.axis) || (this.helper[0].style.left = this.position.left + "px"),
                            (this.options.axis && "x" === this.options.axis) || (this.helper[0].style.top = this.position.top + "px"),
                            i = this.items.length - 1;
                        0 <= i;
                        i--
                    )
                        if (
                            ((s = (n = this.items[i]).item[0]),
                            (o = this._intersectsWithPointer(n)) &&
                                n.instance === this.currentContainer &&
                                s !== this.currentItem[0] &&
                                this.placeholder[1 === o ? "next" : "prev"]()[0] !== s &&
                                !t.contains(this.placeholder[0], s) &&
                                ("semi-dynamic" !== this.options.type || !t.contains(this.element[0], s)))
                        ) {
                            if (((this.direction = 1 === o ? "down" : "up"), "pointer" !== this.options.tolerance && !this._intersectsWithSides(n))) break;
                            this._rearrange(e, n), this._trigger("change", e, this._uiHash());
                            break;
                        }
                    return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), (this.lastPositionAbs = this.positionAbs), !1;
                },
                _mouseStop: function (e, i) {
                    if (e) {
                        if ((t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert)) {
                            var n = this,
                                s = this.placeholder.offset(),
                                o = this.options.axis,
                                r = {};
                            (o && "x" !== o) || (r.left = s.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)),
                                (o && "y" !== o) || (r.top = s.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)),
                                (this.reverting = !0),
                                t(this.helper).animate(r, parseInt(this.options.revert, 10) || 500, function () {
                                    n._clear(e);
                                });
                        } else this._clear(e, i);
                        return !1;
                    }
                },
                cancel: function () {
                    if (this.dragging) {
                        this._mouseUp(new t.Event("mouseup", { target: null })),
                            "original" === this.options.helper ? (this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();
                        for (var e = this.containers.length - 1; 0 <= e; e--)
                            this.containers[e]._trigger("deactivate", null, this._uiHash(this)),
                                this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), (this.containers[e].containerCache.over = 0));
                    }
                    return (
                        this.placeholder &&
                            (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
                            "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(),
                            t.extend(this, { helper: null, dragging: !1, reverting: !1, _noFinalSort: null }),
                            this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)),
                        this
                    );
                },
                serialize: function (e) {
                    var i = this._getItemsAsjQuery(e && e.connected),
                        n = [];
                    return (
                        (e = e || {}),
                        t(i).each(function () {
                            var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                            i && n.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]));
                        }),
                        !n.length && e.key && n.push(e.key + "="),
                        n.join("&")
                    );
                },
                toArray: function (e) {
                    var i = this._getItemsAsjQuery(e && e.connected),
                        n = [];
                    return (
                        (e = e || {}),
                        i.each(function () {
                            n.push(t(e.item || this).attr(e.attribute || "id") || "");
                        }),
                        n
                    );
                },
                _intersectsWith: function (t) {
                    var e = this.positionAbs.left,
                        i = e + this.helperProportions.width,
                        n = this.positionAbs.top,
                        s = n + this.helperProportions.height,
                        o = t.left,
                        r = o + t.width,
                        a = t.top,
                        l = a + t.height,
                        h = this.offset.click.top,
                        c = this.offset.click.left,
                        u = "x" === this.options.axis || (a < n + h && n + h < l),
                        d = "y" === this.options.axis || (o < e + c && e + c < r),
                        p = u && d;
                    return "pointer" === this.options.tolerance ||
                        this.options.forcePointerForContainers ||
                        ("pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"])
                        ? p
                        : e + this.helperProportions.width / 2 > o && r > i - this.helperProportions.width / 2 && n + this.helperProportions.height / 2 > a && l > s - this.helperProportions.height / 2;
                },
                _intersectsWithPointer: function (t) {
                    var e,
                        i,
                        n = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height),
                        s = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width);
                    return !(!n || !s) && ((e = this._getDragVerticalDirection()), (i = this._getDragHorizontalDirection()), this.floating ? ("right" === i || "down" === e ? 2 : 1) : e && ("down" === e ? 2 : 1));
                },
                _intersectsWithSides: function (t) {
                    var e = this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
                        i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
                        n = this._getDragVerticalDirection(),
                        s = this._getDragHorizontalDirection();
                    return this.floating && s ? ("right" === s && i) || ("left" === s && !i) : n && (("down" === n && e) || ("up" === n && !e));
                },
                _getDragVerticalDirection: function () {
                    var t = this.positionAbs.top - this.lastPositionAbs.top;
                    return 0 != t && (0 < t ? "down" : "up");
                },
                _getDragHorizontalDirection: function () {
                    var t = this.positionAbs.left - this.lastPositionAbs.left;
                    return 0 != t && (0 < t ? "right" : "left");
                },
                refresh: function (t) {
                    return this._refreshItems(t), this._setHandleClassName(), this.refreshPositions(), this;
                },
                _connectWith: function () {
                    var t = this.options;
                    return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith;
                },
                _getItemsAsjQuery: function (e) {
                    function i() {
                        a.push(this);
                    }
                    var n,
                        s,
                        o,
                        r,
                        a = [],
                        l = [],
                        h = this._connectWith();
                    if (h && e)
                        for (n = h.length - 1; 0 <= n; n--)
                            for (s = (o = t(h[n], this.document[0])).length - 1; 0 <= s; s--)
                                (r = t.data(o[s], this.widgetFullName)) &&
                                    r !== this &&
                                    !r.options.disabled &&
                                    l.push([t.isFunction(r.options.items) ? r.options.items.call(r.element) : t(r.options.items, r.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), r]);
                    for (
                        l.push([
                            t.isFunction(this.options.items)
                                ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem })
                                : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),
                            this,
                        ]),
                            n = l.length - 1;
                        0 <= n;
                        n--
                    )
                        l[n][0].each(i);
                    return t(a);
                },
                _removeCurrentsFromItems: function () {
                    var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
                    this.items = t.grep(this.items, function (t) {
                        for (var i = 0; e.length > i; i++) if (e[i] === t.item[0]) return !1;
                        return !0;
                    });
                },
                _refreshItems: function (e) {
                    (this.items = []), (this.containers = [this]);
                    var i,
                        n,
                        s,
                        o,
                        r,
                        a,
                        l,
                        h,
                        c = this.items,
                        u = [[t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, { item: this.currentItem }) : t(this.options.items, this.element), this]],
                        d = this._connectWith();
                    if (d && this.ready)
                        for (i = d.length - 1; 0 <= i; i--)
                            for (n = (s = t(d[i], this.document[0])).length - 1; 0 <= n; n--)
                                (o = t.data(s[n], this.widgetFullName)) &&
                                    o !== this &&
                                    !o.options.disabled &&
                                    (u.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, { item: this.currentItem }) : t(o.options.items, o.element), o]), this.containers.push(o));
                    for (i = u.length - 1; 0 <= i; i--) for (r = u[i][1], n = 0, h = (a = u[i][0]).length; n < h; n++) (l = t(a[n])).data(this.widgetName + "-item", r), c.push({ item: l, instance: r, width: 0, height: 0, left: 0, top: 0 });
                },
                refreshPositions: function (e) {
                    var i, n, s, o;
                    for (
                        this.floating = !!this.items.length && ("x" === this.options.axis || this._isFloating(this.items[0].item)),
                            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset()),
                            i = this.items.length - 1;
                        0 <= i;
                        i--
                    )
                        ((n = this.items[i]).instance !== this.currentContainer && this.currentContainer && n.item[0] !== this.currentItem[0]) ||
                            ((s = this.options.toleranceElement ? t(this.options.toleranceElement, n.item) : n.item), e || ((n.width = s.outerWidth()), (n.height = s.outerHeight())), (o = s.offset()), (n.left = o.left), (n.top = o.top));
                    if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                    else
                        for (i = this.containers.length - 1; 0 <= i; i--)
                            (o = this.containers[i].element.offset()),
                                (this.containers[i].containerCache.left = o.left),
                                (this.containers[i].containerCache.top = o.top),
                                (this.containers[i].containerCache.width = this.containers[i].element.outerWidth()),
                                (this.containers[i].containerCache.height = this.containers[i].element.outerHeight());
                    return this;
                },
                _createPlaceholder: function (e) {
                    var i,
                        n = (e = e || this).options;
                    (n.placeholder && n.placeholder.constructor !== String) ||
                        ((i = n.placeholder),
                        (n.placeholder = {
                            element: function () {
                                var n = e.currentItem[0].nodeName.toLowerCase(),
                                    s = t("<" + n + ">", e.document[0]);
                                return (
                                    e._addClass(s, "ui-sortable-placeholder", i || e.currentItem[0].className)._removeClass(s, "ui-sortable-helper"),
                                    "tbody" === n
                                        ? e._createTrPlaceholder(e.currentItem.find("tr").eq(0), t("<tr>", e.document[0]).appendTo(s))
                                        : "tr" === n
                                        ? e._createTrPlaceholder(e.currentItem, s)
                                        : "img" === n && s.attr("src", e.currentItem.attr("src")),
                                    i || s.css("visibility", "hidden"),
                                    s
                                );
                            },
                            update: function (t, s) {
                                (i && !n.forcePlaceholderSize) ||
                                    (s.height() || s.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)),
                                    s.width() || s.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)));
                            },
                        })),
                        (e.placeholder = t(n.placeholder.element.call(e.element, e.currentItem))),
                        e.currentItem.after(e.placeholder),
                        n.placeholder.update(e, e.placeholder);
                },
                _createTrPlaceholder: function (e, i) {
                    var n = this;
                    e.children().each(function () {
                        t("<td>&#160;</td>", n.document[0])
                            .attr("colspan", t(this).attr("colspan") || 1)
                            .appendTo(i);
                    });
                },
                _contactContainers: function (e) {
                    var i,
                        n,
                        s,
                        o,
                        r,
                        a,
                        l,
                        h,
                        c,
                        u,
                        d = null,
                        p = null;
                    for (i = this.containers.length - 1; 0 <= i; i--)
                        if (!t.contains(this.currentItem[0], this.containers[i].element[0]))
                            if (this._intersectsWith(this.containers[i].containerCache)) {
                                if (d && t.contains(this.containers[i].element[0], d.element[0])) continue;
                                (d = this.containers[i]), (p = i);
                            } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", e, this._uiHash(this)), (this.containers[i].containerCache.over = 0));
                    if (d)
                        if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash(this)), (this.containers[p].containerCache.over = 1));
                        else {
                            for (s = 1e4, o = null, r = (c = d.floating || this._isFloating(this.currentItem)) ? "left" : "top", a = c ? "width" : "height", u = c ? "pageX" : "pageY", n = this.items.length - 1; 0 <= n; n--)
                                t.contains(this.containers[p].element[0], this.items[n].item[0]) &&
                                    this.items[n].item[0] !== this.currentItem[0] &&
                                    ((l = this.items[n].item.offset()[r]),
                                    (h = !1),
                                    e[u] - l > this.items[n][a] / 2 && (h = !0),
                                    s > Math.abs(e[u] - l) && ((s = Math.abs(e[u] - l)), (o = this.items[n]), (this.direction = h ? "up" : "down")));
                            if (!o && !this.options.dropOnEmpty) return;
                            if (this.currentContainer === this.containers[p])
                                return void (this.currentContainer.containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash()), (this.currentContainer.containerCache.over = 1)));
                            o ? this._rearrange(e, o, null, !0) : this._rearrange(e, null, this.containers[p].element, !0),
                                this._trigger("change", e, this._uiHash()),
                                this.containers[p]._trigger("change", e, this._uiHash(this)),
                                (this.currentContainer = this.containers[p]),
                                this.options.placeholder.update(this.currentContainer, this.placeholder),
                                this.containers[p]._trigger("over", e, this._uiHash(this)),
                                (this.containers[p].containerCache.over = 1);
                        }
                },
                _createHelper: function (e) {
                    var i = this.options,
                        n = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
                    return (
                        n.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(n[0]),
                        n[0] === this.currentItem[0] &&
                            (this._storedCSS = {
                                width: this.currentItem[0].style.width,
                                height: this.currentItem[0].style.height,
                                position: this.currentItem.css("position"),
                                top: this.currentItem.css("top"),
                                left: this.currentItem.css("left"),
                            }),
                        (n[0].style.width && !i.forceHelperSize) || n.width(this.currentItem.width()),
                        (n[0].style.height && !i.forceHelperSize) || n.height(this.currentItem.height()),
                        n
                    );
                },
                _adjustOffsetFromHelper: function (e) {
                    "string" == typeof e && (e = e.split(" ")),
                        t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }),
                        "left" in e && (this.offset.click.left = e.left + this.margins.left),
                        "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left),
                        "top" in e && (this.offset.click.top = e.top + this.margins.top),
                        "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top);
                },
                _getParentOffset: function () {
                    this.offsetParent = this.helper.offsetParent();
                    var e = this.offsetParent.offset();
                    return (
                        "absolute" === this.cssPosition &&
                            this.scrollParent[0] !== this.document[0] &&
                            t.contains(this.scrollParent[0], this.offsetParent[0]) &&
                            ((e.left += this.scrollParent.scrollLeft()), (e.top += this.scrollParent.scrollTop())),
                        (this.offsetParent[0] === this.document[0].body || (this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie)) && (e = { top: 0, left: 0 }),
                        { top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) }
                    );
                },
                _getRelativeOffset: function () {
                    if ("relative" !== this.cssPosition) return { top: 0, left: 0 };
                    var t = this.currentItem.position();
                    return { top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft() };
                },
                _cacheMargins: function () {
                    this.margins = { left: parseInt(this.currentItem.css("marginLeft"), 10) || 0, top: parseInt(this.currentItem.css("marginTop"), 10) || 0 };
                },
                _cacheHelperProportions: function () {
                    this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };
                },
                _setContainment: function () {
                    var e,
                        i,
                        n,
                        s = this.options;
                    "parent" === s.containment && (s.containment = this.helper[0].parentNode),
                        ("document" !== s.containment && "window" !== s.containment) ||
                            (this.containment = [
                                0 - this.offset.relative.left - this.offset.parent.left,
                                0 - this.offset.relative.top - this.offset.parent.top,
                                "document" === s.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left,
                                ("document" === s.containment ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) -
                                    this.helperProportions.height -
                                    this.margins.top,
                            ]),
                        /^(document|window|parent)$/.test(s.containment) ||
                            ((e = t(s.containment)[0]),
                            (i = t(s.containment).offset()),
                            (n = "hidden" !== t(e).css("overflow")),
                            (this.containment = [
                                i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left,
                                i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top,
                                i.left +
                                    (n ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) -
                                    (parseInt(t(e).css("borderLeftWidth"), 10) || 0) -
                                    (parseInt(t(e).css("paddingRight"), 10) || 0) -
                                    this.helperProportions.width -
                                    this.margins.left,
                                i.top +
                                    (n ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) -
                                    (parseInt(t(e).css("borderTopWidth"), 10) || 0) -
                                    (parseInt(t(e).css("paddingBottom"), 10) || 0) -
                                    this.helperProportions.height -
                                    this.margins.top,
                            ]));
                },
                _convertPositionTo: function (e, i) {
                    i = i || this.position;
                    var n = "absolute" === e ? 1 : -1,
                        s = "absolute" !== this.cssPosition || (this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0])) ? this.scrollParent : this.offsetParent,
                        o = /(html|body)/i.test(s[0].tagName);
                    return {
                        top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * n,
                        left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * n,
                    };
                },
                _generatePosition: function (e) {
                    var i,
                        n,
                        s = this.options,
                        o = e.pageX,
                        r = e.pageY,
                        a = "absolute" !== this.cssPosition || (this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0])) ? this.scrollParent : this.offsetParent,
                        l = /(html|body)/i.test(a[0].tagName);
                    return (
                        "relative" !== this.cssPosition || (this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0]) || (this.offset.relative = this._getRelativeOffset()),
                        this.originalPosition &&
                            (this.containment &&
                                (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left),
                                e.pageY - this.offset.click.top < this.containment[1] && (r = this.containment[1] + this.offset.click.top),
                                e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left),
                                e.pageY - this.offset.click.top > this.containment[3] && (r = this.containment[3] + this.offset.click.top)),
                            s.grid &&
                                ((i = this.originalPageY + Math.round((r - this.originalPageY) / s.grid[1]) * s.grid[1]),
                                (r = this.containment
                                    ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3]
                                        ? i
                                        : i - this.offset.click.top >= this.containment[1]
                                        ? i - s.grid[1]
                                        : i + s.grid[1]
                                    : i),
                                (n = this.originalPageX + Math.round((o - this.originalPageX) / s.grid[0]) * s.grid[0]),
                                (o = this.containment
                                    ? n - this.offset.click.left >= this.containment[0] && n - this.offset.click.left <= this.containment[2]
                                        ? n
                                        : n - this.offset.click.left >= this.containment[0]
                                        ? n - s.grid[0]
                                        : n + s.grid[0]
                                    : n))),
                        {
                            top: r - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : a.scrollTop()),
                            left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : a.scrollLeft()),
                        }
                    );
                },
                _rearrange: function (t, e, i, n) {
                    i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), (this.counter = this.counter ? ++this.counter : 1);
                    var s = this.counter;
                    this._delay(function () {
                        s === this.counter && this.refreshPositions(!n);
                    });
                },
                _clear: function (t, e) {
                    function i(t, e, i) {
                        return function (n) {
                            i._trigger(t, n, e._uiHash(e));
                        };
                    }
                    this.reverting = !1;
                    var n,
                        s = [];
                    if ((!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), (this._noFinalSort = null), this.helper[0] === this.currentItem[0])) {
                        for (n in this._storedCSS) ("auto" !== this._storedCSS[n] && "static" !== this._storedCSS[n]) || (this._storedCSS[n] = "");
                        this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper");
                    } else this.currentItem.show();
                    for (
                        this.fromOutside &&
                            !e &&
                            s.push(function (t) {
                                this._trigger("receive", t, this._uiHash(this.fromOutside));
                            }),
                            (!this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0]) ||
                                e ||
                                s.push(function (t) {
                                    this._trigger("update", t, this._uiHash());
                                }),
                            this !== this.currentContainer &&
                                (e ||
                                    (s.push(function (t) {
                                        this._trigger("remove", t, this._uiHash());
                                    }),
                                    s.push(
                                        function (t) {
                                            return function (e) {
                                                t._trigger("receive", e, this._uiHash(this));
                                            };
                                        }.call(this, this.currentContainer)
                                    ),
                                    s.push(
                                        function (t) {
                                            return function (e) {
                                                t._trigger("update", e, this._uiHash(this));
                                            };
                                        }.call(this, this.currentContainer)
                                    ))),
                            n = this.containers.length - 1;
                        0 <= n;
                        n--
                    )
                        e || s.push(i("deactivate", this, this.containers[n])), this.containers[n].containerCache.over && (s.push(i("out", this, this.containers[n])), (this.containers[n].containerCache.over = 0));
                    if (
                        (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()),
                        this._storedOpacity && this.helper.css("opacity", this._storedOpacity),
                        this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex),
                        (this.dragging = !1),
                        e || this._trigger("beforeStop", t, this._uiHash()),
                        this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
                        this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), (this.helper = null)),
                        !e)
                    ) {
                        for (n = 0; s.length > n; n++) s[n].call(this, t);
                        this._trigger("stop", t, this._uiHash());
                    }
                    return (this.fromOutside = !1), !this.cancelHelperRemoval;
                },
                _trigger: function () {
                    !1 === t.Widget.prototype._trigger.apply(this, arguments) && this.cancel();
                },
                _uiHash: function (e) {
                    var i = e || this;
                    return { helper: i.helper, placeholder: i.placeholder || t([]), position: i.position, originalPosition: i.originalPosition, offset: i.positionAbs, item: i.currentItem, sender: e ? e.element : null };
                },
            }),
            t.widget("ui.spinner", {
                version: "1.12.1",
                defaultElement: "<input>",
                widgetEventPrefix: "spin",
                options: {
                    classes: { "ui-spinner": "ui-corner-all", "ui-spinner-down": "ui-corner-br", "ui-spinner-up": "ui-corner-tr" },
                    culture: null,
                    icons: { down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n" },
                    incremental: !0,
                    max: null,
                    min: null,
                    numberFormat: null,
                    page: 10,
                    step: 1,
                    change: null,
                    spin: null,
                    start: null,
                    stop: null,
                },
                _create: function () {
                    this._setOption("max", this.options.max),
                        this._setOption("min", this.options.min),
                        this._setOption("step", this.options.step),
                        "" !== this.value() && this._value(this.element.val(), !0),
                        this._draw(),
                        this._on(this._events),
                        this._refresh(),
                        this._on(this.window, {
                            beforeunload: function () {
                                this.element.removeAttr("autocomplete");
                            },
                        });
                },
                _getCreateOptions: function () {
                    var e = this._super(),
                        i = this.element;
                    return (
                        t.each(["min", "max", "step"], function (t, n) {
                            var s = i.attr(n);
                            null != s && s.length && (e[n] = s);
                        }),
                        e
                    );
                },
                _events: {
                    keydown: function (t) {
                        this._start(t) && this._keydown(t) && t.preventDefault();
                    },
                    keyup: "_stop",
                    focus: function () {
                        this.previous = this.element.val();
                    },
                    blur: function (t) {
                        return this.cancelBlur ? void delete this.cancelBlur : (this._stop(), this._refresh(), void (this.previous !== this.element.val() && this._trigger("change", t)));
                    },
                    mousewheel: function (t, e) {
                        if (e) {
                            if (!this.spinning && !this._start(t)) return !1;
                            this._spin((0 < e ? 1 : -1) * this.options.step, t),
                                clearTimeout(this.mousewheelTimer),
                                (this.mousewheelTimer = this._delay(function () {
                                    this.spinning && this._stop(t);
                                }, 100)),
                                t.preventDefault();
                        }
                    },
                    "mousedown .ui-spinner-button": function (e) {
                        function i() {
                            this.element[0] === t.ui.safeActiveElement(this.document[0]) ||
                                (this.element.trigger("focus"),
                                (this.previous = n),
                                this._delay(function () {
                                    this.previous = n;
                                }));
                        }
                        var n;
                        (n = this.element[0] === t.ui.safeActiveElement(this.document[0]) ? this.previous : this.element.val()),
                            e.preventDefault(),
                            i.call(this),
                            (this.cancelBlur = !0),
                            this._delay(function () {
                                delete this.cancelBlur, i.call(this);
                            }),
                            !1 !== this._start(e) && this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e);
                    },
                    "mouseup .ui-spinner-button": "_stop",
                    "mouseenter .ui-spinner-button": function (e) {
                        return t(e.currentTarget).hasClass("ui-state-active") ? !1 !== this._start(e) && void this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e) : void 0;
                    },
                    "mouseleave .ui-spinner-button": "_stop",
                },
                _enhance: function () {
                    this.uiSpinner = this.element.attr("autocomplete", "off").wrap("<span>").parent().append("<a></a><a></a>");
                },
                _draw: function () {
                    this._enhance(),
                        this._addClass(this.uiSpinner, "ui-spinner", "ui-widget ui-widget-content"),
                        this._addClass("ui-spinner-input"),
                        this.element.attr("role", "spinbutton"),
                        (this.buttons = this.uiSpinner
                            .children("a")
                            .attr("tabIndex", -1)
                            .attr("aria-hidden", !0)
                            .button({ classes: { "ui-button": "" } })),
                        this._removeClass(this.buttons, "ui-corner-all"),
                        this._addClass(this.buttons.first(), "ui-spinner-button ui-spinner-up"),
                        this._addClass(this.buttons.last(), "ui-spinner-button ui-spinner-down"),
                        this.buttons.first().button({ icon: this.options.icons.up, showLabel: !1 }),
                        this.buttons.last().button({ icon: this.options.icons.down, showLabel: !1 }),
                        this.buttons.height() > Math.ceil(0.5 * this.uiSpinner.height()) && 0 < this.uiSpinner.height() && this.uiSpinner.height(this.uiSpinner.height());
                },
                _keydown: function (e) {
                    var i = this.options,
                        n = t.ui.keyCode;
                    switch (e.keyCode) {
                        case n.UP:
                            return this._repeat(null, 1, e), !0;
                        case n.DOWN:
                            return this._repeat(null, -1, e), !0;
                        case n.PAGE_UP:
                            return this._repeat(null, i.page, e), !0;
                        case n.PAGE_DOWN:
                            return this._repeat(null, -i.page, e), !0;
                    }
                    return !1;
                },
                _start: function (t) {
                    return !(!this.spinning && !1 === this._trigger("start", t)) && (this.counter || (this.counter = 1), (this.spinning = !0));
                },
                _repeat: function (t, e, i) {
                    (t = t || 500),
                        clearTimeout(this.timer),
                        (this.timer = this._delay(function () {
                            this._repeat(40, e, i);
                        }, t)),
                        this._spin(e * this.options.step, i);
                },
                _spin: function (t, e) {
                    var i = this.value() || 0;
                    this.counter || (this.counter = 1), (i = this._adjustValue(i + t * this._increment(this.counter))), (this.spinning && !1 === this._trigger("spin", e, { value: i })) || (this._value(i), this.counter++);
                },
                _increment: function (e) {
                    var i = this.options.incremental;
                    return i ? (t.isFunction(i) ? i(e) : Math.floor((e * e * e) / 5e4 - (e * e) / 500 + (17 * e) / 200 + 1)) : 1;
                },
                _precision: function () {
                    var t = this._precisionOf(this.options.step);
                    return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t;
                },
                _precisionOf: function (t) {
                    var e = "" + t,
                        i = e.indexOf(".");
                    return -1 === i ? 0 : e.length - i - 1;
                },
                _adjustValue: function (t) {
                    var e,
                        i,
                        n = this.options;
                    return (
                        (i = t - (e = null !== n.min ? n.min : 0)),
                        (t = e + (i = Math.round(i / n.step) * n.step)),
                        (t = parseFloat(t.toFixed(this._precision()))),
                        null !== n.max && t > n.max ? n.max : null !== n.min && n.min > t ? n.min : t
                    );
                },
                _stop: function (t) {
                    this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), (this.counter = 0), (this.spinning = !1), this._trigger("stop", t));
                },
                _setOption: function (t, e) {
                    var i, n, s;
                    return "culture" === t || "numberFormat" === t
                        ? ((i = this._parse(this.element.val())), (this.options[t] = e), void this.element.val(this._format(i)))
                        : (("max" !== t && "min" !== t && "step" !== t) || "string" != typeof e || (e = this._parse(e)),
                          "icons" === t &&
                              ((n = this.buttons.first().find(".ui-icon")),
                              this._removeClass(n, null, this.options.icons.up),
                              this._addClass(n, null, e.up),
                              (s = this.buttons.last().find(".ui-icon")),
                              this._removeClass(s, null, this.options.icons.down),
                              this._addClass(s, null, e.down)),
                          void this._super(t, e));
                },
                _setOptionDisabled: function (t) {
                    this._super(t), this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!t), this.element.prop("disabled", !!t), this.buttons.button(t ? "disable" : "enable");
                },
                _setOptions: o(function (t) {
                    this._super(t);
                }),
                _parse: function (t) {
                    return "string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t), "" === t || isNaN(t) ? null : t;
                },
                _format: function (t) {
                    return "" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t;
                },
                _refresh: function () {
                    this.element.attr({ "aria-valuemin": this.options.min, "aria-valuemax": this.options.max, "aria-valuenow": this._parse(this.element.val()) });
                },
                isValid: function () {
                    var t = this.value();
                    return null !== t && t === this._adjustValue(t);
                },
                _value: function (t, e) {
                    var i;
                    "" === t || (null !== (i = this._parse(t)) && (e || (i = this._adjustValue(i)), (t = this._format(i)))), this.element.val(t), this._refresh();
                },
                _destroy: function () {
                    this.element.prop("disabled", !1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"), this.uiSpinner.replaceWith(this.element);
                },
                stepUp: o(function (t) {
                    this._stepUp(t);
                }),
                _stepUp: function (t) {
                    this._start() && (this._spin((t || 1) * this.options.step), this._stop());
                },
                stepDown: o(function (t) {
                    this._stepDown(t);
                }),
                _stepDown: function (t) {
                    this._start() && (this._spin((t || 1) * -this.options.step), this._stop());
                },
                pageUp: o(function (t) {
                    this._stepUp((t || 1) * this.options.page);
                }),
                pageDown: o(function (t) {
                    this._stepDown((t || 1) * this.options.page);
                }),
                value: function (t) {
                    return arguments.length ? void o(this._value).call(this, t) : this._parse(this.element.val());
                },
                widget: function () {
                    return this.uiSpinner;
                },
            }),
            !1 !== t.uiBackCompat &&
                t.widget("ui.spinner", t.ui.spinner, {
                    _enhance: function () {
                        this.uiSpinner = this.element.attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
                    },
                    _uiSpinnerHtml: function () {
                        return "<span>";
                    },
                    _buttonHtml: function () {
                        return "<a></a><a></a>";
                    },
                }),
            t.ui.spinner,
            t.widget("ui.tabs", {
                version: "1.12.1",
                delay: 300,
                options: {
                    active: null,
                    classes: { "ui-tabs": "ui-corner-all", "ui-tabs-nav": "ui-corner-all", "ui-tabs-panel": "ui-corner-bottom", "ui-tabs-tab": "ui-corner-top" },
                    collapsible: !1,
                    event: "click",
                    heightStyle: "content",
                    hide: null,
                    show: null,
                    activate: null,
                    beforeActivate: null,
                    beforeLoad: null,
                    load: null,
                },
                _isLocal:
                    ((ot = /#.*$/),
                    function (t) {
                        var e, i;
                        (e = t.href.replace(ot, "")), (i = location.href.replace(ot, ""));
                        try {
                            e = decodeURIComponent(e);
                        } catch (t) {}
                        try {
                            i = decodeURIComponent(i);
                        } catch (t) {}
                        return 1 < t.hash.length && e === i;
                    }),
                _create: function () {
                    var e = this,
                        i = this.options;
                    (this.running = !1),
                        this._addClass("ui-tabs", "ui-widget ui-widget-content"),
                        this._toggleClass("ui-tabs-collapsible", null, i.collapsible),
                        this._processTabs(),
                        (i.active = this._initialActive()),
                        t.isArray(i.disabled) &&
                            (i.disabled = t
                                .unique(
                                    i.disabled.concat(
                                        t.map(this.tabs.filter(".ui-state-disabled"), function (t) {
                                            return e.tabs.index(t);
                                        })
                                    )
                                )
                                .sort()),
                        (this.active = !1 !== this.options.active && this.anchors.length ? this._findActive(i.active) : t()),
                        this._refresh(),
                        this.active.length && this.load(i.active);
                },
                _initialActive: function () {
                    var e = this.options.active,
                        i = this.options.collapsible,
                        n = location.hash.substring(1);
                    return (
                        null === e &&
                            (n &&
                                this.tabs.each(function (i, s) {
                                    return t(s).attr("aria-controls") === n ? ((e = i), !1) : void 0;
                                }),
                            null === e && (e = this.tabs.index(this.tabs.filter(".ui-tabs-active"))),
                            (null !== e && -1 !== e) || (e = !!this.tabs.length && 0)),
                        !1 !== e && -1 === (e = this.tabs.index(this.tabs.eq(e))) && (e = !i && 0),
                        !i && !1 === e && this.anchors.length && (e = 0),
                        e
                    );
                },
                _getCreateEventData: function () {
                    return { tab: this.active, panel: this.active.length ? this._getPanelForTab(this.active) : t() };
                },
                _tabKeydown: function (e) {
                    var i = t(t.ui.safeActiveElement(this.document[0])).closest("li"),
                        n = this.tabs.index(i),
                        s = !0;
                    if (!this._handlePageNav(e)) {
                        switch (e.keyCode) {
                            case t.ui.keyCode.RIGHT:
                            case t.ui.keyCode.DOWN:
                                n++;
                                break;
                            case t.ui.keyCode.UP:
                            case t.ui.keyCode.LEFT:
                                (s = !1), n--;
                                break;
                            case t.ui.keyCode.END:
                                n = this.anchors.length - 1;
                                break;
                            case t.ui.keyCode.HOME:
                                n = 0;
                                break;
                            case t.ui.keyCode.SPACE:
                                return e.preventDefault(), clearTimeout(this.activating), void this._activate(n);
                            case t.ui.keyCode.ENTER:
                                return e.preventDefault(), clearTimeout(this.activating), void this._activate(n !== this.options.active && n);
                            default:
                                return;
                        }
                        e.preventDefault(),
                            clearTimeout(this.activating),
                            (n = this._focusNextTab(n, s)),
                            e.ctrlKey ||
                                e.metaKey ||
                                (i.attr("aria-selected", "false"),
                                this.tabs.eq(n).attr("aria-selected", "true"),
                                (this.activating = this._delay(function () {
                                    this.option("active", n);
                                }, this.delay)));
                    }
                },
                _panelKeydown: function (e) {
                    this._handlePageNav(e) || (e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.trigger("focus")));
                },
                _handlePageNav: function (e) {
                    return e.altKey && e.keyCode === t.ui.keyCode.PAGE_UP
                        ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0)
                        : e.altKey && e.keyCode === t.ui.keyCode.PAGE_DOWN
                        ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0)
                        : void 0;
                },
                _findNextTab: function (e, i) {
                    for (var n = this.tabs.length - 1; -1 !== t.inArray((n < e && (e = 0), e < 0 && (e = n), e), this.options.disabled); ) e = i ? e + 1 : e - 1;
                    return e;
                },
                _focusNextTab: function (t, e) {
                    return (t = this._findNextTab(t, e)), this.tabs.eq(t).trigger("focus"), t;
                },
                _setOption: function (t, e) {
                    return "active" === t
                        ? void this._activate(e)
                        : (this._super(t, e),
                          "collapsible" === t && (this._toggleClass("ui-tabs-collapsible", null, e), e || !1 !== this.options.active || this._activate(0)),
                          "event" === t && this._setupEvents(e),
                          void ("heightStyle" === t && this._setupHeightStyle(e)));
                },
                _sanitizeSelector: function (t) {
                    return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : "";
                },
                refresh: function () {
                    var e = this.options,
                        i = this.tablist.children(":has(a[href])");
                    (e.disabled = t.map(i.filter(".ui-state-disabled"), function (t) {
                        return i.index(t);
                    })),
                        this._processTabs(),
                        !1 !== e.active && this.anchors.length
                            ? this.active.length && !t.contains(this.tablist[0], this.active[0])
                                ? this.tabs.length === e.disabled.length
                                    ? ((e.active = !1), (this.active = t()))
                                    : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1))
                                : (e.active = this.tabs.index(this.active))
                            : ((e.active = !1), (this.active = t())),
                        this._refresh();
                },
                _refresh: function () {
                    this._setOptionDisabled(this.options.disabled),
                        this._setupEvents(this.options.event),
                        this._setupHeightStyle(this.options.heightStyle),
                        this.tabs.not(this.active).attr({ "aria-selected": "false", "aria-expanded": "false", tabIndex: -1 }),
                        this.panels.not(this._getPanelForTab(this.active)).hide().attr({ "aria-hidden": "true" }),
                        this.active.length
                            ? (this.active.attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 }),
                              this._addClass(this.active, "ui-tabs-active", "ui-state-active"),
                              this._getPanelForTab(this.active).show().attr({ "aria-hidden": "false" }))
                            : this.tabs.eq(0).attr("tabIndex", 0);
                },
                _processTabs: function () {
                    var e = this,
                        i = this.tabs,
                        n = this.anchors,
                        s = this.panels;
                    (this.tablist = this._getList().attr("role", "tablist")),
                        this._addClass(this.tablist, "ui-tabs-nav", "ui-helper-reset ui-helper-clearfix ui-widget-header"),
                        this.tablist
                            .on("mousedown" + this.eventNamespace, "> li", function (e) {
                                t(this).is(".ui-state-disabled") && e.preventDefault();
                            })
                            .on("focus" + this.eventNamespace, ".ui-tabs-anchor", function () {
                                t(this).closest("li").is(".ui-state-disabled") && this.blur();
                            }),
                        (this.tabs = this.tablist.find("> li:has(a[href])").attr({ role: "tab", tabIndex: -1 })),
                        this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default"),
                        (this.anchors = this.tabs
                            .map(function () {
                                return t("a", this)[0];
                            })
                            .attr({ role: "presentation", tabIndex: -1 })),
                        this._addClass(this.anchors, "ui-tabs-anchor"),
                        (this.panels = t()),
                        this.anchors.each(function (i, n) {
                            var s,
                                o,
                                r,
                                a = t(n).uniqueId().attr("id"),
                                l = t(n).closest("li"),
                                h = l.attr("aria-controls");
                            e._isLocal(n)
                                ? ((r = (s = n.hash).substring(1)), (o = e.element.find(e._sanitizeSelector(s))))
                                : ((s = "#" + (r = l.attr("aria-controls") || t({}).uniqueId()[0].id)), (o = e.element.find(s)).length || (o = e._createPanel(r)).insertAfter(e.panels[i - 1] || e.tablist), o.attr("aria-live", "polite")),
                                o.length && (e.panels = e.panels.add(o)),
                                h && l.data("ui-tabs-aria-controls", h),
                                l.attr({ "aria-controls": r, "aria-labelledby": a }),
                                o.attr("aria-labelledby", a);
                        }),
                        this.panels.attr("role", "tabpanel"),
                        this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content"),
                        i && (this._off(i.not(this.tabs)), this._off(n.not(this.anchors)), this._off(s.not(this.panels)));
                },
                _getList: function () {
                    return this.tablist || this.element.find("ol, ul").eq(0);
                },
                _createPanel: function (e) {
                    return t("<div>").attr("id", e).data("ui-tabs-destroy", !0);
                },
                _setOptionDisabled: function (e) {
                    var i, n, s;
                    for (t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : (e = !1)), s = 0; (n = this.tabs[s]); s++)
                        (i = t(n)), !0 === e || -1 !== t.inArray(s, e) ? (i.attr("aria-disabled", "true"), this._addClass(i, null, "ui-state-disabled")) : (i.removeAttr("aria-disabled"), this._removeClass(i, null, "ui-state-disabled"));
                    (this.options.disabled = e), this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !0 === e);
                },
                _setupEvents: function (e) {
                    var i = {};
                    e &&
                        t.each(e.split(" "), function (t, e) {
                            i[e] = "_eventHandler";
                        }),
                        this._off(this.anchors.add(this.tabs).add(this.panels)),
                        this._on(!0, this.anchors, {
                            click: function (t) {
                                t.preventDefault();
                            },
                        }),
                        this._on(this.anchors, i),
                        this._on(this.tabs, { keydown: "_tabKeydown" }),
                        this._on(this.panels, { keydown: "_panelKeydown" }),
                        this._focusable(this.tabs),
                        this._hoverable(this.tabs);
                },
                _setupHeightStyle: function (e) {
                    var i,
                        n = this.element.parent();
                    "fill" === e
                        ? ((i = n.height()),
                          (i -= this.element.outerHeight() - this.element.height()),
                          this.element.siblings(":visible").each(function () {
                              var e = t(this),
                                  n = e.css("position");
                              "absolute" !== n && "fixed" !== n && (i -= e.outerHeight(!0));
                          }),
                          this.element
                              .children()
                              .not(this.panels)
                              .each(function () {
                                  i -= t(this).outerHeight(!0);
                              }),
                          this.panels
                              .each(function () {
                                  t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()));
                              })
                              .css("overflow", "auto"))
                        : "auto" === e &&
                          ((i = 0),
                          this.panels
                              .each(function () {
                                  i = Math.max(i, t(this).height("").height());
                              })
                              .height(i));
                },
                _eventHandler: function (e) {
                    var i = this.options,
                        n = this.active,
                        s = t(e.currentTarget).closest("li"),
                        o = s[0] === n[0],
                        r = o && i.collapsible,
                        a = r ? t() : this._getPanelForTab(s),
                        l = n.length ? this._getPanelForTab(n) : t(),
                        h = { oldTab: n, oldPanel: l, newTab: r ? t() : s, newPanel: a };
                    e.preventDefault(),
                        s.hasClass("ui-state-disabled") ||
                            s.hasClass("ui-tabs-loading") ||
                            this.running ||
                            (o && !i.collapsible) ||
                            !1 === this._trigger("beforeActivate", e, h) ||
                            ((i.active = !r && this.tabs.index(s)),
                            (this.active = o ? t() : s),
                            this.xhr && this.xhr.abort(),
                            l.length || a.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."),
                            a.length && this.load(this.tabs.index(s), e),
                            this._toggle(e, h));
                },
                _toggle: function (e, i) {
                    function n() {
                        (o.running = !1), o._trigger("activate", e, i);
                    }
                    function s() {
                        o._addClass(i.newTab.closest("li"), "ui-tabs-active", "ui-state-active"), r.length && o.options.show ? o._show(r, o.options.show, n) : (r.show(), n());
                    }
                    var o = this,
                        r = i.newPanel,
                        a = i.oldPanel;
                    (this.running = !0),
                        a.length && this.options.hide
                            ? this._hide(a, this.options.hide, function () {
                                  o._removeClass(i.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), s();
                              })
                            : (this._removeClass(i.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), a.hide(), s()),
                        a.attr("aria-hidden", "true"),
                        i.oldTab.attr({ "aria-selected": "false", "aria-expanded": "false" }),
                        r.length && a.length
                            ? i.oldTab.attr("tabIndex", -1)
                            : r.length &&
                              this.tabs
                                  .filter(function () {
                                      return 0 === t(this).attr("tabIndex");
                                  })
                                  .attr("tabIndex", -1),
                        r.attr("aria-hidden", "false"),
                        i.newTab.attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 });
                },
                _activate: function (e) {
                    var i,
                        n = this._findActive(e);
                    n[0] !== this.active[0] && (n.length || (n = this.active), (i = n.find(".ui-tabs-anchor")[0]), this._eventHandler({ target: i, currentTarget: i, preventDefault: t.noop }));
                },
                _findActive: function (e) {
                    return !1 === e ? t() : this.tabs.eq(e);
                },
                _getIndex: function (e) {
                    return "string" == typeof e && (e = this.anchors.index(this.anchors.filter("[href$='" + t.ui.escapeSelector(e) + "']"))), e;
                },
                _destroy: function () {
                    this.xhr && this.xhr.abort(),
                        this.tablist.removeAttr("role").off(this.eventNamespace),
                        this.anchors.removeAttr("role tabIndex").removeUniqueId(),
                        this.tabs.add(this.panels).each(function () {
                            t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded");
                        }),
                        this.tabs.each(function () {
                            var e = t(this),
                                i = e.data("ui-tabs-aria-controls");
                            i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls");
                        }),
                        this.panels.show(),
                        "content" !== this.options.heightStyle && this.panels.css("height", "");
                },
                enable: function (e) {
                    var i = this.options.disabled;
                    !1 !== i &&
                        ((i =
                            void 0 !== e &&
                            ((e = this._getIndex(e)),
                            t.isArray(i)
                                ? t.map(i, function (t) {
                                      return t !== e ? t : null;
                                  })
                                : t.map(this.tabs, function (t, i) {
                                      return i !== e ? i : null;
                                  }))),
                        this._setOptionDisabled(i));
                },
                disable: function (e) {
                    var i = this.options.disabled;
                    if (!0 !== i) {
                        if (void 0 === e) i = !0;
                        else {
                            if (((e = this._getIndex(e)), -1 !== t.inArray(e, i))) return;
                            i = t.isArray(i) ? t.merge([e], i).sort() : [e];
                        }
                        this._setOptionDisabled(i);
                    }
                },
                load: function (e, i) {
                    function n(t, e) {
                        "abort" === e && s.panels.stop(!1, !0), s._removeClass(o, "ui-tabs-loading"), a.removeAttr("aria-busy"), t === s.xhr && delete s.xhr;
                    }
                    e = this._getIndex(e);
                    var s = this,
                        o = this.tabs.eq(e),
                        r = o.find(".ui-tabs-anchor"),
                        a = this._getPanelForTab(o),
                        l = { tab: o, panel: a };
                    this._isLocal(r[0]) ||
                        ((this.xhr = t.ajax(this._ajaxSettings(r, i, l))),
                        this.xhr &&
                            "canceled" !== this.xhr.statusText &&
                            (this._addClass(o, "ui-tabs-loading"),
                            a.attr("aria-busy", "true"),
                            this.xhr
                                .done(function (t, e, o) {
                                    setTimeout(function () {
                                        a.html(t), s._trigger("load", i, l), n(o, e);
                                    }, 1);
                                })
                                .fail(function (t, e) {
                                    setTimeout(function () {
                                        n(t, e);
                                    }, 1);
                                })));
                },
                _ajaxSettings: function (e, i, n) {
                    var s = this;
                    return {
                        url: e.attr("href").replace(/#.*$/, ""),
                        beforeSend: function (e, o) {
                            return s._trigger("beforeLoad", i, t.extend({ jqXHR: e, ajaxSettings: o }, n));
                        },
                    };
                },
                _getPanelForTab: function (e) {
                    var i = t(e).attr("aria-controls");
                    return this.element.find(this._sanitizeSelector("#" + i));
                },
            }),
            !1 !== t.uiBackCompat &&
                t.widget("ui.tabs", t.ui.tabs, {
                    _processTabs: function () {
                        this._superApply(arguments), this._addClass(this.tabs, "ui-tab");
                    },
                }),
            t.ui.tabs,
            t.widget("ui.tooltip", {
                version: "1.12.1",
                options: {
                    classes: { "ui-tooltip": "ui-corner-all ui-widget-shadow" },
                    content: function () {
                        var e = t(this).attr("title") || "";
                        return t("<a>").text(e).html();
                    },
                    hide: !0,
                    items: "[title]:not([disabled])",
                    position: { my: "left top+15", at: "left bottom", collision: "flipfit flip" },
                    show: !0,
                    track: !1,
                    close: null,
                    open: null,
                },
                _addDescribedBy: function (e, i) {
                    var n = (e.attr("aria-describedby") || "").split(/\s+/);
                    n.push(i), e.data("ui-tooltip-id", i).attr("aria-describedby", t.trim(n.join(" ")));
                },
                _removeDescribedBy: function (e) {
                    var i = e.data("ui-tooltip-id"),
                        n = (e.attr("aria-describedby") || "").split(/\s+/),
                        s = t.inArray(i, n);
                    -1 !== s && n.splice(s, 1), e.removeData("ui-tooltip-id"), (n = t.trim(n.join(" "))) ? e.attr("aria-describedby", n) : e.removeAttr("aria-describedby");
                },
                _create: function () {
                    this._on({ mouseover: "open", focusin: "open" }),
                        (this.tooltips = {}),
                        (this.parents = {}),
                        (this.liveRegion = t("<div>").attr({ role: "log", "aria-live": "assertive", "aria-relevant": "additions" }).appendTo(this.document[0].body)),
                        this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"),
                        (this.disabledTitles = t([]));
                },
                _setOption: function (e, i) {
                    var n = this;
                    this._super(e, i),
                        "content" === e &&
                            t.each(this.tooltips, function (t, e) {
                                n._updateContent(e.element);
                            });
                },
                _setOptionDisabled: function (t) {
                    this[t ? "_disable" : "_enable"]();
                },
                _disable: function () {
                    var e = this;
                    t.each(this.tooltips, function (i, n) {
                        var s = t.Event("blur");
                        (s.target = s.currentTarget = n.element[0]), e.close(s, !0);
                    }),
                        (this.disabledTitles = this.disabledTitles.add(
                            this.element
                                .find(this.options.items)
                                .addBack()
                                .filter(function () {
                                    var e = t(this);
                                    return e.is("[title]") ? e.data("ui-tooltip-title", e.attr("title")).removeAttr("title") : void 0;
                                })
                        ));
                },
                _enable: function () {
                    this.disabledTitles.each(function () {
                        var e = t(this);
                        e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title"));
                    }),
                        (this.disabledTitles = t([]));
                },
                open: function (e) {
                    var i = this,
                        n = t(e ? e.target : this.element).closest(this.options.items);
                    n.length &&
                        !n.data("ui-tooltip-id") &&
                        (n.attr("title") && n.data("ui-tooltip-title", n.attr("title")),
                        n.data("ui-tooltip-open", !0),
                        e &&
                            "mouseover" === e.type &&
                            n.parents().each(function () {
                                var e,
                                    n = t(this);
                                n.data("ui-tooltip-open") && (((e = t.Event("blur")).target = e.currentTarget = this), i.close(e, !0)),
                                    n.attr("title") && (n.uniqueId(), (i.parents[this.id] = { element: this, title: n.attr("title") }), n.attr("title", ""));
                            }),
                        this._registerCloseHandlers(e, n),
                        this._updateContent(n, e));
                },
                _updateContent: function (t, e) {
                    var i,
                        n = this.options.content,
                        s = this,
                        o = e ? e.type : null;
                    return "string" == typeof n || n.nodeType || n.jquery
                        ? this._open(e, t, n)
                        : void (
                              (i = n.call(t[0], function (i) {
                                  s._delay(function () {
                                      t.data("ui-tooltip-open") && (e && (e.type = o), this._open(e, t, i));
                                  });
                              })) && this._open(e, t, i)
                          );
                },
                _open: function (e, i, n) {
                    function s(t) {
                        (h.of = t), r.is(":hidden") || r.position(h);
                    }
                    var o,
                        r,
                        a,
                        l,
                        h = t.extend({}, this.options.position);
                    if (n) {
                        if ((o = this._find(i))) return void o.tooltip.find(".ui-tooltip-content").html(n);
                        i.is("[title]") && (e && "mouseover" === e.type ? i.attr("title", "") : i.removeAttr("title")),
                            (o = this._tooltip(i)),
                            (r = o.tooltip),
                            this._addDescribedBy(i, r.attr("id")),
                            r.find(".ui-tooltip-content").html(n),
                            this.liveRegion.children().hide(),
                            (l = t("<div>").html(r.find(".ui-tooltip-content").html())).removeAttr("name").find("[name]").removeAttr("name"),
                            l.removeAttr("id").find("[id]").removeAttr("id"),
                            l.appendTo(this.liveRegion),
                            this.options.track && e && /^mouse/.test(e.type) ? (this._on(this.document, { mousemove: s }), s(e)) : r.position(t.extend({ of: i }, this.options.position)),
                            r.hide(),
                            this._show(r, this.options.show),
                            this.options.track &&
                                this.options.show &&
                                this.options.show.delay &&
                                (a = this.delayedShow = setInterval(function () {
                                    r.is(":visible") && (s(h.of), clearInterval(a));
                                }, t.fx.interval)),
                            this._trigger("open", e, { tooltip: r });
                    }
                },
                _registerCloseHandlers: function (e, i) {
                    var n = {
                        keyup: function (e) {
                            if (e.keyCode === t.ui.keyCode.ESCAPE) {
                                var n = t.Event(e);
                                (n.currentTarget = i[0]), this.close(n, !0);
                            }
                        },
                    };
                    i[0] !== this.element[0] &&
                        (n.remove = function () {
                            this._removeTooltip(this._find(i).tooltip);
                        }),
                        (e && "mouseover" !== e.type) || (n.mouseleave = "close"),
                        (e && "focusin" !== e.type) || (n.focusout = "close"),
                        this._on(!0, i, n);
                },
                close: function (e) {
                    var i,
                        n = this,
                        s = t(e ? e.currentTarget : this.element),
                        o = this._find(s);
                    return o
                        ? ((i = o.tooltip),
                          void (
                              o.closing ||
                              (clearInterval(this.delayedShow),
                              s.data("ui-tooltip-title") && !s.attr("title") && s.attr("title", s.data("ui-tooltip-title")),
                              this._removeDescribedBy(s),
                              (o.hiding = !0),
                              i.stop(!0),
                              this._hide(i, this.options.hide, function () {
                                  n._removeTooltip(t(this));
                              }),
                              s.removeData("ui-tooltip-open"),
                              this._off(s, "mouseleave focusout keyup"),
                              s[0] !== this.element[0] && this._off(s, "remove"),
                              this._off(this.document, "mousemove"),
                              e &&
                                  "mouseleave" === e.type &&
                                  t.each(this.parents, function (e, i) {
                                      t(i.element).attr("title", i.title), delete n.parents[e];
                                  }),
                              (o.closing = !0),
                              this._trigger("close", e, { tooltip: i }),
                              o.hiding || (o.closing = !1))
                          ))
                        : void s.removeData("ui-tooltip-open");
                },
                _tooltip: function (e) {
                    var i = t("<div>").attr("role", "tooltip"),
                        n = t("<div>").appendTo(i),
                        s = i.uniqueId().attr("id");
                    return this._addClass(n, "ui-tooltip-content"), this._addClass(i, "ui-tooltip", "ui-widget ui-widget-content"), i.appendTo(this._appendTo(e)), (this.tooltips[s] = { element: e, tooltip: i });
                },
                _find: function (t) {
                    var e = t.data("ui-tooltip-id");
                    return e ? this.tooltips[e] : null;
                },
                _removeTooltip: function (t) {
                    t.remove(), delete this.tooltips[t.attr("id")];
                },
                _appendTo: function (t) {
                    var e = t.closest(".ui-front, dialog");
                    return e.length || (e = this.document[0].body), e;
                },
                _destroy: function () {
                    var e = this;
                    t.each(this.tooltips, function (i, n) {
                        var s = t.Event("blur"),
                            o = n.element;
                        (s.target = s.currentTarget = o[0]), e.close(s, !0), t("#" + i).remove(), o.data("ui-tooltip-title") && (o.attr("title") || o.attr("title", o.data("ui-tooltip-title")), o.removeData("ui-tooltip-title"));
                    }),
                        this.liveRegion.remove();
                },
            }),
            !1 !== t.uiBackCompat &&
                t.widget("ui.tooltip", t.ui.tooltip, {
                    options: { tooltipClass: null },
                    _tooltip: function () {
                        var t = this._superApply(arguments);
                        return this.options.tooltipClass && t.tooltip.addClass(this.options.tooltipClass), t;
                    },
                }),
            t.ui.tooltip;
    }),
    (function (t, e) {
        "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery")) : "function" == typeof define && define.amd ? define(["exports", "jquery"], e) : e(((t = t || self).bootstrap = {}), t.jQuery);
    })(this, function (t, e) {
        "use strict";
        function i(t, e) {
            for (var i = 0; i < e.length; i++) {
                var n = e[i];
                (n.enumerable = n.enumerable || !1), (n.configurable = !0), "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
            }
        }
        function n(t, e, n) {
            return e && i(t.prototype, e), n && i(t, n), t;
        }
        function s(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = null != arguments[e] ? arguments[e] : {},
                    n = Object.keys(i);
                "function" == typeof Object.getOwnPropertySymbols &&
                    (n = n.concat(
                        Object.getOwnPropertySymbols(i).filter(function (t) {
                            return Object.getOwnPropertyDescriptor(i, t).enumerable;
                        })
                    )),
                    n.forEach(function (e) {
                        var n, s, o;
                        (n = t), (o = i[(s = e)]), s in n ? Object.defineProperty(n, s, { value: o, enumerable: !0, configurable: !0, writable: !0 }) : (n[s] = o);
                    });
            }
            return t;
        }
        e = e && e.hasOwnProperty("default") ? e.default : e;
        var o = "transitionend",
            r = {
                TRANSITION_END: "bsTransitionEnd",
                getUID: function (t) {
                    for (; (t += ~~(1e6 * Math.random())), document.getElementById(t); );
                    return t;
                },
                getSelectorFromElement: function (t) {
                    var e = t.getAttribute("data-target");
                    if (!e || "#" === e) {
                        var i = t.getAttribute("href");
                        e = i && "#" !== i ? i.trim() : "";
                    }
                    try {
                        return document.querySelector(e) ? e : null;
                    } catch (t) {
                        return null;
                    }
                },
                getTransitionDurationFromElement: function (t) {
                    if (!t) return 0;
                    var i = e(t).css("transition-duration"),
                        n = e(t).css("transition-delay"),
                        s = parseFloat(i),
                        o = parseFloat(n);
                    return s || o ? ((i = i.split(",")[0]), (n = n.split(",")[0]), 1e3 * (parseFloat(i) + parseFloat(n))) : 0;
                },
                reflow: function (t) {
                    return t.offsetHeight;
                },
                triggerTransitionEnd: function (t) {
                    e(t).trigger(o);
                },
                supportsTransitionEnd: function () {
                    return Boolean(o);
                },
                isElement: function (t) {
                    return (t[0] || t).nodeType;
                },
                typeCheckConfig: function (t, e, i) {
                    for (var n in i)
                        if (Object.prototype.hasOwnProperty.call(i, n)) {
                            var s = i[n],
                                o = e[n],
                                a =
                                    o && r.isElement(o)
                                        ? "element"
                                        : ((l = o),
                                          {}.toString
                                              .call(l)
                                              .match(/\s([a-z]+)/i)[1]
                                              .toLowerCase());
                            if (!new RegExp(s).test(a)) throw new Error(t.toUpperCase() + ': Option "' + n + '" provided type "' + a + '" but expected type "' + s + '".');
                        }
                    var l;
                },
                findShadowRoot: function (t) {
                    if (!document.documentElement.attachShadow) return null;
                    if ("function" != typeof t.getRootNode) return t instanceof ShadowRoot ? t : t.parentNode ? r.findShadowRoot(t.parentNode) : null;
                    var e = t.getRootNode();
                    return e instanceof ShadowRoot ? e : null;
                },
            };
        (e.fn.emulateTransitionEnd = function (t) {
            var i = this,
                n = !1;
            return (
                e(this).one(r.TRANSITION_END, function () {
                    n = !0;
                }),
                setTimeout(function () {
                    n || r.triggerTransitionEnd(i);
                }, t),
                this
            );
        }),
            (e.event.special[r.TRANSITION_END] = {
                bindType: o,
                delegateType: o,
                handle: function (t) {
                    if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments);
                },
            });
        var a,
            l = "alert",
            h = "bs.alert",
            c = "." + h,
            u = e.fn[l],
            d = { CLOSE: "close" + c, CLOSED: "closed" + c, CLICK_DATA_API: "click" + c + ".data-api" },
            p =
                (((a = f.prototype).close = function (t) {
                    var e = this._element;
                    t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e);
                }),
                (a.dispose = function () {
                    e.removeData(this._element, h), (this._element = null);
                }),
                (a._getRootElement = function (t) {
                    var i = r.getSelectorFromElement(t),
                        n = !1;
                    return i && (n = document.querySelector(i)), n || e(t).closest(".alert")[0];
                }),
                (a._triggerCloseEvent = function (t) {
                    var i = e.Event(d.CLOSE);
                    return e(t).trigger(i), i;
                }),
                (a._removeElement = function (t) {
                    var i = this;
                    if ((e(t).removeClass("show"), e(t).hasClass("fade"))) {
                        var n = r.getTransitionDurationFromElement(t);
                        e(t)
                            .one(r.TRANSITION_END, function (e) {
                                return i._destroyElement(t, e);
                            })
                            .emulateTransitionEnd(n);
                    } else this._destroyElement(t);
                }),
                (a._destroyElement = function (t) {
                    e(t).detach().trigger(d.CLOSED).remove();
                }),
                (f._jQueryInterface = function (t) {
                    return this.each(function () {
                        var i = e(this),
                            n = i.data(h);
                        n || ((n = new f(this)), i.data(h, n)), "close" === t && n[t](this);
                    });
                }),
                (f._handleDismiss = function (t) {
                    return function (e) {
                        e && e.preventDefault(), t.close(this);
                    };
                }),
                n(f, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "4.3.1";
                        },
                    },
                ]),
                f);
        function f(t) {
            this._element = t;
        }
        e(document).on(d.CLICK_DATA_API, '[data-dismiss="alert"]', p._handleDismiss(new p())),
            (e.fn[l] = p._jQueryInterface),
            (e.fn[l].Constructor = p),
            (e.fn[l].noConflict = function () {
                return (e.fn[l] = u), p._jQueryInterface;
            });
        var g,
            m = "button",
            v = "bs.button",
            _ = "." + v,
            b = ".data-api",
            y = e.fn[m],
            w = "active",
            C = '[data-toggle^="button"]',
            x = { CLICK_DATA_API: "click" + _ + b, FOCUS_BLUR_DATA_API: "focus" + _ + b + " blur" + _ + b },
            k =
                (((g = T.prototype).toggle = function () {
                    var t = !0,
                        i = !0,
                        n = e(this._element).closest('[data-toggle="buttons"]')[0];
                    if (n) {
                        var s = this._element.querySelector('input:not([type="hidden"])');
                        if (s) {
                            if ("radio" === s.type)
                                if (s.checked && this._element.classList.contains(w)) t = !1;
                                else {
                                    var o = n.querySelector(".active");
                                    o && e(o).removeClass(w);
                                }
                            if (t) {
                                if (s.hasAttribute("disabled") || n.hasAttribute("disabled") || s.classList.contains("disabled") || n.classList.contains("disabled")) return;
                                (s.checked = !this._element.classList.contains(w)), e(s).trigger("change");
                            }
                            s.focus(), (i = !1);
                        }
                    }
                    i && this._element.setAttribute("aria-pressed", !this._element.classList.contains(w)), t && e(this._element).toggleClass(w);
                }),
                (g.dispose = function () {
                    e.removeData(this._element, v), (this._element = null);
                }),
                (T._jQueryInterface = function (t) {
                    return this.each(function () {
                        var i = e(this).data(v);
                        i || ((i = new T(this)), e(this).data(v, i)), "toggle" === t && i[t]();
                    });
                }),
                n(T, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "4.3.1";
                        },
                    },
                ]),
                T);
        function T(t) {
            this._element = t;
        }
        e(document)
            .on(x.CLICK_DATA_API, C, function (t) {
                t.preventDefault();
                var i = t.target;
                e(i).hasClass("btn") || (i = e(i).closest(".btn")), k._jQueryInterface.call(e(i), "toggle");
            })
            .on(x.FOCUS_BLUR_DATA_API, C, function (t) {
                var i = e(t.target).closest(".btn")[0];
                e(i).toggleClass("focus", /^focus(in)?$/.test(t.type));
            }),
            (e.fn[m] = k._jQueryInterface),
            (e.fn[m].Constructor = k),
            (e.fn[m].noConflict = function () {
                return (e.fn[m] = y), k._jQueryInterface;
            });
        var D,
            S = "carousel",
            E = "bs.carousel",
            I = "." + E,
            A = e.fn[S],
            P = { interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0, touch: !0 },
            N = { interval: "(number|boolean)", keyboard: "boolean", slide: "(boolean|string)", pause: "(string|boolean)", wrap: "boolean", touch: "boolean" },
            O = "next",
            M = "prev",
            $ = {
                SLIDE: "slide" + I,
                SLID: "slid" + I,
                KEYDOWN: "keydown" + I,
                MOUSEENTER: "mouseenter" + I,
                MOUSELEAVE: "mouseleave" + I,
                TOUCHSTART: "touchstart" + I,
                TOUCHMOVE: "touchmove" + I,
                TOUCHEND: "touchend" + I,
                POINTERDOWN: "pointerdown" + I,
                POINTERUP: "pointerup" + I,
                DRAG_START: "dragstart" + I,
                LOAD_DATA_API: "load" + I + ".data-api",
                CLICK_DATA_API: "click" + I + ".data-api",
            },
            H = "active",
            L = ".active.carousel-item",
            W = { TOUCH: "touch", PEN: "pen" },
            R =
                (((D = F.prototype).next = function () {
                    this._isSliding || this._slide(O);
                }),
                (D.nextWhenVisible = function () {
                    !document.hidden && e(this._element).is(":visible") && "hidden" !== e(this._element).css("visibility") && this.next();
                }),
                (D.prev = function () {
                    this._isSliding || this._slide(M);
                }),
                (D.pause = function (t) {
                    t || (this._isPaused = !0), this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (r.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), (this._interval = null);
                }),
                (D.cycle = function (t) {
                    t || (this._isPaused = !1),
                        this._interval && (clearInterval(this._interval), (this._interval = null)),
                        this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
                }),
                (D.to = function (t) {
                    var i = this;
                    this._activeElement = this._element.querySelector(L);
                    var n = this._getItemIndex(this._activeElement);
                    if (!(t > this._items.length - 1 || t < 0))
                        if (this._isSliding)
                            e(this._element).one($.SLID, function () {
                                return i.to(t);
                            });
                        else {
                            if (n === t) return this.pause(), void this.cycle();
                            var s = n < t ? O : M;
                            this._slide(s, this._items[t]);
                        }
                }),
                (D.dispose = function () {
                    e(this._element).off(I),
                        e.removeData(this._element, E),
                        (this._items = null),
                        (this._config = null),
                        (this._element = null),
                        (this._interval = null),
                        (this._isPaused = null),
                        (this._isSliding = null),
                        (this._activeElement = null),
                        (this._indicatorsElement = null);
                }),
                (D._getConfig = function (t) {
                    return (t = s({}, P, t)), r.typeCheckConfig(S, t, N), t;
                }),
                (D._handleSwipe = function () {
                    var t = Math.abs(this.touchDeltaX);
                    if (!(t <= 40)) {
                        var e = t / this.touchDeltaX;
                        0 < e && this.prev(), e < 0 && this.next();
                    }
                }),
                (D._addEventListeners = function () {
                    var t = this;
                    this._config.keyboard &&
                        e(this._element).on($.KEYDOWN, function (e) {
                            return t._keydown(e);
                        }),
                        "hover" === this._config.pause &&
                            e(this._element)
                                .on($.MOUSEENTER, function (e) {
                                    return t.pause(e);
                                })
                                .on($.MOUSELEAVE, function (e) {
                                    return t.cycle(e);
                                }),
                        this._config.touch && this._addTouchEventListeners();
                }),
                (D._addTouchEventListeners = function () {
                    var t = this;
                    if (this._touchSupported) {
                        var i = function (e) {
                                t._pointerEvent && W[e.originalEvent.pointerType.toUpperCase()] ? (t.touchStartX = e.originalEvent.clientX) : t._pointerEvent || (t.touchStartX = e.originalEvent.touches[0].clientX);
                            },
                            n = function (e) {
                                t._pointerEvent && W[e.originalEvent.pointerType.toUpperCase()] && (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX),
                                    t._handleSwipe(),
                                    "hover" === t._config.pause &&
                                        (t.pause(),
                                        t.touchTimeout && clearTimeout(t.touchTimeout),
                                        (t.touchTimeout = setTimeout(function (e) {
                                            return t.cycle(e);
                                        }, 500 + t._config.interval)));
                            };
                        e(this._element.querySelectorAll(".carousel-item img")).on($.DRAG_START, function (t) {
                            return t.preventDefault();
                        }),
                            this._pointerEvent
                                ? (e(this._element).on($.POINTERDOWN, function (t) {
                                      return i(t);
                                  }),
                                  e(this._element).on($.POINTERUP, function (t) {
                                      return n(t);
                                  }),
                                  this._element.classList.add("pointer-event"))
                                : (e(this._element).on($.TOUCHSTART, function (t) {
                                      return i(t);
                                  }),
                                  e(this._element).on($.TOUCHMOVE, function (e) {
                                      var i;
                                      (i = e).originalEvent.touches && 1 < i.originalEvent.touches.length ? (t.touchDeltaX = 0) : (t.touchDeltaX = i.originalEvent.touches[0].clientX - t.touchStartX);
                                  }),
                                  e(this._element).on($.TOUCHEND, function (t) {
                                      return n(t);
                                  }));
                    }
                }),
                (D._keydown = function (t) {
                    if (!/input|textarea/i.test(t.target.tagName))
                        switch (t.which) {
                            case 37:
                                t.preventDefault(), this.prev();
                                break;
                            case 39:
                                t.preventDefault(), this.next();
                        }
                }),
                (D._getItemIndex = function (t) {
                    return (this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item")) : []), this._items.indexOf(t);
                }),
                (D._getItemByDirection = function (t, e) {
                    var i = t === O,
                        n = t === M,
                        s = this._getItemIndex(e),
                        o = this._items.length - 1;
                    if (((n && 0 === s) || (i && s === o)) && !this._config.wrap) return e;
                    var r = (s + (t === M ? -1 : 1)) % this._items.length;
                    return -1 == r ? this._items[this._items.length - 1] : this._items[r];
                }),
                (D._triggerSlideEvent = function (t, i) {
                    var n = this._getItemIndex(t),
                        s = this._getItemIndex(this._element.querySelector(L)),
                        o = e.Event($.SLIDE, { relatedTarget: t, direction: i, from: s, to: n });
                    return e(this._element).trigger(o), o;
                }),
                (D._setActiveIndicatorElement = function (t) {
                    if (this._indicatorsElement) {
                        var i = [].slice.call(this._indicatorsElement.querySelectorAll(".active"));
                        e(i).removeClass(H);
                        var n = this._indicatorsElement.children[this._getItemIndex(t)];
                        n && e(n).addClass(H);
                    }
                }),
                (D._slide = function (t, i) {
                    var n,
                        s,
                        o,
                        a = this,
                        l = this._element.querySelector(L),
                        h = this._getItemIndex(l),
                        c = i || (l && this._getItemByDirection(t, l)),
                        u = this._getItemIndex(c),
                        d = Boolean(this._interval);
                    if (((o = t === O ? ((n = "carousel-item-left"), (s = "carousel-item-next"), "left") : ((n = "carousel-item-right"), (s = "carousel-item-prev"), "right")), c && e(c).hasClass(H))) this._isSliding = !1;
                    else if (!this._triggerSlideEvent(c, o).isDefaultPrevented() && l && c) {
                        (this._isSliding = !0), d && this.pause(), this._setActiveIndicatorElement(c);
                        var p = e.Event($.SLID, { relatedTarget: c, direction: o, from: h, to: u });
                        if (e(this._element).hasClass("slide")) {
                            e(c).addClass(s), r.reflow(c), e(l).addClass(n), e(c).addClass(n);
                            var f = parseInt(c.getAttribute("data-interval"), 10);
                            this._config.interval = f ? ((this._config.defaultInterval = this._config.defaultInterval || this._config.interval), f) : this._config.defaultInterval || this._config.interval;
                            var g = r.getTransitionDurationFromElement(l);
                            e(l)
                                .one(r.TRANSITION_END, function () {
                                    e(c)
                                        .removeClass(n + " " + s)
                                        .addClass(H),
                                        e(l).removeClass(H + " " + s + " " + n),
                                        (a._isSliding = !1),
                                        setTimeout(function () {
                                            return e(a._element).trigger(p);
                                        }, 0);
                                })
                                .emulateTransitionEnd(g);
                        } else e(l).removeClass(H), e(c).addClass(H), (this._isSliding = !1), e(this._element).trigger(p);
                        d && this.cycle();
                    }
                }),
                (F._jQueryInterface = function (t) {
                    return this.each(function () {
                        var i = e(this).data(E),
                            n = s({}, P, e(this).data());
                        "object" == typeof t && (n = s({}, n, t));
                        var o = "string" == typeof t ? t : n.slide;
                        if ((i || ((i = new F(this, n)), e(this).data(E, i)), "number" == typeof t)) i.to(t);
                        else if ("string" == typeof o) {
                            if (void 0 === i[o]) throw new TypeError('No method named "' + o + '"');
                            i[o]();
                        } else n.interval && n.ride && (i.pause(), i.cycle());
                    });
                }),
                (F._dataApiClickHandler = function (t) {
                    var i = r.getSelectorFromElement(this);
                    if (i) {
                        var n = e(i)[0];
                        if (n && e(n).hasClass("carousel")) {
                            var o = s({}, e(n).data(), e(this).data()),
                                a = this.getAttribute("data-slide-to");
                            a && (o.interval = !1), F._jQueryInterface.call(e(n), o), a && e(n).data(E).to(a), t.preventDefault();
                        }
                    }
                }),
                n(F, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "4.3.1";
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return P;
                        },
                    },
                ]),
                F);
        function F(t, e) {
            (this._items = null),
                (this._interval = null),
                (this._activeElement = null),
                (this._isPaused = !1),
                (this._isSliding = !1),
                (this.touchTimeout = null),
                (this.touchStartX = 0),
                (this.touchDeltaX = 0),
                (this._config = this._getConfig(e)),
                (this._element = t),
                (this._indicatorsElement = this._element.querySelector(".carousel-indicators")),
                (this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints),
                (this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent)),
                this._addEventListeners();
        }
        e(document).on($.CLICK_DATA_API, "[data-slide], [data-slide-to]", R._dataApiClickHandler),
            e(window).on($.LOAD_DATA_API, function () {
                for (var t = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), i = 0, n = t.length; i < n; i++) {
                    var s = e(t[i]);
                    R._jQueryInterface.call(s, s.data());
                }
            }),
            (e.fn[S] = R._jQueryInterface),
            (e.fn[S].Constructor = R),
            (e.fn[S].noConflict = function () {
                return (e.fn[S] = A), R._jQueryInterface;
            });
        var j,
            z = "collapse",
            q = "bs.collapse",
            B = "." + q,
            U = e.fn[z],
            Y = { toggle: !0, parent: "" },
            K = { toggle: "boolean", parent: "(string|element)" },
            V = { SHOW: "show" + B, SHOWN: "shown" + B, HIDE: "hide" + B, HIDDEN: "hidden" + B, CLICK_DATA_API: "click" + B + ".data-api" },
            X = "show",
            Q = "collapse",
            G = "collapsing",
            J = "collapsed",
            Z = '[data-toggle="collapse"]',
            tt =
                (((j = et.prototype).toggle = function () {
                    e(this._element).hasClass(X) ? this.hide() : this.show();
                }),
                (j.show = function () {
                    var t,
                        i,
                        n = this;
                    if (
                        !(
                            this._isTransitioning ||
                            e(this._element).hasClass(X) ||
                            (this._parent &&
                                0 ===
                                    (t = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function (t) {
                                        return "string" == typeof n._config.parent ? t.getAttribute("data-parent") === n._config.parent : t.classList.contains(Q);
                                    })).length &&
                                (t = null),
                            t && (i = e(t).not(this._selector).data(q)) && i._isTransitioning)
                        )
                    ) {
                        var s = e.Event(V.SHOW);
                        if ((e(this._element).trigger(s), !s.isDefaultPrevented())) {
                            t && (et._jQueryInterface.call(e(t).not(this._selector), "hide"), i || e(t).data(q, null));
                            var o = this._getDimension();
                            e(this._element).removeClass(Q).addClass(G), (this._element.style[o] = 0), this._triggerArray.length && e(this._triggerArray).removeClass(J).attr("aria-expanded", !0), this.setTransitioning(!0);
                            var a = "scroll" + (o[0].toUpperCase() + o.slice(1)),
                                l = r.getTransitionDurationFromElement(this._element);
                            e(this._element)
                                .one(r.TRANSITION_END, function () {
                                    e(n._element).removeClass(G).addClass(Q).addClass(X), (n._element.style[o] = ""), n.setTransitioning(!1), e(n._element).trigger(V.SHOWN);
                                })
                                .emulateTransitionEnd(l),
                                (this._element.style[o] = this._element[a] + "px");
                        }
                    }
                }),
                (j.hide = function () {
                    var t = this;
                    if (!this._isTransitioning && e(this._element).hasClass(X)) {
                        var i = e.Event(V.HIDE);
                        if ((e(this._element).trigger(i), !i.isDefaultPrevented())) {
                            var n = this._getDimension();
                            (this._element.style[n] = this._element.getBoundingClientRect()[n] + "px"), r.reflow(this._element), e(this._element).addClass(G).removeClass(Q).removeClass(X);
                            var s = this._triggerArray.length;
                            if (0 < s)
                                for (var o = 0; o < s; o++) {
                                    var a = this._triggerArray[o],
                                        l = r.getSelectorFromElement(a);
                                    null !== l && (e([].slice.call(document.querySelectorAll(l))).hasClass(X) || e(a).addClass(J).attr("aria-expanded", !1));
                                }
                            this.setTransitioning(!0), (this._element.style[n] = "");
                            var h = r.getTransitionDurationFromElement(this._element);
                            e(this._element)
                                .one(r.TRANSITION_END, function () {
                                    t.setTransitioning(!1), e(t._element).removeClass(G).addClass(Q).trigger(V.HIDDEN);
                                })
                                .emulateTransitionEnd(h);
                        }
                    }
                }),
                (j.setTransitioning = function (t) {
                    this._isTransitioning = t;
                }),
                (j.dispose = function () {
                    e.removeData(this._element, q), (this._config = null), (this._parent = null), (this._element = null), (this._triggerArray = null), (this._isTransitioning = null);
                }),
                (j._getConfig = function (t) {
                    return ((t = s({}, Y, t)).toggle = Boolean(t.toggle)), r.typeCheckConfig(z, t, K), t;
                }),
                (j._getDimension = function () {
                    return e(this._element).hasClass("width") ? "width" : "height";
                }),
                (j._getParent = function () {
                    var t,
                        i = this;
                    r.isElement(this._config.parent) ? ((t = this._config.parent), void 0 !== this._config.parent.jquery && (t = this._config.parent[0])) : (t = document.querySelector(this._config.parent));
                    var n = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                        s = [].slice.call(t.querySelectorAll(n));
                    return (
                        e(s).each(function (t, e) {
                            i._addAriaAndCollapsedClass(et._getTargetFromElement(e), [e]);
                        }),
                        t
                    );
                }),
                (j._addAriaAndCollapsedClass = function (t, i) {
                    var n = e(t).hasClass(X);
                    i.length && e(i).toggleClass(J, !n).attr("aria-expanded", n);
                }),
                (et._getTargetFromElement = function (t) {
                    var e = r.getSelectorFromElement(t);
                    return e ? document.querySelector(e) : null;
                }),
                (et._jQueryInterface = function (t) {
                    return this.each(function () {
                        var i = e(this),
                            n = i.data(q),
                            o = s({}, Y, i.data(), "object" == typeof t && t ? t : {});
                        if ((!n && o.toggle && /show|hide/.test(t) && (o.toggle = !1), n || ((n = new et(this, o)), i.data(q, n)), "string" == typeof t)) {
                            if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"');
                            n[t]();
                        }
                    });
                }),
                n(et, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "4.3.1";
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return Y;
                        },
                    },
                ]),
                et);
        function et(t, e) {
            (this._isTransitioning = !1),
                (this._element = t),
                (this._config = this._getConfig(e)),
                (this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]')));
            for (var i = [].slice.call(document.querySelectorAll(Z)), n = 0, s = i.length; n < s; n++) {
                var o = i[n],
                    a = r.getSelectorFromElement(o),
                    l = [].slice.call(document.querySelectorAll(a)).filter(function (e) {
                        return e === t;
                    });
                null !== a && 0 < l.length && ((this._selector = a), this._triggerArray.push(o));
            }
            (this._parent = this._config.parent ? this._getParent() : null), this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle();
        }
        e(document).on(V.CLICK_DATA_API, Z, function (t) {
            "A" === t.currentTarget.tagName && t.preventDefault();
            var i = e(this),
                n = r.getSelectorFromElement(this),
                s = [].slice.call(document.querySelectorAll(n));
            e(s).each(function () {
                var t = e(this),
                    n = t.data(q) ? "toggle" : i.data();
                tt._jQueryInterface.call(t, n);
            });
        }),
            (e.fn[z] = tt._jQueryInterface),
            (e.fn[z].Constructor = tt),
            (e.fn[z].noConflict = function () {
                return (e.fn[z] = U), tt._jQueryInterface;
            });
        for (var it = "undefined" != typeof window && "undefined" != typeof document, nt = ["Edge", "Trident", "Firefox"], st = 0, ot = 0; ot < nt.length; ot += 1)
            if (it && 0 <= navigator.userAgent.indexOf(nt[ot])) {
                st = 1;
                break;
            }
        var rt =
            it && window.Promise
                ? function (t) {
                      var e = !1;
                      return function () {
                          e ||
                              ((e = !0),
                              window.Promise.resolve().then(function () {
                                  (e = !1), t();
                              }));
                      };
                  }
                : function (t) {
                      var e = !1;
                      return function () {
                          e ||
                              ((e = !0),
                              setTimeout(function () {
                                  (e = !1), t();
                              }, st));
                      };
                  };
        function at(t) {
            return t && "[object Function]" === {}.toString.call(t);
        }
        function lt(t, e) {
            if (1 !== t.nodeType) return [];
            var i = t.ownerDocument.defaultView.getComputedStyle(t, null);
            return e ? i[e] : i;
        }
        function ht(t) {
            return "HTML" === t.nodeName ? t : t.parentNode || t.host;
        }
        function ct(t) {
            if (!t) return document.body;
            switch (t.nodeName) {
                case "HTML":
                case "BODY":
                    return t.ownerDocument.body;
                case "#document":
                    return t.body;
            }
            var e = lt(t),
                i = e.overflow,
                n = e.overflowX,
                s = e.overflowY;
            return /(auto|scroll|overlay)/.test(i + s + n) ? t : ct(ht(t));
        }
        var ut = it && !(!window.MSInputMethodContext || !document.documentMode),
            dt = it && /MSIE 10/.test(navigator.userAgent);
        function pt(t) {
            return 11 === t ? ut : 10 === t ? dt : ut || dt;
        }
        function ft(t) {
            if (!t) return document.documentElement;
            for (var e = pt(10) ? document.body : null, i = t.offsetParent || null; i === e && t.nextElementSibling; ) i = (t = t.nextElementSibling).offsetParent;
            var n = i && i.nodeName;
            return n && "BODY" !== n && "HTML" !== n ? (-1 !== ["TH", "TD", "TABLE"].indexOf(i.nodeName) && "static" === lt(i, "position") ? ft(i) : i) : t ? t.ownerDocument.documentElement : document.documentElement;
        }
        function gt(t) {
            return null !== t.parentNode ? gt(t.parentNode) : t;
        }
        function mt(t, e) {
            if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
            var i = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
                n = i ? t : e,
                s = i ? e : t,
                o = document.createRange();
            o.setStart(n, 0), o.setEnd(s, 0);
            var r,
                a,
                l = o.commonAncestorContainer;
            if ((t !== l && e !== l) || n.contains(s)) return "BODY" === (a = (r = l).nodeName) || ("HTML" !== a && ft(r.firstElementChild) !== r) ? ft(l) : l;
            var h = gt(t);
            return h.host ? mt(h.host, e) : mt(t, gt(e).host);
        }
        function vt(t, e) {
            var i = "top" === (1 < arguments.length && void 0 !== e ? e : "top") ? "scrollTop" : "scrollLeft",
                n = t.nodeName;
            if ("BODY" !== n && "HTML" !== n) return t[i];
            var s = t.ownerDocument.documentElement;
            return (t.ownerDocument.scrollingElement || s)[i];
        }
        function _t(t, e) {
            var i = "x" === e ? "Left" : "Top",
                n = "Left" == i ? "Right" : "Bottom";
            return parseFloat(t["border" + i + "Width"], 10) + parseFloat(t["border" + n + "Width"], 10);
        }
        function bt(t, e, i, n) {
            return Math.max(
                e["offset" + t],
                e["scroll" + t],
                i["client" + t],
                i["offset" + t],
                i["scroll" + t],
                pt(10) ? parseInt(i["offset" + t]) + parseInt(n["margin" + ("Height" === t ? "Top" : "Left")]) + parseInt(n["margin" + ("Height" === t ? "Bottom" : "Right")]) : 0
            );
        }
        function yt(t) {
            var e = t.body,
                i = t.documentElement,
                n = pt(10) && getComputedStyle(i);
            return { height: bt("Height", e, i, n), width: bt("Width", e, i, n) };
        }
        function wt(t, e, i) {
            return e in t ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : (t[e] = i), t;
        }
        var Ct =
            Object.assign ||
            function (t) {
                for (var e = 1; e < arguments.length; e++) {
                    var i = arguments[e];
                    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
                }
                return t;
            };
        function xt(t, e) {
            for (var i = 0; i < e.length; i++) {
                var n = e[i];
                (n.enumerable = n.enumerable || !1), (n.configurable = !0), "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
            }
        }
        function kt(t) {
            return Ct({}, t, { right: t.left + t.width, bottom: t.top + t.height });
        }
        function Tt(t) {
            var e = {};
            try {
                if (pt(10)) {
                    e = t.getBoundingClientRect();
                    var i = vt(t, "top"),
                        n = vt(t, "left");
                    (e.top += i), (e.left += n), (e.bottom += i), (e.right += n);
                } else e = t.getBoundingClientRect();
            } catch (t) {}
            var s = { left: e.left, top: e.top, width: e.right - e.left, height: e.bottom - e.top },
                o = "HTML" === t.nodeName ? yt(t.ownerDocument) : {},
                r = o.width || t.clientWidth || s.right - s.left,
                a = o.height || t.clientHeight || s.bottom - s.top,
                l = t.offsetWidth - r,
                h = t.offsetHeight - a;
            if (l || h) {
                var c = lt(t);
                (l -= _t(c, "x")), (h -= _t(c, "y")), (s.width -= l), (s.height -= h);
            }
            return kt(s);
        }
        function Dt(t, e, i) {
            var n = 2 < arguments.length && void 0 !== i && i,
                s = pt(10),
                o = "HTML" === e.nodeName,
                r = Tt(t),
                a = Tt(e),
                l = ct(t),
                h = lt(e),
                c = parseFloat(h.borderTopWidth, 10),
                u = parseFloat(h.borderLeftWidth, 10);
            n && o && ((a.top = Math.max(a.top, 0)), (a.left = Math.max(a.left, 0)));
            var d = kt({ top: r.top - a.top - c, left: r.left - a.left - u, width: r.width, height: r.height });
            if (((d.marginTop = 0), (d.marginLeft = 0), !s && o)) {
                var p = parseFloat(h.marginTop, 10),
                    f = parseFloat(h.marginLeft, 10);
                (d.top -= c - p), (d.bottom -= c - p), (d.left -= u - f), (d.right -= u - f), (d.marginTop = p), (d.marginLeft = f);
            }
            return (
                (s && !n ? e.contains(l) : e === l && "BODY" !== l.nodeName) &&
                    (d = (function (t, e, i) {
                        var n = 2 < arguments.length && !1,
                            s = vt(e, "top"),
                            o = vt(e, "left"),
                            r = n ? -1 : 1;
                        return (t.top += s * r), (t.bottom += s * r), (t.left += o * r), (t.right += o * r), t;
                    })(d, e)),
                d
            );
        }
        function St(t) {
            if (!t || !t.parentElement || pt()) return document.documentElement;
            for (var e = t.parentElement; e && "none" === lt(e, "transform"); ) e = e.parentElement;
            return e || document.documentElement;
        }
        function Et(t, e, i, n, s) {
            var o = 4 < arguments.length && void 0 !== s && s,
                r = { top: 0, left: 0 },
                a = o ? St(t) : mt(t, e);
            if ("viewport" === n)
                r = (function (t, e) {
                    var i = 1 < arguments.length && void 0 !== e && e,
                        n = t.ownerDocument.documentElement,
                        s = Dt(t, n),
                        o = Math.max(n.clientWidth, window.innerWidth || 0),
                        r = Math.max(n.clientHeight, window.innerHeight || 0),
                        a = i ? 0 : vt(n),
                        l = i ? 0 : vt(n, "left");
                    return kt({ top: a - s.top + s.marginTop, left: l - s.left + s.marginLeft, width: o, height: r });
                })(a, o);
            else {
                var l = void 0;
                "scrollParent" === n ? "BODY" === (l = ct(ht(e))).nodeName && (l = t.ownerDocument.documentElement) : (l = "window" === n ? t.ownerDocument.documentElement : n);
                var h = Dt(l, a, o);
                if (
                    "HTML" !== l.nodeName ||
                    (function t(e) {
                        var i = e.nodeName;
                        if ("BODY" === i || "HTML" === i) return !1;
                        if ("fixed" === lt(e, "position")) return !0;
                        var n = ht(e);
                        return !!n && t(n);
                    })(a)
                )
                    r = h;
                else {
                    var c = yt(t.ownerDocument),
                        u = c.height,
                        d = c.width;
                    (r.top += h.top - h.marginTop), (r.bottom = u + h.top), (r.left += h.left - h.marginLeft), (r.right = d + h.left);
                }
            }
            var p = "number" == typeof (i = i || 0);
            return (r.left += p ? i : i.left || 0), (r.top += p ? i : i.top || 0), (r.right -= p ? i : i.right || 0), (r.bottom -= p ? i : i.bottom || 0), r;
        }
        function It(t, e, i, n, s, o) {
            var r = 5 < arguments.length && void 0 !== o ? o : 0;
            if (-1 === t.indexOf("auto")) return t;
            var a = Et(i, n, r, s),
                l = { top: { width: a.width, height: e.top - a.top }, right: { width: a.right - e.right, height: a.height }, bottom: { width: a.width, height: a.bottom - e.bottom }, left: { width: e.left - a.left, height: a.height } },
                h = Object.keys(l)
                    .map(function (t) {
                        return Ct({ key: t }, l[t], { area: ((e = l[t]), e.width * e.height) });
                        var e;
                    })
                    .sort(function (t, e) {
                        return e.area - t.area;
                    }),
                c = h.filter(function (t) {
                    var e = t.width,
                        n = t.height;
                    return e >= i.clientWidth && n >= i.clientHeight;
                }),
                u = 0 < c.length ? c[0].key : h[0].key,
                d = t.split("-")[1];
            return u + (d ? "-" + d : "");
        }
        function At(t, e, i, n) {
            var s = 3 < arguments.length && void 0 !== n ? n : null;
            return Dt(i, s ? St(e) : mt(e, i), s);
        }
        function Pt(t) {
            var e = t.ownerDocument.defaultView.getComputedStyle(t),
                i = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
                n = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
            return { width: t.offsetWidth + n, height: t.offsetHeight + i };
        }
        function Nt(t) {
            var e = { left: "right", right: "left", bottom: "top", top: "bottom" };
            return t.replace(/left|right|bottom|top/g, function (t) {
                return e[t];
            });
        }
        function Ot(t, e, i) {
            i = i.split("-")[0];
            var n = Pt(t),
                s = { width: n.width, height: n.height },
                o = -1 !== ["right", "left"].indexOf(i),
                r = o ? "top" : "left",
                a = o ? "left" : "top",
                l = o ? "height" : "width",
                h = o ? "width" : "height";
            return (s[r] = e[r] + e[l] / 2 - n[l] / 2), (s[a] = i === a ? e[a] - n[h] : e[Nt(a)]), s;
        }
        function Mt(t, e) {
            return Array.prototype.find ? t.find(e) : t.filter(e)[0];
        }
        function $t(t, e, i) {
            return (
                (void 0 === i
                    ? t
                    : t.slice(
                          0,
                          (function (t, e, i) {
                              if (Array.prototype.findIndex)
                                  return t.findIndex(function (t) {
                                      return t.name === i;
                                  });
                              var n = Mt(t, function (t) {
                                  return t.name === i;
                              });
                              return t.indexOf(n);
                          })(t, 0, i)
                      )
                ).forEach(function (t) {
                    t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
                    var i = t.function || t.fn;
                    t.enabled && at(i) && ((e.offsets.popper = kt(e.offsets.popper)), (e.offsets.reference = kt(e.offsets.reference)), (e = i(e, t)));
                }),
                e
            );
        }
        function Ht(t, e) {
            return t.some(function (t) {
                var i = t.name;
                return t.enabled && i === e;
            });
        }
        function Lt(t) {
            for (var e = [!1, "ms", "Webkit", "Moz", "O"], i = t.charAt(0).toUpperCase() + t.slice(1), n = 0; n < e.length; n++) {
                var s = e[n],
                    o = s ? "" + s + i : t;
                if (void 0 !== document.body.style[o]) return o;
            }
            return null;
        }
        function Wt(t) {
            var e = t.ownerDocument;
            return e ? e.defaultView : window;
        }
        function Rt(t) {
            return "" !== t && !isNaN(parseFloat(t)) && isFinite(t);
        }
        function Ft(t, e) {
            Object.keys(e).forEach(function (i) {
                var n = "";
                -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(i) && Rt(e[i]) && (n = "px"), (t.style[i] = e[i] + n);
            });
        }
        var jt = it && /Firefox/i.test(navigator.userAgent);
        function zt(t, e, i) {
            var n = Mt(t, function (t) {
                    return t.name === e;
                }),
                s =
                    !!n &&
                    t.some(function (t) {
                        return t.name === i && t.enabled && t.order < n.order;
                    });
            if (!s) {
                var o = "`" + e + "`",
                    r = "`" + i + "`";
                console.warn(r + " modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!");
            }
            return s;
        }
        var qt = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
            Bt = qt.slice(3);
        function Ut(t, e) {
            var i = 1 < arguments.length && void 0 !== e && e,
                n = Bt.indexOf(t),
                s = Bt.slice(n + 1).concat(Bt.slice(0, n));
            return i ? s.reverse() : s;
        }
        var Yt = {
                placement: "bottom",
                positionFixed: !1,
                eventsEnabled: !0,
                removeOnDestroy: !1,
                onCreate: function () {},
                onUpdate: function () {},
                modifiers: {
                    shift: {
                        order: 100,
                        enabled: !0,
                        fn: function (t) {
                            var e = t.placement,
                                i = e.split("-")[0],
                                n = e.split("-")[1];
                            if (n) {
                                var s = t.offsets,
                                    o = s.reference,
                                    r = s.popper,
                                    a = -1 !== ["bottom", "top"].indexOf(i),
                                    l = a ? "left" : "top",
                                    h = a ? "width" : "height",
                                    c = { start: wt({}, l, o[l]), end: wt({}, l, o[l] + o[h] - r[h]) };
                                t.offsets.popper = Ct({}, r, c[n]);
                            }
                            return t;
                        },
                    },
                    offset: {
                        order: 200,
                        enabled: !0,
                        fn: function (t, e) {
                            var i,
                                n = e.offset,
                                s = t.placement,
                                o = t.offsets,
                                r = o.popper,
                                a = o.reference,
                                l = s.split("-")[0];
                            return (
                                (i = Rt(+n)
                                    ? [+n, 0]
                                    : (function (t, e, i, n) {
                                          var s = [0, 0],
                                              o = -1 !== ["right", "left"].indexOf(n),
                                              r = t.split(/(\+|\-)/).map(function (t) {
                                                  return t.trim();
                                              }),
                                              a = r.indexOf(
                                                  Mt(r, function (t) {
                                                      return -1 !== t.search(/,|\s/);
                                                  })
                                              );
                                          r[a] && -1 === r[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
                                          var l = /\s*,\s*|\s+/,
                                              h = -1 !== a ? [r.slice(0, a).concat([r[a].split(l)[0]]), [r[a].split(l)[1]].concat(r.slice(a + 1))] : [r];
                                          return (
                                              (h = h.map(function (t, n) {
                                                  var s = (1 === n ? !o : o) ? "height" : "width",
                                                      r = !1;
                                                  return t
                                                      .reduce(function (t, e) {
                                                          return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? ((t[t.length - 1] = e), (r = !0), t) : r ? ((t[t.length - 1] += e), (r = !1), t) : t.concat(e);
                                                      }, [])
                                                      .map(function (t) {
                                                          return (function (t, e, i, n) {
                                                              var s = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                                                                  o = +s[1],
                                                                  r = s[2];
                                                              if (!o) return t;
                                                              if (0 !== r.indexOf("%"))
                                                                  return "vh" !== r && "vw" !== r
                                                                      ? o
                                                                      : (("vh" === r ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) /
                                                                            100) *
                                                                            o;
                                                              var a = void 0;
                                                              switch (r) {
                                                                  case "%p":
                                                                      a = i;
                                                                      break;
                                                                  case "%":
                                                                  case "%r":
                                                                  default:
                                                                      a = n;
                                                              }
                                                              return (kt(a)[e] / 100) * o;
                                                          })(t, s, e, i);
                                                      });
                                              })).forEach(function (t, e) {
                                                  t.forEach(function (i, n) {
                                                      Rt(i) && (s[e] += i * ("-" === t[n - 1] ? -1 : 1));
                                                  });
                                              }),
                                              s
                                          );
                                      })(n, r, a, l)),
                                "left" === l
                                    ? ((r.top += i[0]), (r.left -= i[1]))
                                    : "right" === l
                                    ? ((r.top += i[0]), (r.left += i[1]))
                                    : "top" === l
                                    ? ((r.left += i[0]), (r.top -= i[1]))
                                    : "bottom" === l && ((r.left += i[0]), (r.top += i[1])),
                                (t.popper = r),
                                t
                            );
                        },
                        offset: 0,
                    },
                    preventOverflow: {
                        order: 300,
                        enabled: !0,
                        fn: function (t, e) {
                            var i = e.boundariesElement || ft(t.instance.popper);
                            t.instance.reference === i && (i = ft(i));
                            var n = Lt("transform"),
                                s = t.instance.popper.style,
                                o = s.top,
                                r = s.left,
                                a = s[n];
                            (s.top = ""), (s.left = ""), (s[n] = "");
                            var l = Et(t.instance.popper, t.instance.reference, e.padding, i, t.positionFixed);
                            (s.top = o), (s.left = r), (s[n] = a), (e.boundaries = l);
                            var h = e.priority,
                                c = t.offsets.popper,
                                u = {
                                    primary: function (t) {
                                        var i = c[t];
                                        return c[t] < l[t] && !e.escapeWithReference && (i = Math.max(c[t], l[t])), wt({}, t, i);
                                    },
                                    secondary: function (t) {
                                        var i = "right" === t ? "left" : "top",
                                            n = c[i];
                                        return c[t] > l[t] && !e.escapeWithReference && (n = Math.min(c[i], l[t] - ("right" === t ? c.width : c.height))), wt({}, i, n);
                                    },
                                };
                            return (
                                h.forEach(function (t) {
                                    var e = -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
                                    c = Ct({}, c, u[e](t));
                                }),
                                (t.offsets.popper = c),
                                t
                            );
                        },
                        priority: ["left", "right", "top", "bottom"],
                        padding: 5,
                        boundariesElement: "scrollParent",
                    },
                    keepTogether: {
                        order: 400,
                        enabled: !0,
                        fn: function (t) {
                            var e = t.offsets,
                                i = e.popper,
                                n = e.reference,
                                s = t.placement.split("-")[0],
                                o = Math.floor,
                                r = -1 !== ["top", "bottom"].indexOf(s),
                                a = r ? "right" : "bottom",
                                l = r ? "left" : "top",
                                h = r ? "width" : "height";
                            return i[a] < o(n[l]) && (t.offsets.popper[l] = o(n[l]) - i[h]), i[l] > o(n[a]) && (t.offsets.popper[l] = o(n[a])), t;
                        },
                    },
                    arrow: {
                        order: 500,
                        enabled: !0,
                        fn: function (t, e) {
                            var i;
                            if (!zt(t.instance.modifiers, "arrow", "keepTogether")) return t;
                            var n = e.element;
                            if ("string" == typeof n) {
                                if (!(n = t.instance.popper.querySelector(n))) return t;
                            } else if (!t.instance.popper.contains(n)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;
                            var s = t.placement.split("-")[0],
                                o = t.offsets,
                                r = o.popper,
                                a = o.reference,
                                l = -1 !== ["left", "right"].indexOf(s),
                                h = l ? "height" : "width",
                                c = l ? "Top" : "Left",
                                u = c.toLowerCase(),
                                d = l ? "left" : "top",
                                p = l ? "bottom" : "right",
                                f = Pt(n)[h];
                            a[p] - f < r[u] && (t.offsets.popper[u] -= r[u] - (a[p] - f)), a[u] + f > r[p] && (t.offsets.popper[u] += a[u] + f - r[p]), (t.offsets.popper = kt(t.offsets.popper));
                            var g = a[u] + a[h] / 2 - f / 2,
                                m = lt(t.instance.popper),
                                v = parseFloat(m["margin" + c], 10),
                                _ = parseFloat(m["border" + c + "Width"], 10),
                                b = g - t.offsets.popper[u] - v - _;
                            return (b = Math.max(Math.min(r[h] - f, b), 0)), (t.arrowElement = n), (t.offsets.arrow = (wt((i = {}), u, Math.round(b)), wt(i, d, ""), i)), t;
                        },
                        element: "[x-arrow]",
                    },
                    flip: {
                        order: 600,
                        enabled: !0,
                        fn: function (t, e) {
                            if (Ht(t.instance.modifiers, "inner")) return t;
                            if (t.flipped && t.placement === t.originalPlacement) return t;
                            var i = Et(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement, t.positionFixed),
                                n = t.placement.split("-")[0],
                                s = Nt(n),
                                o = t.placement.split("-")[1] || "",
                                r = [];
                            switch (e.behavior) {
                                case "flip":
                                    r = [n, s];
                                    break;
                                case "clockwise":
                                    r = Ut(n);
                                    break;
                                case "counterclockwise":
                                    r = Ut(n, !0);
                                    break;
                                default:
                                    r = e.behavior;
                            }
                            return (
                                r.forEach(function (a, l) {
                                    if (n !== a || r.length === l + 1) return t;
                                    (n = t.placement.split("-")[0]), (s = Nt(n));
                                    var h,
                                        c = t.offsets.popper,
                                        u = t.offsets.reference,
                                        d = Math.floor,
                                        p = ("left" === n && d(c.right) > d(u.left)) || ("right" === n && d(c.left) < d(u.right)) || ("top" === n && d(c.bottom) > d(u.top)) || ("bottom" === n && d(c.top) < d(u.bottom)),
                                        f = d(c.left) < d(i.left),
                                        g = d(c.right) > d(i.right),
                                        m = d(c.top) < d(i.top),
                                        v = d(c.bottom) > d(i.bottom),
                                        _ = ("left" === n && f) || ("right" === n && g) || ("top" === n && m) || ("bottom" === n && v),
                                        b = -1 !== ["top", "bottom"].indexOf(n),
                                        y = !!e.flipVariations && ((b && "start" === o && f) || (b && "end" === o && g) || (!b && "start" === o && m) || (!b && "end" === o && v));
                                    (p || _ || y) &&
                                        ((t.flipped = !0),
                                        (p || _) && (n = r[l + 1]),
                                        y && (o = "end" === (h = o) ? "start" : "start" === h ? "end" : h),
                                        (t.placement = n + (o ? "-" + o : "")),
                                        (t.offsets.popper = Ct({}, t.offsets.popper, Ot(t.instance.popper, t.offsets.reference, t.placement))),
                                        (t = $t(t.instance.modifiers, t, "flip")));
                                }),
                                t
                            );
                        },
                        behavior: "flip",
                        padding: 5,
                        boundariesElement: "viewport",
                    },
                    inner: {
                        order: 700,
                        enabled: !1,
                        fn: function (t) {
                            var e = t.placement,
                                i = e.split("-")[0],
                                n = t.offsets,
                                s = n.popper,
                                o = n.reference,
                                r = -1 !== ["left", "right"].indexOf(i),
                                a = -1 === ["top", "left"].indexOf(i);
                            return (s[r ? "left" : "top"] = o[i] - (a ? s[r ? "width" : "height"] : 0)), (t.placement = Nt(e)), (t.offsets.popper = kt(s)), t;
                        },
                    },
                    hide: {
                        order: 800,
                        enabled: !0,
                        fn: function (t) {
                            if (!zt(t.instance.modifiers, "hide", "preventOverflow")) return t;
                            var e = t.offsets.reference,
                                i = Mt(t.instance.modifiers, function (t) {
                                    return "preventOverflow" === t.name;
                                }).boundaries;
                            if (e.bottom < i.top || e.left > i.right || e.top > i.bottom || e.right < i.left) {
                                if (!0 === t.hide) return t;
                                (t.hide = !0), (t.attributes["x-out-of-boundaries"] = "");
                            } else {
                                if (!1 === t.hide) return t;
                                (t.hide = !1), (t.attributes["x-out-of-boundaries"] = !1);
                            }
                            return t;
                        },
                    },
                    computeStyle: {
                        order: 850,
                        enabled: !0,
                        fn: function (t, e) {
                            var i = e.x,
                                n = e.y,
                                s = t.offsets.popper,
                                o = Mt(t.instance.modifiers, function (t) {
                                    return "applyStyle" === t.name;
                                }).gpuAcceleration;
                            void 0 !== o && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                            var r,
                                a,
                                l,
                                h,
                                c,
                                u,
                                d,
                                p,
                                f,
                                g,
                                m,
                                v,
                                _,
                                b,
                                y,
                                w,
                                C = void 0 !== o ? o : e.gpuAcceleration,
                                x = ft(t.instance.popper),
                                k = Tt(x),
                                T = { position: s.position },
                                D =
                                    ((r = t),
                                    (a = window.devicePixelRatio < 2 || !jt),
                                    (h = (l = r.offsets).popper),
                                    (c = l.reference),
                                    (u = Math.round),
                                    (d = Math.floor),
                                    (p = function (t) {
                                        return t;
                                    }),
                                    (f = u(c.width)),
                                    (g = u(h.width)),
                                    (m = -1 !== ["left", "right"].indexOf(r.placement)),
                                    (v = -1 !== r.placement.indexOf("-")),
                                    (b = a ? u : p),
                                    { left: (_ = a ? (m || v || f % 2 == g % 2 ? u : d) : p)(f % 2 == 1 && g % 2 == 1 && !v && a ? h.left - 1 : h.left), top: b(h.top), bottom: b(h.bottom), right: _(h.right) }),
                                S = "bottom" === i ? "top" : "bottom",
                                E = "right" === n ? "left" : "right",
                                I = Lt("transform");
                            if (
                                ((w = "bottom" == S ? ("HTML" === x.nodeName ? -x.clientHeight + D.bottom : -k.height + D.bottom) : D.top),
                                (y = "right" == E ? ("HTML" === x.nodeName ? -x.clientWidth + D.right : -k.width + D.right) : D.left),
                                C && I)
                            )
                                (T[I] = "translate3d(" + y + "px, " + w + "px, 0)"), (T[S] = 0), (T[E] = 0), (T.willChange = "transform");
                            else {
                                var A = "bottom" == S ? -1 : 1,
                                    P = "right" == E ? -1 : 1;
                                (T[S] = w * A), (T[E] = y * P), (T.willChange = S + ", " + E);
                            }
                            var N = { "x-placement": t.placement };
                            return (t.attributes = Ct({}, N, t.attributes)), (t.styles = Ct({}, T, t.styles)), (t.arrowStyles = Ct({}, t.offsets.arrow, t.arrowStyles)), t;
                        },
                        gpuAcceleration: !0,
                        x: "bottom",
                        y: "right",
                    },
                    applyStyle: {
                        order: 900,
                        enabled: !0,
                        fn: function (t) {
                            var e, i;
                            return (
                                Ft(t.instance.popper, t.styles),
                                (e = t.instance.popper),
                                (i = t.attributes),
                                Object.keys(i).forEach(function (t) {
                                    !1 !== i[t] ? e.setAttribute(t, i[t]) : e.removeAttribute(t);
                                }),
                                t.arrowElement && Object.keys(t.arrowStyles).length && Ft(t.arrowElement, t.arrowStyles),
                                t
                            );
                        },
                        onLoad: function (t, e, i, n, s) {
                            var o = At(s, e, t, i.positionFixed),
                                r = It(i.placement, o, e, t, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding);
                            return e.setAttribute("x-placement", r), Ft(e, { position: i.positionFixed ? "fixed" : "absolute" }), i;
                        },
                        gpuAcceleration: void 0,
                    },
                },
            },
            Kt =
                ((function (t, e, i) {
                    e && xt(t.prototype, e), i && xt(t, i);
                })(Vt, [
                    {
                        key: "update",
                        value: function () {
                            return function () {
                                if (!this.state.isDestroyed) {
                                    var t = { instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {} };
                                    (t.offsets.reference = At(this.state, this.popper, this.reference, this.options.positionFixed)),
                                        (t.placement = It(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding)),
                                        (t.originalPlacement = t.placement),
                                        (t.positionFixed = this.options.positionFixed),
                                        (t.offsets.popper = Ot(this.popper, t.offsets.reference, t.placement)),
                                        (t.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute"),
                                        (t = $t(this.modifiers, t)),
                                        this.state.isCreated ? this.options.onUpdate(t) : ((this.state.isCreated = !0), this.options.onCreate(t));
                                }
                            }.call(this);
                        },
                    },
                    {
                        key: "destroy",
                        value: function () {
                            return function () {
                                return (
                                    (this.state.isDestroyed = !0),
                                    Ht(this.modifiers, "applyStyle") &&
                                        (this.popper.removeAttribute("x-placement"),
                                        (this.popper.style.position = ""),
                                        (this.popper.style.top = ""),
                                        (this.popper.style.left = ""),
                                        (this.popper.style.right = ""),
                                        (this.popper.style.bottom = ""),
                                        (this.popper.style.willChange = ""),
                                        (this.popper.style[Lt("transform")] = "")),
                                    this.disableEventListeners(),
                                    this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper),
                                    this
                                );
                            }.call(this);
                        },
                    },
                    {
                        key: "enableEventListeners",
                        value: function () {
                            return function () {
                                this.state.eventsEnabled ||
                                    (this.state = (function (t, e, i, n) {
                                        (i.updateBound = n), Wt(t).addEventListener("resize", i.updateBound, { passive: !0 });
                                        var s = ct(t);
                                        return (
                                            (function t(e, i, n, s) {
                                                var o = "BODY" === e.nodeName,
                                                    r = o ? e.ownerDocument.defaultView : e;
                                                r.addEventListener(i, n, { passive: !0 }), o || t(ct(r.parentNode), i, n, s), s.push(r);
                                            })(s, "scroll", i.updateBound, i.scrollParents),
                                            (i.scrollElement = s),
                                            (i.eventsEnabled = !0),
                                            i
                                        );
                                    })(this.reference, this.options, this.state, this.scheduleUpdate));
                            }.call(this);
                        },
                    },
                    {
                        key: "disableEventListeners",
                        value: function () {
                            return function () {
                                var t, e;
                                this.state.eventsEnabled &&
                                    (cancelAnimationFrame(this.scheduleUpdate),
                                    (this.state =
                                        ((t = this.reference),
                                        (e = this.state),
                                        Wt(t).removeEventListener("resize", e.updateBound),
                                        e.scrollParents.forEach(function (t) {
                                            t.removeEventListener("scroll", e.updateBound);
                                        }),
                                        (e.updateBound = null),
                                        (e.scrollParents = []),
                                        (e.scrollElement = null),
                                        (e.eventsEnabled = !1),
                                        e)));
                            }.call(this);
                        },
                    },
                ]),
                Vt);
        function Vt(t, e) {
            var i = this,
                n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
            !(function (t) {
                if (!(t instanceof Vt)) throw new TypeError("Cannot call a class as a function");
            })(this),
                (this.scheduleUpdate = function () {
                    return requestAnimationFrame(i.update);
                }),
                (this.update = rt(this.update.bind(this))),
                (this.options = Ct({}, Vt.Defaults, n)),
                (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
                (this.reference = t && t.jquery ? t[0] : t),
                (this.popper = e && e.jquery ? e[0] : e),
                (this.options.modifiers = {}),
                Object.keys(Ct({}, Vt.Defaults.modifiers, n.modifiers)).forEach(function (t) {
                    i.options.modifiers[t] = Ct({}, Vt.Defaults.modifiers[t] || {}, n.modifiers ? n.modifiers[t] : {});
                }),
                (this.modifiers = Object.keys(this.options.modifiers)
                    .map(function (t) {
                        return Ct({ name: t }, i.options.modifiers[t]);
                    })
                    .sort(function (t, e) {
                        return t.order - e.order;
                    })),
                this.modifiers.forEach(function (t) {
                    t.enabled && at(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state);
                }),
                this.update();
            var s = this.options.eventsEnabled;
            s && this.enableEventListeners(), (this.state.eventsEnabled = s);
        }
        (Kt.Utils = ("undefined" != typeof window ? window : global).PopperUtils), (Kt.placements = qt), (Kt.Defaults = Yt);
        var Xt,
            Qt = "dropdown",
            Gt = "bs.dropdown",
            Jt = "." + Gt,
            Zt = ".data-api",
            te = e.fn[Qt],
            ee = new RegExp("38|40|27"),
            ie = { HIDE: "hide" + Jt, HIDDEN: "hidden" + Jt, SHOW: "show" + Jt, SHOWN: "shown" + Jt, CLICK: "click" + Jt, CLICK_DATA_API: "click" + Jt + Zt, KEYDOWN_DATA_API: "keydown" + Jt + Zt, KEYUP_DATA_API: "keyup" + Jt + Zt },
            ne = "disabled",
            se = "show",
            oe = "dropdown-menu-right",
            re = '[data-toggle="dropdown"]',
            ae = ".dropdown-menu",
            le = { offset: 0, flip: !0, boundary: "scrollParent", reference: "toggle", display: "dynamic" },
            he = { offset: "(number|string|function)", flip: "boolean", boundary: "(string|element)", reference: "(string|element)", display: "string" },
            ce =
                (((Xt = ue.prototype).toggle = function () {
                    if (!this._element.disabled && !e(this._element).hasClass(ne)) {
                        var t = ue._getParentFromElement(this._element),
                            i = e(this._menu).hasClass(se);
                        if ((ue._clearMenus(), !i)) {
                            var n = { relatedTarget: this._element },
                                s = e.Event(ie.SHOW, n);
                            if ((e(t).trigger(s), !s.isDefaultPrevented())) {
                                if (!this._inNavbar) {
                                    if (void 0 === Kt) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                                    var o = this._element;
                                    "parent" === this._config.reference ? (o = t) : r.isElement(this._config.reference) && ((o = this._config.reference), void 0 !== this._config.reference.jquery && (o = this._config.reference[0])),
                                        "scrollParent" !== this._config.boundary && e(t).addClass("position-static"),
                                        (this._popper = new Kt(o, this._menu, this._getPopperConfig()));
                                }
                                "ontouchstart" in document.documentElement && 0 === e(t).closest(".navbar-nav").length && e(document.body).children().on("mouseover", null, e.noop),
                                    this._element.focus(),
                                    this._element.setAttribute("aria-expanded", !0),
                                    e(this._menu).toggleClass(se),
                                    e(t).toggleClass(se).trigger(e.Event(ie.SHOWN, n));
                            }
                        }
                    }
                }),
                (Xt.show = function () {
                    if (!(this._element.disabled || e(this._element).hasClass(ne) || e(this._menu).hasClass(se))) {
                        var t = { relatedTarget: this._element },
                            i = e.Event(ie.SHOW, t),
                            n = ue._getParentFromElement(this._element);
                        e(n).trigger(i), i.isDefaultPrevented() || (e(this._menu).toggleClass(se), e(n).toggleClass(se).trigger(e.Event(ie.SHOWN, t)));
                    }
                }),
                (Xt.hide = function () {
                    if (!this._element.disabled && !e(this._element).hasClass(ne) && e(this._menu).hasClass(se)) {
                        var t = { relatedTarget: this._element },
                            i = e.Event(ie.HIDE, t),
                            n = ue._getParentFromElement(this._element);
                        e(n).trigger(i), i.isDefaultPrevented() || (e(this._menu).toggleClass(se), e(n).toggleClass(se).trigger(e.Event(ie.HIDDEN, t)));
                    }
                }),
                (Xt.dispose = function () {
                    e.removeData(this._element, Gt), e(this._element).off(Jt), (this._element = null), (this._menu = null) !== this._popper && (this._popper.destroy(), (this._popper = null));
                }),
                (Xt.update = function () {
                    (this._inNavbar = this._detectNavbar()), null !== this._popper && this._popper.scheduleUpdate();
                }),
                (Xt._addEventListeners = function () {
                    var t = this;
                    e(this._element).on(ie.CLICK, function (e) {
                        e.preventDefault(), e.stopPropagation(), t.toggle();
                    });
                }),
                (Xt._getConfig = function (t) {
                    return (t = s({}, this.constructor.Default, e(this._element).data(), t)), r.typeCheckConfig(Qt, t, this.constructor.DefaultType), t;
                }),
                (Xt._getMenuElement = function () {
                    if (!this._menu) {
                        var t = ue._getParentFromElement(this._element);
                        t && (this._menu = t.querySelector(ae));
                    }
                    return this._menu;
                }),
                (Xt._getPlacement = function () {
                    var t = e(this._element.parentNode),
                        i = "bottom-start";
                    return (
                        t.hasClass("dropup")
                            ? ((i = "top-start"), e(this._menu).hasClass(oe) && (i = "top-end"))
                            : t.hasClass("dropright")
                            ? (i = "right-start")
                            : t.hasClass("dropleft")
                            ? (i = "left-start")
                            : e(this._menu).hasClass(oe) && (i = "bottom-end"),
                        i
                    );
                }),
                (Xt._detectNavbar = function () {
                    return 0 < e(this._element).closest(".navbar").length;
                }),
                (Xt._getOffset = function () {
                    var t = this,
                        e = {};
                    return (
                        "function" == typeof this._config.offset
                            ? (e.fn = function (e) {
                                  return (e.offsets = s({}, e.offsets, t._config.offset(e.offsets, t._element) || {})), e;
                              })
                            : (e.offset = this._config.offset),
                        e
                    );
                }),
                (Xt._getPopperConfig = function () {
                    var t = { placement: this._getPlacement(), modifiers: { offset: this._getOffset(), flip: { enabled: this._config.flip }, preventOverflow: { boundariesElement: this._config.boundary } } };
                    return "static" === this._config.display && (t.modifiers.applyStyle = { enabled: !1 }), t;
                }),
                (ue._jQueryInterface = function (t) {
                    return this.each(function () {
                        var i = e(this).data(Gt);
                        if ((i || ((i = new ue(this, "object" == typeof t ? t : null)), e(this).data(Gt, i)), "string" == typeof t)) {
                            if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
                            i[t]();
                        }
                    });
                }),
                (ue._clearMenus = function (t) {
                    if (!t || (3 !== t.which && ("keyup" !== t.type || 9 === t.which)))
                        for (var i = [].slice.call(document.querySelectorAll(re)), n = 0, s = i.length; n < s; n++) {
                            var o = ue._getParentFromElement(i[n]),
                                r = e(i[n]).data(Gt),
                                a = { relatedTarget: i[n] };
                            if ((t && "click" === t.type && (a.clickEvent = t), r)) {
                                var l = r._menu;
                                if (e(o).hasClass(se) && !(t && (("click" === t.type && /input|textarea/i.test(t.target.tagName)) || ("keyup" === t.type && 9 === t.which)) && e.contains(o, t.target))) {
                                    var h = e.Event(ie.HIDE, a);
                                    e(o).trigger(h),
                                        h.isDefaultPrevented() ||
                                            ("ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop),
                                            i[n].setAttribute("aria-expanded", "false"),
                                            e(l).removeClass(se),
                                            e(o).removeClass(se).trigger(e.Event(ie.HIDDEN, a)));
                                }
                            }
                        }
                }),
                (ue._getParentFromElement = function (t) {
                    var e,
                        i = r.getSelectorFromElement(t);
                    return i && (e = document.querySelector(i)), e || t.parentNode;
                }),
                (ue._dataApiKeydownHandler = function (t) {
                    if (
                        (/input|textarea/i.test(t.target.tagName) ? !(32 === t.which || (27 !== t.which && ((40 !== t.which && 38 !== t.which) || e(t.target).closest(ae).length))) : ee.test(t.which)) &&
                        (t.preventDefault(), t.stopPropagation(), !this.disabled && !e(this).hasClass(ne))
                    ) {
                        var i = ue._getParentFromElement(this),
                            n = e(i).hasClass(se);
                        if (n && (!n || (27 !== t.which && 32 !== t.which))) {
                            var s = [].slice.call(i.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"));
                            if (0 !== s.length) {
                                var o = s.indexOf(t.target);
                                38 === t.which && 0 < o && o--, 40 === t.which && o < s.length - 1 && o++, o < 0 && (o = 0), s[o].focus();
                            }
                        } else {
                            if (27 === t.which) {
                                var r = i.querySelector(re);
                                e(r).trigger("focus");
                            }
                            e(this).trigger("click");
                        }
                    }
                }),
                n(ue, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "4.3.1";
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return le;
                        },
                    },
                    {
                        key: "DefaultType",
                        get: function () {
                            return he;
                        },
                    },
                ]),
                ue);
        function ue(t, e) {
            (this._element = t), (this._popper = null), (this._config = this._getConfig(e)), (this._menu = this._getMenuElement()), (this._inNavbar = this._detectNavbar()), this._addEventListeners();
        }
        e(document)
            .on(ie.KEYDOWN_DATA_API, re, ce._dataApiKeydownHandler)
            .on(ie.KEYDOWN_DATA_API, ae, ce._dataApiKeydownHandler)
            .on(ie.CLICK_DATA_API + " " + ie.KEYUP_DATA_API, ce._clearMenus)
            .on(ie.CLICK_DATA_API, re, function (t) {
                t.preventDefault(), t.stopPropagation(), ce._jQueryInterface.call(e(this), "toggle");
            })
            .on(ie.CLICK_DATA_API, ".dropdown form", function (t) {
                t.stopPropagation();
            }),
            (e.fn[Qt] = ce._jQueryInterface),
            (e.fn[Qt].Constructor = ce),
            (e.fn[Qt].noConflict = function () {
                return (e.fn[Qt] = te), ce._jQueryInterface;
            });
        var de,
            pe = "modal",
            fe = "bs.modal",
            ge = "." + fe,
            me = e.fn[pe],
            ve = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
            _e = { backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean" },
            be = {
                HIDE: "hide" + ge,
                HIDDEN: "hidden" + ge,
                SHOW: "show" + ge,
                SHOWN: "shown" + ge,
                FOCUSIN: "focusin" + ge,
                RESIZE: "resize" + ge,
                CLICK_DISMISS: "click.dismiss" + ge,
                KEYDOWN_DISMISS: "keydown.dismiss" + ge,
                MOUSEUP_DISMISS: "mouseup.dismiss" + ge,
                MOUSEDOWN_DISMISS: "mousedown.dismiss" + ge,
                CLICK_DATA_API: "click" + ge + ".data-api",
            },
            ye = "modal-open",
            we = "fade",
            Ce = "show",
            xe = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
            ke = ".sticky-top",
            Te =
                (((de = De.prototype).toggle = function (t) {
                    return this._isShown ? this.hide() : this.show(t);
                }),
                (de.show = function (t) {
                    var i = this;
                    if (!this._isShown && !this._isTransitioning) {
                        e(this._element).hasClass(we) && (this._isTransitioning = !0);
                        var n = e.Event(be.SHOW, { relatedTarget: t });
                        e(this._element).trigger(n),
                            this._isShown ||
                                n.isDefaultPrevented() ||
                                ((this._isShown = !0),
                                this._checkScrollbar(),
                                this._setScrollbar(),
                                this._adjustDialog(),
                                this._setEscapeEvent(),
                                this._setResizeEvent(),
                                e(this._element).on(be.CLICK_DISMISS, '[data-dismiss="modal"]', function (t) {
                                    return i.hide(t);
                                }),
                                e(this._dialog).on(be.MOUSEDOWN_DISMISS, function () {
                                    e(i._element).one(be.MOUSEUP_DISMISS, function (t) {
                                        e(t.target).is(i._element) && (i._ignoreBackdropClick = !0);
                                    });
                                }),
                                this._showBackdrop(function () {
                                    return i._showElement(t);
                                }));
                    }
                }),
                (de.hide = function (t) {
                    var i = this;
                    if ((t && t.preventDefault(), this._isShown && !this._isTransitioning)) {
                        var n = e.Event(be.HIDE);
                        if ((e(this._element).trigger(n), this._isShown && !n.isDefaultPrevented())) {
                            this._isShown = !1;
                            var s = e(this._element).hasClass(we);
                            if (
                                (s && (this._isTransitioning = !0),
                                this._setEscapeEvent(),
                                this._setResizeEvent(),
                                e(document).off(be.FOCUSIN),
                                e(this._element).removeClass(Ce),
                                e(this._element).off(be.CLICK_DISMISS),
                                e(this._dialog).off(be.MOUSEDOWN_DISMISS),
                                s)
                            ) {
                                var o = r.getTransitionDurationFromElement(this._element);
                                e(this._element)
                                    .one(r.TRANSITION_END, function (t) {
                                        return i._hideModal(t);
                                    })
                                    .emulateTransitionEnd(o);
                            } else this._hideModal();
                        }
                    }
                }),
                (de.dispose = function () {
                    [window, this._element, this._dialog].forEach(function (t) {
                        return e(t).off(ge);
                    }),
                        e(document).off(be.FOCUSIN),
                        e.removeData(this._element, fe),
                        (this._config = null),
                        (this._element = null),
                        (this._dialog = null),
                        (this._backdrop = null),
                        (this._isShown = null),
                        (this._isBodyOverflowing = null),
                        (this._ignoreBackdropClick = null),
                        (this._isTransitioning = null),
                        (this._scrollbarWidth = null);
                }),
                (de.handleUpdate = function () {
                    this._adjustDialog();
                }),
                (de._getConfig = function (t) {
                    return (t = s({}, ve, t)), r.typeCheckConfig(pe, t, _e), t;
                }),
                (de._showElement = function (t) {
                    var i = this,
                        n = e(this._element).hasClass(we);
                    function s() {
                        i._config.focus && i._element.focus(), (i._isTransitioning = !1), e(i._element).trigger(o);
                    }
                    (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE) || document.body.appendChild(this._element),
                        (this._element.style.display = "block"),
                        this._element.removeAttribute("aria-hidden"),
                        this._element.setAttribute("aria-modal", !0),
                        e(this._dialog).hasClass("modal-dialog-scrollable") ? (this._dialog.querySelector(".modal-body").scrollTop = 0) : (this._element.scrollTop = 0),
                        n && r.reflow(this._element),
                        e(this._element).addClass(Ce),
                        this._config.focus && this._enforceFocus();
                    var o = e.Event(be.SHOWN, { relatedTarget: t });
                    if (n) {
                        var a = r.getTransitionDurationFromElement(this._dialog);
                        e(this._dialog).one(r.TRANSITION_END, s).emulateTransitionEnd(a);
                    } else s();
                }),
                (de._enforceFocus = function () {
                    var t = this;
                    e(document)
                        .off(be.FOCUSIN)
                        .on(be.FOCUSIN, function (i) {
                            document !== i.target && t._element !== i.target && 0 === e(t._element).has(i.target).length && t._element.focus();
                        });
                }),
                (de._setEscapeEvent = function () {
                    var t = this;
                    this._isShown && this._config.keyboard
                        ? e(this._element).on(be.KEYDOWN_DISMISS, function (e) {
                              27 === e.which && (e.preventDefault(), t.hide());
                          })
                        : this._isShown || e(this._element).off(be.KEYDOWN_DISMISS);
                }),
                (de._setResizeEvent = function () {
                    var t = this;
                    this._isShown
                        ? e(window).on(be.RESIZE, function (e) {
                              return t.handleUpdate(e);
                          })
                        : e(window).off(be.RESIZE);
                }),
                (de._hideModal = function () {
                    var t = this;
                    (this._element.style.display = "none"),
                        this._element.setAttribute("aria-hidden", !0),
                        this._element.removeAttribute("aria-modal"),
                        (this._isTransitioning = !1),
                        this._showBackdrop(function () {
                            e(document.body).removeClass(ye), t._resetAdjustments(), t._resetScrollbar(), e(t._element).trigger(be.HIDDEN);
                        });
                }),
                (de._removeBackdrop = function () {
                    this._backdrop && (e(this._backdrop).remove(), (this._backdrop = null));
                }),
                (de._showBackdrop = function (t) {
                    var i = this,
                        n = e(this._element).hasClass(we) ? we : "";
                    if (this._isShown && this._config.backdrop) {
                        if (
                            ((this._backdrop = document.createElement("div")),
                            (this._backdrop.className = "modal-backdrop"),
                            n && this._backdrop.classList.add(n),
                            e(this._backdrop).appendTo(document.body),
                            e(this._element).on(be.CLICK_DISMISS, function (t) {
                                i._ignoreBackdropClick ? (i._ignoreBackdropClick = !1) : t.target === t.currentTarget && ("static" === i._config.backdrop ? i._element.focus() : i.hide());
                            }),
                            n && r.reflow(this._backdrop),
                            e(this._backdrop).addClass(Ce),
                            !t)
                        )
                            return;
                        if (!n) return void t();
                        var s = r.getTransitionDurationFromElement(this._backdrop);
                        e(this._backdrop).one(r.TRANSITION_END, t).emulateTransitionEnd(s);
                    } else if (!this._isShown && this._backdrop) {
                        e(this._backdrop).removeClass(Ce);
                        var o = function () {
                            i._removeBackdrop(), t && t();
                        };
                        if (e(this._element).hasClass(we)) {
                            var a = r.getTransitionDurationFromElement(this._backdrop);
                            e(this._backdrop).one(r.TRANSITION_END, o).emulateTransitionEnd(a);
                        } else o();
                    } else t && t();
                }),
                (de._adjustDialog = function () {
                    var t = this._element.scrollHeight > document.documentElement.clientHeight;
                    !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px");
                }),
                (de._resetAdjustments = function () {
                    (this._element.style.paddingLeft = ""), (this._element.style.paddingRight = "");
                }),
                (de._checkScrollbar = function () {
                    var t = document.body.getBoundingClientRect();
                    (this._isBodyOverflowing = t.left + t.right < window.innerWidth), (this._scrollbarWidth = this._getScrollbarWidth());
                }),
                (de._setScrollbar = function () {
                    var t = this;
                    if (this._isBodyOverflowing) {
                        var i = [].slice.call(document.querySelectorAll(xe)),
                            n = [].slice.call(document.querySelectorAll(ke));
                        e(i).each(function (i, n) {
                            var s = n.style.paddingRight,
                                o = e(n).css("padding-right");
                            e(n)
                                .data("padding-right", s)
                                .css("padding-right", parseFloat(o) + t._scrollbarWidth + "px");
                        }),
                            e(n).each(function (i, n) {
                                var s = n.style.marginRight,
                                    o = e(n).css("margin-right");
                                e(n)
                                    .data("margin-right", s)
                                    .css("margin-right", parseFloat(o) - t._scrollbarWidth + "px");
                            });
                        var s = document.body.style.paddingRight,
                            o = e(document.body).css("padding-right");
                        e(document.body)
                            .data("padding-right", s)
                            .css("padding-right", parseFloat(o) + this._scrollbarWidth + "px");
                    }
                    e(document.body).addClass(ye);
                }),
                (de._resetScrollbar = function () {
                    var t = [].slice.call(document.querySelectorAll(xe));
                    e(t).each(function (t, i) {
                        var n = e(i).data("padding-right");
                        e(i).removeData("padding-right"), (i.style.paddingRight = n || "");
                    });
                    var i = [].slice.call(document.querySelectorAll(ke));
                    e(i).each(function (t, i) {
                        var n = e(i).data("margin-right");
                        void 0 !== n && e(i).css("margin-right", n).removeData("margin-right");
                    });
                    var n = e(document.body).data("padding-right");
                    e(document.body).removeData("padding-right"), (document.body.style.paddingRight = n || "");
                }),
                (de._getScrollbarWidth = function () {
                    var t = document.createElement("div");
                    (t.className = "modal-scrollbar-measure"), document.body.appendChild(t);
                    var e = t.getBoundingClientRect().width - t.clientWidth;
                    return document.body.removeChild(t), e;
                }),
                (De._jQueryInterface = function (t, i) {
                    return this.each(function () {
                        var n = e(this).data(fe),
                            o = s({}, ve, e(this).data(), "object" == typeof t && t ? t : {});
                        if ((n || ((n = new De(this, o)), e(this).data(fe, n)), "string" == typeof t)) {
                            if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"');
                            n[t](i);
                        } else o.show && n.show(i);
                    });
                }),
                n(De, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "4.3.1";
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return ve;
                        },
                    },
                ]),
                De);
        function De(t, e) {
            (this._config = this._getConfig(e)),
                (this._element = t),
                (this._dialog = t.querySelector(".modal-dialog")),
                (this._backdrop = null),
                (this._isShown = !1),
                (this._isBodyOverflowing = !1),
                (this._ignoreBackdropClick = !1),
                (this._isTransitioning = !1),
                (this._scrollbarWidth = 0);
        }
        e(document).on(be.CLICK_DATA_API, '[data-toggle="modal"]', function (t) {
            var i,
                n = this,
                o = r.getSelectorFromElement(this);
            o && (i = document.querySelector(o));
            var a = e(i).data(fe) ? "toggle" : s({}, e(i).data(), e(this).data());
            ("A" !== this.tagName && "AREA" !== this.tagName) || t.preventDefault();
            var l = e(i).one(be.SHOW, function (t) {
                t.isDefaultPrevented() ||
                    l.one(be.HIDDEN, function () {
                        e(n).is(":visible") && n.focus();
                    });
            });
            Te._jQueryInterface.call(e(i), a, this);
        }),
            (e.fn[pe] = Te._jQueryInterface),
            (e.fn[pe].Constructor = Te),
            (e.fn[pe].noConflict = function () {
                return (e.fn[pe] = me), Te._jQueryInterface;
            });
        var Se = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
            Ee = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
            Ie = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
        function Ae(t, e, i) {
            if (0 === t.length) return t;
            if (i && "function" == typeof i) return i(t);
            for (
                var n = new window.DOMParser().parseFromString(t, "text/html"),
                    s = Object.keys(e),
                    o = [].slice.call(n.body.querySelectorAll("*")),
                    r = function (t, i) {
                        var n = o[t],
                            r = n.nodeName.toLowerCase();
                        if (-1 === s.indexOf(n.nodeName.toLowerCase())) return n.parentNode.removeChild(n), "continue";
                        var a = [].slice.call(n.attributes),
                            l = [].concat(e["*"] || [], e[r] || []);
                        a.forEach(function (t) {
                            !(function (t, e) {
                                var i = t.nodeName.toLowerCase();
                                if (-1 !== e.indexOf(i)) return -1 === Se.indexOf(i) || Boolean(t.nodeValue.match(Ee) || t.nodeValue.match(Ie));
                                for (
                                    var n = e.filter(function (t) {
                                            return t instanceof RegExp;
                                        }),
                                        s = 0,
                                        o = n.length;
                                    s < o;
                                    s++
                                )
                                    if (i.match(n[s])) return !0;
                                return !1;
                            })(t, l) && n.removeAttribute(t.nodeName);
                        });
                    },
                    a = 0,
                    l = o.length;
                a < l;
                a++
            )
                r(a);
            return n.body.innerHTML;
        }
        var Pe,
            Ne = "tooltip",
            Oe = "bs.tooltip",
            Me = "." + Oe,
            $e = e.fn[Ne],
            He = "bs-tooltip",
            Le = new RegExp("(^|\\s)" + He + "\\S+", "g"),
            We = ["sanitize", "whiteList", "sanitizeFn"],
            Re = {
                animation: "boolean",
                template: "string",
                title: "(string|element|function)",
                trigger: "string",
                delay: "(number|object)",
                html: "boolean",
                selector: "(string|boolean)",
                placement: "(string|function)",
                offset: "(number|string|function)",
                container: "(string|element|boolean)",
                fallbackPlacement: "(string|array)",
                boundary: "(string|element)",
                sanitize: "boolean",
                sanitizeFn: "(null|function)",
                whiteList: "object",
            },
            Fe = { AUTO: "auto", TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left" },
            je = {
                animation: !0,
                template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
                trigger: "hover focus",
                title: "",
                delay: 0,
                html: !1,
                selector: !1,
                placement: "top",
                offset: 0,
                container: !1,
                fallbackPlacement: "flip",
                boundary: "scrollParent",
                sanitize: !0,
                sanitizeFn: null,
                whiteList: {
                    "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                    a: ["target", "href", "title", "rel"],
                    area: [],
                    b: [],
                    br: [],
                    col: [],
                    code: [],
                    div: [],
                    em: [],
                    hr: [],
                    h1: [],
                    h2: [],
                    h3: [],
                    h4: [],
                    h5: [],
                    h6: [],
                    i: [],
                    img: ["src", "alt", "title", "width", "height"],
                    li: [],
                    ol: [],
                    p: [],
                    pre: [],
                    s: [],
                    small: [],
                    span: [],
                    sub: [],
                    sup: [],
                    strong: [],
                    u: [],
                    ul: [],
                },
            },
            ze = "show",
            qe = {
                HIDE: "hide" + Me,
                HIDDEN: "hidden" + Me,
                SHOW: "show" + Me,
                SHOWN: "shown" + Me,
                INSERTED: "inserted" + Me,
                CLICK: "click" + Me,
                FOCUSIN: "focusin" + Me,
                FOCUSOUT: "focusout" + Me,
                MOUSEENTER: "mouseenter" + Me,
                MOUSELEAVE: "mouseleave" + Me,
            },
            Be = "fade",
            Ue = "show",
            Ye = "hover",
            Ke =
                (((Pe = Ve.prototype).enable = function () {
                    this._isEnabled = !0;
                }),
                (Pe.disable = function () {
                    this._isEnabled = !1;
                }),
                (Pe.toggleEnabled = function () {
                    this._isEnabled = !this._isEnabled;
                }),
                (Pe.toggle = function (t) {
                    if (this._isEnabled)
                        if (t) {
                            var i = this.constructor.DATA_KEY,
                                n = e(t.currentTarget).data(i);
                            n || ((n = new this.constructor(t.currentTarget, this._getDelegateConfig())), e(t.currentTarget).data(i, n)),
                                (n._activeTrigger.click = !n._activeTrigger.click),
                                n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n);
                        } else {
                            if (e(this.getTipElement()).hasClass(Ue)) return void this._leave(null, this);
                            this._enter(null, this);
                        }
                }),
                (Pe.dispose = function () {
                    clearTimeout(this._timeout),
                        e.removeData(this.element, this.constructor.DATA_KEY),
                        e(this.element).off(this.constructor.EVENT_KEY),
                        e(this.element).closest(".modal").off("hide.bs.modal"),
                        this.tip && e(this.tip).remove(),
                        (this._isEnabled = null),
                        (this._timeout = null),
                        (this._hoverState = null),
                        (this._activeTrigger = null) !== this._popper && this._popper.destroy(),
                        (this._popper = null),
                        (this.element = null),
                        (this.config = null),
                        (this.tip = null);
                }),
                (Pe.show = function () {
                    var t = this;
                    if ("none" === e(this.element).css("display")) throw new Error("Please use show on visible elements");
                    var i = e.Event(this.constructor.Event.SHOW);
                    if (this.isWithContent() && this._isEnabled) {
                        e(this.element).trigger(i);
                        var n = r.findShadowRoot(this.element),
                            s = e.contains(null !== n ? n : this.element.ownerDocument.documentElement, this.element);
                        if (i.isDefaultPrevented() || !s) return;
                        var o = this.getTipElement(),
                            a = r.getUID(this.constructor.NAME);
                        o.setAttribute("id", a), this.element.setAttribute("aria-describedby", a), this.setContent(), this.config.animation && e(o).addClass(Be);
                        var l = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this.element) : this.config.placement,
                            h = this._getAttachment(l);
                        this.addAttachmentClass(h);
                        var c = this._getContainer();
                        e(o).data(this.constructor.DATA_KEY, this),
                            e.contains(this.element.ownerDocument.documentElement, this.tip) || e(o).appendTo(c),
                            e(this.element).trigger(this.constructor.Event.INSERTED),
                            (this._popper = new Kt(this.element, o, {
                                placement: h,
                                modifiers: { offset: this._getOffset(), flip: { behavior: this.config.fallbackPlacement }, arrow: { element: ".arrow" }, preventOverflow: { boundariesElement: this.config.boundary } },
                                onCreate: function (e) {
                                    e.originalPlacement !== e.placement && t._handlePopperPlacementChange(e);
                                },
                                onUpdate: function (e) {
                                    return t._handlePopperPlacementChange(e);
                                },
                            })),
                            e(o).addClass(Ue),
                            "ontouchstart" in document.documentElement && e(document.body).children().on("mouseover", null, e.noop);
                        var u = function () {
                            t.config.animation && t._fixTransition();
                            var i = t._hoverState;
                            (t._hoverState = null), e(t.element).trigger(t.constructor.Event.SHOWN), "out" === i && t._leave(null, t);
                        };
                        if (e(this.tip).hasClass(Be)) {
                            var d = r.getTransitionDurationFromElement(this.tip);
                            e(this.tip).one(r.TRANSITION_END, u).emulateTransitionEnd(d);
                        } else u();
                    }
                }),
                (Pe.hide = function (t) {
                    function i() {
                        n._hoverState !== ze && s.parentNode && s.parentNode.removeChild(s),
                            n._cleanTipClass(),
                            n.element.removeAttribute("aria-describedby"),
                            e(n.element).trigger(n.constructor.Event.HIDDEN),
                            null !== n._popper && n._popper.destroy(),
                            t && t();
                    }
                    var n = this,
                        s = this.getTipElement(),
                        o = e.Event(this.constructor.Event.HIDE);
                    if ((e(this.element).trigger(o), !o.isDefaultPrevented())) {
                        if (
                            (e(s).removeClass(Ue),
                            "ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop),
                            (this._activeTrigger.click = !1),
                            (this._activeTrigger.focus = !1),
                            (this._activeTrigger[Ye] = !1),
                            e(this.tip).hasClass(Be))
                        ) {
                            var a = r.getTransitionDurationFromElement(s);
                            e(s).one(r.TRANSITION_END, i).emulateTransitionEnd(a);
                        } else i();
                        this._hoverState = "";
                    }
                }),
                (Pe.update = function () {
                    null !== this._popper && this._popper.scheduleUpdate();
                }),
                (Pe.isWithContent = function () {
                    return Boolean(this.getTitle());
                }),
                (Pe.addAttachmentClass = function (t) {
                    e(this.getTipElement()).addClass(He + "-" + t);
                }),
                (Pe.getTipElement = function () {
                    return (this.tip = this.tip || e(this.config.template)[0]), this.tip;
                }),
                (Pe.setContent = function () {
                    var t = this.getTipElement();
                    this.setElementContent(e(t.querySelectorAll(".tooltip-inner")), this.getTitle()), e(t).removeClass("fade show");
                }),
                (Pe.setElementContent = function (t, i) {
                    "object" != typeof i || (!i.nodeType && !i.jquery)
                        ? this.config.html
                            ? (this.config.sanitize && (i = Ae(i, this.config.whiteList, this.config.sanitizeFn)), t.html(i))
                            : t.text(i)
                        : this.config.html
                        ? e(i).parent().is(t) || t.empty().append(i)
                        : t.text(e(i).text());
                }),
                (Pe.getTitle = function () {
                    var t = this.element.getAttribute("data-original-title");
                    return t || ("function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title);
                }),
                (Pe._getOffset = function () {
                    var t = this,
                        e = {};
                    return (
                        "function" == typeof this.config.offset
                            ? (e.fn = function (e) {
                                  return (e.offsets = s({}, e.offsets, t.config.offset(e.offsets, t.element) || {})), e;
                              })
                            : (e.offset = this.config.offset),
                        e
                    );
                }),
                (Pe._getContainer = function () {
                    return !1 === this.config.container ? document.body : r.isElement(this.config.container) ? e(this.config.container) : e(document).find(this.config.container);
                }),
                (Pe._getAttachment = function (t) {
                    return Fe[t.toUpperCase()];
                }),
                (Pe._setListeners = function () {
                    var t = this;
                    this.config.trigger.split(" ").forEach(function (i) {
                        if ("click" === i)
                            e(t.element).on(t.constructor.Event.CLICK, t.config.selector, function (e) {
                                return t.toggle(e);
                            });
                        else if ("manual" !== i) {
                            var n = i === Ye ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
                                s = i === Ye ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
                            e(t.element)
                                .on(n, t.config.selector, function (e) {
                                    return t._enter(e);
                                })
                                .on(s, t.config.selector, function (e) {
                                    return t._leave(e);
                                });
                        }
                    }),
                        e(this.element)
                            .closest(".modal")
                            .on("hide.bs.modal", function () {
                                t.element && t.hide();
                            }),
                        this.config.selector ? (this.config = s({}, this.config, { trigger: "manual", selector: "" })) : this._fixTitle();
                }),
                (Pe._fixTitle = function () {
                    var t = typeof this.element.getAttribute("data-original-title");
                    (!this.element.getAttribute("title") && "string" == t) || (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""));
                }),
                (Pe._enter = function (t, i) {
                    var n = this.constructor.DATA_KEY;
                    (i = i || e(t.currentTarget).data(n)) || ((i = new this.constructor(t.currentTarget, this._getDelegateConfig())), e(t.currentTarget).data(n, i)),
                        t && (i._activeTrigger["focusin" === t.type ? "focus" : Ye] = !0),
                        e(i.getTipElement()).hasClass(Ue) || i._hoverState === ze
                            ? (i._hoverState = ze)
                            : (clearTimeout(i._timeout),
                              (i._hoverState = ze),
                              i.config.delay && i.config.delay.show
                                  ? (i._timeout = setTimeout(function () {
                                        i._hoverState === ze && i.show();
                                    }, i.config.delay.show))
                                  : i.show());
                }),
                (Pe._leave = function (t, i) {
                    var n = this.constructor.DATA_KEY;
                    (i = i || e(t.currentTarget).data(n)) || ((i = new this.constructor(t.currentTarget, this._getDelegateConfig())), e(t.currentTarget).data(n, i)),
                        t && (i._activeTrigger["focusout" === t.type ? "focus" : Ye] = !1),
                        i._isWithActiveTrigger() ||
                            (clearTimeout(i._timeout),
                            (i._hoverState = "out"),
                            i.config.delay && i.config.delay.hide
                                ? (i._timeout = setTimeout(function () {
                                      "out" === i._hoverState && i.hide();
                                  }, i.config.delay.hide))
                                : i.hide());
                }),
                (Pe._isWithActiveTrigger = function () {
                    for (var t in this._activeTrigger) if (this._activeTrigger[t]) return !0;
                    return !1;
                }),
                (Pe._getConfig = function (t) {
                    var i = e(this.element).data();
                    return (
                        Object.keys(i).forEach(function (t) {
                            -1 !== We.indexOf(t) && delete i[t];
                        }),
                        "number" == typeof (t = s({}, this.constructor.Default, i, "object" == typeof t && t ? t : {})).delay && (t.delay = { show: t.delay, hide: t.delay }),
                        "number" == typeof t.title && (t.title = t.title.toString()),
                        "number" == typeof t.content && (t.content = t.content.toString()),
                        r.typeCheckConfig(Ne, t, this.constructor.DefaultType),
                        t.sanitize && (t.template = Ae(t.template, t.whiteList, t.sanitizeFn)),
                        t
                    );
                }),
                (Pe._getDelegateConfig = function () {
                    var t = {};
                    if (this.config) for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                    return t;
                }),
                (Pe._cleanTipClass = function () {
                    var t = e(this.getTipElement()),
                        i = t.attr("class").match(Le);
                    null !== i && i.length && t.removeClass(i.join(""));
                }),
                (Pe._handlePopperPlacementChange = function (t) {
                    var e = t.instance;
                    (this.tip = e.popper), this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement));
                }),
                (Pe._fixTransition = function () {
                    var t = this.getTipElement(),
                        i = this.config.animation;
                    null === t.getAttribute("x-placement") && (e(t).removeClass(Be), (this.config.animation = !1), this.hide(), this.show(), (this.config.animation = i));
                }),
                (Ve._jQueryInterface = function (t) {
                    return this.each(function () {
                        var i = e(this).data(Oe),
                            n = "object" == typeof t && t;
                        if ((i || !/dispose|hide/.test(t)) && (i || ((i = new Ve(this, n)), e(this).data(Oe, i)), "string" == typeof t)) {
                            if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
                            i[t]();
                        }
                    });
                }),
                n(Ve, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "4.3.1";
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return je;
                        },
                    },
                    {
                        key: "NAME",
                        get: function () {
                            return Ne;
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return Oe;
                        },
                    },
                    {
                        key: "Event",
                        get: function () {
                            return qe;
                        },
                    },
                    {
                        key: "EVENT_KEY",
                        get: function () {
                            return Me;
                        },
                    },
                    {
                        key: "DefaultType",
                        get: function () {
                            return Re;
                        },
                    },
                ]),
                Ve);
        function Ve(t, e) {
            if (void 0 === Kt) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
            (this._isEnabled = !0), (this._timeout = 0), (this._hoverState = ""), (this._activeTrigger = {}), (this._popper = null), (this.element = t), (this.config = this._getConfig(e)), (this.tip = null), this._setListeners();
        }
        (e.fn[Ne] = Ke._jQueryInterface),
            (e.fn[Ne].Constructor = Ke),
            (e.fn[Ne].noConflict = function () {
                return (e.fn[Ne] = $e), Ke._jQueryInterface;
            });
        var Xe = "popover",
            Qe = "bs.popover",
            Ge = "." + Qe,
            Je = e.fn[Xe],
            Ze = "bs-popover",
            ti = new RegExp("(^|\\s)" + Ze + "\\S+", "g"),
            ei = s({}, Ke.Default, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>' }),
            ii = s({}, Ke.DefaultType, { content: "(string|element|function)" }),
            ni = {
                HIDE: "hide" + Ge,
                HIDDEN: "hidden" + Ge,
                SHOW: "show" + Ge,
                SHOWN: "shown" + Ge,
                INSERTED: "inserted" + Ge,
                CLICK: "click" + Ge,
                FOCUSIN: "focusin" + Ge,
                FOCUSOUT: "focusout" + Ge,
                MOUSEENTER: "mouseenter" + Ge,
                MOUSELEAVE: "mouseleave" + Ge,
            },
            si = (function (t) {
                var i, s;
                function o() {
                    return t.apply(this, arguments) || this;
                }
                (s = t), ((i = o).prototype = Object.create(s.prototype)), ((i.prototype.constructor = i).__proto__ = s);
                var r = o.prototype;
                return (
                    (r.isWithContent = function () {
                        return this.getTitle() || this._getContent();
                    }),
                    (r.addAttachmentClass = function (t) {
                        e(this.getTipElement()).addClass(Ze + "-" + t);
                    }),
                    (r.getTipElement = function () {
                        return (this.tip = this.tip || e(this.config.template)[0]), this.tip;
                    }),
                    (r.setContent = function () {
                        var t = e(this.getTipElement());
                        this.setElementContent(t.find(".popover-header"), this.getTitle());
                        var i = this._getContent();
                        "function" == typeof i && (i = i.call(this.element)), this.setElementContent(t.find(".popover-body"), i), t.removeClass("fade show");
                    }),
                    (r._getContent = function () {
                        return this.element.getAttribute("data-content") || this.config.content;
                    }),
                    (r._cleanTipClass = function () {
                        var t = e(this.getTipElement()),
                            i = t.attr("class").match(ti);
                        null !== i && 0 < i.length && t.removeClass(i.join(""));
                    }),
                    (o._jQueryInterface = function (t) {
                        return this.each(function () {
                            var i = e(this).data(Qe),
                                n = "object" == typeof t ? t : null;
                            if ((i || !/dispose|hide/.test(t)) && (i || ((i = new o(this, n)), e(this).data(Qe, i)), "string" == typeof t)) {
                                if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
                                i[t]();
                            }
                        });
                    }),
                    n(o, null, [
                        {
                            key: "VERSION",
                            get: function () {
                                return "4.3.1";
                            },
                        },
                        {
                            key: "Default",
                            get: function () {
                                return ei;
                            },
                        },
                        {
                            key: "NAME",
                            get: function () {
                                return Xe;
                            },
                        },
                        {
                            key: "DATA_KEY",
                            get: function () {
                                return Qe;
                            },
                        },
                        {
                            key: "Event",
                            get: function () {
                                return ni;
                            },
                        },
                        {
                            key: "EVENT_KEY",
                            get: function () {
                                return Ge;
                            },
                        },
                        {
                            key: "DefaultType",
                            get: function () {
                                return ii;
                            },
                        },
                    ]),
                    o
                );
            })(Ke);
        (e.fn[Xe] = si._jQueryInterface),
            (e.fn[Xe].Constructor = si),
            (e.fn[Xe].noConflict = function () {
                return (e.fn[Xe] = Je), si._jQueryInterface;
            });
        var oi,
            ri = "scrollspy",
            ai = "bs.scrollspy",
            li = "." + ai,
            hi = e.fn[ri],
            ci = { offset: 10, method: "auto", target: "" },
            ui = { offset: "number", method: "string", target: "(string|element)" },
            di = { ACTIVATE: "activate" + li, SCROLL: "scroll" + li, LOAD_DATA_API: "load" + li + ".data-api" },
            pi = "active",
            fi = ".nav, .list-group",
            gi = ".nav-link",
            mi = ".list-group-item",
            vi =
                (((oi = _i.prototype).refresh = function () {
                    var t = this,
                        i = this._scrollElement === this._scrollElement.window ? "offset" : "position",
                        n = "auto" === this._config.method ? i : this._config.method,
                        s = "position" === n ? this._getScrollTop() : 0;
                    (this._offsets = []),
                        (this._targets = []),
                        (this._scrollHeight = this._getScrollHeight()),
                        [].slice
                            .call(document.querySelectorAll(this._selector))
                            .map(function (t) {
                                var i,
                                    o = r.getSelectorFromElement(t);
                                if ((o && (i = document.querySelector(o)), i)) {
                                    var a = i.getBoundingClientRect();
                                    if (a.width || a.height) return [e(i)[n]().top + s, o];
                                }
                                return null;
                            })
                            .filter(function (t) {
                                return t;
                            })
                            .sort(function (t, e) {
                                return t[0] - e[0];
                            })
                            .forEach(function (e) {
                                t._offsets.push(e[0]), t._targets.push(e[1]);
                            });
                }),
                (oi.dispose = function () {
                    e.removeData(this._element, ai),
                        e(this._scrollElement).off(li),
                        (this._element = null),
                        (this._scrollElement = null),
                        (this._config = null),
                        (this._selector = null),
                        (this._offsets = null),
                        (this._targets = null),
                        (this._activeTarget = null),
                        (this._scrollHeight = null);
                }),
                (oi._getConfig = function (t) {
                    if ("string" != typeof (t = s({}, ci, "object" == typeof t && t ? t : {})).target) {
                        var i = e(t.target).attr("id");
                        i || ((i = r.getUID(ri)), e(t.target).attr("id", i)), (t.target = "#" + i);
                    }
                    return r.typeCheckConfig(ri, t, ui), t;
                }),
                (oi._getScrollTop = function () {
                    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
                }),
                (oi._getScrollHeight = function () {
                    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                }),
                (oi._getOffsetHeight = function () {
                    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
                }),
                (oi._process = function () {
                    var t = this._getScrollTop() + this._config.offset,
                        e = this._getScrollHeight(),
                        i = this._config.offset + e - this._getOffsetHeight();
                    if ((this._scrollHeight !== e && this.refresh(), i <= t)) {
                        var n = this._targets[this._targets.length - 1];
                        this._activeTarget !== n && this._activate(n);
                    } else {
                        if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) return (this._activeTarget = null), void this._clear();
                        for (var s = this._offsets.length; s--; ) this._activeTarget !== this._targets[s] && t >= this._offsets[s] && (void 0 === this._offsets[s + 1] || t < this._offsets[s + 1]) && this._activate(this._targets[s]);
                    }
                }),
                (oi._activate = function (t) {
                    (this._activeTarget = t), this._clear();
                    var i = this._selector.split(",").map(function (e) {
                            return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]';
                        }),
                        n = e([].slice.call(document.querySelectorAll(i.join(","))));
                    n.hasClass("dropdown-item")
                        ? (n.closest(".dropdown").find(".dropdown-toggle").addClass(pi), n.addClass(pi))
                        : (n.addClass(pi),
                          n
                              .parents(fi)
                              .prev(gi + ", " + mi)
                              .addClass(pi),
                          n.parents(fi).prev(".nav-item").children(gi).addClass(pi)),
                        e(this._scrollElement).trigger(di.ACTIVATE, { relatedTarget: t });
                }),
                (oi._clear = function () {
                    [].slice
                        .call(document.querySelectorAll(this._selector))
                        .filter(function (t) {
                            return t.classList.contains(pi);
                        })
                        .forEach(function (t) {
                            return t.classList.remove(pi);
                        });
                }),
                (_i._jQueryInterface = function (t) {
                    return this.each(function () {
                        var i = e(this).data(ai);
                        if ((i || ((i = new _i(this, "object" == typeof t && t)), e(this).data(ai, i)), "string" == typeof t)) {
                            if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
                            i[t]();
                        }
                    });
                }),
                n(_i, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "4.3.1";
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return ci;
                        },
                    },
                ]),
                _i);
        function _i(t, i) {
            var n = this;
            (this._element = t),
                (this._scrollElement = "BODY" === t.tagName ? window : t),
                (this._config = this._getConfig(i)),
                (this._selector = this._config.target + " " + gi + "," + this._config.target + " " + mi + "," + this._config.target + " .dropdown-item"),
                (this._offsets = []),
                (this._targets = []),
                (this._activeTarget = null),
                (this._scrollHeight = 0),
                e(this._scrollElement).on(di.SCROLL, function (t) {
                    return n._process(t);
                }),
                this.refresh(),
                this._process();
        }
        e(window).on(di.LOAD_DATA_API, function () {
            for (var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), i = t.length; i--; ) {
                var n = e(t[i]);
                vi._jQueryInterface.call(n, n.data());
            }
        }),
            (e.fn[ri] = vi._jQueryInterface),
            (e.fn[ri].Constructor = vi),
            (e.fn[ri].noConflict = function () {
                return (e.fn[ri] = hi), vi._jQueryInterface;
            });
        var bi,
            yi = "bs.tab",
            wi = "." + yi,
            Ci = e.fn.tab,
            xi = { HIDE: "hide" + wi, HIDDEN: "hidden" + wi, SHOW: "show" + wi, SHOWN: "shown" + wi, CLICK_DATA_API: "click.bs.tab.data-api" },
            ki = "active",
            Ti = "> li > .active",
            Di =
                (((bi = Si.prototype).show = function () {
                    var t = this;
                    if (!((this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && e(this._element).hasClass(ki)) || e(this._element).hasClass("disabled"))) {
                        var i,
                            n,
                            s = e(this._element).closest(".nav, .list-group")[0],
                            o = r.getSelectorFromElement(this._element);
                        if (s) {
                            var a = "UL" === s.nodeName || "OL" === s.nodeName ? Ti : ".active";
                            n = (n = e.makeArray(e(s).find(a)))[n.length - 1];
                        }
                        var l = e.Event(xi.HIDE, { relatedTarget: this._element }),
                            h = e.Event(xi.SHOW, { relatedTarget: n });
                        if ((n && e(n).trigger(l), e(this._element).trigger(h), !h.isDefaultPrevented() && !l.isDefaultPrevented())) {
                            o && (i = document.querySelector(o)), this._activate(this._element, s);
                            var c = function () {
                                var i = e.Event(xi.HIDDEN, { relatedTarget: t._element }),
                                    s = e.Event(xi.SHOWN, { relatedTarget: n });
                                e(n).trigger(i), e(t._element).trigger(s);
                            };
                            i ? this._activate(i, i.parentNode, c) : c();
                        }
                    }
                }),
                (bi.dispose = function () {
                    e.removeData(this._element, yi), (this._element = null);
                }),
                (bi._activate = function (t, i, n) {
                    function s() {
                        return o._transitionComplete(t, a, n);
                    }
                    var o = this,
                        a = (!i || ("UL" !== i.nodeName && "OL" !== i.nodeName) ? e(i).children(".active") : e(i).find(Ti))[0],
                        l = n && a && e(a).hasClass("fade");
                    if (a && l) {
                        var h = r.getTransitionDurationFromElement(a);
                        e(a).removeClass("show").one(r.TRANSITION_END, s).emulateTransitionEnd(h);
                    } else s();
                }),
                (bi._transitionComplete = function (t, i, n) {
                    if (i) {
                        e(i).removeClass(ki);
                        var s = e(i.parentNode).find("> .dropdown-menu .active")[0];
                        s && e(s).removeClass(ki), "tab" === i.getAttribute("role") && i.setAttribute("aria-selected", !1);
                    }
                    if (
                        (e(t).addClass(ki),
                        "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0),
                        r.reflow(t),
                        t.classList.contains("fade") && t.classList.add("show"),
                        t.parentNode && e(t.parentNode).hasClass("dropdown-menu"))
                    ) {
                        var o = e(t).closest(".dropdown")[0];
                        if (o) {
                            var a = [].slice.call(o.querySelectorAll(".dropdown-toggle"));
                            e(a).addClass(ki);
                        }
                        t.setAttribute("aria-expanded", !0);
                    }
                    n && n();
                }),
                (Si._jQueryInterface = function (t) {
                    return this.each(function () {
                        var i = e(this),
                            n = i.data(yi);
                        if ((n || ((n = new Si(this)), i.data(yi, n)), "string" == typeof t)) {
                            if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"');
                            n[t]();
                        }
                    });
                }),
                n(Si, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "4.3.1";
                        },
                    },
                ]),
                Si);
        function Si(t) {
            this._element = t;
        }
        e(document).on(xi.CLICK_DATA_API, '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function (t) {
            t.preventDefault(), Di._jQueryInterface.call(e(this), "show");
        }),
            (e.fn.tab = Di._jQueryInterface),
            (e.fn.tab.Constructor = Di),
            (e.fn.tab.noConflict = function () {
                return (e.fn.tab = Ci), Di._jQueryInterface;
            });
        var Ei,
            Ii = "toast",
            Ai = "bs.toast",
            Pi = "." + Ai,
            Ni = e.fn[Ii],
            Oi = { CLICK_DISMISS: "click.dismiss" + Pi, HIDE: "hide" + Pi, HIDDEN: "hidden" + Pi, SHOW: "show" + Pi, SHOWN: "shown" + Pi },
            Mi = "show",
            $i = { animation: "boolean", autohide: "boolean", delay: "number" },
            Hi = { animation: !0, autohide: !0, delay: 500 },
            Li =
                (((Ei = Wi.prototype).show = function () {
                    var t = this;
                    function i() {
                        t._element.classList.remove("showing"), t._element.classList.add(Mi), e(t._element).trigger(Oi.SHOWN), t._config.autohide && t.hide();
                    }
                    if ((e(this._element).trigger(Oi.SHOW), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove("hide"), this._element.classList.add("showing"), this._config.animation)) {
                        var n = r.getTransitionDurationFromElement(this._element);
                        e(this._element).one(r.TRANSITION_END, i).emulateTransitionEnd(n);
                    } else i();
                }),
                (Ei.hide = function (t) {
                    var i = this;
                    this._element.classList.contains(Mi) &&
                        (e(this._element).trigger(Oi.HIDE),
                        t
                            ? this._close()
                            : (this._timeout = setTimeout(function () {
                                  i._close();
                              }, this._config.delay)));
                }),
                (Ei.dispose = function () {
                    clearTimeout(this._timeout),
                        (this._timeout = null),
                        this._element.classList.contains(Mi) && this._element.classList.remove(Mi),
                        e(this._element).off(Oi.CLICK_DISMISS),
                        e.removeData(this._element, Ai),
                        (this._element = null),
                        (this._config = null);
                }),
                (Ei._getConfig = function (t) {
                    return (t = s({}, Hi, e(this._element).data(), "object" == typeof t && t ? t : {})), r.typeCheckConfig(Ii, t, this.constructor.DefaultType), t;
                }),
                (Ei._setListeners = function () {
                    var t = this;
                    e(this._element).on(Oi.CLICK_DISMISS, '[data-dismiss="toast"]', function () {
                        return t.hide(!0);
                    });
                }),
                (Ei._close = function () {
                    function t() {
                        i._element.classList.add("hide"), e(i._element).trigger(Oi.HIDDEN);
                    }
                    var i = this;
                    if ((this._element.classList.remove(Mi), this._config.animation)) {
                        var n = r.getTransitionDurationFromElement(this._element);
                        e(this._element).one(r.TRANSITION_END, t).emulateTransitionEnd(n);
                    } else t();
                }),
                (Wi._jQueryInterface = function (t) {
                    return this.each(function () {
                        var i = e(this),
                            n = i.data(Ai);
                        if ((n || ((n = new Wi(this, "object" == typeof t && t)), i.data(Ai, n)), "string" == typeof t)) {
                            if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"');
                            n[t](this);
                        }
                    });
                }),
                n(Wi, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "4.3.1";
                        },
                    },
                    {
                        key: "DefaultType",
                        get: function () {
                            return $i;
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return Hi;
                        },
                    },
                ]),
                Wi);
        function Wi(t, e) {
            (this._element = t), (this._config = this._getConfig(e)), (this._timeout = null), this._setListeners();
        }
        (e.fn[Ii] = Li._jQueryInterface),
            (e.fn[Ii].Constructor = Li),
            (e.fn[Ii].noConflict = function () {
                return (e.fn[Ii] = Ni), Li._jQueryInterface;
            }),
            (function () {
                if (void 0 === e) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
                var t = e.fn.jquery.split(" ")[0].split(".");
                if ((t[0] < 2 && t[1] < 9) || (1 === t[0] && 9 === t[1] && t[2] < 1) || 4 <= t[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
            })(),
            (t.Util = r),
            (t.Alert = p),
            (t.Button = k),
            (t.Carousel = R),
            (t.Collapse = tt),
            (t.Dropdown = ce),
            (t.Modal = Te),
            (t.Popover = si),
            (t.Scrollspy = vi),
            (t.Tab = Di),
            (t.Toast = Li),
            (t.Tooltip = Ke),
            Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (function (e) {
        e.fn.extend({
            slimScroll: function (i) {
                var n = e.extend(
                    {
                        width: "auto",
                        height: "250px",
                        size: "7px",
                        color: "#000",
                        position: "right",
                        distance: "1px",
                        start: "top",
                        opacity: 0.4,
                        alwaysVisible: !1,
                        disableFadeOut: !1,
                        railVisible: !1,
                        railColor: "#333",
                        railOpacity: 0.2,
                        railDraggable: !0,
                        railClass: "slimScrollRail",
                        barClass: "slimScrollBar",
                        wrapperClass: "slimScrollDiv",
                        allowPageScroll: !1,
                        wheelStep: 20,
                        touchScrollStep: 200,
                        borderRadius: "7px",
                        railBorderRadius: "7px",
                    },
                    i
                );
                return (
                    this.each(function () {
                        function s(t) {
                            if (h) {
                                var i = 0;
                                (t = t || window.event).wheelDelta && (i = -t.wheelDelta / 120),
                                    t.detail && (i = t.detail / 3),
                                    e(t.target || t.srcTarget || t.srcElement)
                                        .closest("." + n.wrapperClass)
                                        .is(_.parent()) && o(i, !0),
                                    t.preventDefault && !v && t.preventDefault(),
                                    v || (t.returnValue = !1);
                            }
                        }
                        function o(t, e, i) {
                            v = !1;
                            var s = _.outerHeight() - y.outerHeight();
                            e && ((e = parseInt(y.css("top")) + ((t * parseInt(n.wheelStep)) / 100) * y.outerHeight()), (e = Math.min(Math.max(e, 0), s)), (e = 0 < t ? Math.ceil(e) : Math.floor(e)), y.css({ top: e + "px" })),
                                (e = (g = parseInt(y.css("top")) / (_.outerHeight() - y.outerHeight())) * (_[0].scrollHeight - _.outerHeight())),
                                i && ((t = ((e = t) / _[0].scrollHeight) * _.outerHeight()), (t = Math.min(Math.max(t, 0), s)), y.css({ top: t + "px" })),
                                _.scrollTop(e),
                                _.trigger("slimscrolling", ~~e),
                                a(),
                                l();
                        }
                        function r() {
                            (f = Math.max((_.outerHeight() / _[0].scrollHeight) * _.outerHeight(), 30)), y.css({ height: f + "px" });
                            var t = f == _.outerHeight() ? "none" : "block";
                            y.css({ display: t });
                        }
                        function a() {
                            r(),
                                clearTimeout(d),
                                g == ~~g ? ((v = n.allowPageScroll), m != g && _.trigger("slimscroll", 0 == ~~g ? "top" : "bottom")) : (v = !1),
                                (m = g),
                                f >= _.outerHeight() ? (v = !0) : (y.stop(!0, !0).fadeIn("fast"), n.railVisible && w.stop(!0, !0).fadeIn("fast"));
                        }
                        function l() {
                            n.alwaysVisible ||
                                (d = setTimeout(function () {
                                    (n.disableFadeOut && h) || c || u || (y.fadeOut("slow"), w.fadeOut("slow"));
                                }, 1e3));
                        }
                        var h,
                            c,
                            u,
                            d,
                            p,
                            f,
                            g,
                            m,
                            v = !1,
                            _ = e(this);
                        if (_.parent().hasClass(n.wrapperClass)) {
                            var b = _.scrollTop(),
                                y = _.siblings("." + n.barClass),
                                w = _.siblings("." + n.railClass);
                            if ((r(), e.isPlainObject(i))) {
                                if ("height" in i && "auto" == i.height) {
                                    _.parent().css("height", "auto"), _.css("height", "auto");
                                    var C = _.parent().parent().height();
                                    _.parent().css("height", C), _.css("height", C);
                                } else "height" in i && ((C = i.height), _.parent().css("height", C), _.css("height", C));
                                if ("scrollTo" in i) b = parseInt(n.scrollTo);
                                else if ("scrollBy" in i) b += parseInt(n.scrollBy);
                                else if ("destroy" in i) return y.remove(), w.remove(), void _.unwrap();
                                o(b, !1, !0);
                            }
                        } else
                            (e.isPlainObject(i) && "destroy" in i) ||
                                ((n.height = "auto" == n.height ? _.parent().height() : n.height),
                                (b = e("<div></div>").addClass(n.wrapperClass).css({ position: "relative", overflow: "hidden", width: n.width, height: n.height })),
                                _.css({ overflow: "hidden", width: n.width, height: n.height }),
                                (w = e("<div></div>")
                                    .addClass(n.railClass)
                                    .css({
                                        width: n.size,
                                        height: "100%",
                                        position: "absolute",
                                        top: 0,
                                        display: n.alwaysVisible && n.railVisible ? "block" : "none",
                                        "border-radius": n.railBorderRadius,
                                        background: n.railColor,
                                        opacity: n.railOpacity,
                                        zIndex: 90,
                                    })),
                                (y = e("<div></div>")
                                    .addClass(n.barClass)
                                    .css({
                                        background: n.color,
                                        width: n.size,
                                        position: "absolute",
                                        top: 0,
                                        opacity: n.opacity,
                                        display: n.alwaysVisible ? "block" : "none",
                                        "border-radius": n.borderRadius,
                                        BorderRadius: n.borderRadius,
                                        MozBorderRadius: n.borderRadius,
                                        WebkitBorderRadius: n.borderRadius,
                                        zIndex: 99,
                                    })),
                                (C = "right" == n.position ? { right: n.distance } : { left: n.distance }),
                                w.css(C),
                                y.css(C),
                                _.wrap(b),
                                _.parent().append(y),
                                _.parent().append(w),
                                n.railDraggable &&
                                    y
                                        .bind("mousedown", function (i) {
                                            var n = e(document);
                                            return (
                                                (u = !0),
                                                (t = parseFloat(y.css("top"))),
                                                (pageY = i.pageY),
                                                n.bind("mousemove.slimscroll", function (e) {
                                                    (currTop = t + e.pageY - pageY), y.css("top", currTop), o(0, y.position().top, !1);
                                                }),
                                                n.bind("mouseup.slimscroll", function (t) {
                                                    (u = !1), l(), n.unbind(".slimscroll");
                                                }),
                                                !1
                                            );
                                        })
                                        .bind("selectstart.slimscroll", function (t) {
                                            return t.stopPropagation(), t.preventDefault(), !1;
                                        }),
                                w.hover(
                                    function () {
                                        a();
                                    },
                                    function () {
                                        l();
                                    }
                                ),
                                y.hover(
                                    function () {
                                        c = !0;
                                    },
                                    function () {
                                        c = !1;
                                    }
                                ),
                                _.hover(
                                    function () {
                                        (h = !0), a(), l();
                                    },
                                    function () {
                                        (h = !1), l();
                                    }
                                ),
                                _.bind("touchstart", function (t, e) {
                                    t.originalEvent.touches.length && (p = t.originalEvent.touches[0].pageY);
                                }),
                                _.bind("touchmove", function (t) {
                                    v || t.originalEvent.preventDefault(), t.originalEvent.touches.length && (o((p - t.originalEvent.touches[0].pageY) / n.touchScrollStep, !0), (p = t.originalEvent.touches[0].pageY));
                                }),
                                r(),
                                "bottom" === n.start ? (y.css({ top: _.outerHeight() - y.outerHeight() }), o(0, !0)) : "top" !== n.start && (o(e(n.start).position().top, null, !0), n.alwaysVisible || y.hide()),
                                window.addEventListener ? (this.addEventListener("DOMMouseScroll", s, !1), this.addEventListener("mousewheel", s, !1)) : document.attachEvent("onmousewheel", s));
                    }),
                    this
                );
            },
        }),
            e.fn.extend({ slimscroll: e.fn.slimScroll });
    })(jQuery),
    (function (t) {
        var e = !1;
        if (("function" == typeof define && define.amd && (define(t), (e = !0)), "object" == typeof exports && ((module.exports = t()), (e = !0)), !e)) {
            var i = window.Cookies,
                n = (window.Cookies = t());
            n.noConflict = function () {
                return (window.Cookies = i), n;
            };
        }
    })(function () {
        function t() {
            for (var t = 0, e = {}; t < arguments.length; t++) {
                var i = arguments[t];
                for (var n in i) e[n] = i[n];
            }
            return e;
        }
        return (function e(i) {
            function n(e, s, o) {
                var r;
                if ("undefined" != typeof document) {
                    if (1 < arguments.length) {
                        if ("number" == typeof (o = t({ path: "/" }, n.defaults, o)).expires) {
                            var a = new Date();
                            a.setMilliseconds(a.getMilliseconds() + 864e5 * o.expires), (o.expires = a);
                        }
                        o.expires = o.expires ? o.expires.toUTCString() : "";
                        try {
                            (r = JSON.stringify(s)), /^[\{\[]/.test(r) && (s = r);
                        } catch (e) {}
                        (s = i.write ? i.write(s, e) : encodeURIComponent(String(s)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)),
                            (e = (e = (e = encodeURIComponent(String(e))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape));
                        var l = "";
                        for (var h in o) o[h] && ((l += "; " + h), !0 !== o[h] && (l += "=" + o[h]));
                        return (document.cookie = e + "=" + s + l);
                    }
                    e || (r = {});
                    for (var c = document.cookie ? document.cookie.split("; ") : [], u = /(%[0-9A-Z]{2})+/g, d = 0; d < c.length; d++) {
                        var p = c[d].split("="),
                            f = p.slice(1).join("=");
                        this.json || '"' !== f.charAt(0) || (f = f.slice(1, -1));
                        try {
                            var g = p[0].replace(u, decodeURIComponent);
                            if (((f = i.read ? i.read(f, g) : i(f, g) || f.replace(u, decodeURIComponent)), this.json))
                                try {
                                    f = JSON.parse(f);
                                } catch (e) {}
                            if (e === g) {
                                r = f;
                                break;
                            }
                            e || (r[g] = f);
                        } catch (e) {}
                    }
                    return r;
                }
            }
            return (
                ((n.set = n).get = function (t) {
                    return n.call(n, t);
                }),
                (n.getJSON = function () {
                    return n.apply({ json: !0 }, [].slice.call(arguments));
                }),
                (n.defaults = {}),
                (n.remove = function (e, i) {
                    n(e, "", t(i, { expires: -1 }));
                }),
                (n.withConverter = e),
                n
            );
        })(function () {});
    }));
var floatSubMenuTimeout,
    targetFloatMenu,
    handleSlimScroll = function () {
        "use strict";
        $.when(
            $("[data-scrollbar=true]").each(function () {
                generateSlimScroll($(this));
            })
        ).done(function () {
            $('[data-scrollbar="true"]').mouseover();
        });
    },
    generateSlimScroll = function (t) {
        if (!$(t).attr("data-init")) {
            var e = $(t).attr("data-height"),
                i = { height: (e = e || $(t).height()) };
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? ($(t).css("height", e), $(t).css("overflow-x", "scroll")) : $(t).slimScroll(i), $(t).attr("data-init", !0), $(".slimScrollBar").hide();
        }
    },
    handleSidebarMenu = function () {
        "use strict";
        var t = $(".sidebar").attr("data-disable-slide-animation") ? 0 : 250;
        $(document).on("click", ".sidebar .nav > .has-sub > a", function () {
            var e = $(this).next(".sub-menu"),
                i = $(".sidebar .nav > li.has-sub > .sub-menu").not(e);
            0 === $(".page-sidebar-minified").length &&
                ($(i).closest("li").addClass("closing"),
                $(i).slideUp(t, function () {
                    $(i).closest("li").addClass("closed").removeClass("expand closing");
                }),
                $(e).is(":visible") ? $(e).closest("li").addClass("closing").removeClass("expand") : $(e).closest("li").addClass("expanding").removeClass("closed"),
                $(e).slideToggle(t, function () {
                    var t = $(this).closest("li");
                    $(e).is(":visible") ? ($(t).addClass("expand"), $(t).removeClass("closed")) : ($(t).addClass("closed"), $(t).removeClass("expand")), $(t).removeClass("expanding closing");
                }));
        }),
            $(document).on("click", ".sidebar .nav > .has-sub .sub-menu li.has-sub > a", function () {
                if (0 === $(".page-sidebar-minified").length) {
                    var e = $(this).next(".sub-menu");
                    $(e).is(":visible") ? $(e).closest("li").addClass("closing").removeClass("expand") : $(e).closest("li").addClass("expanding").removeClass("closed"),
                        $(e).slideToggle(t, function () {
                            var t = $(this).closest("li");
                            $(e).is(":visible") ? ($(t).addClass("expand"), $(t).removeClass("closed")) : ($(t).addClass("closed"), $(t).removeClass("expand")), $(t).removeClass("expanding closing");
                        });
                }
            });
    },
    handleMobileSidebarToggle = function () {
        var t = !1;
        $(document).on("click touchstart", ".sidebar", function (e) {
            0 !== $(e.target).closest(".sidebar").length ? (t = !0) : ((t = !1), e.stopPropagation());
        }),
            $(document).on("click touchstart", function (e) {
                0 === $(e.target).closest(".sidebar").length && (t = !1),
                    0 !== $(e.target).closest("#float-sub-menu").length && (t = !0),
                    e.isPropagationStopped() ||
                        !0 === t ||
                        ($("#page-container").hasClass("page-sidebar-toggled") && ((t = !0), $("#page-container").removeClass("page-sidebar-toggled")),
                        $(window).width() <= 767 && $("#page-container").hasClass("page-right-sidebar-toggled") && ((t = !0), $("#page-container").removeClass("page-right-sidebar-toggled")));
            }),
            $(document).on("click", "[data-click=right-sidebar-toggled]", function (e) {
                e.stopPropagation();
                var i = "#page-container",
                    n = "page-right-sidebar-collapsed";
                (n = $(window).width() < 768 ? "page-right-sidebar-toggled" : n),
                    $(i).hasClass(n) ? $(i).removeClass(n) : !0 !== t ? $(i).addClass(n) : (t = !1),
                    $(window).width() < 480 && $("#page-container").removeClass("page-sidebar-toggled"),
                    $(window).trigger("resize");
            }),
            $(document).on("click", "[data-click=sidebar-toggled]", function (e) {
                e.stopPropagation();
                var i = "page-sidebar-toggled",
                    n = "#page-container";
                $(n).hasClass(i) ? $(n).removeClass(i) : !0 !== t ? $(n).addClass(i) : (t = !1), $(window).width() < 480 && $("#page-container").removeClass("page-right-sidebar-toggled");
            });
    },
    handleSidebarMinify = function () {
        $(document).on("click", '[data-click="sidebar-minify"]', function (t) {
            t.preventDefault();
            var e = "page-sidebar-minified",
                i = "#page-container",
                n = !1;
            $(i).hasClass(e)
                ? $(i).removeClass(e)
                : ($(i).addClass(e),
                  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&
                      ($('#sidebar [data-scrollbar="true"]').css("margin-top", "0"), $('#sidebar [data-scrollbar="true"]').css("overflow-x", "scroll")),
                  (n = !0)),
                $(window).trigger("resize"),
                Cookies && Cookies.set("sidebar-minified", n);
        }),
            !Cookies || ("true" == Cookies.get("sidebar-minified") && $("#page-container").addClass("page-sidebar-minified"));
    },
    handlePageContentView = function () {
        "use strict";
        var t = "",
            e = "",
            i = handleCheckBootstrapVersion();
        3 <= i && i < 4 ? ((t = "hide"), (e = "in")) : 4 <= i && i < 5 && ((t = "d-none"), (e = "show")),
            $(window).on("load", function () {
                $.when($("#page-loader").addClass(t)).done(function () {
                    $("#page-container").addClass(e);
                });
            });
    },
    panelActionRunning = !1,
    handlePanelAction = function () {
        "use strict";
        if (panelActionRunning) return !1;
        (panelActionRunning = !0),
            $(document).on("hover", "[data-click=panel-remove]", function (t) {
                $(this).attr("data-init") || ($(this).tooltip({ title: "Remove", placement: "bottom", trigger: "hover", container: "body" }), $(this).tooltip("show"), $(this).attr("data-init", !0));
            }),
            $(document).on("click", "[data-click=panel-remove]", function (t) {
                t.preventDefault();
                var e = handleCheckBootstrapVersion();
                4 <= e && e < 5 ? $(this).tooltip("dispose") : $(this).tooltip("destroy"), $(this).closest(".panel").remove();
            }),
            $(document).on("hover", "[data-click=panel-collapse]", function (t) {
                $(this).attr("data-init") || ($(this).tooltip({ title: "Collapse / Expand", placement: "bottom", trigger: "hover", container: "body" }), $(this).tooltip("show"), $(this).attr("data-init", !0));
            }),
            $(document).on("click", "[data-click=panel-collapse]", function (t) {
                t.preventDefault(), $(this).closest(".panel").find(".panel-body").slideToggle();
            }),
            $(document).on("hover", "[data-click=panel-reload]", function (t) {
                $(this).attr("data-init") || ($(this).tooltip({ title: "Reload", placement: "bottom", trigger: "hover", container: "body" }), $(this).tooltip("show"), $(this).attr("data-init", !0));
            }),
            $(document).on("click", "[data-click=panel-reload]", function (t) {
                t.preventDefault();
                var e = $(this).closest(".panel");
                if (!$(e).hasClass("panel-loading")) {
                    var i = $(e).find(".panel-body");
                    $(e).addClass("panel-loading"),
                        $(i).prepend('<div class="panel-loader"><span class="spinner-small"></span></div>'),
                        setTimeout(function () {
                            $(e).removeClass("panel-loading"), $(e).find(".panel-loader").remove();
                        }, 2e3);
                }
            }),
            $(document).on("hover", "[data-click=panel-expand]", function (t) {
                $(this).attr("data-init") || ($(this).tooltip({ title: "Expand / Compress", placement: "bottom", trigger: "hover", container: "body" }), $(this).tooltip("show"), $(this).attr("data-init", !0));
            }),
            $(document).on("click", "[data-click=panel-expand]", function (t) {
                t.preventDefault();
                var e = $(this).closest(".panel"),
                    i = $(e).find(".panel-body"),
                    n = 40;
                if (0 !== $(i).length) {
                    var s = $(e).offset().top;
                    n = $(i).offset().top - s;
                }
                if ($("body").hasClass("panel-expand") && $(e).hasClass("panel-expand")) $("body, .panel").removeClass("panel-expand"), $(".panel").removeAttr("style"), $(i).removeAttr("style");
                else if (($("body").addClass("panel-expand"), $(this).closest(".panel").addClass("panel-expand"), 0 !== $(i).length && 40 != n)) {
                    var o = 40;
                    $(e)
                        .find(" > *")
                        .each(function () {
                            var t = $(this).attr("class");
                            "panel-heading" != t && "panel-body" != t && (o += $(this).height() + 30);
                        }),
                        40 != o && $(i).css("top", o + "px");
                }
                $(window).trigger("resize");
            });
    },
    handleDraggablePanel = function () {
        "use strict";
        var t = $('.panel:not([data-sortable="false"])').parent("[class*=col]");
        $(t).sortable({
            handle: ".panel-heading",
            connectWith: ".row > [class*=col]",
            stop: function (t, e) {
                e.item.find(".panel-title").append('<i class="fa fa-refresh fa-spin m-l-5" data-id="title-spinner"></i>'), handleSavePanelPosition(e.item);
            },
        });
    },
    handelTooltipPopoverActivation = function () {
        "use strict";
        0 !== $('[data-toggle="tooltip"]').length && $("[data-toggle=tooltip]").tooltip(), 0 !== $('[data-toggle="popover"]').length && $("[data-toggle=popover]").popover();
    },
    handleScrollToTopButton = function () {
        "use strict";
        var t = handleCheckBootstrapVersion(),
            e = "";
        3 <= t && t < 4 ? (e = "in") : 4 <= t && t < 5 && (e = "show"),
            $(document).scroll(function () {
                200 <= $(document).scrollTop() ? $("[data-click=scroll-top]").addClass(e) : $("[data-click=scroll-top]").removeClass(e);
            }),
            $("[data-click=scroll-top]").click(function (t) {
                t.preventDefault(), $("html, body").animate({ scrollTop: $("body").offset().top }, 500);
            });
    },
    handleThemePageStructureControl = function () {
        if (
            ($(document).on("click", '.theme-panel [data-click="theme-selector"]', function () {
                var t = $(this).attr("data-theme-file"),
                    e = $(this).attr("data-theme");
                0 === $("#theme-css-link").length ? $("head").append('<link href="' + t + '" rel="stylesheet" id="theme-css-link" />') : $("#theme-css-link").attr("href", t),
                    $('.theme-panel [data-click="theme-selector"]').not(this).closest("li").removeClass("active"),
                    $(this).closest("li").addClass("active"),
                    Cookies && Cookies.set("page-theme", e);
            }),
            $(document).on("change", '.theme-panel [name="header-inverse"]', function () {
                var t = $(this).is(":checked"),
                    e = t ? "navbar-inverse" : "navbar-default",
                    i = t ? "navbar-default" : "navbar-inverse";
                $("#header").removeClass(i).addClass(e), Cookies && Cookies.set("header-theme", e);
            }),
            $(document).on("change", '.theme-panel [name="sidebar-grid"]', function () {
                var t = !1;
                $(this).is(":checked") ? ($("#sidebar").addClass("sidebar-grid"), (t = !0)) : $("#sidebar").removeClass("sidebar-grid"), Cookies && Cookies.set("sidebar-grid", t);
            }),
            $(document).on("change", '.theme-panel [name="sidebar-gradient"]', function () {
                var t = !1;
                $(this).is(":checked") ? ($("#page-container").addClass("gradient-enabled"), (t = !0)) : $("#page-container").removeClass("gradient-enabled"), Cookies && Cookies.set("sidebar-gradient", t);
            }),
            $(document).on("change", '.theme-panel [name="sidebar-fixed"]', function () {
                var t = !1;
                $(this).is(":checked")
                    ? ($('.theme-panel [name="header-fixed"]').is(":checked") ||
                          (alert("Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar."),
                          $('.theme-panel [name="header-fixed"]').prop("checked", !0),
                          $("#page-container").addClass("page-header-fixed")),
                      $("#page-container").addClass("page-sidebar-fixed"),
                      $("#page-container").hasClass("page-sidebar-minified") || generateSlimScroll($('.sidebar [data-scrollbar="true"]')),
                      (t = !0))
                    : ($("#page-container").removeClass("page-sidebar-fixed"),
                      0 !== $(".sidebar .slimScrollDiv").length &&
                          ($(window).width() <= 979
                              ? $(".sidebar").each(function () {
                                    if (!$("#page-container").hasClass("page-with-two-sidebar") || !$(this).hasClass("sidebar-right")) {
                                        $(this).find(".slimScrollBar").remove(), $(this).find(".slimScrollRail").remove(), $(this).find('[data-scrollbar="true"]').removeAttr("style");
                                        var t = $(this).find('[data-scrollbar="true"]').parent(),
                                            e = $(t).html();
                                        $(t).replaceWith(e);
                                    }
                                })
                              : 979 < $(window).width() &&
                                ($('.sidebar [data-scrollbar="true"]').slimScroll({ destroy: !0 }), $('.sidebar [data-scrollbar="true"]').removeAttr("style"), $('.sidebar [data-scrollbar="true"]').removeAttr("data-init"))),
                      0 === $("#page-container .sidebar-bg").length && $("#page-container").append('<div class="sidebar-bg"></div>')),
                    Cookies && Cookies.set("sidebar-fixed", t);
            }),
            $(document).on("change", '.theme-panel [name="header-fixed"]', function () {
                var t = !1;
                $(this).is(":checked")
                    ? ($("#header").addClass("navbar-fixed-top"), $("#page-container").addClass("page-header-fixed"), (t = !0))
                    : ($('.theme-panel [name="sidebar-fixed"]').is(":checked") &&
                          (alert("Default Header with Fixed Sidebar option is not supported. Proceed with Default Header with Default Sidebar."),
                          $('.theme-panel [name="sidebar-fixed"]').prop("checked", !1),
                          $('.theme-panel [name="sidebar-fixed"]').trigger("change"),
                          0 === $("#page-container .sidebar-bg").length && $("#page-container").append('<div class="sidebar-bg"></div>')),
                      $("#header").removeClass("navbar-fixed-top"),
                      $("#page-container").removeClass("page-header-fixed")),
                    Cookies && Cookies.set("header-fixed", t);
            }),
            Cookies)
        ) {
            var t = Cookies.get("page-theme"),
                e = Cookies.get("header-theme"),
                i = Cookies.get("sidebar-grid"),
                n = Cookies.get("sidebar-gradient"),
                s = Cookies.get("sidebar-fixed"),
                o = Cookies.get("header-fixed");
            t && $('.theme-panel [data-click="theme-selector"][data-theme="' + t + '"]').trigger("click"),
                e && "navbar-inverse" == e && $('.theme-panel [name="header-inverse"]').prop("checked", !0).trigger("change"),
                "true" == i && $('.theme-panel [name="sidebar-grid"]').prop("checked", !0).trigger("change"),
                "true" == n && $('.theme-panel [name="sidebar-gradient"]').prop("checked", !0).trigger("change"),
                "false" == s && $('.theme-panel [name="sidebar-fixed"]').prop("checked", !1).trigger("change"),
                "false" == o && $('.theme-panel [name="header-fixed"]').prop("checked", !1).trigger("change");
        }
    },
    handleThemePanelExpand = function () {
        $(document).on("click", '[data-click="theme-panel-expand"]', function () {
            var t = ".theme-panel",
                e = "active",
                i = !1;
            $(t).hasClass(e) ? $(t).removeClass(e) : ($(t).addClass(e), (i = !0)), Cookies && Cookies.set("theme-panel-expand", i);
        }),
            !Cookies || ("true" == Cookies.get("theme-panel-expand") && $('[data-click="theme-panel-expand"]').trigger("click"));
    },
    handleAfterPageLoadAddClass = function () {
        0 !== $("[data-pageload-addclass]").length &&
            $(window).on("load", function () {
                $("[data-pageload-addclass]").each(function () {
                    var t = $(this).attr("data-pageload-addclass");
                    $(this).addClass(t);
                });
            });
    },
    handleSavePanelPosition = function (t) {
        "use strict";
        if (0 !== $(".ui-sortable").length) {
            var e = [];
            $.when(
                $(".ui-sortable").each(function () {
                    var t = $(this).find("[data-sortable-id]");
                    if (0 !== t.length) {
                        var i = [];
                        $(t).each(function () {
                            var t = $(this).attr("data-sortable-id");
                            i.push({ id: t });
                        }),
                            e.push(i);
                    } else e.push([]);
                })
            ).done(function () {
                var i = window.location.href;
                (i = (i = i.split("?"))[0]),
                    localStorage.setItem(i, JSON.stringify(e)),
                    $(t)
                        .find('[data-id="title-spinner"]')
                        .delay(500)
                        .fadeOut(500, function () {
                            $(this).remove();
                        });
            });
        }
    },
    handleLocalStorage = function () {
        "use strict";
        try {
            if ("undefined" != typeof Storage && "undefined" != typeof localStorage) {
                var t = window.location.href;
                t = (t = t.split("?"))[0];
                var e = localStorage.getItem(t);
                if (e) {
                    e = JSON.parse(e);
                    var i = 0;
                    $.when(
                        $('.panel:not([data-sortable="false"])')
                            .parent('[class*="col-"]')
                            .each(function () {
                                var t = e[i],
                                    n = $(this);
                                t &&
                                    $.each(t, function (t, e) {
                                        var i = $('[data-sortable-id="' + e.id + '"]').not('[data-init="true"]');
                                        if (0 !== $(i).length) {
                                            var s = $(i).clone();
                                            $(i).remove(), $(n).append(s), $('[data-sortable-id="' + e.id + '"]').attr("data-init", "true");
                                        }
                                    }),
                                    i++;
                            })
                    ).done(function () {
                        window.dispatchEvent(new CustomEvent("localstorage-position-loaded"));
                    });
                }
            } else alert("Your browser is not supported with the local storage");
        } catch (t) {
            console.log(t);
        }
    },
    handleResetLocalStorage = function () {
        "use strict";
        $(document).on("click", "[data-click=reset-local-storage]", function (t) {
            t.preventDefault(),
                $("body").append(
                    '<div class="modal fade" data-modal-id="reset-local-storage-confirmation">    <div class="modal-dialog">        <div class="modal-content">            <div class="modal-header">                <h4 class="modal-title"><i class="fa fa-redo m-r-5"></i> Reset Local Storage Confirmation</h4>                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>            </div>            <div class="modal-body">                <div class="alert alert-info m-b-0">Would you like to RESET all your saved widgets and clear Local Storage?</div>            </div>            <div class="modal-footer">                <a href="javascript:;" class="btn btn-sm btn-default" data-dismiss="modal"><i class="fa fa-times"></i> No</a>                <a href="javascript:;" class="btn btn-sm btn-inverse" data-click="confirm-reset-local-storage"><i class="fa fa-check"></i> Yes</a>            </div>        </div>    </div></div>'
                ),
                $('[data-modal-id="reset-local-storage-confirmation"]').modal("show");
        }),
            $(document).on("hidden.bs.modal", '[data-modal-id="reset-local-storage-confirmation"]', function (t) {
                $('[data-modal-id="reset-local-storage-confirmation"]').remove();
            }),
            $(document).on("click", "[data-click=confirm-reset-local-storage]", function (t) {
                t.preventDefault();
                var e = window.location.href;
                (e = (e = e.split("?"))[0]), localStorage.removeItem(e), location.reload();
            });
    },
    handleIEFullHeightContent = function () {
        0 < window.navigator.userAgent.indexOf("MSIE ") &&
            $('.vertical-box-row [data-scrollbar="true"][data-height="100%"]').each(function () {
                var t = $(this).closest(".vertical-box-row"),
                    e = $(t).height();
                $(t).find(".vertical-box-cell").height(e);
            });
    },
    handleUnlimitedTabsRender = function () {
        function t(t, e) {
            var i = $(t).closest(".tab-overflow"),
                n = "rtl" == $("body").css("direction") ? "margin-right" : "margin-left",
                s = parseInt($(i).find(".nav.nav-tabs").css(n)),
                o = $(i).width(),
                r = 0,
                a = 0;
            switch (
                ($(i)
                    .find("li")
                    .each(function () {
                        $(this).hasClass("next-button") || $(this).hasClass("prev-button") || (r += $(this).width());
                    }),
                e)
            ) {
                case "next":
                    (l = r + s - o) <= o
                        ? ((a = l - s),
                          setTimeout(function () {
                              $(i).removeClass("overflow-right");
                          }, 150))
                        : (a = o - s - 80),
                        0 !== a &&
                            ("rtl" != $("body").css("direction")
                                ? $(i)
                                      .find(".nav.nav-tabs")
                                      .animate({ marginLeft: "-" + a + "px" }, 150, function () {
                                          $(i).addClass("overflow-left");
                                      })
                                : $(i)
                                      .find(".nav.nav-tabs")
                                      .animate({ marginRight: "-" + a + "px" }, 150, function () {
                                          $(i).addClass("overflow-left");
                                      }));
                    break;
                case "prev":
                    var l;
                    (a = (l = -s) <= o ? ($(i).removeClass("overflow-left"), 0) : l - o + 80),
                        "rtl" != $("body").css("direction")
                            ? $(i)
                                  .find(".nav.nav-tabs")
                                  .animate({ marginLeft: "-" + a + "px" }, 150, function () {
                                      $(i).addClass("overflow-right");
                                  })
                            : $(i)
                                  .find(".nav.nav-tabs")
                                  .animate({ marginRight: "-" + a + "px" }, 150, function () {
                                      $(i).addClass("overflow-right");
                                  });
            }
        }
        function e() {
            $(".tab-overflow").each(function () {
                !(function (t, e) {
                    var i = "li.active";
                    $(t).find("li").first().hasClass("nav-item") && (i = $(t).find(".nav-item .active").closest("li"));
                    var n = "rtl" == $("body").css("direction") ? "margin-right" : "margin-left",
                        s = (parseInt($(t).css(n)), $(t).width()),
                        o = $(t).find(i).width(),
                        r = 0;
                    if (
                        ($(t)
                            .find(i)
                            .prevAll()
                            .each(function () {
                                o += $(this).width();
                            }),
                        $(t)
                            .find("li")
                            .each(function () {
                                r += $(this).width();
                            }),
                        s <= o)
                    ) {
                        var a = o - s;
                        r != o && (a += 40),
                            "rtl" == $("body").css("direction")
                                ? $(t)
                                      .find(".nav.nav-tabs")
                                      .animate({ marginRight: "-" + a + "px" }, 0)
                                : $(t)
                                      .find(".nav.nav-tabs")
                                      .animate({ marginLeft: "-" + a + "px" }, 0);
                    }
                    o != r && s <= r ? $(t).addClass("overflow-right") : $(t).removeClass("overflow-right"), s <= o && s <= r ? $(t).addClass("overflow-left") : $(t).removeClass("overflow-left");
                })(this);
            });
        }
        $('[data-click="next-tab"]').click(function (e) {
            e.preventDefault(), t(this, "next");
        }),
            $('[data-click="prev-tab"]').click(function (e) {
                e.preventDefault(), t(this, "prev");
            }),
            $(window).resize(function () {
                $(".tab-overflow .nav.nav-tabs").removeAttr("style"), e();
            }),
            e();
    },
    handleUnlimitedTopMenuRender = function () {
        "use strict";
        function t(t, e) {
            var i = $(t).closest(".nav"),
                n = "rtl" == $("body").css("direction") ? "margin-right" : "margin-left",
                s = parseInt($(i).css(n)),
                o = $(".top-menu").width() - 88,
                r = 0,
                a = 0;
            switch (
                ($(i)
                    .find("li")
                    .each(function () {
                        $(this).hasClass("menu-control") || (r += $(this).width());
                    }),
                e)
            ) {
                case "next":
                    (l = r + s - o) <= o
                        ? ((a = l - s + 128),
                          setTimeout(function () {
                              $(i).find(".menu-control.menu-control-right").removeClass("show");
                          }, 150))
                        : (a = o - s - 128),
                        0 !== a &&
                            ("rtl" != $("body").css("direction")
                                ? $(i).animate({ marginLeft: "-" + a + "px" }, 150, function () {
                                      $(i).find(".menu-control.menu-control-left").addClass("show");
                                  })
                                : $(i).animate({ marginRight: "-" + a + "px" }, 150, function () {
                                      $(i).find(".menu-control.menu-control-left").addClass("show");
                                  }));
                    break;
                case "prev":
                    var l;
                    (a = (l = -s) <= o ? ($(i).find(".menu-control.menu-control-left").removeClass("show"), 0) : l - o + 88),
                        "rtl" != $("body").css("direction")
                            ? $(i).animate({ marginLeft: "-" + a + "px" }, 150, function () {
                                  $(i).find(".menu-control.menu-control-right").addClass("show");
                              })
                            : $(i).animate({ marginRight: "-" + a + "px" }, 150, function () {
                                  $(i).find(".menu-control.menu-control-right").addClass("show");
                              });
            }
        }
        function e() {
            var t = $(".top-menu .nav"),
                e = $(".top-menu .nav > li"),
                i = $(".top-menu .nav > li.active"),
                n = $(".top-menu"),
                s = "rtl" == $("body").css("direction") ? "margin-right" : "margin-left",
                o = (parseInt($(t).css(s)), $(n).width() - 128),
                r = $(".top-menu .nav > li.active").width(),
                a = 0;
            if (
                ($(i)
                    .prevAll()
                    .each(function () {
                        r += $(this).width();
                    }),
                $(e).each(function () {
                    $(this).hasClass("menu-control") || (a += $(this).width());
                }),
                o <= r)
            ) {
                var l = r - o + 128;
                "rtl" != $("body").css("direction") ? $(t).animate({ marginLeft: "-" + l + "px" }, 0) : $(t).animate({ marginRight: "-" + l + "px" }, 0);
            }
            r != a && o <= a ? $(t).find(".menu-control.menu-control-right").addClass("show") : $(t).find(".menu-control.menu-control-right").removeClass("show"),
                o <= r && o <= a ? $(t).find(".menu-control.menu-control-left").addClass("show") : $(t).find(".menu-control.menu-control-left").removeClass("show");
        }
        $('[data-click="next-menu"]').click(function (e) {
            e.preventDefault(), t(this, "next");
        }),
            $('[data-click="prev-menu"]').click(function (e) {
                e.preventDefault(), t(this, "prev");
            }),
            $(window).resize(function () {
                $(".top-menu .nav").removeAttr("style"), e();
            }),
            e();
    },
    handleTopMenuSubMenu = function () {
        "use strict";
        $(document).on("click", ".top-menu .sub-menu .has-sub > a", function () {
            var t = $(this).closest("li").find(".sub-menu").first(),
                e = $(this).closest("ul").find(".sub-menu").not(t);
            $(e)
                .not(t)
                .slideUp(250, function () {
                    $(this).closest("li").removeClass("expand");
                }),
                $(t).slideToggle(250, function () {
                    var t = $(this).closest("li");
                    $(t).hasClass("expand") ? $(t).removeClass("expand") : $(t).addClass("expand");
                });
        });
    },
    handleMobileTopMenuSubMenu = function () {
        "use strict";
        $(document).on("click", ".top-menu .nav > li.has-sub > a", function () {
            if ($(window).width() <= 767) {
                var t = $(this).closest("li").find(".sub-menu").first(),
                    e = $(this).closest("ul").find(".sub-menu").not(t);
                $(e)
                    .not(t)
                    .slideUp(250, function () {
                        $(this).closest("li").removeClass("expand");
                    }),
                    $(t).slideToggle(250, function () {
                        var t = $(this).closest("li");
                        $(t).hasClass("expand") ? $(t).removeClass("expand") : $(t).addClass("expand");
                    });
            }
        });
    },
    handleTopMenuMobileToggle = function () {
        "use strict";
        $(document).on("click", '[data-click="top-menu-toggled"]', function () {
            $(".top-menu").slideToggle(250);
        });
    },
    handleClearSidebarSelection = function () {
        $(".sidebar .nav > li, .sidebar .nav .sub-menu").removeClass("expand").removeAttr("style");
    },
    handleClearSidebarMobileSelection = function () {
        $("#page-container").removeClass("page-sidebar-toggled");
    },
    handleCheckBootstrapVersion = function () {
        return parseInt($.fn.tooltip.Constructor.VERSION);
    },
    handleCheckScrollClass = function () {
        0 < $(window).scrollTop() ? $("#page-container").addClass("has-scroll") : $("#page-container").removeClass("has-scroll");
    },
    handlePageScrollClass = function () {
        $(window).on("scroll", function () {
            handleCheckScrollClass();
        }),
            handleCheckScrollClass();
    },
    handleToggleNavProfile = function () {
        var t = $(".sidebar").attr("data-disable-slide-animation") ? 0 : 250;
        $(document).on("click", '[data-toggle="nav-profile"]', function (e) {
            e.preventDefault();
            var i = $(this).closest("li"),
                n = $(".sidebar .nav.nav-profile");
            $(n).is(":visible") ? ($(i).removeClass("active"), $(n).removeClass("closing")) : ($(i).addClass("active"), $(n).addClass("expanding")),
                $(n).slideToggle(t, function () {
                    $(n).is(":visible") ? ($(n).addClass("expand"), $(n).removeClass("closed")) : ($(n).addClass("closed"), $(n).removeClass("expand")), $(n).removeClass("expanding closing");
                });
        });
    },
    handleSidebarScrollMemory = function () {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
            try {
                if ("undefined" != typeof Storage && "undefined" != typeof localStorage) {
                    $('.sidebar [data-scrollbar="true"]')
                        .slimScroll()
                        .bind("slimscrolling", function (t, e) {
                            localStorage.setItem("sidebarScrollPosition", e + "px");
                        });
                    var t = localStorage.getItem("sidebarScrollPosition");
                    t && $('.sidebar [data-scrollbar="true"]').slimScroll({ scrollTo: t });
                }
            } catch (t) {
                console.log(t);
            }
    },
    handleMouseoverFloatSubMenu = function (t) {
        clearTimeout(floatSubMenuTimeout);
    },
    handleMouseoutFloatSubMenu = function (t) {
        floatSubMenuTimeout = setTimeout(function () {
            $("#float-sub-menu").remove();
        }, 150);
    },
    handleSidebarMinifyFloatMenu = function () {
        $(document).on("click", "#float-sub-menu li.has-sub > a", function (t) {
            var e = $(this).next(".sub-menu"),
                i = $(e).closest("li"),
                n = !1,
                s = !1;
            $(e).is(":visible") ? ($(i).addClass("closing"), (n = !0)) : ($(i).addClass("expanding"), (s = !0)),
                $(e).slideToggle({
                    duration: 250,
                    progress: function () {
                        var t = $("#float-sub-menu"),
                            e = $(t).height(),
                            i = $(t).offset(),
                            o = $(t).attr("data-offset-top"),
                            r = $(t).attr("data-menu-offset-top"),
                            a = i.top - $(window).scrollTop(),
                            l = $(window).height();
                        if (
                            (n &&
                                o < a &&
                                ((a = o < a ? o : a),
                                $("#float-sub-menu").css({ top: a + "px", bottom: "auto" }),
                                $("#float-sub-menu-arrow").css({ top: "20px", bottom: "auto" }),
                                $("#float-sub-menu-line").css({ top: "20px", bottom: "auto" })),
                            s && l - a < e)
                        ) {
                            var h = l - r - 22;
                            $("#float-sub-menu").css({ top: "auto", bottom: 0 }), $("#float-sub-menu-arrow").css({ top: "auto", bottom: h + "px" }), $("#float-sub-menu-line").css({ top: "20px", bottom: h + "px" });
                        }
                    },
                    complete: function () {
                        $(e).is(":visible") ? ($(i).addClass("expand"), $(i).removeClass("closed")) : ($(i).addClass("closed"), $(i).removeClass("expand")), $(i).removeClass("closing expanding");
                    },
                });
        }),
            $(document).on(
                {
                    mouseenter: function () {
                        if ($("#page-container").hasClass("page-sidebar-minified")) {
                            clearTimeout(floatSubMenuTimeout);
                            var t = $(this).closest("li").find(".sub-menu").first();
                            if (targetFloatMenu == this && 0 !== $("#float-sub-menu").length) return;
                            targetFloatMenu = this;
                            var e = $(t).html();
                            if (e) {
                                var i = $("#sidebar").offset(),
                                    n = $("#page-container").hasClass("page-with-right-sidebar") || "rtl" == $("body").css("direction") ? $(window).width() - i.left : i.left + 60,
                                    s = ($(t).height(), $(this).offset().top - $(window).scrollTop()),
                                    o = $("#page-container").hasClass("page-with-right-sidebar") || "rtl" == $("body").css("direction") ? "auto" : n,
                                    r = $("#page-container").hasClass("page-with-right-sidebar") || "rtl" == $("body").css("direction") ? n : "auto",
                                    a = $(window).height();
                                if (
                                    (0 === $("#float-sub-menu").length
                                        ? ((e =
                                              '<div class="float-sub-menu-container" id="float-sub-menu" data-offset-top="' +
                                              s +
                                              '" data-menu-offset-top="' +
                                              s +
                                              '" onmouseover="handleMouseoverFloatSubMenu(this)" onmouseout="handleMouseoutFloatSubMenu(this)">\t<div class="float-sub-menu-arrow" id="float-sub-menu-arrow"></div>\t<div class="float-sub-menu-line" id="float-sub-menu-line"></div>\t<ul class="float-sub-menu">' +
                                              e +
                                              "</ul></div>"),
                                          $("#page-container").append(e))
                                        : ($("#float-sub-menu").attr("data-offset-top", s), $("#float-sub-menu").attr("data-menu-offset-top", s), $(".float-sub-menu").html(e)),
                                    $("#float-sub-menu").height() < a - s)
                                )
                                    $("#float-sub-menu").css({ top: s, left: o, bottom: "auto", right: r }), $("#float-sub-menu-arrow").css({ top: "20px", bottom: "auto" }), $("#float-sub-menu-line").css({ top: "20px", bottom: "auto" });
                                else {
                                    $("#float-sub-menu").css({ bottom: 0, top: "auto", left: o, right: r });
                                    var l = a - s - 21;
                                    $("#float-sub-menu-arrow").css({ top: "auto", bottom: l + "px" }), $("#float-sub-menu-line").css({ top: "20px", bottom: l + "px" });
                                }
                            } else $("#float-sub-menu").remove(), (targetFloatMenu = "");
                        }
                    },
                    mouseleave: function () {
                        $("#page-container").hasClass("page-sidebar-minified") &&
                            (floatSubMenuTimeout = setTimeout(function () {
                                $("#float-sub-menu").remove(), (targetFloatMenu = "");
                            }, 250));
                    },
                },
                ".sidebar .nav > li.has-sub > a"
            );
    },
    CLEAR_OPTION = "",
    handleAjaxMode = function (t) {
        var e = t.emptyHtml ? t.emptyHtml : '<div class="p-t-40 p-b-40 text-center f-s-20 content"><i class="fa fa-warning fa-lg text-muted m-r-5"></i> <span class="f-w-600 text-inverse">Error 404! Page not found.</span></div>',
            i = t.ajaxDefaultUrl ? t.ajaxDefaultUrl : "";
        function n(t) {
            t
                ? ($("#page-content-loader").remove(), $("body").removeClass("page-content-loading"))
                : 0 === $("#page-content-loader").length && ($("body").addClass("page-content-loading"), $("#content").append('<div id="page-content-loader"><span class="spinner"></span></div>'));
        }
        function s(i, s, o) {
            Pace.restart(),
                n(!1),
                $(
                    ".jvectormap-label, .jvector-label, .AutoFill_border ,#gritter-notice-wrapper, .ui-autocomplete, .colorpicker, .FixedHeader_Header, .FixedHeader_Cloned .lightboxOverlay, .lightbox, .introjs-hints, .nvtooltip, #float-sub-menu"
                ).remove(),
                $.fn.DataTable && $(".dataTable").DataTable().destroy(),
                $("#page-container").hasClass("page-sidebar-toggled") && $("#page-container").removeClass("page-sidebar-toggled"),
                (function (t) {
                    var e = '#sidebar [data-toggle="ajax"][href="' + t + '"]';
                    0 !== $(e).length && ($("#sidebar li").removeClass("active"), $(e).closest("li").addClass("active"), $(e).parents().addClass("active"));
                })(i),
                CLEAR_OPTION && (App.clearPageOption(CLEAR_OPTION), (CLEAR_OPTION = "")),
                o ||
                    (function (t) {
                        var e = t.replace("#", ""),
                            i = window.navigator.userAgent.indexOf("MSIE ");
                        i && 0 < i && i < 9 ? (window.location.href = e) : history.pushState("", "", "#" + e);
                    })(i);
            var r = i.replace("#", ""),
                a = t.ajaxType ? t.ajaxType : "GET",
                l = t.ajaxDataType ? t.ajaxDataType : "html";
            s && ((l = $(s).attr("data-type") ? $(s).attr("data-type") : l), (targetDataDataType = $(s).attr("data-data-type") ? $(s).attr("data-data-type") : l)),
                $.ajax({
                    url: r,
                    type: a,
                    dataType: l,
                    success: function (t) {
                        $("#content").html(t);
                    },
                    error: function (t, i, n) {
                        $("#content").html(e);
                    },
                }).done(function () {
                    n(!0), $("html, body").animate({ scrollTop: 0 }, 0), App.initComponent();
                });
        }
        "" === (i = window.location.hash ? window.location.hash : i) ? $("#content").html(e) : s(i, "", !0),
            $(window).on("hashchange", function () {
                window.location.hash && s(window.location.hash, "", !0);
            }),
            $(document).on("click", '[data-toggle="ajax"]', function (t) {
                t.preventDefault(), s($(this).attr("href"), this);
            });
    },
    handleSetPageOption = function (t) {
        t.pageContentFullHeight && $("#page-container").addClass("page-content-full-height"),
            t.pageSidebarLight && $("#page-container").addClass("page-with-light-sidebar"),
            t.pageSidebarRight && $("#page-container").addClass("page-with-right-sidebar"),
            t.pageSidebarWide && $("#page-container").addClass("page-with-wide-sidebar"),
            t.pageSidebarMinified && $("#page-container").addClass("page-sidebar-minified"),
            t.pageSidebarTransparent && $("#sidebar").addClass("sidebar-transparent"),
            t.pageContentFullWidth && $("#content").addClass("content-full-width"),
            t.pageContentInverseMode && $("#content").addClass("content-inverse-mode"),
            t.pageBoxedLayout && $("body").addClass("boxed-layout"),
            t.clearOptionOnLeave && (CLEAR_OPTION = t);
    },
    handleClearPageOption = function (t) {
        t.pageContentFullHeight && $("#page-container").removeClass("page-content-full-height"),
            t.pageSidebarLight && $("#page-container").removeClass("page-with-light-sidebar"),
            t.pageSidebarRight && $("#page-container").removeClass("page-with-right-sidebar"),
            t.pageSidebarWide && $("#page-container").removeClass("page-with-wide-sidebar"),
            t.pageSidebarMinified && $("#page-container").removeClass("page-sidebar-minified"),
            t.pageSidebarTransparent && $("#sidebar").removeClass("sidebar-transparent"),
            t.pageContentFullWidth && $("#content").removeClass("content-full-width"),
            t.pageContentInverseMode && $("#content").removeClass("content-inverse-mode"),
            t.pageBoxedLayout && $("body").removeClass("boxed-layout");
    },
    handleToggleNavbarSearch = function () {
        $('[data-toggle="navbar-search"]').click(function (t) {
            t.preventDefault(), $(".header").addClass("header-search-toggled");
        }),
            $('[data-dismiss="navbar-search"]').click(function (t) {
                t.preventDefault(), $(".header").removeClass("header-search-toggled");
            });
    },
    convertNumberWithCommas = function (t) {
        // console.log(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number));
        return t.toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    checkIsFloat = function (t) {
        return Number(t) === t && t % 1 != 0;
    },
    checkIsInt = function (t) {
        return Number(t) === t && t % 1 == 0;
    },
    countDecimals = function (t) {
        var e = t.toString().split(".");
        return e[1] ? e[1].length : 0;
    },
    handleAnimation = function () {
        $("[data-animation]").each(function () {
            var t = $(this).attr("data-animation"),
                e = $(this).attr("data-value");
            switch (t) {
                case "width":
                    $(this).css("width", e);
                    break;
                case "height":
                    $(this).css("height", e);
                    break;
                case "number":
                    for (var i = this, n = countDecimals(e), s = 1, o = n; 0 < o; ) (s *= 10), o--;
                    $({ animateNumber: 0 }).animate(
                        { animateNumber: e },
                        {
                            duration: 1e3,
                            easing: "swing",
                            step: function () {
                                var t = (Math.ceil(this.animateNumber * s) / s).toFixed(n);
                                (t = convertNumberWithCommas(t)), $(i).text(t);
                            },
                            done: function () {
                                $(i).text(convertNumberWithCommas(e));
                            },
                        }
                    );
                    break;
                case "class":
                    $(this).addClass(e);
            }
        });
    },
    App = (function () {
        "use strict";
        var t;
        return {
            init: function (e) {
                e && (t = e), this.initLocalStorage(), this.initSidebar(), this.initTopMenu(), this.initComponent(), this.initThemePanel(), this.initPageLoad(), $(window).trigger("load"), t && t.ajaxMode && this.initAjax();
            },
            settings: function (e) {
                e && (t = e);
            },
            initSidebar: function () {
                handleSidebarMenu(),
                    handleMobileSidebarToggle(),
                    handleSidebarMinify(),
                    handleSidebarMinifyFloatMenu(),
                    handleToggleNavProfile(),
                    handleToggleNavbarSearch(),
                    (t && (!t || t.disableSidebarScrollMemory)) || handleSidebarScrollMemory();
            },
            initSidebarSelection: function () {
                handleClearSidebarSelection();
            },
            initSidebarMobileSelection: function () {
                handleClearSidebarMobileSelection();
            },
            initTopMenu: function () {
                handleUnlimitedTopMenuRender(), handleTopMenuSubMenu(), handleMobileTopMenuSubMenu(), handleTopMenuMobileToggle();
            },
            initPageLoad: function () {
                handlePageContentView();
            },
            initComponent: function () {
                (t && (!t || t.disableDraggablePanel)) || handleDraggablePanel(),
                    handleIEFullHeightContent(),
                    handleSlimScroll(),
                    handleUnlimitedTabsRender(),
                    handlePanelAction(),
                    handleScrollToTopButton(),
                    handleAfterPageLoadAddClass(),
                    handlePageScrollClass(),
                    handleAnimation(),
                    767 < $(window).width() && handelTooltipPopoverActivation();
            },
            initLocalStorage: function () {
                (t && (!t || t.disableLocalStorage)) || handleLocalStorage();
            },
            initThemePanel: function () {
                handleThemePageStructureControl(), handleThemePanelExpand(), handleResetLocalStorage();
            },
            initAjax: function () {
                handleAjaxMode(t), $.ajaxSetup({ cache: !0 });
            },
            setPageTitle: function (t) {
                document.title = t;
            },
            setPageOption: function (t) {
                handleSetPageOption(t);
            },
            clearPageOption: function (t) {
                handleClearPageOption(t);
            },
            restartGlobalFunction: function () {
                this.initLocalStorage(), this.initTopMenu(), this.initComponent();
            },
            scrollTop: function () {
                $("html, body").animate({ scrollTop: $("body").offset().top }, 0);
            },
        };
    })();
$(document).ready(function () {
    App.init();
});
