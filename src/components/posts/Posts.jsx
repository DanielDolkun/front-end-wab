import './posts.css'
import Post from '../post/Post'

export default function Posts(props) {
  return (
    <div className='posts'>
      {props.posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  )
}
