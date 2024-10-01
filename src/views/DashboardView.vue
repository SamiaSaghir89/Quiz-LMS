<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'is-active': isSidebarOpen }">
      <h2 v-if="user">Welcome to {{ user.role }}</h2>
      <ul v-if="user?.permissions && user.permissions.length" class="menu-list">
        <li v-if="hasPermission('view students')">
          <button @click="goToStudentList">
            <i class="fas fa-user-graduate"></i> View Requests
          </button>
        </li>
        <li v-if="hasPermission('assign quiz')">
          <button @click="goToAssignQuiz">
            <i class="fas fa-tasks"></i> Assign Quiz
          </button>
        </li>
        <li v-if="user?.role === 'Admin' && hasPermission('create quiz')">
  <button @click="goToCreateQuiz">
    <i class="fas fa-plus-circle"></i> Quizzes
  </button>
  {{ console.log('Render quiz button condition met') }}
</li>


        <li v-if="hasPermission('view quiz attempts')">
          <button @click="attemptedQuizzes">
            <i class="fas fa-eye"></i> Attempted Quizzes
          </button>
        </li>
        <li v-if="hasPermission('add user')">
          <button @click="addManagers">
            <i class="fas fa-user-plus"></i> Add Managers & Supervisor
          </button>
        </li>
        <li v-if="hasPermission('view results')">
  <button @click="viewResults">
    <i class="fas fa-chart-bar"></i> View Results
  </button>
</li>
        <li v-if="user?.role === 'student' && hasPermission('attempt quizzes')">
          <button @click="attemptQuiz">
            <i class="fas fa-clipboard-list"></i> Attempt Quiz
          </button>
        </li>
        <li v-if="user?.role === 'student' && hasPermission('view result')">
  <button @click="viewResultsStd">
    <i class="fas fa-clipboard-list"></i> View Results
  </button>
</li>
      </ul>
    </aside>

    <!-- Main Content Area -->
    <div class="main-content" :class="{ 'fullscreen': !isSidebarOpen && isSmallScreen }">
      <!-- Navbar -->
      <nav class="navbar">
        <button class="hamburger" @click="toggleSidebar" v-if="isSmallScreen">
          <i class="fas fa-bars"></i>
        </button>
        <h1 class="navbar-title">Welcome to Dashboard</h1>
        <button class="logout-btn" @click="logout">
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </nav>

      <!-- Dashboard Boxes -->
      <div class="dashboard-boxes" v-if="user?.role === 'Admin' || user?.role === 'Manager'">
        <div class="box total-students">
          <h3><i class="fas fa-users"></i> Total Students</h3>
          <p>{{ totalStudents }} Students</p>
        </div>
        <div class="box managers">
          <h3><i class="fas fa-user-tie"></i> Managers</h3>
          <p>{{ totalManagers }} Managers</p>
        </div>
        <div class="box custom">
          <h3><i class="fas fa-user-times"></i> Rejected Students</h3>
          <p>Add your custom content here</p>
        </div>
      </div>

      <!-- Stylish Calendar -->
      <div class="calendar" v-if="user?.role === 'Admin' || user?.role === 'Manager'">
        <h3><i class="fas fa-calendar-alt"></i> Calendar</h3>
        <p>Stylish calendar goes here...</p>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore"; 

export default {
  setup() {
    const user = ref({ role: "", permissions: [] });
    const totalStudents = ref(150); 
    const totalManagers = ref(10); 
    const router = useRouter();
    const authStore = useAuthStore(); 
    const isSidebarOpen = ref(false); 
    const isSmallScreen = ref(false); 

    onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    user.value = JSON.parse(storedUser);
    console.log(user.value); // Check the user's role and permissions
  } else {
    router.push("/");
  }

  // Set initial value for small screen
  isSmallScreen.value = window.innerWidth < 768;
  isSidebarOpen.value = !isSmallScreen.value; // On small screens, sidebar closed by default

  // Add event listener for resizing
  window.addEventListener("resize", handleResize);
});

    const handleResize = () => {
  isSmallScreen.value = window.innerWidth < 768; // Small screen threshold

  if (!isSmallScreen.value) {
    isSidebarOpen.value = true; // On large screens, sidebar should be open
  } else {
    isSidebarOpen.value = false; // On small screens, sidebar should be closed initially
  }
};

const hasPermission = (permissionName) => {
  console.log("Checking permission for:", permissionName);
  return user.value.permissions.includes(permissionName);
};


    const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value; // Toggle sidebar visibility
  
  // Add or remove the fullscreen class based on sidebar state
  const mainContent = document.querySelector('.main-content');
  if (isSidebarOpen.value) {
    mainContent.classList.remove('fullscreen');
  } else {
    mainContent.classList.add('fullscreen');
  }
};

    const viewResults = () => {
  if (user.value.role === 'Admin') {
    router.push("/admin-results");
  } else if (user.value.role === 'Manager') {
    router.push("/manager-results");
  }
};
    const goToStudentList = () => {
      router.push("/students");
    };

    const goToAssignQuiz = () => {
      router.push("/assignQuiz");
    };

    const addManagers = () => {
      router.push("/addmanger");
    };

    const goToCreatQuiz = () => {
      router.push("/create-quiz");
    };

    const logout = async () => {
      await authStore.logout();
      router.push("/");
    };
    const attemptQuiz = async()=>{
      router.push("/assign-quiz")
    }
    const viewResultsStd = async()=>{
      router.push("/stdViewResults")
    }

    return {
      user,
      attemptQuiz,
      goToStudentList,
      goToAssignQuiz,
      goToCreatQuiz,
      totalStudents,
      totalManagers,
      logout,
      addManagers,
      hasPermission,
      viewResults,
      isSidebarOpen, 
      toggleSidebar, 
      isSmallScreen 
    };
  },
};
</script>

<style scoped>
/* Dashboard layout */
.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

/* Sidebar styles */
.sidebar {
  width: 250px;
  background-color: #604CC3;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.3s ease;
  transform: translateX(-100%); /* Hide by default on small screens */
}

.sidebar.is-active {
  transform: translateX(0); /* Show sidebar */
}

/* Main content and navbar */
.main-content {
  flex-grow: 1;
  background-color: #ecf0f1;
  padding: 30px;
}

/* Fullscreen style for main content */
.main-content.fullscreen {
  width: 100vw; /* Full viewport width */
  height: 100vh; /* Full viewport height */
  position: absolute; /* Take it out of the flow */
  top: 0; /* Align to top */
  left: 0; /* Align to left */
  z-index: 1; /* Make sure it appears above the sidebar */
  background-color: #ecf0f1; /* Maintain background color */
}

/* Hamburger button */
.hamburger {
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  float: start;
}

/* Navbar styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #604CC3;
  color: white;
}

/* Box styles */
.box {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
}

.calendar {
  margin-top: 20px;
}

/* Logout button */
.logout-btn {
  background: #D2E0FB;
  border: none;
  width: 78px;
  color: black;
  cursor: pointer;
}
.menu-list {
  list-style-type: none; /* Remove bullet points */
  padding: 0; /* Remove default padding */
}

.menu-list li {
  width: 100%; /* Make li take full width */
}

.menu-list button {
  width: 100%; /* Make buttons take full width */
  background-color: #D2E0FB; /* Button color */
  color: black; /* Text color */
  border: none; /* No border */
  padding: 12px; /* Add padding */
  margin: 5px 0; /* Space between buttons */
  border-radius: 5px; /* Rounded corners */
  font-size: 16px; /* Font size */
  text-align: left; /* Align text to left */
  transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth transition */
  cursor: pointer; /* Pointer cursor on hover */
}

/* Button hover effect */
.menu-list button:hover {
  background-color: #ECDFCC; /* Darker blue on hover */
  transform: scale(1.05); /* Slightly enlarge button */
}

/* Stylish calendar */
.calendar {
  margin-top: 20px;
  border-radius: 5px; /* Rounded corners */
  padding: 20px; /* Padding around calendar */
  background-color: white; /* Calendar background */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

/* Dashboard box styles */
.box {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: transform 0.2s ease; /* Smooth transition for scaling */
}

.box:hover {
  transform: scale(1.02); /* Slightly enlarge on hover */
}
.navbar-title{
  font-size: 20px;
}
</style>
