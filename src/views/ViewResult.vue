<template>
  <div class="quiz-results">
    <h2>Quiz Results</h2>

    <div v-if="quizResults">
      <p><strong>Quiz ID:</strong> {{ quizResults.quiz_id }}</p>
      <p><strong>User ID:</strong> {{ quizResults.user_id }}</p>
      <p><strong>Total Marks:</strong> {{ quizResults.total_marks }}</p>
      <p><strong>Marks Obtained:</strong> {{ quizResults.marks_obtained }}</p>
      <p><strong>Status:</strong> {{ quizResults.status }}</p>
    </div>

    <div v-else>
      <p>No results available. Please try again.</p>
    </div>

    <button @click="fetchQuizResults">Fetch Quiz Results</button>
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "vue";

export default {
  setup() {
    const quizResults = ref(null);

    const fetchQuizResults = async () => {
      try {
        const response = await axios.get('http://192.168.15.90:8000/api/get-quiz-results');
        quizResults.value = response.data;  // assuming the data returned matches the structure
      } catch (error) {
        console.error("Error fetching quiz results:", error);
        alert("Failed to fetch quiz results. Please try again.");
      }
    };

    return {
      quizResults,
      fetchQuizResults,
    };
  },
};
</script>
<style scoped>
.quiz-results {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.quiz-results h2 {
  text-align: center;
  margin-bottom: 20px;
}

.quiz-results p {
  margin: 10px 0;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #884EA0;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
