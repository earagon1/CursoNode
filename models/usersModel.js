const mongoose = require('mongoose');
const bcrypt=require('bcrypt');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    lastname: {
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    documentType:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    documentNumber:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    phoneNumber:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    username:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    password:{
        type:String,
        required:[true,"El campo es obligatorio"]
    }
});

userSchema.pre("save", function(next){
    this.password=bcrypt.hashSync(this.password,10);
    next();
});

const usersModel = mongoose.model("users", userSchema);

module.exports = usersModel;
