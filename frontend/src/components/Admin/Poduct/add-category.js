import { useState } from "react";
import Cart from "../../UI/cart";
import classes from "./add-category.module.css";
import Select from "react-select";

const AddCategory = () => {
  const [category, setCategory] = useState();

  const currentCategories = [{ value: "apple123", label: "Apple" }]; //להוציא את הרשימה של הקטגוריות מהבסיס נתונים

  const currentLabels = currentCategories.map((item) => item.label);

  const options = [
    { value: 1, label: "עיקריות" },
    { value: 2, label: "מנות פתיחה" },
    { value: 3, label: "קינוחים" },
    { value: 4, label: "שתיה" },
    { value: 5, label: "שתיה חריפה" },
    { value: 6, label: "קקוטלים" },
    { value: 7, label: "פסטות" },
    { value: 8, label: "פיצות" },
    { value: 9, label: "מיוחדים" },
    { value: 10, label: "ילדים" },
    { value: 11, label: "שתיה חמה" },
    { value: 12, label: "המבורגרים" },
    { value: 13, label: "מאפים" },
    { value: 14, label: "בשרים" },
    { value: 15, label: "סלטים" },
  ];

  const handleCategoryChange = (selected) => {
    setCategory(selected);
    //להוסיף לבסיס נתונים את הרשימה של מה שנבחר שים לב שזה מערך של אוביקטים ולא רק אחד
  };
  return (
    <Cart className={classes.container}>
      <label htmlFor="category-input">:נא לבחור קטגוריות להוספה</label>
      <Select
        value={category}
        onChange={handleCategoryChange}
        options={options.filter((item) => !currentLabels.includes(item.label))}
        isMulti
      />
    </Cart>
  );
};

export default AddCategory;
