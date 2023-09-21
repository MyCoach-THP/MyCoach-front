import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";

const CoachTrainingForm = ({ onNewPlan }) => {
  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    exercices: "",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" && value.length > 5) {
      return; 
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name.length < 5) {
      setErrorMessage(
        "Le nom de votre programme doit avoir au moins 5 caractères."
      );
    } else if (formData.description.length < 10) {
      setErrorMessage(
        "La description de votre programme doit avoir au moins 10 caractères."
      );
    } else if (formData.exercices.length < 10) {
      setErrorMessage(
        "La routine d'entrainement de votre programme doit avoir au moins 10 caractères."
      );
    } else if (formData.price === 0) {
      setErrorMessage("Vous devez spécifier un prix minimum.");
    } else {
      setSuccessMessage("");
      setErrorMessage("");

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
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {errorMessage.length > 0 && (
        <div role='Erreur'>
          <div class='bg-red-500 text-white font-bold rounded-t px-4 py-2'>
            Danger
          </div>
          <div class='border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700'>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      <div className='flex flex-col'>
        <label htmlFor='name' className='text-lg mb-2'>
          Nom du Plan
        </label>
        <input
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className='formwidget'
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
          className='formwidget'
          placeholder='Insérez la description ici'
          rows='4'
          style={{ resize: "none" }}></textarea>
      </div>

      <div className='flex flex-col'>
        <label htmlFor='exercices' className='text-lg mb-2'>
          Routine d'entrainement
        </label>
        <textarea
          id='exercices'
          name='exercices'
          value={formData.exercices}
          onChange={handleChange}
          className='formwidget'
          placeholder="Insérez la routine d'entrainement ici"
          rows='4'
          style={{ resize: "none" }}></textarea>
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
          className='formwidget'
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
