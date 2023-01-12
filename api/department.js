// Imports
const express = require ('express');
const { getAllDepartment, getDepartmentById } = require('../db/Department')

// Router Middleware
const departmentRouter = express.Router();

// Router Handelers
    // GET/department
departmentRouter.get("/", async (req, res, next) => {
    try {
        const department = await getAllDepartment();
        res.send(department)
    } catch (error) {
        console.error(error)
    }
});

// GET/departmentById
departmentRouter.get("/:departmentId", async (req, res, next) => {
    try {
        const { departmentId } = req.params
        const response = await getDepartmentById(departmentId)
        res.send(response)
    } catch (error) {
        console.error(error)
    }
})

// Exports
module.exports = {departmentRouter}