import {  ChevronDown } from 'lucide-react';
import {  MenuItem } from './Data/menuitems';
import { useState } from 'react';

export const DropdownMenu: React.FC<{ item: MenuItem  }> = ({ item }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        type="button"
        className="text-gray-300 hover:-text-hasaru-yellow px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:-text-hasaru-yellow"
      >
        {item.name}
        {item.subItems && (
          <ChevronDown className="h-4 w-4 ml-1 inline-flex" aria-hidden="true" />
        )}
      </button>
      {isMenuOpen && item.subItems && (
        <div className="absolute z-10 mt-2 w-40 rounded-md bg-white shadow-lg">
          <div className="py-1">
            {item.subItems.map((subItem) => (
              <a 
                key={subItem.name}
                href={subItem.href}
                className="block px-4 py-2 text-sm text-white font-extralight hover:bg-yellow-200 rounded-md hover:text-black"
              >
                {subItem.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};