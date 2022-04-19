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
            this.user = {}
        }
    },
    getters: {
        isLoggedIn(state) {
            return state.access_token !== null;
        },
        isVerified(state) {
            return state.user.email_verified_at != null
        },
        isQualified(state) {
            return state.user.email_verified_at != null && state.user.calificada != null
        },
        isAdmin(state) {
            return state.user.role_id == 2
        }
    },
});
