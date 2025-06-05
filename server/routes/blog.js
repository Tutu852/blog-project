const express = require("express");
const router = express.Router();
const { auth, isUser } = require("../middleware/auth");
const { createBlog, editBlog ,getAllBlogs,deleteBlog,getBlogById} = require("../controllers/Blog");

router.post("/create-blog", auth, isUser, createBlog);
router.put("/edit-blog", auth, isUser, editBlog);
router.get("/get-all-blog",  getAllBlogs);
router.post("/delete-Blog", auth, isUser, deleteBlog);
router.get("/get-blog/:blogId", getBlogById);


module.exports = router;
