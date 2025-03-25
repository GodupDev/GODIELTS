export const uploadImage = async (file, customPath = "", public_id = "") => {
  if (public_id) {
    deleteImage(public_id);
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "godielts-avatar");

  if (customPath) {
    formData.append("public_id", customPath);
  }

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/djthxaxtd/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) throw new Error("Upload failed");

    const data = await response.json();
    return { public_id: data.public_id, url: data.url };
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

export const deleteImage = async (publicId) => {
  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("upload_preset", "godielts-avatar");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/djthxaxtd/image/destroy",
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) throw new Error("Delete failed");

    const data = await response.json();
    return data.result === "ok";
  } catch (error) {
    console.error("Delete failed:", error);
    return false;
  }
};
