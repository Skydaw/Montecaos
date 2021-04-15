
require('dotenv/config');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mongoURI =process.env.MONGO_URL;
const port = process.env.PORT;


// route
const userRoutes = require('./routes/user.routes');
const blogRoutes = require('./routes/blog.routes')
const shopRoutes = require('./routes/shop.routes')

const app = express();

app.use(express.json());

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
app.use('/api/shop', shopRoutes)





app.listen(port, () => console.log(`Server started on port ${port}`));