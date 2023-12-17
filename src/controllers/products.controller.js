const { Router } = require("express");
const ProductManager = require("../entities/productManager.entity");
const uploader = require("../utils/multer.utils");

const router = Router();

const oPrdManager = new ProductManager();

//http://localhost:8080/api/products
http: router.get("/", async (reg, res) => {
  try {
    const lstResult = await oPrdManager.getProducts();
    res.json({ payload: lstResult });
  } catch (error) {
    res.status(400).json("***[ER]** - " + error);
  }
});

//http://localhost:8080/api/products/2
router.get("/:id", async (reg, res) => {
  try {
    const { id } = reg.params;
    const result = await oPrdManager.getProductById(id);
    res.json({ payload: result });
  } catch (error) {
    res.status(400).json("***[ER]** - " + error);
  }
});

//http://localhost:8080/api/products
router.post("/", uploader.single("file"), (req, res) => {
  try {
    const { title, description, code, price, status, stock, category, file } =
      req.body;

    const pathFile = req.file.path;
    oPrdManager.addProduct(
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      pathFile
    );
    res.status(201).json({ message: "Product Created" });
  } catch (error) {
    res.status(500).json("***[ER]** - " + error);
  }
});

//http://localhost:8080/api/products/2
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = req.body;
    await oPrdManager.updateProduct(
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
    res.status(200).json({ message: "Product Updated" });
  } catch (error) {
    console.log(`***[ER]** No se pudo actualizar el Producto. ${error}`);
    res.status(500).json("***[ER]** No se pudo actualizar el Producto");
  }
});

//http://localhost:8080/api/products/2
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await oPrdManager.deleteProduct(id);
    res.status(200).json({ message: "Product Deleted" });
  } catch (error) {
    res.status(400).json("***[ER]** - " + error);
  }
});

module.exports = router;
