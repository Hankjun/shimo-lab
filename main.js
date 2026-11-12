const base='https://shimo-lab-five.zaqprmhm56595.chatgpt.site/';
const studios=[
 {id:'print',name:'活字印刷',type:'印刷工坊',description:'从接单、校样到印前核对，把规格和定稿整理成一张可交接的生产单。',paper:'#ead9bd',ink:'#503529',mark:'#a64435'},
 {id:'garden',name:'苏州园林',type:'园林空间',description:'沿门楼、曲廊、庭院和藏书阁，走完项目周报的取材、共审与归档。',paper:'#e2e9d9',ink:'#3d5c4f',mark:'#8b5d45'},
 {id:'periodic',name:'元素周期',type:'元素实验台',description:'从第 14 族元素出发，查找石墨组件和 AI 技能，组合适合任务的能力。',paper:'#dbe8e7',ink:'#294953',mark:'#277369'},
 {id:'consult',name:'咨询画布',type:'咨询白板',description:'移动和连接问题、证据、假设与行动卡片，把讨论变成可以验证的方案。',paper:'#e5e5ed',ink:'#434859',mark:'#77619a'},
 {id:'reading',name:'精读手帐',type:'双页手帐',description:'从书架打开手帐，在左页记线索与问题，右页整理精读笔记和读后总结。',paper:'#dfe0eb',ink:'#303750',mark:'#84678f'},
 {id:'gauss',name:'高思控制',type:'金刚石 · 热处理过程控制',description:'按设备和批次记录热处理过程，汇总异常事实与复盘结论。',paper:'#d9e8f0',ink:'#344f65',mark:'#608eb1'},
 {id:'advisor',name:'1 号位 AI',type:'石墨烯 · 给老板做军师',description:'把待拍板事项、经营事实、备选方案和下一步压成一页决策简报。',paper:'#e0e9df',ink:'#33493c',mark:'#6a9b7e'},
 {id:'talent',name:'Talent 网络',type:'富勒烯 · 人才寻访',description:'从需求画像出发，整理候选线索、引荐路径和下一次跟进。',paper:'#e9e0ee',ink:'#503c60',mark:'#906fa8'}
];
const $=id=>document.getElementById(id);
const stage=$('stage'),cards=$('cards'),tools=$('galleryTools');
const spacePoints=[[.30,.31],[.49,.28],[.68,.30],[.87,.33],[.34,.68],[.52,.66],[.70,.69],[.88,.71]];
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
 }else if(item.id==='reading'){
  box(0,0,240,180,'#322d2b');
  poly([[24,44],[106,29],[120,36],[135,30],[215,46],[216,148],[133,139],[120,147],[102,139],[22,150]],'#725d52');
  poly([[29,42],[103,28],[118,34],[118,141],[103,133],[29,144]],'#d9c7a8');
  poly([[121,35],[137,29],[211,43],[212,143],[135,132],[121,140]],'#eedcc0');
  line([[120,38],[120,140]],'#847260',2);
  for(let i=0;i<7;i++){
   line([[39,66+i*10],[102,55+i*10]],'#9a816c',1);
   line([[137,55+i*10],[197,65+i*10]],'#a58c75',1);
  }
  box(170,94,22,18,'#9a594b');box(56,43,35,6,'#6e594b');
 }else if(item.id==='gauss'){
  box(0,0,240,180,'#202a35');
  const vertices=[[120,20],[173,45],[188,98],[120,154],[52,98],[67,45]];
  poly(vertices,'#263a4a');line([...vertices,vertices[0]],'#a6dcf3',2);
  line([vertices[0],vertices[2],vertices[4],vertices[0]],'#7eacc8');
  line([vertices[1],vertices[3],vertices[5],vertices[1]],'#7eacc8');
  line([vertices[0],[120,84],vertices[3]],'#a6dcf3');
  line([vertices[1],[120,84],vertices[5]],'#a6dcf3');
  for(const [x,y] of [...vertices,[120,84]])dot(x,y,3,'#d6effc');
 }else if(item.id==='advisor'){
  box(0,0,240,180,'#233229');
  for(let row=0;row<5;row++)for(let col=0;col<6;col++){
   const x=32+(col+.5*(row%2))*29,y=33+row*26;
   const corners=Array.from({length:7},(_,i)=>{const a=(i*60+30)*Math.PI/180;return [x+16.75*Math.cos(a),y+16.75*Math.sin(a)]});
   line(corners,col===2||col===3?'#9bcea3':'#547a61',1.4);
   if((row+col)%4===0)dot(x,y,2.5,'#d1efd2');
  }
 }else{
  box(0,0,240,180,'#2c2737');
  c.strokeStyle='#a986bd';c.beginPath();c.arc(120,90,64,0,Math.PI*2);c.stroke();
  const rings=[[5,33,46],[10,61,72],[10,61,105],[5,33,134]].map(([count,r,y],level)=>Array.from({length:count},(_,i)=>{const a=(i+.5*(level%2))*2*Math.PI/count;return [120+Math.cos(a)*r,y+Math.sin(a)*14]}));
  rings.forEach((ring,i)=>{line([...ring,ring[0]],'#ad8ec5',1.2);ring.forEach((p,j)=>{dot(...p,2.5,'#ead6f6');if(i>0)line([p,rings[i-1][Math.floor(j*rings[i-1].length/ring.length)]],'#a986bd',1.2)})});
 }
}
function toneCard(canvas,item){
 if(['reading','gauss','advisor','talent'].includes(item.id))return;
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
function getSpacePoints(){return narrow.matches?[[.26,.16],[.73,.16],[.26,.39],[.73,.39],[.26,.62],[.73,.62],[.26,.85],[.73,.85]]:spacePoints}
function layoutCards(){
 const width=stage.clientWidth,height=stage.clientHeight;
 const center=narrow.matches?.48:.60;
 stage.style.setProperty('--center-x',center*100+'%');
 stage.style.setProperty('--center-y',narrow.matches?'50%':'49%');
 for(const [i,card] of Array.from(cards.children).entries()){
  const half=Math.floor(studios.length/2);
  const offset=((i-selected+studios.length+half)%studios.length)-half;
  let pose='',order=i,opacity=1;
  if(mode==='deck'){
   const behind=(i-selected+studios.length)%studios.length;
   const amount=spread/100;
   const middle=(studios.length-1)/2;
   const opened=Math.min(118,width*(narrow.matches?.096:.082));
   const x=(behind*(narrow.matches?9:19))*(1-amount)+(i-middle)*opened*amount;
   const y=behind*(-(narrow.matches?8:13))*(1-amount)+Math.abs(i-middle)*8*amount;
   const angle=behind*1.35*(1-amount)+(i-middle)*3.7*amount;
   const size=1-amount*(i===selected?.27:.40);
   pose='translate(-50%,-50%) translate('+x+'px,'+y+'px) rotate('+angle+'deg) scale('+size+')';
   order=i===selected?10:8-behind;
   opacity=i===selected?1:.58+amount*.30;
  }
  if(mode==='wheel'){
   const distance=Math.abs(offset);
   const shift=Math.sign(offset)*Math.min(375,width*.30)*(1-Math.pow(.65,distance));
   pose='translate(-50%,-50%) translate3d('+shift+'px,'+distance*12+'px,'+(-distance*105)+'px) rotateY('+(-offset*21)+'deg)';
   order=8-distance;
   opacity=Math.max(.30,1-distance*.17);
  }
  if(mode==='space'){
   const [x,y]=getSpacePoints()[i];
   pose='translate(-50%,-50%) translate3d('+((x-center)*width)+'px,'+((y-.49)*height)+'px,'+(i===selected?42:0)+'px) rotateX(-13deg) rotateZ('+[-6,3,-3,6,-5,4,-2,5][i]+'deg)';
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
 const index=$('wheelIndex');if(index)index.textContent='0'+(selected+1)+' / '+String(studios.length).padStart(2,'0');
 layoutCards();
}
function select(i){selected=(i+studios.length)%studios.length;updateDetail()}
function showMode(next){
 mode=next;stage.dataset.mode=mode;
 document.querySelectorAll('[data-mode]').forEach(el=>{if(el.tagName==='BUTTON')el.setAttribute('aria-pressed',el.dataset.mode===mode)});
 if(mode==='deck')tools.innerHTML='<label>卡牌展开 <input type="range" min="0" max="100" id="spread"></label><span>滚动展开 · 点正面卡进入</span>';
 if(mode==='wheel')tools.innerHTML='<button data-step="-1">‹ 上一张</button><output id="wheelIndex"></output><button data-step="1">下一张 ›</button><span>点侧面的卡转到正面</span>';
 if(mode==='space')tools.innerHTML='<button id="tiltControl" aria-pressed="'+tilt+'">跟随指针</button><button id="resetTilt">复位视角</button><span>点选一个工作室</span>';
 if(mode==='flat')tools.innerHTML='<span>浏览全部八个工作室</span>';
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
