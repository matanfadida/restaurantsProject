import classes from "./Footer.module.css";
import { AiOutlineInstagram, AiFillFacebook } from "react-icons/ai";
import { useEffect, useState } from "react";
const Footer = () => {
  const [socialMedia, setSocialMedia] = useState({
    instagram: "",
    facebook: "",
  });

  useEffect(() => {
    const fetchSocial = async () => {
      const response = await fetch(`/api/details/get-details`);
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      if (result != null) {
        setSocialMedia({
          facebook: result[0].facebook,
          instagram: result[0].instagram,
        });
      }
    };
    fetchSocial().catch((error) => {
      // setHasError(error.message || "Something went wrong!");
    });
  }, []);
  return (
    <div className={classes.footer}>
      <ul className={classes.list}>
        <li>
          <a href={socialMedia.instagram} target='_blank' rel="noreferrer">
            <AiOutlineInstagram size="40px" />
          </a>
        </li>
        <li>בקרו אותנו</li>
        <li>
          <a href={socialMedia.facebook} target='_blank' rel="noreferrer">
            <AiFillFacebook size="40px" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
