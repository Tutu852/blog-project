// App.jsx
import React from "react"
import {   Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import CreateBlog from "./pages/CreateBlog"

import EditBlog from "./pages/EditDetails"
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import Navbar from "./components/Common/Navbar"
import VerifyEmail from "./pages/verifyEmail"
import EditDetails from "./pages/EditDetails"

function App() {
  return (
    <div>
       <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        {/* <Route path="/blog/:id" element={<BlogDetail />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/editblog/:blogId" element={<EditDetails />} />
        </Route>
      </Routes>
    </div>
     
 
  )
}

export default App
