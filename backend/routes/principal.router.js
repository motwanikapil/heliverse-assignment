const router = require('express').Router()
const principalController = require('../controllers/principal.controller')
const validate = require('../middlewares/validate-middleware')
const validatorSchema = require('../validators/validator')
const { principalMiddleware } = require('../middlewares/principal.middleware')

router
  .route('/')
  .post(validate(validatorSchema.signupSchema), principalController.add)
  .put(
    validate(validatorSchema.signupSchema),
    principalMiddleware,
    principalController.update
  )
  .delete(principalMiddleware, principalController.remove)

router.post(
  '/login',
  validate(validatorSchema.loginSchema),
  principalController.login
)

module.exports = router
