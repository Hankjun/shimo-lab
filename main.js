const base='https://shimo-lab-five.zaqprmhm56595.chatgpt.site/';
const studios=[
 {id:'print',name:'活字印刷',type:'印刷工坊',description:'从接单、校样到印前核对，把规格和定稿整理成一张可交接的生产单。',paper:'#ead9bd',ink:'#503529',mark:'#a64435'},
 {id:'garden',name:'苏州园林',type:'园林空间',description:'沿门楼、曲廊、庭院和藏书阁，走完项目周报的取材、共审与归档。',paper:'#e2e9d9',ink:'#3d5c4f',mark:'#8b5d45'},
 {id:'periodic',name:'元素周期',type:'元素实验台',description:'从第 14 族元素出发，查找石墨组件和 AI 技能，组合适合任务的能力。',paper:'#dbe8e7',ink:'#294953',mark:'#277369'},
 {id:'consult',name:'咨询画布',type:'咨询白板',description:'移动和连接问题、证据、假设与行动卡片，把讨论变成可以验证的方案。',paper:'#e5e5ed',ink:'#434859',mark:'#77619a'},
 {id:'reading',name:'精读手帐',type:'手帐星图',description:'沿主题星团浏览相连的手帐，打开单篇阅读记录，用康奈尔双栏整理线索。',paper:'#dfe0eb',ink:'#303750',mark:'#84678f'}
];
const $=id=>document.getElementById(id);
const stage=$('stage'),cards=$('cards'),tools=$('galleryTools');
const spacePoints=[[.37,.34],[.62,.25],[.85,.36],[.46,.69],[.73,.68]];
const narrow=matchMedia("(max-width:620px)");
const modes=['deck','wheel','space','flat'];
let mode='deck',selected=0,spread=0,tilt=true;
try{const prior=localStorage.getItem('shimo-home-view');if(modes.includes(prior))mode=prior}catch{}
function art(canvas,item){
 const c=canvas.getContext('2d');
 const line=(points,color=item.ink,width=2)=>{
  c.strokeStyle=color;c.lineWidth=width;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();
 };
 const box=(x,y,w,h,fill)=>{c.fillStyle=fill;c.fillRect(x,y,w,h)};
 const poly=(points,fill)=>{c.fillStyle=fill;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill()};
 const dot=(x,y,r,color)=>{c.fillStyle=color;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill()};
 box(0,0,240,180,item.paper);
 if(item.id==='print'){
  for(let y=0;y<180;y+=7)line([[0,y],[240,y]],'#84664f20',1);
  c.save();c.translate(117,90);c.rotate(-.105);
  box(-87,-61,174,124,'#9d7652');box(-82,-57,164,116,'#563b2f');
  const tiles=['活','字','印','刷','排','校'];
  tiles.forEach((label,i)=>{const x=-73+i%3*49,y=-47+Math.floor(i/3)*49;box(x,y,43,42,'#c8a479');box(x,y+38,43,4,'#99734f');c.fillStyle='#35251e';c.font='700 24px Songti SC,serif';c.fillText(label,x+9,y+29)});
  box(33,27,48,37,'#efe0c7');box(57,34,14,14,item.mark);c.restore();
 }else if(item.id==='garden'){
  poly([[27,105],[103,47],[215,89],[138,151]],'#a5b69a');
  poly([[71,105],[125,68],[175,86],[124,126]],'#79a49c');
  line([[37,106],[107,57],[203,92],[139,144],[78,120]],'#eee5cf',6);
  for(const [x,y,w] of [[40,88,35],[151,82,49],[108,126,38]]){
   poly([[x,y],[x+w,y+10],[x+w,y+28],[x,y+18]],'#eee6d5');
   poly([[x-7,y+2],[x+7,y-15],[x+w+3,y-5],[x+w+7,y+12]],'#3e534f');
   line([[x+6,y+6],[x+6,y+18]],'#896751',2);
  }
  [[88,72],[190,113],[55,115],[129,56],[154,131]].forEach(([x,y])=>{line([[x,y],[x,y-11]],'#6f644f',2);dot(x,y-9,8,'#627d5d');dot(x+4,y-12,5,'#779775')});
 }else if(item.id==='periodic'){
  for(let r=0;r<5;r++)for(let n=0;n<8;n++){
   const x=23+n*25,y=25+r*25;
   box(x,y,21,21,n===4?item.mark:'#b9d0cf');
   if(n===4){c.font='700 10px monospace';c.fillStyle='#fff';c.fillText(['C','Si','Ge','Sn','Pb'][r],x+4,y+14)}
   else{box(x+5,y+6,5,2,'#628682');box(x+5,y+11,11,2,'#88a5a2')}
  }
 }else if(item.id==='consult'){
  for(let x=9;x<240;x+=11)for(let y=9;y<180;y+=11)dot(x,y,.75,'#aaa6b9');
  const nodes=[[19,42],[89,31],[159,45],[56,108],[131,111]];
  c.setLineDash([4,3]);line(nodes.map(([x,y])=>[x+27,y+20]),item.mark);c.setLineDash([]);
  nodes.forEach(([x,y],i)=>{box(x,y,60,41,'#f7f4f1');box(x,y,60,6,i===2?'#af8d5c':'#8a78a0');box(x+8,y+14,38,2,'#797285');box(x+8,y+22,27,2,'#a09aab')});
 }else{
  box(0,0,240,180,'#253047');
  const hubs=[[53,74],[111,54],[177,83],[116,124]];
  line([...hubs,hubs[0]],'#7d84a6',1);
  hubs.forEach(([x,y],g)=>{
   const colors=['#e8af93','#a5bcf0','#a6d8c7','#d5aee9'];
   dot(x,y,4,colors[g]);
   for(let i=0;i<28;i++){
    const a=i*2.399963,r=4+Math.sqrt(i)*5.3, u=x+Math.cos(a)*r,v=y+Math.sin(a)*r*.8;
    if(i%3===0)line([[x,y],[u,v]],colors[g]+'45',.65);
    dot(u,v,i%9===0?2:1,colors[g]);
   }
  });
 }
}
function toneCard(canvas,item){
 if(item.id==='reading')return;
 const ctx=canvas.getContext('2d');
 const raster=ctx.getImageData(0,0,canvas.width,canvas.height), bytes=raster.data;
 for(let i=0;i<bytes.length;i+=4){
  const luminance=.2126*bytes[i]+.7152*bytes[i+1]+.0722*bytes[i+2];
  const shade=Math.max(0,220-luminance);
  bytes[i]=17+shade*.72;bytes[i+1]=21+shade*.77;bytes[i+2]=18+shade*.48;
 }
 ctx.putImageData(raster,0,0);
}
const index=$('studioIndex');
for(const [i,item] of studios.entries()){
 const card=document.createElement('button');
 card.className='studio-card';card.type='button';card.dataset.studio=i;
 card.setAttribute('aria-label',item.name);
 const meta=document.createElement('span');meta.className='card-meta';meta.innerHTML='<span>STUDIO / 0'+(i+1)+'</span><span>'+item.type+'</span>';meta.setAttribute('aria-hidden','true');
 const heading=document.createElement('span');heading.className='card-title';heading.innerHTML='<b>✦</b>'+item.name;heading.setAttribute('aria-hidden','true');
 const picture=document.createElement('canvas');picture.width=240;picture.height=180;picture.setAttribute('aria-hidden','true');
 const title=document.createElement('span');title.className='card-label';title.setAttribute('aria-hidden','true');
 title.innerHTML='<span>0'+(i+1)+' · '+item.name+'</span><i class="card-enter">进入 ↗</i>';
 card.append(meta,heading,picture,title);cards.append(card);art(picture,item);toneCard(picture,item);
 const itemButton=document.createElement('button');itemButton.type='button';itemButton.dataset.studio=i;
 itemButton.innerHTML='<span>0'+(i+1)+'</span>'+item.name;
 index.append(itemButton);
}
function globe(ctx,x,y,r){
 ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.stroke();
 for(const step of [.18,.39,.66,.86]){
  ctx.beginPath();ctx.ellipse(x,y,r*step,r,-.29,0,Math.PI*2);ctx.stroke();
 }
 for(const step of [-.76,-.51,-.26,0,.26,.51,.76]){
  ctx.beginPath();ctx.ellipse(x,y+r*step,Math.sqrt(1-step**2)*r,Math.max(.6,r*.12),-.09,0,Math.PI*2);ctx.stroke();
 }
}
function drawSpatialLinks(){
 const canvas=$('stageLines'),ctx=canvas.getContext('2d'),rect=stage.getBoundingClientRect(),scale=Math.min(devicePixelRatio||1,2);
 canvas.width=Math.round(rect.width*scale);canvas.height=Math.round(rect.height*scale);
 ctx.scale(scale,scale);ctx.lineWidth=.7;
 const w=rect.width,h=rect.height;
 ctx.strokeStyle='#a4c78123';
 globe(ctx,w*.085,h*.32,Math.min(w*.145,h*.235));
 globe(ctx,w*.91,h*.72,Math.min(w*.13,h*.2));
 ctx.strokeStyle='#b4d99914';
 for(let row=0;row<13;row++){
  ctx.beginPath();ctx.moveTo(0,h*row/12);ctx.lineTo(w*.66,h*.41);ctx.lineTo(w,h*row/12);ctx.stroke();
 }
 if(mode!=='space')return;
 ctx.strokeStyle='#badb8e75';ctx.lineWidth=1;ctx.setLineDash([5,7]);ctx.beginPath();
 getSpacePoints().forEach(([x,y],i)=>i?ctx.lineTo(x*w,y*h):ctx.moveTo(x*w,y*h));
 ctx.closePath();ctx.stroke();
}
function getSpacePoints(){return narrow.matches?[[.2,.29],[.5,.19],[.8,.30],[.33,.68],[.69,.70]]:spacePoints}
function layoutCards(){
 const width=stage.clientWidth,height=stage.clientHeight;
 const center=narrow.matches?.48:.60;
 stage.style.setProperty('--center-x',center*100+'%');
 stage.style.setProperty('--center-y',narrow.matches?'50%':'49%');
 for(const [i,card] of Array.from(cards.children).entries()){
  const offset=((i-selected+7)%5)-2;
  let pose='',order=i,opacity=1;
  if(mode==='deck'){
   const behind=(i-selected+studios.length)%studios.length;
   const amount=spread/100;
   const opened=Math.min(162,width*(narrow.matches?.15:.113));
   const x=(behind*(narrow.matches?12:30))*(1-amount)+(i-2)*opened*amount;
   const y=behind*(-(narrow.matches?11:20))*(1-amount)+Math.abs(i-2)*12*amount;
   const angle=behind*2.25*(1-amount)+(i-2)*6*amount;
   pose='translate(-50%,-50%) translate('+x+'px,'+y+'px) rotate('+angle+'deg)';
   order=i===selected?10:8-behind;
   opacity=i===selected?1:.58+amount*.30;
  }
  if(mode==='wheel'){
   const distance=Math.abs(offset);
   pose='translate(-50%,-50%) translate3d('+offset*Math.min(208,width*.17)+'px,'+distance*13+'px,'+(-distance*145)+'px) rotateY('+(-offset*28)+'deg)';
   order=8-distance;
   opacity=1-distance*.18;
  }
  if(mode==='space'){
   const [x,y]=getSpacePoints()[i];
   pose='translate(-50%,-50%) translate3d('+((x-center)*width)+'px,'+((y-.49)*height)+'px,'+(i===selected?42:0)+'px) rotateX(-13deg) rotateZ('+[-8,3,8,-4,6][i]+'deg)';
   order=i===selected?9:3+i;
   opacity=i===selected?1:.84;
  }
  card.style.setProperty('--position',pose||'none');card.style.setProperty('--order',order);card.style.setProperty('--card-opacity',opacity);
  card.setAttribute('aria-pressed',i===selected);
  index.children[i].setAttribute('aria-pressed',i===selected);
 }
 drawSpatialLinks();
}
function updateDetail(){
 const item=studios[selected];
 $('currentType').textContent=item.type;
 $('currentTitle').textContent=item.name;
 $('currentDescription').textContent=item.description;
 $('enter').href=base+'#studio-'+item.id;
 $('enter').setAttribute('aria-label','进入'+item.name+'工作室');
 const index=$('wheelIndex');if(index)index.textContent='0'+(selected+1)+' / 05';
 layoutCards();
}
function select(i){selected=(i+studios.length)%studios.length;updateDetail()}
function showMode(next){
 mode=next;stage.dataset.mode=mode;
 document.querySelectorAll('[data-mode]').forEach(el=>{if(el.tagName==='BUTTON')el.setAttribute('aria-pressed',el.dataset.mode===mode)});
 if(mode==='deck')tools.innerHTML='<label>卡牌展开 <input type="range" min="0" max="100" id="spread"></label><span>滚动展开 · 点正面卡进入</span>';
 if(mode==='wheel')tools.innerHTML='<button data-step="-1">‹ 上一张</button><output id="wheelIndex"></output><button data-step="1">下一张 ›</button><span>点侧面的卡转到正面</span>';
 if(mode==='space')tools.innerHTML='<button id="tiltControl" aria-pressed="'+tilt+'">跟随指针</button><button id="resetTilt">复位视角</button><span>点选一个工作室</span>';
 if(mode==='flat')tools.innerHTML='<span>并排浏览五个工作室</span>';
 if($('spread'))$('spread').value=spread;
 stage.style.setProperty('--tilt-x','0deg');stage.style.setProperty('--tilt-y','0deg');
 try{localStorage.setItem('shimo-home-view',mode)}catch{}
 updateDetail();
}
document.querySelector('.modes').addEventListener('click',event=>{
 const value=event.target.closest('button')?.dataset.mode;
 if(modes.includes(value))showMode(value);
});
index.addEventListener('click',event=>{
 const item=event.target.closest('[data-studio]');if(item)select(Number(item.dataset.studio));
});
cards.addEventListener('click',event=>{
 const card=event.target.closest('[data-studio]');
 if(!card)return;
 const next=Number(card.dataset.studio);
 if(next===selected)location.assign($('enter').href);else select(next);
});
cards.addEventListener('keydown',event=>{
 if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
 event.preventDefault();select(selected+(event.key==='ArrowRight'?1:-1));cards.children[selected].focus();
});
tools.addEventListener('input',event=>{if(event.target.id==='spread'){spread=Number(event.target.value);layoutCards()}});
tools.addEventListener('click',event=>{
 const btn=event.target.closest('button');if(!btn)return;
 if(btn.dataset.step)select(selected+Number(btn.dataset.step));
 if(btn.id==='tiltControl'){tilt=!tilt;showMode(mode);$('tiltControl').focus()}
 if(btn.id==='resetTilt'){stage.style.setProperty('--tilt-x','0deg');stage.style.setProperty('--tilt-y','0deg')}
});
stage.addEventListener('pointermove',event=>{
 if(mode!=='space'||!tilt||event.pointerType==='touch'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const r=stage.getBoundingClientRect();stage.style.setProperty('--tilt-x',((.5-(event.clientY-r.top)/r.height)*14)+'deg');stage.style.setProperty('--tilt-y',(((event.clientX-r.left)/r.width-.5)*17)+'deg');
});
stage.addEventListener('pointerleave',()=>{stage.style.setProperty('--tilt-x','0deg');stage.style.setProperty('--tilt-y','0deg')});
let lastWheel=0;
stage.addEventListener('wheel',event=>{
 if(narrow.matches&&!event.shiftKey)return;
 if(mode==='deck'){event.preventDefault();spread=Math.min(100,Math.max(0,spread+Math.sign(event.deltaY||event.deltaX)*6));$('spread').value=spread;layoutCards()}
 if(mode==='wheel'){event.preventDefault();if(event.timeStamp-lastWheel>180){lastWheel=event.timeStamp;select(selected+Math.sign(event.deltaY||event.deltaX))}}
},{passive:false});
new ResizeObserver(layoutCards).observe(stage);
showMode(mode);
