import { defineStore } from "pinia";

export const useUsersStore = defineStore('users-store', {
    state: () => ({
        users: [] as any,
    }),
    getters: {
        user: (state) => state.users
    },
    actions: {
        async getUsers() {
            const response = await fetch(`${useRuntimeConfig().public.baseUrl}users`);
            const data = await response.json();
            this.users = data;
        },
        // add new users
        async addNewUsers(users: any) {
            const response = await fetch(`${useRuntimeConfig().public.baseUrl}users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(users)
            });
            const data = await response.json();
            this.users.push(data);
        },
        // update
        async updateUsers(users: any) {
            const response = await fetch(`${useRuntimeConfig().public.baseUrl}users/${users.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(users)
            });
            const data = await response.json();
            const index = this.users.findIndex((item: any) => item.id === data.id);
            this.users.splice(index, 1, data);
        },
        // delete jadwal
        async deleteUsers(id: string) {
            await fetch(`${useRuntimeConfig().public.baseUrl}users/${id}`, {
                method: 'DELETE'
            });
            const index = this.users.findIndex((item: any) => item.id === id);
            this.users.splice(index, 1);
        }
    },
})