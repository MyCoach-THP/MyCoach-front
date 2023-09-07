import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  };

  return (
    <div className="background-style">
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
