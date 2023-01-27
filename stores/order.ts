import { defineStore } from "pinia";

export const useOrder = defineStore("order-store", {
  state: () => ({
    items: [] as any,
  }),
  actions: {
    async addNewOrder(order: any) {
      const response = await fetch(
        `${useRuntimeConfig().public.baseUrl}order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );
      const data = await response.json();
      this.items.push(data);
    },

    async updateOrder(dataOrder: any) {
      const response = await fetch(
        `${useRuntimeConfig().public.baseUrl}order/${dataOrder.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataOrder),
        }
      );
      const data = await response.json();
      const index = this.items.findIndex((item: any) => item.id === data.id);
      this.items.splice(index, 1, data);
    },
  },
});
