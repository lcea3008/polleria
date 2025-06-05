"use client"

import type React from "react"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Linkedin } from "lucide-react"
import styles from "./ContactInfo.module.css"
import type { ContactInfoProps } from "./ContactInfo.types"

const ContactInfo: React.FC<ContactInfoProps> = ({ contactInfo, onMapClick, onWhatsAppClick }) => {
  return (
    <div className={styles.contactInfoWrapper}>
      <div className={styles.infoCard}>
        <h2 className={styles.infoTitle}>Información de Contacto</h2>
        <p className={styles.infoSubtitle}>Estamos disponibles para atenderte por diferentes medios. ¡Contáctanos!</p>

        <div className={styles.infoItems}>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <MapPin size={24} />
            </div>
            <div className={styles.infoContent}>
              <h3>Dirección</h3>
              <p>{contactInfo.address}</p>
              <button onClick={onMapClick} className={styles.mapButton}>
                Ver en Google Maps
              </button>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <Phone size={24} />
            </div>
            <div className={styles.infoContent}>
              <h3>Teléfono</h3>
              <p>
                <a href={`tel:${contactInfo.phone}`} className={styles.infoLink}>
                  {contactInfo.phone}
                </a>
              </p>
              <p className={styles.infoNote}>También disponible por WhatsApp</p>
              <button onClick={onWhatsAppClick} className={styles.whatsappButton}>
                Contactar por WhatsApp
              </button>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <Mail size={24} />
            </div>
            <div className={styles.infoContent}>
              <h3>Email</h3>
              <p>
                <a href={`mailto:${contactInfo.email}`} className={styles.infoLink}>
                  {contactInfo.email}
                </a>
              </p>
              <p className={styles.infoNote}>Respuesta en 24 horas</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <Clock size={24} />
            </div>
            <div className={styles.infoContent}>
              <h3>Horario de Atención</h3>
              <p>{contactInfo.hours.weekdays}</p>
              <p>{contactInfo.hours.weekends}</p>
              <p className={styles.deliveryHours}>{contactInfo.hours.delivery}</p>
            </div>
          </div>
        </div>

        <div className={styles.socialSection}>
          <h3>Síguenos en Redes Sociales</h3>
          <div className={styles.socialLinks}>
            <a
              href={contactInfo.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              <Instagram size={20} />
              <span>Instagram</span>
            </a>
            <a
              href={contactInfo.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Facebook"
            >
              <Facebook size={20} />
              <span>Facebook</span>
            </a>
            <a
              href={contactInfo.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Twitter"
            >
              <Twitter size={20} />
              <span>Twitter</span>
            </a>
            <a
              href={contactInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo
