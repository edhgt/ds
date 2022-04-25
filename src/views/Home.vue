<template>
    <div>
        <div
            v-if="store.isQualified"
            class="row"
        >
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <p>
                            Sesión iniciada
                            <i class="fas fa-circle text-success"></i>
                            <b class="ml-2">{{ store.user.name }}</b>
                            <span class="ml-1 text-muted">({{ store.user.email }})</span>
                        </p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        ¿Desea realizar un nuevo trámite?
                        <router-link :to="{ name: 'tramites.index' }">
                            Haga clic aquí
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-else
            class="row"
        >
            <div class="col-12">
                <blockquote class="quote-info">
                    <h4>Empresa no calificada</h4>
                    <p>Haga clic en el siguiente enlace para solicitar una calificación.</p>
                    <router-link :to="{ name: 'calificacion.index', query: { key: 'calificacion' }}">
                        Solicitar calificación
                    </router-link>
                </blockquote>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/store";
import { useToast } from "vue-toastification";
import axios from "@/config/axios.js";

const store = useUserStore();
const toast = useToast();

onMounted(() => {
    if(store.isVerified && !store.isQualified) {
        toast.info("Empresa no calificada", {
            position: "bottom-right",
            timeout: false,
        });
    }

    axios
        .get('/api/v1/f/notificaciones', { params: { count: true } })
        .then(response => {
            store.notificationCounter = response.data
            if(store.notificationCounter > 0) {
                toast.info(`Tiene ${store.notificationCounter} ${store.notificationCounter > 1 ? 'notificaciones': 'notificación'} sin leer`, {
                    position: "bottom-right"
                });
            }
        })
});

</script>
