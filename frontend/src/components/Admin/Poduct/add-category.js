import { useEffect, useState } from "react";
import Cart from "../../UI/cart";
import classes from "./add-category.module.css";
import Select from "react-select";

const AddCategory = () => {
  const [category, setCategory] = useState();
  const [currentCategories, setCurrentCategories] = useState([]);

  const [reload, setReload] = useState(0);

  const [deleteCategory, setDeleteCategory] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`/api/category/get-category`);
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      setCurrentCategories(result);
    };
    fetchCategories().catch((error) => {
      // setLoading(false);
      // setHasError(error.message || "Something went wrong!");
    });
  }, [reload]);

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
  };

  const addToBackHandler = async () => {
    const response = await fetch(`/api/category/add-category`, {
      method: "POST",
      body: JSON.stringify({ categories: category }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Request failed!");
    }
    const result = await response.json();
    setCategory([]);
    setReload(reload + 1);
  };

  const handleDeleteCategoryChange = (selected) => {
    setDeleteCategory(selected);
  };

  const deleteFromBackHandler = () => {};
  return (
    <div className={classes.div}>
      <Cart>
        <label htmlFor="category-input">:נא לבחור קטגוריות להוספה</label>
        <Select
          value={category}
          onChange={handleCategoryChange}
          options={options.filter(
            (item) => !currentLabels.includes(item.label)
          )}
          isMulti
        />
        <button className={classes.button} onClick={addToBackHandler}>
          הוסף
        </button>
      </Cart>

      <Cart>
        <label htmlFor="category-input">:נא לבחור קטגוריות למחיקה</label>
        <Select
          value={deleteCategory}
          onChange={handleDeleteCategoryChange}
          options={options.filter(
            (item) => currentLabels.includes(item.label)
          )}
          isMulti
        />
        <button className={classes.button} onClick={deleteFromBackHandler}>
          מחק
        </button>
      </Cart>
    </div>
  );
};

export default AddCategory;
