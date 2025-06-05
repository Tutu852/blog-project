import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllBlogs } from "../services/operations/blogDetailsAPI";
import BlogCard from "../components/core/HomePage/BlogCard";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getAllBlogs(token);
      setBlogs(data || []);
    };
    fetchBlogs();
  }, [token]);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-[#16213E]">
      <h1 className="text-3xl font-semibold mb-6 mt-10 text-center">All Blogs</h1>

      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {currentBlogs.length > 0 ? (
          currentBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} showActions={true} />
          ))
        ) : (
          <p className="text-center text-gray-600">No blogs available.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2 flex-wrap items-center">
          {/* Left arrow */}
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded border font-medium ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            aria-label="Previous Page"
          >
            &#8592;
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 rounded border font-medium ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Right arrow */}
          <button
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded border font-medium ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            aria-label="Next Page"
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
