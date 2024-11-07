<template>  
    <div>
        <BModal v-model="show" hide-footer title="Tampilkan Kolom" class="v-modal-custom" size="sm">
            
            <BFormGroup class="form-check-success mb-3" v-for="(header,index) in headers" :key="header.key">
                <BFormCheckbox v-model="modelHeaders[index].show" :id="header.title">{{ header.title }}</BFormCheckbox>
            </BFormGroup>

            <div class="modal-footer v-modal-footer d-flex justify-content-between">
                <BButton variant="link" class="text-muted" @click="unselectAll">Unselect All</BButton>

                <BButton variant="link" @click="selectAll">Select All</BButton>
            </div>
        </BModal>
    </div>

</template>
<script>
export default {
    name: 'SelectHeader',
    data() {
        return {
            show:this.showModal,
            modelHeaders: this.headers
        }
    },
    watch: {
        showModal(newVal) {
            this.show = newVal;
        },
        show(newVal) {
            this.$emit('hideModal', newVal);
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
        headers: {
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