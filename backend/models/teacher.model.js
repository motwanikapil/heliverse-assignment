const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
})

// secure the password using bcrypt here

schema.pre('save', async function (next) {
  const user = this

  if (!user.isModified('password')) {
    next()
  }

  try {
    const saltRound = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(user.password, saltRound)
    user.password = hashPassword
  } catch (error) {
    next(error)
  }
})

schema.methods.generateToken = async function (next) {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '30d',
      }
    )
  } catch (error) {
    next(error)
  }
}

schema.methods.comparePassword = async function (inputPassword) {
  try {
    return bcrypt.compare(inputPassword, this.password)
  } catch (error) {
    console.log(error)
  }
}

module.exports = new model('Teacher', schema)
