<template>
  <div class="assign-quiz">
    <h2>Assign Quiz</h2>

    <!-- Dropdown for Students -->
    <div class="student-dropdown">
      <h3>Select Student:</h3>
      <select v-model="selectedStudent">
        <option disabled value="">Select a student</option>
        <option v-for="(student, index) in students" :key="index" :value="student.id">
          {{ student.name }}
        </option>
      </select>
    </div>

    <!-- Dropdown for Quizzes -->
    <div class="quiz-dropdown">
      <h3>Select Quiz:</h3>
      <select v-model="selectedQuiz">
        <option disabled value="">Select a quiz</option>
        <option v-for="(quiz, index) in quizzes" :key="index" :value="quiz.id">
          {{ quiz.quiz_name }} <!-- Ensure this is the correct field -->
        </option>
        <option v-if="quizzes.length === 0" disabled>No quizzes available</option>
      </select>
    </div>

    <!-- Assign Quiz Button -->
    <button @click="submitQuiz" class="submit-btn">Assign Quiz</button>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useQuizStore } from "@/stores/quizStore";
import { useStdStore } from "@/stores/studentStore";

export default {
  setup() {
    const stdStore = useStdStore();
    const quizStore = useQuizStore();
    const quizzes = computed(() => quizStore.quizzes);
    const students = ref([]);

    const selectedStudent = ref(null); // Use null for clarity
    const selectedQuiz = ref(null); // Use null for clarity

    // Fetch students and quizzes on component mount
    onMounted(async () => {
      try {
        await stdStore.viewRequest();
        students.value = [...stdStore.students];

        await quizStore.fetchQuizzes();
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    });

    // Handles quiz submission
    const submitQuiz = async () => {
  if (!selectedStudent.value || !selectedQuiz.value) {
    alert("Please select both a student and a quiz.");
    return;
  }

  const currentDate = new Date();
  const payload = {
    quiz_ids: [parseInt(selectedQuiz.value)],
    user_ids: [parseInt(selectedStudent.value)],
    assigned_at: currentDate.toISOString().slice(0, 19).replace('T', ' '), // Format to 'YYYY-MM-DD HH:MM:SS'
    activation_date: "2024-10-02 12:00:00", // Ensure this matches the required format
    expiration_date: "2024-10-05 12:00:00" // Ensure this matches the required format
  };

  try {
    await quizStore.assignQuiz(payload);
    alert("Quiz assigned successfully!");
    selectedStudent.value = null;
    selectedQuiz.value = null;
  } catch (error) {
    console.error("Failed to assign quiz:", error);
    alert("Failed to assign quiz: " + error.message);
  }
};


    return {
      students,
      quizzes,
      selectedStudent,
      selectedQuiz,
      submitQuiz,
    };
  },
};
</script>

<style scoped>
.assign-quiz {
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #bdc3c7;
}

.submit-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #2980b9;
}
</style>
