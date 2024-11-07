const FleetManagement = () => import("@/views/user/fleet-management/index.vue")
const FormFleetManagement = () => import("@/views/user/fleet-management/form.vue")
const ViewFleetManagement = () => import("@/views/user/fleet-management/view.vue")

export default {
    path: "/fleet-management",
    name: "fleet-management",
    meta: { title: "Fleet Management", authRequired: true },
    children: [
        {
            path: "",
            name: "fleet-management-index",
            component: FleetManagement,
            meta: { title: "Fleet Management ", description: "Kamu bisa mengatur Fleet Management disini",authRequired: true },
        },
        {
            path: "create",
            name: "fleet-management-create",
            component: FormFleetManagement,
            meta: { title: "Tambah Fleet Management", description: "Fleet Management - Tambah Fleet Management",authRequired: true },
        },
        {
            path: "edit/:id",
            name: "fleet-management-edit",
            component: FormFleetManagement,
            meta: { title: "Edit Fleet Management", description: "Fleet Management - Edit Fleet Management",authRequired: true },
        },
        {
            path: "view/:id",
            name: "fleet-management-view",
            component: ViewFleetManagement,
            meta: { title: "View Fleet Management", description: "Fleet Management - View Fleet Management",authRequired: true },
        },
    ]
}