import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import Toast from "vue-toastification";
import router from "./router";

import "admin-lte/plugins/fontawesome-free/css/all.min.css";
import "admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css";
import "admin-lte/dist/css/adminlte.min.css";
import "vue-toastification/dist/index.css";

import "admin-lte/plugins/jquery/jquery.min.js";
import "admin-lte/plugins/bootstrap/js/bootstrap.min.js";
import "admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js";
import "admin-lte/dist/js/adminlte.js";

createApp(App).use(createPinia()).use(Toast).use(router).mount("#app");
