/* Original Tawk.to live chat: floating bottom-centre on every page using this shared script. */
(() => {
  "use strict";
  if (window.__zenithOriginalTawkLoaded) return;
  window.__zenithOriginalTawkLoaded = true;

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = window.Tawk_LoadStart || new Date();

  // Tawk.to offers left/right anchors; offset the bottom-left anchor to centre
  // the original launcher in the current viewport on desktop and mobile.
  const launcherWidth = 60;
  const centreOffset = Math.max(0, Math.round((window.innerWidth - launcherWidth) / 2));
  window.Tawk_API.customStyle = {
    visibility: {
      desktop: { position: "bl", xOffset: centreOffset, yOffset: 16 },
      mobile: { position: "bl", xOffset: centreOffset, yOffset: 12 }
    }
  };
  window.Tawk_API.onLoad = function () {
    if (window.Tawk_API && typeof window.Tawk_API.showWidget === "function") {
      window.Tawk_API.showWidget();
    }
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://embed.tawk.to/6acd86f402133834cfb82045/default";
  script.charset = "UTF-8";
  script.setAttribute("crossorigin", "*");
  document.head.appendChild(script);
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
