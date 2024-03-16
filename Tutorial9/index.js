const express=require('express');
const mongoose = require('mongoose');
const app=express();
const port=3002;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:String,
    createdAt:{
        type:Date,
        default:Date.now,
    },
});
const Product=mongoose.model("Products",productSchema);

const connectDB=async()=>
{
    try{
        await mongoose.connect('mongodb://localhost:27017/testProdeuct');
        console.log("DB is connected");
    }
    catch{
        console.log("DB is not Connected ",error);
        process.exit(1);
    }
};



console.log("Khalid save at",new Date().toLocaleString());
app.post("/products",async (req,res)=>{
    try {
     const newProduct= new Product({
        title:req.body.title,
        price:req.body.price,
        description: req.body.description,
     });
     const productData=await newProduct.save();
     res.status(201).send(productData)
     
    } catch (error) {
        res.status(500).send({message:error.message});

    }
    
})
app.get("/",(req,res)=>{
    res.send("Welcome to Home Page");
})
app.listen(port,async()=>
{
    console.log(`Server is running at http://localhost:${port}`);
    await connectDB();
});
