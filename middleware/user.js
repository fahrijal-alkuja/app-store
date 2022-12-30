import { useAuth } from "~/stores/auth";
export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuth();
    const tokens = authStore.token
    const user = authStore.Authenticator.rule;
    if (user !== 'user' || !tokens) {
        return navigateTo('/login')
    }
})