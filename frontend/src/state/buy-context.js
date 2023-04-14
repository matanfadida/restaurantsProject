import React from 'react';

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    AddItem: (item) => {},
    RemoveItem: (id, guid_id) => {},
    cartShowhandler: () => {},
    cartShow: false,
    isLogged: false,
    setIsLoggedHandler: (value) => {},
    itemsToBack: [],
    isLoading: true,
});

export default CartContext;