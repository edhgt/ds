// stores/counter.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        user: {},
        access_token: null,
        isLoggedIn: false,
    }),
    actions: {
        auth(data) {
            this.user = data.user;
            this.access_token = data.access_token;
            this.isLoggedIn = true;
            sessionStorage.user = JSON.stringify(data.user);
            sessionStorage.access_token = data.access_token;
        },
        logout() {
            this.isLoggedIn = false
        }
    },
    getters: {
        getUsername(state) {
            return state.nit
        },
    },
});
