export default [
    {
        path: '/calificacion',
        name: 'calificacion.index',
        component: () => import(/* webpackChunkName: "calificacion" */ '@/views/calificaciones/index.vue'),
        meta: { title: 'Solicitud de calificación' }
    }
]
