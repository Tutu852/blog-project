// pages/EditDetails.jsx
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCurrentBlog } from "../slices/blogSlice"
import { getBlogDetailsById } from "../services/operations/blogDetailsAPI"
import EditBlogForm from "../pages/EditBlogForm"
import { useSelector } from "react-redux"

const EditDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchBlog = async () => {
      const blog = await getBlogDetailsById(id, token)
      if (blog) {
        dispatch(setCurrentBlog(blog))
      }
    }

    fetchBlog()
  }, [id, dispatch, token])

  return <EditBlogForm />
}

export default EditDetails
