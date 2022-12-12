import classes from "./Navigation.module.css";
import NavLinks from "./NavLinks";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const MobileBar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const menuHandler = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const hamburgerIcon = (
    <GiHamburgerMenu
      className={classes.hamburger}
      size="40px"
      color="white"
      onClick={menuHandler}
    />
  );

  const closeIcon = (
    <AiOutlineCloseCircle
      className={classes.hamburger}
      size="40px"
      color="white"
      onClick={menuHandler}
    ></AiOutlineCloseCircle>
  );
  return (
    <nav className={classes.mobileNav}>
      {menuIsOpen ? closeIcon : hamburgerIcon}
      {menuIsOpen && <NavLinks closeMenu={menuHandler} isMobile={true}/>}
    </nav>
  );
};

export default MobileBar;
