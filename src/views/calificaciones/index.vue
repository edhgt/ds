<template>
    <div class="row">
        <div class="col-6 offset-md-3" >
            <div class="invoice p-3 mb-3">
                <h4>
                    Tramite:
                    <b>
                        {{ tramite.name }}
                    </b>
                    <small class="float-right">
                        Estado:
                        <b>
                            {{ tramite.estado }}
                        </b>
                    </small>
                </h4>
            </div>
            <div
                v-if="tramite.processInstanceId == null"
                class="card"
            >
                <div class="card-body">
                    <button
                        class="btn btn-primary mt-4"
                        @click="getProcessDefinition"
                    >
                        Iniciar proceso de calificación
                    </button>
                </div>
            </div>
            <div
                v-else-if="tramite.processInstanceId != null && tramite.estado_id == 3"
                class="card"
            >
                <div class="card-body">
                    <h5>
                        {{ state.form.name }}
                        <small>
                            (versión {{ state.form.version }})
                        </small>
                    </h5>
                    <div
                        v-for="field in state.form.fields"
                        :key="field.id"
                        class="form-group"
                    >
                        <span v-if="field.fieldType == 'FormField'">
                            <label :for="field.id">{{ field.name }}</label>
                            <input
                                :id="field.id"
                                :name="field.id"
                                :placeholder="field.placeholder"
                                v-model="field.value"
                                class="form-control"
                                :type="field.type"
                            >
                        </span>
                        <span v-else>
                            <label :for="field.id">{{ field.name }}</label>
                            <select
                                :id="field.id"
                                v-model="field.value"
                                :name="field.name"
                                class="form-control"
                            >
                                <option
                                    v-for="op in field.options"
                                    :key="op.name"
                                    :value="op.name"
                                >
                                    {{ op.name }}
                                </option>
                            </select>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from '@/config/axios.js';
import { useUserStore } from "@/store/";
import { useToast } from "vue-toastification";

const props = defineProps({
    id: {
        required: false,
        type: Number,
        default: null
    }
})

const tramite = reactive({
    id: null,
    name: null,
    description: null,
    key: null,
    processInstanceId: null,
    estado_id: null,
    estado: null
});
const state = reactive({
    form: {}
});
const store = useUserStore();
const toast = useToast();
const router = useRouter();

axios.get(import.meta.env.VITE_API_ENDPOINT + (props.id != null ? `/api/v1/f/tramites/${props.id}` : '/api/v1/f/calificaciones'), {
    params: {
        decreto_id: store.user.decreto_id
    }
})
.then((response) => {
    tramite.id = response.data.id
    tramite.name = response.data.name
    tramite.description = response.data.description
    tramite.key = response.data.key
    tramite.processInstanceId = response.data.processInstanceId
    tramite.estado_id = response.data.estado_id
    tramite.estado = response.data.estado

    if (tramite.estado_id === 2) {
        toast.success('La empresa se encuentra calificada')
        store.auth({
            access_token: store.user.access_token,
            user: {
                ...store.user,
                calificada: 1,
            },
        })
        router.push({ name: 'home' })
    }
    if(tramite.processInstanceId != null) {
        getTasks('active')
    }
})
.catch(err => {
    toast.error(err.response.data.message || err.response.data)
})

const getProcessDefinition = () => {
    axios.get('/api/v1/f/process-definitions', {
        params: { key: tramite.key }
    })
    .then(response => {
        tramite.processDefinitionId = response.data.id
        startProcess()
    })
    .catch(err => toast.error(err.response.data.message || err.response.data))
};
const startProcess = () => {
    axios.post('/api/v1/f/start-process', {
        processDefinitionId: tramite.processDefinitionId,
        description: `${tramite.name} - ${store.user.name}`,
        empresa_id: store.user.empresa_id,
        tramite_id: tramite.id,
        nit: store.user.nit
    })
    .then(response => {
        tramite.processInstanceId = response.data.id
        tramite.estado_id = 3
        getTasks()
    })
    .catch(err => toast.error(err.response.data.message || err.response.data))
};
const getTasks = () => {
    axios.get('/api/v1/f/tasks', {
        params: {
            processInstanceId: tramite.processInstanceId,
            nit: store.user.nit
        }
    })
    .then((response) => {
        if (response.data.data.length !== 0) {
            tramite.taskId = response.data.data[0].id
            getFormDefinitions()
        }
    })
    .catch(err => toast.error(err.response.data.message || err.response.data))
};
const getFormDefinitions = () => {
    axios.get('/api/v1/f/tasks/' + tramite.taskId + '/form', {
        params: {
            nit: store.user.nit
        }
    })
    .then(response => {
        state.form = response.data
        //getFilesLocal()
    })
    .catch(err => toast.error(err.response.data.message || err.response.data))
};
const getFilesLocal = () => {
    axios.get('/api/v1/f/tasks/' + tramite.taskId + '/files')
        .then(response => {
            if (response.data.length > 0) {
                response.data.forEach(r => {
                    const index = requirements.findIndex(re => re.id === r.identification)
                    requirements[index].value = r.value
                })
            }
        })
        .catch(err => toast.error(err.response.data.message || err.response.data))
};
const setFile = (file) => {
    const index = form.fields.findIndex(f => f.id === file.id)
    form.fields[index].value = file.value
};

const completeTask = () => {
    axios.post('/api/v1/f/tasks/' + tramite.taskId + '/complete', {
        processInstanceId: tramite.processInstanceId,
        formId: form.id,
        taskId: tramite.taskId,
        properties: [...form.fields],
        nit: store.user.nit
    })
    .then(() => {
        tramite.estado = 'En proceso'
        tramite.estado_id = 4
    })
    .catch((error) => {
        toast.error(error.response.data.message || error.response.data, { timeout: false })
    })
};

const onComplete = () => {
    completeTask()
};




</script>
