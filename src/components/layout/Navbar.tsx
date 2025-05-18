import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Compass, Home, Medal, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "خانه", path: "/" },
  { icon: Compass, label: "کاوش", path: "/explore" },
  { icon: ShoppingBag, label: "جوایز", path: "/rewards" },
  { icon: Medal, label: "دستاوردها", path: "/achievements" },
  { icon: User, label: "پروفایل", path: "/profile" }
];

export function Navbar() {
  const [activeItem, setActiveItem] = useState("/");

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-2 py-3 flex justify-around items-center z-10">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => {
            if (isActive) setActiveItem(item.path);
            return `flex items-center space-x-2 p-2 rounded-lg transition-colors ${
              isActive ? "text-sabzgaam-dark-green" : "text-gray-500"
            }`;
          }}
        >
          <NavItem 
            Icon={item.icon} 
            label={item.label} 
            isActive={activeItem === item.path} 
          />
        </NavLink>
      ))}
    </nav>
  );
}

type NavItemProps = {
  Icon: React.ElementType;
  label: string;
  isActive: boolean;
};

function NavItem({ Icon, label, isActive }: NavItemProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "p-1.5 rounded-full transition-colors",
          isActive ? "gradient-tab text-white" : "text-gray-500"
        )}
      >
        <Icon size={20} />
      </div>
      <span
        className={cn(
          "text-xs mt-1 font-medium",
          isActive ? "text-cyan-600" : "text-gray-500"
        )}
      >
        {label}
      </span>
    </div>
  );
}
