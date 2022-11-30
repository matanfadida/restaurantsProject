import { useRef } from "react";
import classes from "./add-product.module.css";

const AddProduct = () => {
  const name = useRef();
  const detail = useRef();
  const link = useRef();
  const price = useRef();

  const addHandler = (event) => {
    event.preventDefault();
    const product = {
      name: name.current.value,
      detail: detail.current.value,
      link: link.current.value,
      price: price.current.value,
    };

    //המנה מוכנה תוסיף לבסיס נתונים
  };
  return (
    <div className={classes.main}>
      <form className={classes.form} onSubmit={addHandler}>
        <div>
          <input ref={name} type="text" placeholder="שם המנה" />
          {/* <label name="name">שם מנה</label> */}
        </div>
        <div>
          <input ref={detail} type="text" placeholder="פירוט" />
          {/* <label name="detail">פרטים</label> */}
        </div>
        <div>
          <input ref={link} type="text" placeholder="קישור לתמונה" />
          {/* <label name="link">קישור לתמונה</label> */}
        </div>
        <div>
          <input ref={price} type="number" min={0} placeholder="הזן מחיר" />
          {/* <label name="price" >מחיר</label> */}
        </div>
        <div>
          <button type="submit">הוסף מוצר</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
