import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import classes from "./mealPage.module.css";
import Stars from "../components/Rating/ratingStar";
import Comment from "./comment";

import CartContext from "../state/buy-context";
import { ImPlus, ImMinus } from "react-icons/im";
import { BiRestaurant } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";

const Meal = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const ctx = useContext(CartContext);
  const [remark, setRemark] = useState("");
  const [amount, setAmount] = useState(1);

  const buttonAddItemHanlder = () => {
    ctx.AddItem({
      id: params.productId,
      guid_id: uuidv4(),
      name: product.product.name,
      detail: product.product.detail,
      price: product.product.price,
      remark: remark,
      amount: +amount,
      status: "נשלח לטבח",
    });
    setRemark("");
    setAmount(1);
  };

  const remarkChangeHandler = (event) => {
    setRemark(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };
  const plusHanlder = () => {
    const temp = amount + 1;
    setAmount(temp);
  };

  const minusHanlder = () => {
    const temp = amount - 1;
    setAmount(temp);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/get-product`, {
        method: "POST",
        body: JSON.stringify({
          id: params.productId,
          getComment: true,
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

  if (loading) {
    return <div>loading..</div>;
  }

  return (
    <div className={classes.main}>
      <img
        className={classes.img}
        src={product.product.image}
        alt={product.product.name}
      ></img>

      <h1>{product.product.name}</h1>
      <h5>{product.product.detail}</h5>
      <h2>{`${product.product.price}₪`}</h2>

      <div className={classes.rate}>
        <div className={classes.stars}>
          <Stars value={product.product.rating} />
        </div>
        {product.comments.map((comment) => (
          <Comment key={comment._id} comment={comment.comment} />
        ))}
      </div>

      <div>
        <input
          className={classes.remark}
          type="text"
          onChange={remarkChangeHandler}
          value={remark}
          placeholder="הערות לטבח"
        ></input>
      </div>
      <div className={classes.div}>
        <div>
          <button
            className={classes.plus_button}
            onClick={buttonAddItemHanlder}
          >
            הוסף
            <BiRestaurant />
          </button>
          <button className={classes.plus_button} onClick={plusHanlder}>
            <ImPlus />
          </button>
          <input
            className={classes.amount}
            value={amount}
            type="number"
            min={0}
            onChange={amountChangeHandler}
          ></input>
          <button className={classes.plus_button} onClick={minusHanlder}>
            <ImMinus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Meal;
