import axios from "axios";
import { defineStore } from "pinia";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useAuthStore } from '@/stores/authStore'; 

export const useManagerStore = defineStore('register', {
  state: () => ({
    manager_form: "http://192.168.15.90:8000/api/register/user",
  }),

  actions: {
    async managerData(managerData) {
      const authStore = useAuthStore();  
      
      if (!authStore.token) {
        console.error('No token found, please login first.');
        toast.error('Unauthorized access, please login.');
        return;
      }

      try {
        const response = await axios.post(this.manager_form, managerData, {
          headers: {
            Authorization: `Bearer ${authStore.token}`  
          }
        });
        toast.success('Manager added successfully!'); 
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized: Token might be invalid or expired');
          toast.error('Unauthorized. Please login again.');
        } else {
          console.error('Error adding manager:', error);
          toast.error('Failed to add manager.');
        }
        throw error;
      }
    }
  }
});
