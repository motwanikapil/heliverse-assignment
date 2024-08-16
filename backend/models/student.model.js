const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  classroom: {
    type: Schema.Types.ObjectId,
    ref: 'Classroom',
  },
})

module.exports = new model('Student', schema)
