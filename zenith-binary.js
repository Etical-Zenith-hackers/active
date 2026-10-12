/* Zenith Intelligence — site-wide floating binary ambience */
(function(){
  if(window.__zenithBinaryLoaded) return;
  window.__zenithBinaryLoaded = true;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const style = document.createElement('style');
  style.textContent = `
    .zenith-binary-field{position:fixed!important;inset:0!important;z-index:0!important;overflow:hidden!important;pointer-events:none!important;opacity:.34;mix-blend-mode:screen}
    body>*:not(.zenith-binary-field){position:relative;z-index:1}
    .zenith-binary-column{position:absolute;top:-125%;display:flex;flex-direction:column;gap:8px;white-space:pre;font:600 12px/1.35 ui-monospace,SFMono-Regular,Consolas,monospace;letter-spacing:2px;color:var(--binary-color);text-shadow:0 0 10px var(--binary-glow);animation:zenithBinaryFloat var(--binary-speed) linear infinite;will-change:transform}
    .zenith-binary-column::selection{background:transparent}
    @keyframes zenithBinaryFloat{from{transform:translate3d(0,-8%,0)}to{transform:translate3d(var(--binary-drift),220%,0)}}
    @media(max-width:600px){.zenith-binary-field{opacity:.22}.zenith-binary-column{font-size:10px;letter-spacing:1px;gap:7px}}
    @media(prefers-reduced-motion:reduce){.zenith-binary-field{opacity:.12}.zenith-binary-column{animation:none!important;top:4%;}}
  `;
  document.head.appendChild(style);
  const layer=document.createElement('div');
  layer.className='zenith-binary-field';
  layer.setAttribute('aria-hidden','true');
  const palette=[
    ['#50eaff','rgba(80,234,255,.75)'],
    ['#a78bfa','rgba(167,139,250,.75)'],
    ['#5dffb3','rgba(93,255,179,.7)'],
    ['#ff72d2','rgba(255,114,210,.7)'],
    ['#ffd166','rgba(255,209,102,.65)'],
    ['#7aa8ff','rgba(122,168,255,.75)'],
    ['#8bffef','rgba(139,255,239,.7)']
  ];
  const count=reduce?9:(innerWidth<600?13:25);
  for(let i=0;i<count;i++){
    const col=document.createElement('span');
    col.className='zenith-binary-column';
    const color=palette[(i*5+Math.floor(Math.random()*palette.length))%palette.length];
    col.style.setProperty('--binary-color',color[0]);
    col.style.setProperty('--binary-glow',color[1]);
    col.style.setProperty('--binary-speed',(14+Math.random()*19)+'s');
    col.style.setProperty('--binary-drift',((Math.random()*90)-45)+'px');
    col.style.left=((i+.25)/count*100)+'%';
    col.style.opacity=(.35+Math.random()*.6).toFixed(2);
    col.style.animationDelay=(-Math.random()*24)+'s';
    let stream='';
    for(let j=0;j<44;j++) stream+=(Math.random()>.5?'1':'0')+(j%9===0?'  ZENITH  ':'   ');
    col.textContent=stream;
    layer.appendChild(col);
  }
  document.body.insertBefore(layer,document.body.firstChild);
})();