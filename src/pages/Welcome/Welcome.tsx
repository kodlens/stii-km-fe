import { useState } from 'react'
import { Link } from 'react-router';
import './style.css'

const welcome = () => {

  const [search, setSearch] = useState('')
  
  const handleKeyDown = (e:any) => {
    e.preventDefault();
    console.log(search);
  }
  
  return (
  <>
    <header className="relative z-10 header-area header-sticky">
      <nav className="flex p-10">
        
        <Link to="/" className="logo">
          <img src="./images/logo.png" alt="" style={{ width: "158px" }} />
        </Link>
        
        <div className="nav ml-auto">
          <div><Link to="/" className="active">Home</Link></div>
          <div><Link to="#">Latest Topics</Link></div>
          <div><Link to="#">About Us</Link></div>
        </div>
        
        {/* <a className='menu-trigger'>
                <span>Menu</span>
            </a> */}
      </nav>
    </header>

    <div className="absolute inset-0 main-banner" style={{
      backgroundImage: `url(./images/banner-bg.jpg)`,
      borderRadius: `0px 0px 150px 150px`,
      backgroundPosition: `center bottom`,
      backgroundRepeat: `no-repeat`,
      backgroundSize: `cover`,
      padding: `225px 0px`,
      zIndex: -1
    }}>
      
      <div className="">
        <div className="text-center">
          <div className="caption header-text">
            <h6 className='text-2xl font-bold text-white p-4 uppercase md:leading-4'>Welcome To</h6>
            <h2 className='text-6xl font-extrabold text-white uppercase p-4 md:leading-8 font-sa'>STII - Knowledge Management</h2>
            <p className='w-7xl mx-auto md:leading-6 mt-4 text-white'>The Science and Technology Information Institute (STII) champions knowledge management by organizing, preserving, and disseminating credible S&T resources to support evidence-based decision-making and innovation. Through its digital platforms and partnerships, STII ensures accessible and inclusive information delivery for researchers, educators, and the general public.</p>
            <div className="search-input">
              <form id="search" action="#">
                <input type="text"
                       placeholder="Search here..."
                       name="search"
                       value={search}
                       onKeyDown={(e)=> {
                         if(e.key === 'Enter'){
                           handleKeyDown(e)
                         }
                       }}
                       onChange={(e)=>setSearch(e.target.value)}
                       autoComplete='off'/>
                <button type="button" className={'cursor-pointer'} onClick={()=>{
                  console.log(search);
                }}>Search Now</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default welcome