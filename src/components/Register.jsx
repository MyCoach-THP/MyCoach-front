import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { authAtom } from "./authAtom";
import { API_BASE_URL } from "../../config";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [authState, setAuthState] = useAtom(authAtom);
  const [isCoach, setIsCoach] = useState(false);
  let authToken;

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
          is_coach: isCoach,
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          const authHeader = response.headers.get("Authorization");
          authToken = authHeader.split(" ")[1];
          return response.json();
        } else {
          throw new Error("Inscription échouée");
        }
      })
      .then((data) => {
        if (data.user) {
          const userId = data.user.id;
          setAuthState({
            isLoggedIn: true,
            token: authToken,
            user_id: userId,
            is_coach: isCoach,
          });
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("token", authToken);
          localStorage.setItem("user_id", userId.toString());
          localStorage.setItem("is_coach", isCoach.toString());
          navigate("/");
        } else {
          console.error("Failed to register:", data.errors);
        }
      })
      .catch((error) => console.error("There was an error!", error));
  };

  return (
    <div className='background-style'>
      <div className='flex justify-center items-center min-h-screen'>
        <div className='bg-white p-8 rounded shadow-md mt-[-200px]'>
          <h1 className='text-2xl mb-4 text-center'>Inscription</h1>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border p-2 rounded w-full'
              />
            </div>
            <div className='mb-4'>
              <input
                type='password'
                placeholder='Mot de passe'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border p-2 rounded w-full'
              />
            </div>
            <div className='mb-4'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={isCoach}
                  onChange={(e) => {
                    console.log(e);
                    if (e.target.checked) {
                      console.log("JE SUIS COCHE");
                    } else {
                      console.log("JE SUIS PAS COCHE");
                    }
                    setIsCoach(e.target.checked);
                  }}
                  className='mr-2'
                />
                Je m'inscris en tant que Coach
              </label>
            </div>
            <button
              type='submit'
              className='bg-blue-custom hover:bg-blue-custom-hover text-white hover:text-gray-100 py-2 px-4 rounded w-full'>
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
