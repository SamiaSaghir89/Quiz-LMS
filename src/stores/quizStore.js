import { defineStore } from "pinia";
import axios from "axios";
import { toast } from 'vue3-toastify';

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    create_quiz: 'http://192.168.15.90:8000/api/create/quiz',
    get_quiz: 'http://192.168.15.90:8000/api/get-quiz',
    get_quizID: 'http://192.168.15.90:8000/api/get/quiz/questions/{quizId}',
    edit_quiz: 'http://192.168.15.90:8000/api/edit-questions/{questionId}',
    delete_quiz: 'http://192.168.15.90:8000/api/delete-question/{questionId}',
    assign_quiz: 'http://192.168.15.90:8000/api/assign/quizzes',

    quizName: '',
    duration: null,
    totalMarks: null,
    questions: [],
    quizzes: []
  }),

  actions: {
    // Create Quiz
    async createQuiz(quizData) {
      try {
        const response = await axios.post(this.create_quiz, quizData);
        toast.success("Quiz created successfully!");
        return response.data;
      } catch (error) {
        console.error("Error creating quiz:", error);
        toast.error("Failed to create quiz. Please try again.");
        throw error;
      }
    },

    // Get all quizzes
    async fetchQuizzes() {
      try {
        const response = await axios.get(this.get_quiz);
        if (response.data.status === "success") {
          this.quizzes = response.data.data; // Correctly extracting quizzes from data
        } else {
          toast.error("Failed to fetch quizzes: " + response.data.message);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        toast.error("Failed to fetch quizzes.");
      }
    },

    // Get quiz by ID
    async fetchQuizById(quizId) {
      try {
        const url = this.get_quizID.replace('{quizId}', quizId);
        const response = await axios.get(url);
        if (response.data && Array.isArray(response.data.questions)) {
          this.questions = response.data.questions;
        } else {
          this.questions = []; // Default to an empty array if not defined
        }
      } catch (error) {
        console.error("Error fetching quiz by ID:", error);
        toast.error("Failed to fetch quiz questions.");
      }
    },

    // Edit quiz question
    async editQuizQuestion(questionId, questionData) {
      try {
        const url = this.edit_quiz.replace('{questionId}', questionId);
        const response = await axios.put(url, questionData);
        toast.success("Question updated successfully!");
        return response.data;
      } catch (error) {
        console.error("Error editing question:", error);
        toast.error("Failed to update question.");
        throw error;
      }
    },

    // Delete quiz question
    async deleteQuizQuestion(questionId) {
      try {
        const url = this.delete_quiz.replace('{questionId}', questionId);
        await axios.delete(url);
        toast.success("Question deleted successfully!");
      } catch (error) {
        console.error("Error deleting question:", error);
        toast.error("Failed to delete question.");
        throw error;
      }
    },

  
async assignQuiz(payload) {
 
  const adjustedPayload = {
    quiz_id: payload.quiz_ids[0], 
    user_ids: payload.user_ids,
    assigned_at: payload.assigned_at,
    activation_date: payload.activation_date,
    expiration_date: payload.expiration_date
  };

  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    console.log("Payload being sent:", adjustedPayload); // Log the payload for debugging

    const response = await axios.post(this.assign_quiz, adjustedPayload, { headers });

    if (response.data.status === 'success') {
      toast.success("Quiz assigned successfully!");
      return response.data;
    } else {
      console.error("Error in server response:", response.data); // Log the response
      toast.error("Failed to assign quiz: " + response.data.message);
    }
  } catch (error) {
    if (error.response) {
      console.error("Error assigning quiz:", error.response.data); // Log full error response
      toast.error("Failed to assign quiz: " + (error.response.data.message || "Internal Server Error"));
    } else {
      console.error("Error assigning quiz:", error); // Log error without response
      toast.error("Failed to assign quiz: " + error.message);
    }
    throw error;
  }
}

  }
});
