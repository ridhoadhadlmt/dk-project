<template>  
    <div>
        <BModal v-model="showView" hide-footer hide-header-close centered  class="v-modal-custom" size="lg" title="View Audit Log">
            <BRow class="gy-4">
                <BCol md="6">
                    <div>
                        <label for="tanggal-waktu" class="form-label">Tanggal & Waktu</label>
                        <input type="text" class="form-control" id="tanggal-waktu">
                    </div>
                </BCol>
                <BCol md="6">
                    <div>
                        <label for="aksi" class="form-label">Aksi</label>
                        <input type="text" class="form-control" id="aksi">
                    </div>
                </BCol>
                <BCol md="6">
                    <div>
                        <label for="admin" class="form-label">Admin</label>
                        <input type="text" class="form-control" id="admin">
                    </div>
                </BCol>
                <BCol md="6">
                    <div>
                        <label for="sebelum-perubahan" class="form-label">Sebelum Perubahan</label>
                        <input type="text" class="form-control" id="sebelum-perubahan">
                    </div>
                </BCol>
                <BCol md="6">
                    <div>
                        <label for="setelah-perubahan" class="form-label">Setelah Perubahan</label>
                        <input type="text" class="form-control" id="setelah-perubahan">
                    </div>
                </BCol>
                
            </BRow>
        </BModal>
    </div>

</template>
<script>
export default {
    name: 'ModalView',
    data() {
        return {
            showView:this.showModalView
        }
    },
    watch: {
        showModalView(newVal) {
            this.showView = newVal;
        },
        showView(newVal) {
            this.$emit('hideModalView', newVal);
        }
    },
    props: {
        showModalView: {
            type: Boolean,
            default: false
        }
    }
}
</script>   