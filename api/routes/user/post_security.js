const { Router } = require('express')
const router = Router()

const {
  models: { User },
} = require('../../models')
const {
  authenticatedMiddleware,
} = require('../../helpers/authenticatedMiddleware')

router.post(
  '/security',
  authenticatedMiddleware,
  async function (req, res, next) {
    try {
      const userID = req.user.id
      const user = await User.findByPk(userID)
      const { currentPassword, newPassword, confirmPassword } = req.body

      // If the passwords don't match
      if (!(await user.isValidPassword(currentPassword))) {
        throw new Error(
          'Wrong password! Kindly make sure everything is typed in correctly.'
        )
      }

      // Make sure password confirmation matched
      if (newPassword !== confirmPassword)
        throw new Error(
          "Passwords don't match! Kindly type the password carefully in the input fields to make" +
            ' sure they match.'
        )

      await user.update({ password: newPassword })

      return res.json({ message: 'Password updated successfully!' })
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
