// Imports
const express = require("express");
const { getAllSides, getAllSidesById, getAllSidesByName } = require('../db/desserts');

// .Router Middleware
const sidesRouter = express.Router();

// Route Handelers
    // GET/sides
sidesRouter.get('/', async (req, res, next) =>{
    try{
        const sides = await getAllSides();
        res.send(sides) 
    } catch (error) {
        console.log("Error getting all sides!")
    }
});

    //GET/sidesById 
sidesRouter.get('/:sidesId', async (req, res, next) => {
    const {sidesId} = req.params 
try {
    const newSidesId = await getAllSidesById (sidesId)
    res.send(newSidesId)
    } catch (error) {
        console.log(error)
    }
});

// Exports
module.exports = {sidesRouter};