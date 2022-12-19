import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

import { motion } from "framer-motion";
const NavLinks = (props) => {
  const closeMenuHandler = () => {
    if (props.isMobile) {
      props.closeMenu();
    }
  };
  const animateFrom = { opacity: 0, y: -40 };
  const animateTo = { opacity: 1, y: 0 };
  return (
    <ul>
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

    
    </ul>
  );
};

export default NavLinks;
