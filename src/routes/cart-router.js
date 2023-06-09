import { Router } from 'express';
import cartController from '../controllers/cartControllers.js';

const router = Router();

// Ruta para agregar un producto al carrito
router.post('/cart/add/:pid', cartController.addProductToCart);
// El parámetro "pid" hace referencia al id del producto que se desea agregar al carrito

// Ruta para obtener el contenido del carrito
router.get('/cart', cartController.getCart);

// Ruta para eliminar un producto del carrito
router.delete('/cart/delete/:cid', cartController.deleteProductFromCart);
// El parámetro "cid" hace referencia al id del producto en el carrito que se desea eliminar

export default router;
