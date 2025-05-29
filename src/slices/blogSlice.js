import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  blogs: [],         
  currentBlog: null,  
  loading: false,     
  isEditing: false,   
}

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload
    },
    setCurrentBlog: (state, action) => {
      state.currentBlog = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload
    },
    resetBlogState: (state) => {
      state.blogs = []
      state.currentBlog = null
      state.loading = false
      state.error = null
      state.isEditing = false
    },
  },
})

export const {
  setBlogs,
  setCurrentBlog,
  setLoading,
  setError,
  setIsEditing,
  resetBlogState,
} = blogSlice.actions

export default blogSlice.reducer
