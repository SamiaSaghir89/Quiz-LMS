<template>
    <div class="quiz-list-container">
      <h3>All Created Quizzes</h3>
  
      <!-- Display a loading message or fallback if quizzes haven't loaded yet -->
      <ul v-if="quizStore.quizzes && quizStore.quizzes.length > 0" class="quiz-list">
        <li v-for="quiz in quizStore.quizzes" :key="quiz.id" class="quiz-item">
          <h4>{{ quiz.quiz_name }}</h4>
          <p><strong>Duration:</strong> {{ quiz.duration }} minutes</p>
          <p><strong>Total Marks:</strong> {{ quiz.total_marks }}</p>
        </li>
      </ul>
  
      <p v-else-if="quizStore.quizzes && quizStore.quizzes.length === 0">No quizzes available.</p>
      <p v-else>Loading quizzes...</p>
    </div>
  </template>
  
  <script>
  import { onMounted } from 'vue';
  import { useQuizStore } from "@/stores/quizStore";
  
  export default {
    setup() {
      const quizStore = useQuizStore();
      onMounted(async () => {
        await quizStore.fetchQuizzes();
      });
  
      return {
        quizStore
      };
    }
  };
  </script>
  
  <style scoped>
  .quiz-list-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .quiz-list {
    list-style-type: none;
    padding: 0;
  }
  
  .quiz-item {
    background-color: #fff;
    padding: 15px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .quiz-item h4 {
    margin: 0 0 10px;
  }
  
  .quiz-item p {
    margin: 5px 0;
  }
  </style>
  