"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Send,
  User,
  MessageSquare,
  Calendar,
  Users,
  Utensils,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import styles from "./ContactPage.module.css"
import type { ContactPageProps, FAQ } from "./ContactPage.types"

const ContactPage: React.FC<ContactPageProps> = ({
  title = "Contáctanos",
  subtitle = "Estamos aquí para ayudarte",
  description = "¿Tienes alguna pregunta, sugerencia o comentario? Completa el formulario y nos pondremos en contacto contigo lo antes posible.",
}) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    requestType: "general",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const formRef = useRef<HTMLFormElement>(null)

  // Datos de contacto
  const contactInfo = {
    address: "Av. Principal 123, Oxapampa, Pasco, Perú",
    phone: "+51 999 888 777",
    whatsapp: "+51 999 888 777",
    email: "info@polleriaroys.com",
    hours: {
      weekdays: "Lunes a Viernes: 11:00 AM - 10:00 PM",
      weekends: "Sábados y Domingos: 11:00 AM - 11:00 PM",
      delivery: "Delivery hasta las 11:00 PM todos los días",
    },
    social: {
      instagram: "https://instagram.com/polleriaroys",
      facebook: "https://facebook.com/polleriaroys",
      twitter: "https://twitter.com/polleriaroys",
      linkedin: "https://linkedin.com/company/polleriaroys",
    },
  }

  // Tipos de solicitud
  const requestTypes = [
    { value: "general", label: "Consulta General", icon: <MessageSquare size={16} /> },
    { value: "reservation", label: "Reservación", icon: <Calendar size={16} /> },
    { value: "catering", label: "Catering/Eventos", icon: <Users size={16} /> },
    { value: "delivery", label: "Delivery", icon: <Utensils size={16} /> },
    { value: "complaint", label: "Reclamo/Sugerencia", icon: <AlertCircle size={16} /> },
  ]

  // Preguntas frecuentes mejoradas
  const faqs: FAQ[] = [
    {
      question: "¿Realizan delivery a domicilio?",
      answer:
        "Sí, contamos con servicio de delivery propio que cubre toda la ciudad de Oxapampa y zonas aledañas. El tiempo de entrega varía entre 30-45 minutos dependiendo de la zona. Puedes hacer tu pedido llamando a nuestro número de teléfono, por WhatsApp o a través de nuestra página web. El costo de delivery es de S/ 5.00 dentro de la ciudad.",
    },
    {
      question: "¿Cuál es el horario de atención?",
      answer:
        "Nuestro horario de atención en el local es de lunes a viernes de 11:00 AM a 10:00 PM, y los fines de semana (sábados y domingos) de 11:00 AM a 11:00 PM. El servicio de delivery está disponible hasta las 11:00 PM todos los días. Para reservaciones y consultas telefónicas, puedes contactarnos durante nuestro horario de atención.",
    },
    {
      question: "¿Aceptan reservaciones para grupos grandes?",
      answer:
        "Sí, aceptamos reservaciones para grupos de 8 personas o más. Te recomendamos hacer tu reserva con al menos 2 días de anticipación para garantizar disponibilidad. Para grupos de más de 15 personas, ofrecemos menús especiales y descuentos. Puedes hacer tu reserva llamando a nuestro número de teléfono o completando el formulario de contacto.",
    },
    {
      question: "¿Tienen opciones vegetarianas y veganas?",
      answer:
        "Sí, contamos con varias opciones vegetarianas en nuestro menú, incluyendo ensaladas gourmet, guarniciones variadas y platos principales sin carne. También tenemos opciones veganas disponibles bajo pedido. Todas nuestras opciones están claramente marcadas en el menú y nuestro personal estará encantado de ayudarte a encontrar la opción perfecta para ti.",
    },
    {
      question: "¿Ofrecen servicio de catering para eventos?",
      answer:
        "Sí, ofrecemos servicio de catering para todo tipo de eventos: cumpleaños, reuniones corporativas, matrimonios, graduaciones, etc. Contamos con diferentes paquetes que incluyen nuestro famoso pollo a la brasa, acompañamientos y bebidas. Los paquetes van desde 20 hasta 500 personas. Contáctanos con al menos una semana de anticipación para cotizaciones personalizadas.",
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer:
        "Aceptamos efectivo, tarjetas de débito y crédito (Visa, Mastercard), transferencias bancarias y pagos móviles (Yape, Plin). Para delivery, también puedes pagar contra entrega. No cobramos comisión adicional por pagos con tarjeta.",
    },
    {
      question: "¿Tienen estacionamiento disponible?",
      answer:
        "Sí, contamos con estacionamiento gratuito para nuestros clientes con capacidad para 20 vehículos. El estacionamiento está ubicado en la parte posterior del local y cuenta con vigilancia durante nuestro horario de atención.",
    },
    {
      question: "¿Manejan promociones especiales?",
      answer:
        "Sí, tenemos promociones especiales todos los días. Los lunes y martes ofrecemos descuentos para familias, los miércoles tenemos 2x1 en alitas, y los fines de semana promociones en combos familiares. También manejamos promociones especiales para cumpleañeros y eventos corporativos. Síguenos en nuestras redes sociales para estar al día con todas nuestras ofertas.",
    },
  ]

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!formState.name.trim()) {
      errors.name = "El nombre es requerido"
    }

    if (!formState.email.trim()) {
      errors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = "El email no es válido"
    }

    if (!formState.phone.trim()) {
      errors.phone = "El teléfono es requerido"
    } else if (!/^\+?[\d\s-()]{9,}$/.test(formState.phone)) {
      errors.phone = "El teléfono no es válido"
    }

    if (!formState.subject.trim()) {
      errors.subject = "El asunto es requerido"
    }

    if (!formState.message.trim()) {
      errors.message = "El mensaje es requerido"
    } else if (formState.message.trim().length < 10) {
      errors.message = "El mensaje debe tener al menos 10 caracteres"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setFormStatus("submitting")

    try {
      // Simulación de envío de formulario
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Aquí iría la lógica real de envío del formulario
      console.log("Formulario enviado:", formState)

      setFormStatus("success")
      // Resetear el formulario después de enviar
      if (formRef.current) {
        formRef.current.reset()
        setFormState({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          requestType: "general",
        })
      }

      // Volver al estado inicial después de mostrar el mensaje de éxito
      setTimeout(() => {
        setFormStatus("idle")
      }, 5000)
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      setFormStatus("error")

      // Volver al estado inicial después de mostrar el mensaje de error
      setTimeout(() => {
        setFormStatus("idle")
      }, 5000)
    }
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hola, me gustaría hacer una consulta sobre Pollería Roy's")
    window.open(`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}?text=${message}`, "_blank")
  }

  const handleMapClick = () => {
    // Coordenadas aproximadas de Oxapampa
    const coordinates = "-10.5833,-75.4000"
    window.open(`https://www.google.com/maps/search/?api=1&query=${coordinates}`, "_blank")
  }

  return (
    <main className={styles.contactPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.pageTitle}>{title}</h1>
            <p className={styles.pageSubtitle}>{subtitle}</p>
            <p className={styles.pageDescription}>{description}</p>

            <div className={styles.quickActions}>
              <button onClick={handleWhatsAppClick} className={styles.whatsappButton}>
                <MessageSquare size={20} />
                WhatsApp
              </button>
              <a href={`tel:${contactInfo.phone}`} className={styles.callButton}>
                <Phone size={20} />
                Llamar Ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            {/* Información de contacto */}
            <div className={styles.contactInfo}>
              <div className={styles.infoCard}>
                <h2 className={styles.infoTitle}>Información de Contacto</h2>
                <p className={styles.infoSubtitle}>
                  Estamos disponibles para atenderte por diferentes medios. ¡Contáctanos!
                </p>

                <div className={styles.infoItems}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <MapPin size={24} />
                    </div>
                    <div className={styles.infoContent}>
                      <h3>Dirección</h3>
                      <p>{contactInfo.address}</p>
                      <button onClick={handleMapClick} className={styles.mapButton}>
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

              <div className={styles.mapContainer}>
                <div className={styles.mapPlaceholder} onClick={handleMapClick}>
                  <MapPin size={48} />
                  <p>Mapa Interactivo</p>
                  <small>Haz clic para ver la ubicación en Google Maps</small>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <div className={styles.contactForm}>
              <div className={styles.formCard}>
                <h2 className={styles.formTitle}>Envíanos un Mensaje</h2>
                <p className={styles.formSubtitle}>
                  Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                </p>

                {formStatus === "success" && (
                  <div className={styles.formSuccess}>
                    <CheckCircle size={24} />
                    <div>
                      <p>
                        <strong>¡Mensaje enviado con éxito!</strong>
                      </p>
                      <p>Te contactaremos dentro de las próximas 24 horas.</p>
                    </div>
                  </div>
                )}

                {formStatus === "error" && (
                  <div className={styles.formError}>
                    <AlertCircle size={24} />
                    <div>
                      <p>
                        <strong>Error al enviar el mensaje</strong>
                      </p>
                      <p>Por favor, intenta nuevamente o contáctanos por teléfono.</p>
                    </div>
                  </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.formLabel}>
                        <User size={16} />
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        className={`${styles.formInput} ${formErrors.name ? styles.formInputError : ""}`}
                        placeholder="Tu nombre completo"
                        disabled={formStatus === "submitting"}
                      />
                      {formErrors.name && <span className={styles.errorMessage}>{formErrors.name}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.formLabel}>
                        <Mail size={16} />
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        className={`${styles.formInput} ${formErrors.email ? styles.formInputError : ""}`}
                        placeholder="tu@email.com"
                        disabled={formStatus === "submitting"}
                      />
                      {formErrors.email && <span className={styles.errorMessage}>{formErrors.email}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="phone" className={styles.formLabel}>
                        <Phone size={16} />
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className={`${styles.formInput} ${formErrors.phone ? styles.formInputError : ""}`}
                        placeholder="+51 999 888 777"
                        disabled={formStatus === "submitting"}
                      />
                      {formErrors.phone && <span className={styles.errorMessage}>{formErrors.phone}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="requestType" className={styles.formLabel}>
                        <MessageSquare size={16} />
                        Tipo de Consulta
                      </label>
                      <select
                        id="requestType"
                        name="requestType"
                        value={formState.requestType}
                        onChange={handleInputChange}
                        className={styles.formSelect}
                        disabled={formStatus === "submitting"}
                      >
                        {requestTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.formLabel}>
                      Asunto *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      className={`${styles.formInput} ${formErrors.subject ? styles.formInputError : ""}`}
                      placeholder="Asunto de tu mensaje"
                      disabled={formStatus === "submitting"}
                    />
                    {formErrors.subject && <span className={styles.errorMessage}>{formErrors.subject}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.formLabel}>
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      className={`${styles.formTextarea} ${formErrors.message ? styles.formInputError : ""}`}
                      placeholder="Escribe tu mensaje aquí..."
                      rows={5}
                      disabled={formStatus === "submitting"}
                    />
                    {formErrors.message && <span className={styles.errorMessage}>{formErrors.message}</span>}
                    <small className={styles.characterCount}>{formState.message.length} caracteres (mínimo 10)</small>
                  </div>

                  <button type="submit" className={styles.submitButton} disabled={formStatus === "submitting"}>
                    {formStatus === "submitting" ? (
                      <>
                        <div className={styles.spinner} />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Enviar Mensaje
                      </>
                    )}
                  </button>

                  <p className={styles.formNote}>
                    * Campos obligatorios. Nos comprometemos a responder en un máximo de 24 horas.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
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
            <button onClick={handleWhatsAppClick} className={styles.faqCtaButton}>
              Contáctanos por WhatsApp
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactPage
