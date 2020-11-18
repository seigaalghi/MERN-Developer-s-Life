import React from 'react';
import { Link } from 'react-router-dom';

const ProfileList = ({ profiles }) => {
  const profile = profiles.map((prof) => (
    <div className='profile bg-light' key={prof._id}>
      <img className='round-img' src={prof.user.avatar} alt='' />
      <div>
        <h2>{prof.user.name}</h2>
        <p>
          {prof.status} at {prof.company}
        </p>
        <p>{prof.location}</p>
        <Link to={`/profile/${prof.user._id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>

      <ul>
        {prof.skills.map((skill, index) => (
          <li className='text-primary' key={index}>
            <i className='fas fa-check'></i>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  ));
  return <div className='profiles'>{profile}</div>;
};

export default ProfileList;
