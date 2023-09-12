import React, { useEffect, useState } from "react";
import CoachTrainingForm from "./CoachTrainingForm";
import TrainingPlanView from "./TrainingPlanView";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";


const Dashboard = () => {
  const [isCoach, setIsCoach] = useState(false);
  const [trainingPlans, setTrainingPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);

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

  const onNewPlan = (newPlan) => {
    setTrainingPlans([...trainingPlans, newPlan]);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const openPlan = (plan) => {
    setCurrentPlan(plan);
  };

  const closePlan = () => {
    setCurrentPlan(null);
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

  return (
    <div className='background-style'>
      <div className='coachform'>
        {currentPlan ? (
          <>
            <TrainingPlanView current={currentPlan} />
            <button onClick={closePlan}>Retour au tableau de bord</button>
          </>
        ) : (
          <>
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
              {trainingPlans.map((plan) => { 
                return (
                <li
                  key={plan.id}
                  className='flex justify-between items-center m-2'>
                  <button
                    onClick={() => openPlan(plan)}
                    className='text-blue-500 hover:underline'>
                    {plan.name}
                  </button>
                  <button
                    onClick={() => deleteTrainingPlan(plan.id)}
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-0.5 px-4 rounded'>
                    Effacer
                  </button>
                </li>
              )
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
