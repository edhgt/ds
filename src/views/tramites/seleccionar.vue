<template>
    <div class="row">
        <div class="col-12">
            <div class="form-group">
                <input
                    id="q"
                    v-model="q"
                    autofocus
                    class="form-control form-control-lg"
                    type="search"
                    placeholder="Buscar trámite"
                >
                <small
                    v-show="search.length == 0"
                    id="qHelpBlock"
                    class="form-text text-muted"
                >
                    No hay trámites que coincidan con: <b>{{ q }}</b>
                </small>
            </div>
        </div>
        <div
            v-for="tramite in search"
            :key="tramite.id"
            class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column"
            @click="getProcessDefinition(tramite.id, tramite.key)"
        >
            <div class="card d-flex flex-fill">
                <div class="card-body">
                    <p class="text-lead text-justify">
                        {{ tramite.name }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/config/axios.js'
export default {
    data () {
        return {
            tramites: [],
            errors: [],
            q: ''
        }
    },
    computed: {
        search () {
            return this.tramites.filter(tramite => tramite.name.toLowerCase().includes(this.q.toLowerCase()))
        }
    },
    created () {
        axios.get('/api/v1/f/tramites', { params: { decreto_id: this.$store.user.decreto_id } })
            .then(response => {
                this.tramites = response.data
            })
    },
    methods: {
        getProcessDefinition (id, key) {
            this.$router.push({ name: 'tramites.create', params: { id }, query: { key } })
        }
    }
}
</script>

<style scoped>
.card:hover {
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
  background: #007bff;
  color: white;
  transform: scale(1.01);
  cursor: pointer;
}
</style>
