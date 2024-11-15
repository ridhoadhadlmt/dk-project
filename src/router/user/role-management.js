const RoleManagement = () => import("@/views/user/role-management/index.vue")
const FormRoleManagement = () => import("@/views/user/role-management/form.vue")
// const ViewAdministrator = () => import("@/views/admin/administrator/view.vue")

export default {
    path: "/role-management",
    name: "role-management",
    meta: { title: "Role Management", authRequired: true },
    children: [
        {
            path: "",
            name: "role-management-index",
            component: RoleManagement,
            meta: { title: "Role Management", description: "Kamu bisa mengatur role user disini",authRequired: true },
        },
        {
            path: "edit/:id",
            name: "role-management-edit",
            component: FormRoleManagement,
            meta: { title: "Edit Role", description: "Role Management - Edit Role",authRequired: true },
        },
        // {
        //     path: "view/:id",
        //     name: "administrator-management-view",
        //     component: ViewAdministrator,
        //     meta: { title: "Detail Admin", description: "Administrator Management - Detail Admin",authRequired: true },
        // },
    ]
}