<template>
    <nav aria-label="Page navigation">
        <ul class="pagination pagination-sm justify-content-center">
            <li
                class="page-item"
                :class="{ 'disabled': prevPageUrl == null}"
            >
                <a
                    class="page-link"
                    href="#"
                    tabindex="-1"
                    aria-disabled="true"
                    @click="$emit('page', prevPageUrl)"
                >
                    <span aria-hidden="true">&laquo;</span>
                    Anterior
                </a>
            </li>
            <li
                class="page-item"
                :class="{'disabled': nextPageUrl == null } "
            >
                <a
                    class="page-link"
                    href="#"
                    @click="$emit('page', nextPageUrl)"
                >
                    Siguiente
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        prevPageUrl: {
            required: false,
            type: String,
            default: null
        },
        nextPageUrl: {
            required: false,
            type: String,
            default: null
        }
    },
    emits: ['page']
}
</script>
