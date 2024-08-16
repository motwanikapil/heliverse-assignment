const Student = require('../models/teacher.model')

const get = async function (req, res) {
  const students = await Student.find({})

  if (!students) {
    return res.status(404).json({ message: 'Students not found' })
  }
  res.status(200).json(students)
}

const add = async function (req, res) {
  try {
    const { name } = req.body

    const studentExists = await Student.find({ name })

    if (studentExists) {
      return res.status(404).json({ message: 'Student already exists' })
    }

    const studentCreated = await Student.create({ name })

    if (!studentCreated) {
      return res.status(500).json({ message: 'Error occured' })
    }

    res.status(201).json(studentCreated)
  } catch (error) {
    console.log('Error occured ', error)
  }
}

const remove = async function (req, res) {
  try {
    const studentDeleted = await Student.findOneAndDelete({
      _id: req.params._id,
    })
    if (!studentDeleted) {
      return res.status(404).json({ message: 'Student deletion failed' })
    }

    res.status(200).json(studentDeleted)
  } catch (error) {
    console.log('Error occured while deleting student ', error)
  }
}

const update = function (req, res) {}

module.exports = {
  get,
  add,
  remove,
  update,
}
