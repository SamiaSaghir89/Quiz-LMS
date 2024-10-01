<template>
    <div class="add-manager">
      <h2>Add Manager</h2>
      <form @submit.prevent="addManager">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="manager.name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="manager.email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="manager.password" required />
        </div>
        <div class="form-group">
          <label for="role">Role</label>
          <select id="role" v-model="manager.role" required>
            <option disabled value="">Select a role</option>
            <option value="supervisor">Supervisor</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <button type="submit">Add Manager</button>
      </form>
      <!-- <p v-if="message">{{ message }}</p> -->
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useManagerStore } from '@/stores/managerStore'; // Adjust the path as necessary
  
  export default {
    setup() {
      const managerStore = useManagerStore(); // Use the store
      const manager = ref({
        name: '',
        email: '',
        password: '',
        role: ''
      });
  
      const addManager = async () => {
        try {
          await managerStore.managerData(manager.value); // Call the action
          console.log('Manager added successfully:', manager.value);
          // Optionally reset the form or show a success message
          manager.value = { name: '', email: '', password: '', role: '' }; // Reset the form
        } catch (error) {
          console.error('Failed to add manager:', error);
          // Optionally show an error message
        }
      };
  
      return {
        manager,
        addManager
      };
    }
  };
  </script>
  
  <style scoped>
  .add-manager {
    padding: 20px;
    background-color: #ecf0f1;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .add-manager h2 {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input,
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    background-color: #884EA0;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #6A9AB0;
  }
  
  p {
    margin-top: 10px;
    color: #2c3e50;
  }
  </style>
  