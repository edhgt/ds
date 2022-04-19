import { createRouter, createWebHistory } from "vue-router";
import authRoutes from './modules/auth.router';
import calificacionRoutes from './modules/calificacion.router';
import tramitesRoutes from './modules/tramites.router';
import { useUserStore } from "@/store";

const routes = [
    {
        name: "welcome",
        path: "/",
        component: () => import("@/views/Welcome.vue"),
        meta: { title: 'Welcome' },
    },
    {
        path: "/",
        component: () => import("@/views/Layout.vue"),
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/Home.vue'),
                meta: { title: 'Inicio' }
            },
            {
                path: 'profile',
                name: 'profile',
                component: () => import('@/views/Profile.vue'),
                meta: { title: 'Perfil' }
            },
            {
                path: 'notificaciones',
                name: 'notificaciones.index',
                component: () => import('@/views/notificaciones/index.vue'),
                meta: { title: 'Notificaciones' }
            },
            ...calificacionRoutes,
            ...tramitesRoutes
        ],
        meta: { requiresAuth: true },
    },
    ...authRoutes,
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/views/errors/404NotFound.vue'),
        meta: { title: 'Página no encontrada' }
    }
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

    if(!store.isVerified && store.isLoggedIn && to.name == "home") next({ name: 'verification.notice' });
    else if (to.meta.requiresAuth && !store.isLoggedIn) next({ name: 'login', query: { next: to.name } });
    else next();
});

export default router;
