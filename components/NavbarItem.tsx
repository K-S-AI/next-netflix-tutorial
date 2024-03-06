import React from 'react';
import { useRouter } from 'next/router';
import e from 'express';

interface NavbarItemProps {
  label: string;
  active?: boolean;
  // 增加功能
  onClick?: () => void;
  // end
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, active,onClick}) => {
  const router = useRouter();
  
  const handleNavigation = () => {
    if (label === 'Home') {
      router.push('/');
    } else if (label === 'Films') {
      router.push('/films');
    }
    else if (label === 'My List') {
      router.push('/mylist');
    }
  };

  return (
    <div onClick={() => { 
      handleNavigation(); 
      if (onClick) {
        onClick();
      }
    }}  className={active ? 'text-white cursor-default' : 'text-gray-500 hover:text-gray-300 cursor-pointer transition'}>
      {label}
    </div>
  )
}

export default NavbarItem;
