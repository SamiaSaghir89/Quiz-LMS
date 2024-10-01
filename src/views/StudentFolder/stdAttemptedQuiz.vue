<template>
  <div class="quiz-container mt-5">
    <header class="quiz-header">
      <h2>{{ quizName }}</h2>
      <p class="total-questions">Total Questions: {{ questions.length }}</p>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="alert alert-info">
      Loading questions...
    </div>

    <!-- Error State -->
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <!-- Quiz Question -->
    <div v-if="questions.length">
      <div class="question-box mt-3">
        <h5>{{ currentQuestionIndex + 1 }}. {{ questions[currentQuestionIndex].question }}</h5>
        <div v-for="option in questions[currentQuestionIndex].options" :key="option" class="form-check">
          <input
            class="form-check-input"
            type="radio"
            :id="option"
            :value="option"
            v-model="selectedAnswers[questions[currentQuestionIndex].id]"  
          />
          <label class="form-check-label" :for="option">{{ option }}</label>
        </div>
      </div>
      <div class="navigation-buttons mt-4">
        <button
          class="btn btn-secondary"
          v-if="currentQuestionIndex > 0"
          @click="previousQuestion"
        >
          Previous
        </button>
        <button
          class="btn btn-primary"
          @click="nextQuestion"
        >
          {{ isLastQuestion ? 'Submit' : 'Next' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useStdQuizStore } from '@/stores/stdQuizStore';

const route = useRoute();
const router = useRouter();
const quizStore = useStdQuizStore(); 

const quizId = route.params.quizId;
const loading = ref(false); 
const errorMessage = ref(''); 
const currentQuestionIndex = computed(() => quizStore.currentQuestionIndex);
const questions = computed(() => quizStore.questions);
const quizName = computed(() => {
  const quiz = quizStore.quizzes.find(q => q.quiz_id === Number(quizId));
  return quiz ? quiz.quiz.quiz_name : '';
});
const selectedAnswers = computed(() => quizStore.selectedAnswers);


onMounted(async () => {
  loading.value = true;
  try {
    await quizStore.fetchQuizQuestions(quizId); 
  } catch (error) {
    errorMessage.value = 'Failed to load quiz questions.';
  } finally {
    loading.value = false;
  }
});



const isLastQuestion = computed(() => {
  return currentQuestionIndex.value === questions.value.length - 1;
});

const nextQuestion = async () => {
  if (isLastQuestion.value) {
    await submitQuiz(); // Submit the quiz if it's the last question
  } else {
    quizStore.nextQuestion(); // Call the store action
  }
};

const previousQuestion = () => {
  quizStore.previousQuestion(); 
};

// Submit quiz function
const submitQuiz = async () => {
  const payload = {
    quiz_id: quizId,
    options: { ...selectedAnswers.value },
  };

  const authStore = useAuthStore(); 
  console.log("Token before submission:", authStore.token); 

  try {
    await quizStore.submitQuizOptions(payload); 
    console.log('Submitted answers:', payload);
    router.push('/stdViewResults');
  } catch (error) {
    errorMessage.value = 'Failed to submit answers.';
    console.error('Error submitting quiz:', error);
  }
};

</script>

<style scoped>
.quiz-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.quiz-header {
  text-align: center;
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.total-questions {
  font-size: 0.9em;
  margin-top: 5px;
}

.question-box {
  background-color: #fff;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-check {
  margin: 10px 0;
}

.form-check-input {
  margin-right: 10px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
}

.btn {
  flex: 1;
  margin: 5px;
}

.btn-primary {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}
</style>
