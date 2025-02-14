interface NavLinkProps {
  label: string;
  href: string;
  isActive?: boolean;
}

export default function NavLink({ label, href, isActive }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`${
        isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
      } font-medium`}
    >
      {label}
    </a>
  );
}
