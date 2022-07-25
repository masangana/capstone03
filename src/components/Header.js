import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/style.scss';

function Header() {
return(
    <>
    <div className="header">
        <NavLink to="/"><li>Art</li></NavLink>
    </div>
     
    </>
  );
}
export default Header;