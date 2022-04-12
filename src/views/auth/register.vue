<template>
    <div class="container">
        <div class="py-4 text-center">
            <img
                class="d-block mx-auto mb-4"
                src="@/assets/logo-mineco-compressed.png"
                alt=""
            >
            <h2>{{ $route.meta.title }}</h2>
            <p class="lead">
                Por favor, complete los siguientes campos para crear un usuario y posteriormente hacer la solicitud de Calificación al decreto 29-89 o al decreto 65-89.
            </p>
            <hr>
        </div>
        <div class="row" v-show="!showRegister">
            <div class="col-6 offset-md-3">
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
                    @click="getDataSat"
                >
                    Continuar
                </button>
            </div>
        </div>
        <div class="row" v-show="showRegister">
            <div class="col-md-5 order-md-2 mb-4">
                <h4 class="mb-3">
                    <span class="text-muted">
                        Información Tributaria
                    </span>
                </h4>
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
                        </h6>
                        <small class="text-muted">
                            Correo
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
                <p class="text-right">
                    <a
                        href="#"
                        @click="showRegister = false"
                    >
                        <small>Consultar otro nit</small>
                    </a>
                </p>
            </div>
            <div class="col-md-7 order-md-1">
                <h4 class="mt-4 mb-3">
                    Información adicional
                </h4>
                <form>
                    <div class="d-block my-3">
                        <div class="custom-control custom-radio">
                            <input
                                id="decreto_1"
                                name="decreto_1"
                                type="radio"
                                class="custom-control-input"
                                required
                                value="1"
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
                                value="1"
                            >
                            <label
                                class="custom-control-label"
                                for="decreto_2"
                            >
                                65-89 - Ley de Zonas Francas (Entidad Administradora)
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="representante">Representante Legal</label>
                        <v-select />
                    </div>
                    <div class="form-group">
                        <label for="establecimiento">Establecimiento Legal</label>
                        <select
                            name="establecimiento"
                            id="establecimiento"
                            class="custom-select d-block w-100"
                            required
                        >
                            <option value=""></option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input
                            class="form-control"
                            id="password"
                            type="password"
                            required
                        >
                    </div>
                    <div class="form-group">
                        <label for="password-confirmed">Confirmar contraseña</label>
                        <input
                            class="form-control"
                            id="password-confirmed"
                            type="password"
                            required
                        >
                    </div>
                    <hr class="mb-4">
                    <button
                        class="btn btn-primary btn-lg btn-block"
                        type="submit"
                    >
                        Crear usuario
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import vSelect from "vue-select";
import 'vue-select/dist/vue-select.css';
//import { useToast } from "vue-toastification";

//const toast = useToast();
const showRegister = ref(false);
const nitNotFound = ref(null);
const nit = ref(null);
const empresa = reactive({
    nit: null,
    email: null,
    fecha_inscripcion: null,
    name: null,
    nit: null,
    telefono: null,
    direccion: null,
});

const getDataSat = () => {
    axios.get(import.meta.env.VITE_API_ENDPOINT + "/api/v1/f/sat/consulta?nit=" + nit.value)
        .then((response) => {
            nitNotFound.value = null
            showRegister.value = true
            empresa.nit = response.data.nit
            empresa.email = response.data.email
            empresa.fecha_inscripcion = response.data.fecha_inscripcion
            empresa.name = response.data.name
            empresa.telefono = response.data.telefono
            empresa.direccion = response.data.direccion
        })
        .catch((error) => {
            if(error.response.status == 404) {
                nitNotFound.value = error.response.data.message
            }
            showRegister.value = false
            /*toast.error(error.response.data.message, {
                position: "bottom-center",
            });*/
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