import { useEffect, useReducer, useState } from "react";
import CartContext from "./buy-context";
import Cookies from "js-cookie";

const initialCartState = {
  items: [],
  totalAmount: 0,
  itemsToBack: [],
  itemsCookie: [],
};

const CookiesHandler = (state, action) => {
  let itemsCookie;
  
  if (Cookies.get("cart") !== undefined) {
    const cookiesItems = JSON.parse(Cookies.get("cart"));
    const isNotIn = cookiesItems.find(
      (item) => item.guid_id === action.item.guid_id
    );

    if (isNotIn === undefined) {
      state.itemsCookie = cookiesItems;
      itemsCookie = state.itemsCookie.concat({
        id: action.item.id,
        guid_id: action.item.guid_id,
        remark: action.item.remark,
        amount: action.item.amount,
      });
      Cookies.set("cart", JSON.stringify(itemsCookie));
    }
  } else {
    itemsCookie = state.itemsCookie.concat({
      id: action.item.id,
      guid_id: action.item.guid_id,
      remark: action.item.remark,
      amount: action.item.amount,
    });
    Cookies.set("cart", JSON.stringify(itemsCookie));
  }
  return itemsCookie;
};

const CartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id && item.remark === action.item.remark
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updateItems;
    console.log('sad')
    let itemsCookie = CookiesHandler(state, action);
    let itemsToBack = state.itemsToBack.concat(action.item);
    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updateItems = [...state.items]; //copy list
      updateItems[existingCartItemIndex] = updateItem; //update
    } else {
      updateItems = state.items.concat(action.item);
    }
    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
      itemsToBack,
      itemsCookie,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.guid_id === action.guid_id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    const updateTotalAmount = state.totalAmount - +existingCartItem.price;
    let updateItems;
    let itemsToBack;
    itemsToBack = state.itemsToBack.filter(
      (item) => item.guid_id !== action.guid_id
    ); //remove the item
    console.log(itemsToBack);
    if (existingCartItem.amount === 1) {
      updateItems = state.items.filter(
        (item) => item.guid_id !== action.guid_id
      ); //remove the item
    } else {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updateItems = [...state.items]; //copy list
      updateItems[existingCartItemIndex] = updateItem; //update
    }
    return { items: updateItems, totalAmount: updateTotalAmount, itemsToBack };
  }
  if (action.type === "REMOVEALL") {
    Cookies.set("cart", JSON.stringify([]));
    return initialCartState;
  }
  return initialCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(CartReducer, initialCartState);
  const [showCartButton, setShowCartButton] = useState(false);
  const [, setItemFromCookie] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const convertFromCooikes = async () => {
    const cartCookie = JSON.parse(Cookies.get("cart"));
    console.log("from coo", cartCookie);
    let newArrayItems = [];
    let updateTotalAmount = 0;

    const response = await fetch("/api");
    if (!response.ok) {
      throw new Error("Request failed!");
    }
    const result = await response.json();
    cartCookie.forEach((item) => {
      let productExisting = result.find((product) => product._id === item.id);
      if (productExisting !== undefined) {
        newArrayItems = [
          ...newArrayItems.concat({
            id: item.id,
            guid_id: item.guid_id,
            detail: productExisting.detail,
            image: productExisting.image,
            name: productExisting.name,
            price: productExisting.price,
            rating: productExisting.rating,
            remark: item.remark,
            amount: item.amount,
            counterRating: productExisting.counterRating
          }),
        ];
        updateTotalAmount += productExisting.price * item.amount;
        console.log(newArrayItems)
      }
    });
    setItemFromCookie(newArrayItems);
    newArrayItems.forEach((cookieItem) => {
      const existingCartItemIndex = initialCartState.items.findIndex(
        (item) => item.id === cookieItem.id && item.remark === cookieItem.remark
      );
      const existingCartItem = initialCartState.items[existingCartItemIndex];
      let updateItems;
      if (existingCartItem) {
        const updateItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + cookieItem.amount,
        };
        updateItems = [...initialCartState.items]; //copy list
        updateItems[existingCartItemIndex] = updateItem; //update
      } else {
        updateItems = initialCartState.items.concat(cookieItem);
      }
      initialCartState.items = updateItems;
      initialCartState.totalAmount = updateTotalAmount;
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (Cookies.get("cart") !== undefined && !isLoading) {
        convertFromCooikes();
      }
    };
    fetchProduct().catch((error) => {});
  }, [isLoading]);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      const response = await fetch(`/api/auth/get-status-admin`);
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      setIsLoggedHandler(result);
      setIsLoading(false);
    };

    fetchAdminStatus().catch((error) => {
      setIsLoading(false);
    });
  }, []);

  const setIsLoggedHandler = (value) => {
    setIsLogged(value);
  };

  const AddItemHandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };

  const UpdateCookieItemHandler = (itemUpdate) => {
    let itemsCookie;
    const cookiesItems = JSON.parse(Cookies.get("cart"));
      const product = cookiesItems.find(
        (item) => item.guid_id === itemUpdate.guid_id
      );
        console.log(itemUpdate);
      if(product !== undefined){
        product.amount = itemUpdate.amount;
        itemsCookie = cookiesItems.filter(item => item.guid_id !== itemUpdate.guid_id)
        itemsCookie = itemsCookie.concat(product)
        Cookies.set("cart", JSON.stringify(itemsCookie));
      }
  };

  const RemoveItemHandler = (id, guid_id) => {
    dispatchCart({ type: "REMOVE", id: id, guid_id });
  };

  const cartShowHandler = () => {
    setShowCartButton(!showCartButton);
  };

  const RemoveAllHandler = () => {
    dispatchCart({ type: "REMOVEALL" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    AddItem: AddItemHandler,
    RemoveItem: RemoveItemHandler,
    cartShowhandler: cartShowHandler,
    RemoveAll: RemoveAllHandler,
    updateCookie: UpdateCookieItemHandler,
    cartShow: showCartButton,
    isLogged,
    setIsLoggedHandler,
    itemsToBack: cartState.itemsToBack,
    isLoading,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
