const FleetManagement = () => import("@/views/user/fleet-management/index.vue")
const FormFleetManagement = () => import("@/views/user/fleet-management/form.vue")
const FormParameterHistory = () => import("@/views/user/fleet-management/history-parameter/form.vue")
const FormCostHistory = () => import("@/views/user/fleet-management/history-cost/form.vue")
const FormTimesheetHistory = () => import("@/views/user/fleet-management/history-timesheet/form.vue")
const FormFuelHistory = () => import("@/views/user/fleet-management/history-fuel/form.vue")
const ViewFleetManagement = () => import("@/views/user/fleet-management/view.vue")

export default {
    path: "/fleet-management",
    name: "fleet-management",
    meta: { title: "Fleet Management", authRequired: true },
    children: [
        {
            path: "",
            name: "fleet-management-index",
            component: FleetManagement,
            meta: { title: "Fleet Management ", description: "Kamu bisa mengatur Fleet Management disini",authRequired: true },
        },
        {
            path: "create",
            name: "fleet-management-create",
            component: FormFleetManagement,
            meta: { title: "Tambah Fleet Management", description: "Fleet Management - Tambah Fleet Management",authRequired: true },
        },
        {
            path: "edit/:id",
            name: "fleet-management-edit",
            component: FormFleetManagement,
            meta: { title: "Edit Fleet Management", description: "Fleet Management - Edit Fleet Management",authRequired: true },
        },
        {
            path: "view/:id",
            name: "fleet-management-view",
            component: ViewFleetManagement,
            meta: { title: "Detail Fleet", description: "Fleet Management - Detail Fleet",authRequired: true },
        },
        {
            path: ":id/parameter-history/create",
            name: "fleet-management-parameter-history-create",
            component: FormParameterHistory,
            meta: { title: "History Parameter", description: "Fleet Management - Detail Fleet",authRequired: true },
        },
        {
            path: "parameter-history/edit/:id",
            name: "fleet-management-parameter-history-edit",
            component: FormParameterHistory,
            meta: { title: "History Parameter", description: "Fleet Management - Detail Fleet",authRequired: true },
        },
        {
            path: ":id/cost-history/create",
            name: "fleet-management-cost-history-create",
            component: FormCostHistory,
            meta: { title: "History Biaya", description: "Fleet Management - Detail Fleet",authRequired: true },
        },
        {
            path: "cost-history/edit/:id",
            name: "fleet-management-cost-history-edit",
            component: FormCostHistory,
            meta: { title: "History Biaya", description: "Fleet Management - Detail Fleet",authRequired: true },
        },
        {
            path: ":id/timesheet-history/create",
            name: "fleet-management-timesheet-history-create",
            component: FormTimesheetHistory,
            meta: { title: "History Timesheet", description: "Fleet Management - Detail Fleet",authRequired: true },
        },
        {
            path: "timesheet-history/edit/:id",
            name: "fleet-management-timesheet-history-edit",
            component: FormTimesheetHistory,
            meta: { title: "History Timesheet", description: "Fleet Management - Detail Fleet",authRequired: true },
        },
        
        {
            path: ":id/fuel-history/create",
            name: "fleet-management-fuel-history-create",
            component: FormFuelHistory,
            meta: { title: "History BBM", description: "Fleet Management - Detail Fleet",authRequired: true },
        },
        {
            path: "fuel-history/view/:id",
            name: "fleet-management-fuel-history-edit",
            component: FormFuelHistory,
            meta: { title: "History BBM", description: "Fleet Management - Detail Fleet",authRequired: true },
        },
    ]
}