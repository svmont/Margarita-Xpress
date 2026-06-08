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
      bot("Hey there! 🍹 I'm Frosty, the Margarita Xpress assistant. I can help with machine options, pricing, delivery in the Houston area, and booking. What can I get started for you?");
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
    if (/(price|cost|rate|how much|quote|pricing)/.test(t))
      return "Great question! Packages start around <b>$249</b> for a single-tank event rental and scale up for double/triple-tank and long-term commercial leases. Tell me your event date or business type and I'll point you to the right package — or grab a custom quote on our <a href='contact.html'>contact page</a>.";
    if (/(deliver|setup|set up|install|pickup|pick up|area|houston|location|zip)/.test(t))
      return "We deliver, set up, and pick up across the <b>greater Houston area</b> — including Katy, Sugar Land, The Woodlands, Pearland, Cypress, and Spring. Delivery is included on most packages within our core zones. What zip code are you in?";
    if (/(lease|long term|long-term|commercial|business|monthly|restaurant|bar)/.test(t))
      return "Our commercial leasing is built for bars, restaurants, venues, and franchises — flexible monthly terms, maintenance included, and swap-outs if a unit ever needs service. Want me to have our team send commercial lease details? Drop your info on the <a href='contact.html'>contact page</a>.";
    if (/(machine|model|tank|single|double|triple|capacity|options|frozen)/.test(t))
      return "We carry single, double, and triple-tank frozen drink machines — perfect for margaritas, daiquiris, piña coladas, and mocktails. Browse specs and capacity on the <a href='machines.html'>machines page</a>. How many guests are you planning for?";
    if (/(book|reserve|rent|order|buy|purchase|availability|available|date)/.test(t))
      return "Love it! 🎉 Online booking &amp; checkout is launching soon. For now I can reserve your date fast — share your event date and headcount on the <a href='contact.html'>contact page</a> and we'll lock it in within one business day.";
    if (/(mix|flavor|recipe|alcohol|non.?alcohol|virgin|mocktail)/.test(t))
      return "Every rental can run alcoholic or non-alcoholic (virgin) mixes — margarita, strawberry daiquiri, piña colada, and more. We can include mix packs too. Want recommendations for your headcount?";
    if (/(clean|sanitiz|maintenance|service|warranty)/.test(t))
      return "We handle cleaning and sanitizing between rentals, and all commercial leases include maintenance and service. You just pour and enjoy. 😎";
    if (/(hello|hi|hey|yo|howdy)/.test(t))
      return "Hey! 👋 Ask me about machines, pricing, delivery, or booking — or tell me about your event or business and I'll recommend a setup.";
    if (/(human|call|phone|talk|agent|email|contact)/.test(t))
      return "You got it — reach our team at <a href='tel:+18325550199'>(832) 555-0199</a> or <a href='mailto:hello@margaritaxpress.com'>hello@margaritaxpress.com</a>, or send details on the <a href='contact.html'>contact page</a>.";
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
