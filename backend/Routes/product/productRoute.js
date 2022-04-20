const express = require("express");
const Users = require('../../Models/user/userModels');
const Products = require("../../Models/product/productModel")
var multer = require('multer'); 
const product = express.Router();
const fs = require('fs');
const path = require('path');
const dirPath = path.join(process.cwd());

//middleware
//product.use('/uploads', express.static('uploads'));


//file uploading code

// var storage1 = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//       //Date.now() + "_" + file.originalname
//     }
// })

//var upload = multer({ storage: storage })

const fileFilter = (req , file ,cb)=>{
    if(file.mimetype ==='image/png' || file.mimetype ==='image/jpeg' ||file.mimetype ==='image/jpg' ) {
        cb(null , true)
    } else{
        cb(null , false)
    }
}

var storage = multer.diskStorage({
    destination: function(req , file , cb){
        cb(null , "./Uploads")
    } ,
    filename: function (req, file, cb) {
        cb(null , Date.now() + '_' + file.originalname )
    }
})


const upload = multer({storage: storage , fileFilter:fileFilter});










product.post("/" ,upload.single('img_url') , async (req, res)=>{
    try{

        console.log("fehjfd")
      //  console.log(req.body.title_ad); 
        // brand_name
        console.log(req); 
    if(req.file){
        const img_url = req.file.path;
          console.log("fehjfd")
        console.log(img_url); 

      const  { title_ad, brand_name,price, sell_Category, url, meta_description, meta_keywords, seo_Titel }  = req.body;
       let product = new Products({
        title_ad, brand_name, price ,sell_Category, url, meta_description, meta_keywords, seo_Titel,img_url
       }) 
       const savedProduct = await product.save();
        res.status(201).json({
            data:savedProduct
        })
    }
    console.log('--');
    

     }catch(err){
         console.log(err)
         res.status(400).json({
            data:[],
            err: err
        })
     }
    //res.send("hh")
});



product.get("/" , async(req , res)=>{
    try{
        console.log("hhsh")
       const product = await Products.find();
       res.status(200).json({
        data:product
    })
    } catch(err){
        res.status(400).json({
            data:[],
            err: err
        })
    }
})
// title_ad:,
// brand_name:,
// sell_Category,
// url,
// meta_description:,
// meta_keywords,
// seo_Titel,
// img_url:


product.post("/update/:id" ,upload.single('img_url') , async (req, res)=>{
    try{
        let id = req.params.id || req.query.id;
      //  console.log("fw22ehjfwwwwd" , DIR+'/'+ IsProductExist.img_url)
        //console.log(__dirname , __basepath)
      //  console.log(req.body.title_ad); 
        // brand_name
       //console.log(req); 
      const IsProductExist = await Products.findById(id);

    if(IsProductExist){
        // fs.unlinkSync(DIR+'/'+req.params.imagename+'.png');
        let img_url = IsProductExist.img_url ;
         if(req.file){
             console.log('---112')
             img_url = req.file.path ;
            fs.unlinkSync(dirPath + "/"+ IsProductExist.img_url );
         }
      const  { title_ad, brand_name,price, sell_Category, url, meta_description, meta_keywords, seo_Titel }  = req.body;
      console.log(req.body);
         const updatedResult = await Products.findOneAndUpdate(
          { _id: id },
          {
              title_ad : title_ad  || IsProductExist.title_ad,
              brand_name : brand_name || IsProductExist.brand_name, 
              price : price || IsProductExist.price,
              sell_Category: sell_Category ||IsProductExist.sell_Category,
              url: url || IsProductExist.url,
              meta_description: meta_description || IsProductExist.meta_description,
              meta_keywords: meta_keywords || IsProductExist.meta_keywords,
              seo_Titel: seo_Titel || IsProductExist.seo_Titel,
              img_url: img_url
          },
          {
            new: true,
          }
        );
         res.status(200).json({
          data:updatedResult
      })
      res.end();
    }
    // res.status(200).json({
    //     data: []
    // })
    console.log('--1');
    

     }catch(err){
         console.log(err)
         res.status(400).json({
            data:[],
            err: err
        })
     }
    //res.send("hh")
});




product.post("/delete/:id" , async (req, res)=>{
    try{
        let id = req.params.id || req.query.id;
        const deleteItems = await Products.deleteOne({ _id: id});
        console.log(deleteItems);
        res.sendStatus(400).jsonp({
            err:err,
            data: deleteItems
        })
    } catch(err){
        console.log(err);
        res.sendStatus(400).jsonp({
            err:err,
            data:[]
        })
    }
})


// product.post("/:id" ,upload.single('img_url') , async (req, res)=>{
//     try{
//     //     const filter = { name: 'Jean-Luc Picard' };
//         console.log("wmmm");
//         console.log(req);
//      if(req.file){
//         console.log("com1")
//         let img_url = req.file.path;
    // let id = req.params.id || req.query.id;
    // const  { title_ad, brand_name,price, sell_Category, url, meta_description, meta_keywords, seo_Titel }  = req.body;
    //    const updatedResult = await Users.findByIdAndUpdate(
    //     { _id: id },
    //     {
    //         title_ad : title_ad,
    //         brand_name : brand_name, 
    //         price : price,
    //         sell_Category: sell_Category,
    //         url: url,
    //         meta_description: meta_description,
    //         meta_keywords: meta_keywords,
    //         seo_Titel: seo_Titel,
    //         img_url: img_url
    //     },
    //     {
    //       new: true,
    //     }
    //   );
    //    res.status(200).json({
    //     data:updatedResult
    // })
// }
//     console.log("com")
//     } catch(err){
//         console.log(err);
//         res.status(400).json({
//             data:[],
//             err: err
//         })
//     }
// })

// const filter = { name: 'Jean-Luc Picard' };
// const update = { age: 59 };

// // `doc` is the document _after_ `update` was applied because of
// // `new: true`
// let doc = await Character.findOneAndUpdate(filter, update, {
//   new: true
// });
// doc.name; // 'Jean-Luc Picard'
// doc.age; // 59

module.exports = product;