<template>
    <div>
        <div class="table-responsive">
            <table class="table align-middle table-nowrap mb-0">
                <thead>
                    <tr>
                        <template v-for="(header, i) in headers" :key="`${header.title}${i}`">
                            <th scope="col" v-if="header.show" class="">
                                <div class="d-flex justify-content-between align-items-center cursor-pointer" v-on:click="sort(header.key)">
                                    {{ header.title }}
                                    <i class="bx bx-sort-alt-2" v-if="header.order" ></i>
                                </div>
                            </th>
                        </template>
                        <slot name="header"></slot>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(entity, index) in data" :key="`entity-${entity.name}`">
                        <template v-for="(field, idx) in headers" :key="idx">
                            <td v-if="field.show">
                                <span v-if="!hasNamedSlot(field.key)" :item="entity">
                                    {{ getNestedValue(entity, field.key) }}
                                </span>
                                <slot v-else :name="field.key" :item="entity" :index="index" />
                            </td>
                        </template>
                        <slot name="body" :item="entity"></slot>
                    </tr>
                </tbody>
            </table>
        </div>
        <slot name="pagination"></slot>
    </div>
</template>

<script>
export default {
    name: 'Table',
    props: {
        headers: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            required: true
        }
    },
    methods: {
        sort(sortBy, sortOrder) {
            this.$emit('sort', { sortBy, sortOrder });
        },
        hasNamedSlot(key) {
            return this.$slots[key]
        },
        getNestedValue(obj, key) {
            return key.split('.').reduce((o, i) => (o ? o[i] : null), obj);
        }
    }
}
</script>