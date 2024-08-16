const Classroom = require('../models/classroom.model')

const get = async function (req, res) {}

const add = async function (req, res) {
  const { name } = req.body

  const classroomExist = await Classroom.findOne({ name })

  if (classroomExist) {
    return res.status(400).json({ message: 'Classroom already exists' })
  }

  const classroomCreated = await Classroom.create({ name })

  if (!classroomCreated) {
    return res.status(400).json({ message: 'Classroom creation failed' })
  }

  res.status(200).json(classroomCreated)
}

const remove = async function (req, res) {
  const deleteClassroom = Classroom.findOneAndDelete({ _id: req.params.id })

  if (!deleteClassroom) {
    return res.status(400).json({ message: 'Classroom deletion failed' })
  }

  res.status(200).json(deleteClassroom)
}

const update = async function (req, res) {}

const assign = async function (req, res) {
  const { classroomId, teacherId } = req.body

  const classroomExists = await Classroom.findOne({ _id: classroomId })
  const teacherExists = await Teacher.findOne({ _id: teacherId })

  if (!classroomExists) {
    return res.status(400).json({ message: 'Classroom does not exists' })
  }

  if (!teacherExists) {
    return res.status(400).json({ message: 'Teacher does not exists' })
  }

  const classroomUpdated = await Classroom.findOneAndUpdate(
    { _id: classroomId },
    { $set: { teacher: teacherId } }
  )

  res.status(200).json(classroomUpdated)
}

module.exports = {
  get,
  add,
  remove,
  update,
  assign,
}
