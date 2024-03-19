const mongoose = require("mongoose")
var Schema  = mongoose.Schema;
var playerSchema = new Schema(
    {
        name: {
                type:String,
                required: true
        },
        country: {
            type:String,
            required: true
        },
        jerseynumber: {
            type:Number,
            required: true
        },
        price: {
            type:Number,
        }
   
    }
)

module.exports = mongoose.model('playerSchema',playerSchema);