const { z } = require('zod')

// Creating an object schema

const nameSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(3, { message: 'Name must be atleast 3 characters' })
    .max(255, { message: 'Name must not be more than 255 characters' }),
})

const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email({ message: 'Invalid email address' })
    .min(3, { message: 'Email must be more than 3 characters' })
    .max(255, { message: 'Email must not be more than 255 characters' }),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(5, { message: 'Password must be atleast 5 characters' })
    .max(1024, { message: 'Password must not be more than 1024 characters' }),
})

const signupSchema = loginSchema.extend(nameSchema)

// Helper function to create the validation for each day
const daySchema = z
  .object({
    startTime: z
      .string({ required_error: 'Start time is required' })
      .regex(/([01]?[0-9]|2[0-3]):[0-5][0-9]/, 'Invalid start time format'),
    endTime: z
      .string({ required_error: 'End time is required' })
      .regex(/([01]?[0-9]|2[0-3]):[0-5][0-9]/, 'Invalid end time format'),
  })
  .refine(
    (data) => {
      const [startHours, startMinutes] = data.startTime.split(':').map(Number)
      const [endHours, endMinutes] = data.endTime.split(':').map(Number)

      // Convert time to minutes for easy comparison
      const startTimeInMinutes = startHours * 60 + startMinutes
      const endTimeInMinutes = endHours * 60 + endMinutes

      return endTimeInMinutes > startTimeInMinutes
    },
    {
      message: 'End time must be greater than start time',
      path: ['endTime'], // The path to the field that failed the validation
    }
  )

// Zod schema for classroom timings for all days
const classroomSchema = nameSchema.extend({
  name: z.string({ required_error: 'Classroom name is required' }),
  timings: z.object({
    monday: daySchema,
    tuesday: daySchema,
    wednesday: daySchema,
    thursday: daySchema,
    friday: daySchema,
    saturday: daySchema,
  }),
})

module.exports = {
  signupSchema,
  loginSchema,
  nameSchema,
  classroomSchema,
}
