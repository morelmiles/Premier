/*!
 * Datepicker v1.0.9
 * https://fengyuanchen.github.io/datepicker
 *
 * Copyright 2014-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2019-09-21T06:57:34.100Z
 */
!(function(t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(require("jquery"))
    : "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : e((t = t || self).jQuery);
})(this, function(D) {
  "use strict";
  function a(t, e) {
    for (var i = 0; i < e.length; i++) {
      var a = e[i];
      (a.enumerable = a.enumerable || !1),
        (a.configurable = !0),
        "value" in a && (a.writable = !0),
        Object.defineProperty(t, a.key, a);
    }
  }
  D = D && D.hasOwnProperty("default") ? D.default : D;
  var s = {
      autoShow: !1,
      autoHide: !1,
      autoPick: !1,
      inline: !1,
      container: null,
      trigger: null,
      language: "",
      format: "mm/dd/yyyy",
      date: null,
      startDate: null,
      endDate: null,
      startView: 0,
      weekStart: 0,
      yearFirst: !1,
      yearSuffix: "",
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      monthsShort: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      itemTag: "li",
      mutedClass: "muted",
      pickedClass: "picked",
      disabledClass: "disabled",
      highlightedClass: "highlighted",
      template:
        '<div class="datepicker-container"><div class="datepicker-panel" data-view="years picker"><ul><li data-view="years prev">&lsaquo;</li><li data-view="years current"></li><li data-view="years next">&rsaquo;</li></ul><ul data-view="years"></ul></div><div class="datepicker-panel" data-view="months picker"><ul><li data-view="year prev">&lsaquo;</li><li data-view="year current"></li><li data-view="year next">&rsaquo;</li></ul><ul data-view="months"></ul></div><div class="datepicker-panel" data-view="days picker"><ul><li data-view="month prev">&lsaquo;</li><li data-view="month current"></li><li data-view="month next">&rsaquo;</li></ul><ul data-view="week"></ul><ul data-view="days"></ul></div></div>',
      offset: 10,
      zIndex: 1e3,
      filter: null,
      show: null,
      hide: null,
      pick: null
    },
    t = "undefined" != typeof window,
    e = t ? window : {},
    i = t && "ontouchstart" in e.document.documentElement,
    c = "datepicker",
    n = "click.".concat(c),
    r = "focus.".concat(c),
    h = "hide.".concat(c),
    o = "keyup.".concat(c),
    l = "pick.".concat(c),
    d = "resize.".concat(c),
    u = "scroll.".concat(c),
    p = "show.".concat(c),
    f = "touchstart.".concat(c),
    g = "".concat(c, "-hide"),
    y = {},
    m = 0,
    v = 1,
    w = 2,
    k = Object.prototype.toString;
  function b(t) {
    return "string" == typeof t;
  }
  var C = Number.isNaN || e.isNaN;
  function $(t) {
    return "number" == typeof t && !C(t);
  }
  function x(t) {
    return void 0 === t;
  }
  function F(t) {
    return (
      "date" ===
        (function(t) {
          return k
            .call(t)
            .slice(8, -1)
            .toLowerCase();
        })(t) && !C(t.getTime())
    );
  }
  function M(a, s) {
    for (
      var t = arguments.length, n = new Array(2 < t ? t - 2 : 0), e = 2;
      e < t;
      e++
    )
      n[e - 2] = arguments[e];
    return function() {
      for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
        e[i] = arguments[i];
      return a.apply(s, n.concat(e));
    };
  }
  function Y(t) {
    return '[data-view="'.concat(t, '"]');
  }
  function G(t, e) {
    return [
      31,
      (function(t) {
        return (t % 4 == 0 && t % 100 != 0) || t % 400 == 0;
      })(t)
        ? 29
        : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31
    ][e];
  }
  function V(t, e, i) {
    return Math.min(i, G(t, e));
  }
  var T = /(y|m|d)+/g;
  function I(t, e) {
    var i = 1 < arguments.length && void 0 !== e ? e : 1,
      a = String(Math.abs(t)),
      s = a.length,
      n = "";
    for (t < 0 && (n += "-"); s < i; ) (s += 1), (n += "0");
    return n + a;
  }
  var S = /\d+/g,
    P = {
      show: function() {
        this.built || this.build(),
          this.shown ||
            this.trigger(p).isDefaultPrevented() ||
            ((this.shown = !0),
            this.$picker.removeClass(g).on(n, D.proxy(this.click, this)),
            this.showView(this.options.startView),
            this.inline ||
              (this.$scrollParent.on(u, D.proxy(this.place, this)),
              D(window).on(d, (this.onResize = M(this.place, this))),
              D(document).on(
                n,
                (this.onGlobalClick = M(this.globalClick, this))
              ),
              D(document).on(
                o,
                (this.onGlobalKeyup = M(this.globalKeyup, this))
              ),
              i &&
                D(document).on(
                  f,
                  (this.onTouchStart = M(this.touchstart, this))
                ),
              this.place()));
      },
      hide: function() {
        this.shown &&
          (this.trigger(h).isDefaultPrevented() ||
            ((this.shown = !1),
            this.$picker.addClass(g).off(n, this.click),
            this.inline ||
              (this.$scrollParent.off(u, this.place),
              D(window).off(d, this.onResize),
              D(document).off(n, this.onGlobalClick),
              D(document).off(o, this.onGlobalKeyup),
              i && D(document).off(f, this.onTouchStart))));
      },
      toggle: function() {
        this.shown ? this.hide() : this.show();
      },
      update: function() {
        var t = this.getValue();
        t !== this.oldValue && (this.setDate(t, !0), (this.oldValue = t));
      },
      pick: function(t) {
        var e = this.$element,
          i = this.date;
        this.trigger(l, { view: t || "", date: i }).isDefaultPrevented() ||
          ((i = this.formatDate(this.date)),
          this.setValue(i),
          this.isInput && (e.trigger("input"), e.trigger("change")));
      },
      reset: function() {
        this.setDate(this.initialDate, !0),
          this.setValue(this.initialValue),
          this.shown && this.showView(this.options.startView);
      },
      getMonthName: function(t, e) {
        var i = this.options,
          a = i.monthsShort,
          s = i.months;
        return (
          D.isNumeric(t) ? (t = Number(t)) : x(e) && (e = t),
          !0 === e && (s = a),
          s[$(t) ? t : this.date.getMonth()]
        );
      },
      getDayName: function(t, e, i) {
        var a = this.options,
          s = a.days;
        return (
          D.isNumeric(t) ? (t = Number(t)) : (x(i) && (i = e), x(e) && (e = t)),
          i ? (s = a.daysMin) : e && (s = a.daysShort),
          s[$(t) ? t : this.date.getDay()]
        );
      },
      getDate: function(t) {
        var e = this.date;
        return t ? this.formatDate(e) : new Date(e);
      },
      setDate: function(t, e) {
        var i = this.options.filter;
        if (F(t) || b(t)) {
          if (
            ((t = this.parseDate(t)),
            D.isFunction(i) && !1 === i.call(this.$element, t, "day"))
          )
            return;
          (this.date = t),
            (this.viewDate = new Date(t)),
            e || this.pick(),
            this.built && this.render();
        }
      },
      setStartDate: function(t) {
        F(t) || b(t)
          ? (this.startDate = this.parseDate(t))
          : (this.startDate = null),
          this.built && this.render();
      },
      setEndDate: function(t) {
        F(t) || b(t)
          ? (this.endDate = this.parseDate(t))
          : (this.endDate = null),
          this.built && this.render();
      },
      parseDate: function(a) {
        var s = this.format,
          t = [];
        return (
          F(a) ||
            (b(a) && (t = a.match(S) || []),
            F((a = a ? new Date(a) : new Date())) || (a = new Date()),
            t.length === s.parts.length &&
              (D.each(t, function(t, e) {
                var i = parseInt(e, 10);
                switch (s.parts[t]) {
                  case "yy":
                    a.setFullYear(2e3 + i);
                    break;
                  case "yyyy":
                    a.setFullYear(2 === e.length ? 2e3 + i : i);
                    break;
                  case "mm":
                  case "m":
                    a.setMonth(i - 1);
                }
              }),
              D.each(t, function(t, e) {
                var i = parseInt(e, 10);
                switch (s.parts[t]) {
                  case "dd":
                  case "d":
                    a.setDate(i);
                }
              }))),
          new Date(a.getFullYear(), a.getMonth(), a.getDate())
        );
      },
      formatDate: function(t) {
        var e = this.format,
          i = "";
        if (F(t)) {
          var a = t.getFullYear(),
            s = t.getMonth(),
            n = t.getDate(),
            r = {
              d: n,
              dd: I(n, 2),
              m: s + 1,
              mm: I(s + 1, 2),
              yy: String(a).substring(2),
              yyyy: I(a, 4)
            };
          (i = e.source),
            D.each(e.parts, function(t, e) {
              i = i.replace(e, r[e]);
            });
        }
        return i;
      },
      destroy: function() {
        this.unbind(), this.unbuild(), this.$element.removeData(c);
      }
    },
    N = {
      click: function(t) {
        var e = D(t.target),
          i = this.options,
          a = this.date,
          s = this.viewDate,
          n = this.format;
        if (
          (t.stopPropagation(), t.preventDefault(), !e.hasClass("disabled"))
        ) {
          var r = e.data("view"),
            h = s.getFullYear(),
            o = s.getMonth(),
            l = s.getDate();
          switch (r) {
            case "years prev":
            case "years next":
              (h = "years prev" === r ? h - 10 : h + 10),
                s.setFullYear(h),
                s.setDate(V(h, o, l)),
                this.renderYears();
              break;
            case "year prev":
            case "year next":
              (h = "year prev" === r ? h - 1 : h + 1),
                s.setFullYear(h),
                s.setDate(V(h, o, l)),
                this.renderMonths();
              break;
            case "year current":
              n.hasYear && this.showView(w);
              break;
            case "year picked":
              n.hasMonth
                ? this.showView(v)
                : (e
                    .siblings(".".concat(i.pickedClass))
                    .removeClass(i.pickedClass)
                    .data("view", "year"),
                  this.hideView()),
                this.pick("year");
              break;
            case "year":
              (h = parseInt(e.text(), 10)),
                a.setDate(V(h, o, l)),
                a.setFullYear(h),
                s.setDate(V(h, o, l)),
                s.setFullYear(h),
                n.hasMonth
                  ? this.showView(v)
                  : (e
                      .addClass(i.pickedClass)
                      .data("view", "year picked")
                      .siblings(".".concat(i.pickedClass))
                      .removeClass(i.pickedClass)
                      .data("view", "year"),
                    this.hideView()),
                this.pick("year");
              break;
            case "month prev":
            case "month next":
              (o = "month prev" === r ? o - 1 : o + 1) < 0
                ? ((h -= 1), (o += 12))
                : 11 < o && ((h += 1), (o -= 12)),
                s.setFullYear(h),
                s.setDate(V(h, o, l)),
                s.setMonth(o),
                this.renderDays();
              break;
            case "month current":
              n.hasMonth && this.showView(v);
              break;
            case "month picked":
              n.hasDay
                ? this.showView(m)
                : (e
                    .siblings(".".concat(i.pickedClass))
                    .removeClass(i.pickedClass)
                    .data("view", "month"),
                  this.hideView()),
                this.pick("month");
              break;
            case "month":
              (o = D.inArray(e.text(), i.monthsShort)),
                a.setFullYear(h),
                a.setDate(V(h, o, l)),
                a.setMonth(o),
                s.setFullYear(h),
                s.setDate(V(h, o, l)),
                s.setMonth(o),
                n.hasDay
                  ? this.showView(m)
                  : (e
                      .addClass(i.pickedClass)
                      .data("view", "month picked")
                      .siblings(".".concat(i.pickedClass))
                      .removeClass(i.pickedClass)
                      .data("view", "month"),
                    this.hideView()),
                this.pick("month");
              break;
            case "day prev":
            case "day next":
            case "day":
              "day prev" === r ? (o -= 1) : "day next" === r && (o += 1),
                (l = parseInt(e.text(), 10)),
                a.setDate(1),
                a.setFullYear(h),
                a.setMonth(o),
                a.setDate(l),
                s.setDate(1),
                s.setFullYear(h),
                s.setMonth(o),
                s.setDate(l),
                this.renderDays(),
                "day" === r && this.hideView(),
                this.pick("day");
              break;
            case "day picked":
              this.hideView(), this.pick("day");
          }
        }
      },
      globalClick: function(t) {
        for (
          var e = t.target, i = this.element, a = this.$trigger[0], s = !0;
          e !== document;

        ) {
          if (e === a || e === i) {
            s = !1;
            break;
          }
          e = e.parentNode;
        }
        s && this.hide();
      },
      keyup: function() {
        this.update();
      },
      globalKeyup: function(t) {
        var e = t.target,
          i = t.key,
          a = t.keyCode;
        this.isInput &&
          e !== this.element &&
          this.shown &&
          ("Tab" === i || 9 === a) &&
          this.hide();
      },
      touchstart: function(t) {
        var e = t.target;
        this.isInput &&
          e !== this.element &&
          !D.contains(this.$picker[0], e) &&
          (this.hide(), this.element.blur());
      }
    },
    j = {
      render: function() {
        this.renderYears(), this.renderMonths(), this.renderDays();
      },
      renderWeek: function() {
        var i = this,
          a = [],
          t = this.options,
          e = t.weekStart,
          s = t.daysMin;
        (e = parseInt(e, 10) % 7),
          (s = s.slice(e).concat(s.slice(0, e))),
          D.each(s, function(t, e) {
            a.push(i.createItem({ text: e }));
          }),
          this.$week.html(a.join(""));
      },
      renderYears: function() {
        var t,
          e = this.options,
          i = this.startDate,
          a = this.endDate,
          s = e.disabledClass,
          n = e.filter,
          r = e.yearSuffix,
          h = this.viewDate.getFullYear(),
          o = new Date().getFullYear(),
          l = this.date.getFullYear(),
          c = [],
          d = !1,
          u = !1;
        for (t = -5; t <= 6; t += 1) {
          var p = new Date(h + t, 1, 1),
            f = !1;
          i && ((f = p.getFullYear() < i.getFullYear()), -5 === t && (d = f)),
            !f &&
              a &&
              ((f = p.getFullYear() > a.getFullYear()), 6 === t && (u = f)),
            !f && n && (f = !1 === n.call(this.$element, p, "year"));
          var g = h + t === l,
            y = g ? "year picked" : "year";
          c.push(
            this.createItem({
              picked: g,
              disabled: f,
              text: h + t,
              view: f ? "year disabled" : y,
              highlighted: p.getFullYear() === o
            })
          );
        }
        this.$yearsPrev.toggleClass(s, d),
          this.$yearsNext.toggleClass(s, u),
          this.$yearsCurrent.toggleClass(s, !0).html(
            ""
              .concat(h + -5 + r, " - ")
              .concat(h + 6)
              .concat(r)
          ),
          this.$years.html(c.join(""));
      },
      renderMonths: function() {
        var t,
          e = this.options,
          i = this.startDate,
          a = this.endDate,
          s = this.viewDate,
          n = e.disabledClass || "",
          r = e.monthsShort,
          h = D.isFunction(e.filter) && e.filter,
          o = s.getFullYear(),
          l = new Date(),
          c = l.getFullYear(),
          d = l.getMonth(),
          u = this.date.getFullYear(),
          p = this.date.getMonth(),
          f = [],
          g = !1,
          y = !1;
        for (t = 0; t <= 11; t += 1) {
          var m = new Date(o, t, 1),
            v = !1;
          i &&
            (v =
              (g = m.getFullYear() === i.getFullYear()) &&
              m.getMonth() < i.getMonth()),
            !v &&
              a &&
              (v =
                (y = m.getFullYear() === a.getFullYear()) &&
                m.getMonth() > a.getMonth()),
            !v && h && (v = !1 === h.call(this.$element, m, "month"));
          var w = o === u && t === p,
            k = w ? "month picked" : "month";
          f.push(
            this.createItem({
              disabled: v,
              picked: w,
              highlighted: o === c && m.getMonth() === d,
              index: t,
              text: r[t],
              view: v ? "month disabled" : k
            })
          );
        }
        this.$yearPrev.toggleClass(n, g),
          this.$yearNext.toggleClass(n, y),
          this.$yearCurrent.toggleClass(n, g && y).html(o + e.yearSuffix || ""),
          this.$months.html(f.join(""));
      },
      renderDays: function() {
        var t,
          e,
          i,
          a = this.$element,
          s = this.options,
          n = this.startDate,
          r = this.endDate,
          h = this.viewDate,
          o = this.date,
          l = s.disabledClass,
          c = s.filter,
          d = s.months,
          u = s.weekStart,
          p = s.yearSuffix,
          f = h.getFullYear(),
          g = h.getMonth(),
          y = new Date(),
          m = y.getFullYear(),
          v = y.getMonth(),
          w = y.getDate(),
          k = o.getFullYear(),
          D = o.getMonth(),
          b = o.getDate(),
          C = [],
          $ = f,
          x = g,
          F = !1;
        0 === g ? (($ -= 1), (x = 11)) : (x -= 1), (t = G($, x));
        var M = new Date(f, g, 1);
        for (
          (i = M.getDay() - (parseInt(u, 10) % 7)) <= 0 && (i += 7),
            n && (F = M.getTime() <= n.getTime()),
            e = t - (i - 1);
          e <= t;
          e += 1
        ) {
          var Y = new Date($, x, e),
            V = !1;
          n && (V = Y.getTime() < n.getTime()),
            !V && c && (V = !1 === c.call(a, Y, "day")),
            C.push(
              this.createItem({
                disabled: V,
                highlighted: $ === m && x === v && Y.getDate() === w,
                muted: !0,
                picked: $ === k && x === D && e === b,
                text: e,
                view: "day prev"
              })
            );
        }
        var T = [],
          I = f,
          S = g,
          P = !1;
        11 === g ? ((I += 1), (S = 0)) : (S += 1),
          (t = G(f, g)),
          (i = 42 - (C.length + t));
        var N = new Date(f, g, t);
        for (r && (P = N.getTime() >= r.getTime()), e = 1; e <= i; e += 1) {
          var j = new Date(I, S, e),
            q = I === k && S === D && e === b,
            A = !1;
          r && (A = j.getTime() > r.getTime()),
            !A && c && (A = !1 === c.call(a, j, "day")),
            T.push(
              this.createItem({
                disabled: A,
                picked: q,
                highlighted: I === m && S === v && j.getDate() === w,
                muted: !0,
                text: e,
                view: "day next"
              })
            );
        }
        var O = [];
        for (e = 1; e <= t; e += 1) {
          var W = new Date(f, g, e),
            z = !1;
          n && (z = W.getTime() < n.getTime()),
            !z && r && (z = W.getTime() > r.getTime()),
            !z && c && (z = !1 === c.call(a, W, "day"));
          var J = f === k && g === D && e === b,
            E = J ? "day picked" : "day";
          O.push(
            this.createItem({
              disabled: z,
              picked: J,
              highlighted: f === m && g === v && W.getDate() === w,
              text: e,
              view: z ? "day disabled" : E
            })
          );
        }
        this.$monthPrev.toggleClass(l, F),
          this.$monthNext.toggleClass(l, P),
          this.$monthCurrent.toggleClass(l, F && P).html(
            s.yearFirst
              ? "".concat(f + p, " ").concat(d[g])
              : ""
                  .concat(d[g], " ")
                  .concat(f)
                  .concat(p)
          ),
          this.$days.html(C.join("") + O.join("") + T.join(""));
      }
    },
    q = "".concat(c, "-top-left"),
    A = "".concat(c, "-top-right"),
    O = "".concat(c, "-bottom-left"),
    W = "".concat(c, "-bottom-right"),
    z = [q, A, O, W].join(" "),
    J = (function() {
      function i(t) {
        var e =
          1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        !(function(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, i),
          (this.$element = D(t)),
          (this.element = t),
          (this.options = D.extend(
            {},
            s,
            y[e.language],
            D.isPlainObject(e) && e
          )),
          (this.$scrollParent = (function(t, e) {
            var i = 1 < arguments.length && void 0 !== e && e,
              a = D(t),
              s = a.css("position"),
              n = "absolute" === s,
              r = i ? /auto|scroll|hidden/ : /auto|scroll/,
              h = a
                .parents()
                .filter(function(t, e) {
                  var i = D(e);
                  return (
                    (!n || "static" !== i.css("position")) &&
                    r.test(
                      i.css("overflow") +
                        i.css("overflow-y") +
                        i.css("overflow-x")
                    )
                  );
                })
                .eq(0);
            return "fixed" !== s && h.length
              ? h
              : D(t.ownerDocument || document);
          })(t, !0)),
          (this.built = !1),
          (this.shown = !1),
          (this.isInput = !1),
          (this.inline = !1),
          (this.initialValue = ""),
          (this.initialDate = null),
          (this.startDate = null),
          (this.endDate = null),
          this.init();
      }
      return (
        (function(t, e, i) {
          e && a(t.prototype, e), i && a(t, i);
        })(
          i,
          [
            {
              key: "init",
              value: function() {
                var t = this.$element,
                  e = this.options,
                  i = e.startDate,
                  a = e.endDate,
                  s = e.date;
                (this.$trigger = D(e.trigger)),
                  (this.isInput = t.is("input") || t.is("textarea")),
                  (this.inline = e.inline && (e.container || !this.isInput)),
                  (this.format = (function(i) {
                    var t = String(i).toLowerCase(),
                      e = t.match(T);
                    if (!e || 0 === e.length)
                      throw new Error("Invalid date format.");
                    return (
                      (i = { source: t, parts: e }),
                      D.each(e, function(t, e) {
                        switch (e) {
                          case "dd":
                          case "d":
                            i.hasDay = !0;
                            break;
                          case "mm":
                          case "m":
                            i.hasMonth = !0;
                            break;
                          case "yyyy":
                          case "yy":
                            i.hasYear = !0;
                        }
                      }),
                      i
                    );
                  })(e.format));
                var n = this.getValue();
                (this.initialValue = n),
                  (this.oldValue = n),
                  (s = this.parseDate(s || n)),
                  i &&
                    ((i = this.parseDate(i)),
                    s.getTime() < i.getTime() && (s = new Date(i)),
                    (this.startDate = i)),
                  a &&
                    ((a = this.parseDate(a)),
                    i && a.getTime() < i.getTime() && (a = new Date(i)),
                    s.getTime() > a.getTime() && (s = new Date(a)),
                    (this.endDate = a)),
                  (this.date = s),
                  (this.viewDate = new Date(s)),
                  (this.initialDate = new Date(this.date)),
                  this.bind(),
                  (e.autoShow || this.inline) && this.show(),
                  e.autoPick && this.pick();
              }
            },
            {
              key: "build",
              value: function() {
                if (!this.built) {
                  this.built = !0;
                  var t = this.$element,
                    e = this.options,
                    i = D(e.template);
                  (this.$picker = i),
                    (this.$week = i.find(Y("week"))),
                    (this.$yearsPicker = i.find(Y("years picker"))),
                    (this.$yearsPrev = i.find(Y("years prev"))),
                    (this.$yearsNext = i.find(Y("years next"))),
                    (this.$yearsCurrent = i.find(Y("years current"))),
                    (this.$years = i.find(Y("years"))),
                    (this.$monthsPicker = i.find(Y("months picker"))),
                    (this.$yearPrev = i.find(Y("year prev"))),
                    (this.$yearNext = i.find(Y("year next"))),
                    (this.$yearCurrent = i.find(Y("year current"))),
                    (this.$months = i.find(Y("months"))),
                    (this.$daysPicker = i.find(Y("days picker"))),
                    (this.$monthPrev = i.find(Y("month prev"))),
                    (this.$monthNext = i.find(Y("month next"))),
                    (this.$monthCurrent = i.find(Y("month current"))),
                    (this.$days = i.find(Y("days"))),
                    this.inline
                      ? D(e.container || t).append(
                          i.addClass("".concat(c, "-inline"))
                        )
                      : (D(document.body).append(
                          i.addClass("".concat(c, "-dropdown"))
                        ),
                        i.addClass(g).css({ zIndex: parseInt(e.zIndex, 10) })),
                    this.renderWeek();
                }
              }
            },
            {
              key: "unbuild",
              value: function() {
                this.built && ((this.built = !1), this.$picker.remove());
              }
            },
            {
              key: "bind",
              value: function() {
                var t = this.options,
                  e = this.$element;
                D.isFunction(t.show) && e.on(p, t.show),
                  D.isFunction(t.hide) && e.on(h, t.hide),
                  D.isFunction(t.pick) && e.on(l, t.pick),
                  this.isInput && e.on(o, D.proxy(this.keyup, this)),
                  this.inline ||
                    (t.trigger
                      ? this.$trigger.on(n, D.proxy(this.toggle, this))
                      : this.isInput
                      ? e.on(r, D.proxy(this.show, this))
                      : e.on(n, D.proxy(this.show, this)));
              }
            },
            {
              key: "unbind",
              value: function() {
                var t = this.$element,
                  e = this.options;
                D.isFunction(e.show) && t.off(p, e.show),
                  D.isFunction(e.hide) && t.off(h, e.hide),
                  D.isFunction(e.pick) && t.off(l, e.pick),
                  this.isInput && t.off(o, this.keyup),
                  this.inline ||
                    (e.trigger
                      ? this.$trigger.off(n, this.toggle)
                      : this.isInput
                      ? t.off(r, this.show)
                      : t.off(n, this.show));
              }
            },
            {
              key: "showView",
              value: function(t) {
                var e = this.$yearsPicker,
                  i = this.$monthsPicker,
                  a = this.$daysPicker,
                  s = this.format;
                if (s.hasYear || s.hasMonth || s.hasDay)
                  switch (Number(t)) {
                    case w:
                      i.addClass(g),
                        a.addClass(g),
                        s.hasYear
                          ? (this.renderYears(), e.removeClass(g), this.place())
                          : this.showView(m);
                      break;
                    case v:
                      e.addClass(g),
                        a.addClass(g),
                        s.hasMonth
                          ? (this.renderMonths(),
                            i.removeClass(g),
                            this.place())
                          : this.showView(w);
                      break;
                    default:
                      e.addClass(g),
                        i.addClass(g),
                        s.hasDay
                          ? (this.renderDays(), a.removeClass(g), this.place())
                          : this.showView(v);
                  }
              }
            },
            {
              key: "hideView",
              value: function() {
                !this.inline && this.options.autoHide && this.hide();
              }
            },
            {
              key: "place",
              value: function() {
                if (!this.inline) {
                  var t = this.$element,
                    e = this.options,
                    i = this.$picker,
                    a = D(document).outerWidth(),
                    s = D(document).outerHeight(),
                    n = t.outerWidth(),
                    r = t.outerHeight(),
                    h = i.width(),
                    o = i.height(),
                    l = t.offset(),
                    c = l.left,
                    d = l.top,
                    u = parseFloat(e.offset),
                    p = q;
                  C(u) && (u = 10),
                    o < d && s < d + r + o
                      ? ((d -= o + u), (p = O))
                      : (d += r + u),
                    a < c + h &&
                      ((c += n - h), (p = p.replace("left", "right"))),
                    i
                      .removeClass(z)
                      .addClass(p)
                      .css({ top: d, left: c });
                }
              }
            },
            {
              key: "trigger",
              value: function(t, e) {
                var i = D.Event(t, e);
                return this.$element.trigger(i), i;
              }
            },
            {
              key: "createItem",
              value: function(t) {
                var e = this.options,
                  i = e.itemTag,
                  a = {
                    text: "",
                    view: "",
                    muted: !1,
                    picked: !1,
                    disabled: !1,
                    highlighted: !1
                  },
                  s = [];
                return (
                  D.extend(a, t),
                  a.muted && s.push(e.mutedClass),
                  a.highlighted && s.push(e.highlightedClass),
                  a.picked && s.push(e.pickedClass),
                  a.disabled && s.push(e.disabledClass),
                  "<"
                    .concat(i, ' class="')
                    .concat(s.join(" "), '" data-view="')
                    .concat(a.view, '">')
                    .concat(a.text, "</")
                    .concat(i, ">")
                );
              }
            },
            {
              key: "getValue",
              value: function() {
                var t = this.$element;
                return this.isInput ? t.val() : t.text();
              }
            },
            {
              key: "setValue",
              value: function(t) {
                var e = 0 < arguments.length && void 0 !== t ? t : "",
                  i = this.$element;
                this.isInput
                  ? i.val(e)
                  : (this.inline && !this.options.container) || i.text(e);
              }
            }
          ],
          [
            {
              key: "setDefaults",
              value: function(t) {
                var e = 0 < arguments.length && void 0 !== t ? t : {};
                D.extend(s, y[e.language], D.isPlainObject(e) && e);
              }
            }
          ]
        ),
        i
      );
    })();
  if ((D.extend && D.extend(J.prototype, j, N, P), D.fn)) {
    var E = D.fn.datepicker;
    (D.fn.datepicker = function(h) {
      for (
        var t = arguments.length, o = new Array(1 < t ? t - 1 : 0), e = 1;
        e < t;
        e++
      )
        o[e - 1] = arguments[e];
      var l;
      return (
        this.each(function(t, e) {
          var i = D(e),
            a = "destroy" === h,
            s = i.data(c);
          if (!s) {
            if (a) return;
            var n = D.extend({}, i.data(), D.isPlainObject(h) && h);
            (s = new J(e, n)), i.data(c, s);
          }
          if (b(h)) {
            var r = s[h];
            D.isFunction(r) && ((l = r.apply(s, o)), a && i.removeData(c));
          }
        }),
        x(l) ? this : l
      );
    }),
      (D.fn.datepicker.Constructor = J),
      (D.fn.datepicker.languages = y),
      (D.fn.datepicker.setDefaults = J.setDefaults),
      (D.fn.datepicker.noConflict = function() {
        return (D.fn.datepicker = E), this;
      });
  }
});
