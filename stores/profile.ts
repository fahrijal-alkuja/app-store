import { defineStore } from "pinia";
const apiUrl = 'http://localhost:9000/profile'
export const useProfile = defineStore('profile-store', {

    state: () => ({
        items: {} as any,
    }),
    actions: {
        async newProfile(profile: any) {
            const response = await fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profile)
            });
            const data = await response.json();
            this.items.push(data);
        },
        async updateProfile(profile: any) {
            const response = await fetch(`${apiUrl}/${profile.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profile)
            });
            // const data = await response.json();
            // const index = this.items.findIndex((item: any) => item.id === data.id);
            // this.items.splice(index, 1, data);
        },
    }
})