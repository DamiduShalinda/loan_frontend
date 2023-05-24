import React, { useState } from 'react';
import { Menu, X} from 'lucide-react';
import { menuItems } from './Data/menuitems';
import { DropdownMenu } from './DropdownMenu';
import { MobileMenuItem } from './MobileMenuItem';


export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="-text-hasaru-yellow font-bold tracking-widest">Hasaru Enterprices</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {menuItems.map((item) => (
                  <DropdownMenu key={item.name} item={item} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex -mr-2 md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:-text-hasaru-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <MobileMenuItem key={item.name} item={item} />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

