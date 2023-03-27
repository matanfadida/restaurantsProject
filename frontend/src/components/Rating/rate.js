import classes from "./rate.module.css";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const Rate = () => {
  const params = useParams();

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [text, setText] = useState("");
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const textChangeHandler = (event) => {
    setText(event.target.value);
  };

  const submitHandler = () => {
    // params.productId ךהוסיף דירוג למנה עפ"י
    console.log(text, currentValue)
  };

  return (
    <div className={classes.container}>
      <h2> שם המנה </h2>
      <div className={classes.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>
      <textarea
        placeholder="What's your experience?"
        className={classes.textarea}
        onChange={textChangeHandler}
      />

      <button className={classes.button} onClick={submitHandler}>
        Submit
      </button>
    </div>
  );
};

export default Rate;
