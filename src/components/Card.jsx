import React from "react";
import { Link } from "react-router-dom";


const Card = ({ title, description, imageUrl, coachId, userType }) => {
  const profileLink =
    userType === "coach" ? `/coachProfile/${coachId}` : `/profile/${coachId}`;
  return (
    <Link to={profileLink}>
      <div
        className='bg-white rounded-lg overflow-hidden p-4 shadow-lg'
        style={{ width: "300px", height: "350px" }}>
        <div
          className='overflow-hidden'
          style={{ width: "100%", height: "70%" }}>
          <img
            className='w-full h-full object-cover'
            src={imageUrl}
            alt={title}
          />
        </div>
        <h2 className='text-2xl font-semibold'>{title}</h2>
        <p className='text-gray-700'>{description}</p>
      </div>
    </Link>
  );
};
export default Card;