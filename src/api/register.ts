import axiosInstance from "./axiosInstance";

export default async function userRegistration(userData) {
    try {
      const formData = new FormData();
      formData.append("username", userData.username);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("profileImage", userData.profileImage); // The image file
  
      const response = await axiosInstance.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Handle success
      console.log("Registration successful:", response.data);
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Registration failed:", error.response ? error.response.data : error.message);
      throw error;
    }
  };