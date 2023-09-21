import React, { useEffect, useState } from "react";

const TrainingPlanView = ({ current }) => {
  const [currentPlan, setCurrentPlan] = useState(null);

  useEffect(() => {
    setCurrentPlan(current);
  }, []);

  return (
    <div className='p-4 border rounded shadow-lg'>
      {currentPlan ? (
        <div>
          <h1 className='text-2xl font-semibold mb-2'>{currentPlan.name}</h1>
          <p className='text-gray-600'>{currentPlan.description}</p>
          <p className='text-blue-500 font-bold mt-2'>
            Prix : {currentPlan.price} €
          </p>
        </div>
      ) : (
        <p className='text-gray-600'>Chargement...</p>
      )}
    </div>
  );
};

export default TrainingPlanView;