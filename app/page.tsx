
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

/* ─── ICONOS SVG inline ─────────────────────────────────── */
const Ico = ({ d, size = 20, className = "", fill = false }: { d: string; size?: number; className?: string; fill?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);
const IconMenu = () => <Ico d="M3 6h18M3 12h18M3 18h18" />;
const IconX = () => <Ico d="M18 6L6 18M6 6l12 12" />;
const IconArrow = () => <Ico d="M5 12h14M12 5l7 7-7 7" />;
const IconCheck = () => <Ico d="M20 6L9 17l-5-5" />;
const IconStar = () => <Ico d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill />;
const IconLinkedIn = () => <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
const IconX2 = () => <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;

/* ─── DATOS ──────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Productos", href: "#productos" },
  { label: "Método", href: "#metodo" },
  { label: "Tipos de apps", href: "#apps" },
  { label: "Integraciones", href: "#integraciones" },
  { label: "Precios", href: "#precios" },
  { label: "Blog", href: "#blog" },
  { label: "Legal", href: "#legal" },
];

const PRODUCTS = [
  { name: "VForge", tag: "La Plataforma", color: "#a78bfa", desc: "Convierte tu idea en una app real. PWA, móvil o MCP — desplegada a producción con dominio, base de datos y panel admin.", icon: "⚡" },
  { name: "Vulcano", tag: "El Copiloto IA", color: "#22d3ee", desc: "La IA que construye contigo. Hablas y ejecuta: escribe código, conecta integraciones, despliega y vigila tu infraestructura.", icon: "🌋" },
  { name: "CMP Protocol", tag: "Método Estrella", color: "#fbbf24", desc: "Context Minimum Protocol. 6 pasos de tu idea a un producto real: captura, análisis AI, diseño, roadmap, scope y deploy.", icon: "🧠" },
  { name: "Marketplace", tag: "Apps Listas", color: "#10b981", desc: "Catálogo de plantillas y apps preconfiguradas. Elige, personaliza y despliega en horas, no semanas.", icon: "🛒" },
  { name: "Workspace", tag: "Tu Espacio", color: "#f97316", desc: "Panel centralizado para gestionar tu app, contratos, timeline, tokens y comunicación con el equipo.", icon: "🏗️" },
  { name: "MCP Server", tag: "Conectividad", color: "#c084fc", desc: "Conecta Claude, Cursor, VS Code y cualquier agente IA a tu proyecto. Protocolo MCP nativo.", icon: "🔌" },
];

const APP_TYPES = [
  { icon: "💳", name: "Fintech & Crédito", desc: "Plataformas de microcrédito, scoring de riesgo, cobranza automatizada, OXXO Pay, Mercado Pago." },
  { icon: "🚗", name: "Movilidad & Logística", desc: "Apps de ride-hailing, tracking en tiempo real, despacho de flotas, precios dinámicos." },
  { icon: "🍔", name: "Restaurantes & Food", desc: "Pedidos en línea, sistema de mesas, cocina digital, repartidores y pagos en app." },
  { icon: "🏥", name: "Salud & Clínicas", desc: "Expediente clínico digital, citas, telemedicina, recordatorios y prescripciones." },
  { icon: "⚰️", name: "Servicios Funerarios", desc: "ERP completo para financiamiento, contratos, seguimiento de servicios y cobranza." },
  { icon: "🏗️", name: "Construcción & RRHH", desc: "Control de asistencia, nómina, avance de obra, inventario y gestión de trabajadores." },
  { icon: "🏫", name: "Educación & Cursos", desc: "LMS propio, video, quizzes, certificados digitales, cobro por suscripción o módulo." },
  { icon: "🛒", name: "eCommerce & Retail", desc: "Tienda PWA instalable, inventario, punto de venta, multi-sucursal y reportes." },
  { icon: "🎵", name: "Entretenimiento", desc: "Apps de música, redes sociales verticales, portafolios de artistas, streaming." },
  { icon: "🏠", name: "Real Estate", desc: "Marketplace de propiedades, fideicomiso digital, firma electrónica, pagos fraccionados." },
  { icon: "🌮", name: "Turismo & Hospitality", desc: "Reservas, check-in digital, mapas offline, guías y pagos con tarjeta o cash." },
  { icon: "⚽", name: "Deportes & Fitness", desc: "Academias, rutinas personalizadas, torneos, ranking y comunidad de atletas." },
];

const INTEGRATIONS = [
  { name: "Mercado Pago", file: "mercadopago.svg", color: "#00b1ea" },
  { name: "Stripe", file: "stripe.svg", color: "#635bff" },
  { name: "Clerk", file: "clerk.svg", color: "#6c47ff" },
  { name: "Neon", file: "neon.svg", color: "#00e599" },
  { name: "Vercel", file: "vercel.svg", color: "#ffffff" },
  { name: "WhatsApp", file: "whatsapp.svg", color: "#25d366" },
  { name: "Claude", file: "claude.svg", color: "#d97706" },
  { name: "OpenAI", file: "openai.svg", color: "#ffffff" },
  { name: "Hetzner", file: "hetzner.svg", color: "#e5242a" },
  { name: "Resend", file: "resend.svg", color: "#ffffff" },
  { name: "Twilio", file: "twilio.svg", color: "#f22f46" },
  { name: "GitHub", file: "github.svg", color: "#ffffff" },
  { name: "Airtable", file: "airtable.svg", color: "#18bfff" },
  { name: "Google", file: "google.svg", color: "#4285f4" },
  { name: "Slack", file: "slack.svg", color: "#4a154b" },
  { name: "OpenRouter", file: "openrouter.svg", color: "#ffffff" },
];

const TRUST_BADGES = [
  { icon: "🔒", label: "SSL Certificado", sub: "HTTPS en todos los proyectos" },
  { icon: "✅", label: "Clerk Auth", sub: "Autenticación enterprise-grade" },
  { icon: "🏦", label: "Mercado Pago Certified", sub: "Desarrollador oficial · cert_3e7bf3" },
  { icon: "🛡️", label: "Neon Postgres", sub: "Base de datos con cifrado en reposo" },
  { icon: "🌐", label: "Vercel Edge", sub: "Deploy global en 150+ regiones" },
  { icon: "🤖", label: "Anthropic Partner", sub: "API Claude con seguridad reforzada" },
];

const PLANS = [
  {
    name: "Starter", price: "$12,000", period: "MXN · pago único", color: "#a78bfa",
    features: ["PWA instalable iOS & Android", "Hasta 3 módulos", "Auth con Clerk", "Base de datos Neon", "Deploy Vercel", "Tu repo en GitHub"],
    popular: false,
  },
  {
    name: "Pro", price: "$22,000", period: "MXN · pago único", color: "#22d3ee",
    features: ["Todo Starter +", "Hasta 8 módulos", "Pagos Mercado Pago / Stripe", "WhatsApp notifications", "Email transaccional Resend", "Panel admin completo", "IA integrada con Vulcano"],
    popular: true,
  },
  {
    name: "Enterprise", price: "A cotizar", period: "según alcance", color: "#fbbf24",
    features: ["Todo Pro +", "Módulos ilimitados", "Multi-sucursal y multi-tenant", "Automatizaciones MCP", "Agentes IA propios", "Integraciones custom", "Soporte prioritario"],
    popular: false,
  },
];

const BLOG_POSTS = [
  { tag: "Producto", date: "Jun 2026", title: "CMP: el método que convierte ideas en productos reales en 6 pasos", excerpt: "El Context Minimum Protocol es la forma en que V Momentum captura tu idea, la analiza con IA y la convierte en un roadmap accionable antes de escribir una línea de código." },
  { tag: "Técnico", date: "May 2026", title: "Por qué todas nuestras apps son PWA y no apps nativas", excerpt: "Una PWA instala en iOS y Android sin App Store, actualiza sin permiso del usuario y cuesta 10x menos de mantener. Te explicamos el stack exacto que usamos." },
  { tag: "Casos", date: "May 2026", title: "Cómo construimos un ERP funerario en 14 días con Next.js y Neon", excerpt: "PREMMEX maneja contratos, cobranza y 4 planes de servicio. Aquí el proceso técnico, las decisiones de arquitectura y lo que haríamos diferente." },
  { tag: "IA", date: "Abr 2026", title: "Vulcano: el copiloto que sabe más de tu proyecto que tú mismo", excerpt: "Memoria persistente en Neon, contexto de todos tus repos en GitHub y capacidad de ejecutar comandos en Hetzner. Así funciona el enjambre de agentes de V Momentum." },
  { tag: "Negocio", date: "Abr 2026", title: "El stack de pagos mexicano en 2026: Mercado Pago + Stripe + OXXO Pay", excerpt: "Qué elegir según tu mercado, cómo combinar procesadores y por qué la certificación Checkout Pro de Mercado Pago importa para tus clientes." },
  { tag: "Tutorial", date: "Mar 2026", title: "MCP Server propio: conecta Claude a tu proyecto en 20 minutos", excerpt: "Despliega un servidor MCP en Hetzner, configura OAuth con Clerk y permite que cualquier agente IA lea y escriba tu base de datos con permisos granulares." },
];

const METHOD_STEPS = [
  { n: "01", title: "Conectas tu mundo", desc: "WhatsApp, pagos, tu base de datos, tus herramientas. Se enlazan por MCP automáticamente." },
  { n: "02", title: "Le hablas al agente", desc: "En palabras normales. Vulcano arma tus apps, automatizaciones y procesos por ti." },
  { n: "03", title: "Revisas y apruebas", desc: "Ves el avance en tiempo real. Sin código, sin caos. El control es tuyo." },
  { n: "04", title: "Sales a producción", desc: "Deploy en Vercel con dominio propio. El código y la infraestructura son tuyos para siempre." },
];

/* ─── COMPONENTE CARRUSEL ────────────────────────────────── */
function Carousel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [can, setCan] = useState({ l: false, r: true });
  const scroll = (dir: 1 | -1) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir * 320, behavior: "smooth" });
  };
  const check = () => {
    const el = ref.current;
    if (!el) return;
    setCan({ l: el.scrollLeft > 8, r: el.scrollLeft < el.scrollWidth - el.clientWidth - 8 });
  };
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", check, { passive: true });
    check();
    return () => el.removeEventListener("scroll", check);
  }, []);
  return (
    <div className={`relative ${className}`}>
      {can.l && (
        <button onClick={() => scroll(-1)} className="carousel-btn left-0 -translate-x-1/2">‹</button>
      )}
      <div ref={ref} className="flex gap-4 overflow-x-auto pb-3 scroll-smooth" style={{ scrollbarWidth: "none" }}>
        {children}
      </div>
      {can.r && (
        <button onClick={() => scroll(1)} className="carousel-btn right-0 translate-x-1/2">›</button>
      )}
    </div>
  );
}

/* ─── NAV ────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const close = () => setOpen(false);
  return (
    <>
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[rgba(3,2,10,0.85)] backdrop-blur-xl border-b border-violet-500/10" : "bg-transparent"}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_30px_rgba(124,58,237,0.7)] transition-shadow">
              <span className="text-white font-bold text-[15px]">V</span>
            </div>
            <div className="leading-none">
              <span className="block text-sm font-bold text-white tracking-tight">V Momentum</span>
              <span className="block text-[10px] font-mono text-violet-400 uppercase tracking-widest">Software Factory</span>
            </div>
          </a>
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="px-3 py-1.5 text-[13px] font-medium text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">{l.label}</a>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://www.linkedin.com/company/v-momentum-/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-violet-300 transition-colors"><IconLinkedIn /></a>
            <a href="https://x.com/LuisVmomentums" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors"><IconX2 /></a>
            <a href="https://vforge.site" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">Ir a VForge ↗</a>
            <a href="#contacto" className="btn-primary text-sm">Cotizar app</a>
          </div>
          <button onClick={() => setOpen(v => !v)} className="lg:hidden text-zinc-400 hover:text-white transition-colors p-2">
            {open ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="fixed inset-x-0 top-16 z-40 bg-[rgba(3,2,10,0.97)] backdrop-blur-xl border-b border-violet-500/10 lg:hidden">
          <div className="flex flex-col py-4">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={close} className="px-6 py-3 text-[15px] font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors">{l.label}</a>
            ))}
            <div className="flex gap-3 px-6 pt-4 pb-2">
              <a href="https://vforge.site" target="_blank" rel="noopener noreferrer" onClick={close} className="btn-outline text-sm flex-1 text-center">VForge ↗</a>
              <a href="#contacto" onClick={close} className="btn-primary text-sm flex-1 text-center">Cotizar</a>
            </div>
            <div className="flex gap-4 px-6 pt-2 pb-4">
              <a href="https://www.linkedin.com/company/v-momentum-/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-violet-300 transition-colors"><IconLinkedIn /></a>
              <a href="https://x.com/LuisVmomentums" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors"><IconX2 /></a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── HERO ───────────────────────────────────────────────── */
function Hero() {
  const [tick, setTick] = useState(0);
  const words = ["PWAs premium", "apps fintech", "sistemas ERP", "agentes IA", "marketplaces"];
  useEffect(() => {
    const t = setInterval(() => setTick(v => v + 1), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-20 px-4">
      {/* Auras */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 65%)" }} />
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 65%)" }} />
      {/* Grid */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(139,92,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-violet-300">Fábrica de software · México · 2026</span>
        </div>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[.93] tracking-[-0.04em] text-white mb-6">
          Construimos
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent transition-all duration-500">
            {words[tick % words.length]}
          </span>
          <br />
          <span className="text-zinc-500 font-light text-4xl sm:text-5xl lg:text-6xl">que escalan de verdad.</span>
        </h1>
        <p className="text-lg sm:text-xl font-light text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          V Momentum es la fábrica de software más rápida de México. <span className="text-violet-300 font-medium">De idea a producción en 7 días.</span> Con IA, pagos, WhatsApp y automatización incluidos.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <a href="#productos" className="btn-primary px-8 py-4 text-base gap-2 w-full sm:w-auto">
            Ver productos <IconArrow />
          </a>
          <a href="#contacto" className="btn-outline px-8 py-4 text-base w-full sm:w-auto">Cotizar mi app →</a>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
          {[["15+", "Apps en producción"], ["7 días", "Tiempo promedio"], ["40+", "Clientes activos"]].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-white">{v}</div>
              <div className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-wider mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-violet-500/60 to-transparent rounded-full animate-bounce" />
      </div>
    </section>
  );
}

/* ─── SELLOS DE CONFIANZA ────────────────────────────────── */
function Trust() {
  return (
    <section className="border-y border-violet-500/10 bg-[#06050f] py-10 px-4">
      <div className="mx-auto max-w-7xl">
        <p className="text-center font-mono text-[11px] uppercase tracking-widest text-violet-400 mb-6">Validado · Certificado · Seguro</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {TRUST_BADGES.map(b => (
            <div key={b.label} className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-violet-500/10 bg-[#0a0814] hover:border-violet-500/25 transition-colors text-center">
              <span className="text-2xl">{b.icon}</span>
              <span className="text-[12px] font-semibold text-white leading-tight">{b.label}</span>
              <span className="text-[10px] text-zinc-500 leading-tight">{b.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PRODUCTOS ──────────────────────────────────────────── */
function Productos() {
  const [active, setActive] = useState(0);
  const p = PRODUCTS[active];
  return (
    <section id="productos" className="py-20 px-4 bg-[#03020a]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="font-mono text-[11px] uppercase tracking-widest text-cyan-400 mb-3">Nuestros productos</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Una fábrica. <span className="text-zinc-500 font-light">Seis herramientas.</span>
          </h2>
        </div>
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {PRODUCTS.map((pr, i) => (
            <button key={pr.name} onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${active === i ? "text-white border" : "text-zinc-500 border border-zinc-800 hover:border-zinc-600 hover:text-zinc-300"}`}
              style={active === i ? { borderColor: pr.color, background: `${pr.color}18`, color: pr.color } : {}}>
              {pr.icon} {pr.name}
            </button>
          ))}
        </div>
        {/* Panel activo */}
        <div key={active} className="rounded-3xl border bg-[#0d0b1a] p-8 sm:p-12" style={{ borderColor: `${p.color}30` }}>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <span className="font-mono text-xs uppercase tracking-widest mb-3 block" style={{ color: p.color }}>{p.tag}</span>
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">{p.icon} {p.name}</h3>
              <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">{p.desc}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#contacto" className="btn-primary px-6 py-3">Empieza ahora <IconArrow /></a>
                <a href="https://vforge.site" target="_blank" rel="noopener noreferrer" className="btn-outline px-6 py-3">Ver en VForge ↗</a>
              </div>
            </div>
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="rounded-2xl border border-zinc-800 bg-[#06050f] p-6 space-y-3">
                <p className="font-mono text-xs text-zinc-600 uppercase tracking-wider mb-4">Incluye</p>
                {["Deploy en Vercel", "Auth con Clerk", "DB con Neon", "Código en tu GitHub", "Soporte post-launch", "Documentación"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-zinc-400">
                    <IconCheck /> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Carrusel mobile de productos */}
        <div className="mt-8 lg:hidden">
          <Carousel>
            {PRODUCTS.filter((_, i) => i !== active).map(pr => (
              <button key={pr.name} onClick={() => setActive(PRODUCTS.indexOf(pr))}
                className="flex-shrink-0 w-56 rounded-2xl border border-zinc-800 bg-[#0d0b1a] p-5 text-left hover:border-violet-500/30 transition-colors">
                <span className="text-2xl mb-2 block">{pr.icon}</span>
                <span className="block font-bold text-white text-sm mb-1">{pr.name}</span>
                <span className="block text-xs text-zinc-500 line-clamp-2">{pr.desc}</span>
              </button>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

/* ─── MÉTODO ─────────────────────────────────────────────── */
function Metodo() {
  return (
    <section id="metodo" className="py-20 px-4 bg-[#06050f] border-y border-violet-500/10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="font-mono text-[11px] uppercase tracking-widest text-violet-400 mb-3">Cómo funciona</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Un agente. Tu mundo conectado. <span className="text-violet-400">4 pasos.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {METHOD_STEPS.map((s, i) => (
            <div key={s.n} className="relative rounded-2xl border border-zinc-800 bg-[#0a0814] p-7 hover:border-violet-500/30 transition-colors">
              {i < METHOD_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-violet-500/30 -translate-y-1/2" />
              )}
              <span className="font-mono text-violet-500 text-sm font-bold block mb-4">{s.n}</span>
              <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        {/* CMP badge */}
        <div className="mt-10 p-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="text-3xl flex-shrink-0">🧠</span>
          <div>
            <p className="text-cyan-300 font-bold mb-1">Context Minimum Protocol (CMP)</p>
            <p className="text-zinc-400 text-sm">Nuestro método patentado de 6 pasos: Captura → Análisis AI → Dirección visual → Roadmap → Scope → Deploy. Es lo que nos permite entregar en 7 días sin sorpresas.</p>
          </div>
          <a href="#contacto" className="flex-shrink-0 btn-outline border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 text-sm px-5 py-2.5">Empezar CMP →</a>
        </div>
      </div>
    </section>
  );
}

/* ─── TIPOS DE APPS ──────────────────────────────────────── */
function TiposApps() {
  return (
    <section id="apps" className="py-20 px-4 bg-[#03020a]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="font-mono text-[11px] uppercase tracking-widest text-cyan-400 mb-3">Qué construimos</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            12 industrias. <span className="text-zinc-500 font-light">Un equipo.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {APP_TYPES.map(a => (
            <div key={a.name} className="group rounded-2xl border border-zinc-800 bg-[#0d0b1a] p-6 hover:border-violet-500/30 hover:-translate-y-0.5 transition-all duration-200">
              <span className="text-2xl mb-3 block">{a.icon}</span>
              <h3 className="text-white font-bold mb-2 text-[15px]">{a.name}</h3>
              <p className="text-zinc-500 text-[13px] leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-zinc-500 text-sm mb-4">¿Tu industria no está aquí?</p>
          <a href="#contacto" className="btn-primary px-8 py-3">La construimos igual →</a>
        </div>
      </div>
    </section>
  );
}

/* ─── INTEGRACIONES ──────────────────────────────────────── */
function Integraciones() {
  return (
    <section id="integraciones" className="py-20 px-4 bg-[#06050f] border-y border-violet-500/10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="font-mono text-[11px] uppercase tracking-widest text-violet-400 mb-3">Ecosistema</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">Conectado a todo.</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">Todas tus herramientas favoritas, integradas desde el primer día. Sin configuración manual.</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {INTEGRATIONS.map(int => (
            <div key={int.name} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-zinc-800 bg-[#0a0814] hover:border-violet-500/25 transition-all hover:-translate-y-0.5">
              <div className="w-9 h-9 flex items-center justify-center">
                <img src={`/integraciones/${int.file}`} alt={int.name} className="w-7 h-7 object-contain" onError={e => { (e.target as HTMLImageElement).src = ""; (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
              <span className="text-[10px] text-zinc-500 text-center font-mono leading-tight">{int.name}</span>
            </div>
          ))}
        </div>
        {/* Certificación MP */}
        <div className="mt-10 flex justify-center">
          <div className="flex flex-col sm:flex-row items-center gap-5 p-7 rounded-3xl border border-blue-500/20 bg-blue-500/5 max-w-lg w-full">
            <div className="w-20 h-20 flex-shrink-0 rounded-2xl bg-white/5 border border-blue-500/20 flex items-center justify-center">
              <img src="/badges/mp-checkout-pro.png" alt="Mercado Pago Checkout Pro" className="w-14 h-14 object-contain" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
            <div>
              <p className="text-white font-bold">Desarrollador Certificado Mercado Pago</p>
              <p className="text-zinc-400 text-sm mt-1">Checkout Pro oficial · Pagos en MXN y divisas · OXXO Pay · Meses sin intereses</p>
              <p className="font-mono text-[10px] text-zinc-600 mt-2">cert_3e7bf309614311f197f886b7d357c539</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PRECIOS ────────────────────────────────────────────── */
function Precios() {
  return (
    <section id="precios" className="py-20 px-4 bg-[#03020a]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="font-mono text-[11px] uppercase tracking-widest text-cyan-400 mb-3">Precios</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">Transparentes. Sin letra chica.</h2>
          <p className="text-zinc-400 max-w-lg mx-auto">Pago único por proyecto. Sin mensualidades escondidas. El código y el dominio son tuyos desde el primer día.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map(pl => (
            <div key={pl.name} className={`relative rounded-3xl border bg-[#0d0b1a] p-8 flex flex-col ${pl.popular ? "ring-1" : ""}`}
              style={{ borderColor: `${pl.color}30`, ...(pl.popular ? { ringColor: pl.color } : {}) }}>
              {pl.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full" style={{ background: pl.color, color: "#03020a" }}>Más popular</span>
              )}
              <div className="mb-6">
                <span className="font-mono text-xs uppercase tracking-wider block mb-1" style={{ color: pl.color }}>{pl.name}</span>
                <div className="text-4xl font-black text-white mt-2">{pl.price}</div>
                <div className="text-sm text-zinc-500 mt-1">{pl.period}</div>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {pl.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-400">
                    <span className="mt-0.5 flex-shrink-0" style={{ color: pl.color }}><IconCheck /></span>{f}
                  </li>
                ))}
              </ul>
              <a href="#contacto" className="w-full text-center py-3 rounded-xl text-sm font-bold transition-all border" style={{ borderColor: `${pl.color}40`, color: pl.color, background: `${pl.color}12` }}>
                Cotizar este plan →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── BLOG ───────────────────────────────────────────────── */
function Blog() {
  return (
    <section id="blog" className="py-20 px-4 bg-[#06050f] border-y border-violet-500/10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-violet-400 mb-3">Blog</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Lo que sabemos, <span className="text-zinc-500 font-light">lo compartimos.</span></h2>
          </div>
          <a href="https://vforge.site/blog" target="_blank" rel="noopener noreferrer" className="hidden sm:block btn-outline text-sm px-5 py-2.5">Ver todos →</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BLOG_POSTS.map(post => (
            <div key={post.title} className="group rounded-2xl border border-zinc-800 bg-[#0a0814] p-6 hover:border-violet-500/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] font-mono font-bold text-violet-400 uppercase tracking-wider px-2 py-0.5 rounded-md bg-violet-500/10 border border-violet-500/20">{post.tag}</span>
                <span className="text-[11px] font-mono text-zinc-600">{post.date}</span>
              </div>
              <h3 className="text-white font-bold text-[15px] leading-snug mb-3 group-hover:text-violet-300 transition-colors">{post.title}</h3>
              <p className="text-zinc-500 text-[13px] leading-relaxed line-clamp-3">{post.excerpt}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <a href="https://vforge.site/blog" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">Ver todos los artículos →</a>
        </div>
      </div>
    </section>
  );
}

/* ─── REDES SOCIALES ─────────────────────────────────────── */
function Redes() {
  return (
    <section className="py-16 px-4 bg-[#03020a]">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-violet-400 mb-6">Síguenos</p>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-8">Construimos en público.</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://www.linkedin.com/company/v-momentum-/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-zinc-800 bg-[#0a0814] hover:border-[#0a66c2]/50 hover:bg-[#0a66c2]/10 transition-all w-full sm:w-auto">
            <IconLinkedIn />
            <div className="text-left">
              <p className="text-white font-semibold text-sm">LinkedIn</p>
              <p className="text-zinc-500 text-xs">V Momentum · Company</p>
            </div>
          </a>
          <a href="https://x.com/LuisVmomentums" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-zinc-800 bg-[#0a0814] hover:border-white/20 hover:bg-white/5 transition-all w-full sm:w-auto">
            <IconX2 />
            <div className="text-left">
              <p className="text-white font-semibold text-sm">X / Twitter</p>
              <p className="text-zinc-500 text-xs">@LuisVmomentums · ID 2061950396</p>
            </div>
          </a>
          <a href="https://vforge.site" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/15 transition-all w-full sm:w-auto">
            <span className="text-violet-300 font-bold text-lg">V</span>
            <div className="text-left">
              <p className="text-white font-semibold text-sm">VForge</p>
              <p className="text-zinc-500 text-xs">vforge.site · La plataforma</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── LEGAL ──────────────────────────────────────────────── */
function Legal() {
  const [open, setOpen] = useState<string | null>(null);
  const sections = [
    {
      id: "terminos", title: "Términos y Condiciones", icon: "📋",
      content: `V Momentum es operado por All Global Holding LLC, una sociedad registrada en Wyoming, EE.UU. (EIN vigente). El contrato de servicio se formaliza con firma electrónica y pago del anticipo (50%). El cliente recibe el código fuente completo, el repositorio en su GitHub y el dominio registrado a su nombre al completar el proyecto. V Momentum no retiene propiedad intelectual del cliente. Los proyectos incluyen garantía de 30 días naturales post-entrega para corrección de bugs. Modificaciones mayores o nuevos módulos se cotizan por separado. La relación es de prestación de servicios independiente, no laboral.`
    },
    {
      id: "privacidad", title: "Política de Privacidad", icon: "🔒",
      content: `V Momentum recopila únicamente los datos necesarios para la prestación del servicio: nombre, empresa, correo electrónico, WhatsApp y descripción del proyecto. Los datos se almacenan en Neon Postgres (cifrado AES-256 en reposo, TLS en tránsito) y en Airtable como CRM. No vendemos ni compartimos datos con terceros para fines publicitarios. Los datos se eliminan a solicitud del cliente en un plazo de 30 días. El sitio usa Google Analytics (AW-18205066708) para medición de conversiones. Puedes solicitar acceso, corrección o eliminación de tus datos escribiendo a luisdelator@vmomentums.info.`
    },
    {
      id: "contrato", title: "Modelo de Contrato", icon: "✍️",
      content: `Todo proyecto inicia con un contrato de prestación de servicios que incluye: (1) Descripción exacta del alcance del MVP. (2) Timeline de entrega con fechas comprometidas. (3) Desglose de módulos y funcionalidades incluidas. (4) Esquema de pagos: 50% anticipo, 50% contra entrega. (5) Garantía de 30 días. (6) Cláusula de propiedad intelectual a favor del cliente. (7) Condiciones de modificación de alcance. Los contratos se firman digitalmente. CLABE de pago: 722969010740807451 (V Momentum · All Global Holding LLC).`
    },
    {
      id: "sla", title: "SLA · Garantías de Servicio", icon: "⚡",
      content: `Nos comprometemos a: (1) Respuesta inicial a solicitudes en < 2 horas hábiles vía WhatsApp. (2) Entrega de MVP en el plazo acordado (7-14 días promedio). (3) Deploy sin downtime usando Vercel Edge. (4) Uptime ≥ 99.5% en producción (medido en statuspage de Vercel). (5) Corrección de bugs críticos en < 24 horas durante el período de garantía. (6) Backups automáticos diarios de la base de datos Neon. En caso de incumplimiento aplicamos descuento proporcional sobre el pago final.`
    },
  ];
  return (
    <section id="legal" className="py-20 px-4 bg-[#06050f] border-y border-violet-500/10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <p className="font-mono text-[11px] uppercase tracking-widest text-violet-400 mb-3">Documentos legales</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Todo claro. <span className="text-zinc-500 font-light">Desde el inicio.</span></h2>
        </div>
        <div className="space-y-3">
          {sections.map(s => (
            <div key={s.id} className="rounded-2xl border border-zinc-800 bg-[#0a0814] overflow-hidden">
              <button onClick={() => setOpen(open === s.id ? null : s.id)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{s.icon}</span>
                  <span className="font-bold text-white text-[15px]">{s.title}</span>
                </div>
                <span className={`text-zinc-500 transition-transform duration-200 ${open === s.id ? "rotate-180" : ""}`}>▾</span>
              </button>
              {open === s.id && (
                <div className="px-5 sm:px-6 pb-6">
                  <div className="border-t border-zinc-800 pt-5">
                    <p className="text-zinc-400 text-[14px] leading-relaxed">{s.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 p-5 rounded-2xl border border-zinc-800 bg-[#0a0814] text-center">
          <p className="text-zinc-500 text-sm">All Global Holding LLC · Wyoming, USA · <a href="mailto:luisdelator@vmomentums.info" className="text-violet-400 hover:text-violet-300 transition-colors">luisdelator@vmomentums.info</a> · CLABE 722969010740807451</p>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACTO ───────────────────────────────────────────── */
function Contacto() {
  const [form, setForm] = useState({ nombre: "", empresa: "", tipo: "", mensaje: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const send = async () => {
    if (!form.nombre || form.nombre.length < 2) return;
    setStatus("loading");
    try {
      const res = await fetch("http://178.105.135.26:3003/lead", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, fuente: "vmomentum.site", servicio: form.tipo || "App/PWA" }),
      });
      if (res.ok) {
        setStatus("ok");
        setForm({ nombre: "", empresa: "", tipo: "", mensaje: "" });
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "conversion", { send_to: "AW-18205066708" });
        }
      } else setStatus("error");
    } catch { setStatus("error"); }
  };
  return (
    <section id="contacto" className="py-20 px-4 bg-[#03020a] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 65%)" }} />
      </div>
      <div className="mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-12">
          <p className="font-mono text-[11px] uppercase tracking-widest text-violet-400 mb-4">Empieza hoy</p>
          <h2 className="text-5xl sm:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
            Tu app en <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">7 días.</span>
          </h2>
          <p className="text-zinc-400 text-lg">Desde $12,000 MXN. Sin sorpresas. El código es tuyo.</p>
        </div>
        {status === "ok" ? (
          <div className="text-center py-12 rounded-3xl border border-violet-500/20 bg-violet-500/5">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-white font-bold text-xl mb-2">¡Recibido!</h3>
            <p className="text-zinc-400">Te contactamos en menos de 2 horas por WhatsApp.</p>
          </div>
        ) : (
          <div className="rounded-3xl border border-violet-500/20 bg-[#0d0b1a] p-7 sm:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: "nombre", label: "Nombre *", placeholder: "Tu nombre completo" },
                { key: "empresa", label: "Empresa", placeholder: "Nombre de tu negocio" },
              ].map(f => (
                <div key={f.key} className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{f.label}</label>
                  <input value={(form as any)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder} className="input-field" />
                </div>
              ))}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">¿Qué tipo de app necesitas?</label>
                <input value={form.tipo} onChange={e => setForm(p => ({ ...p, tipo: e.target.value }))}
                  placeholder="Ej: app de entregas, ERP para clínica, plataforma de cursos..." className="input-field" />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Mensaje (opcional)</label>
                <textarea value={form.mensaje} onChange={e => setForm(p => ({ ...p, mensaje: e.target.value }))}
                  placeholder="Cuéntanos más sobre tu proyecto..." rows={3} className="input-field resize-none" />
              </div>
              <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">
                <button onClick={send} disabled={status === "loading" || !form.nombre}
                  className="btn-primary flex-1 py-4 text-base disabled:opacity-40 disabled:cursor-not-allowed">
                  {status === "loading" ? "Enviando..." : "Quiero mi app →"}
                </button>
                <a href="https://wa.me/529984292748?text=Hola%2C+vi+V+Momentum+y+quiero+cotizar+mi+app"
                  target="_blank" rel="noopener noreferrer" className="btn-outline py-4 px-6 text-base text-center">
                  💬 WhatsApp
                </a>
              </div>
              {status === "error" && <p className="sm:col-span-2 text-red-400 text-sm text-center">Error al enviar. Escríbenos directo por WhatsApp.</p>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-violet-500/10 bg-[#03020a] py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-black text-xs">V</span>
              </div>
              <span className="font-bold text-white text-sm">V Momentum</span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed">Fábrica de software premium. Apps PWA en 7 días con IA, pagos y automatización.</p>
            <div className="flex gap-3 mt-4">
              <a href="https://www.linkedin.com/company/v-momentum-/" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-violet-300 transition-colors"><IconLinkedIn /></a>
              <a href="https://x.com/LuisVmomentums" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white transition-colors"><IconX2 /></a>
            </div>
          </div>
          {[
            { title: "Productos", links: [["VForge", "https://vforge.site"], ["Vulcano IA", "https://vforge.site/vulcano"], ["Marketplace", "https://vforge.site/marketplace"], ["Precios", "#precios"]] },
            { title: "Recursos", links: [["Blog", "#blog"], ["Método CMP", "#metodo"], ["Integraciones", "#integraciones"], ["Tipos de apps", "#apps"]] },
            { title: "Empresa", links: [["Términos", "#legal"], ["Privacidad", "#legal"], ["Soporte", "https://wa.me/529984292748"], ["Contacto", "#contacto"]] },
          ].map(col => (
            <div key={col.title}>
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-3">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map(([label, href]) => (
                  <li key={label}><a href={href} className="text-zinc-500 hover:text-white transition-colors text-xs">{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-zinc-600 text-xs">© 2026 All Global Holding LLC · Wyoming, USA</p>
          <p className="text-zinc-700 text-xs font-mono">Built with VForge + Vulcano · vforge.site</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #06050f; }
        ::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.3); border-radius: 3px; }
        .btn-primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: linear-gradient(135deg, #7c3aed, #6d28d9);
          color: white; font-weight: 700; border-radius: 14px; cursor: pointer;
          padding: 10px 22px; font-size: 14px; transition: all 0.2s;
          box-shadow: 0 0 24px rgba(124,58,237,0.4);
          border: none; text-decoration: none;
        }
        .btn-primary:hover { box-shadow: 0 0 40px rgba(124,58,237,0.6); transform: translateY(-1px); opacity: 0.95; }
        .btn-outline {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          border: 1px solid rgba(139,92,246,0.25); color: #c4b5fd; font-weight: 600;
          border-radius: 14px; padding: 10px 22px; font-size: 14px;
          background: rgba(139,92,246,0.08); transition: all 0.2s; text-decoration: none; cursor: pointer;
        }
        .btn-outline:hover { background: rgba(139,92,246,0.15); border-color: rgba(139,92,246,0.4); }
        .input-field {
          background: #06050f; border: 1px solid rgba(139,92,246,0.2); border-radius: 12px;
          padding: 12px 16px; font-size: 14px; color: #e8e4ff; width: 100%;
          outline: none; transition: all 0.2s; font-family: inherit;
        }
        .input-field::placeholder { color: rgba(139,92,246,0.3); }
        .input-field:focus { border-color: rgba(139,92,246,0.5); box-shadow: 0 0 0 3px rgba(124,58,237,0.1); }
        .carousel-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 36px; height: 36px; border-radius: 50%; border: 1px solid rgba(139,92,246,0.25);
          background: rgba(13,11,26,0.9); color: #c4b5fd; font-size: 20px; line-height: 1;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          z-index: 10; transition: all 0.2s; backdrop-filter: blur(8px);
        }
        .carousel-btn:hover { background: rgba(124,58,237,0.2); border-color: rgba(139,92,246,0.5); }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        @media (max-width: 640px) {
          .btn-primary, .btn-outline { border-radius: 12px; }
        }
      `}</style>
      <div style={{ background: "#03020a", color: "#e8e4ff", fontFamily: "system-ui, -apple-system, sans-serif", minHeight: "100vh" }}>
        <Nav />
        <main>
          <Hero />
          <Trust />
          <Productos />
          <Metodo />
          <TiposApps />
          <Integraciones />
          <Precios />
          <Blog />
          <Redes />
          <Legal />
          <Contacto />
        </main>
        <Footer />
      </div>
    </>
  );
}
