const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  timings: {
    monday: {
      startTime: String,
      endTime: String,
    },
    tuesday: {
      startTime: String,
      endTime: String,
    },
    wednesday: {
      startTime: String,
      endTime: String,
    },
    thursday: {
      startTime: String,
      endTime: String,
    },
    friday: {
      startTime: String,
      endTime: String,
    },
    saturday: {
      startTime: String,
      endTime: String,
    },
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
  },
})

module.exports = new model('Classroom', schema)
