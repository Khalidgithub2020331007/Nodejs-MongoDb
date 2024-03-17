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



console.log("Khalid run at",new Date().toLocaleString());
app.post("/products",async (req,res)=>{
    try {
        // to find all
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
    
});
app.get("/products/:id",async (req,res)=>{
    try {
        //  To find all

        // const products=await Product.find();
        // if(products)
        // res.status(200).send(products);
        // else{
        //     res.status(404).send({
        //         message:"No result found",
        //     });
        // }

        //  To find on basis of id
        // const id =req.params.id;
        // const products= await Product.find({_id:id});
        // res.send(products)

        //  To find title on basis of id
        const id =req.params.id;
        const products= await Product.find({_id:id}).select({title:1, _id:0});
        res.send(products)


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
