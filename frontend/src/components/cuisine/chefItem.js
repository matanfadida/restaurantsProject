import Cart from "../UI/cart";
import classes from "./chefItem.module.css";
import ChefProduct from "./chefProduct";

const ChefItem = (props) => {
  return (
    <Cart>
      <div>
        <h2>{props.table} שולחן מספר</h2>
        <div className={classes.item}>
          <ul>
            {props.products.map((product) =>
              Array.from(Array(product.amount).keys())
                .map((i) => i + 1)
                .map(() => <ChefProduct orderId={props.orderId} key={product.guid_id} product={product} />)
            )}
          </ul>
        </div>
      </div>
    </Cart>
  );
};

export default ChefItem;
