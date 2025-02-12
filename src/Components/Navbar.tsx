import React from 'react'
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <header className="z-50 navbar bg-base-100 text-primary-content h-[60px] align-middle text-center w-full fixed top-0 p-[20px] flex justify-between">
    <div className="font-bold text-blue-600">
    Skix
    </div>
    <nav>
     <ul className="flex gap-2 justify-between">
     <li><Link className="text-secondary" to="/new">New</Link></li>
     <li><Link className="text-secondary" to="/dashboard">dashboard</Link></li>
      <li><Link className="text-secondary" to="/auth/signup">Account</Link></li>
     </ul>
    </nav>
    </header>
  )
}

export default Navbar