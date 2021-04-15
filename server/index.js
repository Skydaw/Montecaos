
require('dotenv/config');
const userRoutes = require('./routes/user.routes');
const blogRoutes = require('./routes/blog.routes')
const shopRoutes = require('./routes/shop.routes')
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const mongoURI =process.env.MONGO_URL;



const app = express();

app.use(bodyParser.json());
app.use(cors());

//Connect to DB

mongoose.connect(mongoURI, { useNewUrlParser: true });



// Route
app.use('/api/user', userRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/shop', shopRoutes)




const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));