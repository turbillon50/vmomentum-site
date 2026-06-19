import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Cookies — V Momentum",
  description: "Política de cookies y tecnologías de rastreo de V Momentum.",
};

const S = {
  page:{background:"#07080f",minHeight:"100vh",color:"#dde3f0",fontFamily:"var(--font-geist-sans,system-ui,sans-serif)"} as const,
  wrap:{maxWidth:800,margin:"0 auto",padding:"120px 28px 80px"} as const,
  h1:{fontSize:36,fontWeight:900,letterSpacing:"-0.03em",color:"#fff",marginBottom:8} as const,
  sub:{fontSize:13,color:"rgba(221,227,240,0.4)",marginBottom:48} as const,
  h2:{fontSize:20,fontWeight:700,color:"#fff",marginTop:40,marginBottom:12} as const,
  p:{fontSize:15,color:"rgba(221,227,240,0.65)",lineHeight:1.8,marginBottom:16} as const,
  back:{display:"inline-flex",alignItems:"center",gap:6,fontSize:13,color:"#1a6eff",textDecoration:"none",marginBottom:32} as const,
  tbl:{width:"100%",borderCollapse:"collapse" as const,marginBottom:24,marginTop:8} as const,
  th:{textAlign:"left" as const,fontSize:13,fontWeight:700,color:"#fff",padding:"12px 16px",background:"rgba(26,110,255,0.08)",borderBottom:"1px solid rgba(255,255,255,0.08)"} as const,
  td:{fontSize:14,color:"rgba(221,227,240,0.55)",padding:"12px 16px",borderBottom:"1px solid rgba(255,255,255,0.05)"} as const,
};

export default function Cookies(){return(
<div style={S.page}><div style={S.wrap}>
<Link href="/" style={S.back}>← Volver al inicio</Link>
<h1 style={S.h1}>Política de Cookies</h1>
<p style={S.sub}>Última actualización: 19 de junio de 2026</p>

<h2 style={S.h2}>1. ¿Qué son las cookies?</h2>
<p style={S.p}>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente y para proporcionar información a los propietarios del sitio.</p>

<h2 style={S.h2}>2. Cookies que utilizamos</h2>
<table style={S.tbl}>
<thead><tr><th style={S.th}>Cookie</th><th style={S.th}>Proveedor</th><th style={S.th}>Propósito</th><th style={S.th}>Duración</th></tr></thead>
<tbody>
<tr><td style={S.td}>_ga</td><td style={S.td}>Google Analytics</td><td style={S.td}>Análisis de tráfico web</td><td style={S.td}>2 años</td></tr>
<tr><td style={S.td}>_gcl_au</td><td style={S.td}>Google Ads</td><td style={S.td}>Seguimiento de conversiones publicitarias</td><td style={S.td}>90 días</td></tr>
<tr><td style={S.td}>_gid</td><td style={S.td}>Google Analytics</td><td style={S.td}>Identificación de sesión</td><td style={S.td}>24 horas</td></tr>
</tbody>
</table>

<h2 style={S.h2}>3. Tipos de cookies</h2>
<p style={S.p}><strong style={{color:"#fff"}}>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio web. No pueden ser desactivadas.</p>
<p style={S.p}><strong style={{color:"#fff"}}>Cookies analíticas:</strong> Nos permiten medir y analizar el tráfico de nuestro sitio web para mejorar nuestros servicios.</p>
<p style={S.p}><strong style={{color:"#fff"}}>Cookies publicitarias:</strong> Utilizadas para medir la efectividad de nuestras campañas publicitarias en Google Ads.</p>

<h2 style={S.h2}>4. Cómo gestionar las cookies</h2>
<p style={S.p}>Puede configurar su navegador para rechazar todas las cookies o para que le avise cuando se envía una cookie. Sin embargo, si rechaza las cookies, es posible que algunas funciones del sitio no funcionen correctamente. Cada navegador tiene su propia configuración para gestionar cookies.</p>

<h2 style={S.h2}>5. Más información</h2>
<p style={S.p}>Para más información sobre cómo tratamos sus datos, consulte nuestro <Link href="/privacidad" style={{color:"#1a6eff"}}>Aviso de Privacidad</Link>.</p>
</div></div>
);}
