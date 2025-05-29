import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constant"
// import Tab from "../../Common/Tab"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.USER)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { firstName, lastName, email, password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = { ...formData, accountType }
    dispatch(setSignupData(signupData))
    dispatch(sendOtp(email, navigate))
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

//   const tabData = [
//     { id: 1, tabName: "User", type: ACCOUNT_TYPE.STUDENT },
//     { id: 2, tabName: "Admin", type: ACCOUNT_TYPE.INSTRUCTOR },
//   ]

  return (
    <div className="  flex items-center justify-center px-2">
      <div className="w-full text-[#F1F1F1]">
        {/* <Tab tabData={tabData} field={accountType} setField={setAccountType} /> */}
        <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4 mt-6">
          <div className="flex gap-x-4">
            <label className="w-full">
              <p className="text-sm text-[#F1F1F1] mb-1">
                First Name <sup className="text-[#FF6B6B]">*</sup>
              </p>
              <input
                required
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                placeholder="Enter first name"
                className="form-style bg-[#0F3460] border border-gray-600 rounded-md px-4 py-2 text-[#F1F1F1] placeholder-gray-400"
              />
            </label>
            <label className="w-full">
              <p className="text-sm text-[#F1F1F1] mb-1">
                Last Name <sup className="text-[#FF6B6B]">*</sup>
              </p>
              <input
                required
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                placeholder="Enter last name"
                className="form-style bg-[#0F3460] border border-gray-600 rounded-md px-4 py-2 text-[#F1F1F1] placeholder-gray-400"
              />
            </label>
          </div>
          <label className="w-full">
            <p className="text-sm text-[#F1F1F1] mb-1">
              Email Address <sup className="text-[#FF6B6B]">*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="form-style bg-[#0F3460] border border-gray-600 rounded-md px-4 py-2 text-[#F1F1F1] placeholder-gray-400 w-full"
            />
          </label>
          <div className="flex gap-x-4">
            <label className="w-full relative">
              <p className="text-sm text-[#F1F1F1] mb-1">
                Create Password <sup className="text-[#FF6B6B]">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="form-style bg-[#0F3460] border border-gray-600 rounded-md px-4 py-2 pr-10 text-[#F1F1F1] placeholder-gray-400 w-full"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] cursor-pointer text-gray-400 hover:text-[#FFD369]"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </label>
            <label className="w-full relative">
              <p className="text-sm text-[#F1F1F1] mb-1">
                Confirm Password <sup className="text-[#FF6B6B]">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="form-style bg-[#0F3460] border border-gray-600 rounded-md px-4 py-2 pr-10 text-[#F1F1F1] placeholder-gray-400 w-full"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] cursor-pointer text-gray-400 hover:text-[#FFD369]"
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 bg-[#FFD369] hover:bg-yellow-300 text-[#1A1A2E] font-semibold py-2 rounded-md transition duration-200"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignupForm
