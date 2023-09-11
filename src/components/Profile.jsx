import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { authAtom } from "./authAtom";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { API_BASE_URL } from "../../config";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [trainingPlans, setTrainingPlans] = useState([]);
  const [authState] = useAtom(authAtom);
  const user_id = authState.user_id;
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userId = user_id;
    console.log(userId);
    fetch(`${API_BASE_URL}/coaches/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the profile data!", error);
      });
  }, [user_id]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_BASE_URL}/training_plans?user_id=${user_id}`, {
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
  }, [user_id]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const handleUpdate = (updatedData) => {
    setProfileData({ ...profileData, ...updatedData });
  };

  return (
    <div className='background-style2'>
      <div className='coachform'>
        <h1 className='text-2xl mb-4 text-center'>Mon Profil</h1>
        {user_id === user_id && (
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Annuler" : "Mettre à jour le profil"}
          </button>
        )}
        {isEditing ? (
          <ProfileUpdateForm
            onUpdate={handleUpdate}
            existingData={profileData}
            userId={user_id}
          />
        ) : (
          <>
            <img src={profileData.image_url} alt='Avatar' />
            <br />
            <div className='mb-4'>
              <strong>Nom :</strong> {profileData.lastname}
            </div>
            <div className='mb-4'>
              <strong>Prénom :</strong> {profileData.firstname}
            </div>
            <div className='mb-4'>
              <strong>Description :</strong> {profileData.description}
            </div>
            <h2 className='text-xl mb-4 text-center'>
              Les programmes d'entraînement que je propose
            </h2>
            <ul className='list-decimal list-inside'>
              {trainingPlans.map((plan) => (
                <li key={plan.id} className='m-2'>
                  {plan.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
