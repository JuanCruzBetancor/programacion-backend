import { Router } from 'express';
import { getAllController, getByIdController, createController2, updateController, deleteController } from '../controllers/productsControler.js';

const router = Router();
//GET /products?sort=asc : ordenar de menor a mayor precio los productos.
//GET /products?sort=desc : ordenar de mayor a menor precio los productos.
router.get('/', getAllController);
router.get('/:id', getByIdController);
router.post('/', createController2);
router.put('/:id', updateController);
router.delete('/:id', deleteController);

export default router;