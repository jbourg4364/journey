const express = require('express');
const adminRouter = express.Router();
const { insertPickedUp, getAllPickedUp, clearPickedUpTable } = require('../db');

adminRouter.get('/', async (req, res, next) => {
    try {
        const response = await getAllPickedUp();
        res.status(200).json(response);
    } catch (error) {
        console.error('Error in routing to get all picked up students', error);
    }
});



adminRouter.post('/:parentId', async (req, res, next) => {
    const { parentId } = req.params;
    const { children } = req.body;
    try {
        const response = await insertPickedUp(parentId, children);
        res.status(201).json(response);
    } catch (error) {
        console.error('Error in routing to insert student in picked up table', error);
    }
});

adminRouter.get('/history', async (req, res, next) => {
    try {
        const response = await getAllPickedUp();
        res.status(200).json(response);
    } catch (error) {
        console.error('Error in routing to get all picked up students', error);
    }
});





module.exports = adminRouter;