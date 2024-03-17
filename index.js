const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const patientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    contactNumber:String,
    notification:Boolean,
    height:String,
    weight:Number,
    gender:String,
    dateOfBirth:Date,
    medicalHistory:String,
   
    
    



});


const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    contactNumber:String,
    notification:Boolean,
    height:String,
    weight:Number,
    gender:String,
    adress:String,
    rating:Number,
    reviews:String,
    bmdcRegistrationNumber:String,
    qualification:String,
    about:String,
    medicalSpecialty:String,
    exprience:Number,
    appointment:String,
    dateOfBirth:Date,
   

});

const appointmentSchema=new mongoose.Schema({
    patient:{
        type:String,
        required:true
    },
    doctor:{
        type:String,
        required:true,
        
    },
    prescription:String,
    appointmentDate:Date,
    status:String,
    rating:Number,
    review:String,
    notes:String,
   
});

const prescriptionSchema=new mongoose.Schema({
    appointment:{
        type:String,
        required:true
    },
    problem:String,
    medications:String,
    diagnosis:String,
    advice:String,
   
});


const connectDB= async()=>
{
    try {
        await mongoose.connect('mongodb://localhost:27017/doctorApp');
        console.log("Khalid Successfully connect with mongodb at ",new Date().toLocaleString());

        
    } catch (error) {
         console.log("DB is not Connected ",error);
        process.exit(1);
    }
};

const Patient=mongoose.model("Patients",patientSchema);
const Doctor=mongoose.model("Doctors",doctorSchema);
const Appointment=mongoose.model("Appointments",appointmentSchema);
const prescription=mongoose.model("Prescriptions",prescriptionSchema);

// Check 
app.get('/',(req,res)=>
{
    res.send("Welcome to MongoDB");
});

//  Connect
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
});


//  Patient
//  Get Specific patients
app.get('/api/patients/:id',async (req,res)=>{

  
    const id =req.params.id;
    const products= await Patient.find({_id:id});
    res.send(products)
});

//  Get All Patients
app.get('/api/patients',async (req,res)=>{
    const patient= await Patient.find();
    if(patient)
    res.status(201).send(patient);
    else{
        res.status(404).send({
            message:"NO data",
        })
    }

});

// Insert a Patient
app.post("/api/patients",async (req,res)=>
{
    try{
        const newPatient= new Patient({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            notification:req.body.notification,
            height:req.body.height,
            weight:req.body.weight,
            age:req.body.age,
            gender:req.body.gender,
            contactNumber:req.body.contactNumber,
            dateOfBirth:req.body.dateOfBirth,
            medicalHistory:req.body.medicalHistory,

        });
        const patientData= await newPatient.save();
        res.status(201).send(patientData);
    }
    catch(error)
    {
        res.status(500).send({message:error.message});
    }
});

// Delete a patients
app.delete('/api/patients/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const patient=await Patient.deleteOne({_id:id});

        if(patient) 
        res.status(200).send({success:true,message:"Deleted Patient id Successfully",data:patient});
    else
    res.status(404).send({success:false,message:"No patient found"});
    } catch (error) {
        res.status(500).send({message:error.message});
  
    }


  
});

// Update Patient
app.put('/api/patients/:id', async(req, res) => {
    try {
       const id=req.params.id;
       const  name=req.body.name;
       const  email=req.body.email;
       const  password=req.body.password;
       const  contactNumber=req.body.contactNumber;
       const  notification=req.body.notification;
       const  height=req.body.height;
       const  weight=req.body.weight;
       const  age=req.body.age;
       const  gender=req.body.gender;
       const  dateOfBirth=req.body.dateOfBirth;
       const  medicalHistory=req.body.medicalHistory;
   
       const updatePatient= await Patient.findByIdAndUpdate({_id:id},
           {
               $set:
               {
                   name:req.body.name,
                   email:req.body.email,
                   password:req.body.password,
                   notification:req.body.notification,
                   height:req.body.height,
                   weight:req.body.weight,
                   age:req.body.age,
                   gender:req.body.gender,
                   contactNumber:req.body.contactNumber,
                   dateOfBirth:req.body.dateOfBirth,
                   medicalHistory:req.body.medicalHistory,
               },
   
           },
           {
               new :true
           });  
           if(updatePatient)
           res.status(200).send({success:true,message:"Updated Patient",data:updateProduct});
           else{
               res.status(404).send({
                   message:"No Patient found",
               });
           }
   
   } catch (error) {
       res.status(500).send({message:error.message});
   }
   });
   
   
//  Doctor
// Get a specific doctor
app.get('/api/doctors/:id',async (req,res)=>{

  
    const id =req.params.id;
    const products= await Doctor.find({_id:id});
    res.send(products)
});


// Get all doctors
app.get('/api/doctors',async (req,res)=>{
    const patient= await Doctor.find();
    if(doctor)
    res.status(201).send(doctor);
    else{
        res.status(404).send({
            message:"NO data",
        })
    }

});


// Insert a doctor
app.post("/api/doctors",async (req,res)=>
{
    try{
        const newDoctor= new Doctor({
            name:req.body.name,
            notification:req.body.notification,
            adress:req.body.adress,
            rating:req.body.rating,
            reviews:req.body.reviews,
            bmdcRegistrationNumber:req.body. bmdcRegistrationNumber,
            qualification:req.body.qualification,
            about:req.body.about,
            exprience:req.body.exprience,
            medicalSpecialty:req.body.medicalSpecialty,
            appointment:req.body.appointment,
            email:req.body.email,
            password:req.body.password,
            weight:req.body.weight,
            height:req.body.height,
            age:req.body.age,
            gender:req.body.gender,
            contactNumber:req.body.contactNumber,
            dateOfBirth:req.body.dateOfBirth,

        });
        const doctorData= await newDoctor.save();
        res.status(201).send(doctorData);
    }
    catch(error)
    {
        res.status(500).send({message:error.message});
    }
});







// Delete a doctor
app.delete('/api/doctors/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const doctor= await Doctor.deleteOne({_id:id});

        if (doctor)
        res.status(200).send({success:true,message:"Deleted Successfully",data:doctor});
    else
    res.status(404).send({success:true,message:"No doctor found"});
    } catch (error) {
        res.status(500).send({message:error.message});
    }
 
});


// Update a doctor
app.put('/api/doctors/:id',async (req, res) => {
    try{
        const id=req.params.id;
        const name=req.body.name;
        const notification=req.body.notification;
        const adress=req.body.adress;
        const rating= req.body.rating;
        const reviews=req.body.reviews;
        const bmdcRegistrationNumber=req.body. bmdcRegistrationNumber;
        const qualification=req.body.qualification;
        const about=req.body.about;
        const exprience=req.body.exprience;
        const medicalSpecialty=req.body.medicalSpecialty;
        const appointment=req.body.appointment;
        const email=req.body.email;
        const password=req.body.password;
        const weight=req.body.weight;
        const height=req.body.height;
        const age=req.body.age;
        const gender=req.body.gender;
        const contactNumber=req.body.contactNumber;
        const dateOfBirth=req.body.dateOfBirth;

        const updateDoctor= await Doctor.updateOne({_id:id},
            {
                $set:
                {
                    name:req.body.name,
                    notification:req.body.notification,
                    adress:req.body.adress,
                    rating:req.body.rating,
                    reviews:req.body.reviews,
                    bmdcRegistrationNumber:req.body. bmdcRegistrationNumber,
                    qualification:req.body.qualification,
                    about:req.body.about,
                    exprience:req.body.exprience,
                    medicalSpecialty:req.body.medicalSpecialty,
                    appointment:req.body.appointment,
                    email:req.body.email,
                    password:req.body.password,
                    weight:req.body.weight,
                    height:req.body.height,
                    age:req.body.age,
                    gender:req.body.gender,
                    contactNumber:req.body.contactNumber,
                    dateOfBirth:req.body.dateOfBirth,
                },
            },
            {
                new:true
            }
    );
    if(updateDoctor)res.status(200).send({success:true,message:"Updated Doctor Data",data:updateDoctor});
    else{
        res.status(404).send({
            message:"No Doctor found",
        });
    }
    
        
    }
    catch(error)
    {
        res.status(500).send({message:error.message});
    }
   
   
});


// Get Appointment of a Specific
app.get('/api/appointments/:id',async(req,res)=>
{
    const id =req.params.id;
    const appointment= await Appointment.find({_id:id});
    res.send(appointment);
});

// Get Appointment
app.get('/api/appointments',async(req,res)=>
{
    
    const appointments= await Appointment.find();
    if(appointments)

    res.send(appointments);
    else
    res.status(404).send({message:"No Data found"});
});

// Insert an appointment
app.post('/api/appointments', async(req, res) => {
    try {
        const newAppointment= new Appointment({
            patient:req.body.patient,
            doctor:req.body.doctor,
            prescription:req.body.prescription,
            appointmentDate:req.body.appointmentDate,
            status:req.body.status,
            rating:req.body.rating,
            review:req.body.review,
            notes:req.body.notes,
        });
        const appointmentData= await newAppointment.save();
        res.status(201).send(appointmentData);
    } catch (error) {
        res.status(500).send({message:error.message});
    }
});

// Delete an appointment
app.delete('/api/appointments/:id', async(req, res) => {

    try {
        const id =req.params.id;
        const appointment= await Appointment.findByIdAndDelete({_id:id});
        if(appointment)
        res.status(200).send({success:true,message:"Deleted Appointment Successfully",data:appointment});
        else
        res.status(404).send({success:true,message:"No appointment found"});
        } catch (error) {
            res.status(500).send({message:error.message});
        }
     
        

});

// Update an appointment
app.put('/api/appointments/:id', async(req, res) => {
    try {
        const id =req.params.id;
        const patient=req.body.patient;
        const doctor=req.body.doctor;
        const prescription=req.body.prescription;
        const appointmentDate=req.body.appointmentDate;
        const status=req.body.status;
        const rating=req.body.rating;
        const review=req.body.review;
        const notes=req.body.notes;
        const updateAppointment=await Appointment.findByIdAndUpdate({_id:id},
            {
                $set:
                {
                    patient:req.body.patient,
                    doctor:req.body.doctor,
                    prescription:req.body.prescription,
                    appointmentDate:req.body.appointmentDate,
                    status:req.body.status,
                    rating:req.body.rating,
                    review:req.body.review,
                    notes:req.body.notes,
                },
            },
            {
                new:true
            }
            );
            if(updateAppointment)res.status(200).send({success:true,message:"Updated Appointment Data",data:updateAppointment});
            else{
                res.status(404).send({
                    message:"No Appointment found",
                });
            }
            
                
            }
            catch(error)
            {
                res.status(500).send({message:error.message});
            }
});

// Authenticate user as patient
app.post('/api/authenticate/patient', (req, res) => {
    // Your implementation for authenticating a user as patient
});

// Authenticate user as doctor
app.post('/api/authenticate/doctor', (req, res) => {
    // Your implementation for authenticating a user as doctor
});
