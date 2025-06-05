const Blog = require("../models/Blog");
const User = require("../models/User");
const mongoose = require("mongoose");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, content } = req.body;
    const thumbnail = req.files?.thumbnail;

    // Validate required fields
    if (!title || !content || !thumbnail ) {
      return res.status(400).json({
        success: false,
        message: "Title, content, and thumbnail are required.",
      });
    }

    // Validate user role
    const userDetails = await User.findById(userId).select("accountType");
    if (!userDetails || userDetails.accountType !== "User") {
      return res.status(403).json({
        success: false,
        message: "Only Users can create blogs.",
      });
    }

    // Upload thumbnail to Cloudinary
    // Upload thumbnail to Cloudinary
    const uploadedThumbnail = await uploadImageToCloudinary(
      thumbnail.tempFilePath,
      process.env.FOLDER_NAME || "blog-thumbnails"
    );

    // Create blog document
    const newBlog = await Blog.create({
      title,
      content,
      thumbnail: uploadedThumbnail.secure_url,
      author: userId
    });

    // Add blog to User's blog array
    await User.findByIdAndUpdate(
      userId,
      { $push: { blogs: newBlog._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Blog created successfully.",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error in createBlog:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create blog.",
    });
  }
};

// Edit Blog
exports.editBlog = async (req, res) => {
  try {
    const userId = req.user._id;
    const { blogId } = req.body;

    console.log("req.body:", req.body);
    console.log("Received blogId:", blogId);

    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "blogId is required",
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const isAuthorized = blog.author?.toString() === userId.toString();
    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this blog",
      });
    }

    if (req.files?.thumbnail) {
      const thumbnail = req.files.thumbnail;
      const uploadedThumbnail = await uploadImageToCloudinary(
        thumbnail.tempFilePath,
        process.env.FOLDER_NAME || "blog-thumbnails"
      );
      blog.thumbnail = uploadedThumbnail.secure_url;
    }

    // Update other fields except blogId and thumbnail
    for (const key of Object.keys(req.body)) {
      if (key !== "blogId" && key !== "thumbnail") {
        blog[key] = req.body[key];
      }
    }

    await blog.save();

    const updatedBlog = await Blog.findById(blogId).populate("author");

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Error in editBlog:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// Get All Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate("author", "firstName lastName") 
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    console.error("Error in getAllBlogs:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
      error: error.message,
    });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const userId = req.user._id;
    const { blogId } = req.body;

    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "blogId is required",
      });
    }
    //for finding the blog
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check ownership
    const isAuthorized = blog.author?.toString() === userId.toString();
    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this blog",
      });
    }

    // Delete blog
    await Blog.findByIdAndDelete(blogId);

    // Remove blog reference from User model
    await User.findByIdAndUpdate(userId, {
      $pull: { blogs: blogId },
    });

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteBlog:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete blog",
      error: error.message,
    });
  }
};

// Get Blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;

    // Check if it's a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blogId format",
      });
    }

    const blog = await Blog.findById(blogId).populate("author", "firstName lastName");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    console.error("Error in getBlogById:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
      error: error.message,
    });
  }
};
