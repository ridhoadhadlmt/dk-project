const Client = () => import("@/views/admin/client/index.vue")
const FormClient = () => import("@/views/admin/client/form.vue")
const ViewClient = () => import("@/views/admin/client/view.vue")

export default {
    path: "/client-management",
    name: "client-management",
    meta: { title: "Client Management", description: "The most important info highlights", authRequired: true },
    children: [
        {
            path: "",
            name: "client-management-index",
            component: Client,
            meta: { title: "Client Management",authRequired: true },
        },
        {
            path: "create",
            name: "client-management-create",
            component: FormClient,
            meta: { title: "Tambah Klien", description: "Client Management - Tambah Klien",authRequired: true },
        },
        {
            path: "edit/:id",
            name: "client-management-edit",
            component: FormClient,
            meta: { title: "Edit Klien", description: "Client Management - Edit Klien",authRequired: true },
        },
        {
            path: "view/:id",
            name: "client-management-view",
            component: ViewClient,
            meta: { title: "Detail Client", description: "Client Management - Detail Client",authRequired: true },
        },
    ]
}