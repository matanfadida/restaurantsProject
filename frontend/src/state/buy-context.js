import React from 'react';

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    AddItem: (item) => {},
    RemoveItem: (id) => {},
    cartShowhandler: () => {},
    cartShow: false,
    isLogged: false,
    setIsLoggedHandler: (value) => {}
});

export default CartContext;