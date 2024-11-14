const ProgramMaintenance = () => import("@/views/user/program-maintenance/index.vue")
const FormProgramMaintenance = () => import("@/views/user/program-maintenance/form.vue")
const ViewProgramMaintenance = () => import("@/views/user/program-maintenance/view.vue")

export default {
    path: "/maintenance-programs",
    name: "maintenance-programs",
    meta: { title: "Program Maintenance Management", authRequired: false },
    children: [
        {
            path: "",
            name: "maintenance-programs-index",
            component: ProgramMaintenance,
            meta: { title: "Program Maintenance ", description: "Kamu bisa mengatur Program Maintenance disini",authRequired: false },
        },
        {
            path: "create",
            name: "maintenance-programs-create",
            component: FormProgramMaintenance,
            meta: { title: "Tambah Program Maintenance", description: "Program Maintenance - Tambah Program Maintenance",authRequired: false },
        },
        {
            path: "edit/:id",
            name: "maintenance-programs-edit",
            component: FormProgramMaintenance,
            meta: { title: "Edit Program Maintenance", description: "Program Maintenance - Edit Program Maintenance",authRequired: false },
        },
        {
            path: "view/:id",
            name: "maintenance-programs-view",
            component: ViewProgramMaintenance,
            meta: { title: "Detail Program Maintenance", description: "Program Maintenance - Detail Program Maintenance",authRequired: false },
        },
    ]
}