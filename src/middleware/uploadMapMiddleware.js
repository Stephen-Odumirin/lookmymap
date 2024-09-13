import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = 'mapuploads/'; // Define the folder to save uploaded files
  
      // Check if the directory exists, if not, create it
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
  
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Append a unique timestamp to the file name
    },
  });
  
  // Set up multer for handling multiple files
  const uploadMap = multer({ storage });
  
  // Middleware for handling file uploads
  export const uploadMapFile = uploadMap.fields([
    { name: 'mapImage', maxCount: 1 }, // Accept one file for 'coverImage'
  ]);
  
  export default uploadMapFile;