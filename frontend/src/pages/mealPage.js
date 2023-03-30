import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./mealPage.module.css";
import Stars from "../components/Rating/ratingStar";

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
    <div>
      <div className={classes.main}>
        <img
          className={classes.img}
          src={product.product.image}
          alt={product.product.name}
        ></img>

        <h1>{product.product.name}</h1>
        <h5>{product.product.detail}</h5>
        <h2>{`${product.product.price}₪`}</h2>
        <Stars value={product.product.rating} />
      </div>
      <div>
        {product.comments.map(comment => <p key={comment._id}>{comment.comment}</p>)}
      </div>
    </div>
  );
};

export default Meal;
