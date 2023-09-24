const express= require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

//Retornando todos los usuarios
router.get("/",(req, res, next) => req.app.verifyToken(req, res, next), usersController.getAll);

//Retornando un usuario dado su id
router.get("/:id",(req, res, next) => req.app.verifyToken(req, res, next), usersController.getById);

//Crear un usuario
router.post('/register', usersController.create);

//Login
router.post("/auth",usersController.login);

//Actualizar un usuario
router.put("/:id",(req, res, next) => req.app.verifyToken(req, res, next), usersController.update);

//Eliminar
router.delete("/:id",(req, res, next) => req.app.verifyToken(req, res, next) ,usersController.deleteUser);

module.exports = router;
