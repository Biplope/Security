const router = require("express").Router();
const productController = require("../controllers/productController");
// const { authGuard, authGuardAdmin } = require('../middleware/authGuard');

// router.post('/create_product', authGuardAdmin, productController.createProduct)
router.post("/create_product", productController.createProduct);

// get all products
router.get("/get_products", productController.getProducts);

//single products
router.get("/get_product/:id", productController.getSingleProduct);

//Update products
// router.put("/update_product/:id", authGuardAdmin, productController.updateProduct)
router.put("/update_product/:id", productController.updateProduct);

//delete products
router.delete("/delete_product/:id", productController.deleteProduct);
// router.delete("/delete_product/:id", authGuardAdmin, productController.deleteProduct)

module.exports = router;
