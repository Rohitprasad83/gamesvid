import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteVideo } from 'features/likedvideos/likedVideosSlice'
import {
  addToWatchLater,
  removeFromWatchLater,
  getAllWatchLaterVideos,
} from 'features/watchlater/watchLaterSlice'
import { removeFromHistory } from 'features/historyvideos/historyVideosSlice'
import {
  getAllPlaylists,
  addPlaylist,
  deletePlaylistVideo,
  addVideoToPlaylist,
} from 'features/playlist/playlistSlice'

export function VideoCard({ video }) {
  const { _id, title, views, creator, duration, thumbnail, alt, avatar } = video

  const [openPlaylist, setOpenPlaylist] = useState(false)
  const [createPlaylist, setCreatePlaylist] = useState(false)
  const [playlistTitle, setPlaylistTitle] = useState(false)
  const [playlistDescription, setPlaylistDescription] = useState(false)
  const [playlistId, setPlaylistId] = useState('')
  const location = useLocation()
  const encodedToken = localStorage.getItem('token')
  const dispatch = useDispatch()
  const playlists = useSelector(state => state.playlist.playlists)
  const watchLaterVideos = useSelector(state => state.watchLater.videos)

  useEffect(() => {
    dispatch(getAllPlaylists({ encodedToken }))
  }, [])

  useEffect(() => {
    dispatch(getAllWatchLaterVideos({ encodedToken }))
  }, [])

  useEffect(() => {
    const path = location.pathname
    if (path && path.includes('/playlist/')) {
      setPlaylistId(path.substr(10))
    }
  }, [])

  const containsInWatchLater = video => {
    return watchLaterVideos.find(({ _id }) => video._id === _id)
  }

  const containsInPlaylist = (video, playlist) => {
    return playlist.videos.find(v => v._id === video._id)
  }
  return (
    <div className="video-card text__md">
      {location.pathname === '/liked-videos' && (
        <span className="trash">
          <i
            className="fa-solid fa-trash-can pointer"
            onClick={() => dispatch(deleteVideo({ _id, encodedToken }))}></i>
        </span>
      )}

      {location.pathname === '/watch-later' && (
        <span className="trash">
          <i
            className="fa-solid fa-trash-can pointer"
            onClick={() => {
              dispatch(removeFromWatchLater({ _id, encodedToken }))
            }}></i>
        </span>
      )}

      {location.pathname.includes('/playlist/') && (
        <span className="trash">
          <i
            className="fa-solid fa-trash-can pointer"
            onClick={() =>
              dispatch(deletePlaylistVideo({ playlistId, _id, encodedToken }))
            }></i>
        </span>
      )}

      {location.pathname === '/history' && (
        <span className="trash">
          <i
            className="fa-solid fa-trash-can pointer"
            onClick={() =>
              dispatch(removeFromHistory({ _id, encodedToken }))
            }></i>
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
            onClick={() => {
              setOpenPlaylist(!openPlaylist)
              dispatch(getAllPlaylists({ encodedToken }))
            }}></i>
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
                    dispatch(
                      addVideoToPlaylist({
                        playlist,
                        video,
                        encodedToken,
                      })
                    )
                    dispatch(getAllPlaylists({ encodedToken }))
                    setOpenPlaylist(false)
                  }}
                  checked={containsInPlaylist(video, playlist)}
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
                    dispatch(
                      addPlaylist({
                        playlistTitle,
                        playlistDescription,
                        encodedToken,
                      })
                    )
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
            dispatch(removeFromWatchLater({ _id, encodedToken }))
          }}>
          Remove From Watch later
        </button>
      ) : (
        <button
          className="btn btn__secondary btn-full"
          onClick={() => {
            dispatch(addToWatchLater({ video, encodedToken }))
          }}>
          Watch Later
        </button>
      )}
    </div>
  )
}
