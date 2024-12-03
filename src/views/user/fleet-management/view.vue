<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import SelectHeader from "@/components/select-header.vue";
// import HeaderPage from "@/components/header-page.vue";
import TableComponent from "@/components/table.vue";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

export default {
    name: "fleet-management-view",
    components: {
        Layout,
        SelectHeader,
        // HeaderPage,
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
                    key: 'note',
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
                    key: 'operator.fullName',
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
            reminderHeaders: [
                {
                    title: 'No',
                    key: 'no',
                    show: true,
                    order:false
                },
                {
                    title: 'Kode',
                    key: 'code',
                    show: true,
                    order:false
                },
                {
                    title: 'Tanggal Dibuat',
                    key: 'date',
                    show: true,
                    order:true
                },
                {
                    title: 'Parameter',
                    key: 'parameter',
                    show: true,
                    order:true
                },
                {
                    title: 'Keterangan',
                    key: 'description',
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
            issueHeaders: [
                {
                    title: 'No',
                    key: 'no',
                    show: true,
                    order:false
                },
                {
                    title: 'Action',
                    key: 'action',
                    show: true,
                    order:false
                },
                {
                    title: 'Kode Issue',
                    key: 'issueCode',
                    show: true,
                    order:false
                },
                {
                    title: 'Kode Fleet',
                    key: 'fleet.code',
                    show: true,
                    order:true
                },
                {
                    title: 'Judul Keluhan',
                    key: 'complaintTitle',
                    show: true,
                    order:true
                },
                {
                    title: 'Prioritas',
                    key: 'priority',
                    show: true,
                    order:true
                },
                {
                    title: 'Status Issue',
                    key: 'status',
                    show: true,
                    order:true
                },
                
            ],
            workOrderHeaders: [
                {
                    title: 'No',
                    key: 'no',
                    show: true,
                    order:false
                },
                {
                    title: 'No.Work Order',
                    key: 'code',
                    show: true,
                    order:false
                },
                {
                    title: 'Judul WO',
                    key: 'title',
                    show: true,
                    order:false
                },
                {
                    title: 'Prioritas',
                    key: 'priority',
                    show: true,
                    order:true
                },
                {
                    title: 'Tanggal & Jam WO',
                    key: 'createdAt',
                    show: true,
                    order:true
                },
                {
                    title: 'Status',
                    key: 'status',
                    show: true,
                    order:true
                },
                {
                    title: 'Action',
                    key: 'action',
                    show: true,
                    order:true
                },
                
            ],
            backlogHeaders: [
                {
                    title: 'No',
                    key: 'no',
                    show: true,
                    order:false
                },
                {
                    title: 'No.Backlog Order',
                    key: 'backlogCode',
                    show: true,
                    order:false
                },
                {
                    title: 'Judul WO',
                    key: 'title',
                    show: true,
                    order:false
                },
                {
                    title: 'Prioritas',
                    key: 'priority',
                    show: true,
                    order:true
                },
                {
                    title: 'Tanggal & Jam WO',
                    key: 'createdAt',
                    show: true,
                    order:true
                },
                {
                    title: 'Status',
                    key: 'status',
                    show: true,
                    order:true
                },
                {
                    title: 'Action',
                    key: 'action',
                    show: true,
                    order:true
                },
                
            ],
            questionerHeaders: [
                {
                    title: 'No',
                    key: 'no',
                    show: true,
                    order:false
                },
                {
                    title: 'Kode Kuesioner',
                    key: 'code',
                    show: true,
                    order:false
                },
                {
                    title: 'Judul Inspeksi',
                    key: 'title',
                    show: true,
                    order:false
                },
                {
                    title: 'Periode',
                    key: 'period',
                    show: true,
                    order:true
                },
                {
                    title: 'Tanggal Penugasan',
                    key: 'dateWork',
                    show: true,
                    order:true
                },
                {
                    title: 'Tanggal Pengisian',
                    key: 'dateFill',
                    show: true,
                    order:true
                },
                {
                    title: 'Status',
                    key: 'status',
                    show: true,
                    order:true
                },
                {
                    title: 'Action',
                    key: 'action',
                    show: true,
                    order:true
                },
                
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
            reject: {
                status: 'rejected',
                rejectReason: '',
            },
            document: [],
            operators: [],
            maintenancePrograms: [],
            parameterHistories: [],
            costHistories: [],
            timesheetHistories: [],
            fuelHistories: [],
            reminders: [
                {code: 'XXXPMR1', date: '19 Sep 2024', parameter: 'Due 500 Km | Current 450 Km', description: 'overdue', action: 'action'},
                {code: 'XXXPMR2', date: '20 Sep 2024', parameter: 'Due 500 Km | Current 450 Km', description: 'duenow', action: 'action'},
                {code: 'XXXPMR3', date: '21 Sep 2024', parameter: 'Due 500 Km | Executed 450 Km', description: 'completed', action: 'action'}
            ],
            issues: [],
            workOrders: [],
            backlogs: [],
            questioners: [
                {code: 'K001', title: 'Lorem Ipsum', period: 'Harian', dateWork: '01 Juni 2024' , dateFill: '-', status: 'waiting', 
                
                },
                {code: 'K002', title: 'Lorem Ipsum', period: 'Mingguan', dateWork: '01 Juni 2024' , dateFill: '12 Juni 2024', status: 'done', 
            
                },
                {code: 'K003', title: 'Lorem Ipsum', period: 'Bulanan', dateWork: '01 Juni 2024' , dateFill: '-', status: 'late', 
            
                },
                {code: 'K004', title: 'Lorem Ipsum', period: 'Tahunan', dateWork: '01 Juni 2024' , dateFill: '-', status: 'nodone', 
            
                },
            ],
            dataMaintenanceProgram: [],
            dataAttachment: [],
            dataTag: [],
            modalHeaderParameter: false,
            modalHeaderCost: false,
            modalHeaderTimesheet: false,
            modalHeaderFuel: false,
            modalHeaderIssue: false,
            modalHeaderWorkOrder: false,
            modalHeaderBacklog: false,
            modalDelete: false,
            modalDeleteParameter: false,
            modalDeleteCost: false,
            modalDeleteTimesheet: false,
            modalDeleteFuel: false,
            modalDeleteIssue: false,
            modalDeleteWorkOrder: false,
            modalDeleteBacklog: false,
            modalApproveParameter: false,
            modalApproveCost: false,
            modalApproveTimesheet: false,
            modalApproveFuel: false,
            modalSettingTolerance: false,
            modalFilterIssue: false,
            modalApproveIssue: false,
            modalRejectIssue: false,
            modalFilterWorkOrder: false,
            modalFilterBacklog: false,
            fleetId: this.$route.params.id,
            fleetParameterId: '',
            fleetCostId: '',
            fleetTimesheetId: '',
            fleetFuelId: '',
            issueId: '',
            workOrderId: '',
            backlogId: '',
            questionerId: '',
            search: '',
        }
    },
    watch: {
        headers: {
            handler(newVal) {
                this.headers = newVal;
            },
            deep: true
        },
        search: {
            handler(){
                if(this.search.length > 1 || this.search.length === 0){
                    this.params.search = this.search
                    if(this.timeout) clearTimeout(this.timeout)
                        this.timeout = setTimeout(() => {
                        if(this.tabItem == 'parameter') this.listDataHistoryParameter()
                        if(this.tabItem == 'cost') this.listDataHistoryCost()
                        if(this.tabItem == 'timesheet') this.listDataHistoryTimesheet()
                        if(this.tabItem == 'fuel') this.listDataHistoryFuel()
                        // this.listDataIssue();
                        // this.listDataWorkOrder();
                        // this.listDataBacklog();
                        // this.listDataQuestioner();
                    }, 500)
                }
                
            }
        }
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
        hideHeaderParameter() {
            this.modalHeaderParameter = false;
        },
        showHeaderParameter() {
            this.modalHeaderParameter = true;
        },
        hideHeaderCost() {
            this.modalHeaderCost = false;
        },
        showHeaderCost() {
            this.modalHeaderCost = true;
        },
        hideHeaderTimesheet() {
            this.modalHeaderTimesheet = false;
        },
        showHeaderTimesheet() {
            this.modalHeaderTimesheet = true;
        },
        hideHeaderFuel() {
            this.modalHeaderFuel = false;
        },
        showHeaderFuel() {
            this.modalHeaderFuel = true;
        },
        showModalSettingTolerance(){
            this.modalSettingTolerance = true
        },
        showModalApproveParameter(id) {
            this.fleetParameterId = id;
            this.modalApproveParameter = true;
        },
        deleteData(){
            axios.delete(process.env.VUE_APP_API_URL + this.url + this.deleteId).then(() => {
                if(this.url == '/v1/fleet-parameters/'){
                    this.listDataHistoryParameter();
                }
                if(this.url == '/v1/fleet-costs/'){
                    this.listDataHistoryCost();
                }
                if(this.url == '/v1/fleet-timesheets/'){
                    this.listDataHistoryTimesheet();
                }
                if(this.url == '/v1/fleet-fuels/'){
                    this.listDataHistoryFuel();
                }
                this.modalDelete = false;
                Swal.fire("Berhasil!", "Berhasil menghapus data", "success");
            }).catch((error) => {
                console.log(error);
            });
        },
        showModalDelete(id, url){     
            this.modalDelete = true
            if(url == 'parameter') {
                this.deleteId = id
                this.url = '/v1/fleet-parameters/'
            }
            if(url == 'cost') {
                this.deleteId = id
                this.url = '/v1/fleet-costs/'
            }
            if(url == 'timesheet') {
                this.deleteId = id
                this.url = '/v1/fleet-timesheets/'
            }
            if(url == 'fuel') {
                this.deleteId = id
                this.url = '/v1/fleet-fuels/'
            }
        },
        showModalDeleteIssue(id){  
            this.issueId = id
            this.modalDeleteIssue = true;
        },
        deleteDataIssue(){  
            axios.delete(process.env.VUE_APP_API_URL + '/v1/issues' + this.issueId).then(() => {
                Swal.fire("Berhasil!", "Berhasil menghapus data", "success");
                this.modalDeleteIssue = false;
            }).catch((error) => {
                console.log(error);
            });
        },
        showModalDeleteWorkOrder(id){  
            this.workOrderId = id
            this.modalDeleteWorkOrder = true;
        },
        deleteDataWorkOrder(){  
            axios.delete(process.env.VUE_APP_API_URL + '/v1/work-orders' + this.workOrderId).then(() => {
                Swal.fire("Berhasil!", "Berhasil menghapus data", "success");
                this.modalDeleteWorkOrder = false;
            }).catch((error) => {
                console.log(error);
            });
        },
        showSelectHeaderBacklog(){
            this.modalHeaderBacklog = true
        },
        showModalFilterBacklog() {
            this.modalFilterBacklog = true;
        },
        showModalDeleteBacklog(id){  
            this.backlogId = id
            this.modalDeleteBacklog = true;
        },
        deleteDataBacklog(){
            axios.delete(process.env.VUE_APP_API_URL + '/v1/backlogs' + this.backlogId).then(() => {
                Swal.fire("Berhasil!", "Berhasil menghapus data", "success");
                this.modalDeleteBacklog = false;
            }).catch((error) => {
                console.log(error);
            });

        },
        showModalFilterIssue() {
            this.modalFilterIssue = true;
        },
        showSelectHeaderIssue() {
            this.modalHeaderIssue = true;
        },
        showModalApproveIssue(id) {
            this.issueId = id
            this.modalApproveIssue = true;
        },
        showModalRejectIssue(id) {
            this.issueId = id
            this.modalRejectIssue = true;
        },
        showSelectHeaderWorkOrder(){
            this.modalHeaderWorkOrder = true
        },
        showModalFilterWorkOrder() {
            this.modalFilterWorkOrder = true;
        },
        showModalApproveCost(id) {
            this.fleetCostId = id;
            this.modalApproveCost = true;
        },
        showModalApproveTimesheet(id) {
            this.fleetTimesheetId = id;
            this.modalApproveTimesheet = true;
        },
        showModalApproveFuel(id) {
            this.fleetFuelId = id;
            this.modalApproveFuel = true;
        },
        
        approveParameter(){
            axios.put(process.env.VUE_APP_API_URL + `/v1/fleet-parameters/${this.fleetParameterId}/approve`).then(() => {
                Swal.fire("Berhasil!", "Berhasil approve data", "success");
                this.modalApproveParameter = false
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal approve data", "error");
                console.log((err));
            });
        }, 
        approveCost(){
            axios.put(process.env.VUE_APP_API_URL + `/v1/fleet-costs/${this.fleetCostId}/approve`).then(() => {
                Swal.fire("Berhasil!", "Berhasil approve data", "success");
                this.modalApproveCost = false
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal approve data", "error");
                console.log((err));
            });
        }, 
        approveTimesheet(){
            axios.put(process.env.VUE_APP_API_URL + `/v1/fleet-timesheets/${this.fleetTimesheetId}/approve`).then(() => {
                Swal.fire("Berhasil!", "Berhasil approve data", "success");
                this.modalApproveTimesheet = false
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal approve data", "error");
                console.log((err));
            });
        }, 
        approveFuel(){
            axios.put(process.env.VUE_APP_API_URL + `/v1/fleet-fuels/${this.fleetFuelId}/approve`).then(() => {
                Swal.fire("Berhasil!", "Berhasil approve data", "success");
                this.modalApproveFuel = false
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal approve data", "error");
                console.log((err));
            });
        }, 
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
                    const finance = data.finance
                    this.data.finance = finance
                    this.data.finance.firstPaymentAt = finance.firstPaymentAt.split('')[0]
                    this.data.finance.firstPaymentAt = moment(finance.firstPaymentAt).format('DD MMMM  YYYY');
                    this.data.finance.endPaymentAt = finance.endPaymentAt.split('')[0]
                    this.data.finance.endPaymentAt = moment(finance.endPaymentAt).format('DD MMMM  YYYY');
                    this.data.finance.paymentDate = finance.paymentDate.split('')[0]
                    this.data.finance.paymentDate = moment(finance.paymentDate).format('DD MMMM  YYYY');
                    this.data.ownBy = data.ownBy
                    this.data.buyPrice = data.buyPrice
                    this.data.ageEstimation = data.ageEstimation
                    this.data.terminalValue = data.terminalValue
                    this.dataMaintenanceProgram = data.maintenancePrograms.map((maintenanceProgram, index) => {
                        console.log(index)
                        return {
                            id: maintenanceProgram.id,
                            maintenanceProgramId: maintenanceProgram.maintenanceProgramId,
                            lastMaintenancePoint: maintenanceProgram.lastMaintenancePoint,
                            isDelete: false
                        }
                    })
                    data.tags.map((tag) => {
                        this.dataTag.push(tag)
                    })
                    data.attachments.map((attachment) => {
                        
                        this.dataAttachment.push(attachment)
                    })
                    console.log(this.dataAttachment)
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
                this.operatorName = this.timesheetHistories.operator.fullName
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
        listDataMaintenanceProgram() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/maintenance-programs').then((response) => {
                this.maintenancePrograms = response.data.data.items
                this.config.total_items = response.data.data.meta.totalItems
                this.config.total_pages = response.data.data.meta.totalPages
            }).catch((error) => {
                console.log(error);
            });
        },
        listDataIssue(){
            axios.get(process.env.VUE_APP_API_URL + '/v1/issues', {
                params: this.params
            }).then((response) => {
                this.issues = response.data.data.items
                this.issueId = response.data.data.items.id
                this.config.total_items = response.data.data.meta.totalItems
                this.config.total_pages = response.data.data.meta.totalPages
            }).catch((error) => {
                console.log(error);
            });
        },
        listDataWorkOrder(){
            axios.get(process.env.VUE_APP_API_URL + '/v1/work-orders', {
                params: this.params
            }).then((response) => {
                this.workOrders = response.data.data.items
                this.workOrderId = response.data.data.items.id
                this.config.total_items = response.data.data.meta.totalItems
                this.config.total_pages = response.data.data.meta.totalPages
            }).catch((error) => {
                console.log(error);
            });
        },
        listDataBacklog(){
            axios.get(process.env.VUE_APP_API_URL + '/v1/backlogs', {
                params: this.params
            }).then((response) => {
                this.backlogs = response.data.data.items
                this.backlogId = response.data.data.items.id
                this.config.total_items = response.data.data.meta.totalItems
                this.config.total_pages = response.data.data.meta.totalPages
            }).catch((error) => {
                console.log(error);
            });
        },
        listDataQuestioner(){
            axios.get(process.env.VUE_APP_API_URL + '/v1/questioners', {
                params: this.params
            }).then((response) => {
                this.questioners = response.data.data.items
                this.questionerId = response.data.data.items.id
                this.config.total_items = response.data.data.meta.totalItems
                this.config.total_pages = response.data.data.meta.totalPages
            }).catch((error) => {
                console.log(error);
            });
        },
        exportParameter() {
			axios.defaults.responseType = 'blob';
			axios.get(process.env.VUE_APP_API_URL+'/v1/fleet-parameters/export', {
                params:{
					sortBy:"createdAt.asc",
					search:"",
					fleetId: this.fleetId,
				}
            }).then((res) => {
					const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.ms-excel' }));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', `History Parameter.xlsx`);
					document.body.appendChild(link);
					link.click();
					axios.defaults.responseType = 'json'

				});
		},
        exportCost() {
			axios.defaults.responseType = 'blob';
			axios.get(process.env.VUE_APP_API_URL+'/v1/fleet-costs/export', {
                params:{
					sortBy:"createdAt.asc",
					search:"",
					fleetId: this.fleetId,
				}
            }).then((res) => {
					const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.ms-excel' }));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', `History Cost.xlsx`);
					document.body.appendChild(link);
					link.click();
					axios.defaults.responseType = 'json'

				});
		},
        exportTimesheet() {
			axios.defaults.responseType = 'blob';
			axios.get(process.env.VUE_APP_API_URL+'/v1/fleet-timesheets/export', {
                params:{
					sortBy:"createdAt.asc",
					search:"",
					fleetId: this.fleetId,
				}
            }).then((res) => {
					const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.ms-excel' }));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', `History Timesheets.xlsx`);
					document.body.appendChild(link);
					link.click();
					axios.defaults.responseType = 'json'

				});
		},
        exportFuel() {
			axios.defaults.responseType = 'blob';
			axios.get(process.env.VUE_APP_API_URL+'/v1/fleet-fuels/export', {
                params:{
					sortBy:"createdAt.asc",
					search: "",
					fleetId: this.fleetId,
				}
            }).then((res) => {
					const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.ms-excel' }));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', `History Fuel.xlsx`);
					document.body.appendChild(link);
					link.click();
					axios.defaults.responseType = 'json'

				});
		},
        exportWorkOrder() {
			axios.defaults.responseType = 'blob';
			axios.get(process.env.VUE_APP_API_URL+'/v1/work-orders/download', {
                params:{
					sortBy:"",
					search:"",
					limit:"",
					page:"",
				}
            }).then((res) => {
					const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.ms-excel' }));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', `Work Order.xlsx`);
					document.body.appendChild(link);
					link.click();
					axios.defaults.responseType = 'json'

				});
		},
        exportBacklog() {
			axios.defaults.responseType = 'blob';
			axios.get(process.env.VUE_APP_API_URL+'/v1/backlogs/download', {
                params:{
					sortBy:"",
					search:"",
					limit:"",
					page:"",
				}
            }).then((res) => {
					const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.ms-excel' }));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', `Backlog.xlsx`);
					document.body.appendChild(link);
					link.click();
					axios.defaults.responseType = 'json'

				});
		},
        rejectDataIssue(){
            axios.put(process.env.VUE_APP_API_URL + `/v1/issues/${this.issueId}/status`, this.reject).then(() => {
                Swal.fire("Berhasil!", "Berhasil reject data", "success");
                this.modalRejectIssue = false
            }).catch((error) => {
                Swal.fire("Gagal!", "Gagal reject data", "error");
                console.log(error)
            })
        },
        approveDataIssue(){
            axios.put(process.env.VUE_APP_API_URL + `/v1/issues/${this.issueId}/status`, {status: 'approved'}).then(() => {
                Swal.fire("Berhasil!", "Berhasil approve data", "success");
                this.modalApproveIssue = false
            }).catch((error) => {
                Swal.fire("Gagal!", "Gagal approve data", "error");
                console.log(error)
            })
        },
        searchHandler(event, tabItem){
            this.search = event.target.value
            this.tabItem = tabItem
        },
    },
    mounted() {
        
        window.addEventListener("resize", this.resizerightcolumn);
        this.fetchData();
        this.listDataIssue();
        this.listDataWorkOrder();
        this.listDataBacklog();
        this.listDataQuestioner();
        this.listDataOperator();
        this.listDataMaintenanceProgram();    
        this.listDataHistoryParameter();
        this.listDataHistoryCost();
        this.listDataHistoryTimesheet();
        this.listDataHistoryFuel();
        
    }

};
</script>

<template>
    <Layout>
        <SelectHeader :showModal="modalHeaderParameter" :headers="parameterHistoryHeaders" @hideModal="hideHeaderParameter" @selectHeader="showHeaderParameter" />
        <SelectHeader :showModal="modalHeaderCost" :headers="costHistoryHeaders" @hideModal="hideHeaderCost" @selectHeader="showHeaderCost" />
        <SelectHeader :showModal="modalHeaderTimesheet" :headers="timesheetHistoryHeaders" @hideModal="hideHeaderTimesheet" @selectHeader="hideHeaderTimesheet" />
        <SelectHeader :showModal="modalHeaderFuel" :headers="fuelHistoryHeaders" @hideModal="hideHeaderFuel" @selectHeader="hideHeaderFuel" />
        <SelectHeader :showModal="modalHeaderIssue" :headers="issueHeaders" @hideModal="hideHeaderIssue" @selectHeader="hideHeaderIssue" />
        <SelectHeader :showModal="modalHeaderWorkOrder" :headers="workOrderHeaders" @hideModal="hideHeaderWorkOrder" @selectHeader="hideHeaderWorkOrder" />
        <SelectHeader :showModal="modalHeaderBacklog" :headers="backlogHeaders" @hideModal="hideHeaderBacklog" @selectHeader="hideHeaderBacklog" />
        
        <BModal v-model="modalDelete" hide-footer hide-header-close centered  class="v-modal-custom" size="sm">
            <div class="text-center">
                <b class="fs-14">Apakah anda yakin menghapus data ini?</b>
                <div class="d-flex justify-content-center mt-4">
                    <BButton variant="dark" class="me-2" @click="modalDelete = false">Tidak</BButton>
                    <BButton variant="light" @click="deleteData">Ya</BButton>
                </div>
            </div>
        </BModal>
        <BModal v-model="modalDeleteParameter" hide-footer hide-header-close centered  class="v-modal-custom" size="sm">
            <div class="text-center">
                <b class="fs-14">Apakah anda yakin menghapus data ini?</b>
                <div class="d-flex justify-content-center mt-4">
                    <BButton variant="dark" class="me-2" @click="modalDeleteParameter = false">Tidak</BButton>
                    <BButton variant="light" @click="deleteDataParameter">Ya</BButton>
                </div>
            </div>
        </BModal>
        <BModal v-model="modalDeleteCost" hide-footer hide-header-close centered  class="v-modal-custom" size="sm">
            <div class="text-center">
                <b class="fs-14">Apakah anda yakin menghapus data ini?</b>
                <div class="d-flex justify-content-center mt-4">
                    <BButton variant="dark" class="me-2" @click="modalDeleteCost = false">Tidak</BButton>
                    <BButton variant="light" @click="deleteDataCost">Ya</BButton>
                </div>
            </div>
        </BModal>
        <BModal v-model="modalDeleteTimesheet" hide-footer hide-header-close centered  class="v-modal-custom" size="sm">
            <div class="text-center">
                <b class="fs-14">Apakah anda yakin menghapus data ini?</b>
                <div class="d-flex justify-content-center mt-4">
                    <BButton variant="dark" class="me-2" @click="modalDeleteTimesheet = false">Tidak</BButton>
                    <BButton variant="light" @click="deleteDataTimesheet">Ya</BButton>
                </div>
            </div>
        </BModal>
        <BModal v-model="modalDeleteFuel" hide-footer hide-header-close centered  class="v-modal-custom" size="sm">
            <div class="text-center">
                <b class="fs-14">Apakah anda yakin menghapus data ini?</b>
                <div class="d-flex justify-content-center mt-4">
                    <BButton variant="dark" class="me-2" @click="modalDeleteFuel = false">Tidak</BButton>
                    <BButton variant="light" @click="deleteDataFuelmodalDeleteFuel">Ya</BButton>
                </div>
            </div>
        </BModal>
        <BModal v-model="modalDeleteIssue" hide-footer hide-header-close centered  class="v-modal-custom" size="sm">
            
            <div class="text-center">
                <b class="fs-14">Apakah anda yakin menghapus data ini?</b>
                <div class="d-flex justify-content-center mt-4">
                    <BButton variant="dark" class="me-2" @click="modalDeleteIssue = false">Tidak</BButton>
                    <BButton variant="light" @click="deleteDataIssue">Ya</BButton>
                </div>
            </div>
        </BModal>
        <BModal v-model="modalDeleteWorkOrder" hide-footer hide-header-close centered  class="v-modal-custom" size="sm">
            <div class="text-center">
                <b class="fs-14">Apakah anda yakin menghapus data ini?</b>
                <div class="d-flex justify-content-center mt-4">
                    <BButton variant="dark" class="me-2" @click="modalDeleteWorkOrder = false">Tidak</BButton>
                    <BButton variant="light" @click="deleteDataWorkOrder">Ya</BButton>
                </div>
            </div>
        </BModal>
        <BModal v-model="modalDeleteBacklog" hide-footer hide-header-close centered  class="v-modal-custom" size="sm">
            <div class="text-center">
                <b class="fs-14">Apakah anda yakin menghapus data ini?</b>
                <div class="d-flex justify-content-center mt-4">
                    <BButton variant="dark" class="me-2" @click="modalDeleteBacklog = false">Tidak</BButton>
                    <BButton variant="light" @click="deleteDataBacklog">Ya</BButton>
                </div>
            </div>
        </BModal>    
        <BModal v-model="modalApproveIssue" hide-footer hide-header-close centered  class="v-modal-custom" size="sm">
            
            <div class="text-center">
                <b class="fs-14">Apakah anda yakin mengkonfirmasi data ini?</b>
                <div class="d-flex justify-content-center mt-4">
                    <BButton variant="dark" class="me-2" @click="modalApproveIssue = false">Kembali</BButton>
                    <BButton variant="light" @click="approveDataIssue">Ya</BButton>
                </div>
            </div>
        </BModal>
        <BModal v-model="modalRejectIssue" hide-footer title="Reject" centered  class="v-modal-custom" size="sm">
            <div class="">
                <p class="fs-14">Silahkan tuliskan alasan menolak backlog ini</p>
                <div>
                    <label for="">Alasan</label>
                    <BFormInput v-model="reject.rejectReason" placeholder="Tuliskan alasan"></BFormInput>
                </div>
                <div class="d-flex justify-content-end mt-4">
                    <BButton variant="dark" @click="rejectDataIssue">Kirim</BButton>
                </div>
            </div>
        </BModal>
        <BModal v-model="modalFilterIssue" hide-footer title="Filter" centered  class="v-modal-custom" size="400">
            
            <BRow class="gy-4">
                <BCol md="12">
                    <label for="">Prioritas</label>
                    <BFormSelect
                    >
                        <template #first>
                            <BFormSelectOption value="" disabled>Pilih Prioritas</BFormSelectOption>
                        </template>
                    </BFormSelect>
                </BCol>
                <BCol md="12">
                    <label for="">Tanggal Keluhan</label>
                    <div class="d-flex align-items-center">
                        <div class="w-50">
                            <BFormInput type="date">
        
                            </BFormInput>
                        </div>
                        <div class="mx-2">
                            -
                        </div>
                        <div class="w-50">
                            <BFormInput type="date">
        
                            </BFormInput>
                        </div>
                    </div>
                </BCol>
                <BCol md="12">
                    <label for="">Tanggal Harus Diselesaikan</label>
                    <div>
                        <BFormInput type="date">
                        </BFormInput>
                    </div>
                </BCol>
                <BCol md="12">
                    <label for="">Status Keterlambatan</label>
                    <BFormSelect
                    >
                        <template #first>
                            <BFormSelectOption value="" disabled>Pilih Status</BFormSelectOption>
                        </template>
                    </BFormSelect>
                </BCol>
                <BCol md="12">
                    <label for="">Status Issue</label>
                    <BFormSelect
                    >
                        <template #first>
                            <BFormSelectOption value="" disabled>Pilih Status</BFormSelectOption>
                        </template>
                    </BFormSelect>
                </BCol>
                <BCol md="12">
                    <label for="">Label Bebas</label>
                    <BFormSelect
                    >
                        <template #first>
                            <BFormSelectOption value="" disabled>Pilih label bebas</BFormSelectOption>
                        </template>
                    </BFormSelect>
                </BCol>
                <div class="d-flex justify-content-end mt-4">
                    <BButton variant="light" class="me-2">Reset</BButton>
                    <BButton variant="dark" @click="FilterDataIssue">Terapkan</BButton>
                </div>
            </BRow>
        </BModal>
        <BModal v-model="modalFilterWorkOrder" hide-footer title="Filter" centered  class="v-modal-custom" size="400">
            
            <BRow class="gy-4">
                <BCol md="12">
                    <label for="">Tipe Fleet</label>
                    <BFormSelect
                    >
                        <template #first>
                            <BFormSelectOption value="" disabled>Pilih tipe</BFormSelectOption>
                        </template>
                    </BFormSelect>
                </BCol>
                <BCol md="12">
                    <label for="">Jenis WO</label>
                    <BFormSelect
                    >
                        <template #first>
                            <BFormSelectOption value="" disabled>Pilih jenis WO</BFormSelectOption>
                        </template>
                    </BFormSelect>
                </BCol>
                <BCol md="12">
                    <label for="">Periodic WO</label>
                    <BFormSelect
                    >
                        <template #first>
                            <BFormSelectOption value="" disabled>Pilih periodic WO</BFormSelectOption>
                        </template>
                    </BFormSelect>
                </BCol>
                <BCol md="12">
                    <label for="">Kategori Kerusakan</label>
                    <BFormSelect
                    >
                        <template #first>
                            <BFormSelectOption value="" disabled>Pilih kategori</BFormSelectOption>
                        </template>
                    </BFormSelect>
                </BCol>
                <BCol md="12">
                    <label for="">Prioritas</label>
                    <BFormSelect
                    >
                        <template #first>
                            <BFormSelectOption value="" disabled>Pilih prioritas</BFormSelectOption>
                        </template>
                    </BFormSelect>
                </BCol>
                <BCol md="12">
                    <label for="">Tanggal Mulai</label>
                    <div class="d-flex align-items-center">
                        <div class="w-50">
                            <BFormInput type="date">
        
                            </BFormInput>
                        </div>
                        <div class="mx-2">
                            -
                        </div>
                        <div class="w-50">
                            <BFormInput type="date">
        
                            </BFormInput>
                        </div>
                    </div>
                </BCol>
                <BCol md="12">
                    <label for="">Tanggal Target Selesai</label>
                    <div class="d-flex align-items-center">
                        <div class="w-50">
                            <BFormInput type="date">
        
                            </BFormInput>
                        </div>
                        <div class="mx-2">
                            -
                        </div>
                        <div class="w-50">
                            <BFormInput type="date">
        
                            </BFormInput>
                        </div>
                    </div>
                </BCol>
                <BCol md="12">
                    <label for="">Tanggal Aktual Selesai</label>
                    <div class="d-flex align-items-center">
                        <div class="w-50">
                            <BFormInput type="date">
        
                            </BFormInput>
                        </div>
                        <div class="mx-2">
                            -
                        </div>
                        <div class="w-50">
                            <BFormInput type="date">
        
                            </BFormInput>
                        </div>
                    </div>
                </BCol>
                
                <BCol md="12">
                    <label for="">Status</label>
                    <BFormSelect
                    >
                        <template #first>
                            <BFormSelectOption value="" disabled>Pilih Status</BFormSelectOption>
                        </template>
                    </BFormSelect>
                </BCol>
                <div class="d-flex justify-content-end mt-4">
                    <BButton variant="light" class="me-2">Reset</BButton>
                    <BButton variant="dark" @click="FilterDataWorkOrder">Terapkan</BButton>
                </div>
            </BRow>
        </BModal> -->
        <BModal v-model="modalApproveParameter" hide-footer centered  class="v-modal-custom">
            <div class="d-flex">
                <div class="img w-50">
                    <img src="@/assets/images/nft/img-01.jpg" class="w-100 rounded-2" alt="">
                </div>
                <div class="text w-50 p-3">
                    <b class="fs-14">Apa anda ingin mengapprove data ini?</b>
                    <p>Silahkan periksa kembali apakah data sudah sesuai</p> 
                    <p>Parameter</p> 
                </div>
            </div>
            <div class="d-flex justify-content-center mt-4">
                <BButton variant="dark" class="me-2" @click="modalApproveParameter = false">Tidak</BButton>
                <BButton variant="light" @click="approveParameter()">Ya</BButton>
            </div>
        </BModal>
        <BModal v-model="modalApproveCost" hide-footer centered  class="v-modal-custom">
            <div class="d-flex">
                <div class="img w-50">
                    <img src="@/assets/images/nft/img-01.jpg" class="w-100 rounded-2" alt="">
                </div>
                <div class="text w-50 p-3">
                    <b class="fs-14">Apa anda ingin mengapprove data ini?</b>
                    <p>Silahkan periksa kembali apakah data sudah sesuai</p> 
                    <p>Biaya</p> 
                </div>
            </div>
            <div class="d-flex justify-content-center mt-4">
                <BButton variant="dark" class="me-2" @click="modalApproveCost = false">Tidak</BButton>
                <BButton variant="light" @click="approveCost()">Ya</BButton>
            </div>
        </BModal>
        <BModal v-model="modalApproveTimesheet" hide-footer centered  class="v-modal-custom">
            <div class="d-flex">
                <div class="img w-50">
                    <img src="@/assets/images/nft/img-01.jpg" class="w-100 rounded-2" alt="">
                </div>
                <div class="text w-50 p-3">
                    <b class="fs-14">Apa anda ingin mengapprove data ini?</b>
                    <p>Silahkan periksa kembali apakah data sudah sesuai</p> 
                    <p>Tanggal</p> 
                    <p>Jam Kerja</p> 
                </div>
            </div>
            <div class="d-flex justify-content-center mt-4">
                <BButton variant="dark" class="me-2" @click="modalApproveTimesheet = false">Tidak</BButton>
                <BButton variant="light" @click="approveTimesheet()">Ya</BButton>
            </div>
        </BModal>
        <BModal v-model="modalApproveFuel" hide-footer centered  class="v-modal-custom">
            <div class="d-flex">
                <div class="img w-50">
                    <img src="@/assets/images/nft/img-01.jpg" class="w-100 rounded-2" alt="">
                </div>
                <div class="text w-50 p-3">
                    <b class="fs-14">Apa anda ingin mengapprove data ini?</b>
                    <p>Silahkan periksa kembali apakah data sudah sesuai</p> 
                    <div class="border-bottom mb-3">
                        <div class="d-flex justify-content-between">
                            <p>Liter</p>
                            <p>10L</p>
                        </div> 
                        <div class="d-flex justify-content-between">
                            <p>Harga/Liter</p> 
                            <p>Rp.10.00</p>
                        </div> 
                    </div>
                    <div class="d-flex justify-content-between">
                        <p>Total Harga</p> 
                        <p>Rp.100.000</p>
                    </div> 
                </div>
            </div>
            <div class="d-flex justify-content-center mt-4">
                <BButton variant="dark" class="me-2" @click="modalApproveFuel = false">Tidak</BButton>
                <BButton variant="light" @click="approveFuel()">Ya</BButton>
            </div>
        </BModal>
        <BModal v-model="modalSettingTolerance" title="Setting Toleransi" hide-footer centered  class="v-modal-custom">
            <div>
                <label for="">Masukkan angka <span class="text-danger">*</span></label>
                <div class="input-group">
                    <input type="text" class="form-control border-end-0" placeholder="0">
                    <span class="input-group-text border-start-0">%</span>
                </div>
            </div>
            <div class="d-flex justify-content-end mt-4">
                <BButton variant="light" class="me-2" @click="modalSettingTolerance = false">Batal</BButton>
                <BButton variant="dark" @click="settingTolerance()" >Simpan</BButton>
            </div>
        </BModal>
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
                                <img :src="data.photo" class="object-fit-cover" alt="photo" style="width: 100%; height: 150px;">
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
                                                <h5><span class="px-3">: </span></h5>
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
                                            <BRow class="gy-4">
                                                <h3 class="mb-2">Umum</h3>
                                                <BCol md="6">
                                                    <label for="dimensi" class="form-label">Dimensi </label>                                        
                                                    <BRow>
                                                        <BCol md="4">
                                                        <div>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control" id="width" :value="data.width + 'm'" required disabled>
                                                            </div>
                                                        </div>
                                                    </BCol>
                                                    <BCol md="4">
                                                        <div>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control" id="height" :value="data.height + 'm'" required disabled>
                                                                
                                                            </div>
                                                        </div>
                                                    </BCol>
                                                    <BCol md="4">
                                                        <div>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control" id="length" :value="data.length + 'm'" required disabled>
                                                                
                                                            </div>
                                                        </div>
                                                    </BCol>
                                                    </BRow>
                                                </BCol>
                                                <BCol md="6">
                                                    <div>
                                                        <label for="weight" class="form-label">Berat </label>
                                                        <input type="text" class="form-control" id="weight" :value="data.weight + 'kg'" required disabled>
                                                    </div>
                                                </BCol>
                                            
                                                <BCol md="6">
                                                    <label for="efficiency" class="form-label">Efesiensi BBM (berdasarkan buku manual faktur) <span class="text-danger">*</span></label>
                                                    <div class="input-group">
                                                        <input type="number" class="form-control border-end-0" v-model="data.fuelEfficiency" disabled>
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
                                            <BRow class="gy-4">
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
                                                        <div class="bg-light w-100 rounded border d-flex align-items-center" style="height: 40px">
                                                            <div class="bg-white py-1 px-2 ms-2 rounded-2" v-for="(tag, index) in dataTag" :key="index">
                                                                <span>{{ tag }}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </BCol>
                                                <BCol md="12" v-for="(maintenanceProgram, index) in data.maintenancePrograms" :key="index">
                                                    <BRow v-for="(maintenanceProgram, index) in dataMaintenanceProgram" :key="index">
                                                        <BCol md="6">
                                                            <div>
                                                                <label for="program-management" class="form-label">Program Maintenance <span class="text-danger">*</span></label>
                                                                <div >
                                                                    <select  id="program-management" v-model="dataMaintenanceProgram[index].maintenanceProgramId" class="form-select" required disabled>
                                                                        <option v-for="(maintenanceProgram, index) in  maintenancePrograms" :key="index" :value="maintenanceProgram.id">{{  maintenanceProgram.name }}</option>
                                                                    </select>
                                                                </div>
                                                                
                                                            </div>
                                                        </BCol>
                                                        <BCol md="6">
                                                            <div>
                                                                <label for="starting-point" class="form-label">Starting Point <span class="text-danger">*</span></label>
                                                                <div class="d-flex justify-content-between">
                                                                    <input type="number" class="form-control" v-model="dataMaintenanceProgram[index].lastMaintenancePoint" placeholder="0 km" aria-label="starting-point" aria-describedby="starting-point" disabled>
                                                                </div>
                                                                
                                                            </div>
                                                        </BCol>
                                                    </BRow>
                                                </BCol>
                                                <BCol md="12">
                                                    <BRow v-for="(attachment,index) in dataAttachment" :key="index">
                                                        <div>
                                                            <label for="attachment" class="form-label">Attachment <span class="text-danger">*</span></label>
                                                            <div class="mb-3 d-flex justify-content-between">
                                                                <div class="input-group">
                                                                    <input type="text" class="form-control" :value="attachment" disabled>
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
                                            <BRow class="gy-4">
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
                                                        <input type="text" class="form-control" v-model="data.finance.firstPaymentAt" id="first-payment-date" required disabled>
                                                    </div>
                                                </BCol>
                                                <BCol md="3">
                                                    <div>
                                                        <label for="end-payment-date" class="form-label">End Payment Date <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" v-model="data.finance.endPaymentAt" id="end-payment-date" required disabled>
                                                    </div>
                                                </BCol>
                                                <BCol md="6">
                                                    <div>
                                                        <label for="tenor" class="form-label">Tenor <span class="text-danger">*</span></label>
                                                        <div class="input-group">
                                                            <input type="text" :value="`${data.finance.tenor} ${data.finance.tenorUnit === 'month' ? 'Bulan' : 'Kali'}`" class="form-control w-75" placeholder="0" aria-label="tenor" aria-describedby="tenor" disabled>
                                                            <!-- <select class="form-select" v-model="data.finance.tenorUnit" disabled>
                                                                <option value="time">Kali</option>
                                                                <option value="month">Bulan</option>
                                                            </select> -->
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
                                                        <label for="tenor" class="form-label">Tenor Ke<span class="text-danger">*</span></label>
                                                        <input type="number" class="form-control" v-model="data.finance.tenor" id="tenor" placeholder="0" required disabled>
                                                        
                                                    </div>
                                                </BCol>
                                                <BCol md="6">
                                                    <div>
                                                        <label for="payment-date" class="form-label">Payment Date <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" v-model="data.finance.paymentDate" id="payment-date"  required disabled>
                                                    </div>
                                                </BCol>
                                                <BCol md="3">
                                                    <div>
                                                        <label for="first-payment-date" class="form-label">First Payment Date <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" v-model="data.finance.firstPaymentAt" id="first-payment-date" placeholder="Rp 0" required disabled>
                                                    </div>
                                                </BCol>
                                                <BCol md="3">
                                                    <div>
                                                        <label for="end-payment-date" class="form-label">End Payment Date <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" v-model="data.finance.endPaymentAt" id="end-payment-date" placeholder="Rp 0" required disabled>
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
                                            <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showHeaderParameter">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </BButton>
                                            <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                                                <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                                    <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="search" @input="searchHandler($event, 'parameter')">
                                                    <i class="ri-search-line search-icon"></i>
                                                </div>
                                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportParameter">
                                                    Export CSV
                                                </BButton>
                                                <router-link :to="{ name: 'fleet-management-parameter-history-create'}">
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
                                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDelete(item.id, 'parameter')">
                                                    <img src="@/assets/icons/delete.svg" alt="delete" />
                                                </BButton>
                                                <BButton variant="link" class="link-opacity-75 bg-success rounded-2" size="sm" @click="showModalApproveParameter(item.id)">
                                                    <img src="@/assets/icons/check.svg" width="12" alt="check" />
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
                                <div class="tab-pane fade" id="nav-history-cost" role="tabpanel" aria-labelledby="nav-history-cost-tab" tabindex="0">
                                    <div class="d-flex flex-wrap justify-content-between py-lg-4">
                                        <h4 class="card-title mb-0">Histori Biaya</h4>

                                        <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                                            <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showHeaderCost">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </BButton>
                                            <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                                                <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                                    <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="search" @input="searchHandler($event, 'cost')">
                                                    <i class="ri-search-line search-icon"></i>
                                                </div>
                                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportCost">
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
                                                <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/fleet-management/cost-history/edit/${item.id}`">
                                                    <img src="@/assets/icons/edit.svg" alt="pencil" />
                                                </BButton>
                                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDelete(item.id, 'cost')">
                                                    <img src="@/assets/icons/delete.svg" alt="delete" />
                                                </BButton>
                                                <BButton variant="link" class="link-opacity-75 bg-success rounded-2" size="sm" @click="showModalApproveCost(item.id)">
                                                    <img src="@/assets/icons/check.svg" width="12" alt="check" />
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
                                            <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showHeaderTimesheet">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </BButton>
                                            <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                                                <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                                    <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="search" @input="searchHandler($event, 'timesheet')">
                                                    <i class="ri-search-line search-icon"></i>
                                                </div>
                                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportTimesheet">
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
                                                <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/fleet-management/timesheet-history/edit/${item.id}`">
                                                    <img src="@/assets/icons/edit.svg" alt="pencil" />
                                                </BButton>
                                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDelete(item.id, 'timesheet')">
                                                    <img src="@/assets/icons/delete.svg" alt="delete" />
                                                </BButton>
                                                <BButton variant="link" class="link-opacity-75 bg-success mx-1 rounded-2" size="sm" @click="showModalApproveTimesheet(item.id)">
                                                    <img src="@/assets/icons/check.svg" width="12" alt="check" />
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
                                            <h4 class="card-title mb-3">Histori BBM</h4>
                                            <h5 class="card-subtitle mb-0">Rata-Rata Efisiensi BBM: </h5>
                                        </div>

                                        <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                                            <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showHeaderFuel">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </BButton>
                                        
                                            

                                            <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                                                <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                                    <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="search" @input="searchHandler($event, 'fuel')">
                                                    <i class="ri-search-line search-icon"></i>
                                                </div>
                                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportFuel">
                                                    Export CSV
                                                </BButton>
                                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showModalSettingTolerance">
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
                                                <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/fleet-management/fuel-history/edit/${item.id}`">
                                                    <img src="@/assets/icons/edit.svg" alt="pencil" />
                                                </BButton>
                                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDelete(item.id, 'fuel')">
                                                    <img src="@/assets/icons/delete.svg" alt="delete" />
                                                </BButton>
                                                <BButton variant="link" class="link-opacity-75 bg-success mx-1 rounded-2" size="sm" @click="showModalApproveFuel(item.id)">
                                                    <img src="@/assets/icons/check.svg" width="12" alt="check" />
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
                                <div class="tab-pane fade" id="nav-others" role="tabpanel" aria-labelledby="nav-others-tab" tabindex="0">
                                    <BRow class="gy-4">
                                        <BCol lg="12">
                                            <div class="reminders border shadow-sm rounded-4">
                                                <div class="d-flex justify-content-between align-items-center border-bottom">
                                                    <div class="p-4 d-flex align-items-center">
                                                        <h4>Reminders </h4><BBadge class="fs-16 d-flex align-items-center justify-content-center rounded-circle ms-2" variant="danger">2</BBadge> <i class="bx bxs-info-circle fs-22 ms-2"></i>
                                                    </div>
                                                    <div>
                                                        <BButton variant="link">
                                                            <i class="bx bx-chevron-down fs-22"></i>
                                                        </BButton>
                                                    </div>
                                                </div>
                                                <table-component :headers="reminderHeaders" :data="reminders" :action="action" v-if="reminders.length > 0" @sort="sort($event.sortBy)">
                                                    <template #no="{ index }">
                                                        {{ index + 1 }}
                                                    </template>

                                                    <template #description="{ item }">
                                                        <BBadge :variant="item.description === 'overdue' ? 'danger' : item.description === 'duenow' ? 'warning' : 'success'" pill size="sm">
                                                            {{ item.description == 'overdue' ? 'Overdue' : item.description == 'Due Now' ? 'duenow' : 'Completed' }}
                                                        </BBadge>
                                                        
                                                    </template>
                                                    <template #action="{  }">
                                                        <BButton variant="primary" size="sm">
                                                            Kerjakan
                                                        </BButton>
                                                        
                                                    </template>

                                                </table-component>
                                                <div class="d-flex py-5 px-3">

                                                </div>
                                            </div>
                                        </BCol>
                                        <BCol lg="12">
                                            <div class="issues border shadow-sm rounded-4">
                                                <div class="d-flex justify-content-between align-items-center border-bottom">
                                                    <div class="p-4 d-flex align-items-center">
                                                        <h4>Issue </h4><BBadge class="fs-16 d-flex align-items-center justify-content-center rounded-circle ms-2" variant="danger">2</BBadge> <i class="bx bxs-info-circle fs-22 ms-2"></i>
                                                    </div>
                                                    <div>
                                                        <BButton variant="link">
                                                            <i class="bx bx-chevron-down fs-22"></i>
                                                        </BButton>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-wrap justify-content-between p-lg-4">
                                                    <div>
                                                        <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showSelectHeaderIssue">
                                                            <i class="bx bx-dots-vertical-rounded"></i>
                                                        </BButton>
                                                        <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showModalFilterIssue">
                                                            <img src="@/assets/icons/filter.svg" alt="filter" />
                                                        </BButton>
                                                    </div>
    
                                                    <div>
                                                        <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                                            <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="search">
                                                            <i class="ri-search-line search-icon"></i>
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                                <div class="live-preview">
                                                    <table-component :headers="issueHeaders" :data="issues" :action="action" v-if="issues.length > 0" @sort="sort($event.sortBy)">
                                                        <template #no="{ index }">
                                                            {{ index + 1 }}
                                                        </template>
                                                        <template #status="{ item }">
                                                            <BBadge v-if="item.status ==='open'" variant="success" pill>
                                                                Terbuka
                                                            </BBadge>
                                                            <BBadge v-else-if="item.status ==='rejected'" variant="danger" pill>
                                                                Ditolak
                                                            </BBadge>
                                                            <BBadge v-else-if="item.status ==='approved'" variant="danger" pill>
                                                                Diterima
                                                            </BBadge>
                                                            <BBadge v-else variant="danger" pill>
                                                                Tertutup
                                                            </BBadge>
                                                        </template>
                                                        <template #action="{ item }">
                                                            <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/issue-report/edit/${item.id}`">
                                                                <img src="@/assets/icons/edit.svg" alt="pencil" />
                                                            </BButton>
                                                            <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDeleteIssue(item.id)">
                                                                <img src="@/assets/icons/delete.svg" alt="delete" />
                                                            </BButton>
                                                            <BButton variant="link" class="link-opacity-75" size="sm" :to="`/issue-report/view/${item.id}`">
                                                                <img src="@/assets/icons/view.svg" alt="eye" />
                                                            </BButton> 
                                                            <BButton variant="success" class="rounded-circle mx-3" size="sm" squared="true" v-if="item.status !== 'rejected' && item.status !== 'approved'" @click="showModalApproveIssue(item.id)">
                                                                <img src="@/assets/icons/check.svg" width="10" height="10" alt="check" />
                                                            </BButton>
                                                            <BButton variant="danger" class="rounded-circle" size="sm" squared="true" v-if="item.status !== 'rejected' && item.status !== 'approved'" @click="showModalRejectIssue(item.id)">
                                                                <img src="@/assets/icons/cancel.svg" width="10" height="10" alt="cancel" />
                                                            </BButton>
                                                        </template>
    
                                                        <template #pagination>  
    
                                                            <div class="d-flex justify-content-between p-3 mt-3" v-if="config.total_items >= 1">
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
                                        </BCol>
                                        <BCol lg="12">
                                            <div class="work-orders border shadow-sm rounded-4">
                                                <div class="d-flex justify-content-between align-items-center border-bottom">
                                                    <div class="p-4 d-flex align-items-center">
                                                        <h4>Work Order </h4>
                                                    </div>
                                                    <div>
                                                        <BButton variant="link">
                                                            <i class="bx bx-chevron-down fs-22"></i>
                                                        </BButton>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-wrap justify-content-between p-lg-4">
                                                    <div>
                                                        <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showSelectHeaderWorkOrder">
                                                            <i class="bx bx-dots-vertical-rounded"></i>
                                                        </BButton>
                                                        <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showModalFilterWorkOrder">
                                                            <img src="@/assets/icons/filter.svg" alt="filter" />
                                                            Filter
                                                        </BButton>
                                                        <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportWorkOrder">
                                                            <img src="@/assets/icons/filter.svg" alt="filter" />
                                                            Export CSV
                                                        </BButton>
                                                    </div>
    
                                                    <div>
                                                        <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                                            <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="search">
                                                            <i class="ri-search-line search-icon"></i>
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                                <div class="live-preview">
                                                    <table-component :headers="workOrderHeaders" :data="workOrders" :action="action" v-if="workOrders.length > 0" @sort="sort($event.sortBy)">
                                                        <template #no="{ index }">
                                                            {{ index + 1 }}
                                                        </template>
                                                        <template #action="{ item }">
                                                            <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/work-order/edit/${item.id}`">
                                                                <img src="@/assets/icons/edit.svg" alt="pencil" />
                                                            </BButton>
                                                            <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDeleteWorkOrder(item.id)">
                                                                <img src="@/assets/icons/delete.svg" alt="delete" />
                                                            </BButton>
                                                            <BButton variant="link" class="link-opacity-75" size="sm" :to="`/work-order/view/${item.id}`">
                                                                <img src="@/assets/icons/view.svg" alt="eye" />
                                                            </BButton> 
                                                        </template>
    
                                                        <template #pagination>  
    
                                                            <div class="d-flex justify-content-between p-3 mt-3" v-if="config.total_items >= 1">
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
                                        </BCol>
                                        <BCol lg="12">
                                            <div class="issues border shadow-sm rounded-4">
                                                <div class="d-flex justify-content-between align-items-center border-bottom">
                                                    <div class="p-4 d-flex align-items-center">
                                                        <h4>Backlog </h4>
                                                    </div>
                                                    <div>
                                                        <BButton variant="link">
                                                            <i class="bx bx-chevron-down fs-22"></i>
                                                        </BButton>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-wrap justify-content-between p-lg-4">
                                                    <div>
                                                        <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showSelectHeaderBacklog">
                                                            <i class="bx bx-dots-vertical-rounded"></i>
                                                        </BButton>
                                                        <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showModalFilterBacklog">
                                                            <img src="@/assets/icons/filter.svg" alt="filter" />
                                                            Filter
                                                        </BButton>
                                                        <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportBacklog">
                                                            <img src="@/assets/icons/filter.svg" alt="filter" />
                                                            Export CSV
                                                        </BButton>
                                                    </div>
    
                                                    <div>
                                                        <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                                            <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="search">
                                                            <i class="ri-search-line search-icon"></i>
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                                <div class="live-preview">
                                                    <table-component :headers="backlogHeaders" :data="backlogs" :action="action" v-if="backlogs.length > 0" @sort="sort($event.sortBy)">
                                                        <template #no="{ index }">
                                                            {{ index + 1 }}
                                                        </template>
                                                        <template #action="{ item }">
                                                            <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/backlog-report/edit/${item.id}`">
                                                                <img src="@/assets/icons/edit.svg" alt="pencil" />
                                                            </BButton>
                                                            <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDeleteBacklog(item.id)">
                                                                <img src="@/assets/icons/delete.svg" alt="delete" />
                                                            </BButton>
                                                            <BButton variant="link" class="link-opacity-75" size="sm" :to="`/backlog-report/view/${item.id}`">
                                                                <img src="@/assets/icons/view.svg" alt="eye" />
                                                            </BButton>
                                                        </template>
                                                        <template #pagination>  
                                                            <div class="d-flex justify-content-between p-3 mt-3" v-if="config.total_items >= 1">
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
                                        </BCol>
                                        <BCol lg="12">
                                            <div class="issues border shadow-sm rounded-4">
                                                <div class="d-flex justify-content-between align-items-center border-bottom">
                                                    <div class="p-4 d-flex align-items-center">
                                                        <h4>Kuesioner </h4>
                                                    </div>
                                                    <div>
                                                        <BButton variant="link">
                                                            <i class="bx bx-chevron-down fs-22"></i>
                                                        </BButton>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-wrap justify-content-end p-lg-4">
                                                    <div>
                                                        <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                                            <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="search">
                                                            <i class="ri-search-line search-icon"></i>
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                                <div class="live-preview">
                                                    <table-component :headers="questionerHeaders" :data="questioners" :action="action" v-if="questioners.length > 0" @sort="sort($event.sortBy)">
                                                        <template #no="{ index }">
                                                            {{ index + 1 }}
                                                        </template>
                                                        <template #status="{ item }">
                                                            <BButton :variant="item.status === 'waiting' ? 'info' : item.status === 'done' ? 'success' : item.status === 'late' ? 'warning' : 'danger' " size="sm">
                                                                {{ item.status == 'waiting' ? 'Menunggu Dikerjakan' : item.status == 'done' ? 'Sudah Dikerjakan' : item.status === 'late' ? 'Sudah Terlewat'  : 'Tidak Dikerjakan' }}
                                                            </BButton>
                                                            
                                                        </template>
                                                        <template #action="{ item }">
                                                            <BButton v-if="item.status === 'waiting'" variant="link" class="link-dark fs-22" size="sm" :to="`/inspection-response/edit/${item.id}`">
                                                                <img src="@/assets/icons/edit.svg" alt="pencil" />
                                                            </BButton>
                                                            <BButton variant="link" class="link-opacity-75" size="sm" :to="`/inspection-response/view/${item.id}`">
                                                                <img src="@/assets/icons/view.svg" alt="eye" />
                                                            </BButton> 
                                                            <!-- <BButton variant="link" class="link-opacity-75 bg-success mx-1 rounded-2" size="sm">
                                                                <img src="@/assets/icons/check.svg" width="12" alt="check" />
                                                            </BButton> -->
                                                        </template>
    
                                                        <template #pagination>  
    
                                                            <div class="d-flex justify-content-between p-3 mt-3" v-if="config.total_items >= 1">
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
                                        </BCol>
                                    </BRow>
                                </div>
                            </div>
                        </BRow>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>