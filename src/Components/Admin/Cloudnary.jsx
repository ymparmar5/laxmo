// src/utils/cloudinary.js
import { Cloudinary } from 'cloudinary-core';

const cloudinaryCore = new Cloudinary({ cloud_name: 'dn5vvxkra' });

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'products'); // Replace with your upload preset
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryCore.config().cloud_name}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};
