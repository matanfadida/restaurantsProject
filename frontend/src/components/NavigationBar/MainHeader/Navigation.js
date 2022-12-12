import MobileBar from "./MobileBar";
import classes from "./Navigation.module.css";
import DeskBar from "./DeskBar";

const Navigation = () => {
  return (
    <div className={classes.nav}>
      
      <DeskBar />
      <MobileBar />
    </div>
  );
};

export default Navigation;
