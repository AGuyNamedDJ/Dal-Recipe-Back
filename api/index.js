const express = require('express');
const apiRouter = express.Router();
 
// Routers 
const { departmentRouter } = require('./department');
const { breakfastRouter } = require('./breakfast');
const { dessertsRouter } = require('./desserts');
const { entreesRouter } = require('./entrees');
const { sidesRouter } = require('./sides');
apiRouter.use('/department', departmentRouter);
apiRouter.use('/breakfast', breakfastRouter);
apiRouter.use('/desserts', dessertsRouter);
apiRouter.use('/entrees', entreesRouter);
apiRouter.use('/sides', sidesRouter);

// Export
module.exports = {
    apiRouter
}