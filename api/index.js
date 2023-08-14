const express = require('express');
const router = express.Router();


router.use((req, res, next) => {
    if (req.user) {
        console.log('User is set:', req.user);
    }
    next();
});

//Health
router.get('/health', async (req, res, next) => {
    res.send({
        message: 'Server is healthy',
        status: 200
    });
});

//Router: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

//Page Not Found
router.use('/', (req, res, next) => {
    res.status(400);
    res.send(
        next({
            message: 'Page Not Found',
            name: 'Page Not Found',
            error: 'Page Not Found'
        })
    )
});

//Error Handler
router.use((error, req, res, next) => {
    res.send({
        message: error.message,
        name: error.name,
        error: error.error
    })
});


module.exports = router;