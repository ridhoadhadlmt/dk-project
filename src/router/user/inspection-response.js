const InspectionResponse = () => import("@/views/user/inspection-response/index.vue")
const FormInspectionResponse = () => import("@/views/user/inspection-response/form.vue")
const ViewInspectionResponse = () => import("@/views/user/inspection-response/view.vue")

export default {
    path: "/inspection-response",
    name: "inspection-response",
    meta: { title: "Inspection Response Management", authRequired: true },
    children: [
        {
            path: "",
            name: "inspection-response-index",
            component: InspectionResponse,
            meta: { title: "Inspection Response ", description: "Inspection Response adalah data respon dari inspection template.",authRequired: true },
        },
        {
            path: "create",
            name: "inspection-response-create",
            component: FormInspectionResponse,
            meta: { title: "Create Inspection Response", description: "Inspection Response - Tambah Inspection Response",authRequired: true },
        },
        {
            path: "edit/:id",
            name: "inspection-response-edit",
            component: FormInspectionResponse,
            meta: { title: "Kerjakan Inspection Response", description: "Inspection Response - Kerjakan Inspection Response",authRequired: true },
        },
        {
            path: "view/:id",
            name: "inspection-response-view",
            component: ViewInspectionResponse,
            meta: { title: "View Inspection Response", description: "Inspection Response - View Inspection Response",authRequired: true },
        },
    ]
}