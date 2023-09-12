import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    _gotcha: "",
    // subscribe: "yes",
    // gender: "male",
    // workExperience: "one-year",
  });

  const closeModal = () => {
    setIsOpen(false);
    setFormSubmitted(false); // Reset formSubmitted state when modal closes
    setMessage(""); // Reset message state when modal closes
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
        "https://getform.io/f/07cf8508-144a-4957-a3b9-32851cca0640",
        formData,
        { headers: { Accept: "application/json" } }
      )
      .then((response) => {
        setMessage(t("Contact.formthank"));
        setFormSubmitted(true); // Set formSubmitted state to true on successful submission
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
  };


  return (
    <>
      <a
        href='#'
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}>
        Contact
      </a>

      {isOpen && (
        <div className='modal-background'>
          <div className='modal-container '>
            <div className='modal-header'>
              <h2>Contact</h2>
              <button onClick={closeModal}>&times;</button>
            </div>
            <div className='modal-content'>
              {formSubmitted ? ( // Conditionally render based on formSubmitted state
                <div className='success-message'>{message}</div>
              ) : (
                <>
                  <form onSubmit={handleSubmit}>
                    <label className='text-white formname'>
                      Nom
                      <input
                        className='text-black'
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </label>

                    <label className='text-white'>
                      Email:
                      <input
                        className='text-black'
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </label>

                    <label className='text-white'>
                      Message:
                      <textarea
                        className='text-black'
                        name='message'
                        value={formData.message}
                        onChange={handleInputChange}
                        rows='5' // You can adjust this to set the initial visible rows.
                        cols='37' // You can adjust this to set the initial visible columns.
                        style={{ padding: "4px" }}
                      />
                    </label>

                    <input
                      type='hidden'
                      name='_gotcha'
                      style={{ display: "none" }}
                      value={formData._gotcha}
                    />

                    <label className='message text-white'>
                      Message
                    </label>
                    <button type='formsubmit'>Envoyer</button>
                  </form>
                  <div>{message}</div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;
