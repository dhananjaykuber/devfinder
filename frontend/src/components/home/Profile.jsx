import React from 'react';

const Profile = ({ profile }) => {
  return (
    <div className="profile">
      <img src={profile.image} alt={`${profile.name}_profile_image`} />
      <h4>{profile.name}</h4>
      <span>{profile.role}</span>
    </div>
  );
};

export default Profile;
