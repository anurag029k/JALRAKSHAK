'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function Map({ waterBodies, onWaterBodyClick, getStatusColor }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      // Initialize map centered on Delhi
      mapInstanceRef.current = L.map(mapRef.current).setView([28.6139, 77.2090], 11)

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current)
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Add markers for water bodies
    waterBodies.forEach(waterBody => {
      if (waterBody.location && waterBody.location.coordinates) {
        const [lng, lat] = waterBody.location.coordinates
        
        // Create custom colored marker
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            background-color: ${getStatusColor(waterBody.status)};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })

        const marker = L.marker([lat, lng], { icon: customIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <div style="min-width: 200px;">
              <h3 style="font-weight: bold; margin: 0 0 5px 0;">${waterBody.name}</h3>
              <p style="margin: 0; font-size: 12px;">${waterBody.district}</p>
              <p style="margin: 5px 0 0 0; font-size: 12px;">
                <strong>Health Score:</strong> ${waterBody.healthScore}/100
              </p>
              <p style="margin: 0; font-size: 12px;">
                <strong>Status:</strong> ${waterBody.status}
              </p>
            </div>
          `)
          .on('click', () => onWaterBodyClick(waterBody))

        markersRef.current.push(marker)
      }
    })

    // Fit bounds to show all markers
    if (markersRef.current.length > 0) {
      const group = L.featureGroup(markersRef.current)
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1))
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [waterBodies, onWaterBodyClick, getStatusColor])

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '100%' }}
      className="z-0"
    />
  )
}
