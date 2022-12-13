import { useContext, useState } from 'react'
import './write.css'
import { Context } from '../../context/Context'
import { axiosInstance } from '../../config'

export default function Write() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)
  const { user } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPost = {
      username: user.username,
      title,
      content,
    }
    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append('name', filename)
      data.append('file', file)
      newPost.photo = filename
      try {
        await axiosInstance.post('/upload', data)
      } catch (err) {}
    }
    try {
      const res = await axiosInstance.post('/posts', newPost)
      window.location.replace('/post/' + res.data._id)
    } catch (err) {}
  }

  return (
    <div className='write'>
      {file && (
        <img className='writeImg' src={URL.createObjectURL(file)} alt='' />
      )}

      <form className='writeForm' onSubmit={handleSubmit}>
        <div className='writeFormGroup'>
          <input
            type='file'
            id='fileInput'
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type='text'
            placeholder='Title'
            className='writeInput'
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor='fileInput'>
            <i className='writeIcon fa-solid fa-image'></i>
          </label>
          <button className='writeSubmit' type='submit'>
            Share!
          </button>
        </div>
        <div className='writeFormGroup'>
          <textarea
            placeholder='Share your thoughts...'
            type='text'
            rows='10'
            className='writeInput writeText'
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
      </form>
    </div>
  )
}
