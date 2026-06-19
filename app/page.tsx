"use client";
// Vibe reference: neon.tech — Technical Dark Premium
// Paleta: logo V Momentum — #0a0a0f bg, #1a6eff azul, #c8d0e0 plata
// CERO emojis. SVG geométricos. Sin nombre del fundador. Sin proyectos de clientes.

import { useEffect, useState } from "react";

const C = {
  bg:"#0a0a0f", surf:"#111118", surf2:"#16161f",
  blu:"#1a6eff", blu2:"rgba(26,110,255,0.12)", blu3:"rgba(26,110,255,0.06)",
  slv:"#c8d0e0", slv2:"rgba(200,208,224,0.55)", slv3:"rgba(200,208,224,0.25)",
  border:"rgba(200,208,224,0.08)", borderB:"rgba(26,110,255,0.2)", white:"#ffffff",
};

const Ic = {
  shield:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2l7 3v6c0 5-3.5 9-7 10C8.5 20 5 16 5 11V5l7-3z"/></svg>,
  lock:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  card:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  db:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>,
  globe: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  cpu:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  file:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>,
  bolt:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  check: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  arr:   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  menu:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  li:    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  tw:    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  vlogo: <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M2 4l8 12L18 4" stroke="#1a6eff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

const G = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth;overflow-x:clip}
  body{background:${C.bg};color:${C.slv};font-family:-apple-system,'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
  ::selection{background:rgba(26,110,255,.22);color:#fff}
  ::-webkit-scrollbar{width:3px}
  ::-webkit-scrollbar-thumb{background:rgba(26,110,255,.3);border-radius:3px}
  a{text-decoration:none;color:inherit}
  .mono{font-family:'SF Mono','Fira Code','Cascadia Code',monospace}
  .label{font-family:'SF Mono','Fira Code',monospace;font-size:11px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:${C.slv3}}
  .t-hero{font-size:clamp(34px,6vw,78px);font-weight:800;letter-spacing:-0.03em;line-height:1.0;color:#fff}
  .t-h2{font-size:clamp(26px,4vw,50px);font-weight:700;letter-spacing:-0.03em;line-height:1.1;color:#fff}
  .t-h3{font-size:clamp(16px,2vw,20px);font-weight:600;letter-spacing:-0.02em;color:#fff}
  .t-body{font-size:15px;line-height:1.7;color:${C.slv2}}
  .btn-p{display:inline-flex;align-items:center;justify-content:center;gap:6px;background:${C.blu};color:#fff;font-size:13px;font-weight:600;border-radius:7px;padding:9px 18px;border:none;cursor:pointer;transition:opacity .15s,transform .15s;white-space:nowrap}
  .btn-p:hover{opacity:.85;transform:translateY(-1px)}
  .btn-g{display:inline-flex;align-items:center;justify-content:center;gap:6px;background:transparent;color:${C.slv};font-size:13px;font-weight:500;border-radius:7px;padding:9px 18px;border:1px solid ${C.border};cursor:pointer;transition:border-color .15s,color .15s;white-space:nowrap}
  .btn-g:hover{border-color:${C.slv3};color:#fff}
  .card{background:${C.surf};border:1px solid ${C.border};border-radius:10px;padding:20px;transition:border-color .2s}
  .card:hover{border-color:${C.borderB}}
  .inp{width:100%;background:${C.surf};border:1px solid ${C.border};border-radius:7px;padding:10px 13px;font-size:13px;color:#fff;outline:none;transition:border-color .15s;font-family:inherit}
  .inp::placeholder{color:${C.slv3}}
  .inp:focus{border-color:${C.blu}}
  .wrap{max-width:1100px;margin:0 auto;padding:0 24px}
  .sec{padding:88px 0}
  .div{height:1px;background:${C.border}}
  .nl{font-size:13px;color:${C.slv2};padding:5px 10px;border-radius:5px;transition:color .15s}
  .nl:hover{color:#fff}
  .g2{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
  .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
  .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
  .dot{width:6px;height:6px;border-radius:50%;background:#22c55e;box-shadow:0 0 6px #22c55e;flex-shrink:0}
  .term{background:#0d0d14;border:1px solid ${C.border};border-radius:9px;padding:18px 20px;font-family:'SF Mono','Fira Code',monospace;font-size:12px;line-height:1.8}
  .term .p{color:${C.slv3}} .term .c{color:#fff} .term .o{color:#22c55e} .term .cm{color:${C.slv3}}
  @media(max-width:900px){.g4{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:768px){
    .g2{grid-template-columns:1fr}
    .g3{grid-template-columns:repeat(2,1fr)}
    .hm{display:none!important}
    .sm{display:flex!important}
    .sec{padding:60px 0}
  }
  @media(min-width:769px){.sm{display:none!important}}
  @media(max-width:520px){.g3{grid-template-columns:1fr}}
`;

/* NAV */
function Nav() {
  const [open,setOpen]=useState(false);
  const [solid,setSolid]=useState(false);
  useEffect(()=>{
    const fn=()=>setSolid(window.scrollY>40);
    window.addEventListener("scroll",fn,{passive:true});
    return ()=>window.removeEventListener("scroll",fn);
  },[]);
  const links=[["Productos","#productos"],["Cómo funciona","#metodo"],["Integraciones","#integraciones"],["Precios","#precios"],["Blog","#blog"]];
  return(<>
    <nav style={{position:"fixed",inset:"0 0 auto",zIndex:100,background:solid?"rgba(10,10,15,.93)":"transparent",backdropFilter:solid?"blur(16px)":"none",borderBottom:solid?`1px solid ${C.border}`:"1px solid transparent",transition:"all .25s"}}>
      <div className="wrap" style={{height:58,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <a href="#" style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:28,height:28,borderRadius:6,background:C.surf,border:`1px solid ${C.borderB}`,display:"flex",alignItems:"center",justifyContent:"center"}}>{Ic.vlogo}</div>
          <span style={{color:"#fff",fontWeight:700,fontSize:14,letterSpacing:"-.01em"}}>V Momentum</span>
        </a>
        <div className="hm" style={{display:"flex",alignItems:"center",gap:2}}>
          {links.map(([l,h])=><a key={h} href={h} className="nl">{l}</a>)}
        </div>
        <div className="hm" style={{display:"flex",alignItems:"center",gap:8}}>
          <a href="https://www.linkedin.com/company/v-momentum-/" target="_blank" rel="noopener noreferrer" style={{color:C.slv3,display:"flex",transition:"color .15s"}} onMouseOver={e=>(e.currentTarget.style.color="#fff")} onMouseOut={e=>(e.currentTarget.style.color=C.slv3)}>{Ic.li}</a>
          <a href="https://x.com/LuisVmomentums" target="_blank" rel="noopener noreferrer" style={{color:C.slv3,display:"flex",transition:"color .15s"}} onMouseOver={e=>(e.currentTarget.style.color="#fff")} onMouseOut={e=>(e.currentTarget.style.color=C.slv3)}>{Ic.tw}</a>
          <div style={{width:1,height:18,background:C.border,margin:"0 4px"}}/>
          <a href="https://vforge.site" target="_blank" rel="noopener noreferrer" className="btn-g" style={{fontSize:12,padding:"6px 12px"}}>VForge</a>
          <a href="#contacto" className="btn-p" style={{fontSize:12,padding:"6px 14px"}}>Cotizar</a>
        </div>
        <button className="sm" onClick={()=>setOpen(v=>!v)} style={{background:"none",border:"none",color:C.slv,cursor:"pointer",padding:6}}>{open?Ic.close:Ic.menu}</button>
      </div>
    </nav>
    {open&&(
      <div style={{position:"fixed",inset:"58px 0 0",zIndex:99,background:"rgba(10,10,15,.97)",backdropFilter:"blur(20px)",borderTop:`1px solid ${C.border}`,display:"flex",flexDirection:"column"}}>
        {links.map(([l,h])=><a key={h} href={h} onClick={()=>setOpen(false)} style={{padding:"15px 24px",fontSize:15,color:C.slv,borderBottom:`1px solid ${C.border}`}}>{l}</a>)}
        <div style={{padding:"18px 24px",display:"flex",flexDirection:"column",gap:8}}>
          <a href="#contacto" onClick={()=>setOpen(false)} className="btn-p" style={{textAlign:"center"}}>Cotizar mi app</a>
          <a href="https://vforge.site" target="_blank" rel="noopener noreferrer" className="btn-g" style={{textAlign:"center"}}>Ir a VForge</a>
        </div>
      </div>
    )}
  </>);
}

/* HERO */
function Hero() {
  const words=["apps PWA","sistemas ERP","plataformas fintech","agentes IA","marketplaces"];
  const [idx,setIdx]=useState(0);
  const [vis,setVis]=useState(true);
  useEffect(()=>{
    const t=setInterval(()=>{setVis(false);setTimeout(()=>{setIdx(v=>(v+1)%words.length);setVis(true);},200);},2800);
    return ()=>clearInterval(t);
  },[]);
  return(
    <section style={{position:"relative",paddingTop:130,paddingBottom:90,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${C.border} 1px,transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px)`,backgroundSize:"60px 60px",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"35%",left:"50%",transform:"translate(-50%,-50%)",width:560,height:360,background:"radial-gradient(ellipse,rgba(26,110,255,.09) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <div className="wrap" style={{position:"relative",zIndex:1}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:26,padding:"4px 12px 4px 8px",borderRadius:999,border:`1px solid ${C.borderB}`,background:C.blu3}}>
          <span className="dot"/>
          <span className="mono" style={{color:C.blu,fontSize:11}}>Fábrica de software · México</span>
        </div>
        <h1 className="t-hero" style={{maxWidth:760,marginBottom:18}}>
          Construimos{" "}
          <span style={{color:C.blu,transition:"opacity .2s",opacity:vis?1:0,display:"inline-block",minWidth:300}}>
            {words[idx]}
          </span>
          <br/>
          <span style={{color:C.slv2,fontWeight:300}}>que escalan de verdad.</span>
        </h1>
        <p className="t-body" style={{maxWidth:500,marginBottom:32,fontSize:16}}>
          V Momentum es la fábrica de software más rápida de México.{" "}
          <span style={{color:C.slv}}>De idea a producción en 7 días.</span>{" "}
          PWA, auth, pagos y automatización IA incluidos.
        </p>
        <div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:44}}>
          <a href="#contacto" className="btn-p">Quiero mi app {Ic.arr}</a>
          <a href="#metodo" className="btn-g">Cómo funciona</a>
        </div>
        <div className="term" style={{maxWidth:460,marginBottom:52}}>
          <span className="p">$ </span><span className="c">npx vmomentum init</span><br/>
          <span className="o">✓ Proyecto creado · Auth · DB · Deploy</span><br/>
          <span className="cm"># De idea a producción en 7 días</span>
        </div>
        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:24,display:"flex",flexWrap:"wrap",gap:"16px 44px"}}>
          {[["15+","Apps en producción"],["7 días","Tiempo promedio"],["$12,000","MXN desde"],["100%","Código tuyo"]].map(([v,l])=>(
            <div key={l}>
              <div className="mono" style={{fontSize:"clamp(20px,3vw,30px)",fontWeight:700,color:"#fff",letterSpacing:"-.03em",lineHeight:1}}>{v}</div>
              <div className="label" style={{marginTop:3}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* SELLOS */
const SEALS=[
  {i:Ic.lock,  t:"Auth con Clerk",    s:"Enterprise-grade"},
  {i:Ic.card,  t:"MP Certificado",    s:"Checkout Pro oficial"},
  {i:Ic.db,    t:"Neon Postgres",     s:"AES-256 · TLS"},
  {i:Ic.globe, t:"Vercel Edge",       s:"150+ regiones"},
  {i:Ic.cpu,   t:"Claude AI",         s:"Integrado nativamente"},
  {i:Ic.shield,t:"SSL · HTTPS",       s:"Todos los proyectos"},
  {i:Ic.file,  t:"Contrato digital",  s:"Firma electrónica"},
  {i:Ic.bolt,  t:"SLA 99.5%",         s:"Uptime garantizado"},
];
function Seals(){return(
  <div style={{borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,background:C.surf}}>
    <div className="wrap" style={{padding:"28px 24px"}}>
      <p className="label" style={{textAlign:"center",marginBottom:18}}>Certificado · Validado · Seguro</p>
      <div className="g4">
        {SEALS.map(s=>(
          <div key={s.t} style={{display:"flex",alignItems:"center",gap:9,padding:"11px 13px",borderRadius:8,border:`1px solid ${C.border}`,background:C.bg}}>
            <span style={{color:C.blu,display:"flex",flexShrink:0}}>{s.i}</span>
            <div>
              <div style={{fontSize:12,fontWeight:600,color:"#fff",lineHeight:1.2}}>{s.t}</div>
              <div style={{fontSize:10,color:C.slv3,marginTop:1}}>{s.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);}

/* PRODUCTOS */
const PRODS=[
  {n:"VForge",      tag:"La plataforma", d:"Convierte tu idea en una app real. PWA, móvil o MCP — desplegada a producción con dominio, DB y panel admin en días, no meses."},
  {n:"Vulcano",     tag:"Copiloto IA",   d:"La IA que construye contigo. Hablas y ejecuta: código, deploys, integraciones. Memoria persistente y contexto de todos tus proyectos."},
  {n:"CMP Protocol",tag:"Nuestro método",d:"Context Minimum Protocol — 6 pasos de tu idea a un producto real: captura, análisis, diseño, roadmap, scope y deploy."},
  {n:"Marketplace", tag:"Apps listas",   d:"Catálogo de apps preconfiguradas para tu industria. Elige, personaliza y despliega en horas. Código incluido."},
  {n:"MCP Server",  tag:"Conectividad",  d:"Conecta Claude, Cursor, VS Code y cualquier agente IA a tu proyecto vía protocolo MCP nativo con OAuth."},
  {n:"Workspace",   tag:"Tu panel",      d:"Dashboard centralizado: gestiona tu app, contratos, timeline, tokens y comunicación con el equipo."},
];
function Productos(){
  const [a,setA]=useState(0);
  const p=PRODS[a];
  return(
    <section id="productos" className="sec" style={{borderBottom:`1px solid ${C.border}`}}>
      <div className="wrap">
        <p className="label" style={{marginBottom:10}}>Nuestros productos</p>
        <h2 className="t-h2" style={{marginBottom:40}}>Una fábrica.<br/><span style={{color:C.slv2,fontWeight:300}}>Seis herramientas.</span></h2>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
          {PRODS.map((pr,i)=>(
            <button key={pr.n} onClick={()=>setA(i)} style={{padding:"6px 14px",borderRadius:6,fontSize:12,fontWeight:500,cursor:"pointer",transition:"all .15s",border:"1px solid",borderColor:a===i?C.blu:C.border,background:a===i?C.blu2:"transparent",color:a===i?"#fff":C.slv2}}>
              {pr.n}
            </button>
          ))}
        </div>
        <div key={a} style={{borderRadius:10,border:`1px solid ${C.border}`,background:C.surf,padding:"28px",display:"flex",flexWrap:"wrap",gap:28}}>
          <div style={{flex:"1 1 260px"}}>
            <span className="mono" style={{fontSize:10,color:C.blu,textTransform:"uppercase",letterSpacing:".1em",display:"block",marginBottom:12}}>{p.tag}</span>
            <h3 className="t-h3" style={{fontSize:"clamp(22px,3vw,32px)",marginBottom:12}}>{p.n}</h3>
            <p className="t-body" style={{maxWidth:440,marginBottom:20,fontSize:14}}>{p.d}</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              <a href="#contacto" className="btn-p" style={{fontSize:12}}>Empezar {Ic.arr}</a>
              <a href="https://vforge.site" target="_blank" rel="noopener noreferrer" className="btn-g" style={{fontSize:12}}>Ver en VForge</a>
            </div>
          </div>
          <div style={{flex:"0 0 200px",minWidth:170}}>
            <div style={{background:C.bg,borderRadius:9,border:`1px solid ${C.border}`,padding:"16px 18px"}}>
              <p className="label" style={{marginBottom:12}}>Siempre incluye</p>
              {["Deploy en Vercel","Auth con Clerk","DB con Neon","Código en tu GitHub","Soporte post-launch","Docs técnica"].map(f=>(
                <div key={f} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 0",borderBottom:`1px solid ${C.border}`,fontSize:12,color:C.slv2}}>
                  <span style={{color:C.blu,display:"flex",flexShrink:0}}>{Ic.check}</span>{f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* MÉTODO */
const STEPS=[
  {n:"01",t:"Describes tu idea",  d:"WhatsApp o formulario. Sin demos infinitas ni formularios de 20 campos."},
  {n:"02",t:"CMP en 48 h",        d:"Roadmap, módulos, costo y timeline exacto. Todo por escrito. Sin sorpresas."},
  {n:"03",t:"Construimos en vivo",d:"Ves el avance real cada día. No un Figma — la app funcionando en tu celular."},
  {n:"04",t:"El código es tuyo",  d:"GitHub tuyo, dominio tuyo, Vercel tuyo. Nosotros construimos, tú controlas."},
];
function Metodo(){return(
  <section id="metodo" className="sec" style={{background:C.surf,borderBottom:`1px solid ${C.border}`}}>
    <div className="wrap">
      <p className="label" style={{marginBottom:10}}>Cómo funciona</p>
      <h2 className="t-h2" style={{marginBottom:40}}>De idea a producción<br/><span style={{color:C.blu}}>en 4 pasos.</span></h2>
      <div className="g4">
        {STEPS.map(s=>(
          <div key={s.n} className="card">
            <span className="mono" style={{color:C.blu,display:"block",marginBottom:14,fontSize:12}}>{s.n}</span>
            <h3 className="t-h3" style={{fontSize:15,marginBottom:9}}>{s.t}</h3>
            <p className="t-body" style={{fontSize:13}}>{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);}

/* APPS */
const APPS=[
  {t:"Fintech & Crédito",      d:"Microcréditos, scoring de riesgo, OXXO Pay, cobranza automática."},
  {t:"Movilidad & Logística",  d:"Ride-hailing, tracking GPS, despacho de flotas, tarifas dinámicas."},
  {t:"Restaurantes & Food",    d:"Pedidos en línea, sistema de mesas, cocina digital, pagos en app."},
  {t:"Salud & Clínicas",       d:"Expediente clínico, citas, telemedicina, recordatorios."},
  {t:"Construcción & RRHH",    d:"Asistencia, avance de obra, inventario, nómina, trabajadores."},
  {t:"Educación & Cursos",     d:"LMS propio, video, evaluaciones, certificados, suscripciones."},
  {t:"eCommerce & Retail",     d:"Tienda PWA instalable, inventario, POS, multi-sucursal."},
  {t:"Real Estate",            d:"Marketplace, firma digital, pagos fraccionados, tour virtual."},
  {t:"Deportes & Fitness",     d:"Academias, rutinas, torneos, ranking en tiempo real."},
  {t:"Turismo & Hospitality",  d:"Reservas, check-in digital, guías locales, pagos multi-divisa."},
  {t:"Entretenimiento",        d:"Redes verticales, portafolios de artistas, streaming propio."},
  {t:"ERP Personalizado",      d:"Sistemas a la medida para cualquier industria."},
];
function Apps(){return(
  <section id="apps" className="sec" style={{borderBottom:`1px solid ${C.border}`}}>
    <div className="wrap">
      <p className="label" style={{marginBottom:10}}>Qué construimos</p>
      <h2 className="t-h2" style={{marginBottom:40}}>12 industrias.<br/><span style={{color:C.slv2,fontWeight:300}}>Un solo equipo.</span></h2>
      <div className="g3">
        {APPS.map(a=>(
          <div key={a.t} className="card">
            <h3 className="t-h3" style={{fontSize:13,marginBottom:7}}>{a.t}</h3>
            <p className="t-body" style={{fontSize:12}}>{a.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);}

/* INTEGRACIONES */
const INTS=["Mercado Pago","Stripe","Clerk","Neon","Vercel","WhatsApp","Claude AI","OpenAI","Hetzner","Resend","Twilio","GitHub","Airtable","Google","Mapbox","OpenRouter"];
const IFILES:Record<string,string>={"Mercado Pago":"mercadopago.svg","Stripe":"stripe.svg","Clerk":"clerk.svg","Neon":"neon.svg","Vercel":"vercel.svg","WhatsApp":"whatsapp.svg","Claude AI":"claude.svg","OpenAI":"openai.svg","Hetzner":"hetzner.svg","Resend":"resend.svg","Twilio":"twilio.svg","GitHub":"github.svg","Airtable":"airtable.svg","Google":"google.svg","Mapbox":"safe.svg","OpenRouter":"openrouter.svg"};
function Integraciones(){return(
  <section id="integraciones" className="sec" style={{background:C.surf,borderBottom:`1px solid ${C.border}`}}>
    <div className="wrap">
      <p className="label" style={{marginBottom:10,textAlign:"center"}}>Ecosistema</p>
      <h2 className="t-h2" style={{marginBottom:12,textAlign:"center"}}>Conectado a todo.</h2>
      <p className="t-body" style={{textAlign:"center",maxWidth:440,margin:"0 auto 40px"}}>Todas tus herramientas favoritas, integradas desde el primer día.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(86px,1fr))",gap:8}}>
        {INTS.map(n=>(
          <div key={n} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:7,padding:"13px 7px",borderRadius:9,border:`1px solid ${C.border}`,background:C.bg,transition:"border-color .15s"}}
            onMouseOver={e=>(e.currentTarget.style.borderColor=C.borderB)}
            onMouseOut={e=>(e.currentTarget.style.borderColor=C.border)}
          >
            <img src={`/integraciones/${IFILES[n]}`} alt={n} width={26} height={26} style={{objectFit:"contain"}} onError={e=>{(e.target as HTMLImageElement).style.opacity="0"}}/>
            <span className="label" style={{fontSize:9,textAlign:"center",lineHeight:1.3}}>{n}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);}

/* PRECIOS */
const PLANS=[
  {n:"Starter",   p:"$12,000",  sub:"MXN · pago único",hot:false,fs:["PWA instalable iOS & Android","Hasta 3 módulos","Auth con Clerk","DB con Neon","Deploy Vercel","Repo en tu GitHub"]},
  {n:"Pro",       p:"$22,000",  sub:"MXN · pago único",hot:true, fs:["Todo Starter +","Hasta 8 módulos","Pagos MP / Stripe","WhatsApp notifications","Email con Resend","Panel admin completo","IA con Vulcano"]},
  {n:"Enterprise",p:"A cotizar",sub:"según alcance",   hot:false,fs:["Todo Pro +","Módulos ilimitados","Multi-sucursal & tenant","Automatizaciones MCP","Agentes IA propios","Soporte 24/7"]},
];
function Precios(){return(
  <section id="precios" className="sec" style={{borderBottom:`1px solid ${C.border}`}}>
    <div className="wrap">
      <p className="label" style={{marginBottom:10,textAlign:"center"}}>Precios</p>
      <h2 className="t-h2" style={{marginBottom:12,textAlign:"center"}}>Transparentes. Sin letra chica.</h2>
      <p className="t-body" style={{textAlign:"center",maxWidth:440,margin:"0 auto 40px"}}>Pago único. El código, el dominio y la infra son tuyos desde el primer día.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:12}}>
        {PLANS.map(pl=>(
          <div key={pl.n} style={{borderRadius:10,background:C.surf,border:`1px solid ${pl.hot?C.blu:C.border}`,padding:"24px 20px",display:"flex",flexDirection:"column",position:"relative"}}>
            {pl.hot&&<span style={{position:"absolute",top:-10,left:20,background:C.blu,color:"#fff",fontSize:10,fontWeight:600,letterSpacing:".06em",textTransform:"uppercase",padding:"2px 10px",borderRadius:999}}>Popular</span>}
            <p className="label" style={{marginBottom:9}}>{pl.n}</p>
            <div className="mono" style={{fontSize:"clamp(26px,4vw,34px)",fontWeight:700,color:"#fff",letterSpacing:"-.03em",lineHeight:1}}>{pl.p}</div>
            <div style={{fontSize:11,color:C.slv3,marginTop:4,marginBottom:20}}>{pl.sub}</div>
            <ul style={{flex:1,listStyle:"none",marginBottom:20,display:"flex",flexDirection:"column",gap:9}}>
              {pl.fs.map(f=>(
                <li key={f} style={{display:"flex",alignItems:"center",gap:7,fontSize:12,color:C.slv2}}>
                  <span style={{color:C.blu,display:"flex",flexShrink:0}}>{Ic.check}</span>{f}
                </li>
              ))}
            </ul>
            <a href="#contacto" style={{display:"block",textAlign:"center",padding:"9px",borderRadius:7,fontSize:12,fontWeight:600,border:`1px solid ${pl.hot?C.blu:C.border}`,color:pl.hot?"#fff":C.slv2,background:pl.hot?C.blu2:"transparent",transition:"all .15s",textDecoration:"none"}}
              onMouseOver={e=>{(e.currentTarget as HTMLElement).style.borderColor=C.blu;(e.currentTarget as HTMLElement).style.color="#fff"}}
              onMouseOut={e=>{(e.currentTarget as HTMLElement).style.borderColor=pl.hot?C.blu:C.border;(e.currentTarget as HTMLElement).style.color=pl.hot?"#fff":C.slv2}}
            >Cotizar este plan</a>
          </div>
        ))}
      </div>
    </div>
  </section>
);}

/* BLOG */
const POSTS=[
  {tag:"Producto", f:"Jun 2026",t:"CMP: de idea a roadmap en 48 horas",           e:"El Context Minimum Protocol captura tu idea, la analiza con IA y entrega un roadmap accionable antes de escribir código."},
  {tag:"Técnico",  f:"May 2026",t:"Por qué todas nuestras apps son PWA",           e:"Instala en iOS y Android sin App Store, se actualiza sin permiso del usuario y cuesta 10x menos de mantener."},
  {tag:"IA",       f:"May 2026",t:"Vulcano: el copiloto con memoria persistente",  e:"Memoria en Neon, contexto de tus repos en GitHub y capacidad de ejecutar comandos. Así funciona nuestro enjambre."},
  {tag:"Pagos MX", f:"Abr 2026",t:"Mercado Pago + Stripe + OXXO Pay en 2026",     e:"Qué elegir según tu mercado, cómo combinar procesadores y por qué la certificación Checkout Pro importa."},
  {tag:"Tutorial", f:"Abr 2026",t:"MCP Server propio: conecta Claude a tu proyecto",e:"Despliega un servidor MCP en Hetzner, configura OAuth con Clerk y permite que agentes IA lean tu base de datos."},
  {tag:"Stack",    f:"Mar 2026",t:"Next.js 16 + Neon + Vercel: el stack que no falla",e:"Por qué elegimos este stack para cada proyecto y cómo nos permite entregar en 7 días sin sacrificar escalabilidad."},
];
function Blog(){return(
  <section id="blog" className="sec" style={{background:C.surf,borderBottom:`1px solid ${C.border}`}}>
    <div className="wrap">
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:36}}>
        <div><p className="label" style={{marginBottom:9}}>Blog</p><h2 className="t-h2">Lo que sabemos,<br/><span style={{color:C.slv2,fontWeight:300}}>lo publicamos.</span></h2></div>
        <a href="https://vforge.site/blog" target="_blank" rel="noopener noreferrer" className="btn-g" style={{fontSize:12}}>Ver todos</a>
      </div>
      <div className="g3">
        {POSTS.map(p=>(
          <div key={p.t} className="card" style={{cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:12}}>
              <span className="mono" style={{fontSize:9,color:C.blu,textTransform:"uppercase",letterSpacing:".1em",background:C.blu3,border:`1px solid ${C.borderB}`,borderRadius:4,padding:"2px 7px"}}>{p.tag}</span>
              <span className="label" style={{fontSize:9}}>{p.f}</span>
            </div>
            <h3 className="t-h3" style={{fontSize:13,marginBottom:7,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{p.t}</h3>
            <p className="t-body" style={{fontSize:12,display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{p.e}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);}

/* LEGAL */
function Legal(){
  const [open,setOpen]=useState<string|null>(null);
  const docs=[
    {id:"t",t:"Términos y Condiciones",b:"V Momentum es operado por All Global Holding LLC, Wyoming, EE.UU. El contrato se formaliza con firma electrónica y pago del anticipo (50%). El cliente recibe código fuente completo, repo en su GitHub y dominio a su nombre al completar el proyecto. V Momentum no retiene propiedad intelectual. Garantía de 30 días post-entrega."},
    {id:"p",t:"Privacidad",           b:"Recopilamos únicamente: nombre, empresa, correo y WhatsApp. Almacenados en Neon Postgres (AES-256, TLS) y Airtable. No vendemos datos. Eliminación a solicitud en 30 días. Usamos Google Analytics AW-18205066708. Contacto: luisdelator@vmomentums.info"},
    {id:"c",t:"Modelo de Contrato",   b:"(1) Alcance MVP detallado. (2) Timeline con fechas comprometidas. (3) Módulos incluidos y excluidos. (4) 50% anticipo, 50% contra entrega. (5) Garantía 30 días. (6) Propiedad intelectual 100% del cliente. CLABE: 722969010740807451."},
    {id:"s",t:"SLA y Garantías",      b:"Respuesta < 2 h hábiles vía WhatsApp. Entrega MVP en plazo acordado. Uptime ≥ 99.5%. Bugs críticos < 24 h durante garantía. Backups automáticos diarios en Neon."},
  ];
  return(
    <section id="legal" className="sec" style={{borderBottom:`1px solid ${C.border}`}}>
      <div className="wrap">
        <p className="label" style={{marginBottom:10}}>Legal</p>
        <h2 className="t-h2" style={{marginBottom:36}}>Todo claro.<br/><span style={{color:C.slv2,fontWeight:300}}>Desde el inicio.</span></h2>
        <div style={{display:"flex",flexDirection:"column",gap:6,maxWidth:700}}>
          {docs.map(d=>(
            <div key={d.id} style={{borderRadius:9,border:`1px solid ${C.border}`,background:C.surf,overflow:"hidden"}}>
              <button onClick={()=>setOpen(open===d.id?null:d.id)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"15px 18px",background:"none",border:"none",cursor:"pointer",color:"#fff",gap:12}}>
                <span style={{fontWeight:600,fontSize:13}}>{d.t}</span>
                <span style={{color:C.slv3,transform:open===d.id?"rotate(180deg)":"none",transition:"transform .2s",fontSize:14}}>▾</span>
              </button>
              {open===d.id&&(<div style={{padding:"0 18px 18px"}}><div style={{borderTop:`1px solid ${C.border}`,paddingTop:14}}><p className="t-body" style={{fontSize:12}}>{d.b}</p></div></div>)}
            </div>
          ))}
        </div>
        <div style={{marginTop:18,padding:"12px 18px",borderRadius:8,border:`1px solid ${C.border}`,display:"flex",flexWrap:"wrap",gap:8,alignItems:"center"}}>
          <span style={{fontSize:11,color:C.slv3}}>All Global Holding LLC · Wyoming, USA</span>
          <span style={{color:C.border}}>·</span>
          <a href="mailto:luisdelator@vmomentums.info" style={{fontSize:11,color:C.blu}}>luisdelator@vmomentums.info</a>
          <span style={{color:C.border}}>·</span>
          <span className="mono" style={{color:C.slv3,fontSize:10}}>CLABE 722969010740807451</span>
        </div>
      </div>
    </section>
  );
}

/* CONTACTO */
function Contacto(){
  const [f,setF]=useState({nombre:"",empresa:"",tipo:"",mensaje:""});
  const [st,setSt]=useState<"idle"|"loading"|"ok"|"error">("idle");
  const send=async()=>{
    if(!f.nombre||f.nombre.length<2)return;
    setSt("loading");
    try{
      const r=await fetch("http://178.105.135.26:3003/lead",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...f,fuente:"vmomentum.site",servicio:f.tipo||"App/PWA"})});
      if(r.ok){setSt("ok");setF({nombre:"",empresa:"",tipo:"",mensaje:""});if(typeof window!=="undefined"&&(window as any).gtag)(window as any).gtag("event","conversion",{send_to:"AW-18205066708"});}
      else setSt("error");
    }catch{setSt("error");}
  };
  return(
    <section id="contacto" className="sec" style={{position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:460,height:280,background:"radial-gradient(ellipse,rgba(26,110,255,.07) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div className="wrap" style={{position:"relative",zIndex:1,maxWidth:560}}>
        <p className="label" style={{marginBottom:10,textAlign:"center"}}>Empieza hoy</p>
        <h2 className="t-h2" style={{textAlign:"center",marginBottom:8}}>Tu app en <span style={{color:C.blu}}>7 días.</span></h2>
        <p className="t-body" style={{textAlign:"center",marginBottom:36}}>Desde $12,000 MXN. Sin sorpresas. El código es tuyo.</p>
        {st==="ok"?(
          <div style={{textAlign:"center",padding:"36px 20px",borderRadius:10,border:`1px solid ${C.borderB}`,background:C.blu3}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:C.blu2,border:`1px solid ${C.blu}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",color:C.blu}}>{Ic.check}</div>
            <h3 style={{color:"#fff",fontWeight:600,fontSize:16,marginBottom:7}}>Mensaje recibido</h3>
            <p className="t-body" style={{fontSize:13}}>Te contactamos en menos de 2 horas por WhatsApp.</p>
          </div>
        ):(
          <div style={{borderRadius:10,border:`1px solid ${C.border}`,background:C.surf,padding:"24px 20px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
              {([["nombre","Nombre *","Tu nombre"],["empresa","Empresa","Tu negocio"]] as const).map(([k,l,ph])=>(
                <div key={k}>
                  <label className="label" style={{display:"block",marginBottom:5}}>{l}</label>
                  <input className="inp" value={(f as any)[k]} onChange={e=>setF(p=>({...p,[k]:e.target.value}))} placeholder={ph}/>
                </div>
              ))}
            </div>
            <div style={{marginBottom:10}}>
              <label className="label" style={{display:"block",marginBottom:5}}>¿Qué tipo de app?</label>
              <input className="inp" value={f.tipo} onChange={e=>setF(p=>({...p,tipo:e.target.value}))} placeholder="Ej: app de entregas, ERP, tienda en línea..."/>
            </div>
            <div style={{marginBottom:16}}>
              <label className="label" style={{display:"block",marginBottom:5}}>Mensaje (opcional)</label>
              <textarea className="inp" value={f.mensaje} onChange={e=>setF(p=>({...p,mensaje:e.target.value}))} placeholder="Cuéntanos más..." rows={3} style={{resize:"none"}}/>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={send} disabled={st==="loading"||!f.nombre} className="btn-p" style={{flex:1,opacity:(!f.nombre||st==="loading")?.5:1,cursor:(!f.nombre||st==="loading")?"not-allowed":"pointer"}}>
                {st==="loading"?"Enviando...":(<>Quiero mi app {Ic.arr}</>)}
              </button>
              <a href="https://wa.me/529984292748?text=Hola%2C+vi+V+Momentum+y+quiero+cotizar+mi+app" target="_blank" rel="noopener noreferrer" className="btn-g" style={{padding:"9px 14px",fontSize:12}}>WhatsApp</a>
            </div>
            {st==="error"&&<p style={{color:"#ef4444",fontSize:12,textAlign:"center",marginTop:10}}>Error. Escríbenos por WhatsApp.</p>}
          </div>
        )}
      </div>
    </section>
  );
}

/* FOOTER */
function Footer(){
  const cols=[
    {t:"Productos",ls:[["VForge","https://vforge.site"],["Vulcano","https://vforge.site/vulcano"],["Marketplace","https://vforge.site/marketplace"],["Precios","#precios"]]},
    {t:"Recursos", ls:[["Blog","#blog"],["Método CMP","#metodo"],["Integraciones","#integraciones"],["Apps","#apps"]]},
    {t:"Empresa",  ls:[["Legal","#legal"],["Contacto","#contacto"],["WhatsApp","https://wa.me/529984292748"],["LinkedIn","https://www.linkedin.com/company/v-momentum-/"]]},
  ];
  return(
    <footer style={{borderTop:`1px solid ${C.border}`,background:C.surf}}>
      <div className="wrap" style={{padding:"44px 24px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1.3fr repeat(3,1fr)",gap:28,marginBottom:36}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}>
              <div style={{width:26,height:26,borderRadius:6,background:C.bg,border:`1px solid ${C.borderB}`,display:"flex",alignItems:"center",justifyContent:"center"}}>{Ic.vlogo}</div>
              <span style={{color:"#fff",fontWeight:600,fontSize:13}}>V Momentum</span>
            </div>
            <p className="t-body" style={{fontSize:12,maxWidth:190,marginBottom:14}}>Fábrica de software premium. Apps PWA en 7 días con IA.</p>
            <div style={{display:"flex",gap:10}}>
              <a href="https://www.linkedin.com/company/v-momentum-/" target="_blank" rel="noopener noreferrer" style={{color:C.slv3,display:"flex",transition:"color .15s"}} onMouseOver={e=>(e.currentTarget.style.color="#fff")} onMouseOut={e=>(e.currentTarget.style.color=C.slv3)}>{Ic.li}</a>
              <a href="https://x.com/LuisVmomentums" target="_blank" rel="noopener noreferrer" style={{color:C.slv3,display:"flex",transition:"color .15s"}} onMouseOver={e=>(e.currentTarget.style.color="#fff")} onMouseOut={e=>(e.currentTarget.style.color=C.slv3)}>{Ic.tw}</a>
            </div>
          </div>
          {cols.map(c=>(
            <div key={c.t}>
              <p className="label" style={{marginBottom:12}}>{c.t}</p>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:7}}>
                {c.ls.map(([l,h])=><li key={l}><a href={h} style={{fontSize:12,color:C.slv2,transition:"color .15s"}} onMouseOver={e=>(e.currentTarget.style.color="#fff")} onMouseOut={e=>(e.currentTarget.style.color=C.slv2)}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:18,display:"flex",flexWrap:"wrap",justifyContent:"space-between",gap:6}}>
          <span style={{fontSize:11,color:C.slv3}}>© 2026 All Global Holding LLC · Wyoming, USA</span>
          <span className="mono" style={{color:C.slv3,fontSize:10}}>Built with VForge + Vulcano</span>
        </div>
      </div>
    </footer>
  );
}

export default function Home(){
  return(<>
    <style>{G}</style>
    <Nav/>
    <main>
      <Hero/>
      <Seals/>
      <Productos/>
      <Metodo/>
      <Apps/>
      <Integraciones/>
      <Precios/>
      <Blog/>
      <Legal/>
      <Contacto/>
    </main>
    <Footer/>
  </>);
}
