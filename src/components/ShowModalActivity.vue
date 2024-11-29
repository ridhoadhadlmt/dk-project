<template>
    <div>
        <BModal v-model="show" hide-footer title="View Activity" class="v-modal-custom" size="xl">
            <BRow>
                <BCol md="12" class="mb-3">
                    <div>
                        <label for="">Judul <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" placeholder="Masukkan judul"
                            v-model="modelData.title" disabled>
                    </div>
                </BCol>
                <BRow class="mb-3">
                    <BCol md="4">
                        <div>
                            <label for="" class="form-label">Start Date<span class="text-danger">*</span></label>
                            <div class="input-group">
                                <flat-pickr v-model="modelData.startDate" class="form-control"
                                    id="date" placeholder="Pilih Tanggal" disabled=""></flat-pickr>
                            </div>
                        </div>
                    </BCol>
                    <BCol md="4">
                        <div>
                            <label for="" class="form-label">Due Date<span class="text-danger">*</span></label>
                            <div class="input-group">
                                <flat-pickr v-model="modelData.endDate" class="form-control"
                                    id="date" placeholder="Pilih Tanggal" disabled=""></flat-pickr>
                            </div>
                        </div>
                    </BCol>
                    <BCol md="4">
                        <div>
                            <label for="" class="form-label">Actual Finish Date</label>
                            <div class="input-group">
                                <flat-pickr v-model="modelData.actualFinishDate"
                                    class="form-control" id="date" placeholder="Pilih Tanggal" disabled=""></flat-pickr>
                            </div>
                        </div>
                    </BCol>
                </BRow>
                <BCol md="12" class="mb-3">
                    <div>
                        <label for="">Note </label>
                        <textarea type="text" class="form-control" placeholder="Masukkan note"
                            v-model="modelData.note" disabled=""></textarea>
                    </div>
                </BCol>

                <label for="" class="form-label">Line Items <span class="text-danger">*</span></label>
                <BRow class="mb-3" v-for="(item, index) in modelData.items" :key="index">

                    <BCol md="2">
                        <div>
                            <multiselect v-model="modelData.items[index].inventoryId"
                                :options="inventories" :searchable="false" placeholder="Pilih Inventory"
                                :allow-empty="false" value-prop="id" label="name" :disabled="true">
                                <template #singleLabel="{ option }"><strong>{{ option.name }}</strong></template>
                            </multiselect>
                        </div>
                    </BCol>
                    <BCol md="2">
                        <div>
                            <input type="text" class="form-control" placeholder="Masukkan Nama"
                                v-model="modelData.items[index].type" disabled>
                        </div>
                    </BCol>
                    <BCol md="2" class="pe-0">
                        <div>
                            <div class="input-group">
                                <input type="number" class="form-control" id="quantity" width="80%"
                                    placeholder="Quantity" required
                                    v-model="modelData.items[index].qty"
                                    @change="lineItemCalculate(index)">
                                <select id="" class="form-select" disabled="">
                                    <option selected>{{ modelData.items[index].unit }}</option>
                                </select>
                            </div>
                        </div>
                    </BCol>

                    <BCol md="6" class="p-0">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex align-items-center mx-2">
                                <i class="bx bx-x fs-22"></i>
                            </div>
                            <div>
                                <input type="number" class="form-control" placeholder="Rp 0"
                                    v-model="modelData.items[index].price" disabled>
                            </div>
                            <div class="d-flex align-items-center mx-2">
                                <i class="las la-equals fs-22"></i>
                            </div>
                            <div>
                                <input type="number" class="form-control" disabled placeholder="Rp 0"
                                    v-model="modelData.items[index].total">
                            </div>
                        </div>
                    </BCol>
                </BRow>
                <BCol md="12">
                    <div>
                        <label for="">Subtotal </label>
                        <input type="number" class="form-control" placeholder="Rp0" disabled
                            v-model="modelData.total">
                    </div>
                </BCol>
            </BRow>

            <div class="cta">   
                <div class="d-flex justify-content-end mt-4">
                    <BButton variant="light" class="me-2" @click="show = false">Tutup</BButton>
                </div>
            </div>
        </BModal>
    </div>

</template>
<script>

import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

export default {
    name: 'ShowModalActivity',
    components: {
        flatPickr,
        Multiselect
    },
    data() {
        return {
            show: this.showModal,
            modelData: this.data
        }
    },
    watch: {
        showModal(newVal) {
            console.log("ichsa", newVal);
            this.show = newVal;
        },
        show(newVal) {
            this.$emit('hideModalActivity', newVal);
        }
    },
    methods: {
        unselectAll() {
            this.modelHeaders.forEach(header => {
                header.show = false;
            });
        },
        selectAll() {
            this.modelHeaders.forEach(header => {
                header.show = true;
            });
        }
    },
    props: {
        data: {
            type: Array,
            required: true
        },
        inventories: {
            type: Array,
            required: true
        },
        showModal: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '',
        }
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