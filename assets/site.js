/* Site behaviour: theme, mobile menu, quick jump, copy email.
   No dependencies. Every control degrades to a normal link or button. */

(function () {
  "use strict";

  var root = document.documentElement;

  /* Theme ---------------------------------------------------------------- */

  var themeButtons = document.querySelectorAll("[data-theme-toggle]");

  function paintTheme() {
    var dark = root.dataset.theme !== "light";
    themeButtons.forEach(function (btn) {
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      btn.setAttribute("title", dark ? "Light theme" : "Dark theme");
    });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#0b0e12" : "#f6f4ef");
  }

  themeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      paintTheme();
    });
  });

  paintTheme();

  /* Mobile menu ---------------------------------------------------------- */

  var menuBtn = document.querySelector("[data-menu-toggle]");
  var mobileNav = document.getElementById("mobile-nav");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", function () {
      var open = mobileNav.dataset.open !== "true";
      mobileNav.dataset.open = String(open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && mobileNav.dataset.open === "true") {
        mobileNav.dataset.open = "false";
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.focus();
      }
    });
  }

  /* Quick jump ----------------------------------------------------------- */

  var dialog = document.getElementById("quick-jump");
  var openers = document.querySelectorAll("[data-jump-open]");
  var input = document.getElementById("jump-input");
  var list = document.getElementById("jump-list");
  var empty = document.getElementById("jump-empty");
  var items = list ? Array.prototype.slice.call(list.querySelectorAll("a")) : [];
  var active = 0;

  if (dialog && list && input && typeof dialog.showModal === "function") {
    var platformKey = /Mac|iPhone|iPad/.test(navigator.platform) ? "\u2318K" : "Ctrl K";
    document.querySelectorAll("[data-jump-key]").forEach(function (el) {
      el.textContent = platformKey;
    });

    var setActive = function (index) {
      if (!items.length) return;
      active = (index + items.length) % items.length;
      items.forEach(function (item, i) {
        item.dataset.active = String(i === active);
      });
      items[active].scrollIntoView({ block: "nearest" });
    };

    var filter = function () {
      var q = input.value.trim().toLowerCase();
      var shown = 0;

      items.forEach(function (item) {
        var haystack = (item.textContent + " " + (item.dataset.keywords || "")).toLowerCase();
        var match = !q || haystack.indexOf(q) !== -1;
        item.parentElement.hidden = !match;
        if (match) shown += 1;
      });

      empty.hidden = shown > 0;
      active = 0;
      var visible = items.filter(function (item) { return !item.parentElement.hidden; });
      visible.forEach(function (item, i) { item.dataset.active = String(i === 0); });
    };

    var open = function () {
      dialog.showModal();
      input.value = "";
      filter();
      input.focus();
    };

    openers.forEach(function (btn) { btn.addEventListener("click", open); });

    input.addEventListener("input", filter);

    dialog.addEventListener("keydown", function (event) {
      var visible = items.filter(function (item) { return !item.parentElement.hidden; });
      if (!visible.length) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        active = (active + 1) % visible.length;
        visible.forEach(function (item, i) { item.dataset.active = String(i === active); });
        visible[active].scrollIntoView({ block: "nearest" });
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        active = (active - 1 + visible.length) % visible.length;
        visible.forEach(function (item, i) { item.dataset.active = String(i === active); });
        visible[active].scrollIntoView({ block: "nearest" });
      }

      if (event.key === "Enter") {
        event.preventDefault();
        if (visible[active]) visible[active].click();
      }
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });

    document.addEventListener("keydown", function (event) {
      var key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        if (dialog.open) dialog.close();
        else open();
      }
    });
  }

  /* Copy email ----------------------------------------------------------- */

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = btn.getAttribute("data-copy");
      var done = function () {
        btn.dataset.copied = "true";
        window.setTimeout(function () { btn.dataset.copied = "false"; }, 2000);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(done, function () {});
      } else {
        var area = document.createElement("textarea");
        area.value = value;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(area);
      }
    });
  });
})();
