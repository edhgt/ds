<template>
    <div>
        <div
            v-if="!store.isVerified"
            class="row"
        >
            <div class="col-12">
                <blockquote class="quote-warning">
                    <h4>Su cuenta no ha sido verificada</h4>
                    <p>Haga clic en el siguiente enlace para solicitar una calificación.</p>
                </blockquote>
            </div>
        </div>
        <div
            v-else-if="!store.isQualified"
            class="row"
        >
            <div class="col-12">
                <blockquote class="quote-info">
                    <h4>Empresa no calificada</h4>
                    <p>Haga clic en el siguiente enlace para solicitar una calificación.</p>
                    <router-link :to="{ name: 'calificacion.index' }">
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

const store = useUserStore();
const toast = useToast();

onMounted(() => {
    if(store.isVerified && !store.isQualified) {
        toast.info("Empresa no calificada", {
            position: "bottom-right",
        });
    }
});

</script>
