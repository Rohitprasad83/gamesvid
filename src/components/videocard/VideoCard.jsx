import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  deleteVideo,
  addToWatchLater,
  removeFromWatchLater,
  removeFromHistory,
  addPlaylist,
  deletePlaylistVideo,
  addVideoToPlaylist,
} from 'services'
import { useAuth } from 'context'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

export function VideoCard({ video }) {
  const {
    _id,
    title,
    description,
    views,
    creator,
    duration,
    thumbnail,
    alt,
    category,
    avatar,
    link,
  } = video

  const [openPlaylist, setOpenPlaylist] = useState(false)
  const [createPlaylist, setCreatePlaylist] = useState(false)
  const [playlistTitle, setPlaylistTitle] = useState(false)
  const [playlistDescription, setPlaylistDescription] = useState(false)
  const [playlistId, setPlaylistId] = useState('')
  const [playlists, setPlaylists] = useState([])
  const [watchLaterVideos, setWatchLaterVideos] = useState([])
  const location = useLocation()
  const { encodedToken } = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(`/api/user/playlists`, {
          headers: {
            authorization: encodedToken,
          },
        })
        setPlaylists(response.data.playlists)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [playlists])

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(`/api/user/watchlater`, {
          headers: {
            authorization: encodedToken,
          },
        })
        setWatchLaterVideos(response.data.watchlater)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [watchLaterVideos])

  useEffect(() => {
    const path = location.pathname
    if (path && path.includes('/playlist/')) {
      setPlaylistId(path.substr(10))
    }
  }, [])

  const containsInWatchLater = video => {
    return watchLaterVideos.find(({ _id }) => video._id === _id)
  }
  return (
    <div className="video-card text__md">
      {location.pathname === '/liked-videos' && (
        <span className="trash">
          <i
            className="fa-solid fa-trash-can pointer"
            onClick={() => deleteVideo(_id, dispatch)}></i>
        </span>
      )}

      {location.pathname === '/watch-later' && (
        <span className="trash">
          <i
            className="fa-solid fa-trash-can pointer"
            onClick={() => removeFromWatchLater(_id)}></i>
        </span>
      )}

      {location.pathname.includes('/playlist/') && (
        <span className="trash">
          <i
            className="fa-solid fa-trash-can pointer"
            onClick={() => deletePlaylistVideo(playlistId, _id, title)}></i>
        </span>
      )}

      {location.pathname === '/history' && (
        <span className="trash">
          <i
            className="fa-solid fa-trash-can pointer"
            onClick={() => removeFromHistory(_id)}></i>
        </span>
      )}
      <Link to={`/videos/${_id}`}>
        <img src={thumbnail} alt={alt} className="video-thumbnail" />
      </Link>
      <div className="video-heading">
        <div className="video-avatar">
          <img src={avatar} alt="avatar for Video" className="video-avatar" />
        </div>
        <Link to={`/videos/${_id}`} className="video-title font__bold">
          {title}
        </Link>
      </div>
      <div className="video-channel font__regular text__md">{creator}</div>
      <div className="video-footer">
        <span>{views} views</span>
        <span>
          {' '}
          <i className="fa-solid fa-stopwatch"></i>
          {duration}
        </span>
        <span>
          <i
            className="fa-solid fa-bars video-option"
            onClick={() => setOpenPlaylist(!openPlaylist)}></i>
        </span>
        {openPlaylist && (
          <div className="playlist">
            <div className="text__lg playlist-heading">
              <span>Save To</span>
              <span>
                <i
                  className="fa-solid fa-x pointer"
                  onClick={() => {
                    setOpenPlaylist(false)
                    setCreatePlaylist(false)
                  }}></i>
              </span>
            </div>
            <hr />
            {playlists.map(playlist => (
              <label htmlFor={playlist.title} key={playlist._id}>
                <input
                  type="checkbox"
                  id={playlist.title}
                  onChange={() => {
                    addVideoToPlaylist(playlist._id, video, playlist.title)
                    setOpenPlaylist(false)
                  }}
                  checked={
                    playlist.videos.some(video => video._id === _id)
                      ? true
                      : false
                  }
                />
                {playlist.title}
              </label>
            ))}
            {createPlaylist ? (
              <div className="createPlaylist">
                <input
                  type="text"
                  placeholder="Playlist Title"
                  onChange={e => setPlaylistTitle(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Playlist Description"
                  onChange={e => setPlaylistDescription(e.target.value)}
                  required
                />
                <div
                  className="pointer text__center"
                  onClick={() => {
                    addPlaylist(playlistTitle, playlistDescription)
                    setCreatePlaylist(false)
                  }}>
                  Create
                </div>
              </div>
            ) : (
              <div className="pointer" onClick={() => setCreatePlaylist(true)}>
                <i className="fa-solid fa-plus"></i> Create a new playlist
              </div>
            )}
          </div>
        )}
      </div>
      {containsInWatchLater(video) ? (
        <button
          className="btn btn__secondary btn-full"
          onClick={() => {
            removeFromWatchLater(_id)
          }}>
          Remove From Watch later
        </button>
      ) : (
        <button
          className="btn btn__secondary btn-full"
          onClick={() => {
            addToWatchLater(video)
          }}>
          Watch Later
        </button>
      )}
    </div>
  )
}
