require('dotenv').config();
const express = require('express');

const database = require('./services/mongoose');
const userRouter = require('./modules/users/router');
const chatRouter = require('./modules/chats/router');
const messageRouter = require('./modules/messages/router');

database().then(() => console.log('Conectado a la base de datos.' ))
.catch(e => console.log('ERROR: No conectado a la base de datos.', e));;

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.json());
app.use('/users', userRouter);
app.use('/chats', chatRouter);
app.use('/messages', messageRouter);

// a little easter egg :P
app.get('/coffee', (req, res) => res.send('So sorry', 418));

app.listen(process.env.PORT, () => console.log('Servidor levantado en', process.env.PORT));