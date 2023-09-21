import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import CoachesCarousel from "../components/CoachesCarousel";
import Description from "../components/Description";
import { useAtom } from "jotai";
import { authAtom } from "../atoms/authAtom";
import { useParams } from "react-router-dom";

const Home = () => {
  const images = [
    "https://www.pixelstalk.net/wp-content/uploads/2016/06/Free-HD-Fitness-Wallpapers-For-Desktop.jpg",
    "https://res.cloudinary.com/dmq3cpw6u/image/upload/v1695214869/Fitness-Girl-Wallpaper-06846_rlzdru.jpg",
    "https://images.hdqwalls.com/wallpapers/girl-fitness-model-pic.jpg",
    "https://s1.1zoom.me/big0/69/Fitness_Workout_Brunette_girl_Hands_Dumbbells_Gym_587131_1280x853.jpg",
  ];

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [showNextImage, setShowNextImage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.floor(Math.random() * images.length)
  );
  const [nextImageIndex, setNextImageIndex] = useState(
    (currentImageIndex + 1) % images.length
  );
  const [authState] = useAtom(authAtom);
  const user_id = authState.user_id;
  const token = localStorage.getItem("token");
  const [profileData, setProfileData] = useState(null);
  const { id } = useParams();
  const [displayedUserId, setDisplayedUserId] = useState(null);
  const [isCoach, setIsCoach] = useState(false);

useEffect(() => {
  let userId = id || user_id;
  setDisplayedUserId(userId);

  if (userId) {
    fetch(`${API_BASE_URL}/coaches/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIsCoach(!!data.is_coach);
        setProfileData(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the profile data!", error);
      });
  }
}, [user_id, id]);


  useEffect(() => {
    const timer = setInterval(() => {
      setShowNextImage(true);
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % images.length);
        setShowNextImage(false);
      }, 1000); // CSS transition duration
    }, 15000);

    return () => {
      clearInterval(timer);
    };
  }, [currentImageIndex, nextImageIndex]);

  return (
    <div className='flex flex-col'>
      <div
        className={`bg-cover bg-center ${
          isLoggedIn ? "h-[55vh]" : "h-[80vh]"
        } flex items-center justify-center shadow-xl mb-5 relative`}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full ${
              index === currentImageIndex
                ? "image-transition-enter-active"
                : index === nextImageIndex
                ? "image-transition-enter"
                : "image-transition-leave-active"
            }`}
            style={{
              backgroundImage: `url("${image}")`,
            }}></div>
        ))}
        <div
          className='text-center text-white bg-black bg-opacity-50 p-4 rounded w-full h-auto'
          style={{ zIndex: 10 }}>
          {!isLoggedIn ? (
            <>
              <div className='text-4xl md:text-4xl lg:text-4xl xl:text-4xl font-bold my-coach-div'>
                <span className='blue'>My</span>
                <span className='white'>Coach</span>
              </div>
              <p className='mt-2 text-sm md:text-md lg:text-lg xl:text-lg'>
                Découvrez tous nos services
              </p>
              <Link
                to='/register'
                className='mt-4 inline-block bg-blue-500 text-white py-2 px-8 md:py-2 md:px-16 rounded'>
                S'inscrire
              </Link>
            </>
          ) : (
            <>
              <div className='text-4xl md:text-4xl lg:text-4xl xl:text-4xl font-bold my-coach-div'>
                <span className='blue'>My</span>
                <span className='white'>Coach</span>
              </div>
              <p className='mt-2 text-sm md:text-md lg:text-lg xl:text-lg'>
                {profileData
                  ? `Bienvenue ${profileData.firstname || profileData.email}`
                  : "Cliquez ici"}
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById("coaches-carousel");
                  element.scrollIntoView({ behavior: "smooth" });
                }}
                className='mt-4 inline-block bg-blue-500 text-white py-2 px-8 md:py-2 md:px-16 rounded'>
                Découvrir tous nos Coachs et les plans d'entrainement proposés
              </button>
            </>
          )}
        </div>
      </div>
      <div>
        <Description />
      </div>
      <div id='coaches-carousel' className='card-section-background'>
        <h1 className='text-2xl mb-4 text-center text-white font-bold mt-4'>
          Nos Coachs
        </h1>
        <CoachesCarousel />
      </div>
    </div>
  );
};

export default Home;
