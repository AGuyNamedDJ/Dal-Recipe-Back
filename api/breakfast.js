// Imports
const express = require("express");
const { getAllBreakfast, getAllBreakfastById, getAllBreakfastByName } = require('../db/breakfast');
const { getDepartmentById } = require("../db/department");

// .Router Middleware
const breakfastRouter = express.Router();

// Route Handelers
    // GET/breakfast
breakfastRouter.get('/', async (req, res, next) =>{
    try{
        const breakfast = await getAllBreakfast();
        res.send(breakfast) 
    } catch (error) {
        console.log("Error getting all breakfast!")
    }
});

    // GET/breakfastById 
breakfastRouter.get('/:breakfastId', async (req, res, next) => {
    const {breakfastId} = req.params 
try {
    const newBreakfastId = await getAllBreakfastById (breakfastId)
    res.send(newBreakfastId)
    } catch (error) {
        console.log(error)
    }
});

// Exports
module.exports = {breakfastRouter};