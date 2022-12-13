import './header.css'

export default function Header() {
  return (
    <div className='header'>
      <div className='headerTitles'>
        <span className='headerTitlePre'>Welcome to</span>
        <span className='headerTitleMain'>Write-a-Blog!</span>
      </div>
      <img className='headerImg' src='/img/better-background.jpg' alt='' />
    </div>
  )
}
