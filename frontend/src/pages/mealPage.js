import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./mealPage.module.css";
import Stars from "../components/Rating/ratingStar";
import Comment from "./comment";

const Meal = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/get-product`, {
        method: "POST",
        body: JSON.stringify({
          id: params.productId,
          getComment: true,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();

      console.log(result);
      setProduct(result);
      setLoading(false);
    };
    fetchProduct().catch((error) => {
      setLoading(false);
    });
  }, [params.productId]);

  if (loading) {
    return <div>loading..</div>;
  }

  return (
    <div className={classes.main}>
      <img
        className={classes.img}
        src={product.product.image}
        alt={product.product.name}
      ></img>

      <h1>{product.product.name}</h1>
      <h5>{product.product.detail}</h5>
      <h2>{`${product.product.price}₪`}</h2>

      <div className={classes.rate}>
        <div className={classes.stars}>
          <Stars value={product.product.rating} />
        </div>
        {product.comments.map((comment) => (
          <Comment key={comment._id} comment={comment.comment} />
        ))}
      </div>
    </div>
  );
};

export default Meal;
