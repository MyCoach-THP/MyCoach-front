const UserCoachInfo = ({ profileData, trainingPlans }) => {
  return (
    <>
      <div className='mb-4'>
        <strong>Nom :</strong> {profileData.lastname}
      </div>
      <div className='mb-4'>
        <strong>Prénom :</strong> {profileData.firstname}
      </div>
      <div className='mb-4'>
        <strong>Description :</strong> {profileData.description}
      </div>
      <h2 className='table-header text-xl mb-4 text-center'>
        Le(s) programme(s) d'entraînement(s) que je propose:
      </h2>
      <ul className='list-decimal list-inside'>
        {trainingPlans.map((plan) => (
          <li key={plan.id}>
            {plan.name}: {plan.price}€
          </li>
        ))}
      </ul>
      {/* Ici, ajoutez des boutons pour créer ou supprimer des plans d'entraînement */}
    </>
  );
};

export default UserCoachInfo;
