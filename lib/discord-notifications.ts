interface DiscordEmbed {
  title: string
  description?: string
  color: number
  fields?: Array<{
    name: string
    value: string
    inline?: boolean
  }>
  timestamp?: string
  footer?: {
    text: string
    icon_url?: string
  }
}

interface DiscordWebhookPayload {
  content?: string
  embeds?: DiscordEmbed[]
  username?: string
  avatar_url?: string
}

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1423400689606066196/QKAVvhYtQ_KBayR827RHkhg7-5UQC0kD6AtTa83UK00L5bFNQwUXxwBGFnMBosXbOyEo'

class DiscordNotifications {
  private webhookUrl: string

  constructor(webhookUrl: string = DISCORD_WEBHOOK_URL) {
    this.webhookUrl = webhookUrl
  }

  async sendNotification(payload: DiscordWebhookPayload): Promise<boolean> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        console.error('Discord webhook failed:', response.status, response.statusText)
        return false
      }

      console.log('Discord notification sent successfully')
      return true
    } catch (error) {
      console.error('Discord webhook error:', error)
      return false
    }
  }

  async notifyChatStart(payload: any) {
    const embed: DiscordEmbed = {
      title: '🟢 Yeni Sohbet Başladı',
      description: 'Bir ziyaretçi canlı destek sohbeti başlattı',
      color: 0x00ff00, // Green
      fields: [
        {
          name: '💬 Chat ID',
          value: payload.chatId || 'Bilinmiyor',
          inline: true
        },
        {
          name: '👤 Ziyaretçi',
          value: payload.visitor?.name || 'Anonim',
          inline: true
        },
        {
          name: '🌐 Sayfa',
          value: payload.page?.url || 'Bilinmiyor',
          inline: false
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Target FiveM - Canlı Destek',
        icon_url: 'https://cdn.discordapp.com/emojis/1234567890123456789.png'
      }
    }

    return this.sendNotification({
      username: 'Target Support Bot',
      embeds: [embed]
    })
  }

  async notifyChatEnd(payload: any) {
    const embed: DiscordEmbed = {
      title: '🔴 Sohbet Sonlandı',
      description: 'Bir canlı destek sohbeti tamamlandı',
      color: 0xff0000, // Red
      fields: [
        {
          name: '💬 Chat ID',
          value: payload.chatId || 'Bilinmiyor',
          inline: true
        },
        {
          name: '⏱️ Süre',
          value: payload.duration ? `${Math.round(payload.duration / 60)} dakika` : 'Bilinmiyor',
          inline: true
        },
        {
          name: '📝 Mesaj Sayısı',
          value: payload.messageCount?.toString() || 'Bilinmiyor',
          inline: true
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Target FiveM - Canlı Destek'
      }
    }

    return this.sendNotification({
      username: 'Target Support Bot',
      embeds: [embed]
    })
  }

  async notifyVisitorMessage(payload: any) {
    const message = payload.message?.text || 'Mesaj içeriği alınamadı'
    const truncatedMessage = message.length > 100 ? message.substring(0, 100) + '...' : message

    const embed: DiscordEmbed = {
      title: '💬 Yeni Ziyaretçi Mesajı',
      description: `**Mesaj:** ${truncatedMessage}`,
      color: 0x3498db, // Blue
      fields: [
        {
          name: '💬 Chat ID',
          value: payload.chatId || 'Bilinmiyor',
          inline: true
        },
        {
          name: '👤 Ziyaretçi',
          value: payload.visitor?.name || 'Anonim',
          inline: true
        },
        {
          name: '📱 Mesaj Tipi',
          value: payload.message?.type || 'text',
          inline: true
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Target FiveM - Canlı Destek'
      }
    }

    return this.sendNotification({
      username: 'Target Support Bot',
      embeds: [embed]
    })
  }

  async notifyAgentMessage(payload: any) {
    const message = payload.message?.text || 'Mesaj içeriği alınamadı'
    const truncatedMessage = message.length > 100 ? message.substring(0, 100) + '...' : message

    const embed: DiscordEmbed = {
      title: '👨‍💼 Operatör Yanıtı',
      description: `**Yanıt:** ${truncatedMessage}`,
      color: 0xe67e22, // Orange
      fields: [
        {
          name: '💬 Chat ID',
          value: payload.chatId || 'Bilinmiyor',
          inline: true
        },
        {
          name: '👨‍💼 Operatör',
          value: payload.agent?.name || 'Bilinmiyor',
          inline: true
        },
        {
          name: '🆔 Agent ID',
          value: payload.agent?.id || 'Bilinmiyor',
          inline: true
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Target FiveM - Canlı Destek'
      }
    }

    return this.sendNotification({
      username: 'Target Support Bot',
      embeds: [embed]
    })
  }

  async notifyVisitorQueue(payload: any) {
    const embed: DiscordEmbed = {
      title: '⏳ Ziyaretçi Kuyrukta',
      description: 'Bir ziyaretçi destek kuyruğuna eklendi',
      color: 0xf39c12, // Yellow
      fields: [
        {
          name: '👤 Ziyaretçi ID',
          value: payload.visitorId || 'Bilinmiyor',
          inline: true
        },
        {
          name: '📍 Kuyruk Pozisyonu',
          value: payload.position?.toString() || 'Bilinmiyor',
          inline: true
        },
        {
          name: '⏱️ Tahmini Bekleme',
          value: payload.estimatedWaitTime ? `${payload.estimatedWaitTime} dakika` : 'Bilinmiyor',
          inline: true
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Target FiveM - Canlı Destek'
      }
    }

    return this.sendNotification({
      username: 'Target Support Bot',
      embeds: [embed]
    })
  }

  async notifyAnalyticsSummary(analytics: any) {
    const embed: DiscordEmbed = {
      title: '📊 Günlük Destek Özeti',
      description: 'Canlı destek istatistikleri',
      color: 0x9b59b6, // Purple
      fields: [
        {
          name: '💬 Toplam Sohbet',
          value: analytics.totalChats?.toString() || '0',
          inline: true
        },
        {
          name: '🟢 Aktif Sohbet',
          value: analytics.activeChats?.toString() || '0',
          inline: true
        },
        {
          name: '📝 Toplam Mesaj',
          value: analytics.totalMessages?.toString() || '0',
          inline: true
        },
        {
          name: '⏱️ Ort. Yanıt Süresi',
          value: `${analytics.averageResponseTime || 0} saniye`,
          inline: true
        },
        {
          name: '⭐ Memnuniyet',
          value: `${analytics.visitorSatisfaction || 0}/5`,
          inline: true
        },
        {
          name: '🔥 Popüler Konular',
          value: analytics.topQuestions?.join(', ') || 'Veri yok',
          inline: false
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Target FiveM - Günlük Rapor'
      }
    }

    return this.sendNotification({
      username: 'Target Analytics Bot',
      embeds: [embed]
    })
  }
}

export const discordNotifications = new DiscordNotifications()
