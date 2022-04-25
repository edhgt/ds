<template>
    <div class="login-box">
        <Loader
            :is-visible="isLoader"
            msg="Reiniciando contraseña"
        />
        <div class="card">
            <app-card-header></app-card-header>
            <div class="card-body">
                <div class="login-box-msg">
                    {{ $route.meta.title }}
                    <div
                        v-show="msg"
                        class="alert alert-success"
                    >
                        {{ msg }}
                    </div>
                </div>
                <form
                    v-show="!msg"
                    @submit.prevent="submit"
                >
                    <div class="input-group mb-3">
                        <input
                            id="email"
                            v-model="user.email"
                            autocomplete="email"
                            class="form-control"
                            name="email"
                            placeholder="Correo electrónico"
                            readonly
                            required
                            type="email"
                            :class="{ 'is-invalid': state.errors.email }"
                        >
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                        <ShowErrors :errors="state.errors.email" />
                    </div>
                    <div class="input-group mb-2">
                        <input
                            id="password"
                            v-model="user.password"
                            autofocus
                            type="password"
                            class="form-control"
                            name="password"
                            placeholder="Nueva contraseña"
                            required
                            :class="{ 'is-invalid': state.errors.password }"
                        >
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                        <ShowErrors :errors="state.errors.password" />
                    </div>
                    <div class="input-group mb-2">
                        <input
                            id="password-confirmed"
                            v-model="user.password_confirmation"
                            type="password"
                            class="form-control"
                            name="password-confirmed"
                            placeholder="Confirmar nueva contraseña"
                            required
                        >
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button
                                type="submit"
                                class="btn btn-primary btn-block"
                            >
                                Cambiar contraseña
                            </button>
                        </div>
                    </div>
                </form>
                <p class="mt-3 mb-1">
                    <router-link :to="{ name: 'login', query: { email: user.email }}">
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
import ShowErrors from '@/components/ShowErrors.vue'
import AppCardHeader from '@/views/auth/CardHeader.vue'
import Loader from '@/components/Loader.vue'
import axios from 'axios'
import { useToast } from "vue-toastification";

const route = useRoute();
const user = reactive({
    token: route.params.token,
    email: route.query.email,
    password: null,
    password_confirmation: null,
});
const msg = ref(null);
const state = reactive({
    errors: {}
});
const isLoader = ref(false);
const toast = useToast();

const submit = () => {
    isLoader.value = true
    state.errors = []
    axios.post(import.meta.env.VITE_API_ENDPOINT + '/api/v1/f/password/reset', user)
        .then(() => {
            isLoader.value = false
            msg.value = '¡Su contraseña ha sido restablecida!'
        })
        .catch((error) => {
            isLoader.value = false
            if (error.response.status === 500) {
                state.errors = { email: ['No fue posible procesar la solicitud en este momento. Por favor, intente más tarde.'] }
                return
            }

            if(error.response.data.errors.email) {
                toast.error('El token ha expirado o el correo electrónico no fue encontrado', {
                    position: "bottom-center",
                })
            }
            state.errors = error.response.data.errors
        })
}
document.body.classList.add('login-page');
document.body.removeAttribute('style');
</script>
