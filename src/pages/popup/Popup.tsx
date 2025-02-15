import { Navigation } from "./components";
import { EventsPage } from "./pages";

export default function Popup() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <EventsPage />
    </div>
  );
}
