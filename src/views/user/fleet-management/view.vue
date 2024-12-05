<script>
import HeaderPage from '@/components/header-page.vue'
import Layout from "@/layouts/main.vue";
import Overview from "./overview/index.vue";
import HistoryParameter from "./history-parameter/index.vue";
import HistoryCost from "./history-cost/index.vue";
import HistoryTimesheet from "./history-timesheet/index.vue";
import HistoryFuel from "./history-fuel/index.vue";
import Others from "./others/index.vue";
import axios from "axios";

export default {
    name: 'fleet-management-view',
    components: {
        HeaderPage,
        Layout,
        Overview,
        HistoryParameter,
        HistoryCost,
        HistoryTimesheet,
        HistoryFuel,
        Others
    },
    data(){
        return{
            data: {}
        }
    },
    methods: {
        fetchData() {
            axios.get(process.env.VUE_APP_API_URL + "/v1/fleets/" + this.$route.params.id)
                .then(response => {
                    const data = response.data.data
                    this.data = data
                    this.data.fleetType = data.fleetType.name
                    // this.data.photo = data.photo
                    // this.data.merk = data.merk
                    // this.data.code = data.code
                    // this.data.parameterValue = data.parameterValue
                    // this.data.status = data.status
                    // this.data.name = data.name
                    // this.data.year = data.year
                    // this.data.serialNumber = data.serialNumber
                    
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
    <Layout>
        <HeaderPage :title="$route.meta.title" link="/fleet-management" :description="$route.meta.description" :action="$route.meta.action"/>
        
        <BRow>
            <BCol lg="12">
                <div class="shadow-lg rounded-2 p-3 bg-white">
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
                                            <h5 class="text-black-50 text-truncate">Tipe Fleet</h5>
                                        </div>
                                        <div class="w-50">
                                            <h5><span class="px-3">: {{ data.fleetType }}</span></h5>
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
                                            <h5 class="text-black-50 text-truncate">VIN/SN</h5>
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
                                            <h5 class="text-truncate"><span class="px-3">:</span>{{ data.merk}}</h5>
                                        </div>
                                    </div>
                                </BCol>
                                <BCol md="3">
                                    <div class="d-flex">
                                        <div class="w-50">
                                            <h5 class="text-black-50">Kode Fleet</h5>
                                        </div>
                                        <div class="w-50">
                                            <h5 class="text-truncate"><span class="px-3">:</span>{{ data.code}}</h5>
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
                    <BRow class="mt-4">
                        <BCol lg="12">
                            <BTabs>
                                <BTab title="Overview">
                                    <Overview/>
                                </BTab>
                                <BTab title="History Parameter">
                                    <HistoryParameter/>
                                </BTab>
                                <BTab title="History Cost">
                                    <HistoryCost/>
                                </BTab>
                                <BTab title="History Timesheet">
                                    <HistoryTimesheet/>
                                </BTab>
                                <BTab title="History Fuel">
                                    <HistoryFuel/>
                                </BTab>
                                <BTab title="Others">
                                    <Others/>
                                </BTab>
                            </BTabs>
                        </BCol>
                    </BRow>
                </div>
            </BCol>
        </BRow>
    </Layout>
    
</template>