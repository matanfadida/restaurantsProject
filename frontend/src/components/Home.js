import style from "./home.module.css";
import ShowItem from "./list-items/show-item";
// import img from "./image-home-backgrond.jpg";

const Home = () => {
  return (
    <div className={style["main-div"]}>
      <div className={style.cart}>
        <h2 className={style.welcome}>! ברוכים הבאים</h2>
      </div>
      <ShowItem />
    </div>
  );
};

export default Home;
