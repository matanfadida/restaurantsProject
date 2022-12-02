import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useInput from "../../hooks/use-input";
import Cart from "../../UI/cart";
import classes from "./add-product.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isBiggerThenZero = (value) => value > 0;

const AddProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState({
    nameValue: "",
    priceValue: "",
    detailValue: "",
    imgValue: "",
  });

  useEffect(() => {
    if (params.productId) {
      fetch(`/api/admin/edit-product/${params.productId}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((result) =>
          setProduct({
            nameValue: result.name,
            priceValue: result.price,
            detailValue: result.detail,
            imgValue: result.image,
          })
        )
        .catch((err) => console.log(err));
    }
  }, []);
//צריך לראות למה זה לא משנה את הנתונים מה שעשיתה שם תראה איך משנים יש את הנתונים הם מופיעים אבל אי אפשר לשנות תסדר את זה
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isNotEmpty);

  const {
    value: priceValue,
    isValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: priceReset,
  } = useInput(isBiggerThenZero);

  const {
    value: detailValue,
    isValid: detailIsValid,
    hasError: detailHasError,
    valueChangeHandler: detailChangeHandler,
    inputBlurHandler: detailBlurHandler,
    reset: detailReset,
  } = useInput(isNotEmpty);

  const {
    value: imgValue,
    isValid: imgIsValid,
    hasError: imgHasError,
    valueChangeHandler: imgChangeHandler,
    inputBlurHandler: imgBlurHandler,
    reset: imgReset,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (nameIsValid && priceIsValid && detailIsValid && imgIsValid) {
    formIsValid = true;
  }

  const resetForm = () => {
    imgReset();
    detailReset();
    nameReset();
    priceReset();
  };

  const addHandler = (event) => {
    event.preventDefault();
    const product = {
      name: nameValue,
      detail: detailValue,
      img: imgValue,
      price: priceValue,
    };
    if (params.productId) {
      console.log('Update')
      fetch("/api/admin/edit-product", {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "Content-Type": "application/json" },
      })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    }else{
      fetch("/api/admin/add-product", {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "Content-Type": "application/json" },
      })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    }
    
    resetForm();
  };

  const nameNameClasses = nameHasError ? "invalid" : "valid";
  const namePriceClasses = priceHasError ? "invalid" : "valid";
  const nameDetailClasses = detailHasError ? "invalid" : "valid";
  const nameImgClasses = imgHasError ? "invalid" : "valid";

  return (
    <Cart className={classes.main}>
      <form className={classes.form} onSubmit={addHandler}>
        <div className={classes[nameNameClasses]}>
          {nameHasError && (
            <p className={classes.error_text}>נא להכניס את שם המוצר</p>
          )}
          <input
            type="text"
            name="name"
            placeholder="שם המוצר"
            value={product.nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          ></input>
        </div>

        <div className={classes[nameImgClasses]}>
          {imgHasError && (
            <p className={classes.error_text}>נא להכניס קישור לתמונה</p>
          )}
          <input
            type="text"
            name="img"
            placeholder="קישור לתמונה"
            value={product.imgValue}
            onChange={imgChangeHandler}
            onBlur={imgBlurHandler}
          ></input>
        </div>

        <div className={classes[namePriceClasses]}>
          {priceHasError && (
            <p className={classes.error_text}> נא להכניס מחיר תקין</p>
          )}
          <input
            type="number"
            name="price"
            placeholder="מחיר המוצר"
            value={product.priceValue}
            onChange={priceChangeHandler}
            onBlur={priceBlurHandler}
          ></input>
        </div>

        <div className={classes[nameDetailClasses]}>
          {priceHasError && (
            <p className={classes.error_text}>נא להכניס את פרטי המוצר</p>
          )}
          <textarea
            type="text"
            name="detail"
            placeholder="פרטי המוצר"
            value={product.detailValue}
            onChange={detailChangeHandler}
            onBlur={detailBlurHandler}
          ></textarea>
        </div>

        <div className={classes.div}>
          <button type="submit" disabled={!formIsValid}>
            הוסף מוצר
          </button>
        </div>
      </form>
    </Cart>
  );
};

export default AddProduct;
