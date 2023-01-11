// Step 1: Import Client & Exports
const { create } = require('domain');
const { client } = require('./index');

// Imports
const { createDepartment, getAlldepartment } = require('./department');

// Step 2: User Methods
    // Method: dropTables
    async function dropTables(){
        try {
            console.log("Dropping tables... ");
            await client.query(`
            DROP TABLE IF EXISTS breakfast;
            DROP TABLE IF EXISTS entrees;
            DROP TABLE IF EXISTS desserts;
            DROP TABLE IF EXISTS sides;
            DROP TABLE IF EXISTS department;
            `)
        
            console.log("Finished dropping tables.")
        } catch(error){
            console.log("Error dropping tables!")
            console.log(error.detail)
        }
    }

    // Method: createTables
    async function createTables() {
        try {
            console.log('Starting to build tables...');
            await client.query(`
            CREATE TABLE department(
                "departmentId" SERIAL PRIMARY KEY,
                "departmentName" VARCHAR(255) UNIQUE NOT NULL
            );
            CREATE TABLE breakfast(
                "breakfastId" SERIAL PRIMARY KEY,
                "breakfastName" VARCHAR(255) UNIQUE NOT NULL,
                instructions VARCHAR(255) UNIQUE NOT NULL,
                "departmentId" INTEGER REFERENCES department("departmentId"),
                description TEXT NOT NULL,
                ingredients TEXT NOT NULL,
                serving_size INTEGER NOT NULL,
                time_to_prepare INTEGER NOT NULL,
                image VARCHAR(500) UNIQUE
            );
            CREATE TABLE entrees(
                "entreesId" SERIAL PRIMARY KEY,
                "entreesName" VARCHAR(255) UNIQUE NOT NULL,
                instructions VARCHAR(255) UNIQUE NOT NULL,
                "departmentId" INTEGER REFERENCES department("departmentId"),
                description TEXT NOT NULL,
                ingredients TEXT NOT NULL,
                serving_size INTEGER NOT NULL,
                time_to_prepare INTEGER NOT NULL,
                image VARCHAR(500) UNIQUE
            );
            CREATE TABLE desserts(
                "dessertsId" SERIAL PRIMARY KEY,
                "dessertsName" VARCHAR(255) UNIQUE NOT NULL,
                instructions VARCHAR(255) UNIQUE NOT NULL,
                "departmentId" INTEGER REFERENCES department("departmentId"),
                description TEXT NOT NULL,
                ingredients TEXT NOT NULL,
                serving_size INTEGER NOT NULL,
                time_to_prepare INTEGER NOT NULL,
                image VARCHAR(500) UNIQUE
            );
            CREATE TABLE sides(
                "sidesId" SERIAL PRIMARY KEY,
                "sidesName" VARCHAR(255) UNIQUE NOT NULL,
                instructions VARCHAR(255) UNIQUE NOT NULL,
                "departmentId" INTEGER REFERENCES department("departmentId"),
                description TEXT NOT NULL,
                ingredients TEXT NOT NULL,
                serving_size INTEGER NOT NULL,
                time_to_prepare INTEGER NOT NULL,
                image VARCHAR(500) UNIQUE
            );`);   
    
            console.log('Finished building tables.');
            } catch (error) {
            console.error('Error building tables!');
            console.log(error);
            }
        }

        async function createInitialDepartment() {
            console.log("Creating department...")
            try {
                await createDepartment({
                    departmentName: "breakfast"
                });
                await createDepartment({
                    departmentName: "entrees"
                });
                await createDepartment({
                    departmentName: "desserts"
                });
                await createDepartment({
                    departmentName: "sides"
                });
                console.log("Finished creating department.")
            } catch (error) {
                console.error('Error creating department!');
                console.log(error);
                
            }
        }

        async function rebuildDB() {
            try {
            client.connect();
            console.log("Running DB function...")
            await dropTables();
            await createTables();
            await createInitialDepartment();
            } catch (error) {
            console.log("Error during rebuildDB!")
            console.log(error.detail);
            }
        }

        async function testDB() {
            try {
                console.log("Starting to test database...");

                // department
                console.log("Calling all department...")
                const department = await getAlldepartment();
                console.log("Results", department)
            
                console.log("Finished database tests.");
            } catch (error) {
                console.log("Error during testDB!");
                console.log(error);
              }
            }
        
        rebuildDB()
            .then(testDB)
            .catch(console.error)
            .finally(() => client.end())
    