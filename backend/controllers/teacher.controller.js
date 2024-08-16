const Teacher = require('../models/teacher.model')

const get = function (req, res) {}

const add = async function (req, res) {
  const { name, email, password } = req.body

  const teacherExists = await Teacher.findOne({ email })

  if (teacherExists) {
    return res.status(400).json({ message: 'Teacher already exists' })
  }

  const teacherCreated = await Teacher.create({ name, email, password })

  if (!teacherCreated) {
    return res.status(400).json({ message: 'Teacher creation failed' })
  }

  res.status(200).json(teacherCreated)
}

const remove = async function (req, res) {
  const teacherDeleted = await Teacher.findOneAndDelete({ _id: req.body._id })

  if (!teacherDeleted) {
    return res.status(400).json({ message: 'Teacher Deletion Failed' })
  }

  res.status(200).json(teacherDeleted)
}

const update = async function (req, res) {}

const login = async function (req, res) {
  const { email, password } = req.body

  const teacherExists = await Teacher.findOne({ email })

  if (!teacherExists) {
    return res.status(400).json({ message: 'Teacher Not Found' })
  }

  const teacher = await teacherExists.comparePassword(password)

  if (teacher) {
    return res.status(200).json({
      message: 'Login Successful',
      token: await teacherExists.generateToken(),
      teacherId: teacherExists._id.toString(),
    })
  } else {
    return res.status(400).json({ message: 'Invalid credentials' })
  }
}

module.exports = {
  get,
  add,
  remove,
  update,
  login,
}
