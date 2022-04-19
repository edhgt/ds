<template>
    <div class="lockscreen-wrapper">
        <div class="lockscreen-logo">
            <CardHeader />
        </div>
        <div class="lockscreen-name">
            {{ store.user.name }} ({{ store.user.email }})
        </div>
        <div class="help-block text-center mt-4">
            dfasdf
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import axios from "@/config/axios.js";
import { useRoute, useRouter } from "vue-router";
import CardHeader from "@/views/auth/CardHeader.vue";
import { useUserStore } from "@/store/";
import { useToast } from "vue-toastification";

const store = useUserStore();
const toast = useToast();
const route = useRoute();
const router = useRouter();


onMounted(() => {
    axios.post(`${import.meta.env.VITE_API_ENDPOINT}/api/v1/f/email/verify/${route.params.id}/${route.params.hash}`, {
        id: route.params.id
    })
    .then((response) => {
        if(response.data.hasOwnProperty("access_token")) {
            toast.success("Su cuenta fue verificada", {
                timeout: false,
                position: "bottom-right",
            });
            store.auth(response.data);
            router.push({ name: "home" });
        } else {
            toast.success(response.data.message, {
                position: "top-center",
            });
            router.push({ name: "welcome" });
        }

    })
    .catch((error) => {
        toast.error(error.response.data.message, {
            timeout: false
        });
    })
});

document.body.classList.add("lockscreen")
document.body.removeAttribute('style')

</script>
