import { defineStore } from "pinia";
import axios from "axios";
import { toast } from 'vue3-toastify';
import { useAuthStore } from './authStore';

export const useStdQuizStore = defineStore('std-quiz', {
  state: () => ({
    get_assignQuiz: 'http://192.168.15.90:8000/api/get/student-assigned/quiz/{userId}',
    get_ques: 'http://192.168.15.90:8000/api/student-assigned/quiz/questions/{quizId}',
    sub_quiz: 'http://192.168.15.44:8000/api/submit/quiz/options',
    quizzes: [], // Store quizzes
    questions: [], // Store questions
    currentQuestionIndex: 0, // Index of the current question
    selectedAnswers: {}, // Store selected answers
  }),

  actions: {
    async stdAssignQuiz(userId) {
      const authStore = useAuthStore();
      const token = authStore.token;

      try {
        const response = await axios.get(this.get_assignQuiz.replace('{userId}', userId), {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.status === "success") {
          this.quizzes = response.data.data; 
          toast.success('Quizzes retrieved successfully');
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error('Authentication required. Please log in again.');
        } else {
          toast.error('Failed to retrieve quizzes.');
        }
      }
    },

    async fetchQuizQuestions(quizId) {
      const authStore = useAuthStore(); // Import the auth store
      const token = authStore.token; // Get the token from the auth store
    
      try {
        // Make the API request to fetch questions
        const response = await axios.get(this.get_ques.replace('{quizId}', quizId), {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the request header
          }
        });
    
        // Check the response status
        if (response.data.status === "success") {
          // Assuming response.data.data contains the questions array
          this.questions = response.data.data.questions; // Update this line to access the questions correctly
          this.currentQuestionIndex = 0; // Reset the index when fetching new questions
          toast.success('Questions retrieved successfully'); // Notify success
        } else {
          toast.error(response.data.message); // Notify any error messages
        }
      } catch (error) {
        // Handle specific error scenarios
        if (error.response && error.response.status === 401) {
          toast.error('Authentication required. Please log in again.'); // Handle unauthorized errors
        } else {
          toast.error('Failed to retrieve questions.'); // General error message
        }
      }
    },    
    async submitQuizOptions(quizAssignmentId) {
      const authStore = useAuthStore();
      const token = authStore.token;
  
      try {
          const payload = { answers: this.selectedAnswers }; // Create payload
  
          const response = await axios.post(this.sub_quiz.replace('{quizAssignmentId}', quizAssignmentId), payload, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
  
          if (response.data.status === "success") {
              toast.success('Quiz submitted successfully');
              router.push('/stdViewResults'); // Move the redirection here
          } else {
              toast.error(response.data.message);
          }
      } catch (error) {
          if (error.response) {
              if (error.response.status === 401) {
                  toast.error('Authentication required. Please log in again.');
              } else {
                  toast.error('Failed to submit quiz: ' + error.response.data.message); // Show specific error message
              }
          } else {
              toast.error('Failed to submit quiz. Please try again later.'); // Fallback error message
          }
      }
  },  
    selectAnswer(questionId, answer) {
      this.selectedAnswers[questionId] = answer; 
    },

    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      }
    },

    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },

    resetQuiz() {
      this.currentQuestionIndex = 0;
      this.selectedAnswers = {};
    },
  }
});
