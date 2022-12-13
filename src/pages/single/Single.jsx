import Sidebar from '../../components/side-bar/Sidebar'
import SinglePost from '../../components/singlePost/SinglePost'
import './single.css'

export default function Single() {
  return (
    <div className='single'>
      <SinglePost />
      <Sidebar />
    </div>
  )
}
