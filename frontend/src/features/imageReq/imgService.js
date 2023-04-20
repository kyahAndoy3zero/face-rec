import axios from "axios";

const API_URL = "/api/uploads/";

const imgUpload = async (imgData) => {
  try {
    const response = await axios.post(API_URL, imgData);
    return response.data;

    
  } catch (error) {
    console.error(error);
  }
};

const imgService = {
  imgUpload,
};

export default imgService;
