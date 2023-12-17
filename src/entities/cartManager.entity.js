const FileManager = require("../utils/fileManager.utils");
const LUM = require("../utils/lum.utils");
const ProductManager = require("./productManager.entity");

// Inicializo el objeto del Filemanager
const oFileManager = new FileManager("carritos");
// Agrego variable para LOG
const fechaLog = LUM.getCurrentDateTime();

class CartManager {
  #carts = [];

  // Contructor
  constructor() {}

  // Agrega un carrito a la lista de carritos
  async addCart() {
    await this.getCarts();
    //Genero un nuevo Id
    const newId = LUM.getNewId().toString();
    // Crea un carrito
    const newCart = {
      id: newId,
      products: [],
    };
    // Lo agrega a la lista
    this.#carts.push(newCart);
    // Lo agrega al archivo
    await oFileManager.writeFile(this.#carts);
  }

  // Agrega un producto a un carrito a la lista de carritos
  async addProduct(cartId, productId) {
    // Valido que exista el Carrito
    if (cartId.length == 0) throw "Debe ingresar el id del Carrito";
    await this.getCarts();
    // console.log("this.#carts", this.#carts);
    const cartExist = this.#carts.find((elem) => elem.id === cartId);
    if (!cartExist) throw `El carrito con id ${cartId} no existe`;
    // Valido que exista el Producto dentro del carrito
    const oProductManager = new ProductManager();
    const producto = await oProductManager.getProductById(productId);
    if (!producto) throw `El producto con id ${id} no existe`;

    let productsEnCarrito = cartExist.products;

    // Obtendo el producto a modificar si exite
    let productEnCarrito = productsEnCarrito.find(
      (elem) => elem.productId === productId
    );

    if (productEnCarrito === undefined) {
      // No existe en el carro y lo agrego con cantidad 1
      productEnCarrito = new Object();
      productEnCarrito.productId = productId;
      productEnCarrito.quantity = 1;
      productsEnCarrito.push(productEnCarrito);
    } else {
      // Existe en el carro y lo agrego 1 a la cantidad actual
      // Quito el producto en carrito que voy a modificar
      productsEnCarrito = productsEnCarrito.filter(
        (elem) => elem.productId !== productId
      );
      productEnCarrito.quantity++;
      productsEnCarrito.push(productEnCarrito);
    }
    cartExist.products = productsEnCarrito;
    // Quito el carrito que voy a modificar
    this.#carts = this.#carts.filter((elem) => elem.id != cartId);
    // Agrego el carrito modificado
    this.#carts.push(cartExist);
    await oFileManager.writeFile(this.#carts);
  }

  // Obtiene todos los carritos de la lista de carritos
  async getCarts() {
    let result = await oFileManager.readFile();
    this.#carts = result;
    return this.#carts;
  }

  // Obtiene un carrito de la lista de carritos por Id
  async getCartById(id) {
    // Valida que el id del carrito tenga datos para usarlo en el buscador
    if (id.length == 0) throw "Debe ingresar el id del Carrito";
    // Obtengo la lista de Carritos
    await this.getCarts();
    // Obtengo el carrito solicitado
    const lstResult = this.#carts.find((elem) => elem.id === id);
    // Obtengo los productos del carrito
    if (lstResult.products.length > 0) {
      return lstResult.products;
    } else {
      throw `Not Found. Cart '${id}' no encontrado`;
    }
  }
}

module.exports = CartManager;
