"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, animate } from "framer-motion";

const BG="#07080f",S1="#0e1018",S2="#111420",S3="#141829";
const BLU="#1a6eff",BLU2="#5294ff";
const SLV="#dde3f0",SLV2="rgba(221,227,240,0.58)",SLV3="rgba(221,227,240,0.22)";
const BD="rgba(255,255,255,0.07)";

/* ══ CURSOR ══ */
function GlobalCursor(){
  const cx=useSpring(-200,{stiffness:180,damping:18});
  const cy=useSpring(-200,{stiffness:180,damping:18});
  const [big,setBig]=useState(false);
  useEffect(()=>{
    const mv=(e:MouseEvent)=>{cx.set(e.clientX-12);cy.set(e.clientY-12);};
    const ov=(e:MouseEvent)=>setBig(!!(e.target as HTMLElement).closest('a,button,[data-mag]'));
    window.addEventListener('mousemove',mv);
    window.addEventListener('mouseover',ov);
    return()=>{window.removeEventListener('mousemove',mv);window.removeEventListener('mouseover',ov);};
  },[]);
  return <motion.div style={{x:cx,y:cy,position:'fixed',width:24,height:24,borderRadius:'50%',border:`1.5px solid ${BLU}`,pointerEvents:'none',zIndex:9999,mixBlendMode:'screen',scale:big?2.2:1,background:big?'rgba(26,110,255,0.15)':'transparent',transition:'scale 0.18s,background 0.18s'}}/>;
}

/* ══ UTILIDADES ══ */
function FadeUp({children,delay=0,style={}}:{children:React.ReactNode;delay?:number;style?:React.CSSProperties}){
  return <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-50px'}} transition={{duration:0.55,delay,ease:[0.22,1,0.36,1]}} style={style}>{children}</motion.div>;
}
function ClipReveal({children,delay=0}:{children:React.ReactNode;delay?:number}){
  return <div style={{overflow:'hidden'}}><motion.div initial={{clipPath:'inset(100% 0 0 0)'}} whileInView={{clipPath:'inset(0% 0 0 0)'}} viewport={{once:true,margin:'-40px'}} transition={{duration:0.65,delay,ease:[0.22,1,0.36,1]}}>{children}</motion.div></div>;
}
function SplitText({text,delay=0}:{text:string;delay?:number}){
  return <>{text.split(' ').map((w,i)=><motion.span key={i} initial={{opacity:0,y:32,rotateX:-20}} whileInView={{opacity:1,y:0,rotateX:0}} viewport={{once:true,margin:'-40px'}} transition={{duration:0.5,delay:delay+i*0.08,ease:[0.22,1,0.36,1]}} style={{display:'inline-block',marginRight:'0.26em',transformOrigin:'bottom'}}>{w}</motion.span>)}</>;
}
function GradText({children}:{children:React.ReactNode}){
  return <motion.span animate={{backgroundPosition:['0% 50%','100% 50%','0% 50%']}} transition={{duration:4,repeat:Infinity,ease:'linear'}} style={{background:`linear-gradient(90deg,${BLU},${BLU2},#a5c8ff,${BLU})`,backgroundSize:'200%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',display:'inline'}}>{children}</motion.span>;
}
function Magnetic({children}:{children:React.ReactNode}){
  const ref=useRef<HTMLDivElement>(null);
  const x=useSpring(0,{stiffness:220,damping:16});
  const y=useSpring(0,{stiffness:220,damping:16});
  return <motion.div ref={ref} style={{x,y,display:'inline-block'}} onMouseMove={e=>{const r=ref.current!.getBoundingClientRect();x.set((e.clientX-r.left-r.width/2)*0.32);y.set((e.clientY-r.top-r.height/2)*0.32);}} onMouseLeave={()=>{x.set(0);y.set(0);}}>{children}</motion.div>;
}
function Scramble({text,color="#fff"}:{text:string;color?:string}){
  const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";
  const [d,setD]=useState(text);
  const go=useCallback(()=>{let i=0;const iv=setInterval(()=>{setD(text.split('').map((c,j)=>j<i?c:c===' '?' ':chars[Math.floor(Math.random()*chars.length)]).join(''));if(++i>text.length)clearInterval(iv);},36);},[text]);
  return <span onMouseEnter={go} style={{cursor:'default',color}}>{d}</span>;
}
function Counter({to,suffix=""}:{to:number;suffix?:string}){
  const [v,setV]=useState(0);const ref=useRef<HTMLSpanElement>(null);const done=useRef(false);
  useEffect(()=>{const ob=new IntersectionObserver(([e])=>{if(e.isIntersecting&&!done.current){done.current=true;const c=animate(0,to,{duration:1.8,ease:[0.22,1,0.36,1],onUpdate:n=>setV(Math.round(n))});return()=>c.stop();}});if(ref.current)ob.observe(ref.current);return()=>ob.disconnect();},[to]);
  return <span ref={ref}>{v}{suffix}</span>;
}
function Typewriter({texts}:{texts:string[]}){
  const [idx,setIdx]=useState(0);const [disp,setDisp]=useState('');const [del,setDel]=useState(false);
  useEffect(()=>{
    const full=texts[idx];
    if(!del&&disp.length<full.length){const t=setTimeout(()=>setDisp(full.slice(0,disp.length+1)),65);return()=>clearTimeout(t);}
    if(!del&&disp.length===full.length){const t=setTimeout(()=>setDel(true),2000);return()=>clearTimeout(t);}
    if(del&&disp.length>0){const t=setTimeout(()=>setDisp(disp.slice(0,-1)),32);return()=>clearTimeout(t);}
    if(del&&disp.length===0){setDel(false);setIdx((idx+1)%texts.length);}
  },[disp,del,idx,texts]);
  return <span style={{background:`linear-gradient(90deg,${BLU},${BLU2})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{disp}<motion.span animate={{opacity:[1,0]}} transition={{repeat:Infinity,duration:0.55}} style={{WebkitTextFillColor:BLU}}>|</motion.span></span>;
}
function NoiseBg(){
  return <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.038,pointerEvents:'none'}} aria-hidden><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>;
}
function Blob({color=BLU,size=300,style={}}:{color?:string;size?:number;style?:React.CSSProperties}){
  return <motion.div animate={{borderRadius:['40% 60% 70% 30%/40% 50% 60% 50%','70% 30% 50% 50%/30% 60% 40% 70%','60% 40% 30% 70%/50% 40% 70% 30%','40% 60% 70% 30%/40% 50% 60% 50%']}} transition={{duration:6,repeat:Infinity,ease:'easeInOut'}} style={{width:size,height:size,background:`radial-gradient(circle,${color}28,${color}06)`,filter:`blur(${size/4}px)`,...style}}/>;
}
function TiltCard({children,color=BLU}:{children:React.ReactNode;color?:string}){
  const ref=useRef<HTMLDivElement>(null);
  const [rot,setRot]=useState({x:0,y:0});
  const [sp,setSp]=useState({x:0,y:0,on:false});
  return <motion.div ref={ref} onMouseMove={e=>{const r=ref.current!.getBoundingClientRect();setRot({x:(e.clientY-r.top)/r.height*-14+7,y:(e.clientX-r.left)/r.width*14-7});setSp({x:e.clientX-r.left,y:e.clientY-r.top,on:true});}} onMouseLeave={()=>{setRot({x:0,y:0});setSp(s=>({...s,on:false}));}} animate={{rotateX:rot.x,rotateY:rot.y}} transition={{type:'spring',stiffness:220,damping:22}} style={{background:S1,border:`1px solid ${BD}`,borderRadius:18,overflow:'hidden',position:'relative',transformStyle:'preserve-3d',height:'100%'}}>{sp.on&&<div style={{position:'absolute',left:sp.x-130,top:sp.y-130,width:260,height:260,background:`radial-gradient(circle,${color}20 0%,transparent 68%)`,pointerEvents:'none',borderRadius:'50%'}}/>}<div style={{position:'relative',transform:'translateZ(18px)',padding:'26px 22px',height:'100%'}}>{children}</div></motion.div>;
}
function GlassCard({children}:{children:React.ReactNode}){
  return <div style={{position:'relative',borderRadius:20}}><motion.div animate={{background:['linear-gradient(0deg,#1a6eff,#8b5cf6,#06b6d4,#1a6eff)']}} transition={{duration:4,repeat:Infinity,ease:'linear'}} style={{position:'absolute',inset:0,borderRadius:20,padding:1}}><div style={{background:S1,borderRadius:19,height:'100%'}}/></motion.div><div style={{position:'relative',background:'rgba(14,16,24,0.55)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',borderRadius:20,padding:'28px 24px',border:'1px solid rgba(255,255,255,0.09)'}}>{children}</div></div>;
}

/* ══ LOGOS REALES ══ */
const LOGO_ITEMS=[
  {name:"Anthropic",src:"/logos/anthropic.svg"},
  {name:"OpenAI",src:"/logos/openai.svg"},
  {name:"Vercel",src:"/logos/vercel.svg"},
  {name:"Stripe",src:"/logos/stripe.svg"},
  {name:"WhatsApp",src:"/logos/whatsapp.svg"},
  {name:"Twilio",src:"/logos/twilio.svg"},
  {name:"GitHub",src:"/logos/github.svg"},
  {name:"Cloudinary",src:"/logos/cloudinary.svg"},
  {name:"Zapier",src:"/logos/zapier.svg"},
  {name:"n8n",src:"/logos/n8n.svg"},
  {name:"Mercado Pago",src:"/logos/mercadopago.svg"},
  {name:"GPT-4o",src:"/logos/gpt.svg"},
];
function Marquee({items,reverse=false,speed=28}:{items:typeof LOGO_ITEMS;reverse?:boolean;speed?:number}){
  return(
    <div style={{overflow:'hidden',maskImage:'linear-gradient(90deg,transparent,black 8%,black 92%,transparent)',WebkitMaskImage:'linear-gradient(90deg,transparent,black 8%,black 92%,transparent)'}}>
      <motion.div animate={{x:reverse?['-50%','0%']:['0%','-50%']}} transition={{duration:speed,repeat:Infinity,ease:'linear'}}
        style={{display:'flex',alignItems:'center',gap:40,width:'max-content'}}
        onMouseEnter={e=>(e.currentTarget.style.animationPlayState='paused')}
        onMouseLeave={e=>(e.currentTarget.style.animationPlayState='running')}>
        {[...items,...items].map((logo,i)=>(
          <div key={i} style={{flexShrink:0,display:'flex',alignItems:'center',gap:10,opacity:0.7,transition:'opacity 0.25s'}}
            onMouseEnter={e=>(e.currentTarget.style.opacity='1')} onMouseLeave={e=>(e.currentTarget.style.opacity='0.7')}>
            <img src={logo.src} alt={logo.name} style={{height:24,width:'auto',filter:'brightness(0) invert(1) opacity(0.7)',objectFit:'contain'}} onError={e=>(e.currentTarget.style.display='none')}/>
            <span style={{fontSize:13,fontWeight:700,color:SLV,whiteSpace:'nowrap'}}>{logo.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ══ NAV ══ */
function Nav(){
  const [sc,setSc]=useState(false);const [op,setOp]=useState(false);
  useEffect(()=>{const f=()=>setSc(window.scrollY>48);window.addEventListener('scroll',f);return()=>window.removeEventListener('scroll',f);},[]);
  return(
    <>
      <motion.nav initial={{y:-72,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.55,ease:[0.22,1,0.36,1]}}
        style={{position:'fixed',top:0,left:0,right:0,zIndex:200,background:sc?'rgba(7,8,15,0.88)':'transparent',backdropFilter:sc?'blur(24px)':'none',WebkitBackdropFilter:sc?'blur(24px)':'none',borderBottom:sc?'1px solid rgba(255,255,255,0.055)':'1px solid transparent',transition:'all 0.35s'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px',height:64,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <a href="/" style={{fontSize:19,fontWeight:900,letterSpacing:-1,color:'#fff',textDecoration:'none'}}>V<span style={{color:BLU}}>·</span>Momentum</a>
          <div className="nav-links" style={{display:'flex',gap:32}}>
            {["Servicios","Stack","Proceso","Efectos"].map(l=>(
              <a key={l} href={l==="Efectos"?"/efectos":`#${l.toLowerCase()}`} style={{fontSize:14,color:SLV2,textDecoration:'none',transition:'color 0.2s'}}
                onMouseEnter={e=>e.currentTarget.style.color='#fff'} onMouseLeave={e=>e.currentTarget.style.color=SLV2}>{l}</a>
            ))}
          </div>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <Magnetic><motion.a href="#contacto" whileHover={{boxShadow:`0 0 32px rgba(26,110,255,0.55)`}} whileTap={{scale:0.97}} style={{display:'block',background:BLU,color:'#fff',fontSize:13,fontWeight:700,padding:'9px 22px',borderRadius:10,textDecoration:'none',boxShadow:`0 0 18px rgba(26,110,255,0.28)`}}>Demo gratis</motion.a></Magnetic>
            <button onClick={()=>setOp(!op)} className="nav-ham" style={{display:'none',background:'none',border:'none',cursor:'pointer',color:'#fff',padding:6}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{op?<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>:<><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}</svg>
            </button>
          </div>
        </div>
      </motion.nav>
      <AnimatePresence>
        {op&&<motion.div initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} style={{position:'fixed',top:64,left:0,right:0,zIndex:199,background:'rgba(7,8,15,0.97)',backdropFilter:'blur(24px)',borderBottom:'1px solid rgba(255,255,255,0.06)',padding:'16px 28px 28px'}}>
          {["Servicios","Stack","Proceso","Efectos","Contacto"].map((l,i)=>(
            <motion.a key={l} href={l==="Efectos"?"/efectos":`#${l.toLowerCase()}`} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}} onClick={()=>setOp(false)} style={{display:'block',padding:'13px 0',fontSize:17,color:SLV,borderBottom:'1px solid rgba(255,255,255,0.04)',textDecoration:'none'}}>{l}</motion.a>
          ))}
        </motion.div>}
      </AnimatePresence>
    </>
  );
}

/* ══ HERO ══ */
function Hero(){
  const {scrollY}=useScroll();
  const bgY=useTransform(scrollY,[0,700],[0,130]);
  const bgOp=useTransform(scrollY,[0,500],[1,0]);
  return(
    <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',position:'relative',overflow:'hidden',paddingTop:100,paddingBottom:100}}>
      <motion.div style={{y:bgY,opacity:bgOp,position:'absolute',inset:0,pointerEvents:'none',zIndex:0}}>
        <div style={{position:'absolute',top:'10%',left:'50%',transform:'translateX(-50%)'}}><Blob color={BLU} size={800} style={{opacity:0.2}}/></div>
        <div style={{position:'absolute',top:'35%',left:'5%'}}><Blob color="#8b5cf6" size={400} style={{opacity:0.13}}/></div>
        <div style={{position:'absolute',top:'30%',right:'3%'}}><Blob color="#06b6d4" size={350} style={{opacity:0.11}}/></div>
        <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(255,255,255,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.028) 1px,transparent 1px)',backgroundSize:'64px 64px'}}/>
        <NoiseBg/>
        <div style={{position:'absolute',bottom:0,left:0,right:0,height:300,background:'linear-gradient(0deg,#07080f 0%,transparent 100%)'}}/>
      </motion.div>
      <div style={{position:'relative',zIndex:1,textAlign:'center',maxWidth:940,padding:'0 28px',width:'100%'}}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.1}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(26,110,255,0.09)',border:'1px solid rgba(26,110,255,0.28)',borderRadius:100,padding:'6px 18px',marginBottom:36}}>
            <motion.div animate={{scale:[1,1.6,1],opacity:[1,0.6,1]}} transition={{repeat:Infinity,duration:2.2}} style={{width:6,height:6,borderRadius:'50%',background:BLU}}/>
            <span style={{fontSize:11,letterSpacing:2.5,textTransform:'uppercase',color:BLU,fontWeight:700}}>Agencia de software premium · CDMX</span>
          </div>
        </motion.div>
        <h1 style={{fontSize:'clamp(38px,6.5vw,82px)',fontWeight:900,letterSpacing:'-0.04em',lineHeight:1.05,color:'#fff',marginBottom:24}}>
          <SplitText text="Tu negocio merece" delay={0.15}/>
          <br/>
          <GradText><SplitText text="tecnología de primer nivel" delay={0.4}/></GradText>
        </h1>
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.5}} style={{fontSize:'clamp(16px,2vw,20px)',color:SLV2,maxWidth:580,margin:'0 auto 48px',lineHeight:1.78,minHeight:'3em'}}>
          <Typewriter texts={["Apps PWA que se instalan como app nativa.","IA nativa integrada a tu operación real.","Automatizaciones que trabajan 24/7.","Bots de WhatsApp que venden solos.","Integraciones con pagos y SAT."]}/>
        </motion.div>
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.65}} style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',marginBottom:80}}>
          <Magnetic><motion.a href="#contacto" whileHover={{boxShadow:`0 0 44px rgba(26,110,255,0.6)`}} whileTap={{scale:0.97}} style={{display:'block',background:BLU,color:'#fff',fontSize:15,fontWeight:700,padding:'15px 36px',borderRadius:12,textDecoration:'none',boxShadow:`0 0 22px rgba(26,110,255,0.32)`}}>Ver mi demo gratis →</motion.a></Magnetic>
          <Magnetic><motion.a href="#proceso" whileHover={{background:'rgba(255,255,255,0.05)'}} whileTap={{scale:0.97}} style={{display:'block',border:'1px solid rgba(221,227,240,0.16)',color:SLV,fontSize:15,fontWeight:500,padding:'15px 36px',borderRadius:12,textDecoration:'none',transition:'background 0.2s'}}>Cómo trabajamos</motion.a></Magnetic>
        </motion.div>
        <ClipReveal delay={0.3}>
          <div style={{display:'flex',justifyContent:'center',gap:'clamp(28px,5vw,72px)',flexWrap:'wrap',paddingTop:36,borderTop:'1px solid rgba(255,255,255,0.06)'}}>
            {[{to:12,suf:'+',lbl:'Apps en producción'},{to:72,suf:'h',lbl:'Demo lista'},{to:40,suf:'+',lbl:'Integraciones'},{to:3,suf:'',lbl:'Etapas claras'}].map((s,i)=>(
              <motion.div key={i} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:0.8+i*0.09}} style={{textAlign:'center'}}>
                <div style={{fontSize:'clamp(26px,3.5vw,42px)',fontWeight:900,color:'#fff',letterSpacing:'-0.04em',lineHeight:1}}><Counter to={s.to} suffix={s.suf}/></div>
                <div style={{fontSize:12,color:SLV3,marginTop:6,letterSpacing:0.4}}>{s.lbl}</div>
              </motion.div>
            ))}
          </div>
        </ClipReveal>
      </div>
      <motion.div animate={{y:[0,10,0]}} transition={{repeat:Infinity,duration:2.4,ease:'easeInOut'}} style={{position:'absolute',bottom:36,left:'50%',transform:'translateX(-50%)',zIndex:1}}>
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none"><rect x="1" y="1" width="20" height="32" rx="10" stroke="rgba(221,227,240,0.18)" strokeWidth="1.5"/><motion.rect animate={{y:[4,16,4]}} transition={{repeat:Infinity,duration:2.4}} x="9" y="5" width="4" height="7" rx="2" fill={BLU}/></svg>
      </motion.div>
    </section>
  );
}

/* ══ LOGOS CON IMÁGENES REALES ══ */
function LogosSection(){
  return(
    <section style={{padding:'52px 0',borderTop:'1px solid rgba(255,255,255,0.045)',borderBottom:'1px solid rgba(255,255,255,0.045)',background:S1,position:'relative',overflow:'hidden'}}>
      <NoiseBg/>
      <FadeUp><p style={{textAlign:'center',fontSize:10,letterSpacing:3.5,textTransform:'uppercase',color:SLV3,marginBottom:32}}>Tecnología que usamos</p></FadeUp>
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        <Marquee items={LOGO_ITEMS} speed={32}/>
        <Marquee items={[...LOGO_ITEMS].reverse()} reverse speed={26}/>
      </div>
    </section>
  );
}

/* ══ SERVICIOS ══ */
const SVCS=[
  {c:BLU,n:"Apps & PWAs",d:"Aplicaciones web progresivas que se instalan como app nativa. Dashboards, portales, ERPs con datos reales.",tags:["Next.js 16","PWA","Móvil-first"],icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>},
  {c:"#8b5cf6",n:"IA & Brains",d:"Agentes con memoria, chatbots, OCR, análisis de documentos. LLMs propios integrados a tu operación.",tags:["Claude","GPT-4o","MCP","RAG"],icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>},
  {c:"#10b981",n:"Automatizaciones",d:"Flujos que hacen el trabajo repetitivo. Notificaciones, reportes, sync entre sistemas, crons automáticos.",tags:["n8n","Webhooks","Crons"],icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>},
  {c:"#f59e0b",n:"Bots & WhatsApp",d:"Bots para WhatsApp, Instagram y web. Atención 24/7, calificación de leads, cobros automatizados.",tags:["WhatsApp API","Twilio","IA nativa"],icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>},
  {c:"#ec4899",n:"Integraciones",d:"Pagos, facturación SAT, CRM, ERP, ecommerce, delivery y logística. Todo conectado en un solo sistema.",tags:["Stripe","MercadoPago","SAT/CFDI"],icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>},
  {c:"#06b6d4",n:"Landings & Video IA",d:"Sitios de venta con video generado por IA. Campañas, redes sociales, contenido que convierte.",tags:["Higgsfield","Video IA","SEO"],icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>},
];
function Servicios(){
  return(
    <section id="servicios" style={{padding:'120px 28px',maxWidth:1200,margin:'0 auto',position:'relative'}}>
      <div style={{position:'absolute',top:'30%',right:'-10%',pointerEvents:'none',opacity:0.15}}><Blob color="#8b5cf6" size={500}/></div>
      <div style={{textAlign:'center',marginBottom:72}}>
        <ClipReveal><span style={{display:'inline-block',background:'rgba(26,110,255,0.08)',border:'1px solid rgba(26,110,255,0.22)',borderRadius:100,padding:'4px 16px',fontSize:11,letterSpacing:2.5,textTransform:'uppercase',color:BLU,marginBottom:20}}>Qué hacemos</span></ClipReveal>
        <h2 style={{fontSize:'clamp(30px,4.5vw,58px)',fontWeight:900,letterSpacing:'-0.04em',color:'#fff',marginBottom:16,lineHeight:1.1}}>
          <SplitText text="Todo lo que necesita" delay={0}/><br/><GradText><SplitText text="tu negocio digital" delay={0.2}/></GradText>
        </h2>
        <ClipReveal delay={0.1}><p style={{fontSize:17,color:SLV2,maxWidth:460,margin:'0 auto'}}>Desde la app hasta la IA. Integraciones reales, no promesas.</p></ClipReveal>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(310px,1fr))',gap:14}}>
        {SVCS.map((s,i)=>(
          <motion.div key={i} initial={{opacity:0,y:24,scale:0.97}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true,margin:'-30px'}} transition={{duration:0.5,delay:i*0.07,ease:[0.22,1,0.36,1]}} style={{height:'100%'}}>
            <TiltCard color={s.c}>
              <div style={{width:42,height:42,borderRadius:10,background:`${s.c}16`,color:s.c,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16}}>{s.icon}</div>
              <h3 style={{fontSize:16,fontWeight:700,color:'#fff',marginBottom:8}}><Scramble text={s.n} color="#fff"/></h3>
              <p style={{fontSize:13,color:SLV2,lineHeight:1.68,marginBottom:16}}>{s.d}</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                {s.tags.map(t=><span key={t} style={{fontSize:11,padding:'3px 10px',borderRadius:100,background:`${s.c}10`,border:`1px solid ${s.c}28`,color:`${s.c}dd`}}>{t}</span>)}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ══ PROCESO ══ */
function Proceso(){
  const steps=[
    {n:"01",name:"Demo gratis",desc:"En 72 horas tienes una app navegable de tu negocio. Sin pagar nada. La ves, la pruebas, decides.",price:"$0 — cero inversión"},
    {n:"02",name:"Integración real",desc:"Firmamos contrato. Conectamos pagos, base de datos, IA y WhatsApp. Tu app funciona con datos reales.",price:"Anticipo al firmar"},
    {n:"03",name:"Entrega & soporte",desc:"Tu equipo aprende a operar. Soporte incluido. Tú manejas el negocio, nosotros la tecnología.",price:"Saldo al aprobar"},
  ];
  return(
    <section id="proceso" style={{padding:'120px 28px',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,transparent,rgba(26,110,255,0.04) 50%,transparent)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:'50%',left:'-5%',transform:'translateY(-50%)',pointerEvents:'none',opacity:0.12}}><Blob color={BLU} size={500}/></div>
      <NoiseBg/>
      <div style={{maxWidth:1100,margin:'0 auto',position:'relative'}}>
        <div style={{textAlign:'center',marginBottom:72}}>
          <ClipReveal><span style={{display:'inline-block',background:'rgba(26,110,255,0.08)',border:'1px solid rgba(26,110,255,0.22)',borderRadius:100,padding:'4px 16px',fontSize:11,letterSpacing:2.5,textTransform:'uppercase',color:BLU,marginBottom:20}}>Cómo trabajamos</span></ClipReveal>
          <h2 style={{fontSize:'clamp(30px,4.5vw,58px)',fontWeight:900,letterSpacing:'-0.04em',color:'#fff',lineHeight:1.1}}>
            <SplitText text="Simple. Transparente." delay={0}/><br/><GradText><SplitText text="Sin sorpresas." delay={0.25}/></GradText>
          </h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))',gap:14}}>
          {steps.map((s,i)=>(
            <motion.div key={i} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-30px'}} transition={{duration:0.5,delay:i*0.12,ease:[0.22,1,0.36,1]}}>
              <GlassCard>
                <div style={{position:'absolute',top:16,right:20,fontSize:88,fontWeight:900,color:'rgba(26,110,255,0.05)',letterSpacing:-6,lineHeight:1,userSelect:'none'}}>{s.n}</div>
                <div style={{fontSize:42,fontWeight:900,color:'rgba(26,110,255,0.22)',letterSpacing:-3,marginBottom:12,lineHeight:1}}>{s.n}</div>
                <motion.div initial={{scaleX:0}} whileInView={{scaleX:1}} viewport={{once:true}} transition={{duration:1.2,ease:'easeInOut'}} style={{height:1.5,background:`linear-gradient(90deg,${BLU},transparent)`,marginBottom:16,transformOrigin:'left'}}/>
                <h3 style={{fontSize:20,fontWeight:700,color:'#fff',marginBottom:12}}>{s.name}</h3>
                <p style={{fontSize:14,color:SLV2,lineHeight:1.72,marginBottom:22}}>{s.desc}</p>
                <span style={{display:'inline-block',background:'rgba(26,110,255,0.10)',border:'1px solid rgba(26,110,255,0.22)',borderRadius:8,padding:'6px 14px',fontSize:12,color:BLU,fontWeight:600}}>{s.price}</span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ STACK — con color real por categoría ══ */
const CATS=[
  {t:"Pagos",col:"#10b981",items:["Stripe","Mercado Pago","OXXO Pay","SPEI / CLABE"]},
  {t:"IA & LLMs",col:"#8b5cf6",items:["Claude (Anthropic)","GPT-4o","Gemini","OpenRouter"]},
  {t:"Comunicación",col:"#f59e0b",items:["WhatsApp API","Twilio SMS","Resend Email","ElevenLabs"]},
  {t:"Automatización",col:BLU,items:["n8n workflows","Agentes MCP","Crons","Make / Zapier"]},
  {t:"Auth & Users",col:"#ec4899",items:["Clerk","Magic links","OAuth Google","Roles & permisos"]},
  {t:"Infra",col:"#06b6d4",items:["Vercel Edge","Neon Postgres","Hetzner VPS","GitHub CI/CD"]},
  {t:"Video & IA",col:"#f97316",items:["Higgsfield AI","GPT Image 2","Seedance Video","Cloudinary"]},
  {t:"SAT & Legal",col:"#84cc16",items:["CFDI 4.0","Facturación XML","Sumsub KYC","Cumplimiento"]},
];
function Stack(){
  return(
    <section id="stack" style={{padding:'120px 28px',position:'relative',background:`linear-gradient(180deg,${BG} 0%,${S2} 50%,${BG} 100%)`,overflow:'hidden'}}>
      <NoiseBg/>
      <div style={{position:'absolute',top:'40%',right:'-8%',pointerEvents:'none',opacity:0.1}}><Blob color="#06b6d4" size={500}/></div>
      <div style={{maxWidth:1200,margin:'0 auto',position:'relative'}}>
        <div style={{textAlign:'center',marginBottom:72}}>
          <ClipReveal><span style={{display:'inline-block',background:'rgba(26,110,255,0.08)',border:'1px solid rgba(26,110,255,0.22)',borderRadius:100,padding:'4px 16px',fontSize:11,letterSpacing:2.5,textTransform:'uppercase',color:BLU,marginBottom:20}}>Ecosistema</span></ClipReveal>
          <h2 style={{fontSize:'clamp(30px,4.5vw,58px)',fontWeight:900,letterSpacing:'-0.04em',color:'#fff',marginBottom:16}}><SplitText text="Conectamos con todo" delay={0}/></h2>
          <ClipReveal><p style={{fontSize:17,color:SLV2,maxWidth:420,margin:'0 auto'}}>Más de 40 servicios y APIs integradas en tu plataforma.</p></ClipReveal>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',gap:12}}>
          {CATS.map((cat,i)=>(
            <motion.div key={i} initial={{opacity:0,y:20,scale:0.96}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true,margin:'-20px'}} transition={{duration:0.42,delay:i*0.06,ease:[0.22,1,0.36,1]}}
              whileHover={{scale:1.04,borderColor:`${cat.col}44`,boxShadow:`0 8px 32px rgba(0,0,0,0.4),0 0 0 1px ${cat.col}18`}}
              style={{background:S1,border:`1px solid ${BD}`,borderRadius:14,padding:'20px 18px',position:'relative',overflow:'hidden',cursor:'default',transition:'border-color 0.2s,box-shadow 0.2s'}}>
              <NoiseBg/>
              <div style={{position:'relative'}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
                  <div style={{width:8,height:8,borderRadius:'50%',background:cat.col,flexShrink:0}}/>
                  <div style={{fontSize:10,letterSpacing:2.5,textTransform:'uppercase',color:cat.col,fontWeight:700,opacity:0.85}}>{cat.t}</div>
                </div>
                {cat.items.map(item=>(
                  <div key={item} style={{display:'flex',alignItems:'center',gap:9,fontSize:13,color:SLV2,marginBottom:9}}>
                    <div style={{width:4,height:4,borderRadius:'50%',background:`${cat.col}88`,flexShrink:0}}/>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ CTA ══ */
function CTAFinal(){
  return(
    <section id="contacto" style={{padding:'120px 28px',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',pointerEvents:'none'}}><Blob color={BLU} size={600} style={{opacity:0.16}}/></div>
      <div style={{position:'absolute',top:'30%',left:'10%',pointerEvents:'none'}}><Blob color="#8b5cf6" size={300} style={{opacity:0.1}}/></div>
      <ClipReveal>
        <div style={{maxWidth:780,margin:'0 auto',position:'relative'}}>
          <GlassCard>
            <div style={{textAlign:'center',padding:'16px 8px'}}>
              <h2 style={{fontSize:'clamp(28px,4vw,56px)',fontWeight:900,letterSpacing:'-0.04em',color:'#fff',marginBottom:16,lineHeight:1.1}}>
                <GradText>¿Listo para ver tu app?</GradText>
              </h2>
              <p style={{fontSize:17,color:SLV2,maxWidth:420,margin:'0 auto 44px',lineHeight:1.75}}>En 72 horas tienes una demo funcional de tu negocio. Sin costo, sin compromiso.</p>
              <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
                <Magnetic><motion.a href="https://wa.me/529984292748?text=Hola,%20quiero%20ver%20mi%20demo%20gratis" target="_blank" rel="noopener" whileHover={{boxShadow:`0 0 48px rgba(26,110,255,0.6)`}} whileTap={{scale:0.97}} style={{display:'block',background:BLU,color:'#fff',fontSize:15,fontWeight:700,padding:'16px 38px',borderRadius:12,textDecoration:'none',boxShadow:`0 0 22px rgba(26,110,255,0.28)`}}>Quiero mi demo gratis</motion.a></Magnetic>
                <Magnetic><motion.a href="https://wa.me/529984292748" target="_blank" rel="noopener" whileHover={{background:'rgba(255,255,255,0.05)'}} whileTap={{scale:0.97}} style={{display:'block',border:'1px solid rgba(221,227,240,0.18)',color:SLV,fontSize:15,padding:'16px 38px',borderRadius:12,textDecoration:'none',transition:'background 0.2s'}}>WhatsApp directo</motion.a></Magnetic>
              </div>
            </div>
          </GlassCard>
        </div>
      </ClipReveal>
    </section>
  );
}

/* ══ FOOTER ══ */
function Footer(){
  return(
    <footer style={{borderTop:'1px solid rgba(255,255,255,0.05)',padding:'32px 28px',background:S1,position:'relative'}}>
      <NoiseBg/>
      <div style={{maxWidth:1200,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16,position:'relative'}}>
        <div style={{fontSize:16,fontWeight:900,letterSpacing:-1,color:'#fff'}}>V<span style={{color:BLU}}>·</span>Momentum</div>
        <div style={{display:'flex',gap:24,flexWrap:'wrap'}}>
          {["Privacidad","Términos","Blog",{label:"Efectos",href:"/efectos"},"Contacto"].map((l,i)=>{
            const label=typeof l==='string'?l:l.label;const href=typeof l==='string'?'#':l.href;
            return <a key={i} href={href} style={{fontSize:12,color:SLV3,textDecoration:'none',transition:'color 0.2s'}} onMouseEnter={e=>e.currentTarget.style.color=SLV2} onMouseLeave={e=>e.currentTarget.style.color=SLV3}>{label}</a>;
          })}
        </div>
        <div style={{fontSize:11,color:'rgba(221,227,240,0.18)'}}>© 2026 All Global Holding LLC · CDMX</div>
      </div>
    </footer>
  );
}

/* ══ PAGE ══ */
export default function Home(){
  return(
    <div style={{background:BG,minHeight:'100vh',color:SLV,fontFamily:"var(--font-geist-sans,'Geist',system-ui,sans-serif)"}}>
      <style>{`
        @media(max-width:768px){.nav-links{display:none!important}.nav-ham{display:flex!important}}
        *{cursor:none!important}
      `}</style>
      <GlobalCursor/>
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
