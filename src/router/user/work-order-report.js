const WorkOrderReport = () => import("@/views/user/work-order-report/index.vue")
const FormWorkOrderReport = () => import("@/views/user/work-order-report/form.vue")
const ViewWorkOrderReport = () => import("@/views/user/work-order-report/view.vue")

export default {
    path: "/work-order-report",
    name: "work-order-report",
    meta: { title: "Work Order Report Management", authRequired: true },
    children: [
        {
            path: "",
            name: "work-order-report-index",
            component: WorkOrderReport,
            meta: { title: "Work Order Report ", description: "Work Order Report adalah proyek teknis yang dapat dihubungkan ke Issue, Program Maintenance, ataupun penambahan Manual.",authRequired: true },
        },
        {
            path: "create",
            name: "work-order-report-create",
            component: FormWorkOrderReport,
            meta: { title: "Tambah Work Order Report", description: "Work Order Report - Tambah Work Order Report",authRequired: true },
        },
        {
            path: "edit/:id",
            name: "work-order-report-edit",
            component: FormWorkOrderReport,
            meta: { title: "Edit Work Order Report", description: "Work Order Report - Edit Work Order Report",authRequired: true },
        },
        {
            path: "view/:id",
            name: "work-order-report-view",
            component: ViewWorkOrderReport,
            meta: { title: "View Work Order Report", description: "Work Order Report - View Work Order Report",authRequired: true },
        },
    ]
}