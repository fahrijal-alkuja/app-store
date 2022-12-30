import { defineStore } from "pinia";

export const useCart = defineStore('cart-store', {
    state: () => ({
        cart: {} as any,
    }),
    getters: {
        count(): number {
            return Object.keys(this.cart).reduce((acc, id) => {
                return acc + this.cart[id].quantity
            }, 0)
        },
        total(): number {
            return Object.keys(this.cart).reduce((acc, id) => {
                return acc + this.cart[id].price * this.cart[id].quantity
            }, 0)
        },
        getCart(): any {
            return Object.keys(this.cart).map((id) => {
                return {
                    id: this.cart[id].id,
                    price: this.cart[id].price,
                    qt: this.cart[id].quantity,
                }
            })
        },
    },
    actions: {
        add(carts: any) {
            this.cart[carts.id] = {
                id: carts.id,
                title: carts.title,
                quantity: carts.quantity,
                price: carts.price
            }
        },

        remove(id: number) {
            // eslint-disable-next-line curly
            if (!this.cart[id]) {
                return
            }

            this.cart[id].quantity -= 1

            // eslint-disable-next-line curly
            if (this.cart[id].quantity === 0) {
                delete this.cart[id]
            }
        },

        clear() {
            this.cart = {}
        }
    },
    persist: true,
})