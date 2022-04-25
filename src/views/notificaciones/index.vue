<template>
    <div>
        <div class="row">
            <div class="col-12 mb-2">
                <a
                    href="#"
                    role="button"
                    @click="getList"
                >
                    <i class="fas fa-sync"></i>
                    Actualizar
                </a>
            </div>
        </div>
        <div
            v-if="notificaciones.data.length > 0"
            class="row"
        >
            <div class="col-12">
                <div
                    v-for="(not, index) in notificaciones.data"
                    :key="not.id"
                    class="card"
                >
                    <div
                        class="card-body"
                        :class="{ 'bg-gray disabled color-palette': not.read_at == null }"
                    >
                        <h5 class="card-title">
                            {{ not.data.title }}
                        </h5>
                        <span class="float-right">{{ not.created_at }}</span>
                        <p
                            v-if="not.read_at"
                            class="card-text"
                        >
                            {{ not.data.body }}
                        </p>
                        <p v-else>
                            <br>
                            <button
                                class="btn btn-sm btn-primary"
                                :data-index="index"
                                @click="markAsRead"
                            >
                                Leer...
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-else
            class="card"
        >
            <div class="card-body">
                <div class="col-12 text-center d-flex align-items-center justify-content-center">
                    <div class="">
                        <h4>
                            <i class="fas fa-bell-slash"></i>
                            No hay notificaciones en este momento
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/config/axios'
import { useUserStore } from "@/store";

const store = useUserStore();

export default {
    filters: {
        toJson (str) {
            return JSON.parse(str)
        }
    },
    data () {
        return {
            notificaciones: { data: [] }
        }
    },
    created () {
        this.getList()
    },
    methods: {
        getList () {
            axios.get('/api/v1/f/notificaciones')
                .then(response => {
                    this.notificaciones = response.data
                    store.notificationCounter = 0
                    this.notificaciones.data.forEach(notification => {
                        if (notification.read_at == null) {
                            store.notificationCounter++
                        }
                        notification.data = JSON.parse(notification.data)
                    })
                })
        },
        markAsRead (evt) {
            const notification = this.notificaciones.data[evt.target.dataset.index]
            axios.put('/api/v1/f/notificaciones/' + notification.id)
                .then(response => {
                    notification.read_at = response.data
                    store.notificationCounter--
                })
        }
    }
}
</script>
