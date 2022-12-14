import React, { Component } from 'react';
import PropTypes from 'prop-types';
const ProfileTope = ({
  profile:{
    status,
    company,
    location,
    website,
    social,
    user:{
      name,
      avatar
    }
  }
}) => {
  return (
    <div class="profile-top bg-primary p-2">
      <img
        class="round-img my-1"
        src={avatar}
        alt=""
      />
      <h1 class="large">{name}</h1>
      <p class="lead">
        {status} {company && <span>at {company}</span>}
      </p>
      <p>{location}</p>
      
      <div class="icons my-1">
      {
        website &&(
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i class="fas fa-globe fa-2x">website</i>
          </a>
        )
      }

     {  
        social && social.facebook &&(
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i class="fas fa-globe fa-2x">facebook</i>
          </a>
        )
      }

      {  
        social && social.youtube &&(
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i class="fas fa-globe fa-2x">youtube</i>
          </a>
        )
      }
      </div>
    </div>
  )
}

ProfileTope.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTope