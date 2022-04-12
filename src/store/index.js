// stores/counter.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        user: JSON.parse(sessionStorage.getItem('user')) || {},
        access_token: sessionStorage.getItem('access_token') || null,
    }),
    actions: {
        auth(data) {
            this.user = data.user;
            this.access_token = data.access_token;
            sessionStorage.user = JSON.stringify(data.user);
            sessionStorage.access_token = data.access_token;
        },
        logout() {
            sessionStorage.clear();
            this.access_token = null;
        }
    },
    getters: {
        isLoggedIn(state) {
            return state.access_token !== null;
        },
    },
});
