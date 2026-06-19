import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LFPDPPP / GDPR — V Momentum",
  description: "Cumplimiento con la Ley Federal de Protección de Datos Personales y GDPR.",
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

export default function GDPR(){return(
<div style={S.page}><div style={S.wrap}>
<Link href="/" style={S.back}>← Volver al inicio</Link>
<h1 style={S.h1}>Protección de Datos Personales</h1>
<p style={S.sub}>LFPDPPP (México) y GDPR (Unión Europea) · Última actualización: 19 de junio de 2026</p>

<h2 style={S.h2}>Marco legal mexicano (LFPDPPP)</h2>
<p style={S.p}>V Momentum cumple con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), publicada en el Diario Oficial de la Federación el 5 de julio de 2010, y su Reglamento. Como responsable del tratamiento, garantizamos los principios de licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad.</p>

<h2 style={S.h2}>Derechos ARCO</h2>
<p style={S.p}>De conformidad con la LFPDPPP, usted tiene derecho a: Acceder a sus datos personales; Rectificarlos cuando sean inexactos o incompletos; Cancelar su tratamiento cuando considere que no se requieren para alguna finalidad; y Oponerse al tratamiento de los mismos para fines específicos. Para ejercer estos derechos, envíe su solicitud a luisdelator@vmomentums.info indicando: nombre completo, descripción clara de los datos sobre los que desea ejercer su derecho, y cualquier documento que facilite la localización de sus datos. Responderemos en un plazo máximo de 20 días hábiles.</p>

<h2 style={S.h2}>Marco europeo (GDPR)</h2>
<p style={S.p}>Aunque nuestras operaciones principales se encuentran en México, reconocemos y respetamos los principios del Reglamento General de Protección de Datos (GDPR) de la Unión Europea. Si usted es residente de la UE o del EEE, tiene derechos adicionales que incluyen: derecho de acceso, rectificación, supresión, limitación del tratamiento, portabilidad de datos y oposición.</p>

<h2 style={S.h2}>Base legal del tratamiento</h2>
<p style={S.p}>El tratamiento de datos personales se realiza con base en: (a) el consentimiento del titular; (b) la ejecución de un contrato de prestación de servicios; (c) el cumplimiento de obligaciones legales y fiscales; y (d) el interés legítimo del responsable para la mejora de sus servicios.</p>

<h2 style={S.h2}>Responsable del tratamiento</h2>
<div style={S.addr}>
<strong style={{color:"#fff"}}>Colectivo Mass S.A. de C.V.</strong><br/>
RFC: CMA0803185G0<br/>
Av. Paseo de la Reforma 389, Piso 19<br/>
Col. Juárez, Alcaldía Cuauhtémoc<br/>
Ciudad de México, C.P. 06600, México<br/><br/>
<strong style={{color:"#fff"}}>Contacto DPO:</strong> luisdelator@vmomentums.info
</div>

<h2 style={S.h2}>Documentos relacionados</h2>
<p style={S.p}>
<Link href="/privacidad" style={{color:"#1a6eff"}}>Aviso de Privacidad</Link> · <Link href="/terminos" style={{color:"#1a6eff"}}>Términos y Condiciones</Link> · <Link href="/cookies" style={{color:"#1a6eff"}}>Política de Cookies</Link>
</p>
</div></div>
);}
