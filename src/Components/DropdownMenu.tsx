import { Menu} from '@mantine/core';
import React from 'react';

function CustomMenu({ options, isOpen, onClose }) {
  return (
    <Menu shadow="md" width={200} opened={isOpen} onClose={onClose}>
      <Menu.Dropdown>
        {options.map((option, index) => (
          <React.Fragment key={index}>
            {option.label && <Menu.Label>{option.label}</Menu.Label>}
            <Menu.Item icon={option.icon} rightSection={option.rightSection}>
              {option.text}
            </Menu.Item>
            {option.divider && <Menu.Divider />}
          </React.Fragment>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default CustomMenu;