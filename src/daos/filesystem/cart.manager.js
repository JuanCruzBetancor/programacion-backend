import fs from 'fs/promises';

    export default class CartManager {
        constructor(path) {
            this.path = path;
            fs.access(path)
                .catch(() => fs.writeFile(path, JSON.stringify([])));
            }

    async getCart() {
        const cart = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(cart);
    }

    async addToCart(product) {
        const cart = await this.getCart();
        const existingCartItem = cart.find(item => item.product.id === product.id);
            //verificar si el producto existe en el carrito le incrementa la cantidad y sino se agrega.
            if (existingCartItem) {
            existingCartItem.quantity++;
            } else {
            const newCartItem = {
                id: cart.length + 1,
                product: product,
                quantity: 1,
            };
            cart.push(newCartItem);
            }
            await this.updateCart(cart);
            console.log('Producto agregado al carrito correctamente');
        }
        //eliminar producto por su id.
    async removeFromCart(id) {
        const cart = await this.getCart();
        const cartIndex = cart.findIndex((item) => item.id === id);
        if (cartIndex === -1) {
        console.error('Producto no encontrado en el carrito');
        return null;
        }
        cart.splice(cartIndex, 1);
        await this.updateCart(cart);
        console.log('Producto eliminado del carrito correctamente');
        return true;
    }
    //vaciar carrito
    async clearCart() {
        await fs.writeFile(this.path, JSON.stringify([], null, 2));
    }

    async updateCart(cart) {
        await fs.writeFile(this.path, JSON.stringify(cart, null, 2));
    }
    }
