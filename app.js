const LAUTE = [
  {l:"M",v:0,s:"mmmmmmmmmm",w:"Maus",e:"🐭"},{l:"A",v:1,s:"aaaaaaah",w:"Affe",e:"🐒"},
  {l:"L",v:0,s:"llllllllll",w:"Löwe",e:"🦁"},{l:"O",v:1,s:"oooooooh",w:"Ohr",e:"👂"},
  {l:"S",v:0,s:"ssssssssss",w:"Sonne",e:"☀️"},{l:"I",v:1,s:"iiiiiiih",w:"Igel",e:"🦔"},
  {l:"R",v:0,s:"rrrrrrrrrr",w:"Rakete",e:"🚀"},{l:"E",v:1,s:"eeeeeeeh",w:"Ente",e:"🦆"},
  {l:"N",v:0,s:"nnnnnnnnnn",w:"Nase",e:"👃"},{l:"U",v:1,s:"uuuuuuuh",w:"Ufo",e:"🛸"},
  {l:"F",v:0,s:"ffffffffff",w:"Fisch",e:"🐟"},{l:"W",v:0,s:"wwwwwwwwww",w:"Wal",e:"🐳"},
  {l:"H",v:0,s:"hhhhhh",w:"Hase",e:"🐰"},
  {l:"T",v:0,stop:1,s:"t",w:"Tomate",e:"🍅"},{l:"P",v:0,stop:1,s:"p",w:"Pilz",e:"🍄"},
  {l:"K",v:0,stop:1,s:"k",w:"Kiwi",e:"🥝"},{l:"D",v:0,stop:1,s:"d",w:"Dose",e:"🥫"},
  {l:"B",v:0,stop:1,s:"b",w:"Banane",e:"🍌"},
  {l:"AU",v:1,dip:1,s:"aauu",w:"Auto",e:"🚗"},{l:"EI",v:1,dip:1,s:"eeii",w:"Ei",e:"🥚"},
  {l:"EU",v:1,dip:1,s:"eeuu",w:"Eule",e:"🦉"}
];
const WOERTER = [
  ["MA-MA","👩"],["O-MA","👵"],["LA-MA","🦙"],["NA-SE","👃"],["RO-SE","🌹"],
  ["SO-FA","🛋️"],["E-SEL","🫏"],["ME-LO-NE","🍈"],["LI-MO","🥤"],["U-FO","🛸"],
  ["MO-FA","🛵"],["ROL-LER","🛴"],["RA-SEN","🌱"],["NUSS","🌰"],["WAL","🐳"],
  ["WAS-SER","💧"],["AM-SEL","🐦"],["SOS-SE","🥫"],["ES-SEN","🍽️"],
  ["HA-SE","🐰"],["HO-SE","👖"],["TO-MA-TE","🍅"],["PA-PA","👨"],["KI-WI","🥝"],
  ["DO-SE","🥫"],["BA-NA-NE","🍌"],["NA-DEL","🪡"],["TAS-SE","☕"],["KOF-FER","🧳"],
  ["BUS","🚌"],["HUT","🎩"],["KEKS","🍪"],["TROM-PE-TE","🎺"],
  ["AU-TO","🚗"],["MAUS","🐭"],["BAUM","🌳"],["HAUS","🏠"],
  ["EI","🥚"],["EI-MER","🪣"],["LEI-TER","🪜"],["EU-LE","🦉"],["FEU-ER","🔥"]
];
const DIPS=["AU","EI","EU"];
function tokens(w){const out=[];for(let i=0;i<w.length;){const two=w.slice(i,i+2);if(DIPS.includes(two)){out.push(two);i+=2;}else{out.push(w[i]);i++;}}return out;}

const st={view:"brett",learned:new Set("MALOSIRENUFW".split("")),case:"mixed",rate:0.65,wi:-1,sel:1,
  rows:[{c:"M",v:"E",x:1},{c:"L",v:"A",x:0},{c:"W",v:"I",x:0},{c:"S",v:"O",x:0},{c:"F",v:"U",x:0}]};
try{const s=JSON.parse(localStorage.getItem("lautbrett")||"null");if(s){st.learned=new Set(s.learned);st.case=s.case;st.rate=Math.min(s.rate,0.95);if(s.rate===0.75)st.rate=0.65;if(s.rate===0.55)st.rate=0.45;}}catch(e){}
const save=()=>{try{localStorage.setItem("lautbrett",JSON.stringify({learned:[...st.learned],case:st.case,rate:st.rate}))}catch(e){}};
const $=id=>document.getElementById(id);
const lautOf=l=>LAUTE.find(x=>x.l===l);
const reduce=()=>matchMedia("(prefers-reduced-motion:reduce)").matches;

function cs(t,first=true){if(st.case==="lower")return t.toLowerCase();if(st.case==="mixed")return first?t[0]+t.slice(1).toLowerCase():t.toLowerCase();return t.toUpperCase();}
function consTxt(l){return st.case==="lower"?l.toLowerCase():l;}
function vowTxt(l){return st.case==="upper"?l:l.toLowerCase();}
function sylTxt(r){return consTxt(r.c)+vowTxt(r.v);}
function toast(m){const t=$("toast");t.textContent=m;t.hidden=false;clearTimeout(toast.h);toast.h=setTimeout(()=>t.hidden=true,2600);}

let voice=null;
function pickVoice(){const vs=speechSynthesis.getVoices();voice=vs.find(v=>/de-CH/i.test(v.lang))||vs.find(v=>/^de/i.test(v.lang))||null;}
if("speechSynthesis" in window){pickVoice();speechSynthesis.onvoiceschanged=pickVoice;}
const SLOW=0.55;
function lautSpeak(text,onend){speak(text,Math.max(0.3,st.rate*SLOW),onend);}
function speak(text,rate,onend){
  if(!("speechSynthesis" in window)){toast("Ton geht hier nicht. Laut selber lauten!");return;}
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text.toLowerCase());u.lang=voice?voice.lang:"de-DE";if(voice)u.voice=voice;u.rate=rate||st.rate;if(onend)u.onend=onend;speechSynthesis.speak(u);}catch(e){toast("Ton geht hier nicht.");}
}

/* Tabs */
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>show(b.dataset.view));
function show(v){st.view=v;document.querySelectorAll("nav button").forEach(b=>b.setAttribute("aria-selected",b.dataset.view===v));
  ["laute","brett","woerter"].forEach(x=>$("v-"+x).hidden=x!==v);if(v==="woerter"&&st.wi<0)nextWord();if(v==="brett")placeAll();}

/* Laute */
function dispLaut(l){const lo=l.toLowerCase(),cap=l[0]+lo.slice(1);if(st.case==="lower")return lo;if(st.case==="mixed")return l.length>1?cap+" "+lo:cap+lo;return l;}
function renderLaute(){$("lautGrid").innerHTML="";LAUTE.forEach(x=>{const b=document.createElement("button");b.className="laut";
  b.innerHTML=`<b class="${x.v?"v":"k"}">${dispLaut(x.l)}</b><span>${x.e}</span><small>${x.w}${x.stop?" · kurz":""}</small>`;
  b.onclick=()=>{document.querySelectorAll(".laut").forEach(e=>e.classList.remove("on"));b.classList.add("on");lautSpeak(x.s,()=>setTimeout(()=>speak(x.w),400));};
  $("lautGrid").appendChild(b);});}

/* Brett */
const rowEls=[];
function renderBoard(){const B=$("board");B.innerHTML="";rowEls.length=0;
  st.rows.forEach((r,i)=>{
    const row=document.createElement("div");row.className="row";
    const tr=document.createElement("div");tr.className="track";
    const k=document.createElement("button");k.className="tile k";k.textContent=consTxt(r.c);
    k.setAttribute("aria-label",`Konsonant ${r.c}, zum ${r.v} schieben`);
    const v=document.createElement("button");v.className="tile v"+(r.v.length>1?" wide":"");v.textContent=vowTxt(r.v);
    v.setAttribute("aria-label",`Vokal ${r.v}`);
    const arc=document.createElement("div");arc.className="arc";
    tr.appendChild(k);row.append(tr,v,arc);B.appendChild(row);
    rowEls.push({row,tr,k,v,arc});
    v.onclick=()=>{select(i);lautSpeak(lautOf(r.v).s);};
    bindDrag(i);
  });
  select(st.sel);placeAll();}
function maxX(i){const e=rowEls[i];return Math.max(0,e.tr.clientWidth-e.k.offsetWidth-8);}
function place(i){const e=rowEls[i],r=st.rows[i];if(!e)return;const px=r.x*maxX(i);
  e.k.style.transform=`translateX(${px}px)`;
  const joined=r.x>=0.999;e.row.classList.toggle("joined",joined);
  e.arc.style.width=(e.k.offsetWidth+e.v.offsetWidth+14)+"px";}
function placeAll(){st.rows.forEach((_,i)=>place(i));}
function select(i){st.sel=i;rowEls.forEach((e,j)=>e.row.classList.toggle("sel",j===i));}
function joinDone(i){const r=st.rows[i],c=lautOf(r.c),v=lautOf(r.v);
  const cShow=c.stop?c.s:c.s.slice(0,4),vShow=v.dip?v.s:v.s.slice(0,3);
  $("result").innerHTML=`<span class="k">${cShow}</span>${c.stop?"!":"–"}<span class="v">${vShow}</span> → <strong><span class="k">${consTxt(r.c)}</span><span class="v">${vowTxt(r.v)}</span></strong>`;
  if(c.stop)speak(sylTxt(r),st.rate*0.7);
  else lautSpeak(c.s.slice(0,6)+v.s.replace("h",""));}
function setX(i,x){const r=st.rows[i],was=r.x>=0.999;r.x=Math.min(1,Math.max(0,x));place(i);
  if(!was&&r.x>=0.999)joinDone(i);}
function animateTo(i,target,dur=600){const r=st.rows[i],from=r.x;if(reduce()){setX(i,target);return;}
  const t0=performance.now();(function step(t){const p=Math.min(1,(t-t0)/dur),e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
    setX(i,from+(target-from)*e);if(p<1)requestAnimationFrame(step);})(t0);}
function hum(i,still){const c=lautOf(st.rows[i].c);if(c.stop)return;
  lautSpeak(c.s);}
function bindDrag(i){const e=rowEls[i];let startPX=0,startX=0,moved=false,id=null,spoke=false;
  e.k.addEventListener("pointerdown",ev=>{ev.preventDefault();e.k.focus({preventScroll:true});select(i);id=ev.pointerId;e.k.setPointerCapture(id);startPX=ev.clientX;startX=st.rows[i].x;moved=false;spoke=false;e.k.classList.add("drag");});
  e.k.addEventListener("pointermove",ev=>{if(ev.pointerId!==id)return;const dx=ev.clientX-startPX;
    if(!moved&&Math.abs(dx)>5){moved=true;}
    if(moved){const m=maxX(i)||1;let x=startX+dx/m;if(x>0.94)x=1;setX(i,x);}});
  const end=ev=>{if(ev.pointerId!==id)return;id=null;e.k.classList.remove("drag");
    if(!moved){lautSpeak(lautOf(st.rows[i].c).s);return;}
    const r=st.rows[i];if(r.x>0.8&&r.x<1)animateTo(i,1,180);};
  e.k.addEventListener("pointerup",end);e.k.addEventListener("pointercancel",end);
  e.k.addEventListener("keydown",ev=>{const r=st.rows[i];
    if(ev.key==="ArrowRight"){ev.preventDefault();setX(i,r.x+0.2);}
    else if(ev.key==="ArrowLeft"){ev.preventDefault();setX(i,r.x-0.2);}
    else if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();select(i);animateTo(i,r.x>=1?0:1,900);}});
}
addEventListener("resize",placeAll);

function learnedOf(isV){const l=LAUTE.filter(x=>!!x.v===isV&&st.learned.has(x.l));return l.length?l:LAUTE.filter(x=>!!x.v===isV);}
function renderTray(){[["trayK",false],["trayV",true]].forEach(([id,isV])=>{const el=$(id);el.innerHTML="";
  learnedOf(isV).forEach(x=>{const b=document.createElement("button");b.className="tile "+(isV?"v":"k")+(x.l.length>1?" wide":"");
    b.textContent=isV?vowTxt(x.l):consTxt(x.l);b.setAttribute("aria-label",(isV?"Vokal ":"Konsonant ")+x.l+" in die markierte Zeile legen");
    b.onclick=()=>{const r=st.rows[st.sel];if(isV)r.v=x.l;else r.c=x.l;r.x=0;const s=st.sel;renderBoard();select(s);lautSpeak(x.s);$("result").innerHTML="";};
    el.appendChild(b);});});}
$("resetBtn").onclick=()=>{st.rows.forEach((r,i)=>animateTo(i,0,400));$("result").innerHTML="";};
$("mixBtn").onclick=()=>{const ks=learnedOf(false),vs=learnedOf(true).filter(x=>!x.dip);const vv=(vs.length?vs:learnedOf(true)).map(x=>x.l).sort(()=>Math.random()-.5);
  st.rows.forEach((r,i)=>{r.c=ks[Math.floor(Math.random()*ks.length)].l;r.v=vv[i%vv.length];r.x=0;});renderBoard();$("result").innerHTML="";};
$("sameBtn").onclick=()=>{const c=st.rows[st.sel].c;st.rows.forEach(r=>{r.c=c;r.x=0;});renderBoard();$("result").innerHTML=`Alle Zeilen mit <span class="k">${consTxt(c)}</span>. Schiebe eins nach dem anderen.`;};

/* Wörter */
function pool(){return WOERTER.map((w,i)=>({w,i})).filter(({w})=>tokens(w[0].replace(/-/g,"")).every(ch=>st.learned.has(ch)));}
function nextWord(){const p=pool();if(!p.length){$("word").innerHTML="";$("pic").textContent="";$("count").textContent="Mit diesen Lauten gibt es noch keine Wörter. Wähle in den Einstellungen mehr Laute.";return;}
  let n;do{n=p[Math.floor(Math.random()*p.length)].i}while(p.length>1&&n===st.wi);st.wi=n;renderWord();}
function renderWord(){const [w,e]=WOERTER[st.wi],parts=w.split("-");$("word").innerHTML="";
  parts.forEach((s,i)=>{const b=document.createElement("button");b.className="syl";b.textContent=cs(s,i===0);b.onclick=()=>speak(s);$("word").appendChild(b);});
  $("pic").innerHTML="";const r=document.createElement("button");r.textContent="Gelesen? Bild zeigen";r.onclick=()=>{$("pic").textContent=e;speak(w.replace(/-/g,""));};$("pic").appendChild(r);
  $("count").textContent=pool().length+" Wörter passen zu den gelernten Lauten";}
$("readWordBtn").onclick=()=>{if(st.wi>=0)speak(WOERTER[st.wi][0].replace(/-/g,""));};
$("nextWordBtn").onclick=nextWord;

/* Einstellungen */
function renderLearn(){$("learnChips").innerHTML="";
  LAUTE.forEach(x=>{const b=document.createElement("button");b.className="chip "+(x.v?"v":"k");b.textContent=x.l;b.setAttribute("aria-pressed",st.learned.has(x.l));
    b.onclick=()=>{st.learned.has(x.l)?st.learned.delete(x.l):st.learned.add(x.l);save();renderLearn();renderTray();if(st.view==="woerter")nextWord();else st.wi=-1;};$("learnChips").appendChild(b);});}
document.querySelectorAll("#caseSeg button").forEach(b=>b.onclick=()=>{st.case=b.dataset.c;save();renderAll();});
document.querySelectorAll("#rateSeg button").forEach(b=>b.onclick=()=>{st.rate=+b.dataset.r;save();renderSeg();speak("ma");});
function renderSeg(){document.querySelectorAll("#caseSeg button").forEach(x=>x.setAttribute("aria-pressed",x.dataset.c===st.case));
  document.querySelectorAll("#rateSeg button").forEach(x=>x.setAttribute("aria-pressed",+x.dataset.r===st.rate));}

function renderAll(){renderSeg();renderLaute();renderBoard();renderTray();renderLearn();if(st.wi>=0)renderWord();}
renderAll();
if(document.fonts)document.fonts.ready.then(placeAll);
