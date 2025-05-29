import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

function PrivateRoute() {
  const { token } = useSelector((state) => state.auth)

  return token ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
