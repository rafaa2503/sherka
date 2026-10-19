(function () {
  var root = document.documentElement;
  var body = document.body;
  var toastEl = document.getElementById("toast");
  var toastTimer;

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 1800);
  }

  function copyText(text, msg) {
    function done() { toast(msg || "Copied"); }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { toast("Copy failed"); }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
    else fallback();
  }

  // theme
  var themeBtn = document.getElementById("theme-toggle");
  function setTheme(t, persist) {
    root.setAttribute("data-theme", t);
    themeBtn.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
    themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
    if (persist) { try { localStorage.setItem("sherka-ds-theme", t); } catch (e) {} }
  }
  var saved = null;
  try { saved = localStorage.getItem("sherka-ds-theme"); } catch (e) {}
  setTheme(saved === "light" ? "light" : "dark", false);
  themeBtn.addEventListener("click", function () {
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
  });

  // click to copy
  document.addEventListener("click", function (e) {
    var sw = e.target.closest("[data-copy]");
    if (sw) { copyText(sw.getAttribute("data-copy"), "Copied " + sw.getAttribute("data-copy")); return; }
    var cb = e.target.closest("[data-copy-target]");
    if (cb) {
      var el = document.getElementById(cb.getAttribute("data-copy-target"));
      copyText(el.textContent, "Copied " + (cb.getAttribute("data-label") || "code"));
    }
  });

  // download DESIGN.md
  document.getElementById("dl-design").addEventListener("click", function () {
    var text = document.getElementById("design-md").textContent;
    var blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = "DESIGN.md";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 500);
    toast("DESIGN.md downloaded");
  });

  // print
  document.getElementById("print-spec").addEventListener("click", function () { window.print(); });

  // mobile menu
  var menuBtn = document.getElementById("menu-btn");
  function closeNav() { body.classList.remove("nav-open"); menuBtn.setAttribute("aria-expanded", "false"); }
  menuBtn.addEventListener("click", function () {
    var open = body.classList.toggle("nav-open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.getElementById("scrim").addEventListener("click", closeNav);
  document.querySelectorAll(".side nav a").forEach(function (a) { a.addEventListener("click", closeNav); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });

  // scroll spy
  var links = {};
  document.querySelectorAll(".side nav a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].removeAttribute("aria-current"); });
          links[en.target.id].setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    document.querySelectorAll("main section.sec").forEach(function (s) { io.observe(s); });
  }

  // export tabs
  document.querySelectorAll("[data-tabs]").forEach(function (group) {
    var btns = group.querySelectorAll('[role="tab"]');
    function select(btn) {
      btns.forEach(function (b) {
        var on = b === btn;
        b.setAttribute("aria-selected", on ? "true" : "false");
        b.tabIndex = on ? 0 : -1;
        document.getElementById(b.getAttribute("aria-controls")).hidden = !on;
      });
    }
    btns.forEach(function (b, i) {
      b.addEventListener("click", function () { select(b); });
      b.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = btns[(i + 1) % btns.length];
        if (e.key === "ArrowLeft") n = btns[(i - 1 + btns.length) % btns.length];
        if (n) { e.preventDefault(); n.focus(); select(n); }
      });
    });
  });

  // motion demo
  document.querySelectorAll("[data-play]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var demo = document.getElementById(btn.getAttribute("data-play"));
      var track = demo.querySelector(".motion-track");
      demo.style.setProperty("--run", Math.max(0, track.clientWidth - 24 - 24) + "px");
      demo.classList.toggle("go");
    });
  });

  // demo forms must not navigate
  document.querySelectorAll("form[data-demo]").forEach(function (f) {
    f.addEventListener("submit", function (e) { e.preventDefault(); toast("Demo form, nothing sent"); });
  });
})();
