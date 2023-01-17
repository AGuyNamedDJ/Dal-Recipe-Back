const { client } = require("./index") 
const { createDepartment, getAllDepartment } = require('./department');

// Sides is Department 4

// getAllSides
async function getAllSides () {
    try{
        const { rows } = await client.query(`
        SELECT *
        FROM sides;
        `);
        return rows; 
    } catch (error) {
        console.log("Error getting sides!")
        console.log(error);
    }
}

// getAllSidesById
async function getAllSidesById (sidesId) {
    try {
        const { rows: [sides] } = await client.query (`
        SELECT *
        FROM sides
        WHERE "sidesId"=$1;
        `, [sidesId]);

        return sides;
    } catch (error){
        console.log("Error getting sides by id!")
        console.log(error);
    }
}

// getAllSidesName
async function getAllSidesByName (sidesName) {
    try{
        const { rows : [sides] } = await client.query(`
        SELECT *
        FROM sides
        WHERE "sidesName"=$1;
        `, [sidesName]);

        return sides;
    } catch (error) {
        console.log("Error getting sides by name!")
        console.log(error);
    }
}

// createSides
async function createSides(sidesData) {
    try {
        const { sidesName, departmentId, instructions, description, ingredients, serving_size, time_to_prepare, image } = sidesData;
        if (!departmentId) {
            throw new Error('Sides must have a valid department Id')
        }
        const { rows } = await client.query(`
            INSERT INTO sides("sidesName", "departmentId", instructions, description, ingredients, serving_size, time_to_prepare, image)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `, [sidesName, departmentId, instructions, description, ingredients, serving_size, time_to_prepare, image]);

        return rows[0];
    } catch (error) {
        console.log("Error creating sides!")
        console.log(error);
    }
}

// Exports
module.exports = {
    getAllSides,
    getAllSidesById,
    getAllSidesByName,
    createSides
}
