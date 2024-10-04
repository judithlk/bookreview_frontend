import axiosInstance from "./axiosInstance";

export default async function addReview(reviewInfo) {
  const user = localStorage.getItem("userInfo");
  if(user) {

    try {
      const userJs = JSON.parse(user);
      const token = localStorage.getItem("token");

      const payload = {
        book: reviewInfo.book,
        userId: userJs._id,
        username: userJs.username,
        body: reviewInfo.body
      }
  
      
      const response = await axiosInstance.post("/reviews", payload, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });
  
      // Handle success
      console.log("Review added successfully", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Failed to add review:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  } else {
    return {message: "Create account first"}
  }
}
