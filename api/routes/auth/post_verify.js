const { Router } = require('express')
const router = Router()

const {
  models: { User, Verification },
} = require('../../models')

router.post('/verify', async function (req, res, next) {
  try {
    const { user: userID, token } = req.body
    const verification = await Verification.findOne({
      where: {
        UserId: userID,
      },
    })

    if (!verification || verification.token !== token) {
      throw new Error(
        'No pending user found matching the provided credentials. Please try signing ' +
          'up again with your information and notify the admins if the problem persists.'
      )
    }

    await verification.destroy()

    const user = await User.findByPk(userID)
    user.set('verified', true)
    await user.save()

    return res.json({
      message: `Account verified successfully. You can now log-in using the credentials you provided during sign-up.`,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
