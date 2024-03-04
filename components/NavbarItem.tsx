import React from 'react';

interface NavbarItemProps {
  label: string;
  active?: boolean;
  // 增加功能
  onClick?: () => void;
  // end
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, active,onClick}) => {
  return (
    <div onClick={onClick} className={active ? 'text-white cursor-default' : 'text-gray-500 hover:text-gray-300 cursor-pointer transition'}>
      {label}
    </div>
  )
}

export default NavbarItem;
