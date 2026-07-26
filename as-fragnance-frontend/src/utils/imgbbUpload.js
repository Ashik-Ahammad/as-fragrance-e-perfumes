/**
 * Uploads an image file to ImgBB and returns the hosted URL.
 * 
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<string>} - The URL of the uploaded image
 */
export const uploadImageToImgBB = async (imageFile) => {
  if (!imageFile) return null;
  
  const formData = new FormData();
  formData.append("image", imageFile);
  
  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=682423e8bb92a88e17f80a5650a85bc7`, {
      method: "POST",
      body: formData,
    });
    
    const data = await res.json();
    
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error(data.error?.message || "Failed to upload image to ImgBB");
    }
  } catch (error) {
    console.error("ImgBB Upload Error:", error);
    throw error;
  }
};
