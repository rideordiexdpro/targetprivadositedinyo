"use client"

import { motion } from "framer-motion"
import { Check, Sparkles, Shield, CheckCircle } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { useLanguage } from "@/contexts/LanguageContext"

interface CurrencyRate {
  from: string
  to: string
  amount: number
  convertedAmount: number
  rate: number
}

export function PricingSection() {
  const { t, language } = useLanguage()
  const pricingPlans = useMemo(() => [
    {
      name: language === 'tr' ? 'Aylık' : 'Monthly',
      tryPrice: 2200,
      usdPrice: 50,
      description: language === 'tr' ? '1 aylık erişim' : '1 month access',
      popular: false,
      cta: language === 'tr' ? 'Satın Al' : 'Purchase',
    },
    {
      name: language === 'tr' ? '3 Aylık' : '3 Months',
      tryPrice: 5000,
      usdPrice: 120,
      description: language === 'tr' ? '3 aylık erişim' : '3 months access',
      popular: true,
      cta: language === 'tr' ? 'Satın Al' : 'Purchase',
    },
    {
      name: language === 'tr' ? '6 Aylık' : '6 Months',
      tryPrice: 8000,
      usdPrice: 190,
      description: language === 'tr' ? '6 aylık erişim' : '6 months access',
      popular: false,
      cta: language === 'tr' ? 'Satın Al' : 'Purchase',
    },
    {
      name: language === 'tr' ? 'Lifetime' : 'Lifetime',
      tryPrice: 13000,
      usdPrice: 310,
      description: language === 'tr' ? 'Sınırsız erişim' : 'Unlimited access',
      popular: false,
      cta: language === 'tr' ? 'Satın Al' : 'Purchase',
    },
  ], [language])

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm mb-6"
            style={{background: '#e6ab3b20', borderColor: '#e6ab3b50', border: '1px solid'}}
          >
            <Sparkles className="w-4 h-4" style={{color: '#e6ab3b'}} />
            <span className="text-sm font-medium" style={{color: '#e6ab3b'}}>
              {language === 'tr' ? 'Fiyatlandırma' : 'Pricing'}
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-transparent mb-4" style={{backgroundImage: 'linear-gradient(to right, #e6ab3b, #e6ab3b)', WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
            {language === 'tr' ? 'Gücünü Seç' : 'Choose Your Power'}
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
            {language === 'tr' 
              ? 'İhtiyacına uygun planı seç ve Target 2.0\'ın gücünü keşfet'
              : 'Choose the plan that suits your needs and discover the power of Target 2.0'
            }
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative rounded-2xl p-8 backdrop-blur-sm border transition-all duration-300 ${
                plan.popular
                  ? "bg-black/40 shadow-2xl"
                  : "bg-black/20 hover:bg-black/30"
              }`}
              style={{
                borderColor: plan.popular ? '#e6ab3b50' : 'rgba(255, 255, 255, 0.1)',
                boxShadow: plan.popular ? '0 25px 50px -12px #e6ab3b20' : undefined
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="text-white text-sm font-medium px-4 py-2 rounded-full" style={{background: 'linear-gradient(to right, #e6ab3b, #e6ab3b)'}}>
                    {language === 'tr' ? 'En Popüler' : 'Most Popular'}
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">
                    {language === 'tr' ? `₺${plan.tryPrice.toLocaleString()}` : `$${plan.usdPrice}`}
                  </span>
                </div>
                <p className="text-white/60 text-sm">{plan.description}</p>
              </div>

              <motion.a
                href="https://discord.gg/target"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                  plan.popular
                    ? "text-white shadow-lg"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                }`}
                style={plan.popular ? {
                  background: 'linear-gradient(to right, #e6ab3b, #e6ab3b)',
                  boxShadow: '0 10px 25px -5px #e6ab3b40'
                } : {}}
              >
                {plan.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-4">
            {language === 'tr' 
              ? 'Sorularınız mı var? Size yardımcı olmaktan mutluluk duyarız.'
              : 'Have questions? We\'re here to help you choose the right plan.'
            }
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-medium transition-colors"
            style={{color: '#e6ab3b'}}
            onMouseEnter={(e) => e.currentTarget.style.color = '#d4941f'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#e6ab3b'}
          >
            {language === 'tr' ? 'Discord\'dan İletişime Geç' : 'Contact us on Discord'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
