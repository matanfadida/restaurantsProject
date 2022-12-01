import { useParams } from "react-router-dom";
import style from "./home.module.css";
import ShowItem from "./list-items/show-item";


const Home = () => {

  const params = useParams()

  console.log("sdsdsd" + params.restaurantName)

  return (
    <div className={style["main-div"]}>
      <div className={style.cart}>
        <h2 className={style.welcome}>! ברוכים הבאים</h2>
        {params.restaurantName && <h2 className={style.welcome}>{params.restaurantName.toUpperCase()} מסעדת </h2>}
        {params.tableId && <h2 className={style.welcome}>שולחן מספר {params.tableId}</h2>}
        
      </div>
      <ShowItem />
    </div>
  );
};

export default Home;
