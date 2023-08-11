const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


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

//Error Handler
router.use((error, req, res, next) => {
    res.send({
        message: error.message,
        name: error.name,
        error: error.error
    })
});

module.exports = router;