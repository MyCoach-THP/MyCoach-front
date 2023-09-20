import React from "react";

const Description = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn) {
    return (
      <div className='description-container'>
        <p className='description-text'>
          Vous prêt à transformer votre vie sportive et à atteindre vos
          objectifs de forme physique!
        </p>

        <p className='description-highlight'>
          <strong>
            <span className='description-blue'>My</span>Coach
          </strong>{" "}
          vous aide tout au long du chemin!
        </p>

        <img
          src='https://res.cloudinary.com/do3pr1kdp/image/upload/v1694527566/Mycoach/onhbpybwcs5tv7l0shaj.png'
          alt='Coach'
          className='description-image'
          width='1000'
          height='500'
        />

        <p className='description-text'>
          Nos coachs sont là pour vous guider à chaque étape.
        </p>
      </div>
    );
  }

  return (
    <div className='description-container'>
      <h1 className='description-title'>Bienvenue</h1>

      <p className='description-text'>
        Êtes-vous prêt à transformer votre vie sportive et à atteindre vos
        objectifs de forme physique?
      </p>

      <p className='description-highlight'>
        <strong>
          <span className='description-blue'>My</span>Coach
        </strong>{" "}
        est la plateforme qu'il vous faut!
      </p>

      <img
        src='https://res.cloudinary.com/do3pr1kdp/image/upload/v1694527566/Mycoach/onhbpybwcs5tv7l0shaj.png'
        alt='Coach'
        className='description-image'
        width='1000'
        height='500'
      />

      <p className='description-text'>
        Avec une vaste sélection de coachs, des programmes adaptés à tous les
        niveaux et un soutien constant, nous sommes ici pour vous guider à
        chaque étape.
      </p>
      <p className='description-text-small'>
        Plus qu'une simple plateforme, MyCoach est une communauté où chaque
        membre est valorisé, soutenu et motivé à exceller.
      </p>
      <p className='description-call-to-action'>
        Ne laissez pas passer cette chance ! Rejoignez-nous dès aujourd'hui et
        découvrez le meilleur de vous-même.
      </p>
    </div>
  );
};

export default Description;
