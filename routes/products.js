const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

//Retornando todos los productos
router.get("/home",(req, res, next) => req.app.verifyToken(req, res, next),productsController.getAll);

//Detalle de un producto por id
router.get("/:id",(req, res, next) => req.app.verifyToken(req, res, next),productsController.getById);

//Operaciones extras para crear modificar y eliminar producto
//Crear un producto
router.post('/create',(req, res, next) => req.app.verifyToken(req, res, next), productsController.create);

//Actualizar un producto
router.put("/:id",(req, res, next) => req.app.verifyToken(req, res, next), productsController.update);

//Eliminar
router.delete("/:id",(req, res, next) => req.app.verifyToken(req, res, next),productsController.deleteProduct);

module.exports = router;