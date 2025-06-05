
import signupImg from "../assets/images/signup.webp"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join the millions reading to blogs with us for free and create"
      description1="Build blogs for today, tomorrow, and beyond."
      description2=" this is for fun."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup
