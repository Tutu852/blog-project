
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); 

const { MONGO_URL } = process.env;

exports.connectDB = () => {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  });
};
