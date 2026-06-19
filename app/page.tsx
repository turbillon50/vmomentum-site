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


/* ══ SERVICIOS AIRBNB STYLE ══ */
const SVCS=[
  {c:"#1a6eff",img:"/services/apps.jpg",n:"Apps & PWAs",short:"Instalable como app nativa",d:"Dashboards, portales, ERPs y marketplaces con datos reales. Móvil-first desde el primer día.",tags:["Next.js 16","PWA","Móvil-first"]},
  {c:"#8b5cf6",img:"/services/ia.jpg",n:"IA & Brains",short:"Inteligencia que trabaja por ti",d:"Agentes con memoria, chatbots, OCR, análisis de documentos. LLMs propios integrados.",tags:["Claude","GPT-4o","MCP","RAG"]},
  {c:"#10b981",img:"/services/auto.jpg",n:"Automatizaciones",short:"Tu operación en piloto automático",d:"Flujos que eliminan el trabajo repetitivo. Notificaciones, reportes y sync entre sistemas.",tags:["n8n","Webhooks","Crons"]},
  {c:"#f59e0b",img:"/services/bots.jpg",n:"Bots & WhatsApp",short:"Ventas y soporte 24/7",d:"Bots para WhatsApp, Instagram y web. Calificación de leads y cobros automatizados.",tags:["WhatsApp API","Twilio","IA nativa"]},
  {c:"#ec4899",img:"/services/integ.jpg",n:"Integraciones",short:"Todo conectado en un sistema",d:"Pagos, facturación SAT, CRM, ERP, ecommerce, delivery y logística unificados.",tags:["Stripe","MercadoPago","SAT/CFDI"]},
  {c:"#06b6d4",img:"/services/video.jpg",n:"Landings & Video IA",short:"Presencia digital que convierte",d:"Sitios de venta con video generado por IA. Contenido para campañas y redes sociales.",tags:["Higgsfield","Video IA","SEO"]},
];

function ServiceCard({s,i}:{s:typeof SVCS[0];i:number}){
  const [hov,setHov]=useState(false);
  return(
    <motion.div
      initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
      viewport={{once:true,margin:"-30px"}} transition={{duration:0.55,delay:i*0.08,ease:[0.22,1,0.36,1]}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{position:"relative",borderRadius:20,overflow:"hidden",cursor:"default",
        aspectRatio:"4/3",background:"#0e1018"}}>

      {/* Imagen fotorrealista de fondo */}
      <motion.img
        src={s.img} alt={s.n}
        animate={{scale:hov?1.08:1}}
        transition={{duration:0.55,ease:[0.22,1,0.36,1]}}
        style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block"}}
      />

      {/* Gradiente siempre visible abajo */}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(0deg,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.3) 50%,rgba(0,0,0,0.1) 100%)"}}/>

      {/* Overlay hover con más oscuridad */}
      <motion.div animate={{opacity:hov?1:0}} transition={{duration:0.3}}
        style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${s.c}33,rgba(0,0,0,0.7))`}}/>

      {/* Contenido */}
      <div style={{position:"absolute",inset:0,padding:"24px",display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>

        {/* Badge color siempre visible */}
        <div style={{marginBottom:10}}>
          <span style={{display:"inline-block",background:`${s.c}22`,border:`1px solid ${s.c}55`,borderRadius:100,padding:"3px 12px",fontSize:11,color:s.c,fontWeight:700,backdropFilter:"blur(8px)",letterSpacing:1}}>{s.short}</span>
        </div>

        {/* Título siempre visible */}
        <h3 style={{fontSize:22,fontWeight:900,color:"#fff",marginBottom:6,letterSpacing:"-0.03em",lineHeight:1.1,textShadow:"0 2px 12px rgba(0,0,0,0.8)"}}>
          <Scramble text={s.n} color="#fff"/>
        </h3>

        {/* Descripción — aparece en hover */}
        <motion.div animate={{opacity:hov?1:0,height:hov?"auto":0,marginBottom:hov?12:0}} transition={{duration:0.3}}>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.8)",lineHeight:1.6,marginBottom:10}}>{s.d}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {s.tags.map(t=>(
              <span key={t} style={{fontSize:11,padding:"3px 10px",borderRadius:100,background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",backdropFilter:"blur(8px)"}}>{t}</span>
            ))}
          </div>
        </motion.div>

        {/* CTA hover */}
        <motion.div animate={{opacity:hov?1:0,y:hov?0:10}} transition={{duration:0.3,delay:0.05}}>
          <a href="#contacto" style={{display:"inline-flex",alignItems:"center",gap:6,background:s.c,color:"#fff",fontSize:12,fontWeight:700,padding:"8px 16px",borderRadius:8,textDecoration:"none"}}>
            Ver demo →
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Servicios(){
  return(
    <section id="servicios" style={{padding:"120px 28px",maxWidth:1200,margin:"0 auto",position:"relative"}}>
      <div style={{position:"absolute",top:"30%",right:"-10%",pointerEvents:"none",opacity:0.12}}><Blob color="#8b5cf6" size={500}/></div>
      <div style={{textAlign:"center",marginBottom:72}}>
        <ClipReveal><span style={{display:"inline-block",background:"rgba(26,110,255,0.08)",border:"1px solid rgba(26,110,255,0.22)",borderRadius:100,padding:"4px 16px",fontSize:11,letterSpacing:2.5,textTransform:"uppercase",color:BLU,marginBottom:20}}>Qué hacemos</span></ClipReveal>
        <h2 style={{fontSize:"clamp(30px,4.5vw,58px)",fontWeight:900,letterSpacing:"-0.04em",color:"#fff",marginBottom:16,lineHeight:1.1}}>
          <SplitText text="Todo lo que necesita" delay={0}/><br/><GradText><SplitText text="tu negocio digital" delay={0.2}/></GradText>
        </h2>
        <ClipReveal delay={0.1}><p style={{fontSize:17,color:SLV2,maxWidth:460,margin:"0 auto"}}>Desde la app hasta la IA. Imágenes generadas con IA. Integraciones reales.</p></ClipReveal>
      </div>

      {/* Grid Airbnb 3x2 */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gridTemplateRows:"repeat(2,300px)",gap:16}}>
        {SVCS.map((s,i)=><ServiceCard key={i} s={s} i={i}/>)}
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


/* ══ STACK ══ */
const CATS=[
  {t:"Pagos",col:"#10b981",items:["Stripe","Mercado Pago","OXXO Pay","SPEI / CLABE"]},
  {t:"IA & LLMs",col:"#8b5cf6",items:["Claude (Anthropic)","GPT-4o","Gemini","OpenRouter"]},
  {t:"Comunicación",col:"#f59e0b",items:["WhatsApp API","Twilio SMS","Resend Email","ElevenLabs"]},
  {t:"Automatización",col:"#1a6eff",items:["n8n workflows","Agentes MCP","Crons","Make / Zapier"]},
  {t:"Auth & Users",col:"#ec4899",items:["Clerk","Magic links","OAuth Google","Roles & permisos"]},
  {t:"Infra",col:"#06b6d4",items:["Vercel Edge","Neon Postgres","Hetzner VPS","GitHub CI/CD"]},
  {t:"Video & IA",col:"#f97316",items:["Higgsfield AI","GPT Image 2","Seedance Video","Cloudinary"]},
  {t:"SAT & Legal",col:"#84cc16",items:["CFDI 4.0","Facturación XML","Sumsub KYC","Cumplimiento"]},
];
function Stack(){
  return(
    <section id="stack" style={{padding:"120px 28px",position:"relative",overflow:"hidden",
      background:"linear-gradient(180deg,#07080f 0%,#0a0c18 40%,#07080f 100%)"}}>
      {/* Degradado de color real */}
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 50% at 50% 100%,rgba(26,110,255,0.07) 0%,transparent 100%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"20%",right:"-5%",pointerEvents:"none",opacity:0.08}}><Blob color="#06b6d4" size={500}/></div>
      <div style={{position:"absolute",bottom:"10%",left:"-5%",pointerEvents:"none",opacity:0.06}}><Blob color="#8b5cf6" size={400}/></div>
      <NoiseBg/>
      <div style={{maxWidth:1200,margin:"0 auto",position:"relative"}}>
        <div style={{textAlign:"center",marginBottom:72}}>
          <ClipReveal>
            <span style={{display:"inline-block",background:"rgba(26,110,255,0.08)",border:"1px solid rgba(26,110,255,0.22)",borderRadius:100,padding:"4px 16px",fontSize:11,letterSpacing:2.5,textTransform:"uppercase",color:"#1a6eff",marginBottom:20}}>Ecosistema</span>
          </ClipReveal>
          <h2 style={{fontSize:"clamp(30px,4.5vw,58px)",fontWeight:900,letterSpacing:"-0.04em",color:"#fff",marginBottom:16}}>
            <SplitText text="Conectamos con todo" delay={0}/>
          </h2>
          <ClipReveal><p style={{fontSize:17,color:"rgba(221,227,240,0.58)",maxWidth:420,margin:"0 auto"}}>Más de 40 servicios y APIs integradas en tu plataforma.</p></ClipReveal>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:12}}>
          {CATS.map((cat,i)=>(
            <motion.div key={i}
              initial={{opacity:0,y:20,scale:0.96}} whileInView={{opacity:1,y:0,scale:1}}
              viewport={{once:true,margin:"-20px"}} transition={{duration:0.42,delay:i*0.06,ease:[0.22,1,0.36,1]}}
              whileHover={{scale:1.04,y:-4}}
              style={{background:"#0e1018",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"22px 18px",position:"relative",overflow:"hidden",cursor:"default",transition:"border-color 0.25s,box-shadow 0.25s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=`${cat.col}55`;e.currentTarget.style.boxShadow=`0 12px 40px rgba(0,0,0,0.5),0 0 0 1px ${cat.col}22,inset 0 1px 0 ${cat.col}11`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";e.currentTarget.style.boxShadow="none";}}>
              {/* Top accent line */}
              <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${cat.col},transparent)`,opacity:0.6}}/>
              <NoiseBg/>
              <div style={{position:"relative"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:cat.col,flexShrink:0,boxShadow:`0 0 8px ${cat.col}`}}/>
                  <span style={{fontSize:10,letterSpacing:2.5,textTransform:"uppercase",color:cat.col,fontWeight:700}}>{cat.t}</span>
                </div>
                {cat.items.map(item=>(
                  <div key={item} style={{display:"flex",alignItems:"center",gap:9,fontSize:13,color:"rgba(221,227,240,0.58)",marginBottom:9}}>
                    <div style={{width:4,height:4,borderRadius:"50%",background:`${cat.col}66`,flexShrink:0}}/>
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

/* ══ CTA FINAL ══ */
function CTAFinal(){
  return(
    <section id="contacto" style={{padding:"120px 28px",position:"relative",overflow:"hidden",
      background:"linear-gradient(180deg,#07080f 0%,#080b1a 50%,#07080f 100%)"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 70% at 50% 50%,rgba(26,110,255,0.1) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}><Blob color="#1a6eff" size={700} style={{opacity:0.12}}/></div>
      <div style={{position:"absolute",top:"20%",left:"5%",pointerEvents:"none"}}><Blob color="#8b5cf6" size={350} style={{opacity:0.08}}/></div>
      <div style={{position:"absolute",bottom:"20%",right:"5%",pointerEvents:"none"}}><Blob color="#06b6d4" size={300} style={{opacity:0.07}}/></div>
      <NoiseBg/>
      <ClipReveal>
        <div style={{maxWidth:820,margin:"0 auto",position:"relative"}}>
          <GlassCard>
            <div style={{textAlign:"center",padding:"20px 8px"}}>
              <motion.div initial={{opacity:0,scale:0.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:0.6}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(26,110,255,0.09)",border:"1px solid rgba(26,110,255,0.28)",borderRadius:100,padding:"5px 16px",marginBottom:24}}>
                  <motion.div animate={{scale:[1,1.5,1]}} transition={{repeat:Infinity,duration:2}} style={{width:5,height:5,borderRadius:"50%",background:"#1a6eff"}}/>
                  <span style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:"#1a6eff",fontWeight:700}}>Disponible ahora · CDMX</span>
                </div>
              </motion.div>
              <h2 style={{fontSize:"clamp(28px,4vw,56px)",fontWeight:900,letterSpacing:"-0.04em",color:"#fff",marginBottom:16,lineHeight:1.08}}>
                <GradText>¿Listo para ver tu app?</GradText>
              </h2>
              <p style={{fontSize:17,color:"rgba(221,227,240,0.58)",maxWidth:440,margin:"0 auto 44px",lineHeight:1.75}}>
                En 72 horas tienes una demo funcional de tu negocio. Sin costo, sin compromiso.
              </p>
              <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
                <Magnetic>
                  <motion.a href="https://wa.me/529984292748?text=Hola,%20quiero%20ver%20mi%20demo%20gratis" target="_blank" rel="noopener"
                    whileHover={{boxShadow:"0 0 48px rgba(26,110,255,0.65)",scale:1.03}} whileTap={{scale:0.97}}
                    style={{display:"block",background:"#1a6eff",color:"#fff",fontSize:15,fontWeight:700,padding:"16px 38px",borderRadius:12,textDecoration:"none",boxShadow:"0 0 24px rgba(26,110,255,0.32)"}}>
                    Quiero mi demo gratis →
                  </motion.a>
                </Magnetic>
                <Magnetic>
                  <motion.a href="https://wa.me/529984292748" target="_blank" rel="noopener"
                    whileHover={{background:"rgba(255,255,255,0.06)",scale:1.03}} whileTap={{scale:0.97}}
                    style={{display:"block",border:"1px solid rgba(221,227,240,0.18)",color:"#dde3f0",fontSize:15,padding:"16px 38px",borderRadius:12,textDecoration:"none",backdropFilter:"blur(12px)",transition:"background 0.2s"}}>
                    WhatsApp directo
                  </motion.a>
                </Magnetic>
              </div>
            </div>
          </GlassCard>
        </div>
      </ClipReveal>
    </section>
  );
}

/* ══ FOOTER ESTILO NEON.TECH ══ */
const FOOTER_COLS = [
  {
    title: "Servicios",
    links: [
      {label:"Apps & PWAs",href:"#servicios"},
      {label:"IA & Brains",href:"#servicios"},
      {label:"Automatizaciones",href:"#servicios"},
      {label:"Bots & WhatsApp",href:"#servicios"},
      {label:"Integraciones",href:"#servicios"},
      {label:"Landings & Video IA",href:"#servicios"},
    ]
  },
  {
    title: "Empresa",
    links: [
      {label:"Nosotros",href:"/nosotros"},
      {label:"Blog",href:"/blog"},
      {label:"Casos de éxito",href:"/casos"},
      {label:"Catálogo de efectos",href:"/efectos"},
      {label:"Contacto",href:"#contacto"},
      {label:"Trabaja con nosotros",href:"mailto:luisdelator@vmomentums.info"},
    ]
  },
  {
    title: "Tecnología",
    links: [
      {label:"Stack técnico",href:"#stack"},
      {label:"Proceso",href:"#proceso"},
      {label:"VForge Platform",href:"https://vforge.site"},
      {label:"V Living",href:"#"},
      {label:"All Global Holding",href:"#"},
    ]
  },
  {
    title: "Legal",
    links: [
      {label:"Aviso de Privacidad",href:"/privacidad"},
      {label:"Términos y Condiciones",href:"/terminos"},
      {label:"Política de Cookies",href:"/cookies"},
      {label:"GDPR / LFPDPPP",href:"/gdpr"},
      {label:"Seguridad",href:"/seguridad"},
    ]
  },
];

const SOCIAL = [
  {name:"X / Twitter",href:"https://twitter.com/LuisVmomentums",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>},
  {name:"LinkedIn",href:"https://linkedin.com/in/luis-humberto-de-la-torre-herrera-3499b9414",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},
  {name:"GitHub",href:"https://github.com/turbillon50",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>},
  {name:"WhatsApp",href:"https://wa.me/529984292748",icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>},
];

function Footer(){
  const [status, setStatus] = useState<"online"|"checking">("checking");
  useEffect(()=>{ setTimeout(()=>setStatus("online"),1200); },[]);

  return(
    <footer style={{borderTop:"1px solid rgba(255,255,255,0.06)",background:"#07080f",position:"relative",overflow:"hidden"}}>
      <NoiseBg/>
      {/* Glow sutil arriba */}
      <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:800,height:2,background:"linear-gradient(90deg,transparent,rgba(26,110,255,0.4),transparent)"}}/>

      {/* Cuerpo principal */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:"64px 28px 48px",position:"relative"}}>
        <div style={{display:"grid",gridTemplateColumns:"260px repeat(4,1fr)",gap:48,alignItems:"start"}}>

          {/* Logo + tagline + social */}
          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            <div>
              <div style={{fontSize:22,fontWeight:900,letterSpacing:-1,color:"#fff",marginBottom:6}}>
                V<span style={{color:"#1a6eff"}}>·</span>Momentum
              </div>
              <div style={{fontSize:12,color:"rgba(221,227,240,0.35)",letterSpacing:0.3,lineHeight:1.5}}>
                Agencia de software premium.<br/>CDMX · México.
              </div>
            </div>

            {/* Status indicator */}
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <motion.div
                animate={{opacity:[1,0.4,1]}}
                transition={{repeat:Infinity,duration:2,ease:"easeInOut"}}
                style={{width:7,height:7,borderRadius:"50%",background:status==="online"?"#10b981":"#f59e0b",boxShadow:`0 0 8px ${status==="online"?"#10b981":"#f59e0b"}`}}
              />
              <span style={{fontSize:12,color:"rgba(221,227,240,0.55)"}}>
                {status==="online"?"Todos los sistemas operativos":"Verificando estado..."}
              </span>
            </div>

            {/* Social icons */}
            <div style={{display:"flex",gap:12}}>
              {SOCIAL.map(s=>(
                <motion.a key={s.name} href={s.href} target="_blank" rel="noopener"
                  whileHover={{scale:1.15,color:"#fff"}} whileTap={{scale:0.95}}
                  title={s.name}
                  style={{display:"flex",alignItems:"center",justifyContent:"center",width:34,height:34,borderRadius:8,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(221,227,240,0.45)",textDecoration:"none",transition:"color 0.2s,background 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(26,110,255,0.12)";e.currentTarget.style.borderColor="rgba(26,110,255,0.3)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";}}>
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Columnas de links */}
          {FOOTER_COLS.map((col,ci)=>(
            <div key={ci} style={{display:"flex",flexDirection:"column",gap:20}}>
              <span style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"#fff",fontWeight:700}}>{col.title}</span>
              <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:14}}>
                {col.links.map((link,li)=>(
                  <li key={li}>
                    <a href={link.href}
                      style={{fontSize:14,color:"rgba(221,227,240,0.45)",textDecoration:"none",letterSpacing:"-0.01em",transition:"color 0.2s",display:"block"}}
                      onMouseEnter={e=>e.currentTarget.style.color="#fff"}
                      onMouseLeave={e=>e.currentTarget.style.color="rgba(221,227,240,0.45)"}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{borderTop:"1px solid rgba(255,255,255,0.05)",padding:"20px 28px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{fontSize:12,color:"rgba(221,227,240,0.25)",lineHeight:1.5}}>
            © 2026 All Global Holding LLC. Todos los derechos reservados.
            <span style={{margin:"0 8px",opacity:0.4}}>·</span>
            Colectivo Mass S.A. de C.V. · RFC CMA0803185G0<br/>Av. Paseo de la Reforma 389, Piso 19, Col. Juárez, CDMX, CP 06600
          </div>
          <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
            {[
              {l:"Aviso de Privacidad",h:"/privacidad"},
              {l:"Términos y Condiciones",h:"/terminos"},
              {l:"Política de Cookies",h:"/cookies"},
              {l:"LFPDPPP",h:"/gdpr"},
            ].map(({l,h})=>(
              <a key={l} href={h} style={{fontSize:12,color:"rgba(221,227,240,0.28)",textDecoration:"none",transition:"color 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.color="rgba(221,227,240,0.7)"}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(221,227,240,0.28)"}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══ PAGE ══ */
export default function Home(){
  return(
    <div style={{background:"#07080f",minHeight:"100vh",color:"#dde3f0",fontFamily:"var(--font-geist-sans,'Geist',system-ui,sans-serif)"}}>
      <style>{`
        @media(max-width:768px){
          .nav-links{display:none!important}
          .nav-ham{display:flex!important}
        }
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
