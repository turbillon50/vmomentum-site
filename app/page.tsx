"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, animate } from "framer-motion";

/* ─────────────────────────────────────────
   TOKENS — Neon + Apple
───────────────────────────────────────── */
const T = {
  bg:    "#000000",       // Apple black puro
  s1:    "#0a0a0a",       // surface sutil
  s2:    "#111111",       // surface medio
  s3:    "#1a1a1a",       // surface alto
  blu:   "#0071e3",       // Apple blue exacto
  blu2:  "#2997ff",       // neon blue claro
  grn:   "#30d158",       // neon green
  slv:   "#f5f5f7",       // Apple silver text
  slv2:  "rgba(245,245,247,0.55)",
  slv3:  "rgba(245,245,247,0.25)",
  bd:    "rgba(255,255,255,0.08)",
  bd2:   "rgba(255,255,255,0.04)",
};

/* ─────────────────────────────────────────
   CURSOR GLOBAL
───────────────────────────────────────── */
function Cursor() {
  const x = useSpring(-100, { stiffness: 200, damping: 20 });
  const y = useSpring(-100, { stiffness: 200, damping: 20 });
  const [big, setBig] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width:768px)").matches;
    if (isMobile) return;
    setVisible(true);
    const mv = (e: MouseEvent) => { x.set(e.clientX - 10); y.set(e.clientY - 10); };
    const over = (e: MouseEvent) => setBig(!!(e.target as HTMLElement).closest("a,button"));
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseover", over); };
  }, []);

  if (!visible) return null;
  return (
    <motion.div style={{ x, y, position: "fixed", width: 20, height: 20, borderRadius: "50%",
      border: `1.5px solid ${T.blu2}`, pointerEvents: "none", zIndex: 9999,
      scale: big ? 2.4 : 1, background: big ? "rgba(41,151,255,0.12)" : "transparent",
      transition: "scale 0.18s, background 0.18s", mixBlendMode: "screen" }} />
  );
}

/* ─────────────────────────────────────────
   UTILIDADES
───────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const c = animate(0, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: n => setV(Math.round(n)) });
        return () => c.stop();
      }
    });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function Typewriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [disp, setDisp] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = texts[idx];
    if (!del && disp.length < full.length) { const t = setTimeout(() => setDisp(full.slice(0, disp.length + 1)), 60); return () => clearTimeout(t); }
    if (!del && disp.length === full.length) { const t = setTimeout(() => setDel(true), 2200); return () => clearTimeout(t); }
    if (del && disp.length > 0) { const t = setTimeout(() => setDisp(disp.slice(0, -1)), 28); return () => clearTimeout(t); }
    if (del && disp.length === 0) { setDel(false); setIdx((idx + 1) % texts.length); }
  }, [disp, del, idx, texts]);
  return (
    <span style={{ color: T.blu2 }}>
      {disp}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.55 }} style={{ color: T.blu2 }}>|</motion.span>
    </span>
  );
}

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 250, damping: 18 });
  const y = useSpring(0, { stiffness: 250, damping: 18 });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  if (isMobile) return <div>{children}</div>;
  return (
    <motion.div ref={ref} style={{ x, y, display: "inline-block" }}
      onMouseMove={e => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.3); y.set((e.clientY - r.top - r.height / 2) * 0.3); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   NAV — Apple style
───────────────────────────────────────── */
function Nav() {
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 60); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);

  return (
    <>
      <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          background: sc ? "rgba(0,0,0,0.82)" : "transparent",
          backdropFilter: sc ? "blur(20px) saturate(1.8)" : "none",
          WebkitBackdropFilter: sc ? "blur(20px) saturate(1.8)" : "none",
          borderBottom: sc ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "all 0.4s ease" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="/" style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5, color: "#fff", textDecoration: "none" }}>
            V<span style={{ color: T.blu2 }}>·</span>Momentum
          </a>
          {/* Desktop links */}
          <div className="nav-desktop" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {["Servicios", "Proceso", "Stack", "Efectos"].map(l => (
              <a key={l} href={l === "Efectos" ? "/efectos" : `#${l.toLowerCase()}`}
                style={{ fontSize: 13, color: T.slv2, textDecoration: "none", letterSpacing: -0.2, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = T.slv2}>{l}</a>
            ))}
          </div>
          {/* CTA + hamburger */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Magnetic>
              <motion.a href="#contacto" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ display: "block", background: T.blu, color: "#fff", fontSize: 13, fontWeight: 600,
                  padding: "8px 18px", borderRadius: 980, textDecoration: "none", letterSpacing: -0.2 }}>
                Demo gratis
              </motion.a>
            </Magnetic>
            <button onClick={() => setOpen(!open)} className="nav-burger"
              style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 6, lineHeight: 1 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                  : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            style={{ position: "fixed", top: 52, left: 0, right: 0, zIndex: 199,
              background: "rgba(0,0,0,0.96)", backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 24px 24px" }}>
            {["Servicios", "Proceso", "Stack", "Efectos", "Contacto"].map((l, i) => (
              <motion.a key={l} href={l === "Efectos" ? "/efectos" : `#${l.toLowerCase()}`}
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                onClick={() => setOpen(false)}
                style={{ display: "block", padding: "14px 0", fontSize: 18, fontWeight: 500, color: T.slv,
                  borderBottom: "1px solid rgba(255,255,255,0.05)", textDecoration: "none", letterSpacing: -0.3 }}>
                {l}
              </motion.a>
            ))}
            <a href="#contacto" onClick={() => setOpen(false)}
              style={{ display: "block", marginTop: 20, background: T.blu, color: "#fff", fontSize: 16,
                fontWeight: 600, padding: "14px 0", borderRadius: 12, textDecoration: "none",
                textAlign: "center", letterSpacing: -0.3 }}>
              Quiero mi demo gratis →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media(max-width:768px){.nav-desktop{display:none!important}.nav-burger{display:block!important}}`}</style>
    </>
  );
}

/* ─────────────────────────────────────────
   HERO — Neon + Apple
───────────────────────────────────────── */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 80]);
  const op = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section style={{ minHeight: "100svh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", position: "relative",
      overflow: "hidden", padding: "100px 24px 80px" }}>

      {/* UN solo glow — neon.tech style */}
      <motion.div style={{ y, opacity: op, position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "5%", left: "50%", transform: "translateX(-50%)",
          width: "min(900px, 120vw)", height: "min(900px, 120vw)",
          background: "radial-gradient(ellipse, rgba(41,151,255,0.15) 0%, rgba(41,151,255,0.04) 45%, transparent 70%)",
          borderRadius: "50%" }} />
        {/* Grid neon.tech */}
        <div style={{ position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px" }} />
        {/* Vignette abajo */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
          background: "linear-gradient(0deg, #000 0%, transparent 100%)" }} />
      </motion.div>

      {/* Contenido */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 800, width: "100%" }}>

        {/* Badge */}
        <FadeUp delay={0.1}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7,
            background: "rgba(41,151,255,0.08)", border: "1px solid rgba(41,151,255,0.22)",
            borderRadius: 980, padding: "5px 14px", marginBottom: 32 }}>
            <motion.div animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 2.4 }}
              style={{ width: 5, height: 5, borderRadius: "50%", background: T.grn }} />
            <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: T.blu2, fontWeight: 600 }}>
              Software premium · CDMX
            </span>
          </div>
        </FadeUp>

        {/* H1 — Apple size */}
        <FadeUp delay={0.18}>
          <h1 style={{ fontSize: "clamp(44px, 8vw, 88px)", fontWeight: 700, letterSpacing: "-0.05em",
            lineHeight: 1.02, color: "#fff", marginBottom: 20 }}>
            Tu negocio merece<br />
            <span style={{ background: `linear-gradient(135deg, ${T.blu2} 0%, #a78bfa 60%, ${T.blu2} 100%)`,
              backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              tecnología real
            </span>
          </h1>
        </FadeUp>

        {/* Typewriter sub */}
        <FadeUp delay={0.28}>
          <p style={{ fontSize: "clamp(17px, 2.5vw, 22px)", color: T.slv2, lineHeight: 1.65,
            maxWidth: 560, margin: "0 auto 16px", letterSpacing: -0.3 }}>
            <Typewriter texts={[
              "Apps PWA que se instalan como app nativa.",
              "IA integrada a tu operación en días.",
              "Automatizaciones que trabajan 24/7.",
              "Bots de WhatsApp que venden solos.",
              "72 horas para tu primera demo gratis.",
            ]} />
          </p>
        </FadeUp>

        {/* CTAs */}
        <FadeUp delay={0.38}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 36, marginBottom: 72 }}>
            <Magnetic>
              <motion.a href="#contacto"
                whileHover={{ scale: 1.04, boxShadow: `0 0 40px rgba(0,113,227,0.5)` }} whileTap={{ scale: 0.97 }}
                style={{ display: "block", background: T.blu, color: "#fff", fontSize: 17, fontWeight: 600,
                  padding: "16px 36px", borderRadius: 980, textDecoration: "none", letterSpacing: -0.3,
                  boxShadow: `0 0 20px rgba(0,113,227,0.25)` }}>
                Ver demo gratis →
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a href="#servicios"
                whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.08)" }} whileTap={{ scale: 0.97 }}
                style={{ display: "block", background: "rgba(255,255,255,0.05)", color: T.slv,
                  fontSize: 17, fontWeight: 500, padding: "16px 36px", borderRadius: 980,
                  textDecoration: "none", letterSpacing: -0.3, border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)", transition: "background 0.2s" }}>
                Ver servicios
              </motion.a>
            </Magnetic>
          </div>
        </FadeUp>

        {/* Stats — Apple style */}
        <FadeUp delay={0.5}>
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(32px,6vw,80px)",
            flexWrap: "wrap", paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { to: 12, suf: "+", lbl: "Apps en producción" },
              { to: 72, suf: "h", lbl: "Primera demo" },
              { to: 40, suf: "+", lbl: "Integraciones" },
              { to: 100, suf: "%", lbl: "Mobile-first" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.05em", lineHeight: 1 }}>
                  <Counter to={s.to} suffix={s.suf} />
                </div>
                <div style={{ fontSize: 12, color: T.slv3, marginTop: 6, letterSpacing: 0.3 }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Scroll hint */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)" }}>
        <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
          <rect x="1" y="1" width="18" height="30" rx="9" stroke="rgba(245,245,247,0.18)" strokeWidth="1.5" />
          <motion.rect animate={{ y: [3, 14, 3] }} transition={{ repeat: Infinity, duration: 2.2 }} x="8.5" y="4" width="3" height="6" rx="1.5" fill={T.blu2} />
        </svg>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────
   LOGOS — neon.tech exact pattern
───────────────────────────────────────── */
const LOGOS = ["Anthropic", "OpenAI", "Vercel", "Stripe", "WhatsApp", "Twilio", "Neon", "Clerk", "Resend", "ElevenLabs", "Mercado Pago", "n8n", "Higgsfield", "GitHub"];

function Marquee({ reverse = false }: { reverse?: boolean }) {
  return (
    <div style={{ overflow: "hidden", maskImage: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)" }}>
      <motion.div animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", alignItems: "center", gap: 48, width: "max-content" }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}>
        {[...LOGOS, ...LOGOS].map((l, i) => (
          <span key={i} style={{ flexShrink: 0, fontSize: 13, fontWeight: 600, color: "rgba(245,245,247,0.35)",
            whiteSpace: "nowrap", letterSpacing: -0.2, transition: "color 0.25s", cursor: "default" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,245,247,0.8)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,245,247,0.35)")}>
            {l}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function LogosSection() {
  return (
    <section style={{ padding: "48px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: T.s1, overflow: "hidden" }}>
      <FadeUp>
        <p style={{ textAlign: "center", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.slv3, marginBottom: 28 }}>
          Tecnología que usamos
        </p>
      </FadeUp>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Marquee />
        <Marquee reverse />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SERVICIOS — slider mobile, grid desktop
───────────────────────────────────────── */
const SVCS = [
  { color: "#0071e3", img: "/services/apps.jpg",  title: "Apps & PWAs",          sub: "Instalable como app nativa",      desc: "Dashboards, portales y ERPs móvil-first con datos reales. Next.js 16." },
  { color: "#8b5cf6", img: "/services/ia.jpg",    title: "IA & Brains",           sub: "Inteligencia que trabaja por ti", desc: "Agentes con memoria, chatbots, OCR y LLMs propios integrados." },
  { color: "#30d158", img: "/services/auto.jpg",  title: "Automatizaciones",      sub: "Tu operación en piloto auto",     desc: "n8n, webhooks, crons. Elimina el trabajo repetitivo para siempre." },
  { color: "#ff9f0a", img: "/services/bots.jpg",  title: "Bots & WhatsApp",       sub: "Ventas y soporte 24/7",           desc: "Bots para WhatsApp, Instagram y web. Cobros y leads automáticos." },
  { color: "#ff375f", img: "/services/integ.jpg", title: "Integraciones",         sub: "Todo conectado en un sistema",    desc: "Stripe, MercadoPago, SAT/CFDI, CRM, ERP. Sin fricción." },
  { color: "#64d2ff", img: "/services/video.jpg", title: "Landings & Video IA",   sub: "Presencia digital que convierte", desc: "Sitios de venta + video generado con IA. Contenido para campañas." },
];

function ServiceCard({ s, i }: { s: typeof SVCS[0]; i: number }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: "relative", borderRadius: 18, overflow: "hidden", cursor: "default", background: "#111" }}>

      {/* Imagen Higgsfield */}
      <div style={{ aspectRatio: "16/10", overflow: "hidden", position: "relative" }}>
        <motion.img src={s.img} alt={s.title} animate={{ scale: hov ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        {/* Gradiente sobre imagen */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 100%)" }} />
        {/* Badge color */}
        <div style={{ position: "absolute", top: 16, left: 16 }}>
          <span style={{ display: "inline-block", background: `${s.color}22`, border: `1px solid ${s.color}55`,
            borderRadius: 980, padding: "4px 12px", fontSize: 11, color: s.color, fontWeight: 700,
            backdropFilter: "blur(12px)", letterSpacing: 0.5 }}>{s.sub}</span>
        </div>
        {/* Título sobre imagen */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 20px 0" }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: -0.5, lineHeight: 1.1, margin: 0 }}>{s.title}</h3>
        </div>
      </div>

      {/* Contenido debajo */}
      <div style={{ padding: "16px 20px 20px", background: T.s2, borderTop: `1px solid ${T.bd}` }}>
        <p style={{ fontSize: 14, color: T.slv2, lineHeight: 1.6, margin: "0 0 14px", letterSpacing: -0.1 }}>{s.desc}</p>
        <motion.a href="#contacto" animate={{ opacity: hov ? 1 : 0.6 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, color: s.color,
            fontSize: 13, fontWeight: 600, textDecoration: "none", letterSpacing: -0.2 }}>
          Ver demo <span style={{ fontSize: 16 }}>→</span>
        </motion.a>
      </div>
    </motion.div>
  );
}

function Servicios() {
  return (
    <section id="servicios" style={{ padding: "100px 24px", maxWidth: 1080, margin: "0 auto" }}>
      <FadeUp style={{ marginBottom: 60 }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: T.slv3, marginBottom: 16 }}>Qué hacemos</p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 700, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.05, margin: 0 }}>
            Todo lo que necesita<br />
            <span style={{ color: T.slv2 }}>tu negocio digital</span>
          </h2>
        </div>
      </FadeUp>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        {SVCS.map((s, i) => <ServiceCard key={i} s={s} i={i} />)}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PROCESO — Apple feature style
───────────────────────────────────────── */
function Proceso() {
  const steps = [
    { n: "01", title: "Demo gratis", desc: "En 72 horas tienes una app navegable de tu negocio. Sin pagar nada.", color: T.blu2, tag: "$0 — cero inversión" },
    { n: "02", title: "Integración real", desc: "Firmamos contrato. Conectamos pagos, IA, WhatsApp y base de datos.", color: "#a78bfa", tag: "Anticipo al firmar" },
    { n: "03", title: "Entrega & soporte", desc: "Tu equipo aprende a operar. Soporte incluido en el precio.", color: T.grn, tag: "Saldo al aprobar" },
  ];
  return (
    <section id="proceso" style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      {/* Glow sutil */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(41,151,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
        <FadeUp style={{ marginBottom: 60 }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: T.slv3, marginBottom: 16 }}>Cómo trabajamos</p>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 700, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.05, margin: 0 }}>
              Simple. Transparente.<br />
              <span style={{ color: T.slv2 }}>Sin sorpresas.</span>
            </h2>
          </div>
        </FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2 }}>
          {steps.map((s, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <div style={{ background: i === 1 ? T.s2 : T.s1, padding: "40px 32px", position: "relative", overflow: "hidden",
                borderRadius: i === 0 ? "18px 0 0 18px" : i === 2 ? "0 18px 18px 0" : 0,
                border: `1px solid ${T.bd}`, borderLeft: i > 0 ? "none" : undefined }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: s.color, fontWeight: 700, textTransform: "uppercase", marginBottom: 16 }}>Paso {s.n}</div>
                <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.05em", color: "#fff", marginBottom: 16, lineHeight: 1 }}>{s.title}</div>
                {/* Línea decorativa */}
                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ height: 1, background: `linear-gradient(90deg, ${s.color}, transparent)`, marginBottom: 20, transformOrigin: "left" }} />
                <p style={{ fontSize: 16, color: T.slv2, lineHeight: 1.65, marginBottom: 20, letterSpacing: -0.2 }}>{s.desc}</p>
                <span style={{ display: "inline-block", background: `${s.color}14`, border: `1px solid ${s.color}33`,
                  borderRadius: 8, padding: "6px 14px", fontSize: 12, color: s.color, fontWeight: 600 }}>{s.tag}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){#proceso .process-grid>div{border-radius:18px!important;border-left:1px solid rgba(255,255,255,0.08)!important}}`}</style>
    </section>
  );
}

/* ─────────────────────────────────────────
   STACK — categorías con color
───────────────────────────────────────── */
const CATS = [
  { t: "Pagos",          col: "#30d158", items: ["Stripe", "Mercado Pago", "OXXO Pay", "SPEI / CLABE"] },
  { t: "IA & LLMs",      col: "#a78bfa", items: ["Claude (Anthropic)", "GPT-4o", "Gemini", "OpenRouter"] },
  { t: "Comunicación",   col: "#ff9f0a", items: ["WhatsApp API", "Twilio", "Resend", "ElevenLabs"] },
  { t: "Automatización", col: T.blu2,    items: ["n8n workflows", "Agentes MCP", "Crons", "Make / Zapier"] },
  { t: "Auth & Users",   col: "#ff375f", items: ["Clerk", "Magic links", "OAuth Google", "Roles"] },
  { t: "Infra & Deploy", col: "#64d2ff", items: ["Vercel Edge", "Neon Postgres", "Hetzner", "GitHub CI/CD"] },
  { t: "Video & IA",     col: "#ff6b35", items: ["Higgsfield AI", "GPT Image 2", "Seedance 2.0", "Cloudinary"] },
  { t: "SAT & Legal",    col: "#34c759", items: ["CFDI 4.0", "Facturación XML", "Sumsub KYC", "LFPDPPP"] },
];

function Stack() {
  return (
    <section id="stack" style={{ padding: "100px 24px", background: T.s1, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeUp style={{ marginBottom: 60 }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: T.slv3, marginBottom: 16 }}>Ecosistema</p>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 700, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.05, margin: 0 }}>
              Conectamos con todo
            </h2>
          </div>
        </FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {CATS.map((cat, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <motion.div whileHover={{ scale: 1.03, y: -4 }} transition={{ duration: 0.22 }}
                style={{ background: T.bg, border: `1px solid ${T.bd}`, borderRadius: 14, padding: "22px 20px",
                  position: "relative", overflow: "hidden", cursor: "default",
                  transition: "border-color 0.25s, box-shadow 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${cat.col}44`; e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px ${cat.col}18`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.bd; e.currentTarget.style.boxShadow = "none"; }}>
                {/* Top accent */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${cat.col}, transparent)` }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: cat.col, boxShadow: `0 0 8px ${cat.col}` }} />
                  <span style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: cat.col, fontWeight: 700 }}>{cat.t}</span>
                </div>
                {cat.items.map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: T.slv2, marginBottom: 8, letterSpacing: -0.1 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: `${cat.col}66`, flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CTA FINAL — Apple-style full width
───────────────────────────────────────── */
function CTAFinal() {
  return (
    <section id="contacto" style={{ padding: "120px 24px", position: "relative", overflow: "hidden", background: T.bg }}>
      {/* Glow de fondo */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "min(800px,120vw)", height: "min(800px,120vw)",
        background: "radial-gradient(ellipse, rgba(0,113,227,0.14) 0%, transparent 65%)",
        pointerEvents: "none", borderRadius: "50%" }} />
      <div style={{ position: "relative", maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
        <FadeUp>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7,
            background: "rgba(48,209,88,0.08)", border: "1px solid rgba(48,209,88,0.22)",
            borderRadius: 980, padding: "5px 14px", marginBottom: 28 }}>
            <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2 }}
              style={{ width: 5, height: 5, borderRadius: "50%", background: T.grn }} />
            <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: T.grn, fontWeight: 600 }}>Disponible ahora</span>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, letterSpacing: "-0.05em",
            color: "#fff", marginBottom: 20, lineHeight: 1.02 }}>
            ¿Listo para ver<br />tu app?
          </h2>
        </FadeUp>
        <FadeUp delay={0.18}>
          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: T.slv2, maxWidth: 440, margin: "0 auto 44px", lineHeight: 1.65, letterSpacing: -0.2 }}>
            En 72 horas tienes una demo funcional de tu negocio. Sin costo, sin compromiso.
          </p>
        </FadeUp>
        <FadeUp delay={0.26}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Magnetic>
              <motion.a href="https://wa.me/529984292748?text=Hola,%20quiero%20ver%20mi%20demo%20gratis" target="_blank" rel="noopener"
                whileHover={{ scale: 1.05, boxShadow: `0 0 44px rgba(0,113,227,0.55)` }} whileTap={{ scale: 0.97 }}
                style={{ display: "block", background: T.blu, color: "#fff", fontSize: 17, fontWeight: 600,
                  padding: "16px 36px", borderRadius: 980, textDecoration: "none", letterSpacing: -0.3,
                  boxShadow: `0 0 22px rgba(0,113,227,0.28)` }}>
                Quiero mi demo gratis
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a href="https://wa.me/529984292748" target="_blank" rel="noopener"
                whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.08)" }} whileTap={{ scale: 0.97 }}
                style={{ display: "block", border: "1px solid rgba(255,255,255,0.15)", color: T.slv,
                  fontSize: 17, fontWeight: 500, padding: "16px 36px", borderRadius: 980,
                  textDecoration: "none", letterSpacing: -0.3, transition: "background 0.2s" }}>
                WhatsApp directo
              </motion.a>
            </Magnetic>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FOOTER — neon.tech structure
───────────────────────────────────────── */
const FOOTER_NAV = [
  { title: "Servicios", links: [{ l: "Apps & PWAs", h: "#servicios" }, { l: "IA & Brains", h: "#servicios" }, { l: "Automatizaciones", h: "#servicios" }, { l: "Bots & WhatsApp", h: "#servicios" }, { l: "Integraciones", h: "#servicios" }, { l: "Landings & Video IA", h: "#servicios" }] },
  { title: "Empresa", links: [{ l: "Nosotros", h: "#" }, { l: "Blog", h: "#" }, { l: "Catálogo de efectos", h: "/efectos" }, { l: "VForge Platform", h: "https://vforge.site" }, { l: "Contacto", h: "#contacto" }, { l: "Trabaja con nosotros", h: "mailto:luisdelator@vmomentums.info" }] },
  { title: "Legal", links: [{ l: "Aviso de Privacidad", h: "/privacidad" }, { l: "Términos y Condiciones", h: "/terminos" }, { l: "Política de Cookies", h: "/cookies" }, { l: "GDPR / LFPDPPP", h: "/gdpr" }, { l: "Seguridad", h: "#" }] },
];

const SOCIAL = [
  { name: "X", href: "https://twitter.com/LuisVmomentums", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
  { name: "LinkedIn", href: "https://linkedin.com/in/luis-humberto-de-la-torre-herrera-3499b9414", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
  { name: "GitHub", href: "https://github.com/turbillon50", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg> },
  { name: "WhatsApp", href: "https://wa.me/529984292748", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg> },
];

function Footer() {
  const [status, setStatus] = useState<"online" | "loading">("loading");
  useEffect(() => { setTimeout(() => setStatus("online"), 1500); }, []);

  return (
    <footer style={{ background: T.s1, borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative" }}>
      {/* Top glow line */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 1, background: "linear-gradient(90deg, transparent, rgba(41,151,255,0.4), transparent)" }} />

      {/* Main grid */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "64px 24px 48px" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "220px repeat(3,1fr)", gap: 48, alignItems: "start" }}>

          {/* Brand col */}
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5, color: "#fff", marginBottom: 8 }}>
              V<span style={{ color: T.blu2 }}>·</span>Momentum
            </div>
            <p style={{ fontSize: 12, color: T.slv3, lineHeight: 1.6, marginBottom: 20 }}>
              Agencia de software premium.<br />CDMX · México.
            </p>
            {/* Status */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                style={{ width: 7, height: 7, borderRadius: "50%", background: status === "online" ? T.grn : "#888",
                  boxShadow: status === "online" ? `0 0 8px ${T.grn}` : "none" }} />
              <span style={{ fontSize: 12, color: T.slv2 }}>
                {status === "online" ? "Todos los sistemas operativos" : "Verificando..."}
              </span>
            </div>
            {/* Social */}
            <div style={{ display: "flex", gap: 10 }}>
              {SOCIAL.map(s => (
                <motion.a key={s.name} href={s.href} target="_blank" rel="noopener" title={s.name}
                  whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32,
                    borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                    color: T.slv2, textDecoration: "none", transition: "background 0.2s, border-color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `rgba(41,151,255,0.12)`; e.currentTarget.style.borderColor = "rgba(41,151,255,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {FOOTER_NAV.map((col, ci) => (
            <div key={ci}>
              <span style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: "#fff", fontWeight: 700, display: "block", marginBottom: 20 }}>{col.title}</span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 13 }}>
                {col.links.map((link, li) => (
                  <li key={li}>
                    <a href={link.h} style={{ fontSize: 14, color: T.slv2, textDecoration: "none", letterSpacing: -0.2, transition: "color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = T.slv2}>
                      {link.l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "18px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: T.slv3, margin: 0 }}>
            © 2026 All Global Holding LLC · Colectivo Mass S.A. de C.V. · RFC CMA0803185G0
          </p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[{ l: "Privacidad", h: "/privacidad" }, { l: "Términos", h: "/terminos" }, { l: "Cookies", h: "/cookies" }, { l: "LFPDPPP", h: "/gdpr" }].map(({ l, h }) => (
              <a key={l} href={h} style={{ fontSize: 12, color: T.slv3, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = T.slv2} onMouseLeave={e => e.currentTarget.style.color = T.slv3}>{l}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .footer-grid{grid-template-columns:1fr!important;gap:40px!important}
        }
      `}</style>
    </footer>
  );
}

/* ─────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────── */
export default function Home() {
  return (
    <div style={{ background: T.bg, minHeight: "100svh", color: T.slv, fontFamily: "var(--font-geist-sans, system-ui, sans-serif)", overflowX: "hidden" }}>
      <style>{`
        *{cursor:none!important;box-sizing:border-box;margin:0;padding:0}
        body{background:#000;overflow-x:hidden}
        @media(max-width:768px){
          *{cursor:auto!important}
          .nav-desktop{display:none!important}
          .nav-burger{display:block!important}
        }
      `}</style>
      <Cursor />
      <Nav />
      <Hero />
      <LogosSection />
      <Servicios />
      <Proceso />
      <Stack />
      <CTAFinal />
      <Footer />
    </div>
  );
}
