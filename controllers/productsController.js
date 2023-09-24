const ProductsModel = require('../models/productsModel');

//Recupera todos los productos
const getAll = async function (req, res, next) {
  try {
    const documents = await ProductsModel.find();
    res.status(200).json({products:documents});
  } catch (e) {
    console.log(e);
    next(e);
  }
};

//Recupera un producto
const getById = async function (req, res, next) {
  try {
    const document = await ProductsModel.findById(req.params.id);
    res.status(200).json({product:document});
  } catch (e) {
    console.log(e);
    res.json(e.message);
  }
};

//Crea un producto
const create = async function (req, res, next) {
  try {
    const product = new ProductsModel({
      name: req.body.name,
      price: req.body.price,
      code: req.body.code,
      description: req.body.description,
      category:req.body.category

    });
    const document = await product.save();
    res.status(200).json({ message: 'The product was created successfully', product:document});
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
};

//Modifica un producto
const update = async function (req, res, next) {
  try {
    const document = await ProductsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!document) {
      return res.status(404).json({ message:'Product not found'});
    }
    res.status(200).json({ message: 'The product was successfully modified', product: document });
  } catch (e) {
    console.error(e);
  }
};

//Elimina un producto
const deleteProduct = async function (req, res, next) {
  try {
    const deletedProduct = await ProductsModel.findById(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ message:'Product not found' });
    }
    await ProductsModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message:'Successfully removed'});
  } catch (e) {
    console.error(e);
  }
};

module.exports = {getAll,getById,create,update,deleteProduct};