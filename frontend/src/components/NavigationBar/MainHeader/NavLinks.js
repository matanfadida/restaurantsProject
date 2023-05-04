import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

import { motion } from "framer-motion";
import { useState } from "react";
const NavLinks = (props) => {

  const closeMenuHandler = () => {
    if (props.isMobile) {
      props.closeMenu();
    }
  }
  

  const animateFrom = { opacity: 0, y: -40 };
  const animateTo = { opacity: 1, y: 0 };
  return (
    <ul className={classes.nav_ul}>
      <motion.li
        onClick={closeMenuHandler}
        initial={animateFrom}
        animate={animateTo}
        transition={{ delay: 0.1 }}
      >
        <NavLink to="/contact">צור קשר</NavLink>
      </motion.li>
      <motion.li
        onClick={closeMenuHandler}
        initial={animateFrom}
        animate={animateTo}
        transition={{ delay: 0.2 }}
      >
        <NavLink to="/table/1">השולחן-שלי</NavLink>
      </motion.li>
      <motion.li
        onClick={closeMenuHandler}
        initial={animateFrom}
        animate={animateTo}
        transition={{ delay: 0.3 }}
      >
        <NavLink to="/">תפריט</NavLink>
      </motion.li>
      
    </ul>
  );
};

export default NavLinks;
