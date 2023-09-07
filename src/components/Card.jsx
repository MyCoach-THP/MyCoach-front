import React from "react";

const Card = ({ title, description, imageUrl }) => {
  return (
    <div className='bg-white rounded-lg overflow-hidden p-4 shadow-lg'>
      <img className='w-full h-40 object-cover' src={imageUrl} alt={title} />
      <h2 className='text-2xl font-semibold'>{title}</h2>
      <p className='text-gray-700'>{description}</p>
    </div>
  );
};

export default Card;
