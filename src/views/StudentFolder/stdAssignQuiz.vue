<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>Quiz Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="quiz in stdQuizStore.quizzes" :key="quiz.quiz_id">
            <td>{{ quiz.quiz_name }}</td>
            <td>{{ quiz.status }}</td>
            <td>
              <button @click="attemptQuiz(quiz.quiz_id)">
                Attempt Quiz
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  

  <script>
import { useRouter } from 'vue-router'; // Import router
import { useStdQuizStore } from "@/stores/stdQuizStore"; 
import { onMounted } from "vue";

export default {
  setup() {
    const stdQuizStore = useStdQuizStore();
    const router = useRouter(); // Use router

    // Retrieve userId from local storage or set a default value
    const userId = localStorage.getItem('userId') || 1; 

    onMounted(() => {
      stdQuizStore.stdAssignQuiz(userId); // Fetch assigned quizzes
    });

    const attemptQuiz = (quizId) => {
      router.push({ path: `/attempt-quiz/${quizId}` });
    };

    return {
      stdQuizStore,
      attemptQuiz
    };
  }
};
</script>


  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
    text-align: left;
  }
  
  button {
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  