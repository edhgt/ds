import { createRouter, createWebHistory } from "vue-router";
import authRoutes from './modules/auth.router';
import { useUserStore } from "@/store";

const routes = [
    {
        name: "welcome",
        path: "/",
        component: () => import("@/views/Layout.vue"),
        meta: { title: 'Welcome' },
    },
    {
        name: "home",
        path: "/home",
        component: () => import("@/views/Layout.vue"),
        meta: { title: 'Home', requiresAuth: true },
    },
    ...authRoutes,
];

const router = createRouter({
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'DISERCOMI';
    const store = useUserStore();

    if (to.meta.requiresAuth && !store.isLoggedIn) next({ name: 'login', query: { next: to.name } });
    else next();
    /*if (to.name !== 'login' && to.meta.requireAuth && sessionStorage.access_token !== null) {
        next({ name: 'login', query: { next: to.name } })
    } else {
        next()
    }*/
});

export default router;
