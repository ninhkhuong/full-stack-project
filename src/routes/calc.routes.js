const calcController = require('../features/calculations/calc.controller');

const registerCalcRoutes = (app) => {
  app.get('/info', calcController.elvReq);

}

const registerPriceRoutes = (app) => {
  app.get('/price', calcController.quotePrice);

}

module.exports = {registerCalcRoutes, registerPriceRoutes};