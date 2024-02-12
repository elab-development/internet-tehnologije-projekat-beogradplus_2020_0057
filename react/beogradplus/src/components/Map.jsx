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
  useMapEvents,
} from "react-leaflet";
import "../index.css";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { useMenuStateContext } from "../contexts/MenuContext";
import stopIconUrl from "../components/map_icons/placeholder.png";
import axiosClient from "../axios-client";

export default function Map() {
  const { data, setMenuOption, setData } = useMenuStateContext();

  let stopPosition = data.stop
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
    box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 5px; `;

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

  function HandleClick() {
    const map = useMapEvents({
      click(e) {
        axiosClient
          .post("/stop/nearest", {
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
          })
          .then((stop) => {
            setMenuOption(0);
            setData({ stops: stop.data });
          });
      },
    });
  }

  return (
    <MapContainer center={[44.802873, 20.452251]} zoom={15} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=3e058801b5a045f4b089a9210f52ff28"
      />
      <HandleClick />
      {/* Izabrana stanica */}
      {stopPosition && (
        <Marker position={stopPosition} icon={stopIcon}></Marker>
      )}

      {lineStopsPositions && (
        <>
          {/* Prikaz linije */}
          <Polyline
            positions={lineStopsPositions}
            pathOptions={{ stroke: true, color: "black", weight: 7 }}
          ></Polyline>
          <Polyline
            positions={lineStopsPositions}
            pathOptions={{ stroke: true, color: lineColor, weight: 5 }}
          ></Polyline>

          {/* Vozilo */}
          {data.vehicleStop && (
            <Marker position={vehicleStopPosition} icon={vehicleIcon} />
          )}

          {/* Stanice na liniji kao tackice */}
          {lineStopsPositions.map((stop) => {
            return (
              <CircleMarker
                center={{ lat: stop[0], lng: stop[1] }}
                radius={3}
                pathOptions={{
                  stroke: true,
                  color: "gray",
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
