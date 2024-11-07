<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
// import axios from "axios";

export default {
    name: "fleet-management-create",
    components: {
        Layout,
    },
    data() {
        return {
            // datas: null,
            datas: [
                {no: 1, name: 'Fleet 1', type_fleet: 'Lorem Ipsum', type_bbm: 'Lorem Ipsum', efficiency: 'Lorem Ipsum',},
                {no: 2, name: 'Fleet 2', type_fleet: 'Lorem Ipsum', type_bbm: 'Lorem Ipsum', efficiency: 'Lorem Ipsum',},
            ]
        };
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

        getData() {
            // axios.get(process.env.VUE_APP_API_URL + "/cms/v1/admins/" + this.$route.params.id)
            //     .then(response => {
            //         this.datas = response.data.data;
            //         // console.log(response.data);
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });
        },
    },
    mounted() {
        this.getData();
        window.addEventListener("resize", this.resizerightcolumn);
    }

};
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

        <BRow v-if="datas">
            <BCol xl="12">
                <BCard>
                    <BCardBody>
                        <!-- <div class="">
                            <h3 class="mr-3">{{ datas.name }} </h3>
                        </div> -->

                        <div class="mt-3 d-flex gap-2">
                            <div class="d-flex align-items-bottom gap-2">
                                <i class="mdi mdi-phone fs-14 text-muted"></i>
                                <p class="fs-14 text-muted">{{ datas.name || "-" }}</p>
                            </div>

                            
                            <div class="d-flex align-items-bottom gap-2">
                                <i class="mdi mdi-whatsapp fs-14 text-muted"></i>
                                <p class="fs-14 text-muted">{{ datas.type_fleet || "-" }}</p>
                            </div>

                            <div class="d-flex align-items-bottom gap-2">
                                <i class="mdi mdi-email fs-14 text-muted"></i>
                                <p class="fs-14 text-muted">{{ datas.type_bbm || "-" }}</p>
                            </div>
                            <div class="d-flex align-items-bottom gap-2">
                                <i class="mdi mdi-email fs-14 text-muted"></i>
                                <p class="fs-14 text-muted">{{ datas.efficiency || "-" }}</p>
                            </div>
                        </div>
                    </BCardBody>

                    <!-- <BCardFooter>   
                        <div class="d-flex gap-4">
                            <div>
                               <h5> <span class="text-muted">Role</span> : {{ datas.role.name }}</h5>
                            </div>
                            <div>
                                <h5> <span class="text-muted">Status</span> : {{ datas.isActive ? 'Active' : 'Inactive' }}</h5>
                            </div>
                        </div>
                    </BCardFooter> -->
                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>