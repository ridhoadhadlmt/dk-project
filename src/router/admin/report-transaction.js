const ReportTransaction = () => import("@/views/admin/transaction-report/index.vue")
const FormReportTransaction = () => import("@/views/admin/transaction-report/form.vue")
const ViewReportTransaction = () => import("@/views/admin/transaction-report/view.vue")

export default {
    path: "/transaction-report",
    name: "transaction-report",
    meta: { title: "Transaction Report", authRequired: true },
    children: [
        {
            path: "",
            name: "transaction-report-index",
            component: ReportTransaction,
            meta: { title: "Transaction Report",authRequired: true },
        },
        {
            path: "create",
            name: "transaction-report-create",
            component: FormReportTransaction,
            meta: { title: "Tambah Transaction Report", description: "Transaction Report - Tambah Transaction Report",authRequired: true },
        },
        {
            path: "view/:id",
            name: "transaction-report-view",
            component: ViewReportTransaction,
            meta: { title: "View Transaction Report", description: "Transaction Report - View Transaction Report",authRequired: true },
        },
    ]
}