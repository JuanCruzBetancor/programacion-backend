class ProductManager{
    constructor(){
        this.products = [];
    }

    getProducts(){
        return this.products;
    }

    addProduct(title, description, price, thumbnail, stock){
        const product = {
            id: this.#nuevoId() + 1,
            title,
            description,
            price: price,
            thumbnail,
            stock,
        };
        if (!title || !description || !price || !thumbnail || !stock) {
            console.error("Todos los campos son obligatorios");
            return;
        }
        this.products.push(product);
    }

    #nuevoId(){
        let maxId = 0;
        this.products.map((product) => {
            if(product.id > maxId) maxId = product.id;
        });
        return maxId;
    }id

    getProductById(idProduct) {
        const product = this.products.find(product => product.id === idProduct);
        if (product) {
            return product;
        } else {
            console.error("Not found");
        }
    }
}
const productManager = new ProductManager();
productManager.addProduct('Manzana','Lo mejor a tu meza, manzanas rojas y sabrosas.', 250, 'www.manzana.com', 100);
productManager.addProduct('Naranja','Lo mejor a tu meza, naranjas jugosas y sabrosas.', 350, 'www.naranja.com', 100);
productManager.addProduct('Sandia','Lo mejor a tu meza, sandias dulces y sabrosas.', 200, 'www.sandia.com', 100);
productManager.addProduct('Palta','Lo mejor a tu meza, palta.', 950, 'www.palta.com', 100);
console.log(productManager.getProducts())
console.log(productManager.getProductById(1));
// console.log(productManager.getProductById(2));
// console.log(productManager.getProductById(3));
// console.log(productManager.getProductById(4));
// console.log(productManager.getProductById(8));
