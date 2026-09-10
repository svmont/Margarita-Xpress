/* ==========================================================================
   Creekside Haven — site interactions
   Vanilla JS, no build step, no dependencies.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------- Mobile navigation ------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* --------------------------- Scroll reveal --------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------------------------- Year stamp ----------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ------------------- Filter chips (plans and gallery) ----------------- */
  document.querySelectorAll("[data-filter-target]").forEach(function (bar) {
    var items = document.querySelectorAll(bar.getAttribute("data-filter-target"));
    var emptySel = bar.getAttribute("data-filter-empty");
    var empty = emptySel ? document.querySelector(emptySel) : null;

    bar.addEventListener("click", function (ev) {
      var chip = ev.target.closest(".chip");
      if (!chip) return;
      var want = chip.getAttribute("data-filter");
      bar.querySelectorAll(".chip").forEach(function (c) {
        c.setAttribute("aria-pressed", c === chip ? "true" : "false");
      });
      var shown = 0;
      items.forEach(function (item) {
        var cats = (item.getAttribute("data-cat") || "").split(" ");
        var match = want === "all" || cats.indexOf(want) !== -1;
        item.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    });
  });

  /* ------------------------------ Lightbox ------------------------------ */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lbArt = lightbox.querySelector("[data-lightbox-art]");
    var lbCap = lightbox.querySelector("figcaption");
    var lastFocus = null;

    var openLightbox = function (shot) {
      var art = shot.querySelector("svg");
      var cap = shot.querySelector("figcaption");
      if (!art) return;
      lastFocus = shot;
      lbArt.innerHTML = art.outerHTML;
      lbCap.textContent = cap ? cap.textContent : "";
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
      lightbox.querySelector(".lightbox-close").focus();
    };
    var closeLightbox = function () {
      lightbox.classList.remove("open");
      lbArt.innerHTML = "";
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    };

    document.querySelectorAll(".shot").forEach(function (shot) {
      shot.addEventListener("click", function () { openLightbox(shot); });
    });
    lightbox.addEventListener("click", function (ev) {
      if (ev.target === lightbox || ev.target.closest(".lightbox-close")) closeLightbox();
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    });
  }

  /* ------------------- Forms: front-end confirmation -------------------- */
  /* No backend is wired up yet. While a form carries data-demo, submits are
     intercepted and an on-page confirmation is shown instead of posting.
     Point the form action at a real endpoint and drop data-demo to go live.
     See creekside-haven/README.md. */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!form.reportValidity()) return;
      var ok = form.querySelector(".form-success");
      if (ok) {
        ok.classList.add("show");
        ok.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });
  });

  /* ------------- Prefill the plan select from a ?plan= param ------------ */
  var planParam = new URLSearchParams(window.location.search).get("plan");
  if (planParam) {
    document.querySelectorAll("select[name='plan']").forEach(function (sel) {
      Array.prototype.forEach.call(sel.options, function (opt) {
        if (opt.value.toLowerCase() === planParam.toLowerCase()) sel.value = opt.value;
      });
    });
  }
})();
