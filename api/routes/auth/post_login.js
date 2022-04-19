const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const { secret: jwtSecret } = require('../../../config/jwt')

module.exports = function (passport) {
  router.post('/login', function (req, res, next) {
    passport.authenticate(
      'local-login',
      { session: false },
      function (err, user) {
        if (err || !user) {
          // eslint-disable-next-line no-console
          console.log(err)
          return next(err)
        }

        req.login(user, { session: false }, function (err) {
          if (err) return next(err)
          const body = { id: user.id }
          const token = jwt.sign({ user: body }, jwtSecret)
          return res.json({ token, message: `Welcome, ${user.name}!` })
        })
      }
    )(req, res, next)
  })

  return router
}
