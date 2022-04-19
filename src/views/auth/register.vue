<template>
    <div class="container">
        <Loader
            :is-visible="isVisible"
            :msg="msg"
        />
        <div class="py-4 text-center">
            <router-link :to="{ name: 'welcome' }">
                <img
                    class="d-block mx-auto mb-4"
                    src="@/assets/logo-mineco-compressed.png"
                    alt=""
                >
            </router-link>
            <h2>{{ $route.meta.title }}</h2>
            <p class="lead">
                Por favor, complete los siguientes campos para crear un usuario y posteriormente hacer la solicitud de Calificación al decreto 29-89 o al decreto 65-89.
            </p>
            <hr>
        </div>
        <div class="row" v-show="!showRegister">
            <div class="col-6 offset-md-3 shadow-lg p-5 mb-5 bg-white rounded">
                <form @submit.prevent="getDataSat">
                    <div class="form-group">
                        <label for="nit">
                            NIT
                            <small class="text-muted">
                                (número de identificación tributaria)
                            </small>
                        </label>
                        <input
                            v-model="nit"
                            autofocus
                            type="text"
                            required
                            class="form-control"
                            id="nit"
                            :class="{ 'is-invalid': nitNotFound != null }"
                        >
                        <div class="invalid-feedback">
                            {{ nitNotFound }}
                        </div>
                    </div>
                    <button
                        class="btn btn-primary"
                        type="submit"
                    >
                        Continuar
                    </button>
                </form>
            </div>
        </div>
        <div class="row" v-show="showRegister">
            <div class="col-md-5 order-md-2 mb-4">
                <ul class="list-group">
                    <li class="list-group-item lh-condensed">
                        <h6 class="my-0">
                            {{ empresa.nit }}
                        </h6>
                        <small class="text-muted">
                            Nit
                        </small>
                    </li>
                    <li class="list-group-item lh-condensed">
                        <h6 class="my-0">
                            {{ empresa.name }}
                        </h6>
                        <small class="text-muted">
                            Nombre
                        </small>
                    </li>
                    <li class="list-group-item lh-condensed">
                        <h6 class="my-0">
                            {{ empresa.email }}
                            <input
                                type="hidden"
                                :class="{ 'is-invalid': state.errors.hasOwnProperty('email') }"
                            >
                            <ShowErrors :errors="state.errors.email" />
                        </h6>
                        <small class="text-muted">
                            Correo electrónico
                        </small>
                    </li>
                    <li class="list-group-item lh-condensed">
                        <h6 class="my-0">
                            {{ empresa.telefono }}
                        </h6>
                        <small class="text-muted">
                            Teléfono
                        </small>
                    </li>
                </ul>
            </div>
            <div class="col-md-7 order-md-1 shadow-lg px-5 pt-4 pb-5 mb-5 bg-white rounded">
                <h4 class="mt-4 mb-3">
                    Información adicional
                </h4>
                <form @submit.prevent="submit">
                    <div class="form-group">
                        <label for="representante">Representante Legal</label>
                        <v-select
                            :options="state.representantes"
                            v-model="empresa.representante"
                        >
                        </v-select>
                        <input
                            type="hidden"
                            :class="{ 'is-invalid': state.errors.hasOwnProperty('representante') }"
                        >
                        <ShowErrors :errors="state.errors.representante" />
                    </div>
                    <div class="form-group">
                        <label for="establecimiento">Establecimiento</label>
                        <v-select
                            :options="state.establecimientos"
                            v-model="empresa.establecimiento"
                        >
                        </v-select>
                        <input
                            type="hidden"
                            :class="{ 'is-invalid': state.errors.hasOwnProperty('establecimiento') }"
                        >
                        <ShowErrors :errors="state.errors.establecimiento" />
                    </div>
                    <div class="d-block my-3">
                        <label>Decreto</label>
                        <div class="custom-control custom-radio">
                            <input
                                id="decreto_1"
                                name="decreto_1"
                                type="radio"
                                class="custom-control-input"
                                required
                                value="1"
                                :class="{ 'is-invalid': state.errors.hasOwnProperty('decreto_id') }"
                                v-model.number="empresa.decreto_id"
                            >
                            <label
                                class="custom-control-label"
                                for="decreto_1"
                            >
                                29-89 - Ley para la Actividad Exportadora
                            </label>
                        </div>
                        <div class="custom-control custom-radio">
                            <input
                                id="decreto_2"
                                name="decreto_1"
                                type="radio"
                                class="custom-control-input"
                                required
                                value="2"
                                :class="{ 'is-invalid': state.errors.hasOwnProperty('decreto_id') }"
                                v-model="empresa.decreto_id"
                            >
                            <label
                                class="custom-control-label"
                                for="decreto_2"
                            >
                                65-89 - Ley de Zonas Francas (Entidad Administradora)
                            </label>
                            <ShowErrors :errors="state.errors.decreto_id" />
                        </div>
                    </div>
                    <div class="form-group" v-if="typeof empresa.email == 'object'">
                        <label for="email">Correo electrónico</label>
                        <input
                            class="form-control"
                            id="email"
                            type="email"
                            required
                            :class="{ 'is-invalid': state.errors.hasOwnProperty('email') }"
                            v-model="empresa.email"
                        >
                        <ShowErrors :errors="state.errors.email" />
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input
                            class="form-control"
                            id="password"
                            type="password"
                            required
                            :class="{ 'is-invalid': state.errors.hasOwnProperty('password') }"
                            v-model="empresa.password"
                        >
                        <ShowErrors :errors="state.errors.password" />
                    </div>
                    <div class="form-group">
                        <label for="password-confirmed">Confirmar contraseña</label>
                        <input
                            class="form-control"
                            id="password-confirmed"
                            type="password"
                            required
                            v-model="empresa.password_confirmation"
                        >
                    </div>
                    <button
                        class="btn btn-primary btn-lg btn-block mb-4"
                        type="submit"
                    >
                        Crear usuario
                    </button>
                    <div class="d-flex flex-row justify-content-between">
                        <router-link
                            :to="{ name: 'login', query: { email: empresa.email } }"
                        >
                            Iniciar sesión
                        </router-link>
                        <a
                            href="#"
                            @click="showRegister = false"
                        >
                            Consultar otro nit
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/";
import axios from "axios";
import vSelect from "vue-select";
import 'vue-select/dist/vue-select.css';
import ShowErrors from '@/components/ShowErrors.vue';
import Loader from '@/components/Loader.vue';
import { useToast } from "vue-toastification";

const store = useUserStore();
const router = useRouter();
const route = useRoute();
const showRegister = ref(false);
const nitNotFound = ref(null);
const nit = ref(null);
const isVisible = ref(null);
const msg = ref(null);
const empresa = reactive({
    decreto_id: route.query.decreto_id,
    nit: null,
    email: null,
    fecha_inscripcion: null,
    name: null,
    nit: null,
    telefono: null,
    direccion: null,
    establecimiento: null,
    representante: null,
    role_id: null,
    password: null,
    password_confirmation: null,
});

const state = reactive({
    establecimientos: [],
    establecimientos: [],
    errors: [],
});

const toast = useToast();

const transformarNombre = (nombre) => {
    nombre = nombre.split(',')
    if (nombre.length > 2) {
        let nombreCompleto = nombre[4] + ' ' + nombre[3] + ' ' + nombre[0] + ' ' + nombre[1]
        if (nombre[2] !== '') nombreCompleto = nombreCompleto + ' ' + nombre[2]
        return nombreCompleto
    } else if (nombre.length === 2) {
        return nombre[0] + ', ' + nombre[1]
    } else {
        return nombre[0]
    }
};

watch(() => empresa.decreto_id, (decreto) => {
    if(decreto == "1") {
        empresa.role_id = 1
    } else if(decreto == "2") {
        empresa.role_id = 2
    } else {
        empresa.role_id = null
    }
});

const getDataSat = () => {
    isVisible.value = true
    msg.value = "Consultando datos en la SAT..."
    axios.get(import.meta.env.VITE_API_ENDPOINT + "/api/v1/f/sat/consulta?nit=" + nit.value)
        .then((response) => {
            isVisible.value = false
            nitNotFound.value = null
            showRegister.value = true
            empresa.nit = response.data.nit
            empresa.email = response.data.email
            empresa.fecha_inscripcion = response.data.fecha_inscripcion
            empresa.name = response.data.name
            empresa.telefono = response.data.telefono
            empresa.direccion = response.data.direccion
            empresa.establecimiento = null
            empresa.representante = null
            empresa.password = null
            empresa.password_confirmation = null

            state.establecimientos = [];
            if (typeof response.data.establecimientos.length === 'number') {
                state.establecimientos = response.data.establecimientos.map(est => {
                    return {
                        ...est,
                        label: est.NOM + ' (' + est.DIR + ')'
                    }
                })
            } else {
                state.establecimientos.push({
                    ...response.data.establecimientos,
                    label: response.data.establecimientos.NOM
                })
            }
            state.representantes = [];
            if (typeof response.data.representantes.length === 'number') {
                state.representantes = response.data.representantes.map(rep => {
                    return {
                        ...rep,
                        FNOM: transformarNombre(rep.NOM),
                        label: transformarNombre(rep.NOM) + ' (' + rep.NIT + ')'
                    }
                })
            } else {
                state.representantes.push({
                    ...response.data.representantes,
                    NOM: transformarNombre(response.data.representantes.NOM),
                    label: transformarNombre(response.data.representantes.NOM)
                })
            }
        })
        .catch((error) => {
            isVisible.value = false
            nitNotFound.value = error.response.data.message
            showRegister.value = false
        })
};

const submit = () => {
    state.errors = []
    
    if(empresa.representante == null) {
        state.errors.representante = ["El campo representante es obligatorio."]
        return 0;
    }

    if(empresa.establecimiento == null) {
        state.errors.establecimiento = ["El campo establecimiento es obligatorio."]
        return 0;
    }

    isVisible.value = true
    msg.value = "Registrando usuario..."

    axios.post(import.meta.env.VITE_API_ENDPOINT + '/api/v1/f/register', empresa)
    .then((response) => {
        isVisible.value = false
        store.auth(response.data)
        router.push({ name: 'home' });
    })
    .catch((error) => {
        isVisible.value = false
        if(error.response.data.errors.hasOwnProperty("email")) {
            toast.error(error.response.data.errors.email[0], {
                position: "bottom-center",
            })
        }
        state.errors = error.response.data.errors
    })
};

document.body.classList.remove("login-page");
document.body.classList.add("bg-light");
</script>

<style scoped>
.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
}
</style>