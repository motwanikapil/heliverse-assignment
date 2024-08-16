const Subject = require('../models/teacher.model')

const get = function (req, res) {}

const add = async function (req, res) {
  try {
    const { name } = req.body

    const subjectExists = await Subject.findOne({ name })

    if (subjectExists) {
      return res.status(400).json({ message: 'Subject already exists' })
    }

    const subjectCreated = await Subject.create({ name })

    if (!subjectCreated) {
      console.log('Subject creation failed')
    }

    res.status(200).json(subjectCreated)
  } catch (error) {
    console.log('Subject creation failed ', error)
  }
}

const remove = function (req, res) {}

const update = function (req, res) {}

module.exports = {
  get,
  add,
  remove,
  update,
}
