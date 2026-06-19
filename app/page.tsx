"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ── TOKENS ─────────────────────────────────────────────────────
   Extraídos del logo oficial: negro absoluto, azul eléctrico, plata
──────────────────────────────────────────────────────────────── */
const BLU = "#1a6eff";        // azul eléctrico
const BLU2 = "#0051cc";       // azul profundo
const SLV = "#c8d0e0";        // plata
const SLV2 = "#8a96a8";       // plata suave
const BG = "#000000";         // negro absoluto
const SURF = "#0a0a0f";       // negro suave para tarjetas
const SURF2 = "#0f0f18";      // para hover
const BORDER = "rgba(26,110,255,0.18)";
const BORDER_HVR = "rgba(26,110,255,0.45)";

/* ── TIPOS DE APPS ───────────────────────────────────────────── */
const APP_TYPES = [
  { icon: "💳", name: "Fintech & Crédito", desc: "Microcréditos, scoring de riesgo, cobranza automatizada, OXXO Pay, pagos en línea." },
  { icon: "🚗", name: "Movilidad & Logística", desc: "Ride-hailing, tracking GPS en tiempo real, despacho de flotas y tarifas dinámicas." },
  { icon: "🍔", name: "Restaurantes & Food", desc: "Pedidos en línea, sistema de mesas, cocina digital, repartidores y pagos en app." },
  { icon: "🏥", name: "Salud & Clínicas", desc: "Expediente clínico, citas, telemedicina, recordatorios y prescripciones digitales." },
  { icon: "🏗️", name: "Construcción & RRHH", desc: "Control de asistencia, avance de obra, inventario, nómina y gestión de trabajadores." },
  { icon: "🎓", name: "Educación & Cursos", desc: "LMS propio, video, evaluaciones, certificados digitales y cobro por suscripción." },
  { icon: "🛒", name: "eCommerce & Retail", desc: "Tienda PWA instalable, inventario, punto de venta, multi-sucursal y reportes." },
  { icon: "🏠", name: "Real Estate", desc: "Marketplace de propiedades, firma digital, pagos fraccionados y tour virtual." },
  { icon: "⚽", name: "Deportes & Fitness", desc: "Academias, rutinas, torneos, ranking en tiempo real y comunidad de atletas." },
  { icon: "🌮", name: "Turismo & Hospitality", desc: "Reservas, check-in digital, mapas offline, guías locales y pagos multi-divisa." },
  { icon: "🎵", name: "Entretenimiento", desc: "Apps de música, redes verticales, portafolios de artistas y streaming propio." },
  { icon: "⚙️", name: "ERP Personalizado", desc: "Sistemas a la medida para cualquier industria. Si lo imaginas, lo construimos." },
];

/* ── INTEGRACIONES ───────────────────────────────────────────── */
const INTEGRATIONS = [
  { name: "Mercado Pago", file: "mercadopago.svg" },
  { name: "Stripe", file: "stripe.svg" },
  { name: "Clerk", file: "clerk.svg" },
  { name: "Neon", file: "neon.svg" },
  { name: "Vercel", file: "vercel.svg" },
  { name: "WhatsApp", file: "whatsapp.svg" },
  { name: "Claude AI", file: "claude.svg" },
  { name: "OpenAI", file: "openai.svg" },
  { name: "Hetzner", file: "hetzner.svg" },
  { name: "Resend", file: "resend.svg" },
  { name: "Twilio", file: "twilio.svg" },
  { name: "GitHub", file: "github.svg" },
  { name: "Airtable", file: "airtable.svg" },
  { name: "Google", file: "google.svg" },
  { name: "Mapbox", file: "safe.svg" },
  { name: "OpenRouter", file: "openrouter.svg" },
];

/* ── SELLOS ──────────────────────────────────────────────────── */
const SEALS = [
  { icon: "🔐", title: "SSL · HTTPS", sub: "Todos los proyectos" },
  { icon: "🔑", title: "Clerk Auth", sub: "Enterprise-grade" },
  { icon: "💳", title: "MP Certified", sub: "Checkout Pro oficial" },
  { icon: "🗄️", title: "Neon Postgres", sub: "Cifrado AES-256" },
  { icon: "🌍", title: "Vercel Edge", sub: "150+ regiones" },
  { icon: "🤖", title: "Anthropic API", sub: "Claude integrado" },
  { icon: "📜", title: "Contrato", sub: "Firma digital" },
  { icon: "⚡", title: "SLA garantizado", sub: "99.5% uptime" },
];

/* ── PLANES ──────────────────────────────────────────────────── */
const PLANS = [
  {
    name: "Starter", price: "$12,000", sub: "MXN · pago único", color: SLV,
    features: ["PWA instalable iOS & Android", "Hasta 3 módulos", "Auth con Clerk", "Base de datos Neon", "Deploy Vercel", "Repositorio en tu GitHub"],
    hot: false,
  },
  {
    name: "Pro", price: "$22,000", sub: "MXN · pago único", color: BLU,
    features: ["Todo Starter +", "Hasta 8 módulos", "Pagos Mercado Pago / Stripe", "WhatsApp notifications", "Email con Resend", "Panel admin completo", "IA con Vulcano integrada"],
    hot: true,
  },
  {
    name: "Enterprise", price: "A cotizar", sub: "según alcance", color: SLV2,
    features: ["Todo Pro +", "Módulos ilimitados", "Multi-sucursal & tenant", "Automatizaciones MCP", "Agentes IA propios", "Integraciones custom", "Soporte prioritario 24/7"],
    hot: false,
  },
];

/* ── MÉTODO ──────────────────────────────────────────────────── */
const STEPS = [
  { n: "01", t: "Describes tu idea", d: "Nos escribes por WhatsApp o llenas el formulario. Sin formularios de 20 campos, sin demos infinitas." },
  { n: "02", t: "CMP en 48 h", d: "Te enviamos el Context Minimum Protocol: roadmap, módulos, costo y timeline exacto. Sin sorpresas." },
  { n: "03", t: "Construimos en vivo", d: "Ves el avance real cada día. No un Figma — la app funcionando en tu celular." },
  { n: "04", t: "Tú eres el dueño", d: "El código en tu GitHub, el dominio a tu nombre, el deploy en tu Vercel. Nosotros construimos, tú controlas." },
];

/* ── BLOG ────────────────────────────────────────────────────── */
const POSTS = [
  { tag: "Producto", date: "Jun 2026", title: "CMP: de idea a roadmap en 48 horas", excerpt: "El Context Minimum Protocol captura tu idea, la analiza con IA y entrega un roadmap accionable antes de escribir una línea de código." },
  { tag: "Técnico", date: "May 2026", title: "Por qué todas nuestras apps son PWA y no nativas", excerpt: "Instala en iOS y Android sin App Store, se actualiza sin permiso del usuario y cuesta 10x menos de mantener. El stack exacto que usamos." },
  { tag: "IA", date: "May 2026", title: "Vulcano: el copiloto que sabe más de tu proyecto que tú", excerpt: "Memoria persistente en Neon, contexto de tus repos en GitHub y capacidad de ejecutar comandos. Así funciona nuestro enjambre de agentes." },
  { tag: "Pagos MX", date: "Abr 2026", title: "Mercado Pago + Stripe + OXXO Pay en 2026", excerpt: "Qué elegir según tu mercado, cómo combinar procesadores y por qué la certificación Checkout Pro importa para tus clientes." },
  { tag: "Tutorial", date: "Abr 2026", title: "MCP Server propio: conecta Claude a tu proyecto", excerpt: "Despliega un servidor MCP en Hetzner, configura OAuth con Clerk y permite que cualquier agente IA lea tu base de datos con permisos granulares." },
  { tag: "Stack", date: "Mar 2026", title: "Next.js 16 + Neon + Vercel: el stack que no falla", excerpt: "Por qué elegimos este stack para cada proyecto y cómo nos permite entregar en 7 días sin sacrificar escalabilidad ni seguridad." },
];

/* ── ESTILOS GLOBALES ────────────────────────────────────────── */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; overflow-x: hidden; }
  body { background: #000; color: #c8d0e0; font-family: 'Inter', system-ui, sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #000; }
  ::-webkit-scrollbar-thumb { background: #1a6eff44; border-radius: 4px; }
  a { text-decoration: none; color: inherit; }

  .mono { font-family: 'IBM Plex Mono', monospace; }

  /* BOTONES */
  .btn-primary {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: #1a6eff; color: #fff; font-weight: 700; font-size: 14px;
    border-radius: 10px; padding: 12px 24px; border: none; cursor: pointer;
    transition: all .2s; white-space: nowrap; text-decoration: none;
    box-shadow: 0 0 28px rgba(26,110,255,.45), 0 2px 8px rgba(0,0,0,.5);
  }
  .btn-primary:hover { background: #0051cc; box-shadow: 0 0 44px rgba(26,110,255,.7), 0 4px 16px rgba(0,0,0,.6); transform: translateY(-1px); }

  .btn-ghost {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: transparent; color: #c8d0e0; font-weight: 600; font-size: 14px;
    border-radius: 10px; padding: 11px 22px;
    border: 1px solid rgba(200,208,224,0.2); cursor: pointer;
    transition: all .2s; white-space: nowrap; text-decoration: none;
  }
  .btn-ghost:hover { border-color: rgba(26,110,255,.5); color: #fff; background: rgba(26,110,255,.08); }

  /* TARJETAS */
  .card {
    background: #0a0a0f; border: 1px solid rgba(26,110,255,.15);
    border-radius: 16px; padding: 28px;
    transition: border-color .2s, transform .2s, box-shadow .2s;
  }
  .card:hover {
    border-color: rgba(26,110,255,.4);
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(26,110,255,.1), 0 8px 32px rgba(0,0,0,.6);
  }

  /* INPUT */
  .inp {
    width: 100%; background: #0a0a0f; border: 1px solid rgba(26,110,255,.2);
    border-radius: 10px; padding: 13px 16px; font-size: 14px; color: #c8d0e0;
    outline: none; transition: border-color .2s; font-family: 'Inter', sans-serif;
  }
  .inp::placeholder { color: rgba(200,208,224,.3); }
  .inp:focus { border-color: #1a6eff; box-shadow: 0 0 0 3px rgba(26,110,255,.12); }

  /* ETIQUETA SECTION */
  .eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600;
    letter-spacing: .15em; text-transform: uppercase; color: #1a6eff; margin-bottom: 14px; display: block; }

  /* CARRUSEL */
  .scroll-x { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 8px; scroll-snap-type: x mandatory; }
  .scroll-x::-webkit-scrollbar { height: 0; }
  .scroll-x > * { scroll-snap-align: start; flex-shrink: 0; }

  /* GRID RESPONSIVE */
  .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  @media (max-width: 1024px) { .grid-4 { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 768px) {
    .grid-2 { grid-template-columns: 1fr; }
    .grid-3 { grid-template-columns: repeat(2, 1fr); }
    .grid-4 { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 480px) {
    .grid-3 { grid-template-columns: 1fr; }
    .grid-4 { grid-template-columns: repeat(2, 1fr); }
  }

  /* SECTION */
  .section { padding: 96px 24px; max-width: 1200px; margin: 0 auto; }
  @media (max-width: 768px) { .section { padding: 64px 20px; } }

  /* DIVIDER */
  .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(26,110,255,.25), transparent); margin: 0; }

  /* CHECK LIST */
  .check-li { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #8a96a8; line-height: 1.5; }
  .check-dot { width: 18px; height: 18px; border-radius: 50%; background: rgba(26,110,255,.15); border: 1px solid rgba(26,110,255,.4); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
  .check-dot::after { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #1a6eff; }

  /* NAV LINK */
  .nav-link { font-size: 13px; font-weight: 500; color: #8a96a8; padding: 6px 14px; border-radius: 8px; transition: all .15s; }
  .nav-link:hover { color: #fff; background: rgba(255,255,255,.05); }

  /* NÚMERO GRANDE */
  .big-n { font-size: clamp(48px, 8vw, 96px); font-weight: 900; letter-spacing: -0.04em; line-height: 1; color: #fff; }

  /* CHIP */
  .chip { display: inline-flex; align-items: center; gap: 6px; font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(26,110,255,.3); background: rgba(26,110,255,.08); color: #1a6eff; }

  .line-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .line-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
`;

/* ── NAV ─────────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { l: "Productos", h: "#productos" },
    { l: "Cómo funciona", h: "#metodo" },
    { l: "Apps", h: "#apps" },
    { l: "Integraciones", h: "#integraciones" },
    { l: "Precios", h: "#precios" },
    { l: "Blog", h: "#blog" },
    { l: "Legal", h: "#legal" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", inset: "0 0 auto", zIndex: 100,
        background: solid ? "rgba(0,0,0,.92)" : "transparent",
        backdropFilter: solid ? "blur(20px)" : "none",
        borderBottom: solid ? "1px solid rgba(26,110,255,.12)" : "1px solid transparent",
        transition: "all .3s",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #0a0a0f 0%, #0a1628 100%)",
              border: "1px solid rgba(26,110,255,.5)", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 16px rgba(26,110,255,.3)",
            }}>
              <span style={{ color: "#1a6eff", fontWeight: 900, fontSize: 18, fontFamily: "Inter" }}>V</span>
            </div>
            <div style={{ lineHeight: 1.1 }}>
              <span style={{ display: "block", color: "#fff", fontWeight: 700, fontSize: 14, letterSpacing: "-.01em" }}>V Momentum</span>
              <span style={{ display: "block", color: "#1a6eff", fontSize: 9, fontFamily: "IBM Plex Mono, monospace", letterSpacing: ".15em", textTransform: "uppercase" }}>SaaS · Technology · Apps</span>
            </div>
          </a>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="hide-mobile">
            {links.map(lk => <a key={lk.h} href={lk.h} className="nav-link">{lk.l}</a>)}
          </div>

          {/* Desktop CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="hide-mobile">
            <a href="https://www.linkedin.com/company/v-momentum-/" target="_blank" rel="noopener noreferrer" style={{ color: "#4a5a6a", transition: "color .2s" }} onMouseOver={e => (e.currentTarget.style.color = BLU)} onMouseOut={e => (e.currentTarget.style.color = "#4a5a6a")}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://x.com/LuisVmomentums" target="_blank" rel="noopener noreferrer" style={{ color: "#4a5a6a", transition: "color .2s" }} onMouseOver={e => (e.currentTarget.style.color = "#fff")} onMouseOut={e => (e.currentTarget.style.color = "#4a5a6a")}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://vforge.site" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: 13 }}>VForge ↗</a>
            <a href="#contacto" className="btn-primary" style={{ fontSize: 13, padding: "10px 20px" }}>Cotizar app</a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(v => !v)} style={{ background: "none", border: "none", color: "#c8d0e0", cursor: "pointer", padding: 8 }} className="show-mobile">
            {open
              ? <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: "fixed", inset: "64px 0 0", zIndex: 99,
          background: "rgba(0,0,0,.97)", backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(26,110,255,.12)",
          display: "flex", flexDirection: "column", padding: "16px 0 24px",
        }}>
          {links.map(lk => (
            <a key={lk.h} href={lk.h} onClick={() => setOpen(false)}
              style={{ padding: "14px 28px", fontSize: 16, fontWeight: 500, color: "#c8d0e0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
              {lk.l}
            </a>
          ))}
          <div style={{ padding: "20px 28px 0", display: "flex", flexDirection: "column", gap: 10 }}>
            <a href="#contacto" onClick={() => setOpen(false)} className="btn-primary" style={{ textAlign: "center" }}>Cotizar mi app</a>
            <a href="https://vforge.site" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ textAlign: "center" }}>Ir a VForge ↗</a>
            <div style={{ display: "flex", gap: 20, paddingTop: 12, paddingLeft: 4 }}>
              <a href="https://www.linkedin.com/company/v-momentum-/" target="_blank" rel="noopener noreferrer" style={{ color: SLV2 }}>LinkedIn</a>
              <a href="https://x.com/LuisVmomentums" target="_blank" rel="noopener noreferrer" style={{ color: SLV2 }}>X / Twitter</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── HERO ─────────────────────────────────────────────────────── */
function Hero() {
  const words = ["PWAs premium", "sistemas ERP", "apps fintech", "agentes IA", "marketplaces"];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(v => (v + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 24px 80px", overflow: "hidden" }}>
      {/* Glow de fondo */}
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,110,255,.12) 0%, transparent 65%)", pointerEvents: "none" }} />
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(26,110,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(26,110,255,.04) 1px,transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 900, width: "100%" }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, border: "1px solid rgba(26,110,255,.3)", background: "rgba(26,110,255,.07)", padding: "6px 16px", marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: BLU, boxShadow: `0 0 8px ${BLU}` }} />
          <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: BLU }}>
            Fábrica de software · México · 2026
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: "clamp(38px,7vw,88px)", fontWeight: 900, lineHeight: .96, letterSpacing: "-0.04em", color: "#fff", marginBottom: 24 }}>
          Construimos<br />
          <span style={{ color: BLU, textShadow: `0 0 40px ${BLU}88` }}>
            {words[idx]}
          </span>
          <br />
          <span style={{ color: SLV2, fontWeight: 300, fontSize: "clamp(28px,4.5vw,56px)" }}>
            que escalan de verdad.
          </span>
        </h1>

        <p style={{ fontSize: "clamp(16px,2vw,20px)", fontWeight: 400, color: SLV2, maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.65 }}>
          V Momentum es la fábrica de software más rápida de México.{" "}
          <span style={{ color: SLV, fontWeight: 500 }}>De idea a producción en 7 días.</span>{" "}
          Con IA, pagos, WhatsApp y automatización completa incluidos.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 64 }}>
          <a href="#contacto" className="btn-primary" style={{ fontSize: 15, padding: "14px 32px" }}>
            Quiero mi app →
          </a>
          <a href="#metodo" className="btn-ghost" style={{ fontSize: 15, padding: "14px 32px" }}>
            Cómo funciona
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px 48px" }}>
          {[["15+", "Apps en producción"], ["7 días", "Tiempo promedio"], ["40+", "Usuarios activos"], ["100%", "Código tuyo"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>{v}</div>
              <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: SLV2, textTransform: "uppercase", letterSpacing: ".12em", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "#3a4a5a", textTransform: "uppercase", letterSpacing: ".15em" }}>scroll</span>
        <div style={{ width: 1, height: 36, background: `linear-gradient(${BLU}88, transparent)` }} />
      </div>
    </section>
  );
}

/* ── SELLOS ───────────────────────────────────────────────────── */
function Seals() {
  return (
    <div style={{ borderTop: "1px solid rgba(26,110,255,.12)", borderBottom: "1px solid rgba(26,110,255,.12)", background: SURF, padding: "40px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ textAlign: "center", fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "#3a4a5a", textTransform: "uppercase", letterSpacing: ".15em", marginBottom: 24 }}>Certificado · Validado · Seguro</p>
        <div className="grid-4" style={{ gap: 12 }}>
          {SEALS.map(s => (
            <div key={s.title} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "14px 18px",
              borderRadius: 12, border: "1px solid rgba(26,110,255,.12)", background: BG,
            }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>{s.title}</div>
                <div style={{ fontSize: 11, color: SLV2, marginTop: 2 }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── PRODUCTOS ────────────────────────────────────────────────── */
const PRODUCTS = [
  { emoji: "⚡", name: "VForge", tag: "La Plataforma", color: BLU, desc: "Convierte tu idea en una app real. PWA, móvil o MCP — desplegada a producción con dominio, DB y panel admin en días, no meses." },
  { emoji: "🌋", name: "Vulcano", tag: "El Copiloto IA", color: "#00c8ff", desc: "La IA que construye contigo. Hablas y ejecuta: código, deploys, integraciones. Memoria persistente y contexto de todos tus proyectos." },
  { emoji: "🧠", name: "CMP Protocol", tag: "Nuestro Método", color: SLV, desc: "Context Minimum Protocol — 6 pasos de tu idea a un producto real: captura, análisis AI, diseño, roadmap, scope y deploy." },
  { emoji: "🛒", name: "Marketplace", tag: "Apps Listas", color: "#00e599", desc: "Catálogo de apps preconfiguradas. Elige, personaliza y despliega en horas, no semanas. Código open incluido." },
  { emoji: "🔌", name: "MCP Server", tag: "Conectividad", color: "#a78bfa", desc: "Conecta Claude, Cursor, VS Code y cualquier agente IA a tu proyecto vía protocolo MCP nativo con OAuth." },
  { emoji: "🏗️", name: "Workspace", tag: "Tu Panel", color: "#f97316", desc: "Dashboard centralizado para gestionar tu app, contratos, timeline, tokens y comunicación con el equipo." },
];

function Productos() {
  const [active, setActive] = useState(0);
  const p = PRODUCTS[active];
  return (
    <section id="productos" style={{ borderTop: "1px solid rgba(26,110,255,.1)" }}>
      <div className="section">
        <span className="eyebrow">Nuestros productos</span>
        <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: 40 }}>
          Una fábrica.<br /><span style={{ color: SLV2, fontWeight: 300 }}>Seis herramientas.</span>
        </h2>

        {/* Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {PRODUCTS.map((pr, i) => (
            <button key={pr.name} onClick={() => setActive(i)} style={{
              padding: "8px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
              transition: "all .2s", border: "1px solid",
              borderColor: active === i ? pr.color : "rgba(26,110,255,.15)",
              background: active === i ? `${pr.color}18` : "transparent",
              color: active === i ? pr.color : SLV2,
            }}>
              {pr.emoji} {pr.name}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div key={active} style={{
          borderRadius: 20, border: `1px solid ${p.color}30`, background: SURF,
          padding: "40px", display: "flex", flexWrap: "wrap", gap: 32,
          boxShadow: `0 0 60px ${p.color}12`,
        }}>
          <div style={{ flex: "1 1 320px" }}>
            <span className="chip" style={{ marginBottom: 20 }}>{p.tag}</span>
            <h3 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#fff", marginBottom: 16, letterSpacing: "-.03em" }}>
              {p.emoji} {p.name}
            </h3>
            <p style={{ fontSize: 17, color: SLV2, lineHeight: 1.7, maxWidth: 500 }}>{p.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 }}>
              <a href="#contacto" className="btn-primary">Empezar ahora →</a>
              <a href="https://vforge.site" target="_blank" rel="noopener noreferrer" className="btn-ghost">Ver en VForge ↗</a>
            </div>
          </div>
          <div style={{ flex: "0 0 240px", minWidth: 200 }}>
            <div style={{ background: BG, borderRadius: 14, border: "1px solid rgba(26,110,255,.12)", padding: "20px 22px" }}>
              <p style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "#3a4a5a", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 16 }}>Siempre incluye</p>
              {["Deploy en Vercel", "Auth con Clerk", "DB con Neon", "Código en tu GitHub", "Soporte post-launch", "Documentación técnica"].map(f => (
                <div key={f} className="check-li" style={{ marginBottom: 12 }}>
                  <div className="check-dot" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── MÉTODO ───────────────────────────────────────────────────── */
function Metodo() {
  return (
    <section id="metodo" style={{ background: SURF, borderTop: "1px solid rgba(26,110,255,.1)", borderBottom: "1px solid rgba(26,110,255,.1)" }}>
      <div className="section">
        <span className="eyebrow">Cómo funciona</span>
        <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: 48 }}>
          De idea a producción<br /><span style={{ color: BLU }}>en 4 pasos.</span>
        </h2>
        <div className="grid-4">
          {STEPS.map((s, i) => (
            <div key={s.n} className="card" style={{ position: "relative" }}>
              <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 12, color: BLU, fontWeight: 600, display: "block", marginBottom: 20 }}>{s.n}</span>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{s.t}</h3>
              <p style={{ fontSize: 14, color: SLV2, lineHeight: 1.65 }}>{s.d}</p>
              {i < STEPS.length - 1 && (
                <div style={{ position: "absolute", top: "50%", right: -9, width: 18, height: 1, background: `linear-gradient(90deg, ${BLU}44, transparent)` }} className="hide-mobile" />
              )}
            </div>
          ))}
        </div>
        {/* CMP callout */}
        <div style={{ marginTop: 32, padding: "28px 32px", borderRadius: 16, border: "1px solid rgba(26,110,255,.25)", background: "rgba(26,110,255,.05)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 36 }}>🧠</span>
          <div style={{ flex: 1, minWidth: 220 }}>
            <p style={{ fontWeight: 700, color: "#fff", fontSize: 16, marginBottom: 6 }}>Context Minimum Protocol (CMP)</p>
            <p style={{ fontSize: 14, color: SLV2 }}>Nuestro método de 6 pasos: Captura → Análisis AI → Diseño → Roadmap → Scope → Deploy. Entregamos en 7 días sin sorpresas.</p>
          </div>
          <a href="#contacto" className="btn-ghost" style={{ flexShrink: 0, borderColor: `${BLU}44`, color: BLU }}>Iniciar CMP →</a>
        </div>
      </div>
    </section>
  );
}

/* ── TIPOS DE APPS ────────────────────────────────────────────── */
function Apps() {
  return (
    <section id="apps" style={{ borderBottom: "1px solid rgba(26,110,255,.1)" }}>
      <div className="section">
        <span className="eyebrow">Qué construimos</span>
        <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: 48 }}>
          12 industrias.<br /><span style={{ color: SLV2, fontWeight: 300 }}>Un solo equipo.</span>
        </h2>
        <div className="grid-3" style={{ gap: 14 }}>
          {APP_TYPES.map(a => (
            <div key={a.name} className="card">
              <span style={{ fontSize: 28, display: "block", marginBottom: 14 }}>{a.icon}</span>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{a.name}</h3>
              <p style={{ fontSize: 13, color: SLV2, lineHeight: 1.65 }}>{a.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <p style={{ color: SLV2, fontSize: 14, marginBottom: 16 }}>¿Tu industria no está aquí?</p>
          <a href="#contacto" className="btn-primary">La construimos igual →</a>
        </div>
      </div>
    </section>
  );
}

/* ── INTEGRACIONES ────────────────────────────────────────────── */
function Integraciones() {
  return (
    <section id="integraciones" style={{ background: SURF, borderBottom: "1px solid rgba(26,110,255,.1)" }}>
      <div className="section">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="eyebrow" style={{ display: "block", textAlign: "center" }}>Ecosistema</span>
          <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, color: "#fff", letterSpacing: "-.03em", marginBottom: 14 }}>Conectado a todo.</h2>
          <p style={{ color: SLV2, maxWidth: 500, margin: "0 auto" }}>Todas tus herramientas favoritas, integradas desde el primer día sin configuración manual.</p>
        </div>

        {/* Grid integraciones */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 12, marginBottom: 36 }}>
          {INTEGRATIONS.map(int => (
            <div key={int.name} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              padding: "16px 10px", borderRadius: 12, border: "1px solid rgba(26,110,255,.12)",
              background: BG, transition: "all .2s", cursor: "default",
            }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = `${BLU}44`; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(26,110,255,.12)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
            >
              <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={`/integraciones/${int.file}`} alt={int.name} style={{ width: 28, height: 28, objectFit: "contain" }}
                  onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
              <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 9, color: SLV2, textAlign: "center", lineHeight: 1.3 }}>{int.name}</span>
            </div>
          ))}
        </div>

        {/* Badge MP */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{
            display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20,
            padding: "24px 32px", borderRadius: 16, border: "1px solid rgba(0,180,255,.25)",
            background: "rgba(0,130,255,.05)", maxWidth: 560, width: "100%",
          }}>
            <div style={{ width: 72, height: 72, borderRadius: 14, border: "1px solid rgba(0,180,255,.2)", background: "rgba(255,255,255,.04)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <img src="/badges/mp-checkout-pro.png" alt="Mercado Pago Checkout Pro" style={{ width: 52, height: 52, objectFit: "contain" }}
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Desarrollador Certificado Mercado Pago</p>
              <p style={{ color: SLV2, fontSize: 13 }}>Checkout Pro oficial · MXN y divisas · OXXO Pay · MSI</p>
              <p style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "#3a4a5a", marginTop: 6 }}>cert_3e7bf309614311f197f886b7d357c539</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PRECIOS ──────────────────────────────────────────────────── */
function Precios() {
  return (
    <section id="precios" style={{ borderBottom: "1px solid rgba(26,110,255,.1)" }}>
      <div className="section">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="eyebrow" style={{ display: "block", textAlign: "center" }}>Precios</span>
          <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, color: "#fff", letterSpacing: "-.03em", marginBottom: 14 }}>Transparentes. Sin letra chica.</h2>
          <p style={{ color: SLV2, maxWidth: 520, margin: "0 auto" }}>Pago único por proyecto. El código, el dominio y la infraestructura son tuyos desde el primer día.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {PLANS.map(pl => (
            <div key={pl.name} style={{
              borderRadius: 20, border: `1px solid ${pl.hot ? BLU : "rgba(26,110,255,.15)"}`,
              background: pl.hot ? "rgba(26,110,255,.07)" : SURF,
              padding: "32px 28px", display: "flex", flexDirection: "column",
              position: "relative",
              boxShadow: pl.hot ? `0 0 48px rgba(26,110,255,.18)` : "none",
            }}>
              {pl.hot && (
                <span style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: BLU, color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 999 }}>
                  Más popular
                </span>
              )}
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: pl.color, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>{pl.name}</span>
                <div style={{ fontSize: "clamp(32px,5vw,44px)", fontWeight: 900, color: "#fff", letterSpacing: "-.03em", lineHeight: 1 }}>{pl.price}</div>
                <div style={{ fontSize: 13, color: SLV2, marginTop: 6 }}>{pl.sub}</div>
              </div>
              <ul style={{ flex: 1, marginBottom: 28, listStyle: "none", display: "flex", flexDirection: "column", gap: 11 }}>
                {pl.features.map(f => (
                  <li key={f} className="check-li">
                    <div className="check-dot" style={{ borderColor: `${pl.color}50`, background: `${pl.color}12` }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: pl.color, display: "block" }} />
                    </div>
                    <span style={{ color: SLV }}>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#contacto" style={{
                display: "block", textAlign: "center", padding: "12px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all .2s",
                border: `1px solid ${pl.color}40`, color: pl.color, background: `${pl.color}10`,
                textDecoration: "none",
              }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = `${pl.color}20`; }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = `${pl.color}10`; }}
              >
                Cotizar este plan →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── BLOG ─────────────────────────────────────────────────────── */
function Blog() {
  return (
    <section id="blog" style={{ background: SURF, borderBottom: "1px solid rgba(26,110,255,.1)" }}>
      <div className="section">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
          <div>
            <span className="eyebrow">Blog</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#fff", letterSpacing: "-.03em" }}>
              Lo que sabemos,<br /><span style={{ color: SLV2, fontWeight: 300 }}>lo compartimos.</span>
            </h2>
          </div>
          <a href="https://vforge.site/blog" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: 13 }}>Ver todos →</a>
        </div>
        <div className="grid-3">
          {POSTS.map(p => (
            <div key={p.title} className="card" style={{ cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span className="chip">{p.tag}</span>
                <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "#3a4a5a" }}>{p.date}</span>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.4, marginBottom: 10 }} className="line-2">{p.title}</h3>
              <p style={{ fontSize: 13, color: SLV2, lineHeight: 1.65 }} className="line-3">{p.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── REDES ────────────────────────────────────────────────────── */
function Redes() {
  return (
    <section style={{ borderBottom: "1px solid rgba(26,110,255,.1)" }}>
      <div className="section" style={{ textAlign: "center" }}>
        <span className="eyebrow" style={{ display: "block", textAlign: "center" }}>Comunidad</span>
        <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#fff", letterSpacing: "-.03em", marginBottom: 36 }}>Construimos en público.</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
          {[
            { href: "https://www.linkedin.com/company/v-momentum-/", icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>, label: "LinkedIn", sub: "V Momentum · Company" },
            { href: "https://x.com/LuisVmomentums", icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, label: "X / Twitter", sub: "@LuisVmomentums" },
            { href: "https://vforge.site", icon: <span style={{ fontWeight: 900, fontSize: 18, color: BLU }}>V</span>, label: "VForge", sub: "vforge.site · La plataforma" },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: 14, padding: "16px 24px", borderRadius: 14,
              border: "1px solid rgba(26,110,255,.15)", background: SURF,
              transition: "all .2s", color: SLV2, minWidth: 220,
            }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = `${BLU}44`; (e.currentTarget as HTMLElement).style.background = `${BLU}08`; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(26,110,255,.15)"; (e.currentTarget as HTMLElement).style.background = SURF; }}
            >
              <span style={{ color: SLV2 }}>{s.icon}</span>
              <div style={{ textAlign: "left" }}>
                <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, lineHeight: 1.2 }}>{s.label}</p>
                <p style={{ color: SLV2, fontSize: 12, marginTop: 2 }}>{s.sub}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── LEGAL ────────────────────────────────────────────────────── */
function Legal() {
  const [open, setOpen] = useState<string | null>(null);
  const docs = [
    { id: "t", icon: "📋", title: "Términos y Condiciones", body: `V Momentum es operado por All Global Holding LLC, sociedad registrada en Wyoming, EE.UU. El contrato se formaliza con firma electrónica y pago del anticipo (50%). El cliente recibe código fuente completo, repositorio en su GitHub y dominio a su nombre al completar el proyecto. V Momentum no retiene propiedad intelectual del cliente. Garantía de 30 días post-entrega para corrección de bugs. Modificaciones mayores se cotizan por separado. La relación es de prestación de servicios independiente, no laboral.` },
    { id: "p", icon: "🔒", title: "Política de Privacidad", body: `Recopilamos únicamente los datos necesarios: nombre, empresa, correo y WhatsApp. Se almacenan en Neon Postgres (AES-256 en reposo, TLS en tránsito) y Airtable como CRM. No vendemos ni compartimos datos con terceros para publicidad. Eliminamos datos a solicitud en 30 días. El sitio usa Google Analytics (AW-18205066708) para medir conversiones. Contacto: luisdelator@vmomentums.info` },
    { id: "c", icon: "✍️", title: "Modelo de Contrato", body: `Todo proyecto incluye: (1) Descripción exacta del alcance MVP. (2) Timeline con fechas comprometidas. (3) Módulos incluidos y excluidos. (4) Pagos: 50% anticipo, 50% contra entrega. (5) Garantía 30 días. (6) Propiedad intelectual 100% del cliente. (7) Condiciones de cambio de alcance. Firma digital. CLABE: 722969010740807451.` },
    { id: "s", icon: "⚡", title: "SLA · Garantías", body: `Compromisos: (1) Respuesta inicial < 2 horas hábiles vía WhatsApp. (2) Entrega MVP en el plazo acordado (7-14 días promedio). (3) Deploy sin downtime en Vercel Edge. (4) Uptime ≥ 99.5% medido en Vercel. (5) Bugs críticos corregidos en < 24 horas durante garantía. (6) Backups automáticos diarios en Neon. Incumplimiento: descuento proporcional sobre pago final.` },
  ];
  return (
    <section id="legal" style={{ background: SURF, borderBottom: "1px solid rgba(26,110,255,.1)" }}>
      <div className="section">
        <span className="eyebrow">Legal</span>
        <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, color: "#fff", letterSpacing: "-.03em", marginBottom: 40 }}>
          Todo claro.<br /><span style={{ color: SLV2, fontWeight: 300 }}>Desde el inicio.</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 800 }}>
          {docs.map(d => (
            <div key={d.id} style={{ borderRadius: 14, border: "1px solid rgba(26,110,255,.15)", background: BG, overflow: "hidden" }}>
              <button onClick={() => setOpen(open === d.id ? null : d.id)} style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "18px 22px", background: "none", border: "none", cursor: "pointer", color: "#fff", gap: 12,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 20 }}>{d.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{d.title}</span>
                </div>
                <span style={{ color: SLV2, transform: open === d.id ? "rotate(180deg)" : "none", transition: "transform .2s", fontSize: 18, flexShrink: 0 }}>▾</span>
              </button>
              {open === d.id && (
                <div style={{ padding: "0 22px 22px" }}>
                  <div style={{ borderTop: "1px solid rgba(26,110,255,.1)", paddingTop: 18 }}>
                    <p style={{ fontSize: 14, color: SLV2, lineHeight: 1.75 }}>{d.body}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, padding: "16px 22px", borderRadius: 12, border: "1px solid rgba(26,110,255,.1)", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: SLV2 }}>All Global Holding LLC · Wyoming, USA</span>
          <span style={{ color: "#2a3a4a" }}>·</span>
          <a href="mailto:luisdelator@vmomentums.info" style={{ fontSize: 13, color: BLU }}>luisdelator@vmomentums.info</a>
          <span style={{ color: "#2a3a4a" }}>·</span>
          <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 12, color: SLV2 }}>CLABE 722969010740807451</span>
        </div>
      </div>
    </section>
  );
}

/* ── CONTACTO ─────────────────────────────────────────────────── */
function Contacto() {
  const [form, setForm] = useState({ nombre: "", empresa: "", tipo: "", mensaje: "" });
  const [st, setSt] = useState<"idle"|"loading"|"ok"|"error">("idle");

  const send = async () => {
    if (!form.nombre || form.nombre.length < 2) return;
    setSt("loading");
    try {
      const r = await fetch("http://178.105.135.26:3003/lead", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, fuente: "vmomentum.site", servicio: form.tipo || "App/PWA" }),
      });
      if (r.ok) {
        setSt("ok");
        setForm({ nombre: "", empresa: "", tipo: "", mensaje: "" });
        if (typeof window !== "undefined" && (window as any).gtag)
          (window as any).gtag("event", "conversion", { send_to: "AW-18205066708" });
      } else setSt("error");
    } catch { setSt("error"); }
  };

  return (
    <section id="contacto" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(26,110,255,.1) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="section" style={{ position: "relative", zIndex: 1, maxWidth: 680 }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <span className="eyebrow" style={{ display: "block", textAlign: "center" }}>Empieza hoy</span>
          <h2 style={{ fontSize: "clamp(36px,6vw,68px)", fontWeight: 900, color: "#fff", letterSpacing: "-.04em", lineHeight: 1, marginBottom: 14 }}>
            Tu app<br />en <span style={{ color: BLU, textShadow: `0 0 40px ${BLU}88` }}>7 días.</span>
          </h2>
          <p style={{ color: SLV2, fontSize: 17 }}>Desde $12,000 MXN. Sin sorpresas. El código es tuyo.</p>
        </div>

        {st === "ok" ? (
          <div style={{ textAlign: "center", padding: "48px 24px", borderRadius: 20, border: `1px solid ${BLU}30`, background: `${BLU}08` }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 22, marginBottom: 8 }}>¡Mensaje recibido!</h3>
            <p style={{ color: SLV2 }}>Te contactamos en menos de 2 horas por WhatsApp.</p>
          </div>
        ) : (
          <div style={{ borderRadius: 20, border: `1px solid ${BLU}25`, background: SURF, padding: "36px 32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {([
                ["nombre", "Nombre *", "Tu nombre completo"],
                ["empresa", "Empresa", "Nombre de tu negocio"],
              ] as const).map(([k, l, ph]) => (
                <div key={k}>
                  <label style={{ display: "block", fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: SLV2, textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 8 }}>{l}</label>
                  <input className="inp" value={(form as any)[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} placeholder={ph} />
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: SLV2, textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 8 }}>¿Qué tipo de app necesitas?</label>
                <input className="inp" value={form.tipo} onChange={e => setForm(p => ({ ...p, tipo: e.target.value }))} placeholder="Ej: app de entregas, ERP para clínica, tienda en línea..." />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: SLV2, textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 8 }}>Mensaje (opcional)</label>
                <textarea className="inp" value={form.mensaje} onChange={e => setForm(p => ({ ...p, mensaje: e.target.value }))} placeholder="Cuéntanos más..." rows={3} style={{ resize: "none" }} />
              </div>
              <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10 }}>
                <button onClick={send} disabled={st === "loading" || !form.nombre} className="btn-primary" style={{ flex: 1, padding: "14px", fontSize: 15, opacity: (!form.nombre || st === "loading") ? .5 : 1, cursor: (!form.nombre || st === "loading") ? "not-allowed" : "pointer" }}>
                  {st === "loading" ? "Enviando..." : "Quiero mi app →"}
                </button>
                <a href="https://wa.me/529984292748?text=Hola%2C+vi+V+Momentum+y+quiero+cotizar+mi+app" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: "14px 18px", fontSize: 20 }}>💬</a>
              </div>
              {st === "error" && <p style={{ gridColumn: "1 / -1", color: "#ef4444", fontSize: 13, textAlign: "center" }}>Error al enviar. Escríbenos directo por WhatsApp.</p>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── FOOTER ───────────────────────────────────────────────────── */
function Footer() {
  const cols = [
    { t: "Productos", ls: [["VForge", "https://vforge.site"], ["Vulcano IA", "https://vforge.site/vulcano"], ["Marketplace", "https://vforge.site/marketplace"], ["Precios", "#precios"]] },
    { t: "Recursos", ls: [["Blog", "#blog"], ["Método CMP", "#metodo"], ["Integraciones", "#integraciones"], ["Tipos de apps", "#apps"]] },
    { t: "Empresa", ls: [["Legal", "#legal"], ["Privacidad", "#legal"], ["Soporte WhatsApp", "https://wa.me/529984292748"], ["Contacto", "#contacto"]] },
  ];
  return (
    <footer style={{ borderTop: "1px solid rgba(26,110,255,.12)", background: SURF }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(3, 1fr)", gap: 32, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: BG, border: `1px solid ${BLU}50`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: BLU, fontWeight: 900, fontSize: 16 }}>V</span>
              </div>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>V Momentum</span>
            </div>
            <p style={{ color: SLV2, fontSize: 13, lineHeight: 1.65, maxWidth: 220, marginBottom: 18 }}>Fábrica de software premium. Apps PWA en 7 días con IA y automatización.</p>
            <div style={{ display: "flex", gap: 14 }}>
              <a href="https://www.linkedin.com/company/v-momentum-/" target="_blank" rel="noopener noreferrer" style={{ color: "#3a4a5a", transition: "color .2s" }} onMouseOver={e => (e.currentTarget.style.color = BLU)} onMouseOut={e => (e.currentTarget.style.color = "#3a4a5a")}>
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://x.com/LuisVmomentums" target="_blank" rel="noopener noreferrer" style={{ color: "#3a4a5a", transition: "color .2s" }} onMouseOver={e => (e.currentTarget.style.color = "#fff")} onMouseOut={e => (e.currentTarget.style.color = "#3a4a5a")}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
          {cols.map(c => (
            <div key={c.t}>
              <p style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "#3a4a5a", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 14 }}>{c.t}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                {c.ls.map(([l, h]) => <li key={l}><a href={h} style={{ fontSize: 13, color: SLV2, transition: "color .15s" }} onMouseOver={e => (e.currentTarget.style.color = "#fff")} onMouseOut={e => (e.currentTarget.style.color = SLV2)}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(26,110,255,.1)", paddingTop: 24, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 8 }}>
          <span style={{ color: "#2a3a4a", fontSize: 12 }}>© 2026 All Global Holding LLC · Wyoming, USA</span>
          <span style={{ fontFamily: "IBM Plex Mono, monospace", color: "#2a3a4a", fontSize: 11 }}>Built with VForge + Vulcano · vforge.site</span>
        </div>
      </div>
    </footer>
  );
}

/* ── RESPONSIVE HELPERS ───────────────────────────────────────── */
const RESP = `
  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    .show-mobile { display: flex !important; }
    .grid-footer { grid-template-columns: 1fr 1fr !important; }
  }
  @media (min-width: 769px) {
    .show-mobile { display: none !important; }
    .hide-mobile { display: flex !important; }
  }
  @media (max-width: 480px) {
    .grid-footer { grid-template-columns: 1fr !important; }
  }
`;

/* ── ROOT ─────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <style>{G + RESP}</style>
      <Nav />
      <main>
        <Hero />
        <Seals />
        <Productos />
        <Metodo />
        <Apps />
        <Integraciones />
        <Precios />
        <Blog />
        <Redes />
        <Legal />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
