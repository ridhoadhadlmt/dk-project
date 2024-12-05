<script>
export default {
    data(){
        return{
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
    }
}
</script>
<template>
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
</template>