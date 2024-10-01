import axios from "axios";
import { defineStore } from 'pinia';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const useStdStore = defineStore('form', {
    state: () => ({
        std_form: "http://192.168.15.90:8000/api/submit",  
        view_std: "http://192.168.15.90:8000/api/get-submissions",  
        accept_std: "http://192.168.15.90:8000/api/accept/submissions/{id}",
        reject_std: "http://192.168.15.90:8000/api/reject/submissions/{id}", 
       
        students: [] 
    }),
    actions: {
        async submitStudentData(studentData) {
            try {
                const formData = new FormData();
                formData.append('name', studentData.name);  
                formData.append('email', studentData.email);  
                formData.append('cv', studentData.cv);  

                console.log('Submitting student data:', formData);

                const response = await axios.post(this.std_form, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('Response from submit API:', response.data);
                this.students.push({
                    id: response.data.id,  
                    name: studentData.name,
                    email: studentData.email
                });
                toast.success('Student data submitted successfully!');
            } catch (error) {
                console.error('Error submitting student data:', error);
                toast.error('Failed to submit student data.');
                throw error;
            }
        },
       
        async viewRequest() {
            try {
                console.log('Fetching student submissions from:', this.view_std);
        
                const token = localStorage.getItem('token'); 
                const response = await axios.get(this.view_std, {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });
        
                console.log('Response from viewRequest API:', response.data);
                this.students = response.data.data || []; 
                toast.success('Student submissions fetched successfully!');
            } catch (error) {
                console.error('Error fetching submissions:', error);
                toast.error('Failed to fetch student submissions.');
                throw error;
            }
        },
        
        async acceptStudent(studentId) {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.post(this.accept_std.replace('{id}', studentId), {}, {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });
                toast.success('Student accepted successfully!');
                return response.data;
            } catch (error) {
                console.error('Error accepting student:', error);
                toast.error('Failed to accept student.');
                throw error;
            }
        },
        
        async rejectStudent(studentId) {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.post(this.reject_std.replace('{id}', studentId), {}, {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });
                toast.success('Student rejected successfully!');
                return response.data;
            } catch (error) {
                console.error('Error rejecting student:', error.response?.data || error); // Improved error logging
                toast.error('Failed to reject student.');
                throw error;
            }
        }
    }
});
