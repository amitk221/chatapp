const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
        title_ad:{
            type : String,
            required: true
        },
        brand_name:{
            type : String,
            required : true
        },
        price:{
            type : String,
            required : true
        },
            sell_Category:{
            type : String,
            required : true
        },
        url:{
            type : String,
            required : true
        },

        meta_description:{
            type : String,
            required : true
        },
        meta_keywords:{
            type : String,
            required : true
        },
        seo_Titel:{
            type : String,
            required : true
        },
        img_url:{
            type : String,
            required : true
        }
},{ timestamps: true }) 
const Products = new mongoose.model("Product" ,productSchema);
module.exports = Products;