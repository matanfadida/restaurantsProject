import { useEffect, useReducer, useState } from "react";
import CartContext from "./buy-context";

const initialCartState = {
  items: [],
  totalAmount: 0,
  itemsToBack: [],
};

const CartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id && item.remark === action.item.remark)
    const existingCartItem = state.items[existingCartItemIndex]
    let updateItems;
    let itemsToBack = state.itemsToBack.concat(action.item);
    if(existingCartItem){
      const updateItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount
      }
      updateItems = [...state.items];//copy list
      updateItems[existingCartItemIndex] = updateItem;//update
    }
    else{
      updateItems = state.items.concat(action.item);
    }
    return { items: updateItems, totalAmount: updateTotalAmount, itemsToBack };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    const updateTotalAmount = state.totalAmount - +existingCartItem.price;
    let updateItems;
    let itemsToBack;
    itemsToBack = state.itemsToBack.filter((item) => item.guid_id !== action.guid_id);//remove the item
    console.log(itemsToBack);
    if(existingCartItem.amount === 1){
      updateItems = state.items.filter((item) => item.id !== action.id);//remove the item
    }else{
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updateItems = [...state.items];//copy list
      updateItems[existingCartItemIndex] = updateItem;//update
    }
      console.log(updateItems);
      return { items: updateItems, totalAmount: updateTotalAmount, itemsToBack };
  }
  if (action.type === "REMOVEALL") {
    return initialCartState;
  }
  return initialCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(CartReducer, initialCartState);
  const [showCartButton, setShowCartButton] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const fetchProduct = async() => {
      const response = await fetch(`/api/auth/get-status-admin`);
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      setIsLogged(result);
    };
    fetchProduct().catch((error) => {
    });
  }, []);

  const setIsLoggedHandler = (value) => {
    setIsLogged(value)
  }

  const AddItemHandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };

  const RemoveItemHandler = (id, guid_id) => {
    dispatchCart({ type: "REMOVE", id: id, guid_id });
  };

  const cartShowHandler = () => {
    setShowCartButton(!showCartButton)
  };

  const RemoveAllHandler = () => {
    dispatchCart({ type: "REMOVEALL"});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    AddItem: AddItemHandler,
    RemoveItem: RemoveItemHandler,
    cartShowhandler:cartShowHandler,
    RemoveAll: RemoveAllHandler,
    cartShow:showCartButton,
    isLogged,
    setIsLoggedHandler,
    itemsToBack: cartState.itemsToBack,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
