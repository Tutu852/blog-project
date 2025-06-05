const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const database = require('./config/database');
const {cloudinaryConnect} = require('./config/cloudinary');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const fileUpload = require("express-fileupload")
//setting up port number
const PORT = process.env.PORT || 4000;

dotenv.config();

//database connection
database.connectDB();
//middleware
// Parses incoming JSON payloads and makes them available in req.body
app.use(express.json());
// Parses the cookies attached to the client request object and makes them accessible via req.cookies.
app.use(cookieParser());


app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);

//this is a middleware for fileupload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
}))
//cloudinary connection
cloudinaryConnect();

//setting up routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog',blogRoutes);

app.get('/', (req, res) => {
    return res.json({
        success: true,
        message: "Welcome to the Blog API"
    })
});
// app.use(express.static(path.join(__dirname, "..", "dist")));

// // Handle all other routes (for client-side routing like React Router)
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "..", "dist", "index.html"));
// });


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

