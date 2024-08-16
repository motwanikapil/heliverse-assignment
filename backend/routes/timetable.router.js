const router = require('express').Router()
const timetableController = require('../controllers/timetable.controller')
const {
  principalOrTeacherMiddleware,
} = require('../middlewares/principal.middleware')

router
  .route('/')
  .get(timetableController.get)
  .post(principalOrTeacherMiddleware, timetableController.add)
  .put(principalOrTeacherMiddleware, timetableController.update)
  .delete(principalOrTeacherMiddleware, timetableController.remove)

module.exports = router
