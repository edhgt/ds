<template>
    <div class="login-box">
         <Loader
            :is-visible="isVisible"
            :msg="msg"
        />
        <div class="card">
            <card-header />
            <div class="card-body">
                <p class="login-box-msg">
                    {{ $route.meta.title }}
                </p>
                <form @submit.prevent="submit">
                    <div class="input-group mb-3">
                        <input
                            id="email"
                            v-model="email"
                            autocomplete="email"
                            autofocus
                            class="form-control"
                            name="email"
                            placeholder="Correo electrónico"
                            required
                            type="email"
                            :class="{ 'is-invalid': errors.email.length > 0 }"
                        >
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                        <ShowErrors :errors="errors.email" />
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button
                                type="submit"
                                class="btn btn-primary btn-block"
                            >
                                Enviar enlace
                            </button>
                        </div>
                    </div>
                </form>
                <div class="social-auth-links text-center mb-3"></div>
                <p class="mb-1">
                    <router-link :to="{ name: 'login', query: { email: email } }">
                        Iniciar sesión
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import CardHeader from '@/views/auth/CardHeader.vue';
import ShowErrors from '@/components/ShowErrors.vue';
import Loader from '@/components/Loader.vue';
import { useToast } from "vue-toastification";

const route = useRoute();
const email = ref(route.query.email);
const errors = reactive({
    email: []
});
const isVisible = ref(null);
const msg = ref(null);
const toast = useToast();


const submit = () => {
    errors.email = [];
    isVisible.value = true
    msg.value = "Solicitando reinicio de contraseña"
    axios.post(import.meta.env.VITE_API_ENDPOINT + '/api/v1/f/password/email',
        {
            email: email.value,
        }
    )
    .then(() => {
        isVisible.value = false
        toast.success('Le hemos enviado por correo electrónico el enlace para restablecer su contraseña', {
            timeout: false,
            position: 'top-center',
        })
    })
    .catch((error) => {
        isVisible.value = false

        if (error.response.status === 500) {
            errors.email = ['No fue posible procesar la solicitud en este momento. Por favor, intente más tarde.']
            return
        }
        errors.email = error.response.data.errors.email
    })
}

document.body.classList.add('login-page')
document.body.removeAttribute('style')
</script>
