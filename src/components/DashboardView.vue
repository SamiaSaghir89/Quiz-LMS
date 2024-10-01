<!-- <template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2 v-if="user">Welcome to {{ user.role }}</h2>
      <ul class="menu-list">
        <li v-if="user?.permissions.viewRequests">
          <button @click="goToStudentList">View Requests</button>
        </li>
        <li v-if="user?.permissions.assignQuizzes">
          <button @click="assignQuiz">Assign Quiz</button>
        </li>
        <li v-if="user?.permissions.attemptedQuizzes">
          <button @click="attemptedQuizzes">Attempted Quizzes</button>
        </li>
        <li v-if="user?.permissions.addManagers">
          <button @click="addManagers" data-bs-toggle="modal" data-bs-target="#myModal">Add Managers</button>
        </li>
        <li v-if="user?.permissions.viewResults">
          <button @click="viewResults">View Results</button>
        </li>
        <li v-if="user?.role === 'student' && user?.permissions.attemptQuizzes">
          <button @click="attemptQuiz">Attempt Quiz</button>
        </li>
      </ul>
    </aside>

    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Navbar -->
      <nav class="navbar">
        <h1 class="navbar-title">Welcome to Dashboard</h1>
        <button class="logout-btn" @click="logout">Logout</button>
      </nav>

      <!-- Slot for changing content -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const user = ref({ role: "", permissions: {} });
    const router = useRouter();

    const goToStudentList = () => {
      router.push('/students');
    };

    const logout = () => {
      localStorage.removeItem("user");
      router.push("/");
    };

    return {
      user,
      goToStudentList,
      logout,
    };
  },
};
</script>

<style scoped>
/* Dashboard layout styles (same as previous) */
.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #001f3f;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.sidebar h2 {
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
  color: #ecf0f1;
}

.main-content {
  flex-grow: 1;
  background-color: #ecf0f1;
  padding: 30px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3a6d8c;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
}

.navbar-title {
  font-size: 24px;
  font-weight: bold;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.menu-list {
  list-style: none;
  padding: 0;
  width: 100%;
}

.menu-list li {
  margin-bottom: 20px;
}

.menu-list button {
  width: 100%;
  padding: 10px 15px;
  background-color: #34495e;
  border: none;
  color: white;
  text-align: left;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.menu-list button:hover {
  background-color: #6A9AB0;
}
</style> -->
