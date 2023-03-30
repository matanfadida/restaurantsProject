import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

import { motion } from "framer-motion";
import { useState } from "react";
const NavLinks = (props) => {
  const [category, setCategory] = useState(false);
  

  

  const closeMenuHandler = () => {
    if (props.isMobile) {
      props.closeMenu();
    }
  };

  const categoryHandler = () => {
    const temp = !category;
    setCategory(temp);
  };

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
        <NavLink className={classes.active} to="/#שולחןשלי">
          השולחן-שלי
        </NavLink>
      </motion.li>
      <motion.li
        onClick={closeMenuHandler}
        initial={animateFrom}
        animate={animateTo}
        transition={{ delay: 0.2 }}
      >
        <NavLink className={classes.active} to="/">
          תפריט
        </NavLink>
      </motion.li>
      

      <motion.li
        initial={animateFrom}
        animate={animateTo}
        transition={{ delay: 0.3 }}
      >
        <button onClick={categoryHandler}>
          קטגוריות
        </button>
        {category && (
          <ul>
            <li>
              <NavLink to="/admin" onClick={closeMenuHandler}>
               1 תפריט
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" onClick={closeMenuHandler}>
               2 תפריט
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" onClick={closeMenuHandler}>
               3 תפריט
              </NavLink>
            </li>
          </ul>
        )}
      </motion.li>
      <motion.li>
        
      </motion.li>
    </ul>
  );
};

export default NavLinks;
