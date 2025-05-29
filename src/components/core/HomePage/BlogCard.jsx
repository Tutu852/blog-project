import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteBlogDetails } from "../../../services/operations/blogDetailsAPI";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await deleteBlogDetails({ blogId }, token);
      window.location.reload();
    }
  };

  const contentWords = blog.content.trim().split(/\s+/);
  const contentPreview = contentWords.slice(0, 30).join(" ");
  const isLongContent = contentWords.length > 30;

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/blog/${blog._id}`}>
        {blog.thumbnail && (
          <img
            src={blog.thumbnail}
            alt="Blog Thumbnail"
            className="p-4 w-full h-48 object-cover rounded-t-lg"
          />
        )}
      </Link>

      <div className="px-5 pb-5">
        <Link to={`/blog/${blog._id}`}>
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
            {blog.title}
          </h2>
        </Link>

        <p className="text-gray-600 dark:text-gray-300 mb-2 whitespace-pre-wrap">
          {isExpanded
            ? blog.content
            : contentPreview + (isLongContent ? "..." : "")}
        </p>

        {isLongContent && (
          <button
            onClick={toggleExpand}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}

        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            By {blog.author?.firstName} {blog.author?.lastName}
          </span>

          {user?._id === blog.author?._id && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() =>
                  navigate(`/editblog/${blog._id}`, {
                    state: {
                      isEdit: true,
                      blogData: blog,
                    },
                  })
                }
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
