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
  { name: "Amavizca Team", cat: "Fitness & Entrenamiento", desc: "Plataforma de gestión de clientes para entrenador personal. Reemplazó Excel por dashboard completo.", live: "amavizca-team.vercel.app", color: "#7c3aed" },
  { name: "KeyMaster Pro", cat: "Cerrajería Automotriz", desc: "App de gestión para cerrajero automotriz. Control de servicios, clientes y facturación.", live: "keymaster-javier.vercel.app", color: "#22d3ee" },
  { name: "FlotillaOS", cat: "Gestión de Flotilla", desc: "Sistema de control para flotilla de 6 vehículos de transporte. Tracking y operaciones en tiempo real.", live: "flotillaos.vercel.app", color: "#fbbf24" },
  { name: "APSUS Microcréditos", cat: "Fintech · Crédito", desc: "Plataforma de microcréditos con análisis de riesgo, seguimiento de pagos y panel de administrador.", live: "apsus.live", color: "#10b981" },
  { name: "CLEARANCE", cat: "Aviación · EdTech", desc: "Simulador de inglés ATC para pilotos. Audio real de torre de control, evaluación en tiempo real.", live: "clearance-delta.vercel.app", color: "#c4b5fd" },
  { name: "ICIPAR", cat: "Cultura & Historia", desc: "Biblioteca digital histórica para iglesias en México. Archivo, búsqueda semántica y acceso público.", live: "icipar.vercel.app", color: "#a78bfa" },
];

const STACK = [
  { name: "Next.js", role: "Framework PWA", color: "#e8e4ff" },
  { name: "Neon", role: "PostgreSQL serverless", color: "#22d3ee" },
  { name: "Vercel", role: "Deploy & Edge", color: "#e8e4ff" },
  { name: "Clerk", role: "Auth & usuarios", color: "#7c3aed" },
  { name: "Resend", role: "Email transaccional", color: "#fbbf24" },
  { name: "Stripe", role: "Pagos & suscripciones", color: "#10b981" },
  { name: "OpenRouter", role: "IA & agentes", color: "#c4b5fd" },
  { name: "Higgsfield", role: "Assets cinematicos", color: "#22d3ee" },
];

const PILLARS = [
  { icon: <IconZap size={20} />, title: "7 días a producción", desc: "Stack probado en 12+ proyectos reales. Sin experimentos, sin sorpresas.", color: "#7c3aed" },
  { icon: <IconCode size={20} />, title: "El código es tuyo", desc: "Repo en tu GitHub. Deploy en tu Vercel. Tú eres el dueño, nosotros construimos.", color: "#22d3ee" },
  { icon: <IconBrain size={20} />, title: "IA desde el día 1", desc: "Agentes MCP, memoria persistente y automatización integrada en cada producto.", color: "#fbbf24" },
  { icon: <IconRocket size={20} />, title: "PWA instalable", desc: "Funciona en iOS y Android sin App Store. Un solo codebase, todas las plataformas.", color: "#10b981" },
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
    { label: "Proyectos", href: "#proyectos" },
    { label: "Stack", href: "#stack" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "nav-blur" : "bg-transparent"}`}>
        <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center shadow-[0_0_16px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_24px_rgba(124,58,237,0.7)] transition-shadow">
              <IconV size={16} className="text-white" />
            </div>
            <div>
              <span className="text-[14px] font-semibold text-on-surface tracking-tight">V Momentum</span>
              <span className="hidden sm:block text-[9px] font-mono uppercase tracking-[.15em] text-muted -mt-0.5">SaaS Technology Apps Design</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <a key={l.href} href={l.href} className="px-3 py-1.5 text-[13px] font-medium text-muted hover:text-on-surface transition-colors rounded-lg hover:bg-white/5">
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA + social */}
          <div className="hidden md:flex items-center gap-3">
            <a href="https://www.linkedin.com/company/v-momentum-/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-violet-300 transition-colors">
              <IconLinkedIn size={17} />
            </a>
            <a href="https://x.com/LuisVmomentums" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-on-surface transition-colors">
              <IconXSocial size={16} />
            </a>
            <a href="https://vforge.site" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 px-4 py-2 text-[13px] font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_32px_rgba(124,58,237,0.6)] hover:opacity-90 transition-all">
              <IconSparkles size={13} />
              Ir a VForge
            </a>
          </div>

          {/* Mobile burger */}
          <button onClick={() => setOpen(v => !v)} className="md:hidden text-muted hover:text-on-surface transition-colors">
            {open ? <IconX size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 nav-blur border-b border-[rgb(139_92_246/0.14)] pb-4 md:hidden"
          >
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block px-6 py-3 text-[15px] font-medium text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">
                {l.label}
              </a>
            ))}
            <div className="px-6 pt-3 flex items-center gap-4">
              <a href="https://www.linkedin.com/company/v-momentum-/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-violet-300">
                <IconLinkedIn size={18} />
              </a>
              <a href="https://x.com/LuisVmomentums" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-on-surface">
                <IconXSocial size={17} />
              </a>
              <a href="https://vforge.site" target="_blank" rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 px-4 py-2 text-[13px] font-semibold text-white">
                <IconSparkles size={13} /> Ir a VForge
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

  const apps = counter(12, 1800);
  const days = counter(7, 1200);
  const clients = counter(8, 2000);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16 px-5">
      {/* Aura blobs */}
      <div className="aura-v w-[600px] h-[600px] -top-40 -left-40 opacity-60" />
      <div className="aura-c w-[400px] h-[400px] -bottom-20 -right-20 opacity-40" />

      <motion.div style={{ y: y1, opacity }} className="relative z-10 text-center max-w-4xl mx-auto">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[.15em] text-violet-300">
            SaaS Technology Apps Design
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="text-[52px] sm:text-[72px] lg:text-[88px] font-bold leading-[.95] tracking-[-0.04em] text-on-surface mb-6"
        >
          La fábrica de{" "}
          <span className="grad-v">software</span>
          <br />
          más rápida{" "}
          <span className="text-on-surface">de México.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="text-[17px] sm:text-[20px] font-light text-on-surface-variant max-w-2xl mx-auto mb-10 leading-[1.6]"
        >
          De idea a producto digital real: diseño, código, repositorio, deploy e integración.{" "}
          <span className="text-violet-300 font-medium">En 7 días.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
        >
          <a href="https://vforge.site" target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-violet-600 px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.5)] hover:shadow-[0_0_40px_rgba(124,58,237,0.7)] hover:scale-[1.02] transition-all duration-200">
            <IconSparkles size={16} />
            Construye tu app
            <IconArrowR size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a href="#proyectos"
            className="inline-flex items-center gap-2 rounded-2xl border border-[rgb(139_92_246/0.22)] bg-[rgb(139_92_246/0.08)] px-6 py-3.5 text-[15px] font-semibold text-violet-300 hover:bg-[rgb(139_92_246/0.14)] hover:border-violet-500/40 transition-all duration-200">
            Ver proyectos
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          className="grid grid-cols-3 gap-6 max-w-sm mx-auto"
        >
          {[
            { val: apps, suffix: "+", label: "Apps en producción" },
            { val: days, suffix: " días", label: "Tiempo promedio" },
            { val: clients, suffix: "+", label: "Clientes activos" },
          ].map(({ val, suffix, label }) => (
            <div key={label} className="text-center">
              <div className="text-[28px] sm:text-[32px] font-bold tracking-tight text-on-surface">
                {val}{suffix}
              </div>
              <div className="text-[11px] font-mono text-muted uppercase tracking-wider mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-violet-500/60 to-transparent rounded-full" />
      </motion.div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="relative py-20 px-5">
      <div className="mx-auto max-w-5xl">
        <FadeUp className="text-center mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[.15em] text-violet-400 mb-3">Por qué V Momentum</p>
          <h2 className="text-[36px] sm:text-[48px] font-bold tracking-[-0.03em] text-on-surface">
            No somos una agencia.<br />
            <span className="text-on-surface-variant font-light">Somos una fábrica.</span>
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PILLARS.map(({ icon, title, desc, color }, i) => (
            <FadeUp key={title} delay={i * 0.08}>
              <div className="card-surface p-6 h-full group hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}>
                  {icon}
                </div>
                <h3 className="text-[15px] font-semibold text-on-surface mb-2 tracking-tight">{title}</h3>
                <p className="text-[13px] font-light text-muted leading-[1.6]">{desc}</p>
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
    <section id="proyectos" className="relative py-20 px-5">
      <div className="aura-v w-[500px] h-[500px] top-20 -right-40 opacity-30" />
      <div className="mx-auto max-w-6xl">
        <FadeUp className="mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[.15em] text-cyan-400 mb-3">Proyectos en producción</p>
          <h2 className="text-[36px] sm:text-[48px] font-bold tracking-[-0.03em] text-on-surface">
            Apps reales.<br />
            <span className="text-on-surface-variant font-light">Clientes reales.</span>
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map(({ name, cat, desc, live, color }, i) => (
            <FadeUp key={name} delay={i * 0.07}>
              <a href={`https://${live}`} target="_blank" rel="noopener noreferrer"
                className="card-surface group p-6 flex flex-col gap-3 h-full hover:border-violet-500/30 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md" style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>
                    {cat}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-success-emerald shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                </div>
                <h3 className="text-[17px] font-semibold tracking-tight text-on-surface">{name}</h3>
                <p className="text-[13px] font-light text-muted leading-[1.6] flex-1">{desc}</p>
                <div className="flex items-center gap-1.5 text-[12px] font-mono text-muted group-hover:text-violet-300 transition-colors">
                  <IconGlobe size={12} />
                  {live}
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
    <section id="stack" className="relative py-20 px-5">
      <div className="mx-auto max-w-5xl">
        <FadeUp className="text-center mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[.15em] text-violet-400 mb-3">Stack tecnológico</p>
          <h2 className="text-[36px] sm:text-[48px] font-bold tracking-[-0.03em] text-on-surface">
            Las mejores herramientas.<br />
            <span className="text-on-surface-variant font-light">Siempre actualizadas.</span>
          </h2>
        </FadeUp>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STACK.map(({ name, role, color }, i) => (
            <FadeUp key={name} delay={i * 0.06}>
              <div className="card-surface p-4 text-center group hover:border-violet-500/30 transition-all duration-200">
                <div className="text-[18px] font-bold tracking-tight mb-1" style={{ color }}>{name}</div>
                <div className="text-[11px] font-mono text-muted">{role}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="nosotros" className="relative py-20 px-5">
      <div className="aura-c w-[400px] h-[400px] -bottom-20 -left-20 opacity-30" />
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <p className="font-mono text-[11px] uppercase tracking-[.15em] text-violet-400 mb-4">Fundador</p>
            <h2 className="text-[36px] sm:text-[48px] font-bold tracking-[-0.03em] text-on-surface mb-6">
              Luis De La Torre.<br />
              <span className="text-on-surface-variant font-light text-[28px] sm:text-[36px]">Builder & Operator.</span>
            </h2>
            <p className="text-[16px] font-light text-on-surface-variant leading-[1.7] mb-6">
              No soy un teórico. Construyo productos reales para negocios reales — desde gyms en Guadalajara hasta simuladores de aviación. Cada app que sale de V Momentum pasa por mis manos.
            </p>
            <p className="text-[16px] font-light text-on-surface-variant leading-[1.7] mb-8">
              El stack que uso, las decisiones que tomo, los errores que cometo — todo lo documento en tiempo real. Eso es lo que nos distingue.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/in/luis-humberto-de-la-torre-herrera-3499b9414/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[rgb(139_92_246/0.22)] bg-[rgb(139_92_246/0.08)] px-4 py-2.5 text-[13px] font-semibold text-violet-300 hover:bg-[rgb(139_92_246/0.15)] transition-colors">
                <IconLinkedIn size={15} />
                LinkedIn
              </a>
              <a href="https://x.com/LuisVmomentums" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[rgb(139_92_246/0.22)] bg-[rgb(139_92_246/0.08)] px-4 py-2.5 text-[13px] font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
                <IconXSocial size={14} />
                @LuisVmomentums
              </a>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="card-surface p-6 space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">Métricas reales · Jun 2026</p>
              {[
                { label: "Proyectos en producción", val: "12+", color: "#7c3aed" },
                { label: "Industrias atendidas", val: "8", color: "#22d3ee" },
                { label: "Tiempo promedio de deploy", val: "7 días", color: "#fbbf24" },
                { label: "Uptime promedio", val: "99.8%", color: "#10b981" },
                { label: "Stack actualizado", val: "2026 Q2", color: "#c4b5fd" },
              ].map(({ label, val, color }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-[rgb(139_92_246/0.1)] last:border-0">
                  <span className="text-[13px] font-light text-muted">{label}</span>
                  <span className="text-[15px] font-bold" style={{ color }}>{val}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Social() {
  return (
    <section className="relative py-16 px-5">
      <div className="mx-auto max-w-5xl">
        <FadeUp className="text-center mb-8">
          <p className="font-mono text-[11px] uppercase tracking-[.15em] text-cyan-400 mb-2">Síguenos</p>
          <h2 className="text-[28px] font-bold tracking-[-0.02em] text-on-surface">Construimos en público.</h2>
          <p className="text-[15px] font-light text-muted mt-2">El proceso, los errores, las decisiones — todo en tiempo real.</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href="https://www.linkedin.com/company/v-momentum-/" target="_blank" rel="noopener noreferrer"
              className="card-surface group p-6 flex flex-col gap-4 hover:border-[#5da7df]/30 hover:shadow-[0_0_30px_rgba(93,167,223,0.12)] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#5da7df]/12 border border-[#5da7df]/20 flex items-center justify-center text-[#5da7df] group-hover:shadow-[0_0_16px_rgba(93,167,223,0.3)] transition-shadow">
                <IconLinkedIn size={20} />
              </div>
              <div>
                <div className="text-[15px] font-semibold text-on-surface mb-1">LinkedIn</div>
                <div className="text-[13px] font-light text-muted">Casos de éxito, proceso de construcción y decisiones técnicas.</div>
              </div>
              <div className="font-mono text-[11px] text-[#5da7df] flex items-center gap-1 mt-auto">
                V Momentum <IconArrowR size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>

            <a href="https://x.com/LuisVmomentums" target="_blank" rel="noopener noreferrer"
              className="card-surface group p-6 flex flex-col gap-4 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/12 flex items-center justify-center text-on-surface group-hover:bg-white/12 transition-colors">
                <IconXSocial size={18} />
              </div>
              <div>
                <div className="text-[15px] font-semibold text-on-surface mb-1">X / Twitter</div>
                <div className="text-[13px] font-light text-muted">Hot takes sobre IA, MCP, agentes y el futuro del desarrollo en MX.</div>
              </div>
              <div className="font-mono text-[11px] text-muted flex items-center gap-1 mt-auto group-hover:text-on-surface-variant transition-colors">
                @LuisVmomentums <IconArrowR size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>

            <a href="https://vforge.site" target="_blank" rel="noopener noreferrer"
              className="card-surface group p-6 flex flex-col gap-4 hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-violet-500/12 border border-violet-500/20 flex items-center justify-center text-violet-300 glow-v group-hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-shadow">
                <IconV size={18} />
              </div>
              <div>
                <div className="text-[15px] font-semibold text-on-surface mb-1">VForge</div>
                <div className="text-[13px] font-light text-muted">La plataforma donde construimos. Tu app empieza aquí.</div>
              </div>
              <div className="font-mono text-[11px] text-violet-400 flex items-center gap-1 mt-auto">
                vforge.site <IconArrowR size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="relative py-24 px-5">
      <div className="aura-v w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2 opacity-25" />
      <div className="mx-auto max-w-3xl text-center relative z-10">
        <FadeUp>
          <p className="font-mono text-[11px] uppercase tracking-[.15em] text-violet-400 mb-4">Empieza hoy</p>
          <h2 className="text-[40px] sm:text-[56px] font-bold tracking-[-0.04em] text-on-surface mb-6 leading-[1.05]">
            Tu app en{" "}
            <span className="grad-v">7 días.</span>
            <br />
            <span className="text-on-surface-variant font-light text-[32px] sm:text-[44px]">desde $12,000 MXN.</span>
          </h2>
          <p className="text-[17px] font-light text-muted mb-10 max-w-xl mx-auto leading-[1.65]">
            Sin contratos largos. Sin sorpresas. El código es tuyo desde el día 1.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://vforge.site" target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-violet-600 px-8 py-4 text-[16px] font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:shadow-[0_0_50px_rgba(124,58,237,0.7)] hover:scale-[1.02] transition-all duration-200">
              <IconSparkles size={17} />
              Construye en VForge
              <IconArrowR size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="https://wa.me/529984292748?text=Hola%20Luis%2C%20vi%20V%20Momentum%20y%20quiero%20hablar%20sobre%20mi%20app"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-[rgb(139_92_246/0.22)] bg-[rgb(139_92_246/0.08)] px-8 py-4 text-[16px] font-semibold text-violet-300 hover:bg-[rgb(139_92_246/0.15)] transition-all">
              <IconWhatsApp size={17} />
              WhatsApp directo
            </a>
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
        <div className="flex items-center gap-4">
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
        <Pillars />
        <Projects />
        <Stack />
        <About />
        <Social />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
