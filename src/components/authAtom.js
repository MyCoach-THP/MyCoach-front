import { atom } from "jotai";

export const authAtom = atom({
  isLoggedIn: false,
  token: null,
  user_id: null,
});
