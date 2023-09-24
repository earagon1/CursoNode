const UsersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAll = async function (req, res, next) {
  try {
    const documents = await UsersModel.find();
    res.status(200).json({users:documents});
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getById = async function (req, res, next) {
  try {
    const document = await UsersModel.findById(req.params.id);
    res.status(200).json({user:document});
  } catch (e) {
    console.log(e);
    res.json(e.message);
  }
};

const create = async function (req, res, next) {
  try {
    const user = new UsersModel({
        name:req.body.name,
        lastname: req.body.lastname,
        documentType:req.body.documentType,
        documentNumber:req.body.documentNumber,
        phoneNumber:req.body.phoneNumber,
        username:req.body.username,
        password:req.body.password
    });
    const document = await user.save();
    res.status(201).json({user:document});
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
};

const update = async function (req, res, next) {
  try {

    const user = await UsersModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const document = await UsersModel.updateOne({ _id: req.params.id }, req.body);

    console.log("Resultado de la actualización:", document);

    if (document.nModified === 0) {
      return res.status(204).json({ message: "Nada que modificar" });
    }
    res.status(204).json({ message: "El usuario ha sido modificado" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const deleteUser = async function (req, res, next) {
  try {
    console.log(req.query);
    await UsersModel.deleteOne({ _id: req.params.id });
    res.status(204).json({message:"El usuario ha sido eliminado"});
  } catch (e) {
    console.log(e);
  }
};

const login = async function (req, res, next) {
  try {
    const document = await UsersModel.findOne({username:req.body.username});
    if(!document){
      return res.json({message:"El email y/o contraseña son incorrectos"});
    }
    if (bcrypt.compareSync(req.body.password, document.password)) {
      const token = jwt.sign(
        { userId: document._id },
        req.app.get("secretKey"),
        {
          expiresIn: "1h",
        }
      );
      res.json(token);
    }else{
      return  res.json({message:"El email y/o contraseña son incorrectos"});
    }

  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
};

module.exports = {getAll,getById,create,update,deleteUser,login};