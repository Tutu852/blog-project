const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    const options = { folder };
    // Optional height and quality params
    if (height) options.height = height;
    if (quality) options.quality = quality;

    options.resource_type = 'auto'; // Automatically detect resource type (image/video)
    console.log("Uploading image to Cloudinary with options:", options);
    return await cloudinary.uploader.upload(file, options);
};
