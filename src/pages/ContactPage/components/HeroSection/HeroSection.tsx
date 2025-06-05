"use client"

import type React from "react"
import { MessageSquare, Phone } from "lucide-react"
import styles from "./HeroSection.module.css"
import type { HeroSectionProps } from "./HeroSection.types"

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, description, onWhatsAppClick, phoneNumber }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.pageTitle}>{title}</h1>
        <p className={styles.pageSubtitle}>{subtitle}</p>
        <p className={styles.pageDescription}>{description}</p>

        <div className={styles.quickActions}>
          <button onClick={onWhatsAppClick} className={styles.whatsappButton}>
            <MessageSquare size={20} />
            WhatsApp
          </button>
          <a href={`tel:${phoneNumber}`} className={styles.callButton}>
            <Phone size={20} />
            Llamar Ahora
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
