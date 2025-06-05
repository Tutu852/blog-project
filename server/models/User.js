const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        trim: true
    },
    lastName:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password:{
        type:String,
        required: true,
      
    },
    accountType:{
        type: String,
        enum: ['Admin', 'User'],
        required: true
    },
    blogs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
       
    }],
    token:{
        type: String,
    },
    image:{
        type: String,
        
    },
},
{
    timestamps: true,
    
});

module.exports = mongoose.model('User', userSchema);
