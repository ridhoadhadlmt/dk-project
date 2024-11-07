const IssueReport = () => import("@/views/user/issue-report/index.vue")
const FormIssueReport = () => import("@/views/user/issue-report/form.vue")
const ViewIssueReport = () => import("@/views/user/issue-report/view.vue")

export default {
    path: "/issue-report",
    name: "issue-report",
    meta: { title: "Issue Report", authRequired: true },
    children: [
        {
            path: "",
            name: "issue-report-index",
            component: IssueReport,
            meta: { title: "Issue Report ", description: "Issue adalah laporan kendala teknis dari Inspeksi maupun penambahn Manual",authRequired: true },
        },
        {
            path: "create",
            name: "issue-report-create",
            component: FormIssueReport,
            meta: { title: "Tambah Issue Report", description: "Issue Report - Tambah Issue Report",authRequired: true },
        },
        {
            path: "edit/:id",
            name: "issue-report-edit",
            component: FormIssueReport,
            meta: { title: "Edit Issue Report", description: "Issue Report - Edit Issue Report",authRequired: true },
        },
        {
            path: "view/:id",
            name: "issue-report-view",
            component: ViewIssueReport,
            meta: { title: "View Issue Report", description: "Issue Report - View Issue Report",authRequired: true },
        },
    ]
}