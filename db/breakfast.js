const { client } = require("./index") 
const { createDepartment, getAllDepartment } = require('./department');

// Breakfast is Department 1

// getAllBreakfast
async function getAllBreakfast () {
    try{
        const { rows } = await client.query(`
        SELECT *
        FROM breakfast;
        `);
        return rows; 
    } catch (error) {
        console.log("Error getting breakfast!")
        console.log(error);
    }
}

// getAllBreakfastById
async function getAllBreakfastById (breakfastId) {
    try {
        const { rows: [breakfast] } = await client.query (`
        SELECT *
        FROM breakfast
        WHERE "breakfastId"=$1;
        `, [breakfastId]);

        return breakfast;
    } catch (error){
        console.log("Error getting breakfast by id!")
        console.log(error);
    }
}

// getAllBreakfsatByName
async function getAllBreakfastByName (breakfastName) {
    try{
        const { rows : [breakfast] } = await client.query(`
        SELECT *
        FROM breakfast
        WHERE "breakfastName"=$1;
        `, [breakfastName]);

        return breakfast;
    } catch (error) {
        console.log("Error getting breakfast by name!")
        console.log(error);
    }
}

// createBreakfast
async function createBreakfast(breakfastData) {
    try {
        const { breakfastName, departmentId, instructions, description, ingredients, serving_size, time_to_prepare, image } = breakfastData;
        if (!departmentId) {
            throw new Error('Breakfast must have a valid department Id')
        }
        const { rows } = await client.query(`
            INSERT INTO breakfast("breakfastName", "departmentId", instructions, description, ingredients, serving_size, time_to_prepare, image)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `, [breakfastName, departmentId, instructions, description, ingredients, serving_size, time_to_prepare, image]);

        return rows[0];
    } catch (error) {
        console.log("Error creating breakfast!")
        console.log(error);
    }
}

// Exports
module.exports = {
    getAllBreakfast,
    getAllBreakfastById,
    getAllBreakfastByName,
    createBreakfast
}
