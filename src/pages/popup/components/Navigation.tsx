import NavLink from "./NavLink";

import logo from "@assets/img/logo.svg";

const NAV_ITEMS = [
  { label: "Events", href: "#", isActive: true },
  { label: "Settings", href: "#" },
  // { label: "Cookies", href: "#" },
];

export default function Navigation() {
  return (
    <nav className="border-b border-gray-200">
      <div className="flex items-center px-4 py-2 space-x-6">
        <div className="flex items-center space-x-6">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <div className="flex space-x-4">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.label} {...item} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
