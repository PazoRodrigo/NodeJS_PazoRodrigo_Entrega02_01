const FileManager = require("../utils/fileManager.utils");
const LUM = require("../utils/lum.utils");

// Inicializo el objeto del Filemanager
const oFileManager = new FileManager("products");
// Agrego variable para LOG
const fechaLog = LUM.getCurrentDateTime();

class ProductManager {
  #products = [];

  // Contructor
  constructor() {
    // this.id = 1;
  }

  // Obtiene todos los productos de la lista de productos
  async getProducts() {
    let result = await oFileManager.readFile();
    this.#products = result;
    return this.#products;
  }

  // Obtiene un producto de la lista de productos por Id
  async getProductById(id) {
    // Valida que el id del producto tenga datos para usarlo en el buscador
    if (id.length == 0) throw "Debe ingresar el id del Producto";
    // Obtengo la lista de Productos
    await this.getProducts();
    // Busca el producto solicitado
    const lstResult = this.#products.find((elem) => elem.id === id);
    if (lstResult) {
      return lstResult;
    } else {
      throw `Not Found. Product '${id}' no encontrado`;
    }
  }

  // Agrega un producto a la lista de productos
  async addProduct(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail
  ) {
    try {
      // Valida que el codigo del producto tenga datos para usarlo en el buscador de repetidos
      if (code.length == 0) throw "Debe ingresar el código del Producto";
      // Obtengo la lista de Productos
      await this.getProducts();
      // Valida que el producto no exista en la lista de Productos
      const productExist = this.#products.find((elem) => elem.code === code);
      if (productExist) throw `El producto con codigo ${code} ya existe`;
      // Valida que el producto tenga todos los campos estén completos
      const valFields = await this.validateFields(
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail
      );
      if (valFields.length > 0) throw "Para agregar un producto: " + valFields;
      //Genero un nuevo Id
      const newId = LUM.getNewId().toString();
      // Crea un producto
      let newProduct = {
        id: newId,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
      };
      // Lo agrega a la lista
      this.#products.push(newProduct);
      // Lo agrega al archivo
      await oFileManager.writeFile(this.#products);
    } catch (error) {
      throw error;
    }
  }

  // Actualizar un producto a la lista de productos
  async updateProduct(
    id,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail
  ) {
    console.log(
      "updateProduct",
      id,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail
    );
    try {
      // Valida que el id del producto tenga datos para usarlo
      if (id.length == 0) throw "Debe ingresar el id del Producto";
      // Obtengo la lista de Productos
      await this.getProducts();
      // Valida que el producto exista en la lista de Productos
      const productExist = this.#products.find((elem) => elem.id === id);
      if (!productExist) throw `El producto con id ${id} no existe`;
      // Valida que el codigo del producto tenga datos para usarlo en el buscador de repetidos
      if (code.length == 0) throw "Debe ingresar el código del Producto";
      // Valida que el producto tenga todos los campos estén completos
      const valFields = this.validateFields(
        title,
        description,
        code,
        price,
        status,
        stock,
        category
      );
      if (valFields.length > 0)
        throw "Para actualizar un producto: " + valFields;
      // Crea un producto que tomará el lugar del que es actualizado
      const updatedProduct = {
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
      };
      // Quita el producto con datos anteriores de la lista. Almaceno todos los diferentes al a modificar
      this.#products = this.#products.filter((elem) => elem.id !== id);
      // Agrego el producto actualizado
      this.#products.push(updatedProduct);
      // Lo agrega al archivo
      await oFileManager.writeFile(this.#products);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async productExist(oFileManager, code) {
    console.log("code: ", code);
    const result = false;
    if (oFileManager.existFile()) {
      const contenido = await oFileManager.readFile();
      console.log("contenido", contenido);
    }
    return result;
  }
  // Borra un producto de la lista de productos por Id
  async deleteProduct(id) {
    try {
      // Valida que el id del producto tenga datos para usarlo
      if (id.length == 0) throw "Debe ingresar el id del Producto";
      // Obtengo la lista de Productos
      await this.getProducts();
      // Valida que el producto no exista en la lista de Productos
      const productExist = this.#products.find((elem) => elem.id === id);
      if (!productExist) throw `El producto con id ${id} no existe`;
      // Los uso como validación del borrado
      const cant = this.#products.length;
      // Quita el producto con datos anteriores de la lista. Almaceno todos los diferentes al a modificar
      this.#products = this.#products.filter((elem) => elem.id !== id);
      if (this.#products.length === cant) {
        throw `El producto con id ${id} no se ha borrado. Validar`;
      }
      // Lo agrega al archivo
      await oFileManager.writeFile(this.#products);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  CantProductos() {
    return this.#products.length;
  }

  // Valida que el producto tenga todos los campos estén completos
  async validateFields(
    title,
    description,
    code,
    price,
    status,
    stock,
    category
  ) {
    const result = "";
    if (
      title.length == 0 ||
      description.length == 0 ||
      code.length == 0 ||
      price.length == 0 ||
      status.length == 0 ||
      stock.length == 0 ||
      category.length == 0
    ) {
      if (title.length == 0) {
        result += `Debe ingresar el título.`;
      }
      if (description.length == 0) {
        result += `Debe ingresar la descripción.`;
      }
      if (code.length == 0) {
        result += `Debe ingresar el código.`;
      }
      if (price.length == 0) {
        result += `Debe ingresar el precio.`;
      }
      if (status.length == 0) {
        result += `Debe ingresar el status.`;
      }
      if (stock.length == 0) {
        result += `Debe ingresar el stock.`;
      }
      if (category.length == 0) {
        result += `Debe ingresar la categoría.`;
      }
    }
    return result;
  }
}

module.exports = ProductManager;
