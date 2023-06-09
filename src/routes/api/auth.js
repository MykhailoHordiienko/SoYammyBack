const express = require('express')
const { authCtrl } = require('@controllers')
const {
  bodyValidation,
  authenticate,
  handleFormData,
  imageOptional,
} = require('@middlewares')
const { userBodySchemas } = require('@models')

const router = express.Router()

router.post(
  '/auth/signup',
  bodyValidation(userBodySchemas.signup),
  authCtrl.signup
)
router.post(
  '/auth/signin',
  bodyValidation(userBodySchemas.signin),
  authCtrl.signin
)

router.post('/auth/google/signin', authCtrl.signInGoogle)

router.patch(
  '/auth/edit',
  authenticate,
  handleFormData.single('avatar'),

  bodyValidation(userBodySchemas.patchUserData),
  authCtrl.edit
)
router.get('/auth/current', authenticate, authCtrl.current)
router.post('/auth/logout', authenticate, authCtrl.logout)

module.exports = router
