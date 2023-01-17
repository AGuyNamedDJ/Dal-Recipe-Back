const { client } = require("./index") 
const { createDepartment, getAllDepartment } = require('./department');

// Entrees is Department 3

// getAllEntrees
async function getAllEntrees () {
    try{
        const { rows } = await client.query(`
        SELECT *
        FROM entrees;
        `);
        return rows; 
    } catch (error) {
        console.log("Error getting entrees!")
        console.log(error);
    }
}

// getAllEntreesById
async function getAllEntreesById (entreesId) {
    try {
        const { rows: [entrees] } = await client.query (`
        SELECT *
        FROM entrees
        WHERE "entreesId"=$1;
        `, [entreesId]);

        return entrees;
    } catch (error){
        console.log("Error getting entrees by id!")
        console.log(error);
    }
}

// getAllEntreesName
async function getAllEntreesByName (entreesName) {
    try{
        const { rows : [entrees] } = await client.query(`
        SELECT *
        FROM entrees
        WHERE "entreesName"=$1;
        `, [entreesName]);

        return entrees;
    } catch (error) {
        console.log("Error getting entrees by name!")
        console.log(error);
    }
}

// createEntrees
async function createEntrees(entreesData) {
    try {
        const { entreesName, departmentId, instructions, description, ingredients, serving_size, time_to_prepare, image } = entreesData;
        if (!departmentId) {
            throw new Error('Entrees must have a valid department Id')
        }
        const { rows } = await client.query(`
            INSERT INTO entrees("entreesName", "departmentId", instructions, description, ingredients, serving_size, time_to_prepare, image)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `, [entreesName, departmentId, instructions, description, ingredients, serving_size, time_to_prepare, image]);

        return rows[0];
    } catch (error) {
        console.log("Error creating entrees!")
        console.log(error);
    }
}

// Exports
module.exports = {
    getAllEntrees,
    getAllEntreesById,
    getAllEntreesByName,
    createEntrees
}
