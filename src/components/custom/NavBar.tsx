import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import grepsysLogo from '@/assets/logo.png';

export default function NavBar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="p-4 flex flex-row gap-5 items-center justify-between">
      <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
        <img
          src={grepsysLogo}
          alt="GREPSYS Logo"
          className="h-10"
        />
        <div className="h-8 w-px bg-gray-300"></div>
        <span className="text-2xl font-bold text-gray-900">Chat OCR</span>
      </Link>

      <NavigationMenu>
        <NavigationMenuList className="flex gap-6 items-center">
          <NavigationMenuItem>
            <Link
              to="/"
              className={`text-lg font-medium transition-colors ${isActive('/') ? '' : 'text-gray-700 hover:text-gray-900'
                }`}
              style={isActive('/') ? { color: '#43b149' } : {}}
            >
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="/chat"
              className={`text-lg font-medium transition-colors ${isActive('/chat') ? '' : 'text-gray-700 hover:text-gray-900'
                }`}
              style={isActive('/chat') ? { color: '#43b149' } : {}}
            >
              Chat
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="/about"
              className={`text-lg font-medium transition-colors ${isActive('/about') ? '' : 'text-gray-700 hover:text-gray-900'
                }`}
              style={isActive('/about') ? { color: '#43b149' } : {}}
            >
              About
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Avatar className="rounded-lg">
              <AvatarImage
                src="https://avatar.iran.liara.run/public/boy"
                alt="avatar"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
