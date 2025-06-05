import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createBlogDetails } from "../services/operations/blogDetailsAPI"
import { useSelector } from "react-redux"

const CreateBlog = () => {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    thumbnail: null,
  })

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
    if (!formData.title || !formData.content || !formData.thumbnail) {
      alert("All fields are required")
      return
    }

    const blogData = new FormData()
    blogData.append("title", formData.title)
    blogData.append("content", formData.content)
    blogData.append("thumbnail", formData.thumbnail)

    const result = await createBlogDetails(blogData, token)
    if (result) {
      navigate("/")
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-20 p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Create New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows="6"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Create Blog
        </button>
      </form>
    </div>
  )
}

export default CreateBlog
