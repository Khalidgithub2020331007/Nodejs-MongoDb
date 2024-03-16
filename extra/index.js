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
        required:true
    },
    password:{
        type:String,
        required:true
    },
    height:String,
    weight:Number,
    age:Number,
    gender:String,
    contactNumber:String,
    dateOfBirth:Date



});



const connectDB= async()=>
{
    try {
        await mongoose.connect('mongodb://localhost:27017/testApp');
        console.log("Khalid Successfully connect with mongodb at ",new Date().toLocaleString());

        
    } catch (error) {
         console.log("DB is not Connected ",error);
        process.exit(1);
    }
};

const Patient=mongoose.model("Patients",patientSchema);

app.get('/patients/:id',async (req,res)=>{
    // const patient= await Patient.find();
    // if(patient)
    // res.status(201).send(patient);
    // else{
    //     res.status(404).send({
    //         message:"NO data",
    //     })
    // }
    const id =req.params.id;
    const products= await Patient.find({_id:id});
    res.send(products)
})

app.post("/patients",async (req,res)=>
{
    try{
        const newPatient= new Patient({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            weight:req.body.weight,
            height:req.body.height,
            age:req.body.age,
            gender:req.body.gender,
            contactNumber:req.body.contactNumber,
            dateOfBirth:req.body.dateOfBirth
        });
        const patientData= await newPatient.save();
        res.status(201).send(patientData);
    }
    catch(error)
    {
        res.status(500).send({message:error.message});
    }
});



app.post('/api/doctors', (req, res) => {
    const doctor = req.body;
    db.collection('doctors').insertOne(doctor, (err, result) => {
        if (err) {
            console.error('Error inserting doctor:', err);
            res.status(500).send('Error inserting doctor');
            return;
        }
        res.status(201).send('Doctor inserted successfully');
    });
});

// Delete a doctor
app.delete('/api/doctors/:id', (req, res) => {
    const id = req.params.id;
    db.collection('doctors').deleteOne({ _id: id }, (err, result) => {
        if (err) {
            console.error('Error deleting doctor:', err);
            res.status(500).send('Error deleting doctor');
            return;
        }
        res.status(200).send('Doctor deleted successfully');
    });
});

// Update a doctor
app.put('/api/doctors/:id', (req, res) => {
    const id = req.params.id;
    const updatedDoctor = req.body;
    db.collection('doctors').updateOne({ _id: id }, { $set: updatedDoctor }, (err, result) => {
        if (err) {
            console.error('Error updating doctor:', err);
            res.status(500).send('Error updating doctor');
            return;
        }
        res.status(200).send('Doctor updated successfully');
    });
});
app.get('/',(req,res)=>
{
    res.send("Welcome to MongoDB");
})
// Get all doctors
app.get('/api/doctors', (req, res) => {
    db.collection('doctors').find({}).toArray((err, doctors) => {
        if (err) {
            console.error('Error getting all doctors:', err);
            res.status(500).send('Error getting all doctors');
            return;
        }
        res.status(200).json(doctors);
    });
});

// Get a doctor by ID
app.get('/api/doctors/:id', (req, res) => {
    const id = req.params.id;
    db.collection('doctors').findOne({ _id: id }, (err, doctor) => {
        if (err) {
            console.error('Error getting doctor by ID:', err);
            res.status(500).send('Error getting doctor by ID');
            return;
        }
        res.status(200).json(doctor);
    });
});

// Insert a patient, and implement other routes similarly
// ...

// Start the server
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
});
// Insert a patient
app.post('/api/patients', (req, res) => {
    const patient = req.body;
    db.collection('patients').insertOne(patient, (err, result) => {
        if (err) {
            console.error('Error inserting patient:', err);
            res.status(500).send('Error inserting patient');
            return;
        }
        res.status(201).send('Patient inserted successfully');
    });
});

// Delete a patient
app.delete('/api/patients/:id', (req, res) => {
    const id = req.params.id;
    db.collection('patients').deleteOne({ _id: id }, (err, result) => {
        if (err) {
            console.error('Error deleting patient:', err);
            res.status(500).send('Error deleting patient');
            return;
        }
        res.status(200).send('Patient deleted successfully');
    });
});

// Update a patient
app.put('/api/patients/:id', (req, res) => {
    const id = req.params.id;
    const updatedPatient = req.body;
    db.collection('patients').updateOne({ _id: id }, { $set: updatedPatient }, (err, result) => {
        if (err) {
            console.error('Error updating patient:', err);
            res.status(500).send('Error updating patient');
            return;
        }
        res.status(200).send('Patient updated successfully');
    });
});

// Insert an appointment
app.post('/api/appointments', (req, res) => {
    const appointment = req.body;
    db.collection('appointments').insertOne(appointment, (err, result) => {
        if (err) {
            console.error('Error inserting appointment:', err);
            res.status(500).send('Error inserting appointment');
            return;
        }
        res.status(201).send('Appointment inserted successfully');
    });
});

// Delete an appointment
app.delete('/api/appointments/:id', (req, res) => {
    const id = req.params.id;
    db.collection('appointments').deleteOne({ _id: id }, (err, result) => {
        if (err) {
            console.error('Error deleting appointment:', err);
            res.status(500).send('Error deleting appointment');
            return;
        }
        res.status(200).send('Appointment deleted successfully');
    });
});

// Update an appointment
app.put('/api/appointments/:id', (req, res) => {
    const id = req.params.id;
    const updatedAppointment = req.body;
    db.collection('appointments').updateOne({ _id: id }, { $set: updatedAppointment }, (err, result) => {
        if (err) {
            console.error('Error updating appointment:', err);
            res.status(500).send('Error updating appointment');
            return;
        }
        res.status(200).send('Appointment updated successfully');
    });
});

// Authenticate user as patient
app.post('/api/authenticate/patient', (req, res) => {
    // Your implementation for authenticating a user as patient
});

// Authenticate user as doctor
app.post('/api/authenticate/doctor', (req, res) => {
    // Your implementation for authenticating a user as doctor
});
