/* ==========================================================================
   Margarita Xpress — site interactions
   Vanilla JS, no build step. Phase 1: marketing site.
   The chat widget below is a lightweight, front-end FAQ assistant (no backend).
   Phase 2: swap `botReply()` for a call to a real AI endpoint (e.g. Claude API).
   ========================================================================== */
(function () {
  "use strict";

  /* ----------------------- Mobile navigation ----------------------- */
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

  /* ----------------------- Scroll reveal --------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ----------------------- Year stamp ------------------------------ */
  var yr = document.getElementById("year");
  if (yr) { yr.textContent = new Date().getFullYear(); }

  /* ----------------------- Contact / quote forms ------------------- */
  document.querySelectorAll("form[data-capture]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // Phase 1: no backend. Show success + (optional) open mail client as fallback.
      // Phase 2: POST to Formspree/your API or a serverless function.
      var success = form.querySelector(".form-success");
      if (success) {
        success.classList.add("show");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });
  });

  /* ====================== Chat widget ============================== */
  var launch = document.getElementById("chatLaunch");
  var panel = document.getElementById("chatPanel");
  if (!launch || !panel) return;

  var body = panel.querySelector(".chat-body");
  var input = document.getElementById("chatInput");
  var sendBtn = document.getElementById("chatSend");
  var greeted = false;

  function openChat() {
    panel.classList.add("open");
    launch.style.display = "none";
    if (!greeted) {
      greeted = true;
      bot("Hey there! 🍹 I'm Frosty, the Margarita Xpress assistant. I can help with commercial leasing, buying a machine, pricing, and event rentals across the Houston area. What are you looking to do?");
    }
    setTimeout(function () { if (input) input.focus(); }, 250);
  }
  function closeChat() { panel.classList.remove("open"); launch.style.display = ""; }

  launch.addEventListener("click", openChat);
  panel.querySelector(".chat-close").addEventListener("click", closeChat);

  function add(text, who) {
    var m = document.createElement("div");
    m.className = "msg " + who;
    m.innerHTML = text;
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
    return m;
  }
  function bot(text) {
    var typing = add("…", "bot");
    setTimeout(function () { typing.innerHTML = text; body.scrollTop = body.scrollHeight; }, 450);
  }

  /* Simple keyword matcher — placeholder for a real AI backend (Phase 2). */
  function botReply(q) {
    var t = q.toLowerCase();
    if (/(lease|leasing|long term|long-term|monthly|rent.?to.?own)/.test(t))
      return "Leasing is our specialty. 🙌 We lease commercial machines to bars, restaurants, country clubs, and golf courses from <b>$325/mo</b> (single or double barrel) plus a one-time $100 placement fee — maintenance, cleaning, and our <b>48-hour swap-out guarantee</b> included. Month-to-month, no long-term contract. See <a href='commercial-leasing.html'>commercial leasing</a> or get a quote on the <a href='contact.html'>contact page</a>.";
    if (/(swap|guarantee|downtime|emergency|broken|repair|service)/.test(t))
      return "Our <b>48-hour swap-out guarantee</b> is the difference: if your leased machine ever needs service, we deliver a working spare within 48 hours so you never lose a pour. Commercial accounts also get emergency service. More on the <a href='commercial-leasing.html'>commercial leasing page</a>.";
    if (/(buy|purchase|own|sale|sell|buying)/.test(t))
      return "Absolutely — we sell commercial-grade machines with delivery, setup, and staff training, and we handle repairs and genuine parts too. Tell us your needs on the <a href='contact.html'>contact page</a> and we'll send purchase pricing. Browse models on the <a href='machines.html'>machines page</a>.";
    if (/(commercial|business|restaurant|bar|hotel|venue|franchise|club|golf)/.test(t))
      return "Perfect — we work with Houston and Galveston bars, restaurants, country clubs, and golf courses. Most partners <b>lease</b> at $325/mo with maintenance and the 48-hour swap-out guarantee included. Tell me your business type and volume, or drop your info on the <a href='contact.html'>contact page</a> for a tailored quote.";
    if (/(price|cost|rate|how much|quote|pricing)/.test(t))
      return "Sure! Commercial <b>leases are $325/mo</b> (single or double barrel) plus a one-time $100 placement fee — maintenance and the 48-hour swap-out guarantee included, month-to-month. Purchase and short-term rental pricing on request. Full breakdown on the <a href='pricing.html'>pricing page</a>, or a custom quote on the <a href='contact.html'>contact page</a>.";
    if (/(deliver|setup|set up|install|pickup|pick up|area|houston|galveston|location|zip|service area)/.test(t))
      return "We deliver, install, and service across <b>greater Houston and Galveston</b> — including Katy, Sugar Land, The Woodlands, Tomball, Cypress, Conroe, and Spring. What city or zip are you in?";
    if (/(machine|model|tank|single|double|triple|capacity|options|frozen)/.test(t))
      return "We carry countertop, single, double, and triple-tank commercial machines — for margaritas, daiquiris, piña coladas, and mocktails. Browse specs and lease/buy pricing on the <a href='machines.html'>machines page</a>. What's your expected volume?";
    if (/(book|reserve|rent|rental|order|availability|available|date|event)/.test(t))
      return "Happy to help with an event rental! 🎉 Online booking is coming soon — for now, share your event date and headcount on the <a href='contact.html'>contact page</a> and we'll lock it in within one business day.";
    if (/(mix|flavor|recipe|alcohol|non.?alcohol|virgin|mocktail)/.test(t))
      return "Every rental can run alcoholic or non-alcoholic (virgin) mixes — margarita, strawberry daiquiri, piña colada, and more. We can include mix packs too. Want recommendations for your headcount?";
    if (/(clean|sanitiz|maintenance|service|warranty)/.test(t))
      return "We handle cleaning and sanitizing between rentals, and all commercial leases include maintenance and service. You just pour and enjoy. 😎";
    if (/(hello|hi|hey|yo|howdy)/.test(t))
      return "Hey! 👋 Ask me about commercial leasing, our 48-hour swap-out guarantee, pricing, or buying a machine — or tell me about your business and I'll point you the right way.";
    if (/(human|call|phone|talk|agent|email|contact)/.test(t))
      return "You got it — reach our team at <a href='tel:+17134180312'>(713) 418-0312</a> or <a href='mailto:hello@margaritaxpress.com'>hello@margaritaxpress.com</a>, or send details on the <a href='contact.html'>contact page</a>.";
    if (/(thank|thanks|awesome|great|cool)/.test(t))
      return "Anytime! 🍹 Anything else I can help you with — machines, pricing, or booking?";
    return "I can help with <b>machines</b>, <b>pricing</b>, <b>delivery in Houston</b>, and <b>booking</b>. Try one of those, or for anything specific reach us on the <a href='contact.html'>contact page</a> and a human will follow up fast.";
  }

  function handleSend(text) {
    var q = (text || input.value || "").trim();
    if (!q) return;
    add(q, "user");
    input.value = "";
    bot(botReply(q));
  }

  sendBtn.addEventListener("click", function () { handleSend(); });
  input.addEventListener("keydown", function (e) { if (e.key === "Enter") handleSend(); });

  panel.querySelectorAll(".chat-quick button").forEach(function (b) {
    b.addEventListener("click", function () { openChatQuick(b.textContent); });
  });
  function openChatQuick(text) { handleSend(text); }

  // Allow any element with [data-open-chat] to launch the widget.
  document.querySelectorAll("[data-open-chat]").forEach(function (el) {
    el.addEventListener("click", function (e) { e.preventDefault(); openChat(); });
  });
})();
