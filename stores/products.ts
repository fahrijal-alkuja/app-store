import { defineStore } from "pinia";
const apiUrl = 'http://localhost:5000/product'
export const useProductStore = defineStore('product-store', {
    state: () => ({
        items: {} as any,
    }),

    actions: {
        async getAll() {
            const response = await fetch(`${apiUrl}`);
            const data = await response.json();
            this.items = data;
        },
        async addNewProduct(product: any) {
            const response = await fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            const data = await response.json();
            this.items.push(data);
        },
        async updateProduct(product: any) {
            const response = await fetch(`${apiUrl}/${product.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            const data = await response.json();
            const index = this.items.findIndex((item: any) => item.id === data.id);
            this.items.splice(index, 1, data);
        },

        async deleteProduct(id: string) {
            await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE'
            });
            const index = this.items.findIndex((item: any) => item.id === id);
            this.items.splice(index, 1);
        }
    },
})