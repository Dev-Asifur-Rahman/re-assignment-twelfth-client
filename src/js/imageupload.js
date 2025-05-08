import axios from "axios";

const imageUpload = async (url) => {
  const formData = new FormData();
  formData.append("image", url);
  const response = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API}`,formData
  );
  return response.data.data.display_url
};

export { imageUpload };
