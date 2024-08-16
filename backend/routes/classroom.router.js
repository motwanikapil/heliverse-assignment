const router = require('express').Router()
const classroomController = require('../controllers/classroom.controller')
const { principalMiddleware } = require('../middlewares/principal.middleware')
const validate = require('../middlewares/validate-middleware')
const { classroomSchema } = require('../validators/validator')

router
  .route('/')
  .get(classroomController.get)
  .post(principalMiddleware, validate(classroomSchema), classroomController.add)
  .put(principalMiddleware, classroomController.update)
  .delete(principalMiddleware, classroomController.remove)

router.post('/assign', classroomController.assign)

module.exports = router
