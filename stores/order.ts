import { defineStore } from "pinia";
const apiUrl = 'http://localhost:9000/order'

export const useOrder = defineStore('order-store', {
    state: () => ({
        items: [] as any,
    }),
    actions: {
        async addNewOrder(order: any) {
            const response = await fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
            const data = await response.json();
            this.items.push(data);
        },
    }
})