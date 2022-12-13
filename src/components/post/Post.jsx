import { Link } from 'react-router-dom'
import './post.css'

export default function Post(props) {
  const PF = 'https://write-a-blog.herokuapp.com/images/'
  return (
    <div className='post'>
      {props.post.photo && (
        <img className='postImg' src={PF + props.post.photo} alt='' />
      )}
      <div className='postInfo'>
        <div className='postCats'>
          {props.post.categories.map((category) => (
            <span className='postCat'>{category}</span>
          ))}
        </div>
        <Link className='link' to={`/post/${props.post._id}`}>
          <span className='postTitle'>{props.post.title}</span>
        </Link>
        <hr />
        <span className='postDate'>
          {' '}
          {new Date(props.post.createdAt).toDateString()}{' '}
        </span>
      </div>
    </div>
  )
}
