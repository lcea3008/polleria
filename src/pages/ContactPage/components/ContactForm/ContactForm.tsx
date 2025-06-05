"use client"

import type React from "react"

import { useState, useRef } from "react"
import { User, Mail, Phone, MessageSquare, Send, AlertCircle } from "lucide-react"
import styles from "./ContactForm.module.css"
import type { ContactFormProps, FormState } from "./ContactForm.types"

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  requestTypes = [
    { value: "general", label: "Consulta General", icon: <MessageSquare size={16} /> },
    { value: "reservation", label: "Reservación", icon: <MessageSquare size={16} /> },
    { value: "catering", label: "Catering/Eventos", icon: <MessageSquare size={16} /> },
    { value: "delivery", label: "Delivery", icon: <MessageSquare size={16} /> },
    { value: "complaint", label: "Reclamo/Sugerencia", icon: <AlertCircle size={16} /> },
  ],
}) => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    requestType: "general",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const formRef = useRef<HTMLFormElement>(null)

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
      await onSubmit(formState)

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

  return (
    <div className={styles.formCard}>
      <h2 className={styles.formTitle}>Envíanos un Mensaje</h2>
      <p className={styles.formSubtitle}>
        Completa el formulario y nos pondremos en contacto contigo lo antes posible.
      </p>

      {formStatus === "success" && (
        <div className={styles.formSuccess}>
          <div className={styles.successIcon}>✓</div>
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
  )
}

export default ContactForm
