// ─── UTILS ──────────────────────────────────────────────────────
const lerp = (a,b,t) => a+(b-a)*t;

// ─── LOADER ─────────────────────────────────────────────────────
(function(){
  const loader = document.getElementById('loader');
  const fill   = document.getElementById('ldFill');
  const num    = document.getElementById('ldNum');
  const spans  = loader.querySelectorAll('.ld-word span');
  let prog = 0, start = null;

  // stagger letters in
  spans.forEach((s,i) => {
    setTimeout(() => {
      s.style.transition = 'opacity .35s ease, transform .35s ease';
      s.style.opacity = '1';
      s.style.transform = 'translateY(0)';
    }, 100 + i * 55);
  });

  function tick(ts){
    if(!start) start=ts;
    const elapsed = ts - start;
    prog = Math.min(100, (elapsed / 1800) * 100);
    fill.style.width = prog + '%';
    num.textContent = String(Math.floor(prog)).padStart(3,'0');
    if(prog < 100){ requestAnimationFrame(tick); }
    else {
      setTimeout(() => {
        loader.style.transition = 'opacity .5s ease';
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
          boot();
        }, 500);
      }, 200);
    }
  }
  requestAnimationFrame(tick);
})();

// ─── BOOT ────────────────────────────────────────────────────────
function boot(){
  initCursor();
  initThree();
  initHeroGSAP();
  initScrollReveal();
  initPolaroidDrag();
  initMagnetic();
  initHitMeUp();
  initSplitTitles();
}

// ─── CURSOR ──────────────────────────────────────────────────────
function initCursor(){
  const dot  = document.getElementById('curDot');
  const ring = document.getElementById('curRing');
  const TRAIL = 14;
  const trails = [];

  for(let i=0;i<TRAIL;i++){
    const el = document.createElement('div');
    el.className = 'trail';
    const sz = Math.max(2, 7 - i*0.4);
    const colors = [getComputedStyle(document.documentElement).getPropertyValue('--pk').trim(),
                    getComputedStyle(document.documentElement).getPropertyValue('--cy').trim(),
                    getComputedStyle(document.documentElement).getPropertyValue('--lm').trim()];
    el.style.cssText = `width:${sz}px;height:${sz}px;background:${colors[i%3]};opacity:${(1-i/TRAIL)*0.55}`;
    document.body.appendChild(el);
    trails.push({el, x: innerWidth/2, y: innerHeight/2});
  }

  let mx = innerWidth/2, my = innerHeight/2;
  let rx = mx, ry = my;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    gsap.to(dot, {x:mx, y:my, duration:.06, overwrite:true});
  });

  gsap.ticker.add(() => {
    rx = lerp(rx,mx,.1); ry = lerp(ry,my,.1);
    gsap.set(ring,{x:rx,y:ry});
    trails.forEach((t,i) => {
      const px = i===0 ? mx : trails[i-1].x;
      const py = i===0 ? my : trails[i-1].y;
      t.x = lerp(t.x,px,.3); t.y = lerp(t.y,py,.3);
      gsap.set(t.el,{x:t.x,y:t.y});
    });
  });

  document.querySelectorAll('a,button,.bc,.pol,.tag').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
  });
}

// ─── THREE.JS ────────────────────────────────────────────────────
function initThree(){
  const canvas   = document.getElementById('heroCanvas');
  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(innerWidth,innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, innerWidth/innerHeight, .1, 100);
  camera.position.z = 6;

  // ── Torus Knot (pink)
  const tkGeo = new THREE.TorusKnotGeometry(1.9, .44, 128, 16);
  const tkMat = new THREE.MeshBasicMaterial({color:0xFF006E, wireframe:true, transparent:true, opacity:.16});
  const tk    = new THREE.Mesh(tkGeo, tkMat);
  tk.position.set(4.2, 0, -1); scene.add(tk);

  // ── Icosahedron (cyan)
  const iGeo = new THREE.IcosahedronGeometry(1.3,1);
  const iMat = new THREE.MeshBasicMaterial({color:0x00F5FF, wireframe:true, transparent:true, opacity:.11});
  const ico  = new THREE.Mesh(iGeo,iMat);
  ico.position.set(-4.8,1.8,-2); scene.add(ico);

  // ── Octahedron (lime)
  const oGeo = new THREE.OctahedronGeometry(1.1,1);
  const oMat = new THREE.MeshBasicMaterial({color:0xADFF2F, wireframe:true, transparent:true, opacity:.08});
  const oct  = new THREE.Mesh(oGeo,oMat);
  oct.position.set(-.5,-3.2,-3); scene.add(oct);

  // ── Particles
  const N   = 450;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(N*3);
  const col = new Float32Array(N*3);
  const PAL = [[1,.0,.43],[0,.96,1],[.68,1,.18]];
  for(let i=0;i<N;i++){
    pos[i*3]   = (Math.random()-.5)*26;
    pos[i*3+1] = (Math.random()-.5)*16;
    pos[i*3+2] = (Math.random()-.5)*12;
    const c = PAL[Math.floor(Math.random()*3)];
    col[i*3]=c[0]; col[i*3+1]=c[1]; col[i*3+2]=c[2];
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
  geo.setAttribute('color',    new THREE.BufferAttribute(col,3));
  const pMat = new THREE.PointsMaterial({size:.05, vertexColors:true, transparent:true, opacity:.5});
  const pts  = new THREE.Points(geo,pMat);
  scene.add(pts);

  // ── Mouse parallax
  let tRX=0, tRY=0;
  document.addEventListener('mousemove',e=>{
    tRX = (e.clientY/innerHeight - .5)*  .28;
    tRY = (e.clientX/innerWidth  - .5)*  .45;
  });

  let t=0;
  (function tick(){
    requestAnimationFrame(tick);
    t += .006;
    tk.rotation.x  = t*.24;  tk.rotation.y  = t*.38;
    tk.position.y  = Math.sin(t*.55)*.6;
    ico.rotation.x = -t*.32; ico.rotation.z = t*.5;
    ico.position.y = 1.8+Math.cos(t*.42)*.9;
    oct.rotation.y = t*.65;  oct.rotation.x = t*.38;
    pts.rotation.y = t*.02;
    scene.rotation.x = lerp(scene.rotation.x, tRX, .04);
    scene.rotation.y = lerp(scene.rotation.y, tRY, .04);
    renderer.render(scene,camera);
  })();

  window.addEventListener('resize',()=>{
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth,innerHeight);
  });
}

// ─── HERO ENTRANCE ───────────────────────────────────────────────
function initHeroGSAP(){
  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline({delay:.1});
  tl.to('#hEye',   {opacity:1,y:0,duration:.7,ease:'power3.out'})
    .to('#hSub',   {opacity:1,y:0,duration:.6,ease:'power3.out'},'-=.35')
    .to('#hCta',   {opacity:1,y:0,duration:.6,ease:'power3.out'},'-=.35')
    .to('#hStats', {opacity:1,y:0,duration:.6,ease:'power3.out'},'-=.35')
    .to('#hScroll',{opacity:1,   duration:.6,ease:'power3.out'},'-=.2');

  // Canvas parallax on scroll
  gsap.to('#heroCanvas',{
    y:'28%', ease:'none',
    scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:1}
  });
}

// ─── SPLIT TITLES ────────────────────────────────────────────────
function initSplitTitles(){
  document.querySelectorAll('.sec-title').forEach(el => {
    const raw = el.textContent.trim();
    el.innerHTML = raw.split('').map(ch => {
      if(ch===' ') return `<span style="display:inline-block;width:.25em"> </span>`;
      return `<span class="char-wrap"><span class="char">${ch}</span></span>`;
    }).join('');
    gsap.fromTo(el.querySelectorAll('.char'),
      {y:'105%'},
      {y:'0%', duration:.65, stagger:.03, ease:'power4.out',
       scrollTrigger:{trigger:el,start:'top 88%',once:true}
      }
    );
  });
}

// ─── SCROLL REVEAL ───────────────────────────────────────────────
function initScrollReveal(){
  // about body
  gsap.to('#aboutBody',{
    opacity:1,y:0,duration:.9,ease:'power3.out',
    scrollTrigger:{trigger:'#aboutBody',start:'top 85%',once:true}
  });
  // tags stagger
  gsap.fromTo('.tag',{opacity:0,scale:.8},{
    opacity:1,scale:1,duration:.3,stagger:.05,ease:'back.out(2)',
    scrollTrigger:{trigger:'.tags',start:'top 90%',once:true}
  });
  // bento cells
  gsap.fromTo('.bc',{opacity:0,y:44,scale:.95},{
    opacity:1,y:0,scale:1,duration:.5,stagger:.07,ease:'power3.out',
    scrollTrigger:{trigger:'.bento',start:'top 80%',once:true}
  });
  // HIT ME UP
  gsap.to('#hmu',{
    opacity:1,y:0,skewX:0,duration:1.1,ease:'power4.out',
    scrollTrigger:{trigger:'#contact',start:'top 72%',once:true}
  });
  gsap.to('#contactRow',{
    opacity:1,y:0,duration:.85,ease:'power3.out',
    scrollTrigger:{trigger:'#contactRow',start:'top 88%',once:true}
  });
  // section labels
  gsap.utils.toArray('.sec-label').forEach(el => {
    gsap.fromTo(el,{opacity:0,x:-16},{
      opacity:1,x:0,duration:.5,
      scrollTrigger:{trigger:el,start:'top 92%',once:true}
    });
  });
}

// ─── POLAROID DRAG ───────────────────────────────────────────────
function initPolaroidDrag(){
  const g = document.getElementById('polGallery');
  let drag=false, sx=0, sl=0;
  g.addEventListener('mousedown',  e=>{drag=true;sx=e.pageX-g.offsetLeft;sl=g.scrollLeft});
  document.addEventListener('mouseup',   ()=>drag=false);
  document.addEventListener('mousemove', e=>{
    if(!drag)return; e.preventDefault();
    g.scrollLeft = sl - (e.pageX - g.offsetLeft - sx)*1.4;
  });
  g.addEventListener('touchstart', e=>{sx=e.touches[0].pageX-g.offsetLeft;sl=g.scrollLeft},{passive:true});
  g.addEventListener('touchmove',  e=>{
    g.scrollLeft = sl - (e.touches[0].pageX - g.offsetLeft - sx)*1.4;
  },{passive:true});
}

// ─── MAGNETIC ────────────────────────────────────────────────────
function initMagnetic(){
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top  - r.height/2;
      gsap.to(el,{x:x*.35, y:y*.35, duration:.4, ease:'power2.out'});
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el,{x:0,y:0,duration:.7,ease:'elastic.out(1,.4)'});
    });
  });
}

// ─── HIT ME UP MOUSE FOLLOW ──────────────────────────────────────
function initHitMeUp(){
  const sec  = document.getElementById('contact');
  const text = document.getElementById('hmu');
  sec.addEventListener('mousemove', e => {
    const r = sec.getBoundingClientRect();
    const x = e.clientX - r.left  - r.width/2;
    const y = e.clientY - r.top   - r.height/2;
    gsap.to(text,{x:x*.07, y:y*.07, duration:.6, ease:'power2.out'});
  });
  sec.addEventListener('mouseleave', () => {
    gsap.to(text,{x:0,y:0,duration:.9,ease:'elastic.out(1,.4)'});
  });
}
