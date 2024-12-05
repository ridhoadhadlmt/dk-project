const Questioner = () => import("@/views/user/questioner/index.vue")
const FormBacklogReport = () => import("@/views/user/questioner/form.vue")
const ViewBacklogReport = () => import("@/views/user/questioner/view.vue")

export default {
    path: "/questioner",
    name: "questioner",
    meta: { title: "Kuesioner", authRequired: true },
    children: [
        {
            path: "",
            name: "questioner-index",
            component: Questioner,
            meta: { title: "Kuesioner ", description: "Kuesioner adalah proyek teknis lanjutan setelah WO selesai dijalankan tetapi ada kendala lanjutan.",authRequired: true },
        },
        {
            path: "create",
            name: "questioner-create",
            component: FormBacklogReport,
            meta: { title: "Create Kuesioner", description: "Questioner - Tambah Kuesioner",authRequired: true },
        },
        {
            path: "edit/:id",
            name: "questioner-edit",
            component: FormBacklogReport,
            meta: { title: "Edit Kuesioner", description: "Kuesioner - Edit Kuesioner",authRequired: true },
        },
        {
            path: "view/:id",
            name: "questioner-view",
            component: ViewBacklogReport,
            meta: { title: "View Kuesioner", description: "Kuesioner - View Kuesioner",authRequired: true },
        },
    ]
}