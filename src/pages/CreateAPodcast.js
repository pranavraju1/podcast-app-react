import React from 'react'
import Header from '../components/common/Headers'
import CreatePodcastFrom from '../components/StartAPodcast/CreatePodcastFrom'

const CreateAPodcast = () => {
  return (
    <div>
      <Header/>
      <div className="input-wrapper">
        <h1>Create a Podcast</h1>
        <CreatePodcastFrom/>
      </div>

    </div>
  )
}

export default CreateAPodcast