<script>
import TableComponent from "@/components/table.vue";
import axios from "axios";
export default {
    name: 'reminders',
    components: {
        TableComponent,

    },
    data(){
        return{
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
                    key: 'createdAt',
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
                    key: 'status',
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
            reminders: [],
            config:{
                total_pages: 0,
                total_items: 0,
            },
            params: {
                page: 1,
                limit: 10,
                search: '',
                sortBy: 'id.desc',
                fleetId: this.$route.params.id,
            },
        }
    },
    methods: {
        listDataReminder(){
            axios.get(process.env.VUE_APP_API_URL + '/v1/fleet-tasks').then((response) => {
                this.reminders = response.data.data.items
            }).catch((error) => {
                console.log(error)
            })
        }
    },
    mounted(){
        this.listDataReminder()
    }
}
</script>
<template>
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
</template>