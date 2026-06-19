"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ─── PALETA ─────────────────────────────────────── */
const BG   = "#07080f";
const S1   = "#0e1018";
const S2   = "#111420";
const S3   = "#141829";
const BLU  = "#1a6eff";
const BLU2 = "#5294ff";
const SLV  = "#dde3f0";
const SLV2 = "rgba(221,227,240,0.6)";
const SLV3 = "rgba(221,227,240,0.25)";
const BD   = "rgba(255,255,255,0.07)";
const BDB  = "rgba(26,110,255,0.25)";

/* ─── FADE UP ─────────────────────────────────────── */
function FadeUp({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── SERVICIOS ──────────────────────────────────── */
const SVCS = [
  { c: BLU,      n: "Apps & PWAs",        d: "Aplicaciones web progresivas que se instalan como app nativa. Dashboards, portales, ERPs con datos reales.", tags: ["Next.js 16","PWA","Móvil-first"],
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg> },
  { c: "#8b5cf6", n: "IA & Brains",        d: "Agentes con memoria, chatbots, OCR, análisis de documentos. LLMs propios integrados a tu operación.",        tags: ["Claude","GPT-4o","MCP","RAG"],
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg> },
  { c: "#10b981", n: "Automatizaciones",   d: "Flujos que hacen el trabajo repetitivo. Notificaciones, reportes, sync entre sistemas, crons automáticos.",   tags: ["n8n","Webhooks","Crons"],
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
  { c: "#f59e0b", n: "Bots & WhatsApp",    d: "Bots para WhatsApp, Instagram y web. Atención 24/7, calificación de leads y cobros automatizados.",           tags: ["WhatsApp API","Twilio","IA nativa"],
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { c: "#ec4899", n: "Integraciones",      d: "Pagos, facturación SAT, CRM, ERP, ecommerce, delivery y logística. Todo conectado en un solo sistema.",        tags: ["Stripe","MercadoPago","SAT/CFDI"],
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg> },
  { c: "#06b6d4", n: "Landings & Video IA", d: "Sitios de venta con video generado por IA. Campañas, redes sociales, contenido que convierte de verdad.",   tags: ["Higgsfield","Video IA","SEO"],
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg> },
];

/* ─── LOGOS ──────────────────────────────────────── */
const LOGOS = ["Anthropic","OpenAI","Vercel","Neon","Clerk","Stripe","WhatsApp","Twilio","Resend","ElevenLabs","Mercado Pago","n8n","Higgsfield","Sumsub"];

function Carousel() {
  return (
    <div style={{ overflow:"hidden", maskImage:"linear-gradient(90deg,transparent,black 8%,black 92%,transparent)", WebkitMaskImage:"linear-gradient(90deg,transparent,black 8%,black 92%,transparent)" }}>
      <div style={{ display:"flex", animation:"scroll-logos 30s linear infinite", width:"max-content" }}
        className="logos-inner"
        onMouseEnter={e=>(e.currentTarget.style.animationPlayState="paused")}
        onMouseLeave={e=>(e.currentTarget.style.animationPlayState="running")}>
        {[...LOGOS,...LOGOS].map((l,i) => (
          <span key={i} style={{ flexShrink:0, margin:"0 36px", fontSize:13, fontWeight:700, color:"rgba(200,210,230,0.38)", letterSpacing:0.2, whiteSpace:"nowrap", transition:"color 0.25s", cursor:"default" }}
            onMouseEnter={e=>(e.currentTarget.style.color="rgba(200,210,230,0.85)")}
            onMouseLeave={e=>(e.currentTarget.style.color="rgba(200,210,230,0.38)")}>
            {l}
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll-logos{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

/* ─── NAV ────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}
        style={{
          position:"fixed", top:0, left:0, right:0, zIndex:200,
          background: scrolled ? "rgba(7,8,15,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.055)" : "1px solid transparent",
          transition: "all 0.35s ease",
        }}
      >
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 28px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          {/* Logo */}
          <a href="/" style={{ fontSize:19, fontWeight:900, letterSpacing:-1, color:"#fff", textDecoration:"none" }}>
            V<span style={{ color:BLU }}>·</span>Momentum
          </a>
          {/* Desktop links */}
          <div style={{ display:"flex", gap:32, alignItems:"center" }} className="nav-links">
            {["Servicios","Stack","Proceso","Precios"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                style={{ fontSize:14, color:SLV2, textDecoration:"none", transition:"color 0.2s" }}
                onMouseEnter={e=>(e.currentTarget.style.color="#fff")}
                onMouseLeave={e=>(e.currentTarget.style.color=SLV2)}>
                {l}
              </a>
            ))}
          </div>
          {/* CTA + hamburger */}
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <motion.a href="#contacto"
              whileHover={{ scale:1.04, boxShadow:`0 0 28px rgba(26,110,255,0.5)` }}
              whileTap={{ scale:0.97 }}
              style={{ background:BLU, color:"#fff", fontSize:13, fontWeight:700, padding:"9px 22px", borderRadius:10, textDecoration:"none", boxShadow:`0 0 16px rgba(26,110,255,0.28)` }}>
              Demo gratis
            </motion.a>
            <button onClick={() => setOpen(!open)} className="nav-hamburger" style={{ display:"none", background:"none", border:"none", cursor:"pointer", color:"#fff", padding:6 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}}
            style={{ position:"fixed", top:64, left:0, right:0, zIndex:199, background:"rgba(7,8,15,0.97)", backdropFilter:"blur(24px)", borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"16px 28px 28px" }}>
            {["Servicios","Stack","Proceso","Precios","Contacto"].map((l,i) => (
              <motion.a key={l} href={`#${l.toLowerCase()}`}
                initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}}
                onClick={() => setOpen(false)}
                style={{ display:"block", padding:"13px 0", fontSize:17, color:SLV, borderBottom:"1px solid rgba(255,255,255,0.04)", textDecoration:"none" }}>
                {l}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── HERO ───────────────────────────────────────── */
function Hero() {
  const { scrollY } = useScroll();
  const bgY    = useTransform(scrollY, [0,700], [0, 140]);
  const bgOp   = useTransform(scrollY, [0,500], [1, 0]);
  const [n, setN] = useState(0);
  useEffect(() => { const t = setInterval(() => setN(v => v < 12 ? v+1 : 12), 90); return () => clearInterval(t); }, []);

  return (
    <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", position:"relative", overflow:"hidden", paddingTop:100, paddingBottom:100 }}>

      {/* ── Fondos capas ── */}
      <motion.div style={{ y:bgY, opacity:bgOp, position:"absolute", inset:0, pointerEvents:"none", zIndex:0 }}>

        {/* Glow azul central — grande y suave */}
        <div style={{
          position:"absolute", top:"12%", left:"50%", transform:"translateX(-50%)",
          width:900, height:700,
          background:"radial-gradient(ellipse, rgba(26,110,255,0.18) 0%, rgba(26,110,255,0.06) 40%, transparent 70%)",
          borderRadius:"50%", filter:"blur(1px)"
        }}/>

        {/* Glow púrpura izquierda */}
        <div style={{
          position:"absolute", top:"40%", left:"8%",
          width:420, height:420,
          background:"radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 65%)",
          borderRadius:"50%"
        }}/>

        {/* Glow cyan derecha */}
        <div style={{
          position:"absolute", top:"35%", right:"6%",
          width:360, height:360,
          background:"radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 65%)",
          borderRadius:"50%"
        }}/>

        {/* Grid sutil */}
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:`
            linear-gradient(rgba(255,255,255,0.032) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.032) 1px, transparent 1px)
          `,
          backgroundSize:"64px 64px"
        }}/>

        {/* Viñeta negra abajo */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, height:260,
          background:"linear-gradient(0deg, #07080f 0%, transparent 100%)"
        }}/>
      </motion.div>

      {/* ── Contenido ── */}
      <div style={{ position:"relative", zIndex:1, textAlign:"center", maxWidth:920, padding:"0 28px", width:"100%" }}>

        {/* Badge */}
        <FadeUp>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(26,110,255,0.09)", border:"1px solid rgba(26,110,255,0.28)", borderRadius:100, padding:"6px 18px", marginBottom:36 }}>
            <motion.div animate={{ scale:[1,1.6,1] }} transition={{ repeat:Infinity, duration:2.2 }}
              style={{ width:6, height:6, borderRadius:"50%", background:BLU }}/>
            <span style={{ fontSize:11, letterSpacing:2.5, textTransform:"uppercase", color:BLU, fontWeight:700 }}>
              Agencia de software premium · CDMX
            </span>
          </div>
        </FadeUp>

        {/* H1 */}
        <FadeUp delay={0.08}>
          <h1 style={{ fontSize:"clamp(38px,6.5vw,82px)", fontWeight:900, letterSpacing:"-0.04em", lineHeight:1.04, color:"#fff", marginBottom:28 }}>
            Tu negocio merece{" "}
            <br className="show-mobile-br"/>
            <span style={{
              background:`linear-gradient(125deg, ${BLU} 0%, ${BLU2} 55%, #a5c8ff 100%)`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text"
            }}>
              tecnología de primer nivel
            </span>
          </h1>
        </FadeUp>

        {/* Sub */}
        <FadeUp delay={0.16}>
          <p style={{ fontSize:"clamp(16px,1.9vw,20px)", color:SLV2, maxWidth:580, margin:"0 auto 48px", lineHeight:1.78 }}>
            Apps PWA, IA nativa, automatizaciones, bots e integraciones. Del concepto a producción. Rápido, serio y con resultados reales.
          </p>
        </FadeUp>

        {/* CTAs */}
        <FadeUp delay={0.24}>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", marginBottom:80 }}>
            <motion.a href="#contacto"
              whileHover={{ scale:1.05, boxShadow:`0 0 40px rgba(26,110,255,0.55)` }}
              whileTap={{ scale:0.97 }}
              style={{ background:BLU, color:"#fff", fontSize:15, fontWeight:700, padding:"15px 36px", borderRadius:12, textDecoration:"none", boxShadow:`0 0 22px rgba(26,110,255,0.32)`, transition:"box-shadow 0.25s" }}>
              Ver mi demo gratis →
            </motion.a>
            <motion.a href="#proceso"
              whileHover={{ scale:1.04, background:"rgba(255,255,255,0.05)" }}
              whileTap={{ scale:0.97 }}
              style={{ border:"1px solid rgba(221,227,240,0.16)", color:SLV, fontSize:15, fontWeight:500, padding:"15px 36px", borderRadius:12, textDecoration:"none", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", transition:"background 0.2s" }}>
              Cómo trabajamos
            </motion.a>
          </div>
        </FadeUp>

        {/* Stats */}
        <FadeUp delay={0.32}>
          <div style={{ display:"flex", justifyContent:"center", gap:"clamp(28px,5vw,72px)", flexWrap:"wrap", paddingTop:36, borderTop:"1px solid rgba(255,255,255,0.06)" }}>
            {[
              { num:`+${n}`, lbl:"Apps en producción" },
              { num:"72h",  lbl:"Demo lista" },
              { num:"3",    lbl:"Etapas claras" },
              { num:"IA",   lbl:"Nativa en todo" },
            ].map((s,i) => (
              <motion.div key={i} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:0.5+i*0.09}} style={{textAlign:"center"}}>
                <div style={{ fontSize:"clamp(26px,3.5vw,40px)", fontWeight:900, color:"#fff", letterSpacing:"-0.04em", lineHeight:1 }}>{s.num}</div>
                <div style={{ fontSize:12, color:SLV3, marginTop:6, letterSpacing:0.4 }}>{s.lbl}</div>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Scroll indicator */}
      <motion.div animate={{ y:[0,10,0] }} transition={{ repeat:Infinity, duration:2.4, ease:"easeInOut" }}
        style={{ position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)", zIndex:1 }}>
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
          <rect x="1" y="1" width="20" height="32" rx="10" stroke="rgba(221,227,240,0.18)" strokeWidth="1.5"/>
          <motion.rect animate={{ y:[4,16,4] }} transition={{ repeat:Infinity, duration:2.4 }} x="9" y="5" width="4" height="7" rx="2" fill={BLU}/>
        </svg>
      </motion.div>
    </section>
  );
}

/* ─── LOGOS SECTION ──────────────────────────────── */
function LogosSection() {
  return (
    <section style={{ padding:"52px 0", borderTop:"1px solid rgba(255,255,255,0.045)", borderBottom:"1px solid rgba(255,255,255,0.045)", background:S1 }}>
      <FadeUp>
        <p style={{ textAlign:"center", fontSize:10, letterSpacing:3.5, textTransform:"uppercase", color:SLV3, marginBottom:32 }}>
          Tecnología que usamos
        </p>
      </FadeUp>
      <Carousel/>
    </section>
  );
}

/* ─── SERVICIOS ──────────────────────────────────── */
function Servicios() {
  return (
    <section id="servicios" style={{ padding:"120px 28px", maxWidth:1200, margin:"0 auto" }}>
      <FadeUp>
        <div style={{ textAlign:"center", marginBottom:72 }}>
          <span style={{ display:"inline-block", background:"rgba(26,110,255,0.08)", border:"1px solid rgba(26,110,255,0.22)", borderRadius:100, padding:"4px 16px", fontSize:11, letterSpacing:2.5, textTransform:"uppercase", color:BLU, marginBottom:20 }}>
            Qué hacemos
          </span>
          <h2 style={{ fontSize:"clamp(30px,4.5vw,56px)", fontWeight:900, letterSpacing:"-0.04em", color:"#fff", marginBottom:16, lineHeight:1.1 }}>
            Todo lo que necesita<br/>tu negocio digital
          </h2>
          <p style={{ fontSize:17, color:SLV2, maxWidth:480, margin:"0 auto" }}>
            Desde la app hasta la IA. Integraciones reales, no promesas.
          </p>
        </div>
      </FadeUp>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(310px,1fr))", gap:14 }}>
        {SVCS.map((s,i) => (
          <FadeUp key={i} delay={i*0.07}>
            <motion.div
              whileHover={{ y:-5, transition:{duration:0.22} }}
              style={{ background:S1, border:`1px solid ${BD}`, borderRadius:16, padding:"26px 22px", height:"100%", cursor:"default", transition:"border-color 0.25s, box-shadow 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=`${s.c}44`; e.currentTarget.style.boxShadow=`0 12px 48px rgba(0,0,0,0.45), 0 0 0 1px ${s.c}1a`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=BD; e.currentTarget.style.boxShadow="none"; }}
            >
              <div style={{ width:42, height:42, borderRadius:10, background:`${s.c}16`, color:s.c, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                {s.icon}
              </div>
              <h3 style={{ fontSize:16, fontWeight:700, color:"#fff", marginBottom:8 }}>{s.n}</h3>
              <p style={{ fontSize:13, color:SLV2, lineHeight:1.68, marginBottom:16 }}>{s.d}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {s.tags.map(t => (
                  <span key={t} style={{ fontSize:11, padding:"3px 10px", borderRadius:100, background:`${s.c}0e`, border:`1px solid ${s.c}28`, color:`${s.c}dd` }}>{t}</span>
                ))}
              </div>
            </motion.div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ─── PROCESO ────────────────────────────────────── */
function Proceso() {
  const steps = [
    { n:"01", name:"Demo gratis",       desc:"En 72 horas tienes una app navegable de tu negocio. Sin pagar nada. La ves, la pruebas, decides.",           price:"$0 — cero inversión" },
    { n:"02", name:"Integración real",  desc:"Firmamos contrato. Conectamos pagos, base de datos, IA y WhatsApp. Tu app funciona con datos reales.",        price:"Anticipo al firmar"  },
    { n:"03", name:"Entrega & soporte", desc:"Tu equipo aprende a operar. Soporte incluido. Tú manejas el negocio, nosotros la tecnología.",                price:"Saldo al aprobar"    },
  ];
  return (
    <section id="proceso" style={{ padding:"120px 28px", position:"relative" }}>
      {/* Fondo tenue */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,transparent,rgba(26,110,255,0.025) 50%,transparent)", pointerEvents:"none" }}/>
      <div style={{ maxWidth:1100, margin:"0 auto", position:"relative" }}>
        <FadeUp>
          <div style={{ textAlign:"center", marginBottom:72 }}>
            <span style={{ display:"inline-block", background:"rgba(26,110,255,0.08)", border:"1px solid rgba(26,110,255,0.22)", borderRadius:100, padding:"4px 16px", fontSize:11, letterSpacing:2.5, textTransform:"uppercase", color:BLU, marginBottom:20 }}>
              Cómo trabajamos
            </span>
            <h2 style={{ fontSize:"clamp(30px,4.5vw,56px)", fontWeight:900, letterSpacing:"-0.04em", color:"#fff", lineHeight:1.1 }}>
              Simple. Transparente.<br/>Sin sorpresas.
            </h2>
          </div>
        </FadeUp>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))", gap:14 }}>
          {steps.map((s,i) => (
            <FadeUp key={i} delay={i*0.1}>
              <div style={{ background:S1, border:`1px solid ${BD}`, borderRadius:16, padding:"32px 28px", position:"relative", overflow:"hidden" }}>
                {/* Número fantasma */}
                <div style={{ position:"absolute", top:12, right:18, fontSize:96, fontWeight:900, color:"rgba(26,110,255,0.04)", letterSpacing:-6, lineHeight:1, userSelect:"none" }}>{s.n}</div>
                <div style={{ fontSize:44, fontWeight:900, color:"rgba(26,110,255,0.2)", letterSpacing:-3, marginBottom:18, lineHeight:1 }}>{s.n}</div>
                <h3 style={{ fontSize:20, fontWeight:700, color:"#fff", marginBottom:12 }}>{s.name}</h3>
                <p style={{ fontSize:14, color:SLV2, lineHeight:1.72, marginBottom:22 }}>{s.desc}</p>
                <span style={{ display:"inline-block", background:"rgba(26,110,255,0.10)", border:"1px solid rgba(26,110,255,0.22)", borderRadius:8, padding:"6px 14px", fontSize:12, color:BLU, fontWeight:600 }}>{s.price}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── INTEGRACIONES ──────────────────────────────── */
function Stack() {
  const cats = [
    { t:"Pagos",          items:["Stripe","Mercado Pago","OXXO Pay","SPEI / CLABE"] },
    { t:"IA & LLMs",      items:["Claude (Anthropic)","GPT-4o","Gemini","OpenRouter"] },
    { t:"Comunicación",   items:["WhatsApp API","Twilio SMS","Resend Email","ElevenLabs"] },
    { t:"Automatización", items:["n8n workflows","Agentes MCP","Crons","Make / Zapier"] },
    { t:"Auth & Users",   items:["Clerk","Magic links","OAuth Google","Roles & permisos"] },
    { t:"Infra",          items:["Vercel Edge","Neon Postgres","Hetzner VPS","GitHub CI/CD"] },
    { t:"Video & IA visual", items:["Higgsfield AI","GPT Image 2","Seedance Video","Cloudinary"] },
    { t:"Gobierno & SAT", items:["CFDI 4.0","Facturación XML","Sumsub KYC","Cumplimiento"] },
  ];
  return (
    <section id="stack" style={{ padding:"120px 28px", maxWidth:1200, margin:"0 auto" }}>
      <FadeUp>
        <div style={{ textAlign:"center", marginBottom:72 }}>
          <span style={{ display:"inline-block", background:"rgba(26,110,255,0.08)", border:"1px solid rgba(26,110,255,0.22)", borderRadius:100, padding:"4px 16px", fontSize:11, letterSpacing:2.5, textTransform:"uppercase", color:BLU, marginBottom:20 }}>
            Ecosistema
          </span>
          <h2 style={{ fontSize:"clamp(30px,4.5vw,56px)", fontWeight:900, letterSpacing:"-0.04em", color:"#fff", marginBottom:16 }}>Conectamos con todo</h2>
          <p style={{ fontSize:17, color:SLV2, maxWidth:440, margin:"0 auto" }}>Más de 40 servicios y APIs integradas en tu plataforma.</p>
        </div>
      </FadeUp>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:12 }}>
        {cats.map((cat,i) => (
          <FadeUp key={i} delay={i*0.05}>
            <div style={{ background:S1, border:`1px solid ${BD}`, borderRadius:12, padding:"20px 18px" }}>
              <div style={{ fontSize:10, letterSpacing:2.5, textTransform:"uppercase", color:SLV3, marginBottom:14 }}>{cat.t}</div>
              {cat.items.map(item => (
                <div key={item} style={{ display:"flex", alignItems:"center", gap:9, fontSize:13, color:SLV2, marginBottom:8 }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:BLU, flexShrink:0 }}/>
                  {item}
                </div>
              ))}
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ─── CTA FINAL ──────────────────────────────────── */
function CTAFinal() {
  return (
    <section id="contacto" style={{ padding:"120px 28px" }}>
      <FadeUp>
        <div style={{ maxWidth:780, margin:"0 auto", background:`linear-gradient(135deg, ${S3} 0%, ${S2} 100%)`, border:`1px solid ${BDB}`, borderRadius:24, padding:"clamp(44px,6vw,88px) clamp(28px,5vw,72px)", textAlign:"center", position:"relative", overflow:"hidden" }}>
          {/* Glow interno */}
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:400, background:"radial-gradient(ellipse, rgba(26,110,255,0.09) 0%, transparent 68%)", pointerEvents:"none" }}/>
          <div style={{ position:"relative" }}>
            <h2 style={{ fontSize:"clamp(28px,4vw,54px)", fontWeight:900, letterSpacing:"-0.04em", color:"#fff", marginBottom:16, lineHeight:1.1 }}>
              ¿Listo para ver tu app?
            </h2>
            <p style={{ fontSize:17, color:SLV2, maxWidth:420, margin:"0 auto 44px", lineHeight:1.75 }}>
              En 72 horas tienes una demo funcional de tu negocio. Sin costo, sin compromiso.
            </p>
            <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              <motion.a href="https://wa.me/529984292748?text=Hola,%20quiero%20ver%20mi%20demo%20gratis" target="_blank" rel="noopener"
                whileHover={{ scale:1.05, boxShadow:`0 0 44px rgba(26,110,255,0.55)` }} whileTap={{ scale:0.97 }}
                style={{ background:BLU, color:"#fff", fontSize:15, fontWeight:700, padding:"16px 38px", borderRadius:12, textDecoration:"none", boxShadow:`0 0 22px rgba(26,110,255,0.28)` }}>
                Quiero mi demo gratis
              </motion.a>
              <motion.a href="https://wa.me/529984292748" target="_blank" rel="noopener"
                whileHover={{ scale:1.04, background:"rgba(255,255,255,0.04)" }} whileTap={{ scale:0.97 }}
                style={{ border:"1px solid rgba(221,227,240,0.16)", color:SLV, fontSize:15, padding:"16px 38px", borderRadius:12, textDecoration:"none", transition:"background 0.2s" }}>
                WhatsApp directo
              </motion.a>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ borderTop:"1px solid rgba(255,255,255,0.05)", padding:"32px 28px", background:S1 }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
        <div style={{ fontSize:16, fontWeight:900, letterSpacing:-1, color:"#fff" }}>V<span style={{ color:BLU }}>·</span>Momentum</div>
        <div style={{ display:"flex", gap:24, flexWrap:"wrap" }}>
          {["Privacidad","Términos","Blog","Contacto"].map(l => (
            <a key={l} href="#" style={{ fontSize:12, color:SLV3, textDecoration:"none", transition:"color 0.2s" }}
              onMouseEnter={e=>(e.currentTarget.style.color=SLV2)}
              onMouseLeave={e=>(e.currentTarget.style.color=SLV3)}>{l}</a>
          ))}
        </div>
        <div style={{ fontSize:11, color:"rgba(221,227,240,0.18)" }}>© 2026 All Global Holding LLC · CDMX</div>
      </div>
    </footer>
  );
}

/* ─── PAGE ───────────────────────────────────────── */
export default function Home() {
  return (
    <div style={{ background:BG, minHeight:"100vh", color:SLV, fontFamily:"var(--font-geist-sans, 'Geist', system-ui, sans-serif)" }}>
      <style>{`
        @media(max-width:768px){
          .nav-links{display:none!important}
          .nav-hamburger{display:flex!important}
          .show-mobile-br{display:block}
        }
        @media(min-width:769px){.show-mobile-br{display:none}}
      `}</style>
      <Nav/>
      <Hero/>
      <LogosSection/>
      <Servicios/>
      <Proceso/>
      <Stack/>
      <CTAFinal/>
      <Footer/>
    </div>
  );
}
