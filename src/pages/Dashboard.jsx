import React, { useEffect, useState } from "react";
import CoachTrainingForm from "../components/CoachTrainingForm";
// import TrainingPlanView from "./TrainingPlanView";
import { API_BASE_URL } from "../../config";

const Dashboard = () => {
  const [isCoach, setIsCoach] = useState(false);
  const [trainingPlans, setTrainingPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const storedIsCoach = localStorage.getItem("is_coach");
    setIsCoach(storedIsCoach === "true");
  }, []);

  useEffect(() => {
    if (isCoach) {
      const token = localStorage.getItem("token");
      fetch(`${API_BASE_URL}/training_plans`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTrainingPlans(data);
        })
        .catch((error) => {
          console.error("There was an error fetching training plans!", error);
        });
    }
  }, [isCoach]);

  const handleClickPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPlan(true);
  };

  const handleClosePlan = () => {
    setShowPlan(false);
  };

  const onNewPlan = (newPlan) => {
    setTrainingPlans([...trainingPlans, newPlan]);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const deleteTrainingPlan = (id) => {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE_URL}/training_plans/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          const updatedTrainingPlans = trainingPlans.filter(
            (plan) => plan.id !== id
          );
          setTrainingPlans(updatedTrainingPlans);
        }
      })
      .catch((error) => {
        console.error("There was an error deleting the training plan!", error);
      });
  };

  if (!isCoach) {
    return <div>Accès réservé aux coaches.</div>;
  }

  const centerPopupStyle = {
    top: "20%",
    left: "30%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
  };

  if (!isCoach) {
    return <div>Accès réservé aux coaches.</div>;
  }

  return (
    <div className='background-style'>
      <div className='coachform'>
        {showPlan && (
          <div
            className='popup-plan bg-white rounded p-4 mx-auto w-1/2'
            style={centerPopupStyle}>
            <span className='popup-plan-close' onClick={handleClosePlan}>
              X
            </span>
            <p className='mt-5 mb-2'>
              <strong>Nom du programme : </strong>
              {selectedPlan.name}
            </p>
            <p className='mb-2'>
              <strong>Description : </strong>
              {selectedPlan.description}
            </p>
            <p className='mb-2'>
              <strong>Prix : </strong>
              {selectedPlan.price} €
            </p>
          </div>
        )}

        <h1 className='text-2xl mb-4 text-center'>Mon Tableau de Bord</h1>
        <h2 className='text-xl mb-4 text-center'>
          Plans d'entraînement proposés
        </h2>
        <div className='flex justify-center my-4 '>
          <button
            onClick={toggleForm}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            {showForm
              ? "Masquer le formulaire"
              : "Ajouter un plan d'entraînement"}
          </button>
        </div>
        {showForm && <CoachTrainingForm onNewPlan={onNewPlan} />}
        <ul className='list-decimal list-inside'>
          {trainingPlans.map((plan) => (
            <li key={plan.id} className='flex justify-between items-center m-2'>
              <button
                onClick={() => handleClickPlan(plan)}
                className='text-blue-500 hover:underline'>
                {plan.name}
              </button>
              <button
                onClick={() => deleteTrainingPlan(plan.id)}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-0.5 px-4 rounded ml-2'>
                Effacer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
