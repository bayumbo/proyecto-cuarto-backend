const { Router } = require('express');
const router = Router();

const User = require('../moldels/User');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hola mundo'));

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, 'secretkey')

    res.status(200).json({ token })

})

router.post('/registro', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) return res.status(401).send("El correo no existe");
    if (user.password !== password) return res.status(401).send("Contraseña incorrecta");

    const token = jwt.sign({ _id: user._id }, 'secretkey')
    res.status(200).json({ token })


})

router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: 1,
            name: "Tarea uno",
            description: "Lorem ipsum",
            date: "2019-11-17T20:39:05"
        },
        {
            _id: 2,
            name: "Tarea dos",
            description: "Lorem ipsum",
            date: "2019-11-17T20:39:05"
        },
        {
            _id: 3,
            name: "Tarea tres",
            description: "Lorem ipsum",
            date: "2019-11-17T20:39:05"
        }
    ])
})

router.get('/tasks-private', verifyToken, (req, res) =>{
    res.json([
        {
            _id: 1,
            name: "Tarea uno-privada",
            description: "Lorem ipsum",
            date: "2019-11-17T20:39:05"
        },
        {
            _id: 2,
            name: "Tarea dos-privada",
            description: "Lorem ipsum",
            date: "2019-11-17T20:39:05"
        },
        {
            _id: 3,
            name: "Tarea tres-privada",
            description: "Lorem ipsum",
            date: "2019-11-17T20:39:05"
        }
    ])
})

router.get('/administrador', verifyToken, (req, res) =>{
    res.send(req.userId);
})


module.exports = router;

function verifyToken(req, res, next){
    if (!req.headers.authorization){
        return res.status(401).send('Autorizacion requerida');
    }

    const token = req.headers.authorization.split(' ')[1]
    if (token ==='null'){
        return res.status(401).send('Autorizacion requerida');
    }

    const payload = jwt.verify(token, 'secretkey')
    req.userId = payload._id
    next();
}