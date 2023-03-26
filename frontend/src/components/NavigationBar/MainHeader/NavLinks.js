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

      <motion.li
        initial={animateFrom}
        animate={animateTo}
        transition={{ delay: 0.3 }}
      >
        <button onClick={categoryHandler} className={classes.category}>
          קטגוריות
        </button>
        {category && (
          <div className={classes.cat}>
            <div>
              <NavLink to="/admin" onClick={closeMenuHandler}>תפריט</NavLink>
            </div>
            <div>
              <NavLink to="/admin" onClick={closeMenuHandler}>תפריט</NavLink>
            </div>
            <div>
              <NavLink to="/admin" onClick={closeMenuHandler}>תפריט</NavLink>
            </div>
            
           
          </div>
        )}
      </motion.li>
    </ul>
  );
};

export default NavLinks;
