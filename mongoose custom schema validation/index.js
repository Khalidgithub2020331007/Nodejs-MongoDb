const express=require('express');
const mongoose = require('mongoose');
const app=express();
const port=3002;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"proudct title is required"],
        minlength:[3,"maximum length of the product title should be 3"],
        maxlenght:[16,"maximum length of the product title should be 16"],
        trim:ture  ,//to remove space
        validate:
        {
            validator:function(v){
                v.length==10;
            },
            message:(props)=> `${props.value} is not a valid title`,
        },

    },
    price:{
        type:Number,
        required:true,
        min:[20,"minimum should be 20"],
        max:[20000,"maximum shold be 23"],

    },
    email:{
        type:String,
        unique:true

    },
    description:String,
    createdAt:{
        type:Date,
        default:Date.now,
    },
    phoneNumber:{
        type:String,
        requied:[true,"phone number is required"],
        validate:{
            validator:function(v)
            {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message:(props)=> `${props.value} is not a valid title`,
     
        }
    }
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
       

        const products=await Product.find();
        if(products)
        res.status(200).send(products);
        else{
            res.status(404).send({
                message:"No result found",
            });
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
app.delete("/products/:id",async(req,res)=>
{
    try {
        const id=req.params.id;
        //const product=await Product.deleteOne({_id:id}); // for only delet 

        const product=await Product.findByIdAndDelete({_id:id});
        if(product)
        res.status(200).send({success:true,message:"Deleted Successfully",data:product});
    else
    res.status(404).send({success:false,message:"No data found"});
    } catch (error) {
        res.status(500).send({message:error.message});
  
    }
});
app.put('/products/:id',async(req,res)=>
{
    try {
        const id=req.params.id;
        const title=req.body.id;
        const description=req.body.description;
        const price=req.body.price;
        const updatedProduct= await Product.findByIdAndUpdate({_id:id},
            {
                $set:
                {
                    title:req.body.title,
                    price:req.body.price,
                    description:req.body.description,
                },

            },
            {
                new:true
            });
    
            if(updatedProduct)
            res.status(200).send({success:true,message:"Updated",data:updatedProduct});
            else{
                res.status(404).send({
                    message:"No result found",
                });
            }
    
    } catch (error) {
        res.status(500).send({message:error.message});
    }
});
