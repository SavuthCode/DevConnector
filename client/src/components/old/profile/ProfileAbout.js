import React, { Fragment } from 'react'
import ProfileTope from './ProfileTop'

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: {
      name
    }
  }
}) => { 
  return (
    <div class="profile-about bg-light p-2">
      {bio &&(
        <Fragment>
          <h2 class="text-primary">{bio} Bio</h2>
          <p>
            {bio}
          </p>
      </Fragment>
      )}
      
      
      <div class="line"></div>
      <h2 class="text-primary">Skill Set</h2>
      <div class="skills">
        {skills.map((skill,index) =>(
          <div id={index} class="p-1"><i class="fa fa-check"></i>{skill}</div>
        ))}
      </div>
    </div>
  )
}


export default ProfileAbout