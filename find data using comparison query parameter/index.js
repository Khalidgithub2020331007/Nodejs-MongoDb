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
app.get("/products",async (req,res)=>{
    try {
     
//  Less than equal
//         const products=await Product.find({price:{$lte:233}});
//         if(products)
//         res.status(200).send(products);
//         else{
//             res.status(404).send({
//                 message:"No result found",
//             });
//         }
//  Less than
// const products=await Product.find({price:{$lt:233}});
// if(products)
// res.status(200).send(products);
// else{
//     res.status(404).send({
//         message:"No result found",
//     });
// }

        // greater than
        // const products=await Product.find({price:{$gt:233}});
        // if(products)
        // res.status(200).send(products);
        // else{
        //     res.status(404).send({
        //         message:"No result found",
        //     });
        // }


        // greater than Equal
        // const products=await Product.find({price:{$gte:233}});
        // if(products)
        // res.status(200).send(products);
        // else{
        //     res.status(404).send({
        //         message:"No result found",
        //     });
        // }

        // equal
        // const products=await Product.find({price:{$eq:233}});
        // if(products)
        // res.status(200).send(products);
        // else{
        //     res.status(404).send({
        //         message:"No result found",
        //     });
        // }


        // not equal
        // const products=await Product.find({price:{$ne:233}});
        // if(products)
        // res.status(200).send(products);
        // else{
        //     res.status(404).send({
        //         message:"No result found",
        //     });
        // }


        // in
        // const products=await Product.find({price:{$in:[750,233,1350]}});
        // if(products)
        // res.status(200).send(products);
        // else{
        //     res.status(404).send({
        //         message:"No result found",
        //     });
        // }


        // not in
        // const products=await Product.find({price:{$nin:[100,200,1350]}});
        // if(products)
        // res.status(200).send(products);
        // else{
        //     res.status(404).send({
        //         message:"No result found",
        //     });
        // }




        // As customar Choice
        const price=req.query.price;
        const products=await Product.find({price:{$gt:price}});
        if (products)
        {
            res.status(200).send(products);
        }
        else{
            res.status(404).send({message:"No result found"});
        }





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
