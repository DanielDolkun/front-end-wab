import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import './topbar.css'

export default function TopBar() {
  const { user, dispatch } = useContext(Context)
  const PF = 'https://back-end-wab.adaptable.app/images/'

  const handleLogout = async () => {
    dispatch({ type: 'LOGOUT' })
  }
  return (
    <div className='top'>
      <div className='topLeft'>
        <i className='fa-brands fa-square-facebook topIcon'></i>
        <i className='fa-brands fa-square-twitter topIcon'></i>
        <i className='fa-brands fa-square-instagram topIcon'></i>
      </div>
      <div className='topCenter'>
        <ul className='topList'>
          <li className='topListItem'>
            <Link to='/' className='link'>
              Home
            </Link>
          </li>
          <li className='topListItem'>
            <Link to='/' className='link'>
              About
            </Link>
          </li>
          <li className='topListItem centerItem'>
            <Link to='/write' className='link'>
              Write
            </Link>
          </li>
          <li className='topListItem'>
            <Link to='/' className='link'>
              Contact
            </Link>
          </li>
          <li className='topListItem' onClick={handleLogout}>
            {user && 'Logout'}
          </li>
        </ul>
      </div>
      <div className='topRight'>
        {user ? (
          <Link className='link' to='/settings'>
            <img
              className='topImg'
              src={
                user.profilePic === ''
                  ? '/img/topImg.jpeg'
                  : PF + user.profilePic
              }
              alt=''
            />
          </Link>
        ) : (
          <>
            <ul className='topList'>
              <li className='topListItem'>
                <Link className='link' to='/login'>
                  Login
                </Link>
              </li>
              <li className='topListItem'>
                <Link className='link' to='/register'>
                  Register
                </Link>
              </li>
            </ul>
          </>
        )}
        <i className='fa-solid fa-magnifying-glass search'></i>
      </div>
    </div>
  )
}
