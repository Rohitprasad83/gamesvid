import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  deletePlaylist,
  getAllPlaylistVideos,
} from 'features/playlist/playlistSlice'
import { Navbar, Footer, VideoCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'

export function SinglePlaylist() {
  const encodedToken = localStorage.getItem('token')
  const navigate = useNavigate()
  const { playlistId } = useParams()
  const _id = playlistId
  const playlist = useSelector(state => state.playlist.currentPlaylist)
  const dispatch = useDispatch()

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
        </div>
      </div>
      <Footer />
    </div>
  )
}
