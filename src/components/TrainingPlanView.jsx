import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../config";

const TrainingPlanView = ({ id }) => {
  const { id: trainingPlanId } = useParams();
  const [trainingPlan, setTrainingPlan] = useState(null);

  useEffect(() => {
    // Récupère le token depuis le local storage
    const token = localStorage.getItem("token");

    // Effectue la requête pour obtenir les détails du plan
    fetch(`${API_BASE_URL}/training_plans/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTrainingPlan(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the training plan!", error);
      });
  }, [id]);

  return (
    <div className='p-4 border rounded shadow-lg'>
      {trainingPlan ? (
        <div>
          <h1 className='text-2xl font-semibold mb-2'>{trainingPlan.name}</h1>
          <p className='text-gray-600'>{trainingPlan.description}</p>
          <p className='text-blue-500 font-bold mt-2'>
            Prix : {trainingPlan.price} €
          </p>
        </div>
      ) : (
        <p className='text-gray-600'>Chargement...</p>
      )}
    </div>
  );
};

export default TrainingPlanView;
