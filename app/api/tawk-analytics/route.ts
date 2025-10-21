import { NextRequest, NextResponse } from 'next/server'
import { tawkAnalytics } from '@/lib/tawk-analytics'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    switch (action) {
      case 'summary':
        // Get analytics summary
        const analytics = tawkAnalytics.getAnalytics()
        return NextResponse.json({
          success: true,
          data: analytics,
          timestamp: new Date().toISOString()
        })

      case 'events':
        // Get recent events
        const limit = parseInt(searchParams.get('limit') || '20')
        const events = tawkAnalytics.getRecentEvents(limit)
        return NextResponse.json({
          success: true,
          data: events,
          count: events.length,
          timestamp: new Date().toISOString()
        })

      case 'export':
        // Export all data
        const exportData = tawkAnalytics.exportData()
        return NextResponse.json({
          success: true,
          data: exportData,
          timestamp: new Date().toISOString()
        })

      default:
        // Default: return both summary and recent events
        return NextResponse.json({
          success: true,
          data: {
            analytics: tawkAnalytics.getAnalytics(),
            recentEvents: tawkAnalytics.getRecentEvents(10)
          },
          timestamp: new Date().toISOString()
        })
    }

  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch analytics data' 
      }, 
      { status: 500 }
    )
  }
}

// POST endpoint for manual event logging (for testing)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Manual event logging for testing purposes
    tawkAnalytics.logEvent({
      event: body.event || 'manual:test',
      chatId: body.chatId,
      visitorId: body.visitorId,
      message: body.message,
      timestamp: new Date().toISOString(),
      metadata: body.metadata || { source: 'manual' }
    })

    return NextResponse.json({
      success: true,
      message: 'Event logged successfully',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Manual event logging error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to log event' 
      }, 
      { status: 500 }
    )
  }
}
