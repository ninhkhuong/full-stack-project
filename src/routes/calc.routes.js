const calcController = require('../features/calculations/calc.controller');

const registerCalcRoutes = (app) => {
  app.get('/info', calcController.resElv);

}

module.exports = {registerCalcRoutes};