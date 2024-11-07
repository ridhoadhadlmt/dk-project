const Administrator = () => import("@/views/admin/administrator/index.vue")
const FormAdministrator = () => import("@/views/admin/administrator/form.vue")
const ViewAdministrator = () => import("@/views/admin/administrator/view.vue")

export default {
    path: "/administrator-management",
    name: "administrator-management",
    meta: { title: "Administrator Management", authRequired: false },
    children: [
        {
            path: "",
            name: "administrator-management-index",
            component: Administrator,
            meta: { title: "Administrator Management", description: "The most important info highlights",authRequired: false },
        },
        {
            path: "create",
            name: "administrator-management-create",
            component: FormAdministrator,
            meta: { title: "Create Administrator", description: "Administrator Management - Tambah Admin",authRequired: false },
        },
        {
            path: "edit/:id",
            name: "administrator-management-edit",
            component: FormAdministrator,
            meta: { title: "Edit Administrator", description: "Administrator Management - Edit Admin",authRequired: false },
        },
        {
            path: "view/:id",
            name: "administrator-management-view",
            component: ViewAdministrator,
            meta: { title: "View Administrator", description: "Administrator Management - View Admin",authRequired: false },
        },
    ]
}