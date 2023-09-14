import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { authAtom } from "./authAtom";
import { cartAtom } from "./cartAtom";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import UserRegularInfo from "./UserRegularInfo";
import UserCoachInfo from "./UserCoachInfo";
import axios from "axios";



const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [trainingPlans, setTrainingPlans] = useState([]);
  const [authState] = useAtom(authAtom);
  const user_id = authState.user_id;
  const [isEditing, setIsEditing] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const { id } = useParams();
  const [displayedUserId, setDisplayedUserId] = useState(null);
  const [isCoach, setIsCoach] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(false);
  const [cart, setCart] = useAtom(cartAtom);
  const [cartCount, setCartCount] = useState(0);
  const fetchPurchaseHistory = async () => {
    try {
      const response = await axios.get("/purchase_histories"); // Assurez-vous que cette URL correspond à l'endpoint Rails
      return response.data;
    } catch (error) {
      console.error("An error occurred while fetching data: ", error);
    }
  };

  useEffect(() => {
    const userId = id || user_id;
    setDisplayedUserId(userId);
    fetch(`${API_BASE_URL}/coaches/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.is_coach) {
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
    const coachId = id;

    fetch(`${API_BASE_URL}/training_plans_by_coach/${coachId}`, {
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

  const handleCloseForm = (plan) => {
    setSelectedPlan(plan);
    setIsEditing(false);
  };

  const handleClickPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPlan(true);
  };

  const handleClosePlan = () => {
    setShowPlan(false);
  };

  const handleAddToCartClick = () => {
    if (user_id != null) {
      const token = localStorage.getItem("token");

      fetch(`${API_BASE_URL}/cart/add/?product_id=${selectedPlan.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.ok) {
          setCart((prevCart) => ({
            ...prevCart,
            cartlist: [...prevCart.cartlist, selectedPlan.id],
          }));
          localStorage.setItem("cartlist", [...cart.cartlist, selectedPlan.id]);
        } else {
          throw new Error("Erreur lors de l'ajout au panier");
        }
      });
    } else {
      navigate("/signin");
    }
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
            {isCoach ? (
              <UserCoachInfo
                profileData={profileData}
                trainingPlans={trainingPlans}
              />
            ) : (
              <UserRegularInfo profileData={profileData} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;