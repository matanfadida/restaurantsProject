import style from "./home.module.css";
// import img from "./image-home-backgrond.jpg";

const Home = () => {
  return (
    <div>
      <img
        src="./image-home-backgrond.jpg"
        alt="home-backgrond"
        class={style["image-background"]}
      />
    </div>
  );
};

export default Home;
