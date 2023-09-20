import { atom, useAtom } from "jotai";

// In your cartAtom.js
export const cartAtom = atom({
  cartlist: [],
  removeFromCart: (id) => (get, set) => {
    set(cartAtom, (prevCart) => ({
      ...prevCart,
      cartlist: prevCart.cartlist.filter((item) => item !== id),
    }));
  },
  setCart: (newCart) => (get, set) => {
    set(cartAtom, (prevCart) => ({
      ...prevCart,
      cartlist: newCart,
    }));
  },
});


export const selectedPlanAtom = atom({
  id: null,
  price: null,
});

export const purchasedItemsAtom = atom([]);
