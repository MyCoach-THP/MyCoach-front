import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../../config";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handleSendResetEmail = async event => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/password_resets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        navigate('/')
        console.log('Email de réinitialisation envoyé avec succès');
      } else {
        const data = await response.json();
        console.error('Erreur lors de l\'envoi de l\'email :', data.error);
      }
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  };

  return (
    <div className='background-style2'>
      <div className='coachform'>
        <h1 className='text-2xl mb-4 text-center'>Mot de passe oublié</h1>
        <form onSubmit={handleSendResetEmail}>
          <div className='mb-4'>
            <label htmlFor='email' className='font-bold'>
              Email :
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={handleEmailChange}
              required
              className='border p-2 rounded w-full'
            />
          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Envoyer l'email de réinitialisation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
