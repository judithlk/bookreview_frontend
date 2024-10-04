import axiosInstance from "./axiosInstance";

export default async function addBook(bookInfo) {
  const user = localStorage.getItem("userInfo");
  if(user) {

    try {
      const userJs = JSON.parse(user);
      const token = localStorage.getItem("token");
  
      const formData = new FormData();
      formData.append("title", bookInfo.title);
      formData.append("author", bookInfo.author);
      formData.append("synopsis", bookInfo.synopsis);
      formData.append("genre", bookInfo.genre);
      formData.append("year", bookInfo.year);
      formData.append("image", bookInfo.bookCover); // The image file
      formData.append("userId", userJs._id); // The image file
      formData.append("username", userJs.username); // The image file
  
      const response = await axiosInstance.post("/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${token}`,
        },
      });
  
      // Handle success
      console.log("Book added successfully", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Failed to add book:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  } else {
    return {message: "Create account first"}
  }
}
