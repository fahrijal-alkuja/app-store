import { defineStore } from "pinia";
const url = 'http://127.0.0.1:5000/';

export const useUsersStore = defineStore('users-store', {
    state: () => ({
        users: [] as any,
    }),
    getters: {
        user: (state) => state.users
    },
    actions: {
        async getUsers() {
            const response = await fetch(`${url}users`);
            const data = await response.json();
            this.users = data;
        },
        // add new users
        async addNewUsers(users: any) {
            const response = await fetch(`${url}users`, {
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
            const response = await fetch(`${url}users/${users.id}`, {
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
            await fetch(`${url}users/${id}`, {
                method: 'DELETE'
            });
            const index = this.users.findIndex((item: any) => item.id === id);
            this.users.splice(index, 1);
        }
    },
})