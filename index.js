const fs = require("fs");

class ProductManager {
    constructor() {
        this.path = "./productos.txt";
        if (!fs.existsSync(this.path)) {
        fs.writeFileSync(this.path, "[]");
        }
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const newProduct = {
        id: products.length + 1,
        ...product,
        };
        products.push(newProduct);
        await this.updateProducts(products);
        console.log("Producto agregado correctamente");
    }

    async getProducts() {
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find((p) => p.id === id);
        if (!product) {
        console.error("Producto no encontrado");
        return null;
        }
        return product;
    }

    async updateProduct(id, fieldsToUpdate) {
        const products = await this.getProducts();
        const productIndex = products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
        console.error("Producto no encontrado");
        return null;
        }
        products[productIndex] = {
        ...products[productIndex],
        ...fieldsToUpdate,
        id: id,
        };
        await this.updateProducts(products);
        console.log("Producto actualizado correctamente");
        return products[productIndex];
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const productIndex = products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
        console.error("Producto no encontrado");
        return null;
        }
        products.splice(productIndex, 1);
        await this.updateProducts(products);
        console.log("Producto eliminado correctamente");
        return true;
    }

    async updateProducts(products) {
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    }
    }

    const productManager = new ProductManager();

    productManager
    .addProduct({
        title: "Manzana",
        description: "Lo mejor a tu mesa, manzanas rojas y sabrosas.",
        price: 250,
        thumbnail: "www.manzana.com",
        stock: 100,
    })
    .then(() => {
        return productManager.addProduct({
        title: "Naranja",
        description: "Lo mejor a tu mesa, naranjas jugosas y sabrosas.",
        price: 350,
        thumbnail: "www.naranja.com",
        stock: 100,
        });
    })
    .then(() => {
        return productManager.addProduct({
        title: "Sandia",
        description: "Lo mejor a tu mesa, sandias dulces y sabrosas.",
        price: 200,
        thumbnail: "www.sandia.com",
        stock: 100,
        });
    })
    .then(() => {
        return productManager.addProduct({
        title: "Palta",
        description: "Lo mejor a tu mesa, palta.",
        price: 950,
        thumbnail: "www.palta.com",
        stock: 100,
        });
    })
    .then(() => {
        console.log("Listado de productos:");
        return productManager.getProducts();
    })
    .then((products) => {
        console.log(products);
        console.log("Producto con id 1:");
        return
    })