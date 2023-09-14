import { atom, useAtom } from "jotai";

export const cartAtom = atom({
  cartlist: [],

  // Ajoutez une action pour supprimer un élément du panier
  removeFromCart: (id) => (get, set) => {
    set(cartAtom, (prevCart) => ({
      ...prevCart,
      cartlist: prevCart.cartlist.filter((item) => item !== id),
    }));
  },
});

export const selectedPlanAtom = atom({
  id: null,
  price: null,
});

export const purchasedItemsAtom = atom([]); 

