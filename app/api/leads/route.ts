import { NextRequest, NextResponse } from "next/server";

const BAILEYS_URL = "http://178.105.135.26:3003/lead";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, empresa, giro, mensaje } = body;
    if (!nombre || nombre.length < 2) {
      return NextResponse.json({ ok: false, error: "Nombre requerido" }, { status: 400 });
    }
    const res = await fetch(BAILEYS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, empresa, giro, mensaje, fuente: "vmomentum.site", servicio: giro || "App/PWA" }),
    });
    if (res.ok) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false }, { status: 500 });
  } catch (err) {
    console.error("leads error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
