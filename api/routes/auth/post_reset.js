const { Router } = require('express')
const router = Router()

const {
  models: { User, ResetPassword },
} = require('../../models')
const sendMail = require('../../helpers/sendMail')

router.post('/reset', async function (req, res, next) {
  try {
    const { user: userID, token } = req.body
    const resetPassword = await ResetPassword.findOne({
      where: {
        UserId: userID,
      },
    })

    const { password, confirmPassword } = req.body
    if (password !== confirmPassword)
      throw new Error(
        "Passwords don't match! Kindly type the password carefully in the input fields to make" +
          ' sure they match.'
      )

    if (!resetPassword || resetPassword.token !== token) {
      throw new Error(
        'No reset request found matching the provided credentials. Please try requesting ' +
          'for password reset again with your username/email information and notify the' +
          'admins if the problem persists.'
      )
    }

    await resetPassword.destroy()

    const user = await User.findByPk(userID)
    user.set('password', password)
    await user.save()

    // Send email
    await sendMail(user.email, 'RESET_PASSWORD', { user })

    return res.json({
      message: `Account password has been reset successfully. You can now log-in using the new credentials.`,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
