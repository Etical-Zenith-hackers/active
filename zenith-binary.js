/* Zenith Binary Flow: decorative background only; no page content or controls are modified. */
(() => {
  "use strict";
  if (window.__zenithBinaryFlowLoaded) return;
  window.__zenithBinaryFlowLoaded = true;
  const reduced = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const style = document.createElement("style");
  style.textContent = "body{isolation:isolate}#zenith-binary-field{position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;overflow:hidden;opacity:.62;contain:strict}@media(max-width:640px){#zenith-binary-field{opacity:.48}}";
  document.head.appendChild(style);
  const canvas = document.createElement("canvas");
  canvas.id = "zenith-binary-field";
  canvas.setAttribute("aria-hidden", "true");
  canvas.setAttribute("role", "presentation");
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d", {alpha:true});
  if (!ctx) return;
  let w=0,h=0,dpr=1,last=0,streams=[];
  const angles=[-90,90,-55,55,-35,35,145,-145,180,0],digits="010101001101011010010101101001";
  const rand=(a,b)=>Math.random()*(b-a)+a;
  function makeStream(spawnAnywhere){
    const angle=angles[Math.floor(Math.random()*angles.length)]*Math.PI/180,dx=Math.cos(angle),dy=Math.sin(angle),count=Math.floor(rand(10,25));
    const label=Math.random()<.14,text=label?"ZENITH"+Array.from({length:count-6},()=>digits[Math.floor(Math.random()*digits.length)]).join(""):Array.from({length:count},()=>digits[Math.floor(Math.random()*digits.length)]).join("");
    let x=rand(0,Math.max(w,1)),y=rand(0,Math.max(h,1));
    if(!spawnAnywhere){if(dx>.35)x=-count*18;else if(dx<-.35)x=w+count*18;if(dy>.35)y=-count*18;else if(dy<-.35)y=h+count*18;}
    return{x,y,dx,dy,angle,speed:rand(20,92),text,size:rand(12,20),spacing:rand(13,21),hue:[185,265,125,325,45,210,285][Math.floor(Math.random()*7)],alpha:rand(.35,.9),bold:Math.random()<.25,glow:rand(2,7)};
  }
  function resize(){
    dpr=Math.min(window.devicePixelRatio||1,1.35);w=window.innerWidth;h=window.innerHeight;
    canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.width=w+"px";canvas.style.height=h+"px";ctx.setTransform(dpr,0,0,dpr,0,0);
    streams=Array.from({length:w<640?42:w<1100?66:92},()=>makeStream(true));
    if(reduced){ctx.clearRect(0,0,w,h);streams.slice(0,28).forEach(s=>draw(s,.58));}
  }
  function draw(s,fade=1){
    ctx.save();ctx.font=(s.bold?"700 ":"500 ")+s.size+"px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";ctx.textAlign="center";ctx.textBaseline="middle";ctx.shadowBlur=s.glow;ctx.shadowColor="hsla("+s.hue+",100%,65%,.8)";
    for(let i=0;i<s.text.length;i++){const x=s.x-i*s.spacing*s.dx,y=s.y-i*s.spacing*s.dy,trail=1-i/Math.max(s.text.length,1);ctx.globalAlpha=s.alpha*trail*fade;ctx.fillStyle="hsl("+s.hue+",100%,"+(i===0?"78%":"62%")+")";ctx.save();ctx.translate(x,y);ctx.rotate(s.angle);ctx.fillText(s.text[i],0,0);ctx.restore();}
    ctx.restore();
  }
  function animate(now){
    if(reduced)return;if(document.visibilityState==="hidden"){last=now;requestAnimationFrame(animate);return;}
    const dt=Math.min((now-(last||now))/1000,.04);last=now;ctx.clearRect(0,0,w,h);
    streams.forEach((s,i)=>{s.x+=s.dx*s.speed*dt;s.y+=s.dy*s.speed*dt;draw(s);const m=s.text.length*s.spacing+80;if(s.x< -m||s.x>w+m||s.y< -m||s.y>h+m)streams[i]=makeStream(false);});
    requestAnimationFrame(animate);
  }
  window.addEventListener("resize",resize,{passive:true});resize();if(!reduced)requestAnimationFrame(animate);
})();