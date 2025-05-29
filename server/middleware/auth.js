const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

exports.auth = async (req, res, next) => {
  try {
    //Extract JWT from request cookies,Body or headers
    const token =
     req.cookies?.token ||
      req.body?.token ||
      (req.header("Authorization")?.startsWith("Bearer ")
        ? req.header("Authorization").replace("Bearer ", "")
        : null);

    //if JWT is missing return 401 Unauthorized response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing",
      });
    }
    try {
      //Verifying the JWT isong the secret Key stored
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //Storing the Decoded JWT payload in the request Object
      const user = await User.findById(decoded.id); // Or decoded._id depending on your token

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Toeken is invalid or expired",
      });
    }
    //if JWT is valid,move on to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (userDetails.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This sis a protected route for Admins only",
      });
    }
    next();
  } catch (error) {
    // console.error('Authorization error:', error);
    return res.status(500).json({
      success: false,
      message: "User Role Can't be verified",
    });
  }
};

exports.isUser = (req, res, next) => {
  try {
    if (req.user.accountType !== "User") {
      return res.status(403).json({
        success: false,
        message: "Only users can perform this action",
      });
    }
    next();
  } catch (error) {
    // console.error('Authorization error:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
