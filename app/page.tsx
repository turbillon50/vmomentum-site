"use client";
// Vibe: neon.tech — profundidad real, surfaces diferenciadas, logos CDN reales
// Paleta logo: #0a0a0f bg, #111118 surf, #1a2035 surf-elevated, #1a6eff azul, #c8d0e0 plata

import { useEffect, useState } from "react";

const C = {
  bg:      "#07080f",
  s1:      "#0d0f1a",   // surface nivel 1
  s2:      "#121525",   // surface nivel 2 — más elevada
  s3:      "#171a2e",   // surface nivel 3 — cards hover
  blu:     "#1a6eff",
  blu_l:   "rgba(26,110,255,0.15)",
  blu_xl:  "rgba(26,110,255,0.07)",
  slv:     "#c8d0e0",
  slv2:    "rgba(200,208,224,0.6)",
  slv3:    "rgba(200,208,224,0.28)",
  slv4:    "rgba(200,208,224,0.1)",
  bd:      "rgba(255,255,255,0.06)",
  bd_b:    "rgba(26,110,255,0.25)",
  bd_s:    "rgba(255,255,255,0.03)",
};

// Logos reales de CDN pública — todos verificados
const LOGOS = [
  { name:"Mercado Pago", url:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/MercadoPago_logo.svg/320px-MercadoPago_logo.svg.png",    href:"https://mercadopago.com.mx" },
  { name:"Stripe",       url:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/320px-Stripe_Logo%2C_revised_2016.svg.png", href:"https://stripe.com" },
  { name:"Clerk",        url:"https://clerk.com/v2/clerk-logo-dark.svg",          href:"https://clerk.com" },
  { name:"Neon",         url:"https://neon.tech/brand/neon-logo-dark-color.svg",  href:"https://neon.tech" },
  { name:"Vercel",       url:"https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png", href:"https://vercel.com" },
  { name:"WhatsApp",     url:"https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",         href:"https://wa.me/529984292748" },
  { name:"Anthropic",    url:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Anthropic_logo.svg/320px-Anthropic_logo.svg.png", href:"https://anthropic.com" },
  { name:"OpenAI",       url:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/320px-OpenAI_Logo.svg.png", href:"https://openai.com" },
  { name:"GitHub",       url:"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", href:"https://github.com/turbillon50" },
  { name:"Resend",       url:"https://resend.com/static/brand/resend-icon-black.png", href:"https://resend.com" },
  { name:"Twilio",       url:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Twilio-logo-red.svg/320px-Twilio-logo-red.svg.png", href:"https://twilio.com" },
  { name:"Airtable",     url:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Airtable_Logo.svg/320px-Airtable_Logo.svg.png", href:"https://airtable.com" },
  { name:"Next.js",      url:"https://nextjs.org/static/favicon/favicon-32x32.png", href:"https://nextjs.org" },
  { name:"Hetzner",      url:"https://www.hetzner.com/assets/Uploads/Hetzner-Logo.svg", href:"https://hetzner.com" },
  { name:"Google",       url:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png", href:"https://cloud.google.com" },
  { name:"Mapbox",       url:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Mapbox_logo_2019.svg/320px-Mapbox_logo_2019.svg.png", href:"https://mapbox.com" },
];

// SVG icons — geométricos, sin emojis
const I = {
  check: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  arr:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  ext:   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  menu:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  lock:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  globe: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  cpu:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  bolt:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  shield:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2l7 3v6c0 5-3.5 9-7 10C8.5 20 5 16 5 11V5l7-3z"/></svg>,
  card:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  db:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>,
  file:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>,
  li:    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  tw:    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  vmark: <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M2 4l8 12L18 4" stroke="#1a6eff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

const CSS = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth;overflow-x:clip}
  body{background:${C.bg};color:${C.slv};font-family:-apple-system,'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
  ::selection{background:rgba(26,110,255,.25);color:#fff}
  ::-webkit-scrollbar{width:3px}
  ::-webkit-scrollbar-thumb{background:rgba(26,110,255,.35);border-radius:3px}
  a{text-decoration:none;color:inherit}

  /* TIPOGRAFÍA */
  .hero{font-size:clamp(32px,5.5vw,74px);font-weight:800;letter-spacing:-0.035em;line-height:1.0;color:#fff}
  .h2{font-size:clamp(26px,4vw,48px);font-weight:700;letter-spacing:-0.03em;line-height:1.1;color:#fff}
  .h3{font-size:clamp(15px,1.8vw,19px);font-weight:600;letter-spacing:-0.015em;color:#fff}
  .body{font-size:14px;line-height:1.72;color:${C.slv2}}
  .mono{font-family:'SF Mono','Fira Code','Cascadia Code',monospace}
  .lbl{font-family:'SF Mono','Fira Code',monospace;font-size:10px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:${C.slv3}}

  /* BOTONES */
  .bp{display:inline-flex;align-items:center;justify-content:center;gap:6px;background:${C.blu};color:#fff;font-size:13px;font-weight:600;border-radius:8px;padding:10px 20px;border:none;cursor:pointer;transition:all .15s;white-space:nowrap;text-decoration:none}
  .bp:hover{background:#1558e0;box-shadow:0 0 24px rgba(26,110,255,.4);transform:translateY(-1px)}
  .bg{display:inline-flex;align-items:center;justify-content:center;gap:6px;background:transparent;color:${C.slv};font-size:13px;font-weight:500;border-radius:8px;padding:9px 18px;border:1px solid ${C.bd};cursor:pointer;transition:all .15s;white-space:nowrap;text-decoration:none}
  .bg:hover{border-color:${C.slv4};color:#fff;background:rgba(255,255,255,.04)}

  /* SURFACES con profundidad real */
  .card{
    background:${C.s1};
    border:1px solid ${C.bd};
    border-radius:12px;
    padding:22px;
    transition:border-color .2s,background .2s,transform .2s;
    position:relative;
  }
  .card::before{
    content:'';position:absolute;inset:0;border-radius:12px;
    background:linear-gradient(135deg,rgba(255,255,255,.03) 0%,transparent 60%);
    pointer-events:none;
  }
  .card:hover{border-color:${C.bd_b};background:${C.s2};transform:translateY(-2px)}

  /* CARD ELEVADA — glassmorphism suave */
  .card-hi{
    background:linear-gradient(135deg,${C.s2} 0%,${C.s1} 100%);
    border:1px solid rgba(255,255,255,.1);
    border-radius:14px;
    padding:28px;
    position:relative;
    overflow:hidden;
  }
  .card-hi::after{
    content:'';position:absolute;top:0;left:0;right:0;height:1px;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);
  }

  /* INPUT */
  .inp{width:100%;background:${C.s1};border:1px solid ${C.bd};border-radius:8px;padding:10px 13px;font-size:13px;color:#fff;outline:none;transition:border-color .15s;font-family:inherit}
  .inp::placeholder{color:${C.slv3}}
  .inp:focus{border-color:${C.blu};box-shadow:0 0 0 3px rgba(26,110,255,.1)}

  /* LAYOUT */
  .w{max-width:1080px;margin:0 auto;padding:0 22px}
  .sec{padding:88px 0}
  .nl{font-size:13px;color:${C.slv2};padding:5px 10px;border-radius:6px;transition:color .15s}
  .nl:hover{color:#fff}

  /* GRIDS */
  .g2{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
  .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
  .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}

  /* DOT VIVO */
  .dot{width:6px;height:6px;border-radius:50%;background:#22c55e;box-shadow:0 0 7px #22c55e88;flex-shrink:0;animation:pulse 2s infinite}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}

  /* TERMINAL */
  .term{background:#070810;border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:18px 20px;font-family:'SF Mono','Fira Code',monospace;font-size:12px;line-height:1.9;position:relative}
  .term::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(26,110,255,.3),transparent)}
  .tp{color:${C.slv3}} .tc{color:#e2e8f0} .to{color:#4ade80} .tm{color:${C.slv3}}

  /* SEPARADOR con glow */
  .sep{height:1px;background:linear-gradient(90deg,transparent,${C.bd},transparent)}
  .sep-b{height:1px;background:linear-gradient(90deg,transparent,rgba(26,110,255,.2),transparent)}

  /* RESPONSIVE */
  @media(max-width:900px){.g4{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:768px){
    .g2,.g4-m{grid-template-columns:1fr}
    .g3{grid-template-columns:repeat(2,1fr)}
    .hm{display:none!important}
    .sm{display:flex!important}
    .sec{padding:60px 0}
    .hero{font-size:clamp(30px,8vw,52px)}
  }
  @media(min-width:769px){.sm{display:none!important}}
  @media(max-width:520px){.g3{grid-template-columns:1fr}}
  @media(max-width:640px){.g4{grid-template-columns:repeat(2,1fr)}}
`;

/* ── NAV ── */
function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [["Productos","#productos"],["Método","#metodo"],["Industrias","#apps"],["Integraciones","#ints"],["Precios","#precios"],["Blog","#blog"]];
  return (<>
    <nav style={{ position:"fixed",inset:"0 0 auto",zIndex:100, background: solid ? "rgba(7,8,15,.94)" : "transparent", backdropFilter: solid ? "blur(18px)" : "none", borderBottom: solid ? `1px solid ${C.bd}` : "1px solid transparent", transition:"all .3s" }}>
      <div className="w" style={{ height:58, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <a href="#" style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:28, height:28, borderRadius:7, background:C.s2, border:`1px solid ${C.bd_b}`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 12px rgba(26,110,255,.2)" }}>
            {I.vmark}
          </div>
          <div style={{ lineHeight:1.15 }}>
            <span style={{ display:"block", color:"#fff", fontWeight:700, fontSize:13.5, letterSpacing:"-.01em" }}>V Momentum</span>
            <span style={{ display:"block", fontFamily:"SF Mono,monospace", fontSize:8.5, color:C.blu, letterSpacing:".14em", textTransform:"uppercase" }}>SaaS · Technology · Apps</span>
          </div>
        </a>
        <div className="hm" style={{ display:"flex", gap:2 }}>
          {links.map(([l,h]) => <a key={h} href={h} className="nl">{l}</a>)}
        </div>
        <div className="hm" style={{ display:"flex", alignItems:"center", gap:10 }}>
          <a href="https://www.linkedin.com/company/v-momentum-/" target="_blank" rel="noopener noreferrer" style={{ color:C.slv3, display:"flex", transition:"color .15s" }} onMouseOver={e=>(e.currentTarget.style.color="#fff")} onMouseOut={e=>(e.currentTarget.style.color=C.slv3)}>{I.li}</a>
          <a href="https://x.com/LuisVmomentums" target="_blank" rel="noopener noreferrer" style={{ color:C.slv3, display:"flex", transition:"color .15s" }} onMouseOver={e=>(e.currentTarget.style.color="#fff")} onMouseOut={e=>(e.currentTarget.style.color=C.slv3)}>{I.tw}</a>
          <div style={{ width:1, height:16, background:C.bd, margin:"0 2px" }}/>
          <a href="https://vforge.site" target="_blank" rel="noopener noreferrer" className="bg" style={{ fontSize:12, padding:"6px 12px" }}>VForge {I.ext}</a>
          <a href="#contacto" className="bp" style={{ fontSize:12, padding:"7px 16px" }}>Cotizar app</a>
        </div>
        <button className="sm" onClick={()=>setOpen(v=>!v)} style={{ background:"none", border:"none", color:C.slv, cursor:"pointer", padding:6 }}>{open?I.close:I.menu}</button>
      </div>
    </nav>
    {open && (
      <div style={{ position:"fixed", inset:"58px 0 0", zIndex:99, background:"rgba(7,8,15,.97)", backdropFilter:"blur(20px)", borderTop:`1px solid ${C.bd}`, display:"flex", flexDirection:"column" }}>
        {links.map(([l,h]) => <a key={h} href={h} onClick={()=>setOpen(false)} style={{ padding:"16px 24px", fontSize:16, color:C.slv, borderBottom:`1px solid ${C.bd}`, transition:"color .15s" }} onMouseOver={e=>(e.currentTarget.style.color="#fff")} onMouseOut={e=>(e.currentTarget.style.color=C.slv)}>{l}</a>)}
        <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:8 }}>
          <a href="#contacto" onClick={()=>setOpen(false)} className="bp" style={{ textAlign:"center" }}>Cotizar mi app</a>
          <a href="https://vforge.site" target="_blank" rel="noopener noreferrer" className="bg" style={{ textAlign:"center", justifyContent:"center" }}>Ir a VForge {I.ext}</a>
        </div>
      </div>
    )}
  </>);
}

/* ── HERO ── */
function Hero() {
  const words = ["apps PWA","sistemas ERP","plataformas fintech","agentes IA","marketplaces"];
  const [idx, setIdx] = useState(0);
  const [vis, setVis] = useState(true);
  useEffect(() => {
    const t = setInterval(() => { setVis(false); setTimeout(() => { setIdx(v => (v+1)%words.length); setVis(true); }, 200); }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ position:"relative", paddingTop:128, paddingBottom:80, overflow:"hidden" }}>
      {/* Grid de fondo — 60px como neon.tech */}
      <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)`, backgroundSize:"60px 60px", pointerEvents:"none" }}/>
      {/* Glow azul central único */}
      <div style={{ position:"absolute", top:"25%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:500, background:"radial-gradient(ellipse,rgba(26,110,255,.11) 0%,transparent 62%)", pointerEvents:"none" }}/>
      {/* Glow sutil derecha */}
      <div style={{ position:"absolute", top:"60%", right:"-10%", width:400, height:400, background:"radial-gradient(ellipse,rgba(26,110,255,.05) 0%,transparent 65%)", pointerEvents:"none" }}/>

      <div className="w" style={{ position:"relative", zIndex:1 }}>
        {/* Badge */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:28, padding:"5px 14px 5px 10px", borderRadius:999, border:`1px solid ${C.bd_b}`, background:C.blu_xl }}>
          <span className="dot"/>
          <span className="mono" style={{ color:C.blu, fontSize:11.5, letterSpacing:".02em" }}>Fábrica de software · México · 2026</span>
        </div>

        {/* Headline */}
        <h1 className="hero" style={{ maxWidth:820, marginBottom:20 }}>
          Construimos{" "}
          <span style={{ color:C.blu, textShadow:`0 0 40px rgba(26,110,255,.35)`, transition:"opacity .2s", opacity:vis?1:0, display:"inline-block", minWidth:300 }}>
            {words[idx]}
          </span>
          <br/>
          <span style={{ color:C.slv2, fontWeight:300 }}>que escalan de verdad.</span>
        </h1>

        <p className="body" style={{ maxWidth:500, marginBottom:34, fontSize:16, lineHeight:1.7 }}>
          V Momentum es la fábrica de software más rápida de México.{" "}
          <span style={{ color:C.slv, fontWeight:500 }}>De idea a producción en 7 días.</span>{" "}
          PWA, auth, pagos y IA incluidos desde el día 1.
        </p>

        {/* CTAs */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:44 }}>
          <a href="#contacto" className="bp" style={{ fontSize:14, padding:"11px 24px" }}>Quiero mi app {I.arr}</a>
          <a href="#metodo" className="bg" style={{ fontSize:14, padding:"11px 22px" }}>Cómo funciona</a>
        </div>

        {/* Terminal block */}
        <div className="term" style={{ maxWidth:420, marginBottom:56 }}>
          <span className="tp">$ </span><span className="tc">npx vmomentum init</span><br/>
          <span className="to">✓ Auth · DB · Deploy · IA listos</span><br/>
          <span className="tm"># De idea a producción en 7 días</span>
        </div>

        {/* Stats — border-top exacto como neon.tech */}
        <div className="sep-b" style={{ marginBottom:28 }}/>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"14px 44px" }}>
          {[["15+","Apps en producción"],["7 días","Tiempo promedio"],["$12,000","MXN desde"],["100%","Código tuyo"]].map(([v,l]) => (
            <div key={l}>
              <div className="mono" style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:700, color:"#fff", letterSpacing:"-.03em", lineHeight:1 }}>{v}</div>
              <div className="lbl" style={{ marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SELLOS ── */
const SEALS = [
  {i:I.lock,  t:"Auth con Clerk",   s:"Enterprise-grade"},
  {i:I.card,  t:"MP Certificado",   s:"Checkout Pro oficial"},
  {i:I.db,    t:"Neon Postgres",    s:"AES-256 · TLS"},
  {i:I.globe, t:"Vercel Edge",      s:"150+ regiones"},
  {i:I.cpu,   t:"Claude AI",        s:"Integrado nativamente"},
  {i:I.shield,t:"SSL · HTTPS",      s:"Todos los proyectos"},
  {i:I.file,  t:"Contrato digital", s:"Firma electrónica"},
  {i:I.bolt,  t:"SLA 99.5%",        s:"Uptime garantizado"},
];
function Seals() {
  return (
    <div style={{ background:C.s1, borderTop:`1px solid ${C.bd}`, borderBottom:`1px solid ${C.bd}` }}>
      <div className="w" style={{ padding:"28px 22px" }}>
        <p className="lbl" style={{ textAlign:"center", marginBottom:18 }}>Certificado · Validado · Seguro</p>
        <div className="g4">
          {SEALS.map(s => (
            <div key={s.t} style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 13px", borderRadius:9, border:`1px solid ${C.bd}`, background:C.bg, transition:"border-color .2s" }}
              onMouseOver={e=>(e.currentTarget.style.borderColor=C.bd_b)} onMouseOut={e=>(e.currentTarget.style.borderColor=C.bd)}>
              <span style={{ color:C.blu, display:"flex", flexShrink:0 }}>{s.i}</span>
              <div>
                <div style={{ fontSize:12, fontWeight:600, color:"#fff", lineHeight:1.2 }}>{s.t}</div>
                <div style={{ fontSize:10, color:C.slv3, marginTop:2 }}>{s.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── PRODUCTOS ── */
const PRODS = [
  {n:"VForge",       tag:"La plataforma", d:"Convierte tu idea en una app real. PWA, móvil o MCP — desplegada a producción con dominio, DB y panel admin en días, no meses.", href:"https://vforge.site"},
  {n:"Vulcano",      tag:"Copiloto IA",   d:"La IA que construye contigo. Hablas y ejecuta: código, deploys, integraciones. Memoria persistente y contexto de todos tus proyectos.", href:"https://vforge.site/vulcano"},
  {n:"CMP Protocol", tag:"Nuestro método",d:"Context Minimum Protocol — 6 pasos de tu idea a un producto real: captura, análisis, diseño, roadmap, scope y deploy.", href:"#metodo"},
  {n:"Marketplace",  tag:"Apps listas",   d:"Catálogo de apps preconfiguradas para tu industria. Elige, personaliza y despliega en horas. Código incluido.", href:"https://vforge.site/marketplace"},
  {n:"MCP Server",   tag:"Conectividad",  d:"Conecta Claude, Cursor, VS Code y cualquier agente IA a tu proyecto vía protocolo MCP nativo con OAuth.", href:"#contacto"},
  {n:"Workspace",    tag:"Tu panel",      d:"Dashboard centralizado: gestiona tu app, contratos, timeline, tokens y comunicación con el equipo.", href:"https://vforge.site/workspace"},
];
function Productos() {
  const [a, setA] = useState(0);
  const p = PRODS[a];
  return (
    <section id="productos" className="sec" style={{ borderBottom:`1px solid ${C.bd}` }}>
      <div className="w">
        <p className="lbl" style={{ marginBottom:10 }}>Nuestros productos</p>
        <h2 className="h2" style={{ marginBottom:40 }}>Una fábrica.<br/><span style={{ color:C.slv2, fontWeight:300 }}>Seis herramientas.</span></h2>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:20 }}>
          {PRODS.map((pr,i) => (
            <button key={pr.n} onClick={()=>setA(i)} style={{ padding:"6px 14px", borderRadius:7, fontSize:12, fontWeight:500, cursor:"pointer", transition:"all .15s", border:"1px solid", borderColor:a===i?C.blu:C.bd, background:a===i?C.blu_l:"transparent", color:a===i?"#fff":C.slv2 }}>{pr.n}</button>
          ))}
        </div>
        <div key={a} className="card-hi" style={{ display:"flex", flexWrap:"wrap", gap:28 }}>
          <div style={{ flex:"1 1 260px" }}>
            <span className="mono" style={{ fontSize:10, color:C.blu, textTransform:"uppercase", letterSpacing:".1em", display:"block", marginBottom:12 }}>{p.tag}</span>
            <h3 className="h3" style={{ fontSize:"clamp(22px,3vw,32px)", marginBottom:12 }}>{p.n}</h3>
            <p className="body" style={{ maxWidth:420, marginBottom:22, fontSize:14 }}>{p.d}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              <a href="#contacto" className="bp" style={{ fontSize:12 }}>Empezar {I.arr}</a>
              <a href={p.href} target={p.href.startsWith("http")?"_blank":"_self"} rel="noopener noreferrer" className="bg" style={{ fontSize:12 }}>Ver más {I.ext}</a>
            </div>
          </div>
          <div style={{ flex:"0 0 200px", minWidth:170 }}>
            <div style={{ background:C.bg, borderRadius:10, border:`1px solid ${C.bd}`, padding:"16px 18px" }}>
              <p className="lbl" style={{ marginBottom:12 }}>Siempre incluye</p>
              {["Deploy en Vercel","Auth con Clerk","DB con Neon","Código en tu GitHub","Soporte post-launch","Documentación"].map(f => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:7, padding:"6px 0", borderBottom:`1px solid ${C.bd}`, fontSize:12, color:C.slv2 }}>
                  <span style={{ color:C.blu, display:"flex", flexShrink:0 }}>{I.check}</span>{f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── MÉTODO ── */
const STEPS = [
  {n:"01", t:"Describes tu idea",   d:"WhatsApp o formulario. Sin demos infinitas.", href:"https://wa.me/529984292748"},
  {n:"02", t:"CMP en 48 h",         d:"Roadmap, módulos, costo y timeline. Sin sorpresas.", href:"#contacto"},
  {n:"03", t:"Construimos en vivo", d:"La app funcionando en tu celular cada día.", href:"#contacto"},
  {n:"04", t:"El código es tuyo",   d:"GitHub tuyo, dominio tuyo, Vercel tuyo.", href:"https://github.com/turbillon50"},
];
function Metodo() {
  return (
    <section id="metodo" className="sec" style={{ background:C.s1, borderBottom:`1px solid ${C.bd}` }}>
      <div className="w">
        <p className="lbl" style={{ marginBottom:10 }}>Cómo funciona</p>
        <h2 className="h2" style={{ marginBottom:40 }}>De idea a producción<br/><span style={{ color:C.blu }}>en 4 pasos.</span></h2>
        <div className="g4">
          {STEPS.map(s => (
            <a key={s.n} href={s.href} target={s.href.startsWith("http")?"_blank":"_self"} rel="noopener noreferrer" className="card" style={{ display:"block" }}>
              <span className="mono" style={{ color:C.blu, display:"block", marginBottom:14, fontSize:12 }}>{s.n}</span>
              <h3 className="h3" style={{ fontSize:15, marginBottom:9 }}>{s.t}</h3>
              <p className="body" style={{ fontSize:13 }}>{s.d}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── APPS ── */
const APPS = [
  {t:"Fintech & Crédito",     d:"Microcréditos, scoring, OXXO Pay, cobranza automática.",   href:"#contacto"},
  {t:"Movilidad & Logística", d:"Ride-hailing, GPS, flotas, tarifas dinámicas.",             href:"#contacto"},
  {t:"Restaurantes & Food",   d:"Pedidos online, mesas, cocina digital, pagos en app.",       href:"#contacto"},
  {t:"Salud & Clínicas",      d:"Expediente, citas, telemedicina, recordatorios.",            href:"#contacto"},
  {t:"Construcción & RRHH",   d:"Asistencia, obra, inventario, nómina.",                     href:"#contacto"},
  {t:"Educación & Cursos",    d:"LMS propio, video, evaluaciones, suscripciones.",            href:"#contacto"},
  {t:"eCommerce & Retail",    d:"Tienda PWA, inventario, POS, multi-sucursal.",               href:"#contacto"},
  {t:"Real Estate",           d:"Marketplace, firma digital, pagos fraccionados.",            href:"#contacto"},
  {t:"Deportes & Fitness",    d:"Academias, rutinas, torneos, ranking en vivo.",              href:"#contacto"},
  {t:"Turismo & Hospitality", d:"Reservas, check-in, guías locales, multi-divisa.",           href:"#contacto"},
  {t:"Entretenimiento",       d:"Redes verticales, artistas, streaming propio.",              href:"#contacto"},
  {t:"ERP Personalizado",     d:"Sistemas a la medida. Si lo imaginas, lo construimos.",      href:"#contacto"},
];
function Apps() {
  return (
    <section id="apps" className="sec" style={{ borderBottom:`1px solid ${C.bd}` }}>
      <div className="w">
        <p className="lbl" style={{ marginBottom:10 }}>Qué construimos</p>
        <h2 className="h2" style={{ marginBottom:40 }}>12 industrias.<br/><span style={{ color:C.slv2, fontWeight:300 }}>Un solo equipo.</span></h2>
        <div className="g3">
          {APPS.map(a => (
            <a key={a.t} href={a.href} className="card" style={{ display:"block" }}>
              <h3 className="h3" style={{ fontSize:13, marginBottom:7 }}>{a.t}</h3>
              <p className="body" style={{ fontSize:12 }}>{a.d}</p>
            </a>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:28 }}>
          <a href="#contacto" className="bg" style={{ fontSize:13 }}>¿Tu industria no está? La construimos igual {I.arr}</a>
        </div>
      </div>
    </section>
  );
}

/* ── INTEGRACIONES — logos reales de CDN ── */
function Integraciones() {
  return (
    <section id="ints" className="sec" style={{ background:C.s1, borderBottom:`1px solid ${C.bd}` }}>
      <div className="w">
        <p className="lbl" style={{ marginBottom:10, textAlign:"center" }}>Ecosistema</p>
        <h2 className="h2" style={{ marginBottom:12, textAlign:"center" }}>Conectado a todo.</h2>
        <p className="body" style={{ textAlign:"center", maxWidth:420, margin:"0 auto 40px" }}>Integraciones production-ready desde el primer día. Sin configuración manual.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(100px,1fr))", gap:10 }}>
          {LOGOS.map(lg => (
            <a key={lg.name} href={lg.href} target="_blank" rel="noopener noreferrer" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, padding:"14px 8px", borderRadius:10, border:`1px solid ${C.bd}`, background:C.bg, transition:"all .2s", textDecoration:"none" }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = C.bd_b; (e.currentTarget as HTMLElement).style.background = C.s1; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = C.bd; (e.currentTarget as HTMLElement).style.background = C.bg; (e.currentTarget as HTMLElement).style.transform = "none"; }}
            >
              <div style={{ width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <img src={lg.url} alt={lg.name} width={28} height={28} style={{ objectFit:"contain", filter:"brightness(1.1)" }}
                  onError={e => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                    const parent = el.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span style="font-family:SF Mono,monospace;font-size:9px;color:rgba(200,208,224,0.4);text-align:center">${lg.name.slice(0,3)}</span>`;
                    }
                  }}
                />
              </div>
              <span className="lbl" style={{ fontSize:9, textAlign:"center", lineHeight:1.3 }}>{lg.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PRECIOS ── */
const PLANS = [
  { n:"Starter",    p:"$12,000",  sub:"MXN · pago único", hot:false, href:"#contacto",
    fs:["PWA instalable iOS & Android","Hasta 3 módulos","Auth con Clerk","DB con Neon","Deploy en Vercel","Repo en tu GitHub"] },
  { n:"Pro",        p:"$22,000",  sub:"MXN · pago único", hot:true,  href:"#contacto",
    fs:["Todo Starter +","Hasta 8 módulos","Pagos MP / Stripe","WhatsApp notifications","Email con Resend","Panel admin completo","IA con Vulcano"] },
  { n:"Enterprise", p:"A cotizar",sub:"según alcance",    hot:false, href:"https://wa.me/529984292748",
    fs:["Todo Pro +","Módulos ilimitados","Multi-sucursal & tenant","Automatizaciones MCP","Agentes IA propios","Soporte prioritario 24/7"] },
];
function Precios() {
  return (
    <section id="precios" className="sec" style={{ borderBottom:`1px solid ${C.bd}` }}>
      <div className="w">
        <p className="lbl" style={{ marginBottom:10, textAlign:"center" }}>Precios</p>
        <h2 className="h2" style={{ marginBottom:12, textAlign:"center" }}>Transparentes. Sin letra chica.</h2>
        <p className="body" style={{ textAlign:"center", maxWidth:420, margin:"0 auto 40px" }}>Pago único. El código, el dominio y la infra son tuyos desde el primer día.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:14 }}>
          {PLANS.map(pl => (
            <div key={pl.n} style={{ borderRadius:12, background: pl.hot ? `linear-gradient(135deg,${C.s2} 0%,${C.s1} 100%)` : C.s1, border:`1px solid ${pl.hot ? C.bd_b : C.bd}`, padding:"26px 22px", display:"flex", flexDirection:"column", position:"relative", boxShadow: pl.hot ? `0 0 40px rgba(26,110,255,.12)` : "none" }}>
              {pl.hot && <>
                <span style={{ position:"absolute", top:-10, left:20, background:C.blu, color:"#fff", fontSize:10, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", padding:"2px 10px", borderRadius:999 }}>Popular</span>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${C.blu},transparent)` }}/>
              </>}
              <p className="lbl" style={{ marginBottom:9 }}>{pl.n}</p>
              <div className="mono" style={{ fontSize:"clamp(26px,4vw,34px)", fontWeight:700, color:"#fff", letterSpacing:"-.03em", lineHeight:1 }}>{pl.p}</div>
              <div style={{ fontSize:11, color:C.slv3, marginTop:4, marginBottom:20 }}>{pl.sub}</div>
              <ul style={{ flex:1, listStyle:"none", marginBottom:20, display:"flex", flexDirection:"column", gap:9 }}>
                {pl.fs.map(f => (
                  <li key={f} style={{ display:"flex", alignItems:"center", gap:7, fontSize:12, color:C.slv2 }}>
                    <span style={{ color:C.blu, display:"flex", flexShrink:0 }}>{I.check}</span>{f}
                  </li>
                ))}
              </ul>
              <a href={pl.href} target={pl.href.startsWith("http")?"_blank":"_self"} rel="noopener noreferrer" className={pl.hot ? "bp" : "bg"} style={{ display:"block", textAlign:"center", padding:"10px", fontSize:13 }}>
                Cotizar este plan {I.arr}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── BLOG ── */
const POSTS = [
  {tag:"Producto", f:"Jun 2026", t:"CMP: de idea a roadmap en 48 horas",             e:"El Context Minimum Protocol captura tu idea, la analiza con IA y entrega un roadmap antes de escribir código.", href:"https://vforge.site/blog"},
  {tag:"Técnico",  f:"May 2026", t:"Por qué todas nuestras apps son PWA",             e:"Instala en iOS y Android sin App Store, se actualiza sin permiso del usuario y cuesta 10x menos de mantener.", href:"https://vforge.site/blog"},
  {tag:"IA",       f:"May 2026", t:"Vulcano: el copiloto con memoria persistente",    e:"Memoria en Neon, contexto de tus repos y capacidad de ejecutar comandos. Así funciona nuestro enjambre.", href:"https://vforge.site/blog"},
  {tag:"Pagos MX", f:"Abr 2026", t:"Mercado Pago + Stripe + OXXO Pay en 2026",       e:"Qué elegir según tu mercado, cómo combinar procesadores y por qué la certificación Checkout Pro importa.", href:"https://vforge.site/blog"},
  {tag:"Tutorial", f:"Abr 2026", t:"MCP Server: conecta Claude a tu proyecto",        e:"Despliega un servidor MCP en Hetzner, configura OAuth con Clerk y permite que agentes IA lean tu DB.", href:"https://vforge.site/blog"},
  {tag:"Stack",    f:"Mar 2026", t:"Next.js 16 + Neon + Vercel: el stack que no falla",e:"Por qué este stack para cada proyecto y cómo permite entregar en 7 días sin sacrificar escalabilidad.", href:"https://vforge.site/blog"},
];
function Blog() {
  return (
    <section id="blog" className="sec" style={{ background:C.s1, borderBottom:`1px solid ${C.bd}` }}>
      <div className="w">
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:36 }}>
          <div>
            <p className="lbl" style={{ marginBottom:9 }}>Blog</p>
            <h2 className="h2">Lo que sabemos,<br/><span style={{ color:C.slv2, fontWeight:300 }}>lo publicamos.</span></h2>
          </div>
          <a href="https://vforge.site/blog" target="_blank" rel="noopener noreferrer" className="bg" style={{ fontSize:12 }}>Ver todos {I.ext}</a>
        </div>
        <div className="g3">
          {POSTS.map(p => (
            <a key={p.t} href={p.href} target="_blank" rel="noopener noreferrer" className="card" style={{ display:"block" }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:12 }}>
                <span className="mono" style={{ fontSize:9, color:C.blu, textTransform:"uppercase", letterSpacing:".1em", background:C.blu_xl, border:`1px solid ${C.bd_b}`, borderRadius:4, padding:"2px 7px" }}>{p.tag}</span>
                <span className="lbl" style={{ fontSize:9 }}>{p.f}</span>
              </div>
              <h3 className="h3" style={{ fontSize:13, marginBottom:7, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{p.t}</h3>
              <p className="body" style={{ fontSize:12, display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{p.e}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── LEGAL ── */
function Legal() {
  const [open, setOpen] = useState<string|null>(null);
  const docs = [
    {id:"t", t:"Términos y Condiciones", b:"V Momentum es operado por All Global Holding LLC, Wyoming, EE.UU. El contrato se formaliza con firma electrónica y 50% anticipo. El cliente recibe código fuente completo, repo en su GitHub y dominio a su nombre. V Momentum no retiene propiedad intelectual. Garantía de 30 días post-entrega."},
    {id:"p", t:"Privacidad",             b:"Recopilamos: nombre, empresa, correo y WhatsApp. Almacenados en Neon Postgres (AES-256, TLS) y Airtable. No vendemos datos. Eliminación en 30 días a solicitud. Analytics: Google AW-18205066708. Contacto: luisdelator@vmomentums.info"},
    {id:"c", t:"Modelo de Contrato",     b:"(1) Alcance MVP detallado. (2) Timeline con fechas comprometidas. (3) Módulos incluidos y excluidos. (4) 50% anticipo, 50% contra entrega. (5) Garantía 30 días. (6) Propiedad intelectual 100% del cliente. CLABE: 722969010740807451."},
    {id:"s", t:"SLA y Garantías",        b:"Respuesta < 2 h hábiles vía WhatsApp. Entrega MVP en plazo acordado. Uptime ≥ 99.5% en Vercel. Bugs críticos < 24 h durante garantía. Backups automáticos diarios en Neon Postgres."},
  ];
  return (
    <section id="legal" className="sec" style={{ borderBottom:`1px solid ${C.bd}` }}>
      <div className="w">
        <p className="lbl" style={{ marginBottom:10 }}>Legal</p>
        <h2 className="h2" style={{ marginBottom:36 }}>Todo claro desde el inicio.</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:6, maxWidth:680 }}>
          {docs.map(d => (
            <div key={d.id} style={{ borderRadius:9, border:`1px solid ${C.bd}`, background:C.s1, overflow:"hidden" }}>
              <button onClick={()=>setOpen(open===d.id?null:d.id)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", background:"none", border:"none", cursor:"pointer", color:"#fff", gap:12 }}>
                <span style={{ fontWeight:600, fontSize:13 }}>{d.t}</span>
                <span style={{ color:C.slv3, transform:open===d.id?"rotate(180deg)":"none", transition:"transform .2s", fontSize:13 }}>▾</span>
              </button>
              {open===d.id && (
                <div style={{ padding:"0 18px 18px" }}>
                  <div style={{ borderTop:`1px solid ${C.bd}`, paddingTop:14 }}>
                    <p className="body" style={{ fontSize:12 }}>{d.b}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop:18, padding:"12px 18px", borderRadius:8, border:`1px solid ${C.bd}`, display:"flex", flexWrap:"wrap", gap:10, alignItems:"center", background:C.s1 }}>
          <span style={{ fontSize:11, color:C.slv3 }}>All Global Holding LLC · Wyoming, USA</span>
          <span style={{ color:C.bd }}>·</span>
          <a href="mailto:luisdelator@vmomentums.info" style={{ fontSize:11, color:C.blu }}>luisdelator@vmomentums.info</a>
          <span style={{ color:C.bd }}>·</span>
          <span className="mono" style={{ color:C.slv3, fontSize:10 }}>CLABE 722969010740807451</span>
        </div>
      </div>
    </section>
  );
}

/* ── CONTACTO ── */
function Contacto() {
  const [f, setF] = useState({nombre:"",empresa:"",tipo:"",mensaje:""});
  const [st, setSt] = useState<"idle"|"loading"|"ok"|"error">("idle");
  const send = async () => {
    if (!f.nombre || f.nombre.length < 2) return;
    setSt("loading");
    try {
      const r = await fetch("http://178.105.135.26:3003/lead", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({...f, fuente:"vmomentum.site", servicio:f.tipo||"App/PWA"}),
      });
      if (r.ok) {
        setSt("ok"); setF({nombre:"",empresa:"",tipo:"",mensaje:""});
        if (typeof window!=="undefined" && (window as any).gtag)
          (window as any).gtag("event","conversion",{send_to:"AW-18205066708"});
      } else setSt("error");
    } catch { setSt("error"); }
  };
  return (
    <section id="contacto" className="sec" style={{ position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:300, background:"radial-gradient(ellipse,rgba(26,110,255,.08) 0%,transparent 68%)", pointerEvents:"none" }}/>
      <div className="w" style={{ position:"relative", zIndex:1, maxWidth:560 }}>
        <p className="lbl" style={{ marginBottom:10, textAlign:"center" }}>Empieza hoy</p>
        <h2 className="h2" style={{ textAlign:"center", marginBottom:8 }}>Tu app en <span style={{ color:C.blu, textShadow:"0 0 30px rgba(26,110,255,.4)" }}>7 días.</span></h2>
        <p className="body" style={{ textAlign:"center", marginBottom:36 }}>Desde $12,000 MXN. Sin sorpresas. El código es tuyo.</p>
        {st==="ok" ? (
          <div style={{ textAlign:"center", padding:"36px 20px", borderRadius:12, border:`1px solid ${C.bd_b}`, background:C.blu_xl }}>
            <div style={{ width:36, height:36, borderRadius:"50%", background:C.blu_l, border:`1px solid ${C.blu}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", color:C.blu }}>{I.check}</div>
            <h3 style={{ color:"#fff", fontWeight:600, fontSize:16, marginBottom:7 }}>Mensaje recibido</h3>
            <p className="body" style={{ fontSize:13 }}>Te contactamos en menos de 2 horas por WhatsApp.</p>
          </div>
        ) : (
          <div style={{ borderRadius:12, border:`1px solid ${C.bd}`, background:C.s1, padding:"24px 22px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
              {([["nombre","Nombre *","Tu nombre"],["empresa","Empresa","Tu negocio"]] as const).map(([k,l,ph]) => (
                <div key={k}>
                  <label className="lbl" style={{ display:"block", marginBottom:5 }}>{l}</label>
                  <input className="inp" value={(f as any)[k]} onChange={e=>setF(p=>({...p,[k]:e.target.value}))} placeholder={ph}/>
                </div>
              ))}
            </div>
            <div style={{ marginBottom:10 }}>
              <label className="lbl" style={{ display:"block", marginBottom:5 }}>¿Qué tipo de app?</label>
              <input className="inp" value={f.tipo} onChange={e=>setF(p=>({...p,tipo:e.target.value}))} placeholder="Ej: app de entregas, ERP, tienda en línea..."/>
            </div>
            <div style={{ marginBottom:16 }}>
              <label className="lbl" style={{ display:"block", marginBottom:5 }}>Mensaje (opcional)</label>
              <textarea className="inp" value={f.mensaje} onChange={e=>setF(p=>({...p,mensaje:e.target.value}))} placeholder="Cuéntanos más..." rows={3} style={{ resize:"none" }}/>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={send} disabled={st==="loading"||!f.nombre} className="bp" style={{ flex:1, opacity:(!f.nombre||st==="loading")?.5:1, cursor:(!f.nombre||st==="loading")?"not-allowed":"pointer" }}>
                {st==="loading"?"Enviando...":<>Quiero mi app {I.arr}</>}
              </button>
              <a href="https://wa.me/529984292748?text=Hola%2C+vi+V+Momentum+y+quiero+cotizar+mi+app" target="_blank" rel="noopener noreferrer" className="bg" style={{ padding:"9px 14px", fontSize:12 }}>WhatsApp</a>
            </div>
            {st==="error" && <p style={{ color:"#ef4444", fontSize:12, textAlign:"center", marginTop:10 }}>Error. Escríbenos por WhatsApp.</p>}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  const cols = [
    {t:"Productos", ls:[["VForge","https://vforge.site"],["Vulcano","https://vforge.site/vulcano"],["Marketplace","https://vforge.site/marketplace"],["Precios","#precios"]]},
    {t:"Recursos",  ls:[["Blog","https://vforge.site/blog"],["Método CMP","#metodo"],["Integraciones","#ints"],["Industrias","#apps"]]},
    {t:"Empresa",   ls:[["Legal","#legal"],["Contacto","#contacto"],["WhatsApp","https://wa.me/529984292748"],["LinkedIn","https://www.linkedin.com/company/v-momentum-/"]]},
  ];
  return (
    <footer style={{ borderTop:`1px solid ${C.bd}`, background:C.s1 }}>
      <div className="w" style={{ padding:"44px 22px 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.3fr repeat(3,1fr)", gap:28, marginBottom:36 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <div style={{ width:26, height:26, borderRadius:6, background:C.bg, border:`1px solid ${C.bd_b}`, display:"flex", alignItems:"center", justifyContent:"center" }}>{I.vmark}</div>
              <span style={{ color:"#fff", fontWeight:600, fontSize:13 }}>V Momentum</span>
            </div>
            <p className="body" style={{ fontSize:12, maxWidth:190, marginBottom:16 }}>Fábrica de software premium. Apps PWA en 7 días con IA.</p>
            <div style={{ display:"flex", gap:12 }}>
              <a href="https://www.linkedin.com/company/v-momentum-/" target="_blank" rel="noopener noreferrer" style={{ color:C.slv3, display:"flex", transition:"color .15s" }} onMouseOver={e=>(e.currentTarget.style.color="#fff")} onMouseOut={e=>(e.currentTarget.style.color=C.slv3)}>{I.li}</a>
              <a href="https://x.com/LuisVmomentums" target="_blank" rel="noopener noreferrer" style={{ color:C.slv3, display:"flex", transition:"color .15s" }} onMouseOver={e=>(e.currentTarget.style.color="#fff")} onMouseOut={e=>(e.currentTarget.style.color=C.slv3)}>{I.tw}</a>
              <a href="https://vforge.site" target="_blank" rel="noopener noreferrer" style={{ color:C.slv3, display:"flex", fontSize:11, alignItems:"center", gap:4, transition:"color .15s" }} onMouseOver={e=>(e.currentTarget.style.color="#fff")} onMouseOut={e=>(e.currentTarget.style.color=C.slv3)}>VForge {I.ext}</a>
            </div>
          </div>
          {cols.map(c => (
            <div key={c.t}>
              <p className="lbl" style={{ marginBottom:12 }}>{c.t}</p>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:8 }}>
                {c.ls.map(([l,h]) => <li key={l}><a href={h} target={h.startsWith("http")?"_blank":"_self"} rel="noopener noreferrer" style={{ fontSize:12, color:C.slv2, transition:"color .15s" }} onMouseOver={e=>(e.currentTarget.style.color="#fff")} onMouseOut={e=>(e.currentTarget.style.color=C.slv2)}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="sep" style={{ marginBottom:18 }}/>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", gap:6 }}>
          <span style={{ fontSize:11, color:C.slv3 }}>© 2026 All Global Holding LLC · Wyoming, USA</span>
          <span className="mono" style={{ color:C.slv3, fontSize:10 }}>Built with VForge + Vulcano · vforge.site</span>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (<>
    <style>{CSS}</style>
    <Nav/>
    <main>
      <Hero/><Seals/><Productos/><Metodo/><Apps/><Integraciones/><Precios/><Blog/><Legal/><Contacto/>
    </main>
    <Footer/>
  </>);
}
