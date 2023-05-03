import classes from "./category.module.css";
import { BiDrink } from "react-icons/bi";
import { BsCupHotFill, BsCupStraw } from "react-icons/bs";
import { TbSalad, TbMeat, TbCooker, TbBowl } from "react-icons/tb";
import {
  GiBurningEmbers,
  GiCupcake,
  GiDrinkMe,
  GiFullPizza,
  GiHamburger,
} from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { SiFoodpanda } from "react-icons/si";
import { CiBowlNoodles } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Category = () => {
  const [realCategories, setRealCategories] = useState([])

  const categories = [
    { value: 1, label: "עיקריות", icon: <MdOutlineRestaurantMenu size="30px" />,},
    { value: 2, label: "מנות פתיחה", icon: <TbBowl size="30px" /> },
    { value: 3, label: "קינוחים", icon: <GiCupcake size="30px" /> },
    { value: 4, label: "שתיה", icon: <BsCupStraw size="30px" /> },
    { value: 5, label: "שתיה חריפה", icon: <GiDrinkMe size="30px" /> },
    { value: 6, label: "קוקטלים", icon: <BiDrink size="30px" /> },
    { value: 7, label: "פסטות", icon: <CiBowlNoodles size="30px" /> },
    { value: 8, label: "פיצות", icon: <GiFullPizza size="30px" /> },
    { value: 9, label: "מיוחדים", icon: <GiBurningEmbers size="30px" /> },
    { value: 10, label: "ילדים", icon: <SiFoodpanda size="30px" /> },
    { value: 11, label: "שתיה חמה", icon: <BsCupHotFill size="30px" /> },
    { value: 12, label: "המבורגרים", icon: <GiHamburger size="30px" /> },
    { value: 13, label: "מאפים", icon: <TbCooker size="30px" /> },
    { value: 14, label: "בשרים", icon: <TbMeat size="30px" /> },
    { value: 15, label: "סלטים", icon: <TbSalad size="30px" /> },
  ];


  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`/api/category/get-category`);
        if (!response.ok) {
          throw new Error("Request failed!");
        }
        const result = await response.json();
        setRealCategories(result);
    };
    fetchCategories().catch((error) => {
      // setLoading(false);
      // setHasError(error.message || "Something went wrong!");
    });
  }, []);

  const commonObjects = categories.filter((obj1) =>
    realCategories.some((obj2) => obj2.value === obj1.value)
  );

  const navigate = useNavigate();
  

  const CategoryHandle = (value) => {
    navigate(`/?category=${value}`)
  };
  return (
    <div className={classes.list_container}>
      <ul className={classes.list}>
        {commonObjects.map((item) => (
          <li
            className={classes.li}
            key={item.value}
            onClick={(event) => CategoryHandle(item.value)}
          >
            <div className={classes.item}>{item.icon}</div>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
