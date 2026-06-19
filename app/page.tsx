"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const C = {
  bg:"#07080f",s1:"#0d0f1a",s2:"#121525",blu:"#1a6eff",blu2:"#4d8fff",
  slv:"#c8d0e0",slv2:"rgba(200,208,224,0.6)",slv3:"rgba(200,208,224,0.28)",
  bd:"rgba(255,255,255,0.06)",
};

function FadeUp({children,delay=0,className=""}:{children:React.ReactNode;delay?:number;className?:string}){
  return(
    <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-60px"}} transition={{duration:0.55,delay,ease:[0.22,1,0.36,1]}} className={className}>
      {children}
    </motion.div>
  );
}

const SERVICIOS=[
  {icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,color:"#1a6eff",name:"Apps & PWAs",desc:"Aplicaciones web progresivas que se instalan como app nativa. Dashboards, portales, ERPs, marketplaces con datos reales.",tags:["Next.js 16","PWA","Móvil-first","3 modos"]},
  {icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,color:"#8b5cf6",name:"IA & Brains",desc:"Agentes inteligentes, chatbots con memoria, análisis de documentos, OCR, LLMs integrados al negocio.",tags:["Claude","GPT-4o","RAG","MCP"]},
  {icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,color:"#10b981",name:"Automatizaciones",desc:"Flujos automáticos que hacen el trabajo repetitivo. Notificaciones, reportes, sync entre sistemas.",tags:["n8n","Webhooks","Crons","APIs"]},
  {icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,color:"#f59e0b",name:"Bots & WhatsApp",desc:"Bots conversacionales para WhatsApp, Instagram y web. Atención 24/7, calificación de leads, cobros automatizados.",tags:["WhatsApp API","Twilio","IA nativa","24/7"]},
  {icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>,color:"#ec4899",name:"Integraciones",desc:"Conectamos pagos, facturación SAT, CRM, ERP, ecommerce, delivery y logística en un solo sistema.",tags:["Stripe","MercadoPago","SAT/CFDI","APIs"]},
  {icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.8"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,color:"#06b6d4",name:"Landings & Video IA",desc:"Sitios de venta de alto impacto con video generado por IA. Campañas, redes sociales, contenido que convierte.",tags:["Higgsfield","Video IA","SEO","Conversión"]},
];

const LOGOS=["Anthropic","OpenAI","Vercel","Neon","Clerk","Stripe","WhatsApp","Twilio","Resend","ElevenLabs","Mercado Pago","n8n","Sumsub","Higgsfield"];

function LogosCarousel(){
  return(
    <div style={{position:"relative",overflow:"hidden",padding:"24px 0",maskImage:"linear-gradient(90deg,transparent,black 8%,black 92%,transparent)"}}>
      <div className="logos-scroll" style={{display:"flex",width:"max-content"}}>
        {[...LOGOS,...LOGOS].map((l,i)=>(
          <div key={i} style={{flexShrink:0,margin:"0 40px",fontSize:14,fontWeight:700,color:"rgba(200,208,224,0.45)",letterSpacing:-0.3,whiteSpace:"nowrap",transition:"color 0.2s",cursor:"default"}}
            onMouseEnter={e=>(e.currentTarget.style.color="rgba(200,208,224,0.9)")}
            onMouseLeave={e=>(e.currentTarget.style.color="rgba(200,208,224,0.45)")}>
            {l}
          </div>
        ))}
      </div>
      <style>{`.logos-scroll{animation:scroll-logos 32s linear infinite}.logos-scroll:hover{animation-play-state:paused}@keyframes scroll-logos{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

function Nav(){
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>40);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  const links=["Servicios","Stack","Proceso","Precios","Blog"];
  return(
    <>
      <motion.nav initial={{y:-80,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.6,ease:[0.22,1,0.36,1]}} style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:scrolled?"rgba(7,8,15,0.92)":"transparent",backdropFilter:scrolled?"blur(20px)":"none",borderBottom:scrolled?"1px solid rgba(255,255,255,0.05)":"1px solid transparent",transition:"all 0.4s ease"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:20,fontWeight:800,letterSpacing:-1,color:"#fff"}}>V<span style={{color:C.blu}}>·</span>Momentum</div>
          <div style={{display:"flex",gap:28,alignItems:"center"}}>
            <div className="hidden-mobile" style={{display:"flex",gap:28}}>
              {links.map(l=><a key={l} href={`#${l.toLowerCase()}`} style={{fontSize:14,color:C.slv2,textDecoration:"none",transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color=C.slv2}>{l}</a>)}
            </div>
            <motion.a href="#contacto" whileHover={{scale:1.04,boxShadow:"0 0 28px rgba(26,110,255,0.45)"}} whileTap={{scale:0.97}} style={{background:C.blu,color:"#fff",fontSize:13,fontWeight:700,padding:"9px 20px",borderRadius:10,textDecoration:"none",boxShadow:"0 0 16px rgba(26,110,255,0.3)"}}>Demo gratis</motion.a>
            <button onClick={()=>setOpen(!open)} className="show-mobile" style={{display:"none",background:"none",border:"none",cursor:"pointer",color:"#fff",padding:4}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{open?<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>:<><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}</svg>
            </button>
          </div>
        </div>
      </motion.nav>
      <AnimatePresence>
        {open&&<motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} style={{position:"fixed",top:64,left:0,right:0,zIndex:99,background:"rgba(7,8,15,0.97)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"16px 24px 24px"}}>
          {links.map((l,i)=><motion.a key={l} href={`#${l.toLowerCase()}`} initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}} onClick={()=>setOpen(false)} style={{display:"block",padding:"12px 0",fontSize:16,color:C.slv,textDecoration:"none",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>{l}</motion.a>)}
        </motion.div>}
      </AnimatePresence>
      <style>{`@media(max-width:768px){.hidden-mobile{display:none!important}.show-mobile{display:block!important}}`}</style>
    </>
  );
}

function Hero(){
  const {scrollY}=useScroll();
  const y=useTransform(scrollY,[0,600],[0,100]);
  const opacity=useTransform(scrollY,[0,400],[1,0]);
  const [count,setCount]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setCount(c=>c<12?c+1:12),100);return()=>clearInterval(t);},[]);
  return(
    <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:100,paddingBottom:80}}>
      <motion.div style={{y,opacity,position:"absolute",inset:0,pointerEvents:"none"}}>
        <div style={{position:"absolute",top:"18%",left:"50%",transform:"translateX(-50%)",width:700,height:700,background:"radial-gradient(circle,rgba(26,110,255,0.11) 0%,transparent 70%)",borderRadius:"50%"}}/>
        <div style={{position:"absolute",top:"35%",left:"15%",width:350,height:350,background:"radial-gradient(circle,rgba(139,92,246,0.06) 0%,transparent 70%)",borderRadius:"50%"}}/>
        <div style={{position:"absolute",top:"45%",right:"10%",width:280,height:280,background:"radial-gradient(circle,rgba(6,182,212,0.05) 0%,transparent 70%)",borderRadius:"50%"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",backgroundSize:"60px 60px"}}/>
      </motion.div>
      <div style={{position:"relative",zIndex:1,textAlign:"center",maxWidth:900,padding:"0 24px"}}>
        <FadeUp>
          <motion.div whileHover={{scale:1.04}} style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(26,110,255,0.1)",border:"1px solid rgba(26,110,255,0.25)",borderRadius:100,padding:"6px 18px",marginBottom:32}}>
            <motion.div animate={{scale:[1,1.5,1]}} transition={{repeat:Infinity,duration:2}} style={{width:6,height:6,borderRadius:"50%",background:C.blu}}/>
            <span style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:C.blu,fontWeight:700}}>Agencia de software premium · CDMX</span>
          </motion.div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 style={{fontSize:"clamp(36px,6vw,78px)",fontWeight:900,letterSpacing:-3,lineHeight:1.05,color:"#fff",marginBottom:24}}>
            Tu negocio merece{" "}
            <span style={{background:`linear-gradient(135deg,${C.blu},${C.blu2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
              tecnología de primer nivel
            </span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p style={{fontSize:"clamp(16px,2vw,20px)",color:C.slv2,maxWidth:580,margin:"0 auto 44px",lineHeight:1.75}}>
            Apps PWA, IA nativa, automatizaciones, bots, integraciones y más. Del concepto a producción. Rápido, serio, con resultados reales.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:72}}>
            <motion.a href="#contacto" whileHover={{scale:1.05,boxShadow:"0 0 36px rgba(26,110,255,0.5)"}} whileTap={{scale:0.97}} style={{background:C.blu,color:"#fff",fontSize:15,fontWeight:700,padding:"15px 34px",borderRadius:12,textDecoration:"none",boxShadow:"0 0 20px rgba(26,110,255,0.3)"}}>
              Ver mi demo gratis →
            </motion.a>
            <motion.a href="#proceso" whileHover={{scale:1.04}} whileTap={{scale:0.97}} style={{border:"1px solid rgba(200,208,224,0.18)",color:C.slv,fontSize:15,fontWeight:500,padding:"15px 34px",borderRadius:12,textDecoration:"none",backdropFilter:"blur(8px)"}}>
              Cómo trabajamos
            </motion.a>
          </div>
        </FadeUp>
        <FadeUp delay={0.4}>
          <div style={{display:"flex",justifyContent:"center",gap:"clamp(24px,5vw,64px)",flexWrap:"wrap",paddingTop:32,borderTop:"1px solid rgba(255,255,255,0.05)"}}>
            {[{num:`+${count}`,label:"Apps en producción"},{num:"72h",label:"Demo lista"},{num:"3",label:"Etapas claras"},{num:"IA",label:"Nativa en todo"}].map((s,i)=>(
              <motion.div key={i} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.7+i*0.1}} style={{textAlign:"center"}}>
                <div style={{fontSize:"clamp(26px,4vw,38px)",fontWeight:900,color:"#fff",letterSpacing:-2}}>{s.num}</div>
                <div style={{fontSize:12,color:C.slv3,marginTop:4,letterSpacing:0.5}}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </div>
      <motion.div animate={{y:[0,10,0]}} transition={{repeat:Infinity,duration:2.2}} style={{position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)"}}>
        <svg width="24" height="36" viewBox="0 0 24 36" fill="none"><rect x="1" y="1" width="22" height="34" rx="11" stroke="rgba(200,208,224,0.18)" strokeWidth="1.5"/><motion.rect animate={{y:[4,18,4]}} transition={{repeat:Infinity,duration:2.2}} x="10" y="5" width="4" height="8" rx="2" fill="rgba(26,110,255,0.7)"/></svg>
      </motion.div>
    </section>
  );
}

function LogosSection(){
  return(
    <section style={{padding:"40px 0",borderTop:"1px solid rgba(255,255,255,0.04)",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
      <FadeUp>
        <p style={{textAlign:"center",fontSize:11,letterSpacing:3,textTransform:"uppercase",color:C.slv3,marginBottom:28}}>Tecnología que usamos</p>
      </FadeUp>
      <LogosCarousel/>
    </section>
  );
}

function Servicios(){
  return(
    <section id="servicios" style={{padding:"120px 24px",maxWidth:1200,margin:"0 auto"}}>
      <FadeUp>
        <div style={{textAlign:"center",marginBottom:72}}>
          <div style={{display:"inline-block",background:"rgba(26,110,255,0.08)",border:"1px solid rgba(26,110,255,0.2)",borderRadius:100,padding:"4px 16px",marginBottom:20}}>
            <span style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:C.blu}}>Qué hacemos</span>
          </div>
          <h2 style={{fontSize:"clamp(28px,4vw,54px)",fontWeight:900,letterSpacing:-2,color:"#fff",marginBottom:16}}>Todo lo que necesita<br/>tu negocio digital</h2>
          <p style={{fontSize:17,color:C.slv2,maxWidth:500,margin:"0 auto"}}>Desde la app hasta la IA. Integraciones reales, no promesas.</p>
        </div>
      </FadeUp>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:16}}>
        {SERVICIOS.map((s,i)=>(
          <FadeUp key={i} delay={i*0.07}>
            <motion.div whileHover={{y:-6}} transition={{duration:0.25}} style={{background:C.s1,border:`1px solid ${C.bd}`,borderRadius:16,padding:"28px 24px",height:"100%"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=`${s.color}44`;e.currentTarget.style.boxShadow=`0 8px 40px rgba(0,0,0,0.4),0 0 0 1px ${s.color}18`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.bd;e.currentTarget.style.boxShadow="none";}}>
              <div style={{width:44,height:44,borderRadius:10,background:`${s.color}14`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>{s.icon}</div>
              <h3 style={{fontSize:17,fontWeight:700,color:"#fff",marginBottom:8}}>{s.name}</h3>
              <p style={{fontSize:13,color:C.slv2,lineHeight:1.65,marginBottom:16}}>{s.desc}</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {s.tags.map(t=><span key={t} style={{fontSize:11,padding:"3px 10px",borderRadius:100,background:`${s.color}10`,border:`1px solid ${s.color}22`,color:`${s.color}cc`}}>{t}</span>)}
              </div>
            </motion.div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function Proceso(){
  const pasos=[
    {n:"01",name:"Demo gratis",desc:"En 72 horas tienes una app navegable de tu negocio. Sin pagar nada. La ves, la pruebas, decides si quieres seguir.",price:"$0 — cero inversión"},
    {n:"02",name:"Integración real",desc:"Firmamos contrato. Conectamos pagos, base de datos, IA, WhatsApp. Tu app funciona con datos reales de tu operación.",price:"Anticipo al firmar"},
    {n:"03",name:"Entrega & soporte",desc:"Tu equipo aprende a operar. Soporte incluido. Tú manejas el negocio, nosotros la tecnología.",price:"Saldo al aprobar"},
  ];
  return(
    <section id="proceso" style={{padding:"120px 24px",position:"relative"}}>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent,rgba(26,110,255,0.03) 50%,transparent)",pointerEvents:"none"}}/>
      <div style={{maxWidth:1100,margin:"0 auto",position:"relative"}}>
        <FadeUp>
          <div style={{textAlign:"center",marginBottom:72}}>
            <div style={{display:"inline-block",background:"rgba(26,110,255,0.08)",border:"1px solid rgba(26,110,255,0.2)",borderRadius:100,padding:"4px 16px",marginBottom:20}}>
              <span style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:C.blu}}>Cómo trabajamos</span>
            </div>
            <h2 style={{fontSize:"clamp(28px,4vw,54px)",fontWeight:900,letterSpacing:-2,color:"#fff"}}>Simple. Transparente.<br/>Sin sorpresas.</h2>
          </div>
        </FadeUp>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}>
          {pasos.map((p,i)=>(
            <FadeUp key={i} delay={i*0.12}>
              <div style={{background:C.s1,border:`1px solid ${C.bd}`,borderRadius:16,padding:"32px 28px",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:16,right:20,fontSize:80,fontWeight:900,color:"rgba(26,110,255,0.04)",letterSpacing:-4,lineHeight:1}}>{p.n}</div>
                <div style={{fontSize:40,fontWeight:900,color:"rgba(26,110,255,0.22)",letterSpacing:-3,marginBottom:16}}>{p.n}</div>
                <h3 style={{fontSize:20,fontWeight:700,color:"#fff",marginBottom:12}}>{p.name}</h3>
                <p style={{fontSize:14,color:C.slv2,lineHeight:1.7,marginBottom:20}}>{p.desc}</p>
                <div style={{display:"inline-block",background:"rgba(26,110,255,0.1)",border:"1px solid rgba(26,110,255,0.2)",borderRadius:8,padding:"6px 14px",fontSize:12,color:C.blu,fontWeight:600}}>{p.price}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Integraciones(){
  const cats=[
    {title:"Pagos",items:["Stripe","Mercado Pago","OXXO Pay","SPEI / CLABE"]},
    {title:"IA & LLMs",items:["Claude (Anthropic)","GPT-4o (OpenAI)","Gemini","OpenRouter"]},
    {title:"Comunicación",items:["WhatsApp API","Twilio SMS","Resend Email","ElevenLabs Voz"]},
    {title:"Automatización",items:["n8n workflows","Agentes MCP","Crons & webhooks","Make / Zapier"]},
    {title:"Auth & Users",items:["Clerk","Magic links","OAuth Google","Roles & permisos"]},
    {title:"Infra",items:["Vercel Edge","Neon Postgres","Hetzner VPS","GitHub CI/CD"]},
    {title:"Video & IA visual",items:["Higgsfield AI","GPT Image 2","Seedance Video","Cloudinary"]},
    {title:"Gobierno & SAT",items:["CFDI 4.0","Facturación XML","Sumsub KYC","Cumplimiento"]},
  ];
  return(
    <section id="stack" style={{padding:"120px 24px",maxWidth:1200,margin:"0 auto"}}>
      <FadeUp>
        <div style={{textAlign:"center",marginBottom:72}}>
          <div style={{display:"inline-block",background:"rgba(26,110,255,0.08)",border:"1px solid rgba(26,110,255,0.2)",borderRadius:100,padding:"4px 16px",marginBottom:20}}>
            <span style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:C.blu}}>Ecosistema</span>
          </div>
          <h2 style={{fontSize:"clamp(28px,4vw,54px)",fontWeight:900,letterSpacing:-2,color:"#fff",marginBottom:16}}>Conectamos con todo</h2>
          <p style={{fontSize:17,color:C.slv2,maxWidth:460,margin:"0 auto"}}>Más de 40 servicios y APIs integradas en tu plataforma.</p>
        </div>
      </FadeUp>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>
        {cats.map((cat,i)=>(
          <FadeUp key={i} delay={i*0.05}>
            <div style={{background:C.s1,border:`1px solid ${C.bd}`,borderRadius:12,padding:"20px"}}>
              <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.slv3,marginBottom:14}}>{cat.title}</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {cat.items.map(item=>(
                  <div key={item} style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:C.slv2}}>
                    <div style={{width:5,height:5,borderRadius:"50%",background:C.blu,flexShrink:0}}/>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function CTAFinal(){
  return(
    <section id="contacto" style={{padding:"120px 24px"}}>
      <FadeUp>
        <motion.div whileInView={{boxShadow:"0 0 80px rgba(26,110,255,0.1)"}} viewport={{once:true}} style={{maxWidth:800,margin:"0 auto",background:"linear-gradient(135deg,#0f1432 0%,#0a0d24 100%)",border:"1px solid rgba(26,110,255,0.2)",borderRadius:24,padding:"clamp(40px,6vw,80px) clamp(24px,4vw,60px)",textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:500,height:500,background:"radial-gradient(circle,rgba(26,110,255,0.07) 0%,transparent 70%)",pointerEvents:"none"}}/>
          <div style={{position:"relative"}}>
            <h2 style={{fontSize:"clamp(28px,4vw,52px)",fontWeight:900,letterSpacing:-2,color:"#fff",marginBottom:16}}>¿Listo para ver tu app?</h2>
            <p style={{fontSize:17,color:C.slv2,maxWidth:440,margin:"0 auto 40px",lineHeight:1.7}}>En 72 horas tienes una demo funcional de tu negocio. Sin costo, sin compromiso.</p>
            <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
              <motion.a href="https://wa.me/529984292748?text=Hola,%20quiero%20ver%20mi%20demo%20gratis" target="_blank" rel="noopener" whileHover={{scale:1.05,boxShadow:"0 0 40px rgba(26,110,255,0.5)"}} whileTap={{scale:0.97}} style={{background:C.blu,color:"#fff",fontSize:15,fontWeight:700,padding:"16px 36px",borderRadius:12,textDecoration:"none"}}>
                Quiero mi demo gratis
              </motion.a>
              <motion.a href="https://wa.me/529984292748" target="_blank" rel="noopener" whileHover={{scale:1.04}} whileTap={{scale:0.97}} style={{border:"1px solid rgba(200,208,224,0.18)",color:C.slv,fontSize:15,padding:"16px 36px",borderRadius:12,textDecoration:"none"}}>
                WhatsApp directo
              </motion.a>
            </div>
          </div>
        </motion.div>
      </FadeUp>
    </section>
  );
}

function Footer(){
  return(
    <footer style={{borderTop:"1px solid rgba(255,255,255,0.05)",padding:"32px 24px"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
        <div style={{fontSize:16,fontWeight:800,letterSpacing:-1,color:"#fff"}}>V<span style={{color:C.blu}}>·</span>Momentum</div>
        <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
          {["Privacidad","Términos","Blog","Contacto"].map(l=><a key={l} href="#" style={{fontSize:12,color:C.slv3,textDecoration:"none"}}>{l}</a>)}
        </div>
        <div style={{fontSize:11,color:"rgba(200,208,224,0.2)"}}>© 2026 All Global Holding LLC · CDMX</div>
      </div>
    </footer>
  );
}

export default function Home(){
  return(
    <div style={{background:C.bg,minHeight:"100vh",color:C.slv,fontFamily:"var(--font-geist-sans,system-ui)"}}>
      <Nav/>
      <Hero/>
      <LogosSection/>
      <Servicios/>
      <Proceso/>
      <Integraciones/>
      <CTAFinal/>
      <Footer/>
    </div>
  );
}
