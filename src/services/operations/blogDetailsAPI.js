import {toast} from "react-hot-toast"

import { apiConnector } from "../apiConnector"
import { blogEndPoints } from "../api";



const {
    CREATE_BLOG_API,
    EDIT_BLOG_API,
    DELETE_BLOG_API,
    GET_ALL_BLOGS_API
}=blogEndPoints





export const getAllBlogs = async () => {
  let result = [];
  const toastId = toast.loading("Loading blogs...");

  try {
    const response = await apiConnector("GET", GET_ALL_BLOGS_API);
    console.log("GET ALL BLOGS API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could not fetch blogs");
    }

    result = response?.data?.blogs;
    toast.success("Blogs loaded successfully");
  } catch (error) {
    console.error("GET_ALL_BLOGS_API ERROR:", error);
    toast.error(error.message || "Failed to load blogs");
  }

  toast.dismiss(toastId);
  return result;
};




export const createBlogDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Creating Blog...")
  try {
    const response = await apiConnector("POST", CREATE_BLOG_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })

    console.log("CREATE BLOG API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Create Blog")
    }

    toast.success("Blog Created Successfully")
    result = response?.data?.blog
  } catch (error) {
    console.log("CREATE BLOG API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


export const editBlogDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Updating Blog...")
  try {
    const response = await apiConnector("POST", EDIT_BLOG_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })

    console.log("EDIT BLOG API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Edit Blog")
    }

    toast.success("Blog Updated Successfully")
    result = response?.data?.blog
  } catch (error) {
    console.log("EDIT BLOG API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


export const deleteBlogDetails = async (data, token) => {
  const toastId = toast.loading("Deleting Blog...")
  try {
    const response = await apiConnector("DELETE", DELETE_BLOG_API, data, {
      Authorization: `Bearer ${token}`,
    })

    console.log("DELETE BLOG API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Blog")
    }

    toast.success("Blog Deleted Successfully")
  } catch (error) {
    console.log("DELETE BLOG API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

export const getBlogDetailsById = async (blogId) => {
  let result = null;
  const toastId = toast.loading("Loading blog...");

  try {
    const response = await apiConnector(
      "GET",
      `${GET_ALL_BLOGS_API}/${blogId}`
    );

    console.log("GET BLOG BY ID API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could not fetch blog");
    }

    result = response?.data?.blog;
    toast.success("Blog loaded successfully");
  } catch (error) {
    console.error("GET_BLOG_BY_ID_API ERROR:", error);
    toast.error(error.message || "Failed to load blog");
  }

  toast.dismiss(toastId);
  return result;
};

