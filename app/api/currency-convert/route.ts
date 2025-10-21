import { NextRequest, NextResponse } from 'next/server'

interface ExchangeRateResponse {
  success: boolean
  rates: {
    [key: string]: number
  }
  base: string
  date: string
}

// Cache for exchange rates (valid for 1 hour)
let cachedRates: { rates: { [key: string]: number }, timestamp: number } | null = null
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

async function fetchExchangeRates(): Promise<{ [key: string]: number } | null> {
  // Check cache first
  if (cachedRates && (Date.now() - cachedRates.timestamp < CACHE_DURATION)) {
    return cachedRates.rates
  }

  try {
    // Using exchangerate-api.com (free tier allows 1500 requests per month)
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/USD`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: ExchangeRateResponse = await response.json()
    
    if (data.success !== false && data.rates) {
      // Cache the rates
      cachedRates = {
        rates: data.rates,
        timestamp: Date.now()
      }
      return data.rates
    } else {
      throw new Error('Invalid response from exchange rate API')
    }
  } catch (error) {
    console.error('Error fetching exchange rates:', error)
    // Return fallback rates if API fails
    return {
      TRY: 34.5, // Fallback rate
      USD: 1,
      EUR: 0.85,
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get('from') || 'TRY'
    const to = searchParams.get('to') || 'USD'
    const amount = parseFloat(searchParams.get('amount') || '1')

    if (isNaN(amount)) {
      return NextResponse.json(
        { error: 'Invalid amount parameter' },
        { status: 400 }
      )
    }

    const rates = await fetchExchangeRates()
    
    if (!rates) {
      return NextResponse.json(
        { error: 'Failed to fetch exchange rates' },
        { status: 500 }
      )
    }

    // Convert from base currency (USD) to target currencies
    let convertedAmount: number

    if (from === 'USD' && to !== 'USD') {
      // USD to other currency
      convertedAmount = amount * rates[to]
    } else if (from !== 'USD' && to === 'USD') {
      // Other currency to USD
      convertedAmount = amount / rates[from]
    } else if (from !== 'USD' && to !== 'USD') {
      // Other currency to other currency (via USD)
      const amountInUSD = amount / rates[from]
      convertedAmount = amountInUSD * rates[to]
    } else {
      // USD to USD
      convertedAmount = amount
    }

    return NextResponse.json({
      success: true,
      from,
      to,
      amount,
      convertedAmount: Math.round(convertedAmount * 100) / 100, // Round to 2 decimal places
      rate: from === 'USD' ? rates[to] : (1 / rates[from]),
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Currency conversion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Also support POST requests for batch conversions
export async function POST(request: NextRequest) {
  try {
    const { conversions } = await request.json()
    
    if (!Array.isArray(conversions)) {
      return NextResponse.json(
        { error: 'Invalid request format. Expected array of conversions' },
        { status: 400 }
      )
    }

    const rates = await fetchExchangeRates()
    
    if (!rates) {
      return NextResponse.json(
        { error: 'Failed to fetch exchange rates' },
        { status: 500 }
      )
    }

    const results = conversions.map(({ from = 'TRY', to = 'USD', amount = 1 }) => {
      let convertedAmount: number

      if (from === 'USD' && to !== 'USD') {
        convertedAmount = amount * rates[to]
      } else if (from !== 'USD' && to === 'USD') {
        convertedAmount = amount / rates[from]
      } else if (from !== 'USD' && to !== 'USD') {
        const amountInUSD = amount / rates[from]
        convertedAmount = amountInUSD * rates[to]
      } else {
        convertedAmount = amount
      }

      return {
        from,
        to,
        amount,
        convertedAmount: Math.round(convertedAmount * 100) / 100,
        rate: from === 'USD' ? rates[to] : (1 / rates[from])
      }
    })

    return NextResponse.json({
      success: true,
      results,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Currency conversion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}