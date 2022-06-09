import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  deletePlaylist,
  getAllPlaylistVideos,
} from 'features/playlist/playlistSlice'
import { Navbar, Footer, VideoCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useTitle } from 'utils/useTitle'

export function SinglePlaylist() {
  const encodedToken = localStorage.getItem('token')
  const navigate = useNavigate()
  const { playlistId } = useParams()
  const _id = playlistId
  const playlist = useSelector(state => state.playlist.currentPlaylist)
  const dispatch = useDispatch()

  useTitle(' | Playlist')

  useEffect(() => {
    dispatch(getAllPlaylistVideos({ playlistId, encodedToken }))
  }, [playlist])
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
                dispatch(deletePlaylist({ _id, encodedToken }))
                navigate('/playlist')
              }}>
              Delete Playlist
            </button>
          </div>
          <div className="text__lg">Description - {playlist.description}</div>
        </div>

        <div className="videos-container">
          {playlist.videos &&
            playlist.videos.map(video => (
              <VideoCard video={video} key={video._id} />
            ))}

          {playlist.videos && playlist.videos.length < 1 && (
            <div className="add-videos">
              <h4>You haven't added any videos to the playlist</h4>
              <button
                className="btn btn__secondary navbar-btn"
                onClick={() => navigate('/videos')}>
                Add videos
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
