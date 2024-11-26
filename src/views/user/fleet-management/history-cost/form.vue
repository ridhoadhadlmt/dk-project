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
                fleetId: this.$route.params.id,
                date: '',
                amount: 0,
                note: '',
                type: '',
                source: '',
                woId: null,
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
            if(this.$route.name == 'fleet-management-cost-history-create' && this.$route.params.id){
                this.saveData()
            } 
            else{
                this.updateData()
            }
        },
        fetchData(){
            console.log(this.$route)
            if(this.$route.name == 'fleet-management-cost-history-edit'){
                axios.get(process.env.VUE_APP_API_URL + '/v1/fleet-costs/' + this.$route.params.id).then((response) => {
                this.form.fleetId = response.data.data.fleetId
                this.form.date = response.data.data.date.slice(0, 10)
                this.form.amount = response.data.data.amount
                this.form.note = response.data.data.note
                this.form.type = response.data.data.type
                this.form.source = response.data.data.source
                this.form.woId = response.data.data.woId
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal mengubah data", "error");
                console.log((err));
            })
            }
        }
    },
    mounted(){
        this.fetchData();
    }
}


</script>
<template>
    <Layout>
        <BRow>
            <BCol>
                <div class="h-100">
                    <BRow class="mb-3 pb-1">
                        <BCol cols="12">
                            <div class="d-flex align-items-lg-center flex-lg-row flex-column">
                                <div class="flex-grow-1">
                                    <h4 class="fs-16 mb-1">{{$route.meta.title}}</h4>
                                    <p class="text-muted mb-0">
                                        {{$route.meta.description}}
                                    </p>
                                </div>

                            </div>
                        </BCol>
                    </BRow>

                </div>
            </BCol>
        </BRow>
        <BRow>
            <BCol xl="12">
                <BCard no-body>
                    <!-- <BCardHeader>
                        
                    </BCardHeader> -->

                    <BCardBody>
                        <BForm>
                            <BRow class="gy-4">
                                <BCol md="6">
                                    <div>
                                        <label for="date" class="form-label">Tanggal <span class="text-danger">*</span></label>
                                        <input type="date" class="form-control" v-model="form.date" id="date" placeholder="-" required>
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
                                        <label for="note" class="form-label">Keterangan </label>
                                        <input type="text" class="form-control" v-model="form.note" id="note" placeholder="-" required >
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="unit" class="form-label">Tipe</label>
                                        <BFormSelect v-model="form.type" :options="types" text-field="name" value-field="value">

                                        </BFormSelect>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="source" class="form-label">Source</label>
                                        <BFormSelect v-model="form.source" :options="sources" text-field="name" value-field="value">

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