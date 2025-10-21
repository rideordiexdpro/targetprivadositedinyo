"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const { t } = useLanguage()

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? [] : [index]))
  }

  const faqs = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1'),
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2'),
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3'),
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4'),
    },
    {
      question: t('faq.q5'),
      answer: t('faq.a5'),
    },
  ]

  return (
    <section id="faq" className="relative overflow-hidden pb-120 pt-24">
      {/* Background blur effects */}
      <div className="absolute top-1/2 -right-20 z-[-1] h-64 w-64 rounded-full opacity-80 blur-3xl" style={{background: '#e6ab3b33'}}></div>
      <div className="absolute top-1/2 -left-20 z-[-1] h-64 w-64 rounded-full opacity-80 blur-3xl" style={{background: '#e6ab3b33'}}></div>

      <div className="z-10 container mx-auto px-4">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 uppercase" style={{borderColor: '#e6ab3b66', color: '#e6ab3b'}}>
            <span>✶</span>
            <span className="text-sm">{t('faq.badge')}</span>
          </div>
        </motion.div>

        <motion.h2
          className="mx-auto mt-6 max-w-xl text-center text-4xl font-medium md:text-[54px] md:leading-[60px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t('faq.title').split(' ').slice(0, -3).join(' ')}{" "}
          <span className="text-transparent" style={{backgroundImage: 'linear-gradient(to bottom, #e6ab3b, #e6ab3b, #e6ab3b)', WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
            {t('faq.title').split(' ').slice(-3).join(' ')}
          </span>
        </motion.h2>

        <div className="mx-auto mt-12 flex max-w-xl flex-col gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl transition-all duration-300 cursor-pointer hover:bg-black/50"
              style={{'--hover-border': '#e6ab3b50'} as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#e6ab3b50'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleItem(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  toggleItem(index)
                }
              }}
              {...(index === faqs.length - 1 && { "data-faq": faq.question })}
            >
              <div className="flex items-start justify-between">
                <h3 className="m-0 font-medium pr-4">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className=""
                >
                  {openItems.includes(index) ? (
                    <Minus className="flex-shrink-0 transition duration-300" style={{color: '#e6ab3b'}} size={24} />
                  ) : (
                    <Plus className="flex-shrink-0 transition duration-300" style={{color: '#e6ab3b'}} size={24} />
                  )}
                </motion.div>
              </div>
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    className="mt-4 text-muted-foreground leading-relaxed overflow-hidden"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                      opacity: { duration: 0.2 },
                    }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
