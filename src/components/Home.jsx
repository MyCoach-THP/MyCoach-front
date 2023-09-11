import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@/components/Card";
import { API_BASE_URL } from "../../config";


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
    <div className='h-screen flex flex-col'>
      <div
        className='bg-cover bg-center h-[80vh] flex items-center justify-center'
        style={{
          backgroundImage:
            'url("https://www.pixelstalk.net/wp-content/uploads/2016/06/Free-HD-Fitness-Wallpapers-For-Desktop.jpg")',
        }}>
        <div className='text-center text-white bg-black bg-opacity-50 p-4 rounded'>
          {!isLoggedIn ? (
            <>
              <div className='text-4xl font-bold my-coach-div'>
                <span className='blue'>My</span>
                <span className='white'>Coach</span>
              </div>

              <p className='mt-2 text-lg'>Découvrez tous nos services</p>
              <Link
                to='/register'
                className='mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded'>
                S'inscrire
              </Link>
            </>
          ) : (
            <h1 className='text-4xl font-bold'>Bienvenue</h1>
          )}
        </div>
      </div>
      <div className='card-section-background'>
        <h1 className='text-2xl mb-4 text-center text-white font-bold mt-4'>
          Nos Coachs
        </h1>
        <div className='flex justify-around p-4'>
          {coaches.map((coach) => (
            <Card
              key={coach.id}
              title={coach.email}
              description='description'
              imageUrl={
                coach.image_url
                  ? `${coach.image_url}`
                  : 'https://via.placeholder.com/250'
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
