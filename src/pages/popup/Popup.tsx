import { useState } from "react";
import Navigation from "./components/Navigation";
import { EventsPage, SettingsPage } from "./pages";

export default function Popup() {
  const [currentTab, setCurrentTab] = useState("events");

  return (
    <div>
      <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />
      <main>
        {currentTab === "events" && <EventsPage />}
        {currentTab === "settings" && <SettingsPage />}
      </main>
    </div>
  );
}
