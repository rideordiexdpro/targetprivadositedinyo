interface ChatEvent {
  event: string
  chatId?: string
  visitorId?: string
  message?: string
  timestamp: string
  metadata?: Record<string, any>
}

interface ChatAnalytics {
  totalChats: number
  activeChats: number
  totalMessages: number
  averageResponseTime: number
  visitorSatisfaction: number
  topQuestions: string[]
}

class TawkAnalytics {
  private events: ChatEvent[] = []
  private activeChatIds = new Set<string>()

  // Log a new chat event
  logEvent(event: ChatEvent) {
    this.events.push(event)
    
    // Update active chats tracking
    if (event.event === 'chat:start' && event.chatId) {
      this.activeChatIds.add(event.chatId)
    } else if (event.event === 'chat:end' && event.chatId) {
      this.activeChatIds.delete(event.chatId)
    }

    // Keep only last 1000 events to prevent memory issues
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000)
    }

    console.log(`[Tawk Analytics] ${event.event}:`, event)
  }

  // Get analytics summary
  getAnalytics(): ChatAnalytics {
    const chatStartEvents = this.events.filter(e => e.event === 'chat:start')
    const messageEvents = this.events.filter(e => e.event.includes('message'))
    
    return {
      totalChats: chatStartEvents.length,
      activeChats: this.activeChatIds.size,
      totalMessages: messageEvents.length,
      averageResponseTime: this.calculateAverageResponseTime(),
      visitorSatisfaction: this.calculateSatisfactionScore(),
      topQuestions: this.getTopQuestions()
    }
  }

  // Calculate average response time (mock implementation)
  private calculateAverageResponseTime(): number {
    // In a real implementation, you'd calculate time between visitor message and agent response
    return Math.floor(Math.random() * 300) + 30 // 30-330 seconds
  }

  // Calculate satisfaction score (mock implementation)
  private calculateSatisfactionScore(): number {
    // In a real implementation, you'd use actual satisfaction ratings
    return Math.floor(Math.random() * 2) + 4 // 4-5 stars
  }

  // Get most common questions/topics
  private getTopQuestions(): string[] {
    const visitorMessages = this.events
      .filter(e => e.event === 'message:visitor')
      .map(e => e.message)
      .filter(Boolean)

    // Simple keyword extraction (in real app, use NLP)
    const keywords = ['price', 'fiyat', 'detection', 'tespit', 'update', 'güncelleme', 'support', 'destek']
    const questionCounts: Record<string, number> = {}

    visitorMessages.forEach(message => {
      keywords.forEach(keyword => {
        if (message?.toLowerCase().includes(keyword.toLowerCase())) {
          questionCounts[keyword] = (questionCounts[keyword] || 0) + 1
        }
      })
    })

    return Object.entries(questionCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([keyword]) => keyword)
  }

  // Get recent events
  getRecentEvents(limit: number = 10): ChatEvent[] {
    return this.events.slice(-limit).reverse()
  }

  // Export analytics data
  exportData() {
    return {
      analytics: this.getAnalytics(),
      recentEvents: this.getRecentEvents(50),
      exportTime: new Date().toISOString()
    }
  }
}

// Singleton instance
export const tawkAnalytics = new TawkAnalytics()

// Helper functions for webhook processing
export function processChatStart(payload: any) {
  tawkAnalytics.logEvent({
    event: 'chat:start',
    chatId: payload.chatId,
    visitorId: payload.visitorId,
    timestamp: new Date().toISOString(),
    metadata: {
      visitorInfo: payload.visitor,
      page: payload.page
    }
  })

  // Send Discord notification
  import('@/lib/discord-notifications').then(({ discordNotifications }) => {
    discordNotifications.notifyChatStart(payload)
  })
}

export function processChatEnd(payload: any) {
  tawkAnalytics.logEvent({
    event: 'chat:end',
    chatId: payload.chatId,
    timestamp: new Date().toISOString(),
    metadata: {
      duration: payload.duration,
      messageCount: payload.messageCount
    }
  })

  // Send Discord notification
  import('@/lib/discord-notifications').then(({ discordNotifications }) => {
    discordNotifications.notifyChatEnd(payload)
  })
}

export function processVisitorMessage(payload: any) {
  tawkAnalytics.logEvent({
    event: 'message:visitor',
    chatId: payload.chatId,
    message: payload.message?.text,
    timestamp: new Date().toISOString(),
    metadata: {
      messageType: payload.message?.type,
      attachments: payload.message?.attachments
    }
  })

  // Send Discord notification
  import('@/lib/discord-notifications').then(({ discordNotifications }) => {
    discordNotifications.notifyVisitorMessage(payload)
  })
}

export function processAgentMessage(payload: any) {
  tawkAnalytics.logEvent({
    event: 'message:agent',
    chatId: payload.chatId,
    message: payload.message?.text,
    timestamp: new Date().toISOString(),
    metadata: {
      agentId: payload.agent?.id,
      agentName: payload.agent?.name
    }
  })

  // Send Discord notification
  import('@/lib/discord-notifications').then(({ discordNotifications }) => {
    discordNotifications.notifyAgentMessage(payload)
  })
}

export function processVisitorQueue(payload: any) {
  tawkAnalytics.logEvent({
    event: 'visitor:queue',
    visitorId: payload.visitorId,
    timestamp: new Date().toISOString(),
    metadata: {
      queuePosition: payload.position,
      estimatedWaitTime: payload.estimatedWaitTime
    }
  })

  // Send Discord notification
  import('@/lib/discord-notifications').then(({ discordNotifications }) => {
    discordNotifications.notifyVisitorQueue(payload)
  })
}
