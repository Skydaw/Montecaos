
require('dotenv/config');
const cookieParser =require("cookie-parser")
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mongoURI =process.env.MONGO_URL;
const port = process.env.PORT;


// route
const userRoutes = require('./routes/user.routes');
const blogRoutes = require('./routes/blog.routes')
const shopRoutes = require('./routes/shop.routes')
const cartRoutes = require('./routes/cart.routes')
const orderRoutes = require('./routes/order.routes')

const app = express();


app.use(express.json());
app.use(cookieParser())

app.use(cors({
    credentials:true,
    origin:['http://localhost:8000','http://localhost:3000','http://localhost:8080']
}))

//Connect to DB

mongoose.connect(mongoURI, { 
    useNewUrlParser: true,
    useUnifiedTopology:true 
    });



// Route
app.use('/api/user', userRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);




app.listen(port, () => console.log(`Server started on port ${port}`));