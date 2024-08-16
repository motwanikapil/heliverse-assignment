const router = require('express').Router()
const teacherController = require('../controllers/teacher.controller')
const { principalMiddleware } = require('../middlewares/principal.middleware')
const { loginSchema } = require('../validators/validator')
const validate = require('../middlewares/validate-middleware')

router
  .route('/')
  .get(teacherController.get)
  .post(principalMiddleware, teacherController.add)
  .put(principalMiddleware, teacherController.update)
  .delete(principalMiddleware, teacherController.remove)

router.post('/login', validate(loginSchema), teacherController.login)

module.exports = router
