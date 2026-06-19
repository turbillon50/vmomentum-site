import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones — V Momentum",
  description: "Términos y condiciones de uso de los servicios de V Momentum.",
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

export default function Terminos(){return(
<div style={S.page}><div style={S.wrap}>
<Link href="/" style={S.back}>← Volver al inicio</Link>
<h1 style={S.h1}>Términos y Condiciones</h1>
<p style={S.sub}>Última actualización: 19 de junio de 2026</p>

<h2 style={S.h2}>1. Identificación del prestador</h2>
<p style={S.p}>Los servicios son prestados por V Momentum, marca comercial operada por Colectivo Mass S.A. de C.V. (RFC: CMA0803185G0) y All Global Holding LLC.</p>
<div style={S.addr}>
<strong style={{color:"#fff"}}>Domicilio fiscal:</strong><br/>
Av. Paseo de la Reforma 389, Piso 19<br/>
Col. Juárez, Alcaldía Cuauhtémoc<br/>
Ciudad de México, C.P. 06600, México<br/><br/>
<strong style={{color:"#fff"}}>Contacto:</strong> luisdelator@vmomentums.info
</div>

<h2 style={S.h2}>2. Objeto</h2>
<p style={S.p}>Estos términos regulan el acceso y uso de los servicios de desarrollo de software, aplicaciones web progresivas (PWAs), automatizaciones, integraciones y servicios relacionados ofrecidos por V Momentum.</p>

<h2 style={S.h2}>3. Servicios</h2>
<p style={S.p}>V Momentum ofrece servicios de diseño y desarrollo de aplicaciones web, incluyendo pero no limitado a: desarrollo de PWAs, integración de inteligencia artificial, automatización de procesos, desarrollo de bots y sistemas de mensajería, diseño de interfaces, y consultoría tecnológica.</p>

<h2 style={S.h2}>4. Proceso de contratación</h2>
<p style={S.p}>La contratación de servicios se formaliza mediante un contrato de prestación de servicios que establece el alcance, entregables, cronograma y condiciones de pago. El cliente recibirá una demo funcional gratuita antes de formalizar cualquier compromiso económico.</p>

<h2 style={S.h2}>5. Propiedad intelectual</h2>
<p style={S.p}>Una vez liquidado el pago total del proyecto, el cliente recibe la propiedad del código fuente y los activos digitales desarrollados específicamente para su proyecto. V Momentum retiene los derechos sobre sus herramientas internas, frameworks propietarios y componentes reutilizables.</p>

<h2 style={S.h2}>6. Confidencialidad</h2>
<p style={S.p}>Ambas partes se comprometen a mantener la confidencialidad de la información intercambiada durante la prestación de servicios. Esta obligación subsiste incluso después de la terminación de la relación comercial.</p>

<h2 style={S.h2}>7. Limitación de responsabilidad</h2>
<p style={S.p}>V Momentum no será responsable por daños indirectos, incidentales o consecuentes derivados del uso del software desarrollado. La responsabilidad máxima se limita al monto total pagado por el cliente por el servicio en cuestión.</p>

<h2 style={S.h2}>8. Cancelación</h2>
<p style={S.p}>El cliente puede cancelar el servicio en cualquier momento notificando por escrito. Los pagos realizados por trabajo completado no son reembolsables. V Momentum entregará todo el trabajo realizado hasta la fecha de cancelación.</p>

<h2 style={S.h2}>9. Legislación aplicable</h2>
<p style={S.p}>Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia, las partes se someten a la jurisdicción de los tribunales competentes de la Ciudad de México.</p>

<h2 style={S.h2}>10. Modificaciones</h2>
<p style={S.p}>V Momentum se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor al momento de su publicación en esta página.</p>
</div></div>
);}
