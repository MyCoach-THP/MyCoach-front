import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { authAtom } from "./authAtom";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { API_BASE_URL } from "../../config";
import { useParams } from "react-router-dom";


const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [trainingPlans, setTrainingPlans] = useState([]);
  const [authState] = useAtom(authAtom);
  const user_id = authState.user_id;
  const [isEditing, setIsEditing] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const { id } = useParams();
  const [displayedUserId, setDisplayedUserId] = useState(null);
  const [isCoach, setIsCoach] = useState(false);
  const [showPlan, setShowPlan] = useState(null);

  useEffect(() => {
    const userId = id || user_id;
    console.log(userId);
     setDisplayedUserId(userId); 
    fetch(`${API_BASE_URL}/coaches/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.is_coach){
          setIsCoach(false);
        } else {
          setIsCoach(true);
        }
        setProfileData(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the profile data!", error);
      });
  }, [user_id, id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(id);
    fetch(`${API_BASE_URL}/training_plans/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTrainingPlans(data);
      })
      .catch((error) => {
        console.error("There was an error fetching training plans!", error);
      });
  }, [id]);

  if (!profileData) {
    return <div>Chargement...</div>;
  }

  const handleUpdate = (updatedData) => {
    setProfileData({ ...profileData, ...updatedData });
    setFlashMessage("Profil mis à jour");
    
    setTimeout(() => {
      setFlashMessage(null);
      window.location.reload();
    }, 4000);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
  };

  return (
    <div className='background-style2'>
      <div className='coachform'>
        <h1 className='text-2xl mb-4 text-center'>Mon Profil</h1>
        {flashMessage && <div className='flash-message'>{flashMessage}</div>}

        {user_id === displayedUserId && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4'>
            {isEditing ? "Annuler" : "Mettre à jour le profil"}
          </button>
        )}

        {isEditing ? (
          <ProfileUpdateForm
            onUpdate={handleUpdate}
            existingData={profileData}
            userId={user_id}
            onCloseForm={handleCloseForm}
          />
        ) : (
          <>
          {(profileData.image_url != undefined || profileData.image_url != null) ?
          (
            <img src={profileData.image_url} alt='Avatar' />
          ) : (
            <p>Pas d'image disponible</p>
          )}
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
              {isCoach && trainingPlans.length > 0 && (
              <>
              <h2 className='text-xl mb-4 text-center'>
                Le(s) programme(s) d'entraînement(s) que je propose
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
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;