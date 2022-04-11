<template>
    <div class="card-header text-center">
        <router-link
            class="h1"
            :to="{ name: 'welcome' }"
        >
            <b>{{ APP_TITLE }}</b>
        </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            APP_TITLE: import.meta.env.VITE_TITLE
        }
    }
}
</script>
