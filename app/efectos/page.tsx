"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from "framer-motion";

/* ── PALETA ── */
const BG  = "#07080f";
const S1  = "#0e1018";
const S2  = "#111420";
const BLU = "#1a6eff";
const SLV = "#dde3f0";
const SLV2= "rgba(221,227,240,0.55)";
const SLV3= "rgba(221,227,240,0.22)";
const BD  = "rgba(255,255,255,0.07)";

/* ══════════════════════════════════════════════════
   1. SPLIT TEXT REVEAL
══════════════════════════════════════════════════ */
function SplitTextDemo() {
  const words = "Tecnología que transforma negocios".split(" ");
  return (
    <div style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#fff" }}>
      {words.map((word, i) => (
        <motion.span key={i} initial={{ opacity: 0, y: 40, rotateX: -30 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: "-20px" }} transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22,1,0.36,1] }}
          style={{ display: "inline-block", marginRight: "0.28em", transformOrigin: "bottom" }}>
          {word}
        </motion.span>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   2. SCRAMBLE TEXT
══════════════════════════════════════════════════ */
function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";
  const scramble = useCallback(() => {
    let iter = 0;
    const interval = setInterval(() => {
      setDisplay(text.split("").map((c, i) =>
        i < iter ? c : c === " " ? " " : chars[Math.floor(Math.random() * chars.length)]
      ).join(""));
      if (++iter > text.length) clearInterval(interval);
    }, 40);
  }, [text]);
  return (
    <span onMouseEnter={scramble} style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 700, color: BLU, cursor: "pointer", letterSpacing: 1 }}>
      {display}
    </span>
  );
}

/* ══════════════════════════════════════════════════
   3. MAGNETIC BUTTON
══════════════════════════════════════════════════ */
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} style={{ x, y, display: "inline-block" }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
        style={{ background: BLU, color: "#fff", border: "none", borderRadius: 14, padding: "16px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: `0 0 30px rgba(26,110,255,0.45)`, fontFamily: "inherit" }}>
        {children}
      </motion.button>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   4. 3D CARD TILT + SPOTLIGHT
══════════════════════════════════════════════════ */
function TiltCard({ title, desc, color }: { title: string; desc: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [spot, setSpot] = useState({ x: 0, y: 0, show: false });
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width - 0.5;
    const cy = (e.clientY - r.top) / r.height - 0.5;
    setRot({ x: cy * -16, y: cx * 16 });
    setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, show: true });
  };
  const onLeave = () => { setRot({ x:0, y:0 }); setSpot(s => ({...s, show:false})); };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      animate={{ rotateX: rot.x, rotateY: rot.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ background: S1, border: `1px solid ${BD}`, borderRadius: 20, padding: "32px 28px", position: "relative", overflow: "hidden", transformStyle: "preserve-3d", cursor: "default", minHeight: 180 }}>
      {/* Spotlight */}
      {spot.show && (
        <div style={{ position:"absolute", left: spot.x-120, top: spot.y-120, width:240, height:240,
          background:`radial-gradient(circle, ${color}22 0%, transparent 70%)`, pointerEvents:"none", borderRadius:"50%", transition:"opacity 0.2s" }}/>
      )}
      <div style={{ position:"relative", transform:"translateZ(20px)" }}>
        <div style={{ width:40, height:40, borderRadius:10, background:`${color}18`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
          <div style={{ width:18, height:18, borderRadius:4, background:color, opacity:0.8 }}/>
        </div>
        <h4 style={{ fontSize:18, fontWeight:700, color:"#fff", marginBottom:8 }}>{title}</h4>
        <p style={{ fontSize:13, color:SLV2, lineHeight:1.6 }}>{desc}</p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   5. ANIMATED COUNTER
══════════════════════════════════════════════════ */
function Counter({ to, label, suffix="" }: { to: number; label: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const controls = animate(0, to, { duration: 1.8, ease: [0.22,1,0.36,1], onUpdate: v => setVal(Math.round(v)) });
        return () => controls.stop();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return (
    <div ref={ref} style={{ textAlign:"center" }}>
      <div style={{ fontSize: "clamp(40px,5vw,64px)", fontWeight:900, color:"#fff", letterSpacing:"-0.05em", lineHeight:1 }}>
        {val}{suffix}
      </div>
      <div style={{ fontSize:13, color:SLV3, marginTop:8, letterSpacing:0.5 }}>{label}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   6. TYPEWRITER
══════════════════════════════════════════════════ */
function Typewriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const full = texts[idx];
    if (!deleting && display.length < full.length) {
      const t = setTimeout(() => setDisplay(full.slice(0, display.length + 1)), 70);
      return () => clearTimeout(t);
    } else if (!deleting && display.length === full.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    } else if (deleting && display.length > 0) {
      const t = setTimeout(() => setDisplay(display.slice(0, -1)), 35);
      return () => clearTimeout(t);
    } else if (deleting && display.length === 0) {
      setDeleting(false);
      setIdx((idx + 1) % texts.length);
    }
  }, [display, deleting, idx, texts]);
  return (
    <div style={{ fontSize:"clamp(20px,3vw,36px)", fontWeight:700, color:"#fff", minHeight:"1.4em", fontFamily:"monospace" }}>
      <span style={{ background:`linear-gradient(90deg,${BLU},#a5c8ff)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
        {display}
      </span>
      <motion.span animate={{ opacity:[1,0] }} transition={{ repeat:Infinity, duration:0.6 }} style={{ color:BLU }}>|</motion.span>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   7. GLASSMORPHISM
══════════════════════════════════════════════════ */
function GlassCard() {
  return (
    <div style={{ position:"relative", padding:"4px" }}>
      {/* Borde luminoso animado */}
      <motion.div animate={{ background:["linear-gradient(0deg,#1a6eff,#8b5cf6,#06b6d4,#1a6eff)"] }}
        transition={{ duration:4, repeat:Infinity, ease:"linear" }}
        style={{ position:"absolute", inset:0, borderRadius:20, padding:1, background:"linear-gradient(0deg,#1a6eff,#8b5cf6)" }}>
        <div style={{ background:S1, borderRadius:19, height:"100%" }}/>
      </motion.div>
      <div style={{ position:"relative", background:"rgba(13,15,26,0.55)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", borderRadius:20, padding:"28px 24px", border:"1px solid rgba(255,255,255,0.10)" }}>
        <div style={{ fontSize:13, letterSpacing:2, textTransform:"uppercase", color:SLV3, marginBottom:12 }}>Glassmorphism real</div>
        <div style={{ fontSize:20, fontWeight:700, color:"#fff", marginBottom:8 }}>Blur + borde luminoso</div>
        <div style={{ fontSize:13, color:SLV2, lineHeight:1.6 }}>backdrop-filter real con borde gradiente animado. No el falso de Wix.</div>
        <div style={{ marginTop:16, display:"flex", gap:8 }}>
          {["Clerk","Stripe","Neon"].map(t=>(
            <span key={t} style={{ fontSize:11, padding:"3px 10px", borderRadius:100, background:"rgba(26,110,255,0.12)", border:"1px solid rgba(26,110,255,0.25)", color:BLU }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   8. GRADIENT MESH ANIMADO
══════════════════════════════════════════════════ */
function GradientMesh() {
  return (
    <div style={{ position:"relative", height:180, borderRadius:20, overflow:"hidden", border:`1px solid ${BD}` }}>
      <motion.div animate={{ background:[
        "radial-gradient(ellipse at 20% 50%, rgba(26,110,255,0.5) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.4) 0%, transparent 60%), radial-gradient(ellipse at 60% 80%, rgba(6,182,212,0.3) 0%, transparent 60%)",
        "radial-gradient(ellipse at 70% 30%, rgba(26,110,255,0.5) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 60%, rgba(6,182,212,0.3) 0%, transparent 60%)",
        "radial-gradient(ellipse at 40% 70%, rgba(26,110,255,0.5) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.4) 0%, transparent 60%), radial-gradient(ellipse at 20% 40%, rgba(6,182,212,0.3) 0%, transparent 60%)",
        "radial-gradient(ellipse at 20% 50%, rgba(26,110,255,0.5) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.4) 0%, transparent 60%), radial-gradient(ellipse at 60% 80%, rgba(6,182,212,0.3) 0%, transparent 60%)",
      ]}} transition={{ duration:6, repeat:Infinity, ease:"easeInOut" }}
        style={{ position:"absolute", inset:0, background:BG }}/>
      <div style={{ position:"relative", zIndex:1, height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize:22, fontWeight:800, color:"#fff", letterSpacing:-1 }}>Gradient Mesh vivo</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   9. MARQUEE BIDIRECCIONAL
══════════════════════════════════════════════════ */
function BidirectionalMarquee() {
  const items = ["Next.js","Framer Motion","Tailwind","TypeScript","Neon","Clerk","Stripe","WhatsApp","Claude","OpenAI","Vercel","Resend"];
  return (
    <div style={{ overflow:"hidden", display:"flex", flexDirection:"column", gap:10 }}>
      {[1,-1].map((dir,ri) => (
        <div key={ri} style={{ overflow:"hidden", maskImage:"linear-gradient(90deg,transparent,black 8%,black 92%,transparent)", WebkitMaskImage:"linear-gradient(90deg,transparent,black 8%,black 92%,transparent)" }}>
          <motion.div animate={{ x: dir === 1 ? ["0%","-50%"] : ["-50%","0%"] }}
            transition={{ duration:20, repeat:Infinity, ease:"linear" }}
            style={{ display:"flex", gap:16, width:"max-content" }}>
            {[...items,...items].map((item,i) => (
              <span key={i} style={{ flexShrink:0, background:S1, border:`1px solid ${BD}`, borderRadius:100, padding:"6px 18px", fontSize:13, fontWeight:600, color:SLV2, whiteSpace:"nowrap" }}>{item}</span>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   10. SCROLL REVEAL CON CLIP PATH
══════════════════════════════════════════════════ */
function ClipReveal({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ overflow:"hidden" }}>
      <motion.div initial={{ clipPath:"inset(100% 0 0 0)", opacity:0 }}
        whileInView={{ clipPath:"inset(0% 0 0 0)", opacity:1 }}
        viewport={{ once:false, margin:"-40px" }}
        transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}>
        {children}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   11. NOISE TEXTURE OVERLAY
══════════════════════════════════════════════════ */
function NoiseCard() {
  return (
    <div style={{ position:"relative", borderRadius:20, overflow:"hidden", border:`1px solid ${BD}`, padding:"28px 24px", background:S2 }}>
      {/* SVG noise */}
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.045, pointerEvents:"none" }}>
        <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
        <rect width="100%" height="100%" filter="url(#noise)"/>
      </svg>
      <div style={{ position:"relative" }}>
        <div style={{ fontSize:13, color:SLV3, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Noise Texture</div>
        <div style={{ fontSize:20, fontWeight:700, color:"#fff", marginBottom:8 }}>Profundidad real</div>
        <div style={{ fontSize:13, color:SLV2, lineHeight:1.6 }}>SVG feTurbulence encima del fondo. Da grano de película, no liso plástico.</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   12. STAGGER GRID
══════════════════════════════════════════════════ */
function StaggerGrid() {
  const items = ["Pagos","IA","WhatsApp","Automatización","Auth","Infra","Video","SAT"];
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
      {items.map((item,i) => (
        <motion.div key={i} initial={{ opacity:0, scale:0.85, y:16 }}
          whileInView={{ opacity:1, scale:1, y:0 }}
          viewport={{ once:false, margin:"-20px" }}
          transition={{ duration:0.4, delay:i*0.06, ease:[0.22,1,0.36,1] }}
          whileHover={{ scale:1.05, borderColor:`rgba(26,110,255,0.4)` }}
          style={{ background:S1, border:`1px solid ${BD}`, borderRadius:12, padding:"14px 12px", textAlign:"center", fontSize:12, fontWeight:600, color:SLV2, cursor:"default" }}>
          {item}
        </motion.div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   13. CURSOR PERSONALIZADO
══════════════════════════════════════════════════ */
function CustomCursorDemo() {
  const [pos, setPos] = useState({x:-100,y:-100});
  const [hov, setHov] = useState(false);
  return (
    <div onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();setPos({x:e.clientX-r.left,y:e.clientY-r.top});}}
      onMouseLeave={()=>setPos({x:-100,y:-100})}
      style={{ position:"relative", background:S1, borderRadius:20, padding:"28px 24px", border:`1px solid ${BD}`, cursor:"none", minHeight:140, overflow:"hidden" }}>
      {/* Cursor */}
      <motion.div animate={{ x:pos.x-16, y:pos.y-16, scale:hov?2.5:1 }} transition={{ type:"spring", stiffness:400, damping:28 }}
        style={{ position:"absolute", width:32, height:32, borderRadius:"50%", background:hov?"rgba(26,110,255,0.3)":BLU, border:`2px solid ${BLU}`, pointerEvents:"none", zIndex:10, mixBlendMode:"screen" }}/>
      <div style={{ position:"relative", zIndex:1 }}>
        <div style={{ fontSize:13, color:SLV3, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Cursor personalizado</div>
        <div style={{ fontSize:18, fontWeight:700, color:"#fff", marginBottom:8 }}>Mueve el mouse aquí</div>
        <button onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
          style={{ background:"rgba(26,110,255,0.15)", border:`1px solid rgba(26,110,255,0.3)`, color:BLU, borderRadius:10, padding:"10px 20px", fontSize:13, fontWeight:600, cursor:"none", fontFamily:"inherit" }}>
          Hover aquí — el cursor crece
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   14. BLOB MORPH
══════════════════════════════════════════════════ */
function BlobMorph() {
  return (
    <div style={{ position:"relative", height:180, borderRadius:20, overflow:"hidden", border:`1px solid ${BD}`, background:S1, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <motion.div animate={{ borderRadius:["40% 60% 70% 30%/40% 50% 60% 50%","70% 30% 50% 50%/30% 60% 40% 70%","60% 40% 30% 70%/50% 40% 70% 30%","40% 60% 70% 30%/40% 50% 60% 50%"] }}
        transition={{ duration:5, repeat:Infinity, ease:"easeInOut" }}
        style={{ position:"absolute", width:200, height:200, background:`radial-gradient(circle,rgba(26,110,255,0.35),rgba(139,92,246,0.2))`, filter:"blur(24px)" }}/>
      <span style={{ position:"relative", fontSize:20, fontWeight:800, color:"#fff", letterSpacing:-1 }}>Blob Morph</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   15. SVG PATH DRAW
══════════════════════════════════════════════════ */
function SVGPathDraw() {
  return (
    <div style={{ background:S1, borderRadius:20, padding:"24px", border:`1px solid ${BD}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <svg width="280" height="80" viewBox="0 0 280 80" fill="none">
        <motion.path d="M10 40 C60 10, 100 70, 140 40 S220 10, 270 40" stroke={BLU} strokeWidth="2.5" strokeLinecap="round" fill="none"
          initial={{ pathLength:0, opacity:0 }} whileInView={{ pathLength:1, opacity:1 }} viewport={{ once:false }} transition={{ duration:1.5, ease:"easeInOut" }}/>
        <motion.circle r="5" fill={BLU} initial={{ offsetDistance:"0%" }} whileInView={{ offsetDistance:"100%" }} viewport={{ once:false }}
          transition={{ duration:1.5, ease:"easeInOut" }} style={{ offsetPath:"path('M10 40 C60 10, 100 70, 140 40 S220 10, 270 40')" } as any}/>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   EFFECT CARD WRAPPER
══════════════════════════════════════════════════ */
function EffectCard({ num, title, desc, children }: { num: string; title: string; desc: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-40px" }} transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
      style={{ background:S1, border:`1px solid ${BD}`, borderRadius:20, padding:"28px 24px", display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
        <div>
          <div style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase", color:"rgba(26,110,255,0.6)", marginBottom:6 }}>Efecto {num}</div>
          <h3 style={{ fontSize:17, fontWeight:700, color:"#fff", marginBottom:4 }}>{title}</h3>
          <p style={{ fontSize:12, color:SLV3, lineHeight:1.5 }}>{desc}</p>
        </div>
        <div style={{ background:"rgba(26,110,255,0.08)", border:"1px solid rgba(26,110,255,0.18)", borderRadius:8, padding:"4px 10px", fontSize:11, color:BLU, fontWeight:700, whiteSpace:"nowrap", flexShrink:0 }}>
          LIVE
        </div>
      </div>
      <div style={{ flex:1 }}>{children}</div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function Effects() {
  return (
    <div style={{ background:BG, minHeight:"100vh", color:SLV, fontFamily:"var(--font-geist-sans,'Geist',system-ui,sans-serif)", padding:"0 0 80px" }}>
      {/* Header */}
      <div style={{ borderBottom:`1px solid ${BD}`, padding:"0 28px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <a href="/" style={{ fontSize:18, fontWeight:900, color:"#fff", letterSpacing:-1, textDecoration:"none" }}>V<span style={{color:BLU}}>·</span>Momentum</a>
        <span style={{ fontSize:11, letterSpacing:2, textTransform:"uppercase", color:SLV3 }}>Catálogo de efectos</span>
      </div>

      {/* Hero catálogo */}
      <div style={{ textAlign:"center", padding:"72px 28px 64px" }}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
          <div style={{ display:"inline-block", background:"rgba(26,110,255,0.08)", border:"1px solid rgba(26,110,255,0.22)", borderRadius:100, padding:"4px 16px", fontSize:11, letterSpacing:2.5, textTransform:"uppercase", color:BLU, marginBottom:24 }}>
            15 efectos en vivo
          </div>
          <h1 style={{ fontSize:"clamp(32px,5vw,64px)", fontWeight:900, letterSpacing:"-0.04em", color:"#fff", marginBottom:16, lineHeight:1.1 }}>
            Catálogo de efectos<br/>
            <span style={{ background:`linear-gradient(125deg,${BLU},#a5c8ff)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              2025–2026
            </span>
          </h1>
          <p style={{ fontSize:17, color:SLV2, maxWidth:480, margin:"0 auto" }}>
            Cada efecto demostrado en tiempo real. Interactúa con ellos.
          </p>
        </motion.div>
      </div>

      {/* Grid de efectos */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 28px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))", gap:16 }}>

        <EffectCard num="01" title="Split Text Reveal" desc="Palabras que entran en cascada al hacer scroll. Scroll para activar.">
          <SplitTextDemo/>
        </EffectCard>

        <EffectCard num="02" title="Scramble Text" desc="Letras que se desordenan y forman la palabra real. Hover para activar.">
          <ScrambleText text="V·Momentum Agency"/>
        </EffectCard>

        <EffectCard num="03" title="Magnetic Button" desc="El botón se atrae al cursor antes de tocarlo. Acércate despacio.">
          <div style={{display:"flex",justifyContent:"center",padding:"16px 0"}}>
            <MagneticButton>Demo gratis →</MagneticButton>
          </div>
        </EffectCard>

        <EffectCard num="04" title="3D Card Tilt + Spotlight" desc="La card rota en 3D y proyecta un foco de luz. Mueve el mouse.">
          <TiltCard title="Apps & PWAs" desc="Mueve el mouse sobre esta card para ver la rotación 3D y el spotlight." color={BLU}/>
        </EffectCard>

        <EffectCard num="05" title="Typewriter Dinámico" desc="Escribe y borra diferentes textos en loop continuo.">
          <Typewriter texts={["Apps PWA premium","IA nativa en tu negocio","Automatizaciones reales","Bots que trabajan 24/7","Integraciones sin límite"]}/>
        </EffectCard>

        <EffectCard num="06" title="Animated Counter" desc="Números que suben al entrar en viewport. Scroll para ver.">
          <div style={{display:"flex",gap:32,justifyContent:"center",padding:"16px 0"}}>
            <Counter to={12} label="Apps en producción" suffix="+"/>
            <Counter to={72} label="Horas para demo" suffix="h"/>
            <Counter to={40} label="Integraciones" suffix="+"/>
          </div>
        </EffectCard>

        <EffectCard num="07" title="Glassmorphism Real" desc="Blur + borde gradiente animado. No el glassmorphism falso.">
          <GlassCard/>
        </EffectCard>

        <EffectCard num="08" title="Gradient Mesh Animado" desc="Colores que fluyen orgánicamente como Figma o Linear.">
          <GradientMesh/>
        </EffectCard>

        <EffectCard num="09" title="Marquee Bidireccional" desc="Dos filas que van en dirección contraria. Pausable.">
          <BidirectionalMarquee/>
        </EffectCard>

        <EffectCard num="10" title="Clip-Path Reveal" desc="Contenido que se descubre de abajo hacia arriba. Scroll.">
          <ClipReveal>
            <div style={{ background:`linear-gradient(135deg,${S2},rgba(26,110,255,0.15))`, borderRadius:14, padding:"24px", border:`1px solid rgba(26,110,255,0.2)` }}>
              <div style={{ fontSize:18, fontWeight:700, color:"#fff", marginBottom:6 }}>Contenido revelado</div>
              <div style={{ fontSize:13, color:SLV2 }}>Este bloque se descubrio con clip-path desde abajo.</div>
            </div>
          </ClipReveal>
        </EffectCard>

        <EffectCard num="11" title="Noise Texture Overlay" desc="Textura de grano SVG. Da profundidad real sin imágenes.">
          <NoiseCard/>
        </EffectCard>

        <EffectCard num="12" title="Stagger Grid Reveal" desc="Cards que aparecen en cascada con delay escalonado.">
          <StaggerGrid/>
        </EffectCard>

        <EffectCard num="13" title="Cursor Personalizado" desc="Cursor que cambia de tamaño según el elemento. Entra aquí.">
          <CustomCursorDemo/>
        </EffectCard>

        <EffectCard num="14" title="Blob Morph" desc="Formas orgánicas que mutan suavemente. Fondo de hero.">
          <BlobMorph/>
        </EffectCard>

        <EffectCard num="15" title="SVG Path Draw" desc="Línea que se dibuja sola al hacer scroll. Bueno para proceso.">
          <SVGPathDraw/>
        </EffectCard>

      </div>

      {/* Footer */}
      <div style={{ textAlign:"center", marginTop:72, padding:"0 28px" }}>
        <a href="/" style={{ display:"inline-block", background:BLU, color:"#fff", fontSize:14, fontWeight:700, padding:"14px 32px", borderRadius:12, textDecoration:"none", boxShadow:`0 0 24px rgba(26,110,255,0.35)` }}>
          ← Volver a vmomentum.site
        </a>
      </div>
    </div>
  );
}
