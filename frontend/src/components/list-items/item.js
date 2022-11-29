import Cart from "../UI/cart";
import { useContext, useState } from "react";
import CartContext from "../../state/buy-context";
const Item = (props) => {
  const ctx = useContext(CartContext);
  const [remark, setRemark] = useState("")
  const buttonAddItemHanlder = () => {
    ctx.AddItem({
      id: props.id,
      name: props.name,
      detail: props.detail,
      price: props.price,
      remark: remark,
      amount: props.amount,
    });
    setRemark("")
  };

  const remarkChangeHandler = (event) =>{
    setRemark(event.target.value)
  }

  return (
    <Cart>
      <li>
        <div>
          <h3>{props.name}</h3>
          <div>
            <p>{props.detail}</p>
          </div>
          <div>
            <h4>{`${props.price}₪`}</h4>
          </div>
          <input type="text" onChange={remarkChangeHandler} value={remark} placeholder="הערות לטבח"></input>
        </div>
        <button onClick={buttonAddItemHanlder}>+</button>
        <input type="number" min={0} placeholder="כמות" ></input>
        
      </li>
    </Cart>
  );
};

export default Item;
