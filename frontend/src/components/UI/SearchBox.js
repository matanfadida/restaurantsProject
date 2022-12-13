import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import classes from "./SearchBox.module.css";
const SearchBox = () => {
  const [open, setClassName] = useState(false);
  const nameHandler = () => {
    setClassName(!open);
  };
  return (
    <div className={classes.box}>
      <div className={open ? classes.searchBoxOpen : classes.searchBox}>
        <input className={classes.input} type="text" placeholder="חפש כאן"></input>
        <label
          className={open ? classes.iconOpen : classes.icon}
          id="check"
          onClick={nameHandler}
        >
          <i>
            <BsSearch />
          </i>
        </label>
      </div>
    </div>
  );
};

export default SearchBox;
