const UserRegularInfo = ({ profileData }) => {
  return (
    <>
      <img
        src={profileData.image_url}
        alt='User Profile Picture'
        className='profile-picture'
      />

      <div className='mb-4'>
        <strong>Nom :</strong> {profileData.lastname}
      </div>
      <div className='mb-4'>
        <strong>Prénom :</strong> {profileData.firstname}
      </div>
      <div className='mb-4'>
        <strong>Description :</strong> {profileData.description}
      </div>
    </>
  );
};

export default UserRegularInfo;
