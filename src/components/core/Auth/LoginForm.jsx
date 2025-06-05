import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { login } from "../../../services/operations/authAPI"

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(formData.email, formData.password, navigate))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-y-4 mt-6"
    >
      <h2 className="text-2xl font-bold text-yellow-50 text-center">Login</h2>

      {/* Email Field */}
      <label className="w-full">
        <span className="text-sm text-[#F1F1F1] mb-1">
          Email Address <sup className="text-[#FF6B6B]">*</sup>
        </span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
          className="form-style bg-[#0F3460] border border-gray-600 rounded-md px-4 py-2 pr-10 text-[#F1F1F1] placeholder-gray-400 w-full"
        />
      </label>

      {/* Password Field */}
      <label className="w-full">
        <span className="text-sm text-[#F1F1F1] mb-1">
          Password <sup className="text-[#FF6B6b]">*</sup>
        </span>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
          className="form-style bg-[#0F3460] border border-gray-600 rounded-md px-4 py-2 pr-10 text-[#F1F1F1] placeholder-gray-400 w-full"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-9 cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={22} className="text-richblack-200" />
          ) : (
            <AiOutlineEye size={22} className="text-richblack-200" />
          )}
        </span>
        <Link
          to="/forgot-password"
          className="text-xs text-blue-100 mt-1 ml-auto"
        >
          Forgot Password?
        </Link>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 bg-[#FFD369] hover:bg-yellow-300 text-[#1A1A2E] font-semibold py-2 rounded-md transition duration-200"
      >
        Sign In
      </button>

      {/* Sign Up Redirect */}
      <p className="text-sm text-pink-100 text-center mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-yellow-50 underline">
          Sign Up
        </Link>
      </p>
    </form>
  )
}

export default LoginForm
