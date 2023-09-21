import React, { useState } from "react";
import { API_BASE_URL } from "../../config";

const ProfileUpdateForm = ({ onUpdate, existingData, userId, onCloseForm }) => {
  const [firstname, setFirstname] = useState(existingData.firstname || "");
  const [description, setDescription] = useState(
    existingData.description || ""
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!userId) {
      setError("L'ID de l'utilisateur est manquant");
      return;
    }

    if (!firstname || !description) {
      setError("Les champs ne peuvent pas être vides");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("user[firstname]", firstname);
    formData.append("user[description]", description);
    if (selectedImage) {
      formData.append("user[image]", selectedImage);
    }

    const token = localStorage.getItem("token");

    fetch(`${API_BASE_URL}/profiles/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Mise à jour échouée");
        }
      })
      .then((data) => {
        if (data.user) {
          onUpdate({ firstname, description, selectedImage });
          onCloseForm(); 
        } else {
          setError("Échec de la mise à jour");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError("Il y a eu une erreur !");
      });
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Prénom'
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className='border p-2 rounded w-full'
        />
      </div>
      <div className='mb-4'>
        <textarea
          placeholder='Description pour les clients'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='border p-2 rounded w-full'
        />
      </div>
      <div className='mb-4'>
        <input
          type='file'
          accept='image/*'
          onChange={(e) => {
            const file = e.target.files[0];
            setSelectedImage(file);
          }}
          className='border p-2 rounded w-full'
        />
      </div>
      {isLoading && <p>Chargement...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      <button
        type='submit'
        className='bg-blue-custom hover:bg-blue-custom-hover text-white hover:text-gray-100 py-2 px-4 rounded w-full'
        disabled={isLoading}>
        Mettre à jour
      </button>
    </form>
  );
};

export default ProfileUpdateForm;
