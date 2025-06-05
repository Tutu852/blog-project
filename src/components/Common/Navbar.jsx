import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../services/operations/authAPI"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-1 shadow-md bg-white">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-black">
        BlogApp
      </Link>

      {/* Right side options */}
      <div className="flex items-center gap-4">
        {token ? (
          <>
            {/* Profile Dropdown */}
            <ProfileDropdown />

            {/* Create Blog Button */}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => navigate("/create")}
            >
              Create Blog
            </button>

            {/* Logout Button */}
            <button
              onClick={() => dispatch(logout(navigate))}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                SignUp
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
