const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
    fname : {type:String, required:true, trim:true},
    lname : {type:String, required:true, trim:true},
    phone : {type:Number, required:true, unique:true, trim:true},
    UserName : {type:String, required:true, unique:true, trim:true},
    businessName : {type:String, required:true, unique:true, trim:true},
    email: {type:String, required:true, unique:true, trim:true},
    password: {type:String, required:true, unique:true, trim:true, minlength:[8, 'Must be atleast 8 characters'], maxlength:[15, 'Must be atmost 15 characters']  },
    
}

, { timestamps: true });

module.exports= mongoose.model('author', authorSchema);
