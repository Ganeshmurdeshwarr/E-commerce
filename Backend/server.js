const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const productRouter = require("./routes/productRoutes")
const cartRouter = require("./routes/cartRouter")


const app = express()
app.use(express.json())
app.use(cors())

dotenv.config()
const PORT = process.env.PORT || 3000

// Connect to MongoDB
connectDB()

app.get("/" , (req , res)=>{
  res.send("'WELCOME TO BACKEND")
})

//API Routes
app.use("/api/users", userRoutes)
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT , ()=>{
  console.log(`Server is running on http://localhost:${PORT} `)
})