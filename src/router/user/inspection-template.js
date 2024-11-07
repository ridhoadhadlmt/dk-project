const InspectionTemplate = () => import("@/views/user/inspection-template/index.vue")
const FormInspectionTemplate = () => import("@/views/user/inspection-template/form.vue")
const ViewInspectionTemplate = () => import("@/views/user/inspection-template/view.vue")

export default {
    path: "/inspection-template",
    name: "inspection-template",
    meta: { title: "Inspection Template", authRequired: true },
    children: [
        {
            path: "",
            name: "inspection-template-index",
            component: InspectionTemplate,
            meta: { title: "Inspection Template ", description: "Inspection Template adalah pembuatan template untuk kegiatan Inspeksi maupun survey.",authRequired: true },
        },
        {
            path: "create",
            name: "inspection-template-create",
            component: FormInspectionTemplate,
            meta: { title: "Tambah Inspection Template", description: "Inspection Template - Tambah Inspection Template",authRequired: true },
        },
        {
            path: "edit/:id",
            name: "inspection-template-edit",
            component: FormInspectionTemplate,
            meta: { title: "Edit Inspection Template", description: "Inspection Template - Edit Inspection Template",authRequired: true },
        },
        {
            path: "view/:id",
            name: "inspection-template-view",
            component: ViewInspectionTemplate,
            meta: { title: "View Inspection Template", description: "Inspection Template - View Inspection Template",authRequired: true },
        },
    ]
}