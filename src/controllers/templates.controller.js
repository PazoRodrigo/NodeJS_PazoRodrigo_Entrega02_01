const { Router } = require("express");

const router = Router();

const users = {
  name: "Mate",
  role: "admin",
};
const products = [
  {
    id: 1,
    name: "Prod 1",
  },
  {
    id: 2,
    name: "Prod 2",
  },
  {
    id: 3,
    name: "Prod 3",
  },
  {
    id: 4,
    name: "Prod 4",
  },
];
router.get("/users", (req, res) => {
  res.render("users", {
    users,
    style: "./css/index.css",
    isAdmin: users.role === "admin",
  });
});
router.get("/products", (req, res) => {
  res.render("products", {
    products,
    users,
    style: "./css/index.css",
    isAdmin: users.role === "admin",
  });
});
router.get("/carts", (req, res) => {
  res.render("carts");
});
router.get("/profile", (req, res) => {
  res.render("profile");
});
router.get("/categories", (req, res) => {
  res.render("categories");
});

module.exports = router;
