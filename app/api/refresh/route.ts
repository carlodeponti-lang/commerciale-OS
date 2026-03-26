import { NextResponse } from 'next/server';

export async function GET() {
  // Endpoint per simulare un refresh dati
  // In futuro: connessione a Supabase per dati reali
  const timestamp = new Date().toISOString();
  
  return NextResponse.json({
    success: true,
    message: 'Dati aggiornati con successo',
    timestamp,
    data: {
      tasks: [],
      contacts: [],
      clients: [],
      events: [],
    }
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  
  return NextResponse.json({
    success: true,
    message: 'Dato salvato',
    received: body,
    timestamp: new Date().toISOString(),
  });
}
