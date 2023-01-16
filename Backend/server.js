const express = require("express");
const app = express();
const connectDB=require("./Config/db")
const userRoutes=require('./routes/userRouter')
var noteRoutes=require('./routes/noteRoutes')

const dotenv=require('dotenv');
const { notFound, errorHandler } = require("./Middleware/errorMiddleware");

dotenv.config()
connectDB()

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);




app.get("/", function (req, res) {
  res.json({
    name:"Aaromal"
  });


});

app.use(notFound); 
app.use(errorHandler);


const PORT=process.env.PORT || 5000

app.listen(PORT,console.log(`server started at port ${PORT}`));
