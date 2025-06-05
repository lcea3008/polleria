"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import styles from "./FaqSection.module.css"
import type { FaqSectionProps } from "./FaqSection.types"

const FaqSection: React.FC<FaqSectionProps> = ({ faqs, onContactClick }) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <section className={styles.faqSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Preguntas Frecuentes</h2>
        <p className={styles.sectionDescription}>
          Encuentra respuestas rápidas a las preguntas más comunes sobre nuestros servicios.
        </p>
      </div>

      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <button
              className={`${styles.faqQuestion} ${expandedFaq === index ? styles.faqQuestionActive : ""}`}
              onClick={() => toggleFaq(index)}
              aria-expanded={expandedFaq === index}
            >
              <span>{faq.question}</span>
              {expandedFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            <div className={`${styles.faqAnswer} ${expandedFaq === index ? styles.faqAnswerOpen : ""}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.faqCta}>
        <p>¿No encontraste la respuesta que buscabas?</p>
        <button onClick={onContactClick} className={styles.faqCtaButton}>
          Contáctanos por WhatsApp
        </button>
      </div>
    </section>
  )
}

export default FaqSection
