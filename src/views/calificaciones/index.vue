<template>
    <div class="row">
        <div class="col-12 mb-2">
            <a
                href="#"
                @click="router.back(1)"
            >
                <i class="fas fa-arrow-left fa-lg"></i>
                Volver
            </a>
        </div>
        <div class="col-12">
            <div class="invoice p-3 mb-3 text-center">
                <p>
                    <strong class="h1">
                        {{ state.tramite.name }}
                    </strong>
                    <small class="d-block text-muted h2">
                        {{ state.tramite.description }}
                    </small>
                    <small
                        v-show="state.tramite.processInstanceId != null"
                        class="d-block text-muted"
                    >
                        <span v-show="state.tramite.estado">
                            Estado:
                            <b>
                                {{ state.tramite.estado }}
                            </b>
                        </span>
                    </small>
                </p>
                <button
                    v-if="state.tramite.processInstanceId == null && $route.query.key != null"
                    class="btn btn-primary btn-lg"
                    @click="getProcessDefinition"
                >
                    Iniciar proceso de {{ state.tramite.name }}
                </button>
                <p

                    v-if="$route.query.key == null"
                    class="efecto-maquina text-danger text-lead justify h5"
                >
                    Trámite no disponible.
                </p>
            </div>
        </div>
        <div class="col-6 offset-md-3">
            <div
                v-if="state.form.hasOwnProperty('fields')"
                class="card"
            >
                <div class="card-header">
                    <h3
                        class="card-title"
                        :title="'versión ' + state.form.version"
                    >
                        {{ state.form.name }}
                    </h3>
                </div>
                <Form
                    @submit="completeTask"
                >
                    <div class="card-body">
                        <div
                            v-for="(field, index) in state.form.fields"
                            :key="field.id"
                            class="form-group"
                        >
                            <span v-if="field.type == 'spacer'">
                                <br>
                            </span>
                            <span v-else-if="field.type == 'horizontal-line'">
                                <hr>
                            </span>
                            <span v-else-if="field.type == 'headline'">
                                <h4 :for="field.id">
                                    <strong>
                                        {{ field.name }}
                                    </strong>
                                </h4>
                            </span>
                            <span v-else-if="field.type == 'headline-with-line'">
                                <h4 :for="field.id">
                                    <strong>
                                        {{ field.name }}
                                    </strong>
                                </h4>
                                <hr>
                            </span>
                            <span v-else-if="field.type == 'integer'">
                                <label :for="field.id">
                                    {{ field.name }}
                                    <small class="text-muted">
                                        {{ field.required ? '' : '(opcional)' }}
                                    </small>
                                </label>
                                <Field
                                    :id="field.id"
                                    v-model="field.value"
                                    :name="field.name.toLowerCase()"
                                    class="form-control"
                                    :placeholder="field.placeholder"
                                    type="number"
                                    step="1"
                                    :rules="{ integer: true, required: field.required }"
                                />
                                <ErrorMessage :name="field.name.toLowerCase()" />
                            </span>
                            <span v-else-if="field.type == 'decimal'">
                                <label :for="field.id">
                                    {{ field.name }}
                                    <small class="text-muted">
                                        {{ field.required ? '' : '(opcional)' }}
                                    </small>
                                </label>
                                <Field
                                    :id="field.id"
                                    v-model="field.value"
                                    :name="field.name.toLowerCase()"
                                    class="form-control"
                                    :placeholder="field.placeholder"
                                    type="number"
                                    step="0.01"
                                    :rules="{ regex: /^\d{1,}\.\d{1,2}$/, required: field.required }"
                                />
                                <ErrorMessage :name="field.name.toLowerCase()" />
                            </span>
                            <span v-else-if="field.type == 'boolean'">
                                <label
                                    :for="field.id"
                                >
                                    {{ field.name }}
                                </label>
                                <br>
                                <Field
                                    :id="field.id"
                                    v-model.boolean="field.value"
                                    :name="field.name.toLowerCase()"
                                    type="checkbox"
                                    :placeholder="field.placeholder"
                                    :value="true"
                                    :rules="{ required: field.required }"
                                />
                                <ErrorMessage
                                    :name="field.name.toLowerCase()"
                                    class="d-block"
                                />
                            </span>
                            <span v-else-if="field.type == 'dropdown' || field.type == 'radio-buttons'">
                                <label :for="field.id">
                                    {{ field.name }}
                                    <small class="text-muted">
                                        {{ field.required ? '' : '(opcional)' }}
                                    </small>
                                </label>
                                <Field
                                    :id="field.id"
                                    v-slot="{ value }"
                                    v-model="field.value"
                                    :name="field.name.toLowerCase()"
                                    as="select"
                                    class="form-control"
                                    :rules="{ required: field.required }"
                                >
                                    <option
                                        value=""
                                        disabled
                                    ></option>
                                    <option
                                        v-for="option in field.options"
                                        :key="option.name"
                                        :value="option.name"
                                        :selected="value"
                                    >
                                        {{ option.name }}
                                    </option>
                                </Field>
                                <ErrorMessage :name="field.name.toLowerCase()" />
                            </span>
                            <span v-else-if="field.type == 'hyperlink'">
                                <label :for="field.id">
                                    {{ field.name }}
                                    <a
                                        :href="field.params.hyperlinkUrl"
                                        target="_blank"
                                    >
                                        {{ field.params.hyperlinkUrl }}
                                    </a>
                                </label>
                            </span>
                            <span v-else-if="field.type == 'upload'">
                                <label>
                                    {{ field.name }}
                                    <small class="text-muted">
                                        {{ field.required ? '' : '(opcional)' }}
                                    </small>
                                    <span
                                        v-show="field.value != null"
                                        class="badge badge-success"
                                    >
                                        cargado en el sistema
                                    </span>
                                </label>
                                <br>
                                <Field
                                    v-slot="{ handleChange, handleBlur }"
                                    v-model="field.value"
                                    :name="field.name.toLowerCase()"
                                    as="file"
                                    :rules="{ required: field.required }"
                                    :data-index="index"
                                    @change="uploadFile"
                                >
                                    <input
                                        type="file"
                                        :data-index="index"
                                        :data-id="field.id"
                                        @change="handleChange"
                                        @blur="handleBlur"
                                    />
                                </Field>
                                <br>
                                <ErrorMessage
                                    style="color: #f23648;font-size: 14px;"
                                    :name="field.name.toLowerCase()"
                                />
                            </span>
                            <span v-else>
                                <label :for="field.id">
                                    {{ field.name }}
                                    <small class="text-muted">
                                        {{ field.required ? '' : '(opcional)' }}
                                    </small>
                                </label>
                                <Field
                                    :id="field.id"
                                    v-model="field.value"
                                    :name="field.name.toLowerCase()"
                                    class="form-control"
                                    :placeholder="field.placeholder"
                                    :type="field.type"
                                    :rules="{ required: field.required }"
                                />
                                <ErrorMessage :name="field.name.toLowerCase()" />
                            </span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button
                            type="submit"
                            class="btn btn-primary btn-lg btn-block"
                        >
                            Completar solicitud
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/";
import { useToast } from "vue-toastification";
import axios from "@/config/axios.js";
import { defineRule, Form, Field, ErrorMessage, configure } from "vee-validate";
import { integer, regex, required } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import es from '@vee-validate/i18n/dist/locale/es.json';

export default {
    components: {
        Field,
        Form,
        ErrorMessage,
    },
    props: {
        id: {
            required: false,
            type: String,
            default: null,
        },
    },
    setup(props) {
        
        const state = reactive({
            tramite: {},
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
                state.tramite = response.data

                if (state.tramite.estado_id === 2) {
                    toast.success('La empresa se encuentra calificada')
                    store.auth({
                        access_token: sessionStorage.getItem('access_token'),
                        user: {
                            ...JSON.parse(sessionStorage.getItem('user')),
                            calificada: 1,
                        },
                    })
                    router.push({ name: 'home' })
                } else {
                    getTasks()
                }
            })
            .catch(err => {
                toast.error(err.response.data.message || err.response.data)
            });
        const getProcessDefinition = () => {
            axios.get('/api/v1/f/process-definitions', {
                params: { key: state.tramite.key }
            })
                .then(response => {
                    state.tramite.processDefinitionId = response.data.id
                    startProcess()
                })
                .catch(err => toast.error(err.response.data.message || err.response.data))
        };
        const startProcess = () => {
            axios.post('/api/v1/f/start-process', {
                processDefinitionId: state.tramite.processDefinitionId,
                description: `${state.tramite.name} - ${store.user.name}`,
                empresa_id: store.user.empresa_id,
                tramite_id: state.tramite.id,
                nit: store.user.nit
            })
                .then(response => {
                    state.tramite.processInstanceId = response.data.id
                    state.tramite.estado = "En ingreso"
                    state.tramite.estado_id = 3
                    getTasks()
                })
                .catch(err => toast.error(err.response.data.message || err.response.data))
        };
        const getTasks = () => {
            axios.get('/api/v1/f/tasks', {
                params: {
                    processInstanceId: state.tramite.processInstanceId,
                    nit: store.user.nit
                }
            })
                .then((response) => {
                    if (response.data.data.length !== 0) {
                        state.tramite.taskId = response.data.data[0].id
                        getFormDefinitions()
                    }
                })
                .catch(err => toast.error(err.response.data.message || err.response.data))
        };
        const getFormDefinitions = () => {
            axios.get('/api/v1/f/tasks/' + state.tramite.taskId + '/form', {
                params: {
                    nit: store.user.nit
                }
            })
                .then(response => {
                    state.form = response.data
                    getFilesLocal()
                })
                .catch(err => toast.error(err.response.data.message || err.response.data))
        };
        const getFilesLocal = () => {
            axios.get('/api/v1/f/tasks/files/saves', {
                params: {
                    processInstanceId: state.tramite.processInstanceId,
                    taskId: state.tramite.taskId,
                },
            })
                .then((response) => {
                    if (response.data.length > 0) {
                        response.data.forEach((fileSaved) => {
                            const index = state.form.fields.findIndex((field) => field.id == fileSaved.identification)
                            state.form.fields[index] = {
                                ...state.form.fields[index],
                                value: fileSaved.value,
                                value2: fileSaved.value,
                                id2: fileSaved.id,
                            }
                        })
                    }
                })
                .catch((error) => toast.error(error.response.data.message || error.response.data))
        };
        const completeTask = () => {
            axios.post('/api/v1/f/tasks/' + state.tramite.taskId + '/complete', {
                processInstanceId: state.tramite.processInstanceId,
                formId: state.form.id,
                taskId: state.tramite.taskId,
                properties: [...state.form.fields],
                nit: store.user.nit
            })
                .then(() => {
                    state.tramite.estado = 'Verificación y Revisión de Solicitud'
                    state.tramite.estado_id = 4
                    state.form = {}
                    toast.success("Su expediente fue enviado a Verificación y Revisión")
                })
                .catch((error) => {
                    toast.error(error.response.data.message || error.response.data, { timeout: false })
                })
        };

        defineRule('integer', integer);
        defineRule('regex', regex);
        defineRule('required', required);
        configure({
            generateMessage: localize('es', es),
        });

        const uploadFile = (evt) => {
            const form = new FormData()
            let field = state.form.fields[evt.target.dataset.index];

            if(field.value2 != null || field.value2 != undefined) {
                form.append('value', field.value2)
                form.append('id2', field.id2)
            }
            form.append('id', evt.target.dataset.id)
            form.append('nit', store.user.nit)
            form.append('file', evt.target.files[0])
            form.append('name', evt.target.files[0].name)
            form.append('mimeType', evt.target.files[0].type)
            form.append('createdBy', store.user.nit)
            form.append('field', 'file')
            //form.append('contentStoreName', 'file')
            form.append('processInstanceId', state.tramite.processInstanceId)
            axios.post('/api/v1/f/tasks/' + state.tramite.taskId + '/upload-content-items', form)
                .then((response) => {
                    state.form.fields[evt.target.dataset.index] = {
                        ...field,
                        value: response.data.flowable.id,
                        value2: response.data.flowable.id,
                        id2: response.data.id,
                    }
                })
        };

        return {
            state,
            store,
            toast,
            router,
            getProcessDefinition,
            startProcess,
            getTasks,
            getFormDefinitions,
            getFilesLocal,
            completeTask,
            uploadFile,
        };
    },
}
</script>

<style scoped>
input + span {
  color: #f23648;
  font-size: 14px;
}
select + span {
  color: #f23648;
  font-size: 14px;
}
p.efecto-maquina {
    font-family: monospace;
    white-space: nowrap;
    width: 22ch;
    animation: typing 2s steps(22), blink .5s infinite step-end alternate;
    overflow: hidden;
}
@keyframes typing {
    from { width: 0 }
}

@keyframes blink {
    50% { border-color: transparent;}
}
</style>
