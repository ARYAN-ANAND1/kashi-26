import axios from "axios";

const cloud_name = import.meta.env.VITE_CLOUDINARY_NAME;
const upload_preset = import.meta.env.VITE_CLOUDINARY_PRESET;

export default async function upload_image(file: File): Promise<string> {

  try {
    // Check for required environment variables
    if (!upload_preset|| !cloud_name) {
      throw new Error("Missing Cloudinary configuration");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    formData.append("cloud_name", cloud_name);

    // Define the Cloudinary URL
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

    const response = await axios.post(cloudinaryUrl, formData);
    const image_url = response.data["secure_url"];
    return image_url;
  } catch (error) {
    console.error("Image upload failed:", error instanceof Error ? error.message : "Unknown error"); // Improved error logging
    return "";
  }
}