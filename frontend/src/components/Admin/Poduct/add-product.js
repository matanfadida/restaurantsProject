import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useInput from "../../hooks/use-input";
import Cart from "../../UI/cart";
import classes from "./add-product.module.css";
import Select from "react-select";

const isNotEmpty = (value) => value !== undefined ? value.trim() !== "" : "";
const isBiggerThenZero = (value) => value > 0;

const AddProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({
    nameValue: "",
    priceValue: "",
    detailValue: "",
    imgValue: "",
    rating: 0,
    category: "",
    flag: false,
  });

  const [categoryOptions, setcCategoryOptions] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`/api/category/get-category`);
        if (!response.ok) {
          throw new Error("Request failed!");
        }
        const result = await response.json();
        setcCategoryOptions(result.map((item) => (
          <option value={item.value} key={item._id}>{item.label}</option>
        )));
        // console.log(result);
        // categories = categoryOptions.
    };
    fetchCategories().catch((error) => {
      // setLoading(false);
      // setHasError(error.message || "Something went wrong!");
    });
  }, []);

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
            rating: result.rating,
            category: result.category,
            flag: true,
          })
        )

        .catch((err) => console.log(err));
    }
  }, [params.productId]);

  const {
    value: categoryValue,
    isValid: categoryIsValid,
    hasError: categoryHasError,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
    reset: categoryReset,
    defaultValue: categoryDefault,
  } = useInput(isNotEmpty);

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
    categoryIsValid
  ) {
    formIsValid = true;
  }

  const resetForm = () => {
    imgReset();
    detailReset();
    nameReset();
    priceReset();
    categoryReset();
  };

  const defaultValues = () => {
    nameDefault(product.nameValue);
    priceDefault(product.priceValue);
    detailDefault(product.detailValue);
    imgDefault(product.imgValue);
    categoryDefault(product.categoryValue);

    setProduct({
      ...product,
      flag: false,
    });
  };

  const addHandler = (event) => {
    event.preventDefault();
    const Newproduct = {
      name: nameValue,
      detail: detailValue,
      img: imgValue,
      price: Number(priceValue),
      rating: params.productId ? product.rating : 0,
      category: categoryValue,
      flag: true,
    };
    if (params.productId) {
      console.log("Update");
      fetch("/api/admin/edit-product", {
        method: "POST",
        body: JSON.stringify({
          productId: params.productId,
          name: Newproduct.name,
          price: Newproduct.price,
          img: Newproduct.img,
          detail: Newproduct.detail,
          rating: Newproduct.rating,
          category: Newproduct.category,
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
          name: Newproduct.name,
          price: Newproduct.price,
          img: Newproduct.img,
          detail: Newproduct.detail,
          category: Newproduct.category,
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

  const nameCategoryClasses = categoryHasError ? "invalid" : "valid";

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

        <div className={classes[nameCategoryClasses]}>
          {categoryHasError && (
            <p className={classes.error_text}> נא לבחור קטגוריה אחת</p>
          )}
          <select
            value={categoryValue}
            onChange={categoryChangeHandler}
            onBlur={categoryBlurHandler}
          >
            <option value="">בחר קטגוריה</option>
            {categoryOptions}
          </select>
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
