import { Cloudinary } from "cloudinary-core";

// Configure Cloudinary
const cloudinary = new Cloudinary({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
});

// Upload image
const uploadImage = async (file, uploadPreset) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );
    if (!response.ok) throw new Error("Upload failed");
    return await response.json();
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

// Fetch images
const getImages = async (folderPath) => {
  try {
    const url = `https://res.cloudinary.com/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image/list/${folderPath}.json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Fetch failed");
    return await response.json();
  } catch (error) {
    console.error("Fetch failed:", error);
  }
};

export const log = () => {
  console.log("ok");
};
