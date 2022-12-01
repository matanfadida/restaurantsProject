import useInput from "../hooks/use-input";
import Cart from "../UI/cart";
import classes from "./add-product.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isBiggerThenZero = (value) => value > 0;

const AddProduct = () => {
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

    fetch("/api/admin/add-product", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));

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
            value={nameValue}
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
            value={imgValue}
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
            value={priceValue}
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
            value={detailValue}
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
