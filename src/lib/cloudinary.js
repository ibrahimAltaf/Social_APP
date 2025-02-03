import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'your_cloud_name', // Replace with your Cloudinary cloud name
  api_key: 'your_api_key',       // Replace with your API key
  api_secret: 'your_api_secret', // Replace with your API secret
});

export default cloudinary;
