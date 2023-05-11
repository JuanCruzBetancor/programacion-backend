import express from "express";
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import { __dirname } from "./path.js";
import bodyParser from "body-parser";
import ProductManager from "./index.js";
import CartManager from "./cart.manager.js";


const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

const productManager = new ProductManager("products.json");
const cartManager = new CartManager("cart.json"); 

    const port = app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto 8080`);
});

const socketServer = new Server(port);
socketServer.on('connection', (socket) =>{
    console.log('usuario conectado!', socket.id);
    socket.on('disconnect', ()=>{
        console.log('usuario desconectado!');
    })
    socket.on('newProduct', (product) =>{
        productManager.addProduct(product);
        const totalProducts = productManager.getProducts();
        socketServer.emit('arrayProducts', totalProducts);
    });
});


    //mostrar o traer todos los productos existentes.
    app.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render('websockets', { products });
    });
    //buscar un producto por su identificador.
    app.get("/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const product = await productManager.getProductById(id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send("Producto no encontrado");
    }
    });
    //agregar nuevo producto.
    app.post("/products", async (req, res) => {
    const product = req.body;
    await productManager.addProduct(product);
    res.send("Producto agregado correctamente");
    });
    //modificar propiedades del producto.
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
    //eliminar producto del json.
    app.delete("/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const deleted = await productManager.deleteProduct(id);
    if (deleted) {
        res.send("Producto eliminado correctamente");
    } else {
        res.status(404).send("Producto no encontrado");
    }
    });

    // Rutas de Carrito de compras
    app.post("/cart/:id", async (req, res) => {
        const id = Number(req.params.id);
        const product = await productManager.getProductById(id);
        if (product) {
            await cartManager.addToCart(product);
            res.send(`Producto agregado al carrito: ${product.title}`);
        } else {
            res.status(404).send("Producto no encontrado");
        }
    });
    
    //mostrar carrito.
    app.get("/cart", async (req, res) => {
        const cart = await cartManager.getCart();
        res.send(cart);
    });
    //funcion para vaciar el carrito
    app.delete("/cart", async (req, res) => {
        await cartManager.clearCart();
        res.send("Carrito vaciado correctamente");
    });
    app.delete("/cart/:productId", async (req, res) => {
        const productId = parseInt(req.params.productId);
        const deleted = await cartManager.removeFromCart(productId);
        if (deleted) {
            res.send("Producto eliminado del carrito correctamente");
        } else {
            res.status(404).send("Producto no encontrado en el carrito");
        }
    });
    
