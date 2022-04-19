const { Router } = require('express')
const router = Router()

module.exports = function (passport) {
  router.post('/signup', function (req, res, next) {
    passport.authenticate(
      'local-signup',
      { session: false },
      function (err, user) {
        if (err || !user) {
          // eslint-disable-next-line no-console
          console.log(err)
          return next(err)
        }

        return res.json({
          message: `A verification link has been sent to ${user.email}, please follow the link to verify your account.`,
        })
      }
    )(req, res, next)
  })

  return router
}
