//Variables
const express = require('express');
const rowdyLogger = require('rowdy-logger');
const app = express();
const PORT = process.env.PORT || 4040;
const mongoose = require('mongoose');
require('dotenv').config();

//Setup database with mongoose
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

//check for error / successful connection
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));


//middleware
const startRowdy = rowdyLogger.begin(app);
app.use(express.json());  //set to accept json


//routes





//listen
app.listen(PORT, (() =>{
    console.log(`Server is listening at port ${PORT}`);
    startRowdy.print();
})
);













