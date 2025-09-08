/*!
 * OtType-Slate.js v0.1.0
 * (c) 2021-2025
 * The copyright of this software belongs to KK group.
 */
var t = function() {
  return t = Object.assign || function(t3) {
    for (var e2, r2 = 1, u2 = arguments.length; r2 < u2; r2++) for (var n2 in e2 = arguments[r2]) Object.prototype.hasOwnProperty.call(e2, n2) && (t3[n2] = e2[n2]);
    return t3;
  }, t.apply(this, arguments);
};
function e(t3, e2, r2) {
  if (r2 || 2 === arguments.length) for (var u2, n2 = 0, i2 = e2.length; n2 < i2; n2++) !u2 && n2 in e2 || (u2 || (u2 = Array.prototype.slice.call(e2, 0, n2)), u2[n2] = e2[n2]);
  return t3.concat(u2 || Array.prototype.slice.call(e2));
}
var r = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
var u = function(t3, e2) {
  return t3(e2 = { exports: {} }, e2.exports), e2.exports;
}(function(t3, e2) {
  (function() {
    var u2, n2 = "Expected a function", i2 = "__lodash_hash_undefined__", o2 = "__lodash_placeholder__", a2 = 16, s2 = 32, f2 = 64, c2 = 128, l2 = 256, h2 = 1 / 0, p2 = 9007199254740991, D2 = NaN, v2 = 4294967295, C2 = [["ary", c2], ["bind", 1], ["bindKey", 2], ["curry", 8], ["curryRight", a2], ["flip", 512], ["partial", s2], ["partialRight", f2], ["rearg", l2]], d2 = "[object Arguments]", B2 = "[object Array]", g2 = "[object Boolean]", A2 = "[object Date]", F2 = "[object Error]", y2 = "[object Function]", E2 = "[object GeneratorFunction]", m2 = "[object Map]", _2 = "[object Number]", b2 = "[object Object]", w2 = "[object Promise]", x2 = "[object RegExp]", O2 = "[object Set]", P2 = "[object String]", j2 = "[object Symbol]", k2 = "[object WeakMap]", N2 = "[object ArrayBuffer]", R2 = "[object DataView]", S2 = "[object Float32Array]", T2 = "[object Float64Array]", I2 = "[object Int8Array]", q2 = "[object Int16Array]", z2 = "[object Int32Array]", M2 = "[object Uint8Array]", W2 = "[object Uint8ClampedArray]", L2 = "[object Uint16Array]", V2 = "[object Uint32Array]", $2 = /\b__p \+= '';/g, U2 = /\b(__p \+=) '' \+/g, Z2 = /(__e\(.*?\)|\b__t\)) \+\n'';/g, K2 = /&(?:amp|lt|gt|quot|#39);/g, J2 = /[&<>"']/g, G2 = RegExp(K2.source), H2 = RegExp(J2.source), Y2 = /<%-([\s\S]+?)%>/g, X2 = /<%([\s\S]+?)%>/g, Q2 = /<%=([\s\S]+?)%>/g, tt2 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, et2 = /^\w*$/, rt2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, ut2 = /[\\^$.*+?()[\]{}|]/g, nt2 = RegExp(ut2.source), it2 = /^\s+/, ot2 = /\s/, at2 = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, st2 = /\{\n\/\* \[wrapped with (.+)\] \*/, ft2 = /,? & /, ct2 = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, lt2 = /[()=,{}\[\]\/\s]/, ht2 = /\\(\\)?/g, pt2 = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Dt2 = /\w*$/, vt2 = /^[-+]0x[0-9a-f]+$/i, Ct2 = /^0b[01]+$/i, dt2 = /^\[object .+?Constructor\]$/, Bt2 = /^0o[0-7]+$/i, gt2 = /^(?:0|[1-9]\d*)$/, At2 = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Ft2 = /($^)/, yt2 = /['\n\r\u2028\u2029\\]/g, Et2 = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff", mt2 = "\\u2700-\\u27bf", _t2 = "a-z\\xdf-\\xf6\\xf8-\\xff", bt2 = "A-Z\\xc0-\\xd6\\xd8-\\xde", wt2 = "\\ufe0e\\ufe0f", xt2 = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Ot2 = "['’]", Pt2 = "[\\ud800-\\udfff]", jt2 = "[" + xt2 + "]", kt2 = "[" + Et2 + "]", Nt2 = "\\d+", Rt2 = "[\\u2700-\\u27bf]", St2 = "[" + _t2 + "]", Tt2 = "[^\\ud800-\\udfff" + xt2 + Nt2 + mt2 + _t2 + bt2 + "]", It2 = "\\ud83c[\\udffb-\\udfff]", qt2 = "[^\\ud800-\\udfff]", zt2 = "(?:\\ud83c[\\udde6-\\uddff]){2}", Mt2 = "[\\ud800-\\udbff][\\udc00-\\udfff]", Wt2 = "[" + bt2 + "]", Lt2 = "(?:" + St2 + "|" + Tt2 + ")", Vt2 = "(?:" + Wt2 + "|" + Tt2 + ")", $t2 = "(?:['’](?:d|ll|m|re|s|t|ve))?", Ut2 = "(?:['’](?:D|LL|M|RE|S|T|VE))?", Zt2 = "(?:" + kt2 + "|" + It2 + ")?", Kt2 = "[\\ufe0e\\ufe0f]?", Jt2 = Kt2 + Zt2 + ("(?:\\u200d(?:" + [qt2, zt2, Mt2].join("|") + ")" + Kt2 + Zt2 + ")*"), Gt2 = "(?:" + [Rt2, zt2, Mt2].join("|") + ")" + Jt2, Ht2 = "(?:" + [qt2 + kt2 + "?", kt2, zt2, Mt2, Pt2].join("|") + ")", Yt2 = RegExp(Ot2, "g"), Xt2 = RegExp(kt2, "g"), Qt2 = RegExp(It2 + "(?=" + It2 + ")|" + Ht2 + Jt2, "g"), te2 = RegExp([Wt2 + "?" + St2 + "+" + $t2 + "(?=" + [jt2, Wt2, "$"].join("|") + ")", Vt2 + "+" + Ut2 + "(?=" + [jt2, Wt2 + Lt2, "$"].join("|") + ")", Wt2 + "?" + Lt2 + "+" + $t2, Wt2 + "+" + Ut2, "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Nt2, Gt2].join("|"), "g"), ee2 = RegExp("[\\u200d\\ud800-\\udfff" + Et2 + wt2 + "]"), re2 = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, ue2 = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], ne2 = -1, ie2 = {};
    ie2[S2] = ie2[T2] = ie2[I2] = ie2[q2] = ie2[z2] = ie2[M2] = ie2[W2] = ie2[L2] = ie2[V2] = true, ie2[d2] = ie2[B2] = ie2[N2] = ie2[g2] = ie2[R2] = ie2[A2] = ie2[F2] = ie2[y2] = ie2[m2] = ie2[_2] = ie2[b2] = ie2[x2] = ie2[O2] = ie2[P2] = ie2[k2] = false;
    var oe2 = {};
    oe2[d2] = oe2[B2] = oe2[N2] = oe2[R2] = oe2[g2] = oe2[A2] = oe2[S2] = oe2[T2] = oe2[I2] = oe2[q2] = oe2[z2] = oe2[m2] = oe2[_2] = oe2[b2] = oe2[x2] = oe2[O2] = oe2[P2] = oe2[j2] = oe2[M2] = oe2[W2] = oe2[L2] = oe2[V2] = true, oe2[F2] = oe2[y2] = oe2[k2] = false;
    var ae2 = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" }, se2 = parseFloat, fe2 = parseInt, ce2 = "object" == typeof r && r && r.Object === Object && r, le2 = "object" == typeof self && self && self.Object === Object && self, he2 = ce2 || le2 || Function("return this")(), pe2 = e2 && !e2.nodeType && e2, De2 = pe2 && t3 && !t3.nodeType && t3, ve2 = De2 && De2.exports === pe2, Ce2 = ve2 && ce2.process, de2 = function() {
      try {
        var t4 = De2 && De2.require && De2.require("util").types;
        return t4 || Ce2 && Ce2.binding && Ce2.binding("util");
      } catch (t5) {
      }
    }(), Be2 = de2 && de2.isArrayBuffer, ge2 = de2 && de2.isDate, Ae2 = de2 && de2.isMap, Fe2 = de2 && de2.isRegExp, ye2 = de2 && de2.isSet, Ee2 = de2 && de2.isTypedArray;
    function me2(t4, e3, r2) {
      switch (r2.length) {
        case 0:
          return t4.call(e3);
        case 1:
          return t4.call(e3, r2[0]);
        case 2:
          return t4.call(e3, r2[0], r2[1]);
        case 3:
          return t4.call(e3, r2[0], r2[1], r2[2]);
      }
      return t4.apply(e3, r2);
    }
    function _e2(t4, e3, r2, u3) {
      for (var n3 = -1, i3 = null == t4 ? 0 : t4.length; ++n3 < i3; ) {
        var o3 = t4[n3];
        e3(u3, o3, r2(o3), t4);
      }
      return u3;
    }
    function be2(t4, e3) {
      for (var r2 = -1, u3 = null == t4 ? 0 : t4.length; ++r2 < u3 && false !== e3(t4[r2], r2, t4); ) ;
      return t4;
    }
    function we2(t4, e3) {
      for (var r2 = null == t4 ? 0 : t4.length; r2-- && false !== e3(t4[r2], r2, t4); ) ;
      return t4;
    }
    function xe2(t4, e3) {
      for (var r2 = -1, u3 = null == t4 ? 0 : t4.length; ++r2 < u3; ) if (!e3(t4[r2], r2, t4)) return false;
      return true;
    }
    function Oe2(t4, e3) {
      for (var r2 = -1, u3 = null == t4 ? 0 : t4.length, n3 = 0, i3 = []; ++r2 < u3; ) {
        var o3 = t4[r2];
        e3(o3, r2, t4) && (i3[n3++] = o3);
      }
      return i3;
    }
    function Pe2(t4, e3) {
      return !!(null == t4 ? 0 : t4.length) && Me2(t4, e3, 0) > -1;
    }
    function je2(t4, e3, r2) {
      for (var u3 = -1, n3 = null == t4 ? 0 : t4.length; ++u3 < n3; ) if (r2(e3, t4[u3])) return true;
      return false;
    }
    function ke2(t4, e3) {
      for (var r2 = -1, u3 = null == t4 ? 0 : t4.length, n3 = Array(u3); ++r2 < u3; ) n3[r2] = e3(t4[r2], r2, t4);
      return n3;
    }
    function Ne2(t4, e3) {
      for (var r2 = -1, u3 = e3.length, n3 = t4.length; ++r2 < u3; ) t4[n3 + r2] = e3[r2];
      return t4;
    }
    function Re2(t4, e3, r2, u3) {
      var n3 = -1, i3 = null == t4 ? 0 : t4.length;
      for (u3 && i3 && (r2 = t4[++n3]); ++n3 < i3; ) r2 = e3(r2, t4[n3], n3, t4);
      return r2;
    }
    function Se2(t4, e3, r2, u3) {
      var n3 = null == t4 ? 0 : t4.length;
      for (u3 && n3 && (r2 = t4[--n3]); n3--; ) r2 = e3(r2, t4[n3], n3, t4);
      return r2;
    }
    function Te2(t4, e3) {
      for (var r2 = -1, u3 = null == t4 ? 0 : t4.length; ++r2 < u3; ) if (e3(t4[r2], r2, t4)) return true;
      return false;
    }
    var Ie2 = $e2("length");
    function qe2(t4, e3, r2) {
      var u3;
      return r2(t4, function(t5, r3, n3) {
        if (e3(t5, r3, n3)) return u3 = r3, false;
      }), u3;
    }
    function ze2(t4, e3, r2, u3) {
      for (var n3 = t4.length, i3 = r2 + (u3 ? 1 : -1); u3 ? i3-- : ++i3 < n3; ) if (e3(t4[i3], i3, t4)) return i3;
      return -1;
    }
    function Me2(t4, e3, r2) {
      return e3 == e3 ? function(t5, e4, r3) {
        var u3 = r3 - 1, n3 = t5.length;
        for (; ++u3 < n3; ) if (t5[u3] === e4) return u3;
        return -1;
      }(t4, e3, r2) : ze2(t4, Le2, r2);
    }
    function We2(t4, e3, r2, u3) {
      for (var n3 = r2 - 1, i3 = t4.length; ++n3 < i3; ) if (u3(t4[n3], e3)) return n3;
      return -1;
    }
    function Le2(t4) {
      return t4 != t4;
    }
    function Ve2(t4, e3) {
      var r2 = null == t4 ? 0 : t4.length;
      return r2 ? Ke2(t4, e3) / r2 : D2;
    }
    function $e2(t4) {
      return function(e3) {
        return null == e3 ? u2 : e3[t4];
      };
    }
    function Ue2(t4) {
      return function(e3) {
        return null == t4 ? u2 : t4[e3];
      };
    }
    function Ze2(t4, e3, r2, u3, n3) {
      return n3(t4, function(t5, n4, i3) {
        r2 = u3 ? (u3 = false, t5) : e3(r2, t5, n4, i3);
      }), r2;
    }
    function Ke2(t4, e3) {
      for (var r2, n3 = -1, i3 = t4.length; ++n3 < i3; ) {
        var o3 = e3(t4[n3]);
        o3 !== u2 && (r2 = r2 === u2 ? o3 : r2 + o3);
      }
      return r2;
    }
    function Je2(t4, e3) {
      for (var r2 = -1, u3 = Array(t4); ++r2 < t4; ) u3[r2] = e3(r2);
      return u3;
    }
    function Ge2(t4) {
      return t4 ? t4.slice(0, pr(t4) + 1).replace(it2, "") : t4;
    }
    function He2(t4) {
      return function(e3) {
        return t4(e3);
      };
    }
    function Ye2(t4, e3) {
      return ke2(e3, function(e4) {
        return t4[e4];
      });
    }
    function Xe2(t4, e3) {
      return t4.has(e3);
    }
    function Qe2(t4, e3) {
      for (var r2 = -1, u3 = t4.length; ++r2 < u3 && Me2(e3, t4[r2], 0) > -1; ) ;
      return r2;
    }
    function tr2(t4, e3) {
      for (var r2 = t4.length; r2-- && Me2(e3, t4[r2], 0) > -1; ) ;
      return r2;
    }
    function er2(t4, e3) {
      for (var r2 = t4.length, u3 = 0; r2--; ) t4[r2] === e3 && ++u3;
      return u3;
    }
    var rr2 = Ue2({ "À": "A", "Á": "A", "Â": "A", "Ã": "A", "Ä": "A", "Å": "A", "à": "a", "á": "a", "â": "a", "ã": "a", "ä": "a", "å": "a", "Ç": "C", "ç": "c", "Ð": "D", "ð": "d", "È": "E", "É": "E", "Ê": "E", "Ë": "E", "è": "e", "é": "e", "ê": "e", "ë": "e", "Ì": "I", "Í": "I", "Î": "I", "Ï": "I", "ì": "i", "í": "i", "î": "i", "ï": "i", "Ñ": "N", "ñ": "n", "Ò": "O", "Ó": "O", "Ô": "O", "Õ": "O", "Ö": "O", "Ø": "O", "ò": "o", "ó": "o", "ô": "o", "õ": "o", "ö": "o", "ø": "o", "Ù": "U", "Ú": "U", "Û": "U", "Ü": "U", "ù": "u", "ú": "u", "û": "u", "ü": "u", "Ý": "Y", "ý": "y", "ÿ": "y", "Æ": "Ae", "æ": "ae", "Þ": "Th", "þ": "th", "ß": "ss", "Ā": "A", "Ă": "A", "Ą": "A", "ā": "a", "ă": "a", "ą": "a", "Ć": "C", "Ĉ": "C", "Ċ": "C", "Č": "C", "ć": "c", "ĉ": "c", "ċ": "c", "č": "c", "Ď": "D", "Đ": "D", "ď": "d", "đ": "d", "Ē": "E", "Ĕ": "E", "Ė": "E", "Ę": "E", "Ě": "E", "ē": "e", "ĕ": "e", "ė": "e", "ę": "e", "ě": "e", "Ĝ": "G", "Ğ": "G", "Ġ": "G", "Ģ": "G", "ĝ": "g", "ğ": "g", "ġ": "g", "ģ": "g", "Ĥ": "H", "Ħ": "H", "ĥ": "h", "ħ": "h", "Ĩ": "I", "Ī": "I", "Ĭ": "I", "Į": "I", "İ": "I", "ĩ": "i", "ī": "i", "ĭ": "i", "į": "i", "ı": "i", "Ĵ": "J", "ĵ": "j", "Ķ": "K", "ķ": "k", "ĸ": "k", "Ĺ": "L", "Ļ": "L", "Ľ": "L", "Ŀ": "L", "Ł": "L", "ĺ": "l", "ļ": "l", "ľ": "l", "ŀ": "l", "ł": "l", "Ń": "N", "Ņ": "N", "Ň": "N", "Ŋ": "N", "ń": "n", "ņ": "n", "ň": "n", "ŋ": "n", "Ō": "O", "Ŏ": "O", "Ő": "O", "ō": "o", "ŏ": "o", "ő": "o", "Ŕ": "R", "Ŗ": "R", "Ř": "R", "ŕ": "r", "ŗ": "r", "ř": "r", "Ś": "S", "Ŝ": "S", "Ş": "S", "Š": "S", "ś": "s", "ŝ": "s", "ş": "s", "š": "s", "Ţ": "T", "Ť": "T", "Ŧ": "T", "ţ": "t", "ť": "t", "ŧ": "t", "Ũ": "U", "Ū": "U", "Ŭ": "U", "Ů": "U", "Ű": "U", "Ų": "U", "ũ": "u", "ū": "u", "ŭ": "u", "ů": "u", "ű": "u", "ų": "u", "Ŵ": "W", "ŵ": "w", "Ŷ": "Y", "ŷ": "y", "Ÿ": "Y", "Ź": "Z", "Ż": "Z", "Ž": "Z", "ź": "z", "ż": "z", "ž": "z", "Ĳ": "IJ", "ĳ": "ij", "Œ": "Oe", "œ": "oe", "ŉ": "'n", "ſ": "s" }), ur2 = Ue2({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" });
    function nr2(t4) {
      return "\\" + ae2[t4];
    }
    function ir2(t4) {
      return ee2.test(t4);
    }
    function or2(t4) {
      var e3 = -1, r2 = Array(t4.size);
      return t4.forEach(function(t5, u3) {
        r2[++e3] = [u3, t5];
      }), r2;
    }
    function ar2(t4, e3) {
      return function(r2) {
        return t4(e3(r2));
      };
    }
    function sr2(t4, e3) {
      for (var r2 = -1, u3 = t4.length, n3 = 0, i3 = []; ++r2 < u3; ) {
        var a3 = t4[r2];
        a3 !== e3 && a3 !== o2 || (t4[r2] = o2, i3[n3++] = r2);
      }
      return i3;
    }
    function fr2(t4) {
      var e3 = -1, r2 = Array(t4.size);
      return t4.forEach(function(t5) {
        r2[++e3] = t5;
      }), r2;
    }
    function cr2(t4) {
      var e3 = -1, r2 = Array(t4.size);
      return t4.forEach(function(t5) {
        r2[++e3] = [t5, t5];
      }), r2;
    }
    function lr(t4) {
      return ir2(t4) ? function(t5) {
        var e3 = Qt2.lastIndex = 0;
        for (; Qt2.test(t5); ) ++e3;
        return e3;
      }(t4) : Ie2(t4);
    }
    function hr(t4) {
      return ir2(t4) ? function(t5) {
        return t5.match(Qt2) || [];
      }(t4) : function(t5) {
        return t5.split("");
      }(t4);
    }
    function pr(t4) {
      for (var e3 = t4.length; e3-- && ot2.test(t4.charAt(e3)); ) ;
      return e3;
    }
    var Dr = Ue2({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" });
    var vr = function t4(e3) {
      var r2, ot3 = (e3 = null == e3 ? he2 : vr.defaults(he2.Object(), e3, vr.pick(he2, ue2))).Array, Et3 = e3.Date, mt3 = e3.Error, _t3 = e3.Function, bt3 = e3.Math, wt3 = e3.Object, xt3 = e3.RegExp, Ot3 = e3.String, Pt3 = e3.TypeError, jt3 = ot3.prototype, kt3 = _t3.prototype, Nt3 = wt3.prototype, Rt3 = e3["__core-js_shared__"], St3 = kt3.toString, Tt3 = Nt3.hasOwnProperty, It3 = 0, qt3 = (r2 = /[^.]+$/.exec(Rt3 && Rt3.keys && Rt3.keys.IE_PROTO || "")) ? "Symbol(src)_1." + r2 : "", zt3 = Nt3.toString, Mt3 = St3.call(wt3), Wt3 = he2._, Lt3 = xt3("^" + St3.call(Tt3).replace(ut2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Vt3 = ve2 ? e3.Buffer : u2, $t3 = e3.Symbol, Ut3 = e3.Uint8Array, Zt3 = Vt3 ? Vt3.allocUnsafe : u2, Kt3 = ar2(wt3.getPrototypeOf, wt3), Jt3 = wt3.create, Gt3 = Nt3.propertyIsEnumerable, Ht3 = jt3.splice, Qt3 = $t3 ? $t3.isConcatSpreadable : u2, ee3 = $t3 ? $t3.iterator : u2, ae3 = $t3 ? $t3.toStringTag : u2, ce3 = function() {
        try {
          var t5 = pi(wt3, "defineProperty");
          return t5({}, "", {}), t5;
        } catch (t6) {
        }
      }(), le3 = e3.clearTimeout !== he2.clearTimeout && e3.clearTimeout, pe3 = Et3 && Et3.now !== he2.Date.now && Et3.now, De3 = e3.setTimeout !== he2.setTimeout && e3.setTimeout, Ce3 = bt3.ceil, de3 = bt3.floor, Ie3 = wt3.getOwnPropertySymbols, Ue3 = Vt3 ? Vt3.isBuffer : u2, Cr = e3.isFinite, dr = jt3.join, Br = ar2(wt3.keys, wt3), gr = bt3.max, Ar = bt3.min, Fr = Et3.now, yr = e3.parseInt, Er = bt3.random, mr = jt3.reverse, _r = pi(e3, "DataView"), br = pi(e3, "Map"), wr = pi(e3, "Promise"), xr = pi(e3, "Set"), Or = pi(e3, "WeakMap"), Pr = pi(wt3, "create"), jr = Or && new Or(), kr = {}, Nr = Mi(_r), Rr = Mi(br), Sr = Mi(wr), Tr = Mi(xr), Ir = Mi(Or), qr = $t3 ? $t3.prototype : u2, zr = qr ? qr.valueOf : u2, Mr = qr ? qr.toString : u2;
      function Wr(t5) {
        if (na(t5) && !Ko(t5) && !(t5 instanceof Ur)) {
          if (t5 instanceof $r) return t5;
          if (Tt3.call(t5, "__wrapped__")) return Wi(t5);
        }
        return new $r(t5);
      }
      var Lr = /* @__PURE__ */ function() {
        function t5() {
        }
        return function(e4) {
          if (!ua(e4)) return {};
          if (Jt3) return Jt3(e4);
          t5.prototype = e4;
          var r3 = new t5();
          return t5.prototype = u2, r3;
        };
      }();
      function Vr() {
      }
      function $r(t5, e4) {
        this.__wrapped__ = t5, this.__actions__ = [], this.__chain__ = !!e4, this.__index__ = 0, this.__values__ = u2;
      }
      function Ur(t5) {
        this.__wrapped__ = t5, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = v2, this.__views__ = [];
      }
      function Zr(t5) {
        var e4 = -1, r3 = null == t5 ? 0 : t5.length;
        for (this.clear(); ++e4 < r3; ) {
          var u3 = t5[e4];
          this.set(u3[0], u3[1]);
        }
      }
      function Kr(t5) {
        var e4 = -1, r3 = null == t5 ? 0 : t5.length;
        for (this.clear(); ++e4 < r3; ) {
          var u3 = t5[e4];
          this.set(u3[0], u3[1]);
        }
      }
      function Jr(t5) {
        var e4 = -1, r3 = null == t5 ? 0 : t5.length;
        for (this.clear(); ++e4 < r3; ) {
          var u3 = t5[e4];
          this.set(u3[0], u3[1]);
        }
      }
      function Gr(t5) {
        var e4 = -1, r3 = null == t5 ? 0 : t5.length;
        for (this.__data__ = new Jr(); ++e4 < r3; ) this.add(t5[e4]);
      }
      function Hr(t5) {
        var e4 = this.__data__ = new Kr(t5);
        this.size = e4.size;
      }
      function Yr(t5, e4) {
        var r3 = Ko(t5), u3 = !r3 && Zo(t5), n3 = !r3 && !u3 && Yo(t5), i3 = !r3 && !u3 && !n3 && ha(t5), o3 = r3 || u3 || n3 || i3, a3 = o3 ? Je2(t5.length, Ot3) : [], s3 = a3.length;
        for (var f3 in t5) !e4 && !Tt3.call(t5, f3) || o3 && ("length" == f3 || n3 && ("offset" == f3 || "parent" == f3) || i3 && ("buffer" == f3 || "byteLength" == f3 || "byteOffset" == f3) || Ai(f3, s3)) || a3.push(f3);
        return a3;
      }
      function Xr(t5) {
        var e4 = t5.length;
        return e4 ? t5[Gu(0, e4 - 1)] : u2;
      }
      function Qr(t5, e4) {
        return Ii(jn(t5), su(e4, 0, t5.length));
      }
      function tu(t5) {
        return Ii(jn(t5));
      }
      function eu(t5, e4, r3) {
        (r3 !== u2 && !Vo(t5[e4], r3) || r3 === u2 && !(e4 in t5)) && ou(t5, e4, r3);
      }
      function ru(t5, e4, r3) {
        var n3 = t5[e4];
        Tt3.call(t5, e4) && Vo(n3, r3) && (r3 !== u2 || e4 in t5) || ou(t5, e4, r3);
      }
      function uu(t5, e4) {
        for (var r3 = t5.length; r3--; ) if (Vo(t5[r3][0], e4)) return r3;
        return -1;
      }
      function nu(t5, e4, r3, u3) {
        return pu(t5, function(t6, n3, i3) {
          e4(u3, t6, r3(t6), i3);
        }), u3;
      }
      function iu(t5, e4) {
        return t5 && kn(e4, Ra(e4), t5);
      }
      function ou(t5, e4, r3) {
        "__proto__" == e4 && ce3 ? ce3(t5, e4, { configurable: true, enumerable: true, value: r3, writable: true }) : t5[e4] = r3;
      }
      function au(t5, e4) {
        for (var r3 = -1, n3 = e4.length, i3 = ot3(n3), o3 = null == t5; ++r3 < n3; ) i3[r3] = o3 ? u2 : Oa(t5, e4[r3]);
        return i3;
      }
      function su(t5, e4, r3) {
        return t5 == t5 && (r3 !== u2 && (t5 = t5 <= r3 ? t5 : r3), e4 !== u2 && (t5 = t5 >= e4 ? t5 : e4)), t5;
      }
      function fu(t5, e4, r3, n3, i3, o3) {
        var a3, s3 = 1 & e4, f3 = 2 & e4, c3 = 4 & e4;
        if (r3 && (a3 = i3 ? r3(t5, n3, i3, o3) : r3(t5)), a3 !== u2) return a3;
        if (!ua(t5)) return t5;
        var l3 = Ko(t5);
        if (l3) {
          if (a3 = function(t6) {
            var e5 = t6.length, r4 = new t6.constructor(e5);
            e5 && "string" == typeof t6[0] && Tt3.call(t6, "index") && (r4.index = t6.index, r4.input = t6.input);
            return r4;
          }(t5), !s3) return jn(t5, a3);
        } else {
          var h3 = Ci(t5), p3 = h3 == y2 || h3 == E2;
          if (Yo(t5)) return _n(t5, s3);
          if (h3 == b2 || h3 == d2 || p3 && !i3) {
            if (a3 = f3 || p3 ? {} : Bi(t5), !s3) return f3 ? function(t6, e5) {
              return kn(t6, vi(t6), e5);
            }(t5, function(t6, e5) {
              return t6 && kn(e5, Sa(e5), t6);
            }(a3, t5)) : function(t6, e5) {
              return kn(t6, Di(t6), e5);
            }(t5, iu(a3, t5));
          } else {
            if (!oe2[h3]) return i3 ? t5 : {};
            a3 = function(t6, e5, r4) {
              var u3 = t6.constructor;
              switch (e5) {
                case N2:
                  return bn(t6);
                case g2:
                case A2:
                  return new u3(+t6);
                case R2:
                  return function(t7, e6) {
                    var r5 = e6 ? bn(t7.buffer) : t7.buffer;
                    return new t7.constructor(r5, t7.byteOffset, t7.byteLength);
                  }(t6, r4);
                case S2:
                case T2:
                case I2:
                case q2:
                case z2:
                case M2:
                case W2:
                case L2:
                case V2:
                  return wn(t6, r4);
                case m2:
                  return new u3();
                case _2:
                case P2:
                  return new u3(t6);
                case x2:
                  return function(t7) {
                    var e6 = new t7.constructor(t7.source, Dt2.exec(t7));
                    return e6.lastIndex = t7.lastIndex, e6;
                  }(t6);
                case O2:
                  return new u3();
                case j2:
                  return n4 = t6, zr ? wt3(zr.call(n4)) : {};
              }
              var n4;
            }(t5, h3, s3);
          }
        }
        o3 || (o3 = new Hr());
        var D3 = o3.get(t5);
        if (D3) return D3;
        o3.set(t5, a3), fa(t5) ? t5.forEach(function(u3) {
          a3.add(fu(u3, e4, r3, u3, t5, o3));
        }) : ia(t5) && t5.forEach(function(u3, n4) {
          a3.set(n4, fu(u3, e4, r3, n4, t5, o3));
        });
        var v3 = l3 ? u2 : (c3 ? f3 ? oi : ii : f3 ? Sa : Ra)(t5);
        return be2(v3 || t5, function(u3, n4) {
          v3 && (u3 = t5[n4 = u3]), ru(a3, n4, fu(u3, e4, r3, n4, t5, o3));
        }), a3;
      }
      function cu(t5, e4, r3) {
        var n3 = r3.length;
        if (null == t5) return !n3;
        for (t5 = wt3(t5); n3--; ) {
          var i3 = r3[n3], o3 = e4[i3], a3 = t5[i3];
          if (a3 === u2 && !(i3 in t5) || !o3(a3)) return false;
        }
        return true;
      }
      function lu(t5, e4, r3) {
        if ("function" != typeof t5) throw new Pt3(n2);
        return Ni(function() {
          t5.apply(u2, r3);
        }, e4);
      }
      function hu(t5, e4, r3, u3) {
        var n3 = -1, i3 = Pe2, o3 = true, a3 = t5.length, s3 = [], f3 = e4.length;
        if (!a3) return s3;
        r3 && (e4 = ke2(e4, He2(r3))), u3 ? (i3 = je2, o3 = false) : e4.length >= 200 && (i3 = Xe2, o3 = false, e4 = new Gr(e4));
        t: for (; ++n3 < a3; ) {
          var c3 = t5[n3], l3 = null == r3 ? c3 : r3(c3);
          if (c3 = u3 || 0 !== c3 ? c3 : 0, o3 && l3 == l3) {
            for (var h3 = f3; h3--; ) if (e4[h3] === l3) continue t;
            s3.push(c3);
          } else i3(e4, l3, u3) || s3.push(c3);
        }
        return s3;
      }
      Wr.templateSettings = { escape: Y2, evaluate: X2, interpolate: Q2, variable: "", imports: { _: Wr } }, Wr.prototype = Vr.prototype, Wr.prototype.constructor = Wr, $r.prototype = Lr(Vr.prototype), $r.prototype.constructor = $r, Ur.prototype = Lr(Vr.prototype), Ur.prototype.constructor = Ur, Zr.prototype.clear = function() {
        this.__data__ = Pr ? Pr(null) : {}, this.size = 0;
      }, Zr.prototype.delete = function(t5) {
        var e4 = this.has(t5) && delete this.__data__[t5];
        return this.size -= e4 ? 1 : 0, e4;
      }, Zr.prototype.get = function(t5) {
        var e4 = this.__data__;
        if (Pr) {
          var r3 = e4[t5];
          return r3 === i2 ? u2 : r3;
        }
        return Tt3.call(e4, t5) ? e4[t5] : u2;
      }, Zr.prototype.has = function(t5) {
        var e4 = this.__data__;
        return Pr ? e4[t5] !== u2 : Tt3.call(e4, t5);
      }, Zr.prototype.set = function(t5, e4) {
        var r3 = this.__data__;
        return this.size += this.has(t5) ? 0 : 1, r3[t5] = Pr && e4 === u2 ? i2 : e4, this;
      }, Kr.prototype.clear = function() {
        this.__data__ = [], this.size = 0;
      }, Kr.prototype.delete = function(t5) {
        var e4 = this.__data__, r3 = uu(e4, t5);
        return !(r3 < 0) && (r3 == e4.length - 1 ? e4.pop() : Ht3.call(e4, r3, 1), --this.size, true);
      }, Kr.prototype.get = function(t5) {
        var e4 = this.__data__, r3 = uu(e4, t5);
        return r3 < 0 ? u2 : e4[r3][1];
      }, Kr.prototype.has = function(t5) {
        return uu(this.__data__, t5) > -1;
      }, Kr.prototype.set = function(t5, e4) {
        var r3 = this.__data__, u3 = uu(r3, t5);
        return u3 < 0 ? (++this.size, r3.push([t5, e4])) : r3[u3][1] = e4, this;
      }, Jr.prototype.clear = function() {
        this.size = 0, this.__data__ = { hash: new Zr(), map: new (br || Kr)(), string: new Zr() };
      }, Jr.prototype.delete = function(t5) {
        var e4 = li(this, t5).delete(t5);
        return this.size -= e4 ? 1 : 0, e4;
      }, Jr.prototype.get = function(t5) {
        return li(this, t5).get(t5);
      }, Jr.prototype.has = function(t5) {
        return li(this, t5).has(t5);
      }, Jr.prototype.set = function(t5, e4) {
        var r3 = li(this, t5), u3 = r3.size;
        return r3.set(t5, e4), this.size += r3.size == u3 ? 0 : 1, this;
      }, Gr.prototype.add = Gr.prototype.push = function(t5) {
        return this.__data__.set(t5, i2), this;
      }, Gr.prototype.has = function(t5) {
        return this.__data__.has(t5);
      }, Hr.prototype.clear = function() {
        this.__data__ = new Kr(), this.size = 0;
      }, Hr.prototype.delete = function(t5) {
        var e4 = this.__data__, r3 = e4.delete(t5);
        return this.size = e4.size, r3;
      }, Hr.prototype.get = function(t5) {
        return this.__data__.get(t5);
      }, Hr.prototype.has = function(t5) {
        return this.__data__.has(t5);
      }, Hr.prototype.set = function(t5, e4) {
        var r3 = this.__data__;
        if (r3 instanceof Kr) {
          var u3 = r3.__data__;
          if (!br || u3.length < 199) return u3.push([t5, e4]), this.size = ++r3.size, this;
          r3 = this.__data__ = new Jr(u3);
        }
        return r3.set(t5, e4), this.size = r3.size, this;
      };
      var pu = Sn(Fu), Du = Sn(yu, true);
      function vu(t5, e4) {
        var r3 = true;
        return pu(t5, function(t6, u3, n3) {
          return r3 = !!e4(t6, u3, n3);
        }), r3;
      }
      function Cu(t5, e4, r3) {
        for (var n3 = -1, i3 = t5.length; ++n3 < i3; ) {
          var o3 = t5[n3], a3 = e4(o3);
          if (null != a3 && (s3 === u2 ? a3 == a3 && !la(a3) : r3(a3, s3))) var s3 = a3, f3 = o3;
        }
        return f3;
      }
      function du(t5, e4) {
        var r3 = [];
        return pu(t5, function(t6, u3, n3) {
          e4(t6, u3, n3) && r3.push(t6);
        }), r3;
      }
      function Bu(t5, e4, r3, u3, n3) {
        var i3 = -1, o3 = t5.length;
        for (r3 || (r3 = gi), n3 || (n3 = []); ++i3 < o3; ) {
          var a3 = t5[i3];
          e4 > 0 && r3(a3) ? e4 > 1 ? Bu(a3, e4 - 1, r3, u3, n3) : Ne2(n3, a3) : u3 || (n3[n3.length] = a3);
        }
        return n3;
      }
      var gu = Tn(), Au = Tn(true);
      function Fu(t5, e4) {
        return t5 && gu(t5, e4, Ra);
      }
      function yu(t5, e4) {
        return t5 && Au(t5, e4, Ra);
      }
      function Eu(t5, e4) {
        return Oe2(e4, function(e5) {
          return ta(t5[e5]);
        });
      }
      function mu(t5, e4) {
        for (var r3 = 0, n3 = (e4 = Fn(e4, t5)).length; null != t5 && r3 < n3; ) t5 = t5[zi(e4[r3++])];
        return r3 && r3 == n3 ? t5 : u2;
      }
      function _u(t5, e4, r3) {
        var u3 = e4(t5);
        return Ko(t5) ? u3 : Ne2(u3, r3(t5));
      }
      function bu(t5) {
        return null == t5 ? t5 === u2 ? "[object Undefined]" : "[object Null]" : ae3 && ae3 in wt3(t5) ? function(t6) {
          var e4 = Tt3.call(t6, ae3), r3 = t6[ae3];
          try {
            t6[ae3] = u2;
          } catch (t7) {
          }
          var n3 = zt3.call(t6);
          e4 ? t6[ae3] = r3 : delete t6[ae3];
          return n3;
        }(t5) : function(t6) {
          return zt3.call(t6);
        }(t5);
      }
      function wu(t5, e4) {
        return t5 > e4;
      }
      function xu(t5, e4) {
        return null != t5 && Tt3.call(t5, e4);
      }
      function Ou(t5, e4) {
        return null != t5 && e4 in wt3(t5);
      }
      function Pu(t5, e4, r3) {
        for (var n3 = r3 ? je2 : Pe2, i3 = t5[0].length, o3 = t5.length, a3 = o3, s3 = ot3(o3), f3 = 1 / 0, c3 = []; a3--; ) {
          var l3 = t5[a3];
          a3 && e4 && (l3 = ke2(l3, He2(e4))), f3 = Ar(l3.length, f3), s3[a3] = !r3 && (e4 || i3 >= 120 && l3.length >= 120) ? new Gr(a3 && l3) : u2;
        }
        l3 = t5[0];
        var h3 = -1, p3 = s3[0];
        t: for (; ++h3 < i3 && c3.length < f3; ) {
          var D3 = l3[h3], v3 = e4 ? e4(D3) : D3;
          if (D3 = r3 || 0 !== D3 ? D3 : 0, !(p3 ? Xe2(p3, v3) : n3(c3, v3, r3))) {
            for (a3 = o3; --a3; ) {
              var C3 = s3[a3];
              if (!(C3 ? Xe2(C3, v3) : n3(t5[a3], v3, r3))) continue t;
            }
            p3 && p3.push(v3), c3.push(D3);
          }
        }
        return c3;
      }
      function ju(t5, e4, r3) {
        var n3 = null == (t5 = Oi(t5, e4 = Fn(e4, t5))) ? t5 : t5[zi(Xi(e4))];
        return null == n3 ? u2 : me2(n3, t5, r3);
      }
      function ku(t5) {
        return na(t5) && bu(t5) == d2;
      }
      function Nu(t5, e4, r3, n3, i3) {
        return t5 === e4 || (null == t5 || null == e4 || !na(t5) && !na(e4) ? t5 != t5 && e4 != e4 : function(t6, e5, r4, n4, i4, o3) {
          var a3 = Ko(t6), s3 = Ko(e5), f3 = a3 ? B2 : Ci(t6), c3 = s3 ? B2 : Ci(e5), l3 = (f3 = f3 == d2 ? b2 : f3) == b2, h3 = (c3 = c3 == d2 ? b2 : c3) == b2, p3 = f3 == c3;
          if (p3 && Yo(t6)) {
            if (!Yo(e5)) return false;
            a3 = true, l3 = false;
          }
          if (p3 && !l3) return o3 || (o3 = new Hr()), a3 || ha(t6) ? ui(t6, e5, r4, n4, i4, o3) : function(t7, e6, r5, u3, n5, i5, o4) {
            switch (r5) {
              case R2:
                if (t7.byteLength != e6.byteLength || t7.byteOffset != e6.byteOffset) return false;
                t7 = t7.buffer, e6 = e6.buffer;
              case N2:
                return !(t7.byteLength != e6.byteLength || !i5(new Ut3(t7), new Ut3(e6)));
              case g2:
              case A2:
              case _2:
                return Vo(+t7, +e6);
              case F2:
                return t7.name == e6.name && t7.message == e6.message;
              case x2:
              case P2:
                return t7 == e6 + "";
              case m2:
                var a4 = or2;
              case O2:
                var s4 = 1 & u3;
                if (a4 || (a4 = fr2), t7.size != e6.size && !s4) return false;
                var f4 = o4.get(t7);
                if (f4) return f4 == e6;
                u3 |= 2, o4.set(t7, e6);
                var c4 = ui(a4(t7), a4(e6), u3, n5, i5, o4);
                return o4.delete(t7), c4;
              case j2:
                if (zr) return zr.call(t7) == zr.call(e6);
            }
            return false;
          }(t6, e5, f3, r4, n4, i4, o3);
          if (!(1 & r4)) {
            var D3 = l3 && Tt3.call(t6, "__wrapped__"), v3 = h3 && Tt3.call(e5, "__wrapped__");
            if (D3 || v3) {
              var C3 = D3 ? t6.value() : t6, y3 = v3 ? e5.value() : e5;
              return o3 || (o3 = new Hr()), i4(C3, y3, r4, n4, o3);
            }
          }
          if (!p3) return false;
          return o3 || (o3 = new Hr()), function(t7, e6, r5, n5, i5, o4) {
            var a4 = 1 & r5, s4 = ii(t7), f4 = s4.length, c4 = ii(e6).length;
            if (f4 != c4 && !a4) return false;
            var l4 = f4;
            for (; l4--; ) {
              var h4 = s4[l4];
              if (!(a4 ? h4 in e6 : Tt3.call(e6, h4))) return false;
            }
            var p4 = o4.get(t7), D4 = o4.get(e6);
            if (p4 && D4) return p4 == e6 && D4 == t7;
            var v4 = true;
            o4.set(t7, e6), o4.set(e6, t7);
            var C4 = a4;
            for (; ++l4 < f4; ) {
              var d3 = t7[h4 = s4[l4]], B3 = e6[h4];
              if (n5) var g3 = a4 ? n5(B3, d3, h4, e6, t7, o4) : n5(d3, B3, h4, t7, e6, o4);
              if (!(g3 === u2 ? d3 === B3 || i5(d3, B3, r5, n5, o4) : g3)) {
                v4 = false;
                break;
              }
              C4 || (C4 = "constructor" == h4);
            }
            if (v4 && !C4) {
              var A3 = t7.constructor, F3 = e6.constructor;
              A3 == F3 || !("constructor" in t7) || !("constructor" in e6) || "function" == typeof A3 && A3 instanceof A3 && "function" == typeof F3 && F3 instanceof F3 || (v4 = false);
            }
            return o4.delete(t7), o4.delete(e6), v4;
          }(t6, e5, r4, n4, i4, o3);
        }(t5, e4, r3, n3, Nu, i3));
      }
      function Ru(t5, e4, r3, n3) {
        var i3 = r3.length, o3 = i3, a3 = !n3;
        if (null == t5) return !o3;
        for (t5 = wt3(t5); i3--; ) {
          var s3 = r3[i3];
          if (a3 && s3[2] ? s3[1] !== t5[s3[0]] : !(s3[0] in t5)) return false;
        }
        for (; ++i3 < o3; ) {
          var f3 = (s3 = r3[i3])[0], c3 = t5[f3], l3 = s3[1];
          if (a3 && s3[2]) {
            if (c3 === u2 && !(f3 in t5)) return false;
          } else {
            var h3 = new Hr();
            if (n3) var p3 = n3(c3, l3, f3, t5, e4, h3);
            if (!(p3 === u2 ? Nu(l3, c3, 3, n3, h3) : p3)) return false;
          }
        }
        return true;
      }
      function Su(t5) {
        return !(!ua(t5) || (e4 = t5, qt3 && qt3 in e4)) && (ta(t5) ? Lt3 : dt2).test(Mi(t5));
        var e4;
      }
      function Tu(t5) {
        return "function" == typeof t5 ? t5 : null == t5 ? os : "object" == typeof t5 ? Ko(t5) ? Lu(t5[0], t5[1]) : Wu(t5) : vs(t5);
      }
      function Iu(t5) {
        if (!_i(t5)) return Br(t5);
        var e4 = [];
        for (var r3 in wt3(t5)) Tt3.call(t5, r3) && "constructor" != r3 && e4.push(r3);
        return e4;
      }
      function qu(t5) {
        if (!ua(t5)) return function(t6) {
          var e5 = [];
          if (null != t6) for (var r4 in wt3(t6)) e5.push(r4);
          return e5;
        }(t5);
        var e4 = _i(t5), r3 = [];
        for (var u3 in t5) ("constructor" != u3 || !e4 && Tt3.call(t5, u3)) && r3.push(u3);
        return r3;
      }
      function zu(t5, e4) {
        return t5 < e4;
      }
      function Mu(t5, e4) {
        var r3 = -1, u3 = Go(t5) ? ot3(t5.length) : [];
        return pu(t5, function(t6, n3, i3) {
          u3[++r3] = e4(t6, n3, i3);
        }), u3;
      }
      function Wu(t5) {
        var e4 = hi(t5);
        return 1 == e4.length && e4[0][2] ? wi(e4[0][0], e4[0][1]) : function(r3) {
          return r3 === t5 || Ru(r3, t5, e4);
        };
      }
      function Lu(t5, e4) {
        return yi(t5) && bi(e4) ? wi(zi(t5), e4) : function(r3) {
          var n3 = Oa(r3, t5);
          return n3 === u2 && n3 === e4 ? Pa(r3, t5) : Nu(e4, n3, 3);
        };
      }
      function Vu(t5, e4, r3, n3, i3) {
        t5 !== e4 && gu(e4, function(o3, a3) {
          if (i3 || (i3 = new Hr()), ua(o3)) !function(t6, e5, r4, n4, i4, o4, a4) {
            var s4 = ji(t6, r4), f3 = ji(e5, r4), c3 = a4.get(f3);
            if (c3) return void eu(t6, r4, c3);
            var l3 = o4 ? o4(s4, f3, r4 + "", t6, e5, a4) : u2, h3 = l3 === u2;
            if (h3) {
              var p3 = Ko(f3), D3 = !p3 && Yo(f3), v3 = !p3 && !D3 && ha(f3);
              l3 = f3, p3 || D3 || v3 ? Ko(s4) ? l3 = s4 : Ho(s4) ? l3 = jn(s4) : D3 ? (h3 = false, l3 = _n(f3, true)) : v3 ? (h3 = false, l3 = wn(f3, true)) : l3 = [] : aa(f3) || Zo(f3) ? (l3 = s4, Zo(s4) ? l3 = Aa(s4) : ua(s4) && !ta(s4) || (l3 = Bi(f3))) : h3 = false;
            }
            h3 && (a4.set(f3, l3), i4(l3, f3, n4, o4, a4), a4.delete(f3));
            eu(t6, r4, l3);
          }(t5, e4, a3, r3, Vu, n3, i3);
          else {
            var s3 = n3 ? n3(ji(t5, a3), o3, a3 + "", t5, e4, i3) : u2;
            s3 === u2 && (s3 = o3), eu(t5, a3, s3);
          }
        }, Sa);
      }
      function $u(t5, e4) {
        var r3 = t5.length;
        if (r3) return Ai(e4 += e4 < 0 ? r3 : 0, r3) ? t5[e4] : u2;
      }
      function Uu(t5, e4, r3) {
        e4 = e4.length ? ke2(e4, function(t6) {
          return Ko(t6) ? function(e5) {
            return mu(e5, 1 === t6.length ? t6[0] : t6);
          } : t6;
        }) : [os];
        var u3 = -1;
        e4 = ke2(e4, He2(ci()));
        var n3 = Mu(t5, function(t6, r4, n4) {
          var i3 = ke2(e4, function(e5) {
            return e5(t6);
          });
          return { criteria: i3, index: ++u3, value: t6 };
        });
        return function(t6, e5) {
          var r4 = t6.length;
          for (t6.sort(e5); r4--; ) t6[r4] = t6[r4].value;
          return t6;
        }(n3, function(t6, e5) {
          return function(t7, e6, r4) {
            var u4 = -1, n4 = t7.criteria, i3 = e6.criteria, o3 = n4.length, a3 = r4.length;
            for (; ++u4 < o3; ) {
              var s3 = xn(n4[u4], i3[u4]);
              if (s3) return u4 >= a3 ? s3 : s3 * ("desc" == r4[u4] ? -1 : 1);
            }
            return t7.index - e6.index;
          }(t6, e5, r3);
        });
      }
      function Zu(t5, e4, r3) {
        for (var u3 = -1, n3 = e4.length, i3 = {}; ++u3 < n3; ) {
          var o3 = e4[u3], a3 = mu(t5, o3);
          r3(a3, o3) && tn(i3, Fn(o3, t5), a3);
        }
        return i3;
      }
      function Ku(t5, e4, r3, u3) {
        var n3 = u3 ? We2 : Me2, i3 = -1, o3 = e4.length, a3 = t5;
        for (t5 === e4 && (e4 = jn(e4)), r3 && (a3 = ke2(t5, He2(r3))); ++i3 < o3; ) for (var s3 = 0, f3 = e4[i3], c3 = r3 ? r3(f3) : f3; (s3 = n3(a3, c3, s3, u3)) > -1; ) a3 !== t5 && Ht3.call(a3, s3, 1), Ht3.call(t5, s3, 1);
        return t5;
      }
      function Ju(t5, e4) {
        for (var r3 = t5 ? e4.length : 0, u3 = r3 - 1; r3--; ) {
          var n3 = e4[r3];
          if (r3 == u3 || n3 !== i3) {
            var i3 = n3;
            Ai(n3) ? Ht3.call(t5, n3, 1) : pn(t5, n3);
          }
        }
        return t5;
      }
      function Gu(t5, e4) {
        return t5 + de3(Er() * (e4 - t5 + 1));
      }
      function Hu(t5, e4) {
        var r3 = "";
        if (!t5 || e4 < 1 || e4 > p2) return r3;
        do {
          e4 % 2 && (r3 += t5), (e4 = de3(e4 / 2)) && (t5 += t5);
        } while (e4);
        return r3;
      }
      function Yu(t5, e4) {
        return Ri(xi(t5, e4, os), t5 + "");
      }
      function Xu(t5) {
        return Xr(Va(t5));
      }
      function Qu(t5, e4) {
        var r3 = Va(t5);
        return Ii(r3, su(e4, 0, r3.length));
      }
      function tn(t5, e4, r3, n3) {
        if (!ua(t5)) return t5;
        for (var i3 = -1, o3 = (e4 = Fn(e4, t5)).length, a3 = o3 - 1, s3 = t5; null != s3 && ++i3 < o3; ) {
          var f3 = zi(e4[i3]), c3 = r3;
          if ("__proto__" === f3 || "constructor" === f3 || "prototype" === f3) return t5;
          if (i3 != a3) {
            var l3 = s3[f3];
            (c3 = n3 ? n3(l3, f3, s3) : u2) === u2 && (c3 = ua(l3) ? l3 : Ai(e4[i3 + 1]) ? [] : {});
          }
          ru(s3, f3, c3), s3 = s3[f3];
        }
        return t5;
      }
      var en = jr ? function(t5, e4) {
        return jr.set(t5, e4), t5;
      } : os, rn = ce3 ? function(t5, e4) {
        return ce3(t5, "toString", { configurable: true, enumerable: false, value: us(e4), writable: true });
      } : os;
      function un(t5) {
        return Ii(Va(t5));
      }
      function nn(t5, e4, r3) {
        var u3 = -1, n3 = t5.length;
        e4 < 0 && (e4 = -e4 > n3 ? 0 : n3 + e4), (r3 = r3 > n3 ? n3 : r3) < 0 && (r3 += n3), n3 = e4 > r3 ? 0 : r3 - e4 >>> 0, e4 >>>= 0;
        for (var i3 = ot3(n3); ++u3 < n3; ) i3[u3] = t5[u3 + e4];
        return i3;
      }
      function on(t5, e4) {
        var r3;
        return pu(t5, function(t6, u3, n3) {
          return !(r3 = e4(t6, u3, n3));
        }), !!r3;
      }
      function an(t5, e4, r3) {
        var u3 = 0, n3 = null == t5 ? u3 : t5.length;
        if ("number" == typeof e4 && e4 == e4 && n3 <= 2147483647) {
          for (; u3 < n3; ) {
            var i3 = u3 + n3 >>> 1, o3 = t5[i3];
            null !== o3 && !la(o3) && (r3 ? o3 <= e4 : o3 < e4) ? u3 = i3 + 1 : n3 = i3;
          }
          return n3;
        }
        return sn(t5, e4, os, r3);
      }
      function sn(t5, e4, r3, n3) {
        var i3 = 0, o3 = null == t5 ? 0 : t5.length;
        if (0 === o3) return 0;
        for (var a3 = (e4 = r3(e4)) != e4, s3 = null === e4, f3 = la(e4), c3 = e4 === u2; i3 < o3; ) {
          var l3 = de3((i3 + o3) / 2), h3 = r3(t5[l3]), p3 = h3 !== u2, D3 = null === h3, v3 = h3 == h3, C3 = la(h3);
          if (a3) var d3 = n3 || v3;
          else d3 = c3 ? v3 && (n3 || p3) : s3 ? v3 && p3 && (n3 || !D3) : f3 ? v3 && p3 && !D3 && (n3 || !C3) : !D3 && !C3 && (n3 ? h3 <= e4 : h3 < e4);
          d3 ? i3 = l3 + 1 : o3 = l3;
        }
        return Ar(o3, 4294967294);
      }
      function fn(t5, e4) {
        for (var r3 = -1, u3 = t5.length, n3 = 0, i3 = []; ++r3 < u3; ) {
          var o3 = t5[r3], a3 = e4 ? e4(o3) : o3;
          if (!r3 || !Vo(a3, s3)) {
            var s3 = a3;
            i3[n3++] = 0 === o3 ? 0 : o3;
          }
        }
        return i3;
      }
      function cn(t5) {
        return "number" == typeof t5 ? t5 : la(t5) ? D2 : +t5;
      }
      function ln(t5) {
        if ("string" == typeof t5) return t5;
        if (Ko(t5)) return ke2(t5, ln) + "";
        if (la(t5)) return Mr ? Mr.call(t5) : "";
        var e4 = t5 + "";
        return "0" == e4 && 1 / t5 == -1 / 0 ? "-0" : e4;
      }
      function hn(t5, e4, r3) {
        var u3 = -1, n3 = Pe2, i3 = t5.length, o3 = true, a3 = [], s3 = a3;
        if (r3) o3 = false, n3 = je2;
        else if (i3 >= 200) {
          var f3 = e4 ? null : Yn(t5);
          if (f3) return fr2(f3);
          o3 = false, n3 = Xe2, s3 = new Gr();
        } else s3 = e4 ? [] : a3;
        t: for (; ++u3 < i3; ) {
          var c3 = t5[u3], l3 = e4 ? e4(c3) : c3;
          if (c3 = r3 || 0 !== c3 ? c3 : 0, o3 && l3 == l3) {
            for (var h3 = s3.length; h3--; ) if (s3[h3] === l3) continue t;
            e4 && s3.push(l3), a3.push(c3);
          } else n3(s3, l3, r3) || (s3 !== a3 && s3.push(l3), a3.push(c3));
        }
        return a3;
      }
      function pn(t5, e4) {
        return null == (t5 = Oi(t5, e4 = Fn(e4, t5))) || delete t5[zi(Xi(e4))];
      }
      function Dn(t5, e4, r3, u3) {
        return tn(t5, e4, r3(mu(t5, e4)), u3);
      }
      function vn(t5, e4, r3, u3) {
        for (var n3 = t5.length, i3 = u3 ? n3 : -1; (u3 ? i3-- : ++i3 < n3) && e4(t5[i3], i3, t5); ) ;
        return r3 ? nn(t5, u3 ? 0 : i3, u3 ? i3 + 1 : n3) : nn(t5, u3 ? i3 + 1 : 0, u3 ? n3 : i3);
      }
      function Cn(t5, e4) {
        var r3 = t5;
        return r3 instanceof Ur && (r3 = r3.value()), Re2(e4, function(t6, e5) {
          return e5.func.apply(e5.thisArg, Ne2([t6], e5.args));
        }, r3);
      }
      function dn(t5, e4, r3) {
        var u3 = t5.length;
        if (u3 < 2) return u3 ? hn(t5[0]) : [];
        for (var n3 = -1, i3 = ot3(u3); ++n3 < u3; ) for (var o3 = t5[n3], a3 = -1; ++a3 < u3; ) a3 != n3 && (i3[n3] = hu(i3[n3] || o3, t5[a3], e4, r3));
        return hn(Bu(i3, 1), e4, r3);
      }
      function Bn(t5, e4, r3) {
        for (var n3 = -1, i3 = t5.length, o3 = e4.length, a3 = {}; ++n3 < i3; ) {
          var s3 = n3 < o3 ? e4[n3] : u2;
          r3(a3, t5[n3], s3);
        }
        return a3;
      }
      function gn(t5) {
        return Ho(t5) ? t5 : [];
      }
      function An(t5) {
        return "function" == typeof t5 ? t5 : os;
      }
      function Fn(t5, e4) {
        return Ko(t5) ? t5 : yi(t5, e4) ? [t5] : qi(Fa(t5));
      }
      var yn = Yu;
      function En(t5, e4, r3) {
        var n3 = t5.length;
        return r3 = r3 === u2 ? n3 : r3, !e4 && r3 >= n3 ? t5 : nn(t5, e4, r3);
      }
      var mn = le3 || function(t5) {
        return he2.clearTimeout(t5);
      };
      function _n(t5, e4) {
        if (e4) return t5.slice();
        var r3 = t5.length, u3 = Zt3 ? Zt3(r3) : new t5.constructor(r3);
        return t5.copy(u3), u3;
      }
      function bn(t5) {
        var e4 = new t5.constructor(t5.byteLength);
        return new Ut3(e4).set(new Ut3(t5)), e4;
      }
      function wn(t5, e4) {
        var r3 = e4 ? bn(t5.buffer) : t5.buffer;
        return new t5.constructor(r3, t5.byteOffset, t5.length);
      }
      function xn(t5, e4) {
        if (t5 !== e4) {
          var r3 = t5 !== u2, n3 = null === t5, i3 = t5 == t5, o3 = la(t5), a3 = e4 !== u2, s3 = null === e4, f3 = e4 == e4, c3 = la(e4);
          if (!s3 && !c3 && !o3 && t5 > e4 || o3 && a3 && f3 && !s3 && !c3 || n3 && a3 && f3 || !r3 && f3 || !i3) return 1;
          if (!n3 && !o3 && !c3 && t5 < e4 || c3 && r3 && i3 && !n3 && !o3 || s3 && r3 && i3 || !a3 && i3 || !f3) return -1;
        }
        return 0;
      }
      function On(t5, e4, r3, u3) {
        for (var n3 = -1, i3 = t5.length, o3 = r3.length, a3 = -1, s3 = e4.length, f3 = gr(i3 - o3, 0), c3 = ot3(s3 + f3), l3 = !u3; ++a3 < s3; ) c3[a3] = e4[a3];
        for (; ++n3 < o3; ) (l3 || n3 < i3) && (c3[r3[n3]] = t5[n3]);
        for (; f3--; ) c3[a3++] = t5[n3++];
        return c3;
      }
      function Pn(t5, e4, r3, u3) {
        for (var n3 = -1, i3 = t5.length, o3 = -1, a3 = r3.length, s3 = -1, f3 = e4.length, c3 = gr(i3 - a3, 0), l3 = ot3(c3 + f3), h3 = !u3; ++n3 < c3; ) l3[n3] = t5[n3];
        for (var p3 = n3; ++s3 < f3; ) l3[p3 + s3] = e4[s3];
        for (; ++o3 < a3; ) (h3 || n3 < i3) && (l3[p3 + r3[o3]] = t5[n3++]);
        return l3;
      }
      function jn(t5, e4) {
        var r3 = -1, u3 = t5.length;
        for (e4 || (e4 = ot3(u3)); ++r3 < u3; ) e4[r3] = t5[r3];
        return e4;
      }
      function kn(t5, e4, r3, n3) {
        var i3 = !r3;
        r3 || (r3 = {});
        for (var o3 = -1, a3 = e4.length; ++o3 < a3; ) {
          var s3 = e4[o3], f3 = n3 ? n3(r3[s3], t5[s3], s3, r3, t5) : u2;
          f3 === u2 && (f3 = t5[s3]), i3 ? ou(r3, s3, f3) : ru(r3, s3, f3);
        }
        return r3;
      }
      function Nn(t5, e4) {
        return function(r3, u3) {
          var n3 = Ko(r3) ? _e2 : nu, i3 = e4 ? e4() : {};
          return n3(r3, t5, ci(u3, 2), i3);
        };
      }
      function Rn(t5) {
        return Yu(function(e4, r3) {
          var n3 = -1, i3 = r3.length, o3 = i3 > 1 ? r3[i3 - 1] : u2, a3 = i3 > 2 ? r3[2] : u2;
          for (o3 = t5.length > 3 && "function" == typeof o3 ? (i3--, o3) : u2, a3 && Fi(r3[0], r3[1], a3) && (o3 = i3 < 3 ? u2 : o3, i3 = 1), e4 = wt3(e4); ++n3 < i3; ) {
            var s3 = r3[n3];
            s3 && t5(e4, s3, n3, o3);
          }
          return e4;
        });
      }
      function Sn(t5, e4) {
        return function(r3, u3) {
          if (null == r3) return r3;
          if (!Go(r3)) return t5(r3, u3);
          for (var n3 = r3.length, i3 = e4 ? n3 : -1, o3 = wt3(r3); (e4 ? i3-- : ++i3 < n3) && false !== u3(o3[i3], i3, o3); ) ;
          return r3;
        };
      }
      function Tn(t5) {
        return function(e4, r3, u3) {
          for (var n3 = -1, i3 = wt3(e4), o3 = u3(e4), a3 = o3.length; a3--; ) {
            var s3 = o3[t5 ? a3 : ++n3];
            if (false === r3(i3[s3], s3, i3)) break;
          }
          return e4;
        };
      }
      function In(t5) {
        return function(e4) {
          var r3 = ir2(e4 = Fa(e4)) ? hr(e4) : u2, n3 = r3 ? r3[0] : e4.charAt(0), i3 = r3 ? En(r3, 1).join("") : e4.slice(1);
          return n3[t5]() + i3;
        };
      }
      function qn(t5) {
        return function(e4) {
          return Re2(ts(Za(e4).replace(Yt2, "")), t5, "");
        };
      }
      function zn(t5) {
        return function() {
          var e4 = arguments;
          switch (e4.length) {
            case 0:
              return new t5();
            case 1:
              return new t5(e4[0]);
            case 2:
              return new t5(e4[0], e4[1]);
            case 3:
              return new t5(e4[0], e4[1], e4[2]);
            case 4:
              return new t5(e4[0], e4[1], e4[2], e4[3]);
            case 5:
              return new t5(e4[0], e4[1], e4[2], e4[3], e4[4]);
            case 6:
              return new t5(e4[0], e4[1], e4[2], e4[3], e4[4], e4[5]);
            case 7:
              return new t5(e4[0], e4[1], e4[2], e4[3], e4[4], e4[5], e4[6]);
          }
          var r3 = Lr(t5.prototype), u3 = t5.apply(r3, e4);
          return ua(u3) ? u3 : r3;
        };
      }
      function Mn(t5) {
        return function(e4, r3, n3) {
          var i3 = wt3(e4);
          if (!Go(e4)) {
            var o3 = ci(r3, 3);
            e4 = Ra(e4), r3 = function(t6) {
              return o3(i3[t6], t6, i3);
            };
          }
          var a3 = t5(e4, r3, n3);
          return a3 > -1 ? i3[o3 ? e4[a3] : a3] : u2;
        };
      }
      function Wn(t5) {
        return ni(function(e4) {
          var r3 = e4.length, i3 = r3, o3 = $r.prototype.thru;
          for (t5 && e4.reverse(); i3--; ) {
            var a3 = e4[i3];
            if ("function" != typeof a3) throw new Pt3(n2);
            if (o3 && !s3 && "wrapper" == si(a3)) var s3 = new $r([], true);
          }
          for (i3 = s3 ? i3 : r3; ++i3 < r3; ) {
            var f3 = si(a3 = e4[i3]), c3 = "wrapper" == f3 ? ai(a3) : u2;
            s3 = c3 && Ei(c3[0]) && 424 == c3[1] && !c3[4].length && 1 == c3[9] ? s3[si(c3[0])].apply(s3, c3[3]) : 1 == a3.length && Ei(a3) ? s3[f3]() : s3.thru(a3);
          }
          return function() {
            var t6 = arguments, u3 = t6[0];
            if (s3 && 1 == t6.length && Ko(u3)) return s3.plant(u3).value();
            for (var n3 = 0, i4 = r3 ? e4[n3].apply(this, t6) : u3; ++n3 < r3; ) i4 = e4[n3].call(this, i4);
            return i4;
          };
        });
      }
      function Ln(t5, e4, r3, n3, i3, o3, a3, s3, f3, l3) {
        var h3 = e4 & c2, p3 = 1 & e4, D3 = 2 & e4, v3 = 24 & e4, C3 = 512 & e4, d3 = D3 ? u2 : zn(t5);
        return function u3() {
          for (var c3 = arguments.length, B3 = ot3(c3), g3 = c3; g3--; ) B3[g3] = arguments[g3];
          if (v3) var A3 = fi(u3), F3 = er2(B3, A3);
          if (n3 && (B3 = On(B3, n3, i3, v3)), o3 && (B3 = Pn(B3, o3, a3, v3)), c3 -= F3, v3 && c3 < l3) {
            var y3 = sr2(B3, A3);
            return Gn(t5, e4, Ln, u3.placeholder, r3, B3, y3, s3, f3, l3 - c3);
          }
          var E3 = p3 ? r3 : this, m3 = D3 ? E3[t5] : t5;
          return c3 = B3.length, s3 ? B3 = Pi(B3, s3) : C3 && c3 > 1 && B3.reverse(), h3 && f3 < c3 && (B3.length = f3), this && this !== he2 && this instanceof u3 && (m3 = d3 || zn(m3)), m3.apply(E3, B3);
        };
      }
      function Vn(t5, e4) {
        return function(r3, u3) {
          return function(t6, e5, r4, u4) {
            return Fu(t6, function(t7, n3, i3) {
              e5(u4, r4(t7), n3, i3);
            }), u4;
          }(r3, t5, e4(u3), {});
        };
      }
      function $n(t5, e4) {
        return function(r3, n3) {
          var i3;
          if (r3 === u2 && n3 === u2) return e4;
          if (r3 !== u2 && (i3 = r3), n3 !== u2) {
            if (i3 === u2) return n3;
            "string" == typeof r3 || "string" == typeof n3 ? (r3 = ln(r3), n3 = ln(n3)) : (r3 = cn(r3), n3 = cn(n3)), i3 = t5(r3, n3);
          }
          return i3;
        };
      }
      function Un(t5) {
        return ni(function(e4) {
          return e4 = ke2(e4, He2(ci())), Yu(function(r3) {
            var u3 = this;
            return t5(e4, function(t6) {
              return me2(t6, u3, r3);
            });
          });
        });
      }
      function Zn(t5, e4) {
        var r3 = (e4 = e4 === u2 ? " " : ln(e4)).length;
        if (r3 < 2) return r3 ? Hu(e4, t5) : e4;
        var n3 = Hu(e4, Ce3(t5 / lr(e4)));
        return ir2(e4) ? En(hr(n3), 0, t5).join("") : n3.slice(0, t5);
      }
      function Kn(t5) {
        return function(e4, r3, n3) {
          return n3 && "number" != typeof n3 && Fi(e4, r3, n3) && (r3 = n3 = u2), e4 = Ca(e4), r3 === u2 ? (r3 = e4, e4 = 0) : r3 = Ca(r3), function(t6, e5, r4, u3) {
            for (var n4 = -1, i3 = gr(Ce3((e5 - t6) / (r4 || 1)), 0), o3 = ot3(i3); i3--; ) o3[u3 ? i3 : ++n4] = t6, t6 += r4;
            return o3;
          }(e4, r3, n3 = n3 === u2 ? e4 < r3 ? 1 : -1 : Ca(n3), t5);
        };
      }
      function Jn(t5) {
        return function(e4, r3) {
          return "string" == typeof e4 && "string" == typeof r3 || (e4 = ga(e4), r3 = ga(r3)), t5(e4, r3);
        };
      }
      function Gn(t5, e4, r3, n3, i3, o3, a3, c3, l3, h3) {
        var p3 = 8 & e4;
        e4 |= p3 ? s2 : f2, 4 & (e4 &= ~(p3 ? f2 : s2)) || (e4 &= -4);
        var D3 = [t5, e4, i3, p3 ? o3 : u2, p3 ? a3 : u2, p3 ? u2 : o3, p3 ? u2 : a3, c3, l3, h3], v3 = r3.apply(u2, D3);
        return Ei(t5) && ki(v3, D3), v3.placeholder = n3, Si(v3, t5, e4);
      }
      function Hn(t5) {
        var e4 = bt3[t5];
        return function(t6, r3) {
          if (t6 = ga(t6), (r3 = null == r3 ? 0 : Ar(da(r3), 292)) && Cr(t6)) {
            var u3 = (Fa(t6) + "e").split("e");
            return +((u3 = (Fa(e4(u3[0] + "e" + (+u3[1] + r3))) + "e").split("e"))[0] + "e" + (+u3[1] - r3));
          }
          return e4(t6);
        };
      }
      var Yn = xr && 1 / fr2(new xr([, -0]))[1] == h2 ? function(t5) {
        return new xr(t5);
      } : ls;
      function Xn(t5) {
        return function(e4) {
          var r3 = Ci(e4);
          return r3 == m2 ? or2(e4) : r3 == O2 ? cr2(e4) : function(t6, e5) {
            return ke2(e5, function(e6) {
              return [e6, t6[e6]];
            });
          }(e4, t5(e4));
        };
      }
      function Qn(t5, e4, r3, i3, h3, p3, D3, v3) {
        var C3 = 2 & e4;
        if (!C3 && "function" != typeof t5) throw new Pt3(n2);
        var d3 = i3 ? i3.length : 0;
        if (d3 || (e4 &= -97, i3 = h3 = u2), D3 = D3 === u2 ? D3 : gr(da(D3), 0), v3 = v3 === u2 ? v3 : da(v3), d3 -= h3 ? h3.length : 0, e4 & f2) {
          var B3 = i3, g3 = h3;
          i3 = h3 = u2;
        }
        var A3 = C3 ? u2 : ai(t5), F3 = [t5, e4, r3, i3, h3, B3, g3, p3, D3, v3];
        if (A3 && function(t6, e5) {
          var r4 = t6[1], u3 = e5[1], n3 = r4 | u3, i4 = n3 < 131, a3 = u3 == c2 && 8 == r4 || u3 == c2 && r4 == l2 && t6[7].length <= e5[8] || 384 == u3 && e5[7].length <= e5[8] && 8 == r4;
          if (!i4 && !a3) return t6;
          1 & u3 && (t6[2] = e5[2], n3 |= 1 & r4 ? 0 : 4);
          var s3 = e5[3];
          if (s3) {
            var f3 = t6[3];
            t6[3] = f3 ? On(f3, s3, e5[4]) : s3, t6[4] = f3 ? sr2(t6[3], o2) : e5[4];
          }
          (s3 = e5[5]) && (f3 = t6[5], t6[5] = f3 ? Pn(f3, s3, e5[6]) : s3, t6[6] = f3 ? sr2(t6[5], o2) : e5[6]);
          (s3 = e5[7]) && (t6[7] = s3);
          u3 & c2 && (t6[8] = null == t6[8] ? e5[8] : Ar(t6[8], e5[8]));
          null == t6[9] && (t6[9] = e5[9]);
          t6[0] = e5[0], t6[1] = n3;
        }(F3, A3), t5 = F3[0], e4 = F3[1], r3 = F3[2], i3 = F3[3], h3 = F3[4], !(v3 = F3[9] = F3[9] === u2 ? C3 ? 0 : t5.length : gr(F3[9] - d3, 0)) && 24 & e4 && (e4 &= -25), e4 && 1 != e4) y3 = 8 == e4 || e4 == a2 ? function(t6, e5, r4) {
          var n3 = zn(t6);
          return function i4() {
            for (var o3 = arguments.length, a3 = ot3(o3), s3 = o3, f3 = fi(i4); s3--; ) a3[s3] = arguments[s3];
            var c3 = o3 < 3 && a3[0] !== f3 && a3[o3 - 1] !== f3 ? [] : sr2(a3, f3);
            return (o3 -= c3.length) < r4 ? Gn(t6, e5, Ln, i4.placeholder, u2, a3, c3, u2, u2, r4 - o3) : me2(this && this !== he2 && this instanceof i4 ? n3 : t6, this, a3);
          };
        }(t5, e4, v3) : e4 != s2 && 33 != e4 || h3.length ? Ln.apply(u2, F3) : function(t6, e5, r4, u3) {
          var n3 = 1 & e5, i4 = zn(t6);
          return function e6() {
            for (var o3 = -1, a3 = arguments.length, s3 = -1, f3 = u3.length, c3 = ot3(f3 + a3), l3 = this && this !== he2 && this instanceof e6 ? i4 : t6; ++s3 < f3; ) c3[s3] = u3[s3];
            for (; a3--; ) c3[s3++] = arguments[++o3];
            return me2(l3, n3 ? r4 : this, c3);
          };
        }(t5, e4, r3, i3);
        else var y3 = function(t6, e5, r4) {
          var u3 = 1 & e5, n3 = zn(t6);
          return function e6() {
            return (this && this !== he2 && this instanceof e6 ? n3 : t6).apply(u3 ? r4 : this, arguments);
          };
        }(t5, e4, r3);
        return Si((A3 ? en : ki)(y3, F3), t5, e4);
      }
      function ti(t5, e4, r3, n3) {
        return t5 === u2 || Vo(t5, Nt3[r3]) && !Tt3.call(n3, r3) ? e4 : t5;
      }
      function ei(t5, e4, r3, n3, i3, o3) {
        return ua(t5) && ua(e4) && (o3.set(e4, t5), Vu(t5, e4, u2, ei, o3), o3.delete(e4)), t5;
      }
      function ri(t5) {
        return aa(t5) ? u2 : t5;
      }
      function ui(t5, e4, r3, n3, i3, o3) {
        var a3 = 1 & r3, s3 = t5.length, f3 = e4.length;
        if (s3 != f3 && !(a3 && f3 > s3)) return false;
        var c3 = o3.get(t5), l3 = o3.get(e4);
        if (c3 && l3) return c3 == e4 && l3 == t5;
        var h3 = -1, p3 = true, D3 = 2 & r3 ? new Gr() : u2;
        for (o3.set(t5, e4), o3.set(e4, t5); ++h3 < s3; ) {
          var v3 = t5[h3], C3 = e4[h3];
          if (n3) var d3 = a3 ? n3(C3, v3, h3, e4, t5, o3) : n3(v3, C3, h3, t5, e4, o3);
          if (d3 !== u2) {
            if (d3) continue;
            p3 = false;
            break;
          }
          if (D3) {
            if (!Te2(e4, function(t6, e5) {
              if (!Xe2(D3, e5) && (v3 === t6 || i3(v3, t6, r3, n3, o3))) return D3.push(e5);
            })) {
              p3 = false;
              break;
            }
          } else if (v3 !== C3 && !i3(v3, C3, r3, n3, o3)) {
            p3 = false;
            break;
          }
        }
        return o3.delete(t5), o3.delete(e4), p3;
      }
      function ni(t5) {
        return Ri(xi(t5, u2, Ki), t5 + "");
      }
      function ii(t5) {
        return _u(t5, Ra, Di);
      }
      function oi(t5) {
        return _u(t5, Sa, vi);
      }
      var ai = jr ? function(t5) {
        return jr.get(t5);
      } : ls;
      function si(t5) {
        for (var e4 = t5.name + "", r3 = kr[e4], u3 = Tt3.call(kr, e4) ? r3.length : 0; u3--; ) {
          var n3 = r3[u3], i3 = n3.func;
          if (null == i3 || i3 == t5) return n3.name;
        }
        return e4;
      }
      function fi(t5) {
        return (Tt3.call(Wr, "placeholder") ? Wr : t5).placeholder;
      }
      function ci() {
        var t5 = Wr.iteratee || as;
        return t5 = t5 === as ? Tu : t5, arguments.length ? t5(arguments[0], arguments[1]) : t5;
      }
      function li(t5, e4) {
        var r3, u3, n3 = t5.__data__;
        return ("string" == (u3 = typeof (r3 = e4)) || "number" == u3 || "symbol" == u3 || "boolean" == u3 ? "__proto__" !== r3 : null === r3) ? n3["string" == typeof e4 ? "string" : "hash"] : n3.map;
      }
      function hi(t5) {
        for (var e4 = Ra(t5), r3 = e4.length; r3--; ) {
          var u3 = e4[r3], n3 = t5[u3];
          e4[r3] = [u3, n3, bi(n3)];
        }
        return e4;
      }
      function pi(t5, e4) {
        var r3 = function(t6, e5) {
          return null == t6 ? u2 : t6[e5];
        }(t5, e4);
        return Su(r3) ? r3 : u2;
      }
      var Di = Ie3 ? function(t5) {
        return null == t5 ? [] : (t5 = wt3(t5), Oe2(Ie3(t5), function(e4) {
          return Gt3.call(t5, e4);
        }));
      } : Bs, vi = Ie3 ? function(t5) {
        for (var e4 = []; t5; ) Ne2(e4, Di(t5)), t5 = Kt3(t5);
        return e4;
      } : Bs, Ci = bu;
      function di(t5, e4, r3) {
        for (var u3 = -1, n3 = (e4 = Fn(e4, t5)).length, i3 = false; ++u3 < n3; ) {
          var o3 = zi(e4[u3]);
          if (!(i3 = null != t5 && r3(t5, o3))) break;
          t5 = t5[o3];
        }
        return i3 || ++u3 != n3 ? i3 : !!(n3 = null == t5 ? 0 : t5.length) && ra(n3) && Ai(o3, n3) && (Ko(t5) || Zo(t5));
      }
      function Bi(t5) {
        return "function" != typeof t5.constructor || _i(t5) ? {} : Lr(Kt3(t5));
      }
      function gi(t5) {
        return Ko(t5) || Zo(t5) || !!(Qt3 && t5 && t5[Qt3]);
      }
      function Ai(t5, e4) {
        var r3 = typeof t5;
        return !!(e4 = null == e4 ? p2 : e4) && ("number" == r3 || "symbol" != r3 && gt2.test(t5)) && t5 > -1 && t5 % 1 == 0 && t5 < e4;
      }
      function Fi(t5, e4, r3) {
        if (!ua(r3)) return false;
        var u3 = typeof e4;
        return !!("number" == u3 ? Go(r3) && Ai(e4, r3.length) : "string" == u3 && e4 in r3) && Vo(r3[e4], t5);
      }
      function yi(t5, e4) {
        if (Ko(t5)) return false;
        var r3 = typeof t5;
        return !("number" != r3 && "symbol" != r3 && "boolean" != r3 && null != t5 && !la(t5)) || (et2.test(t5) || !tt2.test(t5) || null != e4 && t5 in wt3(e4));
      }
      function Ei(t5) {
        var e4 = si(t5), r3 = Wr[e4];
        if ("function" != typeof r3 || !(e4 in Ur.prototype)) return false;
        if (t5 === r3) return true;
        var u3 = ai(r3);
        return !!u3 && t5 === u3[0];
      }
      (_r && Ci(new _r(new ArrayBuffer(1))) != R2 || br && Ci(new br()) != m2 || wr && Ci(wr.resolve()) != w2 || xr && Ci(new xr()) != O2 || Or && Ci(new Or()) != k2) && (Ci = function(t5) {
        var e4 = bu(t5), r3 = e4 == b2 ? t5.constructor : u2, n3 = r3 ? Mi(r3) : "";
        if (n3) switch (n3) {
          case Nr:
            return R2;
          case Rr:
            return m2;
          case Sr:
            return w2;
          case Tr:
            return O2;
          case Ir:
            return k2;
        }
        return e4;
      });
      var mi = Rt3 ? ta : gs;
      function _i(t5) {
        var e4 = t5 && t5.constructor;
        return t5 === ("function" == typeof e4 && e4.prototype || Nt3);
      }
      function bi(t5) {
        return t5 == t5 && !ua(t5);
      }
      function wi(t5, e4) {
        return function(r3) {
          return null != r3 && (r3[t5] === e4 && (e4 !== u2 || t5 in wt3(r3)));
        };
      }
      function xi(t5, e4, r3) {
        return e4 = gr(e4 === u2 ? t5.length - 1 : e4, 0), function() {
          for (var u3 = arguments, n3 = -1, i3 = gr(u3.length - e4, 0), o3 = ot3(i3); ++n3 < i3; ) o3[n3] = u3[e4 + n3];
          n3 = -1;
          for (var a3 = ot3(e4 + 1); ++n3 < e4; ) a3[n3] = u3[n3];
          return a3[e4] = r3(o3), me2(t5, this, a3);
        };
      }
      function Oi(t5, e4) {
        return e4.length < 2 ? t5 : mu(t5, nn(e4, 0, -1));
      }
      function Pi(t5, e4) {
        for (var r3 = t5.length, n3 = Ar(e4.length, r3), i3 = jn(t5); n3--; ) {
          var o3 = e4[n3];
          t5[n3] = Ai(o3, r3) ? i3[o3] : u2;
        }
        return t5;
      }
      function ji(t5, e4) {
        if (("constructor" !== e4 || "function" != typeof t5[e4]) && "__proto__" != e4) return t5[e4];
      }
      var ki = Ti(en), Ni = De3 || function(t5, e4) {
        return he2.setTimeout(t5, e4);
      }, Ri = Ti(rn);
      function Si(t5, e4, r3) {
        var u3 = e4 + "";
        return Ri(t5, function(t6, e5) {
          var r4 = e5.length;
          if (!r4) return t6;
          var u4 = r4 - 1;
          return e5[u4] = (r4 > 1 ? "& " : "") + e5[u4], e5 = e5.join(r4 > 2 ? ", " : " "), t6.replace(at2, "{\n/* [wrapped with " + e5 + "] */\n");
        }(u3, function(t6, e5) {
          return be2(C2, function(r4) {
            var u4 = "_." + r4[0];
            e5 & r4[1] && !Pe2(t6, u4) && t6.push(u4);
          }), t6.sort();
        }(function(t6) {
          var e5 = t6.match(st2);
          return e5 ? e5[1].split(ft2) : [];
        }(u3), r3)));
      }
      function Ti(t5) {
        var e4 = 0, r3 = 0;
        return function() {
          var n3 = Fr(), i3 = 16 - (n3 - r3);
          if (r3 = n3, i3 > 0) {
            if (++e4 >= 800) return arguments[0];
          } else e4 = 0;
          return t5.apply(u2, arguments);
        };
      }
      function Ii(t5, e4) {
        var r3 = -1, n3 = t5.length, i3 = n3 - 1;
        for (e4 = e4 === u2 ? n3 : e4; ++r3 < e4; ) {
          var o3 = Gu(r3, i3), a3 = t5[o3];
          t5[o3] = t5[r3], t5[r3] = a3;
        }
        return t5.length = e4, t5;
      }
      var qi = function(t5) {
        var e4 = Io(t5, function(t6) {
          return 500 === r3.size && r3.clear(), t6;
        }), r3 = e4.cache;
        return e4;
      }(function(t5) {
        var e4 = [];
        return 46 === t5.charCodeAt(0) && e4.push(""), t5.replace(rt2, function(t6, r3, u3, n3) {
          e4.push(u3 ? n3.replace(ht2, "$1") : r3 || t6);
        }), e4;
      });
      function zi(t5) {
        if ("string" == typeof t5 || la(t5)) return t5;
        var e4 = t5 + "";
        return "0" == e4 && 1 / t5 == -1 / 0 ? "-0" : e4;
      }
      function Mi(t5) {
        if (null != t5) {
          try {
            return St3.call(t5);
          } catch (t6) {
          }
          try {
            return t5 + "";
          } catch (t6) {
          }
        }
        return "";
      }
      function Wi(t5) {
        if (t5 instanceof Ur) return t5.clone();
        var e4 = new $r(t5.__wrapped__, t5.__chain__);
        return e4.__actions__ = jn(t5.__actions__), e4.__index__ = t5.__index__, e4.__values__ = t5.__values__, e4;
      }
      var Li = Yu(function(t5, e4) {
        return Ho(t5) ? hu(t5, Bu(e4, 1, Ho, true)) : [];
      }), Vi = Yu(function(t5, e4) {
        var r3 = Xi(e4);
        return Ho(r3) && (r3 = u2), Ho(t5) ? hu(t5, Bu(e4, 1, Ho, true), ci(r3, 2)) : [];
      }), $i = Yu(function(t5, e4) {
        var r3 = Xi(e4);
        return Ho(r3) && (r3 = u2), Ho(t5) ? hu(t5, Bu(e4, 1, Ho, true), u2, r3) : [];
      });
      function Ui(t5, e4, r3) {
        var u3 = null == t5 ? 0 : t5.length;
        if (!u3) return -1;
        var n3 = null == r3 ? 0 : da(r3);
        return n3 < 0 && (n3 = gr(u3 + n3, 0)), ze2(t5, ci(e4, 3), n3);
      }
      function Zi(t5, e4, r3) {
        var n3 = null == t5 ? 0 : t5.length;
        if (!n3) return -1;
        var i3 = n3 - 1;
        return r3 !== u2 && (i3 = da(r3), i3 = r3 < 0 ? gr(n3 + i3, 0) : Ar(i3, n3 - 1)), ze2(t5, ci(e4, 3), i3, true);
      }
      function Ki(t5) {
        return (null == t5 ? 0 : t5.length) ? Bu(t5, 1) : [];
      }
      function Ji(t5) {
        return t5 && t5.length ? t5[0] : u2;
      }
      var Gi = Yu(function(t5) {
        var e4 = ke2(t5, gn);
        return e4.length && e4[0] === t5[0] ? Pu(e4) : [];
      }), Hi = Yu(function(t5) {
        var e4 = Xi(t5), r3 = ke2(t5, gn);
        return e4 === Xi(r3) ? e4 = u2 : r3.pop(), r3.length && r3[0] === t5[0] ? Pu(r3, ci(e4, 2)) : [];
      }), Yi = Yu(function(t5) {
        var e4 = Xi(t5), r3 = ke2(t5, gn);
        return (e4 = "function" == typeof e4 ? e4 : u2) && r3.pop(), r3.length && r3[0] === t5[0] ? Pu(r3, u2, e4) : [];
      });
      function Xi(t5) {
        var e4 = null == t5 ? 0 : t5.length;
        return e4 ? t5[e4 - 1] : u2;
      }
      var Qi = Yu(to);
      function to(t5, e4) {
        return t5 && t5.length && e4 && e4.length ? Ku(t5, e4) : t5;
      }
      var eo = ni(function(t5, e4) {
        var r3 = null == t5 ? 0 : t5.length, u3 = au(t5, e4);
        return Ju(t5, ke2(e4, function(t6) {
          return Ai(t6, r3) ? +t6 : t6;
        }).sort(xn)), u3;
      });
      function ro(t5) {
        return null == t5 ? t5 : mr.call(t5);
      }
      var uo = Yu(function(t5) {
        return hn(Bu(t5, 1, Ho, true));
      }), no = Yu(function(t5) {
        var e4 = Xi(t5);
        return Ho(e4) && (e4 = u2), hn(Bu(t5, 1, Ho, true), ci(e4, 2));
      }), io = Yu(function(t5) {
        var e4 = Xi(t5);
        return e4 = "function" == typeof e4 ? e4 : u2, hn(Bu(t5, 1, Ho, true), u2, e4);
      });
      function oo(t5) {
        if (!t5 || !t5.length) return [];
        var e4 = 0;
        return t5 = Oe2(t5, function(t6) {
          if (Ho(t6)) return e4 = gr(t6.length, e4), true;
        }), Je2(e4, function(e5) {
          return ke2(t5, $e2(e5));
        });
      }
      function ao(t5, e4) {
        if (!t5 || !t5.length) return [];
        var r3 = oo(t5);
        return null == e4 ? r3 : ke2(r3, function(t6) {
          return me2(e4, u2, t6);
        });
      }
      var so = Yu(function(t5, e4) {
        return Ho(t5) ? hu(t5, e4) : [];
      }), fo = Yu(function(t5) {
        return dn(Oe2(t5, Ho));
      }), co = Yu(function(t5) {
        var e4 = Xi(t5);
        return Ho(e4) && (e4 = u2), dn(Oe2(t5, Ho), ci(e4, 2));
      }), lo = Yu(function(t5) {
        var e4 = Xi(t5);
        return e4 = "function" == typeof e4 ? e4 : u2, dn(Oe2(t5, Ho), u2, e4);
      }), ho = Yu(oo);
      var po = Yu(function(t5) {
        var e4 = t5.length, r3 = e4 > 1 ? t5[e4 - 1] : u2;
        return r3 = "function" == typeof r3 ? (t5.pop(), r3) : u2, ao(t5, r3);
      });
      function Do(t5) {
        var e4 = Wr(t5);
        return e4.__chain__ = true, e4;
      }
      function vo(t5, e4) {
        return e4(t5);
      }
      var Co = ni(function(t5) {
        var e4 = t5.length, r3 = e4 ? t5[0] : 0, n3 = this.__wrapped__, i3 = function(e5) {
          return au(e5, t5);
        };
        return !(e4 > 1 || this.__actions__.length) && n3 instanceof Ur && Ai(r3) ? ((n3 = n3.slice(r3, +r3 + (e4 ? 1 : 0))).__actions__.push({ func: vo, args: [i3], thisArg: u2 }), new $r(n3, this.__chain__).thru(function(t6) {
          return e4 && !t6.length && t6.push(u2), t6;
        })) : this.thru(i3);
      });
      var Bo = Nn(function(t5, e4, r3) {
        Tt3.call(t5, r3) ? ++t5[r3] : ou(t5, r3, 1);
      });
      var go = Mn(Ui), Ao = Mn(Zi);
      function Fo(t5, e4) {
        return (Ko(t5) ? be2 : pu)(t5, ci(e4, 3));
      }
      function yo(t5, e4) {
        return (Ko(t5) ? we2 : Du)(t5, ci(e4, 3));
      }
      var Eo = Nn(function(t5, e4, r3) {
        Tt3.call(t5, r3) ? t5[r3].push(e4) : ou(t5, r3, [e4]);
      });
      var mo = Yu(function(t5, e4, r3) {
        var u3 = -1, n3 = "function" == typeof e4, i3 = Go(t5) ? ot3(t5.length) : [];
        return pu(t5, function(t6) {
          i3[++u3] = n3 ? me2(e4, t6, r3) : ju(t6, e4, r3);
        }), i3;
      }), _o = Nn(function(t5, e4, r3) {
        ou(t5, r3, e4);
      });
      function bo(t5, e4) {
        return (Ko(t5) ? ke2 : Mu)(t5, ci(e4, 3));
      }
      var wo = Nn(function(t5, e4, r3) {
        t5[r3 ? 0 : 1].push(e4);
      }, function() {
        return [[], []];
      });
      var xo = Yu(function(t5, e4) {
        if (null == t5) return [];
        var r3 = e4.length;
        return r3 > 1 && Fi(t5, e4[0], e4[1]) ? e4 = [] : r3 > 2 && Fi(e4[0], e4[1], e4[2]) && (e4 = [e4[0]]), Uu(t5, Bu(e4, 1), []);
      }), Oo = pe3 || function() {
        return he2.Date.now();
      };
      function Po(t5, e4, r3) {
        return e4 = r3 ? u2 : e4, e4 = t5 && null == e4 ? t5.length : e4, Qn(t5, c2, u2, u2, u2, u2, e4);
      }
      function jo(t5, e4) {
        var r3;
        if ("function" != typeof e4) throw new Pt3(n2);
        return t5 = da(t5), function() {
          return --t5 > 0 && (r3 = e4.apply(this, arguments)), t5 <= 1 && (e4 = u2), r3;
        };
      }
      var ko = Yu(function(t5, e4, r3) {
        var u3 = 1;
        if (r3.length) {
          var n3 = sr2(r3, fi(ko));
          u3 |= s2;
        }
        return Qn(t5, u3, e4, r3, n3);
      }), No = Yu(function(t5, e4, r3) {
        var u3 = 3;
        if (r3.length) {
          var n3 = sr2(r3, fi(No));
          u3 |= s2;
        }
        return Qn(e4, u3, t5, r3, n3);
      });
      function Ro(t5, e4, r3) {
        var i3, o3, a3, s3, f3, c3, l3 = 0, h3 = false, p3 = false, D3 = true;
        if ("function" != typeof t5) throw new Pt3(n2);
        function v3(e5) {
          var r4 = i3, n3 = o3;
          return i3 = o3 = u2, l3 = e5, s3 = t5.apply(n3, r4);
        }
        function C3(t6) {
          return l3 = t6, f3 = Ni(B3, e4), h3 ? v3(t6) : s3;
        }
        function d3(t6) {
          var r4 = t6 - c3;
          return c3 === u2 || r4 >= e4 || r4 < 0 || p3 && t6 - l3 >= a3;
        }
        function B3() {
          var t6 = Oo();
          if (d3(t6)) return g3(t6);
          f3 = Ni(B3, function(t7) {
            var r4 = e4 - (t7 - c3);
            return p3 ? Ar(r4, a3 - (t7 - l3)) : r4;
          }(t6));
        }
        function g3(t6) {
          return f3 = u2, D3 && i3 ? v3(t6) : (i3 = o3 = u2, s3);
        }
        function A3() {
          var t6 = Oo(), r4 = d3(t6);
          if (i3 = arguments, o3 = this, c3 = t6, r4) {
            if (f3 === u2) return C3(c3);
            if (p3) return mn(f3), f3 = Ni(B3, e4), v3(c3);
          }
          return f3 === u2 && (f3 = Ni(B3, e4)), s3;
        }
        return e4 = ga(e4) || 0, ua(r3) && (h3 = !!r3.leading, a3 = (p3 = "maxWait" in r3) ? gr(ga(r3.maxWait) || 0, e4) : a3, D3 = "trailing" in r3 ? !!r3.trailing : D3), A3.cancel = function() {
          f3 !== u2 && mn(f3), l3 = 0, i3 = c3 = o3 = f3 = u2;
        }, A3.flush = function() {
          return f3 === u2 ? s3 : g3(Oo());
        }, A3;
      }
      var So = Yu(function(t5, e4) {
        return lu(t5, 1, e4);
      }), To = Yu(function(t5, e4, r3) {
        return lu(t5, ga(e4) || 0, r3);
      });
      function Io(t5, e4) {
        if ("function" != typeof t5 || null != e4 && "function" != typeof e4) throw new Pt3(n2);
        var r3 = function() {
          var u3 = arguments, n3 = e4 ? e4.apply(this, u3) : u3[0], i3 = r3.cache;
          if (i3.has(n3)) return i3.get(n3);
          var o3 = t5.apply(this, u3);
          return r3.cache = i3.set(n3, o3) || i3, o3;
        };
        return r3.cache = new (Io.Cache || Jr)(), r3;
      }
      function qo(t5) {
        if ("function" != typeof t5) throw new Pt3(n2);
        return function() {
          var e4 = arguments;
          switch (e4.length) {
            case 0:
              return !t5.call(this);
            case 1:
              return !t5.call(this, e4[0]);
            case 2:
              return !t5.call(this, e4[0], e4[1]);
            case 3:
              return !t5.call(this, e4[0], e4[1], e4[2]);
          }
          return !t5.apply(this, e4);
        };
      }
      Io.Cache = Jr;
      var zo = yn(function(t5, e4) {
        var r3 = (e4 = 1 == e4.length && Ko(e4[0]) ? ke2(e4[0], He2(ci())) : ke2(Bu(e4, 1), He2(ci()))).length;
        return Yu(function(u3) {
          for (var n3 = -1, i3 = Ar(u3.length, r3); ++n3 < i3; ) u3[n3] = e4[n3].call(this, u3[n3]);
          return me2(t5, this, u3);
        });
      }), Mo = Yu(function(t5, e4) {
        var r3 = sr2(e4, fi(Mo));
        return Qn(t5, s2, u2, e4, r3);
      }), Wo = Yu(function(t5, e4) {
        var r3 = sr2(e4, fi(Wo));
        return Qn(t5, f2, u2, e4, r3);
      }), Lo = ni(function(t5, e4) {
        return Qn(t5, l2, u2, u2, u2, e4);
      });
      function Vo(t5, e4) {
        return t5 === e4 || t5 != t5 && e4 != e4;
      }
      var $o = Jn(wu), Uo = Jn(function(t5, e4) {
        return t5 >= e4;
      }), Zo = ku(/* @__PURE__ */ function() {
        return arguments;
      }()) ? ku : function(t5) {
        return na(t5) && Tt3.call(t5, "callee") && !Gt3.call(t5, "callee");
      }, Ko = ot3.isArray, Jo = Be2 ? He2(Be2) : function(t5) {
        return na(t5) && bu(t5) == N2;
      };
      function Go(t5) {
        return null != t5 && ra(t5.length) && !ta(t5);
      }
      function Ho(t5) {
        return na(t5) && Go(t5);
      }
      var Yo = Ue3 || gs, Xo = ge2 ? He2(ge2) : function(t5) {
        return na(t5) && bu(t5) == A2;
      };
      function Qo(t5) {
        if (!na(t5)) return false;
        var e4 = bu(t5);
        return e4 == F2 || "[object DOMException]" == e4 || "string" == typeof t5.message && "string" == typeof t5.name && !aa(t5);
      }
      function ta(t5) {
        if (!ua(t5)) return false;
        var e4 = bu(t5);
        return e4 == y2 || e4 == E2 || "[object AsyncFunction]" == e4 || "[object Proxy]" == e4;
      }
      function ea(t5) {
        return "number" == typeof t5 && t5 == da(t5);
      }
      function ra(t5) {
        return "number" == typeof t5 && t5 > -1 && t5 % 1 == 0 && t5 <= p2;
      }
      function ua(t5) {
        var e4 = typeof t5;
        return null != t5 && ("object" == e4 || "function" == e4);
      }
      function na(t5) {
        return null != t5 && "object" == typeof t5;
      }
      var ia = Ae2 ? He2(Ae2) : function(t5) {
        return na(t5) && Ci(t5) == m2;
      };
      function oa(t5) {
        return "number" == typeof t5 || na(t5) && bu(t5) == _2;
      }
      function aa(t5) {
        if (!na(t5) || bu(t5) != b2) return false;
        var e4 = Kt3(t5);
        if (null === e4) return true;
        var r3 = Tt3.call(e4, "constructor") && e4.constructor;
        return "function" == typeof r3 && r3 instanceof r3 && St3.call(r3) == Mt3;
      }
      var sa = Fe2 ? He2(Fe2) : function(t5) {
        return na(t5) && bu(t5) == x2;
      };
      var fa = ye2 ? He2(ye2) : function(t5) {
        return na(t5) && Ci(t5) == O2;
      };
      function ca(t5) {
        return "string" == typeof t5 || !Ko(t5) && na(t5) && bu(t5) == P2;
      }
      function la(t5) {
        return "symbol" == typeof t5 || na(t5) && bu(t5) == j2;
      }
      var ha = Ee2 ? He2(Ee2) : function(t5) {
        return na(t5) && ra(t5.length) && !!ie2[bu(t5)];
      };
      var pa = Jn(zu), Da = Jn(function(t5, e4) {
        return t5 <= e4;
      });
      function va(t5) {
        if (!t5) return [];
        if (Go(t5)) return ca(t5) ? hr(t5) : jn(t5);
        if (ee3 && t5[ee3]) return function(t6) {
          for (var e5, r3 = []; !(e5 = t6.next()).done; ) r3.push(e5.value);
          return r3;
        }(t5[ee3]());
        var e4 = Ci(t5);
        return (e4 == m2 ? or2 : e4 == O2 ? fr2 : Va)(t5);
      }
      function Ca(t5) {
        return t5 ? (t5 = ga(t5)) === h2 || t5 === -1 / 0 ? 17976931348623157e292 * (t5 < 0 ? -1 : 1) : t5 == t5 ? t5 : 0 : 0 === t5 ? t5 : 0;
      }
      function da(t5) {
        var e4 = Ca(t5), r3 = e4 % 1;
        return e4 == e4 ? r3 ? e4 - r3 : e4 : 0;
      }
      function Ba(t5) {
        return t5 ? su(da(t5), 0, v2) : 0;
      }
      function ga(t5) {
        if ("number" == typeof t5) return t5;
        if (la(t5)) return D2;
        if (ua(t5)) {
          var e4 = "function" == typeof t5.valueOf ? t5.valueOf() : t5;
          t5 = ua(e4) ? e4 + "" : e4;
        }
        if ("string" != typeof t5) return 0 === t5 ? t5 : +t5;
        t5 = Ge2(t5);
        var r3 = Ct2.test(t5);
        return r3 || Bt2.test(t5) ? fe2(t5.slice(2), r3 ? 2 : 8) : vt2.test(t5) ? D2 : +t5;
      }
      function Aa(t5) {
        return kn(t5, Sa(t5));
      }
      function Fa(t5) {
        return null == t5 ? "" : ln(t5);
      }
      var ya = Rn(function(t5, e4) {
        if (_i(e4) || Go(e4)) kn(e4, Ra(e4), t5);
        else for (var r3 in e4) Tt3.call(e4, r3) && ru(t5, r3, e4[r3]);
      }), Ea = Rn(function(t5, e4) {
        kn(e4, Sa(e4), t5);
      }), ma = Rn(function(t5, e4, r3, u3) {
        kn(e4, Sa(e4), t5, u3);
      }), _a = Rn(function(t5, e4, r3, u3) {
        kn(e4, Ra(e4), t5, u3);
      }), ba = ni(au);
      var wa = Yu(function(t5, e4) {
        t5 = wt3(t5);
        var r3 = -1, n3 = e4.length, i3 = n3 > 2 ? e4[2] : u2;
        for (i3 && Fi(e4[0], e4[1], i3) && (n3 = 1); ++r3 < n3; ) for (var o3 = e4[r3], a3 = Sa(o3), s3 = -1, f3 = a3.length; ++s3 < f3; ) {
          var c3 = a3[s3], l3 = t5[c3];
          (l3 === u2 || Vo(l3, Nt3[c3]) && !Tt3.call(t5, c3)) && (t5[c3] = o3[c3]);
        }
        return t5;
      }), xa = Yu(function(t5) {
        return t5.push(u2, ei), me2(Ia, u2, t5);
      });
      function Oa(t5, e4, r3) {
        var n3 = null == t5 ? u2 : mu(t5, e4);
        return n3 === u2 ? r3 : n3;
      }
      function Pa(t5, e4) {
        return null != t5 && di(t5, e4, Ou);
      }
      var ja = Vn(function(t5, e4, r3) {
        null != e4 && "function" != typeof e4.toString && (e4 = zt3.call(e4)), t5[e4] = r3;
      }, us(os)), ka = Vn(function(t5, e4, r3) {
        null != e4 && "function" != typeof e4.toString && (e4 = zt3.call(e4)), Tt3.call(t5, e4) ? t5[e4].push(r3) : t5[e4] = [r3];
      }, ci), Na = Yu(ju);
      function Ra(t5) {
        return Go(t5) ? Yr(t5) : Iu(t5);
      }
      function Sa(t5) {
        return Go(t5) ? Yr(t5, true) : qu(t5);
      }
      var Ta = Rn(function(t5, e4, r3) {
        Vu(t5, e4, r3);
      }), Ia = Rn(function(t5, e4, r3, u3) {
        Vu(t5, e4, r3, u3);
      }), qa = ni(function(t5, e4) {
        var r3 = {};
        if (null == t5) return r3;
        var u3 = false;
        e4 = ke2(e4, function(e5) {
          return e5 = Fn(e5, t5), u3 || (u3 = e5.length > 1), e5;
        }), kn(t5, oi(t5), r3), u3 && (r3 = fu(r3, 7, ri));
        for (var n3 = e4.length; n3--; ) pn(r3, e4[n3]);
        return r3;
      });
      var za = ni(function(t5, e4) {
        return null == t5 ? {} : function(t6, e5) {
          return Zu(t6, e5, function(e6, r3) {
            return Pa(t6, r3);
          });
        }(t5, e4);
      });
      function Ma(t5, e4) {
        if (null == t5) return {};
        var r3 = ke2(oi(t5), function(t6) {
          return [t6];
        });
        return e4 = ci(e4), Zu(t5, r3, function(t6, r4) {
          return e4(t6, r4[0]);
        });
      }
      var Wa = Xn(Ra), La = Xn(Sa);
      function Va(t5) {
        return null == t5 ? [] : Ye2(t5, Ra(t5));
      }
      var $a = qn(function(t5, e4, r3) {
        return e4 = e4.toLowerCase(), t5 + (r3 ? Ua(e4) : e4);
      });
      function Ua(t5) {
        return Qa(Fa(t5).toLowerCase());
      }
      function Za(t5) {
        return (t5 = Fa(t5)) && t5.replace(At2, rr2).replace(Xt2, "");
      }
      var Ka = qn(function(t5, e4, r3) {
        return t5 + (r3 ? "-" : "") + e4.toLowerCase();
      }), Ja = qn(function(t5, e4, r3) {
        return t5 + (r3 ? " " : "") + e4.toLowerCase();
      }), Ga = In("toLowerCase");
      var Ha = qn(function(t5, e4, r3) {
        return t5 + (r3 ? "_" : "") + e4.toLowerCase();
      });
      var Ya = qn(function(t5, e4, r3) {
        return t5 + (r3 ? " " : "") + Qa(e4);
      });
      var Xa = qn(function(t5, e4, r3) {
        return t5 + (r3 ? " " : "") + e4.toUpperCase();
      }), Qa = In("toUpperCase");
      function ts(t5, e4, r3) {
        return t5 = Fa(t5), (e4 = r3 ? u2 : e4) === u2 ? function(t6) {
          return re2.test(t6);
        }(t5) ? function(t6) {
          return t6.match(te2) || [];
        }(t5) : function(t6) {
          return t6.match(ct2) || [];
        }(t5) : t5.match(e4) || [];
      }
      var es = Yu(function(t5, e4) {
        try {
          return me2(t5, u2, e4);
        } catch (t6) {
          return Qo(t6) ? t6 : new mt3(t6);
        }
      }), rs = ni(function(t5, e4) {
        return be2(e4, function(e5) {
          e5 = zi(e5), ou(t5, e5, ko(t5[e5], t5));
        }), t5;
      });
      function us(t5) {
        return function() {
          return t5;
        };
      }
      var ns = Wn(), is = Wn(true);
      function os(t5) {
        return t5;
      }
      function as(t5) {
        return Tu("function" == typeof t5 ? t5 : fu(t5, 1));
      }
      var ss = Yu(function(t5, e4) {
        return function(r3) {
          return ju(r3, t5, e4);
        };
      }), fs = Yu(function(t5, e4) {
        return function(r3) {
          return ju(t5, r3, e4);
        };
      });
      function cs(t5, e4, r3) {
        var u3 = Ra(e4), n3 = Eu(e4, u3);
        null != r3 || ua(e4) && (n3.length || !u3.length) || (r3 = e4, e4 = t5, t5 = this, n3 = Eu(e4, Ra(e4)));
        var i3 = !(ua(r3) && "chain" in r3 && !r3.chain), o3 = ta(t5);
        return be2(n3, function(r4) {
          var u4 = e4[r4];
          t5[r4] = u4, o3 && (t5.prototype[r4] = function() {
            var e5 = this.__chain__;
            if (i3 || e5) {
              var r5 = t5(this.__wrapped__), n4 = r5.__actions__ = jn(this.__actions__);
              return n4.push({ func: u4, args: arguments, thisArg: t5 }), r5.__chain__ = e5, r5;
            }
            return u4.apply(t5, Ne2([this.value()], arguments));
          });
        }), t5;
      }
      function ls() {
      }
      var hs = Un(ke2), ps = Un(xe2), Ds = Un(Te2);
      function vs(t5) {
        return yi(t5) ? $e2(zi(t5)) : /* @__PURE__ */ function(t6) {
          return function(e4) {
            return mu(e4, t6);
          };
        }(t5);
      }
      var Cs = Kn(), ds = Kn(true);
      function Bs() {
        return [];
      }
      function gs() {
        return false;
      }
      var As = $n(function(t5, e4) {
        return t5 + e4;
      }, 0), Fs = Hn("ceil"), ys = $n(function(t5, e4) {
        return t5 / e4;
      }, 1), Es = Hn("floor");
      var ms, _s = $n(function(t5, e4) {
        return t5 * e4;
      }, 1), bs = Hn("round"), ws = $n(function(t5, e4) {
        return t5 - e4;
      }, 0);
      return Wr.after = function(t5, e4) {
        if ("function" != typeof e4) throw new Pt3(n2);
        return t5 = da(t5), function() {
          if (--t5 < 1) return e4.apply(this, arguments);
        };
      }, Wr.ary = Po, Wr.assign = ya, Wr.assignIn = Ea, Wr.assignInWith = ma, Wr.assignWith = _a, Wr.at = ba, Wr.before = jo, Wr.bind = ko, Wr.bindAll = rs, Wr.bindKey = No, Wr.castArray = function() {
        if (!arguments.length) return [];
        var t5 = arguments[0];
        return Ko(t5) ? t5 : [t5];
      }, Wr.chain = Do, Wr.chunk = function(t5, e4, r3) {
        e4 = (r3 ? Fi(t5, e4, r3) : e4 === u2) ? 1 : gr(da(e4), 0);
        var n3 = null == t5 ? 0 : t5.length;
        if (!n3 || e4 < 1) return [];
        for (var i3 = 0, o3 = 0, a3 = ot3(Ce3(n3 / e4)); i3 < n3; ) a3[o3++] = nn(t5, i3, i3 += e4);
        return a3;
      }, Wr.compact = function(t5) {
        for (var e4 = -1, r3 = null == t5 ? 0 : t5.length, u3 = 0, n3 = []; ++e4 < r3; ) {
          var i3 = t5[e4];
          i3 && (n3[u3++] = i3);
        }
        return n3;
      }, Wr.concat = function() {
        var t5 = arguments.length;
        if (!t5) return [];
        for (var e4 = ot3(t5 - 1), r3 = arguments[0], u3 = t5; u3--; ) e4[u3 - 1] = arguments[u3];
        return Ne2(Ko(r3) ? jn(r3) : [r3], Bu(e4, 1));
      }, Wr.cond = function(t5) {
        var e4 = null == t5 ? 0 : t5.length, r3 = ci();
        return t5 = e4 ? ke2(t5, function(t6) {
          if ("function" != typeof t6[1]) throw new Pt3(n2);
          return [r3(t6[0]), t6[1]];
        }) : [], Yu(function(r4) {
          for (var u3 = -1; ++u3 < e4; ) {
            var n3 = t5[u3];
            if (me2(n3[0], this, r4)) return me2(n3[1], this, r4);
          }
        });
      }, Wr.conforms = function(t5) {
        return function(t6) {
          var e4 = Ra(t6);
          return function(r3) {
            return cu(r3, t6, e4);
          };
        }(fu(t5, 1));
      }, Wr.constant = us, Wr.countBy = Bo, Wr.create = function(t5, e4) {
        var r3 = Lr(t5);
        return null == e4 ? r3 : iu(r3, e4);
      }, Wr.curry = function t5(e4, r3, n3) {
        var i3 = Qn(e4, 8, u2, u2, u2, u2, u2, r3 = n3 ? u2 : r3);
        return i3.placeholder = t5.placeholder, i3;
      }, Wr.curryRight = function t5(e4, r3, n3) {
        var i3 = Qn(e4, a2, u2, u2, u2, u2, u2, r3 = n3 ? u2 : r3);
        return i3.placeholder = t5.placeholder, i3;
      }, Wr.debounce = Ro, Wr.defaults = wa, Wr.defaultsDeep = xa, Wr.defer = So, Wr.delay = To, Wr.difference = Li, Wr.differenceBy = Vi, Wr.differenceWith = $i, Wr.drop = function(t5, e4, r3) {
        var n3 = null == t5 ? 0 : t5.length;
        return n3 ? nn(t5, (e4 = r3 || e4 === u2 ? 1 : da(e4)) < 0 ? 0 : e4, n3) : [];
      }, Wr.dropRight = function(t5, e4, r3) {
        var n3 = null == t5 ? 0 : t5.length;
        return n3 ? nn(t5, 0, (e4 = n3 - (e4 = r3 || e4 === u2 ? 1 : da(e4))) < 0 ? 0 : e4) : [];
      }, Wr.dropRightWhile = function(t5, e4) {
        return t5 && t5.length ? vn(t5, ci(e4, 3), true, true) : [];
      }, Wr.dropWhile = function(t5, e4) {
        return t5 && t5.length ? vn(t5, ci(e4, 3), true) : [];
      }, Wr.fill = function(t5, e4, r3, n3) {
        var i3 = null == t5 ? 0 : t5.length;
        return i3 ? (r3 && "number" != typeof r3 && Fi(t5, e4, r3) && (r3 = 0, n3 = i3), function(t6, e5, r4, n4) {
          var i4 = t6.length;
          for ((r4 = da(r4)) < 0 && (r4 = -r4 > i4 ? 0 : i4 + r4), (n4 = n4 === u2 || n4 > i4 ? i4 : da(n4)) < 0 && (n4 += i4), n4 = r4 > n4 ? 0 : Ba(n4); r4 < n4; ) t6[r4++] = e5;
          return t6;
        }(t5, e4, r3, n3)) : [];
      }, Wr.filter = function(t5, e4) {
        return (Ko(t5) ? Oe2 : du)(t5, ci(e4, 3));
      }, Wr.flatMap = function(t5, e4) {
        return Bu(bo(t5, e4), 1);
      }, Wr.flatMapDeep = function(t5, e4) {
        return Bu(bo(t5, e4), h2);
      }, Wr.flatMapDepth = function(t5, e4, r3) {
        return r3 = r3 === u2 ? 1 : da(r3), Bu(bo(t5, e4), r3);
      }, Wr.flatten = Ki, Wr.flattenDeep = function(t5) {
        return (null == t5 ? 0 : t5.length) ? Bu(t5, h2) : [];
      }, Wr.flattenDepth = function(t5, e4) {
        return (null == t5 ? 0 : t5.length) ? Bu(t5, e4 = e4 === u2 ? 1 : da(e4)) : [];
      }, Wr.flip = function(t5) {
        return Qn(t5, 512);
      }, Wr.flow = ns, Wr.flowRight = is, Wr.fromPairs = function(t5) {
        for (var e4 = -1, r3 = null == t5 ? 0 : t5.length, u3 = {}; ++e4 < r3; ) {
          var n3 = t5[e4];
          u3[n3[0]] = n3[1];
        }
        return u3;
      }, Wr.functions = function(t5) {
        return null == t5 ? [] : Eu(t5, Ra(t5));
      }, Wr.functionsIn = function(t5) {
        return null == t5 ? [] : Eu(t5, Sa(t5));
      }, Wr.groupBy = Eo, Wr.initial = function(t5) {
        return (null == t5 ? 0 : t5.length) ? nn(t5, 0, -1) : [];
      }, Wr.intersection = Gi, Wr.intersectionBy = Hi, Wr.intersectionWith = Yi, Wr.invert = ja, Wr.invertBy = ka, Wr.invokeMap = mo, Wr.iteratee = as, Wr.keyBy = _o, Wr.keys = Ra, Wr.keysIn = Sa, Wr.map = bo, Wr.mapKeys = function(t5, e4) {
        var r3 = {};
        return e4 = ci(e4, 3), Fu(t5, function(t6, u3, n3) {
          ou(r3, e4(t6, u3, n3), t6);
        }), r3;
      }, Wr.mapValues = function(t5, e4) {
        var r3 = {};
        return e4 = ci(e4, 3), Fu(t5, function(t6, u3, n3) {
          ou(r3, u3, e4(t6, u3, n3));
        }), r3;
      }, Wr.matches = function(t5) {
        return Wu(fu(t5, 1));
      }, Wr.matchesProperty = function(t5, e4) {
        return Lu(t5, fu(e4, 1));
      }, Wr.memoize = Io, Wr.merge = Ta, Wr.mergeWith = Ia, Wr.method = ss, Wr.methodOf = fs, Wr.mixin = cs, Wr.negate = qo, Wr.nthArg = function(t5) {
        return t5 = da(t5), Yu(function(e4) {
          return $u(e4, t5);
        });
      }, Wr.omit = qa, Wr.omitBy = function(t5, e4) {
        return Ma(t5, qo(ci(e4)));
      }, Wr.once = function(t5) {
        return jo(2, t5);
      }, Wr.orderBy = function(t5, e4, r3, n3) {
        return null == t5 ? [] : (Ko(e4) || (e4 = null == e4 ? [] : [e4]), Ko(r3 = n3 ? u2 : r3) || (r3 = null == r3 ? [] : [r3]), Uu(t5, e4, r3));
      }, Wr.over = hs, Wr.overArgs = zo, Wr.overEvery = ps, Wr.overSome = Ds, Wr.partial = Mo, Wr.partialRight = Wo, Wr.partition = wo, Wr.pick = za, Wr.pickBy = Ma, Wr.property = vs, Wr.propertyOf = function(t5) {
        return function(e4) {
          return null == t5 ? u2 : mu(t5, e4);
        };
      }, Wr.pull = Qi, Wr.pullAll = to, Wr.pullAllBy = function(t5, e4, r3) {
        return t5 && t5.length && e4 && e4.length ? Ku(t5, e4, ci(r3, 2)) : t5;
      }, Wr.pullAllWith = function(t5, e4, r3) {
        return t5 && t5.length && e4 && e4.length ? Ku(t5, e4, u2, r3) : t5;
      }, Wr.pullAt = eo, Wr.range = Cs, Wr.rangeRight = ds, Wr.rearg = Lo, Wr.reject = function(t5, e4) {
        return (Ko(t5) ? Oe2 : du)(t5, qo(ci(e4, 3)));
      }, Wr.remove = function(t5, e4) {
        var r3 = [];
        if (!t5 || !t5.length) return r3;
        var u3 = -1, n3 = [], i3 = t5.length;
        for (e4 = ci(e4, 3); ++u3 < i3; ) {
          var o3 = t5[u3];
          e4(o3, u3, t5) && (r3.push(o3), n3.push(u3));
        }
        return Ju(t5, n3), r3;
      }, Wr.rest = function(t5, e4) {
        if ("function" != typeof t5) throw new Pt3(n2);
        return Yu(t5, e4 = e4 === u2 ? e4 : da(e4));
      }, Wr.reverse = ro, Wr.sampleSize = function(t5, e4, r3) {
        return e4 = (r3 ? Fi(t5, e4, r3) : e4 === u2) ? 1 : da(e4), (Ko(t5) ? Qr : Qu)(t5, e4);
      }, Wr.set = function(t5, e4, r3) {
        return null == t5 ? t5 : tn(t5, e4, r3);
      }, Wr.setWith = function(t5, e4, r3, n3) {
        return n3 = "function" == typeof n3 ? n3 : u2, null == t5 ? t5 : tn(t5, e4, r3, n3);
      }, Wr.shuffle = function(t5) {
        return (Ko(t5) ? tu : un)(t5);
      }, Wr.slice = function(t5, e4, r3) {
        var n3 = null == t5 ? 0 : t5.length;
        return n3 ? (r3 && "number" != typeof r3 && Fi(t5, e4, r3) ? (e4 = 0, r3 = n3) : (e4 = null == e4 ? 0 : da(e4), r3 = r3 === u2 ? n3 : da(r3)), nn(t5, e4, r3)) : [];
      }, Wr.sortBy = xo, Wr.sortedUniq = function(t5) {
        return t5 && t5.length ? fn(t5) : [];
      }, Wr.sortedUniqBy = function(t5, e4) {
        return t5 && t5.length ? fn(t5, ci(e4, 2)) : [];
      }, Wr.split = function(t5, e4, r3) {
        return r3 && "number" != typeof r3 && Fi(t5, e4, r3) && (e4 = r3 = u2), (r3 = r3 === u2 ? v2 : r3 >>> 0) ? (t5 = Fa(t5)) && ("string" == typeof e4 || null != e4 && !sa(e4)) && !(e4 = ln(e4)) && ir2(t5) ? En(hr(t5), 0, r3) : t5.split(e4, r3) : [];
      }, Wr.spread = function(t5, e4) {
        if ("function" != typeof t5) throw new Pt3(n2);
        return e4 = null == e4 ? 0 : gr(da(e4), 0), Yu(function(r3) {
          var u3 = r3[e4], n3 = En(r3, 0, e4);
          return u3 && Ne2(n3, u3), me2(t5, this, n3);
        });
      }, Wr.tail = function(t5) {
        var e4 = null == t5 ? 0 : t5.length;
        return e4 ? nn(t5, 1, e4) : [];
      }, Wr.take = function(t5, e4, r3) {
        return t5 && t5.length ? nn(t5, 0, (e4 = r3 || e4 === u2 ? 1 : da(e4)) < 0 ? 0 : e4) : [];
      }, Wr.takeRight = function(t5, e4, r3) {
        var n3 = null == t5 ? 0 : t5.length;
        return n3 ? nn(t5, (e4 = n3 - (e4 = r3 || e4 === u2 ? 1 : da(e4))) < 0 ? 0 : e4, n3) : [];
      }, Wr.takeRightWhile = function(t5, e4) {
        return t5 && t5.length ? vn(t5, ci(e4, 3), false, true) : [];
      }, Wr.takeWhile = function(t5, e4) {
        return t5 && t5.length ? vn(t5, ci(e4, 3)) : [];
      }, Wr.tap = function(t5, e4) {
        return e4(t5), t5;
      }, Wr.throttle = function(t5, e4, r3) {
        var u3 = true, i3 = true;
        if ("function" != typeof t5) throw new Pt3(n2);
        return ua(r3) && (u3 = "leading" in r3 ? !!r3.leading : u3, i3 = "trailing" in r3 ? !!r3.trailing : i3), Ro(t5, e4, { leading: u3, maxWait: e4, trailing: i3 });
      }, Wr.thru = vo, Wr.toArray = va, Wr.toPairs = Wa, Wr.toPairsIn = La, Wr.toPath = function(t5) {
        return Ko(t5) ? ke2(t5, zi) : la(t5) ? [t5] : jn(qi(Fa(t5)));
      }, Wr.toPlainObject = Aa, Wr.transform = function(t5, e4, r3) {
        var u3 = Ko(t5), n3 = u3 || Yo(t5) || ha(t5);
        if (e4 = ci(e4, 4), null == r3) {
          var i3 = t5 && t5.constructor;
          r3 = n3 ? u3 ? new i3() : [] : ua(t5) && ta(i3) ? Lr(Kt3(t5)) : {};
        }
        return (n3 ? be2 : Fu)(t5, function(t6, u4, n4) {
          return e4(r3, t6, u4, n4);
        }), r3;
      }, Wr.unary = function(t5) {
        return Po(t5, 1);
      }, Wr.union = uo, Wr.unionBy = no, Wr.unionWith = io, Wr.uniq = function(t5) {
        return t5 && t5.length ? hn(t5) : [];
      }, Wr.uniqBy = function(t5, e4) {
        return t5 && t5.length ? hn(t5, ci(e4, 2)) : [];
      }, Wr.uniqWith = function(t5, e4) {
        return e4 = "function" == typeof e4 ? e4 : u2, t5 && t5.length ? hn(t5, u2, e4) : [];
      }, Wr.unset = function(t5, e4) {
        return null == t5 || pn(t5, e4);
      }, Wr.unzip = oo, Wr.unzipWith = ao, Wr.update = function(t5, e4, r3) {
        return null == t5 ? t5 : Dn(t5, e4, An(r3));
      }, Wr.updateWith = function(t5, e4, r3, n3) {
        return n3 = "function" == typeof n3 ? n3 : u2, null == t5 ? t5 : Dn(t5, e4, An(r3), n3);
      }, Wr.values = Va, Wr.valuesIn = function(t5) {
        return null == t5 ? [] : Ye2(t5, Sa(t5));
      }, Wr.without = so, Wr.words = ts, Wr.wrap = function(t5, e4) {
        return Mo(An(e4), t5);
      }, Wr.xor = fo, Wr.xorBy = co, Wr.xorWith = lo, Wr.zip = ho, Wr.zipObject = function(t5, e4) {
        return Bn(t5 || [], e4 || [], ru);
      }, Wr.zipObjectDeep = function(t5, e4) {
        return Bn(t5 || [], e4 || [], tn);
      }, Wr.zipWith = po, Wr.entries = Wa, Wr.entriesIn = La, Wr.extend = Ea, Wr.extendWith = ma, cs(Wr, Wr), Wr.add = As, Wr.attempt = es, Wr.camelCase = $a, Wr.capitalize = Ua, Wr.ceil = Fs, Wr.clamp = function(t5, e4, r3) {
        return r3 === u2 && (r3 = e4, e4 = u2), r3 !== u2 && (r3 = (r3 = ga(r3)) == r3 ? r3 : 0), e4 !== u2 && (e4 = (e4 = ga(e4)) == e4 ? e4 : 0), su(ga(t5), e4, r3);
      }, Wr.clone = function(t5) {
        return fu(t5, 4);
      }, Wr.cloneDeep = function(t5) {
        return fu(t5, 5);
      }, Wr.cloneDeepWith = function(t5, e4) {
        return fu(t5, 5, e4 = "function" == typeof e4 ? e4 : u2);
      }, Wr.cloneWith = function(t5, e4) {
        return fu(t5, 4, e4 = "function" == typeof e4 ? e4 : u2);
      }, Wr.conformsTo = function(t5, e4) {
        return null == e4 || cu(t5, e4, Ra(e4));
      }, Wr.deburr = Za, Wr.defaultTo = function(t5, e4) {
        return null == t5 || t5 != t5 ? e4 : t5;
      }, Wr.divide = ys, Wr.endsWith = function(t5, e4, r3) {
        t5 = Fa(t5), e4 = ln(e4);
        var n3 = t5.length, i3 = r3 = r3 === u2 ? n3 : su(da(r3), 0, n3);
        return (r3 -= e4.length) >= 0 && t5.slice(r3, i3) == e4;
      }, Wr.eq = Vo, Wr.escape = function(t5) {
        return (t5 = Fa(t5)) && H2.test(t5) ? t5.replace(J2, ur2) : t5;
      }, Wr.escapeRegExp = function(t5) {
        return (t5 = Fa(t5)) && nt2.test(t5) ? t5.replace(ut2, "\\$&") : t5;
      }, Wr.every = function(t5, e4, r3) {
        var n3 = Ko(t5) ? xe2 : vu;
        return r3 && Fi(t5, e4, r3) && (e4 = u2), n3(t5, ci(e4, 3));
      }, Wr.find = go, Wr.findIndex = Ui, Wr.findKey = function(t5, e4) {
        return qe2(t5, ci(e4, 3), Fu);
      }, Wr.findLast = Ao, Wr.findLastIndex = Zi, Wr.findLastKey = function(t5, e4) {
        return qe2(t5, ci(e4, 3), yu);
      }, Wr.floor = Es, Wr.forEach = Fo, Wr.forEachRight = yo, Wr.forIn = function(t5, e4) {
        return null == t5 ? t5 : gu(t5, ci(e4, 3), Sa);
      }, Wr.forInRight = function(t5, e4) {
        return null == t5 ? t5 : Au(t5, ci(e4, 3), Sa);
      }, Wr.forOwn = function(t5, e4) {
        return t5 && Fu(t5, ci(e4, 3));
      }, Wr.forOwnRight = function(t5, e4) {
        return t5 && yu(t5, ci(e4, 3));
      }, Wr.get = Oa, Wr.gt = $o, Wr.gte = Uo, Wr.has = function(t5, e4) {
        return null != t5 && di(t5, e4, xu);
      }, Wr.hasIn = Pa, Wr.head = Ji, Wr.identity = os, Wr.includes = function(t5, e4, r3, u3) {
        t5 = Go(t5) ? t5 : Va(t5), r3 = r3 && !u3 ? da(r3) : 0;
        var n3 = t5.length;
        return r3 < 0 && (r3 = gr(n3 + r3, 0)), ca(t5) ? r3 <= n3 && t5.indexOf(e4, r3) > -1 : !!n3 && Me2(t5, e4, r3) > -1;
      }, Wr.indexOf = function(t5, e4, r3) {
        var u3 = null == t5 ? 0 : t5.length;
        if (!u3) return -1;
        var n3 = null == r3 ? 0 : da(r3);
        return n3 < 0 && (n3 = gr(u3 + n3, 0)), Me2(t5, e4, n3);
      }, Wr.inRange = function(t5, e4, r3) {
        return e4 = Ca(e4), r3 === u2 ? (r3 = e4, e4 = 0) : r3 = Ca(r3), function(t6, e5, r4) {
          return t6 >= Ar(e5, r4) && t6 < gr(e5, r4);
        }(t5 = ga(t5), e4, r3);
      }, Wr.invoke = Na, Wr.isArguments = Zo, Wr.isArray = Ko, Wr.isArrayBuffer = Jo, Wr.isArrayLike = Go, Wr.isArrayLikeObject = Ho, Wr.isBoolean = function(t5) {
        return true === t5 || false === t5 || na(t5) && bu(t5) == g2;
      }, Wr.isBuffer = Yo, Wr.isDate = Xo, Wr.isElement = function(t5) {
        return na(t5) && 1 === t5.nodeType && !aa(t5);
      }, Wr.isEmpty = function(t5) {
        if (null == t5) return true;
        if (Go(t5) && (Ko(t5) || "string" == typeof t5 || "function" == typeof t5.splice || Yo(t5) || ha(t5) || Zo(t5))) return !t5.length;
        var e4 = Ci(t5);
        if (e4 == m2 || e4 == O2) return !t5.size;
        if (_i(t5)) return !Iu(t5).length;
        for (var r3 in t5) if (Tt3.call(t5, r3)) return false;
        return true;
      }, Wr.isEqual = function(t5, e4) {
        return Nu(t5, e4);
      }, Wr.isEqualWith = function(t5, e4, r3) {
        var n3 = (r3 = "function" == typeof r3 ? r3 : u2) ? r3(t5, e4) : u2;
        return n3 === u2 ? Nu(t5, e4, u2, r3) : !!n3;
      }, Wr.isError = Qo, Wr.isFinite = function(t5) {
        return "number" == typeof t5 && Cr(t5);
      }, Wr.isFunction = ta, Wr.isInteger = ea, Wr.isLength = ra, Wr.isMap = ia, Wr.isMatch = function(t5, e4) {
        return t5 === e4 || Ru(t5, e4, hi(e4));
      }, Wr.isMatchWith = function(t5, e4, r3) {
        return r3 = "function" == typeof r3 ? r3 : u2, Ru(t5, e4, hi(e4), r3);
      }, Wr.isNaN = function(t5) {
        return oa(t5) && t5 != +t5;
      }, Wr.isNative = function(t5) {
        if (mi(t5)) throw new mt3("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");
        return Su(t5);
      }, Wr.isNil = function(t5) {
        return null == t5;
      }, Wr.isNull = function(t5) {
        return null === t5;
      }, Wr.isNumber = oa, Wr.isObject = ua, Wr.isObjectLike = na, Wr.isPlainObject = aa, Wr.isRegExp = sa, Wr.isSafeInteger = function(t5) {
        return ea(t5) && t5 >= -9007199254740991 && t5 <= p2;
      }, Wr.isSet = fa, Wr.isString = ca, Wr.isSymbol = la, Wr.isTypedArray = ha, Wr.isUndefined = function(t5) {
        return t5 === u2;
      }, Wr.isWeakMap = function(t5) {
        return na(t5) && Ci(t5) == k2;
      }, Wr.isWeakSet = function(t5) {
        return na(t5) && "[object WeakSet]" == bu(t5);
      }, Wr.join = function(t5, e4) {
        return null == t5 ? "" : dr.call(t5, e4);
      }, Wr.kebabCase = Ka, Wr.last = Xi, Wr.lastIndexOf = function(t5, e4, r3) {
        var n3 = null == t5 ? 0 : t5.length;
        if (!n3) return -1;
        var i3 = n3;
        return r3 !== u2 && (i3 = (i3 = da(r3)) < 0 ? gr(n3 + i3, 0) : Ar(i3, n3 - 1)), e4 == e4 ? function(t6, e5, r4) {
          for (var u3 = r4 + 1; u3--; ) if (t6[u3] === e5) return u3;
          return u3;
        }(t5, e4, i3) : ze2(t5, Le2, i3, true);
      }, Wr.lowerCase = Ja, Wr.lowerFirst = Ga, Wr.lt = pa, Wr.lte = Da, Wr.max = function(t5) {
        return t5 && t5.length ? Cu(t5, os, wu) : u2;
      }, Wr.maxBy = function(t5, e4) {
        return t5 && t5.length ? Cu(t5, ci(e4, 2), wu) : u2;
      }, Wr.mean = function(t5) {
        return Ve2(t5, os);
      }, Wr.meanBy = function(t5, e4) {
        return Ve2(t5, ci(e4, 2));
      }, Wr.min = function(t5) {
        return t5 && t5.length ? Cu(t5, os, zu) : u2;
      }, Wr.minBy = function(t5, e4) {
        return t5 && t5.length ? Cu(t5, ci(e4, 2), zu) : u2;
      }, Wr.stubArray = Bs, Wr.stubFalse = gs, Wr.stubObject = function() {
        return {};
      }, Wr.stubString = function() {
        return "";
      }, Wr.stubTrue = function() {
        return true;
      }, Wr.multiply = _s, Wr.nth = function(t5, e4) {
        return t5 && t5.length ? $u(t5, da(e4)) : u2;
      }, Wr.noConflict = function() {
        return he2._ === this && (he2._ = Wt3), this;
      }, Wr.noop = ls, Wr.now = Oo, Wr.pad = function(t5, e4, r3) {
        t5 = Fa(t5);
        var u3 = (e4 = da(e4)) ? lr(t5) : 0;
        if (!e4 || u3 >= e4) return t5;
        var n3 = (e4 - u3) / 2;
        return Zn(de3(n3), r3) + t5 + Zn(Ce3(n3), r3);
      }, Wr.padEnd = function(t5, e4, r3) {
        t5 = Fa(t5);
        var u3 = (e4 = da(e4)) ? lr(t5) : 0;
        return e4 && u3 < e4 ? t5 + Zn(e4 - u3, r3) : t5;
      }, Wr.padStart = function(t5, e4, r3) {
        t5 = Fa(t5);
        var u3 = (e4 = da(e4)) ? lr(t5) : 0;
        return e4 && u3 < e4 ? Zn(e4 - u3, r3) + t5 : t5;
      }, Wr.parseInt = function(t5, e4, r3) {
        return r3 || null == e4 ? e4 = 0 : e4 && (e4 = +e4), yr(Fa(t5).replace(it2, ""), e4 || 0);
      }, Wr.random = function(t5, e4, r3) {
        if (r3 && "boolean" != typeof r3 && Fi(t5, e4, r3) && (e4 = r3 = u2), r3 === u2 && ("boolean" == typeof e4 ? (r3 = e4, e4 = u2) : "boolean" == typeof t5 && (r3 = t5, t5 = u2)), t5 === u2 && e4 === u2 ? (t5 = 0, e4 = 1) : (t5 = Ca(t5), e4 === u2 ? (e4 = t5, t5 = 0) : e4 = Ca(e4)), t5 > e4) {
          var n3 = t5;
          t5 = e4, e4 = n3;
        }
        if (r3 || t5 % 1 || e4 % 1) {
          var i3 = Er();
          return Ar(t5 + i3 * (e4 - t5 + se2("1e-" + ((i3 + "").length - 1))), e4);
        }
        return Gu(t5, e4);
      }, Wr.reduce = function(t5, e4, r3) {
        var u3 = Ko(t5) ? Re2 : Ze2, n3 = arguments.length < 3;
        return u3(t5, ci(e4, 4), r3, n3, pu);
      }, Wr.reduceRight = function(t5, e4, r3) {
        var u3 = Ko(t5) ? Se2 : Ze2, n3 = arguments.length < 3;
        return u3(t5, ci(e4, 4), r3, n3, Du);
      }, Wr.repeat = function(t5, e4, r3) {
        return e4 = (r3 ? Fi(t5, e4, r3) : e4 === u2) ? 1 : da(e4), Hu(Fa(t5), e4);
      }, Wr.replace = function() {
        var t5 = arguments, e4 = Fa(t5[0]);
        return t5.length < 3 ? e4 : e4.replace(t5[1], t5[2]);
      }, Wr.result = function(t5, e4, r3) {
        var n3 = -1, i3 = (e4 = Fn(e4, t5)).length;
        for (i3 || (i3 = 1, t5 = u2); ++n3 < i3; ) {
          var o3 = null == t5 ? u2 : t5[zi(e4[n3])];
          o3 === u2 && (n3 = i3, o3 = r3), t5 = ta(o3) ? o3.call(t5) : o3;
        }
        return t5;
      }, Wr.round = bs, Wr.runInContext = t4, Wr.sample = function(t5) {
        return (Ko(t5) ? Xr : Xu)(t5);
      }, Wr.size = function(t5) {
        if (null == t5) return 0;
        if (Go(t5)) return ca(t5) ? lr(t5) : t5.length;
        var e4 = Ci(t5);
        return e4 == m2 || e4 == O2 ? t5.size : Iu(t5).length;
      }, Wr.snakeCase = Ha, Wr.some = function(t5, e4, r3) {
        var n3 = Ko(t5) ? Te2 : on;
        return r3 && Fi(t5, e4, r3) && (e4 = u2), n3(t5, ci(e4, 3));
      }, Wr.sortedIndex = function(t5, e4) {
        return an(t5, e4);
      }, Wr.sortedIndexBy = function(t5, e4, r3) {
        return sn(t5, e4, ci(r3, 2));
      }, Wr.sortedIndexOf = function(t5, e4) {
        var r3 = null == t5 ? 0 : t5.length;
        if (r3) {
          var u3 = an(t5, e4);
          if (u3 < r3 && Vo(t5[u3], e4)) return u3;
        }
        return -1;
      }, Wr.sortedLastIndex = function(t5, e4) {
        return an(t5, e4, true);
      }, Wr.sortedLastIndexBy = function(t5, e4, r3) {
        return sn(t5, e4, ci(r3, 2), true);
      }, Wr.sortedLastIndexOf = function(t5, e4) {
        if (null == t5 ? 0 : t5.length) {
          var r3 = an(t5, e4, true) - 1;
          if (Vo(t5[r3], e4)) return r3;
        }
        return -1;
      }, Wr.startCase = Ya, Wr.startsWith = function(t5, e4, r3) {
        return t5 = Fa(t5), r3 = null == r3 ? 0 : su(da(r3), 0, t5.length), e4 = ln(e4), t5.slice(r3, r3 + e4.length) == e4;
      }, Wr.subtract = ws, Wr.sum = function(t5) {
        return t5 && t5.length ? Ke2(t5, os) : 0;
      }, Wr.sumBy = function(t5, e4) {
        return t5 && t5.length ? Ke2(t5, ci(e4, 2)) : 0;
      }, Wr.template = function(t5, e4, r3) {
        var n3 = Wr.templateSettings;
        r3 && Fi(t5, e4, r3) && (e4 = u2), t5 = Fa(t5), e4 = ma({}, e4, n3, ti);
        var i3, o3, a3 = ma({}, e4.imports, n3.imports, ti), s3 = Ra(a3), f3 = Ye2(a3, s3), c3 = 0, l3 = e4.interpolate || Ft2, h3 = "__p += '", p3 = xt3((e4.escape || Ft2).source + "|" + l3.source + "|" + (l3 === Q2 ? pt2 : Ft2).source + "|" + (e4.evaluate || Ft2).source + "|$", "g"), D3 = "//# sourceURL=" + (Tt3.call(e4, "sourceURL") ? (e4.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++ne2 + "]") + "\n";
        t5.replace(p3, function(e5, r4, u3, n4, a4, s4) {
          return u3 || (u3 = n4), h3 += t5.slice(c3, s4).replace(yt2, nr2), r4 && (i3 = true, h3 += "' +\n__e(" + r4 + ") +\n'"), a4 && (o3 = true, h3 += "';\n" + a4 + ";\n__p += '"), u3 && (h3 += "' +\n((__t = (" + u3 + ")) == null ? '' : __t) +\n'"), c3 = s4 + e5.length, e5;
        }), h3 += "';\n";
        var v3 = Tt3.call(e4, "variable") && e4.variable;
        if (v3) {
          if (lt2.test(v3)) throw new mt3("Invalid `variable` option passed into `_.template`");
        } else h3 = "with (obj) {\n" + h3 + "\n}\n";
        h3 = (o3 ? h3.replace($2, "") : h3).replace(U2, "$1").replace(Z2, "$1;"), h3 = "function(" + (v3 || "obj") + ") {\n" + (v3 ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (i3 ? ", __e = _.escape" : "") + (o3 ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + h3 + "return __p\n}";
        var C3 = es(function() {
          return _t3(s3, D3 + "return " + h3).apply(u2, f3);
        });
        if (C3.source = h3, Qo(C3)) throw C3;
        return C3;
      }, Wr.times = function(t5, e4) {
        if ((t5 = da(t5)) < 1 || t5 > p2) return [];
        var r3 = v2, u3 = Ar(t5, v2);
        e4 = ci(e4), t5 -= v2;
        for (var n3 = Je2(u3, e4); ++r3 < t5; ) e4(r3);
        return n3;
      }, Wr.toFinite = Ca, Wr.toInteger = da, Wr.toLength = Ba, Wr.toLower = function(t5) {
        return Fa(t5).toLowerCase();
      }, Wr.toNumber = ga, Wr.toSafeInteger = function(t5) {
        return t5 ? su(da(t5), -9007199254740991, p2) : 0 === t5 ? t5 : 0;
      }, Wr.toString = Fa, Wr.toUpper = function(t5) {
        return Fa(t5).toUpperCase();
      }, Wr.trim = function(t5, e4, r3) {
        if ((t5 = Fa(t5)) && (r3 || e4 === u2)) return Ge2(t5);
        if (!t5 || !(e4 = ln(e4))) return t5;
        var n3 = hr(t5), i3 = hr(e4);
        return En(n3, Qe2(n3, i3), tr2(n3, i3) + 1).join("");
      }, Wr.trimEnd = function(t5, e4, r3) {
        if ((t5 = Fa(t5)) && (r3 || e4 === u2)) return t5.slice(0, pr(t5) + 1);
        if (!t5 || !(e4 = ln(e4))) return t5;
        var n3 = hr(t5);
        return En(n3, 0, tr2(n3, hr(e4)) + 1).join("");
      }, Wr.trimStart = function(t5, e4, r3) {
        if ((t5 = Fa(t5)) && (r3 || e4 === u2)) return t5.replace(it2, "");
        if (!t5 || !(e4 = ln(e4))) return t5;
        var n3 = hr(t5);
        return En(n3, Qe2(n3, hr(e4))).join("");
      }, Wr.truncate = function(t5, e4) {
        var r3 = 30, n3 = "...";
        if (ua(e4)) {
          var i3 = "separator" in e4 ? e4.separator : i3;
          r3 = "length" in e4 ? da(e4.length) : r3, n3 = "omission" in e4 ? ln(e4.omission) : n3;
        }
        var o3 = (t5 = Fa(t5)).length;
        if (ir2(t5)) {
          var a3 = hr(t5);
          o3 = a3.length;
        }
        if (r3 >= o3) return t5;
        var s3 = r3 - lr(n3);
        if (s3 < 1) return n3;
        var f3 = a3 ? En(a3, 0, s3).join("") : t5.slice(0, s3);
        if (i3 === u2) return f3 + n3;
        if (a3 && (s3 += f3.length - s3), sa(i3)) {
          if (t5.slice(s3).search(i3)) {
            var c3, l3 = f3;
            for (i3.global || (i3 = xt3(i3.source, Fa(Dt2.exec(i3)) + "g")), i3.lastIndex = 0; c3 = i3.exec(l3); ) var h3 = c3.index;
            f3 = f3.slice(0, h3 === u2 ? s3 : h3);
          }
        } else if (t5.indexOf(ln(i3), s3) != s3) {
          var p3 = f3.lastIndexOf(i3);
          p3 > -1 && (f3 = f3.slice(0, p3));
        }
        return f3 + n3;
      }, Wr.unescape = function(t5) {
        return (t5 = Fa(t5)) && G2.test(t5) ? t5.replace(K2, Dr) : t5;
      }, Wr.uniqueId = function(t5) {
        var e4 = ++It3;
        return Fa(t5) + e4;
      }, Wr.upperCase = Xa, Wr.upperFirst = Qa, Wr.each = Fo, Wr.eachRight = yo, Wr.first = Ji, cs(Wr, (ms = {}, Fu(Wr, function(t5, e4) {
        Tt3.call(Wr.prototype, e4) || (ms[e4] = t5);
      }), ms), { chain: false }), Wr.VERSION = "4.17.21", be2(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t5) {
        Wr[t5].placeholder = Wr;
      }), be2(["drop", "take"], function(t5, e4) {
        Ur.prototype[t5] = function(r3) {
          r3 = r3 === u2 ? 1 : gr(da(r3), 0);
          var n3 = this.__filtered__ && !e4 ? new Ur(this) : this.clone();
          return n3.__filtered__ ? n3.__takeCount__ = Ar(r3, n3.__takeCount__) : n3.__views__.push({ size: Ar(r3, v2), type: t5 + (n3.__dir__ < 0 ? "Right" : "") }), n3;
        }, Ur.prototype[t5 + "Right"] = function(e5) {
          return this.reverse()[t5](e5).reverse();
        };
      }), be2(["filter", "map", "takeWhile"], function(t5, e4) {
        var r3 = e4 + 1, u3 = 1 == r3 || 3 == r3;
        Ur.prototype[t5] = function(t6) {
          var e5 = this.clone();
          return e5.__iteratees__.push({ iteratee: ci(t6, 3), type: r3 }), e5.__filtered__ = e5.__filtered__ || u3, e5;
        };
      }), be2(["head", "last"], function(t5, e4) {
        var r3 = "take" + (e4 ? "Right" : "");
        Ur.prototype[t5] = function() {
          return this[r3](1).value()[0];
        };
      }), be2(["initial", "tail"], function(t5, e4) {
        var r3 = "drop" + (e4 ? "" : "Right");
        Ur.prototype[t5] = function() {
          return this.__filtered__ ? new Ur(this) : this[r3](1);
        };
      }), Ur.prototype.compact = function() {
        return this.filter(os);
      }, Ur.prototype.find = function(t5) {
        return this.filter(t5).head();
      }, Ur.prototype.findLast = function(t5) {
        return this.reverse().find(t5);
      }, Ur.prototype.invokeMap = Yu(function(t5, e4) {
        return "function" == typeof t5 ? new Ur(this) : this.map(function(r3) {
          return ju(r3, t5, e4);
        });
      }), Ur.prototype.reject = function(t5) {
        return this.filter(qo(ci(t5)));
      }, Ur.prototype.slice = function(t5, e4) {
        t5 = da(t5);
        var r3 = this;
        return r3.__filtered__ && (t5 > 0 || e4 < 0) ? new Ur(r3) : (t5 < 0 ? r3 = r3.takeRight(-t5) : t5 && (r3 = r3.drop(t5)), e4 !== u2 && (r3 = (e4 = da(e4)) < 0 ? r3.dropRight(-e4) : r3.take(e4 - t5)), r3);
      }, Ur.prototype.takeRightWhile = function(t5) {
        return this.reverse().takeWhile(t5).reverse();
      }, Ur.prototype.toArray = function() {
        return this.take(v2);
      }, Fu(Ur.prototype, function(t5, e4) {
        var r3 = /^(?:filter|find|map|reject)|While$/.test(e4), n3 = /^(?:head|last)$/.test(e4), i3 = Wr[n3 ? "take" + ("last" == e4 ? "Right" : "") : e4], o3 = n3 || /^find/.test(e4);
        i3 && (Wr.prototype[e4] = function() {
          var e5 = this.__wrapped__, a3 = n3 ? [1] : arguments, s3 = e5 instanceof Ur, f3 = a3[0], c3 = s3 || Ko(e5), l3 = function(t6) {
            var e6 = i3.apply(Wr, Ne2([t6], a3));
            return n3 && h3 ? e6[0] : e6;
          };
          c3 && r3 && "function" == typeof f3 && 1 != f3.length && (s3 = c3 = false);
          var h3 = this.__chain__, p3 = !!this.__actions__.length, D3 = o3 && !h3, v3 = s3 && !p3;
          if (!o3 && c3) {
            e5 = v3 ? e5 : new Ur(this);
            var C3 = t5.apply(e5, a3);
            return C3.__actions__.push({ func: vo, args: [l3], thisArg: u2 }), new $r(C3, h3);
          }
          return D3 && v3 ? t5.apply(this, a3) : (C3 = this.thru(l3), D3 ? n3 ? C3.value()[0] : C3.value() : C3);
        });
      }), be2(["pop", "push", "shift", "sort", "splice", "unshift"], function(t5) {
        var e4 = jt3[t5], r3 = /^(?:push|sort|unshift)$/.test(t5) ? "tap" : "thru", u3 = /^(?:pop|shift)$/.test(t5);
        Wr.prototype[t5] = function() {
          var t6 = arguments;
          if (u3 && !this.__chain__) {
            var n3 = this.value();
            return e4.apply(Ko(n3) ? n3 : [], t6);
          }
          return this[r3](function(r4) {
            return e4.apply(Ko(r4) ? r4 : [], t6);
          });
        };
      }), Fu(Ur.prototype, function(t5, e4) {
        var r3 = Wr[e4];
        if (r3) {
          var u3 = r3.name + "";
          Tt3.call(kr, u3) || (kr[u3] = []), kr[u3].push({ name: e4, func: r3 });
        }
      }), kr[Ln(u2, 2).name] = [{ name: "wrapper", func: u2 }], Ur.prototype.clone = function() {
        var t5 = new Ur(this.__wrapped__);
        return t5.__actions__ = jn(this.__actions__), t5.__dir__ = this.__dir__, t5.__filtered__ = this.__filtered__, t5.__iteratees__ = jn(this.__iteratees__), t5.__takeCount__ = this.__takeCount__, t5.__views__ = jn(this.__views__), t5;
      }, Ur.prototype.reverse = function() {
        if (this.__filtered__) {
          var t5 = new Ur(this);
          t5.__dir__ = -1, t5.__filtered__ = true;
        } else (t5 = this.clone()).__dir__ *= -1;
        return t5;
      }, Ur.prototype.value = function() {
        var t5 = this.__wrapped__.value(), e4 = this.__dir__, r3 = Ko(t5), u3 = e4 < 0, n3 = r3 ? t5.length : 0, i3 = function(t6, e5, r4) {
          var u4 = -1, n4 = r4.length;
          for (; ++u4 < n4; ) {
            var i4 = r4[u4], o4 = i4.size;
            switch (i4.type) {
              case "drop":
                t6 += o4;
                break;
              case "dropRight":
                e5 -= o4;
                break;
              case "take":
                e5 = Ar(e5, t6 + o4);
                break;
              case "takeRight":
                t6 = gr(t6, e5 - o4);
            }
          }
          return { start: t6, end: e5 };
        }(0, n3, this.__views__), o3 = i3.start, a3 = i3.end, s3 = a3 - o3, f3 = u3 ? a3 : o3 - 1, c3 = this.__iteratees__, l3 = c3.length, h3 = 0, p3 = Ar(s3, this.__takeCount__);
        if (!r3 || !u3 && n3 == s3 && p3 == s3) return Cn(t5, this.__actions__);
        var D3 = [];
        t: for (; s3-- && h3 < p3; ) {
          for (var v3 = -1, C3 = t5[f3 += e4]; ++v3 < l3; ) {
            var d3 = c3[v3], B3 = d3.iteratee, g3 = d3.type, A3 = B3(C3);
            if (2 == g3) C3 = A3;
            else if (!A3) {
              if (1 == g3) continue t;
              break t;
            }
          }
          D3[h3++] = C3;
        }
        return D3;
      }, Wr.prototype.at = Co, Wr.prototype.chain = function() {
        return Do(this);
      }, Wr.prototype.commit = function() {
        return new $r(this.value(), this.__chain__);
      }, Wr.prototype.next = function() {
        this.__values__ === u2 && (this.__values__ = va(this.value()));
        var t5 = this.__index__ >= this.__values__.length;
        return { done: t5, value: t5 ? u2 : this.__values__[this.__index__++] };
      }, Wr.prototype.plant = function(t5) {
        for (var e4, r3 = this; r3 instanceof Vr; ) {
          var n3 = Wi(r3);
          n3.__index__ = 0, n3.__values__ = u2, e4 ? i3.__wrapped__ = n3 : e4 = n3;
          var i3 = n3;
          r3 = r3.__wrapped__;
        }
        return i3.__wrapped__ = t5, e4;
      }, Wr.prototype.reverse = function() {
        var t5 = this.__wrapped__;
        if (t5 instanceof Ur) {
          var e4 = t5;
          return this.__actions__.length && (e4 = new Ur(this)), (e4 = e4.reverse()).__actions__.push({ func: vo, args: [ro], thisArg: u2 }), new $r(e4, this.__chain__);
        }
        return this.thru(ro);
      }, Wr.prototype.toJSON = Wr.prototype.valueOf = Wr.prototype.value = function() {
        return Cn(this.__wrapped__, this.__actions__);
      }, Wr.prototype.first = Wr.prototype.head, ee3 && (Wr.prototype[ee3] = function() {
        return this;
      }), Wr;
    }();
    De2 ? ((De2.exports = vr)._ = vr, pe2._ = vr) : he2._ = vr;
  }).call(r);
});
function n(t3) {
  return "[object Object]" === Object.prototype.toString.call(t3);
}
function i(t3) {
  var e2, r2;
  return false !== n(t3) && (void 0 === (e2 = t3.constructor) || false !== n(r2 = e2.prototype) && false !== r2.hasOwnProperty("isPrototypeOf"));
}
function o(t3) {
  for (var e2 = arguments.length, r2 = Array(e2 > 1 ? e2 - 1 : 0), u2 = 1; u2 < e2; u2++) r2[u2 - 1] = arguments[u2];
  if ("production" !== process.env.NODE_ENV) {
    var n2 = K[t3], i2 = n2 ? "function" == typeof n2 ? n2.apply(null, r2) : n2 : "unknown error nr: " + t3;
    throw Error("[Immer] " + i2);
  }
  throw Error("[Immer] minified error nr: " + t3 + (r2.length ? " " + r2.map(function(t4) {
    return "'" + t4 + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function a(t3) {
  return !!t3 && !!t3[Z];
}
function s(t3) {
  return !!t3 && (function(t4) {
    if (!t4 || "object" != typeof t4) return false;
    var e2 = Object.getPrototypeOf(t4);
    if (null === e2) return true;
    var r2 = Object.hasOwnProperty.call(e2, "constructor") && e2.constructor;
    return r2 === Object || "function" == typeof r2 && Function.toString.call(r2) === J;
  }(t3) || Array.isArray(t3) || !!t3[U] || !!t3.constructor[U] || p(t3) || D(t3));
}
function f(t3, e2, r2) {
  void 0 === r2 && (r2 = false), 0 === c(t3) ? (r2 ? Object.keys : G)(t3).forEach(function(u2) {
    r2 && "symbol" == typeof u2 || e2(u2, t3[u2], t3);
  }) : t3.forEach(function(r3, u2) {
    return e2(u2, r3, t3);
  });
}
function c(t3) {
  var e2 = t3[Z];
  return e2 ? e2.i > 3 ? e2.i - 4 : e2.i : Array.isArray(t3) ? 1 : p(t3) ? 2 : D(t3) ? 3 : 0;
}
function l(t3, e2) {
  return 2 === c(t3) ? t3.has(e2) : Object.prototype.hasOwnProperty.call(t3, e2);
}
function h(t3, e2, r2) {
  var u2 = c(t3);
  2 === u2 ? t3.set(e2, r2) : 3 === u2 ? (t3.delete(e2), t3.add(r2)) : t3[e2] = r2;
}
function p(t3) {
  return W && t3 instanceof Map;
}
function D(t3) {
  return L && t3 instanceof Set;
}
function v(t3) {
  return t3.o || t3.t;
}
function C(t3) {
  if (Array.isArray(t3)) return Array.prototype.slice.call(t3);
  var e2 = H(t3);
  delete e2[Z];
  for (var r2 = G(e2), u2 = 0; u2 < r2.length; u2++) {
    var n2 = r2[u2], i2 = e2[n2];
    false === i2.writable && (i2.writable = true, i2.configurable = true), (i2.get || i2.set) && (e2[n2] = { configurable: true, writable: true, enumerable: i2.enumerable, value: t3[n2] });
  }
  return Object.create(Object.getPrototypeOf(t3), e2);
}
function d(t3, e2) {
  return void 0 === e2 && (e2 = false), g(t3) || a(t3) || !s(t3) || (c(t3) > 1 && (t3.set = t3.add = t3.clear = t3.delete = B), Object.freeze(t3), e2 && f(t3, function(t4, e3) {
    return d(e3, true);
  }, true)), t3;
}
function B() {
  o(2);
}
function g(t3) {
  return null == t3 || "object" != typeof t3 || Object.isFrozen(t3);
}
function A(t3) {
  var e2 = Y[t3];
  return e2 || o(18, t3), e2;
}
function F() {
  return "production" === process.env.NODE_ENV || z || o(0), z;
}
function y(t3, e2) {
  e2 && (A("Patches"), t3.u = [], t3.s = [], t3.v = e2);
}
function E(t3) {
  m(t3), t3.p.forEach(b), t3.p = null;
}
function m(t3) {
  t3 === z && (z = t3.l);
}
function _(t3) {
  return z = { p: [], l: z, h: t3, m: true, _: 0 };
}
function b(t3) {
  var e2 = t3[Z];
  0 === e2.i || 1 === e2.i ? e2.j() : e2.O = true;
}
function w(t3, e2) {
  e2._ = e2.p.length;
  var r2 = e2.p[0], u2 = void 0 !== t3 && t3 !== r2;
  return e2.h.g || A("ES5").S(e2, t3, u2), u2 ? (r2[Z].P && (E(e2), o(4)), s(t3) && (t3 = x(e2, t3), e2.l || P(e2, t3)), e2.u && A("Patches").M(r2[Z].t, t3, e2.u, e2.s)) : t3 = x(e2, r2, []), E(e2), e2.u && e2.v(e2.u, e2.s), t3 !== $ ? t3 : void 0;
}
function x(t3, e2, r2) {
  if (g(e2)) return e2;
  var u2 = e2[Z];
  if (!u2) return f(e2, function(n3, i2) {
    return O(t3, u2, e2, n3, i2, r2);
  }, true), e2;
  if (u2.A !== t3) return e2;
  if (!u2.P) return P(t3, u2.t, true), u2.t;
  if (!u2.I) {
    u2.I = true, u2.A._--;
    var n2 = 4 === u2.i || 5 === u2.i ? u2.o = C(u2.k) : u2.o;
    f(3 === u2.i ? new Set(n2) : n2, function(e3, i2) {
      return O(t3, u2, n2, e3, i2, r2);
    }), P(t3, n2, false), r2 && t3.u && A("Patches").R(u2, r2, t3.u, t3.s);
  }
  return u2.o;
}
function O(t3, e2, r2, u2, n2, i2) {
  if ("production" !== process.env.NODE_ENV && n2 === r2 && o(5), a(n2)) {
    var f2 = x(t3, n2, i2 && e2 && 3 !== e2.i && !l(e2.D, u2) ? i2.concat(u2) : void 0);
    if (h(r2, u2, f2), !a(f2)) return;
    t3.m = false;
  }
  if (s(n2) && !g(n2)) {
    if (!t3.h.F && t3._ < 1) return;
    x(t3, n2), e2 && e2.A.l || P(t3, n2);
  }
}
function P(t3, e2, r2) {
  void 0 === r2 && (r2 = false), t3.h.F && t3.m && d(e2, r2);
}
function j(t3, e2) {
  var r2 = t3[Z];
  return (r2 ? v(r2) : t3)[e2];
}
function k(t3, e2) {
  if (e2 in t3) for (var r2 = Object.getPrototypeOf(t3); r2; ) {
    var u2 = Object.getOwnPropertyDescriptor(r2, e2);
    if (u2) return u2;
    r2 = Object.getPrototypeOf(r2);
  }
}
function N(t3) {
  t3.P || (t3.P = true, t3.l && N(t3.l));
}
function R(t3) {
  t3.o || (t3.o = C(t3.t));
}
function S(t3, e2, r2) {
  var u2 = p(e2) ? A("MapSet").N(e2, r2) : D(e2) ? A("MapSet").T(e2, r2) : t3.g ? function(t4, e3) {
    var r3 = Array.isArray(t4), u3 = { i: r3 ? 1 : 0, A: e3 ? e3.A : F(), P: false, I: false, D: {}, l: e3, t: t4, k: null, o: null, j: null, C: false }, n2 = u3, i2 = X;
    r3 && (n2 = [u3], i2 = Q);
    var o2 = Proxy.revocable(n2, i2), a2 = o2.revoke, s2 = o2.proxy;
    return u3.k = s2, u3.j = a2, s2;
  }(e2, r2) : A("ES5").J(e2, r2);
  return (r2 ? r2.A : F()).p.push(u2), u2;
}
function T(t3) {
  return a(t3) || o(22, t3), function t4(e2) {
    if (!s(e2)) return e2;
    var r2, u2 = e2[Z], n2 = c(e2);
    if (u2) {
      if (!u2.P && (u2.i < 4 || !A("ES5").K(u2))) return u2.t;
      u2.I = true, r2 = I(e2, n2), u2.I = false;
    } else r2 = I(e2, n2);
    return f(r2, function(e3, n3) {
      u2 && function(t5, e4) {
        return 2 === c(t5) ? t5.get(e4) : t5[e4];
      }(u2.t, e3) === n3 || h(r2, e3, t4(n3));
    }), 3 === n2 ? new Set(r2) : r2;
  }(t3);
}
function I(t3, e2) {
  switch (e2) {
    case 2:
      return new Map(t3);
    case 3:
      return Array.from(t3);
  }
  return C(t3);
}
var q, z, M = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"), W = "undefined" != typeof Map, L = "undefined" != typeof Set, V = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect, $ = M ? Symbol.for("immer-nothing") : ((q = {})["immer-nothing"] = true, q), U = M ? Symbol.for("immer-draftable") : "__$immer_draftable", Z = M ? Symbol.for("immer-state") : "__$immer_state", K = { 0: "Illegal state", 1: "Immer drafts cannot have computed properties", 2: "This object has been frozen and should not be mutated", 3: function(t3) {
  return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + t3;
}, 4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.", 5: "Immer forbids circular references", 6: "The first or second argument to `produce` must be a function", 7: "The third argument to `produce` must be a function or undefined", 8: "First argument to `createDraft` must be a plain object, an array, or an immerable object", 9: "First argument to `finishDraft` must be a draft returned by `createDraft`", 10: "The given draft is already finalized", 11: "Object.defineProperty() cannot be used on an Immer draft", 12: "Object.setPrototypeOf() cannot be used on an Immer draft", 13: "Immer only supports deleting array indices", 14: "Immer only supports setting array indices and the 'length' property", 15: function(t3) {
  return "Cannot apply patch, path doesn't resolve: " + t3;
}, 16: 'Sets cannot have "replace" patches.', 17: function(t3) {
  return "Unsupported patch operation: " + t3;
}, 18: function(t3) {
  return "The plugin for '" + t3 + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + t3 + "()` when initializing your application.";
}, 20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available", 21: function(t3) {
  return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + t3 + "'";
}, 22: function(t3) {
  return "'current' expects a draft, got: " + t3;
}, 23: function(t3) {
  return "'original' expects a draft, got: " + t3;
}, 24: "Patching reserved attributes like __proto__, prototype and constructor is not allowed" }, J = "" + Object.prototype.constructor, G = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function(t3) {
  return Object.getOwnPropertyNames(t3).concat(Object.getOwnPropertySymbols(t3));
} : Object.getOwnPropertyNames, H = Object.getOwnPropertyDescriptors || function(t3) {
  var e2 = {};
  return G(t3).forEach(function(r2) {
    e2[r2] = Object.getOwnPropertyDescriptor(t3, r2);
  }), e2;
}, Y = {}, X = { get: function(t3, e2) {
  if (e2 === Z) return t3;
  var r2 = v(t3);
  if (!l(r2, e2)) return function(t4, e3, r3) {
    var u3, n2 = k(e3, r3);
    return n2 ? "value" in n2 ? n2.value : null === (u3 = n2.get) || void 0 === u3 ? void 0 : u3.call(t4.k) : void 0;
  }(t3, r2, e2);
  var u2 = r2[e2];
  return t3.I || !s(u2) ? u2 : u2 === j(t3.t, e2) ? (R(t3), t3.o[e2] = S(t3.A.h, u2, t3)) : u2;
}, has: function(t3, e2) {
  return e2 in v(t3);
}, ownKeys: function(t3) {
  return Reflect.ownKeys(v(t3));
}, set: function(t3, e2, r2) {
  var u2 = k(v(t3), e2);
  if (null == u2 ? void 0 : u2.set) return u2.set.call(t3.k, r2), true;
  if (!t3.P) {
    var n2 = j(v(t3), e2), i2 = null == n2 ? void 0 : n2[Z];
    if (i2 && i2.t === r2) return t3.o[e2] = r2, t3.D[e2] = false, true;
    if (function(t4, e3) {
      return t4 === e3 ? 0 !== t4 || 1 / t4 == 1 / e3 : t4 != t4 && e3 != e3;
    }(r2, n2) && (void 0 !== r2 || l(t3.t, e2))) return true;
    R(t3), N(t3);
  }
  return t3.o[e2] === r2 && "number" != typeof r2 && (void 0 !== r2 || e2 in t3.o) || (t3.o[e2] = r2, t3.D[e2] = true, true);
}, deleteProperty: function(t3, e2) {
  return void 0 !== j(t3.t, e2) || e2 in t3.t ? (t3.D[e2] = false, R(t3), N(t3)) : delete t3.D[e2], t3.o && delete t3.o[e2], true;
}, getOwnPropertyDescriptor: function(t3, e2) {
  var r2 = v(t3), u2 = Reflect.getOwnPropertyDescriptor(r2, e2);
  return u2 ? { writable: true, configurable: 1 !== t3.i || "length" !== e2, enumerable: u2.enumerable, value: r2[e2] } : u2;
}, defineProperty: function() {
  o(11);
}, getPrototypeOf: function(t3) {
  return Object.getPrototypeOf(t3.t);
}, setPrototypeOf: function() {
  o(12);
} }, Q = {};
f(X, function(t3, e2) {
  Q[t3] = function() {
    return arguments[0] = arguments[0][0], e2.apply(this, arguments);
  };
}), Q.deleteProperty = function(t3, e2) {
  return "production" !== process.env.NODE_ENV && isNaN(parseInt(e2)) && o(13), Q.set.call(this, t3, e2, void 0);
}, Q.set = function(t3, e2, r2) {
  return "production" !== process.env.NODE_ENV && "length" !== e2 && isNaN(parseInt(e2)) && o(14), X.set.call(this, t3[0], e2, r2, t3[0]);
};
var tt = function() {
  function t3(t4) {
    var e3 = this;
    this.g = V, this.F = true, this.produce = function(t5, r2, u2) {
      if ("function" == typeof t5 && "function" != typeof r2) {
        var n2 = r2;
        r2 = t5;
        var i2 = e3;
        return function(t6) {
          var e4 = this;
          void 0 === t6 && (t6 = n2);
          for (var u3 = arguments.length, o2 = Array(u3 > 1 ? u3 - 1 : 0), a3 = 1; a3 < u3; a3++) o2[a3 - 1] = arguments[a3];
          return i2.produce(t6, function(t7) {
            var u4;
            return (u4 = r2).call.apply(u4, [e4, t7].concat(o2));
          });
        };
      }
      var a2;
      if ("function" != typeof r2 && o(6), void 0 !== u2 && "function" != typeof u2 && o(7), s(t5)) {
        var f2 = _(e3), c2 = S(e3, t5, void 0), l2 = true;
        try {
          a2 = r2(c2), l2 = false;
        } finally {
          l2 ? E(f2) : m(f2);
        }
        return "undefined" != typeof Promise && a2 instanceof Promise ? a2.then(function(t6) {
          return y(f2, u2), w(t6, f2);
        }, function(t6) {
          throw E(f2), t6;
        }) : (y(f2, u2), w(a2, f2));
      }
      if (!t5 || "object" != typeof t5) {
        if (void 0 === (a2 = r2(t5)) && (a2 = t5), a2 === $ && (a2 = void 0), e3.F && d(a2, true), u2) {
          var h2 = [], p2 = [];
          A("Patches").M(t5, a2, h2, p2), u2(h2, p2);
        }
        return a2;
      }
      o(21, t5);
    }, this.produceWithPatches = function(t5, r2) {
      if ("function" == typeof t5) return function(r3) {
        for (var u3 = arguments.length, n3 = Array(u3 > 1 ? u3 - 1 : 0), i3 = 1; i3 < u3; i3++) n3[i3 - 1] = arguments[i3];
        return e3.produceWithPatches(r3, function(e4) {
          return t5.apply(void 0, [e4].concat(n3));
        });
      };
      var u2, n2, i2 = e3.produce(t5, r2, function(t6, e4) {
        u2 = t6, n2 = e4;
      });
      return "undefined" != typeof Promise && i2 instanceof Promise ? i2.then(function(t6) {
        return [t6, u2, n2];
      }) : [i2, u2, n2];
    }, "boolean" == typeof (null == t4 ? void 0 : t4.useProxies) && this.setUseProxies(t4.useProxies), "boolean" == typeof (null == t4 ? void 0 : t4.autoFreeze) && this.setAutoFreeze(t4.autoFreeze);
  }
  var e2 = t3.prototype;
  return e2.createDraft = function(t4) {
    s(t4) || o(8), a(t4) && (t4 = T(t4));
    var e3 = _(this), r2 = S(this, t4, void 0);
    return r2[Z].C = true, m(e3), r2;
  }, e2.finishDraft = function(t4, e3) {
    var r2 = t4 && t4[Z];
    "production" !== process.env.NODE_ENV && (r2 && r2.C || o(9), r2.I && o(10));
    var u2 = r2.A;
    return y(u2, e3), w(void 0, u2);
  }, e2.setAutoFreeze = function(t4) {
    this.F = t4;
  }, e2.setUseProxies = function(t4) {
    t4 && !V && o(20), this.g = t4;
  }, e2.applyPatches = function(t4, e3) {
    var r2;
    for (r2 = e3.length - 1; r2 >= 0; r2--) {
      var u2 = e3[r2];
      if (0 === u2.path.length && "replace" === u2.op) {
        t4 = u2.value;
        break;
      }
    }
    r2 > -1 && (e3 = e3.slice(r2 + 1));
    var n2 = A("Patches").$;
    return a(t4) ? n2(t4, e3) : this.produce(t4, function(t5) {
      return n2(t5, e3);
    });
  }, t3;
}(), et = new tt(), rt = et.produce, ut = (et.produceWithPatches.bind(et), et.setAutoFreeze.bind(et), et.setUseProxies.bind(et), et.applyPatches.bind(et), et.createDraft.bind(et)), nt = et.finishDraft.bind(et);
function it(t3, e2, r2) {
  return e2 in t3 ? Object.defineProperty(t3, e2, { value: r2, enumerable: true, configurable: true, writable: true }) : t3[e2] = r2, t3;
}
var ot = /* @__PURE__ */ new WeakMap(), at = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakMap(), ft = /* @__PURE__ */ new WeakMap(), ct = /* @__PURE__ */ new WeakMap(), lt = /* @__PURE__ */ new WeakMap(), ht = /* @__PURE__ */ new WeakMap();
function pt(t3, e2) {
  var r2 = Object.keys(t3);
  if (Object.getOwnPropertySymbols) {
    var u2 = Object.getOwnPropertySymbols(t3);
    e2 && (u2 = u2.filter(function(e3) {
      return Object.getOwnPropertyDescriptor(t3, e3).enumerable;
    })), r2.push.apply(r2, u2);
  }
  return r2;
}
function Dt(t3) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var r2 = null != arguments[e2] ? arguments[e2] : {};
    e2 % 2 ? pt(Object(r2), true).forEach(function(e3) {
      it(t3, e3, r2[e3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r2)) : pt(Object(r2)).forEach(function(e3) {
      Object.defineProperty(t3, e3, Object.getOwnPropertyDescriptor(r2, e3));
    });
  }
  return t3;
}
var vt = () => {
  var t3 = { children: [], operations: [], selection: null, marks: null, isInline: () => false, isVoid: () => false, onChange: () => {
  }, apply: (e2) => {
    for (var r2 of Xt.pathRefs(t3)) se.transform(r2, e2);
    for (var u2 of Xt.pointRefs(t3)) he.transform(u2, e2);
    for (var n2 of Xt.rangeRefs(t3)) Ce.transform(n2, e2);
    var i2, o2, a2 = ot.get(t3) || [], s2 = at.get(t3) || /* @__PURE__ */ new Set(), f2 = (t4) => {
      if (t4) {
        var e3 = t4.join(",");
        o2.has(e3) || (o2.add(e3), i2.push(t4));
      }
    };
    if (ae.operationCanTransformPath(e2)) for (var c2 of (i2 = [], o2 = /* @__PURE__ */ new Set(), a2)) {
      f2(ae.transform(c2, e2));
    }
    else i2 = a2, o2 = s2;
    var l2 = Ct(e2);
    for (var h2 of l2) f2(h2);
    ot.set(t3, i2), at.set(t3, o2), Le.transform(t3, e2), t3.operations.push(e2), Xt.normalize(t3), "set_selection" === e2.type && (t3.marks = null), st.get(t3) || (st.set(t3, true), Promise.resolve().then(() => {
      st.set(t3, false), t3.onChange(), t3.operations = [];
    }));
  }, addMark: (e2, r2) => {
    var { selection: u2 } = t3;
    if (u2) if (ve.isExpanded(u2)) Le.setNodes(t3, { [e2]: r2 }, { match: me.isText, split: true });
    else {
      var n2 = Dt(Dt({}, Xt.marks(t3) || {}), {}, { [e2]: r2 });
      t3.marks = n2, st.get(t3) || t3.onChange();
    }
  }, deleteBackward: (e2) => {
    var { selection: r2 } = t3;
    r2 && ve.isCollapsed(r2) && Le.delete(t3, { unit: e2, reverse: true });
  }, deleteForward: (e2) => {
    var { selection: r2 } = t3;
    r2 && ve.isCollapsed(r2) && Le.delete(t3, { unit: e2 });
  }, deleteFragment: (e2) => {
    var { selection: r2 } = t3;
    r2 && ve.isExpanded(r2) && Le.delete(t3, { reverse: "backward" === e2 });
  }, getFragment: () => {
    var { selection: e2 } = t3;
    return e2 ? ue.fragment(t3, e2) : [];
  }, insertBreak: () => {
    Le.splitNodes(t3, { always: true });
  }, insertSoftBreak: () => {
    Le.splitNodes(t3, { always: true });
  }, insertFragment: (e2) => {
    Le.insertFragment(t3, e2);
  }, insertNode: (e2) => {
    Le.insertNodes(t3, e2);
  }, insertText: (e2) => {
    var { selection: r2, marks: u2 } = t3;
    if (r2) {
      if (u2) {
        var n2 = Dt({ text: e2 }, u2);
        Le.insertNodes(t3, n2);
      } else Le.insertText(t3, e2);
      t3.marks = null;
    }
  }, normalizeNode: (e2) => {
    var [r2, u2] = e2;
    if (!me.isText(r2)) if (Zt.isElement(r2) && 0 === r2.children.length) {
      Le.insertNodes(t3, { text: "" }, { at: u2.concat(0), voids: true });
    } else for (var n2 = !Xt.isEditor(r2) && (Zt.isElement(r2) && (t3.isInline(r2) || 0 === r2.children.length || me.isText(r2.children[0]) || t3.isInline(r2.children[0]))), i2 = 0, o2 = 0; o2 < r2.children.length; o2++, i2++) {
      var a2 = ue.get(t3, u2);
      if (!me.isText(a2)) {
        var s2 = r2.children[o2], f2 = a2.children[i2 - 1], c2 = o2 === r2.children.length - 1;
        if ((me.isText(s2) || Zt.isElement(s2) && t3.isInline(s2)) !== n2) Le.removeNodes(t3, { at: u2.concat(i2), voids: true }), i2--;
        else if (Zt.isElement(s2)) {
          if (t3.isInline(s2)) if (null != f2 && me.isText(f2)) {
            if (c2) {
              Le.insertNodes(t3, { text: "" }, { at: u2.concat(i2 + 1), voids: true }), i2++;
            }
          } else {
            Le.insertNodes(t3, { text: "" }, { at: u2.concat(i2), voids: true }), i2++;
          }
        } else null != f2 && me.isText(f2) && (me.equals(s2, f2, { loose: true }) ? (Le.mergeNodes(t3, { at: u2.concat(i2), voids: true }), i2--) : "" === f2.text ? (Le.removeNodes(t3, { at: u2.concat(i2 - 1), voids: true }), i2--) : "" === s2.text && (Le.removeNodes(t3, { at: u2.concat(i2), voids: true }), i2--));
      }
    }
  }, removeMark: (e2) => {
    var { selection: r2 } = t3;
    if (r2) if (ve.isExpanded(r2)) Le.unsetNodes(t3, e2, { match: me.isText, split: true });
    else {
      var u2 = Dt({}, Xt.marks(t3) || {});
      delete u2[e2], t3.marks = u2, st.get(t3) || t3.onChange();
    }
  } };
  return t3;
}, Ct = (t3) => {
  switch (t3.type) {
    case "insert_text":
    case "remove_text":
    case "set_node":
      var { path: e2 } = t3;
      return ae.levels(e2);
    case "insert_node":
      var { node: r2, path: u2 } = t3, n2 = ae.levels(u2), i2 = me.isText(r2) ? [] : Array.from(ue.nodes(r2), (t4) => {
        var [, e3] = t4;
        return u2.concat(e3);
      });
      return [...n2, ...i2];
    case "merge_node":
      var { path: o2 } = t3;
      return [...ae.ancestors(o2), ae.previous(o2)];
    case "move_node":
      var { path: a2, newPath: s2 } = t3;
      if (ae.equals(a2, s2)) return [];
      var f2 = [], c2 = [];
      for (var l2 of ae.ancestors(a2)) {
        var h2 = ae.transform(l2, t3);
        f2.push(h2);
      }
      for (var p2 of ae.ancestors(s2)) {
        var D2 = ae.transform(p2, t3);
        c2.push(D2);
      }
      var v2 = c2[c2.length - 1], C2 = s2[s2.length - 1], d2 = v2.concat(C2);
      return [...f2, ...c2, d2];
    case "remove_node":
      var { path: B2 } = t3;
      return [...ae.ancestors(B2)];
    case "split_node":
      var { path: g2 } = t3;
      return [...ae.levels(g2), ae.next(g2)];
    default:
      return [];
  }
};
function dt(t3, e2) {
  if (null == t3) return {};
  var r2, u2, n2 = function(t4, e3) {
    if (null == t4) return {};
    var r3, u3, n3 = {}, i3 = Object.keys(t4);
    for (u3 = 0; u3 < i3.length; u3++) r3 = i3[u3], e3.indexOf(r3) >= 0 || (n3[r3] = t4[r3]);
    return n3;
  }(t3, e2);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(t3);
    for (u2 = 0; u2 < i2.length; u2++) r2 = i2[u2], e2.indexOf(r2) >= 0 || Object.prototype.propertyIsEnumerable.call(t3, r2) && (n2[r2] = t3[r2]);
  }
  return n2;
}
var Bt, gt = function(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r2 = !e2, u2 = e2 ? _t(t3) : t3, n2 = Bt.None, i2 = Bt.None, o2 = 0, a2 = null;
  for (var s2 of u2) {
    var f2 = s2.codePointAt(0);
    if (!f2) break;
    var c2 = It(s2, f2);
    if ([n2, i2] = r2 ? [i2, c2] : [c2, n2], qt(n2, Bt.ZWJ) && qt(i2, Bt.ExtPict) && !Lt(r2 ? t3.substring(0, o2) : t3.substring(0, t3.length - o2))) break;
    if (qt(n2, Bt.RI) && qt(i2, Bt.RI) && !(a2 = null !== a2 ? !a2 : !!r2 || $t(t3.substring(0, t3.length - o2)))) break;
    if (n2 !== Bt.None && i2 !== Bt.None && Mt(n2, i2)) break;
    o2 += s2.length;
  }
  return o2 || 1;
}, At = /\s/, Ft = /[\u0021-\u0023\u0025-\u002A\u002C-\u002F\u003A\u003B\u003F\u0040\u005B-\u005D\u005F\u007B\u007D\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E3B\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/, yt = /['\u2018\u2019]/, Et = (t3, e2, r2) => {
  if (r2) {
    var u2 = t3.length - e2;
    return [t3.slice(u2, t3.length), t3.slice(0, u2)];
  }
  return [t3.slice(0, e2), t3.slice(e2)];
}, mt = function t2(e2, r2) {
  var u2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
  if (At.test(e2)) return false;
  if (yt.test(e2)) {
    var n2 = gt(r2, u2), [i2, o2] = Et(r2, n2, u2);
    if (t2(i2, o2, u2)) return true;
  }
  return !Ft.test(e2);
}, _t = function* (t3) {
  for (var e2 = t3.length - 1, r2 = 0; r2 < t3.length; r2++) {
    var u2 = t3.charAt(e2 - r2);
    if (wt(u2.charCodeAt(0))) {
      var n2 = t3.charAt(e2 - r2 - 1);
      if (bt(n2.charCodeAt(0))) {
        yield n2 + u2, r2++;
        continue;
      }
    }
    yield u2;
  }
}, bt = (t3) => t3 >= 55296 && t3 <= 56319, wt = (t3) => t3 >= 56320 && t3 <= 57343;
!function(t3) {
  t3[t3.None = 0] = "None", t3[t3.Extend = 1] = "Extend", t3[t3.ZWJ = 2] = "ZWJ", t3[t3.RI = 4] = "RI", t3[t3.Prepend = 8] = "Prepend", t3[t3.SpacingMark = 16] = "SpacingMark", t3[t3.L = 32] = "L", t3[t3.V = 64] = "V", t3[t3.T = 128] = "T", t3[t3.LV = 256] = "LV", t3[t3.LVT = 512] = "LVT", t3[t3.ExtPict = 1024] = "ExtPict", t3[t3.Any = 2048] = "Any";
}(Bt || (Bt = {}));
var xt = /^(?:[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09BE\u09C1-\u09C4\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01\u0B3C\u0B3E\u0B3F\u0B41-\u0B44\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B82\u0BBE\u0BC0\u0BCD\u0BD7\u0C00\u0C04\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC2\u0CC6\u0CCC\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00\u0D01\u0D3B\u0D3C\u0D3E\u0D41-\u0D44\u0D4D\u0D57\u0D62\u0D63\u0D81\u0DCA\u0DCF\u0DD2-\u0DD4\u0DD6\u0DDF\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1AC0\u1B00-\u1B03\u1B34-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u200C\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA82C\uA8C4\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9BD\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFF9E\uFF9F]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD803[\uDD24-\uDD27\uDEAB\uDEAC\uDF46-\uDF50]|\uD804[\uDC01\uDC38-\uDC46\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDDC9-\uDDCC\uDDCF\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDE3E\uDEDF\uDEE3-\uDEEA\uDF00\uDF01\uDF3B\uDF3C\uDF3E\uDF40\uDF57\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC38-\uDC3F\uDC42-\uDC44\uDC46\uDC5E\uDCB0\uDCB3-\uDCB8\uDCBA\uDCBD\uDCBF\uDCC0\uDCC2\uDCC3\uDDAF\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDDDC\uDDDD\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7\uDF1D-\uDF1F\uDF22-\uDF25\uDF27-\uDF2B]|\uD806[\uDC2F-\uDC37\uDC39\uDC3A\uDD30\uDD3B\uDD3C\uDD3E\uDD43\uDDD4-\uDDD7\uDDDA\uDDDB\uDDE0\uDE01-\uDE0A\uDE33-\uDE38\uDE3B-\uDE3E\uDE47\uDE51-\uDE56\uDE59-\uDE5B\uDE8A-\uDE96\uDE98\uDE99]|\uD807[\uDC30-\uDC36\uDC38-\uDC3D\uDC3F\uDC92-\uDCA7\uDCAA-\uDCB0\uDCB2\uDCB3\uDCB5\uDCB6\uDD31-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD45\uDD47\uDD90\uDD91\uDD95\uDD97\uDEF3\uDEF4]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF4F\uDF8F-\uDF92\uDFE4]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD65\uDD67-\uDD69\uDD6E-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDD30-\uDD36\uDEEC-\uDEEF]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uD83C[\uDFFB-\uDFFF]|\uDB40[\uDC20-\uDC7F\uDD00-\uDDEF])$/, Ot = /^(?:[\u0600-\u0605\u06DD\u070F\u0890\u0891\u08E2\u0D4E]|\uD804[\uDCBD\uDCCD\uDDC2\uDDC3]|\uD806[\uDD3F\uDD41\uDE3A\uDE84-\uDE89]|\uD807\uDD46)$/, Pt = /^(?:[\u0903\u093B\u093E-\u0940\u0949-\u094C\u094E\u094F\u0982\u0983\u09BF\u09C0\u09C7\u09C8\u09CB\u09CC\u0A03\u0A3E-\u0A40\u0A83\u0ABE-\u0AC0\u0AC9\u0ACB\u0ACC\u0B02\u0B03\u0B40\u0B47\u0B48\u0B4B\u0B4C\u0BBF\u0BC1\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0C01-\u0C03\u0C41-\u0C44\u0C82\u0C83\u0CBE\u0CC0\u0CC1\u0CC3\u0CC4\u0CC7\u0CC8\u0CCA\u0CCB\u0D02\u0D03\u0D3F\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D82\u0D83\u0DD0\u0DD1\u0DD8-\u0DDE\u0DF2\u0DF3\u0E33\u0EB3\u0F3E\u0F3F\u0F7F\u1031\u103B\u103C\u1056\u1057\u1084\u1715\u1734\u17B6\u17BE-\u17C5\u17C7\u17C8\u1923-\u1926\u1929-\u192B\u1930\u1931\u1933-\u1938\u1A19\u1A1A\u1A55\u1A57\u1A6D-\u1A72\u1B04\u1B3B\u1B3D-\u1B41\u1B43\u1B44\u1B82\u1BA1\u1BA6\u1BA7\u1BAA\u1BE7\u1BEA-\u1BEC\u1BEE\u1BF2\u1BF3\u1C24-\u1C2B\u1C34\u1C35\u1CE1\u1CF7\uA823\uA824\uA827\uA880\uA881\uA8B4-\uA8C3\uA952\uA953\uA983\uA9B4\uA9B5\uA9BA\uA9BB\uA9BE-\uA9C0\uAA2F\uAA30\uAA33\uAA34\uAA4D\uAAEB\uAAEE\uAAEF\uAAF5\uABE3\uABE4\uABE6\uABE7\uABE9\uABEA\uABEC]|\uD804[\uDC00\uDC02\uDC82\uDCB0-\uDCB2\uDCB7\uDCB8\uDD2C\uDD45\uDD46\uDD82\uDDB3-\uDDB5\uDDBF\uDDC0\uDDCE\uDE2C-\uDE2E\uDE32\uDE33\uDE35\uDEE0-\uDEE2\uDF02\uDF03\uDF3F\uDF41-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF62\uDF63]|\uD805[\uDC35-\uDC37\uDC40\uDC41\uDC45\uDCB1\uDCB2\uDCB9\uDCBB\uDCBC\uDCBE\uDCC1\uDDB0\uDDB1\uDDB8-\uDDBB\uDDBE\uDE30-\uDE32\uDE3B\uDE3C\uDE3E\uDEAC\uDEAE\uDEAF\uDEB6\uDF26]|\uD806[\uDC2C-\uDC2E\uDC38\uDD31-\uDD35\uDD37\uDD38\uDD3D\uDD40\uDD42\uDDD1-\uDDD3\uDDDC-\uDDDF\uDDE4\uDE39\uDE57\uDE58\uDE97]|\uD807[\uDC2F\uDC3E\uDCA9\uDCB1\uDCB4\uDD8A-\uDD8E\uDD93\uDD94\uDD96\uDEF5\uDEF6]|\uD81B[\uDF51-\uDF87\uDFF0\uDFF1]|\uD834[\uDD66\uDD6D])$/, jt = /^[\u1100-\u115F\uA960-\uA97C]$/, kt = /^[\u1160-\u11A7\uD7B0-\uD7C6]$/, Nt = /^[\u11A8-\u11FF\uD7CB-\uD7FB]$/, Rt = /^[\uAC00\uAC1C\uAC38\uAC54\uAC70\uAC8C\uACA8\uACC4\uACE0\uACFC\uAD18\uAD34\uAD50\uAD6C\uAD88\uADA4\uADC0\uADDC\uADF8\uAE14\uAE30\uAE4C\uAE68\uAE84\uAEA0\uAEBC\uAED8\uAEF4\uAF10\uAF2C\uAF48\uAF64\uAF80\uAF9C\uAFB8\uAFD4\uAFF0\uB00C\uB028\uB044\uB060\uB07C\uB098\uB0B4\uB0D0\uB0EC\uB108\uB124\uB140\uB15C\uB178\uB194\uB1B0\uB1CC\uB1E8\uB204\uB220\uB23C\uB258\uB274\uB290\uB2AC\uB2C8\uB2E4\uB300\uB31C\uB338\uB354\uB370\uB38C\uB3A8\uB3C4\uB3E0\uB3FC\uB418\uB434\uB450\uB46C\uB488\uB4A4\uB4C0\uB4DC\uB4F8\uB514\uB530\uB54C\uB568\uB584\uB5A0\uB5BC\uB5D8\uB5F4\uB610\uB62C\uB648\uB664\uB680\uB69C\uB6B8\uB6D4\uB6F0\uB70C\uB728\uB744\uB760\uB77C\uB798\uB7B4\uB7D0\uB7EC\uB808\uB824\uB840\uB85C\uB878\uB894\uB8B0\uB8CC\uB8E8\uB904\uB920\uB93C\uB958\uB974\uB990\uB9AC\uB9C8\uB9E4\uBA00\uBA1C\uBA38\uBA54\uBA70\uBA8C\uBAA8\uBAC4\uBAE0\uBAFC\uBB18\uBB34\uBB50\uBB6C\uBB88\uBBA4\uBBC0\uBBDC\uBBF8\uBC14\uBC30\uBC4C\uBC68\uBC84\uBCA0\uBCBC\uBCD8\uBCF4\uBD10\uBD2C\uBD48\uBD64\uBD80\uBD9C\uBDB8\uBDD4\uBDF0\uBE0C\uBE28\uBE44\uBE60\uBE7C\uBE98\uBEB4\uBED0\uBEEC\uBF08\uBF24\uBF40\uBF5C\uBF78\uBF94\uBFB0\uBFCC\uBFE8\uC004\uC020\uC03C\uC058\uC074\uC090\uC0AC\uC0C8\uC0E4\uC100\uC11C\uC138\uC154\uC170\uC18C\uC1A8\uC1C4\uC1E0\uC1FC\uC218\uC234\uC250\uC26C\uC288\uC2A4\uC2C0\uC2DC\uC2F8\uC314\uC330\uC34C\uC368\uC384\uC3A0\uC3BC\uC3D8\uC3F4\uC410\uC42C\uC448\uC464\uC480\uC49C\uC4B8\uC4D4\uC4F0\uC50C\uC528\uC544\uC560\uC57C\uC598\uC5B4\uC5D0\uC5EC\uC608\uC624\uC640\uC65C\uC678\uC694\uC6B0\uC6CC\uC6E8\uC704\uC720\uC73C\uC758\uC774\uC790\uC7AC\uC7C8\uC7E4\uC800\uC81C\uC838\uC854\uC870\uC88C\uC8A8\uC8C4\uC8E0\uC8FC\uC918\uC934\uC950\uC96C\uC988\uC9A4\uC9C0\uC9DC\uC9F8\uCA14\uCA30\uCA4C\uCA68\uCA84\uCAA0\uCABC\uCAD8\uCAF4\uCB10\uCB2C\uCB48\uCB64\uCB80\uCB9C\uCBB8\uCBD4\uCBF0\uCC0C\uCC28\uCC44\uCC60\uCC7C\uCC98\uCCB4\uCCD0\uCCEC\uCD08\uCD24\uCD40\uCD5C\uCD78\uCD94\uCDB0\uCDCC\uCDE8\uCE04\uCE20\uCE3C\uCE58\uCE74\uCE90\uCEAC\uCEC8\uCEE4\uCF00\uCF1C\uCF38\uCF54\uCF70\uCF8C\uCFA8\uCFC4\uCFE0\uCFFC\uD018\uD034\uD050\uD06C\uD088\uD0A4\uD0C0\uD0DC\uD0F8\uD114\uD130\uD14C\uD168\uD184\uD1A0\uD1BC\uD1D8\uD1F4\uD210\uD22C\uD248\uD264\uD280\uD29C\uD2B8\uD2D4\uD2F0\uD30C\uD328\uD344\uD360\uD37C\uD398\uD3B4\uD3D0\uD3EC\uD408\uD424\uD440\uD45C\uD478\uD494\uD4B0\uD4CC\uD4E8\uD504\uD520\uD53C\uD558\uD574\uD590\uD5AC\uD5C8\uD5E4\uD600\uD61C\uD638\uD654\uD670\uD68C\uD6A8\uD6C4\uD6E0\uD6FC\uD718\uD734\uD750\uD76C\uD788]$/, St = /^[\uAC01-\uAC1B\uAC1D-\uAC37\uAC39-\uAC53\uAC55-\uAC6F\uAC71-\uAC8B\uAC8D-\uACA7\uACA9-\uACC3\uACC5-\uACDF\uACE1-\uACFB\uACFD-\uAD17\uAD19-\uAD33\uAD35-\uAD4F\uAD51-\uAD6B\uAD6D-\uAD87\uAD89-\uADA3\uADA5-\uADBF\uADC1-\uADDB\uADDD-\uADF7\uADF9-\uAE13\uAE15-\uAE2F\uAE31-\uAE4B\uAE4D-\uAE67\uAE69-\uAE83\uAE85-\uAE9F\uAEA1-\uAEBB\uAEBD-\uAED7\uAED9-\uAEF3\uAEF5-\uAF0F\uAF11-\uAF2B\uAF2D-\uAF47\uAF49-\uAF63\uAF65-\uAF7F\uAF81-\uAF9B\uAF9D-\uAFB7\uAFB9-\uAFD3\uAFD5-\uAFEF\uAFF1-\uB00B\uB00D-\uB027\uB029-\uB043\uB045-\uB05F\uB061-\uB07B\uB07D-\uB097\uB099-\uB0B3\uB0B5-\uB0CF\uB0D1-\uB0EB\uB0ED-\uB107\uB109-\uB123\uB125-\uB13F\uB141-\uB15B\uB15D-\uB177\uB179-\uB193\uB195-\uB1AF\uB1B1-\uB1CB\uB1CD-\uB1E7\uB1E9-\uB203\uB205-\uB21F\uB221-\uB23B\uB23D-\uB257\uB259-\uB273\uB275-\uB28F\uB291-\uB2AB\uB2AD-\uB2C7\uB2C9-\uB2E3\uB2E5-\uB2FF\uB301-\uB31B\uB31D-\uB337\uB339-\uB353\uB355-\uB36F\uB371-\uB38B\uB38D-\uB3A7\uB3A9-\uB3C3\uB3C5-\uB3DF\uB3E1-\uB3FB\uB3FD-\uB417\uB419-\uB433\uB435-\uB44F\uB451-\uB46B\uB46D-\uB487\uB489-\uB4A3\uB4A5-\uB4BF\uB4C1-\uB4DB\uB4DD-\uB4F7\uB4F9-\uB513\uB515-\uB52F\uB531-\uB54B\uB54D-\uB567\uB569-\uB583\uB585-\uB59F\uB5A1-\uB5BB\uB5BD-\uB5D7\uB5D9-\uB5F3\uB5F5-\uB60F\uB611-\uB62B\uB62D-\uB647\uB649-\uB663\uB665-\uB67F\uB681-\uB69B\uB69D-\uB6B7\uB6B9-\uB6D3\uB6D5-\uB6EF\uB6F1-\uB70B\uB70D-\uB727\uB729-\uB743\uB745-\uB75F\uB761-\uB77B\uB77D-\uB797\uB799-\uB7B3\uB7B5-\uB7CF\uB7D1-\uB7EB\uB7ED-\uB807\uB809-\uB823\uB825-\uB83F\uB841-\uB85B\uB85D-\uB877\uB879-\uB893\uB895-\uB8AF\uB8B1-\uB8CB\uB8CD-\uB8E7\uB8E9-\uB903\uB905-\uB91F\uB921-\uB93B\uB93D-\uB957\uB959-\uB973\uB975-\uB98F\uB991-\uB9AB\uB9AD-\uB9C7\uB9C9-\uB9E3\uB9E5-\uB9FF\uBA01-\uBA1B\uBA1D-\uBA37\uBA39-\uBA53\uBA55-\uBA6F\uBA71-\uBA8B\uBA8D-\uBAA7\uBAA9-\uBAC3\uBAC5-\uBADF\uBAE1-\uBAFB\uBAFD-\uBB17\uBB19-\uBB33\uBB35-\uBB4F\uBB51-\uBB6B\uBB6D-\uBB87\uBB89-\uBBA3\uBBA5-\uBBBF\uBBC1-\uBBDB\uBBDD-\uBBF7\uBBF9-\uBC13\uBC15-\uBC2F\uBC31-\uBC4B\uBC4D-\uBC67\uBC69-\uBC83\uBC85-\uBC9F\uBCA1-\uBCBB\uBCBD-\uBCD7\uBCD9-\uBCF3\uBCF5-\uBD0F\uBD11-\uBD2B\uBD2D-\uBD47\uBD49-\uBD63\uBD65-\uBD7F\uBD81-\uBD9B\uBD9D-\uBDB7\uBDB9-\uBDD3\uBDD5-\uBDEF\uBDF1-\uBE0B\uBE0D-\uBE27\uBE29-\uBE43\uBE45-\uBE5F\uBE61-\uBE7B\uBE7D-\uBE97\uBE99-\uBEB3\uBEB5-\uBECF\uBED1-\uBEEB\uBEED-\uBF07\uBF09-\uBF23\uBF25-\uBF3F\uBF41-\uBF5B\uBF5D-\uBF77\uBF79-\uBF93\uBF95-\uBFAF\uBFB1-\uBFCB\uBFCD-\uBFE7\uBFE9-\uC003\uC005-\uC01F\uC021-\uC03B\uC03D-\uC057\uC059-\uC073\uC075-\uC08F\uC091-\uC0AB\uC0AD-\uC0C7\uC0C9-\uC0E3\uC0E5-\uC0FF\uC101-\uC11B\uC11D-\uC137\uC139-\uC153\uC155-\uC16F\uC171-\uC18B\uC18D-\uC1A7\uC1A9-\uC1C3\uC1C5-\uC1DF\uC1E1-\uC1FB\uC1FD-\uC217\uC219-\uC233\uC235-\uC24F\uC251-\uC26B\uC26D-\uC287\uC289-\uC2A3\uC2A5-\uC2BF\uC2C1-\uC2DB\uC2DD-\uC2F7\uC2F9-\uC313\uC315-\uC32F\uC331-\uC34B\uC34D-\uC367\uC369-\uC383\uC385-\uC39F\uC3A1-\uC3BB\uC3BD-\uC3D7\uC3D9-\uC3F3\uC3F5-\uC40F\uC411-\uC42B\uC42D-\uC447\uC449-\uC463\uC465-\uC47F\uC481-\uC49B\uC49D-\uC4B7\uC4B9-\uC4D3\uC4D5-\uC4EF\uC4F1-\uC50B\uC50D-\uC527\uC529-\uC543\uC545-\uC55F\uC561-\uC57B\uC57D-\uC597\uC599-\uC5B3\uC5B5-\uC5CF\uC5D1-\uC5EB\uC5ED-\uC607\uC609-\uC623\uC625-\uC63F\uC641-\uC65B\uC65D-\uC677\uC679-\uC693\uC695-\uC6AF\uC6B1-\uC6CB\uC6CD-\uC6E7\uC6E9-\uC703\uC705-\uC71F\uC721-\uC73B\uC73D-\uC757\uC759-\uC773\uC775-\uC78F\uC791-\uC7AB\uC7AD-\uC7C7\uC7C9-\uC7E3\uC7E5-\uC7FF\uC801-\uC81B\uC81D-\uC837\uC839-\uC853\uC855-\uC86F\uC871-\uC88B\uC88D-\uC8A7\uC8A9-\uC8C3\uC8C5-\uC8DF\uC8E1-\uC8FB\uC8FD-\uC917\uC919-\uC933\uC935-\uC94F\uC951-\uC96B\uC96D-\uC987\uC989-\uC9A3\uC9A5-\uC9BF\uC9C1-\uC9DB\uC9DD-\uC9F7\uC9F9-\uCA13\uCA15-\uCA2F\uCA31-\uCA4B\uCA4D-\uCA67\uCA69-\uCA83\uCA85-\uCA9F\uCAA1-\uCABB\uCABD-\uCAD7\uCAD9-\uCAF3\uCAF5-\uCB0F\uCB11-\uCB2B\uCB2D-\uCB47\uCB49-\uCB63\uCB65-\uCB7F\uCB81-\uCB9B\uCB9D-\uCBB7\uCBB9-\uCBD3\uCBD5-\uCBEF\uCBF1-\uCC0B\uCC0D-\uCC27\uCC29-\uCC43\uCC45-\uCC5F\uCC61-\uCC7B\uCC7D-\uCC97\uCC99-\uCCB3\uCCB5-\uCCCF\uCCD1-\uCCEB\uCCED-\uCD07\uCD09-\uCD23\uCD25-\uCD3F\uCD41-\uCD5B\uCD5D-\uCD77\uCD79-\uCD93\uCD95-\uCDAF\uCDB1-\uCDCB\uCDCD-\uCDE7\uCDE9-\uCE03\uCE05-\uCE1F\uCE21-\uCE3B\uCE3D-\uCE57\uCE59-\uCE73\uCE75-\uCE8F\uCE91-\uCEAB\uCEAD-\uCEC7\uCEC9-\uCEE3\uCEE5-\uCEFF\uCF01-\uCF1B\uCF1D-\uCF37\uCF39-\uCF53\uCF55-\uCF6F\uCF71-\uCF8B\uCF8D-\uCFA7\uCFA9-\uCFC3\uCFC5-\uCFDF\uCFE1-\uCFFB\uCFFD-\uD017\uD019-\uD033\uD035-\uD04F\uD051-\uD06B\uD06D-\uD087\uD089-\uD0A3\uD0A5-\uD0BF\uD0C1-\uD0DB\uD0DD-\uD0F7\uD0F9-\uD113\uD115-\uD12F\uD131-\uD14B\uD14D-\uD167\uD169-\uD183\uD185-\uD19F\uD1A1-\uD1BB\uD1BD-\uD1D7\uD1D9-\uD1F3\uD1F5-\uD20F\uD211-\uD22B\uD22D-\uD247\uD249-\uD263\uD265-\uD27F\uD281-\uD29B\uD29D-\uD2B7\uD2B9-\uD2D3\uD2D5-\uD2EF\uD2F1-\uD30B\uD30D-\uD327\uD329-\uD343\uD345-\uD35F\uD361-\uD37B\uD37D-\uD397\uD399-\uD3B3\uD3B5-\uD3CF\uD3D1-\uD3EB\uD3ED-\uD407\uD409-\uD423\uD425-\uD43F\uD441-\uD45B\uD45D-\uD477\uD479-\uD493\uD495-\uD4AF\uD4B1-\uD4CB\uD4CD-\uD4E7\uD4E9-\uD503\uD505-\uD51F\uD521-\uD53B\uD53D-\uD557\uD559-\uD573\uD575-\uD58F\uD591-\uD5AB\uD5AD-\uD5C7\uD5C9-\uD5E3\uD5E5-\uD5FF\uD601-\uD61B\uD61D-\uD637\uD639-\uD653\uD655-\uD66F\uD671-\uD68B\uD68D-\uD6A7\uD6A9-\uD6C3\uD6C5-\uD6DF\uD6E1-\uD6FB\uD6FD-\uD717\uD719-\uD733\uD735-\uD74F\uD751-\uD76B\uD76D-\uD787\uD789-\uD7A3]$/, Tt = /^(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2605\u2607-\u2612\u2614-\u2685\u2690-\u2705\u2708-\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2767\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC00-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDAD-\uDDE5\uDE01-\uDE0F\uDE1A\uDE2F\uDE32-\uDE3A\uDE3C-\uDE3F\uDE49-\uDFFA]|\uD83D[\uDC00-\uDD3D\uDD46-\uDE4F\uDE80-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDCFF\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDEFF]|\uD83F[\uDC00-\uDFFD])$/, It = (t3, e2) => {
  var r2 = Bt.Any;
  return -1 !== t3.search(xt) && (r2 |= Bt.Extend), 8205 === e2 && (r2 |= Bt.ZWJ), e2 >= 127462 && e2 <= 127487 && (r2 |= Bt.RI), -1 !== t3.search(Ot) && (r2 |= Bt.Prepend), -1 !== t3.search(Pt) && (r2 |= Bt.SpacingMark), -1 !== t3.search(jt) && (r2 |= Bt.L), -1 !== t3.search(kt) && (r2 |= Bt.V), -1 !== t3.search(Nt) && (r2 |= Bt.T), -1 !== t3.search(Rt) && (r2 |= Bt.LV), -1 !== t3.search(St) && (r2 |= Bt.LVT), -1 !== t3.search(Tt) && (r2 |= Bt.ExtPict), r2;
};
function qt(t3, e2) {
  return 0 != (t3 & e2);
}
var zt = [[Bt.L, Bt.L | Bt.V | Bt.LV | Bt.LVT], [Bt.LV | Bt.V, Bt.V | Bt.T], [Bt.LVT | Bt.T, Bt.T], [Bt.Any, Bt.Extend | Bt.ZWJ], [Bt.Any, Bt.SpacingMark], [Bt.Prepend, Bt.Any], [Bt.ZWJ, Bt.ExtPict], [Bt.RI, Bt.RI]];
function Mt(t3, e2) {
  return -1 === zt.findIndex((r2) => qt(t3, r2[0]) && qt(e2, r2[1]));
}
var Wt = /(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2605\u2607-\u2612\u2614-\u2685\u2690-\u2705\u2708-\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2767\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC00-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDAD-\uDDE5\uDE01-\uDE0F\uDE1A\uDE2F\uDE32-\uDE3A\uDE3C-\uDE3F\uDE49-\uDFFA]|\uD83D[\uDC00-\uDD3D\uDD46-\uDE4F\uDE80-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDCFF\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDEFF]|\uD83F[\uDC00-\uDFFD])(?:[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09BE\u09C1-\u09C4\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01\u0B3C\u0B3E\u0B3F\u0B41-\u0B44\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B82\u0BBE\u0BC0\u0BCD\u0BD7\u0C00\u0C04\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC2\u0CC6\u0CCC\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00\u0D01\u0D3B\u0D3C\u0D3E\u0D41-\u0D44\u0D4D\u0D57\u0D62\u0D63\u0D81\u0DCA\u0DCF\u0DD2-\u0DD4\u0DD6\u0DDF\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1AC0\u1B00-\u1B03\u1B34-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u200C\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA82C\uA8C4\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9BD\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFF9E\uFF9F]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD803[\uDD24-\uDD27\uDEAB\uDEAC\uDF46-\uDF50]|\uD804[\uDC01\uDC38-\uDC46\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDDC9-\uDDCC\uDDCF\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDE3E\uDEDF\uDEE3-\uDEEA\uDF00\uDF01\uDF3B\uDF3C\uDF3E\uDF40\uDF57\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC38-\uDC3F\uDC42-\uDC44\uDC46\uDC5E\uDCB0\uDCB3-\uDCB8\uDCBA\uDCBD\uDCBF\uDCC0\uDCC2\uDCC3\uDDAF\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDDDC\uDDDD\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7\uDF1D-\uDF1F\uDF22-\uDF25\uDF27-\uDF2B]|\uD806[\uDC2F-\uDC37\uDC39\uDC3A\uDD30\uDD3B\uDD3C\uDD3E\uDD43\uDDD4-\uDDD7\uDDDA\uDDDB\uDDE0\uDE01-\uDE0A\uDE33-\uDE38\uDE3B-\uDE3E\uDE47\uDE51-\uDE56\uDE59-\uDE5B\uDE8A-\uDE96\uDE98\uDE99]|\uD807[\uDC30-\uDC36\uDC38-\uDC3D\uDC3F\uDC92-\uDCA7\uDCAA-\uDCB0\uDCB2\uDCB3\uDCB5\uDCB6\uDD31-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD45\uDD47\uDD90\uDD91\uDD95\uDD97\uDEF3\uDEF4]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF4F\uDF8F-\uDF92\uDFE4]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD65\uDD67-\uDD69\uDD6E-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDD30-\uDD36\uDEEC-\uDEEF]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uD83C[\uDFFB-\uDFFF]|\uDB40[\uDC20-\uDC7F\uDD00-\uDDEF])*\u200D$/, Lt = (t3) => -1 !== t3.search(Wt), Vt = /(?:\uD83C[\uDDE6-\uDDFF])+$/g, $t = (t3) => {
  var e2 = t3.match(Vt);
  return null !== e2 && e2[0].length / 2 % 2 == 1;
}, Ut = (t3) => i(t3) && ue.isNodeList(t3.children) && !Xt.isEditor(t3), Zt = { isAncestor: (t3) => i(t3) && ue.isNodeList(t3.children), isElement: Ut, isElementList: (t3) => Array.isArray(t3) && t3.every((t4) => Zt.isElement(t4)), isElementProps: (t3) => void 0 !== t3.children, isElementType: function(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "type";
  return Ut(t3) && t3[r2] === e2;
}, matches(t3, e2) {
  for (var r2 in e2) if ("children" !== r2 && t3[r2] !== e2[r2]) return false;
  return true;
} }, Kt = ["text"], Jt = ["text"];
function Gt(t3, e2) {
  var r2 = Object.keys(t3);
  if (Object.getOwnPropertySymbols) {
    var u2 = Object.getOwnPropertySymbols(t3);
    e2 && (u2 = u2.filter(function(e3) {
      return Object.getOwnPropertyDescriptor(t3, e3).enumerable;
    })), r2.push.apply(r2, u2);
  }
  return r2;
}
function Ht(t3) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var r2 = null != arguments[e2] ? arguments[e2] : {};
    e2 % 2 ? Gt(Object(r2), true).forEach(function(e3) {
      it(t3, e3, r2[e3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r2)) : Gt(Object(r2)).forEach(function(e3) {
      Object.defineProperty(t3, e3, Object.getOwnPropertyDescriptor(r2, e3));
    });
  }
  return t3;
}
var Yt = /* @__PURE__ */ new WeakMap(), Xt = { above(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, { voids: r2 = false, mode: u2 = "lowest", at: n2 = t3.selection, match: i2 } = e2;
  if (n2) {
    var o2 = Xt.path(t3, n2), a2 = "lowest" === u2;
    for (var [s2, f2] of Xt.levels(t3, { at: o2, voids: r2, match: i2, reverse: a2 })) if (!me.isText(s2) && !ae.equals(o2, f2)) return [s2, f2];
  }
}, addMark(t3, e2, r2) {
  t3.addMark(e2, r2);
}, after(t3, e2) {
  var r2, u2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, n2 = { anchor: Xt.point(t3, e2, { edge: "end" }), focus: Xt.end(t3, []) }, { distance: i2 = 1 } = u2, o2 = 0;
  for (var a2 of Xt.positions(t3, Ht(Ht({}, u2), {}, { at: n2 }))) {
    if (o2 > i2) break;
    0 !== o2 && (r2 = a2), o2++;
  }
  return r2;
}, before(t3, e2) {
  var r2, u2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, n2 = { anchor: Xt.start(t3, []), focus: Xt.point(t3, e2, { edge: "start" }) }, { distance: i2 = 1 } = u2, o2 = 0;
  for (var a2 of Xt.positions(t3, Ht(Ht({}, u2), {}, { at: n2, reverse: true }))) {
    if (o2 > i2) break;
    0 !== o2 && (r2 = a2), o2++;
  }
  return r2;
}, deleteBackward(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, { unit: r2 = "character" } = e2;
  t3.deleteBackward(r2);
}, deleteForward(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, { unit: r2 = "character" } = e2;
  t3.deleteForward(r2);
}, deleteFragment(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, { direction: r2 = "forward" } = e2;
  t3.deleteFragment(r2);
}, edges: (t3, e2) => [Xt.start(t3, e2), Xt.end(t3, e2)], end: (t3, e2) => Xt.point(t3, e2, { edge: "end" }), first(t3, e2) {
  var r2 = Xt.path(t3, e2, { edge: "start" });
  return Xt.node(t3, r2);
}, fragment(t3, e2) {
  var r2 = Xt.range(t3, e2);
  return ue.fragment(t3, r2);
}, hasBlocks: (t3, e2) => e2.children.some((e3) => Xt.isBlock(t3, e3)), hasInlines: (t3, e2) => e2.children.some((e3) => me.isText(e3) || Xt.isInline(t3, e3)), hasTexts: (t3, e2) => e2.children.every((t4) => me.isText(t4)), insertBreak(t3) {
  t3.insertBreak();
}, insertSoftBreak(t3) {
  t3.insertSoftBreak();
}, insertFragment(t3, e2) {
  t3.insertFragment(e2);
}, insertNode(t3, e2) {
  t3.insertNode(e2);
}, insertText(t3, e2) {
  t3.insertText(e2);
}, isBlock: (t3, e2) => Zt.isElement(e2) && !t3.isInline(e2), isEditor(t3) {
  if (!i(t3)) return false;
  var e2 = Yt.get(t3);
  if (void 0 !== e2) return e2;
  var r2 = "function" == typeof t3.addMark && "function" == typeof t3.apply && "function" == typeof t3.deleteBackward && "function" == typeof t3.deleteForward && "function" == typeof t3.deleteFragment && "function" == typeof t3.insertBreak && "function" == typeof t3.insertSoftBreak && "function" == typeof t3.insertFragment && "function" == typeof t3.insertNode && "function" == typeof t3.insertText && "function" == typeof t3.isInline && "function" == typeof t3.isVoid && "function" == typeof t3.normalizeNode && "function" == typeof t3.onChange && "function" == typeof t3.removeMark && (null === t3.marks || i(t3.marks)) && (null === t3.selection || ve.isRange(t3.selection)) && ue.isNodeList(t3.children) && oe.isOperationList(t3.operations);
  return Yt.set(t3, r2), r2;
}, isEnd(t3, e2, r2) {
  var u2 = Xt.end(t3, r2);
  return le.equals(e2, u2);
}, isEdge: (t3, e2, r2) => Xt.isStart(t3, e2, r2) || Xt.isEnd(t3, e2, r2), isEmpty(t3, e2) {
  var { children: r2 } = e2, [u2] = r2;
  return 0 === r2.length || 1 === r2.length && me.isText(u2) && "" === u2.text && !t3.isVoid(e2);
}, isInline: (t3, e2) => Zt.isElement(e2) && t3.isInline(e2), isNormalizing(t3) {
  var e2 = ft.get(t3);
  return void 0 === e2 || e2;
}, isStart(t3, e2, r2) {
  if (0 !== e2.offset) return false;
  var u2 = Xt.start(t3, r2);
  return le.equals(e2, u2);
}, isVoid: (t3, e2) => Zt.isElement(e2) && t3.isVoid(e2), last(t3, e2) {
  var r2 = Xt.path(t3, e2, { edge: "end" });
  return Xt.node(t3, r2);
}, leaf(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, u2 = Xt.path(t3, e2, r2);
  return [ue.leaf(t3, u2), u2];
}, *levels(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, { at: r2 = t3.selection, reverse: u2 = false, voids: n2 = false } = e2, { match: i2 } = e2;
  if (null == i2 && (i2 = () => true), r2) {
    var o2 = [], a2 = Xt.path(t3, r2);
    for (var [s2, f2] of ue.levels(t3, a2)) if (i2(s2, f2) && (o2.push([s2, f2]), !n2 && Xt.isVoid(t3, s2))) break;
    u2 && o2.reverse(), yield* o2;
  }
}, marks(t3) {
  var { marks: e2, selection: r2 } = t3;
  if (!r2) return null;
  if (e2) return e2;
  if (ve.isExpanded(r2)) {
    var [u2] = Xt.nodes(t3, { match: me.isText });
    if (u2) {
      var [n2] = u2;
      return dt(n2, Kt);
    }
    return {};
  }
  var { anchor: i2 } = r2, { path: o2 } = i2, [a2] = Xt.leaf(t3, o2);
  if (0 === i2.offset) {
    var s2 = Xt.previous(t3, { at: o2, match: me.isText }), f2 = Xt.above(t3, { match: (e3) => Xt.isBlock(t3, e3) });
    if (s2 && f2) {
      var [c2, l2] = s2, [, h2] = f2;
      ae.isAncestor(h2, l2) && (a2 = c2);
    }
  }
  return dt(a2, Jt);
}, next(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, { mode: r2 = "lowest", voids: u2 = false } = e2, { match: n2, at: i2 = t3.selection } = e2;
  if (i2) {
    var o2 = Xt.after(t3, i2, { voids: u2 });
    if (o2) {
      var [, a2] = Xt.last(t3, []), s2 = [o2.path, a2];
      if (ae.isPath(i2) && 0 === i2.length) throw new Error("Cannot get the next node from the root node!");
      if (null == n2) if (ae.isPath(i2)) {
        var [f2] = Xt.parent(t3, i2);
        n2 = (t4) => f2.children.includes(t4);
      } else n2 = () => true;
      var [c2] = Xt.nodes(t3, { at: s2, match: n2, mode: r2, voids: u2 });
      return c2;
    }
  }
}, node(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, u2 = Xt.path(t3, e2, r2);
  return [ue.get(t3, u2), u2];
}, *nodes(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, { at: r2 = t3.selection, mode: u2 = "all", universal: n2 = false, reverse: i2 = false, voids: o2 = false } = e2, { match: a2 } = e2;
  if (a2 || (a2 = () => true), r2) {
    var s2, f2;
    if (Qt.isSpan(r2)) s2 = r2[0], f2 = r2[1];
    else {
      var c2 = Xt.path(t3, r2, { edge: "start" }), l2 = Xt.path(t3, r2, { edge: "end" });
      s2 = i2 ? l2 : c2, f2 = i2 ? c2 : l2;
    }
    var h2, p2 = ue.nodes(t3, { reverse: i2, from: s2, to: f2, pass: (e3) => {
      var [r3] = e3;
      return !o2 && Xt.isVoid(t3, r3);
    } }), D2 = [];
    for (var [v2, C2] of p2) {
      var d2 = h2 && 0 === ae.compare(C2, h2[1]);
      if ("highest" !== u2 || !d2) {
        if (a2(v2, C2)) if ("lowest" === u2 && d2) h2 = [v2, C2];
        else {
          var B2 = "lowest" === u2 ? h2 : [v2, C2];
          B2 && (n2 ? D2.push(B2) : yield B2), h2 = [v2, C2];
        }
        else if (n2 && !d2 && me.isText(v2)) return;
      }
    }
    "lowest" === u2 && h2 && (n2 ? D2.push(h2) : yield h2), n2 && (yield* D2);
  }
}, normalize(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, { force: r2 = false } = e2, u2 = (t4) => ot.get(t4) || [], n2 = (t4) => {
    var e3 = u2(t4).pop(), r3 = e3.join(",");
    return ((t5) => at.get(t5) || /* @__PURE__ */ new Set())(t4).delete(r3), e3;
  };
  if (Xt.isNormalizing(t3)) {
    if (r2) {
      var i2 = Array.from(ue.nodes(t3), (t4) => {
        var [, e3] = t4;
        return e3;
      }), o2 = new Set(i2.map((t4) => t4.join(",")));
      ot.set(t3, i2), at.set(t3, o2);
    }
    0 !== u2(t3).length && Xt.withoutNormalizing(t3, () => {
      for (var e3 of u2(t3)) if (ue.has(t3, e3)) {
        var r3 = Xt.node(t3, e3), [i3, o3] = r3;
        Zt.isElement(i3) && 0 === i3.children.length && t3.normalizeNode(r3);
      }
      for (var a2 = 42 * u2(t3).length, s2 = 0; 0 !== u2(t3).length; ) {
        if (s2 > a2) throw new Error("\n            Could not completely normalize the editor after ".concat(a2, " iterations! This is usually due to incorrect normalization logic that leaves a node in an invalid state.\n          "));
        var f2 = n2(t3);
        if (ue.has(t3, f2)) {
          var c2 = Xt.node(t3, f2);
          t3.normalizeNode(c2);
        }
        s2++;
      }
    });
  }
}, parent(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, u2 = Xt.path(t3, e2, r2), n2 = ae.parent(u2);
  return Xt.node(t3, n2);
}, path(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, { depth: u2, edge: n2 } = r2;
  if (ae.isPath(e2)) {
    if ("start" === n2) {
      var [, i2] = ue.first(t3, e2);
      e2 = i2;
    } else if ("end" === n2) {
      var [, o2] = ue.last(t3, e2);
      e2 = o2;
    }
  }
  return ve.isRange(e2) && (e2 = "start" === n2 ? ve.start(e2) : "end" === n2 ? ve.end(e2) : ae.common(e2.anchor.path, e2.focus.path)), le.isPoint(e2) && (e2 = e2.path), null != u2 && (e2 = e2.slice(0, u2)), e2;
}, hasPath: (t3, e2) => ue.has(t3, e2), pathRef(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, { affinity: u2 = "forward" } = r2, n2 = { current: e2, affinity: u2, unref() {
    var { current: e3 } = n2;
    return Xt.pathRefs(t3).delete(n2), n2.current = null, e3;
  } };
  return Xt.pathRefs(t3).add(n2), n2;
}, pathRefs(t3) {
  var e2 = ct.get(t3);
  return e2 || (e2 = /* @__PURE__ */ new Set(), ct.set(t3, e2)), e2;
}, point(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, { edge: u2 = "start" } = r2;
  if (ae.isPath(e2)) {
    var n2;
    if ("end" === u2) {
      var [, i2] = ue.last(t3, e2);
      n2 = i2;
    } else {
      var [, o2] = ue.first(t3, e2);
      n2 = o2;
    }
    var a2 = ue.get(t3, n2);
    if (!me.isText(a2)) throw new Error("Cannot get the ".concat(u2, " point in the node at path [").concat(e2, "] because it has no ").concat(u2, " text node."));
    return { path: n2, offset: "end" === u2 ? a2.text.length : 0 };
  }
  if (ve.isRange(e2)) {
    var [s2, f2] = ve.edges(e2);
    return "start" === u2 ? s2 : f2;
  }
  return e2;
}, pointRef(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, { affinity: u2 = "forward" } = r2, n2 = { current: e2, affinity: u2, unref() {
    var { current: e3 } = n2;
    return Xt.pointRefs(t3).delete(n2), n2.current = null, e3;
  } };
  return Xt.pointRefs(t3).add(n2), n2;
}, pointRefs(t3) {
  var e2 = lt.get(t3);
  return e2 || (e2 = /* @__PURE__ */ new Set(), lt.set(t3, e2)), e2;
}, *positions(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, { at: r2 = t3.selection, unit: u2 = "offset", reverse: n2 = false, voids: i2 = false } = e2;
  if (r2) {
    var o2 = Xt.range(t3, r2), [a2, s2] = ve.edges(o2), f2 = n2 ? s2 : a2, c2 = false, l2 = "", h2 = 0, p2 = 0, D2 = 0;
    for (var [v2, C2] of Xt.nodes(t3, { at: r2, reverse: n2, voids: i2 })) {
      if (Zt.isElement(v2)) {
        if (!i2 && t3.isVoid(v2)) {
          yield Xt.start(t3, C2);
          continue;
        }
        if (t3.isInline(v2)) continue;
        if (Xt.hasInlines(t3, v2)) {
          var d2 = ae.isAncestor(C2, s2.path) ? s2 : Xt.end(t3, C2), B2 = ae.isAncestor(C2, a2.path) ? a2 : Xt.start(t3, C2);
          l2 = Xt.string(t3, { anchor: B2, focus: d2 }, { voids: i2 }), c2 = true;
        }
      }
      if (me.isText(v2)) {
        var g2 = ae.equals(C2, f2.path);
        for (g2 ? (p2 = n2 ? f2.offset : v2.text.length - f2.offset, D2 = f2.offset) : (p2 = v2.text.length, D2 = n2 ? p2 : 0), (g2 || c2 || "offset" === u2) && (yield { path: C2, offset: D2 }, c2 = false); ; ) {
          if (0 === h2) {
            if ("" === l2) break;
            h2 = A2(l2, u2, n2), l2 = Et(l2, h2, n2)[1];
          }
          if (D2 = n2 ? D2 - h2 : D2 + h2, (p2 -= h2) < 0) {
            h2 = -p2;
            break;
          }
          h2 = 0, yield { path: C2, offset: D2 };
        }
      }
    }
  }
  function A2(t4, e3, r3) {
    return "character" === e3 ? gt(t4, r3) : "word" === e3 ? function(t5) {
      for (var e4 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r4 = 0, u3 = false; t5.length > 0; ) {
        var n3 = gt(t5, e4), [i3, o3] = Et(t5, n3, e4);
        if (mt(i3, o3, e4)) u3 = true, r4 += n3;
        else {
          if (u3) break;
          r4 += n3;
        }
        t5 = o3;
      }
      return r4;
    }(t4, r3) : "line" === e3 || "block" === e3 ? t4.length : 1;
  }
}, previous(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, { mode: r2 = "lowest", voids: u2 = false } = e2, { match: n2, at: i2 = t3.selection } = e2;
  if (i2) {
    var o2 = Xt.before(t3, i2, { voids: u2 });
    if (o2) {
      var [, a2] = Xt.first(t3, []), s2 = [o2.path, a2];
      if (ae.isPath(i2) && 0 === i2.length) throw new Error("Cannot get the previous node from the root node!");
      if (null == n2) if (ae.isPath(i2)) {
        var [f2] = Xt.parent(t3, i2);
        n2 = (t4) => f2.children.includes(t4);
      } else n2 = () => true;
      var [c2] = Xt.nodes(t3, { reverse: true, at: s2, match: n2, mode: r2, voids: u2 });
      return c2;
    }
  }
}, range: (t3, e2, r2) => ve.isRange(e2) && !r2 ? e2 : { anchor: Xt.start(t3, e2), focus: Xt.end(t3, r2 || e2) }, rangeRef(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, { affinity: u2 = "forward" } = r2, n2 = { current: e2, affinity: u2, unref() {
    var { current: e3 } = n2;
    return Xt.rangeRefs(t3).delete(n2), n2.current = null, e3;
  } };
  return Xt.rangeRefs(t3).add(n2), n2;
}, rangeRefs(t3) {
  var e2 = ht.get(t3);
  return e2 || (e2 = /* @__PURE__ */ new Set(), ht.set(t3, e2)), e2;
}, removeMark(t3, e2) {
  t3.removeMark(e2);
}, setNormalizing(t3, e2) {
  ft.set(t3, e2);
}, start: (t3, e2) => Xt.point(t3, e2, { edge: "start" }), string(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, { voids: u2 = false } = r2, n2 = Xt.range(t3, e2), [i2, o2] = ve.edges(n2), a2 = "";
  for (var [s2, f2] of Xt.nodes(t3, { at: n2, match: me.isText, voids: u2 })) {
    var c2 = s2.text;
    ae.equals(f2, o2.path) && (c2 = c2.slice(0, o2.offset)), ae.equals(f2, i2.path) && (c2 = c2.slice(i2.offset)), a2 += c2;
  }
  return a2;
}, unhangRange(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, { voids: u2 = false } = r2, [n2, i2] = ve.edges(e2);
  if (0 !== n2.offset || 0 !== i2.offset || ve.isCollapsed(e2)) return e2;
  var o2 = Xt.above(t3, { at: i2, match: (e3) => Xt.isBlock(t3, e3) }), a2 = o2 ? o2[1] : [], s2 = { anchor: Xt.start(t3, n2), focus: i2 }, f2 = true;
  for (var [c2, l2] of Xt.nodes(t3, { at: s2, match: me.isText, reverse: true, voids: u2 })) if (f2) f2 = false;
  else if ("" !== c2.text || ae.isBefore(l2, a2)) {
    i2 = { path: l2, offset: c2.text.length };
    break;
  }
  return { anchor: n2, focus: i2 };
}, void(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  return Xt.above(t3, Ht(Ht({}, e2), {}, { match: (e3) => Xt.isVoid(t3, e3) }));
}, withoutNormalizing(t3, e2) {
  var r2 = Xt.isNormalizing(t3);
  Xt.setNormalizing(t3, false);
  try {
    e2();
  } finally {
    Xt.setNormalizing(t3, r2);
  }
  Xt.normalize(t3);
} }, Qt = { isSpan: (t3) => Array.isArray(t3) && 2 === t3.length && t3.every(ae.isPath) }, te = ["children"], ee = ["text"], re = /* @__PURE__ */ new WeakMap(), ue = { ancestor(t3, e2) {
  var r2 = ue.get(t3, e2);
  if (me.isText(r2)) throw new Error("Cannot get the ancestor node at path [".concat(e2, "] because it refers to a text node instead: ").concat(Be.stringify(r2)));
  return r2;
}, *ancestors(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  for (var u2 of ae.ancestors(e2, r2)) {
    var n2 = [ue.ancestor(t3, u2), u2];
    yield n2;
  }
}, child(t3, e2) {
  if (me.isText(t3)) throw new Error("Cannot get the child of a text node: ".concat(Be.stringify(t3)));
  var r2 = t3.children[e2];
  if (null == r2) throw new Error("Cannot get child at index `".concat(e2, "` in node: ").concat(Be.stringify(t3)));
  return r2;
}, *children(t3, e2) {
  for (var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, { reverse: u2 = false } = r2, n2 = ue.ancestor(t3, e2), { children: i2 } = n2, o2 = u2 ? i2.length - 1 : 0; u2 ? o2 >= 0 : o2 < i2.length; ) {
    var a2 = ue.child(n2, o2), s2 = e2.concat(o2);
    yield [a2, s2], o2 = u2 ? o2 - 1 : o2 + 1;
  }
}, common(t3, e2, r2) {
  var u2 = ae.common(e2, r2);
  return [ue.get(t3, u2), u2];
}, descendant(t3, e2) {
  var r2 = ue.get(t3, e2);
  if (Xt.isEditor(r2)) throw new Error("Cannot get the descendant node at path [".concat(e2, "] because it refers to the root editor node instead: ").concat(Be.stringify(r2)));
  return r2;
}, *descendants(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  for (var [r2, u2] of ue.nodes(t3, e2)) 0 !== u2.length && (yield [r2, u2]);
}, *elements(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  for (var [r2, u2] of ue.nodes(t3, e2)) Zt.isElement(r2) && (yield [r2, u2]);
}, extractProps: (t3) => Zt.isAncestor(t3) ? dt(t3, te) : dt(t3, ee), first(t3, e2) {
  for (var r2 = e2.slice(), u2 = ue.get(t3, r2); u2 && !me.isText(u2) && 0 !== u2.children.length; ) u2 = u2.children[0], r2.push(0);
  return [u2, r2];
}, fragment(t3, e2) {
  if (me.isText(t3)) throw new Error("Cannot get a fragment starting from a root text node: ".concat(Be.stringify(t3)));
  return rt({ children: t3.children }, (t4) => {
    var [r2, u2] = ve.edges(e2), n2 = ue.nodes(t4, { reverse: true, pass: (t5) => {
      var [, r3] = t5;
      return !ve.includes(e2, r3);
    } });
    for (var [, i2] of n2) {
      if (!ve.includes(e2, i2)) {
        var o2 = ue.parent(t4, i2), a2 = i2[i2.length - 1];
        o2.children.splice(a2, 1);
      }
      if (ae.equals(i2, u2.path)) {
        var s2 = ue.leaf(t4, i2);
        s2.text = s2.text.slice(0, u2.offset);
      }
      if (ae.equals(i2, r2.path)) {
        var f2 = ue.leaf(t4, i2);
        f2.text = f2.text.slice(r2.offset);
      }
    }
    Xt.isEditor(t4) && (t4.selection = null);
  }).children;
}, get(t3, e2) {
  for (var r2 = t3, u2 = 0; u2 < e2.length; u2++) {
    var n2 = e2[u2];
    if (me.isText(r2) || !r2.children[n2]) throw new Error("Cannot find a descendant at path [".concat(e2, "] in node: ").concat(Be.stringify(t3)));
    r2 = r2.children[n2];
  }
  return r2;
}, has(t3, e2) {
  for (var r2 = t3, u2 = 0; u2 < e2.length; u2++) {
    var n2 = e2[u2];
    if (me.isText(r2) || !r2.children[n2]) return false;
    r2 = r2.children[n2];
  }
  return true;
}, isNode: (t3) => me.isText(t3) || Zt.isElement(t3) || Xt.isEditor(t3), isNodeList(t3) {
  if (!Array.isArray(t3)) return false;
  var e2 = re.get(t3);
  if (void 0 !== e2) return e2;
  var r2 = t3.every((t4) => ue.isNode(t4));
  return re.set(t3, r2), r2;
}, last(t3, e2) {
  for (var r2 = e2.slice(), u2 = ue.get(t3, r2); u2 && !me.isText(u2) && 0 !== u2.children.length; ) {
    var n2 = u2.children.length - 1;
    u2 = u2.children[n2], r2.push(n2);
  }
  return [u2, r2];
}, leaf(t3, e2) {
  var r2 = ue.get(t3, e2);
  if (!me.isText(r2)) throw new Error("Cannot get the leaf node at path [".concat(e2, "] because it refers to a non-leaf node: ").concat(Be.stringify(r2)));
  return r2;
}, *levels(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  for (var u2 of ae.levels(e2, r2)) {
    var n2 = ue.get(t3, u2);
    yield [n2, u2];
  }
}, matches: (t3, e2) => Zt.isElement(t3) && Zt.isElementProps(e2) && Zt.matches(t3, e2) || me.isText(t3) && me.isTextProps(e2) && me.matches(t3, e2), *nodes(t3) {
  for (var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, { pass: r2, reverse: u2 = false } = e2, { from: n2 = [], to: i2 } = e2, o2 = /* @__PURE__ */ new Set(), a2 = [], s2 = t3; !i2 || !(u2 ? ae.isBefore(a2, i2) : ae.isAfter(a2, i2)); ) if (o2.has(s2) || (yield [s2, a2]), o2.has(s2) || me.isText(s2) || 0 === s2.children.length || null != r2 && false !== r2([s2, a2])) {
    if (0 === a2.length) break;
    if (!u2) {
      var f2 = ae.next(a2);
      if (ue.has(t3, f2)) {
        a2 = f2, s2 = ue.get(t3, a2);
        continue;
      }
    }
    if (u2 && 0 !== a2[a2.length - 1]) a2 = ae.previous(a2), s2 = ue.get(t3, a2);
    else a2 = ae.parent(a2), s2 = ue.get(t3, a2), o2.add(s2);
  } else {
    o2.add(s2);
    var c2 = u2 ? s2.children.length - 1 : 0;
    ae.isAncestor(a2, n2) && (c2 = n2[a2.length]), a2 = a2.concat(c2), s2 = ue.get(t3, a2);
  }
}, parent(t3, e2) {
  var r2 = ae.parent(e2), u2 = ue.get(t3, r2);
  if (me.isText(u2)) throw new Error("Cannot get the parent of path [".concat(e2, "] because it does not exist in the root."));
  return u2;
}, string: (t3) => me.isText(t3) ? t3.text : t3.children.map(ue.string).join(""), *texts(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  for (var [r2, u2] of ue.nodes(t3, e2)) me.isText(r2) && (yield [r2, u2]);
} };
function ne(t3, e2) {
  var r2 = Object.keys(t3);
  if (Object.getOwnPropertySymbols) {
    var u2 = Object.getOwnPropertySymbols(t3);
    e2 && (u2 = u2.filter(function(e3) {
      return Object.getOwnPropertyDescriptor(t3, e3).enumerable;
    })), r2.push.apply(r2, u2);
  }
  return r2;
}
function ie(t3) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var r2 = null != arguments[e2] ? arguments[e2] : {};
    e2 % 2 ? ne(Object(r2), true).forEach(function(e3) {
      it(t3, e3, r2[e3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r2)) : ne(Object(r2)).forEach(function(e3) {
      Object.defineProperty(t3, e3, Object.getOwnPropertyDescriptor(r2, e3));
    });
  }
  return t3;
}
var oe = { isNodeOperation: (t3) => oe.isOperation(t3) && t3.type.endsWith("_node"), isOperation(t3) {
  if (!i(t3)) return false;
  switch (t3.type) {
    case "insert_node":
    case "remove_node":
      return ae.isPath(t3.path) && ue.isNode(t3.node);
    case "insert_text":
    case "remove_text":
      return "number" == typeof t3.offset && "string" == typeof t3.text && ae.isPath(t3.path);
    case "merge_node":
      return "number" == typeof t3.position && ae.isPath(t3.path) && i(t3.properties);
    case "move_node":
      return ae.isPath(t3.path) && ae.isPath(t3.newPath);
    case "set_node":
      return ae.isPath(t3.path) && i(t3.properties) && i(t3.newProperties);
    case "set_selection":
      return null === t3.properties && ve.isRange(t3.newProperties) || null === t3.newProperties && ve.isRange(t3.properties) || i(t3.properties) && i(t3.newProperties);
    case "split_node":
      return ae.isPath(t3.path) && "number" == typeof t3.position && i(t3.properties);
    default:
      return false;
  }
}, isOperationList: (t3) => Array.isArray(t3) && t3.every((t4) => oe.isOperation(t4)), isSelectionOperation: (t3) => oe.isOperation(t3) && t3.type.endsWith("_selection"), isTextOperation: (t3) => oe.isOperation(t3) && t3.type.endsWith("_text"), inverse(t3) {
  switch (t3.type) {
    case "insert_node":
      return ie(ie({}, t3), {}, { type: "remove_node" });
    case "insert_text":
      return ie(ie({}, t3), {}, { type: "remove_text" });
    case "merge_node":
      return ie(ie({}, t3), {}, { type: "split_node", path: ae.previous(t3.path) });
    case "move_node":
      var { newPath: e2, path: r2 } = t3;
      if (ae.equals(e2, r2)) return t3;
      if (ae.isSibling(r2, e2)) return ie(ie({}, t3), {}, { path: e2, newPath: r2 });
      var u2 = ae.transform(r2, t3), n2 = ae.transform(ae.next(r2), t3);
      return ie(ie({}, t3), {}, { path: u2, newPath: n2 });
    case "remove_node":
      return ie(ie({}, t3), {}, { type: "insert_node" });
    case "remove_text":
      return ie(ie({}, t3), {}, { type: "insert_text" });
    case "set_node":
      var { properties: i2, newProperties: o2 } = t3;
      return ie(ie({}, t3), {}, { properties: o2, newProperties: i2 });
    case "set_selection":
      var { properties: a2, newProperties: s2 } = t3;
      return ie(ie({}, t3), {}, null == a2 ? { properties: s2, newProperties: null } : null == s2 ? { properties: null, newProperties: a2 } : { properties: s2, newProperties: a2 });
    case "split_node":
      return ie(ie({}, t3), {}, { type: "merge_node", path: ae.next(t3.path) });
  }
} }, ae = { ancestors(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, { reverse: r2 = false } = e2, u2 = ae.levels(t3, e2);
  return u2 = r2 ? u2.slice(1) : u2.slice(0, -1);
}, common(t3, e2) {
  for (var r2 = [], u2 = 0; u2 < t3.length && u2 < e2.length; u2++) {
    var n2 = t3[u2];
    if (n2 !== e2[u2]) break;
    r2.push(n2);
  }
  return r2;
}, compare(t3, e2) {
  for (var r2 = Math.min(t3.length, e2.length), u2 = 0; u2 < r2; u2++) {
    if (t3[u2] < e2[u2]) return -1;
    if (t3[u2] > e2[u2]) return 1;
  }
  return 0;
}, endsAfter(t3, e2) {
  var r2 = t3.length - 1, u2 = t3.slice(0, r2), n2 = e2.slice(0, r2), i2 = t3[r2], o2 = e2[r2];
  return ae.equals(u2, n2) && i2 > o2;
}, endsAt(t3, e2) {
  var r2 = t3.length, u2 = t3.slice(0, r2), n2 = e2.slice(0, r2);
  return ae.equals(u2, n2);
}, endsBefore(t3, e2) {
  var r2 = t3.length - 1, u2 = t3.slice(0, r2), n2 = e2.slice(0, r2), i2 = t3[r2], o2 = e2[r2];
  return ae.equals(u2, n2) && i2 < o2;
}, equals: (t3, e2) => t3.length === e2.length && t3.every((t4, r2) => t4 === e2[r2]), hasPrevious: (t3) => t3[t3.length - 1] > 0, isAfter: (t3, e2) => 1 === ae.compare(t3, e2), isAncestor: (t3, e2) => t3.length < e2.length && 0 === ae.compare(t3, e2), isBefore: (t3, e2) => -1 === ae.compare(t3, e2), isChild: (t3, e2) => t3.length === e2.length + 1 && 0 === ae.compare(t3, e2), isCommon: (t3, e2) => t3.length <= e2.length && 0 === ae.compare(t3, e2), isDescendant: (t3, e2) => t3.length > e2.length && 0 === ae.compare(t3, e2), isParent: (t3, e2) => t3.length + 1 === e2.length && 0 === ae.compare(t3, e2), isPath: (t3) => Array.isArray(t3) && (0 === t3.length || "number" == typeof t3[0]), isSibling(t3, e2) {
  if (t3.length !== e2.length) return false;
  var r2 = t3.slice(0, -1), u2 = e2.slice(0, -1);
  return t3[t3.length - 1] !== e2[e2.length - 1] && ae.equals(r2, u2);
}, levels(t3) {
  for (var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, { reverse: r2 = false } = e2, u2 = [], n2 = 0; n2 <= t3.length; n2++) u2.push(t3.slice(0, n2));
  return r2 && u2.reverse(), u2;
}, next(t3) {
  if (0 === t3.length) throw new Error("Cannot get the next path of a root path [".concat(t3, "], because it has no next index."));
  var e2 = t3[t3.length - 1];
  return t3.slice(0, -1).concat(e2 + 1);
}, operationCanTransformPath(t3) {
  switch (t3.type) {
    case "insert_node":
    case "remove_node":
    case "merge_node":
    case "split_node":
    case "move_node":
      return true;
    default:
      return false;
  }
}, parent(t3) {
  if (0 === t3.length) throw new Error("Cannot get the parent path of the root path [".concat(t3, "]."));
  return t3.slice(0, -1);
}, previous(t3) {
  if (0 === t3.length) throw new Error("Cannot get the previous path of a root path [".concat(t3, "], because it has no previous index."));
  var e2 = t3[t3.length - 1];
  if (e2 <= 0) throw new Error("Cannot get the previous path of a first child path [".concat(t3, "] because it would result in a negative index."));
  return t3.slice(0, -1).concat(e2 - 1);
}, relative(t3, e2) {
  if (!ae.isAncestor(e2, t3) && !ae.equals(t3, e2)) throw new Error("Cannot get the relative path of [".concat(t3, "] inside ancestor [").concat(e2, "], because it is not above or equal to the path."));
  return t3.slice(e2.length);
}, transform(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  return rt(t3, (u2) => {
    var { affinity: n2 = "forward" } = r2;
    if (t3 && 0 !== (null == t3 ? void 0 : t3.length)) {
      if (null === u2) return null;
      switch (e2.type) {
        case "insert_node":
          var { path: i2 } = e2;
          (ae.equals(i2, u2) || ae.endsBefore(i2, u2) || ae.isAncestor(i2, u2)) && (u2[i2.length - 1] += 1);
          break;
        case "remove_node":
          var { path: o2 } = e2;
          if (ae.equals(o2, u2) || ae.isAncestor(o2, u2)) return null;
          ae.endsBefore(o2, u2) && (u2[o2.length - 1] -= 1);
          break;
        case "merge_node":
          var { path: a2, position: s2 } = e2;
          ae.equals(a2, u2) || ae.endsBefore(a2, u2) ? u2[a2.length - 1] -= 1 : ae.isAncestor(a2, u2) && (u2[a2.length - 1] -= 1, u2[a2.length] += s2);
          break;
        case "split_node":
          var { path: f2, position: c2 } = e2;
          if (ae.equals(f2, u2)) {
            if ("forward" === n2) u2[u2.length - 1] += 1;
            else if ("backward" !== n2) return null;
          } else ae.endsBefore(f2, u2) ? u2[f2.length - 1] += 1 : ae.isAncestor(f2, u2) && t3[f2.length] >= c2 && (u2[f2.length - 1] += 1, u2[f2.length] -= c2);
          break;
        case "move_node":
          var { path: l2, newPath: h2 } = e2;
          if (ae.equals(l2, h2)) return;
          if (ae.isAncestor(l2, u2) || ae.equals(l2, u2)) {
            var p2 = h2.slice();
            return ae.endsBefore(l2, h2) && l2.length < h2.length && (p2[l2.length - 1] -= 1), p2.concat(u2.slice(l2.length));
          }
          ae.isSibling(l2, h2) && (ae.isAncestor(h2, u2) || ae.equals(h2, u2)) ? ae.endsBefore(l2, u2) ? u2[l2.length - 1] -= 1 : u2[l2.length - 1] += 1 : ae.endsBefore(h2, u2) || ae.equals(h2, u2) || ae.isAncestor(h2, u2) ? (ae.endsBefore(l2, u2) && (u2[l2.length - 1] -= 1), u2[h2.length - 1] += 1) : ae.endsBefore(l2, u2) && (ae.equals(h2, u2) && (u2[h2.length - 1] += 1), u2[l2.length - 1] -= 1);
      }
    }
  });
} }, se = { transform(t3, e2) {
  var { current: r2, affinity: u2 } = t3;
  if (null != r2) {
    var n2 = ae.transform(r2, e2, { affinity: u2 });
    t3.current = n2, null == n2 && t3.unref();
  }
} };
function fe(t3, e2) {
  var r2 = Object.keys(t3);
  if (Object.getOwnPropertySymbols) {
    var u2 = Object.getOwnPropertySymbols(t3);
    e2 && (u2 = u2.filter(function(e3) {
      return Object.getOwnPropertyDescriptor(t3, e3).enumerable;
    })), r2.push.apply(r2, u2);
  }
  return r2;
}
function ce(t3) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var r2 = null != arguments[e2] ? arguments[e2] : {};
    e2 % 2 ? fe(Object(r2), true).forEach(function(e3) {
      it(t3, e3, r2[e3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r2)) : fe(Object(r2)).forEach(function(e3) {
      Object.defineProperty(t3, e3, Object.getOwnPropertyDescriptor(r2, e3));
    });
  }
  return t3;
}
var le = { compare(t3, e2) {
  var r2 = ae.compare(t3.path, e2.path);
  return 0 === r2 ? t3.offset < e2.offset ? -1 : t3.offset > e2.offset ? 1 : 0 : r2;
}, isAfter: (t3, e2) => 1 === le.compare(t3, e2), isBefore: (t3, e2) => -1 === le.compare(t3, e2), equals: (t3, e2) => t3.offset === e2.offset && ae.equals(t3.path, e2.path), isPoint: (t3) => i(t3) && "number" == typeof t3.offset && ae.isPath(t3.path), transform(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  return rt(t3, (t4) => {
    if (null === t4) return null;
    var { affinity: u2 = "forward" } = r2, { path: n2, offset: i2 } = t4;
    switch (e2.type) {
      case "insert_node":
      case "move_node":
        t4.path = ae.transform(n2, e2, r2);
        break;
      case "insert_text":
        ae.equals(e2.path, n2) && (e2.offset < i2 || e2.offset === i2 && "forward" === u2) && (t4.offset += e2.text.length);
        break;
      case "merge_node":
        ae.equals(e2.path, n2) && (t4.offset += e2.position), t4.path = ae.transform(n2, e2, r2);
        break;
      case "remove_text":
        ae.equals(e2.path, n2) && e2.offset <= i2 && (t4.offset -= Math.min(i2 - e2.offset, e2.text.length));
        break;
      case "remove_node":
        if (ae.equals(e2.path, n2) || ae.isAncestor(e2.path, n2)) return null;
        t4.path = ae.transform(n2, e2, r2);
        break;
      case "split_node":
        if (ae.equals(e2.path, n2)) {
          if (e2.position === i2 && null == u2) return null;
          (e2.position < i2 || e2.position === i2 && "forward" === u2) && (t4.offset -= e2.position, t4.path = ae.transform(n2, e2, ce(ce({}, r2), {}, { affinity: "forward" })));
        } else t4.path = ae.transform(n2, e2, r2);
    }
  });
} }, he = { transform(t3, e2) {
  var { current: r2, affinity: u2 } = t3;
  if (null != r2) {
    var n2 = le.transform(r2, e2, { affinity: u2 });
    t3.current = n2, null == n2 && t3.unref();
  }
} }, pe = ["anchor", "focus"];
function De(t3, e2) {
  var r2 = Object.keys(t3);
  if (Object.getOwnPropertySymbols) {
    var u2 = Object.getOwnPropertySymbols(t3);
    e2 && (u2 = u2.filter(function(e3) {
      return Object.getOwnPropertyDescriptor(t3, e3).enumerable;
    })), r2.push.apply(r2, u2);
  }
  return r2;
}
var ve = { edges(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, { reverse: r2 = false } = e2, { anchor: u2, focus: n2 } = t3;
  return ve.isBackward(t3) === r2 ? [u2, n2] : [n2, u2];
}, end(t3) {
  var [, e2] = ve.edges(t3);
  return e2;
}, equals: (t3, e2) => le.equals(t3.anchor, e2.anchor) && le.equals(t3.focus, e2.focus), includes(t3, e2) {
  if (ve.isRange(e2)) {
    if (ve.includes(t3, e2.anchor) || ve.includes(t3, e2.focus)) return true;
    var [r2, u2] = ve.edges(t3), [n2, i2] = ve.edges(e2);
    return le.isBefore(r2, n2) && le.isAfter(u2, i2);
  }
  var [o2, a2] = ve.edges(t3), s2 = false, f2 = false;
  return le.isPoint(e2) ? (s2 = le.compare(e2, o2) >= 0, f2 = le.compare(e2, a2) <= 0) : (s2 = ae.compare(e2, o2.path) >= 0, f2 = ae.compare(e2, a2.path) <= 0), s2 && f2;
}, intersection(t3, e2) {
  var r2 = dt(t3, pe), [u2, n2] = ve.edges(t3), [i2, o2] = ve.edges(e2), a2 = le.isBefore(u2, i2) ? i2 : u2, s2 = le.isBefore(n2, o2) ? n2 : o2;
  return le.isBefore(s2, a2) ? null : function(t4) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var r3 = null != arguments[e3] ? arguments[e3] : {};
      e3 % 2 ? De(Object(r3), true).forEach(function(e4) {
        it(t4, e4, r3[e4]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t4, Object.getOwnPropertyDescriptors(r3)) : De(Object(r3)).forEach(function(e4) {
        Object.defineProperty(t4, e4, Object.getOwnPropertyDescriptor(r3, e4));
      });
    }
    return t4;
  }({ anchor: a2, focus: s2 }, r2);
}, isBackward(t3) {
  var { anchor: e2, focus: r2 } = t3;
  return le.isAfter(e2, r2);
}, isCollapsed(t3) {
  var { anchor: e2, focus: r2 } = t3;
  return le.equals(e2, r2);
}, isExpanded: (t3) => !ve.isCollapsed(t3), isForward: (t3) => !ve.isBackward(t3), isRange: (t3) => i(t3) && le.isPoint(t3.anchor) && le.isPoint(t3.focus), *points(t3) {
  yield [t3.anchor, "anchor"], yield [t3.focus, "focus"];
}, start(t3) {
  var [e2] = ve.edges(t3);
  return e2;
}, transform(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  return rt(t3, (t4) => {
    if (null === t4) return null;
    var u2, n2, { affinity: i2 = "inward" } = r2;
    if ("inward" === i2) {
      var o2 = ve.isCollapsed(t4);
      ve.isForward(t4) ? (u2 = "forward", n2 = o2 ? u2 : "backward") : (u2 = "backward", n2 = o2 ? u2 : "forward");
    } else "outward" === i2 ? ve.isForward(t4) ? (u2 = "backward", n2 = "forward") : (u2 = "forward", n2 = "backward") : (u2 = i2, n2 = i2);
    var a2 = le.transform(t4.anchor, e2, { affinity: u2 }), s2 = le.transform(t4.focus, e2, { affinity: n2 });
    if (!a2 || !s2) return null;
    t4.anchor = a2, t4.focus = s2;
  });
} }, Ce = { transform(t3, e2) {
  var { current: r2, affinity: u2 } = t3;
  if (null != r2) {
    var n2 = ve.transform(r2, e2, { affinity: u2 });
    t3.current = n2, null == n2 && t3.unref();
  }
} }, de = void 0, Be = { setScrubber(t3) {
  de = t3;
}, stringify: (t3) => JSON.stringify(t3, de) }, ge = (t3, e2) => {
  for (var r2 in t3) {
    var u2 = t3[r2], n2 = e2[r2];
    if (i(u2) && i(n2)) {
      if (!ge(u2, n2)) return false;
    } else if (Array.isArray(u2) && Array.isArray(n2)) {
      if (u2.length !== n2.length) return false;
      for (var o2 = 0; o2 < u2.length; o2++) if (u2[o2] !== n2[o2]) return false;
    } else if (u2 !== n2) return false;
  }
  for (var a2 in e2) if (void 0 === t3[a2] && void 0 !== e2[a2]) return false;
  return true;
}, Ae = ["text"], Fe = ["anchor", "focus"];
function ye(t3, e2) {
  var r2 = Object.keys(t3);
  if (Object.getOwnPropertySymbols) {
    var u2 = Object.getOwnPropertySymbols(t3);
    e2 && (u2 = u2.filter(function(e3) {
      return Object.getOwnPropertyDescriptor(t3, e3).enumerable;
    })), r2.push.apply(r2, u2);
  }
  return r2;
}
function Ee(t3) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var r2 = null != arguments[e2] ? arguments[e2] : {};
    e2 % 2 ? ye(Object(r2), true).forEach(function(e3) {
      it(t3, e3, r2[e3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r2)) : ye(Object(r2)).forEach(function(e3) {
      Object.defineProperty(t3, e3, Object.getOwnPropertyDescriptor(r2, e3));
    });
  }
  return t3;
}
var me = { equals(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, { loose: u2 = false } = r2;
  function n2(t4) {
    return dt(t4, Ae);
  }
  return ge(u2 ? n2(t3) : t3, u2 ? n2(e2) : e2);
}, isText: (t3) => i(t3) && "string" == typeof t3.text, isTextList: (t3) => Array.isArray(t3) && t3.every((t4) => me.isText(t4)), isTextProps: (t3) => void 0 !== t3.text, matches(t3, e2) {
  for (var r2 in e2) if ("text" !== r2 && (!t3.hasOwnProperty(r2) || t3[r2] !== e2[r2])) return false;
  return true;
}, decorations(t3, e2) {
  var r2 = [Ee({}, t3)];
  for (var u2 of e2) {
    var n2 = dt(u2, Fe), [i2, o2] = ve.edges(u2), a2 = [], s2 = 0;
    for (var f2 of r2) {
      var { length: c2 } = f2.text, l2 = s2;
      if (s2 += c2, i2.offset <= l2 && o2.offset >= s2) Object.assign(f2, n2), a2.push(f2);
      else if (i2.offset !== o2.offset && (i2.offset === s2 || o2.offset === l2) || i2.offset > s2 || o2.offset < l2 || o2.offset === l2 && 0 !== l2) a2.push(f2);
      else {
        var h2 = f2, p2 = void 0, D2 = void 0;
        if (o2.offset < s2) {
          var v2 = o2.offset - l2;
          D2 = Ee(Ee({}, h2), {}, { text: h2.text.slice(v2) }), h2 = Ee(Ee({}, h2), {}, { text: h2.text.slice(0, v2) });
        }
        if (i2.offset > l2) {
          var C2 = i2.offset - l2;
          p2 = Ee(Ee({}, h2), {}, { text: h2.text.slice(0, C2) }), h2 = Ee(Ee({}, h2), {}, { text: h2.text.slice(C2) });
        }
        Object.assign(h2, n2), p2 && a2.push(p2), a2.push(h2), D2 && a2.push(D2);
      }
    }
    r2 = a2;
  }
  return r2;
} };
function _e(t3, e2) {
  var r2 = Object.keys(t3);
  if (Object.getOwnPropertySymbols) {
    var u2 = Object.getOwnPropertySymbols(t3);
    e2 && (u2 = u2.filter(function(e3) {
      return Object.getOwnPropertyDescriptor(t3, e3).enumerable;
    })), r2.push.apply(r2, u2);
  }
  return r2;
}
function be(t3) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var r2 = null != arguments[e2] ? arguments[e2] : {};
    e2 % 2 ? _e(Object(r2), true).forEach(function(e3) {
      it(t3, e3, r2[e3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r2)) : _e(Object(r2)).forEach(function(e3) {
      Object.defineProperty(t3, e3, Object.getOwnPropertyDescriptor(r2, e3));
    });
  }
  return t3;
}
var we = { transform(t3, e2) {
  t3.children = ut(t3.children);
  var r2 = t3.selection && ut(t3.selection);
  try {
    r2 = ((t4, e3, r3) => {
      switch (r3.type) {
        case "insert_node":
          var { path: u2, node: n2 } = r3, i2 = ue.parent(t4, u2), o2 = u2[u2.length - 1];
          if (o2 > i2.children.length) throw new Error('Cannot apply an "insert_node" operation at path ['.concat(u2, "] because the destination is past the end of the node."));
          if (i2.children.splice(o2, 0, n2), e3) for (var [a2, s2] of ve.points(e3)) e3[s2] = le.transform(a2, r3);
          break;
        case "insert_text":
          var { path: f2, offset: c2, text: l2 } = r3;
          if (0 === l2.length) break;
          var h2 = ue.leaf(t4, f2), p2 = h2.text.slice(0, c2), D2 = h2.text.slice(c2);
          if (h2.text = p2 + l2 + D2, e3) for (var [v2, C2] of ve.points(e3)) e3[C2] = le.transform(v2, r3);
          break;
        case "merge_node":
          var { path: d2 } = r3, B2 = ue.get(t4, d2), g2 = ae.previous(d2), A2 = ue.get(t4, g2), F2 = ue.parent(t4, d2), y2 = d2[d2.length - 1];
          if (me.isText(B2) && me.isText(A2)) A2.text += B2.text;
          else {
            if (me.isText(B2) || me.isText(A2)) throw new Error('Cannot apply a "merge_node" operation at path ['.concat(d2, "] to nodes of different interfaces: ").concat(Be.stringify(B2), " ").concat(Be.stringify(A2)));
            A2.children.push(...B2.children);
          }
          if (F2.children.splice(y2, 1), e3) for (var [E2, m2] of ve.points(e3)) e3[m2] = le.transform(E2, r3);
          break;
        case "move_node":
          var { path: _2, newPath: b2 } = r3;
          if (ae.isAncestor(_2, b2)) throw new Error("Cannot move a path [".concat(_2, "] to new path [").concat(b2, "] because the destination is inside itself."));
          var w2 = ue.get(t4, _2), x2 = ue.parent(t4, _2), O2 = _2[_2.length - 1];
          x2.children.splice(O2, 1);
          var P2 = ae.transform(_2, r3), j2 = ue.get(t4, ae.parent(P2)), k2 = P2[P2.length - 1];
          if (j2.children.splice(k2, 0, w2), e3) for (var [N2, R2] of ve.points(e3)) e3[R2] = le.transform(N2, r3);
          break;
        case "remove_node":
          var { path: S2 } = r3, T2 = S2[S2.length - 1];
          if (ue.parent(t4, S2).children.splice(T2, 1), e3) for (var [I2, q2] of ve.points(e3)) {
            var z2 = le.transform(I2, r3);
            if (null != e3 && null != z2) e3[q2] = z2;
            else {
              var M2 = void 0, W2 = void 0;
              for (var [L2, V2] of ue.texts(t4)) {
                if (-1 !== ae.compare(V2, S2)) {
                  W2 = [L2, V2];
                  break;
                }
                M2 = [L2, V2];
              }
              var $2 = false;
              M2 && W2 && ($2 = ae.equals(W2[1], S2) ? !ae.hasPrevious(W2[1]) : ae.common(M2[1], S2).length < ae.common(W2[1], S2).length), M2 && !$2 ? (I2.path = M2[1], I2.offset = M2[0].text.length) : W2 ? (I2.path = W2[1], I2.offset = 0) : e3 = null;
            }
          }
          break;
        case "remove_text":
          var { path: U2, offset: Z2, text: K2 } = r3;
          if (0 === K2.length) break;
          var J2 = ue.leaf(t4, U2), G2 = J2.text.slice(0, Z2), H2 = J2.text.slice(Z2 + K2.length);
          if (J2.text = G2 + H2, e3) for (var [Y2, X2] of ve.points(e3)) e3[X2] = le.transform(Y2, r3);
          break;
        case "set_node":
          var { path: Q2, properties: tt2, newProperties: et2 } = r3;
          if (0 === Q2.length) throw new Error("Cannot set properties on the root node!");
          var rt2 = ue.get(t4, Q2);
          for (var ut2 in et2) {
            if ("children" === ut2 || "text" === ut2) throw new Error('Cannot set the "'.concat(ut2, '" property of nodes!'));
            var nt2 = et2[ut2];
            null == nt2 ? delete rt2[ut2] : rt2[ut2] = nt2;
          }
          for (var it2 in tt2) et2.hasOwnProperty(it2) || delete rt2[it2];
          break;
        case "set_selection":
          var { newProperties: ot2 } = r3;
          if (null == ot2) e3 = ot2;
          else {
            if (null == e3) {
              if (!ve.isRange(ot2)) throw new Error('Cannot apply an incomplete "set_selection" operation properties '.concat(Be.stringify(ot2), " when there is no current selection."));
              e3 = be({}, ot2);
            }
            for (var at2 in ot2) {
              var st2 = ot2[at2];
              if (null == st2) {
                if ("anchor" === at2 || "focus" === at2) throw new Error('Cannot remove the "'.concat(at2, '" selection property'));
                delete e3[at2];
              } else e3[at2] = st2;
            }
          }
          break;
        case "split_node":
          var { path: ft2, position: ct2, properties: lt2 } = r3;
          if (0 === ft2.length) throw new Error('Cannot apply a "split_node" operation at path ['.concat(ft2, "] because the root node cannot be split."));
          var ht2, pt2 = ue.get(t4, ft2), Dt2 = ue.parent(t4, ft2), vt2 = ft2[ft2.length - 1];
          if (me.isText(pt2)) {
            var Ct2 = pt2.text.slice(0, ct2), dt2 = pt2.text.slice(ct2);
            pt2.text = Ct2, ht2 = be(be({}, lt2), {}, { text: dt2 });
          } else {
            var Bt2 = pt2.children.slice(0, ct2), gt2 = pt2.children.slice(ct2);
            pt2.children = Bt2, ht2 = be(be({}, lt2), {}, { children: gt2 });
          }
          if (Dt2.children.splice(vt2 + 1, 0, ht2), e3) for (var [At2, Ft2] of ve.points(e3)) e3[Ft2] = le.transform(At2, r3);
      }
      return e3;
    })(t3, r2, e2);
  } finally {
    t3.children = nt(t3.children), t3.selection = r2 ? a(r2) ? nt(r2) : r2 : null;
  }
} }, xe = ["text"], Oe = ["children"];
function Pe(t3, e2) {
  var r2 = Object.keys(t3);
  if (Object.getOwnPropertySymbols) {
    var u2 = Object.getOwnPropertySymbols(t3);
    e2 && (u2 = u2.filter(function(e3) {
      return Object.getOwnPropertyDescriptor(t3, e3).enumerable;
    })), r2.push.apply(r2, u2);
  }
  return r2;
}
function je(t3) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var r2 = null != arguments[e2] ? arguments[e2] : {};
    e2 % 2 ? Pe(Object(r2), true).forEach(function(e3) {
      it(t3, e3, r2[e3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r2)) : Pe(Object(r2)).forEach(function(e3) {
      Object.defineProperty(t3, e3, Object.getOwnPropertyDescriptor(r2, e3));
    });
  }
  return t3;
}
var ke = { insertNodes(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  Xt.withoutNormalizing(t3, () => {
    var { hanging: u2 = false, voids: n2 = false, mode: i2 = "lowest" } = r2, { at: o2, match: a2, select: s2 } = r2;
    if (ue.isNode(e2) && (e2 = [e2]), 0 !== e2.length) {
      var [f2] = e2;
      if (o2 || (o2 = t3.selection ? t3.selection : t3.children.length > 0 ? Xt.end(t3, []) : [0], s2 = true), null == s2 && (s2 = false), ve.isRange(o2)) if (u2 || (o2 = Xt.unhangRange(t3, o2)), ve.isCollapsed(o2)) o2 = o2.anchor;
      else {
        var [, c2] = ve.edges(o2), l2 = Xt.pointRef(t3, c2);
        Le.delete(t3, { at: o2 }), o2 = l2.unref();
      }
      if (le.isPoint(o2)) {
        null == a2 && (a2 = me.isText(f2) ? (t4) => me.isText(t4) : t3.isInline(f2) ? (e3) => me.isText(e3) || Xt.isInline(t3, e3) : (e3) => Xt.isBlock(t3, e3));
        var [h2] = Xt.nodes(t3, { at: o2.path, match: a2, mode: i2, voids: n2 });
        if (!h2) return;
        var [, p2] = h2, D2 = Xt.pathRef(t3, p2), v2 = Xt.isEnd(t3, o2, p2);
        Le.splitNodes(t3, { at: o2, match: a2, mode: i2, voids: n2 });
        var C2 = D2.unref();
        o2 = v2 ? ae.next(C2) : C2;
      }
      var d2 = ae.parent(o2), B2 = o2[o2.length - 1];
      if (n2 || !Xt.void(t3, { at: d2 })) {
        for (var g2 of e2) {
          var A2 = d2.concat(B2);
          B2++, t3.apply({ type: "insert_node", path: A2, node: g2 }), o2 = ae.next(o2);
        }
        if (o2 = ae.previous(o2), s2) {
          var F2 = Xt.end(t3, o2);
          F2 && Le.select(t3, F2);
        }
      }
    }
  });
}, liftNodes(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  Xt.withoutNormalizing(t3, () => {
    var { at: r2 = t3.selection, mode: u2 = "lowest", voids: n2 = false } = e2, { match: i2 } = e2;
    if (null == i2 && (i2 = ae.isPath(r2) ? Se(t3, r2) : (e3) => Xt.isBlock(t3, e3)), r2) {
      var o2 = Xt.nodes(t3, { at: r2, match: i2, mode: u2, voids: n2 }), a2 = Array.from(o2, (e3) => {
        var [, r3] = e3;
        return Xt.pathRef(t3, r3);
      });
      for (var s2 of a2) {
        var f2 = s2.unref();
        if (f2.length < 2) throw new Error("Cannot lift node at a path [".concat(f2, "] because it has a depth of less than `2`."));
        var c2 = Xt.node(t3, ae.parent(f2)), [l2, h2] = c2, p2 = f2[f2.length - 1], { length: D2 } = l2.children;
        if (1 === D2) {
          var v2 = ae.next(h2);
          Le.moveNodes(t3, { at: f2, to: v2, voids: n2 }), Le.removeNodes(t3, { at: h2, voids: n2 });
        } else if (0 === p2) Le.moveNodes(t3, { at: f2, to: h2, voids: n2 });
        else if (p2 === D2 - 1) {
          var C2 = ae.next(h2);
          Le.moveNodes(t3, { at: f2, to: C2, voids: n2 });
        } else {
          var d2 = ae.next(f2), B2 = ae.next(h2);
          Le.splitNodes(t3, { at: d2, voids: n2 }), Le.moveNodes(t3, { at: f2, to: B2, voids: n2 });
        }
      }
    }
  });
}, mergeNodes(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  Xt.withoutNormalizing(t3, () => {
    var { match: r2, at: u2 = t3.selection } = e2, { hanging: n2 = false, voids: i2 = false, mode: o2 = "lowest" } = e2;
    if (u2) {
      if (null == r2) if (ae.isPath(u2)) {
        var [a2] = Xt.parent(t3, u2);
        r2 = (t4) => a2.children.includes(t4);
      } else r2 = (e3) => Xt.isBlock(t3, e3);
      if (!n2 && ve.isRange(u2) && (u2 = Xt.unhangRange(t3, u2)), ve.isRange(u2)) if (ve.isCollapsed(u2)) u2 = u2.anchor;
      else {
        var [, s2] = ve.edges(u2), f2 = Xt.pointRef(t3, s2);
        Le.delete(t3, { at: u2 }), u2 = f2.unref(), null == e2.at && Le.select(t3, u2);
      }
      var [c2] = Xt.nodes(t3, { at: u2, match: r2, voids: i2, mode: o2 }), l2 = Xt.previous(t3, { at: u2, match: r2, voids: i2, mode: o2 });
      if (c2 && l2) {
        var [h2, p2] = c2, [D2, v2] = l2;
        if (0 !== p2.length && 0 !== v2.length) {
          var C2, d2, B2 = ae.next(v2), g2 = ae.common(p2, v2), A2 = ae.isSibling(p2, v2), F2 = Array.from(Xt.levels(t3, { at: p2 }), (t4) => {
            var [e3] = t4;
            return e3;
          }).slice(g2.length).slice(0, -1), y2 = Xt.above(t3, { at: p2, mode: "highest", match: (e3) => F2.includes(e3) && Ne(t3, e3) }), E2 = y2 && Xt.pathRef(t3, y2[1]);
          if (me.isText(h2) && me.isText(D2)) {
            var m2 = dt(h2, xe);
            d2 = D2.text.length, C2 = m2;
          } else {
            if (!Zt.isElement(h2) || !Zt.isElement(D2)) throw new Error("Cannot merge the node at path [".concat(p2, "] with the previous sibling because it is not the same kind: ").concat(Be.stringify(h2), " ").concat(Be.stringify(D2)));
            m2 = dt(h2, Oe);
            d2 = D2.children.length, C2 = m2;
          }
          A2 || Le.moveNodes(t3, { at: p2, to: B2, voids: i2 }), E2 && Le.removeNodes(t3, { at: E2.current, voids: i2 }), Zt.isElement(D2) && Xt.isEmpty(t3, D2) || me.isText(D2) && "" === D2.text && 0 !== v2[v2.length - 1] ? Le.removeNodes(t3, { at: v2, voids: i2 }) : t3.apply({ type: "merge_node", path: B2, position: d2, properties: C2 }), E2 && E2.unref();
        }
      }
    }
  });
}, moveNodes(t3, e2) {
  Xt.withoutNormalizing(t3, () => {
    var { to: r2, at: u2 = t3.selection, mode: n2 = "lowest", voids: i2 = false } = e2, { match: o2 } = e2;
    if (u2) {
      null == o2 && (o2 = ae.isPath(u2) ? Se(t3, u2) : (e3) => Xt.isBlock(t3, e3));
      var a2 = Xt.pathRef(t3, r2), s2 = Xt.nodes(t3, { at: u2, match: o2, mode: n2, voids: i2 }), f2 = Array.from(s2, (e3) => {
        var [, r3] = e3;
        return Xt.pathRef(t3, r3);
      });
      for (var c2 of f2) {
        var l2 = c2.unref(), h2 = a2.current;
        0 !== l2.length && t3.apply({ type: "move_node", path: l2, newPath: h2 }), a2.current && ae.isSibling(h2, l2) && ae.isAfter(h2, l2) && (a2.current = ae.next(a2.current));
      }
      a2.unref();
    }
  });
}, removeNodes(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  Xt.withoutNormalizing(t3, () => {
    var { hanging: r2 = false, voids: u2 = false, mode: n2 = "lowest" } = e2, { at: i2 = t3.selection, match: o2 } = e2;
    if (i2) {
      null == o2 && (o2 = ae.isPath(i2) ? Se(t3, i2) : (e3) => Xt.isBlock(t3, e3)), !r2 && ve.isRange(i2) && (i2 = Xt.unhangRange(t3, i2));
      var a2 = Xt.nodes(t3, { at: i2, match: o2, mode: n2, voids: u2 }), s2 = Array.from(a2, (e3) => {
        var [, r3] = e3;
        return Xt.pathRef(t3, r3);
      });
      for (var f2 of s2) {
        var c2 = f2.unref();
        if (c2) {
          var [l2] = Xt.node(t3, c2);
          t3.apply({ type: "remove_node", path: c2, node: l2 });
        }
      }
    }
  });
}, setNodes(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  Xt.withoutNormalizing(t3, () => {
    var { match: u2, at: n2 = t3.selection, compare: i2, merge: o2 } = r2, { hanging: a2 = false, mode: s2 = "lowest", split: f2 = false, voids: c2 = false } = r2;
    if (n2) {
      if (null == u2 && (u2 = ae.isPath(n2) ? Se(t3, n2) : (e3) => Xt.isBlock(t3, e3)), !a2 && ve.isRange(n2) && (n2 = Xt.unhangRange(t3, n2)), f2 && ve.isRange(n2)) {
        if (ve.isCollapsed(n2) && Xt.leaf(t3, n2.anchor)[0].text.length > 0) return;
        var l2 = Xt.rangeRef(t3, n2, { affinity: "inward" }), [h2, p2] = ve.edges(n2), D2 = "lowest" === s2 ? "lowest" : "highest", v2 = Xt.isEnd(t3, p2, p2.path);
        Le.splitNodes(t3, { at: p2, match: u2, mode: D2, voids: c2, always: !v2 });
        var C2 = Xt.isStart(t3, h2, h2.path);
        Le.splitNodes(t3, { at: h2, match: u2, mode: D2, voids: c2, always: !C2 }), n2 = l2.unref(), null == r2.at && Le.select(t3, n2);
      }
      for (var [d2, B2] of (i2 || (i2 = (t4, e3) => t4 !== e3), Xt.nodes(t3, { at: n2, match: u2, mode: s2, voids: c2 }))) {
        var g2 = {}, A2 = {};
        if (0 !== B2.length) {
          var F2 = false;
          for (var y2 in e2) "children" !== y2 && "text" !== y2 && i2(e2[y2], d2[y2]) && (F2 = true, d2.hasOwnProperty(y2) && (g2[y2] = d2[y2]), o2 ? null != e2[y2] && (A2[y2] = o2(d2[y2], e2[y2])) : null != e2[y2] && (A2[y2] = e2[y2]));
          F2 && t3.apply({ type: "set_node", path: B2, properties: g2, newProperties: A2 });
        }
      }
    }
  });
}, splitNodes(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  Xt.withoutNormalizing(t3, () => {
    var { mode: r2 = "lowest", voids: u2 = false } = e2, { match: n2, at: i2 = t3.selection, height: o2 = 0, always: a2 = false } = e2;
    if (null == n2 && (n2 = (e3) => Xt.isBlock(t3, e3)), ve.isRange(i2) && (i2 = Re(t3, i2)), ae.isPath(i2)) {
      var s2 = i2, f2 = Xt.point(t3, s2), [c2] = Xt.parent(t3, s2);
      n2 = (t4) => t4 === c2, o2 = f2.path.length - s2.length + 1, i2 = f2, a2 = true;
    }
    if (i2) {
      var l2, h2 = Xt.pointRef(t3, i2, { affinity: "backward" });
      try {
        var [p2] = Xt.nodes(t3, { at: i2, match: n2, mode: r2, voids: u2 });
        if (!p2) return;
        var D2 = Xt.void(t3, { at: i2, mode: "highest" });
        if (!u2 && D2) {
          var [v2, C2] = D2;
          if (Zt.isElement(v2) && t3.isInline(v2)) {
            var d2 = Xt.after(t3, C2);
            if (!d2) {
              var B2 = ae.next(C2);
              Le.insertNodes(t3, { text: "" }, { at: B2, voids: u2 }), d2 = Xt.point(t3, B2);
            }
            i2 = d2, a2 = true;
          }
          o2 = i2.path.length - C2.length + 1, a2 = true;
        }
        l2 = Xt.pointRef(t3, i2);
        var g2 = i2.path.length - o2, [, A2] = p2, F2 = i2.path.slice(0, g2), y2 = 0 === o2 ? i2.offset : i2.path[g2] + 0;
        for (var [E2, m2] of Xt.levels(t3, { at: F2, reverse: true, voids: u2 })) {
          var _2 = false;
          if (m2.length < A2.length || 0 === m2.length || !u2 && Xt.isVoid(t3, E2)) break;
          var b2 = h2.current, w2 = Xt.isEnd(t3, b2, m2);
          if (a2 || !h2 || !Xt.isEdge(t3, b2, m2)) {
            _2 = true;
            var x2 = ue.extractProps(E2);
            t3.apply({ type: "split_node", path: m2, position: y2, properties: x2 });
          }
          y2 = m2[m2.length - 1] + (_2 || w2 ? 1 : 0);
        }
        if (null == e2.at) {
          var O2 = l2.current || Xt.end(t3, []);
          Le.select(t3, O2);
        }
      } finally {
        var P2;
        h2.unref(), null === (P2 = l2) || void 0 === P2 || P2.unref();
      }
    }
  });
}, unsetNodes(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  Array.isArray(e2) || (e2 = [e2]);
  var u2 = {};
  for (var n2 of e2) u2[n2] = null;
  Le.setNodes(t3, u2, r2);
}, unwrapNodes(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  Xt.withoutNormalizing(t3, () => {
    var { mode: r2 = "lowest", split: u2 = false, voids: n2 = false } = e2, { at: i2 = t3.selection, match: o2 } = e2;
    if (i2) {
      null == o2 && (o2 = ae.isPath(i2) ? Se(t3, i2) : (e3) => Xt.isBlock(t3, e3)), ae.isPath(i2) && (i2 = Xt.range(t3, i2));
      var a2 = ve.isRange(i2) ? Xt.rangeRef(t3, i2) : null, s2 = Xt.nodes(t3, { at: i2, match: o2, mode: r2, voids: n2 }), f2 = Array.from(s2, (e3) => {
        var [, r3] = e3;
        return Xt.pathRef(t3, r3);
      }).reverse(), c2 = function(e3) {
        var r3 = e3.unref(), [i3] = Xt.node(t3, r3), o3 = Xt.range(t3, r3);
        u2 && a2 && (o3 = ve.intersection(a2.current, o3)), Le.liftNodes(t3, { at: o3, match: (t4) => Zt.isAncestor(i3) && i3.children.includes(t4), voids: n2 });
      };
      for (var l2 of f2) c2(l2);
      a2 && a2.unref();
    }
  });
}, wrapNodes(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  Xt.withoutNormalizing(t3, () => {
    var { mode: u2 = "lowest", split: n2 = false, voids: i2 = false } = r2, { match: o2, at: a2 = t3.selection } = r2;
    if (a2) {
      if (null == o2 && (o2 = ae.isPath(a2) ? Se(t3, a2) : t3.isInline(e2) ? (e3) => Xt.isInline(t3, e3) || me.isText(e3) : (e3) => Xt.isBlock(t3, e3)), n2 && ve.isRange(a2)) {
        var [s2, f2] = ve.edges(a2), c2 = Xt.rangeRef(t3, a2, { affinity: "inward" });
        Le.splitNodes(t3, { at: f2, match: o2, voids: i2 }), Le.splitNodes(t3, { at: s2, match: o2, voids: i2 }), a2 = c2.unref(), null == r2.at && Le.select(t3, a2);
      }
      var l2 = Array.from(Xt.nodes(t3, { at: a2, match: t3.isInline(e2) ? (e3) => Xt.isBlock(t3, e3) : (t4) => Xt.isEditor(t4), mode: "lowest", voids: i2 }));
      for (var [, h2] of l2) {
        var p2 = ve.isRange(a2) ? ve.intersection(a2, Xt.range(t3, h2)) : a2;
        if (p2) {
          var D2 = Array.from(Xt.nodes(t3, { at: p2, match: o2, mode: u2, voids: i2 }));
          if (D2.length > 0) {
            var v2 = function() {
              var [r3] = D2, u3 = D2[D2.length - 1], [, n3] = r3, [, o3] = u3;
              if (0 === n3.length && 0 === o3.length) return "continue";
              var a3 = ae.equals(n3, o3) ? ae.parent(n3) : ae.common(n3, o3), s3 = Xt.range(t3, n3, o3), f3 = Xt.node(t3, a3), [c3] = f3, l3 = a3.length + 1, h3 = ae.next(o3.slice(0, l3)), p3 = je(je({}, e2), {}, { children: [] });
              Le.insertNodes(t3, p3, { at: h3, voids: i2 }), Le.moveNodes(t3, { at: s3, match: (t4) => Zt.isAncestor(c3) && c3.children.includes(t4), to: h3.concat(0), voids: i2 });
            }();
            if ("continue" === v2) continue;
          }
        }
      }
    }
  });
} }, Ne = (t3, e2) => {
  if (Zt.isElement(e2)) {
    var r2 = e2;
    return !!Xt.isVoid(t3, e2) || 1 === r2.children.length && Ne(t3, r2.children[0]);
  }
  return !Xt.isEditor(e2);
}, Re = (t3, e2) => {
  if (ve.isCollapsed(e2)) return e2.anchor;
  var [, r2] = ve.edges(e2), u2 = Xt.pointRef(t3, r2);
  return Le.delete(t3, { at: e2 }), u2.unref();
}, Se = (t3, e2) => {
  var [r2] = Xt.node(t3, e2);
  return (t4) => t4 === r2;
};
function Te(t3, e2) {
  var r2 = Object.keys(t3);
  if (Object.getOwnPropertySymbols) {
    var u2 = Object.getOwnPropertySymbols(t3);
    e2 && (u2 = u2.filter(function(e3) {
      return Object.getOwnPropertyDescriptor(t3, e3).enumerable;
    })), r2.push.apply(r2, u2);
  }
  return r2;
}
function Ie(t3) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var r2 = null != arguments[e2] ? arguments[e2] : {};
    e2 % 2 ? Te(Object(r2), true).forEach(function(e3) {
      it(t3, e3, r2[e3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r2)) : Te(Object(r2)).forEach(function(e3) {
      Object.defineProperty(t3, e3, Object.getOwnPropertyDescriptor(r2, e3));
    });
  }
  return t3;
}
var qe = { collapse(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, { edge: r2 = "anchor" } = e2, { selection: u2 } = t3;
  if (u2) {
    if ("anchor" === r2) Le.select(t3, u2.anchor);
    else if ("focus" === r2) Le.select(t3, u2.focus);
    else if ("start" === r2) {
      var [n2] = ve.edges(u2);
      Le.select(t3, n2);
    } else if ("end" === r2) {
      var [, i2] = ve.edges(u2);
      Le.select(t3, i2);
    }
  }
}, deselect(t3) {
  var { selection: e2 } = t3;
  e2 && t3.apply({ type: "set_selection", properties: e2, newProperties: null });
}, move(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, { selection: r2 } = t3, { distance: u2 = 1, unit: n2 = "character", reverse: i2 = false } = e2, { edge: o2 = null } = e2;
  if (r2) {
    "start" === o2 && (o2 = ve.isBackward(r2) ? "focus" : "anchor"), "end" === o2 && (o2 = ve.isBackward(r2) ? "anchor" : "focus");
    var { anchor: a2, focus: s2 } = r2, f2 = { distance: u2, unit: n2 }, c2 = {};
    if (null == o2 || "anchor" === o2) {
      var l2 = i2 ? Xt.before(t3, a2, f2) : Xt.after(t3, a2, f2);
      l2 && (c2.anchor = l2);
    }
    if (null == o2 || "focus" === o2) {
      var h2 = i2 ? Xt.before(t3, s2, f2) : Xt.after(t3, s2, f2);
      h2 && (c2.focus = h2);
    }
    Le.setSelection(t3, c2);
  }
}, select(t3, e2) {
  var { selection: r2 } = t3;
  if (e2 = Xt.range(t3, e2), r2) Le.setSelection(t3, e2);
  else {
    if (!ve.isRange(e2)) throw new Error("When setting the selection and the current selection is `null` you must provide at least an `anchor` and `focus`, but you passed: ".concat(Be.stringify(e2)));
    t3.apply({ type: "set_selection", properties: r2, newProperties: e2 });
  }
}, setPoint(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, { selection: u2 } = t3, { edge: n2 = "both" } = r2;
  if (u2) {
    "start" === n2 && (n2 = ve.isBackward(u2) ? "focus" : "anchor"), "end" === n2 && (n2 = ve.isBackward(u2) ? "anchor" : "focus");
    var { anchor: i2, focus: o2 } = u2, a2 = "anchor" === n2 ? i2 : o2;
    Le.setSelection(t3, { ["anchor" === n2 ? "anchor" : "focus"]: Ie(Ie({}, a2), e2) });
  }
}, setSelection(t3, e2) {
  var { selection: r2 } = t3, u2 = {}, n2 = {};
  if (r2) {
    for (var i2 in e2) ("anchor" === i2 && null != e2.anchor && !le.equals(e2.anchor, r2.anchor) || "focus" === i2 && null != e2.focus && !le.equals(e2.focus, r2.focus) || "anchor" !== i2 && "focus" !== i2 && e2[i2] !== r2[i2]) && (u2[i2] = r2[i2], n2[i2] = e2[i2]);
    Object.keys(u2).length > 0 && t3.apply({ type: "set_selection", properties: u2, newProperties: n2 });
  }
} }, ze = { delete(t3) {
  var e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  Xt.withoutNormalizing(t3, () => {
    var { reverse: r2 = false, unit: u2 = "character", distance: n2 = 1, voids: i2 = false } = e2, { at: o2 = t3.selection, hanging: a2 = false } = e2;
    if (o2) {
      var s2 = false;
      if (ve.isRange(o2) && ve.isCollapsed(o2) && (s2 = true, o2 = o2.anchor), le.isPoint(o2)) {
        var f2 = Xt.void(t3, { at: o2, mode: "highest" });
        if (!i2 && f2) {
          var [, c2] = f2;
          o2 = c2;
        } else {
          var l2 = { unit: u2, distance: n2 };
          o2 = { anchor: o2, focus: r2 ? Xt.before(t3, o2, l2) || Xt.start(t3, []) : Xt.after(t3, o2, l2) || Xt.end(t3, []) }, a2 = true;
        }
      }
      if (ae.isPath(o2)) Le.removeNodes(t3, { at: o2, voids: i2 });
      else if (!ve.isCollapsed(o2)) {
        if (!a2) {
          var [, h2] = ve.edges(o2), p2 = Xt.end(t3, []);
          le.equals(h2, p2) || (o2 = Xt.unhangRange(t3, o2, { voids: i2 }));
        }
        var [D2, v2] = ve.edges(o2), C2 = Xt.above(t3, { match: (e3) => Xt.isBlock(t3, e3), at: D2, voids: i2 }), d2 = Xt.above(t3, { match: (e3) => Xt.isBlock(t3, e3), at: v2, voids: i2 }), B2 = C2 && d2 && !ae.equals(C2[1], d2[1]), g2 = ae.equals(D2.path, v2.path), A2 = i2 ? null : Xt.void(t3, { at: D2, mode: "highest" }), F2 = i2 ? null : Xt.void(t3, { at: v2, mode: "highest" });
        if (A2) {
          var y2 = Xt.before(t3, D2);
          y2 && C2 && ae.isAncestor(C2[1], y2.path) && (D2 = y2);
        }
        if (F2) {
          var E2 = Xt.after(t3, v2);
          E2 && d2 && ae.isAncestor(d2[1], E2.path) && (v2 = E2);
        }
        var m2, _2 = [];
        for (var b2 of Xt.nodes(t3, { at: o2, voids: i2 })) {
          var [w2, x2] = b2;
          m2 && 0 === ae.compare(x2, m2) || (!i2 && Xt.isVoid(t3, w2) || !ae.isCommon(x2, D2.path) && !ae.isCommon(x2, v2.path)) && (_2.push(b2), m2 = x2);
        }
        var O2 = Array.from(_2, (e3) => {
          var [, r3] = e3;
          return Xt.pathRef(t3, r3);
        }), P2 = Xt.pointRef(t3, D2), j2 = Xt.pointRef(t3, v2), k2 = "";
        if (!g2 && !A2) {
          var N2 = P2.current, [R2] = Xt.leaf(t3, N2), { path: S2 } = N2, { offset: T2 } = D2, I2 = R2.text.slice(T2);
          I2.length > 0 && (t3.apply({ type: "remove_text", path: S2, offset: T2, text: I2 }), k2 = I2);
        }
        for (var q2 of O2) {
          var z2 = q2.unref();
          Le.removeNodes(t3, { at: z2, voids: i2 });
        }
        if (!F2) {
          var M2 = j2.current, [W2] = Xt.leaf(t3, M2), { path: L2 } = M2, V2 = g2 ? D2.offset : 0, $2 = W2.text.slice(V2, v2.offset);
          $2.length > 0 && (t3.apply({ type: "remove_text", path: L2, offset: V2, text: $2 }), k2 = $2);
        }
        !g2 && B2 && j2.current && P2.current && Le.mergeNodes(t3, { at: j2.current, hanging: true, voids: i2 }), s2 && r2 && "character" === u2 && k2.length > 1 && k2.match(/[\u0E00-\u0E7F]+/) && Le.insertText(t3, k2.slice(0, k2.length - n2));
        var U2 = P2.unref(), Z2 = j2.unref(), K2 = r2 ? U2 || Z2 : Z2 || U2;
        null == e2.at && K2 && Le.select(t3, K2);
      }
    }
  });
}, insertFragment(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  Xt.withoutNormalizing(t3, () => {
    var { hanging: u2 = false, voids: n2 = false } = r2, { at: i2 = t3.selection } = r2;
    if (e2.length && i2) {
      if (ve.isRange(i2)) if (u2 || (i2 = Xt.unhangRange(t3, i2)), ve.isCollapsed(i2)) i2 = i2.anchor;
      else {
        var [, o2] = ve.edges(i2);
        if (!n2 && Xt.void(t3, { at: o2 })) return;
        var a2 = Xt.pointRef(t3, o2);
        Le.delete(t3, { at: i2 }), i2 = a2.unref();
      }
      else ae.isPath(i2) && (i2 = Xt.start(t3, i2));
      if (n2 || !Xt.void(t3, { at: i2 })) {
        var s2 = Xt.above(t3, { at: i2, match: (e3) => Xt.isInline(t3, e3), mode: "highest", voids: n2 });
        if (s2) {
          var [, f2] = s2;
          if (Xt.isEnd(t3, i2, f2)) i2 = Xt.after(t3, f2);
          else if (Xt.isStart(t3, i2, f2)) {
            i2 = Xt.before(t3, f2);
          }
        }
        var c2 = Xt.above(t3, { match: (e3) => Xt.isBlock(t3, e3), at: i2, voids: n2 }), [, l2] = c2, h2 = Xt.isStart(t3, i2, l2), p2 = Xt.isEnd(t3, i2, l2), D2 = h2 && p2, v2 = !h2 || h2 && p2, C2 = !p2, [, d2] = ue.first({ children: e2 }, []), [, B2] = ue.last({ children: e2 }, []), g2 = [], A2 = (e3) => {
          var [r3, u3] = e3;
          return !(0 === u3.length) && (!!D2 || !(v2 && ae.isAncestor(u3, d2) && Zt.isElement(r3) && !t3.isVoid(r3) && !t3.isInline(r3)) && !(C2 && ae.isAncestor(u3, B2) && Zt.isElement(r3) && !t3.isVoid(r3) && !t3.isInline(r3)));
        };
        for (var F2 of ue.nodes({ children: e2 }, { pass: A2 })) A2(F2) && g2.push(F2);
        var y2 = [], E2 = [], m2 = [], _2 = true, b2 = false;
        for (var [w2] of g2) Zt.isElement(w2) && !t3.isInline(w2) ? (_2 = false, b2 = true, E2.push(w2)) : _2 ? y2.push(w2) : m2.push(w2);
        var [x2] = Xt.nodes(t3, { at: i2, match: (e3) => me.isText(e3) || Xt.isInline(t3, e3), mode: "highest", voids: n2 }), [, O2] = x2, P2 = Xt.isStart(t3, i2, O2), j2 = Xt.isEnd(t3, i2, O2), k2 = Xt.pathRef(t3, p2 ? ae.next(l2) : l2), N2 = Xt.pathRef(t3, j2 ? ae.next(O2) : O2), R2 = Xt.pathRef(t3, l2);
        Le.splitNodes(t3, { at: i2, match: (e3) => b2 ? Xt.isBlock(t3, e3) : me.isText(e3) || Xt.isInline(t3, e3), mode: b2 ? "lowest" : "highest", voids: n2 });
        var S2 = Xt.pathRef(t3, !P2 || P2 && j2 ? ae.next(O2) : O2);
        if (Le.insertNodes(t3, y2, { at: S2.current, match: (e3) => me.isText(e3) || Xt.isInline(t3, e3), mode: "highest", voids: n2 }), D2 && E2.length && Le.delete(t3, { at: R2.unref(), voids: n2 }), Le.insertNodes(t3, E2, { at: k2.current, match: (e3) => Xt.isBlock(t3, e3), mode: "lowest", voids: n2 }), Le.insertNodes(t3, m2, { at: N2.current, match: (e3) => me.isText(e3) || Xt.isInline(t3, e3), mode: "highest", voids: n2 }), !r2.at) {
          var T2;
          T2 = m2.length > 0 ? ae.previous(N2.current) : E2.length > 0 ? ae.previous(k2.current) : ae.previous(S2.current);
          var I2 = Xt.end(t3, T2);
          Le.select(t3, I2);
        }
        S2.unref(), k2.unref(), N2.unref();
      }
    }
  });
}, insertText(t3, e2) {
  var r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  Xt.withoutNormalizing(t3, () => {
    var { voids: u2 = false } = r2, { at: n2 = t3.selection } = r2;
    if (n2) {
      if (ae.isPath(n2) && (n2 = Xt.range(t3, n2)), ve.isRange(n2)) if (ve.isCollapsed(n2)) n2 = n2.anchor;
      else {
        var i2 = ve.end(n2);
        if (!u2 && Xt.void(t3, { at: i2 })) return;
        var o2 = ve.start(n2), a2 = Xt.pointRef(t3, o2), s2 = Xt.pointRef(t3, i2);
        Le.delete(t3, { at: n2, voids: u2 });
        var f2 = a2.unref(), c2 = s2.unref();
        n2 = f2 || c2, Le.setSelection(t3, { anchor: n2, focus: n2 });
      }
      if (u2 || !Xt.void(t3, { at: n2 })) {
        var { path: l2, offset: h2 } = n2;
        e2.length > 0 && t3.apply({ type: "insert_text", path: l2, offset: h2, text: e2 });
      }
    }
  });
} };
function Me(t3, e2) {
  var r2 = Object.keys(t3);
  if (Object.getOwnPropertySymbols) {
    var u2 = Object.getOwnPropertySymbols(t3);
    e2 && (u2 = u2.filter(function(e3) {
      return Object.getOwnPropertyDescriptor(t3, e3).enumerable;
    })), r2.push.apply(r2, u2);
  }
  return r2;
}
function We(t3) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var r2 = null != arguments[e2] ? arguments[e2] : {};
    e2 % 2 ? Me(Object(r2), true).forEach(function(e3) {
      it(t3, e3, r2[e3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r2)) : Me(Object(r2)).forEach(function(e3) {
      Object.defineProperty(t3, e3, Object.getOwnPropertyDescriptor(r2, e3));
    });
  }
  return t3;
}
var Le = We(We(We(We({}, we), ke), qe), ze), Ve = "insert_text", $e = "remove_text", Ue = "insert_node", Ze = "remove_node", Ke = "split_node", Je = "merge_node", Ge = "move_node", He = "set_node", Ye = function(e2, r2) {
  var u2 = ae.transform(e2.path, r2);
  return u2 ? [t(t({}, e2), { path: u2 })] : [];
}, Xe = function(t3) {
  return [{ type: Ze, path: t3.path.slice(), node: { text: "" } }, { type: Ue, path: ae.transform(t3.path, t3), node: { text: "" } }];
}, Qe = function(e2, r2) {
  var u2 = e2.path, n2 = ae.transform(r2.path, t(t({}, e2), { type: Ue }));
  return ae.isSibling(u2, n2) && ae.endsBefore(u2, n2) && (n2 = ae.previous(n2)), { type: Ge, path: u2, newPath: n2 };
}, tr = function(t3, e2) {
  var r2 = e2.path, u2 = ae.transform(t3.path, e2);
  return ae.isSibling(r2, u2) && ae.endsBefore(r2, u2) && (u2 = ae.previous(u2)), { type: Ge, path: r2, newPath: u2 };
}, er = function(e2, r2, u2) {
  switch (r2.type) {
    case Ve:
      return ae.equals(e2.path, r2.path) ? e2.offset < r2.offset || e2.offset === r2.offset && "left" === u2 ? [e2] : [t(t({}, e2), { offset: e2.offset + r2.text.length })] : [e2];
    case $e:
      return ae.equals(e2.path, r2.path) ? e2.offset <= r2.offset ? [e2] : r2.offset + r2.text.length <= e2.offset ? [t(t({}, e2), { offset: e2.offset - r2.text.length })] : [t(t({}, e2), { offset: r2.offset })] : [e2];
    case Ke:
      return ae.equals(e2.path, r2.path) ? e2.offset <= r2.position ? [e2] : [t(t({}, e2), { path: ae.next(e2.path), offset: e2.offset - r2.position })] : Ye(e2, r2);
    default:
      return Ye(e2, r2);
  }
}, rr = function(e2, r2) {
  switch (r2.type) {
    case Ve:
      if (!ae.equals(e2.path, r2.path)) return [e2];
      if (e2.offset + e2.text.length <= r2.offset) return [e2];
      if (r2.offset <= e2.offset) return [t(t({}, e2), { offset: e2.offset + r2.text.length })];
      var u2 = r2.offset - e2.offset, n2 = e2.text.slice(0, u2), i2 = e2.text.slice(u2), o2 = [];
      return n2 && o2.push(t(t({}, e2), { text: n2 })), i2 && o2.push(t(t({}, e2), { text: i2, offset: e2.offset + r2.text.length })), o2;
    case $e:
      if (!ae.equals(e2.path, r2.path)) return [e2];
      if (e2.offset + e2.text.length <= r2.offset) return [e2];
      if (r2.offset + r2.text.length <= e2.offset) return [t(t({}, e2), { offset: e2.offset - r2.text.length })];
      var a2 = Math.max(r2.offset - e2.offset, 0), s2 = (n2 = e2.text.slice(0, a2), Math.min(e2.text.length, r2.offset + r2.text.length - e2.offset));
      i2 = e2.text.slice(s2);
      return [t(t({}, e2), { offset: Math.min(e2.offset, r2.offset), text: n2 + i2 })];
    case Ke:
      return ae.equals(e2.path, r2.path) ? e2.offset + e2.text.length <= r2.position ? [e2] : e2.offset >= r2.position ? [t(t({}, e2), { path: ae.next(r2.path), offset: e2.offset - r2.position })] : [t(t({}, e2), { text: e2.text.slice(0, r2.position - e2.offset) }), t(t({}, e2), { path: ae.next(r2.path), offset: 0, text: e2.text.slice(r2.position - e2.offset) })] : Ye(e2, r2);
    case Je:
      return ae.equals(e2.path, r2.path) ? [t(t({}, e2), { path: ae.previous(r2.path), offset: e2.offset + r2.position })] : Ye(e2, r2);
    default:
      return Ye(e2, r2);
  }
}, ur = function(e2, r2, u2) {
  switch (r2.type) {
    case Ue:
      return ae.equals(e2.path, r2.path) && "left" === u2 ? [e2] : Ye(e2, r2);
    case Ze:
    case Ke:
      return ae.equals(e2.path, r2.path) ? [e2] : Ye(e2, r2);
    case Je:
      if (ae.equals(e2.path, r2.path)) {
        var n2 = me.isText(e2.node) ? e2.node.text.length : e2.node.children.length;
        return [t(t({}, r2), { type: Ke, path: ae.previous(r2.path) }), e2, r2, t(t({}, r2), { position: r2.position + n2 })];
      }
      return Ye(e2, r2);
    case Ge:
      if (ae.equals(r2.path, r2.newPath)) return [e2];
      if (ae.equals(e2.path, r2.path)) return [t(t({}, e2), { path: ae.transform(ae.next(e2.path), r2) })];
      var i2 = Xe(r2), o2 = i2[0], a2 = i2[1], s2 = fr.transformMxN([e2], [o2, a2], u2)[0];
      return 1 === s2.length ? s2 : [t(t({}, e2), { path: a2.path.concat(e2.path.slice(o2.path.length)) })];
    default:
      return Ye(e2, r2);
  }
}, nr = function(e2, r2) {
  switch (r2.type) {
    case Ve:
      return ae.equals(e2.path, r2.path) ? e2.position < r2.offset ? [e2] : [t(t({}, e2), { position: e2.position + r2.text.length })] : [e2];
    case $e:
      return ae.equals(e2.path, r2.path) ? e2.position < r2.offset ? [e2] : e2.position >= r2.offset + r2.text.length ? [t(t({}, e2), { position: e2.position - r2.text.length })] : [t(t({}, e2), { position: r2.offset })] : [e2];
    case Ue:
      if (ae.isParent(e2.path, r2.path)) {
        var u2 = r2.path[r2.path.length - 1];
        return e2.position <= u2 ? [e2] : [t(t({}, e2), { position: e2.position + 1 })];
      }
      return Ye(e2, r2);
    case Ze:
      if (ae.isParent(e2.path, r2.path)) {
        u2 = r2.path[r2.path.length - 1];
        return e2.position <= u2 ? [e2] : [t(t({}, e2), { position: e2.position - 1 })];
      }
      return Ye(e2, r2);
    case Ke:
      if (ae.equals(e2.path, r2.path)) return e2.position < r2.position ? [e2] : e2.position === r2.position ? [] : [t(t({}, e2), { path: ae.next(e2.path), position: e2.position - r2.position })];
      if (ae.isParent(e2.path, r2.path)) {
        u2 = r2.path[r2.path.length - 1];
        return e2.position <= u2 ? [e2] : [t(t({}, e2), { position: e2.position + 1 })];
      }
      return Ye(e2, r2);
    case Je:
      if (ae.equals(e2.path, r2.path)) return [];
      if (ae.isParent(e2.path, r2.path)) {
        u2 = r2.path[r2.path.length - 1];
        return e2.position < u2 ? [e2] : e2.position > u2 ? [t(t({}, e2), { position: e2.position - 1 })] : [];
      }
      return Ye(e2, r2);
    case Ge:
      if (ae.equals(r2.path, r2.newPath)) return [e2];
      var n2 = e2.position, i2 = (u2 = r2.path[r2.path.length - 1], r2.newPath[r2.newPath.length - 1]);
      return ae.isParent(e2.path, r2.path) && u2 < e2.position && (n2 -= 1), ae.isParent(e2.path, r2.newPath) && i2 < e2.position && (n2 += 1), [t(t({}, e2), { path: ae.transform(e2.path, r2), position: n2 })];
    default:
      return Ye(e2, r2);
  }
}, ir = function(e2, r2, u2) {
  switch (r2.type) {
    case Ke:
      return ae.equals(e2.path, r2.path) ? [e2, t(t({}, e2), { path: ae.next(e2.path) })] : Ye(e2, r2);
    case He:
      return ae.equals(e2.path, r2.path) ? "left" === u2 ? [t(t({}, e2), { newProperties: t(t({}, r2.newProperties), e2.newProperties) })] : [t(t({}, e2), { newProperties: t(t({}, e2.newProperties), r2.newProperties) })] : [e2];
    case Je:
      return ae.equals(e2.path, r2.path) ? [] : Ye(e2, r2);
    default:
      return Ye(e2, r2);
  }
}, or = function(r2, u2, n2) {
  switch (u2.type) {
    case Ke:
      return ae.equals(r2.path, u2.path) ? [r2, r2] : Ye(r2, u2);
    case Je:
      return ae.equals(r2.path, ae.previous(u2.path)) || ae.equals(r2.path, u2.path) ? [t(t({}, r2), { path: ae.previous(u2.path) })] : Ye(r2, u2);
    case Ge:
      if (ae.equals(u2.path, u2.newPath)) return [r2];
      var i2 = Xe(u2), o2 = i2[0], a2 = i2[1], s2 = fr.transformMxN([r2], [o2, a2], n2), f2 = s2[0], c2 = s2[1];
      return 0 === f2.length ? [t(t({}, r2), { path: a2.path.concat(r2.path.slice(o2.path.length)) })] : (1 === c2.length && c2[0].type === Ue && (f2 = e(e([], f2, true), [{ type: Ze, path: c2[0].path, node: { text: "" } }], false)), f2);
    default:
      return Ye(r2, u2);
  }
}, ar = function(e2, r2) {
  switch (r2.type) {
    case Ve:
      return ae.equals(e2.path, ae.next(r2.path)) ? [t(t({}, e2), { position: e2.position + r2.text.length })] : [e2];
    case $e:
      return ae.equals(e2.path, ae.next(r2.path)) ? [t(t({}, e2), { position: e2.position - r2.text.length })] : [e2];
    case Ue:
      if (ae.equals(e2.path, r2.path)) {
        var u2 = me.isText(r2.node) ? r2.node.text.length : r2.node.children.length;
        return [e2, t(t({}, e2), { position: e2.position + u2 })];
      }
      return ae.isParent(ae.previous(e2.path), r2.path) ? [t(t({}, e2), { position: e2.position + 1 })] : Ye(e2, r2);
    case Ze:
      if (ae.isParent(ae.previous(e2.path), r2.path)) return [t(t({}, e2), { position: e2.position - 1 })];
      var n2 = ae.transform(e2.path, r2), i2 = ae.transform(ae.previous(e2.path), r2);
      return n2 && i2 ? [t(t({}, e2), { path: n2 })] : !n2 && i2 ? [t(t({}, r2), { path: i2 })] : n2 && !i2 ? [t(t({}, r2), { path: n2 })] : [];
    case Ke:
      return ae.equals(e2.path, r2.path) ? [e2, t(t({}, e2), { position: e2.position + r2.position })] : ae.equals(ae.previous(e2.path), r2.path) ? [t(t({}, e2), { path: ae.next(e2.path), position: e2.position - r2.position })] : ae.isParent(ae.previous(e2.path), r2.path) ? [t(t({}, e2), { position: e2.position + 1 })] : (n2 = ae.transform(e2.path, r2)) && 0 === n2[n2.length - 1] ? [t(t({}, r2), { type: Je, path: ae.next(r2.path) }), e2] : Ye(e2, r2);
    case Je:
      return ae.equals(e2.path, r2.path) ? [] : ae.equals(ae.previous(e2.path), r2.path) ? [t(t({}, e2), { path: ae.previous(e2.path), position: e2.position + r2.position })] : ae.isParent(ae.previous(e2.path), r2.path) ? [t(t({}, e2), { position: e2.position - 1 })] : Ye(e2, r2);
    case Ge:
      if (ae.equals(r2.path, r2.newPath)) return [e2];
      n2 = e2.path, i2 = ae.previous(n2);
      var o2 = ae.transform(n2, r2), a2 = ae.transform(i2, r2);
      if (!ae.equals(o2, ae.next(a2))) return [{ type: Ze, path: o2, node: { text: "" } }];
      var s2 = e2.position;
      return ae.isParent(i2, r2.path) && (s2 -= 1), ae.isParent(i2, r2.newPath) && (s2 += 1), [t(t({}, e2), { path: o2, position: s2 })];
    default:
      return Ye(e2, r2);
  }
}, sr = function(e2, r2, u2) {
  if (ae.equals(e2.path, e2.newPath)) return [];
  var n2 = Xe(e2), i2 = n2[0], o2 = n2[1];
  switch (r2.type) {
    case Ue:
      var a2 = fr.transformMxN([i2, o2], [r2], u2)[0];
      return [Qe(a2[0], a2[1])];
    case Ze:
      return 2 === (a2 = fr.transformMxN([i2, o2], [r2], u2)[0]).length ? [t(t({}, e2), Qe(a2[0], a2[1]))] : 1 === a2.length && a2[0].type === Ze ? [a2[0]] : (1 === a2.length && a2[0].type, []);
    case Ke:
      var s2 = ae.isSibling(e2.path, e2.newPath) && ae.endsBefore(e2.path, e2.newPath), f2 = ae.transform(e2.newPath, r2);
      if (ae.equals(e2.path, r2.path)) {
        if (s2) return [t(t({}, e2), { newPath: f2 }), t(t({}, e2), { newPath: f2 })];
        var c2 = t(t({}, e2), { path: ae.next(e2.path), newPath: f2 });
        return [c2, t(t({}, e2), { path: ae.transform(e2.path, c2), newPath: ae.previous(ae.transform(f2, c2)) })];
      }
      return ae.equals(f2, ae.next(r2.path)) && !s2 ? f2 = r2.path : s2 && !ae.isSibling(e2.path, f2) && (f2 = ae.next(f2)), [t(t({}, e2), { path: ae.transform(e2.path, r2), newPath: f2 })];
    case Je:
      var l2 = r2.path, h2 = ae.previous(l2);
      return l2 = ae.transform(l2, e2), (h2 = ae.transform(h2, e2)) && !ae.equals(l2, ae.next(h2)) ? [t(t({}, r2), { type: Ke, path: ae.previous(r2.path) }), e2, { type: Ze, path: l2, node: { text: "" } }] : ae.isParent(ae.previous(r2.path), e2.path) && ae.isParent(r2.path, e2.newPath) ? [t(t({}, e2), { path: ae.transform(e2.path, r2), newPath: ae.previous(ae.transform(e2.newPath, r2)) })] : [t(t({}, e2), { path: ae.transform(e2.path, r2), newPath: ae.transform(e2.newPath, r2) })];
    case Ge:
      if (ae.equals(r2.path, r2.newPath)) return [e2];
      var p2 = Xe(r2), D2 = p2[0], v2 = p2[1], C2 = fr.transformMxN([i2, o2], [D2, v2], u2), d2 = (a2 = C2[0], C2[1]);
      return 2 === a2.length ? [Qe(a2[0], a2[1])] : 1 === d2.length ? "left" === u2 ? [tr(D2, v2), e2] : [] : (0 === a2.length ? (a2[0] = { type: Ze, path: v2.path.concat(i2.path.slice(D2.path.length)), node: { text: "" } }, a2[1] = { type: Ue, path: v2.path.concat(o2.path.slice(D2.path.length)), node: { text: "" } }) : a2[0].type === Ze ? a2[1] = { type: Ue, path: d2[1].path.concat(o2.path.slice(d2[0].path.length)), node: { text: "" } } : (a2[1] = a2[0], a2[0] = { type: Ze, path: v2.path.concat(i2.path.slice(D2.path.length)), node: { text: "" } }), [Qe(a2[0], a2[1])]);
    default:
      return [e2];
  }
}, fr = { transformMxN: function(t3, e2, r2) {
  for (var u2 = [], n2 = [], i2 = 0; i2 < t3.length; i2 += 1) {
    var o2 = t3[i2], a2 = this.transform1xN(o2, e2, r2), s2 = a2[0], f2 = a2[1];
    u2 = u2.concat(s2), n2 = f2;
  }
  return [u2, n2];
}, transform1xN: function(t3, e2, r2) {
  var u2, n2, i2, o2 = [];
  i2 = t3;
  for (var a2 = 0; a2 < e2.length; a2 += 1) {
    var s2 = e2[a2], f2 = this.transform1x1(i2, s2, r2), c2 = f2[0], l2 = f2[1];
    if (o2 = o2.concat(l2), 0 === c2.length) return [[], o2 = o2.concat(e2.slice(a2 + 1))];
    if (c2.length > 1) return c2 = (u2 = this.transformMxN(c2, e2.slice(a2 + 1), r2))[0], l2 = u2[1], [c2, o2 = o2.concat(l2)];
    n2 = i2 = c2[0];
  }
  return [[n2], o2];
}, transform1x1: function(t3, e2, r2) {
  var u2 = "left" === r2 ? "right" : "left";
  return [this.doTransform(t3, e2, r2), this.doTransform(e2, t3, u2)];
}, doTransform: function(t3, e2, r2) {
  switch (t3.type) {
    case Ve:
      return er(t3, e2, r2);
    case $e:
      return rr(t3, e2);
    case Ue:
      return ur(t3, e2, r2);
    case Ze:
      return or(t3, e2, r2);
    case Ke:
      return nr(t3, e2);
    case He:
      return ir(t3, e2, r2);
    case Ge:
      return sr(t3, e2, r2);
    case Je:
      return ar(t3, e2);
    default:
      throw new Error("Unsupported OP");
  }
} }, cr = { type: { name: "slate", uri: "http://sharejs.org/types/slate/v1", create: function(e2) {
  var r2 = vt();
  return t(t({}, r2), e2);
}, apply: function(e2, r2) {
  var n2 = t(t({}, vt()), e2);
  return u.castArray(r2).forEach(function(t3) {
    return Le.transform(n2, t3);
  }), n2;
}, transform: function(t3, e2, r2) {
  if (0 === t3.length) return [];
  if (0 === e2.length) return t3;
  var u2 = "left" === r2 ? "right" : "left";
  return fr.transformMxN(t3, e2, u2)[0];
}, normalize: function(t3) {
  return t3;
}, serialize: function(t3) {
  return { children: u.get(t3, ["children"], []) };
}, deserialize: function(e2) {
  return t(t({}, vt()), { children: u.get(e2, ["children"], []) });
}, transformPresence: function(t3, e2) {
  return u.isEmpty(t3) || u.isEmpty(t3.selection) ? null : { selection: e2.reduce(function(t4, e3) {
    return ve.transform(t4, e3);
  }, t3.selection), user: t3.user };
} } };
export {
  cr as default
};
