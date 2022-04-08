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
                <span class="brand-text font-weight-light">50535749</span>
            </a>
            <div class="sidebar">
                <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div class="image">
                        <img
                            src="@/assets/logo.png"
                            class="img-circle elevation-2"
                            alt="User Image"
                        />
                    </div>
                    <div class="info">
                        <a
                            class="d-block"
                            href="#"
                        >
                            Alexander Pierce
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
                            <a
                                href="#"
                                class="nav-link"
                            >
                                <i class="nav-icon fas fa-home"></i>
                                <p>
                                    Home
                                </p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
        <div class="content-wrapper"></div>
        <footer class="main-footer"></footer>
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
document.body.classList.add("sidebar-mini", "layout-navbar-fixed");

const setDarkMode = (evt) => {
    if(evt.target.checked) {
        document.body.classList.add("dark-mode");
        return
    }
    document.body.classList.remove("dark-mode");
}

const setLayoutFixed = (evt) => {
    if(evt.target.checked) {
        document.body.classList.add("layout-fixed");
        return
    }
    document.body.classList.remove("layout-fixed");
}
</script>
