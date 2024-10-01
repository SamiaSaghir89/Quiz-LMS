<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-content">
 
        <div class="left-side">
         
          <img :src="loginImage" alt="Login Image" />
        </div>
        <div class="right-side">
          <h2>Welcome Back!</h2>
          <p>LOGIN TO YOUR PORTAL</p>
          <form @submit.prevent="handleLogin">
            <div class="input-group">
              <input
                type="email"
                v-model="email"
                placeholder="Email Address"
                required
                autocomplete="email"
              />
            </div>
            <div class="input-group">
              <input
                type="password"
                v-model="password"
                placeholder="Password"
                required
                autocomplete="current-password"
              />
            </div>
            <button type="submit" class="login-button">Login</button>
            <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
          </form>
          <p class="footer-text">Fill this Form! <a href="/student-form">Student Form</a></p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router'; 
import loginImage from '@/assets/login-img.jpg'
export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const authStore = useAuthStore();
    const router = useRouter(); 
    const errorMessage = ref('')
    

    const handleLogin = async () => {
  try {
    const loginSuccess = await authStore.login(email.value, password.value);
    if (loginSuccess) {
      router.push('/dashboard');
    } else {
      errorMessage.value = 'Invalid email or password';
    }
  } catch (error) {
    errorMessage.value = 'An error occurred during login.';
    console.error('Login failed:', error);
  }
};


    return {
      email,
      password,
      handleLogin,
      errorMessage,
      loginImage,
    };
  },
};
</script>


<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6e45e2, #88d3ce);
  padding: 20px;
}

.login-card {
  background-color: white;
  max-width: 800px; 
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.2);
}

.login-content {
  display: flex;
  width: 100%;
}

.left-side {
  flex: 1;
}

.left-side img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px 0 0 12px;
}

.right-side {
  flex: 1;
  padding: 40px;
}

.right-side h2 {
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.right-side p {
  color: #666;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group input {
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.input-group input:focus {
  border-color: #6e45e2;
  outline: none;
}

.login-button {
  background-color: #6e45e2;
  color: white;
  border: none;
  padding: 15px;
  width: 100%;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #5537c2;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.footer-text {
  margin-top: 20px;
  color: #888;
}

.footer-text a {
  color: #6e45e2;
  text-decoration: none;
}

.footer-text a:hover {
  text-decoration: underline;
}


@media (max-width: 768px) {
  .login-card {
    flex-direction: column;
  }

  .left-side img {
    border-radius: 12px 12px 0 0;
  }

  .right-side {
    padding: 30px;
  }
}


</style>