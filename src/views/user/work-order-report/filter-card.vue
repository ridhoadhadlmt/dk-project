<template>
    <div>
        <BModal v-model="show" hide-footer title="Filter" class="v-modal-custom" size="md">
            <BForm @submit.prevent="filterData" @reset.prevent="resetFilter">
                <BFormGroup label="Type Fleet" class="mb-3">
                    <Multiselect 
                        v-model="params.type" 
                        :options="fleets" 
                        class="form-control" 
                        placeholder="Pilih Type"
                        label="name"
                        value-prop="id"
                    />
                </BFormGroup>
                <BFormGroup label="Jenis WO" class="mb-2">
                    <multiselect 
                        v-model="params.wo_type" 
                        :options="woTypes" 
                        :searchable="false"
                        placeholder="Pilih Jenis WO" 
                        :allow-empty="false" 
                        value-prop="id"
                        label="name"
                    >
                    </multiselect>
                </BFormGroup>

                <!-- Periodic WO -->
                <BFormGroup label="Periodic WO" class="mb-3">
                    <multiselect 
                        v-model="params.periodic" 
                        :options="periodics" 
                        :searchable="false"
                        placeholder="Pilih Periodic WO" 
                        :allow-empty="false" 
                        value-prop="value"
                        label="text"
                    />
                </BFormGroup>

                <!-- Category -->
                <BFormGroup label="Category" class="mb-3">
                    <BFormInput v-model="params.category" />
                </BFormGroup>

                <!-- Prioritas -->
                <BFormGroup label="Prioritas" class="mb-3"> 
                    <multiselect 
                        v-model="params.priority" 
                        :options="priority" 
                        :searchable="false"
                        placeholder="Pilih Prioritas" 
                        :allow-empty="false" 
                        value-prop="value"
                        label="text"
                    />
                </BFormGroup>

                <!-- Tanggal Mulai -->
                <BFormGroup label="Tanggal Mulai" class="mb-3">
                    <!-- Dibagi dua input -->
                    <div class="d-flex gap-3">
                        <flat-pickr 
                            v-model="startedAt.start" 
                            class="form-control" 
                            id="date"
                            placeholder="Pilih Tanggal" 
                            required
                        />
                        <div class="fs-22">
                            -
                        </div>
                        <flat-pickr 
                            v-model="startedAt.end" 
                            class="form-control" 
                            id="date"
                            placeholder="Pilih Tanggal" 
                            required
                        />
                    </div>
                </BFormGroup>

                <BFormGroup label="Tanggal Target Selesai" class="mb-3">
                    <!-- Dibagi dua input -->
                    <div class="d-flex gap-3">
                        <flat-pickr 
                            v-model="targetDate.start" 
                            class="form-control" 
                            id="date"
                            placeholder="Pilih Tanggal" 
                            required
                        />
                        <div class="fs-22">
                            -
                        </div>
                        <flat-pickr 
                            v-model="targetDate.end" 
                            class="form-control" 
                            id="date"
                            placeholder="Pilih Tanggal" 
                            required
                        />
                    </div>
                </BFormGroup>

                <BFormGroup label="Tanggal Actual Selesai" class="mb-3">
                    <!-- Dibagi dua input -->
                    <div class="d-flex gap-3">
                        <flat-pickr 
                            v-model="date.start" 
                            class="form-control" 
                            id="date"
                            placeholder="Pilih Tanggal" 
                            required
                        />
                        <div class="fs-22">
                            -
                        </div>
                        <flat-pickr 
                            v-model="date.end" 
                            class="form-control" 
                            id="date"
                            placeholder="Pilih Tanggal" 
                            required
                        />
                    </div>
                </BFormGroup>

                <!-- Status -->
                <BFormGroup label="Status" class="mb-3">
                    <multiselect 
                        v-model="params.status" 
                        :options="status" 
                        :searchable="false"
                        placeholder="Pilih Status" 
                        :allow-empty="false" 
                        value-prop="value"
                        label="text"
                    />
                </BFormGroup>

                <div class="d-flex justify-content-end mt-4">
                    <BButton variant="light" class="me-2" type="reset">Reset Filter</BButton>
                    <BButton variant="dark" class="me-2" type="submit">Filter</BButton>
                </div>
            </BForm>
        </BModal>
    </div>

</template>
<script>

import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
    name: 'FilterCard',
    components: {
        Multiselect,
        flatPickr
    },
    data() {
        return {
            show: this.showModal,
            fleets: [],
            startedAt:{
                start: null,
                end: null
            },
            targetDate:{
                start: null,
                end: null
            },
            date: {
                start: null,
                end: null
            },
            params: {
                type: null,
                wo_type: null,
                periodic: null,
                category: null,
                startedAt: null,
                targetedAt: null,
                date: null
            },
            woTypes: [
                { id: 1, name: 'Perbaikan' },
                { id: 2, name: 'Perawatan' },
                { id: 3, name: 'Penambahan' },
            ],
            periodics: [
                { value: 'short_term', text: 'Short Term' },
                { value: 'long_term', text: 'Long Term' },
            ],
            priority: [
                { value: 'critical', text: 'Critical' },
                { value: 'high', text: 'High' },
                { value: 'medium', text: 'Medium' },
                { value: 'low', text: 'Low' },
                { value: 'no_priority', text: 'No Priority' },
            ],
            status:[
                { value: 'draft', text: 'Draft' },
                { value: 'in_progress', text: 'In Progress' },
                { value: 'pending', text: 'Pending' },
                { value: 'completed', text: 'Completed' },
            ]
        }
    },
    watch: {
        showModal(newVal) {
            this.show = newVal;
        },
        show(newVal) {
            console.log("show", newVal);
            this.$emit('hideModalFilter', newVal);
        },
        startedAt: {
            handler() {
                this.params.startedAt = `between:${this.startedAt.start},${this.startedAt.end}`;
            },
            deep: true
        },
        targetDate: {
            handler() {
                this.params.targetedAt = `between:${this.targetDate.start},${this.targetDate.end}`;
            },
            deep: true
        },
        date: {
            handler() {
                this.params.date = `between:${this.date.start},${this.date.end}`;
            },
            deep: true
        }
        
    },
    methods: {
        fetchDataFleet() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/fleets').then((res) => {
                this.fleets = res.data.data.items;
            }).catch((error) => {
                console.log(error);
            });
        },
        filterData() {
            this.show = false;
            this.$emit('setFilterData', this.params);
        },
        resetFilter() {
            this.params = {};
            this.show = false;
            this.$emit('resetFilter', this.params);
        }
    },
    props: {
        showModal: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.fetchDataFleet();
    }
}
</script>
<style>
/* .modal-body{
        overflow-y: scroll;
        max-height: 580px;
    }
    .modal-body::-webkit-scrollbar-track{
        display: none;
    } */
/* .form-check-input{
        width: 0px;
        height: 0px;
    } */
</style>