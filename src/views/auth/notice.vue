<template>
    <div class="lockscreen-wrapper shadow-lg p-3 mb-5 bg-white rounded">
        <Loader
            :is-visible="isVisible"
            msg="Solicitando enlace de verificación de cuenta..."
        />
        <div class="lockscreen-logo">
            <CardHeader />
        </div>
        <div class="lockscreen-name">
            {{ store.user.name }} ({{ store.user.email }})
        </div>
        <div class="help-block text-center mt-4">
            Antes de poder continuar, por favor,
            confirme su correo electrónico con el enlace que le hemos enviado.
            Si no ha recibido el email,
            <a
                href="#"
                @click="resendVerificationEmail"
            >
                pulse aquí para que le enviemos otro.
            </a>
            <a
                class="nav-link mt-5 text-muted"
                href="#"
                @click="logout"
            >
                Cerrar sesión
                <i class="fas fa-sign-out-alt" />
            </a>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "@/config/axios.js";
import CardHeader from "@/views/auth/CardHeader.vue";
import { useUserStore } from "@/store/";
import { useToast } from "vue-toastification";
import Loader from '@/components/Loader.vue';

const store = useUserStore();
const toast = useToast();
const router = useRouter();
const isVisible = ref(false);

const resendVerificationEmail = () => {
    isVisible.value = true;
    axios.post(import.meta.env.VITE_API_ENDPOINT + "/api/v1/f/email/verification-notification")
    .then((response) => {
        isVisible.value = false;
        toast.success(response.data.message, {
            timeout: false,
        });
        
    })
    .catch((error) => {
        isVisible.value = false;
        toast.error(error.response.data.message, {
            timeout: false
        });
    })
}
const logout = () => {
    store.logout();
    router.push({ name: 'welcome' })
}

document.body.classList.add("lockscreen")
document.body.removeAttribute('style')

</script>
