import mongoose from 'mongoose';

const uri = "mongodb+srv://kaurkamalpreet029_db_user:lMe5it5PXJM1Cn8g@cluster0.1fokjcw.mongodb.net/social-app?retryWrites=true&w=majority&appName=Cluster0&authSource=admin";

mongoose.connect(uri)
    .then(() => {
        console.log("Connected to Atlas!");
        process.exit(0);
    })
    .catch(err => {
        console.error("Connection error:", err.message);
        process.exit(1);
    });
