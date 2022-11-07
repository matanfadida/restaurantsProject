import { useReducer, useState } from "react";
import CartContext from "./buy-context";

const initialCartState = {
  items: [],
  totalAmount: 0,
};

const CartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateItems = state.items.concat(action.item);
    const updateTotalAmount = state.totalAmount + action.item.price;
    return { items: updateItems, totalAmount: updateTotalAmount };
  }
  if (action.type === "Remove") {
    const updateItems = state.items.concat(action.item);
    const updateTotalAmount = state.totalAmount + action.item.price;
    return { items: updateItems, totalAmount: updateTotalAmount };
  }
  return initialCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(CartReducer, initialCartState);
  const [showCartButton, setShowCartButton] = useState(false);

  const AddItemHandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };

  const RemoveItemHandler = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };

  const cartShowHandler = () => {
    setShowCartButton(!showCartButton)
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    AddItem: AddItemHandler,
    RemoveItem: RemoveItemHandler,
    cartShowhandler:cartShowHandler,
    cartShow:showCartButton,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
