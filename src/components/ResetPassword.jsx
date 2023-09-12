import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../config";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [flashMessage, setFlashMessage] = useState(null);
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (password === confirmPassword) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/password_resets/${token}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
          }
        );

        if (response.ok) {
          console.log("Mot de passe réinitialisé avec succès");
          setFlashMessage("Mot de passe réinitialisé avec succès");
        } else {
          const data = await response.json();
          console.error(
            "Erreur lors de la réinitialisation du mot de passe :",
            data.error
          );
        }
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    } else {
      console.error("Les mots de passe ne correspondent pas");
    }
  };

  return (
    <div className='background-style2'>
      <div className='coachform'>
        <h1 className='text-2xl mb-4 text-center'>
          Réinitialisation du mot de passe
        </h1>
        {flashMessage && (
          <div className='flash-message'>
            {flashMessage}
            <button
              onClick={() => navigate("/signin")}
              className='ml-4 text-blue-500 underline'>
              Aller à la page de connexion
            </button>
          </div>
        )}

        <form onSubmit={handleResetPassword}>
          <div className='mb-4'>
            <label htmlFor='password' className='font-bold'>
              Nouveau mot de passe :
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={handlePasswordChange}
              required
              className='border p-2 rounded w-full'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='confirmPassword' className='font-bold'>
              Confirmer le mot de passe :
            </label>
            <input
              type='password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              className='border p-2 rounded w-full'
            />
          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Réinitialiser le mot de passe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
