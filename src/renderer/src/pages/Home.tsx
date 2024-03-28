import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <div className="text-xl text-black">Home</div>
      <Link to="settings">Go to Settings</Link>
    </>
  )
}

export default Home
