<template>
    <h1>Login</h1>
    <input
        v-model="name"
        type="text"
    />
    <p>{{ name }}</p>
</template>

<script setup>
import { ref } from "vue";
//import { useUserStore } from "@/store/";

const name = ref(null);
name.value = "Example"

//const user = useUserStore();

</script>