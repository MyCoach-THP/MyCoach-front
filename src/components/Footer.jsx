import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className='bg-gray-800 text-white py-6'>
      <div className='container mx-auto flex flex-col items-center'>
        <div className='text-4xl font-bold my-coach-div'>
          <span className='blue'>My</span>
          <span className='white'>Coach</span>
        </div>
        <p className='text-sm mb-4'>© 2023, Tous droits réservés.</p>
        <div className='flex space-x-4'>
          <Link to='legal' className='hover:underline'>
            Mentions légales
          </Link>
          <Link to='confidentiality' className='hover:underline'>
            Politique de confidentialité
          </Link>
          <Link to='contact' className='hover:underline'>
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
