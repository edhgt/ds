// stores/counter.js
import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: "user",
    state: () => {
        return {
            name: null,
            email: null,
            nit: null,
            ei: null,
            isAdmin: false,
            token: null,
            auth: false,
        };
    },
    actions: {
        login() {
            this.auth = true
        },
    },
    getters: {
        getUsername(state) {
            return state.nit
        },
    },
});
