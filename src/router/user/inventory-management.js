const Inventory = () => import("@/views/user/inventory-management/index.vue")
const FormInventory = () => import("@/views/user/inventory-management/form.vue")
const FormMutation = () => import("@/views/user/inventory-management/mutation/form.vue")
const ViewInventory = () => import("@/views/user/inventory-management/view.vue")

export default {
    path: "/inventory-management",
    name: "inventory-management",
    meta: { title: "Inventory Management", authRequired: false },
    children: [
        {
            path: "",
            name: "inventory-management-index",
            component: Inventory,
            meta: { title: "Inventory Management", description: "Kamu bisa mengatur inventory disini",authRequired: false },
        },
        {
            path: "create",
            name: "inventory-management-create",
            component: FormInventory,
            meta: { title: "Create Inventory", description: "Inventory Management - Tambah Inventory",authRequired: false },
        },
        {
            path: "edit/:id",
            name: "inventory-management-edit",
            component: FormInventory,
            meta: { title: "Edit Inventory", description: "Inventory Management - Edit Inventory",authRequired: false },
        },
        {
            path: "view/:id",
            name: "inventory-management-view",
            component: ViewInventory,
            meta: { title: "Detail Inventory", description: "Inventory Management - Detail Inventory",authRequired: false },
        },
        {
            path: ":id/mutation-create",
            name: "inventory-mutation-create",
            component: FormMutation,
            meta: { title: "Tambah Mutasi Inventory", description: "Inventory Management - Detail Inventory",authRequired: false },
        },
        {
            path: ":id/mutation-edit",
            name: "inventory-mutation-edit",
            component: FormMutation,
            meta: { title: "Edit Mutasi Inventory", description: "Inventory Management - Detail Inventory",authRequired: false },
        },
    ]
}