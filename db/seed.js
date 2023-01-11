// Step 1: Import Client & Exports
const { create } = require('domain');
const { client } = require('./index');

// Imports
const { createDepartment, getAllDepartment } = require('./department');
const { createBreakfast, getAllBreakfast } = require('./breakfast');
const { createDesserts, getAllDesserts } = require('./desserts');

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
                instructions VARCHAR(500) UNIQUE NOT NULL,
                "departmentId" INTEGER REFERENCES department("departmentId"),
                description TEXT NOT NULL,
                ingredients TEXT NOT NULL,
                serving_size INTEGER NOT NULL,
                time_to_prepare VARCHAR(255) UNIQUE NOT NULL,
                image VARCHAR(500) UNIQUE
            );
            CREATE TABLE entrees(
                "entreesId" SERIAL PRIMARY KEY,
                "entreesName" VARCHAR(255) UNIQUE NOT NULL,
                instructions VARCHAR(500) UNIQUE NOT NULL,
                "departmentId" INTEGER REFERENCES department("departmentId"),
                description TEXT NOT NULL,
                ingredients TEXT NOT NULL,
                serving_size INTEGER NOT NULL,
                time_to_prepare VARCHAR(255) UNIQUE NOT NULL,
                image VARCHAR(500) UNIQUE
            );
            CREATE TABLE desserts(
                "dessertsId" SERIAL PRIMARY KEY,
                "dessertsName" VARCHAR(255) UNIQUE NOT NULL,
                instructions VARCHAR(500) UNIQUE NOT NULL,
                "departmentId" INTEGER REFERENCES department("departmentId"),
                description TEXT NOT NULL,
                ingredients TEXT NOT NULL,
                serving_size INTEGER NOT NULL,
                time_to_prepare VARCHAR(255) UNIQUE NOT NULL,
                image VARCHAR(500) UNIQUE
            );
            CREATE TABLE sides(
                "sidesId" SERIAL PRIMARY KEY,
                "sidesName" VARCHAR(255) UNIQUE NOT NULL,
                instructions VARCHAR(500) UNIQUE NOT NULL,
                "departmentId" INTEGER REFERENCES department("departmentId"),
                description TEXT NOT NULL,
                ingredients TEXT NOT NULL,
                serving_size INTEGER NOT NULL,
                time_to_prepare VARCHAR(255) UNIQUE NOT NULL,
                image VARCHAR(500) UNIQUE
            );`);   
    
            console.log('Finished building tables.');
            } catch (error) {
            console.error('Error building tables!');
            console.log(error);
            }
        }

    // Create Initial Department
    async function createInitialDepartment() {
        console.log("Creating departments...");
        try {
            await createDepartment({
                departmentName: "Breakfast"
            });
            await createDepartment({
                departmentName: "Entrees"
            });
            await createDepartment({
                departmentName: "Desserts"
            });
            await createDepartment({
                departmentName: "Sides"
            });
            console.log("Finished creating departments.")
        } catch (error) {
            console.log("Error creating departments!");
            console.log(error);
        }
    }
    
    // createInitialBreakfast
    async function createInitialBreakfast() {
        console.log("Creating initial breakfast...")
        try {
            await createBreakfast({
                breakfastName: "Scrambled Eggs",
                departmentId: 1,
                instructions: "Scramble eggs and serve with toast.",
                description: "A classic breakfast dish, scrambled eggs are easy to make and a great way to start the day.",
                ingredients: "Eggs, butter, salt, pepper",
                serving_size: 2,
                time_to_prepare: "10 minutes",
                image: "https://link"
            });

            console.log("Finished creating breakfast.")
        } catch (error) {
            console.error('Error creating breakfast!');
            console.log(error);
            
        }
    }

    // createInitialDesserts
    async function createInitialDesserts() {
        console.log("Creating initial desserts...")
        try {
            await createDesserts({
                dessertsName: "Chocolate Cake",
                departmentId: 2,
                instructions: "1. Preheat oven to 350°F. Grease and flour a 9x13 inch baking pan. In a medium mixing bowl, combine flour, sugar, cocoa, baking soda, baking powder, and salt.  Add eggs, milk, warm water, oil, and vanilla. Mix well.  Pour batter into prepared pan.  Bake for 30-35 minutes, or until a toothpick inserted into the center comes out clean.  Allow to cool in the pan for 10 minutes, then remove and transfer to a wire rack to cool completely. Spread frosting over cooled cake.",
                description: "This chocolate cake recipe is rich and delicious. Perfect for any occasion!",
                ingredients: "1 cup white sugar, 1 cup butter, 4 eggs, 1 teaspoon vanilla extract, 2 cups all-purpose flour, 3/4 cup unsweetened cocoa powder, 1 teaspoon baking soda, 1/2 teaspoon baking powder, 1/2 teaspoon salt, 1 cup buttermilk",
                serving_size: 12,
                time_to_prepare: "1 hour",
                image: "https://www.example.com/chocolate_cake.jpg"
            });

            console.log("Finished creating desserts.")
        } catch (error) {
            console.error('Error creating desserts!');
            console.log(error);
            
        }
    }
    
        // Rebuild DB
        async function rebuildDB() {
            try {
            client.connect();
            console.log("Running DB function...")
            await dropTables();
            await createTables();
            await createInitialDepartment();
            await createInitialBreakfast();
            await createInitialDesserts();
            } catch (error) {
            console.log("Error during rebuildDB!")
            console.log(error.detail);
            }
        }

        // Test DB
        async function testDB() {
            try {
                console.log("Starting to test database...");

                // Test Department
                console.log("Calling all department...")
                const department = await getAllDepartment();
                console.log("Results", department)

                // Test Breakfast
                console.log("Calling all breakfast...")
                const breakfast = await getAllBreakfast();
                console.log("Results", breakfast)

                // Test Desserts
                console.log("Calling all desserts...")
                const desserts = await getAllDesserts();
                console.log("Results", desserts)
            
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
    