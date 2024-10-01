<template>
    <div class="form-container">
      <h2>Complete Your Registration</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" placeholder="Enter your email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" placeholder="Enter your password" required />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password:</label>
          <input type="password" v-model="confirmPassword" id="confirm-password" placeholder="Confirm your password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'; // Vue 3 Composition API ref
  import { useRoute } from 'vue-router'; // Vue router to access query params
  import { useSetupPassword } from '@/stores/setupPassStore';
  
  export default {
    setup() {
      // Reactive properties
      const email = ref('');
      const password = ref('');
      const confirmPassword = ref('');
  
      // Pinia store
      const setupPasswordStore = useSetupPassword();
  
      // Get token from URL query params
      const route = useRoute();
      const token = route.query.token; 
  
      // Method to submit form
      const submitForm = async () => {
        if (password.value !== confirmPassword.value) {
          alert("Passwords do not match!");
        } else {
          await setupPasswordStore.setUpPassword(email.value, password.value, confirmPassword.value, token);
        }
      };
  
      return {
        email,
        password,
        confirmPassword,
        submitForm
      };
    }
  };
  </script>
  
  <style>
  .form-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    margin-top: 5%;
    background: linear-gradient(135deg, #6e45e2, #88d3ce);
  }
  
  .form-group {
    margin-bottom: 15px;
    
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  