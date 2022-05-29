import { useState, useEffect } from 'react'
import { Navbar, Footer, VideoCard } from 'components'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { videos } from 'backend/db/videos'
import { addPlaylist, deletePlaylistVideo, addVideoToPlaylist } from 'services'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getVideo } from 'features/videos/videosSlice'
import { likeVideo } from 'features/likedvideos/likedVideosSlice'
import { addToWatchLater } from 'features/watchlater/watchLaterSlice'
import { addToHistory } from 'features/historyvideos/historyVideosSlice'
export function SingleVideo() {
  let { videoId } = useParams()
  const { video } = useSelector(state => state.videos)
  const playlistsInStore = useSelector(state => state.playlist.playlists)

  const [playlists, setPlaylists] = useState([])
  const [openPlaylist, setOpenPlaylist] = useState(false)
  const [createPlaylist, setCreatePlaylist] = useState(false)
  const [playlistTitle, setPlaylistTitle] = useState(false)
  const [playlistDescription, setPlaylistDescription] = useState(false)
  const { _id, title, description, views, creator, duration, avatar, link } =
    video

  const encodedToken = localStorage.getItem('token')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getVideo(videoId))
  }, [videoId])

  useEffect(() => {
    dispatch(addToHistory({ video, encodedToken }))
  }, [video, videoId])

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(`/api/user/playlists`, {
          headers: {
            authorization: encodedToken,
          },
        })
        setPlaylists(playlistsInStore)
      } catch (error) {}
    })()
  }, [playlistsInStore])
  return (
    <div className="home__container">
      <Navbar />
      <div className="main__container single-video-container">
        <div className="single-video text__lg">
          <div className="video-player">
            <iframe
              className="video-iframe"
              src={link}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          </div>
          <div className="single-video-footer">
            <div className="text__xl font__bold">{title}</div>
            <div className="single-video-details">
              <div className="single-video-icons">
                <span
                  className="pointer"
                  onClick={() => dispatch(likeVideo({ video, encodedToken }))}>
                  <i className="fa-regular fa-thumbs-up"></i> Like
                </span>
                <span className="pointer">
                  <i className="fa-regular fa-thumbs-down"></i>Dislike
                </span>
                <span
                  className="pointer"
                  onClick={() =>
                    dispatch(addToWatchLater({ video, encodedToken }))
                  }>
                  <i className="fa-regular fa-heart"></i>Add to Watch Later
                </span>
                <span
                  className="pointer"
                  onClick={() => setOpenPlaylist(!openPlaylist)}>
                  <i className="fa-solid fa-layer-group"></i>Add to Playist
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
                            addVideoToPlaylist(
                              playlist._id,
                              video,
                              playlist.title,
                              dispatch
                            )
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
                            addPlaylist(
                              playlistTitle,
                              playlistDescription,
                              dispatch
                            )
                            setCreatePlaylist(false)
                          }}>
                          Create
                        </div>
                      </div>
                    ) : (
                      <div
                        className="pointer"
                        onClick={() => setCreatePlaylist(true)}>
                        <i className="fa-solid fa-plus"></i> Create a new
                        playlist
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="video-side-details">
                <span>{views} views</span>
                <span>
                  {duration} <i className="fa-solid fa-stopwatch"></i>
                </span>
              </div>
            </div>
            <div className="creator-details">
              <div className="video-avatar">
                <img
                  src={avatar}
                  alt="avatar for Video"
                  className="video-avatar"
                />
              </div>
              <div>{creator}</div>
            </div>
            <div className="font__bold">Description</div>
            <div className="text__md">{description}</div>
          </div>
        </div>
        <div className="side-videos">
          {videos.map(video => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
