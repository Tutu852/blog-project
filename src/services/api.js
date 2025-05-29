const BASE_URL = import.meta.env.VITE_BASE_URL

export const endpoints = {
    SENDOTP_API:BASE_URL + "/user/sendotp",
    SIGNUP_API: BASE_URL + "/user/signup",
    LOGIN_API: BASE_URL + "/user/login"
}

export const blogEndPoints = {
    GET_ALL_BLOGS_API :BASE_URL + "/blog/get-all-blog",
    EDIT_BLOG_API:BASE_URL + "/blog/edit-blog",
    CREATE_BLOG_API:BASE_URL + "/blog/create-blog",
    DELETE_BLOG_API:BASE_URL + "/blog/delete-blog"
}