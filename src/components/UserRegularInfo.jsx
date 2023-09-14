import { API_BASE_URL } from "../../config";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { authAtom } from "./authAtom";

const UserRegularInfo = ({ profileData }) => {
  const [authState] = useAtom(authAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const fetchPurchaseHistory = async () => {
    try {
      setLoading(true);

      // Get token from authState
      const token = authState.token; // or whatever key you use in the authAtom to store the token

      // If the token exists, use it for the request
      const response = await fetch(`${API_BASE_URL}/purchase_histories`, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      });

      if (response.ok) {
        const data = await response.json();
        setPurchaseHistory(data);
      } else {
        throw new Error(`Failed to fetch data: ${response.status}`);
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

  return (
    <>
      <img
        src={profileData.image_url}
        alt='User Profile Picture'
        className='profile-picture'
      />
      <div className='mb-4'>
        <strong>Nom :</strong> {profileData.lastname}
      </div>
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
            <li key={index}>
              ID du plan d'entraînement: {history.training_plan_id}, Prix:{" "}
              {history.price}, Statut: {history.status}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserRegularInfo;
