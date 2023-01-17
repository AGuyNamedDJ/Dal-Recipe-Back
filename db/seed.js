// Step 1: Import Client & Exports
const { create } = require('domain');
const { client } = require('./index');

// Imports
const { createDepartment, getAllDepartment } = require('./department');
const { createBreakfast, getAllBreakfast } = require('./breakfast');
const { createDesserts, getAllDesserts } = require('./desserts');
const { createEntrees, getAllEntrees } = require('./entrees');
const { createSides, getAllSides } = require('./sides');

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
                image: "https://assets.epicurious.com/photos/5956873a40721c7cf72d80ca/16:9/w_2560%2Cc_limit/This-Scrambled-Egg-Trick--29062017.jpg"
            });
            await createBreakfast({
                breakfastName: "Blueberry Pancakes",
                departmentId: 1,
                instructions: "Mix pancake batter, fold in blueberries, cook on griddle.",
                description: "Fluffy pancakes with a burst of fresh blueberries in every bite.",
                ingredients: "Flour, sugar, baking powder, salt, eggs, milk, butter, blueberries",
                serving_size: 4,
                time_to_prepare: "20 minutes",
                image: "https://media.30seconds.com/tip/lg/Old-fashioned-Pancake-Recipes-Start-the-Day-With-This-Fluf-15561-bd4837c4bd-1627743462.jpg"
            });
            await createBreakfast({
                breakfastName: "French Toast",
                departmentId: 1,
                instructions: "Dip bread in mixture of eggs, milk, sugar, and vanilla. Cook on griddle.",
                description: "A sweet and delicious breakfast dish, French toast is a favorite for many. Perfect for weekends or special occasions.",
                ingredients: "Bread, eggs, milk, sugar, vanilla extract, butter, syrup",
                serving_size: 4,
                time_to_prepare: "15 minutes",
                image: "https://assets.bonappetit.com/photos/57ad254ff1c801a1038bc9c9/3:2/w_1998,h_1332,c_limit/FRENCH-TOAST.jpg"
                });
            await createBreakfast({
                breakfastName: "Banana Pancakes",
                departmentId: 1,
                instructions: "Mix together ingredients, cook on a griddle, and serve with syrup.",
                description: "Fluffy and delicious, these banana pancakes are a great way to add some variety to your breakfast routine.",
                ingredients: "Flour, sugar, baking powder, salt, eggs, milk, mashed banana, vanilla extract",
                serving_size: 4,
                time_to_prepare: "20 minutes",
                image: "https://www.ambitiouskitchen.com/wp-content/uploads/2019/04/bananaoatmealpancakes-2long.jpg"
                });
            await createBreakfast({
                breakfastName: "Bacon and Egg Breakfast Tacos",
                departmentId: 1,
                instructions: "Cook bacon in a skillet until crispy. In the same skillet, scramble eggs. Warm tortillas in the oven or on a skillet. Assemble tacos by placing eggs and bacon on a tortilla, top with shredded cheese and diced tomatoes. Serve immediately.",
                description: "A delicious and hearty breakfast taco made with crispy bacon, scrambled eggs, cheese, and tomatoes.",
                ingredients: "Bacon, eggs, flour tortillas, shredded cheese, diced tomatoes, salt, pepper",
                serving_size: 2,
                time_to_prepare: "15 minutes",
                image: "https://mexicanfoodjournal.com/wp-content/uploads/2017/07/Breakfast-Tacos-Bacon-Potato.jpg"
                });
            await createBreakfast({
                breakfastName: "Ham and Cheese Omelette",
                departmentId: 1,
                instructions: "Whisk eggs in a bowl, add diced ham and shredded cheese. Cook in a pan until set, fold in half and serve.",
                description: "A hearty and delicious omelette filled with savory ham and melted cheese.",
                ingredients: "Eggs, diced ham, shredded cheese, salt, pepper",
                serving_size: 1,
                time_to_prepare: "15 minutes",
                image: "https://food-images.files.bbci.co.uk/food/recipes/cheeseomelette_80621_16x9.jpg"
                });
            await createBreakfast({
                breakfastName: "Ham and Egg Breakfast Sandwich",
                departmentId: 1,
                instructions: "Fry a slice of ham and an egg in a pan. Place the egg on top of the ham and put it between two slices of toast. Serve and enjoy!",
                description: "A delicious breakfast sandwich with a crispy slice of ham and a perfectly cooked egg.",
                ingredients: "Ham, egg, bread, butter",
                serving_size: 1,
                time_to_prepare: "10 minutes",
                image: "https://iamhomesteader.com/wp-content/uploads/2022/02/breakfast-sandwich-2.jpg"
                });
            await createBreakfast({
                breakfastName: "Steak and Eggs",
                departmentId: 1,
                instructions: "Cook steak to desired doneness, fry eggs to preference, and serve together with toast.",
                description: "A hearty breakfast option, steak and eggs provide a good balance of protein and fat to start your day.",
                ingredients: "Steak, eggs, butter, salt, pepper",
                serving_size: 2,
                time_to_prepare: "20 minutes",
                image: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1300,h_880/https://smokedngrilled.com/wp-content/uploads/2021/05/steak-and-eggs-1300x880.jpg"
                });
            await createBreakfast({
                breakfastName: "Crepes",
                departmentId: 1,
                instructions: "Mix together flour, eggs, milk and salt in a blender. Heat a non-stick pan over medium-high heat. Pour a small amount of batter in the center of the pan and swirl to spread evenly. Cook for 2-3 minutes per side. Fill with your choice of sweet or savory fillings.",
                description: "A French classic, crepes are thin pancakes that can be filled with sweet or savory ingredients for a delicious breakfast.",
                ingredients: "flour, eggs, milk, salt",
                serving_size: 2,
                time_to_prepare: "20 minutes",
                image: "https://c4.wallpaperflare.com/wallpaper/751/875/638/food-crepes-breakfast-wallpaper-preview.jpg"
                });
            await createBreakfast({
                breakfastName: "Cinnamon Roll Oatmeal",
                departmentId: 1,
                instructions: "Cook oatmeal according to package instructions. Stir in cinnamon and brown sugar. Top with a dollop of cream cheese frosting.",
                description: "Warm and comforting, this oatmeal is like having a cinnamon roll for breakfast without all the guilt.",
                ingredients: "Rolled oats, cinnamon, brown sugar, cream cheese frosting",
                serving_size: 1,
                time_to_prepare: "10 minutes",
                image: "https://media.self.com/photos/5c3e2f219056dc2fa7dbd7ee/master/pass/oatmeal.jpg"
            });
            await createBreakfast({
                breakfastName: "Shrimp and Grits",
                departmentId: 1,
                instructions: "Cook grits according to package instructions. In a separate pan, sauté shrimp in butter and seasonings. Serve shrimp on top of grits.",
                description: "A southern classic, shrimp and grits is a hearty and flavorful breakfast option.",
                ingredients: "Shrimp, butter, grits, salt, pepper, cajun seasoning (optional)",
                serving_size: 2,
                time_to_prepare: "20 minutes",
                image: "https://www.foodlion.com/content/dam/Recipes/EasyLemonGarlicShrimpAndGrits/Final-lemon-garlic-shrimp-and-grits.jpg.adapt.full.high.jpg"
                });
            await createBreakfast({
                breakfastName: "Sausage and Egg Breakfast Sandwich",
                departmentId: 1,
                instructions: "Cook sausage in a skillet over medium heat until browned. Crack eggs into the skillet, season with salt and pepper. Cook until set. Serve on a toasted roll with cheese if desired.",
                description: "A hearty and savory breakfast option, this sandwich features juicy sausage and a fried egg on a toasted roll.",
                ingredients: "Sausage links, eggs, salt, pepper, toasted roll, cheese (optional)",
                serving_size: 1,
                time_to_prepare: "15 minutes",
                image: "https://assets.bonappetit.com/photos/5ca50a3f8aca5dd5a3f6976a/3:2/w_4443,h_2962,c_limit/0419-breakfast-sandwich.jpg"
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
                departmentId: 3,
                instructions: "1. Preheat oven to 350°F. Grease and flour a 9x13 inch baking pan. In a medium mixing bowl, combine flour, sugar, cocoa, baking soda, baking powder, and salt.  Add eggs, milk, warm water, oil, and vanilla. Mix well.  Pour batter into prepared pan.  Bake for 30-35 minutes, or until a toothpick inserted into the center comes out clean.  Allow to cool in the pan for 10 minutes, then remove and transfer to a wire rack to cool completely. Spread frosting over cooled cake.",
                description: "This chocolate cake recipe is rich and delicious. Perfect for any occasion!",
                ingredients: "1 cup white sugar, 1 cup butter, 4 eggs, 1 teaspoon vanilla extract, 2 cups all-purpose flour, 3/4 cup unsweetened cocoa powder, 1 teaspoon baking soda, 1/2 teaspoon baking powder, 1/2 teaspoon salt, 1 cup buttermilk",
                serving_size: 12,
                time_to_prepare: "1 hour",
                image: "https://assets.bonappetit.com/photos/59c924dc32e4b84f5a9e437a/8:5/w_4279,h_2674,c_limit/1017%20WEB%20WEEK1060.jpg"
            });

            console.log("Finished creating desserts.")
        } catch (error) {
            console.error('Error creating desserts!');
            console.log(error);
            
        }
    }

    // createInitialEntrees
    async function createInitialEntrees() {
        console.log("Creating initial entrees...")
        try {
            await createEntrees({
                entreesName: "Beef Stroganoff",
                departmentId: 2,
                instructions: "1. In a large skillet, cook beef over medium heat until browned. Add onion and garlic, cook until softened. Stir in mushroom, flour, paprika, salt, and pepper. Cook and stir for 2 minutes. Gradually stir in beef broth and sour cream. Cook and stir until heated through. Serve over cooked egg noodles.",
                description: "This classic beef stroganoff recipe is easy to make and packed with flavor!",
                ingredients: "1 lb beef, 1 onion, 1 garlic clove, 1 cup mushroom, 2 tablespoons flour, 1 teaspoon paprika, 1 teaspoon salt, 1/4 teaspoon pepper, 1 cup beef broth, 1 cup sour cream",
                serving_size: 4,
                time_to_prepare: "30 minutes",
                image: "https://assets.epicurious.com/photos/5761cb888accf290434553a4/16:9/w_1280,c_limit/beef-stroganoff.jpg"
            });
    
            console.log("Finished creating entrees.")
        } catch (error) {
            console.error('Error creating entrees!');
            console.log(error);
        }
    }

// createInitialSides
async function createInitialSides() {
    console.log("Creating initial sides...")
    try {
        await createSides({
            sidesName: "Garlic Roasted Potatoes",
            departmentId: 4,
            instructions: "1. Preheat oven to 425 degrees. Cut potatoes into bite-size pieces and put in a large bowl. Toss potatoes with olive oil, garlic, salt, and pepper.  2. Spread potatoes onto a baking sheet and roast for 25-30 minutes, or until golden brown and tender.",
            description: "These garlic roasted potatoes are the perfect side for any meal!",
            ingredients: "4 large potatoes, 2 tablespoons olive oil, 3 cloves garlic, minced, 1 teaspoon salt, 1/4 teaspoon pepper",
            serving_size: 4,
            time_to_prepare: "45 minutes",
            image: "https://assets.bonappetit.com/photos/5ec6af660ade4fa69795be62/8:5/w_1887,h_1179,c_limit/Brad-Miso-Grilled-Potatoes-2.jpg"
        });

        console.log("Finished creating sides.")
    } catch (error) {
        console.error('Error creating sides!');
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
        await createInitialEntrees();
        await createInitialSides();
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

            // Test Entrees
            console.log("Calling all entrees...")
            const entrees = await getAllEntrees();
            console.log("Results", entrees)

            // Test Sides
            console.log("Calling all sides...")
            const sides = await getAllSides();
            console.log("Results", sides)
        
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
    