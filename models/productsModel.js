const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    price: {
        type:Number,
        required:[0,"El campo es obligatorio"],
        min:[0, "Debe introducir un numero mayor a cero"],
        get:function(value){//se agrega impuesto
            return value *1.21;
        },
    },
    code: {
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    description: {
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    category: {
        type:String,
        required:[true,"El campo es obligatorio"]
    },
});

productSchema.set("toJSON",{getters:true});
const productsModel = mongoose.model("products", productSchema);

module.exports = productsModel;
