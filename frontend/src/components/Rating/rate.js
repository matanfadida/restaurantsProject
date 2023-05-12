import classes from "./rate.module.css";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  Link,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import Cart from "../UI/cart";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const Rate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const [newComment, setNewComment] = useState(false);
  const [text, setText] = useState("");
  const stars = Array(5).fill(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/get-product`, {
        method: "POST",
        body: JSON.stringify({
          id: params.productId,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      console.log(result);
      setProduct(result);
      setLoading(false);
    };
    fetchProduct().catch((error) => {
      setLoading(false);
    });
  }, [params.productId]);

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

  const submitHandler = async () => {
    const response = await fetch(`/api/update-rating/${params.productId}`, {
      method: "POST",
      body: JSON.stringify({
        rating: currentValue,
        comment: text,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Request failed!");
    }
    const result = await response.json();
    if(result === 'ok'){
      setNewComment(true);
    }
    else{
      alert('הייתה בעיה נסה/י שוב')
    }
  };

  const returnToTable = () => {
    navigate(-1);
  }

  if (newComment) {
    return (
      <div>
        <Cart><div>
        תגובתך התקבלה בהצלחה !
        <button onClick={returnToTable}>חזרה לשולחן</button>
          </div></Cart>
      </div>
    );
  }

  if (loading) {
    return <div>loading..</div>;
  }

  return (
    <div className={classes.container}>
      <h2> {product.name} </h2>
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
        placeholder="תנו את תגובתכם למנה "
        className={classes.textarea}
        onChange={textChangeHandler}
      />

      <button className={classes.rateButton} onClick={submitHandler}>הגב</button>

    </div>
  );
};

export default Rate;
