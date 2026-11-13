(function () {
  if (window.__zenithChatInstalled) return;
  window.__zenithChatInstalled = true;
  const SUPABASE_URL = "https://fayjsztyyfxkxtixwpci.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_MJ_wKU4WZZfXZqMrdb7qzg_QBnllSER";
  const ENDPOINT = SUPABASE_URL + "/functions/v1/zenith-site-chat";
  const css = `
    #zenith-ai-launcher{position:fixed;left:50%;transform:translateX(-50%);bottom:18px;z-index:2147483001;display:flex;align-items:center;justify-content:center;gap:9px;padding:13px 20px;border:1px solid rgba(255,255,255,.3);border-radius:999px;background:linear-gradient(110deg,#078cff,#7c3aed);color:#fff;font:800 14px/1.2 Arial,sans-serif;box-shadow:0 10px 32px rgba(0,0,0,.42),0 0 22px rgba(0,180,255,.3);cursor:pointer;white-space:nowrap}
    #zenith-ai-launcher:hover{filter:brightness(1.1);box-shadow:0 12px 35px rgba(0,0,0,.48),0 0 30px rgba(0,180,255,.4)}
    #zenith-ai-panel{position:fixed;left:50%;transform:translateX(-50%);bottom:82px;z-index:2147483002;width:min(390px,calc(100vw - 24px));height:min(540px,calc(100dvh - 112px));display:none;flex-direction:column;overflow:hidden;border:1px solid rgba(84,243,255,.45);border-radius:18px;background:#061321;color:#f4f8ff;box-shadow:0 24px 80px rgba(0,0,0,.58),0 0 35px rgba(0,145,255,.18);font:14px/1.45 Inter,Arial,sans-serif}
    #zenith-ai-panel.zenith-open{display:flex}
    #zenith-ai-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:15px 16px;background:linear-gradient(110deg,#062c48,#24164a);border-bottom:1px solid #164361}
    #zenith-ai-head strong{display:block;font-size:14px;letter-spacing:.02em}#zenith-ai-head small{display:block;color:#b4d6ed;font-size:11px;margin-top:3px}
    #zenith-ai-close{border:0;border-radius:8px;background:rgba(255,255,255,.1);color:white;font-size:22px;line-height:1;width:34px;height:34px;cursor:pointer}
    #zenith-ai-messages{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;overscroll-behavior:contain}
    .zenith-ai-msg{max-width:90%;white-space:pre-wrap;overflow-wrap:anywhere;padding:10px 12px;border-radius:13px;font-size:13px}
    .zenith-ai-msg.bot{align-self:flex-start;background:#0b2539;border:1px solid #16435f;color:#e9f5ff;border-bottom-left-radius:4px}
    .zenith-ai-msg.user{align-self:flex-end;background:linear-gradient(110deg,#087fca,#5b42c9);color:white;border-bottom-right-radius:4px}
    #zenith-ai-quick{display:flex;flex-wrap:wrap;gap:6px;padding:0 12px 10px}
    .zenith-ai-chip{border:1px solid #245878;border-radius:20px;background:#0a1c2c;color:#c8eaff;padding:7px 9px;font-size:11px;cursor:pointer}
    #zenith-ai-form{display:flex;gap:8px;padding:11px;border-top:1px solid #18394e;background:#04101b}
    #zenith-ai-input{min-width:0;flex:1;resize:none;max-height:90px;border:1px solid #24475e;border-radius:11px;background:#0a1c2b;color:white;padding:11px;font:13px/1.4 Arial,sans-serif;outline:none}
    #zenith-ai-input:focus{border-color:#20c7ff}#zenith-ai-send{border:0;border-radius:11px;background:linear-gradient(110deg,#078cff,#7c3aed);color:white;font-weight:800;padding:0 14px;cursor:pointer}
    #zenith-ai-send:disabled{opacity:.55;cursor:wait}
    #zenith-ai-foot{padding:0 12px 10px;background:#04101b;color:#8fa9bc;font-size:10px}
    #zenith-ai-foot a{color:#6bdcff;text-decoration:underline}
    .zenith-ai-typing{color:#9ec6df;font-size:12px;padding:0 3px}
    .live-chat-launcher,#zenith-live-chat-launcher{display:none!important}
    @media(max-width:600px){#zenith-ai-launcher{bottom:14px;padding:12px 17px;font-size:13px}#zenith-ai-panel{bottom:70px;height:min(570px,calc(100dvh - 90px));width:calc(100vw - 16px)}}
    @media(prefers-reduced-motion:reduce){#zenith-ai-launcher{transition:none!important}}
  `;
  const style = document.createElement("style"); style.id = "zenith-ai-chat-style"; style.textContent = css + "\n#zenith-whatsapp-float{position:fixed;left:18px;bottom:18px;z-index:2147483003;display:flex;align-items:center;gap:9px;padding:12px 16px;border:1px solid rgba(255,255,255,.38);border-radius:999px;background:linear-gradient(115deg,#087b45,#16a765);color:#fff;font:800 13px/1.2 Arial,sans-serif;text-decoration:none;box-shadow:0 10px 28px rgba(0,0,0,.4);white-space:nowrap}#zenith-whatsapp-float:hover{filter:brightness(1.12);text-decoration:none}#zenith-whatsapp-float span{font-size:18px}@media(max-width:600px){#zenith-whatsapp-float{left:10px;bottom:12px;padding:11px 13px;font-size:12px}#zenith-ai-launcher{left:auto;right:10px;transform:none;bottom:12px;padding:11px 13px;font-size:12px}#zenith-ai-panel{left:auto;right:8px;transform:none;bottom:68px;width:calc(100vw - 16px)}}"; document.head.appendChild(style);
  const launcher = document.createElement("button");
  launcher.id = "zenith-ai-launcher"; launcher.type = "button"; launcher.setAttribute("aria-haspopup","dialog"); launcher.setAttribute("aria-expanded","false");
  launcher.textContent = "✦ Chat with Zenith AI";
  const panel = document.createElement("section"); panel.id = "zenith-ai-panel"; panel.setAttribute("role","dialog"); panel.setAttribute("aria-label","Zenith AI Assistant"); panel.setAttribute("aria-modal","false");
  panel.innerHTML = '<div id="zenith-ai-head"><div><strong>Zenith AI Assistant</strong><small>Website help • Services • Next steps</small></div><button id="zenith-ai-close" type="button" aria-label="Close chat">×</button></div><div id="zenith-ai-messages" aria-live="polite"></div><div id="zenith-ai-quick"><button class="zenith-ai-chip" type="button">What services do you offer?</button><button class="zenith-ai-chip" type="button">I lost cryptocurrency</button><button class="zenith-ai-chip" type="button">How do I contact Zenith?</button></div><form id="zenith-ai-form"><textarea id="zenith-ai-input" rows="1" maxlength="1800" aria-label="Your question" placeholder="Ask us a question…"></textarea><button id="zenith-ai-send" type="submit">Send</button></form><div id="zenith-ai-foot">AI-generated information; not a guarantee of recovery. Never send passwords, seed phrases, or private keys. <a href="https://ethicalzenithhackers.xyz/#contact">Contact Zenith</a></div>';
  document.body.appendChild(panel); document.body.appendChild(launcher);
  const whatsapp=document.createElement("a");whatsapp.id="zenith-whatsapp-float";whatsapp.href="https://wa.me/447552486027?text=Hello%20Zenith%2C%20I%27d%20like%20to%20discuss%20an%20authorized%20security%20matter.";whatsapp.target="_blank";whatsapp.rel="noopener noreferrer";whatsapp.setAttribute("aria-label","Contact Zenith Hackers Intelligence on WhatsApp");whatsapp.innerHTML="<span aria-hidden=\"true\">◉</span> WhatsApp Zenith";document.body.appendChild(whatsapp);
  const messages = panel.querySelector("#zenith-ai-messages");
  const input = panel.querySelector("#zenith-ai-input");
  const form = panel.querySelector("#zenith-ai-form");
  const send = panel.querySelector("#zenith-ai-send");
  const quick = panel.querySelector("#zenith-ai-quick");
  const history = [];
  function addMessage(text, role) {
    const node = document.createElement("div"); node.className = "zenith-ai-msg " + role; node.textContent = text; messages.appendChild(node); messages.scrollTop = messages.scrollHeight; return node;
  }
  function openChat() {
    panel.classList.add("zenith-open"); launcher.setAttribute("aria-expanded","true"); launcher.textContent = "✦ Zenith AI is open"; input.focus();
    if (!messages.childElementCount) {
      addMessage("Hello! I’m Zenith’s AI website assistant. I can explain our authorized cybersecurity, digital-forensics, and asset-tracing services and help you find the right next step. What would you like to know?", "bot");
    }
  }
  function closeChat() { panel.classList.remove("zenith-open"); launcher.setAttribute("aria-expanded","false"); launcher.textContent = "✦ Chat with Zenith AI"; }
  launcher.addEventListener("click", () => panel.classList.contains("zenith-open") ? closeChat() : openChat());
  panel.querySelector("#zenith-ai-close").addEventListener("click", closeChat);
  panel.querySelectorAll(".zenith-ai-chip").forEach(button => button.addEventListener("click", () => { input.value = button.textContent; sendMessage(); }));
  async function sendMessage() {
    const message = input.value.trim(); if (!message || send.disabled) return;
    addMessage(message,"user"); history.push({role:"user",content:message}); input.value = ""; send.disabled = true; send.textContent = "…"; quick.style.display = "none";
    const typing = addMessage("Thinking…","bot"); typing.classList.add("zenith-ai-typing");
    try {
      const response = await fetch(ENDPOINT, {
        method:"POST",
        headers:{"Content-Type":"application/json","apikey":SUPABASE_PUBLISHABLE_KEY,"Authorization":"Bearer "+SUPABASE_PUBLISHABLE_KEY},
        body:JSON.stringify({message,history:history.slice(-8)})
      });
      const data = await response.json().catch(() => ({}));
      typing.remove();
      if (!response.ok) throw new Error(data.error || "The assistant is temporarily unavailable.");
      const answer = String(data.answer || "I don't have a reply yet. Please contact the Zenith team directly.");
      addMessage(answer,"bot"); history.push({role:"assistant",content:answer});
    } catch (error) {
      typing.remove(); addMessage((error && error.message) || "I couldn't connect just now. Please email support@zenithhackers.com.","bot");
      const contact = document.createElement("div"); contact.className = "zenith-ai-msg bot"; contact.innerHTML = 'You can contact <a href="mailto:support@zenithhackers.com" style="color:#6bdcff">support@zenithhackers.com</a> or <a href="mailto:zenithintel@consultant.com" style="color:#6bdcff">zenithintel@consultant.com</a>.'; messages.appendChild(contact); messages.scrollTop = messages.scrollHeight;
    } finally { send.disabled = false; send.textContent = "Send"; input.focus(); }
  }
  form.addEventListener("submit", event => { event.preventDefault(); sendMessage(); });
  input.addEventListener("keydown", event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } });
})();

/* Floating TOP 10 asset tracing menu; excluded from Asset Recovery. */
(() => {
  "use strict";
  if (location.pathname.toLowerCase().endsWith("/asset-recovery.html")) return;
  if (window.__zenithTop10AssetsLoaded) return;
  window.__zenithTop10AssetsLoaded = true;
  const items = [
    ["₿","Cryptocurrency","Blockchain transactions, wallet addresses, transaction hashes, exchange/service endpoints.","cryptocurrency-asset-tracing-blockchain-analysis.html"],
    ["📱","Mobile phones","IMEI/serial number, Find My/Find My Device, carrier records, account activity.","mobile-phone-asset-tracing-imei-accounts.html"],
    ["🚗","Vehicles","Registration/VIN, GPS/telematics, number plate, recovery databases.","vehicle-asset-tracing-vin-registration-gps.html"],
    ["💻","Laptops & computers","Serial number, device-management systems, account activity, tracking software.","laptop-computer-asset-tracing.html"],
    ["📦","Packages & shipments","Tracking numbers, carrier records, delivery scans, proof of delivery.","package-shipment-tracing-tracking-number.html"],
    ["🚲","Bicycles & e-bikes","Serial numbers, registration databases, GPS/Bluetooth trackers, identifying marks.","bicycle-ebike-asset-tracing.html"],
    ["🎧","Electronics","Serial numbers, IMEI/device identifiers, registered accounts and ownership records.","electronics-asset-tracing-serial-numbers.html"],
    ["🛠️","Tools & business equipment","Serial numbers, asset registers, GPS/Bluetooth tags, ownership markings.","tools-business-equipment-asset-tracing.html"],
    ["🏗️","Machinery & commercial equipment","VIN/serial numbers, telematics, asset-management records and ownership documentation.","machinery-commercial-equipment-asset-tracing.html"],
    ["💳","Digital/financial assets","Transaction records, payment references, bank/exchange records and blockchain analysis where applicable.","digital-financial-asset-tracing.html"]
  ];
  const prefix = location.pathname.toLowerCase().includes("/articles/") ? "" : "articles/";
  const style = document.createElement("style");
  style.id = "zenith-top10-assets-style";
  style.textContent = [
    "#zenith-top10-root{position:fixed;top:84px;right:18px;z-index:2147483000;font-family:Inter,Arial,sans-serif;color:#f4f8ff}",
    "#zenith-top10-toggle{display:flex;align-items:center;gap:8px;border:1px solid rgba(91,216,255,.65);border-radius:999px;padding:11px 16px;background:linear-gradient(115deg,#062c48,#153d64 55%,#31205f);color:#fff;font-weight:850;font-size:13px;letter-spacing:.08em;box-shadow:0 8px 26px rgba(0,0,0,.4),0 0 18px rgba(0,170,255,.25);cursor:pointer}",
    "#zenith-top10-toggle:hover{filter:brightness(1.15)}",
    "#zenith-top10-panel{display:block;position:absolute;right:0;top:48px;width:min(430px,calc(100vw - 28px));height:min(76vh,720px);overflow:hidden;border:1px solid rgba(91,216,255,.42);border-radius:16px;background:rgba(3,13,26,.97);box-shadow:0 22px 65px rgba(0,0,0,.62),0 0 25px rgba(0,150,255,.15);backdrop-filter:blur(18px)}",
    "#zenith-top10-panel.zenith-minimized{display:none}",
    "#zenith-top10-head{position:absolute;left:0;right:0;bottom:0;z-index:2;padding:15px 16px 12px;background:rgba(4,24,43,.99);border-top:1px solid rgba(91,216,255,.22);pointer-events:none}",
    "#zenith-top10-head strong{display:block;font-size:15px;letter-spacing:.06em}",
    "#zenith-top10-head small{display:block;margin-top:4px;color:#a9c7db;font-size:11px;line-height:1.45}",
    "#zenith-top10-list{position:absolute;inset:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:#6e8799 #071321;list-style:none;margin:0;padding:0 8px 100px;display:grid;align-content:start;gap:5px}",
    "#zenith-top10-list li{margin:0;padding:0;border:0;background:transparent}",
    "#zenith-top10-list a{display:grid;grid-template-columns:27px 1fr;gap:9px;padding:12px 9px;border-radius:10px;color:#f2f8ff;text-decoration:none}",
    "#zenith-top10-list a:hover{background:rgba(20,133,190,.2)}",
    "#zenith-top10-list .zenith-number{color:#69dcff;font-size:12px;font-weight:900;padding-top:2px}",
    "#zenith-top10-list b{display:block;font-size:13px;line-height:1.35}",
    "#zenith-top10-list em{display:block;margin-top:4px;color:#b8cbd9;font-size:11px;line-height:1.45;font-style:normal}",
    "#zenith-top10-note{padding:10px 16px 14px;color:#9fb7c9;font-size:10px;line-height:1.5;border-top:1px solid rgba(91,216,255,.18)}",
    "@media(max-width:600px){#zenith-top10-root{top:76px;right:9px}#zenith-top10-toggle{padding:10px 13px;font-size:12px}#zenith-top10-panel{top:45px;width:min(390px,calc(100vw - 18px));height:min(70vh,650px)}}"
  ].join("");
  document.head.appendChild(style);
  const root = document.createElement("div");
  root.id = "zenith-top10-root";
  root.innerHTML = '<button id="zenith-top10-toggle" type="button" aria-expanded="true" aria-controls="zenith-top10-panel">☰ TOP 10 <span aria-hidden="true">▴</span></button><section id="zenith-top10-panel" aria-label="Top 10 common asset tracing methods"><ol id="zenith-top10-list"></ol><div id="zenith-top10-head"><strong>TOP 10 · COMMON TRACING METHODS</strong><small>Investigative avenues, not promises of recovery.</small></div></section>';
  document.body.appendChild(root);
  const list = root.querySelector("#zenith-top10-list");
  items.forEach((item, i) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = prefix + item[3];
    a.innerHTML = '<span class="zenith-number">' + String(i + 1).padStart(2, "0") + '</span><span><b>' + item[0] + ' ' + item[1] + '</b><em>' + item[2] + '</em></span>';
    li.appendChild(a); list.appendChild(li);
  });
  const toggle = root.querySelector("#zenith-top10-toggle");
  const panel = root.querySelector("#zenith-top10-panel");
  let minimized = false;
  toggle.addEventListener("click", () => {
    minimized = !minimized;
    panel.classList.toggle("zenith-minimized", minimized);
    toggle.setAttribute("aria-expanded", String(!minimized));
    toggle.lastElementChild.textContent = minimized ? "▾" : "▴";
  });
  let direction = 1;
  let previous = 0;
  let pauseUntil = 0;
  let paused = false;
  list.addEventListener("mouseenter", () => { paused = true; });
  list.addEventListener("mouseleave", () => { paused = false; previous = 0; });
  function animate(timestamp) {
    if (previous && !paused && !minimized && timestamp >= pauseUntil) {
      const delta = Math.min(timestamp - previous, 50);
      const max = list.scrollHeight - list.clientHeight;
      if (max > 0) {
        list.scrollTop += direction * delta * 0.018;
        if (list.scrollTop >= max - 1) { list.scrollTop = max; direction = -1; pauseUntil = timestamp + 1300; }
        else if (list.scrollTop <= 0) { list.scrollTop = 0; direction = 1; pauseUntil = timestamp + 1300; }
      }
    }
    previous = timestamp;
    window.requestAnimationFrame(animate);
  }
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) window.requestAnimationFrame(animate);
})();

/* Shared article background and floating WhatsApp contact control. */
(() => {
  if (window.__zenithGlobalContactInstalled) return;
  window.__zenithGlobalContactInstalled = true;
  const inArticles = location.pathname.toLowerCase().includes("/articles/");
  const cover = (inArticles ? "../" : "") + "Zenithhackers%20covers/Cryptocurrency.png";
  const style = document.createElement("style");
  style.id = "zenith-global-contact-style";
  style.textContent = `
    html,body{background-color:#020811!important;background-image:linear-gradient(rgba(2,8,17,.44),rgba(2,8,17,.66)),url("${cover}")!important;background-position:center center!important;background-size:cover!important;background-attachment:fixed!important;background-repeat:no-repeat!important}
    #zenith-whatsapp-float{position:fixed!important;left:18px!important;bottom:18px!important;z-index:2147483003!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:9px!important;min-height:50px!important;padding:0 17px!important;border:1px solid rgba(255,255,255,.75)!important;border-radius:999px!important;background:linear-gradient(135deg,#20e879,#0ca84d)!important;color:#032010!important;font:800 13px/1 Arial,sans-serif!important;text-decoration:none!important;box-shadow:0 10px 28px rgba(0,0,0,.35),0 0 18px rgba(25,213,109,.22)!important;white-space:nowrap!important}
    #zenith-whatsapp-float:hover{transform:translateY(-3px);filter:brightness(1.06)}
    #zenith-whatsapp-float span{font-size:19px;line-height:1}
    @media(max-width:600px){#zenith-whatsapp-float{left:10px!important;bottom:12px!important;min-height:44px!important;padding:0 12px!important;font-size:12px!important}}
  `;
  document.head.appendChild(style);
  const existing = document.querySelector('a[href*="wa.me"]');
  if (existing) { existing.id = existing.id || "zenith-whatsapp-float"; return; }
  const whatsapp = document.createElement("a");
  whatsapp.id = "zenith-whatsapp-float";
  whatsapp.href = "https://wa.me/447552486027?text=Hello%20Zenith%20Hackers%20Intelligence%2C%20I%27d%20like%20to%20discuss%20an%20authorized%20assessment.";
  whatsapp.target = "_blank";
  whatsapp.rel = "noopener noreferrer";
  whatsapp.setAttribute("aria-label","Contact Zenith Hackers Intelligence on WhatsApp");
  whatsapp.innerHTML = '<span aria-hidden="true">☏</span><strong>WhatsApp</strong>';
  document.body.appendChild(whatsapp);
})();
