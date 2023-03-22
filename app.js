require('dotenv').config();
const cors = require('cors');

const Express = require('express');
const app = Express();
const port = process.env.PORT || 3004;


const MongoManager = require('./src/shared/db/mongodb/mongo-manager')
const MiddleWare = require('./src/shared/middleware/base-middleware')
const HealthRoutes = require('./src/routes/health.routes')
const AdminRoutes = require('./src/routes/admin.routes')
const PublicRoutes = require('./src/routes/public.routes')
const AgentRoutes = require('./src/routes/agent.routes')
const regionRouter = require('./src/routes/region.routes')
const calcRouter = require('./src/routes/calc.routes')


app.use(Express.static('./src/public')) //serves our static genesis project
app.use(Express.json())

// Allow requests from http://127.0.0.1:5500
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});



MiddleWare.registerBaseMiddleWare(app)
HealthRoutes.registerHealthRoutes(app)
AdminRoutes.registerAdminRoutes(app)
PublicRoutes.registerPublicRoutes(app)
AgentRoutes.registerAgentRoutes(app)
regionRouter.registerRegionRoutes(app)
calcRouter.registerCalcRoutes(app)



MongoManager.openMongoConnection()
app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})
