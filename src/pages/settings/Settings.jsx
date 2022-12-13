import { useContext, useState } from 'react'
import Sidebar from '../../components/side-bar/Sidebar'
import { axiosInstance } from '../../config'
import {
  UpdateFailure,
  UpdateStart,
  UpdateSuccess,
} from '../../context/Actions'
import { Context } from '../../context/Context'
import './settings.css'

export default function Settings() {
  const [file, setFile] = useState(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)

  const { user, dispatch } = useContext(Context)
  const PF = 'https://write-a-blog.herokuapp.com/images/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(UpdateStart)
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    }
    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append('name', filename)
      data.append('file', file)
      updatedUser.profilePic = filename
      try {
        await axiosInstance.post('/upload', data)
      } catch (err) {}
    }
    try {
      const res = await axiosInstance.put('/users/' + user._id, updatedUser)
      setSuccess(true)
      dispatch(UpdateSuccess(res.data))
    } catch (err) {
      dispatch(UpdateFailure)
    }
  }

  return (
    <div className='settings'>
      <div className='settingsContainer'>
        <div className='settingTitle'>
          <span className='settingsUpdateTitle'>Update your Profile!</span>
          <span className='settingsDeleteTitle'>Delete Profile</span>
        </div>
        <form className='settingsForm' onSubmit={handleSubmit}>
          <div className='settingsPP'>
            <label className='PPLabel'>Profile Picture</label>
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=''
            />
            <label htmlFor='fileinput'>
              <i className='settingsPPIcon fa-solid fa-user'></i>
            </label>
            <input
              type='file'
              id='fileinput'
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className='settingsInfo'>
            <label>Username</label>
            <input
              type='text'
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
              type='email'
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='settingsSubmit' type='submit'>
              Update
            </button>
            {success && (
              <span className='successfulUpdate'>Updated Successfully!</span>
            )}
          </div>
        </form>
      </div>
      <Sidebar />
    </div>
  )
}
