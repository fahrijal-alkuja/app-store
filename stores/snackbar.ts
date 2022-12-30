import { defineStore } from "pinia";
export const useSnackbar = defineStore('snackbar', {
    state: () => ({
        snackbars: [] as any,
    }),

    actions: {
        async setSnackbar(snackbar: any) {
            snackbar.showing = true
            snackbar.color = snackbar.color || 'success'
            this.snackbars = snackbar;
        }
    },

})