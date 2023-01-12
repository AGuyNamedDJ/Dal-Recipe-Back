// Imports
const express = require ('express');
const { getAllDepartment, getDepartmentById } = require('../db/department');

// Router Middleware
const departmentRouter = express.Router();

// Router Handlers
    // GET/department
    departmentRouter.get("/", async (req, res, next) => {
        console.log("Handling GET /department");
        try {
            const department = await getAllDepartment();
            res.send(department)
        } catch (error) {
            console.log(error);
            res.status(500).json({
              error: "Unable to retrieve departments"
            });
          }
        });
    
// GET/department/:departmentId
departmentRouter.get("/:departmentId", async (req, res, next) => {
    console.log("Handling GET /department/:departmentId");
    try {
        const { departmentId } = req.params
        const response = await getDepartmentById(departmentId)
        res.send(response)
    } catch (error) {
        console.log(error)
    }
})

// Exports
module.exports = {departmentRouter}