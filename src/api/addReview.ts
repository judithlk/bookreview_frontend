import axiosInstance from "./axiosInstance";

export default async function addReview(reviewInfo: any) {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("userInfo");
    const token = localStorage.getItem("token");

    if (user) {
      try {
        const userJs: any = JSON.parse(user);
        // const token = typeof window !== localStorage.getItem("token");

        const payload = {
          book: reviewInfo.book,
          userId: userJs._id,
          username: userJs.username,
          body: reviewInfo.body,
        };

        const response = await axiosInstance.post("/reviews", payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Handle success
        console.log("Review added successfully", response.data);
        return response.data;
      } catch (error: any) {
        console.error(
          "Failed to add review:",
          error.response ? error.response.data : error.message
        );
        throw error;
      }
    } else {
      return { message: "Create account first" };
    }
  }
}
