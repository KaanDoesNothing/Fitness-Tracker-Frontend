import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue";
import Auth from "./pages/Auth.vue";
import Dashboard from "./pages/Dashboard.vue";
import Settings from "./pages/settings.vue";

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
    },
    {
        path: "/settings",
        name: "Settings",
        component: Settings
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
