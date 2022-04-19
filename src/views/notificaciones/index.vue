<template>
    <div>
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
                        :class="{ 'bg-secondary': not.read_at == null }"
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
                        <p class="lead mb-5">
                            <button
                                class="btn btn-primary"
                                @click="getList"
                            >
                                Actualizar
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/config/axios'

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
                    this.notificaciones.data.forEach(not => {
                        not.data = JSON.parse(not.data)
                    })
                })
        },
        markAsRead (evt) {
            const not = this.notificaciones.data[evt.target.dataset.index]
            axios.put('/api/v1/f/notificaciones/' + not.id)
                .then(response => {
                    not.read_at = response.data
                    this.$store.commit('decrementTotalNotificaciones')
                })
        }
    }
}
</script>
