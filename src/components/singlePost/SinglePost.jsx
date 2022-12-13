import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { axiosInstance } from '../../config'
import { Context } from '../../context/Context'
import './singlePost.css'

export default function SinglePost() {
  const location = useLocation()
  const path = location.pathname.split('/')[2]
  const [post, setPost] = useState({})
  const PF = 'https://write-a-blog.herokuapp.com/images/'
  const { user } = useContext(Context)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [updateMode, setUpdateMode] = useState(false)

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get('/posts/' + path)
      setPost(res.data)
      setTitle(res.data.title)
      setContent(res.data.content)
    }
    getPost()
  }, [path])

  const handleDelete = async () => {
    try {
      await axiosInstance.delete('/posts/' + path, {
        data: { username: user.username },
      })
      window.location.replace('/')
    } catch (err) {}
  }

  const handleUpdate = async () => {
    try {
      await axiosInstance.put('/posts/' + path, {
        username: user.username,
        title,
        content,
      })
      setUpdateMode(false)
    } catch (err) {}
  }
  return (
    <div className='singlePost'>
      <div className='singlePostContainer'>
        {post.photo && (
          <img className='singlePostImg' src={PF + post.photo} alt='' />
        )}
        {updateMode ? (
          <input
            className='singlePostTitleInput'
            type='text'
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className='singlePostTitle'>
            {title}
            {post.username === user?.username && (
              <div className='singlePostEdit'>
                <i
                  className='singlePostIcon fa-solid fa-pen-to-square'
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className='singlePostIcon fa-solid fa-trash'
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className='singlePostInfo'>
          <span className='singlePostAuthor'>
            Author:
            <Link className='link' to={`/?user=${post.username}`}>
              <strong>{post.username}</strong>
            </Link>
          </span>
          <span className='singlePostDate'>
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className='singlePostContentInput'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <p className='singlePostContent'>{content}</p>
        )}
        {updateMode && (
          <button className='singlePostButton' onClick={handleUpdate}>
            Update!
          </button>
        )}
      </div>
    </div>
  )
}
