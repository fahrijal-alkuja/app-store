import { defineStore } from "pinia";
export const useAuth = defineStore('auth', {
    state: () => ({
        Authenticator: false as any,
        token: false as any
    }),
    actions: {
        async setauth(auth: any) {
            this.Authenticator = auth;
        },
        async getToken(token: any) {
            this.token = token;
        },
        async logout() {
            this.Authenticator = false;
            this.token = false;
        }
    },
    persist: true,
});