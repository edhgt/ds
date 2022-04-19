<template>
    <div>
        <ValidationObserver
            v-slot="{ handleSubmit }"
            ref="form"
        >
            <form
                autocomplete="off"
                @submit.prevent="handleSubmit(onSubmit)"
            >
                <div
                    v-for="field in fields"
                    :key="field.id"
                    class="form-group"
                >
                    <ValidationProvider
                        v-slot="{ valid, errors }"
                        :name="field.id"
                        :rules="{ 'required': field.required }"
                    >
                        <span v-if="field.fieldType == 'FormField'">
                            <label :for="field.id">{{ field.name }}</label>
                            <input
                                :id="field.id"
                                v-model="field.value"
                                class="form-control"
                                :class="{ 'is-invalid': errors[0] ? true : (valid ? false : null) }"
                                :type="field.type"
                            >
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                        </span>
                        <span v-else>
                            <label :for="field.id">{{ field.name }}</label>
                            <select
                                :id="field.id"
                                v-model="field.value"
                                class="form-control"
                                :class="{ 'is-invalid': errors[0] ? true : (valid ? false : null) }"
                            >
                                <option
                                    v-for="op in field.options"
                                    :key="op.name"
                                    :value="op.name"
                                >
                                    {{ op.name }}
                                </option>
                            </select>
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                        </span>
                    </ValidationProvider>
                </div>
                <input
                    type="submit"
                    class="btn btn-primary"
                    value="Guardar"
                >
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, setInteractionMode, extend, localize } from 'vee-validate'
import es from 'vee-validate/dist/locale/es.json'
import { required } from 'vee-validate/dist/rules'

export default {
    components: { ValidationObserver, ValidationProvider },
    props: {
        fields: {
            required: true,
            type: Array
        }
    },
    created () {
        setInteractionMode('eager')
        extend('required', required)
        localize('es', es)
    },
    methods: {
        setFields () {
            this.$emit('set-fields', { ...this.fields })
        },
        onSubmit () {
            this.setFields()
        }
    }
}
</script>
