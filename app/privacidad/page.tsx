import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso de Privacidad — V Momentum",
  description: "Aviso de privacidad y protección de datos personales de V Momentum.",
};

const S = {
  page:{background:"#07080f",minHeight:"100vh",color:"#dde3f0",fontFamily:"var(--font-geist-sans,system-ui,sans-serif)"} as const,
  wrap:{maxWidth:800,margin:"0 auto",padding:"120px 28px 80px"} as const,
  h1:{fontSize:36,fontWeight:900,letterSpacing:"-0.03em",color:"#fff",marginBottom:8} as const,
  sub:{fontSize:13,color:"rgba(221,227,240,0.4)",marginBottom:48} as const,
  h2:{fontSize:20,fontWeight:700,color:"#fff",marginTop:40,marginBottom:12} as const,
  p:{fontSize:15,color:"rgba(221,227,240,0.65)",lineHeight:1.8,marginBottom:16} as const,
  back:{display:"inline-flex",alignItems:"center",gap:6,fontSize:13,color:"#1a6eff",textDecoration:"none",marginBottom:32} as const,
  addr:{fontSize:14,color:"rgba(221,227,240,0.55)",lineHeight:1.7,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"20px 24px",marginTop:8,marginBottom:16} as const,
};

export default function Privacidad(){return(
<div style={S.page}><div style={S.wrap}>
<Link href="/" style={S.back}>← Volver al inicio</Link>
<h1 style={S.h1}>Aviso de Privacidad</h1>
<p style={S.sub}>Última actualización: 19 de junio de 2026</p>

<h2 style={S.h2}>1. Responsable del tratamiento</h2>
<p style={S.p}>V Momentum, operado por Colectivo Mass S.A. de C.V. (RFC: CMA0803185G0) y All Global Holding LLC, es responsable del tratamiento de sus datos personales.</p>
<div style={S.addr}>
<strong style={{color:"#fff"}}>Domicilio:</strong><br/>
Av. Paseo de la Reforma 389, Piso 19<br/>
Col. Juárez, Alcaldía Cuauhtémoc<br/>
Ciudad de México, C.P. 06600, México<br/><br/>
<strong style={{color:"#fff"}}>Contacto:</strong> luisdelator@vmomentums.info
</div>

<h2 style={S.h2}>2. Datos personales que recopilamos</h2>
<p style={S.p}>Recopilamos los siguientes datos personales: nombre completo, correo electrónico, número de teléfono, nombre de la empresa, y cualquier información que usted proporcione voluntariamente a través de nuestros formularios de contacto, WhatsApp, o correo electrónico.</p>

<h2 style={S.h2}>3. Finalidades del tratamiento</h2>
<p style={S.p}>Sus datos personales serán utilizados para: (a) responder a solicitudes de información y cotizaciones; (b) elaborar y enviar propuestas comerciales; (c) prestar los servicios de desarrollo de software contratados; (d) enviar comunicaciones relacionadas con nuestros servicios; (e) cumplir con obligaciones legales y fiscales aplicables.</p>

<h2 style={S.h2}>4. Transferencia de datos</h2>
<p style={S.p}>No compartimos, vendemos ni transferimos sus datos personales a terceros, salvo cuando sea necesario para cumplir con obligaciones legales o contractuales (por ejemplo, servicios de hosting, procesadores de pago, o autoridades fiscales).</p>

<h2 style={S.h2}>5. Derechos ARCO</h2>
<p style={S.p}>Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales (derechos ARCO), así como a revocar su consentimiento. Para ejercer estos derechos, envíe un correo a luisdelator@vmomentums.info con el asunto &quot;Derechos ARCO&quot;.</p>

<h2 style={S.h2}>6. Cookies y tecnologías de rastreo</h2>
<p style={S.p}>Utilizamos cookies y tecnologías similares (incluyendo Google Ads y Google Analytics) para mejorar la experiencia del usuario y medir el rendimiento de nuestras campañas publicitarias. Puede consultar nuestra <Link href="/cookies" style={{color:"#1a6eff"}}>Política de Cookies</Link> para más detalles.</p>

<h2 style={S.h2}>7. Cambios al aviso de privacidad</h2>
<p style={S.p}>Nos reservamos el derecho de modificar este aviso de privacidad en cualquier momento. Las modificaciones serán publicadas en esta página con la fecha de actualización correspondiente.</p>

<h2 style={S.h2}>8. Legislación aplicable</h2>
<p style={S.p}>Este aviso de privacidad se rige por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento, así como por las disposiciones aplicables del Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI).</p>
</div></div>
);}
