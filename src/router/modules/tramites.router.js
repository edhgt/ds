export default [
    {
        path: '/tramites',
        name: 'tramites.index',
        component: () => import('@/views/tramites/index.vue'),
        meta: { title: 'Historial de Trámites' }
    },
    {
        path: '/tramites/seleccionar',
        name: 'tramites.seleccionar',
        component: () => import('@/views/tramites/seleccionar.vue'),
        meta: { title: 'Seleccione un trámite' }
    },
    {
        path: '/tramites/:id/create',
        name: 'tramites.create',
        props: true,
        component: () => import('@/views/calificaciones/index.vue'),
        meta: { title: 'Solicitar trámite' }
    }
]
