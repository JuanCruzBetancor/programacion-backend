import CartMongoDB from '../daos/mongoDB/cartMongo.js';

class CartService {
    constructor() {
        this.cartDB = new CartMongoDB();
        }
    
        async addProductToCart(pid) {
            try {
                await this.cartDB.addProductToCart(pid);
                } catch (error) {
                throw error;
                }
            }
            
            async getCart() {
                try {
                const cartData = await this.cartDB.getCart();
                return cartData;
                } catch (error) {
                throw error;
                }
            }
            
            async deleteProductFromCart(cid) {
                try {
                await this.cartDB.deleteProductFromCart(cid);
                } catch (error) {
                throw error;
                }
            }
    
        async updateCart(cartData) {
        try {
            await this.cartDB.updateCart(cartData);
        } catch (error) {
            throw error;
        }
        }
    
        async updateProductQuantity(productId, quantity) {
        try {
            await this.cartDB.updateProductQuantity(productId, quantity);
        } catch (error) {
            throw error;
        }
        }
    
        async clearCart() {
        try {
            await this.cartDB.clearCart();
        } catch (error) {
            throw error;
        }
        }
    }
    
    const cartService = new CartService();
    export default cartService;
