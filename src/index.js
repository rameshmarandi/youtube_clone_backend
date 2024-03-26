
// require('dotenv').config({
//     path:"./"
// })
import dotenv from "dotenv"
import connectDB from './db/index.js';

dotenv.config({
    path:"./env"
});
connectDB()


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