import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'; // Use ES6 import

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
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

export { uploadOnCloudinary };
