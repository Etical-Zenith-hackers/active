var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
/* Bottom centre on desktop and mobile. Must be set before the embed script loads. */
Tawk_API.customStyle=(function(){
var x=Math.max(0,Math.round(document.documentElement.clientWidth/2)-30); /* 30 = half the 60px bubble */
var place={position:'bl',xOffset:x,yOffset:20};
return {visibility:{desktop:place,mobile:place}};
})();

/* When a visitor receives an agent reply or an automated Tawk.to message,
   collapse the Top 10 Assets panel and bring Customer Support forward. */
function zenithHandleIncomingTawkMessage() {
  window.dispatchEvent(new CustomEvent("zenith:incoming-tawk-message"));
  if (typeof Tawk_API.maximize === "function") {
    Tawk_API.maximize();
  }
}
Tawk_API.onChatMessageAgent = zenithHandleIncomingTawkMessage;
Tawk_API.onChatMessageSystem = zenithHandleIncomingTawkMessage;
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6b09f3e960997f3cf8ea7a2b/1k8fe1il0';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
