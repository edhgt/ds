<template>
    <div class="login-box">
        <div class="card">
            <CardHeader />
            <div class="card-body">
                <p class="login-box-msg">
                    {{ $route.meta.title }}
                </p>
                <form @submit.prevent="login">
                    <div class="input-group mb-3">
                        <input
                            id="email"
                            v-model="email"
                            autocomplete="email"
                            autofocus
                            type="email"
                            class="form-control"
                            name="email"
                            placeholder="Correo electrónico"
                            required
                        >
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group">
                        <input
                            id="password"
                            v-model="password"
                            type="password"
                            class="form-control"
                            name="password"
                            placeholder="Contraseña"
                            required
                            :class="{ 'is-invalid': errors.email || errors.password }"
                        >
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                        <ShowErrors :errors="errors.email || errors.password" />
                    </div>
                    <div class="row mt-3">
                        <div class="col-12">
                            <button
                                class="btn btn-primary btn-block"
                                type="submit"
                            >
                                Iniciar sesión
                            </button>
                        </div>
                    </div>
                </form>
                <div class="social-auth-links text-center mb-3"></div>
                <p class="mb-1">
                    <router-link :to="{ name: 'password.email', query: { email: email } }">
                        ¿Olvidó su contraseña?
                    </router-link>
                </p>
                <p class="mb-0">
                    <router-link
                        :to="{ name: 'register' }"
                        class="text-center"
                    >
                        Registro de usuario
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/";
import axios from "axios";
import CardHeader from '@/views/auth/CardHeader.vue';
import ShowErrors from '@/components/ShowErrors.vue';

const route = useRoute();
const email = ref(route.query.email);
const password = ref(null);
const errors = reactive({});
const store = useUserStore();
const router = useRouter();


const login = () => {
    axios.post(import.meta.env.VITE_API_ENDPOINT + '/api/v1/f/login', {
        email: email.value,
        password: password.value,
    })
        .then((response) => {
            store.auth(response.data);
            router.push({ name: route.query.next || 'home' });
        })
        .catch(error => {
            errors.email = null;
            errors.password = null;
            if(error.response.data.errors.email) {
                errors.email = error.response.data.errors.email;
            } else {
                errors.password = error.response.data.errors.password;
            }
        })
}

document.body.classList.add('login-page')
document.body.removeAttribute('style')
</script>
