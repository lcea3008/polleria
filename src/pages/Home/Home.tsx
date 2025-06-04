"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  MapPin, Clock, Phone, Star, Users, Award, ChefHat, Heart, ArrowRight, Play, Quote,
  Calendar, Utensils, Truck,
} from "lucide-react"
import CarruselHorizontal from "../../components/CarruselHorizontal/CarruselHorizontal"
import OfertasDia from "../../components/OfertasDia/OfertasDia"
import ImageWithDescription from "../../components/ImageWithDescription/ImageWithDescription"
import styles from "./Home.module.css"
import type { HomeProps } from "./Home.types"

// Assets
import {local1, local2, local3} from "../../assets/images/index"
import logo from "../../assets/logo.jpg"


// Datos de la página
const carouselImages = [
  {
    src: local1,
    alt: "Interior del restaurante Pollería Roy's",
    title: "Ambiente Acogedor",
    description: "Disfruta de nuestro ambiente familiar y acogedor",
  },
  {
    src: local2,
    alt: "Cocina profesional de Pollería Roy's",
    title: "Cocina Profesional",
    description: "Equipos de última generación para el mejor sabor",
  },
  {
    src: local3,
    alt: "Terraza exterior de Pollería Roy's",
    title: "Terraza al Aire Libre",
    description: "Espacio perfecto para disfrutar en familia",
  },
]

const dailyOffersData = [
  {
    id: 1,
    titulo: "Combo Familiar",
    descripcion: "¡Pollo a la brasa con papas y ensalada a solo S/19.90!",
    imagen: logo,
    precioOriginal: 25.0,
    precioOferta: 19.9,
    categoria: "Combos",
    fechaVencimiento: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    titulo: "Alitas BBQ",
    descripcion: "Promoción: 3x2 en alitas BBQ crujientes y jugosas.",
    imagen: local3,
    precioOriginal: 30.0,
    precioOferta: 20.0,
    categoria: "Promociones",
    fechaVencimiento: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    titulo: "Descuento Especial",
    descripcion: "¡20% de descuento en pedidos mayores a S/50!",
    imagen: local1,
    categoria: "Descuentos",
    fechaVencimiento: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
  },
]

const testimonials = [
  {
    id: 1,
    name: "María González",
    rating: 5,
    comment: "El mejor pollo a la brasa de Oxapampa. Las salsas son increíbles y el servicio excelente.",
    date: "Hace 2 días",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    rating: 5,
    comment: "Ambiente familiar y comida deliciosa. Siempre venimos los fines de semana.",
    date: "Hace 1 semana",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Ana Ruiz",
    rating: 5,
    comment: "Las promociones son geniales y la calidad nunca decepciona. ¡Recomendado 100%!",
    date: "Hace 2 semanas",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

const specialties = [
  {
    icon: <ChefHat size={32} />,
    title: "Pollo a la Brasa",
    description: "Nuestro pollo se cocina lentamente en hornos especiales con carbón de algarrobo",
  },
  {
    icon: <Utensils size={32} />,
    title: "Salsas Secretas",
    description: "Recetas familiares transmitidas por generaciones con ingredientes frescos",
  },
  {
    icon: <Truck size={32} />,
    title: "Delivery Rápido",
    description: "Entrega a domicilio en menos de 30 minutos, manteniendo la temperatura perfecta",
  },
]

const stats = [
  { icon: <Users size={24} />, value: "15,000+", label: "Clientes Satisfechos" },
  { icon: <Award size={24} />, value: "25", label: "Años de Experiencia" },
  { icon: <Star size={24} />, value: "4.9", label: "Calificación Promedio" },
  { icon: <Heart size={24} />, value: "98%", label: "Recomendación" },
]

const Home: React.FC<HomeProps> = ({
  heroTitle = "Pollería Roy's",
  heroSubtitle = "El Sabor Auténtico de Oxapampa",
  heroDescription = "Ubicados en el corazón de Oxapampa, ofrecemos el mejor pollo a la brasa de la zona, acompañado de papas crujientes, ensaladas frescas y nuestras salsas secretas que te harán volver por más.",
  showTestimonials = true,
  showStats = true,
  showSpecialties = true,
  showLocation = true,
}) => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Intersection Observer para animaciones
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  


  const handleOrderNow = (productName: string) => {
  const phoneNumber = "51932836750"; // Reemplaza con tu número de WhatsApp
  const message = `Hola, quiero pedir: ${productName}`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  window.open(whatsappUrl, "_blank");
  console.log("REalizar pedido por What")
};



  const handleViewMenu = () => {
    // Implementar navegación a menú
    window.open("/Productos", "_self")
    console.log("Navegar a menú")
  }

  const handleCallNow = () => {
    window.open("tel:+51999888777", "_self")
  }

  return (
    <main className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero} id="hero" data-animate>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>{heroTitle}</h1>
            <p className={styles.heroSubtitle}>{heroSubtitle}</p>
            <p className={styles.heroDescription}>{heroDescription}</p>

            <div className={styles.heroActions}>
              <button className={styles.primaryButton} onClick={() => handleOrderNow("Pollo Entero a la Brasa")}>
                <Utensils size={20} />
                Pedir
                <ArrowRight size={20} />
              </button>
              <button className={styles.secondaryButton} onClick={handleViewMenu}>
                <Play size={20} />
                Ver Menú
              </button>
            </div>

            <div className={styles.heroInfo}>
              <div className={styles.infoItem}>
                <MapPin size={18} />
                <span>Oxapampa, Pasco</span>
              </div>
              <div className={styles.infoItem}>
                <Clock size={18} />
                <span>Abierto hasta las 10:00 PM</span>
              </div>
              <div className={styles.infoItem}>
                <Phone size={18} />
                <button className={styles.phoneButton} onClick={handleCallNow}>
                  +51 999 888 777
                </button>
              </div>
            </div>
          </div>

          <div className={styles.heroImage}>
            <ImageWithDescription
              imageUrl={logo}
              altText="Pollo a la brasa de Pollería Roy's"
              title="Nuestro Pollo Estrella"
              description="Cocido a la perfección con carbón de algarrobo"
              variant="elevated"
              size="large"
              aspectRatio="1/1"
              showRating
              rating={5}
              badge={{
                text: "Especialidad",
                variant: "success",
                icon: <Award size={16} />,
              }}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {showStats && (
        <section className={`${styles.stats} ${isVisible.stats ? styles.animate : ""}`} id="stats" data-animate>
          <div className={styles.container}>
            <div className={styles.statsGrid}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section
        className={`${styles.mainContent} ${isVisible.mainContent ? styles.animate : ""}`}
        id="mainContent"
        data-animate
      >
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            {/* Carrusel */}
            <div className={styles.carouselSection}>
              <h2 className={styles.sectionTitle}>Conoce Nuestro Local</h2>
              <CarruselHorizontal
                images={carouselImages}
                title="Galería del Restaurante"
                description="Descubre nuestro acogedor ambiente y instalaciones modernas"
                intervalTime={5000}
                showControls
                showIndicators
                enableKeyboard
                enableTouch
              />
              <h3> lorem</h3>
            </div>
            
            {/* Ofertas */}
            <div className={styles.offersSection}>
              <OfertasDia
                ofertas={dailyOffersData}
                intervalTime={4000}
                autoPlay
                showTimer
                showControls
                showIndicators
                onOfferClick={(offer) => console.log("Ver oferta:", offer)}
                onAddToCart={(offer) => console.log("Agregar al carrito:", offer)}
              />
            </div>
          </div>
        </div>
      
      </section>

      {/* Specialties Section */}
      {showSpecialties && (
        <section
          className={`${styles.specialties} ${isVisible.specialties ? styles.animate : ""}`}
          id="specialties"
          data-animate
        >
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Nuestras Especialidades</h2>
              <p className={styles.sectionDescription}>
                Lo que nos hace únicos en Oxapampa y nos convierte en la elección favorita de las familias
              </p>
            </div>

            <div className={styles.specialtiesGrid}>
              {specialties.map((specialty, index) => (
                <div key={index} className={styles.specialtyCard}>
                  <div className={styles.specialtyIcon}>{specialty.icon}</div>
                  <h3 className={styles.specialtyTitle}>{specialty.title}</h3>
                  <p className={styles.specialtyDescription}>{specialty.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {showTestimonials && (
        <section
          className={`${styles.testimonials} ${isVisible.testimonials ? styles.animate : ""}`}
          id="testimonials"
          data-animate
        >
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Lo Que Dicen Nuestros Clientes</h2>
              <p className={styles.sectionDescription}>
                Miles de familias confían en nosotros para sus momentos especiales
              </p>
            </div>

            <div className={styles.testimonialsGrid}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className={styles.testimonialCard}>
                  <div className={styles.testimonialHeader}>
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className={styles.testimonialAvatar}
                    />
                    <div className={styles.testimonialInfo}>
                      <h4 className={styles.testimonialName}>{testimonial.name}</h4>
                      <div className={styles.testimonialRating}>
                        {Array.from({ length: testimonial.rating }, (_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>
                      <span className={styles.testimonialDate}>{testimonial.date}</span>
                    </div>
                  </div>
                  <div className={styles.testimonialContent}>
                    <Quote className={styles.quoteIcon} size={24} />
                    <p className={styles.testimonialText}>{testimonial.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location & Hours Section */}
      {showLocation && (
        <section
          className={`${styles.location} ${isVisible.location ? styles.animate : ""}`}
          id="location"
          data-animate
        >
          <div className={styles.container}>
            <div className={styles.locationGrid}>
              <div className={styles.locationInfo}>
                <h2 className={styles.sectionTitle}>Visítanos</h2>
                <p className={styles.sectionDescription}>
                  Estamos ubicados en el centro de Oxapampa, fácil acceso y estacionamiento disponible
                </p>

                <div className={styles.locationDetails}>
                  <div className={styles.locationItem}>
                    <MapPin className={styles.locationIcon} size={24} />
                    <div>
                      <h4>Dirección</h4>
                      <p>Av. Principal 123, Oxapampa, Pasco</p>
                    </div>
                  </div>

                  <div className={styles.locationItem}>
                    <Clock className={styles.locationIcon} size={24} />
                    <div>
                      <h4>Horarios de Atención</h4>
                      <p>Lun - Dom: 11:00 AM - 10:00 PM</p>
                      <p>Delivery hasta las 11:00 PM</p>
                    </div>
                  </div>

                  <div className={styles.locationItem}>
                    <Phone className={styles.locationIcon} size={24} />
                    <div>
                      <h4>Contacto</h4>
                      <p>+51 999 888 777</p>
                      <p>info@polleriaroys.com</p>
                    </div>
                  </div>
                </div>

                <div className={styles.locationActions}>
                  <button className={styles.primaryButton} onClick={handleCallNow}>
                    <Phone size={20} />
                    Llamar Ahora
                  </button>
                  <button className={styles.secondaryButton}>
                    <MapPin size={20} />
                    Ver en Mapa
                  </button>
                </div>
              </div>

              <div className={styles.locationMap}>
                <div className={styles.mapPlaceholder}>
                  <MapPin size={48} />
                  <p>Mapa Interactivo</p>
                  <small>Haz clic para ver la ubicación en Google Maps</small>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>¿Listo para disfrutar?</h2>
            <p className={styles.ctaDescription}>
              Haz tu pedido ahora y disfruta del mejor pollo a la brasa de Oxapampa en la comodidad de tu hogar
            </p>
            <div className={styles.ctaActions}>
              <button className={styles.primaryButton} onClick={() => handleOrderNow("Pollo Entero a la Brasa")}>
                <Utensils size={20} />
                Pedir Delivery
              </button>
              <button className={styles.secondaryButton}>
                <Calendar size={20} />
                Reservar Mesa
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
