const Role = () => import("@/views/admin/role-management/index.vue")
const FormRole = () => import("@/views/admin/role-management/form.vue")

export default {
    path: "/role-management",
    name: "role-management",
    meta: { title: "Role Management", description: "The most important info highlights", authRequired: true },
    children: [
        {
            path: "",
            name: "role-management-index",
            component: Role,
            meta: { title: "Role Management",authRequired: true },
        },
        {
            path: "create",
            name: "role-management-create",
            component: FormRole,
            meta: { title: "Create Role", description: "Role Management - Tambah Role",authRequired: true },
        },
        {
            path: "edit/:id",
            name: "role-management-edit",
            component: FormRole,
            meta: { title: "Edit Role", description: "Role Management - Edit Role",authRequired: true },
        },
    ]
}