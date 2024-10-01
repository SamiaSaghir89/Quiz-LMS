import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../views/Forms/LoginFormView.vue';
import StudentForm from '../views/Forms/StudentFormView.vue';
import Dashboard from '../views/DashboardView.vue'; 
import StudentList from '../views/StudentList.vue';
import AssignQuiz from '@/views/QuizFolder/AssignQuiz.vue';
import AddManager from '@/views/AddManager.vue';
import SetUpPassword from '@/views/SetUpPassword.vue';
import CreateQuiz from '@/views/QuizFolder/CreateQuiz.vue';
import ViewAllQuiz from '@/views/QuizFolder/ViewAllQuiz.vue';
import ViewResult from '@/views/ViewResult.vue';
import StdAttemptedQuiz from '@/views/StudentFolder/stdAttemptedQuiz.vue';
import StdViewResults from '@/views/StudentFolder/stdViewResults.vue';
import StdAssignQuiz from '@/views/StudentFolder/stdAssignQuiz.vue';

const routes = [
  {
    path:'/setUpPass',
    name:'setupPass',
    component: SetUpPassword
  },
  {
    path: '/',
    name: 'Login',
    component: LoginForm,
  },
  {
    path: '/student-form',
    name: 'StudentForm',
    component: StudentForm,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,  
    

    children: [
      {
        path: '/students',
        component: StudentList,
      },
      {
        path:'/assignQuiz',
        component: AssignQuiz
      },
      {
        path:'/create-quiz',
        component:CreateQuiz
      },
      {
        path:'/view-quiz',
        component:ViewAllQuiz,
      },
      {
        path:'/view-result',
        component:ViewResult
      },
      {
        path: '/attempt-quiz/:quizId', // Dynamic route to pass quizId
        component: StdAttemptedQuiz
      },
      {
        path:'/assign-quiz',
        component:StdAssignQuiz
              },
{
  path:'/addmanger',
  component:AddManager
},
{
  path:'/stdViewResults',
  component:StdViewResults
}
    ]
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // If the user object does not exist or role is not valid
    if (!user || !user.role || (user.role !== 'Admin' && user.role !== 'Manager')) {
      next('/'); // Redirect to login
    } else {
      next(); // Allow access to the route
    }
  } else {
    next(); // No authentication required
  }
});


export default router;
