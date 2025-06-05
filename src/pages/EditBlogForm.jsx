import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { editBlogDetails } from "../services/operations/blogDetailsAPI"
import { setCurrentBlog } from "../slices/blogSlice"

const EditBlogForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentBlog } = useSelector((state) => state.blog)
  const { token } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    thumbnail: null,
  })

  // Pre-fill data from Redux store
  useEffect(() => {
    if (currentBlog) {
      setFormData({
        title: currentBlog.title || "",
        content: currentBlog.content || "",
        thumbnail: null, // You can't prefill a file input
      })
    }
  }, [currentBlog])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: e.target.files[0],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.content) {
      alert("Title and Content are required")
      return
    }

    const updatedData = new FormData()
    updatedData.append("blogId", currentBlog._id)
    updatedData.append("title", formData.title)
    updatedData.append("content", formData.content)
    if (formData.thumbnail) {
      updatedData.append("thumbnail", formData.thumbnail)
    }

    const result = await editBlogDetails(updatedData, token)

    if (result) {
      dispatch(setCurrentBlog(result)) // Update state
      navigate("/") // Redirect after update
    }
  }

  if (!currentBlog) {
    return <div className="text-center mt-10">No blog selected to edit</div>
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-gray-700 mb-1">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="6"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          ></textarea>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-gray-700 mb-1">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {currentBlog.thumbnail && (
            <img
              src={currentBlog.thumbnail}
              alt="Current Thumbnail"
              className="mt-2 w-40 h-24 object-cover rounded"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default EditBlogForm
