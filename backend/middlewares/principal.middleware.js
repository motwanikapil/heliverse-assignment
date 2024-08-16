const jwt = require('jsonwebtoken')
const Principal = require('../models/principal.model')
const Teacher = require('../models/teacher.model')

const principalMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Unauthorized HTTP, Token not provided' })
  }

  const jwtToken = token.replace('Bearer', '').trim()

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)

    const principalData = await Principal.findOne({
      email: isVerified.email,
    }).select({
      password: 0,
    })

    req.principal = principalData
    req.token = token
    req.principalId = principalData._id

    next()
  } catch (error) {
    console.log('Error from principal middleware ', error)
    next(error)
  }
}

const principalOrTeacherMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Unauthorized HTTP, Token not provided' })
  }

  const jwtToken = token.replace('Bearer', '').trim()

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)

    let principalData = await Principal.findOne({
      email: isVerified.email,
    }).select({
      password: 0,
    })

    if (!principalData) {
      principalData = await Teacher.findOne({ email: isVerified.email }).select(
        { password: 0 }
      )

      if (!principalData) {
        return res.status(400).json({ message: 'Forbidden' })
      }
    }

    req.principal = principalData
    req.token = token
    req.principalId = principalData._id

    next()
  } catch (error) {
    console.log('Error from principal middleware ', error)
    next(error)
  }
}

module.exports = { principalMiddleware, principalOrTeacherMiddleware }
