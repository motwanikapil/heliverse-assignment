const { Schema, model } = require('mongoose')

const schema = new Schema({
  classroom: {
    type: Schema.Types.ObjectId,
    ref: 'Classroom',
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      startTime: {
        type: String,
        validate: {
          validator: function (v) {
            if (!v) {
              return true
            }
            return /([01]?[0-9]|2[0-3]):[0-5][0-9]/.test(v)
          },
          message: (props) => `${props.value} is not valid time!`,
        },
      },
      endTime: {
        type: String,
        validate: {
          validator: function (endTime) {
            if (!endTime) {
              return true
            }

            // Ensure the time is in valid format
            if (!/([01]?[0-9]|2[0-3]):[0-5][0-9]/.test(endTime)) {
              return false
            }

            const startTime = this.startTime
            if (!startTime) {
              return true // skip validation if startTime is not set
            }

            // Convert to Date objects to compare times
            const [startHour, startMinute] = startTime.split(':').map(Number)
            const [endHour, endMinute] = endTime.split(':').map(Number)

            // Compare the times
            if (
              endHour > startHour ||
              (endHour === startHour && endMinute > startMinute)
            ) {
              return true
            }

            return false
          },
          message: (props) =>
            `End time ${props.value} should be greater than start time!`,
        },
      },
    },
  ],
})

module.exports = new model('Timetable', schema)
