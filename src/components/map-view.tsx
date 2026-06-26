"use client"
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

interface Location {
  id: string
  name: string
  city: string
  lat: number
  lng: number
  rating: number
}

interface MapViewProps {
  locations: Location[]
  center?: [number, number]
}

export default function MapView({ locations, center = [20.5937, 78.9629] }: MapViewProps) {
  return (
    <MapContainer 
      center={center} 
      zoom={5} 
      className="h-[500px] w-full rounded-xl z-0"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc) => (
        <CircleMarker 
          key={loc.id} 
          center={[loc.lat, loc.lng]} 
          radius={10} 
          pathOptions={{ color: "#d946ef", fillColor: "#d946ef", fillOpacity: 0.8 }}
        >
          <Popup>
            <div className="text-center">
              <h3 className="font-bold text-sm">{loc.name}</h3>
              <p className="text-xs text-gray-500">{loc.city}</p>
              <p className="text-xs font-semibold mt-1">★ {loc.rating}</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}