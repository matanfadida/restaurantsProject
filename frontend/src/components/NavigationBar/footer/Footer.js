import classes from "./Footer.module.css";
import { AiOutlineInstagram, AiFillFacebook } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
const Footer = () => {
  const links = {
    instagram: "https://www.instagram.com/cafe_cafe_official/",
    facebook: "https://www.facebook.com/cafe.cafe.il/?locale=he_IL",
  };
  return (
    <div className={classes.footer}>
      <ul className={classes.list}>
        <li>
          <a href={links.instagram}>
            <AiOutlineInstagram size="40px" />
          </a>
        </li>
<li>בקרו אותנו</li>
        <li>
          <a href={links.facebook}>
            <AiFillFacebook size="40px" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
