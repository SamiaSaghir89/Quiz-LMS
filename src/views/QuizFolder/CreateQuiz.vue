<template>
  <div class="quiz-list-container">
    <h3>All Created Quizzes</h3>

    <!-- Display a loading message or fallback if quizzes haven't loaded yet -->
    <table v-if="quizStore.quizzes && quizStore.quizzes.length > 0" class="quiz-table">
      <thead>
        <tr>
          <th>Quiz Name</th>
          <th>Duration (Minutes)</th>
          <th>Total Marks</th>
          <th>Action</th> <!-- Added Action Column -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="quiz in quizStore.quizzes" :key="quiz.id">
          <td>{{ quiz.quiz_name }}</td>
          <td>{{ quiz.duration }}</td>
          <td>{{ quiz.total_marks }}</td>
          <td>
            <!-- Edit and Delete Buttons -->
            <button @click="editQuiz(quiz)" class="btn btn-primary btn-sm">Edit</button>
            <button @click="deleteQuiz(quiz.id)" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Message when no quizzes are available -->
    <p v-else-if="quizStore.quizzes && quizStore.quizzes.length === 0">No quizzes available.</p>
    
    <!-- Loading message -->
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

    // Edit action handler (you can implement your logic here)
    const editQuiz = (quiz) => {
      // You can open an edit form or navigate to a quiz edit page
      console.log("Editing quiz:", quiz);
    };

    // Delete action handler (you can implement your logic here)
    const deleteQuiz = async (quizId) => {
      const confirmed = confirm("Are you sure you want to delete this quiz?");
      if (confirmed) {
        await quizStore.deleteQuiz(quizId); // Assuming deleteQuiz exists in your store
      }
    };

    return {
      quizStore,
      editQuiz,
      deleteQuiz
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

.quiz-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.quiz-table th, .quiz-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.quiz-table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

.quiz-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.btn {
  margin-right: 5px;
}

.btn-sm {
  padding: 5px 10px;
  font-size: 12px;
}
</style>
