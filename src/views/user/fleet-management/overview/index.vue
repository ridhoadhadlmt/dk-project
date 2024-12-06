<script>
import axios from "axios";
import moment from "moment";
export default {
    name: 'Overview',
    data(){
        return{
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
            dataMaintenanceProgram: [],
            dataAttachment: []
        }

    },
    methods: {
        fetchData() {
            axios.get(process.env.VUE_APP_API_URL + "/v1/fleets/" + this.$route.params.id)
                .then(response => {
                    const data = response.data.data
                    this.data = data
                    const finance = data.finance
                    this.data.finance = finance
                    this.data.finance.firstPaymentAt = finance.firstPaymentAt.split('')[0]
                    this.data.finance.firstPaymentAt = moment(finance.firstPaymentAt).format('DD MMMM YYYY');
                    this.data.finance.endPaymentAt = finance.endPaymentAt.split('')[0]
                    this.data.finance.endPaymentAt = moment(finance.endPaymentAt).format('DD MMMM YYYY');
                    this.data.finance.paymentDate = finance.paymentDate.split('')[0]
                    this.data.finance.paymentDate = moment(finance.paymentDate).format('DD MMMM YYYY');
                    
                    this.dataMaintenanceProgram = data.maintenancePrograms.map((maintenanceProgram) => {
                        
                        return {
                            id: maintenanceProgram.id,
                            maintenanceProgramId: maintenanceProgram.maintenanceProgramId,
                            lastMaintenancePoint: maintenanceProgram.lastMaintenancePoint,
                            isDelete: false
                        }
                    })
                    // data.tags.map((tag) => {
                    //     this.dataTag.push(tag)
                    // })
                    this.dataAttachment = data.attachments.map((attachment) => {
                        return attachment
                    })
                    // data.attachments.map((attachment) => {
                        
                    //     this.dataAttachment.push(attachment)
                    // })

                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
    mounted(){
        this.fetchData()
    }
    
}
</script>

<template>
    <div class="py-4">
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
                                    <input type="text" class="form-control" id="width" :value="data.widht + 'm'" required disabled>
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
                            <input type="text" class="form-control" id="weight" :value="data.wight + 'kg'" required disabled>
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
                    <!-- <BCol md="6">
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
                    </BCol> -->
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
</template>