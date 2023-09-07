import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  };

  return (
    <div className='background-style'>
      <div className='flex justify-center items-center min-h-screen'>
        <div className='bg-white p-8 rounded shadow-md mt-[-200px]'>
          <h1 className='text-2xl mb-4'>Page de connexion</h1>
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
                placeholder='Password'
                value={password}
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
        </div>
      </div>
    </div>
  );
};

export default SignIn;
