var mongoose = require('mongoose')
var ToySchema = mongoose.Schema(
   {
      name: String,
      price: Number,
      brand: String,
      quantity: Number,
      image: String,
      detail: String,
      category: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'categories' 
     },
   }
);

var ToyModel = mongoose.model("Toy", ToySchema, "Toy");

module.exports = ToyModel;