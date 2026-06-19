"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import {
  IconV, IconArrowR, IconSparkles, IconRocket, IconBrain,
  IconCode, IconZap, IconCheck, IconUsers, IconLinkedIn,
  IconXSocial, IconWhatsApp, IconGlobe, IconMenu, IconX,
} from "@/components/ui/VFIcons";

const EASE = [0.22, 1, 0.36, 1] as const;

const PROJECTS = [
  { name: "APSUS Microcr\u00e9ditos", cat: "Fintech \u00b7 Cr\u00e9dito", desc: "Plataforma de microcr\u00e9ditos con ~500 clientes activos. An\u00e1lisis de riesgo, seguimiento de pagos, panel admin, WhatsApp relay e IA integrada.", live: "apsus.live", color: "#10b981" },
  { name: "PREMMEX", cat: "Seguros \u00b7 Funerario", desc: "ERP interno para financiamiento funerario. Gesti\u00f3n de contratos, cobranza, 4 planes de servicio y panel de ejecutivos.", live: "premmex.life", color: "#7c3aed" },
  { name: "Castores CSN", cat: "Carnic\u00eda \u00b7 Multi-sucursal", desc: "PWA multi-sucursal para carnicer\u00eda. 14 m\u00f3dulos: trazabilidad, rifas, tickets, push notifications y mapbox integrado.", live: "carnesn.ink", color: "#ef4444" },
  { name: "RideMe", cat: "Movilidad \u00b7 Ride-hailing", desc: "App de transporte para mercado mexicano. Motor de precios din\u00e1mico, comisiones, suscripciones de conductores y Mapbox en tiempo real.", live: "rideme.ink", color: "#fbbf24" },
  { name: "HappyToc", cat: "Bienestar \u00b7 Numerolog\u00eda", desc: "Agenda personal con motor de numerolog\u00eda validado. Afirmaciones diarias, 8 \u00e1reas de vida y calendario de productividad.", live: "happytoc.life", color: "#22d3ee" },
  { name: "Decaciones", cat: "M\u00fasica \u00b7 Entretenimiento", desc: "PWA de m\u00fasica organizada por d\u00e9cadas y g\u00e9neros. Est\u00e9tica Apple TV dark, Spotify integrado y previews iTunes.", live: "decaciones.info", color: "#c4b5fd" },
  { name: "Toonimatics", cat: "Arte \u00b7 Red social", desc: "Red social para creadores latinoamericanos. 9 ramas art\u00edsticas, perfiles, portafolios y sistema de colaboraci\u00f3n.", live: "toonimatic.life", color: "#f97316" },
  { name: "VForge", cat: "SaaS \u00b7 Plataforma", desc: "Plataforma SaaS flagship. Dashboard para owners, associates y clients. Stripe, Clerk, Neon y agentes IA propios.", live: "vforge.site", color: "#7c3aed" },
  { name: "iStore Pro", cat: "Talleres \u00b7 Reparaci\u00f3n", desc: "SaaS para talleres de reparaci\u00f3n. Control de tickets, inventario, clientes y facturaci\u00f3n. Multi-tenant listo.", live: "i-store.shop", color: "#22d3ee" },
];

const STACK = [
  { name: "Next.js 16", role: "Framework PWA", color: "#e8e4ff" },
  { name: "Neon", role: "PostgreSQL serverless", color: "#22d3ee" },
  { name: "Vercel", role: "Deploy & Edge", color: "#e8e4ff" },
  { name: "Clerk", role: "Auth & usuarios", color: "#7c3aed" },
  { name: "Resend", role: "Email transaccional", color: "#fbbf24" },
  { name: "Mercado Pago", role: "Pagos MX", color: "#10b981" },
  { name: "Stripe", role: "Pagos globales", color: "#10b981" },
  { name: "Mapbox", role: "Mapas & tracking", color: "#f97316" },
  { name: "WhatsApp API", role: "Notificaciones", color: "#25d366" },
  { name: "OpenRouter", role: "IA & agentes", color: "#c4b5fd" },
  { name: "Higgsfield", role: "Assets cinem\u00e1ticos", color: "#22d3ee" },
  { name: "Hetzner", role: "Infraestructura", color: "#ef4444" },
];

const SERVICES = [
  { icon: <IconCode size={22} />, title: "PWA desde cero", desc: "Dise\u00f1o, c\u00f3digo, repositorio y deploy. Tu app instalable en iOS y Android sin App Store.", color: "#7c3aed" },
  { icon: <IconBrain size={22} />, title: "IA integrada", desc: "Agentes MCP, memoria persistente, WhatsApp relay y automatizaciones que trabajan mientras duermes.", color: "#22d3ee" },
  { icon: <IconZap size={22} />, title: "7 d\u00edas a producci\u00f3n", desc: "Stack probado en 15+ proyectos reales. Sin experimentos. Sin sorpresas. Sin excusas.", color: "#fbbf24" },
  { icon: <IconRocket size={22} />, title: "El c\u00f3digo es tuyo", desc: "Repo en tu GitHub. Deploy en tu Vercel. Desde el d\u00eda 1 eres el due\u00f1o total.", color: "#10b981" },
  { icon: <IconUsers size={22} />, title: "Multi-rol & Multi-tenant", desc: "Roles admin, operador y usuario final. Arquitectura lista para escalar sin reescribir nada.", color: "#f97316" },
  { icon: <IconSparkles size={22} />, title: "Automatizaci\u00f3n completa", desc: "Pagos, correos, notificaciones push, webhooks y reportes. Todo conectado desde el primer deploy.", color: "#c4b5fd" },
];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { label: "Qu\u00e9 hacemos", href: "#servicios" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Stack", href: "#stack" },
    { label: "Contacto", href: "#contacto" },
  ];
  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "nav-blur" : "bg-transparent"}`}>
        <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center shadow-[0_0_16px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_24px_rgba(124,58,237,0.7)] transition-shadow">
              <IconV size={16} className="text-white" />
            </div>
            <div>
              <span className="text-[14px] font-semibold text-on-surface tracking-tight">V Momentum</span>
              <span className="hidden sm:block text-[9px] font-mono uppercase tracking-[.15em] text-muted -mt-0.5">F\u00e1brica de apps premium</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <a key={l.href} href={l.href} className="px-3 py-1.5 text-[13px] font-medium text-muted hover:text-on-surface transition-colors rounded-lg hover:bg-white/5">{l.label}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="https://www.linkedin.com/company/v-momentum-/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-violet-300 transition-colors"><IconLinkedIn size={17} /></a>
            <a href="https://x.com/LuisVmomentums" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-on-surface transition-colors"><IconXSocial size={16} /></a>
            <a href="#contacto" className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 px-4 py-2 text-[13px] font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_32px_rgba(124,58,237,0.6)] hover:opacity-90 transition-all">
              <IconSparkles size={13} />Cotiza tu app
            </a>
          </div>
          <button onClick={() => setOpen(v => !v)} className="md:hidden text-muted hover:text-on-surface transition-colors">
            {open ? <IconX size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 nav-blur border-b border-[rgb(139_92_246/0.14)] pb-4 md:hidden">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block px-6 py-3 text-[15px] font-medium text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">{l.label}</a>
            ))}
            <div className="px-6 pt-3">
              <a href="#contacto" onClick={() => setOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 px-4 py-3 text-[14px] font-semibold text-white">
                <IconSparkles size={14} />Cotiza tu app
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const counter = (end: number, duration: number) => {
    const [val, setVal] = useState(0);
    useEffect(() => {
      let start = 0;
      const step = end / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= end) { setVal(end); clearInterval(timer); }
        else setVal(Math.floor(start));
      }, 16);
      return () => clearInterval(timer);
    }, []);
    return val;
  };
  const apps = counter(15, 1800);
  const days = counter(7, 1200);
  const clients = counter(40, 2000);
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16 px-5">
      <div className="aura-v w-[700px] h-[700px] -top-40 -left-40 opacity-50" />
      <div className="aura-c w-[500px] h-[500px] -bottom-20 -right-20 opacity-35" />
      <motion.div style={{ y: y1, opacity }} className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[.15em] text-violet-300">15+ apps en producci\u00f3n \u00b7 M\u00e9xico</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="text-[48px] sm:text-[68px] lg:text-[84px] font-bold leading-[.95] tracking-[-0.04em] text-on-surface mb-6">
          Tu negocio necesita{" "}
          <span className="grad-v">una app.</span>
          <br />
          <span className="text-on-surface-variant font-light">La construimos en 7 d\u00edas.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="text-[17px] sm:text-[20px] font-light text-on-surface-variant max-w-2xl mx-auto mb-10 leading-[1.6]">
          PWAs premium con IA, pagos, WhatsApp y automatizaci\u00f3n completa.
          {" "}<span className="text-violet-300 font-medium">El c\u00f3digo es tuyo desde el d\u00eda 1.</span>
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          <a href="#contacto"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-violet-600 px-7 py-4 text-[15px] font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.5)] hover:shadow-[0_0_40px_rgba(124,58,237,0.7)] hover:scale-[1.02] transition-all duration-200">
            <IconSparkles size={16} />Quiero mi app
            <IconArrowR size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a href="#proyectos"
            className="inline-flex items-center gap-2 rounded-2xl border border-[rgb(139_92_246/0.22)] bg-[rgb(139_92_246/0.08)] px-7 py-4 text-[15px] font-semibold text-violet-300 hover:bg-[rgb(139_92_246/0.14)] hover:border-violet-500/40 transition-all duration-200">
            Ver proyectos reales
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          className="grid grid-cols-3 gap-8 max-w-sm mx-auto">
          {[
            { val: apps, suffix: "+", label: "Apps en producci\u00f3n" },
            { val: days, suffix: " d\u00edas", label: "Tiempo promedio" },
            { val: clients, suffix: "+", label: "Usuarios activos" },
          ].map(({ val, suffix, label }) => (
            <div key={label} className="text-center">
              <div className="text-[30px] sm:text-[36px] font-bold tracking-tight text-on-surface">{val}{suffix}</div>
              <div className="text-[11px] font-mono text-muted uppercase tracking-wider mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-violet-500/60 to-transparent rounded-full" />
      </motion.div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="relative py-24 px-5">
      <div className="aura-c w-[400px] h-[400px] top-0 -right-20 opacity-25" />
      <div className="mx-auto max-w-6xl">
        <FadeUp className="mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[.15em] text-cyan-400 mb-3">Lo que construimos</p>
          <h2 className="text-[36px] sm:text-[52px] font-bold tracking-[-0.03em] text-on-surface">
            No somos una agencia web.<br />
            <span className="text-on-surface-variant font-light">Somos tu equipo de producto.</span>
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map(({ icon, title, desc, color }, i) => (
            <FadeUp key={title} delay={i * 0.07}>
              <div className="card-surface p-6 h-full group hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.12)]">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                  style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}>
                  {icon}
                </div>
                <h3 className="text-[16px] font-semibold text-on-surface mb-2 tracking-tight">{title}</h3>
                <p className="text-[13px] font-light text-muted leading-[1.65]">{desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="proyectos" className="relative py-24 px-5">
      <div className="aura-v w-[500px] h-[500px] top-20 -left-40 opacity-25" />
      <div className="mx-auto max-w-6xl">
        <FadeUp className="mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[.15em] text-violet-400 mb-3">Portfolio</p>
          <h2 className="text-[36px] sm:text-[52px] font-bold tracking-[-0.03em] text-on-surface">
            Apps reales.<br />
            <span className="text-on-surface-variant font-light">Clientes reales. Resultados reales.</span>
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map(({ name, cat, desc, live, color }, i) => (
            <FadeUp key={name} delay={i * 0.06}>
              <a href={`https://${live}`} target="_blank" rel="noopener noreferrer"
                className="card-surface group p-6 flex flex-col gap-3 h-full hover:border-violet-500/30 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md"
                    style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>{cat}</span>
                  <span className="w-2 h-2 rounded-full bg-success-emerald shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                </div>
                <h3 className="text-[17px] font-semibold tracking-tight text-on-surface">{name}</h3>
                <p className="text-[13px] font-light text-muted leading-[1.6] flex-1">{desc}</p>
                <div className="flex items-center gap-1.5 text-[12px] font-mono text-muted group-hover:text-violet-300 transition-colors">
                  <IconGlobe size={12} />{live}
                  <IconArrowR size={11} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </div>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="relative py-24 px-5">
      <div className="mx-auto max-w-5xl">
        <FadeUp className="text-center mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[.15em] text-violet-400 mb-3">Stack tecnol\u00f3gico</p>
          <h2 className="text-[36px] sm:text-[52px] font-bold tracking-[-0.03em] text-on-surface">
            Las mejores herramientas.<br />
            <span className="text-on-surface-variant font-light">Sin compromiso.</span>
          </h2>
        </FadeUp>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {STACK.map(({ name, role, color }, i) => (
            <FadeUp key={name} delay={i * 0.05}>
              <div className="card-surface p-4 text-center group hover:border-violet-500/30 transition-all duration-200 hover:shadow-[0_0_20px_rgba(124,58,237,0.1)]">
                <div className="text-[17px] font-bold tracking-tight mb-1" style={{ color }}>{name}</div>
                <div className="text-[11px] font-mono text-muted">{role}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const planes = [
    {
      name: "Starter", price: "12,000", label: "Para negocios que empiezan",
      features: ["PWA instalable iOS & Android", "Hasta 3 m\u00f3dulos", "Auth con Clerk", "Base de datos Neon", "Deploy en Vercel", "Repositorio en tu GitHub"],
      color: "#7c3aed", popular: false,
    },
    {
      name: "Pro", price: "22,000", label: "El m\u00e1s popular",
      features: ["Todo lo de Starter", "Hasta 8 m\u00f3dulos", "Pagos Mercado Pago o Stripe", "WhatsApp notificaciones", "Email transaccional Resend", "Panel admin completo", "IA integrada"],
      color: "#22d3ee", popular: true,
    },
    {
      name: "Enterprise", price: "A cotizar", label: "Proyectos a medida",
      features: ["Todo lo de Pro", "M\u00f3dulos ilimitados", "Multi-sucursal & multi-tenant", "Automatizaciones MCP", "Agentes IA propios", "Integraciones custom", "Soporte prioritario"],
      color: "#fbbf24", popular: false,
    },
  ];
  return (
    <section className="relative py-24 px-5">
      <div className="aura-v w-[500px] h-[500px] top-0 right-0 opacity-20" />
      <div className="mx-auto max-w-5xl">
        <FadeUp className="text-center mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[.15em] text-cyan-400 mb-3">Precios</p>
          <h2 className="text-[36px] sm:text-[52px] font-bold tracking-[-0.03em] text-on-surface">
            Transparentes.<br />
            <span className="text-on-surface-variant font-light">Sin letra chica.</span>
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {planes.map(({ name, price, label, features, color, popular }, i) => (
            <FadeUp key={name} delay={i * 0.1}>
              <div className={`card-surface p-7 h-full flex flex-col relative ${
                popular ? "border-cyan-400/40 shadow-[0_0_40px_rgba(34,211,238,0.15)]" : ""
              }`}>
                {popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-cyan-400 text-[#03020a] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">M\u00e1s popular</span>
                  </div>
                )}
                <div className="mb-6">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-1">{label}</p>
                  <h3 className="text-[22px] font-bold text-on-surface mb-1" style={{ color }}>{name}</h3>
                  <div className="text-[38px] font-bold text-on-surface tracking-tight">
                    {price === "A cotizar" ? <span className="text-[28px]">A cotizar</span> : <>${price} <span className="text-[16px] font-light text-muted">MXN</span></>}
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-7">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] font-light text-muted">
                      <span style={{ color }} className="mt-0.5 shrink-0"><IconCheck size={15} /></span>{f}
                    </li>
                  ))}
                </ul>
                <a href="#contacto"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-semibold transition-all"
                  style={{ background: `${color}18`, border: `1px solid ${color}35`, color }}>
                  Cotizar este plan <IconArrowR size={13} />
                </a>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ nombre: "", empresa: "", giro: "", mensaje: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const handleSubmit = async () => {
    if (!form.nombre || form.nombre.length < 2) return;
    setStatus("loading");
    try {
      const res = await fetch("http://178.105.135.26:3003/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, fuente: "vmomentum.site", servicio: form.giro || "App/PWA" }),
      });
      if (res.ok) {
        setStatus("ok");
        setForm({ nombre: "", empresa: "", giro: "", mensaje: "" });
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "conversion", { send_to: "AW-18205066708" });
        }
      } else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <section id="contacto" className="relative py-24 px-5">
      <div className="aura-v w-[600px] h-[600px] top-0 left-1/2 -translate-x-1/2 opacity-20" />
      <div className="mx-auto max-w-4xl relative z-10">
        <FadeUp className="text-center mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[.15em] text-violet-400 mb-4">Empieza hoy</p>
          <h2 className="text-[40px] sm:text-[56px] font-bold tracking-[-0.04em] text-on-surface mb-4 leading-[1.05]">
            Tu app en <span className="grad-v">7 d\u00edas.</span><br />
            <span className="text-on-surface-variant font-light text-[28px] sm:text-[40px]">Desde $12,000 MXN.</span>
          </h2>
          <p className="text-[16px] font-light text-muted max-w-xl mx-auto">D\u00eanos los datos de tu negocio y te contactamos en menos de 2 horas.</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="card-surface p-8">
            {status === "ok" ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
                  <IconCheck size={28} className="text-violet-400" />
                </div>
                <h3 className="text-[22px] font-bold text-on-surface mb-2">\u00a1Mensaje enviado!</h3>
                <p className="text-muted">Te contactamos en menos de 2 horas por WhatsApp.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-muted">Nombre *</label>
                  <input
                    value={form.nombre}
                    onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))}
                    placeholder="Tu nombre"
                    className="bg-[#0d0b1a] border border-[rgb(139_92_246/0.2)] rounded-xl px-4 py-3 text-[14px] text-on-surface placeholder:text-muted/50 focus:outline-none focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-muted">Empresa</label>
                  <input
                    value={form.empresa}
                    onChange={e => setForm(p => ({ ...p, empresa: e.target.value }))}
                    placeholder="Nombre de tu negocio"
                    className="bg-[#0d0b1a] border border-[rgb(139_92_246/0.2)] rounded-xl px-4 py-3 text-[14px] text-on-surface placeholder:text-muted/50 focus:outline-none focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-muted">\u00bfQu\u00e9 tipo de app necesitas?</label>
                  <input
                    value={form.giro}
                    onChange={e => setForm(p => ({ ...p, giro: e.target.value }))}
                    placeholder="Ej: App de entregas, sistema de ventas, plataforma de cursos..."
                    className="bg-[#0d0b1a] border border-[rgb(139_92_246/0.2)] rounded-xl px-4 py-3 text-[14px] text-on-surface placeholder:text-muted/50 focus:outline-none focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-muted">Mensaje (opcional)</label>
                  <textarea
                    value={form.mensaje}
                    onChange={e => setForm(p => ({ ...p, mensaje: e.target.value }))}
                    placeholder="Cu\u00e9ntanos m\u00e1s sobre tu proyecto..."
                    rows={3}
                    className="bg-[#0d0b1a] border border-[rgb(139_92_246/0.2)] rounded-xl px-4 py-3 text-[14px] text-on-surface placeholder:text-muted/50 focus:outline-none focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)] transition-all resize-none"
                  />
                </div>
                <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={status === "loading" || !form.nombre}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-violet-600 px-8 py-4 text-[15px] font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.4)] hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                    {status === "loading" ? "Enviando..." : <><IconSparkles size={16} />Quiero mi app</>}
                  </button>
                  <a href="https://wa.me/529984292748?text=Hola%2C%20vi%20V%20Momentum%20y%20quiero%20hablar%20sobre%20mi%20app"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[rgb(139_92_246/0.22)] bg-[rgb(139_92_246/0.08)] px-6 py-4 text-[15px] font-semibold text-violet-300 hover:bg-[rgb(139_92_246/0.15)] transition-all">
                    <IconWhatsApp size={17} />WhatsApp
                  </a>
                </div>
                {status === "error" && (
                  <p className="sm:col-span-2 text-[13px] text-red-400 text-center">Error al enviar. Escr\u00edbenos directo por WhatsApp.</p>
                )}
              </div>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[rgb(139_92_246/0.14)] py-10 px-5">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center">
            <IconV size={13} className="text-white" />
          </div>
          <span className="text-[13px] font-semibold text-on-surface">V Momentum</span>
          <span className="text-muted text-[13px]">·</span>
          <span className="font-mono text-[10px] text-muted uppercase tracking-wider">All Global Holding LLC · 2026</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="https://www.linkedin.com/company/v-momentum-/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-violet-300 transition-colors"><IconLinkedIn size={17} /></a>
          <a href="https://x.com/LuisVmomentums" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-on-surface transition-colors"><IconXSocial size={16} /></a>
          <a href="https://vforge.site" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-muted hover:text-violet-300 transition-colors">vforge.site</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <div className="bg-grid" />
      <div className="scanlines" />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Projects />
        <Stack />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
