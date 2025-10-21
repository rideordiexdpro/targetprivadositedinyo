import { NextRequest, NextResponse } from 'next/server'
import { 
  processChatStart, 
  processChatEnd, 
  processVisitorMessage, 
  processAgentMessage, 
  processVisitorQueue,
  tawkAnalytics 
} from '@/lib/tawk-analytics'

const WEBHOOK_SECRET = '731eb303128e3eeab79d3585be5ac89155c90baf1a3e59c51a85527852353d534a651877c4333cbd9650fae6155b5512'

export async function POST(request: NextRequest) {
  try {
    console.log('🔥 WEBHOOK RECEIVED! Headers:', Object.fromEntries(request.headers.entries()))
    
    // Get raw body
    const body = await request.text()
    console.log('🔥 WEBHOOK BODY:', body)
    
    // Try to parse JSON
    let payload
    try {
      payload = JSON.parse(body)
    } catch (e) {
      console.log('❌ JSON Parse Error:', e)
      payload = { raw: body }
    }
    
    console.log('Tawk.to Webhook received:', {
      event: payload.event,
      time: new Date().toISOString(),
      data: payload
    })

    // Handle different webhook events with analytics
    switch (payload.event) {
      case 'chat:start':
        console.log('New chat started:', payload.chatId)
        processChatStart(payload)
        break
        
      case 'chat:end':
        console.log('Chat ended:', payload.chatId)
        processChatEnd(payload)
        break
        
      case 'message:visitor':
        console.log('Visitor message:', payload.message)
        processVisitorMessage(payload)
        break
        
      case 'message:agent':
        console.log('Agent message:', payload.message)
        processAgentMessage(payload)
        break
        
      case 'visitor:queue':
        console.log('Visitor queued:', payload.visitorId)
        processVisitorQueue(payload)
        break
        
      default:
        console.log('Unknown webhook event:', payload.event)
        // Log unknown events for debugging
        tawkAnalytics.logEvent({
          event: payload.event,
          timestamp: new Date().toISOString(),
          metadata: payload
        })
    }

    // You can add custom logic here, such as:
    // - Logging to database
    // - Sending notifications
    // - Integrating with other services
    // - Analytics tracking

    return NextResponse.json({ 
      success: true, 
      message: 'Webhook processed successfully',
      event: payload.event 
    })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' }, 
      { status: 500 }
    )
  }
}

// Handle GET requests (for webhook verification)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const challenge = searchParams.get('challenge')
  
  if (challenge) {
    // Tawk.to webhook verification
    return new Response(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    })
  }
  
  return NextResponse.json({ 
    message: 'Tawk.to Webhook Endpoint',
    status: 'active',
    timestamp: new Date().toISOString()
  })
}
