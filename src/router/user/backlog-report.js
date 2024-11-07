const BacklogReport = () => import("@/views/user/backlog-report/index.vue")
const FormBacklogReport = () => import("@/views/user/backlog-report/form.vue")
const ViewBacklogReport = () => import("@/views/user/backlog-report/view.vue")

export default {
    path: "/backlog-report",
    name: "backlog-report",
    meta: { title: "Backlog Report", authRequired: true },
    children: [
        {
            path: "",
            name: "backlog-report-index",
            component: BacklogReport,
            meta: { title: "Backlog Report ", description: "Backlog adalah proyek teknis lanjutan setelah WO selesai dijalankan tetapi ada kendala lanjutan.",authRequired: true },
        },
        {
            path: "create",
            name: "backlog-report-create",
            component: FormBacklogReport,
            meta: { title: "Create Backlog Report", description: "BacklogReport - Tambah Backlog Report",authRequired: true },
        },
        {
            path: "edit/:id",
            name: "backlog-report-edit",
            component: FormBacklogReport,
            meta: { title: "Edit Backlog Report", description: "Backlog Report - Edit Backlog Report",authRequired: true },
        },
        {
            path: "view/:id",
            name: "backlog-report-view",
            component: ViewBacklogReport,
            meta: { title: "View Backlog Report", description: "Backlog Report - View Backlog Report",authRequired: true },
        },
    ]
}