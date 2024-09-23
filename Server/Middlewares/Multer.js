const multer = require('multer');
const path = require('path');

// Set storage options for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    cb(null, 'uploads/'); // Specify the uploads folder
  },
  filename: (req, file, cb) => {
    // Use a timestamp to avoid overwriting files with the same name
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Filter the file types (optional)
const fileFilter = (req, file, cb) => {
  // Accept only certain file types, e.g., images
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};
console.log("multer here ")
// Create multer instance
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter // Optionally filter files by type
});

// Export the multer instance
module.exports = upload;
