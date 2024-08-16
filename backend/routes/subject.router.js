const router = require('express').Router()
const subjectController = require('../controllers/subject.controller')

router
  .route('/')
  .get(subjectController.get)
  .post(subjectController.add)
  .put(subjectController.update)
  .delete(subjectController.remove)

module.exports = router
