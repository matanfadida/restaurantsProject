import { useReducer } from "react";
import CartContext from "./buy-context";

const initialCartState = {
  items: [],
  totalAmount: 0,
};

const CartReducer = (state, action) => {
  if (action.state === "ADD") {
    const updateItems = state.items.concat(action.item);
    const updateTotalAmount = state.totalAmount + action.item.price;
    return { items: updateItems, totalAmount: updateTotalAmount };
  }
  if (action.state === "Remove") {
    const updateItems = state.items.concat(action.item);
    const updateTotalAmount = state.totalAmount + action.item.price;
    return { items: updateItems, totalAmount: updateTotalAmount };
  }
  return initialCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(CartReducer, initialCartState);
  const AddItemHandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };
  const RemoveItemHandler = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    AddItem: AddItemHandler,
    RemoveItem: RemoveItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
