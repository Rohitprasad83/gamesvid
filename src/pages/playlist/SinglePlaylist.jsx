import React, { useState, useEffect } from 'react'
import { useAuth } from 'context'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Navbar, Footer, VideoCard } from 'components'

export function SinglePlaylist() {
  const [playlistVideos, setPlaylistVideos] = useState([])
  const { encodedToken } = useAuth()
  let { playlistId } = useParams()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(`/api/user/playlists/${playlistId}`, {
          headers: {
            authorization: encodedToken,
          },
        })
        setPlaylistVideos(response.data.playlist.videos)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [playlistId])
  return (
    <div className="home__container">
      <Navbar />
      <div className="main__container ">
        <div className="videos-container">
          {playlistVideos.map(video => (
            <VideoCard video={video} key={video._id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
