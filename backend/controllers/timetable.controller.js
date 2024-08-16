const Timetable = require('../models/timetable.model')
const Classroom = require('../models/classroom.model')

const get = function (req, res) {}

const add = async function (req, res) {
  const { classroomId, subjects } = req.body // getting the classroom id

  const classroomExists = await Classroom.findOne({ _id: classroomId })

  if (!classroomExists) {
    return res.status(400).json({ message: 'Classroom does not exists' })
  }

  const timetable = await Timetable.create({ classroom: classroomId, subjects })

  res.status(200).json(timetable)
}

const update = async function (req, res) {
  const { _id, subjects } = req.body

  const timetableExists = await Timetable.findOne({ _id })

  if (!timetableExists) {
    return res.status(404).json({ message: 'Timetable not found' })
  }

  const timetableUpdated = await Timetable.findOneAndUpdate(
    { _id },
    { $set: { classroom: _id, subjects } }
  )

  res.status(200).json(timetableUpdated)
}

const remove = async function (req, res) {
  const { _id } = req.body

  const timetableExists = await Timetable.findOne({ _id })

  if (!timetableExists) {
    return res.status(404).json({ message: 'Timetable not found' })
  }

  const timetableDeleted = await Timetable.findOneAndDelete({ _id })

  res.status(200).json(timetableDeleted)
}

module.exports = {
  get,
  add,
  update,
  remove,
}
