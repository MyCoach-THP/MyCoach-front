import React from 'react';

const Description = () => {
  return (
    <div style={{ width: '100%', color: 'black', textAlign: 'center', fontSize: '20px' }}>

      <h1 className='description-title'>
        Bienvenue
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10vh', marginRight: '10vh' }}>

        <img
          src="https://res.cloudinary.com/do3pr1kdp/image/upload/v1694527566/Mycoach/onhbpybwcs5tv7l0shaj.png"
          alt="Coach"
          style={{ width: '30vh', height: 'auto', marginRight: '5vh', marginLeft: '3vh' }}
        />

        <div>
          <p>
            Êtes-vous prêt à transformer votre vie sportive et à atteindre vos objectifs de forme physique? <strong><span style={{ color: '#00ccff' }}> My</span>Coach</strong> est la plateforme qu'il vous faut! Avec une vaste sélection de coachs, des programmes adaptés à tous les niveaux et un soutien constant, nous sommes ici pour vous guider à chaque étape. Plus qu'une simple plateforme, MyCoach est une communauté où chaque membre est valorisé, soutenu et motivé à exceller. Ne laissez pas passer cette chance ! Rejoignez-nous dès aujourd'hui et découvrez le meilleur de vous-même.
          </p>
        </div>

      </div>


    </div >
  );
}

export default Description;
