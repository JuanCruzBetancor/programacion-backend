import { ProductsModel } from './models/productsModel.js';
import Cart from './models/cartModel.js';

class CartMongoDB {
    async addProductToCart(pid) {
        try {
            const product = await ProductsModel.findById(pid);
    
            if (!product) {
                throw new Error('Producto no encontrado');
            }
    
            const cart = await Cart.findOne();
    
            if (!cart) {
                const newCart = new Cart({
                    products: [{
                        product: product._id,
                        quantity: 1
                    }]
                });
    
                await newCart.save();
            } else {
                const existingProduct = cart.products.find(item => item.product.toString() === pid);
    
                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    cart.products.push({
                        product: product._id,
                        quantity: 1
                    });
                }
    
                await cart.save();
            }
    
            console.log('Producto agregado al carrito');
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error.message);
            throw error;
        }
    }
    
    
    
        
        async getCart() {
            try {
                const cart = await Cart.findOne().populate('products.product');
                
                if (!cart || !cart.products || cart.products.length === 0) {
                    return { message: 'El carrito está vacío' };
                } else {
                    const cartInfo = cart.products.map(item => ({
                    product: {
                        _id: item.product._id,
                        title: item.product.title,
                        description: item.product.description,
                        category: item.product.category,
                        price: item.product.price,
                        stock: item.product.stock
                    },
                    quantity: item.quantity
                    }));
                    return { message: 'Contenido del carrito', products: cartInfo };
                }
                } catch (error) {
                console.error('Error al obtener el carrito:', error.message);
                throw error;
                }
            }
        
        async deleteProductFromCart(cid) {
            try {
            const cart = await Cart.findOne();
        
            if (!cart || cart.products.length === 0) {
                throw new Error('El carrito está vacío');
            }
        
            const productIndex = cart.products.findIndex(item => item._id.toString() === cid);
        
            if (productIndex === -1) {
                throw new Error('Producto no encontrado en el carrito');
            }
        
            cart.products.splice(productIndex, 1);
            await cart.save();
        
            console.log('Producto eliminado del carrito');
            } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error.message);
            throw error;
            }
        }
        }
    
    export default CartMongoDB;