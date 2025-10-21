import { NextRequest, NextResponse } from 'next/server'
import { discordNotifications } from '@/lib/discord-notifications'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const eventType = body.event || 'chat:start'

    // Test different event types
    let result = false
    
    switch (eventType) {
      case 'chat:start':
        result = await discordNotifications.notifyChatStart({
          chatId: 'test-chat-123',
          visitorId: 'visitor-456',
          visitor: {
            name: 'Test Kullanıcı'
          },
          page: {
            url: 'https://target-fivem.com'
          }
        })
        break
        
      case 'chat:end':
        result = await discordNotifications.notifyChatEnd({
          chatId: 'test-chat-123',
          duration: 300, // 5 minutes
          messageCount: 12
        })
        break
        
      case 'message:visitor':
        result = await discordNotifications.notifyVisitorMessage({
          chatId: 'test-chat-123',
          visitor: {
            name: 'Test Kullanıcı'
          },
          message: {
            text: 'Merhaba, Target FiveM hakkında bilgi alabilir miyim?',
            type: 'text'
          }
        })
        break
        
      case 'message:agent':
        result = await discordNotifications.notifyAgentMessage({
          chatId: 'test-chat-123',
          agent: {
            id: 'agent-789',
            name: 'Destek Ekibi'
          },
          message: {
            text: 'Tabii ki! Size yardımcı olmaktan memnuniyet duyarız.',
            type: 'text'
          }
        })
        break
        
      case 'visitor:queue':
        result = await discordNotifications.notifyVisitorQueue({
          visitorId: 'visitor-456',
          position: 2,
          estimatedWaitTime: 5
        })
        break
        
      case 'analytics:summary':
        result = await discordNotifications.notifyAnalyticsSummary({
          totalChats: 25,
          activeChats: 3,
          totalMessages: 150,
          averageResponseTime: 45,
          visitorSatisfaction: 4.8,
          topQuestions: ['fiyat', 'tespit', 'güncelleme']
        })
        break
        
      default:
        return NextResponse.json({
          success: false,
          error: 'Unknown event type'
        }, { status: 400 })
    }

    return NextResponse.json({
      success: result,
      message: result ? 'Discord notification sent successfully' : 'Failed to send Discord notification',
      eventType,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Test Discord webhook error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to send test notification',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Discord Test Endpoint',
    availableEvents: [
      'chat:start',
      'chat:end', 
      'message:visitor',
      'message:agent',
      'visitor:queue',
      'analytics:summary'
    ],
    usage: 'POST with {"event": "chat:start"} to test specific events',
    timestamp: new Date().toISOString()
  })
}
