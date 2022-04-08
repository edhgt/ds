export default [
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/auth/login.vue'),
        meta: { title: 'Inicio de sesión' }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/auth/register.vue'),
        meta: { title: 'Registro de usuario' }
    },
    {
        path: '/password/reset',
        name: 'password.email',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/auth/password/email.vue'),
        meta: { title: 'Reinicio de contraseña' }
    },
    {
        path: '/password/reset/:token',
        name: 'password.reset',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/auth/password/reset.vue'),
        meta: { title: 'Reestrablecimiento de contraseña' }
    },
];
