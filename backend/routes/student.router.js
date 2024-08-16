const router = require('express').Router()
const studentController = require('../controllers/student.controller')
const {
  principalOrTeacherMiddleware,
} = require('../middlewares/principal.middleware')

router
  .route('/')
  .get(studentController.get)
  .post(principalOrTeacherMiddleware, studentController.add)
  .put(principalOrTeacherMiddleware, studentController.update)
  .delete(principalOrTeacherMiddleware, studentController.remove)

module.exports = router
