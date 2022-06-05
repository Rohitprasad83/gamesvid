import React from 'react'
import './playlistCard.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deletePlaylist } from 'features/playlist/playlistSlice'

export default function PlaylistCard({ playlist }) {
  const { title, description, videos, _id } = playlist
  const encodedToken = localStorage.getItem('token')
  const dispatch = useDispatch()

  return (
    <div className="playlist-card text__md pointer">
      <div className="font__bold flex-space-between">
        <Link to={`/playlist/${_id}`} className="text__xl">
          {title}
        </Link>
        <span>
          <i
            className="fa-solid fa-trash-can pointer"
            onClick={() => {
              dispatch(deletePlaylist({ _id, encodedToken }))
            }}></i>
        </span>
      </div>
      <div>{description}</div>
      <div>{videos.length} videos</div>
    </div>
  )
}
