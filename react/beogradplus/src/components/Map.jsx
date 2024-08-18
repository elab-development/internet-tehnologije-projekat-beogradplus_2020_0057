import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "../index.css";
import { useMenuStateContext } from "../contexts/MenuContext";
import stopIconUrl from "../components/map_icons/placeholder.png";

export default function Map() {
  const { data, setMenuOption, setData } = useMenuStateContext();
  const [stopMarkerPos, setStopMarker] = useState(null);

  const stopPosition = data.stop
    ? [data.stop.latitude, data.stop.longitude]
    : null;

  const vehicleStopPosition = data.vehicleStop
    ? [data.vehicleStop.lat, data.vehicleStop.lon]
    : null;

  const stopIcon = L.icon({
    iconUrl: stopIconUrl,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  let lineColor = "blue";

  switch (data.vehicleType) {
    case "tram":
      lineColor = "red";
      break;
    case "trolleybus":
      lineColor = "orange";
      break;
    default:
      lineColor = "blue";
      break;
  }

  const markerHtmlStyles = `
    background-color: ${lineColor};
    width: 2.5rem;
    height: 2.5rem;
    display: block;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 2px solid #000000;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 5px; 
  `;

  const vehicleIcon = L.divIcon({
    className: "",
    iconSize: [40, 40],
    iconAnchor: [21, 48],
    html: `
    <span style="${markerHtmlStyles}">
      <p class="relative top-1 text-center text-white -rotate-45 text-lg font-sans">
        ${data.vehicleLine}
      </p>
    </span>`,
  });

  const RoutingControl = ({ waypoints }) => {
    const map = useMap();

    useEffect(() => {
      if (map && waypoints.length > 1) {
        // srediti ovaj routing control, prikazuje putanje izmedju stanica cudno
        const routingControl = L.Routing.control({
          waypoints: waypoints.map((stop) =>
            L.latLng(stop.latitude, stop.longitude)
          ),
          routeWhileDragging: true,
          // TODO dodati ove bele markere da se ucitavaju pravilno
          createMarker: (i, wp, nWps) => {
            return L.circleMarker(wp.latLng, {
              radius: 3,
              stroke: true,
              color: "black",
              weight: 1,
              fill: true,
              fillColor: "white",
              fillOpacity: 1,
            }).bindPopup(`Stop ${i + 1}: ${data.lineStops[i].name}`);
          },
          lineOptions: {
            styles: [
              {
                color: lineColor,
                weight: 5,
                stroke: true,
              },
            ],
          },
          show: false,
        }).addTo(map);

        return () => map.removeControl(routingControl);
      }
    }, [map, waypoints]);

    return null;
  };

  return (
    <MapContainer
      center={stopPosition || [44.7866, 20.4489]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        // url="https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=3e058801b5a045f4b089a9210f52ff28"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stopPosition && <Marker position={stopPosition} icon={stopIcon} />}
      {stopMarkerPos && <Marker position={stopMarkerPos} icon={stopIcon} />}
      {data.vehicleStop && ( // Add the vehicle marker
        <Marker position={vehicleStopPosition} icon={vehicleIcon} />
      )}
      {data.lineStops && data.lineStops.length > 1 && (
        <RoutingControl waypoints={data.lineStops} />
      )}
    </MapContainer>
  );
}
