<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import SelectHeader from "@/components/select-header.vue";
import HeaderPage from "@/components/header-page.vue";
import TableComponent from "@/components/table.vue";
import axios from "axios";

export default {
    name: "fleet-management-view",
    components: {
        Layout,
        SelectHeader,
        HeaderPage,
        TableComponent,
    },
    data() {
        return {
            parameterHistoryHeaders: [
                {
                    title: 'No',
                    key: 'no',
                    show: true,
                    order:false
                },
                {
                    title: 'Foto',
                    key: 'photo',
                    show: true,
                    order:true
                },
                {
                    title: 'Tanggal',
                    key: 'date',
                    show: true,
                    order:true
                },
                {
                    title: 'Parameter',
                    key: 'parameterValue',
                    show: true,
                    order:true
                },
                {
                    title: 'Source',
                    key: 'source',
                    show: true,
                    order:true
                },
                {
                    title: 'User',
                    key: '',
                    show: false,
                    order:true
                },
                {
                    title: 'Keterangan',
                    key: 'notes',
                    show: true,
                    order:true
                },
                
                {
                    title: 'Action',
                    key: 'action',
                    show: true,
                    order:false
                }
            ],
            costHistoryHeaders: [
                {
                    title: 'No',
                    key: 'no',
                    show: true,
                    order:false
                },
                {
                    title: 'Foto',
                    key: 'photo',
                    show: true,
                    order:true
                },
                {
                    title: 'Tanggal',
                    key: 'date',
                    show: true,
                    order:true
                },
                {
                    title: 'Nominal Biaya',
                    key: 'amount',
                    show: true,
                    order:true
                },
                {
                    title: 'Keterangan Biaya',
                    key: 'notes',
                    show: true,
                    order:true
                },
                {
                    title: 'Tipe',
                    key: 'type',
                    show: true,
                    order:true
                },
                {
                    title: 'Source',
                    key: 'source',
                    show: true,
                    order:true
                },
                
                {
                    title: 'Action',
                    key: 'action',
                    show: true,
                    order:false
                }
            ],
            timesheetHistoryHeaders: [
                {
                    title: 'No',
                    key: 'no',
                    show: true,
                    order:false
                },
                {
                    title: 'Foto',
                    key: 'photo',
                    show: true,
                    order:true
                },
                {
                    title: 'Nama Operator',
                    key: 'operatorId',
                    show: true,
                    order:true
                },
                {
                    title: 'Tanggal',
                    key: 'date',
                    show: true,
                    order:true
                },
                {
                    title: 'Jam Kerja',
                    key: 'workHour',
                    show: true,
                    order:true
                },
                {
                    title: 'Keterangan',
                    key: 'note',
                    show: true,
                    order:true
                },
                {
                    title: 'Action',
                    key: 'action',
                    show: true,
                    order:false
                }
            ],
            fuelHistoryHeaders: [
                {
                    title: 'No',
                    key: 'no',
                    show: true,
                    order:false
                },
                {
                    title: 'Tanggal',
                    key: 'date',
                    show: true,
                    order:true
                },
                {
                    title: 'Berapa Liter',
                    key: 'qtyLiter',
                    show: true,
                    order:true
                },
                {
                    title: 'Harga/Liter',
                    key: 'price',
                    show: true,
                    order:true
                },
                {
                    title: 'Total Harga',
                    key: 'subtotal',
                    show: true,
                    order:true
                },
                {
                    title: 'Efisiensi BBM',
                    key: 'literPerParameter',
                    show: false,
                    order:true
                },
                {
                    title: 'Parameter Pembelian',
                    key: 'parameterValue',
                    show: true,
                    order:true
                },
                
                {
                    title: 'Action',
                    key: 'action',
                    show: true,
                    order:false
                }
            ],
            data: {
                attachments: [],
                maintenancePrograms: [
                    {
                        maintenanceProgramId: '',
                        lastMaintenancePoint: 0,
                    }
                ],
                ownBy: '',
                finance: {}
            },
            params: {
                page: 1,
                limit: 10,
                search: '',
                sortBy: 'id.desc',
                fleetId: this.$route.params.id,
            },
            config:{
                total_pages: 0,
                total_items: 0,
            },
            document: [],
            operators: [],
            parameterHistories: [],
            costHistories: [],
            timesheetHistories: [],
            fuelHistories: [],
            showSelectHeader: false,
            modalApproveParameter: false,
            modalApproveCost: false,
            modalApproveTimesheet: false,
            modalApproveFuel: false,
            fleetParameterId: '',
            fleetCostId: '',
            fleetTimesheetId: '',
            fleetFuelId: '',
        }
    },
    watch: {
    },
    methods: {
        rightcolumn() {
            if (document.querySelector('.layout-rightside-col').classList.contains('d-block')) {
                document.querySelector('.layout-rightside-col').classList.remove('d-block');
                document.querySelector('.layout-rightside-col').classList.add('d-none');
            } else {
                document.querySelector('.layout-rightside-col').classList.remove('d-none');
                document.querySelector('.layout-rightside-col').classList.add('d-block');
            }
        },

        resizerightcolumn() {
            const element = document.querySelector('.layout-rightside-col');

            if (element) {
                if (window.outerWidth < 1699) {
                    element.classList.remove("d-block");
                    element.classList.add("d-none");
                } else {
                    element.classList.add("d-block");
                    element.classList.remove("d-none");
                }
            }

            if (document.documentElement.getAttribute("data-layout") === "semibox") {
                element.classList.remove("d-block");
                element.classList.add("d-none");
            }
        },

        hiderightcolumn() {
            const element = document.querySelector('.layout-rightside-col');
            if (element.classList.contains('d-block')) {
                element.classList.remove("d-block");
                element.classList.add("d-none");
            }
        },
        showSelectHeaderMethod() {
            this.showSelectHeader = true;
        },
        showModalApproveParameter(id) {
            this.fleetParameterId = id;
            this.modalApproveParameter = true;
        },
        // showModalApproveCost(id) {
        //     this.fleetCostId = id;
        //     this.modalApproveCost = true;
        // },
        // showModalApproveTimesheet(id) {
        //     this.fleetTimesheetId = id;
        //     this.modalApproveTimesheet = true;
        // },
        // showModalApproveFuel(id) {
        //     this.fleetFuelId = id;
        //     this.modalApproveFuel = true;
        // },
        // hideSelectHeaderMethod() {
        //     this.showSelectHeader = false;
        // },
        // approveParameter(){
        // }, 
        // approveCost(){
        // }, 
        // approveTimesheet(){
        // }, 
        // approveFuel(){
        // }, 
        fetchData() {
            axios.get(process.env.VUE_APP_API_URL + "/v1/fleets/" + this.$route.params.id)
                .then(response => {
                    const data = response.data.data
                    this.data.photo = data.photo
                    this.data.merk = data.merk
                    this.data.code = data.code
                    this.data.parameterValue = data.parameterValue
                    this.data.status = data.status
                    this.data.name = data.name
                    this.data.year = data.year
                    this.data.serialNumber = data.serialNumber
                    // this.fleetType = data.fleetType.name
                    this.data.width = data.widht
                    this.data.height = data.height
                    this.data.length = data.length
                    this.data.weight = data.wight
                    this.data.fuelEfficiency = data.fuelEfficiency
                    this.data.fuelType = data.fuelType
                    this.data.transmition = data.transmition
                    this.data.additionalSpecification = data.additionalSpesification
                    this.data.notes = data.notes
                    this.data.operatorId = data.operatorId
                    this.data.projectLocation = data.projectLocation
                    this.data.finance = data.finance
                    this.data.ownBy = data.ownBy
                    this.data.buyPrice = data.buyPrice
                    this.data.ageEstimation = data.ageEstimation
                    this.data.terminalValue = data.terminalValue
                    // data.maintenancePrograms.forEach((item, index) => {
                    //     this.data.maintenancePrograms[index].id = item[index].id
                    //     this.data.maintenancePrograms[index].maintenanceProgramId = item[index].maintenanceProgramId
                    //     this.data.maintenancePrograms[index].lastMaintenancePoint = item[index].lastMaintenancePoint
                    //     this.data.maintenancePrograms[index].isDelete = false
                    // })
                    data.attachments.forEach((item, index) => {
                        
                        this.data.attachments[index] = item
                    })
                })
                .catch(error => {
                    console.log(error);
                });
        },
        listDataOperator() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/users').then((response) => {
                this.operators = response.data.data.items
            }).catch((error) => {
                console.log(error);
            });
        },
        listDataHistoryParameter() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/fleet-parameters', {
                params: this.params,
            }).then((response) => {
                this.parameterHistories = response.data.data.items
                console.log(this.parameterHistories)
                this.config.total_items = response.data.data.meta.totalItems
                this.config.total_pages = response.data.data.meta.totalPages
            }).catch((error) => {
                console.log(error);
            });
        },
        listDataHistoryCost() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/fleet-costs', {
                params: this.params,
            }).then((response) => {
                this.costHistories = response.data.data.items
                console.log(this.costHistories)
                this.config.total_items = response.data.data.meta.totalItems
                this.config.total_pages = response.data.data.meta.totalPages
            }).catch((error) => {
                console.log(error);
            });
        },
        listDataHistoryTimesheet() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/fleet-timesheets', {
                params: this.params,
            }).then((response) => {
                this.timesheetHistories = response.data.data.items
                console.log(this.timesheetHistories)
                this.config.total_items = response.data.data.meta.totalItems
                this.config.total_pages = response.data.data.meta.totalPages
            }).catch((error) => {
                console.log(error);
            });
        },
        listDataHistoryFuel() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/fleet-fuels', {
                params: this.params,
            }).then((response) => {
                this.fuelHistories = response.data.data.items
                console.log(this.fuelHistories)
                this.config.total_items = response.data.data.meta.totalItems
                this.config.total_pages = response.data.data.meta.totalPages
            }).catch((error) => {
                console.log(error);
            });
        },
    },
    mounted() {
        
        window.addEventListener("resize", this.resizerightcolumn);
        this.fetchData();
        this.listDataOperator();
        this.listDataHistoryParameter();
        this.listDataHistoryCost();
        this.listDataHistoryTimesheet();
        this.listDataHistoryFuel();
        
    }

};
</script>

<template>
    <Layout>
        <SelectHeader :showModal="showSelectHeader" :headers="parameterHistoryHeaders" @hideModal="hideSelectHeaderMethod" @selectHeader="selectHeaderMethod" />
        <HeaderPage title="Fleet Management" pageTitle="Fleet Management" />
        <!-- <BModal v-model="modalApproveParameter" hide-footer hide-header-close centered  class="v-modal-custom">
            <div class="d-flex">
                <div class="img">
                    <img src="@/assets/images/nft/img-01.jpg" alt="">
                </div>
                <div class="text">
                    <b class="fs-14">Apa anda ingin mengapprove data ini?</b>
                    <p>Silahkan periksa kembali apakah data sudah sesuai</p> 
                    <p>Parameter</p> 
                </div>
            </div>
            <div class="d-flex justify-content-center mt-4">
                <BButton variant="dark" class="me-2" @click="modalApproveParameter = false">Tidak</BButton>
                <BButton variant="light" @click="approveParameter()">Ya</BButton>
            </div>
        </BModal> -->
        <!-- <BModal v-model="modalApproveCost" hide-footer hide-header-close centered  class="v-modal-custom">
            <div class="d-flex">
                <div class="img">
                    <img src="@/assets/images/nft/img-01.jpg" alt="">
                </div>
                <div class="text">
                    <b class="fs-14">Apa anda ingin mengapprove data ini?</b>
                    <p>Silahkan periksa kembali apakah data sudah sesuai</p> 
                    <p>Parameter</p> 
                </div>
            </div>
            <div class="d-flex justify-content-center mt-4">
                <BButton variant="dark" class="me-2" @click="modalApproveCost = false">Tidak</BButton>
                <BButton variant="light" @click="approveCost()">Ya</BButton>
            </div>
        </BModal>
        <BModal v-model="modalApproveTimesheet" hide-footer hide-header-close centered  class="v-modal-custom">
            <div class="d-flex">
                <div class="img">
                    <img src="@/assets/images/nft/img-01.jpg" alt="">
                </div>
                <div class="text">
                    <b class="fs-14">Apa anda ingin mengapprove data ini?</b>
                    <p>Silahkan periksa kembali apakah data sudah sesuai</p> 
                    <p>Parameter</p> 
                </div>
            </div>
            <div class="d-flex justify-content-center mt-4">
                <BButton variant="dark" class="me-2" @click="modalApproveTimesheet = false">Tidak</BButton>
                <BButton variant="light" @click="approveCost()">Ya</BButton>
            </div>
        </BModal>
        <BModal v-model="modalApproveFuel" hide-footer hide-header-close centered  class="v-modal-custom">
            <div class="d-flex">
                <div class="img">
                    <img src="@/assets/images/nft/img-01.jpg" alt="">
                </div>
                <div class="text">
                    <b class="fs-14">Apa anda ingin mengapprove data ini?</b>
                    <p>Silahkan periksa kembali apakah data sudah sesuai</p> 
                    <p>Parameter</p> 
                </div>
            </div>
            <div class="d-flex justify-content-center mt-4">
                <BButton variant="dark" class="me-2" @click="modalApproveFuel = false">Tidak</BButton>
                <BButton variant="light" @click="approveFuel()">Ya</BButton>
            </div>
        </BModal> -->
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
                <BCard>
                    <BCardBody>
                        <BRow>
                            <BCol md="2">
                                <img :src="data.photo" class="img-fluid" alt="photo">
                            </BCol>
                            <BCol md="10">
                                <h2>{{ data.name }}</h2>
                                <BRow>
                                    <BCol md="3">
                                        <div class="d-flex">
                                            <div class="w-50">
                                                <h5 class="text-black-50">Tipe Fleet</h5>
                                            </div>
                                            <div class="w-50">
                                                <h5><span class="px-3">: {{ data.fleetType.name}}</span></h5>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="w-50">
                                                <h5 class="text-black-50">Tahun</h5>
                                            </div>
                                            <div class="w-50">
                                                <h5><span class="px-3">:</span>{{ data.year}}</h5>
                                            </div>
                                        </div>
                                    </BCol>
                                    <BCol md="3">
                                        <div class="d-flex">
                                            <div class="w-50">
                                                <h5 class="text-black-50">VIN/SN</h5>
                                            </div>
                                            <div class="w-50">
                                                <h5><span class="px-3">:</span>{{ data.serialNumber}}</h5>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="w-50">
                                                <h5 class="text-black-50">Merk</h5>
                                            </div>
                                            <div class="w-50">
                                                <h5><span class="px-3">:</span>{{ data.merk}}</h5>
                                            </div>
                                        </div>
                                    </BCol>
                                    <BCol md="3">
                                        <div class="d-flex">
                                            <div class="w-50">
                                                <h5 class="text-black-50">Kode Fleet</h5>
                                            </div>
                                            <div class="w-50">
                                                <h5><span class="px-3">:</span>{{ data.code}}</h5>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="w-50">
                                                <h5 class="text-black-50">Parameter Terbaru</h5>
                                            </div>
                                            <div class="w-50">
                                                <h5><span class="px-3">:</span>{{ data.parameterValue}}</h5>
                                            </div>
                                        </div>
                                    </BCol>
                                    <BCol md="3">
                                        <div class="d-flex">
                                            <div class="w-50">
                                                <h5 class="text-black-50">Status</h5>
                                            </div>
                                            <div class="d-flex justify-content-end">
                                                <h5><span class="px-3">:</span>{{ data.status}}</h5>
                                            </div>
                                        </div>
                                    </BCol>
                                </BRow>
                            </BCol>
                        </BRow>
                        <BRow>
                            <nav class="border-bottom ps-0">
                                <div class="nav" id="nav-tab" role="tablist">
                                    <button class="nav-link py-3 active fs-18 ps-0" id="overview-tab" data-bs-toggle="tab" data-bs-target="#nav-overview" type="button" role="tab" aria-controls="nav-overview" aria-selected="true">Overview</button>
                                    <button class="nav-link py-3 fs-18" id="nav-history-parameter-tab" data-bs-toggle="tab" data-bs-target="#nav-history-parameter" type="button" role="tab" aria-controls="nav-history-parameter" aria-selected="false">History Parameter</button>
                                    <button class="nav-link py-3 fs-18" id="nav-history-cost-tab" data-bs-toggle="tab" data-bs-target="#nav-history-cost" type="button" role="tab" aria-controls="nav-history-cost" aria-selected="false">History Biaya</button>
                                    <button class="nav-link py-3 fs-18" id="nav-history-timesheet-tab" data-bs-toggle="tab" data-bs-target="#nav-history-timesheet" type="button" role="tab" aria-controls="nav-history-timesheet" aria-selected="false">History Timesheet</button>
                                    <button class="nav-link py-3 fs-18" id="nav-history-bbm-tab" data-bs-toggle="tab" data-bs-target="#nav-history-bbm" type="button" role="tab" aria-controls="nav-history-bbm" aria-selected="false">History BBM</button>
                                    <button class="nav-link py-3 fs-18" id="nav-others-tab" data-bs-toggle="tab" data-bs-target="#nav-others" type="button" role="tab" aria-controls="nav-others" aria-selected="false">Others</button>
                                </div>
                            </nav>
                            <div class="tab-content py-3 px-0" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="nav-overview" role="tabpanel" aria-labelledby="overview-tab" tabindex="0">
                                    <div class="chart border-bottom">
                                        <div class="d-flex justify-content-between">
                                            <h3>Chart Overview</h3>
                                            <i class="bx bx-chevron-down fs-22"></i>
                                        </div>
                                    </div>
                                    <BForm>
                                        <div class="umum py-3">
                                            <BRow>
                                                <h3 class="mb-2">Umum</h3>
                                                <BCol md="6">
                                                    <label for="dimensi" class="form-label">Dimensi </label>                                        
                                                    <BRow>
                                                        <BCol md="4">
                                                        <div>
                                                            <div class="input-group">
                                                                <input type="number" class="form-control" id="width" placeholder="Lebar" v-model="data.width" required disabled>
                                                                
                                                            </div>
                                                        </div>
                                                    </BCol>
                                                    <BCol md="4">
                                                        <div>
                                                            <div class="input-group">
                                                                <input type="number" class="form-control" id="width" placeholder="Tinggi" v-model="data.height" required disabled>
                                                                
                                                            </div>
                                                        </div>
                                                    </BCol>
                                                    <BCol md="4">
                                                        <div>
                                                            <div class="input-group">
                                                                <input type="number" class="form-control" id="width" placeholder="Panjang" v-model="data.length" required disabled>
                                                                
                                                            </div>
                                                        </div>
                                                    </BCol>
                                                    </BRow>
                                                </BCol>
                                                <BCol md="6">
                                                    <div>
                                                        <label for="width" class="form-label">Berat </label>
                                                        <input type="number" class="form-control" id="width" placeholder="0 kg" v-model="data.weight" required disabled>
                                                    </div>
                                                </BCol>
                                            
                                                <BCol md="6">
                                                    <label for="efficiency" class="form-label">Efesiensi BBM (berdasarkan buku manual faktur) <span class="text-danger">*</span></label>
                                                    <div class="input-group">
                                                        <input type="number" class="form-control border-end-0" v-model="data.fuelEfficiency" placeholder="0" aria-label="efficiency" aria-describedby="efficiency" disabled>
                                                        <span class="input-group-text border-start-0" id="efficiency">km/ltr</span>
                                                    </div>
                                                </BCol>
                                                <BCol md="6">
                                                    <label for="efficiency" class="form-label">Tipe BBM <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="type-bbm" v-model="data.fuelType" required disabled>
                                                    
                                                </BCol>
                                                <BCol md="6">
                                                    <div>
                                                        <label for="transmisi" class="form-label">Transmisi </label>
                                                        <input type="text" class="form-control" id="transmisi" v-model="data.transmition" required disabled>
                                                    </div>
                                                </BCol>
                                                <BCol md="6">
                                                    <div>
                                                        <label for="additional-specification" class="form-label">Spesifikasi tambahan </label>
                                                        <input type="text" class="form-control" id="additional-specification" v-model="data.additionalSpecification" required disabled>
                                                    </div>
                                                </BCol>
                                                <BCol md="6">
                                                    <div>
                                                        <label for="notes" class="form-label">Notes</label>
                                                        <input type="text" class="form-control" id="notes" v-model="data.notes" required disabled>
                                                    </div>
                                                </BCol>
                                            </BRow>

                                        </div>
                                             
                                        <div class="operasional border-top border-bottom py-3">
                                            <BRow>
                                                <h3>Operasional</h3>
                                                <BCol md="6">
                                                    <div>
                                                        <label for="operator" class="form-label">Operator <span class="text-danger">*</span></label>
                                                        <select id="operator" class="form-select" v-model="data.operatorId" required disabled>
                                                            <option v-for="(operator, index) in operators" :key="index" :value="operator.id">{{ operator.fullName }}</option>
                                                        </select>
                                                    </div>
                                                </BCol>
                                                <BCol md="6">
                                                    <div>
                                                        <label for="tags" class="form-label">Label Bebas <span class="text-danger">*</span></label>
                                                        <div class="bg-light w-100 rounded border d-flex" style="height: 40px">
                                                            <div v-for="(tag, index) in data.tags" :key="index">
                                                                <span>{{ tag }}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </BCol>
                                                <BCol md="12" >
                                                    <BRow v-for="(maintenancceProgram, index) in data.maintenancePrograms" :key="index">
                                                        <BCol md="6">
                                                            <div>
                                                                <label for="program-management" class="form-label">Program Maintenance <span class="text-danger">*</span></label>
                                                                <div >
                                                                    <select  id="program-management" class="form-select" disabeld>
                                                                        <option></option>
                                                                    </select>
                                                                </div>
                                                                
                                                            </div>
                                                        </BCol>
                                                        <BCol md="6">
                                                            <div>
                                                                <label for="starting-point" class="form-label">Starting Point <span class="text-danger">*</span></label>
                                                                <div class="d-flex justify-content-between">
                                                                    <input type="number" class="form-control" v-model="data.maintenancePrograms[index].lastMaintenancePoint" placeholder="0 km" aria-label="starting-point" aria-describedby="starting-point" disabled>
                                                                    
                                                                </div>
                                                                
                                                            </div>
                                                        </BCol>
                                                    </BRow>
                                                </BCol>
                                                <BCol md="12">
                                                    <BRow v-for="(attachment,index) in data.attachments" :key="index">
                                                        <div>
                                                            <label for="attachment" class="form-label">Attachment <span class="text-danger">*</span></label>
                                                            <div class="mb-3 d-flex justify-content-between">
                                                                <div class="input-group">
                                                                    <BFormFile v-model="document[index]" disabled></BFormFile>
                                                                    <span class="input-group-text bg-transparent fs-22"><img src="@/assets/icons/doc.svg" width="20"></span>
                                                                </div>
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                    </BRow>
                                                </BCol>
                                                <BCol md="6">
                                                    <div>
                                                        <label for="project-location" class="form-label">Lokasi Proyek <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" v-model="data.projectLocation" id="project-location" placeholder="Masukkan lokasi proyek" required disabled>
                                                    </div>
                                                </BCol>
                                            </BRow>
                                        </div>
                                        <div class="financial py-3">
                                            <BRow>
                                                <h3>Finance</h3>
                                                <BCol md="6">
                                                    <div>
                                                        <label for="payment-amount" class="form-label">Harga Pembelian <span class="text-danger">*</span></label>
                                                        <input type="number" class="form-control" v-model="data.finance.paymentAmount" id="payment-amount" placeholder="Rp 0" required disabled>
                                                    </div>
                                                </BCol>
                                                <BCol md="6">
                                                    <label for="efficiency" class="form-label">Kepemilikan <span class="text-danger">*</span></label>
                                                    <BFormRadio v-model="data.ownBy" :value="data.ownBy">
                                                        {{ data.ownBy == 'financing' ? 'Financing' : 'Perusahaan'}}
                                                    </BFormRadio>
                                                </BCol>
                                                <BCol md="6">
                                                    <div>
                                                        <label for="attachment" class="form-label">Uang Muka <span class="text-danger">*</span></label>
                                                        <input type="number" class="form-control" v-model="data.finance.downPayment" id="attachment" placeholder="Rp 0" required disabled>
                                                    </div>
                                                </BCol>
                                                <BCol md="3">
                                                    <div>
                                                        <label for="first-payment-date" class="form-label">First Payment Date <span class="text-danger">*</span></label>
                                                        <input type="date" class="form-control" v-model="data.finance.firstPaymentAt" id="first-payment-date" required disabled>
                                                    </div>
                                                </BCol>
                                                <BCol md="3">
                                                    <div>
                                                        <label for="end-payment-date" class="form-label">End Payment Date <span class="text-danger">*</span></label>
                                                        <input type="date" class="form-control" v-model="data.finance.endPaymentAt" id="end-payment-date" required disabled>
                                                    </div>
                                                </BCol>
                                                <BCol md="6">
                                                    <div>
                                                        <label for="tenor" class="form-label">Tenor <span class="text-danger">*</span></label>
                                                        <div class="input-group">
                                                            <input type="number" v-model="data.finance.tenor" class="form-control w-75" placeholder="0 km" aria-label="tenor" aria-describedby="tenor" disabled>
                                                            <select class="form-select" v-model="data.finance.tenorUnit" disabled>
                                                                <option value="time">Kali</option>
                                                                <option value="month">Bulan</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </BCol>
                                                <BCol md="6">
                                                    <div>
                                                        <label for="nominal" class="form-label">Nominal Pembayaran <span class="text-danger">*</span></label>
                                                        <input type="number" class="form-control" v-model="data.buyPrice" id="nominal" placeholder="Rp 0" required disabled>
                                                    </div>
                                                </BCol>
                                                <BCol md="6">
                                                    <div>
                                                        <label for="tenor" class="form-label">Tenor <span class="text-danger">*</span></label>
                                                        <input type="number" class="form-control" v-model="data.finance.tenor" id="tenor" placeholder="Rp 0" required disabled>
                                                        
                                                    </div>
                                                </BCol>
                                                <BCol md="6">
                                                    <div>
                                                        <label for="payment-date" class="form-label">Payment Date <span class="text-danger">*</span></label>
                                                        <input type="date" class="form-control" v-model="data.finance.paymentDate" id="payment-date"  required disabled>
                                                    </div>
                                                </BCol>
                                                <BCol md="3">
                                                    <div>
                                                        <label for="first-payment-date" class="form-label">First Payment Date <span class="text-danger">*</span></label>
                                                        <input type="date" class="form-control" v-model="data.finance.firstPaymentAt" id="first-payment-date" placeholder="Rp 0" required disabled>
                                                    </div>
                                                </BCol>
                                                <BCol md="3">
                                                    <div>
                                                        <label for="end-payment-date" class="form-label">End Payment Date <span class="text-danger">*</span></label>
                                                        <input type="date" class="form-control" v-model="data.finance.endPaymentAt" id="end-payment-date" placeholder="Rp 0" required disabled>
                                                    </div>
                                                </BCol>
                                                <BCol md="6">
                                                    <div>
                                                        <label for="age-estimate" class="form-label">Estimasi Umur <span class="text-danger">*</span></label>
                                                        <input type="number" class="form-control" v-model="data.ageEstimation" id="age-estimate" placeholder="0" required disabled>
                                                    </div>
                                                </BCol>
                                                <BCol md="6">
                                                    <div>
                                                        <label for="terminal-value" class="form-label">Terminal Value <span class="text-danger">*</span></label>
                                                        <input type="number" class="form-control" v-model="data.terminalValue" id="terminal-value" placeholder="0" required disabled>
                                                    </div>
                                                </BCol>
                                            </BRow>
                                        </div>
                                    </BForm>

                                </div>
                                <div class="tab-pane fade" id="nav-history-parameter" role="tabpanel" aria-labelledby="nav-history-parameter-tab" tabindex="0">
                                    <div class="d-flex flex-wrap justify-content-between py-lg-4">
                                        <h4 class="card-title mb-0">Histori Parameter</h4>

                                        <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                                            <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showSelectHeaderMethod">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </BButton>
                                            <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                                                <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                                    <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="params.search">
                                                    <i class="ri-search-line search-icon"></i>
                                                </div>
                                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportExcel">
                                                    Export CSV
                                                </BButton>
                                                <router-link :to="{ name: 'fleet-management-parameter-history-create' }">
                                                    <BButton variant="primary" class="btn btn-md" style="white-space: nowrap;">
                                                        Tambah Histori
                                                    </BButton>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="live-preview">
                                        <table-component :headers="parameterHistoryHeaders" :data="parameterHistories" :action="action" v-if="parameterHistories.length > 0" @sort="sort($event.sortBy)">
                                            <template #no="{ index }">
                                                {{ index + 1 }}
                                            </template>
                                            <template #photo="{ item }">   
                                                <img :src="item.photo " width="20" height="20">
                                            </template>
                                            <template #action="{ item }">
                                                <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/fleet-management/parameter-history/edit/${item.id}`">
                                                    <img src="@/assets/icons/edit.svg" alt="pencil" />
                                                </BButton>
                                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDeletParameter(item.id)">
                                                    <img src="@/assets/icons/delete.svg" alt="delete" />
                                                </BButton>
                                                <!-- <BButton variant="link" class="link-opacity-75 bg-success p-1 mx-1 rounded-2" size="sm" @click="showModalApproveParameter(item.id)">
                                                    <img src="@/assets/icons/check.svg" width="20" alt="check" />
                                                </BButton> -->
                                            </template>
                                            <template #pagination>  
                                                <div class="d-flex justify-content-between mt-3" v-if="config.total_items >= 1">
                                                    <div class="d-flex align-items-center">
                                                        <select id="perPageSelect" v-model="params.limit" class="form-select" >
                                                            <option v-for="option in [10, 20, 30, 50]" :key="option" :value="option">{{ option }}</option>
                                                        </select>
                                                    </div>
                                                    <div class="pagination-wrap hstack gap-2">
                                                        <BButton class="page-item pagination-prev" variant="light"  :disabled="params.page <= 1" @click="params.page--">
                                                            <i class="ri-arrow-left-s-line"></i>
                                                        </BButton>
                                                        <ul class="pagination listjs-pagination mb-0">
                                                            <li :class="{active: pageNumber == params.page, disabled: pageNumber == '...'}" v-for="(pageNumber, index) in config.total_pages" :key="index" @click="changePage(pageNumber)">
                                                            <BButton class="page" >{{ pageNumber }}</BButton>
                                                            </li>
                                                        </ul>
                                                        <BButton class="page-item pagination-next" variant="light"  :disabled="params.page >= config.total_pages" @click="params.page++">
                                                            <i class="ri-arrow-right-s-line"></i>
                                                        </BButton>
                                                    </div>
                                                </div>
                                            </template>
                                        </table-component>
                                    </div>
                                </div>
                                <!-- 
                                <div class="tab-pane fade" id="nav-history-cost" role="tabpanel" aria-labelledby="nav-history-cost-tab" tabindex="0">
                                    <div class="d-flex flex-wrap justify-content-between py-lg-4">
                                        <h4 class="card-title mb-0">Histori Biaya</h4>

                                        <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                                            <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showSelectHeaderMethod">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </BButton>
                                            <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                                                <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                                    <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="params.search">
                                                    <i class="ri-search-line search-icon"></i>
                                                </div>
                                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportExcel">
                                                    Export CSV
                                                </BButton>

                                                <router-link :to="{ name: 'fleet-management-cost-history-create' }">
                                                    <BButton variant="primary" class="btn btn-md" style="white-space: nowrap;">
                                                        Tambah Histori
                                                    </BButton>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="live-preview">
                                        <table-component :headers="costHistoryHeaders" :data="costHistories" :action="action" v-if="costHistories.length > 0" @sort="sort($event.sortBy)">
                                            <template #no="{ index }">
                                                {{ index + 1 }}
                                            </template>
                                            <template #photo="{ item }">   
                                                <img :src="item.photo " width="20" height="20">

                                            </template>
                                            <template #action="{ item }">
                                                <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/fleet-management/edit/${item.id}`">
                                                    <img src="@/assets/icons/edit.svg" alt="pencil" />
                                                </BButton>
                                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDeleteCost(item.id)">
                                                    <img src="@/assets/icons/delete.svg" alt="delete" />
                                                </BButton>
                                                <BButton variant="link" class="link-opacity-75 bg-success p-1 mx-1 rounded-2" size="sm" @click="showModalApproveCost(item.id)">
                                                    <img src="@/assets/icons/check.svg" width="20" alt="check" />
                                                </BButton>
                                            </template>
                                            <template #pagination>  
                                                <div class="d-flex justify-content-between mt-3" v-if="config.total_items >= 1">
                                                    <div class="d-flex align-items-center">
                                                        <select id="perPageSelect" v-model="params.limit" class="form-select" >
                                                            <option v-for="option in [10, 20, 30, 50]" :key="option" :value="option">{{ option }}</option>
                                                        </select>
                                                    </div>
                                                    <div class="pagination-wrap hstack gap-2">
                                                        <BButton class="page-item pagination-prev" variant="light"  :disabled="params.page <= 1" @click="params.page--">
                                                            <i class="ri-arrow-left-s-line"></i>
                                                        </BButton>
                                                        <ul class="pagination listjs-pagination mb-0">
                                                            <li :class="{active: pageNumber == params.page, disabled: pageNumber == '...'}" v-for="(pageNumber, index) in config.total_pages" :key="index" @click="changePage(pageNumber)">
                                                            <BButton class="page" >{{ pageNumber }}</BButton>
                                                            </li>
                                                        </ul>
                                                        <BButton class="page-item pagination-next" variant="light"  :disabled="params.page >= config.total_pages" @click="params.page++">
                                                            <i class="ri-arrow-right-s-line"></i>
                                                        </BButton>
                                                    </div>
                                                </div>
                                            </template>
                                        </table-component>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="nav-history-timesheet" role="tabpanel" aria-labelledby="nav-history-timesheet-tab" tabindex="0">
                                    <div class="d-flex flex-wrap justify-content-between py-lg-4">
                                        <h4 class="card-title mb-0">Histori Timesheet</h4>

                                        <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                                            <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showSelectHeaderMethod">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </BButton>
                                            <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                                                <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                                    <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="params.search">
                                                    <i class="ri-search-line search-icon"></i>
                                                </div>
                                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportExcel">
                                                    Export CSV
                                                </BButton>
                                                <router-link :to="{ name: 'fleet-management-timesheet-history-create' }">
                                                    <BButton variant="primary" class="btn btn-md" style="white-space: nowrap;">
                                                        Tambah Histori
                                                    </BButton>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="live-preview">
                                        <table-component :headers="timesheetHistoryHeaders" :data="timesheetHistories" :action="action" v-if="timesheetHistories.length > 0" @sort="sort($event.sortBy)">
                                            <template #no="{ index }">
                                                {{ index + 1 }}
                                            </template>
                                            <template #photo="{ item }">   
                                                <img :src="item.photo " width="20" height="20">

                                            </template>
                                            <template #action="{ item }">
                                                <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/fleet-management/edit/${item.id}`">
                                                    <img src="@/assets/icons/edit.svg" alt="pencil" />
                                                </BButton>
                                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDeleteTimesheet(item.id)">
                                                    <img src="@/assets/icons/delete.svg" alt="delete" />
                                                </BButton>
                                                <BButton variant="link" class="link-opacity-75 bg-success p-1 mx-1 rounded-2" size="sm" @click="showModalApproveTimesheet(item.id)">
                                                    <img src="@/assets/icons/check.svg" width="20" alt="check" />
                                                </BButton>

                                            </template>

                                            <template #pagination>  

                                                <div class="d-flex justify-content-between mt-3" v-if="config.total_items >= 1">
                                                    <div class="d-flex align-items-center">
                                                        <select id="perPageSelect" v-model="params.limit" class="form-select" >
                                                            <option v-for="option in [10, 20, 30, 50]" :key="option" :value="option">{{ option }}</option>
                                                        </select>
                                                    </div>
                                                    <div class="pagination-wrap hstack gap-2">
                                                        <BButton class="page-item pagination-prev" variant="light"  :disabled="params.page <= 1" @click="params.page--">
                                                            <i class="ri-arrow-left-s-line"></i>
                                                        </BButton>
                                                        <ul class="pagination listjs-pagination mb-0">
                                                            <li :class="{active: pageNumber == params.page, disabled: pageNumber == '...'}" v-for="(pageNumber, index) in config.total_pages" :key="index" @click="changePage(pageNumber)">
                                                            <BButton class="page" >{{ pageNumber }}</BButton>
                                                            </li>
                                                        </ul>
                                                        <BButton class="page-item pagination-next" variant="light"  :disabled="params.page >= config.total_pages" @click="params.page++">
                                                            <i class="ri-arrow-right-s-line"></i>
                                                        </BButton>
                                                    </div>
                                                </div>
                                            </template>
                                        </table-component>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="nav-history-bbm" role="tabpanel" aria-labelledby="nav-history-bbm-tab" tabindex="0">
                                    <div class="d-flex flex-wrap justify-content-between py-lg-4">
                                        <div>
                                            <h4 class="card-title mb-0">Histori BBM</h4>
                                            <h5 class="card-subtitle mb-0">Rata-Rata Efisiensi BBM: </h5>
                                        </div>

                                        <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                                            <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showSelectHeaderMethod">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </BButton>
                                        
                                            

                                            <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                                                <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                                    <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="params.search">
                                                    <i class="ri-search-line search-icon"></i>
                                                </div>
                                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportExcel">
                                                    Export CSV
                                                </BButton>
                                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportExcel">
                                                    Setting Toleransi
                                                </BButton>
                                                <router-link :to="{ name: 'fleet-management-fuel-history-create' }">
                                                    <BButton variant="primary" class="btn btn-md" style="white-space: nowrap;">
                                                        Tambah Histori
                                                    </BButton>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="live-preview">
                                        <table-component :headers="fuelHistoryHeaders" :data="fuelHistories" :action="action" v-if="fuelHistories.length > 0" @sort="sort($event.sortBy)">
                                            <template #no="{ index }">
                                                {{ index + 1 }}
                                            </template>
                                            <template #photo="{ item }">   
                                                <img :src="item.photo " width="20" height="20">

                                            </template>
                                            <template #action="{ item }">
                                                <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/fleet-management/edit/${item.id}`">
                                                    <img src="@/assets/icons/edit.svg" alt="pencil" />
                                                </BButton>
                                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDeleteMethod(item.id)">
                                                    <img src="@/assets/icons/delete.svg" alt="delete" />
                                                </BButton>
                                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" :to="`/fleet-management/view/${item.id}`">
                                                    <img src="@/assets/icons/view.svg" alt="eye" />
                                                </BButton>
                                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" :to="`/fleet-management/view/${item.id}`">
                                                    <img src="@/assets/icons/copy.svg" width="20" alt="copy" />
                                                </BButton>
                                            </template>

                                            <template #pagination>  

                                                <div class="d-flex justify-content-between mt-3" v-if="config.total_items >= 1">
                                                    <div class="d-flex align-items-center">
                                                        <select id="perPageSelect" v-model="params.limit" class="form-select" >
                                                            <option v-for="option in [10, 20, 30, 50]" :key="option" :value="option">{{ option }}</option>
                                                        </select>
                                                    </div>
                                                    <div class="pagination-wrap hstack gap-2">
                                                        <BButton class="page-item pagination-prev" variant="light"  :disabled="params.page <= 1" @click="params.page--">
                                                            <i class="ri-arrow-left-s-line"></i>
                                                        </BButton>
                                                        <ul class="pagination listjs-pagination mb-0">
                                                            <li :class="{active: pageNumber == params.page, disabled: pageNumber == '...'}" v-for="(pageNumber, index) in config.total_pages" :key="index" @click="changePage(pageNumber)">
                                                            <BButton class="page" >{{ pageNumber }}</BButton>
                                                            </li>
                                                        </ul>
                                                        <BButton class="page-item pagination-next" variant="light"  :disabled="params.page >= config.total_pages" @click="params.page++">
                                                            <i class="ri-arrow-right-s-line"></i>
                                                        </BButton>
                                                    </div>
                                                </div>
                                            </template>
                                        </table-component>
                                    </div>
                                </div> -->
                                <div class="tab-pane fade" id="nav-others" role="tabpanel" aria-labelledby="nav-others-tab" tabindex="0">...</div>
                            </div>
                        </BRow>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>