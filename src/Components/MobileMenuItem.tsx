import {  ChevronRight } from 'lucide-react';
import {  MenuItem } from './Data/menuitems';
import { useState } from 'react';



export const MobileMenuItem: React.FC<{ item: MenuItem }> = ({ item }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
      <div className="relative">
        <button
          onClick={toggleMenu}
          type="button"
          className="text-gray-300  hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          {item.name}
          {item.subItems && (
            <ChevronRight className="h-5 w-5 ml-2 inline-flex" aria-hidden="true" />
          )}
        </button>
        {isMenuOpen && item.subItems && (
          <div className="pl-4">
            {item.subItems.map((subItem) => (
              <a
                key={subItem.name}
                href={subItem.href}
                className="text-gray-300  hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {subItem.name}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };
