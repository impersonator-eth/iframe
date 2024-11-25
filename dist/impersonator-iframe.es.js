var mr = Object.defineProperty;
var _r = (s, n, l) => n in s ? mr(s, n, { enumerable: !0, configurable: !0, writable: !0, value: l }) : s[n] = l;
var x = (s, n, l) => (_r(s, typeof n != "symbol" ? n + "" : n, l), l);
import Ye, { useState as D, useEffect as H, createContext as br, useRef as Tr, useCallback as Cr, useContext as wr } from "react";
import { providers as Me, utils as Sr } from "ethers";
var ye = { exports: {} }, q = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $e;
function Pr() {
  if ($e)
    return q;
  $e = 1;
  var s = Ye, n = Symbol.for("react.element"), l = Symbol.for("react.fragment"), c = Object.prototype.hasOwnProperty, R = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: !0, ref: !0, __self: !0, __source: !0 };
  function S(E, g, C) {
    var m, b = {}, A = null, L = null;
    C !== void 0 && (A = "" + C), g.key !== void 0 && (A = "" + g.key), g.ref !== void 0 && (L = g.ref);
    for (m in g)
      c.call(g, m) && !p.hasOwnProperty(m) && (b[m] = g[m]);
    if (E && E.defaultProps)
      for (m in g = E.defaultProps, g)
        b[m] === void 0 && (b[m] = g[m]);
    return { $$typeof: n, type: E, key: A, ref: L, props: b, _owner: R.current };
  }
  return q.Fragment = l, q.jsx = S, q.jsxs = S, q;
}
var J = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ve;
function Or() {
  return Ve || (Ve = 1, process.env.NODE_ENV !== "production" && function() {
    var s = Ye, n = Symbol.for("react.element"), l = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), E = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), C = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), L = Symbol.for("react.offscreen"), X = Symbol.iterator, te = "@@iterator";
    function ne(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = X && e[X] || e[te];
      return typeof r == "function" ? r : null;
    }
    var P = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function o(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
          t[a - 1] = arguments[a];
        V("error", e, t);
      }
    }
    function V(e, r, t) {
      {
        var a = P.ReactDebugCurrentFrame, f = a.getStackAddendum();
        f !== "" && (r += "%s", t = t.concat([f]));
        var d = t.map(function(u) {
          return String(u);
        });
        d.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, d);
      }
    }
    var ae = !1, se = !1, v = !1, _ = !1, j = !1, O;
    O = Symbol.for("react.module.reference");
    function N(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === c || e === p || j || e === R || e === C || e === m || _ || e === L || ae || se || v || typeof e == "object" && e !== null && (e.$$typeof === A || e.$$typeof === b || e.$$typeof === S || e.$$typeof === E || e.$$typeof === g || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === O || e.getModuleId !== void 0));
    }
    function oe(e, r, t) {
      var a = e.displayName;
      if (a)
        return a;
      var f = r.displayName || r.name || "";
      return f !== "" ? t + "(" + f + ")" : t;
    }
    function z(e) {
      return e.displayName || "Context";
    }
    function k(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && o("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case c:
          return "Fragment";
        case l:
          return "Portal";
        case p:
          return "Profiler";
        case R:
          return "StrictMode";
        case C:
          return "Suspense";
        case m:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case E:
            var r = e;
            return z(r) + ".Consumer";
          case S:
            var t = e;
            return z(t._context) + ".Provider";
          case g:
            return oe(e, e.render, "ForwardRef");
          case b:
            var a = e.displayName || null;
            return a !== null ? a : k(e.type) || "Memo";
          case A: {
            var f = e, d = f._payload, u = f._init;
            try {
              return k(u(d));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var U = Object.assign, Y = 0, Re, Ee, me, _e, be, Te, Ce;
    function we() {
    }
    we.__reactDisabledLog = !0;
    function Je() {
      {
        if (Y === 0) {
          Re = console.log, Ee = console.info, me = console.warn, _e = console.error, be = console.group, Te = console.groupCollapsed, Ce = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: we,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        Y++;
      }
    }
    function He() {
      {
        if (Y--, Y === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: U({}, e, {
              value: Re
            }),
            info: U({}, e, {
              value: Ee
            }),
            warn: U({}, e, {
              value: me
            }),
            error: U({}, e, {
              value: _e
            }),
            group: U({}, e, {
              value: be
            }),
            groupCollapsed: U({}, e, {
              value: Te
            }),
            groupEnd: U({}, e, {
              value: Ce
            })
          });
        }
        Y < 0 && o("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ie = P.ReactCurrentDispatcher, ue;
    function Z(e, r, t) {
      {
        if (ue === void 0)
          try {
            throw Error();
          } catch (f) {
            var a = f.stack.trim().match(/\n( *(at )?)/);
            ue = a && a[1] || "";
          }
        return `
` + ue + e;
      }
    }
    var le = !1, Q;
    {
      var Ke = typeof WeakMap == "function" ? WeakMap : Map;
      Q = new Ke();
    }
    function Se(e, r) {
      if (!e || le)
        return "";
      {
        var t = Q.get(e);
        if (t !== void 0)
          return t;
      }
      var a;
      le = !0;
      var f = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var d;
      d = ie.current, ie.current = null, Je();
      try {
        if (r) {
          var u = function() {
            throw Error();
          };
          if (Object.defineProperty(u.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(u, []);
            } catch (w) {
              a = w;
            }
            Reflect.construct(e, [], u);
          } else {
            try {
              u.call();
            } catch (w) {
              a = w;
            }
            e.call(u.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (w) {
            a = w;
          }
          e();
        }
      } catch (w) {
        if (w && a && typeof w.stack == "string") {
          for (var i = w.stack.split(`
`), T = a.stack.split(`
`), y = i.length - 1, h = T.length - 1; y >= 1 && h >= 0 && i[y] !== T[h]; )
            h--;
          for (; y >= 1 && h >= 0; y--, h--)
            if (i[y] !== T[h]) {
              if (y !== 1 || h !== 1)
                do
                  if (y--, h--, h < 0 || i[y] !== T[h]) {
                    var I = `
` + i[y].replace(" at new ", " at ");
                    return e.displayName && I.includes("<anonymous>") && (I = I.replace("<anonymous>", e.displayName)), typeof e == "function" && Q.set(e, I), I;
                  }
                while (y >= 1 && h >= 0);
              break;
            }
        }
      } finally {
        le = !1, ie.current = d, He(), Error.prepareStackTrace = f;
      }
      var $ = e ? e.displayName || e.name : "", W = $ ? Z($) : "";
      return typeof e == "function" && Q.set(e, W), W;
    }
    function Xe(e, r, t) {
      return Se(e, !1);
    }
    function ze(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function ee(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Se(e, ze(e));
      if (typeof e == "string")
        return Z(e);
      switch (e) {
        case C:
          return Z("Suspense");
        case m:
          return Z("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case g:
            return Xe(e.render);
          case b:
            return ee(e.type, r, t);
          case A: {
            var a = e, f = a._payload, d = a._init;
            try {
              return ee(d(f), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var B = Object.prototype.hasOwnProperty, Pe = {}, Oe = P.ReactDebugCurrentFrame;
    function re(e) {
      if (e) {
        var r = e._owner, t = ee(e.type, e._source, r ? r.type : null);
        Oe.setExtraStackFrame(t);
      } else
        Oe.setExtraStackFrame(null);
    }
    function Ze(e, r, t, a, f) {
      {
        var d = Function.call.bind(B);
        for (var u in e)
          if (d(e, u)) {
            var i = void 0;
            try {
              if (typeof e[u] != "function") {
                var T = Error((a || "React class") + ": " + t + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw T.name = "Invariant Violation", T;
              }
              i = e[u](r, u, a, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (y) {
              i = y;
            }
            i && !(i instanceof Error) && (re(f), o("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", t, u, typeof i), re(null)), i instanceof Error && !(i.message in Pe) && (Pe[i.message] = !0, re(f), o("Failed %s type: %s", t, i.message), re(null));
          }
      }
    }
    var Qe = Array.isArray;
    function ce(e) {
      return Qe(e);
    }
    function er(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function rr(e) {
      try {
        return Ie(e), !1;
      } catch {
        return !0;
      }
    }
    function Ie(e) {
      return "" + e;
    }
    function xe(e) {
      if (rr(e))
        return o("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", er(e)), Ie(e);
    }
    var G = P.ReactCurrentOwner, tr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ae, ke, fe;
    fe = {};
    function nr(e) {
      if (B.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function ar(e) {
      if (B.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function sr(e, r) {
      if (typeof e.ref == "string" && G.current && r && G.current.stateNode !== r) {
        var t = k(G.current.type);
        fe[t] || (o('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', k(G.current.type), e.ref), fe[t] = !0);
      }
    }
    function or(e, r) {
      {
        var t = function() {
          Ae || (Ae = !0, o("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function ir(e, r) {
      {
        var t = function() {
          ke || (ke = !0, o("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var ur = function(e, r, t, a, f, d, u) {
      var i = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: u,
        // Record the component responsible for creating this element.
        _owner: d
      };
      return i._store = {}, Object.defineProperty(i._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(i, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: a
      }), Object.defineProperty(i, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: f
      }), Object.freeze && (Object.freeze(i.props), Object.freeze(i)), i;
    };
    function lr(e, r, t, a, f) {
      {
        var d, u = {}, i = null, T = null;
        t !== void 0 && (xe(t), i = "" + t), ar(r) && (xe(r.key), i = "" + r.key), nr(r) && (T = r.ref, sr(r, f));
        for (d in r)
          B.call(r, d) && !tr.hasOwnProperty(d) && (u[d] = r[d]);
        if (e && e.defaultProps) {
          var y = e.defaultProps;
          for (d in y)
            u[d] === void 0 && (u[d] = y[d]);
        }
        if (i || T) {
          var h = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          i && or(u, h), T && ir(u, h);
        }
        return ur(e, i, T, f, a, G.current, u);
      }
    }
    var de = P.ReactCurrentOwner, je = P.ReactDebugCurrentFrame;
    function M(e) {
      if (e) {
        var r = e._owner, t = ee(e.type, e._source, r ? r.type : null);
        je.setExtraStackFrame(t);
      } else
        je.setExtraStackFrame(null);
    }
    var ve;
    ve = !1;
    function pe(e) {
      return typeof e == "object" && e !== null && e.$$typeof === n;
    }
    function De() {
      {
        if (de.current) {
          var e = k(de.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function cr(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), t = e.lineNumber;
          return `

Check your code at ` + r + ":" + t + ".";
        }
        return "";
      }
    }
    var Fe = {};
    function fr(e) {
      {
        var r = De();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Ne(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = fr(r);
        if (Fe[t])
          return;
        Fe[t] = !0;
        var a = "";
        e && e._owner && e._owner !== de.current && (a = " It was passed a child from " + k(e._owner.type) + "."), M(e), o('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, a), M(null);
      }
    }
    function Ue(e, r) {
      {
        if (typeof e != "object")
          return;
        if (ce(e))
          for (var t = 0; t < e.length; t++) {
            var a = e[t];
            pe(a) && Ne(a, r);
          }
        else if (pe(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var f = ne(e);
          if (typeof f == "function" && f !== e.entries)
            for (var d = f.call(e), u; !(u = d.next()).done; )
              pe(u.value) && Ne(u.value, r);
        }
      }
    }
    function dr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === g || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === b))
          t = r.propTypes;
        else
          return;
        if (t) {
          var a = k(r);
          Ze(t, e.props, "prop", a, e);
        } else if (r.PropTypes !== void 0 && !ve) {
          ve = !0;
          var f = k(r);
          o("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", f || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && o("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function vr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var a = r[t];
          if (a !== "children" && a !== "key") {
            M(e), o("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), M(null);
            break;
          }
        }
        e.ref !== null && (M(e), o("Invalid attribute `ref` supplied to `React.Fragment`."), M(null));
      }
    }
    var We = {};
    function Le(e, r, t, a, f, d) {
      {
        var u = N(e);
        if (!u) {
          var i = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (i += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var T = cr(f);
          T ? i += T : i += De();
          var y;
          e === null ? y = "null" : ce(e) ? y = "array" : e !== void 0 && e.$$typeof === n ? (y = "<" + (k(e.type) || "Unknown") + " />", i = " Did you accidentally export a JSX literal instead of a component?") : y = typeof e, o("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", y, i);
        }
        var h = lr(e, r, t, f, d);
        if (h == null)
          return h;
        if (u) {
          var I = r.children;
          if (I !== void 0)
            if (a)
              if (ce(I)) {
                for (var $ = 0; $ < I.length; $++)
                  Ue(I[$], e);
                Object.freeze && Object.freeze(I);
              } else
                o("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ue(I, e);
        }
        if (B.call(r, "key")) {
          var W = k(e), w = Object.keys(r).filter(function(Er) {
            return Er !== "key";
          }), ge = w.length > 0 ? "{key: someKey, " + w.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!We[W + ge]) {
            var Rr = w.length > 0 ? "{" + w.join(": ..., ") + ": ...}" : "{}";
            o(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ge, W, Rr, W), We[W + ge] = !0;
          }
        }
        return e === c ? vr(h) : dr(h), h;
      }
    }
    function pr(e, r, t) {
      return Le(e, r, t, !0);
    }
    function gr(e, r, t) {
      return Le(e, r, t, !1);
    }
    var yr = gr, hr = pr;
    J.Fragment = c, J.jsx = yr, J.jsxs = hr;
  }()), J;
}
process.env.NODE_ENV === "production" ? ye.exports = Pr() : ye.exports = Or();
var Be = ye.exports;
const Ge = () => "7.6.0", Ir = (s) => s.toString(16).padStart(2, "0"), xr = (s) => {
  const n = new Uint8Array((s || 40) / 2);
  return window.crypto.getRandomValues(n), Array.from(n, Ir).join("");
}, Ar = () => typeof window < "u" ? xr(10) : (/* @__PURE__ */ new Date()).getTime().toString(36);
class K {
}
x(K, "makeRequest", (n, l) => ({
  id: Ar(),
  method: n,
  params: l,
  env: {
    sdkVersion: Ge()
  }
})), x(K, "makeResponse", (n, l, c) => ({
  id: n,
  success: !0,
  version: c,
  data: l
})), x(K, "makeErrorResponse", (n, l, c) => ({
  id: n,
  success: !1,
  error: l,
  version: c
}));
var F = /* @__PURE__ */ ((s) => (s.sendTransactions = "sendTransactions", s.rpcCall = "rpcCall", s.getChainInfo = "getChainInfo", s.getSafeInfo = "getSafeInfo", s.getTxBySafeTxHash = "getTxBySafeTxHash", s.getSafeBalances = "getSafeBalances", s.signMessage = "signMessage", s.signTypedMessage = "signTypedMessage", s.getEnvironmentInfo = "getEnvironmentInfo", s.requestAddressBook = "requestAddressBook", s.wallet_getPermissions = "wallet_getPermissions", s.wallet_requestPermissions = "wallet_requestPermissions", s))(F || {}), he = /* @__PURE__ */ ((s) => (s.AWAITING_CONFIRMATIONS = "AWAITING_CONFIRMATIONS", s.AWAITING_EXECUTION = "AWAITING_EXECUTION", s.CANCELLED = "CANCELLED", s.FAILED = "FAILED", s.SUCCESS = "SUCCESS", s.PENDING = "PENDING", s.WILL_BE_REPLACED = "WILL_BE_REPLACED", s))(he || {});
class kr {
  constructor(n) {
    x(this, "iframeRef");
    x(this, "handlers", /* @__PURE__ */ new Map());
    x(this, "on", (n, l) => {
      this.handlers.set(n, l);
    });
    x(this, "isValidMessage", (n) => {
      var R;
      if (Object.prototype.hasOwnProperty.call(n.data, "isCookieEnabled"))
        return !0;
      const l = ((R = this.iframeRef.current) == null ? void 0 : R.contentWindow) === n.source, c = Object.values(F).includes(n.data.method);
      return l && c;
    });
    x(this, "canHandleMessage", (n) => !!this.handlers.get(n.data.method));
    x(this, "send", (n, l, c = !1) => {
      var S, E;
      const R = Ge(), p = c ? K.makeErrorResponse(
        l,
        n,
        R
      ) : K.makeResponse(l, n, R);
      (E = (S = this.iframeRef.current) == null ? void 0 : S.contentWindow) == null || E.postMessage(p, "*");
    });
    x(this, "handleIncomingMessage", async (n) => {
      const l = this.isValidMessage(n), c = this.canHandleMessage(n);
      if (l && c) {
        n.data.method === "rpcCall" && // eslint-disable-next-line @typescript-eslint/no-explicit-any
        n.data.params.call === "eth_getBlockByNumber" || console.log("*", n.data);
        const R = this.handlers.get(n.data.method);
        try {
          const p = await R(n);
          typeof p < "u" && this.send(p, n.data.id);
        } catch (p) {
          this.send(p.message, n.data.id, !0);
        }
      }
    });
    x(this, "clear", () => {
      window.removeEventListener("message", this.handleIncomingMessage);
    });
    this.iframeRef = n, window.addEventListener("message", this.handleIncomingMessage);
  }
}
const jr = (s) => {
  const [n, l] = D(
    void 0
  );
  return H(() => {
    let c;
    return ((p) => {
      c = new kr(p), l(c);
    })(s), () => {
      c == null || c.clear();
    };
  }, [s]), n;
}, qe = br({
  address: void 0,
  appUrl: void 0,
  rpcUrl: void 0,
  paymasterRpcUrl: void 0,
  iframeRef: null,
  latestTransaction: void 0,
  setAddress: () => {
  },
  setAppUrl: () => {
  },
  setRpcUrl: () => {
  },
  setPaymasterRpcUrl: () => {
  },
  sendMessageToIFrame: () => {
  },
  onUserTxConfirm: () => {
  },
  onTxReject: () => {
  },
  isReady: !1
}), Wr = ({
  children: s
}) => {
  const [n, l] = D(), [c, R] = D(), [p, S] = D(), [E, g] = D(), [C, m] = D(), [b, A] = D(), [L, X] = D(), [te, ne] = D(!1), P = Tr(null), o = jr(P), V = Cr(
    function(v, _) {
      var O, N;
      const j = {
        ...v,
        requestId: _ || Math.trunc(window.performance.now()),
        version: "0.4.2"
      };
      P && ((N = (O = P.current) == null ? void 0 : O.contentWindow) == null || N.postMessage(
        j,
        c
      ));
    },
    [P, c]
  ), ae = (v, _) => {
    V(
      {
        messageId: "TRANSACTION_CONFIRMED",
        // INTERFACE_MESSAGES.TRANSACTION_CONFIRMED
        data: { safeTxHash: v }
      },
      _
    ), o == null || o.send({ safeTxHash: v }, _);
  }, se = (v) => {
    console.log("onTxReject", v), V(
      {
        messageId: "TRANSACTION_REJECTED",
        // INTERFACE_MESSAGES.TRANSACTION_REJECTED
        data: {}
      },
      v
    ), o == null || o.send("Transaction was rejected", v, !0);
  };
  return H(() => {
    C && A(new Me.StaticJsonRpcProvider(C));
  }, [C]), H(() => {
    p && g(new Me.StaticJsonRpcProvider(p));
  }, [p]), H(() => {
    E && (o == null || o.on(F.getSafeInfo, async () => ({
      safeAddress: n,
      chainId: (await E.getNetwork()).chainId,
      owners: [],
      threshold: 1,
      isReadOnly: !1
    })), o == null || o.on(F.getEnvironmentInfo, async () => ({
      origin: document.location.origin
    })), o == null || o.on(F.rpcCall, async (v) => {
      const _ = v.data.params, j = _.call;
      try {
        return b && (j === "eth_gasPrice" || j === "eth_estimateGas") ? await b.send(
          _.call,
          _.params
        ) : await E.send(
          _.call,
          _.params
        );
      } catch (O) {
        return O;
      }
    }), o == null || o.on(F.sendTransactions, (v) => {
      console.log("communicator.sendTransactions", v);
      const _ = v.data.params.txs.map(
        ({ to: j, ...O }) => ({
          to: Sr.getAddress(j),
          // checksummed
          ...O
        })
      );
      X({
        id: v.data.id,
        ..._[0]
      });
    }), o == null || o.on(F.getTxBySafeTxHash, async (v) => {
      console.log("communicator.getTxBySafeTxHash", v);
      const { safeTxHash: _ } = v.data.params, { timestamp: j, blockNumber: O, to: N, data: oe, value: z } = await E.getTransaction(_);
      return {
        txId: _,
        txStatus: O ? he.SUCCESS : he.PENDING,
        executedAt: j,
        txInfo: {
          type: "Custom",
          to: {
            value: N ?? ""
          },
          dataSize: oe,
          value: z.toString(),
          isCancellation: !1
        },
        txHash: _
      };
    }), o == null || o.on(F.signMessage, async (v) => {
      v.data.params;
    }), o == null || o.on(F.signTypedMessage, async (v) => {
      v.data.params;
    }), ne(!0));
  }, [o, n, E, b]), /* @__PURE__ */ Be.jsx(
    qe.Provider,
    {
      value: {
        address: n,
        appUrl: c,
        rpcUrl: p,
        paymasterRpcUrl: C,
        iframeRef: P,
        latestTransaction: L,
        setAddress: l,
        setAppUrl: R,
        setRpcUrl: S,
        setPaymasterRpcUrl: m,
        sendMessageToIFrame: V,
        onUserTxConfirm: ae,
        onTxReject: se,
        isReady: te
      },
      children: s
    }
  );
}, Dr = () => wr(qe), Lr = ({
  width: s,
  height: n,
  src: l,
  address: c,
  rpcUrl: R,
  paymasterRpcUrl: p,
  onLoad: S
}) => {
  const { iframeRef: E, setAddress: g, setAppUrl: C, setRpcUrl: m, setPaymasterRpcUrl: b, isReady: A } = Dr();
  return H(() => {
    l && c && g && (C(l), g(c), m(R)), p && b(p);
  }, [l, C, c, g, R, m, p, b]), A ? /* @__PURE__ */ Be.jsx(
    "iframe",
    {
      width: s,
      height: n,
      style: {
        background: "white"
      },
      src: l,
      ref: E,
      onLoad: S
    }
  ) : null;
};
export {
  Lr as ImpersonatorIframe,
  Wr as ImpersonatorIframeProvider,
  Dr as useImpersonatorIframe
};
