const errorMiddleware = require('./middlewares/error.middleware')

require('dotenv').config()
const { connectDb } = require('./utils/db')
const express = require('express')
const app = express()
const teacherRouter = require('./routes/teacher.router')
const principalRouter = require('./routes/principal.router')
const studentRouter = require('./routes/student.router')
const subjectRouter = require('./routes/subject.router')
const timetableRouter = require('./routes/timetable.router')
const classroomRouter = require('./routes/classroom.router')

const { PORT, DOMAIN } = process.env

app.use(express.json())

app.use('/teacher', teacherRouter)
app.use('/principal', principalRouter)
app.use('/student', studentRouter)
app.use('/subject', subjectRouter)
app.use('/timetable', timetableRouter)
app.use('/classroom', classroomRouter)

app.use(errorMiddleware)

connectDb()
  .then((res) => {
    console.log('Database connected successfully')
    app.listen(PORT, () => {
      console.log(`Server listening on http://${DOMAIN}:${PORT}`)
    })
  })
  .catch((err) => console.log(err))
