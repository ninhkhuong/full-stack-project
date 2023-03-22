const calcController = require('../features/calculations/calc.controller');

const registercalcRoutes = (app) => {
  app.get('/calc', calcController.resElv);

}

module.exports = {registercalcRoutes};