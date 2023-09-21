import { API_BASE_URL } from "../../config";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { authAtom } from "../atoms/authAtom";

const UserRegularInfo = ({ profileData }) => {
  const [authState] = useAtom(authAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [showPlan, setShowPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const fetchPurchaseHistory = async () => {
    try {
      setLoading(true);

      const token = authState.token; 

      const response = await fetch(`${API_BASE_URL}/purchase_histories`, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setPurchaseHistory(data);
        } else {
          setPurchaseHistory([]); 
        }
      }
    } catch (error) {
      console.error(`An error occurred while fetching data: ${error}`);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseHistory();
  }, []);

  const handleClickPlan = (plan) => {
    console.log(plan);
    setSelectedPlan(plan);
    setShowPlan(true);
  };

  const handleClosePlan = () => {
    setShowPlan(false);
  };

  const centerPopupStyle = {
    transform: "translate(-50%, -50%)",
    maxWidth: windowWidth <= 768 ? "90%" : "initial",
  };

  return (
    <>
      <img
        src={profileData.image_url}
        alt='User Profile Picture'
        className='profile-picture'
      />
      {/* <div className='mb-4'>
        <strong>Nom :</strong> {profileData.lastname}
      </div> */}
      <div className='mb-4'>
        <strong>Prénom :</strong> {profileData.firstname}
      </div>
      <div className='mb-4'>
        <strong>Description :</strong> {profileData.description}
      </div>
      <div className='purchase-history'>
        <strong>Historique des achats :</strong>
        <ul>
          {purchaseHistory.map((history, index) => (
            <li
              className='planmodal'
              key={index}
              onClick={() => handleClickPlan(history)}>
              Plan d'entraînement: {history.training_plan.name}
            </li>
          ))}
        </ul>
      </div>

      {showPlan && (
        <div
          className='popup-plan bg-white rounded p-4 mx-auto w-1/2'
          style={centerPopupStyle}>
          {" "}
          <span className='popup-plan-close' onClick={handleClosePlan}>
            X
          </span>
          <p className='mt-5 mb-2'>
            <strong>Nom du programme : </strong>
            {selectedPlan.training_plan.name}
          </p>
          <p className='mb-2 break-words'>
            <strong>Description : </strong>
            {selectedPlan.training_plan.description}
          </p>
          <p className='mb-2'>
            <strong>Exercices : </strong>
            {selectedPlan.training_plan.exercices}
          </p>
        </div>
      )}
    </>
  );
};

export default UserRegularInfo;
