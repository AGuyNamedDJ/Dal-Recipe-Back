// Imports
const express = require("express");
const { getAllEntrees, getAllEntreesById, getAllEntreesByName } = require('../db/entrees');
const { getDepartmentById } = require("../db/department");

// .Router Middleware
const entreesRouter = express.Router();

// Route Handelers
    // GET/entrees
entreesRouter.get('/', async (req, res, next) =>{
    try{
        const entrees = await getAllEntrees();
        res.send(entrees) 
    } catch (error) {
        console.log("Error getting all entrees!")
    }
});

    //GET/entreesById 
entreesRouter.get('/:entreesId', async (req, res, next) => {
    const {entreesId} = req.params 
try {
    const newEntreesId = await getAllEntreesById (entreesId)
    res.send(newEntreesId)
    } catch (error) {
        console.log(error)
    }
});

// Exports
module.exports = {entreesRouter};