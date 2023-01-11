const { client } = require("./index") 
const { createDepartment, getAllDepartment } = require('./department');

// Desserts is Department 1

// getAllDesserts
async function getAllDesserts () {
    try{
        const { rows } = await client.query(`
        SELECT *
        FROM desserts;
        `);
        return rows; 
    } catch (error) {
        console.log("Error getting desserts!")
        console.log(error);
    }
}

// getAllDessertsById
async function getAllDessertsById (dessertsId) {
    try {
        const { rows: [desserts] } = await client.query (`
        SELECT *
        FROM dessert
        WHERE "dessertId"=$1;
        `, [dessertsId]);

        return desserts;
    } catch (error){
        console.log("Error getting desserts by id!")
        console.log(error);
    }
}

// getAllDessertsName
async function getAllDessertsByName (dessertsName) {
    try{
        const { rows : [desserts] } = await client.query(`
        SELECT *
        FROM dessert
        WHERE "dessertsName"=$1;
        `, [dessertsName]);

        return desserts;
    } catch (error) {
        console.log("Error getting desserts by name!")
        console.log(error);
    }
}

// createDesserts
async function createDesserts(dessertsData) {
    try {
        const { dessertsName, departmentId, instructions, description, ingredients, serving_size, time_to_prepare, image } = dessertsData;
        if (!departmentId) {
            throw new Error('Desserts must have a valid department Id')
        }
        const { rows } = await client.query(`
            INSERT INTO desserts("dessertsName", "departmentId", instructions, description, ingredients, serving_size, time_to_prepare, image)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `, [dessertsName, departmentId, instructions, description, ingredients, serving_size, time_to_prepare, image]);

        return rows[0];
    } catch (error) {
        console.log("Error creating desserts!")
        console.log(error);
    }
}

// Exports
module.exports = {
    getAllDesserts,
    getAllDessertsById,
    getAllDessertsByName,
    createDesserts
}
