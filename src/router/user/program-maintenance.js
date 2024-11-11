const ProgramMaintenance = () => import("@/views/user/program-maintenance/index.vue")
const FormProgramMaintenance = () => import("@/views/user/program-maintenance/form.vue")
const ViewProgramMaintenance = () => import("@/views/user/program-maintenance/view.vue")

export default {
    path: "/program-maintenance",
    name: "program-maintenance",
    meta: { title: "Program Maintenance Management", authRequired: false },
    children: [
        {
            path: "",
            name: "program-maintenance-index",
            component: ProgramMaintenance,
            meta: { title: "Program Maintenance ", description: "Kamu bisa mengatur Program Maintenance disini",authRequired: false },
        },
        {
            path: "create",
            name: "program-maintenance-create",
            component: FormProgramMaintenance,
            meta: { title: "Tambah Program Maintenance", description: "Program Maintenance - Tambah Program Maintenance",authRequired: false },
        },
        {
            path: "edit/:id",
            name: "program-maintenance-edit",
            component: FormProgramMaintenance,
            meta: { title: "Edit Program Maintenance", description: "Program Maintenance - Edit Program Maintenance",authRequired: false },
        },
        {
            path: "view/:id",
            name: "program-maintenance-view",
            component: ViewProgramMaintenance,
            meta: { title: "Detail Program Maintenance", description: "Program Maintenance - Detail Program Maintenance",authRequired: false },
        },
    ]
}