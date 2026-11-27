/* Tawk.to live chat only, for pages that do not load zenith-chat-widget.js. */
var Tawk_API = window.Tawk_API || {};
/* Tawk.to position: bottom centre on desktop and mobile. Must be set before the embed script loads. */
Tawk_API.customStyle = (function () {
  var x = Math.max(0, Math.round(document.documentElement.clientWidth / 2) - 30); /* 30 = half the 60px bubble */
  var place = { position: "bl", xOffset: x, yOffset: 20 };
  return { visibility: { desktop: place, mobile: place } };
})();
var Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script");
  var s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/6acd86f402133834cfb82045/default";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  if (s0 && s0.parentNode) {
    s0.parentNode.insertBefore(s1, s0);
  } else {
    (document.head || document.documentElement).appendChild(s1);
  }
})();
