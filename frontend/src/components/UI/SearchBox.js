import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import classes from "./SearchBox.module.css";
import { useNavigate } from 'react-router-dom';
const SearchBox = () => {
  const [open, setClassName] = useState(false);
  const nameHandler = () => {
    setClassName(!open);
  };
  const navigate = useNavigate();

  
  const changeFilterHandler = (event) => {
    navigate(`/?filter=${event.target.value}`);
  };

  return (
    <div className={classes.box}>
      <div className={open ? classes.searchBoxOpen : classes.searchBox}>
        <input
          className={classes.input}
          type="text"
          placeholder="חפש כאן"
          onChange={changeFilterHandler}
        ></input>
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
