const { Router } = require('express')
const router = Router()

const { Op } = require('sequelize')
const {
  models: { User, ResetPassword },
} = require('../../models')

const sendMail = require('../../helpers/sendMail')
const { asyncRouteWrapper } = require('../../helpers/errorHandler')

router.post(
  '/forgot',
  asyncRouteWrapper(async (req, res) => {
    const { emailOrUsername } = req.body
    const user = await User.findOne({
      where: {
        [Op.or]: {
          email: emailOrUsername,
          username: emailOrUsername,
        },
      },
    })

    const resetPassword = ResetPassword.build({
      UserId: user.id,
    })
    await resetPassword.generateToken()
    await resetPassword.save()

    await sendMail(user.email, 'FORGOT_PASSWORD', { user, resetPassword })

    return res.json({
      message: `A reset link has been sent to the email associated with the account, please follow the link to reset your password.`,
    })
  })
)

module.exports = router
