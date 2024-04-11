import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //Upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(fileLocalPath, {
      resource_type: "auto",
    });

    //File has been uploaded successfully

    console.log("File is uploaded on cloudinary", response.url);

    return response;
  } catch (error) {
    //remove the locally temp file as the upload the file failed

    fs.unlinkSync(localFilePath);

    return null;
  }
};

export { uploadOnCloudinary };
