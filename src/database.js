const mongoose = require('mongoose');
    mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/proyecto', {
    
})
    .then(db => console.log('La base esta conectada'))
    .catch(err => console.log(err));

