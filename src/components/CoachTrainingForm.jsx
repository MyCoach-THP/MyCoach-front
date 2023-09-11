// CoachTrainingForm.jsx

import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";


const CoachTrainingForm = ({ onNewPlan }) => {
  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    fetch(`${API_BASE_URL}/training_plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ training_plan: formData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setSuccessMessage("Le plan a été créé avec succès.");
          onNewPlan(data);
        } else {
          setErrorMessage(
            "Une erreur est survenue lors de la création du plan."
          );
        }
      })
      .catch((error) => {
        setErrorMessage(`Erreur de réseau : ${error}`);
      });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='flex flex-col'>
        <label htmlFor='name' className='text-lg mb-2'>
          Nom du Plan
        </label>
        <input
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className='p-2 border rounded'
          placeholder='Insérez le nom ici'
        />
      </div>

      <div className='flex flex-col'>
        <label htmlFor='description' className='text-lg mb-2'>
          Description du Plan
        </label>
        <textarea
          id='description'
          name='description'
          value={formData.description}
          onChange={handleChange}
          className='p-2 border rounded'
          placeholder='Insérez la description ici'
          rows='4'></textarea>
      </div>

      <div className='flex flex-col'>
        <label htmlFor='price' className='text-lg mb-2'>
          Prix du Plan (en euros)
        </label>
        <input
          id='price'
          name='price'
          value={formData.price}
          onChange={handleChange}
          type='number'
          className='p-2 border rounded'
          placeholder='Insérez le prix ici'
        />
      </div>

      <div className='flex justify-center'>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleSubmit}>
          Ajouter le Plan
        </button>
      </div>
    </form>
  );
};

export default CoachTrainingForm;
