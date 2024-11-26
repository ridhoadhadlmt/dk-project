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
                isVoid: false,
                parameterValue: 0,
                source: 'wo',
                notes: '',
                lastParameterValue: 0,
                photo: null,
            },
            voids: [
                {name: 'Ya', value: true},
                {name: 'Tidak', value: false},
            ],
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
            axios.post(process.env.VUE_APP_API_URL + '/v1/fleet-parameters', this.form).then(() => {               
                Swal.fire("Berhasil!", "Berhasil menambah data", "success");
                this.$router.push('/fleet-management/view/' + this.$route.params.id)
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal menambah data", "error");
                console.log((err));
            })
        },
        updateData(){
            axios.put(process.env.VUE_APP_API_URL + '/v1/fleet-parameters/' + this.$route.params.id, this.form).then(() => {
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
        },
        fetchData(){
            axios.get(process.env.VUE_APP_API_URL + '/v1/fleet-parameters/' + this.$route.params.id).then((response) => {
                this.form.fleetId = response.data.data.fleetId
                this.form.date = response.data.data.date.slice(0, 10)
                this.form.isVoid = response.data.data.isVoid
                this.form.parameterValue = response.data.data.parameterValue
                this.form.lastParameterValue = response.data.data.lastParameterValue
                this.form.source = response.data.data.source
                this.form.notes = response.data.data.notes
                this.form.photo = response.data.data.photo
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal mengubah data", "error");
                console.log((err));
            })
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
            <BCol xl="12">
                <BCard no-body>
                    <!-- <BCardHeader>
                        
                    </BCardHeader> -->

                    <BCardBody>
                        <BForm>
                            <BRow>
                                <BCol md="6">
                                    <div>
                                        <label for="date" class="form-label">Hari <span class="text-danger">*</span></label>
                                        <input type="date" class="form-control" v-model="form.date" id="date" placeholder="Pilih" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="parameter" class="form-label">Parameter <span class="text-danger">*</span></label>
                                        <input type="number" class="form-control" v-model="form.parameterValue" id="parameter" placeholder="-" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="unit" class="form-label">Unit</label>
                                        <input type="number" class="form-control" v-model="form.unit" id="unit" placeholder="-" required disabled>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="source" class="form-label">Source</label>
                                        <input type="text" class="form-control" v-model="form.source" id="source" placeholder="-" required disabled>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="user" class="form-label">User <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" v-model="form.source" id="user" placeholder="-" required disabled>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="approved" class="form-label">Approved </label>
                                        <input type="text" class="form-control" v-model="form.approved" id="approved" placeholder="-" required disabled>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="photo" class="form-label">Foto</label>
                                        <div class="input-group">
                                            <BFormFile v-model="form.photo" @change="uploadPhoto($event)"></BFormFile>
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
                                        <label for="void" class="form-label">Void <span class="text-danger">*</span></label>
                                        <BFormRadioGroup
                                        v-model="form.isVoid"
                                        :options="voids"
                                        value-field="value"
                                        text-field="name"
                                        />
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="source" class="form-label">Posisi Terakhir Parameter </label>
                                        <div class="input-group">
                                            <input type="number" class="form-control border-end-0" v-model="form.lastParameterValue" id="source" placeholder="-" required>
                                            <span class="input-group-text border-start-0">km/ltr</span>
                                        </div>
                                    </div>
                                </BCol>
                            </BRow>
                            <div class="d-flex justify-content-end mt-4">
                                <router-link to="/fleet-management/view/">
                                    <BButton variant="light" class="me-2">Kembali</BButton>
                                </router-link>
                                <BButton type="submit" variant="primary" @click="updateData()">Simpan</BButton>
                            </div>
                        </BForm>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>