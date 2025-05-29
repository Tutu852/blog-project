
import axios from "axios";

export const apiConnector = async (method, url, bodyData = null, headers = {}) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios({
      method: method,
      url: url,
      data: bodyData,
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
