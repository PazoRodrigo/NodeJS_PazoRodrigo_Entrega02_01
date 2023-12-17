const productsController = require("../controllers/products.controller");
const cartsController = require("../controllers/carts.controller");
const templatesController = require("../controllers/templates.controller");

const router = (app) => {
  app.use("/", templatesController);
  app.use("/api/products", productsController);
  app.use("/api/carts", cartsController);
};

module.exports = router;
