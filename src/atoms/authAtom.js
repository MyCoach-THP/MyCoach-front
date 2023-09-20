import { atom } from "jotai";

export const authAtom = atom({
  isLoggedIn: false,
  token: localStorage.getItem("token"),
  user_id: null,
  is_coach: false,
  sessionId: null,
});