<script>
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
    name: 'fleet-management-cost-history-create',
    components: {
        Layout,
    },
    data() {
        return {
            form: {
                fleetId: '',
                date: '',
                amount: 0,
                note: '',
                type: '',
                source: '',
                woId: '',
            },
            types: [
                {name: 'Teknis', value: 'teknis'},
                {name: 'Non Teknis', value: 'non_teknis'},
            ],
            sources: [
                {name: 'Manual', value: 'manual'},
            ],
           
        }
    },
    methods: {
        uploadPhoto(event){
            this.photo = event.target.files[0]
            const formData = new FormData();
            formData.append('file', this.photo)
            axios.post(process.env.VUE_APP_API_URL + '/misc/upload', formData).then((res) => {
                this.form.photo = res.data.data.location
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal mengupload foto", "error");
                console.log((err));
            })
        },
        saveData(){
            axios.post(process.env.VUE_APP_API_URL + '/v1/fleet-costs', this.form).then(() => {      
                this.$router.push('/fleet-management/view/' + this.$route.params.id)         
                Swal.fire("Berhasil!", "Berhasil menambah data", "success");
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal menambah data", "error");
                console.log((err));
            })
        },
        updateData(){
            axios.put(process.env.VUE_APP_API_URL + '/v1/fleet-costs/' + this.$route.params.id, this.form).then(() => {
                this.$router.push('/fleet-management/view/' + this.$route.params.id)
                Swal.fire("Berhasil!", "Berhasil mengubah data", "success");
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal mengubah data", "error");
                console.log((err));
            })
        },
        handleAction(){
            if(this.$route.params.id){
                this.updateData()
            } 
            else{
                this.saveData()
            }
        }
    }   
}


</script>
<template>
    <Layout>
        <BRow>
            <BCol xl="12">
                <BCard no-body>
                    <!-- <BCardHeader>
                        
                    </BCardHeader> -->

                    <BCardBody>
                        <BForm>
                            <BRow>
                                <BCol md="6">
                                    <div>
                                        <label for="day" class="form-label">Tanggal <span class="text-danger">*</span></label>
                                        <input type="date" class="form-control" v-model="form.day" id="day" placeholder="-" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="parameter" class="form-label">Nominal Biaya <span class="text-danger">*</span></label>
                                        <input type="number" class="form-control" v-model="form.amount" id="parameter" placeholder="-" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="photo" class="form-label">Foto</label>
                                        <div class="input-group">
                                            <BFormFile v-model="form.photo" @change="uploadPhoto($event, 'photo')"></BFormFile>
                                            <!-- <input type="text" class="form-control" id="photo" placeholder="Upload Foto" v-model="form.photo" required> -->
                                            <span class="input-group-text bg-transparent fs-22"><img src="@/assets/icons/image.svg" width="20"></span>
                                        </div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="notes" class="form-label">Keterangan </label>
                                        <input type="text" class="form-control" v-model="form.notes" id="notes" placeholder="-" required >
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="unit" class="form-label">Tipe</label>
                                        <BFormSelect v-model="form.type" :options="types" label-field="name">

                                        </BFormSelect>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="source" class="form-label">Source</label>
                                        <BFormSelect v-model="form.source" :options="sources" label-field="name">

                                        </BFormSelect>
                                    </div>
                                </BCol>
                                
                            </BRow>
                            <div class="d-flex justify-content-end mt-4">
                                <router-link to="/fleet-management/view/">
                                    <BButton variant="light" class="me-2">Kembali</BButton>
                                </router-link>
                                <BButton type="submit" variant="primary" @click="handleAction()">Simpan</BButton>
                            </div>
                        </BForm>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>