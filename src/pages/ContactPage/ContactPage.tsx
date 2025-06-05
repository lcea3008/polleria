"use client"

import type React from "react"
import styles from "./ContactPage.module.css"
import type { ContactPageProps } from "./ContactPage.types"
import { contactInfo, faqs } from "./data/contactData"
import { openWhatsApp, openGoogleMaps, submitContactForm } from "./utils/contactHelpers"

// Componentes
import HeroSection from "./components/HeroSection"
import ContactForm from "./components/ContactForm"
import ContactInfo from "./components/ContactInfo"
import MapComponent from "./components/MapComponent"
import FaqSection from "./components/FaqSection"

const ContactPage: React.FC<ContactPageProps> = ({
  title = "Contáctanos",
  subtitle = "Estamos aquí para ayudarte",
  description = "¿Tienes alguna pregunta, sugerencia o comentario? Completa el formulario y nos pondremos en contacto contigo lo antes posible.",
}) => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hola, me gustaría hacer una consulta sobre Pollería Roy's")
    openWhatsApp(contactInfo.whatsapp, message)
  }

  const handleMapClick = () => {
    openGoogleMaps(contactInfo.coordinates, contactInfo.address)
  }

  const handleFormSubmit = async (formData: any) => {
    return submitContactForm(formData)
  }

  return (
    <main className={styles.contactPage}>
      {/* Hero Section */}
      <HeroSection
        title={title}
        subtitle={subtitle}
        description={description}
        onWhatsAppClick={handleWhatsAppClick}
        phoneNumber={contactInfo.phone}
      />

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            {/* Información de contacto */}
            <div className={styles.contactInfo}>
              <ContactInfo
                contactInfo={contactInfo}
                onMapClick={handleMapClick}
                onWhatsAppClick={handleWhatsAppClick}
              />
              <MapComponent onClick={handleMapClick} />
            </div>

            {/* Formulario de contacto */}
            <div className={styles.contactForm}>
              <ContactForm onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection faqs={faqs} onContactClick={handleWhatsAppClick} />
    </main>
  )
}

export default ContactPage
