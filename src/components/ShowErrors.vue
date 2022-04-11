<template>
    <div class="invalid-feedback">
        <ul class="list-unstyled m-0">
            <li
                v-for="error in errors"
                :key="error"
                class="text-danger"
            >
                {{ error }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { toRefs, defineProps } from "vue";
const props = defineProps({
    errors: {
        required: false,
        type: Array,
        default: () => [],
    }
})

const { errors } = toRefs(props);
</script>
