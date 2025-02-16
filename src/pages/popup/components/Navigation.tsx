interface NavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const NAV_ITEMS = [
  { label: "Events", id: "events" },
  { label: "Settings", id: "settings" },
  // { label: "Cookies", href: "#" },
];

const isDev = process.env.__DEV__ === "true";
const icon = isDev ? "/dev-icon-32.png" : "/icon-32.png";

export default function Navigation({
  currentTab,
  onTabChange,
}: NavigationProps) {
  return (
    <nav className="border-b border-gray-200">
      <div className="flex items-center px-4 py-2 space-x-6">
        <div className="flex items-center space-x-6">
          <img src={icon} alt="Logo" className="w-6 h-6" />
          <div className="flex space-x-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  currentTab === item.id
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
