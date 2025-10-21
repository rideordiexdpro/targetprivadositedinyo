import { NextRequest, NextResponse } from 'next/server'

// Basit webhook endpoint - hiçbir doğrulama yok, sadece log
export async function POST(request: NextRequest) {
  try {
    console.log('🚨 DEBUG WEBHOOK - RAW REQUEST')
    console.log('Headers:', Object.fromEntries(request.headers.entries()))
    console.log('URL:', request.url)
    console.log('Method:', request.method)
    
    const body = await request.text()
    console.log('Raw Body:', body)
    
    // JSON parse dene
    try {
      const parsed = JSON.parse(body)
      console.log('Parsed JSON:', JSON.stringify(parsed, null, 2))
    } catch (e) {
      console.log('Not JSON, raw text:', body)
    }
    
    // Her durumda success döndür
    return NextResponse.json({ 
      success: true, 
      message: 'Debug webhook received',
      timestamp: new Date().toISOString(),
      bodyLength: body.length
    })
    
  } catch (error) {
    console.error('Debug webhook error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export async function GET(request: NextRequest) {
  console.log('🚨 DEBUG WEBHOOK - GET REQUEST')
  console.log('Headers:', Object.fromEntries(request.headers.entries()))
  console.log('URL:', request.url)
  
  const { searchParams } = new URL(request.url)
  const challenge = searchParams.get('challenge')
  
  if (challenge) {
    console.log('Challenge received:', challenge)
    return new Response(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    })
  }
  
  return NextResponse.json({
    message: 'Debug Webhook Endpoint',
    status: 'active',
    timestamp: new Date().toISOString()
  })
}
