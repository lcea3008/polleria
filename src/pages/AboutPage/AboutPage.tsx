"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Award, Users, ChefHat, Star, Quote, Heart, Instagram, Facebook, Twitter, ArrowRight } from "lucide-react"
import styles from "./AboutPage.module.css"
import type { AboutPageProps, TeamMember, Milestone, Value } from "./AboutPage.types"
import {local2} from "../../assets/images"

const AboutPage: React.FC<AboutPageProps> = ({                      
  title = "Nuestra Historia",
  subtitle = "Conoce a Pollería Roy's",
  description = "Desde 1998 sirviendo el mejor pollo a la brasa de Oxapampa con pasión, tradición y sabor inigualable.",
}) => {
  const [activeTab, setActiveTab] = useState<string>("historia")
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Datos del equipo
  const teamMembers: TeamMember[] = [
    {
      name: "Romelio Cabrera",
      role: "Fundador y Chef Principal",
      bio: "Con más de 25 años de experiencia, Roberto fundó Pollería Roy's con la visión de ofrecer el mejor pollo a la brasa de la región, utilizando recetas familiares transmitidas por generaciones.",
      image: "/placeholder.svg?height=300&width=300",
      socialMedia: {
        instagram: "https://instagram.com/",
        facebook: "https://facebook.com/",
      },
    },
    {
      name: "María Gonzales",
      role: "Chef de Cocina",
      bio: "Graduada de Le Cordon Bleu, María se unió a nuestro equipo en 2010 y ha sido fundamental en la creación de nuestras deliciosas salsas y acompañamientos que complementan perfectamente nuestro pollo a la brasa.",
      image: "/placeholder.svg?height=300&width=300",
      socialMedia: {
        instagram: "https://instagram.com/",
        twitter: "https://twitter.com/",
      },
    },
    {
      name: "Carlos Mendoza",
      role: "Gerente de Operaciones",
      bio: "Carlos asegura que cada cliente reciba un servicio excepcional. Su dedicación a la excelencia y atención al detalle garantiza que cada visita a Pollería Roy's sea una experiencia memorable.",
      image: "/placeholder.svg?height=300&width=300",
      socialMedia: {
        facebook: "https://facebook.com/",
        twitter: "https://twitter.com/",
      },
    },
    {
      name: "Ana Ruiz",
      role: "Jefa de Atención al Cliente",
      bio: "Con su carisma y amabilidad, Ana lidera nuestro equipo de atención al cliente, asegurando que cada cliente se sienta como en casa y reciba un trato personalizado y cálido.",
      image: "/placeholder.svg?height=300&width=300",
      socialMedia: {
        instagram: "https://instagram.com/",
      },
    },
  ]

  // Datos de hitos históricos
  const milestones: Milestone[] = [
    {
      year: 1998,
      title: "Fundación",
      description:
        "Pollería Roy's abre sus puertas en una pequeña casa adaptada en el centro de Oxapampa, con apenas 5 mesas y un horno artesanal.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      year: 2005,
      title: "Primera Expansión",
      description:
        "Tras el éxito inicial, nos trasladamos a un local más amplio y renovamos nuestras instalaciones para atender la creciente demanda.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      year: 2010,
      title: "Premio Gastronómico",
      description:
        "Recibimos el reconocimiento al 'Mejor Pollo a la Brasa' en el Festival Gastronómico de la Selva Central, consolidándonos como referentes en la región.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      year: 2015,
      title: "Renovación Total",
      description:
        "Renovamos completamente nuestro local principal, incorporando un diseño moderno pero manteniendo la esencia acogedora que nos caracteriza.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      year: 2020,
      title: "Servicio de Delivery",
      description:
        "Implementamos nuestro servicio de delivery propio para llevar nuestros deliciosos platillos directamente a los hogares de nuestros clientes.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      year: 2023,
      title: "25 Aniversario",
      description:
        "Celebramos 25 años de trayectoria con la inauguración de nuestra nueva terraza y la ampliación de nuestro menú con nuevas especialidades.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Datos de valores
  const values: Value[] = [
    {
      icon: <Heart size={32} />,
      title: "Pasión",
      description:
        "Amamos lo que hacemos y eso se refleja en cada platillo que servimos. Nuestra pasión por la gastronomía peruana nos impulsa a mejorar constantemente.",
    },
    {
      icon: <Award size={32} />,
      title: "Calidad",
      description:
        "Seleccionamos cuidadosamente los mejores ingredientes y mantenemos estrictos estándares en cada proceso para garantizar un producto excepcional.",
    },
    {
      icon: <Users size={32} />,
      title: "Familia",
      description:
        "Consideramos a nuestros clientes y colaboradores como parte de una gran familia, creando un ambiente cálido y acogedor para todos.",
    },
    {
      icon: <ChefHat size={32} />,
      title: "Tradición",
      description:
        "Honramos las recetas tradicionales y técnicas ancestrales, combinándolas con toques modernos para crear una experiencia gastronómica única.",
    },
  ]

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

  return (
    <main className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.pageTitle}>{title}</h1>
              <p className={styles.pageSubtitle}>{subtitle}</p>
              <p className={styles.pageDescription}>{description}</p>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>25+</span>
                <span className={styles.statLabel}>Años de Experiencia</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>15k+</span>
                <span className={styles.statLabel}>Clientes Satisfechos</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>4.9</span>
                <span className={styles.statLabel}>
                  <Star size={16} fill="currentColor" /> Calificación
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className={styles.tabsSection}>
        <div className={styles.container}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${activeTab === "historia" ? styles.tabButtonActive : ""}`}
              onClick={() => setActiveTab("historia")}
            >
              Nuestra Historia
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "valores" ? styles.tabButtonActive : ""}`}
              onClick={() => setActiveTab("valores")}
            >
              Valores
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "equipo" ? styles.tabButtonActive : ""}`}
              onClick={() => setActiveTab("equipo")}
            >
              Nuestro Equipo
            </button>
          </div>
        </div>
      </section>

      {/* Historia Tab */}
      <section
        className={`${styles.historySection} ${activeTab === "historia" ? styles.activeSection : styles.inactiveSection}`}
        id="historia"
        data-animate
      >
        <div className={styles.container}>
          <div className={`${styles.sectionHeader} ${isVisible.historia ? styles.animate : ""}`}>
            <h2 className={styles.sectionTitle}>Nuestra Trayectoria</h2>
            <p className={styles.sectionDescription}>
              Desde nuestros humildes inicios hasta convertirnos en un referente gastronómico en Oxapampa, cada paso ha
              sido parte de una apasionante historia de dedicación y amor por la cocina peruana.
            </p>
          </div>

          <div className={`${styles.timeline} ${isVisible.historia ? styles.animate : ""}`}>
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`${styles.timelineItem} ${index % 2 === 0 ? styles.timelineItemLeft : styles.timelineItemRight}`}
              >
                <div className={styles.timelineContent}>
                  <div className={styles.timelineYear}>{milestone.year}</div>
                  <h3 className={styles.timelineTitle}>{milestone.title}</h3>
                  <p className={styles.timelineDescription}>{milestone.description}</p>
                  <img
                    src={milestone.image || "/placeholder.svg"}
                    alt={milestone.title}
                    className={styles.timelineImage}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.historySummary}>
            <div className={styles.summaryContent}>
              <h3>Nuestra Misión</h3>
              <p>
                Ofrecer la mejor experiencia gastronómica a través de nuestro tradicional pollo a la brasa, preparado
                con ingredientes de la más alta calidad y servido en un ambiente familiar y acogedor, manteniendo viva
                la tradición culinaria peruana.
              </p>
              <h3>Nuestra Visión</h3>
              <p>
                Ser reconocidos como el referente del pollo a la brasa en toda la región central del Perú, expandiendo
                nuestra presencia pero manteniendo la calidad, el sabor y la atención personalizada que nos caracteriza.
              </p>
            </div>
            <div className={styles.summaryImage}>
              <img
                src={local2}
                alt="Local de Pollería Roy's en sus inicios"
                className={styles.historyImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Valores Tab */}
      <section
        className={`${styles.valuesSection} ${activeTab === "valores" ? styles.activeSection : styles.inactiveSection}`}
        id="valores"
        data-animate
      >
        <div className={styles.container}>
          <div className={`${styles.sectionHeader} ${isVisible.valores ? styles.animate : ""}`}>
            <h2 className={styles.sectionTitle}>Nuestros Valores</h2>
            <p className={styles.sectionDescription}>
              Los principios que guían cada aspecto de nuestro negocio, desde la selección de ingredientes hasta la
              atención al cliente, reflejando nuestra filosofía y compromiso.
            </p>
          </div>

          <div className={`${styles.valuesGrid} ${isVisible.valores ? styles.animate : ""}`}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>

          <div className={styles.valueStatement}>
            <div className={styles.quoteContainer}>
              <Quote size={48} className={styles.quoteIcon} />
              <blockquote className={styles.quote}>
                "En Pollería Roy's no solo servimos comida, creamos experiencias y recuerdos alrededor de una mesa.
                Nuestro compromiso es mantener viva la tradición del pollo a la brasa peruano, con el sabor auténtico
                que nos ha caracterizado por más de 25 años."
              </blockquote>
              <cite className={styles.quoteAuthor}>Roberto Sánchez, Fundador</cite>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo Tab */}
      <section
        className={`${styles.teamSection} ${activeTab === "equipo" ? styles.activeSection : styles.inactiveSection}`}
        id="equipo"
        data-animate
      >
        <div className={styles.container}>
          <div className={`${styles.sectionHeader} ${isVisible.equipo ? styles.animate : ""}`}>
            <h2 className={styles.sectionTitle}>Conoce a Nuestro Equipo</h2>
            <p className={styles.sectionDescription}>
              Detrás de cada platillo hay un equipo apasionado y dedicado que trabaja con esmero para ofrecerte la mejor
              experiencia gastronómica.
            </p>
          </div>

          <div className={`${styles.teamGrid} ${isVisible.equipo ? styles.animate : ""}`}>
            {teamMembers.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.teamImageContainer}>
                  <img src={member.image || "/placeholder.svg"} alt={member.name} className={styles.teamImage} />
                  <div className={styles.teamSocial}>
                    {member.socialMedia.instagram && (
                      <a
                        href={member.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={`Instagram de ${member.name}`}
                      >
                        <Instagram size={20} />
                      </a>
                    )}
                    {member.socialMedia.facebook && (
                      <a
                        href={member.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={`Facebook de ${member.name}`}
                      >
                        <Facebook size={20} />
                      </a>
                    )}
                    {member.socialMedia.twitter && (
                      <a
                        href={member.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={`Twitter de ${member.name}`}
                      >
                        <Twitter size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <div className={styles.teamInfo}>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <p className={styles.teamRole}>{member.role}</p>
                  <p className={styles.teamBio}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className={styles.testimonialsSection} id="testimonios" data-animate>
        <div className={styles.container}>
          <div className={`${styles.sectionHeader} ${isVisible.testimonios ? styles.animate : ""}`}>
            <h2 className={styles.sectionTitle}>Lo Que Dicen Nuestros Clientes</h2>
            <p className={styles.sectionDescription}>
              La satisfacción de nuestros clientes es nuestro mayor orgullo y motivación para seguir mejorando cada día.
            </p>
          </div>

          <div className={`${styles.testimonialsGrid} ${isVisible.testimonios ? styles.animate : ""}`}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <Quote className={styles.testimonialQuote} size={24} />
                <p>
                  "Cada vez que visito Oxapampa, Pollería Roy's es parada obligatoria. El sabor de su pollo a la brasa
                  es incomparable y el ambiente familiar me hace sentir como en casa."
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <img
                  src="/placeholder.svg?height=60&width=60"
                  alt="Cliente satisfecho"
                  className={styles.testimonialAvatar}
                />
                <div>
                  <h4>Juan Pérez</h4>
                  <div className={styles.testimonialRating}>
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <Quote className={styles.testimonialQuote} size={24} />
                <p>
                  "Las salsas son espectaculares y el pollo siempre está en su punto perfecto. El servicio es rápido y
                  amable. ¡Definitivamente el mejor pollo a la brasa de la región!"
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <img
                  src="/placeholder.svg?height=60&width=60"
                  alt="Cliente satisfecho"
                  className={styles.testimonialAvatar}
                />
                <div>
                  <h4>María López</h4>
                  <div className={styles.testimonialRating}>
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <Quote className={styles.testimonialQuote} size={24} />
                <p>
                  "Vengo con mi familia desde hace más de 10 años y nunca nos ha decepcionado. La calidad se mantiene
                  intacta y el sabor es siempre delicioso. ¡Recomendado al 100%!"
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <img
                  src="/placeholder.svg?height=60&width=60"
                  alt="Cliente satisfecho"
                  className={styles.testimonialAvatar}
                />
                <div>
                  <h4>Carlos Rodríguez</h4>
                  <div className={styles.testimonialRating}>
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>¿Listo para probar el mejor pollo a la brasa?</h2>
            <p className={styles.ctaDescription}>
              Visítanos y descubre por qué somos el restaurante favorito de Oxapampa desde hace más de 25 años.
            </p>
            <div className={styles.ctaButtons}>
              <a href="/contacto" className={styles.ctaPrimary}>
                Contáctanos <ArrowRight size={20} />
              </a>
              <a href="/productos" className={styles.ctaSecondary}>
                Ver Menú
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
