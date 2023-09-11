import React from "react";

const Card = ({ title, description, imageUrl }) => {
  return (
    <div className='bg-white rounded-lg overflow-hidden p-4 shadow-lg'>
      <div className='overflow-hidden' style={{ width: "250px", height: "250px" }}>
        <img className='w-full h-full object-cover' src={imageUrl} alt={title} />
      </div>
      <h2 className='text-2xl font-semibold'>{title}</h2>
      <p className='text-gray-700'>{description}</p>
    </div>
  );
};

export default Card;