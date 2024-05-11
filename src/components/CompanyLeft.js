import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/images/gfpo_logo.webp';

function CompanyLeft(props) {
  const user = useSelector(store => store.user);
  const [openMenus, setOpenMenus] = useState([]);

  const handleToggleMenu = (menuIndex) => {
    const isOpen = openMenus.includes(menuIndex);
    if (isOpen) {
      setOpenMenus(openMenus.filter(index => index !== menuIndex));
    } else {
      setOpenMenus([...openMenus, menuIndex]);
    }
  };

  const isMenuOpen = (menuIndex) => {
    return openMenus.includes(menuIndex);
  };

  return (
    <div>
       
    </div>
  );
}

export default CompanyLeft;
