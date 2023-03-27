import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import classes from "./mealPage.module.css";
import Stars from "../components/Rating/ratingStar";

const Meal = () => {
  const params = useParams();
  const [product, setProduct] = useState({
    nameValue: "פסטה רוזטו",
    priceValue: 56,
    detailValue: "פסטה מגעילה ברוטב עגבניות ונגיעות בזיליקום על מצע של חרא",
    imgValue: "https://img.mako.co.il/2017/03/28/DSC_0376_x5.jpg",
    flag: false,
    rating: 4,
  });
  //להוציא את המנה מהבסיס נתונים לפי מה שמקבלים בלינק params.productId

  return (
    <div className={classes.main}>
      <img
        className={classes.img}
        src={product.imgValue}
        alt={product.nameValue}
      ></img>

      <h1>{product.nameValue}</h1>
      <h5>{product.detailValue}</h5>
      <h2>{`${product.priceValue}₪`}</h2>
      <Stars value={product.rating} />
    </div>
  );
};

export default Meal;
