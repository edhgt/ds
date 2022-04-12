<template>
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
                        <i class="fas fa-circle text-success"></i>
                        {{ store.user.name }} ({{ store.user.email }})
                    </span>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a
                        class="nav-link"
                        href="#"
                        role="button"
                    >
                        <i class="far fa-bell" />
                    </a>
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link"
                        data-widget="fullscreen"
                        href="#"
                        role="button"
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
                    >
                        <i class="fas fa-th-large" />
                    </a>
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link"
                        href="#"
                        @click="store.logout()"
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
                    style="opacity: .8"
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
                        <a
                            class="d-block"
                            href="#"
                        >
                            {{ store.user.nit }}
                        </a>
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
                    </ul>
                </nav>
            </div>
        </aside>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <h1 class="m-0">
                            {{ $route.meta.title }}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <footer class="main-footer">
            <strong>
                <a
                    href="https://www.mineco.gob.gt"
                    target="_blank"
                >
                    Ministerio de Economía
                </a>
            </strong>
            Dirección de Servicios al Comercio y a la Inversión
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
import { useUserStore } from "@/store";

const store = useUserStore();
const APP_BRAND = import.meta.env.VITE_APP_BRAND

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
