const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');

require('./database');

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use('/api',require('./routes/index'));
    
app.listen(3000);
console.log('Conectado en el servidor', 3000);

