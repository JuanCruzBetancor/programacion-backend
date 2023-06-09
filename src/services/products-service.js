import ProductsMongoDB from "../daos/mongoDB/productsMongo.js";


const prodDao = new ProductsMongoDB();
//export const getAllService = async (sort) => para decidir en la ruta si queremos mayor o menor de esta forma:
//GET /products?sort=asc : ordenar de menor a mayor precio los productos.
//GET /products?sort=desc : ordenar de mayor a menor precio los productos. 
export const getAllService = async (page) => {
    try {
        const docs = await prodDao.getAllProducts(10, page, "asc");//ordenando productos de menor a mayor precio.
        return docs;
        } catch (error) {
        console.log(error);
        }
    };

    export const getByIdService = async (id) => {
        try {
        const doc = await prodDao.getProductById(id);
        if(!doc) throw new Error('Product not found')
        else return doc;
        } catch (error) {
        console.log(error);
        }
    };
    
    export const createProduct = async(productData) => {
        try {
            const product = new ProductsModel(productData);
            await product.save();
            return product;
            } catch (error) {
            throw new Error('Error al crear el producto');
            }
        }

    export const createService = async (obj) => {
        try {
        const newProd = await prodDao.createProduct(obj);
        if(!newProd) throw new Error('Validation Error!')
        else return newProd;
        } catch (error) {
        console.log(error);
        }
    };
    
    export const updateService = async (id, obj) => {
        try {
        const doc = await prodDao.getProductById(id);
        if(!doc){
            throw new Error('Product not found')
        } else {
            const prodUpd = await prodDao.updateProduct(id, obj)
            return prodUpd;
        }
        } catch (error) {
        console.log(error);
        }
    };
    
    export const deleteService = async (id) => {
        try {
        const prodDel = await prodDao.deleteProduct(id);
        return prodDel;
        } catch (error) {
        console.log(error);
        }
    };