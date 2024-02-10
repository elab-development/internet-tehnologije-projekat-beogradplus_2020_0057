import React from "react";
import {
  useMap,
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Circle,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import "../index.css";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { useMenuStateContext } from "../contexts/MenuContext";
import stopIconUrl from "../components/map_icons/placeholder.png";
import redMarker from "../components/map_icons/bus_marker_red.png";
import blueMarker from "../components/map_icons/bus_marker_blue.png";
import orangeMarker from "../components/map_icons/bus_marker_orange.png";

export default function Map() {
  const { data } = useMenuStateContext();

  const stopPosition = data.stop
    ? [data.stop.latitude, data.stop.longitude]
    : null;
  const stopIcon = L.icon({
    iconUrl: stopIconUrl,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  let lineStopsPositions = [];
  if (data.lineStops) {
    data.lineStops.map((stop) => {
      lineStopsPositions.push([stop.latitude, stop.longitude]);
    });
  }

  const vehicleStopPosition = data.vehicleStop
    ? [data.vehicleStop.lat, data.vehicleStop.lon]
    : null;

  let lineColor = "blue";
  let vehicleIconUrl = blueMarker;

  switch (data.vehicleType) {
    case "tram":
      lineColor = "red";
      vehicleIconUrl = redMarker;
      break;
    case "trolleybus":
      lineColor = "orange";
      vehicleIconUrl = orangeMarker;
      break;
    default:
      lineColor = "blue";
      vehicleIconUrl = blueMarker;
      break;
  }

  let vehicleIcon = L.icon({
    iconUrl: vehicleIconUrl,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
  });

  return (
    <MapContainer center={[44.802873, 20.452251]} zoom={15} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=3e058801b5a045f4b089a9210f52ff28"
      />
      {/* Izabrana stanica */}
      {stopPosition && (
        <Marker position={stopPosition} icon={stopIcon}></Marker>
      )}

      {lineStopsPositions && (
        <>
          {/* Prikaz linije */}
          <Polyline
            positions={lineStopsPositions}
            pathOptions={{ stroke: true, color: lineColor, weight: 5 }}
          ></Polyline>

          {/* Vozilo */}
          {data.vehicleStop && (
            <>
              <Marker position={vehicleStopPosition} icon={vehicleIcon}>
                <Tooltip
                  direction="center"
                  position={vehicleStopPosition}
                  offset={[0, -30]}
                  opacity={1}
                  permanent
                  className="bg-transparent border-none border-0 border-transparent shadow-none shadow-transparent text-white text-lg font-sans"
                >
                  {data.vehicleLine}
                </Tooltip>
              </Marker>
            </>
          )}

          {/* Stanice na liniji kao tackice */}
          {lineStopsPositions.map((stop) => {
            return (
              <CircleMarker
                center={{ lat: stop[0], lng: stop[1] }}
                radius={3}
                pathOptions={{
                  stroke: true,
                  color: "black",
                  weight: 1,
                  fill: true,
                  fillColor: "white",
                  fillOpacity: 1,
                }}
              ></CircleMarker>
            );
          })}
        </>
      )}
    </MapContainer>
  );
}
