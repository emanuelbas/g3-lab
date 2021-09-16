const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:1234@cluster0.2pe6b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(db => console.log('Se conecto a la BD'))
    .catch(err => console.log(err));
