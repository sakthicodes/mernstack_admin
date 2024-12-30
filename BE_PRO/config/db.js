const mongoose = require("mongoose");

const connectDb = async () =>{
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected",(conn.connection.host));
  } catch (error) {
    console.error("app not connected to db", (err.message))
    process.exit(1);
  }  

}
module.exports = connectDb;