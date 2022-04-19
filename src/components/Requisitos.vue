<template>
    <div class="row">
        <div
            v-for="field in fields"
            :key="field.id"
            class="col-12 col-sm-6 col-md-6 d-flex align-items-stretch flex-column"
        >
            <div class="card bg-light d-flex flex-fill">
                <div class="card-body">
                    <span class="font-weight-bold">{{ field.name }}</span>
                    <br>
                    <span
                        v-if="field.value"
                        class="badge badge-success"
                    >
                        Cargado
                    </span>
                </div>
                <div
                    v-if="field.value == null || estadoId == 3"
                    class="card-footer"
                >
                    <input
                        accept="application/pdf"
                        type="file"
                        :data-id="field.id"
                        @change="uploadContent"
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/config/axios.js'

export default {
    props: {
        estadoId: {
            required: false,
            type: String,
            default: null
        },
        taskId: {
            required: true,
            type: String
        },
        processInstanceId: {
            required: true,
            type: String
        },
        fields: {
            required: true,
            type: Array
        }
    },
    methods: {
        uploadContent (evt) {
            const form = new FormData()
            form.append('id', evt.target.dataset.id)
            form.append('nit', this.$store.state.user.nit)
            form.append('file', evt.target.files[0])
            form.append('name', evt.target.files[0].name)
            form.append('mimeType', evt.target.files[0].type)
            form.append('createdBy', this.$store.state.user.nit)
            form.append('field', 'file')
            form.append('contentStoreName', 'file')
            form.append('processInstanceId', this.processInstanceId)
            axios.post('/api/v1/f/tasks/' + this.taskId + '/upload-content-items', form)
                .then(response => {
                    this.$emit('set-file', {
                        id: evt.target.dataset.id,
                        value: response.data.id
                    })
                })
        }
    }
}
</script>
