import axios from "axios";

// Create an axios instance with a default configuration
const apiClient = axios.create({
  baseURL: "", // Leave blank for relative Next.js local API routing
  headers: {
    "Content-Type": "application/json",
  },
});

// Centralized API Core Manager
const apiService = {
  // 1. Submit for AI Evaluation (POST)
  evaluateAnswers: async (question, studentAnswer, expectedAnswer) => {
    try {
      const response = await apiClient.post("/api/evaluate", {
        question,
        studentAnswer: studentAnswer?.trim() || "No answer provided.",
        expectedAnswer,
      });
      return response.data;
    } catch (error) {
      console.error("API Service Evaluation Failed:", error);
      throw error;
    }
  },

  // 2. Fetch Questions Data Example (GET)
  getQuestionsByCategory: async (category) => {
    try {
      const response = await apiClient.get(`/api/questions/${category}`);
      return response.data;
    } catch (error) {
      console.error("API Service Get Questions Failed:", error);
      throw error;
    }
  },

  // 3. Save progress or Update metrics Example (PUT/PATCH)
  updateUserProgress: async (userId, data) => {
    try {
      const response = await apiClient.put(`/api/user/${userId}/progress`, data);
      return response.data;
    } catch (error) {
      console.error("API Service Update Progress Failed:", error);
      throw error;
    }
  }
};

export default apiService;