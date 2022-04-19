<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <router-link :to="{ name: 'tramites.seleccionar' }">
                            <i class="fas fa-plus-square"></i>
                            Nuevo trámite
                        </router-link>
                    </div>
                    <div class="card-tools">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <select
                                    v-model="per_page"
                                    class="form-control"
                                    @change="getList(tramites.first_page_url)"
                                >
                                    <option value="5">
                                        5
                                    </option>
                                    <option value="10">
                                        10
                                    </option>
                                    <option value="25">
                                        25
                                    </option>
                                    <option value="50">
                                        50
                                    </option>
                                </select>
                            </div>
                            <div class="input-group-prepend ml-2"></div>
                            <input
                                v-model="text"
                                class="form-control"
                                type="search"
                                placeholder="Buscar"
                            >
                        </div>
                    </div>
                </div>
                <div class="card-body table-responsive p-0 m-0">
                    <table class="table table-hover table-valign-middle table-bordered">
                        <thead>
                            <tr>
                                <th>Trámite</th>
                                <th>Estado</th>
                                <th class="text-right">
                                    <i
                                        class="fas fa-sync fa-lg"
                                        title="Actualizar listado"
                                        @click="getList(tramites.first_page_url)"
                                    ></i>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="tra in dataFilter"
                                :key="tra.id"
                            >
                                <td>
                                    {{ tra.tramite }}
                                </td>
                                <td>
                                    {{ tra.estado }}
                                </td>
                                <td class="text-right">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-12">
            <app-pagination
                :prev-page-url="tramites.prev_page_url"
                :next-page-url="tramites.next_page_url"
                @page="changePage"
            ></app-pagination>
        </div>
    </div>
</template>

<script>
import AppPagination from '@/components/Pagination.vue'
import axios from '@/config/axios.js'

export default {
    components: { AppPagination },
    data () {
        return {
            tramites: { data: [] },
            per_page: 5,
            text: ''
        }
    },
    computed: {
        dataFilter () {
            return this.tramites.data.filter(el => el.tramite.toLowerCase().includes(this.text.toLowerCase()))
        }
    },
    created () {
        this.$store.commit('setMessage', 'Obteniendo listado de trámites')
        axios.get('/api/v1/f/tramites', {
            params: {
                per_page: this.per_page
            }
        })
            .then(response => {
                this.tramites = response.data
            })
    },
    methods: {
        changePage (url) {
            this.getList(url)
        },
        getList (url) {
            axios.get(url, {
                params: {
                    per_page: this.per_page,
                    empresa_id: this.$store.state.user.empresa_id
                }
            })
                .then(response => {
                    this.tramites = response.data
                })
        }
    }
}
</script>
