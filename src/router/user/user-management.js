const UserManagement = () => import("@/views/user/user-management/index.vue")
const FormUserManagement = () => import("@/views/user/user-management/form.vue")
// const ViewAdministrator = () => import("@/views/admin/administrator/view.vue")

export default {
    path: "/user-management",
    name: "user-management",
    meta: { title: "User Management", authRequired: true },
    children: [
        {
            path: "",
            name: "user-management-index",
            component: UserManagement,
            meta: { title: "User Management", description: "Kamu bisa mengatur user disini",authRequired: true },
        },
        {
            path: "edit/:id",
            name: "user-management-edit",
            component: FormUserManagement,
            meta: { title: "Edit User", description: "User Management - Edit User",authRequired: true },
        },
        {
            path: "create",
            name: "user-management-create",
            component: FormUserManagement,
            meta: { title: "Create User", description: "User Management - Create User",authRequired: true },
        },
        // {
        //     path: "view/:id",
        //     name: "administrator-management-view",
        //     component: ViewAdministrator,
        //     meta: { title: "Detail Admin", description: "Administrator Management - Detail Admin",authRequired: true },
        // },
    ]
}