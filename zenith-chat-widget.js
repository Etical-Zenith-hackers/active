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
  const style = document.createElement("style"); style.id = "zenith-ai-chat-style"; style.textContent = css; document.head.appendChild(style);
  const launcher = document.createElement("button");
  launcher.id = "zenith-ai-launcher"; launcher.type = "button"; launcher.setAttribute("aria-haspopup","dialog"); launcher.setAttribute("aria-expanded","false");
  launcher.textContent = "✦ Chat with Zenith AI";
  const panel = document.createElement("section"); panel.id = "zenith-ai-panel"; panel.setAttribute("role","dialog"); panel.setAttribute("aria-label","Zenith AI Assistant"); panel.setAttribute("aria-modal","false");
  panel.innerHTML = '<div id="zenith-ai-head"><div><strong>Zenith AI Assistant</strong><small>Website help • Services • Next steps</small></div><button id="zenith-ai-close" type="button" aria-label="Close chat">×</button></div><div id="zenith-ai-messages" aria-live="polite"></div><div id="zenith-ai-quick"><button class="zenith-ai-chip" type="button">What services do you offer?</button><button class="zenith-ai-chip" type="button">I lost cryptocurrency</button><button class="zenith-ai-chip" type="button">How do I contact Zenith?</button></div><form id="zenith-ai-form"><textarea id="zenith-ai-input" rows="1" maxlength="1800" aria-label="Your question" placeholder="Ask us a question…"></textarea><button id="zenith-ai-send" type="submit">Send</button></form><div id="zenith-ai-foot">AI-generated information; not a guarantee of recovery. Never send passwords, seed phrases, or private keys. <a href="https://ethicalzenithhackers.xyz/#contact">Contact Zenith</a></div>';
  document.body.appendChild(panel); document.body.appendChild(launcher);
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