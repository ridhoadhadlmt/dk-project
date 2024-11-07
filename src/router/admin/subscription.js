const Subscription = () => import("@/views/admin/subscription/index.vue")
const FormSubscription = () => import("@/views/admin/subscription/form.vue")
// const ViewAdministrator = () => import("@/views/admin/administrator/view.vue")

export default {
    path: "/subscription-management",
    name: "subscription-management",
    meta: { title: "Subscription Management", description: "The most important info highlights", authRequired: true },
    children: [
        {
            path: "",
            name: "subscription-management-index",
            component: Subscription,
            meta: { title: "Subscription Management",authRequired: true },
        },
        {
            path: "create",
            name: "subscription-management-create",
            component: FormSubscription,
            meta: { title: "Create Subscription", description: "Subscription Management - Tambah Subscription",authRequired: true },
        },
        {
            path: "edit/:id",
            name: "subscription-management-edit",
            component: FormSubscription,
            meta: { title: "Edit Subscription", description: "Subscription Management - Edit Subscription",authRequired: true },
        },
        // {
        //     path: "view/:id",
        //     name: "administrator-management-view",
        //     component: ViewAdministrator,
        //     meta: { title: "View Administrator", description: "Administrator Management - View Admin",authRequired: true },
        // },
    ]
}