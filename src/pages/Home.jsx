import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@/components/Card";
import { API_BASE_URL } from "../../config";
import CoachesCarousel from "../components/CoachesCarousel";
import Description from "../components/Description";

const Home = () => {
  const [coaches, setCoaches] = useState([]);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    fetch(`${API_BASE_URL}/coaches`)
      .then((response) => response.json())
      .then((data) => setCoaches(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des coaches : ", error)
      );
  }, []);


  return (
    <div className='flex flex-col'>
      <div
        className={`bg-cover bg-center ${
          isLoggedIn ? "h-[40vh]" : "h-[80vh]"
        } flex items-center justify-center shadow-xl mb-20`}
        style={{
          backgroundImage:
            'url("https://www.pixelstalk.net/wp-content/uploads/2016/06/Free-HD-Fitness-Wallpapers-For-Desktop.jpg")',
        }}>
        <div className='text-center text-white bg-black bg-opacity-50 p-4 rounded w-full h-auto'>
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
            <Link
              to='/alltrainingplans' // change this to the actual route
              className='text-lg md:text-xl lg:text-2xl xl:text-4xl font-bold text-white'>
              Cliquez ici pour découvrir tous les plans d'entrainement proposés
              par nos coachs
            </Link>
          )}
        </div>
      </div>
      <div>
        <Description />
      </div>
      <div className='card-section-background'>
        <h1 className='text-2xl mb-4 text-center text-white font-bold mt-4'>
          Nos Coachs
        </h1>
        <CoachesCarousel />
      </div>
    </div>
  );
};

export default Home;
