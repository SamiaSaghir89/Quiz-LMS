<template>
  <div class="student-list">
    <h2>Student Requests</h2>
    
    <!-- Search Input -->
    <input 
      type="text" 
      v-model="searchQuery" 
      placeholder="Search by name..." 
      class="search-bar"
    />
    
    <!-- Filter Dropdown -->
    <div class="filter-dropdown">
      <select v-model="statusFilter" @change="filterStatus">
        <option value="All">All</option>
        <option value="Accepted">Accepted</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>CV</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in filteredStudents" :key="student.id">
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>
            <span v-if="student.cv">{{ student.cv }}</span>
            <span v-else class="no-cv">No CV available</span>
          </td>
          <td :class="{ accepted: student.status === 'Accepted', rejected: student.status === 'Rejected' }">{{ student.status }}</td>
          <td>
            <button class="accept" @click="acceptStudent(student)">Accept</button>
            <button class="reject" @click="rejectStudent(student)">Reject</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useStdStore } from '@/stores/studentStore';
import { computed, ref, onMounted } from 'vue';

export default {
  setup() {
    const stdStore = useStdStore();
    const searchQuery = ref('');
    const statusFilter = ref('All'); // Default to 'All'
    
    const students = computed(() => stdStore.students);

    const filteredStudents = computed(() => {
      let filteredList = students.value;
      
      // Filter by status
      if (statusFilter.value !== 'All') {
        filteredList = filteredList.filter(student => student.status === statusFilter.value);
      }

      // Search by name
      if (searchQuery.value) {
        filteredList = filteredList.filter(student => 
          student.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }

      return filteredList;
    });

    onMounted(() => {
      stdStore.viewRequest(); 
    });

    const acceptStudent = async (student) => {
      try {
        const response = await stdStore.acceptStudent(student.id);
        console.log("Accepted student:", response);
      } catch (error) {
        console.error('Error accepting student:', error);
      }
    };

    const rejectStudent = async (student) => {
      try {
        const response = await stdStore.rejectStudent(student.id);
        console.log("Rejected student:", response);
      } catch (error) {
        console.error('Error rejecting student:', error);
      }
    };

    const filterStatus = () => {
      // Automatically updates the filtered list when statusFilter changes
    };

    return {
      students,
      searchQuery,
      statusFilter,
      filteredStudents,
      acceptStudent,
      rejectStudent,
      filterStatus,
    };
  },
};
</script>

<style scoped>
.student-list {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
  transition: background-color 0.3s ease;
}

th {
  background-color: #6CBEC7;
  color: black;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

.no-cv {
  color: #ff6347;
}

.accepted {
  color: #28a745;
  font-weight: bold;
}

.rejected {
  color: #dc3545;
  font-weight: bold;
}

button {
  padding: 8px 12px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

button.accept {
  background-color: #28a745;
  color: white;
}

button.accept:hover {
  background-color: #218838;
}

button.reject {
  background-color: #dc3545;
  color: white;
}

button.reject:hover {
  background-color: #c82333;
}

.search-bar {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

.filter-dropdown {
  margin-bottom: 10px;
}

.filter-dropdown select {
  padding: 8px;
  border-radius: 4px;
  width: 200px;
  font-size: 16px;
}
</style>
