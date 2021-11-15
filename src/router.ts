import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue";
import Auth from "./pages/Auth.vue";
import Dashboard from "./pages/Dashboard.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/auth",
        name: "Authenticate",
        component: Auth
    },
    {
        path: "/dashboard/:tab",
        name: "Dashboard",
        component: Dashboard
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
