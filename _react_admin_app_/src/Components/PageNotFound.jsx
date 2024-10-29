import React from "react";
import image from '../Assestss/Pagenotfound.jpg'
import './PageNotfound.css'
import { useSelector } from "react-redux";

function Error() {
  const store=useSelector(items=> items.privateroute
  
  )
   
  
  return (
    <>
    <nav className="navigate">
      {store ?
        <>
            <a href='/dashboard'> Dashboard</a>
          <img className='notfound' src={image} alt="errorimage"></img>
        </>
        :
        <>
            <a href='/'> Login</a>
          <img className='notfound' src={image} alt="errorimage"></img>
        </>
      }
      </nav>

    </>
  )
}

export default Error 
