import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type MapProps = {
  cityLocation: Location;
  points: {
    id: string;
    latitude: number;
    longitude: number;
    title?: string;
  }[];
  hoveredMarkerId: string | null;
};

const CityMap: React.FC<MapProps> = ({
  cityLocation,
  points,
  hoveredMarkerId,
}) => {
  const mapRef = useRef<L.Map>(null); // Исправлено на L.Map

  const greenIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const blueIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(
        [cityLocation.latitude, cityLocation.longitude],
        cityLocation.zoom
      );
    }
  }, [cityLocation]);

  return (
    <section className="cities__map" style={{ height: "100%", width: "100%" }}>
      <MapContainer
        ref={mapRef}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
        center={[cityLocation.latitude, cityLocation.longitude]}
        zoom={cityLocation.zoom}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {points.map(({ id, latitude, longitude, title }) => (
          <Marker
            key={id}
            position={[latitude, longitude]}
            icon={id === hoveredMarkerId ? greenIcon : blueIcon}
          >
            <Popup>{title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
};

export default CityMap;