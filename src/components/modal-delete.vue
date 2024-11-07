<template>  
    <div>
        <BModal v-model="showDelete" hide-footer hide-header-close centered  class="v-modal-custom" size="sm">
            
            <div class="text-center">
                <b class="fs-14">Apakah anda yakin menghapus data ini?</b>
                <div class="d-flex justify-content-center mt-4">
                    <BButton variant="dark" class="me-2">Tidak</BButton>
                    <BButton variant="light" @click="deleteData">Ya</BButton>
                </div>
            </div>
        </BModal>
    </div>

</template>
<script>
export default {
    name: 'ModalDelete',
    data() {
        return {
            showDelete:this.showModalDelete
        }
    },
    watch: {
        showModalDelete(newVal) {
            this.showDelete = newVal;
        },
        showDelete(newVal) {
            this.$emit('hideModalDelete', newVal);
        }
    },
    props: {
        showModalDelete: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        deleteData() {
            this.$emit('deleteData');
        }
    }
}
</script>   