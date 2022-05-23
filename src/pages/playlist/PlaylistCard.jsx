import React from 'react'
import { deletePlaylist } from 'services'
import './playlistCard.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export default function PlaylistCard({ playlist }) {
  const { title, description, videos, _id } = playlist
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
              deletePlaylist(_id, dispatch)
            }}></i>
        </span>
      </div>
      <div>{description}</div>
      <div>{videos.length} videos</div>
    </div>
  )
}
