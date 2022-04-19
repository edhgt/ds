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
        path: '/email/verify',
        name: 'verification.notice',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/auth/notice.vue'),
        meta: { title: 'Su cuenta no ha sido verificadas' }
    },
    {
        path: '/email/verify/:id/:hash',
        name: 'verification.verify',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/auth/verify.vue'),
        meta: { title: 'Confirmación de cuenta' }
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
