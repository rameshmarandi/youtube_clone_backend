
// require('dotenv').config({
//     path:"./"
// })
import dotenv from "dotenv"
import connectDB from './db/index.js';
import { app } from "./app.js";

dotenv.config({
    path:"./env"
});

let PORT  = process.env.PORT || 8000 

connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`🎊🎊🎊🎊🎊🎊🎊 Congratulation 🎊🎊🎊🎊🎊🎊🎊: Server is running on PORT : ${PORT}`)
    })

}).catch(err=>{
    console.log(`Error connecting to the database ${err}`);
})


/*
(async()=>{

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on('error', (err)=>{
            console.error("Express not able to talk to DB", err)
            throw err
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`Express listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("Error :During DB connection", error);
        throw error;
    }

})()

*/