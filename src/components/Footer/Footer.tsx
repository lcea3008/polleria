"use client"

import type React from "react"

import { Link } from "react-router-dom"
import { Facebook, Instagram, Phone, Mail, MapPin, Clock, ChefHat, ExternalLink } from "lucide-react"
import styles from "./Footer.module.css"
import type { FooterProps } from "./Footer.types"

// Icono personalizado para TikTok (ya que Lucide no lo tiene)
const TikTokIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-.1z" />
  </svg>
)

const Footer: React.FC<FooterProps> = ({
  brandName = "Pollería Roy's",
  contactInfo = {
    phone: "+51 999 888 777",
    email: "info@polleriaroys.com",
    address: "Av. Principal 123, Lima, Perú",
  },
  businessHours = {
    weekdays: "Lun - Vie: 11:00 AM - 10:00 PM",
    weekends: "Sáb - Dom: 11:00 AM - 11:00 PM",
  },
  socialLinks = [
    {
      name: "Facebook",
      url: "https://facebook.com/polleriaroys",
      icon: "facebook",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/polleriaroys",
      icon: "instagram",
    },
    {
      name: "TikTok",
      url: "https://tiktok.com/@polleriaroys",
      icon: "tiktok",
    },
  ],
  quickLinks = [
    { name: "Inicio", href: "/" },
    { name: "Menú", href: "/productos" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contactanos" },
  ],
  legalLinks = [
    { name: "Términos y Condiciones", href: "/terminos" },
    { name: "Política de Privacidad", href: "/privacidad" },
    { name: "Política de Cookies", href: "/cookies" },
  ],
  
}) => {
  const currentYear = new Date().getFullYear()

  const renderSocialIcon = (iconType: string, size = 24) => {
    switch (iconType) {
      case "facebook":
        return <Facebook size={size} />
      case "instagram":
        return <Instagram size={size} />
      case "tiktok":
        return <TikTokIcon size={size} />
      default:
        return <ExternalLink size={size} />
    }
  }

  

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        {/* Sección principal del footer */}
        <div className={styles.mainContent}>
          {/* Información de la empresa */}
          <div className={styles.section}>
            <div className={styles.brand}>
              <ChefHat size={32} className={styles.brandIcon} />
              <h3 className={styles.brandName}>{brandName}</h3>
            </div>
            <p className={styles.brandDescription}>
              La mejor pollería de la ciudad. Sabor auténtico, ingredientes frescos y la tradición de siempre en cada
              bocado.
            </p>

            {/* Redes sociales */}
            <div className={styles.socialSection}>
              <h4 className={styles.sectionTitle}>Síguenos</h4>
              <div className={styles.socialLinks}>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={`Síguenos en ${social.name}`}
                  >
                    {renderSocialIcon(social.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Enlaces Rápidos</h4>
            <nav className={styles.linksList} aria-label="Enlaces rápidos">
              {quickLinks.map((link) => (
                <Link key={link.href} to={link.href} className={styles.footerLink}>
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Información de contacto */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Contacto</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Phone size={18} />
                <a href={`tel:${contactInfo.phone}`} className={styles.contactLink}>
                  {contactInfo.phone}
                </a>
              </div>
              <div className={styles.contactItem}>
                <Mail size={18} />
                <a href={`mailto:${contactInfo.email}`} className={styles.contactLink}>
                  {contactInfo.email}
                </a>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={18} />
                <span>{contactInfo.address}</span>
              </div>
            </div>

            {/* Horarios */}
            <div className={styles.hoursSection}>
              <h5 className={styles.hoursTitle}>
                <Clock size={18} />
                Horarios de Atención
              </h5>
              <div className={styles.hours}>
                <p>{businessHours.weekdays}</p>
                <p>{businessHours.weekends}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className={styles.divider} />

        {/* Footer inferior */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            <p>
              &copy; {currentYear} {brandName}. Todos los derechos reservados.
            </p>
          </div>

          <nav className={styles.legalLinks} aria-label="Enlaces legales">
            {legalLinks.map((link, index) => (
              <span key={link.href}>
                <Link to={link.href} className={styles.legalLink}>
                  {link.name}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className={styles.separator} aria-hidden="true">
                    {" "}
                    |{" "}
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
