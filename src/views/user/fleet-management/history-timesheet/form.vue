<script>
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
    name: 'fleet-management-parameter-history-create',
    components: {
        Layout,
    },
    data() {
        return {
            form: {
                fleetId: this.$route.params.id,
                date: '',
                workHour: 0,
                unit: 'wo',
                note: '',
                operatorId: '',
                photo: null,
            },
            voids: [
                {name: 'Ya', value: 'yes'},
                {name: 'Tidak', value: 'no'},
            ],
            operators: [],
            photo: null,
        }
    },
    methods:{
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
            axios.post(process.env.VUE_APP_API_URL + '/v1/fleet-timesheets', this.form).then(() => {
                Swal.fire("Berhasil!", "Berhasil menambah data", "success");
                this.$router.back()
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal menambah data", "error");
                console.log((err));
            })
        },
        updateData(){
            axios.put(process.env.VUE_APP_API_URL + '/v1/fleet-timesheets/' + this.$route.params.id, this.form).then(() => {
                Swal.fire("Berhasil!", "Berhasil mengubah data", "success");
                this.$router.back()
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal mengubah data", "error");
                console.log((err));
            })
        },
        listDataOperator(){
            axios.get(process.env.VUE_APP_API_URL + '/v1/users').then((response) => {
                this.operators = response.data.data.items
            }).catch((err) => {
                console.log((err));
            })
        },
        handleAction(){
            if(this.$route.name == 'fleet-management-timesheet-history-create' && this.$route.params.id){
                this.saveData()
            } 
            else{
                this.updateData()
            }
        },
        fetchData(){
            console.log(this.$route)
            if(this.$route.name == 'fleet-management-timesheet-history-edit'){
                axios.get(process.env.VUE_APP_API_URL + '/v1/fleet-timesheets/' + this.$route.params.id).then((response) => {
                this.form.fleetId = response.data.data.fleetId
                this.form.date =  response.data.data.date.slice(0, 10)
                this.form.workHour =  response.data.data.workHour
                this.form.unit =  response.data.data.unit
                this.form.note =  response.data.data.note
                this.form.operatorId =  response.data.data.operatorId
                this.form.photo =  response.data.data.photo
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal mengubah data", "error");
                console.log((err));
            })
            }
        }
        
    },
    mounted(){
        this.fetchData();
        this.listDataOperator();
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
                                        <label for="day" class="form-label">Nama Operator <span class="text-danger">*</span></label>
                                        <BFormSelect v-model="form.operatorId" value-field="id" text-field="fullName" :options="operators" @change="selectOperator"></BFormSelect>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="parameter" class="form-label">Tanggal <span class="text-danger">*</span></label>
                                        <input type="date" class="form-control" v-model="form.date" id="parameter" placeholder="Pilih" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="unit" class="form-label">Jam Kerja</label>
                                        <input type="number" class="form-control" v-model="form.workHour" id="unit" placeholder="Jam Kerja" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="photo" class="form-label">Foto</label>
                                        <div class="input-group">
                                            <BFormFile v-model="form.photo" @change="uploadPhoto($event)"></BFormFile>
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