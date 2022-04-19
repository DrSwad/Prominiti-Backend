const { Router } = require('express')
const router = Router()

module.exports = function (passport) {
  router.use('/auth', require('./post_login')(passport))
  router.use('/auth', require('./post_signup')(passport))
  router.use('/auth', require('./post_verify'))
  router.use('/auth', require('./post_forgot'))
  router.use('/auth', require('./post_reset'))

  return router
}
