import React from 'react'
import { deletePlaylist } from 'services'
import './playlistCard.css'
import { Link } from 'react-router-dom'
export default function PlaylistCard({ playlist }) {
  const { title, description, videos, _id } = playlist
  return (
    <Link to={`/playlist/${_id}`} className="playlist-card text__md pointer">
      <div className="font__bold flex-space-between">
        <span className="text__xl">{title}</span>
        <span>
          <i
            className="fa-solid fa-trash-can pointer"
            onClick={() => deletePlaylist(_id)}></i>
        </span>
      </div>
      <div>{description}</div>
      <div>{videos.length} videos</div>
    </Link>
  )
}
