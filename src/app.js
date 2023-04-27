import express from 'express';
import ProductManager from './index.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const productManager = new ProductManager ('products.json')

const port = 8080;
// Iniciar servidor de Express
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});


// Definir ruta para obtener todos los productos
app.get("/products", async (req, res) => {
    const products = await productManager.getProducts();
    res.send(products);
    });
    
    // Definir ruta para obtener un producto por su id
    app.get("/products/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        const product = await productManager.getProductById(id);
        if (product) {
        res.send(product);
        } else {
        res.status(404).send("Producto no encontrado");
        }
    });
    
    // Definir ruta para agregar un producto
    app.post("/products", async (req, res) => {
        const product = req.body;
        await productManager.addProduct(product);
        res.send("Producto agregado correctamente");
    });
    
    // Definir ruta para actualizar un producto
    app.put("/products/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        const fieldsToUpdate = req.body;
        const product = await productManager.updateProduct(id, fieldsToUpdate);
        if (product) {
        res.send(product);
        } else {
        res.status(404).send("Producto no encontrado");
        }
    });
    
    // Definir ruta para eliminar un producto
    app.delete("/products/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        const deleted = await productManager.deleteProduct(id);
        if (deleted) {
        res.send("Producto eliminado correctamente");
        } else {
        res.status(404).send("Producto no encontrado");
        }
    });
