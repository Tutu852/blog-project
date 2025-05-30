const express = require('express');
const router = express.Router();

const {
    login,
    signup,
    sendOtp,
} = require('../controllers/Auth');

// const {auth} = require('../middlewares/auth');



//***************************************************************** 
//                   Authentication routes
//*****************************************************************

router.post('/login', login);
router.post('/signup', signup);
router.post('/sendotp', sendOtp);

module.exports = router;