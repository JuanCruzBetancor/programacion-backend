import cartService from '../services/cart-service.js';

    class CartController {
        async addProductToCart(req, res) {
            try {
                const { pid } = req.params;
                await cartService.addProductToCart(pid);
                res.status(200).json({ message: 'Producto agregado al carrito' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            }
        
            async getCart(req, res) {
            try {
                const cart = await cartService.getCart();
                res.status(200).json(cart);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            }
        
            async deleteProductFromCart(req, res) {
            try {
                const { cid } = req.params;
                await cartService.deleteProductFromCart(cid);
                res.status(200).json({ message: 'Producto eliminado del carrito' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            }
}

const cartController = new CartController();
export default cartController;

