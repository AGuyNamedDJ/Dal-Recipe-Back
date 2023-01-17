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
                instructions VARCHAR(1000) UNIQUE NOT NULL,
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
                instructions VARCHAR(1000) UNIQUE NOT NULL,
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
                instructions VARCHAR(1500) UNIQUE NOT NULL,
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
                instructions VARCHAR(1000) UNIQUE NOT NULL,
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
                time_to_prepare: "4 minutes",
                image: "https://assets.epicurious.com/photos/5956873a40721c7cf72d80ca/16:9/w_2560%2Cc_limit/This-Scrambled-Egg-Trick--29062017.jpg"
            });
            await createBreakfast({
                breakfastName: "Blueberry Pancakes",
                departmentId: 1,
                instructions: "Mix pancake batter, fold in blueberries, cook on griddle.",
                description: "Fluffy pancakes with a burst of fresh blueberries in every bite.",
                ingredients: "Flour, sugar, baking powder, salt, eggs, milk, butter, blueberries",
                serving_size: 4,
                time_to_prepare: "15 minutes",
                image: "https://media.30seconds.com/tip/lg/Old-fashioned-Pancake-Recipes-Start-the-Day-With-This-Fluf-15561-bd4837c4bd-1627743462.jpg"
            });
            await createBreakfast({
                breakfastName: "French Toast",
                departmentId: 1,
                instructions: "Dip bread in mixture of eggs, milk, sugar, and vanilla. Cook on griddle.",
                description: "A sweet and delicious breakfast dish, French toast is a favorite for many. Perfect for weekends or special occasions.",
                ingredients: "Bread, eggs, milk, sugar, vanilla extract, butter, syrup",
                serving_size: 4,
                time_to_prepare: "16 minutes",
                image: "https://assets.bonappetit.com/photos/57ad254ff1c801a1038bc9c9/3:2/w_1998,h_1332,c_limit/FRENCH-TOAST.jpg"
                });
            await createBreakfast({
                breakfastName: "Banana Pancakes",
                departmentId: 1,
                instructions: "Mix together ingredients, cook on a griddle, and serve with syrup.",
                description: "Fluffy and delicious, these banana pancakes are a great way to add some variety to your breakfast routine.",
                ingredients: "Flour, sugar, baking powder, salt, eggs, milk, mashed banana, vanilla extract",
                serving_size: 4,
                time_to_prepare: "14 minutes",
                image: "https://www.ambitiouskitchen.com/wp-content/uploads/2019/04/bananaoatmealpancakes-2long.jpg"
                });
            await createBreakfast({
                breakfastName: "Bacon and Egg Breakfast Tacos",
                departmentId: 1,
                instructions: "Cook bacon in a skillet until crispy. In the same skillet, scramble eggs. Warm tortillas in the oven or on a skillet. Assemble tacos by placing eggs and bacon on a tortilla, top with shredded cheese and diced tomatoes. Serve immediately.",
                description: "A delicious and hearty breakfast taco made with crispy bacon, scrambled eggs, cheese, and tomatoes.",
                ingredients: "Bacon, eggs, flour tortillas, shredded cheese, diced tomatoes, salt, pepper",
                serving_size: 2,
                time_to_prepare: "22 minutes",
                image: "https://mexicanfoodjournal.com/wp-content/uploads/2017/07/Breakfast-Tacos-Bacon-Potato.jpg"
                });
            await createBreakfast({
                breakfastName: "Ham and Cheese Omelette",
                departmentId: 1,
                instructions: "Whisk eggs in a bowl, add diced ham and shredded cheese. Cook in a pan until set, fold in half and serve.",
                description: "A hearty and delicious omelette filled with savory ham and melted cheese.",
                ingredients: "Eggs, diced ham, shredded cheese, salt, pepper",
                serving_size: 1,
                time_to_prepare: "8 minutes",
                image: "https://food-images.files.bbci.co.uk/food/recipes/cheeseomelette_80621_16x9.jpg"
                });
            await createBreakfast({
                breakfastName: "Ham and Egg Breakfast Sandwich",
                departmentId: 1,
                instructions: "Fry a slice of ham and an egg in a pan. Place the egg on top of the ham and put it between two slices of toast. Serve and enjoy!",
                description: "A delicious breakfast sandwich with a crispy slice of ham and a perfectly cooked egg.",
                ingredients: "Ham, egg, bread, butter",
                serving_size: 1,
                time_to_prepare: "11 minutes",
                image: "https://iamhomesteader.com/wp-content/uploads/2022/02/breakfast-sandwich-2.jpg"
                });
            await createBreakfast({
                breakfastName: "Steak and Eggs",
                departmentId: 1,
                instructions: "Cook steak to desired doneness, fry eggs to preference, and serve together with toast.",
                description: "A hearty breakfast option, steak and eggs provide a good balance of protein and fat to start your day.",
                ingredients: "Steak, eggs, butter, salt, pepper",
                serving_size: 2,
                time_to_prepare: "24 minutes",
                image: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1300,h_880/https://smokedngrilled.com/wp-content/uploads/2021/05/steak-and-eggs-1300x880.jpg"
                });
            await createBreakfast({
                breakfastName: "Crepes",
                departmentId: 1,
                instructions: "Mix together flour, eggs, milk and salt in a blender. Heat a non-stick pan over medium-high heat. Pour a small amount of batter in the center of the pan and swirl to spread evenly. Cook for 2-3 minutes per side. Fill with your choice of sweet or savory fillings.",
                description: "A French classic, crepes are thin pancakes that can be filled with sweet or savory ingredients for a delicious breakfast.",
                ingredients: "flour, eggs, milk, salt",
                serving_size: 2,
                time_to_prepare: "12 minutes",
                image: "https://c4.wallpaperflare.com/wallpaper/751/875/638/food-crepes-breakfast-wallpaper-preview.jpg"
                });
            await createBreakfast({
                breakfastName: "Cinnamon Roll Oatmeal",
                departmentId: 1,
                instructions: "Cook oatmeal according to package instructions. Stir in cinnamon and brown sugar. Top with a dollop of cream cheese frosting.",
                description: "Warm and comforting, this oatmeal is like having a cinnamon roll for breakfast without all the guilt.",
                ingredients: "Rolled oats, cinnamon, brown sugar, cream cheese frosting",
                serving_size: 1,
                time_to_prepare: "7 minutes",
                image: "https://media.self.com/photos/5c3e2f219056dc2fa7dbd7ee/master/pass/oatmeal.jpg"
            });
            await createBreakfast({
                breakfastName: "Shrimp and Grits",
                departmentId: 1,
                instructions: "Cook grits according to package instructions. In a separate pan, sauté shrimp in butter and seasonings. Serve shrimp on top of grits.",
                description: "A southern classic, shrimp and grits is a hearty and flavorful breakfast option.",
                ingredients: "Shrimp, butter, grits, salt, pepper, cajun seasoning (optional)",
                serving_size: 2,
                time_to_prepare: "21 minutes",
                image: "https://www.foodlion.com/content/dam/Recipes/EasyLemonGarlicShrimpAndGrits/Final-lemon-garlic-shrimp-and-grits.jpg.adapt.full.high.jpg"
                });
            await createBreakfast({
                breakfastName: "Sausage and Egg Breakfast Sandwich",
                departmentId: 1,
                instructions: "Cook sausage in a skillet over medium heat until browned. Crack eggs into the skillet, season with salt and pepper. Cook until set. Serve on a toasted roll with cheese if desired.",
                description: "A hearty and savory breakfast option, this sandwich features juicy sausage and a fried egg on a toasted roll.",
                ingredients: "Sausage links, eggs, salt, pepper, toasted roll, cheese (optional)",
                serving_size: 1,
                time_to_prepare: "17 minutes",
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
            await createDesserts({
                dessertsName: "Cheesecake",
                departmentId: 3,
                instructions: "1. Preheat oven to 350°F. Grease and flour a 9 inch springform pan. In a mixing bowl, combine cream cheese, sugar, and flour. Add eggs, one at a time, mixing well after each addition. Stir in vanilla. Pour mixture into prepared pan. Bake for 45-50 minutes or until center is almost set. Let cool. In a small saucepan, combine blueberries, sugar, cornstarch, and water. Bring to a boil; cook and stir for 2 minutes or until thickened. Spread over cooled cheesecake. Chill before serving.",
                description: "This classic cheesecake recipe is creamy and delicious. Topped with sweet blueberries for a delicious contrast in flavor.",
                ingredients: "2 (8 ounce) packages cream cheese, 1 cup white sugar, 2 tablespoons all-purpose flour, 2 eggs, 1 teaspoon vanilla extract, 1 cup fresh blueberries, 1/4 cup white sugar, 2 tablespoons cornstarch, 1/4 cup water",
                serving_size: 8,
                time_to_prepare: "1 hour 30 minutes",
                image: "https://assets.epicurious.com/photos/57c5c2dd84c001120f616528/16:9/w_1280,c_limit/new-york-cheesecake.jpg"
            });
            await createDesserts({
                dessertsName: "Strawberry Cheesecake",
                departmentId: 3,
                instructions: "1. Preheat the oven to 350°F. Grease the bottom of a 9-inch springform pan. 2. In a large mixing bowl, combine the graham cracker crumbs, sugar, and melted butter. Press the mixture onto the bottom of the prepared pan. 3. In a separate mixing bowl, beat cream cheese and sugar until smooth. Add in the eggs one at a time, mixing well after each addition. Stir in the vanilla extract. Pour mixture over crust. 4. Bake for 45-50 minutes, or until the edges are golden brown and the center is almost set. Allow to cool before removing from the pan. 5. In a small mixing bowl, combine the strawberries and sugar. Spread over the cooled cheesecake. Refrigerate for at least 2 hours before serving.",
                description: "This delicious cheesecake is made with fresh strawberries and a graham cracker crust. Perfect for any occasion!",
                ingredients: "1 1/2 cups graham cracker crumbs, 1/4 cup white sugar, 1/2 cup butter, melted, 4 (8 oz) packages cream cheese, 1 cup white sugar, 4 eggs, 1 teaspoon vanilla extract, 2 cups fresh strawberries, 1/4 cup white sugar",
                serving_size: 12,
                time_to_prepare: "3 hours",
                image: "https://wallpaperaccess.com/full/1986084.jpg"
            });
            await createDesserts({
                dessertsName: "Chocolate Chip Cookies",
                departmentId: 3,
                instructions: "1. Preheat the oven to 375°F (190°C). Line a baking sheet with parchment paper. 2. In a large mixing bowl, cream together the butter and sugar until smooth. Beat in the eggs one at a time, then stir in the vanilla. 3. In a separate bowl, whisk together the flour, baking soda, and salt. Gradually add the dry ingredients to the butter mixture, mixing until just combined. Stir in the chocolate chips. 4. Roll the dough into 1-inch balls and place on the prepared baking sheet. 5. Bake for 8-10 minutes, or until the edges are golden brown. Remove from the oven and allow to cool on the baking sheet for 5 minutes before transferring to a wire rack to cool completely.",
                description: "These classic chocolate chip cookies are made with butter, sugar, eggs, vanilla, flour, baking soda, salt, and chocolate chips. Perfectly soft and chewy with a slight crunch.",
                ingredients: "1 cup butter, 1 cup white sugar, 2 eggs, 1 teaspoon vanilla extract, 2 1/4 cups all-purpose flour, 1 teaspoon baking soda, 1/2 teaspoon salt, 2 cups semisweet chocolate chips",
                serving_size: 24,
                time_to_prepare: "35 minutes",
                image: "https://passthebutter.com/wp-content/uploads/2022/03/choc-chip-coookies-toffee-bits-featured-1-480x270.jpg"
            });
            await createDesserts({
                dessertsName: "Apple Pie",
                departmentId: 3,
                instructions: "1. Preheat oven to 425°F (220°C).  2. In a large mixing bowl, combine the flour, salt and sugar.  3. Cut in butter until mixture resembles coarse crumbs.  4. Gradually add ice water, one tablespoon at a time, until mixture forms a ball.  5. Divide dough in half and flatten each half into a disk.  6. Roll out one disk of dough and transfer to a 9 inch pie dish.  7. In a separate mixing bowl, combine the sliced apples, sugar, flour, cinnamon and nutmeg.  8. Pour mixture into the pie dish.  9. Roll out the second disk of dough and place on top of the apple mixture.  10. Crimp the edges of the dough to seal.  11. Cut slits in the top of the pie to allow steam to escape.  12. Bake for 15 minutes at 425°F (220°C), then reduce the heat to 350°F (175°C) and continue baking for an additional 45 minutes.",
                description: "This classic apple pie recipe is perfect for any fall occasion and is sure to be a hit with your family and friends.",
                ingredients: "2 1/2 cups all-purpose flour, 1/2 teaspoon salt, 1/2 cup sugar, 1 cup butter, 1/4 cup ice water, 8 cups thinly sliced peeled tart apples, 1/2 cup sugar, 2 tablespoons all-purpose flour, 1 teaspoon ground cinnamon, 1/4 teaspoon ground nutmeg",
                serving_size: 8,
                time_to_prepare: "1 hour and 31 minutes",
                image: "https://assets.bonappetit.com/photos/57adda60f1c801a1038bcc5b/master/pass/apple-pie-with-spiced-apple-caramel-sauce4.jpg"
            });
            await createDesserts({
                dessertsName: "Pecan Pie",
                departmentId: 3,
                instructions: "1. Preheat oven to 350°F. Grease a 9 inch pie dish. In a medium mixing bowl, combine flour, sugar, corn syrup, melted butter, vanilla extract, and salt. Stir in the chopped pecans. Pour the mixture into the prepared pie dish. Bake for 55-60 minutes or until golden brown. Allow to cool before serving. Enjoy with a scoop of vanilla ice cream!",
                description: "A classic southern dessert, this pecan pie recipe is sure to please. The gooey filling and crispy crust make for the perfect combination of textures.",
                ingredients: "1 cup light corn syrup, 1 cup white sugar, 3 eggs, 1 teaspoon vanilla extract, 1/2 cup melted butter, 1/4 teaspoon salt, 1 cup chopped pecans, 1 unbaked 9 inch pie crust",
                serving_size: 8,
                time_to_prepare: "1 hour and 10 minutes",
                image: "https://assets.epicurious.com/photos/58485cfe3b047eac0f3b347d/master/pass/Karo-Classic-Pecan-Pie-15112016.jpg"
            });
            await createDesserts({
                dessertsName: "Carrot Cake",
                departmentId: 3,
                instructions: "1. Preheat oven to 350°F. Grease and flour two 9-inch round cake pans. In a medium mixing bowl, combine flour, sugar, baking powder, baking soda, cinnamon, nutmeg, and salt.  In a separate large mixing bowl, mix together eggs, oil, and vanilla. Stir in grated carrots, crushed pineapple, and chopped pecans. Gradually add dry ingredients to the wet mixture, stirring just until combined. Pour batter into prepared pans.  Bake for 25-30 minutes, or until a toothpick inserted into the center comes out clean. Allow to cool in the pans for 10 minutes, then remove and transfer to a wire rack to cool completely. Spread cream cheese frosting over cooled cake.",
                description: "This classic carrot cake recipe is moist and flavorful, with the perfect balance of spices and a delicious cream cheese frosting.",
                ingredients: "2 cups all-purpose flour, 1 1/2 cups white sugar, 2 teaspoons baking powder, 2 teaspoons ground cinnamon, 1/2 teaspoon baking soda, 1/4 teaspoon ground nutmeg, 1/4 teaspoon salt, 3 eggs, 1 cup vegetable oil, 2 teaspoons vanilla extract, 2 cups grated carrots, 1 (8 ounce) can crushed pineapple, 1 cup chopped pecans, 8 oz cream cheese, 1/4 cup butter, 4 cups confectioners' sugar, 1 tsp vanilla extract",
                serving_size: 12,
                time_to_prepare: "1 hour 33 minutes",
                image: "https://assets.epicurious.com/photos/57cedc35a61773c151cc16ba/master/pass/triple-layer-carrot-cake-with-cream-cheese-frosting.jpg"
            });
            await createDesserts({
                dessertsName: "Vanilla Bean Ice Cream",
                departmentId: 3,
                instructions: "1. In a medium saucepan, combine the heavy cream, whole milk, sugar, salt, and vanilla bean. Cook over medium-low heat, stirring occasionally, until the sugar has dissolved and the mixture is steaming. 2. In a separate bowl, whisk together the egg yolks. Slowly pour in the cream mixture, whisking constantly. 3. Return the mixture to the saucepan and cook over low heat, stirring constantly, until the mixture thickens and coats the back of a spoon. 4. Remove from heat and strain the mixture through a fine-mesh sieve into a clean bowl. Discard the solids. Cover and refrigerate the mixture until chilled, at least 2 hours or overnight. 5. Once chilled, churn the mixture in an ice cream maker according to the manufacturer's instructions. 6. Transfer the ice cream to a lidded container and freeze until firm, at least 2 hours.",
                description: "This classic vanilla bean ice cream recipe is rich and creamy, perfect for any dessert!",
                ingredients: "1 cup heavy cream, 1 cup whole milk, 3/4 cup granulated sugar, 1/4 tsp salt, 1 vanilla bean, 6 large egg yolks",
                serving_size: 8,
                time_to_prepare: "4 hours 16 minutes",
                image: "https://lovetobeinthekitchen.com/wp-content/uploads/2012/04/Vanilla-Bean-Ice-Cream.jpg"
                });
            await createDesserts({
                dessertsName: "Boston Cream Pie",
                departmentId: 3,
                instructions: "1. Preheat oven to 350°F. Grease and flour two 9 inch round cake pans. In a medium mixing bowl, combine flour, sugar, baking powder and salt. In a separate large mixing bowl, beat together eggs, milk, and vanilla. Gradually add dry ingredients to wet ingredients and mix until well combined. Divide batter evenly between prepared pans. Bake for 25-30 minutes, or until a toothpick inserted into the center comes out clean. Allow to cool in the pans for 10 minutes, then remove and transfer to wire racks to cool completely. For the filling, in a medium saucepan, combine sugar, cornstarch and salt. Gradually stir in milk. Cook and stir over medium heat until thickened and bubbly. Stir in butter and vanilla. Cool for 15 minutes. To assemble, place one cake layer on serving plate; spread with filling. Top with remaining cake layer. For the icing, in a small saucepan, combine chocolate and cream. Cook and stir over low heat until chocolate is melted. Spread over top and sides of cake. Refrigerate for at least 30 minutes before serving.",
                description: "A classic dessert, this Boston Cream Pie features layers of fluffy vanilla cake, rich pastry cream, and a chocolate ganache icing.",
                ingredients: "2 cups all-purpose flour, 1 cup white sugar, 2 teaspoons baking powder, 1/2 teaspoon salt, 3 eggs, 1 cup milk, 1 teaspoon vanilla extract, 1/2 cup sugar, 2 tablespoons cornstarch, 1/4 teaspoon salt, 2 cups milk, 1/4 cup butter, 1 teaspoon vanilla extract, 1/2 cup semisweet chocolate chips, 1/4 cup heavy cream",
                serving_size: 8,
                time_to_prepare: "2 hours 8 minutes",
                image: "https://i.pinimg.com/736x/d9/f1/f4/d9f1f408878ec2f966382d3da5b63649--boston-cream-cakes-boston-cream-pie.jpg"
            });
            await createDesserts({
                dessertsName: "Banana Pudding",
                departmentId: 3,
                instructions: "1. In a medium mixing bowl, combine sugar, flour, and salt. In a separate bowl, beat egg yolks until thick and lemon-colored. Gradually add the sugar mixture to the egg yolks, stirring constantly.  Slowly pour the mixture back into the saucepan, and cook until thick. Remove from heat and stir in vanilla.  In a separate large mixing bowl, layer vanilla wafers, sliced bananas, and pudding mixture. Repeat layers until all ingredients are used.  Cover and refrigerate for at least 2 hours before serving.",
                description: "This creamy banana pudding is the perfect dessert for any occasion. Made with layers of vanilla wafers, sliced bananas, and homemade pudding, it's sure to be a hit with your guests!",
                ingredients: "1 cup sugar, 1/4 cup all-purpose flour, 1/4 teaspoon salt, 3 egg yolks, 2 cups milk, 1 teaspoon vanilla extract, 1 (12 ounce) package vanilla wafers, 6 bananas, sliced",
                serving_size: 8,
                time_to_prepare: "3 hours 2 minutes",
                image: "https://www.thisgalcooks.com/wp-content/uploads/2014/07/Banana-Pudding-Pie2-480x270.jpg"
            });
            await createDesserts({
                dessertsName: "Baked Alaska",
                departmentId: 3,
                instructions: "1. Preheat oven to 475°F. Line a baking sheet with parchment paper. 2. In a large bowl, beat egg whites and cream of tartar until stiff peaks form. Gradually add sugar, 1 tablespoon at a time, beating until sugar is dissolved and mixture is glossy. 3. Spread meringue over the top and sides of cake, leaving a well in the center. 4. Place the cake on the prepared baking sheet. 5. Bake in preheated oven for 3-5 minutes, or until meringue is golden brown. 6. Remove from oven, and place on serving platter. 7. Serve immediately",
                description: "This classic dessert features a warm cake base with a layer of ice cream, topped with a layer of meringue and quickly browned in the oven.",
                ingredients: "1 (9 inch) sponge cake or angel food cake, 1 quart ice cream, 5 egg whites, 1/4 teaspoon cream of tartar, 1/2 cup white sugar",
                serving_size: 8,
                time_to_prepare: "33 minutes",
                image: "https://www.thespruceeats.com/thmb/2pAOrTUgkewd4Nj_ZmOkjlDkbKg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-baked-alaska-3057667-hero-01-c17cbc5bd3c64ac6a6f089e87ba51652.jpg"
            });
            await createDesserts({
                dessertsName: "Buckeyes",
                departmentId: 3,
                instructions: "1. In a medium mixing bowl, combine the peanut butter, butter, and vanilla extract. Mix until well combined. 2. Gradually add the powdered sugar, about 1 cup at a time, until the mixture forms a dough. 3. Roll the dough into 1 inch balls and place on a baking sheet lined with parchment paper. 4. Chill the balls in the refrigerator for at least 30 minutes. 5. Melt the chocolate in a microwave-safe bowl or double boiler. 6. Dip the chilled peanut butter balls into the chocolate, leaving a small portion of the peanut butter exposed to form the traditional buckeye shape. 7. Place the chocolate covered buckeyes back onto the parchment-lined baking sheet and chill until the chocolate is set. ",
                description: "Classic Buckeyes, made with peanut butter and chocolate, the perfect sweet treat!",
                ingredients: "1 cup creamy peanut butter, 1/2 cup butter, 1 tsp vanilla extract, 2-3 cups powdered sugar, 12 oz chocolate chips",
                serving_size: 30,
                time_to_prepare: "1 hour 27 minutes",
                image: "https://againstallgrain.com/wp-content/uploads/2019/12/Peanut-Butter-Blossom-Cookies.jpg"
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
            await createEntrees({
                entreesName: "Pan-Seared Cod",
                departmentId: 2,
                instructions: "1. Season the cod fillets with salt and pepper. Heat a skillet over medium-high heat and add olive oil. 2. Once the oil is hot, gently place the cod fillets in the skillet. Cook for 3-4 minutes per side, or until the fish is flaky and golden brown. 3. Remove the fish from the skillet and set aside. In the same skillet, add butter and minced garlic. Cook for 1-2 minutes, or until fragrant. 4. Add in the lemon juice and parsley, stir to combine. 5. Place the cod back in the skillet and spoon the butter sauce over the fish. 6. Serve the cod with your choice of sides and enjoy!",
                description: "This Pan-seared cod recipe is a simple and delicious way to enjoy cod fish. Perfectly seared with garlic butter lemon sauce",
                ingredients: "4 cod fillets, salt and pepper, 2 tablespoons olive oil, 2 tablespoons butter, 2 cloves of minced garlic, 2 tablespoons lemon juice, 2 tablespoons chopped fresh parsley",
                serving_size: 4,
                time_to_prepare: "20 minutes",
                image: "https://assets.epicurious.com/photos/580549d79bb3c66e1f64bc44/master/pass/poached-cod-potatoes-and-leeks-BA-101416.jpg"
                });
                await createEntrees({
                entreesName: "Black Pepper Chicken",
                departmentId: 2,
                instructions: "1. In a large bowl, combine the soy sauce, brown sugar, black pepper, and cornstarch. Add chicken and toss to coat.  2. In a large skillet or wok, heat the oil over high heat. Add the chicken and stir-fry for 5-7 minutes, until browned and cooked through. 3. Add the bell pepper and onion, and stir-fry for another 2-3 minutes, until the vegetables are just tender.  4. Stir in the green onions and serve over rice.",
                description: "This delicious and easy black pepper chicken dish is perfect for a quick and flavorful weeknight dinner!",
                ingredients: "1 lb boneless chicken, 1/4 cup soy sauce, 1/4 cup brown sugar, 1 tablespoon black pepper, 2 tablespoons cornstarch, 1 tablespoon oil, 1 bell pepper, 1 onion, 2 green onions",
                serving_size: 4,
                time_to_prepare: "21 minutes",
                image: "https://www.alicaspepperpot.com/wp-content/uploads/2020/04/DSC_0810.jpg"
            });
            await createEntrees({
                entreesName: "Spaghetti with Meat Sauce",
                departmentId: 2,
                instructions: "1. Cook spaghetti according to package instructions until al dente. 2. In a large skillet, brown ground beef over medium-high heat. Drain off any excess fat. 3. Add diced onion and minced garlic to the skillet and cook until softened. 4. Stir in canned crushed tomatoes, tomato paste, dried basil, salt and pepper. 5. Bring to a simmer and let cook for about 15 minutes, or until the sauce has thickened. 6. Serve sauce over cooked spaghetti and garnish with grated Parmesan cheese and chopped fresh parsley.",
                description: "A classic pasta dish, this spaghetti with meat sauce is a family favorite",
                ingredients: "1 lb spaghetti, 1 lb ground beef, 1 onion, 2 cloves of garlic, 1 can crushed tomatoes, 2 tablespoons tomato paste, 1 teaspoon dried basil, 1 teaspoon salt, 1/4 teaspoon pepper, grated Parmesan cheese, chopped fresh parsley",
                serving_size: 4,
                time_to_prepare: "31 minutes",
                image: "https://thumbs.dreamstime.com/b/delicious-mouth-watering-classic-italian-pasta-spaghetti-tomato-sauce-parmesan-basil-plate-against-dark-background-180586445.jpg"
                });
            await createEntrees({
                entreesName: "Chicken Curry",
                departmentId: 2,
                instructions: "In a large pot or Dutch oven, heat oil over medium heat. Add onion and sauté until softened, about 5 minutes. Add ginger and garlic and cook for 1 minute more. Stir in the curry powder and cook for 30 seconds. Add the chicken and cook until browned, about 5 minutes. Stir in the tomatoes, coconut milk, and chicken broth. Bring to a simmer and cook for 10-15 minutes, or until the sauce has thickened. Stir in the peas and cook for an additional 5 minutes. Serve over rice.",
                description: "This delicious chicken curry recipe is perfect for a hearty, comforting meal",
                ingredients: "2 tablespoons oil, 1 onion, 1 teaspoon grated ginger, 2 cloves garlic, 2 tablespoons curry powder, 1 lb chicken, 1 can diced tomatoes, 1 cup coconut milk, 1 cup chicken broth, 1 cup frozen peas",
                serving_size: 4,
                time_to_prepare: "32 minutes",
                image: "https://assets.epicurious.com/photos/587e4dfa11ede9a3617eea49/master/pass/Coconut-Chicken-Curry-17012017.jpg"
                });

            await createEntrees({
                entreesName: "Penne alla Vodka",
                departmentId: 2,
                instructions: "In a large pot, bring water to a boil. Add salt and the pasta, and cook for 8-10 minutes or until al dente. Reserve 1 cup of the pasta water, then drain the pasta. In a large skillet, heat the olive oil over medium heat. Add the garlic and cook for 1 minute, until fragrant. Add the onion and cook for 2-3 minutes, until translucent. Stir in the crushed tomatoes, vodka, and cream. Bring to a simmer and cook for 5-7 minutes, until the sauce has thickened. Stir in the cooked pasta, reserved pasta water, and Parmesan cheese. Cook for 2-3 minutes, until the pasta is well coated in the sauce. Garnish with parsley and serve.",
                description: "Penne alla vodka is a classic Italian pasta dish with a creamy tomato sauce and a hint of vodka.",
                ingredients: "1 lb Penne pasta, 2 tablespoons olive oil, 2 cloves garlic, 1/2 onion diced, 1 (28 oz) can of crushed tomatoes, 1/2 cup vodka, 1/2 cup heavy cream, 1/2 cup grated Parmesan cheese, 2 tablespoons chopped fresh parsley",
                serving_size: 4,
                time_to_prepare: "33 minutes",
                image: "https://blog.hslu.ch/majorobm/files/2022/06/Penne-Alla-Vodka-2-702x336.jpeg"
                });
            await createEntrees({
                entreesName: "Grilled Salmon",
                departmentId: 2,
                instructions: "In a small bowl, mix together olive oil, lemon juice, garlic, salt, and black pepper. Place salmon in a large resealable bag and pour marinade over fish. Seal bag and toss to coat. Marinate in the refrigerator for at least 30 minutes. Preheat grill to medium-high heat. Lightly oil the grill grates. Grill salmon for 6-8 minutes per side or until fish is cooked through. Serve with lemon wedges.",
                description: "This grilled salmon recipe is easy to make and packed with flavor!",
                ingredients: "4 salmon fillets, 2 tablespoons olive oil, 2 tablespoons lemon juice, 1 garlic clove minced, 1 teaspoon salt, 1/4 teaspoon black pepper, lemon wedges for serving",
                serving_size: 4,
                time_to_prepare: "40 minutes",
                image: "https://insanelygoodrecipes.com/wp-content/uploads/2022/07/Homemade-Cooked-Grilled-Salmon-with-Dill-Sauce-800x530.jpg"
                });
            await createEntrees({
                entreesName: "Lemon Herb Chicken",
                departmentId: 2,
                instructions: "Preheat oven to 375°F. Mix together lemon juice, olive oil, herbs, garlic, salt and pepper in a small bowl. Place chicken in a baking dish and pour the lemon herb mixture over the chicken. Bake for 25-30 minutes or until fully cooked. Serve with your choice of sides.",
                description: "This lemon herb chicken is juicy and packed with flavor, the perfect addition to any meal.",
                ingredients: "4 boneless chicken breasts, 1/4 cup lemon juice, 2 tablespoons olive oil, 1 tablespoon fresh herbs (such as thyme, rosemary, and parsley), 2 cloves garlic, minced, 1/2 teaspoon salt, 1/4 teaspoon black pepper",
                serving_size: 4,
                time_to_prepare: "41 minutes",
                image: "https://lh3.googleusercontent.com/JHhFNCaeo0Aymsk312RIZM75N4gOwKJHxlbs--k-nEnm0dmQIovRmS0lrpYpZT4KD-QscuSob0rw3Vx1b8vecq_XuDTuewniQ7d6=w1336-h752-c-rj-v1-e365"
                });
            await createEntrees({
                entreesName: "Pork Tenderloin",
                departmentId: 2,
                instructions: "Preheat oven to 425°F. Season pork tenderloin with salt and pepper. In a large skillet, heat oil over medium-high heat. Add pork and brown on all sides, about 3 minutes per side. Transfer pork to a baking dish. Roast in preheated oven for 20-25 minutes, or until internal temperature reaches 145°F. Let rest for 5 minutes before slicing and serving.",
                description: "This pork tenderloin recipe is easy to make and packed with flavor!",
                ingredients: "1 pork tenderloin, salt, pepper, 1 tablespoon oil",
                serving_size: 4,
                time_to_prepare: "39 minutes",
                image: "https://thumbs.dreamstime.com/b/roasted-pork-tenderloin-made-vegetables-prepared-plate-laid-table-roasted-pork-tenderloin-prepared-plate-112895481.jpg"
                });
            await createEntrees({
                entreesName: "Baked Ham",
                departmentId: 2,
                instructions: "Preheat oven to 325°F. Place ham in a roasting pan, and make small cuts all over the top of the ham. In a small mixing bowl, combine brown sugar, honey, and mustard. Spread mixture over the top of the ham. Bake in preheated oven for 2 hours, basting every 20 minutes with the pan juices. Allow to rest for 10 minutes before slicing and serving.",
                description: "This baked ham recipe is easy to make and perfect for any occasion!",
                ingredients: "1 bone-in ham, 1 cup brown sugar, 1/2 cup honey, 1/4 cup mustard",
                serving_size: 8-10,
                time_to_prepare: "2 hours 32 minutes",
                image: "https://www.eatwell101.com/wp-content/uploads/2017/04/honey-baked-ham-recipe.jpg"
                });
            await createEntrees({
                entreesName: "Grilled Swordfish",
                departmentId: 2,
                instructions: "1. Preheat your grill to medium-high heat. In a small mixing bowl, combine olive oil, lemon juice, garlic, oregano, thyme, salt, and pepper. 2. Brush swordfish with the marinade and let sit for 15 minutes. 3. Grill swordfish for 4-5 minutes on each side or until desired doneness is reached. 4. Remove from grill and let rest for 5 minutes before serving.",
                description: "This grilled swordfish is a simple and delicious entree that is perfect for any occasion!",
                ingredients: "1 lb swordfish, 2 tablespoons olive oil, 1 lemon, 2 cloves garlic, 1 teaspoon oregano, 1 teaspoon thyme, 1 teaspoon salt, 1/4 teaspoon pepper",
                serving_size: 4,
                time_to_prepare: "37 minutes",
                image: "https://assets.epicurious.com/photos/61e6df01e8a0f15107d9e98a/6:4/w_1598,h_1065,c_limit/0905-BA-FEF1-07_VOG.jpg"
                });
            await createEntrees({
                entreesName: "Shrimp Scampi",
                departmentId: 2,
                instructions: "1. In a large skillet, melt butter over medium heat. Add garlic and cook until fragrant. Add shrimp and cook until pink and slightly crispy. Pour in white wine and lemon juice, and bring to a simmer. Stir in parsley, salt, and pepper. Serve over cooked spaghetti noodles.",
                description: "This classic shrimp scampi recipe is easy to make and packed with flavor!",
                ingredients: "1 lb shrimp, 1/4 cup butter, 3 cloves garlic, 1/2 cup white wine, 1/4 cup lemon juice, 1/4 cup parsley, 1/4 teaspoon salt, 1/4 teaspoon pepper",
                serving_size: 4,
                time_to_prepare: "24 minutes",
                image: "https://lh3.googleusercontent.com/JFBxqqELYRI5MUDtFQLBI8SJwP1-MNatKLVYAFJl13g-7V6-FzOm0bfJMbt3VlGHnp5OhZiK7kW7DUuqvq6W=w1280-h720-c-rj-v1-e365"
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
            await createSides({
                sidesName: "Green Beans Almondine",
                departmentId: 4,
                instructions: "Trim the ends of the green beans and blanch them in a pot of boiling water for 2-3 minutes. Drain and set aside.  In a skillet over medium heat, melt butter. Add garlic and saute for a minute. Add green beans to the skillet and toss to coat with the butter. Cook for another 2-3 minutes. Remove skillet from heat and add slivered almonds, lemon juice, and salt. Toss to combine and serve.",
                description: "These green beans almondine are a delicious and simple side dish perfect for any meal.",
                ingredients: "1 lb green beans, trimmed, 2 tablespoons butter, 2 cloves garlic, minced, 1/4 cup slivered almonds, 1 tablespoon lemon juice, 1/4 teaspoon salt",
                serving_size: 4,
                time_to_prepare: "19 minutes",
                image: "https://oursaltykitchen.com/wp-content/uploads/2020/11/green-beans-almondine-2.jpg"
            });
            await createSides({
                sidesName: "Zucchini Parmesan",
                departmentId: 4,
                instructions: "1. Preheat oven to 425 degrees F. Slice zucchini into 1/4 inch rounds. 2. In a shallow dish, combine breadcrumbs, Parmesan cheese, salt, and pepper. 3. Dip zucchini slices in beaten egg, then coat in breadcrumb mixture. 4. Place on a baking sheet and bake for 25-30 minutes or until golden brown and crispy.",
                description: "This zucchini Parmesan is a delicious and healthy side dish that's perfect for any meal!",
                ingredients: "2 medium zucchini, 1 cup breadcrumbs, 1/4 cup grated Parmesan cheese, 1/4 teaspoon salt, 1/4 teaspoon pepper, 1 egg, beaten",
                serving_size: 4,
                time_to_prepare: "46 minutes",
                image: "https://www.carriesexperimentalkitchen.com/wp-content/uploads/2017/05/Parmesan.Crusted-Zucchini4.jpg"
                });
            await createSides({
                sidesName: "Squash Casserole",
                departmentId: 4,
                instructions: "1. Preheat the oven to 350 degrees. Grease a 2-quart baking dish. 2. In a large skillet, cook the squash and onion in butter over medium heat until tender. 3. In a small saucepan, melt the cream cheese and butter together. Stir in the cream and seasonings. 4. Stir the cream mixture into the skillet and cook for 2 minutes. 5. Pour the mixture into the prepared baking dish. Sprinkle with cheese. 6. Bake for 20-25 minutes, or until cheese is melted and bubbly.",
                description: "This delicious Squash Casserole is a perfect side dish for any meal!",
                ingredients: "4 cups squash, sliced, 1 small onion, diced, 2 tablespoons butter, 1 (8 oz) package cream cheese, 1/2 cup heavy cream, 1 teaspoon salt, 1/4 teaspoon pepper, 1/4 cup shredded cheddar cheese",
                serving_size: 4,
                time_to_prepare: "47 minutes",
                image: "https://www.southernliving.com/thmb/UlvOT8T2jsv4gmj4AeYZHw29jDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Old-School-Squash-Casserole_16x9-acf33aa4d54f4f09ab08427acda6a215.jpeg"
                });
            await createSides({
                sidesName: "Lemon Rice",
                departmentId: 4,
                instructions: "1. In a medium saucepan, bring water, butter, and salt to a boil. Stir in rice and return to a boil. Reduce heat, cover and simmer for 18-20 minutes or until liquid is absorbed. 2. Stir in lemon juice and parsley. Fluff with a fork.",
                description: "This lemon rice is a flavorful and easy side dish that pairs well with any meal!",
                ingredients: "1 cup long-grain white rice, 2 cups water, 2 tablespoons butter, 1 teaspoon salt, 2 tablespoons lemon juice, 2 tablespoons chopped fresh parsley",
                serving_size: 4,
                time_to_prepare: "32 minutes",
                image: "https://cookglobaleatlocal.com/wp-content/uploads/2020/01/Lemon-Rice-Main-1200x800.jpg"
            });
            await createSides({
                sidesName: "Roasted Beets",
                departmentId: 4,
                instructions: "1. Preheat oven to 400 degrees. Trim the greens and the root end of the beets. 2. Wrap each beet individually in aluminum foil and place on a baking sheet. Roast for 45-60 minutes, or until a knife can easily pierce through the beets. 3. Remove from oven and let cool. Peel the skin off of the beets using a paring knife or your fingers. Cut into cubes and serve.",
                description: "These roasted beets are a healthy and delicious side dish that pairs well with any meal",
                ingredients: "4 medium sized beets, 1 tablespoon olive oil, 1/2 teaspoon salt, 1/4 teaspoon pepper",
                serving_size: 4,
                time_to_prepare: "1 hour 2 minutes",
                image: "https://c8.alamy.com/comp/KD96E4/italian-roast-beet-salad-salad-of-roasted-beets-with-goat-cheese-and-KD96E4.jpg"
                });
            await createSides({
                sidesName: "Maple Glazed Yams",
                departmentId: 4,
                instructions: "1. Preheat oven to 400 degrees. Peel and cut yams into bite-size pieces. 2. In a small saucepan, combine maple syrup, butter, cinnamon and nutmeg. Heat until butter is melted. 3. Place yams on a baking sheet and pour maple glaze over yams. Toss to coat. 4. Bake for 25-30 minutes, or until yams are tender and glaze is sticky.",
                description: "These maple glazed yams are a delicious side dish for any holiday meal!",
                ingredients: "4 yams, 1/4 cup maple syrup, 2 tablespoons butter, 1 teaspoon cinnamon, 1/4 teaspoon nutmeg",
                serving_size: 6,
                time_to_prepare: "44 minutes",
                image: "https://assets.bonappetit.com/photos/57acc781f1c801a1038bc76a/master/pass/twice-roasted-sweet-potatoes-with-hot-honey.jpg"
                });
            await createSides({
                sidesName: "Mac and Cheese",
                departmentId: 4,
                instructions: "1. Cook macaroni according to package instructions. Drain and set aside.  2. In a separate saucepan, melt butter over medium heat. Whisk in flour and mustard powder, cook for 1-2 minutes. Slowly add milk, stirring constantly, until mixture thickens.  3. Stir in shredded cheese until melted and smooth. Add cooked macaroni and stir until well coated.  4. Serve hot and enjoy!",
                description: "This creamy and cheesy mac and cheese is the perfect side for any meal!",
                ingredients: "1 lb elbow macaroni, 2 tablespoons butter, 2 tablespoons flour, 1 teaspoon mustard powder, 2 cups milk, 2 cups shredded cheddar cheese",
                serving_size: 4,
                time_to_prepare: "36 minutes",
                image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/10/2/0/FNM_110112-Baked-Macaroni-and-Cheese-Recipe_s4x3.jpg.rend.hgtvcom.616.462.suffix/1378412704137.jpeg"
            });
            await createSides({
                sidesName: "Broccoli with Garlic Butter",
                departmentId: 4,
                instructions: "1. Bring a large pot of salted water to a boil. Add broccoli florets and cook for 3-4 minutes, or until tender. Drain and set aside.  2. In a small saucepan, melt butter over medium heat. Add minced garlic and cook for 1-2 minutes, or until fragrant.  3. Toss cooked broccoli in garlic butter and season with salt and pepper to taste.",
                description: "This simple and delicious side dish is perfect for any meal!",
                ingredients: "1 head of broccoli, cut into florets, 4 tablespoons butter, 2 cloves garlic, minced, salt and pepper to taste",
                serving_size: 4,
                time_to_prepare: "14 minutes",
                image: "https://assets.bonappetit.com/photos/5af45762d358b05c548c323b/master/pass/raw-broccoli-salad-with-peanut-dressing.jpg"
            });
            await createSides({
                sidesName: "Roasted Carrots",
                departmentId: 4,
                instructions: "Preheat the oven to 400 degrees F. Cut the carrots into even sized pieces. Toss the carrots in olive oil and season with salt, pepper, and any desired herbs or spices. Arrange the carrots in a single layer on a baking sheet and roast for 25-30 minutes, or until tender and lightly browned",
                description: "These roasted carrots are a simple and delicious side dish to any meal",
                ingredients: "1 lb carrots, 2 tablespoons olive oil, 1 teaspoon salt, 1/4 teaspoon pepper",
                serving_size: 4,
                time_to_prepare: "37 minutes",
                image: "https://assets.bonappetit.com/photos/5bda2508b22e3c130657c1a2/3:2/w_3795,h_2530,c_limit/glazed-carrots-1.jpg"
            });
            await createSides({
                sidesName: "Roasted Asparagus",
                departmentId: 4,
                instructions: "1. Preheat oven to 425 degrees. Trim the bottom inch off of the asparagus and place them on a baking sheet. Drizzle with olive oil and sprinkle with salt and pepper.  2. Roast for 12-15 minutes, or until tender and slightly charred.",
                description: "This simple roasted asparagus recipe is a delicious and healthy side dish!",
                ingredients: "1 bunch asparagus, 2 tablespoons olive oil, 1/4 teaspoon salt, 1/4 teaspoon pepper",
                serving_size: 4,
                time_to_prepare: "22 minutes",
                image: "https://assets.bonappetit.com/photos/5ace174fff795274c43a0d6b/16:9/w_3840,h_2160,c_limit/blistered-asparagus.jpg"
            });
            await createSides({
                sidesName: "Edamame",
                departmentId: 4,
                instructions: "1. Bring a large pot of water to a boil. Add in the edamame and boil for 4-5 minutes. Drain and rinse under cold water. 2. In a pan, heat up oil over medium heat. Add in the edamame and sprinkle with salt, pepper, and any additional seasoning of choice. 3. Toss and cook for 2-3 minutes, or until heated through and slightly crispy. Serve immediately.",
                description: "This edamame recipe is a delicious and healthy side dish that is perfect for any meal!",
                ingredients: "1 lb of edamame in the pods, 1 tablespoon oil, salt and pepper to taste",
                serving_size: 4,
                time_to_prepare: "10 minutes",
                image: "https://i.ytimg.com/vi/B59VEfax_Ak/maxresdefault.jpg"
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
    