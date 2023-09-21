import React from "react";
import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";

const Footer = () => {
return (
  <div className='bg-gray-800 text-white py-6'>
    <div className='container mx-auto flex flex-col items-center px-4 sm:px-0'>
      <div className='text-4xl font-bold my-coach-div mb-2 sm:mb-4'>
        <span className='blue'>My</span>
        <span className='white'>Coach</span>
      </div>
      <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto mb-4 sm:mb-8'>
        <Link to='legal' className='hover:underline text-center sm:text-left'>
          Mentions légales
        </Link>
        <Link
          to='confidentiality'
          className='hover:underline text-center sm:text-left'>
          Politique de confidentialité
        </Link>
        <div className='contactform text-center sm:text-left'>
          <ContactForm />
        </div>
      </div>
      <p className='text-xs sm:text-sm mb-4 w-full text-center md:text-center'>
        © 2023, Tous droits réservés.
      </p>
    </div>
  </div>
);



};

export default Footer;
