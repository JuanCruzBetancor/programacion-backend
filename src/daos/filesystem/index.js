import fs from 'fs/promises';

    export default class ProductManager {
    constructor(path) {
        this.path = path;
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
        const products = await fs.readFile(this.path, "utf-8");
        return JSON.parse(products);
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
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    }
}

