import type { FAQ } from "../components/FaqSection/FaqSection.types"

export const contactInfo = {
  address: "Av. Principal 123, Oxapampa, Pasco, Perú",
  phone: "+51 932836750",
  whatsapp: "+51 932836750",
  email: "luichoe30@gmail.com",
  coordinates: "-10.577594202650758, -75.40788475318696", // Coordenadas aproximadas de Oxapampa
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

export const requestTypes = [
  { value: "general", label: "Consulta General", icon: "MessageSquare" },
  { value: "reservation", label: "Reservación", icon: "Calendar" },
  { value: "catering", label: "Catering/Eventos", icon: "Users" },
  { value: "delivery", label: "Delivery", icon: "Utensils" },
  { value: "complaint", label: "Reclamo/Sugerencia", icon: "AlertCircle" },
]

export const faqs: FAQ[] = [
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
