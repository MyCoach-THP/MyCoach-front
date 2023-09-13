import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    _gotcha: "",
  });

  const closeModal = () => {
    setIsOpen(false);
    setFormSubmitted(false);
    setMessage("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "https://getform.io/f/bafc57d3-66dd-499d-83c4-beebd7506a28",
        formData,
        { headers: { Accept: "application/json" } }
      )
      .then((response) => {
        setMessage("merci pour votre message!");
        setFormSubmitted(true);
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
  };

  return (
    <>
      <button
        type='button'
        onClick={() => {
          setIsOpen(true);
        }}
        className='text-white hover:underline'>
        Contactez-nous
      </button>

      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10'>
          <div className='relative bg-white bg-opacity-80 p-8 rounded-lg w-full max-w-2xl'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg text-gray-900'>Contact</h2>
              <button className='text-3xl text-gray-900' onClick={closeModal}>
                &times;
              </button>
            </div>
            <div>
              {formSubmitted ? (
                <div className='text-black'>{message}</div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className='mb-4'>
                    <label className='block text-black mb-2'>Nom</label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      className='w-full p-2 bg-white text-black rounded'
                    />
                  </div>

                  <div className='mb-4'>
                    <label className='block text-black mb-2'>Email</label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      className='w-full p-2 bg-white text-black rounded'
                    />
                  </div>

                  <div className='mb-4'>
                    <label className='block text-black mb-2'>Message</label>
                    <textarea
                      name='message'
                      value={formData.message}
                      onChange={handleInputChange}
                      rows='5'
                      className='w-full p-2 bg-white text-black rounded'
                    />
                  </div>

                  <button
                    type='submit'
                    className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Envoyer
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;
