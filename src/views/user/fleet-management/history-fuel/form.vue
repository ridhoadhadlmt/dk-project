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
                qtyLiter: 0,
                price: 0,
                subtotal: 15000,
                fuelSource: '',
                parameterValue: 1000,
                fillTo: 'full',
                literPerParameter: 8,
                note: '',
                photo: null,
            },
            fills: [
                {name: '0 (Kosong)', value: 'empty'},
                {name: '1/8', value: '1/8'},
                {name: '1/4', value: '1/4'},
                {name: '3/4', value: '3/4'},
                {name: '1/2 (Setengah)', value: '1/2'},
                {name: '5/8', value: '5/8'},
                {name: '3/4 (Tiga per empat)', value: '3/4'},
                {name: '7/8', value: '7/8'},
                {name: '1 (Full)', value: 'full'},
            ],
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
            axios.post(process.env.VUE_APP_API_URL + '/v1/fleet-fuels', this.form).then(() => {
                Swal.fire("Berhasil!", "Berhasil menambah data", "success");
                this.$router.back()
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal menambah data", "error");
                console.log((err));
            })
        },
        updateData(){
            axios.put(process.env.VUE_APP_API_URL + '/v1/fleet-fuels/' + this.$route.params.id, this.form).then(() => {
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
            if(this.$route.name == 'fleet-management-fuel-history-create' && this.$route.params.id){
                this.saveData()
            } 
            else{
                this.updateData()
            }
        },
        fetchData(){
            console.log(this.$route)
            if(this.$route.name == 'fleet-management-fuel-history-edit'){
                axios.get(process.env.VUE_APP_API_URL + '/v1/fleet-fuels/' + this.$route.params.id).then((response) => {
                this.form.fleetId = response.data.data.fleetId
                this.form.date = response.data.data.date.slice(0, 10)
                this.form.qtyLiter = response.data.data.qtyLiter
                this.form.price = response.data.data.price
                this.form.subtotal = response.data.data.subtotal
                this.form.fuelSource = response.data.data.fuelSource
                this.form.parameterValue = response.data.data.parameterValue
                this.form.fillTo = response.data.data.fillTo
                this.form.literPerParameter = response.data.data.literPerParameter
                this.form.note = response.data.data.note
                this.form.photo = response.data.data.photo
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
                                        <label for="date" class="form-label">Tanggal <span class="text-danger">*</span></label>
                                        <input type="date" class="form-control" v-model="form.date" id="parameter" placeholder="Pilih" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="qty-liter" class="form-label">Berapa Liter <span class="text-danger">*</span></label>
                                        <input type="number" class="form-control" v-model="form.qtyLiter" id="qty-liter" placeholder="0" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="unit" class="form-label">Harga/Liter <span class="text-danger">*</span></label>
                                        <input type="number" class="form-control" v-model="form.price" id="unit" placeholder="Rp 0" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="unit" class="form-label">Total Harga <span class="text-danger">*</span></label>
                                        <input type="number" class="form-control" v-model="form.subtotal" id="unit" placeholder="Rp 0" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="unit" class="form-label">Sumber BBM <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" v-model="form.fuelSource" id="unit" placeholder="Masukkan keterangan" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="unit" class="form-label">Parameter <span class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <input type="number" class="form-control border-end-0" v-model="form.parameterValue" id="unit" placeholder="0" required>
                                            <span class="input-group-text bg-transparent border-start-0">km</span>
                                        </div>
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
                                <BCol md="6">
                                    <BRow class="gy-4">
                                        <BCol md="12">
                                            <div>
                                                <label for="void" class="form-label">Mengisi Sampai <span class="text-danger">*</span></label>
                                                <BFormSelect v-model="form.fillTo" :options="fills" text-field="name" value-field="value"></BFormSelect>
                                            </div>
                                        </BCol>
                                        <BCol md="12">
                                            <div>
                                                <label for="source" class="form-label">Liter/Odometer Terakhir</label>
                                                <div class="input-group">
                                                    <input type="number" v-model="form.literPerParameter" class="form-control border-end-0" id="source" placeholder="0" required >
                                                    <span class="input-group-text border-start-0">ltr/hour</span>
                                                </div>
                                            </div>
                                        </BCol>
                                    </BRow>
                                </BCol>
                                <BCol md="6">
                                </BCol>
                            </BRow>
                            <div class="d-flex justify-content-end mt-4">
                                <router-link :to="`/fleet-management/view/${this.$route.params.id}`">
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