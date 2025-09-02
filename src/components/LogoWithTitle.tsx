import { Link } from "react-router"

const LogoWithTitle = () => {
  return (
    <>
        <Link to='/'>
            <img src="/images/header-logo.png" className="block mx-auto mb-6"/>
        </Link>
    </>
  )
}

export default LogoWithTitle