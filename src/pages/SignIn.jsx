import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { authAtom } from "../atoms/authAtom";
import { cartAtom } from "../atoms/cartAtom";
import { API_BASE_URL } from "../../config";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [authState, setAuthState] = useAtom(authAtom);
  const [cart, setCart] = useAtom(cartAtom);
  let authToken;

  useEffect(() => {
    setEmail("user@test.fr");
    setPassword("aaaaaa");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/users/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          const authHeader = response.headers.get("Authorization");
          authToken = authHeader.split(" ")[1];
          return response.json();
        } else {
          throw new Error("Echec de connexion");
        }
      })
      .then((data) => {
        if (data.user) {
          console.log("cartlist : ");
          console.log(data.user.cartlist);
          const userId = data.user.id;
          setAuthState({
            isLoggedIn: true,
            token: authToken,
            user_id: userId,
            is_coach: data.user.is_coach,
          });
          setCart({
            cartlist: data.user.cartlist,
          });

          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("token", authToken);
          localStorage.setItem("user_id", userId.toString());
          localStorage.setItem("is_coach", data.user.is_coach.toString());
          localStorage.setItem("cartlist", data.user.cartlist);
          navigate("/");
        } else {
          console.error(
            "Failed to sign in:",
            data.error || data.errors || "Unknown Error"
          );
        }
      })

      .catch((error) => console.error("There was an error!", error));
  };

  return (
    <div className='background-style'>
      <div className='flex justify-center items-center min-h-screen'>
        <div className='bg-white p-8 rounded shadow-md mt-[-200px]'>
          <h1 className='text-2xl mb-4 text-center'>Connexion</h1>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <input
                type='email'
                placeholder='Email'
                value={email}
                autoComplete='email'
                onChange={(e) => setEmail(e.target.value)}
                className='border p-2 rounded w-full'
              />
            </div>
            <div className='mb-4'>
              <input
                type='password'
                placeholder='Password'
                value={password}
                autoComplete='current-password'
                onChange={(e) => setPassword(e.target.value)}
                className='border p-2 rounded w-full'
              />
            </div>
            <div>
              <button
                type='submit'
                className='text-white bg-blue-custom hover:bg-blue-custom-hover py-2 px-4 rounded w-full'>
                Se Connecter
              </button>
            </div>
          </form>
          <div className='mt-4 text-center'>
            <Link to='/forgotpassword'>Mot de passe oublié?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
