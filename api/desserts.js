// Imports
const express = require("express");
const { getAllDesserts, getAllDessertsById, getAllDessertsByName } = require('../db/desserts');

// .Router Middleware
const dessertsRouter = express.Router();

// Route Handelers
    // GET/desserts
dessertsRouter.get('/', async (req, res, next) =>{
    try{
        const desserts = await getAllDesserts();
        res.send(desserts) 
    } catch (error) {
        console.log("Error getting all desserts!")
    }
});

    //GET/dessertsById 
breakfastRouter.get('/:dessertsId', async (req, res, next) => {
    const {dessertsId} = req.params 
try {
    const newDessertsId = await getAllDessertsById (dessertsId)
    res.send(newDessertsId)
    } catch (error) {
        console.log(error)
    }
});

// Exports
module.exports = {dessertsRouter};