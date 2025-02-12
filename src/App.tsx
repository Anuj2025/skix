import React from 'react'
import {Routes, Route} from "react-router-dom"
import New from "./Pages/New.tsx"
import Dashboard from "./Pages/Dashboard"
import Auth from "./_Auth/Auth.tsx"
import {toast, Toaster} from "react-hot-toast"
import Editor from "./Pages/Editor"
import Home from "./Pages/Home.tsx"

const App = () => {
  return (
    <div>
    <Toaster />
<div>
<div className="w-2 flex center text-center flex justify-center align-middle" >
   <p className="flex mt-10 mr-10 relative float-right">Mode</p> <input type="checkbox" value="dark" className="flex mt-10 m-1.5 relative float-right toggle theme-controller" />
</div>
</div>
<main>
 <Routes>
<Route path="/new" element={<New />} />
<Route path="/" element={<Home />} />
<Route path="/Auth/signin" element={<Auth type="signin" />} />
<Route path="/Auth/signup" element={<Auth type="signupc" />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/editor/:Document" element={<Editor />} />
 </Routes>
</main>
    </div>
  )
}

export default App