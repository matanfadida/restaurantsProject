import { useRef } from "react";
import Cart from "../UI/cart";
import classes from "./add-product.module.css";

const AddProduct = () => {
  const name = useRef();
  const detail = useRef();
  const img = useRef();
  const price = useRef();

  const addHandler = (event) => {
    event.preventDefault();
    const product = {
      name: name.current.value,
      detail: detail.current.value,
      img: img.current.value,
      price: price.current.value,
    };

    fetch("/api/admin/add-product", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    })
      .then(result => console.log(result))
      .catch((err) => console.log(err));
  };

  
  return (
    <Cart className={classes.main}>
      <form className={classes.form} onSubmit={addHandler}>
        <div>
          <input ref={name} type="text" placeholder="שם המנה" />
        </div>
        <div>
          <input ref={img} type="text" placeholder="קישור לתמונה" />
        </div>
        <div>
          <input ref={price} type="number" min={0} placeholder="הזן מחיר" />
        </div>
        <div>
          <textarea ref={detail} type="text" placeholder="פירוט" />
        </div>
        <div className={classes.div}>
          <button type="submit">הוסף מוצר</button>
        </div>
      </form>
    </Cart>
  );
};

export default AddProduct;
