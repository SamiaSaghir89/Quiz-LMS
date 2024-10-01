<template>
  <div class="student-form-container">
      <div class="student-form-card">
          <h3>Student Registration</h3>
          <form @submit.prevent="submitStudentData">
              <div class="form-group">
                  <label>Name</label>
                  <input
                      v-model="studentData.name"
                      type="text"
                      required
                      class="form-control"
                      placeholder="Enter your name"
                  />
              </div>
              
              <div class="form-group">
                  <label>Email</label>
                  <input
                      v-model="studentData.email"
                      type="email"
                      required
                      class="form-control"
                      placeholder="Enter your email"
                  />
              </div>
          
              <div class="form-group">
                  <label>Upload CV</label>
                  <input type="file" @change="handleFileUpload" accept=".pdf,.doc,docx" required class="form-control" />
              </div>
              <button type="submit" class="submit-button">Submit</button>
          </form>
          <p class="footer-text">Login Here! <a href="/">Login</a></p>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStdStore } from '@/stores/studentStore';
export default {
  setup() {
      const stdStore = useStdStore();
      const studentData = ref({
          name: '',
          email: '',
          cv: null
      });

      const handleFileUpload = (event) => {
          const file = event.target.files[0];
          if (file) {
              studentData.value.cv = file; 
          }
      };

      const submitStudentData = async () => {
          console.log("Submitting Student Data:", studentData.value); 
          if (!studentData.value.cv) {
              alert("Please upload a CV.");
              return; 
          }

          await stdStore.submitStudentData(studentData.value);
      };

      return {
          studentData,
          handleFileUpload,
          submitStudentData
      };
  }
};
</script>


  <style scoped>
  /* Container for centering */
  .student-form-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #6e45e2, #88d3ce); 
    padding: 20px;
  }
  
  /* Card style for form */
  .student-form-card {
    background-color: white;
    padding: 40px;
    max-width: 500px;
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    text-align: left;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .student-form-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.2);
  }
  
  /* Headings */
  .student-form-card h3 {
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: bold;
    color: #333;
    text-align: center;
  }
  
  /* Form group styling */
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    font-size: 14px;
    color: #555;
    margin-bottom: 5px;
    display: block;
  }
  
  .form-control {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 16px;
    transition: border-color 0.3s ease;
  }
  
  .form-control:focus {
    border-color: #6e45e2;
    outline: none;
  }
  
  /* Submit button */
  .submit-button {
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
  
  .submit-button:hover {
    background-color: #5537c2;
  }
  .footer-text {
   
    margin-top: 20px;
    margin-left:35% ;
    color: #888;
  }
  
  .footer-text a {
    color: #6e45e2;
    text-decoration: none;
  }
  
  .footer-text a:hover {
    text-decoration: underline;
  }
  
  
  /* Responsive Design */
  @media (max-width: 600px) {
    .student-form-card {
      padding: 30px;
    }
  
    .submit-button {
      padding: 12px;
    }
  
    .form-control {
      padding: 10px;
    }
  }
  </style>
  