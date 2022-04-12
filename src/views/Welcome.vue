<template>
    <div>
        <nav
            id="mainNav"
            class="navbar navbar-light navbar-expand-lg fixed-top bg-light text-uppercase"
        >
            <div class="container">
                <a
                    class="navbar-brand js-scroll-trigger"
                    href="#page-top"
                >
                    Plataforma DISERCOMI</a><button
                        data-toggle="collapse"
                        data-target="#navbarResponsive"
                        class="navbar-toggler text-white bg-primary navbar-toggler-right text-uppercase rounded"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i class="fa fa-bars"></i>
                    </button>
                <div
                    id="navbarResponsive"
                    class="collapse navbar-collapse"
                >
                    <ul
                        v-if="store.user.email == null"
                        class="navbar-nav ml-auto"
                    >
                        <li class="nav-item mx-0 mx-lg-1">
                            <router-link
                                class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                                :to="{ name: 'register' }"
                            >
                                Registro de usuario
                            </router-link>
                        </li>
                        <li class="nav-item mx-0 mx-lg-1">
                            <router-link
                                class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                                :to="{ name: 'login' }"
                            >
                                Inicio de sesión
                            </router-link>
                        </li>
                    </ul>
                    <ul
                        v-else
                        class="navbar-nav ml-auto"
                    >
                        <li class="nav-item mx-0 mx-lg-1">
                            <router-link
                                class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                                :to="{ name: 'home' }"
                            >
                                Home
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <header class="text-center text-white bg-white masthead">
            <div class="container">
                <img
                    class="img-fluid d-block mx-auto mb-5"
                    src="../assets/logo-mineco-compressed.png"
                >
                <h1>
                    Simplificación de trámites
                </h1>
            </div>
        </header>
        <section
            v-if="store.user.email == null"
            id="decretos"
            class="page-section portfolio mx-auto"
        >
            <div class="container">
                <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">
                    DECRETOS
                </h2>
                <hr class="mb-5">
                <div class="row justify-content-center align-items-center">
                    <div class="col-md-6 col-lg-4">
                        <router-link :to="{ name: 'register', query: { decreto_id: 2, role_id: 2 } }">
                            <div class="card portfolio-item mx-auto">
                                <div class="card-body">
                                    <h4 class="card-title">
                                        65-89
                                    </h4>
                                    <p class="card-text">
                                        Ley de Zonas<br>Francas
                                    </p>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
        <footer class="text-center navbar-light bg-light p-5">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 mb-5 mb-lg-0">
                        <h4 class="text-uppercase mb-4">
                            UBICACIÓN
                        </h4>
                        <p>
                            8A Avenida 10-43, ciudad de Guatemala
                        </p>
                    </div>
                    <div class="col-md-4 mb-5 mb-lg-0">
                    </div>
                    <div class="col-md-4">
                        <h4 class="text-uppercase mb-4">
                            CONTACTO
                        </h4>
                        <p class="lead mb-0">
                            <span>+(502) 2412-0200<br>comunicacionsocial@mineco.gob.gt<br></span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
        <div class="d-lg-none scroll-to-top position-fixed rounded">
            <a
                class="text-center text-white d-block js-scroll-trigger rounded"
                href="#page-top"
            ><i class="fa fa-chevron-up"></i></a>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from "@/store/";
document.body.classList.remove('login-page')

const store = useUserStore();
</script>

<style scoped>
#mainNav {
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-weight: 700;
}
#mainNav .navbar-brand {
    color: rgb(0, 0, 0);
}
#mainNav .navbar-nav {
    margin-top: 1rem;
}
#mainNav .navbar-nav li.nav-item a.nav-link {
    color: rgb(5, 5, 5);
}
#mainNav .navbar-nav li.nav-item a.nav-link:hover {
    color: #1abc9c;
}
#mainNav .navbar-nav li.nav-item a.nav-link:active, #mainNav .navbar-nav li.nav-item a.nav-link:focus {
    color: rgb(3, 3, 3);
}
#mainNav .navbar-nav li.nav-item a.nav-link.active {
    color: #1abc9c;
}
#mainNav .navbar-toggler {
    font-size: 80%;
    padding: 0.8rem;
}
.page-section {
    padding: 6rem 0;
}
.page-section .page-section-heading {
    font-size: 2.25rem;
    line-height: 2rem;
}
@media (min-width: 992px) {
    .page-section .page-section-heading {
        font-size: 3rem;
        line-height: 2.5rem;
    }
}
.masthead {
    padding-top: calc(6rem + 74px);
    padding-bottom: 6rem;
}
.masthead .masthead-heading {
    font-size: 2.75rem;
    line-height: 2.75rem;
}
.masthead .masthead-subheading {
    font-size: 1.25rem;
}
.masthead .masthead-avatar {
    width: 15rem;
}

@media (min-width: 992px) {
    .masthead {
        padding-top: calc(6rem + 104px);
        padding-bottom: 6rem;
    }
    .masthead .masthead-heading {
        font-size: 4rem;
        line-height: 3.5rem;
    }
    .masthead .masthead-subheading {
        font-size: 1.5rem;
    }
}

.portfolio .portfolio-item {
    cursor: pointer;
    position: relative;
    display: block;
    max-width: 25rem;
    border-radius: 0.5rem;
    overflow: hidden;
}
.portfolio .portfolio-item .portfolio-item-caption {
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.2s ease-in-out;
    opacity: 0;
    background-color: rgba(26, 188, 156, 0.9);
}
.portfolio .portfolio-item .portfolio-item-caption:hover {
    opacity: 1;
}
.portfolio .portfolio-item .portfolio-item-caption .portfolio-item-caption-content {
    font-size: 1.5rem;
}

.portfolio-modal .btn-close {
    color: #1abc9c;
    font-size: 2rem;
    padding: 1rem;
}
.portfolio-modal .portfolio-modal-title {
    font-size: 2.25rem;
    line-height: 2rem;
}
@media (min-width: 992px) {
    .portfolio-modal .portfolio-modal-title {
        font-size: 3rem;
        line-height: 2.5rem;
    }
}
</style>