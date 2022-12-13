import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosInstance } from '../../config'
import './sideBar.css'
export default function Sidebar() {
  const [cats, setCats] = useState([])

  useEffect(() => {
    const getCats = async () => {
      const res = await axiosInstance.get('/categories')
      setCats(res.data)
    }
    getCats()
  }, [])

  return (
    <div className='sideBar'>
      <div className='sideBarItem'>
        <span className='sideBarTitle'>About Me</span>
        <img className='sideBarImg' src='/img/smiley.jpeg' alt='' />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat
          nibh sed pulvinar proin gravida hendrerit lectus. Arcu cursus euismod
          quis viverra nibh cras pulvinar mattis nunc.
        </p>
      </div>
      <div className='sideBarItem'>
        <span className='sideBarTitle'>Catagories</span>
        <ul className='sideBarList'>
          {cats.map((cat) => (
            <Link className='link' to={`/?cat=${cat.name}`}>
              <li className='sideBarListItem'>{cat.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className='sideBarItem'>
        <span className='sideBarTitle'>Follow Us</span>
        <div className='sideBarSocial'>
          <i className='fa-brands fa-square-facebook sideBarIcon'></i>
          <i className='fa-brands fa-square-twitter sideBarIcon'></i>
          <i className='fa-brands fa-square-instagram sideBarIcon'></i>
        </div>
      </div>
    </div>
  )
}
