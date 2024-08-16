const Principal = require('../models/principal.model')

const get = async function (req, res) {
  try {
    const principalData = req.user
    res.status(200).json(principalData)
  } catch (error) {
    console.log(`Error occured while getting principal `, error)
  }
}

const add = async function (req, res, next) {
  try {
    const { name } = req.body
    const principalExists = await Principal.findOne({ name })
    if (principalExists) {
      return res.status(400).json({ message: 'Principal already exists' })
    }

    const response = await Principal.create(req.body)

    if (!response) {
      return res.status(400).json({ message: 'Principal creation failed' })
    }

    res.status(201).json({
      message: 'Principal Created.',
      token: await response.generateToken(),
      principalId: response._id.toString(),
    })
  } catch (error) {
    next(error)
  }
}

const login = async function (req, res) {
  try {
    const { email, password } = req.body

    const principalExists = await Principal.findOne({ email })

    if (!principalExists) {
      return res.status(400).json({ message: 'Principal Not Found' })
    }

    const principal = await principalExists.comparePassword(password)

    if (principal) {
      return res.status(200).json({
        message: 'Login Successful',
        token: await principalExists.generateToken(),
        principalId: principalExists._id.toString(),
      })
    } else {
      return res.status(400).json({
        message: 'Invalid credentials',
      })
    }
  } catch (error) {
    console.log('Error occured', error)
  }
}

const remove = async function (req, res) {
  const principalDeleted = await Principal.findOneAndDelete({
    _id: req.params.id,
  })

  if (!principalDeleted) {
    return res.status(400).json({ message: 'Principal deletion failed' })
  }

  res.status(200).json(principalDeleted)
}

const update = async function (req, res) {
  const { name, _id } = req.body
  const updatePrincipal = Principal.findOneAndUpdate(
    { _id },
    { $set: { name } }
  )

  if (!updatePrincipal) {
    return res.status(400).json({ message: 'Principal name updation failed' })
  }

  res.status(200).json(updatePrincipal)
}

module.exports = {
  get,
  add,
  remove,
  update,
  login,
}
