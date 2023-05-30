import express from "express";
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import { __dirname } from "./path.js";
import bodyParser from "body-parser";
import ProductManager from "./daos/filesystem/index.js";
import CartManager from "./daos/filesystem/cart.manager.js";
import './db/database.js'
import productRouter from "./routes/products-routes.js";
import viewsRouter from "./routes/views-router.js"
import  MessagesManagerMongoDB  from "./daos/mongoDB/messagesMongo.js";

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');
app.use('/products', productRouter);
app.use('/', viewsRouter);

// const productManager = new ProductManager("products.json");
// const cartManager = new CartManager("cart.json"); 
const messagesManager = new MessagesManagerMongoDB();
    const port = app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto 8080`);
});
const socketServer = new Server(port);

socketServer.on('connection', async(socket)=>{
    console.log('¡🟢 New connection!', socket.id);

    socketServer.emit('messages', await messagesManager.getAll());

    socket.on('disconnect', ()=>{
        console.log('¡🔴 User disconnect!');
    });
    try {
        const mensajes = await messagesManager.find({}).exec();
        socketServer.emit('messages', mensajes);
        } catch (error) {
            console.error('Error al obtener mensajes de MongoDB:', error);
        }
        
        socket.on('disconnect', () => {
            console.log('¡🔴 User disconnect!');
        });
        
        socket.on('newUser', (username) => {
            console.log(`${username} is logged in`);
        });
        
        socket.on('chat:message', async (msg) => {
            await messagesManager.guardarMensaje(msg.username, msg.message);
            const mensajes = await MessagesModel.find({}).exec();
            socketServer.emit('messages', mensajes);
        });
        
        socket.on('newUser', (username) => {
            socket.broadcast.emit('newUser', username);
        });
        
        socket.on('chat:typing', (data) => {
            socket.broadcast.emit('chat:typing', data);
        });
        });


//     //mostrar o traer todos los productos existentes.
//     app.get("/", async (req, res) => {
//     const products = await productManager.getProducts();
//     res.render('websockets', { products });
//     });
//     //buscar un producto por su identificador.
//     app.get("/products/:id", async (req, res) => {
//     const id = parseInt(req.params.id);
//     const product = await productManager.getProductById(id);
//     if (product) {
//         res.send(product);
//     } else {
//         res.status(404).send("Producto no encontrado");
//     }
//     });
//     //agregar nuevo producto.
//     app.post("/products", async (req, res) => {
//     const product = req.body;
//     await productManager.addProduct(product);
//     res.send("Producto agregado correctamente");
//     });
//     //modificar propiedades del producto.
//     app.put("/products/:id", async (req, res) => {
//     const id = parseInt(req.params.id);
//     const fieldsToUpdate = req.body;
//     const product = await productManager.updateProduct(id, fieldsToUpdate);
//     if (product) {
//         res.send(product);
//     } else {
//         res.status(404).send("Producto no encontrado");
//     }
//     });
//     //eliminar producto del json.
//     app.delete("/products/:id", async (req, res) => {
//     const id = parseInt(req.params.id);
//     const deleted = await productManager.deleteProduct(id);
//     if (deleted) {
//         res.send("Producto eliminado correctamente");
//     } else {
//         res.status(404).send("Producto no encontrado");
//     }
//     });

//     // Rutas de Carrito de compras
//     app.post("/cart/:id", async (req, res) => {
//         const id = Number(req.params.id);
//         const product = await productManager.getProductById(id);
//         if (product) {
//             await cartManager.addToCart(product);
//             res.send(`Producto agregado al carrito: ${product.title}`);
//         } else {
//             res.status(404).send("Producto no encontrado");
//         }
//     });
    
//     //mostrar carrito.
//     app.get("/cart", async (req, res) => {
//         const cart = await cartManager.getCart();
//         res.send(cart);
//     });
//     //funcion para vaciar el carrito
//     app.delete("/cart", async (req, res) => {
//         await cartManager.clearCart();
//         res.send("Carrito vaciado correctamente");
//     });
//     app.delete("/cart/:productId", async (req, res) => {
//         const productId = parseInt(req.params.productId);
//         const deleted = await cartManager.removeFromCart(productId);
//         if (deleted) {
//             res.send("Producto eliminado del carrito correctamente");
//         } else {
//             res.status(404).send("Producto no encontrado en el carrito");
//         }
//     });
    
