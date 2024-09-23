const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configuration
cloudinary.config({ 
    cloud_name: 'dqypz03vw', 
    api_key: '756341349866486', 
    api_secret: 'wQmUAf4KGh6shVdltmTqDE1COK0' // Click 'View API Keys' above to copy your API secret
});

// Upload an image
const uploadOnCloudinary = async (localFilePath) => {
    try {
        const result = await cloudinary.uploader.upload(localFilePath, {
            public_id: 'uploaded_images/' + Date.now(),
            folder: 'your_folder_name',
            use_filename: true,
            transformation: {
                width: 200,
                height: 200,
                crop: 'limit'
            }
        });

        console.log('File uploaded successfully:', result.secure_url);
        return result.secure_url;

    } catch (error) {
        // Ensure async behavior for deleting the file
        try {
            await fs.promises.unlink(localFilePath); // Async file removal
        } catch (unlinkError) {
            console.error('Error deleting file after upload failure:', unlinkError);
        }
        console.error('Error uploading file:', error);
        throw error; // Rethrow the error after handling it
    }
};

module.exports = { uploadOnCloudinary };
