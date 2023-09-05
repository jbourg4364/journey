const express = require('express');
const adminRouter = express.Router();
const { getAllCarlineParents } = require('../db');

adminRouter.get('/PPEStaff/dashboard', async (req, res, next) => {
    try {
        const response = await getAllCarlineParents();
        
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
});






module.exports = adminRouter;