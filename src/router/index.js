import { createRouter, createWebHistory } from "vue-router";
import authRoutes from './modules/auth.router';

const routes = [
    {
        name: "welcome",
        path: "/",
        component: () => import("@/views/Layout.vue")
    },
    ...authRoutes,
];

const router = createRouter({
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    history: createWebHistory(),
    routes,
});

export default router;
