const port = "4000";

const express= require("express");
const app = express();

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { type } = require("os");
const { error } = require("console");
require('dotenv').config();

app.use(express.json())
app.use(cors())
//DataBase Connection
mongoose.connect(process.env.MONGODB_URI);

app.get('/',(req,res)=>{
    res.send('express is runing');
})

//Image Storage Engine
const storage=multer.diskStorage({
    destination:'./upload/images',
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`) // Unique filename
      }
})
const upload=multer({storage:storage});

//creating upload end poin for images
app.use('/images',express.static('upload/images'))
app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url : `http://localhost:${port}/images/${req.file.filename}`
    })
})
//Schema for Creaing Product
const Products = mongoose.model('Products',{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    }
})
///Schema for Creaing User

const Users = mongoose.model('Users',{
    username:{
        type:String,
      
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
       
    },
    cartData:{
        type:Object,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
   
})

//// creating end point for adding new product
app.post('/addproduct',async(req,res)=>{
    let id ;
    let  product = await Products.find({});
    if( product.length>0){
        let last_product_arr = product.slice(-1)
        let last_product_id =last_product_arr[0]
        id = last_product_id.id+1;
    }else{
        id =1;
    }
    const Product = new Products({
        id:id,
        name:req.body.name,
        image:req.body.image,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
        category:req.body.category,
    });
    console.log('product',Product);
    await Product.save();
    console.log('Saved');
    res.json({
        success:true,
        name:req.body.name,
    })
})

//// creating end point for deleting product
app.post('/remove', async (req, res) => {
    try {
        await Products.findOneAndDelete({ id: req.body.id });
        console.log('Product removed:', req.body.id);
        res.json({
            success: true,
            id: req.body.id,
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

//// creating end point for display all products
app.get('/allproducts', async (req, res) => {
    try {
        let allProducts = await Products.find({});
        console.log("all products fetched", allProducts);
        res.send(allProducts);
    } catch (error) {
        console.error("Error fetching all products:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});


//// creating end point for user register

app.post('/signup', async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, error: "existing user found with same email id" });
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const user = new Users({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart
        });

        await user.save();

        const data = {
            id: user.id
        };

        const token = jwt.sign(data, 'secret_com');

        res.json({ success: true, token });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
//// creating end point for user login

app.post('/login', async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (user) {
            const passwordCompare = user.password === req.body.password;
            if (passwordCompare) {
                const data = {
                    user: {
                        id: user.id
                    }
                };
                const token = jwt.sign(data, 'secret_com');
                res.status(200).json({ success: true, token });
            } else {
                res.status(400).json({ success: false, error: "Wrong Password" });
            }
        } else {
            res.status(400).json({ success: false, error: "Wrong email id" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
//// creating end point for newcollection
app.get('/newcollection', async (req, res) => {
    try {
        let allProducts = await Products.find({});
        let newcollection = allProducts.slice(1).slice(-8)
        console.log("newcollection fetched", newcollection);
        res.send(newcollection);
    } catch (error) {
        console.error("Error fetching all newcollection:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
//// creating end point for popular in women
app.get('/popularinwomen', async (req, res) => {
    try {
        let allProducts = await Products.find({category:'women'});
        let popular_in_women = allProducts.slice(0,4)
        console.log("popular in women fetched", popular_in_women);
        res.send(popular_in_women);
    } catch (error) {
        console.error("Error fetching all newcollection:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
//// creating midleware for fetch user
const fetchUser = async(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        res.status(401).send({errors:"please athenticate using valid token"})
    }else{
        try{
            const data = jwt.verify(token,"secret_com");
            req.user = data.user;
            next();
        }catch(error){
            res.status(401).send({errors:"please athenticate using valid token"})
        }
    }

}
//// creating end point for add products to cart
app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("from addtocart",req.body,req.user)
    let userData = await Users.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("added to cart")
}) 
//// creating end point for remove products to cart
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("from addtocart",req.body,req.user)
    let userData = await Users.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("removed from cart")
}) 
//// creating end point for getting cartData
app.post('/getcartData',fetchUser,async(req,res)=>{
    console.log("getCart");
    let userData = await Users.findOne({_id:req.user.id})
    console.log("getCart",userData.cartData);
    res.json(userData.cartData)

}) 
app.listen(port,(error)=>{
    if(!error){
        console.log("server runing",port);
    }else{
        console.log("error",error);
    }
    
})