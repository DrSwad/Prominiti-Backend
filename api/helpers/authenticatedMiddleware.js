class MiddlewareFactory {
  static authenticatedMiddleware = undefined
  static initMiddleware(passport) {
    MiddlewareFactory.authenticatedMiddleware = passport.authenticate('jwt', {
      session: false,
    })
  }
}

module.exports = MiddlewareFactory
