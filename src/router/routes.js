import store from "@/state/store";

import administrator from "./admin/administrator";
import inventoryManagement from "./user/inventory-management";
import programMaintenance from "./user/program-maintenance";
import fleetManagement from "./user/fleet-management";
import issueReport from "./user/issue-report";
import backlogReport from "./user/backlog-report";
import workOrderReport from "./user/work-order-report";
import inspectionResponse from "./user/inspection-response";
import inspectionTemplate from "./user/inspection-template";
import roleManagement from "./user/role-management";
import userManagement from "./user/user-management";


export default [
  administrator,
  inventoryManagement, 
  programMaintenance,
  fleetManagement,
  issueReport,
  backlogReport,
  workOrderReport,
  inspectionResponse,
  inspectionTemplate,
  roleManagement,
  userManagement,
  {
    path: "/login",
    name: "login",
    component: () => import("../views/account/login.vue"),
    meta: {
      title: "Login",
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({ name: "default" });
          next();
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  {
    path: "/logout",
    name: "logout",
    meta: {
      title: "Logout",
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        localStorage.clear();
        sessionStorage.clear();
        next({ name: 'login' });
      },
    },
    component: () => import("../views/account/logout.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/account/register.vue"),
    meta: {
      title: "Register",
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({ name: "default" });
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  {
    path: "/forgot-password",
    name: "Forgot password",
    component: () => import("../views/account/forgot-password.vue"),
    meta: {
      title: "Forgot Password",
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({ name: "default" });
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  {
    path: "/reset-password",
    name: "Reset password",
    component: () => import("../views/account/reset-password.vue"),
    meta: {
      title: "Reset Password",
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({ name: "default" });
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  {
    path: "/",
    name: "default",
    meta: {
      title: "Dashboard",
      authRequired: true,
    },
    component: () => import("../views/dashboard/index"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: { title: "Dashboard", authRequired: true },
    component: () => import("../views/dashboard/index"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { title: "Profile", description: "Home - Profile", authRequired: false },
    component: () => import("../views/admin/profile.vue"),
  },
 

  
  
];
