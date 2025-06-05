"use client"

import type React from "react"
import { MapPin } from "lucide-react"
import styles from "./MapComponent.module.css"
import type { MapComponentProps } from "./MapComponent.types"

const MapComponent: React.FC<MapComponentProps> = ({ onClick }) => {
  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapPlaceholder} onClick={onClick}>
        <MapPin size={48} />
        <p>Mapa Interactivo</p>
        <small>Haz clic para ver la ubicación en Google Maps</small>
      </div>
    </div>
  )
}

export default MapComponent
