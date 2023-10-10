import { useState } from 'react';
import './NavBar.css'

const NavBar = () => {
  const [menuShow, setMenuShow] = useState(false);

  const toggleMenu = () => {
    setMenuShow(!menuShow);
    // change svg state
    if(menuShow) document.getElementById('reverse').beginElement();
    else document.getElementById('start').beginElement();
  }
  
  return (
    <div className='menu' onClick={toggleMenu}>
      <svg class="hb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" stroke="#303841" stroke-width=".6" fill="rgba(0,0,0,0)" stroke-linecap="round" style={{ cursor: "pointer", width: "50px" }}>
        <path d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7">
          <animate dur="0.2s" attributeName="d" values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7" fill="freeze" begin="start.begin" />
          <animate dur="0.2s" attributeName="d" values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7" fill="freeze" begin="reverse.begin" />
        </path>
        <rect width="10" height="10" stroke="none">
          <animate dur="2s" id="reverse" attributeName="width"/>
        </rect>
        <rect width="10" height="10" stroke="none">
          <animate dur="0.001s" id="start" attributeName="width" values="10;0" fill="freeze" />
          <animate dur="0.001s" attributeName="width" values="0;10" fill="freeze" begin="reverse.begin" />
        </rect>
      </svg>
      {menuShow ? <>
        <div className='blur'></div>
        <a href='#logo'>Home</a>
        <a href='#stepOne'>Steps</a>
        <a href='#contribute'>Contribute</a>
        <a href='#supported'>Supported Courses</a>
      </> : null}
    </div>
  );
}

export default NavBar;