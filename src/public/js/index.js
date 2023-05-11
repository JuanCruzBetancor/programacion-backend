const socketClient = io(); 

const form = document.getElementById('form');
const inputName = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputUrl = document.getElementById('thumbnail')
const inputStock = document.getElementById('stock')
const inputPrice = document.getElementById('number')
const products = document.getElementById('products');
form.onsubmit = (e) =>{
    e.preventDefault()
    const title = inputName.value;
    const description = inputDescription.value;
    const thumbnail = inputUrl.value;
    const stock = inputStock.value;
    const price = inputPrice.value;
    socketClient.emit('newProduct', {title, price, description, thumbnail, stock})
}
socketClient.on('arrayProducts', (array) =>{
    console.log(array);
    let infoProducts = '';
    array.forEach(p => {
        infoProducts += `${p.title} - ${p.price} <br>`
    });
    products.innerHTML = infoProducts;
})