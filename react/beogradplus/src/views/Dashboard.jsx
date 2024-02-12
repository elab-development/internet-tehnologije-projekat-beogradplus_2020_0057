import SideBar from "../components/SideBar";
import Map from "../components/Map";

export default function Dashboard() {
  return (
    // justify-center items-center
    <div className="h-screen w-screen overflow-hidden">
      <Map center={[44.802873, 20.452251]} zoom={15} />
      {/* <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=20.341701507568363%2C44.759533053369275%2C20.502376556396488%2C44.85343480872422&amp;layer=transportmap"
        className="h-full w-full z-0"
      ></iframe> */}
    </div>
  );
}
