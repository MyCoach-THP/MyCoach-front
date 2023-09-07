import React from "react";
import { Link } from "react-router-dom";
import Card from "@/components/Card";

const Home = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

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
            <h1 className='text-4xl font-bold'>Welcome</h1>
          )}
        </div>
      </div>
      <div className='card-section-background'>
        <div className='flex justify-around p-4'>
          <Card
            title='Card 1'
            description='This is card 1'
            imageUrl='https://via.placeholder.com/150'
          />
          <Card
            title='Card 2'
            description='This is card 2'
            imageUrl='https://via.placeholder.com/150'
          />
          <Card
            title='Card 3'
            description='This is card 3'
            imageUrl='https://via.placeholder.com/150'
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
