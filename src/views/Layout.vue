<template>
    <Loader
        :is-visible="store.isLoader"
    />
    <div class="wrapper">
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a
                        class="nav-link"
                        data-widget="pushmenu"
                        href="#"
                        role="button"
                    >
                        <i class="fas fa-bars" />
                    </a>
                </li>
                <li class="nav-item">
                    <span class="nav-link">
                        {{ store.user.name }} ({{ store.user.email }})
                    </span>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link
                        class="nav-link"
                        :to="{ name: 'notificaciones.index' }"
                        title="Notificaciones"
                    >
                        <i class="far fa-bell" />
                        <span
                            v-show="store.notificationCounter > 0"
                            class="badge badge-warning navbar-badge"
                        >
                            {{ store.notificationCounter }}
                        </span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link"
                        data-widget="fullscreen"
                        href="#"
                        role="button"
                        title="Pantalla completa"
                    >
                        <i class="fas fa-expand-arrows-alt" />
                    </a>
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link"
                        data-widget="control-sidebar"
                        data-controlsidebar-slide="true"
                        href="#"
                        role="button"
                        title="Personalización"
                    >
                        <i class="fas fa-th-large" />
                    </a>
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link"
                        href="#"
                        title="Cerrar sesión"
                        @click="logout"
                    >
                        <i class="fas fa-sign-out-alt" />
                    </a>
                </li>
            </ul>
        </nav>
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <a
                href="#"
                class="brand-link"
            >
                <img
                    src="@/assets/logo.png"
                    alt="AdminLTE Logo"
                    class="brand-image img-circle elevation-3"
                >
                <span class="brand-text font-weight-light text-center">
                    {{ APP_BRAND }}
                </span>
            </a>
            <div class="sidebar">
                <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div class="image">
                        <img
                            src="@/assets/default-profile.png"
                            class="img-circle elevation-2"
                            alt="User Image"
                        />
                    </div>
                    <div class="info">
                        <router-link
                            class="d-block"
                            :to="{ name: 'profile' }"
                        >
                            {{ store.user.nit }}
                        </router-link>
                    </div>
                </div>
                <nav class="mt-2">
                    <ul
                        class="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <li class="nav-item">
                            <router-link
                                :to="{ name: 'home' }"
                                class="nav-link"
                            >
                                <i class="nav-icon fas fa-home"></i>
                                <p>
                                    Inicio
                                </p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link
                                :to="{ name: 'profile' }"
                                class="nav-link"
                            >
                                <i class="nav-icon fas fa-user"></i>
                                <p>
                                    Perfil
                                </p>
                            </router-link>
                        </li>
                        <li
                            v-if="store.isQualified"
                            class="nav-item"
                        >
                            <router-link
                                class="nav-link"
                                :to="{ name: 'tramites.index' }"
                            >
                                <i class="nav-icon fas fa-list"></i>
                                <p>
                                    Trámites
                                </p>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-12">
                            <h1>
                                {{ $route.meta.title }}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="container-fluid">
                    <router-view />
                </div>
            </section>
        </div>
        <footer class="main-footer">
            Dirección de Servicios al Comercio y a la Inversión
            <strong>
                <a
                    href="https://www.mineco.gob.gt"
                    target="_blank"
                >
                    Ministerio de Economía
                </a>
            </strong>
        </footer>
        <aside class="control-sidebar control-sidebar-dark">
            <div class="p-3">
                <h5>Personalizar app</h5>
                <hr class="mb-2">
                <div class="mb-4">
                    <input
                        id="setDarkMode"
                        type="checkbox"
                        value="1"
                        class="mr-1"
                        @click="setDarkMode"
                    >
                    <label for="setDarkMode">Modo Oscuro</label>
                </div>
                <h6>Encabezado</h6>
                <div class="mb-4">
                    <input
                        id="setLayoutFixed"
                        type="checkbox"
                        value="1"
                        class="mr-1"
                        @click="setLayoutFixed"
                    >
                    <label for="setLayoutFixed">Fixed</label>
                </div>
            </div>
        </aside>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
import Loader from "@/components/Loader.vue"

const store = useUserStore();
const APP_BRAND = import.meta.env.VITE_APP_BRAND
const router = useRouter();

const setDarkMode = (evt) => {
    if(evt.target.checked) {
        document.body.classList.add("dark-mode");
        localStorage.theme = 'dark'
        return
    }
    localStorage.theme = 'light'
    document.body.classList.remove("dark-mode");
}

const setLayoutFixed = (evt) => {
    if(evt.target.checked) {
        document.body.classList.add("layout-navbar-fixed");
        return
    }
    document.body.classList.remove("layout-navbar-fixed");
}

const logout = () => {
    store.logout();
    router.push({ name: 'welcome' });
}

onMounted(() => {
    document.body.classList.add("sidebar-mini", "layout-fixed", "layout-navbar-fixed");
    document.body.classList.remove('login-page')

    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.body.classList.add("dark-mode");
        document.getElementById("setDarkMode").checked = true
    } else {
        document.body.classList.remove("dark-mode");
    }
})
</script>
