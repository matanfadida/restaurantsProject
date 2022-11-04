import Cart from "../UI/cart";
import { useContext } from "react";
import CartContext from "../../state/buy-context";
const Item = (props) => {
  const ctx = useContext(CartContext);
  const buttonAddItemHanlder = () => {
    console.log("test")
    ctx.AddItem({
      id: props.id,
      name: props.name,
      detail: props.detail,
      price: props.price,
    });
  };
  return (
    <Cart>
      <li>
        <div>
          <h3>{props.name}</h3>
          <div>
            <p>{props.detail}</p>
          </div>
          <div>
            <h4>{props.price}</h4>
          </div>
        </div>
        <button onClick={buttonAddItemHanlder}>+</button>
      </li>
    </Cart>
  );
};

export default Item;
