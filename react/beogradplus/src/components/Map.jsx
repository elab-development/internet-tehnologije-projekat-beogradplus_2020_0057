import React from "react";
import { useMap, MapContainer, TileLayer } from "react-leaflet";
import "../index.css";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

function MyComponent() {
  const map = useMap();
  // var opl = new L.OverPassLayer({
  //   query: "node[highway=bus_stop][ref=446]({{bbox}});out center;",
  // });
  // map.addLayer(opl);

  var pointA = new L.LatLng(44.8486028, 20.3797339);
  var pointB = new L.LatLng(44.7634302, 20.4982489);
  var pointList = [pointA, pointB];

  var firstpolyline = new L.Polyline(pointList, {
    color: "red",
    weight: 5,
    opacity: 1,
    smoothFactor: 1,
  });
  firstpolyline.addTo(map);

  return null;
}

export default function Map() {
  return (
    <MapContainer center={[44.802873, 20.452251]} zoom={15} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // url="https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=3e058801b5a045f4b089a9210f52ff28"
      />
      <MyComponent />
    </MapContainer>
  );
}
