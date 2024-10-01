import axios from 'axios';
import { defineStore } from 'pinia';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
    login_api: 'http://192.168.15.90:8000/api/login',
    log_out: 'http://192.168.15.90:8000/api/logout',
  }),

  actions: {
    async login(email, password) {
      try {
          const response = await axios.post(this.login_api, { email, password });
          if (response.data && response.data.data) {
              this.setUserData(response.data.data);
              toast.success('Login Successful!');
              console.log("Login Successful: Token", this.token); // Log the token
              return true;
          } else {
              toast.error('Login failed: Invalid credentials');
              return false;
          }
      } catch (error) {
          console.error('Login failed:', error);
          toast.error('Login failed: Invalid credentials');
          return false;
      }
  },  

    setUserData(userData) {
      this.user = userData;
      console.log("Received user data:", userData);
      const token = userData?.access_token;
      if (token) {
          this.token = token;
          localStorage.setItem('token', token);  // Ensure token is set
          console.log("Token set in localStorage:", localStorage.getItem('token')); // Log the token
      
          console.log("Setting user data:", this.user);
          this.token = token;
          localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('token', token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
          console.error('Invalid login response: No access_token');
          throw new Error('Invalid login response');
      }
  },
  
  

    async logout() {
      try {
        await axios.post(this.log_out);
        this.clearUserData();
        toast.success('Logged out successfully!');
      } catch (error) {
        console.error('Logout failed:', error);
        toast.error('Logout failed');
      }
    },

    clearUserData() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
    },

    getUser() {
      return this.user;
    },

    isAuthenticated() {
      return !!this.user;
    },
  },
});
