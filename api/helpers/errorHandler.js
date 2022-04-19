const { ValidationError } = require("sequelize");
const errorHandler = require("express-error-handler");

function initializeErrorHandler(app) {
  const handler = errorHandler({
    server: app,
    handlers: {},
  });

  app.use(errorHandler.httpError(404));
  app.use(function (err, _req, _res, next) {
    if (err instanceof ValidationError) {
      err.status = 400;
      err.message = err.errors[0].message;
    }
    _res.status(err.status || 400).send({ message: err.message });
  });
  app.use(handler);
}

function asyncRouteWrapper(asyncRouteHandler) {
  return function routeHandler(request, response, next) {
    return asyncRouteHandler(request, response, next).catch(next);
  };
}

module.exports = { initializeErrorHandler, asyncRouteWrapper };
