import React, { useState, useEffect } from 'react'
import { useAuth } from 'context'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Navbar, Footer, VideoCard } from 'components'
import { deletePlaylist } from 'services'

export function SinglePlaylist() {
  const [playlist, setPlaylist] = useState({})
  const [playlistVideos, setPlaylistVideos] = useState([])
  const { encodedToken } = useAuth()
  const { playlistId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(`/api/user/playlists/${playlistId}`, {
          headers: {
            authorization: encodedToken,
          },
        })
        setPlaylist(response.data.playlist)
        setPlaylistVideos(response.data.playlist.videos)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  return (
    <div className="home__container">
      <Navbar />
      <div className="main__container ">
        <div className="playlist-container-heading">
          <div className="flex-space-between">
            <span className="text__xl font__bold">{playlist.title}</span>
            <button
              className="btn btn__error__outlined"
              onClick={() => {
                deletePlaylist(playlistId)
                navigate('/playlist')
              }}>
              Delete Playlist
            </button>
          </div>
          <div className="text__lg">Description - {playlist.description}</div>
        </div>

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
