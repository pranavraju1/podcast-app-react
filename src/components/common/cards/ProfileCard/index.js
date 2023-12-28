import React from 'react'

const ProfileCard = ({displayImage}) => {
  return (
    <div className='podcast-card'>
      <img className='display-image-podcast' src={displayImage}/>
    </div>
  )
}

export default ProfileCard