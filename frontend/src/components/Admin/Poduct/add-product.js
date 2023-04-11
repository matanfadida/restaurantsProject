import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useInput from "../../hooks/use-input";
import Cart from "../../UI/cart";
import classes from "./add-product.module.css";
import Select from "react-select";

const isNotEmpty = (value) => value.trim() !== "";
const isNotEmptyArr = (value) => value.length > 0;
const isBiggerThenZero = (value) => value > 0;

const AddProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({
    nameValue: "",
    priceValue: "",
    detailValue: "",
    imgValue: "",
    category: [],
    flag: false,
  });
  const [category, setCategory] = useState([]);

  const [categoryHasError, setCategoryError] = useState(true);
  const [catagoryBlured, setCategoryBlured] = useState(false);
  const [catagoryIsValid, setCategoryIsValid] = useState(false);

  const categoryChangeHandler = (selected) => {
    setCategory(selected);

    setCategoryError(!isNotEmptyArr(selected));
  };

  const categoryBlurHandle = () => {
    setCategoryBlured(true);
  };

  
  // למשוך את הקטגוריות האמיתיות מהבסיס נתונים
  const categoryOptions = [
    { value: 1, label: "Apple" },
    { value: 2, label: "Banana" },
    { value: 3, label: "Orange" },
  ];

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
            flag: true,
          })
        )

        .catch((err) => console.log(err));
    }
  }, [params.productId]);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
    defaultValue: nameDefault,
  } = useInput(isNotEmpty);

  const {
    value: priceValue,
    isValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: priceReset,
    defaultValue: priceDefault,
  } = useInput(isBiggerThenZero);

  const {
    value: detailValue,
    isValid: detailIsValid,
    hasError: detailHasError,
    valueChangeHandler: detailChangeHandler,
    inputBlurHandler: detailBlurHandler,
    reset: detailReset,
    defaultValue: detailDefault,
  } = useInput(isNotEmpty);

  const {
    value: imgValue,
    isValid: imgIsValid,
    hasError: imgHasError,
    valueChangeHandler: imgChangeHandler,
    inputBlurHandler: imgBlurHandler,
    reset: imgReset,
    defaultValue: imgDefault,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (
    nameIsValid &&
    priceIsValid &&
    detailIsValid &&
    imgIsValid &&
    !categoryHasError
  ) {
    formIsValid = true;
  }

  const resetForm = () => {
    imgReset();
    detailReset();
    nameReset();
    priceReset();
  };

  const defaultValues = () => {
    nameDefault(product.nameValue);
    priceDefault(product.priceValue);
    detailDefault(product.detailValue);
    imgDefault(product.imgValue);
    setCategory(product.categoryValue);

    setProduct({
      ...product,
      flag: false,
    });
  };

  const addHandler = (event) => {
    event.preventDefault();
    const product = {
      name: nameValue,
      detail: detailValue,
      img: imgValue,
      price: Number(priceValue),
      flag: true,
    };
    if (params.productId) {
      console.log("Update");
      fetch("/api/admin/edit-product", {
        method: "POST",
        body: JSON.stringify({
          productId: params.productId,
          name: product.name,
          price: product.price,
          img: product.img,
          detail: product.detail,
          rating: product.rating,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    } else {
      console.log("else");
      fetch("/api/admin/add-product", {
        method: "POST",
        body: JSON.stringify({
          productId: params.productId,
          name: product.name,
          price: product.price,
          img: product.img,
          detail: product.detail,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    }

    resetForm();
    navigate("/admin");
  };

  const nameNameClasses = nameHasError ? "invalid" : "valid";
  const namePriceClasses = priceHasError ? "invalid" : "valid";
  const nameDetailClasses = detailHasError ? "invalid" : "valid";
  const nameImgClasses = imgHasError ? "invalid" : "valid";

  const nameCategoryClasses = categoryHasError ? "select" : "valid";

  if (product.flag === true) {
    defaultValues();
  }

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
            defaultValue={nameValue}
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
            defaultValue={imgValue}
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
            defaultValue={priceValue}
            onChange={priceChangeHandler}
            onBlur={priceBlurHandler}
          ></input>
        </div>

        <div>
          {categoryHasError && catagoryBlured && (
            <p className={classes.error_text}> נא לבחור לפחות קטגוריה אחת</p>
          )}
          <Select
            className={classes[nameCategoryClasses]}
            value={category.categoryValue}
            onChange={categoryChangeHandler}
            options={categoryOptions}
            isMulti
            onBlur={categoryBlurHandle}
          />
        </div>

        <div className={classes[nameDetailClasses]}>
          {detailHasError && (
            <p className={classes.error_text}>נא להכניס את פרטי המוצר</p>
          )}
          <textarea
            type="text"
            name="detail"
            placeholder="פרטי המוצר"
            defaultValue={detailValue}
            onChange={detailChangeHandler}
            onBlur={detailBlurHandler}
          ></textarea>
        </div>

        <div className={classes.div}>
          <button type="submit" disabled={!formIsValid}>
            {params.productId ? "עדכן מוצר" : " הוסף מוצר"}
          </button>
        </div>
      </form>
    </Cart>
  );
};

export default AddProduct;
