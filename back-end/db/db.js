const mongoose = require('mongoose');

const {
    MONGO_URL
} = process.env

mongoose.connect(MONGO_URL, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
})

const db = mongoose.connection;
  
db.on('error', (error) => {
    console.error(error);
})
  
db.once('open', () => {
    
    console.log('Connected to MongoDB database');
})