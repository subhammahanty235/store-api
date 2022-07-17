const express = require('express')
const router = express.Router()
const {getAllProducts , getAllProductsStatic ,addNewProduct} = require('../controllers/products')

router.get('/',getAllProducts)
router.get('/static',getAllProductsStatic)
router.post('/addnewproduct',addNewProduct)

module.exports = router;