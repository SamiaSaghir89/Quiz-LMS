import axios from "axios";
import { defineStore } from "pinia";

export const useSetupPassword = defineStore('setupPass', {
  state: () => ({
    setup_pass: "http://192.168.15.90:8000/api/user/set-password",
    token:'token=cHqvc4DVJfB1lpkiZLkWVbIz354kgYf79R1hxIdnMrAbi1ecv7IBgMuOW4eu'
  }),
  actions: {
    async setUpPassword(email, password, password_confirmation, token) {
      try {
        const response = await axios.post(this.setup_pass, {
          email,
          password,
          password_confirmation,
          token:this.token
        });
        console.log(response.data); 
      } catch (error) {
        console.error(error); 
      }
    }
  }
});
