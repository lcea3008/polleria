/**
 * Abre WhatsApp con un mensaje predefinido
 * @param phoneNumber Número de teléfono con código de país
 * @param message Mensaje predefinido
 */
export const openWhatsApp = (phoneNumber: string, message = ""): void => {
  // Eliminar caracteres no numéricos del número de teléfono
  const cleanNumber = phoneNumber.replace(/\D/g, "")
  const encodedMessage = encodeURIComponent(message)
  window.open(`https://wa.me/${cleanNumber}?text=${encodedMessage}`, "_blank")
}

/**
 * Abre Google Maps con una ubicación específica
 * @param coordinates Coordenadas en formato "latitud,longitud"
 * @param query Consulta de búsqueda opcional
 */
export const openGoogleMaps = (coordinates: string, query = ""): void => {
  if (coordinates) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${coordinates}`, "_blank")
  } else if (query) {
    const encodedQuery = encodeURIComponent(query)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedQuery}`, "_blank")
  }
}

/**
 * Valida un formulario de contacto
 * @param formData Datos del formulario
 * @returns Objeto con errores de validación
 */
export const validateContactForm = (formData: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}): { [key: string]: string } => {
  const errors: { [key: string]: string } = {}

  if (!formData.name.trim()) {
    errors.name = "El nombre es requerido"
  }

  if (!formData.email.trim()) {
    errors.email = "El email es requerido"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "El email no es válido"
  }

  if (!formData.phone.trim()) {
    errors.phone = "El teléfono es requerido"
  } else if (!/^\+?[\d\s-()]{9,}$/.test(formData.phone)) {
    errors.phone = "El teléfono no es válido"
  }

  if (!formData.subject.trim()) {
    errors.subject = "El asunto es requerido"
  }

  if (!formData.message.trim()) {
    errors.message = "El mensaje es requerido"
  } else if (formData.message.trim().length < 10) {
    errors.message = "El mensaje debe tener al menos 10 caracteres"
  }

  return errors
}

/**
 * Envía un formulario de contacto (simulación)
 * @param formData Datos del formulario
 * @returns Promesa que se resuelve después de un tiempo simulado
 */
export const submitContactForm = async (formData: any): Promise<void> => {
  // Simulación de envío de formulario
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulación de éxito (90% de probabilidad)
      if (Math.random() > 0.1) {
        console.log("Formulario enviado con éxito:", formData)
        resolve()
      } else {
        // Simulación de error (10% de probabilidad)
        reject(new Error("Error al enviar el formulario"))
      }
    }, 2000)
  })
}
