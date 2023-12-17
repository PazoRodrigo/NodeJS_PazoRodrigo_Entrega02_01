const { Router } = require("express");
const CartManager = require("../entities/cartManager.entity");

const router = Router();

const oCartManager = new CartManager();

//http://localhost:8080/api/carts/2
http: router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await oCartManager.getCartById(id);
    res.json({ payload: result });
  } catch (error) {
    res.status(400).json("***[ER]** - " + error);
  }
});

//http://localhost:8080/api/carts
router.post("/", (req, res) => {
  try {
    oCartManager.addCart();
    res.status(201).json({ message: "Cart Created" });
  } catch (error) {
    res.status(500).json("***[ER]** - " + error);
  }
});

//http://localhost:8080/api/carts
router.post("/:cid/product/:pid", (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cartId = cid;
    const productId = pid;
    oCartManager.addProduct(cartId, productId);
    res.status(201).json({ message: "Product Add to Cart" });
  } catch (error) {
    res.status(500).json("***[ER]** - " + error);
  }
});

module.exports = router;
